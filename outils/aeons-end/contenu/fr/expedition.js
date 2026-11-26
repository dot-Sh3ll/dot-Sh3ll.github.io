/* ---------- expédition (règles d'Une Ère Nouvelle) ---------- */
const NEMLVL={"Reine Carapace":1,"Masque Tordu":2,"Prince des Gloutons":2,"Rage Incarnée":1,"La Mégère":2,"Seigneur de la Désolation":2,"L'Égaré":3,"Sorcière du Portail":4,"Couronne Creuse":3,"Démon des Voiles":3,"Titan de l'Ombre":1,"Chevalier des Entraves":1,"Demoiselle des Épines":3,"Prophète aux trois Trépas":2,"Maître des Spectres":4,"Bladius":1,"Esprit de la Mort":4,"Moisissure Rampante":2,"Maelstrom: Évolué":4,"Horreur Pondeuse":1,"Xaxos: Élevé":4,"Maggoth":1,"Arachnos":2,"Marcheur éternel":3,"Fenrix":4,"Nécro-essaim":4,"La Lamentation":3,"Le Vagabond":3,"Expérience 153":1,"Voleur de Rêves":2,"Serf Ressuscité":3,"Fontaine des Âmes":4,"Fouisseur":4,"Forteresse":2,"Kor l'Ardent":4,"Évêque des Parchemins":1,"Évêque : Revenu":3,"Berger du Destin":1,"Tisse-Chagrin":4,"Mist Révélée":4,"Mère de la Rouille":2,"Paradoxe d'Os":4,"Paradoxe du Mythe":4,"Paradoxe du Mythe et de l'Os":3,"Amalgame de Rouille":3,"Superion de Rouille":2,"Maître des Pierres":2,"Mutation infestée":3,"Erythiza la Consumée":4,"Héraut de la Fin":2,"Le Nid des Changeformes":3,"Cœur de la Corruption":4,"Hypnotiseur voilé":4,"La Décrépitude sans fin":3,"L'Infecteur":1,"Le Sabbat":2,"Le Fléau":3,"La Colère":4,"Le Reliquaire":3,"Spectre absorbant":4,"La Terreur d'airain":1,"Prophète aux deux Trépas":3,"Oracle de la Fange":2,"Reflet de l'Égaré":4,"Masque Tordu (Beyond the Breach)":2,"Vin le Ravageur":4,"L'Intemporel":3};
const DECK={2:[["3A","5A","7A"],["1V + 2A","3V + 2A","3V + 4A"],["2V + 1A","4V + 1A","5V + 2A"],["3V","5V","7V"]],
  3:[["5A","6A","7A"],["1V + 4A","3V + 3A","3V + 4A"],["2V + 3A","4V + 2A","5V + 2A"],["3V + 2A","5V + 1A","7V"]],
  4:[["8A","7A","7A"],["1V + 7A","3V + 4A","3V + 4A"],["2V + 6A","4V + 3A","5V + 2A"],["3V + 5A","5V + 2A","7V"]]};
