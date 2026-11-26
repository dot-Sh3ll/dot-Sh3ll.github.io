
/* ---------- labs ---------- */
const NAMES=['Ana','Bruno','Carla','Diego','Elena'];
const ROLEDEF={pla:{n:'Planter',a:'One Estate each',p:'Quarry allowed'},bat:{n:'Builder',a:'One Building each',p:'−1 coin'},rec:{n:'Recruiter',a:'Workers from the Register',p:'+1 worker'},
 art:{n:'Craftsman',a:'Production',p:'+1 barrel'},neg:{n:'Trader',a:'Sell 1 barrel',p:'+1 coin'},cap:{n:'Captain',a:'Mandatory loading',p:'+1 VP'},av1:{n:'Adventurer',a:'No action',p:'+1 coin'},av2:{n:'Adventurer',a:'No action',p:'+1 coin'}};
const rolesFor=n=>['pla','bat','rec','art','neg','cap'].concat(n===3?[]:n===5?['av1','av2']:['av1']);
const numIn=(id,v,min=0,max=99)=>`<input type="number" id="${id}" value="${v}" min="${min}" max="${max}">`;
const seg=(id,vals,cur)=>`<div class="seg" id="${id}" role="group">${vals.map(v=>`<button type="button" data-v="${v}" class="${v==cur?'sel':''}">${v}</button>`).join('')}</div>`;
function segVal(root,id){const b=$(`#${id} .sel`,root);return b?+b.dataset.v:0}
function wireSeg(root,id,cb){$$(`#${id} button`,root).forEach(b=>b.onclick=()=>{$$(`#${id} button`,root).forEach(x=>x.classList.remove('sel'));b.classList.add('sel');cb()})}
const num=(root,id)=>Math.max(0,parseInt($('#'+id,root).value,10)||0);
const rnd=n=>Math.floor(Math.random()*n);
const shuffle=a=>{for(let i=a.length-1;i>0;i--){const j=rnd(i+1);[a[i],a[j]]=[a[j],a[i]]}return a};

const LABS={};

/* --- mise en place --- */
LABS.setup={html:()=>`<div class="lab"><h3>Mini-game: setting up your table</h3><p class="hint">Choose the number of players.</p>${seg('su-n',[2,3,4,5],4)}<div class="tw" id="su-out" style="margin-top:12px"></div></div>`,
init(r){const go=()=>{const n=segVal(r,'su-n');const D={
 2:{co:3,pl:'Governor: Fruit; other player: Corn',vp:65,qu:'5 (3 removed)',vis:3,ro:'7 (a single Adventurer)',sh:'4 and 6',reg:2,sup:40,ba:'1 of each Commercial Building, 2 of each Production Building',ex:'Remove 3 tiles of each Countryside type (Corn, Fruit, Sugar, Tobacco, Coffee, Quarry) and 2 barrels of each Good.'},
 3:{co:2,pl:'Fruit, Fruit, Corn',vp:75,qu:8,vis:4,ro:'6 (no Adventurer)',sh:'4, 5 and 6',reg:3,sup:55,ba:'All 49 Buildings'},
 4:{co:3,pl:'Fruit, Fruit, Corn, Corn',vp:100,qu:8,vis:5,ro:'7 (a single Adventurer)',sh:'5, 6 and 7',reg:4,sup:75,ba:'All 49 Buildings'},
 5:{co:4,pl:'Fruit, Fruit, Fruit, Corn, Corn',vp:126,qu:8,vis:6,ro:'8 (both Adventurers)',sh:'6, 7 and 8',reg:5,sup:95,ba:'All 49 Buildings'}}[n];
 $('#su-out',r).innerHTML=`<table><tr><th>Item</th><th>${n} players</th></tr>
 <tr><td>Coins per player</td><td>${D.co}</td></tr><tr><td>Starting Estates (from the Governor)</td><td>${D.pl}</td></tr>
 <tr><td>VP chips</td><td>${D.vp}</td></tr><tr><td>Quarries</td><td>${D.qu}</td></tr><tr><td>Face-up Estates</td><td>${D.vis}</td></tr>
 <tr><td>Role cards</td><td>${D.ro}</td></tr><tr><td>Cargo Ships</td><td>${D.sh} holds</td></tr><tr><td>Workers on the Work Register</td><td>${D.reg}</td></tr>
 <tr><td>Workers in the supply</td><td>${D.sup}</td></tr><tr><td>Buildings</td><td>${D.ba}</td></tr>${D.ex?`<tr><td>Remove</td><td>${D.ex}</td></tr>`:''}</table>`};
 wireSeg(r,'su-n',go);go()}};

