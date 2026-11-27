#!/usr/bin/env python3
"""Ajouter ou modifier les cartes de la page d'accueil (index.html) sans toucher au HTML.

À lancer depuis la racine du dépôt :
  python3 outils/site/accueil.py liste                    cartes et fiches, avec leurs dates
  python3 outils/site/accueil.py maj <cible> [AAAA-MM-JJ]  met à jour la date (data-updated) d'une appli ou d'une fiche
                                                         cible = dossier de l'appli (puerto-rico) ou nom du PDF (puerto-rico-batiments.pdf)
  python3 outils/site/accueil.py appli <appli.json>       ajoute (ou remplace) la carte d'une appli
  python3 outils/site/accueil.py fiche <fiche.json>       ajoute (ou remplace) une fiche PDF
Chaque commande relance home_lang.py (textes de l'interface de l'accueil) : les textes d'autres langues donnés dans le JSON
sont rangés dans accueil/<code>.json, les langues sans texte restent en anglais (et sont signalées).

appli.json (exemple dans accueil/exemples/exemple-appli.json) :
  {"dossier": "puerto-rico", "jeu": "pr", "glyphe": "⛵",
   "nom": {"fr": "Puerto Rico 1897"},                    une seule langue = même nom partout
   "texte": {"fr": "...", "en": "..."},
   "tags": [{"fr": "Tutoriel", "en": "Tutorial"}],
   "langues": "FR · EN",                                   langues de l'appli (ex. "FR · EN · DE")
   "nouveau_jeu": {"chip": "Puerto Rico", "recherche": "puerto rico 1897",
                   "accent": "#e2cc9f", "c1": "#8a6a43", "c2": "#2b1f14"}}   seulement si le jeu n'est pas encore sur le site
fiche.json (exemple dans accueil/exemples/exemple-fiche.json) :
  {"jeu": "pr", "icone": "🏛️", "pdf_fr": "puerto-rico-batiments.pdf", "pdf_en": "puerto-rico-buildings.pdf",
   "titre": {...}, "texte": {...}, "meta": {...}}       pdf_en facultatif ; les PDF vont dans fiches/
"""
import datetime, json, os, re, subprocess, sys
H = os.path.dirname(os.path.abspath(__file__))
P = "index.html"
TODAY = datetime.date.today().isoformat()


def load():
    return open(P, encoding="utf-8").read()


def save(s):
    open(P, "w", encoding="utf-8").write(s)
    subprocess.run([sys.executable, os.path.join(H, "home_lang.py"), P], check=True)


def multi(d, tag, extra=""):
    """fr + en écrits dans la page ; les autres langues partent dans accueil/<code>.json."""
    if isinstance(d, str) or len(d) == 1:
        return d if isinstance(d, str) else next(iter(d.values()))
    remember(d)
    return f'<{tag} class="fr"{extra}>{d["fr"]}</{tag}><{tag} class="en"{extra}>{d["en"]}</{tag}>'


def remember(d):
    for c, v in d.items():
        if c in ("fr", "en"):
            continue
        f = os.path.join(H, "accueil", c + ".json")
        if not os.path.exists(f):
            continue  # site en français et en anglais seulement
        L = json.load(open(f, encoding="utf-8"))
        L[d["en"]] = v
        json.dump(L, open(f, "w", encoding="utf-8"), ensure_ascii=False, indent=1)


def blocks(s, kind):
    pat = r'\n    <a class="card [^"]*"[^>]*>.*?\n    </a>' if kind == "card" else r'\n    <article class="pdf [^"]*"[^>]*>.*?\n    </article>'
    return list(re.finditer(pat, s, re.S))


def liste(s):
    for kind in ("card", "pdf"):
        print("APPLIS" if kind == "card" else "FICHES")
        for m in blocks(s, kind):
            b = m.group(0)
            name = re.search(r'href="([^"]+)"', b).group(1)
            c = re.search(r'data-created="([^"]+)"', b).group(1)
            u = re.search(r'data-updated="([^"]+)"', b)
            print(f"  {name:42} créée {c}  maj {u.group(1) if u else c}")


def maj(s, cible, date):
    hits = [m for k in ("card", "pdf") for m in blocks(s, k) if f'href="{cible}/"' in m.group(0) or f'href="{cible}"' in m.group(0) or f'fiches/{cible}"' in m.group(0)]
    if not hits:
        sys.exit(f"Rien trouvé pour {cible} (voir : accueil.py liste)")
    for m in reversed(hits):
        b = m.group(0)
        nb = re.sub(r'data-updated="[^"]*"', f'data-updated="{date}"', b) if "data-updated" in b else b.replace("data-created=", f'data-updated="{date}" data-created=', 1)
        s = s[:m.start()] + nb + s[m.end():]
    return s


