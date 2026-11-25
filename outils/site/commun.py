#!/usr/bin/env python3
"""Feuilles communes du site (commun/tokens.css et commun/composants.css) dans une page.

usage : python3 outils/site/commun.py <page.html> [...]     (depuis la racine du dépôt)

Pose, juste avant </head>, le bloc
  <!--commun--> <link tokens.css?v=…> <link composants.css?v=…> <!--/commun-->
Le paramètre v est tiré du contenu des fichiers : après une modification des feuilles communes,
relancer ce script (ou chrome.py, qui l'appelle) suffit pour que les navigateurs prennent la nouvelle version.
"""
import hashlib, os, re, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from polices import RACINE, prefixe

FEUILLES = ["tokens.css", "composants.css"]


def version(nom):
    return hashlib.sha1(open(os.path.join(RACINE, "commun", nom), "rb").read()).hexdigest()[:8]


def bloc(path):
    pre = prefixe(path)
    return "<!--commun-->\n" + "\n".join(
        f'<link rel="stylesheet" href="{pre}commun/{f}?v={version(f)}">' for f in FEUILLES) + "\n<!--/commun-->\n"


def poser(path):
    s = open(path, encoding="utf-8").read()
    s = re.sub(r"<!--commun-->.*?<!--/commun-->\n?", "", s, flags=re.S)
    # avant les styles propres à l'appli posés par chrome.py, sinon juste avant </head>
    m = re.search(r'<style id="sitehead-css-[a-z]+">', s)
    i = m.start() if m else s.index("</head>")
    s = s[:i] + bloc(path) + s[i:]
    open(path, "w", encoding="utf-8").write(s)
    print("ok", path, ": feuilles communes")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    for p in sys.argv[1:]:
        poser(p)
