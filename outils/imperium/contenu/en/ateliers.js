/* ---------- données des ateliers ---------- */
const ZONES=[['Deck','Your personal draw pile, face down. You draw your hand from it. Empty when you need to draw: you shuffle your discard pile.'],
['Hand','5 cards by default. Gained cards almost always arrive here.'],
['Discard','Face up. Played and discarded cards go here, as well as Abandoned Regions.'],
['Play area','Your permanent cards, especially your Regions. They stay here until an effect removes them.'],
['Nation deck','Your nation\'s cards, face down, placed crosswise on the Accession. One card comes out each time you shuffle your discard pile.'],
['Accession','Last card of the Nation deck. When it joins your discard pile, your State card flips: Barbarian becomes Empire. Vikings: it is the Zenith, which triggers the end of the game.'],
['Developments','Face-up cards you add one by one, paying their cost, once the Nation deck is empty. Developing the last one triggers the Countdown.'],
['State card','Barbarian or Empire. It holds your available Action and Exhaust tokens and determines which cards you can play from your hand.'],
['Power card','Your nation\'s own power. It can often be Exhausted like a card in play.'],
['History','The cards put into History under your Power card. Out of play, but their points count.'],
['Reserve','Your available Materials, Population and Progress tokens. Start: 3 Materials, 2 Population, 1 Progress.'],
['Reserved cards','Cards slid under a card in play. Unusable, but counted for scoring.']];
const ANAT=[[8,6,'Header icon','Marks a permanent card, which stays in play once placed, or an Attack, which hits the other players.'],
[66,6,'Name','The card\'s title. Some cards refer to each other by name.'],
[90,6,'Banner','Its colour matches the category. It is used to sort the cards during setup. Cards with no category have a grey banner.'],
[88,22,'State icon','Barbarian or Empire. You only play the card from your hand if your State card matches.'],
[8,30,'Type icons','City, River, Ocean, Fertile land, etc. No effect of their own, but other cards refer to them.'],
[7,55,'Effect','What the card does and when. Keywords stand out.'],
[7,64,'Development cost','On Development cards: what you pay to add it to your deck.'],
[6,93,'Nation colour','Coloured bottom-left corner: the card belongs to a nation. No colour: common card.'],
[18,84,'Starting location','Icon telling where the card goes at setup: in play, Nation deck, Accession, Development or Unrest pile. No icon: starting deck.'],
[36,84,'Player count limit','A card marked 3+ isn\'t used with two players or solo; a card marked 4 is only used with four.'],
[40,93,'Number','The card\'s reference. The first digit gives the box: 1 for Classics.'],
[60,84,'Category','Region, Tradition, Civilised, Tributary, Fame or Unrest. Determines what you can Acquire or Innovate.'],
[90,93,'Victory points','Fixed, conditional, variable (10 at most) or negative value.']];
const ST1=['Choose a nation and take all its cards (look at the colour of the bottom-left corner).','Place your Power card in front of you. If it has two sides, use side B to start.','Place your State card Barbarian side up.','Place 3 Action tokens and 5 Exhaust tokens on your State card.','Line up your Development cards face up: this is your Development area.','Place your Accession card face up. Shuffle your Nation cards and place them on top, face down, crosswise.','Take 3 Materials, 2 Population and 1 Progress: this is your reserve.','Set aside your nation\'s starting Unrest cards (Celts, Vikings): they will join the common pile. Remove the 3+ or 4 cards that don\'t match the player count.','Shuffle the remaining cards: this is your deck. Leave room on the right for your discard pile and play area.','Draw 5 cards.'];
const ST2=n=>['Form the supply: all tokens within reach.','Sort the common cards by the colour of their banner.',n<4?(n===3?'Remove the common cards marked 4.':'Remove the common cards marked 3+ and 4.'):'With four players, all common cards are used.','Place all the Unrest cards face up in a pile, with those set aside by the players. Leave room next to it for the Exile pile.','Place King of Kings side A up. Shuffle the other Fame cards and place on top of it, crosswise, a face-down pile of '+(n+4)+' cards. The surplus goes back in the box unseen.','Form three face-down decks of '+(n+4)+' cards each: Region, Tradition, Civilised.','Shuffle together all the Tributaries and the rest of the Regions, Traditions and Civilised cards: this is the Main deck, placed horizontally.','Flip one card from each of the Region, Tradition and Civilised decks, and two cards from the Main deck: the five Market cards.','Tuck an Unrest under each Market card that isn\'t a Region.','Place 1 Progress on each white-banner Market card (the Civilised cards).','Pick the first player at random. Place the Solstice token between them and the player on their right.'];
const ORD=[['Activation','The order for almost all your turns.','<ul><li>You take Actions and use Exhaust abilities, in whatever order and combination you like.</li><li>You stop when you can\'t or don\'t want to do anything more.</li><li>Then Cleanup.</li></ul><p><b>Choose it when</b> you have cards to play or useful Exhaust abilities.</p>'],
['Research','One chosen card, without Unrest.','<ol><li>Put your whole hand into your discard pile.</li><li>Innovate a Region, a Tradition, a Civilised or a Tributary. Not a Fame card.</li><li>Then Cleanup.</li></ol><p>No Action, no Exhaust ability. Passive abilities stay active.</p><p><b>Choose it when</b> your hand is weak and a Market card really tempts you, or you want to avoid an Unrest. In Classics, this order was called Innovation.</p>'],
['Pacify','The big clean-up.','<ol><li>Return as many Unrest cards from your hand to the pile as you like, without paying anything.</li><li>Then Cleanup.</li></ol><p>No Action, no Exhaust ability. Passive abilities can trigger.</p><p><b>Choose it when</b> your hand is drowning in Unrest, or to push back a Collapse.</p>']];
const CNT=[['The cards in your hand',1],['The cards in your play area',1],['The cards in your deck',1],['The cards in your discard pile',1],['The cards in your History',1],['Your Power card',1],['The cards Reserved under your cards in play',1],['The cards still in your Nation deck',0],['The undeveloped cards in your Development area',0],['The Progress tokens in your reserve',1],['The Progress tokens placed on your cards',0]];
const NATS=[['Romans',1,'Warlike','Fast expansion: conquer Regions to play Glory and gain Fame. Your Legions extend conquests once you are an Empire. Bring the City of Rome into play and evolve it. A few extra cities help your deck cycle.',''],
['Persians',1,'Warlike','Subjugate the other nations: pile up Tributaries and expand your territories. Once an Empire, attack with the Battering Ram and spread Unrest with Persian Gold, or bet on Satrap to gain Actions, after securing your Materials with Windmills.',''],
['Macedonians',1,'Rather peaceful','The expansion nation: pile up Regions and keep them in play. Conquer stays useful once you are an Empire thanks to Alexander and his Cavalry. Play Glory early and often, in synergy with the Phalanxes, and Reserve cards under your surplus Regions.',''],
['Carthaginians',2,'Warlike','Control the Market and amass Materials with Caravans and Merchant Ships. Once an Empire: Elephants led by Hannibal, or Monopoly to send Unrest and unwanted cards to others. Look for oceans.','Special rule: at Cleanup, you add Materials onto a Market card instead of Progress. The amount depends on your Power card.'],
['Celts',2,'Ruthless','Aggressive play: acquire cards and hand out Unrest with your Druids. Without Prosperity, your resources come from Cattle Raid and Cerridwen\'s Cauldron. You aim to lengthen the game to Develop your five cards.','Special rule: the side A effect of your Power card hinders others, but it isn\'t an Attack: no protection against it.'],
['Scythians',2,'Warlike','Nomads: expand your territory and exploit your Regions with Tents and Mounted Archers. A light and very fast deck thanks to Tamga, but poor in points: watch for variable-points cards in the Market.',''],
['Greeks',3,'Warlike','Cities and technology. Colonists and Greek Mercenaries launch your expansion. Once an Empire, Science helps you progress and the Olympic Games help you manage. Lighthouse manipulates the Exile pile: remember what you Exile.',''],
['Vikings',3,'Ruthless','Your Nation deck offers you free cards, in an order you don\'t control. Lean on Gothja, and Reserve cards with your Regions and Sagas to tame your deck.','Special rules: you never become an Empire, you have no Development area and no History (a card to put into History is Discarded). The card at the bottom of your Nation deck is your Zenith: when it joins your discard pile, the end of the game is triggered and your State card doesn\'t flip.']];
const GLO=[['Abandon','Put a Region in play into your discard pile. Resources on it return to your reserve; a card Reserved under it is discarded too. Some effects let you Abandon only a Reserved card.'],
['Acquiring','Take a visible Market card of the stated category, with its resources and the Unrest under it. The Market is refilled at once.'],
['Action (gain, spend)','Gain: take an Action token from the supply, even beyond three. Spend: remove the number of tokens required, otherwise the effect is impossible.'],
['Free action','The card is played without an Action token. At most once per turn for the same card. Costs written on the card are still due.'],
['Add a resource','Take the resource from the supply and place it in the stated area or on the stated card.'],
['Attack','The effect hits all other players, as much as possible. Some cards let you ignore it.'],
['Barbarian / Empire','The sides of your State card. A card marked with a State can only be played from your hand if you are in that State. "If you are Barbarian / Empire": the effect or option only exists in that State.'],
['Cards in play','A permanent card stays in play until an effect removes it. Its resources then return to your reserve; an Exhaust token placed on it only returns at the end of the turn.'],
['Choose','Resolve only one of the options separated by OR. A full sentence after the list applies in every case.'],
['Consider','Treat one icon as another until the end of the turn. The original icon no longer counts meanwhile. The effect always ends before the Solstice or the Countdown.'],
['Discard','Put the card into your discard pile.'],
['Move a resource','Move the resource from its owner\'s reserve to the stated place. No conversion possible. Resources already placed on cards are not moved.'],
['Develop','Pay the cost of a card in your Development area, your choice, and put it into your discard pile. Through a card effect, this is possible even if a marker is already on the area, and without placing one. The Vikings never Develop.'],
['Give a card','Choose a card from your hand; an opponent takes it into their hand.'],
['Exchange','Replace a Market card with another one. Tokens stay in place, the Unrest is renewed (except Region), and the removed card goes where the other one came from.'],
['Exhaust','During your Activation order, place an Exhaust token on the card to resolve its effect. Once per turn per card. Putting a card down doesn\'t trigger its Exhaust ability.'],
['Exile','Send the card to the Exile pile. From the Market: the Unrest goes back to its pile, the card is replaced. Impossible if the card carries tokens.'],
['Gaining resources from Regions','Ability that triggers when a Region in play with the stated icon is used to gain you that resource, by its own effect or another card\'s such as Prosperity.'],
['History','The cards put into History under your Power card. Out of play, but counted for scoring. Only you may look at them. The Vikings have none.'],
['Innovate','Announce a category, then take either a visible Market card (without the Unrest, which goes back to the pile) or the top face-down card of the matching deck. Tributary or empty deck: search the Main deck; nothing found: 2 Progress.'],
['Passive','Effect permanently active while the card is in play: during all orders, the Solstice and the Countdown.'],
['Pay','Return the required tokens from your reserve to the supply. 1 Progress can replace 1 Population or 2 Materials. No other conversion.'],
['Nation deck','Your Nation cards face down on the Accession. Whatever happens, the Accession stays at the very bottom and is never shuffled with them.'],
['Draw','Take cards from your deck into your hand. Empty deck: shuffle your discard pile and continue. You always draw the top card of the pile.'],
['Draw, if possible','Like Draw, but never shuffling the discard pile: empty deck, you stop.'],
['Place on your deck','Place the card (from your hand, unless stated otherwise) face down on your deck.'],
['Recall','Take a Region in play back into your hand, with the cards Reserved under it. The resources return to your reserve. If you replay it this turn, you can Exhaust it again with another token.'],
['Recover','Take the stated card into your hand, or into the specified area. In a face-up area, you choose. Recovering an Unrest: from the common pile; the last one triggers the Collapse.'],
['Look at','Secretly look at the stated cards, then put them back, in the order of your choice. In the Fame deck, ignore King of Kings; in the Nation deck, ignore the Accession, unless it is the only card.'],
['Return a card','Put an Unrest back into the common pile. Playing it from your hand: an Action and its cost. Through another card\'s effect: no cost.'],
['Return a token','Take back an Exhaust token placed on one of your cards and put it back on your State card. You can reuse it this turn.'],
['Reserve','Slide a card from your hand, face up, under the relevant card in play. It is no longer in play, but counts for scoring and shares the fate of the card holding it.'],
['Remove a resource','Return the stated resource to the supply. No conversion.'],
['Solstice','Effect resolved automatically at the end of each round.'],
['All players / all other players','The first includes you, the second doesn\'t.'],
['Find','Look for the card in your hand, then your discard pile, then your deck, then your Nation deck (except the Accession). Stop as soon as it is found and reveal it. Shuffle the deck or the Nation deck if you searched them.'],
['Steal resources','Take the stated tokens from the targeted players\' reserves, as much as possible, without conversion.'],
['Goods','Fourth resource, tied to the Trade Routes expansion.',1],
['Haggle, Trade, Profit','Keywords from the Trade Routes expansion. Without the expansion, ignore any mention of Haggle.',1],
['End of Solstice','Effect resolved after all your other Solstice effects. Found on Horizons cards.',1]];

