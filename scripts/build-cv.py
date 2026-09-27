"""Print the CV view (/cv-print/ and /en/cv-print/) to public/cv/*.pdf.

The CV is rendered by Astro from the same files as the website (src/data/*.yaml),
so updating a YAML entry updates both. Run from the repo root:

    npm run cv          # = astro build && python scripts/build-cv.py && astro build

Needs Python 3 with Playwright (pip install playwright && playwright install chromium).
Update `cv.updated` in src/data/site.yaml before regenerating.
"""
import http.server, os, socketserver, sys, threading
from functools import partial
from playwright.sync_api import sync_playwright

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DIST = os.path.join(ROOT, 'dist')
OUT = os.path.join(ROOT, 'public', 'cv')
PAGES = {'es': '/cv-print/', 'en': '/en/cv-print/'}

if not os.path.isdir(DIST):
    sys.exit('dist/ not found: run `npx astro build` first')
os.makedirs(OUT, exist_ok=True)

class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass

Handler = partial(Quiet, directory=DIST)
with socketserver.TCPServer(('127.0.0.1', 0), Handler) as httpd:
    port = httpd.server_address[1]
    threading.Thread(target=httpd.serve_forever, daemon=True).start()
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        for lang, path in PAGES.items():
            page.goto(f'http://127.0.0.1:{port}{path}', wait_until='networkidle')
            target = os.path.join(OUT, f'victor-pinto-cv-{lang}.pdf')
            page.pdf(path=target, format='Letter', print_background=True, prefer_css_page_size=True,
                     display_header_footer=True, header_template='<span></span>',
                     footer_template='<div style="font-size:8px;width:100%;text-align:center;color:#777"><span class="pageNumber"></span> / <span class="totalPages"></span></div>',
                     margin={'top': '14mm', 'bottom': '16mm', 'left': '12mm', 'right': '12mm'})
            print('wrote', os.path.relpath(target, ROOT))
        browser.close()
    httpd.shutdown()
