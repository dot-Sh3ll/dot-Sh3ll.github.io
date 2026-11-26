/* ---------- état ---------- *//* ---------- état ---------- */
let owned = new Set(BOXES.filter(b=>!b[3]).map(b=>b[0]));
let spoil = false; try{ spoil = localStorage.getItem("ae-spoil")==="1"; }catch(e){}
const shown = k=>spoil||!BOXLEG.has(k);
let current = null; // {mode, slots:[{card, type, test, role, key}], theme}
try{ const s = JSON.parse(localStorage.getItem("ae-boxes2")||"null"); if(Array.isArray(s)) owned = new Set(s.filter(x=>BOXNAME[x]&&shown(x))); }catch(e){}

const $ = id=>document.getElementById(id);
const rnd = n=>Math.floor(Math.random()*n);
const pick = a=>a[rnd(a.length)];
function shuffle(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=rnd(i+1);[a[i],a[j]]=[a[j],a[i]]}return a}
function weighted(a){ // favorise les cartes les plus fortes, sans toujours sortir la même
  const sc=a.map(score), top=Math.max(...sc), floor=Math.max(top-1,Math.min(4,top));
  const keep=a.map((c,i)=>[c,sc[i]]).filter(x=>x[1]>=floor);
  let t=keep.reduce((n,x)=>n+Math.pow(x[1]-top+2,2),0)*Math.random();
  for(const [c,v] of keep){ t-=Math.pow(v-top+2,2); if(t<=0) return c } return keep[keep.length-1][0];
}
let restrict=null; // en expédition, le tirage se fait dans la caserne
const avail = c=>restrict?restrict.has(c.id):owned.has(c.box);
const pool = type=>CARDS.filter(c=>c.type===type && avail(c));
function enough(){ const d=DISTS.find(x=>x[0]===distChoice); return d[2]?fits(d[2]):DISTS.some(x=>x[2]&&!SETUPS[x[0]]&&fits(x[2])) }

