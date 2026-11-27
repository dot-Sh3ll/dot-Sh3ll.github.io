#!/usr/bin/env python3
"""Référencement du site, en un seul endroit.

usage : python3 outils/site/seo.py          (depuis la racine du dépôt)

Pour chaque page (accueil, et chaque page de langue des applis) :
  - <title> et meta description propres à la page et à sa langue ;
  - canonical, hreflang (toutes les langues de l'appli + x-default), robots ;
  - Open Graph et Twitter (image img/og/<appli>.jpg, faite par og_images.py) ;
  - données structurées JSON-LD (site, auteur, appli web gratuite, fil d'Ariane).
Le tout est posé entre <!--seo--> et <!--/seo-->, juste après <title> : relancer ne duplique rien.
Puis :
  - sitemap.xml refait (pages, variantes de langue de l'accueil, PDF des fiches, dates tirées de git) ;
  - métadonnées des PDF de fiches/ (titre, auteur, sujet, mots-clés), tirées des cartes de l'accueil.

À relancer après : un nouveau jeu ou une nouvelle langue (compléter outils/site/jeux.json), gen_lang.py (la page allemande
d'Aeon's End est copiée de la page anglaise, balises comprises), une nouvelle fiche (accueil.py fiche).
"""
import datetime, html, json, os, re, subprocess, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from langs import available, page_file

SITE = "https://lessrulesmoreplay.com"
MARQUE = "Less Rules, More Play"
AUTEUR = {"@type": "Person", "name": "Paul Moussard", "url": SITE + "/",
          "sameAs": ["https://ko-fi.com/paulmoussard", "https://github.com/dot-Sh3ll"]}
LOCALE = {"fr": "fr_FR", "en": "en_GB"}
# Site en français et en anglais seulement (allemand et espagnol abandonnés : décisions de Paul, 25-27/11/2026).
# /de/ reste en ligne pour les anciens liens, mais renvoie vers /en/ (REDIRIGE).
ACCUEIL_LANGS = ["fr", "en"]
REDIRIGE = {"de": "en"}
STUB = """<!DOCTYPE html>
<!-- Page générée par outils/site/seo.py (REDIRIGE) : ancienne adresse, renvoie vers /{to}/. -->
<html lang="{c}">
<head>
<meta charset="utf-8">
<title>Less Rules, More Play</title>
<meta name="robots" content="noindex">
<link rel="canonical" href="https://lessrulesmoreplay.com/{to}/">
<meta http-equiv="refresh" content="0; url=/{to}/">
<script>location.replace("/{to}/"+location.search+location.hash)</script>
</head>
<body><p><a href="/{to}/">Less Rules, More Play</a></p></body>
</html>
"""

ACCUEIL = {
    "fr": ("Aides de jeu de société gratuites | Less Rules, More Play",
           "Tutoriels interactifs, compagnons solo et fiches à imprimer gratuits pour Mage Knight, Imperium, Aeon's End, Puerto Rico 1897 et Nemesis: Retaliation."),
    "en": ("Free game aids for heavy board games | Less Rules, More Play",
           "Free interactive rules tutorials, solo companions and printable aids for Mage Knight, Imperium, Aeon's End, Puerto Rico 1897 and Nemesis: Retaliation."),
}

# applis : outils/site/jeux.json (dossier -> nom du jeu par langue, titre et description par langue de page)
JEUX = {k: v for k, v in json.load(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "jeux.json"), encoding="utf-8")).items()
        if not k.startswith("_") and k != "accueil"}
PAGES = {d: {"jeu": j["jeu"], **{c: tuple(t) for c, t in j["seo"].items()}} for d, j in JEUX.items()}
FIL = {"fr": "Aides de jeu", "en": "Game aids"}


def url_page(dossier, code):
    return f"{SITE}/{dossier}/" if code == "fr" else f"{SITE}/{dossier}/{code}.html"


def url_accueil(code):
    return SITE + "/" if code == "fr" else f"{SITE}/{code}/"


def e(t):
    return html.escape(t, quote=True)


