(function(){
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const ch=(k,t)=>`<span class="chip c-${k}">${t}</span>`;
const M=ch('mat','Matériaux'),P=ch('pop','Population'),G=ch('prog','Progrès'),I=ch('ins','Instabilités'),RG=ch('reg','Région'),RN=ch('ren','Renommée');
const NATS=['Carthaginois','Celtes','Grecs','Macédoniens','Perses','Romains','Scythes','Vikings'];
/* ---------- explication express ---------- */
const SL=[
['Imperium en une phrase',`<p class="big1">Vous dirigez une nation antique, représentée par un paquet de cartes qui grossit et se transforme au fil de la partie.</p>
 <div class="duo"><div><h3>Décompte</h3><p>La fin normale. On compte les points de victoire : le plus haut total gagne.</p></div><div><h3>Effondrement</h3><p>La pile ${I} est vide : la partie s'arrête net, et celui qui possède le moins d'Instabilités gagne.</p></div></div>`],
['Votre coin de table',`<div class="zgrid"><div>Développements<small>à payer plus tard</small></div><div>Avènement<small>sous la pioche Nation</small></div><div class="hl">Carte État<small>Barbare puis Empire · vos jetons</small></div><div>Carte Puissance<small>votre pouvoir · votre Histoire dessous</small></div>
 <div>Deck</div><div>Défausse</div><div class="wide">Zone de jeu<small>vos Régions et cartes permanentes</small></div><div class="wide hl">Votre main : 5 cartes</div></div>`],
['Trois ressources',`<div class="trio"><div>${M}<p>Construire, payer les cartes de développement.</p></div><div>${P}<p>Conquérir, acquérir des Vassaux.</p></div><div>${G}<p>La ressource joker, et 1 point de victoire par jeton à la fin.</p></div></div>
 <p class="big1">Pour payer, 1 Progrès vaut <b>1 Population</b> ou <b>2 Matériaux</b>. Les ressources posées sur des cartes ne servent à rien.</p>`],
['Votre tour : un seul ordre',`<div class="trio ord"><div><h3>Activation</h3><p>Le tour normal : vous jouez des cartes et vous épuisez des capacités.</p></div><div><h3>Recherche</h3><p>Vous défaussez votre main et vous prenez une carte choisie, sans son Instabilité.</p></div><div><h3>Pacification</h3><p>Vous renvoyez gratuitement toutes les Instabilités de votre main.</p></div></div><p class="big1">Puis, quel que soit l'ordre : le Nettoyage.</p>`],
['Activation : jetons Action et Épuisé',`<div class="duo"><div><h3>3 Actions</h3><p>Une Action = jouer une carte de votre main. Résolvez son texte, puis défaussez-la, sauf si elle reste en jeu.</p></div><div><h3>5 jetons Épuisé</h3><p>Posez un jeton sur une carte en jeu pour utiliser sa capacité « Épuiser ». Une fois par tour et par carte.</p></div></div>
 <p class="big1">Une carte marquée Barbare ou Empire ne se joue de votre main que si votre carte État montre la même face.</p>`],
['Le Marché',`<p class="big1">Cinq cartes visibles. Sous chacune, une ${I}, sauf sous les Régions.</p><div class="duo"><div><h3>Acquérir</h3><p>Vous prenez la carte, ses ressources <b>et l'Instabilité</b> glissée dessous.</p></div><div><h3>Innover</h3><p>Vous prenez la carte et ses ressources. L'Instabilité retourne dans la pile.</p></div></div>`],
['Le Nettoyage',`<ol class="steps4"><li><b>1 Progrès du stock</b> sur une carte du Marché.</li><li>Vos jetons reviennent : <b>3 Actions, 5 Épuisé</b>.</li><li>Défaussez autant de cartes de votre main que vous voulez.</li><li>Piochez jusqu'à <b>5 cartes</b>.</li></ol><p class="big1">Conseil : défaussez large, votre deck tournera plus vite.</p>`],
['Votre nation évolue',`<p class="big1">Chaque fois que vous mélangez votre défausse pour refaire votre deck, une carte s'y ajoute :</p><div class="flow"><div>Cartes Nation<small>une par mélange</small></div><span aria-hidden="true">→</span><div class="hl">Avènement<small>vous devenez Empire</small></div><span aria-hidden="true">→</span><div>Développements<small>vous en payez le coût</small></div></div><p>Développer votre dernière carte déclenche le Décompte.</p>`],
['Instabilités et Gloire',`<div class="duo"><div><h3>${I}</h3><p>−2 points chacune, et elles encombrent votre main. Pour vous en défaire : la jouer (une Action, puis 1 Population, 3 Matériaux ou 2 cartes défaussées), ou l'ordre Pacification.</p></div><div><h3>Gloire</h3><p>Abandonnez 3 ${RG} en jeu pour gagner une ${RN}, la source de points la plus riche. Il faudra ensuite rejouer vos Régions.</p></div></div>`],
['Manches et fin de partie',`<div class="duo"><div><h3>Solstice</h3><p>Quand tout le monde a joué, chacun résout ses effets Solstice. Puis nouvelle manche.</p></div><div><h3>Décompte</h3><p>Pioche Principale vide, dernier Développement payé ou Roi des rois retournée : on finit la manche, on en joue <b>une dernière</b>, puis on compte.</p></div></div>
 <p class="big1">Score : points des cartes (10 au plus pour une carte à étoile) + 1 point par Progrès en réserve.</p>`]];
const REF=`<div class="ref"><div><h3>1 · Choisissez un ordre</h3><ul><li><b>Activation</b> : 3 Actions, 5 jetons Épuisé</li><li><b>Recherche</b> : défaussez votre main, innovez 1 carte</li><li><b>Pacification</b> : renvoyez vos Instabilités</li></ul></div>
 <div><h3>2 · Nettoyage</h3><ol><li>1 ${G} du stock sur le Marché</li><li>Récupérez vos jetons</li><li>Défaussez ce que vous voulez</li><li>Piochez jusqu'à 5</li></ol></div>
 <div><h3>Payer</h3><ul><li>1 ${G} = 1 ${P}</li><li>1 ${G} = 2 ${M}</li></ul></div>
 <div><h3>Marché</h3><ul><li><b>Acquérir</b> : avec l'Instabilité</li><li><b>Innover</b> : sans l'Instabilité</li></ul></div>
 <div><h3>Deck vide</h3><ul><li>+1 carte Nation, puis Avènement, puis un Développement payé</li><li>1 seul ajout par tour</li></ul></div>
 <div><h3>Fin</h3><ul><li><b>Solstice</b> à chaque fin de manche</li><li><b>Décompte</b> : finir la manche + 1 manche</li><li><b>Effondrement</b> : pile ${I} vide</li></ul></div></div>`;
let sl=0;
function drawSlides(){const box=$('#mp-ex'),last=sl===SL.length;
  box.innerHTML=`<div class="stage" id="stage"><div class="snum">${last?'Aide-mémoire':'Écran '+(sl+1)+' sur '+SL.length}</div>
   <h2>${last?'Votre tour, en un coup d\'œil':SL[sl][0]}</h2><div class="sbody">${last?REF:SL[sl][1]}</div>
   <div class="dots" aria-hidden="true">${SL.map((_,i)=>`<i class="${i===sl?'on':''}"></i>`).join('')}<i class="ref ${last?'on':''}"></i></div></div>
   <div class="row snav"><button type="button" id="sp" ${sl?'':'disabled'}>Précédent</button><button type="button" class="pri" id="sn">${last?'Revenir au début':sl===SL.length-1?'Afficher l\'aide-mémoire':'Suivant'}</button>
   <button type="button" id="sr">Aide-mémoire</button><button type="button" id="sf">Plein écran</button><span class="hint">Flèches du clavier pour avancer.</span></div>`;
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
  const last=C.trig!=null&&C.round>C.trig,trigNote=C.trig==null?'':last?'<div class="banner end">Dernière manche : le Décompte suit le Solstice.</div>':'<div class="banner">Décompte déclenché : on termine cette manche, puis une dernière manche complète.</div>';
  let main='';
  if(C.phase==='turn'){const p=pl[o[C.cur]];
    main=`<div class="who"><small>Manche ${C.round} · tour ${C.cur+1} sur ${n}</small><b>${p.name}</b><span>${p.nat}</span></div>
     <div class="duo slim"><div><h3>Pendant le tour</h3><p>Annoncez un ordre : Activation, Recherche ou Pacification.</p></div>
     <div class="clean"><h3>Nettoyage</h3><ol><li>${p.nat==='Carthaginois'?`Des ${M} sur une carte du Marché, au lieu du Progrès (nombre selon votre carte Puissance)`:`1 ${G} <b>du stock</b> sur une carte du Marché`}</li><li>Jetons : 3 Actions, 5 Épuisé</li><li>Défausse libre</li><li>Piochez jusqu'à 5</li></ol></div></div>
     <div class="row"><button type="button" class="pri big" id="next">${C.cur===n-1?'Tour terminé : Solstice':'Tour terminé : joueur suivant'}</button></div>`}
  else if(C.phase==='solstice')main=`<div class="who sol"><small>Fin de la manche ${C.round}</small><b>Solstice</b><span>Chacun résout ses effets Solstice, en même temps. Ni Action ni capacité Épuiser.</span></div>
     <div class="row"><button type="button" class="pri big" id="next">${last?'Solstice résolu : compter les points':'Solstice résolu : manche suivante'}</button></div>`;
  else if(C.phase==='score')main=scoreHTML();
  else if(C.phase==='collapse')main=collapseHTML();
  b.innerHTML=`<div class="cgrid"><section class="panel">${trigNote}${main}</section>
   <aside class="panel"><h3>Pile ${I}</h3><div class="inscount ${crit?'crit':low?'low':''}"><button type="button" id="im" aria-label="Une de moins">−</button><b>${C.ins}</b><button type="button" id="ip" aria-label="Une de plus">+</button></div>
    <p class="hint">${C.ins<=0?'Pile vide : Effondrement.':crit?'Danger : l\'Effondrement est tout proche.':low?'Attention : la pile s\'amenuise.':'Ajustez à chaque carte prise ou rendue.'}</p>
    <h3>Ordre du tour</h3><ol class="porder">${o.map((i,k)=>`<li class="${C.phase==='turn'&&k===C.cur?'on':''}">${pl[i].name} <small>${pl[i].nat}</small></li>`).join('')}</ol>
    <div class="row col">${C.trig==null&&C.phase!=='score'?'<button type="button" id="trig">Le Décompte est déclenché</button>':''}${C.phase!=='score'&&C.phase!=='collapse'?'<button type="button" id="col" class="warn">Effondrement</button>':''}
     <button type="button" id="undo" ${U.length?'':'disabled'}>Annuler la dernière étape</button><button type="button" id="reset">Nouvelle partie</button></div></aside></div>`;
  const on=(id,f)=>{const e=$('#'+id);if(e)e.onclick=()=>{f();sv();draw()}};
  on('next',()=>{push();if(C.phase==='turn'){if(C.cur<n-1)C.cur++;else C.phase='solstice'}else if(C.phase==='solstice'){if(last)C.phase='score';else{C.round++;C.cur=0;C.phase='turn'}}});
  on('im',()=>{push();C.ins=Math.max(0,C.ins-1);if(C.ins===0)C.phase='collapse'});on('ip',()=>{push();C.ins++});
  on('trig',()=>{push();C.trig=C.round});on('col',()=>{push();C.phase='collapse'});
  on('undo',()=>{C=JSON.parse(U.pop())});
  const r=$('#reset');if(r)r.onclick=()=>{if(r.dataset.c){C=null;U=[];sv();draw()}else{r.dataset.c=1;r.textContent='Confirmer : effacer cette partie';r.classList.add('warn')}};
  if(C.phase==='score')bindScore();if(C.phase==='collapse')bindCollapse()}
const ROWS=[['f','Cartes à valeur fixe',1],['s','Cartes à étoile (10 max chacune)',1],['q','Cartes à point d\'interrogation réussies',1],['i','Nombre d\'Instabilités',-2],['n','Autres points négatifs',-1],['g','Progrès en réserve',1]];
function scoreHTML(){const pl=C.players;C.sc=C.sc||pl.map(()=>({}));
  return `<h2>Feuille de score</h2><p class="hint">Chacun compte sa main, sa zone de jeu, son deck, sa défausse, son Histoire, ses cartes réservées et sa carte Puissance. La pioche Nation et les Développements non payés ne comptent pas.</p>
   <div class="tw"><table class="sheet"><tr><th></th>${pl.map(p=>`<th>${p.name}<small>${p.nat}</small></th>`).join('')}</tr>
   ${ROWS.map(([k,l,m])=>`<tr><td>${l}${m===-2?' <small>(−2 chacune)</small>':''}</td>${pl.map((_,j)=>`<td><input type="number" min="0" inputmode="numeric" data-p="${j}" data-k="${k}" value="${C.sc[j][k]||''}" aria-label="${l}, ${pl[j].name}"></td>`).join('')}</tr>`).join('')}
   <tr class="tot"><td>Total</td>${pl.map((_,j)=>`<td id="tt${j}"></td>`).join('')}</tr></table></div><div class="out" id="win"></div>`}
function bindScore(){const pl=C.players,upd=()=>{const t=pl.map((_,j)=>ROWS.reduce((a,[k,,m])=>a+m*(+C.sc[j][k]||0),0)),mx=Math.max(...t),w=pl.filter((_,j)=>t[j]===mx).map(p=>p.name);
    t.forEach((v,j)=>{const c=$('#tt'+j);c.textContent=v;c.classList.toggle('best',v===mx)});
    $('#win').innerHTML=w.length>1?`<b>Égalité</b> entre ${w.join(' et ')} : la victoire est partagée.`:`<b>${w[0]}</b> l'emporte avec ${mx} points.`};
  $$('.sheet input').forEach(i=>i.addEventListener('input',()=>{C.sc[i.dataset.p][i.dataset.k]=i.value;sv();upd()}));upd()}
function collapseHTML(){const pl=C.players;C.co=C.co||pl.map(()=>'');
  return `<h2>Effondrement</h2><p>La pile d'Instabilités est vide : la partie s'arrête immédiatement, l'action en cours est interrompue. Chacun compte ses Instabilités dans sa main, sa zone de jeu, son deck, sa défausse et son Histoire, pas dans sa pioche Nation.</p>
   <div class="form">${pl.map((p,j)=>`<label class="f" for="co${j}">${p.name} (${p.nat})<input type="number" min="0" id="co${j}" data-j="${j}" value="${C.co[j]}"></label>`).join('')}</div><div class="out" id="cwin"></div>
   <div class="row" style="margin-top:10px"><button type="button" id="toscore">Égalité : départager aux points</button></div>`}
function bindCollapse(){const pl=C.players,upd=()=>{const v=C.co.map(x=>x===''?null:+x);if(v.some(x=>x==null)){$('#cwin').textContent='Saisissez le nombre d\'Instabilités de chaque joueur.';return}
    const mn=Math.min(...v),w=pl.filter((_,j)=>v[j]===mn).map(p=>p.name);$('#cwin').innerHTML=w.length>1?`<b>Égalité</b> entre ${w.join(' et ')} (${mn} chacun) : départagez-les aux points du Décompte.`:`<b>${w[0]}</b> l'emporte avec ${mn} Instabilité${mn>1?'s':''}.`};
  $$('#mp-comp [data-j]').forEach(i=>i.addEventListener('input',()=>{C.co[i.dataset.j]=i.value;sv();upd()}));upd();
  $('#toscore').onclick=()=>{push();C.phase='score';sv();draw()}}
function setup(b){let n=+(b.dataset.n||3);
  const prev=(b.dataset.names||'').split('|');
  b.innerHTML=`<section class="panel narrow"><h2>Nouvelle partie à plusieurs</h2><p>Le compagnon rythme la partie : à qui le tour, le rappel du Nettoyage, le Solstice, la pile d'Instabilités, puis la feuille de score.</p>
   <h3>Nombre de joueurs</h3><div class="row" id="mpn">${[2,3,4].map(k=>`<button type="button" data-n="${k}" class="${k===n?'sel':''}">${k} joueurs</button>`).join('')}</div>
   <h3>Joueurs, dans l'ordre de jeu (sens horaire)</h3><div class="form">${Array.from({length:n},(_,i)=>`<div class="row prow"><label class="f" for="pn${i}">Nom<input type="text" id="pn${i}" value="${prev[i]||'Joueur '+(i+1)}"></label><label class="f" for="pt${i}">Nation<select id="pt${i}">${NATS.map((x,k)=>`<option ${k===i?'selected':''}>${x}</option>`).join('')}</select></label></div>`).join('')}</div>
   <h3>Pile ${I}</h3><label class="f" for="ni">Nombre de cartes dans la pile après la mise en place<input type="number" id="ni" min="1" value="12"></label>
   <p class="hint">Comptez la pile une fois le Marché installé. Les Instabilités de départ de certaines nations y sont déjà.</p>
   <div class="row"><button type="button" class="pri" id="gostart">Tirer le premier joueur et commencer</button></div></section>`;
  $$('#mpn button').forEach(x=>x.onclick=()=>{b.dataset.names=Array.from({length:n},(_,i)=>$('#pn'+i).value).join('|');b.dataset.n=x.dataset.n;draw()});
  $('#gostart').onclick=()=>{const players=Array.from({length:n},(_,i)=>({name:$('#pn'+i).value.trim()||'Joueur '+(i+1),nat:$('#pt'+i).value}));
    C={players,first:Math.floor(Math.random()*n),round:1,cur:0,phase:'turn',ins:Math.max(1,+$('#ni').value||12),trig:null};U=[];sv();draw()}}
/* ---------- montage ---------- */
function mode(m){$('#mp-ex').hidden=m!=='ex';$('#mp-comp').hidden=m!=='comp';$$('#mpnav button').forEach(b=>b.classList.toggle('sel',b.dataset.m===m));try{localStorage.setItem('imperium-mp',m)}catch(e){}}
$$('#mpnav button').forEach(b=>b.onclick=()=>mode(b.dataset.m));
let m0='ex';try{m0=localStorage.getItem('imperium-mp')||'ex'}catch(e){}
drawSlides();draw();mode(m0);
window.IMP_M={get C(){return C},draw};
})();