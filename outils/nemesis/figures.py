#!/usr/bin/env python3
"""Schémas du tutoriel Nemesis : écrit 5-figures.js (FR) et en/5-figures.js (EN).
Une seule géométrie, deux jeux de textes. Les couleurs viennent des variables de l'appli (thèmes clair et sombre).
FIG[id du chapitre] = {svg, alt, cap} : 6-app.js l'affiche sous les points de règle du chapitre.
usage (racine du dépôt) : python3 outils/nemesis/figures.py, puis sh outils/nemesis/build.sh
"""
import json, pathlib

ICI = pathlib.Path(__file__).resolve().parent

def jeton(x, y, r, lettre):
    return (f'<circle class="f-int" cx="{x}" cy="{y}" r="{r}"/>'
            f'<text class="f-intt" x="{x}" y="{y}" text-anchor="middle" dominant-baseline="central">{lettre}</text>')

def moi(x, y, mot):
    return (f'<circle class="f-me" cx="{x}" cy="{y}" r="22"/>'
            f'<text class="f-met" x="{x}" y="{y}" text-anchor="middle" dominant-baseline="central">{mot}</text>')

def boite(x, y, w, titre, sous, vide=False):
    cls = 'f-box f-vide' if vide else 'f-box'
    cx = x + w / 2
    return (f'<rect class="{cls}" x="{x}" y="{y}" width="{w}" height="54" rx="8"/>'
            f'<text class="fth" x="{cx}" y="{y+19}" text-anchor="middle" dominant-baseline="central">{titre}</text>'
            f'<text class="fts" x="{cx}" y="{y+38}" text-anchor="middle" dominant-baseline="central">{sous}</text>')

def svg(h, corps, titre, y0=0):
    return (f'<svg viewBox="0 {y0} 680 {h}" role="img" aria-label="{titre}">'
            '<defs><marker id="f-fl" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">'
            '<path class="f-mk" d="M2 1L8 5L2 9"/></marker>'
            '<marker id="f-fl2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">'
            '<path class="f-mk f-mk2" d="M2 1L8 5L2 9"/></marker>'
            '<marker id="f-fl3" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">'
            '<path class="f-mk f-mk3" d="M2 1L8 5L2 9"/></marker></defs>'
            + corps + '</svg>')

# ------------------------------------------------------------ 1. attaques d'opportunité (chapitre deplacement)
def fig_opportunite(t):
    c = (f'<rect class="f-room" x="40" y="40" width="200" height="160" rx="8"/>'
         f'<text class="fth" x="140" y="62" text-anchor="middle" dominant-baseline="central">{t["salle"]}</text>'
         f'<rect class="f-room" x="440" y="40" width="200" height="160" rx="8"/>'
         f'<text class="fth" x="540" y="62" text-anchor="middle" dominant-baseline="central">{t["arrivee"]}</text>'
         f'<rect class="f-cor" x="240" y="112" width="200" height="40"/>'
         f'<text class="fts" x="340" y="172" text-anchor="middle" dominant-baseline="central">{t["couloir"]}</text>'
         + moi(90, 150, t['vous']) + jeton(175, 125, 16, t['A']) + jeton(175, 172, 12, t['L'])
         + jeton(305, 132, 17, t['G']) + jeton(375, 132, 16, t['A'])
         + '<path class="f-path" d="M90 126 L90 98 L540 98 L540 120" marker-end="url(#f-fl)"/>'
         f'<text class="fts" x="340" y="84" text-anchor="middle" dominant-baseline="central">{t["depl"]}</text>'
         + boite(40, 232, 135, t['a1'], t['a1s']) + boite(195, 232, 135, t['a2'], t['a2s'])
         + boite(350, 232, 135, t['a3'], t['a3s']) + boite(505, 232, 135, t['a4'], t['a4s'], vide=True)
         + f'<text class="fts" x="340" y="312" text-anchor="middle" dominant-baseline="central">{t["leg"]}</text>')
    return svg(330, c, t['alt'])

