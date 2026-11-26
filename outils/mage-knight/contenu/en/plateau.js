const COL={r:'red',g:'green',b:'blue',w:'white',gold:'gold',black:'black'};
const BASIC=['r','g','b','w'];
const rnd=n=>Math.floor(Math.random()*n);
const shuffle=a=>{for(let i=a.length-1;i>0;i--){const j=rnd(i+1);[a[i],a[j]]=[a[j],a[i]]}return a};
let UID=1;

/* ---------- Cartes ---------- */
const C={
 marche:{n:'March',c:'g',bt:'Move 2',st:'Move 4',base:[{k:'move',n:2}],strong:[{k:'move',n:4}]},
 endurance:{n:'Stamina',c:'b',bt:'Move 2',st:'Move 4',base:[{k:'move',n:2}],strong:[{k:'move',n:4}]},
 rapidite:{n:'Swiftness',c:'w',bt:'Move 2',st:'Ranged Attack 3',base:[{k:'move',n:2}],strong:[{k:'ranged',n:3}]},
 rage:{n:'Rage',c:'r',bt:'Attack 2 or Block 2',st:'Attack 4',base:[{k:'atk',n:2},{k:'block',n:2}],strong:[{k:'atk',n:4}]},
 determination:{n:'Determination',c:'b',bt:'Attack 2 or Block 2',st:'Block 5',base:[{k:'atk',n:2},{k:'block',n:2}],strong:[{k:'block',n:5}]},
 promesse:{n:'Promise',c:'w',bt:'Influence 2',st:'Influence 4',base:[{k:'inf',n:2}],strong:[{k:'inf',n:4}]},
 menace:{n:'Threaten',c:'r',bt:'Influence 2',st:'Influence 5, Reputation −1',base:[{k:'inf',n:2}],strong:[{k:'inf',n:5,rep:-1}]},
 tranquillite:{n:'Tranquility',c:'g',bt:'Healing 1 or draw 1 card',st:'Healing 2 or draw 2 cards',base:[{k:'heal',n:1},{k:'draw',n:1}],strong:[{k:'heal',n:2},{k:'draw',n:2}]},
 cristallisation:{n:'Crystallize',c:'b',bt:'Pay 1 mana: gain a crystal of its colour',st:'Gain a crystal of your choice',base:[{k:'crypay'}],strong:[{k:'cryany'}]},
 attirance:{n:'Mana Draw',c:'w',bt:'One extra die from the Source this turn',st:'Take a die, set its colour: 2 tokens of that colour',base:[{k:'xdie'}],strong:[{k:'mdraw'}]},
 concentration:{n:'Concentration',c:'g',bt:'Gain a blue, white or red token',st:'Next card: free stronger effect and +2',base:[{k:'tok',opts:['b','w','r']}],strong:[{k:'conc'}]},
 improvisation:{n:'Improvisation',c:'r',bt:'Discard another card: Move, Influence, Attack or Block 3',st:'Same with 5',
   base:['move','inf','atk','block'].map(k=>({k,n:3,disc:1})),strong:['move','inf','atk','block'].map(k=>({k,n:5,disc:1}))},
 // Actions Avancées (gagnées en montant de niveau)
 traitfeu:{n:'Fire Bolt',c:'r',adv:1,bt:'Gain a red crystal',st:'Ranged Fire Attack 3',base:[{k:'cry',col:'r'}],strong:[{k:'ranged',n:3,el:'fire'}]},
 traitglace:{n:'Ice Bolt',c:'b',adv:1,bt:'Gain a blue crystal',st:'Ranged Ice Attack 3',base:[{k:'cry',col:'b'}],strong:[{k:'ranged',n:3,el:'ice'}]},
 traitvif:{n:'Swift Bolt',c:'w',adv:1,bt:'Gain a white crystal',st:'Ranged Attack 4',base:[{k:'cry',col:'w'}],strong:[{k:'ranged',n:4}]},
 traitlourd:{n:'Crushing Bolt',c:'g',adv:1,bt:'Gain a green crystal',st:'Siege Attack 3',base:[{k:'cry',col:'g'}],strong:[{k:'siege',n:3}]},
 marcherev:{n:'Refreshing Walk',c:'g',adv:1,bt:'Move 2 and Healing 1',st:'Move 4 and Healing 2',base:[{k:'move',n:2,plus:{k:'heal',n:1}}],strong:[{k:'move',n:4,plus:{k:'heal',n:2}}]}
};
const STARTER=['marche','marche','endurance','endurance','rapidite','rapidite','rage','rage','determination','promesse','menace','tranquillite','cristallisation','attirance','concentration','improvisation'];
const ADV=['traitfeu','traitglace','traitvif','traitlourd','marcherev'];
const mk=id=>({uid:UID++,id,def:C[id]});
const wound=()=>({uid:UID++,w:true,def:{n:'Wound'}});

const UNITS={
 villageois:{n:'Peasants',cost:4,armor:3,lvl:1,ab:[{k:'atk',n:2},{k:'block',n:2},{k:'inf',n:2},{k:'move',n:2}]},
 herboristes:{n:'Herbalists',cost:3,armor:2,lvl:1,ab:[{k:'heal',n:2},{k:'tok',opts:['g']}]},
 forestiers:{n:'Foresters',cost:5,armor:4,lvl:1,ab:[{k:'move',n:2},{k:'block',n:3}]},
 gardes:{n:'Guardsmen',cost:5,armor:5,lvl:2,ab:[{k:'atk',n:2},{k:'block',n:4}]},
 arbaletriers:{n:'Crossbowmen',cost:6,armor:4,lvl:2,ab:[{k:'atk',n:3},{k:'ranged',n:3}]}
};
const E=(n,armor,atk,fame,ab=[],res=[])=>({n,armor,atk,fame,ab,res});
const ORCS=[E('Prowlers',3,4,2),E('Wolf Riders',4,3,3,['Swift']),E('Cursed Hags',5,3,3,['Poison']),E('Ironclads',3,4,4,['Brutal'],['phys']),E('Sappers',3,3,2,['Fortified'])];
const GARNISON=[E('Crossbowmen',4,4,3,['Swift']),E('Swordsmen',5,6,4)];
const MONSTRES=[E('Minotaur',5,5,4,['Brutal']),E('Gargoyle',4,5,4,[],['phys']),E('Loup-garou',5,7,5,['Swift'])];

