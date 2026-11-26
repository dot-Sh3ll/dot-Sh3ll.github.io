const COL={r:'rouge',g:'vert',b:'bleu',w:'blanc',gold:'or',black:'noir'};
const BASIC=['r','g','b','w'];
const rnd=n=>Math.floor(Math.random()*n);
const shuffle=a=>{for(let i=a.length-1;i>0;i--){const j=rnd(i+1);[a[i],a[j]]=[a[j],a[i]]}return a};
let UID=1;

/* ---------- Cartes ---------- */
const C={
 marche:{n:'Marche',c:'g',bt:'Mouvement 2',st:'Mouvement 4',base:[{k:'move',n:2}],strong:[{k:'move',n:4}]},
 endurance:{n:'Endurance',c:'b',bt:'Mouvement 2',st:'Mouvement 4',base:[{k:'move',n:2}],strong:[{k:'move',n:4}]},
 rapidite:{n:'Rapidité',c:'w',bt:'Mouvement 2',st:'Attaque à distance 3',base:[{k:'move',n:2}],strong:[{k:'ranged',n:3}]},
 rage:{n:'Rage',c:'r',bt:'Attaque 2 ou Parade 2',st:'Attaque 4',base:[{k:'atk',n:2},{k:'block',n:2}],strong:[{k:'atk',n:4}]},
 determination:{n:'Détermination',c:'b',bt:'Attaque 2 ou Parade 2',st:'Parade 5',base:[{k:'atk',n:2},{k:'block',n:2}],strong:[{k:'block',n:5}]},
 promesse:{n:'Promesse',c:'w',bt:'Influence 2',st:'Influence 4',base:[{k:'inf',n:2}],strong:[{k:'inf',n:4}]},
 menace:{n:'Menace',c:'r',bt:'Influence 2',st:'Influence 5, Réputation −1',base:[{k:'inf',n:2}],strong:[{k:'inf',n:5,rep:-1}]},
 tranquillite:{n:'Tranquillité',c:'g',bt:'Soin 1 ou piochez 1 carte',st:'Soin 2 ou piochez 2 cartes',base:[{k:'heal',n:1},{k:'draw',n:1}],strong:[{k:'heal',n:2},{k:'draw',n:2}]},
 cristallisation:{n:'Cristallisation',c:'b',bt:'Payez 1 mana : gagnez un cristal de sa couleur',st:'Gagnez un cristal au choix',base:[{k:'crypay'}],strong:[{k:'cryany'}]},
 attirance:{n:'Attirance de mana',c:'w',bt:'Un dé de la Source en plus ce tour-ci',st:'Prenez un dé, fixez sa couleur : 2 jetons de cette couleur',base:[{k:'xdie'}],strong:[{k:'mdraw'}]},
 concentration:{n:'Concentration',c:'g',bt:'Gagnez un jeton bleu, blanc ou rouge',st:'Prochaine carte : effet amélioré gratuit et +2',base:[{k:'tok',opts:['b','w','r']}],strong:[{k:'conc'}]},
 improvisation:{n:'Improvisation',c:'r',bt:'Défaussez une autre carte : Mouvement, Influence, Attaque ou Parade 3',st:'Même chose avec 5',
   base:['move','inf','atk','block'].map(k=>({k,n:3,disc:1})),strong:['move','inf','atk','block'].map(k=>({k,n:5,disc:1}))},
 // Actions Avancées (gagnées en montant de niveau)
 traitfeu:{n:'Trait de feu',c:'r',adv:1,bt:'Gagnez un cristal rouge',st:'Attaque de feu à distance 3',base:[{k:'cry',col:'r'}],strong:[{k:'ranged',n:3,el:'fire'}]},
 traitglace:{n:'Trait de glace',c:'b',adv:1,bt:'Gagnez un cristal bleu',st:'Attaque de glace à distance 3',base:[{k:'cry',col:'b'}],strong:[{k:'ranged',n:3,el:'ice'}]},
 traitvif:{n:'Trait vif',c:'w',adv:1,bt:'Gagnez un cristal blanc',st:'Attaque à distance 4',base:[{k:'cry',col:'w'}],strong:[{k:'ranged',n:4}]},
 traitlourd:{n:'Trait écrasant',c:'g',adv:1,bt:'Gagnez un cristal vert',st:'Attaque de siège 3',base:[{k:'cry',col:'g'}],strong:[{k:'siege',n:3}]},
 marcherev:{n:'Marche revigorante',c:'g',adv:1,bt:'Mouvement 2 et Soin 1',st:'Mouvement 4 et Soin 2',base:[{k:'move',n:2,plus:{k:'heal',n:1}}],strong:[{k:'move',n:4,plus:{k:'heal',n:2}}]}
};
const STARTER=['marche','marche','endurance','endurance','rapidite','rapidite','rage','rage','determination','promesse','menace','tranquillite','cristallisation','attirance','concentration','improvisation'];
const ADV=['traitfeu','traitglace','traitvif','traitlourd','marcherev'];
const mk=id=>({uid:UID++,id,def:C[id]});
const wound=()=>({uid:UID++,w:true,def:{n:'Blessure'}});

const UNITS={
 villageois:{n:'Villageois',cost:4,armor:3,lvl:1,ab:[{k:'atk',n:2},{k:'block',n:2},{k:'inf',n:2},{k:'move',n:2}]},
 herboristes:{n:'Herboristes',cost:3,armor:2,lvl:1,ab:[{k:'heal',n:2},{k:'tok',opts:['g']}]},
 forestiers:{n:'Forestiers',cost:5,armor:4,lvl:1,ab:[{k:'move',n:2},{k:'block',n:3}]},
 gardes:{n:'Gardes',cost:5,armor:5,lvl:2,ab:[{k:'atk',n:2},{k:'block',n:4}]},
 arbaletriers:{n:'Arbalétriers',cost:6,armor:4,lvl:2,ab:[{k:'atk',n:3},{k:'ranged',n:3}]}
};
const E=(n,armor,atk,fame,ab=[],res=[])=>({n,armor,atk,fame,ab,res});
const ORCS=[E('Rôdeurs',3,4,2),E('Chevaucheurs de loups',4,3,3,['Vif']),E('Sorcières maudites',5,3,3,['Toxique']),E('Cuirassés',3,4,4,['Brutal'],['phys']),E('Sapeurs',3,3,2,['Fortifié'])];
const GARNISON=[E('Arbalétriers',4,4,3,['Vif']),E('Épéistes',5,6,4)];
const MONSTRES=[E('Minotaure',5,5,4,['Brutal']),E('Gargouille',4,5,4,[],['phys']),E('Loup-garou',5,7,5,['Vif'])];

/* ---------- Plateau : 4 tuiles de 7 cases, coordonnées axiales ---------- */
const TER={plaine:['Plaine',2,2],collines:['Collines',3,3],foret:['Forêt',3,5],desol:['Terres désolées',4,4],desert:['Désert',5,3],marais:['Marais',5,5],lac:['Lac',0,0],montagne:['Montagne',0,0]};
const MAP={};
const H=(q,r,tile,t,site,col)=>{MAP[q+','+r]={q,r,tile,t,site,col}};
H(0,0,0,'plaine','portail');H(1,0,0,'plaine');H(1,-1,0,'foret');H(0,-1,0,'collines');H(-1,0,0,'lac');H(-1,1,0,'plaine');H(0,1,0,'plaine');
H(3,-2,1,'collines','mine','r');H(2,-1,1,'plaine');H(2,-2,1,'foret');H(3,-3,1,'desol');H(4,-3,1,'montagne');H(4,-2,1,'foret','clairiere');H(3,-1,1,'plaine');
H(2,1,2,'plaine','village');H(3,1,2,'plaine');H(3,0,2,'collines');H(2,0,2,'plaine');H(1,1,2,'foret');H(1,2,2,'lac');H(2,2,2,'marais');
H(5,-1,3,'collines','forteresse');H(6,-1,3,'desert');H(6,-2,3,'montagne');H(5,-2,3,'desol','taniere');H(4,-1,3,'plaine');H(4,0,3,'foret');H(5,0,3,'plaine');
const SITE={portail:'Portail : votre point de départ.',village:'Village : recrutez des Unités ou soignez-vous avec de l\'Influence.',
 mine:'Mine de cristal : terminez votre tour ici pour gagner un cristal rouge.',clairiere:'Clairière Magique : un jeton de mana or (noir la nuit) au début du tour, et une Blessure retirée de votre main ou de votre défausse en fin de tour.',
 forteresse:'Forteresse : y entrer déclenche l\'assaut contre sa garnison fortifiée.',taniere:'Antre : une action pour affronter le monstre qui s\'y cache.'};
