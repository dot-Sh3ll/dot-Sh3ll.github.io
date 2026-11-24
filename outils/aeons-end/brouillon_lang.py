#!/usr/bin/env python3
"""Premier jet de cartes.tsv pour une nouvelle langue de l'appli Aeon's End, à partir du jeu de données du randomizer.

usage (depuis la racine du dépôt) :
  python3 outils/aeons-end/brouillon_lang.py <LANGUE_DU_JEU_DE_DONNEES> <code> > brouillon.tsv
  ex. python3 outils/aeons-end/brouillon_lang.py DE de

aer.json doit contenir la langue (extraction : AER_LANGS=ENG,FR,DE node extract.js <aer-data/src> aer.json ;
langues disponibles dans aeons-end-randomizer : ENG, FR, DE, PL).
Pour chaque carte de aeons-end/en.html : nom et effet de l'édition officielle quand le jeu de données les a,
sinon nom vide (le nom anglais sera gardé) et effet anglais précédé de « TODO: » à traduire.
Pour l'allemand, les effets sont passés au vouvoiement (Sie) avec outils/site/sie.py : relire avec « sie.py scan ».
Relire ensuite tout le fichier : noms avec une mention d'édition (« (1. Auflage: …) »), fautes de frappe, textes restés
en anglais dans le jeu de données.
"""
import json, os, re, sys
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE); sys.path.insert(0, os.path.join(HERE, "..", "site"))
from common import IDFIX, clean as clean0


def clean(h):
    h = re.sub(r'<span class="or">\s*(ODER|LUB|OR|OU)\s*</span>', '<span class="or">OR</span>', h)
    s = clean0(h)
    s = re.sub(r'\b(WIRKEN)\b', 'Wirken', s)
    return re.sub(r'\bMONSTER\b', 'Monster', s)


def main():
    if len(sys.argv) < 3:
        sys.exit(__doc__)
    L, code = sys.argv[1], sys.argv[2]
    A = json.load(open(os.path.join(HERE, "aer.json"), encoding="utf-8"))
    if L not in A:
        sys.exit(f"{L} absent de aer.json (langues : {', '.join(A)})")
    data = {IDFIX.get(c["id"], c["id"]): c for v in A[L].values() for c in v["cards"]}
    conv = None
    if code == "de":
        from sie import sie as conv
    page = open(os.path.join(HERE, "..", "..", "aeons-end", "en.html"), encoding="utf-8").read()
    a = page.index("const RAW = [") ; b = page.index("\n];", a)
    print("# id\tnom anglais (référence)\tnom traduit (vide = nom anglais gardé)\teffet traduit (| = retour à la ligne, ~ = OU)")
    for line in page[a:b].split("\n")[1:]:
        s = line.strip()
        if not s.startswith("["):
            continue
        r = json.loads(s.rstrip(","))
        c = data.get(r[0])
        fx = clean(c["effect"]) if c else ""
        if c and not re.search(r"\b(Gain|Cast|Deal|Destroy|Any ally)\b", fx):   # sinon : texte resté en anglais
            name = re.sub(r"\s*\(.*?\)\s*$", "", c["name"].strip())
            print("\t".join([r[0], r[5], name, conv(fx) if conv else fx]))
        else:
            print("\t".join([r[0], r[5], "", "TODO: " + r[6]]))


if __name__ == "__main__":
    main()
