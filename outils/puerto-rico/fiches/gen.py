#!/usr/bin/env python3
"""Fiches A5 Puerto Rico 1897 : aide de jeu (portrait) et bâtiments dans l'ordre du plateau (paysage)."""
import json, asyncio, html
from playwright.async_api import async_playwright

B = {b["id"]: b for b in json.load(open("b.json", encoding="utf-8"))}
GC = {"c": "#e2b52a", "f": "#3f9343", "s": "#f6f3ea", "t": "#8b5a2b", "k": "#2e231c"}
GN = {"c": "Maïs", "f": "Fruits", "s": "Sucre", "t": "Tabac", "k": "Café"}
PRICE = {"c": 0, "f": 1, "s": 2, "t": 3, "k": 4}

CSS = """
@page{margin:0}
*{box-sizing:border-box}
html,body{margin:0;padding:0}
body{font-family:"Fira Sans",sans-serif;color:#2b2016;-webkit-print-color-adjust:exact;print-color-adjust:exact}
.pg{position:relative;overflow:hidden;background:#fff;page-break-after:always;padding:7mm 7.5mm 6mm}
.pg:last-child{page-break-after:auto}
.pg::before{content:"";position:absolute;inset:3mm;border:.3mm solid #b9a58a;border-radius:2.5mm;pointer-events:none}
.p{width:148mm;height:210mm}.l{width:210mm;height:148mm}
.top{display:flex;justify-content:space-between;align-items:flex-end;margin:0 0 2.5mm}
.top .g{font-family:"Cardo",serif;font-size:9pt;letter-spacing:.12em;text-transform:uppercase;color:#a0471f;font-weight:700}
.top .n{font-size:7pt;color:#8a7558}
h1{font-family:"Cardo",serif;font-weight:700;font-size:15pt;margin:0 0 3mm;padding:0 0 1mm;color:#6b3d1f;border-bottom:.6mm solid #6b3d1f;letter-spacing:.04em;text-transform:uppercase}
h2{font-family:"Cardo",serif;font-weight:700;font-size:10.5pt;color:#7a4a2a;margin:3mm 0 1.2mm;border-bottom:.3mm solid #c9ab82;padding-bottom:.5mm}
p,li{font-size:8.6pt;line-height:1.32;margin:0 0 1.3mm}
ol,ul{margin:0 0 1.5mm;padding-left:4.6mm}
b{color:#5a2f15}
.box{background:#fff;border:.3mm solid #c9ab82;border-radius:1.6mm;padding:2mm 2.6mm;margin:2mm 0}
.box.red{border-color:#b4532a;border-width:.5mm;background:#fff}
table{width:100%;border-collapse:collapse;font-size:8pt;background:#fff}
th,td{border:.25mm solid #c9ab82;padding:1mm 1.4mm;text-align:left;vertical-align:top}
th{background:#fff;font-weight:700;color:#4a2a14}
td.c,th.c{text-align:center}
.bl{display:inline-block;width:3mm;height:3.6mm;border-radius:.7mm;border:.25mm solid rgba(0,0,0,.45);vertical-align:-.7mm;margin-right:1mm}
.coin{display:inline-grid;place-items:center;width:4.6mm;height:4.6mm;border-radius:50%;background:#e6bf4a;border:.25mm solid #9b7419;font-size:7pt;font-weight:700;color:#3b2a08}
.vp{display:inline-grid;place-items:center;min-width:4.8mm;height:4.4mm;padding:0 .6mm;clip-path:polygon(25% 0,75% 0,100% 50%,75% 100%,25% 100%,0 50%);background:#2b2b2b;color:#fff;font-size:7pt;font-weight:700}
.roles{display:grid;grid-template-columns:1fr 1fr;gap:2mm}
.role{background:#fff;border:.3mm solid #c9ab82;border-radius:1.6mm;padding:1.6mm 2.2mm}
.role h3{font-family:"Cardo",serif;font-size:10.5pt;margin:0 0 .6mm;color:#7a4a2a;text-transform:uppercase;letter-spacing:.04em}
.role p{font-size:7.8pt;margin:0 0 .7mm}
.role .k{font-weight:600;color:#a0471f}
.foot{position:absolute;left:7.5mm;right:7.5mm;bottom:4.2mm;font-size:6pt;color:#8a7558;display:flex;justify-content:space-between}
.two{display:grid;grid-template-columns:1fr 1fr;gap:3mm}
/* bâtiments */
.band{display:grid;grid-template-columns:15mm 1fr;gap:1.6mm;margin-bottom:2mm}
.lab{background:#fff;color:#6b3d1f;border:.5mm solid #6b3d1f;border-radius:1.4mm;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;font-family:"Cardo",serif;font-size:8pt;font-weight:700;line-height:1.15;padding:1mm}
.lab small{font-family:"Fira Sans";font-weight:400;font-size:6.3pt;opacity:.9;margin-top:.8mm}
.lines{display:flex;flex-direction:column;gap:1.4mm}
.line{display:grid;grid-template-columns:repeat(5,1fr);gap:1.4mm}
.line.six{grid-template-columns:repeat(6,1fr)}
.bc{background:#fff;border:.3mm solid #c9ab82;border-radius:1.4mm;padding:1mm 1.3mm 1.1mm;border-top:1.3mm solid var(--bc,#c9ab82);min-height:21mm;display:flex;flex-direction:column;gap:.5mm}
.bc.e2{background:#fff;border-color:#d79a7c}
.bc .hd{display:flex;justify-content:space-between;gap:1mm;align-items:flex-start}
.bc .nm{font-weight:700;font-size:7.4pt;line-height:1.12;color:#3a2412}
.bc.e2 .nm{color:#b3261e}
.bc .mt{display:flex;gap:.6mm;flex:none}
.bc .fx{font-size:6.5pt;line-height:1.22}
.bc .ph{font-size:5.6pt;letter-spacing:.05em;text-transform:uppercase;color:#a0471f;font-weight:600}
.bc .sl{color:#7a4a2a;letter-spacing:.3mm;font-size:6.5pt}
.empty{border:.3mm dashed #d6c09b;border-radius:1.4mm}
.legend{font-size:6.6pt;color:#6d5a42;margin-top:1mm}
"""

