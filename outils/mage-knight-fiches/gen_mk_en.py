#!/usr/bin/env python3
"""Mage Knight game aid, English edition (8 A5 pages). Rebuilt in HTML after the French sheets; style: shared template (outils/fiches-gabarit), Mage Knight blue #52789d, Marcellus + Source Sans 3;
the site and enemy-ability pictures are cropped from those sheets (ico/).
usage: python3 gen_mk_en.py  -> mage-knight-game-aid.pdf"""
import asyncio, os
from playwright.async_api import async_playwright
H = os.path.dirname(os.path.abspath(__file__))
POL = os.path.join(H, "..", "..", "commun", "polices")  # polices du site
MARC = os.path.join(POL, "marcellus-latin.woff2")
I = lambda n: f'<img src="ico/{n}.png" alt="">'

CSS = """
@font-face{font-family:"Marcellus";src:url("file://MARCPATH") format("woff2")}
@font-face{font-family:"Source Sans 3";font-weight:200 900;src:url("file://POLPATH/source-sans-3-latin.woff2") format("woff2")}
@font-face{font-family:"Source Sans 3";font-style:italic;font-weight:200 900;src:url("file://POLPATH/source-sans-3-italic-latin.woff2") format("woff2")}
@page{margin:0}
*{box-sizing:border-box}
html,body{margin:0}
body{font-family:"Source Sans 3",sans-serif;color:#1c1d22;font-size:7.9pt;line-height:1.27;-webkit-print-color-adjust:exact;print-color-adjust:exact}
.pg{position:relative;width:148mm;height:210mm;overflow:hidden;padding:6mm 7mm 10mm;page-break-after:always;background:#fff}
.pg:last-child{page-break-after:auto}
.ttl{display:flex;justify-content:space-between;align-items:baseline;border-bottom:.5mm solid #1c1d22;padding-bottom:1mm;margin-bottom:2mm}
.ttl h1{font-family:Marcellus,serif;font-weight:400;font-size:18pt;margin:0;letter-spacing:.01em}
.ttl span{font-family:Marcellus,serif;font-size:10pt}
h2{font-family:Marcellus,serif;font-weight:400;font-size:10.6pt;color:#52789d;margin:0 0 1.3mm;padding-bottom:.6mm;border-bottom:.25mm solid #b9cde0}
h3{font-family:Marcellus,serif;font-weight:400;font-size:10pt;color:#52789d;margin:0 0 1mm;padding-bottom:.4mm;border-bottom:.25mm solid #b9cde0}
p{margin:0 0 1mm} ul,ol{margin:0 0 1mm;padding-left:4.5mm} li{margin:0 0 .5mm}
b{font-weight:700}
.box{border:.3mm solid #8d8899;border-radius:2mm;padding:1.5mm 2.3mm;margin-bottom:1.8mm}
.box.strong{border:.6mm solid #52789d;background:#f2f7fd}
.box.warn{border:.5mm solid #9d2b2b;background:#fdf1f1}
.box.warn b.r{color:#9d2b2b}
.box.day{border:.4mm solid #c9a24e}
.box.night{border:.4mm solid #52789d;background:#f2f7fd}
.g2{display:grid;grid-template-columns:1fr 1fr;gap:2.4mm}
.g2 .box{margin-bottom:0}
.walls img{width:13mm;display:block;margin-bottom:1.5mm}
.hex svg{width:58mm;flex:none}
.formula{font-family:Marcellus,serif;font-size:10.5pt;margin:.3mm 0 .6mm;text-align:center}
table{border-collapse:collapse;width:100%;font-size:7.5pt;margin:.5mm 0 1mm}
th{background:#f2f7fd;text-align:left;font-weight:700;padding:.45mm 1.2mm;border:.25mm solid #c9cdd6}
td{padding:.4mm 1.2mm;border:.25mm solid #c9cdd6;vertical-align:top}
td.c,th.c{text-align:center}
.green{color:#2f6b2a;font-weight:700}
.muted{color:#6d6878}
.bar{background:#52789d;color:#fff;border-radius:1.6mm;padding:1.1mm 2.6mm;margin:0 0 1.3mm}
.bar h2{color:#fff;border:0;margin:0;padding:0;font-size:12pt}
.bar p{margin:.3mm 0 0;font-weight:700;font-size:8pt}
.sites{display:grid;grid-template-columns:1fr 1fr;gap:1.2mm 3mm;margin-bottom:2mm}
.site{display:grid;grid-template-columns:13mm 1fr;gap:2mm}
.site img{width:13mm;max-height:16mm;object-fit:contain}
.site .hd{display:flex;justify-content:space-between;align-items:center;margin-bottom:.4mm}
.site .hd b{color:#52789d}
.site ul{padding-left:3.6mm;margin:0}
.dots{white-space:nowrap;font-size:7pt;letter-spacing:.2mm;color:#8e1f1f}
.abil{display:grid;grid-template-columns:7.2mm 1fr;gap:1.6mm;padding:.9mm 0;border-bottom:.25mm solid #e1dccf}
.abil img{width:7.2mm;max-height:8.6mm;object-fit:contain}
.abil b{color:#52789d;display:block;font-size:8.4pt}
.abil p{font-size:8pt;margin:0}
.col h2{font-size:12pt}
.foot{position:absolute;left:7mm;right:7mm;bottom:3.5mm;display:flex;justify-content:space-between;font-size:8.25pt;color:#52789d;border-top:.26mm solid #52789d;padding-top:1mm}
.foot span:first-child{font-weight:600}
.hex{display:flex;gap:3mm;align-items:center}
.mana i{display:inline-block;width:3mm;height:3mm;border-radius:50%;border:.25mm solid #333;vertical-align:-.5mm;margin:0 .6mm 0 1.2mm}
""".replace("MARCPATH", MARC).replace("POLPATH", POL)