/* ---------- rendu général ---------- */
const CHM=Object.fromEntries(CH.map(c=>[c.id,c]));
const STEPS=[{id:'decouvrir',t:'Discover the game',ch:['depart','bases','cartes']},{id:'installer',t:'Set up a game',ch:['mise-en-place']},
 {id:'tour',t:'Playing your turn',ch:['tour','resoudre'],guided:true},{id:'marche',t:'The Market and your deck',ch:['marche','deck']},
 {id:'manche',t:'Round, Glory and end of the game',ch:['solstice','gloire','fin']},{id:'plus',t:'Variants and solo',ch:['variantes','solo']}];
const SC={
decouvrir:[
 {s:'You must Pay 4 Materials. Your reserve: 2 Materials, 3 Population, 1 Progress.',q:'How do you pay this cost?',a:1,o:[
  ['2 Materials and 2 Population','Population never replaces Materials. Only Progress converts.'],
  ['2 Materials and 1 Progress','1 Progress is worth 2 Materials when you pay in Materials: that adds up.'],
  ['I can\'t pay','Yes you can: your Progress covers the 2 missing Materials.']]},
 {s:'Your State card shows Barbarian. You have a card marked Empire in hand. In the Market, another Empire card tempts you.',q:'What can you do this turn?',a:1,o:[
  ['Play the Empire card from my hand','Impossible: a card marked Empire can only be played from your hand if your State card shows Empire.'],
  ['Acquire the Market\'s Empire card for later','Acquiring or Innovating is allowed whatever your State. You\'ll play it after your Accession.'],
  ['Neither','The State icon only limits playing the card from your hand, not obtaining it.']]},
 {s:'Final Countdown. One of your star cards says "1 VP per Region". You own 13 Regions.',q:'How many points does this card earn you?',a:1,o:[
  ['13 points','A variable-points card is capped.'],
  ['10 points','The cap is 10 points per star card, Power card included.'],
  ['0 points','The card does score points, just capped at 10.']]}],
installer:[
 {s:'You refill the Market. The card flipped into the right-hand slot is a Region.',q:'Do you tuck an Unrest under it?',a:1,o:[
  ['Yes, as under every card','Every Market card gets one, except Regions.'],
  ['No','There is never an Unrest under a Region. That is what makes Regions low-risk to acquire.']]},
 {s:'You are setting up a solo game, so with the quantities of a 2-player game.',q:'How many face-down Fame cards do you place on King of Kings?',a:0,o:[
  ['6','With 2 players or solo: 6 Fame cards, and 6 cards in each of the Region, Tradition and Civilised decks.'],
  ['8','8 is the quantity for 4 players.'],
  ['All of them','The surplus goes back in the box unseen: you don\'t know which Fame cards are missing.']]},
 {s:'Two Unrest cards from your nation have no icon in the bottom-left corner.',q:'Where do they go at setup?',a:0,o:[
  ['In my starting deck','A card with no starting icon is part of the initial deck. Your nation therefore starts with some trouble.'],
  ['In the common Unrest pile','Only Unrest cards carrying the pile icon go there.'],
  ['In the box','Only cards marked 3+ or 4 are set aside when the player count doesn\'t match.']]}],
tour:[
 {s:'Your hand: four Unrest and an unplayable Glory card (you only have one Region in play). Your reserve is empty.',q:'Which order do you announce?',a:2,o:[
  ['Activation','You could play an Unrest by discarding two other cards, but you would only return one and the others would come back later.'],
  ['Research','You would gain a card, but your four Unrest would go to the discard pile and come back at the next shuffle.'],
  ['Pacify','You return all four Unrest to the pile without paying anything. This is exactly the situation this order is for.']]},
 {s:'You have no Action token left. A Region in play says "Exhaust: gain 2 Materials" and carries no token. You have 2 Exhaust tokens left. You have a card marked Free action in hand.',q:'What can you still do?',a:2,o:[
  ['Nothing more','Exhaust abilities and Free actions don\'t use Action tokens.'],
  ['Only exhaust the Region','That is possible, but so is the Free action.'],
  ['Exhaust the Region and play the Free action','Exhausting costs an Exhaust token, and a Free action can be played even without an Action token.']]},
 {s:'The last card in your hand says: "Discard 1 card to gain 2 Population. You MAY acquire a Region."',q:'Can you play it?',a:1,o:[
  ['Yes, I gain 2 Population','The cost comes before the result, and you have no other card to discard.'],
  ['No','What comes before "to" is a mandatory cost. With no other card to discard, the card is unplayable.'],
  ['Yes, only to acquire the Region','The first sentence is mandatory and its cost unpayable: the whole card can\'t be played.']]}],
marche:[
 {s:'There is only one card left in the Unrest pile. A Market Tradition interests you; an Unrest is tucked under it.',q:'How do you take it?',a:1,o:[
  ['Acquire it','You take its Unrest, then the replacement card receives the last Unrest from the pile: immediate Collapse.'],
  ['Innovate it','The Unrest goes back to the pile, which goes back up to two cards. The replacement card takes one: one is left, the game goes on.'],
  ['It doesn\'t matter','The difference is huge: Acquiring empties the pile, Innovating refills it.']]},
 {s:'Cleanup. Your hand: 2 Unrest and 3 good cards you couldn\'t play. Your deck holds 1 card, your Nation deck 2.',q:'What do you discard to evolve your nation as fast as possible?',a:1,o:[
  ['Nothing','With 5 cards in hand you don\'t draw: your deck doesn\'t cycle and no Nation card comes in.'],
  ['My whole hand','You draw 5 cards, your deck runs out, and a Nation card joins your discard pile before the shuffle. That is the rulebook\'s advice.'],
  ['Only the Unrest','That is legal and you also trigger the shuffle, but the Unrest will come back: you keep three cards at the price of a slower cycle.']]},
 {s:'Mid-turn, an effect makes you Draw 2 cards. Your deck is empty and your 5 Exhaust tokens are already placed on cards.',q:'What happens?',a:1,o:[
  ['I add a Nation card, then shuffle','You need an available Exhaust token to serve as a marker: you have none left.'],
  ['I shuffle my discard pile without adding anything, then draw','The shuffle still happens, but with no Nation or Development card.'],
  ['I don\'t draw','Only an "if possible" effect stops you. Here you must shuffle and draw.']]}],
manche:[
 {s:'You play Glory: you abandon three Regions. Two of them hold a Reserved card.',q:'What happens to the Reserved cards?',a:1,o:[
  ['They stay in play','A Reserved card always shares the fate of the card holding it.'],
  ['They go to the discard pile with their Regions','So they will come back into your deck: think about it before playing Glory.'],
  ['They return to my hand','That would be the case if the Regions were Recalled, not Abandoned.']]},
 {s:'Your opponent triggers the Countdown during their turn. You play after them and you are last in the round.',q:'How many turns do you have left?',a:1,o:[
  ['Just one','You first finish the current round, then an extra round follows.'],
  ['Two','Your turn this round, the Solstice, then one final full round with its Solstice.'],
  ['None','The Countdown doesn\'t stop the game on the spot, unlike the Collapse.']]},
 {s:'Solstice. One of your cards says "Solstice: you MAY discard 1 card to gain 1 Population". You would also like to exhaust a Region.',q:'What can you do?',a:1,o:[
  ['Both','No Exhaust ability during the Solstice.'],
  ['Only the Solstice effect, if I want','The effect is optional thanks to "may". Exhaust abilities will wait for your next Activation order.'],
  ['Nothing','The Solstice effect is still available.']]}],
plus:[
 {s:'The Bot\'s turn. The revealed card matches two lines of its table. The first asks it to spend 3 Population to innovate; it only has one.',q:'What do you do?',a:2,o:[
  ['It spends its remaining Population','A cost is never half-paid.'],
  ['Nothing: the card goes to the discard pile','First look for another applicable line.'],
  ['I move to the next matching line','If nothing in the line can be resolved, go down to the next line that matches the card.']]},
 {s:'Solo game. There is one Unrest left in the pile. A Market card would earn you lots of points, with an Unrest under it.',q:'Do you acquire it?',a:1,o:[
  ['Yes, points first','The replacement card would take the last Unrest: Collapse, and in solo that is an automatic loss.'],
  ['No','Against the Bot, a Collapse makes you lose whatever the Unrest split. Return some Unrest first, or Innovate.']]}]};
