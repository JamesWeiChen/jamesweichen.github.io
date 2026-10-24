"""Optional browser check: pip install playwright; playwright install chromium."""
from functools import partial
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
import json
from pathlib import Path
import sys
import shutil
import tempfile
import threading
from playwright.sync_api import sync_playwright
ROOT = Path(__file__).resolve().parents[1]

class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, *args): pass

with tempfile.TemporaryDirectory() as tmp:
    site = Path(tmp)/'site'
    shutil.copytree(ROOT/'acadenda/conferences', site/'acadenda/conferences')
    shutil.copytree(ROOT/'acadenda/program', site/'acadenda/program')
    for name in ('site-preferences.js', 'index.html', 'app.js', 'data.js', 'styles.css'):
        shutil.copy2(ROOT/name, site/name)
    (site/'acadenda/images').symlink_to(ROOT/'acadenda/images', target_is_directory=True)
    for name in ('guide.html', 'guide-zh.html', 'guide.js', 'guide.css'):
        shutil.copy2(ROOT/'acadenda'/name, site/'acadenda'/name)
    server = ThreadingHTTPServer(('127.0.0.1', 0), partial(QuietHandler, directory=str(site)))
    threading.Thread(target=server.serve_forever, daemon=True).start()
    try:
        with sync_playwright() as p:
            browser = p.chromium.launch()
            context = browser.new_context(viewport={'width':1100,'height':900})
            page = context.new_page()
            errors=[]; page.on('pageerror', lambda error: errors.append(str(error)))
            page.add_init_script("Object.defineProperty(navigator, 'clipboard', {value: {writeText: async text => {window.copiedText = text;}}});")
            page.goto(f'http://127.0.0.1:{server.server_port}/acadenda/conferences/official-demo/?lang=zh')
            page.locator('article').first.wait_for()
            assert page.locator('article').count() == 4
            assert page.locator('.talk').count() == 4
            assert page.locator('#map-links a').count() == 2
            assert page.locator('#sample-note').is_visible()
            page.screenshot(path='/tmp/acadenda-site-desktop.png', full_page=True)
            page.set_viewport_size({'width':390,'height':844})
            page.screenshot(path='/tmp/acadenda-site-mobile.png', full_page=True)
            assert page.locator('#program-link').get_attribute('href') == 'https://jamesweichen.github.io/acadenda/program/Official_Conference_Demo.json'
            page.locator('#copy-link').click()
            page.wait_for_function("window.copiedText === 'https://jamesweichen.github.io/acadenda/program/Official_Conference_Demo.json'")
            page.locator('summary').click()
            page.locator('#changes').fill('Move the opening to 10:00; preserve IDs.')
            changed=json.loads((site/'acadenda/program/Official_Conference_Demo.json').read_text()); changed['conference']['name']='Latest version <script>alert(1)</script>'
            (site/'acadenda/program/Official_Conference_Demo.json').write_text(json.dumps(changed))
            page.locator('#copy-prompt').click()
            page.wait_for_function("window.copiedText.includes('CHANGE_REQUEST:')")
            copied=page.evaluate('window.copiedText')
            assert 'Latest version <script>alert(1)</script>' in copied
            assert 'Move the opening to 10:00' in copied
            assert page.locator('#title script').count()==0
            # A network failure must not silently copy previously loaded JSON.
            page.route('**/Official_Conference_Demo.json', lambda route: route.abort())
            page.evaluate("window.copiedText = 'sentinel'")
            page.locator('#copy-prompt').click()
            page.wait_for_function("document.getElementById('status').textContent.includes('未複製')")
            assert page.evaluate('window.copiedText')=='sentinel'
            page.unroute('**/Official_Conference_Demo.json')
            # Clipboard denied: expose selectable text instead of claiming success.
            page.evaluate("() => { navigator.clipboard.writeText = async () => {throw new Error('denied');}; }")
            page.locator('#copy-prompt').click()
            page.locator('#copy-fallback').wait_for(state='visible')
            assert 'CURRENT_JSON:' in page.locator('#copy-fallback').input_value()
            assert not errors, errors
            page.set_viewport_size({'width':390,'height':844})
            assert page.evaluate('document.documentElement.scrollWidth <= window.innerWidth')
            page.screenshot(path='/tmp/acadenda-publishing-web.png', full_page=True)
            page.locator('.access img').screenshot(path='/tmp/acadenda-publishing-qr.png')
            page.route('**/Official_Conference_Demo.json', lambda route: route.fulfill(status=200, content_type='application/json', body='{}'))
            page.locator('#refresh').click()
            page.wait_for_function("document.getElementById('status').textContent.includes('讀取失敗')")
            assert page.locator('article').count() == 0
            page.unroute('**/Official_Conference_Demo.json')
            page.locator('#refresh').click()
            page.locator('article').first.wait_for()
            page.locator('#theme').select_option('system')
            page.emulate_media(color_scheme='dark')
            page.wait_for_function("getComputedStyle(document.body).backgroundColor === 'rgb(16, 20, 17)'")
            page.emulate_media(color_scheme='light')
            page.wait_for_function("getComputedStyle(document.body).backgroundColor === 'rgb(243, 241, 236)'")
            page.locator('#changes').fill('Preserve this draft')
            page.locator('[data-language="en"]').click()
            page.locator('article').first.wait_for()
            assert page.locator('html').get_attribute('lang') == 'en'
            assert page.locator('#copy-link').inner_text() == 'Copy program link'
            assert page.locator('#changes').input_value() == 'Preserve this draft'
            assert 'Chair: ' in page.locator('article').nth(1).inner_text()
            page.locator('#theme').select_option('dark')
            page.wait_for_function("getComputedStyle(document.body).backgroundColor === 'rgb(16, 20, 17)'")
            page.reload(); page.locator('article').first.wait_for()
            assert page.locator('#theme').input_value() == 'dark'
            page.locator('#theme').select_option('light')
            page.emulate_media(color_scheme='dark')
            page.wait_for_function("getComputedStyle(document.body).backgroundColor === 'rgb(243, 241, 236)'")
            page.locator('#theme').select_option('system')
            page.wait_for_function("getComputedStyle(document.body).backgroundColor === 'rgb(16, 20, 17)'")
            assert page.evaluate('document.documentElement.scrollWidth <= window.innerWidth')
            page.screenshot(path='/tmp/acadenda-site-english-dark.png', full_page=True)
            page.locator('[data-language="zh"]').click()
            page.locator('article').first.wait_for()
            assert page.locator('#copy-link').inner_text() == '複製議程連結'
            # Carry language and system theme from conference to main site and guide.
            page.locator('#developer-link').click()
            page.locator('[data-theme-select]').wait_for()
            assert page.locator('html').get_attribute('lang') == 'zh-Hant'
            page.emulate_media(color_scheme='light')
            page.wait_for_function("document.documentElement.dataset.theme === 'light'")
            page.locator('.app-guide-button').click()
            page.locator('#guide-theme').wait_for()
            assert 'guide-zh.html' in page.url
            assert page.locator('html').get_attribute('data-theme') == 'light'
            page.locator('#guide-theme').select_option('dark')
            assert page.locator('html').get_attribute('data-theme') == 'dark'
            page.locator('#guide-language').select_option('en')
            page.locator('#guide-theme').wait_for()
            assert page.locator('html').get_attribute('lang') == 'en'
            page.locator('a[href*="conferences/official-demo/"]').click()
            page.locator('article').first.wait_for()
            assert page.locator('html').get_attribute('lang') == 'en'
            assert page.locator('#theme').input_value() == 'dark'
            # Shared preferences also carry across tabs.
            other = page.context.new_page()
            other.goto(f'http://127.0.0.1:{server.server_port}/?lang=en#/apps')
            other.locator('[data-theme-select]').select_option('light')
            page.wait_for_function("document.documentElement.dataset.theme === 'light'")
            assert page.locator('#theme').input_value() == 'light'
            other.close()
            assert not errors, errors
            for locale, expected in [('zh-TW','zh-Hant'),('zh-HK','zh-Hant'),('zh-Hant','zh-Hant'),('zh-CN','en'),('zh-Hans','en'),('zh','en'),('ja-JP','en'),('en-US','en')]:
                context = browser.new_context(locale=locale, color_scheme='light', viewport={'width':390,'height':844})
                check = context.new_page()
                check.goto(f'http://127.0.0.1:{server.server_port}/#/apps')
                check.locator('[data-language-select]').wait_for()
                assert check.locator('html').get_attribute('lang') == expected, locale
                assert check.locator('[data-language-select]').input_value() == 'system'
                assert check.locator('[data-theme-select]').input_value() == 'system'
                assert check.locator('html').get_attribute('data-theme') == 'light'
                assert check.evaluate('document.documentElement.scrollWidth <= window.innerWidth'), locale
                check.locator('[data-language-select]').select_option('zh' if expected == 'en' else 'en')
                check.reload(); check.locator('[data-language-select]').wait_for()
                assert check.locator('html').get_attribute('lang') != expected
                check.locator('[data-language-select]').select_option('system')
                assert check.locator('html').get_attribute('lang') == expected
                check.locator('.app-guide-button').click()
                check.locator('#guide-language').wait_for()
                assert check.locator('#guide-language').input_value() == 'system'
                assert check.evaluate('document.documentElement.scrollWidth <= window.innerWidth'), 'guide ' + locale
                assert check.locator('html').get_attribute('lang') == expected
                check.locator('a[href*="conferences/official-demo/"]').click()
                check.locator('article').first.wait_for()
                assert check.locator('html').get_attribute('lang') == expected
                assert check.locator('[data-language="system"]').get_attribute('aria-current') == 'page'
                if locale == 'zh-TW':
                    check.goto(f'http://127.0.0.1:{server.server_port}/?lang=system#/apps')
                    check.locator('[data-language-select]').wait_for()
                    check.screenshot(path='/tmp/site-system-preferences.png')
                context.close()
            browser.close()
        print('Web checks passed: program rendering, copy/update/error flows, mobile layouts, cross-page and cross-tab themes, and system/manual language preferences for eight browser locales.')
    finally:
        server.shutdown(); server.server_close()