D = lambda n: '<span class="dots">' + "●" * n + "○" * (5 - n) + "</span>"
N = [0]  # numéro de page, pour le pied de page du gabarit commun

def page(title, body, num=""):
    N[0] += 1
    foot = f'<div class="foot"><span>Less Rules, More Play · paulmoussard.com</span><span>Game aid · {N[0]}/8</span></div>'
    return f'<section class="pg"><div class="ttl"><h1>{title}</h1><span>{num}</span></div>{body}{foot}</section>'

def site(img, name, dots, items):
    return f'<div class="site">{I(img)}<div><div class="hd"><b>{name}</b>{D(dots) if dots is not None else ""}</div><ul>{"".join(f"<li>{x}</li>" for x in items)}</ul></div></div>'

P1 = page("Combat", """
<div class="box"><h2>Entering combat · it is your Action for the turn</h2><ul>
<li><b>Provoke</b> or <b>challenge</b> a rampaging enemy · <b>Assault</b> a fortified site (−1 Reputation) · <b>Enter</b> an adventure site.</li>
<li>All engaged enemies form <b>a single combat</b>.</li></ul></div>
<div class="box strong"><h2>The 4 phases</h2><div class="g2">
<div class="box"><h3>1 · Ranged and Siege</h3><p>Defeat them <b>before they attack</b>, with ranged or siege attacks only.<br><b>Fortified</b>: Siege attacks only.<br><b>Double Fortified</b>: untouchable.</p></div>
<div class="box"><h3>2 · Block</h3><p>Each attack is blocked <b>separately</b>: Block ≥ Attack.<br>Mind elements and resistances.<br><b>Swift</b>: you need 2 × the Attack.</p></div>
<div class="box"><h3>3 · Damage</h3><p>Unblocked attacks, one by one, onto <b>Units</b> and/or the <b>Hero</b>.</p></div>
<div class="box"><h3>4 · Attack</h3><p>Every type of attack can be used here, even ranged and siege.<br>Group: <b>sum of the Armors, combined Resistances</b>.</p></div>
</div></div>
<div class="box warn"><p style="margin:0"><b class="r">Don't forget</b> · <b>Group</b>: <b>every Resistance of every enemy applies to the whole group</b>. You may group enemies freely. Tip: isolate the resistant enemies.</p></div>
<div class="g2">
<div class="box"><h2>Phases 1 and 4 · Attacking</h2><p class="formula">efficient + ½ inefficient ≥ Armor</p>
<table><tr><th>Your attack</th><th>Inefficient if the enemy has</th></tr><tr><td>Physical</td><td>Physical Res.</td></tr><tr><td>Fire</td><td>Fire Res.</td></tr><tr><td>Ice</td><td>Ice Res.</td></tr><tr><td>Cold Fire</td><td>Fire <b>and</b> Ice Res.</td></tr></table>
<p class="muted" style="margin:0">Cards played sideways give 1 physical Attack.</p></div>
<div class="box"><h2>Phase 2 · Blocking</h2><p class="formula">efficient + ½ inefficient ≥ Attack</p>
<table><tr><th>Enemy attack</th><th>Efficient Block</th></tr><tr><td>Physical</td><td>any</td></tr><tr><td>Fire</td><td>Ice, Cold Fire</td></tr><tr><td>Ice</td><td>Fire, Cold Fire</td></tr><tr><td>Cold Fire</td><td>Cold Fire only</td></tr></table>
<p class="muted" style="margin:0">Block with no icon = physical.<br>Swift: 2 × the Attack.</p></div></div>
<div class="box" style="margin-top:1.8mm"><h2>Working out "½ inefficient"</h2><ol>
<li>Add up all the <b>inefficient</b> values.</li><li>Divide the total by 2, <b>rounded down</b>.</li><li>Add the <b>efficient</b> values, in full.</li></ol>
<p style="margin:0"><b>Example</b>: Ice Block 3 (efficient) + Physical Block 3 + Fire Block 2 (inefficient) against a Fire attack 6: 3 + (3 + 2) ÷ 2 = 3 + 2 = <b>5 &lt; 6, the block fails</b>.</p></div>
""", "1 / 2")