function scen(box,list){list.forEach(q=>{const d=document.createElement('div');d.className='q';
  d.innerHTML=`<div class="sit">${q.s}</div><p>${q.q}</p><div class="opts">${q.o.map((o,i)=>`<button type="button" data-i="${i}">${o[0]}</button>`).join('')}</div><div class="why"></div>`;box.append(d);
  $$('button',d).forEach(b=>b.onclick=()=>{const i=+b.dataset.i;$$('button',d).forEach(x=>x.classList.remove('right','wrong'));b.classList.add(i===q.a?'right':'wrong');
    $('.why',d).innerHTML=(i===q.a?'<b>Good choice.</b> ':'<b>Not the best choice.</b> ')+q.o[i][1]})})}
function build(){
  const toc=$('#toc'),main=$('#main');
  STEPS.forEach((s,i)=>{
    const li=document.createElement('li');li.innerHTML=`<a href="#apprendre" data-id="${s.id}"><span class="n">${i+1}</span><span>${s.t}</span><span class="tick"></span></a>`;toc.append(li);
    const el=document.createElement('section');el.className='ch';el.id='s-'+s.id;
    el.innerHTML=`<div class="eyebrow">Step ${i+1} of ${STEPS.length}</div><h1>${s.t}</h1>`+s.ch.map(id=>(s.ch.length>1?`<h2 class="chh">${CHM[id].t}</h2>`:'')+CHM[id].html).join('')
      +(s.guided?'<h2 class="chh">A full guided turn</h2><div class="lab" id="guided"></div>':'')
      +`<div class="quiz"><h2>What do you do?</h2><div class="qs"></div></div><div class="endnav">${i?`<button type="button" data-go="${STEPS[i-1].id}">Previous step</button>`:'<span></span>'}
      ${i<STEPS.length-1?`<button type="button" class="pri" data-done="${s.id}" data-go="${STEPS[i+1].id}">Got it, next step</button>`:`<button type="button" class="pri" data-done="${s.id}">Finish the tutorial</button>`}</div>`;
    main.append(el);scen($('.qs',el),SC[s.id])});
  const b=CHM.bilan.html;
  $('#aide').innerHTML='<h1>Reference</h1>'+b.slice(b.indexOf('<h2>Reference</h2>')).replace('<h2>Reference</h2>','<h2>The twelve reminders</h2>')
    +'<h2>All keywords</h2>'+CHM['mots-cles'].html+'<h2>The eight Classics nations</h2>'+CHM.nations.html;
  toc.addEventListener('click',e=>{const a=e.target.closest('a');if(!a)return;e.preventDefault();go(a.dataset.id)});
  document.addEventListener('click',e=>{const b=e.target.closest('[data-go],[data-done]');if(!b)return;
    if(b.dataset.done){store.done[b.dataset.done]=1;save();progress()}
    if(b.dataset.go)go(b.dataset.go)});
  $('#menu').onclick=()=>{const o=$('#nav').classList.toggle('open');$('#menu').textContent=o?'Hide contents':'Show contents'};
}
function go(id){store.step=id;save();show();window.scrollTo(0,0)}
function show(){
  let id=store.step;if(!STEPS.some(s=>s.id===id))id=STEPS[0].id;
  $$('section.ch').forEach(s=>s.classList.toggle('on',s.id==='s-'+id));
  $$('#toc a').forEach(a=>a.classList.toggle('on',a.dataset.id===id));
  $('#nav').classList.remove('open');
}
function progress(){
  const n=STEPS.filter(s=>store.done[s.id]).length;
  $('#bar').style.width=(100*n/STEPS.length)+'%';
  $('#barlabel').textContent=n+' step'+(n>1?'s':'')+' of '+STEPS.length+' completed'+(n>1?'s':'');
  $$('#toc a').forEach(a=>$('.tick',a).textContent=store.done[a.dataset.id]?'fait':'');
}
function labGuided(){
  const box=$('#guided');let G;
  const TXT=[['Tents (in play)','Exhaust: when you play a Region, exhaust this card to gain 1 Population.'],['Carpathians (Region)','Gain 1 Population. You MAY reserve 1 card.'],
   ['Conquer','Choose: pay 2 Population to acquire a Region or a Tributary, OR pay 3 Population to innovate a Region or Tributary.'],
   ['Progress','Choose: pay 3 Materials to acquire a Tradition or a Civilised, OR pay 5 Materials to innovate a Tradition or Civilised.'],
   ['Unrest','Choose: pay 1 Population OR discard 2 cards OR pay 3 Materials. If you do, return this card to the Unrest pile.']];
  const init=()=>{G={ph:'order',a:3,e:5,mat:3,pop:2,prog:1,tent:false,win:false,play:['Tents'],deck:2,good:0,bad:0,sub:null,civ:1,cls:'',
    hand:[{n:'Carpathians',k:'reg'},{n:'Conquer',k:'conq'},{n:'Progress',k:'prog'},{n:'Unrest',k:'ins'},{n:'Unrest',k:'ins'}],
    msg:'You play the Scythians, still Barbarians. The Tents are already in play. Start by announcing your order.'};draw()};
  const ok=t=>{G.good++;G.msg=t;G.cls='good'},ko=t=>{G.bad++;G.msg=t;G.cls='warn'},info=t=>{G.msg=t;G.cls=''};
  const payPop=n=>{if(G.pop+G.prog<n)return false;const u=Math.min(G.pop,n);G.pop-=u;G.prog-=n-u;return true};
  const payMat=n=>{if(G.mat+2*G.prog<n)return false;const u=Math.min(G.mat,n);G.mat-=u;G.prog-=Math.ceil((n-u)/2);return true};
  const drop=k=>{const i=G.hand.findIndex(c=>c.k===k);if(i>=0)G.hand.splice(i,1)};
  const spend=k=>{G.a--;drop(k);G.win=false;G.sub=null};
  function play(i){const c=G.hand[i];
    if(c.k==='vas'||c.k==='com'){info('Keep this card for a later turn: its effect depends on the actual card.');return}
    if(G.a<1){ko('You have no Action token left: you can\'t play a card from your hand, except a Free action. You still have Exhaust abilities, or Cleanup.');return}
    if(c.k==='reg'){G.a--;G.hand.splice(i,1);G.play.push(c.n);G.pop++;G.win=true;ok(c.n+' enters play and gives you 1 Population. You may reserve a card under it.');
      G.sub=[['Reserve an Unrest under it',()=>{if(!G.hand.some(x=>x.k==='ins')){info('You have no Unrest in hand.')}else{drop('ins');info('The Unrest is slid under the Region: it will never come back to your hand. It still counts in your score, but your deck is lighter.')}G.sub=null}],
        ['Reserve nothing',()=>{info('Nothing is reserved. Time to think about the Tents.');G.sub=null}]];return}
    if(c.k==='conq'){info('Conquer: which option do you choose?');G.sub=[
      ['Pay 2 Population: acquire the Market Region',()=>{if(!payPop(2)){ko('You need 2 Population. Progress can replace it, 1 for 1.');G.sub=null;return}spend('conq');G.hand.push({n:'New Region',k:'reg'});ok('You pay 2 Population and take the Region into your hand. No Unrest: there is never one under a Region. Conquer goes to the discard pile and the Market is refilled at once.')}],
      ['Pay 2 Population: acquire the Tributary',()=>{if(!payPop(2)){ko('You need 2 Population. Progress can replace it, 1 for 1.');G.sub=null;return}spend('conq');G.hand.push({n:'Tributary',k:'vas'},{n:'Unrest',k:'ins'});ok('You pay 2 Population. The Tributary comes into your hand with the Unrest tucked under it: that is the price of Acquiring.')}],
      ['Pay 3 Population: innovate a Region',()=>{if(!payPop(3)){ko('You need 3 Population, Progress included.');G.sub=null;return}spend('conq');G.hand.push({n:'New Region',k:'reg'});ok('You pay 3 Population and take a Region. Innovating avoids the Unrest, but a Region never has one: here, Acquiring would have cost 1 less Population for the same result.')}],
      ['Cancel',()=>{G.sub=null;info('Conquer stays in your hand.')}]];return}
    if(c.k==='prog'){info('Progress: which option do you choose?');const m='You are short on Materials. Reminder: 1 Progress is worth 2 Materials, Population doesn\'t count.';G.sub=[
      ['Pay 3 Materials: acquire the Tradition',()=>{if(!payMat(3)){ko(m);G.sub=null;return}spend('prog');G.hand.push({n:'Tradition',k:'com'},{n:'Unrest',k:'ins'});ok('You pay 3 Materials. The Tradition comes into your hand with its Unrest.')}],
      ['Pay 3 Materials: acquire the Civilised card',()=>{if(!payMat(3)){ko(m);G.sub=null;return}spend('prog');G.prog+=G.civ;const n=G.civ;G.civ=0;G.hand.push({n:'Civilised',k:'com'},{n:'Unrest',k:'ins'});ok('You pay 3 Materials. You also gain '+n+' Progress placed on the card, and the Civilised card comes with its Unrest.')}],
      ['Pay 5 Materials: innovate a Tradition',()=>{if(!payMat(5)){ko(m);G.sub=null;return}spend('prog');G.hand.push({n:'Tradition',k:'com'});ok('You pay 5 Materials, counting Progress as 2 Materials each. The Tradition comes without the Unrest, which goes back to the pile.')}],
      ['Cancel',()=>{G.sub=null;info('Progress stays in your hand.')}]];return}
    if(c.k==='ins'){info('Unrest: how do you pay to return it?');const done=t=>{G.a--;G.hand.splice(G.hand.indexOf(c),1);G.win=false;G.sub=null;ok(t+' The Unrest goes back to the common pile. It cost you an Action.')};G.sub=[
      ['Pay 1 Population',()=>{if(!payPop(1)){ko('You have neither Population nor Progress.');G.sub=null;return}done('You pay 1 Population.')}],
      ['Pay 3 Materials',()=>{if(!payMat(3)){ko('You need 3 Materials, Progress included.');G.sub=null;return}done('You pay 3 Materials.')}],
      ['Discard 2 other cards',()=>{if(G.hand.length<3){ko('You need two other cards in hand to discard.');G.sub=null;return}const o=G.hand.filter(x=>x!==c).slice(-2);o.forEach(x=>G.hand.splice(G.hand.indexOf(x),1));done('You discard '+o.map(x=>x.n).join(' and ')+'.')}],
      ['Cancel',()=>{G.sub=null;info('The Unrest stays in your hand.')}]]}}
  function tentes(){if(G.tent)ko('The Tents already carry an Exhaust token: only once per turn per card.');
    else if(G.e<1)ko('No Exhaust token left.');
    else if(!G.win)ko('The Tents respond to an event: "when you play a Region". They are exhausted right after playing a Region, not before, nor after doing something else.');
    else{G.e--;G.tent=true;G.pop++;G.win=false;ok('You place an Exhaust token on the Tents: 1 more Population. The ability responded to the Region you just played.')}}
  function draw(){
    box.innerHTML=`<p class="hint">A real turn with the Scythians' starting cards. Each move is approved or corrected.</p>
    <div class="row gstat"><span>Actions: <b>${G.a}</b></span><span>Exhaust tokens: <b>${G.e}</b></span><span><b>${G.mat}</b> ${R.mat}</span><span><b>${G.pop}</b> ${R.pop}</span><span><b>${G.prog}</b> ${R.prog}</span><span>Deck: <b>${G.deck}</b> cards</span></div>
    <p><b>In play:</b> ${G.play.join(', ')}${G.tent?' (Tents exhausted)':''}<br><b>In hand:</b> ${G.hand.length?G.hand.map(c=>c.n).join(', '):'no cards'}<br>
    <b>Market:</b> Tributary, Tradition, Civilised (${G.civ} Progress on it), Tradition, Region. An Unrest under each card except the Region.</p>
    <details><summary>Card text</summary><ul>${TXT.map(t=>`<li><b>${t[0]}.</b> ${t[1]}</li>`).join('')}</ul></details>
    <div class="out ${G.cls}" style="margin-top:10px">${G.msg}</div><div class="row" id="gbtn" style="margin-top:10px"></div>`;
    const add=(l,f,k)=>{const b=document.createElement('button');b.type='button';b.textContent=l;if(k)b.className=k;b.onclick=()=>{f();draw()};$('#gbtn').append(b)};
    if(G.ph==='order'){
      add('Activation',()=>{G.ph='act';ok('Good choice: you have cards to play and an Exhaust ability in play. You have 3 Actions.')},'pri');
      add('Research',()=>ko('You would discard a hand full of playable cards for a single card. Research is for when your hand is weak.'));
      add('Pacify',()=>ko('You would only return 2 Unrest and lose the rest of your turn. Keep this order for a hand drowning in Unrest.'))}
    else if(G.ph==='act'){
      if(G.sub)G.sub.forEach(([l,f])=>add(l,f));
      else{G.hand.forEach((c,i)=>add('Play: '+c.n,()=>play(i)));add('Exhaust the Tents',tentes);
        add('End my actions',()=>{G.ph='c1';G.win=false;info('Cleanup, step 1: you add 1 Progress onto a Market card. Where does this token come from?')},'pri')}}
    else if(G.ph==='c1'){
      add('From the supply',()=>{G.civ++;G.a=3;G.e=5;G.tent=false;G.ph='c3';ok('Right, always from the supply. You place it on the Civilised card. Step 2: your tokens come back, 3 Actions and 5 Exhaust. Step 3: what do you discard?')},'pri');
      add('From my reserve',()=>ko('No: this Progress comes from the supply, your reserve isn\'t touched. It is the most common thing to forget.'))}
    else if(G.ph==='c3'){const next=t=>{const need=Math.max(0,5-G.hand.length);
        if(!need){G.ph='done';ok(t+' Step 4: you already have 5 cards or more, so you don\'t draw.')}
        else if(need<=G.deck){G.deck-=need;G.ph='done';ok(t+' Step 4: you draw '+need+' card'+(need>1?'s':'')+'. Your deck is enough, no shuffle.')}
        else{G.need=need;G.ph='c4';ok(t+' Step 4: you must draw '+need+' cards and your deck only holds '+G.deck+'. What happens?')}};
      add('My whole hand',()=>{G.hand=[];next('Legal, and it is the rulebook\'s advice: the more your deck cycles, the faster your nation evolves.')},'pri');
      add('Only the Unrest',()=>{G.hand=G.hand.filter(c=>c.k!=='ins');next('Legal. The Unrest will come back at the next shuffle, but you keep your other cards.')});
      add('Nothing',()=>next('Also legal: nothing forces you to discard.'))}
    else if(G.ph==='c4'){
      add('The top card of my Nation deck joins my discard pile, I place an Exhaust token as a marker, I shuffle, then I finish drawing',()=>{G.ph='done';ok('Exactly. You first draw the '+G.deck+' remaining cards, then the Nation card enters your discard pile, you shuffle and fill your hand up to 5.')},'pri');
      add('I shuffle my discard pile as it is',()=>ko('You forget the Nation card: you just took back your Exhaust tokens, so you can and must add one before shuffling.'));
      add('I draw what is left and stop',()=>ko('Only an "if possible" effect stops at an empty deck. At Cleanup, you shuffle and keep going up to 5 cards.'))}
    else{$('#gbtn').insertAdjacentHTML('beforebegin',`<p style="margin-top:10px"><b>Turn over.</b> ${G.good} geste${G.good>1?'s':''} approved${G.good>1?'s':''}, ${G.bad} corrected${G.bad>1?'s':''}. The next player starts, then comes the Solstice, where the Tents will let you recall a Region.</p>`);
      add('Replay this turn differently',init,'pri')}}
  init();
}

