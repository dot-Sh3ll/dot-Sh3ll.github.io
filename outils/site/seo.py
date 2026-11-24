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

À relancer après : un nouveau jeu ou une nouvelle langue (compléter PAGES), gen_lang.py (la page allemande
d'Aeon's End est copiée de la page anglaise, balises comprises), une nouvelle fiche (accueil.py fiche).
"""
import datetime, html, json, os, re, subprocess, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from langs import available, page_file

SITE = "https://paulmoussard.com"
MARQUE = "Less Rules, More Play"
AUTEUR = {"@type": "Person", "name": "Paul Moussard", "url": SITE + "/",
          "sameAs": ["https://ko-fi.com/paulmoussard", "https://github.com/dot-Sh3ll"]}
LOCALE = {"fr": "fr_FR", "en": "en_GB", "de": "de_DE", "es": "es_ES"}
ACCUEIL_LANGS = ["fr", "en", "de", "es"]

ACCUEIL = {
    "fr": ("Aides de jeu gratuites pour jeux de société experts | Less Rules, More Play",
           "Tutoriels interactifs, compagnons solo et fiches à imprimer, gratuits, pour Mage Knight, Imperium Antique, Aeon's End et Puerto Rico 1897. Apprenez les règles en jouant."),
    "en": ("Free game aids for heavy board games | Less Rules, More Play",
           "Free interactive rules tutorials, solo companions and printable game aids for Mage Knight, Imperium: Classics, Aeon's End and Puerto Rico 1897. Learn the rules by playing."),
    "de": ("Kostenlose Spielhilfen für Expertenspiele | Less Rules, More Play",
           "Kostenlose interaktive Regel-Tutorials, Solo-Begleiter und Spielhilfen zum Ausdrucken für Mage Knight, Imperium, Aeon's End und Puerto Rico 1897."),
    "es": ("Ayudas de juego gratuitas para juegos de mesa expertos | Less Rules, More Play",
           "Tutoriales interactivos de reglas, compañeros en solitario y hojas para imprimir, gratis, para Mage Knight, Imperium, Aeon's End y Puerto Rico 1897."),
}

# dossier de l'appli : jeu (nom du jeu par langue), puis titre et description par langue de page
PAGES = {
    "mage-knight": {
        "jeu": {"fr": "Mage Knight", "en": "Mage Knight"},
        "fr": ("Mage Knight : tutoriel des règles et compagnon de partie gratuits",
               "Apprenez Mage Knight pas à pas avec un tutoriel interactif des règles, puis jouez avec le compagnon de partie : joueur Fantôme, scénarios solo et coop à deux. Gratuit."),
        "en": ("Mage Knight rules tutorial and free game companion",
               "Learn Mage Knight step by step with an interactive rules tutorial, then play with the game companion: Dummy player, solo and two-player co-op scenarios. Free."),
    },
    "imperium": {
        "jeu": {"fr": "Imperium Antique", "en": "Imperium: Classics"},
        "fr": ("Imperium Antique : tutoriel des règles et solo contre la C.I.V.",
               "Apprenez Imperium Antique en six étapes interactives, jouez en solo contre la C.I.V. sans gérer l'automate vous-même, et gardez l'aide-mémoire sous la main. Gratuit."),
        "en": ("Imperium: Classics rules tutorial and solo companion vs the C.I.V.",
               "Learn Imperium: Classics in six interactive steps, play solo against the C.I.V. without running the bot yourself, and keep the quick reference at hand. Free."),
    },
    "aeons-end": {
        "jeu": {"fr": "Aeon's End", "en": "Aeon's End", "de": "Aeon's End"},
        "fr": ("Aeon's End : générateur de marché, mises en place officielles et journal",
               "Générez le marché d'Aeon's End en un clic : mises en place officielles, piles au choix, journal des parties et expéditions. Gratuit, sur ordinateur et mobile."),
        "en": ("Aeon's End market randomizer, official setups and game log",
               "Generate your Aeon's End market in one tap: official setups, pick-your-own piles, a game log and expeditions. Free, on desktop and mobile."),
        "de": ("Aeon's End: Marktgenerator, offizielle Aufbauten und Spieljournal",
               "Erstellen Sie den Markt für Aeon's End mit einem Klick: offizielle Aufbauten, frei wählbare Stapel, Spieljournal und Expeditionen. Kostenlos, auch mobil."),
    },
    "puerto-rico": {
        "jeu": {"fr": "Puerto Rico 1897", "en": "Puerto Rico 1897"},
        "fr": ("Puerto Rico 1897 : apprendre les règles pas à pas, aide-mémoire et score",
               "Apprenez Puerto Rico 1897 règle par règle avec des ateliers interactifs et des quiz, puis gardez l'aide-mémoire des bâtiments et le calculateur de score. Gratuit."),
        "en": ("Puerto Rico 1897: learn the rules step by step, reference and scoring",
               "Learn Puerto Rico 1897 one rule at a time with interactive labs and quizzes, then keep the building reference and the score calculator at hand. Free."),
    },
}
FIL = {"fr": "Aides de jeu", "en": "Game aids", "de": "Spielhilfen", "es": "Ayudas de juego"}


def url_page(dossier, code):
    return f"{SITE}/{dossier}/" if code == "fr" else f"{SITE}/{dossier}/{code}.html"


def url_accueil(code):
    return SITE + "/" if code == "fr" else f"{SITE}/?lang={code}"


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
            plan.append((path, alts[:-1], url))
            print("ok", path)
        applis_ld.append({"@type": "ListItem", "position": len(applis_ld) + 1, "url": url_page(dossier, "fr"), "name": cfg["jeu"]["fr"]})

    # ---- accueil : une seule page HTML, la langue suit ?lang= ; le script ajuste titre, description et canonical
    alts = [(c, url_accueil(c)) for c in ACCUEIL_LANGS] + [("x-default", url_accueil("fr"))]
    titre, desc = ACCUEIL["fr"]
    ld = {"@context": "https://schema.org", "@graph": [
        {"@type": "WebSite", "@id": SITE + "/#site", "name": MARQUE, "alternateName": "paulmoussard.com", "url": SITE + "/",
         "description": desc, "inLanguage": ACCUEIL_LANGS, "publisher": AUTEUR, "author": AUTEUR},
        {"@type": "CollectionPage", "@id": SITE + "/#page", "url": SITE + "/", "name": titre, "description": desc,
         "isPartOf": {"@id": SITE + "/#site"}, "inLanguage": "fr", "image": SITE + "/img/og/accueil.jpg",
         "mainEntity": {"@type": "ItemList", "itemListElement": applis_ld}},
        AUTEUR | {"@id": SITE + "/#auteur", "jobTitle": "Président d'une association de jeux de société",
                  "homeLocation": {"@type": "Place", "name": "Strasbourg, France"}}]}
    seo_js = ("\n<script>window.SEO=%s;window.seoLang=function(l){try{var t=SEO[l]||SEO.fr,"
              "u=l===\"fr\"?\"%s/\":\"%s/?lang=\"+l;document.title=t[0];"
              "var q=function(s){return document.querySelector(s)};q('meta[name=\"description\"]').content=t[1];"
              "q('link[rel=\"canonical\"]').href=u;q('meta[property=\"og:url\"]').content=u;"
              "q('meta[property=\"og:title\"]').content=t[0];q('meta[property=\"og:description\"]').content=t[1]}catch(e){}};</script>") % (
        json.dumps(ACCUEIL, ensure_ascii=False, separators=(",", ":")).replace("</", "<\\/"), SITE, SITE)
    poser("index.html", "fr", titre, bloc("fr", titre, desc, SITE + "/", alts, "img/og/accueil.jpg", MARQUE, ld, seo_js))
    s = open("index.html", encoding="utf-8").read()
    if "seoLang(l)" not in s:
        s = s.replace('lang=l; body.setAttribute("data-lang",l); document.documentElement.lang=l;',
                      'lang=l; body.setAttribute("data-lang",l); document.documentElement.lang=l; if(window.seoLang) seoLang(l);', 1)
        if "seoLang(l)" not in s:
            sys.exit("seo.py : setLang introuvable dans index.html")
        open("index.html", "w", encoding="utf-8").write(s)
    print("ok index.html")
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
            meta = {"/Title": titre, "/Author": "Paul Moussard · " + MARQUE, "/Subject": sujet,
                    "/Keywords": ", ".join([titre.split(" · ")[0], "aide de jeu" if c == "fr" else "game aid", "PDF", MARQUE]),
                    "/Creator": MARQUE + " · paulmoussard.com"}
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


if __name__ == "__main__":
    main()
