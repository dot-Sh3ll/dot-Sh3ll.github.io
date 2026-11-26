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
    Gem:[{test:c=>c.cost<=4,role:"Économie rapide"},{test:c=>c.cost>=5,role:"Gros éther"},{test:null,role:"Éther d'appoint"}],
    Relic:[{test:has("thin"),role:"Épuration du deck"},{test:c=>!c.tags.includes("thin"),role:"Soutien"},{test:c=>!c.tags.includes("thin"),role:"Soutien"}],
    Spell:[{test:c=>c.cost<=4,role:"Sort d'ouverture"},{test:c=>c.cost>=6,role:"Finisseur"},{test:c=>c.cost===5,role:"Milieu de partie"},{test:c=>c.cost>=6,role:"Finisseur"},{test:c=>c.cost<=4,role:"Sort d'ouverture"}]
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
  return fx.split("~").map(part=>part.split("|").map(l=>esc(l).replace(/^(Lancer :|Écho|Lien|Connectez)/,"<b>$1</b>")).join("<br>")).join('<span class="or">OU</span>');
}
const MODES={opt:["Le plus facile","Marché optimisé"],combo:["À vous de trouver","Marché original"],rand:["Au hasard","Marché full random"],replay:["Déjà joué","Marché rejoué"]};
let hintShown=false, keysShown=false, picking=-1;

