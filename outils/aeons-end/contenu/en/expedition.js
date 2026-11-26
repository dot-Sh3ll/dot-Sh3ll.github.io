/* ---------- expédition (règles d'Une Ère Nouvelle) ---------- */
const NEMLVL={"Carapace Queen":1,"Crooked Mask":2,"Prince of Gluttons":2,"Rageborne":1,"Horde-Crone":2,"Blight Lord":2,"Wayward One":3,"Gate Witch":4,"Hollow Crown":3,"Magus of Cloaks":3,"Umbra Titan":1,"Knight of Shackles":1,"Maiden of Thorns":3,"Thrice-Dead Prophet":2,"Wraithmonger":4,"Bladius":1,"Deathmind":4,"Fungal Mesh":2,"Maelstrom: Risen":4,"Spawning Horror":1,"Xaxos: Ascended":4,"Maggoth":1,"Arachnos":2,"Ageless Walker":3,"Fenrix":4,"Necroswarm":4,"The Wailing":3,"The Wanderer":3,"Experiment 153":1,"Thief of Dreams":2,"Risen Thrall":3,"Fountain of Souls":4,"Burrower":4,"Fortress":2,"The Burning Kor":4,"Bishop of Scrolls":1,"Bishop: Returned":3,"Fate Shepherd":1,"Griefweaver":4,"Mist Revealed":4,"Mother of Rust":2,"Paradox of Bone":4,"Paradox of Myth":4,"Paradox of Myth and Bone":3,"Rust Amalgam":3,"Rust Superion":2,"Stonemonger":2,"Infested Mutation":3,"Erythiza, Consumed":4,"Herald of the End":2,"The Changeling Nest":3,"Corruption's Core":4,"Clouded Mesmer":4,"The Endless Decay":3,"The Infecter":1,"The Coven":2,"The Blight":3,"The Wrath":4,"The Reliquary":3,"Absorbing Wraith":4,"The Terror in Brass":1,"Twice-Dead Prophet":3,"Oracle of Filth":2,"Wayward Reflection":4,"Crooked Mask (Beyond the Breach)":2,"Rampaging Vin":4,"The Timeless":3};
const DECK={2:[["3A","5A","7A"],["1V + 2A","3V + 2A","3V + 4A"],["2V + 1A","4V + 1A","5V + 2A"],["3V","5V","7V"]],
  3:[["5A","6A","7A"],["1V + 4A","3V + 3A","3V + 4A"],["2V + 3A","4V + 2A","5V + 2A"],["3V + 2A","5V + 1A","7V"]],
  4:[["8A","7A","7A"],["1V + 7A","3V + 4A","3V + 4A"],["2V + 6A","4V + 3A","5V + 2A"],["3V + 5A","5V + 2A","7V"]]};
const XVAR={std:{name:"Standard",first:1,last:4},short:{name:"Short",first:2,last:4},long:{name:"Long",first:1,last:8}};
const ROMAN=["","I","II","III"], TYPEFR={Gem:"Gem",Relic:"Relic",Spell:"Spell"};
const XNEED={Gem:3,Relic:2,Spell:4};
const xlevel=(E,b)=>E.variant==="long"?Math.ceil(b/2):b;
function xgather(E,b){ // trésors gagnés après une victoire au combat b
  const t = E.variant==="long" ? {2:1,4:2,6:3}[b] : {1:1,2:2,3:3}[b];
  return t?{tier:t,n:t===2?3:5}:null;
}
const mageOwned=m=>owned.has(m[1]), nemOwned=n=>owned.has(n[1]);
let exps=[], xstate="loading", xd=null, xkey="", xbusy=false, xconfirm="";
let xq=Promise.resolve();
function xsave(E){ const data=JSON.parse(JSON.stringify(E)); delete data.id;
  xq=xq.then(()=>db.doc("expeditions/"+E.id).set(data)).catch(()=>{ xmsg="Can't save right now. Try again in a moment."; renderExp(); });
  return xq; }