/* ---------- Plateau : 4 tuiles de 7 cases, coordonnées axiales ---------- */
const TER={plaine:['Plains',2,2],collines:['Hills',3,3],foret:['Forest',3,5],desol:['Wasteland',4,4],desert:['Desert',5,3],marais:['Swamp',5,5],lac:['Lake',0,0],montagne:['Mountain',0,0]};
const MAP={};
const H=(q,r,tile,t,site,col)=>{MAP[q+','+r]={q,r,tile,t,site,col}};
H(0,0,0,'plaine','portail');H(1,0,0,'plaine');H(1,-1,0,'foret');H(0,-1,0,'collines');H(-1,0,0,'lac');H(-1,1,0,'plaine');H(0,1,0,'plaine');
H(3,-2,1,'collines','mine','r');H(2,-1,1,'plaine');H(2,-2,1,'foret');H(3,-3,1,'desol');H(4,-3,1,'montagne');H(4,-2,1,'foret','clairiere');H(3,-1,1,'plaine');
H(2,1,2,'plaine','village');H(3,1,2,'plaine');H(3,0,2,'collines');H(2,0,2,'plaine');H(1,1,2,'foret');H(1,2,2,'lac');H(2,2,2,'marais');
H(5,-1,3,'collines','forteresse');H(6,-1,3,'desert');H(6,-2,3,'montagne');H(5,-2,3,'desol','taniere');H(4,-1,3,'plaine');H(4,0,3,'foret');H(5,0,3,'plaine');
const SITE={portail:'Portal: your starting point.',village:'Village: recruit Units or heal with Influence.',
 mine:'Crystal mine: end your turn here to gain a red crystal.',clairiere:'Magical Glade: a gold mana token (black at night) at the start of the turn, and one Wound removed from your hand or discard pile at the end of the turn.',
 forteresse:'Keep: entering it triggers the assault on its fortified garrison.',taniere:'Monster Den: an action to fight the monster hiding inside.'};
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
 {t:'The cards',h:'Your cards are your actions',
  txt:`<p>In Mage Knight, everything goes through your hand of cards. Each card offers a <b>basic effect</b>, free, written at the top.</p>
  <p>Any card can also be played <b>sideways</b> (turned horizontally): it is then worth 1 point of Move, Influence, Attack or Block, whatever its text.</p>
  <p>Moving costs Move points depending on the terrain you enter. The number at the top of each space shows that cost.</p>`,
  goal:'Reach the gold-circled forest (cost 3).',hint:'Play March or Stamina for 2 points, then another card sideways for the third, and click the forest.',
  setup(s){s.hand=['marche','endurance','rage','promesse','rapidite'];s.noMana=true;s.target='1,-1'},ok:s=>s.hero==='1,-1'},
 {t:'Mana',h:'Mana makes your cards stronger',
  txt:`<p>L'<b>stronger effect</b> of a card requires one mana of its colour. The <b>Source</b>, on the right, offers three dice: you can use <b>only one per turn</b>.</p>
  <p>A die <b>gold</b> replaces any colour, but only by day. The die used is rerolled at the end of your turn.</p>
  <p>The <b>crystals</b> are mana you keep from one turn to the next. The Crystallize card makes them.</p>`,
  goal:'Reach the gold-circled forest using at least one stronger effect.',hint:'The path costs 2 (portal plains) then 3 (forest). March\'s stronger effect with the green die gives 4, a sideways card does the rest.',
  setup(s){s.hero='-1,1';s.hand=['marche','rage','promesse','determination','cristallisation'];s.source=['g','r','gold'].map(c=>({c,used:false}));s.target='1,-1'},ok:s=>s.hero==='1,-1'&&s.usedStrong},
 {t:'Explore',h:'Revealing new lands',
  txt:`<p>The board is uncovered little by little. From a space on the edge of an unknown area, spend <b>2 Move points</b> to reveal the neighbouring tile. In the introductory scenario, each revealed tile earns 1 Fame.</p>
  <p>You can keep moving after exploring, as long as you have points left. Unspent points are lost at the end of the turn.</p>
  <p>At night, forest costs 5 instead of 3 and desert 3 instead of 5.</p>`,
  goal:'Explore the tile to the south-east, then enter the village.',hint:'You need 6 points: 2 to explore by clicking an adjacent "?" space, 2 for the plains, 2 for the village. Three Move cards are enough.',
  setup(s){s.hero='1,0';s.hand=['endurance','endurance','marche','rapidite','rage'];s.source=['b','w','r'].map(c=>({c,used:false}))},ok:s=>s.hero==='2,1'},
 {t:'Village',h:'Interacting with the locals',
  txt:`<p>After moving, you are entitled to <b>one action</b>. In a village, it is an interaction, paid for in points of<b>Influence</b>.</p>
  <p>There you can <b>recruit a Unit</b> (you need a free Command token) and <b>heal</b>: 3 Influence per point of Healing, each point removes a Wound from your hand.</p>
  <p>Your <b>Reputation</b> adds or removes Influence at each interaction. Threaten, with its stronger effect, lowers it.</p>`,
  goal:'Recruit a Unit at the village.',hint:'Promise\'s stronger effect with the white die gives 4 Influence, enough to hire the Peasants. With Threaten and sideways cards, you can also heal your Wound.',
  setup(s){s.hero='2,1';s.revealed.add(2);s.hand=['promesse','menace','W','rage','marche'];s.source=['w','r','b'].map(c=>({c,used:false}))},ok:s=>s.units.length>0},
 {t:'Combat',h:'A combat in four phases',
  txt:`<p>Orc Marauders are camped on the adjacent space. Click them to attack: it is your action for the turn.</p>
  <p>Combat always follows the same order: <b>ranged attack</b>, <b>block</b>, <b>damage</b>, <b>attack</b>. The right-hand panel guides you.</p>
  <p>Two rules to remember: a Block only counts if it matches the enemy Attack, and you must reach the enemy Armor all at once.</p>`,
  goal:'Defeat the Prowlers (Armor 3, Attack 4).',hint:'One die per turn: keep the red one for Rage\'s stronger effect (Attack 4). To block 4, play Determination and the other Rage as Block 2 each. You can also take two Wounds.',
  setup(s){s.hero='2,-1';s.revealed.add(1);s.enemies={'3,-1':ORCS[0]};s.hand=['rage','rage','determination','rapidite','marche'];s.source=['r','g','b'].map(c=>({c,used:false}))},ok:s=>s.kills>0},
 {t:'Damage',h:'Wounds, Units and Swift enemies',
  txt:`<p>These Orcs are <b>Swift</b>: to block them, you need <b>double</b> their Attack. Sometimes, taking the hit is the best choice.</p>
  <p>Unblocked damage is assigned. A <b>Unit</b> absorbs as much as its Armor and becomes Wounded. Your hero receives one <b>Wound per Armor step</b>, rounded up: 3 damage against Armor 2 is 2 Wounds.</p>
  <p>A Unit activates once per Round, by clicking it.</p>`,
  goal:'Defeat the Wolf Riders (Armor 4, Attack 3, Swift).',hint:'Two options: let the Peasants absorb the 3 damage then strike with Rage\'s stronger effect, or block 6 with the Peasants and two Rage, then attack with Improvisation and a sideways card.',
  setup(s){s.hero='2,-1';s.revealed.add(1);s.enemies={'3,-1':ORCS[1]};s.units=[{id:'villageois',spent:false,wounded:false}];s.hand=['rage','rage','improvisation','marche','endurance'];s.source=['r','gold','g'].map(c=>({c,used:false}))},ok:s=>s.kills>0},
 {t:'Keep',h:'Assault, end of turn and level',
  txt:`<p>Entering a keep starts an<b>assault</b>. Its garrison is <b>fortified</b>: Ranged Attacks have no effect, only siege counts in the first phase. Attacking a stronghold also costs 1 Reputation.</p>
  <p>Each defeated enemy earns <b>Fame</b>. At the end of the turn, if you crossed a threshold, you go up a <b>level</b>.</p>
  <p>Always finish with "End of turn": played cards discarded, then draw up to your Hand Limit.</p>`,
  goal:'Take the keep (Armor 4, Attack 4), then end your turn to reach level 2.',hint:'Stamina and Swiftness sideways give the 3 points to enter. Determination\'s stronger effect with the blue die blocks 5. The two Rage give Attack 4.',
  setup(s){s.hero='4,-1';[1,2,3].forEach(t=>s.revealed.add(t));s.siteEnemy={'5,-1':E('Militia',4,4,3)};s.hand=['rapidite','rage','rage','determination','endurance'];s.source=['b','w','g'].map(c=>({c,used:false}))},ok:s=>s.keepOwned&&s.level>=2},
 {t:'Free game',h:'First expedition',
  txt:`<p>Your turn to play, with no safety net. Your 16-card deck is shuffled, the board is waiting to be explored and the enemies are drawn at random.</p>
  <p>The game lasts <b>three Rounds</b>: day, night, day. A Round ends when you announce it, once your deck is empty.</p>
  <p>Remember to Rest to clear Wounds from your hand, the mine for crystals and the village for reinforcements.</p>`,
  goal:'Conquer the keep to the east before the end of the third Round.',hint:'The Orc Marauders are a good first target. A Unit recruited at the village helps a lot for the assault. Moving along a marauder\'s space provokes it.',
  setup(s){s.free=true;s.enemies={'3,-3':ORCS[rnd(ORCS.length)],'3,1':ORCS[rnd(4)]};s.siteEnemy={'5,-1':GARNISON[rnd(2)],'5,-2':MONSTRES[rnd(3)]}},ok:s=>s.keepOwned},
 {t:'Night',h:'Crossing the forest at Night',
  txt:`<p>Night has fallen. Forest now costs <b>5</b> instead of 3, and the <b>gold</b> die from the Source can't be used.</p><p>Desert, on the other hand, would only cost 3.</p>`,
  goal:'Enter the gold-circled forest despite the Night.',hint:'March\'s stronger effect with the green die gives 4 points. A sideways card brings the fifth.',
  setup(s){s.day=false;s.hand=['marche','endurance','rage','promesse','rapidite'].slice(0,1).concat(['rage','promesse','determination','cristallisation']);s.source=['r','gold','g'].map(c=>({c,used:false}));s.target='1,-1'},ok:s=>s.hero==='1,-1'},
 {t:'Provocation',h:'Don\'t wake the Orcs',
  txt:`<p>Orc Marauders are camped on the hill. Moving <b>directly from a space adjacent to them to another space adjacent to them</b> provokes them: they attack and your Movement stops.</p><p>So the shortest path isn't always the right one.</p>`,
  goal:'Reach the gold-circled village without triggering a combat.',hint:'The direct path runs along the Orcs. Detour through the forest to the west (3 points), then enter the village (2 points): this forest doesn\'t touch their space.',
  setup(s){s.hero='2,0';s.revealed.add(2);s.enemies={'3,0':ORCS[0]};s.hand=['marche','endurance','rapidite','rage','promesse'];s.noMana=true;s.target='2,1'},ok:s=>s.hero==='2,1'&&!s.fought},
 {t:'Reputation',h:'When Reputation pays',
  txt:`<p>Your Reputation is at <b>+2</b>: it adds 1 Influence to each interaction, only once per turn.</p><p>Your hand is poor, but this bonus can make the difference.</p>`,
  goal:'Recruit the Peasants (4 Influence).',hint:'Promise gives 2, March sideways gives 1 when choosing Influence, and Reputation adds 1.',
  setup(s){s.hero='2,1';s.revealed.add(2);s.rep=2;s.hand=['promesse','marche','W','W','W'];s.noMana=true},ok:s=>s.units.length>0},
 {t:'Mine',h:'Harvesting a Crystal',
  txt:`<p>The neighbouring hill hosts a red <b>Crystal Mine</b> . If you <b>end your turn</b> on it, you gain a Crystal of its colour.</p><p>A Crystal is kept from one turn to the next, three per colour at most.</p>`,
  goal:'Gain a red Crystal.',hint:'The hill costs 3: March and Stamina are enough. Then click "End of turn".',
  setup(s){s.hero='2,-1';s.revealed.add(1);s.hand=['marche','endurance','rage','promesse','determination'];s.source=['b','w','g'].map(c=>({c,used:false}))},ok:s=>s.crystals.r>0}
];

