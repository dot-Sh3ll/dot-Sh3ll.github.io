#!/usr/bin/env python3
"""Fiches A5 Nemesis: Retaliation : écrit les pages .dc.html (artefact Design) dans outils/nemesis-fiches/fr/.
Gabarit commun (outils/fiches-gabarit) : couleur #5c7e22, teinte #f5faeb, filet #c4d6a4, titres Rajdhani.
usage (racine du dépôt) : python3 outils/nemesis-fiches/gen_pages.py
"""
import pathlib

ICI = pathlib.Path(__file__).resolve().parent
A, T, F = '#5c7e22', '#f5faeb', '#c4d6a4'

STYLE = f"""body{{margin:0;background:#fff}}
.pg{{box-sizing:border-box;background:#fff;color:#1c1d22;font-family:'Source Sans 3',sans-serif;font-size:12px;line-height:1.3;overflow:hidden;display:flex;flex-direction:column;gap:7px}}
.pt{{width:559px;height:794px;padding:26px 30px 18px}}
.ls{{width:794px;height:559px;padding:26px 30px 18px}}
h1{{font-family:Rajdhani,sans-serif;font-weight:600;font-size:27px;margin:0;line-height:1;color:#1c1d22}}
h2{{font-family:Rajdhani,sans-serif;font-weight:700;font-size:16px;margin:0 0 3px;color:{A};border-bottom:1px solid {F};padding-bottom:1px;line-height:1.1}}
h3{{font-family:Rajdhani,sans-serif;font-weight:700;font-size:15px;margin:0 0 2px;color:{A};line-height:1.1}}
ul,ol{{margin:0;padding-left:15px}}
li{{margin:0 0 1px}}
p{{margin:0 0 2px}}
.note{{color:#4b4e58}}
.box{{border:1px solid #1c1d22;border-radius:6px;padding:5px 9px}}
.card{{border:2px solid {A};border-radius:8px;padding:5px 8px;background:{T}}}
table{{width:100%;border-collapse:collapse;font-size:12px}}
th,td{{border:1px solid #9c9ca6;padding:2px 5px;text-align:left;vertical-align:top}}
th{{background:{T}}}
td.c,th.c{{text-align:center;width:34px}}
.obj{{display:inline-block;min-width:13px;height:13px;line-height:13px;border:1px solid #1c1d22;border-radius:3px;font-size:9.5px;font-weight:700;text-align:center;margin-left:2px;vertical-align:1px}}
.sec{{display:inline-block;padding:0 5px;border-radius:3px;background:{A};color:#fff;font-weight:700;font-size:11px;line-height:15px;vertical-align:1px}}
.room{{border:1px solid #1c1d22;border-radius:6px;padding:4px 7px;display:flex;flex-direction:column;gap:2px;overflow:hidden}}
.room .hd{{display:flex;justify-content:space-between;align-items:baseline;gap:4px}}
.room .nm{{font-family:Rajdhani,sans-serif;font-weight:700;font-size:15px;line-height:1.05;color:{A}}}
.room .pr{{color:#4b4e58;font-style:italic}}"""

HELMET = ('<helmet>\n<link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@600;700&amp;family=Source+Sans+3:ital,wght@0,400;0,600;0,700;1,400&amp;display=swap" rel="stylesheet">\n'
          '<style>\n' + STYLE + '\n</style>\n</helmet>')

def doc(titre, corps, w, h):
    return f"""<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<title>{titre}</title>
<script src="./support.js"></script>
</head>
<body>
<x-dc>
{HELMET}
{corps}
</x-dc>
<script type="text/x-dc" data-dc-script data-props='{{"$preview":{{"width":{w},"height":{h}}}}}'>
class Component extends DCLogic {{
renderVals() {{
return {{}};
}}
}}
</script>
</body>
</html>
"""

