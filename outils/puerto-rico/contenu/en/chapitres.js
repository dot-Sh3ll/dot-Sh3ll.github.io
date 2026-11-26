
/* ---------- chapter content (English, after the English rulebook) ----------
   rules: one rule point per line. lab: interactive lab (see LABS). cas: hands-on cases. quiz: check. */
const CH=[
/* ======================= GETTING STARTED ======================= */
{id:'but',part:'Getting started',t:'Object of the game',
lead:`Puerto Rico 1897 puts you in charge of a farm. You plant, recruit, produce, sell and ship. Whoever has the most Victory Points (VP) at the end wins.`,
rules:[
`On your turn you <b>choose a role</b> (Planter, Builder, Recruiter, Craftsman, Trader, Captain or Adventurer). Everyone performs that role's action, but only you get its <b>advantage</b>.`,
`A game lasts about 15 rounds ("years"). It ends at the end of a round, once one of the three end conditions is met.`,
`VP come from three sources: <b>VP chips</b> earned by shipping Goods, the <b>VP printed on your Buildings</b>, and the <b>bonuses of occupied Large Buildings</b>.`,
`Your <b>Island board</b> has 12 <b>Countryside</b> spaces at the top (Estates and Quarries) and 12 <b>City</b> spaces at the bottom (Buildings). The <b>Portrait</b> holds your coins, your barrels and the workers who have no room.`,
`Coins and barrels stay visible to all. VP chips may be placed face down.`,
`Each tile has 1 to 3 <b>semicircles</b>. A semicircle holds exactly 1 worker. A tile with at least 1 worker is <b>occupied</b>, and only occupied tiles work.`
],
html:`<h2>The five Goods</h2>
<div class="tw"><table><tr><th>Good</th><th>To produce it</th><th class="c">Sale price</th></tr>
<tr><td>${G.c}</td><td>An occupied Corn Estate is enough, no Building needed.</td><td class="c">0</td></tr>
<tr><td>${G.f}</td><td>Occupied Fruit Estate + occupied semicircle in a Fruit Warehouse.</td><td class="c">1</td></tr>
<tr><td>${G.s}</td><td>Occupied Sugar Estate + occupied semicircle in a Sugar Mill.</td><td class="c">2</td></tr>
<tr><td>${G.t}</td><td>Occupied Tobacco Estate + occupied semicircle in the Tobacco Storage.</td><td class="c">3</td></tr>
<tr><td>${G.k}</td><td>Occupied Coffee Estate + occupied semicircle in the Coffee Roaster.</td><td class="c">4</td></tr></table></div>
<div class="note"><b>Names.</b> This tutorial uses the terms of the English Puerto Rico 1897 rulebook. The 2002 Puerto Rico used other names (colonists, indigo, mayor…): the rules are the same.</div>`,
cas:[
{q:`Your Tobacco Storage is built but nobody works there. Your Tobacco Estate does have its worker. How much Tobacco do you produce?`,o:[`1 barrel: the Estate is occupied`,`None: the Storage is not occupied, so it doesn't work`,`1 barrel, but only if you are the Craftsman`],a:1,w:`A tile only works when occupied. For Tobacco you need both the occupied Estate and a worker in the Tobacco Storage.`},
{q:`An opponent places their VP chips face down on their Portrait. Can they do the same with their coins?`,o:[`Yes, everything can be hidden`,`No: coins and barrels stay visible, only VP may be hidden`],a:1,w:`The rulebook says coins and Goods stay visible to all. Only VP chips may be turned face down.`}
],
quiz:[
{q:`When you choose a role, who gets its advantage?`,o:[`All players`,`Only you`,`The Governor`],a:1,w:`Everyone performs the action; only the player who took the card gets the advantage.`},
{q:`How many workers fit on one semicircle?`,o:[`1`,`2`,`As many as you like`],a:0,w:`Exactly 1 worker per semicircle.`},
{q:`Which Good is produced without a Building?`,o:[`Fruit`,`Corn`,`Coffee`],a:1,w:`Each occupied Corn Estate yields 1 barrel directly.`}
]},

{id:'mep',part:'Getting started',t:'Setup',
lead:`Almost everything depends on the number of players. The lab gives you the complete list for your table.`,
rules:[
`Central board in the middle: the 49 Buildings stacked on their spaces, the 51 coins form the <b>Bank</b>.`,
`The starting player receives the <b>Governor</b> card.`,
`Each player receives an Island board and coins: <b>one fewer than the number of players</b> (2 with 3 players, 3 with 4, 4 with 5), placed on the Portrait.`,
`Starting Estate, from the Governor clockwise: with 3 players Fruit, Fruit, Corn; with 4 Fruit, Fruit, Corn, Corn; with 5 Fruit, Fruit, Fruit, Corn, Corn. It goes face up on a Countryside space, <b>without a worker</b>.`,
`The 8 Quarries form a face-up stack. The other Estates are shuffled into face-down stacks, and <b>one more than the number of players</b> are flipped face up.`,
`Check your Estates: there are <b>12 Fruit and 8 Coffee</b>. Some first-print copies contain 16 Fruit and 4 Coffee; Ravensburger supplies the correct tiles on request.`,
`The Work Register receives <b>as many workers as there are players</b>. The worker supply, VP chips, roles and ships depend on the number of players (see the mini-game).`,
`The 50 barrels are sorted by color, the Trading House is placed empty. Unused pieces go back in the box.`
],
lab:'setup',
cas:[
{q:`4-player game. You are the 3rd player from the Governor. Which Estate do you take?`,o:[`Fruit`,`Corn`,`Any face-up Estate you like`],a:1,w:`With 4 players, the 1st and 2nd take Fruit, the 3rd and 4th take Corn.`},
{q:`3-player game. Someone takes out both Adventurers. What do you tell them?`,o:[`Keep them, more choice`,`With 3 players we use 6 roles, without any Adventurer`,`Keep just one`],a:1,w:`3 players: 6 roles; 4 players: 7 (1 Adventurer); 5 players: all 8.`}
],
quiz:[
{q:`5-player game: how many coins does each player start with?`,o:[`3`,`4`,`5`],a:1,w:`One fewer than the number of players.`},
{q:`4-player game: which ships are used?`,o:[`4, 5 and 6 holds`,`5, 6 and 7 holds`,`6, 7 and 8 holds`],a:1,w:`3 players: 4-5-6; 4 players: 5-6-7; 5 players: 6-7-8.`},
{q:`How many Estates are flipped face up with 3 players?`,o:[`3`,`4`,`5`],a:1,w:`Always one more than the number of players.`}
]},

{id:'tour',part:'Getting started',t:'A round: roles and Governor',
lead:`The heart of the game fits in one rule: choosing a role starts a phase for everyone. The lab lets you play a whole round.`,
rules:[
`The <b>Governor</b> chooses a role card, places it in front of them and performs the action <b>with the advantage</b>. Then each other player, clockwise, performs the same action <b>without the advantage</b>.`,
`Next, the player to the Governor's left chooses one of the remaining roles, and so on. Each player chooses <b>one role per round</b> (three with two players).`,
`Choosing a role is mandatory. Performing the action is optional, except for the Captain. A player who cannot or will not act is simply skipped.`,
`The player who chose the role <b>always acts first</b>, before the others.`,
`A chosen role stays in front of its player until the end of the round: nobody else can take it that round.`,
`If a role card carries coins, the player who chooses it takes them.`,
`End of the round: the Governor places <b>1 coin from the Bank on each role not chosen</b>, everyone returns their card, and the Governor card passes to the left.`
],
lab:'round',
cas:[
{q:`You are the 2nd player to choose. The Governor took the Craftsman, you take the Captain. Who loads first?`,o:[`The Governor, they started the round`,`You: whoever chooses the role always acts first`,`The player to your left`],a:1,w:`Each phase starts with the player who took the card, then goes clockwise.`},
{q:`The Trader has carried 2 coins for two rounds. You have nothing to sell. Do you take it anyway?`,o:[`Impossible: you must be able to perform the action`,`Yes, that's allowed: you take the 2 coins and may sell nothing`],a:1,w:`The action is optional (except for the Captain). Taking a role "for the money" is a common move.`}
],
quiz:[
{q:`With 4 players (7 roles), how many coins does the Governor place at the end of the round?`,o:[`1`,`3`,`4`],a:1,w:`7 roles, 4 chosen: 3 roles left, 1 coin on each.`},
{q:`Who becomes Governor next round?`,o:[`The player with the fewest VP`,`The player to the left of the current Governor`,`Whoever took the Captain`],a:1,w:`The card simply passes to the left.`},
{q:`Can you take a role another player already chose this round?`,o:[`Yes`,`No`],a:1,w:`The card stays in front of them until the end of the round.`}
]},

/* ======================= THE ROLES ======================= */
{id:'paysan',part:'The roles',t:'The Planter',
lead:`Develop the Countryside: a new Estate for everyone, and a Quarry for the Planter if they want one.`,
rules:[
`The Planter takes <b>a Quarry or one of the face-up Estates</b> and places it on an empty Countryside space (advantage: the Quarry).`,
`Then each player, clockwise, takes one of the remaining face-up Estates. The other players cannot take a Quarry, unless they have an occupied <b>Builders Yard</b>.`,
`The new tile arrives <b>without a worker</b> (unless you have an occupied Hospital). It will only produce once occupied, during a Recruitment phase.`,
`When everyone has played, the Planter <b>discards the remaining face-up Estates</b> and flips new ones: one more than the number of players.`,
`If the stacks run out, shuffle the discard pile into new stacks. If there is nothing left at all, the action becomes impossible.`,
`A placed tile can be moved but never removed. Its position does not matter.`,
`All 12 Countryside spaces filled: you can no longer take the Planter action. No Quarries left: the Planter loses the advantage and the Builders Yard stops working.`
],
html:`<div class="note"><b>Related Buildings.</b> ${bn('hac')} (an extra face-down Estate), ${bn('byd')} (a Quarry for anyone), ${bn('hos')} (a free worker on the placed tile). Details in the Small Buildings chapter.</div>`,
lab:'plant',
cas:[
{q:`You are not the Planter and have no Builders Yard. A Quarry and two Corn Estates are face up. What can you take?`,o:[`The Quarry`,`A Corn Estate`,`Nothing, Quarries are reserved`],a:1,w:`Without an occupied Builders Yard, other players only take face-up Estates.`},
{q:`All 12 of your Countryside spaces are filled. An opponent takes the Planter.`,o:[`You still take an Estate and discard one`,`You pass: a full Countryside forbids the action`,`You place the Estate on a City space`],a:1,w:`A tile is never removed, and there are only 12 Countryside spaces.`},
{q:`You are the Planter and take a Coffee Estate. Will it produce in the next Production phase?`,o:[`Yes, automatically`,`Only if a worker is placed on it before then, in a Recruitment phase`],a:1,w:`Workers are only placed in the Recruitment phase (except with the Hospital or School).`}
],
quiz:[
{q:`At the end of the Planting phase with 4 players, how many Estates are face up?`,o:[`4`,`5`,`The ones left, plus one`],a:1,w:`The leftovers are discarded and one more than the number of players are flipped.`},
{q:`Who refreshes the face-up Estates?`,o:[`The Governor`,`The Planter`,`The last player to take one`],a:1,w:`The Planter does, once everyone has played.`}
]},

{id:'recruteur',part:'The roles',t:'The Recruiter',
lead:`Recruit workers, then place or rearrange them. It is the only time workers move.`,
rules:[
`The Recruiter first takes <b>1 worker from the supply</b> (advantage; not from the Work Register).`,
`Then, starting with the Recruiter and going clockwise, players take <b>1 worker from the Work Register in turn</b> until it is empty. Players may therefore receive different numbers of workers.`,
`Everyone places their workers (new or old) on empty semicircles of Estates, Quarries or Buildings. You may also <b>freely move</b> workers placed earlier.`,
`A worker goes onto the Portrait <b>only if there is no empty semicircle left</b> on your Island. It will wait for the next Recruitment phase.`,
`Players place clockwise from the Recruiter, or simultaneously if everyone agrees.`,
`End of the phase: the Recruiter refills the Work Register with as many workers as there are <b>empty semicircles on Buildings</b> across all players (not on Estates or Quarries), with <b>at least the number of players</b>.`,
`If the supply cannot refill the Work Register, the game will end at the end of the round. If the supply is empty, the Recruiter loses the advantage.`
],
html:`<div class="ex"><b>Rulebook example (4 players).</b> 6 workers on the Work Register. The Recruiter takes 1 worker from the supply, then the Register is shared out: Recruiter, 2nd, 3rd, 4th, Recruiter, 2nd. Result: 3 workers for the Recruiter (including the one from the supply), 2 for the 2nd player, 1 each for the 3rd and 4th.</div>`,
lab:'recruit',
cas:[
{q:`You have 2 workers to place. One semicircle is left on your Corn Estate and none elsewhere. Where does the second one go?`,o:[`Onto the Portrait`,`You must free a semicircle by moving a worker`,`It goes back to the supply`],a:0,w:`The Portrait is for when every semicircle is taken. You could also move other workers, but that creates no extra room.`},
{q:`During a Production phase, you would like to move a worker from your Corn Estate to your Coffee Roaster.`,o:[`Allowed at any time`,`Not allowed: workers only move in the Recruitment phase`],a:1,w:`Exception: the Bohio from Expansion I.`},
{q:`End of the phase, 4 players. There are only 2 empty semicircles on all Buildings combined. How many workers go onto the Register?`,o:[`2`,`4`,`0`],a:1,w:`At least as many as there are players.`}
],
quiz:[
{q:`Where does the Recruiter's advantage worker come from?`,o:[`The Work Register`,`The supply`],a:1,w:`It is taken from the supply, before the Register is shared out.`},
{q:`What do you count to refill the Work Register?`,o:[`Empty semicircles on Buildings`,`Empty semicircles everywhere`,`Workers on Portraits`],a:0,w:`Buildings only, not Estates or Quarries.`}
]},

{id:'batisseur',part:'The roles',t:'The Builder',
lead:`One Building per player, paid to the Bank. The Builder pays 1 coin less, and occupied Quarries lower the prices.`,
rules:[
`The Builder may buy <b>1 Building</b> and pays <b>1 coin less</b> than its cost. Then each player, clockwise, may buy 1 at full price.`,
`The Building goes on an empty City space. A <b>Large Building</b> takes 2 adjacent spaces but counts as a single Building.`,
`You can never own <b>the same Building twice</b>.`,
`Each <b>occupied Quarry</b> lowers the price by 1 coin, capped by the board section: at most 1 Quarry in the top section, 2 in the second, 3 in the third, 4 for Large Buildings.`,
`Discounts add up (advantage, Quarries…). A Building never costs less than 0.`,
`The new Building arrives <b>without a worker</b> (unless you have an occupied School).`,
`If the Builder builds nothing, they get nothing for the advantage. Full City: no more Builder action. A Large Building cannot be built if only 1 space is left.`,
`Filling all 12 City spaces triggers the end of the game (at the end of the round).`
],
html:`<div class="ex"><b>Rulebook example.</b> With 3 occupied Quarries you pay: Builders Yard 1 (2 − 1), Office 3 (5 − 2), Harbor 5 (8 − 3), City Hall 7 (10 − 3). With the Builder's advantage, 1 less again.</div>`,
lab:'build',
cas:[
{q:`You are the Builder with 2 occupied Quarries and want the Small Market (cost 1). How much do you pay?`,o:[`0`,`−2, the Bank pays you`,`1`],a:0,w:`1 − 1 (Quarry, capped at 1 in the top section) − 1 (advantage) = 0 at the floor.`},
{q:`You already own a Small Market. Another one is left on the board. Can you buy it?`,o:[`Yes, the effects add up`,`No: never the same Building twice`],a:1,w:`Each Building may only be built once per player.`},
{q:`You have a single empty City space left and 10 coins. What can you build?`,o:[`A Large Building`,`A Small or Production Building`,`Nothing`],a:1,w:`A Large Building needs 2 adjacent empty spaces.`}
],
quiz:[
{q:`4 occupied Quarries, you buy the Large Warehouse (cost 6, second section) without being the Builder.`,o:[`2`,`4`,`5`],a:1,w:`Cap of 2 Quarries in the second section: 6 − 2 = 4.`},
{q:`What does City Hall cost with 4 occupied Quarries and the Builder's advantage?`,o:[`5`,`6`,`7`],a:0,w:`10 − 4 − 1 = 5.`}
]},

{id:'producteur',part:'The roles',t:'The Craftsman',
lead:`Everyone produces. It is the riskiest role: it often helps the others more than the player who takes it.`,
rules:[
`The Craftsman produces first, then each player clockwise. Barrels go onto the Portrait.`,
`${G.c}: 1 barrel per <b>occupied</b> Corn Estate.`,
`${G.f}, ${G.s}, ${G.t}, ${G.k}: 1 barrel per occupied Estate that has a <b>matching worker in a Production Building</b> of the same type. In practice: the smaller of the two numbers.`,
`Each Production Building semicircle handles 1 barrel: Small Fruit Warehouse and Small Sugar Mill 1, Large Fruit Warehouse and Large Sugar Mill 3, Tobacco Storage 3, Coffee Roaster 2.`,
`Advantage: once everyone has produced, the Craftsman takes <b>1 more barrel</b> of a Good they produced this phase. Nothing produced, no advantage.`,
`If the supply of a Good runs out, later players get none of it. Production order matters.`,
`Related Building: ${bn('fac')}, which pays coins by the number of types produced.`
],
html:`<div class="ex"><b>Rulebook example.</b> 3 Corn Estates, 2 of them occupied: 2 Corn. Tobacco Storage with 1 of 2 semicircles occupied for 2 occupied Tobacco Estates: 1 Tobacco. 4 Sugar Estates, 3 occupied, full Large Sugar Mill: 3 Sugar.</div>`,
lab:'prod',
cas:[
{q:`You have 3 occupied Fruit Estates and an occupied Small Fruit Warehouse. How much Fruit?`,o:[`3`,`1`,`0`],a:1,w:`The Small Fruit Warehouse has a single semicircle: 1 barrel at most.`},
{q:`You would produce 1 Corn, your opponents 3 Coffee and 4 Sugar. Captain and Trader are still free. Do you take the Craftsman?`,o:[`Yes, production is always good`,`Rather not: you'd give the others far more than yourself`],a:1,w:`The rulebook warns: the Craftsman is the riskiest role.`},
{q:`You are the Craftsman and produced 2 Corn and 1 Tobacco. Which bonus barrel do you take?`,o:[`A Coffee, the most valuable`,`A Corn or a Tobacco, your choice`,`None: you need 3 types`],a:1,w:`The bonus barrel must be a Good produced during the phase.`}
],
quiz:[
{q:`2 occupied Sugar Estates, Large Sugar Mill with 3 workers. Sugar produced?`,o:[`2`,`3`,`5`],a:0,w:`The smaller of the two: 2 occupied Estates.`},
{q:`When does the Craftsman take the bonus barrel?`,o:[`Before producing`,`After all players have produced`],a:1,w:`At the end of the phase.`}
]},

{id:'marchand',part:'The roles',t:'The Trader',
lead:`Sell a barrel to the Trading House to bring in money. Four spaces, no duplicates.`,
rules:[
`The Trader may sell <b>1 barrel</b> from their Portrait to the Trading House and receives its price <b>+1 coin</b> (advantage). Then each player, clockwise, may sell 1 barrel at the normal price.`,
`Prices: ${G.c} 0, ${G.f} 1, ${G.s} 2, ${G.t} 3, ${G.k} 4.`,
`The Trading House cannot hold two barrels of the same type, except for a player with an occupied <b>Office</b>.`,
`The Trading House has only <b>4 spaces</b>. Once full, nobody else can sell.`,
`End of the phase: if the Trading House is full, the Trader <b>empties</b> it (barrels to the supply). Otherwise the barrels stay for the next Trade phase.`,
`Selling Corn for 0 coins is allowed (useful with the advantage or a Market). If the Trader sells nothing, they don't get the advantage coin.`,
`Related Buildings: ${bn('smk')} (+1), ${bn('lmk')} (+2, +3 with both), ${bn('off')}.`
],
lab:'trade',
cas:[
{q:`The Trading House holds Sugar and Tobacco. You have 2 Tobacco and 1 Corn, no Buildings. What do you sell?`,o:[`1 Tobacco for 3 coins`,`1 Corn for 0 coins, or nothing`,`2 Tobacco`],a:1,w:`Tobacco is already in the Trading House. Only Corn is left (0 coins), and only one barrel anyway.`},
{q:`The Trading House is empty. You are the Trader with an occupied Small and Large Market. You sell 1 Coffee.`,o:[`5 coins`,`7 coins`,`8 coins`],a:2,w:`4 (Coffee) + 1 (advantage) + 3 (both Markets) = 8.`},
{q:`End of the phase: the Trading House holds 3 barrels. What happens?`,o:[`It is emptied`,`They stay for next time`],a:1,w:`It is only emptied when full (4 barrels).`}
],
quiz:[
{q:`How many barrels can each player sell per Trade phase?`,o:[`1`,`As many as there are spaces`,`1 per type`],a:0,w:`One barrel only, Office or not.`},
{q:`You have an occupied Office. The Trading House holds 4 barrels including a Sugar. Can you sell a Sugar?`,o:[`Yes, thanks to the Office`,`No: the Trading House is full`],a:1,w:`The Office lifts the no-duplicate rule, not the 4-space limit.`}
]},

{id:'capitaine',part:'The roles',t:'The Captain: loading ships',
lead:`The most tightly ruled phase of the game. Loading earns VP, and it is <b>mandatory</b> whenever possible. The lab lets you play whole phases: the simulator refuses illegal loads and tells you why.`,
rules:[
`The Captain loads first, then each player clockwise, and <b>it goes around several times</b> until nobody can load anymore.`,
`On your turn, if you can load, <b>you must load</b>. You choose the type freely, but <b>only one type</b> per turn.`,
`A ship carries <b>only one type</b> of Good, and <b>no two ships ever carry the same type</b>.`,
`If you load a type that is on no ship and several ships are empty, you must choose the one that lets you <b>load the most barrels</b>.`,
`You load <b>as many barrels as possible</b> of that type: no holding back while there is room.`,
`A full ship accepts nothing more.`,
`<b>1 VP per barrel loaded.</b> Advantage: the Captain earns <b>1 extra VP, once</b> per phase, if they loaded at least 1 barrel.`,
`If the VP chips run out, keep track on paper; the game will end at the end of the round.`
],
lab:'ship',
cas:[
{q:`The 5- and 7-hold ships are empty, the 6-hold ship carries 3 Corn. You have 2 Corn and 6 Sugar. Where can your Sugar go?`,o:[`On the 5 or the 7, your choice`,`On the 7: it lets you load the most barrels`,`On the 6`],a:1,w:`Rulebook example: on the 7 Anna loads all 6 Sugar, on the 5 only 5. The bigger load is mandatory.`},
{q:`The 5- and 7-hold ships are empty. You have 2 Coffee. Where do you load them?`,o:[`Only on the 7`,`On either: you load 2 barrels in both cases`],a:1,w:`The rule requires the ship that lets you load the most. Here both take 2: free choice. (The French rulebook says the largest ship instead: agree before playing if someone learnt that version.)`},
{q:`The Tobacco ship is full. The 5-hold ship is empty. You only have Tobacco.`,o:[`You load it on the 5`,`You cannot load: Tobacco already has its ship`],a:1,w:`No two ships may carry the same type, even when the first one is full.`},
{q:`You would rather keep your Coffee to sell it. The Coffee ship has 2 free holds.`,o:[`You may pass your turn`,`If it is your only loadable Good, you must load`],a:1,w:`Loading is mandatory. You may only choose another type if you have one that can also be loaded.`}
],
quiz:[
{q:`The Captain loads three times during the phase. How many bonus VP do they get?`,o:[`1`,`3`,`0`],a:0,w:`The advantage counts once per phase.`},
{q:`Can a player load two different types in the same turn?`,o:[`Yes, if there are two ships`,`No, one type per turn`],a:1,w:`One type per turn. They may load the other on their next turn around.`}
]},

{id:'stockage',part:'The roles',t:'The Captain: storing and emptying',
lead:`At the end of the phase, everyone keeps almost nothing. Warehouses change everything.`,
rules:[
`When nobody can load anymore, each player <b>keeps only 1 barrel</b> of their choice on their Portrait. The rest go back to the supply.`,
`${bn('swh')}: you also keep <b>all barrels of 1 type</b>. ${bn('lwh')}: of <b>2 types</b>. Both: <b>3 types</b>. Always on top of the usual barrel.`,
`Storage is only checked at this moment: outside the end of the Shipment phase, you may hold as many barrels as you like.`,
`A Warehouse never exempts you from loading: load first, store afterwards.`,
`The Captain <b>empties the full ships</b> (barrels to the supply). Partly loaded ships <b>keep their cargo</b> for the next phase, with their type already set.`,
`${bn('har')}: +1 VP each time you load. ${bn('wha')}: once per phase, all your barrels of 1 type go onto a Chartered Ship with no limit, for the same 1 VP per barrel (barrels to the supply). Using it is optional.`
],
html:`<div class="ex"><b>Rulebook example (Harbor + Wharf).</b> 5 Tobacco, but the Tobacco ship has only 3 holds left: 3 + 1 VP. Next turn, 2 Sugar on the Sugar ship: 2 + 1 VP. The turn after, the Wharf ships the 2 remaining Tobacco: 2 + 1 VP. The Harbor earned 3 VP during the phase.</div>`,
lab:'store',
cas:[
{q:`You have 3 Corn, 2 Sugar, 1 Coffee left, no Warehouse. What do you keep?`,o:[`The 3 Corn`,`1 barrel, for example the Coffee`,`1 barrel of each type`],a:1,w:`A single barrel in total. Keeping the most valuable one (Coffee) is often the right reflex.`},
{q:`Same situation with an occupied Small Warehouse.`,o:[`2 Sugar + 1 Coffee`,`3 Corn + 2 Sugar`,`3 Corn + 1 Sugar + 1 Coffee`],a:0,w:`One whole type (the 2 Sugar) + 1 barrel (the Coffee). 3 Corn + 1 Coffee also works; two whole types don't.`},
{q:`The 6-hold ship carries 4 Coffee at the end of the phase. What happens to it?`,o:[`It is emptied`,`It keeps its 4 Coffee for the next phase`],a:1,w:`Only full ships are emptied.`}
],
quiz:[
{q:`Occupied Large + Small Warehouse: how many whole types do you keep?`,o:[`2`,`3`,`3, plus 1 barrel`],a:2,w:`3 whole types, plus the barrel everyone keeps.`},
{q:`Can the Wharf ship a type already on a Cargo Ship?`,o:[`Yes`,`No`],a:0,w:`The Chartered Ship accepts any type, but all barrels of that type.`}
]},

{id:'aventurier',part:'The roles',t:'The Adventurer',
lead:`The simplest role: money, and nothing for the others.`,
rules:[
`The player who chooses the Adventurer takes <b>1 coin from the Bank</b> (plus any coins on the card).`,
`There is no action: the other players do nothing.`,
`There are none with 3 players, 1 with 4 players (and with 2), 2 with 5 players.`,
`Its main use is to <b>deny a phase</b> to the others: taking the Adventurer also means not triggering a role that would help them.`
],
cas:[
{q:`The Craftsman, the Captain and the Adventurer (2 coins on it) are left. The others have lots of Goods, you have none.`,o:[`The Craftsman`,`The Captain`,`The Adventurer`],a:2,w:`You take 3 coins and trigger neither production nor shipping for the others. (Another player may still choose one of them.)`}
],
quiz:[
{q:`What do the other players do when the Adventurer is chosen?`,o:[`They each take 1 coin`,`Nothing`],a:1,w:`The Adventurer has no action.`}
]},

/* ======================= BUILDINGS ======================= */
{id:'bat',part:'The Buildings',t:'Common rules and production',
lead:`A few rules apply to all Buildings. Production Buildings turn crops into Goods.`,
rules:[
`Each Building may only be built <b>once per player</b>.`,
`A Building is occupied as soon as a worker is on one of its semicircles. Only occupied Buildings give their function.`,
`The number at the top right gives the <b>end-game VP</b>, whether the Building is occupied or not.`,
`The number in the first semicircle is the <b>cost</b>. Once built, it no longer matters.`,
`Commercial Building functions are <b>optional</b>. Their icon shows the phase in which they work.`,
`You may rearrange your Buildings to make room for a Large one, but never remove one.`,
`Production Buildings: you need the occupied Estate <b>and</b> an occupied semicircle in the Building of the same type. Corn has no Building.`
],
html:`<h2>The six Production Buildings</h2><div class="tw"><table><tr><th>Building</th><th>Good</th><th class="c">Cost</th><th class="c">VP</th><th class="c">Semicircles</th></tr>
${['sfw','lfw','ssm','lsm','tob','cof'].map(i=>{const b=BI[i];return `<tr><td><b>${b.fr}</b></td><td>${G[b.good]}</td><td class="c">${b.cost}</td><td class="c">${b.vp}</td><td class="c">${b.slots}</td></tr>`}).join('')}
</table></div>
<div class="note"><b>Small + Large of the same type?</b> Allowed: they are two different Buildings. A fully occupied Small and Large Fruit Warehouse handle up to 4 Fruit.</div>`,
cas:[
{q:`End of the game: your Harbor (3 VP) has no worker. Does it count?`,o:[`Yes, 3 VP`,`No, it must be occupied`],a:0,w:`Printed VP always count. Only Large Building bonuses require occupation.`},
{q:`You have 2 occupied Coffee Estates and a Coffee Roaster with 1 of 2 semicircles occupied. What do you produce?`,o:[`2 Coffee`,`1 Coffee`],a:1,w:`One worker in the Coffee Roaster = 1 barrel handled.`}
],
quiz:[
{q:`How many semicircles does the Coffee Roaster have?`,o:[`1`,`2`,`3`],a:1,w:`2 semicircles, whereas the Tobacco Storage has 3.`},
{q:`Does an occupied Commercial Building force you to use its function?`,o:[`Yes`,`No`],a:1,w:`It is always optional, which matters most for the Wharf.`}
]},

{id:'petits',part:'The Buildings',t:'Small Commercial Buildings',
lead:`Twelve Buildings that bend the rules in your favor. Click each one to read its function and edge cases.`,
rules:[
`${bn('smk')}: +1 coin when you sell to the Trading House (even a Corn: 1 coin).`,
`${bn('byd')}: in the Planting phase, a Quarry instead of an Estate. It gives the Planter no second Quarry, nor a Quarry through the Hacienda.`,
`${bn('hac')}: in the Planting phase, <b>before</b> your normal action, take the top Estate of a face-down stack and place it at once (no discarding). Then take your normal action.`,
`${bn('swh')}: keep all barrels of 1 type at the end of the Shipment phase, on top of the usual barrel.`,
`${bn('hos')}: when you place an Estate or a Quarry, 1 worker from the supply goes on it (from the Work Register if the supply is empty). With the Hacienda: on either of the two tiles, but only one worker.`,
`${bn('off')}: sell a type already in the Trading House. Still 1 barrel, and nothing if it is full.`,
`${bn('lmk')}: +2 coins per sale, +3 with an occupied Small Market.`,
`${bn('lwh')}: keep 2 whole types (3 with the Small Warehouse), plus the usual barrel.`,
`${bn('fac')}: in the Production phase, by number of types produced: 2 → 1 coin, 3 → 2, 4 → 3, 5 → 5. The number of barrels per type doesn't matter.`,
`${bn('sch')}: when you build, 1 worker from the supply goes on the new Building (from the Register if the supply is empty). Just one, even if the Building has several semicircles.`,
`${bn('har')}: +1 VP each time you load (Wharf included).`,
`${bn('wha')}: once per Shipment phase, at a moment you choose on your turn, all barrels of 1 type onto a Chartered Ship. Optional.`
],
lab:'cards',
cas:[
{q:`You have an occupied Hacienda and Builders Yard. What can you do in the Planting phase?`,o:[`Take 2 Quarries`,`Face-down Estate (Hacienda), then a Quarry as your normal action`,`A Quarry instead of the face-down Estate`],a:1,w:`The Hacienda always gives a face-down Estate. The Builders Yard only applies to the normal action.`},
{q:`Occupied Factory. You produce 3 Corn, 1 Coffee, 2 Fruit. How many coins?`,o:[`2`,`3`,`6`],a:0,w:`3 different types: 2 coins (rulebook example).`},
{q:`Occupied School, you build the Large Fruit Warehouse (3 semicircles).`,o:[`1 free worker on it`,`3 free workers`,`1 worker, placed anywhere`],a:0,w:`A single worker, and only on the new Building.`},
{q:`You have an occupied Small and Large Market and sell 1 Corn without being the Trader.`,o:[`0`,`3`,`4`],a:1,w:`0 + 3.`}
],
quiz:[
{q:`The Hospital and School take their worker…`,o:[`from the Work Register`,`from the supply, and from the Register only if the supply is empty`],a:1,w:`Both work the same way.`},
{q:`How many times can the Wharf be used per Shipment phase?`,o:[`Once`,`On each of the player's turns`],a:0,w:`Once per phase.`}
]},

{id:'grands',part:'The Buildings',t:'Large Buildings',
lead:`Five 10-coin Buildings on 2 spaces. Each is worth 4 VP, plus a bonus if occupied at the end of the game.`,
rules:[
`A Large Building takes 2 adjacent City spaces and counts as <b>a single Building</b>. It is worth <b>4 VP</b>, occupied or not.`,
`If it is <b>occupied at the end of the game</b>, it also scores the bonus below.`,
`${bn('fst')}: +1 VP per Small Production Building (Small Fruit Warehouse, Small Sugar Mill), +2 VP per Large one (Large Fruit Warehouse, Large Sugar Mill, Tobacco Storage, Coffee Roaster), occupied or not.`,
`${bn('res')}: filled Countryside spaces: 1 to 9 → 4 VP, 10 → 5, 11 → 6, 12 → 7.`,
`${bn('frt')}: 1 VP for every 3 workers on your Island board (Portrait included).`,
`${bn('cus')}: 1 VP for every 4 VP in chips earned during the game (not end-game VP).`,
`${bn('cth')}: 1 VP per Commercial Building, small or large, occupied or not, City Hall included. Production Buildings don't count.`
],
html:`<div class="ex"><b>Rulebook examples.</b> Fire Station + Small Fruit Warehouse, Large Fruit Warehouse, Coffee Roaster, Large Sugar Mill: 1 + 2 + 2 + 2 = 7 VP. Residence with 10 filled Countryside spaces: 5 VP. Fortress with 22 workers: 7 VP. Customs House with 30 VP in chips: 7 VP. City Hall with Builders Yard, Hospital, Large Market, Factory, School, Customs House (and itself): 7 VP.</div>`,
lab:'large',
cas:[
{q:`End of the game, your Fortress has no worker. It is worth…`,o:[`0 VP`,`4 VP`,`4 VP + 1 per 3 workers`],a:1,w:`The printed 4 VP always count; the bonus requires it to be occupied.`},
{q:`Occupied City Hall; you also own a Small Market, a Harbor, a Large Sugar Mill and a Customs House. Bonus?`,o:[`3`,`4`,`5`],a:1,w:`Small Market, Harbor, Customs House and City Hall itself: 4. The Large Sugar Mill is a Production Building.`}
],
quiz:[
{q:`Occupied Customs House, 23 VP in chips. Bonus?`,o:[`5`,`6`,`23`],a:0,w:`23 ÷ 4 = 5, rounded down.`},
{q:`Occupied Residence, full Countryside (12). Bonus?`,o:[`4`,`6`,`7`],a:2,w:`12 filled spaces: 7 VP.`}
]},

/* ======================= END OF THE GAME ======================= */
{id:'fin',part:'End of the game',t:'Game end and scoring',
lead:`Three triggers, a round to finish, then scoring.`,
rules:[
`The game ends <b>at the end of the round</b> in which at least one condition is met: the current round is always finished.`,
`Condition 1: at the end of the Recruitment phase, there are <b>not enough workers</b> in the supply to refill the Work Register.`,
`Condition 2: a player has <b>filled all 12 City spaces</b> during the Build phase.`,
`Condition 3: the <b>last VP chip</b> is taken during the Shipment phase. Further VP are kept on paper.`,
`Score: VP chips (and those on paper) + printed VP of all your Buildings + bonuses of your occupied Large Buildings.`,
`Tie: the player with the most coins and barrels (1 point each) wins.`
],
lab:'endsim',
cas:[
{q:`Build phase of round 13: a player places their 12th Building. Two roles are still to be played this round.`,o:[`The game ends at once`,`The remaining roles of the round are played, then scoring`],a:1,w:`The current round is always finished.`},
{q:`Tie at 52 VP: Ana has 4 coins and 1 barrel, Luis 3 coins and 3 barrels.`,o:[`Ana wins`,`Luis wins`,`A perfect tie`],a:1,w:`Ana: 5, Luis: 6.`}
],
quiz:[
{q:`The last VP chip goes during the Shipment phase. Does the game go on?`,o:[`No, it stops at once`,`The round is finished, keeping VP on paper`],a:1,w:`Further VP are kept on paper.`},
{q:`Which VP does the Customs House count?`,o:[`All of them`,`Only the VP chips earned during the game`],a:1,w:`Not the Buildings' VP from final scoring.`}
]},

{id:'deux',part:'End of the game',t:'The two-player game',
lead:`All rules stay the same, with a reduced setup and three roles per player each round.`,
rules:[
`On the board: <b>1</b> of each Commercial Building, <b>2</b> of each Production Building.`,
`Each player: 1 Island board, <b>3 coins</b>, one Estate: Fruit for the Governor, Corn for the other player.`,
`<b>65 VP</b> in chips. Remove 3 tiles of each Countryside type (Corn, Fruit, Sugar, Tobacco, Coffee, Quarry), then flip <b>3</b> Estates.`,
`<b>7 roles</b> (a single Adventurer). Ships with <b>4 and 6</b> holds. Remove <b>2 barrels of each</b> Good.`,
`Work Register: 2 workers; supply: 40 workers.`,
`Each player chooses <b>3 roles per round</b>, alternating: Governor, other player, Governor, other player, and so on.`,
`End of the round: 1 coin on the only remaining role, then the Governor card changes hands. The game ends the same way.`
],
cas:[
{q:`Two players: the Governor took the Builder, the other player the Captain. Who chooses next?`,o:[`The Governor`,`The other player`],a:0,w:`Players alternate until each has 3 roles.`}
],
quiz:[
{q:`With two players, how many coins does the Governor place at the end of the round?`,o:[`1`,`3`],a:0,w:`7 roles, 6 chosen: 1 role left.`},
{q:`With two players, which ships?`,o:[`4 and 6`,`4, 5 and 6`,`5 and 6`],a:0,w:`Only the 4- and 6-hold ships.`}
]},

/* ======================= EXPANSIONS ======================= */
{id:'ext1',part:'Expansions',t:'Expansion I: New Buildings',
lead:`14 new Buildings (green text in the rulebook) and a drafted setup: every game has its own town.`,
rules:[
`Setup: all Production Buildings as usual. The 55 Commercial Buildings (original and new) are placed next to the board.`,
`Starting with the first player, each player in turn picks a Commercial Building and places it on an empty space of the board, until the spaces are filled with these costs: top section 1, 2, 2, 3; second section 4, 5, 5, 6; third section 7, 8, 8, 9; bottom section 10, 10, 10, 10, 10. With more than 2 players, place 2 copies of each small Building chosen.`,
`${bn('can')}: +1 Fruit if you produce some with the Large Fruit Warehouse, +1 Sugar if you produce some with the Large Sugar Mill (not with the small ones).`,
`${bn('lum')}: in the Planting phase, place a face-up Estate <b>face down</b>: it is a Forest, permanent, with no worker needed. In the Build phase, <b>−1 coin for every 2 Forests</b>, no limit, combined with the advantage and Quarries. With a Hacienda: look at the tile before deciding; with a Hospital: the worker goes onto the Portrait.`,
`${bn('bmk')}: only if you are short of money; return 1 worker, 1 barrel and/or 1 VP (1 coin each, 3 at most). You must have no coins left. The worker on the Black Market itself doesn't count.`,
`${bn('sto')}: keep up to 3 additional barrels of any types.`,
`${bn('boh')}: up to 2 "guest" workers placed in the Recruitment phase, moved at the start, middle or end of any other phase to a tile whose function you use at once. They stay there until the next Recruitment phase.`,
`${bn('tpo')}: sell to your own Trading Post instead of the Trading House, even a type already present (the barrel goes back to the supply). No Market bonus, but the Trader advantage applies.`,
`${bn('chu')}: +1 VP when you build in the second or third section, +2 VP for a Large Building. Nothing for the Church itself.`,
`${bn('swf')}: once per Shipment phase, as many barrels as you like, of any types, onto a Chartered Ship: 1 VP per 2 barrels. Can be combined with the Wharf.`,
`${bn('lig')}: +1 coin each time you load (Cargo or Chartered); as Captain, +1 coin at the start of the phase, even without loading.`,
`${bn('dis')}: coins = barrels of your most-produced type (except Corn) − 1. 6 Sugar → 5 coins.`,
`${bn('pub')}: doubled advantage. Planter: Estate or Quarry first, then an Estate (not a Quarry) from those left; Craftsman: 2 bonus barrels. With a Hospital, a worker on the 1st tile only; with a Builders Yard, a Quarry allowed as the 2nd tile.`,
`${bn('asm')}: at the start of the Shipment phase, 1 VP per pair of identical barrels (3 Corn + 2 Fruit + 1 Coffee → 2 VP).`,
`${bn('cat')} (large): sets of 3 identical Countryside tiles (Forests and Quarries included): 1, 3, 6 or 10 VP for 1 to 4 sets. ${bn('mon')} (large): 8 VP, no function, no worker.`
],
cas:[
{q:`Occupied Lumberyard, 4 Forests, 2 occupied Quarries, you are the Builder and want the Large Warehouse (6).`,o:[`1`,`2`,`3`],a:0,w:`6 − 2 (Quarries, second-section cap) − 1 (advantage) − 2 (2 pairs of Forests) = 1. This is the rulebook example.`},
{q:`Occupied Black Market. The Harbor costs 8, you have 6 coins. What do you do?`,o:[`Return 1 barrel and 1 worker, pay 6`,`Return 3 VP`,`Return 2 barrels`],a:0,w:`A worker, a barrel and/or a VP: one of each at most, and you must have no coins left.`}
],
quiz:[
{q:`Lumberyard: does a Forest need to be occupied?`,o:[`Yes`,`No`],a:1,w:`Forests need no worker.`},
{q:`Small Wharf: how many VP for 5 barrels?`,o:[`2`,`3`,`5`],a:0,w:`1 VP per 2 barrels, rounded down.`}
]},

{id:'ext2',part:'Expansions',t:'Expansion II: The Citizens',
lead:`20 citizens join the workers. Each is worth 1 VP and changes the effect of some Buildings (red text in the rulebook).`,
rules:[
`Setup: with the basic Buildings only, place the 8 new Buildings on their spaces. With Expansion I, follow its setup and pick 1 extra Building of each cost (2 to 8) until all spaces are filled.`,
`All 100 workers go into the supply, the 20 citizens next to it. Each time the Work Register is filled (start of the game and end of the Recruitment phase), <b>replace 1 worker with 1 citizen</b> while any remain.`,
`A citizen is used like a worker, and every rule about workers applies to citizens. At the end of the game, <b>each citizen is worth 1 VP</b>.`,
`Running out of workers is <b>no longer</b> an end condition: only a full City and the last VP chip remain.`,
`${bn('zon')}: worker → pay 1 coin for a face-down Estate (Trade phase); citizen → sell one of your Estates for 1 coin.`,
`${bn('cha')}: at the start of the Production phase, worker → 1 coin; citizen → 1 VP.`,
`${bn('par')}: end of the Planting phase, worker → discard 1 Estate or Forest; citizen → 2 VP if you have more empty Countryside spaces than any other player.`,
`${bn('not')}: worker → −1 coin on a Small Building; citizen → −2 coins on a Large one. Never the other way round.`,
`These 4 Buildings work the same with a worker or a citizen: ${bn('pen')} (start of the Shipment phase, 1 barrel returned per citizen, all different types, for 1 VP each), ${bn('vil')} (start of the Recruitment phase, 1 citizen from the supply, otherwise 1 worker; never from the Register), ${bn('tai')} (Production phase: 1 coin per citizen; counts as a Large Production Building for the Fire Station), ${bn('tsq')} (large: +1 VP per citizen, wherever it is).`
],
cas:[
{q:`Notary occupied by a worker, you buy City Hall.`,o:[`−1 coin`,`−2 coins`,`No discount`],a:2,w:`Worker: Small Buildings only. You would need a citizen for Large ones.`},
{q:`Pension Office, 2 citizens on your Island, you have 3 Sugar and 1 Coffee.`,o:[`2 VP (1 Sugar + 1 Coffee)`,`2 VP (2 Sugar)`,`4 VP`],a:0,w:`1 barrel per citizen, all of different types.`}
],
quiz:[
{q:`With the Citizens, does an empty worker supply end the game?`,o:[`Yes`,`No`],a:1,w:`This condition disappears with Expansion II.`},
{q:`How much is a citizen worth at the end with an occupied Town Square?`,o:[`1 VP`,`2 VP`],a:1,w:`1 VP base + 1 VP from the Town Square.`}
]},

{id:'ext3',part:'Expansions',t:'Expansion III: The Smuggler',
lead:`One more role card, which only benefits the player who takes it.`,
rules:[
`Add the Smuggler card to the usual roles. Whoever chooses it also takes the <b>Smuggler player tile</b>, then performs <b>one</b> of the 4 actions. The other players do nothing.`,
`<b>Raid</b>: remove all Goods from one Cargo Ship; keep up to 3 of them, the rest go back to the supply.`,
`<b>Plunder</b>: remove all Goods from the Trading House and earn 1 VP per barrel removed.`,
`<b>Poach</b>: reduce the Work Register to the number of players; keep up to 3 of the removed workers and place them at once on empty semicircles (not on the Portrait).`,
`<b>Capture</b>: take an unused role in front of you, with its coins. If an opponent chooses it this round, take 3 coins from the Bank. If nobody does, play it at the end of the round with its advantage, and the others perform the action.`,
`No coin is placed on the Smuggler if it isn't chosen. The holder of the player tile cannot choose the Smuggler again until someone else has played it.`
],
cas:[
{q:`The Trading House holds 3 barrels. You take the Smuggler and Plunder.`,o:[`3 VP`,`3 coins`,`The 3 barrels`],a:0,w:`1 VP per barrel removed, and the barrels go back to the supply.`}
],
quiz:[
{q:`Poach: where do the captured workers go?`,o:[`Onto the Portrait`,`At once onto empty semicircles of your Island`],a:1,w:`They cannot be stored on the Portrait.`}
]},

{id:'ext4',part:'Expansions',t:'Expansion IV: The Festival',
lead:`Three goals drawn at random, each reserved for the first player to reach it.`,
rules:[
`Estates: draw 1 Estate at random among Corn, Fruit, Sugar, Tobacco and Coffee and place it on the Festival board.`,
`Goods: draw 3 barrels at random from 3 of each type (a type may come up more than once).`,
`Building: draw a 3-VP Building at random (base game: Factory, School, Harbor, Wharf; with Expansions I or II, set up the Buildings first, then draw among those worth 3 VP).`,
`<b>Estate goal</b>: the first player with 3 Estates of that type receives 3 workers from the supply, placed at once on their Island or Portrait.`,
`<b>Production goal</b>: the first player to produce all the Goods on the Festival board in the same turn receives 3 coins.`,
`<b>Building goal</b>: the first player to buy that Building receives 3 VP.`,
`Each goal can only be achieved once, in any order.`
],
quiz:[
{q:`The Estate goal rewards…`,o:[`3 VP`,`3 workers`,`3 coins`],a:1,w:`3 workers from the supply.`}
]}
];