function setupBoard(i){
  LI=i;
  S=fresh();const L=LESSONS[i];L.setup(S);
  const ids=STARTER.slice();
  if(Array.isArray(S.hand)&&S.hand.length){const hand=S.hand.map(id=>{if(id==='W')return wound();ids.splice(ids.indexOf(id),1);return mk(id)});S.hand=hand;S.deck=shuffle(ids.map(mk))}
  else{S.deck=shuffle(ids.map(mk));S.hand=[];draw(5)}
  say(L.free?'The game begins. Safe travels.':'Mini-game: '+L.h+'.');
}
function say(m,cls){S.log.unshift({m,cls});S.log.length=Math.min(S.log.length,5)}
function draw(n){for(let i=0;i<n&&S.deck.length;i++)S.hand.push(S.deck.shift())}

/* ---------- Dialogue de choix ---------- */
function ask(title,opts,body,noCancel){return new Promise(res=>{
  $('#mtitle').textContent=title;$('#mbody').innerHTML=body||'';$('#mbody').hidden=!body;
  const box=$('#mopts');box.innerHTML='';
  const all=noCancel?opts:opts.concat([{label:'Cancel',value:null}]);
  all.forEach(o=>{const b=document.createElement('button');b.innerHTML=o.label+(o.sub?'<small>'+o.sub+'</small>':'');b.onclick=()=>{$('#modal').hidden=true;res(o.value)};box.appendChild(b)});
  $('#modal').hidden=false;box.querySelector('button').focus();
})}

