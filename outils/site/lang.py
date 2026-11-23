#!/usr/bin/env python3
"""Add the FR/EN switch to an app pair.
Any site language other than fr (en, de, es…) opens en.html until the app has its own translation.
usage: lang.py fr <file>      -> patch the French file in place (redirect + switch)
       lang.py en <file>      -> patch the English file in place (storage prefix + redirect + switch)
"""
import re, sys

mode, path = sys.argv[1], sys.argv[2]
s = open(path, encoding="utf-8").read()

HEAD_FR = """<script>try{var sl=localStorage.getItem("site-lang");if(sl&&sl!=="fr"&&!/[?&]lang=fr/.test(location.search))location.replace("en.html"+location.hash)}catch(e){}</script>"""
HEAD_EN = """<script>(function(){try{var P=Storage.prototype,g=P.getItem,st=P.setItem,r=P.removeItem,k=function(x){x=String(x);return x==="site-lang"?x:"en:"+x};
P.getItem=function(x){return g.call(this,k(x))};P.setItem=function(x,v){return st.call(this,k(x),v)};P.removeItem=function(x){return r.call(this,k(x))};
if(localStorage.getItem("site-lang")==="fr"&&!/[?&]lang=en/.test(location.search))location.replace("./"+location.hash)}catch(e){}})();</script>"""

SWITCH = """<a href="{href}" class="site-lang" hreflang="{hl}" lang="{hl}" aria-label="{aria}" onclick="try{{localStorage.setItem('site-lang','{hl}')}}catch(e){{}}" style="position:fixed;bottom:14px;z-index:2147483000;display:inline-flex;align-items:center;gap:6px;padding:8px 13px;border-radius:999px;background:rgba(14,16,24,.88);color:#efe8d8;border:1px solid rgba(221,185,106,.55);font:600 13px/1 system-ui,-apple-system,'Segoe UI',sans-serif;text-decoration:none;box-shadow:0 6px 20px rgba(0,0,0,.35);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px)"><span style="opacity:.55">{cur}</span><span aria-hidden="true" style="opacity:.4">|</span><span>{other}</span></a>
<style>.site-lang{{left:118px;transition:transform .25s ease,opacity .25s ease}}.site-lang.away{{transform:translateY(140%);opacity:0;pointer-events:none}}@media (max-width:640px){{.site-lang{{left:64px;bottom:12px!important;padding:10px 12px!important}}}}</style>
<script>(function(){{var a=document.querySelector(".site-lang"),h=document.querySelector(".site-home");if(!a||!h)return;new MutationObserver(function(){{a.classList.toggle("away",h.classList.contains("away"))}}).observe(h,{{attributes:true,attributeFilter:["class"]}});}})();</script>
"""

if "site-lang" in s and 'class="site-lang"' in s:
    print("already patched"); sys.exit()

if mode == "fr":
    s = re.sub(r"(<head[^>]*>)", lambda m: m.group(1) + "\n" + HEAD_FR, s, count=1)
    sw = SWITCH.format(href="en.html?lang=en", hl="en", aria="Switch to English", cur="FR", other="EN")
else:
    s = re.sub(r'<html lang="fr"', '<html lang="en"', s, count=1)
    s = re.sub(r"(<head[^>]*>)", lambda m: m.group(1) + "\n" + HEAD_EN, s, count=1)
    sw = SWITCH.format(href="./?lang=fr", hl="fr", aria="Passer en français", cur="EN", other="FR")
    s = s.replace('<a href="../" style="color:inherit;font-weight:600">', '<a href="../" style="color:inherit;font-weight:600">', 1)
i = s.rindex("</body>")
s = s[:i] + sw + s[i:]
open(path, "w", encoding="utf-8").write(s)
print("ok", mode, path)
