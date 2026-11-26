const CAT={reg:'Région',tra:'Tradition',civ:'Civilisé',vas:'Vassal',ren:'Renommée',ins:'Instabilités'};
const RES={mat:'Matériaux',pop:'Population',prog:'Progrès'};
const chip=(k,t)=>`<span class="chip c-${k}">${t||CAT[k]||RES[k]}</span>`;
const cats=a=>a.map(c=>chip(c)).join(' / ');
function rnd(n){if(!S||S.seed==null)return Math.floor(Math.random()*n);let t=S.seed=(S.seed+0x6D2B79F5)|0;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return Math.floor(((t^t>>>14)>>>0)/4294967296*n)}
const shuffle=a=>{for(let i=a.length-1;i>0;i--){const j=rnd(i+1);[a[i],a[j]]=[a[j],a[i]]}return a};
const norm=s=>s.normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase().trim();

/* ---------- langage des tableaux ---------- */
const g=(mat=0,pop=0,prog=0)=>({t:'gain',mat,pop,prog});
const A={t:'arch'},PLAY={t:'play'},TOP={t:'top'},EX={t:'exile'},DYN={t:'dyn'},FAME={t:'fame'},RET={t:'ret'},REGTOP={t:'regtop'},REGPLAY={t:'regplay'},FAMEARCH={t:'famearch'},SCYGL={t:'scygl'};
const mill=n=>({t:'mill',n}),acq=(...c)=>({t:'acq',c}),acqEx=c=>({t:'acqex',c}),inn=c=>({t:'inn',c}),sp=(r,n)=>({t:'sp',r,n}),abn=n=>({t:'abn',n});
const per=o=>({t:'per',o}),conv=(from,to)=>({t:'conv',from,to}),rep=(r,n)=>({t:'rep',r,n}),steal=(mat,prog)=>({t:'steal',mat,prog}),you=(k,o)=>({t:'you',k,o}),alt=(...b)=>({t:'alt',b});
const ALL=['tra','civ','reg','vas'];
const GLO=(...d)=>['Gloire',[alt({c:[abn(3)],g:FAME},...(d.length?[{d}]:[]))]];
const PROSP=['Prospérité',[mill(1),per({mat:1,pop:1}),you('draw')]];

const T={
car:{B:[['ren',[g(1,1),A]],GLO(inn('reg')),
  ['B',[alt({c:[sp('pop',3)],g:inn('vas')},{c:[sp('mat',2)],g:acq('civ','tra')},{d:[g(1,1),A]})]],
  ['reg',[mill(1),PLAY,EX]],['perm',[g(2,1),A]],PROSP,['vas',[mill(3)]],
  ['autre',[alt({if:s=>s.res.mat>0,d:[conv('mat','prog')]},{g:acq('reg')},{d:[mill(2)]})]]],
 E:[['B',[g(1),mill(1),A]],['ren',[A]],['atk',[inn('vas'),A,you('aban'),you('draw')]],GLO(inn('reg'),you('disc',2)),
  ['E',[alt({g:acq('civ','tra')},{d:[g(0,0,1),you('ins')]})]],['reg',[g(1),PLAY,EX]],['perm',[g(2),A]],
  ['autre',[A,alt({c:[sp('mat',2)],d:[g(0,0,1)]},{c:[sp('pop',2)],d:[g(0,0,1)]}),you('ins')]]]},
cel:{B:[['atk',[steal(1,1)]],['ren',[conv('mat','prog'),A]],GLO(DYN,you('ins')),
  ['Conquête',[alt({c:[sp('pop',3)],g:inn('vas')},{g:acq('reg')},{d:[you('ins')]})]],
  ['tra',[alt({g:acq('tra')},{d:[g(0,1),A,you('ins')]})]],['B',[inn('tra'),A]],['reg',[g(1,1),PLAY,EX]],
  ['perm',[A,you('ins')]],['vas',[mill(4),A]],['autre',[alt({g:RET}),g(0,0,1),mill(1)]]],
 E:[['B',[A,you('ins')]],['ren',[conv('pop','prog'),mill(2),A]],GLO(g(0,0,2)),['tra',[mill(1),A]],['reg',[PLAY,EX]],
  ['perm',[mill(1),A]],['atk',[alt({g:acq('tra','civ')}),you('ins')]],['E',[acq(...ALL),you('gain',{mat:2})]],
  ['vas',[g(0,0,2),A]],['autre',[A,you('ins')]]]},
gre:{B:[['atk',[mill(2),steal(2,0),you('gain',{pop:1})]],['ren',[mill(3),A]],GLO(inn('civ')),
  ['Progrès',[alt({c:[sp('mat',1)],g:inn('civ')},{g:acq('tra')})]],['B',[mill(1),A]],['reg',[g(1),PLAY,EX]],['perm',[g(1,1),A]],
  ['autre',[alt({c:[sp('pop',2)],g:inn('reg')},{c:[sp('mat',2)],g:inn('tra')},{d:[mill(2),A]})]]],
 E:[['atk',[acq(...ALL),you('recallperm')]],['ren',[mill(2),g(0,0,2),A]],GLO(g(0,0,2)),['B',[mill(1),A]],
  ['reg',[mill(1),PLAY,EX]],['perm',[A]],['E',[alt({g:acq('civ','tra')})]],
  ['autre',[alt({c:[sp('pop',3)],g:acq('vas')},{c:[sp('mat',2)],g:acq('civ')},{g:RET},{d:[g(0,0,1),A]})]]]},
mac:{B:[['ren',[A]],GLO(inn('reg')),
  ['B',[alt({c:[sp('pop',3)],g:inn('vas'),d:[A]},{c:[sp('mat',3)],g:acq('civ','tra'),d:[A]},{d:[inn('reg')]})]],
  ['reg',[g(1),PLAY,EX]],['perm',[g(0,1)]],PROSP,['atk',[steal(2,0),mill(1)]],['autre',[per({prog:1}),mill(1),A]]],
 E:[['ren',[per({prog:1}),A]],['Gloire',[alt({c:[abn(3)],g:FAME},{g:acqEx('reg')},{d:[g(0,0,1)]})]],['B',[A]],['reg',[PLAY,EX]],
  ['perm',[alt({g:REGTOP}),A]],['E',[alt({c:[sp('mat',2)],g:acq(...ALL)},{d:[DYN,A]})]],['autre',[per({prog:1}),A]]]},
per:{B:[['ren',[mill(3),A]],GLO(inn('reg')),['vas',[g(2,2),mill(1),A]],
  ['B',[alt({c:[sp('pop',3)],g:inn('vas'),d:[A]},{c:[sp('mat',2)],g:acq('civ','tra')},{d:[g(1,1),TOP]})]],
  ['reg',[g(0,1),PLAY,EX]],['perm',[alt({g:acq('reg')}),A]],PROSP,['autre',[alt({g:acq('vas')},{g:acq('tra')},{d:[A]})]]],
 E:[['ren',[rep('pop',3),A]],GLO(DYN),['B',[A]],['vas',[g(0,0,2),A]],['atk',[inn('vas'),you('gain',{mat:2}),you('ins')]],
  ['reg',[PLAY,EX]],['perm',[A]],['E',[acq(...ALL),A]],['autre',[alt({g:acq('reg')},{d:[g(0,0,1)]})]]]},
rom:{B:[['atk',[you('recall'),you('ins')]],['ren',[conv('pop','prog'),A]],GLO(g(0,0,1),you('recall')),['reg',[mill(1),PLAY,EX]],
  ['perm',[g(0,1),A]],['Progrès',[alt({c:[sp('mat',5)],g:inn('civ')},{g:acq('tra')},{d:[g(0,1)]})]],PROSP,
  ['B',[alt({c:[sp('pop',3)],g:inn('vas')},{g:acq('reg')},{d:[g(0,1)]})]],['vas',[mill(2),g(0,0,1),A]],['autre',[g(2)]]],
 E:[['B',[A]],['ren',[conv('pop','prog'),A]],['atk',[you('disc',1),you('aban')]],GLO(you('disc',2)),
  ['Prospérité',[per({mat:1,pop:1}),you('draw')]],['reg',[g(0,1),PLAY,EX]],['perm',[mill(1),A]],['vas',[mill(2),A]],
  ['E',[inn('civ'),A]],['autre',[alt({c:[sp('mat',3)],d:[g(0,0,1)]}),g(0,1),A]]]},
scy:{B:[['atk',[mill(2),you('recall'),you('scy')]],
  ['Conquête',[alt({c:[sp('pop',4)],g:inn('vas')},{g:acq('reg')},{d:[g(0,1)]})]],
  ['Progrès',[alt({c:[sp('mat',4)],g:inn('civ')},{g:acq('tra')},{d:[g(1)]})]],['reg',[g(0,1),PLAY,EX]],['perm',[mill(2),g(2),A]],
  ['B',[alt({if:s=>s.play.length>0,d:[per({mat:1})]},{d:[inn('reg')]})]],['vas',[alt({g:RET},{d:[inn('reg'),A]})]],
  ['autre',[alt({g:RET},{g:acq('tra')},{d:[A]})]]],
 E:[['ren',[per({prog:1}),A]],GLO(SCYGL),['B',[alt({g:RET}),A]],['reg',[g(0,1),PLAY,EX]],['perm',[mill(1),A]],
  ['atk',[g(2),you('disc',1)]],['E',[g(0,0,1),A]],
  ['autre',[alt({c:[sp('pop',3)],g:inn('vas'),d:[A]},{d:[g(0,1),alt({g:acq('reg')})]})]]]},
vik:{B:[['atk',[steal(2,0),alt({c:[sp('pop',1)],g:acq('vas','reg')}),you('disc',1)]],['ren',[alt({g:RET}),acq(...ALL),A]],
  GLO(mill(1),steal(2,0)),['reg',[alt({c:[sp('mat',3)],g:acq('tra')}),PLAY,EX]],['tra',[DYN,REGPLAY,A]],
  ['B',[alt({c:[sp('mat',3)],g:acq('tra')},{d:[mill(2),g(1,1)]})]],['perm',[g(0,1),DYN,A]],
  ['autre',[alt({g:RET},{g:acqEx('reg')},{c:[abn(1)],g:DYN},{d:[FAMEARCH]})]]]}
};

