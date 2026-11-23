#!/usr/bin/env python3
"""Put the site header (same as the home page) at the top of an app page, sticky.
usage: chrome.py fr|en <file>"""
import re, sys
mode, path = sys.argv[1], sys.argv[2]
s = open(path, encoding="utf-8").read()

# remove every previous version of the site chrome
s = re.sub(r'<a href="\.\./" class="site-home".*?</a>\n?', '', s, flags=re.S)
s = re.sub(r'<style>\n?\.site-home\{.*?</style>\n?<script>\n?\(function\(\)\{var a=document\.querySelector\("\.site-home"\).*?</script>\n?', '', s, flags=re.S)
s = re.sub(r'<a href="[^"]*" class="site-lang".*?</a>\n<style>\.site-lang.*?</style>\n<script>.*?</script>\n?', '', s, flags=re.S)
s = re.sub(r'<div class="sitebar".*?<!--/sitebar-->\n?', '', s, flags=re.S)
s = re.sub(r'<header class="sitehead".*?<!--/sitehead-->\n?', '', s, flags=re.S)
s = re.sub(r'<style id="sitebar-css">.*?</style>\n?', '', s, flags=re.S)
s = re.sub(r'<style id="sitehead-css">.*?</style>\n?', '', s, flags=re.S)

FR = mode == "fr"
brand = "Less Rules, More Play"
home_aria = "Retour à l'accueil des aides de jeu" if FR else "Back to the game aids home page"
kofi = "Offrir un café" if FR else "Buy me a coffee"
other_href = "en.html?lang=en" if FR else "./?lang=fr"
other_l = "en" if FR else "fr"
sw_aria = "Switch to English" if FR else "Passer en français"

fr_item = '<span aria-current="true">FR</span>' if FR else f'<a href="{other_href}" hreflang="fr" lang="fr" aria-label="{sw_aria}" onclick="try{{localStorage.setItem(\'site-lang\',\'fr\')}}catch(e){{}}">FR</a>'
en_item = f'<a href="{other_href}" hreflang="en" lang="en" aria-label="{sw_aria}" onclick="try{{localStorage.setItem(\'site-lang\',\'en\')}}catch(e){{}}">EN</a>' if FR else '<span aria-current="true">EN</span>'

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
<div class="sh-lang" role="group" aria-label="Langue / Language">{fr_item}{en_item}</div>
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
nav{top:var(--sitehead-h)!important;height:calc(100vh - var(--sitehead-h))!important}
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
s = re.sub(r"(<body[^>]*>)", lambda m: m.group(1) + "\n" + bar, s, count=1)
open(path, "w", encoding="utf-8").write(s)
print("ok", mode, path)
