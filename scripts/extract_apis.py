import os
import re

files = os.listdir('downloaded_assets')
results = {}

for f in files:
    if not f.endswith('.js'):
        continue
    filepath = os.path.join('downloaded_assets', f)
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as fp:
        content = fp.read()
    
    # find URLs in ajax calls, window.location, hrefs, .php endpoints
    ajax_calls = re.findall(r'(\$\.ajax\s*\(\s*\{[^}]+\})', content, re.DOTALL)
    posts = re.findall(r'(\$\.post\s*\([^)]+\))', content)
    gets = re.findall(r'(\$\.get\s*\([^)]+\))', content)
    php_urls = set(re.findall(r'[\'"][a-zA-Z0-9_\-/\.]+\.php[^\'"]*[\'"]', content))
    
    print(f"=== {f} ===")
    print(f"PHP endpoints referenced ({len(php_urls)}): {php_urls}")
    if posts:
        print(f"$.post calls ({len(posts)}):")
        for p in posts[:5]:
            print("  ", p.strip()[:100])
    if ajax_calls:
        print(f"$.ajax calls ({len(ajax_calls)}):")
        for a in ajax_calls[:3]:
            # find url, type, data inside ajax
            url_match = re.search(r'url\s*:\s*([^,\n]+)', a)
            type_match = re.search(r'type\s*:\s*([^,\n]+)', a)
            data_match = re.search(r'data\s*:\s*([^,\n]+)', a)
            print(f"   URL: {url_match.group(1) if url_match else '?'} | Type: {type_match.group(1) if type_match else '?'} | Data: {data_match.group(1) if data_match else '?'}")
    print()

