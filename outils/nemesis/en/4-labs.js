
/* ---------- labs (English) ----------
   The reader picks the die faces: the app does not simulate the dice, only the rules. Keep in step with ../4-labs.js. */
const seg=(id,vals,cur,lab)=>`<div class="seg" id="${id}" role="group">${vals.map((v,i)=>`<button type="button" data-v="${v}" class="${v==cur?'sel':''}">${lab?lab[i]:v}</button>`).join('')}</div>`;
function segVal(root,id){const b=$(`#${id} .sel`,root);return b?b.dataset.v:''}
function wireSeg(root,id,cb){$$(`#${id} button`,root).forEach(b=>b.onclick=()=>{$$(`#${id} button`,root).forEach(x=>x.classList.remove('sel'));b.classList.add('sel');cb()})}
const TY={reine:'Queen',guerrier:'Drone',adulte:'Adult',larve:'Larva',vierge:'Blank'};
const TYP={reine:'Queens',guerrier:'Drones',adulte:'Adults',larve:'Larvae',vierge:'Blank'};
const SIZE={reine:4,guerrier:3,adulte:2,larve:1};
const tok=k=>`<span class="tok ${k}" title="${TY[k]}">${{reine:'Q',guerrier:'D',adulte:'A',larve:'L',vierge:'∅'}[k]}</span>`;
const plural=(n,s,p)=>`${n} ${n>1?p:s}`;
/* real die faces (given by the game's owner) */
const DE_BRUIT=['1','2','2','3','3','4','4','4','D','D'], DE_RAFALE=[1,1,1,2,3,4];
const pct=(n,d)=>Math.round(100*n/d)+'%';

