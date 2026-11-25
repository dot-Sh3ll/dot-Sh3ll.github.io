#!/usr/bin/env python3
"""English A5 sheets for Nemesis: Retaliation: writes the .dc.html pages into outils/nemesis-fiches/en/.
Same layout as gen_pages.py (French, validated by Paul); terms follow the English app (nemesis/en.html):
Adult, Drone (= Guerrier), Larva, Queen, Noise roll, Hazard, Secure token, Life Support, Anti-Aircraft, Lander.
usage (repository root): python3 outils/nemesis-fiches/gen_pages_en.py
"""
import pathlib

ICI = pathlib.Path(__file__).resolve().parent
src = (ICI / 'gen_pages.py').read_text(encoding='utf-8')
exec(src[:src.index('# ---------------------------------------------------------------- aide de jeu, page 1')])  # STYLE, doc, tete, pied, A, T, F

ACT = [('0', 'Play an Action card', ''), ('0', 'Pass', ''), ('1', 'Make a Move', 'Noise roll'),
       ('1', 'Place 1 Secure token', 'Not in Combat'), ('1', 'Fire a Shot in your Room', 'loaded Weapon'),
       ('1', 'Fire a Burst at an adjacent Corridor', 'spends Ammo'), ('1', 'Melee Attack', '+1 Contamination'),
       ('1', 'Use an Item', ''), ('1', 'Activate the Robot', 'Not in Combat; +1 remotely'),
       ('1', 'Trade', 'Not in Combat'), ('1', 'Use any Tactical Gear', 'as many tokens as you like'),
       ('2', 'Use the Room', 'Not in Combat'), ('2', 'Make a Move Cautiously', 'Not in Combat; +1 Secure token')]

p1 = f"""<div class="pg pt">
{tete('A Round', 'Sheet 1 · front')}
<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px">
<div class="card"><h3>1. Player Phase</h3>
<p>In turn, until everyone has Passed: <b>2 Actions</b>, then <b>−1 Oxygen</b> if your Section's Life Support is inactive, then <b>−1 Health</b> if your Room has Fire.</p>
<p class="note"><i>Objective: choose it before, between or after your 2 Actions, never in the middle of one (3 / 2 / 2 / 1 / 1 cards).</i></p></div>
<div class="card"><h3>2. Intruder Phase</h3>
<p><b>1 Hit</b> to each Intruder in a Room with Fire (burning Nest: −1 Egg).</p>
<p>Then Intruders <b>Attack</b>, Room by Room from the top left, largest first, on the first in Turn order.</p></div>
<div class="card"><h3>3. Event Phase</h3>
<p>Lander passengers: launch possible at the start of the phase.</p>
<p><b>Event</b> card (movement, main effect, secondary effect), then <b>1 token</b> from the Intruder bag.</p></div>
<div class="card"><h3>4. Cleanup Phase</h3>
<p>Starting Player token to the left; everyone draws up to <b>5 cards</b>; Round track <b>+1</b>.</p>
<p class="note"><i>Lander on space 10: Anti-Aircraft check. Autodestruction: explosion. After Round 14: end.</i></p></div>
</div>
<div>
<h2>Actions</h2>
<table><thead><tr><th class="c">Cost</th><th>Action</th><th>Remember</th></tr></thead><tbody>
{''.join(f'<tr><td class="c">{c}</td><td>{a}</td><td>{r}</td></tr>' for c, a, r in ACT)}
</tbody></table>
<p class="note" style="margin-top:3px"><i>Not in Combat</i>: impossible in a Room with at least 1 Intruder. Cards discarded to pay are not resolved; Contamination cards never pay.</p>
</div>
{pied('Game aid · 1/3')}
</div>"""

SAC = [('Queen', 'Activate her; otherwise place her in the Corridor.', 'Activate her; otherwise place her in the Room.', 'Queen in play: activate her. Otherwise: +2 Larvae.'),
       ('Drone, Adult', 'Place the Intruders shown on the back (white: Adults, red: Drones).', 'Place 1 Intruder of the type shown.', '+2 Queens.'),
       ('Larva', 'Place 1 Larva.', 'Place 1 Larva.', '+2 Drones.'),
       ('Blank', '+2 Adults to the bag.', '+2 Adults to the bag.', '+2 Adults to the bag.')]
