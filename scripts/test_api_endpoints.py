import urllib.request
import json

base_url = 'http://localhost:5000/api'

endpoints = [
    ('/profile', 'Pro Subscription Profile'),
    ('/dashboard', 'Dashboard Stats'),
    ('/questions?limit=2', 'Canonical Questions Sample'),
    ('/questions?sam_id=1&limit=2', 'Charaka Samhita Questions'),
    ('/questions?sam_id=2&limit=2', 'Sushruta Samhita Questions'),
    ('/questions?sam_id=3&limit=2', 'Ashtanga Hridaya Questions'),
    ('/questions?tag=numerical&limit=2', 'Numerical Tag Questions'),
    ('/questions?tag=assertion_reason&limit=2', 'Assertion Reason Questions'),
    ('/tests', 'Available Tests in DB'),
    ('/tests/695', 'Test 695 (Shareer Kriya) Questions'),
    ('/tests/2737', 'Test 2737 (Ashtanga Hridaya) Questions'),
    ('/reported-questions?limit=2', 'Faculty Reported Questions'),
    ('/diagnostics', 'Developer Diagnostics')
]

print("=== AYURQUEST LOCALHOST REAL DATA ENDPOINTS AUDIT ===")
all_pass = True

for path, label in endpoints:
    url = f"{base_url}{path}"
    try:
        req = urllib.request.Request(url)
        with urllib.request.urlopen(req, timeout=5) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            status_text = "PASS" if resp.status == 200 else f"HTTP {resp.status}"
            if isinstance(data, list):
                summary = f"{len(data)} items returned"
                sample = data[0].get('Q') or data[0].get('name') if data else "Empty"
            elif isinstance(data, dict):
                summary = f"Dict with keys {list(data.keys())[:5]}"
                sample = data.get('subscription_tier') or data.get('stats', {}).get('totalQuestions') or data.get('name') or "OK"
            print(f"[{status_text}] {label:35} -> {summary} (Sample: {sample})")
    except Exception as e:
        all_pass = False
        print(f"[FAIL] {label:35} -> Error: {e}")

print("====================================================")
print("Result:", "ALL ENDPOINTS VERIFIED OPERATIONAL" if all_pass else "SOME FAILED")