def top(title, n):
    return f'<div class="top"><span class="g">Puerto Rico 1897</span><span class="n">{n}</span></div><h1>{title}</h1>'

def foot(t):
    return f'<div class="foot"><span>Less Rules, More Play · paulmoussard.com</span><span>{t}</span></div>'

def bl(k):
    return f'<span class="bl" style="background:{GC[k]}"></span>'

# ---------------- fiche 1 : aide de jeu ----------------
P1 = f"""<section class="pg p">{top("Un tour de jeu","1 / 4")}
<p>Une partie dure une quinzaine de tours. Chaque tour se joue de la même façon :</p>
<ol>
<li>Le <b>Gouverneur</b> choisit une carte Personnage, la pose devant lui et fait l'action <b>avec le privilège</b>.</li>
<li>Chaque autre joueur, en sens horaire, fait la même action <b>sans le privilège</b> (une seule fois chacun).</li>
<li>Le joueur à gauche du Gouverneur choisit un des Personnages restants, et ainsi de suite jusqu'à ce que <b>chacun ait choisi un Personnage</b>.</li>
<li><b>Fin du tour</b> : 1 Peso de la Banque sur chaque Personnage non choisi ; les cartes reviennent à côté du plateau ; la carte Gouverneur passe à gauche.</li>
</ol>
<h2>Règles de tous les Personnages</h2>
<ul>
<li>Prendre un Personnage est <b>obligatoire</b> ; faire l'action ou utiliser le privilège est facultatif, <b>sauf pour le Capitaine</b>.</li>
<li>Celui qui prend la carte agit <b>toujours en premier</b>, puis les autres en sens horaire.</li>
<li>Les Pesos posés sur une carte vont à celui qui la prend, en plus du privilège.</li>
<li>Une carte prise reste devant son joueur jusqu'à la fin du tour : personne d'autre ne peut la prendre.</li>
<li>Seules les tuiles <b>occupées</b> (au moins 1 ouvrier) ont un effet. Les ouvriers ne se posent et ne se déplacent qu'en phase du Recruteur.</li>
</ul>
<div class="box red"><h2 style="margin-top:0">Fin du jeu</h2>
<p>La partie se termine <b>à la fin du tour</b> où l'une de ces conditions est remplie :</p>
<ul><li>fin de phase du Recruteur : plus assez d'ouvriers pour remplir le Registre du Personnel ;</li>
<li>phase du Bâtisseur : un joueur a recouvert la 12<sup>e</sup> case de sa ville ;</li>
<li>phase du Capitaine : le dernier jeton PV est pris (noter la suite par écrit).</li></ul>
<p><b>Score</b> = jetons PV + PV de tous ses bâtiments (occupés ou non) + bonus des grands bâtiments <b>occupés</b>.<br><b>Égalité</b> : le plus de Pesos et de marchandises.</p></div>
<div class="box"><p style="margin:0"><b>À deux joueurs</b> : chaque joueur choisit <b>3 Personnages</b> par tour, en alternance (Gouverneur, autre, Gouverneur…). Le Gouverneur pose 1 Peso sur le seul Personnage restant.</p></div>
{foot("Aide de jeu non officielle")}</section>"""

