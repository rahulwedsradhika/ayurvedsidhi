import os
import sys
import re
import json
import time
import sqlite3
import urllib.request
import urllib.parse

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DB_PATH = os.path.join(BASE_DIR, 'server', 'data', 'ayurquest.db')
SESSION_FILE = os.path.join(BASE_DIR, 'production_dump', 'auth_session.json')
DUMP_DIR = os.path.join(BASE_DIR, 'production_dump')
CHECKPOINT_FILE = os.path.join(DUMP_DIR, 'test_series_checkpoint.json')

TS_TOKEN = 'QUVxeE0wRXRIUHAralc2T0huSUdPQT09'

def get_cookie():
    with open(SESSION_FILE, 'r', encoding='utf-8') as f:
        data = json.load(f)
        return data['cookie_header']

def get_feed(cookie, retries=3):
    url = f'https://ayurquest.com/app1.5/ajax.php?type=test_series&ts={TS_TOKEN}'
    req = urllib.request.Request(url, headers={
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/157.0.0.0 Safari/537.36',
        'Cookie': cookie,
        'X-Requested-With': 'XMLHttpRequest'
    })
    for attempt in range(retries):
        try:
            with urllib.request.urlopen(req, timeout=20) as resp:
                return json.loads(resp.read().decode('utf-8'))
        except Exception as e:
            if attempt < retries - 1:
                time.sleep(2)
            else:
                raise e

def solve_and_get_qids(quiz_id, cookie, retries=3):
    url = f'https://ayurquest.com/app1.5/quiz.php?action=solve_aiapget&quiz_id={urllib.parse.quote(quiz_id)}'
    req = urllib.request.Request(url, headers={
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/157.0.0.0 Safari/537.36',
        'Cookie': cookie,
        'Referer': f'https://ayurquest.com/app1.5/testseries.php?action=ts_detail&ts={TS_TOKEN}'
    })
    for attempt in range(retries):
        try:
            with urllib.request.urlopen(req, timeout=25) as resp:
                html = resp.read().decode('utf-8', errors='ignore')
                qids = sorted(list(set(re.findall(r'<input\b[^>]*name=[\'"](\d+)[\'"]', html))))
                if qids:
                    return qids
        except Exception as e:
            print(f"    (Attempt {attempt+1}/{retries} error: {e})")
            time.sleep(2)
    return []

def submit_paper(qids, quiz_id, cookie, retries=3):
    url = 'https://ayurquest.com/app1.5/ajax_paper.php'
    post_dict = {qid: 'AQ_quiz' for qid in qids}
    data = urllib.parse.urlencode(post_dict).encode('utf-8')
    req = urllib.request.Request(url, data=data, headers={
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/157.0.0.0 Safari/537.36',
        'Cookie': cookie,
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'X-Requested-With': 'XMLHttpRequest',
        'Referer': f'https://ayurquest.com/app1.5/quiz.php?action=solve_aiapget&quiz_id={urllib.parse.quote(quiz_id)}'
    })
    for attempt in range(retries):
        try:
            with urllib.request.urlopen(req, timeout=35) as resp:
                res_text = resp.read().decode('utf-8', errors='ignore').strip()
                if res_text == '1':
                    return True
        except Exception as e:
            print(f"    (Attempt {attempt+1}/{retries} submit error: {e})")
            time.sleep(2)
    return False

def fetch_result(uuid, cookie, retries=3):
    url = f'https://ayurquest.com/app1.5/ajax.php?type=result&uuid={uuid}'
    req = urllib.request.Request(url, headers={
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/157.0.0.0 Safari/537.36',
        'Cookie': cookie,
        'X-Requested-With': 'XMLHttpRequest'
    })
    for attempt in range(retries):
        try:
            with urllib.request.urlopen(req, timeout=25) as resp:
                return json.loads(resp.read().decode('utf-8'))
        except Exception as e:
            print(f"    (Attempt {attempt+1}/{retries} result error: {e})")
            time.sleep(2)
    return []