/* ---------- cartes des nations ---------- */
const c=(n,o={})=>Object.assign({n,cat:null,st:null,perm:false,atk:false,vp:0},o);
const INS=()=>c('Instabilités',{cat:'ins',vp:-2});
const NAT={
car:{name:'Carthaginois',flip:true,cleanup:'2 Matériaux',ownIns:2,
  deck:[c('Gloire'),c('Prospérité'),c('Progrès',{st:'B'}),c('Conquête',{st:'B'}),c('Didon, reine de Carthage',{st:'B'}),c('Marchands carthaginois',{st:'B'}),
    c('Îles Baléares',{cat:'reg',perm:true}),c('Maurétanie',{cat:'reg',perm:true}),INS(),INS()],
  nat:[c('Prospérité'),c('Caravanes',{perm:true}),c('Progrès',{st:'B'}),c('Ibérie',{cat:'reg',perm:true}),c('Berbères',{cat:'vas'})],
  adv:c('Cité de Carthage',{perm:true}),
  dev:[c('Éléphants',{st:'E',atk:true,vp:2}),c('Éléphants',{st:'E',atk:true,vp:2}),c('Hégémonie',{st:'E',vp:2}),c('Hannibal',{st:'E',vp:4}),
    c('Navires marchands',{st:'E',perm:true,vp:4}),c('Monopole',{st:'E',atk:true,vp:5})]},
cel:{name:'Celtes',flip:true,ownIns:3,
  deck:[c('Druides'),c('Gloire'),c('Progrès',{st:'B'}),c('Conquête',{st:'B'}),c('Boadicée',{st:'B',atk:true}),c('Vol de bétail',{st:'B',atk:true}),
    c('Chaudron de Cerridwen',{perm:true}),c('Celtica',{cat:'reg',perm:true}),INS(),INS()],
  nat:[c('Conquête',{st:'B'}),c('Armorique',{cat:'reg',perm:true}),c('Gaule belge',{cat:'reg',perm:true}),c('Britannie',{cat:'reg',perm:true}),c('Hibernie',{cat:'reg',perm:true}),INS()],
  adv:c('Or des Celtes'),
  dev:[c('Innovation celtique',{st:'E',atk:true,vp:4}),c('Cotte de mailles',{st:'E',perm:true,vp:4}),c('Chars',{st:'E',perm:true,vp:4}),c('Écriture oghamique',{st:'E',perm:true,vp:4}),c('Vercingétorix',{st:'E',vp:5})]},
gre:{name:'Grecs',flip:true,ownIns:3,
  deck:[c('Gloire'),c('Progrès',{st:'B'}),c('Conquête',{st:'B'}),c('Colons',{st:'B'}),c('Mercenaires grecs',{atk:true}),c('Cité de Sparte',{st:'B',perm:true}),
    c('Péloponnèse',{cat:'reg',perm:true}),c('Forêt de Pholos',{cat:'reg',perm:true}),INS(),INS()],
  nat:[c('Cité d\'Athènes',{perm:true}),c('Plaines de Thessalie',{cat:'reg',perm:true}),INS()],
  adv:c('Jeux olympiques'),
  dev:[c('Prospérité grecque',{st:'E',vp:2}),c('Périclès',{st:'E',vp:3}),c('Cité de Corinthe',{st:'E',perm:true,vp:3}),c('Science',{st:'E',perm:true,vp:3}),
    c('Innovation grecque',{st:'E',atk:true,vp:3}),c('Démocratie directe',{st:'E',perm:true,vp:3}),c('Phare',{st:'E',perm:true,vp:3}),c('Philosophie',{st:'E',vp:5})]},
mac:{name:'Macédoniens',flip:true,ownIns:3,
  deck:[c('Progrès',{st:'B'}),c('Conquête',{st:'B'}),c('Conquête',{st:'B'}),c('Philippe II',{st:'B'}),c('Phalange',{perm:true}),
    c('Vallée de l\'Aliakmon',{cat:'reg',perm:true}),c('Orestide',{cat:'reg',perm:true}),c('Pélagonie',{cat:'reg',perm:true}),INS(),INS(),INS()],
  nat:[c('Prospérité'),c('Ouxiens',{cat:'vas',atk:true}),c('Gloire')],
  adv:c('Alexandre'),
  dev:[c('Développement',{st:'E',vp:3}),c('Parménion',{st:'E',vp:2}),c('Cavalerie des Compagnons',{st:'E',perm:true,vp:3}),c('Alexandre le Grand',{st:'E',vp:4}),
    c('Mosaïques',{st:'E',perm:true,vp:3}),c('Alexandrie en Égypte',{st:'E',perm:true,vp:2}),c('Alexandrie en Ariana',{st:'E',perm:true,vp:5})]},
per:{name:'Perses',flip:true,ownIns:3,
  deck:[c('Gloire'),c('Prospérité'),c('Progrès',{st:'B'}),c('Conquête',{st:'B'}),c('Conquête',{st:'B'}),c('Lydiens',{cat:'vas',st:'B'}),
    c('Bactrie',{cat:'reg',perm:true}),c('Zagros',{cat:'reg',perm:true}),INS(),INS()],
  nat:[c('Arachosie',{cat:'reg',perm:true}),c('Plaine de Nisaean',{cat:'reg',perm:true}),c('Empire Mède',{cat:'vas',st:'B'}),INS()],
  adv:c('Cité de Persépolis',{perm:true}),
  dev:[c('Bélier',{st:'E',atk:true,vp:2}),c('Développement',{st:'E',vp:3}),c('Moulins à vent',{st:'E',perm:true,vp:2}),c('Satrape',{st:'E',vp:3}),
    c('Or des Perses',{st:'E',atk:true,vp:4}),c('Babyloniens',{cat:'vas',st:'E',vp:4}),c('Darius I',{st:'E',vp:5})]},
rom:{name:'Romains',flip:true,ownIns:3,
  deck:[c('Gloire'),c('Prospérité'),c('Progrès',{st:'B'}),c('Conquête',{st:'B'}),c('Triumvirat',{st:'B'}),c('Cité de Rome',{perm:true}),c('Dalmatie',{cat:'reg',perm:true}),
    c('Expansion romaine',{st:'B',atk:true}),INS(),INS()],
  nat:[c('Prospérité'),c('Du pain et des jeux',{perm:true}),c('Gaule Aquitaine',{cat:'reg',perm:true}),c('Rhétie',{cat:'reg',perm:true}),INS()],
  adv:c('Jules César',{st:'E'}),
  dev:[c('Génie militaire',{st:'E',atk:true,vp:3}),c('Invasion romaine',{st:'E',atk:true,vp:2}),c('Légions',{st:'E',perm:true,vp:2}),c('Le Sénat',{st:'E',vp:3}),
    c('Rome, la Cité éternelle',{st:'E',perm:true,vp:4}),c('Empereur Trajan',{st:'E',vp:5})]},
scy:{name:'Scythes',flip:true,ownIns:5,
  deck:[c('Nomades'),c('Nomades',{st:'B'}),c('Progrès',{st:'B'}),c('Conquête',{st:'B'}),c('Carpates',{cat:'reg',st:'B',perm:true}),c('Tian Shan',{cat:'reg',st:'B',perm:true}),
    c('Archers montés',{perm:true}),c('Tentes',{st:'B',perm:true}),INS(),INS(),INS()],
  nat:[INS(),INS(),c('Tamga',{perm:true,vp:5}),c('Steppe pontique',{cat:'reg',perm:true}),c('Bassin du Tarim',{cat:'reg',perm:true}),c('Caucase',{cat:'reg',perm:true}),c('Pillards',{st:'B',atk:true})],
  adv:c('Gloire'),
  dev:[c('Ateas',{st:'E',vp:3}),c('Kourganes',{st:'E',perm:true,vp:2}),c('Cité de Gélonos',{st:'E',perm:true,vp:2}),c('Joaillerie',{vp:7})]},
vik:{name:'Vikings',flip:false,ownIns:3,
  deck:[c('Gothja',{st:'B'}),c('Scandinavie',{cat:'reg',st:'B',perm:true}),c('Progrès',{st:'B'}),c('Prospérité'),c('Gloire'),c('Erik le Rouge',{st:'B'}),
    c('Jomsviking',{st:'B',atk:true}),c('Althing',{st:'B',atk:true}),INS()],
  nat:[c('Islande',{cat:'reg',st:'B',perm:true}),c('Peignes',{st:'B',perm:true,vp:5}),c('Groenland',{cat:'reg',st:'B',perm:true}),c('Îles Féroé',{cat:'reg',st:'B',perm:true}),
    c('Vinland',{cat:'reg',st:'B',perm:true,vp:6}),c('Sagas',{st:'B',perm:true,vp:5}),c('Cité de Dubh Linn',{st:'B',perm:true,vp:5}),c('Drakkars',{st:'B',perm:true}),
    c('Skis',{st:'B',perm:true,vp:2}),c('Rollon le Marcheur',{st:'B'}),c('Raid viking',{st:'B',atk:true}),INS(),INS()],
  adv:c('Harald Hardrada',{st:'B',vp:5}),dev:[]}
};
const DIFF=[['Chef de clan',4,'4 emplacements. Conseillé pour débuter.'],['Seigneur de guerre',4,'4 emplacements, et la C.I.V. défausse une carte de son deck à chaque fin de tour.'],
 ['Imperator',5,'Règles standard, 5 emplacements.'],['Souverain',5,'La C.I.V. démarre avec 3 Matériaux, 2 Population, 1 Progrès et marque 1 point par 5 ressources.'],['Suzerain',6,'Comme Souverain, avec un 6e emplacement.']];

