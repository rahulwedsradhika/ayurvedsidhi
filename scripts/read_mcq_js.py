with open('downloaded_assets/assets_js_plugins_catwise_mcq_catwise_mcqs.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

print(f"Total lines: {len(lines)}")
print("--- Lines 1 to 100 ---")
for i, line in enumerate(lines[:100], 1):
    print(f"{i:3d}: {line.rstrip()}")

