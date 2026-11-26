/* ---------- expédition (règles d'Une Ère Nouvelle) ---------- */
const NEMLVL={"Carapax-Königin":1,"König der Masken":2,"Der Unersättliche":2,"Hassgeburt":1,"Horden-Muhme":2,"Lord des Verderbens":2,"Der Wegbereiter":3,"Riss-Furie":4,"Krone der Leere":3,"Schattenmantel-Magus":3,"Schatten-Titan":1,"Ritter des Schreckens":1,"Dornen-Maid":3,"Dreimaltoter Prophet":2,"Traum-Händler":4,"Bladius":1,"Gedankenschlächter":4,"Großer Todling":2,"Maelstrom: Wiederkehrer":4,"Brutegel":1,"Xaxos: Entfesselt":4,"Madrox":1,"Arachnos":2,"Ewigtoter":3,"Fenrix":4,"Nekroschwarm":4,"Donnerkreisch":3,"Der Wanderer":3,"Experiment 153":1,"Thief of Dreams":2,"Risen Thrall":3,"Fountain of Souls":4,"Burrower":4,"Fortress":2,"The Burning Kor":4,"Bishop of Scrolls":1,"Bishop: Returned":3,"Fate Shepherd":1,"Griefweaver":4,"Mist Revealed":4,"Mother of Rust":2,"Paradox of Bone":4,"Paradox of Myth":4,"Paradox of Myth and Bone":3,"Rust Amalgam":3,"Rust Superion":2,"Stonemonger":2,"Infested Mutation":3,"Erythiza, Consumed":4,"Herald of the End":2,"The Changeling Nest":3,"Corruption's Core":4,"Clouded Mesmer":4,"The Endless Decay":3,"The Infecter":1,"The Coven":2,"The Blight":3,"The Wrath":4,"The Reliquary":3,"Absorbing Wraith":4,"The Terror in Brass":1,"Twice-Dead Prophet":3,"Oracle of Filth":2,"Wayward Reflection":4,"König der Masken (Beyond the Breach)":2,"Rampaging Vin":4,"The Timeless":3};
const DECK={2:[["3A","5A","7A"],["1V + 2A","3V + 2A","3V + 4A"],["2V + 1A","4V + 1A","5V + 2A"],["3V","5V","7V"]],
  3:[["5A","6A","7A"],["1V + 4A","3V + 3A","3V + 4A"],["2V + 3A","4V + 2A","5V + 2A"],["3V + 2A","5V + 1A","7V"]],
  4:[["8A","7A","7A"],["1V + 7A","3V + 4A","3V + 4A"],["2V + 6A","4V + 3A","5V + 2A"],["3V + 5A","5V + 2A","7V"]]};
