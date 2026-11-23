#!/usr/bin/env python3
"""English A5 sheets for Puerto Rico 1897 (after the English rulebook). Reuses the styles and helpers of gen.py.
usage (from this folder): python3 gen_en.py  -> puerto-rico-game-aid.pdf, puerto-rico-buildings.pdf"""
import asyncio, html, os
from playwright.async_api import async_playwright

src = open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "gen.py"), encoding="utf-8").read()
head = src[:src.index("# ---------------- fiche 1")].replace('"b.json"', '"b_en.json"')
exec(head)  # CSS, B, GC, PRICE, top(), foot(), bl()
GN = {"c": "Corn", "f": "Fruit", "s": "Sugar", "t": "Tobacco", "k": "Coffee"}

# ---------------- sheet 1: game aid ----------------
P1 = f"""<section class="pg p">{top("A game round","1 / 4")}
<p>A game lasts about fifteen rounds. Every round is played the same way:</p>
<ol>
<li>The <b>Governor</b> chooses a role card, places it in front of them and performs the action <b>with the advantage</b>.</li>
<li>Each other player, clockwise, performs the same action <b>without the advantage</b> (once each).</li>
<li>The player to the Governor's left chooses one of the remaining roles, and so on until <b>everyone has chosen a role</b>.</li>
<li><b>End of the round</b>: 1 coin from the Bank on each role not chosen; the cards return next to the board; the Governor card passes to the left.</li>
</ol>
<h2>Rules for every role</h2>
<ul>
<li>Choosing a role is <b>mandatory</b>; performing the action or using the advantage is optional, <b>except for the Captain</b>.</li>
<li>The player who takes the card <b>always acts first</b>, then the others clockwise.</li>
<li>Coins on a card go to the player who takes it, on top of the advantage.</li>
<li>A chosen card stays in front of its player until the end of the round: nobody else can take it.</li>
<li>Only <b>occupied</b> tiles (at least 1 worker) have an effect. Workers are only placed and moved in the Recruitment phase.</li>
</ul>
<div class="box red"><h2 style="margin-top:0">Game end</h2>
<p>The game ends <b>at the end of the round</b> in which one of these conditions is met:</p>
<ul><li>end of the Recruitment phase: not enough workers to refill the Work Register;</li>
<li>Build phase: a player has filled their 12th City space;</li>
<li>Shipment phase: the last VP chip is taken (keep track of the rest on paper).</li></ul>
<p><b>Score</b> = VP chips + VP of all their Buildings (occupied or not) + bonuses of <b>occupied</b> Large Buildings.<br><b>Tie</b>: most coins and Goods.</p></div>
<div class="box"><p style="margin:0"><b>Two players</b>: each player chooses <b>3 roles</b> per round, alternating (Governor, other, Governor…). The Governor places 1 coin on the only role left.</p></div>
{foot("")}</section>"""

roles = [
 ("Planter", "Each player takes <b>1 face-up Estate</b> and places it on an empty Countryside space (or passes).",
  "A <b>Quarry</b> instead of an Estate.",
  "The Planter discards the remaining Estates and flips <b>players + 1</b>.",
  "Hacienda, Builders Yard, Hospital"),
 ("Recruiter", "Players take <b>1 worker</b> from the Work Register in turn until it is empty, then place and rearrange <b>all</b> their workers.",
  "<b>+1 worker</b> from the supply (before sharing out).",
  "The Recruiter refills the Register: 1 worker per <b>empty worker space on Buildings</b> of all players, <b>at least the number of players</b>.",
  "Portrait only if no worker space is left"),
 ("Builder", "Each player may build <b>1 Building</b> at the printed price, on an empty City space (Large = 2 spaces).",
  "<b>−1 coin</b> (only if they build).",
  "Occupied Quarry: −1 coin each, capped at 1 / 2 / 3 / 4 by section. Never the same Building twice.",
  "School"),
 ("Craftsman", "Everyone produces: Corn = occupied Estate; others = occupied Estate <b>and</b> occupied worker space in the Production Building.",
  "<b>+1 barrel</b> of a type they just produced.",
  "Supply used up: no Goods. The riskiest role!",
  "Factory"),
 ("Trader", "Each player may sell <b>1 barrel</b> to the Trading House (0 to 4 coins).",
  "<b>+1 coin</b> (only if they sell).",
  "4 spaces, no duplicates (except Office). Full: emptied at the end of the phase.",
  "Small Market, Large Market, Office"),
 ("Captain", "<b>Mandatory</b>: in rotation, each player loads <b>one type</b> of Good, as much as possible, until nobody can load. 1 VP per barrel.",
  "<b>+1 VP</b> once, if they load.",
  "Everyone keeps <b>1 barrel</b> (+ Warehouses). <b>Full</b> ships are emptied.",
  "Warehouses, Harbor, Wharf"),
 ("Adventurer", "<b>No action</b> for the other players.",
  "<b>+1 coin</b> from the Bank.",
  "None with 3 players; 1 card with 2 and 4 players; 2 cards with 5 players.",
  ""),
]
rc = "".join(f'<div class="role"><h3>{n}</h3><p><span class="k">Action:</span> {a}</p><p><span class="k">Advantage:</span> {p}</p><p><span class="k">End of phase:</span> {f}</p>{f"<p style=margin:0;color:#7a6650;font-size:7pt><i>Buildings: {bt}</i></p>" if bt else ""}</div>' for n, a, p, f, bt in roles)
P2 = f"""<section class="pg p">{top("The roles","2 / 4")}<div class="roles">{rc}
<div class="role" style="border:.5mm solid #b4532a"><h3>Remember</h3><p>A role nobody picks gains 1 coin per round: it gets more and more tempting.</p><p>Taking a role also gives its phase to the others: look at what they gain from it.</p></div></div>
{foot("")}</section>"""