# ------------------------------------------------------------ 2. déplacement des Intrus (chapitre depl-intrus)
def panneau(x, t, apres):
    c = (f'<text class="fth" x="{x+150}" y="36" text-anchor="middle" dominant-baseline="central">{t["apres"] if apres else t["avant"]}</text>'
         f'<rect class="f-room" x="{x+150}" y="62" width="140" height="130" rx="8"/>'
         f'<rect class="f-cor" x="{x+10}" y="110" width="140" height="40"/>'
         f'<text class="fts" x="{x+80}" y="170" text-anchor="middle" dominant-baseline="central">{t["couloir"]}</text>')
    if not apres:
        c += (jeton(x+40, 130, 17, t['G']) + jeton(x+82, 130, 15, t['A']) + jeton(x+120, 130, 12, t['L'])
              + moi(x+235, 127, t['vous'])
              + f'<path class="f-path f-int-path" d="M{x+40} 104 L{x+40} 86 L{x+190} 86 L{x+190} 104" marker-end="url(#f-fl2)"/>')
    else:
        c += (jeton(x+82, 130, 15, t['A']) + jeton(x+120, 130, 12, t['L'])
              + jeton(x+185, 127, 17, t['G']) + moi(x+248, 127, t['vous'])
              + f'<text class="fts f-warn" x="{x+215}" y="172" text-anchor="middle" dominant-baseline="central">{t["attaque"]}</text>'
              + f'<text class="fts" x="{x+80}" y="210" text-anchor="middle" dominant-baseline="central">{t["restent"]}</text>')
    return c

def fig_intrus(t):
    c = panneau(30, t, False) + '<line class="f-sep" x1="340" y1="30" x2="340" y2="200"/>' + panneau(350, t, True)
    c += f'<text class="fts" x="340" y="246" text-anchor="middle" dominant-baseline="central">{t["leg"]}</text>'
    return svg(264, c, t['alt'])

# ------------------------------------------------------------ 3. couloirs et portes (chapitre plateau)
def fig_plateau(t):
    c = ''
    for x in (40, 275, 510):
        c += (f'<rect class="f-room" x="{x}" y="60" width="130" height="90" rx="8"/>'
              f'<text class="fts" x="{x+65}" y="80" text-anchor="middle" dominant-baseline="central">{t["salle"]}</text>')
    c += ('<rect class="f-cor" x="170" y="92" width="105" height="26"/>'
          '<text class="fth" x="222" y="105" text-anchor="middle" dominant-baseline="central">2</text>'
          '<rect class="f-seuil" x="266" y="87" width="9" height="36" rx="1"/>'
          '<rect class="f-cor" x="405" y="92" width="105" height="26"/>'
          '<text class="fth" x="452" y="105" text-anchor="middle" dominant-baseline="central">4</text>'
          '<rect class="f-porte" x="499" y="86" width="11" height="38" rx="2"/>'
          '<path class="f-cor-open" d="M92 150 L92 215 M118 150 L118 215"/>'
          '<path class="f-cor-end" d="M92 215 L118 215"/>'
          '<text class="fth" x="105" y="183" text-anchor="middle" dominant-baseline="central">1</text>'
          '<rect class="f-renf" x="562" y="150" width="26" height="65"/>'
          '<text class="fth" x="575" y="183" text-anchor="middle" dominant-baseline="central">0</text>'
          '<line class="f-lead" x1="105" y1="220" x2="110" y2="246"/>'
          '<line class="f-lead" x1="270" y1="126" x2="265" y2="246"/>'
          '<line class="f-lead" x1="504" y1="127" x2="420" y2="246"/>'
          '<line class="f-lead" x1="575" y1="220" x2="575" y2="246"/>')
    for cx, (a, b) in zip((110, 265, 420, 575), t['notes']):
        c += (f'<text class="fth" x="{cx}" y="262" text-anchor="middle" dominant-baseline="central">{a}</text>'
              f'<text class="fts" x="{cx}" y="282" text-anchor="middle" dominant-baseline="central">{b}</text>')
    return svg(255, c, t['alt'], y0=45)


