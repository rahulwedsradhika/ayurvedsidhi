import urllib.request
import os

js_files = [
    'assets/css/style.css',
    'assets/css/style-16-3-24.css',
    'assets/css/quiz.css',
    'assets/css/home_ribbon.css',
    'assets/css/curofy.css',
    'assets/css/team.css',
    'assets/js/custom.js',
    'assets/js/quiz.js',
    'assets/js/practice_mode.js',
    'assets/js/plugins/catwise_mcq/catwise_mcqs.js',
    'assets/js/plugins/catwise_mcq/catwise_mcq.css',
    'assets/js/plugins/sam-sub_mcq/catwise_mcqs.js',
    'assets/js/plugins/sam-sub_mcq/catwise_mcq.css',
    'assets/js/plugins/test_mcq/test_mcqs.js',
    'assets/js/plugins/test_mcq/test_mcq.css',
    'assets/js/plugins/jQueryQuiz/jquery.catquiz.js',
    'assets/js/plugins/jQueryQuiz/new.jquery.catquiz.js',
    'assets/js/plugins/jQueryQuiz/student.jquery.catquiz.js',
    'assets/js/plugins/jQueryQuiz/jquery.gkquiz.js',
    'assets/js/plugins/jQueryQuiz/jquery.quiz-min.js',
    'assets/js/plugins/jQueryQuiz/jquery.quiz-min.css',
]

base = 'https://ayurquest.com/app1.5/'
out_dir = 'downloaded_assets'
os.makedirs(out_dir, exist_ok=True)

for path in js_files:
    url = base + path
    local_path = os.path.join(out_dir, path.replace('/', '_'))
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=10) as resp:
            content = resp.read()
            with open(local_path, 'wb') as f:
                f.write(content)
            print(f"Downloaded {path} -> {len(content)} bytes")
    except Exception as e:
        print(f"Error downloading {path}: {e}")