def tete(titre, coin):
    return (f'<div style="display:flex;justify-content:space-between;align-items:flex-end;border-bottom:2px solid #1c1d22;padding-bottom:5px">'
            f'<div><div style="font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:{A};font-weight:700">Nemesis: Retaliation</div><h1>{titre}</h1></div>'
            f'<div style="font-size:11.5px;color:#4b4e58;text-align:right">{coin}</div></div>')

def pied(droite):
    return (f'<div style="display:flex;justify-content:space-between;font-size:11.5px;color:{A};border-top:1px solid {A};padding-top:4px;margin-top:auto">'
            f'<span style="font-weight:600">Less Rules, More Play · paulmoussard.com</span><span>{droite}</span></div>')

# ---------------------------------------------------------------- aide de jeu, page 1
ACT = [('0', 'Jouer une carte Action', ''), ('0', 'Passer', ''), ('1', 'Se déplacer', 'jet de bruit'),
       ('1', 'Placer 1 jeton Sécurisation', 'hors combat'), ('1', 'Tir dans votre salle', 'arme chargée'),
       ('1', 'Rafale dans un couloir adjacent', 'dépense des munitions'), ('1', 'Mêlée', '+1 Contamination'),
       ('1', 'Utiliser un objet', ''), ('1', 'Activer le robot', 'hors combat ; +1 à distance'),
       ('1', 'Échanger', 'hors combat'), ('1', 'Utiliser un équipement tactique', 'autant de jetons que voulu'),
       ('2', 'Action de salle', 'hors combat'), ('2', 'Déplacement prudent', 'hors combat ; +1 Sécurisation')]

p1 = f"""<div class="pg pt">
{tete('Une manche', 'Fiche 1 · recto')}
<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px">
<div class="card"><h3>1. Phase Joueurs</h3>
<p>À tour de rôle, jusqu'à ce que tous aient passé : <b>2 actions</b>, puis <b>−1 oxygène</b> si le recycleur de votre section est inactif, puis <b>−1 santé</b> si votre salle est en feu.</p>
<p class="note"><i>Objectif : à choisir avant ou après vos 2 actions (3 / 2 / 2 / 1 / 1 cartes).</i></p></div>
<div class="card"><h3>2. Phase Intrus</h3>
<p><b>1 touche</b> à chaque Intrus d'une salle en feu (nid en feu : −1 œuf).</p>
<p>Puis les Intrus <b>attaquent</b>, salle par salle depuis le haut à gauche, les plus gros d'abord, sur le premier dans l'ordre du tour.</p></div>
<div class="card"><h3>3. Phase Événement</h3>
<p>Passagers du vaisseau : décollage possible au début de la phase.</p>
<p>Carte <b>Événement</b> (déplacements, effet principal, effet secondaire), puis <b>1 jeton</b> du sac Intrus.</p></div>
<div class="card"><h3>4. Phase Nettoyage</h3>
<p>Jeton Premier joueur à gauche ; chacun remonte à <b>5 cartes</b> ; compte-tours <b>+1</b>.</p>
<p class="note"><i>Vaisseau en case 10 : DCA. Autodestruction : explosion. Après la 14e manche : fin.</i></p></div>
</div>
<div>
<h2>Actions</h2>
<table><thead><tr><th class="c">Coût</th><th>Action</th><th>À retenir</th></tr></thead><tbody>
{''.join(f'<tr><td class="c">{c}</td><td>{a}</td><td>{r}</td></tr>' for c, a, r in ACT)}
</tbody></table>
<p class="note" style="margin-top:3px"><i>Hors combat</i> : impossible dans une salle avec au moins 1 Intrus. Les cartes défaussées pour payer ne sont pas résolues ; les Contaminations ne paient jamais.</p>
</div>
{pied('Aide de jeu · 1/3')}
</div>"""