# ------------------------------------------------------------ 4. une manche (chapitre manche)
def fig_manche(t):
    c = ''
    for i, (a, b) in enumerate(t['phases']):
        x = 40 + i * 155
        c += boite(x, 30, 135, a, b).replace('class="f-box"', 'class="f-phase"')
        if i < 3:
            c += f'<line class="f-arr" x1="{x+137}" y1="57" x2="{x+152}" y2="57" marker-end="url(#f-fl3)"/>'
    c += f'<text class="fts" x="340" y="106" text-anchor="middle" dominant-baseline="central">{t["boucle"]}</text>'
    x0, w = 61, 40
    for n in range(1, 15):
        x = x0 + (n - 1) * w
        cls = 'f-case f-cur' if n == 6 else 'f-case'
        c += f'<rect class="{cls}" x="{x}" y="160" width="{w-4}" height="32" rx="3"/>'
        c += f'<text class="{"f-curt" if n == 6 else "fts"}" x="{x+18}" y="176" text-anchor="middle" dominant-baseline="central">{n}</text>'
    cx = lambda n: x0 + (n - 1) * w + 18
    c += (f'<text class="fts" x="40" y="138" dominant-baseline="central">{t["compte"]}</text>'
          f'<rect class="f-tok" x="{cx(10)-15}" y="132" width="30" height="20" rx="3"/>'
          f'<text class="f-tokt" x="{cx(10)}" y="142" text-anchor="middle" dominant-baseline="central">{t["vtok"]}</text>'
          f'<text class="fts" x="{cx(10)+22}" y="142" dominant-baseline="central">{t["vaisseau"]}</text>'
          f'<rect class="f-tok f-tokb" x="{cx(11)-15}" y="200" width="30" height="20" rx="3"/>'
          f'<text class="f-tokt f-tokbt" x="{cx(11)}" y="210" text-anchor="middle" dominant-baseline="central">{t["atok"]}</text>'
          f'<text class="fts" x="{cx(11)+22}" y="210" dominant-baseline="central">{t["auto"]}</text>'
          f'<line class="f-lead" x1="{cx(6)}" y1="196" x2="{cx(6)}" y2="214"/>'
          f'<text class="fts" x="{cx(6)}" y="226" text-anchor="middle" dominant-baseline="central">{t["cours"]}</text>'
          f'<text class="fts" x="{cx(14)}" y="142" text-anchor="middle" dominant-baseline="central">{t["fin"]}</text>')
    return svg(245, c, t['alt'])

# ------------------------------------------------------------ 5. santé et armure (chapitre sante)
def piste(y, t, cube, armure):
    secs = [(t['forme'], 3), (t['affaibli'], 3), (t['critique'], 3)]
    c, x, k = '', 150, 0
    for nom, n in secs:
        wsec = n * 38 - 4
        c += f'<text class="fts" x="{x + wsec/2}" y="{y-14}" text-anchor="middle" dominant-baseline="central">{nom}</text>'
        for j in range(n):
            c += f'<rect class="f-case" x="{x + j*38}" y="{y}" width="34" height="34" rx="3"/>'
            if k == cube:
                c += f'<rect class="f-cube" x="{x + j*38 + 8}" y="{y+8}" width="18" height="18" rx="2"/>'
            k += 1
        if nom == t['critique'] and armure:
            c += (f'<rect class="f-armure" x="{x-2}" y="{y+40}" width="{wsec+4}" height="22" rx="4"/>'
                  f'<text class="f-armt" x="{x + wsec/2}" y="{y+51}" text-anchor="middle" dominant-baseline="central">{t["armure"]}</text>')
        if nom == t['critique'] and not armure:
            c += (f'<rect class="f-armure f-detruite" x="{x-2}" y="{y+40}" width="{wsec+4}" height="22" rx="4"/>'
                  f'<text class="f-armt f-detruitet" x="{x + wsec/2}" y="{y+51}" text-anchor="middle" dominant-baseline="central">{t["detruite"]}</text>')
        x += wsec + 16
    c += (f'<rect class="f-case f-crane" x="{x}" y="{y}" width="34" height="34" rx="3"/>'
          f'<text class="fts" x="{x+17}" y="{y+17}" text-anchor="middle" dominant-baseline="central">✕</text>'
          f'<text class="fts" x="{x+17}" y="{y-14}" text-anchor="middle" dominant-baseline="central">{t["mort"]}</text>')
    return c

def fig_sante(t):
    c = (f'<text class="fth" x="40" y="62" dominant-baseline="central">{t["avant"]}</text>' + piste(45, t, 5, True)
         + f'<text class="fth" x="40" y="172" dominant-baseline="central">{t["apres"]}</text>' + piste(155, t, 6, False)
         + f'<text class="fts" x="340" y="252" text-anchor="middle" dominant-baseline="central">{t["note"]}</text>')
    return svg(270, c, t['alt'])