const adj=(a,b)=>{const A=MAP[a],B=MAP[b];const dq=B.q-A.q,dr=B.r-A.r;return [[1,0],[1,-1],[0,-1],[-1,0],[-1,1],[0,1]].some(d=>d[0]===dq&&d[1]===dr)};
const cost=k=>TER[MAP[k].t][S.day?1:2];

/* ---------- État ---------- */
let S, LI=0;
const roll=()=>['r','g','b','w','gold','black'][rnd(6)];
function rollSource(){let d;do{d=[roll(),roll(),roll()]}while(d.filter(c=>BASIC.includes(c)).length<2);return d.map(c=>({c,used:false}))}
function fresh(){return{day:true,round:1,turn:1,hero:'0,0',prev:'0,0',deck:[],hand:[],discard:[],played:[],source:rollSource(),dieUsed:0,extraDice:0,tokens:[],
 crystals:{r:0,g:0,b:0,w:0},move:0,influence:0,heal:0,fame:0,level:1,rep:0,armor:2,handLimit:5,cmd:1,units:[],revealed:new Set([0]),enemies:{},siteEnemy:{},
 keepOwned:false,denDone:false,rewards:[],acted:false,moved:false,playedAny:false,repApplied:false,usedStrong:false,kills:0,combat:null,conc:false,log:[],noMana:false,over:false,advTaken:[]}}

const LESSONS=[
 {t:'Les cartes',h:'Vos cartes sont vos actions',
  txt:`<p>Dans Mage Knight, tout passe par votre main de cartes. Chaque carte offre un <b>effet de base</b>, gratuit, écrit en haut.</p>
  <p>N'importe quelle carte peut aussi être jouée <b>inclinée</b> (à l'horizontale) : elle vaut alors 1 point de Mouvement, d'Influence, d'Attaque ou de Parade, quel que soit son texte.</p>
  <p>Se déplacer coûte des points de Mouvement selon le terrain d'arrivée. Le chiffre en haut de chaque case indique ce coût.</p>`,
  goal:'Rejoignez la forêt cerclée d\'or (coût 3).',hint:'Jouez Marche ou Endurance pour 2 points, puis une autre carte inclinée pour le troisième, et cliquez sur la forêt.',
  setup(s){s.hand=['marche','endurance','rage','promesse','rapidite'];s.noMana=true;s.target='1,-1'},ok:s=>s.hero==='1,-1'},
 {t:'Le mana',h:'Le mana rend vos cartes plus fortes',
  txt:`<p>L'<b>effet amélioré</b> d'une carte demande un mana de sa couleur. La <b>Source</b>, à droite, propose trois dés : vous pouvez en utiliser <b>un seul par tour</b>.</p>
  <p>Un dé <b>or</b> remplace n'importe quelle couleur, mais seulement le jour. Le dé utilisé est relancé à la fin de votre tour.</p>
  <p>Les <b>cristaux</b> sont du mana que l'on garde d'un tour à l'autre. La carte Cristallisation en fabrique.</p>`,
  goal:'Atteignez la forêt cerclée d\'or en utilisant au moins un effet amélioré.',hint:'Le trajet coûte 2 (plaine du portail) puis 3 (forêt). Marche en effet amélioré avec le dé vert donne 4, une carte inclinée fait le reste.',
  setup(s){s.hero='-1,1';s.hand=['marche','rage','promesse','determination','cristallisation'];s.source=['g','r','gold'].map(c=>({c,used:false}));s.target='1,-1'},ok:s=>s.hero==='1,-1'&&s.usedStrong},
 {t:'Explorer',h:'Révéler de nouvelles terres',
  txt:`<p>Le plateau se découvre peu à peu. Depuis une case au bord d'une zone inconnue, dépensez <b>2 points de Mouvement</b> pour révéler la tuile voisine. Dans le scénario d'initiation, chaque tuile révélée rapporte 1 point de Gloire.</p>
  <p>Vous pouvez continuer à marcher après avoir exploré, tant qu'il vous reste des points. Les points non dépensés sont perdus à la fin du tour.</p>
  <p>La nuit, la forêt coûte 5 au lieu de 3 et le désert 3 au lieu de 5.</p>`,
  goal:'Explorez la tuile au sud-est, puis entrez dans le village.',hint:'Il faut 6 points : 2 pour explorer en cliquant sur une case « ? » voisine, 2 pour la plaine, 2 pour le village. Trois cartes de Mouvement suffisent.',
  setup(s){s.hero='1,0';s.hand=['endurance','endurance','marche','rapidite','rage'];s.source=['b','w','r'].map(c=>({c,used:false}))},ok:s=>s.hero==='2,1'},
 {t:'Village',h:'Interagir avec les habitants',
  txt:`<p>Après vos déplacements, vous avez droit à <b>une action</b>. Dans un village, c'est une interaction, payée en points d'<b>Influence</b>.</p>
  <p>Vous pouvez y <b>recruter une Unité</b> (il faut un jeton Commandement libre) et vous <b>soigner</b> : 3 Influence par point de Soin, chaque point retire une Blessure de votre main.</p>
  <p>Votre <b>Réputation</b> ajoute ou retire de l'Influence à chaque interaction. Menace, en effet amélioré, la fait baisser.</p>`,
  goal:'Recrutez une Unité au village.',hint:'Promesse en effet amélioré avec le dé blanc donne 4 Influence, de quoi engager les Villageois. Avec Menace et des cartes inclinées, vous pouvez aussi soigner votre Blessure.',
  setup(s){s.hero='2,1';s.revealed.add(2);s.hand=['promesse','menace','W','rage','marche'];s.source=['w','r','b'].map(c=>({c,used:false}))},ok:s=>s.units.length>0},
 {t:'Combat',h:'Un combat en quatre phases',
  txt:`<p>Des Orques Maraudeurs campent sur la case voisine. Cliquez sur eux pour les attaquer : c'est votre action du tour.</p>
  <p>Le combat suit toujours le même ordre : <b>attaque à distance</b>, <b>parade</b>, <b>dégâts</b>, <b>attaque</b>. Le panneau de droite vous guide.</p>
  <p>Deux règles à retenir : une Parade ne compte que si elle égale l'Attaque ennemie, et il faut atteindre l'Armure ennemie en une seule fois.</p>`,
  goal:'Battez les Rôdeurs (Armure 3, Attaque 4).',hint:'Un seul dé par tour : gardez le rouge pour Rage en effet amélioré (Attaque 4). Pour parer 4, jouez Détermination et l\'autre Rage en Parade 2 chacune. Vous pouvez aussi encaisser deux Blessures.',
  setup(s){s.hero='2,-1';s.revealed.add(1);s.enemies={'3,-1':ORCS[0]};s.hand=['rage','rage','determination','rapidite','marche'];s.source=['r','g','b'].map(c=>({c,used:false}))},ok:s=>s.kills>0},
 {t:'Dégâts',h:'Blessures, Unités et ennemis Vifs',
  txt:`<p>Ces Orques sont <b>Vifs</b> : pour les parer, il faut le <b>double</b> de leur Attaque. Parfois, encaisser est le meilleur choix.</p>
  <p>Les dégâts non parés se répartissent. Une <b>Unité</b> en absorbe autant que son Armure et devient Blessée. Votre héros reçoit une <b>Blessure par tranche d'Armure</b>, arrondi au supérieur : 3 dégâts contre Armure 2 font 2 Blessures.</p>
  <p>Une Unité s'active une fois par Manche, en cliquant dessus.</p>`,
  goal:'Battez les Chevaucheurs de loups (Armure 4, Attaque 3, Vif).',hint:'Deux voies : laisser les Villageois encaisser les 3 dégâts puis frapper avec Rage en effet amélioré, ou parer 6 avec les Villageois et deux Rage, puis attaquer avec Improvisation et une carte inclinée.',
  setup(s){s.hero='2,-1';s.revealed.add(1);s.enemies={'3,-1':ORCS[1]};s.units=[{id:'villageois',spent:false,wounded:false}];s.hand=['rage','rage','improvisation','marche','endurance'];s.source=['r','gold','g'].map(c=>({c,used:false}))},ok:s=>s.kills>0},
 {t:'Forteresse',h:'Assaut, fin de tour et niveau',
  txt:`<p>Entrer dans une forteresse lance l'<b>assaut</b>. Sa garnison est <b>fortifiée</b> : les Attaques à distance n'ont aucun effet, seul le siège compte en première phase. Attaquer une place forte coûte aussi 1 point de Réputation.</p>
  <p>Chaque ennemi vaincu rapporte de la <b>Gloire</b>. À la fin du tour, si vous avez franchi un palier, vous montez de <b>niveau</b>.</p>
  <p>Terminez toujours par « Fin du tour » : cartes jouées défaussées, puis pioche jusqu'à votre Limite de Main.</p>`,
  goal:'Prenez la forteresse (Armure 4, Attaque 4), puis terminez votre tour pour passer niveau 2.',hint:'Endurance et Rapidité inclinée donnent les 3 points pour entrer. Détermination en effet amélioré avec le dé bleu pare 5. Les deux Rage font Attaque 4.',
  setup(s){s.hero='4,-1';[1,2,3].forEach(t=>s.revealed.add(t));s.siteEnemy={'5,-1':E('Miliciens',4,4,3)};s.hand=['rapidite','rage','rage','determination','endurance'];s.source=['b','w','g'].map(c=>({c,used:false}))},ok:s=>s.keepOwned&&s.level>=2},
 {t:'Partie libre',h:'Première expédition',
  txt:`<p>À vous de jouer, sans filet. Votre deck de 16 cartes est mélangé, le plateau est à explorer et les ennemis sont tirés au hasard.</p>
  <p>La partie dure <b>trois Manches</b> : jour, nuit, jour. Une Manche se termine quand vous l'annoncez, une fois votre deck vide.</p>
  <p>Pensez à vous Reposer pour vider votre main des Blessures, à la mine pour les cristaux et au village pour les renforts.</p>`,
  goal:'Conquérez la forteresse à l\'est avant la fin de la troisième Manche.',hint:'Les Orques Maraudeurs sont une bonne première cible. Une Unité recrutée au village aide beaucoup pour l\'assaut. Longer la case d\'un maraudeur le provoque.',
  setup(s){s.free=true;s.enemies={'3,-3':ORCS[rnd(ORCS.length)],'3,1':ORCS[rnd(4)]};s.siteEnemy={'5,-1':GARNISON[rnd(2)],'5,-2':MONSTRES[rnd(3)]}},ok:s=>s.keepOwned},
 {t:'Nuit',h:'Traverser la forêt de Nuit',
  txt:`<p>La Nuit est tombée. La Forêt coûte maintenant <b>5</b> au lieu de 3, et le dé <b>or</b> de la Source est inutilisable.</p><p>Le Désert, lui, ne coûterait plus que 3.</p>`,
  goal:'Entrez dans la forêt cerclée d\'or malgré la Nuit.',hint:'Marche en effet amélioré avec le dé vert donne 4 points. Une carte inclinée apporte le cinquième.',
  setup(s){s.day=false;s.hand=['marche','endurance','rage','promesse','rapidite'].slice(0,1).concat(['rage','promesse','determination','cristallisation']);s.source=['r','gold','g'].map(c=>({c,used:false}));s.target='1,-1'},ok:s=>s.hero==='1,-1'},
 {t:'Provocation',h:'Ne pas réveiller les Orques',
  txt:`<p>Des Orques Maraudeurs campent sur la colline. Passer <b>directement d'une case voisine d'eux à une autre case voisine d'eux</b> les provoque : ils attaquent et votre Mouvement s'arrête.</p><p>Le chemin le plus court n'est donc pas toujours le bon.</p>`,
  goal:'Rejoignez le village cerclé d\'or sans déclencher de combat.',hint:'Le trajet direct longe les Orques. Faites le détour par la forêt à l\'ouest (3 points), puis entrez au village (2 points) : cette forêt ne touche pas leur case.',
  setup(s){s.hero='2,0';s.revealed.add(2);s.enemies={'3,0':ORCS[0]};s.hand=['marche','endurance','rapidite','rage','promesse'];s.noMana=true;s.target='2,1'},ok:s=>s.hero==='2,1'&&!s.fought},
 {t:'Réputation',h:'Quand la Réputation paie',
  txt:`<p>Votre Réputation est à <b>+2</b> : elle ajoute 1 point d'Influence à chaque interaction, une seule fois par tour.</p><p>Votre main est mauvaise, mais ce bonus peut faire la différence.</p>`,
  goal:'Recrutez les Villageois (4 Influence).',hint:'Promesse donne 2, Marche inclinée donne 1 en choisissant Influence, et la Réputation ajoute 1.',
  setup(s){s.hero='2,1';s.revealed.add(2);s.rep=2;s.hand=['promesse','marche','W','W','W'];s.noMana=true},ok:s=>s.units.length>0},
 {t:'Mine',h:'Récolter un Cristal',
  txt:`<p>La colline voisine abrite une <b>Mine de Cristal</b> rouge. Si vous <b>terminez votre tour</b> dessus, vous gagnez un Cristal de sa couleur.</p><p>Un Cristal se garde d'un tour à l'autre, trois par couleur au plus.</p>`,
  goal:'Gagnez un Cristal rouge.',hint:'La colline coûte 3 : Marche et Endurance suffisent. Cliquez ensuite sur « Fin du tour ».',
  setup(s){s.hero='2,-1';s.revealed.add(1);s.hand=['marche','endurance','rage','promesse','determination'];s.source=['b','w','g'].map(c=>({c,used:false}))},ok:s=>s.crystals.r>0}
];