MORTE = [('Queen', '1 Drone; remove the token.', '1 Drone; remove the token.', '+2 Drones; remove the token.'),
         ('Drone, Adult', 'Intruders shown on the back.', '1 Intruder of the type shown.', '+2 Larvae.'),
         ('Larva', '1 Larva.', '1 Larva.', '+2 Drones.')]

def tsac(rows):
    return ('<table><thead><tr><th style="width:62px">Token</th><th>In a Corridor</th><th>In a Room</th><th>Event Phase</th></tr></thead><tbody>'
            + ''.join(f'<tr><td><b>{a}</b></td><td>{b}</td><td>{c}</td><td>{d}</td></tr>' for a, b, c, d in rows) + '</tbody></table>')

p2 = f"""<div class="pg pt">
{tete('Noise, Intruders and Items', 'Sheet 1 · back')}
<div class="box">
<h2>Noise roll</h2>
<ul>
<li><b>1 to 4</b>: for each adjacent Corridor with that number, an Intruder there → <b>the largest enters</b> and Attacks; a Noise marker → <b>resolve it</b> (bag, Corridor column); nothing → <b>place a Noise marker</b>.</li>
<li><b>Hazard</b>: a token from the bag, Room column: the Intruder shown appears in your Room.</li>
<li>Reinforced Corridor = 0. Full Corridor = 6 Intruders (Queen = 4) or 1 Noise marker.</li>
</ul>
</div>
<div>
<h2>Intruder bag (Queen alive)</h2>
{tsac(SAC)}
<p class="note" style="margin-top:3px">The drawn token goes back <b>under its pile</b>, except the Blank, which goes back into the bag. Starting bag: 1 Blank, 2 Larvae, 3 Adults + 1 per Character.</p>
</div>
<div>
<h2>"The Queen is dead" side <span style="font-family:'Source Sans 3',sans-serif;font-weight:400;font-size:12px;color:#4b4e58">(Blank token: unchanged)</span></h2>
{tsac(MORTE)}
</div>
<div class="box">
<h2>Items</h2>
<ul>
<li><b>Search</b>: 1 Item card per Item icon of the Room; keep 1, put the others back under their deck.</li>
<li><b>Regular Items</b>: in your Backpack, no limit, secret. <b>Heavy Items</b> (Weapons, Eggs): one per hand, 2 hands.</li>
<li><b>Interaction</b>: with their consent, an Item can be used on a Character in your Room (Health, Serious Wound, Malfunction, Oxygen). Otherwise, Trade (1 card, Not in Combat).</li>
</ul>
</div>
{pied('Game aid · 2/3')}
</div>"""

p3 = f"""<div class="pg pt">
{tete('Combat and survival', 'Sheet 2 · front')}
<div class="box">
<h2>Combat</h2>
<ul>
<li><b>Shoot</b> (Room): +1 Hit, then Shoot die. Critical = dead; 2 to 5 = dead if ≤ Hits; Ammo face = spend Ammo.</li>
<li><b>Melee</b>: +1 Contamination, +1 Hit, Shoot die (last face: nothing). If the Intruder survives, it strikes back.</li>
<li><b>Burst</b> (Corridor): spend Ammo, 1 to 4 Hits: at most 1 per Adult or Larva, <b>exactly 2</b> per Drone, the Queen as many as you like.</li>
<li><b>Grenade</b>: Burst die + 2 Hits in an adjacent Corridor (not a Burst).</li>
<li><b>Larva</b>: 1 Hit kills it. Its Attack: +1 Contamination and the Larva on your board.</li>
<li><b>Queen</b>: Hit track; at the end, a Health card (discard as many cards as its number, apply the effect, marker to 0).</li>
</ul>
</div>
<div class="box">
<h2>Escaping</h2>
<ul>
<li><b>Lander</b>: when the Round track reaches its token, reveal the top Anti-Aircraft token. Active: it is shot down. Inactive: it lands in the Landing Zone.</li>
<li><b>Boarding</b>: Use the Landing Zone, with a Noise roll. On board: your turn is skipped, no Oxygen or Health lost. An Intruder appears there: everyone gets off.</li>
<li><b>Launch</b>: at the start of the Event Phase, any passenger may decide it alone. Everyone on board has escaped.</li>
<li><b>Escape Shuttle</b>: Noise roll, one seat only; Anti-Aircraft does not stop it. <b>Hibernatorium</b>: Noise roll, if it has been activated.</li>
<li><b>Autodestruction</b>: token 5 Rounds after the current one. When reached, the Facility explodes: everyone inside dies, Hibernatorium included. Only the Reactor stops it.</li>
</ul>
</div>
<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px">
<div class="box">
<h2>Health and Oxygen</h2>
<ul>
<li>Healthy → Injured → Heavily Injured → skull. <b>Armor</b>: destroyed instead of losing 1 point.</li>
<li>Oxygen 7 at most; Oxygen token +3, Medpack +2 Health.</li>
<li>Counter below 0: <b>Suffocating</b>, one turn to find Oxygen.</li>
</ul>
</div>
<div class="box">
<h2>End of the game</h2>
<ol>
<li>No Larva: all your cards in hand, Infection Procedure.</li>
<li>With a Larva: +1 Contamination, hatching (4 cards; one Contamination = death).</li>
<li>Alive, escaped or hibernating: reveal your Objective.</li>
</ol>
</div>
</div>
<div style="border-radius:6px;padding:5px 9px;background:{T};border:1px solid {F}">
<p style="margin:0"><b style="color:{A}">Nightmare Rule:</b> when in doubt, apply the worst outcome for the players, then for the first in Turn order. <b style="color:{A}">Local effects:</b> with no clear target, the effect applies in your Room.</p>
</div>
{pied('Game aid · 3/3')}
</div>"""