# ------------------------------------------------------------ 6. la Reine (chapitre reine)
def fig_reine(t):
    c = f'<text class="fts" x="340" y="22" text-anchor="middle" dominant-baseline="central">{t["piste"]}</text>'
    x0 = 205
    for n in range(5):
        x = x0 + n * 56
        c += f'<rect class="f-case{" f-bout" if n == 4 else ""}" x="{x}" y="40" width="50" height="40" rx="3"/>'
        c += f'<text class="fts" x="{x+25}" y="92" text-anchor="middle" dominant-baseline="central">{t["bout"] if n == 4 else n}</text>'
    c += (f'<rect class="f-cube f-cube-old" x="{x0+3*56+16}" y="51" width="18" height="18" rx="2"/>'
          f'<rect class="f-cube" x="{x0+4*56+16}" y="51" width="18" height="18" rx="2"/>'
          f'<path class="f-path" d="M{x0+3*56+25} 46 Q{x0+3*56+53} 28 {x0+4*56+22} 46" marker-end="url(#f-fl)"/>'
          f'<text class="fts" x="40" y="60" dominant-baseline="central">{t["rafale"]}</text>'
          f'<text class="fts" x="40" y="78" dominant-baseline="central">{t["ignore"]}</text>')
    etapes = t['etapes']
    for i, (a, b) in enumerate(etapes):
        x = 40 + i * 205
        c += boite(x, 128, 190, a, b).replace('class="f-box"', 'class="f-phase"')
        if i < 2:
            c += f'<line class="f-arr" x1="{x+192}" y1="155" x2="{x+203}" y2="155" marker-end="url(#f-fl3)"/>'
    c += (f'<line class="f-arr" x1="{x0+4*56+25}" y1="102" x2="{x0+4*56+25}" y2="120" marker-end="url(#f-fl3)"/>'
          f'<text class="fts" x="340" y="212" text-anchor="middle" dominant-baseline="central">{t["note"]}</text>')
    return svg(230, c, t['alt'])

