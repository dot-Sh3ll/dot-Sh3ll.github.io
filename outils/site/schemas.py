#!/usr/bin/env python3
"""Schémas des tutoriels de Mage Knight, Imperium et Puerto Rico (même esprit que outils/nemesis/figures.py).

usage : python3 outils/site/schemas.py <dossier>      (mage-knight, imperium, puerto-rico)
        python3 outils/site/schemas.py --tout

Pose dans chaque page (FR, EN) un bloc <!--schemas-->…<!--/schemas--> avant </body> : styles des schémas
(couleurs tirées des variables de l'appli, donc justes en thème clair et sombre) et un petit script qui insère
chaque schéma sous les règles du bon chapitre, à chaque affichage (les chapitres sont redessinés par l'appli).
Rejouable. Lancé par le build.sh de Mage Knight, d'Imperium et de Puerto Rico.
Une géométrie par schéma, un jeu de textes par langue ; légende (figcaption) et texte alternatif dans chaque langue.
"""
import json, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", ".."))
sys.path.insert(0, HERE)
from langs import available

T = lambda x, y, txt, cls="s-s", anchor="middle": f'<text class="{cls}" x="{x}" y="{y}" text-anchor="{anchor}" dominant-baseline="central">{txt}</text>'


def boite(x, y, w, titre, sous, cls="s-phase", h=54):
    cx = x + w / 2
    return (f'<rect class="{cls}" x="{x}" y="{y}" width="{w}" height="{h}" rx="8"/>'
            + T(cx, y + 19, titre, "s-t") + T(cx, y + 38, sous))


def fleche(x1, y1, x2, y2):
    return f'<line class="s-arr" x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" marker-end="url(#s-fl)"/>'


def svg(h, corps, alt):
    return (f'<svg viewBox="0 0 680 {h}" role="img" aria-label="{alt}"><defs>'
            '<marker id="s-fl" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">'
            '<path class="s-mk" d="M2 1L8 5L2 9"/></marker></defs>' + corps + '</svg>')


# ------------------------------------------------------------------ Mage Knight : le combat en quatre phases
def mk_combat(t):
    c = ''
    for i, (a, b) in enumerate(t["phases"]):
        x = 20 + i * 165
        c += boite(x, 30, 150, a, b, "s-warn" if i == 2 else "s-phase")
        if i < 3:
            c += fleche(x + 151, 57, x + 163, 57)
    c += T(340, 12, t["haut"])
    for i, txt in enumerate(t["notes"]):
        x = 20 + i * 165 + 75
        for k, ligne in enumerate(txt):
            c += T(x, 104 + k * 18, ligne)
    c += T(340, 168, t["bas"], "s-s s-em")
    return svg(186, c, t["alt"])


# ------------------------------------------------------------------ Mage Knight : efficace + ½ inefficace
def mk_demi(t):
    c = T(340, 16, t["titre"], "s-t")
    c += T(140, 44, t["etape1"], "s-s s-em") + T(397, 44, t["etape2"], "s-s s-em") + T(585, 44, t["etape3"], "s-s s-em")
    c += boite(20, 58, 240, t["eff"], t["effs"])
    c += boite(20, 126, 240, t["ineff"], t["ineffs"], "s-phase")
    c += fleche(261, 85, 318, 112) + fleche(261, 153, 318, 126)
    c += boite(320, 92, 155, t["total"], t["totals"])
    c += fleche(476, 119, 508, 119)
    c += boite(510, 92, 150, t["res"], t["ress"], "s-warn")
    c += T(340, 206, t["note"])
    return svg(222, c, t["alt"])


# ------------------------------------------------------------------ Imperium : deck vide, on mélange
def imp_melange(t):
    c = boite(20, 20, 200, t["vide"], t["vides"])
    c += fleche(221, 47, 243, 47) + boite(245, 20, 190, t["jeton"], t["jetons"])
    c += fleche(436, 47, 458, 47) + boite(460, 20, 200, t["melange"], t["melanges"])
    c += fleche(340, 76, 340, 82) + T(340, 94, t["ajout"], "s-t")
    for i, (a, b, cls) in enumerate(t["sources"]):
        x = 20 + i * 220
        c += boite(x, 108, 200, a, b, cls)
        if i < 2:
            c += T(x + 210, 135, "→", "s-t")
    c += f'<path class="s-path" d="M340 163 L340 184 L672 184 L672 47 L664 47" marker-end="url(#s-fl)"/>'
    c += T(340, 206, t["note"], "s-s s-em")
    return svg(222, c, t["alt"])


# ------------------------------------------------------------------ Puerto Rico : le tour de table du Capitaine
def pr_capitaine(t):
    noms = t["joueurs"]
    c = ''
    for j, n in enumerate(noms):
        c += T(180 + j * 120, 18, n, "s-t")
    for i, (lab, res) in enumerate(t["tours"]):
        y = 40 + i * 44
        c += T(110, y + 16, lab, "s-s", "end")
        for j, r in enumerate(res):
            ok = r == "+"
            c += (f'<rect class="{"s-ok" if ok else "s-no"}" x="{180 + j*120 - 45}" y="{y}" width="90" height="32" rx="6"/>'
                  + T(180 + j * 120, y + 16, t["charge"] if ok else t["rien"], "s-in" if ok else "s-s"))
    y = 40 + len(t["tours"]) * 44 + 6
    c += fleche(300, y - 4, 300, y + 14) + boite(120, y + 18, 360, t["fin"], t["fins"], "s-warn")
    c += T(340, y + 96, t["note"])
    return svg(y + 112, c, t["alt"])