/* ---------- Mana ---------- */
function manaOpts(color,noCrystal){const o=[];const seen=new Set();
  const fits=c=>color?c===color:BASIC.includes(c);
  S.tokens.forEach((c,idx)=>{if((fits(c)||(c==='gold'&&S.day))&&!seen.has('t'+c)){seen.add('t'+c);o.push({type:'tok',idx,c,label:'Mana token '+COL[c]})}});
  if(!noCrystal)BASIC.forEach(c=>{if(fits(c)&&S.crystals[c]>0)o.push({type:'cry',c,label:'Crystal '+COL[c],sub:'The crystal is spent.'})});
  if(!S.noMana&&S.dieUsed<1+S.extraDice)S.source.forEach((d,idx)=>{if(!d.used&&(fits(d.c)||(d.c==='gold'&&S.day))&&!seen.has('d'+d.c)){seen.add('d'+d.c);o.push({type:'die',idx,c:d.c,label:'Die '+COL[d.c]+' from the Source',sub:d.c==='gold'?'Gold replaces any basic colour, by day.':'Your die for this turn.'})}});
  return o}
function spend(o){if(o.type==='tok')S.tokens.splice(S.tokens.indexOf(o.c),1);else if(o.type==='cry')S.crystals[o.c]--;else{S.source[o.idx].used=true;S.dieUsed++}}
function addCrystal(c,effect){if(S.crystals[c]>=3){if(effect){S.tokens.push(c);say('Already 3 Crystals '+COL[c]+': this one becomes a mana token for this turn.')}else say('Already 3 Crystals '+COL[c]+': you get nothing.');return}S.crystals[c]++}

/* ---------- Effets ---------- */
const LBL={move:'Move',inf:'Influence',atk:'Attack',block:'Block',ranged:'Ranged Attack',siege:'Siege Attack',heal:'Healing'};
const EL={fire:' fire',ice:' ice'};
function label(a){if(LBL[a.k])return LBL[a.k]+(a.el?EL[a.el]:'')+' '+a.n;
  return {draw:'Draw '+a.n+' card'+(a.n>1?'s':''),tok:'Mana token '+(a.opts||[]).map(c=>COL[c]).join(' or '),crypay:'Crystallize a mana',cryany:'Crystal of your choice',cry:'Crystal '+COL[a.col],xdie:'One more die',mdraw:'Two mana tokens',conc:'Concentration'}[a.k]}
function valid(a){const c=S.combat;switch(a.k){
  case 'move':return c?'No movement during a combat.':S.acted?'After your action, you can\'t move any more this turn.':true;
  case 'inf':return c?'Influence is no use in combat.':true;
  case 'atk':return c&&c.phase===3?true:c?'A normal Attack is played during the Attack phase, the fourth.':'There is no combat in progress.';
  case 'ranged':case 'siege':return c&&(c.phase===0||c.phase===3)?true:c?'Attacks are played in phase 1 (ranged and siege) or in phase 4.':'There is no combat in progress.';
  case 'block':return c&&c.phase===1?true:c?'Block is played during the Block phase, the second.':'There is no combat in progress.';
  case 'heal':return c?'You don\'t heal in the middle of a combat.':(S.hand.some(x=>x.w)||S.units.some(u=>u.wounded))?true:'You have no Wound to heal.';
  default:return true}}
async function prep(a,uid){
  const p={};
  if(a.disc){const o=S.hand.filter(c=>c.uid!==uid&&!c.w);if(!o.length){say('Improvisation requires discarding another card.','bad');return null}
    p.disc=await ask('Which card to discard?',o.map(c=>({label:c.def.n,value:c.uid})));if(p.disc==null)return null}
  if(a.k==='crypay'){const o=manaOpts(null,true);if(!o.length){say('You need a mana (die or token) to turn into a crystal.','bad');return null}
    p.mana=await ask('Which mana to crystallize?',o.map(x=>({label:x.label,value:x})));if(!p.mana)return null;p.col=p.mana.c;
    if(p.col==='gold'){p.col=await ask('The gold becomes a crystal of which colour?',BASIC.map(c=>({label:COL[c],value:c})));if(!p.col)return null}}
  if(a.k==='cryany'||a.k==='mdraw'){if(a.k==='mdraw'&&!S.source.some(d=>!d.used)){say('No die available in the Source.','bad');return null}
    p.col=await ask(a.k==='mdraw'?'Which colour for the die?':'A crystal of which colour?',BASIC.map(c=>({label:COL[c],value:c})));if(!p.col)return null}
  if(a.k==='tok'){p.col=a.opts.length===1?a.opts[0]:await ask('Which mana token?',a.opts.map(c=>({label:COL[c],value:c})));if(!p.col)return null}
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
  return await ask('Which effect?',v.map(a=>({label:label(a),value:a})))}

async function playCard(uid,mode){
  const card=S.hand.find(c=>c.uid===uid);if(!card||S.over)return;
  const d=card.def;
  if(mode==='strong'&&S.noMana){say('Mana comes in the next lesson. Here, use the basic effect or play the card sideways.','bad');return render()}
  const alts=mode==='side'?['move','inf','atk','block'].map(k=>({k,n:1})):d[mode];
  const a=await pick(alts);if(!a)return render();
  const p=await prep(a,uid);if(!p)return render();
  let bonus=0;
  if(mode==='strong'){
    if(S.conc){S.conc=false;bonus=2}
    else{const o=manaOpts(d.c);if(!o.length){say('You need a mana '+COL[d.c]+' for this stronger effect'+(S.dieUsed>=1+S.extraDice&&!S.noMana?' (you have already taken your die this turn).':'.'),'bad');return render()}
      const m=o.length===1?o[0]:await ask('Pay with which mana?',o.map(x=>({label:x.label,sub:x.sub,value:x})));if(!m)return render();spend(m)}
    S.usedStrong=true}
  S.hand.splice(S.hand.indexOf(card),1);S.played.push(card);S.playedAny=true;
  run(a,p,bonus);
  say(d.n+(mode==='side'?' played sideways: ':mode==='strong'?' stronger effect: ':' : ')+label(a)+(bonus?' (+2 thanks to Concentration)':'')+'.');
  render()}

