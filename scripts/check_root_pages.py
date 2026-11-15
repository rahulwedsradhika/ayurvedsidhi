import urllib.request
import urllib.error
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

class NoRedirectHandler(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return None

opener = urllib.request.build_opener(NoRedirectHandler, urllib.request.HTTPSHandler(context=ctx))

root_pages = [
    'index.php',
    'login.php',
    'courses.php',
    'category.php',
    'ayush-npget.php',
    'testseries.php',
    'daily_mcqs.php',
    'quiz.php',
    'upsc.php',
    'notes.php',
    'mnemonics.php',
    'tips.php',
    'audio-video.php',
    'myScore.php',
    'bookmarks.php',
    'reported_questions.php',
    'myWallet.php',
    'membership.php',
    'books.php',
    'invites.php',
    'myProfile.php',
    'aboutUs.php',
    'contactUs.php',
    'live.php',
    'search.php',
    'faq.php',
    'terms.php',
    'privacy.php',
    'ajax_category_mcq.php',
    'ajax_ques_solved_new.php',
    'ajax_quiz-test.php',
    'ajax_practice_mode.php',
    'ajax_paper.php',
    'ajax_sticky_note.php',
    'ajax_bookmark.php',
    'ajax_guess_tracker.php',
    'ajax_report.php',
    'ajax_update_score.php',
    'ajax_ques_solved.php',
]

base = 'https://ayurquest.com/app1.5/'
print(f"{'Page':<30} | {'Status':<6} | {'Location/Length'}")
print("-" * 65)

for p in root_pages:
    url = base + p
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        resp = opener.open(req, timeout=5)
        data = resp.read()
        print(f"{p:<30} | {resp.status:<6} | {len(data)} bytes")
    except urllib.error.HTTPError as e:
        loc = e.headers.get('Location', '')
        print(f"{p:<30} | {e.code:<6} | {loc}")
    except Exception as e:
        print(f"{p:<30} | {'ERR':<6} | {e}")

