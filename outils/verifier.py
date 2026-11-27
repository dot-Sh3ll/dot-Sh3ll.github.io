#!/usr/bin/env python3
"""Vérification du site avant publication. Sans dépendance (Python 3.9+) ; html-validate est utilisé s'il est installé.

usage : python3 outils/verifier.py            (depuis la racine du dépôt)
        python3 outils/verifier.py --rapide   sans validation HTML ni scans de vouvoiement

Contrôles :
  pages       chaque page publiée : lang, title (≤ 65 car.), description (≤ 165), canonical, hreflang + x-default,
              Open Graph, JSON-LD valide, un seul <html>, feuilles communes, pas de Google Fonts
  liens       liens et images internes (href, src, srcset) qui mènent à un fichier absent
  sitemap     chaque adresse du sitemap existe ; chaque page d'appli y figure
  langues     pages déclarées dans jeux.json, option du formulaire « Votre avis »
  poids       images > 300 Ko, PDF > 3 Mo, pages HTML > 400 Ko
  cache       fichiers de PRECACHE (sw.js) présents
  vouvoiement tutoiement restant (vouvoiement.py)
  html        html-validate (erreurs seulement), si disponible
Sortie : liste lisible, ERREUR (code de sortie 1) ou attention (n'empêche pas la publication).
"""
import glob, html, json, os, re, shutil, subprocess, sys

RACINE = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), ".."))
os.chdir(RACINE)
sys.path.insert(0, os.path.join(RACINE, "outils", "site"))
SITE = "https://lessrulesmoreplay.com"
RAPIDE = "--rapide" in sys.argv
erreurs, alertes = [], []


def err(cat, msg):
    erreurs.append((cat, msg))


def att(cat, msg):
    alertes.append((cat, msg))


def pages():
    """pages publiées (hors outils/, hors fichier de vérification Google)"""
    l = ["index.html", "404.html"] + sorted(glob.glob("*/index.html") + glob.glob("*/[a-z][a-z].html"))
    return [p for p in l if not p.startswith(("outils/", "node_modules/")) and os.path.exists(p)
            and 'http-equiv="refresh"' not in lire(p)]  # anciennes adresses qui redirigent (seo.py, REDIRIGE)


def lire(p):
    return open(p, encoding="utf-8").read()


# ---------------------------------------------------------------- pages
def ctrl_pages():
    for p in pages():
        s = lire(p)
        if p == "404.html":
            if 'name="robots" content="noindex"' not in s:
                att("pages", "404.html : pas de noindex")
            continue
        g = lambda r: re.findall(r, s, re.S)
        if not g(r'<html lang="[a-z]{2}"'):
            err("pages", f"{p} : attribut lang absent")
        t = re.findall(r"<title>(.*?)</title>", s.split("</head>")[0], re.S)
        if len(t) != 1:
            err("pages", f"{p} : {len(t)} balise(s) <title>")
        elif len(html.unescape(t[0])) > 65:
            att("pages", f"{p} : titre long ({len(html.unescape(t[0]))} car.) : {html.unescape(t[0])}")
        d = g(r'<meta name="description" content="([^"]*)"')
        if not d:
            err("pages", f"{p} : meta description absente")
        elif len(html.unescape(d[0])) > 165:
            att("pages", f"{p} : description longue ({len(html.unescape(d[0]))} car.)")
        if not g(r'<link rel="canonical" href="https://lessrulesmoreplay\.com/[^"]*">'):
            err("pages", f"{p} : canonical absent")
        if 'hreflang="x-default"' not in s:
            err("pages", f"{p} : hreflang x-default absent")
        for prop in ("og:title", "og:description", "og:image", "og:url"):
            if f'property="{prop}"' not in s:
                err("pages", f"{p} : {prop} absent")
        for ld in g(r'<script type="application/ld\+json">(.*?)</script>'):
            try:
                json.loads(ld)
            except ValueError as e:
                err("pages", f"{p} : JSON-LD invalide ({e})")
        if not g(r'<script type="application/ld\+json">'):
            err("pages", f"{p} : données structurées absentes")
        if "fonts.googleapis.com" in s:
            err("pages", f"{p} : Google Fonts encore utilisé (lancer outils/site/polices.py)")
        if "/" in p and not p.startswith(("en/", "de/")) and "<!--commun-->" not in s:
            err("pages", f"{p} : feuilles communes absentes (lancer outils/site/chrome.py sur le dossier)")
        if 'data-goatcounter="https://shell.goatcounter.com/count"' not in s:
            err("pages", f"{p} : GoatCounter absent (outils/site/pwa.py)")
        if "serviceWorker" not in s or 'rel="manifest"' not in s:
            err("pages", f"{p} : bloc PWA absent (outils/site/pwa.py)")
        if "/" in p and not p.startswith(("en/", "de/")) and 'class="lrmp-pied"' not in s:
            err("pages", f"{p} : pied de page absent (outils/site/pied.py)")


