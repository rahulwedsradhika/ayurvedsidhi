import sqlite3
import json
import os

DB_PATH = os.path.join(os.path.dirname(__file__), '..', 'server', 'data', 'ayurquest.db')
TS_PATH = os.path.join(os.path.dirname(__file__), '..', 'server', 'src', 'data', 'realProductionQuestions.ts')

conn = sqlite3.connect(DB_PATH)

with open(TS_PATH, 'r', encoding='utf-8') as f:
    text = f.read()

start = text.find('= [') + 2
end = text.rfind(']') + 1
questions = json.loads(text[start:end])
print(f"Loaded {len(questions)} questions from realProductionQuestions.ts")

conn.execute("""
    INSERT OR REPLACE INTO tests (id, name, subject, total_questions, duration_minutes, total_marks, negative_marks, category)
    VALUES (2737, 'Ashtanga Hridaya Nidana & Sharira Sthana Revision Test', 'Ashtanga Hridaya', 100, 90, 400, 1.0, 'Revision Test')
""")

imported_q = 0
for order, q in enumerate(questions, 1):
    qid = int(q['id'])
    stem = q['Q']
    o1 = q['O1']
    o2 = q['O2']
    o3 = q['O3']
    o4 = q['O4']
    correct = int(q.get('A', 1))
    com = q.get('com', '')
    
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
        
    conn.execute("""
        INSERT OR REPLACE INTO questions (
            id, stem, option_1, option_2, option_3, option_4, correct_answer, explanation, reference_source,
            samhita_id, samhita_name, sthana_id, sthana_name, subject_id, subject_name, chapter_id, chapter_name, tag, image_url, difficulty, language
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        qid, stem, o1, o2, o3, o4, correct, com, com,
        3, 'Ashtanga Hridaya', 302, 'निदान / शारीर स्थान', 2, 'रोग निदान एवं विकृति विज्ञान', None, None, tag, None, 'moderate', 'sa/hi/en'
    ))
    
    conn.execute("""
        INSERT OR REPLACE INTO test_questions (test_id, question_id, question_order)
        VALUES (2737, ?, ?)
    """, (qid, order))
    imported_q += 1

conn.commit()

cur = conn.cursor()
cur.execute("SELECT COUNT(*) FROM questions")
total_q = cur.fetchone()[0]

cur.execute("SELECT COUNT(*) FROM tests")
total_t = cur.fetchone()[0]

cur.execute("SELECT COUNT(*) FROM test_questions")
total_tq = cur.fetchone()[0]

print(f"Imported {imported_q} questions for Test 2737.")
print(f"NEW DATABASE TOTALS: {total_q} canonical questions, {total_t} tests, {total_tq} test-question links.")
conn.close()