function fitsFight(t){
  const N=NEMBY[fight.nem]; if(N&&N[2]&&(N[2].want||[]).includes(t)) return true;
  return fight.mages.some(n=>MAGEBY[n]&&MAGEBY[n][2].includes(t));
}
function adaptText(){
  const out=[]; const N=NEMBY[fight.nem];
  if(N) out.push(N[2]?"<b>Contre "+esc(N[0])+"</b> : "+esc(N[3])+".":"<b>"+esc(N[0])+"</b> : je ne connais pas assez cette némésis pour orienter le tirage, il reste généraliste.");
  if(N&&NEMSETUP[N[0]]) out.push("<b>Rappel de mise en place</b> : "+esc(NEMSETUP[N[0]]));
  fight.mages.forEach(n=>{ const M=MAGEBY[n]; if(M&&M[2].length) out.push("<b>Pour "+esc(n.replace(/ \(.*/,""))+"</b> : "+esc(M[3])+"."); });
  return out.length?"<p>"+out.join(" ")+"</p>":"";
}
function render(){
  const m=current; $("rk").textContent=MODES[m.mode][0]+" · "+(m.setup?DISTS.find(x=>x[0]===m.setup)[1]+" · ":"")+distText(m.dist);
  $("again").hidden=m.mode==="replay"; $("rt").textContent=MODES[m.mode][1];
  const note=$("note");
  if(m.mode==="opt"){
    note.innerHTML="<p>Plan de jeu : achetez la gemme bon marché dès les premiers tours, épurez vos Cristaux et Étincelles avec la relique dédiée, puis empilez les finisseurs.</p>"+adaptText()+"<p class='muted'>Chaque carte porte son rôle. Vous pouvez en changer une : la remplaçante tient le même poste.</p>";
  }else if(m.mode==="replay"){
    note.innerHTML="<p>"+esc(m.label)+"</p>"+(m.missing?"<p class='muted'>"+m.missing+" carte(s) de ce marché ne sont pas dans le générateur et manquent ici.</p>":"");
  }else if(m.mode==="rand"){
    note.innerHTML="<p>Tirage sans filtre : aucune garantie de coût ni d'équilibre. Bonne chance.</p>";
  }else{
    const th=THEMES[m.theme], nkey=m.slots.filter(s=>s.key).length;
    note.innerHTML = (hintShown
      ? "<p><b>"+esc(th.name)+".</b> "+esc(th.hint)+"</p>"
      : "<p>Une synergie relie "+nkey+" de ces cartes. À vous de la trouver en jouant.</p>")
      + (hintShown&&!m.chosen&&fitsFight(m.theme)?"<p class='muted'>Thème retenu parce qu'il sert ce combat.</p>":"")
      + "<div class='row'>"
      + (hintShown?"":"<button class='btn' id='bhint' type='button'>Révéler l'indice</button>")
      + (keysShown?"":"<button class='btn' id='bkeys' type='button'>Montrer les cartes du combo</button>")
      + "</div>";
    const bh=$("bhint"), bk=$("bkeys");
    if(bh) bh.onclick=()=>{hintShown=true;render()};
    if(bk) bk.onclick=()=>{keysShown=true;hintShown=true;render()};
  }
  const um=m.slots.filter(s=>s.unmet).length;
  if(um) note.innerHTML+="<p class='muted'>"+um+" pile(s) tirée(s) sans tenir compte du coût : pas assez de cartes au bon coût dans les boîtes cochées.</p>";
  const nf=m.slots.filter(s=>s.free&&!s.card).length;
  if(nf) note.innerHTML+="<p>"+nf+" pile(s) au choix : touchez le + pour indiquer la carte que vous avez choisie.</p>";
  const mk=$("market"); mk.innerHTML="";
  TYPES.forEach(([t,label])=>{
    const n=m.dist[t];
    const g=document.createElement("div"); g.className="group g-"+t;
    g.innerHTML="<h3>"+label+" <small>"+n+(n>1?" piles":" pile")+"</small></h3>";
    const wrap=document.createElement("div"); wrap.className="cards";
    m.slots.map((s,i)=>({s,i})).filter(x=>x.s.type===t).sort((a,b)=>(a.s.card?a.s.card.cost:99)-(b.s.card?b.s.card.cost:99)||a.i-b.i).forEach(({s,i})=>{
      const c=s.card, el=document.createElement("article");
      if(picking===i){ el.className="card free"; el.appendChild(pickerEl(s,i)); wrap.appendChild(el); return; }
      if(!c){ el.className="card free";
        el.innerHTML='<button class="addbtn" type="button" data-pick="'+i+'" aria-label="Choisir la carte au choix"><span class="plus" aria-hidden="true">+</span><b>Carte au choix</b><span>Choisir la carte</span></button>'
          +'<div class="foot"><span><span class="chip req" title="Pile au choix dans la mise en place">Au choix</span></span></div>';
        wrap.appendChild(el); return; }
      el.className="card"+(m.mode==="combo"&&keysShown&&s.key?" key":"");
      el.innerHTML='<div class="top"><span class="cost" title="Coût en éther">'+c.cost+'</span><div><div class="name">'+esc(c.fr||c.en)+'</div>'
        +'</div></div>'
        +'<div class="fx">'+fxHtml(c.fx)+'</div>'
        +'<div class="foot"><span>'+(m.mode==="opt"&&s.role?'<span class="chip role">'+esc(s.role)+'</span> ':'')
        +(m.mode==="opt"?bonus(c).why.map(w=>'<span class="chip adapt">'+esc(w)+'</span> ').join(""):'')
        +(s.req?'<span class="chip req'+(s.unmet?' off':'')+'" title="Coût imposé par la mise en place">Coût '+esc(s.req.label)+'</span> ':'')
        +(s.free?'<span class="chip req" title="Pile au choix dans la mise en place">Au choix</span> ':'')
        +'<span class="chip">'+esc(BOXNAME[c.box])+'</span></span>'
        +'<button class="swap" type="button" data-i="'+i+'" aria-label="Changer '+esc(c.fr||c.en)+'">Changer</button></div>';
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
  box.innerHTML='<div class="q">Quelle carte avez-vous choisie ?</div>'
    +(cand.length?'<input type="search" placeholder="Chercher une carte" aria-label="Chercher une carte"><ul>'
      +cand.map(c=>'<li><button type="button" data-id="'+esc(c.id)+'" title="'+esc(BOXNAME[c.box])+'"><span class="pc">'+c.cost+'</span><span>'+esc(c.fr||c.en)+'</span></button></li>').join("")+'</ul>'
      :'<p class="muted">Aucune carte disponible dans les boîtes cochées.</p>')
    +'<div class="row">'+(cand.length?'<button class="swap" type="button" data-r>Tirer au hasard</button>':'')+'<button class="swap" type="button" data-x>Annuler</button></div>';
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
  w.hidden=false; w.textContent="Pas assez de cartes pour cette répartition : cochez une boîte de plus ou choisissez-en une autre.";
}
function distText(d){ return d.Gem+(d.Gem>1?" gemmes, ":" gemme, ")+d.Relic+(d.Relic>1?" reliques, ":" relique, ")+d.Spell+" sorts" }
function renderDist(){
  const f=$("dist");
  DISTS.forEach(([k,name,a])=>{
    if(k==="m1"){ const h=document.createElement("div"); h.className="dist-sub"; h.textContent="Mises en place officielles (cartes « Mise en place du marché ») :"; f.appendChild(h); }
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
  tools.innerHTML='<button type="button" class="linkbtn" data-all="1">Tout cocher</button><button type="button" class="linkbtn" data-all="0">Tout décocher</button>'
    +'<label class="spoil"><input type="checkbox"'+(spoil?" checked":"")+'> <span>Afficher les boîtes Legacy (spoilers : leurs cartes, mages et némésis se débloquent pendant la campagne)</span></label>';
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
      h.textContent=leg?"Boîtes Legacy":w?"Vague "+w:"Promos"; bl.appendChild(h);
      grid=document.createElement("div"); grid.className="boxgrid"; bl.appendChild(grid); }
    const cs=CARDS.filter(c=>c.box===k), n=t=>cs.filter(c=>c.type===t).length;
    const l=document.createElement("label");
    l.innerHTML='<input type="checkbox" id="box-'+k+'"'+(owned.has(k)?" checked":"")+'><span>'+esc(name)+' <small>'+[["Gem","gemme"],["Relic","relique"],["Spell","sort"]].filter(x=>n(x[0])).map(x=>n(x[0])+" "+x[1]+(n(x[0])>1?"s":"")).join(" · ")+'</small></span>';
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
  $("boxsum").textContent=owned.size+" sur "+BOXES.filter(b=>shown(b[0])).length+" · "+n+" cartes";
}

document.querySelectorAll(".mode").forEach(b=>b.onclick=()=>generate(b.dataset.mode));
$("again").onclick=()=>generate(current.mode);
$("newfight").onclick=()=>{ $("result").hidden=true; $("ask").hidden=false; $("boxes").hidden=false; window.scrollTo({top:0}); };
$("copy").onclick=()=>{
  const lines=[MODES[current.mode][1]];
  TYPES.forEach(([t,label])=>{
    lines.push("",label+" :");
    current.slots.filter(s=>s.type===t).sort((a,b)=>(a.card?a.card.cost:99)-(b.card?b.card.cost:99)).forEach(s=>{
      const c=s.card; if(!c){ lines.push("- au choix, à compléter"); return; } lines.push("- "+c.fr+" ("+c.cost+" Æ, "+BOXNAME[c.box]+")");
    });
  });
  const b=$("copy");
  const done=ok=>{b.textContent=ok?"Liste copiée":"Copie impossible ici"; setTimeout(()=>b.textContent="Copier la liste",1800)};
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
  $("f-nem").innerHTML=optionsHtml(NEM,"","Pas encore choisie");
  $("f-m1").innerHTML=optionsHtml(MAGES,"","Pas encore choisi"); $("f-m2").innerHTML=optionsHtml(MAGES,"","Pas encore choisi");
  $("f-theme").innerHTML='<option value="">Surprise (caché)</option>'+Object.entries(THEMES).map(([k,t])=>'<option value="'+k+'">'+esc(t.name)+'</option>').join("");
  Object.entries(keep).forEach(([id,v])=>{ if(v) $(id).value=v });
}
function sortedGames(){ return games.slice().sort((a,b)=>String(b.date||"").localeCompare(String(a.date||""))||(b.ts||0)-(a.ts||0)) }
function renderJournal(){
  const cards=byId();
  if(jstate!=="ok"){
    $("winsum").textContent = jstate==="loading" ? "Chargement du journal…" : jstate==="slow" ? "Le journal ne répond pas encore. Il s'affichera dès que la connexion revient." : "Le journal n'est pas disponible dans ce navigateur.";
    if(!games.length){ $("stats").innerHTML=""; $("wins").innerHTML=""; renderHunt(new Set(),new Set()); $("nwins").textContent=""; return; }
  }
  const item=x=>{ const c=typeof x==="string"?cards[x]:null; return c?[c.fr,c.cost,c.fx.replace(/[|~]/g," ")]:[String(x&&x.n||x),+(x&&x.c)||0,""] };
  const col=(cls,label,list)=>'<div class="col '+cls+'"><h4>'+label+'</h4><ul>'+(list||[]).map(item).sort((a,b)=>a[1]-b[1]).map(([n,c,fx])=>
    '<li'+(fx?' title="'+esc(fx).replace(/"/g,"&quot;")+'"':'')+'><span class="c">'+c+'</span><span>'+esc(n)+'</span></li>').join("")+'</ul></div>';
  const ids=g=>[].concat(g.gems||[],g.relics||[],g.spells||[]).filter(x=>typeof x==="string"&&cards[x]);
  const fmt=d=>{ const m=/^(\d{4})-(\d{2})-(\d{2})$/.exec(d||""); return m?m[3]+"/"+m[2]+"/"+m[1]:"" };
  const list=sortedGames(), wins=list.filter(g=>g.res==="V"), losses=list.filter(g=>g.res==="D");
  $("wins").innerHTML=list.map(g=>{ const v=g.res==="V", N=NEMBY[g.nem];
    return '<article class="win '+(v?"vic":"loss")+'"><div class="who"><span class="lbl'+(v?"":" l")+'">'+(v?"Victoire":"Défaite")+(fmt(g.date)?" · "+fmt(g.date):"")+'</span><h3>'+esc(g.nem||"Némésis inconnue")+'</h3>'
    +(N?'<span class="chip">'+esc(N[1])+'</span>':'')
    +'<div class="mages"><span>Mages</span>'+((g.mages||[]).map(esc).join(" et ")||"non notés")+'</div>'
    +(g.note?'<div class="rem">'+esc(g.note)+'</div>':'')
    +'<div class="acts">'+(ids(g).length?'<button class="swap" type="button" data-replay="'+esc(g.id)+'">Rejouer ce marché</button>':'')
    +'<button class="swap" type="button" data-del="'+esc(g.id)+'">Supprimer</button></div></div>'
    +'<div class="mk">'+col("g-Gem","Gemmes",g.gems)+col("g-Relic","Reliques",g.relics)+col("g-Spell","Sorts",g.spells)+'</div></article>'; }).join("")
    || '<p class="jmsg">Aucune partie notée. Générez un marché, jouez, puis cliquez sur Victoire ou Défaite.</p>';
  document.querySelectorAll("[data-replay]").forEach(b=>b.onclick=()=>replay(b.dataset.replay));
  document.querySelectorAll("[data-del]").forEach(b=>b.onclick=()=>{
    if(b.dataset.sure){ db&&db.doc("parties/"+b.dataset.del).delete().catch(()=>{ b.textContent="Suppression impossible" }); }
    else{ b.dataset.sure="1"; b.textContent="Confirmer la suppression"; }
  });
  // statistiques
  const beaten=new Set(wins.map(g=>g.nem)), lostTo=new Set(losses.map(g=>g.nem));
  $("nwins").textContent=list.length||"";
  if(jstate==="ok") $("winsum").textContent=list.length?wins.length+" victoire"+(wins.length>1?"s":"")+" et "+losses.length+" défaite"+(losses.length>1?"s":"")+" notées. "+beaten.size+" némésis sur "+NEM.filter(n=>shown(n[1])).length+" déjà tombées.":"Le journal est vide pour l'instant.";
  const count=(arr)=>{ const m=new Map(); arr.forEach(k=>m.set(k,(m.get(k)||0)+1)); return [...m.entries()].sort((a,b)=>b[1]-a[1]||String(a[0]).localeCompare(String(b[0]))) };
  const topCards=count(wins.flatMap(ids)).slice(0,8);
  const duos=count(wins.filter(g=>(g.mages||[]).length).map(g=>g.mages.slice().sort().join(" et "))).slice(0,5);
  const played=new Set(list.flatMap(ids)), never=CARDS.filter(c=>owned.has(c.box)&&!played.has(c.id));
  const perNem=NEM.map(n=>[n[0],wins.filter(g=>g.nem===n[0]).length,losses.filter(g=>g.nem===n[0]).length]).filter(x=>x[1]+x[2]).sort((a,b)=>(b[1]+b[2])-(a[1]+a[2]));
  const rate=list.length?Math.round(100*wins.length/list.length):0;
  const li=(a,b)=>'<li><span>'+esc(a)+'</span><b>'+b+'</b></li>';
  $("stats").innerHTML=!list.length?"":
    '<div class="stat"><h4>Bilan</h4><div class="big">'+rate+' %</div><div class="sub">de victoires sur '+list.length+' partie'+(list.length>1?"s":"")+'</div></div>'
    +'<div class="stat"><h4>Par némésis</h4><ul>'+perNem.map(x=>li(x[0],x[1]+" V · "+x[2]+" D")).join("")+'</ul></div>'
    +'<div class="stat"><h4>Cartes des victoires</h4><ol>'+(topCards.map(x=>li(cards[x[0]].fr,x[1]+" ×")).join("")||'<li><span>Pas encore de données</span></li>')+'</ol></div>'
    +'<div class="stat"><h4>Duos gagnants</h4><ul>'+(duos.map(x=>li(x[0],x[1]+" ×")).join("")||'<li><span>Pas encore de données</span></li>')+'</ul></div>'
    +'<div class="stat"><h4>Jamais jouées</h4><div class="big">'+never.length+'</div><div class="sub">cartes sur '+CARDS.filter(c=>owned.has(c.box)).length+' dans les boîtes cochées</div>'
    +'<details><summary>Voir la liste</summary><p>'+never.map(c=>esc(c.fr)).join(", ")+'</p></details></div>';
  renderHunt(beaten,lostTo);
}
function renderHunt(beaten,lostTo){
  const groups={}; NEM.forEach(n=>{ if(shown(n[1])||beaten.has(n[0])||lostTo.has(n[0])) (groups[n[1]]=groups[n[1]]||[]).push(n[0]) });
  $("hunt").innerHTML='<h3>Tableau de chasse</h3>'+Object.entries(groups).map(([box,ns])=>'<div class="grp"><b>'+esc(BOXNAME[box])+'</b>'
    +ns.map(n=>'<span class="chip'+(beaten.has(n)?' done':lostTo.has(n)?' lost':'')+'"'+(lostTo.has(n)&&!beaten.has(n)?' title="Affrontée, pas encore vaincue"':'')+'>'+esc(n)+'</span>').join("")+'</div>').join("");
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
    label:"Marché "+(g.res==="V"?"de la victoire":"de la défaite")+" contre "+(g.nem||"une némésis")+((g.mages||[]).length?", avec "+g.mages.join(" et "):"")+"."};
  location.hash="marche"; showView(); showResult();
}
let logRes="V";
function openLog(res){
  logRes=res; const f=$("logform");
  $("l-nem").innerHTML=optionsHtml(NEM,fight.nem,"À choisir");
  $("l-m1").innerHTML=optionsHtml(MAGES,fight.mages[0]||"","Non noté"); $("l-m2").innerHTML=optionsHtml(MAGES,fight.mages[1]||"","Non noté");
  const d=new Date(); $("l-date").value=d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");
  $("l-note").value=""; $("l-msg").textContent=db?"":"Le journal n'est pas disponible dans cette vue.";
  $("l-save").textContent="Enregistrer la "+(res==="V"?"victoire":"défaite"); $("l-save").disabled=!db;
  $("l-done").hidden=true; f.hidden=false;
}
$("logwin").onclick=()=>openLog("V"); $("logloss").onclick=()=>openLog("D");
$("l-cancel").onclick=()=>{ $("logform").hidden=true };
$("logform").onsubmit=e=>{
  e.preventDefault(); if(!db||!current) return;
  const nem=$("l-nem").value; if(!nem){ $("l-msg").textContent="Choisissez la némésis affrontée."; return; }
  const of=t=>current.slots.filter(s=>s.type===t&&s.card).map(s=>s.card.id);
  const doc={res:logRes,nem,mages:[$("l-m1").value,$("l-m2").value].filter(Boolean),gems:of("Gem"),relics:of("Relic"),spells:of("Spell"),
    note:$("l-note").value.trim(),date:$("l-date").value||"",mode:current.mode,ts:Date.now()};
  $("l-save").disabled=true; $("l-msg").textContent="";
  db.collection("parties").add(doc).then(()=>{
    $("logform").hidden=true; const p=$("l-done"); p.hidden=false;
    p.textContent=(logRes==="V"?"Victoire":"Défaite")+" contre "+nem+" enregistrée dans le journal.";
  },()=>{ $("l-save").disabled=false; $("l-msg").textContent="Enregistrement impossible pour l'instant. Réessayez dans un instant."; });
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