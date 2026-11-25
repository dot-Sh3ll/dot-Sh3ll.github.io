#!/usr/bin/env python3
"""Construit les pages d'une appli faite sur le modèle commun (outils/modele-appli), dans toutes ses langues.

usage : python3 outils/site/assembler.py <dossier>          (depuis la racine du dépôt ; ex. assembler.py agricola)

Sources dans outils/<dossier>/ :
  page.html            structure, styles et code ; {{clé}} = texte de l'interface ; <!--CONTENU--> = contenu de la langue
  i18n/<langue>.json   textes de l'interface, mêmes clés dans toutes les langues (format commun du site)
  contenu/<langue>.js  chapitres et aide-mémoire ; une langue sans fichier reprend l'anglais
Réglages lus dans outils/site/jeux.json (entrée <dossier>) : code, couleur, police.

Une page est écrite pour chaque fichier i18n/<langue>.json : <dossier>/index.html (fr), <dossier>/<langue>.html.
Les clés manquantes reprennent l'anglais (puis le français) et sont signalées.
Puis : langue (lang.py), en-tête et feuilles communes (chrome.py), PWA (pwa.py), pied de page (pied.py), fiches (fiches.py).
Relancer ensuite outils/site/seo.py.
"""
import glob, json, os, re, subprocess, sys

H = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, H)
from langs import ORDER, page_file


def contraste(h1, h2="#ffffff"):
    def lum(h):
        c = [int(h[i:i + 2], 16) / 255 for i in (1, 3, 5)]
        c = [x / 12.92 if x <= .03928 else ((x + .055) / 1.055) ** 2.4 for x in c]
        return .2126 * c[0] + .7152 * c[1] + .0722 * c[2]
    a, b = sorted([lum(h1), lum(h2)], reverse=True)
    return (a + .05) / (b + .05)


def accent_clair(h):
    """couleur du jeu assombrie jusqu'à un contraste AA avec du blanc (fond clair du modèle, texte blanc sur l'onglet)"""
    r, g, b = (int(h[i:i + 2], 16) for i in (1, 3, 5))
    f = 1.0
    while contraste("#%02x%02x%02x" % (int(r * f), int(g * f), int(b * f))) < 4.6:
        f -= .01
    return "#%02x%02x%02x" % (int(r * f), int(g * f), int(b * f))


def main():
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    d = sys.argv[1].strip("/")
    src = os.path.join("outils", d)
    jeux = json.load(open(os.path.join(H, "jeux.json"), encoding="utf-8"))
    if d not in jeux:
        sys.exit(f"assembler.py : « {d} » absent de outils/site/jeux.json")
    j = jeux[d]
    page = open(os.path.join(src, "page.html"), encoding="utf-8").read()
    textes = {os.path.basename(f)[:-5]: json.load(open(f, encoding="utf-8")) for f in glob.glob(os.path.join(src, "i18n", "*.json"))}
    langues = [c for c in ORDER if c in textes]
    cles = set(re.findall(r"\{\{([a-z_]+)\}\}", page)) - {"_lang", "_code", "_police", "_accent_clair"}
    os.makedirs(d, exist_ok=True)
    for c in langues:
        t = {**textes.get("fr", {}), **textes.get("en", {}), **textes[c]}
        manque = sorted(k for k in cles if k not in textes[c])
        if manque:
            print(f"{c} : {len(manque)} texte(s) sans traduction (repris de l'anglais) : {', '.join(manque)}")
        t |= {"_lang": c, "_code": j["code"], "_police": j.get("police", "Marcellus"), "_accent_clair": accent_clair(j["couleur"])}
        contenu = os.path.join(src, "contenu", f"{c}.js")
        if not os.path.exists(contenu):
            print(f"{c} : pas de contenu/{c}.js, contenu anglais repris")
            contenu = os.path.join(src, "contenu", "en.js")
        s = page.replace("<!--CONTENU-->", open(contenu, encoding="utf-8").read().strip())
        s = re.sub(r"\{\{([a-z_]+)\}\}", lambda m: str(t.get(m.group(1), m.group(0))), s)
        reste = re.findall(r"\{\{[a-z_]+\}\}", s)
        if reste:
            sys.exit(f"assembler.py : clés inconnues dans page.html : {sorted(set(reste))}")
        out = os.path.join(d, page_file(c))
        open(out, "w", encoding="utf-8").write(s)
        print("ok", out)
    run = lambda *a: subprocess.run([sys.executable, *a], check=True, stdout=subprocess.DEVNULL)
    run(os.path.join(H, "lang.py"), d)
    run(os.path.join(H, "chrome.py"), d)
    for c in langues:
        run(os.path.join(H, "pwa.py"), "../", os.path.join(d, page_file(c)))
    if f'<option value="{j["formulaire"]}"' in open("index.html", encoding="utf-8").read():
        run(os.path.join(H, "pied.py"), d, j["formulaire"])
    else:
        print(f"pied de page non posé : « {j['formulaire']} » n'est pas encore dans le formulaire de l'accueil (accueil.py appli)")
    run(os.path.join(H, "fiches.py"), d)
    print("ok", d, ":", " ".join(langues), "· relancer outils/site/seo.py")


if __name__ == "__main__":
    main()