# ---------------------------------------------------------------- aide de jeu, page 2
SAC = [('Reine', 'Activez-la ; sinon placez-la dans le couloir.', 'Activez-la ; sinon placez-la dans la salle.', 'Reine en jeu : activez-la. Sinon : +2 Larves.'),
       ('Guerrier, Adulte', 'Placez les Intrus indiqués au dos (blanc : Adultes, rouge : Guerriers).', 'Placez 1 Intrus du type indiqué.', '+2 Reines.'),
       ('Larve', 'Placez 1 Larve.', 'Placez 1 Larve.', '+2 Guerriers.'),
       ('Vierge', '+2 Adultes dans le sac.', '+2 Adultes dans le sac.', '+2 Adultes dans le sac.')]
MORTE = [('Reine', '1 Guerrier ; retirez le jeton.', '1 Guerrier ; retirez le jeton.', '+2 Guerriers ; retirez le jeton.'),
         ('Guerrier, Adulte', 'Intrus indiqués au dos.', '1 Intrus du type indiqué.', '+2 Larves.'),
         ('Larve', '1 Larve.', '1 Larve.', '+2 Guerriers.')]

def tsac(rows):
    return ('<table><thead><tr><th style="width:62px">Jeton</th><th>Dans un couloir</th><th>Dans une salle</th><th>Phase Événement</th></tr></thead><tbody>'
            + ''.join(f'<tr><td><b>{a}</b></td><td>{b}</td><td>{c}</td><td>{d}</td></tr>' for a, b, c, d in rows) + '</tbody></table>')

p2 = f"""<div class="pg pt">
{tete('Bruit, Intrus et objets', 'Fiche 1 · verso')}
<div class="box">
<h2>Jet de bruit</h2>
<ul>
<li><b>1 à 4</b> : pour chaque couloir adjacent de ce numéro, un Intrus présent → <b>le plus gros entre</b> et attaque ; un marqueur Bruit → <b>résolvez-le</b> (sac, colonne couloir) ; rien → <b>posez un marqueur Bruit</b>.</li>
<li><b>Danger</b> : un jeton du sac, colonne salle : l'Intrus indiqué apparaît dans votre salle.</li>
<li>Couloir renforcé = 0. Couloir plein = 6 Intrus (Reine = 4) ou 1 marqueur Bruit.</li>
</ul>
</div>
<div>
<h2>Sac Intrus (Reine en vie)</h2>
{tsac(SAC)}
<p class="note" style="margin-top:3px">Le jeton tiré retourne <b>sous sa pile</b>, sauf le vierge, qui revient dans le sac. Sac de départ : 1 vierge, 2 Larves, 3 Adultes + 1 par personnage.</p>
</div>
<div>
<h2>Face « La Reine est morte » <span style="font-family:'Source Sans 3',sans-serif;font-weight:400;font-size:12px;color:#4b4e58">(jeton vierge : inchangé)</span></h2>
{tsac(MORTE)}
</div>
<div class="box">
<h2>Objets</h2>
<ul>
<li><b>Fouille</b> : 1 carte Objet par icône de la salle ; gardez-en 1, remettez les autres sous leur paquet.</li>
<li><b>Objets communs</b> : dans le sac à dos, sans limite, secrets. <b>Objets lourds</b> (armes, œufs) : un par main, 2 mains.</li>
<li><b>Interaction</b> : avec son accord, un objet peut servir à un personnage de votre salle (santé, blessure grave, panne, oxygène). Sinon, échangez (1 carte, hors combat).</li>
</ul>
</div>
{pied('Aide de jeu · 2/3')}
</div>"""

