#!/usr/bin/env python3
"""Service worker et manifest, tenus à jour automatiquement.

usage : python3 outils/site/sw.py          (depuis la racine du dépôt ; seo.py l'appelle à la fin)

- sw.js : la liste PRECACHE (accueil et ses langues, chaque page de langue de chaque appli, feuilles communes,
  icônes) et VERSION sont réécrites. VERSION est une empreinte du contenu de ces fichiers : dès qu'une page
  change, les visiteurs reçoivent la nouvelle version, sans rien changer à la main.
- manifest.webmanifest : description et raccourcis (un par appli, dans l'ordre de seo.PAGES).
"""
import hashlib, json, os, re, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from langs import available, page_file
import seo

FIXES = ["manifest.webmanifest", "commun/polices.css", "commun/tokens.css", "commun/composants.css", "commun/sauvegarde.js",
         "icons/icon-192.png", "icons/icon-512.png", "icons/apple-touch-icon.png", "icons/favicon-32.png"]


def precache():
    l = ["./", "index.html"] + [f"{c}/" for c in seo.ACCUEIL_LANGS if c != "fr"]
    for d in seo.PAGES:
        for c in available(d):
            l.append(f"{d}/" if c == "fr" else f"{d}/{page_file(c)}")
    return l + FIXES


def fichier(u):
    return os.path.join(u, "index.html") if u.endswith("/") else ("index.html" if u == "./" else u)


def main():
    m = json.load(open("manifest.webmanifest", encoding="utf-8"))
    noms = [c["jeu"]["fr"] for c in seo.PAGES.values()]
    m["description"] = ("Tutoriels interactifs, compagnons solo et fiches pour " + ", ".join(noms[:-1]) + " et " + noms[-1] + ".")
    m["shortcuts"] = [{"name": c["jeu"]["fr"], "url": f"{d}/", "icons": [{"src": "icons/icon-192.png", "sizes": "192x192"}]}
                      for d, c in seo.PAGES.items()]
    open("manifest.webmanifest", "w", encoding="utf-8").write(json.dumps(m, ensure_ascii=False, indent=2) + "\n")
    urls = precache()
    h = hashlib.sha1()
    for u in urls:
        p = "index.html" if u == "./" else fichier(u)
        h.update(open(p, "rb").read())
    version = h.hexdigest()[:10]
    s = open("sw.js", encoding="utf-8").read()
    lignes = ",\n  ".join(", ".join(json.dumps(x) for x in urls[i:i + 4]) for i in range(0, len(urls), 4))
    s = re.sub(r"const VERSION = [^\n]*", f'const VERSION = "{version}";  // empreinte du contenu, écrite par outils/site/sw.py', s, count=1)
    s = re.sub(r"const PRECACHE = \[.*?\];", f"const PRECACHE = [\n  {lignes}\n];", s, count=1, flags=re.S)
    s = s.replace("   Changer VERSION à chaque grosse mise à jour pour vider l'ancien cache. */",
                  "   VERSION et PRECACHE sont écrits par outils/site/sw.py (lancé par seo.py) : ne pas les modifier à la main. */")
    open("sw.js", "w", encoding="utf-8").write(s)

    print("ok sw.js · version", version, "·", len(urls), "fichiers ; ok manifest.webmanifest ·", len(m["shortcuts"]), "raccourcis")


if __name__ == "__main__":
    main()