/* --- a round --- */
LABS.round={html:()=>`<div class="lab"><h3>Mini-game: play a round</h3><p class="hint">Each player chooses a role in turn: click a card. Watch the order of play in each phase, then the coins placed at the end of the round.</p>
<div class="row">${seg('ro-n',[2,3,4,5],4)}<button type="button" id="ro-reset">Start again</button></div>
<p id="ro-who" style="margin:12px 0 4px;font-weight:600"></p><div class="roles" id="ro-cards"></div><ul class="log" id="ro-log"></ul><div class="row" style="margin-top:10px"><button type="button" class="pri" id="ro-next" hidden>Next round</button></div></div>`,
init(r){let S;
 const reset=()=>{const n=segVal(r,'ro-n');S={n,gov:0,round:1,coins:{},taken:{},picks:0,log:[]};rolesFor(n).forEach(k=>S.coins[k]=0);draw()};
 const order=()=>{const o=[];if(S.n===2){for(let i=0;i<6;i++)o.push((S.gov+i)%2)}else for(let i=0;i<S.n;i++)o.push((S.gov+i)%S.n);return o};
 const draw=()=>{const ord=order(),done=S.picks>=ord.length,who=done?null:ord[S.picks];
  $('#ro-who',r).innerHTML=done?`Round ${S.round} is over.`:`Round ${S.round} · Governor: <b>${NAMES[S.gov]}</b> · <b>${NAMES[who]}</b> chooses a role.`;
  $('#ro-cards',r).innerHTML=rolesFor(S.n).map(k=>{const d=ROLEDEF[k],t=S.taken[k]!==undefined;return `<button type="button" class="role${t?' taken':''}" data-k="${k}" ${t||done?'disabled':''}><b>${d.n}</b><small>${d.a}</small><small>Advantage: ${d.p}</small><span class="coins">${'<span class="coin">1</span>'.repeat(S.coins[k])}${t?`<small>taken by ${NAMES[S.taken[k]]}</small>`:''}</span></button>`}).join('');
  $$('#ro-cards .role',r).forEach(b=>b.onclick=()=>pick(b.dataset.k,who));
  $('#ro-log',r).innerHTML=S.log.map(l=>`<li class="${l.c||''}">${l.t}</li>`).join('');
  $('#ro-next',r).hidden=!done};
 const pick=(k,p)=>{const d=ROLEDEF[k];S.taken[k]=p;const c=S.coins[k];S.coins[k]=0;
  let seq;if(k.startsWith('av'))seq=`only ${NAMES[p]} acts`;else{const o=[];for(let i=0;i<S.n;i++)o.push((p+i)%S.n);seq=o.map((x,i)=>NAMES[x]+(i===0?' (advantage)':'')).join(' → ')}
  S.log.push({t:`<b>${NAMES[p]}</b> takes the <b>${d.n}</b>${c?` and pockets ${c} coin${c>1?'s':''}`:''}. Order of play: ${seq}.`});
  S.picks++;
  if(S.picks>=order().length){const left=rolesFor(S.n).filter(x=>S.taken[x]===undefined);left.forEach(x=>S.coins[x]++);
   S.log.push({c:'okk',t:`End of the round: ${NAMES[S.gov]} places 1 coin on ${left.map(x=>ROLEDEF[x].n).join(', ')}. The Governor card passes to ${NAMES[(S.gov+1)%S.n]}.`})}
  draw()};
 $('#ro-next',r).onclick=()=>{S.gov=(S.gov+1)%S.n;S.round++;S.taken={};S.picks=0;S.log=[];draw()};
 $('#ro-reset',r).onclick=reset;wireSeg(r,'ro-n',reset);reset()}};

