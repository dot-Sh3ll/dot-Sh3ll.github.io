
/* --- Shipment phase simulator --- */
const SHIPSC=[
 {id:'livret',t:'Rulebook example',d:'4 players. Anna is the Captain. The 6-hold ship already carries 3 Corn. Replay the example phase: on each turn, choose a Good, then a ship.',
  ships:[[5,null,0],[6,'c',3],[7,null,0]],pl:[{n:'Anna',cap:1,g:{c:2,s:6}},{n:'Benno',g:{s:2,t:3}},{n:'Clara',g:{c:2,t:1}},{n:'Donni',g:{c:1,f:5}}]},
 {id:'port',t:'Harbor and Wharf',d:'3 players. Rosa is the Captain and owns an occupied Harbor and Wharf. The Wharf is used once, whenever you choose during your turn.',
  ships:[[4,'t',1],[5,'s',2],[6,null,0]],pl:[{n:'Rosa',cap:1,har:1,wha:1,g:{t:5,s:2,c:1}},{n:'Tomás',g:{c:4,k:2}},{n:'Inés',g:{s:1,f:3}}]},
 {id:'bloque',t:'Crowded ships',d:'4 players. The Corn ship is full, the Coffee ship almost. Who can still load what?',
  ships:[[5,'k',4],[6,null,0],[7,'c',7]],pl:[{n:'You',cap:1,g:{c:3,k:2,f:1}},{n:'Luis',g:{c:2,s:4}},{n:'Mara',g:{t:6}},{n:'Pedro',g:{k:1,f:2}}]},
 {id:'hasard',t:'Random situation',d:'A new random situation each time you click "Start again".'}
];
function randomShip(){const n=3+rnd(2),caps=n===3?[4,5,6]:[5,6,7],types=shuffle(GOODS.slice()),ships=caps.map((c,i)=>{const r=Math.random();if(r<.45)return [c,null,0];const t=types[i];return [c,t,1+rnd(c-1)]});
 const pl=[];for(let i=0;i<n;i++){const g={};let k=0;while(k<2+rnd(2)){const t=GOODS[rnd(5)];if(!g[t]){g[t]=1+rnd(5);k++}}pl.push({n:NAMES[i],cap:i===0?1:0,har:Math.random()<.25?1:0,wha:Math.random()<.2?1:0,g})}return {ships,pl}}