function setupBoard(i){
  LI=i;
  S=fresh();const L=LESSONS[i];L.setup(S);
  const ids=STARTER.slice();
  if(Array.isArray(S.hand)&&S.hand.length){const hand=S.hand.map(id=>{if(id==='W')return wound();ids.splice(ids.indexOf(id),1);return mk(id)});S.hand=hand;S.deck=shuffle(ids.map(mk))}
  else{S.deck=shuffle(ids.map(mk));S.hand=[];draw(5)}
  say(L.free?'La partie commence. Bonne route.':'Cas pratique : '+L.h+'.');
}
function say(m,cls){S.log.unshift({m,cls});S.log.length=Math.min(S.log.length,5)}
function draw(n){for(let i=0;i<n&&S.deck.length;i++)S.hand.push(S.deck.shift())}

/* ---------- Dialogue de choix ---------- */
function ask(title,opts,body,noCancel){return new Promise(res=>{
  $('#mtitle').textContent=title;$('#mbody').innerHTML=body||'';$('#mbody').hidden=!body;
  const box=$('#mopts');box.innerHTML='';
  const all=noCancel?opts:opts.concat([{label:'Annuler',value:null}]);
  all.forEach(o=>{const b=document.createElement('button');b.innerHTML=o.label+(o.sub?'<small>'+o.sub+'</small>':'');b.onclick=()=>{$('#modal').hidden=true;res(o.value)};box.appendChild(b)});
  $('#modal').hidden=false;box.querySelector('button').focus();
})}

/* ---------- Mana ---------- */
function manaOpts(color,noCrystal){const o=[];const seen=new Set();
  const fits=c=>color?c===color:BASIC.includes(c);
  S.tokens.forEach((c,idx)=>{if((fits(c)||(c==='gold'&&S.day))&&!seen.has('t'+c)){seen.add('t'+c);o.push({type:'tok',idx,c,label:'Jeton de mana '+COL[c]})}});
  if(!noCrystal)BASIC.forEach(c=>{if(fits(c)&&S.crystals[c]>0)o.push({type:'cry',c,label:'Cristal '+COL[c],sub:'Le cristal est dépensé.'})});
  if(!S.noMana&&S.dieUsed<1+S.extraDice)S.source.forEach((d,idx)=>{if(!d.used&&(fits(d.c)||(d.c==='gold'&&S.day))&&!seen.has('d'+d.c)){seen.add('d'+d.c);o.push({type:'die',idx,c:d.c,label:'Dé '+COL[d.c]+' de la Source',sub:d.c==='gold'?'L\'or remplace toute couleur de base, le jour.':'Votre dé de ce tour.'})}});
  return o}
