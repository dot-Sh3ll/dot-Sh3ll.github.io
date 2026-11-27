#!/usr/bin/env python3
"""Registre des clés du stockage local (sauvegardes des visiteurs) : outils/site/stockage.json.

Une clé qui disparaît d'une appli, c'est la progression, le carnet ou le journal des visiteurs qui disparaît avec.
verifier.py appelle controler() : ERREUR si une clé du registre n'apparaît plus dans les pages de son appli,
point à surveiller si une page utilise une clé absente du registre.

usage (depuis la racine du dépôt) :
  python3 outils/site/stockage.py            liste les clés trouvées dans les pages, appli par appli
  python3 outils/site/stockage.py --maj      ajoute au registre les nouvelles clés trouvées (sans jamais en retirer)

Retirer une clé du registre (« retiree ») n'est permis qu'avec une migration qui recopie ses données ailleurs,
et avec l'accord de Paul (voir CLAUDE.md, « Sauvegardes des visiteurs »).
"""
import json, os, re, sys

RACINE = os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".."))
REG = os.path.join(RACINE, "outils", "site", "stockage.json")
MOTIFS = [
    r"""localStorage\.(?:get|set|remove)Item\(\s*['"]([^'"]+)['"]""",
    r"""\bLS\.(?:get|set)\(\s*['"]([^'"]+)['"]""",
    r"""\b(?:SAVE|TKEY|KKEY|CKEY|KEY)\s*=\s*['"]([^'"]+)['"]""",
]
IGNORER = {"site-lang", "lrmp-mig-de", "lrmp-recup"}  # clés du site, gérées par lang.py et commun/sauvegarde.js


def applis():
    return [d for d in json.load(open(os.path.join(RACINE, "outils", "site", "jeux.json"), encoding="utf-8")) if not d.startswith("_") and os.path.isdir(os.path.join(RACINE, d))]


def trouvees(dossier):
    s = open(os.path.join(RACINE, dossier, "index.html"), encoding="utf-8").read()
    return sorted({k for m in MOTIFS for k in re.findall(m, s)} - IGNORER)


def registre():
    try:
        return json.load(open(REG, encoding="utf-8"))
    except FileNotFoundError:
        return {"_aide": "Clés du stockage local par appli (voir outils/site/stockage.py). Ne jamais en retirer sans migration.", "applis": {}}


def controler(err, att):
    r = registre()
    for d in applis():
        vues = set(trouvees(d))
        for k in r["applis"].get(d, {}).get("cles", []):
            if k not in vues:
                err("sauvegardes", f"{d} : la clé « {k} » n'est plus utilisée : les visiteurs perdraient ces données (migration + accord de Paul, puis la marquer « retiree » dans stockage.json)")
        for k in sorted(vues - set(r["applis"].get(d, {}).get("cles", [])) - set(r["applis"].get(d, {}).get("retiree", []))):
            att("sauvegardes", f"{d} : nouvelle clé « {k} » : l'ajouter au registre (python3 outils/site/stockage.py --maj)")


if __name__ == "__main__":
    r = registre()
    for d in applis():
        vues = trouvees(d)
        print(d, ":", " ".join(vues))
        if "--maj" in sys.argv:
            e = r["applis"].setdefault(d, {"cles": []})
            e["cles"] = sorted(set(e["cles"]) | set(vues))
    if "--maj" in sys.argv:
        json.dump(r, open(REG, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
        open(REG, "a").write("\n")
        print("ok", REG)
