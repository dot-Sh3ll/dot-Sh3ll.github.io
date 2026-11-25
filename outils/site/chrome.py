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

css = ""  # styles de la barre : commun/composants.css (lien posé par commun.py)
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
.topbar{max-width:none!important;margin:0 0 6px!important;padding:10px calc(max(0px,(100% - var(--site-w))/2) + var(--site-pad))!important;border-bottom:1px solid var(--line);background:color-mix(in srgb,var(--bg) 92%,transparent)}
.topbar>.brand{font-size:21px;line-height:1.1}
@media (max-width:480px){.topbar{justify-content:space-between!important;text-align:left!important}.topbar>.brand{font-size:18px}}
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
import commun, polices
commun.poser(path)   # feuilles communes : commun/tokens.css, commun/composants.css
polices.poser(path)  # polices hébergées sur le site (commun/polices.css)