function spend(o){if(o.type==='tok')S.tokens.splice(S.tokens.indexOf(o.c),1);else if(o.type==='cry')S.crystals[o.c]--;else{S.source[o.idx].used=true;S.dieUsed++}}
function addCrystal(c,effect){if(S.crystals[c]>=3){if(effect){S.tokens.push(c);say('Déjà 3 Cristaux '+COL[c]+'s : celui-ci devient un jeton de mana pour ce tour.')}else say('Déjà 3 Cristaux '+COL[c]+'s : vous ne recevez rien.');return}S.crystals[c]++}

/* ---------- Effets ---------- */
const LBL={move:'Mouvement',inf:'Influence',atk:'Attaque',block:'Parade',ranged:'Attaque à distance',siege:'Attaque de siège',heal:'Soin'};
const EL={fire:' de feu',ice:' de glace'};
function label(a){if(LBL[a.k])return LBL[a.k]+(a.el?EL[a.el]:'')+' '+a.n;
  return {draw:'Piocher '+a.n+' carte'+(a.n>1?'s':''),tok:'Jeton de mana '+(a.opts||[]).map(c=>COL[c]).join(' ou '),crypay:'Cristalliser un mana',cryany:'Cristal au choix',cry:'Cristal '+COL[a.col],xdie:'Un dé de plus',mdraw:'Deux jetons de mana',conc:'Concentration'}[a.k]}
function valid(a){const c=S.combat;switch(a.k){
  case 'move':return c?'Pas de déplacement pendant un combat.':S.acted?'Après votre action, vous ne pouvez plus vous déplacer ce tour-ci.':true;
  case 'inf':return c?'L\'Influence ne sert pas en combat.':true;
  case 'atk':return c&&c.phase===3?true:c?'Une Attaque normale se joue pendant la phase d\'Attaque, la quatrième.':'Il n\'y a pas de combat en cours.';
  case 'ranged':case 'siege':return c&&(c.phase===0||c.phase===3)?true:c?'Les Attaques se jouent en phase 1 (distance et siège) ou en phase 4.':'Il n\'y a pas de combat en cours.';
  case 'block':return c&&c.phase===1?true:c?'La Parade se joue pendant la phase de Parade, la deuxième.':'Il n\'y a pas de combat en cours.';
  case 'heal':return c?'On ne se soigne pas en plein combat.':(S.hand.some(x=>x.w)||S.units.some(u=>u.wounded))?true:'Vous n\'avez aucune Blessure à soigner.';
  default:return true}}
async function prep(a,uid){
  const p={};
  if(a.disc){const o=S.hand.filter(c=>c.uid!==uid&&!c.w);if(!o.length){say('Improvisation demande de défausser une autre carte.','bad');return null}
    p.disc=await ask('Quelle carte défausser ?',o.map(c=>({label:c.def.n,value:c.uid})));if(p.disc==null)return null}
  if(a.k==='crypay'){const o=manaOpts(null,true);if(!o.length){say('Il vous faut un mana (dé ou jeton) à transformer en cristal.','bad');return null}
    p.mana=await ask('Quel mana cristalliser ?',o.map(x=>({label:x.label,value:x})));if(!p.mana)return null;p.col=p.mana.c;
    if(p.col==='gold'){p.col=await ask('L\'or devient un cristal de quelle couleur ?',BASIC.map(c=>({label:COL[c],value:c})));if(!p.col)return null}}
  if(a.k==='cryany'||a.k==='mdraw'){if(a.k==='mdraw'&&!S.source.some(d=>!d.used)){say('Aucun dé disponible dans la Source.','bad');return null}
    p.col=await ask(a.k==='mdraw'?'Quelle couleur pour le dé ?':'Un cristal de quelle couleur ?',BASIC.map(c=>({label:COL[c],value:c})));if(!p.col)return null}
  if(a.k==='tok'){p.col=a.opts.length===1?a.opts[0]:await ask('Quel jeton de mana ?',a.opts.map(c=>({label:COL[c],value:c})));if(!p.col)return null}
  return p}
function run(a,p,bonus){const n=(a.n||0)+(LBL[a.k]&&a.k!=='heal'?bonus:0);
  switch(a.k){
   case 'move':S.move+=n;break;case 'inf':S.influence+=n;break;
   case 'atk':S.combat.atk.push({kind:'melee',el:a.el||'phys',n});break;
   case 'ranged':S.combat.atk.push({kind:'ranged',el:a.el||'phys',n});break;
   case 'siege':S.combat.atk.push({kind:'siege',el:a.el||'phys',n});break;
   case 'block':S.combat.block+=n;break;
   case 'heal':heal(a.n);break;case 'draw':draw(a.n);break;
   case 'crypay':spend(p.mana);addCrystal(p.col,1);break;case 'cryany':addCrystal(p.col,1);break;case 'cry':addCrystal(a.col,1);break;
   case 'tok':S.tokens.push(p.col);break;case 'xdie':S.extraDice++;break;
   case 'mdraw':{const d=S.source.find(x=>!x.used);d.c=p.col;d.used=true;d.keep=true;S.tokens.push(p.col,p.col);break}
   case 'conc':S.conc=true;break}
  if(a.rep)S.rep=Math.max(-7,S.rep+a.rep);
  if(a.plus&&valid(a.plus)===true)run(a.plus,{},0);
  if(p.disc){const i=S.hand.findIndex(c=>c.uid===p.disc);S.discard.push(S.hand.splice(i,1)[0])}}
function heal(n){while(n>0){const i=S.hand.findIndex(c=>c.w);if(i<0)break;S.hand.splice(i,1);n--}S.heal+=n}
async function pick(alts){const v=alts.filter(a=>valid(a)===true);
  if(!v.length){say(valid(alts[0]),'bad');return null}
  if(v.length===1)return v[0];
  return await ask('Quel effet ?',v.map(a=>({label:label(a),value:a})))}

async function playCard(uid,mode){
  const card=S.hand.find(c=>c.uid===uid);if(!card||S.over)return;
  const d=card.def;
  if(mode==='strong'&&S.noMana){say('Le mana arrive à la leçon suivante. Ici, utilisez l\'effet de base ou jouez la carte inclinée.','bad');return render()}
  const alts=mode==='side'?['move','inf','atk','block'].map(k=>({k,n:1})):d[mode];
  const a=await pick(alts);if(!a)return render();
  const p=await prep(a,uid);if(!p)return render();
  let bonus=0;
  if(mode==='strong'){
    if(S.conc){S.conc=false;bonus=2}
    else{const o=manaOpts(d.c);if(!o.length){say('Il vous faut un mana '+COL[d.c]+' pour cet effet amélioré'+(S.dieUsed>=1+S.extraDice&&!S.noMana?' (vous avez déjà pris votre dé ce tour-ci).':'.'),'bad');return render()}
      const m=o.length===1?o[0]:await ask('Payer avec quel mana ?',o.map(x=>({label:x.label,sub:x.sub,value:x})));if(!m)return render();spend(m)}
    S.usedStrong=true}
  S.hand.splice(S.hand.indexOf(card),1);S.played.push(card);S.playedAny=true;
  run(a,p,bonus);
  say(d.n+(mode==='side'?' jouée inclinée : ':mode==='strong'?' en effet amélioré : ':' : ')+label(a)+(bonus?' (+2 grâce à Concentration)':'')+'.');
  render()}

