const R={mat:'<span class="chip c-mat">Materials</span>',pop:'<span class="chip c-pop">Population</span>',prog:'<span class="chip c-prog">Progress</span>',
 reg:'<span class="chip c-reg">Region</span>',tra:'<span class="chip c-tra">Tradition</span>',civ:'<span class="chip c-civ">Civilised</span>',vas:'<span class="chip c-vas">Tributary</span>',
 ren:'<span class="chip c-ren">Fame</span>',ins:'<span class="chip c-ins">Unrest</span>'};
let store={done:{}};
try{store=JSON.parse(localStorage.getItem('imperium-tuto'))||store}catch(e){}
const save=()=>{try{localStorage.setItem('imperium-tuto',JSON.stringify(store))}catch(e){}};

/* ---------- contenu des chapitres ---------- */
const CH=[
{id:'depart',part:'Discover',t:'Before you play',html:`
<p class="lead">Your rulebook is the Imperium: Horizons one, your box is Imperium: Classics. Good news: the core rules are the same, and the Horizons rulebook is the clearest and most up to date. This tutorial teaches you everything that matters with Classics and tells you what to leave aside.</p>
<h2>The goal of the game</h2>
<p>You lead an ancient nation, represented by a deck of cards that grows and transforms over the game. The game ends in one of two ways:</p>
<ul><li><b>Countdown</b> (the normal case): the player with the most victory points wins.</li>
<li><b>Collapse</b> (rarer): the ${R.ins} pile is empty, the game stops at once and the player with the fewest ${R.ins} gagne.</li></ul>
<h2>What applies to your box</h2>
<div class="tw"><table>
<tr><th>You use</th><th>You ignore with Classics alone</th></tr>
<tr><td>The whole flow of play: the three orders, Cleanup, shuffling the discard pile, the Solstice, the end of the game.</td><td>The blue boxes in the rulebook: the Trade Routes expansion, the Goods resource, and the Haggle, Trade and Profit keywords.</td></tr>
<tr><td>The Keywords chapter, which explains every term written on the cards.</td><td>The 14 Horizons nations and their special rules (Cultists, Inuit, Martians, etc.).</td></tr>
<tr><td>The Solo mode against the Bot and the variants (pink boxes and dedicated pages).</td><td>The 49 replacement cards: they are in the Horizons box. Your original cards remain playable.</td></tr>
<tr><td>The 8 Classics nations: Carthaginians, Celts, Greeks, Macedonians, Persians, Romans, Scythians, Vikings.</td><td>Cards marked with expansion icons, and boards and tokens specific to Horizons if your box doesn't contain them.</td></tr>
</table></div>
<h2>How to follow this tutorial</h2>
<p>Six steps, from the most basic to the most advanced. Each one has hands-on exercises and ends with practice scenarios. Your progress is saved in this browser. After step 5, you know how to play.</p>`,
quiz:[{q:'With the Classics box alone, what do you do with the blue boxes in the Horizons rulebook?',o:['I apply all of them','I ignore them: they are for the Trade Routes expansion','I apply them only with two players'],a:1,w:'The blue boxes only concern the Trade Routes expansion, whose components are in the Horizons box.'},
{q:'A game ends with a Collapse. Who wins?',o:['The player with the most points','The player with the fewest Unrest cards','The player who triggered the Collapse'],a:1,w:'Count each player\'s Unrest; the lowest total wins. Points only break a tie.'}]},

{id:'bases',part:'Discover',t:'The five ideas of the game',html:`
<p class="lead">Imperium rests on five simple ideas. Keep them in mind and the rest of the rules almost follows by itself.</p>
<h2>1. Your deck cycles, and it grows</h2>
<p>You start with about ten cards. At the end of each turn you refill your hand. When your deck is empty, you shuffle your discard pile to make a new one, and at that moment a new card from your nation is added: first the cards from your <b>Nation deck</b>, then your <b>Accession</b> card (which turns you from Barbarian to Empire; for the Vikings it is the Zenith, which triggers the end of the game), then your <b>Development</b>cards, which you must pay for. Cycling your deck fast means evolving your nation.</p>
<h2>2. Three resources</h2>
<p>${R.mat}, ${R.pop} and ${R.prog}. They come mostly from your ${R.reg} cards in play. They are either in the common supply, in your reserve, or placed on cards. A resource placed on a card can be neither spent nor moved, and does not count for scoring, unless a card says otherwise. Tokens are unlimited.</p>
<div class="lab"><h3>Hands-on: can I pay?</h3>
<p class="hint">When an effect says Pay, Progress can replace other resources: 1 Progress is worth 1 Population or 2 Materials (no change given). The reverse does not exist. Set your reserve and the cost.</p>
<div class="row">
<label class="f" for="pm">My Materials<input type="number" id="pm" min="0" value="3"></label>
<label class="f" for="pp">My Population<input type="number" id="pp" min="0" value="2"></label>
<label class="f" for="pr">My Progress<input type="number" id="pr" min="0" value="1"></label>
<label class="f" for="pc">Cost to pay<input type="number" id="pc" min="1" value="5"></label>
<label class="f" for="pt">en<select id="pt"><option value="m">Materials</option><option value="p">Population</option><option value="g">Progress</option></select></label>
</div><div class="out" id="payout"></div></div>
<h2>3. Actions and Exhaust tokens</h2>
<p>On your turn you usually have <b>3 Action tokens</b> and <b>5 Exhaust tokens</b>, placed on your State card. An Action is most often used to play a card from your hand. An Exhaust token is placed on a card that stayed in play to use its Exhaust ability, once per turn per card. Everything returns to your State card during your Cleanup.</p>
<h2>4. Gaining new cards</h2>
<p>New cards almost always go into your hand. <b>Acquiring</b> a Market card also gives you the ${R.ins} card tucked under it. <b>Innovate</b> gives you the card without the Unrest. Other effects (Recover, Find) fetch cards from elsewhere.</p>
<h2>5. Fame and Glory</h2>
<p>The ${R.ren} cards are worth the most points. You mostly get them with the <b>Glory</b>card, which forces you to Abandon three Regions in play. Replaying those Regions costs Actions: each Glory is paid for in tempo.</p>
<h2>A player's areas</h2>
<div class="lab"><h3>Hands-on: what is each area for?</h3><p class="hint">Click an area.</p>
<div class="zones" id="zones"></div><div class="out" id="zout">Choose an area to read its role.</div></div>`,
quiz:[{q:'You must Pay 4 Materials. You have 2 Materials and 1 Progress. Can you pay?',o:['No, 2 Materials are missing','Yes: 2 Materials + 1 Progress worth 2 Materials','Yes, but only if I also have Population'],a:1,w:'For a Materials cost, each Progress spent counts as 2 Materials.'},
{q:'Two Progress tokens are placed on one of your cards in play. Can you spend them?',o:['Yes, freely','No: resources placed on cards can\'t be used to pay','Yes, but only during the Solstice'],a:1,w:'Only resources in your reserve can be used to Pay or be Moved.'},
{q:'When is a card from your nation added to your deck?',o:['At the start of each turn','When I shuffle my discard pile to rebuild my deck','When I buy a card from the Market'],a:1,w:'Shuffling the discard pile brings in a Nation card, then the Accession, then the Developments.'}]},

{id:'cartes',part:'Discover',t:'Reading a card',html:`
<p class="lead">Everything a card does is written on it. You just need to know where to look. Click the numbered dots.</p>
<div class="lab"><h3>Hands-on: anatomy of a card</h3>
<div class="anat"><div class="card" id="card">
<div class="band">Card name</div><div class="art"></div>
<div class="txt"><b>Exhaust:</b> Pay 1 Population to gain 2 Materials.<br><i>Development cost: 3 Materials</i></div>
</div>
<div><div class="out" id="cout">Thirteen elements to discover.</div></div></div></div>
<h2>The categories</h2>
<div class="tw"><table>
<tr><td>${R.reg}</td><td>Your nation's territories. A Region only produces while it is in play in front of you.</td></tr>
<tr><td>${R.tra}</td><td>Ancient customs and know-how.</td></tr>
<tr><td>${R.civ}</td><td>More modern customs and techniques.</td></tr>
<tr><td>${R.vas}</td><td>Peoples who have sworn loyalty to you.</td></tr>
<tr><td>${R.ren}</td><td>Memorable feats, often worth 10 points or more.</td></tr>
<tr><td>${R.ins}</td><td>Internal disorder. Useless: they clog your deck.</td></tr>
<tr><td><b>Power</b></td><td>The single card that defines your nation. History is stored under it.</td></tr>
</table></div>
<h2>The four kinds of victory points</h2>
<ul><li><b>Fixed value</b>: the card is worth the number shown.</li>
<li><b>Conditional value</b> (icon with a question mark): the number shown if the condition is met, otherwise zero.</li>
<li><b>Variable value</b> (icon with a star): depends on what you own, with a <b>cap of 10 points per card</b>, including your Power card.</li>
<li><b>Negative value</b>: the card takes points away from you.</li></ul>
<div class="note"><b>State icons.</b> A card marked Barbarian can only be played from your hand if your State card shows its Barbarian side; same logic for Empire. But you can Acquire or Innovate it whatever your State, and if it is already in play you can always use its Exhaust ability.</div>`,
quiz:[{q:'According to its text, a variable-value card should earn you 14 points. How many do you score?',o:['14','10','7'],a:1,w:'A variable-points card never scores more than 10 points.'},
{q:'You are an Empire and a Barbarian card stayed in your play area. Can you use its Exhaust ability?',o:['Yes','No, it is blocked','Only once per game'],a:0,w:'The State icon limits playing the card from your hand, not using a card already in play.'}]},

{id:'mise-en-place',part:'Discover',t:'Setup',html:`
<p class="lead">Two stages: each player prepares their nation, then the common Market is set up. Tick the steps as you go.</p>
<div class="row"><b>Number of players:</b><span class="tabs" id="np" style="margin:0"></span></div>
<div class="out" id="npout"></div>
<h2>Each player</h2><ol class="steps" id="st1"></ol>
<h2>The Market and the common decks</h2><ol class="steps" id="st2"></ol>
<div class="note"><b>The Market, from left to right.</b> Two slots fed by the Main deck, then one Civilised slot, one Tradition slot and one Region slot. It always holds five cards: any emptied slot is refilled at once.</div>`,
quiz:[{q:'Under which Market cards is an Unrest card tucked?',o:['Under all of them','Under all except Regions','Only under the two Main deck cards'],a:1,w:'Regions never have Unrest under them; every other Market card has one.'},
{q:'Where does your Accession card go?',o:['In your starting hand','At the very bottom of your Nation deck, face up','In the Development area'],a:1,w:'The Nation deck is placed crosswise on top of the Accession, which will therefore be the last card to come out.'}]},

{id:'tour',part:'Play',t:'Your turn: three orders',html:`
<p class="lead">On your turn you announce a single order out of three, resolve it, then do your Cleanup. The player to the left of the Solstice token starts the round and play goes clockwise.</p>
<div class="lab"><h3>Hands-on: the three orders</h3><div class="tabs" id="ordtabs"></div><div id="ordout"></div></div>
<h2>Actions and Exhaust abilities in practice</h2>
<ul><li><b>Take an Action</b>: remove an Action token from your State card. No token left, no Action, except a Free action.</li>
<li><b>Play a card</b>: resolve its text as much as possible, then put it in your discard pile, unless it says to go elsewhere. Permanent cards (icon in the header) stay in play in front of you.</li>
<li>A card whose text starts with <b>Exhaust</b>, <b>Passive</b> or <b>Solstice</b> does nothing when you put it down: it is a permanent card whose effect will be used later.</li>
<li><b>Exhaust</b>: move an Exhaust token from your State card onto a card in play (or onto your Power card) that doesn't have one yet, then resolve the text after the word Exhaust. If the ability has a cost you can't pay, you can't use it.</li>
<li>Some Exhaust abilities respond to an event ("when…"). They resolve right after the sentence that triggered them, before the next sentence.</li>
<li><b>Free action</b>: the card is played without an Action token, even if you have none left. The same card can only be played this way once per turn. Free does not mean without cost: costs written on the card are still due.</li>
<li><b>Gain an Action</b>: take an Action token from the supply, even if you go above three. You go back to three at Cleanup.</li></ul>
<div class="lab"><h3>Hands-on: token counter</h3><p class="hint">Simulate an Activation turn and see what each move uses up.</p>
<p>Actions: <span class="tok" id="tkA"></span> &nbsp; Exhausted: <span class="tok" id="tkE"></span></p>
<div class="row" id="tkbtn"></div><div class="out" id="tkout">You start with 3 Actions and 5 Exhaust tokens.</div></div>`,
quiz:[{q:'Your hand only holds Unrest and unplayable cards. You want a good Tradition card visible in the Market, without taking the Unrest under it. Which order?',o:['Activation','Research','Pacify'],a:1,w:'Research: you discard your hand and Innovate a card, without the Unrest.'},
{q:'During a Research order, can you use an Exhaust ability?',o:['Yes, just one','No, neither Action nor Exhaust ability','Yes, if it is free'],a:1,w:'Research and Pacify replace the whole turn. Only Passive abilities stay active.'},
{q:'You have used your 3 Actions. A card lets you play another one "as a Free action". Is that possible?',o:['No, you need a token','Yes, without an Action token','Yes, by spending an Exhaust token'],a:1,w:'A Free action uses no token and remains possible with no Action token available.'}]},

{id:'resoudre',part:'Play',t:'Resolving a card',html:`
<p class="lead">Cards are read literally. Nine principles settle almost every case.</p>
<ol>
<li>Each sentence resolves separately, in order.</li>
<li>Each sentence resolves <b>as much as possible</b>. Whatever follows the word "may" is optional; everything else is mandatory.</li>
<li>If you can't resolve any part of the effect, you can't play the card.</li>
<li>If the text doesn't say where the card goes next, it goes to your discard pile (except permanent cards).</li>
<li>Whatever comes before the word "to" is a <b>cost</b>: "Do X to gain Y". You may pay a cost even if the result is uncertain or impossible.</li>
<li>Paying or Moving resources is always a cost, even without "to".</li>
<li>If a mandatory cost can't be paid in full, you can neither play the card nor trigger the effect.</li>
<li>The cost is paid in full before the rest of the effect.</li>
<li>If you pay a cost, you must resolve the result, as much as possible.</li>
</ol>
<div class="note"><b>Choisir.</b> When a card offers options separated by OR, you resolve only one. A full sentence placed after the list applies whatever you chose. If the chosen option requires a payment you can't make, you must choose another.</div>
<div class="note"><b>All players.</b> "All players" or "each player" includes you. "All other players" does not.</div>
<h2>Attacks</h2>
<p>A card marked with the Attack icon hits all other players, as much as possible. Some cards let a player ignore all or part of an Attack aimed at them.</p>`,
quiz:[{q:'"Pay 2 Materials to Draw 2 cards." You only have 1 Material and no Progress. Can you play the card?',o:['Yes, I pay 1 and draw 1','No: a mandatory cost must be payable in full','Yes, the cost is optional'],a:1,w:'A cost is never half-paid. If it is mandatory and unpayable, the card is unplayable.'},
{q:'"Gain 2 Population. You may Discard a card to Draw a card." What is mandatory?',o:['Everything','Only gaining 2 Population','Only the discard'],a:1,w:'The text after "may" is optional; the first sentence is mandatory.'},
{q:'A card says "All other players Recover an Unrest card". Are you affected?',o:['Yes','No'],a:1,w:'"All other players" excludes you.'}]},

{id:'marche',part:'Play',t:'The Market: Acquire and Innovate',html:`
<p class="lead">Two verbs to take a card, and one big difference: the Unrest.</p>
<div class="grid2">
<div class="nat"><h3>Acquiring</h3><p>Choose a visible Market card of the allowed category. Gain the resources placed on it. Take the card into your hand, <b>with the Unrest card tucked under it</b>. The Market is refilled at once, and an Unrest from the pile is tucked under the new card, unless it is a Region.</p></div>
<div class="nat"><h3>Innovate</h3><p>Announce a category, then choose: either a visible Market card (you gain its resources, the Unrest under it <b>goes back to the pile</b>), or the top face-down card of the Region, Tradition or Civilised deck. "When you Acquire" effects do not trigger.</p></div>
</div>
<h3>Special cases of Innovate</h3>
<ul><li>Tributaries have no deck of their own. To Innovate one blind, reveal cards from the Main deck one by one until the first Tributary, take it, then shuffle the other revealed cards back into the Main deck.</li>
<li>Same procedure for a category whose deck is empty. As long as the Region, Tradition or Civilised deck has cards, you may not search the Main deck for that category.</li>
<li>If the search finds nothing, you gain 2 Progress instead.</li>
<li>With the Research order, you Innovate a Region, a Tradition, a Civilised or a Tributary, never a Fame card.</li></ul>
<h3>Replacing a taken card</h3>
<p>A card taken from one of the first two slots is replaced from the Main deck. The others are replaced from their slot's deck, or from the Main deck if that one is empty. So a card sometimes ends up in a slot that doesn't match its category. If an effect makes you Acquire several cards, finish each acquisition, replacement included, before the next: you may take the card that just arrived.</p>
<div class="lab"><h3>Hands-on: a small Market</h3><p class="hint">Select a card, then choose a verb. Watch the Unrest pile: it is deliberately small here so you can see the Collapse coming.</p>
<div class="mk" id="mk"></div>
<div class="row" style="margin-top:10px">
<button type="button" id="mAcq" class="pri">Acquiring</button><button type="button" id="mInn">Innovate this card</button><button type="button" id="mBlind">Innovate blind (same category)</button><button type="button" id="mProg">Place 1 Progress (Cleanup)</button><button type="button" id="mReset">Restart</button></div>
<div class="row" style="margin-top:10px"><div class="pile"><b id="mPile">0</b><span>Unrest pile</span></div><div class="pile"><b id="mHandU">0</b><span>Unrest taken</span></div><div class="pile"><b id="mHandC">0</b><span>Cards gained</span></div><div class="pile"><b id="mRes">0</b><span>Progress gained</span></div></div>
<div class="out" id="mout">Select a Market card.</div></div>
<h2>Exile and Exchange</h2>
<p><b>Exile</b> a Market card sends it to the Exile pile, next to the Market. The Unrest under it goes back to its pile, and the card is replaced normally. A card carrying tokens can't be Exiled. Some cards let you Acquire or Innovate from the Exile pile: if you Acquire a card other than a Region there, you must also Recover an Unrest.</p>
<p><b>Exchange</b> replaces a Market card with another one from elsewhere (your hand, for example). Tokens stay on the slot, the old Unrest goes back to the pile and a new one is tucked under the incoming card, except a Region. If the exchange requires "the same category", both cards must share a category icon.</p>`,
quiz:[{q:'You Acquire a Tradition carrying 2 Progress with an Unrest under it. What do you get?',o:['Only the card','The card and the 2 Progress','The card, the 2 Progress and the Unrest'],a:2,w:'Acquiring gives you everything: resources to your reserve, card and Unrest to your hand.'},
{q:'You Innovate the same card. What happens to the Unrest?',o:['I take it','It goes back to the Unrest pile','It goes to the Exile pile'],a:1,w:'That is the whole point of Innovating: the card without the Unrest.'},
{q:'The Civilised deck still has cards. Can you search the Main deck to Innovate a Civilised card?',o:['Yes','No, not until the Civilised deck is empty'],a:1,w:'Searching the Main deck is only allowed for Tributaries or for a category whose deck is empty.'}]},

{id:'deck',part:'Play',t:'Cleanup and reshuffling the deck',html:`
<p class="lead">It is the engine of the game, and the part of the rules people come back to most often at first.</p>
<h2>Cleanup, in four steps</h2>
<ol><li><b>Add 1 Progress from the supply onto a Market card</b> of your choice. From the supply, not from your reserve. It is the most common thing to forget.</li>
<li><b>Take back your tokens</b>: 3 Actions and 5 Exhaust tokens back on your State card.</li>
<li><b>You may Discard</b> as many cards from your hand as you like.</li>
<li><b>Draw</b> up to your hand limit (5 by default). If you already have 5 or more cards, you don't draw, and you don't have to go back down to 5.</li></ol>
<p>As soon as you have finished step 1, the next player can start their turn while you finish.</p>
<div class="note"><b>Rulebook tip.</b> Discard generously. The faster your deck cycles, the sooner your Nation cards, your Accession and your Developments arrive.</div>
<h2>Shuffling your discard pile</h2>
<p>When you must Draw and your deck is empty, you shuffle immediately, even during someone else's turn. Before shuffling, you may add <b>one card, only once per turn</b>, and you need an available Exhaust token for this, which serves as a marker:</p>
<ol><li><b>There is a card left in your Nation deck</b> (Accession included): put the top one into your discard pile and place an Exhaust token on the Nation deck. If it is the Accession, flip your State card: you are now an Empire. Vikings: their Zenith flips nothing, it triggers the end of the game.</li>
<li><b>The Nation deck is empty</b>: you may Pay the cost of a card in your Development area, whichever you want, to put it into your discard pile. Then place an Exhaust token on the area. If you can't pay for any card, you don't Develop.</li>
<li>Shuffle your discard pile: it is your new deck.</li>
<li>Resolve any "when you shuffle" effects.</li>
<li>Keep Drawing up to your hand limit.</li></ol>
<p>During Cleanup you always have a token available, since you just took them back. Mid-turn however, if all your Exhaust tokens are used or a marker is already placed, you shuffle without adding anything.</p>
<p><b>"Draw, if possible"</b>: this kind of effect never causes a shuffle. Empty deck, no draw.<br><b>"Draw up to X"</b>, on the other hand, is a normal draw: empty deck, you shuffle and keep going until you have X cards in hand. Both together ("Draw up to 3 cards if possible"): you stop when the deck is empty.</p>
<div class="lab"><h3>Hands-on: cycle your deck</h3><p class="hint">Illustrative example: the quantities vary by nation. Each click plays a full turn where you discard your whole hand.</p>
<div class="row"><div class="pile"><b id="dDeck"></b><span>Deck</span></div><div class="pile"><b id="dHand"></b><span>Hand</span></div><div class="pile"><b id="dDisc"></b><span>Discard</span></div><div class="pile"><b id="dNat"></b><span>Nation deck</span></div><div class="pile"><b id="dDev"></b><span>Developments</span></div><div class="pile"><b id="dState" style="font-size:18px;line-height:38px"></b><span>State</span></div></div>
<div class="row" style="margin-top:10px"><button type="button" class="pri" id="dTurn">Play a turn</button><button type="button" id="dAcq">Play a turn acquiring a card</button><label><input type="checkbox" id="dPay" checked> I can pay for my Developments</label><button type="button" id="dReset">Restart</button></div>
<ol class="log" id="dLog"></ol></div>
<p>Notice two things: each acquired card comes with an Unrest and lengthens the cycle; and Developing your last card is what triggers the Countdown.</p>`,
quiz:[{q:'Where does the Progress token you add to the Market during Cleanup come from?',o:['From my reserve','From the supply','From a neighbouring Market card'],a:1,w:'Always from the supply. Your reserve isn\'t touched.'},
{q:'Your deck runs out mid-turn, and your 5 Exhaust tokens are already on cards. What happens?',o:['I can\'t draw','I shuffle my discard pile without adding a Nation card','I add a Nation card anyway'],a:1,w:'With no Exhaust token available to serve as a marker, nothing is added. The shuffle still happens.'},
{q:'Your Accession card joins your discard pile. What is the immediate consequence?',o:['The game ends','I flip my State card: I become an Empire','I draw a Fame card'],a:1,w:'The Accession flips your State card from Barbarian to Empire (the Vikings are an exception, see the Nations chapter).'}]},

{id:'solstice',part:'Play',t:'The Solstice',html:`
<p class="lead">The Solstice closes each round. When the last player has finished their turn, everyone resolves their Solstice effects.</p>
<ul><li>Each player resolves <b>all</b> the Solstice effects in their play area, on their Power card and, if relevant, on their State card.</li>
<li>They are mandatory, resolved as much as possible, unless they say "may".</li>
<li>Everyone resolves at the same time. If order matters (often when a Collapse looms), resolve in turn order.</li>
<li>When you have several effects, you decide their order.</li>
<li>A Solstice effect that concerns "each other player" is resolved by each of them during their own Solstice, at the moment they choose among their effects.</li>
<li>An effect marked <b>End of Solstice</b> (a keyword introduced with Horizons) resolves after all your other Solstice effects.</li>
<li><b>During the Solstice, no Action and no Exhaust ability.</b> Passive abilities stay active.</li></ul>
<p>Then a new round starts with the player to the left of the Solstice token.</p>
<div class="note"><b>The three kinds of lasting effects.</b> <b>Exhaust</b>: you decide, during your Activation order, by placing a token. <b>Passive</b>: always active while the card is in play, including during Research, Pacify, the Solstice and the Countdown. <b>Solstice</b>: automatic at the end of the round.</div>`,
quiz:[{q:'During the Solstice, you\'d like to Exhaust a Region to gain Materials. Possible?',o:['Yes','No'],a:1,w:'No Action and no Exhaust ability during the Solstice.'},
{q:'You have three Solstice effects. Who decides their order?',o:['The first player','Me','The order the cards were played in'],a:1,w:'When several of your effects resolve at the same time, you choose their order.'}]},

{id:'gloire',part:'Play',t:'Unrest, Regions, History and Glory',html:`
<p class="lead">Four mechanics that give the game its tension: what clogs you, what produces, what you put into History, and what scores big.</p>
<h2>Unrest</h2>
<p>They have no useful effect and dilute your deck. If the common pile runs out, it is a Collapse. Three ways to get rid of them:</p>
<ul><li><b>Play it as an Action</b>: spend an Action token, then pay 3 ${R.mat}, or 1 ${R.pop}, or discard 2 cards. It goes back to the pile.</li>
<li><b>The Pacify order</b>: it takes your whole turn, but you return all the Unrest in your hand without paying anything.</li>
<li><b>A card effect</b> that says "Return an Unrest card": you then ignore the Unrest text, so no cost.</li></ul>
<p>Recovering an Unrest means taking it from the common pile. Taking the last one triggers the Collapse.</p>
<h2>Regions and cards in play</h2>
<ul><li>A permanent card stays in your play area until an effect removes it.</li>
<li><b>Abandon</b> a Region: it goes to your discard pile. <b>Recall</b> a Region: it returns to your hand. Only Regions can be Abandoned or Recalled.</li>
<li>In both cases, resources placed on it return to your reserve, and cards Reserved under it follow the Region. An Exhaust token placed on it doesn't return to your State card before the end of the turn.</li>
<li><b>Reserve</b>: slide a card from your hand, face up, under the card in play that carries this keyword. A Reserved card is no longer in play: you can't play it, discard it or use its abilities. It still counts for scoring. It is a good way to slim down your deck.</li></ul>
<h2>History</h2>
<p>Putting a card into your History means sliding it under your Power card. It leaves play for good, but its points still count. You may look at your own History, not other players'. Many strong cards are single-use and go into History after being played.</p>
<h2>Glory and Fame</h2>
<p>The <b>Glory</b> card makes you Abandon three Regions in play to gain a ${R.ren}card. So you need three Regions in front of you, and replaying them will cost you Actions.</p>
<h3>The Fame deck and King of Kings</h3>
<ul><li>The King of Kings card always stays at the very bottom of the Fame deck. While face-down cards remain, Looking at, gaining or Drawing a Fame card only concerns those.</li>
<li>A card put back into this deck goes on top, without shuffling.</li>
<li>When King of Kings is the only card left, any effect that makes you gain or Draw a Fame card makes you <b>resolve King of Kings</b> instead. The first time in the game, it is flipped to side B.</li>
<li>Each player can only resolve it once per game, whichever side.</li>
<li>When the card ends up flipped face down, the Countdown is triggered.</li></ul>`,
quiz:[{q:'You play an Unrest from your hand to get rid of it. What does it cost you?',o:['Nothing','An Action, plus 3 Materials or 1 Population or 2 discarded cards','Only 2 discarded cards'],a:1,w:'You need the Action to play the card, then the cost written on it.'},
{q:'You Abandon a Region carrying 2 Materials with a Reserved card under it. What happens to them?',o:['Everything is lost','The Materials go to my reserve, the Reserved card is discarded with the Region','Everything stays in play'],a:1,w:'The resources return to the reserve and the Reserved card shares the Region\'s fate.'},
{q:'Does a card in your History count for scoring?',o:['Yes','No'],a:0,w:'It is no longer in play, but its victory points count.'}]},

{id:'fin',part:'Play',t:'End of the game and scoring',html:`
<p class="lead">Two possible endings, with two ways of naming the winner.</p>
<div class="grid2">
<div class="nat"><h3>Countdown</h3><p>Triggered when:</p><ul><li>the Main deck is empty;</li><li>a player Develops the last card in their Development area, or meets their nation's specific condition;</li><li>the King of Kings card is flipped face down;</li><li>an effect says it triggers the end of the game.</li></ul><p>Finish the current round, Solstice included, then play <b>one last full round</b>, Solstice included. Then count.</p></div>
<div class="nat"><h3>Collapse</h3><p>Triggered the moment <b>the Unrest pile is empty</b>, even if a Countdown was already under way.</p><p>The game stops immediately, the Action in progress is interrupted. Everyone counts their Unrest in hand, play area, deck, discard pile and History. The lowest total wins. Tie: break it with Countdown points.</p></div>
</div>
<h2>Counting points</h2>
<p>Leave the cards where they are: some are worth different points depending on where they are. The same icon or token can count for several cards. Each ${R.prog} token in your reserve is worth 1 point. The highest total wins; in case of a tie, the victory is shared.</p>
<div class="lab"><h3>Hands-on: does it count or not?</h3><p class="hint">For each line, decide whether it counts towards your Countdown score, then check.</p>
<div id="cnt"></div><div class="row" style="margin-top:10px"><button type="button" class="pri" id="cntCheck">Check</button></div><div class="out" id="cntOut"></div></div>
<div class="lab"><h3>Hands-on: score sheet</h3>
<div class="row"><label class="f" for="s1">Points from fixed-value cards<input type="number" id="s1" value="24"></label><label class="f" for="s2">Points from variable cards (10 max each)<input type="number" id="s2" value="13"></label><label class="f" for="s3">Negative points<input type="number" id="s3" value="2" min="0"></label><label class="f" for="s4">Progress in reserve<input type="number" id="s4" value="6" min="0"></label></div>
<div class="out" id="sOut"></div></div>`,
quiz:[{q:'The Countdown has just been triggered in the middle of a round. How many turns do you have left at most?',o:['None','The end of this round, then one full round','Three rounds'],a:1,w:'Finish the current round with its Solstice, then one final round with its Solstice.'},
{q:'A Countdown is under way, and the Unrest pile runs out. What happens?',o:['The Countdown finishes normally','Collapse: the game stops at once','The Unrest is reshuffled'],a:1,w:'The Collapse takes priority, even over a Countdown already triggered.'}]},

{id:'mots-cles',part:'Go further',t:'All keywords',html:`
<p class="lead">On the cards, each verb has a precise meaning. Look up a term during the game.</p>
<div class="row"><label for="gs">Filter</label><input type="search" id="gs" placeholder="Recall, Find, Passive…"><label><input type="checkbox" id="gh"> Also show terms specific to Horizons</label></div>
<dl class="glo" id="glo"></dl>`,
quiz:[{q:'"Find" a card: in what order do you search?',o:['Deck, discard pile, hand','Hand, discard pile, deck, Nation deck','Nation deck first'],a:1,w:'Hand, then discard pile, then deck, then Nation deck (never the Accession). Stop as soon as you find it, and shuffle the deck or the Nation deck if you searched them.'},
{q:'"Draw 2 cards, if possible." Your deck holds 1 card. What do you do?',o:['I draw 1 card, shuffle, draw the 2nd','I draw 1 card and stop','I draw nothing'],a:1,w:'"If possible" forbids shuffling the discard pile.'}]},

{id:'nations',part:'Go further',t:'The eight Classics nations',html:`
<p class="lead">Each deck plays differently. The stars show complexity according to the rulebook: start with a one-star nation.</p>
<div class="grid2" id="nats"></div>
<h2>Notes on Classics cards</h2>
<ul><li><b>Sacred Way</b>: you can't use it to add your Accession card to your deck.</li>
<li><b>Sumerians</b>: its Unrest-returning effect applies when a Countdown is triggered, from any area counted for scoring. It doesn't trigger if the game ends in a Collapse, and doesn't prevent it.</li></ul>`,
quiz:[{q:'Which Viking quirk ends the game?',o:['Reaching the Empire State','Adding their Zenith card to their discard pile','Developing their last card'],a:1,w:'The Vikings never become an Empire and have no Developments. The card at the bottom of their Nation deck, the Zenith, triggers the end of the game.'}]},

{id:'variantes',part:'Go further',t:'Variants',html:`
<p class="lead">Four settings to adjust the game, and a solo learning mode.</p>
<h2>Training mode (alone, no opponent)</h2>
<p>Ideal for a first try or to discover a nation.</p>
<ol><li>Set up as for 2 players.</li><li>Exile the top 15 cards of the Main deck.</li><li>Put 12 Progress tokens near the Market: it is your hourglass.</li><li>Play your turns normally.</li>
<li>At Cleanup, the Progress placed on the Market comes from this hourglass. Then you may Exile a Market card, to simulate an opponent helping themselves.</li><li>Resolve your Solstice effects after each turn.</li><li>The game lasts 12 turns, or stops if an effect triggers the end.</li></ol>
<p>Rulebook benchmarks: 50 points, you master the basics; 90 points is a feat.</p>
<h2>Pacifist variant</h2>
<p>During setup, set aside the common cards marked with the Attack icon. Once the Market is laid out, shuffle them into the Main deck. Attacks thus arrive later.</p>
<h2>Precious cards variant</h2>
<p>At Cleanup, you can no longer Discard cards from your hand. Managing Unrest becomes much tighter.</p>
<h2>Quick game variant</h2>
<p>About 15 minutes less per player.</p>
<ul><li>Once the Market is set up, Exile the top 10 cards of the Main deck.</li><li>Each player discards the top 2 cards of their Nation deck: they are therefore part of their deck from the first shuffle.</li>
<li>When you add your Accession to your discard pile, choose one of your Development cards and remove it from the game.</li><li>At the Countdown, finish the current round and its Solstice, with no extra round.</li></ul>
<h2>Quick setup variant</h2>
<p>For experienced players: shuffle all the Market cards together instead of sorting them, form the decks with the right number of cards and flip one card from each. Some nations will struggle to find the categories they need.</p>`,
quiz:[{q:'In Training mode, when does the game normally end?',o:['When the Main deck is empty','After 12 turns, when the 12-Progress hourglass runs out','After 20 turns'],a:1,w:'One Progress from the hourglass goes to the Market at each Cleanup: 12 tokens, 12 turns.'}]},

{id:'solo',part:'Go further',t:'Playing solo against the Bot',html:`
<p class="lead">The Bot is an automated opponent. It doesn't read the text of its cards: the table on its State card tells it what to do.</p>
<div class="note"><b>Raccourci.</b> The Play solo tab applies everything below for you: you just follow its instructions.</div>
<h2>Setup</h2>
<ol><li>Set up your nation and the Market as for 2 players.</li><li>Place the slot markers 1 to 5 under the five Market cards (see difficulty levels).</li>
<li>Choose the Bot's nation. Its starting Unrest cards join the common pile. Its Power card is only used to hold its History.</li>
<li>Build its <b>Dynasty deck</b>: the Developments sorted by value, strongest on top; on top of them the Accession face up; on top of that the shuffled Nation cards, face down.</li>
<li>Shuffle its starting cards and place one face down under each marker. The rest forms the Bot deck.</li><li>Place its State card on the Barbarian side. The Bot uses neither Action nor Exhaust tokens.</li></ol>
<h2>A round</h2>
<p>You play your turn normally, then the Bot plays its turn, then you resolve your Solstice effects. The Bot ignores the Solstice.</p>
<h3>The Bot's turn</h3>
<ol><li>Roll the die and place it on the card in the matching slot: it won't be resolved this turn. If no slot matches, all cards are resolved.</li>
<li>Resolve the other cards in ascending slot order. For each: flip it, look in the table for the <b>first line from the top</b> matching its name, type or category, and apply it as much as possible. Bold text concerns you, the rest concerns the Bot.</li>
<li>If nothing in the line can be resolved, move to the next matching line. As soon as part of the effect resolves, that card is done: one effect per card.</li>
<li>The card then goes to the Bot's discard pile, unless stated otherwise. The first line always concerns Unrest: usually, back to the pile.</li></ol>
<h3>Its Cleanup</h3>
<ol><li>Add 1 Progress on the Market card above the unresolved card. Nothing if the die showed 6. Against the Carthaginians, it is 2 Materials instead.</li>
<li>Slide the unresolved card to slot 1, face down, then fill the other slots from the Bot deck.</li>
<li>Deck empty when filling: the top card of the Dynasty deck goes to its discard pile, which is shuffled to rebuild the deck. When it is the Accession, flip its State card and use the new table.</li></ol>
<h2>How it chooses</h2>
<ul><li><b>Acquire or Innovate</b>: the Market card worth the most points; if tied, the one carrying the most tokens; then the lowest slot number. Each Progress placed on a card makes it worth 1 more point in its eyes.</li>
<li>Cards it gains go <b>on top of its deck</b>: the card first, the Unrest on top.</li>
<li>If it must Innovate with no valid card, it takes the top card of the relevant deck; if that is impossible, it gains 2 Progress.</li>
<li><b>Exile</b>: the lowest slot with no token. <b>Abandon / Recall</b>: its most recently played Region (to its discard pile, or on top of its deck).</li>
<li>It only shuffles its discard pile during its Cleanup.</li>
<li>It ignores your effects that would make it Discard or Return an Unrest. Any effect of its that gives you an Unrest, steals from you, makes you discard, Abandon or Recall counts as an Attack: your protections work.</li>
<li>For the Bot, a variable-points card is worth 5, and a conditional card is worth its maximum.</li></ul>
<h2>End of the game</h2>
<p>Same triggers as in multiplayer, plus two: the Dynasty deck is exhausted, or the Bot gains King of Kings. <b>If the game ends in a Collapse, you lose.</b> At the Countdown, the Bot scores 1 point per Progress, 1 point per group of 10 Materials and Population combined, and its card points (hand, play, deck, discard, History; not the Dynasty deck or its Power card). You need strictly more points than it.</p>
<h2>Five difficulty levels</h2>
<div class="tw"><table><tr><th>Level</th><th>Setting</th></tr>
<tr><td>Chieftain</td><td>4 slots only; a 5 or 6 on the die covers nothing. Recommended to start.</td></tr>
<tr><td>Warlord</td><td>Like Chieftain, and at the end of its turn the top card of the Bot deck is discarded.</td></tr>
<tr><td>Imperator</td><td>The standard rules, 5 slots.</td></tr>
<tr><td>Sovereign</td><td>The Bot starts with 3 Materials, 2 Population, 1 Progress and scores 1 point per group of 5 resources.</td></tr>
<tr><td>Overlord</td><td>Like Sovereign, with a 6th slot: 5 effects every turn.</td></tr></table></div>
<p><b>Campaign</b>: keep the same nation and go up one level with each win. Five wins to win, four losses to lose. After a win, add to your starting deck a common card gained during the game, or remove a card from your starting deck. After a loss, the next game starts with double resources.</p>
<div class="note"><b>With your box.</b> Use the Bot State cards provided in Classics for your eight nations. The Resolve keyword only appears on Horizons State cards.</div>`,
quiz:[{q:'A Bot card matches two lines of its table. Which one do you apply?',o:['Both','The higher one, and the next only if nothing in the first can be resolved','The one you choose'],a:1,w:'One effect per card: the highest line of which at least part can be resolved.'},
{q:'In solo, the Unrest pile runs out. Result?',o:['Compare Unrest','I lose automatically','I win automatically'],a:1,w:'Against the Bot, a Collapse is always a loss for you.'}]},

{id:'bilan',part:'Go further',t:'Review and reference',html:`
<p class="lead">Ten questions to check it all holds together, then the reminders to keep near the table.</p>
<div id="finalscore" class="out"></div>
<h2>Reference</h2>
<ol><li>1 Progress pays for 1 Population or 2 Materials.</li><li>The same card can only be played once per turn as a Free action.</li><li>Each player resolves King of Kings only once per game.</li><li>No Action and no Exhaust ability during the Solstice.</li><li>A variable-points card caps at 10, Power card included.</li><li>Solstice effects resolve simultaneously.</li><li>Innovate from the Main deck: only for a Tributary or a category whose deck is empty.</li><li>The Market always holds 5 cards, refilled at once.</li><li>Acquiring a card other than a Region from the Exile pile also makes you Recover an Unrest.</li><li>An icon Considered as another one is no longer the original icon, until the end of the turn.</li><li>At the end of your turn: 1 Progress from the supply onto a Market card.</li><li>Only Regions can be Recalled or Abandoned.</li></ol>
<h2>The turn in one line</h2>
<p>Choose Activation, Research or Pacify. Then Cleanup: Progress to the Market, tokens back, free discard, draw to 5. End of round: Solstice.</p>`,
quiz:[
{q:'How many tokens do you usually have at the start of your turn?',o:['3 Actions and 5 Exhaust','5 Actions and 3 Exhaust','4 of each'],a:0,w:'3 Action tokens and 5 Exhaust tokens on your State card.'},
{q:'Which of these is not one of the three orders?',o:['Activation','Pacify','Expansion'],a:2,w:'The three orders are Activation, Research and Pacify.'},
{q:'You Acquire a Region from the Market. Do you get an Unrest?',o:['Yes','No, Regions have none under them'],a:1,w:'No Unrest is ever tucked under a Region.'},
{q:'What is your default hand limit?',o:['4','5','7'],a:1,w:'Five cards, unless an effect says otherwise.'},
{q:'Your Nation deck is empty and you shuffle your discard pile. What can you add?',o:['Nothing','A Development card, by paying its cost','A Market card'],a:1,w:'You choose a card from your Development area and pay its cost.'},
{q:'What does the Glory card do?',o:['It gives 3 Regions','It makes you Abandon 3 Regions in play to gain a Fame card','It removes 3 Unrest'],a:1,w:'Three Regions in play go to the discard pile in exchange for a Fame card.'},
{q:'Is a card Reserved under a Region "in play"?',o:['Yes','No, but it counts for scoring'],a:1,w:'It is no longer in your play area: no ability, no discard possible, but its points count.'},
{q:'Do cards left in your Nation deck at the end count for scoring?',o:['Yes','No'],a:1,w:'Neither the Nation deck nor the Development area count.'},
{q:'When does the Solstice happen?',o:['At the start of each turn','At the end of each round, once everyone has played','Once per game'],a:1,w:'It is the very last step of each round.'},
{q:'How much is a Progress token in your reserve worth at the Countdown?',o:['0 points','1 point','2 points'],a:1,w:'1 point per Progress in reserve. Those placed on cards don\'t count.'}]}
];
