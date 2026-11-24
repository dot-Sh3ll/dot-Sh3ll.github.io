#!/usr/bin/env python3
"""Put the site header (same as the home page) at the top of an app page, sticky.
usage: chrome.py <code> <file>     (code = fr, en, de… ; ex. chrome.py de aeons-end/de.html)
       chrome.py <dossier>         toutes les pages d'une appli (ex. chrome.py aeons-end)
Le bouton de langue montre toutes les langues dont la page existe dans le dossier (voir langs.py) ;
sur la page française, EN reste affiché grisé tant que en.html n'existe pas."""
import os, re, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from langs import LABELS, ORDER, available, page_href

if len(sys.argv) == 2 and os.path.isdir(sys.argv[1]):
    folder = sys.argv[1]
    for c in available(folder):
        os.system(f'{sys.executable} "{os.path.abspath(__file__)}" {c} "{os.path.join(folder, "index.html" if c == "fr" else c + ".html")}"')
    sys.exit()
mode, path = sys.argv[1], sys.argv[2]
langs = available(os.path.dirname(path))
if mode not in langs:
    langs.append(mode)
s = open(path, encoding="utf-8").read()

# remove every previous version of the site chrome
s = re.sub(r'<a href="\.\./" class="site-home".*?</a>\n?', '', s, flags=re.S)
s = re.sub(r'<style>\n?\.site-home\{.*?</style>\n?<script>\n?\(function\(\)\{var a=document\.querySelector\("\.site-home"\).*?</script>\n?', '', s, flags=re.S)
s = re.sub(r'<a href="[^"]*" class="site-lang".*?</a>\n<style>\.site-lang.*?</style>\n<script>.*?</script>\n?', '', s, flags=re.S)
s = re.sub(r'<div class="sitebar".*?<!--/sitebar-->\n?', '', s, flags=re.S)
s = re.sub(r'\n?<header class="sitehead".*?<!--/sitehead-->\n?', '\n', s, flags=re.S)
s = re.sub(r'<style id="sitebar-css">.*?</style>\n?', '', s, flags=re.S)
s = re.sub(r'<style id="sitehead-css">.*?</style>\n?', '', s, flags=re.S)

L = LABELS.get(mode, LABELS["en"])
brand = "Less Rules, More Play"
home_aria = L["home"]
kofi = L["kofi"]


def item(c):
    if c == mode:
        return f'<span aria-current="true">{c.upper()}</span>'
    if c not in langs:
        # page française sans version anglaise : le bouton EN est affiché grisé
        return f'<span class="sh-off" title="{LABELS[c]["soon"]}" aria-disabled="true">{c.upper()}</span>'
    href = page_href(c) + f"?lang={c}"
    return (f'<a href="{href}" hreflang="{c}" lang="{c}" aria-label="{LABELS[c]["switch"]}" '
            f'onclick="try{{localStorage.setItem(\'site-lang\',\'{c}\')}}catch(e){{}}">{c.upper()}</a>')


shown = [c for c in ORDER if c in langs or c in ("fr", "en")]
lang_items = "".join(item(c) for c in shown)

