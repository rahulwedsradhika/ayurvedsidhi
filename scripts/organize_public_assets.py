import os
import shutil

os.makedirs('client/public/assets/css', exist_ok=True)
os.makedirs('client/public/assets/js', exist_ok=True)
os.makedirs('client/public/assets/icons/font', exist_ok=True)

# Copy css
for f in ['style.css', 'style-16-3-24.css', 'quiz.css', 'home_ribbon.css', 'curofy.css', 'team.css']:
    src = os.path.join('downloaded_assets', f'assets_css_{f}')
    dst = os.path.join('client/public/assets/css', f)
    if os.path.exists(src):
        shutil.copy2(src, dst)
        print(f"Copied CSS {f}")

# Copy fonts
for f in ['flaticon.css', 'Flaticon.woff', 'Flaticon.ttf']:
    src = os.path.join('downloaded_assets', f)
    dst = os.path.join('client/public/assets/icons/font', f)
    if os.path.exists(src):
        shutil.copy2(src, dst)
        print(f"Copied Font {f}")

# Copy js
for f in ['custom.js', 'quiz.js', 'practice_mode.js', 'daily.js']:
    src = os.path.join('downloaded_assets', f) if os.path.exists(os.path.join('downloaded_assets', f)) else os.path.join('downloaded_assets', f'assets_js_{f}')
    dst = os.path.join('client/public/assets/js', f)
    if os.path.exists(src):
        shutil.copy2(src, dst)
        print(f"Copied JS {f}")

print("Assets organized successfully!")

