#!/usr/bin/env python3
"""Construit une autre langue de l'appli Aeon's End (aeons-end/<code>.html) à partir de la page anglaise.

usage (depuis la racine du dépôt) :
  python3 outils/aeons-end/gen_lang.py de            écrit aeons-end/de.html, puis relance lang.py et chrome.py sur le dossier
  python3 outils/aeons-end/gen_lang.py de --todo     liste seulement ce qui manque (textes, cartes, patches)

Sources, dans outils/aeons-end/langues/<code>/ :
  cartes.tsv   une ligne par carte : id, nom anglais (référence), nom traduit (vide = nom anglais gardé), effet traduit
               (| = retour à la ligne, ~ = OU). Nouvelle carte dans en.html : le script la signale et garde l'anglais.
  textes.json  table de traduction de l'interface (voir outils/site/traduire.py) : textes, noms des boîtes,
               némésis et mages, descriptions, et _patches pour les phrases assemblées par morceaux.

La page anglaise reste la référence : après une modification de en.html, relancer ce script ; il signale les textes
nouveaux à ajouter dans textes.json et les patches qui ne trouvent plus leur code.
Nouvelle langue (ex. es) : copier le dossier langues/de en langues/es, traduire, ajouter la langue dans
outils/site/langs.py si besoin, puis lancer ce script avec es.
"""
import json, os, re, subprocess, sys
HERE = os.path.dirname(os.path.abspath(__file__))
SITE = os.path.join(HERE, "..", "site")
sys.path.insert(0, SITE)
import traduire

RAW_START, RAW_END = "const RAW = [", "\n];"


def load_cards(code):
    cards = {}
    for line in open(os.path.join(HERE, "langues", code, "cartes.tsv"), encoding="utf-8"):
        if not line.strip() or line.startswith("#"):
            continue
        f = line.rstrip("\n").split("\t")
        cards[f[0]] = {"en": f[1], "name": f[2], "fx": f[3]}
    return cards


def rebuild_raw(html, cards):
    a = html.index(RAW_START) + len(RAW_START)
    b = html.index(RAW_END, a)
    out, seen, missing = [], set(), []
    for line in html[a:b].split("\n"):
        s = line.strip()
        if s.startswith("["):
            r = json.loads(s.rstrip(","))
            c = cards.get(r[0])
            if c:
                r[4] = c["name"] or r[5]
                r[6] = c["fx"]
                seen.add(r[0])
            else:
                missing.append(r[0])
            line = json.dumps(r, ensure_ascii=False, separators=(",", ":")) + ("," if s.endswith(",") else "")
        out.append(line)
    unused = [k for k in cards if k not in seen and k not in missing]
    return html[:a] + "\n".join(out) + html[b:], missing, unused


def main():
    a = sys.argv[1:]
    if not a:
        sys.exit(__doc__)
    code, todo_only = a[0], "--todo" in a
    root = os.path.abspath(os.path.join(HERE, "..", ".."))
    src = open(os.path.join(root, "aeons-end", "en.html"), encoding="utf-8").read()
    html, missing, unused = rebuild_raw(src, load_cards(code))
    html, todo, errors = traduire.run(html, os.path.join(HERE, "langues", code, "textes.json"), [(RAW_START, RAW_END), ("<title>", "<!--/seo-->")])
    for k in missing:
        print("carte sans traduction (anglais gardé) :", k)
    for k in unused:
        print("carte de cartes.tsv absente de en.html :", k)
    for t in todo:
        print("texte à traduire :", json.dumps(t, ensure_ascii=False))
    print(f"{len(missing)} carte(s), {len(todo)} texte(s) sans traduction ; {len(errors)} patch(s) en échec")
    if todo_only:
        return
    out = os.path.join(root, "aeons-end", f"{code}.html")
    open(out, "w", encoding="utf-8").write(html)
    print("écrit", out)
    for tool in ("lang.py", "chrome.py"):
        subprocess.run([sys.executable, os.path.join(SITE, tool), os.path.join(root, "aeons-end")], check=True, cwd=root)


if __name__ == "__main__":
    main()