SEC = [
 (14, 'A', "Landing Zone", '', '4 token slots', "Take as many available Tactical Gear tokens as you like. <b>OR</b> Noise roll to board the Lander.", "Only if the Lander is there. Intruder in the Room after the roll: it fails."),
 (15, 'A', "Life Support Control A", 'GR', 'Computer', "Flip the Life Support token of Section A. <b>OR</b> Discard a Fire marker anywhere in the Facility.", ""),
 (16, 'A', "Surgery Room", 'GGG', '', "Discard all your Action cards: remove your Larva and scan your deck and discard pile (remove the infected ones). <b>OR</b> Discard 1 Serious Wound.", "1st effect: only with a Larva. Reshuffle afterwards."),
 (17, 'A', "Drilling Room", 'YYY', 'Computer', "Place a new Corridor from the Robot's Room.", "To a discovered Room or not. Malfunctioned Robot: impossible."),
 (18, 'B', "Hibernatorium", '', '', "Noise roll to hibernate.", "If active (Life Support Control C). Intruder in the Room after the roll: it fails."),
 (19, 'B', "Life Support Control B", 'GR', '', "Flip the Life Support token of Section B. <b>OR</b> Look at both Anti-Aircraft tokens and reorder them.", "The top token gives the status. Nothing to reveal."),
 (20, 'B', "Server Room", 'RY', 'Computer', "Use a discovered Room with a Computer. <b>OR</b> Gain a Data token (1 at most).", "Not a Room with a Malfunction marker."),
 (21, 'B', "Cooling System", 'YYY', 'Computer', "Start the Autodestruction Procedure.", "Token placed 5 Rounds ahead on the Round track."),
 (22, 'C', "Life Support Control C", 'GR', '', "Flip the Life Support token of Section C. <b>OR</b> Activate the Hibernatorium.", "The Hibernatorium cannot be turned off again."),
 (23, 'C', "Reactor", 'RY', '', "Remove the Life Support tokens, the Autodestruction token and both Anti-Aircraft tokens from the game.", "Everything is inactive, for good."),
 (24, 'C', "Escape Shuttle", 'GR', '', "Noise roll to board the Escape Shuttle.", "One seat only. Anti-Aircraft does not stop it."),
 (25, 'C', "Nest", '', 'never Secured, never Malfunctions', "Take or destroy 1 Egg, then Noise roll.", "Eggs: Heavy Items. No Eggs left: Nest destroyed (Fire is not enough)."),
]
ALEA = [
 (1, "Fire Suppression System", 'GY', 'Computer', "Discard all Fire markers from a Section.", ""),
 (2, "Shelter", 'GR', 'Secured by default', "No Larva: remove the Contamination cards in your hand from the game, without scanning them.", "A permanent status, not a token; up to 3 extra tokens, discarded first."),
 (3, "Infirmary", 'GGG', '', "Regain 2 Health. <b>OR</b> Discard 1 Serious Wound.", ""),
 (4, "Storage", 'GRY', 'never Secured', "Draw 1 green, 1 red, 1 yellow Item; keep 2.", ""),
 (5, "Armory", 'RRR', '', "Gain as many Ammo and Grenade tokens as you like.", "In free slots."),
 (6, "Door Control", 'RY', 'Computer', "Open and/or close as many Doors as you like in a Section.", "Only Doors with a threshold."),
 (7, "Robot Console", 'RY', 'Computer', "1 Secure token in the Robot's Room. <b>OR</b> Reinforce an empty Corridor adjacent to the Robot.", ""),
 (8, "Turret Control", 'RRR', 'Computer', "Corridor adjacent to a Room with a red Item icon, no Malfunction: Burst die of Hits.", "Not a Burst: no Ammo spent."),
 (9, "Pressure Control", 'YYY', 'Computer', "Move 1 Intruder anywhere in the Facility.", "Room ↔ Corridor, in any direction."),
 (10, "Alarm Signal", 'GR', 'Computer', "Resolve or discard a Noise marker anywhere.", ""),
 (11, "Experimental Military Lab", 'RY', '', "Gain as many Ammo tokens as you like. <b>OR</b> 2 random Support Equipment cards, keep 1.", ""),
 (12, "Technical Corridor Entrance", 'YYY', 'never Secured', "Move to any Room; Adult Attack (card only), then Noise roll.", "Secure tokens do not count; the Attack can be prevented."),
 (13, "Decontamination Room", 'GGG', '', "Discard your Action cards and 2 Oxygen: remove all Contamination cards from your deck and discard pile.", "Impossible with 1 Oxygen or less."),
]