/* ---------- Unités ---------- */
async function clickUnit(i){const u=S.units[i],d=UNITS[u.id],c=S.combat;
  if(c&&c.phase===2){if(u.wounded){say('Une Unité déjà Blessée ne peut plus encaisser.','bad')}else{const tox=c.enemy.ab.includes('Toxique');u.wounded=tox?2:1;c.dmg=Math.max(0,c.dmg-d.armor);say(d.n+' encaissent '+d.armor+' dégâts et sont Blessés'+(tox?' deux fois (Toxique).':'.'));if(c.dmg===0){say('Tous les dégâts sont absorbés.','good');c.phase=3}}return render()}
  if(u.wounded){if(S.heal>=d.lvl){S.heal-=d.lvl;u.wounded--;say(d.n+(u.wounded?' : une Blessure retirée, il en reste une.':' sont soignés.'),'good')}else say('Une Unité Blessée ne peut pas agir. La soigner coûte '+d.lvl+' point(s) de Soin.','bad');return render()}
  if(u.spent){say(d.n+' sont Épuisés jusqu\'à la fin de la Manche.','bad');return render()}
  const a=await pick(d.ab);if(!a)return render();const p=await prep(a);if(!p)return render();
  run(a,p,0);u.spent=true;say(d.n+' : '+label(a)+'.');render()}
const repMod=()=>({'-7':-99,'-6':-5,'-5':-3,'-4':-2,'-3':-1,'-2':-1,'2':1,'3':1,'4':2,'5':2,'6':3,'7':5}[S.rep]||0);
const effInf=()=>S.influence+(S.repApplied?0:repMod());
function payInf(n){if(effInf()<n){say('Il vous faut '+n+' Influence (vous en avez '+Math.max(0,effInf())+'). Jouez des cartes d\'Influence ou des cartes inclinées.','bad');return false}
  if(!S.repApplied){S.influence+=repMod();S.repApplied=true}S.influence-=n;S.acted=true;return true}
async function recruit(id){const d=UNITS[id];
  if(effInf()<d.cost){payInf(d.cost);return render()}
  if(S.units.length>=S.cmd){const i=await ask('Aucun jeton Commandement libre',S.units.map((u,i)=>({label:'Renvoyer '+UNITS[u.id].n,value:i})),'Pour recruter, vous devez renvoyer une de vos Unités : elle est retirée du jeu.');if(i==null)return render();S.units.splice(i,1)}
  if(payInf(d.cost)){S.units.push({id,spent:false,wounded:0});say(d.n+' rejoignent votre armée, Disponibles tout de suite.','good')}render()}
function buyHeal(){if(!S.hand.some(c=>c.w)&&!S.units.some(u=>u.wounded)){say('Vous n\'avez rien à soigner.','bad');return render()}
  if(payInf(3)){heal(1);say('Vous achetez 1 point de Soin.','good')}render()}

/* ---------- Déplacement ---------- */
function clickHex(k){if(S.over)return;const h=MAP[k];
  if(S.combat){say('Terminez d\'abord le combat.','bad');return render()}
  if(!S.revealed.has(h.tile)){
    const near=Object.keys(MAP).some(x=>MAP[x].tile===h.tile&&adj(S.hero,x));
    if(!near)say('Pour explorer cette tuile, placez-vous sur une case qui la touche.','bad');
    else if(S.acted)say('Après votre action, vous ne pouvez plus explorer ce tour-ci.','bad');
    else if(S.move<2)say('Explorer coûte 2 points de Mouvement (vous en avez '+S.move+').','bad');
    else{S.move-=2;S.revealed.add(h.tile);S.moved=true;S.fame++;say('Nouvelle tuile révélée : +1 Gloire.','good')}
    return render()}
  const T=TER[h.t];
  if(k===S.hero||!adj(S.hero,k)){say(T[0]+(T[1]?' (coût '+cost(k)+')':', infranchissable')+'. '+(S.enemies[k]?'Orques Maraudeurs : '+S.enemies[k].n+'.':h.site?SITE[h.site]:'')+(k!==S.hero&&T[1]?' Vous ne pouvez entrer que sur une case voisine.':''));return render()}
  if(S.enemies[k]){if(S.acted)say('Vous avez déjà fait votre action ce tour-ci.','bad');else startCombat(k,'orcs',S.enemies[k]);return render()}
  if(!T[1]){say(T[0]+' : infranchissable.','bad');return render()}
  if(S.acted){say('Après votre action, vous ne pouvez plus vous déplacer ce tour-ci.','bad');return render()}
  const c=cost(k);
  if(S.move<c){say(T[0]+' : il faut '+c+' points de Mouvement, vous en avez '+S.move+'. Jouez des cartes de Mouvement, ou d\'autres cartes inclinées.','bad');return render()}
  const from=S.hero;S.move-=c;S.prev=from;S.hero=k;S.moved=true;say('Vous entrez en '+T[0].toLowerCase()+' pour '+c+'.');
  const prov=Object.keys(S.enemies).find(e=>adj(from,e)&&adj(k,e));
  if(prov){say('En longeant leur case, vous provoquez les '+S.enemies[prov].n+' : ils attaquent, votre déplacement s\'arrête.','bad');startCombat(prov,'orcs',S.enemies[prov])}
  else if(h.site==='forteresse'&&!S.keepOwned){S.rep=Math.max(-7,S.rep-1);say('Assaut de la forteresse : Réputation −1.');startCombat(k,'keep',S.siteEnemy[k])}
  render()}
function startCombat(key,kind,enemy){S.combat={key,kind,enemy,phase:0,atk:[],block:0,dmg:0,wounds:0,fort:kind==='keep'||enemy.ab.includes('Fortifié')};S.acted=true;S.heal=0;S.fought=true;
  say('Combat contre '+enemy.n+' (Armure '+enemy.armor+', Attaque '+enemy.atk+').')}
function atkTotal(){const c=S.combat,e=c.enemy;let ok=0,res=0;
  c.atk.forEach(x=>{if(c.phase===0&&!(x.kind==='siege'||(x.kind==='ranged'&&!c.fort)))return;if(e.res.includes(x.el))res+=x.n;else ok+=x.n});
  return ok+Math.floor(res/2)}
const blockNeed=()=>S.combat.enemy.atk*(S.combat.enemy.ab.includes('Vif')?2:1);
function win(){const c=S.combat,e=c.enemy;S.fame+=e.fame;S.kills++;let m=e.n+' vaincus : +'+e.fame+' Gloire.';
  if(c.kind==='orcs'){delete S.enemies[c.key];S.rep=Math.min(7,S.rep+1);m+=' Les habitants apprécient : Réputation +1.'}
  if(c.kind==='keep'){S.keepOwned=true;m+=' La forteresse est à vous.'}
  if(c.kind==='den'){S.denDone=true;S.rewards.push('den');m+=' Récompense en fin de tour : deux Cristaux tirés au dé.'}
  S.combat=null;say(m,'good')}
function combatAct(act){const c=S.combat,e=c.enemy;
  if(act==='attack'){if(atkTotal()>=e.armor)win();else say('Il manque '+(e.armor-atkTotal())+' point(s) : une attaque insuffisante ne fait rien.','bad')}
  else if(act==='next0'){c.phase=1;say('Phase de Parade : l\'ennemi attaque.')}
  else if(act==='block'){if(c.block>=blockNeed()){say('Attaque parée, aucun dégât.','good');c.phase=3}else say('Parade insuffisante : il faut '+blockNeed()+' d\'un coup.','bad')}
  else if(act==='noblock'){c.dmg=e.atk*(e.ab.includes('Brutal')?2:1);c.phase=2;say('Non paré : '+c.dmg+' dégâts à répartir.')}
  else if(act==='take'){const w=Math.ceil(c.dmg/S.armor);for(let i=0;i<w;i++)S.hand.push(wound());c.wounds+=w;let m='Votre héros encaisse '+c.dmg+' dégâts : '+w+' Blessure(s) en main.';
    if(e.ab.includes('Toxique')){for(let i=0;i<w;i++)S.discard.push(wound());m+=' Toxique : autant dans la défausse.'}
    if(c.wounds>=S.handLimit){S.discard.push(...S.hand.filter(x=>!x.w));S.hand=S.hand.filter(x=>x.w);m+=' Assommé : vous défaussez vos autres cartes.'}
    c.dmg=0;c.phase=3;say(m,'bad')}
  else if(act==='flee'){if(c.kind==='keep'){S.hero=S.prev;say('Assaut manqué : vous reculez sur votre case précédente.','bad')}else say('Vous rompez le combat. L\'ennemi reste en place.','bad');S.combat=null}
  render()}