/* ---------- générateurs ---------- */
/* redites : les cartes des 3 derniers marchés générés sont écartées quand c'est possible */
let avoidRecent=true, themeChoice="";
function loadRecent(){ try{ const r=JSON.parse(localStorage.getItem("ae-recent")||"[]"); return Array.isArray(r)?r.slice(0,3):[] }catch(e){ return [] } }
function recentIds(){ return avoidRecent?new Set(loadRecent().flat()):new Set() }
function pushRecent(m){ try{ localStorage.setItem("ae-recent",JSON.stringify([m.slots.filter(s=>s.card).map(s=>s.card.id)].concat(loadRecent()).slice(0,3))) }catch(e){} }
function swapRecent(old,id){ try{ const r=loadRecent(); if(!r.length) return; r[0]=r[0].filter(x=>x!==old); if(id&&!r[0].includes(id)) r[0].push(id); localStorage.setItem("ae-recent",JSON.stringify(r)) }catch(e){} } // la carte changée ou choisie remplace l'ancienne dans le dernier marché
function fill(slots, chooser){
  const used=new Set(), recent=recentIds();
  for(const s of slots){
    if(s.card){used.add(s.card.id);continue}
  }
  for(const s of slots){
    if(s.card||s.free) continue;
    const ok=c=>!used.has(c.id)&&(!s.req||s.req.test(c));
    let cand=pool(s.type).filter(c=>ok(c) && (!s.test||s.test(c)));
    if(!cand.length){ s.test=null; s.role=s.fallbackRole||(s.req?"":s.role); cand=pool(s.type).filter(ok); } // rôle impossible avec le coût imposé : pas d'étiquette
    if(!cand.length&&s.req){ s.unmet=true; cand=pool(s.type).filter(c=>!used.has(c.id)); }
    const fresh=cand.filter(c=>!recent.has(c.id)); if(fresh.length) cand=fresh;
    s.card=chooser(cand); used.add(s.card.id);
  }
  return slots;
}
function genRandom(dist){
  const slots=[]; TYPES.forEach(([t])=>{for(let i=0;i<dist[t];i++)slots.push({type:t})});
  return {mode:"rand",dist,slots:fill(applySetup(slots),pick)};
}
function genOpt(dist){
  const has=t=>c=>c.tags.includes(t);
  // postes par ordre de priorité : on garde les premiers selon le nombre de piles
  const plan={
    Gem:[{test:c=>c.cost<=4,role:"Schnelles Æther"},{test:c=>c.cost>=5,role:"Viel Æther"},{test:null,role:"Zusätzliches Æther"}],
    Relic:[{test:has("thin"),role:"Deck ausdünnen"},{test:c=>!c.tags.includes("thin"),role:"Unterstützung"},{test:c=>!c.tags.includes("thin"),role:"Unterstützung"}],
    Spell:[{test:c=>c.cost<=4,role:"Eröffnungszauber"},{test:c=>c.cost>=6,role:"Abschlusszauber"},{test:c=>c.cost===5,role:"Mittelspiel"},{test:c=>c.cost>=6,role:"Abschlusszauber"},{test:c=>c.cost<=4,role:"Eröffnungszauber"}]
  };
  const slots=[]; TYPES.forEach(([t])=>{ for(let i=0;i<dist[t];i++) slots.push({type:t,...(plan[t][i]||{test:null,role:plan[t][plan[t].length-1].role})}); });
  return {mode:"opt",dist,slots:fill(applySetup(slots),weighted)};
}
function genCombo(dist){
  // thèmes jouables avec les boîtes cochées : au moins 4 cartes, dont 2 sorts
  const ok=Object.keys(THEMES).filter(k=>{
    const c=CARDS.filter(x=>avail(x)&&x.tags.includes(k));
    return c.length>=4 && c.filter(x=>x.type==="Spell").length>=2;
  });
  if(!ok.length) return genRandom(dist);
  let k;
  if(themeChoice&&ok.includes(themeChoice)) k=themeChoice;
  else{ // sans choix : 6 fois sur 10, un thème qui sert la némésis ou les mages s'il en existe
    const N=NEMBY[fight.nem], wants=new Set((N&&N[2]&&N[2].want)||[]);
    fight.mages.forEach(n=>(MAGEBY[n]?MAGEBY[n][2]:[]).forEach(t=>wants.add(t)));
    const fit=ok.filter(t=>wants.has(t));
    k = fit.length&&Math.random()<0.6 ? pick(fit) : pick(ok);
  }
  const inT=c=>c.tags.includes(k);
  const want={Gem:2,Relic:1+rnd(2),Spell:3};
  const slots=[];
  TYPES.forEach(([t])=>{
    const n=dist[t], avail=pool(t).filter(inT).length, keyN=Math.min(want[t],avail,n);
    for(let i=0;i<n;i++) slots.push(i<keyN?{type:t,test:inT,key:true}:{type:t,test:c=>!inT(c)&&c.pow>=3});
  });
  // un marché reste jouable : une gemme et un sort abordables
  const g=slots.filter(s=>s.type==="Gem"), sp=slots.filter(s=>s.type==="Spell");
  const res={mode:"combo",dist,theme:k,chosen:k===themeChoice,slots:fill(applySetup(slots),pick)};
  res.slots.forEach(s=>{ if(s.key&&(!s.card||!inT(s.card))) s.key=false; });
  ensureCheap(res,g,"Gem"); ensureCheap(res,sp,"Spell");
  return res;
}
function ensureCheap(res,group,type){
  if(setupOn()) return; // la mise en place fixe déjà les coûts
  if(group.some(s=>s.card.cost<=4)) return;
  const used=new Set(res.slots.map(s=>s.card.id));
  const target=group.find(s=>!s.key)||group[group.length-1];
  const inT=c=>res.theme&&c.tags.includes(res.theme);
  let cand=pool(type).filter(c=>c.cost<=4&&!used.has(c.id)&&(target.key?inT(c):!inT(c)));
  if(!cand.length) cand=pool(type).filter(c=>c.cost<=4&&!used.has(c.id));
  if(cand.length){ target.card=pick(cand); if(target.key&&!inT(target.card)){ target.key=false; target.test=c=>!inT(c) } }
}
function swap(i){
  const s=current.slots[i]; if(s.free){ picking=i; render(); return; }
  const used=new Set(current.slots.filter(x=>x.card).map(x=>x.card.id));
  const ok=c=>!used.has(c.id)&&(!s.req||s.req.test(c));
  let cand=pool(s.type).filter(c=>ok(c)&&(!s.test||s.test(c)));
  if(!cand.length) cand=pool(s.type).filter(ok);
  if(!cand.length&&s.unmet) cand=pool(s.type).filter(c=>!used.has(c.id));
  if(!cand.length) return;
  const old=s.card&&s.card.id;
  s.card = current.mode==="opt" ? weighted(cand) : pick(cand);
  swapRecent(old,s.card.id);
  if(s.key && !s.card.tags.includes(current.theme)) s.key=false;
  render();
}

/* ---------- affichage ---------- */
const esc=s=>String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;");
function fxHtml(fx){
  return fx.split("~").map(part=>part.split("|").map(l=>esc(l).replace(/^(Wirken:|ECHO\.?|Verknüpfbar\.?|Gebunden( \(1x pro Zug\))?:|Angehängt:|Dauerhaft:|Einmalig (bei Erwerb|beim Binden|beim Entwickeln \(Develop\)):|Rückruf \(Recall\):)/,"<b>$1</b>")).join("<br>")).join('<span class="or">ODER</span>');
}
const MODES={opt:["Am einfachsten","Optimierter Markt"],combo:["Selbst entdecken","Origineller Markt"],rand:["Zufällig","Völlig zufälliger Markt"],replay:["Schon gespielt","Wiederholter Markt"]};
let hintShown=false, keysShown=false, picking=-1;