def save_to_database(test_num, test_meta, questions):
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    
    local_test_id = 10000 + test_num
    test_name = test_meta.get('name', f'Test Series {test_num}')
    subject = test_meta.get('sub', 'Ayurveda Test Series')
    total_q = len(questions)
    uuid_str = test_meta.get('uuid', '')
    
    cur.execute("""
        INSERT OR REPLACE INTO tests (id, name, subject, total_questions, duration_minutes, total_marks, negative_marks, category, uuid)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (local_test_id, f"Test Series #{test_num}: {test_name}", subject, total_q, 120, total_q * 4, 1.0, 'Test Series', uuid_str))
    
    order = 1
    new_q_count = 0
    for q in questions:
        qid = int(q.get('id') or 0)
        if not qid:
            continue
            
        stem = (q.get('Q') or '').strip()
        o1 = (q.get('O1') or '').strip()
        o2 = (q.get('O2') or '').strip()
        o3 = (q.get('O3') or '').strip()
        o4 = (q.get('O4') or '').strip()
        
        try:
            ans = int(q.get('A') or 1)
        except (ValueError, TypeError):
            ans = 1
            
        com = (q.get('com') or '').strip()
        sam_id = int(q.get('sam_id') or 0)
        sth_id = int(q.get('sth_id') or 0)
        sub_id = int(q.get('sub_id') or 0)
        sam_name = q.get('sam') or ''
        sth_name = q.get('sth') or ''
        sub_name = q.get('sub') or ''
        
        cur.execute("""
            INSERT OR REPLACE INTO questions (
                id, stem, option_1, option_2, option_3, option_4,
                correct_answer, explanation, reference_source,
                samhita_id, samhita_name, sthana_id, sthana_name, subject_id, subject_name,
                tag, difficulty, language
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'single_choice', 'moderate', 'sa/hi/en')
        """, (qid, stem, o1, o2, o3, o4, ans, com, sam_name or sub_name, sam_id, sam_name, sth_id, sth_name, sub_id, sub_name))
        
        cur.execute("""
            INSERT OR REPLACE INTO test_questions (test_id, question_id, question_order)
            VALUES (?, ?, ?)
        """, (local_test_id, qid, order))
        order += 1
        new_q_count += 1
        
    conn.commit()
    conn.close()
    return new_q_count

def run_extraction():
    print("=======================================================")
    print("  AYURQUEST 35 TEST SERIES AUTOMATED EXTRACTOR (RESILIENT)")
    print("=======================================================")
    cookie = get_cookie()
    
    feed = get_feed(cookie)
    print(f"Retrieved feed with {len(feed)} tests.")
    
    checkpoint = {}
    if os.path.exists(CHECKPOINT_FILE):
        try:
            with open(CHECKPOINT_FILE, 'r', encoding='utf-8') as f:
                checkpoint = json.load(f)
        except Exception:
            checkpoint = {}
            
    completed_indices = set(checkpoint.get('completed_indices', []))
    total_extracted_questions = checkpoint.get('total_questions', 0)
    print(f"Resuming from checkpoint: {len(completed_indices)} tests already done, {total_extracted_questions} questions in DB.")
    
    for i, test in enumerate(feed):
        idx = i + 1
        t_id = test['id']
        t_name = test['name']
        t_sub = test.get('sub', '')
        
        if idx in completed_indices:
            print(f"[{idx:2d}/35] ALREADY COMPLETED: {t_name}")
            continue
            
        print(f"\n[{idx:2d}/35] Processing: {t_name} ({t_sub})...")
        uuid = test.get('uuid')
        
        if not uuid:
            print(f"  -> Opening exam to get question IDs...")
            qids = solve_and_get_qids(t_id, cookie)
            if not qids:
                print(f"  [!] Failed to get question IDs for test {idx}. Retrying once...")
                time.sleep(3)
                qids = solve_and_get_qids(t_id, cookie)
                if not qids:
                    print(f"  [!] Skipping test {idx} for now.")
                    continue
                    
            print(f"  -> Found {len(qids)} questions. Submitting paper...")
            submitted = submit_paper(qids, t_id, cookie)
            if not submitted:
                print(f"  [!] Submit paper failed for test {idx}. Skipping.")
                continue
                
            time.sleep(1.5)
            updated_feed = get_feed(cookie)
            uuid = updated_feed[i].get('uuid')
            test['uuid'] = uuid
            print(f"  -> Answersheet prepared! UUID: {uuid}")
            
        if not uuid:
            print(f"  [!] Still no UUID for test {idx}. Skipping.")
            continue
            
        print(f"  -> Fetching full questions & answers JSON...")
        questions = fetch_result(uuid, cookie)
        if not questions:
            print(f"  [!] Empty questions result for test {idx}. Skipping.")
            continue
            
        q_count = save_to_database(idx, test, questions)
        total_extracted_questions += q_count
        completed_indices.add(idx)
        print(f"  [✓] Successfully imported {q_count} questions into local DB!")
        print(f"  [✓] Progress: {len(completed_indices)}/35 tests complete ({total_extracted_questions} total questions)")
        
        with open(CHECKPOINT_FILE, 'w', encoding='utf-8') as f:
            json.dump({
                'completed_indices': sorted(list(completed_indices)),
                'total_questions': total_extracted_questions
            }, f, indent=2)
            
        time.sleep(1)
        
    print("\n=======================================================")
    print(f"  EXTRACTION FINISHED: {len(completed_indices)}/35 Tests Extracted")
    print(f"  Total Questions Ingested: {total_extracted_questions}")
    print(f"  All questions permanently stored in: {DB_PATH}")
    print("=======================================================")

if __name__ == '__main__':
    run_extraction()