const LABS={
/* ===== sac Intrus ===== */
sac:{html:()=>`<div class="lab"><h3>Lab: the colony grows</h3><p class="hint">Build the starting bag, then draw. The app applies the Intruder Help sheet ("The Queen is alive" side, or "dead" if you tick the box) and shows the chance of each type on the next draw.</p>
<div class="row">Characters ${seg('sa-n',[1,2,3,4,5],3)} <button type="button" id="sa-reset">Start over</button></div>
<div class="row" style="margin-top:8px"><label class="chk"><input type="checkbox" id="sa-q"> The Queen is on the board</label><label class="chk"><input type="checkbox" id="sa-dead"> The Queen is dead</label></div>
<div class="bag" id="sa-bag" aria-live="polite"></div><div class="counts" id="sa-cnt"></div>
<div class="row"><button type="button" class="pri" id="sa-ev">Event Phase: draw</button><button type="button" id="sa-co">Noise marker resolved (Corridor)</button><button type="button" id="sa-sa">Hazard result (Room)</button></div>
<div class="out" id="sa-out">Draw to see what happens.</div><ul class="log" id="sa-log"></ul></div>`,
init(r){const TOT={reine:9,guerrier:8,adulte:16,larve:6,vierge:1};let S;
 const reset=()=>{const n=+segVal(r,'sa-n');S={bag:{reine:0,guerrier:0,adulte:3+n,larve:2,vierge:1},out:0,log:[],manche:1};draw();$('#sa-out',r).textContent='Starting bag: 1 Blank token, 2 Larvae, 3 Adults + 1 Adult per Character.';$('#sa-out',r).className='out'};
 const pile=k=>TOT[k]-S.bag[k]-(k==='reine'?S.out:0);
 const add=(k,n)=>{const m=Math.min(n,pile(k));S.bag[k]+=m;return m<n?` (pile empty: only ${m})`:''};
 const total=()=>Object.values(S.bag).reduce((a,b)=>a+b,0);
 const draw=()=>{const order=['reine','guerrier','adulte','larve','vierge'];$('#sa-bag',r).innerHTML=order.flatMap(k=>Array(S.bag[k]).fill(tok(k))).join('')||'<span class="muted">Empty bag</span>';const t=total();
  $('#sa-cnt',r).innerHTML=order.map(k=>`<div>${TYP[k]}<br><b>${S.bag[k]}</b> <span class="muted small">${t?Math.round(100*S.bag[k]/t):0} %</span></div>`).join('');$('#sa-log',r).innerHTML=S.log.slice(-8).reverse().map(x=>`<li>${x}</li>`).join('')};
 const pickTok=()=>{let x=rnd(total());for(const k in S.bag){if(x<S.bag[k])return k;x-=S.bag[k]}return null};
 const go=mode=>{if(!total()){$('#sa-out',r).textContent='The bag is empty.';return}const k=pickTok(),q=$('#sa-q',r).checked,dead=$('#sa-dead',r).checked;let m='',back=false,gone=false;
  if(dead&&k!=='vierge'){const lieu=mode==='co'?'the Corridor':'your Room';
   if(k==='reine'){gone=true;m=mode==='ev'?`<b>Add 2 Drones</b> to the bag.`+add('guerrier',2):`<b>Place 1 Drone</b> in ${lieu}.`}
   else if(mode==='ev')m=k==='larve'?`<b>Add 2 Drones</b> to the bag.`+add('guerrier',2):`<b>Add 2 Larvae</b> to the bag.`+add('larve',2);
   else if(mode==='co')m=k==='larve'?'<b>Place 1 Larva</b> in the Corridor.':'<b>Place the number of Intruders shown on the back of the token</b> in the Corridor (white number: Adults; red number: Drones).';
   else m=`<b>Place 1 ${TY[k]}</b> in your Room: it Attacks at once.`}
  else if(mode==='ev'){

   if(k==='reine'){if(q)m='The Queen is on the board: <b>activate her</b> (she Attacks a Character in her Room, otherwise moves once towards the closest one).';else m='The Queen is not on the board: <b>add 2 Larvae</b> to the bag.'+add('larve',2)}
   else if(k==='guerrier'||k==='adulte')m=`<b>Add 2 Queens</b> to the bag.`+add('reine',2);
   else if(k==='larve')m=`<b>Add 2 Drones</b> to the bag.`+add('guerrier',2);
   else{m=`<b>Add 2 Adults</b> to the bag.`+add('adulte',2);back=true}}
  else{const lieu=mode==='co'?'the Corridor':'your Room';
   if(k==='reine'){if(q)m='<b>Activate the Queen.</b>';else{m=`The Queen is not on the board: <b>place her in ${lieu}</b>.`;$('#sa-q',r).checked=true}}
   else if(k==='vierge'){m=`Nothing appears: <b>add 2 Adults</b> to the bag.`+add('adulte',2);back=true}
   else if(mode==='co'&&k==='larve')m='<b>Place 1 Larva</b> in the Corridor.';
   else if(mode==='co')m='<b>Place the number of Intruders shown on the back of the token</b> in the Corridor (white number: Adults; red number: Drones).';
   else m=`<b>Place 1 ${TY[k]}</b> in your Room: it Attacks at once.`}
  if(gone){S.bag[k]--;S.out++;m+=' The Queen token is <b>removed from the game</b>.';}else if(!back){S.bag[k]--;m+=` The ${TY[k]} token goes back under its pile.`}else m+=' The Blank token goes back into the bag.';
  const lab={ev:'Event Phase',co:'Noise marker',sa:'Hazard'}[mode];
  $('#sa-out',r).innerHTML=`${tok(k)} <b>${lab}: ${TY[k]} token.</b> ${m}`;$('#sa-out',r).className='out';S.log.push(`${lab}: ${TY[k]}`);draw()};
 $('#sa-dead',r).onchange=e=>{const d=e.target.checked;if(d)$('#sa-q',r).checked=false;$('#sa-q',r).disabled=d};wireSeg(r,'sa-n',reset);$('#sa-reset',r).onclick=reset;$('#sa-ev',r).onclick=()=>go('ev');$('#sa-co',r).onclick=()=>go('co');$('#sa-sa',r).onclick=()=>go('sa');reset()}},

/* ===== jet de bruit ===== */
bruit:{html:()=>`<div class="lab"><h3>Lab: the Noise roll</h3><p class="hint">Your Character has just entered the middle Room. Pick the face rolled on the Noise die: the app applies the rule to each adjacent Corridor.</p>
<div class="map" id="br-map"></div>
<div class="dice" id="br-dice">${[1,2,3,4].map(v=>`<button type="button" data-v="${v}">${v}</button>`).join('')}<button type="button" data-v="D">Hazard</button></div>
<div class="row"><button type="button" class="pri" id="br-roll">Roll the die</button><button type="button" id="br-new">New situation</button></div><p class="small muted" id="br-p"></p><div class="out" id="br-out">Pick a die face.</div></div>`,
init(r){let S;const POS=[1,3,5,7];
 const neu=()=>{const cors=[];const k=2+rnd(3);const pos=[...POS].sort(()=>Math.random()-.5).slice(0,k);
  pos.forEach((p,i)=>{const num=i===0&&Math.random()<.35?0:1+rnd(4);const c={p,num,bruit:false,app:false,intrus:[]};if(num){const x=rnd(3);if(x===1)c.bruit=true;else if(x===2){const n=1+rnd(3);for(let j=0;j<n;j++)c.intrus.push(['adulte','adulte','larve','guerrier'][rnd(4)])}}cors.push(c)});
  if(!cors.some(c=>c.num))cors[0].num=2;S={cors,room:[],hit:[]};draw();$('#br-out',r).textContent='Pick a die face.';$('#br-out',r).className='out'};
 const draw=()=>{let h='';for(let i=0;i<9;i++){const c=S.cors.find(x=>x.p===i);
  if(i===4)h+=`<div class="room">Your Room${S.room.length?`<div>${S.room.map(tok).join(' ')}</div>`:''}</div>`;
  else if(c)h+=`<div class="cor${c.num===0?' reinf':''}${S.hit&&S.hit.includes&&S.hit.includes(c.p)?' hit':''}"><div class="num">${c.num}</div>${c.num===0?'Reinforced':c.intrus.length?c.intrus.map(tok).join(' '):c.app?'Intruders appeared (per the token)':c.bruit?'⚠ Noise marker':'empty'}</div>`;
  else h+='<div class="empty"></div>'}$('#br-map',r).innerHTML=h;
  const nums=new Set(S.cors.filter(c=>c.num).map(c=>c.num+'')),rien=DE_BRUIT.filter(f=>f!=='D'&&!nums.has(f)).length,ent=DE_BRUIT.filter(f=>f!=='D'&&S.cors.some(c=>c.num+''===f&&(c.intrus.length||c.app))).length,dg=DE_BRUIT.filter(f=>f==='D').length;
  $('#br-p',r).innerHTML=`Noise die (10 faces: one 1, two 2s, two 3s, three 4s, two Hazards). On this map: <b>${pct(rien,10)}</b> nothing happens, <b>${pct(ent,10)}</b> an Intruder from a Corridor enters your Room, <b>${pct(dg,10)}</b> Hazard.`};
 const roll=v=>{if(v==='D'){S.hit=[];draw();$('#br-out',r).innerHTML='<b>Hazard!</b> Something jumps from the ceiling: draw a token from the Intruder bag and resolve it in the "Room" column of the Help sheet. Most of the time, an Intruder of the type shown appears in your Room and Attacks you. Ignore the number on the back and put the token back under its pile (the Blank token goes back into the bag).';$('#br-out',r).className='out bad';return}
  const n=+v,cs=S.cors.filter(c=>c.num===n);S.hit=cs.map(c=>c.p);
  if(!cs.length){draw();$('#br-out',r).innerHTML=`No adjacent Corridor shows ${n}: <b>nothing happens</b>. Phew.`;$('#br-out',r).className='out ok';return}
  const lines=cs.map(c=>{if(c.intrus.length){c.intrus.sort((a,b)=>SIZE[b]-SIZE[a]);const k=c.intrus.shift();S.room.push(k);return `Corridor ${n}: it holds Intruders, <b>the largest (${TY[k]}) enters your Room</b> and Attacks you${k==='larve'?' (a Larva contaminates and infects you)':''}.`}
   if(c.app)return `Corridor ${n}: Intruders appeared there, <b>the largest enters your Room</b> and Attacks you.`;
   if(c.bruit){c.bruit=false;c.app=true;return `Corridor ${n}: there was already a Noise marker, <b>resolve it</b>: remove it and draw a token from the bag ("Corridor" column); Intruders appear in that Corridor.`}
   c.bruit=true;return `Corridor ${n}: empty and unmarked, <b>place a Noise marker</b>.`});
  draw();
  $('#br-out',r).innerHTML=lines.map(x=>`<p style="margin:0 0 6px">${x}</p>`).join('')+'<p class="small muted" style="margin:0">Roll again on the same situation to watch the markers turn into Intruders.</p>';$('#br-out',r).className=S.room.length?'out bad':'out'};
 $$('#br-dice button',r).forEach(b=>b.onclick=()=>roll(b.dataset.v));$('#br-roll',r).onclick=()=>{const v=DE_BRUIT[rnd(10)];roll(v);$('#br-out',r).insertAdjacentHTML('afterbegin',`<p style="margin:0 0 6px"><b>You roll: ${v==='D'?'Hazard':v}.</b></p>`)};$('#br-new',r).onclick=neu;neu()}},

/* ===== shooting and melee ===== */
tir:{html:()=>`<div class="lab"><h3>Lab: Shooting and Melee in a Room</h3><p class="hint">Pick the target and the type of attack, then the face rolled on the Shoot die. The Hit is always placed <b>before</b> the roll.</p>
<div class="row">Target ${seg('ti-t',['adulte','guerrier','larve'],'adulte',['Adult','Drone','Larva'])} Attack ${seg('ti-m',['tir','melee'],'tir',['Shoot','Melee'])}</div>
<div class="foes" id="ti-foe"></div>
<div class="dice" id="ti-dice"></div>
<div class="row"><button type="button" id="ti-reset">New target</button></div><div class="out" id="ti-out">Pick a face of the Shoot die.</div></div>`,
init(r){let S;
 const reset=()=>{S={t:segVal(r,'ti-t'),m:segVal(r,'ti-m'),cubes:0,dead:false,cont:0};faces();draw();$('#ti-out',r).textContent='Pick a face of the Shoot die.';$('#ti-out',r).className='out'};
 const faces=()=>{const last=segVal(r,'ti-m')==='tir'?'Ammo':'Blank';$('#ti-dice',r).innerHTML=['Critical','2','3','4','5',last].map(v=>`<button type="button" data-v="${v}">${v}</button>`).join('');$$('#ti-dice button',r).forEach(b=>b.onclick=()=>shoot(b.dataset.v))};
 const draw=()=>{$('#ti-foe',r).innerHTML=`<div class="foe${S.dead?' dead':''}">${tok(S.t)}<div><b>${TY[S.t]}</b></div><div class="h">Hits: <span class="cubes">${'■'.repeat(S.cubes)||'none'}</span></div></div>${S.m==='melee'?`<div class="foe"><div class="h">Contamination cards received</div><b>${S.cont}</b></div>`:''}`};
 const shoot=v=>{if(S.dead){$('#ti-out',r).textContent='This target is already dead: take a new one.';return}
  const lines=[];if(S.m==='melee'){S.cont++;lines.push('Melee: you first get <b>1 Contamination card</b>.')}
  S.cubes++;lines.push(`You place 1 Hit: the target now has <b>${S.cubes}</b>.`);
  if(S.t==='larve'){S.dead=true;lines.push('A Larva dies as soon as it receives a Hit, <b>whatever the die</b>.')}
  else if(v==='Critical'){S.dead=true;lines.push('<b>Critical hit</b>: the target dies.')}
  else if(v==='Ammo')lines.push('You lost too many bullets: <b>spend Ammo</b> (a full token is flipped, a half token is discarded). The target survives.');
  else if(v==='Blank')lines.push('<b>No effect.</b>');
  else{const n=+v;if(n<=S.cubes){S.dead=true;lines.push(`${n} is lower than or equal to ${S.cubes} Hit${S.cubes>1?'s':''}: <b>the target dies</b>.`)}else lines.push(`${n} is higher than ${S.cubes}: <b>the target survives</b>, keeping its Hits.`)}
  if(!S.dead&&S.m==='melee')lines.push('It <b>strikes back</b> at once: resolve an Intruder Attack, unless you place a Malfunction marker on one of your Weapons to block it.');
  draw();$('#ti-out',r).innerHTML=lines.map(x=>`<p style="margin:0 0 5px">${x}</p>`).join('');$('#ti-out',r).className=S.dead?'out ok':'out'};
 wireSeg(r,'ti-t',reset);wireSeg(r,'ti-m',reset);$('#ti-reset',r).onclick=reset;reset()}},

/* ===== rafale ===== */
rafale:{html:()=>`<div class="lab"><h3>Lab: assigning a Burst</h3><p class="hint">Pick the face of the Burst die, then assign the Hits: at most 1 per Adult or Larva, exactly 2 per Drone.</p>
<div class="foes" id="ra-foes"></div>
<div class="dice" id="ra-dice">${[1,2,3].map(v=>`<button type="button" data-v="${v}">${v}</button>`).join('')}<button type="button" data-v="4">4 ✦</button><button type="button" class="pri" id="ra-roll">Roll the die</button></div>
<p class="small muted">Burst die (6 faces): three 1s, one 2, one 3, one 4. Half the time you get a single Hit; 2 Hits on average.</p>
<div class="out" id="ra-left">Pick a face of the Burst die.</div>
<div class="row" style="margin-top:8px"><button type="button" class="pri" id="ra-go" disabled>Resolve</button><button type="button" id="ra-new">New Corridor</button></div><div class="out" id="ra-out" hidden></div></div>`,
init(r){let S;
 const neu=()=>{const n=2+rnd(4),f=[];for(let i=0;i<n;i++)f.push({k:['adulte','adulte','guerrier','larve'][rnd(4)],h:0,dead:false});f.sort((a,b)=>SIZE[b.k]-SIZE[a.k]);S={f,res:0,done:false};$('#ra-go',r).disabled=true;$('#ra-out',r).hidden=true;$$('#ra-dice button',r).forEach(b=>b.classList.remove('sel'));draw()};
 const used=()=>S.f.reduce((a,x)=>a+x.h,0);
 const draw=()=>{$('#ra-foes',r).innerHTML=S.f.map((x,i)=>`<div class="foe${x.dead?' dead':''}">${tok(x.k)}<div><b>${TY[x.k]}</b></div><div class="h">Hits: <span class="cubes">${'■'.repeat(x.h)||'0'}</span></div>${S.res&&!S.done?`<div class="row"><button type="button" data-i="${i}" data-d="-1" aria-label="Remove a Hit">−</button><button type="button" data-i="${i}" data-d="1" aria-label="Add a Hit">+</button></div>`:''}</div>`).join('');
  $$('#ra-foes [data-i]',r).forEach(b=>b.onclick=()=>{const x=S.f[+b.dataset.i],d=+b.dataset.d,step=x.k==='guerrier'?2:1,max=x.k==='guerrier'?2:1;const nh=x.h+d*step;if(nh<0||nh>max)return;if(d>0&&used()+step>S.res)return;x.h=nh;draw()});
  if(S.res&&!S.done){const l=S.res-used();$('#ra-left',r).innerHTML=`${S.res} Hit${S.res>1?'s':''} to assign: <b>${l}</b> left.${l&&S.f.some(x=>x.k==='guerrier'&&!x.h)&&l<2?' A single Hit cannot go on a Drone: it will be lost.':''}`}};
 $$('#ra-dice button[data-v]',r).forEach(b=>b.onclick=()=>{if(S.done)neu();$$('#ra-dice button',r).forEach(x=>x.classList.remove('sel'));b.classList.add('sel');S.res=+b.dataset.v;S.f.forEach(x=>x.h=0);$('#ra-go',r).disabled=false;$('#ra-out',r).hidden=true;draw()});
 $('#ra-go',r).onclick=()=>{let k=0;S.f.forEach(x=>{if(x.h&&(x.k!=='guerrier'||x.h===2)){x.dead=true;k++}});const lost=S.res-used();S.done=true;draw();
  $('#ra-left',r).textContent='';$('#ra-out',r).hidden=false;$('#ra-out',r).className=k?'out ok':'out';
  $('#ra-out',r).innerHTML=`<b>${k} Intruder${k>1?'s':''} killed.</b>${lost?` ${plural(lost,'Hit lost','Hits lost')}.`:''}${S.res===4?' The 4 also shows the special icon: apply your Weapon\'s effect, if any.':''} Survivors keep no wounds in a Corridor.`};
 $('#ra-roll',r).onclick=()=>{const v=DE_RAFALE[rnd(6)];$(`#ra-dice button[data-v="${v}"]`,r).click()};$('#ra-new',r).onclick=neu;neu()}},

/* ===== fin de partie ===== */
fin:{html:()=>`<div class="lab"><h3>Lab: surviving the hatching</h3><p class="hint">With a Larva on your board at the end, you add 1 Contamination, shuffle all your cards and draw 4: a single Contamination kills you. Adjust your deck to see the risk.</p>
<div class="row"><label class="f">Action cards<input type="number" id="fi-a" min="4" max="20" value="10"></label><label class="f">Contamination cards<input type="number" id="fi-c" min="0" max="27" value="3"></label><label class="chk"><input type="checkbox" id="fi-l" checked> Larva on your board</label></div>
<div class="out" id="fi-out"></div><div class="row" style="margin-top:8px"><button type="button" id="fi-sim">Draw 4 cards</button></div><div class="out" id="fi-sim-out" hidden></div></div>`,
init(r){const C=(n,k)=>{if(k<0||k>n)return 0;let x=1;for(let i=0;i<k;i++)x=x*(n-i)/(i+1);return x};
 const upd=()=>{const a=Math.max(0,+$('#fi-a',r).value||0),c=Math.max(0,+$('#fi-c',r).value||0),l=$('#fi-l',r).checked;
  if(!l){$('#fi-out',r).innerHTML=`Without a Larva, you first resolve an <b>Infection Procedure</b>: you scan your ${c} Contamination card${c>1?'s':''}. ${c?'If one is infected, a Larva appears and hatching follows (tick the box to see that risk). Otherwise, you survive.':'With no Contamination, nothing can infect you: you survive.'}`;$('#fi-out',r).className=c?'out':'out ok';$('#fi-sim',r).disabled=true;return}
  const cc=c+1,n=a+cc,p=n>=4?1-C(a,4)/C(n,4):1;$('#fi-sim',r).disabled=false;
  $('#fi-out',r).innerHTML=`Deck: ${a} Action + ${cc} Contamination (including the Larva's) = ${n} cards.<div class="meter"><i style="width:${Math.round(100*p)}%"></i></div><b>${Math.round(100*p)}%</b> risk of dying at hatching.${c===0?' Even with no other Contamination, the card added by the Larva is enough to threaten you.':''}`;$('#fi-out',r).className='out'};
 $('#fi-sim',r).onclick=()=>{const a=+$('#fi-a',r).value||0,cc=(+$('#fi-c',r).value||0)+1;const deck=Array(a).fill('A').concat(Array(cc).fill('C'));for(let i=deck.length-1;i>0;i--){const j=rnd(i+1);[deck[i],deck[j]]=[deck[j],deck[i]]}const h=deck.slice(0,4),bad=h.filter(x=>x==='C').length;
  $('#fi-sim-out',r).hidden=false;$('#fi-sim-out',r).className=bad?'out bad':'out ok';$('#fi-sim-out',r).innerHTML=`You draw: ${h.map(x=>x==='C'?'<b>Contamination</b>':'Action').join(', ')}. ${bad?'<b>The Larva hatches: your Character is killed.</b>':'<b>You survive</b>: discard your hand.'}`};
 ['fi-a','fi-c'].forEach(id=>$('#'+id,r).oninput=upd);$('#fi-l',r).onchange=upd;upd()}}
};
