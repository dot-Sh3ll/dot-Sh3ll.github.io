# Paires français → anglais pour 4-labs.js (appliquées dans l'ordre par build_en.py)
PAIRS = [
(r"""/* ---------- ateliers ---------- */""", r"""/* ---------- labs ---------- */"""),
(r"""const ROLEDEF={pla:{n:'Paysan',a:'Une plantation chacun',p:'Carrière possible'},bat:{n:'Bâtisseur',a:'Un bâtiment chacun',p:'−1 Peso'},rec:{n:'Recruteur',a:'Ouvriers du Registre',p:'+1 ouvrier'},
 art:{n:'Producteur',a:'Production',p:'+1 baril'},neg:{n:'Marchand',a:'Vente d\'1 baril',p:'+1 Peso'},cap:{n:'Capitaine',a:'Chargement obligatoire',p:'+1 PV'},av1:{n:'Aventurier',a:'Aucune action',p:'+1 Peso'},av2:{n:'Aventurier',a:'Aucune action',p:'+1 Peso'}};""",
 r"""const ROLEDEF={pla:{n:'Planter',a:'One Estate each',p:'Quarry allowed'},bat:{n:'Builder',a:'One Building each',p:'−1 coin'},rec:{n:'Recruiter',a:'Workers from the Register',p:'+1 worker'},
 art:{n:'Craftsman',a:'Production',p:'+1 barrel'},neg:{n:'Trader',a:'Sell 1 barrel',p:'+1 coin'},cap:{n:'Captain',a:'Mandatory loading',p:'+1 VP'},av1:{n:'Adventurer',a:'No action',p:'+1 coin'},av2:{n:'Adventurer',a:'No action',p:'+1 coin'}};"""),
# mise en place
(r"""<h3>Atelier : la mise en place de votre table</h3><p class="hint">Choisissez le nombre de joueurs.</p>""", r"""<h3>Lab: setting up your table</h3><p class="hint">Choose the number of players.</p>"""),
(r"""2:{co:3,pl:'Gouverneur : Fruits ; autre joueur : Maïs',vp:65,qu:'5 (on en retire 3)',vis:3,ro:'7 (un seul Aventurier)',sh:'4 et 6',reg:2,sup:40,ba:'1 de chaque bâtiment beige, 2 de chaque bâtiment industriel',ex:'Retirez 3 tuiles de chaque type de Terrain (Maïs, Fruits, Sucre, Tabac, Café, Carrière) et 2 barils de chaque marchandise.'},
 3:{co:2,pl:'Fruits, Fruits, Maïs',vp:75,qu:8,vis:4,ro:'6 (sans Aventurier)',sh:'4, 5 et 6',reg:3,sup:55,ba:'Les 49 bâtiments'},
 4:{co:3,pl:'Fruits, Fruits, Maïs, Maïs',vp:100,qu:8,vis:5,ro:'7 (un seul Aventurier)',sh:'5, 6 et 7',reg:4,sup:75,ba:'Les 49 bâtiments'},
 5:{co:4,pl:'Fruits, Fruits, Fruits, Maïs, Maïs',vp:126,qu:8,vis:6,ro:'8 (les deux Aventuriers)',sh:'6, 7 et 8',reg:5,sup:95,ba:'Les 49 bâtiments'}}[n];""",
 r"""2:{co:3,pl:'Governor: Fruit; other player: Corn',vp:65,qu:'5 (3 removed)',vis:3,ro:'7 (a single Adventurer)',sh:'4 and 6',reg:2,sup:40,ba:'1 of each Commercial Building, 2 of each Production Building',ex:'Remove 3 tiles of each Countryside type (Corn, Fruit, Sugar, Tobacco, Coffee, Quarry) and 2 barrels of each Good.'},
 3:{co:2,pl:'Fruit, Fruit, Corn',vp:75,qu:8,vis:4,ro:'6 (no Adventurer)',sh:'4, 5 and 6',reg:3,sup:55,ba:'All 49 Buildings'},
 4:{co:3,pl:'Fruit, Fruit, Corn, Corn',vp:100,qu:8,vis:5,ro:'7 (a single Adventurer)',sh:'5, 6 and 7',reg:4,sup:75,ba:'All 49 Buildings'},
 5:{co:4,pl:'Fruit, Fruit, Fruit, Corn, Corn',vp:126,qu:8,vis:6,ro:'8 (both Adventurers)',sh:'6, 7 and 8',reg:5,sup:95,ba:'All 49 Buildings'}}[n];"""),
(r"""<table><tr><th>Élément</th><th>${n} joueurs</th></tr>
 <tr><td>Pesos par joueur</td><td>${D.co}</td></tr><tr><td>Plantations de départ (depuis le Gouverneur)</td><td>${D.pl}</td></tr>
 <tr><td>Jetons PV</td><td>${D.vp}</td></tr><tr><td>Carrières</td><td>${D.qu}</td></tr><tr><td>Plantations face visible</td><td>${D.vis}</td></tr>
 <tr><td>Cartes personnage</td><td>${D.ro}</td></tr><tr><td>Navires</td><td>${D.sh} cales</td></tr><tr><td>Ouvriers sur le Registre</td><td>${D.reg}</td></tr>
 <tr><td>Ouvriers dans la réserve</td><td>${D.sup}</td></tr><tr><td>Bâtiments</td><td>${D.ba}</td></tr>${D.ex?`<tr><td>À retirer</td><td>${D.ex}</td></tr>`:''}</table>""",
 r"""<table><tr><th>Item</th><th>${n} players</th></tr>
 <tr><td>Coins per player</td><td>${D.co}</td></tr><tr><td>Starting Estates (from the Governor)</td><td>${D.pl}</td></tr>
 <tr><td>VP chips</td><td>${D.vp}</td></tr><tr><td>Quarries</td><td>${D.qu}</td></tr><tr><td>Face-up Estates</td><td>${D.vis}</td></tr>
 <tr><td>Role cards</td><td>${D.ro}</td></tr><tr><td>Cargo Ships</td><td>${D.sh} holds</td></tr><tr><td>Workers on the Work Register</td><td>${D.reg}</td></tr>
 <tr><td>Workers in the supply</td><td>${D.sup}</td></tr><tr><td>Buildings</td><td>${D.ba}</td></tr>${D.ex?`<tr><td>Remove</td><td>${D.ex}</td></tr>`:''}</table>"""),
# un tour
(r"""/* --- un tour --- */""", r"""/* --- a round --- */"""),
(r"""<h3>Atelier : jouez un tour</h3><p class="hint">Chaque joueur choisit un personnage à son tour : cliquez sur une carte. Observez l'ordre d'action de chaque phase, puis les Pesos posés en fin de tour.</p>""",
 r"""<h3>Lab: play a round</h3><p class="hint">Each player chooses a role in turn: click a card. Watch the order of play in each phase, then the coins placed at the end of the round.</p>"""),
(r""">Recommencer</button></div>
<p id="ro-who" """, r""">Start again</button></div>
<p id="ro-who" """),
(r"""id="ro-next" hidden>Tour suivant</button>""", r"""id="ro-next" hidden>Next round</button>"""),
(r"""done?`Tour ${S.round} terminé.`:`Tour ${S.round} · Gouverneur : <b>${NAMES[S.gov]}</b> · À <b>${NAMES[who]}</b> de choisir un personnage.`""",
 r"""done?`Round ${S.round} is over.`:`Round ${S.round} · Governor: <b>${NAMES[S.gov]}</b> · <b>${NAMES[who]}</b> chooses a role.`"""),
(r"""<small>Privilège : ${d.p}</small>""", r"""<small>Advantage: ${d.p}</small>"""),
(r"""`<small>pris par ${NAMES[S.taken[k]]}</small>`""", r"""`<small>taken by ${NAMES[S.taken[k]]}</small>`"""),
(r"""seq=`seul ${NAMES[p]} agit`""", r"""seq=`only ${NAMES[p]} acts`"""),
(r"""(i===0?' (privilège)':'')""", r"""(i===0?' (advantage)':'')"""),
(r"""S.log.push({t:`<b>${NAMES[p]}</b> prend le <b>${d.n}</b>${c?` et empoche ${c} Peso${c>1?'s':''}`:''}. Ordre d'action : ${seq}.`});""",
 r"""S.log.push({t:`<b>${NAMES[p]}</b> takes the <b>${d.n}</b>${c?` and pockets ${c} coin${c>1?'s':''}`:''}. Order of play: ${seq}.`});"""),
(r"""t:`Fin de tour : ${NAMES[S.gov]} pose 1 Peso sur ${left.map(x=>ROLEDEF[x].n).join(', ')}. La carte Gouverneur passe à ${NAMES[(S.gov+1)%S.n]}.`""",
 r"""t:`End of the round: ${NAMES[S.gov]} places 1 coin on ${left.map(x=>ROLEDEF[x].n).join(', ')}. The Governor card passes to ${NAMES[(S.gov+1)%S.n]}.`"""),
# Paysan
(r"""/* --- Paysan --- */""", r"""/* --- Planter --- */"""),
(r"""<h3>Atelier : une phase du Paysan</h3><p class="hint">4 joueurs. Ana est le Paysan, Carla a un Dépôt de Matériaux occupé. Faites jouer chaque joueur à son tour : cliquez sur une tuile ou passez. Le simulateur refuse les choix interdits.</p>""",
 r"""<h3>Lab: a Planting phase</h3><p class="hint">4 players. Ana is the Planter, Carla has an occupied Builders Yard. Play each player in turn: click a tile or pass. The simulator refuses illegal choices.</p>"""),
(r"""id="pl-pass">Passer</button><button type="button" id="pl-new">Nouvelle situation</button>""", r"""id="pl-pass">Pass</button><button type="button" id="pl-new">New situation</button>"""),
(r"""Carrière (${S.q})</button>""", r"""Quarry (${S.q})</button>"""),
(r"""S.done?'Phase terminée.':`À <b>${PL[S.turn]}</b>${S.turn===0?' (Paysan)':S.turn===2?' (Dépôt de Matériaux occupé)':''} de choisir.`""",
 r"""S.done?'Phase over.':`<b>${PL[S.turn]}</b>${S.turn===0?' (Planter)':S.turn===2?' (occupied Builders Yard)':''} chooses.`"""),
(r"""t:`Fin de phase : Ana (Paysan) défausse ${d} plantation${d>1?'s':''} restante${d>1?'s':''} et en révèle 5 nouvelles (joueurs + 1).`""",
 r"""t:`End of the phase: Ana (Planter) discards ${d} remaining Estate${d>1?'s':''} and flips 5 new ones (players + 1).`"""),
(r"""t:`${p} ne peut pas prendre de Carrière : c'est le privilège du Paysan, ou il faut un Dépôt de Matériaux occupé.`""",
 r"""t:`${p} cannot take a Quarry: it is the Planter's advantage, or you need an occupied Builders Yard.`"""),
(r"""S.log.push({t:`${p} prend une Carrière${S.turn===0?' (privilège du Paysan)':' (grâce au Dépôt de Matériaux)'}.`})""",
 r"""S.log.push({t:`${p} takes a Quarry${S.turn===0?' (Planter advantage)':' (thanks to the Builders Yard)'}.`})"""),
(r"""S.log.push({t:`${p} prend une plantation de ${GN1[g]} et la pose, sans ouvrier, sur une case Parcelle vide.`})""",
 r"""S.log.push({t:`${p} takes a ${GN1[g]} Estate and places it, without a worker, on an empty Countryside space.`})"""),
(r"""S.log.push({t:`${PL[S.turn]} passe.`})""", r"""S.log.push({t:`${PL[S.turn]} passes.`})"""),
# Recruteur
(r"""/* --- Recruteur --- */""", r"""/* --- Recruiter --- */"""),
(r"""<h3>Atelier : distribuer et remplir le Registre</h3><p class="hint">Réglez le nombre de joueurs et d'ouvriers sur le Registre. Le Recruteur est le premier de la liste.</p>
<div class="row"><label class="f">Joueurs${numIn('rc-n',4,2,5)}</label><label class="f">Ouvriers sur le Registre${numIn('rc-w',6,0,30)}</label></div><div class="out" id="rc-out"></div>
<h3>Remplir le Registre en fin de phase</h3><div class="row"><label class="f">Demi-cercles vides sur les bâtiments (tous joueurs)${numIn('rc-e',2,0,60)}</label><label class="f">Ouvriers restant dans la réserve${numIn('rc-s',20,0,95)}</label></div>""",
 r"""<h3>Lab: sharing out and refilling the Register</h3><p class="hint">Set the number of players and workers on the Work Register. The Recruiter is first in the list.</p>
<div class="row"><label class="f">Players${numIn('rc-n',4,2,5)}</label><label class="f">Workers on the Register${numIn('rc-w',6,0,30)}</label></div><div class="out" id="rc-out"></div>
<h3>Refilling the Register at the end of the phase</h3><div class="row"><label class="f">Empty semicircles on Buildings (all players)${numIn('rc-e',2,0,60)}</label><label class="f">Workers left in the supply${numIn('rc-s',20,0,95)}</label></div>"""),
(r"""<table><tr><th>Joueur</th><th class="c">Ouvriers reçus</th></tr>${get.map((g,i)=>`<tr><td>${NAMES[i]}${i===0?' (Recruteur : 1 de la réserve + Registre)':''}</td>""",
 r"""<table><tr><th>Player</th><th class="c">Workers received</th></tr>${get.map((g,i)=>`<tr><td>${NAMES[i]}${i===0?' (Recruiter: 1 from the supply + Register)':''}</td>"""),
(r"""o.innerHTML=`Le Recruteur doit poser <b>${need}</b> ouvrier${need>1?'s':''} (${e} demi-cercle${e>1?'s':''} vide${e>1?'s':''}, minimum ${n}).`+(s<need?` <b>La réserve n'en a que ${s} : la partie s'achèvera à la fin de ce tour.</b>`:` La réserve suffit (${s}).`)""",
 r"""o.innerHTML=`The Recruiter must place <b>${need}</b> worker${need>1?'s':''} (${e} empty semicircle${e>1?'s':''}, minimum ${n}).`+(s<need?` <b>The supply only has ${s}: the game will end at the end of this round.</b>`:` The supply is enough (${s}).`)"""),
# Bâtisseur
(r"""/* --- Bâtisseur --- */""", r"""/* --- Builder --- */"""),
(r"""<h3>Atelier : combien coûte ce bâtiment ?</h3><p class="hint">Choisissez un bâtiment et votre situation.</p>
<div class="row"><label class="f">Bâtiment<select""", r"""<h3>Lab: what does this Building cost?</h3><p class="hint">Choose a Building and your situation.</p>
<div class="row"><label class="f">Building<select"""),
(r"""<label class="f">Carrières occupées${numIn('bd-q',2,0,8)}</label><label class="f">Cases Ville libres${numIn('bd-free',6,0,12)}</label></div>
<div class="row" style="margin-top:6px"><label class="chk"><input type="checkbox" id="bd-pri" checked> Je suis le Bâtisseur</label><label class="chk"><input type="checkbox" id="bd-own"> Je l'ai déjà</label></div>""",
 r"""<label class="f">Occupied Quarries${numIn('bd-q',2,0,8)}</label><label class="f">Empty City spaces${numIn('bd-free',6,0,12)}</label></div>
<div class="row" style="margin-top:6px"><label class="chk"><input type="checkbox" id="bd-pri" checked> I am the Builder</label><label class="chk"><input type="checkbox" id="bd-own"> I already own it</label></div>"""),
(r"""o.innerHTML='Impossible : on ne construit jamais deux fois le même bâtiment.'""", r"""o.innerHTML='Impossible: you never build the same Building twice.'"""),
(r"""o.innerHTML='Impossible : votre Ville est pleine, vous ne pouvez plus faire l\'action Bâtisseur.'""", r"""o.innerHTML='Impossible: your City is full, you can no longer take the Builder action.'"""),
(r"""o.innerHTML='Impossible : un grand bâtiment occupe 2 cases adjacentes.'""", r"""o.innerHTML='Impossible: a Large Building takes 2 adjacent spaces.'"""),
(r"""`<span class="big">${p} Peso${p>1?'s':''}</span><br>Coût ${b.cost} − ${qq} Carrière${qq>1?'s':''} (plafond ${cap} : ${b.kind==='large'?'grand bâtiment':`rangée ${b.row}`})${pri?' − 1 (privilège)':''}${b.cost-qq-(pri?1:0)<0?' → ramené à 0':''}.${q>cap?` <span class="muted">Vos ${q-cap} autres Carrières ne servent pas ici.</span>`:''}${free-(b.kind==='large'?2:1)===0?' <b>Ce bâtiment remplit votre Ville : la partie s\'achèvera à la fin du tour.</b>':''}`""",
 r"""`<span class="big">${p} coin${p>1?'s':''}</span><br>Cost ${b.cost} − ${qq} Quarr${qq>1?'ies':'y'} (cap ${cap}: ${b.kind==='large'?'Large Building':`section ${b.row}`})${pri?' − 1 (advantage)':''}${b.cost-qq-(pri?1:0)<0?' → raised to 0':''}.${q>cap?` <span class="muted">Your other ${q-cap} Quarries don't help here.</span>`:''}${free-(b.kind==='large'?2:1)===0?' <b>This Building fills your City: the game will end at the end of the round.</b>':''}`"""),
# Producteur
(r"""/* --- Producteur --- */""", r"""/* --- Craftsman --- */"""),
(r"""<h3>Atelier : qu'est-ce que je produis ?</h3><p class="hint">Pour chaque marchandise : plantations occupées, et ouvriers dans les bâtiments industriels de ce type.</p>
<div class="tw"><table><tr><th>Marchandise</th><th>Plantations occupées</th><th>Ouvriers dans les bâtiments</th><th class="c">Barils</th></tr>""",
 r"""<h3>Lab: what do I produce?</h3><p class="hint">For each Good: occupied Estates, and workers in Production Buildings of that type.</p>
<div class="tw"><table><tr><th>Good</th><th>Occupied Estates</th><th>Workers in Buildings</th><th class="c">Barrels</th></tr>"""),
(r"""'<span class="muted">aucun bâtiment</span>'""", r"""'<span class="muted">no Building</span>'"""),
(r"""<label class="chk"><input type="checkbox" id="pd-fac"> Usine occupée</label><label class="chk"><input type="checkbox" id="pd-art" checked> Je suis le Producteur</label>""",
 r"""<label class="chk"><input type="checkbox" id="pd-fac"> Occupied Factory</label><label class="chk"><input type="checkbox" id="pd-art" checked> I am the Craftsman</label>"""),
(r"""let t=`Vous produisez <b>${tot}</b> baril${tot>1?'s':''} de ${types} type${types>1?'s':''}.`;
 if(art)t+=made.length?` Privilège : à la fin de la phase, 1 baril de plus parmi ${made.map(g=>GN1[g]).join(', ')}.`:` Rien produit : pas de baril bonus.`;
 if(fac)t+=` Usine : <b>${fc}</b> Peso${fc>1?'s':''}.`;""",
 r"""let t=`You produce <b>${tot}</b> barrel${tot>1?'s':''} of ${types} type${types>1?'s':''}.`;
 if(art)t+=made.length?` Advantage: at the end of the phase, 1 more barrel among ${made.map(g=>GN1[g]).join(', ')}.`:` Nothing produced: no bonus barrel.`;
 if(fac)t+=` Factory: <b>${fc}</b> coin${fc>1?'s':''}.`;"""),
# Marchand
(r"""/* --- Marchand --- */""", r"""/* --- Trader --- */"""),
(r"""<h3>Atelier : la Maison de Commerce</h3><p class="hint">Choisissez vos bâtiments, puis cliquez sur un baril à vendre. Chaque clic est un joueur différent qui vend 1 baril.</p>""",
 r"""<h3>Lab: the Trading House</h3><p class="hint">Choose your Buildings, then click a barrel to sell. Each click is a different player selling 1 barrel.</p>"""),
(r"""<label class="chk"><input type="checkbox" id="tr-pri"> Marchand (privilège)</label><label class="chk"><input type="checkbox" id="tr-off"> Comptoir</label><label class="chk"><input type="checkbox" id="tr-sm"> Petit Marché</label><label class="chk"><input type="checkbox" id="tr-lm"> Grand Marché</label>""",
 r"""<label class="chk"><input type="checkbox" id="tr-pri"> Trader (advantage)</label><label class="chk"><input type="checkbox" id="tr-off"> Office</label><label class="chk"><input type="checkbox" id="tr-sm"> Small Market</label><label class="chk"><input type="checkbox" id="tr-lm"> Large Market</label>"""),
(r""">Vendre ${G[g]}</button>""", r""">Sell ${G[g]}</button>"""),
(r"""id="tr-end">Fin de la phase</button><button type="button" id="tr-new">Nouvelle situation</button>""", r"""id="tr-end">End of the phase</button><button type="button" id="tr-new">New situation</button>"""),
(r"""t:`Refusé : la Maison est pleine (4 barils). Plus personne ne vend dans cette phase.`""", r"""t:`Refused: the Trading House is full (4 barrels). Nobody else sells this phase.`"""),
(r"""t:`Refusé : il y a déjà du ${GN1[g]} dans la Maison. Il faudrait un Comptoir occupé.`""", r"""t:`Refused: there is already ${GN1[g]} in the Trading House. You would need an occupied Office.`"""),
(r"""d=[`${PRICE[g]} (prix)`];
  if(pri){c++;d.push('1 (privilège)')}if(sm){c++;d.push('1 (Petit Marché)')}if(lm){c+=2;d.push('2 (Grand Marché)')}""",
 r"""d=[`${PRICE[g]} (price)`];
  if(pri){c++;d.push('1 (advantage)')}if(sm){c++;d.push('1 (Small Market)')}if(lm){c+=2;d.push('2 (Large Market)')}"""),
(r"""t:`Vente de ${GN1[g]}${H.includes(g)&&H.filter(x=>x===g).length>1?' (doublon autorisé par le Comptoir)':''} : <b>${c} Peso${c>1?'s':''}</b> = ${d.join(' + ')}.`""",
 r"""t:`Sale of ${GN1[g]}${H.includes(g)&&H.filter(x=>x===g).length>1?' (duplicate allowed by the Office)':''}: <b>${c} coin${c>1?'s':''}</b> = ${d.join(' + ')}.`"""),
(r"""L[0].t+=' Le privilège est consommé : les joueurs suivants vendent sans lui.'""", r"""L[0].t+=' The advantage is used up: the next players sell without it.'"""),
(r"""t:'Fin de phase : la Maison était pleine, le Marchand la vide.'""", r"""t:'End of the phase: the Trading House was full, the Trader empties it.'"""),
(r"""t:`Fin de phase : la Maison n'est pas pleine (${H.length}/4), ses barils restent pour la prochaine fois.`""", r"""t:`End of the phase: the Trading House is not full (${H.length}/4), its barrels stay for next time.`"""),
# stockage
(r"""/* --- stockage --- */""", r"""/* --- storage --- */"""),
(r"""<h3>Atelier : qu'ai-je le droit de garder ?</h3><p class="hint">Fin de la phase du Capitaine. Indiquez combien de barils vous gardez de chaque type, puis vérifiez.</p>
<div class="row"><label class="chk"><input type="checkbox" id="st-sw"> Petit Entrepôt occupé</label><label class="chk"><input type="checkbox" id="st-lw"> Grand Entrepôt occupé</label><button type="button" id="st-new">Nouvelle situation</button></div>""",
 r"""<h3>Lab: what may I keep?</h3><p class="hint">End of the Shipment phase. Enter how many barrels of each type you keep, then check.</p>
<div class="row"><label class="chk"><input type="checkbox" id="st-sw"> Occupied Small Warehouse</label><label class="chk"><input type="checkbox" id="st-lw"> Occupied Large Warehouse</label><button type="button" id="st-new">New situation</button></div>"""),
(r"""id="st-ok">Vérifier</button>""", r"""id="st-ok">Check</button>"""),
(r"""`<tr><th>Marchandise</th><th class="c">Il vous reste</th><th class="c">Vous gardez</th></tr>`""", r"""`<tr><th>Good</th><th class="c">You have</th><th class="c">You keep</th></tr>`"""),
(r"""o.innerHTML=`Interdit. ${w?`Vos entrepôts couvrent ${w} type${w>1?'s':''} complet${w>1?'s':''}, et`:'Sans entrepôt,'} vous ne gardez qu'1 baril en plus. Exemple légal : ${b.full.map(g=>`tous les ${GN1[g]} (${H[g]})`).concat(b.one?[`1 ${GN1[b.one]}`]:[]).join(' + ')}.`""",
 r"""o.innerHTML=`Not allowed. ${w?`Your Warehouses cover ${w} whole type${w>1?'s':''}, and`:'Without a Warehouse,'} you only keep 1 more barrel. A legal example: ${b.full.map(g=>`all the ${GN1[g]} (${H[g]})`).concat(b.one?[`1 ${GN1[b.one]}`]:[]).join(' + ')}.`"""),
(r"""o.innerHTML=`Légal : vous gardez ${tot} baril${tot>1?'s':''} et en rendez ${lost} à la réserve.${tot<b.n?` Vous auriez pu en garder jusqu'à ${b.n}.`:''}`""",
 r"""o.innerHTML=`Legal: you keep ${tot} barrel${tot>1?'s':''} and return ${lost} to the supply.${tot<b.n?` You could have kept up to ${b.n}.`:''}`"""),
# fiches
(r"""/* --- fiches des petits bâtiments --- */""", r"""/* --- small building cards --- */"""),
(r"""const CARDNOTE={smk:'Avec un Grand Marché occupé : +3 au total. Même un Maïs vendu rapporte alors des Pesos.',byd:'Le Paysan qui a un Dépôt de Matériaux ne prend pas deux Carrières. Avec l\'Hacienda, la tuile face cachée reste une plantation.',hac:'La tuile tirée se pose aussitôt, sans possibilité de la refuser. Votre action normale suit.',swh:'Vous devez quand même charger tout ce que vous pouvez pendant la phase.',hos:'L\'ouvrier ne peut aller que sur la tuile que vous venez de poser (avec l\'Hacienda, sur l\'une des deux).',off:'Un autre joueur avec un Comptoir peut aussi doubler le même type, s\'il reste de la place.',lmk:'S\'applique à chaque vente à la Maison de Commerce, privilège ou non.',lwh:'Avec le Petit Entrepôt : 3 types complets + 1 baril.',fac:'Seul compte le nombre de types différents, pas les quantités.',sch:'Un seul ouvrier, même pour un bâtiment à 3 demi-cercles.',har:'Chaque chargement compte : plusieurs tours de chargement = plusieurs PV.',wha:'Le navire privé n\'a pas de limite, accepte un type déjà présent sur un cargo, et tous les barils de ce type doivent partir.'};""",
 r"""const CARDNOTE={smk:'With an occupied Large Market: +3 in total. Even a sold Corn then earns coins.',byd:'A Planter with a Builders Yard does not take two Quarries. With the Hacienda, the face-down tile stays an Estate.',hac:'The drawn tile is placed at once and cannot be refused. Your normal action follows.',swh:'You must still load everything you can during the phase.',hos:'The worker can only go on the tile you just placed (with the Hacienda, either of the two).',off:'Another player with an Office may also add the same type, if there is room.',lmk:'Applies to every sale to the Trading House, advantage or not.',lwh:'With the Small Warehouse: 3 whole types + 1 barrel.',fac:'Only the number of different types counts, not the quantities.',sch:'A single worker, even for a Building with 3 semicircles.',har:'Every load counts: several loading turns = several VP.',wha:'The Chartered Ship has no limit, accepts a type already on a Cargo Ship, and all barrels of that type must go.'};"""),
(r"""<h3>Atelier : fiches des petits bâtiments</h3><p class="hint">Cliquez sur un bâtiment.</p>""", r"""<h3>Lab: Small Building cards</h3><p class="hint">Click a Building.</p>"""),
(r"""id="cd-o">Choisissez un bâtiment.</div>""", r"""id="cd-o">Choose a Building.</div>"""),
(r"""`<b>${d.fr}</b> <span class="en">${d.en}</span><br>Coût ${d.cost} · ${d.vp} PV · rangée ${d.row} · phase : ${d.ph}<br>${d.fx}<br><span class="muted">À savoir : ${CARDNOTE[d.id]}</span>`""",
 r"""`<b>${d.fr}</b><br>Cost ${d.cost} · ${d.vp} VP · section ${d.row} · phase: ${d.ph}<br>${d.fx}<br><span class="muted">Good to know: ${CARDNOTE[d.id]}</span>`"""),
# grands
(r"""/* --- grands bâtiments --- */""", r"""/* --- large buildings --- */"""),
(r"""<h3>Atelier : bonus d'un grand bâtiment</h3><p class="hint">Le grand bâtiment est supposé occupé. Il rapporte 4 PV + ce bonus.</p>
<div class="row"><label class="f">Bâtiment<select""", r"""<h3>Lab: a Large Building's bonus</h3><p class="hint">The Large Building is assumed to be occupied. It scores 4 VP + this bonus.</p>
<div class="row"><label class="f">Building<select"""),
(r"""const IN={fst:`<label class="f">Petits bâtiments industriels${numIn('lg-a',1,0,4)}</label><label class="f">Grands bâtiments industriels${numIn('lg-c',3,0,4)}</label>`,res:`<label class="f">Cases Parcelle remplies${numIn('lg-a',10,0,12)}</label>`,frt:`<label class="f">Ouvriers sur votre domaine${numIn('lg-a',22,0,99)}</label>`,cus:`<label class="f">PV en jetons${numIn('lg-a',30,0,200)}</label>`,cth:`<label class="f">Bâtiments beiges (Palais du Gouverneur compris)${numIn('lg-a',7,1,12)}</label>`};""",
 r"""const IN={fst:`<label class="f">Small Production Buildings${numIn('lg-a',1,0,4)}</label><label class="f">Large Production Buildings${numIn('lg-c',3,0,4)}</label>`,res:`<label class="f">Filled Countryside spaces${numIn('lg-a',10,0,12)}</label>`,frt:`<label class="f">Workers on your Island${numIn('lg-a',22,0,99)}</label>`,cus:`<label class="f">VP in chips${numIn('lg-a',30,0,200)}</label>`,cth:`<label class="f">Commercial Buildings (City Hall included)${numIn('lg-a',7,1,12)}</label>`};"""),
(r"""`Bonus : <b>${v} PV</b>, soit <span class="big">${v+4} PV</span> au total pour ce bâtiment.`""", r"""`Bonus: <b>${v} VP</b>, that is <span class="big">${v+4} VP</span> in total for this Building.`"""),
# fin
(r"""/* --- fin de partie --- */""", r"""/* --- game end --- */"""),
(r"""<h3>Atelier : la fin est-elle déclenchée ?</h3><div class="row">
<label class="f">Joueurs${numIn('en-n',4,2,5)}</label><label class="f">Ouvriers dans la réserve (fin de Recruteur)${numIn('en-s',6,0,95)}</label><label class="f">Ouvriers à poser sur le Registre${numIn('en-w',5,0,60)}</label>
<label class="f">Cases Ville remplies (le plus avancé)${numIn('en-c',11,0,12)}</label><label class="f">Jetons PV restants${numIn('en-v',3,0,126)}</label></div>""",
 r"""<h3>Lab: is the end triggered?</h3><div class="row">
<label class="f">Players${numIn('en-n',4,2,5)}</label><label class="f">Workers in the supply (end of Recruitment)${numIn('en-s',6,0,95)}</label><label class="f">Workers to place on the Register${numIn('en-w',5,0,60)}</label>
<label class="f">Filled City spaces (furthest player)${numIn('en-c',11,0,12)}</label><label class="f">VP chips left${numIn('en-v',3,0,126)}</label></div>"""),
(r"""why.push(`la réserve (${s}) ne suffit pas à remplir le Registre (${w})`);if(c>=12)why.push('un joueur a rempli ses 12 cases Ville');if(v<=0)why.push('le dernier jeton PV a été pris');""",
 r"""why.push(`the supply (${s}) cannot refill the Register (${w})`);if(c>=12)why.push('a player has filled all 12 City spaces');if(v<=0)why.push('the last VP chip has been taken');"""),
(r"""`<b>Fin déclenchée</b> : ${why.join(' ; ')}. On termine le tour en cours, puis on compte.`:'La partie continue.'""",
 r"""`<b>End triggered</b>: ${why.join('; ')}. Finish the current round, then score.`:'The game goes on.'"""),
]
