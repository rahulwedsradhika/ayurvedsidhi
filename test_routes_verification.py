import urllib.request
import json
import sys

routes_to_test = [
    ("Home Dashboard", "http://localhost:3000/app1.5/index.php"),
    ("Root Path", "http://localhost:3000/"),
    ("Courses Catalogue", "http://localhost:3000/app1.5/courses.php"),
    ("Mock Tests", "http://localhost:3000/app1.5/ayush-npget.php?action=mock_test"),
    ("UPSC Entrance", "http://localhost:3000/app1.5/upsc.php"),
    ("Previous Year Papers", "http://localhost:3000/app1.5/prev-years.php"),
    ("Question Bank Root", "http://localhost:3000/app1.5/category.php"),
    ("Samhitawise MCQs", "http://localhost:3000/app1.5/category.php?action=samhitas"),
    ("Subjectwise MCQs", "http://localhost:3000/app1.5/category.php?action=subjects"),
    ("Tagwise MCQs", "http://localhost:3000/app1.5/category.php?action=tags"),
    ("Short Notes", "http://localhost:3000/app1.5/notes.php"),
    ("Mnemonics", "http://localhost:3000/app1.5/mnemonics.php"),
    ("Study Tips", "http://localhost:3000/app1.5/tips.php"),
    ("Audio Lectures", "http://localhost:3000/app1.5/audio-video.php"),
    ("Score Card", "http://localhost:3000/app1.5/myScore.php"),
    ("Bookmarks", "http://localhost:3000/app1.5/bookmarks.php"),
    ("Reported Questions", "http://localhost:3000/app1.5/reported_questions.php"),
    ("Discussion Forum", "http://localhost:3000/app1.5/forum.php"),
    ("My Wallet", "http://localhost:3000/app1.5/myWallet.php"),
    ("Membership Plans", "http://localhost:3000/app1.5/membership.php"),
    ("Book Store", "http://localhost:3000/app1.5/books.php"),
    ("Invite Friends", "http://localhost:3000/app1.5/invites.php"),
    ("My Profile", "http://localhost:3000/app1.5/myProfile.php"),
    ("About Us", "http://localhost:3000/app1.5/about.php"),
    ("Contact Us", "http://localhost:3000/app1.5/contact.php"),
]

backend_endpoints = [
    ("API Health", "http://localhost:5000/api/health"),
    ("API Dashboard", "http://localhost:5000/api/dashboard"),
    ("API Courses", "http://localhost:5000/api/courses"),
    ("API Quizzes", "http://localhost:5000/api/quizzes"),
    ("API Questions", "http://localhost:5000/api/questions"),
    ("API Notes", "http://localhost:5000/api/notes"),
    ("API Wallet", "http://localhost:5000/api/wallet"),
]

print("=" * 70)
print("AYURQUEST 1.5 LOCALHOST REPLICA - PRODUCTION ROUTE VERIFICATION")
print("=" * 70)

all_ok = True

print("\n--- FRONTEND SPA PRODUCTION ROUTES (Port 3000) ---")
for name, url in routes_to_test:
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=5) as resp:
            code = resp.getcode()
            content = resp.read()
            has_html = b"<html" in content or b"<!DOCTYPE html>" in content or b"<div id=\"root\">" in content
            status = "PASS" if code == 200 and has_html else "FAIL"
            if status == "FAIL":
                all_ok = False
            print(f"[{status}] {code} | {name.ljust(25)} -> {url}")
    except Exception as e:
        print(f"[ERROR] {name.ljust(25)} -> {e}")
        all_ok = False

print("\n--- BACKEND REST API ENDPOINTS (Port 5000) ---")
for name, url in backend_endpoints:
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'AyurQuestTestClient/1.5'})
        with urllib.request.urlopen(req, timeout=5) as resp:
            code = resp.getcode()
            data = json.loads(resp.read().decode('utf-8'))
            keys = list(data.keys()) if isinstance(data, dict) else f"List[{len(data)}]"
            status = "PASS" if code == 200 else "FAIL"
            if status == "FAIL":
                all_ok = False
            print(f"[{status}] {code} | {name.ljust(20)} -> {url} (Keys/Length: {keys})")
    except Exception as e:
        print(f"[ERROR] {name.ljust(20)} -> {e}")
        all_ok = False

print("\n" + "=" * 70)
if all_ok:
    print("ALL ROUTES & ENDPOINTS VERIFIED: 100% OPERATIONAL WITH 0 ERRORS")
else:
    print("SOME CHECKS FAILED! INVESTIGATE OUTPUT ABOVE.")
print("=" * 70)