FR = {
 'deplacement': {
  'svg': fig_opportunite({'salle': 'Votre salle', 'arrivee': "Salle d'arrivée", 'couloir': 'Couloir 3', 'vous': 'Vous', 'depl': 'Votre déplacement',
        'G': 'G', 'A': 'A', 'L': 'L', 'a1': '1. Guerrier', 'a1s': 'le plus gros', 'a2': '2. Adulte', 'a2s': 'du couloir',
        'a3': '3. Adulte', 'a3s': 'de votre salle', 'a4': 'Larve', 'a4s': 'rien : 3 au plus',
        'leg': 'G Guerrier · A Adulte · L Larve',
        'alt': "Attaques d'opportunité : vous quittez une salle qui contient un Adulte et une Larve par un couloir qui contient un Guerrier et un Adulte. Le Guerrier, puis les deux Adultes attaquent ; la Larve n'attaque pas."}),
  'cap': "Exemple : 4 Intrus pourraient attaquer, mais 3 au plus le font, du plus gros au plus petit. La Larve, la plus petite, n'attaque pas."},
 'depl-intrus': {
  'svg': fig_intrus({'avant': 'Avant', 'apres': 'Après', 'couloir': 'Couloir', 'vous': 'Vous', 'G': 'G', 'A': 'A', 'L': 'L',
        'attaque': 'attaque', 'restent': 'restent dans le couloir', 'leg': 'G Guerrier · A Adulte · L Larve',
        'alt': "Déplacement des Intrus : un Guerrier, un Adulte et une Larve doivent entrer dans votre salle depuis le couloir. Seul le Guerrier entre et attaque ; l'Adulte et la Larve restent dans le couloir."}),
  'cap': "Exemple : les trois Intrus du couloir doivent entrer dans votre salle. Seul le plus gros entre, et il attaque aussitôt (sauf jeton Sécurisation) ; les autres restent dans le couloir."},
 'plateau': {
  'svg': fig_plateau({'salle': 'Salle', 'notes': [('Couloir inexploré', 'une seule salle'), ('Porte ouverte', 'le seuil de porte'),
        ('Porte fermée', 'bloque, sauf le bruit'), ('Couloir renforcé', 'valeur de bruit 0')],
        'alt': "Couloirs et portes : un couloir inexploré relié à une seule salle, un seuil de porte qui signale une porte ouverte, une porte fermée qui bloque, et un couloir renforcé de valeur 0."}),
  'cap': "Le chiffre d'un couloir est sa valeur de bruit : c'est lui que désigne le dé Bruit. Un couloir renforcé vaut 0, aucun résultat ne le désigne."},
}
EN = {
 'deplacement': {
  'svg': fig_opportunite({'salle': 'Your Room', 'arrivee': 'Destination Room', 'couloir': 'Corridor 3', 'vous': 'You', 'depl': 'Your Move',
        'G': 'D', 'A': 'A', 'L': 'L', 'a1': '1. Drone', 'a1s': 'the largest', 'a2': '2. Adult', 'a2s': 'in the Corridor',
        'a3': '3. Adult', 'a3s': 'in your Room', 'a4': 'Larva', 'a4s': 'nothing: 3 at most',
        'leg': 'D Drone · A Adult · L Larva',
        'alt': 'Opportunity Attacks: you leave a Room holding an Adult and a Larva through a Corridor holding a Drone and an Adult. The Drone, then both Adults Attack; the Larva does not.'}),
  'cap': 'Example: 4 Intruders could Attack, but 3 at most do, from largest to smallest. The Larva, the smallest, does not Attack.'},
 'depl-intrus': {
  'svg': fig_intrus({'avant': 'Before', 'apres': 'After', 'couloir': 'Corridor', 'vous': 'You', 'G': 'D', 'A': 'A', 'L': 'L',
        'attaque': 'Attacks', 'restent': 'stay in the Corridor', 'leg': 'D Drone · A Adult · L Larva',
        'alt': 'Intruder movement: a Drone, an Adult and a Larva must enter your Room from the Corridor. Only the Drone enters and Attacks; the Adult and the Larva stay in the Corridor.'}),
  'cap': 'Example: the three Intruders in the Corridor must enter your Room. Only the largest enters, and it Attacks at once (unless there is a Secure token); the others stay in the Corridor.'},
 'plateau': {
  'svg': fig_plateau({'salle': 'Room', 'notes': [('Unexplored Corridor', 'one Room only'), ('Open Door', 'the Door threshold'),
        ('Closed Door', 'blocks, except Noise'), ('Reinforced Corridor', 'Noise value 0')],
        'alt': 'Corridors and Doors: an Unexplored Corridor linked to a single Room, a Door threshold marking an open Door, a closed Door that blocks, and a Reinforced Corridor worth 0.'}),
  'cap': "A Corridor's number is its Noise value: that is what the Noise die points to. A Reinforced Corridor is worth 0, no result points to it."},
}