/* ---------- état et affichage ---------- */
let S=null,LOG=[],TURN=null;
const newTurn=()=>({g:{mat:0,pop:0,prog:0},took:[],found:[],reg:[],arch:[],ex:0,ret:0,abn:0,emp:false,fame:null,kok:false,hit:[],blocked:0});
const nice=n=>n==='Carte du Marché'?'une carte':/ du Marché$/.test(n)?'une carte '+n.replace(' du Marché',''):n;
const qt=(n,r)=>n+' '+(n===1&&r==='mat'?'Matériau':RES[r]);
const et=a=>a.length<2?a.join(''):a.slice(0,-1).join(', ')+' et '+a[a.length-1];
const FL={car:{who:['Les Carthaginois','Les marchands de Carthage','Les navires puniques'],calm:['comptent leurs cargaisons à quai','négocient dans leurs comptoirs sans faire de vagues']},
 cel:{who:['Les Celtes','Les tribus celtes','Les druides'],calm:['festoient autour du chaudron','écoutent leurs bardes au coin du feu']},
 gre:{who:['Les Grecs','Les cités grecques','Les hoplites'],calm:['débattent longuement sur l\'agora','s\'entraînent au gymnase']},
 mac:{who:['Les Macédoniens','Les phalanges macédoniennes','Les compagnons du roi'],calm:['affûtent leurs sarisses','passent leurs troupes en revue']},
 per:{who:['Les Perses','Les satrapes','Les armées du Grand Roi'],calm:['tiennent conseil à la cour','lèvent le tribut dans leurs provinces']},
 rom:{who:['Les Romains','Les légions','Les sénateurs'],calm:['renforcent leurs camps','palabrent au Sénat']},
 scy:{who:['Les Scythes','Les cavaliers des steppes','Les archers scythes'],calm:['laissent paître leurs chevaux','lèvent le camp sans bruit']},
 vik:{who:['Les Vikings','Les jarls','Les guerriers du Nord'],calm:['réparent leurs navires','se racontent leurs sagas']}};
const pick=a=>a[Math.floor(Math.random()*a.length)];
function story(){const T=TURN,F=FL[S.nat],cl=[];
  if(T.kok)cl.push('se proclament Rois des rois');
  if(T.fame)cl.push(pick(['couvrent leur nom de gloire avec','entrent dans la légende grâce à'])+' '+T.fame);
  if(T.took.length)cl.push(pick(['mettent la main sur','acquièrent','raflent'])+' '+et(T.took.slice(0,3).map(nice)));
  if(T.found.length)cl.push(pick(['découvrent','adoptent','mettent au point'])+' '+et(T.found.slice(0,2).map(nice)));
  if(T.reg.length)cl.push(pick(['annexent','colonisent','occupent'])+' '+et(T.reg.slice(0,2)));
  if(T.abn&&!T.fame&&!T.kok)cl.push('délaissent '+(T.abn>1?T.abn+' Régions':'une Région'));
  if(T.ex)cl.push(pick(['chassent','écartent','font disparaître'])+' '+(T.ex>1?T.ex+' cartes':'une carte')+' du Marché');
  if(T.arch.length)cl.push(T.arch.length>2?pick(['inscrivent plusieurs hauts faits dans leur Histoire','gravent plusieurs exploits dans les mémoires']):pick(['inscrivent','font entrer'])+' '+et(T.arch)+' dans leur Histoire');
  if(T.ret)cl.push(pick(['apaisent des troubles','ramènent le calme chez eux','matent une révolte']));
  const w=pick(F.who);
  const s1=(T.emp?'Désormais à la tête d\'un Empire, '+w[0].toLowerCase()+w.slice(1):w)+' '+(cl.length?et(cl.slice(0,3)):pick(F.calm))+'.';
  const gains=['mat','pop','prog'].filter(r=>T.g[r]>0).map(r=>qt(T.g[r],r));
  const ni=T.hit.filter(h=>h===INSHIT).length,hit=[...new Set(T.hit.filter(h=>h!==INSHIT))];
  if(ni)hit.push(ni>1?ni+' Instabilités semées dans votre camp':INSHIT);
  let s2='';
  if(hit.length)s2=pick(['Vous n\'êtes pas épargné : ','Vous en faites les frais : ','Leur ombre s\'étend jusqu\'à vous : '])+et(hit)+(gains.length?pick([', pendant que leur trésor grossit de ',', et leurs coffres se remplissent de '])+et(gains):'')+'.';
  else if(T.blocked)s2=pick(['Vos défenses ont tenu bon','Vous avez repoussé leur assaut'])+(gains.length?', mais '+pick(['leur trésor grossit de ','ils engrangent '])+et(gains):'')+'.';
  else if(gains.length)s2=pick(['Leur trésor grossit de ','Leurs coffres se remplissent de ','Ils engrangent '])+et(gains)+'.';
  return s1+(s2?' '+s2:'')}
const INSHIT='une Instabilité semée dans votre camp';
let META=null;try{META=JSON.parse(localStorage.getItem('imperium-meta'))}catch(e){}
META=Object.assign({hist:[],camp:null,lib:{}},META||{});
const saveMeta=()=>{try{localStorage.setItem('imperium-meta',JSON.stringify(META))}catch(e){}};
const drop=()=>{try{localStorage.removeItem('civ-antique')}catch(e){}};
const pl=(n,w)=>n+' '+w+(n>1?'s':'');
let REC=null;
const clone=x=>JSON.parse(JSON.stringify(x));
let TR=null;
const CX={rom:1,per:1,mac:1,car:2,cel:2,scy:2,gre:3,vik:3};
const BD={scy:[1,'Abordable'],cel:[2,'Coriace'],per:[2,'Coriace'],rom:[2,'Coriace'],gre:[2,'Coriace'],vik:[3,'Redoutable'],mac:[3,'Redoutable'],car:[3,'Redoutable']};
const loadTR=()=>{try{return JSON.parse(localStorage.getItem('imperium-train'))}catch(e){return null}};
const saveTR=()=>{try{localStorage.setItem('imperium-train',JSON.stringify(TR))}catch(e){}};
const dropTR=()=>{try{localStorage.removeItem('imperium-train')}catch(e){}};
const pct=(w,n)=>n?Math.round(100*w/n):0;
const bar=(w,n)=>`<span class="wbar" role="img" aria-label="${pct(w,n)} % de victoires"><i style="width:${pct(w,n)}%"></i></span>`;
function stats(){const H=META.hist.filter(g=>g.mode!=='train'),T=META.hist.filter(g=>g.mode==='train');let h='<h3>Statistiques</h3>';
  if(!H.length&&!T.length)return h+'<p class="muted">Elles apparaîtront après votre première partie terminée.</p>';
  if(H.length){const W=H.filter(g=>g.res==='Victoire').length,sc=H.filter(g=>g.me!=null),gap=sc.length?Math.round(sc.reduce((a,g)=>a+g.me-g.civ,0)/sc.length):null,best=sc.length?Math.max(...sc.map(g=>g.me)):null;
    h+=`<div class="kpis"><div><b>${pct(W,H.length)} %</b><span>de victoires (${W}/${H.length})</span></div><div><b>${best==null?'–':best}</b><span>meilleur score</span></div><div><b>${gap==null?'–':(gap>0?'+':'')+gap}</b><span>écart moyen avec la C.I.V.</span></div></div>`;
    const grp=(k,order)=>{const m={};H.forEach(g=>{(m[g[k]]=m[g[k]]||[]).push(g)});return (order||Object.keys(m)).filter(x=>m[x]).map(x=>{const v=m[x],w=v.filter(g=>g.res==='Victoire').length;return `<tr><td>${x}</td><td class="num">${w}/${v.length}</td><td>${bar(w,v.length)}</td></tr>`}).join('')};
    h+=`<div class="tw"><table class="st"><tr><th>Adversaire</th><th class="num">Victoires</th><th></th></tr>${grp('bot',Object.values(NAT).map(N=>N.name))}</table></div>`;
    h+=`<div class="tw"><table class="st"><tr><th>Niveau</th><th class="num">Victoires</th><th></th></tr>${grp('lvl',DIFF.map(d=>d[0]))}</table></div>`}
  if(T.length){const b=Math.max(...T.map(g=>g.me||0));h+=`<p>Entraînement : ${pl(T.length,'partie')}, meilleur score ${b} points.</p>`}
  return h}
