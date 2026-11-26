#!/usr/bin/env python3
"""Écrit les sources d'une autre langue de l'appli Aeon's End (format commun) à partir des sources anglaises.

usage (depuis la racine du dépôt) :
  python3 outils/aeons-end/gen_lang.py de            écrit outils/aeons-end/contenu/de/* et i18n/de.json
  python3 outils/aeons-end/gen_lang.py de --todo     liste seulement ce qui manque (textes, cartes, patches)
Puis : sh outils/aeons-end/build.sh (qui lance d'ailleurs ce script pour chaque langue de langues/), puis seo.py.

Tables de traduction, dans outils/aeons-end/langues/<code>/ :
  cartes.tsv   une ligne par carte : id, nom anglais (référence), nom traduit (vide = nom anglais gardé), effet traduit
               (| = retour à la ligne, ~ = OU). Nouvelle carte dans les sources anglaises : le script la signale et
               garde l'anglais.
  textes.json  table de traduction de l'interface (voir outils/site/traduire.py) : textes, noms des boîtes,
               némésis et mages, descriptions, et _patches pour les phrases assemblées par morceaux.

L'anglais reste la référence : la page anglaise (page.html + i18n/en.json + contenu/en/) est traduite en entier,
puis découpée selon page.html. Ne pas modifier contenu/<code>/ à la main : modifier les tables, puis relancer.
Nouvelle langue (ex. es) : copier le dossier langues/de en langues/es, traduire, ajouter la langue dans
outils/site/langs.py si besoin, puis lancer ce script avec es.
"""
import json, os, re, sys
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


def anglais(src):
    """page anglaise sans blocs générés, ligne par ligne, avec l'origine de chaque ligne"""
    page = open(os.path.join(src, "page.html"), encoding="utf-8").read().split("\n")
    en = json.load(open(os.path.join(src, "i18n", "en.json"), encoding="utf-8"))
    lignes, origine = [], []          # origine : ("gabarit", ligne du gabarit) ou ("morceau", nom, extension)
    for t in page:
        m = re.fullmatch(r"<!--CONTENU:([a-z0-9_-]+)-->", t)
        if m:
            nom = m.group(1)
            ext = next(e for e in (".js", ".html") if os.path.exists(os.path.join(src, "contenu", "en", nom + e)))
            for l in open(os.path.join(src, "contenu", "en", nom + ext), encoding="utf-8").read().split("\n"):
                lignes.append(l); origine.append(("morceau", nom, ext))
        else:
            lignes.append(re.sub(r"\{\{([a-z0-9_]+)\}\}", lambda k: "en" if k.group(1) == "_lang" else en[k.group(1)], t))
            origine.append(("gabarit", t))
    return lignes, origine, list(en)


def main():
    a = sys.argv[1:]
    if not a:
        sys.exit(__doc__)
    code, todo_only = a[0], "--todo" in a
    lignes, origine, cles = anglais(HERE)
    html, missing, unused = rebuild_raw("\n".join(lignes), load_cards(code))
    html, todo, errors = traduire.run(html, os.path.join(HERE, "langues", code, "textes.json"), [(RAW_START, RAW_END)])
    for k in missing:
        print("carte sans traduction (anglais gardé) :", k)
    for k in unused:
        print("carte de cartes.tsv absente des sources anglaises :", k)
    for t in todo:
        print("texte à traduire :", json.dumps(t, ensure_ascii=False))
    print(f"{len(missing)} carte(s), {len(todo)} texte(s) sans traduction ; {len(errors)} patch(s) en échec")
    if todo_only:
        return
    tr = html.split("\n")
    if len(tr) != len(lignes):
        sys.exit("gen_lang.py : la traduction a changé le nombre de lignes ; une ligne de textes.json contient-elle un retour à la ligne ?")
    morceaux, i18n = {}, {}
    for l, o in zip(tr, origine):
        if o[0] == "morceau":
            morceaux.setdefault((o[1], o[2]), []).append(l)
            continue
        modele = o[1]
        if "{{" not in modele:
            if l != modele:
                sys.exit(f"gen_lang.py : texte traduit hors des morceaux, ajouter une clé dans page.html : {modele[:100]!r}")
            continue
        motif = "^" + re.sub(r"\\\{\\\{([a-z0-9_]+)\\\}\\\}", lambda k: f"(?P<{k.group(1)}>.*?)", re.escape(modele)) + "$"
        m = re.match(motif, l)
        if not m:
            sys.exit(f"gen_lang.py : ligne traduite méconnaissable : {modele[:100]!r}")
        i18n.update({k: v for k, v in m.groupdict().items() if k != "_lang"})
    d = os.path.join(HERE, "contenu", code)
    os.makedirs(d, exist_ok=True)
    for (nom, ext), ls in morceaux.items():
        open(os.path.join(d, nom + ext), "w", encoding="utf-8").write("\n".join(ls))
    with open(os.path.join(HERE, "i18n", code + ".json"), "w", encoding="utf-8") as f:
        json.dump({k: i18n[k] for k in cles}, f, ensure_ascii=False, indent=1)
    print("écrit", os.path.relpath(d), "et", os.path.relpath(os.path.join(HERE, "i18n", code + ".json")))


if __name__ == "__main__":
    main()
