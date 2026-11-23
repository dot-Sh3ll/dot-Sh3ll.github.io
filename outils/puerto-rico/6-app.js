
/* ---------- tutoriel ---------- */
const ST=LS.get('pr1897-tuto',{done:{},cur:CH[0].id,q:{}});ST.done=ST.done||{};ST.q=ST.q||{};
const saveST=()=>LS.set('pr1897-tuto',ST);
function progress(){const d=CH.filter(c=>ST.done[c.id]).length;$('#bar').style.width=(100*d/CH.length)+'%';$('#barlabel').textContent=`${d} chapitre${d>1?'s':''} validé${d>1?'s':''} sur ${CH.length}`}
function toc(){let h='',part='';CH.forEach((c,i)=>{if(c.part!==part){part=c.part;h+=`<li class="part">${part}</li>`}h+=`<li><a href="#${c.id}" data-id="${c.id}" class="${ST.cur===c.id?'on':''}"><span class="n">${i+1}</span><span>${c.t}</span>${ST.done[c.id]?'<span class="tick" aria-label="validé">✓</span>':''}</a></li>`});$('#toclist').innerHTML=h;
 $$('#toclist a').forEach(a=>a.onclick=e=>{e.preventDefault();show(a.dataset.id,true);$('#toc').classList.remove('open');$('#tocbtn').setAttribute('aria-expanded','false');$('#tocbtn').textContent='Afficher le sommaire'})}
function qBlock(list,kind,cid){return `<div class="qs">${list.map((x,i)=>{const key=`${cid}:${kind}${i}`,st=ST.q[key];return `<div class="q${kind==='c'?' case':''}" data-k="${key}" data-a="${x.a}">${kind==='c'?'<span class="tag">Que fais-tu ?</span>':''}<div class="qt">${x.q}</div><div class="opts">${x.o.map((o,j)=>`<button type="button" data-j="${j}" class="${st&&st.picked&&st.picked.includes(j)?(j===x.a?'right':'wrong'):''}">${o}</button>`).join('')}</div><div class="why" ${st&&st.ok?'':'hidden'}>${x.w}</div></div>`}).join('')}</div>`}
function show(id,scroll){const c=CH.find(x=>x.id===id)||CH[0];ST.cur=c.id;saveST();const i=CH.indexOf(c),prev=CH[i-1],next=CH[i+1];
 let h=`<section class="ch on" id="ch-${c.id}"><div class="eyebrow">${c.part} · étape ${i+1} sur ${CH.length}</div><h1>${c.t}</h1><p class="lead">${c.lead}</p>
 <h2>Les points de règle</h2><ol class="rules">${c.rules.map(x=>`<li>${x}</li>`).join('')}</ol>${c.html||''}${c.lab?`<div id="labhost">${LABS[c.lab].html()}</div>`:''}`;
 if(c.cas&&c.cas.length)h+=`<h2>Cas pratiques</h2>${qBlock(c.cas,'c',c.id)}`;
 if(c.quiz&&c.quiz.length)h+=`<h2>Vérifie que c'est acquis</h2>${qBlock(c.quiz,'q',c.id)}<div id="qscore" class="score"></div>`;
 h+=`<div id="donebox"></div><div class="pager">${prev?`<button type="button" data-go="${prev.id}">← ${prev.t}</button>`:'<span></span>'}${next?`<button type="button" class="pri" data-go="${next.id}">${next.t} →</button>`:`<button type="button" class="pri" data-tab="aide">Ouvrir l'aide-mémoire →</button>`}</div></section>`;
 const R=$('#read');R.innerHTML=h;if(c.lab)LABS[c.lab].init($('#labhost'));
 $$('.q',R).forEach(q=>$$('.opts button',q).forEach(b=>b.onclick=()=>{const k=q.dataset.k,a=+q.dataset.a,j=+b.dataset.j,st=ST.q[k]||(ST.q[k]={picked:[]});if(st.picked.includes(j))return;st.picked.push(j);
  b.classList.add(j===a?'right':'wrong');if(j===a){st.ok=true;if(st.picked.length===1)st.first=true}$('.why',q).hidden=false;
  if(j!==a){$('.why',q).innerHTML=`<b>Pas tout à fait.</b> Essaie une autre réponse.`;$('.why',q).hidden=false}else $('.why',q).innerHTML=(q.classList.contains('case')?c.cas:c.quiz)[+k.split(':')[1].slice(1)].w;
  saveST();check(c)}));
 $$('[data-go]',R).forEach(b=>b.onclick=()=>show(b.dataset.go,true));$$('[data-tab]',R).forEach(b=>b.onclick=()=>tab(b.dataset.tab));
 check(c);toc();progress();if(location.hash!=='#'+c.id)history.replaceState(null,'','#'+c.id);if(scroll)window.scrollTo(0,0)}
