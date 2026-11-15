import os
import sys
import re
import json
import time
import sqlite3
import urllib.request
import urllib.parse
from concurrent.futures import ThreadPoolExecutor

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DB_PATH = os.path.join(BASE_DIR, 'server', 'data', 'ayurquest.db')
SESSION_FILE = os.path.join(BASE_DIR, 'production_dump', 'auth_session.json')
DUMP_DIR = os.path.join(BASE_DIR, 'production_dump')

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

def get_session_cookie():
    if os.path.exists(SESSION_FILE):
        with open(SESSION_FILE, 'r', encoding='utf-8') as f:
            data = json.load(f)
            return data.get('cookie_header')
    env_file = os.path.join(BASE_DIR, 'server', '.env')
    if os.path.exists(env_file):
        with open(env_file, 'r', encoding='utf-8') as f:
            for l in f:
                if l.startswith('PROD_SESSION_COOKIE='):
                    return l.split('=', 1)[1].strip().strip('"').strip("'")
    return None

def fetch_test_series_page(ts_url, cookie_str):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/157.0.0.0 Safari/537.36',
        'Cookie': cookie_str,
        'Referer': 'https://ayurquest.com/app1.5/test-series.php'
    }
    req = urllib.request.Request(ts_url, headers=headers)
    with urllib.request.urlopen(req, timeout=15) as resp:
        html = resp.read().decode('utf-8', errors='ignore')
    
    os.makedirs(DUMP_DIR, exist_ok=True)
    with open(os.path.join(DUMP_DIR, 'test_series_page.html'), 'w', encoding='utf-8') as f:
        f.write(html)
        
    return html

def parse_test_series_tests(html):
    tests = []
    seen = set()
    
    # Check for quiz_id or test_id in links
    patterns = [
        r'<a\b[^>]*href=[\'"][^\'"]*(?:quiz_id|test_id)=(\d+)[^\'"]*[\'"][^>]*>(.*?)</a>',
        r'quiz_id\s*=\s*[\'"]?(\d+)[\'"]?',
        r'test_id\s*=\s*[\'"]?(\d+)[\'"]?',
        r'onclick=[\'"][^\'"]*(?:quiz|test)[^\'"]*\((\d+)\)',
        r'data-(?:quiz|test)-id=[\'"]?(\d+)[\'"]?',
        r'name=[\'"]quiz_id[\'"]\s+value=[\'"](\d+)[\'"]'
    ]
    
    # 1. Match links with titles
    for m in re.finditer(r'<a\b[^>]*href=[\'"][^\'"]*(?:quiz_id|test_id)=(\d+)[^\'"]*[\'"][^>]*>(.*?)</a>', html, re.I | re.DOTALL):
        tid = int(m.group(1))
        title = re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', ' ', m.group(2))).strip()
        if tid not in seen:
            seen.add(tid)
            tests.append({'id': tid, 'name': title or f"Test Series #{tid}", 'category': 'Test Series'})
            
    # 2. General regex matches for any remaining test IDs
    for pat in patterns[1:]:
        for m in re.finditer(pat, html, re.I):
            tid = int(m.group(1))
            if tid not in seen and tid > 0:
                seen.add(tid)
                tests.append({'id': tid, 'name': f"Test Series #{tid}", 'category': 'Test Series'})
                
    return tests

def extract_test(test_meta, cookie_str):
    quiz_id = test_meta['id']
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/157.0.0.0 Safari/537.36',
        'Cookie': cookie_str,
        'Referer': 'https://ayurquest.com/app1.5/testseries.php'
    }
    
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
                print(f"[!] Test {quiz_id}: Access Denied (Membership required)")
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

def save_test_to_db(test_meta, questions):
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    test_id = test_meta['id']
    test_name = test_meta.get('name', f"Test {test_id}")
    category = test_meta.get('category', 'Test Series')
    total_q = len(questions)
    
    cur.execute("""
        INSERT OR REPLACE INTO tests (id, name, subject, total_questions, duration_minutes, total_marks, negative_marks, category)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    """, (test_id, test_name, 'Test Series', total_q, 120, total_q * 4, 1.0, category))
    
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
        
    conn.commit()
    conn.close()

def run_test_series_extraction(ts_url):
    cookie_str = get_session_cookie()
    if not cookie_str:
        print("ERROR: No active session cookie found! Authenticate first.")
        return
        
    print(f"=== Extracting Test Series ===")
    print(f"Target URL: {ts_url}")
    print(f"Using cookie: {cookie_str[:30]}...")
    
    html = fetch_test_series_page(ts_url, cookie_str)
    tests = parse_test_series_tests(html)
    print(f"Discovered {len(tests)} tests on page.")
    
    if not tests:
        print("No tests found. Check page HTML or session authentication.")
        return
        
    for i, t in enumerate(tests):
        print(f"[{i+1}/{len(tests)}] Extracting Test {t['id']}: {t['name']}...")
        qs = extract_test(t, cookie_str)
        if qs:
            save_test_to_db(t, qs)
            print(f"  -> Successfully imported {len(qs)} questions into SQLite database.")
        else:
            print(f"  -> Skipped or 0 questions returned.")
            
    print("=== Test Series Extraction Completed! ===")

if __name__ == '__main__':
    url = sys.argv[1] if len(sys.argv) > 1 else 'https://ayurquest.com/app1.5/testseries.php?action=ts_detail&ts=QUVxeE0wRXRIUHAralc2T0huSUdPQT09'
    run_test_series_extraction(url)