setup_rows = [
 ("Coins per player", "3", "2", "3", "4"),
 ("Starting Estate<br><small>(from the Governor)</small>", "Fruit · Corn", "F · F · C", "F · F · C · C", "F · F · F · C · C"),
 ("VP chips", "65", "75", "100", "126"),
 ("Role cards", "7<br><small>(1 Adventurer)</small>", "6<br><small>(no Adventurer)</small>", "7<br><small>(1 Adventurer)</small>", "8"),
 ("Cargo Ships", "4 · 6", "4 · 5 · 6", "5 · 6 · 7", "6 · 7 · 8"),
 ("Face-up Estates", "3", "4", "5", "6"),
 ("Work Register", "2", "3", "4", "5"),
 ("Worker supply", "40", "55", "75", "95"),
 ("Quarries", "5", "8", "8", "8"),
]
st = "".join(f"<tr><th>{r[0]}</th>" + "".join(f'<td class="c">{v}</td>' for v in r[1:]) + "</tr>" for r in setup_rows)
P3 = f"""<section class="pg p">{top("Setup","3 / 4")}
<table><tr><th></th><th class="c">2 players</th><th class="c">3</th><th class="c">4</th><th class="c">5</th></tr>{st}</table>
<p style="font-size:7pt;margin-top:1mm">F = Fruit, C = Corn. The starting Estate goes face up on a Countryside space, without a worker.</p>
<h2>Every game</h2>
<ul>
<li>Central board in the middle, each Building on its space; the 51 coins form the <b>Bank</b>.</li>
<li>Each player: 1 Island board, their coins <b>visible</b> on the Portrait, 1 Estate.</li>
<li>The 8 Quarries in a face-up stack; the remaining Estates shuffled face down into stacks.</li>
<li>Goods sorted by type into 5 supplies; empty Trading House.</li>
<li>Unused pieces go back in the box.</li>
</ul>
<div class="box"><h2 style="margin-top:0">Also, with two players</h2><ul style="margin:0">
<li>On the board: <b>1</b> of each Commercial Building, <b>2</b> of each Production Building.</li>
<li>Remove <b>3 Countryside tiles of each type</b> (Corn, Fruit, Sugar, Tobacco, Coffee, Quarry).</li>
<li>Remove <b>2 barrels of each Good</b>.</li></ul></div>
{foot("")}</section>"""

