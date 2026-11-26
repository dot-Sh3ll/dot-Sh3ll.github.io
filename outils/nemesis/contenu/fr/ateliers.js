
/* ---------- ateliers ----------
   Les faces des dés sont choisies par le lecteur : l'appli ne simule pas le hasard des dés, seulement les règles. */
const seg=(id,vals,cur,lab)=>`<div class="seg" id="${id}" role="group">${vals.map((v,i)=>`<button type="button" data-v="${v}" class="${v==cur?'sel':''}">${lab?lab[i]:v}</button>`).join('')}</div>`;
function segVal(root,id){const b=$(`#${id} .sel`,root);return b?b.dataset.v:''}
function wireSeg(root,id,cb){$$(`#${id} button`,root).forEach(b=>b.onclick=()=>{$$(`#${id} button`,root).forEach(x=>x.classList.remove('sel'));b.classList.add('sel');cb()})}
const TY={reine:'Reine',guerrier:'Guerrier',adulte:'Adulte',larve:'Larve',vierge:'vierge'};
const TYP={reine:'Reines',guerrier:'Guerriers',adulte:'Adultes',larve:'Larves',vierge:'vierge'};
const SIZE={reine:4,guerrier:3,adulte:2,larve:1};
const tok=k=>`<span class="tok ${k}" title="${TY[k]}">${{reine:'R',guerrier:'G',adulte:'A',larve:'L',vierge:'∅'}[k]}</span>`;
const plural=(n,s,p)=>`${n} ${n>1?p:s}`;
/* faces réelles des dés (données par le propriétaire du jeu) */
const DE_BRUIT=['1','2','2','3','3','4','4','4','D','D'], DE_RAFALE=[1,1,1,2,3,4], DE_TIR=['C','2','3','4','4','5','5','M'];
const pct=(n,d)=>String(Math.round(1000*n/d)/10).replace('.',',')+'\u00a0%';

