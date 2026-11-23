
/* ---------- ateliers ---------- */
const NAMES=['Ana','Bruno','Carla','Diego','Elena'];
const ROLEDEF={pla:{n:'Paysan',a:'Une plantation chacun',p:'Carrière possible'},bat:{n:'Bâtisseur',a:'Un bâtiment chacun',p:'−1 Peso'},rec:{n:'Recruteur',a:'Ouvriers du Registre',p:'+1 ouvrier'},
 art:{n:'Producteur',a:'Production',p:'+1 baril'},neg:{n:'Marchand',a:'Vente d\'1 baril',p:'+1 Peso'},cap:{n:'Capitaine',a:'Chargement obligatoire',p:'+1 PV'},av1:{n:'Aventurier',a:'Aucune action',p:'+1 Peso'},av2:{n:'Aventurier',a:'Aucune action',p:'+1 Peso'}};
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
LABS.setup={html:()=>`<div class="lab"><h3>Atelier : la mise en place de ta table</h3><p class="hint">Choisis le nombre de joueurs.</p>${seg('su-n',[2,3,4,5],4)}<div class="tw" id="su-out" style="margin-top:12px"></div></div>`,
init(r){const go=()=>{const n=segVal(r,'su-n');const D={
 2:{co:3,pl:'Gouverneur : Fruits ; autre joueur : Maïs',vp:65,qu:'5 (on en retire 3)',vis:3,ro:'7 (un seul Aventurier)',sh:'4 et 6',reg:2,sup:40,ba:'1 de chaque bâtiment beige, 2 de chaque bâtiment industriel',ex:'Retire 3 tuiles de chaque type de Terrain (Maïs, Fruits, Sucre, Tabac, Café, Carrière) et 2 barils de chaque marchandise.'},
 3:{co:2,pl:'Fruits, Fruits, Maïs',vp:75,qu:8,vis:4,ro:'6 (sans Aventurier)',sh:'4, 5 et 6',reg:3,sup:55,ba:'Les 49 bâtiments'},
 4:{co:3,pl:'Fruits, Fruits, Maïs, Maïs',vp:100,qu:8,vis:5,ro:'7 (un seul Aventurier)',sh:'5, 6 et 7',reg:4,sup:75,ba:'Les 49 bâtiments'},
 5:{co:4,pl:'Fruits, Fruits, Fruits, Maïs, Maïs',vp:126,qu:8,vis:6,ro:'8 (les deux Aventuriers)',sh:'6, 7 et 8',reg:5,sup:95,ba:'Les 49 bâtiments'}}[n];
 $('#su-out',r).innerHTML=`<table><tr><th>Élément</th><th>${n} joueurs</th></tr>
 <tr><td>Pesos par joueur</td><td>${D.co}</td></tr><tr><td>Plantations de départ (depuis le Gouverneur)</td><td>${D.pl}</td></tr>
 <tr><td>Jetons PV</td><td>${D.vp}</td></tr><tr><td>Carrières</td><td>${D.qu}</td></tr><tr><td>Plantations face visible</td><td>${D.vis}</td></tr>
 <tr><td>Cartes personnage</td><td>${D.ro}</td></tr><tr><td>Navires</td><td>${D.sh} cales</td></tr><tr><td>Ouvriers sur le Registre</td><td>${D.reg}</td></tr>
 <tr><td>Ouvriers dans la réserve</td><td>${D.sup}</td></tr><tr><td>Bâtiments</td><td>${D.ba}</td></tr>${D.ex?`<tr><td>À retirer</td><td>${D.ex}</td></tr>`:''}</table>`};
 wireSeg(r,'su-n',go);go()}};

