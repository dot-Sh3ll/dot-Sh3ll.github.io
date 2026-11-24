# Paires français → anglais pour 6-app.js et 1-head.html
PAIRS = [
(r"""/* ---------- tutoriel ---------- */""", r"""/* ---------- tutorial ---------- */"""),
(r"""`${d} chapitre${d>1?'s':''} validé${d>1?'s':''} sur ${CH.length}`""", r"""`${d} of ${CH.length} chapter${CH.length>1?'s':''} completed`"""),
(r"""'<span class="tick" aria-label="validé">✓</span>'""", r"""'<span class="tick" aria-label="completed">✓</span>'"""),
(r"""$('#tocbtn').textContent='Afficher le sommaire'})}""", r"""$('#tocbtn').textContent='Show contents'})}"""),
(r"""'<span class="tag">Que faites-vous ?</span>'""", r"""'<span class="tag">What do you do?</span>'"""),
(r"""<div class="eyebrow">${c.part} · étape ${i+1} sur ${CH.length}</div>""", r"""<div class="eyebrow">${c.part} · step ${i+1} of ${CH.length}</div>"""),
(r"""<h2>Les points de règle</h2>""", r"""<h2>The rules</h2>"""),
(r"""h+=`<h2>Cas pratiques</h2>""", r"""h+=`<h2>Hands-on cases</h2>"""),
(r"""h+=`<h2>Vérifiez que c'est acquis</h2>""", r"""h+=`<h2>Check what you've learnt</h2>"""),
(r"""data-tab="aide">Ouvrir l'aide-mémoire →</button>""", r"""data-tab="aide">Open the reference →</button>"""),
(r"""`<b>Pas tout à fait.</b> Essaie une autre réponse.`""", r"""`<b>Not quite.</b> Try another answer.`"""),
(r"""`${ok} question${ok>1?'s':''} sur ${all.length} résolue${ok>1?'s':''}, dont ${first} du premier coup.`""", r"""`${ok} of ${all.length} question${all.length>1?'s':''} solved, ${first} at the first try.`"""),
(r"""`<div class="done-banner">✓ Chapitre validé.</div>`""", r"""`<div class="done-banner">✓ Chapter completed.</div>`"""),
(r"""$('#tocbtn').textContent=o?'Masquer le sommaire':'Afficher le sommaire'""", r"""$('#tocbtn').textContent=o?'Hide contents':'Show contents'"""),
(r"""/* ---------- aide-mémoire ---------- */""", r"""/* ---------- reference ---------- */"""),
(r"""function aide(){const roles=[['Paysan','Chacun prend 1 plantation face visible.','Carrière au lieu d\'une plantation.','Fin : défausser et révéler joueurs + 1.'],
 ['Recruteur','Le Registre se distribue 1 par 1 depuis le Recruteur ; on pose et réorganise les ouvriers.','+1 ouvrier de la réserve.','Fin : Registre = demi-cercles vides des bâtiments, min. le nombre de joueurs.'],
 ['Bâtisseur','Chacun peut acheter 1 bâtiment.','−1 Peso.','Carrières occupées : −1 chacune, plafond 1/2/3/4 selon la rangée.'],
 ['Producteur','Chacun produit.','+1 baril d\'une marchandise produite.','Maïs : plantation seule. Autres : plantation + bâtiment.'],
 ['Marchand','Chacun peut vendre 1 baril.','+1 Peso.','4 places, pas de doublon (sauf Comptoir) ; vidée si pleine.'],
 ['Capitaine','Chargement obligatoire, en rotation, 1 type par tour.','+1 PV une fois dans la phase.','Puis 1 baril gardé (+ entrepôts) ; navires pleins vidés.'],
 ['Aventurier','Aucune.','+1 Peso.','0 à 3 joueurs, 1 à 2 ou 4 joueurs, 2 à 5 joueurs.']];
 const SU=[['Pesos par joueur',3,2,3,4],['Jetons PV',65,75,100,126],['Personnages',7,6,7,8],['Navires (cales)','4 · 6','4 · 5 · 6','5 · 6 · 7','6 · 7 · 8'],['Plantations visibles',3,4,5,6],['Registre / réserve d\'ouvriers','2 / 40','3 / 55','4 / 75','5 / 95'],['Plantations de départ','F, M','F, F, M','F, F, M, M','F, F, F, M, M']];""",
 r"""function aide(){const roles=[['Planter','Each player takes 1 face-up Estate.','A Quarry instead of an Estate.','End: discard and flip players + 1.'],
 ['Recruiter','The Work Register is shared out 1 by 1 from the Recruiter; place and rearrange workers.','+1 worker from the supply.','End: Register = empty semicircles on Buildings, min. the number of players.'],
 ['Builder','Each player may buy 1 Building.','−1 coin.','Occupied Quarries: −1 each, capped at 1/2/3/4 by section.'],
 ['Craftsman','Everyone produces.','+1 barrel of a Good produced.','Corn: Estate only. Others: Estate + Building.'],
 ['Trader','Each player may sell 1 barrel.','+1 coin.','4 spaces, no duplicates (except Office); emptied when full.'],
 ['Captain','Mandatory loading, in rotation, 1 type per turn.','+1 VP once per phase.','Then 1 barrel kept (+ Warehouses); full ships emptied.'],
 ['Adventurer','None.','+1 coin.','0 with 3 players, 1 with 2 or 4 players, 2 with 5 players.']];
 const SU=[['Coins per player',3,2,3,4],['VP chips',65,75,100,126],['Roles',7,6,7,8],['Cargo Ships (holds)','4 · 6','4 · 5 · 6','5 · 6 · 7','6 · 7 · 8'],['Face-up Estates',3,4,5,6],['Work Register / worker supply','2 / 40','3 / 55','4 / 75','5 / 95'],['Starting Estates','F, C','F, F, C','F, F, C, C','F, F, F, C, C']];"""),
(r"""<div class="eyebrow">Aide-mémoire</div><h1>Puerto Rico 1897 en une page</h1>
 <div class="toolbar"><a href="#am-tour">Tour</a> · <a href="#am-roles">Personnages</a> · <a href="#am-mep">Mise en place</a> · <a href="#am-prix">Prix</a> · <a href="#am-fin">Fin</a> · <a href="#am-bat">Bâtiments</a></div>
 <h2 id="am-tour">Un tour</h2><ol><li>Le Gouverneur choisit un personnage, agit avec le privilège, puis chacun fait l'action dans le sens horaire.</li><li>Le joueur suivant choisit un autre personnage, etc. : un personnage chacun (trois chacun à deux joueurs).</li><li>Fin de tour : 1 Peso sur chaque personnage non choisi, les personnages reviennent, la carte Gouverneur passe à gauche.</li></ol>
 <h2 id="am-roles">Les personnages</h2><div class="tw"><table><tr><th>Personnage</th><th>Action pour tous</th><th>Privilège</th><th>À retenir</th></tr>""",
 r"""<div class="eyebrow">Reference</div><h1>Puerto Rico 1897 on one page</h1>
 <div class="toolbar"><a href="#am-tour">Round</a> · <a href="#am-roles">Roles</a> · <a href="#am-mep">Setup</a> · <a href="#am-prix">Prices</a> · <a href="#am-fin">End</a> · <a href="#am-bat">Buildings</a></div>
 <h2 id="am-tour">A round</h2><ol><li>The Governor chooses a role, acts with the advantage, then everyone performs the action clockwise.</li><li>The next player chooses another role, and so on: one role each (three each with two players).</li><li>End of the round: 1 coin on each role not chosen, the roles come back, the Governor card passes to the left.</li></ol>
 <h2 id="am-roles">The roles</h2><div class="tw"><table><tr><th>Role</th><th>Action for all</th><th>Advantage</th><th>Remember</th></tr>"""),
(r"""<h2 id="am-mep">Mise en place</h2><div class="tw"><table><tr><th></th><th class="c">2 joueurs</th>""", r"""<h2 id="am-mep">Setup</h2><div class="tw"><table><tr><th></th><th class="c">2 players</th>"""),
(r"""<p class="small muted">F = Fruits, M = Maïs, dans l'ordre depuis le Gouverneur. À deux : 1 exemplaire de chaque bâtiment beige et 2 de chaque bâtiment industriel, 3 tuiles de chaque type de Terrain et 2 barils de chaque marchandise retirés.</p>
 <h2 id="am-prix">Prix et réductions</h2><div class="tw"><table><tr><th>Marchandise</th>""",
 r"""<p class="small muted">F = Fruit, C = Corn, in order from the Governor. With two players: 1 of each Commercial Building and 2 of each Production Building; 3 tiles of each Countryside type and 2 barrels of each Good removed.</p>
 <h2 id="am-prix">Prices and discounts</h2><div class="tw"><table><tr><th>Good</th>"""),
(r"""<tr><th>Prix de vente</th>""", r"""<tr><th>Sale price</th>"""),
(r"""<p>Carrières occupées : −1 Peso chacune, au plus <b>1</b> (1re rangée), <b>2</b> (2e), <b>3</b> (3e), <b>4</b> (grands bâtiments). Bâtisseur : −1. Jamais sous 0.</p>
 <h2 id="am-fin">Fin de partie</h2><p>À la fin du tour où : la réserve ne peut plus remplir le Registre, <b>ou</b> un joueur a rempli ses 12 cases Ville, <b>ou</b> le dernier jeton PV est pris. Score = jetons PV + PV des bâtiments + bonus des grands bâtiments occupés. Égalité : Pesos + barils.</p>
 <h2 id="am-bat">Bâtiments</h2><p class="small muted">Dans l'ordre du plateau, rangée par rangée ; l'extension I à la fin, par coût.</p><div class="filters2"><div class="seg" id="am-set"><button type="button" data-v="all" class="sel">Tous</button><button type="button" data-v="base">Jeu de base</button><button type="button" data-v="e1">Extension I</button><button type="button" data-v="e2">Extension II</button></div><input type="search" id="am-q" placeholder="Chercher un bâtiment…" aria-label="Chercher un bâtiment"></div>""",
 r"""<p>Occupied Quarries: −1 coin each, at most <b>1</b> (top section), <b>2</b> (second), <b>3</b> (third), <b>4</b> (Large Buildings). Builder: −1. Never below 0.</p>
 <h2 id="am-fin">Game end</h2><p>At the end of the round in which: the supply cannot refill the Work Register, <b>or</b> a player has filled all 12 City spaces, <b>or</b> the last VP chip is taken. Score = VP chips + Building VP + bonuses of occupied Large Buildings. Tie: coins + barrels.</p>
 <h2 id="am-bat">Buildings</h2><p class="small muted">In board order, section by section; Expansion I at the end, by cost.</p><div class="filters2"><div class="seg" id="am-set"><button type="button" data-v="all" class="sel">All</button><button type="button" data-v="base">Base game</button><button type="button" data-v="e1">Expansion I</button><button type="button" data-v="e2">Expansion II</button></div><input type="search" id="am-q" placeholder="Search a Building…" aria-label="Search a Building"></div>"""),
(r"""title="Coût">""", r"""title="Cost">"""),
(r"""${b.kind==='large'?'grand bâtiment':`rangée ${b.row}`}""", r"""${b.kind==='large'?'Large Building':`section ${b.row}`}"""),
(r"""`${b.slots} demi-cercle${b.slots>1?'s':''}`:'aucun demi-cercle'""", r"""`${b.slots} semicircle${b.slots>1?'s':''}`:'no semicircle'"""),
(r"""'<p class="muted">Aucun bâtiment trouvé.</p>'""", r"""'<p class="muted">No Building found.</p>'"""),
(r"""/* ---------- décompte ---------- */""", r"""/* ---------- scoring ---------- */"""),
(r"""const XIN={res:'Cases Parcelle remplies',frt:'Ouvriers et bourgeois sur le domaine',cat:'Séries de 3 tuiles identiques'};""", r"""const XIN={res:'Filled Countryside spaces',frt:'Workers and citizens on the Island',cat:'Sets of 3 identical tiles'};"""),
(r"""d=[`${+p.chips||0} en jetons`]""", r"""d=[`${+p.chips||0} in chips`]"""),
(r"""d.push(`${bv} de bâtiments`)""", r"""d.push(`${bv} from Buildings`)"""),
(r"""d.push(`${lb} de bonus`)""", r"""d.push(`${lb} bonus`)"""),
(r"""d.push(`${p.cit} de bourgeois`)""", r"""d.push(`${p.cit} from citizens`)"""),
(r"""<div class="eyebrow">Décompte</div><h1>Calculer les scores</h1><p class="lead">Cochez les bâtiments de chacun ; pour les grands bâtiments occupés, l'appli calcule le bonus. Tout reste enregistré dans ce navigateur.</p>
 <div class="toolbar">Joueurs ${seg('sc-n',[2,3,4,5],SC.n)}<label class="chk"><input type="checkbox" id="sc-e1" ${SC.e1?'checked':''}> Extension I</label><label class="chk"><input type="checkbox" id="sc-e2" ${SC.e2?'checked':''}> Extension II (bourgeois)</label><button type="button" id="sc-reset">Tout effacer</button></div>""",
 r"""<div class="eyebrow">Scoring</div><h1>Score calculator</h1><p class="lead">Tick each player's Buildings; for occupied Large Buildings, the app works out the bonus. Everything is saved in this browser.</p>
 <div class="toolbar">Players ${seg('sc-n',[2,3,4,5],SC.n)}<label class="chk"><input type="checkbox" id="sc-e1" ${SC.e1?'checked':''}> Expansion I</label><label class="chk"><input type="checkbox" id="sc-e2" ${SC.e2?'checked':''}> Expansion II (citizens)</label><button type="button" id="sc-reset">Clear all</button></div>"""),
(r"""aria-label="Nom du joueur ${i+1}" """, r"""aria-label="Player ${i+1} name" """),
(r"""<label class="f">PV en jetons<input""", r"""<label class="f">VP in chips<input"""),
(r"""<label class="f">Bourgeois<input""", r"""<label class="f">Citizens<input"""),
(r"""<label class="f">Pesos + barils<input""", r"""<label class="f">Coins + barrels<input"""),
(r"""${grp('prod','Bâtiments industriels')}${grp('small','Petits bâtiments beiges')}${grp('large','Grands bâtiments')}""", r"""${grp('prod','Production Buildings')}${grp('small','Small Commercial Buildings')}${grp('large','Large Buildings')}"""),
(r"""> ${BI[k].fr} occupé</label>""", r"""> ${BI[k].fr} occupied</label>"""),
(r"""</div>`}).join('')}</div><h2>Classement</h2>""", r"""</div>`}).join('')}</div><h2>Ranking</h2>"""),
(r"""$('#sc-t'+i).textContent=r.t+' PV'""", r"""$('#sc-t'+i).textContent=r.t+' VP'"""),
(r"""p.occ[k]?`bonus +${bonus(p,k)}`:'non occupé : 4 PV seulement'""", r"""p.occ[k]?`bonus +${bonus(p,k)}`:'not occupied: 4 VP only'"""),
(r"""<b>${r.t} PV</b>${res.some((o,j)=>j!==i&&o.t===r.t)?` <span class="muted small">(départage : ${r.tie})</span>`:''}""", r"""<b>${r.t} VP</b>${res.some((o,j)=>j!==i&&o.t===r.t)?` <span class="muted small">(tie-break: ${r.tie})</span>`:''}"""),
(r"""confirm('Effacer tous les scores ?')""", r"""confirm('Clear all scores?')"""),
(r"""/* ---------- onglets, thème, démarrage ---------- */""", r"""/* ---------- tabs, theme, start ---------- */"""),
(r"""$('#theme').title='Thème : '+{auto:'automatique',dark:'sombre',light:'clair'}[th]""", r"""$('#theme').title='Theme: '+{auto:'automatic',dark:'dark',light:'light'}[th]"""),
(r"""<footer class="page small muted" style="padding-top:0">Aide de jeu de fan, gratuite et non officielle, sans lien avec Ravensburger ni alea. Puerto Rico 1897 © Andreas Seyfarth / Ravensburger. Règles résumées d'après le livret de règles français.</footer>""",
 r"""<footer class="page small muted" style="padding-top:0">Free, unofficial fan-made game aid, not affiliated with Ravensburger or alea. Puerto Rico 1897 © Andreas Seyfarth / Ravensburger. Rules summarised from the English rulebook.</footer>"""),
# 1-head.html
(r"""<html lang="fr">""", r"""<html lang="en">"""),
(r"""<title>Puerto Rico 1897 · Apprendre les règles</title>
<meta name="description" content="Apprendre Puerto Rico 1897 point de règle par point de règle : ateliers interactifs, cas pratiques, quiz, aide-mémoire des bâtiments et calculateur de score.">""",
 r"""<title>Puerto Rico 1897 · Learn the rules</title>
<meta name="description" content="Learn Puerto Rico 1897 one rule at a time: interactive labs, hands-on cases, quizzes, a building reference and a score calculator.">"""),
(r"""aria-label="Sections">
    <button type="button" role="tab" data-tab="learn" aria-selected="true">Apprendre</button>
    <button type="button" role="tab" data-tab="aide" aria-selected="false">Aide-mémoire</button>
    <button type="button" role="tab" data-tab="score" aria-selected="false">Décompte</button>""",
 r"""aria-label="Sections">
    <button type="button" role="tab" data-tab="learn" aria-selected="true">Learn</button>
    <button type="button" role="tab" data-tab="aide" aria-selected="false">Reference</button>
    <button type="button" role="tab" data-tab="score" aria-selected="false">Scoring</button>"""),
(r"""aria-label="Changer de thème (clair / sombre)">""", r"""aria-label="Change theme (light / dark)">"""),
(r"""aria-label="Sommaire du tutoriel">
    <p class="brand">Apprendre les règles<small>D'après le livret de règles français</small></p>""", r"""aria-label="Tutorial contents">
    <p class="brand">Learn the rules<small>After the English rulebook</small></p>"""),
(r"""aria-expanded="false">Afficher le sommaire</button>""", r"""aria-expanded="false">Show contents</button>"""),
]
