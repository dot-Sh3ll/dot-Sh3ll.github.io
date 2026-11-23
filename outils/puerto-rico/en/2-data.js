<script>
(function(){
"use strict";
/* ---------- utilities ---------- */
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=t=>String(t).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const LS={get(k,d){try{const v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};

/* ---------- goods ---------- */
const GOODS=['c','f','s','t','k'];
const GN={c:'Corn',f:'Fruit',s:'Sugar',t:'Tobacco',k:'Coffee'};
const GN1={c:'corn',f:'fruit',s:'sugar',t:'tobacco',k:'coffee'};
const PRICE={c:0,f:1,s:2,t:3,k:4};
const G={};GOODS.forEach(k=>G[k]=`<span class="g g-${k}">${GN[k]}</span>`);
const bl=k=>`<span class="bl g-${k}" title="${GN[k]}"></span>`;
const coin=n=>`<span class="coin">${n}</span>`;
const vp=n=>`<span class="vp">${n}</span>`;

/* ---------- buildings ----------
   row: board section (1 to 3 small, 4 large), which caps the Quarry discount.
   kind: prod (production), small, large. set: base, e1, e2. The display name is in "fr" (shared field name with the French page). */
const B=[
 {id:'sfw',fr:'Small Fruit Warehouse',en:'',cost:1,vp:1,slots:1,row:1,kind:'prod',good:'f',sz:'s',set:'base',ph:'Craftsman',fx:'Produces up to 1 barrel of Fruit (1 semicircle).'},
 {id:'ssm',fr:'Small Sugar Mill',en:'',cost:2,vp:1,slots:1,row:1,kind:'prod',good:'s',sz:'s',set:'base',ph:'Craftsman',fx:'Produces up to 1 barrel of Sugar (1 semicircle).'},
 {id:'lfw',fr:'Large Fruit Warehouse',en:'',cost:3,vp:2,slots:3,row:2,kind:'prod',good:'f',sz:'l',set:'base',ph:'Craftsman',fx:'Produces up to 3 barrels of Fruit (3 semicircles).'},
 {id:'lsm',fr:'Large Sugar Mill',en:'',cost:4,vp:2,slots:3,row:2,kind:'prod',good:'s',sz:'l',set:'base',ph:'Craftsman',fx:'Produces up to 3 barrels of Sugar (3 semicircles).'},
 {id:'tob',fr:'Tobacco Storage',en:'',cost:5,vp:3,slots:3,row:3,kind:'prod',good:'t',sz:'l',set:'base',ph:'Craftsman',fx:'Produces up to 3 barrels of Tobacco (3 semicircles).'},
 {id:'cof',fr:'Coffee Roaster',en:'',cost:6,vp:3,slots:2,row:3,kind:'prod',good:'k',sz:'l',set:'base',ph:'Craftsman',fx:'Produces up to 2 barrels of Coffee (2 semicircles).'},

 {id:'smk',fr:'Small Market',en:'',cost:1,vp:1,slots:1,row:1,kind:'small',set:'base',ph:'Trader',fx:'When you sell to the Trading House: +1 coin.'},
 {id:'byd',fr:'Builders Yard',en:'',cost:2,vp:1,slots:1,row:1,kind:'small',set:'base',ph:'Planter',fx:'Planting phase: you may take a Quarry instead of an Estate.'},
 {id:'hac',fr:'Hacienda',en:'',cost:2,vp:1,slots:1,row:1,kind:'small',set:'base',ph:'Planter',fx:'Planting phase: before your normal action, also take the top Estate of a face-down stack and place it at once.'},
 {id:'swh',fr:'Small Warehouse',en:'',cost:3,vp:1,slots:1,row:1,kind:'small',set:'base',ph:'Captain',fx:'End of the Shipment phase: keep all barrels of 1 type, on top of the barrel everyone keeps.'},
 {id:'hos',fr:'Hospital',en:'',cost:4,vp:2,slots:1,row:2,kind:'small',set:'base',ph:'Planter',fx:'Planting phase: when you place an Estate or a Quarry, take 1 worker from the supply and place it on that tile.'},
 {id:'off',fr:'Office',en:'',cost:5,vp:2,slots:1,row:2,kind:'small',set:'base',ph:'Trader',fx:'You may sell a type of Good already in the Trading House (still 1 barrel, and not if it is full).'},
 {id:'lmk',fr:'Large Market',en:'',cost:5,vp:2,slots:1,row:2,kind:'small',set:'base',ph:'Trader',fx:'When you sell to the Trading House: +2 coins (+3 with an occupied Small Market).'},
 {id:'lwh',fr:'Large Warehouse',en:'',cost:6,vp:2,slots:1,row:2,kind:'small',set:'base',ph:'Captain',fx:'End of the Shipment phase: keep all barrels of 2 types (3 types with an occupied Small Warehouse), plus the usual barrel.'},
 {id:'fac',fr:'Factory',en:'',cost:7,vp:3,slots:1,row:3,kind:'small',set:'base',ph:'Craftsman',fx:'Production phase: coins by number of types produced: 2 types → 1, 3 → 2, 4 → 3, 5 → 5.'},
 {id:'sch',fr:'School',en:'',cost:8,vp:3,slots:1,row:3,kind:'small',set:'base',ph:'Builder',fx:'Build phase: when you build, take 1 worker from the supply and place it on the new Building.'},
 {id:'har',fr:'Harbor',en:'',cost:8,vp:3,slots:1,row:3,kind:'small',set:'base',ph:'Captain',fx:'Shipment phase: +1 VP each time you load Goods.'},
 {id:'wha',fr:'Wharf',en:'',cost:9,vp:3,slots:1,row:3,kind:'small',set:'base',ph:'Captain',fx:'Once per Shipment phase: load all barrels of 1 type onto a Chartered Ship (no limit), 1 VP per barrel.'},

 {id:'cth',fr:'City Hall',en:'',cost:10,vp:4,slots:1,row:4,kind:'large',set:'base',ph:'End of game',fx:'+1 VP per Commercial Building (small or large, occupied or not), City Hall included.'},
 {id:'cus',fr:'Customs House',en:'',cost:10,vp:4,slots:1,row:4,kind:'large',set:'base',ph:'End of game',fx:'+1 VP for every 4 VP in chips earned during the game.'},
 {id:'frt',fr:'Fortress',en:'',cost:10,vp:4,slots:1,row:4,kind:'large',set:'base',ph:'End of game',fx:'+1 VP for every 3 workers on your Island board (Portrait included).'},
 {id:'fst',fr:'Fire Station',en:'',cost:10,vp:4,slots:1,row:4,kind:'large',set:'base',ph:'End of game',fx:'+1 VP per Small Production Building, +2 VP per Large one, occupied or not.'},
 {id:'res',fr:'Residence',en:'',cost:10,vp:4,slots:1,row:4,kind:'large',set:'base',ph:'End of game',fx:'VP for filled Countryside spaces: 1 to 9 → 4 VP, 10 → 5, 11 → 6, 12 → 7.'},

 {id:'can',fr:'Canal',en:'',cost:1,vp:1,slots:1,row:1,kind:'small',set:'e1',ph:'Craftsman',fx:'If you produce at least 1 Fruit with your Large Fruit Warehouse: +1 Fruit. Same for Sugar with the Large Sugar Mill.'},
 {id:'bmk',fr:'Black Market',en:'',cost:2,vp:1,slots:1,row:1,kind:'small',set:'e1',ph:'Builder',fx:'If you are short of money: return 1 worker, 1 barrel and/or 1 VP, each worth 1 coin (3 at most). You must have no coins left.'},
 {id:'lum',fr:'Lumberyard',en:'',cost:2,vp:1,slots:1,row:1,kind:'small',set:'e1',ph:'Planter · Builder',fx:'Place an Estate face down: it is a Forest. Build phase: −1 coin for every 2 Forests.'},
 {id:'sto',fr:'Storehouse',en:'',cost:3,vp:1,slots:1,row:1,kind:'small',set:'e1',ph:'Captain',fx:'End of the Shipment phase: keep up to 3 additional barrels, of any types.'},
 {id:'boh',fr:'Bohio',en:'',cost:4,vp:2,slots:2,row:2,kind:'small',set:'e1',ph:'Recruiter',fx:'Up to 2 "guest" workers, moved during any other phase to a tile whose function you use at once.'},
 {id:'tpo',fr:'Trading Post',en:'',cost:5,vp:2,slots:1,row:2,kind:'small',set:'e1',ph:'Trader',fx:'You may sell to your own Trading Post, even a type already present or when the Trading House is full. No Market bonus, but the Trader advantage applies.'},
 {id:'chu',fr:'Church',en:'',cost:5,vp:2,slots:1,row:2,kind:'small',set:'e1',ph:'Builder',fx:'When you build: +1 VP for a Building of the 2nd or 3rd section, +2 VP for a Large Building.'},
 {id:'swf',fr:'Small Wharf',en:'',cost:6,vp:2,slots:1,row:2,kind:'small',set:'e1',ph:'Captain',fx:'Once per phase: load as many barrels as you like, of any types, onto a Chartered Ship. 1 VP per 2 barrels.'},
 {id:'lig',fr:'Lighthouse',en:'',cost:7,vp:3,slots:1,row:3,kind:'small',set:'e1',ph:'Captain',fx:'+1 coin each time you load. If you are the Captain, +1 coin at the start of the phase.'},
 {id:'pub',fr:'Publishing House',en:'',cost:8,vp:3,slots:1,row:3,kind:'small',set:'e1',ph:'All phases',fx:'The role you choose gives you its advantage twice.'},
 {id:'dis',fr:'Distillery',en:'',cost:8,vp:3,slots:1,row:3,kind:'small',set:'e1',ph:'Craftsman',fx:'Coins = barrels of your most-produced type (except Corn) − 1.'},
 {id:'asm',fr:'Assembly Hall',en:'',cost:9,vp:3,slots:1,row:3,kind:'small',set:'e1',ph:'Captain',fx:'At the start of the Shipment phase: 1 VP per pair of barrels of the same type.'},
 {id:'cat',fr:'Cathedral',en:'',cost:10,vp:4,slots:1,row:4,kind:'large',set:'e1',ph:'End of game',fx:'Sets of 3 identical Countryside tiles: 1 set → 1 VP, 2 → 3, 3 → 6, 4 → 10.'},
 {id:'mon',fr:'Monument',en:'',cost:10,vp:8,slots:0,row:4,kind:'large',set:'e1',ph:'End of game',fx:'Worth 8 VP. No function, no worker on it.'},

 {id:'zon',fr:'Zoning Office',en:'',cost:2,vp:1,slots:1,row:1,kind:'small',set:'e2',ph:'Trader',fx:'Worker: pay 1 coin for a face-down Estate. Citizen: sell one of your Estates for 1 coin.'},
 {id:'cha',fr:'Chapel',en:'',cost:3,vp:1,slots:1,row:1,kind:'small',set:'e2',ph:'Craftsman',fx:'At the start of the Production phase. Worker: +1 coin. Citizen: +1 VP.'},
 {id:'par',fr:'Park Authority',en:'',cost:4,vp:2,slots:1,row:2,kind:'small',set:'e2',ph:'Planter',fx:'End of the Planting phase. Worker: discard 1 Estate or Forest. Citizen: +2 VP if you have more empty Countryside spaces than every other player.'},
 {id:'not',fr:'Notary',en:'',cost:5,vp:2,slots:1,row:2,kind:'small',set:'e2',ph:'Builder',fx:'Worker: −1 coin on a Small Building. Citizen: −2 coins on a Large Building.'},
 {id:'pen',fr:'Pension Office',en:'',cost:6,vp:2,slots:1,row:2,kind:'small',set:'e2',ph:'Captain',fx:'At the start of the Shipment phase: for each citizen on your Island, return 1 barrel (all different types) for 1 VP.'},
 {id:'vil',fr:'Villa',en:'',cost:7,vp:3,slots:1,row:3,kind:'small',set:'e2',ph:'Recruiter',fx:'At the start of the Recruitment phase: take 1 citizen from the supply (otherwise 1 worker from the supply).'},
 {id:'tai',fr:'Tailor Shop',en:'',cost:8,vp:3,slots:1,row:3,kind:'small',set:'e2',ph:'Craftsman',fx:'Production phase: +1 coin per citizen on your Island. Counts as a Large Production Building for the Fire Station.'},
 {id:'tsq',fr:'Town Square',en:'',cost:10,vp:4,slots:1,row:4,kind:'large',set:'e2',ph:'End of game',fx:'+1 VP per citizen on your Island (each citizen is then worth 2 VP).'}
];
/* board order (section by section, line by line), then Expansion I by cost */
const BOARDORD=['sfw','smk','hac','byd','ssm','swh','zon','cha','lfw','hos','off','lmk','lwh','lsm','par','not','pen','tob','fac','sch','har','cof','wha','vil','tai','fst','res','frt','cus','cth','tsq','can','bmk','lum','sto','boh','chu','tpo','swf','lig','dis','pub','asm','cat','mon'];
const BI={};B.forEach(b=>BI[b.id]=b);
const SETN={base:'Base game',e1:'Expansion I',e2:'Expansion II'};
const ROWCAP=r=>r;
const bn=id=>`<b>${BI[id].fr}</b>`;
const KC={prod:'var(--fruit)',small:'var(--accent)',large:'var(--terra)'};
