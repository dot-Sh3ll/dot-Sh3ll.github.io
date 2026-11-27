#!/usr/bin/env python3
"""Langue d'une appli : redirection vers la bonne page et sauvegardes séparées par langue.

usage : python3 outils/site/lang.py <dossier>          toutes les pages d'une appli (ex. aeons-end)
        python3 outils/site/lang.py --site             toutes les applis du site
        python3 outils/site/lang.py <code> <page>      une seule page (ancienne forme : lang.py en aeons-end/en.html)

Les langues d'une appli se déduisent des fichiers présents (index.html = fr, en.html, de.html…, voir langs.py).
À relancer sur le dossier entier dès qu'une langue est ajoutée à une appli : chaque page connaît la liste.

Ce que fait le script posé en tête de page :
  - garde les fonctions d'origine du stockage dans Storage.prototype.__lrmp (lues par commun/sauvegarde.js) ;
  - recopie une fois les sauvegardes « de: » vers « en: » (version allemande retirée le 26/11/2026) ;
  - sauvegardes : sur une page autre que française, chaque clé du stockage local est préfixée par la langue
    (« en: », « de: »…), sauf « site-lang » ; chaque langue garde donc ses propres parties ;
  - redirection : « site-lang » (choisi sur l'accueil ou avec le bouton de langue) décide de la page ;
    une langue sans page dans l'appli ouvre la page anglaise (langs.FALLBACK) ;
    sans choix enregistré, un navigateur dans une autre langue que le français est envoyé sur la page de sa langue,
    ou sur la page anglaise si elle n'existe pas (les robots d'indexation ne sont jamais redirigés) ;
    ?lang=<code> dans l'adresse empêche la redirection vers une autre langue.
"""
import json, os, re, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from langs import FALLBACK, available, code_of, page_href

APPS = ["mage-knight", "imperium", "aeons-end", "puerto-rico", "nemesis"]

OLD = [
    r'<script>try\{var sl=localStorage\.getItem\("site-lang"\).*?</script>\n?',
    r'<script>\(function\(\)\{try\{var P=Storage\.prototype.*?\}\)\(\);</script>\n?',
    r'<script id="site-lang-js">.*?</script>\n?',
]


def head_script(code, langs):
    hrefs = {c: page_href(c) for c in langs}
    js = ('(function(){try{var C=%s,A=%s,F=%s,B=%s,ls=localStorage,P=Storage.prototype;'
          'if(!P.__lrmp)P.__lrmp={g:P.getItem,s:P.setItem,r:P.removeItem};'
          # version allemande retirée (26/11/2026) : sauvegardes « de: » recopiées une fois vers « en: » si absentes
          'if(C==="en"&&!P.__lrmp.g.call(ls,"lrmp-mig-de")){for(var i=0;i<ls.length;i++){var x=ls.key(i);'
          'if(x&&x.indexOf("de:")===0&&P.__lrmp.g.call(ls,"en:"+x.slice(3))===null)P.__lrmp.s.call(ls,"en:"+x.slice(3),P.__lrmp.g.call(ls,x))}'
          'P.__lrmp.s.call(ls,"lrmp-mig-de","1")}'
          'if(C!=="fr"){var g=P.__lrmp.g,st=P.__lrmp.s,r=P.__lrmp.r,k=function(x){x=String(x);return x==="site-lang"?x:C+":"+x};'
          'P.getItem=function(x){return g.call(this,k(x))};P.setItem=function(x,v){return st.call(this,k(x),v)};P.removeItem=function(x){return r.call(this,k(x))}}'
          'var q=/[?&]lang=([a-z]{2})/.exec(location.search);if(q&&q[1]===C)return;'
          'var sl=ls.getItem("site-lang"),t=null;'
          'if(sl)t=sl;else if(!/bot|crawl|spider|slurp|lighthouse|headless/i.test(navigator.userAgent)){var n=(navigator.language||"").slice(0,2).toLowerCase();if(n&&n!=="fr")t=n}'
          'if(t&&A.indexOf(t)<0)t=A.indexOf(B)>-1?B:null;'
          'if(t&&t!==C)location.replace(F[t]+location.hash)}catch(e){}})();') % (
        json.dumps(code), json.dumps(langs), json.dumps(hrefs, separators=(",", ":")), json.dumps(FALLBACK))
    return f'<script id="site-lang-js">{js}</script>'


def patch(path, code=None):
    code = code or code_of(path)
    langs = available(os.path.dirname(path))
    if code not in langs:
        langs.append(code)
    s = open(path, encoding="utf-8").read()
    for p in OLD:
        s = re.sub(p, "", s, flags=re.S)
    s = re.sub(r'<html lang="[^"]*"', f'<html lang="{code}"', s, count=1)
    s = re.sub(r"(<head[^>]*>)", lambda m: m.group(1) + "\n" + head_script(code, langs), s, count=1)
    open(path, "w", encoding="utf-8").write(s)
    print("ok", code, path, "langues :", " ".join(langs))


def patch_folder(folder):
    for c in available(folder):
        patch(os.path.join(folder, "index.html" if c == "fr" else f"{c}.html"), c)


if __name__ == "__main__":
    a = sys.argv[1:]
    if not a:
        sys.exit(__doc__)
    if a[0] == "--site":
        for f in APPS:
            patch_folder(f)
    elif len(a) == 2:
        patch(a[1], a[0])
    elif os.path.isdir(a[0]):
        patch_folder(a[0])
    else:
        sys.exit(__doc__)
