#!/usr/bin/env python3
"""Avancement des traductions, appli par appli et langue par langue.

usage : python3 outils/traduire_etat.py          (depuis la racine du dépôt)

Pour chaque appli de outils/site/jeux.json et chaque langue du site (outils/site/langs.py) :
  ✓ page présente (avec le nombre de textes encore à traduire quand un outil sait le compter)
  ↪ pas de page : les visiteurs de cette langue ouvrent la page anglaise
Puis l'accueil et les fiches PDF (une fiche par langue).
"""
import glob, json, os, re, subprocess, sys
RACINE = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), ".."))
os.chdir(RACINE)
sys.path.insert(0, os.path.join(RACINE, "outils", "site"))
from langs import ORDER, available

JEUX = {k: v for k, v in json.load(open("outils/site/jeux.json", encoding="utf-8")).items() if not k.startswith("_") and k != "accueil"}
# textes restant à traduire, pour les pages générées par un outil qui sait les compter
RESTE = {}


def reste(cmd):
    r = subprocess.run([sys.executable] + cmd, capture_output=True, text=True)
    m = re.search(r"(\d+) carte\(s\), (\d+) texte\(s\)", r.stdout)
    return f" ({int(m.group(1)) + int(m.group(2))} à traduire)" if m and (int(m.group(1)) + int(m.group(2))) else ""


def case(dossier, c):
    if c in available(dossier):
        return "✓" + (reste(RESTE[(dossier, c)]) if (dossier, c) in RESTE else "")
    return "↪ EN" if c != "en" else "✗"


l = max(len(j["jeu"]["fr"]) for j in JEUX.values()) + 2
print("Applis".ljust(l) + "".join(c.upper().ljust(22) for c in ORDER))
for d, j in JEUX.items():
    print(j["jeu"]["fr"].ljust(l) + "".join(case(d, c).ljust(22) for c in ORDER))

print("\nAccueil".ljust(l + 1) + "".join(("✓" if c == "fr" or os.path.exists(f"{c}/index.html") else "✗").ljust(22) for c in ORDER))
for c in ORDER:
    if c in ("fr", "en"):
        continue
    r = subprocess.run([sys.executable, "outils/site/home_lang.py", "--todo", c], capture_output=True, text=True)
    n = len([x for x in r.stdout.splitlines() if x.strip()])
    if n:
        print(f"  accueil {c} : {n} texte(s) à traduire (home_lang.py --todo {c})")

print("\n" + "Fiches PDF".ljust(46) + "".join(c.upper().ljust(8) for c in ORDER))
s = open("index.html", encoding="utf-8").read()
for art in re.findall(r'<article class="pdf[^"]*".*?</article>', s, re.S):
    titre = re.sub(r"<[^>]+>", "", re.search(r'<span class="fr">(.*?)</span>', art, re.S).group(1))
    fr = re.search(r'class="dl fr" href="fiches/([^"]+)"', art)
    en = re.search(r'class="dl en" href="fiches/([^"]+)"', art)
    cases = {"fr": "✓" if fr else "✗", "en": "✓" if en else "✗"}
    for c in ORDER:
        cases.setdefault(c, "↪ EN" if en else "↪ FR")
    print("  " + titre[:44].ljust(44) + "".join(cases[c].ljust(8) for c in ORDER))