/* ---------- Unités ---------- */
async function clickUnit(i){const u=S.units[i],d=UNITS[u.id],c=S.combat;
  if(c&&c.phase===2){if(u.wounded){say('An already Wounded Unit can\'t absorb any more.','bad')}else{const tox=c.enemy.ab.includes('Poison');u.wounded=tox?2:1;c.dmg=Math.max(0,c.dmg-d.armor);say(d.n+' absorb '+d.armor+' damage and are Wounded'+(tox?' twice (Poison).':'.'));if(c.dmg===0){say('All damage is absorbed.','good');c.phase=3}}return render()}
  if(u.wounded){if(S.heal>=d.lvl){S.heal-=d.lvl;u.wounded--;say(d.n+(u.wounded?' : one Wound removed, one is left.':' are healed.'),'good')}else say('A Wounded Unit can\'t act. Healing it costs '+d.lvl+' Healing point(s).','bad');return render()}
  if(u.spent){say(d.n+' are Spent until the end of the Round.','bad');return render()}
  const a=await pick(d.ab);if(!a)return render();const p=await prep(a);if(!p)return render();
  run(a,p,0);u.spent=true;say(d.n+' : '+label(a)+'.');render()}
const repMod=()=>({'-7':-99,'-6':-5,'-5':-3,'-4':-2,'-3':-1,'-2':-1,'2':1,'3':1,'4':2,'5':2,'6':3,'7':5}[S.rep]||0);
const effInf=()=>S.influence+(S.repApplied?0:repMod());
function payInf(n){if(effInf()<n){say('You need '+n+' Influence (you have '+Math.max(0,effInf())+'). Play Influence cards or sideways cards.','bad');return false}
  if(!S.repApplied){S.influence+=repMod();S.repApplied=true}S.influence-=n;S.acted=true;return true}
async function recruit(id){const d=UNITS[id];
  if(effInf()<d.cost){payInf(d.cost);return render()}
  if(S.units.length>=S.cmd){const i=await ask('No free Command token',S.units.map((u,i)=>({label:'Disband '+UNITS[u.id].n,value:i})),'To recruit, you must disband one of your Units: it is removed from the game.');if(i==null)return render();S.units.splice(i,1)}
  if(payInf(d.cost)){S.units.push({id,spent:false,wounded:0});say(d.n+' join your army, Ready right away.','good')}render()}
function buyHeal(){if(!S.hand.some(c=>c.w)&&!S.units.some(u=>u.wounded)){say('You have nothing to heal.','bad');return render()}
  if(payInf(3)){heal(1);say('You buy 1 Healing point.','good')}render()}

/* ---------- Déplacement ---------- */
function clickHex(k){if(S.over)return;const h=MAP[k];
  if(S.combat){say('Finish the combat first.','bad');return render()}
  if(!S.revealed.has(h.tile)){
    const near=Object.keys(MAP).some(x=>MAP[x].tile===h.tile&&adj(S.hero,x));
    if(!near)say('To explore this tile, stand on a space that touches it.','bad');
    else if(S.acted)say('After your action, you can\'t explore any more this turn.','bad');
    else if(S.move<2)say('Exploring costs 2 Move points (you have '+S.move+').','bad');
    else{S.move-=2;S.revealed.add(h.tile);S.moved=true;S.fame++;say('New tile revealed: +1 Fame.','good')}
    return render()}
  const T=TER[h.t];
  if(k===S.hero||!adj(S.hero,k)){say(T[0]+(T[1]?' (cost '+cost(k)+')':', impassable')+'. '+(S.enemies[k]?'Orc Marauders: '+S.enemies[k].n+'.':h.site?SITE[h.site]:'')+(k!==S.hero&&T[1]?' You can only enter an adjacent space.':''));return render()}
  if(S.enemies[k]){if(S.acted)say('You have already taken your action this turn.','bad');else startCombat(k,'orcs',S.enemies[k]);return render()}
  if(!T[1]){say(T[0]+' : impassable.','bad');return render()}
  if(S.acted){say('After your action, you can\'t move any more this turn.','bad');return render()}
  const c=cost(k);
  if(S.move<c){say(T[0]+' : you need '+c+' Move points, you have '+S.move+'. Play Move cards, or other cards sideways.','bad');return render()}
  const from=S.hero;S.move-=c;S.prev=from;S.hero=k;S.moved=true;say('You enter '+T[0].toLowerCase()+' for '+c+'.');
  const prov=Object.keys(S.enemies).find(e=>adj(from,e)&&adj(k,e));
  if(prov){say('By moving along their space, you provoke the '+S.enemies[prov].n+' : they attack, your movement stops.','bad');startCombat(prov,'orcs',S.enemies[prov])}
  else if(h.site==='forteresse'&&!S.keepOwned){S.rep=Math.max(-7,S.rep-1);say('Assault on the keep: Reputation −1.');startCombat(k,'keep',S.siteEnemy[k])}
  render()}
function startCombat(key,kind,enemy){S.combat={key,kind,enemy,phase:0,atk:[],block:0,dmg:0,wounds:0,fort:kind==='keep'||enemy.ab.includes('Fortified')};S.acted=true;S.heal=0;S.fought=true;
  say('Combat against '+enemy.n+' (Armure '+enemy.armor+', Attack '+enemy.atk+').')}
function atkTotal(){const c=S.combat,e=c.enemy;let ok=0,res=0;
  c.atk.forEach(x=>{if(c.phase===0&&!(x.kind==='siege'||(x.kind==='ranged'&&!c.fort)))return;if(e.res.includes(x.el))res+=x.n;else ok+=x.n});
  return ok+Math.floor(res/2)}
const blockNeed=()=>S.combat.enemy.atk*(S.combat.enemy.ab.includes('Swift')?2:1);
function win(){const c=S.combat,e=c.enemy;S.fame+=e.fame;S.kills++;let m=e.n+' defeated: +'+e.fame+' Gloire.';
  if(c.kind==='orcs'){delete S.enemies[c.key];S.rep=Math.min(7,S.rep+1);m+=' The locals approve: Reputation +1.'}
  if(c.kind==='keep'){S.keepOwned=true;m+=' The keep is yours.'}
  if(c.kind==='den'){S.denDone=true;S.rewards.push('den');m+=' Reward at the end of the turn: two Crystals rolled on the die.'}
  S.combat=null;say(m,'good')}