gr = "".join(f'<tr><td>{bl(k)}<b>{GN[k]}</b></td><td class="c"><b>{PRICE[k]}</b> coin{"s" if PRICE[k]!=1 else ""}</td><td class="c"><b>1 VP</b> per barrel</td><td>{["No Building","Fruit Warehouse","Sugar Mill","Tobacco Storage","Coffee Roaster"][i]}</td></tr>' for i, k in enumerate("cfstk"))
P4 = f"""<section class="pg p">{top("Sell or ship?","4 / 4")}
<table><tr><th>Good</th><th class="c">Sold by the Trader</th><th class="c">Shipped</th><th>Production Building</th></tr>{gr}</table>
<p style="font-size:7.4pt;margin-top:1mm">Selling earns <b>coins</b> depending on the type; shipping earns <b>VP</b>, and every barrel is worth the same.</p>
<div class="two">
<div><h2>Selling (Trader)</h2><ul>
<li>1 Good per player per phase.</li>
<li>Trader: <b>+1 coin</b>.</li>
<li>Small Market <b>+1</b>, Large Market <b>+2</b>, both <b>+3</b>.</li>
<li>4 spaces, one per type (except Office).</li>
<li>Selling 1 Corn for 0 coins is allowed.</li></ul></div>
<div><h2>Shipping (Captain)</h2><ul>
<li>Captain: <b>+1 VP</b> once per phase.</li>
<li>Harbor: <b>+1 VP</b> each time you load.</li>
<li>Wharf: once per phase, all barrels of one type on a Chartered Ship, 1 VP each.</li></ul></div></div>
<h2>Loading a ship</h2><ul>
<li>A ship = <b>a single type</b>; never the same type on two ships (even if one is full).</li>
<li>On your turn you <b>must</b> load if you can, <b>one type only</b>, but the type of your choice.</li>
<li>Load <b>as much as possible</b>; between empty ships, take the one that lets you load <b>the most</b>.</li></ul>
<div class="box red"><h2 style="margin-top:0">End of the Shipment phase</h2>
<p>Everyone keeps only <b>one barrel</b> on their Portrait, plus: Small Warehouse = all barrels of <b>1 type</b>, Large Warehouse = <b>2 types</b>, both = <b>3 types</b>. The rest goes back to the supply.</p>
<p style="margin:0"><b>Full</b> ships are emptied; the others keep their cargo.</p></div>
{foot("")}</section>"""

# ---------------- sheet 2: buildings in board order ----------------
SHORT = {
 "sfw": "1 Fruit at most.", "ssm": "1 Sugar at most.", "lfw": "3 Fruit at most.", "lsm": "3 Sugar at most.", "tob": "3 Tobacco at most.", "cof": "2 Coffee at most.",
 "smk": "+1 coin on each sale to the Trading House.", "byd": "Quarry instead of an Estate (no 2nd Quarry for the Planter).",
 "hac": "Before choosing: +1 Estate drawn face down, must be placed.", "swh": "End of Shipment: keep all barrels of 1 extra type.",
 "hos": "Estate or Quarry placed: +1 worker from the supply on it.", "off": "Sell a type already in the Trading House.",
 "lmk": "+2 coins on each sale (+3 with the Small Market).", "lwh": "End of Shipment: keep all barrels of 2 types (3 with the Small Warehouse).",
 "fac": "Production phase: 2 / 3 / 4 / 5 types produced → 1 / 2 / 3 / 5 coins.", "sch": "When building: +1 worker from the supply on the new Building.",
 "har": "+1 VP each time you load.", "wha": "Once per phase: all barrels of 1 type on a Chartered Ship (1 VP each).",
 "fst": "+1 VP per Small, +2 VP per Large Production Building.", "res": "Filled Countryside: ≤9 → 4, 10 → 5, 11 → 6, 12 → 7 VP.", "frt": "+1 VP for every 3 workers.",
 "cus": "+1 VP for every 4 VP in chips.", "cth": "+1 VP per Commercial Building (itself included).",
 "zon": "Worker: buy 1 Estate (1 coin). Citizen: sell 1 (1 coin). Trade phase.", "cha": "Production phase. Worker: +1 coin. Citizen: +1 VP.",
 "par": "End of Planting. Worker: discard 1 Estate. Citizen: +2 VP if most empty Countryside.", "not": "Worker: −1 coin on a Small Building. Citizen: −2 coins on a Large one.",
 "pen": "Before shipping: 1 Good returned per citizen (different types) = 1 VP each.", "vil": "Start of Recruitment: +1 citizen from the supply (else 1 worker).",
 "tai": "Production phase: +1 coin per citizen. Counts as a Large Production Building.", "tsq": "+1 VP per citizen.",
 "can": "+1 Fruit / +1 Sugar if produced with the Large Fruit Warehouse / Sugar Mill.", "bmk": "Return 1 worker, 1 Good and/or 1 VP = −1 coin each (max 3), no coins left.",
 "lum": "Estate placed as a Forest. Every 2 Forests: −1 coin per Building.", "sto": "End of Shipment: keep up to 3 more Goods.",
 "boh": "Up to 2 \"guests\" to move during another phase; immediate effect.", "tpo": "Sell to your own Trading Post (no Market bonus).",
 "chu": "When building: +1 VP (section 2 or 3), +2 VP (Large Building).", "swf": "Once per phase: Goods of your choice on a Chartered Ship, 1 VP per 2.",
 "lig": "+1 coin each time you load; Captain: +1 coin.", "pub": "Doubles your role's advantage.",
 "dis": "Production phase: coins = largest production of one type (not Corn) − 1.", "asm": "Before shipping: +1 VP per pair of identical Goods.",
 "cat": "Sets of 3 identical Countryside tiles: 1 / 2 / 3 / 4 sets → 1 / 3 / 6 / 10 VP.", "mon": "8 VP. No worker needed.",
}
BOARD = [
 ("Section 1", "1 Quarry", [["sfw", "smk", "hac", "byd"], ["ssm", "swh", "zon", "cha"]]),
 ("Section 2", "2 Quarries", [["lfw", "hos", "off", "lmk", "lwh"], ["lsm", "par", "not", "pen"]]),
 ("Section 3", "3 Quarries", [["tob", "fac", "sch", "har"], ["cof", "wha", "vil", "tai"]]),
 ("Large Buildings", "4 Quarries", [["fst", "res", "frt", "cus", "cth", "tsq"]]),
]

