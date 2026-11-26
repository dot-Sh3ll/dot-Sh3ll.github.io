const CAT={reg:'Region',tra:'Tradition',civ:'Civilised',vas:'Tributary',ren:'Fame',ins:'Unrest'};
const RES={mat:'Materials',pop:'Population',prog:'Progress'};
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
const GLO=(...d)=>['Glory',[alt({c:[abn(3)],g:FAME},...(d.length?[{d}]:[]))]];
const PROSP=['Prosperity',[mill(1),per({mat:1,pop:1}),you('draw')]];

const T={
car:{B:[['ren',[g(1,1),A]],GLO(inn('reg')),
  ['B',[alt({c:[sp('pop',3)],g:inn('vas')},{c:[sp('mat',2)],g:acq('civ','tra')},{d:[g(1,1),A]})]],
  ['reg',[mill(1),PLAY,EX]],['perm',[g(2,1),A]],PROSP,['vas',[mill(3)]],
  ['autre',[alt({if:s=>s.res.mat>0,d:[conv('mat','prog')]},{g:acq('reg')},{d:[mill(2)]})]]],
 E:[['B',[g(1),mill(1),A]],['ren',[A]],['atk',[inn('vas'),A,you('aban'),you('draw')]],GLO(inn('reg'),you('disc',2)),
  ['E',[alt({g:acq('civ','tra')},{d:[g(0,0,1),you('ins')]})]],['reg',[g(1),PLAY,EX]],['perm',[g(2),A]],
  ['autre',[A,alt({c:[sp('mat',2)],d:[g(0,0,1)]},{c:[sp('pop',2)],d:[g(0,0,1)]}),you('ins')]]]},
cel:{B:[['atk',[steal(1,1)]],['ren',[conv('mat','prog'),A]],GLO(DYN,you('ins')),
  ['Conquer',[alt({c:[sp('pop',3)],g:inn('vas')},{g:acq('reg')},{d:[you('ins')]})]],
  ['tra',[alt({g:acq('tra')},{d:[g(0,1),A,you('ins')]})]],['B',[inn('tra'),A]],['reg',[g(1,1),PLAY,EX]],
  ['perm',[A,you('ins')]],['vas',[mill(4),A]],['autre',[alt({g:RET}),g(0,0,1),mill(1)]]],
 E:[['B',[A,you('ins')]],['ren',[conv('pop','prog'),mill(2),A]],GLO(g(0,0,2)),['tra',[mill(1),A]],['reg',[PLAY,EX]],
  ['perm',[mill(1),A]],['atk',[alt({g:acq('tra','civ')}),you('ins')]],['E',[acq(...ALL),you('gain',{mat:2})]],
  ['vas',[g(0,0,2),A]],['autre',[A,you('ins')]]]},
gre:{B:[['atk',[mill(2),steal(2,0),you('gain',{pop:1})]],['ren',[mill(3),A]],GLO(inn('civ')),
  ['Progress',[alt({c:[sp('mat',1)],g:inn('civ')},{g:acq('tra')})]],['B',[mill(1),A]],['reg',[g(1),PLAY,EX]],['perm',[g(1,1),A]],
  ['autre',[alt({c:[sp('pop',2)],g:inn('reg')},{c:[sp('mat',2)],g:inn('tra')},{d:[mill(2),A]})]]],
 E:[['atk',[acq(...ALL),you('recallperm')]],['ren',[mill(2),g(0,0,2),A]],GLO(g(0,0,2)),['B',[mill(1),A]],
  ['reg',[mill(1),PLAY,EX]],['perm',[A]],['E',[alt({g:acq('civ','tra')})]],
  ['autre',[alt({c:[sp('pop',3)],g:acq('vas')},{c:[sp('mat',2)],g:acq('civ')},{g:RET},{d:[g(0,0,1),A]})]]]},
mac:{B:[['ren',[A]],GLO(inn('reg')),
  ['B',[alt({c:[sp('pop',3)],g:inn('vas'),d:[A]},{c:[sp('mat',3)],g:acq('civ','tra'),d:[A]},{d:[inn('reg')]})]],
  ['reg',[g(1),PLAY,EX]],['perm',[g(0,1)]],PROSP,['atk',[steal(2,0),mill(1)]],['autre',[per({prog:1}),mill(1),A]]],
 E:[['ren',[per({prog:1}),A]],['Glory',[alt({c:[abn(3)],g:FAME},{g:acqEx('reg')},{d:[g(0,0,1)]})]],['B',[A]],['reg',[PLAY,EX]],
  ['perm',[alt({g:REGTOP}),A]],['E',[alt({c:[sp('mat',2)],g:acq(...ALL)},{d:[DYN,A]})]],['autre',[per({prog:1}),A]]]},
per:{B:[['ren',[mill(3),A]],GLO(inn('reg')),['vas',[g(2,2),mill(1),A]],
  ['B',[alt({c:[sp('pop',3)],g:inn('vas'),d:[A]},{c:[sp('mat',2)],g:acq('civ','tra')},{d:[g(1,1),TOP]})]],
  ['reg',[g(0,1),PLAY,EX]],['perm',[alt({g:acq('reg')}),A]],PROSP,['autre',[alt({g:acq('vas')},{g:acq('tra')},{d:[A]})]]],
 E:[['ren',[rep('pop',3),A]],GLO(DYN),['B',[A]],['vas',[g(0,0,2),A]],['atk',[inn('vas'),you('gain',{mat:2}),you('ins')]],
  ['reg',[PLAY,EX]],['perm',[A]],['E',[acq(...ALL),A]],['autre',[alt({g:acq('reg')},{d:[g(0,0,1)]})]]]},
rom:{B:[['atk',[you('recall'),you('ins')]],['ren',[conv('pop','prog'),A]],GLO(g(0,0,1),you('recall')),['reg',[mill(1),PLAY,EX]],
  ['perm',[g(0,1),A]],['Progress',[alt({c:[sp('mat',5)],g:inn('civ')},{g:acq('tra')},{d:[g(0,1)]})]],PROSP,
  ['B',[alt({c:[sp('pop',3)],g:inn('vas')},{g:acq('reg')},{d:[g(0,1)]})]],['vas',[mill(2),g(0,0,1),A]],['autre',[g(2)]]],
 E:[['B',[A]],['ren',[conv('pop','prog'),A]],['atk',[you('disc',1),you('aban')]],GLO(you('disc',2)),
  ['Prosperity',[per({mat:1,pop:1}),you('draw')]],['reg',[g(0,1),PLAY,EX]],['perm',[mill(1),A]],['vas',[mill(2),A]],
  ['E',[inn('civ'),A]],['autre',[alt({c:[sp('mat',3)],d:[g(0,0,1)]}),g(0,1),A]]]},
scy:{B:[['atk',[mill(2),you('recall'),you('scy')]],
  ['Conquer',[alt({c:[sp('pop',4)],g:inn('vas')},{g:acq('reg')},{d:[g(0,1)]})]],
  ['Progress',[alt({c:[sp('mat',4)],g:inn('civ')},{g:acq('tra')},{d:[g(1)]})]],['reg',[g(0,1),PLAY,EX]],['perm',[mill(2),g(2),A]],
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
const INS=()=>c('Unrest',{cat:'ins',vp:-2});
const NAT={
car:{name:'Carthaginians',flip:true,cleanup:'2 Materials',ownIns:2,
  deck:[c('Glory'),c('Prosperity'),c('Progress',{st:'B'}),c('Conquer',{st:'B'}),c('Dido, Queen of Carthage',{st:'B'}),c('Carthaginian Merchants',{st:'B'}),
    c('Balearic Islands',{cat:'reg',perm:true}),c('Mauretania',{cat:'reg',perm:true}),INS(),INS()],
  nat:[c('Prosperity'),c('Caravans',{perm:true}),c('Progress',{st:'B'}),c('Iberia',{cat:'reg',perm:true}),c('Berbers',{cat:'vas'})],
  adv:c('City of Carthage',{perm:true}),
  dev:[c('Elephants',{st:'E',atk:true,vp:2}),c('Elephants',{st:'E',atk:true,vp:2}),c('Hegemony',{st:'E',vp:2}),c('Hannibal',{st:'E',vp:4}),
    c('Merchant Ships',{st:'E',perm:true,vp:4}),c('Monopoly',{st:'E',atk:true,vp:5})]},
cel:{name:'Celts',flip:true,ownIns:3,
  deck:[c('Druids'),c('Glory'),c('Progress',{st:'B'}),c('Conquer',{st:'B'}),c('Boudica',{st:'B',atk:true}),c('Cattle Raid',{st:'B',atk:true}),
    c('Cauldron of Cerridwen',{perm:true}),c('Celtica',{cat:'reg',perm:true}),INS(),INS()],
  nat:[c('Conquer',{st:'B'}),c('Armorica',{cat:'reg',perm:true}),c('Gallia Belgica',{cat:'reg',perm:true}),c('Britannia',{cat:'reg',perm:true}),c('Hibernia',{cat:'reg',perm:true}),INS()],
  adv:c('Celtic Gold'),
  dev:[c('Celtic Innovation',{st:'E',atk:true,vp:4}),c('Chain Mail',{st:'E',perm:true,vp:4}),c('Chariots',{st:'E',perm:true,vp:4}),c('Ogham Script',{st:'E',perm:true,vp:4}),c('Vercingetorix',{st:'E',vp:5})]},
gre:{name:'Greeks',flip:true,ownIns:3,
  deck:[c('Glory'),c('Progress',{st:'B'}),c('Conquer',{st:'B'}),c('Colonists',{st:'B'}),c('Greek Mercenaries',{atk:true}),c('City of Sparta',{st:'B',perm:true}),
    c('Peloponnese',{cat:'reg',perm:true}),c('Pholoe Forest',{cat:'reg',perm:true}),INS(),INS()],
  nat:[c('City of Athens',{perm:true}),c('Plains of Thessaly',{cat:'reg',perm:true}),INS()],
  adv:c('Olympic Games'),
  dev:[c('Greek Prosperity',{st:'E',vp:2}),c('Pericles',{st:'E',vp:3}),c('City of Corinth',{st:'E',perm:true,vp:3}),c('Science',{st:'E',perm:true,vp:3}),
    c('Greek Innovation',{st:'E',atk:true,vp:3}),c('Direct Democracy',{st:'E',perm:true,vp:3}),c('Lighthouse',{st:'E',perm:true,vp:3}),c('Philosophy',{st:'E',vp:5})]},
mac:{name:'Macedonians',flip:true,ownIns:3,
  deck:[c('Progress',{st:'B'}),c('Conquer',{st:'B'}),c('Conquer',{st:'B'}),c('Philip II',{st:'B'}),c('Phalanx',{perm:true}),
    c('Aliakmon Valley',{cat:'reg',perm:true}),c('Orestis',{cat:'reg',perm:true}),c('Pelagonia',{cat:'reg',perm:true}),INS(),INS(),INS()],
  nat:[c('Prosperity'),c('Uxians',{cat:'vas',atk:true}),c('Glory')],
  adv:c('Alexander'),
  dev:[c('Development',{st:'E',vp:3}),c('Parmenion',{st:'E',vp:2}),c('Companion Cavalry',{st:'E',perm:true,vp:3}),c('Alexander the Great',{st:'E',vp:4}),
    c('Mosaics',{st:'E',perm:true,vp:3}),c('Alexandria in Egypt',{st:'E',perm:true,vp:2}),c('Alexandria in Ariana',{st:'E',perm:true,vp:5})]},
per:{name:'Persians',flip:true,ownIns:3,
  deck:[c('Glory'),c('Prosperity'),c('Progress',{st:'B'}),c('Conquer',{st:'B'}),c('Conquer',{st:'B'}),c('Lydians',{cat:'vas',st:'B'}),
    c('Bactria',{cat:'reg',perm:true}),c('Zagros',{cat:'reg',perm:true}),INS(),INS()],
  nat:[c('Arachosia',{cat:'reg',perm:true}),c('Nisaean Plain',{cat:'reg',perm:true}),c('Median Empire',{cat:'vas',st:'B'}),INS()],
  adv:c('City of Persepolis',{perm:true}),
  dev:[c('Battering Ram',{st:'E',atk:true,vp:2}),c('Development',{st:'E',vp:3}),c('Windmills',{st:'E',perm:true,vp:2}),c('Satrap',{st:'E',vp:3}),
    c('Persian Gold',{st:'E',atk:true,vp:4}),c('Babylonians',{cat:'vas',st:'E',vp:4}),c('Darius I',{st:'E',vp:5})]},
rom:{name:'Romans',flip:true,ownIns:3,
  deck:[c('Glory'),c('Prosperity'),c('Progress',{st:'B'}),c('Conquer',{st:'B'}),c('Triumvirate',{st:'B'}),c('City of Rome',{perm:true}),c('Dalmatia',{cat:'reg',perm:true}),
    c('Roman Expansion',{st:'B',atk:true}),INS(),INS()],
  nat:[c('Prosperity'),c('Bread and Circuses',{perm:true}),c('Gallia Aquitania',{cat:'reg',perm:true}),c('Raetia',{cat:'reg',perm:true}),INS()],
  adv:c('Julius Caesar',{st:'E'}),
  dev:[c('Military Genius',{st:'E',atk:true,vp:3}),c('Roman Invasion',{st:'E',atk:true,vp:2}),c('Legions',{st:'E',perm:true,vp:2}),c('The Senate',{st:'E',vp:3}),
    c('Rome, the Eternal City',{st:'E',perm:true,vp:4}),c('Emperor Trajan',{st:'E',vp:5})]},
scy:{name:'Scythians',flip:true,ownIns:5,
  deck:[c('Nomads'),c('Nomads',{st:'B'}),c('Progress',{st:'B'}),c('Conquer',{st:'B'}),c('Carpathians',{cat:'reg',st:'B',perm:true}),c('Tian Shan',{cat:'reg',st:'B',perm:true}),
    c('Mounted Archers',{perm:true}),c('Tents',{st:'B',perm:true}),INS(),INS(),INS()],
  nat:[INS(),INS(),c('Tamga',{perm:true,vp:5}),c('Pontic Steppe',{cat:'reg',perm:true}),c('Tarim Basin',{cat:'reg',perm:true}),c('Caucasus',{cat:'reg',perm:true}),c('Raiders',{st:'B',atk:true})],
  adv:c('Glory'),
  dev:[c('Ateas',{st:'E',vp:3}),c('Kurgans',{st:'E',perm:true,vp:2}),c('City of Gelonus',{st:'E',perm:true,vp:2}),c('Jewellery',{vp:7})]},
vik:{name:'Vikings',flip:false,ownIns:3,
  deck:[c('Gothja',{st:'B'}),c('Scandinavia',{cat:'reg',st:'B',perm:true}),c('Progress',{st:'B'}),c('Prosperity'),c('Glory'),c('Erik the Red',{st:'B'}),
    c('Jomsviking',{st:'B',atk:true}),c('Althing',{st:'B',atk:true}),INS()],
  nat:[c('Iceland',{cat:'reg',st:'B',perm:true}),c('Combs',{st:'B',perm:true,vp:5}),c('Greenland',{cat:'reg',st:'B',perm:true}),c('Faroe Islands',{cat:'reg',st:'B',perm:true}),
    c('Vinland',{cat:'reg',st:'B',perm:true,vp:6}),c('Sagas',{st:'B',perm:true,vp:5}),c('City of Dubh Linn',{st:'B',perm:true,vp:5}),c('Longships',{st:'B',perm:true}),
    c('Skis',{st:'B',perm:true,vp:2}),c('Rollo the Walker',{st:'B'}),c('Viking Raid',{st:'B',atk:true}),INS(),INS()],
  adv:c('Harald Hardrada',{st:'B',vp:5}),dev:[]}
};
const DIFF=[['Chieftain',4,'4 slots. Recommended to start.'],['Warlord',4,'4 slots, and the Bot discards a card from its deck at the end of each turn.'],
 ['Imperator',5,'Standard rules, 5 slots.'],['Sovereign',5,'The Bot starts with 3 Materials, 2 Population, 1 Progress and scores 1 point per 5 resources.'],['Overlord',6,'Like Sovereign, with a 6th slot.']];

/* ---------- état et affichage ---------- */
let S=null,LOG=[],TURN=null;
const newTurn=()=>({g:{mat:0,pop:0,prog:0},took:[],found:[],reg:[],arch:[],ex:0,ret:0,abn:0,emp:false,fame:null,kok:false,hit:[],blocked:0});
const nice=n=>n==='Market card'?'a card':/ du Marché$/.test(n)?'a card '+n.replace(' from the Market',''):n;
const qt=(n,r)=>n+' '+(n===1&&r==='mat'?'Material':RES[r]);
const et=a=>a.length<2?a.join(''):a.slice(0,-1).join(', ')+' and '+a[a.length-1];
const FL={car:{who:['The Carthaginians','The merchants of Carthage','The Punic ships'],calm:['count their cargo at the quay','trade quietly in their outposts']},
 cel:{who:['The Celts','The Celtic tribes','The druids'],calm:['feast around the cauldron','listen to their bards by the fire']},
 gre:{who:['The Greeks','The Greek cities','The hoplites'],calm:['debate at length in the agora','train at the gymnasium']},
 mac:{who:['The Macedonians','The Macedonian phalanxes','The king\'s companions'],calm:['sharpen their sarissas','review their troops']},
 per:{who:['The Persians','The satraps','The Great King\'s armies'],calm:['hold council at court','levy tribute in their provinces']},
 rom:{who:['The Romans','The legions','The senators'],calm:['fortify their camps','speechify in the Senate']},
 scy:{who:['The Scythians','The steppe riders','The Scythian archers'],calm:['let their horses graze','break camp without a sound']},
 vik:{who:['The Vikings','The jarls','The Northern warriors'],calm:['repair their ships','tell each other their sagas']}};
const pick=a=>a[Math.floor(Math.random()*a.length)];
function story(){const T=TURN,F=FL[S.nat],cl=[];
  if(T.kok)cl.push('proclaim themselves Kings of Kings');
  if(T.fame)cl.push(pick(['cover their name in glory with','enter legend thanks to'])+' '+T.fame);
  if(T.took.length)cl.push(pick(['lay hands on','acquire','snap up'])+' '+et(T.took.slice(0,3).map(nice)));
  if(T.found.length)cl.push(pick(['discover','adopt','develop'])+' '+et(T.found.slice(0,2).map(nice)));
  if(T.reg.length)cl.push(pick(['annex','colonise','occupy'])+' '+et(T.reg.slice(0,2)));
  if(T.abn&&!T.fame&&!T.kok)cl.push('forsake '+(T.abn>1?T.abn+' Regions':'a Region'));
  if(T.ex)cl.push(pick(['drive out','set aside','make disappear'])+' '+(T.ex>1?T.ex+' cards':'a card')+' from the Market');
  if(T.arch.length)cl.push(T.arch.length>2?pick(['record several great deeds in their History','carve several feats into memory']):pick(['record','bring'])+' '+et(T.arch)+' into their History');
  if(T.ret)cl.push(pick(['calm some unrest','restore calm at home','crush a revolt']));
  const w=pick(F.who);
  const s1=(T.emp?'Now at the head of an Empire, '+w[0].toLowerCase()+w.slice(1):w)+' '+(cl.length?et(cl.slice(0,3)):pick(F.calm))+'.';
  const gains=['mat','pop','prog'].filter(r=>T.g[r]>0).map(r=>qt(T.g[r],r));
  const ni=T.hit.filter(h=>h===INSHIT).length,hit=[...new Set(T.hit.filter(h=>h!==INSHIT))];
  if(ni)hit.push(ni>1?ni+' Unrest sown in your camp':INSHIT);
  let s2='';
  if(hit.length)s2=pick(['You are not spared: ','You pay the price: ','Their shadow reaches you: '])+et(hit)+(gains.length?pick([', while their treasury grows by ',', and their coffers fill with '])+et(gains):'')+'.';
  else if(T.blocked)s2=pick(['Your defences held firm','You repelled their assault'])+(gains.length?', but '+pick(['their treasury grows by ','they bring in '])+et(gains):'')+'.';
  else if(gains.length)s2=pick(['Their treasury grows by ','Their coffers fill with ','They bring in '])+et(gains)+'.';
  return s1+(s2?' '+s2:'')}
const INSHIT='an Unrest sown in your camp';
let META=null;try{META=JSON.parse(localStorage.getItem('imperium-meta'))}catch(e){}
META=Object.assign({hist:[],camp:null,lib:{}},META||{});
const saveMeta=()=>{try{localStorage.setItem('imperium-meta',JSON.stringify(META))}catch(e){}};
const drop=()=>{try{localStorage.removeItem('civ-antique')}catch(e){}};
const pl=(n,w)=>n+' '+w+(n>1?'s':'');
let REC=null;
const clone=x=>JSON.parse(JSON.stringify(x));
let TR=null;
const CX={rom:1,per:1,mac:1,car:2,cel:2,scy:2,gre:3,vik:3};
const BD={scy:[1,'Easy'],cel:[2,'Tough'],per:[2,'Tough'],rom:[2,'Tough'],gre:[2,'Tough'],vik:[3,'Fearsome'],mac:[3,'Fearsome'],car:[3,'Fearsome']};
const loadTR=()=>{try{return JSON.parse(localStorage.getItem('imperium-train'))}catch(e){return null}};
const saveTR=()=>{try{localStorage.setItem('imperium-train',JSON.stringify(TR))}catch(e){}};
const dropTR=()=>{try{localStorage.removeItem('imperium-train')}catch(e){}};
const pct=(w,n)=>n?Math.round(100*w/n):0;
const bar=(w,n)=>`<span class="wbar" role="img" aria-label="${pct(w,n)} % wins"><i style="width:${pct(w,n)}%"></i></span>`;
function stats(){const H=META.hist.filter(g=>g.mode!=='train'),T=META.hist.filter(g=>g.mode==='train');let h='<h3>Statistics</h3>';
  if(!H.length&&!T.length)return h+'<p class="muted">They will appear after your first completed game.</p>';
  if(H.length){const W=H.filter(g=>g.res==='Victory').length,sc=H.filter(g=>g.me!=null),gap=sc.length?Math.round(sc.reduce((a,g)=>a+g.me-g.civ,0)/sc.length):null,best=sc.length?Math.max(...sc.map(g=>g.me)):null;
    h+=`<div class="kpis"><div><b>${pct(W,H.length)} %</b><span>wins (${W}/${H.length})</span></div><div><b>${best==null?'–':best}</b><span>best score</span></div><div><b>${gap==null?'–':(gap>0?'+':'')+gap}</b><span>average gap with the Bot</span></div></div>`;
    const grp=(k,order)=>{const m={};H.forEach(g=>{(m[g[k]]=m[g[k]]||[]).push(g)});return (order||Object.keys(m)).filter(x=>m[x]).map(x=>{const v=m[x],w=v.filter(g=>g.res==='Victory').length;return `<tr><td>${x}</td><td class="num">${w}/${v.length}</td><td>${bar(w,v.length)}</td></tr>`}).join('')};
    h+=`<div class="tw"><table class="st"><tr><th>Opponent</th><th class="num">Wins</th><th></th></tr>${grp('bot',Object.values(NAT).map(N=>N.name))}</table></div>`;
    h+=`<div class="tw"><table class="st"><tr><th>Level</th><th class="num">Wins</th><th></th></tr>${grp('lvl',DIFF.map(d=>d[0]))}</table></div>`}
  if(T.length){const b=Math.max(...T.map(g=>g.me||0));h+=`<p>Training: ${pl(T.length,'game')}, best score ${b} points.</p>`}
  return h}
function library(){const L=Object.entries(META.lib).sort((a,b)=>a[1].n.localeCompare(b[1].n));
  return `<details><summary>Known Market cards (${L.length})</summary>${L.length?`<p class="muted" style="font-size:14px">The cards you have described. Tap ✕ to remove one.</p><ul class="lib">${L.map(([k,x])=>`<li><span>${x.n}${x.cat?' '+chip(x.cat):''}${x.vp?' · '+x.vp+' PV':''}</span><button type="button" class="del" data-del="${k}" aria-label="Remove ${x.n}">✕</button></li>`).join('')}</ul>`:'<p class="muted">None yet. Each card you describe during a game is remembered here.</p>'}</details>`}
function idle(){const C=META.camp;let h='<h2>Tracking</h2>';
  h+=stats()+'<h3>Campaign</h3>';
  h+=C?`<p>You play the ${C.me} : ${pl(C.wins,'win')}, ${C.losses+(C.losses>1?' losses':' loss')} out of 4 allowed. Next level: ${DIFF[C.level][0]}.</p>`
    +(C.added.length?`<p>Added to your starting deck: ${C.added.join(', ')}.</p>`:'')+(C.removed.length?`<p>Removed from your starting deck: ${C.removed.join(', ')}.</p>`:''):'<p>No campaign in progress.</p>';
  h+='<h3>Game history</h3>'+(META.hist.length?'<div class="tw"><table><tr><th>Date</th><th>Game</th><th>Level</th><th>You</th><th>C.I.V.</th><th>Result</th></tr>'
    +META.hist.slice(0,15).map(g=>`<tr><td>${g.d}</td><td>${g.mode==='train'?'Training ('+g.nation+')':g.bot}</td><td>${g.lvl}${g.camp?' (campagne)':''}</td><td>${g.me==null?'':g.me}</td><td>${g.civ==null?'–':g.civ}</td><td>${g.res}</td></tr>`).join('')+'</table></div>':'<p>No completed game yet.</p>');
  return h+'<h3>Library</h3>'+library()}
function trainBoard(){const used=12-TR.left;
  $('#hd').textContent=`Training · ${TR.me} · turn ${Math.min(TR.turn,12)} of 12`;
  return `<h2>Training</h2><p>You play the <b>${TR.me}</b>, no opponent.</p><h3>Hourglass: ${TR.left} Progress left</h3>
   <div class="hourglass" role="img" aria-label="${TR.left} tokens out of 12">${Array.from({length:12},(_,i)=>`<i class="${i<used?'gone':''}"></i>`).join('')}</div>
   <h3>Benchmarks</h3><ul class="cards"><li>50 points: you have the basics.</li><li>90 points: your feats will go down in History.</li></ul>
   <h3>Each turn</h3><ol class="cards"><li>Play your turn normally.</li><li>At Cleanup, the Progress placed on the Market comes from the hourglass, not the supply.</li><li>Then you may exile a Market card.</li><li>Resolve your Solstice effects.</li></ol>`}
async function trainStart(me){TR={me,turn:1,left:12};saveTR();board();$('#title').textContent='Setup';const p=$('#prompt');
  p.innerHTML=`<h3 style="margin-top:0">Training setup</h3><ol class="setup"><li>Set up your nation (${me}) and the Market exactly as for a 2-player game.</li>
   <li>Exile the <b>top 15 cards</b> of the Main deck: place them face up in the Exile pile.</li>
   <li>Place <b>12 Progress tokens</b> next to the Market: it is your hourglass.</li><li>No Bot cards: the app simply counts the turns.</li></ol>
   <div class="row"><button type="button" class="pri" id="go2">Start training</button></div>`;
  await new Promise(r=>$('#go2').onclick=r);p.innerHTML='';trainLoop()}
async function trainLoop(){
  while(true){saveTR();LOG=[];drawLog();$('#title').textContent=`Turn ${TR.turn} of 12`;
    const r=await ask(`Play your turn normally. When you reach Cleanup, tap the first button.`,[['I\'ve reached Cleanup','go'],['A card effect ends the game','end',''],['Collapse','col',''],['Abandon training','quit','warn']]);
    if(r==='quit'){if(await ask('Abandon this training? It won\'t be saved.',[['Yes, abandon',1,'warn'],['No, keep going',0]])){dropTR();TR=null;return start()}continue}
    if(r==='col'){log('<b>Collapse</b>: the Unrest pile is empty. The game stops on the spot.','you');return trainEnd(true)}
    if(r==='end'){log('A card effect ends the game: let\'s count your points.','end');return trainEnd(false)}
    TR.left--;board();
    await ask(`Cleanup: place <b>1 Progress from the hourglass</b> (not from the supply) on a Market card. There will be ${TR.left}left. Then you may exile a Market card, as a second player would.`,[['Done',1]],'Then finish your Cleanup as usual: tokens, discard, draw.');
    await ask('End of turn: resolve your Solstice effects now.',[['Solstice resolved',1]]);
    if(TR.left<=0){log('<b>The hourglass is empty</b>: twelve turns have passed.','end');return trainEnd(false)}
    TR.turn++}}
async function trainEnd(collapse){const me=await scoreSheet(collapse?'Collapse: count your points anyway to measure your progress.':'End of training: count your points.');
  const lvl=me>=90?'Feat':me>=50?'Basics acquired':'Needs more work';
  log(me>=90?`<b>${me} points.</b> Your feats will go down in History. The Bot had better watch out.`:me>=50?`<b>${me} points.</b> You have absorbed the rules and the basic strategies: you are ready to face the Bot.`:`<b>${me} points.</b> A little more training: the rulebook sets the first milestone at 50 points.`,me>=50?'end':'you');
  META.hist.unshift({d:new Date().toLocaleDateString('fr-FR'),mode:'train',nation:TR.me,bot:'Training',lvl:'–',me,civ:null,res:lvl});META.hist=META.hist.slice(0,50);saveMeta();
  dropTR();TR=null;board();const p=$('#prompt');p.innerHTML='<div class="row"><button type="button" class="pri" id="again">New game</button></div>';$('#again').onclick=start}
function scoreSheet(title){return new Promise(res=>{const p=$('#prompt'),F=[['x1','Points from fixed-value cards'],['x2','Points from star cards (10 at most per card)'],['x3','Points from question-mark cards whose condition is met'],['x4','Number of Unrest cards (−2 each)'],['x5','Other negative points'],['x6','Progress tokens in your reserve']];
  if(window.AUTO)return res(42);
  p.innerHTML=`<div class="q">${title}</div><div class="hint">Count all your cards: hand, play area, deck, discard pile, History, reserved cards and Power card. Leave out the Nation deck and unpaid Developments.</div><div class="form">
   ${F.map(([i,l])=>`<label class="f" for="${i}">${l}<input type="number" id="${i}" min="0" value="0"></label>`).join('')}
   <div>Total: <span class="big" id="xt">0</span> points</div><div class="row"><button type="button" class="pri" id="xok">Confirm my score</button></div></div>`;
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
  const sc=botScore(),li=a=>a.length?`<ul class="cards">${a.map(x=>`<li>${x.n}${x.cat?' · '+CAT[x.cat]:''}${x.vp?' · '+x.vp+' PV':''}</li>`).join('')}</ul>`:'<p style="color:var(--muted);margin:6px 0 0">No cards.</p>';
  $('#hd').textContent=`${NAT[S.nat].name} · ${DIFF[S.diff][0]} · round ${S.round}`;
  b.innerHTML=`<h2>${NAT[S.nat].name} <span class="pill">${S.state==='B'?'Barbarian':'Empire'}</span></h2>
  <div class="stat"><div><b>${S.res.mat}</b><span>Materials</span></div><div><b>${S.res.pop}</b><span>Population</span></div><div><b>${S.res.prog}</b><span>Progress</span></div>
  <div><b>${S.deck.length}</b><span>Deck</span></div><div><b>${S.discard.length}</b><span>Discard</span></div><div><b>${S.dyn.length}</b><span>Dynasty</span></div></div>
  <h3>Slots</h3><div class="slots">${S.slots.map((x,i)=>i?`<div class="slot${x?'':' empty'}${S.skip===i?' skip':''}">${i}</div>`:'').join('')}</div>
  <h3>Current score: ${sc.total} points</h3><p style="font-size:14px;color:var(--muted)">${sc.cards} from cards, ${sc.prog} from Progress, ${sc.r} from resources (1 per ${sc.div}). ${sc.ins} Unrest${sc.ins>1?'s':''} in its possession.</p>
  <details open><summary>Regions in play (${S.play.length})</summary>${li(S.play)}</details>
  <details><summary>Discard (${S.discard.length})</summary>${li(S.discard)}</details>
  <details><summary>History (${S.hist.length})</summary>${li(S.hist)}</details>`}
function undoBtn(p){if(!REC||!REC.ans.length)return;const d=document.createElement('div');d.className='row';d.style.marginTop='12px';
  const b=document.createElement('button');b.type='button';b.className='undo';b.textContent='Undo my last answer';
  b.onclick=()=>{const r=REC;S=JSON.parse(r.snap);botTurn(r.ans.slice(0,-1))};d.append(b);p.append(d)}
function ask(q,btns,hint){board();
  if(window.AUTO)return Promise.resolve(window.AUTO(btns));
  if(REC&&REC.q.length){const v=REC.q.shift();REC.ans.push(v);return Promise.resolve(v)}
  return new Promise(res=>{const p=$('#prompt');
    p.innerHTML=`<div class="q">${q}</div>${hint?`<div class="hint">${hint}</div>`:''}<div class="row"></div>`;
    btns.forEach(([l,v,k],i)=>{const b=document.createElement('button');b.type='button';b.textContent=l;b.className=k||(i?'':'pri');b.onclick=()=>{p.innerHTML='';if(REC)REC.ans.push(v);res(v)};$('.row',p).append(b)});
    window.IMP_LINK(p);undoBtn(p);p.scrollIntoView({block:'nearest'})})}
let todo=(t,k='do')=>{log(t,k);return ask(t,[['Done',true]])};

function cardForm(title,{fixed,tokens,unrest}){
  if(window.AUTO){const k=fixed||ALL[rnd(4)];return Promise.resolve({card:c('Test card',{cat:k,st:[null,'B','E'][rnd(3)],perm:rnd(2)>0,atk:rnd(3)===0,vp:rnd(6)}),tok:{mat:0,pop:0,prog:tokens?rnd(3):0},un:!!unrest&&k!=='reg'})}
  if(REC&&REC.q.length){const v=clone(REC.q.shift());REC.ans.push(clone(v));return Promise.resolve(v)}
  return new Promise(res=>{const p=$('#prompt');
    p.innerHTML=`<div class="q">${title}</div><div class="form"><div id="libbox"></div>
    <label class="f" for="fn">Card name<input type="text" id="fn" autocomplete="off"></label>
    ${fixed?'':`<div><div class="hint" style="margin:0 0 4px">Category (banner colour)</div><div class="row" id="fc">${[...ALL,'none'].map(k=>`<button type="button" data-k="${k}">${k==='none'?'None':CAT[k]}</button>`).join('')}</div></div>`}
    <div class="checks"><div class="hint" style="margin:0 0 4px">Icons at the top of the card</div>
      <label><input type="checkbox" id="fp"> Permanent (∞)</label><label><input type="checkbox" id="fa"> Attack (sword)</label>
      <label><input type="checkbox" id="fb"> Barbarian</label><label><input type="checkbox" id="fe"> Empire</label></div>
    <div class="row"><label class="f" for="fv">Victory points<input type="number" id="fv" value="0"></label><span class="hint" style="margin:0">Star: count 5. Question mark: its maximum value.</span></div>
    ${tokens?`<div class="row"><label class="f" for="t1">Progress placed on it<input type="number" id="t1" min="0" value="0"></label><label class="f" for="t2">Materials on it<input type="number" id="t2" min="0" value="0"></label><label class="f" for="t3">Population on it<input type="number" id="t3" min="0" value="0"></label></div>`:''}
    ${unrest?`<div class="checks"><label><input type="checkbox" id="fu" checked> An Unrest was tucked under it</label></div>`:''}
    <div class="row"><button type="button" class="pri" id="fok">Confirm</button><span class="hint" id="ferr" style="margin:0;color:var(--bad)"></span></div></div>`;
    let cat=fixed||null;
    const setCat=k=>{cat=k;p.querySelectorAll('#fc button').forEach(x=>x.classList.toggle('sel',x.dataset.k===k));if(unrest)$('#fu').checked=k!=='reg'};
    if(!fixed)p.querySelectorAll('#fc button').forEach(b=>b.onclick=()=>setCat(b.dataset.k));
    const drawLib=()=>{const q=norm($('#fn').value),L=Object.values(META.lib).filter(x=>(!fixed||x.cat===fixed)&&(!q||norm(x.n).includes(q))).sort((a,b)=>a.n.localeCompare(b.n)).slice(0,12);
      $('#libbox').innerHTML=L.length?'<div class="hint" style="margin:0 0 4px">Cards already known: tap a name to fill in the form.</div><div class="row"></div>':'';
      L.forEach(x=>{const b=document.createElement('button');b.type='button';b.textContent=x.n;b.onclick=()=>{$('#fn').value=x.n;if(!fixed)setCat(x.cat||'none');$('#fp').checked=x.perm;$('#fa').checked=x.atk;$('#fb').checked=x.st==='B';$('#fe').checked=x.st==='E';$('#fv').value=x.vp;drawLib()};$('#libbox .row').append(b)})};
    $('#fn').addEventListener('input',drawLib);drawLib();
    $('#fok').onclick=()=>{if(!cat){$('#ferr').textContent='Choose the card\'s category.';return}
      const v=id=>Math.max(0,+($('#'+id)||{}).value||0),k=cat==='none'?null:cat,name=$('#fn').value.trim();
      const card=c(name||(k?CAT[k]+' from the Market':'Market card'),{cat:k,perm:$('#fp').checked,atk:$('#fa').checked,st:$('#fb').checked?'B':$('#fe').checked?'E':null,vp:+$('#fv').value||0});
      if(name){META.lib[norm(name)]=clone(card);saveMeta()}
      const out={card,tok:{prog:v('t1'),mat:v('t2'),pop:v('t3')},un:unrest?$('#fu').checked:false};p.innerHTML='';if(REC)REC.ans.push(clone(out));res(out)};
    undoBtn(p);p.scrollIntoView({block:'nearest'})})}

/* ---------- actions élémentaires de la C.I.V. ---------- */
function gain(o){const parts=[];for(const r of ['mat','pop','prog'])if(o[r]){S.res[r]+=o[r];if(TURN)TURN.g[r]+=o[r];parts.push(o[r]+' '+chip(r))}
  if(parts.length)log('The Bot gains '+parts.join(' and ')+'.');return parts.length>0}
function trigger(why){if(S.trig==null){S.trig=S.round;log(`<b>Countdown triggered</b>: ${why}. Finish this round, then play one last full round.`,'end')}}
function toDiscard(x,why){S.discard.push(x);if(x.adv&&NAT[S.nat].flip&&S.state==='B'){S.state='E';if(TURN)TURN.emp=true;log(`The Accession card ${cname(x)} joins the discard pile: <b>the Bot becomes an Empire</b>. Its new table applies from now on.`,'end')}}
function millN(n){let k=0;while(k<n&&S.deck.length){const x=S.deck.shift();toDiscard(x);log(`The top card of its deck is discarded: ${cname(x)}.`);k++}
  if(k<n)log('Its deck is empty: nothing more to discard.');return k>0}
function dyn(){if(!S.dyn.length){log('Its Dynasty deck is empty.');return false}
  const x=S.dyn.shift();log(`The top card of the Dynasty deck joins its discard pile: ${cname(x)}.`);toDiscard(x);
  if(!S.dyn.length)trigger('the Bot\'s Dynasty deck has run out');return true}
async function getIns(){S.deck.unshift(INS());await todo('Take an Unrest card from the common pile and place it on the "Bot\'s Unrest" stack. If it was the last one in the pile, declare the Collapse.')}
const RULE='Take the one worth the most points (star = 5, question mark = maximum value, +1 per Progress placed on it). Tie: the one carrying the most tokens, then the lowest slot.';
async function takeFromMarket(verb,list,isAcq){
  const ok=await ask(`The Bot ${verb} a card ${cats(list)}. Is there at least one among the five Market cards?`,[['Yes',1],['No, none',0]],RULE);
  if(!ok)return null;
  const r=await cardForm(`Describe the card the Bot takes from the Market.`,{fixed:list.length===1?list[0]:null,tokens:true,unrest:isAcq});
  gain(r.tok);S.deck.unshift(r.card);if(TURN)(isAcq?TURN.took:TURN.found).push(r.card.n);
  let t=`The Bot ${verb} ${cname(r.card)} : the card goes on top of its deck. Remove it from the Market and put it on the "Bot's cards" stack, return its tokens to the supply, then refill the Market.`;
  if(isAcq&&r.un){S.deck.unshift(INS());t+=' The Unrest that was under it goes onto the "Bot\'s Unrest" stack.'}
  else if(!isAcq&&r.card.cat!=='reg')t+=' The Unrest that was under it goes back to the common pile.';
  await todo(t);return r.card}
async function kok(){if(S.kok){log('The Bot has already resolved King of Kings: nothing happens.');return false}
  S.kok=true;if(TURN)TURN.kok=true;
  if(S.state==='B'){gain({prog:6});log('Only King of Kings is left: as a Barbarian, the Bot gains 6 Progress instead. The card stays where it is.')}
  else{gain({prog:3});if(S.dyn.length){const x=S.dyn.shift();S.deck.unshift(x);log(`King of Kings: the Bot gains 3 Progress and puts ${cname(x)} from its Dynasty deck on top of its deck.`);if(x.adv&&S.state==='B')S.state='E'}
    trigger('the Bot gains King of Kings')}
  return true}
async function fameCard(to){
  const r=await ask('The Bot gains a '+chip('ren')+'card. What is left in the Fame deck?',[['At least one face-down card',1],['Only King of Kings',2]]);
  if(r===2)return kok();
  const f=await cardForm('Take the top card of the Fame deck and describe it.',{fixed:'ren'});if(TURN)TURN.fame=nice(f.card.n);
  if(to==='hist'){S.hist.push(f.card);await todo(`${cname(f.card)} is put into the Bot's History. Place it on the "Bot's cards" stack.`)}
  else{S.deck.unshift(f.card);await todo(`${cname(f.card)} goes on top of the Bot's deck. Place it on the "Bot's cards" stack.`)}
  return true}
const canPay=x=>x.t==='sp'?S.res[x.r]>=x.n:x.t==='abn'?S.play.length>=x.n:true;
function pay(x){if(x.t==='sp'){S.res[x.r]-=x.n;log(`The Bot spends ${x.n} ${chip(x.r)}.`)}
  else{if(TURN)TURN.abn+=x.n;for(let i=0;i<x.n;i++){const r=S.play.pop();toDiscard(r);log(`The Bot abandons ${cname(r)} : the Region goes to its discard pile.`)}}}
const YOU={ins:['You recover an Unrest card: take it from the common pile.',1],aban:['You abandon one of your Regions in play.',1],recall:['You recall one of your Regions in play to your hand.',1],
  recallperm:['You recall one of your permanent cards in play to your hand.',1],draw:['You may draw 1 card.',0]};
async function youDo(k,o){
  if(k==='scy'){const e=await ask('Are you an Empire?',[['No',0],['Yes',1]]);if(e){S.res.pop++;if(TURN)TURN.hit.push('a Population paid as tribute');log('You give 1 '+chip('pop')+' to the Bot.','you');await ask('Give 1 Population from your reserve to the Bot (return it to the supply).',[['Done',1]])}return !!e}
  let t,atk;if(k==='disc'){t=`You discard ${o} card${o>1?'s':''} from your hand.`;atk=1}
  else if(k==='gain'){t='You gain '+Object.entries(o).map(([r,n])=>n+' '+chip(r)).join(' and ')+'.';atk=0}
  else[t,atk]=YOU[k];
  const r=await ask(t,atk?[['Done',1],['Cancelled by one of my cards',0,'']]:[['Vu',1]],atk?'This effect counts as an Attack: your protection cards work.':'');
  if(TURN&&atk){if(!r)TURN.blocked++;else TURN.hit.push(k==='ins'?INSHIT:k==='aban'?'an abandoned Region':k==='recall'?'a recalled Region':k==='recallperm'?'a recalled permanent card':o>1?o+' discarded cards':'a discarded card')}
  log(t+(r?'':' Cancelled by your protection.'),'you');return true}
async function run(x,ctx){
  switch(x.t){
  case'gain':return gain(x);
  case'per':{const n=S.play.length,o={};for(const r in x.o)o[r]=x.o[r]*n;if(!n)log('No Region in play: no gain.');return gain(o)}
  case'arch':ctx.dest='hist';return true;
  case'play':ctx.dest='play';return true;
  case'top':ctx.dest='top';return true;
  case'mill':return millN(x.n);
  case'dyn':return dyn();
  case'exile':{const r=await ask('The Bot exiles a Market card: the one in the lowest slot carrying no token.',[['Done',1],['Impossible: all of them carry tokens',0,'']],'Put it in the Exile pile, return the Unrest that was under it to the common pile, then refill the Market.');
    if(r&&TURN)TURN.ex++;log(r?'A Market card is exiled.':'No Market card can be exiled.','do');return !!r}
  case'acq':return !!(await takeFromMarket('acquires',x.c,true));
  case'acqex':{const ok=await ask(`The Bot acquires a ${chip(x.c)} from the Exile pile. Is there one?`,[['Yes',1],['No',0]],'If there are several, it takes the one worth the most points.');if(!ok)return false;
    const r=await cardForm('Describe the Region taken from the Exile pile.',{fixed:x.c});S.deck.unshift(r.card);if(TURN)TURN.took.push(r.card.n);await todo(`${cname(r.card)} goes on top of the Bot's deck. Place it on the "Bot's cards" stack.`);return true}
  case'inn':{if(await takeFromMarket('innovates',[x.c],false))return true;
    const hasPile=x.c!=='vas';
    const r=await ask(`None ${chip(x.c)} from the Market. ${hasPile?`Take the top face-down card of the deck ${CAT[x.c]}. If that deck is empty, reveal`:'Reveal'} the Main deck cards one by one until the first ${chip(x.c)}, then shuffle the others back in.`,[['I have a card',1],['No card of this category',0,'']]);
    if(!r){log('No card available: the Bot gains 2 Progress instead.');gain({prog:2});return true}
    const f=await cardForm('Describe the card obtained.',{fixed:x.c});S.deck.unshift(f.card);if(TURN)TURN.found.push(f.card.n);await todo(`The Bot innovates ${cname(f.card)} : the card goes on top of its deck. Place it on the "Bot's cards" stack.`);return true}
  case'fame':return fameCard('deck');
  case'famearch':return fameCard('hist');
  case'conv':{const n=S.res[x.from];if(!n)return false;S.res[x.from]=0;S.res[x.to]+=n;log(`The Bot spends its ${n} ${chip(x.from)} and gains ${n} ${chip(x.to)}.`);return true}
  case'rep':{const k=Math.floor(S.res[x.r]/x.n);if(!k)return false;S.res[x.r]-=k*x.n;S.res.prog+=k;log(`The Bot spends ${k*x.n} ${chip(x.r)} and gains ${k} ${chip('prog')}.`);return true}
  case'scygl':{const n=S.res.mat;if(!n)return false;S.res.mat=0;log(`The Bot spends its ${n} ${chip('mat')}.`);millN(Math.ceil(n/2));return true}
  case'ret':{const i=S.discard.findIndex(y=>y.cat==='ins');if(i<0)return false;S.discard.splice(i,1);if(TURN)TURN.ret++;
    await todo('The Bot returns an Unrest from its discard pile: put a card from the "Bot\'s Unrest" stack back into the common pile.');return true}
  case'regtop':case'regplay':{let i=-1;S.discard.forEach((y,j)=>{if(y.cat==='reg')i=j});if(i<0)return false;const r=S.discard.splice(i,1)[0];
    if(x.t==='regtop'){S.deck.unshift(r);log(`The Bot recovers ${cname(r)} from its discard pile and places it on top of its deck.`)}else{S.play.push(r);if(TURN)TURN.reg.push(r.n);log(`The Bot brings into play ${cname(r)} from its discard pile.`)}return true}
  case'steal':{let got={mat:0,prog:0};
    for(const r of ['mat','prog'])if(x[r]){const b=[];for(let i=x[r];i>=0;i--)b.push([i?`${i} given${i>1?'s':''}`:'Nothing (I have none, or protection)',i,i===x[r]?'pri':'']);
      got[r]=await ask(`The Bot steals ${x[r]} ${chip(r)}from you. How many do you give it?`,b,'It is an Attack. Give what you can, then return those tokens to the supply: the app adds them to the Bot.')}
    if(!got.mat&&!got.prog){if(TURN)TURN.blocked++;log('The theft earns the Bot nothing.','you');return false}
    if(TURN)TURN.hit.push('a theft of '+et(['mat','prog'].filter(r=>got[r]).map(r=>qt(got[r],r))));
    log('The Bot steals '+['mat','prog'].filter(r=>got[r]).map(r=>got[r]+' '+chip(r)).join(' and ')+'.','you');S.res.mat+=got.mat;S.res.prog+=got.prog;return true}
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

const ROWNAME={ren:'Fame',reg:'Region',tra:'Tradition',vas:'Tributary',civ:'Civilised',B:'Barbarian icon',E:'Empire icon',perm:'permanent card',atk:'Attack',autre:'Other'};
const matches=(x,k)=>CAT[k]?(x.cat===k||x.cat2===k):k==='B'||k==='E'?x.st===k:k==='perm'?x.perm:k==='atk'?x.atk:k==='autre'?true:norm(x.n)===norm(k);
async function resolve(x,where){
  log(`${where} : ${x.n}`,'card');
  if(x.cat==='ins'){if(TURN)TURN.ret++;await todo('Unrest: it goes back to the pile. Put a card from the "Bot\'s Unrest" stack back into the common pile.');return}
  for(const [k,eff] of T[S.nat][S.state]){if(!matches(x,k))continue;
    log(`Line applied: <b>${ROWNAME[k]||k}</b> (tableau ${S.state==='B'?'Barbarian':'Empire'}).`);
    const ctx={dest:'disc'};let did=false;for(const a of eff)did=(await run(a,ctx))||did;
    if(!did){log('Nothing in this line can be resolved: move to the next matching line.');continue}
    if(ctx.dest==='hist'){S.hist.push(x);TURN.arch.push(x.n);log(`${cname(x)} is put into its History.`)}
    else if(ctx.dest==='play'){S.play.push(x);TURN.reg.push(x.n);log(`${cname(x)} enters play for the Bot`)}
    else if(ctx.dest==='top'){S.deck.unshift(x);log(`${cname(x)} goes back on top of its deck.`)}
    else{toDiscard(x);log(`${cname(x)} goes to its discard pile.`)}
    return}
  toDiscard(x);log(`No effect possible: ${cname(x)} goes to its discard pile.`)}

/* ---------- déroulement ---------- */
function drawForSlot(){
  if(!S.deck.length){if(S.dyn.length)dyn();
    if(S.discard.length){S.deck=shuffle(S.discard);S.discard=[];log('The Bot shuffles its discard pile to rebuild its deck.')}}
  return S.deck.shift()||null}
async function botTurn(queue){
  REC={snap:JSON.stringify(S),ans:[],q:(queue||[]).map(clone)};LOG=[];TURN=newTurn();$('#title').textContent=`Round ${S.round} : the Bot's turn`;
  const die=1+rnd(6);S.skip=die<=S.n?die:0;
  log(`Die: <b>${die}</b>. `+(S.skip?`The card in slot ${die} won't be resolved this turn.`:'No slot matches: all cards are resolved.'));
  for(let i=1;i<=S.n;i++){if(i===S.skip||!S.slots[i])continue;const x=S.slots[i];S.slots[i]=null;await resolve(x,'Slot '+i);board()}
  log('The Bot\'s Cleanup','card');
  if(S.skip&&S.skip<=5)await todo(`Add ${NAT[S.nat].cleanup||'1 Progress'} from the supply on the Market card in slot ${S.skip}.`);
  else log('No token to add to the Market this turn.');
  if(S.skip>1){S.slots[1]=S.slots[S.skip];S.slots[S.skip]=null}
  S.skip=0;for(let i=1;i<=S.n;i++)if(!S.slots[i])S.slots[i]=drawForSlot();
  if(S.diff===1&&S.deck.length){const x=S.deck.shift();toDiscard(x);log(`Warlord: the top card of its deck is discarded (${cname(x)}).`)}
  log('Its slots are filled again.');
  const st=story();TURN=null;log(st,'story');
  await ask('<div class="story">'+st+'</div>End of the round: resolve your Solstice effects now. The Bot has none.',[['Solstice resolved',1]]);
  if(S.trig!=null&&S.round>S.trig)return endGame();
  S.round++;playerTurn()}
function adjust(){
  const p=$('#prompt');p.innerHTML=`<div class="q">Manual adjustment</div><div class="hint">For your own cards' effects that affect the Bot, or to fix a mistake.</div>
  <div class="row" id="adj"></div><div class="row" style="margin-top:10px" id="adj2"></div><div class="row" style="margin-top:14px"><button type="button" class="pri" id="adjok">Back</button></div>`;
  for(const r of ['mat','pop','prog'])for(const d of [1,-1]){const b=document.createElement('button');b.type='button';b.textContent=(d>0?'+1 ':'−1 ')+RES[r];
    b.onclick=()=>{S.res[r]=Math.max(0,S.res[r]+d);board();save()};$('#adj').append(b)}
  const acts=[['It recovers an Unrest',async()=>{await getIns()}],
    ['It draws (top card of its deck to the discard pile)',async()=>{LOG=[];millN(1)}],
    ['It gains a card',async()=>{const f=await cardForm('Describe the card the Bot gains.',{});S.deck.unshift(f.card)}],
    ['It abandons a Region',async()=>{if(S.play.length)toDiscard(S.play.pop())}],
    ['It recalls a Region',async()=>{if(S.play.length)S.deck.unshift(S.play.pop())}]];
  acts.forEach(([l,f])=>{const b=document.createElement('button');b.type='button';b.textContent=l;b.onclick=async()=>{await f();save();board();adjust()};$('#adj2').append(b)});
  $('#adjok').onclick=()=>playerTurn(true)}
async function playerTurn(keep){
  REC=null;if(!keep){save();LOG=[]}
  $('#title').textContent=`Round ${S.round} : your turn`;drawLog();
  const last=S.trig!=null;
  const r=await ask(last?(S.round>S.trig?'Last round. Play your turn normally, Cleanup included.':'The Countdown is triggered. Finish your turn, Cleanup included.'):'Play your turn normally, Cleanup included. The Bot will play next.',
    [['I\'ve finished my turn','go'],['Manual adjustment','adj',''],...(last?[]:[['The Countdown is triggered','trig','']]),['Collapse','col','warn']],
    last?'':'Declare the Countdown if the Main deck is empty, if you Develop your last card or if King of Kings is flipped face down.');
  if(r==='go')return botTurn();
  if(r==='adj')return adjust();
  if(r==='trig'){trigger('you declared it');return playerTurn(true)}
  if(r==='col'){const ok=await ask('Is the Unrest pile empty?',[['Yes, Collapse',1,'warn'],['No, go back',0]]);if(ok)return endGame(true);return playerTurn(true)}}
function endGame(collapse){drop();REC=null;TURN=null;LOG=[];$('#title').textContent='End of the game';const sc=botScore();board();
  if(collapse){log('<b>Effondrement.</b> In solo, the game is lost whatever the Unrest split.','you');return finish(null,sc,true)}
  log(`The Bot's score: <span class="big">${sc.total}</span> points`,'end');
  log(`${sc.cards} card points (${sc.n} cards in its deck, discard pile, History, Regions in play and slots), ${sc.prog} for Progress, ${sc.r} for its ${S.res.mat+S.res.pop} Materials and Population (1 point per ${sc.div}).`);
  const p=$('#prompt'),F=[['x1','Points from fixed-value cards'],['x2','Points from star cards (10 at most per card)'],['x3','Points from question-mark cards whose condition is met'],['x4','Number of Unrest cards (−2 each)'],['x5','Other negative points'],['x6','Progress tokens in your reserve']];
  p.innerHTML=`<div class="q">Your score sheet</div><div class="hint">Count all your cards: hand, play area, deck, discard pile, History, reserved cards and Power card. Leave out the Nation deck and unpaid Developments.</div><div class="form">
   ${F.map(([i,l])=>`<label class="f" for="${i}">${l}<input type="number" id="${i}" min="0" value="0"></label>`).join('')}
   <div>Total: <span class="big" id="xt">0</span> points</div><div class="row"><button type="button" class="pri" id="xok">Confirm my score</button></div></div>`;
  const tot=()=>{const v=i=>Math.max(0,+$('#'+i).value||0);return v('x1')+v('x2')+v('x3')-2*v('x4')-v('x5')+v('x6')};
  p.querySelectorAll('input').forEach(i=>i.addEventListener('input',()=>$('#xt').textContent=tot()));
  $('#xok').onclick=()=>finish(tot(),sc,false)}
function finish(me,sc,collapse){const win=!collapse&&me>sc.total,p=$('#prompt'),camp=S.camp&&META.camp;
  if(!collapse)log(win?`<b>Victory</b>: ${me} to ${sc.total}.`:`The Bot wins ${sc.total} to ${me}. You need strictly more points than it.`,win?'end':'you');
  META.hist.unshift({d:new Date().toLocaleDateString('fr-FR'),bot:NAT[S.nat].name,lvl:DIFF[S.diff][0],me,civ:sc.total,res:collapse?'Collapse':win?'Victory':'Defeat',camp:!!camp});META.hist=META.hist.slice(0,50);
  const again=()=>{p.innerHTML='<div class="row"><button type="button" class="pri" id="again">New game</button></div>';$('#again').onclick=start};
  if(camp){const C=META.camp;
    if(win){C.wins++;C.bonus=false;
      if(C.level>=4){log('<b>Campaign won.</b> You defeated the Bot at Overlord level.','end');META.camp=null;saveMeta();return again()}
      C.level++;saveMeta();
      p.innerHTML=`<div class="q">Campaign reward: choose one of the two options.</div><label class="f" for="rw">Card name<input type="text" id="rw" autocomplete="off"></label>
       <div class="row" style="margin-top:10px"><button type="button" id="rwa" class="pri">Add this common card gained to my starting deck</button><button type="button" id="rwr">Remove this card from my starting deck</button></div>
       <div class="hint" style="margin:10px 0 0">Next game: level ${DIFF[C.level][0]}.</div>`;
      const done=k=>{const n=$('#rw').value.trim();if(!n){$('#rw').focus();return}C[k].push(n);saveMeta();log(k==='added'?`${n} joins your starting deck for the rest of the campaign.`:`${n} leaves your starting deck for the rest of the campaign.`,'end');again()};
      $('#rwa').onclick=()=>done('added');$('#rwr').onclick=()=>done('removed');return}
    C.losses++;C.bonus=true;
    if(C.losses>=4){log('<b>Campaign lost</b>: four losses.','you');META.camp=null}
    else log(`Campaign: ${C.losses+(C.losses>1?' losses':' loss')} out of 4 allowed. Your next game starts with double resources (6 Materials, 4 Population, 2 Progress).`,'you')}
  saveMeta();again()}
function newGame(nat,diff){const N=NAT[nat],cl=x=>Object.assign({},x);
  const dev=shuffle(N.dev.map(cl)).sort((a,b)=>b.vp-a.vp);
  S={nat,diff,n:DIFF[diff][1],state:'B',round:1,res:diff>=3?{mat:3,pop:2,prog:1}:{mat:0,pop:0,prog:0},
    deck:shuffle(N.deck.map(cl)),discard:[],hist:[],play:[],dyn:[...shuffle(N.nat.map(cl)),Object.assign(cl(N.adv),{adv:true}),...dev],slots:[null],skip:0,trig:null,kok:false,camp:false,seed:(Math.random()*2147483647)|0};
  for(let i=1;i<=S.n;i++)S.slots[i]=S.deck.shift()||null}