/* ---------- ateliers ---------- */
function labPay(){
  const f=()=>{
    const m=+$('#pm').value||0,p=+$('#pp').value||0,g=+$('#pr').value||0,c=Math.max(1,+$('#pc').value||1),t=$('#pt').value,o=$('#payout');
    let ok,msg;
    if(t==='g'){ok=g>=c;msg=ok?`Yes: ${c} Progress. Nothing replaces Progress.`:`No: you are missing ${c-g} Progress, and no other resource can replace it.`}
    else if(t==='p'){ok=p+g>=c;const up=Math.min(p,c),ug=c-up;msg=ok?`Yes: ${up} Population`+(ug?` and ${ug} Progress (1 Progress is worth 1 Population).`:'.'):`No: Population and Progress together only make ${p+g}. Materials don't replace Population.`}
    else{ok=m+2*g>=c;if(ok){let ug=0,um=Math.min(m,c);while(um+2*ug<c)ug++;um=Math.max(0,Math.min(m,c-2*ug));
        const over=um+2*ug-c;msg=`Yes: ${um} Materials`+(ug?` and ${ug} Progress (each worth 2 Materials).`:'.')+(over>0?' You pay 1 too many: no change given.':'')}
      else msg=`No: you only reach ${m+2*g} (Materials + 2 per Progress). Population doesn't replace Materials.`}
    o.className='out '+(ok?'good':'warn');o.textContent=msg;
  };
  ['pm','pp','pr','pc','pt'].forEach(i=>$('#'+i).addEventListener('input',f));f();
}
function labZones(){
  const z=$('#zones');
  ZONES.forEach(([n,d])=>{const b=document.createElement('button');b.type='button';b.textContent=n;
    b.onclick=()=>{$$('button',z).forEach(x=>x.classList.remove('sel'));b.classList.add('sel');$('#zout').innerHTML='<b>'+n+'.</b> '+d};z.append(b)});
}
function labCard(){
  const c=$('#card');
  ANAT.forEach(([x,y,n,d],i)=>{const b=document.createElement('button');b.type='button';b.className='hs';b.textContent=i+1;b.setAttribute('aria-label',n);
    b.style.left=`calc(${x}% - 13px)`;b.style.top=`calc(${y}% - 13px)`;
    b.onclick=()=>{$$('.hs',c).forEach(h=>h.classList.remove('sel'));b.classList.add('sel');$('#cout').innerHTML='<b>'+(i+1)+'. '+n+'.</b> '+d};c.append(b)});
}
function labSetup(){
  let n=2;const steps=(el,arr)=>{el.innerHTML='';arr.forEach((t,i)=>{const li=document.createElement('li');const id=el.id+'-'+i;
    li.innerHTML=`<input type="checkbox" id="${id}"><span><label for="${id}">${t}</label></span>`;$('input',li).onchange=e=>li.classList.toggle('done',e.target.checked);el.append(li)})};
  const draw=()=>{$$('#np button').forEach(b=>b.classList.toggle('sel',+b.dataset.n===n));
    $('#npout').innerHTML=n===1?'<b>Solo:</b> set up the common decks as for 2 players, then open the Play solo tab. Fame, Region, Tradition and Civilised decks: 6 cards each.'
      :`<b>${n} players:</b> ${n+4} face-down cards in the Fame deck (on top of King of Kings) and ${n+4} cards in each of the Region, Tradition and Civilised decks.`;
    steps($('#st2'),ST2(Math.max(2,n)))};
  [[1,'Solo'],[2,'2'],[3,'3'],[4,'4']].forEach(([v,l])=>{const b=document.createElement('button');b.type='button';b.dataset.n=v;b.textContent=l;b.onclick=()=>{n=v;draw()};$('#np').append(b)});
  steps($('#st1'),ST1);draw();
}
function labOrders(){
  const t=$('#ordtabs'),sel=i=>{$$('button',t).forEach((b,j)=>b.classList.toggle('sel',i===j));$('#ordout').innerHTML=`<p><b>${ORD[i][0]}.</b> ${ORD[i][1]}</p>${ORD[i][2]}`};
  ORD.forEach((o,i)=>{const b=document.createElement('button');b.type='button';b.textContent=o[0];b.onclick=()=>sel(i);t.append(b)});sel(0);
}
function labTokens(){
  let a=3,e=5,wit=false;const out=$('#tkout');
  const draw=()=>{$('#tkA').innerHTML=Array.from({length:Math.max(3,a)},(_,i)=>`<i class="${i<a?'':'off'}"></i>`).join('');
    $('#tkE').innerHTML=Array.from({length:5},(_,i)=>`<i class="e ${i<e?'':'off'}"></i>`).join('')};
  const acts=[['Play a card',()=>a?(a--,'One Action spent: the card is resolved then discarded, or stays in play if it is permanent.'):'Impossible: no Action token left. You would need a Free action.'],
   ['Play as a Free action',()=>'No token spent. Reminder: the same card only once per turn this way.'],
   ['Exhaust a card in play',()=>e?(e--,'An Exhaust token placed on the card: its effect resolves. This card can\'t be Exhausted again this turn.'):'Impossible: no Exhaust token left on your State card.'],
   ['Gain an Action',()=>(a++,'An Action token taken from the supply. You can go above three until Cleanup.')],
   ['Shuffle my discard pile mid-turn',()=>wit?'You shuffle, but without adding a card: a marker has already been placed this turn.':e?(e--,wit=true,'You add a Nation card to your discard pile before shuffling. An Exhaust token serves as a marker on the Nation deck: one less for this turn.'):'You shuffle without adding a Nation card: no Exhaust token available to serve as a marker.'],
   ['Cleanup',()=>(a=3,e=5,wit=false,'All tokens come back: 3 Actions, 5 Exhaust.')]];
  acts.forEach(([l,f])=>{const b=document.createElement('button');b.type='button';b.textContent=l;b.onclick=()=>{out.textContent=f();draw()};$('#tkbtn').append(b)});draw();
}
function labMarket(){
  const CATS=['Region','Tradition','Civilised','Tributary'],COL={Région:'var(--reg)',Tradition:'var(--tra)',Civilisé:'var(--civ)',Vassal:'var(--vas)'};
  const SRC=['Main','Main','Civilised','Tradition','Region'];let S;
  const rnd=()=>CATS[Math.floor(Math.random()*4)];
  const init=()=>{S={pile:7,hu:0,hc:0,res:0,sel:-1,over:false,cards:[{c:'Tributary',p:0,u:1},{c:'Tradition',p:0,u:1},{c:'Civilised',p:1,u:1},{c:'Tradition',p:0,u:1},{c:'Region',p:0,u:0}]};S.pile-=4;say('Select a Market card.');draw()};
  const say=(t,k)=>{const o=$('#mout');o.className='out'+(k?' '+k:'');o.innerHTML=t};
  const draw=()=>{$('#mk').innerHTML=S.cards.map((k,i)=>`<button type="button" class="mcard${S.sel===i?' sel':''}" data-i="${i}"><span class="ban" style="background:${COL[k.c]}">${k.c}</span><span class="bd">Slot ${i+1}<br>Draw ${SRC[i]}<br>${k.p?k.p+' Progress placed'+(k.p>1?'s':''):'No tokens'}</span><span class="un${k.u?'':' none'}">${k.u?'Unrest under it':'Nothing under it'}</span></button>`).join('');
    $$('#mk button').forEach(b=>b.onclick=()=>{if(S.over)return;S.sel=+b.dataset.i;draw()});
    $('#mPile').textContent=S.pile;$('#mHandU').textContent=S.hu;$('#mHandC').textContent=S.hc;$('#mRes').textContent=S.res;
    ['mAcq','mInn','mBlind','mProg'].forEach(i=>$('#'+i).disabled=S.over)};
  const refill=i=>{const c=i<2?rnd():SRC[i];const k={c,p:0,u:0};let t=` A new card ${c} arrives from the deck ${SRC[i]}`;
    if(c!=='Region'){k.u=1;S.pile--;t+=', with an Unrest from the pile tucked under it.'}else t+=', with no Unrest since it is a Region.';
    S.cards[i]=k;return t};
  const collapse=t=>{if(S.pile<=0){S.pile=0;S.over=true;say(t+' <b>The Unrest pile is empty: Collapse.</b> The game stops on the spot and the player with the fewest Unrest wins. Here you have '+S.hu+'.','warn')}else say(t,'good');S.sel=-1;draw()};
  const need=()=>{if(S.sel<0){say('Select a card first.','warn');return false}return true};
  $('#mAcq').onclick=()=>{if(!need())return;const k=S.cards[S.sel];let t=`You Acquire the card ${k.c} : it goes into your hand.`;S.hc++;
    if(k.p){S.res+=k.p;t+=` You gain ${k.p} Progress.`}if(k.u){S.hu++;t+=' The Unrest under it also comes into your hand.'}collapse(t+refill(S.sel))};
  $('#mInn').onclick=()=>{if(!need())return;const k=S.cards[S.sel];let t=`You Innovate the card ${k.c} : it goes into your hand.`;S.hc++;
    if(k.p){S.res+=k.p;t+=` You gain ${k.p} Progress.`}
    const c=S.sel<2?rnd():SRC[S.sel];
    if(k.u&&c!=='Region'){S.cards[S.sel]={c,p:0,u:1};collapse(t+` A new card ${c} arrives from the deck ${SRC[S.sel]}. The Unrest simply stays in place under it: it is the same as returning it to the pile and taking one again, the pile doesn't change.`);return}
    if(k.u){S.pile++;S.cards[S.sel]={c,p:0,u:0};collapse(t+` A new Region card arrives: no Unrest under a Region, so the previous one goes back to the pile.`);return}
    collapse(t+refill(S.sel))};
  $('#mBlind').onclick=()=>{if(!need())return;const c=S.cards[S.sel].c;S.hc++;S.sel=-1;draw();
    say(c==='Tributary'?'Tributaries have no deck: you reveal cards from the Main deck one by one until the first Tributary, take it, then shuffle the other revealed cards back into the Main deck. The Market doesn\'t change.':`You take the top face-down card of the deck ${c}, without knowing it in advance. The Market doesn't change and no Unrest is involved.`,'good')};
  $('#mProg').onclick=()=>{if(!need())return;S.cards[S.sel].p++;S.sel=-1;draw();say('A Progress from the supply is placed on the card. It becomes more tempting for everyone, you included. A card carrying tokens can no longer be Exiled.','good')};
  $('#mReset').onclick=init;init();
}
function labDeck(){
  let S;const log=t=>{const li=document.createElement('li');li.innerHTML=t;$('#dLog').prepend(li)};
  const init=()=>{S={deck:5,hand:5,disc:0,nat:3,adv:true,dev:4,emp:false,turn:0,end:false};$('#dLog').innerHTML='';draw()};
  const draw=()=>{$('#dDeck').textContent=S.deck;$('#dHand').textContent=S.hand;$('#dDisc').textContent=S.disc;$('#dNat').textContent=S.nat+(S.adv?' + Acc.':'');$('#dDev').textContent=S.dev;$('#dState').textContent=S.emp?'Empire':'Barbarian';
    $('#dTurn').disabled=$('#dAcq').disabled=S.end};
  const turn=acq=>{S.turn++;let t=`<b>Turn ${S.turn}.</b> `;
    if(acq){S.hand+=2;t+='You acquire a card: it comes into your hand with its Unrest. '}
    S.disc+=S.hand;S.hand=0;let added=false,need=5;
    while(need>0){
      if(S.deck===0){
        if(!added){
          if(S.nat>0){S.nat--;S.disc++;added=true;t+='Empty deck: the first Nation card joins your discard pile (marker placed on the Nation deck), then you shuffle. '}
          else if(S.adv){S.adv=false;S.emp=true;S.disc++;added=true;t+='Empty deck: it is the<b>Accession</b> that joins your discard pile. Your State card flips: you are now an Empire. You shuffle. '}
          else if(S.dev>0){if($('#dPay').checked){S.dev--;S.disc++;added=true;t+='Empty deck, empty Nation deck: you pay and Develop a card of your choice, then you shuffle. ';
              if(S.dev===0){S.end=true;t+='<b>That was your last Development card: the Countdown is triggered.</b> Finish the round, then one last round. '}}
            else t+='Empty deck: you can\'t pay for any Development, you shuffle without adding anything. '}
          else t+='Empty deck: you shuffle. '}
        else t+='Deck empty again in the same turn: you shuffle without adding a card. ';
        S.deck=S.disc;S.disc=0;if(S.deck===0)break}
      S.deck--;S.hand++;need--}
    t+=`Your deck now holds ${S.deck+S.hand+S.disc} cards.`;log(t);draw()};
  $('#dTurn').onclick=()=>turn(false);$('#dAcq').onclick=()=>turn(true);$('#dReset').onclick=init;init();
}
function labCount(){
  const box=$('#cnt');
  CNT.forEach(([t],i)=>{const d=document.createElement('div');d.className='row';d.style.cssText='justify-content:space-between;padding:5px 0;border-bottom:1px solid var(--line)';
    d.innerHTML=`<span style="flex:1;min-width:180px">${t}</span><span class="row"><button type="button" data-v="1">Counts</button><button type="button" data-v="0">Doesn't count</button></span>`;
    $$('button',d).forEach(b=>b.onclick=()=>{$$('button',d).forEach(x=>x.classList.remove('sel','right','wrong'));b.classList.add('sel');d.dataset.v=b.dataset.v});box.append(d)});
  $('#cntCheck').onclick=()=>{let g=0;$$('#cnt>div').forEach((d,i)=>{const ok=d.dataset.v!==undefined&&+d.dataset.v===CNT[i][1];if(ok)g++;
      $$('button',d).forEach(b=>{b.classList.remove('right','wrong');if(+b.dataset.v===CNT[i][1])b.classList.add('right');else if(b.classList.contains('sel'))b.classList.add('wrong')})});
    const o=$('#cntOut');o.className='out '+(g===CNT.length?'good':'warn');
    o.textContent=g+' of '+CNT.length+'. Remember: the Nation deck, unpaid Developments and resources placed on cards are worth nothing, unless a card says otherwise.'};
}
function labScore(){
  const f=()=>{const v=i=>+$('#'+i).value||0;const tot=v('s1')+v('s2')-v('s3')+v('s4');
    $('#sOut').innerHTML=`Total: <b>${tot} points</b> (${v('s1')} + ${v('s2')} − ${v('s3')} + ${v('s4')} for Progress). Materials and Population are worth nothing by themselves.`};
  ['s1','s2','s3','s4'].forEach(i=>$('#'+i).addEventListener('input',f));f();
}
function labGlossary(){
  const f=()=>{const q=$('#gs').value.trim().toLowerCase(),h=$('#gh').checked;
    const list=GLO.filter(g=>(h||!g[2])&&(!q||(g[0]+' '+g[1]).toLowerCase().includes(q)));
    $('#glo').innerHTML=list.length?list.map(g=>`<dt>${g[0]}${g[2]?'<span class="tag">Horizons</span>':''}</dt><dd>${g[1]}</dd>`).join(''):'<dd>No term matches. Try another word.</dd>'};
  $('#gs').addEventListener('input',f);$('#gh').addEventListener('change',f);f();
}
function labNations(){
  $('#nats').innerHTML=NATS.map(n=>`<div class="nat"><h3>${n[0]}</h3><div class="meta"><span class="stars" aria-label="Complexity ${n[1]} of 5">${'★'.repeat(n[1])}${'☆'.repeat(5-n[1])}</span> · ${n[2]}</div><p>${n[3]}</p>${n[4]?`<p><b>${n[4]}</b></p>`:''}</div>`).join('');
}