const XVAR={std:{name:"Standard",first:1,last:4},short:{name:"Kurz",first:2,last:4},long:{name:"Lang",first:1,last:8}};
const ROMAN=["","I","II","III"], TYPEFR={Gem:"Kristall",Relic:"Artefakt",Spell:"Zauber"};
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
  xq=xq.then(()=>db.doc("expeditions/"+E.id).set(data)).catch(()=>{ xmsg="Speichern gerade nicht möglich. Versuchen Sie es gleich noch einmal."; renderExp(); });
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
  const E={name:$("x-name").value.trim()||("Expedition vom "+today().split("-").reverse().join(".")),variant,players,endless:$("x-endless").checked,
    status:"active",created:today(),ts:Date.now(),battle:XVAR[variant].first,phase:"prep",score:0,
    barracks:{cards:[],mages:[]},used:[],usedMages:[],treasures:{1:0,2:0,3:0},cur:{tries:0},history:[],last:null};
  const used=new Set();
  Object.entries(XNEED).forEach(([t,n])=>{ for(let i=0;i<n;i++){ const id=rollCard(t,used); if(id){ used.add(id); E.barracks.cards.push(id); } } });
  E.used=[...used];
  const um=new Set(); for(let i=0;i<4;i++){ const m=rollMage(um); if(m){ um.add(m); E.barracks.mages.push(m); } }
  E.usedMages=[...um];
  if(variant==="short"){ const got=addSupplies(E); E.treasures[1]+=5;
    E.last={kind:"start",cards:got,text:"Kurze Expedition: Kampf 1 gilt als gewonnen. Fügen Sie diese Karten Ihrer Kaserne hinzu und ziehen Sie 5 Schätze der Stufe I."}; }
  if(E.barracks.cards.length<9||E.barracks.mages.length<players){ xmsg="Nicht genug Karten oder Magier in den angekreuzten Schachteln, um eine Expedition zu beginnen."; renderExp(); return; }
  E.id="x"+Date.now().toString(36); xmsg="";
  exps=exps.concat([E]); renderExp(); xsave(E);
}
function logBattle(E,res){
  if(!db) return;
  const of=t=>E.cur.market.filter(id=>{ const c=CARDS.find(x=>x.id===id); return c&&c.type===t });
  db.collection("parties").add({res,nem:E.cur.nem,mages:E.cur.mages,gems:of("Gem"),relics:of("Relic"),spells:of("Spell"),
    note:"Expedition „"+E.name+"“, Kampf "+E.battle+(E.cur.tries>1?", Versuch "+E.cur.tries:""),date:today(),mode:"expedition",ts:Date.now()}).catch(()=>{});
}
function xstart(E){
  const m=[...xd.market], cnt=t=>m.filter(id=>CARDS.find(c=>c.id===id).type===t).length;
  if(!xd.nem){ xmsg="Wählen Sie den Erzfeind für diesen Kampf."; return renderExp(); }
  if(xd.mages.length!==E.players){ xmsg="Wählen Sie "+E.players+" Magier aus der Kaserne."; return renderExp(); }
  if(Object.entries(XNEED).some(([t,n])=>cnt(t)!==n)){ xmsg="Der Markt muss genau 3 Kristalle, 2 Artefakte und 4 Zauber enthalten."; return renderExp(); }
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
  E.last={kind:"win",nem:E.cur.nem,pts,cards:got,text:g?"Ziehen Sie "+g.n+" Schätze der Stufe "+ROMAN[g.tier]+" und fügen Sie sie Ihrer Kaserne hinzu.":""};
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
    if(id){ E.used.push(id); E.barracks.cards.push(id); text=TYPEFR[kind]+" zur Kaserne hinzugefügt: "+cardName(id)+"."; } else text="Keine Karten dieser Art mehr verfügbar."; }
  else if(kind==="mage"){ const m=rollMage(new Set(E.usedMages)); if(m){ E.usedMages.push(m); E.barracks.mages.push(m); text="Neuer Magier in der Kaserne: "+m+"."; } else text="Keine Magier mehr verfügbar."; }
  else { const t=+kind.slice(1); E.treasures[t]++; text="Ziehen Sie 1 Schatz der Stufe "+ROMAN[t]+" und fügen Sie ihn Ihrer Kaserne hinzu."; }
  E.last={kind:"support",cards:[],text:"Unterstützung nach der Niederlage. "+text+" Sie treten erneut an gegen "+E.cur.nem+"."};
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
    +(opts&&opts.check?'<input type="checkbox" data-xc="'+c.id+'"'+(xd.market.has(c.id)?" checked":"")+' aria-label="'+esc(c.fr)+' in den Markt legen">':'')
    +'<span class="c">'+c.cost+'</span><span class="nm">'+esc(c.fr)+'</span><span class="bx">'+esc(BOXNAME[c.box])+'</span></div>';
}
function xlist(ids,check){
  return TYPES.map(([t,label])=>{ const l=ids.map(id=>CARDS.find(c=>c.id===id)).filter(c=>c&&c.type===t).sort((a,b)=>a.cost-b.cost);
    return l.length?'<div class="xrows"><h4 class="g-'+t+'" style="color:var(--c)">'+label+'</h4>'+l.map(c=>xrow(c.id,{check})).join("")+'</div>':""; }).join("");
}
function renderExp(){
  const box=$("exp");
  if(xstate!=="ok"){ box.innerHTML='<p class="jmsg">'+(xstate==="loading"?"Expedition wird geladen…":xstate==="slow"?"Die Expedition antwortet noch nicht. Sie erscheint, sobald die Verbindung wieder steht.":"Der Expeditionsmodus braucht das Tagebuch, das in dieser Ansicht nicht verfügbar ist.")+'</p>'; return; }
  const E=exps.find(e=>e.status==="active");
  const msg=xmsg?'<p class="msg" style="color:#ffb4a3">'+esc(xmsg)+'</p>':"";
  if(!E){
    const past=exps.filter(e=>e.status!=="active").sort((a,b)=>(b.ts||0)-(a.ts||0));
    box.innerHTML='<div class="xhead"><div><h2>Expedition</h2><p class="sub">Eine Kampagne aus mehreren Kämpfen nach den Regeln von Ein neues Zeitalter: eine Kaserne aus Karten und Magiern, die nach jedem Kampf wächst, immer stärkere Erzfeinde und eine Punktzahl.</p></div></div>'
      +'<div class="xpanel"><h3>Neue Expedition</h3><div class="xform">'
      +'<label class="fld" style="grid-column:span 2"><span>Name</span><input type="text" id="x-name" maxlength="60" placeholder="Expedition vom '+today().split("-").reverse().join(".")+'"></label>'
      +'<label class="fld"><span>Länge</span><select id="x-var"><option value="std">Standard, 4 Kämpfe</option><option value="short">Kurz, 3 Kämpfe</option><option value="long">Lang, 8 Kämpfe</option></select></label>'
      +'<label class="fld"><span>Spieler</span><select id="x-pl"><option>2</option><option>3</option><option>4</option></select></label></div>'
      +'<div class="xmages"><label><input type="checkbox" id="x-endless"> Endloser Vorrat: Nicht gewählte Karten bleiben in der Kaserne, statt verbannt zu werden</label></div>'
      +'<p class="muted">Die Start-Kaserne wird aus den im Reiter „Neuer Markt“ angekreuzten Schachteln gezogen: 3 Kristalle, 2 Artefakte, 4 Zauber und 4 Magier. Schätze bleiben echte Karten: Die App sagt Ihnen, wie viele Sie ziehen.</p>'
      +msg+'<div class="xbtns"><button class="btn primary" type="button" id="x-create">Expedition beginnen</button></div></div>'
      +(past.length?'<div class="xpanel"><h3>Frühere Expeditionen</h3><ul class="xpast" style="list-style:none;margin:0;padding:0">'+past.map(e=>'<li><span>'+esc(e.name)+' · '+esc(XVAR[e.variant].name)+(e.status==="abandoned"?" · abgebrochen bei Kampf "+e.battle:"")+'</span><b style="color:var(--gold)">'+(e.score||0)+' Pkt.</b></li>').join("")+'</ul></div>':"");
    const b=$("x-create"); if(b) b.onclick=createExp;
    return;
  }
  const V=XVAR[E.variant], L=xlevel(E,E.battle);
  const key=E.id+":"+E.battle+":"+(E.cur.tries||0)+":"+E.phase;
  if(xkey!==key){ xkey=key; xd={nem:E.cur.nem||"",mages:[],market:new Set(),theme:"",hint:false,mode:""}; xconfirm=""; }
  const steps=[]; for(let b=V.first;b<=V.last;b++){
    const h=E.history.filter(x=>x.b===b), w=h.find(x=>x.res==="V");
    steps.push('<div class="xstep'+(b===E.battle&&E.status==="active"?" now":"")+(w?" won":"")+'"><b>Kampf '+b+'</b><span class="m">Level '+xlevel(E,b)+(w?' · '+esc(w.nem)+' · +'+w.pts:b===E.battle&&h.length?' · '+h.length+(h.length>1?' Niederlagen':' Niederlage'):'')+'</span></div>'); }
  const tr=[1,2,3].filter(t=>E.treasures[t]).map(t=>E.treasures[t]+" der Stufe "+ROMAN[t]).join(", ");
  let last="";
  if(E.last){ const L2=E.last;
    last='<div class="xpanel xlast'+(L2.kind==="support"?" loss":"")+'"><h4>'+(L2.kind==="win"?"Sieg gegen "+esc(L2.nem)+" · +"+L2.pts+" Punkte":L2.kind==="start"?"Beginn":"Unterstützung")+'</h4>'
      +(L2.cards&&L2.cards.length?'<p>Neue Karten in der Kaserne: '+L2.cards.map(id=>"<b>"+esc(cardName(id))+"</b>").join(", ")+'.</p>':"")
      +(L2.text?'<p>'+esc(L2.text)+'</p>':"")+'</div>'; }
  // panneau d'action
  let act="";
  const lvlNem=NEM.filter(n=>nemOwned(n)&&NEMLVL[n[0]]===L), faced=new Set(E.history.map(h=>h.nem));
  if(E.phase==="prep"){
    const nemSel = E.cur.nem ? '<p><b>'+esc(E.cur.nem)+'</b> <span class="muted">· neuer Versuch nach der Niederlage</span></p>'
      : '<div class="xbtns" style="align-items:end"><label class="fld" style="flex:1;min-width:180px"><span>Erzfeind – Level '+L+'</span><select id="x-nem">'
        +'<option value="">Zufällig ziehen</option>'+lvlNem.map(n=>'<option'+(n[0]===xd.nem?" selected":"")+'>'+esc(n[0])+'</option>').join("")
        +'<optgroup label="Andere Level">'+NEM.filter(n=>nemOwned(n)&&NEMLVL[n[0]]&&NEMLVL[n[0]]!==L).map(n=>'<option'+(n[0]===xd.nem?" selected":"")+'>'+esc(n[0])+'</option>').join("")+'</optgroup></select></label>'
        +'<button class="btn" type="button" id="x-rollnem">Zufällig ziehen</button></div>';
    const cnt=t=>[...xd.market].filter(id=>{const c=CARDS.find(x=>x.id===id);return c&&c.type===t}).length;
    const counter='<p class="xcount">'+TYPES.map(([t,lab])=>{ const n=cnt(t); return lab+' <b class="'+(n===XNEED[t]?"ok":"ko")+'">'+n+'/'+XNEED[t]+'</b>'; }).join(" · ")+'</p>';
    const hint = xd.theme ? (xd.hint?'<p class="muted"><b>'+esc(THEMES[xd.theme].name)+'.</b> '+esc(THEMES[xd.theme].hint)+'</p>':'<p class="muted">Dieser Markt verbirgt eine Synergie. <button class="swap" type="button" id="x-hint">Hinweis aufdecken</button></p>') : "";
    act='<div class="xpanel"><h3>Kampf '+E.battle+' vorbereiten</h3>'
      +'<h4>1. Erzfeind</h4>'+nemSel
      +'<h4>2. Magier ('+E.players+')</h4><div class="xmages">'+E.barracks.mages.map(m=>'<label><input type="checkbox" data-xm="'+esc(m)+'"'+(xd.mages.includes(m)?" checked":"")+'> '+esc(m)+'</label>').join("")+'</div>'
      +'<h4>3. Markt: Kreuzen Sie 3 Kristalle, 2 Artefakte und 4 Zauber an</h4>'
      +'<div class="xbtns"><button class="btn" type="button" data-xp="opt">Vorschlag: optimiert</button><button class="btn" type="button" data-xp="combo">Originell</button><button class="btn" type="button" data-xp="rand">Zufällig</button></div>'
      +counter+hint+xlist(E.barracks.cards,true)
      +'<p class="muted">'+(E.endless?"Endloser Vorrat: Nicht angekreuzte Karten bleiben in der Kaserne.":"Nicht angekreuzte Karten werden zu Beginn des Kampfs aus der Expedition verbannt.")+'</p>'
      +msg+'<div class="xbtns"><button class="btn primary" type="button" id="x-start">Kampf beginnen</button></div></div>';
  }else if(E.phase==="fight"){
    act='<div class="xpanel"><h3>Kampf '+E.battle+' gegen '+esc(E.cur.nem)+'</h3>'
      +'<p class="muted">Magier: '+E.cur.mages.map(esc).join(" und ")+(E.cur.tries?' · Versuch '+(E.cur.tries+1):'')+'</p>'
      +xlist(E.cur.market,false)
      +'<div class="xbtns">'+(xconfirm==="V"?'<button class="btn win-b" type="button" id="x-win">Sieg bestätigen</button><button class="btn" type="button" id="x-cancel">Abbrechen</button>'
        :xconfirm==="D"?'<button class="btn loss-b" type="button" id="x-loss">Niederlage bestätigen</button><button class="btn" type="button" id="x-cancel">Abbrechen</button>'
        :'<button class="btn win-b" type="button" id="x-askwin">Sieg</button><button class="btn loss-b" type="button" id="x-askloss">Niederlage</button>')+'</div></div>';
  }else if(E.phase==="support"){
    const tiers=[1,2,3].filter(t=>E.treasures[t]>0);
    act='<div class="xpanel"><h3>Niederlage gegen '+esc(E.cur.nem)+'</h3><p>Wählen Sie eine Unterstützung für den neuen Versuch:</p><div class="xbtns">'
      +'<button class="btn" type="button" data-xs="Gem">Ein Kristall</button><button class="btn" type="button" data-xs="Relic">Ein Artefakt</button><button class="btn" type="button" data-xs="Spell">Ein Zauber</button>'
      +'<button class="btn" type="button" data-xs="mage">Ein Magier</button>'
      +tiers.map(t=>'<button class="btn" type="button" data-xs="T'+t+'">Ein Schatz der Stufe '+ROMAN[t]+'</button>').join("")+'</div></div>';
  }
  // panneau rappels
  const deck=DECK[E.players]&&DECK[E.players][Math.min(L,4)-1];
  const side='<div class="xpanel"><h3>Kaserne</h3>'
    +'<p><b>Magier</b> : '+E.barracks.mages.map(esc).join(", ")+'</p>'
    +'<p><b>Schätze</b> : '+(tr||"noch keine")+'</p>'
    +(E.phase!=="prep"?xlist(E.barracks.cards,false):'<p class="muted">'+E.barracks.cards.length+' Karten, links aufgelistet.</p>')
    +'</div><div class="xpanel"><h3>Hinweise zu Kampf '+E.battle+'</h3>'
    +'<p><b>Einsetzbare Schätze</b> : '+(tr?"die in der Kaserne (Stufen "+[1,2,3].filter(t=>E.treasures[t]).map(t=>ROMAN[t]).join(", ")+")":"keine")+'.</p>'
    +'<p class="muted">Stufe I: Jeder Spieler wählt einen und ersetzt damit eine Startkarte derselben Art (Kristall oder Zauber) in seinem Deck. Stufe II: Die Gruppe wählt einen einzigen, der für alle gilt. Stufe III: Jeder Spieler legt einen auf sein Tableau.</p>'
    +(deck?'<h4>Erzfeind-Stapel für '+E.players+' Spieler</h4><table class="deck"><tr><th>Level 1</th><th>Level 2</th><th>Level 3</th></tr><tr><td>'+deck.join("</td><td>")+'</td></tr></table>'
      +'<p class="muted">Zusätzlich zu den eigenen Karten des Erzfeinds. V: verbesserte Grundkarten, A: allgemeine Grundkarten.'+(E.variant==="long"?" Für die lange Expedition verwende ich die Spalte des Levels des Kampfs: Die Regeln sagen dazu nichts.":"")+'</p>':"")
    +'</div>';
  box.innerHTML='<div class="xhead"><div><h2>'+esc(E.name)+'</h2><p class="sub">Expedition ('+esc(V.name)+') · '+E.players+' Spieler'+(E.endless?" · endloser Vorrat":"")+' · '+E.score+' Punkte</p></div>'
    +'<button class="swap" type="button" id="x-abandon">'+(xconfirm==="abandon"?"Abbruch bestätigen":"Expedition abbrechen")+'</button></div>'
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
    +picked[t].map(id=>{ const c=CARDS.find(x=>x.id===id); return '<div class="pchip'+(doubt.has(id)?" doubt":"")+'"'+(doubt.has(id)?' title="Bei dieser Karte bin ich unsicher: bitte prüfen"':'')+'><span class="nm">'+esc(c.fr)+' <span class="muted" style="color:var(--muted)">· '+c.cost+'</span>'+(doubt.has(id)?' <span style="color:var(--gold);font-size:12.5px">zu prüfen</span>':'')+'</span><button type="button" data-rm="'+id+'" aria-label="'+esc(c.fr)+' entfernen">×</button></div>'; }).join("")
    +'</div><select data-add="'+t+'" aria-label="Hinzufügen: '+label+'"><option value="">Hinzufügen…</option>'
    +BOXES.filter(b=>shown(b[0])).map(([k,n])=>{ const l=CARDS.filter(c=>c.type===t&&c.box===k&&!picked[t].includes(c.id)).sort((a,b)=>a.fr.localeCompare(b.fr)); return l.length?'<optgroup label="'+esc(n)+'">'+l.map(c=>'<option value="'+c.id+'">'+esc(c.fr)+' ('+c.cost+')</option>').join("")+'</optgroup>':""; }).join("")
    +'</select></div>').join("");
  $("a-pick").querySelectorAll("[data-rm]").forEach(b=>b.onclick=()=>{ const id=b.dataset.rm, t=CARDS.find(c=>c.id===id).type; picked[t]=picked[t].filter(x=>x!==id); doubt.delete(id); renderPick(); });
  $("a-pick").querySelectorAll("[data-add]").forEach(sel=>sel.onchange=()=>{ if(sel.value){ picked[sel.dataset.add].push(sel.value); renderPick(); } });
}
function openAdd(){
  picked={Gem:[],Relic:[],Spell:[]}; doubt=new Set();
  $("a-nem").innerHTML=optionsHtml(NEM,"","Bitte wählen");
  $("a-m1").innerHTML=optionsHtml(MAGES,"","Nicht eingetragen"); $("a-m2").innerHTML=optionsHtml(MAGES,"","Nicht eingetragen");
  $("a-date").value=today(); $("a-note").value=""; $("a-msg").textContent=""; $("a-res-v").checked=true;
  $("a-photo").value=""; $("a-analyze").disabled=true;
  $("a-photo-row").hidden=!(sampleFn&&imgLim);
  if(imgLim) $("a-photo").accept=imgLim.mediaTypes.join(",");
  $("a-done").hidden=true; $("addform").hidden=false; renderPick();
}
$("a-open").onclick=openAdd;
$("a-cancel").onclick=()=>{ if(actl) actl.abort(); $("addform").hidden=true; };
$("a-photo").onchange=()=>{ const n=$("a-photo").files.length; $("a-analyze").disabled=!n;
  if(n) $("a-st").textContent=n+(n>1?" Fotos ausgewählt":" Foto ausgewählt")+(imgLim&&n>imgLim.maxCount?": Nur die ersten "+imgLim.maxCount+" werden ausgewertet.":". Klicken Sie auf Auswerten."); };
