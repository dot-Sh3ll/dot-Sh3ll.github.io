#!/usr/bin/env python3
"""Polices hébergées sur le site (commun/polices.css) à la place de Google Fonts.

usage : python3 outils/site/polices.py <page.html> [...]     (depuis la racine du dépôt)

Pour chaque page : retire les balises Google Fonts (preconnect + feuille), pose à la place
  <!--polices:Famille,Famille-->  lien vers commun/polices.css + préchargement des fichiers « latin »
  <!--/polices-->
Les familles sont lues dans l'adresse Google Fonts la première fois, puis dans le commentaire : relancer ne change rien.
chrome.py appelle ce script sur chaque page qu'il traite (les constructions d'applis passent toutes par lui).

Ajouter une police : copier ses fichiers woff2 (latin et latin-ext, Fontsource) dans commun/polices/,
ajouter ses @font-face dans commun/polices.css et une ligne dans FICHIERS ci-dessous.
"""
import os, re, sys
from urllib.parse import unquote_plus

# famille -> fichier « latin » à précharger (le latin-ext n'est chargé que si la page en a besoin)
FICHIERS = {
    "Marcellus": "marcellus-latin.woff2",
    "Figtree": "figtree-latin.woff2",
    "Cinzel": "cinzel-latin.woff2",
    "Source Sans 3": "source-sans-3-latin.woff2",
    "Fraunces": "fraunces-latin.woff2",
    "Rajdhani": "rajdhani-700-latin.woff2",
}
RACINE = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".."))
GOOGLE = [r'\n?<link rel="preconnect" href="https://fonts\.googleapis\.com"[^>]*>',
          r'\n?<link rel="preconnect" href="https://fonts\.gstatic\.com"[^>]*>']


def prefixe(path):
    """chemin relatif de la page vers la racine du site"""
    d = os.path.relpath(os.path.dirname(os.path.abspath(path)), RACINE)
    return "" if d == "." else "../" * len(d.split(os.sep))


def bloc(familles, pre):
    l = [f'<!--polices:{",".join(familles)}-->', f'<link rel="stylesheet" href="{pre}commun/polices.css">']
    l += [f'<link rel="preload" href="{pre}commun/polices/{FICHIERS[f]}" as="font" type="font/woff2" crossorigin>' for f in familles]
    return "\n".join(l) + "\n<!--/polices-->"


def poser(path):
    s = open(path, encoding="utf-8").read()
    m = re.search(r"<!--polices:([^>]*)-->", s)
    familles = m.group(1).split(",") if m else []
    g = re.search(r'\n?<link href="(https://fonts\.googleapis\.com/css2\?[^"]+)" rel="stylesheet">|\n?<link rel="stylesheet" href="(https://fonts\.googleapis\.com/css2\?[^"]+)">', s)
    if g:
        url = g.group(1) or g.group(2)
        familles = [unquote_plus(x.split(":")[0]) for x in re.findall(r"family=([^&]+)", url)]
        s = s.replace(g.group(0), "\n<!--polices-->", 1)
        for p in GOOGLE:
            s = re.sub(p, "", s)
    if not familles:
        print("rien à faire", path)
        return
    inconnues = [f for f in familles if f not in FICHIERS]
    if inconnues:
        sys.exit(f"polices.py : police non hébergée {inconnues} ({path}) : voir le mode d'emploi en tête du script")
    s = re.sub(r"<!--polices(?::[^>]*)?-->.*?<!--/polices-->|<!--polices-->", lambda _: bloc(familles, prefixe(path)), s, count=1, flags=re.S)
    open(path, "w", encoding="utf-8").write(s)
    print("ok", path, ":", ", ".join(familles))


if __name__ == "__main__":
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    for p in sys.argv[1:]:
        poser(p)