/* --- un tour --- */
LABS.round={html:()=>`<div class="lab"><h3>Atelier : joue un tour</h3><p class="hint">Chaque joueur choisit un personnage à son tour : clique sur une carte. Observe l'ordre d'action de chaque phase, puis les Pesos posés en fin de tour.</p>
<div class="row">${seg('ro-n',[2,3,4,5],4)}<button type="button" id="ro-reset">Recommencer</button></div>
<p id="ro-who" style="margin:12px 0 4px;font-weight:600"></p><div class="roles" id="ro-cards"></div><ul class="log" id="ro-log"></ul><div class="row" style="margin-top:10px"><button type="button" class="pri" id="ro-next" hidden>Tour suivant</button></div></div>`,
init(r){let S;
 const reset=()=>{const n=segVal(r,'ro-n');S={n,gov:0,round:1,coins:{},taken:{},picks:0,log:[]};rolesFor(n).forEach(k=>S.coins[k]=0);draw()};
 const order=()=>{const o=[];if(S.n===2){for(let i=0;i<6;i++)o.push((S.gov+i)%2)}else for(let i=0;i<S.n;i++)o.push((S.gov+i)%S.n);return o};
 const draw=()=>{const ord=order(),done=S.picks>=ord.length,who=done?null:ord[S.picks];
  $('#ro-who',r).innerHTML=done?`Tour ${S.round} terminée.`:`Tour ${S.round} · Gouverneur : <b>${NAMES[S.gov]}</b> · À <b>${NAMES[who]}</b> de choisir un personnage.`;
  $('#ro-cards',r).innerHTML=rolesFor(S.n).map(k=>{const d=ROLEDEF[k],t=S.taken[k]!==undefined;return `<button type="button" class="role${t?' taken':''}" data-k="${k}" ${t||done?'disabled':''}><b>${d.n}</b><small>${d.a}</small><small>Privilège : ${d.p}</small><span class="coins">${'<span class="coin">1</span>'.repeat(S.coins[k])}${t?`<small>pris par ${NAMES[S.taken[k]]}</small>`:''}</span></button>`}).join('');
  $$('#ro-cards .role',r).forEach(b=>b.onclick=()=>pick(b.dataset.k,who));
  $('#ro-log',r).innerHTML=S.log.map(l=>`<li class="${l.c||''}">${l.t}</li>`).join('');
  $('#ro-next',r).hidden=!done};
 const pick=(k,p)=>{const d=ROLEDEF[k];S.taken[k]=p;const c=S.coins[k];S.coins[k]=0;
  let seq;if(k.startsWith('av'))seq=`seul ${NAMES[p]} agit`;else{const o=[];for(let i=0;i<S.n;i++)o.push((p+i)%S.n);seq=o.map((x,i)=>NAMES[x]+(i===0?' (privilège)':'')).join(' → ')}
  S.log.push({t:`<b>${NAMES[p]}</b> prend le <b>${d.n}</b>${c?` et empoche ${c} Peso${c>1?'s':''}`:''}. Ordre d'action : ${seq}.`});
  S.picks++;
  if(S.picks>=order().length){const left=rolesFor(S.n).filter(x=>S.taken[x]===undefined);left.forEach(x=>S.coins[x]++);
   S.log.push({c:'okk',t:`Fin de tour : ${NAMES[S.gov]} pose 1 Peso sur ${left.map(x=>ROLEDEF[x].n).join(', ')}. La carte Gouverneur passe à ${NAMES[(S.gov+1)%S.n]}.`})}
  draw()};
 $('#ro-next',r).onclick=()=>{S.gov=(S.gov+1)%S.n;S.round++;S.taken={};S.picks=0;S.log=[];draw()};
 $('#ro-reset',r).onclick=reset;wireSeg(r,'ro-n',reset);reset()}};