function library(){const L=Object.entries(META.lib).sort((a,b)=>a[1].n.localeCompare(b[1].n));
  return `<details><summary>Cartes du Marché connues (${L.length})</summary>${L.length?`<p class="muted" style="font-size:14px">Les cartes que vous avez décrites. Touchez ✕ pour en retirer une.</p><ul class="lib">${L.map(([k,x])=>`<li><span>${x.n}${x.cat?' '+chip(x.cat):''}${x.vp?' · '+x.vp+' PV':''}</span><button type="button" class="del" data-del="${k}" aria-label="Retirer ${x.n}">✕</button></li>`).join('')}</ul>`:'<p class="muted">Aucune pour l\'instant. Chaque carte que vous décrivez pendant une partie est retenue ici.</p>'}</details>`}
function idle(){const C=META.camp;let h='<h2>Suivi</h2>';
  h+=stats()+'<h3>Campagne</h3>';
  h+=C?`<p>Vous jouez les ${C.me} : ${pl(C.wins,'victoire')}, ${pl(C.losses,'défaite')} sur 4 permises. Prochain niveau : ${DIFF[C.level][0]}.</p>`
    +(C.added.length?`<p>Ajoutées à votre deck de départ : ${C.added.join(', ')}.</p>`:'')+(C.removed.length?`<p>Retirées de votre deck de départ : ${C.removed.join(', ')}.</p>`:''):'<p>Aucune campagne en cours.</p>';
  h+='<h3>Historique</h3>'+(META.hist.length?'<div class="tw"><table><tr><th>Date</th><th>Partie</th><th>Niveau</th><th>Vous</th><th>C.I.V.</th><th>Résultat</th></tr>'
    +META.hist.slice(0,15).map(g=>`<tr><td>${g.d}</td><td>${g.mode==='train'?'Entraînement ('+g.nation+')':g.bot}</td><td>${g.lvl}${g.camp?' (campagne)':''}</td><td>${g.me==null?'':g.me}</td><td>${g.civ==null?'–':g.civ}</td><td>${g.res}</td></tr>`).join('')+'</table></div>':'<p>Aucune partie terminée pour l\'instant.</p>');
  return h+'<h3>Bibliothèque</h3>'+library()}
function trainBoard(){const used=12-TR.left;
  $('#hd').textContent=`Entraînement · ${TR.me} · tour ${Math.min(TR.turn,12)} sur 12`;
  return `<h2>Entraînement</h2><p>Vous jouez les <b>${TR.me}</b>, sans adversaire.</p><h3>Sablier : ${TR.left} Progrès restants</h3>
   <div class="hourglass" role="img" aria-label="${TR.left} jetons sur 12">${Array.from({length:12},(_,i)=>`<i class="${i<used?'gone':''}"></i>`).join('')}</div>
   <h3>Repères</h3><ul class="cards"><li>50 points : les bases sont acquises.</li><li>90 points : vos exploits marqueront l'Histoire.</li></ul>
   <h3>À chaque tour</h3><ol class="cards"><li>Jouez votre tour normalement.</li><li>Au Nettoyage, le Progrès posé sur le Marché vient du sablier, pas du stock.</li><li>Ensuite, vous pouvez exiler une carte du Marché.</li><li>Résolvez vos effets Solstice.</li></ol>`}
async function trainStart(me){TR={me,turn:1,left:12};saveTR();board();$('#title').textContent='Mise en place';const p=$('#prompt');
  p.innerHTML=`<h3 style="margin-top:0">Mise en place de l'entraînement</h3><ol class="setup"><li>Installez votre nation (${me}) et le Marché exactement comme pour une partie à 2 joueurs.</li>
   <li>Exilez les <b>15 premières cartes</b> de la pioche Principale : posez-les face visible dans la pile Exil.</li>
   <li>Mettez <b>12 jetons Progrès</b> à côté du Marché : c'est votre sablier.</li><li>Pas de cartes C.I.V. : l'application compte simplement les tours.</li></ol>
   <div class="row"><button type="button" class="pri" id="go2">Commencer l'entraînement</button></div>`;
  await new Promise(r=>$('#go2').onclick=r);p.innerHTML='';trainLoop()}
async function trainLoop(){
  while(true){saveTR();LOG=[];drawLog();$('#title').textContent=`Tour ${TR.turn} sur 12`;
    const r=await ask(`Jouez votre tour normalement. Quand vous arrivez au Nettoyage, touchez le premier bouton.`,[['J\'arrive au Nettoyage','go'],['Un effet de carte termine la partie','end',''],['Effondrement','col',''],['Abandonner l\'entraînement','quit','warn']]);
    if(r==='quit'){if(await ask('Abandonner cet entraînement ? Il ne sera pas enregistré.',[['Oui, abandonner',1,'warn'],['Non, continuer',0]])){dropTR();TR=null;return start()}continue}
    if(r==='col'){log('<b>Effondrement</b> : la pile Instabilités est vide. La partie s\'arrête sur-le-champ.','you');return trainEnd(true)}
    if(r==='end'){log('Un effet de carte met fin à la partie : comptons vos points.','end');return trainEnd(false)}
    TR.left--;board();
    await ask(`Nettoyage : posez <b>1 Progrès du sablier</b> (et non du stock) sur une carte du Marché. Il en restera ${TR.left}. Ensuite, vous pouvez exiler une carte du Marché, comme le ferait un second joueur.`,[['Fait',1]],'Puis terminez votre Nettoyage comme d\'habitude : jetons, défausse, pioche.');
    await ask('Fin du tour : résolvez maintenant vos effets Solstice.',[['Solstice résolu',1]]);
    if(TR.left<=0){log('<b>Le sablier est vide</b> : douze tours sont passés.','end');return trainEnd(false)}
    TR.turn++}}
async function trainEnd(collapse){const me=await scoreSheet(collapse?'Effondrement : comptez quand même vos points pour mesurer vos progrès.':'Fin de l\'entraînement : comptez vos points.');
  const lvl=me>=90?'Exploit':me>=50?'Bases acquises':'À retravailler';
  log(me>=90?`<b>${me} points.</b> Vos exploits marqueront l'Histoire. La C.I.V. n'a qu'à bien se tenir.`:me>=50?`<b>${me} points.</b> Vous avez assimilé les règles et les stratégies de base : vous êtes prêt à affronter la C.I.V.`:`<b>${me} points.</b> Encore un peu d'entraînement : le livret fixe le premier palier à 50 points.`,me>=50?'end':'you');
  META.hist.unshift({d:new Date().toLocaleDateString('fr-FR'),mode:'train',nation:TR.me,bot:'Entraînement',lvl:'–',me,civ:null,res:lvl});META.hist=META.hist.slice(0,50);saveMeta();
  dropTR();TR=null;board();const p=$('#prompt');p.innerHTML='<div class="row"><button type="button" class="pri" id="again">Nouvelle partie</button></div>';$('#again').onclick=start}