P2 = page("Combat", """
<div class="box warn"><p style="margin:0"><b class="r">Don't forget</b> · Taking damage always means <b>at least 1 Wound</b>.<br><b class="r">Exception</b> · A Unit with Resistance to the attack's type AND an Armor ≥ the attack.</p></div>
<div class="g2">
<div class="box"><h2>Phase 3 · A Unit takes damage</h2><ul>
<li>Any Unit, ready or spent, may absorb damage <b>as long as it is not already wounded</b>.</li>
<li style="margin-top:1.5mm">If the Unit has a resistance to the damage type <b>AND</b> its Armor is greater than or equal to the attack, <b>it takes no Wound</b>.</li>
<li style="margin-top:1.5mm">Otherwise the Unit takes <b>1 Wound</b> and subtracts <b>its Armor</b> from the damage; the rest must be absorbed by another Unit or the Hero.</li></ul>
<p style="margin-top:1.5mm"><b>Paralyze</b>: if wounded, it is destroyed.<br><b>Poison</b>: if wounded, it takes 2 Wounds.<br><b>Assassination</b>: Units may not absorb this damage, only the Hero can.</p></div>
<div class="box"><h2>Phase 3 · The Hero takes damage</h2><p><b>Brutal</b>: damage × 2 first.</p>
<p class="formula">Damage ÷ Armor, rounded up<br>= number of Wounds</p>
<table><tr><th>Damage</th><th class="c">Arm. 2</th><th class="c">Arm. 3</th><th class="c">Arm. 4</th><th class="c">Arm. 5</th></tr>
<tr><td>2</td><td class="c">1</td><td class="c">1</td><td class="c">1</td><td class="c">1</td></tr><tr><td>3</td><td class="c">2</td><td class="c">1</td><td class="c">1</td><td class="c">1</td></tr>
<tr><td>4</td><td class="c">2</td><td class="c">2</td><td class="c">1</td><td class="c">1</td></tr><tr><td>6</td><td class="c">3</td><td class="c">2</td><td class="c">2</td><td class="c">2</td></tr>
<tr><td>8</td><td class="c">4</td><td class="c">3</td><td class="c">2</td><td class="c">2</td></tr><tr><td>12</td><td class="c">6</td><td class="c">4</td><td class="c">3</td><td class="c">3</td></tr></table>
<p>Wounds go <b>into your hand</b>.<br><b>Poison</b>: +1 Wound in your discard pile per Wound received.<br><b>Paralyze</b>: discard your non-Wound cards.</p></div></div>
<div class="box warn" style="margin-top:1.8mm"><p style="margin:0"><b class="r">Knocked out</b>: if the Wounds received <b>during this combat</b> reach your hand limit, discard all your non-Wound cards. The combat goes on.</p></div>
<div class="box"><h2>Dragon: Fire Attack 6, Brutal, vs. a Unit with Armor 4 and a Hero with Armor 3</h2>
<p><b>Block</b>: against Fire, only an Ice (or Cold Fire) Block is efficient. Ice Block 6: <b>attack blocked</b>. Physical Block 4 + Fire Block 4: both inefficient, (4 + 4) ÷ 2 = 4 &lt; 6: <b>not blocked</b>.</p>
<p><b>Not blocked</b>: 6 × 2 (Brutal) = 12 damage. The Unit absorbs 4 damage and takes 1 Wound: 8 left. The Hero takes 8 ÷ 3 = 2.67, rounded up = 3 Wounds.</p>
<p style="margin:0"><b>Result: the Unit is wounded, the Hero adds 3 Wounds to their hand.</b></p></div>
<div class="box"><h2>After combat</h2><ul>
<li><span class="green">Fame</span>: the value of each defeated enemy (Fame and level at the end of the turn).</li>
<li><span class="green">Site conquered</span>: place a Shield; reward at the end of the turn.</li>
<li><b>Enemies not defeated</b>: they stay on their space. Failed assault: move back to the space you came from.</li>
<li><b>Wounded Units</b>: unusable until healed. Healing a Unit takes X Healing, X being the Unit's level (top left of its card).</li></ul></div>
""", "2 / 2")