/* --- Paysan --- */
LABS.plant={html:()=>`<div class="lab"><h3>Atelier : une phase du Paysan</h3><p class="hint">4 joueurs. Ana est le Paysan, Carla a un Dépôt de Matériaux occupé. Fais jouer chaque joueur à son tour : clique sur une tuile ou passe. Le simulateur refuse les choix interdits.</p>
<div id="pl-tiles" class="row"></div><p id="pl-who" style="margin:10px 0 4px;font-weight:600"></p><div class="row"><button type="button" id="pl-pass">Passer</button><button type="button" id="pl-new">Nouvelle situation</button></div><ul class="log" id="pl-log"></ul></div>`,
init(r){let S;const PL=['Ana','Bruno','Carla','Diego'];
 const stack=()=>shuffle([].concat(Array(12).fill('f'),Array(11).fill('s'),Array(10).fill('c'),Array(9).fill('t'),Array(8).fill('k')));
 const reset=()=>{S={pile:stack(),vis:[],q:5,turn:0,log:[],done:false};S.vis=S.pile.splice(0,5);draw()};
 const draw=()=>{$('#pl-tiles',r).innerHTML=S.vis.map((g,i)=>`<button type="button" data-i="${i}">${G[g]}</button>`).join('')+`<button type="button" data-q="1" ${S.q?'':'disabled'}>Carrière (${S.q})</button>`;
  $('#pl-who',r).innerHTML=S.done?'Phase terminée.':`À <b>${PL[S.turn]}</b>${S.turn===0?' (Paysan)':S.turn===2?' (Dépôt de Matériaux occupé)':''} de choisir.`;
  $$('#pl-tiles button',r).forEach(b=>b.onclick=()=>take(b));$('#pl-pass',r).disabled=S.done;
  $('#pl-log',r).innerHTML=S.log.map(l=>`<li class="${l.c||''}">${l.t}</li>`).join('')};
 const next=()=>{S.turn++;if(S.turn>=4){S.done=true;const d=S.vis.length;S.vis=S.pile.splice(0,5);S.log.push({c:'okk',t:`Fin de phase : Ana (Paysan) défausse ${d} plantation${d>1?'s':''} restante${d>1?'s':''} et en révèle 5 nouvelles (joueurs + 1).`})}draw()};
 const take=b=>{if(S.done)return;const p=PL[S.turn];
  if(b.dataset.q){if(S.turn!==0&&S.turn!==2){S.log.push({c:'err',t:`${p} ne peut pas prendre de Carrière : c'est le privilège du Paysan, ou il faut un Dépôt de Matériaux occupé.`});return draw()}
   S.q--;S.log.push({t:`${p} prend une Carrière${S.turn===0?' (privilège du Paysan)':' (grâce au Dépôt de Matériaux)'}.`});return next()}
  const g=S.vis.splice(+b.dataset.i,1)[0];S.log.push({t:`${p} prend une plantation de ${GN1[g]} et la pose, sans ouvrier, sur une case Parcelle vide.`});next()};
 $('#pl-pass',r).onclick=()=>{if(S.done)return;S.log.push({t:`${PL[S.turn]} passe.`});next()};$('#pl-new',r).onclick=reset;reset()}};

/* --- Recruteur --- */
LABS.recruit={html:()=>`<div class="lab"><h3>Atelier : distribuer et remplir le Registre</h3><p class="hint">Règle le nombre de joueurs et d'ouvriers sur le Registre. Le Recruteur est le premier de la liste.</p>
<div class="row"><label class="f">Joueurs${numIn('rc-n',4,2,5)}</label><label class="f">Ouvriers sur le Registre${numIn('rc-w',6,0,30)}</label></div><div class="out" id="rc-out"></div>
<h3>Remplir le Registre en fin de phase</h3><div class="row"><label class="f">Emplacements vides sur les bâtiments (tous joueurs)${numIn('rc-e',2,0,60)}</label><label class="f">Ouvriers restant dans la réserve${numIn('rc-s',20,0,95)}</label></div><div class="out" id="rc-out2"></div></div>`,
init(r){const go=()=>{const n=Math.min(5,Math.max(2,num(r,'rc-n'))),w=num(r,'rc-w'),get=Array(n).fill(0);for(let i=0;i<w;i++)get[i%n]++;get[0]++;
 $('#rc-out',r).innerHTML=`<table><tr><th>Joueur</th><th class="c">Ouvriers reçus</th></tr>${get.map((g,i)=>`<tr><td>${NAMES[i]}${i===0?' (Recruteur : 1 de la réserve + Registre)':''}</td><td class="c">${g}</td></tr>`).join('')}</table>`;
 const e=num(r,'rc-e'),s=num(r,'rc-s'),need=Math.max(n,e),o=$('#rc-out2',r);
 o.className='out '+(s<need?'bad':'ok');
 o.innerHTML=`Le Recruteur doit poser <b>${need}</b> ouvrier${need>1?'s':''} (${e} emplacement${e>1?'s':''} vide${e>1?'s':''}, minimum ${n}).`+(s<need?` <b>La réserve n'en a que ${s} : la partie s'achèvera à la fin de ce tour.</b>`:` La réserve suffit (${s}).`)};
 $$('input',r).forEach(i=>i.oninput=go);go()}};