def compter_jeux(s):
    """« Tous les jeux (n) » : n = nombre d'options du menu id="jeu" (hors « all »)."""
    i = s.index('id="jeu"'); j = s.index("</select>", i)
    n = len(re.findall(r'<option value="(?!all")', s[i:j]))
    return s[:i] + re.sub(r'<option value="all"[^>]*>[^<]*</option>',
        f'<option value="all" data-fr="Tous les jeux ({n})" data-en="All games ({n})">Tous les jeux ({n})</option>', s[i:j], count=1) + s[j:]


def new_game(s, jeu, g):
    if f'<option value="{jeu}">' in s:
        return s
    s = s.replace("\n.pr{--accent", f"\n.{jeu}{{--accent:{g['accent']};--c1:{g['c1']};--c2:{g['c2']}}}\n.pr{{--accent", 1)
    i = s.index('</option>\n      </select>', s.index('id="jeu"'))  # menu « Tous les jeux » de l'accueil
    s = s[:i + 9] + f'\n        <option value="{jeu}">{g["chip"]}</option>' + s[i + 9:]
    s = s.replace('var NAMES={', f'var NAMES={{{jeu}:"{g["recherche"]}",', 1)
    s = compter_jeux(s)
    o = '<option value="Site" data-fr='
    s = s.replace(o, f'<option value="{g["chip"]}">{g["chip"]}</option>\n            ' + o, 1)
    return s


def appli(s, j):
    old = next((m for m in blocks(s, "card") if f'href="{j["dossier"]}/"' in m.group(0)), None)
    created = re.search(r'data-created="([^"]+)"', old.group(0)).group(1) if old else j.get("cree", TODAY)
    if "nouveau_jeu" in j:
        s = new_game(s, j["jeu"], j["nouveau_jeu"])
    tags = "".join(multi(t, "li") if not isinstance(t, str) else f"<li>{t}</li>" for t in j.get("tags", []))
    tags += f'<li>{j.get("langues", "FR · EN")}</li>'
    tx = j["texte"]; remember(tx)
    card = f'''
    <a class="card {j["jeu"]}" data-game="{j["jeu"]}" data-created="{created}" data-updated="{TODAY}" href="{j["dossier"]}/">
      <div class="banner"><h3>{multi(j["nom"], "span")}</h3></div>
      <div class="body">
        <p class="fr">{tx["fr"]}</p>
        <p class="en">{tx["en"]}</p>
        <ul class="tags">{tags}</ul>
        <div class="foot"><span class="go"><span class="fr">Ouvrir</span><span class="en" data-k="open-{j["jeu"]}">Open</span></span><span class="date"></span></div>
      </div>
    </a>'''
    if old:
        return s[:old.start()] + card + s[old.end():]
    i = s.index('<div class="grid" data-sort>') + len('<div class="grid" data-sort>')
    return s[:i] + card + s[i:]


def fiche(s, j):
    old = next((m for m in blocks(s, "pdf") if f'fiches/{j["pdf_fr"]}"' in m.group(0)), None)
    created = re.search(r'data-created="([^"]+)"', old.group(0)).group(1) if old else j.get("cree", TODAY)
    for k in ("titre", "texte", "meta"):
        remember(j[k])
    t, x, m = j["titre"], j["texte"], j["meta"]
    if j.get("pdf_en"):
        dl = (f'<a class="dl fr" href="fiches/{j["pdf_fr"]}" download>⬇ PDF</a>'
              f'<a class="dl en" href="fiches/{j["pdf_en"]}" download>⬇ <span class="en" data-k="dl">PDF</span></a>')
    else:
        dl = f'<a class="dl" href="fiches/{j["pdf_fr"]}" download>⬇ PDF</a>'
    art = f'''
    <article class="pdf {j["jeu"]}" data-game="{j["jeu"]}" data-created="{created}" data-updated="{TODAY}">
      <div>
        <h3><span class="fr">{t["fr"]}</span><span class="en">{t["en"]}</span></h3>
        <p class="fr">{x["fr"]}</p>
        <p class="en">{x["en"]}</p>
        <p class="meta"><span class="fr">{m["fr"]}</span><span class="en">{m["en"]}</span> · <span class="date"></span></p>
      </div>
      {dl}
    </article>'''
    for f in (j["pdf_fr"], j.get("pdf_en")):
        if f and not os.path.exists(os.path.join("fiches", f)):
            print(f"attention : fiches/{f} n'existe pas encore")
    if old:
        return s[:old.start()] + art + s[old.end():]
    i = s.index('<div class="pdfs" data-sort>') + len('<div class="pdfs" data-sort>')
    return s[:i] + art + s[i:]


if __name__ == "__main__":
    if not os.path.exists(P):
        sys.exit("À lancer depuis la racine du dépôt.")
    a = sys.argv[1:] or ["liste"]
    s = load()
    if a[0] == "liste":
        liste(s)
    elif a[0] == "maj":
        save(maj(s, a[1], a[2] if len(a) > 2 else TODAY))
    elif a[0] in ("appli", "fiche"):
        j = json.load(open(a[1], encoding="utf-8"))
        save((appli if a[0] == "appli" else fiche)(s, j))
    else:
        sys.exit(__doc__)