def bloc(code, titre, desc, url, alternates, image, image_alt, ld, extra=""):
    l = [f'<meta name="description" content="{e(desc)}">',
         f'<link rel="canonical" href="{url}">',
         '<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1">']
    l += [f'<link rel="alternate" hreflang="{h}" href="{u}">' for h, u in alternates]
    l += ['<meta property="og:type" content="website">',
          f'<meta property="og:site_name" content="{MARQUE}">',
          f'<meta property="og:title" content="{e(titre)}">',
          f'<meta property="og:description" content="{e(desc)}">',
          f'<meta property="og:url" content="{url}">',
          f'<meta property="og:image" content="{SITE}/{image}">',
          '<meta property="og:image:width" content="1200">', '<meta property="og:image:height" content="630">',
          f'<meta property="og:image:alt" content="{e(image_alt)}">',
          f'<meta property="og:locale" content="{LOCALE[code]}">']
    l += [f'<meta property="og:locale:alternate" content="{LOCALE[h]}">' for h, _ in alternates if h in LOCALE and h != code]
    l += ['<meta name="twitter:card" content="summary_large_image">',
          f'<meta name="twitter:title" content="{e(titre)}">',
          f'<meta name="twitter:description" content="{e(desc)}">',
          f'<meta name="twitter:image" content="{SITE}/{image}">',
          '<script type="application/ld+json">' + json.dumps(ld, ensure_ascii=False, separators=(",", ":")).replace("</", "<\\/") + '</script>']
    return "<!--seo-->\n" + "\n".join(l) + extra + "\n<!--/seo-->"


def poser(path, code, titre, b):
    s = open(path, encoding="utf-8").read()
    s = re.sub(r"\n?<!--seo-->.*?<!--/seo-->", "", s, flags=re.S)
    tete, corps = s.split("</head>", 1)
    # anciennes balises posées à la main
    tete = re.sub(r'\n?<meta (?:name="description"|property="og:[^"]*"|name="twitter:[^"]*")[^>]*>', "", tete)
    tete = re.sub(r'\n?<link rel="(?:canonical|alternate)" hreflang[^>]*>|\n?<link rel="canonical"[^>]*>', "", tete)
    tete = re.sub(r"<title>.*?</title>", lambda m: f"<title>{e(titre)}</title>\n" + b, tete, count=1, flags=re.S)
    open(path, "w", encoding="utf-8").write(tete + "</head>" + corps)


# Redirection de l'accueil français (posée seulement sur index.html) : ?lang=xx, la langue choisie (site-lang),
# puis la langue du navigateur (jamais pour les robots) mènent à /en/ ou /de/ ; une langue sans page mène à /en/.
REDIR = ('<script id="home-lang-js">(function(){try{var H=%s,s=location.search,q=/[?&]lang=([a-z]{2})/.exec(s),t=null,sl=null;'
         'try{sl=localStorage.getItem("site-lang")}catch(e){}'
         'if(q)t=q[1];else if(sl)t=sl;else if(!/bot|crawl|spider|slurp|lighthouse|headless/i.test(navigator.userAgent))t=(navigator.language||"").slice(0,2).toLowerCase();'
         'if(!t||t==="fr")return;if(!H[t])t="en";'
         'location.replace(H[t]+s.replace(/([?&])lang=[a-z]{2}&?/,"$1").replace(/[?&]$/,"")+location.hash)}catch(e){}})();</script>')


def applis_liste():
    return [{"@type": "ListItem", "position": i + 1, "url": url_page(d, "fr"), "name": c["jeu"]["fr"]}
            for i, (d, c) in enumerate(PAGES.items())]