/* --- Bâtisseur --- */
LABS.build={html:()=>`<div class="lab"><h3>Atelier : combien coûte ce bâtiment ?</h3><p class="hint">Choisis un bâtiment et ta situation.</p>
<div class="row"><label class="f">Bâtiment<select id="bd-b">${B.filter(b=>b.set==='base').map(b=>`<option value="${b.id}">${b.fr} (${b.cost})</option>`).join('')}</select></label>
<label class="f">Carrières occupées${numIn('bd-q',2,0,8)}</label><label class="f">Cases Ville libres${numIn('bd-free',6,0,12)}</label></div>
<div class="row" style="margin-top:6px"><label class="chk"><input type="checkbox" id="bd-pri" checked> Je suis le Bâtisseur</label><label class="chk"><input type="checkbox" id="bd-own"> Je l'ai déjà</label></div><div class="out" id="bd-out"></div></div>`,
init(r){const go=()=>{const b=BI[$('#bd-b',r).value],q=num(r,'bd-q'),pri=$('#bd-pri',r).checked,own=$('#bd-own',r).checked,free=num(r,'bd-free'),o=$('#bd-out',r);
 if(own){o.className='out bad';o.innerHTML='Impossible : on ne construit jamais deux fois le même bâtiment.';return}
 if(free===0){o.className='out bad';o.innerHTML='Impossible : ta Ville est pleine, tu ne peux plus faire l\'action Bâtisseur.';return}
 if(b.kind==='large'&&free<2){o.className='out bad';o.innerHTML='Impossible : un grand bâtiment occupe 2 cases adjacentes.';return}
 const cap=b.row,qq=Math.min(q,cap),p=Math.max(0,b.cost-qq-(pri?1:0));
 o.className='out ok';o.innerHTML=`<span class="big">${p} Peso${p>1?'s':''}</span><br>Coût ${b.cost} − ${qq} Carrière${qq>1?'s':''} (plafond ${cap} : ${b.kind==='large'?'grand bâtiment':`rangée ${b.row}`})${pri?' − 1 (privilège)':''}${b.cost-qq-(pri?1:0)<0?' → ramené à 0':''}.${q>cap?` <span class="muted">Tes ${q-cap} autres Carrières ne servent pas ici.</span>`:''}${free-(b.kind==='large'?2:1)===0?' <b>Ce bâtiment remplit ta Ville : la partie s\'achèvera à la fin du tour.</b>':''}`};
 $$('input,select',r).forEach(i=>{i.oninput=go;i.onchange=go});go()}};

/* --- Producteur --- */
LABS.prod={html:()=>`<div class="lab"><h3>Atelier : qu'est-ce que je produis ?</h3><p class="hint">Pour chaque marchandise : plantations occupées, et ouvriers dans les bâtiments industriels de ce type.</p>
<div class="tw"><table><tr><th>Marchandise</th><th>Plantations occupées</th><th>Ouvriers dans les bâtiments</th><th class="c">Barils</th></tr>
${GOODS.map(g=>`<tr><td>${G[g]}</td><td>${numIn('pd-p'+g,g==='c'?2:g==='s'?3:g==='t'?2:0,0,12)}</td><td>${g==='c'?'<span class="muted">aucun bâtiment</span>':numIn('pd-b'+g,g==='s'?3:g==='t'?1:0,0,4)}</td><td class="c" id="pd-o${g}"></td></tr>`).join('')}</table></div>
<div class="row"><label class="chk"><input type="checkbox" id="pd-fac"> Usine occupée</label><label class="chk"><input type="checkbox" id="pd-art" checked> Je suis le Producteur</label></div><div class="out" id="pd-out"></div></div>`,
init(r){const go=()=>{let types=0,tot=0;const made=[];GOODS.forEach(g=>{const p=num(r,'pd-p'+g),b=g==='c'?p:num(r,'pd-b'+g),n=Math.min(p,b);$('#pd-o'+g,r).innerHTML=n?`<b>${n}</b>`:'0';if(n){types++;tot+=n;made.push(g)}});
 const fac=$('#pd-fac',r).checked,art=$('#pd-art',r).checked,fc=[0,0,1,2,3,5][types];
 let t=`Tu produis <b>${tot}</b> baril${tot>1?'x':''} de ${types} type${types>1?'s':''}.`;
 if(art)t+=made.length?` Privilège : à la fin de la phase, 1 baril de plus parmi ${made.map(g=>GN1[g]).join(', ')}.`:` Rien produit : pas de baril bonus.`;
 if(fac)t+=` Usine : <b>${fc}</b> Peso${fc>1?'s':''}.`;
 $('#pd-out',r).innerHTML=t};$$('input',r).forEach(i=>{i.oninput=go;i.onchange=go});go()}};

