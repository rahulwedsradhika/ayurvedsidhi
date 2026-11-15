import os
import sys
import re
import json
import time
import sqlite3
import queue
import threading
from concurrent.futures import ThreadPoolExecutor
import urllib.request
import urllib.parse

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DB_PATH = os.path.join(BASE_DIR, 'server', 'data', 'ayurquest.db')
CHECKPOINT_FILE = os.path.join(BASE_DIR, 'production_dump', 'fast_extraction_checkpoint.json')
SESSION_FILE = os.path.join(BASE_DIR, 'production_dump', 'auth_session.json')
ENV_FILE = os.path.join(BASE_DIR, 'server', '.env')

class NoRedirectHandler(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return None

opener = urllib.request.build_opener(NoRedirectHandler)

SAMHITA_NAMES = {
    1: 'Charaka Samhita', 2: 'Sushruta Samhita', 3: 'Ashtanga Hridaya', 4: 'Ashtanga Samgraha',
    5: 'Madhava Nidana', 6: 'Sharangadhara Samhita', 7: 'Bhavaprakasha', 8: 'Kashyapa Samhita',
    9: 'Bhela Samhita', 10: 'Harita Samhita', 11: 'Chakradatta', 12: 'Yogaratnakara',
    13: 'Bhaishajya Ratnavali', 14: 'Rasatarangini', 15: 'Rasaratnasamucchaya', 16: 'Gadanigraha'
}

SUBJECT_NAMES = {
    1: 'Kayachikitsa', 2: 'Rog Nidana & Vikriti Vijnana', 3: 'Dravyaguna Vijnana',
    4: 'Shalya Tantra', 5: 'Shalakya Tantra', 6: 'Prasuti Tantra & Stri Roga',
    7: 'Kaumarbhritya', 8: 'Maulik Siddhanta & Samhita', 9: 'Rasa Shastra & Bhaishajya Kalpana',
    10: 'Sharir Rachna', 11: 'Sharir Kriya / Physiology', 12: 'Swasthavritta',
    13: 'Panchakarma', 14: 'Padarth Vigyan', 15: 'Ayurveda ka Itihas'
}

def get_active_cookie():
    if os.path.exists(SESSION_FILE):
        try:
            with open(SESSION_FILE, 'r', encoding='utf-8') as f:
                data = json.load(f)
                if 'cookie_header' in data:
                    return data['cookie_header']
        except Exception:
            pass
            
    if os.path.exists(ENV_FILE):
        with open(ENV_FILE, 'r', encoding='utf-8') as f:
            for line in f:
                if line.startswith('PROD_SESSION_COOKIE='):
                    val = line.split('=', 1)[1].strip().strip('"').strip("'")
                    return val
    return None

class DatabaseWriter(threading.Thread):
    def __init__(self, db_path, q_in):
        super().__init__(daemon=True)
        self.db_path = db_path
        self.q_in = q_in
        self.conn = None
        self.running = True
        self.total_questions = 0
        self.total_tests = 0
        
    def run(self):
        self.conn = sqlite3.connect(self.db_path, timeout=60.0)
        self.conn.execute("PRAGMA journal_mode=WAL;")
        self.conn.execute("PRAGMA synchronous=NORMAL;")
        
        while self.running or not self.q_in.empty():
            try:
                item = self.q_in.get(timeout=1.0)
            except queue.Empty:
                continue
                
            if item is None:
                break
                
            test_meta, questions = item
            self._save_test(test_meta, questions)
            self.q_in.task_done()
            
        if self.conn:
            self.conn.commit()
            self.conn.close()
            
    def _save_test(self, test_meta, questions):
        cur = self.conn.cursor()
        test_id = test_meta['id']
        test_name = test_meta.get('name', f"Test {test_id}")
        category = test_meta.get('category', 'Mock Test')
        total_q = len(questions)
        
        cur.execute("""
            INSERT OR REPLACE INTO tests (id, name, subject, total_questions, duration_minutes, total_marks, negative_marks, category)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """, (test_id, test_name, test_meta.get('subject', 'Ayurveda'), total_q, test_meta.get('duration', 120), total_q * 4, 1.0, category))
        
        order = 1
        for q in questions:
            qid = int(q.get('qid') or q.get('id') or 0)
            if not qid:
                continue
                
            stem = (q.get('Q') or q.get('stem') or '').strip()
            o1 = (q.get('O1') or q.get('option_1') or '').strip()
            o2 = (q.get('O2') or q.get('option_2') or '').strip()
            o3 = (q.get('O3') or q.get('option_3') or '').strip()
            o4 = (q.get('O4') or q.get('option_4') or '').strip()
            
            try:
                ans = int(q.get('A') or q.get('correct_answer') or 1)
            except (ValueError, TypeError):
                ans = 1
                
            com = (q.get('com') or q.get('explanation') or '').strip()
            sam_id = int(q.get('sam_id') or 0)
            sth_id = int(q.get('sth_id') or 0)
            sub_id = int(q.get('sub_id') or 0)
            sam_name = SAMHITA_NAMES.get(sam_id, '')
            sub_name = SUBJECT_NAMES.get(sub_id, '')
            
            cur.execute("""
                INSERT OR REPLACE INTO questions (
                    id, stem, option_1, option_2, option_3, option_4,
                    correct_answer, explanation, reference_source,
                    samhita_id, samhita_name, sthana_id, subject_id, subject_name,
                    tag, difficulty, language
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'single_choice', 'moderate', 'sa/hi/en')
            """, (qid, stem, o1, o2, o3, o4, ans, com, sam_name or sub_name, sam_id, sam_name, sth_id, sub_id, sub_name))
            
            cur.execute("""
                INSERT OR REPLACE INTO test_questions (test_id, question_id, question_order)
                VALUES (?, ?, ?)
            """, (test_id, qid, order))
            order += 1
            self.total_questions += 1
            
        self.conn.commit()
        self.total_tests += 1

def fetch_page_tests(url, category_name, cookie_str):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/157.0.0.0 Safari/537.36',
        'Cookie': cookie_str,
        'Referer': 'https://ayurquest.com/app1.5/index.php'
    }
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=20) as resp:
            content = resp.read().decode('utf-8', errors='ignore')
            
        tests = []
        # Pattern 1: Links with quiz_id or test_id
        matches = re.findall(r'<a\b[^>]*href=[\'"][^\'"]*(?:quiz_id|test_id)=(\d+)[^\'"]*[\'"][^>]*>(.*?)</a>', content, re.I | re.DOTALL)
        for qid_str, title_html in matches:
            clean_title = re.sub(r'<[^>]+>', ' ', title_html).strip()
            clean_title = re.sub(r'\s+', ' ', clean_title)
            tests.append({'id': int(qid_str), 'name': clean_title or f"Mock Test {qid_str}", 'category': category_name})
            
        # Pattern 2: Buttons / forms / onclick
        matches2 = re.findall(r'(?:quiz_id|test_id)\s*=\s*[\'"]?(\d+)[\'"]?', content, re.I)
        seen = {t['id'] for t in tests}
        for qid_str in matches2:
            qid_int = int(qid_str)
            if qid_int not in seen:
                seen.add(qid_int)
                tests.append({'id': qid_int, 'name': f"{category_name} Test {qid_int}", 'category': category_name})
                
        # Pattern 3: JSON embedded feeds (like ajax.php?type=...)
        if content.strip().startswith('[') and content.strip().endswith(']'):
            try:
                feed = json.loads(content)
                for item in feed:
                    if 'id' in item:
                        tests.append({
                            'id': int(item['id']),
                            'name': item.get('name', f"Test {item['id']}"),
                            'subject': item.get('sub', ''),
                            'category': category_name
                        })
            except Exception:
                pass
                
        return tests
    except Exception as e:
        print(f"Error fetching catalogue {url}: {e}")
        return []