/* --- Planter --- */
LABS.plant={html:()=>`<div class="lab"><h3>Mini-game: a Planting phase</h3><p class="hint">4 players. Ana is the Planter, Carla has an occupied Builders Yard. Play each player in turn: click a tile or pass. The simulator refuses illegal choices.</p>
<div id="pl-tiles" class="row"></div><p id="pl-who" style="margin:10px 0 4px;font-weight:600"></p><div class="row"><button type="button" id="pl-pass">Pass</button><button type="button" id="pl-new">New situation</button></div><ul class="log" id="pl-log"></ul></div>`,
init(r){let S;const PL=['Ana','Bruno','Carla','Diego'];
 const stack=()=>shuffle([].concat(Array(12).fill('f'),Array(11).fill('s'),Array(10).fill('c'),Array(9).fill('t'),Array(8).fill('k')));
 const reset=()=>{S={pile:stack(),vis:[],q:5,turn:0,log:[],done:false};S.vis=S.pile.splice(0,5);draw()};
 const draw=()=>{$('#pl-tiles',r).innerHTML=S.vis.map((g,i)=>`<button type="button" data-i="${i}">${G[g]}</button>`).join('')+`<button type="button" data-q="1" ${S.q?'':'disabled'}>Quarry (${S.q})</button>`;
  $('#pl-who',r).innerHTML=S.done?'Phase over.':`<b>${PL[S.turn]}</b>${S.turn===0?' (Planter)':S.turn===2?' (occupied Builders Yard)':''} chooses.`;
  $$('#pl-tiles button',r).forEach(b=>b.onclick=()=>take(b));$('#pl-pass',r).disabled=S.done;
  $('#pl-log',r).innerHTML=S.log.map(l=>`<li class="${l.c||''}">${l.t}</li>`).join('')};
 const next=()=>{S.turn++;if(S.turn>=4){S.done=true;const d=S.vis.length;S.vis=S.pile.splice(0,5);S.log.push({c:'okk',t:`End of the phase: Ana (Planter) discards ${d} remaining Estate${d>1?'s':''} and flips 5 new ones (players + 1).`})}draw()};
 const take=b=>{if(S.done)return;const p=PL[S.turn];
  if(b.dataset.q){if(S.turn!==0&&S.turn!==2){S.log.push({c:'err',t:`${p} cannot take a Quarry: it is the Planter's advantage, or you need an occupied Builders Yard.`});return draw()}
   S.q--;S.log.push({t:`${p} takes a Quarry${S.turn===0?' (Planter advantage)':' (thanks to the Builders Yard)'}.`});return next()}
  const g=S.vis.splice(+b.dataset.i,1)[0];S.log.push({t:`${p} takes a ${GN1[g]} Estate and places it, without a worker, on an empty Countryside space.`});next()};
 $('#pl-pass',r).onclick=()=>{if(S.done)return;S.log.push({t:`${PL[S.turn]} passes.`});next()};$('#pl-new',r).onclick=reset;reset()}};

/* --- Recruiter --- */
LABS.recruit={html:()=>`<div class="lab"><h3>Mini-game: sharing out and refilling the Register</h3><p class="hint">Set the number of players and workers on the Work Register. The Recruiter is first in the list.</p>
<div class="row"><label class="f">Players${numIn('rc-n',4,2,5)}</label><label class="f">Workers on the Register${numIn('rc-w',6,0,30)}</label></div><div class="out" id="rc-out"></div>
<h3>Refilling the Register at the end of the phase</h3><div class="row"><label class="f">Empty semicircles on Buildings (all players)${numIn('rc-e',2,0,60)}</label><label class="f">Workers left in the supply${numIn('rc-s',20,0,95)}</label></div><div class="out" id="rc-out2"></div></div>`,
init(r){const go=()=>{const n=Math.min(5,Math.max(2,num(r,'rc-n'))),w=num(r,'rc-w'),get=Array(n).fill(0);for(let i=0;i<w;i++)get[i%n]++;get[0]++;
 $('#rc-out',r).innerHTML=`<table><tr><th>Player</th><th class="c">Workers received</th></tr>${get.map((g,i)=>`<tr><td>${NAMES[i]}${i===0?' (Recruiter: 1 from the supply + Register)':''}</td><td class="c">${g}</td></tr>`).join('')}</table>`;
 const e=num(r,'rc-e'),s=num(r,'rc-s'),need=Math.max(n,e),o=$('#rc-out2',r);
 o.className='out '+(s<need?'bad':'ok');
 o.innerHTML=`The Recruiter must place <b>${need}</b> worker${need>1?'s':''} (${e} empty semicircle${e>1?'s':''}, minimum ${n}).`+(s<need?` <b>The supply only has ${s}: the game will end at the end of this round.</b>`:` The supply is enough (${s}).`)};
 $$('input',r).forEach(i=>i.oninput=go);go()}};

