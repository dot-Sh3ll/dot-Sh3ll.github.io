"""Apply the new data blocks and the code changes to the FR and EN Aeon's End pages."""
import json, re, sys

B = json.load(open('/home/claude/ae/blocks.json', encoding='utf-8'))
APP = '/home/claude/dot-sh3ll.github.io/aeons-end/'


def sub1(s, old, new, regex=False):
    if regex:
        s2, n = re.subn(old, lambda m: new, s, count=1, flags=re.S)
    else:
        n = s.count(old)
        s2 = s.replace(old, new, 1)
    if n != 1:
        raise SystemExit(f'pattern found {n}x: {old[:80]!r}')
    return s2


for lang, fn in (('fr', 'index.html'), ('en', 'en.html')):
    FR = lang == 'fr'
    s = open(APP + fn, encoding='utf-8').read()
    data, nem, lvl = B[lang]

    # ---- data
    s = sub1(s, r'const RAW = \[\n.*?const BOXNAME = Object\.fromEntries\(BOXES\);', data, regex=True)
    s = sub1(s, r'const NEM = \[\n.*?\n\];\nconst MAGES = \[\n.*?\n\];', nem, regex=True)
    s = sub1(s, r'const BOXKEY=\{.*?\};\nconst NEMLVL=\{.*?\};', lvl, regex=True)
    s = sub1(s, 'const mageOwned=m=>owned.has(BOXKEY[m[1]]), nemOwned=n=>owned.has(BOXKEY[n[1]]);',
             'const mageOwned=m=>owned.has(m[1]), nemOwned=n=>owned.has(n[1]);')

    # ---- state: default boxes, Legacy spoilers
    s = sub1(s, 'let owned = new Set(BOXES.map(b=>b[0]).filter(b=>b!=="BASE"));',
             'let owned = new Set(BOXES.filter(b=>!b[3]).map(b=>b[0]));\n'
             'let spoil = false; try{ spoil = localStorage.getItem("ae-spoil")==="1"; }catch(e){}\n'
             'const shown = k=>spoil||!BOXLEG.has(k);')
    s = sub1(s, 'if(Array.isArray(s)&&s.length) owned = new Set(s.filter(x=>BOXNAME[x]));',
             'if(Array.isArray(s)) owned = new Set(s.filter(x=>BOXNAME[x]&&shown(x)));')

    # ---- select lists grouped by box, owned boxes first, Legacy hidden
    s = sub1(s, r'function optionsHtml\(list,sel,empty\)\{\n.*?\n\}\n',
             'function optionsHtml(list,sel,empty){\n'
             '  const groups={}; list.forEach(x=>{ if(shown(x[1])||x[0]===sel) (groups[x[1]]=groups[x[1]]||[]).push(x[0]) });\n'
             '  const keys=BOXES.map(b=>b[0]).filter(k=>groups[k]), ord=keys.filter(k=>owned.has(k)).concat(keys.filter(k=>!owned.has(k)));\n'
             '  return \'<option value="">\'+empty+\'</option>\'+ord.map(g=>\'<optgroup label="\'+esc(BOXNAME[g])+\'">\'\n'
             '    +groups[g].map(n=>\'<option\'+(n===sel?\' selected\':\'\')+\'>\'+esc(n)+\'</option>\').join("")+\'</optgroup>\').join("");\n'
             '}\n', regex=True)

    # ---- hunting board: only owned boxes (or nemeses already faced)
    s = sub1(s, 'const groups={}; NEM.forEach(n=>(groups[n[1]]=groups[n[1]]||[]).push(n[0]));',
             'const groups={}; NEM.forEach(n=>{ if((owned.has(n[1])&&shown(n[1]))||beaten.has(n[0])||lostTo.has(n[0])) (groups[n[1]]=groups[n[1]]||[]).push(n[0]) });')
    s = sub1(s, "Object.entries(groups).map(([box,ns])=>'<div class=\"grp\"><b>'+esc(box)+'</b>'",
             "Object.entries(groups).map(([box,ns])=>'<div class=\"grp\"><b>'+esc(BOXNAME[box])+'</b>'")
    s = sub1(s, '+beaten.size+" ' + ('némésis sur' if FR else 'of') + ' "+NEM.length+"',
             '+beaten.size+" ' + ('némésis sur' if FR else 'of') + ' "+NEM.filter(n=>owned.has(n[1])).length+"')

    # ---- manual add list: hide Legacy boxes
    s = sub1(s, '+BOXES.map(([k,n])=>{ const l=CARDS.filter(c=>c.type===t&&c.box===k&&',
             '+BOXES.filter(b=>shown(b[0])).map(([k,n])=>{ const l=CARDS.filter(c=>c.type===t&&c.box===k&&')

    # ---- photo analysis: only cards from owned boxes
    s = sub1(s, 'const list=CARDS.map(c=>c.id+" | "', 'const list=CARDS.filter(c=>owned.has(c.box)).map(c=>c.id+" | "')
    s = sub1(s, 'NEM.map(n=>n[0]).join(", ")+', 'NEM.filter(nemOwned).map(n=>n[0]).join(", ")+')
    s = sub1(s, 'MAGES.map(m=>m[0]).join(", ")+', 'MAGES.filter(mageOwned).map(m=>m[0]).join(", ")+')

    # ---- box picker: grouped by wave, all/none, Legacy behind a spoiler switch
    T = dict(
        wave='Vague' if FR else 'Wave', promo='Promos' if FR else 'Promos',
        gems='gemmes' if FR else 'gems', relics='reliques' if FR else 'relics', spells='sorts' if FR else 'spells',
        all='Tout cocher' if FR else 'Select all', none='Tout décocher' if FR else 'Clear all',
        spoil=('Afficher les boîtes Legacy (spoilers : leurs cartes, mages et némésis se débloquent pendant la campagne)' if FR
               else 'Show Legacy boxes (spoilers: their cards, mages and nemeses unlock during the campaign)'),
        leg='Boîtes Legacy' if FR else 'Legacy boxes',
        of='sur' if FR else 'of', cards='cartes' if FR else 'cards',
    )
    newbox = '''function renderBoxes(){
  const bl=$("boxlist"); bl.innerHTML="";
  const tools=document.createElement("div"); tools.className="boxtools";
  tools.innerHTML='<button type="button" class="linkbtn" data-all="1">%(all)s</button><button type="button" class="linkbtn" data-all="0">%(none)s</button>'
    +'<label class="spoil"><input type="checkbox"'+(spoil?" checked":"")+'> <span>%(spoil)s</span></label>';
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
      h.textContent=leg?"%(leg)s":w?"%(wave)s "+w:"%(promo)s"; bl.appendChild(h);
      grid=document.createElement("div"); grid.className="boxgrid"; bl.appendChild(grid); }
    const cs=CARDS.filter(c=>c.box===k), n=t=>cs.filter(c=>c.type===t).length;
    const l=document.createElement("label");
    l.innerHTML='<input type="checkbox" id="box-'+k+'"'+(owned.has(k)?" checked":"")+'><span>'+esc(name)+' <small>'+n("Gem")+' %(gems)s · '+n("Relic")+' %(relics)s · '+n("Spell")+' %(spells)s</small></span>';
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
  $("boxsum").textContent=owned.size+" %(of)s "+BOXES.filter(b=>shown(b[0])).length+" · "+n+" %(cards)s";
}
''' % T
    s = sub1(s, r'function renderBoxes\(\)\{\n.*?\nfunction boxSum\(\)\{\n.*?\n\}\n', newbox, regex=True)

    # fillSelects keeps the current choices when it is called again
    s = sub1(s, r'function fillSelects\(\)\{\n', 'function fillSelects(){\n'
             '  const keep={}; ["f-nem","f-m1","f-m2","f-theme"].forEach(id=>{ const e=$(id); if(e) keep[id]=e.value });\n', regex=True)
    s = sub1(s, r'(\$\("f-theme"\)\.innerHTML=.*?;\n)', None, regex=True) if False else s
    m = re.search(r'(function fillSelects\(\)\{\n.*?\n)(\})', s, re.S)
    body = m.group(1)
    s = s[:m.start()] + body + '  Object.entries(keep).forEach(([id,v])=>{ if(v) $(id).value=v });\n' + m.group(2) + s[m.end():]

    # ---- CSS for the box picker
    s = sub1(s, '.boxlist{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:8px 18px;padding:12px 0 6px}',
             '.boxlist{padding:10px 0 6px}\n'
             '.boxgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:8px 18px;padding:4px 0 10px}\n'
             '.boxlist h4.wave{margin:10px 0 2px;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);font-weight:600}\n'
             '.boxtools{display:flex;flex-wrap:wrap;gap:6px 16px;align-items:center;padding:2px 0 6px}\n'
             '.boxtools .linkbtn{background:none;border:0;padding:4px 0;color:var(--accent,inherit);text-decoration:underline;cursor:pointer;font:inherit;font-size:14px}\n'
             '.boxtools .spoil{display:flex;gap:8px;align-items:baseline;font-size:14px;color:var(--muted);flex-basis:100%}')

    # ---- texts
    if FR:
        s = sub1(s, 'tirées de tes 98 cartes.', 'tirées des boîtes que tu possèdes.')
        s = sub1(s, "Outil non officiel. Noms et coûts relevés sur tes cartes Tirage aléatoire. Les textes d'effet sont résumés : en cas de doute, la carte fait foi.",
                 "Outil non officiel. Les textes d'effet sont résumés : en cas de doute, la carte fait foi. Pour les boîtes jamais sorties en français, noms et effets sont des traductions maison. Les notes de puissance des cartes ajoutées avec ces boîtes sont estimées automatiquement.")
    else:
        s = sub1(s, 'drawn from your 98 cards.', 'drawn from the boxes you own.')
        s = sub1(s, 'Card names, costs and effects are summarised from the French edition: when in doubt, the card is right.',
                 'Card effects are summarised: when in doubt, the card is right. Power ratings for cards from the newer boxes are estimated automatically.')
    open(APP + fn, 'w', encoding='utf-8').write(s)
    print(fn, 'ok')
