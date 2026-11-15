import urllib.request
import urllib.error
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

base = "https://ayurquest.com/app1.5/"

paths = [
    "",
    "index.php",
    "login.php",
    "dashboard.php",
    "home.php",
    "main.php",
    "course.php",
    "courses.php",
    "subject.php",
    "subjects.php",
    "chapter.php",
    "chapters.php",
    "topic.php",
    "topics.php",
    "lecture.php",
    "lectures.php",
    "video.php",
    "videos.php",
    "test.php",
    "tests.php",
    "exam.php",
    "exams.php",
    "quiz.php",
    "quizzes.php",
    "mcq.php",
    "mcqs.php",
    "daily_test.php",
    "dailytest.php",
    "qod.php",
    "question.php",
    "questions.php",
    "result.php",
    "results.php",
    "bookmark.php",
    "bookmarks.php",
    "notes.php",
    "profile.php",
    "header.php",
    "footer.php",
    "sidebar.php",
    "menu.php",
    "nav.php",
    "navbar.php",
    "logout.php",
    "register.php",
    "verify.php",
    "search.php",
    "history.php",
    "samhita.php",
    "sthana.php",
    "ajax.php",
    "ajax/",
    "api/",
    "api/index.php",
    "api/v1/",
    "service.php",
    "services.php",
    "services/",
    "include/",
    "includes/",
    "assets/",
    "assets/css/style.css",
    "assets/css/main.css",
    "assets/css/custom.css",
    "assets/css/dashboard.css",
    "assets/js/custom.js",
    "assets/js/main.js",
    "assets/js/app.js",
    "assets/js/dashboard.js",
]

class NoRedirectHandler(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return None

opener = urllib.request.build_opener(NoRedirectHandler, urllib.request.HTTPSHandler(context=ctx))

print(f"{'Path':<30} | {'Status':<6} | {'Location'}")
print("-" * 65)

for p in paths:
    url = base + p
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
        resp = opener.open(req, timeout=5)
        print(f"{p:<30} | {resp.status:<6} | -")
    except urllib.error.HTTPError as e:
        loc = e.headers.get('Location', '')
        print(f"{p:<30} | {e.code:<6} | {loc}")
    except Exception as e:
        print(f"{p:<30} | {'ERR':<6} | {e}")