P3 = page("Sites", f"""
<div class="bar"><h2>Rampaging enemies</h2><p>Provoked by moving from one adjacent space to another, or challenged as an Action. You cannot move onto their space.</p></div>
<div class="sites">{site("orcs","Marauding Orcs",1,["Green enemy, face up",'<span class="green">Reward: +1 Reputation</span>'])}{site("draconum","Draconum",4,["Red enemy, face up",'<span class="green">Reward: +2 Reputation</span>'])}</div>
<div class="bar"><h2>Fortified sites</h2><p>Assault: move there as terrain allows, −1 Reputation, the defender is Fortified.</p></div>
<div class="sites">{site("keep","Keep",2,["Grey enemy, face down<br>Revealed by day if a player is adjacent",'<span class="green">If conquered: 1 Shield</span>',"Recruit (icon)","End of turn in it / next to it: hand limit +1","PvP: another player may attack you"])}{site("tower","Mage Tower",3,["Purple enemy, face down<br>Revealed by day if a player is adjacent",'<span class="green">If conquered: 1 Shield + 1 Spell</span>',"Then for everyone: recruit (icon)","Buy: 7 Influence + 1 mana → 1 Spell"])}</div>
<div class="bar"><h2>Sites without combat</h2></div>
<div class="sites">{site("village","Village",0,["Recruit (icon)","Heal: 3 Influence → 1 Healing","Plunder (on another player's turn): −1 Reputation, +2 cards"])}{site("monastery","Monastery",0,["Recruit (icon)","Heal: 2 Influence → 1 Healing","Training: 6 Influence → 1 Advanced Action","Burn the monastery: −3 Reputation, purple enemy<br><b>Your Units don't take part</b><br><span class='green'>Reward: 1 Shield + 1 Artifact</span>"])}
{site("mine","Crystal Mine",0,['<span class="green">End your turn on it: 1 Crystal of its color</span>'])}{site("glade","Magical Glade",0,["Start of turn: gold mana (Day) / black mana (Night)",'<span class="green">End of turn: throw away 1 Wound</span>'])}</div>
<div class="box strong"><p style="margin:0"><span class="green">Rewards</span> are received at the end of the turn · <b>Crystal by die</b>: gold = any color, black = 1 Fame · <b>Artifact</b>: draw 2, keep 1 · <span class="dots">●</span> = danger.</p></div>
""")

