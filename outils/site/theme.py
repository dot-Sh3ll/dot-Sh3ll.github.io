#!/usr/bin/env python3
"""Bouton de thème clair / sombre (comme dans Nemesis) pour les applis qui n'ont pas le leur.

usage : python3 outils/site/theme.py <dossier>     toutes les pages de l'appli (index.html, en.html, de.html…)
        python3 outils/site/theme.py --tout        toutes les applis configurées ci-dessous

Le script est rejouable : il retire d'abord ce qu'il avait posé. Il pose dans chaque page :
  <!--theme-->…<!--/theme-->  avant </head> : feuille outils/site/themes/<code>.css (palette de l'autre thème,
                              style du bouton) et un petit script qui applique le thème choisi avant l'affichage ;
  le bouton ◐ (id="lrmp-theme") à l'endroit indiqué par ANCRE ;
  <script id="theme-js">      avant </body> : clic sur le bouton, titre « Thème : … ».
Choix mémorisé dans localStorage["<code>-theme"] (séparé par langue, comme les autres sauvegardes, via lang.py).

Modes : Imperium suit le système par défaut (automatique → sombre → clair, comme Nemesis) ;
Aeon's End et Mage Knight restent sombres par défaut (sombre ↔ clair) : le clair est une option.
Après une reconstruction de la page anglaise (build_imp.sh, build_mk.sh) ou allemande (gen_lang.py), relancer ce script.
"""
import os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", ".."))
sys.path.insert(0, HERE)
from langs import available

# dossier : (code, modes, ancre). L'ancre est une expression régulière ; le bouton est posé juste après.
APPS = {
    "imperium": ("imp", ["auto", "dark", "light"], r'(<header class="top">.*?<div class="lrmp-onglets"[^>]*>.*?</div>)'),
    "aeons-end": ("ae", ["dark", "light"], r'(<main>\s*<header>\s*<h1>.*?</h1>)'),
    "mage-knight": ("mk", ["dark", "light"], r'(<nav class="modes lrmp-onglets".*?</nav>)'),
}

T = {
    "fr": ("Changer de thème (clair / sombre)", "Thème : ", {"auto": "automatique", "dark": "sombre", "light": "clair"}),
    "en": ("Change theme (light / dark)", "Theme: ", {"auto": "automatic", "dark": "dark", "light": "light"}),
    "de": ("Farbschema wechseln (hell / dunkel)", "Farbschema: ", {"auto": "automatisch", "dark": "dunkel", "light": "hell"}),
}


def page(folder, lang):
    return os.path.join(ROOT, folder, "index.html" if lang == "fr" else lang + ".html")


def apply(folder, lang):
    code, modes, ancre = APPS[folder]
    path = page(folder, lang)
    s = open(path, encoding="utf-8").read()
    css = open(os.path.join(HERE, "themes", code + ".css"), encoding="utf-8").read().strip()
    aria, prefix, names = T.get(lang, T["en"])
    key = code + "-theme"

    # retirer la version précédente
    s = re.sub(r'\n?<!--theme-->.*?<!--/theme-->', '', s, flags=re.S)
    s = re.sub(r'<button type="button" class="lrmp-theme" id="lrmp-theme"[^>]*>.*?</button>', '', s, flags=re.S)
    s = re.sub(r'\n?<script id="theme-js">.*?</script>', '', s, flags=re.S)

    early = ('<script>try{var t=localStorage.getItem("%s");if(t==="dark"||t==="light")'
             'document.documentElement.setAttribute("data-theme",t)}catch(e){}</script>' % key)
    if modes[0] == "dark":  # sombre par défaut : rien à faire si aucun choix
        early = ('<script>try{if(localStorage.getItem("%s")==="light")'
                 'document.documentElement.setAttribute("data-theme","light")}catch(e){}</script>' % key)
    head = "\n<!--theme-->\n<style id=\"theme-css\">\n%s\n</style>\n%s\n<!--/theme-->" % (css, early)
    i = s.index("</head>")
    s = s[:i].rstrip("\n") + head + "\n" + s[i:]

    btn = ('<button type="button" class="lrmp-theme" id="lrmp-theme" aria-label="%s">'
           '<span aria-hidden="true">◐</span></button>' % aria)
    s, n = re.subn(ancre, lambda m: m.group(1) + btn, s, count=1, flags=re.S)
    if not n:
        sys.exit(f"theme.py : ancre introuvable dans {path}")

    names_js = "{" + ",".join(f"{k}:'{v}'" for k, v in names.items()) + "}"
    modes_js = "[" + ",".join(f"'{m}'" for m in modes) + "]"
    js = ("(function(){var M=%s,K='%s',N=%s,b=document.getElementById('lrmp-theme'),d=document.documentElement,t;"
          "try{t=localStorage.getItem(K)}catch(e){}if(M.indexOf(t)<0)t=M[0];"
          "function a(){if(t==='auto'||(t==='dark'&&M[0]==='dark'))d.removeAttribute('data-theme');else d.setAttribute('data-theme',t);"
          "b.title='%s'+N[t]}"
          "b.addEventListener('click',function(){t=M[(M.indexOf(t)+1)%%M.length];try{localStorage.setItem(K,t)}catch(e){}a()});a()})();"
          ) % (modes_js, key, names_js, prefix)
    i = s.rindex("</body>")
    s = s[:i].rstrip("\n") + '\n<script id="theme-js">' + js + "</script>\n" + s[i:]
    open(path, "w", encoding="utf-8").write(s)
    return os.path.relpath(path, ROOT)


def main(args):
    folders = list(APPS) if args == ["--tout"] else [a.strip("/") for a in args]
    if not folders:
        sys.exit(__doc__)
    for f in folders:
        if f not in APPS:
            sys.exit(f"theme.py : {f} n'est pas configuré (voir APPS)")
        for lang in available(os.path.join(ROOT, f)):
            print("thème :", apply(f, lang))


if __name__ == "__main__":
    main(sys.argv[1:])