function fitsFight(t){
  const N=NEMBY[fight.nem]; if(N&&N[2]&&(N[2].want||[]).includes(t)) return true;
  return fight.mages.some(n=>MAGEBY[n]&&MAGEBY[n][2].includes(t));
}
function adaptText(){
  const out=[]; const N=NEMBY[fight.nem];
  if(N) out.push(N[2]?"<b>Gegen "+esc(N[0])+"</b>: "+esc(N[3])+".":"<b>"+esc(N[0])+"</b>: Diesen Erzfeind kenne ich nicht gut genug, um die Auswahl zu steuern; sie bleibt allgemein.");
  if(N&&NEMSETUP[N[0]]) out.push("<b>Erinnerung zum Spielaufbau</b>: "+esc(NEMSETUP[N[0]]));
  fight.mages.forEach(n=>{ const M=MAGEBY[n]; if(M&&M[2].length) out.push("<b>Für "+esc(n.replace(/ \(.*/,""))+"</b>: "+esc(M[3])+"."); });
  return out.length?"<p>"+out.join(" ")+"</p>":"";
}
function render(){
  const m=current; $("rk").textContent=MODES[m.mode][0]+" · "+(m.setup?DISTS.find(x=>x[0]===m.setup)[1]+" · ":"")+distText(m.dist);
  $("again").hidden=m.mode==="replay"; $("rt").textContent=MODES[m.mode][1];
  const note=$("note");
  if(m.mode==="opt"){
    note.innerHTML="<p>Spielplan: Kaufen Sie in den ersten Zügen den günstigen Kristall, dünnen Sie Ihre Splitter und Funken mit dem passenden Artefakt aus und sammeln Sie dann die Abschlusszauber.</p>"+adaptText()+"<p class='muted'>Jede Karte hat eine Rolle. Sie können eine austauschen: Der Ersatz erfüllt dieselbe Rolle.</p>";
  }else if(m.mode==="replay"){
    note.innerHTML="<p>"+esc(m.label)+"</p>"+(m.missing?"<p class='muted'>"+m.missing+" Karte(n) dieses Markts sind nicht im Generator enthalten und fehlen hier.</p>":"");
  }else if(m.mode==="rand"){
    note.innerHTML="<p>Ungefilterte Ziehung: keine Garantie für Kosten oder Ausgewogenheit. Viel Glück.</p>";
  }else{
    const th=THEMES[m.theme], nkey=m.slots.filter(s=>s.key).length;
    note.innerHTML = (hintShown
      ? "<p><b>"+esc(th.name)+".</b> "+esc(th.hint)+"</p>"
      : "<p>Eine Synergie verbindet "+nkey+" dieser Karten. Finden Sie sie beim Spielen.</p>")
      + (hintShown&&!m.chosen&&fitsFight(m.theme)?"<p class='muted'>Thema ausgewählt, weil es zu diesem Kampf passt.</p>":"")
      + "<div class='row'>"
      + (hintShown?"":"<button class='btn' id='bhint' type='button'>Hinweis aufdecken</button>")
      + (keysShown?"":"<button class='btn' id='bkeys' type='button'>Kombo-Karten zeigen</button>")
      + "</div>";
    const bh=$("bhint"), bk=$("bkeys");
    if(bh) bh.onclick=()=>{hintShown=true;render()};
    if(bk) bk.onclick=()=>{keysShown=true;hintShown=true;render()};
  }
  const um=m.slots.filter(s=>s.unmet).length;
  if(um) note.innerHTML+="<p class='muted'>"+um+" Stapel ohne Kostenvorgabe gezogen: nicht genug Karten mit passenden Kosten in den angekreuzten Schachteln.</p>";
  const nf=m.slots.filter(s=>s.free&&!s.card).length;
  if(nf) note.innerHTML+="<p>"+nf+" Stapel nach Wahl: Tippen Sie auf das +, um die gewählte Karte einzutragen.</p>";
  const mk=$("market"); mk.innerHTML="";
  TYPES.forEach(([t,label])=>{
    const n=m.dist[t];
    const g=document.createElement("div"); g.className="group g-"+t;
    g.innerHTML="<h3>"+label+" <small>"+n+(n>1?" Stapel":" Stapel")+"</small></h3>";
    const wrap=document.createElement("div"); wrap.className="cards";
    m.slots.map((s,i)=>({s,i})).filter(x=>x.s.type===t).sort((a,b)=>(a.s.card?a.s.card.cost:99)-(b.s.card?b.s.card.cost:99)||a.i-b.i).forEach(({s,i})=>{
      const c=s.card, el=document.createElement("article");
      if(picking===i){ el.className="card free"; el.appendChild(pickerEl(s,i)); wrap.appendChild(el); return; }
      if(!c){ el.className="card free";
        el.innerHTML='<button class="addbtn" type="button" data-pick="'+i+'" aria-label="Karte nach Wahl auswählen"><span class="plus" aria-hidden="true">+</span><b>Karte nach Wahl</b><span>Karte auswählen</span></button>'
          +'<div class="foot"><span><span class="chip req" title="Stapel nach Wahl im Marktaufbau">Nach Wahl</span></span></div>';
        wrap.appendChild(el); return; }
      el.className="card"+(m.mode==="combo"&&keysShown&&s.key?" key":"");
      el.innerHTML='<div class="top"><span class="cost" title="Æther-Kosten">'+c.cost+'</span><div><div class="name">'+esc(c.fr||c.en)+'</div>'
        +'</div></div>'
        +'<div class="fx">'+fxHtml(c.fx)+'</div>'
        +'<div class="foot"><span>'+(m.mode==="opt"&&s.role?'<span class="chip role">'+esc(s.role)+'</span> ':'')
        +(m.mode==="opt"?bonus(c).why.map(w=>'<span class="chip adapt">'+esc(w)+'</span> ').join(""):'')
        +(s.req?'<span class="chip req'+(s.unmet?' off':'')+'" title="Vom Marktaufbau vorgegebene Kosten">Kosten '+esc(s.req.label)+'</span> ':'')
        +(s.free?'<span class="chip req" title="Stapel nach Wahl im Marktaufbau">Nach Wahl</span> ':'')
        +'<span class="chip">'+esc(BOXNAME[c.box])+'</span></span>'
        +'<button class="swap" type="button" data-i="'+i+'" aria-label="'+esc(c.fr||c.en)+' austauschen">Austauschen</button></div>';
      wrap.appendChild(el);
    });
    g.appendChild(wrap); mk.appendChild(g);
  });
  mk.querySelectorAll(".swap[data-i]").forEach(b=>b.onclick=()=>swap(+b.dataset.i));
  mk.querySelectorAll("[data-pick]").forEach(b=>b.onclick=()=>{ picking=+b.dataset.pick; render(); });
  const pi=mk.querySelector(".picker input"); if(pi) pi.focus({preventScroll:true});
}
function pickerEl(s,i){ // choix de la carte d'une pile « au choix »
  const used=new Set(current.slots.filter((x,j)=>x.card&&j!==i).map(x=>x.card.id));
  const cand=pool(s.type).filter(c=>!used.has(c.id)).sort((a,b)=>a.cost-b.cost||String(a.fr||a.en).localeCompare(String(b.fr||b.en)));
  const box=document.createElement("div"); box.className="picker";
  box.innerHTML='<div class="q">Welche Karte haben Sie gewählt?</div>'
    +(cand.length?'<input type="search" placeholder="Karte suchen" aria-label="Karte suchen"><ul>'
      +cand.map(c=>'<li><button type="button" data-id="'+esc(c.id)+'" title="'+esc(BOXNAME[c.box])+'"><span class="pc">'+c.cost+'</span><span>'+esc(c.fr||c.en)+'</span></button></li>').join("")+'</ul>'
      :'<p class="muted">Keine Karte in den angekreuzten Boxen verfügbar.</p>')
    +'<div class="row">'+(cand.length?'<button class="swap" type="button" data-r>Zufällig ziehen</button>':'')+'<button class="swap" type="button" data-x>Abbrechen</button></div>';
  const set=c=>{ swapRecent(s.card&&s.card.id,c.id); s.card=c; picking=-1; render(); };
  box.querySelectorAll("[data-id]").forEach(b=>b.onclick=()=>set(cand.find(c=>c.id===b.dataset.id)));
  const r=box.querySelector("[data-r]"); if(r) r.onclick=()=>set(pick(cand));
  box.querySelector("[data-x]").onclick=()=>{ picking=-1; render(); };
  const inp=box.querySelector("input");
  if(inp){ const norm=x=>String(x||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();
    inp.oninput=()=>{ const q=norm(inp.value); box.querySelectorAll("li").forEach(li=>{ li.hidden=!!q&&!norm(li.textContent).includes(q); }); };
    inp.onkeydown=e=>{ if(e.key==="Enter"){ const b=box.querySelector("li:not([hidden]) button"); if(b){ e.preventDefault(); b.click(); } } else if(e.key==="Escape"){ picking=-1; render(); } }; }
  return box;
}

function generate(mode){
  if(!enough()){ $("boxes").open=true; showWarn(); return; }
  hintShown=false; keysShown=false;
  fight={nem:$("f-nem").value,mages:[$("f-m1").value,$("f-m2").value].filter(Boolean)};
  const dist=rollDist();
  current = mode==="opt"?genOpt(dist):mode==="combo"?genCombo(dist):genRandom(dist);
  if(current.chosen) hintShown=true;
  current.setup=setupOn();
  pushRecent(current);
  showResult();
}
function showResult(){
  picking=-1;
  $("logform").hidden=true; $("l-done").hidden=true;
  $("ask").hidden=true; $("boxes").hidden=true; $("result").hidden=false;
  render(); window.scrollTo({top:0});
}
function showWarn(){
  const w=$("warn");
  if(enough()){w.hidden=true;return}
  w.hidden=false; w.textContent="Nicht genug Karten für diese Aufteilung: Kreuzen Sie eine weitere Schachtel an oder wählen Sie eine andere Aufteilung.";
}
function distText(d){ return d.Gem+(d.Gem>1?" Kristalle, ":" Kristall, ")+d.Relic+(d.Relic>1?" Artefakte, ":" Artefakt, ")+d.Spell+" Zauber" }
function renderDist(){
  const f=$("dist");
  DISTS.forEach(([k,name,a])=>{
    if(k==="m1"){ const h=document.createElement("div"); h.className="dist-sub"; h.textContent="Offizielle Aufbauten (Karten „Marktaufbau“):"; f.appendChild(h); }
    const l=document.createElement("label"); if(SETUPS[k]) l.className="setup-l";
    l.innerHTML='<input type="radio" name="dist" id="dist-'+k+'" value="'+k+'"'+(k===distChoice?" checked":"")+'>'+(SETUPS[k]
      ? '<span class="setup"><b>'+esc(name)+'</b>'+setupLines(k)+'</span>'
      : '<span>'+esc(name)+(a?' <i>'+a.join(" · ")+'</i>':'')+'</span>');
    l.querySelector("input").onchange=()=>{ distChoice=k; try{localStorage.setItem("ae-dist",k)}catch(e){} showWarn(); };
    f.appendChild(l);
  });
}
function renderBoxes(){
  const bl=$("boxlist"); bl.innerHTML="";
  const tools=document.createElement("div"); tools.className="boxtools";
  tools.innerHTML='<button type="button" class="linkbtn" data-all="1">Alle auswählen</button><button type="button" class="linkbtn" data-all="0">Keine auswählen</button>'
    +'<label class="spoil"><input type="checkbox"'+(spoil?" checked":"")+'> <span>Legacy-Schachteln zeigen (Spoiler: Ihre Karten, Magier und Erzfeinde werden im Lauf der Kampagne freigeschaltet)</span></label>';
  tools.querySelectorAll("[data-all]").forEach(b=>b.onclick=()=>{
    owned=new Set(b.dataset.all==="1"?BOXES.filter(x=>shown(x[0])).map(x=>x[0]):[]); saveBoxes(); renderBoxes(); });
  tools.querySelector(".spoil input").onchange=e=>{
    spoil=e.target.checked; try{localStorage.setItem("ae-spoil",spoil?"1":"0")}catch(err){}
    if(!spoil) BOXLEG.forEach(k=>owned.delete(k));
    saveBoxes(); renderBoxes(); fillSelects();
  };
  bl.appendChild(tools);
  let wave=-1, grid=null;
  BOXES.filter(b=>!b[3]||spoil).sort((a,b)=>(a[3]-b[3])||((a[2]||99)-(b[2]||99))).forEach(([k,name,w,leg])=>{
    const g=leg?-2:w;
    if(g!==wave){ wave=g; const h=document.createElement("h4"); h.className="wave";
      h.textContent=leg?"Legacy-Schachteln":w?"Welle "+w:"Promos"; bl.appendChild(h);
      grid=document.createElement("div"); grid.className="boxgrid"; bl.appendChild(grid); }
    const cs=CARDS.filter(c=>c.box===k), n=t=>cs.filter(c=>c.type===t).length;
    const l=document.createElement("label");
    l.innerHTML='<input type="checkbox" id="box-'+k+'"'+(owned.has(k)?" checked":"")+'><span>'+esc(name)+' <small>'+[["Gem","Kristall","Kristalle"],["Relic","Artefakt","Artefakte"],["Spell","Zauber","Zauber"]].filter(x=>n(x[0])).map(x=>n(x[0])+" "+(n(x[0])>1?x[2]:x[1])).join(" · ")+'</small></span>';
    l.querySelector("input").onchange=e=>{ e.target.checked?owned.add(k):owned.delete(k); saveBoxes(); };
    grid.appendChild(l);
  });
  boxSum();
}
function saveBoxes(){
  try{localStorage.setItem("ae-boxes2",JSON.stringify([...owned]))}catch(err){}
  boxSum(); showWarn(); renderJournal(); fillSelects();
}
function boxSum(){
  const n=CARDS.filter(c=>owned.has(c.box)).length;
  $("boxsum").textContent=owned.size+" von "+BOXES.filter(b=>shown(b[0])).length+" · "+n+" Karten";
}

document.querySelectorAll(".mode").forEach(b=>b.onclick=()=>generate(b.dataset.mode));
$("again").onclick=()=>generate(current.mode);
$("newfight").onclick=()=>{ $("result").hidden=true; $("ask").hidden=false; $("boxes").hidden=false; window.scrollTo({top:0}); };
$("copy").onclick=()=>{
  const lines=[MODES[current.mode][1]];
  TYPES.forEach(([t,label])=>{
    lines.push("",label+":");
    current.slots.filter(s=>s.type===t).sort((a,b)=>(a.card?a.card.cost:99)-(b.card?b.card.cost:99)).forEach(s=>{
      const c=s.card; if(!c){ lines.push("- nach Wahl, noch einzutragen"); return; } lines.push("- "+c.fr+" ("+c.cost+" Æ, "+BOXNAME[c.box]+")");
    });
  });
  const b=$("copy");
  const done=ok=>{b.textContent=ok?"Liste kopiert":"Kopieren hier nicht möglich"; setTimeout(()=>b.textContent="Liste kopieren",1800)};
  try{ navigator.clipboard.writeText(lines.join("\n")).then(()=>done(true),()=>done(false)); }catch(e){ done(false); }
};
/* ---------- journal : parties gardées dans la base de l'artefact ---------- */
let db=null, games=[], jstate="loading";
const byId=()=>Object.fromEntries(CARDS.map(c=>[c.id,c]));
function optionsHtml(list,sel,empty){
  const groups={}; list.forEach(x=>{ if(shown(x[1])||x[0]===sel) (groups[x[1]]=groups[x[1]]||[]).push(x[0]) });
  const keys=BOXES.map(b=>b[0]).filter(k=>groups[k]), ord=keys.filter(k=>owned.has(k)).concat(keys.filter(k=>!owned.has(k)));
  return '<option value="">'+empty+'</option>'+ord.map(g=>'<optgroup label="'+esc(BOXNAME[g])+'">'
    +groups[g].map(n=>'<option'+(n===sel?' selected':'')+'>'+esc(n)+'</option>').join("")+'</optgroup>').join("");
}
function fillSelects(){
  const keep={}; ["f-nem","f-m1","f-m2","f-theme"].forEach(id=>{ const e=$(id); if(e) keep[id]=e.value });
  $("f-nem").innerHTML=optionsHtml(NEM,"","Noch nicht gewählt");
  $("f-m1").innerHTML=optionsHtml(MAGES,"","Noch nicht gewählt"); $("f-m2").innerHTML=optionsHtml(MAGES,"","Noch nicht gewählt");
  $("f-theme").innerHTML='<option value="">Überraschung (verborgen)</option>'+Object.entries(THEMES).map(([k,t])=>'<option value="'+k+'">'+esc(t.name)+'</option>').join("");
  Object.entries(keep).forEach(([id,v])=>{ if(v) $(id).value=v });
}
function sortedGames(){ return games.slice().sort((a,b)=>String(b.date||"").localeCompare(String(a.date||""))||(b.ts||0)-(a.ts||0)) }
function renderJournal(){
  const cards=byId();
  if(jstate!=="ok"){
    $("winsum").textContent = jstate==="loading" ? "Tagebuch wird geladen…" : jstate==="slow" ? "Das Tagebuch antwortet noch nicht. Es erscheint, sobald die Verbindung wieder steht." : "Das Tagebuch ist in diesem Browser nicht verfügbar.";
    if(!games.length){ $("stats").innerHTML=""; $("wins").innerHTML=""; renderHunt(new Set(),new Set()); $("nwins").textContent=""; return; }
  }
  const item=x=>{ const c=typeof x==="string"?cards[x]:null; return c?[c.fr,c.cost,c.fx.replace(/[|~]/g," ")]:[String(x&&x.n||x),+(x&&x.c)||0,""] };
  const col=(cls,label,list)=>'<div class="col '+cls+'"><h4>'+label+'</h4><ul>'+(list||[]).map(item).sort((a,b)=>a[1]-b[1]).map(([n,c,fx])=>
    '<li'+(fx?' title="'+esc(fx).replace(/"/g,"&quot;")+'"':'')+'><span class="c">'+c+'</span><span>'+esc(n)+'</span></li>').join("")+'</ul></div>';
  const ids=g=>[].concat(g.gems||[],g.relics||[],g.spells||[]).filter(x=>typeof x==="string"&&cards[x]);
  const fmt=d=>{ const m=/^(\d{4})-(\d{2})-(\d{2})$/.exec(d||""); return m?m[3]+"."+m[2]+"."+m[1]:"" };
  const list=sortedGames(), wins=list.filter(g=>g.res==="V"), losses=list.filter(g=>g.res==="D");
  $("wins").innerHTML=list.map(g=>{ const v=g.res==="V", N=NEMBY[g.nem];
    return '<article class="win '+(v?"vic":"loss")+'"><div class="who"><span class="lbl'+(v?"":" l")+'">'+(v?"Sieg":"Niederlage")+(fmt(g.date)?" · "+fmt(g.date):"")+'</span><h3>'+esc(g.nem||"Unbekannter Erzfeind")+'</h3>'
    +(N?'<span class="chip">'+esc(N[1])+'</span>':'')
    +'<div class="mages"><span>Magier</span>'+((g.mages||[]).map(esc).join(" und ")||"nicht eingetragen")+'</div>'
    +(g.note?'<div class="rem">'+esc(g.note)+'</div>':'')
    +'<div class="acts">'+(ids(g).length?'<button class="swap" type="button" data-replay="'+esc(g.id)+'">Diesen Markt erneut spielen</button>':'')
    +'<button class="swap" type="button" data-del="'+esc(g.id)+'">Löschen</button></div></div>'
    +'<div class="mk">'+col("g-Gem","Kristalle",g.gems)+col("g-Relic","Artefakte",g.relics)+col("g-Spell","Zauber",g.spells)+'</div></article>'; }).join("")
    || '<p class="jmsg">Noch keine Partie eingetragen. Erzeugen Sie einen Markt, spielen Sie und klicken Sie dann auf Sieg oder Niederlage.</p>';
  document.querySelectorAll("[data-replay]").forEach(b=>b.onclick=()=>replay(b.dataset.replay));
  document.querySelectorAll("[data-del]").forEach(b=>b.onclick=()=>{
    if(b.dataset.sure){ db&&db.doc("parties/"+b.dataset.del).delete().catch(()=>{ b.textContent="Löschen nicht möglich" }); }
    else{ b.dataset.sure="1"; b.textContent="Löschen bestätigen"; }
  });
  // statistiques
  const beaten=new Set(wins.map(g=>g.nem)), lostTo=new Set(losses.map(g=>g.nem));
  $("nwins").textContent=list.length||"";
  if(jstate==="ok") $("winsum").textContent=list.length?wins.length+(wins.length>1?" Siege":" Sieg")+" und "+losses.length+(losses.length>1?" Niederlagen":" Niederlage")+" eingetragen. "+beaten.size+" von "+NEM.filter(n=>shown(n[1])).length+" Erzfeinden bereits besiegt.":"Das Tagebuch ist noch leer.";
  const count=(arr)=>{ const m=new Map(); arr.forEach(k=>m.set(k,(m.get(k)||0)+1)); return [...m.entries()].sort((a,b)=>b[1]-a[1]||String(a[0]).localeCompare(String(b[0]))) };
  const topCards=count(wins.flatMap(ids)).slice(0,8);
  const duos=count(wins.filter(g=>(g.mages||[]).length).map(g=>g.mages.slice().sort().join(" und "))).slice(0,5);
  const played=new Set(list.flatMap(ids)), never=CARDS.filter(c=>owned.has(c.box)&&!played.has(c.id));
  const perNem=NEM.map(n=>[n[0],wins.filter(g=>g.nem===n[0]).length,losses.filter(g=>g.nem===n[0]).length]).filter(x=>x[1]+x[2]).sort((a,b)=>(b[1]+b[2])-(a[1]+a[2]));
  const rate=list.length?Math.round(100*wins.length/list.length):0;
  const li=(a,b)=>'<li><span>'+esc(a)+'</span><b>'+b+'</b></li>';
  $("stats").innerHTML=!list.length?"":
    '<div class="stat"><h4>Überblick</h4><div class="big">'+rate+' %</div><div class="sub">Siege aus '+list.length+(list.length>1?' Partien':' Partie')+'</div></div>'
    +'<div class="stat"><h4>Nach Erzfeind</h4><ul>'+perNem.map(x=>li(x[0],x[1]+" S · "+x[2]+" N")).join("")+'</ul></div>'
    +'<div class="stat"><h4>Siegreiche Karten</h4><ol>'+(topCards.map(x=>li(cards[x[0]].fr,x[1]+" ×")).join("")||'<li><span>Noch keine Daten</span></li>')+'</ol></div>'
    +'<div class="stat"><h4>Siegreiche Duos</h4><ul>'+(duos.map(x=>li(x[0],x[1]+" ×")).join("")||'<li><span>Noch keine Daten</span></li>')+'</ul></div>'
    +'<div class="stat"><h4>Nie gespielt</h4><div class="big">'+never.length+'</div><div class="sub">Karten von '+CARDS.filter(c=>owned.has(c.box)).length+' in den angekreuzten Schachteln</div>'
    +'<details><summary>Liste ansehen</summary><p>'+never.map(c=>esc(c.fr)).join(", ")+'</p></details></div>';
  renderHunt(beaten,lostTo);
}
function renderHunt(beaten,lostTo){
  const groups={}; NEM.forEach(n=>{ if(shown(n[1])||beaten.has(n[0])||lostTo.has(n[0])) (groups[n[1]]=groups[n[1]]||[]).push(n[0]) });
  $("hunt").innerHTML='<h3>Trophäentafel</h3>'+Object.entries(groups).map(([box,ns])=>'<div class="grp"><b>'+esc(BOXNAME[box])+'</b>'
    +ns.map(n=>'<span class="chip'+(beaten.has(n)?' done':lostTo.has(n)?' lost':'')+'"'+(lostTo.has(n)&&!beaten.has(n)?' title="Bekämpft, noch nicht besiegt"':'')+'>'+esc(n)+'</span>').join("")+'</div>').join("");
}
function replay(id){
  const g=games.find(x=>x.id===id); if(!g) return;
  const cards=byId(), slots=[]; let missing=0;
  [["Gem",g.gems],["Relic",g.relics],["Spell",g.spells]].forEach(([t,l])=>(l||[]).forEach(x=>{ const c=typeof x==="string"&&cards[x]; c?slots.push({type:t,card:c}):missing++ }));
  if(!slots.length) return;
  const n=t=>slots.filter(s=>s.type===t).length;
  fight={nem:g.nem||"",mages:(g.mages||[]).slice(0,2)};
  $("f-nem").value=fight.nem; $("f-m1").value=fight.mages[0]||""; $("f-m2").value=fight.mages[1]||"";
  current={mode:"replay",dist:{Gem:n("Gem"),Relic:n("Relic"),Spell:n("Spell")},slots,missing,
    label:"Markt "+(g.res==="V"?"des Siegs":"der Niederlage")+" gegen "+(g.nem||"einen Erzfeind")+((g.mages||[]).length?", mit "+g.mages.join(" und "):"")+"."};
  location.hash="marche"; showView(); showResult();
}
let logRes="V";
function openLog(res){
  logRes=res; const f=$("logform");
  $("l-nem").innerHTML=optionsHtml(NEM,fight.nem,"Bitte wählen");
  $("l-m1").innerHTML=optionsHtml(MAGES,fight.mages[0]||"","Nicht eingetragen"); $("l-m2").innerHTML=optionsHtml(MAGES,fight.mages[1]||"","Nicht eingetragen");
  const d=new Date(); $("l-date").value=d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");
  $("l-note").value=""; $("l-msg").textContent=db?"":"Das Tagebuch ist in dieser Ansicht nicht verfügbar.";
  $("l-save").textContent=res==="V"?"Sieg speichern":"Niederlage speichern"; $("l-save").disabled=!db;
  $("l-done").hidden=true; f.hidden=false;
}
$("logwin").onclick=()=>openLog("V"); $("logloss").onclick=()=>openLog("D");
$("l-cancel").onclick=()=>{ $("logform").hidden=true };
$("logform").onsubmit=e=>{
  e.preventDefault(); if(!db||!current) return;
  const nem=$("l-nem").value; if(!nem){ $("l-msg").textContent="Wählen Sie den Erzfeind, gegen den Sie gespielt haben."; return; }
  const of=t=>current.slots.filter(s=>s.type===t&&s.card).map(s=>s.card.id);
  const doc={res:logRes,nem,mages:[$("l-m1").value,$("l-m2").value].filter(Boolean),gems:of("Gem"),relics:of("Relic"),spells:of("Spell"),
    note:$("l-note").value.trim(),date:$("l-date").value||"",mode:current.mode,ts:Date.now()};
  $("l-save").disabled=true; $("l-msg").textContent="";
  db.collection("parties").add(doc).then(()=>{
    $("logform").hidden=true; const p=$("l-done"); p.hidden=false;
    p.textContent=(logRes==="V"?"Sieg":"Niederlage")+" gegen "+nem+" im Tagebuch gespeichert.";
  },()=>{ $("l-save").disabled=false; $("l-msg").textContent="Speichern gerade nicht möglich. Versuchen Sie es gleich noch einmal."; });
};
(async()=>{
  await Promise.resolve();
  let d=null; try{ d=window.claude&&window.claude.use?await window.claude.use("db"):null }catch(e){}
  if(!d){ jstate="off"; xstate="off"; renderJournal(); renderExp(); return; }
  db=d; const slow=setTimeout(()=>{ if(jstate==="loading"){ jstate="slow"; renderJournal(); } },10000);
  db.collection("parties").onSnapshot(snap=>{
    games=snap.docs.map(x=>Object.assign({id:x.id},x.data()));
    if(!snap.metadata||!snap.metadata.fromCache||games.length){ clearTimeout(slow); jstate="ok"; }
    renderJournal();
  },()=>{ clearTimeout(slow); jstate="off"; renderJournal(); });
  const xslow=setTimeout(()=>{ if(xstate==="loading"){ xstate="slow"; renderExp(); } },10000);
  db.collection("expeditions").onSnapshot(snap=>{
    const remote=snap.docs.map(x=>Object.assign({id:x.id},JSON.parse(JSON.stringify(x.data()||{})))).filter(e=>XVAR[e.variant]&&e.barracks&&e.cur&&Array.isArray(e.history));
    const ids=new Set(remote.map(e=>e.id)); exps=remote.concat(exps.filter(e=>!ids.has(e.id)&&e._local));
    if(!snap.metadata||!snap.metadata.fromCache||remote.length){ clearTimeout(xslow); xstate="ok"; }
    renderExp();
  },()=>{ clearTimeout(xslow); xstate="off"; renderExp(); });
})();