import os
import re
import json
import time
import sqlite3
import urllib.request
import urllib.parse

class NoRedirectHandler(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return None

opener = urllib.request.build_opener(NoRedirectHandler)

SESSION_COOKIE = "PHPSESSID=8ljh52u54bd84q0is60ka09km3"
HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/157.0.0.0 Safari/537.36',
    'Cookie': SESSION_COOKIE,
}

DB_PATH = os.path.join(os.path.dirname(__file__), '..', 'server', 'data', 'ayurquest.db')
CHECKPOINT_PATH = os.path.join(os.path.dirname(__file__), '..', 'production_dump', 'extraction_checkpoint.json')
DUMP_DIR = os.path.join(os.path.dirname(__file__), '..', 'production_dump')
SCHEMA_PATH = os.path.join(os.path.dirname(__file__), '..', 'server', 'src', 'db', 'schema.sql')

SAMHITA_NAMES = {
    1: 'Charaka Samhita',
    2: 'Sushruta Samhita',
    3: 'Ashtanga Hridaya',
    4: 'Ashtanga Samgraha',
    5: 'Madhava Nidana',
    6: 'Sharangadhara Samhita',
    7: 'Bhavaprakasha',
    8: 'Kashyapa Samhita',
    9: 'Bhela Samhita',
    10: 'Harita Samhita',
    11: 'Chakradatta',
    12: 'Yogaratnakara',
    13: 'Bhaishajya Ratnavali',
    14: 'Rasatarangini',
    15: 'Rasaratnasamucchaya',
    16: 'Gadanigraha'
}

SUBJECT_NAMES = {
    1: 'Kayachikitsa',
    2: 'Rog Nidana & Vikriti Vijnana',
    3: 'Dravyaguna Vijnana',
    4: 'Shalya Tantra',
    5: 'Shalakya Tantra',
    6: 'Prasuti Tantra & Stri Roga',
    7: 'Kaumarbhritya',
    8: 'Maulik Siddhanta & Samhita',
    9: 'Rasa Shastra & Bhaishajya Kalpana',
    10: 'Sharir Rachna',
    11: 'Sharir Kriya / Physiology',
    12: 'Swasthavritta',
    13: 'Panchakarma',
    14: 'Padarth Vigyan',
    15: 'Ayurveda ka Itihas'
}

def init_database():
    os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    with open(SCHEMA_PATH, 'r', encoding='utf-8') as f:
        conn.executescript(f.read())
    # Ensure Pro local dev user
    conn.execute("""
        INSERT OR REPLACE INTO user_profile (id, name, email, phone, subscription_tier, user_type, is_pro)
        VALUES ('local_dev_user', 'Rohit (Pro Dev User)', 'rohit@ayurquest.local', '+917006923314', 'PRO', 'TEST_STUDENT', 1)
    """)
    conn.commit()
    return conn