# ---------------------------------------------------------------- liens
def ctrl_liens():
    vus = set()
    for p in pages():
        s = lire(p)
        base = os.path.dirname(p)
        refs = re.findall(r'(?:href|src|srcset)="([^"]+)"', s)
        refs += re.findall(r'"(\.\./fiches/[^"]+\.pdf)"', s)
        for u in refs:
            u = u.split("#")[0].split("?")[0]
            if not u or u.startswith(("http:", "https:", "mailto:", "data:", "javascript:", "//")) or "${" in u or "'" in u or "+" in u:
                continue
            cible = u.lstrip("/") if u.startswith("/") else os.path.normpath(os.path.join(base, u))
            if cible in ("", "."):
                continue
            if not (os.path.isfile(cible) or os.path.isfile(os.path.join(cible, "index.html"))):
                if (p, u) not in vus:
                    vus.add((p, u))
                    err("liens", f"{p} : lien cassé « {u} »")


# ---------------------------------------------------------------- sitemap
def ctrl_sitemap():
    s = lire("sitemap.xml")
    locs = re.findall(r"<loc>([^<]+)</loc>", s)
    for u in locs:
        chemin = u.replace(SITE + "/", "").split("?")[0]
        if not (chemin == "" or os.path.isfile(chemin) or os.path.isfile(os.path.join(chemin, "index.html"))):
            err("sitemap", f"adresse sans fichier : {u}")
    for p in pages():
        if p == "404.html":
            continue
        u = SITE + "/" + (p[:-10] if p.endswith("index.html") else p)
        if u not in locs:
            err("sitemap", f"{p} absent du sitemap (lancer outils/site/seo.py)")
    if "Sitemap: https://lessrulesmoreplay.com/sitemap.xml" not in lire("robots.txt"):
        err("sitemap", "robots.txt ne déclare pas le sitemap")
    if not os.path.exists("googleaae1513be976b5cd.html"):
        err("sitemap", "fichier de vérification Google Search Console supprimé")


# ---------------------------------------------------------------- langues
def ctrl_langues():
    from langs import ORDER, available
    jeux = {k: v for k, v in json.load(open("outils/site/jeux.json", encoding="utf-8")).items() if not k.startswith("_") and k != "accueil"}
    for d, j in jeux.items():
        if not os.path.isdir(d):
            err("langues", f"{d} : dossier absent (déclaré dans jeux.json)")
            continue
        for c in available(d):
            if c not in j["seo"]:
                err("langues", f"{d} : page {c} sans titre ni description dans jeux.json")
        if f'<option value="{j["formulaire"]}"' not in lire("index.html"):
            err("langues", f"{d} : « {j['formulaire']} » absent du formulaire « Votre avis »")
    sys.path.insert(0, "outils/site")
    from seo import ACCUEIL_LANGS
    for c in [x for x in ACCUEIL_LANGS if x not in ("fr", "en")]:
        r = subprocess.run([sys.executable, "outils/site/home_lang.py", "--todo", c], capture_output=True, text=True)
        n = len([l for l in r.stdout.splitlines() if l.strip()])
        if n:
            att("langues", f"accueil : {n} texte(s) sans traduction en {c} (home_lang.py --todo {c})")


