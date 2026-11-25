#!/usr/bin/env python3
"""Fiches A5 Imperium Antique : pages .dc.html de l'artefact Design -> PDF du site.

Usage : python3 outils/imperium-fiches/pdf.py   (depuis la racine du dépôt ; lancer en.py avant pour l'anglais)
Polices : commun/polices (celles du site). Gabarit : outils/fiches-gabarit (couleur Imperium #ae5d50, titres Cinzel).
"""
import re, pathlib, sys
from playwright.sync_api import sync_playwright

ICI = pathlib.Path(__file__).resolve().parent
RACINE = ICI.parent.parent
FICHES = {  # PDF : (dossier des pages, pages)
    'imperium-aide-de-jeu.pdf': ('fr', ['A5Tour.dc.html', 'A5Deck.dc.html']),
    'imperium-mots-cles.pdf': ('fr', ['A5MotsCles1.dc.html', 'A5MotsCles2.dc.html']),
    'imperium-game-aid.pdf': ('en', ['A5Tour.dc.html', 'A5Deck.dc.html']),
    'imperium-keywords.pdf': ('en', ['A5MotsCles1.dc.html', 'A5MotsCles2.dc.html']),
}
P = RACINE / 'commun' / 'polices'  # polices du site
POLICES = ''.join(f"@font-face{{font-family:'{f}';font-style:{st};font-weight:{w};src:url({(P/n).as_uri()})}}\n" for f, st, w, n in (
    ('Cinzel', 'normal', '400 900', 'cinzel-latin.woff2'), ('Marcellus', 'normal', '400', 'marcellus-latin.woff2'),
    ('Source Sans 3', 'normal', '200 900', 'source-sans-3-latin.woff2'), ('Source Sans 3', 'italic', '200 900', 'source-sans-3-italic-latin.woff2')))

def page(dossier, nom):
    s = (ICI / dossier / nom).read_text(encoding='utf-8')
    styles = ''.join(re.findall(r'<style>(.*?)</style>', s, re.S))
    corps = re.search(r'</helmet>(.*)</x-dc>', s, re.S).group(1)
    return styles, corps

with sync_playwright() as p:
    nav = p.chromium.launch(executable_path='/usr/bin/google-chrome', args=['--no-sandbox'])
    for pdf, (dossier, noms) in FICHES.items():
        pages = [page(dossier, n) for n in noms]
        html = ('<!doctype html><html lang="' + dossier + '"><head><meta charset="utf-8"><style>' + POLICES + pages[0][0] +
                '@page{size:148mm 210mm;margin:0}html,body{margin:0}.pg{width:148mm!important;height:210mm!important;page-break-after:always;zoom:1}'
                '</style></head><body>' + ''.join(c for _, c in pages) + '</body></html>')
        tmp = ICI / ('_' + pdf + '.html')
        tmp.write_text(html, encoding='utf-8')
        pg = nav.new_page()
        pg.goto(tmp.as_uri()); pg.evaluate('document.fonts.ready')
        # le gabarit est dessiné à 559×794 px : on l'agrandit pour remplir l'A5 (148×210 mm = 559×794 px à 96 dpi)
        pg.pdf(path=str(RACINE / 'fiches' / pdf), width='148mm', height='210mm', print_background=True)
        pg.close(); tmp.unlink()
        print('fiches/' + pdf)
    nav.close()