function combatAct(act){const c=S.combat,e=c.enemy;
  if(act==='attack'){if(atkTotal()>=e.armor)win();else say('You are missing '+(e.armor-atkTotal())+' point(s): an insufficient attack does nothing.','bad')}
  else if(act==='next0'){c.phase=1;say('Block phase: the enemy attacks.')}
  else if(act==='block'){if(c.block>=blockNeed()){say('Attack blocked, no damage.','good');c.phase=3}else say('Insufficient Block: you need '+blockNeed()+' all at once.','bad')}
  else if(act==='noblock'){c.dmg=e.atk*(e.ab.includes('Brutal')?2:1);c.phase=2;say('Unblocked: '+c.dmg+' damage to assign.')}
  else if(act==='take'){const w=Math.ceil(c.dmg/S.armor);for(let i=0;i<w;i++)S.hand.push(wound());c.wounds+=w;let m='Your hero takes '+c.dmg+' damage: '+w+' Wound(s) in hand.';
    if(e.ab.includes('Poison')){for(let i=0;i<w;i++)S.discard.push(wound());m+=' Poison: as many in the discard pile.'}
    if(c.wounds>=S.handLimit){S.discard.push(...S.hand.filter(x=>!x.w));S.hand=S.hand.filter(x=>x.w);m+=' Knocked out: you discard your other cards.'}
    c.dmg=0;c.phase=3;say(m,'bad')}
  else if(act==='flee'){if(c.kind==='keep'){S.hero=S.prev;say('Assault failed: you fall back to your previous space.','bad')}else say('You break off the combat. The enemy stays in place.','bad');S.combat=null}
  render()}
function denFight(){if(S.acted){say('You have already taken your action this turn.','bad');return render()}startCombat(S.hero,'den',S.siteEnemy[S.hero]);render()}

/* ---------- Fin de tour, repos, Manche ---------- */
const TH=[0,3,8,15,24];
async function claimRewards(){for(const r of S.rewards.splice(0))for(let i=0;i<2;i++){const d=roll();
  if(d==='black'){S.fame++;say('Monster Den reward: black die, +1 Fame instead of the Crystal.','good')}
  else{const c=d==='gold'?await ask('Gold die: a Crystal of which colour?',BASIC.map(x=>({label:COL[x],value:x})),'',true):d;addCrystal(c);say('Monster Den reward: Crystal '+COL[c]+'.','good')}}}
async function levelUps(){while(S.level<5&&S.fame>=TH[S.level]){S.level++;
  if(S.level%2===0){const pool=shuffle(ADV.filter(x=>!S.advTaken.includes(x))).slice(0,3);
    const id=await ask('Level '+S.level+' !',pool.map(x=>({label:C[x].n,sub:C[x].bt+' / '+C[x].st,value:x})),'At even levels, you gain a Skill (not simulated here) and an Advanced Action card, taken from an Offer of three cards and placed on top of your Deck. Which one do you take?',true);
    S.advTaken.push(id);S.deck.unshift(mk(id));say('Level '+S.level+' : '+C[id].n+' joins your deck.','good')}
  else if(S.level===3){S.armor=3;S.cmd=2;say('Level 3: Armor 3 and a second Command token.','good')}
  else{S.handLimit=6;S.cmd=3;say('Level 5: Hand Limit 6 and a third Command token.','good')}}}
async function endTurn(rest){
  if(S.over)return;
  if(S.combat){say('Finish the combat first.','bad');return render()}
  if(!rest&&!S.playedAny&&S.hand.some(c=>!c.w)){const uid=await ask('Which card to discard?',S.hand.filter(c=>!c.w).map(c=>({label:c.def.n,value:c.uid})),'You played no card this turn: the rules require you to discard at least one before drawing.');if(uid==null)return render();S.discard.push(S.hand.splice(S.hand.findIndex(c=>c.uid===uid),1)[0])}
  const h=MAP[S.hero];
  if(h.site==='mine'){addCrystal(h.col);say('The mine gives you a crystal '+COL[h.col]+'.','good')}
  if(h.site==='clairiere'){let i=S.hand.findIndex(c=>c.w);if(i>=0){S.hand.splice(i,1);say('The Glade removes a Wound from your hand.','good')}else{i=S.discard.findIndex(c=>c.w);if(i>=0){S.discard.splice(i,1);say('The Glade removes a Wound from your discard pile.','good')}}}
  S.discard.push(...S.played);S.played=[];S.tokens=[];S.move=S.influence=S.heal=0;S.conc=false;
  S.source.forEach(d=>{if(d.used&&!d.keep)d.c=roll();d.used=false;d.keep=false});S.dieUsed=0;S.extraDice=0;
  await claimRewards();
  await levelUps();
  const near=S.keepOwned&&(S.hero==='5,-1'||adj(S.hero,'5,-1'));
  const lim=S.handLimit+(near?1:0);if(S.hand.length<lim)draw(lim-S.hand.length);
  S.acted=S.moved=S.playedAny=S.repApplied=false;S.turn++;
  say('New turn. You refill your hand to '+lim+' cards'+(near?' (+1 thanks to your keep)':'')+(S.deck.length?'.':' ; your deck is empty.'));
  if(MAP[S.hero].site==='clairiere'){S.tokens.push(S.day?'gold':'black');say('The Glade offers you a mana token '+(S.day?'or.':'black (only useful for the stronger effect of Spells).'),'good')}
  if(!S.deck.length&&!S.hand.length)return endRound();
  render()}
async function rest(){
  if(S.combat||S.over)return;
  if(S.moved||S.acted){say('Resting replaces the whole turn: impossible after moving or taking an action.','bad');return render()}
  const nw=S.hand.filter(c=>!c.w),w=S.hand.filter(c=>c.w);
  if(!nw.length&&!w.length){say('Your hand is empty.','bad');return render()}
  if(nw.length){const uid=await ask('Rest: which card to discard?',nw.map(c=>({label:c.def.n,value:c.uid})),'You discard one non-Wound card and all the Wounds in your hand. Discarded Wounds will come back at the next shuffle: only Healing removes them for good.');
    if(uid==null)return render();S.discard.push(S.hand.splice(S.hand.findIndex(c=>c.uid===uid),1)[0]);S.discard.push(...w);S.hand=S.hand.filter(c=>!c.w);say('You rest: '+w.length+' Wound(s) discarded.')}
  else{S.discard.push(S.hand.splice(0,1)[0]);say('Slow Recovery: you only have Wounds, a single one is discarded.')}
  endTurn(true)}