P4 = page("Adventure sites and Cities", f"""
<div class="bar"><h2>Adventure sites</h2><p>Entering one is your Action.</p></div>
<div class="sites">{site("ruins","Ancient Ruins",2,["Token face down at night, revealed by day or if a player enters.","Altar: 3 mana of the token → <span class='green'>reward: 7 Fame</span>","Enemies: fight them, <span class='green'>gain the token's reward</span>","Undefeated: they stay",'<span class="green">If conquered: 1 Shield</span>'])}{site("lair","Monster Den",2,["1 brown enemy drawn on entering.",'<span class="green">If conquered: 1 Shield + 2 Crystals</span>',"Undefeated: it stays"])}
{site("den","Spawning Grounds",3,["2 brown enemies drawn on entering.",'<span class="green">If conquered: 1 Shield + 1 Artifact + 3 Crystals</span>'])}{site("dungeon","Dungeon",3,["1 brown enemy drawn on entering.","<b>Night rules · your Units don't take part</b>",'<span class="green">If conquered: 1 Shield + die: black/gold = 1 Spell, else 1 Artifact</span>'])}
{site("tomb","Tomb",4,["1 red enemy drawn on entering.","<b>Night rules · your Units don't take part</b>",'<span class="green">If conquered: 1 Shield + 1 Spell + 1 Artifact</span>'])}</div>
<div class="bar"><h2>Cities · fortified site</h2><p>Assault: move there as terrain allows, −1 Reputation per player, the defender is Fortified.</p></div>
<div class="g2" style="margin-bottom:1.6mm"><ul style="margin:0"><li>Defenders face down on the City card, revealed when a player is adjacent, <b>even at Night</b>.</li><li>Fortified defenders + color bonus</li><li class="green">1 Shield per defender defeated</li><li class="green">All defeated: conquest; Leader = most Shields</li></ul>
<div><b style="color:#52789d">Conquered</b><ul style="margin:0"><li>Anyone may be there, no combat between players</li><li>Recruit (City icon) and its interaction</li><li>Interaction here: +1 Influence per Shield placed</li><li>End of turn in it / next to it: hand +2 (Leader) or +1</li></ul></div></div>
<table><tr><th>City</th><th>Defender bonus</th><th>Interaction</th></tr>
<tr><td><b>White</b></td><td>+1 Armor</td><td>Any Unit type · 2 Influence → +1 Elite</td></tr>
<tr><td><b>Blue</b></td><td>Ice/Fire Attacks +2, Cold Fire +1</td><td>7 Influence + 1 mana → 1 Spell</td></tr>
<tr><td><b>Red</b></td><td>Brutal physical Attacks</td><td>12 Influence → 1 Artifact</td></tr>
<tr><td><b>Green</b></td><td>Poison physical Attacks</td><td>6 Influence → 1 Advanced Action</td></tr></table>
""")