function scoreSheet(title){return new Promise(res=>{const p=$('#prompt'),F=[['x1','Points des cartes à valeur fixe'],['x2','Points des cartes à étoile (10 au plus par carte)'],['x3','Points des cartes à point d\'interrogation dont la condition est remplie'],['x4','Nombre de cartes Instabilités (−2 chacune)'],['x5','Autres points négatifs'],['x6','Jetons Progrès dans votre réserve']];
  if(window.AUTO)return res(42);
  p.innerHTML=`<div class="q">${title}</div><div class="hint">Comptez toutes vos cartes : main, zone de jeu, deck, défausse, Histoire, cartes réservées et carte Puissance. Laissez de côté la pioche Nation et les Développements non payés.</div><div class="form">
   ${F.map(([i,l])=>`<label class="f" for="${i}">${l}<input type="number" id="${i}" min="0" value="0"></label>`).join('')}
   <div>Total : <span class="big" id="xt">0</span> points</div><div class="row"><button type="button" class="pri" id="xok">Valider mon score</button></div></div>`;
  const tot=()=>{const v=i=>Math.max(0,+$('#'+i).value||0);return v('x1')+v('x2')+v('x3')-2*v('x4')-v('x5')+v('x6')};
  p.querySelectorAll('input').forEach(i=>i.addEventListener('input',()=>$('#xt').textContent=tot()));
  $('#xok').onclick=()=>{const t=tot();p.innerHTML='';res(t)}})}
const save=()=>{try{localStorage.setItem('civ-antique',JSON.stringify(S))}catch(e){}};
const load=()=>{try{return JSON.parse(localStorage.getItem('civ-antique'))}catch(e){return null}};
function log(t,k=''){LOG.push([t,k]);drawLog()}
function drawLog(){const l=$('#log');l.innerHTML=LOG.map(([t,k])=>`<li class="${k}">${t}</li>`).join('');window.IMP_LINK(l)}
function cname(x){return `<b>${x.n}</b>`+(x.cat?' '+chip(x.cat):'')}
function botScore(){const all=[...S.deck,...S.discard,...S.hist,...S.play,...S.slots.filter(Boolean)];
  const cards=all.reduce((a,x)=>a+x.vp,0),div=S.diff>=3?5:10,r=Math.floor((S.res.mat+S.res.pop)/div);
  return {cards,prog:S.res.prog,r,div,total:cards+S.res.prog+r,n:all.length,ins:all.filter(x=>x.cat==='ins').length}}
function board(){const b=$('#board');if(TR){b.innerHTML=trainBoard();return}if(!S){b.innerHTML=idle();return}
  const sc=botScore(),li=a=>a.length?`<ul class="cards">${a.map(x=>`<li>${x.n}${x.cat?' · '+CAT[x.cat]:''}${x.vp?' · '+x.vp+' PV':''}</li>`).join('')}</ul>`:'<p style="color:var(--muted);margin:6px 0 0">Aucune carte.</p>';
  $('#hd').textContent=`${NAT[S.nat].name} · ${DIFF[S.diff][0]} · manche ${S.round}`;
  b.innerHTML=`<h2>${NAT[S.nat].name} <span class="pill">${S.state==='B'?'Barbare':'Empire'}</span></h2>
  <div class="stat"><div><b>${S.res.mat}</b><span>Matériaux</span></div><div><b>${S.res.pop}</b><span>Population</span></div><div><b>${S.res.prog}</b><span>Progrès</span></div>
  <div><b>${S.deck.length}</b><span>Deck</span></div><div><b>${S.discard.length}</b><span>Défausse</span></div><div><b>${S.dyn.length}</b><span>Dynastie</span></div></div>
  <h3>Emplacements</h3><div class="slots">${S.slots.map((x,i)=>i?`<div class="slot${x?'':' empty'}${S.skip===i?' skip':''}">${i}</div>`:'').join('')}</div>
  <h3>Score actuel : ${sc.total} points</h3><p style="font-size:14px;color:var(--muted)">${sc.cards} par les cartes, ${sc.prog} par le Progrès, ${sc.r} par les ressources (1 par ${sc.div}). ${sc.ins} Instabilité${sc.ins>1?'s':''} en sa possession.</p>
  <details open><summary>Régions en jeu (${S.play.length})</summary>${li(S.play)}</details>
  <details><summary>Défausse (${S.discard.length})</summary>${li(S.discard)}</details>
  <details><summary>Histoire (${S.hist.length})</summary>${li(S.hist)}</details>`}
function undoBtn(p){if(!REC||!REC.ans.length)return;const d=document.createElement('div');d.className='row';d.style.marginTop='12px';
  const b=document.createElement('button');b.type='button';b.className='undo';b.textContent='Annuler ma dernière réponse';
  b.onclick=()=>{const r=REC;S=JSON.parse(r.snap);botTurn(r.ans.slice(0,-1))};d.append(b);p.append(d)}
function ask(q,btns,hint){board();
  if(window.AUTO)return Promise.resolve(window.AUTO(btns));
  if(REC&&REC.q.length){const v=REC.q.shift();REC.ans.push(v);return Promise.resolve(v)}
  return new Promise(res=>{const p=$('#prompt');
    p.innerHTML=`<div class="q">${q}</div>${hint?`<div class="hint">${hint}</div>`:''}<div class="row"></div>`;
    btns.forEach(([l,v,k],i)=>{const b=document.createElement('button');b.type='button';b.textContent=l;b.className=k||(i?'':'pri');b.onclick=()=>{p.innerHTML='';if(REC)REC.ans.push(v);res(v)};$('.row',p).append(b)});
    window.IMP_LINK(p);undoBtn(p);p.scrollIntoView({block:'nearest'})})}
let todo=(t,k='do')=>{log(t,k);return ask(t,[['Fait',true]])};

function cardForm(title,{fixed,tokens,unrest}){
  if(window.AUTO){const k=fixed||ALL[rnd(4)];return Promise.resolve({card:c('Carte test',{cat:k,st:[null,'B','E'][rnd(3)],perm:rnd(2)>0,atk:rnd(3)===0,vp:rnd(6)}),tok:{mat:0,pop:0,prog:tokens?rnd(3):0},un:!!unrest&&k!=='reg'})}
  if(REC&&REC.q.length){const v=clone(REC.q.shift());REC.ans.push(clone(v));return Promise.resolve(v)}
  return new Promise(res=>{const p=$('#prompt');
    p.innerHTML=`<div class="q">${title}</div><div class="form"><div id="libbox"></div>
    <label class="f" for="fn">Nom de la carte<input type="text" id="fn" autocomplete="off"></label>
    ${fixed?'':`<div><div class="hint" style="margin:0 0 4px">Catégorie (couleur du bandeau)</div><div class="row" id="fc">${[...ALL,'none'].map(k=>`<button type="button" data-k="${k}">${k==='none'?'Aucune':CAT[k]}</button>`).join('')}</div></div>`}
    <div class="checks"><div class="hint" style="margin:0 0 4px">Icônes en haut de la carte</div>
      <label><input type="checkbox" id="fp"> Permanent (∞)</label><label><input type="checkbox" id="fa"> Attaque (épée)</label>
      <label><input type="checkbox" id="fb"> Barbare</label><label><input type="checkbox" id="fe"> Empire</label></div>
    <div class="row"><label class="f" for="fv">Points de victoire<input type="number" id="fv" value="0"></label><span class="hint" style="margin:0">Étoile : compte 5. Point d'interrogation : sa valeur maximale.</span></div>
    ${tokens?`<div class="row"><label class="f" for="t1">Progrès posés dessus<input type="number" id="t1" min="0" value="0"></label><label class="f" for="t2">Matériaux dessus<input type="number" id="t2" min="0" value="0"></label><label class="f" for="t3">Population dessus<input type="number" id="t3" min="0" value="0"></label></div>`:''}
    ${unrest?`<div class="checks"><label><input type="checkbox" id="fu" checked> Une Instabilité était glissée dessous</label></div>`:''}
    <div class="row"><button type="button" class="pri" id="fok">Valider</button><span class="hint" id="ferr" style="margin:0;color:var(--bad)"></span></div></div>`;
    let cat=fixed||null;
    const setCat=k=>{cat=k;p.querySelectorAll('#fc button').forEach(x=>x.classList.toggle('sel',x.dataset.k===k));if(unrest)$('#fu').checked=k!=='reg'};
    if(!fixed)p.querySelectorAll('#fc button').forEach(b=>b.onclick=()=>setCat(b.dataset.k));
    const drawLib=()=>{const q=norm($('#fn').value),L=Object.values(META.lib).filter(x=>(!fixed||x.cat===fixed)&&(!q||norm(x.n).includes(q))).sort((a,b)=>a.n.localeCompare(b.n)).slice(0,12);
      $('#libbox').innerHTML=L.length?'<div class="hint" style="margin:0 0 4px">Cartes déjà connues : touchez un nom pour remplir la fiche.</div><div class="row"></div>':'';
      L.forEach(x=>{const b=document.createElement('button');b.type='button';b.textContent=x.n;b.onclick=()=>{$('#fn').value=x.n;if(!fixed)setCat(x.cat||'none');$('#fp').checked=x.perm;$('#fa').checked=x.atk;$('#fb').checked=x.st==='B';$('#fe').checked=x.st==='E';$('#fv').value=x.vp;drawLib()};$('#libbox .row').append(b)})};
    $('#fn').addEventListener('input',drawLib);drawLib();
    $('#fok').onclick=()=>{if(!cat){$('#ferr').textContent='Choisissez la catégorie de la carte.';return}
      const v=id=>Math.max(0,+($('#'+id)||{}).value||0),k=cat==='none'?null:cat,name=$('#fn').value.trim();
      const card=c(name||(k?CAT[k]+' du Marché':'Carte du Marché'),{cat:k,perm:$('#fp').checked,atk:$('#fa').checked,st:$('#fb').checked?'B':$('#fe').checked?'E':null,vp:+$('#fv').value||0});
      if(name){META.lib[norm(name)]=clone(card);saveMeta()}
      const out={card,tok:{prog:v('t1'),mat:v('t2'),pop:v('t3')},un:unrest?$('#fu').checked:false};p.innerHTML='';if(REC)REC.ans.push(clone(out));res(out)};
    undoBtn(p);p.scrollIntoView({block:'nearest'})})}