def smart_extract_quiz(quiz_id):
    play_url = 'https://ayurquest.com/app1.5/quiz.php?action=play_quiz'
    play_data = urllib.parse.urlencode({'quiz_id': str(quiz_id), 'solveAQquiz': 'Solve Test'}).encode('utf-8')
    req1 = urllib.request.Request(play_url, data=play_data, headers={
        **HEADERS,
        'Referer': 'https://ayurquest.com/app1.5/quiz.php?action=free_quiz',
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
        
        # Submit test to trigger answer calculation
        res_url = 'https://ayurquest.com/app1.5/quiz.php?action=quiz_result'
        sub_dict = {qid: 'AQ_quiz' for qid in unique_qids}
        sub_data = urllib.parse.urlencode(sub_dict).encode('utf-8')
        req2 = urllib.request.Request(res_url, data=sub_data, headers={
            **HEADERS,
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
                print(f"Quiz {quiz_id}: Gated (Membership required)")
                return []
            m = re.search(r'uuid=([a-f0-9]+)', loc)
            if m:
                target_uuid = m.group(1)
    except Exception as ex:
        print(f"Quiz {quiz_id} play error: {ex}")
        return []
    
    if not target_uuid:
        return []
    
    json_url = f'https://ayurquest.com/app1.5/ajax.php?type=result&uuid={target_uuid}'
    req3 = urllib.request.Request(json_url, headers={
        **HEADERS,
        'Referer': f'https://ayurquest.com/app1.5/quiz.php?action=quiz_result&uuid={target_uuid}',
        'X-Requested-With': 'XMLHttpRequest'
    })
    try:
        with urllib.request.urlopen(req3, timeout=15) as resp3:
            data_str = resp3.read().decode('utf-8', errors='ignore')
            return json.loads(data_str)
    except Exception as ex3:
        print(f"Quiz {quiz_id} JSON error: {ex3}")
        return []

def main():
    print("=== AyurQuest Complete Question Bank Extractor & DB Importer ===")
    conn = init_database()
    
    with open(os.path.join(DUMP_DIR, 'all_free_daily_quizzes.json'), 'r', encoding='utf-8') as f:
        quizzes = json.load(f)
    print(f"Loaded {len(quizzes)} authorized quizzes from catalogue.")
    
    checkpoint = {}
    if os.path.exists(CHECKPOINT_PATH):
        try:
            with open(CHECKPOINT_PATH, 'r', encoding='utf-8') as f:
                checkpoint = json.load(f)
        except Exception:
            checkpoint = {}
    
    print(f"Checkpoint contains {len(checkpoint)} already completed quizzes.")
    
    total_quizzes = len(quizzes)
    extracted_total_count = 0
    unique_questions = {}
    test_question_links = []
    
    for idx, qinfo in enumerate(quizzes, 1):
        qid = int(qinfo['id'])
        qname = qinfo.get('name', f'Test {qid}')
        qsub = qinfo.get('sub', '')
        q_count = int(qinfo.get('q', 50))
        duration = int(qinfo.get('qt', 45))
        marks = int(qinfo.get('m', 200))
        
        # Check if cached in checkpoint
        if str(qid) in checkpoint and len(checkpoint[str(qid)]) > 0:
            qs = checkpoint[str(qid)]
            print(f"[{idx:2d}/{total_quizzes}] (Cached) Quiz {qid}: '{qname}' ({len(qs)} questions)")
        else:
            print(f"[{idx:2d}/{total_quizzes}] Extracting Quiz {qid}: '{qname}'...", end=" ", flush=True)
            qs = smart_extract_quiz(qid)
            if qs:
                print(f"Done! ({len(qs)} questions)")
                checkpoint[str(qid)] = qs
                with open(CHECKPOINT_PATH, 'w', encoding='utf-8') as f:
                    json.dump(checkpoint, f, ensure_ascii=False)
            else:
                print("Skipped or 0 questions.")
            time.sleep(0.5)
                
        # Insert test into DB
        conn.execute("""
            INSERT OR REPLACE INTO tests (id, name, subject, total_questions, duration_minutes, total_marks, negative_marks, category)
            VALUES (?, ?, ?, ?, ?, ?, 1.0, 'Daily Free Test')
        """, (qid, qname, qsub, q_count, duration, marks))
        
        # Process questions
        for order, q in enumerate(qs, 1):
            raw_id = q.get('id')
            if not raw_id:
                continue
            qid_int = int(raw_id)
            extracted_total_count += 1
            
            sam_id = int(q.get('sam_id')) if q.get('sam_id') and str(q.get('sam_id')).isdigit() else None
            sth_id = int(q.get('sth_id')) if q.get('sth_id') and str(q.get('sth_id')).isdigit() else None
            sub_id = int(q.get('sub_id')) if q.get('sub_id') and str(q.get('sub_id')).isdigit() else None
            
            sam_name = SAMHITA_NAMES.get(sam_id) if sam_id else None
            sub_name = qsub or (SUBJECT_NAMES.get(sub_id) if sub_id else 'Ayurveda')
            
            stem = q.get('Q', '').strip()
            o1 = q.get('O1', '').strip()
            o2 = q.get('O2', '').strip()
            o3 = q.get('O3', '').strip()
            o4 = q.get('O4', '').strip()
            correct = int(q.get('A', 1))
            com = q.get('com', '').strip()
            
            tag = 'single_choice'
            if 'statement' in stem.lower() or 'कथन' in stem:
                tag = 'statement'
            elif 'assertion' in stem.lower() or 'अभिकथन' in stem or 'कारण' in stem:
                tag = 'assertion_reason'
            elif 'match' in stem.lower() or 'सुमेलित' in stem:
                tag = 'match'
            elif '<img' in stem.lower() or '.jpg' in stem.lower() or '.png' in stem.lower():
                tag = 'image_based'
            elif any(k in stem for k in ['अंजलि', 'अंगुलि', 'प्रमाण', 'संख्या', 'मात्रा']):
                tag = 'numerical'
            elif '...........' in stem or 'रिक्त स्थान' in stem:
                tag = 'fill_in_the_blank'
                
            unique_questions[qid_int] = (
                qid_int, stem, o1, o2, o3, o4, correct, com, com,
                sam_id, sam_name, sth_id, None, sub_id, sub_name, None, None, tag, None, 'moderate', 'sa/hi/en'
            )
            
            test_question_links.append((qid, qid_int, order))

    # Also import Test 2737 if not present
    if 2737 not in [int(q['id']) for q in quizzes]:
        print("\nAdding Test 2737 (Ashtanga Hridaya Revision)...")
        conn.execute("""
            INSERT OR REPLACE INTO tests (id, name, subject, total_questions, duration_minutes, total_marks, negative_marks, category)
            VALUES (2737, 'Ashtanga Hridaya Nidana & Sharira Sthana Revision Test', 'Ashtanga Hridaya', 100, 90, 400, 1.0, 'Revision Test')
        """)

    print(f"\nTotal question occurrences across tests: {extracted_total_count}")
    print(f"Total unique canonical questions:        {len(unique_questions)}")
    
    print("Writing canonical questions to SQLite database...")
    conn.executemany("""
        INSERT OR REPLACE INTO questions (
            id, stem, option_1, option_2, option_3, option_4, correct_answer, explanation, reference_source,
            samhita_id, samhita_name, sthana_id, sthana_name, subject_id, subject_name, chapter_id, chapter_name, tag, image_url, difficulty, language
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, list(unique_questions.values()))
    
    print("Writing test_questions relationships to SQLite database...")
    conn.executemany("""
        INSERT OR REPLACE INTO test_questions (test_id, question_id, question_order)
        VALUES (?, ?, ?)
    """, test_question_links)
    
    # Import reported questions from reported_questions.html
    rep_path = os.path.join(DUMP_DIR, 'reported_questions.html')
    if os.path.exists(rep_path):
        print("Importing faculty-verified reported questions...")
        with open(rep_path, 'r', encoding='utf-8') as f:
            rep_html = f.read()
        
        rep_blocks = re.split(r'Q\.(\d+):', rep_html)
        rep_count = 0
        for i in range(1, len(rep_blocks), 2):
            q_num = rep_blocks[i]
            q_body = rep_blocks[i+1]
            
            stem_m = re.search(r'</strong>\s*(.*?)\s*</div>', q_body)
            stem = stem_m.group(1).strip() if stem_m else ""
            
            opts = re.findall(r'<strong>\(([A-D])\)\s*</strong>\s*(.*?)\s*(?:<i|</div>)', q_body)
            opt_dict = {k: re.sub(r'<[^>]+>', '', v).strip() for k, v in opts}
            
            correct_m = re.search(r'<strong>\(([A-D])\)\s*</strong>.*?fa-check-circle', q_body, re.DOTALL)
            correct_letter = correct_m.group(1) if correct_m else 'A'
            correct_num = {'A': 1, 'B': 2, 'C': 3, 'D': 4}.get(correct_letter, 1)
            
            ref_m = re.search(r'<strong>Reference:\s*</strong>\s*(.*?)\s*</div>', q_body)
            ref = ref_m.group(1).strip() if ref_m else ""
            
            query_m = re.search(r'<strong>([^:<]+):</strong>\s*(.*?)\s*(?:</a>|</div>)', q_body)
            st_name = query_m.group(1).strip() if query_m else ""
            st_query = query_m.group(2).strip() if query_m else ""
            
            res_m = re.search(r'Dr\.\s*([^:<]+):</strong>\s*(.*?)\s*</div>', q_body)
            fac_name = f"Dr. {res_m.group(1).strip()}" if res_m else "Faculty"
            fac_res = res_m.group(2).strip() if res_m else ""
            
            synthetic_id = 900000 + int(q_num)
            conn.execute("""
                INSERT OR REPLACE INTO questions (
                    id, stem, option_1, option_2, option_3, option_4, correct_answer, explanation, reference_source,
                    samhita_id, samhita_name, sthana_id, sthana_name, subject_id, subject_name, chapter_id, chapter_name, tag, image_url, difficulty, language
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                synthetic_id, stem, opt_dict.get('A', ''), opt_dict.get('B', ''), opt_dict.get('C', ''), opt_dict.get('D', ''),
                correct_num, fac_res or ref, ref, 2, 'Sushruta Samhita', None, None, 4, 'Shalya Tantra', None, None, 'reported_verified', None, 'moderate', 'sa/hi'
            ))
            
            conn.execute("""
                INSERT OR REPLACE INTO reported_questions (question_id, student_name, student_query, faculty_name, faculty_resolution)
                VALUES (?, ?, ?, ?, ?)
            """, (synthetic_id, st_name, st_query, fac_name, fac_res))
            rep_count += 1
            
        print(f"Imported {rep_count} faculty-resolved reported questions.")
        
    conn.commit()
    
    cur = conn.cursor()
    cur.execute("SELECT COUNT(*) FROM questions")
    total_q_in_db = cur.fetchone()[0]
    
    cur.execute("SELECT COUNT(*) FROM tests")
    total_t_in_db = cur.fetchone()[0]
    
    cur.execute("SELECT COUNT(*) FROM test_questions")
    total_tq_in_db = cur.fetchone()[0]
    
    cur.execute("SELECT COUNT(*) FROM reported_questions")
    total_rq_in_db = cur.fetchone()[0]
    
    print("\n================ FINAL RECONCILIATION REPORT ================")
    print(f"Total Tests in Database:              {total_t_in_db}")
    print(f"Total Test-Question Associations:     {total_tq_in_db}")
    print(f"Total Canonical Questions in DB:      {total_q_in_db}")
    print(f"Total Faculty Reported Questions:     {total_rq_in_db}")
    print(f"Database File Size:                   {os.path.getsize(DB_PATH) / 1024:.1f} KB")
    print(f"Database Path:                        {os.path.abspath(DB_PATH)}")
    print("=============================================================\n")
    conn.close()

if __name__ == '__main__':
    main()