function denFight(){if(S.acted){say('Vous avez déjà fait votre action ce tour-ci.','bad');return render()}startCombat(S.hero,'den',S.siteEnemy[S.hero]);render()}

/* ---------- Fin de tour, repos, Manche ---------- */
const TH=[0,3,8,15,24];
async function claimRewards(){for(const r of S.rewards.splice(0))for(let i=0;i<2;i++){const d=roll();
  if(d==='black'){S.fame++;say('Récompense de l\'Antre : dé noir, +1 Gloire à la place du Cristal.','good')}
  else{const c=d==='gold'?await ask('Dé or : un Cristal de quelle couleur ?',BASIC.map(x=>({label:COL[x],value:x})),'',true):d;addCrystal(c);say('Récompense de l\'Antre : Cristal '+COL[c]+'.','good')}}}
async function levelUps(){while(S.level<5&&S.fame>=TH[S.level]){S.level++;
  if(S.level%2===0){const pool=shuffle(ADV.filter(x=>!S.advTaken.includes(x))).slice(0,3);
    const id=await ask('Niveau '+S.level+' !',pool.map(x=>({label:C[x].n,sub:C[x].bt+' / '+C[x].st,value:x})),'Aux niveaux pairs, vous gagnez une Compétence (non simulée ici) et une carte Action Avancée, prise dans une Offre de trois cartes et placée sur le dessus de votre Deck. Laquelle prenez-vous ?',true);
    S.advTaken.push(id);S.deck.unshift(mk(id));say('Niveau '+S.level+' : '+C[id].n+' rejoint votre deck.','good')}
  else if(S.level===3){S.armor=3;S.cmd=2;say('Niveau 3 : Armure 3 et un deuxième jeton Commandement.','good')}
  else{S.handLimit=6;S.cmd=3;say('Niveau 5 : Limite de Main 6 et un troisième jeton Commandement.','good')}}}
async function endTurn(rest){
  if(S.over)return;
  if(S.combat){say('Terminez d\'abord le combat.','bad');return render()}
  if(!rest&&!S.playedAny&&S.hand.some(c=>!c.w)){const uid=await ask('Quelle carte défausser ?',S.hand.filter(c=>!c.w).map(c=>({label:c.def.n,value:c.uid})),'Vous n\'avez joué aucune carte ce tour-ci : la règle impose d\'en défausser au moins une avant de piocher.');if(uid==null)return render();S.discard.push(S.hand.splice(S.hand.findIndex(c=>c.uid===uid),1)[0])}
  const h=MAP[S.hero];
  if(h.site==='mine'){addCrystal(h.col);say('La mine vous donne un cristal '+COL[h.col]+'.','good')}
  if(h.site==='clairiere'){let i=S.hand.findIndex(c=>c.w);if(i>=0){S.hand.splice(i,1);say('La Clairière retire une Blessure de votre main.','good')}else{i=S.discard.findIndex(c=>c.w);if(i>=0){S.discard.splice(i,1);say('La Clairière retire une Blessure de votre défausse.','good')}}}
  S.discard.push(...S.played);S.played=[];S.tokens=[];S.move=S.influence=S.heal=0;S.conc=false;
  S.source.forEach(d=>{if(d.used&&!d.keep)d.c=roll();d.used=false;d.keep=false});S.dieUsed=0;S.extraDice=0;
  await claimRewards();
  await levelUps();
  const near=S.keepOwned&&(S.hero==='5,-1'||adj(S.hero,'5,-1'));
  const lim=S.handLimit+(near?1:0);if(S.hand.length<lim)draw(lim-S.hand.length);
  S.acted=S.moved=S.playedAny=S.repApplied=false;S.turn++;
  say('Nouveau tour. Vous complétez votre main à '+lim+' cartes'+(near?' (+1 grâce à votre forteresse)':'')+(S.deck.length?'.':' ; votre deck est vide.'));
  if(MAP[S.hero].site==='clairiere'){S.tokens.push(S.day?'gold':'black');say('La Clairière vous offre un jeton de mana '+(S.day?'or.':'noir (utile seulement pour l\'effet amélioré des Sorts).'),'good')}
  if(!S.deck.length&&!S.hand.length)return endRound();
  render()}
async function rest(){
  if(S.combat||S.over)return;
  if(S.moved||S.acted){say('Le Repos remplace tout le tour : impossible après un déplacement ou une action.','bad');return render()}
  const nw=S.hand.filter(c=>!c.w),w=S.hand.filter(c=>c.w);
  if(!nw.length&&!w.length){say('Votre main est vide.','bad');return render()}
  if(nw.length){const uid=await ask('Repos : quelle carte défausser ?',nw.map(c=>({label:c.def.n,value:c.uid})),'Vous défaussez une carte normale et toutes vos Blessures en main. Les Blessures défaussées reviendront au prochain mélange : seul le Soin les retire pour de bon.');
    if(uid==null)return render();S.discard.push(S.hand.splice(S.hand.findIndex(c=>c.uid===uid),1)[0]);S.discard.push(...w);S.hand=S.hand.filter(c=>!c.w);say('Vous vous reposez : '+w.length+' Blessure(s) défaussée(s).')}
  else{S.discard.push(S.hand.splice(0,1)[0]);say('Repos Prolongé : vous n\'avez que des Blessures, une seule est défaussée.')}
  endTurn(true)}
async function endRound(){
  if(S.combat)return;
  if(S.free&&S.round>=3){S.over=true;render();
    await ask(S.keepOwned?'Expédition réussie':'Fin de l\'expédition',[{label:'Rejouer une partie',value:1}],'Trois Manches se sont écoulées. Gloire : <b>'+S.fame+'</b>, niveau '+S.level+'. '+(S.keepOwned?'La forteresse est tombée.':'La forteresse tient toujours : tentez une autre approche.'),true);
    setupBoard(7);return render()}
  const all=[...S.deck,...S.hand,...S.discard,...S.played];S.deck=shuffle(all);S.hand=[];S.discard=[];S.played=[];
  S.day=!S.day;S.round++;S.source=rollSource();S.dieUsed=0;S.extraDice=0;S.tokens=[];S.move=S.influence=S.heal=0;
  S.units.forEach(u=>u.spent=false);S.acted=S.moved=S.playedAny=S.repApplied=false;draw(S.handLimit);
  say('Manche '+S.round+' : '+(S.day?'le jour se lève.':'la nuit tombe. La forêt coûte 5, le désert 3, et l\'or de la Source est inutilisable.')+' Deck remélangé, Unités prêtes.','good');
  render()}

/* ---------- Rendu ---------- */
const SZ=46,px=(q,r)=>[SZ*Math.sqrt(3)*(q+r/2),SZ*1.5*r];
const pts=(x,y,s)=>[0,1,2,3,4,5].map(i=>{const a=Math.PI/180*(60*i-30);return (x+s*Math.cos(a)).toFixed(1)+','+(y+s*Math.sin(a)).toFixed(1)}).join(' ');
function deco(t,x,y){const d='stroke="rgba(10,25,30,.38)" stroke-width="2" fill="none" stroke-linecap="round"';y+=26;
  switch(t){
   case 'foret':return [-18,0,18].map(o=>`<path d="M${x+o-7} ${y+5}L${x+o} ${y-9}L${x+o+7} ${y+5}Z" fill="rgba(10,40,20,.45)"/>`).join('');
   case 'collines':return `<path d="M${x-22} ${y+4}q10 -14 20 0M${x+2} ${y+4}q10 -14 20 0" ${d}/>`;
   case 'montagne':return `<path d="M${x-24} ${y+6}L${x-9} ${y-16}L${x+3} ${y+6}ZM${x-3} ${y+6}L${x+11} ${y-10}L${x+24} ${y+6}Z" fill="rgba(20,25,35,.5)"/>`;
   case 'lac':return `<path d="M${x-20} ${y-4}q5 -5 10 0t10 0t10 0t10 0M${x-14} ${y+5}q5 -5 10 0t10 0t10 0" ${d}/>`;
   case 'marais':return `<path d="M${x-14} ${y+5}v-11M${x-9} ${y+5}v-7M${x+6} ${y+5}v-11M${x+11} ${y+5}v-7M${x-22} ${y+6}h44" ${d}/>`;
   case 'desert':return `<path d="M${x-22} ${y+2}q11 -9 22 0t22 0" ${d}/>`;
   case 'desol':return `<path d="M${x-20} ${y-3}l8 5l-4 5M${x+4} ${y-4}l7 6l9 -3" ${d}/>`;
   default:return `<path d="M${x-14} ${y+4}l2 -6M${x-10} ${y+4}l1 -6M${x+10} ${y+4}l2 -6M${x+14} ${y+4}l1 -6" ${d}/>`}}