css = """<style id="sitehead-css">
@font-face{font-family:"SH Marcellus";font-display:swap;src:local("Marcellus"),local("Marcellus-Regular")}
.sitehead{position:sticky;top:0;z-index:9;background:#0d0f16;border-bottom:1px solid #2a3144;color:#efe8d8;font:500 15px/1.2 "Figtree","Segoe UI",system-ui,-apple-system,sans-serif;-webkit-font-smoothing:antialiased}
.sitehead *{box-sizing:border-box}
:root{--site-w:1080px;--site-pad:20px}
@media (max-width:640px){:root{--site-pad:16px}}
.sitehead .sh-in{max-width:var(--site-w);margin:0 auto;padding:0 var(--site-pad);height:56px;display:flex;align-items:center;justify-content:space-between;gap:12px}
.sitehead a{color:inherit;text-decoration:none}
.sitehead .sh-brand{display:flex;align-items:center;gap:10px;font-family:"Marcellus","SH Marcellus","Palatino Linotype",Georgia,serif;font-size:19px;font-weight:400;letter-spacing:.01em;white-space:nowrap}
.sitehead .sh-mark{display:grid;place-items:center;width:30px;height:30px;border-radius:8px;background:#1d2230;border:1px solid #2a3144;font-size:16px;line-height:1}
.sitehead .sh-act{display:flex;align-items:center;gap:10px}
.sitehead .sh-lang{display:inline-flex;padding:3px;background:#161a25;border:1px solid #2a3144;border-radius:999px}
.sitehead .sh-lang span,.sitehead .sh-lang a{display:inline-flex;align-items:center;height:28px;padding:0 11px;border-radius:999px;font-weight:700;font-size:12.5px;letter-spacing:.04em}
.sitehead .sh-lang span{background:#ddb96a;color:#17130a}
.sitehead .sh-lang a{color:#a3a9b8}
.sitehead .sh-lang span.sh-off{background:none;color:#5d6475;cursor:not-allowed}
.sitehead .sh-lang a:hover{color:#fff}
.sitehead .sh-kofi{display:inline-flex;align-items:center;gap:8px;height:36px;padding:0 15px;border-radius:999px;background:#ddb96a;color:#17130a;font-weight:700;font-size:14.5px;white-space:nowrap}
.sitehead .sh-kofi:hover{filter:brightness(1.08)}
.sitehead a:focus-visible{outline:2px solid #ddb96a;outline-offset:2px}
@media (max-width:640px){.sitehead .sh-text,.sitehead .sh-kofi-t{display:none}.sitehead .sh-kofi{width:36px;padding:0;justify-content:center}}
@media print{.sitehead{display:none}}
:root{--sitehead-h:57px}
html{scroll-padding-top:calc(var(--sitehead-h) + 8px)}
</style>
"""
bar = f"""<header class="sitehead">
<div class="sh-in">
<a class="sh-brand" href="../" aria-label="{home_aria}"><span class="sh-mark" aria-hidden="true">🎲</span><span class="sh-text">{brand}</span></a>
<div class="sh-act">
<div class="sh-lang" role="group" aria-label="Langue / Language">{lang_items}</div>
<a class="sh-kofi" href="https://ko-fi.com/paulmoussard" target="_blank" rel="noopener" aria-label="Ko-fi"><span aria-hidden="true">☕</span><span class="sh-kofi-t">{kofi}</span></a>
</div>
</div>
</header><!--/sitehead-->
"""

# app-specific offsets so the app's own sticky bars sit below the site header
extra = ""
if "imperium" in path:
    extra = """<style id="sitehead-css-imp">
html{scroll-padding-top:calc(var(--sitehead-h) + 84px)!important}
header.top{top:var(--sitehead-h)!important}
@media (min-width:861px){nav{top:var(--sitehead-h)!important;height:calc(100vh - var(--sitehead-h))!important}}
.fpanel{top:calc(62px + var(--sitehead-h))!important}
.app{max-width:var(--site-w);margin:0 auto;padding-left:var(--site-pad)!important;padding-right:var(--site-pad)!important}
main{padding-left:clamp(16px,3vw,32px)!important;padding-right:0!important}
#hd,.wrap,#tab-solo.dig .wrap,.mp{max-width:var(--site-w)!important;padding-left:var(--site-pad)!important;padding-right:var(--site-pad)!important}
#tab-solo.dig #dg-market{max-width:var(--site-w)!important;width:calc(100% - 2*var(--site-pad))!important}
.aide{max-width:var(--site-w)!important;margin-left:auto!important;margin-right:auto!important;padding-left:var(--site-pad)!important;padding-right:var(--site-pad)!important}
@media (max-width:860px){main{padding-left:0!important}}
header.top{padding-left:max(var(--site-pad),calc((100% - var(--site-w))/2 + var(--site-pad)))!important;padding-right:max(var(--site-pad),calc((100% - var(--site-w))/2 + var(--site-pad)))!important}
</style>
"""
elif "mage-knight" in path:
    extra = """<style id="sitehead-css-mk">
.app-tuto #side-nav{top:calc(8px + var(--sitehead-h))!important;max-height:calc(92vh - var(--sitehead-h))!important}
.app-tuto .wrap,.app-comp .wrap{max-width:var(--site-w)!important;padding-left:var(--site-pad)!important;padding-right:var(--site-pad)!important}
.topbar{max-width:var(--site-w)!important;padding-left:var(--site-pad)!important;padding-right:var(--site-pad)!important}
@media (max-width:480px){.topbar{justify-content:space-between!important;text-align:left!important}}
</style>
"""
elif "aeons-end" in path:
    extra = """<style id="sitehead-css-ae">
main{max-width:var(--site-w)!important;padding-left:var(--site-pad)!important;padding-right:var(--site-pad)!important}
</style>
"""
s = re.sub(r'<style id="sitehead-css-(imp|mk|ae)">.*?</style>\n?', '', s, flags=re.S)
s = s.replace("</head>", css + extra + "</head>", 1)
s = re.sub(r"(<body[^>]*>)\n?", lambda m: m.group(1) + "\n" + bar, s, count=1)
open(path, "w", encoding="utf-8").write(s)
print("ok", mode, path)