def extract_single_test(test_meta, cookie_str):
    quiz_id = test_meta['id']
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/157.0.0.0 Safari/537.36',
        'Cookie': cookie_str,
        'Referer': 'https://ayurquest.com/app1.5/ayush-npget.php'
    }
    
    # Method 1: Play quiz -> submit -> get result JSON
    play_url = 'https://ayurquest.com/app1.5/quiz.php?action=play_quiz'
    play_data = urllib.parse.urlencode({'quiz_id': str(quiz_id), 'solveAQquiz': 'Solve Test'}).encode('utf-8')
    req1 = urllib.request.Request(play_url, data=play_data, headers={
        **headers,
        'Content-Type': 'application/x-www-form-urlencoded'
    })
    
    target_uuid = None
    try:
        resp = opener.open(req1, timeout=15)
        play_html = resp.read().decode('utf-8', errors='ignore')
        qids = re.findall(r'<input\b[^>]*name=[\'"](\d+)[\'"]', play_html)
        unique_qids = sorted(list(set(qids)))
        if not unique_qids:
            return []
            
        res_url = 'https://ayurquest.com/app1.5/quiz.php?action=quiz_result'
        sub_dict = {qid: 'AQ_quiz' for qid in unique_qids}
        sub_data = urllib.parse.urlencode(sub_dict).encode('utf-8')
        req2 = urllib.request.Request(res_url, data=sub_data, headers={
            **headers,
            'Referer': play_url,
            'Content-Type': 'application/x-www-form-urlencoded'
        })
        try:
            resp2 = opener.open(req2, timeout=35)
        except urllib.error.HTTPError as e2:
            if e2.code in (302, 303):
                loc = e2.headers.get('Location', '')
                m = re.search(r'uuid=([a-f0-9]+)', loc)
                if m:
                    target_uuid = m.group(1)
    except urllib.error.HTTPError as e:
        if e.code in (302, 303):
            loc = e.headers.get('Location', '')
            if 'membership.php' in loc:
                print(f"[!] Test {quiz_id}: Access Denied / Membership Required")
                return []
            m = re.search(r'uuid=([a-f0-9]+)', loc)
            if m:
                target_uuid = m.group(1)
    except Exception as ex:
        print(f"[x] Test {quiz_id} error: {ex}")
        return []
        
    if not target_uuid:
        return []
        
    json_url = f'https://ayurquest.com/app1.5/ajax.php?type=result&uuid={target_uuid}'
    req3 = urllib.request.Request(json_url, headers={
        **headers,
        'Referer': f'https://ayurquest.com/app1.5/quiz.php?action=quiz_result&uuid={target_uuid}',
        'X-Requested-With': 'XMLHttpRequest'
    })
    try:
        with urllib.request.urlopen(req3, timeout=15) as resp3:
            data_str = resp3.read().decode('utf-8', errors='ignore')
            return json.loads(data_str)
    except Exception as ex3:
        print(f"[x] Test {quiz_id} JSON read error: {ex3}")
        return []

