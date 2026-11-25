
/* ---------- fiches de salles (chapitre et onglet Salles) ---------- */
const SC_COL={A:'var(--secA)',B:'var(--secB)',C:'var(--secC)','?':'var(--secX)'};
const roomCard=x=>`<div class="rcard" style="--rc:${SC_COL[x.s]}"><div class="hd"><div class="nm">${x.fr}</div>${sect(x.s)}</div>
 <div class="meta"><span>n° ${String(x.n).padStart(2,'0')}</span>${x.obj?`<span>${[...x.obj].map(it).join('')}</span>`:''}${x.ic.map(k=>`<span>${k==='ordi'?ordi+' ':''}${ICN[k]}</span>`).join('')}</div>
 <div class="fx">${x.fx}</div>${x.pr.length?`<ul>${x.pr.map(p=>`<li>${p}</li>`).join('')}</ul>`:''}</div>`;

/* ---------- tutoriel ---------- */
const ST=LS.get('nemr-tuto',{done:{},cur:CH[0].id,q:{}});ST.done=ST.done||{};ST.q=ST.q||{};
const saveST=()=>LS.set('nemr-tuto',ST);
function progress(){const d=CH.filter(c=>ST.done[c.id]).length;$('#bar').style.width=(100*d/CH.length)+'%';$('#barlabel').textContent=`${d} chapitre${d>1?'s':''} validé${d>1?'s':''} sur ${CH.length}`}
function toc(){let h='',part='';CH.forEach((c,i)=>{if(c.part!==part){part=c.part;h+=`<li class="part">${part}</li>`}h+=`<li><a href="#${c.id}" data-id="${c.id}" class="${ST.cur===c.id?'on':''}"><span class="n">${i+1}</span><span>${c.t}</span>${ST.done[c.id]?'<span class="tick" aria-label="validé">✓</span>':''}</a></li>`});$('#toclist').innerHTML=h;
 $$('#toclist a').forEach(a=>a.onclick=e=>{e.preventDefault();show(a.dataset.id,true);$('#toc').classList.remove('open');$('#tocbtn').setAttribute('aria-expanded','false');$('#tocbtn').textContent='Afficher le sommaire'})}
