#!/usr/bin/env python3
"""Crée une nouvelle appli complète, prête à remplir, sur le modèle commun.

usage (depuis la racine du dépôt) :
  python3 outils/nouvelle_appli.py <dossier> <code> "<Nom FR>" "<Nom EN>" <#couleur> <glyphe> [police]

  dossier   nom du dossier et de l'adresse (ex. pax-pamir → lessrulesmoreplay.com/pax-pamir/)
  code      2 à 4 lettres, filtre de l'accueil et préfixe des sauvegardes (ex. pp)
  couleur   couleur du jeu sur fond sombre (cartes de l'accueil) ; l'appli en tire une version foncée lisible
  glyphe    emoji de la carte de l'accueil (ex. 🐫)
  police    police des titres, parmi celles de commun/polices.css (défaut : Marcellus)

Ce que fait le script :
  1. outils/<dossier>/ : copie de outils/modele-appli (page.html, i18n/fr.json et en.json, contenu/fr.js et en.js) ;
  2. outils/site/jeux.json : entrée du jeu (titres, descriptions, image de partage, couleur, formulaire) ;
  3. commun/tokens.css : variable --jeu-<code> ;
  4. carte de l'accueil, bouton de filtre et choix du formulaire « Votre avis » (accueil.py appli outils/<dossier>/carte.json) ;
  5. pages FR et EN (assembler.py), image de partage (og_images.py), référencement, sitemap et cache (seo.py).
Il reste à écrire le contenu (voir la liste affichée à la fin), puis à lancer outils/verifier.py.
"""
import datetime, json, os, re, shutil, subprocess, sys

RACINE = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), ".."))
SITE = os.path.join(RACINE, "outils", "site")


def foncer(h, f):
    r, g, b = (int(h[i:i + 2], 16) for i in (1, 3, 5))
    return "#%02x%02x%02x" % (int(r * f), int(g * f), int(b * f))


def main():
    a = sys.argv[1:]
    if len(a) not in (6, 7):
        sys.exit(__doc__)
    d, code, nom, nom_en, couleur, glyphe = a[:6]
    police = a[6] if len(a) == 7 else "Marcellus"
    os.chdir(RACINE)
    if not re.fullmatch(r"[a-z0-9-]+", d) or not re.fullmatch(r"[a-z]{2,4}", code) or not re.fullmatch(r"#[0-9a-fA-F]{6}", couleur):
        sys.exit("dossier en minuscules et tirets, code de 2 à 4 lettres, couleur en #rrggbb")
    jeux = json.load(open(os.path.join(SITE, "jeux.json"), encoding="utf-8"))
    if d in jeux or os.path.exists(d) or os.path.exists(os.path.join("outils", d)):
        sys.exit(f"« {d} » existe déjà")
    if any(v.get("code") == code for v in jeux.values() if isinstance(v, dict)):
        sys.exit(f"le code « {code} » est déjà pris")
    polices = open("commun/polices.css", encoding="utf-8").read()
    if f"font-family:'{police}'" not in polices:
        sys.exit(f"police « {police} » absente de commun/polices.css (voir outils/site/polices.py)")

    # 1. sources
    src = os.path.join("outils", d)
    shutil.copytree(os.path.join("outils", "modele-appli"), src)
    for f in ("i18n/fr.json", "i18n/en.json"):
        p = os.path.join(src, f)
        s = open(p, encoding="utf-8").read().replace("{{NOM_EN}}", nom_en).replace("{{NOM}}", nom)
        open(p, "w", encoding="utf-8").write(s)

    # 2. registre
    jeux[d] = {
        "code": code, "formulaire": nom, "couleur": couleur, "police": police,
        "jeu": {"fr": nom, "en": nom_en},
        "seo": {"fr": [f"{nom} : apprendre les règles pas à pas",
                       f"Apprenez {nom} pas à pas avec un tutoriel interactif, puis gardez l'aide-mémoire sous la main. Gratuit."],
                "en": [f"{nom_en}: learn the rules step by step",
                       f"Learn {nom_en} step by step with an interactive tutorial, then keep the reference sheet at hand. Free."]},
        "og": [nom, "Les règles pas à pas, aide-mémoire", "Rules step by step, reference"],
    }
    open(os.path.join(SITE, "jeux.json"), "w", encoding="utf-8").write(json.dumps(jeux, ensure_ascii=False, indent=1) + "\n")

    # 3. jeton de couleur
    t = open("commun/tokens.css", encoding="utf-8").read()
    t = re.sub(r"(  --jeu-[a-z]+:#[0-9a-fA-F]{6};[^\n]*\n)(?!  --jeu-)", lambda m: m.group(1) + f"  --jeu-{code}:{couleur};   /* {nom} */\n", t, count=1)
    open("commun/tokens.css", "w", encoding="utf-8").write(t)

    # 4. carte de l'accueil
    carte = {
        "dossier": d, "jeu": code, "glyphe": glyphe, "cree": datetime.date.today().isoformat(),
        "nom": {"fr": nom, "en": nom_en},
        "texte": {"fr": f"Apprenez {nom} pas à pas avec un tutoriel interactif, puis gardez l'aide-mémoire sous la main.",
                  "en": f"Learn {nom_en} step by step with an interactive tutorial, then keep the reference sheet at hand.",
                  "de": f"Lernen Sie {nom_en} Schritt für Schritt mit einem interaktiven Tutorial und behalten Sie die Kurzübersicht griffbereit."},
        "tags": [{"fr": "Tutoriel", "en": "Tutorial", "de": "Tutorial"}, {"fr": "Aide-mémoire", "en": "Reference", "de": "Übersicht"}],
        "langues": "FR · EN",
        "nouveau_jeu": {"chip": nom, "recherche": nom.lower(), "accent": couleur, "c1": foncer(couleur, .45), "c2": foncer(couleur, .12)},
    }
    open(os.path.join(src, "carte.json"), "w", encoding="utf-8").write(json.dumps(carte, ensure_ascii=False, indent=1) + "\n")
    run = lambda *x: subprocess.run([sys.executable, *x], check=True)
    run(os.path.join(SITE, "accueil.py"), "appli", os.path.join(src, "carte.json"))

    # 5. pages, image, référencement
    run(os.path.join(SITE, "assembler.py"), d)
    try:
        run(os.path.join(SITE, "og_images.py"))
    except subprocess.CalledProcessError:
        print("image de partage non faite (Playwright ou polices manquants) : lancer outils/site/og_images.py plus tard")
    run(os.path.join(SITE, "seo.py"))

    print(f"""
Appli « {nom} » créée : {d}/index.html et {d}/en.html.
À faire maintenant :
  - écrire le tutoriel et l'aide-mémoire : outils/{d}/contenu/fr.js et en.js (vouvoiement), puis assembler.py {d} ;
  - relire la carte de l'accueil (outils/{d}/carte.json, puis accueil.py appli) et les titres dans outils/site/jeux.json ;
  - citer le jeu dans l'introduction et la mention légale de l'accueil (index.html FR/EN, outils/site/accueil/de.json,
    ACCUEIL dans outils/site/seo.py) ;
  - python3 outils/verifier.py, puis commit et push.""")


if __name__ == "__main__":
    main()
