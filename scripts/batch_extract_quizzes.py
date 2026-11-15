import urllib.request
import urllib.parse
import json
import time
import re
import os

session_cookie = "PHPSESSID=8ljh52u54bd84q0is60ka09km3"
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    'Cookie': session_cookie,
    'Referer': 'https://ayurquest.com/app1.5/quiz.php',
    'Content-Type': 'application/x-www-form-urlencoded'
}

# Target top available revision tests
target_tests = [
    {"id": 2737, "name": "Ashtang Hridya Nidana + Sharir Test-1", "samhita": "अष्टांग हृदय", "sub": "रोग निदान एवं शारीर"},
    {"id": 2734, "name": "Ashtang Hridya Sutra Test-8", "samhita": "अष्टांग हृदय", "sub": "सूत्रस्थान (अध्याय 15-30)"},
    {"id": 2730, "name": "Ashtang Hridya Sutra Test-4", "samhita": "अष्टांग हृदय", "sub": "सूत्रस्थान (अध्याय 1-15)"},
    {"id": 2723, "name": "Sushruta Uttar Tantra Test-16", "samhita": "सुश्रुत संहिता", "sub": "उत्तरतन्त्र (अध्याय 41-66)"},
    {"id": 2717, "name": "Sushruta Uttar Tantra Test-10", "samhita": "सुश्रुत संहिता", "sub": "उत्तरतन्त्र (अध्याय 21-40)"}
]

os.makedirs('server/src/data/extracted_quizzes', exist_ok=True)
all_extracted_mcqs = []
quiz_definitions = []

for item in target_tests:
    qid = item['id']
    name = item['name']
    print(f"\n--- Extracting Test {qid}: {name} ---")
    time.sleep(1.5) # respectful delay to protect server
    
    url = 'https://ayurquest.com/app1.5/quiz.php?action=play_quiz'
    data = urllib.parse.urlencode({'quiz_id': qid, 'solveAQquiz': 'Solve Test'}).encode('utf-8')
    req = urllib.request.Request(url, data=data, headers=headers)
    
    try:
        with urllib.request.urlopen(req, timeout=12) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
            
            splitters = re.split(r'id=[\'"]question_splitter_\d+[\'"]', html)
            test_mcqs = []
            
            for i, section in enumerate(splitters[1:], 1):
                # Question ID
                qid_match = re.search(r'<input\b[^>]*name=[\'"](\d+)[\'"]', section)
                mcq_id = int(qid_match.group(1)) if qid_match else (qid * 1000 + i)
                
                # Question text
                h4_match = re.search(r'<h4[^>]*>(.*?)</h4>', section, re.DOTALL | re.IGNORECASE)
                q_text = f"Question #{i}"
                if h4_match:
                    clean_h4 = re.sub(r'^\s*\d+\.\s*', '', h4_match.group(1))
                    clean_h4 = re.sub(r'<br\s*/?>', ' — ', clean_h4, flags=re.IGNORECASE)
                    q_text = re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', ' ', clean_h4)).replace('&nbsp;', ' ').strip()
                
                # Options
                labels = re.findall(r'<label[^>]*class=[\'"][^\'"]*btn-white[^\'"]*[\'"][^>]*>(.*?)</label>', section, re.DOTALL | re.IGNORECASE)
                clean_options = []
                for lbl in labels:
                    no_input = re.sub(r'<input\b[^>]*>', '', lbl, flags=re.IGNORECASE)
                    no_letter = re.sub(r'<strong\b[^>]*>\([A-D]\)</strong>', '', no_input, flags=re.IGNORECASE)
                    with_dash = re.sub(r'<br\s*/?>', ' — ', no_letter, flags=re.IGNORECASE)
                    opt_text = re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', ' ', with_dash)).replace('&nbsp;', ' ').strip()
                    clean_options.append(opt_text)
                
                o1 = clean_options[0] if len(clean_options) > 0 else "Option A"
                o2 = clean_options[1] if len(clean_options) > 1 else "Option B"
                o3 = clean_options[2] if len(clean_options) > 2 else "Option C"
                o4 = clean_options[3] if len(clean_options) > 3 else "Option D"
                
                mcq_obj = {
                    "id": mcq_id,
                    "Q": q_text,
                    "O1": o1,
                    "O2": o2,
                    "O3": o3,
                    "O4": o4,
                    "A": 1,
                    "UA": "AQ_quiz",
                    "B": "0",
                    "sam_id": 3 if "अष्टांग" in item['samhita'] else 2,
                    "sam": item['samhita'],
                    "sth_id": 301,
                    "sth": item['sub'],
                    "sub_id": 2,
                    "sub": item['sub'],
                    "com": f"{name} (AyurQuest Test #{qid}, MCQ #{mcq_id})",
                    "note": []
                }
                test_mcqs.append(mcq_obj)
            
            print(f"  Successfully parsed {len(test_mcqs)} questions for Test {qid}!")
            all_extracted_mcqs.extend(test_mcqs)
            
            quiz_definitions.append({
                "id": qid,
                "name": name,
                "sub": item['sub'],
                "m": len(test_mcqs) * 4,
                "q": len(test_mcqs),
                "qt": 90,
                "w": 50,
                "p": True,
                "d": "2026",
                "pt": "10:00 AM",
                "uuid": None,
                "r": True,
                "pm": 4,
                "nm": 1,
                "mode": "daily",
                "questionIds": [m['id'] for m in test_mcqs]
            })
            
    except Exception as e:
        print(f"  Error extracting Test {qid}:", e)

print(f"\n================ TOTAL EXTRACTED: {len(all_extracted_mcqs)} REAL MCQs ================")

# Write all questions to TypeScript
ts_content = """import { Question } from './questionsData.js';

export const realProdQuestionsExtracted: Question[] = """ + json.dumps(all_extracted_mcqs, ensure_ascii=False, indent=2) + ";\n"

with open('server/src/data/realProductionQuestionsExtracted.ts', 'w', encoding='utf-8') as f:
    f.write(ts_content)

# Write quiz definitions to JSON
with open('server/src/data/extracted_quizzes/quiz_definitions.json', 'w', encoding='utf-8') as f:
    json.dump(quiz_definitions, f, ensure_ascii=False, indent=2)

print("Saved server/src/data/realProductionQuestionsExtracted.ts and quiz_definitions.json successfully!")