async function analyze(){
  const files=[...$("a-photo").files].slice(0,imgLim?imgLim.maxCount:1); if(!files.length||!sampleFn) return;
  const list=CARDS.filter(c=>owned.has(c.box)).map(c=>c.id+" | "+TYPEFR[c.type]+" | "+c.cost+" | "+c.fr).join("\n");
  const prompt="You are looking at "+(files.length>1?files.length+" photos":"a photo")+" of a game of the cooperative card game Aeon's End, GERMAN edition (Frosted Games / Pegasus Spiele): the card names are printed in German. Some cards from boxes never published in German may be English cards; their English name is then used in the list below.\n"
    +"Find the market cards (the supply): face-up piles of gems (Kristalle), relics (Artefakte) and spells (Zauber), each with its name at the top of the text box and its cost in a hexagon at the top right. There are usually 9 of them (3 gems, 2 relics, 4 spells), but this number may vary.\n"
    +"Ignore the starting cards (Splitter, Funke), cards in hand or in decks, treasures (Schätze) and nemesis (Erzfeind) cards.\n"
    +"If you see the nemesis board or the mage boards, give their names.\n\n"
    +"Possible cards (id | type | cost | German name as printed on the card):\n"+list+"\n\nPossible nemeses: "+NEM.filter(nemOwned).map(n=>n[0]).join(", ")+"\nPossible mages: "+MAGES.filter(mageOwned).map(m=>m[0]).join(", ")+"\n\n"
    +'Reply only with a JSON object of this form: {"cards":["id",...],"doubtful":["id",...],"nemesis":"exact name from the list or null","mages":["exact name from the list",...],"comment":"one short sentence in German, addressing the reader formally with Sie"}. '
    +"Only use ids from the list. Put in doubtful the cards you identified without being sure (they are also in cards). Do not invent any card: if a name is unreadable, leave it out and say so in comment.";
  const btn=$("a-analyze"), st=$("a-st"); btn.disabled=true; $("a-stop").hidden=false; st.textContent="Wird ausgewertet… das kann eine Minute dauern.";
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
    st.textContent=got.length?(got.length+(got.length>1?" Karten erkannt":" Karte erkannt")+(doubt.size?", davon "+doubt.size+" zu prüfen (gold umrandet)":"")+". "+(r.comment?String(r.comment):"")+" Prüfen und ergänzen Sie vor dem Speichern."):"Keine Karte erkannt. "+(r&&r.comment?String(r.comment)+" ":"")+"Versuchen Sie ein schärferes Foto aus geringerer Entfernung oder fügen Sie die Karten von Hand hinzu.";
  }catch(e){
    const c=e&&e.code;
    st.textContent = c==="cancelled"?"Auswertung angehalten."
      : c==="not_granted"||c==="sampling_disabled"||c==="images_unavailable"||c==="not_declared"?"Die Fotoauswertung ist hier nicht verfügbar. Sie können das Formular von Hand ausfüllen."
      : c==="rate_limited"?"Zu viele Auswertungen gleichzeitig oder Nutzungsgrenze erreicht. Versuchen Sie es später noch einmal."
      : c==="image_rejected"?"Dieses Foto wird nicht angenommen (Format oder Größe). Versuchen Sie ein anderes."
      : c==="invalid_json"||c==="empty_completion"?"Die Antwort war nicht verwertbar. Versuchen Sie es noch einmal oder füllen Sie das Formular von Hand aus."
      : c==="session_expired"?"Ihre Sitzung ist abgelaufen: Melden Sie sich erneut an und versuchen Sie es noch einmal."
      : "Die Auswertung ist fehlgeschlagen. Versuchen Sie es gleich noch einmal.";
    if(c==="not_granted"||c==="sampling_disabled") $("a-photo-row").hidden=true;
  }finally{ btn.disabled=!$("a-photo").files.length; $("a-stop").hidden=true; actl=null; }
}
$("a-analyze").onclick=analyze;
$("a-stop").onclick=()=>{ if(actl) actl.abort(); };
$("addform").onsubmit=e=>{
  e.preventDefault(); if(!db){ $("a-msg").textContent="Das Tagebuch ist in dieser Ansicht nicht verfügbar."; return; }
  const nem=$("a-nem").value; if(!nem){ $("a-msg").textContent="Wählen Sie den Erzfeind, gegen den Sie gespielt haben."; return; }
  if(!picked.Gem.length&&!picked.Relic.length&&!picked.Spell.length){ $("a-msg").textContent="Fügen Sie mindestens eine Karte des Markts hinzu."; return; }
  const res=$("a-res-d").checked?"D":"V";
  const doc={res,nem,mages:[$("a-m1").value,$("a-m2").value].filter(Boolean),gems:picked.Gem,relics:picked.Relic,spells:picked.Spell,
    note:$("a-note").value.trim(),date:$("a-date").value||"",mode:"saisie",ts:Date.now()};
  $("a-save").disabled=true;
  db.collection("parties").add(doc).then(()=>{ $("addform").hidden=true; $("a-save").disabled=false;
    const p=$("a-done"); p.hidden=false; p.textContent=(res==="V"?"Sieg":"Niederlage")+" gegen "+nem+" zum Tagebuch hinzugefügt."; },
    ()=>{ $("a-save").disabled=false; $("a-msg").textContent="Speichern gerade nicht möglich. Versuchen Sie es gleich noch einmal."; });
};
(async()=>{
  try{ sampleFn=window.claude&&window.claude.use?await window.claude.use("sample"):null }catch(e){ sampleFn=null }
  if(sampleFn){ try{ const l=await sampleFn.limits(); imgLim=l&&l.images||null }catch(e){ imgLim=null } }
  if(!$("addform").hidden) $("a-photo-row").hidden=!(sampleFn&&imgLim);
})();