function qBlock(list,kind,cid){return `<div class="qs">${list.map((x,i)=>{const key=`${cid}:${kind}${i}`,st=ST.q[key];return `<div class="q${kind==='c'?' case':''}" data-k="${key}" data-a="${x.a}">${kind==='c'?'<span class="tag">Que faites-vous ?</span>':''}<div class="qt">${x.q}</div><div class="opts">${x.o.map((o,j)=>`<button type="button" data-j="${j}" class="${st&&st.picked&&st.picked.includes(j)?(j===x.a?'right':'wrong'):''}">${o}</button>`).join('')}</div><div class="why" ${st&&st.ok?'':'hidden'}>${x.w}</div></div>`}).join('')}</div>`}
function show(id,scroll){const c=CH.find(x=>x.id===id)||CH[0];ST.cur=c.id;saveST();const i=CH.indexOf(c),prev=CH[i-1],next=CH[i+1];
 let h=`<section class="ch on" id="ch-${c.id}"><div class="eyebrow">${c.part} · étape ${i+1} sur ${CH.length}</div><h1>${c.t}</h1><p class="lead">${c.lead}</p>
 <h2>Les points de règle</h2><ol class="rules">${c.rules.map(x=>`<li>${x}</li>`).join('')}</ol>${c.html||''}${c.lab?`<div id="labhost">${LABS[c.lab].html()}</div>`:''}`;
 if(c.cas&&c.cas.length)h+=`<h2>Cas pratiques</h2>${qBlock(c.cas,'c',c.id)}`;
 if(c.quiz&&c.quiz.length)h+=`<h2>Vérifiez que c'est acquis</h2>${qBlock(c.quiz,'q',c.id)}<div id="qscore" class="score"></div>`;
 h+=`<div id="donebox"></div><div class="pager">${prev?`<button type="button" data-go="${prev.id}">← ${prev.t}</button>`:'<span></span>'}${next?`<button type="button" class="pri" data-go="${next.id}">${next.t} →</button>`:`<button type="button" class="pri" data-tab="aide">Ouvrir l'aide-mémoire →</button>`}</div></section>`;
 const R=$('#read');R.innerHTML=h;if(c.lab)LABS[c.lab].init($('#labhost'));
 const sc=$('#salles-ch');if(sc)sc.innerHTML=`<h2>Les 12 salles de section</h2><div class="cards">${SALLES.filter(x=>x.s!=='?').map(roomCard).join('')}</div><p class="small muted">Les salles aléatoires sont dans l'onglet <a href="#" data-tab="salles">Salles</a>.</p>`;
 $$('.q',R).forEach(q=>$$('.opts button',q).forEach(b=>b.onclick=()=>{const k=q.dataset.k,a=+q.dataset.a,j=+b.dataset.j,st=ST.q[k]||(ST.q[k]={picked:[]});if(st.picked.includes(j))return;st.picked.push(j);
  b.classList.add(j===a?'right':'wrong');if(j===a){st.ok=true;if(st.picked.length===1)st.first=true}$('.why',q).hidden=false;
  if(j!==a){$('.why',q).innerHTML=`<b>Pas tout à fait.</b> Essayez une autre réponse.`;$('.why',q).hidden=false}else $('.why',q).innerHTML=(q.classList.contains('case')?c.cas:c.quiz)[+k.split(':')[1].slice(1)].w;
  saveST();check(c)}));
 $$('[data-go]',R).forEach(b=>b.onclick=()=>show(b.dataset.go,true));$$('[data-tab]',R).forEach(b=>b.onclick=e=>{e.preventDefault();tab(b.dataset.tab)});
 check(c);toc();progress();if(location.hash!=='#'+c.id)history.replaceState(null,'','#'+c.id);if(scroll)window.scrollTo(0,0)}
function check(c){const all=[...(c.quiz||[]).map((_,i)=>`${c.id}:q${i}`),...(c.cas||[]).map((_,i)=>`${c.id}:c${i}`)];const ok=all.filter(k=>ST.q[k]&&ST.q[k].ok).length,first=all.filter(k=>ST.q[k]&&ST.q[k].first).length;
 const sc=$('#qscore');if(sc)sc.textContent=ok?`${ok} question${ok>1?'s':''} sur ${all.length} résolue${ok>1?'s':''}, dont ${first} du premier coup.`:'';
 if(ok===all.length&&all.length&&!ST.done[c.id]){ST.done[c.id]=1;saveST();toc();progress()}
 $('#donebox').innerHTML=ST.done[c.id]?`<div class="done-banner">✓ Chapitre validé.</div>`:''}
$('#tocbtn').onclick=()=>{const o=$('#toc').classList.toggle('open');$('#tocbtn').setAttribute('aria-expanded',o);$('#tocbtn').textContent=o?'Masquer le sommaire':'Afficher le sommaire'};
window.addEventListener('hashchange',()=>{const id=location.hash.slice(1);if(CH.some(c=>c.id===id)&&id!==ST.cur){tab('learn');show(id,true)}});

