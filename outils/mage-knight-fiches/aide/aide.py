#!/usr/bin/env python3
"""Aide de jeu Mage Knight (fiches 1 à 6, 8 pages A5) : pages Design -> fiches/mage-knight-aide-de-jeu.pdf.

usage : python3 outils/mage-knight-fiches/aide/aide.py      (depuis n'importe où)

Sources : fr/1-combat.html … fr/8-deplacement.html, copies des pages de l'artefact Design « Aide de jeu Mage Knight »
(page « Fiches A5 » : A5Combat, A5Combat2, A5Sites, A5Sites2, A5Legion, A5Capacites, A5Tour, A5Deplacement),
remises au gabarit commun (outils/fiches-gabarit : bleu #52789d, titres Marcellus, texte Source Sans 3).
Les illustrations (/_blob/<id> dans l'artefact) sont dans img/<id>.png.
Après une modification dans l'artefact : recopier la page dans fr/ (mêmes couleurs que ci-dessus), relancer,
puis outils/site/seo.py (métadonnées du PDF).
"""
import asyncio, os, re, sys
H = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(H, "..", "quetes"))
from quetes import ROOT, to_html, render, pied

PAGES = ["1-combat", "2-combat-suite", "3-sites", "4-sites-suite", "5-legion", "6-capacites", "7-tour", "8-deplacement"]


def page(n, i):
    dc = open(os.path.join(H, "fr", n + ".html"), encoding="utf-8").read()
    dc = pied(dc, f"Aide de jeu · {i}/{len(PAGES)}")
    dc = re.sub(r'/_blob/([0-9a-f]+)', lambda m: "file://" + os.path.join(H, "img", m.group(1) + ".png"), dc)
    return dc


if __name__ == "__main__":
    pages = [to_html(page(n, i + 1), "fr") for i, n in enumerate(PAGES)]
    asyncio.run(render(pages, os.path.join(ROOT, "fiches", "mage-knight-aide-de-jeu.pdf")))