def run_extraction():
    cookie_str = get_active_cookie()
    if not cookie_str:
        print("ERROR: No active session cookie found! Run scripts/auth_manager.py first.")
        return
        
    print(f"=== Starting Fast AyurQuest Pro Extractor ===")
    print(f"Using cookie: {cookie_str[:30]}...")
    
    # 1. Target Catalogues
    catalogues = [
        ('https://ayurquest.com/app1.5/ayush-npget.php?action=mock_test&year=2025-2026', 'AIAPGET 2025-2026'),
        ('https://ayurquest.com/app1.5/ayush-npget.php?action=mock_test&year=2024-2025', 'AIAPGET 2024-2025'),
        ('https://ayurquest.com/app1.5/ayush-npget.php?action=mock_test&year=2023-2024', 'AIAPGET 2023-2024'),
        ('https://ayurquest.com/app1.5/prev-years.php?action=exams', 'Previous Years'),
    ]
    
    all_tests = []
    seen_ids = set()
    for cat_url, cat_name in catalogues:
        print(f"Discovering tests in {cat_name}...")
        tests = fetch_page_tests(cat_url, cat_name, cookie_str)
        for t in tests:
            if t['id'] not in seen_ids:
                seen_ids.add(t['id'])
                all_tests.append(t)
        print(f"  Found {len(tests)} tests in {cat_name}. (Total unique: {len(all_tests)})")
        
    if not all_tests:
        print("No tests found. Verify Pro subscription on session cookie.")
        return
        
    # 2. Checkpoint recovery
    checkpoint = {}
    if os.path.exists(CHECKPOINT_FILE):
        try:
            with open(CHECKPOINT_FILE, 'r', encoding='utf-8') as f:
                checkpoint = json.load(f)
        except Exception:
            checkpoint = {}
            
    completed_ids = set(checkpoint.get('completed_test_ids', []))
    remaining_tests = [t for t in all_tests if t['id'] not in completed_ids]
    print(f"Total tests: {len(all_tests)} | Already extracted: {len(completed_ids)} | Remaining: {len(remaining_tests)}")
    
    # 3. Start DB Writer Thread
    write_queue = queue.Queue(maxsize=100)
    db_writer = DatabaseWriter(DB_PATH, write_queue)
    db_writer.start()
    
    # 4. Multi-threaded worker pool
    start_time = time.time()
    extracted_count = 0
    
    def process_test(t):
        nonlocal extracted_count
        tid = t['id']
        qs = extract_single_test(t, cookie_str)
        if qs:
            write_queue.put((t, qs))
            completed_ids.add(tid)
            extracted_count += 1
            print(f" [OK] Test {tid} ({t['name'][:30]}): Imported {len(qs)} questions.")
        else:
            print(f" [SKIP] Test {tid}: 0 questions extracted.")
            
        # Periodic checkpoint
        if extracted_count % 5 == 0:
            with open(CHECKPOINT_FILE, 'w', encoding='utf-8') as f:
                json.dump({'completed_test_ids': list(completed_ids)}, f, indent=2)
                
    with ThreadPoolExecutor(max_workers=3) as pool:
        pool.map(process_test, remaining_tests)
        
    write_queue.put(None)
    db_writer.join()
    
    with open(CHECKPOINT_FILE, 'w', encoding='utf-8') as f:
        json.dump({'completed_test_ids': list(completed_ids)}, f, indent=2)
        
    total_time = time.time() - start_time
    print(f"\n=======================================================")
    print(f" EXTRACTION FINISHED in {total_time:.1f} seconds")
    print(f" Total Tests Processed: {extracted_count}")
    print(f" Questions stored in: {DB_PATH}")
    print(f"=======================================================")

if __name__ == '__main__':
    run_extraction()