P5 = page("The Lost Legion sites", f"""
<div class="bar"><h2>Adventure sites</h2><p>Entering one is your Action.</p></div>
<div class="sites">{site("maze","Maze",2,["1 brown enemy drawn, discarded after the combat",'If defeated: <span class="green">1 Shield on the path + reward</span>'])}{site("labyrinth","Labyrinth",4,["1 red Draconum drawn, discarded after the combat",'If defeated: <span class="green">1 Shield on the path + reward + 1 Advanced Action</span>'])}</div>
<div class="box"><ul style="margin:0">
<li><b>A single Unit</b> (ready, unwounded) comes with you; <b>no other Unit</b> for the whole action</li>
<li>Choose a path: pay <b>2, 4 or 6 Movement</b> (not the points left from your Movement phase)</li>
<li>Reward: path 2 = <span class="green">2 Crystals of your choice</span> · 4 = <span class="green">1 Spell</span> · 6 = <span class="green">1 Artifact</span></li></ul></div>
<div class="box strong"><p style="margin:0"><b>Partly conquered site</b>: another player may enter it by another path. A player conquers a given Maze or Labyrinth only once; each path can only be conquered once. <span class="green">Game end: 2 Fame per Shield placed (Adventurer title).</span></p></div>
<div class="bar"><h2>Sites without combat</h2><p>Usable as soon as the tile is revealed.</p></div>
<div class="sites">{site("deepmine","Deep Mine",0,['<span class="green">End your turn on it: 1 Crystal of a color of your choice among the Mine\'s</span>'])}{site("refugee","Refugee Camp",0,["Recruit <b>any Unit</b>","Extra cost: Village +0 · Keep, Tower, Monastery +1 · City +3","Units recruitable at several sites: lowest extra cost"])}</div>
<div class="bar"><h2>Walls</h2><p>Fortified edge between two spaces.</p></div>
<div class="walls" style="display:grid;grid-template-columns:13mm 1fr 1fr;gap:2mm"><div>{I("wall1")}<br>{I("wall2")}</div>
<div><b style="color:#52789d">Movement</b><ul style="margin:0"><li>Crossing: <b>+1 Movement</b></li><li>Cost reductions don't change it</li><li>No effect on Flight and other effects</li><li>A rampaging enemy never attacks across it</li></ul></div>
<div><b style="color:#52789d">Combat across</b><ul style="margin:0"><li>Challenging a rampaging enemy: it is <b>Fortified</b></li><li>Attacking a player or Volkare: they are <b>Fortified</b></li><li>Assaulting a fortified site: defenders are <b>Double Fortified</b></li></ul></div></div>
""")

def ab(img, name, txt):
    return f'<div class="abil">{I(img)}<div><b>{name}</b><p>{txt}</p></div></div>'
P6 = page("Enemy abilities", f"""
<div class="g2" style="gap:5mm"><div class="col"><h2>Offensive</h2>
{ab("fire","Fire Attack","Efficient Block: Ice or Cold Fire.<br>Other Blocks ÷ 2.")}{ab("ice","Ice Attack","Efficient Block: Fire or Cold Fire.<br>Other Blocks ÷ 2.")}{ab("coldfire","Cold Fire Attack","Efficient Block: Cold Fire only.<br>Other Blocks ÷ 2.")}
{ab("summon","Summon","Block phase: a brown enemy is drawn to set the attack to block. It is then discarded.")}{ab("swift","Swift","To block it, you need 2 × its Attack.")}{ab("brutal","Brutal","Unblocked: it deals 2 × its Attack in damage.")}
{ab("poison","Poison","Unit: 2 Wounds.<br>Hero: for each Wound in hand, +1 Wound in the discard pile.")}{ab("paralyze","Paralyze","Wounded Unit = destroyed.<br>Wounded Hero = discard their non-Wound cards.")}{ab("assassin","Assassination","Only the Hero can take the damage.")}
{ab("heavy","Cumbersome","Block phase: Movement counts as Block points.")}{ab("vampiric","Vampiric","For the rest of this combat: +1 Armor per Unit wounded or Wound in hand caused by its attack.")}</div>
<div class="col"><h2>Defensive</h2>
{ab("fortified","Fortified","In the ranged phase, only siege attacks count.")}{ab("physres","Physical Resistance","Physical attacks ÷ 2 (sideways cards too).")}{ab("fireres","Fire Resistance","Fire Attack ÷ 2. Immune to red non-Attack effects.")}
{ab("iceres","Ice Resistance","Ice Attack ÷ 2. Immune to blue non-Attack effects.")}{ab("fireiceres","Fire and Ice","As above, and Cold Fire attacks are also ÷ 2. Immune to red / blue non-Attack effects.")}
{ab("elusive","Elusive","Lowest Armor value if all its attacks were blocked; otherwise the highest Armor value.")}{ab("unfortified","Unfortified","Ignores the site's fortifications.")}{ab("arcane","Arcane Immunity","Only Attacks, Blocks and effects on its attack affect it.")}
{ab("defend","Defend","When you attack an enemy, +X to its Armor (once per combat).")}
<h2 style="margin-top:2mm">Multiple attacks</h2>{ab("multi","Several values","each one separately. Blocked if all of them are.")}</div></div>
""")

