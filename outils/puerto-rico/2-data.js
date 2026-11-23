<script>
(function(){
"use strict";
/* ---------- utilitaires ---------- */
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=t=>String(t).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const LS={get(k,d){try{const v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};

/* ---------- marchandises ---------- */
const GOODS=['c','f','s','t','k'];
const GN={c:'Maïs',f:'Fruits',s:'Sucre',t:'Tabac',k:'Café'};
const GN1={c:'maïs',f:'fruits',s:'sucre',t:'tabac',k:'café'};
const PRICE={c:0,f:1,s:2,t:3,k:4};
const G={};GOODS.forEach(k=>G[k]=`<span class="g g-${k}">${GN[k]}</span>`);
const bl=k=>`<span class="bl g-${k}" title="${GN[k]}"></span>`;
const coin=n=>`<span class="coin">${n}</span>`;
const vp=n=>`<span class="vp">${n}</span>`;

/* ---------- bâtiments ----------
   row : section du plateau (1 à 3 petits, 4 grands) qui plafonne la réduction des Carrières.
   kind : prod (production), small (petit commercial), large (grand). set : base, e1, e2. */
const B=[
 {id:'sfw',fr:'Petit hangar à fruits',en:'Small Fruit Warehouse',cost:1,vp:1,slots:1,row:1,kind:'prod',good:'f',sz:'s',set:'base',ph:'Artisan',fx:'Produit jusqu\'à 1 tonneau de Fruits (1 emplacement).'},
 {id:'ssm',fr:'Petite sucrerie',en:'Small Sugar Mill',cost:2,vp:1,slots:1,row:1,kind:'prod',good:'s',sz:'s',set:'base',ph:'Artisan',fx:'Produit jusqu\'à 1 tonneau de Sucre (1 emplacement).'},
 {id:'lfw',fr:'Grand hangar à fruits',en:'Large Fruit Warehouse',cost:3,vp:2,slots:3,row:2,kind:'prod',good:'f',sz:'l',set:'base',ph:'Artisan',fx:'Produit jusqu\'à 3 tonneaux de Fruits (3 emplacements).'},
 {id:'lsm',fr:'Grande sucrerie',en:'Large Sugar Mill',cost:4,vp:2,slots:3,row:2,kind:'prod',good:'s',sz:'l',set:'base',ph:'Artisan',fx:'Produit jusqu\'à 3 tonneaux de Sucre (3 emplacements).'},
 {id:'tob',fr:'Séchoir à tabac',en:'Tobacco Storage',cost:5,vp:3,slots:3,row:3,kind:'prod',good:'t',sz:'l',set:'base',ph:'Artisan',fx:'Produit jusqu\'à 3 tonneaux de Tabac (3 emplacements).'},
 {id:'cof',fr:'Torréfacteur',en:'Coffee Roaster',cost:6,vp:3,slots:2,row:3,kind:'prod',good:'k',sz:'l',set:'base',ph:'Artisan',fx:'Produit jusqu\'à 2 tonneaux de Café (2 emplacements).'},

 {id:'smk',fr:'Petit marché',en:'Small Market',cost:1,vp:1,slots:1,row:1,kind:'small',set:'base',ph:'Négociant',fx:'Quand tu vends à la Maison de commerce : +1 pièce.'},
 {id:'byd',fr:'Chantier',en:'Builders Yard',cost:2,vp:1,slots:1,row:1,kind:'small',set:'base',ph:'Planteur',fx:'Phase Planteur : tu peux prendre une Carrière au lieu d\'une plantation.'},
 {id:'hac',fr:'Hacienda',en:'Hacienda',cost:2,vp:1,slots:1,row:1,kind:'small',set:'base',ph:'Planteur',fx:'Phase Planteur : avant ton action normale, prends en plus la plantation du dessus d\'une pile face cachée et pose-la aussitôt.'},
 {id:'swh',fr:'Petit entrepôt',en:'Small Warehouse',cost:3,vp:1,slots:1,row:1,kind:'small',set:'base',ph:'Capitaine',fx:'Fin de la phase Capitaine : garde tous les tonneaux d\'1 type, en plus du tonneau que tout le monde garde.'},
 {id:'hos',fr:'Hôpital',en:'Hospital',cost:4,vp:2,slots:1,row:2,kind:'small',set:'base',ph:'Planteur',fx:'Phase Planteur : quand tu poses une plantation ou une Carrière, prends 1 ouvrier de la réserve et pose-le dessus.'},
 {id:'off',fr:'Bureau',en:'Office',cost:5,vp:2,slots:1,row:2,kind:'small',set:'base',ph:'Négociant',fx:'Tu peux vendre un type de marchandise déjà présent dans la Maison de commerce (toujours 1 tonneau, et pas si elle est pleine).'},
 {id:'lmk',fr:'Grand marché',en:'Large Market',cost:5,vp:2,slots:1,row:2,kind:'small',set:'base',ph:'Négociant',fx:'Quand tu vends à la Maison de commerce : +2 pièces (+3 avec un Petit marché occupé).'},
 {id:'lwh',fr:'Grand entrepôt',en:'Large Warehouse',cost:6,vp:2,slots:1,row:2,kind:'small',set:'base',ph:'Capitaine',fx:'Fin de la phase Capitaine : garde tous les tonneaux de 2 types (3 types avec un Petit entrepôt occupé), plus le tonneau habituel.'},
 {id:'fac',fr:'Usine',en:'Factory',cost:7,vp:3,slots:1,row:3,kind:'small',set:'base',ph:'Artisan',fx:'Phase Artisan : pièces selon le nombre de types produits : 2 types → 1, 3 → 2, 4 → 3, 5 → 5.'},
 {id:'sch',fr:'École',en:'School',cost:8,vp:3,slots:1,row:3,kind:'small',set:'base',ph:'Bâtisseur',fx:'Phase Bâtisseur : quand tu construis, prends 1 ouvrier de la réserve et pose-le sur le nouveau bâtiment.'},
 {id:'har',fr:'Port',en:'Harbor',cost:8,vp:3,slots:1,row:3,kind:'small',set:'base',ph:'Capitaine',fx:'Phase Capitaine : +1 PV à chaque fois que tu charges des marchandises.'},
 {id:'wha',fr:'Quai',en:'Wharf',cost:9,vp:3,slots:1,row:3,kind:'small',set:'base',ph:'Capitaine',fx:'Une fois par phase Capitaine : charge tous les tonneaux d\'1 type sur un navire affrété (sans limite), 1 PV par tonneau.'},

 {id:'cth',fr:'Hôtel de ville',en:'City Hall',cost:10,vp:4,slots:1,row:4,kind:'large',set:'base',ph:'Fin de partie',fx:'+1 PV par bâtiment commercial (petit ou grand, occupé ou non), Hôtel de ville compris.'},
 {id:'cus',fr:'Douane',en:'Customs House',cost:10,vp:4,slots:1,row:4,kind:'large',set:'base',ph:'Fin de partie',fx:'+1 PV pour 4 PV en jetons gagnés pendant la partie.'},
 {id:'frt',fr:'Forteresse',en:'Fortress',cost:10,vp:4,slots:1,row:4,kind:'large',set:'base',ph:'Fin de partie',fx:'+1 PV pour 3 ouvriers sur ton plateau Île (Portrait compris).'},
 {id:'fst',fr:'Caserne de pompiers',en:'Fire Station',cost:10,vp:4,slots:1,row:4,kind:'large',set:'base',ph:'Fin de partie',fx:'+1 PV par petit bâtiment de production, +2 PV par grand, occupés ou non.'},
 {id:'res',fr:'Résidence',en:'Residence',cost:10,vp:4,slots:1,row:4,kind:'large',set:'base',ph:'Fin de partie',fx:'PV selon les cases Campagne remplies : 1 à 9 → 4 PV, 10 → 5, 11 → 6, 12 → 7.'},

 {id:'can',fr:'Canal',en:'Canal',cost:1,vp:1,slots:1,row:1,kind:'small',set:'e1',ph:'Artisan',fx:'Si tu produis au moins 1 Fruit avec ton Grand hangar à fruits : +1 Fruit. Idem pour le Sucre avec la Grande sucrerie.'},
 {id:'bmk',fr:'Marché noir',en:'Black Market',cost:2,vp:1,slots:1,row:1,kind:'small',set:'e1',ph:'Bâtisseur',fx:'S\'il te manque de l\'argent : rends 1 ouvrier, 1 tonneau et/ou 1 PV, chacun vaut 1 pièce (3 au plus). Il ne doit plus te rester de pièce.'},
 {id:'lum',fr:'Scierie',en:'Lumberyard',cost:2,vp:1,slots:1,row:1,kind:'small',set:'e1',ph:'Planteur · Bâtisseur',fx:'Pose une plantation face cachée : c\'est une Forêt. En phase Bâtisseur, −1 pièce par paire de Forêts.'},
 {id:'sto',fr:'Remise',en:'Storehouse',cost:3,vp:1,slots:1,row:1,kind:'small',set:'e1',ph:'Capitaine',fx:'Fin de la phase Capitaine : garde jusqu\'à 3 tonneaux supplémentaires, de n\'importe quels types.'},
 {id:'boh',fr:'Bohío',en:'Bohio',cost:4,vp:2,slots:2,row:2,kind:'small',set:'e1',ph:'Recruteur',fx:'Jusqu\'à 2 ouvriers « invités », à déplacer pendant n\'importe quelle autre phase vers une tuile dont tu utilises aussitôt l\'effet.'},
 {id:'tpo',fr:'Comptoir',en:'Trading Post',cost:5,vp:2,slots:1,row:2,kind:'small',set:'e1',ph:'Négociant',fx:'Tu peux vendre à ton propre Comptoir, même un type déjà présent ou si la Maison est pleine. Pas de bonus de marché, mais le privilège du Négociant compte.'},
 {id:'chu',fr:'Église',en:'Church',cost:5,vp:2,slots:1,row:2,kind:'small',set:'e1',ph:'Bâtisseur',fx:'Quand tu construis : +1 PV pour un bâtiment de la 2e ou 3e section, +2 PV pour un grand bâtiment.'},
 {id:'swf',fr:'Petit quai',en:'Small Wharf',cost:6,vp:2,slots:1,row:2,kind:'small',set:'e1',ph:'Capitaine',fx:'Une fois par phase : charge autant de tonneaux que tu veux, de tous types, sur un navire affrété. 1 PV pour 2 tonneaux.'},
 {id:'lig',fr:'Phare',en:'Lighthouse',cost:7,vp:3,slots:1,row:3,kind:'small',set:'e1',ph:'Capitaine',fx:'+1 pièce à chaque chargement. Si tu es le Capitaine, +1 pièce au début de la phase.'},
 {id:'pub',fr:'Maison d\'édition',en:'Publishing House',cost:8,vp:3,slots:1,row:3,kind:'small',set:'e1',ph:'Tous',fx:'Le rôle que tu choisis te donne son privilège en double.'},
 {id:'dis',fr:'Distillerie',en:'Distillery',cost:8,vp:3,slots:1,row:3,kind:'small',set:'e1',ph:'Artisan',fx:'Pièces = nombre de tonneaux de ton type le plus produit (hors Maïs) − 1.'},
 {id:'asm',fr:'Salle des fêtes',en:'Assembly Hall',cost:9,vp:3,slots:1,row:3,kind:'small',set:'e1',ph:'Capitaine',fx:'Au début de la phase Capitaine : 1 PV par paire de tonneaux du même type.'},
 {id:'cat',fr:'Cathédrale',en:'Cathedral',cost:10,vp:4,slots:1,row:4,kind:'large',set:'e1',ph:'Fin de partie',fx:'Séries de 3 tuiles Campagne identiques : 1 série → 1 PV, 2 → 3, 3 → 6, 4 → 10.'},
 {id:'mon',fr:'Monument',en:'Monument',cost:10,vp:8,slots:0,row:4,kind:'large',set:'e1',ph:'Fin de partie',fx:'Vaut 8 PV. Aucune fonction, aucun ouvrier dessus.'},

 {id:'zon',fr:'Bureau du cadastre',en:'Zoning Office',cost:2,vp:1,slots:1,row:1,kind:'small',set:'e2',ph:'Négociant',fx:'Ouvrier : paie 1 pièce pour une plantation face cachée. Citoyen : vends une de tes plantations pour 1 pièce.'},
 {id:'cha',fr:'Chapelle',en:'Chapel',cost:3,vp:1,slots:1,row:1,kind:'small',set:'e2',ph:'Artisan',fx:'Au début de la phase Artisan. Ouvrier : +1 pièce. Citoyen : +1 PV.'},
 {id:'par',fr:'Office des parcs',en:'Park Authority',cost:4,vp:2,slots:1,row:2,kind:'small',set:'e2',ph:'Planteur',fx:'Fin de la phase Planteur. Ouvrier : défausse 1 plantation ou Forêt. Citoyen : +2 PV si tu as plus de cases Campagne vides que chacun des autres.'},
 {id:'not',fr:'Notaire',en:'Notary',cost:5,vp:2,slots:1,row:2,kind:'small',set:'e2',ph:'Bâtisseur',fx:'Ouvrier : −1 pièce sur un petit bâtiment. Citoyen : −2 pièces sur un grand bâtiment.'},
 {id:'pen',fr:'Caisse de retraite',en:'Pension Office',cost:6,vp:2,slots:1,row:2,kind:'small',set:'e2',ph:'Capitaine',fx:'Au début de la phase Capitaine : pour chaque citoyen de ton Île, rends 1 tonneau (types tous différents) contre 1 PV.'},
 {id:'vil',fr:'Villa',en:'Villa',cost:7,vp:3,slots:1,row:3,kind:'small',set:'e2',ph:'Recruteur',fx:'Au début de la phase Recruteur : prends 1 citoyen de la réserve (sinon 1 ouvrier de la réserve).'},
 {id:'tai',fr:'Atelier de tailleur',en:'Tailor Shop',cost:8,vp:3,slots:1,row:3,kind:'small',set:'e2',ph:'Artisan',fx:'Phase Artisan : +1 pièce par citoyen sur ton Île. Compte comme grand bâtiment de production pour la Caserne.'},
 {id:'tsq',fr:'Grand-place',en:'Town Square',cost:10,vp:4,slots:1,row:4,kind:'large',set:'e2',ph:'Fin de partie',fx:'+1 PV par citoyen sur ton Île (chaque citoyen vaut donc 2 PV).'}
];
const BI={};B.forEach(b=>BI[b.id]=b);
const SETN={base:'Jeu de base',e1:'Extension I',e2:'Extension II'};
const ROWCAP=r=>r; // une Carrière par section : 1, 2, 3, puis 4 pour les grands bâtiments
const bn=id=>`<b>${BI[id].fr}</b>`;
const KC={prod:'var(--fruit)',small:'var(--accent)',large:'var(--terra)'};
