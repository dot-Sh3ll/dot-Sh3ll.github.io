
/* --- simulateur de la phase du Capitaine --- */
const SHIPSC=[
 {id:'livret',t:'Exemple du livret',d:'4 joueurs. Anne est Capitaine. Le navire de 6 cales porte déjà 3 Maïs. Rejoue la phase de l\'exemple : à chaque tour, choisis une marchandise puis un navire.',
  ships:[[5,null,0],[6,'c',3],[7,null,0]],pl:[{n:'Anne',cap:1,g:{c:2,s:6}},{n:'Bernie',g:{s:2,t:3}},{n:'Christine',g:{c:2,t:1}},{n:'David',g:{c:1,f:5}}]},
 {id:'port',t:'Port et Chantier Naval',d:'3 joueurs. Rosa est Capitaine et possède un Port et un Chantier Naval occupés. Le Chantier Naval s\'utilise une fois, au moment de ton choix pendant ton tour.',
  ships:[[4,'t',1],[5,'s',2],[6,null,0]],pl:[{n:'Rosa',cap:1,har:1,wha:1,g:{t:5,s:2,c:1}},{n:'Tomás',g:{c:4,k:2}},{n:'Inés',g:{s:1,f:3}}]},
 {id:'bloque',t:'Navires encombrés',d:'4 joueurs. Le navire de Maïs est plein, celui de Café presque. Qui peut encore charger quoi ?',
  ships:[[5,'k',4],[6,null,0],[7,'c',7]],pl:[{n:'Toi',cap:1,g:{c:3,k:2,f:1}},{n:'Luis',g:{c:2,s:4}},{n:'Mara',g:{t:6}},{n:'Pedro',g:{k:1,f:2}}]},
 {id:'hasard',t:'Situation au hasard',d:'Une situation tirée au hasard à chaque clic sur « Recommencer ».'}
];
function randomShip(){const n=3+rnd(2),caps=n===3?[4,5,6]:[5,6,7],types=shuffle(GOODS.slice()),ships=caps.map((c,i)=>{const r=Math.random();if(r<.45)return [c,null,0];const t=types[i];return [c,t,1+rnd(c-1)]});
 const pl=[];for(let i=0;i<n;i++){const g={};let k=0;while(k<2+rnd(2)){const t=GOODS[rnd(5)];if(!g[t]){g[t]=1+rnd(5);k++}}pl.push({n:NAMES[i],cap:i===0?1:0,har:Math.random()<.25?1:0,wha:Math.random()<.2?1:0,g})}return {ships,pl}}