roles = [
 ("Paysan", "Chacun prend <b>1 Plantation</b> face visible et la pose sur une case Parcelle libre (ou passe).",
  "Une <b>Carrière</b> au lieu d'une Plantation.",
  "Le Paysan défausse les Plantations restantes et en révèle <b>joueurs + 1</b>.",
  "Hacienda, Dépôt de Matériaux, Hôpital"),
 ("Recruteur", "Chacun prend <b>1 ouvrier</b> du Registre à tour de rôle jusqu'à le vider, puis place et réagence <b>tous</b> ses ouvriers.",
  "<b>+1 ouvrier</b> de la réserve (avant la distribution).",
  "Le Recruteur remplit le Registre : 1 ouvrier par demi-cercle <b>libre sur les bâtiments</b> de tous, <b>au moins le nombre de joueurs</b>.",
  "Portrait seulement si plus aucun demi-cercle libre"),
 ("Bâtisseur", "Chacun peut construire <b>1 bâtiment</b> au prix indiqué, sur une case libre de sa ville (grand = 2 cases).",
  "<b>−1 Peso</b> (seulement s'il construit).",
  "Carrière occupée : −1 Peso chacune, plafond 1 / 2 / 3 / 4 selon la rangée. Jamais deux fois le même bâtiment.",
  "École"),
 ("Producteur", "Chacun produit : Maïs = Plantation occupée ; autres = Plantation occupée <b>et</b> demi-cercle occupé du bâtiment industriel.",
  "<b>+1 marchandise</b> d'un type qu'il vient de produire.",
  "Réserve épuisée : on repart les mains vides. Le Personnage le plus risqué !",
  "Usine"),
 ("Marchand", "Chacun peut vendre <b>1 marchandise</b> à la Maison de Commerce (prix 0 à 4 Pesos).",
  "<b>+1 Peso</b> (seulement s'il vend).",
  "4 places, pas de doublon (sauf Comptoir). Pleine : on la vide à la fin de la phase.",
  "Petit Marché, Grand Marché, Comptoir"),
 ("Capitaine", "<b>Obligatoire</b> : en rotation, chacun charge <b>un type</b> de marchandise, au maximum, jusqu'à ce que plus personne ne puisse charger. 1 PV par baril.",
  "<b>+1 PV</b> une seule fois, s'il charge.",
  "Chacun garde <b>1 baril</b> (+ Entrepôts). Les navires <b>pleins</b> sont vidés.",
  "Entrepôts, Port, Chantier Naval"),
 ("Aventurier", "<b>Aucune action</b> pour les autres joueurs.",
  "<b>+1 Peso</b> de la Banque.",
  "Absent à 3 joueurs ; 1 carte à 2 et 4 joueurs ; 2 cartes à 5 joueurs.",
  ""),
]
rc = "".join(f'<div class="role"><h3>{n}</h3><p><span class="k">Action :</span> {a}</p><p><span class="k">Privilège :</span> {p}</p><p><span class="k">Fin de phase :</span> {f}</p>{f"<p style=margin:0;color:#7a6650;font-size:7pt><i>Bâtiments : {bt}</i></p>" if bt else ""}</div>' for n, a, p, f, bt in roles)
P2 = f"""<section class="pg p">{top("Les Personnages","2 / 4")}<div class="roles">{rc}
<div class="role" style="border:.5mm solid #b4532a"><h3>À retenir</h3><p>Un Personnage non choisi gagne 1 Peso par tour : il devient de plus en plus intéressant.</p><p>Prendre un Personnage, c'est aussi offrir sa phase aux autres : regarde ce qu'ils y gagnent.</p></div></div>
{foot("Aide de jeu non officielle")}</section>"""

