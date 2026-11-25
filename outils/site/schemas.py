#!/usr/bin/env python3
"""Schémas des tutoriels de Mage Knight, Imperium et Puerto Rico (même esprit que outils/nemesis/figures.py).

usage : python3 outils/site/schemas.py <dossier>      (mage-knight, imperium, puerto-rico)
        python3 outils/site/schemas.py --tout

Pose dans chaque page (FR, EN) un bloc <!--schemas-->…<!--/schemas--> avant </body> : styles des schémas
(couleurs tirées des variables de l'appli, donc justes en thème clair et sombre) et un petit script qui insère
chaque schéma sous les règles du bon chapitre, à chaque affichage (les chapitres sont redessinés par l'appli).
Rejouable. À relancer après une reconstruction de la page (build_mk.sh, build_imp.sh, assembler.py puerto-rico).
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

# Où insérer : sélecteur du conteneur du chapitre, élément après lequel poser le schéma.
OU = {
 "mage-knight": "function(a){var h=[].find.call(document.querySelectorAll('.app-tuto .chtitle'),function(e){return e.textContent.trim()===a});if(!h)return null;var p=h.parentNode;return p.querySelector('ul.rules')||h}",
 "puerto-rico": "function(a){var s=document.getElementById('ch-'+a);return s&&s.querySelector('ol.rules')}",
 "imperium": "function(a){var h=[].find.call(document.querySelectorAll('#main h3, #main h2'),function(e){return e.textContent.trim().indexOf(a)===0});if(!h)return null;var n=h.nextElementSibling;while(n&&n.tagName!=='OL')n=n.nextElementSibling;return n||h}",
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