P7 = page("Round, turn and mana", """
<div class="box"><h2>The Round</h2><ol>
<li><b>Preparation</b>: Day and Night alternate. Reroll the Source (at least half the dice in basic colors). New Unit offer.</li>
<li><b>Tactics</b>: the player with the least Fame chooses first; the lowest number plays first.</li>
<li><b>End</b>: at the start of your turn, empty deck → announce it. The others play one last turn, then everything is reshuffled.</li></ol></div>
<div class="g2"><div class="box strong"><h2>Regular turn</h2><p><b>1. Movement</b> (optional)<br><b>2. One Action</b> (optional): combat <i>or</i> interaction.</p></div>
<div class="box strong"><h2>Resting</h2><p>No Movement, no Action. Discard 1 non-Wound card + as many Wounds as you like.</p><p class="muted" style="margin:0">Only Wounds: discard 1 of them.</p></div></div>
<div class="box" style="margin-top:1.8mm"><h2>Playing a card</h2><table><tr><th>Way</th><th>Cost</th><th>Effect</th></tr>
<tr><td>Basic</td><td>free</td><td>top text</td></tr><tr><td>Powered</td><td>1 mana of its color</td><td>bottom text</td></tr>
<tr><td>Sideways</td><td>free</td><td>1 Movement, Influence, Attack or Block</td></tr><tr><td>Spell</td><td>1 mana of its color (+ black)</td><td>basic (powered, at Night)</td></tr>
<tr><td>Artifact</td><td>free (1 mana)</td><td>basic (powered, then destroyed)</td></tr></table></div>
<div class="box"><h2>Mana</h2><p class="mana"><i style="background:#c62f2f"></i>Red<i style="background:#2f6ec6"></i>Blue<i style="background:#2f8f3a"></i>Green<i style="background:#fff"></i>White<i style="background:#d9a521"></i>Gold<i style="background:#111"></i>Black</p><ul style="margin:0">
<li><b>Source</b>: 1 die per turn. <b>Crystals</b>: 3 max per color. <b>Tokens</b>: lost at the end of the turn.</li>
<li><b>Gold</b> = any basic color, by Day only. <b>Black</b>: by Night only (and in Dungeons and Tombs).</li></ul></div>
<div class="box strong"><h2>End of your turn</h2><ol style="margin:0">
<li>Rewards: cards gained go on top of your deed deck.</li><li>Discard the cards you played (and others, non-Wound, if you like).</li>
<li>Draw up to your hand limit (by level, +1 for a nearby Keep).</li><li>Reroll the die you used; mana tokens are lost.</li>
<li>Level: even = Skill + Advanced Action; odd = Command token (+ Armor or hand).</li></ol></div>
""")

