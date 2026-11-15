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
CHECKPOINT_FILE = os.path.join(DUMP_DIR, 'qbank_checkpoint.json')

ANDROID_UA = 'Mozilla/5.0 (Linux; U; Android 14; en-us; SM-S908B Build/UP1A.231005.007) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/120.0.6099.230 Mobile Safari/537.36 WebViewGold'
PACKAGE_HEADER = 'com.hostingwebdesigns.ayurquest'

KNOWN_SAMHITAS = [
    'Charaka Samhita', 'Sushruta Samhita', 'Ashtanga Hridaya', 'Ashtanga Samgrah',
    'Chakradatt Samhita', 'Madhava Nidana', 'Yog Ratnakar', 'Sharangadhara Samhita',
    'Bhavaprakash Samhita', 'Kashyapa Samhita', 'Harita Samhita', 'Bhel Samhita',
    'Bhaishjya Ratnavali', 'Ras Ratan Sammuchaya', 'Ras Tarangini', 'Ras Saar Samgraha'
]

KNOWN_STHANAS = [
    'Sutra Sthana', 'Nidana Sthana', 'Vimana Sthana', 'Sharir Sthana', 'Sharira Sthana',
    'Indriya Sthana', 'Chikitsa Sthana', 'Kalpa Sthana', 'Siddhi Sthana', 'Uttara Tantra',
    'Uttaratantra', 'Khila Sthana'
]

def get_cookie():
    with open(SESSION_FILE, 'r', encoding='utf-8') as f:
        data = json.load(f)
        return data['cookie_header']

def clean_html_text(text):
    if not text:
        return ''
    t = re.sub(r'<[^>]+>', ' ', text)
    return ' '.join(t.split()).strip()

def parse_correct_response(resp_html):
    if not resp_html:
        return '', '', None, None
    
    # Reference
    ref_m = re.search(r'<strong>Reference:</strong>\s*(.*?)(?:<br>|$)', resp_html, re.I | re.DOTALL)
    ref = clean_html_text(ref_m.group(1)) if ref_m else ''
    
    # Comments / Explanation
    com_m = re.search(r'<strong>Comments:\s*</strong>\s*(.*?)(?:<br>|$)', resp_html, re.I | re.DOTALL)
    com = clean_html_text(com_m.group(1)) if com_m else ''
    
    # Detect samhita
    samhita = None
    ref_lower = ref.lower()
    for s in KNOWN_SAMHITAS:
        if s.lower() in ref_lower:
            samhita = s
            break
            
    # Detect sthana
    sthana = None
    for sth in KNOWN_STHANAS:
        if sth.lower() in ref_lower:
            sthana = sth
            break
            
    return ref, com, samhita, sthana

def fetch_page(url, cookie, retries=3):
    req = urllib.request.Request(url, headers={
        'User-Agent': ANDROID_UA,
        'Cookie': cookie,
        'X-Requested-With': PACKAGE_HEADER,
        'Referer': 'https://ayurquest.com/app1.5/category.php?action=subjects'
    })
    for attempt in range(retries):
        try:
            with urllib.request.urlopen(req, timeout=25) as resp:
                return resp.read().decode('utf-8', errors='ignore')
        except Exception as e:
            if attempt < retries - 1:
                time.sleep(2)
            else:
                print(f"Error fetching {url}: {e}")
                return None
    return None

def extract_questions_from_html(html):
    if not html:
        return []
    idx = html.find('questions: [')
    if idx == -1:
        return []
    end_idx = html.find('} );', idx)
    if end_idx == -1:
        return []
    json_str = html[idx + len('questions:'):end_idx].strip()
    try:
        return json.loads(json_str)
    except Exception as e:
        print("JSON parse error in questions array:", e)
        return []

def get_serial_urls(html):
    if not html:
        return []
    options = re.findall(r'<option\s+value=[\'"]([^\'"]+)[\'"][^>]*>Serial\s*(\d+)', html)
    urls = []
    for val, s_num in options:
        if val.startswith('?'):
            full_url = f"https://ayurquest.com/app1.5/category.php{val}"
        elif val.startswith('/'):
            full_url = f"https://ayurquest.com{val}"
        elif val.startswith('http'):
            full_url = val
        else:
            full_url = f"https://ayurquest.com/app1.5/{val}"
        urls.append((int(s_num), full_url))
    urls.sort(key=lambda x: x[0])
    return urls

