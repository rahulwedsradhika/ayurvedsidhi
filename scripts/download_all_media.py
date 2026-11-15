import urllib.request
import os

images_to_download = [
    'assets/images/logo.png',
    'assets/images/action_bar_logo.png',
    'assets/images/ayurquest_logo.png',
    'assets/images/ayurquest_login_background.jpg',
    'assets/images/question_of_day_bg.png',
    'assets/images/daily_quiz_bg.png',
    'assets/images/prev_year_papers_bg.png',
    'assets/images/aiapget_logo_150.png',
    'assets/images/upsc_logo_150.png',
    'assets/images/rapid_fire_challenge_ans_bg.png',
    'assets/images/rapid_fire_dashboard_banner.jpg',
    'assets/images/covid-19-home-bg.png',
    'assets/images/samhita-crash-course-banner-upsc-psc-aiapget.png',
    'assets/images/welcome-bg.png',
    'assets/images/courses/uppsc.png',
    'assets/images/courses/revision-audio-lectures.png',
    'assets/images/courses/aiapget-2023.png',
    'assets/images/courses/ayurquest-lectures.png',
    'assets/images/courses/new_aiapget-2022.png',
    'assets/images/courses/cover/new_lectures_qbank-aiapget-2028.jpg',
    'assets/images/courses/cover/new_ayurquest-lectures_aiapget_upsc.jpg',
    'assets/images/courses/cover/new_revision_lectures_qbank-aiapget-2027.jpg',
    'assets/images/courses/cover/new_revision_lectures_qbank_upsc-2025.jpg',
    'assets/images/courses/cover/new_revision_lectures_qbank_jkpsc-2025.jpg',
    'assets/images/courses/cover/new_revision_lectures_qbank_hpsc-2024.jpg',
    'assets/images/courses/cover/aq-revision-audio-lectures.jpg',
    'assets/images/courses/cover/quick_revision_av_lectures_aiapget_upsc.jpg',
    'assets/images/courses/cover/uppsc2023.jpg',
    'assets/images/courses/cover/hppsc2023.jpg',
    'assets/images/courses/video_lectures/all_tests_quizzes.jpg',
    'assets/images/courses/video_lectures/entrance_video_lectures.jpg',
    'assets/images/courses/video_lectures/samhita_video_lectures.jpg',
    'assets/images/courses/video_lectures/subject_video_lectures.jpg',
    'assets/images/courses/video_lectures/pareek_video_lectures.jpg',
    'assets/images/courses/video_lectures/demo_video_lectures.jpg',
    'assets/images/courses/video_lectures/samhita_audio_lectures.jpg',
    'assets/images/courses/video_lectures/subject_audio_lectures.jpg',
    'assets/images/courses/video_lectures/pareek_audio_lectures.jpg',
    'assets/images/courses/video_lectures/samhita_question_bank.jpg',
    'assets/images/courses/video_lectures/subject_question_bank.jpg',
    'assets/images/courses/video_lectures/new_pattern_question_bank.jpg',
    'assets/images/courses/video_lectures/samhita_short_notes.jpg',
    'assets/images/courses/video_lectures/subject_short_notes.jpg',
    'assets/images/courses/video_lectures/course_tests.jpg',
    'assets/images/courses/video_lectures/rapid_fire_challenge.jpg',
    'assets/images/samhita_icon/charaka-samhita.png',
    'assets/images/samhita_icon/sushruta-samhita.png',
    'assets/images/samhita_icon/ashtanga-hridaya.png',
    'assets/images/samhita_icon/ashtanga-samgrah.png',
    'assets/images/samhita_icon/kashyapa-samhita.png',
    'assets/images/samhita_icon/bhavaprakash-samhita.png',
    'assets/images/samhita_icon/madhava-nidana.png',
    'assets/images/samhita_icon/sharangadhara-samhita.png',
    'assets/images/samhita_icon/bhaishjya-ratnavali.png',
    'assets/images/samhita_icon/bhel-samhita.png',
    'assets/images/samhita_icon/harita-samhita.png',
    'assets/images/samhita_icon/chakradatt-samhita.png',
    'assets/images/samhita_icon/ras-ratan-sammuchaya.png',
    'assets/images/samhita_icon/ras-tarangini.png',
    'assets/images/samhita_icon/ras-saar-samgraha.png',
    'assets/images/samhita_icon/yog-ratnakar.png',
    'assets/audio/correct-enhanced-v2-90p.mp3',
    'assets/audio/wrong-enhanced-v2-90p.mp3',
    'assets/favicons/favicon_16x16.png',
]

base = 'https://ayurquest.com/app1.5/'
dest_root = 'client/public'

count = 0
for rel in images_to_download:
    url = base + rel
    dest_path = os.path.join(dest_root, rel.replace('/', os.sep))
    os.makedirs(os.path.dirname(dest_path), exist_ok=True)
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=8) as resp:
            data = resp.read()
            with open(dest_path, 'wb') as f:
                f.write(data)
            count += 1
            print(f"[{count}/{len(images_to_download)}] Saved {rel} ({len(data)} bytes)")
    except Exception as e:
        print(f"Error {rel}: {e}")

print(f"\nDone! Downloaded {count} assets to {dest_root}")