async function endRound(){
  if(S.combat)return;
  if(S.free&&S.round>=3){S.over=true;render();
    await ask(S.keepOwned?'Expedition successful':'End of the expedition',[{label:'Play again',value:1}],'Three Rounds have passed. Fame: <b>'+S.fame+'</b>, level '+S.level+'. '+(S.keepOwned?'The keep has fallen.':'The keep still holds: try another approach.'),true);
    setupBoard(7);return render()}
  const all=[...S.deck,...S.hand,...S.discard,...S.played];S.deck=shuffle(all);S.hand=[];S.discard=[];S.played=[];
  S.day=!S.day;S.round++;S.source=rollSource();S.dieUsed=0;S.extraDice=0;S.tokens=[];S.move=S.influence=S.heal=0;
  S.units.forEach(u=>u.spent=false);S.acted=S.moved=S.playedAny=S.repApplied=false;draw(S.handLimit);
  say('Round '+S.round+' : '+(S.day?'the day breaks.':'night falls. Forest costs 5, desert 3, and gold from the Source can\'t be used.')+' Deck reshuffled, Units ready.','good');
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
  let s=`<svg viewBox="${x0-SZ-4} ${y0-SZ-4} ${x1-x0+2*SZ+8} ${y1-y0+2*SZ+8}" role="img" aria-label="Game board">`;
  const hero=px(MAP[S.hero].q,MAP[S.hero].r);
  keys.forEach(k=>{const h=MAP[k],[x,y]=px(h.q,h.r),T=TER[h.t];
    if(!S.revealed.has(h.tile)){s+=`<g class="hex" data-hex="${k}"><title>Unexplored area: 2 Move points from an adjacent space</title><polygon class="base" points="${pts(x,y,SZ-1)}" fill="var(--t-fog)"/><text x="${x}" y="${y+7}" text-anchor="middle" font-size="22" fill="var(--muted)">?</text></g>`;return}
    const e=S.enemies[k];const reach=!S.combat&&!S.acted&&adj(S.hero,k)&&T[1]&&!e&&S.move>=cost(k);
    s+=`<g class="hex" data-hex="${k}"><title>${T[0]}${T[1]?', cost '+cost(k):', impassable'}${h.site?' · '+SITE[h.site]:''}${e?' · Orc Marauders: '+e.n:''}</title><polygon class="base" points="${pts(x,y,SZ-1)}" fill="var(--t-${h.t})"/>${deco(h.t,x,y)}`;
    if(T[1])s+=`<text class="cost" x="${x}" y="${y-27}" text-anchor="middle">${cost(k)}</text>`;
    s+=siteIcon(h,x,y);
    if(e)s+=`<circle cx="${x}" cy="${y-6}" r="15" fill="#3d6b34" stroke="#12202a" stroke-width="2"/><path d="M${x-7} ${y-13}l14 14M${x+7} ${y-13}l-14 14" stroke="#f3efe2" stroke-width="3" stroke-linecap="round"/><text class="lbl" x="${x}" y="${y+21}" text-anchor="middle">${e.armor} / ${e.atk}</text>`;
    if(reach)s+=`<polygon class="reach" points="${pts(x,y,SZ-6)}"/>`;
    if(S.target===k&&S.hero!==k)s+=`<polygon class="target" points="${pts(x,y,SZ-5)}"/>`;
    s+='</g>'});
  const hy=hero[1]+(MAP[S.hero].site?20:2);
  s+=`<g pointer-events="none"><circle cx="${hero[0]}" cy="${hy}" r="13" fill="var(--accent)" stroke="#fff" stroke-width="2.5"/><path d="M${hero[0]-6} ${hy-5}h12v5q0 6 -6 8q-6 -2 -6 -8z" fill="#fff"/></g></svg>`;
  $('#map').innerHTML=s;
  $('#mapbar').innerHTML=`<span class="daynight">${S.day?'Day':'Night'} · Round ${S.round}${S.free?' / 3':''} · turn ${S.turn}</span><span>Click an adjacent space to enter it, a "?" space to explore.</span>`}