/* ---------- aide-mémoire ---------- */
function aide(){
 const ACT=[['0','Jouer une carte Action',''],['0','Passer',''],['1','Se déplacer','jet de bruit'],['1','Placer 1 jeton Sécurisation','hors combat'],['1','Tir dans votre salle','arme chargée'],['1','Rafale dans un couloir adjacent','dépense des munitions'],['1','Mêlée','+1 Contamination'],['1','Utiliser un objet',''],['1','Activer le robot','hors combat ; +1 à distance'],['1','Échanger','hors combat'],['1','Utiliser un équipement tactique','autant de jetons que voulu'],['2','Action de salle','hors combat'],['2','Déplacement prudent','hors combat ; +1 Sécurisation']];
 const SAC=[['Reine','Activez-la ; sinon placez-la dans le couloir.','Activez-la ; sinon placez-la dans la salle.','Reine sur le plateau : activez-la. Sinon : +2 Larves.'],['Guerrier','Placez les Intrus indiqués au dos (blanc : Adultes, rouge : Guerriers).','Placez 1 Guerrier.','+2 Reines.'],['Adulte','Placez les Intrus indiqués au dos (blanc : Adultes, rouge : Guerriers).','Placez 1 Adulte.','+2 Reines.'],['Larve','Placez 1 Larve.','Placez 1 Larve.','+2 Guerriers.'],['Vierge','+2 Adultes dans le sac ; le jeton revient dans le sac.','+2 Adultes dans le sac ; le jeton revient dans le sac.','+2 Adultes ; le jeton revient dans le sac.']];
 $('#aide').innerHTML=`<div class="eyebrow">Aide-mémoire</div><h1>Nemesis: Retaliation en une page</h1>
 <div class="toolbar"><a href="#am-manche">Manche</a> · <a href="#am-act">Actions</a> · <a href="#am-bruit">Bruit</a> · <a href="#am-sac">Sac Intrus</a> · <a href="#am-combat">Combat</a> · <a href="#am-corps">Santé et oxygène</a> · <a href="#am-fin">Fin</a> · <a href="#am-or">Règles d'or</a></div>
 <h2 id="am-manche">Une manche</h2><ol>
 <li><b>Phase Joueurs</b> — à tour de rôle jusqu'à ce que tous aient passé : 2 actions, puis −1 oxygène si le recycleur de votre section est inactif, puis −1 santé si votre salle est en feu. Choix d'objectif possible avant ou après vos 2 actions (3 / 2 / 2 / 1 / 1 cartes).</li>
 <li><b>Phase Intrus</b> — 1 touche à chaque Intrus d'une salle en feu (nid en feu : −1 œuf) ; puis les Intrus attaquent, salle par salle depuis le haut à gauche, les plus gros d'abord, sur le premier dans l'ordre du tour.</li>
 <li><b>Phase Événement</b> — carte Événement (déplacements, effet principal, effet secondaire) ; puis 1 jeton du sac Intrus. Passagers du vaisseau : décollage possible au début de la phase.</li>
 <li><b>Phase Nettoyage</b> — jeton Premier joueur à gauche ; chacun remonte à 5 cartes ; compte-tours +1 (Vaisseau en case 10 : DCA ; Autodestruction : explosion ; après la 14e manche : fin).</li></ol>
 <h2 id="am-act">Actions</h2><div class="tw"><table><tr><th class="c">Coût</th><th>Action</th><th>À retenir</th></tr>${ACT.map(x=>`<tr><td class="c">${x[0]}</td><td>${x[1]}</td><td>${x[2]}</td></tr>`).join('')}</table></div>
 <p class="small">Hors combat = impossible dans une salle avec au moins 1 Intrus. Les cartes défaussées pour payer ne sont pas résolues ; les Contaminations ne paient jamais.</p>
 <h2 id="am-bruit">Jet de bruit</h2><ul><li><b>1 à 4</b> — chaque couloir adjacent de ce numéro : Intrus présent → le plus gros entre et attaque ; marqueur Bruit → résolvez-le (sac, colonne couloir) ; rien → posez un marqueur Bruit.</li><li><b>Danger</b> — jeton du sac, colonne salle : l'Intrus indiqué apparaît dans votre salle.</li><li>Couloir renforcé = 0 ; couloir plein = 6 Intrus (Reine = 4) ou 1 marqueur Bruit.</li></ul>
 <h2 id="am-sac">Aide de jeu Intrus (Reine en vie)</h2><div class="tw"><table><tr><th>Jeton</th><th>Résolu dans un couloir</th><th>Résolu dans une salle</th><th>Phase Événement (sac)</th></tr>${SAC.map(x=>`<tr><td><b>${x[0]}</b></td><td>${x[1]}</td><td>${x[2]}</td><td>${x[3]}</td></tr>`).join('')}</table></div>
 <p class="small">Le jeton tiré retourne sous sa pile, sauf le vierge qui revient dans le sac. Sac de départ : 1 vierge, 2 Larves, 3 Adultes + 1 par personnage.</p>
 <h3>Face « La Reine est morte »</h3><div class="tw"><table><tr><th>Jeton</th><th>Résolu dans un couloir</th><th>Résolu dans une salle</th><th>Phase Événement (sac)</th></tr><tr><td><b>Reine</b></td><td>Placez 1 Guerrier ; retirez le jeton du jeu.</td><td>Placez 1 Guerrier ; retirez le jeton du jeu.</td><td>+2 Guerriers ; retirez le jeton du jeu.</td></tr><tr><td><b>Guerrier, Adulte</b></td><td>Placez les Intrus indiqués au dos.</td><td>Placez 1 Intrus du type indiqué.</td><td>+2 Larves.</td></tr><tr><td><b>Larve</b></td><td>Placez 1 Larve.</td><td>Placez 1 Larve.</td><td>+2 Guerriers.</td></tr><tr><td><b>Vierge</b></td><td colspan="3">+2 Adultes dans le sac ; le jeton revient dans le sac.</td></tr></table></div>
 <h2 id="am-combat">Combat</h2><ul>
 <li><b>Tir</b> (salle) : +1 touche, puis dé Tir : critique = mort ; 2 à 5 = mort si ≤ touches ; face munitions = dépensez des munitions. Pas de munitions dépensées sinon.</li>
 <li><b>Mêlée</b> : +1 Contamination, +1 touche, dé Tir (dernière face : rien) ; si l'Intrus survit, il riposte (sauf panne sur une de vos armes).</li>
 <li><b>Rafale</b> (couloir) : dépensez des munitions ; 1 à 4 touches ; 1 max par Adulte ou Larve, exactement 2 par Guerrier, la Reine autant que voulu.</li>
 <li><b>Grenade</b> : dé Rafale + 2 touches dans un couloir adjacent (ce n'est pas une rafale).</li>
 <li><b>Larve</b> : 1 touche la tue. <b>Reine</b> : piste des touches ; au bout, une carte Santé (défaussez autant de cartes que son numéro, appliquez l'effet, cube à 0).</li>
 <li><b>Attaque de Larve</b> : +1 Contamination et la Larve sur votre plateau (infecté).</li></ul>
 <h2 id="am-corps">Santé et oxygène</h2><ul><li>Piste : En forme → Affaibli → État critique → crâne (mort). Armure sur État critique : détruite au lieu de perdre 1 point.</li><li>Blessure grave : sur la section libre la plus à gauche ; le cube ne va jamais sur une case couverte.</li><li>Oxygène max 7 ; jeton Oxygène +3, Medpack +2 santé. Cadran sous 0 : jeton Suffocation, un tour pour trouver de l'oxygène.</li><li>Munitions : 2 charges (plein, puis à moitié).</li></ul>
 <h2 id="am-fin">Fin de partie</h2><ol><li>Sans Larve : toutes vos cartes en main, procédure d'infection (scan) ; une infectée → Larve → éclosion.</li><li>Avec Larve : +1 Contamination, toutes vos cartes mélangées, éclosion : tirez 4 cartes, une Contamination = mort.</li><li>Vivant : révélez votre objectif. Il faut aussi être parti (vaisseau, navette) ou en hibernation.</li></ol>
 <h2 id="am-or">Règles d'or</h2><ul><li><b>Loi de Murphy</b> : en cas de doute, ce qui pénalise le plus les joueurs, puis le premier dans l'ordre du tour.</li><li><b>Effets locaux</b> : sans cible précise, l'effet s'applique dans votre salle.</li><li><b>Limite du matériel</b> : les éléments sont limités, sauf les cubes.</li><li>Un effet ne se choisit que s'il peut être résolu entièrement.</li></ul>`;
 $$('#aide .toolbar a').forEach(a=>a.onclick=e=>{e.preventDefault();const t=$(a.getAttribute('href'));if(t)t.scrollIntoView({behavior:'smooth'})})}