const LABS={
/* ===== sac Intrus ===== */
sac:{html:()=>`<div class="lab"><h3>Simulateur : la colonie grandit</h3><p class="hint">Composez le sac de départ, puis piochez. L'appli applique l'aide de jeu Intrus (côté « La Reine est en vie », ou « morte » si vous cochez la case) et montre la probabilité de chaque type au prochain tirage.</p>
<div class="row">Personnages ${seg('sa-n',[1,2,3,4,5],3)} <button type="button" id="sa-reset">Recommencer</button></div>
<div class="row" style="margin-top:8px"><label class="chk"><input type="checkbox" id="sa-q"> La Reine est sur le plateau</label><label class="chk"><input type="checkbox" id="sa-dead"> La Reine est morte</label></div>
<div class="bag" id="sa-bag" aria-live="polite"></div><div class="counts" id="sa-cnt"></div>
<div class="row"><button type="button" class="pri" id="sa-ev">Phase Événement : piocher</button><button type="button" id="sa-co">Marqueur Bruit résolu (couloir)</button><button type="button" id="sa-sa">Résultat Danger (salle)</button></div>
<div class="out" id="sa-out">Piochez pour voir ce qui se passe.</div><ul class="log" id="sa-log"></ul></div>`,
init(r){const TOT={reine:9,guerrier:8,adulte:16,larve:6,vierge:1};let S;
 const reset=()=>{const n=+segVal(r,'sa-n');S={bag:{reine:0,guerrier:0,adulte:3+n,larve:2,vierge:1},out:0,log:[],manche:1};draw();$('#sa-out',r).textContent='Sac de départ : 1 jeton vierge, 2 Larves, 3 Adultes + 1 Adulte par personnage.';$('#sa-out',r).className='out'};
 const pile=k=>TOT[k]-S.bag[k]-(k==='reine'?S.out:0);
 const add=(k,n)=>{const m=Math.min(n,pile(k));S.bag[k]+=m;return m<n?` (pile épuisée : ${m} seulement)`:''};
 const total=()=>Object.values(S.bag).reduce((a,b)=>a+b,0);
 const draw=()=>{const order=['reine','guerrier','adulte','larve','vierge'];$('#sa-bag',r).innerHTML=order.flatMap(k=>Array(S.bag[k]).fill(tok(k))).join('')||'<span class="muted">Sac vide</span>';const t=total();
  $('#sa-cnt',r).innerHTML=order.map(k=>`<div>${TYP[k]}<br><b>${S.bag[k]}</b> <span class="muted small">${t?Math.round(100*S.bag[k]/t):0} %</span></div>`).join('');$('#sa-log',r).innerHTML=S.log.slice(-8).reverse().map(x=>`<li>${x}</li>`).join('')};
 const pickTok=()=>{let x=rnd(total());for(const k in S.bag){if(x<S.bag[k])return k;x-=S.bag[k]}return null};
 const go=mode=>{if(!total()){$('#sa-out',r).textContent='Le sac est vide.';return}const k=pickTok(),q=$('#sa-q',r).checked,dead=$('#sa-dead',r).checked;let m='',back=false,gone=false;
  if(dead&&k!=='vierge'){const lieu=mode==='co'?'le couloir':'votre salle';
   if(k==='reine'){gone=true;m=mode==='ev'?`<b>Ajoutez 2 Guerriers</b> dans le sac.`+add('guerrier',2):`<b>Placez 1 Guerrier</b> dans ${lieu}.`}
   else if(mode==='ev')m=k==='larve'?`<b>Ajoutez 2 Guerriers</b> dans le sac.`+add('guerrier',2):`<b>Ajoutez 2 Larves</b> dans le sac.`+add('larve',2);
   else if(mode==='co')m=k==='larve'?'<b>Placez 1 Larve</b> dans le couloir.':'<b>Placez le nombre d\'Intrus indiqué au dos du jeton</b> dans le couloir (chiffre blanc : Adultes ; chiffre rouge : Guerriers).';
   else m=`<b>Placez 1 ${TY[k]}</b> dans votre salle : il attaque aussitôt.`}
  else if(mode==='ev'){

   if(k==='reine'){if(q)m='La Reine est sur le plateau : <b>activez-la</b> (elle attaque un personnage de sa salle, sinon se déplace une fois vers le plus proche).';else m='La Reine n\'est pas sur le plateau : <b>ajoutez 2 Larves</b> dans le sac.'+add('larve',2)}
   else if(k==='guerrier'||k==='adulte')m=`<b>Ajoutez 2 Reines</b> dans le sac.`+add('reine',2);
   else if(k==='larve')m=`<b>Ajoutez 2 Guerriers</b> dans le sac.`+add('guerrier',2);
   else{m=`<b>Ajoutez 2 Adultes</b> dans le sac.`+add('adulte',2);back=true}}
  else{const lieu=mode==='co'?'le couloir':'votre salle';
   if(k==='reine'){if(q)m='<b>Activez la Reine.</b>';else{m=`La Reine n'est pas sur le plateau : <b>placez-la dans ${lieu}</b>.`;$('#sa-q',r).checked=true}}
   else if(k==='vierge'){m=`Rien n'apparaît : <b>ajoutez 2 Adultes</b> dans le sac.`+add('adulte',2);back=true}
   else if(mode==='co'&&k==='larve')m='<b>Placez 1 Larve</b> dans le couloir.';
   else if(mode==='co')m='<b>Placez le nombre d\'Intrus indiqué au dos du jeton</b> dans le couloir (chiffre blanc : Adultes ; chiffre rouge : Guerriers).';
   else m=`<b>Placez 1 ${TY[k]}</b> dans votre salle : il attaque aussitôt.`}
  if(gone){S.bag[k]--;S.out++;m+=' Le jeton Reine est <b>retiré du jeu</b>.';}else if(!back){S.bag[k]--;m+=` Le jeton ${TY[k]} retourne sous sa pile.`}else m+=' Le jeton vierge retourne dans le sac.';
  const lab={ev:'Phase Événement',co:'Marqueur Bruit',sa:'Danger'}[mode];
  $('#sa-out',r).innerHTML=`${tok(k)} <b>${lab} : jeton ${TY[k]}.</b> ${m}`;$('#sa-out',r).className='out';S.log.push(`${lab} : ${TY[k]}`);draw()};
 $('#sa-dead',r).onchange=e=>{const d=e.target.checked;if(d)$('#sa-q',r).checked=false;$('#sa-q',r).disabled=d};wireSeg(r,'sa-n',reset);$('#sa-reset',r).onclick=reset;$('#sa-ev',r).onclick=()=>go('ev');$('#sa-co',r).onclick=()=>go('co');$('#sa-sa',r).onclick=()=>go('sa');reset()}},

/* ===== jet de bruit ===== */
bruit:{html:()=>`<div class="lab"><h3>Simulateur : le jet de bruit</h3><p class="hint">Votre personnage vient d'entrer dans la salle du centre. Choisissez la face obtenue au dé Bruit : l'appli applique la règle à chaque couloir adjacent.</p>
<div class="map" id="br-map"></div>
<div class="dice" id="br-dice">${[1,2,3,4].map(v=>`<button type="button" data-v="${v}">${v}</button>`).join('')}<button type="button" data-v="D">Danger</button></div>
<div class="row"><button type="button" class="pri" id="br-roll">Lancer le dé</button><button type="button" id="br-new">Nouvelle situation</button></div><p class="small muted" id="br-p"></p><div class="out" id="br-out">Choisissez une face du dé.</div></div>`,
init(r){let S;const POS=[1,3,5,7];
 const neu=()=>{const cors=[];const k=2+rnd(3);const pos=[...POS].sort(()=>Math.random()-.5).slice(0,k);
  pos.forEach((p,i)=>{const num=i===0&&Math.random()<.35?0:1+rnd(4);const c={p,num,bruit:false,app:false,intrus:[]};if(num){const x=rnd(3);if(x===1)c.bruit=true;else if(x===2){const n=1+rnd(3);for(let j=0;j<n;j++)c.intrus.push(['adulte','adulte','larve','guerrier'][rnd(4)])}}cors.push(c)});
  if(!cors.some(c=>c.num))cors[0].num=2;S={cors,room:[],hit:[]};draw();$('#br-out',r).textContent='Choisissez une face du dé.';$('#br-out',r).className='out'};
 const draw=()=>{let h='';for(let i=0;i<9;i++){const c=S.cors.find(x=>x.p===i);
  if(i===4)h+=`<div class="room">Votre salle${S.room.length?`<div>${S.room.map(tok).join(' ')}</div>`:''}</div>`;
  else if(c)h+=`<div class="cor${c.num===0?' reinf':''}${S.hit&&S.hit.includes&&S.hit.includes(c.p)?' hit':''}"><div class="num">${c.num}</div>${c.num===0?'renforcé':c.intrus.length?c.intrus.map(tok).join(' '):c.app?'Intrus apparus (selon le jeton)':c.bruit?'⚠ marqueur Bruit':'vide'}</div>`;
  else h+='<div class="empty"></div>'}$('#br-map',r).innerHTML=h;
  const nums=new Set(S.cors.filter(c=>c.num).map(c=>c.num+'')),rien=DE_BRUIT.filter(f=>f!=='D'&&!nums.has(f)).length,ent=DE_BRUIT.filter(f=>f!=='D'&&S.cors.some(c=>c.num+''===f&&(c.intrus.length||c.app))).length,dg=DE_BRUIT.filter(f=>f==='D').length;
  $('#br-p',r).innerHTML=`Dé Bruit (10 faces : un 1, deux 2, deux 3, trois 4, deux Danger). Sur ce plan : <b>${pct(rien,10)}</b> rien ne se passe, <b>${pct(ent,10)}</b> un Intrus d'un couloir entre dans votre salle, <b>${pct(dg,10)}</b> Danger.`};
 const roll=v=>{if(v==='D'){S.hit=[];draw();$('#br-out',r).innerHTML='<b>Danger !</b> Quelque chose tombe du plafond : piochez un jeton dans le sac Intrus et résolvez-le dans la colonne « salle » de l\'aide de jeu. Le plus souvent, un Intrus du type indiqué apparaît dans votre salle et vous attaque. Ignorez le chiffre au dos et remettez le jeton sous sa pile (le jeton vierge, lui, retourne dans le sac).';$('#br-out',r).className='out bad';return}
  const n=+v,cs=S.cors.filter(c=>c.num===n);S.hit=cs.map(c=>c.p);
  if(!cs.length){draw();$('#br-out',r).innerHTML=`Aucun couloir adjacent ne porte le ${n} : <b>rien ne se passe</b>. Ouf.`;$('#br-out',r).className='out ok';return}
  const lines=cs.map(c=>{if(c.intrus.length){c.intrus.sort((a,b)=>SIZE[b]-SIZE[a]);const k=c.intrus.shift();S.room.push(k);return `Couloir ${n} : il contient des Intrus, <b>le plus gros (${TY[k]}) entre dans votre salle</b> et vous attaque${k==='larve'?' (une Larve vous contamine et vous infecte)':''}.`}
   if(c.app)return `Couloir ${n} : des Intrus y sont apparus, <b>le plus gros entre dans votre salle</b> et vous attaque.`;
   if(c.bruit){c.bruit=false;c.app=true;return `Couloir ${n} : il y avait déjà un marqueur Bruit, <b>résolvez-le</b> : retirez-le et piochez un jeton dans le sac (colonne « couloir ») ; des Intrus apparaissent dans ce couloir.`}
   c.bruit=true;return `Couloir ${n} : vide et sans marqueur, <b>posez un marqueur Bruit</b>.`});
  draw();
  $('#br-out',r).innerHTML=lines.map(x=>`<p style="margin:0 0 6px">${x}</p>`).join('')+'<p class="small muted" style="margin:0">Faites un autre jet sur la même situation pour voir les marqueurs se transformer.</p>';$('#br-out',r).className=S.room.length?'out bad':'out'};
 $$('#br-dice button',r).forEach(b=>b.onclick=()=>roll(b.dataset.v));$('#br-roll',r).onclick=()=>{const v=DE_BRUIT[rnd(10)];roll(v);$('#br-out',r).insertAdjacentHTML('afterbegin',`<p style="margin:0 0 6px"><b>Le dé donne : ${v==='D'?'Danger':v}.</b></p>`)};$('#br-new',r).onclick=neu;neu()}},

/* ===== tir et mêlée ===== */
tir:{html:()=>`<div class="lab"><h3>Simulateur : tir et mêlée dans une salle</h3><p class="hint">Choisissez la cible et le type d'attaque, puis la face obtenue au dé Tir. La touche est toujours posée <b>avant</b> le jet.</p>
<div class="row">Cible ${seg('ti-t',['adulte','guerrier','larve'],'adulte',['Adulte','Guerrier','Larve'])} Attaque ${seg('ti-m',['tir','melee'],'tir',['Tir','Mêlée'])}</div>
<div class="foes" id="ti-foe"></div>
<div class="dice" id="ti-dice"></div>
<p class="small muted" id="ti-p"></p><div class="row"><button type="button" class="pri" id="ti-roll">Lancer le dé</button><button type="button" id="ti-reset">Nouvelle cible</button></div><div class="out" id="ti-out">Choisissez une face du dé Tir.</div></div>`,
init(r){let S;
 const reset=()=>{S={t:segVal(r,'ti-t'),m:segVal(r,'ti-m'),cubes:0,dead:false,cont:0};faces();draw();$('#ti-out',r).textContent='Choisissez une face du dé Tir.';$('#ti-out',r).className='out'};
 const faces=()=>{const last=segVal(r,'ti-m')==='tir'?'Munitions':'Vide';$('#ti-dice',r).innerHTML=['Critique','2','3','4','5',last].map(v=>`<button type="button" data-v="${v}">${v}</button>`).join('');$$('#ti-dice button',r).forEach(b=>b.onclick=()=>shoot(b.dataset.v))};
 const draw=()=>{const h=S.cubes+1,k=S.t==='larve'?8:1+DE_TIR.filter(x=>/\d/.test(x)&&+x<=h).length;$('#ti-p',r).innerHTML=S.dead?'':`Dé Tir (8 faces : critique, 2, 3, deux 4, deux 5, munitions). Avec la touche de ce tir, la cible aura ${h} touche${h>1?'s':''} : <b>${pct(k,8)}</b> de chances de la tuer.`;$('#ti-foe',r).innerHTML=`<div class="foe${S.dead?' dead':''}">${tok(S.t)}<div><b>${TY[S.t]}</b></div><div class="h">Touches : <span class="cubes">${'■'.repeat(S.cubes)||'aucune'}</span></div></div>${S.m==='melee'?`<div class="foe"><div class="h">Cartes Contamination reçues</div><b>${S.cont}</b></div>`:''}`};
 const shoot=v=>{if(S.dead){$('#ti-out',r).textContent='Cette cible est déjà morte : prenez-en une nouvelle.';return}
  const lines=[];if(S.m==='melee'){S.cont++;lines.push('Mêlée : vous recevez d\'abord <b>1 carte Contamination</b>.')}
  S.cubes++;lines.push(`Vous posez 1 touche : la cible en a maintenant <b>${S.cubes}</b>.`);
  if(S.t==='larve'){S.dead=true;lines.push('Une Larve meurt dès qu\'elle reçoit une touche, <b>quel que soit le dé</b>.')}
  else if(v==='Critique'){S.dead=true;lines.push('<b>Coup critique</b> : la cible meurt.')}
  else if(v==='Munitions')lines.push('Pris de panique, vous tirez plusieurs fois : <b>dépensez des munitions</b> (un jeton plein se retourne, un jeton à moitié se défausse). La cible survit.');
  else if(v==='Vide')lines.push('<b>Aucun effet.</b>');
  else{const n=+v;if(n<=S.cubes){S.dead=true;lines.push(`${n} est inférieur ou égal à ${S.cubes} touche${S.cubes>1?'s':''} : <b>la cible meurt</b>.`)}else lines.push(`${n} est plus grand que ${S.cubes} : <b>la cible survit</b>, avec ses touches.`)}
  if(!S.dead&&S.m==='melee')lines.push('Elle <b>riposte</b> aussitôt : résolvez une attaque d\'Intrus, sauf si vous placez un marqueur Panne sur l\'une de vos armes pour la parer.');
  draw();$('#ti-out',r).innerHTML=lines.map(x=>`<p style="margin:0 0 5px">${x}</p>`).join('');$('#ti-out',r).className=S.dead?'out ok':'out'};
 $('#ti-roll',r).onclick=()=>{const v=DE_TIR[rnd(8)],m=segVal(r,'ti-m');shoot(v==='C'?'Critique':v==='M'?(m==='tir'?'Munitions':'Vide'):v)};wireSeg(r,'ti-t',reset);wireSeg(r,'ti-m',reset);$('#ti-reset',r).onclick=reset;reset()}},

/* ===== rafale ===== */
rafale:{html:()=>`<div class="lab"><h3>Simulateur : répartir une rafale</h3><p class="hint">Choisissez la face du dé Rafale, puis répartissez les touches : 1 au plus par Adulte ou Larve, exactement 2 par Guerrier.</p>
<div class="foes" id="ra-foes"></div>
<div class="dice" id="ra-dice">${[1,2,3].map(v=>`<button type="button" data-v="${v}">${v}</button>`).join('')}<button type="button" data-v="4">4 ✦</button><button type="button" class="pri" id="ra-roll">Lancer le dé</button></div>
<p class="small muted">Dé Rafale (6 faces) : trois 1, un 2, un 3, un 4. Une chance sur deux de ne faire qu'une touche ; 2 touches en moyenne.</p>
<div class="out" id="ra-left">Choisissez une face du dé Rafale.</div>
<div class="row" style="margin-top:8px"><button type="button" class="pri" id="ra-go" disabled>Résoudre</button><button type="button" id="ra-new">Nouveau couloir</button></div><div class="out" id="ra-out" hidden></div></div>`,
init(r){let S;
 const neu=()=>{const n=2+rnd(4),f=[];for(let i=0;i<n;i++)f.push({k:['adulte','adulte','guerrier','larve'][rnd(4)],h:0,dead:false});f.sort((a,b)=>SIZE[b.k]-SIZE[a.k]);S={f,res:0,done:false};$('#ra-go',r).disabled=true;$('#ra-out',r).hidden=true;$$('#ra-dice button',r).forEach(b=>b.classList.remove('sel'));draw()};
 const used=()=>S.f.reduce((a,x)=>a+x.h,0);
 const draw=()=>{$('#ra-foes',r).innerHTML=S.f.map((x,i)=>`<div class="foe${x.dead?' dead':''}">${tok(x.k)}<div><b>${TY[x.k]}</b></div><div class="h">Touches : <span class="cubes">${'■'.repeat(x.h)||'0'}</span></div>${S.res&&!S.done?`<div class="row"><button type="button" data-i="${i}" data-d="-1" aria-label="Retirer une touche">−</button><button type="button" data-i="${i}" data-d="1" aria-label="Ajouter une touche">+</button></div>`:''}</div>`).join('');
  $$('#ra-foes [data-i]',r).forEach(b=>b.onclick=()=>{const x=S.f[+b.dataset.i],d=+b.dataset.d,step=x.k==='guerrier'?2:1,max=x.k==='guerrier'?2:1;const nh=x.h+d*step;if(nh<0||nh>max)return;if(d>0&&used()+step>S.res)return;x.h=nh;draw()});
  if(S.res&&!S.done){const l=S.res-used();$('#ra-left',r).innerHTML=`${S.res} touche${S.res>1?'s':''} à répartir : <b>${l}</b> restante${l>1?'s':''}.${l&&S.f.some(x=>x.k==='guerrier'&&!x.h)&&l<2?' Une seule touche ne peut pas aller sur un Guerrier : elle sera perdue.':''}`}};
 $$('#ra-dice button[data-v]',r).forEach(b=>b.onclick=()=>{if(S.done)neu();$$('#ra-dice button',r).forEach(x=>x.classList.remove('sel'));b.classList.add('sel');S.res=+b.dataset.v;S.f.forEach(x=>x.h=0);$('#ra-go',r).disabled=false;$('#ra-out',r).hidden=true;draw()});
 $('#ra-go',r).onclick=()=>{let k=0;S.f.forEach(x=>{if(x.h&&(x.k!=='guerrier'||x.h===2)){x.dead=true;k++}});const lost=S.res-used();S.done=true;draw();
  $('#ra-left',r).textContent='';$('#ra-out',r).hidden=false;$('#ra-out',r).className=k?'out ok':'out';
  $('#ra-out',r).innerHTML=`<b>${k} Intrus tué${k>1?'s':''}.</b>${lost?` ${plural(lost,'touche perdue','touches perdues')}.`:''}${S.res===4?' Le 4 porte aussi l\'icône spéciale : appliquez l\'effet de votre arme s\'il y en a un.':''} Les survivants ne gardent aucune blessure dans un couloir.`};
 $('#ra-roll',r).onclick=()=>{const v=DE_RAFALE[rnd(6)];$(`#ra-dice button[data-v="${v}"]`,r).click()};$('#ra-new',r).onclick=neu;neu()}},

/* ===== fin de partie ===== */
fin:{html:()=>`<div class="lab"><h3>Simulateur : survivre à l'éclosion</h3><p class="hint">Avec une Larve sur votre plateau à la fin, vous ajoutez 1 Contamination, mélangez toutes vos cartes et en tirez 4 : une seule Contamination vous tue. Ajustez votre paquet pour voir le risque.</p>
<div class="row"><label class="f">Cartes Action<input type="number" id="fi-a" min="4" max="20" value="10"></label><label class="f">Cartes Contamination<input type="number" id="fi-c" min="0" max="27" value="3"></label><label class="chk"><input type="checkbox" id="fi-l" checked> Larve sur votre plateau</label></div>
<div class="out" id="fi-out"></div><div class="row" style="margin-top:8px"><button type="button" id="fi-sim">Tirer 4 cartes</button></div><div class="out" id="fi-sim-out" hidden></div></div>`,
init(r){const C=(n,k)=>{if(k<0||k>n)return 0;let x=1;for(let i=0;i<k;i++)x=x*(n-i)/(i+1);return x};
 const upd=()=>{const a=Math.max(0,+$('#fi-a',r).value||0),c=Math.max(0,+$('#fi-c',r).value||0),l=$('#fi-l',r).checked;
  if(!l){$('#fi-out',r).innerHTML=`Sans Larve, vous résolvez d'abord une <b>procédure d'infection</b> : vous scannez vos ${c} carte${c>1?'s':''} Contamination. ${c?'Si l\'une est infectée, une Larve apparaît et l\'éclosion suit (cochez la case pour voir ce risque). Sinon, vous survivez.':'Sans Contamination, rien ne peut vous infecter : vous survivez.'}`;$('#fi-out',r).className=c?'out':'out ok';$('#fi-sim',r).disabled=true;return}
  const cc=c+1,n=a+cc,p=n>=4?1-C(a,4)/C(n,4):1;$('#fi-sim',r).disabled=false;
  $('#fi-out',r).innerHTML=`Paquet : ${a} Action + ${cc} Contamination (dont celle de la Larve) = ${n} cartes.<div class="meter"><i style="width:${Math.round(100*p)}%"></i></div><b>${Math.round(100*p)} %</b> de risque de mourir à l'éclosion.${c===0?' Même sans autre Contamination, la carte ajoutée par la Larve suffit à vous menacer.':''}`;$('#fi-out',r).className='out'};
 $('#fi-sim',r).onclick=()=>{const a=+$('#fi-a',r).value||0,cc=(+$('#fi-c',r).value||0)+1;const deck=Array(a).fill('A').concat(Array(cc).fill('C'));for(let i=deck.length-1;i>0;i--){const j=rnd(i+1);[deck[i],deck[j]]=[deck[j],deck[i]]}const h=deck.slice(0,4),bad=h.filter(x=>x==='C').length;
  $('#fi-sim-out',r).hidden=false;$('#fi-sim-out',r).className=bad?'out bad':'out ok';$('#fi-sim-out',r).innerHTML=`Vous tirez : ${h.map(x=>x==='C'?'<b>Contamination</b>':'Action').join(', ')}. ${bad?'<b>La Larve éclot : votre personnage est tué.</b>':'<b>Vous survivez</b> : défaussez votre main.'}`};
 ['fi-a','fi-c'].forEach(id=>$('#'+id,r).oninput=upd);$('#fi-l',r).onchange=upd;upd()}}
};