HEX = """<svg viewBox="0 0 220 76"><g fill="#fff" stroke="#1c1d22" stroke-width="1.6">
<polygon points="6.0,32.0 17.0,12.9 39.0,12.9 50.0,32.0 39.0,51.1 17.0,51.1"/><polygon points="72.0,32.0 83.0,12.9 105.0,12.9 116.0,32.0 105.0,51.1 83.0,51.1"/></g>
<polygon points="39.0,51.1 50.0,32.0 72.0,32.0 83.0,51.1 72.0,70.1 50.0,70.1" fill="#f6dede" stroke="#9d2b2b" stroke-width="1.8"/>
<text x="61" y="54.6" text-anchor="middle" font-size="10" font-weight="700" fill="#9d2b2b" font-family="Source Sans 3">Orcs</text>
<circle cx="25" cy="33" r="4.5" fill="#52789d"/><path d="M30 28 C46 2 78 2 90 22" fill="none" stroke="#52789d" stroke-width="2" marker-end="url(#a)"/>
<defs><marker id="a" markerUnits="userSpaceOnUse" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8z" fill="#52789d"/></marker></defs>
<text x="128" y="28" font-size="9" font-family="Source Sans 3" fill="#1c1d22">adjacent</text><text x="128" y="40" font-size="9" font-family="Source Sans 3" fill="#1c1d22">→ adjacent</text><text x="128" y="52" font-size="9" font-weight="700" font-family="Source Sans 3" fill="#9d2b2b">= provoked</text></svg>"""
P8 = page("Movement and Influence", f"""
<div class="g2"><div class="box"><h2>Terrain costs</h2><table><tr><th>Terrain</th><th class="c">Day</th><th class="c">Night</th></tr>
<tr><td>Plains</td><td class="c">2</td><td class="c">2</td></tr><tr><td>Hills</td><td class="c">3</td><td class="c">3</td></tr><tr><td>Forest</td><td class="c">3</td><td class="c"><b>5</b></td></tr>
<tr><td>Wasteland</td><td class="c">4</td><td class="c">4</td></tr><tr><td>Desert</td><td class="c">5</td><td class="c"><b>3</b></td></tr><tr><td>Swamp</td><td class="c">5</td><td class="c">5</td></tr>
<tr><td>Lake, Mountain</td><td class="c" colspan="2">impassable</td></tr></table></div>
<div class="box"><h2>Moving</h2><ul style="margin:0"><li>Add up your Movement points and spend them space by space, as many spaces as you like.</li><li>Never onto a rampaging enemy's space.</li><li><b>Unconquered fortified site</b>: entering = assault, end of Movement, −1 Reputation.</li><li>You can no longer move after your Action.</li></ul></div></div>
<div class="box strong" style="margin-top:1.8mm"><h2>Provoking a rampaging enemy</h2><div class="hex">{HEX}<p style="margin:0">The combat happens at once and becomes your Action. The two adjacent enemies before and after don't attack together. You may also <b>challenge</b> an adjacent enemy, as an Action, at the end of your Movement.</p></div></div>
<div class="box"><h2>Exploring</h2><p style="margin:0">From a space on the edge of the map, spend <b>2 Movement</b>: reveal the top tile of the pile and place it against that edge. No need to enter it: you may keep moving. Place the Enemy tokens on its sites (face down on fortified sites).</p></div>
<div class="box"><h2>Influence and Reputation</h2><ul style="margin:0"><li>Recruiting, healing, buying: you pay in <b>Influence</b> (cards, sideways effects).</li>
<li>Your <b>Reputation</b> adds or subtracts its bonus <b>once per interaction</b>, never in combat.</li><li>"×" space: no interaction possible anymore.</li>
<li><b>Reputation</b>: assault −1, plunder −1, burned Monastery −3. Orcs +1, Draconum +2.</li></ul></div>
<div class="g2"><div class="box day"><h2>Day</h2><p style="margin:0">Gold die = joker, black die unusable.<br>Garrisons revealed when you are adjacent.</p></div>
<div class="box night"><h2>Night</h2><p style="margin:0">Gold die unusable, black mana usable.<br>Garrisons revealed only on assault.</p></div></div>
""")

doc = f'<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><style>{CSS}</style></head><body>{P1}{P2}{P3}{P4}{P5}{P6}{P7}{P8}</body></html>'
open(os.path.join(H, "mk_en.html"), "w", encoding="utf-8").write(doc)

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page()
        await pg.goto("file://" + os.path.join(H, "mk_en.html")); await pg.wait_for_timeout(500)
        await pg.pdf(path=os.path.join(H, "mage-knight-game-aid.pdf"), width="148mm", height="210mm", print_background=True)
        await b.close()
asyncio.run(main()); print("ok")