p3 = f"""<div class="pg pt">
{tete('Combat et survie', 'Fiche 2 · recto')}
<div class="box">
<h2>Combat</h2>
<ul>
<li><b>Tir</b> (salle) : +1 touche, puis dé Tir. Critique = mort ; 2 à 5 = mort si ≤ touches ; face munitions = dépensez des munitions.</li>
<li><b>Mêlée</b> : +1 Contamination, +1 touche, dé Tir (dernière face : rien). Si l'Intrus survit, il riposte.</li>
<li><b>Rafale</b> (couloir) : dépensez des munitions, 1 à 4 touches : 1 au plus par Adulte ou Larve, <b>exactement 2</b> par Guerrier, la Reine autant que voulu.</li>
<li><b>Grenade</b> : dé Rafale + 2 touches dans un couloir adjacent (ce n'est pas une rafale).</li>
<li><b>Larve</b> : 1 touche la tue. Son attaque : +1 Contamination et la Larve sur votre plateau.</li>
<li><b>Reine</b> : piste des touches ; au bout, une carte Santé (défaussez autant de cartes que son numéro, appliquez l'effet, cube à 0).</li>
</ul>
</div>
<div class="box">
<h2>S'échapper</h2>
<ul>
<li><b>Vaisseau</b> : quand le compte-tours atteint son jeton, révélez le jeton DCA du dessus. Active : il est abattu. Inactive : il se pose dans la zone d'atterrissage.</li>
<li><b>Embarquer</b> : action de salle de la zone d'atterrissage, avec jet de bruit. À bord : tour ignoré, ni oxygène ni santé perdus. Un Intrus y apparaît : tous débarquent.</li>
<li><b>Décoller</b> : au début de la phase Événement, n'importe quel passager peut le décider seul. Tous ceux à bord sont échappés.</li>
<li><b>Navette d'évacuation</b> : jet de bruit, une seule place ; la DCA ne l'arrête pas. <b>Hibernatorium</b> : jet de bruit, s'il a été activé.</li>
<li><b>Autodestruction</b> : jeton à 5 manches de la manche en cours. À son tour, le complexe explose : tous ceux qui sont dedans meurent, hibernatorium compris. Seul le Réacteur l'arrête.</li>
</ul>
</div>
<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px">
<div class="box">
<h2>Santé et oxygène</h2>
<ul>
<li>En forme → Affaibli → État critique → crâne. <b>Armure</b> : détruite au lieu de perdre 1 point.</li>
<li>Oxygène 7 au plus ; jeton Oxygène +3, Medpack +2 santé.</li>
<li>Cadran sous 0 : <b>Suffocation</b>, un tour pour trouver de l'oxygène.</li>
</ul>
</div>
<div class="box">
<h2>Fin de partie</h2>
<ol>
<li>Sans Larve : toutes vos cartes en main, infection.</li>
<li>Avec Larve : +1 Contamination, éclosion (4 cartes ; une Contamination = mort).</li>
<li>Vivant, parti ou en hibernation : révélez votre objectif.</li>
</ol>
</div>
</div>
<div style="border-radius:6px;padding:5px 9px;background:{T};border:1px solid {F}">
<p style="margin:0"><b style="color:{A}">Loi de Murphy :</b> en cas de doute, appliquez ce qui pénalise le plus les joueurs, puis le premier dans l'ordre du tour. <b style="color:{A}">Effets locaux :</b> sans cible précise, l'effet s'applique dans votre salle.</p>
</div>
{pied('Aide de jeu · 3/3')}
</div>"""