const gem=c=>`<span class="gem mc-${c}" title="mana ${COL[c]}"></span>`;
function renderSide(){let s='';const c=S.combat;
  if(c){const e=c.enemy,ph=['Ranged','Block','Damage','Attack'];
    s+=`<h2>Combat</h2><div class="enemy"><b>${e.n}</b><div>Armor ${e.armor} · Attack ${e.atk} · Fame ${e.fame}</div><div>${c.fort?'<span class="tag">Fortified</span>':''}${e.ab.filter(a=>a!=='Fortified').map(a=>`<span class="tag">${a}</span>`).join('')}${e.res.length?'<span class="tag">Physical resistance</span>':''}</div></div>
    <ol class="phases">${ph.map((p,i)=>`<li class="${i===c.phase?'cur':i<c.phase?'past':''}">${i+1}. ${p}</li>`).join('')}</ol>`;
    const at=atkTotal();
    if(c.phase===0)s+=`<p>${c.fort?'Fortified enemy: only <b>siege</b> Attacks count in this phase.':'Only <b>ranged</b> and <b>siege</b> Attacks count here. Defeating it now avoids its counterattack.'}</p><div class="pools"><span class="pool on">Usable attack <b>${at}</b> / ${e.armor}</span></div>
      <div class="row"><button class="primary" data-cb="attack" ${at>=e.armor?'':'disabled'}>Attack</button><button data-cb="next0">Go to Block</button></div>${at<e.armor?`<p class="why">"Attack" stays greyed out as long as you are missing ${e.armor-at} point${e.armor-at>1?'s':''}. In phase 1, only ${c.fort?'Siege Attacks':'Ranged and Siege Attacks'} count: a card played as a normal Attack or sideways will wait for phase 4. Otherwise, go to Block.</p>`:''}`;
    if(c.phase===1)s+=`<p>The enemy strikes at ${e.atk}.${e.ab.includes('Swift')?' It is Swift: you need double.':''} A Block only counts if it reaches <b>${blockNeed()}</b>.</p><div class="pools"><span class="pool on">Block <b>${c.block}</b> / ${blockNeed()}</span></div>
      <div class="row"><button class="primary" data-cb="block" ${c.block>=blockNeed()?'':'disabled'}>Block</button><button data-cb="noblock">Don't block</button></div>${c.block<blockNeed()?`<p class="why">"Block" stays greyed out as long as you are missing ${blockNeed()-c.block} point${blockNeed()-c.block>1?'s':''} Block. Play cards as Block, or choose not to block.</p>`:''}`;
    if(c.phase===2)s+=`<p>Remaining damage: <b>${c.dmg}</b>${e.ab.includes('Brutal')?' (Brutal: doubled)':''}. Click a Unit to have it absorb as much as its Armor, or let your hero take it: ${Math.ceil(c.dmg/S.armor)} Wound(s) with Armor ${S.armor}.</p>
      <div class="row"><button class="primary" data-cb="take">The hero takes</button></div>`;
    if(c.phase===3)s+=`<p>All your Attacks count. You must reach the Armor all at once.${e.res.length?' Physical resistance: your physical attacks are halved.':''}</p><div class="pools"><span class="pool on">Attack <b>${at}</b> / ${e.armor}</span></div>
      <div class="row"><button class="primary" data-cb="attack" ${at>=e.armor?'':'disabled'}>Attack</button><button data-cb="flee">Break off the combat</button></div>${at<e.armor?`<p class="why">"Attack" stays greyed out as long as you are missing ${e.armor-at} point${e.armor-at>1?'s':''} : you must reach the Armor all at once. Play Attack cards; any sideways card adds 1.</p>`:''}`;
  }else{
    const h=MAP[S.hero];s+=`<h2>Your hero</h2><div class="pools"><span class="pool ${S.move?'on':''}">Move <b>${S.move}</b></span><span class="pool ${S.influence?'on':''}">Influence <b>${S.influence}</b></span>${S.heal?`<span class="pool on">Healing <b>${S.heal}</b></span>`:''}</div>`;
    s+=`<div class="sub">On this space</div><p>${TER[h.t][0]}. ${h.site?SITE[h.site]:'Nothing special here.'}</p>`;
    const shop=ids=>ids.map(id=>{const d=UNITS[id];return `<button data-recruit="${id}">Recruit ${d.n} (${d.cost})<br><small>Armor ${d.armor} · ${d.ab.map(label).join(', ')}</small></button>`}).join('');
    if(h.site==='village')s+=`<div class="sub">Interact (Influence ${Math.max(0,effInf())}${!S.repApplied&&repMod()?', Reputation included':''})</div>${shop(['villageois','herboristes','forestiers'])}<button data-heal="1">Buy 1 Healing (3)</button>`;
    if(h.site==='forteresse'&&S.keepOwned)s+=`<div class="sub">Your keep (Influence ${Math.max(0,effInf())})</div>${shop(['gardes','arbaletriers'])}`;
    if(h.site==='taniere'&&!S.denDone)s+=`<button class="primary" data-den="1">Enter the den</button>`;
  }
  if(!S.noMana){s+=`<div class="sub">Mana Source</div><div class="row">${S.source.map(d=>{const off=(d.c==='gold'&&!S.day)||(d.c==='black');return `<span class="die mc-${d.c} ${d.used?'used':off?'off':''}" title="Die ${COL[d.c]}${off?' : unusable '+(d.c==='black'?'(reserved for Spells, at night)':'at night'):''}" style="color:${d.c==='w'||d.c==='gold'?'#12202a':'#fff'}">${COL[d.c].slice(0,2)}</span>`}).join('')}<small>${S.dieUsed>=1+S.extraDice?'Die for this turn used':'1 die per turn'}</small></div>
    <div class="row"><span class="sub">Crystals</span>${BASIC.map(c=>`${gem(c)}<b>${S.crystals[c]}</b>`).join(' ')}</div>${S.tokens.length?`<div class="row"><span class="sub">Tokens</span>${S.tokens.map(c=>`<span class="tok mc-${c}" title="token ${COL[c]}"></span>`).join('')}</div>`:''}${S.conc?'<p><b>Concentration active</b>: next stronger effect free, +2.</p>':''}`}
  s+=`<div class="sub">Hero sheet</div><div class="stat"><span>Level</span><span>${S.level}</span><span>Fame</span><span>${S.fame}${S.level<5?' / '+TH[S.level]:''}</span><span>Reputation</span><span>${S.rep>0?'+':''}${S.rep}${repMod()?' (Influence '+(repMod()>0?'+':'')+repMod()+')':''}</span><span>Armor</span><span>${S.armor}</span><span>Hand Limit</span><span>${S.handLimit}</span><span>Command</span><span>${S.units.length} / ${S.cmd}</span></div>`;
  if(S.units.length)s+=`<div class="sub">Units</div>`+S.units.map((u,i)=>{const d=UNITS[u.id];return `<div class="unit ${u.spent?'spent':''} ${u.wounded?'wounded':''}"><div class="row"><b>${d.n}</b><span>Armor ${d.armor}</span></div><small>${d.ab.map(label).join(' · ')}</small><button data-unit="${i}">${c&&c.phase===2?(u.wounded?'Already Wounded':'Absorb '+d.armor+' damage'):u.wounded?'Wounded: heal ('+d.lvl+')':u.spent?'Spent':'Activate'}</button></div>`}).join('');
  $('#side').innerHTML=s}
function renderHand(){
  $('#handbar').innerHTML=`<h2>Your hand <small style="font-family:var(--f-body);font-weight:400;color:var(--muted)">· deck ${S.deck.length} · discard ${S.discard.length}</small></h2>
   <div class="row">${!S.deck.length&&!S.playedAny&&!S.moved&&!S.acted?'<button data-act="round">Announce the end of the Round</button>':''}<button data-act="rest" ${S.combat?'disabled':''}>Rest</button><button class="primary" data-act="end" ${S.combat?'disabled':''}>End of turn</button></div>`;
  $('#hand').innerHTML=S.hand.map(c=>c.w?`<div class="card wound"><div class="band"></div><div class="in"><div class="cname">Wound</div><div class="eff">Unplayable. It takes up a slot in your hand. Heal it, or discard it by resting.</div></div></div>`:
   `<div class="card"><div class="band mc-${c.def.c}"></div><div class="in"><div class="cname">${c.def.n}${c.def.adv?' ★':''}</div>
    <div class="eff"><i>Basic</i>${c.def.bt}</div><div class="eff"><i>Stronger ${gem(c.def.c)}</i>${c.def.st}</div>
    <div class="btns"><button data-play="base" data-uid="${c.uid}">Basic</button><button data-play="strong" data-uid="${c.uid}">Stronger</button><button class="side" data-play="side" data-uid="${c.uid}">Sideways (+1)</button></div></div></div>`).join('')||'<p style="color:var(--muted)">Empty hand. End your turn to draw.</p>';
  $('#played').textContent=S.played.length?'Played this turn: '+S.played.map(c=>c.def.n).join(', ')+'.':''}
function renderCoach(){const L=LESSONS[LI],ok=L.ok(S),free=!!L.free;
  $('#coach').innerHTML=`<div class="step">${free?'Practice':'Mini-game'}</div><h2>${L.h}</h2><div class="txt">${L.txt}</div>
   <div class="goal ${ok?'done':''}"><div class="lab">${ok?'Goal reached':'Goal'}</div>${L.goal}</div>
   <details class="hint"><summary>A hint</summary><p>${L.hint}</p></details>
   <div class="row"><button data-lesson="again">${free?'New game':'Restart this case'}</button></div>
   <div class="log" aria-live="polite">${S.log.map(l=>`<div class="${l.cls||''}">${l.m}</div>`).join('')}</div>`}