#!/usr/bin/env python3
"""Schémas du tutoriel Nemesis : écrit contenu/fr/schemas.js et contenu/en/schemas.js (format commun).
Une seule géométrie, deux jeux de textes. Les couleurs viennent des variables de l'appli (thèmes clair et sombre).
FIG[id du chapitre] = {svg, alt, cap} : 6-app.js l'affiche sous les points de règle du chapitre.
usage (racine du dépôt) : python3 outils/nemesis/figures.py, puis python3 outils/site/assembler.py nemesis et seo.py
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
    secs = [(t['forme'], 3), (t['affaibli'], 3), (t['critique'], 3), ('', 1)]
    c, x, k = '', 150, 0
    for nom, n in secs:
        wsec = n * 38 - 4
        if nom:
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
         )
    return svg(240, c, t['alt'])

# ------------------------------------------------------------ 6. la Reine (chapitre reine)
def fig_reine(t):
    c = f'<text class="fts" x="340" y="22" text-anchor="middle" dominant-baseline="central">{t["piste"]}</text>'
    x0 = 205
    for n in range(6):
        x = x0 + n * 56
        c += f'<rect class="f-case{" f-bout" if n == 5 else ""}" x="{x}" y="40" width="50" height="40" rx="3"/>'
        c += f'<text class="fts" x="{x+25}" y="92" text-anchor="middle" dominant-baseline="central">{t["bout"] if n == 5 else n}</text>'
    c += (f'<rect class="f-cube f-cube-old" x="{x0+4*56+16}" y="51" width="18" height="18" rx="2"/>'
          f'<rect class="f-cube" x="{x0+5*56+16}" y="51" width="18" height="18" rx="2"/>'
          f'<path class="f-path" d="M{x0+4*56+25} 46 Q{x0+4*56+53} 28 {x0+5*56+22} 46" marker-end="url(#f-fl)"/>'
          f'<text class="fts" x="40" y="60" dominant-baseline="central">{t["rafale"]}</text>'
          f'<text class="fts" x="40" y="78" dominant-baseline="central">{t["ignore"]}</text>')
    etapes = t['etapes']
    for i, (a, b) in enumerate(etapes):
        x = 40 + i * 205
        c += boite(x, 128, 190, a, b).replace('class="f-box"', 'class="f-phase"')
        if i < 2:
            c += f'<line class="f-arr" x1="{x+192}" y1="155" x2="{x+203}" y2="155" marker-end="url(#f-fl3)"/>'
    c += (f'<line class="f-arr" x1="{x0+5*56+25}" y1="102" x2="{x0+5*56+25}" y2="120" marker-end="url(#f-fl3)"/>'
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
  'svg': fig_reine({'piste': 'Piste des touches portées à la Reine (le cube part de 0)', 'bout': '5 · crâne', 'rafale': 'Rafale : 3 touches', 'ignore': '1 suffit, 2 ignorées',
        'etapes': [('Carte Santé', 'révélez la 1re carte'), ('Défaussez', 'autant que son numéro'), ('Effet, cube à 0', 'puis défaussez-la')],
        'note': 'Plus de carte Santé : la Reine meurt.',
        'alt': "La Reine : le cube de sa piste des touches est sur l'avant-dernière case. Une rafale de 3 touches l'amène sur le crâne : les 2 autres touches sont ignorées. On révèle une carte Santé, on défausse autant de cartes que son numéro, on applique l'effet et le cube revient à 0."}),
  'cap': "Exemple : le cube est sur l'avant-dernière case et votre rafale donne 3 touches. La 1re l'amène sur le crâne, au bout de la piste ; les 2 autres sont ignorées : vous résolvez une carte Santé."},
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
  'svg': fig_reine({'piste': "Queen's Hit track (the marker starts on 0)", 'bout': '5 · skull', 'rafale': 'Burst: 3 Hits', 'ignore': '1 is enough, 2 ignored',
        'etapes': [('Health card', 'reveal the top card'), ('Discard', 'as many as its number'), ('Effect, marker to 0', 'then discard it')],
        'note': 'No Health card left: the Queen dies.',
        'alt': "The Queen: the marker on her Hit track is on the second-to-last space. A 3-Hit Burst brings it to the skull: the other 2 Hits are ignored. Reveal a Health card, discard as many cards as its number, apply the effect and reset the marker to 0."}),
  'cap': 'Example: the marker is on the second-to-last space and your Burst deals 3 Hits. The 1st brings it to the skull, at the end of the track; the other 2 are ignored: you resolve a Health card.'},
})

# ------------------------------------------------------------ 7. contamination : procédures d'infection et d'éclosion (chapitre contamination)
def fig_contamination(t):
    c = ''
    for x0, k in ((20, 'inf'), (360, 'ecl')):
        cx = x0 + 150
        c += f'<text class="fth" x="{cx}" y="18" text-anchor="middle" dominant-baseline="central">{t[k]}</text>'
        c += boite(x0, 36, 300, t[k + '1'], t[k + '1s']).replace('class="f-box"', 'class="f-phase"')
        c += f'<line class="f-arr" x1="{cx}" y1="92" x2="{cx}" y2="110" marker-end="url(#f-fl3)"/>'
        c += f'<text class="fts" x="{cx}" y="124" text-anchor="middle" dominant-baseline="central">{t[k + "q"]}</text>'
        for i, (xx, cle, rouge) in enumerate(((x0, k + 'a', k == 'inf'), (x0 + 160, k + 'b', k == 'ecl'))):
            c += f'<line class="f-arr" x1="{cx}" y1="136" x2="{xx+70}" y2="150" marker-end="url(#f-fl3)"/>'
            b = boite(xx, 154, 140, t[cle], t[cle + 's'])
            c += b if rouge else b.replace('class="f-box"', 'class="f-phase"')
    # infection : les deux branches finissent par la défausse
    c += (f'<line class="f-arr" x1="90" y1="210" x2="150" y2="230" marker-end="url(#f-fl3)"/>'
          f'<line class="f-arr" x1="250" y1="210" x2="190" y2="230" marker-end="url(#f-fl3)"/>')
    c += boite(20, 234, 300, t['inf2'], t['inf2s']).replace('class="f-box"', 'class="f-phase"')
    c += (f'<text class="fts f-warn" x="510" y="250" text-anchor="middle" dominant-baseline="central">{t["ecl2"]}</text>'
          f'<text class="fts" x="510" y="270" text-anchor="middle" dominant-baseline="central">{t["ecl3"]}</text>')
    return svg(300, c, t['alt'])

# ------------------------------------------------------------ 8. évasion : le vaisseau, puis les autres sorties (chapitre evasion)
def fig_evasion(t):
    c = f'<text class="fth" x="20" y="18" dominant-baseline="central">{t["titre1"]}</text>'
    for i, (a, b) in enumerate(t['etapes']):
        x = 20 + i * 130
        c += boite(x, 34, 120, a, b).replace('class="f-box"', 'class="f-phase"')
        if i < 4:
            c += f'<line class="f-arr" x1="{x+121}" y1="61" x2="{x+129}" y2="61" marker-end="url(#f-fl3)"/>'
    c += (f'<line class="f-arr" x1="210" y1="90" x2="210" y2="108" marker-end="url(#f-fl3)"/>'
          + boite(150, 112, 120, t['abattu'], t['abattus'])
          + f'<text class="fts" x="300" y="139" dominant-baseline="central">{t["dca"]}</text>')
    c += f'<text class="fth" x="20" y="196" dominant-baseline="central">{t["titre2"]}</text>'
    for i, (a, b) in enumerate(t['sorties']):
        x = 20 + i * 220
        bx = boite(x, 212, 200, a, b)
        c += bx if i == 2 else bx.replace('class="f-box"', 'class="f-phase"')
    c += f'<text class="fts" x="340" y="290" text-anchor="middle" dominant-baseline="central">{t["note"]}</text>'
    return svg(306, c, t['alt'])

# ------------------------------------------------------------ 9. le robot : activation et déplacement (chapitre robot)
def robot(x, y, lettre):
    return (f'<circle class="f-tok" cx="{x}" cy="{y}" r="16"/>'
            f'<text class="f-tokt" x="{x}" y="{y}" text-anchor="middle" dominant-baseline="central">{lettre}</text>')

def fig_robot(t):
    c = f'<text class="fth" x="20" y="18" dominant-baseline="central">{t["titre1"]}</text>'
    for i, (a, b) in enumerate(t['couts']):
        c += boite(20 + i * 220, 34, 200, a, b).replace('class="f-box"', 'class="f-phase"')
    c += f'<text class="fth" x="20" y="120" dominant-baseline="central">{t["titre2"]}</text>'
    for x in (40, 275, 510):
        c += f'<rect class="f-room" x="{x}" y="140" width="130" height="90" rx="8"/>'
    c += (f'<rect class="f-cor" x="170" y="165" width="105" height="40"/>'
          f'<rect class="f-cor" x="405" y="165" width="105" height="40"/>'
          f'<rect class="f-porte" x="452" y="160" width="10" height="50" rx="2"/>'
          + robot(85, 185, t['R']) + jeton(340, 185, 16, t['A'])
          + '<path class="f-path" d="M85 165 L85 150 L300 150 L300 168" marker-end="url(#f-fl)"/>'
          f'<text class="fts" x="222" y="138" text-anchor="middle" dominant-baseline="central">{t["ignore"]}</text>'
          f'<text class="fts f-warn" x="457" y="226" text-anchor="middle" dominant-baseline="central">{t["porte"]}</text>'
          f'<text class="fts" x="340" y="258" text-anchor="middle" dominant-baseline="central">{t["note"]}</text>')
    return svg(276, c, t['alt'])

FR.update({
 'contamination': {
  'svg': fig_contamination({'inf': "Procédure d'infection", 'inf1': 'Scannez', 'inf1s': 'les Contaminations de votre main',
        'infq': 'Une carte « Infectée » ?', 'infa': 'Oui', 'infas': '1 Larve sur le plateau', 'infb': 'Non', 'infbs': 'pas de Larve',
        'inf2': 'Défaussez', 'inf2s': 'toutes celles de votre main',
        'ecl': "Procédure d'éclosion", 'ecl1': 'Tirez 4 cartes', 'ecl1s': 'de votre pioche Action',
        'eclq': 'Une Contamination parmi elles ?', 'ecla': 'Non', 'eclas': 'vous survivez', 'eclb': 'Oui', 'eclbs': 'personnage tué',
        'ecl2': 'En cours de partie : 1 Adulte', 'ecl3': 'apparaît dans votre salle',
        'alt': "Deux procédures. Infection : scannez les Contaminations de votre main ; si une carte est infectée, une Larve va sur votre plateau ; dans tous les cas, ces cartes vont dans votre défausse. Éclosion : tirez 4 cartes de votre pioche Action ; sans Contamination vous survivez, avec au moins une votre personnage est tué."}),
  'cap': "Infection : la Larve n'arrive que si une carte scannée est infectée, et une seule à la fois. Éclosion : une seule Contamination parmi les 4 cartes tirées suffit à tuer le personnage."},
 'evasion': {
  'svg': fig_evasion({'titre1': 'Le vaisseau', 'etapes': [('Vaisseau', 'case 10 atteinte'), ('DCA du dessus', 'révélée'), ('Inactive', 'il se pose'), ('Embarquer', 'action + bruit'), ('Décoller', 'phase Événement')],
        'abattu': 'Active', 'abattus': 'vaisseau abattu', 'dca': 'Le Contrôle du recycleur B permet de voir les jetons DCA.',
        'titre2': 'Les autres sorties', 'sorties': [("Navette d'évacuation", 'bruit · une seule place'), ('Hibernatorium', "bruit · s'il est activé"), ('Autodestruction', 'tous ceux dedans meurent')],
        'note': "Hiberner n'est pas s'échapper : si le complexe est détruit, les hibernés meurent.",
        'alt': "Évasion. Le vaisseau : quand le compte-tours atteint sa case, on révèle le jeton DCA du dessus ; actif, le vaisseau est abattu ; inactif, il se pose ; on embarque par une action avec jet de bruit, puis on décolle au début de la phase Événement. Autres sorties : la navette d'évacuation (une seule place), l'hibernatorium s'il est activé, et l'autodestruction qui tue tous ceux encore dans le complexe."}),
  'cap': "Le vaisseau n'arrive qu'une fois : si la DCA est active à ce moment-là, il est abattu. À bord, votre tour est ignoré ; n'importe quel passager peut décider seul du décollage."},
 'robot': {
  'svg': fig_robot({'titre1': 'Activer le robot (hors combat)', 'couts': [('Dans sa salle', '1 carte'), ('À distance', 'salle avec 💻 : 2 cartes'), ('Avec un jeton Info', 'à distance : 1 carte')],
        'titre2': 'Le déplacer', 'R': 'R', 'A': 'A', 'ignore': 'ignore les Intrus', 'porte': 'porte fermée : bloqué',
        'note': 'Il ne bouge que par vos actions, de salle en salle voisine, sans explorer ni faire de jet de bruit.',
        'alt': "Le robot. L'activer coûte 1 carte dans sa salle, 2 cartes à distance depuis une salle avec ordinateur, 1 carte à distance avec un jeton Info. Il passe dans une salle occupée par un Intrus sans s'en soucier, mais une porte fermée l'arrête."}),
  'cap': "Exemple : le robot entre dans la salle de l'Adulte (ils s'ignorent), mais ne pourra pas franchir la porte fermée vers la salle suivante."},
})
EN.update({
 'contamination': {
  'svg': fig_contamination({'inf': 'Infection Procedure', 'inf1': 'Scan', 'inf1s': 'the Contamination cards in your hand',
        'infq': 'An "Infected" card?', 'infa': 'Yes', 'infas': '1 Larva on your board', 'infb': 'No', 'infbs': 'no Larva',
        'inf2': 'Discard', 'inf2s': 'all those in your hand',
        'ecl': 'Hatching Procedure', 'ecl1': 'Draw 4 cards', 'ecl1s': 'from your Action deck',
        'eclq': 'Any Contamination among them?', 'ecla': 'No', 'eclas': 'you survive', 'eclb': 'Yes', 'eclbs': 'Character killed',
        'ecl2': 'During the game: 1 Adult', 'ecl3': 'appears in your Room',
        'alt': 'Two procedures. Infection: scan the Contamination cards in your hand; if one is infected, a Larva goes on your board; either way, those cards go to your discard pile. Hatching: draw 4 cards from your Action deck; with no Contamination you survive, with at least one your Character is killed.'}),
  'cap': 'Infection: a Larva only comes if a scanned card is infected, and only one at a time. Hatching: a single Contamination among the 4 cards drawn is enough to kill the Character.'},
 'evasion': {
  'svg': fig_evasion({'titre1': 'The Lander', 'etapes': [('Lander', 'space 10 reached'), ('Top AA token', 'revealed'), ('Inactive', 'it lands'), ('Board', 'Action + Noise'), ('Launch', 'Event Phase')],
        'abattu': 'Active', 'abattus': 'Lander shot down', 'dca': 'Life Support Control B lets you see the AA tokens.',
        'titre2': 'The other ways out', 'sorties': [('Escape Shuttle', 'Noise · one seat only'), ('Hibernatorium', 'Noise · if turned on'), ('Autodestruction', 'everyone inside dies')],
        'note': 'Hibernating is not escaping: if the Facility is destroyed, hibernating Characters die.',
        'alt': 'Escape. The Lander: when the Round track reaches its space, reveal the top Anti-Aircraft token; active, the Lander is shot down; inactive, it lands; board it with an Action and a Noise roll, then launch at the start of the Event Phase. Other ways out: the Escape Shuttle (one seat), the Hibernatorium if turned on, and Autodestruction, which kills everyone still in the Facility.'}),
  'cap': 'The Lander arrives only once: if Anti-Aircraft is active at that moment, it is shot down. On board, your Turn is skipped; any passenger may decide alone to launch.'},
 'robot': {
  'svg': fig_robot({'titre1': 'Activating the Robot (Not in Combat)', 'couts': [('In its Room', '1 card'), ('Remotely', 'Room with 💻: 2 cards'), ('With a Data token', 'remotely: 1 card')],
        'titre2': 'Moving it', 'R': 'R', 'A': 'A', 'ignore': 'ignores Intruders', 'porte': 'closed Door: blocked',
        'note': 'It only moves through your Actions, Room to neighbouring Room, never exploring or making Noise rolls.',
        'alt': 'The Robot. Activating it costs 1 card in its Room, 2 cards remotely from a Room with a Computer, 1 card remotely with a Data token. It moves through a Room holding an Intruder without caring, but a closed Door stops it.'}),
  'cap': "Example: the Robot enters the Adult's Room (they ignore each other), but will not be able to pass the closed Door to the next Room."},
})

# ------------------------------------------------------------ 10. le coût des actions (chapitre actions)
def fig_actions(t):
    c = ''
    for i, (titre, sous, lignes) in enumerate(t['cols']):
        x = 20 + i * 220
        c += boite(x, 20, 200, titre, sous).replace('class="f-box"', 'class="f-phase"')
        for k, (txt, hc) in enumerate(lignes):
            cls = 'fts f-warn' if hc else 'fts'
            c += f'<text class="{cls}" x="{x+100}" y="{96+k*20}" text-anchor="middle" dominant-baseline="central">{txt}{" ✖" if hc else ""}</text>'
    c += f'<text class="fts f-warn" x="340" y="286" text-anchor="middle" dominant-baseline="central">{t["leg"]}</text>'
    for i, (a, b) in enumerate(t['fin']):
        x = 20 + i * 220
        c += boite(x, 306, 200, a, b, vide=(i > 0))
        if i < 2:
            c += f'<line class="f-arr" x1="{x+202}" y1="333" x2="{x+218}" y2="333" marker-end="url(#f-fl3)"/>'
    return svg(372, c, t['alt'])

# ------------------------------------------------------------ 11. la phase Intrus : qui attaque qui (chapitre attaques)
def fig_attaques(t):
    # 1. ordre des salles : une petite grille 2 × 3, de la 1re (en haut à gauche) à la dernière (en bas à droite)
    c = f'<text class="fth" x="20" y="16" dominant-baseline="central">{t["ordre"]}</text>'
    for n in range(6):
        x, y = 20 + (n % 3) * 50, 34 + (n // 3) * 36
        cls = 'f-room' if n not in (0, 5) else 'f-phase'
        c += (f'<rect class="{cls}" x="{x}" y="{y}" width="40" height="26" rx="4"/>'
              f'<text class="fts" x="{x+20}" y="{y+13}" text-anchor="middle" dominant-baseline="central">{n+1}</text>')
    c += ('<line class="f-arr" x1="61" y1="47" x2="69" y2="47" marker-end="url(#f-fl3)"/>'
          '<line class="f-arr" x1="111" y1="47" x2="119" y2="47" marker-end="url(#f-fl3)"/>'
          '<line class="f-arr" x1="130" y1="61" x2="62" y2="70" marker-end="url(#f-fl3)"/>'
          '<line class="f-arr" x1="61" y1="83" x2="69" y2="83" marker-end="url(#f-fl3)"/>'
          '<line class="f-arr" x1="111" y1="83" x2="119" y2="83" marker-end="url(#f-fl3)"/>')
    c += (f'<text class="fts" x="190" y="47" dominant-baseline="central">{t["rangee"]}</text>'
          f'<text class="fts" x="190" y="83" dominant-baseline="central">{t["rangee2"]}</text>')
    c += f'<text class="fth" x="20" y="118" dominant-baseline="central">{t["dans"]}</text>'
    # trois temps dans une même salle
    for k, (titre, leg) in enumerate(t['etapes']):
        x = 20 + k * 220
        c += (f'<text class="fth" x="{x+100}" y="146" text-anchor="middle" dominant-baseline="central">{titre}</text>'
              f'<rect class="f-room" x="{x}" y="162" width="200" height="130" rx="8"/>')
        ax, by = x + 45, 0
        alice = moi(ax, 200, t['p1'])
        if k == 2:
            alice = f'<g style="opacity:.3">{alice}</g>'
        c += alice + moi(ax, 260, t['p2'])
        g = jeton(x + 165, 200, 17, t['G']) if k < 2 else ''
        a = jeton(x + 165, 260, 15, t['A'])
        c += g + a
        if k == 0:
            c += f'<line class="f-arr" x1="{x+146}" y1="204" x2="{x+70}" y2="201" marker-end="url(#f-fl3)" style="stroke-width:2.5"/>'
        elif k == 1:
            c += f'<line class="f-arr" x1="{x+148}" y1="254" x2="{x+68}" y2="210" marker-end="url(#f-fl3)" style="stroke-width:2.5"/>'
        else:
            c += f'<line class="f-arr" x1="{x+148}" y1="260" x2="{x+70}" y2="260" marker-end="url(#f-fl3)" style="stroke-width:2.5"/>'
        c += f'<text class="fts" x="{x+100}" y="312" text-anchor="middle" dominant-baseline="central">{leg}</text>'
    c += f'<text class="fts f-warn" x="340" y="344" text-anchor="middle" dominant-baseline="central">{t["note"]}</text>'
    return svg(362, c, t['alt'])

FR.update({
 'actions': {
  'svg': fig_actions({'cols': [('0 carte', 'gratuites', [('Jouer une carte Action', 0), ('Passer', 0)]),
        ('1 carte', 'à défausser', [('Se déplacer', 0), ('Tir dans une salle', 0), ('Rafale dans un couloir', 0), ('Mêlée', 0), ('Utiliser un objet', 0), ('Équipement tactique', 0), ('Sécurisation', 1), ('Activer le robot', 1), ('Échanger', 1)]),
        ('2 cartes', 'à défausser', [('Action de salle', 1), ('Déplacement prudent', 1)])],
        'leg': '✖ hors combat : interdite dans une salle où se trouve un Intrus',
        'fin': [('Vos 2 actions', 'deux fois la même : permis'), ('Oxygène −1', 'si le recycleur est inactif'), ('Santé −1', 'si votre salle est en feu')],
        'alt': "Le coût des actions. 0 carte : jouer une carte Action, passer. 1 carte : se déplacer, tir dans une salle, rafale dans un couloir, mêlée, utiliser un objet, équipement tactique, et hors combat sécurisation, activer le robot, échanger. 2 cartes, hors combat : action de salle, déplacement prudent. Après vos 2 actions : −1 oxygène si le recycleur de votre section est inactif, puis −1 santé si votre salle est en feu."}),
  'cap': "Les cartes défaussées pour payer ne sont pas résolues. Passer est une action : on ne passe pas tout seul quand la main est vide."},
 'attaques': {
  'svg': fig_attaques({'ordre': '1. Les salles, une par une', 'rangee': 'on commence par la salle en haut à gauche,', 'rangee2': "rangée par rangée, jusqu'à celle en bas à droite",
        'dans': "2. Dans une salle avec plusieurs personnages : l'ordre du tour",
        'etapes': [("a. Le plus gros d'abord", 'le Guerrier attaque Alice'), ('b. Puis le suivant', "l'Adulte attaque Alice aussi"), ('c. Si Alice meurt ou part', 'les suivants attaquent Bruno')],
        'p1': 'Alice', 'p2': 'Bruno', 'G': 'G', 'A': 'A',
        'note': "Tous les Intrus de la salle attaquent le premier dans l'ordre du tour.",
        'alt': "Phase Intrus. Les salles sont traitées une par une, de gauche à droite, rangée par rangée, en partant d'en haut à gauche. Dans une salle avec Alice, première dans l'ordre du tour, et Bruno : le Guerrier, le plus gros, attaque Alice ; puis l'Adulte attaque Alice aussi ; Bruno n'est attaqué que si Alice meurt ou quitte la salle."}),
  'cap': "Alice est première dans l'ordre du tour. En phase Intrus, seul l'ordre du tour compte. La priorité au joueur qui a provoqué l'arrivée d'un Intrus ne joue qu'en dehors de cette phase, quand l'Intrus entre dans sa salle à cause de lui. L'attaque d'une Larve ne tire pas de carte : elle infecte."},
})
EN.update({
 'actions': {
  'svg': fig_actions({'cols': [('0 cards', 'free', [('Play an Action card', 0), ('Pass', 0)]),
        ('1 card', 'to discard', [('Move', 0), ('Shoot in a Room', 0), ('Burst at a Corridor', 0), ('Melee Attack', 0), ('Use an Item', 0), ('Tactical Gear', 0), ('Secure token', 1), ('Activate the Robot', 1), ('Trade', 1)]),
        ('2 cards', 'to discard', [('Use the Room', 1), ('Move Cautiously', 1)])],
        'leg': '✖ Not in Combat: forbidden in a Room with an Intruder',
        'fin': [('Your 2 Actions', 'the same one twice: allowed'), ('Oxygen −1', 'if Life Support is inactive'), ('Health −1', 'if your Room is on Fire')],
        'alt': 'The cost of Actions. 0 cards: play an Action card, Pass. 1 card: Move, Shoot in a Room, Burst at a Corridor, Melee Attack, Use an Item, Tactical Gear, and, Not in Combat, Secure token, Activate the Robot, Trade. 2 cards, Not in Combat: Use the Room, Move Cautiously. After your 2 Actions: −1 Oxygen if your Section\'s Life Support is inactive, then −1 Health if your Room is on Fire.'}),
  'cap': 'The cards discarded to pay are not resolved. Pass is an Action: you do not Pass automatically when your hand is empty.'},
 'attaques': {
  'svg': fig_attaques({'ordre': '1. Rooms, one at a time', 'rangee': 'start with the top-left Room,', 'rangee2': 'row by row, ending with the bottom-right one',
        'dans': '2. In a Room with several Characters: Turn order',
        'etapes': [('a. Largest first', 'the Drone Attacks Alice'), ('b. Then the next', 'the Adult Attacks Alice too'), ('c. If Alice dies or leaves', 'the next ones Attack Bruno')],
        'p1': 'Alice', 'p2': 'Bruno', 'G': 'D', 'A': 'A',
        'note': 'Every Intruder in the Room Attacks the first Character in Turn order.',
        'alt': 'Intruder Phase. Rooms are resolved one at a time, left to right, row by row, starting top left. In a Room with Alice, first in Turn order, and Bruno: the Drone, the largest, Attacks Alice; then the Adult Attacks Alice too; Bruno is only Attacked if Alice dies or leaves the Room.'}),
  'cap': "Alice is first in Turn order. In the Intruder Phase, only Turn order matters. Priority to the player who caused an Intruder to arrive only applies outside this phase, when the Intruder enters their Room because of them. A Larva Attack draws no card: it infects."},
})

def ecrire(chemin, data, entete):
    js = entete + 'const FIG=' + json.dumps(data, ensure_ascii=False, indent=0) + ';\n'
    chemin.write_text(js, encoding='utf-8')
    print(chemin)

ecrire(ICI / 'contenu' / 'fr' / 'schemas.js', FR, '/* ---------- schémas du tutoriel (générés par figures.py, ne pas modifier à la main) ---------- */\n')
ecrire(ICI / 'contenu' / 'en' / 'schemas.js', EN, '/* ---------- tutorial diagrams (generated by figures.py, do not edit by hand) ---------- */\n')
