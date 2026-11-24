#!/usr/bin/env python3
"""Traduire une appli d'une page (HTML + JS) à partir de sa version anglaise, avec une table de traduction.

usage (depuis la racine du dépôt) :
  python3 outils/site/traduire.py todo  <source.html> <table.json> [--sauter DEBUT FIN]...
        liste les textes de la page source qui n'ont pas encore de traduction (ni d'entrée dans _garder)
  python3 outils/site/traduire.py apply <source.html> <table.json> <sortie.html> [--sauter DEBUT FIN]...
        écrit la page traduite et signale les textes restés sans traduction

La table (JSON) :
  "texte anglais exact": "traduction"     un texte de la page (contenu d'une balise, attribut title/aria-label/placeholder…,
                                          chaîne JavaScript) ; il est remplacé partout où il apparaît seul
  "_patches": [["ancien", "nouveau"], …]  remplacements de code faits AVANT la traduction, pour ce que la table seule ne peut
                                          pas faire : ordre des mots, pluriels, textes assemblés par morceaux. Chaque ancien texte
                                          doit apparaître une seule fois dans la source ; sinon le script s'arrête et le dit.
  "_garder": ["…"]                        textes à laisser tels quels (noms propres, identifiants) : ils ne sont plus signalés
  les autres clés commençant par « _ » sont des notes.

--sauter DEBUT FIN : zone à ne pas traduire (ex. un bloc de données reconstruit à part), de la première occurrence de DEBUT
à la première occurrence de FIN qui suit. Peut être répété.

Attention : un texte de la table est remplacé partout, y compris quand c'est un identifiant du code (« Gem » valeur de
type, « loss » nom de classe…). Ne jamais mettre dans la table un mot qui sert aussi de valeur dans le code : passer
par un patch sur l'instruction qui l'affiche. La liste « todo » montre seulement les textes qui ressemblent à du texte
(une majuscule, une espace ou une ponctuation de phrase) ; les identifiants du code n'y apparaissent pas.
"""
import json, os, re, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import i18n


def load_table(path):
    t = json.load(open(path, encoding="utf-8"))
    patches = t.get("_patches", [])
    keep = set(t.get("_garder", []))
    mp = {k: v for k, v in t.items() if not k.startswith("_")}
    return mp, patches, keep


def apply_patches(html, patches):
    errors = []
    for old, new in patches:
        n = html.count(old)
        if n != 1:
            errors.append((n, old))
            continue
        html = html.replace(old, new)
    return html, errors


def regions(html, skips):
    out = []
    for a, b in skips:
        i = html.find(a)
        if i < 0:
            sys.exit(f"--sauter : début introuvable : {a!r}")
        j = html.find(b, i)
        if j < 0:
            sys.exit(f"--sauter : fin introuvable : {b!r}")
        out.append((i, j + len(b)))
    return out


def looks_text(t):
    """un texte à traduire plutôt qu'un identifiant du code"""
    if re.fullmatch(r"[\w.#\[\]=\-:/]+", t) and not re.match(r"[A-ZÀ-Ý]", t):
        return False                     # identifiant, sélecteur, chemin
    if re.fullmatch(r"[A-Z0-9_\-]{1,4}", t):
        return False                     # sigle court (boîtes : BASE, OD…)
    if re.fullmatch(r"[A-Z][a-z]+(?:[A-Z][a-z]+)+", t):
        return False                     # identifiant en CamelCase (FracturedQuartz)
    if re.fullmatch(r"&\w+;|[\s\W]*", t):
        return False                     # entité HTML, ponctuation seule
    return bool(re.search(r"[A-Za-zÀ-ÿ]{2}", t))


def translate(html, mp, skip=()):
    """remplace les textes de la table ; renvoie (html, textes restés sans traduction)"""
    units = [u for u in i18n.extract_units(html) if not any(a <= u[0] < b for a, b in skip)]
    res, last, missing = [], 0, []
    for a, b, t, q, aq in sorted(units):
        if a < last:
            continue
        if t in mp and mp[t] != t:
            v = mp[t]
            if aq == '"' and q != '"': v = v.replace('"', "&quot;")
            if aq == "'" and q != "'": v = v.replace("'", "&#39;")
            if q in ("'", '"'): v = re.sub(r"(?<!\\)" + re.escape(q), lambda m: "\\" + q, v)
            if q == "`": v = v.replace("`", "\\`").replace("${", "\\${")
            if q is None and aq is None: v = v.replace("<", "&lt;")
            res.append(html[last:a]); res.append(v); last = b
        elif t not in mp:
            missing.append(t)
    res.append(html[last:])
    return "".join(res), missing


def run(src_html, table_path, skips=()):
    mp, patches, keep = load_table(table_path)
    html, errors = apply_patches(src_html, patches)
    for n, old in errors:
        print(f"PATCH {'introuvable' if n == 0 else f'trouvé {n} fois'} : {old[:110]!r}")
    html, missing = translate(html, mp, regions(html, skips))
    from_patches = " ".join(new for _, new in patches)
    todo = []
    for t in missing:
        words = re.findall(r"[A-Za-zÀ-ÿ]{2,}", re.sub(r'[\w-]+=["\'][^"\']*["\']?', " ", t))
        if t in from_patches or all(w in from_patches for w in words):
            continue                     # texte écrit par un patch (déjà dans la langue cible) ou simple balisage
        if t not in keep and looks_text(t) and t not in todo:
            todo.append(t)
    return html, todo, errors


def main():
    a = sys.argv[1:]
    skips = []
    while "--sauter" in a:
        i = a.index("--sauter"); skips.append((a[i + 1], a[i + 2])); del a[i:i + 3]
    if len(a) < 3 or a[0] not in ("todo", "apply"):
        sys.exit(__doc__)
    src = open(a[1], encoding="utf-8").read()
    html, todo, errors = run(src, a[2], skips)
    if a[0] == "apply":
        open(a[3], "w", encoding="utf-8").write(html)
        print("écrit", a[3])
    for t in todo:
        print("à traduire :", json.dumps(t, ensure_ascii=False))
    print(f"{len(todo)} texte(s) sans traduction, {len(errors)} patch(s) en échec")
    sys.exit(1 if errors else 0)


if __name__ == "__main__":
    main()