const XVAR={std:{name:"Standard",first:1,last:4},short:{name:"Courte",first:2,last:4},long:{name:"Longue",first:1,last:8}};
const ROMAN=["","I","II","III"], TYPEFR={Gem:"Gemme",Relic:"Relique",Spell:"Sort"};
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
  xq=xq.then(()=>db.doc("expeditions/"+E.id).set(data)).catch(()=>{ xmsg="Sauvegarde impossible pour l'instant. Réessayez dans un instant."; renderExp(); });
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
  const E={name:$("x-name").value.trim()||("Expédition du "+today().split("-").reverse().join("/")),variant,players,endless:$("x-endless").checked,
    status:"active",created:today(),ts:Date.now(),battle:XVAR[variant].first,phase:"prep",score:0,
    barracks:{cards:[],mages:[]},used:[],usedMages:[],treasures:{1:0,2:0,3:0},cur:{tries:0},history:[],last:null};
  const used=new Set();
  Object.entries(XNEED).forEach(([t,n])=>{ for(let i=0;i<n;i++){ const id=rollCard(t,used); if(id){ used.add(id); E.barracks.cards.push(id); } } });
  E.used=[...used];
  const um=new Set(); for(let i=0;i<4;i++){ const m=rollMage(um); if(m){ um.add(m); E.barracks.mages.push(m); } }
  E.usedMages=[...um];
  if(variant==="short"){ const got=addSupplies(E); E.treasures[1]+=5;
    E.last={kind:"start",cards:got,text:"Expédition courte : le combat 1 compte comme gagné. Ajoutez ces cartes à votre caserne et piochez 5 trésors de niveau I."}; }
  if(E.barracks.cards.length<9||E.barracks.mages.length<players){ xmsg="Pas assez de cartes ou de mages dans les boîtes cochées pour lancer une expédition."; renderExp(); return; }
  E.id="x"+Date.now().toString(36); xmsg="";
  exps=exps.concat([E]); renderExp(); xsave(E);
}
function logBattle(E,res){
  if(!db) return;
  const of=t=>E.cur.market.filter(id=>{ const c=CARDS.find(x=>x.id===id); return c&&c.type===t });
  db.collection("parties").add({res,nem:E.cur.nem,mages:E.cur.mages,gems:of("Gem"),relics:of("Relic"),spells:of("Spell"),
    note:"Expédition « "+E.name+" », combat "+E.battle+(E.cur.tries>1?", essai "+E.cur.tries:""),date:today(),mode:"expedition",ts:Date.now()}).catch(()=>{});
}
function xstart(E){
  const m=[...xd.market], cnt=t=>m.filter(id=>CARDS.find(c=>c.id===id).type===t).length;
  if(!xd.nem){ xmsg="Choisissez la némésis du combat."; return renderExp(); }
  if(xd.mages.length!==E.players){ xmsg="Choisissez "+E.players+" mage"+(E.players>1?"s":"")+" dans la caserne."; return renderExp(); }
  if(Object.entries(XNEED).some(([t,n])=>cnt(t)!==n)){ xmsg="Le marché doit compter exactement 3 gemmes, 2 reliques et 4 sorts."; return renderExp(); }
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
  E.last={kind:"win",nem:E.cur.nem,pts,cards:got,text:g?"Piochez "+g.n+" trésors de niveau "+ROMAN[g.tier]+" et ajoutez-les à votre caserne.":""};
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
    if(id){ E.used.push(id); E.barracks.cards.push(id); text=TYPEFR[kind]+(kind==="Spell"?" ajouté":" ajoutée")+" à la caserne : "+cardName(id)+"."; } else text="Plus aucune carte de ce type disponible."; }
  else if(kind==="mage"){ const m=rollMage(new Set(E.usedMages)); if(m){ E.usedMages.push(m); E.barracks.mages.push(m); text="Nouveau mage dans la caserne : "+m+"."; } else text="Plus aucun mage disponible."; }
  else { const t=+kind.slice(1); E.treasures[t]++; text="Piochez 1 trésor de niveau "+ROMAN[t]+" et ajoutez-le à votre caserne."; }
  E.last={kind:"support",cards:[],text:"Soutien après la défaite. "+text+" Vous affrontez à nouveau "+E.cur.nem+"."};
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
    +(opts&&opts.check?'<input type="checkbox" data-xc="'+c.id+'"'+(xd.market.has(c.id)?" checked":"")+' aria-label="Mettre '+esc(c.fr)+' au marché">':'')
    +'<span class="c">'+c.cost+'</span><span class="nm">'+esc(c.fr)+'</span><span class="bx">'+esc(BOXNAME[c.box])+'</span></div>';
}
function xlist(ids,check){
  return TYPES.map(([t,label])=>{ const l=ids.map(id=>CARDS.find(c=>c.id===id)).filter(c=>c&&c.type===t).sort((a,b)=>a.cost-b.cost);
    return l.length?'<div class="xrows"><h4 class="g-'+t+'" style="color:var(--c)">'+label+'</h4>'+l.map(c=>xrow(c.id,{check})).join("")+'</div>':""; }).join("");
}
function renderExp(){
  const box=$("exp");
  if(xstate!=="ok"){ box.innerHTML='<p class="jmsg">'+(xstate==="loading"?"Chargement de l'expédition…":xstate==="slow"?"L'expédition ne répond pas encore. Elle s'affichera dès que la connexion revient.":"Le mode Expédition a besoin du journal, qui n'est pas disponible dans cette vue. Ouvrez la page connecté à votre compte.")+'</p>'; return; }
  const E=exps.find(e=>e.status==="active");
  const msg=xmsg?'<p class="msg" style="color:#ffb4a3">'+esc(xmsg)+'</p>':"";
  if(!E){
    const past=exps.filter(e=>e.status!=="active").sort((a,b)=>(b.ts||0)-(a.ts||0));
    box.innerHTML='<div class="xhead"><div><h2>Expédition</h2><p class="sub">Une campagne de plusieurs combats selon les règles d\'Une Ère Nouvelle : une caserne de cartes et de mages qui grossit après chaque combat, des némésis de plus en plus fortes, un score.</p></div></div>'
      +'<div class="xpanel"><h3>Nouvelle expédition</h3><div class="xform">'
      +'<label class="fld" style="grid-column:span 2"><span>Nom</span><input type="text" id="x-name" maxlength="60" placeholder="Expédition du '+today().split("-").reverse().join("/")+'"></label>'
      +'<label class="fld"><span>Durée</span><select id="x-var"><option value="std">Standard, 4 combats</option><option value="short">Courte, 3 combats</option><option value="long">Longue, 8 combats</option></select></label>'
      +'<label class="fld"><span>Joueurs</span><select id="x-pl"><option>2</option><option>3</option><option>4</option></select></label></div>'
      +'<div class="xmages"><label><input type="checkbox" id="x-endless"> Réserve sans fin : les cartes non choisies restent dans la caserne au lieu d\'être bannies</label></div>'
      +'<p class="muted">La caserne de départ est tirée dans les boîtes cochées de l\'onglet Nouveau marché : 3 gemmes, 2 reliques, 4 sorts et 4 mages. Les trésors restent des cartes physiques : l\'appli vous dit combien en piocher.</p>'
      +msg+'<div class="xbtns"><button class="btn primary" type="button" id="x-create">Lancer l\'expédition</button></div></div>'
      +(past.length?'<div class="xpanel"><h3>Expéditions passées</h3><ul class="xpast" style="list-style:none;margin:0;padding:0">'+past.map(e=>'<li><span>'+esc(e.name)+' · '+esc(XVAR[e.variant].name)+(e.status==="abandoned"?" · abandonnée au combat "+e.battle:"")+'</span><b style="color:var(--gold)">'+(e.score||0)+' pts</b></li>').join("")+'</ul></div>':"");
    const b=$("x-create"); if(b) b.onclick=createExp;
    return;
  }
  const V=XVAR[E.variant], L=xlevel(E,E.battle);
  const key=E.id+":"+E.battle+":"+(E.cur.tries||0)+":"+E.phase;
  if(xkey!==key){ xkey=key; xd={nem:E.cur.nem||"",mages:[],market:new Set(),theme:"",hint:false,mode:""}; xconfirm=""; }
  const steps=[]; for(let b=V.first;b<=V.last;b++){
    const h=E.history.filter(x=>x.b===b), w=h.find(x=>x.res==="V");
    steps.push('<div class="xstep'+(b===E.battle&&E.status==="active"?" now":"")+(w?" won":"")+'"><b>Combat '+b+'</b><span class="m">Niveau '+xlevel(E,b)+(w?' · '+esc(w.nem)+' · +'+w.pts:b===E.battle&&h.length?' · '+h.length+' défaite'+(h.length>1?"s":""):'')+'</span></div>'); }
  const tr=[1,2,3].filter(t=>E.treasures[t]).map(t=>E.treasures[t]+" de niveau "+ROMAN[t]).join(", ");
  let last="";
  if(E.last){ const L2=E.last;
    last='<div class="xpanel xlast'+(L2.kind==="support"?" loss":"")+'"><h4>'+(L2.kind==="win"?"Victoire contre "+esc(L2.nem)+" · +"+L2.pts+" points":L2.kind==="start"?"Départ":"Soutien")+'</h4>'
      +(L2.cards&&L2.cards.length?'<p>Nouvelles cartes dans la caserne : '+L2.cards.map(id=>"<b>"+esc(cardName(id))+"</b>").join(", ")+'.</p>':"")
      +(L2.text?'<p>'+esc(L2.text)+'</p>':"")+'</div>'; }
  // panneau d'action
  let act="";
  const lvlNem=NEM.filter(n=>nemOwned(n)&&NEMLVL[n[0]]===L), faced=new Set(E.history.map(h=>h.nem));
  if(E.phase==="prep"){
    const nemSel = E.cur.nem ? '<p><b>'+esc(E.cur.nem)+'</b> <span class="muted">· revanche après la défaite</span></p>'
      : '<div class="xbtns" style="align-items:end"><label class="fld" style="flex:1;min-width:180px"><span>Némésis de niveau '+L+'</span><select id="x-nem">'
        +'<option value="">À tirer</option>'+lvlNem.map(n=>'<option'+(n[0]===xd.nem?" selected":"")+'>'+esc(n[0])+'</option>').join("")
        +'<optgroup label="Autres niveaux">'+NEM.filter(n=>nemOwned(n)&&NEMLVL[n[0]]&&NEMLVL[n[0]]!==L).map(n=>'<option'+(n[0]===xd.nem?" selected":"")+'>'+esc(n[0])+'</option>').join("")+'</optgroup></select></label>'
        +'<button class="btn" type="button" id="x-rollnem">Tirer au hasard</button></div>';
    const cnt=t=>[...xd.market].filter(id=>{const c=CARDS.find(x=>x.id===id);return c&&c.type===t}).length;
    const counter='<p class="xcount">'+TYPES.map(([t,lab])=>{ const n=cnt(t); return lab+' <b class="'+(n===XNEED[t]?"ok":"ko")+'">'+n+'/'+XNEED[t]+'</b>'; }).join(" · ")+'</p>';
    const hint = xd.theme ? (xd.hint?'<p class="muted"><b>'+esc(THEMES[xd.theme].name)+'.</b> '+esc(THEMES[xd.theme].hint)+'</p>':'<p class="muted">Ce marché cache une synergie. <button class="swap" type="button" id="x-hint">Révéler l\'indice</button></p>') : "";
    act='<div class="xpanel"><h3>Préparer le combat '+E.battle+'</h3>'
      +'<h4>1. Némésis</h4>'+nemSel
      +'<h4>2. Mages ('+E.players+')</h4><div class="xmages">'+E.barracks.mages.map(m=>'<label><input type="checkbox" data-xm="'+esc(m)+'"'+(xd.mages.includes(m)?" checked":"")+'> '+esc(m)+'</label>').join("")+'</div>'
      +'<h4>3. Marché : cochez 3 gemmes, 2 reliques et 4 sorts</h4>'
      +'<div class="xbtns"><button class="btn" type="button" data-xp="opt">Proposer : optimisé</button><button class="btn" type="button" data-xp="combo">Original</button><button class="btn" type="button" data-xp="rand">Au hasard</button></div>'
      +counter+hint+xlist(E.barracks.cards,true)
      +'<p class="muted">'+(E.endless?"Réserve sans fin : les cartes non cochées restent dans la caserne.":"Les cartes non cochées seront bannies de l'expédition au début du combat.")+'</p>'
      +msg+'<div class="xbtns"><button class="btn primary" type="button" id="x-start">Commencer le combat</button></div></div>';
  }else if(E.phase==="fight"){
    act='<div class="xpanel"><h3>Combat '+E.battle+' contre '+esc(E.cur.nem)+'</h3>'
      +'<p class="muted">Mages : '+E.cur.mages.map(esc).join(" et ")+(E.cur.tries?' · essai '+(E.cur.tries+1):'')+'</p>'
      +xlist(E.cur.market,false)
      +'<div class="xbtns">'+(xconfirm==="V"?'<button class="btn win-b" type="button" id="x-win">Confirmer la victoire</button><button class="btn" type="button" id="x-cancel">Annuler</button>'
        :xconfirm==="D"?'<button class="btn loss-b" type="button" id="x-loss">Confirmer la défaite</button><button class="btn" type="button" id="x-cancel">Annuler</button>'
        :'<button class="btn win-b" type="button" id="x-askwin">Victoire</button><button class="btn loss-b" type="button" id="x-askloss">Défaite</button>')+'</div></div>';
  }else if(E.phase==="support"){
    const tiers=[1,2,3].filter(t=>E.treasures[t]>0);
    act='<div class="xpanel"><h3>Défaite contre '+esc(E.cur.nem)+'</h3><p>Choisissez un soutien pour la revanche :</p><div class="xbtns">'
      +'<button class="btn" type="button" data-xs="Gem">Une gemme</button><button class="btn" type="button" data-xs="Relic">Une relique</button><button class="btn" type="button" data-xs="Spell">Un sort</button>'
      +'<button class="btn" type="button" data-xs="mage">Un mage</button>'
      +tiers.map(t=>'<button class="btn" type="button" data-xs="T'+t+'">Un trésor de niveau '+ROMAN[t]+'</button>').join("")+'</div></div>';
  }
  // panneau rappels
  const deck=DECK[E.players]&&DECK[E.players][Math.min(L,4)-1];
  const side='<div class="xpanel"><h3>Caserne</h3>'
    +'<p><b>Mages</b> : '+E.barracks.mages.map(esc).join(", ")+'</p>'
    +'<p><b>Trésors</b> : '+(tr||"aucun pour l'instant")+'</p>'
    +(E.phase!=="prep"?xlist(E.barracks.cards,false):'<p class="muted">'+E.barracks.cards.length+' cartes, listées à gauche.</p>')
    +'</div><div class="xpanel"><h3>Rappels du combat '+E.battle+'</h3>'
    +'<p><b>Trésors utilisables</b> : '+(tr?"ceux de la caserne (niveaux "+[1,2,3].filter(t=>E.treasures[t]).map(t=>ROMAN[t]).join(", ")+")":"aucun")+'.</p>'
    +'<p class="muted">Niveau I : chaque joueur en choisit un et remplace une carte de départ du même type (gemme ou sort) dans son deck. Niveau II : le groupe en choisit un seul, qui s\'applique à tous. Niveau III : chaque joueur en pose un sur son plateau.</p>'
    +(deck?'<h4>Deck Némésis à '+E.players+' joueurs</h4><table class="deck"><tr><th>Palier 1</th><th>Palier 2</th><th>Palier 3</th></tr><tr><td>'+deck.join("</td><td>")+'</td></tr></table>'
      +'<p class="muted">En plus des cartes propres à la némésis. V : cartes de base améliorées, A : cartes de base générales.'+(E.variant==="long"?" Pour l'expédition longue, j'utilise la colonne du niveau du combat : la règle ne le précise pas.":"")+'</p>':"")
    +'</div>';
  box.innerHTML='<div class="xhead"><div><h2>'+esc(E.name)+'</h2><p class="sub">Expédition '+esc(V.name.toLowerCase())+' · '+E.players+' joueurs'+(E.endless?" · réserve sans fin":"")+' · '+E.score+' points</p></div>'
    +'<button class="swap" type="button" id="x-abandon">'+(xconfirm==="abandon"?"Confirmer l'abandon":"Abandonner l'expédition")+'</button></div>'
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
    +picked[t].map(id=>{ const c=CARDS.find(x=>x.id===id); return '<div class="pchip'+(doubt.has(id)?" doubt":"")+'"'+(doubt.has(id)?' title="Pas sûr de cette carte : vérifiez-la"':'')+'><span class="nm">'+esc(c.fr)+' <span class="muted" style="color:var(--muted)">· '+c.cost+'</span>'+(doubt.has(id)?' <span style="color:var(--gold);font-size:12.5px">à vérifier</span>':'')+'</span><button type="button" data-rm="'+id+'" aria-label="Retirer '+esc(c.fr)+'">×</button></div>'; }).join("")
    +'</div><select data-add="'+t+'" aria-label="Ajouter : '+label.toLowerCase()+'"><option value="">Ajouter…</option>'
    +BOXES.filter(b=>shown(b[0])).map(([k,n])=>{ const l=CARDS.filter(c=>c.type===t&&c.box===k&&!picked[t].includes(c.id)).sort((a,b)=>a.fr.localeCompare(b.fr)); return l.length?'<optgroup label="'+esc(n)+'">'+l.map(c=>'<option value="'+c.id+'">'+esc(c.fr)+' ('+c.cost+')</option>').join("")+'</optgroup>':""; }).join("")
    +'</select></div>').join("");
  $("a-pick").querySelectorAll("[data-rm]").forEach(b=>b.onclick=()=>{ const id=b.dataset.rm, t=CARDS.find(c=>c.id===id).type; picked[t]=picked[t].filter(x=>x!==id); doubt.delete(id); renderPick(); });
  $("a-pick").querySelectorAll("[data-add]").forEach(sel=>sel.onchange=()=>{ if(sel.value){ picked[sel.dataset.add].push(sel.value); renderPick(); } });
}
function openAdd(){
  picked={Gem:[],Relic:[],Spell:[]}; doubt=new Set();
  $("a-nem").innerHTML=optionsHtml(NEM,"","À choisir");
  $("a-m1").innerHTML=optionsHtml(MAGES,"","Non noté"); $("a-m2").innerHTML=optionsHtml(MAGES,"","Non noté");
  $("a-date").value=today(); $("a-note").value=""; $("a-msg").textContent=""; $("a-res-v").checked=true;
  $("a-photo").value=""; $("a-analyze").disabled=true;
  $("a-photo-row").hidden=!(sampleFn&&imgLim);
  if(imgLim) $("a-photo").accept=imgLim.mediaTypes.join(",");
  $("a-done").hidden=true; $("addform").hidden=false; renderPick();
}
$("a-open").onclick=openAdd;
$("a-cancel").onclick=()=>{ if(actl) actl.abort(); $("addform").hidden=true; };
$("a-photo").onchange=()=>{ const n=$("a-photo").files.length; $("a-analyze").disabled=!n;
  if(n) $("a-st").textContent=n+" photo"+(n>1?"s":"")+" choisie"+(n>1?"s":"")+(imgLim&&n>imgLim.maxCount?" : seules les "+imgLim.maxCount+" premières seront analysées.":". Cliquez sur Analyser."); };