/* ---------- actions élémentaires de la C.I.V. ---------- */
function gain(o){const parts=[];for(const r of ['mat','pop','prog'])if(o[r]){S.res[r]+=o[r];if(TURN)TURN.g[r]+=o[r];parts.push(o[r]+' '+chip(r))}
  if(parts.length)log('La C.I.V. gagne '+parts.join(' et ')+'.');return parts.length>0}
function trigger(why){if(S.trig==null){S.trig=S.round;log(`<b>Décompte déclenché</b> : ${why}. On termine cette manche, puis on joue une dernière manche complète.`,'end')}}
function toDiscard(x,why){S.discard.push(x);if(x.adv&&NAT[S.nat].flip&&S.state==='B'){S.state='E';if(TURN)TURN.emp=true;log(`La carte Avènement ${cname(x)} rejoint la défausse : <b>la C.I.V. devient Empire</b>. Son nouveau tableau s'applique dès maintenant.`,'end')}}
function millN(n){let k=0;while(k<n&&S.deck.length){const x=S.deck.shift();toDiscard(x);log(`La première carte de son deck part en défausse : ${cname(x)}.`);k++}
  if(k<n)log('Son deck est vide : rien de plus à défausser.');return k>0}
function dyn(){if(!S.dyn.length){log('Sa pioche Dynastie est vide.');return false}
  const x=S.dyn.shift();log(`La première carte de la pioche Dynastie rejoint sa défausse : ${cname(x)}.`);toDiscard(x);
  if(!S.dyn.length)trigger('la pioche Dynastie de la C.I.V. est épuisée');return true}
async function getIns(){S.deck.unshift(INS());await todo('Prenez une carte Instabilités dans la pile commune et posez-la sur le tas « Instabilités de la C.I.V. ». Si c\'était la dernière de la pile, déclarez l\'Effondrement.')}
const RULE='Prenez celle qui vaut le plus de points (étoile = 5, point d\'interrogation = valeur maximale, +1 par Progrès posé dessus). Égalité : celle qui porte le plus de jetons, puis le plus petit emplacement.';
async function takeFromMarket(verb,list,isAcq){
  const ok=await ask(`La C.I.V. ${verb} une carte ${cats(list)}. Y en a-t-il au moins une parmi les cinq cartes du Marché ?`,[['Oui',1],['Non, aucune',0]],RULE);
  if(!ok)return null;
  const r=await cardForm(`Décrivez la carte que la C.I.V. prend au Marché.`,{fixed:list.length===1?list[0]:null,tokens:true,unrest:isAcq});
  gain(r.tok);S.deck.unshift(r.card);if(TURN)(isAcq?TURN.took:TURN.found).push(r.card.n);
  let t=`La C.I.V. ${verb} ${cname(r.card)} : la carte va sur son deck. Retirez-la du Marché et mettez-la sur le tas « cartes de la C.I.V. », rendez ses jetons au stock, puis complétez le Marché.`;
  if(isAcq&&r.un){S.deck.unshift(INS());t+=' L\'Instabilité qui était dessous va sur le tas « Instabilités de la C.I.V. ».'}
  else if(!isAcq&&r.card.cat!=='reg')t+=' L\'Instabilité qui était dessous retourne dans la pile commune.';
  await todo(t);return r.card}
async function kok(){if(S.kok){log('La C.I.V. a déjà résolu Roi des rois : rien ne se passe.');return false}
  S.kok=true;if(TURN)TURN.kok=true;
  if(S.state==='B'){gain({prog:6});log('Il ne reste que Roi des rois : en Barbare, la C.I.V. gagne 6 Progrès à la place. La carte reste où elle est.')}
  else{gain({prog:3});if(S.dyn.length){const x=S.dyn.shift();S.deck.unshift(x);log(`Roi des rois : la C.I.V. gagne 3 Progrès et met ${cname(x)} de sa pioche Dynastie sur son deck.`);if(x.adv&&S.state==='B')S.state='E'}
    trigger('la C.I.V. gagne Roi des rois')}
  return true}
async function fameCard(to){
  const r=await ask('La C.I.V. gagne une carte '+chip('ren')+'. Que reste-t-il dans la pioche Renommée ?',[['Au moins une carte face cachée',1],['Seulement Roi des rois',2]]);
  if(r===2)return kok();
  const f=await cardForm('Prenez la première carte de la pioche Renommée et décrivez-la.',{fixed:'ren'});if(TURN)TURN.fame=nice(f.card.n);
  if(to==='hist'){S.hist.push(f.card);await todo(`${cname(f.card)} est archivée dans l'Histoire de la C.I.V. Mettez-la sur le tas « cartes de la C.I.V. ».`)}
  else{S.deck.unshift(f.card);await todo(`${cname(f.card)} va sur le deck de la C.I.V. Mettez-la sur le tas « cartes de la C.I.V. ».`)}
  return true}
const canPay=x=>x.t==='sp'?S.res[x.r]>=x.n:x.t==='abn'?S.play.length>=x.n:true;
function pay(x){if(x.t==='sp'){S.res[x.r]-=x.n;log(`La C.I.V. dépense ${x.n} ${chip(x.r)}.`)}
  else{if(TURN)TURN.abn+=x.n;for(let i=0;i<x.n;i++){const r=S.play.pop();toDiscard(r);log(`La C.I.V. abandonne ${cname(r)} : la Région part dans sa défausse.`)}}}
const YOU={ins:['Vous récupérez une carte Instabilités : prenez-la dans la pile commune.',1],aban:['Vous abandonnez une de vos Régions en jeu.',1],recall:['Vous rappelez une de vos Régions en jeu dans votre main.',1],
  recallperm:['Vous rappelez dans votre main une de vos cartes permanentes en jeu.',1],draw:['Vous pouvez piocher 1 carte.',0]};
async function youDo(k,o){
  if(k==='scy'){const e=await ask('Êtes-vous en Empire ?',[['Non',0],['Oui',1]]);if(e){S.res.pop++;if(TURN)TURN.hit.push('une Population versée en tribut');log('Vous donnez 1 '+chip('pop')+' à la C.I.V.','you');await ask('Donnez 1 Population de votre réserve à la C.I.V. (remettez-la au stock).',[['Fait',1]])}return !!e}
  let t,atk;if(k==='disc'){t=`Vous défaussez ${o} carte${o>1?'s':''} de votre main.`;atk=1}
  else if(k==='gain'){t='Vous gagnez '+Object.entries(o).map(([r,n])=>n+' '+chip(r)).join(' et ')+'.';atk=0}
  else[t,atk]=YOU[k];
  const r=await ask(t,atk?[['Fait',1],['Annulé par une de mes cartes',0,'']]:[['Vu',1]],atk?'Cet effet compte comme une Attaque : vos cartes de protection fonctionnent.':'');
  if(TURN&&atk){if(!r)TURN.blocked++;else TURN.hit.push(k==='ins'?INSHIT:k==='aban'?'une Région abandonnée':k==='recall'?'une Région rappelée':k==='recallperm'?'une carte permanente rappelée':o>1?o+' cartes défaussées':'une carte défaussée')}
  log(t+(r?'':' Annulé par votre protection.'),'you');return true}