def card(i):
    b = B[i]
    bc = GC[b["good"]] if b["kind"] == "prod" else ("#7a4a2a" if b["kind"] == "large" else "#c9a46a")
    sl = "●" * b["slots"] if b["slots"] else "no worker"
    return (f'<div class="bc {"e2" if b["set"]=="e2" else ""}" style="--bc:{bc}"><div class="hd"><span class="nm">{html.escape(b["fr"])}</span>'
            f'<span class="mt"><span class="coin">{b["cost"]}</span><span class="vp">{b["vp"]}</span></span></div>'
            f'<span class="ph">{b["ph"]} · <span class="sl">{sl}</span></span><span class="fx">{SHORT[i]}</span></div>')

def band(name, q, lines):
    out = f'<div class="band"><div class="lab">{name}<small>{q}</small></div><div class="lines">'
    for ln in lines:
        six = len(ln) == 6
        cells = "".join(card(i) for i in ln) + "".join('<div class="empty"></div>' for _ in range((6 if six else 5) - len(ln)))
        out += f'<div class="line{" six" if six else ""}">{cells}</div>'
    return out + "</div></div>"

LEG = '<p class="legend"><span class="coin">2</span> cost in coins · <span class="vp">1</span> VP at game end · ● maximum number of workers · <b style="color:#b3261e">names in red</b>: Expansion II (The Citizens). Discount from occupied Quarries: 1 / 2 / 3 / 4 by section.</p>'
Q1 = f'<section class="pg l">{top("Buildings · board order","1 / 3")}{band(*BOARD[0])}{band(*BOARD[1])}{LEG}{foot("Only occupied Buildings have an effect")}</section>'
Q2 = f'<section class="pg l">{top("Buildings · board order","2 / 3")}{band(*BOARD[2])}{band(*BOARD[3])}<div class="box" style="margin-top:1mm"><p style="margin:0;font-size:7.6pt">The 5 Large Buildings are worth <b>4 VP</b> even when unoccupied; their bonus only counts if they are <b>occupied</b> at the end of the game. They take 2 City spaces but count as <b>a single</b> Building. Production Buildings: 1 Good per occupied worker space, if you have as many occupied Estates.</p></div>{LEG}{foot("Only occupied Buildings have an effect")}</section>'
e1ids = [b["id"] for b in sorted([b for b in B.values() if b["set"] == "e1"], key=lambda b: (b["cost"], b["fr"]))]
e1band = '<div class="lines">' + "".join('<div class="line">' + "".join(card(i) for i in e1ids[k:k + 5]) + "".join('<div class="empty"></div>' for _ in range(5 - len(e1ids[k:k + 5]))) + "</div>" for k in range(0, len(e1ids), 5)) + "</div>"
Q3 = f'<section class="pg l">{top("Expansion I · New Buildings","3 / 3")}<p style="font-size:7.6pt">These Buildings are not printed on the board: during setup, players take turns choosing Commercial Buildings (base + Expansion I) and place each on a space of the <b>same cost</b>. Sorted here by cost.</p>{e1band}{LEG.replace("· <b style=\"color:#b3261e\">names in red</b>: Expansion II (The Citizens). ", "· ")}{foot("Names from the English rulebook")}</section>'

def doc(pages):
    return f'<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><style>{CSS}</style></head><body>{"".join(pages)}</body></html>'

open("aide_en.html", "w", encoding="utf-8").write(doc([P1, P2, P3, P4]))
open("bat_en.html", "w", encoding="utf-8").write(doc([Q1, Q2, Q3]))

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        pg = await b.new_page()
        for src_, out, land in (("aide_en.html", "puerto-rico-game-aid.pdf", False), ("bat_en.html", "puerto-rico-buildings.pdf", True)):
            await pg.goto("file://" + os.path.abspath(src_))
            await pg.wait_for_timeout(300)
            await pg.pdf(path=out, width="210mm" if land else "148mm", height="148mm" if land else "210mm", print_background=True)
        await b.close()
asyncio.run(main())
for f in ("aide_en.html", "bat_en.html"): os.remove(f)
print("ok")