function check(c){const all=[...(c.quiz||[]).map((_,i)=>`${c.id}:q${i}`),...(c.cas||[]).map((_,i)=>`${c.id}:c${i}`)];const ok=all.filter(k=>ST.q[k]&&ST.q[k].ok).length,first=all.filter(k=>ST.q[k]&&ST.q[k].first).length;
 const sc=$('#qscore');if(sc)sc.textContent=ok?`${ok} question${ok>1?'s':''} sur ${all.length} résolue${ok>1?'s':''}, dont ${first} du premier coup.`:'';
 if(ok===all.length&&all.length&&!ST.done[c.id]){ST.done[c.id]=1;saveST();toc();progress()}
 $('#donebox').innerHTML=ST.done[c.id]?`<div class="done-banner">✓ Chapitre validé.</div>`:''}
$('#tocbtn').onclick=()=>{const o=$('#toc').classList.toggle('open');$('#tocbtn').setAttribute('aria-expanded',o);$('#tocbtn').textContent=o?'Masquer le sommaire':'Afficher le sommaire'};
window.addEventListener('hashchange',()=>{const id=location.hash.slice(1);if(CH.some(c=>c.id===id)&&id!==ST.cur){tab('learn');show(id,true)}});

/* ---------- aide-mémoire ---------- */
function aide(){const roles=[['Paysan','Chacun prend 1 plantation face visible.','Carrière au lieu d\'une plantation.','Fin : défausser et révéler joueurs + 1.'],
 ['Recruteur','Le Registre se distribue 1 par 1 depuis le Recruteur ; on pose et réorganise les ouvriers.','+1 ouvrier de la réserve.','Fin : Registre = emplacements vides des bâtiments, min. le nombre de joueurs.'],
 ['Bâtisseur','Chacun peut acheter 1 bâtiment.','−1 Peso.','Carrières occupées : −1 chacune, plafond 1/2/3/4 selon la rangée.'],
 ['Producteur','Chacun produit.','+1 baril d\'une marchandise produite.','Maïs : plantation seule. Autres : plantation + bâtiment.'],
 ['Marchand','Chacun peut vendre 1 baril.','+1 Peso.','4 places, pas de doublon (sauf Comptoir) ; vidée si pleine.'],
 ['Capitaine','Chargement obligatoire, en rotation, 1 type par tour.','+1 PV une fois dans la phase.','Puis 1 baril gardé (+ entrepôts) ; navires pleins vidés.'],
 ['Aventurier','Aucune.','+1 Peso.','0 à 3 joueurs, 1 à 2 ou 4 joueurs, 2 à 5 joueurs.']];
 const SU=[['Pesos par joueur',3,2,3,4],['Jetons PV',65,75,100,126],['Personnages',7,6,7,8],['Navires (cales)','4 · 6','4 · 5 · 6','5 · 6 · 7','6 · 7 · 8'],['Plantations visibles',3,4,5,6],['Registre / réserve d\'ouvriers','2 / 40','3 / 55','4 / 75','5 / 95'],['Plantations de départ','F, M','F, F, M','F, F, M, M','F, F, F, M, M']];
 $('#aide').innerHTML=`<div class="eyebrow">Aide-mémoire</div><h1>Puerto Rico 1897 en une page</h1>
 <div class="toolbar"><a href="#am-tour">Tour</a> · <a href="#am-roles">Personnages</a> · <a href="#am-mep">Mise en place</a> · <a href="#am-prix">Prix</a> · <a href="#am-fin">Fin</a> · <a href="#am-bat">Bâtiments</a></div>
 <h2 id="am-tour">Un tour</h2><ol><li>Le Gouverneur choisit un personnage, agit avec le privilège, puis chacun fait l'action dans le sens horaire.</li><li>Le joueur suivant choisit un autre personnage, etc. : un personnage chacun (trois chacun à deux joueurs).</li><li>Fin de tour : 1 Peso sur chaque personnage non choisi, les personnages reviennent, la carte Gouverneur passe à gauche.</li></ol>
 <h2 id="am-roles">Les personnages</h2><div class="tw"><table><tr><th>Personnage</th><th>Action pour tous</th><th>Privilège</th><th>À retenir</th></tr>${roles.map(x=>`<tr><td><b>${x[0]}</b></td><td>${x[1]}</td><td>${x[2]}</td><td>${x[3]}</td></tr>`).join('')}</table></div>
 <h2 id="am-mep">Mise en place</h2><div class="tw"><table><tr><th></th><th class="c">2 joueurs</th><th class="c">3</th><th class="c">4</th><th class="c">5</th></tr>${SU.map(x=>`<tr><td>${x[0]}</td>${x.slice(1).map(v=>`<td class="c">${v}</td>`).join('')}</tr>`).join('')}</table></div>
 <p class="small muted">F = Fruits, M = Maïs, dans l'ordre depuis le Gouverneur. À deux : 1 exemplaire de chaque bâtiment beige et 2 de chaque bâtiment industriel, 3 tuiles de chaque type de Terrain et 2 barils de chaque marchandise retirés.</p>
 <h2 id="am-prix">Prix et réductions</h2><div class="tw"><table><tr><th>Marchandise</th>${GOODS.map(g=>`<td class="c">${G[g]}</td>`).join('')}</tr><tr><th>Prix de vente</th>${GOODS.map(g=>`<td class="c">${PRICE[g]}</td>`).join('')}</tr></table></div>
 <p>Carrières occupées : −1 Peso chacune, au plus <b>1</b> (1re rangée), <b>2</b> (2e), <b>3</b> (3e), <b>4</b> (grands bâtiments). Bâtisseur : −1. Jamais sous 0.</p>
 <h2 id="am-fin">Fin de partie</h2><p>À la fin du tour où : la réserve ne peut plus remplir le Registre, <b>ou</b> un joueur a rempli ses 12 cases Ville, <b>ou</b> le dernier jeton PV est pris. Score = jetons PV + PV des bâtiments + bonus des grands bâtiments occupés. Égalité : Pesos + barils.</p>
 <h2 id="am-bat">Bâtiments</h2><p class="small muted">Dans l'ordre du plateau, rangée par rangée ; l'extension I à la fin, par coût.</p><div class="filters2"><div class="seg" id="am-set"><button type="button" data-v="all" class="sel">Tous</button><button type="button" data-v="base">Jeu de base</button><button type="button" data-v="e1">Extension I</button><button type="button" data-v="e2">Extension II</button></div><input type="search" id="am-q" placeholder="Chercher un bâtiment…" aria-label="Chercher un bâtiment"></div><div class="cards" id="am-cards"></div>`;
 let set='all';const norm=t=>t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'');
 const draw=()=>{const q=norm($('#am-q').value||'');$('#am-cards').innerHTML=B.filter(b=>(set==='all'||b.set===set)&&(!q||norm(b.fr+' '+b.en+' '+b.fx).includes(q))).sort((a,b)=>BOARDORD.indexOf(a.id)-BOARDORD.indexOf(b.id)).map(b=>`<div class="bcard" style="--bc:${b.kind==='prod'?`var(--${{f:'fruit',s:'sugar',t:'tob',k:'cof'}[b.good]})`:KC[b.kind]}"><div class="hd"><div><div class="nm">${b.fr}</div><div class="en">${b.en}</div></div><div class="meta"><span class="coin gold" title="Coût">${b.cost}</span>${vp(b.vp)}</div></div><div class="set">${SETN[b.set]} · ${b.kind==='large'?'grand bâtiment':`rangée ${b.row}`} · ${b.ph}</div><div class="fx">${b.fx}</div><div class="slots">${b.slots?`${b.slots} emplacement${b.slots>1?'s':''}`:'aucun emplacement'}</div></div>`).join('')||'<p class="muted">Aucun bâtiment trouvé.</p>'};
 $$('#am-set button').forEach(b=>b.onclick=()=>{$$('#am-set button').forEach(x=>x.classList.remove('sel'));b.classList.add('sel');set=b.dataset.v;draw()});$('#am-q').oninput=draw;draw();
 $$('#aide .toolbar a').forEach(a=>a.onclick=e=>{e.preventDefault();const t=$(a.getAttribute('href'));if(t)t.scrollIntoView({behavior:'smooth'})})}

