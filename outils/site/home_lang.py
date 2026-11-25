#!/usr/bin/env python3
"""Langues de la page d'accueil (index.html), à partir des fichiers accueil/<code>.json.

usage : python3 outils/site/home_lang.py [index.html]      (depuis la racine du dépôt)
        python3 outils/site/home_lang.py --todo <code>     liste les textes anglais encore sans traduction

Ajouter une langue (ex. italien) :
  1. copier accueil/de.json en accueil/it.json ;
  2. traduire les valeurs (les clés sont les textes anglais de la page) et les blocs _words, _form, _soon, _k ;
  3. relancer ce script. Les textes manquants restent en anglais et sont signalés.

Ce que le script génère (et regénère sans doublon à chaque lancement) :
  - après chaque élément class="en" : un élément class="<code>" par langue traduite ;
  - les attributs data-<code> (options du formulaire) et data-ph-<code> (champ de message) ;
  - les boutons de langue, les règles CSS d'affichage, le bandeau _soon,
    les textes de l'interface (WORDS) et du formulaire (T) dans le JavaScript.
Champs de chaque fichier :
  _name    libellé du bouton (DE)          _locale  format des dates (de-DE)
  _base    true pour fr et en : langues écrites à la main dans la page, rien n'est généré
  _apps    langue des applis et fiches ouvertes depuis cette langue, appli par appli :
           {"*": "en", "ae": "de"} = Aeon's End (data-game="ae") en allemand, les autres applis et les fiches en anglais.
           (Une simple chaîne, ex. "en", vaut pour toutes les applis.) Sur les cartes des applis qui s'ouvrent en anglais,
           le bouton prend le texte _k.open_en (« Öffnen (EN) ») au lieu de _k.open. L'appli elle-même choisit sa page
           (lang.py) : son dossier doit contenir <code>.html pour que les visiteurs y arrivent.
  _words   textes de l'interface           _form    messages du formulaire
  _soon    bandeau sous le titre (facultatif)
  _k       textes repérés par data-k="..." (ex. dl : bouton Télécharger d'une fiche en anglais)
"""
import json, os, re, sys, html
H = os.path.dirname(os.path.abspath(__file__))
D = os.path.join(H, "accueil")
ORDER = ["fr", "en"]
LANGS = {}
for f in sorted(os.listdir(D)):
    if f.endswith(".json") and not f.endswith(".todo.json"):
        LANGS[f[:-5]] = json.load(open(os.path.join(D, f), encoding="utf-8"))
codes = ORDER + [c for c in LANGS if c not in ORDER]


def app_lang(c, game="*"):
    """langue dans laquelle les visiteurs de la langue c ouvrent l'appli game"""
    a = LANGS[c].get("_apps", c)
    if isinstance(a, str):
        return a
    return a.get(game, a.get("*", c))
extra = [c for c in codes if not LANGS[c].get("_base")]

if len(sys.argv) > 2 and sys.argv[1] == "--todo":
    c = sys.argv[2]; s = open("index.html", encoding="utf-8").read()
    have = LANGS.get(c, {})
    for t in sorted(set(re.findall(r'<(?:span|p|li) class="en"(?: data-k="[^"]*")?>(.*?)</(?:span|p|li)>', s, re.S)) | set(re.findall(r'data-(?:ph-)?en="([^"]*)"', s))):
        if t not in have: print(json.dumps(t, ensure_ascii=False))
    sys.exit()

P = sys.argv[1] if len(sys.argv) > 1 else "index.html"
s = open(P, encoding="utf-8").read()
alt = "|".join(extra) or "zz"
# 1. retirer ce qu'un lancement précédent a généré
s = re.sub(r'<(span|p|li) class="(?:%s)" data-gen>.*?</\1>' % alt, "", s, flags=re.S)
s = re.sub(r' data-(?:ph-)?(?:%s)="[^"]*"' % alt, "", s)
def block(s, a, b, new):
    i = s.index(a) + len(a); j = s.index(b, i); return s[:i] + new + s[j:]