# ------------------------------------------------------------------ Mage Knight : Dégâts (points) ≠ Blessures (cartes)
def mk_blessures(t):
    u = 34
    c = T(20, 16, t["titre"], "s-t", "start")
    # Héros : 5 Dégâts, Armure 2 → 3 Blessures
    x0, y = 150, 40
    c += T(140, y + 13, t["degats"], "s-s", "end")
    for k in range(5):
        c += f'<rect class="s-dmg" x="{x0 + k*u}" y="{y}" width="{u-4}" height="26" rx="4"/>' + T(x0 + k * u + (u - 4) / 2, y + 13, "1", "s-in")
    for k, (a, b) in enumerate(((0, 2), (2, 4), (4, 5))):
        xa, xb = x0 + a * u, x0 + b * u - 4
        c += f'<path class="s-brace" d="M{xa} {y+34} L{xa} {y+40} L{xb} {y+40} L{xb} {y+34}"/>'
        c += f'<rect class="s-card" x="{(xa+xb)/2-17}" y="{y+52}" width="34" height="44" rx="4"/>' + T((xa + xb) / 2, y + 74, "✕", "s-em")
    c += T(140, y + 74, t["blessures"], "s-s", "end")
    c += T(x0 + 5 * u + 20, y + 13, t["heros"], "s-s", "start") + T(x0 + 5 * u + 20, y + 74, t["heros2"], "s-s s-em", "start")
    # Unité : 3 Dégâts absorbés par 1 seule Blessure (Armure 3)
    y2 = y + 128
    c += T(140, y2 + 13, t["degats2"], "s-s", "end")
    for k in range(3):
        c += f'<rect class="s-dmg" x="{x0 + k*u}" y="{y2}" width="{u-4}" height="26" rx="4"/>' + T(x0 + k * u + (u - 4) / 2, y2 + 13, "1", "s-in")
    xb = x0 + 3 * u - 4
    c += f'<path class="s-brace" d="M{x0} {y2+34} L{x0} {y2+40} L{xb} {y2+40} L{xb} {y2+34}"/>'
    c += f'<rect class="s-card" x="{(x0+xb)/2-17}" y="{y2+52}" width="34" height="44" rx="4"/>' + T((x0 + xb) / 2, y2 + 74, "✕", "s-em")
    c += T(140, y2 + 74, t["blessures"], "s-s", "end")
    c += T(x0 + 5 * u + 20, y2 + 13, t["unite"], "s-s", "start") + T(x0 + 5 * u + 20, y2 + 74, t["unite2"], "s-s s-em", "start")
    c += T(340, y2 + 122, t["note"], "s-s s-em")
    return svg(y2 + 140, c, t["alt"])



def carte(x, y, tab=False):
    """Une carte (et, si tab, la carte Instabilités glissée dessous)."""
    c = f'<rect class="s-dmg" x="{x+8}" y="{y+52}" width="40" height="18" rx="3"/>' if tab else ''
    return c + f'<rect class="s-card" x="{x}" y="{y}" width="56" height="62" rx="5"/>'


# ------------------------------------------------------------------ Mage Knight : le mana
def mk_mana(t):
    c = ''
    for i, (a, b, d) in enumerate(t["formes"]):
        x = 20 + i * 220
        c += boite(x, 20, 200, a, b) + T(x + 100, 90, d)
    c += T(340, 122, t["titre2"], "s-t")
    xs = (260, 420, 560)
    for k, h in enumerate(t["cols"]):
        c += T(xs[k], 146, h)
    for r, (lab, cells) in enumerate(t["lignes"]):
        y = 160 + r * 40
        c += T(165, y + 15, lab, "s-t", "end")
        for k, (ok, txt) in enumerate(cells):
            w = 170 if k == 0 else 120
            c += (f'<rect class="{"s-ok" if ok else "s-no"}" x="{xs[k]-w/2}" y="{y}" width="{w}" height="30" rx="6"/>'
                  + T(xs[k], y + 15, txt, "s-in" if ok else "s-s"))
    c += T(340, 258, t["note"], "s-s s-em")
    return svg(274, c, t["alt"])


# ------------------------------------------------------------------ Mage Knight : attaque groupée ou séparée
def carres(x, y, n, cls, n_plein=None):
    """n carrés d'un point ; les n_plein premiers en cls, les autres « perdus » (pointillés)."""
    c = ''
    for k in range(n):
        k_cls = cls if n_plein is None or k < n_plein else "s-no"
        c += f'<rect class="{k_cls}" x="{x + k*20}" y="{y}" width="17" height="17" rx="3"/>'
    return c


def jeton_e(x, y, lettre, armure, res, cls):
    return (f'<circle class="{cls}" cx="{x}" cy="{y}" r="22"/>' + T(x, y, lettre, "s-t")
            + T(x, y + 36, armure) + (T(x, y + 54, res, "s-s s-em") if res else ''))


def mk_groupe(t):
    c = ''
    for x0, titre in ((20, t["g"]), (350, t["sep"])):
        c += T(x0 + 155, 14, titre, "s-t")
        c += jeton_e(x0 + 95, 58, "A", t["armA"], t["res"], "s-warn") + jeton_e(x0 + 215, 58, "B", t["armB"], "", "s-phase")
    c += '<line class="s-limit" x1="340" y1="6" x2="340" y2="268"/>'
    # Groupée : 10 points, la moitié perdue, contre 3 + 4
    c += T(20, 142, t["g1"], "s-s", "start")
    c += T(78, 167, t["att"], "s-s", "end") + carres(86, 158, 10, "s-ok", 5)
    c += T(78, 193, t["arm"], "s-s", "end") + carres(86, 184, 7, "s-warn")
    c += T(175, 226, t["g2"], "s-t s-em") + T(175, 248, t["g3"])
    # Séparées : 6 sur A (moitié perdue) contre 3, 4 sur B contre 4
    c += T(350, 142, t["s1"], "s-s", "start")
    c += T(408, 167, t["att"], "s-s", "end") + carres(416, 158, 6, "s-ok", 3)
    c += T(408, 193, t["arm"], "s-s", "end") + carres(416, 184, 3, "s-warn") + T(484, 193, t["ok"], "s-t", "start")
    c += T(350, 216, t["s2"], "s-s", "start")
    c += T(408, 241, t["att"], "s-s", "end") + carres(416, 232, 4, "s-ok")
    c += T(408, 267, t["arm"], "s-s", "end") + carres(416, 258, 4, "s-warn") + T(504, 267, t["ok"], "s-t", "start")
    c += (f'<rect class="s-ok" x="120" y="292" width="14" height="14" rx="3"/>' + T(140, 299, t["l1"], "s-s", "start")
          + f'<rect class="s-no" x="300" y="292" width="14" height="14" rx="3"/>' + T(320, 299, t["l2"], "s-s", "start")
          + f'<rect class="s-warn" x="480" y="292" width="14" height="14" rx="3"/>' + T(500, 299, t["l3"], "s-s", "start"))
    return svg(316, c, t["alt"])


