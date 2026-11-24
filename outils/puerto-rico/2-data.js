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
   row : rangée du plateau (1 à 3 petits, 4 grands) qui plafonne la réduction des Carrières.
   kind : prod (production), small (petit commercial), large (grand). set : base, e1, e2. */
const B=[
 {id:'sfw',fr:'Petite Exploitation de Fruits',en:'Small Fruit Warehouse',cost:1,vp:1,slots:1,row:1,kind:'prod',good:'f',sz:'s',set:'base',ph:'Producteur',fx:'Produit jusqu\'à 1 baril de Fruits (1 demi-cercle).'},
 {id:'ssm',fr:'Petite Raffinerie de Sucre',en:'Small Sugar Mill',cost:2,vp:1,slots:1,row:1,kind:'prod',good:'s',sz:'s',set:'base',ph:'Producteur',fx:'Produit jusqu\'à 1 baril de Sucre (1 demi-cercle).'},
 {id:'lfw',fr:'Grande Exploitation de Fruits',en:'Large Fruit Warehouse',cost:3,vp:2,slots:3,row:2,kind:'prod',good:'f',sz:'l',set:'base',ph:'Producteur',fx:'Produit jusqu\'à 3 barils de Fruits (3 demi-cercles).'},
 {id:'lsm',fr:'Grande Raffinerie de Sucre',en:'Large Sugar Mill',cost:4,vp:2,slots:3,row:2,kind:'prod',good:'s',sz:'l',set:'base',ph:'Producteur',fx:'Produit jusqu\'à 3 barils de Sucre (3 demi-cercles).'},
 {id:'tob',fr:'Séchoir à Tabac',en:'Tobacco Storage',cost:5,vp:3,slots:3,row:3,kind:'prod',good:'t',sz:'l',set:'base',ph:'Producteur',fx:'Produit jusqu\'à 3 barils de Tabac (3 demi-cercles).'},
 {id:'cof',fr:'Brûlerie de Café',en:'Coffee Roaster',cost:6,vp:3,slots:2,row:3,kind:'prod',good:'k',sz:'l',set:'base',ph:'Producteur',fx:'Produit jusqu\'à 2 barils de Café (2 demi-cercles).'},

 {id:'smk',fr:'Petit Marché',en:'Small Market',cost:1,vp:1,slots:1,row:1,kind:'small',set:'base',ph:'Marchand',fx:'Quand vous vendez à la Maison de Commerce : +1 Peso.'},
 {id:'byd',fr:'Dépôt de Matériaux',en:'Builders Yard',cost:2,vp:1,slots:1,row:1,kind:'small',set:'base',ph:'Paysan',fx:'Phase Paysan : vous pouvez prendre une Carrière au lieu d\'une plantation.'},
 {id:'hac',fr:'Hacienda',en:'Hacienda',cost:2,vp:1,slots:1,row:1,kind:'small',set:'base',ph:'Paysan',fx:'Phase Paysan : avant votre action normale, prenez en plus la plantation du dessus d\'une pile face cachée et posez-la aussitôt.'},
 {id:'swh',fr:'Petit Entrepôt',en:'Small Warehouse',cost:3,vp:1,slots:1,row:1,kind:'small',set:'base',ph:'Capitaine',fx:'Fin de la phase du Capitaine : gardez tous les barils d\'1 type, en plus du baril que tout le monde garde.'},
 {id:'hos',fr:'Hôpital',en:'Hospital',cost:4,vp:2,slots:1,row:2,kind:'small',set:'base',ph:'Paysan',fx:'Phase Paysan : quand vous posez une plantation ou une Carrière, prenez 1 ouvrier de la réserve et posez-le dessus (avec l\'Hacienda : sur l\'une des deux tuiles).'},
 {id:'off',fr:'Comptoir',en:'Office',cost:5,vp:2,slots:1,row:2,kind:'small',set:'base',ph:'Marchand',fx:'Vous pouvez vendre un type de marchandise déjà présent dans la Maison de Commerce (toujours 1 baril, et pas si elle est pleine).'},
 {id:'lmk',fr:'Grand Marché',en:'Large Market',cost:5,vp:2,slots:1,row:2,kind:'small',set:'base',ph:'Marchand',fx:'Quand vous vendez à la Maison de Commerce : +2 Pesos (+3 avec un Petit Marché occupé).'},
 {id:'lwh',fr:'Grand Entrepôt',en:'Large Warehouse',cost:6,vp:2,slots:1,row:2,kind:'small',set:'base',ph:'Capitaine',fx:'Fin de la phase du Capitaine : gardez tous les barils de 2 types (3 types avec un Petit Entrepôt occupé), plus le baril habituel.'},
 {id:'fac',fr:'Usine',en:'Factory',cost:7,vp:3,slots:1,row:3,kind:'small',set:'base',ph:'Producteur',fx:'Phase Producteur : Pesos selon le nombre de types produits : 2 types → 1, 3 → 2, 4 → 3, 5 → 5.'},
 {id:'sch',fr:'École',en:'School',cost:8,vp:3,slots:1,row:3,kind:'small',set:'base',ph:'Bâtisseur',fx:'Phase Bâtisseur : quand vous construisez, prenez 1 ouvrier de la réserve et posez-le sur le nouveau bâtiment.'},
 {id:'har',fr:'Port',en:'Harbor',cost:8,vp:3,slots:1,row:3,kind:'small',set:'base',ph:'Capitaine',fx:'Phase Capitaine : +1 PV à chaque fois que vous chargez des marchandises.'},
 {id:'wha',fr:'Chantier Naval',en:'Wharf',cost:9,vp:3,slots:1,row:3,kind:'small',set:'base',ph:'Capitaine',fx:'Une fois par phase du Capitaine : chargez tous les barils d\'1 type sur un navire privé (sans limite), 1 PV par baril.'},

 {id:'cth',fr:'Palais du Gouverneur',en:'City Hall',cost:10,vp:4,slots:1,row:4,kind:'large',set:'base',ph:'Fin de partie',fx:'+1 PV par bâtiment beige (petit ou grand, occupé ou non), Palais du Gouverneur compris.'},
 {id:'cus',fr:'Douane',en:'Customs House',cost:10,vp:4,slots:1,row:4,kind:'large',set:'base',ph:'Fin de partie',fx:'+1 PV pour 4 PV en jetons gagnés pendant la partie.'},
 {id:'frt',fr:'Forteresse',en:'Fortress',cost:10,vp:4,slots:1,row:4,kind:'large',set:'base',ph:'Fin de partie',fx:'+1 PV pour 3 ouvriers sur votre plateau Domaine (Portrait compris).'},
 {id:'fst',fr:'Caserne de Pompiers',en:'Fire Station',cost:10,vp:4,slots:1,row:4,kind:'large',set:'base',ph:'Fin de partie',fx:'+1 PV par petit bâtiment industriel, +2 PV par grand, occupés ou non.'},
 {id:'res',fr:'Résidence',en:'Residence',cost:10,vp:4,slots:1,row:4,kind:'large',set:'base',ph:'Fin de partie',fx:'PV selon les cases Parcelle remplies : 1 à 9 → 4 PV, 10 → 5, 11 → 6, 12 → 7.'},

 {id:'can',fr:'Canal',en:'Canal',cost:1,vp:1,slots:1,row:1,kind:'small',set:'e1',ph:'Producteur',fx:'Si vous produisez au moins 1 Fruit avec votre Grande Exploitation de Fruits : +1 Fruit. Idem pour le Sucre avec la Grande Raffinerie de Sucre.'},
 {id:'bmk',fr:'Marché Noir',en:'Black Market',cost:2,vp:1,slots:1,row:1,kind:'small',set:'e1',ph:'Bâtisseur',fx:'S\'il vous manque de l\'argent : rendez 1 ouvrier, 1 baril et/ou 1 PV, chacun vaut 1 Peso (3 au plus). Il ne doit plus vous rester de Peso.'},
 {id:'lum',fr:'Scierie',en:'Lumberyard',cost:2,vp:1,slots:1,row:1,kind:'small',set:'e1',ph:'Paysan · Bâtisseur',fx:'Posez une plantation face cachée : c\'est une Forêt. En phase du Bâtisseur, −1 Peso par paire de Forêts.'},
 {id:'sto',fr:'Hangar',en:'Storehouse',cost:3,vp:1,slots:1,row:1,kind:'small',set:'e1',ph:'Capitaine',fx:'Fin de la phase du Capitaine : gardez jusqu\'à 3 barils supplémentaires, de n\'importe quels types.'},
 {id:'boh',fr:'Bohio',en:'Bohio',cost:4,vp:2,slots:2,row:2,kind:'small',set:'e1',ph:'Recruteur',fx:'Jusqu\'à 2 ouvriers « invités », à déplacer pendant n\'importe quelle autre phase vers une tuile dont vous utilisez aussitôt l\'effet.'},
 {id:'tpo',fr:'Commerce',en:'Trading Post',cost:5,vp:2,slots:1,row:2,kind:'small',set:'e1',ph:'Marchand',fx:'Vous pouvez vendre à votre propre Commerce, même un type déjà présent ou si la Maison est pleine. Pas de bonus de marché, mais le privilège du Marchand compte.'},
 {id:'chu',fr:'Église',en:'Church',cost:5,vp:2,slots:1,row:2,kind:'small',set:'e1',ph:'Bâtisseur',fx:'Quand vous construisez : +1 PV pour un bâtiment de la 2e ou 3e rangée, +2 PV pour un grand bâtiment.'},
 {id:'swf',fr:'Petit Chantier Naval',en:'Small Wharf',cost:6,vp:2,slots:1,row:2,kind:'small',set:'e1',ph:'Capitaine',fx:'Une fois par phase : chargez autant de barils que vous voulez, de tous types, sur un navire privé. 1 PV pour 2 barils.'},
 {id:'lig',fr:'Phare',en:'Lighthouse',cost:7,vp:3,slots:1,row:3,kind:'small',set:'e1',ph:'Capitaine',fx:'+1 Peso à chaque chargement. Si vous êtes le Capitaine, +1 Peso au début de la phase.'},
 {id:'pub',fr:'Maison d\'Édition',en:'Publishing House',cost:8,vp:3,slots:1,row:3,kind:'small',set:'e1',ph:'Tous',fx:'Le personnage que vous choisissez vous donne son privilège en double.'},
 {id:'dis',fr:'Atelier',en:'Distillery',cost:8,vp:3,slots:1,row:3,kind:'small',set:'e1',ph:'Producteur',fx:'Pesos = nombre de barils de votre type le plus produit (hors Maïs) − 1.'},
 {id:'asm',fr:'Syndicat',en:'Assembly Hall',cost:9,vp:3,slots:1,row:3,kind:'small',set:'e1',ph:'Capitaine',fx:'Au début de la phase du Capitaine : 1 PV par paire de barils du même type.'},
 {id:'cat',fr:'Cathédrale',en:'Cathedral',cost:10,vp:4,slots:1,row:4,kind:'large',set:'e1',ph:'Fin de partie',fx:'Séries de 3 tuiles Terrain identiques : 1 série → 1 PV, 2 → 3, 3 → 6, 4 → 10.'},
 {id:'mon',fr:'Statue',en:'Statue',cost:10,vp:8,slots:0,row:4,kind:'large',set:'e1',ph:'Fin de partie',fx:'Vaut 8 PV. Aucune fonction, aucun ouvrier dessus.'},

 {id:'zon',fr:'Cadastre',en:'Zoning Office',cost:2,vp:1,slots:1,row:1,kind:'small',set:'e2',ph:'Marchand',fx:'Ouvrier : payez 1 Peso pour une plantation face cachée. Bourgeois : vendez une de vos plantations pour 1 Peso.'},
 {id:'cha',fr:'Chapelle',en:'Chapel',cost:3,vp:1,slots:1,row:1,kind:'small',set:'e2',ph:'Producteur',fx:'Au début de la phase du Producteur. Ouvrier : +1 Peso. Bourgeois : +1 PV.'},
 {id:'par',fr:'Bureau des Terres',en:'Park Authority',cost:4,vp:2,slots:1,row:2,kind:'small',set:'e2',ph:'Paysan',fx:'Fin de la phase du Paysan. Ouvrier : défaussez 1 plantation ou Forêt. Bourgeois : +2 PV si vous avez plus de cases Parcelle vides que chacun des autres.'},
 {id:'not',fr:'Cabinet d\'Architecte',en:'Notary',cost:5,vp:2,slots:1,row:2,kind:'small',set:'e2',ph:'Bâtisseur',fx:'Ouvrier : −1 Peso sur un petit bâtiment. Bourgeois : −2 Pesos sur un grand bâtiment.'},
 {id:'pen',fr:'Office des Exportations',en:'Pension Office',cost:6,vp:2,slots:1,row:2,kind:'small',set:'e2',ph:'Capitaine',fx:'Au début de la phase du Capitaine : pour chaque bourgeois de votre domaine, rendez 1 baril (types tous différents) contre 1 PV.'},
 {id:'vil',fr:'Villa',en:'Villa',cost:7,vp:3,slots:1,row:3,kind:'small',set:'e2',ph:'Recruteur',fx:'Au début de la phase du Recruteur : prenez 1 bourgeois de la réserve (sinon 1 ouvrier de la réserve).'},
 {id:'tai',fr:'Atelier de Couture',en:'Tailor Shop',cost:8,vp:3,slots:1,row:3,kind:'small',set:'e2',ph:'Producteur',fx:'Phase Producteur : +1 Peso par bourgeois sur votre domaine. Compte comme grand bâtiment industriel pour la Caserne.'},
 {id:'tsq',fr:'Place Centrale',en:'Town Square',cost:10,vp:4,slots:1,row:4,kind:'large',set:'e2',ph:'Fin de partie',fx:'+1 PV par bourgeois sur votre domaine (chaque bourgeois vaut donc 2 PV).'}
];
/* ordre du plateau de jeu (rangée par rangée, ligne par ligne), puis l'extension I par coût */
const BOARDORD=['sfw','smk','hac','byd','ssm','swh','zon','cha','lfw','hos','off','lmk','lwh','lsm','par','not','pen','tob','fac','sch','har','cof','wha','vil','tai','fst','res','frt','cus','cth','tsq','can','bmk','lum','sto','boh','chu','tpo','swf','lig','dis','pub','asm','cat','mon'];
const BI={};B.forEach(b=>BI[b.id]=b);
const SETN={base:'Jeu de base',e1:'Extension I',e2:'Extension II'};
const ROWCAP=r=>r; // une Carrière par rangée : 1, 2, 3, puis 4 pour les grands bâtiments
const bn=id=>`<b>${BI[id].fr}</b>`;
const KC={prod:'var(--fruit)',small:'var(--accent)',large:'var(--terra)'};