# ---------------------------------------------------------------- salles
SEC = [  # n, section, nom, objets, icônes, effet, précision (courte)
 (14, 'A', "Zone d'atterrissage", '', '4 emplacements de jetons', "Prenez autant de jetons tactiques disponibles que vous voulez. <b>OU</b> Jet de bruit pour entrer dans le vaisseau.", "Vaisseau posé seulement. Intrus dans la salle après le jet : échec."),
 (15, 'A', "Contrôle du recycleur A", 'VR', 'ordinateur', "Retournez le recycleur de la section A. <b>OU</b> Défaussez un Feu n'importe où dans le complexe.", ""),
 (16, 'A', "Bloc opératoire", 'VVV', '', "Défaussez toutes vos cartes Action : retirez votre Larve et scannez pioche et défausse (retirez les infectées). <b>OU</b> Défaussez 1 blessure grave.", "1er effet : seulement avec une Larve. Remélangez ensuite."),
 (17, 'A', "Station de forage", 'JJJ', 'ordinateur', "Placez un nouveau couloir depuis la salle du robot.", "Vers une salle découverte ou non. Robot en panne : impossible."),
 (18, 'B', "Hibernatorium", '', '', "Jet de bruit pour hiberner.", "S'il est actif (Contrôle du recycleur C). Intrus dans la salle après le jet : échec."),
 (19, 'B', "Contrôle du recycleur B", 'VR', '', "Retournez le recycleur de la section B. <b>OU</b> Consultez les 2 jetons DCA et réordonnez-les.", "Le jeton du dessus donne l'état. Rien à révéler."),
 (20, 'B', "Salle des serveurs", 'RJ', 'ordinateur', "Utilisez une salle découverte avec ordinateur. <b>OU</b> Gagnez un jeton Info (1 au plus).", "Pas une salle en panne."),
 (21, 'B', "Système de refroidissement", 'JJJ', 'ordinateur', "Activez l'autodestruction.", "Jeton posé 5 manches plus loin sur le compte-tours."),
 (22, 'C', "Contrôle du recycleur C", 'VR', '', "Retournez le recycleur de la section C. <b>OU</b> Activez l'hibernatorium.", "L'hibernatorium ne se désactive plus."),
 (23, 'C', "Réacteur", 'RJ', '', "Retirez du jeu les recycleurs, l'autodestruction et les 2 jetons DCA.", "Tout est inactif, pour toujours."),
 (24, 'C', "Navette d'évacuation", 'VR', '', "Jet de bruit pour entrer dans la navette.", "Une seule place. La DCA ne l'arrête pas."),
 (25, 'C', "Nid", '', 'jamais sécurisé, jamais en panne', "Prenez ou détruisez 1 œuf, puis jet de bruit.", "Œufs : objets lourds. Plus d'œufs : nid détruit (un Feu ne suffit pas)."),
]
ALEA = [
 (1, "Système anti-incendie", 'VJ', 'ordinateur', "Défaussez tous les Feux d'une section.", ""),
 (2, "Abri", 'VR', 'sécurisé par défaut', "Sans Larve : retirez du jeu les Contaminations de votre main, sans les scanner.", "État permanent, pas un jeton ; jusqu'à 3 jetons en plus, défaussés d'abord."),
 (3, "Infirmerie", 'VVV', '', "Regagnez 2 santé. <b>OU</b> Défaussez 1 blessure grave.", ""),
 (4, "Entrepôt", 'VRJ', 'jamais sécurisé', "Piochez 1 objet vert, 1 rouge, 1 jaune ; gardez-en 2.", ""),
 (5, "Armurerie", 'RRR', '', "Gagnez autant de jetons Munitions et Grenade que vous voulez.", "Dans des emplacements libres."),
 (6, "Contrôle des portes", 'RJ', 'ordinateur', "Ouvrez et/ou fermez autant de portes que voulu dans une section.", "Seulement les portes à seuil."),
 (7, "Console du robot", 'RJ', 'ordinateur', "1 jeton Sécurisation dans la salle du robot. <b>OU</b> Renforcez un couloir vide adjacent au robot.", ""),
 (8, "Contrôle des tourelles", 'RRR', 'ordinateur', "Couloir adjacent à une salle avec Objet rouge, sans panne : dé Rafale de touches.", "Pas une rafale : aucune munition."),
 (9, "Contrôle de la pression", 'JJJ', 'ordinateur', "Déplacez 1 Intrus n'importe où dans le complexe.", "Salle ↔ couloir, dans tout sens."),
 (10, "Signal d'alarme", 'VR', 'ordinateur', "Résolvez ou défaussez un marqueur Bruit n'importe où.", ""),
 (11, "Labo militaire expérimental", 'RJ', '', "Gagnez autant de Munitions que voulu. <b>OU</b> 2 équipements de soutien au hasard, gardez-en 1.", ""),
 (12, "Accès aux conduits", 'JJJ', 'jamais sécurisé', "Allez dans n'importe quelle salle ; attaque d'Adulte (carte seule), puis jet de bruit.", "Sécurisation sans effet ; attaque empêchable."),
 (13, "Salle de décontamination", 'VVV', '', "Défaussez vos cartes Action et 2 oxygène : retirez toutes les Contaminations de pioche et défausse.", "Impossible avec 1 oxygène ou moins."),
]