FR.update({
 'manche': {
  'svg': fig_manche({'phases': [('1. Joueurs', '2 actions chacun'), ('2. Intrus', 'feu, puis attaques'), ('3. Événement', 'carte, puis sac'), ('4. Nettoyage', '5 cartes, +1 case')],
        'boucle': '↻ manche suivante, 14 au plus', 'compte': 'Compte-tours', 'vtok': 'V', 'vaisseau': 'Vaisseau', 'atok': 'A',
        'auto': 'Autodestruction', 'cours': 'manche en cours', 'fin': 'fin',
        'alt': "Une manche : phase Joueurs, phase Intrus, phase Événement, phase Nettoyage, puis manche suivante. Sur le compte-tours de 14 cases, le jeton Vaisseau est en case 10 ; un jeton Autodestruction posé en manche 6 va en case 11."}),
  'cap': "Le compte-tours avance d'une case à chaque Nettoyage. Exemple : l'autodestruction lancée en manche 6 se pose en case 11 ; le complexe explose quand le compte-tours l'atteint."},
 'sante': {
  'svg': fig_sante({'forme': 'En forme', 'affaibli': 'Affaibli', 'critique': 'État critique', 'mort': 'Mort', 'armure': 'Armure', 'detruite': 'Armure détruite',
        'avant': 'Avant', 'apres': 'Après', 'note': "Nombre de cases simplifié : seul l'ordre des sections compte ici.",
        'alt': "Santé et armure : le cube est sur la dernière case de la section Affaibli, avec une armure sur État critique. Après la perte de 2 points, l'armure est détruite à la place du premier point et le cube passe sur la première case d'État critique."}),
  'cap': "Exemple : vous perdez 2 points de santé. Le cube entre en État critique : l'armure est détruite au lieu du 1er point, puis le cube avance d'une case pour le 2e."},
 'reine': {
  'svg': fig_reine({'piste': 'Piste des touches portées à la Reine', 'bout': 'bout', 'rafale': 'Rafale : 3 touches', 'ignore': '1 suffit, 2 ignorées',
        'etapes': [('Carte Santé', 'révélez la 1re carte'), ('Défaussez', 'autant que son numéro'), ('Effet, cube à 0', 'puis défaussez-la')],
        'note': 'Longueur de piste simplifiée. Plus de carte Santé : la Reine meurt.',
        'alt': "La Reine : le cube de sa piste des touches est sur l'avant-dernière case. Une rafale de 3 touches l'amène au bout : les 2 autres touches sont ignorées. On révèle une carte Santé, on défausse autant de cartes que son numéro, on applique l'effet et le cube revient à 0."}),
  'cap': "Exemple : le cube est sur l'avant-dernière case et votre rafale donne 3 touches. La 1re l'amène au bout, les 2 autres sont ignorées : vous résolvez une carte Santé."},
})
EN.update({
 'manche': {
  'svg': fig_manche({'phases': [('1. Player', '2 Actions each'), ('2. Intruder', 'Fire, then Attacks'), ('3. Event', 'card, then bag'), ('4. Cleanup', '5 cards, +1 space')],
        'boucle': '↻ next Round, 14 at most', 'compte': 'Round track', 'vtok': 'L', 'vaisseau': 'Lander', 'atok': 'A',
        'auto': 'Autodestruction', 'cours': 'current Round', 'fin': 'end',
        'alt': 'A Round: Player Phase, Intruder Phase, Event Phase, Cleanup Phase, then the next Round. On the 14-space Round track, the Lander token is on space 10; an Autodestruction token placed in Round 6 goes on space 11.'}),
  'cap': 'The Round track moves one space at each Cleanup. Example: Autodestruction started in Round 6 goes on space 11; the Facility explodes when the Round track reaches it.'},
 'sante': {
  'svg': fig_sante({'forme': 'Healthy', 'affaibli': 'Injured', 'critique': 'Heavily Injured', 'mort': 'Death', 'armure': 'Armor', 'detruite': 'Armor destroyed',
        'avant': 'Before', 'apres': 'After', 'note': 'Number of spaces simplified: only the order of the sections matters here.',
        'alt': 'Health and Armor: the marker is on the last Injured space, with Armor on Heavily Injured. After losing 2 Health, the Armor is destroyed instead of the first point and the marker moves to the first Heavily Injured space.'}),
  'cap': 'Example: you lose 2 Health. The marker enters Heavily Injured: the Armor is destroyed instead of the 1st point, then the marker moves one space for the 2nd.'},
 'reine': {
  'svg': fig_reine({'piste': "Queen's Hit track", 'bout': 'end', 'rafale': 'Burst: 3 Hits', 'ignore': '1 is enough, 2 ignored',
        'etapes': [('Health card', 'reveal the top card'), ('Discard', 'as many as its number'), ('Effect, marker to 0', 'then discard it')],
        'note': 'Track length simplified. No Health card left: the Queen dies.',
        'alt': "The Queen: the marker on her Hit track is on the second-to-last space. A 3-Hit Burst brings it to the end: the other 2 Hits are ignored. Reveal a Health card, discard as many cards as its number, apply the effect and reset the marker to 0."}),
  'cap': 'Example: the marker is on the second-to-last space and your Burst deals 3 Hits. The 1st brings it to the end, the other 2 are ignored: you resolve a Health card.'},
})

def ecrire(chemin, data, entete):
    js = entete + 'const FIG=' + json.dumps(data, ensure_ascii=False, indent=0) + ';\n'
    chemin.write_text(js, encoding='utf-8')
    print(chemin)

ecrire(ICI / '5-figures.js', FR, '/* ---------- schémas du tutoriel (générés par figures.py, ne pas modifier à la main) ---------- */\n')
ecrire(ICI / 'en' / '5-figures.js', EN, '/* ---------- tutorial diagrams (generated by figures.py, do not edit by hand) ---------- */\n')