function siteIcon(h,x,y){y-=6;const k='stroke="#12202a" stroke-width="1.6"';
  switch(h.site){
   case 'portail':return `<circle cx="${x}" cy="${y}" r="13" fill="none" stroke="#12202a" stroke-width="3"/><circle cx="${x}" cy="${y}" r="6" fill="var(--m-gold)" ${k}/>`;
   case 'village':return `<path d="M${x-13} ${y+10}v-12l13 -10l13 10v12z" fill="#f1e6cf" ${k}/><rect x="${x-3}" y="${y+1}" width="6" height="9" fill="#7a5a3a"/>`;
   case 'mine':return `<path d="M${x} ${y-14}l10 9l-10 16l-10 -16z" fill="var(--m-${h.col})" ${k}/>`;
   case 'clairiere':return `<circle cx="${x}" cy="${y}" r="12" fill="var(--m-gold)" opacity=".85" ${k}/><path d="M${x} ${y+7}v-14M${x} ${y-2}l5 -5M${x} ${y+2}l-5 -5" stroke="#12202a" stroke-width="2" fill="none"/>`;
   case 'forteresse':return `<path d="M${x-13} ${y+11}v-22h6v5h4v-5h6v5h4v-5h6v22z" fill="${S.keepOwned?'var(--accent)':'#d9dde2'}" ${k}/><rect x="${x-3}" y="${y+2}" width="6" height="9" fill="#12202a"/>`;
   case 'taniere':return `<path d="M${x-14} ${y+10}q0 -24 14 -24t14 24z" fill="#3a2f2a" ${k}/>${S.denDone?'':`<circle cx="${x-4}" cy="${y}" r="1.8" fill="#f2c94c"/><circle cx="${x+4}" cy="${y}" r="1.8" fill="#f2c94c"/>`}`}
  return ''}
function renderMap(){const keys=Object.keys(MAP);let x0=1e9,x1=-1e9,y0=1e9,y1=-1e9;
  keys.forEach(k=>{const[x,y]=px(MAP[k].q,MAP[k].r);x0=Math.min(x0,x);x1=Math.max(x1,x);y0=Math.min(y0,y);y1=Math.max(y1,y)});
  let s=`<svg viewBox="${x0-SZ-4} ${y0-SZ-4} ${x1-x0+2*SZ+8} ${y1-y0+2*SZ+8}" role="img" aria-label="Plateau de jeu">`;
  const hero=px(MAP[S.hero].q,MAP[S.hero].r);
  keys.forEach(k=>{const h=MAP[k],[x,y]=px(h.q,h.r),T=TER[h.t];
    if(!S.revealed.has(h.tile)){s+=`<g class="hex" data-hex="${k}"><title>Zone inexplorée : 2 points de Mouvement depuis une case voisine</title><polygon class="base" points="${pts(x,y,SZ-1)}" fill="var(--t-fog)"/><text x="${x}" y="${y+7}" text-anchor="middle" font-size="22" fill="var(--muted)">?</text></g>`;return}
    const e=S.enemies[k];const reach=!S.combat&&!S.acted&&adj(S.hero,k)&&T[1]&&!e&&S.move>=cost(k);
    s+=`<g class="hex" data-hex="${k}"><title>${T[0]}${T[1]?', coût '+cost(k):', infranchissable'}${h.site?' · '+SITE[h.site]:''}${e?' · Orques Maraudeurs : '+e.n:''}</title><polygon class="base" points="${pts(x,y,SZ-1)}" fill="var(--t-${h.t})"/>${deco(h.t,x,y)}`;
    if(T[1])s+=`<text class="cost" x="${x}" y="${y-27}" text-anchor="middle">${cost(k)}</text>`;
    s+=siteIcon(h,x,y);
    if(e)s+=`<circle cx="${x}" cy="${y-6}" r="15" fill="#3d6b34" stroke="#12202a" stroke-width="2"/><path d="M${x-7} ${y-13}l14 14M${x+7} ${y-13}l-14 14" stroke="#f3efe2" stroke-width="3" stroke-linecap="round"/><text class="lbl" x="${x}" y="${y+21}" text-anchor="middle">${e.armor} / ${e.atk}</text>`;
    if(reach)s+=`<polygon class="reach" points="${pts(x,y,SZ-6)}"/>`;
    if(S.target===k&&S.hero!==k)s+=`<polygon class="target" points="${pts(x,y,SZ-5)}"/>`;
    s+='</g>'});
  const hy=hero[1]+(MAP[S.hero].site?20:2);
  s+=`<g pointer-events="none"><circle cx="${hero[0]}" cy="${hy}" r="13" fill="var(--accent)" stroke="#fff" stroke-width="2.5"/><path d="M${hero[0]-6} ${hy-5}h12v5q0 6 -6 8q-6 -2 -6 -8z" fill="#fff"/></g></svg>`;
  $('#map').innerHTML=s;
  $('#mapbar').innerHTML=`<span class="daynight">${S.day?'Jour':'Nuit'} · Manche ${S.round}${S.free?' / 3':''} · tour ${S.turn}</span><span>Cliquez une case voisine pour y entrer, une case « ? » pour explorer.</span>`}