/* ---------- onglet Salles ---------- */
function salles(){$('#sallespage').innerHTML=`<div class="eyebrow">Aide de jeu</div><h1>Les salles</h1><p class="lead">Les 12 salles de section sont toujours en jeu ; les 13 salles aléatoires (« ? ») pas forcément. Une action de salle coûte 2 cartes et se fait hors combat.</p>
 <div class="filters2"><div class="seg" id="sl-s">${['tout','A','B','C','?'].map((v,i)=>`<button type="button" data-v="${v}" class="${i?'':'sel'}">${['Toutes','Section A','Section B','Section C','Aléatoires'][i]}</button>`).join('')}</div><input type="search" id="sl-q" placeholder="Chercher une salle ou un effet…" aria-label="Chercher une salle"></div>
 <p class="small muted">Couleurs des icônes Objet (pour la Fouille) : ${it('r')} rouge ${it('v')} vert ${it('j')} jaune. ${ordi} ordinateur : la salle peut être utilisée depuis la Salle des serveurs, et le robot activé à distance depuis elle.</p><div class="cards" id="sl-cards"></div>`;
 let s='tout';const norm=t=>t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/<[^>]+>/g,'');
 const draw=()=>{const q=norm($('#sl-q').value||'');$('#sl-cards').innerHTML=SALLES.filter(x=>(s==='tout'||x.s===s)&&(!q||norm(x.fr+' '+x.fx+' '+x.pr.join(' ')).includes(q))).map(roomCard).join('')||'<p class="muted">Aucune salle trouvée.</p>'};
 $$('#sl-s button').forEach(b=>b.onclick=()=>{$$('#sl-s button').forEach(x=>x.classList.remove('sel'));b.classList.add('sel');s=b.dataset.v;draw()});$('#sl-q').oninput=draw;draw()}

