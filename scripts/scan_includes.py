import urllib.request
import re
import json

base = 'https://ayurquest.com/app1.5/includes/'
req = urllib.request.Request(base, headers={'User-Agent': 'Mozilla/5.0'})
html = urllib.request.urlopen(req).read().decode('utf-8', errors='ignore')

dirs = re.findall(r'href="([a-zA-Z0-9_\-]+/)"', html)
print(f"Found {len(dirs)} subdirectories: {dirs}")

all_files = {}
for d in dirs:
    url = base + d
    try:
        sub_html = urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})).read().decode('utf-8', errors='ignore')
        matches = re.findall(r'href="([a-zA-Z0-9_\-\.]+)"', sub_html)
        files = [f for f in matches if not f.startswith('?') and not f.startswith('/') and f != 'Parent Directory']
        all_files[d] = files
        print(f"[{d}]: {len(files)} items -> {files}")
    except Exception as e:
        print(f"[{d}]: ERROR {e}")

with open('includes_tree.json', 'w') as f:
    json.dump(all_files, f, indent=2)

print("\nWrote includes_tree.json")