def save_questions_to_db(questions, subject_name, subject_id=None):
    if not questions:
        return 0
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    saved = 0
    for q in questions:
        qid = q.get('qid')
        if not qid:
            continue
        stem = q.get('q', '').strip()
        opts = q.get('options', [])
        o1 = opts[0].strip() if len(opts) > 0 else ''
        o2 = opts[1].strip() if len(opts) > 1 else ''
        o3 = opts[2].strip() if len(opts) > 2 else ''
        o4 = opts[3].strip() if len(opts) > 3 else ''
        
        corr_idx = q.get('correctIndex', 0)
        corr_ans = corr_idx + 1 if isinstance(corr_idx, int) else 1
        
        correct_resp = q.get('correctResponse', '')
        ref, explanation, samhita, sthana = parse_correct_response(correct_resp)
        
        cur.execute("""
            INSERT OR REPLACE INTO questions (
                id, stem, option_1, option_2, option_3, option_4,
                correct_answer, explanation, reference_source,
                samhita_name, sthana_name,
                subject_name, subject_id, tag, difficulty, language
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'single_choice', 'moderate', 'sa/hi/en')
        """, (qid, stem, o1, o2, o3, o4, corr_ans, explanation, ref, samhita, sthana, subject_name, subject_id))
        saved += 1
        
    conn.commit()
    conn.close()
    return saved

def get_all_subjects(cookie):
    url = 'https://ayurquest.com/app1.5/category.php?action=subjects'
    html = fetch_page(url, cookie)
    if not html:
        return []
    
    matches = re.findall(r'<a\s+[^>]*href=[\'"]\?action=questions&subject=([^\'"]+)[\'"][^>]*>.*?<span class="badge[^>]*>\s*(\d+)\s*</span>.*?<span class="strong\s*">\s*([^<]+)\s*</span>', html, re.DOTALL)
    subjects = []
    for idx, (token, count_str, name) in enumerate(matches):
        subjects.append({
            'index': idx + 1,
            'name': clean_html_text(name),
            'token': token,
            'count': int(count_str),
            'url': f"https://ayurquest.com/app1.5/category.php?action=questions&subject={token}"
        })
    return subjects

def run_extraction(target_subject_idx=None, max_pages=None):
    cookie = get_cookie()
    subjects = get_all_subjects(cookie)
    total_q_all = sum(s['count'] for s in subjects)
    print("=======================================================")
    print("  AYURQUEST 57,375 MCQ QUESTION BANK EXTRACTOR")
    print("=======================================================")
    print(f"Loaded {len(subjects)} subjects containing {total_q_all} MCQs.")
    
    checkpoint = {'completed_serials': [], 'saved_questions': 0}
    if os.path.exists(CHECKPOINT_FILE):
        try:
            with open(CHECKPOINT_FILE, 'r', encoding='utf-8') as f:
                checkpoint = json.load(f)
        except Exception:
            pass
            
    completed_serials = set(checkpoint.get('completed_serials', []))
    total_saved = checkpoint.get('saved_questions', 0)
    print(f"Checkpoint status: {len(completed_serials)} pages completed, {total_saved} questions in checkpoint.")
    
    for sub in subjects:
        s_idx = sub['index']
        s_name = sub['name']
        s_count = sub['count']
        
        if target_subject_idx is not None and s_idx != target_subject_idx:
            continue
            
        print(f"\n--- [{s_idx}/{len(subjects)}] {s_name} ({s_count} MCQs) ---")
        
        # Fetch page 1
        page1_html = fetch_page(sub['url'], cookie)
        if not page1_html:
            print(f"Failed to fetch page 1 for {s_name}")
            continue
            
        serials = get_serial_urls(page1_html)
        if not serials:
            # Maybe only 1 page
            serials = [(1, sub['url'])]
            
        print(f"Found {len(serials)} serial pages for {s_name}")
        
        pages_done = 0
        for s_num, s_url in serials:
            if max_pages and pages_done >= max_pages:
                print(f"Reached max pages limit ({max_pages}). Moving to next.")
                break
                
            serial_key = f"{sub['token']}_serial_{s_num}"
            if serial_key in completed_serials:
                print(f"  [Serial {s_num:2d}/{len(serials)}] ALREADY EXTRACTED")
                pages_done += 1
                continue
                
            print(f"  [Serial {s_num:2d}/{len(serials)}] Fetching {s_url} ...")
            if s_num == 1:
                html = page1_html
            else:
                html = fetch_page(s_url, cookie)
                
            questions = extract_questions_from_html(html)
            if not questions:
                print(f"    [!] Warning: 0 questions extracted from Serial {s_num}!")
                continue
                
            saved_count = save_questions_to_db(questions, s_name, s_idx)
            total_saved += saved_count
            completed_serials.add(serial_key)
            pages_done += 1
            
            # Save checkpoint
            checkpoint['completed_serials'] = list(completed_serials)
            checkpoint['saved_questions'] = total_saved
            with open(CHECKPOINT_FILE, 'w', encoding='utf-8') as f:
                json.dump(checkpoint, f)
                
            print(f"    -> Saved {saved_count} questions to SQLite. (Total DB questions: {total_saved})")
            time.sleep(0.4)

if __name__ == '__main__':
    test_mode = '--test' in sys.argv
    if test_mode:
        print("Running in TEST mode (Subject 1, 2 pages)...")
        run_extraction(target_subject_idx=1, max_pages=2)
    elif '--subject' in sys.argv:
        idx = int(sys.argv[sys.argv.index('--subject') + 1])
        run_extraction(target_subject_idx=idx)
    else:
        run_extraction()
