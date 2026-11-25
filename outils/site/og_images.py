#!/usr/bin/env python3
"""Images de partage (Open Graph, 1200×630) : img/og/<nom>.jpg, une pour l'accueil et une par appli.

Usage : python3 outils/site/og_images.py   (depuis la racine du dépôt)
Polices : celles de outils/imperium-fiches/node_modules (npm install @fontsource/marcellus @fontsource/source-sans-3).
Ajouter une appli : une ligne dans IMAGES (même nom que le dossier de l'appli), puis relancer seo.py.
"""
import pathlib
from playwright.sync_api import sync_playwright

RACINE = pathlib.Path(__file__).resolve().parents[2]
FS = RACINE / 'outils/imperium-fiches/node_modules/@fontsource'
IMAGES = {  # nom : (titre, sous-titre FR, sous-titre EN)
    'accueil': ('Less Rules, More Play', 'Aides de jeu gratuites pour jeux de société experts', 'Free game aids for heavy board games'),
    'mage-knight': ('Mage Knight', 'Tutoriel des règles et compagnon de partie', 'Rules tutorial and game companion'),
    'imperium': ('Imperium', 'Tutoriel, solo contre la C.I.V., fiches', 'Tutorial, solo against the C.I.V., printables'),
    'aeons-end': ("Aeon's End", 'Générateur de marché, mises en place, journal', 'Market randomizer, setups, game log'),
    'puerto-rico': ('Puerto Rico 1897', 'Les règles pas à pas, aide-mémoire, score', 'Rules step by step, reference, scoring'),
    'nemesis': ('Nemesis: Retaliation', 'Les règles pas à pas, aide-mémoire, salles', 'Rules step by step, reference, rooms'),
}
POLICES = (f"@font-face{{font-family:Marcellus;src:url({(FS/'marcellus/files/marcellus-latin-400-normal.woff2').as_uri()})}}"
           f"@font-face{{font-family:S;font-weight:400;src:url({(FS/'source-sans-3/files/source-sans-3-latin-400-normal.woff2').as_uri()})}}"
           f"@font-face{{font-family:S;font-weight:600;src:url({(FS/'source-sans-3/files/source-sans-3-latin-600-normal.woff2').as_uri()})}}")

def html(titre, fr, en, accueil):
    marque = '' if accueil else '<div class="b">Less Rules, More Play</div>'
    return f"""<!doctype html><meta charset="utf-8"><style>{POLICES}
body{{margin:0;width:1200px;height:630px;background:radial-gradient(ellipse 70% 60% at 50% 0,rgba(221,185,106,.22),transparent 70%),#0d0f16;
color:#efe8d8;font-family:S,sans-serif;display:flex;flex-direction:column;justify-content:center;padding:0 96px;box-sizing:border-box;position:relative}}
.b{{font-size:30px;letter-spacing:.16em;text-transform:uppercase;color:#ddb96a;font-weight:600;margin-bottom:22px}}
h1{{font-family:Marcellus,serif;font-weight:400;font-size:{108 if len(titre) < 18 else 92}px;line-height:1.02;margin:0 0 30px}}
.fr{{font-size:40px;color:#efe8d8}}.en{{font-size:32px;color:#a3a9b8;margin-top:10px}}
.u{{position:absolute;left:96px;bottom:52px;font-size:28px;color:#ddb96a}}
.l{{position:absolute;left:96px;right:96px;bottom:104px;height:2px;background:linear-gradient(90deg,#ddb96a,transparent)}}
</style>{marque}<h1>{titre}</h1><div class="fr">{fr}</div><div class="en">{en}</div><div class="l"></div><div class="u">paulmoussard.com · gratuit · free</div>"""

with sync_playwright() as p:
    nav = p.chromium.launch(executable_path='/usr/bin/google-chrome', args=['--no-sandbox'])
    pg = nav.new_page(viewport={'width': 1200, 'height': 630})
    for nom, (t, fr, en) in IMAGES.items():
        tmp = RACINE / 'img/og' / '_tmp.html'
        tmp.write_text(html(t, fr, en, nom == 'accueil'), encoding='utf-8')
        pg.goto(tmp.as_uri()); pg.evaluate('document.fonts.ready'); pg.wait_for_timeout(150)
        pg.screenshot(path=str(RACINE / 'img/og' / f'{nom}.jpg'), type='jpeg', quality=88)
        tmp.unlink()
        print('img/og/' + nom + '.jpg')
    nav.close()