/* --- Builder --- */
LABS.build={html:()=>`<div class="lab"><h3>Mini-game: what does this Building cost?</h3><p class="hint">Choose a Building and your situation.</p>
<div class="row"><label class="f">Building<select id="bd-b">${B.filter(b=>b.set==='base').map(b=>`<option value="${b.id}">${b.fr} (${b.cost})</option>`).join('')}</select></label>
<label class="f">Occupied Quarries${numIn('bd-q',2,0,8)}</label><label class="f">Empty City spaces${numIn('bd-free',6,0,12)}</label></div>
<div class="row" style="margin-top:6px"><label class="chk"><input type="checkbox" id="bd-pri" checked> I am the Builder</label><label class="chk"><input type="checkbox" id="bd-own"> I already own it</label></div><div class="out" id="bd-out"></div></div>`,
init(r){const go=()=>{const b=BI[$('#bd-b',r).value],q=num(r,'bd-q'),pri=$('#bd-pri',r).checked,own=$('#bd-own',r).checked,free=num(r,'bd-free'),o=$('#bd-out',r);
 if(own){o.className='out bad';o.innerHTML='Impossible: you never build the same Building twice.';return}
 if(free===0){o.className='out bad';o.innerHTML='Impossible: your City is full, you can no longer take the Builder action.';return}
 if(b.kind==='large'&&free<2){o.className='out bad';o.innerHTML='Impossible: a Large Building takes 2 adjacent spaces.';return}
 const cap=b.row,qq=Math.min(q,cap),p=Math.max(0,b.cost-qq-(pri?1:0));
 o.className='out ok';o.innerHTML=`<span class="big">${p} coin${p>1?'s':''}</span><br>Cost ${b.cost} − ${qq} Quarr${qq>1?'ies':'y'} (cap ${cap}: ${b.kind==='large'?'Large Building':`section ${b.row}`})${pri?' − 1 (advantage)':''}${b.cost-qq-(pri?1:0)<0?' → raised to 0':''}.${q>cap?` <span class="muted">Your other ${q-cap} Quarries don't help here.</span>`:''}${free-(b.kind==='large'?2:1)===0?' <b>This Building fills your City: the game will end at the end of the round.</b>':''}`};
 $$('input,select',r).forEach(i=>{i.oninput=go;i.onchange=go});go()}};

/* --- Craftsman --- */
LABS.prod={html:()=>`<div class="lab"><h3>Mini-game: what do I produce?</h3><p class="hint">For each Good: occupied Estates, and workers in Production Buildings of that type.</p>
<div class="tw"><table><tr><th>Good</th><th>Occupied Estates</th><th>Workers in Buildings</th><th class="c">Barrels</th></tr>
${GOODS.map(g=>`<tr><td>${G[g]}</td><td>${numIn('pd-p'+g,g==='c'?2:g==='s'?3:g==='t'?2:0,0,12)}</td><td>${g==='c'?'<span class="muted">no Building</span>':numIn('pd-b'+g,g==='s'?3:g==='t'?1:0,0,4)}</td><td class="c" id="pd-o${g}"></td></tr>`).join('')}</table></div>
<div class="row"><label class="chk"><input type="checkbox" id="pd-fac"> Occupied Factory</label><label class="chk"><input type="checkbox" id="pd-art" checked> I am the Craftsman</label></div><div class="out" id="pd-out"></div></div>`,
init(r){const go=()=>{let types=0,tot=0;const made=[];GOODS.forEach(g=>{const p=num(r,'pd-p'+g),b=g==='c'?p:num(r,'pd-b'+g),n=Math.min(p,b);$('#pd-o'+g,r).innerHTML=n?`<b>${n}</b>`:'0';if(n){types++;tot+=n;made.push(g)}});
 const fac=$('#pd-fac',r).checked,art=$('#pd-art',r).checked,fc=[0,0,1,2,3,5][types];
 let t=`You produce <b>${tot}</b> barrel${tot>1?'s':''} of ${types} type${types>1?'s':''}.`;
 if(art)t+=made.length?` Advantage: at the end of the phase, 1 more barrel among ${made.map(g=>GN1[g]).join(', ')}.`:` Nothing produced: no bonus barrel.`;
 if(fac)t+=` Factory: <b>${fc}</b> coin${fc>1?'s':''}.`;
 $('#pd-out',r).innerHTML=t};$$('input',r).forEach(i=>{i.oninput=go;i.onchange=go});go()}};

/* --- Trader --- */
LABS.trade={html:()=>`<div class="lab"><h3>Mini-game: the Trading House</h3><p class="hint">Choose your Buildings, then click a barrel to sell. Each click is a different player selling 1 barrel.</p>
<div class="house" id="tr-h"></div>
<div class="row"><label class="chk"><input type="checkbox" id="tr-pri"> Trader (advantage)</label><label class="chk"><input type="checkbox" id="tr-off"> Office</label><label class="chk"><input type="checkbox" id="tr-sm"> Small Market</label><label class="chk"><input type="checkbox" id="tr-lm"> Large Market</label></div>
<div class="row" style="margin-top:8px">${GOODS.map(g=>`<button type="button" data-g="${g}">Sell ${G[g]}</button>`).join('')}</div>
<div class="row" style="margin-top:8px"><button type="button" id="tr-end">End of the phase</button><button type="button" id="tr-new">New situation</button></div><ul class="log" id="tr-log"></ul></div>`,
init(r){let H=[],L=[];
 const draw=()=>{$('#tr-h',r).innerHTML=[0,1,2,3].map(i=>`<div class="slot">${H[i]?bl(H[i]):''}</div>`).join('');$('#tr-log',r).innerHTML=L.map(l=>`<li class="${l.c||''}">${l.t}</li>`).join('')};
 const reset=()=>{H=shuffle(GOODS.slice()).slice(0,rnd(3));L=[];draw()};
 $$('[data-g]',r).forEach(b=>b.onclick=()=>{const g=b.dataset.g,off=$('#tr-off',r).checked;
  if(H.length>=4){L.unshift({c:'err',t:`Refused: the Trading House is full (4 barrels). Nobody else sells this phase.`});return draw()}
  if(H.includes(g)&&!off){L.unshift({c:'err',t:`Refused: there is already ${GN1[g]} in the Trading House. You would need an occupied Office.`});return draw()}
  const pri=$('#tr-pri',r).checked,sm=$('#tr-sm',r).checked,lm=$('#tr-lm',r).checked;let c=PRICE[g],d=[`${PRICE[g]} (price)`];
  if(pri){c++;d.push('1 (advantage)')}if(sm){c++;d.push('1 (Small Market)')}if(lm){c+=2;d.push('2 (Large Market)')}
  H.push(g);L.unshift({c:'okk',t:`Sale of ${GN1[g]}${H.includes(g)&&H.filter(x=>x===g).length>1?' (duplicate allowed by the Office)':''}: <b>${c} coin${c>1?'s':''}</b> = ${d.join(' + ')}.`});
  if(pri){$('#tr-pri',r).checked=false;L[0].t+=' The advantage is used up: the next players sell without it.'}draw()});
 $('#tr-end',r).onclick=()=>{if(H.length>=4){H=[];L.unshift({c:'okk',t:'End of the phase: the Trading House was full, the Trader empties it.'})}else L.unshift({t:`End of the phase: the Trading House is not full (${H.length}/4), its barrels stay for next time.`});draw()};
 $('#tr-new',r).onclick=reset;reset()}};

/* --- storage --- */
LABS.store={html:()=>`<div class="lab"><h3>Mini-game: what may I keep?</h3><p class="hint">End of the Shipment phase. Enter how many barrels of each type you keep, then check.</p>
<div class="row"><label class="chk"><input type="checkbox" id="st-sw"> Occupied Small Warehouse</label><label class="chk"><input type="checkbox" id="st-lw"> Occupied Large Warehouse</label><button type="button" id="st-new">New situation</button></div>
<div class="tw" style="margin-top:8px"><table id="st-t"></table></div><div class="row"><button type="button" class="pri" id="st-ok">Check</button></div><div class="out" id="st-out"></div></div>`,
init(r){let H;
 const W=()=>($('#st-sw',r).checked?1:0)+($('#st-lw',r).checked?2:0);
 const reset=()=>{H={};GOODS.forEach(g=>H[g]=0);let n=0;while(n<3){const g=GOODS[rnd(5)];if(!H[g]){H[g]=1+rnd(4);n++}}
  $('#st-t',r).innerHTML=`<tr><th>Good</th><th class="c">You have</th><th class="c">You keep</th></tr>`+GOODS.filter(g=>H[g]).map(g=>`<tr><td>${G[g]}</td><td class="c">${H[g]}</td><td class="c">${numIn('st-k'+g,0,0,H[g])}</td></tr>`).join('');
  $('#st-out',r).className='out';$('#st-out',r).textContent='';};
 const best=w=>{const ks=GOODS.filter(g=>H[g]).sort((a,b)=>H[b]-H[a]||PRICE[b]-PRICE[a]);const full=ks.slice(0,w),rest=ks.slice(w).sort((a,b)=>PRICE[b]-PRICE[a]);return {full,one:rest[0]||null,n:full.reduce((s,g)=>s+H[g],0)+(rest[0]?1:0)}};
 $('#st-ok',r).onclick=()=>{const w=W(),k={};let bad=null;GOODS.filter(g=>H[g]).forEach(g=>{k[g]=Math.min(H[g],num(r,'st-k'+g))});
  const kept=GOODS.filter(g=>k[g]>0).sort((a,b)=>k[b]-k[a]);const rest=kept.slice(w).reduce((s,g)=>s+k[g],0);const o=$('#st-out',r);const b=best(w);
  const tot=kept.reduce((s,g)=>s+k[g],0),lost=GOODS.reduce((s,g)=>s+H[g]-(k[g]||0),0);
  if(rest>1){o.className='out bad';o.innerHTML=`Not allowed. ${w?`Your Warehouses cover ${w} whole type${w>1?'s':''}, and`:'Without a Warehouse,'} you only keep 1 more barrel. A legal example: ${b.full.map(g=>`all the ${GN1[g]} (${H[g]})`).concat(b.one?[`1 ${GN1[b.one]}`]:[]).join(' + ')}.`}
  else{o.className='out ok';o.innerHTML=`Legal: you keep ${tot} barrel${tot>1?'s':''} and return ${lost} to the supply.${tot<b.n?` You could have kept up to ${b.n}.`:''}`}};
 $('#st-new',r).onclick=reset;$$('#st-sw,#st-lw',r).forEach(i=>i.onchange=()=>{$('#st-out',r).textContent=''});reset()}};

/* --- small building cards --- */
const CARDNOTE={smk:'With an occupied Large Market: +3 in total. Even a sold Corn then earns coins.',byd:'A Planter with a Builders Yard does not take two Quarries. With the Hacienda, the face-down tile stays an Estate.',hac:'The drawn tile is placed at once and cannot be refused. Your normal action follows.',swh:'You must still load everything you can during the phase.',hos:'The worker can only go on the tile you just placed (with the Hacienda, either of the two).',off:'Another player with an Office may also add the same type, if there is room.',lmk:'Applies to every sale to the Trading House, advantage or not.',lwh:'With the Small Warehouse: 3 whole types + 1 barrel.',fac:'Only the number of different types counts, not the quantities.',sch:'A single worker, even for a Building with 3 semicircles.',har:'Every load counts: several loading turns = several VP.',wha:'The Chartered Ship has no limit, accepts a type already on a Cargo Ship, and all barrels of that type must go.'};
LABS.cards={html:()=>`<div class="lab"><h3>Mini-game: Small Building cards</h3><p class="hint">Click a Building.</p><div class="row" id="cd-l">${['smk','byd','hac','swh','hos','off','lmk','lwh','fac','sch','har','wha'].map(i=>`<button type="button" data-b="${i}">${BI[i].fr}</button>`).join('')}</div><div class="out" id="cd-o">Choose a Building.</div></div>`,
init(r){$$('#cd-l button',r).forEach(b=>b.onclick=()=>{$$('#cd-l button',r).forEach(x=>x.classList.remove('sel'));b.classList.add('sel');const d=BI[b.dataset.b];
 $('#cd-o',r).innerHTML=`<b>${d.fr}</b><br>Cost ${d.cost} · ${d.vp} VP · section ${d.row} · phase: ${d.ph}<br>${d.fx}<br><span class="muted">Good to know: ${CARDNOTE[d.id]}</span>`})}};

/* --- large buildings --- */
LABS.large={html:()=>`<div class="lab"><h3>Mini-game: a Large Building's bonus</h3><p class="hint">The Large Building is assumed to be occupied. It scores 4 VP + this bonus.</p>
<div class="row"><label class="f">Building<select id="lg-b">${['fst','res','frt','cus','cth'].map(i=>`<option value="${i}">${BI[i].fr}</option>`).join('')}</select></label><span id="lg-in" class="row"></span></div><div class="out" id="lg-o"></div></div>`,
init(r){const IN={fst:`<label class="f">Small Production Buildings${numIn('lg-a',1,0,4)}</label><label class="f">Large Production Buildings${numIn('lg-c',3,0,4)}</label>`,res:`<label class="f">Filled Countryside spaces${numIn('lg-a',10,0,12)}</label>`,frt:`<label class="f">Workers on your Island${numIn('lg-a',22,0,99)}</label>`,cus:`<label class="f">VP in chips${numIn('lg-a',30,0,200)}</label>`,cth:`<label class="f">Commercial Buildings (City Hall included)${numIn('lg-a',7,1,12)}</label>`};
 const calc=()=>{const k=$('#lg-b',r).value,a=num(r,'lg-a');let v;
  if(k==='fst')v=a+2*num(r,'lg-c');else if(k==='res')v=a===0?0:a<=9?4:a-6;else if(k==='frt')v=Math.floor(a/3);else if(k==='cus')v=Math.floor(a/4);else v=a;
  $('#lg-o',r).innerHTML=`Bonus: <b>${v} VP</b>, that is <span class="big">${v+4} VP</span> in total for this Building.`};
 const sw=()=>{$('#lg-in',r).innerHTML=IN[$('#lg-b',r).value];$$('#lg-in input',r).forEach(i=>i.oninput=calc);calc()};$('#lg-b',r).onchange=sw;sw()}};

/* --- game end --- */
LABS.endsim={html:()=>`<div class="lab"><h3>Mini-game: is the end triggered?</h3><div class="row">
<label class="f">Players${numIn('en-n',4,2,5)}</label><label class="f">Workers in the supply (end of Recruitment)${numIn('en-s',6,0,95)}</label><label class="f">Workers to place on the Register${numIn('en-w',5,0,60)}</label>
<label class="f">Filled City spaces (furthest player)${numIn('en-c',11,0,12)}</label><label class="f">VP chips left${numIn('en-v',3,0,126)}</label></div><div class="out" id="en-o"></div></div>`,
init(r){const go=()=>{const n=num(r,'en-n'),s=num(r,'en-s'),w=Math.max(n,num(r,'en-w')),c=num(r,'en-c'),v=num(r,'en-v'),why=[];
 if(s<w)why.push(`the supply (${s}) cannot refill the Register (${w})`);if(c>=12)why.push('a player has filled all 12 City spaces');if(v<=0)why.push('the last VP chip has been taken');
 const o=$('#en-o',r);o.className='out '+(why.length?'bad':'ok');o.innerHTML=why.length?`<b>End triggered</b>: ${why.join('; ')}. Finish the current round, then score.`:'The game goes on.'};$$('input',r).forEach(i=>i.oninput=go);go()}};