def objs(o):
    return ''.join(f'<span class="obj">{c}</span>' for c in o)

def room(n, s, nom, o, ic, fx, pr):
    badge = f'<span class="sec">{s}</span> ' if s else ''
    num = f'<span class="note" style="font-size:11px">n° {n:02d}</span>'
    ic = f'<p class="note" style="font-size:11px;margin:0"><i>{ic}</i></p>' if ic else ''
    pr = f'<p class="pr" style="margin:0">{pr}</p>' if pr else ''
    return (f'<div class="room"><div class="hd"><span class="nm">{badge}{nom}</span><span style="white-space:nowrap">{objs(o)}</span></div>'
            f'{ic}<p style="margin:0">{fx}</p>{pr}<div style="margin-top:auto;text-align:right">{num}</div></div>')

GRID = 'flex:1;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));grid-template-rows:repeat(3,minmax(0,1fr));gap:5px'
def spage(titre, coin, cellules, n):
    return f"""<div class="pg ls">
{tete(titre, coin)}
<div style="{GRID}">
{''.join(cellules)}
</div>
{pied(f'Salles · {n}/3')}
</div>"""
LEG = (f'<div class="room" style="background:{T};border-color:{F}">'
       '<p style="margin:0"><b style="color:' + A + '">Objets</b> (Fouille) : <span class="obj">V</span> vert, <span class="obj">R</span> rouge, <span class="obj">J</span> jaune.</p>'
       '<p style="margin:0"><b style="color:' + A + '">Action de salle</b> : 2 cartes, hors combat.</p>'
       '<p style="margin:0"><b style="color:' + A + '">Ordinateur</b> : salle utilisable depuis la Salle des serveurs ; robot activable à distance.</p></div>')
EXPLO = (f'<div class="room" style="background:{T};border-color:{F}"><p style="margin:0"><b style="color:' + A + '">Exploration</b> : la salle placée est du type indiqué par la carte (A, B, C ou « ? ») ; s\'il n\'en reste plus, une « ? ».</p>'
         '<p style="margin:0">Toutes les salles « ? » ne seront pas en jeu.</p></div>')
ALEA_R = [room(n, '?', nom, o, ic, fx, pr) for n, nom, o, ic, fx, pr in ALEA]
s1 = spage('Salles des sections A et B', 'Fiche 1 · recto', [room(*r) for r in SEC[:8]] + [LEG], 1)
s2 = spage('Section C et salles « ? »', 'Fiche 1 · verso', [room(*r) for r in SEC[8:]] + ALEA_R[:5], 2)
s3 = spage('Salles aléatoires « ? »', 'Fiche 2 · recto', ALEA_R[5:] + [EXPLO], 3)

out = ICI / 'fr'
out.mkdir(exist_ok=True)
for nom, titre, corps, w, h in [('Aide-1-manche.dc.html', 'Nemesis, une manche', p1, 559, 794),
                                ('Aide-2-bruit-sac.dc.html', 'Nemesis, bruit et sac Intrus', p2, 559, 794),
                                ('Aide-3-combat-survie.dc.html', 'Nemesis, combat et survie', p3, 559, 794),
                                ('Salles-1.dc.html', 'Nemesis, salles 1', s1, 794, 559),
                                ('Salles-2.dc.html', 'Nemesis, salles 2', s2, 794, 559),
                                ('Salles-3.dc.html', 'Nemesis, salles 3', s3, 794, 559)]:
    (out / nom).write_text(doc(titre, corps, w, h), encoding='utf-8')
    print(out / nom)