/* ---------- décompte ---------- */
const SC=LS.get('pr1897-score',null)||{n:4,e1:false,e2:false,p:[]};
function scP(i){return SC.p[i]||(SC.p[i]={name:NAMES[i],chips:0,own:[],occ:{},x:{},cit:0,tie:0})}
function bonus(p,id){const o=p.own,x=p.x[id]||0;switch(id){
 case 'fst':return o.filter(k=>BI[k].kind==='prod'&&BI[k].sz==='s').length+2*o.filter(k=>(BI[k].kind==='prod'&&BI[k].sz==='l')||k==='tai').length;
 case 'res':return x<=0?0:x<=9?4:x-6;case 'frt':return Math.floor(x/3);case 'cus':return Math.floor((p.chips||0)/4);
 case 'cth':return o.filter(k=>BI[k].kind!=='prod').length;case 'cat':return [0,1,3,6,10][Math.min(4,x)];case 'tsq':return p.cit||0;default:return 0}}
const XIN={res:'Cases Parcelle remplies',frt:'Ouvriers et bourgeois sur le domaine',cat:'Séries de 3 tuiles identiques'};
function total(p){let t=(+p.chips||0),d=[`${+p.chips||0} en jetons`];const bv=p.own.reduce((s,k)=>s+BI[k].vp,0);t+=bv;d.push(`${bv} de bâtiments`);
 let lb=0;p.own.filter(k=>BI[k].kind==='large'&&p.occ[k]).forEach(k=>lb+=bonus(p,k));if(lb){t+=lb;d.push(`${lb} de bonus`)}if(SC.e2&&p.cit){t+=+p.cit;d.push(`${p.cit} de bourgeois`)}return {t,d}}