def accueil(applis_ld=None):
    """Balises de l'accueil français, puis pages /en/ et /de/ tirées de index.html. Renvoie les alternates."""
    applis_ld = applis_ld or applis_liste()
    alts = [(c, url_accueil(c)) for c in ACCUEIL_LANGS] + [("x-default", url_accueil("en"))]
    site = {"@type": "WebSite", "@id": SITE + "/#site", "name": MARQUE, "alternateName": "lessrulesmoreplay.com", "url": SITE + "/",
            "description": ACCUEIL["fr"][1], "inLanguage": ACCUEIL_LANGS, "publisher": AUTEUR, "author": AUTEUR}
    auteur = AUTEUR | {"@id": SITE + "/#auteur", "jobTitle": "Président d'une association de jeux de société",
                       "homeLocation": {"@type": "Place", "name": "Strasbourg, France"}}
    redir = "\n" + REDIR % json.dumps({c: "/" if c == "fr" else f"/{c}/" for c in ACCUEIL_LANGS}, separators=(",", ":"))
    src = None
    for c in ACCUEIL_LANGS:
        titre, desc = ACCUEIL[c]
        url = url_accueil(c)
        ld = {"@context": "https://schema.org", "@graph": [
            site,
            {"@type": "CollectionPage", "@id": url + "#page", "url": url, "name": titre, "description": desc,
             "isPartOf": {"@id": SITE + "/#site"}, "inLanguage": c, "image": SITE + "/img/og/accueil.jpg",
             "mainEntity": {"@type": "ItemList", "itemListElement": applis_ld}},
            auteur]}
        b = bloc(c, titre, desc, url, alts, "img/og/accueil.jpg", MARQUE, ld, redir if c == "fr" else "")
        if c == "fr":
            s = open("index.html", encoding="utf-8").read()
            s = re.sub(r'\n?<script>window\.SEO=.*?</script>', "", s, flags=re.S)
            open("index.html", "w", encoding="utf-8").write(s)
            poser("index.html", "fr", titre, b)
            src = open("index.html", encoding="utf-8").read()
            print("ok index.html")
            continue
        s = src.replace(b'<html lang="fr"'.decode(), f'<html lang="{c}"', 1).replace('<body data-lang="fr">', f'<body data-lang="{c}">', 1)
        s = re.sub(r"<title>.*?</title>\n?<!--seo-->.*?<!--/seo-->", lambda m: f"<title>{e(titre)}</title>\n" + b, s, count=1, flags=re.S)
        # liens relatifs : la page est un dossier plus bas
        s = re.sub(r'((?:href|src|srcset)=")(?!https?:|/|#|data:|mailto:|\./")([^"]+")', r"\1../\2", s)
        s = s.replace('register("sw.js")', 'register("../sw.js")')
        s = s.replace(' aria-current="page">FR</a>', '>FR</a>').replace(f'hreflang="{c}" lang="{c}">', f'hreflang="{c}" lang="{c}" aria-current="page">', 1)
        os.makedirs(c, exist_ok=True)
        s = s.replace("<!DOCTYPE html>\n", "<!DOCTYPE html>\n<!-- Page générée par outils/site/seo.py depuis /index.html : ne pas modifier à la main. -->\n", 1)
        open(os.path.join(c, "index.html"), "w", encoding="utf-8").write(s)
        print("ok", c + "/index.html")
    for c, to in REDIRIGE.items():
        os.makedirs(c, exist_ok=True)
        open(os.path.join(c, "index.html"), "w", encoding="utf-8").write(STUB.format(c=c, to=to))
        print("ok", c + "/index.html (redirection vers /" + to + "/)")
    return alts


def git_date(path):
    try:
        if subprocess.run(["git", "status", "--porcelain", "--", path], capture_output=True, text=True).stdout.strip():
            return datetime.date.today().isoformat()
        d = subprocess.run(["git", "log", "-1", "--format=%cs", "--", path], capture_output=True, text=True).stdout.strip()
        return d or datetime.date.today().isoformat()
    except Exception:
        return datetime.date.today().isoformat()


