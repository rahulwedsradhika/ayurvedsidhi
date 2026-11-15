import urllib.request

test_includes = [
    'courses/default.php',
    'courses/course_detail.php?id=1',
    'online_lectures/default.php',
    'online_lectures/samhitas.php',
    'online_lectures/subjects.php',
    'av_lecture/default.php',
    'catwise_questions/default.php',
    'catwise_questions/samhitas.php',
    'catwise_questions/subjects.php',
    'catwise_questions/questions.php?id=1',
    'daily_test/default.php',
    'daily_test/practice_mode.php',
    'daily_mcqs/rapid_fire_mcqs.php',
    'bookmarks/default.php',
    'notes/default.php',
    'notes/sticky_notes.php',
    'short_notes/default.php',
    'tips/default.php',
    'mnemonics/default.php',
    'membership/default.php',
    'dashboard/main-links.php',
    'dashboard/default.php',
    'dashboard/splash.php'
]

base = 'https://ayurquest.com/app1.5/includes/'

print(f"{'Path':<40} | {'Status':<6} | {'Bytes':<8} | {'Preview'}")
print("-" * 80)

for p in test_includes:
    url = base + p
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=5) as resp:
            data = resp.read().decode('utf-8', errors='ignore')
            clean = " ".join(data[:120].split())
            print(f"{p:<40} | {resp.status:<6} | {len(data):<8} | {clean[:40]}")
            # Save files if meaningful content
            if len(data) > 200:
                fname = p.replace('/', '_').replace('.php', '').replace('?', '_').replace('=', '_') + '.html'
                with open(f"scratch_{fname}", 'w', encoding='utf-8') as out:
                    out.write(data)
    except Exception as e:
        print(f"{p:<40} | {'ERR':<6} | {0:<8} | {e}")

