#!/usr/bin/env python3
"""Fiches A5 Nemesis: Retaliation : pages .dc.html (artefact Design « Fiches Nemesis: Retaliation ») -> PDF du site.

Usage (racine du dépôt) : python3 outils/nemesis-fiches/gen_pages.py ; python3 outils/nemesis-fiches/gen_pages_en.py ;
                          python3 outils/nemesis-fiches/pdf.py ; puis python3 outils/site/seo.py (métadonnées des PDF).
Polices : commun/polices (celles du site). Gabarit : outils/fiches-gabarit (couleur #5c7e22, titres Rajdhani).
Aide de jeu : A5 portrait (559×794 px) ; salles : A5 paysage (794×559 px).
"""
import re, pathlib
from playwright.sync_api import sync_playwright

ICI = pathlib.Path(__file__).resolve().parent
RACINE = ICI.parent.parent
AIDE = ['Aide-1-manche.dc.html', 'Aide-2-bruit-sac.dc.html', 'Aide-3-combat-survie.dc.html']
SALLES = ['Salles-1.dc.html', 'Salles-2.dc.html', 'Salles-3.dc.html']
FICHES = {  # PDF : (dossier, pages, paysage ?)
    'nemesis-aide-de-jeu.pdf': ('fr', AIDE, False),
    'nemesis-salles.pdf': ('fr', SALLES, True),
    'nemesis-game-aid.pdf': ('en', AIDE, False),
    'nemesis-rooms.pdf': ('en', SALLES, True),
}
P = RACINE / 'commun' / 'polices'
POLICES = ''.join(f"@font-face{{font-family:'{f}';font-style:{st};font-weight:{w};src:url({(P/n).as_uri()})}}\n" for f, st, w, n in (
    ('Rajdhani', 'normal', '600', 'rajdhani-600-latin.woff2'), ('Rajdhani', 'normal', '700', 'rajdhani-700-latin.woff2'),
    ('Source Sans 3', 'normal', '200 900', 'source-sans-3-latin.woff2'), ('Source Sans 3', 'italic', '200 900', 'source-sans-3-italic-latin.woff2')))

def page(dossier, nom):
    s = (ICI / dossier / nom).read_text(encoding='utf-8')
    return ''.join(re.findall(r'<style>(.*?)</style>', s, re.S)), re.search(r'</helmet>(.*)</x-dc>', s, re.S).group(1)

with sync_playwright() as p:
    nav = p.chromium.launch(executable_path='/usr/bin/google-chrome', args=['--no-sandbox'])
    for pdf, (dossier, noms, paysage) in FICHES.items():
        w, h = ('210mm', '148mm') if paysage else ('148mm', '210mm')
        pages = [page(dossier, n) for n in noms]
        html = ('<!doctype html><html lang="' + dossier + '"><head><meta charset="utf-8"><style>' + POLICES + pages[0][0] +
                f'@page{{size:{w} {h};margin:0}}html,body{{margin:0}}.pg{{width:{w}!important;height:{h}!important;page-break-after:always}}'
                '</style></head><body>' + ''.join(c for _, c in pages) + '</body></html>')
        tmp = ICI / ('_' + pdf + '.html')
        tmp.write_text(html, encoding='utf-8')
        pg = nav.new_page()
        pg.goto(tmp.as_uri()); pg.evaluate('document.fonts.ready'); pg.wait_for_timeout(300)
        pg.pdf(path=str(RACINE / 'fiches' / pdf), width=w, height=h, print_background=True)
        pg.close(); tmp.unlink()
        print('fiches/' + pdf)
    nav.close()