def objs(o):
    return ''.join(f'<span class="obj">{c}</span>' for c in o)

def room(n, s, nom, o, ic, fx, pr):
    badge = f'<span class="sec">{s}</span> ' if s else ''
    num = f'<span class="note" style="font-size:11px">no. {n:02d}</span>'
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
{pied(f'Rooms · {n}/3')}
</div>"""
LEG = (f'<div class="room" style="background:{T};border-color:{F}">'
       '<p style="margin:0"><b style="color:' + A + '">Items</b> (Search): <span class="obj">G</span> green, <span class="obj">R</span> red, <span class="obj">Y</span> yellow.</p>'
       '<p style="margin:0"><b style="color:' + A + '">Use the Room</b>: 2 cards, Not in Combat.</p>'
       '<p style="margin:0"><b style="color:' + A + '">Computer</b>: the Room can be used from the Server Room; the Robot can be activated remotely.</p></div>')
EXPLO = (f'<div class="room" style="background:{T};border-color:{F}"><p style="margin:0"><b style="color:' + A + '">Exploration</b>: the Room placed is of the type shown on the card (A, B, C or "?"); if none is left, a "?" Room.</p>'
         '<p style="margin:0">Not all "?" Rooms will be in play.</p></div>')
ALEA_R = [room(n, '?', nom, o, ic, fx, pr) for n, nom, o, ic, fx, pr in ALEA]
s1 = spage('Section A and B Rooms', 'Sheet 1 · front', [room(*r) for r in SEC[:8]] + [LEG], 1)
s2 = spage('Section C and "?" Rooms', 'Sheet 1 · back', [room(*r) for r in SEC[8:]] + ALEA_R[:5], 2)
s3 = spage('Random "?" Rooms', 'Sheet 2 · front', ALEA_R[5:] + [EXPLO], 3)

out = ICI / 'en'
out.mkdir(exist_ok=True)
for nom, titre, corps, w, h in [('Aide-1-manche.dc.html', 'Nemesis, a Round', p1, 559, 794),
                                ('Aide-2-bruit-sac.dc.html', 'Nemesis, Noise and Intruder bag', p2, 559, 794),
                                ('Aide-3-combat-survie.dc.html', 'Nemesis, combat and survival', p3, 559, 794),
                                ('Salles-1.dc.html', 'Nemesis, Rooms 1', s1, 794, 559),
                                ('Salles-2.dc.html', 'Nemesis, Rooms 2', s2, 794, 559),
                                ('Salles-3.dc.html', 'Nemesis, Rooms 3', s3, 794, 559)]:
    (out / nom).write_text(doc(titre, corps, w, h).replace('<html lang="fr">', '<html lang="en">'), encoding='utf-8')
    print(out / nom)