setup_rows = [
 ("Pesos par joueur", "3", "2", "3", "4"),
 ("Plantation de départ<br><small>(depuis le Gouverneur)</small>", "Fruits · Maïs", "F · F · M", "F · F · M · M", "F · F · F · M · M"),
 ("Jetons PV", "65", "75", "100", "126"),
 ("Cartes Personnage", "7<br><small>(1 Aventurier)</small>", "6<br><small>(sans Aventurier)</small>", "7<br><small>(1 Aventurier)</small>", "8"),
 ("Navires de Transport", "4 · 6", "4 · 5 · 6", "5 · 6 · 7", "6 · 7 · 8"),
 ("Plantations face visible", "3", "4", "5", "6"),
 ("Registre du Personnel", "2", "3", "4", "5"),
 ("Réserve d'ouvriers", "40", "55", "75", "95"),
 ("Carrières", "5", "8", "8", "8"),
]
st = "".join(f"<tr><th>{r[0]}</th>" + "".join(f'<td class="c">{v}</td>' for v in r[1:]) + "</tr>" for r in setup_rows)
P3 = f"""<section class="pg p">{top("Mise en place","3 / 4")}
<table><tr><th></th><th class="c">2 joueurs</th><th class="c">3</th><th class="c">4</th><th class="c">5</th></tr>{st}</table>
<p style="font-size:7pt;margin-top:1mm">F = Fruits, M = Maïs. La Plantation de départ se pose face visible sur une case Parcelle, sans ouvrier.</p>
<h2>Pour toutes les parties</h2>
<ul>
<li>Plateau de jeu au centre, chaque bâtiment sur son emplacement ; les 51 Pesos forment la <b>Banque</b>.</li>
<li>Chaque joueur : 1 plateau Domaine, ses Pesos <b>visibles</b> sur le portrait, 1 Plantation.</li>
<li>Les 8 Carrières en pile face visible ; les Plantations restantes mélangées face cachée, en <b>une pile de plus que de joueurs</b>.</li>
<li>Marchandises triées par type en 5 réserves ; Maison de Commerce vide.</li>
<li>Le matériel non utilisé retourne dans la boîte.</li>
</ul>
<div class="box"><h2 style="margin-top:0">En plus, à deux joueurs</h2><ul style="margin:0">
<li>Sur le plateau : <b>1</b> bâtiment beige de chaque type (grands compris), <b>2</b> bâtiments industriels de chaque type.</li>
<li>Retirer <b>3 tuiles Terrain de chaque type</b> (Maïs, Fruits, Sucre, Tabac, Café, Carrière).</li>
<li>Retirer <b>2 marchandises de chaque type</b>.</li></ul></div>
{foot("Aide de jeu non officielle")}</section>"""