let xmsg="";
function rollCard(type,used){ const c=CARDS.filter(x=>x.type===type&&owned.has(x.box)&&!used.has(x.id)); return c.length?pick(c).id:null }
function rollMage(used){ const c=MAGES.filter(m=>mageOwned(m)&&!used.has(m[0])); return c.length?pick(c)[0]:null }
const cardName=id=>{ const c=CARDS.find(x=>x.id===id); return c?c.fr:id };
const today=()=>{ const d=new Date(); return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0") };
function addSupplies(E){ // une gemme, une relique, un sort nouveaux
  const used=new Set(E.used), got=[];
  ["Gem","Relic","Spell"].forEach(t=>{ const id=rollCard(t,used); if(id){ used.add(id); got.push(id); } });
  E.used=[...used]; E.barracks.cards=E.barracks.cards.concat(got); return got;
}
function createExp(){
  if(!db) return;
  const variant=$("x-var").value, players=+$("x-pl").value;
  const E={name:$("x-name").value.trim()||("Expedition of "+today().split("-").reverse().join("/")),variant,players,endless:$("x-endless").checked,
    status:"active",created:today(),ts:Date.now(),battle:XVAR[variant].first,phase:"prep",score:0,
    barracks:{cards:[],mages:[]},used:[],usedMages:[],treasures:{1:0,2:0,3:0},cur:{tries:0},history:[],last:null};
  const used=new Set();
  Object.entries(XNEED).forEach(([t,n])=>{ for(let i=0;i<n;i++){ const id=rollCard(t,used); if(id){ used.add(id); E.barracks.cards.push(id); } } });
  E.used=[...used];
  const um=new Set(); for(let i=0;i<4;i++){ const m=rollMage(um); if(m){ um.add(m); E.barracks.mages.push(m); } }
  E.usedMages=[...um];
  if(variant==="short"){ const got=addSupplies(E); E.treasures[1]+=5;
    E.last={kind:"start",cards:got,text:"Short expedition: fight 1 counts as won. Add these cards to your barracks and draw 5 tier I treasures."}; }
  if(E.barracks.cards.length<9||E.barracks.mages.length<players){ xmsg="Not enough cards or mages in the ticked boxes to start an expedition."; renderExp(); return; }
  E.id="x"+Date.now().toString(36); xmsg="";
  exps=exps.concat([E]); renderExp(); xsave(E);
}
function logBattle(E,res){
  if(!db) return;
  const of=t=>E.cur.market.filter(id=>{ const c=CARDS.find(x=>x.id===id); return c&&c.type===t });
  db.collection("parties").add({res,nem:E.cur.nem,mages:E.cur.mages,gems:of("Gem"),relics:of("Relic"),spells:of("Spell"),
    note:"Expedition “ "+E.name+" ”, fight "+E.battle+(E.cur.tries>1?", attempt "+E.cur.tries:""),date:today(),mode:"expedition",ts:Date.now()}).catch(()=>{});
}
function xstart(E){
  const m=[...xd.market], cnt=t=>m.filter(id=>CARDS.find(c=>c.id===id).type===t).length;
  if(!xd.nem){ xmsg="Choose the nemesis for this fight."; return renderExp(); }
  if(xd.mages.length!==E.players){ xmsg="Choose "+E.players+" mage"+(E.players>1?"s":"")+" from the barracks."; return renderExp(); }
  if(Object.entries(XNEED).some(([t,n])=>cnt(t)!==n)){ xmsg="The market must have exactly 3 gems, 2 relics and 4 spells."; return renderExp(); }
  xmsg="";
  E.cur={nem:xd.nem,mages:xd.mages.slice(),market:m,tries:E.cur.tries||0};
  if(!E.endless){ const gone=E.barracks.cards.filter(id=>!xd.market.has(id)); E.barracks.cards=m; E.banished=(E.banished||[]).concat(gone); }
  E.phase="fight"; E.last=null; xsave(E); renderExp();
}
function xwin(E){
  E.cur.tries=(E.cur.tries||0)+1; const pts=[0,6,4,2][E.cur.tries]||0;
  logBattle(E,"V");
  const got=addSupplies(E), g=xgather(E,E.battle);
  if(g) E.treasures[g.tier]+=g.n;
  E.score+=pts;
  E.history.push({b:E.battle,nem:E.cur.nem,mages:E.cur.mages,market:E.cur.market,tries:E.cur.tries,res:"V",pts,rewards:got,treasure:g});
  E.last={kind:"win",nem:E.cur.nem,pts,cards:got,text:g?"Draw "+g.n+" treasures of tier "+ROMAN[g.tier]+" and add them to your barracks.":""};
  if(E.battle>=XVAR[E.variant].last){ E.status="done"; E.phase="done"; }
  else{ E.battle++; E.phase="prep"; E.cur={tries:0}; }
  xsave(E); renderExp();
}
function xloss(E){
  E.cur.tries=(E.cur.tries||0)+1; logBattle(E,"D");
  E.history.push({b:E.battle,nem:E.cur.nem,mages:E.cur.mages,market:E.cur.market,tries:E.cur.tries,res:"D",pts:0});
  E.phase="support"; E.last=null; xsave(E); renderExp();
}
function xsupport(E,kind){
  let text="";
  if(kind in XNEED){ const used=new Set(E.used), id=rollCard(kind,used);
    if(id){ E.used.push(id); E.barracks.cards.push(id); text=TYPEFR[kind]+(kind==="Spell"?" added":" added")+" to the barracks: "+cardName(id)+"."; } else text="No more cards of this type available."; }
  else if(kind==="mage"){ const m=rollMage(new Set(E.usedMages)); if(m){ E.usedMages.push(m); E.barracks.mages.push(m); text="New mage in the barracks: "+m+"."; } else text="No more mages available."; }
  else { const t=+kind.slice(1); E.treasures[t]++; text="Draw 1 treasure of tier "+ROMAN[t]+" and add it to your barracks."; }
  E.last={kind:"support",cards:[],text:"Support after the defeat. "+text+" You face again "+E.cur.nem+"."};
  E.phase="prep"; xsave(E); renderExp();
}
function xpropose(E,mode){
  restrict=new Set(E.barracks.cards);
  const saveF=fight, saveR=avoidRecent, saveT=themeChoice;
  fight={nem:xd.nem,mages:xd.mages.slice()}; avoidRecent=false; if(mode!=="combo") themeChoice="";
  const dist={Gem:3,Relic:2,Spell:4};
  const r = mode==="opt"?genOpt(dist):mode==="combo"?genCombo(dist):genRandom(dist);
  restrict=null; fight=saveF; avoidRecent=saveR; themeChoice=saveT;
  xd.market=new Set(r.slots.filter(s=>s.card).map(s=>s.card.id)); xd.theme=r.mode==="combo"?r.theme:""; xd.hint=false; xd.mode=mode;
  renderExp();
}
function xrow(id,opts){
  const c=CARDS.find(x=>x.id===id); if(!c) return "";
  return '<div class="xrow g-'+c.type+'" title="'+esc(c.fx.replace(/[|~]/g," ")).replace(/"/g,"&quot;")+'">'
    +(opts&&opts.check?'<input type="checkbox" data-xc="'+c.id+'"'+(xd.market.has(c.id)?" checked":"")+' aria-label="Put '+esc(c.fr)+' in the market">':'')
    +'<span class="c">'+c.cost+'</span><span class="nm">'+esc(c.fr)+'</span><span class="bx">'+esc(BOXNAME[c.box])+'</span></div>';
}
function xlist(ids,check){
  return TYPES.map(([t,label])=>{ const l=ids.map(id=>CARDS.find(c=>c.id===id)).filter(c=>c&&c.type===t).sort((a,b)=>a.cost-b.cost);
    return l.length?'<div class="xrows"><h4 class="g-'+t+'" style="color:var(--c)">'+label+'</h4>'+l.map(c=>xrow(c.id,{check})).join("")+'</div>':""; }).join("");
}
function renderExp(){
  const box=$("exp");
  if(xstate!=="ok"){ box.innerHTML='<p class="jmsg">'+(xstate==="loading"?"Loading the expedition…":xstate==="slow"?"The expedition isn't responding yet. It will appear as soon as the connection is back.":"Expedition mode needs the log, which isn't available in this view.")+'</p>'; return; }
  const E=exps.find(e=>e.status==="active");
  const msg=xmsg?'<p class="msg" style="color:#ffb4a3">'+esc(xmsg)+'</p>':"";
  if(!E){
    const past=exps.filter(e=>e.status!=="active").sort((a,b)=>(b.ts||0)-(a.ts||0));
    box.innerHTML='<div class="xhead"><div><h2>Expedition</h2><p class="sub">A campaign of several fights following The New Age rules: a barracks of cards and mages that grows after each fight, ever stronger nemeses, a score.</p></div></div>'
      +'<div class="xpanel"><h3>New expedition</h3><div class="xform">'
      +'<label class="fld" style="grid-column:span 2"><span>Name</span><input type="text" id="x-name" maxlength="60" placeholder="Expedition of '+today().split("-").reverse().join("/")+'"></label>'
      +'<label class="fld"><span>Length</span><select id="x-var"><option value="std">Standard, 4 fights</option><option value="short">Short, 3 fights</option><option value="long">Long, 8 fights</option></select></label>'
      +'<label class="fld"><span>Players</span><select id="x-pl"><option>2</option><option>3</option><option>4</option></select></label></div>'
      +'<div class="xmages"><label><input type="checkbox" id="x-endless"> Endless supply: unchosen cards stay in the barracks instead of being banished</label></div>'
      +'<p class="muted">The starting barracks is drawn from the boxes ticked in the New market tab: 3 gems, 2 relics, 4 spells and 4 mages. Treasures stay physical cards: the app tells you how many to draw.</p>'
      +msg+'<div class="xbtns"><button class="btn primary" type="button" id="x-create">Start the expedition</button></div></div>'
      +(past.length?'<div class="xpanel"><h3>Past expeditions</h3><ul class="xpast" style="list-style:none;margin:0;padding:0">'+past.map(e=>'<li><span>'+esc(e.name)+' · '+esc(XVAR[e.variant].name)+(e.status==="abandoned"?" · abandoned at fight "+e.battle:"")+'</span><b style="color:var(--gold)">'+(e.score||0)+' pts</b></li>').join("")+'</ul></div>':"");
    const b=$("x-create"); if(b) b.onclick=createExp;
    return;
  }
  const V=XVAR[E.variant], L=xlevel(E,E.battle);
  const key=E.id+":"+E.battle+":"+(E.cur.tries||0)+":"+E.phase;
  if(xkey!==key){ xkey=key; xd={nem:E.cur.nem||"",mages:[],market:new Set(),theme:"",hint:false,mode:""}; xconfirm=""; }
  const steps=[]; for(let b=V.first;b<=V.last;b++){
    const h=E.history.filter(x=>x.b===b), w=h.find(x=>x.res==="V");
    steps.push('<div class="xstep'+(b===E.battle&&E.status==="active"?" now":"")+(w?" won":"")+'"><b>Fight '+b+'</b><span class="m">Tier '+xlevel(E,b)+(w?' · '+esc(w.nem)+' · +'+w.pts:b===E.battle&&h.length?' · '+h.length+(h.length>1?' losses':' loss'):'')+'</span></div>'); }
  const tr=[1,2,3].filter(t=>E.treasures[t]).map(t=>E.treasures[t]+" of tier "+ROMAN[t]).join(", ");
  let last="";
  if(E.last){ const L2=E.last;
    last='<div class="xpanel xlast'+(L2.kind==="support"?" loss":"")+'"><h4>'+(L2.kind==="win"?"Victory against "+esc(L2.nem)+" · +"+L2.pts+" points":L2.kind==="start"?"Start":"Support")+'</h4>'
      +(L2.cards&&L2.cards.length?'<p>New cards in the barracks: '+L2.cards.map(id=>"<b>"+esc(cardName(id))+"</b>").join(", ")+'.</p>':"")
      +(L2.text?'<p>'+esc(L2.text)+'</p>':"")+'</div>'; }
  // panneau d'action
  let act="";
  const lvlNem=NEM.filter(n=>nemOwned(n)&&NEMLVL[n[0]]===L), faced=new Set(E.history.map(h=>h.nem));
  if(E.phase==="prep"){
    const nemSel = E.cur.nem ? '<p><b>'+esc(E.cur.nem)+'</b> <span class="muted">· rematch after the defeat</span></p>'
      : '<div class="xbtns" style="align-items:end"><label class="fld" style="flex:1;min-width:180px"><span>Nemesis of tier '+L+'</span><select id="x-nem">'
        +'<option value="">To draw</option>'+lvlNem.map(n=>'<option'+(n[0]===xd.nem?" selected":"")+'>'+esc(n[0])+'</option>').join("")
        +'<optgroup label="Other tiers">'+NEM.filter(n=>nemOwned(n)&&NEMLVL[n[0]]&&NEMLVL[n[0]]!==L).map(n=>'<option'+(n[0]===xd.nem?" selected":"")+'>'+esc(n[0])+'</option>').join("")+'</optgroup></select></label>'
        +'<button class="btn" type="button" id="x-rollnem">Draw at random</button></div>';
    const cnt=t=>[...xd.market].filter(id=>{const c=CARDS.find(x=>x.id===id);return c&&c.type===t}).length;
    const counter='<p class="xcount">'+TYPES.map(([t,lab])=>{ const n=cnt(t); return lab+' <b class="'+(n===XNEED[t]?"ok":"ko")+'">'+n+'/'+XNEED[t]+'</b>'; }).join(" · ")+'</p>';
    const hint = xd.theme ? (xd.hint?'<p class="muted"><b>'+esc(THEMES[xd.theme].name)+'.</b> '+esc(THEMES[xd.theme].hint)+'</p>':'<p class="muted">This market hides a synergy. <button class="swap" type="button" id="x-hint">Reveal the hint</button></p>') : "";
    act='<div class="xpanel"><h3>Prepare the fight '+E.battle+'</h3>'
      +'<h4>1. Nemesis</h4>'+nemSel
      +'<h4>2. Mages ('+E.players+')</h4><div class="xmages">'+E.barracks.mages.map(m=>'<label><input type="checkbox" data-xm="'+esc(m)+'"'+(xd.mages.includes(m)?" checked":"")+'> '+esc(m)+'</label>').join("")+'</div>'
      +'<h4>3. Market: tick 3 gems, 2 relics and 4 spells</h4>'
      +'<div class="xbtns"><button class="btn" type="button" data-xp="opt">Suggest: optimised</button><button class="btn" type="button" data-xp="combo">Original</button><button class="btn" type="button" data-xp="rand">Random</button></div>'
      +counter+hint+xlist(E.barracks.cards,true)
      +'<p class="muted">'+(E.endless?"Endless supply: unticked cards stay in the barracks.":"Unticked cards will be banished from the expedition at the start of the fight.")+'</p>'
      +msg+'<div class="xbtns"><button class="btn primary" type="button" id="x-start">Start the fight</button></div></div>';
  }else if(E.phase==="fight"){
    act='<div class="xpanel"><h3>Fight '+E.battle+' against '+esc(E.cur.nem)+'</h3>'
      +'<p class="muted">Mages: '+E.cur.mages.map(esc).join(" and ")+(E.cur.tries?' · attempt '+(E.cur.tries+1):'')+'</p>'
      +xlist(E.cur.market,false)
      +'<div class="xbtns">'+(xconfirm==="V"?'<button class="btn win-b" type="button" id="x-win">Confirm the victory</button><button class="btn" type="button" id="x-cancel">Cancel</button>'
        :xconfirm==="D"?'<button class="btn loss-b" type="button" id="x-loss">Confirm the defeat</button><button class="btn" type="button" id="x-cancel">Cancel</button>'
        :'<button class="btn win-b" type="button" id="x-askwin">Victory</button><button class="btn loss-b" type="button" id="x-askloss">Defeat</button>')+'</div></div>';
  }else if(E.phase==="support"){
    const tiers=[1,2,3].filter(t=>E.treasures[t]>0);
    act='<div class="xpanel"><h3>Defeat against '+esc(E.cur.nem)+'</h3><p>Choose a support for the rematch:</p><div class="xbtns">'
      +'<button class="btn" type="button" data-xs="Gem">A gem</button><button class="btn" type="button" data-xs="Relic">A relic</button><button class="btn" type="button" data-xs="Spell">A spell</button>'
      +'<button class="btn" type="button" data-xs="mage">A mage</button>'
      +tiers.map(t=>'<button class="btn" type="button" data-xs="T'+t+'">A treasure of tier '+ROMAN[t]+'</button>').join("")+'</div></div>';
  }
  // panneau rappels
  const deck=DECK[E.players]&&DECK[E.players][Math.min(L,4)-1];
  const side='<div class="xpanel"><h3>Barracks</h3>'
    +'<p><b>Mages</b> : '+E.barracks.mages.map(esc).join(", ")+'</p>'
    +'<p><b>Treasures</b> : '+(tr||"none yet")+'</p>'
    +(E.phase!=="prep"?xlist(E.barracks.cards,false):'<p class="muted">'+E.barracks.cards.length+' cards, listed on the left.</p>')
    +'</div><div class="xpanel"><h3>Fight reminders '+E.battle+'</h3>'
    +'<p><b>Usable treasures</b> : '+(tr?"those in the barracks (tiers "+[1,2,3].filter(t=>E.treasures[t]).map(t=>ROMAN[t]).join(", ")+")":"none")+'.</p>'
    +'<p class="muted">Tier I: each player picks one and replaces a starting card of the same type (gem or spell) in their deck. Tier II: the group picks a single one, which applies to everyone. Tier III: each player places one on their board.</p>'
    +(deck?'<h4>Nemesis deck for '+E.players+' players</h4><table class="deck"><tr><th>Tier 1</th><th>Tier 2</th><th>Tier 3</th></tr><tr><td>'+deck.join("</td><td>")+'</td></tr></table>'
      +'<p class="muted">On top of the nemesis\'s own cards. V: upgraded basic cards, A: general basic cards.'+(E.variant==="long"?" For the long expedition, I use the column for the fight's tier: the rules don't say.":"")+'</p>':"")
    +'</div>';
  box.innerHTML='<div class="xhead"><div><h2>'+esc(E.name)+'</h2><p class="sub">Expedition '+esc(V.name.toLowerCase())+' · '+E.players+' players'+(E.endless?" · endless supply":"")+' · '+E.score+' points</p></div>'
    +'<button class="swap" type="button" id="x-abandon">'+(xconfirm==="abandon"?"Confirm abandoning":"Abandon the expedition")+'</button></div>'
    +'<div class="xtrack">'+steps.join("")+'</div>'+last
    +'<div class="xgrid"><div style="display:flex;flex-direction:column;gap:18px">'+act+'</div><div style="display:flex;flex-direction:column;gap:18px">'+side+'</div></div>';
  // évènements
  const on=(id,f)=>{ const el=$(id); if(el) el.onclick=f; };
  on("x-abandon",()=>{ if(xconfirm==="abandon"){ E.status="abandoned"; xconfirm=""; xsave(E); renderExp(); } else { xconfirm="abandon"; renderExp(); } });
  const ns=$("x-nem"); if(ns) ns.onchange=e=>{ xd.nem=e.target.value; };
  on("x-rollnem",()=>{ const fresh=lvlNem.filter(n=>!faced.has(n[0])); const l=fresh.length?fresh:lvlNem; if(l.length){ xd.nem=pick(l)[0]; renderExp(); } });
  box.querySelectorAll("[data-xm]").forEach(i=>i.onchange=()=>{ const m=i.dataset.xm; xd.mages=i.checked?xd.mages.concat([m]):xd.mages.filter(x=>x!==m); });
  box.querySelectorAll("[data-xc]").forEach(i=>i.onchange=()=>{ i.checked?xd.market.add(i.dataset.xc):xd.market.delete(i.dataset.xc); xd.theme=""; renderExp(); });
  box.querySelectorAll("[data-xp]").forEach(b=>b.onclick=()=>xpropose(E,b.dataset.xp));
  on("x-hint",()=>{ xd.hint=true; renderExp(); });
  on("x-start",()=>xstart(E));
  on("x-askwin",()=>{ xconfirm="V"; renderExp(); }); on("x-askloss",()=>{ xconfirm="D"; renderExp(); }); on("x-cancel",()=>{ xconfirm=""; renderExp(); });
  on("x-win",()=>{ xconfirm=""; xwin(E); }); on("x-loss",()=>{ xconfirm=""; xloss(E); });
  box.querySelectorAll("[data-xs]").forEach(b=>b.onclick=()=>xsupport(E,b.dataset.xs));
}

/* ---------- ajout d'une partie au journal, avec analyse de photo ---------- */
let picked={Gem:[],Relic:[],Spell:[]}, doubt=new Set(), sampleFn=null, imgLim=null, actl=null;
function renderPick(){
  $("a-pick").innerHTML=TYPES.map(([t,label])=>'<div class="col g-'+t+'"><h4>'+label+'</h4><div class="pchips">'
    +picked[t].map(id=>{ const c=CARDS.find(x=>x.id===id); return '<div class="pchip'+(doubt.has(id)?" doubt":"")+'"'+(doubt.has(id)?' title="Not sure about this card: check it"':'')+'><span class="nm">'+esc(c.fr)+' <span class="muted" style="color:var(--muted)">· '+c.cost+'</span>'+(doubt.has(id)?' <span style="color:var(--gold);font-size:12.5px">to check</span>':'')+'</span><button type="button" data-rm="'+id+'" aria-label="Remove '+esc(c.fr)+'">×</button></div>'; }).join("")
    +'</div><select data-add="'+t+'" aria-label="Add: '+label.toLowerCase()+'"><option value="">Add…</option>'
    +BOXES.filter(b=>shown(b[0])).map(([k,n])=>{ const l=CARDS.filter(c=>c.type===t&&c.box===k&&!picked[t].includes(c.id)).sort((a,b)=>a.fr.localeCompare(b.fr)); return l.length?'<optgroup label="'+esc(n)+'">'+l.map(c=>'<option value="'+c.id+'">'+esc(c.fr)+' ('+c.cost+')</option>').join("")+'</optgroup>':""; }).join("")
    +'</select></div>').join("");
  $("a-pick").querySelectorAll("[data-rm]").forEach(b=>b.onclick=()=>{ const id=b.dataset.rm, t=CARDS.find(c=>c.id===id).type; picked[t]=picked[t].filter(x=>x!==id); doubt.delete(id); renderPick(); });
  $("a-pick").querySelectorAll("[data-add]").forEach(sel=>sel.onchange=()=>{ if(sel.value){ picked[sel.dataset.add].push(sel.value); renderPick(); } });
}
function openAdd(){
  picked={Gem:[],Relic:[],Spell:[]}; doubt=new Set();
  $("a-nem").innerHTML=optionsHtml(NEM,"","To choose");
  $("a-m1").innerHTML=optionsHtml(MAGES,"","Not recorded"); $("a-m2").innerHTML=optionsHtml(MAGES,"","Not recorded");
  $("a-date").value=today(); $("a-note").value=""; $("a-msg").textContent=""; $("a-res-v").checked=true;
  $("a-photo").value=""; $("a-analyze").disabled=true;
  $("a-photo-row").hidden=!(sampleFn&&imgLim);
  if(imgLim) $("a-photo").accept=imgLim.mediaTypes.join(",");
  $("a-done").hidden=true; $("addform").hidden=false; renderPick();
}
$("a-open").onclick=openAdd;
$("a-cancel").onclick=()=>{ if(actl) actl.abort(); $("addform").hidden=true; };
$("a-photo").onchange=()=>{ const n=$("a-photo").files.length; $("a-analyze").disabled=!n;
  if(n) $("a-st").textContent=n+" photo"+(n>1?"s":"")+" selected"+(imgLim&&n>imgLim.maxCount?": only the first "+imgLim.maxCount+" will be analysed.":". Click Analyse."); };
async function analyze(){
  const files=[...$("a-photo").files].slice(0,imgLim?imgLim.maxCount:1); if(!files.length||!sampleFn) return;
  const list=CARDS.filter(c=>owned.has(c.box)).map(c=>c.id+" | "+TYPEFR[c.type]+" | "+c.cost+" | "+c.fr).join("\n");
  const prompt="You are looking at "+(files.length>1?files.length+" photos":"a photo")+" of a game of the cooperative card game Aeon's End, English edition (Indie Boards & Cards).\n"
    +"Find the market cards (the supply): face-up piles of gems, relics and spells, each with its name at the top of the text box and its cost in a hexagon at the top right. There are usually 9 of them (3 gems, 2 relics, 4 spells), but this number may vary.\n"
    +"Ignore the starting cards (Crystal, Spark), cards in hand or in decks, treasures and nemesis cards.\n"
    +"If you see the nemesis board or the mage boards, give their names.\n\n"
    +"Possible cards (id | type | cost | name):\n"+list+"\n\nPossible nemeses: "+NEM.filter(nemOwned).map(n=>n[0]).join(", ")+"\nPossible mages: "+MAGES.filter(mageOwned).map(m=>m[0]).join(", ")+"\n\n"
    +'Reply only with a JSON object of this form: {"cards":["id",...],"doubtful":["id",...],"nemesis":"exact name from the list or null","mages":["exact name from the list",...],"comment":"one short sentence in English"}. '
    +"Only use ids from the list. Put in doubtful the cards you identified without being sure (they are also in cards). Do not invent any card: if a name is unreadable, leave it out and say so in comment.";
  const btn=$("a-analyze"), st=$("a-st"); btn.disabled=true; $("a-stop").hidden=false; st.textContent="Analysing… this may take a minute.";
  actl=new AbortController();
  try{
    const r=await sampleFn.json(prompt,{images:files,signal:actl.signal,cache:false});
    const ids=new Set(CARDS.map(c=>c.id)), got=(Array.isArray(r&&r.cards)?r.cards:[]).map(String).filter(id=>ids.has(id));
    picked={Gem:[],Relic:[],Spell:[]}; [...new Set(got)].forEach(id=>picked[CARDS.find(c=>c.id===id).type].push(id));
    doubt=new Set((Array.isArray(r.doubtful)?r.doubtful:[]).map(String).filter(id=>got.includes(id)));
    if(r.nemesis&&NEMBY[r.nemesis]) $("a-nem").value=r.nemesis;
    const ms=(Array.isArray(r.mages)?r.mages:[]).map(String).filter(m=>MAGEBY[m]);
    if(ms[0]) $("a-m1").value=ms[0]; if(ms[1]) $("a-m2").value=ms[1];
    renderPick();
    st.textContent=got.length?(got.length+" card"+(got.length>1?"s":"")+" recognised"+(doubt.size?", including "+doubt.size+" to check (outlined in gold)":"")+". "+(r.comment?String(r.comment):"")+" Check and complete before saving."):"No card recognised. "+(r&&r.comment?String(r.comment)+" ":"")+"Try a sharper, closer photo, or add the cards by hand.";
  }catch(e){
    const c=e&&e.code;
    st.textContent = c==="cancelled"?"Analysis stopped."
      : c==="not_granted"||c==="sampling_disabled"||c==="images_unavailable"||c==="not_declared"?"Photo analysis isn't available here. You can fill in the form by hand."
      : c==="rate_limited"?"Too many analyses at once or usage limit reached. Try again later."
      : c==="image_rejected"?"This photo isn't accepted (format or size). Try another one."
      : c==="invalid_json"||c==="empty_completion"?"The answer wasn't usable. Try again, or fill in the form by hand."
      : c==="session_expired"?"Your session has expired: sign in again, then try again."
      : "The analysis failed. Try again in a moment.";
    if(c==="not_granted"||c==="sampling_disabled") $("a-photo-row").hidden=true;
  }finally{ btn.disabled=!$("a-photo").files.length; $("a-stop").hidden=true; actl=null; }
}
$("a-analyze").onclick=analyze;
$("a-stop").onclick=()=>{ if(actl) actl.abort(); };
$("addform").onsubmit=e=>{
  e.preventDefault(); if(!db){ $("a-msg").textContent="The log isn't available in this view."; return; }
  const nem=$("a-nem").value; if(!nem){ $("a-msg").textContent="Choose the nemesis you faced."; return; }
  if(!picked.Gem.length&&!picked.Relic.length&&!picked.Spell.length){ $("a-msg").textContent="Add at least one market card."; return; }
  const res=$("a-res-d").checked?"D":"V";
  const doc={res,nem,mages:[$("a-m1").value,$("a-m2").value].filter(Boolean),gems:picked.Gem,relics:picked.Relic,spells:picked.Spell,
    note:$("a-note").value.trim(),date:$("a-date").value||"",mode:"saisie",ts:Date.now()};
  $("a-save").disabled=true;
  db.collection("parties").add(doc).then(()=>{ $("addform").hidden=true; $("a-save").disabled=false;
    const p=$("a-done"); p.hidden=false; p.textContent=(res==="V"?"Victory":"Defeat")+" against "+nem+" added to the log."; },
    ()=>{ $("a-save").disabled=false; $("a-msg").textContent="Can't save right now. Try again in a moment."; });
};
(async()=>{
  try{ sampleFn=window.claude&&window.claude.use?await window.claude.use("sample"):null }catch(e){ sampleFn=null }
  if(sampleFn){ try{ const l=await sampleFn.limits(); imgLim=l&&l.images||null }catch(e){ imgLim=null } }
  if(!$("addform").hidden) $("a-photo-row").hidden=!(sampleFn&&imgLim);
})();