async function run(x,ctx){
  switch(x.t){
  case'gain':return gain(x);
  case'per':{const n=S.play.length,o={};for(const r in x.o)o[r]=x.o[r]*n;if(!n)log('Aucune Région en jeu : aucun gain.');return gain(o)}
  case'arch':ctx.dest='hist';return true;
  case'play':ctx.dest='play';return true;
  case'top':ctx.dest='top';return true;
  case'mill':return millN(x.n);
  case'dyn':return dyn();
  case'exile':{const r=await ask('La C.I.V. exile une carte du Marché : celle du plus petit emplacement qui ne porte aucun jeton.',[['Fait',1],['Impossible : toutes portent des jetons',0,'']],'Mettez-la dans la pile Exil, remettez l\'Instabilité qui était dessous dans la pile commune, puis complète le Marché.');
    if(r&&TURN)TURN.ex++;log(r?'Une carte du Marché est exilée.':'Aucune carte du Marché ne peut être exilée.','do');return !!r}
  case'acq':return !!(await takeFromMarket('acquiert',x.c,true));
  case'acqex':{const ok=await ask(`La C.I.V. acquiert une ${chip(x.c)} de la pile Exil. Y en a-t-il une ?`,[['Oui',1],['Non',0]],'S\'il y en a plusieurs, elle prend celle qui vaut le plus de points.');if(!ok)return false;
    const r=await cardForm('Décrivez la Région prise dans la pile Exil.',{fixed:x.c});S.deck.unshift(r.card);if(TURN)TURN.took.push(r.card.n);await todo(`${cname(r.card)} va sur le deck de la C.I.V. Mettez-la sur le tas « cartes de la C.I.V. ».`);return true}
  case'inn':{if(await takeFromMarket('innove',[x.c],false))return true;
    const hasPile=x.c!=='vas';
    const r=await ask(`Aucune ${chip(x.c)} au Marché. ${hasPile?`Prenez la première carte face cachée de la pioche ${CAT[x.c]}. Si cette pioche est vide, révélez`:'Révélez'} les cartes de la pioche Principale une à une jusqu'à la première ${chip(x.c)}, puis remélange les autres dedans.`,[['J\'ai une carte',1],['Aucune carte de cette catégorie',0,'']]);
    if(!r){log('Aucune carte disponible : la C.I.V. gagne 2 Progrès à la place.');gain({prog:2});return true}
    const f=await cardForm('Décrivez la carte obtenue.',{fixed:x.c});S.deck.unshift(f.card);if(TURN)TURN.found.push(f.card.n);await todo(`La C.I.V. innove ${cname(f.card)} : la carte va sur son deck. Mettez-la sur le tas « cartes de la C.I.V. ».`);return true}
  case'fame':return fameCard('deck');
  case'famearch':return fameCard('hist');
  case'conv':{const n=S.res[x.from];if(!n)return false;S.res[x.from]=0;S.res[x.to]+=n;log(`La C.I.V. dépense ses ${n} ${chip(x.from)} et gagne ${n} ${chip(x.to)}.`);return true}
  case'rep':{const k=Math.floor(S.res[x.r]/x.n);if(!k)return false;S.res[x.r]-=k*x.n;S.res.prog+=k;log(`La C.I.V. dépense ${k*x.n} ${chip(x.r)} et gagne ${k} ${chip('prog')}.`);return true}
  case'scygl':{const n=S.res.mat;if(!n)return false;S.res.mat=0;log(`La C.I.V. dépense ses ${n} ${chip('mat')}.`);millN(Math.ceil(n/2));return true}
  case'ret':{const i=S.discard.findIndex(y=>y.cat==='ins');if(i<0)return false;S.discard.splice(i,1);if(TURN)TURN.ret++;
    await todo('La C.I.V. renvoie une Instabilité de sa défausse : remettez une carte du tas « Instabilités de la C.I.V. » dans la pile commune.');return true}
  case'regtop':case'regplay':{let i=-1;S.discard.forEach((y,j)=>{if(y.cat==='reg')i=j});if(i<0)return false;const r=S.discard.splice(i,1)[0];
    if(x.t==='regtop'){S.deck.unshift(r);log(`La C.I.V. récupère ${cname(r)} de sa défausse et la place sur son deck.`)}else{S.play.push(r);if(TURN)TURN.reg.push(r.n);log(`La C.I.V. met en jeu ${cname(r)} depuis sa défausse.`)}return true}
  case'steal':{let got={mat:0,prog:0};
    for(const r of ['mat','prog'])if(x[r]){const b=[];for(let i=x[r];i>=0;i--)b.push([i?`${i} donné${i>1?'s':''}`:'Rien (je n\'en ai pas, ou protection)',i,i===x[r]?'pri':'']);
      got[r]=await ask(`La C.I.V. vous vole ${x[r]} ${chip(r)}. Combien lui en donnez-vous ?`,b,'C\'est une Attaque. Donnez ce que vous pouvez, puis remettez ces jetons au stock : l\'application les ajoute à la C.I.V.')}
    if(!got.mat&&!got.prog){if(TURN)TURN.blocked++;log('Le vol ne rapporte rien à la C.I.V.','you');return false}
    if(TURN)TURN.hit.push('un vol de '+et(['mat','prog'].filter(r=>got[r]).map(r=>qt(got[r],r))));
    log('La C.I.V. vous vole '+['mat','prog'].filter(r=>got[r]).map(r=>got[r]+' '+chip(r)).join(' et ')+'.','you');S.res.mat+=got.mat;S.res.prog+=got.prog;return true}
  case'you':return youDo(x.k,x.o);
  case'alt':{for(const b of x.b){
      if(b.if&&!b.if(S))continue;
      if(b.c&&!b.c.every(canPay))continue;
      if(b.g){const st={dest:ctx.dest};if(!(await run(b.g,st)))continue}
      (b.c||[]).forEach(pay);let did=!!(b.g||b.c);
      for(const y of b.d||[])did=(await run(y,ctx))||did;
      return did}
    return false}
  }return false}

const ROWNAME={ren:'Renommée',reg:'Région',tra:'Tradition',vas:'Vassal',civ:'Civilisé',B:'icône Barbare',E:'icône Empire',perm:'carte permanente',atk:'Attaque',autre:'Autre'};
const matches=(x,k)=>CAT[k]?(x.cat===k||x.cat2===k):k==='B'||k==='E'?x.st===k:k==='perm'?x.perm:k==='atk'?x.atk:k==='autre'?true:norm(x.n)===norm(k);
async function resolve(x,where){
  log(`${where} : ${x.n}`,'card');
  if(x.cat==='ins'){if(TURN)TURN.ret++;await todo('Instabilité : elle retourne dans la pile. Remettez une carte du tas « Instabilités de la C.I.V. » dans la pile commune.');return}
  for(const [k,eff] of T[S.nat][S.state]){if(!matches(x,k))continue;
    log(`Ligne appliquée : <b>${ROWNAME[k]||k}</b> (tableau ${S.state==='B'?'Barbare':'Empire'}).`);
    const ctx={dest:'disc'};let did=false;for(const a of eff)did=(await run(a,ctx))||did;
    if(!did){log('Rien de cette ligne ne peut être résolu : on passe à la ligne suivante qui correspond.');continue}
    if(ctx.dest==='hist'){S.hist.push(x);TURN.arch.push(x.n);log(`${cname(x)} est archivée dans son Histoire.`)}
    else if(ctx.dest==='play'){S.play.push(x);TURN.reg.push(x.n);log(`${cname(x)} entre en jeu chez la C.I.V.`)}
    else if(ctx.dest==='top'){S.deck.unshift(x);log(`${cname(x)} retourne sur son deck.`)}
    else{toDiscard(x);log(`${cname(x)} va dans sa défausse.`)}
    return}
  toDiscard(x);log(`Aucun effet possible : ${cname(x)} va dans sa défausse.`)}

/* ---------- déroulement ---------- */
function drawForSlot(){
  if(!S.deck.length){if(S.dyn.length)dyn();
    if(S.discard.length){S.deck=shuffle(S.discard);S.discard=[];log('La C.I.V. mélange sa défausse pour reformer son deck.')}}
  return S.deck.shift()||null}
async function botTurn(queue){
  REC={snap:JSON.stringify(S),ans:[],q:(queue||[]).map(clone)};LOG=[];TURN=newTurn();$('#title').textContent=`Manche ${S.round} : tour de la C.I.V.`;
  const die=1+rnd(6);S.skip=die<=S.n?die:0;
  log(`Dé : <b>${die}</b>. `+(S.skip?`La carte de l'emplacement ${die} ne sera pas résolue ce tour.`:'Aucun emplacement ne correspond : toutes les cartes sont résolues.'));
  for(let i=1;i<=S.n;i++){if(i===S.skip||!S.slots[i])continue;const x=S.slots[i];S.slots[i]=null;await resolve(x,'Emplacement '+i);board()}
  log('Nettoyage de la C.I.V.','card');
  if(S.skip&&S.skip<=5)await todo(`Ajoutez ${NAT[S.nat].cleanup||'1 Progrès'} du stock sur la carte du Marché de l'emplacement ${S.skip}.`);
  else log('Aucun jeton à ajouter au Marché ce tour.');
  if(S.skip>1){S.slots[1]=S.slots[S.skip];S.slots[S.skip]=null}
  S.skip=0;for(let i=1;i<=S.n;i++)if(!S.slots[i])S.slots[i]=drawForSlot();
  if(S.diff===1&&S.deck.length){const x=S.deck.shift();toDiscard(x);log(`Seigneur de guerre : la première carte de son deck part en défausse (${cname(x)}).`)}
  log('Ses emplacements sont de nouveau remplis.');
  const st=story();TURN=null;log(st,'story');
  await ask('<div class="story">'+st+'</div>Fin de la manche : résolvez maintenant vos effets Solstice. La C.I.V. n\'en a pas.',[['Solstice résolu',1]]);
  if(S.trig!=null&&S.round>S.trig)return endGame();
  S.round++;playerTurn()}