gr = "".join(f'<tr><td>{bl(k)}<b>{GN[k]}</b></td><td class="c"><b>{PRICE[k]}</b> Peso{"s" if PRICE[k]>1 else ""}</td><td class="c"><b>1 PV</b> par baril</td><td>{["Aucun bâtiment","Exploitation de Fruits","Raffinerie de Sucre","Séchoir à Tabac","Brûlerie de Café"][i]}</td></tr>' for i, k in enumerate("cfstk"))
P4 = f"""<section class="pg p">{top("Vendre ou expédier ?","4 / 4")}
<table><tr><th>Marchandise</th><th class="c">Vente au Marchand</th><th class="c">Expédition</th><th>Bâtiment industriel</th></tr>{gr}</table>
<p style="font-size:7.4pt;margin-top:1mm">La vente rapporte des <b>Pesos</b> selon le type ; l'expédition rapporte des <b>PV</b>, et tous les barils se valent.</p>
<div class="two">
<div><h2>Vente (Marchand)</h2><ul>
<li>1 marchandise par joueur et par phase.</li>
<li>Marchand : <b>+1 Peso</b>.</li>
<li>Petit Marché <b>+1</b>, Grand Marché <b>+2</b>, les deux <b>+3</b>.</li>
<li>4 places, une seule par type (sauf Comptoir).</li>
<li>Vendre 1 Maïs pour 0 Peso est permis.</li></ul></div>
<div><h2>Expédition (Capitaine)</h2><ul>
<li>Capitaine : <b>+1 PV</b> une fois par phase.</li>
<li>Port : <b>+1 PV</b> à chaque chargement.</li>
<li>Chantier Naval : 1 fois par phase, tous les barils d'un type sur un navire privé, 1 PV chacun.</li></ul></div></div>
<h2>Charger un navire</h2><ul>
<li>Un navire = <b>un seul type</b> ; jamais le même type sur deux navires (même si l'un est plein).</li>
<li>À son tour, on <b>doit</b> charger si on peut, <b>un seul type</b>, mais le type de son choix.</li>
<li>On charge <b>autant que possible</b> ; entre plusieurs navires vides, on prend <b>le plus grand</b>.</li></ul>
<div class="box red"><h2 style="margin-top:0">Fin de la phase du Capitaine</h2>
<p>Chacun ne garde qu'<b>un seul baril</b> sur son portrait, plus : Petit Entrepôt = tous les barils de <b>1 type</b>, Grand Entrepôt = <b>2 types</b>, les deux = <b>3 types</b>. Le reste retourne à la réserve.</p>
<p style="margin:0">Les navires <b>pleins</b> sont vidés ; les autres gardent leur cargaison.</p></div>
{foot("Aide de jeu non officielle")}</section>"""