# ---------------------------------------------------------------- poids
def ctrl_poids():
    for f in glob.glob("img/**/*.*", recursive=True) + glob.glob("icons/*.*"):
        if os.path.getsize(f) > 300_000:
            att("poids", f"{f} : {os.path.getsize(f) // 1024} Ko (> 300 Ko)")
    for f in glob.glob("fiches/*.pdf"):
        if os.path.getsize(f) > 3_000_000:
            att("poids", f"{f} : {os.path.getsize(f) // 1024 // 1024} Mo (> 3 Mo)")
    for p in pages():
        if os.path.getsize(p) > 400_000:
            att("poids", f"{p} : {os.path.getsize(p) // 1024} Ko (> 400 Ko)")


# ---------------------------------------------------------------- cache
def ctrl_cache():
    s = lire("sw.js")
    m = re.search(r"const PRECACHE = \[(.*?)\];", s, re.S)
    for u in json.loads("[" + m.group(1) + "]"):
        f = "index.html" if u == "./" else (u + "index.html" if u.endswith("/") else u)
        if not os.path.isfile(f):
            err("cache", f"sw.js : PRECACHE contient « {u} », fichier absent")


# ---------------------------------------------------------------- vouvoiement
def ctrl_vouvoiement():
    fr = [p for p in pages() if p.endswith("index.html") and not p.startswith(("en/", "de/"))]
    r = subprocess.run([sys.executable, "outils/site/vouvoiement.py", "scan"] + fr, capture_output=True, text=True)
    lignes = [l for l in r.stdout.splitlines() if re.search(r"\btu\b|\bton\b|\btes\b|\btoi\b", l, re.I)]
    for l in lignes[:20]:
        att("vouvoiement", "français : " + l.strip()[:160])


# ---------------------------------------------------------------- html-validate
def ctrl_html():
    hv = shutil.which("html-validate") or (os.path.exists("node_modules/.bin/html-validate") and "node_modules/.bin/html-validate")
    if not hv:
        att("html", "html-validate non installé : validation HTML sautée (npm install -g html-validate)")
        return
    conf = os.path.join(RACINE, "outils", "html-validate.json")
    import tempfile
    sortie = os.path.join(tempfile.mkdtemp(), "html.json")  # fichier : node coupe la sortie au-delà de 64 Ko dans un tube
    subprocess.run([hv, "-c", conf, "-f", f"json={sortie}"] + pages(), capture_output=True, text=True)
    try:
        for f in json.load(open(sortie, encoding="utf-8")) if os.path.exists(sortie) else []:
            for m in f["messages"]:
                if m["severity"] == 2:
                    err("html", f"{f['filePath'].replace(RACINE + '/', '')}:{m['line']} {m['ruleId']} : {m['message']}")
    except ValueError:
        att("html", "sortie de html-validate illisible")


def ctrl_stockage():
    sys.path.insert(0, os.path.join(RACINE, "outils", "site"))
    import stockage
    stockage.controler(err, att)


def main():
    etapes = [ctrl_pages, ctrl_liens, ctrl_sitemap, ctrl_langues, ctrl_poids, ctrl_cache, ctrl_stockage]
    if not RAPIDE:
        etapes += [ctrl_vouvoiement, ctrl_html]
    for f in etapes:
        f()
    for titre, l in (("ERREURS", erreurs), ("À surveiller", alertes)):
        if l:
            print(f"\n{titre} ({len(l)})")
            for cat in sorted({c for c, _ in l}):
                print(f"  [{cat}]")
                for c, m in l:
                    if c == cat:
                        print("   -", m)
    print(f"\n{len(pages())} pages vérifiées : {len(erreurs)} erreur(s), {len(alertes)} point(s) à surveiller.")
    sys.exit(1 if erreurs else 0)


if __name__ == "__main__":
    main()
