(function(){
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const ch=(k,t)=>`<span class="chip c-${k}">${t}</span>`;
const M=ch('mat','Materials'),P=ch('pop','Population'),G=ch('prog','Progress'),I=ch('ins','Unrest'),RG=ch('reg','Region'),RN=ch('ren','Fame');
const NATS=['Carthaginians','Celts','Greeks','Macedonians','Persians','Romans','Scythians','Vikings'];
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
let sl=0;
function drawSlides(){const box=$('#mp-ex'),last=sl===SL.length;
  box.innerHTML=`<div class="stage" id="stage"><div class="snum">${last?'Reference':'Screen '+(sl+1)+' of '+SL.length}</div>
   <h2>${last?'Your turn at a glance':SL[sl][0]}</h2><div class="sbody">${last?REF:SL[sl][1]}</div>
   <div class="dots" aria-hidden="true">${SL.map((_,i)=>`<i class="${i===sl?'on':''}"></i>`).join('')}<i class="ref ${last?'on':''}"></i></div></div>
   <div class="row snav"><button type="button" id="sp" ${sl?'':'disabled'}>Previous</button><button type="button" class="pri" id="sn">${last?'Back to the start':sl===SL.length-1?'Show the reference':'Next'}</button>
   <button type="button" id="sr">Reference</button><button type="button" id="sf">Full screen</button><span class="hint">Use the arrow keys to move on.</span></div>`;
  $('#sp').onclick=()=>{sl=Math.max(0,sl-1);drawSlides()};$('#sn').onclick=()=>{sl=last?0:sl+1;drawSlides()};$('#sr').onclick=()=>{sl=SL.length;drawSlides()};
  $('#sf').onclick=()=>{const s=$('#stage');try{const r=document.fullscreenElement?document.exitFullscreen():s.requestFullscreen();if(r&&r.catch)r.catch(()=>{})}catch(e){}}}
document.addEventListener('keydown',e=>{if(!$('#tab-plusieurs').classList.contains('on')||$('#mp-ex').hidden||/INPUT|SELECT|TEXTAREA/.test((e.target.tagName||'')))return;
  if(e.key==='ArrowRight'||e.key===' '){sl=Math.min(SL.length,sl+1);drawSlides();e.preventDefault()}if(e.key==='ArrowLeft'){sl=Math.max(0,sl-1);drawSlides()}});
document.addEventListener('fullscreenchange',()=>{const s=$('#stage');if(s)s.classList.toggle('fs',!!document.fullscreenElement)});
/* ---------- compagnon de partie ---------- */
let C=null,U=[];
try{C=JSON.parse(localStorage.getItem('imperium-multi'))}catch(e){}
const sv=()=>{try{C?localStorage.setItem('imperium-multi',JSON.stringify(C)):localStorage.removeItem('imperium-multi')}catch(e){}};
const push=()=>{U.push(JSON.stringify(C));if(U.length>40)U.shift()};
const order=()=>C.players.map((_,i)=>(C.first+i)%C.players.length);
function draw(){const b=$('#mp-comp');
  if(!C)return setup(b);
  const pl=C.players,o=order(),n=pl.length,low=C.ins<=n,crit=C.ins<=2;
  const last=C.trig!=null&&C.round>C.trig,trigNote=C.trig==null?'':last?'<div class="banner end">Last round: the Countdown follows the Solstice.</div>':'<div class="banner">Countdown triggered: finish this round, then one last full round.</div>';
  let main='';
  if(C.phase==='turn'){const p=pl[o[C.cur]];
    main=`<div class="who"><small>Round ${C.round} · turn ${C.cur+1} of ${n}</small><b>${p.name}</b><span>${p.nat}</span></div>
     <div class="duo slim"><div><h3>During the turn</h3><p>Announce an order: Activation, Research or Pacify.</p></div>
     <div class="clean"><h3>Cleanup</h3><ol><li>${p.nat==='Carthaginians'?`Some ${M} onto a Market card, instead of Progress (amount depends on your Power card)`:`1 ${G} <b>from the supply</b> onto a Market card`}</li><li>Tokens: 3 Actions, 5 Exhaust</li><li>Free discard</li><li>Draw up to 5</li></ol></div></div>
     <div class="row"><button type="button" class="pri big" id="next">${C.cur===n-1?'Turn over: Solstice':'Turn over: next player'}</button></div>`}
  else if(C.phase==='solstice')main=`<div class="who sol"><small>End of the round ${C.round}</small><b>Solstice</b><span>Everyone resolves their Solstice effects at the same time. No Action and no Exhaust ability.</span></div>
     <div class="row"><button type="button" class="pri big" id="next">${last?'Solstice resolved: count the points':'Solstice resolved: next round'}</button></div>`;
  else if(C.phase==='score')main=scoreHTML();
  else if(C.phase==='collapse')main=collapseHTML();
  b.innerHTML=`<div class="cgrid"><section class="panel">${trigNote}${main}</section>
   <aside class="panel"><h3>Pile ${I}</h3><div class="inscount ${crit?'crit':low?'low':''}"><button type="button" id="im" aria-label="One less">−</button><b>${C.ins}</b><button type="button" id="ip" aria-label="One more">+</button></div>
    <p class="hint">${C.ins<=0?'Empty pile: Collapse.':crit?'Danger: the Collapse is very close.':low?'Careful: the pile is shrinking.':'Adjust with each card taken or returned.'}</p>
    <h3>Turn order</h3><ol class="porder">${o.map((i,k)=>`<li class="${C.phase==='turn'&&k===C.cur?'on':''}">${pl[i].name} <small>${pl[i].nat}</small></li>`).join('')}</ol>
    <div class="row col">${C.trig==null&&C.phase!=='score'?'<button type="button" id="trig">The Countdown is triggered</button>':''}${C.phase!=='score'&&C.phase!=='collapse'?'<button type="button" id="col" class="warn">Collapse</button>':''}
     <button type="button" id="undo" ${U.length?'':'disabled'}>Undo the last step</button><button type="button" id="reset">New game</button></div></aside></div>`;
  const on=(id,f)=>{const e=$('#'+id);if(e)e.onclick=()=>{f();sv();draw()}};
  on('next',()=>{push();if(C.phase==='turn'){if(C.cur<n-1)C.cur++;else C.phase='solstice'}else if(C.phase==='solstice'){if(last)C.phase='score';else{C.round++;C.cur=0;C.phase='turn'}}});
  on('im',()=>{push();C.ins=Math.max(0,C.ins-1);if(C.ins===0)C.phase='collapse'});on('ip',()=>{push();C.ins++});
  on('trig',()=>{push();C.trig=C.round});on('col',()=>{push();C.phase='collapse'});
  on('undo',()=>{C=JSON.parse(U.pop())});
  const r=$('#reset');if(r)r.onclick=()=>{if(r.dataset.c){C=null;U=[];sv();draw()}else{r.dataset.c=1;r.textContent='Confirm: erase this game';r.classList.add('warn')}};
  if(C.phase==='score')bindScore();if(C.phase==='collapse')bindCollapse()}
const ROWS=[['f','Fixed-value cards',1],['s','Star cards (10 max each)',1],['q','Successful question-mark cards',1],['i','Number of Unrest',-2],['n','Other negative points',-1],['g','Progress in reserve',1]];
function scoreHTML(){const pl=C.players;C.sc=C.sc||pl.map(()=>({}));
  return `<h2>Score sheet</h2><p class="hint">Each player counts their hand, play area, deck, discard pile, History, reserved cards and Power card. The Nation deck and unpaid Developments don't count.</p>
   <div class="tw"><table class="sheet"><tr><th></th>${pl.map(p=>`<th>${p.name}<small>${p.nat}</small></th>`).join('')}</tr>
   ${ROWS.map(([k,l,m])=>`<tr><td>${l}${m===-2?' <small>(−2 each)</small>':''}</td>${pl.map((_,j)=>`<td><input type="number" min="0" inputmode="numeric" data-p="${j}" data-k="${k}" value="${C.sc[j][k]||''}" aria-label="${l}, ${pl[j].name}"></td>`).join('')}</tr>`).join('')}
   <tr class="tot"><td>Total</td>${pl.map((_,j)=>`<td id="tt${j}"></td>`).join('')}</tr></table></div><div class="out" id="win"></div>`}
function bindScore(){const pl=C.players,upd=()=>{const t=pl.map((_,j)=>ROWS.reduce((a,[k,,m])=>a+m*(+C.sc[j][k]||0),0)),mx=Math.max(...t),w=pl.filter((_,j)=>t[j]===mx).map(p=>p.name);
    t.forEach((v,j)=>{const c=$('#tt'+j);c.textContent=v;c.classList.toggle('best',v===mx)});
    $('#win').innerHTML=w.length>1?`<b>Tie</b> between ${w.join(' and ')} : the victory is shared.`:`<b>${w[0]}</b> wins with ${mx} points.`};
  $$('.sheet input').forEach(i=>i.addEventListener('input',()=>{C.sc[i.dataset.p][i.dataset.k]=i.value;sv();upd()}));upd()}
function collapseHTML(){const pl=C.players;C.co=C.co||pl.map(()=>'');
  return `<h2>Collapse</h2><p>The Unrest pile is empty: the game stops immediately, the action in progress is interrupted. Each player counts their Unrest in hand, play area, deck, discard pile and History, not in their Nation deck.</p>
   <div class="form">${pl.map((p,j)=>`<label class="f" for="co${j}">${p.name} (${p.nat})<input type="number" min="0" id="co${j}" data-j="${j}" value="${C.co[j]}"></label>`).join('')}</div><div class="out" id="cwin"></div>
   <div class="row" style="margin-top:10px"><button type="button" id="toscore">Tie: break it with points</button></div>`}
function bindCollapse(){const pl=C.players,upd=()=>{const v=C.co.map(x=>x===''?null:+x);if(v.some(x=>x==null)){$('#cwin').textContent='Enter each player\'s number of Unrest.';return}
    const mn=Math.min(...v),w=pl.filter((_,j)=>v[j]===mn).map(p=>p.name);$('#cwin').innerHTML=w.length>1?`<b>Tie</b> between ${w.join(' and ')} (${mn} each): break the tie with Countdown points.`:`<b>${w[0]}</b> wins with ${mn} Unrest${mn>1?'s':''}.`};
  $$('#mp-comp [data-j]').forEach(i=>i.addEventListener('input',()=>{C.co[i.dataset.j]=i.value;sv();upd()}));upd();
  $('#toscore').onclick=()=>{push();C.phase='score';sv();draw()}}
function setup(b){let n=+(b.dataset.n||3);
  const prev=(b.dataset.names||'').split('|');
  b.innerHTML=`<section class="panel narrow"><h2>New multiplayer game</h2><p>The companion paces the game: whose turn it is, the Cleanup reminder, the Solstice, the Unrest pile, then the score sheet.</p>
   <h3>Number of players</h3><div class="row" id="mpn">${[2,3,4].map(k=>`<button type="button" data-n="${k}" class="${k===n?'sel':''}">${k} players</button>`).join('')}</div>
   <h3>Players, in turn order (clockwise)</h3><div class="form">${Array.from({length:n},(_,i)=>`<div class="row prow"><label class="f" for="pn${i}">Name<input type="text" id="pn${i}" value="${prev[i]||'Player '+(i+1)}"></label><label class="f" for="pt${i}">Nation<select id="pt${i}">${NATS.map((x,k)=>`<option ${k===i?'selected':''}>${x}</option>`).join('')}</select></label></div>`).join('')}</div>
   <h3>Pile ${I}</h3><label class="f" for="ni">Number of cards in the pile after setup<input type="number" id="ni" min="1" value="12"></label>
   <p class="hint">Count the pile once the Market is set up. Some nations' starting Unrest is already in it.</p>
   <div class="row"><button type="button" class="pri" id="gostart">Draw the first player and start</button></div></section>`;
  $$('#mpn button').forEach(x=>x.onclick=()=>{b.dataset.names=Array.from({length:n},(_,i)=>$('#pn'+i).value).join('|');b.dataset.n=x.dataset.n;draw()});
  $('#gostart').onclick=()=>{const players=Array.from({length:n},(_,i)=>({name:$('#pn'+i).value.trim()||'Player '+(i+1),nat:$('#pt'+i).value}));
    C={players,first:Math.floor(Math.random()*n),round:1,cur:0,phase:'turn',ins:Math.max(1,+$('#ni').value||12),trig:null};U=[];sv();draw()}}
/* ---------- montage ---------- */
function mode(m){$('#mp-ex').hidden=m!=='ex';$('#mp-comp').hidden=m!=='comp';$$('#mpnav button').forEach(b=>b.classList.toggle('sel',b.dataset.m===m));try{localStorage.setItem('imperium-mp',m)}catch(e){}}
$$('#mpnav button').forEach(b=>b.onclick=()=>mode(b.dataset.m));
let m0='ex';try{m0=localStorage.getItem('imperium-mp')||'ex'}catch(e){}
drawSlides();draw();mode(m0);
window.IMP_M={get C(){return C},draw};
})();