build();labPay();labZones();labCard();labSetup();labOrders();labTokens();labMarket();labDeck();labCount();labScore();labGlossary();labNations();labGuided();progress();show();window.IMP_GLO=GLO;window.IMP_NATS=NATS;
})();
(function(){const $=s=>document.querySelector(s),L='(?<![\\p{L}])';
 const EXTRA={'Countdown':'Normal end of the game. Triggered when the Main deck is empty, when a player Develops their last card, when King of Kings is flipped face down, or by a card effect. In solo, also when the Bot\'s Dynasty deck runs out or it gains King of Kings. Finish the round, play one last round, then count the points.',
  'Collapse':'Immediate end of the game as soon as the Unrest pile is empty. In multiplayer, the player with the fewest Unrest wins. In solo, you lose automatically.',
  'Dynasty deck':'The Bot\'s card reserve: its Nation cards, then its Accession, then its Developments from strongest to weakest. A card comes out each time its deck is empty. When it runs out, the Countdown is triggered.',
  'King of Kings':'Last card of the Fame deck. When it is the only one left, gaining a Fame card makes you resolve it instead, only once per player. The Bot gains 6 Progress if it is Barbarian; as an Empire, it gains 3 Progress and a card from its Dynasty deck, and the end of the game is triggered.'};
 const PAT=[['Exile','exil[\\p{L}]*'],['Innovate','innov[\\p{L}]*'],['Acquiring','acqui[\\p{L}]*'],['Abandon','abandon[\\p{L}]*'],['Recall','recall[\\p{L}]*'],['History','histor[\\p{L}]*'],
  ['Return a card','return[\\p{L}]*'],['Recover','recover[\\p{L}]*'],['Solstice','Solstice'],['Countdown','Countdown'],['Collapse','Collapse'],['Dynasty deck','Dynasty deck'],['Attack','Attack'],['King of Kings','King of Kings']]
  .map(([k,r])=>[k,new RegExp(L+'(?:'+r+')','iu')]);
 window.IMP_HELP=k=>{const g=(window.IMP_GLO||[]).find(x=>x[0]===k),t=g?g[1]:EXTRA[k];if(!t)return;$('#helpt').textContent=k;$('#helpb').textContent=t;$('#help').hidden=false;$('#helpx').focus()};
 const close=()=>{$('#help').hidden=true};
 $('#helpx').onclick=close;$('#help').addEventListener('click',e=>{if(e.target.id==='help')close()});
 document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
 document.addEventListener('click',e=>{const b=e.target.closest('.kw');if(b)window.IMP_HELP(b.dataset.k)});
 window.IMP_LINK=root=>{PAT.forEach(([k,re])=>{const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let n;
   while((n=w.nextNode())){if(n.parentElement.closest('button,input,label,select'))continue;const m=re.exec(n.data);if(!m)continue;
     const r=n.splitText(m.index);r.splitText(m[0].length);const b=document.createElement('button');b.type='button';b.className='kw';b.dataset.k=k;b.textContent=m[0];r.replaceWith(b);break}})};
 const TABS=['apprendre','solo','plusieurs','aide'];
 function show(t){TABS.forEach(x=>{$('#tab-'+x).classList.toggle('on',x===t);$('header.top .lrmp-onglets [data-tab="'+x+'"]').classList.toggle('on',x===t)});try{localStorage.setItem('imperium-tab',t)}catch(e){}}
 function route(){let h=location.hash.slice(1);if(!TABS.includes(h)){try{h=localStorage.getItem('imperium-tab')}catch(e){}}show(TABS.includes(h)?h:'apprendre')}
 document.querySelectorAll('header.top .lrmp-onglets button').forEach(b=>b.onclick=()=>{show(b.dataset.tab);try{location.hash=b.dataset.tab}catch(e){}window.scrollTo(0,0)});
 window.addEventListener('hashchange',route);route();
})();