# ---------------- fiche 2 : bâtiments dans l'ordre du plateau ----------------
SHORT = {
 "sfw": "1 Fruit au plus.", "ssm": "1 Sucre au plus.", "lfw": "3 Fruits au plus.", "lsm": "3 Sucres au plus.", "tob": "3 Tabacs au plus.", "cof": "2 Cafés au plus.",
 "smk": "+1 Peso à chaque vente à la Maison de Commerce.", "byd": "Carrière au lieu d'une Plantation (pas de 2e Carrière pour le Paysan).",
 "hac": "Avant de choisir : +1 Plantation tirée face cachée, à poser obligatoirement.", "swh": "Fin du Capitaine : garde tous les barils d'1 type en plus.",
 "hos": "Plantation ou Carrière posée : +1 ouvrier de la réserve dessus (pas sur celle de l'Hacienda).", "off": "Vendre un type déjà présent à la Maison de Commerce.",
 "lmk": "+2 Pesos à chaque vente (+3 avec le Petit Marché).", "lwh": "Fin du Capitaine : garde tous les barils de 2 types (3 avec le Petit Entrepôt).",
 "fac": "Phase du Producteur : 2 / 3 / 4 / 5 types produits → 1 / 2 / 3 / 5 Pesos.", "sch": "Construction : +1 ouvrier de la réserve sur le nouveau bâtiment.",
 "har": "+1 PV à chaque chargement.", "wha": "1 fois par phase : tous les barils d'1 type sur un navire privé (1 PV chacun).",
 "fst": "+1 PV par petit, +2 PV par grand bâtiment industriel.", "res": "Parcelles occupées : ≤9 → 4, 10 → 5, 11 → 6, 12 → 7 PV.", "frt": "+1 PV par tranche de 3 ouvriers.",
 "cus": "+1 PV par tranche de 4 PV en jetons.", "cth": "+1 PV par bâtiment beige (lui compris).",
 "zon": "Ouvrier : acheter 1 Plantation (1 Peso). Bourgeois : en vendre 1 (1 Peso). Phase du Marchand.", "cha": "Phase du Producteur. Ouvrier : +1 Peso. Bourgeois : +1 PV.",
 "par": "Fin du Paysan. Ouvrier : défausser 1 Plantation. Bourgeois : +2 PV si le plus de Parcelles libres.", "not": "Ouvrier : −1 Peso sur un petit bâtiment. Bourgeois : −2 Pesos sur un grand.",
 "pen": "Avant d'expédier : 1 marchandise rendue par bourgeois (types différents) = 1 PV chacune.", "vil": "Début du Recruteur : +1 bourgeois de la réserve (sinon 1 ouvrier).",
 "tai": "Phase du Producteur : +1 Peso par bourgeois. Compte comme grand bâtiment industriel.", "tsq": "+1 PV par bourgeois.",
 "can": "+1 Fruit / +1 Sucre si produit avec la Grande Exploitation / Raffinerie.", "bmk": "Rendre 1 ouvrier, 1 marchandise et/ou 1 PV = −1 Peso chacun (max 3), sans garder de Peso.",
 "lum": "Plantation posée face Forêt. Chaque paire de Forêts : −1 Peso par construction.", "sto": "Fin du Capitaine : garde jusqu'à 3 marchandises de plus.",
 "boh": "Jusqu'à 2 « invités » à déplacer pendant une autre phase ; effet immédiat.", "tpo": "Vendre n'importe quelle marchandise à son Commerce (sans bonus des Marchés).",
 "chu": "Construction : +1 PV (rangée 2 ou 3), +2 PV (grand bâtiment).", "swf": "1 fois par phase : marchandises au choix sur un navire privé, 1 PV par lot de 2.",
 "lig": "+1 Peso à chaque chargement ; Capitaine : +1 Peso.", "pub": "Double le privilège de son Personnage.",
 "dis": "Phase du Producteur : Pesos = plus grande production d'un type (hors Maïs) − 1.", "asm": "Avant d'expédier : +1 PV par lot de 2 marchandises identiques.",
 "cat": "Lots de 3 tuiles Terrain identiques : 1 / 2 / 3 / 4 lots → 1 / 3 / 6 / 10 PV.", "mon": "8 PV. Aucun ouvrier nécessaire.",
}
PHI = {"Paysan": "Paysan", "Recruteur": "Recruteur", "Bâtisseur": "Bâtisseur", "Producteur": "Producteur", "Marchand": "Marchand", "Capitaine": "Capitaine", "Fin de partie": "Fin de partie", "Tous": "Toutes les phases", "Paysan · Bâtisseur": "Paysan · Bâtisseur"}
BOARD = [
 ("Rangée 1", "1 Carrière", [["sfw", "smk", "hac", "byd"], ["ssm", "swh", "zon", "cha"]]),
 ("Rangée 2", "2 Carrières", [["lfw", "hos", "off", "lmk", "lwh"], ["lsm", "par", "not", "pen"]]),
 ("Rangée 3", "3 Carrières", [["tob", "fac", "sch", "har"], ["cof", "wha", "vil", "tai"]]),
 ("Grands bâtiments", "4 Carrières", [["fst", "res", "frt", "cus", "cth", "tsq"]]),
]

def card(i):
    b = B[i]
    bc = GC[b["good"]] if b["kind"] == "prod" else ("#7a4a2a" if b["kind"] == "large" else "#c9a46a")
    sl = "●" * b["slots"] if b["slots"] else "aucun ouvrier"
    return (f'<div class="bc {"e2" if b["set"]=="e2" else ""}" style="--bc:{bc}"><div class="hd"><span class="nm">{html.escape(b["fr"])}</span>'
            f'<span class="mt"><span class="coin">{b["cost"]}</span><span class="vp">{b["vp"]}</span></span></div>'
            f'<span class="ph">{PHI.get(b["ph"], b["ph"])} · <span class="sl">{sl}</span></span><span class="fx">{SHORT[i]}</span></div>')