const GRPOPEN={};
function score(){const y=window.scrollY;const sets=['base'].concat(SC.e1?['e1']:[],SC.e2?['e2']:[]);
 $('#score').innerHTML=`<div class="eyebrow">Décompte</div><h1>Calculer les scores</h1><p class="lead">Coche les bâtiments de chacun ; pour les grands bâtiments occupés, l'appli calcule le bonus. Tout reste enregistré dans ce navigateur.</p>
 <div class="toolbar">Joueurs ${seg('sc-n',[2,3,4,5],SC.n)}<label class="chk"><input type="checkbox" id="sc-e1" ${SC.e1?'checked':''}> Extension I</label><label class="chk"><input type="checkbox" id="sc-e2" ${SC.e2?'checked':''}> Extension II (bourgeois)</label><button type="button" id="sc-reset">Tout effacer</button></div>
 <div class="pcards">${Array.from({length:SC.n},(_,i)=>{const p=scP(i);p.own=p.own.filter(k=>sets.includes(BI[k].set));
  const grp=(kind,lab)=>{const gk=i+kind,op=gk in GRPOPEN?GRPOPEN[gk]:kind!=='small';return `<details class="grp" data-gk="${gk}" ${op?'open':''}><summary>${lab}</summary><div class="bchips">${B.filter(b=>b.kind===kind&&sets.includes(b.set)).map(b=>`<button type="button" data-p="${i}" data-b="${b.id}" class="${p.own.includes(b.id)?'sel':''}">${b.fr} · ${b.vp}</button>`).join('')}</div></details>`};
  const larges=p.own.filter(k=>BI[k].kind==='large'&&k!=='mon');
  return `<div class="pcard"><div class="row" style="justify-content:space-between"><input type="text" value="${esc(p.name)}" data-p="${i}" data-f="name" aria-label="Nom du joueur ${i+1}" style="font-weight:700;width:150px"><span class="tot" id="sc-t${i}"></span></div>
  <div class="row" style="margin:8px 0"><label class="f">PV en jetons<input type="number" min="0" value="${p.chips||0}" data-p="${i}" data-f="chips"></label>${SC.e2?`<label class="f">Bourgeois<input type="number" min="0" value="${p.cit||0}" data-p="${i}" data-f="cit"></label>`:''}<label class="f">Pesos + barils<input type="number" min="0" value="${p.tie||0}" data-p="${i}" data-f="tie"></label></div>
  ${grp('prod','Bâtiments industriels')}${grp('small','Petits bâtiments beiges')}${grp('large','Grands bâtiments')}
  ${larges.map(k=>`<div class="row small" style="margin:4px 0"><label class="chk"><input type="checkbox" data-p="${i}" data-occ="${k}" ${p.occ[k]?'checked':''}> ${BI[k].fr} occupé</label>${XIN[k]&&p.occ[k]?`<label class="f">${XIN[k]}<input type="number" min="0" value="${p.x[k]||0}" data-p="${i}" data-x="${k}"></label>`:''}<span class="muted" id="sc-b${i}${k}"></span></div>`).join('')}
  <p class="small muted" id="sc-d${i}"></p></div>`}).join('')}</div><h2>Classement</h2><ol class="rank" id="sc-rank"></ol>`;
 const upd=()=>{LS.set('pr1897-score',SC);const res=[];for(let i=0;i<SC.n;i++){const p=scP(i),r=total(p);$('#sc-t'+i).textContent=r.t+' PV';$('#sc-d'+i).textContent=r.d.join(' + ');
   p.own.filter(k=>BI[k].kind==='large'&&k!=='mon').forEach(k=>{const e=$(`#sc-b${i}${k}`);if(e)e.textContent=p.occ[k]?`bonus +${bonus(p,k)}`:'non occupé : 4 PV seulement'});res.push({n:p.name,t:r.t,tie:+p.tie||0})}
  res.sort((a,b)=>b.t-a.t||b.tie-a.tie);$('#sc-rank').innerHTML=res.map((r,i)=>`<li><b>${i+1}.</b> ${esc(r.n)} <span style="margin-left:auto"><b>${r.t} PV</b>${res.some((o,j)=>j!==i&&o.t===r.t)?` <span class="muted small">(départage : ${r.tie})</span>`:''}</span></li>`).join('')};
 wireSeg($('#score'),'sc-n',()=>{SC.n=segVal($('#score'),'sc-n');score()});
 $('#sc-e1').onchange=e=>{SC.e1=e.target.checked;score()};$('#sc-e2').onchange=e=>{SC.e2=e.target.checked;score()};
 $('#sc-reset').onclick=()=>{if(SC.p.length&&!confirm('Effacer tous les scores ?'))return;SC.p=[];score()};
 $$('#score [data-b]').forEach(b=>b.onclick=()=>{const p=scP(+b.dataset.p),k=b.dataset.b,i=p.own.indexOf(k);if(i>=0){p.own.splice(i,1);delete p.occ[k]}else{p.own.push(k);if(BI[k].kind==='large'&&k!=='mon')p.occ[k]=true}score()});
 $$('#score [data-occ]').forEach(c=>c.onchange=()=>{scP(+c.dataset.p).occ[c.dataset.occ]=c.checked;score()});
 $$('#score [data-x]').forEach(c=>c.oninput=()=>{scP(+c.dataset.p).x[c.dataset.x]=Math.max(0,+c.value||0);upd()});
 $$('#score [data-f]').forEach(c=>c.oninput=()=>{const p=scP(+c.dataset.p),f=c.dataset.f;p[f]=f==='name'?c.value:Math.max(0,+c.value||0);upd()});
 $$('#score details.grp').forEach(d=>d.ontoggle=()=>{GRPOPEN[d.dataset.gk]=d.open});
 upd();window.scrollTo(0,y)}