# 2. éléments traduits
# bouton « Ouvrir » de chaque carte d'appli : marqué data-k="open-<jeu>" pour choisir open / open_en selon _apps
def mark_open(m):
    g = m.group(1)
    return re.sub(r'<span class="en"(?: data-k="open[^"]*")?>Open</span>', f'<span class="en" data-k="open-{g}">Open</span>', m.group(0))
s = re.sub(r'<a class="card [^"]*" data-game="([^"]+)".*?</a>', mark_open, s, flags=re.S)
missing = {c: set() for c in extra}
def sub(m):
    tag, k, txt = m.group(1), m.group(2), m.group(3)
    out = m.group(0)
    for c in extra:
        L = LANGS[c]
        if k and k.startswith("open-"):
            K = L.get("_k", {})
            tr = K.get("open") if app_lang(c, k[5:]) == c else K.get("open_en", K.get("open"))
        elif k: tr = L.get("_k", {}).get(k)
        else: tr = L.get(txt)
        if tr is None: missing[c].add(txt); tr = txt
        out += f'<{tag} class="{c}" data-gen>{tr}</{tag}>'
    return out
s = re.sub(r'<(span|p|li) class="en"(?: data-k="([^"]*)")?>(.*?)</\1>', sub, s, flags=re.S)
def attr(m):
    pre, txt = m.group(1) or "", m.group(2); out = m.group(0)
    for c in extra:
        tr = LANGS[c].get(html.unescape(txt))
        if tr is None: missing[c].add(txt); tr = html.unescape(txt)
        out += f' data-{pre}{c}="{html.escape(tr, quote=True)}"'
    return out
s = re.sub(r'data-(ph-)?en="([^"]*)"', attr, s)

# 3. boutons, CSS, bandeau, JS
s = block(s, "<!--langs-->", "<!--/langs-->", "".join(
    f'\n        <a href="{"/" if c == "fr" else "/" + c + "/"}" data-set="{c}" hreflang="{c}" lang="{c}"{' aria-current="page"' if c == "fr" else ""}>{LANGS[c]["_name"]}</a>' for c in codes) + "\n        ")
css = []
for c in codes:
    others = [o for o in codes if o != c]
    sel = []
    for o in others:
        if o == "en" and app_lang(c) == "en": sel.append(f'[data-lang="{c}"] .en:not(.dl)')
        else: sel.append(f'[data-lang="{c}"] .{o}')
    css.append(",".join(sel) + "{display:none}")
css.append(".soon{margin:14px 0 0;max-width:640px;font-size:.92rem;color:var(--muted);border:1px dashed var(--line);border-radius:12px;padding:10px 14px}")
s = block(s, "/*langs*/", "/*/langs*/", "\n" + "\n".join(css) + "\n")
s = block(s, "<!--soon-->", "<!--/soon-->", "".join(f'<p class="soon {c}">{LANGS[c]["_soon"]}</p>' for c in extra if LANGS[c].get("_soon")))
s = block(s, "/*WORDS*/", "/*/WORDS*/", json.dumps({c: dict(LANGS[c]["_words"], locale=LANGS[c]["_locale"]) for c in codes}, ensure_ascii=False, separators=(",", ":")))
s = block(s, "/*FORM*/", "/*/FORM*/", json.dumps({c: LANGS[c]["_form"] for c in codes}, ensure_ascii=False, separators=(",", ":")))
s = s.replace('aria-label="Langue / Language"', 'aria-label="Language"')
open(P, "w", encoding="utf-8").write(s)
for c in extra:
    if missing[c]:
        print(f"{c} : {len(missing[c])} texte(s) sans traduction (laissés en anglais) :")
        for t in sorted(missing[c]): print("   ", json.dumps(t, ensure_ascii=False))
print("ok", P, "langues :", " ".join(codes))
# pages /en/ et /de/ : tirées de index.html, à refaire à chaque changement de l'accueil
if P == "index.html":
    sys.path.insert(0, H)
    import seo
    seo.accueil()