LABS.ship={html:()=>`<div class="lab"><h3>Simulator: ship loading</h3>
<div class="row" id="sh-sc">${SHIPSC.map((s,i)=>`<button type="button" data-i="${i}" class="${i?'':'sel'}">${s.t}</button>`).join('')}</div>
<p class="hint" id="sh-d" style="margin-top:10px"></p>
<div class="ships" id="sh-ships"></div><div class="players" id="sh-pl"></div>
<p id="sh-who" style="font-weight:600;margin:6px 0"></p>
<div class="row"><button type="button" id="sh-wharf" hidden>Chartered Ship (Wharf)</button><button type="button" id="sh-pass">Pass</button><button type="button" id="sh-reset">Start again</button></div>
<ul class="log" id="sh-log"></ul></div>`,
init(r){let S,sc=0;
 const load=()=>{const D=SHIPSC[sc].id==='hasard'?randomShip():SHIPSC[sc];
  S={ships:D.ships.map(([cap,type,n])=>({cap,type,n})),pl:D.pl.map(p=>({n:p.n,cap:!!p.cap,har:!!p.har,wha:!!p.wha,whaUsed:false,g:Object.assign({c:0,f:0,s:0,t:0,k:0},p.g),vp:0,capBonus:false})),cur:0,sel:null,idle:0,log:[],over:false};
  $('#sh-d',r).textContent=SHIPSC[sc].d;advance(true)};
 const full=s=>s.n>=s.cap;
 /* legal loads of a type for a player: list of ships (English rulebook: the empty ship that takes the most barrels) */
 const legal=(p,g)=>{if(!p.g[g])return [];const own=S.ships.find(s=>s.type===g);if(own)return full(own)?[]:[own];
  const em=S.ships.filter(s=>!s.type);if(!em.length)return [];const best=Math.max(...em.map(s=>Math.min(p.g[g],s.cap)));return em.filter(s=>Math.min(p.g[g],s.cap)===best)};
 const canCargo=p=>GOODS.some(g=>legal(p,g).length);
 const canWharf=p=>p.wha&&!p.whaUsed&&GOODS.some(g=>p.g[g]);
 const log=(t,c)=>S.log.unshift({t,c});
 const advance=first=>{ // find the next player who can act
  if(!first){S.cur=(S.cur+1)%S.pl.length}
  for(let k=0;k<S.pl.length*2;k++){const p=S.pl[S.cur];
   if(S.idle>=S.pl.length){return finish()}
   if(canCargo(p)||canWharf(p)){S.sel=null;return draw()}
   log(`${p.n} cannot load anything.`);S.idle++;S.cur=(S.cur+1)%S.pl.length}
  finish()};
 const score=(p,n,how)=>{let v=n,d=[`${n} VP`];if(p.har){v++;d.push('1 (Harbor)')}if(p.cap&&!p.capBonus){v++;p.capBonus=true;d.push('1 (Captain advantage)')}p.vp+=v;return `${how}: <b>+${v} VP</b>${d.length>1?` (${d.join(' + ')})`:''}.`};
 const tryLoad=s=>{if(S.over)return;const p=S.pl[S.cur],g=S.sel;
  if(!g){log('First choose a Good in the active player\'s box.','err');return draw()}
  if(full(s)){log(`Refused: the ${s.cap}-hold ship is full.`,'err');return draw()}
  if(s.type&&s.type!==g){log(`Refused: this ship already carries ${GN1[s.type]}. A ship takes only one type.`,'err');return draw()}
  const own=S.ships.find(x=>x.type===g);
  if(!s.type&&own){log(`Refused: ${GN1[g]} already sails on the ${own.cap}-hold ship. No two ships ever carry the same type${full(own)?', even when that one is full':''}.`,'err');return draw()}
  const L=legal(p,g);if(!L.includes(s)){const b=L[0];log(`Refused: on the ${b.cap}-hold ship you would load ${Math.min(p.g[g],b.cap)} barrels, against ${Math.min(p.g[g],s.cap)} here. You must choose the empty ship that lets you load the most.`,'err');return draw()}
  const n=Math.min(p.g[g],s.cap-s.n);s.type=g;s.n+=n;p.g[g]-=n;S.idle=0;
  log(`${p.n} loads ${n} ${GN1[g]} onto the ${s.cap}-hold ship${p.g[g]?` (${p.g[g]} left over, the ship is full)`:''}. ${score(p,n,'Gain')}`,'okk');advance()};
 const useWharf=()=>{const p=S.pl[S.cur],g=S.sel;if(!g||!p.g[g]){log('First choose the Good to put on the Chartered Ship.','err');return draw()}
  const n=p.g[g];p.g[g]=0;p.whaUsed=true;S.idle=0;log(`${p.n} uses the Wharf: ${n} ${GN1[g]} leave on a Chartered Ship and go back to the supply. ${score(p,n,'Gain')}`,'okk');advance()};
 const pass=()=>{const p=S.pl[S.cur];if(S.over)return;
  if(canCargo(p)){const opts=GOODS.filter(g=>legal(p,g).length).map(g=>GN1[g]);log(`Refused: ${p.n} can load (${opts.join(', ')}). Loading is mandatory.`,'err');return draw()}
  log(`${p.n} keeps the Wharf for later and passes.`);S.idle++;advance()};
 const finish=()=>{S.over=true;const em=S.ships.filter(full);
  log(`Nobody can load anymore: loading is over. ${em.length?`The Captain empties ${em.map(s=>`the ${s.cap}-hold ship`).join(' and ')} (full).`:'No ship is full.'} ${S.ships.filter(s=>s.n&&!full(s)).map(s=>`The ${s.cap}-hold ship keeps its ${s.n} ${GN1[s.type]}.`).join(' ')} Then everyone keeps only 1 barrel (except with Warehouses).`,'okk');
  em.forEach(s=>{s.n=0;s.type=null});S.sel=null;draw()};
 const draw=()=>{const cur=S.pl[S.cur];
  $('#sh-ships',r).innerHTML=S.ships.map((s,i)=>`<button type="button" class="ship${full(s)?' full':''}" data-i="${i}"><span class="cap">${s.cap} holds${s.type?`<br>${G[s.type]}`:'<br><span class="muted">empty</span>'}</span><span class="holds">${Array.from({length:s.cap},(_,k)=>k<s.n?bl(s.type):'<span class="hold"></span>').join('')}</span></button>`).join('');
  $('#sh-pl',r).innerHTML=S.pl.map((p,i)=>`<div class="pl${i===S.cur&&!S.over?' cur':''}"><div class="nm">${p.n}${p.cap?'<span class="badge cap">Captain</span>':''}${p.har?'<span class="badge">Harbor</span>':''}${p.wha?`<span class="badge">Wharf${p.whaUsed?' used':''}</span>`:''}<span style="margin-left:auto">${vp(p.vp)}</span></div><div class="goods">${GOODS.filter(g=>p.g[g]).map(g=>`<button type="button" class="gbtn${i===S.cur&&S.sel===g?' sel':''}" data-p="${i}" data-g="${g}" ${i!==S.cur||S.over?'disabled':''}>${bl(g)} ${p.g[g]}</button>`).join('')||'<span class="muted small">nothing left</span>'}</div></div>`).join('');
  $('#sh-who',r).innerHTML=S.over?'Phase over. Choose another scenario or start again.':`<b>${cur.n}</b>'s turn: choose a Good, then a ship.`;
  $('#sh-wharf',r).hidden=S.over||!canWharf(cur);$('#sh-pass',r).disabled=S.over;
  $$('#sh-ships .ship',r).forEach(b=>b.onclick=()=>tryLoad(S.ships[+b.dataset.i]));
  $$('#sh-pl .gbtn',r).forEach(b=>b.onclick=()=>{S.sel=b.dataset.g;draw()});
  $('#sh-log',r).innerHTML=S.log.map(l=>`<li class="${l.c||''}">${l.t}</li>`).join('')};
 $('#sh-wharf',r).onclick=useWharf;$('#sh-pass',r).onclick=pass;$('#sh-reset',r).onclick=load;
 $$('#sh-sc button',r).forEach(b=>b.onclick=()=>{$$('#sh-sc button',r).forEach(x=>x.classList.remove('sel'));b.classList.add('sel');sc=+b.dataset.i;load()});
 load()}};
