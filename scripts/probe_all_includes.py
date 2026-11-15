import urllib.request
import json
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

with open('includes_tree.json', 'r') as f:
    tree = json.load(f)

base = 'https://ayurquest.com/app1.5/includes/'
results_200 = []
results_other = []

for folder, files in tree.items():
    for fn in files:
        if fn.endswith('/'):
            continue
        rel_path = folder + fn
        url = base + rel_path
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req, context=ctx, timeout=4) as resp:
                if resp.status == 200:
                    data = resp.read()
                    results_200.append((rel_path, len(data)))
                    print(f"200 OK: {rel_path} ({len(data)} bytes)")
                    # save useful content
                    if len(data) > 50:
                        safe_name = rel_path.replace('/', '_').replace('.php', '') + '.html'
                        with open(f"saved_{safe_name}", 'wb') as out_f:
                            out_f.write(data)
        except urllib.error.HTTPError as e:
            results_other.append((rel_path, e.code))
        except Exception as e:
            results_other.append((rel_path, str(e)))

print("\n--- Summary ---")
print(f"Total 200 OK files: {len(results_200)}")
for p, s in results_200:
    print(f"  {p} ({s} bytes)")