const gem=c=>`<span class="gem mc-${c}" title="mana ${COL[c]}"></span>`;
function renderSide(){let s='';const c=S.combat;
  if(c){const e=c.enemy,ph=['Distance','Parade','Dégâts','Attaque'];
    s+=`<h2>Combat</h2><div class="enemy"><b>${e.n}</b><div>Armure ${e.armor} · Attaque ${e.atk} · Gloire ${e.fame}</div><div>${c.fort?'<span class="tag">Fortifié</span>':''}${e.ab.filter(a=>a!=='Fortifié').map(a=>`<span class="tag">${a}</span>`).join('')}${e.res.length?'<span class="tag">Résistance physique</span>':''}</div></div>
    <ol class="phases">${ph.map((p,i)=>`<li class="${i===c.phase?'cur':i<c.phase?'past':''}">${i+1}. ${p}</li>`).join('')}</ol>`;
    const at=atkTotal();
    if(c.phase===0)s+=`<p>${c.fort?'Ennemi fortifié : seules les Attaques de <b>siège</b> comptent dans cette phase.':'Seules les Attaques <b>à distance</b> et de <b>siège</b> comptent ici. Vaincre maintenant évite sa riposte.'}</p><div class="pools"><span class="pool on">Attaque utilisable <b>${at}</b> / ${e.armor}</span></div>
      <div class="row"><button class="primary" data-cb="attack" ${at>=e.armor?'':'disabled'}>Attaquer</button><button data-cb="next0">Passer à la Parade</button></div>${at<e.armor?`<p class="why">« Attaquer » reste grisé tant qu'il manque ${e.armor-at} point${e.armor-at>1?'s':''}. En phase 1, seules ${c.fort?'les Attaques de Siège':'les Attaques à distance et de Siège'} comptent : une carte jouée en Attaque normale ou inclinée attendra la phase 4. Sinon, passez à la Parade.</p>`:''}`;
    if(c.phase===1)s+=`<p>L'ennemi frappe à ${e.atk}.${e.ab.includes('Vif')?' Il est Vif : il faut le double.':''} Une Parade ne compte que si elle atteint <b>${blockNeed()}</b>.</p><div class="pools"><span class="pool on">Parade <b>${c.block}</b> / ${blockNeed()}</span></div>
      <div class="row"><button class="primary" data-cb="block" ${c.block>=blockNeed()?'':'disabled'}>Parer</button><button data-cb="noblock">Ne pas parer</button></div>${c.block<blockNeed()?`<p class="why">« Parer » reste grisé tant qu'il manque ${blockNeed()-c.block} point${blockNeed()-c.block>1?'s':''} de Parade. Jouez des cartes en Parade, ou choisissez de ne pas parer.</p>`:''}`;
    if(c.phase===2)s+=`<p>Dégâts restants : <b>${c.dmg}</b>${e.ab.includes('Brutal')?' (Brutal : doublés)':''}. Cliquez une Unité pour qu'elle en absorbe autant que son Armure, ou laissez votre héros encaisser : ${Math.ceil(c.dmg/S.armor)} Blessure(s) avec Armure ${S.armor}.</p>
      <div class="row"><button class="primary" data-cb="take">Le héros encaisse</button></div>`;
    if(c.phase===3)s+=`<p>Toutes vos Attaques comptent. Il faut atteindre l'Armure en une fois.${e.res.length?' Résistance physique : vos attaques physiques sont divisées par deux.':''}</p><div class="pools"><span class="pool on">Attaque <b>${at}</b> / ${e.armor}</span></div>
      <div class="row"><button class="primary" data-cb="attack" ${at>=e.armor?'':'disabled'}>Attaquer</button><button data-cb="flee">Rompre le combat</button></div>${at<e.armor?`<p class="why">« Attaquer » reste grisé tant qu'il manque ${e.armor-at} point${e.armor-at>1?'s':''} : il faut atteindre l'Armure en une fois. Jouez des cartes d'Attaque ; toute carte inclinée ajoute 1.</p>`:''}`;
  }else{
    const h=MAP[S.hero];s+=`<h2>Votre héros</h2><div class="pools"><span class="pool ${S.move?'on':''}">Mouvement <b>${S.move}</b></span><span class="pool ${S.influence?'on':''}">Influence <b>${S.influence}</b></span>${S.heal?`<span class="pool on">Soin <b>${S.heal}</b></span>`:''}</div>`;
    s+=`<div class="sub">Sur cette case</div><p>${TER[h.t][0]}. ${h.site?SITE[h.site]:'Rien de particulier ici.'}</p>`;
    const shop=ids=>ids.map(id=>{const d=UNITS[id];return `<button data-recruit="${id}">Recruter ${d.n} (${d.cost})<br><small>Armure ${d.armor} · ${d.ab.map(label).join(', ')}</small></button>`}).join('');
    if(h.site==='village')s+=`<div class="sub">Interagir (Influence ${Math.max(0,effInf())}${!S.repApplied&&repMod()?', Réputation comprise':''})</div>${shop(['villageois','herboristes','forestiers'])}<button data-heal="1">Acheter 1 Soin (3)</button>`;
    if(h.site==='forteresse'&&S.keepOwned)s+=`<div class="sub">Votre forteresse (Influence ${Math.max(0,effInf())})</div>${shop(['gardes','arbaletriers'])}`;
    if(h.site==='taniere'&&!S.denDone)s+=`<button class="primary" data-den="1">Entrer dans l'antre</button>`;
  }
  if(!S.noMana){s+=`<div class="sub">Source de mana</div><div class="row">${S.source.map(d=>{const off=(d.c==='gold'&&!S.day)||(d.c==='black');return `<span class="die mc-${d.c} ${d.used?'used':off?'off':''}" title="Dé ${COL[d.c]}${off?' : inutilisable '+(d.c==='black'?'(réservé aux Sorts, la nuit)':'la nuit'):''}" style="color:${d.c==='w'||d.c==='gold'?'#12202a':'#fff'}">${COL[d.c].slice(0,2)}</span>`}).join('')}<small>${S.dieUsed>=1+S.extraDice?'Dé du tour utilisé':'1 dé par tour'}</small></div>
    <div class="row"><span class="sub">Cristaux</span>${BASIC.map(c=>`${gem(c)}<b>${S.crystals[c]}</b>`).join(' ')}</div>${S.tokens.length?`<div class="row"><span class="sub">Jetons</span>${S.tokens.map(c=>`<span class="tok mc-${c}" title="jeton ${COL[c]}"></span>`).join('')}</div>`:''}${S.conc?'<p><b>Concentration active</b> : prochain effet amélioré gratuit, +2.</p>':''}`}
  s+=`<div class="sub">Feuille de héros</div><div class="stat"><span>Niveau</span><span>${S.level}</span><span>Gloire</span><span>${S.fame}${S.level<5?' / '+TH[S.level]:''}</span><span>Réputation</span><span>${S.rep>0?'+':''}${S.rep}${repMod()?' (Influence '+(repMod()>0?'+':'')+repMod()+')':''}</span><span>Armure</span><span>${S.armor}</span><span>Limite de Main</span><span>${S.handLimit}</span><span>Commandement</span><span>${S.units.length} / ${S.cmd}</span></div>`;
  if(S.units.length)s+=`<div class="sub">Unités</div>`+S.units.map((u,i)=>{const d=UNITS[u.id];return `<div class="unit ${u.spent?'spent':''} ${u.wounded?'wounded':''}"><div class="row"><b>${d.n}</b><span>Armure ${d.armor}</span></div><small>${d.ab.map(label).join(' · ')}</small><button data-unit="${i}">${c&&c.phase===2?(u.wounded?'Déjà Blessée':'Encaisser '+d.armor+' dégâts'):u.wounded?'Blessée : soigner ('+d.lvl+')':u.spent?'Épuisée':'Activer'}</button></div>`}).join('');
  $('#side').innerHTML=s}
function renderHand(){
  $('#handbar').innerHTML=`<h2>Votre main <small style="font-family:var(--f-body);font-weight:400;color:var(--muted)">· deck ${S.deck.length} · défausse ${S.discard.length}</small></h2>
   <div class="row">${!S.deck.length&&!S.playedAny&&!S.moved&&!S.acted?'<button data-act="round">Annoncer la fin de la Manche</button>':''}<button data-act="rest" ${S.combat?'disabled':''}>Se reposer</button><button class="primary" data-act="end" ${S.combat?'disabled':''}>Fin du tour</button></div>`;
  $('#hand').innerHTML=S.hand.map(c=>c.w?`<div class="card wound"><div class="band"></div><div class="in"><div class="cname">Blessure</div><div class="eff">Injouable. Elle prend une place dans votre main. Soignez-la, ou défaussez-la en vous reposant.</div></div></div>`:
   `<div class="card"><div class="band mc-${c.def.c}"></div><div class="in"><div class="cname">${c.def.n}${c.def.adv?' ★':''}</div>
    <div class="eff"><i>Base</i>${c.def.bt}</div><div class="eff"><i>Amélioré ${gem(c.def.c)}</i>${c.def.st}</div>
    <div class="btns"><button data-play="base" data-uid="${c.uid}">Base</button><button data-play="strong" data-uid="${c.uid}">Amélioré</button><button class="side" data-play="side" data-uid="${c.uid}">Inclinée (+1)</button></div></div></div>`).join('')||'<p style="color:var(--muted)">Main vide. Terminez votre tour pour piocher.</p>';
  $('#played').textContent=S.played.length?'Jouées ce tour : '+S.played.map(c=>c.def.n).join(', ')+'.':''}
function renderCoach(){const L=LESSONS[LI],ok=L.ok(S),free=!!L.free;
  $('#coach').innerHTML=`<div class="step">${free?'Partie libre':'Cas pratique'}</div><h2>${L.h}</h2><div class="txt">${L.txt}</div>
   <div class="goal ${ok?'done':''}"><div class="lab">${ok?'Objectif atteint':'Objectif'}</div>${L.goal}</div>
   <details class="hint"><summary>Un indice</summary><p>${L.hint}</p></details>
   <div class="row"><button data-lesson="again">${free?'Nouvelle partie':'Recommencer ce cas'}</button></div>
   <div class="log" aria-live="polite">${S.log.map(l=>`<div class="${l.cls||''}">${l.m}</div>`).join('')}</div>`}