async function analyze(){
  const files=[...$("a-photo").files].slice(0,imgLim?imgLim.maxCount:1); if(!files.length||!sampleFn) return;
  const list=CARDS.filter(c=>owned.has(c.box)).map(c=>c.id+" | "+TYPEFR[c.type]+" | "+c.cost+" | "+c.fr).join("\n");
  const prompt="Vous regardez "+(files.length>1?files.length+" photos":"une photo")+" d'une partie du jeu de cartes coopératif Aeon's End, édition française.\n"
    +"Repérez les cartes du marché (la réserve) : des piles de gemmes, reliques et sorts posées face visible, chacune avec son nom en haut du cadre de texte et son coût dans un hexagone en haut à droite. Il y en a en général 9 (3 gemmes, 2 reliques, 4 sorts), mais ce nombre peut varier.\n"
    +"Ignorez les cartes de départ (Cristal, Éclat, Étincelle), les cartes en main ou dans les pioches, les trésors et les cartes de la némésis.\n"
    +"Si vous voyez le plateau de la némésis ou les plateaux des mages, donnez leurs noms.\n\n"
    +"Cartes possibles (id | type | coût | nom) :\n"+list+"\n\nNémésis possibles : "+NEM.filter(nemOwned).map(n=>n[0]).join(", ")+"\nMages possibles : "+MAGES.filter(mageOwned).map(m=>m[0]).join(", ")+"\n\n"
    +'Répondez uniquement avec un objet JSON de cette forme : {"cards":["id",...],"doubtful":["id",...],"nemesis":"nom exact ou null","mages":["nom exact",...],"comment":"une phrase courte en français"}. '
    +"N'utilisez que des id de la liste. Mettez dans doubtful les cartes que vous avez identifiées sans en être sûr (elles figurent aussi dans cards). N'inventez aucune carte : si un nom est illisible, laissez-la de côté et signalez-le dans comment.";
  const btn=$("a-analyze"), st=$("a-st"); btn.disabled=true; $("a-stop").hidden=false; st.textContent="Analyse en cours… cela peut prendre une minute.";
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
    st.textContent=got.length?(got.length+" carte"+(got.length>1?"s":"")+" reconnue"+(got.length>1?"s":"")+(doubt.size?", dont "+doubt.size+" à vérifier (encadrées en doré)":"")+". "+(r.comment?String(r.comment):"")+" Vérifie et complète avant d'enregistrer."):"Aucune carte reconnue. "+(r&&r.comment?String(r.comment)+" ":"")+"Essayez une photo plus nette et plus proche, ou ajoutez les cartes à la main.";
  }catch(e){
    const c=e&&e.code;
    st.textContent = c==="cancelled"?"Analyse arrêtée."
      : c==="not_granted"||c==="sampling_disabled"||c==="images_unavailable"||c==="not_declared"?"L'analyse de photo n'est pas autorisée dans cette vue. Vous pouvez remplir la fiche à la main."
      : c==="rate_limited"?"Trop d'analyses d'un coup ou limite d'usage atteinte. Réessayez plus tard."
      : c==="image_rejected"?"Cette photo n'est pas acceptée (format ou taille). Essayez une autre photo."
      : c==="invalid_json"||c==="empty_completion"?"La réponse n'était pas exploitable. Réessayez, ou remplissez la fiche à la main."
      : c==="session_expired"?"Votre session a expiré : reconnectez-vous puis réessayez."
      : "L'analyse a échoué. Réessayez dans un instant.";
    if(c==="not_granted"||c==="sampling_disabled") $("a-photo-row").hidden=true;
  }finally{ btn.disabled=!$("a-photo").files.length; $("a-stop").hidden=true; actl=null; }
}
$("a-analyze").onclick=analyze;
$("a-stop").onclick=()=>{ if(actl) actl.abort(); };
$("addform").onsubmit=e=>{
  e.preventDefault(); if(!db){ $("a-msg").textContent="Le journal n'est pas disponible dans cette vue."; return; }
  const nem=$("a-nem").value; if(!nem){ $("a-msg").textContent="Choisissez la némésis affrontée."; return; }
  if(!picked.Gem.length&&!picked.Relic.length&&!picked.Spell.length){ $("a-msg").textContent="Ajoutez au moins une carte du marché."; return; }
  const res=$("a-res-d").checked?"D":"V";
  const doc={res,nem,mages:[$("a-m1").value,$("a-m2").value].filter(Boolean),gems:picked.Gem,relics:picked.Relic,spells:picked.Spell,
    note:$("a-note").value.trim(),date:$("a-date").value||"",mode:"saisie",ts:Date.now()};
  $("a-save").disabled=true;
  db.collection("parties").add(doc).then(()=>{ $("addform").hidden=true; $("a-save").disabled=false;
    const p=$("a-done"); p.hidden=false; p.textContent=(res==="V"?"Victoire":"Défaite")+" contre "+nem+" ajoutée au journal."; },
    ()=>{ $("a-save").disabled=false; $("a-msg").textContent="Enregistrement impossible pour l'instant. Réessayez dans un instant."; });
};
(async()=>{
  try{ sampleFn=window.claude&&window.claude.use?await window.claude.use("sample"):null }catch(e){ sampleFn=null }
  if(sampleFn){ try{ const l=await sampleFn.limits(); imgLim=l&&l.images||null }catch(e){ imgLim=null } }
  if(!$("addform").hidden) $("a-photo-row").hidden=!(sampleFn&&imgLim);
})();