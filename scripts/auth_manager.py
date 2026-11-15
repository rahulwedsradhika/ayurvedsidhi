import sys
import os
import json
import re
import urllib.request
import urllib.parse
import http.cookiejar

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DUMP_DIR = os.path.join(BASE_DIR, 'production_dump')
SESSION_FILE = os.path.join(DUMP_DIR, 'auth_session.json')
INTERIM_FILE = os.path.join(DUMP_DIR, 'session_interim.json')
ENV_FILE = os.path.join(BASE_DIR, 'server', '.env')

os.makedirs(DUMP_DIR, exist_ok=True)

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/157.0.0.0 Safari/537.36',
    'Referer': 'https://ayurquest.com/app1.5/login.php'
}

def request_otp(mobile):
    url = 'https://ayurquest.com/app1.5/login.php'
    cj = http.cookiejar.CookieJar()
    opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(cj))
    
    data = urllib.parse.urlencode({
        'mobile': mobile.strip(),
        'login2': 'Sign In'
    }).encode('utf-8')
    
    req = urllib.request.Request(url, data=data, headers={
        **HEADERS,
        'Content-Type': 'application/x-www-form-urlencoded'
    })
    
    try:
        resp = opener.open(req, timeout=15)
        content = resp.read().decode('utf-8', errors='ignore')
        cookies = {c.name: c.value for c in cj}
        phpsessid = cookies.get('PHPSESSID')
        
        if not phpsessid:
            print("ERROR: No PHPSESSID received from server.")
            return False
            
        is_sent = 'OTP sent Successfully' in content or 'name="otp"' in content
        if is_sent:
            with open(INTERIM_FILE, 'w', encoding='utf-8') as f:
                json.dump({'mobile': mobile.strip(), 'PHPSESSID': phpsessid}, f, indent=2)
            print(f"SUCCESS: OTP successfully triggered for mobile: {mobile}")
            print(f"Interim session: PHPSESSID={phpsessid}")
            return True
        else:
            alert = re.search(r'<div[^>]*class=[\'"][^\'"]*alert[^\'"]*[\'"][^>]*>(.*?)</div>', content, re.DOTALL)
            err_msg = alert.group(1).strip() if alert else "Unknown server response"
            print(f"FAILED: {err_msg}")
            return False
    except Exception as e:
        print(f"Network error requesting OTP: {e}")
        return False

def verify_otp(mobile, otp):
    if not os.path.exists(INTERIM_FILE):
        print(f"ERROR: No pending login session found. Request OTP first.")
        return False
        
    with open(INTERIM_FILE, 'r', encoding='utf-8') as f:
        interim = json.load(f)
        
    phpsessid = interim.get('PHPSESSID')
    if not phpsessid:
        print("ERROR: Missing PHPSESSID in interim session.")
        return False
        
    url = 'https://ayurquest.com/app1.5/login.php'
    cookie_str = f"PHPSESSID={phpsessid}"
    
    data = urllib.parse.urlencode({
        'mobile': mobile.strip(),
        'otp': otp.strip(),
        'fcm_token': '',
        'player_id': '',
        'remember': '1',
        'verify2': 'Verify OTP'
    }).encode('utf-8')
    
    req = urllib.request.Request(url, data=data, headers={
        **HEADERS,
        'Cookie': cookie_str,
        'Content-Type': 'application/x-www-form-urlencoded'
    })
    
    try:
        resp = urllib.request.urlopen(req, timeout=15)
        content = resp.read().decode('utf-8', errors='ignore')
        
        # Check authentication on index.php
        check_url = 'https://ayurquest.com/app1.5/index.php'
        check_req = urllib.request.Request(check_url, headers={
            **HEADERS,
            'Cookie': cookie_str
        })
        with urllib.request.urlopen(check_req, timeout=15) as check_resp:
            check_html = check_resp.read().decode('utf-8', errors='ignore')
            
        if 'logout.php' in check_html or 'Logout' in check_html or 'membership.php' in check_html:
            # Successfully authenticated!
            user_match = re.search(r'<span[^>]*class=[\'"]hidden-xs[\'"][^>]*>(.*?)</span>', check_html, re.I)
            user_name = user_match.group(1).strip() if user_match else "AyurQuest User"
            
            session_data = {
                'authenticated': True,
                'mobile': mobile.strip(),
                'PHPSESSID': phpsessid,
                'cookie_header': cookie_str,
                'user_name': user_name
            }
            with open(SESSION_FILE, 'w', encoding='utf-8') as f:
                json.dump(session_data, f, indent=2)
                
            update_env_cookie(cookie_str)
            print(f"AUTHENTICATED: Logged in as '{user_name}'!")
            print(f"Session saved to {SESSION_FILE}")
            return True
        else:
            alert = re.search(r'<div[^>]*class=[\'"][^\'"]*alert[^\'"]*[\'"][^>]*>(.*?)</div>', content, re.DOTALL)
            err_msg = alert.group(1).strip() if alert else "Invalid OTP or session expired"
            print(f"VERIFICATION FAILED: {err_msg}")
            return False
            
    except Exception as e:
        print(f"Network error verifying OTP: {e}")
        return False

def update_env_cookie(cookie_str):
    if os.path.exists(ENV_FILE):
        with open(ENV_FILE, 'r', encoding='utf-8') as f:
            lines = f.readlines()
        new_lines = []
        found = False
        for l in lines:
            if l.startswith('PROD_SESSION_COOKIE='):
                new_lines.append(f'PROD_SESSION_COOKIE="{cookie_str}"\n')
                found = True
            else:
                new_lines.append(l)
        if not found:
            new_lines.append(f'PROD_SESSION_COOKIE="{cookie_str}"\n')
        with open(ENV_FILE, 'w', encoding='utf-8') as f:
            f.writelines(new_lines)
        print("Updated server/.env with authenticated cookie.")

def set_direct_cookie(cookie_val):
    if not cookie_val.startswith('PHPSESSID='):
        cookie_str = f"PHPSESSID={cookie_val.strip()}"
    else:
        cookie_str = cookie_val.strip()
    session_data = {
        'authenticated': True,
        'PHPSESSID': cookie_str.replace('PHPSESSID=', ''),
        'cookie_header': cookie_str
    }
    with open(SESSION_FILE, 'w', encoding='utf-8') as f:
        json.dump(session_data, f, indent=2)
    update_env_cookie(cookie_str)
    print(f"Direct session cookie set: {cookie_str}")

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("Usage:")
        print("  python auth_manager.py request <10-digit-mobile>")
        print("  python auth_manager.py verify <mobile> <otp>")
        print("  python auth_manager.py set-cookie <PHPSESSID>")
        sys.exit(1)
        
    cmd = sys.argv[1].lower()
    if cmd == 'request' and len(sys.argv) >= 3:
        request_otp(sys.argv[2])
    elif cmd == 'verify' and len(sys.argv) >= 4:
        verify_otp(sys.argv[2], sys.argv[3])
    elif cmd == 'set-cookie' and len(sys.argv) >= 3:
        set_direct_cookie(sys.argv[2])
    else:
        print("Invalid arguments.")