/* --- Marchand --- */
LABS.trade={html:()=>`<div class="lab"><h3>Atelier : la Maison de Commerce</h3><p class="hint">Choisis tes bâtiments, puis clique sur un baril à vendre. Chaque clic est un joueur différent qui vend 1 baril.</p>
<div class="house" id="tr-h"></div>
<div class="row"><label class="chk"><input type="checkbox" id="tr-pri"> Marchand (privilège)</label><label class="chk"><input type="checkbox" id="tr-off"> Comptoir</label><label class="chk"><input type="checkbox" id="tr-sm"> Petit Marché</label><label class="chk"><input type="checkbox" id="tr-lm"> Grand Marché</label></div>
<div class="row" style="margin-top:8px">${GOODS.map(g=>`<button type="button" data-g="${g}">Vendre ${G[g]}</button>`).join('')}</div>
<div class="row" style="margin-top:8px"><button type="button" id="tr-end">Fin de la phase</button><button type="button" id="tr-new">Nouvelle situation</button></div><ul class="log" id="tr-log"></ul></div>`,
init(r){let H=[],L=[];
 const draw=()=>{$('#tr-h',r).innerHTML=[0,1,2,3].map(i=>`<div class="slot">${H[i]?bl(H[i]):''}</div>`).join('');$('#tr-log',r).innerHTML=L.map(l=>`<li class="${l.c||''}">${l.t}</li>`).join('')};
 const reset=()=>{H=shuffle(GOODS.slice()).slice(0,rnd(3));L=[];draw()};
 $$('[data-g]',r).forEach(b=>b.onclick=()=>{const g=b.dataset.g,off=$('#tr-off',r).checked;
  if(H.length>=4){L.unshift({c:'err',t:`Refusé : la Maison est pleine (4 barils). Plus personne ne vend dans cette phase.`});return draw()}
  if(H.includes(g)&&!off){L.unshift({c:'err',t:`Refusé : il y a déjà du ${GN1[g]} dans la Maison. Il faudrait un Comptoir occupé.`});return draw()}
  const pri=$('#tr-pri',r).checked,sm=$('#tr-sm',r).checked,lm=$('#tr-lm',r).checked;let c=PRICE[g],d=[`${PRICE[g]} (prix)`];
  if(pri){c++;d.push('1 (privilège)')}if(sm){c++;d.push('1 (Petit Marché)')}if(lm){c+=2;d.push('2 (Grand Marché)')}
  H.push(g);L.unshift({c:'okk',t:`Vente de ${GN1[g]}${H.includes(g)&&H.filter(x=>x===g).length>1?' (doublon autorisé par le Comptoir)':''} : <b>${c} Peso${c>1?'s':''}</b> = ${d.join(' + ')}.`});
  if(pri){$('#tr-pri',r).checked=false;L[0].t+=' Le privilège est consommé : les joueurs suivants vendent sans lui.'}draw()});
 $('#tr-end',r).onclick=()=>{if(H.length>=4){H=[];L.unshift({c:'okk',t:'Fin de phase : la Maison était pleine, le Marchand la vide.'})}else L.unshift({t:`Fin de phase : la Maison n'est pas pleine (${H.length}/4), ses barils restent pour la prochaine fois.`});draw()};
 $('#tr-new',r).onclick=reset;reset()}};

