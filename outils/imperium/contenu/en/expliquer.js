/* Mode « Expliquer le jeu » d'Imperium : écrans et aide-mémoire (moteur commun : outils/site/partage/expliquer.js). */
const EXPL=(()=>{
const ch=(k,t)=>`<span class="chip c-${k}">${t}</span>`;
const M=ch('mat','Materials'),P=ch('pop','Population'),G=ch('prog','Progress'),I=ch('ins','Unrest'),RG=ch('reg','Region'),RN=ch('ren','Fame');
/* ---------- explication express ---------- */
const SL=[
['Imperium in one sentence',`<p class="big1">You lead an ancient nation, represented by a deck of cards that grows and transforms over the game.</p>
 <div class="duo"><div><h3>Countdown</h3><p>The normal ending. Count the victory points: the highest total wins.</p></div><div><h3>Collapse</h3><p>The ${I} pile is empty: the game stops at once, and whoever has the fewest Unrest wins.</p></div></div>`],
['Your corner of the table',`<div class="zgrid"><div>Developments<small>to pay later</small></div><div>Accession<small>under the Nation deck</small></div><div class="hl">State card<small>Barbarian then Empire · your tokens</small></div><div>Power card<small>your power · your History under it</small></div>
 <div>Deck</div><div>Discard</div><div class="wide">Play area<small>your Regions and permanent cards</small></div><div class="wide hl">Your hand: 5 cards</div></div>`],
['Three resources',`<div class="trio"><div>${M}<p>Build, pay for Development cards.</p></div><div>${P}<p>Conquer, acquire Tributaries.</p></div><div>${G}<p>The wildcard resource, and 1 victory point per token at the end.</p></div></div>
 <p class="big1">To pay, 1 Progress is worth <b>1 Population</b> or <b>2 Materials</b>. Resources placed on cards are useless.</p>`],
['Your turn: a single order',`<div class="trio ord"><div><h3>Activation</h3><p>The normal turn: you play cards and exhaust abilities.</p></div><div><h3>Research</h3><p>You discard your hand and take a chosen card, without its Unrest.</p></div><div><h3>Pacify</h3><p>You return all the Unrest in your hand for free.</p></div></div><p class="big1">Then, whatever the order: Cleanup.</p>`],
['Activation: Action and Exhaust tokens',`<div class="duo"><div><h3>3 Actions</h3><p>One Action = play a card from your hand. Resolve its text, then discard it, unless it stays in play.</p></div><div><h3>5 Exhaust tokens</h3><p>Place a token on a card in play to use its "Exhaust" ability. Once per turn per card.</p></div></div>
 <p class="big1">A card marked Barbarian or Empire can only be played from your hand if your State card shows the same side.</p>`],
['The Market',`<p class="big1">Five visible cards. Under each one, an ${I}, except under Regions.</p><div class="duo"><div><h3>Acquiring</h3><p>You take the card, its resources <b>and the Unrest</b> card tucked under it.</p></div><div><h3>Innovate</h3><p>You take the card and its resources. The Unrest goes back to the pile.</p></div></div>`],
['Cleanup',`<ol class="steps4"><li><b>1 Progress from the supply</b> onto a Market card.</li><li>Your tokens come back: <b>3 Actions, 5 Exhaust</b>.</li><li>Discard as many cards from your hand as you like.</li><li>Draw up to <b>5 cards</b>.</li></ol><p class="big1">Tip: discard generously, your deck will cycle faster.</p>`],
['Your nation evolves',`<p class="big1">Each time you shuffle your discard pile to rebuild your deck, a card is added to it:</p><div class="flow"><div>Nation cards<small>one per shuffle</small></div><span aria-hidden="true">→</span><div class="hl">Accession<small>you become an Empire</small></div><span aria-hidden="true">→</span><div>Developments<small>you pay their cost</small></div></div><p>Developing your last card triggers the Countdown.</p>`],
['Unrest and Glory',`<div class="duo"><div><h3>${I}</h3><p>−2 points each, and they clog your hand. To get rid of one: play it (an Action, then 1 Population, 3 Materials or 2 discarded cards), or the Pacify order.</p></div><div><h3>Glory</h3><p>Abandon 3 ${RG} in play to gain a ${RN}, the richest source of points. You will then have to replay your Regions.</p></div></div>`],
['Rounds and end of the game',`<div class="duo"><div><h3>Solstice</h3><p>When everyone has played, each player resolves their Solstice effects. Then a new round.</p></div><div><h3>Countdown</h3><p>Main deck empty, last Development paid or King of Kings flipped: finish the round, play <b>one last one</b>, then count.</p></div></div>
 <p class="big1">Score: card points (10 at most for a star card) + 1 point per Progress in reserve.</p>`]];
const REF=`<div class="ref"><div><h3>1 · Choose an order</h3><ul><li><b>Activation</b>: 3 Actions, 5 Exhaust tokens</li><li><b>Research</b>: discard your hand, innovate 1 card</li><li><b>Pacify</b>: return your Unrest</li></ul></div>
 <div><h3>2 · Cleanup</h3><ol><li>1 ${G} from the supply onto the Market</li><li>Take back your tokens</li><li>Discard what you like</li><li>Draw up to 5</li></ol></div>
 <div><h3>Pay</h3><ul><li>1 ${G} = 1 ${P}</li><li>1 ${G} = 2 ${M}</li></ul></div>
 <div><h3>Market</h3><ul><li><b>Acquiring</b>: with the Unrest</li><li><b>Innovate</b>: without the Unrest</li></ul></div>
 <div><h3>Empty deck</h3><ul><li>+1 Nation card, then Accession, then a paid Development</li><li>Only 1 addition per turn</li></ul></div>
 <div><h3>End</h3><ul><li><b>Solstice</b> at the end of each round</li><li><b>Countdown</b>: finish the round + 1 round</li><li><b>Collapse</b>: pile ${I} empty</li></ul></div></div>`;
return {ui:{ecran:'Screen {n} of {t}',precedent:'Previous',suivant:'Next',voirPlus:'For later',voirAide:'Show the cheat sheet',debut:'Back to the start',
  aide:'Cheat sheet',aideTitre:'Your turn at a glance',plus:'For later',plusTitre:'Keep it for later',
  plusIntro:'No need to mention these before the first turn. Explain each point when the game reaches it.',
  pleinEcran:'Full screen',fleches:'Use the arrow keys to move on.',dire:'Say it',piege:'Pitfall to flag'},
ecrans:SL.map(([t,html])=>({t,html})),
aide:REF.replace(/^<div class="ref">/,'').replace(/<\/div>$/,'')};
})();

EXPL.chantier={k:'Work in progress',t:'Under construction',p:'This mode is still being written. Check back soon!'};