/* ---------- onglets, thème, démarrage ---------- */
function tab(t){$$('.tabs button').forEach(b=>b.setAttribute('aria-selected',b.dataset.tab===t));$$('.tab').forEach(x=>x.classList.toggle('on',x.id==='tab-'+t));LS.set('nemr-tab',t);window.scrollTo(0,0)}
$$('.tabs button').forEach(b=>b.onclick=()=>tab(b.dataset.tab));
const TH=['auto','dark','light'];let th=LS.get('nemr-theme','auto');
const applyTh=()=>{if(th==='auto')document.documentElement.removeAttribute('data-theme');else document.documentElement.setAttribute('data-theme',th);$('#theme').title='Thème : '+{auto:'automatique',dark:'sombre',light:'clair'}[th]};
$('#theme').onclick=()=>{th=TH[(TH.indexOf(th)+1)%3];LS.set('nemr-theme',th);applyTh()};applyTh();
aide();salles();
const h=location.hash.slice(1);show(CH.some(c=>c.id===h)?h:ST.cur,false);
if(!CH.some(c=>c.id===h))tab(LS.get('nemr-tab','learn'));
})();
</script>
<footer class="page small muted" style="padding-top:0">Aide de jeu de fan, gratuite et non officielle, sans lien avec Awaken Realms ni ses éditeurs partenaires. Nemesis: Retaliation © Awaken Realms. Règles résumées d'après le livret de règles français et l'aide de jeu Salles.</footer>
</body>
</html>