function adjust(){
  const p=$('#prompt');p.innerHTML=`<div class="q">Intervention manuelle</div><div class="hint">Pour les effets de vos propres cartes qui touchent la C.I.V., ou pour corriger une erreur.</div>
  <div class="row" id="adj"></div><div class="row" style="margin-top:10px" id="adj2"></div><div class="row" style="margin-top:14px"><button type="button" class="pri" id="adjok">Retour</button></div>`;
  for(const r of ['mat','pop','prog'])for(const d of [1,-1]){const b=document.createElement('button');b.type='button';b.textContent=(d>0?'+1 ':'−1 ')+RES[r];
    b.onclick=()=>{S.res[r]=Math.max(0,S.res[r]+d);board();save()};$('#adj').append(b)}
  const acts=[['Elle récupère une Instabilité',async()=>{await getIns()}],
    ['Elle pioche (1re carte du deck en défausse)',async()=>{LOG=[];millN(1)}],
    ['Elle gagne une carte',async()=>{const f=await cardForm('Décrivez la carte que la C.I.V. gagne.',{});S.deck.unshift(f.card)}],
    ['Elle abandonne une Région',async()=>{if(S.play.length)toDiscard(S.play.pop())}],
    ['Elle rappelle une Région',async()=>{if(S.play.length)S.deck.unshift(S.play.pop())}]];
  acts.forEach(([l,f])=>{const b=document.createElement('button');b.type='button';b.textContent=l;b.onclick=async()=>{await f();save();board();adjust()};$('#adj2').append(b)});
  $('#adjok').onclick=()=>playerTurn(true)}
async function playerTurn(keep){
  REC=null;if(!keep){save();LOG=[]}
  $('#title').textContent=`Manche ${S.round} : votre tour`;drawLog();
  const last=S.trig!=null;
  const r=await ask(last?(S.round>S.trig?'Dernière manche. Jouez votre tour normalement, Nettoyage compris.':'Le Décompte est déclenché. Terminez votre tour, Nettoyage compris.'):'Jouez votre tour normalement, Nettoyage compris. La C.I.V. jouera ensuite.',
    [['J\'ai terminé mon tour','go'],['Intervention manuelle','adj',''],...(last?[]:[['Le Décompte est déclenché','trig','']]),['Effondrement','col','warn']],
    last?'':'Déclarez le Décompte si la pioche Principale est vide, si vous Développez votre dernière carte ou si Roi des rois est retournée face cachée.');
  if(r==='go')return botTurn();
  if(r==='adj')return adjust();
  if(r==='trig'){trigger('vous l\'avez déclaré');return playerTurn(true)}
  if(r==='col'){const ok=await ask('La pile Instabilités est vide ?',[['Oui, Effondrement',1,'warn'],['Non, retour',0]]);if(ok)return endGame(true);return playerTurn(true)}}
function endGame(collapse){drop();REC=null;TURN=null;LOG=[];$('#title').textContent='Fin de la partie';const sc=botScore();board();
  if(collapse){log('<b>Effondrement.</b> En solo, la partie est perdue quelle que soit la répartition des Instabilités.','you');return finish(null,sc,true)}
  log(`Score de la C.I.V. : <span class="big">${sc.total}</span> points`,'end');
  log(`${sc.cards} points de cartes (${sc.n} cartes dans son deck, sa défausse, son Histoire, ses Régions en jeu et ses emplacements), ${sc.prog} pour le Progrès, ${sc.r} pour ses ${S.res.mat+S.res.pop} Matériaux et Population (1 point par ${sc.div}).`);
  const p=$('#prompt'),F=[['x1','Points des cartes à valeur fixe'],['x2','Points des cartes à étoile (10 au plus par carte)'],['x3','Points des cartes à point d\'interrogation dont la condition est remplie'],['x4','Nombre de cartes Instabilités (−2 chacune)'],['x5','Autres points négatifs'],['x6','Jetons Progrès dans votre réserve']];
  p.innerHTML=`<div class="q">Votre feuille de score</div><div class="hint">Comptez toutes vos cartes : main, zone de jeu, deck, défausse, Histoire, cartes réservées et carte Puissance. Laissez de côté la pioche Nation et les Développements non payés.</div><div class="form">
   ${F.map(([i,l])=>`<label class="f" for="${i}">${l}<input type="number" id="${i}" min="0" value="0"></label>`).join('')}
   <div>Total : <span class="big" id="xt">0</span> points</div><div class="row"><button type="button" class="pri" id="xok">Valider mon score</button></div></div>`;
  const tot=()=>{const v=i=>Math.max(0,+$('#'+i).value||0);return v('x1')+v('x2')+v('x3')-2*v('x4')-v('x5')+v('x6')};
  p.querySelectorAll('input').forEach(i=>i.addEventListener('input',()=>$('#xt').textContent=tot()));
  $('#xok').onclick=()=>finish(tot(),sc,false)}
function finish(me,sc,collapse){const win=!collapse&&me>sc.total,p=$('#prompt'),camp=S.camp&&META.camp;
  if(!collapse)log(win?`<b>Victoire</b> : ${me} à ${sc.total}.`:`La C.I.V. l'emporte ${sc.total} à ${me}. Il vous faut strictement plus de points qu'elle.`,win?'end':'you');
  META.hist.unshift({d:new Date().toLocaleDateString('fr-FR'),bot:NAT[S.nat].name,lvl:DIFF[S.diff][0],me,civ:sc.total,res:collapse?'Effondrement':win?'Victoire':'Défaite',camp:!!camp});META.hist=META.hist.slice(0,50);
  const again=()=>{p.innerHTML='<div class="row"><button type="button" class="pri" id="again">Nouvelle partie</button></div>';$('#again').onclick=start};
  if(camp){const C=META.camp;
    if(win){C.wins++;C.bonus=false;
      if(C.level>=4){log('<b>Campagne gagnée.</b> Vous avez vaincu la C.I.V. au niveau Suzerain.','end');META.camp=null;saveMeta();return again()}
      C.level++;saveMeta();
      p.innerHTML=`<div class="q">Récompense de campagne : choisissez l'une des deux options.</div><label class="f" for="rw">Nom de la carte<input type="text" id="rw" autocomplete="off"></label>
       <div class="row" style="margin-top:10px"><button type="button" id="rwa" class="pri">Ajouter cette carte commune gagnée à mon deck de départ</button><button type="button" id="rwr">Retirer cette carte de mon deck de départ</button></div>
       <div class="hint" style="margin:10px 0 0">Prochaine partie : niveau ${DIFF[C.level][0]}.</div>`;
      const done=k=>{const n=$('#rw').value.trim();if(!n){$('#rw').focus();return}C[k].push(n);saveMeta();log(k==='added'?`${n} rejoint votre deck de départ pour le reste de la campagne.`:`${n} quitte votre deck de départ pour le reste de la campagne.`,'end');again()};
      $('#rwa').onclick=()=>done('added');$('#rwr').onclick=()=>done('removed');return}
    C.losses++;C.bonus=true;
    if(C.losses>=4){log('<b>Campagne perdue</b> : quatre défaites.','you');META.camp=null}
    else log(`Campagne : ${pl(C.losses,'défaite')} sur 4 permises. Votre prochaine partie commence avec le double de ressources (6 Matériaux, 4 Population, 2 Progrès).`,'you')}
  saveMeta();again()}
function newGame(nat,diff){const N=NAT[nat],cl=x=>Object.assign({},x);
  const dev=shuffle(N.dev.map(cl)).sort((a,b)=>b.vp-a.vp);
  S={nat,diff,n:DIFF[diff][1],state:'B',round:1,res:diff>=3?{mat:3,pop:2,prog:1}:{mat:0,pop:0,prog:0},
    deck:shuffle(N.deck.map(cl)),discard:[],hist:[],play:[],dyn:[...shuffle(N.nat.map(cl)),Object.assign(cl(N.adv),{adv:true}),...dev],slots:[null],skip:0,trig:null,kok:false,camp:false,seed:(Math.random()*2147483647)|0};
  for(let i=1;i<=S.n;i++)S.slots[i]=S.deck.shift()||null}