def main():
    plan = []  # (fichier, [(hreflang, url)], url) pour le sitemap

    # ---- applis
    applis_ld = []
    for dossier, cfg in PAGES.items():
        langs = available(dossier)
        manque = [c for c in langs if c not in cfg]
        if manque:
            sys.exit(f"seo.py : {dossier} a une page {manque} sans titre ni description dans PAGES")
        alts = [(c, url_page(dossier, c)) for c in langs] + [("x-default", url_page(dossier, "en" if "en" in langs else "fr"))]
        for c in langs:
            titre, desc = cfg[c]
            jeu = cfg["jeu"].get(c, cfg["jeu"]["en"])
            url = url_page(dossier, c)
            ld = {"@context": "https://schema.org", "@graph": [
                {"@type": "WebApplication", "@id": url + "#appli", "name": titre,
                 "url": url, "description": desc, "inLanguage": c, "applicationCategory": "GameApplication",
                 "operatingSystem": "Web", "browserRequirements": "Requires JavaScript", "isAccessibleForFree": True,
                 "offers": {"@type": "Offer", "price": "0", "priceCurrency": "EUR"},
                 "image": f"{SITE}/img/og/{dossier}.jpg", "author": AUTEUR, "publisher": AUTEUR,
                 "about": {"@type": "Game", "name": jeu},
                 "isPartOf": {"@type": "WebSite", "name": MARQUE, "url": SITE + "/"}},
                {"@type": "BreadcrumbList", "itemListElement": [
                    {"@type": "ListItem", "position": 1, "name": f"{MARQUE} · {FIL.get(c, FIL['en'])}", "item": url_accueil(c if c in ACCUEIL_LANGS else "en")},
                    {"@type": "ListItem", "position": 2, "name": jeu, "item": url}]}]}
            path = os.path.join(dossier, page_file(c))
            poser(path, c, titre, bloc(c, titre, desc, url, alts, f"img/og/{dossier}.jpg", f"{jeu} · {MARQUE}", ld))
            print("ok", path)
        plan.append((os.path.join(dossier, page_file("fr")), alts[:-1], None))
        applis_ld.append({"@type": "ListItem", "position": len(applis_ld) + 1, "url": url_page(dossier, "fr"), "name": cfg["jeu"]["fr"]})

    # ---- accueil : index.html (français) est la page source ; en/ et de/ en sont tirées (accueil_pages)
    alts = accueil(applis_ld)
    plan.insert(0, ("index.html", alts[:-1], None))

    # ---- PDF : métadonnées d'après les cartes de l'accueil
    s = open("index.html", encoding="utf-8").read()
    pdfs = []
    for art in re.findall(r'<article class="pdf[^"]*".*?</article>', s, re.S):
        un = lambda x: html.unescape(re.sub(r"<[^>]+>", "", x)).strip()
        h3 = re.search(r"<h3>(.*?)</h3>", art, re.S).group(1)
        titres = dict(re.findall(r'<span class="(fr|en)">(.*?)</span>', h3, re.S))
        textes = dict(re.findall(r'<p class="(fr|en)">(.*?)</p>', art, re.S))
        liens = re.findall(r'href="fiches/([^"]+\.pdf)"', art)
        for i, f in enumerate(liens):
            c = "en" if i == 1 else "fr"
            pdfs.append((f, c, un(titres.get(c, "")), un(textes.get(c, ""))))
    try:
        from pypdf import PdfReader, PdfWriter
        from pypdf.generic import NameObject, TextStringObject
        for f, c, titre, sujet in pdfs:
            path = os.path.join("fiches", f)
            if not os.path.exists(path):
                continue
            r = PdfReader(path)
            meta = {"/Title": titre, "/Author": "Paul Moussard", "/Subject": sujet,
                    "/Keywords": ", ".join([titre.split(" · ")[0], "aide de jeu" if c == "fr" else "game aid", "PDF", MARQUE]),
                    "/Creator": MARQUE + " · lessrulesmoreplay.com"}
            old = {k: r.metadata.get(k) for k in meta} if r.metadata else {}
            if all(str(old.get(k)) == v for k, v in meta.items()):
                continue
            w = PdfWriter(clone_from=r)
            w.add_metadata(meta)
            w._root_object.update({NameObject("/Lang"): TextStringObject("fr-FR" if c == "fr" else "en-GB")})
            with open(path, "wb") as o:
                w.write(o)
            print("ok", path, "·", titre)
    except ImportError:
        print("pypdf absent : métadonnées des PDF non mises à jour (pip install pypdf)")

    # ---- sitemap
    x = ['<?xml version="1.0" encoding="UTF-8"?>',
         '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">']
    for path, alts, _ in plan:
        d = git_date(path)
        for c, u in alts:
            x.append(f"  <url><loc>{e(u)}</loc><lastmod>{d}</lastmod>")
            x += [f'    <xhtml:link rel="alternate" hreflang="{h}" href="{e(v)}"/>' for h, v in alts]
            x.append("  </url>")
    for f in sorted({p[0] for p in pdfs}):
        if os.path.exists(os.path.join("fiches", f)):
            x.append(f"  <url><loc>{SITE}/fiches/{f}</loc><lastmod>{git_date(os.path.join('fiches', f))}</lastmod></url>")
    x.append("</urlset>")
    open("sitemap.xml", "w", encoding="utf-8").write("\n".join(x) + "\n")
    print("ok sitemap.xml ·", sum(1 for l in x if l.startswith("  <url>")), "adresses")
    import sw  # service worker (liste et version du cache) et manifest
    sw.main()


if __name__ == "__main__":
    main()
