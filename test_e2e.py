import urllib.request
import urllib.parse
import json

BASE_URL = "http://localhost:3000"

def test_get(path):
    url = f"{BASE_URL}{path}"
    req = urllib.request.Request(url)
    with urllib.request.urlopen(req, timeout=5) as resp:
        body = resp.read()
        print(f"[GET] {path} -> {resp.status} ({len(body)} bytes)")
        return resp.status, body

def test_post_json(path, data):
    url = f"{BASE_URL}{path}"
    json_data = json.dumps(data).encode('utf-8')
    req = urllib.request.Request(url, data=json_data, headers={'Content-Type': 'application/json'})
    with urllib.request.urlopen(req, timeout=5) as resp:
        body = resp.read().decode('utf-8')
        print(f"[POST JSON] {path} -> {resp.status} ({len(body)} bytes): {body[:60]}")
        return resp.status, body

def test_post_form(path, data):
    url = f"{BASE_URL}{path}"
    form_data = urllib.parse.urlencode(data).encode('utf-8')
    req = urllib.request.Request(url, data=form_data, headers={'Content-Type': 'application/x-www-form-urlencoded'})
    with urllib.request.urlopen(req, timeout=5) as resp:
        body = resp.read().decode('utf-8')
        print(f"[POST FORM] {path} -> {resp.status} ({len(body)} bytes): {body[:60]}")
        return resp.status, body

print("==================================================")
print("  AYURQUEST 1.5 REPLICA E2E END-TO-END TEST SUITE")
print("==================================================")

# 1. Frontend Root
test_get("/")

# 2. Proxy Dashboard API
status, body = test_get("/api/dashboard")
dash = json.loads(body)
print(f"  User: {dash['user']['name']} ({dash['user']['membershipPlan']})")
print(f"  Total Courses: {dash['stats']['totalCourses']}, Bookmarks: {dash['stats']['bookmarkedCount']}")

# 3. Courses API
status, body = test_get("/api/courses")
courses = json.loads(body)
print(f"  Loaded {len(courses)} Courses. First: {courses[0]['title']}")

# 4. Samhitas API
status, body = test_get("/api/samhitas")
samhitas = json.loads(body)
print(f"  Loaded {len(samhitas)} Samhitas. First: {samhitas[0]['name']}")

# 5. Quizzes API
status, body = test_get("/api/quizzes")
quizzes = json.loads(body)
print(f"  Loaded {len(quizzes)} Quizzes. First: {quizzes[0]['name']}")

# 6. Question Solve in Practice Mode
status, body = test_post_json("/api/questions/101/solve", {"selectedAnswer": 2, "time": "8s", "guess": False})
solve_res = json.loads(body)
print(f"  Question #101 Solve: Correct={solve_res['isCorrect']}, Explanation={solve_res['explanation'][:50]}...")

# 7. Legacy AJAX Bookmark Call
status, body = test_post_form("/ajax_bookmark.php", {"que_id": 105})
print(f"  Legacy Bookmark Response: '{body.strip()}' (1=added, 2=removed)")

# 8. Legacy AJAX Category MCQ Explanation Call
status, body = test_post_form("/ajax_category_mcq.php", {"ques_id": 101, "answer": 2, "mcq_source_id": 1, "time": 10, "guess": 0})
print(f"  Legacy Category MCQ Response snippet: {body[:80]}...")

# 9. Diagnostics API
status, body = test_get("/api/diagnostics")
diag = json.loads(body)
print(f"  Diagnostics: Mode={diag['environment']['mode']}, Upstream={diag['services']['upstreamAyurQuest']['status']}")

print("==================================================")
print("  ALL E2E INTEGRATION & ADAPTER TESTS PASSED!")
print("==================================================")