def band(name, q, lines):
    out = f'<div class="band"><div class="lab">{name}<small>{q}</small></div><div class="lines">'
    for ln in lines:
        six = len(ln) == 6
        cells = "".join(card(i) for i in ln) + "".join('<div class="empty"></div>' for _ in range((6 if six else 5) - len(ln)))
        out += f'<div class="line{" six" if six else ""}">{cells}</div>'
    return out + "</div></div>"

LEG = '<p class="legend"><span class="coin">2</span> coût en Pesos · <span class="vp">1</span> PV en fin de partie · ● nombre maximal d\'ouvriers · <b style="color:#b3261e">noms en rouge</b> : extension 2 (Les Bourgeois). Réduction des Carrières occupées : 1 / 2 / 3 / 4 selon la rangée.</p>'
Q1 = f'<section class="pg l">{top("Les bâtiments · ordre du plateau","1 / 3")}{band(*BOARD[0])}{band(*BOARD[1])}{LEG}{foot("Seuls les bâtiments occupés ont un effet")}</section>'
Q2 = f'<section class="pg l">{top("Les bâtiments · ordre du plateau","2 / 3")}{band(*BOARD[2])}{band(*BOARD[3])}<div class="box" style="margin-top:1mm"><p style="margin:0;font-size:7.6pt">Les 5 grands bâtiments valent <b>4 PV</b> même inoccupés ; leur bonus ne compte que s\'ils sont <b>occupés</b> en fin de partie. Ils occupent 2 cases de la ville mais comptent comme <b>un seul</b> bâtiment. Bâtiments industriels : 1 marchandise par demi-cercle occupé, s\'il y a autant de Plantations occupées.</p></div>{LEG}{foot("Seuls les bâtiments occupés ont un effet")}</section>'
e1 = sorted([b for b in B.values() if b["set"] == "e1"], key=lambda b: (b["cost"], b["fr"]))
e1ids = [b["id"] for b in e1]
e1band = '<div class="lines">' + "".join('<div class="line">' + "".join(card(i) for i in e1ids[k:k + 5]) + "".join('<div class="empty"></div>' for _ in range(5 - len(e1ids[k:k + 5]))) + "</div>" for k in range(0, len(e1ids), 5)) + "</div>"
Q3 = f'<section class="pg l">{top("Extension 1 · Nouveaux bâtiments","3 / 3")}<p style="font-size:7.6pt">Ces bâtiments ne sont pas imprimés sur le plateau : à la mise en place, les joueurs choisissent à tour de rôle les bâtiments beiges (base + extension 1) et les posent sur un emplacement au <b>même coût</b>. Triés ici par coût.</p>{e1band}{LEG.replace("· <b style=\"color:#b3261e\">noms en rouge</b> : extension 2 (Les Bourgeois). ","· ")}{foot("Hangar, Commerce, Statue… : noms du livret français")}</section>'

def doc(pages):
    return f'<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8"><style>{CSS}</style></head><body>{"".join(pages)}</body></html>'

open("aide.html", "w", encoding="utf-8").write(doc([P1, P2, P3, P4]))
open("bat.html", "w", encoding="utf-8").write(doc([Q1, Q2, Q3]))

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        pg = await b.new_page()
        for src, out, land in (("aide.html", "puerto-rico-aide-de-jeu.pdf", False), ("bat.html", "puerto-rico-batiments.pdf", True)):
            await pg.goto("file:///home/claude/fiches/" + src)
            await pg.wait_for_timeout(300)
            await pg.pdf(path=out, width="210mm" if land else "148mm", height="148mm" if land else "210mm", print_background=True)
        await b.close()
asyncio.run(main())
print("ok")