/* --- stockage --- */
LABS.store={html:()=>`<div class="lab"><h3>Atelier : qu'ai-je le droit de garder ?</h3><p class="hint">Fin de la phase du Capitaine. Indique combien de barils tu gardes de chaque type, puis vérifie.</p>
<div class="row"><label class="chk"><input type="checkbox" id="st-sw"> Petit Entrepôt occupé</label><label class="chk"><input type="checkbox" id="st-lw"> Grand Entrepôt occupé</label><button type="button" id="st-new">Nouvelle situation</button></div>
<div class="tw" style="margin-top:8px"><table id="st-t"></table></div><div class="row"><button type="button" class="pri" id="st-ok">Vérifier</button></div><div class="out" id="st-out"></div></div>`,
init(r){let H;
 const W=()=>($('#st-sw',r).checked?1:0)+($('#st-lw',r).checked?2:0);
 const reset=()=>{H={};GOODS.forEach(g=>H[g]=0);let n=0;while(n<3){const g=GOODS[rnd(5)];if(!H[g]){H[g]=1+rnd(4);n++}}
  $('#st-t',r).innerHTML=`<tr><th>Marchandise</th><th class="c">Il te reste</th><th class="c">Tu gardes</th></tr>`+GOODS.filter(g=>H[g]).map(g=>`<tr><td>${G[g]}</td><td class="c">${H[g]}</td><td class="c">${numIn('st-k'+g,0,0,H[g])}</td></tr>`).join('');
  $('#st-out',r).className='out';$('#st-out',r).textContent='';};
 const best=w=>{const ks=GOODS.filter(g=>H[g]).sort((a,b)=>H[b]-H[a]||PRICE[b]-PRICE[a]);const full=ks.slice(0,w),rest=ks.slice(w).sort((a,b)=>PRICE[b]-PRICE[a]);return {full,one:rest[0]||null,n:full.reduce((s,g)=>s+H[g],0)+(rest[0]?1:0)}};
 $('#st-ok',r).onclick=()=>{const w=W(),k={};let bad=null;GOODS.filter(g=>H[g]).forEach(g=>{k[g]=Math.min(H[g],num(r,'st-k'+g))});
  const kept=GOODS.filter(g=>k[g]>0).sort((a,b)=>k[b]-k[a]);const rest=kept.slice(w).reduce((s,g)=>s+k[g],0);const o=$('#st-out',r);const b=best(w);
  const tot=kept.reduce((s,g)=>s+k[g],0),lost=GOODS.reduce((s,g)=>s+H[g]-(k[g]||0),0);
  if(rest>1){o.className='out bad';o.innerHTML=`Interdit. ${w?`Tes entrepôts couvrent ${w} type${w>1?'s':''} complet${w>1?'s':''}, et`:'Sans entrepôt,'} tu ne gardes qu'1 baril en plus. Exemple légal : ${b.full.map(g=>`tous les ${GN1[g]} (${H[g]})`).concat(b.one?[`1 ${GN1[b.one]}`]:[]).join(' + ')}.`}
  else{o.className='out ok';o.innerHTML=`Légal : tu gardes ${tot} baril${tot>1?'x':''} et en rends ${lost} à la réserve.${tot<b.n?` Tu aurais pu en garder jusqu'à ${b.n}.`:''}`}};
 $('#st-new',r).onclick=reset;$$('#st-sw,#st-lw',r).forEach(i=>i.onchange=()=>{$('#st-out',r).textContent=''});reset()}};

/* --- fiches des petits bâtiments --- */
const CARDNOTE={smk:'Avec un Grand Marché occupé : +3 au total. Même un Maïs vendu rapporte alors des Pesos.',byd:'Le Paysan qui a un Dépôt de Matériaux ne prend pas deux Carrières. Avec l\'Hacienda, la tuile face cachée reste une plantation.',hac:'La tuile tirée se pose aussitôt, sans possibilité de la refuser. Ton action normale suit.',swh:'Tu dois quand même charger tout ce que tu peux pendant la phase.',hos:'L\'ouvrier ne peut aller que sur la tuile que tu viens de poser.',off:'Un autre joueur avec un Comptoir peut aussi doubler le même type, s\'il reste de la place.',lmk:'S\'applique à chaque vente à la Maison de Commerce, privilège ou non.',lwh:'Avec le Petit Entrepôt : 3 types complets + 1 baril.',fac:'Seul compte le nombre de types différents, pas les quantités.',sch:'Un seul ouvrier, même pour un bâtiment à 3 emplacements.',har:'Chaque chargement compte : plusieurs tours de chargement = plusieurs PV.',wha:'Le navire privé n\'a pas de limite, accepte un type déjà présent sur un cargo, et tous les barils de ce type doivent partir.'};
LABS.cards={html:()=>`<div class="lab"><h3>Atelier : fiches des petits bâtiments</h3><p class="hint">Clique sur un bâtiment.</p><div class="row" id="cd-l">${['smk','byd','hac','swh','hos','off','lmk','lwh','fac','sch','har','wha'].map(i=>`<button type="button" data-b="${i}">${BI[i].fr}</button>`).join('')}</div><div class="out" id="cd-o">Choisis un bâtiment.</div></div>`,
init(r){$$('#cd-l button',r).forEach(b=>b.onclick=()=>{$$('#cd-l button',r).forEach(x=>x.classList.remove('sel'));b.classList.add('sel');const d=BI[b.dataset.b];
 $('#cd-o',r).innerHTML=`<b>${d.fr}</b> <span class="en">${d.en}</span><br>Coût ${d.cost} · ${d.vp} PV · rangée ${d.row} · phase : ${d.ph}<br>${d.fx}<br><span class="muted">À savoir : ${CARDNOTE[d.id]}</span>`})}};

/* --- grands bâtiments --- */
LABS.large={html:()=>`<div class="lab"><h3>Atelier : bonus d'un grand bâtiment</h3><p class="hint">Le grand bâtiment est supposé occupé. Il rapporte 4 PV + ce bonus.</p>
<div class="row"><label class="f">Bâtiment<select id="lg-b">${['fst','res','frt','cus','cth'].map(i=>`<option value="${i}">${BI[i].fr}</option>`).join('')}</select></label><span id="lg-in" class="row"></span></div><div class="out" id="lg-o"></div></div>`,
init(r){const IN={fst:`<label class="f">Petits bâtiments industriels${numIn('lg-a',1,0,4)}</label><label class="f">Grands bâtiments industriels${numIn('lg-c',3,0,4)}</label>`,res:`<label class="f">Cases Parcelle remplies${numIn('lg-a',10,0,12)}</label>`,frt:`<label class="f">Ouvriers sur ton domaine${numIn('lg-a',22,0,99)}</label>`,cus:`<label class="f">PV en jetons${numIn('lg-a',30,0,200)}</label>`,cth:`<label class="f">Bâtiments commerciaux (Palais du Gouverneur compris)${numIn('lg-a',7,1,12)}</label>`};
 const calc=()=>{const k=$('#lg-b',r).value,a=num(r,'lg-a');let v;
  if(k==='fst')v=a+2*num(r,'lg-c');else if(k==='res')v=a===0?0:a<=9?4:a-6;else if(k==='frt')v=Math.floor(a/3);else if(k==='cus')v=Math.floor(a/4);else v=a;
  $('#lg-o',r).innerHTML=`Bonus : <b>${v} PV</b>, soit <span class="big">${v+4} PV</span> au total pour ce bâtiment.`};
 const sw=()=>{$('#lg-in',r).innerHTML=IN[$('#lg-b',r).value];$$('#lg-in input',r).forEach(i=>i.oninput=calc);calc()};$('#lg-b',r).onchange=sw;sw()}};

/* --- fin de partie --- */
LABS.endsim={html:()=>`<div class="lab"><h3>Atelier : la fin est-elle déclenchée ?</h3><div class="row">
<label class="f">Joueurs${numIn('en-n',4,2,5)}</label><label class="f">Ouvriers dans la réserve (fin de Recruteur)${numIn('en-s',6,0,95)}</label><label class="f">Ouvriers à poser sur le Registre${numIn('en-w',5,0,60)}</label>
<label class="f">Cases Ville remplies (le plus avancé)${numIn('en-c',11,0,12)}</label><label class="f">Jetons PV restants${numIn('en-v',3,0,126)}</label></div><div class="out" id="en-o"></div></div>`,
init(r){const go=()=>{const n=num(r,'en-n'),s=num(r,'en-s'),w=Math.max(n,num(r,'en-w')),c=num(r,'en-c'),v=num(r,'en-v'),why=[];
 if(s<w)why.push(`la réserve (${s}) ne suffit pas à remplir le Registre (${w})`);if(c>=12)why.push('un joueur a rempli ses 12 cases Ville');if(v<=0)why.push('le dernier jeton PV a été pris');
 const o=$('#en-o',r);o.className='out '+(why.length?'bad':'ok');o.innerHTML=why.length?`<b>Fin déclenchée</b> : ${why.join(' ; ')}. On termine le tour en cours, puis on compte.`:'La partie continue.'};$$('input',r).forEach(i=>i.oninput=go);go()}};