/* ---------- onglets, thème, démarrage ---------- */
function tab(t){$$('.tabs button').forEach(b=>b.setAttribute('aria-selected',b.dataset.tab===t));$$('.tab').forEach(x=>x.classList.toggle('on',x.id==='tab-'+t));LS.set('pr1897-tab',t);window.scrollTo(0,0)}
$$('.tabs button').forEach(b=>b.onclick=()=>tab(b.dataset.tab));
const TH=['auto','dark','light'];let th=LS.get('pr1897-theme','auto');
const applyTh=()=>{if(th==='auto')document.documentElement.removeAttribute('data-theme');else document.documentElement.setAttribute('data-theme',th);$('#theme').title='Thème : '+{auto:'automatique',dark:'sombre',light:'clair'}[th]};
$('#theme').onclick=()=>{th=TH[(TH.indexOf(th)+1)%3];LS.set('pr1897-theme',th);applyTh()};applyTh();
aide();score();
const h=location.hash.slice(1);show(CH.some(c=>c.id===h)?h:ST.cur,false);
if(!CH.some(c=>c.id===h))tab(LS.get('pr1897-tab','learn'));
})();
</script>
<footer class="page small muted" style="padding-top:0">Aide de jeu de fan, gratuite et non officielle, sans lien avec Ravensburger ni alea. Puerto Rico 1897 © Andreas Seyfarth / Ravensburger. Règles résumées d'après le livret de règles français.</footer>
</body>
</html>