LABS.ship={html:()=>`<div class="lab"><h3>Atelier : simulateur de chargement</h3>
<div class="row" id="sh-sc">${SHIPSC.map((s,i)=>`<button type="button" data-i="${i}" class="${i?'':'sel'}">${s.t}</button>`).join('')}</div>
<p class="hint" id="sh-d" style="margin-top:10px"></p>
<div class="ships" id="sh-ships"></div><div class="players" id="sh-pl"></div>
<p id="sh-who" style="font-weight:600;margin:6px 0"></p>
<div class="row"><button type="button" id="sh-wharf" hidden>Navire privé (Chantier Naval)</button><button type="button" id="sh-pass">Passer</button><button type="button" id="sh-reset">Recommencer</button></div>
<ul class="log" id="sh-log"></ul></div>`,
init(r){let S,sc=0;
 const load=()=>{const D=SHIPSC[sc].id==='hasard'?randomShip():SHIPSC[sc];
  S={ships:D.ships.map(([cap,type,n])=>({cap,type,n})),pl:D.pl.map(p=>({n:p.n,cap:!!p.cap,har:!!p.har,wha:!!p.wha,whaUsed:false,g:Object.assign({c:0,f:0,s:0,t:0,k:0},p.g),vp:0,capBonus:false})),cur:0,sel:null,idle:0,log:[],over:false};
  $('#sh-d',r).textContent=SHIPSC[sc].d;advance(true)};
 const full=s=>s.n>=s.cap;
 /* chargements légaux d'un type pour un joueur : liste de navires */
 const legal=(p,g)=>{if(!p.g[g])return [];const own=S.ships.find(s=>s.type===g);if(own)return full(own)?[]:[own];
  const em=S.ships.filter(s=>!s.type);if(!em.length)return [];const big=Math.max(...em.map(s=>s.cap));return em.filter(s=>s.cap===big)};
 const canCargo=p=>GOODS.some(g=>legal(p,g).length);
 const canWharf=p=>p.wha&&!p.whaUsed&&GOODS.some(g=>p.g[g]);
 const log=(t,c)=>S.log.unshift({t,c});
 const advance=first=>{ // trouve le prochain joueur qui peut agir
  if(!first){S.cur=(S.cur+1)%S.pl.length}
  for(let k=0;k<S.pl.length*2;k++){const p=S.pl[S.cur];
   if(S.idle>=S.pl.length){return finish()}
   if(canCargo(p)||canWharf(p)){S.sel=null;return draw()}
   log(`${p.n} ne peut rien charger.`);S.idle++;S.cur=(S.cur+1)%S.pl.length}
  finish()};
 const score=(p,n,how)=>{let v=n,d=[`${n} PV`];if(p.har){v++;d.push('1 (Port)')}if(p.cap&&!p.capBonus){v++;p.capBonus=true;d.push('1 (privilège du Capitaine)')}p.vp+=v;return `${how} : <b>+${v} PV</b>${d.length>1?` (${d.join(' + ')})`:''}.`};
 const tryLoad=s=>{if(S.over)return;const p=S.pl[S.cur],g=S.sel;
  if(!g){log('Choisis d\'abord une marchandise dans le cadre du joueur actif.','err');return draw()}
  if(full(s)){log(`Refusé : le navire de ${s.cap} cales est plein.`,'err');return draw()}
  if(s.type&&s.type!==g){log(`Refusé : ce navire transporte déjà du ${GN1[s.type]}. Un navire ne prend qu'un type.`,'err');return draw()}
  const own=S.ships.find(x=>x.type===g);
  if(!s.type&&own){log(`Refusé : le ${GN1[g]} voyage déjà sur le navire de ${own.cap} cales. Deux navires ne portent jamais le même type${full(own)?', même si celui-ci est plein':''}.`,'err');return draw()}
  const L=legal(p,g);if(!L.includes(s)){const b=L[0];log(`Refusé : parmi les navires vides, tu dois prendre celui qui a la plus grande capacité (${b.cap} cales).`,'err');return draw()}
  const n=Math.min(p.g[g],s.cap-s.n);s.type=g;s.n+=n;p.g[g]-=n;S.idle=0;
  log(`${p.n} charge ${n} ${GN1[g]} sur le navire de ${s.cap} cales${p.g[g]?` (il lui en reste ${p.g[g]}, le navire est plein)`:''}. ${score(p,n,'Gain')}`,'okk');advance()};
 const useWharf=()=>{const p=S.pl[S.cur],g=S.sel;if(!g||!p.g[g]){log('Choisis d\'abord la marchandise à embarquer sur le navire privé.','err');return draw()}
  const n=p.g[g];p.g[g]=0;p.whaUsed=true;S.idle=0;log(`${p.n} utilise son Chantier Naval : ${n} ${GN1[g]} partent sur un navire privé et retournent à la réserve. ${score(p,n,'Gain')}`,'okk');advance()};
 const pass=()=>{const p=S.pl[S.cur];if(S.over)return;
  if(canCargo(p)){const opts=GOODS.filter(g=>legal(p,g).length).map(g=>GN1[g]);log(`Refusé : ${p.n} peut charger (${opts.join(', ')}). Le chargement est obligatoire.`,'err');return draw()}
  log(`${p.n} garde son Chantier Naval pour plus tard et passe.`);S.idle++;advance()};
 const finish=()=>{S.over=true;const em=S.ships.filter(full);
  log(`Plus personne ne peut charger : fin du chargement. ${em.length?`Le Capitaine vide ${em.map(s=>`le navire de ${s.cap}`).join(' et ')} (plein${em.length>1?'s':''}).`:'Aucun navire n\'est plein.'} ${S.ships.filter(s=>s.n&&!full(s)).map(s=>`Le navire de ${s.cap} garde ses ${s.n} ${GN1[s.type]}.`).join(' ')} Ensuite, chacun ne garde qu'1 baril (sauf entrepôts).`,'okk');
  em.forEach(s=>{s.n=0;s.type=null});S.sel=null;draw()};
 const draw=()=>{const cur=S.pl[S.cur];
  $('#sh-ships',r).innerHTML=S.ships.map((s,i)=>`<button type="button" class="ship${full(s)?' full':''}" data-i="${i}"><span class="cap">${s.cap} cales${s.type?`<br>${G[s.type]}`:'<br><span class="muted">vide</span>'}</span><span class="holds">${Array.from({length:s.cap},(_,k)=>k<s.n?bl(s.type):'<span class="hold"></span>').join('')}</span></button>`).join('');
  $('#sh-pl',r).innerHTML=S.pl.map((p,i)=>`<div class="pl${i===S.cur&&!S.over?' cur':''}"><div class="nm">${p.n}${p.cap?'<span class="badge cap">Capitaine</span>':''}${p.har?'<span class="badge">Port</span>':''}${p.wha?`<span class="badge">Chantier Naval${p.whaUsed?' utilisé':''}</span>`:''}<span style="margin-left:auto">${vp(p.vp)}</span></div><div class="goods">${GOODS.filter(g=>p.g[g]).map(g=>`<button type="button" class="gbtn${i===S.cur&&S.sel===g?' sel':''}" data-p="${i}" data-g="${g}" ${i!==S.cur||S.over?'disabled':''}>${bl(g)} ${p.g[g]}</button>`).join('')||'<span class="muted small">plus rien</span>'}</div></div>`).join('');
  $('#sh-who',r).innerHTML=S.over?'Phase terminée. Choisis un autre scénario ou recommence.':`Au tour de <b>${cur.n}</b> : choisis une marchandise, puis un navire.`;
  $('#sh-wharf',r).hidden=S.over||!canWharf(cur);$('#sh-pass',r).disabled=S.over;
  $$('#sh-ships .ship',r).forEach(b=>b.onclick=()=>tryLoad(S.ships[+b.dataset.i]));
  $$('#sh-pl .gbtn',r).forEach(b=>b.onclick=()=>{S.sel=b.dataset.g;draw()});
  $('#sh-log',r).innerHTML=S.log.map(l=>`<li class="${l.c||''}">${l.t}</li>`).join('')};
 $('#sh-wharf',r).onclick=useWharf;$('#sh-pass',r).onclick=pass;$('#sh-reset',r).onclick=load;
 $$('#sh-sc button',r).forEach(b=>b.onclick=()=>{$$('#sh-sc button',r).forEach(x=>x.classList.remove('sel'));b.classList.add('sel');sc=+b.dataset.i;load()});
 load()}};