# ------------------------------------------------------------------ Mage Knight : le tour
def mk_tour(t):
    c = boite(20, 20, 200, t["mvt"], t["mvts"]) + fleche(221, 47, 243, 47) + boite(245, 20, 220, t["act"], t["acts"])
    c += T(490, 47, t["ou"], "s-t") + boite(515, 20, 145, t["repos"], t["reposs"], "s-no")
    c += fleche(340, 76, 340, 96) + T(340, 108, t["fin"], "s-t")
    for i, (a, b) in enumerate(t["etapes"]):
        x, y = 20 + (i % 4) * 162, 124 + (i // 4) * 64
        c += boite(x, y, 152, f'{i+1}. {a}', b)
    c += T(340, 266, t["note"], "s-s s-em")
    return svg(282, c, t["alt"])


# ------------------------------------------------------------------ Mage Knight : les Niveaux
def mk_niveaux(t):
    c = T(340, 14, t["titre"], "s-t")
    for n in range(1, 11):
        x = 25 + (n - 1) * 64
        cls = "s-no" if n == 1 else ("s-ok" if n % 2 == 0 else "s-half")
        c += f'<rect class="{cls}" x="{x}" y="34" width="56" height="40" rx="6"/>' + T(x + 28, 54, str(n), "s-in" if n % 2 == 0 else "s-t")
    c += T(53, 88, t["depart"])
    c += f'<rect class="s-half" x="20" y="112" width="14" height="14" rx="3"/>' + T(42, 119, t["impair"], "s-t", "start") + T(42, 139, t["impairs"], "s-s", "start")
    c += f'<rect class="s-ok" x="350" y="112" width="14" height="14" rx="3"/>' + T(372, 119, t["pair"], "s-t", "start") + T(372, 139, t["pairs"], "s-s", "start")
    c += T(340, 176, t["note"], "s-s s-em")
    return svg(192, c, t["alt"])


# ------------------------------------------------------------------ Imperium : où vont vos cartes
def imp_zones(t):
    Z = t["zones"]
    pos = {"marche": (275, 20), "main": (275, 140), "deck": (20, 140), "defausse": (20, 270),
           "jeu": (530, 140), "reserve": (530, 20), "histoire": (530, 270)}
    c = ''
    for k, (x, y) in pos.items():
        c += boite(x, y, 130, Z[k][0], Z[k][1], "s-phase")
    L = t["fleches"]
    c += fleche(340, 75, 340, 138) + T(330, 106, L["acq"], "s-s", "end")
    c += fleche(151, 167, 273, 167) + T(212, 156, L["pioche"])
    c += fleche(285, 195, 120, 268) + T(205, 244, L["jouer"], "s-s", "start")
    c += fleche(85, 269, 85, 196) + T(77, 232, L["melange"], "s-s", "end")
    c += fleche(406, 158, 528, 158) + T(467, 146, L["perm"])
    c += fleche(528, 180, 406, 180) + T(467, 194, L["rappel"])
    c += fleche(385, 139, 528, 64) + T(440, 88, L["reserver"], "s-s", "end")
    c += fleche(406, 192, 528, 272) + T(468, 250, L["archiver"], "s-s", "end")
    c += '<path class="s-path" d="M660 167 L672 167 L672 344 L8 344 L8 297 L18 297" marker-end="url(#s-fl)"/>' + T(340, 334, L["abandon"])
    c += T(340, 368, t["note"], "s-s s-em")
    return svg(384, c, t["alt"])


# ------------------------------------------------------------------ Imperium : deux fins de partie
def imp_fin(t):
    c = T(20, 14, t["dec"], "s-t", "start")
    for i, (a, b) in enumerate(t["decs"]):
        x = 20 + i * 162
        c += boite(x, 28, 152, a, b, "s-phase")
        if i < 3:
            c += fleche(x + 153, 55, x + 160, 55)
    c += T(20, 112, t["eff"], "s-t", "start")
    for i, (a, b) in enumerate(t["effs"]):
        x = 20 + i * 220
        c += boite(x, 126, 200, a, b, "s-warn")
        if i < 2:
            c += fleche(x + 201, 153, x + 218, 153)
    c += T(340, 208, t["note"], "s-s s-em")
    return svg(224, c, t["alt"])


# ------------------------------------------------------------------ Imperium : Acquérir ou Innover
def imp_marche(t):
    c = T(170, 14, t["acq"], "s-t") + T(510, 14, t["inn"], "s-t")
    c += f'<line class="s-limit" x1="340" y1="6" x2="340" y2="212"/>'
    # Acquérir : la carte et son Instabilité vont en main
    c += carte(40, 36, True) + T(68, 118, t["marche"]) + fleche(104, 70, 196, 70) + T(150, 58, t["prend"])
    c += carte(210, 36, True) + T(238, 118, t["main"])
    # Innover : la carte en main, l'Instabilité retourne dans la pile
    c += carte(380, 36, True) + T(408, 118, t["marche"]) + fleche(444, 58, 556, 44) + T(500, 36, t["prend"])
    c += carte(570, 12, False) + T(598, 88, t["main"])
    c += fleche(444, 100, 556, 132) + f'<rect class="s-dmg" x="570" y="124" width="40" height="18" rx="3"/>' + T(590, 154, t["pile"])
    c += T(170, 180, t["acq1"]) + T(170, 200, t["acq2"]) + T(510, 180, t["inn1"]) + T(510, 200, t["inn2"])
    c += T(340, 238, t["note"], "s-s s-em")
    return svg(254, c, t["alt"])


# ------------------------------------------------------------------ Puerto Rico : le plafond des Carrières
def pr_carrieres(t):
    c = T(20, 14, t["titre"], "s-t", "start")
    c += T(20, 44, t["h1"], "s-s", "start") + T(205, 44, t["h2"]) + T(320, 44, t["h3"]) + T(430, 44, t["h4"], "s-s", "start")
    for r, (lab, cap, prix) in enumerate(t["lignes"]):
        y = 60 + r * 46
        c += T(20, y + 17, lab, "s-t", "start")
        c += f'<rect class="s-phase" x="185" y="{y+2}" width="40" height="30" rx="15"/>' + T(205, y + 17, str(cap), "s-t")
        for k in range(3):
            x = 260 + k * 42
            if k < cap:
                c += f'<rect class="s-ok" x="{x}" y="{y}" width="36" height="34" rx="6"/>' + T(x + 18, y + 17, "−1", "s-in")
            else:
                c += f'<rect class="s-no" x="{x}" y="{y}" width="36" height="34" rx="6"/>'
        c += T(430, y + 17, prix, "s-s", "start")
    c += (f'<rect class="s-ok" x="20" y="248" width="14" height="14" rx="3"/>' + T(40, 255, t["l1"], "s-s", "start")
          + f'<rect class="s-no" x="250" y="248" width="14" height="14" rx="3"/>' + T(270, 255, t["l2"], "s-s", "start"))
    c += T(340, 286, t["note"], "s-s s-em")
    return svg(302, c, t["alt"])

FIGS = {
 "mage-knight": {
  "fr": [
   {"anchor": "Le combat en quatre phases", "svg": mk_combat({"phases": [("1. Distance, Siège", "seules ces Attaques"), ("2. Parade", "chaque attaque à part"), ("3. Dégâts", "ce qui n'est pas paré"), ("4. Attaque", "toutes les Attaques")],
      "haut": "Un seul combat par tour, quatre phases, une seule fois chacune",
      "notes": [["vaincu ici :", "il ne riposte pas"], ["Parade ≥ Attaque :", "tout ou rien"], ["Unités et/ou Héros,", "une attaque après l'autre"], ["atteindre l'Armure", "en une seule attaque"]],
      "bas": "Rien ne se reporte d'une phase à l'autre : une attaque trop faible est perdue.",
      "alt": "Le combat en quatre phases : Distance et Siège, Parade, Dégâts, Attaque. Un ennemi vaincu en phase 1 ne riposte pas ; une Parade doit égaler l'Attaque ; les attaques non parées font des Dégâts ; en phase 4, toutes les Attaques comptent."}),
    "cap": "Le combat se joue une seule fois dans cet ordre, même face à plusieurs ennemis. La phase 3 est la seule obligatoire."},
   {"anchor": "Feu, Glace et Résistances", "svg": mk_demi({"titre": "Parer une Attaque de Feu 6 avec 3 cartes de Parade",
      "etape1": "1. Triez vos Parades", "etape2": "2. Additionnez", "etape3": "3. Comparez",
      "eff": "Efficace : Glace 3", "effs": "compte en entier : 3",
      "ineff": "Inefficaces : Physique 3, Feu 2", "ineffs": "(3 + 2) ÷ 2 = 2,5 → 2",
      "total": "Parade totale", "totals": "3 + 2 = 5", "res": "5 < Attaque 6", "ress": "ratée : 6 Dégâts",
      "note": "Contre le Feu, seules la Glace et le Feu Glacé sont efficaces ; tout le reste compte pour moitié.",
      "alt": "Contre une Attaque de Feu 6 : Parade Glace 3 efficace compte 3 ; Parade physique 3 et Parade Feu 2 sont inefficaces, (3 + 2) ÷ 2 = 2. Total 5, inférieur à 6 : la parade est ratée."}),
    "cap": "Exemple : 3 + (3 + 2) ÷ 2 = 5. Il manque 1 point : la parade est ratée, et une Parade trop faible ne réduit rien."},
   {"anchor": "Blessures, Repos et Soin", "svg": mk_blessures({"titre": "Les Dégâts sont des points, les Blessures sont des cartes",
      "degats": "5 Dégâts", "degats2": "3 Dégâts", "blessures": "Blessures", "heros": "au Héros, Armure 2 :", "heros2": "3 cartes Blessure en main",
      "unite": "à une Unité, Armure 3 :", "unite2": "1 Blessure, les 3 Dégâts sont absorbés",
      "note": "L'Armure ne retire pas de Dégâts : elle dit combien de Dégâts absorbe chaque Blessure.",
      "alt": "Dégâts et Blessures. 5 Dégâts au Héros d'Armure 2 : on les découpe en tranches de 2, la dernière incomplète ; chaque tranche donne une carte Blessure, soit 3 Blessures. 3 Dégâts à une Unité d'Armure 3 : une seule tranche, une seule Blessure, et l'Unité absorbe les 3 Dégâts."}),
    "cap": "<b>Attention à la confusion fréquente :</b> les Dégâts ne se soustraient pas de l'Armure. On les découpe en tranches de la taille de l'Armure, arrondi au supérieur, et chaque tranche devient une carte Blessure. 5 Dégâts contre Armure 2 : 3 Blessures, pas 3 Dégâts « restants »."},
  ],
  "en": [
   {"anchor": "Combat in four phases", "svg": mk_combat({"phases": [("1. Ranged, Siege", "only those Attacks"), ("2. Block", "each attack separately"), ("3. Damage", "whatever is not blocked"), ("4. Attack", "all Attacks")],
      "haut": "One combat per turn, four phases, each played once",
      "notes": [["defeated here:", "it does not strike back"], ["Block ≥ Attack:", "all or nothing"], ["Units and/or Hero,", "one attack after another"], ["reach the Armor", "in a single attack"]],
      "bas": "Nothing carries over between phases: an attack that falls short is lost.",
      "alt": "Combat in four phases: Ranged and Siege, Block, Damage, Attack. An enemy defeated in phase 1 does not strike back; a Block must match the Attack; unblocked attacks deal Damage; in phase 4, all Attacks count."}),
    "cap": "Combat is played once in this order, even against several enemies. Phase 3 is the only mandatory one."},
   {"anchor": "Fire, Ice and Resistances", "svg": mk_demi({"titre": "Blocking a Fire Attack 6 with 3 Block cards",
      "etape1": "1. Sort your Blocks", "etape2": "2. Add them up", "etape3": "3. Compare",
      "eff": "Efficient: Ice 3", "effs": "counts in full: 3",
      "ineff": "Inefficient: Physical 3, Fire 2", "ineffs": "(3 + 2) ÷ 2 = 2.5 → 2",
      "total": "Total Block", "totals": "3 + 2 = 5", "res": "5 < Attack 6", "ress": "fails: 6 Damage",
      "note": "Against Fire, only Ice and Cold Fire are efficient; everything else counts half.",
      "alt": "Against a Fire Attack 6: an efficient Ice Block 3 counts 3; Physical Block 3 and Fire Block 2 are inefficient, (3 + 2) ÷ 2 = 2. Total 5, less than 6: the block fails."}),
    "cap": "Example: 3 + (3 + 2) ÷ 2 = 5. One point short: the block fails, and a Block that falls short reduces nothing."},
   {"anchor": "Wounds, Rest and Healing", "svg": mk_blessures({"titre": "Damage is points, Wounds are cards",
      "degats": "5 Damage", "degats2": "3 Damage", "blessures": "Wounds", "heros": "to the Hero, Armor 2:", "heros2": "3 Wound cards in hand",
      "unite": "to a Unit, Armor 3:", "unite2": "1 Wound, all 3 Damage absorbed",
      "note": "Armor does not remove Damage: it says how much Damage each Wound absorbs.",
      "alt": "Damage and Wounds. 5 Damage to a Hero with Armor 2: cut it into slices of 2, the last one incomplete; each slice gives one Wound card, so 3 Wounds. 3 Damage to a Unit with Armor 3: a single slice, a single Wound, and the Unit absorbs all 3 Damage."}),
    "cap": "<b>A common mix-up:</b> Damage is not subtracted from Armor. It is cut into slices the size of the Armor, rounded up, and each slice becomes a Wound card. 5 Damage against Armor 2: 3 Wounds, not 3 Damage “left over”."},
  ],
 },
 "imperium": {
  "fr": [
   {"anchor": "Mélanger votre défausse", "svg": imp_melange({"vide": "Deck vide", "vides": "vous devez Piocher", "jeton": "1 jeton Épuisé libre ?", "jetons": "une fois par tour",
      "melange": "Mélangez", "melanges": "puis continuez à Piocher", "ajout": "Avant de mélanger, ajoutez 1 carte à votre défausse :",
      "sources": [("Pioche Nation", "sa première carte", "s-phase"), ("Avènement", "en dernier : Empire", "s-phase"), ("Développement", "pioche vide : payez-en un", "s-phase")],
      "note": "Vikings : leur Zénith ne retourne rien, il déclenche la fin de partie.",
      "alt": "Deck vide quand vous devez piocher : avec un jeton Épuisé libre, une fois par tour, ajoutez d'abord une carte à votre défausse, la première de la pioche Nation, l'Avènement en dernier, puis un Développement payé quand la pioche Nation est vide ; ensuite mélangez et continuez à piocher."}),
    "cap": "Une carte entre dans votre deck à chaque mélange : d'abord vos cartes Nation, puis l'Avènement, puis les Développements que vous payez."},
  ],
  "en": [
   {"anchor": "Shuffling your discard pile", "svg": imp_melange({"vide": "Deck empty", "vides": "you must Draw", "jeton": "1 free Exhaust token?", "jetons": "once per turn",
      "melange": "Shuffle", "melanges": "then keep Drawing", "ajout": "Before shuffling, add 1 card to your discard pile:",
      "sources": [("Nation deck", "its top card", "s-phase"), ("Accession", "last: Empire", "s-phase"), ("Development", "deck empty: pay for one", "s-phase")],
      "note": "Vikings: their Zenith flips nothing, it triggers the end of the game.",
      "alt": "Deck empty when you must draw: with a free Exhaust token, once per turn, first add a card to your discard pile, the top card of the Nation deck, the Accession last, then a Development you pay for once the Nation deck is empty; then shuffle and keep drawing."}),
    "cap": "One card joins your deck at each shuffle: first your Nation cards, then the Accession, then the Developments you pay for."},
  ],
 },
 "puerto-rico": {
  "fr": [
   {"anchor": "capitaine", "svg": pr_capitaine({"joueurs": ["Capitaine", "Joueur 2", "Joueur 3"],
      "tours": [("1er tour de table", "+++"), ("2e tour", "+-+"), ("3e tour", "--+"), ("4e tour", "---")], "charge": "charge", "rien": "ne peut pas",
      "fin": "Plus personne ne peut charger", "fins": "stockage, puis on vide les navires pleins",
      "note": "Tant qu'un joueur peut charger, on continue : chacun une seule fois par tour de table.",
      "alt": "Le tour de table du Capitaine : trois joueurs chargent au premier tour, deux au deuxième, un seul au troisième, personne au quatrième. Quand plus personne ne peut charger, on stocke puis on vide les navires pleins."}),
    "cap": "Exemple à trois : au 3e tour de table, seul le joueur 3 peut encore charger, alors il charge. Au 4e, plus personne : la phase passe au stockage (chapitre suivant)."},
  ],
  "en": [
   {"anchor": "capitaine", "svg": pr_capitaine({"joueurs": ["Captain", "Player 2", "Player 3"],
      "tours": [("1st time round", "+++"), ("2nd time", "+-+"), ("3rd time", "--+"), ("4th time", "---")], "charge": "loads", "rien": "cannot",
      "fin": "Nobody can load any more", "fins": "storage, then full ships are emptied",
      "note": "As long as someone can load, play goes on: each player once per time round.",
      "alt": "The Captain's rounds: three players load the first time round, two the second, only one the third, nobody the fourth. When nobody can load any more, goods are stored, then full ships are emptied."}),
    "cap": "Example with three players: the 3rd time round, only player 3 can still load, so they load. The 4th time, nobody can: the phase moves on to storage (next chapter)."},
  ],
 },
}

# ------------------------------------------------------------------ schémas ajoutés le 26/11/2026
FIGS["mage-knight"]["fr"] += [
 {"anchor": "Le mana et les Cristaux", "svg": mk_mana({"formes": [("Dé de la Source", "un seul par tour", "relancé à la fin de votre tour"), ("Jeton Mana", "donné par un effet", "perdu s'il ne sert pas ce tour"), ("Cristal", "dans votre Inventaire", "3 par couleur, il se garde")],
    "titre2": "Quelle couleur, et quand ?", "cols": ["Rouge, bleu, blanc, vert", "Or", "Noir"],
    "lignes": [("Jour", [(1, "utilisables"), (1, "joker"), (0, "inutilisable")]), ("Nuit", [(1, "utilisables"), (0, "inutilisable"), (1, "utilisable")])],
    "note": "Il n'existe pas de Cristal or ni de Cristal noir.",
    "alt": "Le mana sous trois formes : un dé de la Source, un seul par tour, relancé à la fin de votre tour ; un jeton, perdu s'il ne sert pas ce tour ; un Cristal, trois par couleur, qui se garde. Le Jour, les quatre couleurs fondamentales et l'or, qui remplace n'importe laquelle, sont utilisables, pas le noir. La Nuit, les couleurs fondamentales et le noir sont utilisables, pas l'or."}),
  "cap": "Le Jour, l'or remplace n'importe quelle couleur fondamentale. La Nuit, l'or ne sert plus et le noir devient utilisable, surtout pour l'effet amélioré des Sorts. Un Cristal se garde d'un tour à l'autre et redevient du mana quand vous le décidez."},
  {"anchor": "Le tour de jeu dans le détail", "svg": mk_tour({"mvt": "Mouvement", "mvts": "facultatif, d'abord", "act": "Une seule action", "acts": "combat, interaction ou site",
    "ou": "ou", "repos": "Repos", "reposs": "ni l'un ni l'autre", "fin": "Fin du tour, dans l'ordre",
    "etapes": [("Dés", "relancer ceux utilisés"), ("Retraite forcée", "si case non sûre"), ("Ranger", "jetons, cartes jouées"), ("Mine, Clairière", "leur effet"),
               ("Récompenses", "du combat"), ("Niveau", "s'il a changé"), ("Défausse libre", "jamais de Blessure"), ("Piocher", "jusqu'à votre Limite")],
    "note": "Après l'action, plus aucun Mouvement.",
    "alt": "Le tour : un Mouvement facultatif puis une seule action, ou bien un Repos. Puis la fin du tour, dans l'ordre : relancer les dés utilisés, Retraite forcée éventuelle, rendre les jetons et défausser les cartes jouées, effet de la Mine ou de la Clairière, récompenses de combat, changement de Niveau, défausse libre sans Blessure, piocher jusqu'à votre Limite."}),
  "cap": "Le Soin et les effets spéciaux se jouent à tout moment du tour, même pendant un Repos, sauf le Soin pendant un combat. Chaque tour, vous devez jouer ou défausser au moins une carte."},
 {"anchor": "Niveaux et Compétences", "svg": mk_niveaux({"titre": "L'Échelle des Niveaux (à la fin du tour)", "depart": "départ",
    "impair": "Niveau impair (3, 5, 7, 9)", "impairs": "Armure ou Limite, + 1 jeton Commandement",
    "pair": "Niveau pair (2, 4, 6, 8, 10)", "pairs": "1 Compétence + 1 Action Avancée",
    "note": "Un Niveau par ligne franchie sur l'Échelle de Gloire, jusqu'au Niveau 10.",
    "alt": "Niveaux 1 à 10. Le Niveau 1 est le départ. Aux Niveaux impairs 3, 5, 7 et 9, l'Armure ou la Limite de cartes augmente et vous recevez un jeton Commandement. Aux Niveaux pairs 2, 4, 6, 8 et 10, vous gagnez une Compétence et une Action Avancée."}),
  "cap": "Niveau pair : révélez deux Compétences de votre pile, gardez-en une et posez l'autre dans l'Offre commune, puis choisissez une Action Avancée dans l'Offre. Toute nouvelle carte va sur le dessus de votre Deck."},
]
FIGS["mage-knight"]["en"] += [
 {"anchor": "Mana and Crystals", "svg": mk_mana({"formes": [("Source die", "only one per turn", "rerolled at the end of your turn"), ("Mana token", "given by an effect", "lost if unused this turn"), ("Crystal", "in your Inventory", "3 per colour, it is kept")],
    "titre2": "Which colour, and when?", "cols": ["Red, blue, white, green", "Gold", "Black"],
    "lignes": [("Day", [(1, "usable"), (1, "wild"), (0, "unusable")]), ("Night", [(1, "usable"), (0, "unusable"), (1, "usable")])],
    "note": "There are no gold or black Crystals.",
    "alt": "Mana in three forms: a Source die, only one per turn, rerolled at the end of your turn; a token, lost if unused this turn; a Crystal, three per colour, which is kept. By Day, the four basic colours and gold, which replaces any of them, are usable, not black. At Night, the basic colours and black are usable, not gold."}),
  "cap": "By Day, gold replaces any basic colour. At Night, gold is useless and black becomes usable, mostly for the stronger effect of Spells. A Crystal is kept from turn to turn and turns back into mana whenever you decide."},
  {"anchor": "The turn in detail", "svg": mk_tour({"mvt": "Movement", "mvts": "optional, first", "act": "A single action", "acts": "combat, interaction or site",
    "ou": "or", "repos": "Rest", "reposs": "neither of them", "fin": "End of turn, in order",
    "etapes": [("Dice", "reroll those used"), ("Withdrawal", "if on an unsafe space"), ("Tidy up", "tokens, played cards"), ("Mine, Glade", "their effect"),
               ("Rewards", "from combat"), ("Level", "if it changed"), ("Free discard", "never a Wound"), ("Draw", "up to your Hand Limit")],
    "note": "After the action, no more Movement.",
    "alt": "The turn: an optional Movement then a single action, or else a Rest. Then the end of turn, in order: reroll used dice, any forced Withdrawal, return tokens and discard played cards, Mine or Glade effect, combat rewards, Level change, free discard without Wounds, draw up to your Hand Limit."}),
  "cap": "Healing and special effects can be played at any time during the turn, even during a Rest, except Healing during a combat. Every turn, you must play or discard at least one card."},
 {"anchor": "Levels and Skills", "svg": mk_niveaux({"titre": "The Level track (at the end of the turn)", "depart": "start",
    "impair": "Odd Level (3, 5, 7, 9)", "impairs": "Armor or Hand Limit, + 1 Command token",
    "pair": "Even Level (2, 4, 6, 8, 10)", "pairs": "1 Skill + 1 Advanced Action",
    "note": "One Level per line crossed on the Fame track, up to Level 10.",
    "alt": "Levels 1 to 10. Level 1 is the start. At odd Levels 3, 5, 7 and 9, Armor or Hand Limit goes up and you receive a Command token. At even Levels 2, 4, 6, 8 and 10, you gain a Skill and an Advanced Action."}),
  "cap": "Even Level: reveal two Skills from your stack, keep one and place the other in the common Offer, then choose an Advanced Action from the Offer. Any new card goes on top of your Deck."},
]
FIGS["imperium"]["fr"] += [
 {"anchor": "Le Marché : Acquérir", "svg": imp_marche({"acq": "Acquérir", "inn": "Innover", "marche": "Marché", "prend": "vous prenez", "main": "Main", "pile": "pile Instabilités",
    "acq1": "La carte arrive en main avec son Instabilité.", "acq2": "Sa remplaçante reçoit une Instabilité.",
    "inn1": "L'Instabilité retourne dans la pile.", "inn2": "Ou : la première carte d'une pioche.",
    "note": "Avec Innover, les effets « lorsque vous Acquérez » ne se déclenchent pas.",
    "alt": "Acquérir : la carte du Marché arrive dans votre main avec la carte Instabilités glissée dessous, et la carte qui la remplace en reçoit une nouvelle. Innover : la carte arrive dans votre main seule, l'Instabilité retourne dans la pile ; vous pouvez aussi prendre la première carte d'une pioche."}),
  "cap": "En rouge : la carte Instabilités glissée sous la carte. Dans les deux cas, vous gagnez les ressources posées sur la carte. La carte qui en remplace une Acquise reçoit une Instabilité, sauf si c'est une Région."},
 {"anchor": "Instabilités, Régions", "svg": imp_zones({"zones": {"marche": ("Marché", "cartes à prendre"), "main": ("Main", "vos cartes"), "deck": ("Deck", "face cachée"), "defausse": ("Défausse", "face visible"),
        "jeu": ("Zone de jeu", "cartes permanentes"), "reserve": ("Réservée", "sous une carte en jeu"), "histoire": ("Histoire", "sous votre Puissance")},
    "fleches": {"acq": "Acquérir · Innover", "pioche": "Piocher", "jouer": "Jouer · Défausser", "melange": "Mélanger", "perm": "Jouer", "rappel": "Rappeler",
        "reserver": "Réserver", "archiver": "Archiver", "abandon": "Abandonner (une Région) : elle part dans la défausse"},
    "note": "Au score, vos cartes comptent partout, Réservées et Histoire comprises.",
    "alt": "Où vont vos cartes. Du Marché à la main : Acquérir ou Innover. Du deck à la main : Piocher. De la main à la défausse : jouer ou défausser. De la défausse au deck : mélanger. De la main à la zone de jeu : jouer une carte permanente ; retour en main : Rappeler. De la main à une carte en jeu : Réserver. Vers l'Histoire, sous votre carte Puissance : Archiver. De la zone de jeu à la défausse : Abandonner une Région."}),
  "cap": "Seules les Régions peuvent être Abandonnées ou Rappelées. Une carte Réservée ou archivée dans votre Histoire n'est plus en jeu, mais ses points comptent."},
 {"anchor": "Fin de partie", "svg": imp_fin({"dec": "Décompte", "decs": [("Déclenché", "en cours de manche"), ("Finir la manche", "Solstice compris"), ("Une manche de plus", "entière, avec Solstice"), ("On compte", "plus de points gagne")],
    "eff": "Effondrement", "effs": [("Pile Instabilités vide", "à l'instant même"), ("Arrêt immédiat", "l'action en cours s'arrête"), ("On compte", "le moins d'Instabilités gagne")],
    "note": "L'Effondrement l'emporte, même si un Décompte est déjà lancé.",
    "alt": "Deux fins. Décompte : une fois déclenché, on finit la manche, Solstice compris, on joue une manche entière de plus, puis on compte ; le plus de points gagne. Effondrement : dès que la pile Instabilités est vide, la partie s'arrête, l'action en cours est interrompue, et le joueur qui a le moins d'Instabilités gagne."}),
  "cap": "Le Décompte se déclenche quand la pioche Principale est vide, quand un joueur Développe sa dernière carte, quand le Roi des rois est retourné face cachée, ou par un effet. Égalité à l'Effondrement : on départage aux points du Décompte."},
]
FIGS["imperium"]["en"] += [
 {"anchor": "The Market: Acquire", "svg": imp_marche({"acq": "Acquire", "inn": "Innovate", "marche": "Market", "prend": "you take", "main": "Hand", "pile": "Unrest pile",
    "acq1": "The card comes to your hand with its Unrest.", "acq2": "Its replacement gets a new Unrest.",
    "inn1": "The Unrest goes back to the pile.", "inn2": "Or: the top card of a deck.",
    "note": "With Innovate, “when you Acquire” effects do not trigger.",
    "alt": "Acquire: the Market card comes to your hand with the Unrest card tucked under it, and the card replacing it gets a new one. Innovate: the card comes to your hand alone, the Unrest goes back to the pile; you may also take the top card of a deck."}),
  "cap": "In red: the Unrest card tucked under the card. Either way, you gain the resources placed on the card. The card replacing an Acquired one gets an Unrest, unless it is a Region."},
 {"anchor": "Unrest, Regions", "svg": imp_zones({"zones": {"marche": ("Market", "cards to take"), "main": ("Hand", "your cards"), "deck": ("Deck", "face down"), "defausse": ("Discard pile", "face up"),
        "jeu": ("Play area", "permanent cards"), "reserve": ("Reserved", "under a card in play"), "histoire": ("History", "under your Power card")},
    "fleches": {"acq": "Acquire · Innovate", "pioche": "Draw", "jouer": "Play · Discard", "melange": "Shuffle", "perm": "Play", "rappel": "Recall",
        "reserver": "Reserve", "archiver": "To History", "abandon": "Abandon (a Region): it goes to the discard pile"},
    "note": "At scoring, your cards count wherever they are, Reserved and History included.",
    "alt": "Where your cards go. From the Market to your hand: Acquire or Innovate. From the deck to your hand: Draw. From your hand to the discard pile: play or discard. From the discard pile to the deck: shuffle. From your hand to the play area: play a permanent card; back to your hand: Recall. From your hand under a card in play: Reserve. Into your History, under your Power card. From the play area to the discard pile: Abandon a Region."}),
  "cap": "Only Regions can be Abandoned or Recalled. A card Reserved or put into your History is no longer in play, but its points count."},
 {"anchor": "End of the game", "svg": imp_fin({"dec": "Countdown", "decs": [("Triggered", "mid-round"), ("Finish the round", "Solstice included"), ("One more round", "full, with Solstice"), ("Count", "most points wins")],
    "eff": "Collapse", "effs": [("Unrest pile empty", "at that very moment"), ("Immediate stop", "the Action in progress ends"), ("Count", "fewest Unrest wins")],
    "note": "Collapse wins out, even if a Countdown is already under way.",
    "alt": "Two endings. Countdown: once triggered, finish the round, Solstice included, play one more full round, then count; most points wins. Collapse: as soon as the Unrest pile is empty, the game stops, the Action in progress is interrupted, and the player with the fewest Unrest wins."}),
  "cap": "The Countdown is triggered when the Main deck is empty, when a player Develops their last card, when King of Kings is flipped face down, or by an effect. Tie at Collapse: break it with Countdown points."},
]
FIGS["puerto-rico"]["fr"] += [
  {"anchor": "batisseur", "svg": pr_carrieres({"titre": "Vous avez 3 Carrières occupées. Combien comptent ?",
    "h1": "Rangée du bâtiment", "h2": "Plafond", "h3": "Vos 3 Carrières", "h4": "Exemple du livret",
    "lignes": [("1re rangée", 1, "Dépôt de Matériaux : 2 − 1 = 1"), ("2e rangée", 2, "Comptoir : 5 − 2 = 3"), ("3e rangée", 3, "Port : 8 − 3 = 5"), ("Grands bâtiments", 4, "Palais du Gouverneur : 10 − 3 = 7")],
    "l1": "compte : 1 Peso de moins", "l2": "au-delà du plafond : ne compte pas",
    "note": "Privilège du Bâtisseur : encore 1 de moins. Jamais moins de 0.",
    "alt": "Avec 3 Carrières occupées, le plafond dépend de la rangée du bâtiment. 1re rangée, plafond 1 : une seule compte, le Dépôt de Matériaux coûte 2 − 1 = 1. 2e rangée, plafond 2 : deux comptent, le Comptoir coûte 5 − 2 = 3. 3e rangée, plafond 3 : les trois comptent, le Port coûte 8 − 3 = 5. Grands bâtiments, plafond 4 : les trois comptent, le Palais du Gouverneur coûte 10 − 3 = 7."}),
  "cap": "Chaque Carrière occupée retire 1 Peso, sans dépasser le plafond de la rangée où se trouve le bâtiment sur le plateau."},
]
FIGS["puerto-rico"]["en"] += [
  {"anchor": "batisseur", "svg": pr_carrieres({"titre": "You have 3 occupied Quarries. How many count?",
    "h1": "Building's section", "h2": "Cap", "h3": "Your 3 Quarries", "h4": "Rulebook example",
    "lignes": [("Top section", 1, "Builders Yard: 2 − 1 = 1"), ("Second section", 2, "Office: 5 − 2 = 3"), ("Third section", 3, "Harbor: 8 − 3 = 5"), ("Large Buildings", 4, "City Hall: 10 − 3 = 7")],
    "l1": "counts: 1 coin less", "l2": "beyond the cap: does not count",
    "note": "Builder's advantage: 1 less again. Never below 0.",
    "alt": "With 3 occupied Quarries, the cap depends on the Building's section. Top section, cap 1: only one counts, the Builders Yard costs 2 − 1 = 1. Second section, cap 2: two count, the Office costs 5 − 2 = 3. Third section, cap 3: all three count, the Harbor costs 8 − 3 = 5. Large Buildings, cap 4: all three count, City Hall costs 10 − 3 = 7."}),
  "cap": "Each occupied Quarry takes 1 coin off, without going beyond the cap of the section the Building is in on the board."},
]

# Où insérer : sélecteur du conteneur du chapitre, élément après lequel poser le schéma.
OU = {
 "mage-knight": "function(a){var h=[].find.call(document.querySelectorAll('.app-tuto .chtitle'),function(e){return e.textContent.trim()===a});if(!h)return null;var p=h.parentNode;return p.querySelector('ul.rules')||h}",
 "puerto-rico": "function(a){var s=document.getElementById('ch-'+a);return s&&s.querySelector('ol.rules')}",
 "imperium": "function(a){var h=[].find.call(document.querySelectorAll('#main h3, #main h2'),function(e){return e.textContent.trim().indexOf(a)===0});if(!h)return null;var n=h.nextElementSibling,p=null;while(n&&n.tagName!=='OL'&&n.tagName!=='H2'){if(!p&&n.tagName==='P')p=n;n=n.nextElementSibling}return n&&n.tagName==='OL'?n:(p||h)}",
}

# Couleurs : variables de chaque appli (fond, trait, texte), donc justes dans les deux thèmes.
VARS = {
 "mage-knight": dict(surface="var(--panel)", accent="var(--accent)", ink="var(--ink)", muted="var(--muted)", warn="var(--bad)", ok="var(--good)"),
 "imperium": dict(surface="var(--surface)", accent="var(--accent)", ink="var(--ink)", muted="var(--muted)", warn="var(--bad)", ok="var(--ok)"),
 "puerto-rico": dict(surface="var(--surface)", accent="var(--accent)", ink="var(--ink)", muted="var(--muted)", warn="var(--bad,#b3372f)", ok="var(--ok,#2c7a3f)"),
}


def css(v):
    return (".lrmp-fig{margin:18px 0 6px;padding:12px 12px 10px;border:1px solid " + v["muted"] + ";border-color:color-mix(in srgb," + v["muted"] + " 35%,transparent);border-radius:12px}"
            ".lrmp-fig svg{display:block;width:100%;height:auto}"
            ".lrmp-fig figcaption{margin-top:8px;font-size:.92em;color:" + v["muted"] + ";line-height:1.45}"
            f".s-phase{{fill:color-mix(in srgb,{v['accent']} 12%,{v['surface']});stroke:{v['accent']};stroke-width:1}}"
            f".s-warn{{fill:color-mix(in srgb,{v['warn']} 12%,{v['surface']});stroke:{v['warn']};stroke-width:1}}"
            f".s-ok{{fill:{v['accent']}}}.s-half{{fill:color-mix(in srgb,{v['accent']} 40%,{v['surface']});stroke:{v['accent']};stroke-width:1;stroke-dasharray:4 3}}"
            f".s-no{{fill:none;stroke:{v['muted']};stroke-width:1;stroke-dasharray:4 3}}"
            f".s-t{{fill:{v['ink']};font-size:15px;font-weight:600}}.s-s{{fill:{v['muted']};font-size:13px}}.s-em{{fill:{v['warn']};font-weight:600}}"
            f".s-in{{fill:{v['surface']};font-size:13px;font-weight:700}}"
            f".s-dmg{{fill:{v['warn']}}}.s-card{{fill:{v['surface']};stroke:{v['ink']};stroke-width:1.5}}.s-brace{{fill:none;stroke:{v['muted']};stroke-width:1.5}}"
            f".s-arr{{stroke:{v['muted']};stroke-width:1.5}}.s-mk{{fill:none;stroke:{v['muted']};stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round}}"
            f".s-path{{fill:none;stroke:{v['accent']};stroke-width:2;stroke-dasharray:6 4}}.s-limit{{stroke:{v['warn']};stroke-width:2;stroke-dasharray:5 4}}")


def bloc(dossier, lang):
    figs = [{"a": f["anchor"], "h": f'<figure class="lrmp-fig">{f["svg"]}<figcaption>{f["cap"]}</figcaption></figure>'}
            for f in FIGS[dossier][lang]]
    js = ("(function(){var F=" + json.dumps(figs, ensure_ascii=False) + ",OU=" + OU[dossier] + ";"
          "function place(){F.forEach(function(f,i){var e=OU(f.a);if(!e)return;var n=e.nextElementSibling;"
          "if(n&&n.dataset&&n.dataset.fig==String(i))return;var d=document.createElement('div');d.innerHTML=f.h;var fig=d.firstChild;"
          "fig.dataset.fig=String(i);e.insertAdjacentElement('afterend',fig)})}"
          "var busy=false;function run(){if(busy)return;busy=true;try{place()}finally{busy=false}}"
          "run();new MutationObserver(function(){requestAnimationFrame(run)}).observe(document.body,{childList:true,subtree:true})})();")
    return ("<!--schemas-->\n<style id=\"schemas-css\">" + css(VARS[dossier]) + "</style>\n<script id=\"schemas-js\">" + js + "</script>\n<!--/schemas-->")


def apply(dossier):
    for lang in available(os.path.join(ROOT, dossier)):
        if lang not in FIGS[dossier]:
            continue
        p = os.path.join(ROOT, dossier, "index.html" if lang == "fr" else lang + ".html")
        s = open(p, encoding="utf-8").read()
        s = re.sub(r"\n?<!--schemas-->.*?<!--/schemas-->", "", s, flags=re.S)
        i = s.rindex("</body>")
        s = s[:i].rstrip("\n") + "\n" + bloc(dossier, lang) + "\n" + s[i:]
        open(p, "w", encoding="utf-8").write(s)
        print("schémas :", os.path.relpath(p, ROOT))


if __name__ == "__main__":
    args = sys.argv[1:]
    if not args:
        sys.exit(__doc__)
    for d in (list(FIGS) if args == ["--tout"] else [a.strip("/") for a in args]):
        apply(d)
