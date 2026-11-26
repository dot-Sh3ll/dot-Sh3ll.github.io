/* ================= PARTIE NUMÉRIQUE : table virtuelle contre la C.I.V. ================= */
let UID=1;const uid=()=>'k'+(UID++)+'_'+Math.floor(Math.random()*1e6);
const mk=(n,o={})=>Object.assign({id:uid(),n,cat:null,st:null,perm:false,atk:false,vp:0,vt:'f',t:'',ic:[],cost:null},o);
const ICN={prod:'Production',eau:'Water',fert:'Fertile',ville:'City',metro:'Metropolis',masque:'Mask',chev:'Knight',riv:'Water',ocean:'Water',chasse:'Hunting'};
const TXT_INS='Choose: pay 1 Population OR discard 2 cards OR pay 3 Materials. If you do, return this card to the Unrest pile.';
const DINS=()=>mk('Unrest',{cat:'ins',vp:-2,t:TXT_INS});
const DPROSP='All players MAY draw 1 card. Choose: gain 1 Material per Production icon OR gain 1 Population per Region you have in play.';
const GLOIRE='This card can\'t be reserved. Abandon 3 Regions to look at up to 2 Fame cards. Keep one of them and put the other back on the Fame deck.';
const PROG='Choose: pay 3 Materials to acquire a Tradition or a Civilised OR pay 5 Materials to innovate a Tradition or Civilised.';
const CONQ='Choose: pay 2 Population to acquire a Region or a Tributary OR pay 3 Population to innovate a Region or Tributary.';
const MYNAT={rom:{name:'Romans',
  power:{n:'Romans',t:'Passive: each time you look at any number of cards from the Fame deck, look at 1 extra card then gain 1 Progress.',vt:'s',vtx:'1 VP per 4 Population'},
  deck:()=>[mk('Glory',{t:'This card can\'t be reserved. Abandon 3 Regions to look at up to 2 Fame cards. Keep one of them and put the other back on the Fame deck.',glory:true}),
    mk('Prosperity',{t:DPROSP}),
    mk('Progress',{st:'B',t:'Choose: pay 3 Materials to acquire a Tradition or a Civilised OR pay 5 Materials to innovate a Tradition or Civilised.'}),
    mk('Conquer',{st:'B',t:'Choose: pay 2 Population to acquire a Region or a Tributary OR pay 3 Population to innovate a Region or Tributary.'}),
    mk('Triumvirate',{st:'B',t:'Innovate a Tradition. Put Triumvirate into your History.'}),
    mk('City of Rome',{perm:true,ic:['ville'],t:'Solstice: you MAY discard 1 card to Choose: gain 1 Population OR gain 1 Material OR draw 1 card.'}),
    mk('Dalmatia',{cat:'reg',perm:true,ic:['prod'],t:'Gain 1 Population. You MAY reserve 1 card.'}),
    mk('Roman Expansion',{st:'B',atk:true,t:'Acquire a Region. You MAY acquire a Region again. Each other player recalls a Region. Put Roman Expansion into your History.'}),
    DINS(),DINS()],
  nat:()=>[mk('Prosperity',{t:DPROSP}),
    mk('Bread and Circuses',{perm:true,t:'Solstice: discard 1 card. You MAY return an Unrest. You MAY return an Unrest from your discard pile.'}),
    mk('Gallia Aquitania',{cat:'reg',perm:true,ic:['prod','fert'],t:'You MAY reserve 1 card.'}),
    mk('Raetia',{cat:'reg',perm:true,ic:['prod','eau'],t:'Gain 1 Material. You MAY reserve 1 card.'}),DINS()],
  adv:()=>mk('Julius Caesar',{st:'E',adv:true,t:'Free action. Choose: draw 2 cards OR you MAY acquire a Region or a Tributary. Put Julius Caesar into your History.'}),
  dev:()=>[mk('Military Genius',{st:'E',atk:true,vp:3,cost:{mat:4,pop:1},t:'Each other player discards 2 cards. You MAY innovate a Tradition.'}),
    mk('Roman Invasion',{st:'E',atk:true,vp:2,cost:{pop:3},t:'You MAY acquire a Region or a Tributary. Each other player abandons a Region.'}),
    mk('Legions',{st:'E',perm:true,vp:2,cost:{pop:3},t:'Passive: increase your hand size by 1. Your Conquer cards lose the Barbarian icon.'}),
    mk('The Senate',{st:'E',vp:3,cost:{mat:4},t:'You MAY acquire a Tradition. You MAY put 1 card from your hand into your History.'}),
    mk('Rome, the Eternal City',{st:'E',perm:true,ic:['metro'],vp:4,cost:{mat:3,pop:3},t:'Can only be played if City of Rome is in play. Put City of Rome into your History. Solstice: Choose: gain 1 Material OR gain 1 Population OR draw 1 card.'}),
    mk('Emperor Trajan',{st:'E',vt:'s',vp:5,vtx:'1 VP per 3 Population',cost:{mat:2,pop:1},t:'Acquire a Tradition, a Civilised, a Region or a Tributary. Put Emperor Trajan into your History.'})]},
car:{name:'Carthaginians',
  power:{n:'Carthaginians',t:'Passive: when you must place 1 Progress on a Market card, place 2 Materials on that card instead.',vt:'s',vtx:'1 VP per 3 Materials'},
  deck:()=>[mk('Glory',{t:GLOIRE,glory:true}),mk('Prosperity',{t:DPROSP}),mk('Progress',{st:'B',t:PROG}),mk('Conquer',{st:'B',t:CONQ}),
    mk('Dido, Queen of Carthage',{st:'B',t:'Gain 1 Population. You MAY acquire a Region and play it as a Free action. Put Dido into your History.'}),
    mk('Carthaginian Merchants',{st:'B',t:'Free action. Add 1 Material onto a Market card. You MAY put 1 card from your hand or discard pile into your History.'}),
    mk('Balearic Islands',{cat:'reg',perm:true,ic:['prod','prod','eau'],t:'You MAY reserve 1 card.'}),
    mk('Mauretania',{cat:'reg',perm:true,ic:['prod'],t:'Gain 2 Materials. You MAY reserve 1 card.'}),DINS(),DINS()],
  nat:()=>[mk('Prosperity',{t:DPROSP}),mk('Progress',{st:'B',t:PROG}),
    mk('Caravans',{perm:true,t:'Exhaust: pay 3 Materials and discard 1 card to acquire 1 Market card that has Materials on it.'}),
    mk('Iberia',{cat:'reg',perm:true,ic:['prod','fert'],t:'You MAY reserve 1 card.'}),mk('Berbers',{cat:'vas',t:'Gain 2 Population.'})],
  adv:()=>mk('City of Carthage',{perm:true,ic:['ville'],adv:true,t:'Solstice: you MAY discard 1 card to Choose: gain 1 Material OR gain 1 Population OR draw 1 card.'}),
  dev:()=>[mk('Hannibal',{st:'E',vp:4,cost:{pop:4},t:'You MAY acquire a Tradition, a Civilised, a Region or a Tributary. You MAY draw 1 card. You MAY recover 1 card from your History. Put Hannibal into your History.'}),
    ...[0,1].map(()=>mk('Elephants',{st:'E',atk:true,vp:2,cost:{pop:3},t:'Each other player abandons a Region. You MAY innovate a Region or Tributary. Put these Elephants into your History.'})),
    mk('Merchant Ships',{st:'E',perm:true,vp:4,cost:{mat:4,pop:1},t:'Exhaust: you MAY recall a Water Region or a Fertile Region to acquire 1 Market card that has Materials on it.'}),
    mk('Monopoly',{st:'E',atk:true,vt:'s',vp:5,vtx:'1 VP per 5 Materials',cost:{mat:7},t:'Gain 2 Materials and draw 1 card. Give each other player 1 card from your hand or discard pile.'}),
    mk('Hegemony',{st:'E',vp:2,cost:{mat:3,pop:1},t:'Pay 2 Materials to acquire a Tradition, a Civilised, a Region or a Tributary. Each player MAY draw 1 card.'})]},
cel:{name:'Celts',
  power:{n:'Celts',vt:'s',vtx:'1 VP per Tradition',t:'Exhaust: when you acquire or innovate a Tradition, exhaust Celts, then each other player recovers an Unrest.'},
  deck:()=>[mk('Glory',{t:GLOIRE,glory:true}),mk('Progress',{st:'B',t:PROG}),
    mk('Druids',{t:'Choose: gain 1 Progress OR pay 1 Population to innovate a Tradition OR return an Unrest to gain 1 Population.'}),
    mk('Cattle Raid',{st:'B',atk:true,t:'Gain 2 Materials. Steal 1 Material from each player with at least one Region in play. Steal 1 Progress from each player who is an Empire.'}),
    mk('Celtica',{cat:'reg',perm:true,ic:['prod'],t:'You MAY recover 1 card from your discard pile and place it on top of your deck. You MAY reserve 1 card.'}),
    mk('Boudica',{st:'B',atk:true,t:'Gain 1 Progress. Each other player abandons a Region. Put Boudica into your History.'}),
    mk('Cauldron of Cerridwen',{perm:true,t:'Exhaust: pay 1 Progress to gain 2 Population.'}),
    mk('Conquer',{st:'B',t:CONQ}),DINS(),DINS()],
  nat:()=>[mk('Conquer',{st:'B',t:CONQ}),
    mk('Gallia Belgica',{cat:'reg',perm:true,ic:['eau'],t:'You MAY draw 1 card. You MAY reserve 1 card.'}),
    mk('Hibernia',{cat:'reg',perm:true,ic:['fert'],t:'You MAY recover 1 card from your discard pile. You MAY reserve 1 card.'}),
    mk('Armorica',{cat:'reg',perm:true,ic:['prod','eau'],t:'You MAY reserve 1 card.'}),
    mk('Britannia',{cat:'reg',perm:true,ic:['prod','fert'],t:'You MAY reserve 1 card.'}),DINS()],
  adv:()=>mk('Celtic Gold',{adv:true,t:'Each other player gains 1 Material. Gain 4 Materials per Fertile icon in your play area.'}),
  dev:()=>[mk('Chain Mail',{st:'E',perm:true,vp:4,cost:{mat:3,pop:1},t:'Passive: gain 1 Progress when you play an Attack.'}),
    mk('Vercingetorix',{st:'E',vt:'s',vp:5,vtx:'1 VP per Tradition',cost:{mat:4},t:'You MAY acquire a Tradition, a Civilised, a Region or a Tributary. Put Vercingetorix into your History.'}),
    mk('Celtic Innovation',{st:'E',atk:true,vp:4,cost:{mat:2,pop:2},t:'You MAY acquire a Tradition or a Civilised. Each other player recovers an Unrest.'}),
    mk('Ogham Script',{st:'E',perm:true,vp:4,cost:{mat:2,pop:2},t:'Passive: increase your hand size by 1. Exhaust: you MAY put 1 card from your hand into your History. You MAY put 1 card from your discard pile into your History.'}),
    mk('Chariots',{st:'E',perm:true,vp:4,cost:{pop:3},t:'Passive: you may acquire an exiled Region. Your Conquer cards and your Attacks lose the Barbarian icon.'})]},
gre:{name:'Greeks',
  power:{n:'Greeks',vt:'s',vtx:'1 VP per 7 cards',t:'Exhaust: spend 2 Actions to innovate a Tradition or Civilised.'},
  deck:()=>[mk('Glory',{t:GLOIRE,glory:true}),mk('Progress',{st:'B',t:PROG}),mk('Conquer',{st:'B',t:CONQ}),
    mk('Colonists',{st:'B',t:'Choose: pay 1 Population to acquire a Region OR gain 1 Progress OR return an Unrest.'}),
    mk('Greek Mercenaries',{atk:true,t:'Gain 1 Progress. Draw 1 card. Steal 2 Materials from each other player. Each other player gains 1 Population.'}),
    mk('City of Sparta',{st:'B',perm:true,ic:['ville'],t:'Solstice: you MAY discard 1 card to Choose: gain 1 Population OR gain 1 Material OR draw 1 card.'}),
    mk('Peloponnese',{cat:'reg',perm:true,ic:['prod','eau'],t:'Gain 1 Population. You MAY reserve 1 card.'}),
    mk('Pholoe Forest',{cat:'reg',perm:true,ic:['prod'],t:'You MAY reserve 1 card.'}),DINS(),DINS()],
  nat:()=>[mk('City of Athens',{perm:true,ic:['ville'],t:'Solstice: you MAY discard 1 card to Choose: gain 1 Population OR gain 1 Material OR draw 1 card.'}),
    mk('Plains of Thessaly',{cat:'reg',perm:true,ic:['prod'],t:'Gain 1 Material. You MAY reserve 1 card.'}),DINS()],
  adv:()=>mk('Olympic Games',{adv:true,t:'Draw 2 cards. Put 1 card from your hand into your History.'}),
  dev:()=>[mk('Lighthouse',{st:'E',perm:true,vp:3,cost:{mat:5},t:'Exhaust: Choose: recover an Attack from your discard pile and place it on top of your deck OR exchange 1 exiled card with 1 Market card.'}),
    mk('Direct Democracy',{st:'E',perm:true,vp:3,cost:{mat:3,pop:2},t:'Passive: playing your Unrest costs you 1 less Material or 1 less card to discard (minimum 1). Exhaust: play an Unrest as a Free action.'}),
    mk('Science',{st:'E',perm:true,vp:3,cost:{mat:3,pop:2},t:'Passive: increase your hand size by 1. Your Progress cards lose the Barbarian icon.'}),
    mk('Philosophy',{st:'E',vt:'s',vp:5,vtx:'1 VP per 5 cards',cost:{mat:6},t:'Abandon a permanent card (other than a Region) to innovate a Tradition or Civilised.'}),
    mk('Greek Innovation',{st:'E',atk:true,vp:3,cost:{mat:3,pop:2},t:'Place 2 cards from your hand on top of your deck to acquire a Tradition, a Civilised, a Region or a Tributary. Each other player recalls a permanent card.'}),
    mk('City of Corinth',{st:'E',perm:true,ic:['ville'],vp:3,cost:{mat:3,pop:2},t:'Solstice: you MAY discard 1 card to Choose: gain 1 Population OR 1 Material OR draw 1 card.'}),
    mk('Pericles',{st:'E',vp:3,cost:{mat:3,pop:2},t:'Free action. Acquire a Tradition, a Civilised, a Region or a Tributary. Put Pericles into your History.'}),
    mk('Greek Prosperity',{st:'E',vp:2,cost:{mat:2,pop:2},t:'Choose: gain 1 Material per Production icon OR gain 1 Population per Region OR draw a card per City and Metropolis icon you have in play.'})]},
mac:{name:'Macedonians',
  power:{n:'Macedonians',vt:'s',vtx:'1 VP per 2 Regions',t:'Passive: when you play a Region from your discard pile, gain 2 Materials.'},
  deck:()=>[mk('Philip II',{st:'B',t:'Acquire a Tradition, a Civilised, a Region or a Tributary. Put Philip II into your History.'}),
    mk('Conquer',{st:'B',t:CONQ}),mk('Conquer',{st:'B',t:CONQ}),mk('Progress',{st:'B',t:PROG}),
    mk('Phalanx',{perm:true,t:'Exhaust: spend 1 Action to play a Region from your discard pile.'}),
    mk('Orestis',{cat:'reg',perm:true,t:'Gain 2 Materials. You MAY reserve 1 card.'}),
    mk('Aliakmon Valley',{cat:'reg',perm:true,ic:['fert','eau'],t:'Gain 1 Population. You MAY reserve 1 card.'}),
    mk('Pelagonia',{cat:'reg',perm:true,ic:['fert'],t:'Gain 1 Population. You MAY reserve 1 card.'}),DINS(),DINS(),DINS()],
  nat:()=>[mk('Prosperity',{t:DPROSP}),
    mk('Uxians',{cat:'vas',atk:true,t:'Steal 2 Materials from each other player. You MAY return 1 used Exhaust token to your State card.'}),
    mk('Glory',{t:GLOIRE,glory:true})],
  adv:()=>mk('Alexander',{adv:true,t:'Draw 1 card. You MAY innovate a Region or Tributary. Put Alexander into your History.'}),
  dev:()=>[mk('Mosaics',{st:'E',perm:true,vp:3,cost:{mat:4,pop:1},t:'Exhaust: pay 1 Material to recover 1 card from your discard pile.'}),
    mk('Alexander the Great',{st:'E',vp:4,cost:{mat:4,pop:2},needHist:'Alexander',t:'Can only be played if Alexander is in your History. Free action. You MAY acquire a Region twice, including from exiled cards. Put Alexander the Great into your History.'}),
    mk('Companion Cavalry',{st:'E',perm:true,vp:3,cost:{pop:3},t:'Passive: your Conquer cards lose the Barbarian icon. Exhaust: when you play a Region, exhaust this card to draw 1 card.'}),
    mk('Development',{st:'E',vp:3,cost:{mat:4,pop:1},t:'Choose: develop 1 card OR pay 2 Materials to acquire a Tradition or a Civilised.'}),
    mk('Alexandria in Ariana',{st:'E',perm:true,ic:['ville'],vt:'s',vp:5,vtx:'1 VP per 2 Regions',cost:{mat:4,pop:2},t:'Solstice: you MAY discard 1 card to Choose: gain 1 Population OR gain 1 Material OR draw 1 card.'}),
    mk('Alexandria in Egypt',{st:'E',perm:true,ic:['metro'],vp:2,cost:{mat:4,pop:1},t:'Solstice: Choose: gain 1 Population OR gain 1 Material OR draw 1 card.'}),
    mk('Parmenion',{st:'E',vp:2,cost:{mat:2,pop:2},t:'You MAY acquire a Region or a Tributary and play it as a Free action. Put Parmenion into your History.'})]},
per:{name:'Persians',
  power:{n:'Persians',vt:'s',vtx:'1 VP per 3 Tributaries',t:'Exhaust: spend 1 Action, place 2 cards from your hand on top of your deck and pay 1 Population to innovate a Tributary.'},
  deck:()=>[mk('Glory',{t:GLOIRE,glory:true}),mk('Prosperity',{t:DPROSP}),mk('Progress',{st:'B',t:PROG}),mk('Conquer',{st:'B',t:CONQ}),mk('Conquer',{st:'B',t:CONQ}),
    mk('Lydians',{cat:'vas',st:'B',t:'Gain 2 Population. Put Lydians into your History.'}),
    mk('Bactria',{cat:'reg',perm:true,t:'Gain 3 Materials. You MAY reserve 1 card.'}),
    mk('Zagros',{cat:'reg',perm:true,ic:['prod','eau'],t:'You MAY reserve 1 card.'}),DINS(),DINS()],
  nat:()=>[mk('Median Empire',{cat:'vas',st:'B',t:'Gain 4 Materials. Put Median Empire into your History.'}),
    mk('Arachosia',{cat:'reg',perm:true,ic:['prod','eau'],t:'You MAY put 1 card from your discard pile into your History. You MAY reserve 1 card.'}),
    mk('Nisaean Plain',{cat:'reg',perm:true,ic:['fert','fert'],t:'You MAY reserve 1 card.'}),DINS()],
  adv:()=>mk('City of Persepolis',{perm:true,ic:['ville'],adv:true,t:'Solstice: you MAY discard 1 card to Choose: gain 1 Population OR gain 1 Material OR draw 1 card.'}),
  dev:()=>[mk('Persian Gold',{st:'E',atk:true,vp:4,cost:{mat:7},t:'All players gain 2 Materials. You gain 1 Progress. Each other player recovers an Unrest.'}),
    mk('Satrap',{st:'E',vp:3,cost:{mat:4,pop:2},t:'Free action. Pay 3 Materials to gain 1 Action.'}),
    mk('Windmills',{st:'E',perm:true,vp:2,cost:{mat:4},t:'Free action. Exhaust: for the rest of the turn, consider 1 Fertile icon as 3 Water icons.'}),
    mk('Development',{st:'E',vp:3,cost:{mat:4,pop:2},t:'Choose: develop 1 card OR pay 2 Materials to acquire a Tradition or a Civilised.'}),
    mk('Darius I',{st:'E',vt:'s',vp:5,vtx:'1 VP per Tributary',cost:{mat:3,pop:2},t:'Acquire a Tradition, a Civilised, a Region or a Tributary. Put Darius I into your History.'}),
    mk('Babylonians',{cat:'vas',st:'E',vp:4,cost:{pop:5},t:'Free action. Acquire a Tradition, a Civilised, a Region or a Tributary. Put Babylonians into your History.'}),
    mk('Battering Ram',{st:'E',atk:true,vp:2,cost:{pop:4},t:'Each other player abandons a City card. You MAY innovate a Region or Tributary.'})]},
scy:{name:'Scythians',
  power:{n:'Scythians',vt:'s',vtx:'1 VP per 6 Population',t:'Exhaust: spend 1 Action and recover an Unrest to innovate a Region.'},
  deck:()=>[...[0,1].map(()=>mk('Nomads',{st:'B',t:'All players MAY draw 1 card. Gain 1 Material per Production icon you have in play.'})),
    mk('Progress',{st:'B',t:PROG}),mk('Conquer',{st:'B',t:CONQ}),
    mk('Mounted Archers',{perm:true,t:'Exhaust: you MAY exhaust this card to avoid the effects of an Attack played by another player (even during their turn). Solstice: you MAY pay 1 Material to gain 1 Population.'}),
    mk('Tian Shan',{cat:'reg',st:'B',perm:true,t:'Gain 1 Population. You MAY reserve 1 card.'}),
    mk('Carpathians',{cat:'reg',st:'B',perm:true,ic:['prod'],t:'Gain 1 Population. You MAY reserve 1 card.'}),
    mk('Tents',{st:'B',perm:true,t:'Exhaust: when you play a Region, exhaust this card to gain 1 Population. Solstice: you MAY recall a Region.'}),DINS(),DINS(),DINS()],
  nat:()=>[mk('Tamga',{perm:true,vt:'s',vp:5,vtx:'1 VP per 2 Regions',t:'Exhaust: discard 1 card to draw 2 cards.'}),
    mk('Raiders',{st:'B',atk:true,t:'Free action. Draw 2 cards. All other players recall a Region. Steal 1 Population from each player who is an Empire.'}),
    mk('Pontic Steppe',{cat:'reg',perm:true,ic:['prod','fert'],t:'Gain 1 Population. You MAY reserve 1 card.'}),
    mk('Tarim Basin',{cat:'reg',perm:true,ic:['prod','eau'],t:'You MAY draw 1 card. You MAY reserve 1 card.'}),
    mk('Caucasus',{cat:'reg',perm:true,ic:['prod'],t:'Gain 1 Population. You MAY reserve 1 card.'}),DINS(),DINS()],
  adv:()=>mk('Glory',{adv:true,glory:true,t:GLOIRE}),
  dev:()=>[mk('City of Gelonus',{st:'E',perm:true,ic:['ville'],vp:2,cost:{pop:3},t:'Solstice: you MAY discard 1 card to Choose: gain 1 Population OR gain 1 Material OR draw 1 card.'}),
    mk('Kurgans',{st:'E',perm:true,vp:2,cost:{pop:3},t:'Passive: increase your hand size by 1. Exhaust: put 1 card from your discard pile into your History.'}),
    mk('Ateas',{st:'E',vp:3,cost:{pop:4},t:'You MAY acquire a Region. You MAY return an Unrest. Put Ateas into your History.'}),
    mk('Jewellery',{vp:7,nop:true,cost:{mat:7},t:'This card can\'t be played or reserved.'})]},
vik:{name:'Vikings',noEmp:true,noHist:true,
  power:{n:'Vikings',vt:'s',vtx:'1 VP per star card',t:'Passive: cards that should be put into your History are discarded instead. When you recover an Unrest, look at the top card of your Nation deck; you MAY place it at the bottom of the Nation deck. Exhaust: when you return an Unrest, exhaust Vikings to draw 2 cards.'},
  deck:()=>[mk('Prosperity',{t:DPROSP}),mk('Glory',{t:GLOIRE,glory:true}),mk('Progress',{st:'B',t:PROG}),
    mk('Althing',{st:'B',atk:true,t:'Steal 1 Material from each other player. Choose: gain 1 Progress OR return an Unrest.'}),
    mk('Gothja',{st:'B',t:'Look at the top card of your Nation deck. You MAY shuffle the Nation deck and gain 1 Population. Choose: return an Unrest OR draw 2 cards.'}),
    mk('Jomsviking',{st:'B',atk:true,t:'Pay 1 Population and 2 Materials to acquire a Region or a Tributary. Each other player discards 1 card.'}),
    mk('Erik the Red',{st:'B',t:'Abandon Scandinavia and pay 1 Population to find a Region you add to your hand. Exile Erik the Red.'}),
    mk('Scandinavia',{cat:'reg',st:'B',perm:true,ic:['prod'],t:'You MAY reserve 1 card.'}),DINS()],
  nat:()=>[mk('Faroe Islands',{cat:'reg',st:'B',perm:true,t:'You MAY reserve 1 card. Choose: exile 1 Market card OR gain 1 Population.'}),
    mk('City of Dubh Linn',{st:'B',perm:true,ic:['ville'],vt:'s',vp:5,vtx:'1 VP per 8 Materials',t:'Solstice: you MAY discard 1 card to Choose: gain 1 Population OR gain 1 Material OR draw 1 card.'}),
    mk('Greenland',{cat:'reg',st:'B',perm:true,t:'You MAY reserve 1 card. Choose: gain 1 Population OR look at the top card of your Nation deck, then you MAY shuffle the Nation deck.'}),
    mk('Combs',{st:'B',perm:true,vt:'s',vp:5,vtx:'1 VP per 3 Population',t:'Exhaust: ignore the Empire icon on the next card you play this turn.'}),
    mk('Iceland',{cat:'reg',st:'B',perm:true,ic:['prod'],t:'You MAY reserve 1 card. Choose: gain 2 Materials OR look at the top card of your Nation deck, then you MAY shuffle the Nation deck.'}),
    mk('Viking Raid',{st:'B',atk:true,t:'Free action. Steal 2 Materials from each other player. Players who can\'t pay recover an Unrest.'}),
    mk('Skis',{st:'B',perm:true,vp:2,t:'Exhaust: when you play a Region, exhaust Skis to Choose: draw 1 card OR gain 2 Materials.'}),
    mk('Longships',{st:'B',perm:true,t:'Passive: you MAY acquire exiled Regions; when you do, gain 1 Population. Exhaust: when you play an Attack, exhaust Longships to gain 2 Materials.'}),
    mk('Rollo the Walker',{st:'B',t:'Draw a Fame card. Exile Rollo the Walker.'}),
    mk('Sagas',{st:'B',perm:true,vt:'s',vp:5,vtx:'1 VP per card reserved here',t:'Solstice: you MAY reserve 1 card.'}),
    mk('Vinland',{cat:'reg',st:'B',perm:true,ic:['prod','eau','fert'],vt:'c',vp:6,vtx:'6 VP if in play',t:'This card can only be played if Longships AND Greenland are in play. Choose: return an Unrest OR you MAY reserve 1 card.'}),DINS(),DINS()],
  adv:()=>mk('Harald Hardrada',{st:'B',adv:true,zenith:true,vt:'s',vp:5,vtx:'2 VP per star card',t:'PLACING THIS CARD IN THE DISCARD PILE TRIGGERS THE END OF THE GAME. Draw a Fame card. You MAY innovate a Region.'}),
  dev:()=>[]}};
/* --- Marché de démonstration (en attendant les cartes communes de la boîte) --- */
const DEMO=false;
function demoCommons(){const L=[],add=(n,cat,o)=>L.push(mk(n,Object.assign({cat,demo:true},o)));
  const R=[['prod'],['fert'],['riv'],['prod','fert'],['prod','riv'],['ocean'],['fert','riv'],['chasse'],['prod','ocean'],['fert'],['prod'],['riv','chasse'],['ocean','fert'],['prod','chasse']];
  R.forEach((ic,i)=>add('Region '+(i+1)+' (demo)','reg',{perm:true,ic,vp:i%3===0?1:0,t:i%2?'Gain 1 Material. You MAY reserve 1 card.':'Gain 1 Population. You MAY reserve 1 card.'}));
  const TT=[['Gain 2 Materials.',1],['Gain 2 Population.',1],['Draw 2 cards.',1],['Gain 1 Action. Draw 1 card.',2],['Exhaust: gain 1 Population.',2,{perm:true}],['Exhaust: gain 1 Material.',2,{perm:true}],['Gain 1 Progress. You MAY acquire a Region.',2],['Return an Unrest from your hand or discard pile. Gain 1 Population.',1],['Acquire a Region or a Tributary.',2,{st:'B'}],['Innovate a Civilised.',3,{st:'E'}],['Each other player recovers an Unrest. Gain 1 Material.',1,{atk:true}],['Passive: increase your hand size by 1.',3,{perm:true}]];
  for(let i=0;i<16;i++){const [t,vp,o]=TT[i%TT.length];add('Tradition '+(i+1)+' (demo)','tra',Object.assign({vp,t},o||{}))}
  const CC=[['Gain 2 Progress.',2],['Draw 3 cards. Discard 1 card.',3],['Exhaust: gain 1 Progress.',3,{perm:true}],['Acquire a Tradition or a Civilised.',3],['Put 1 card from your hand into your History. Gain 2 Materials.',2],['1 VP per Region you have in play (10 max).',5,{vt:'s',vtx:'1 VP per Region in play'}]];
  for(let i=0;i<12;i++){const [t,vp,o]=CC[i%CC.length];add('Civilised '+(i+1)+' (demo)','civ',Object.assign({vp,t,white:true},o||{}))}
  for(let i=0;i<10;i++)add('Tributary '+(i+1)+' (demo)','vas',{vp:3,t:i%2?'Gain 3 Population. Put this card into your History.':'Gain 3 Materials. Put this card into your History.'});
  const F=[];for(let i=0;i<8;i++)F.push(mk('Fame '+(i+1)+' (demo)',{cat:'ren',demo:true,vp:6+i,t:'No effect.'}));
  return {com:L,fame:F,kok:{A:'Gain 3 Progress. (demo text)',B:'Gain 2 Progress. (demo text)'},ins:12}}
/* --- Cartes communes réelles de la boîte Antique (d'après les photos) --- */
function realCommons(){const L=[],T=(n,o)=>L.push(mk(n,Object.assign({cat:'tra'},o))),R=(n,ic,t,o)=>L.push(mk(n,Object.assign({cat:'reg',perm:true,ic,t},o||{}))),C=(n,o)=>L.push(mk(n,Object.assign({cat:'civ',white:true},o))),V=(n,o)=>L.push(mk(n,Object.assign({cat:'vas'},o)));
  const EX='Exile 1 Market card. You MAY reserve 1 card.';
  // Traditions
  T('Diplomacy',{cat2:'civ',vp:1,t:'Pay 3 Materials to innovate a Tributary.'});
  for(let i=0;i<3;i++)T('City',{cat2:'civ',perm:true,ic:['ville'],vp:1,t:'Solstice: you MAY discard 1 card to Choose: gain 1 Population OR gain 1 Material OR draw 1 card.'});
  T('Shaduf',{perm:true,vt:'s',vp:5,vtx:'2 VP per Water icon',t:'Exhaust: when you gain Materials from a Water card in play, exhaust this card to gain 1 Progress.'});
  T('Game',{cat2:'civ',vp:1,t:'Free action. Pay 1 Material and announce a category: Tradition, Civilised, Region or Tributary. Reveal the top card of the Main deck. If it matches the announced category, add it to your hand. Otherwise exile it.'});
  for(let i=0;i<2;i++)T('City',{st:'B',perm:true,vt:'c',vp:2,vtx:'2 VP if in your History',t:'Exhaust: all players MAY gain 2 Materials. Solstice: you MAY gain 2 Progress. If you do, Choose: abandon this City OR put it into your History.'});
  T('Elders',{vp:1,t:'Choose: acquire a Tradition OR innovate a Tradition and all other players gain 1 Progress.'});
  T('Command',{cat2:'civ',vp:1,t:'Free action. Choose: draw 1 card OR put 1 card from your hand or discard pile into your History.'});
  T('Sanctuary',{st:'B',perm:true,vp:1,t:'Exhaust: pay 1 Material to draw 1 card. Solstice: you MAY discard 1 card to return an Unrest from your discard pile.'});
  T('Invasion',{atk:true,vp:1,t:'Pay 3 Materials. All other players recover an Unrest. Choose: innovate a Tributary OR innovate a Region and each other player recalls a Region.'});
  T('Ships',{perm:true,vt:'s',vp:5,vtx:'1 VP per Water icon and per Fertile icon',t:'Exhaust: recall a Water Region to gain 2 Materials and 1 Population OR recall a Fertile Region to gain 1 Action.'});
  T('Agriculture',{perm:true,vt:'s',vp:5,vtx:'2 VP per Fertile icon',t:'Exhaust: for the rest of the turn, consider 1 Fertile icon as 3 Water icons.'});
  T('Jade Mask',{ic:['masque'],vt:'c',vp:1,vtx:'1 VP if in your History',t:'Draw up to 3 cards if possible. Then place 1 card from your hand on top of your deck.'});
  T('Mysticism',{perm:true,vp:1,t:'Exhaust: gain 1 Action. Solstice: Choose: recover an Unrest OR discard 2 cards.'});
  T('Oracle',{st:'B',vt:'s',vp:5,vtx:'2 VP per Fame card',t:'Free action. Draw 2 cards and discard one of them.'});
  T('Port',{cat2:'civ',perm:true,vp:1,t:'Exhaust: gain 1 Material per Water icon in your play area. You MAY pay 3 Materials to recover 1 card from your discard pile.'});
  // Régions
  R('Oasis',['prod','prod','eau'],EX);R('Steppe',['prod','prod','fert'],EX);R('Forest',['prod','prod','fert'],EX);
  R('River',['prod','prod','eau'],'You MAY put 1 card from your discard pile into your History. '+EX);
  R('Floodplain',['prod','eau'],'You MAY put 1 card from your discard pile into your History. '+EX);
  R('Hills',['prod','fert'],'Gain 1 Population. '+EX);R('Marsh',['prod','eau'],'Gain 2 Materials. '+EX);
  R('Woodland',['prod','fert'],'You MAY recover 1 card from your discard pile and place it on top of your deck. '+EX);
  R('Cape',['prod','eau'],EX+' Passive: you MAY recall Cape to avoid the effects of an Attack.');
  R('Coast',['prod','fert'],'Draw 1 card. '+EX);
  R('Jungle',[],'Gain 1 Population. '+EX,{vp:1});R('Mountain',[],'Gain 3 Materials. '+EX,{vp:1});
  R('Sacred Way',[],'Exhaust: you MAY look at the top card of your Nation deck. Then you MAY abandon Sacred Way to swap that card with a card from your hand (never the Accession).',{st:'B',vp:1});
  // Civilisés
  C('Currency',{perm:true,vp:2,t:'Exhaust: draw 1 card. Solstice: gain 2 Materials.'});
  C('Exports',{atk:true,vt:'s',vp:5,vtx:'1 VP per 10 cards',t:'All players gain 2 Materials. Give each other player 1 card from your hand or discard pile.'});
  C('Metropolis',{perm:true,ic:['metro'],vp:2,t:'Solstice: Choose: gain 1 Population OR gain 1 Material OR draw 1 card.'});
  C('Pharmacy',{perm:true,vp:2,t:'Solstice: Choose: gain 1 Population OR pay 2 Population to gain 1 Progress.'});
  C('Corruption',{atk:true,vp:2,t:'All players gain 2 Materials. All other players recover an Unrest. Gain 1 Progress.'});
  C('Onager',{atk:true,vp:2,t:'Each other player abandons a City card. Gain 2 Materials per City card abandoned. You MAY acquire a Region or a Tributary.'});
  C('Education',{vp:2,t:'Free action. You MAY put 1 card from your hand into your History. You MAY put 1 card from your discard pile into your History.'});
  C('Moneylenders',{vt:'s',vp:5,vtx:'1 VP per 10 Materials',t:'Free action. Pay 3 Materials to gain 1 Action.'});
  C('Temple',{perm:true,vt:'s',vp:5,vtx:'1 VP per 5 Progress',t:'Exhaust: discard 1 card to gain 1 Progress. Solstice: return an Unrest from your discard pile.'});
  C('Cataphract',{atk:true,ic:['chev'],vp:2,t:'Each other player abandons a Region. You MAY acquire a Region or a Tributary. You MAY reserve Cataphract under a Region to trigger that Region\'s play effect.'});
  C('Urban Development',{vt:'s',vp:5,vtx:'2 VP per City icon and per Metropolis icon',t:'Gain 1 Material and 1 Population per City icon and per Metropolis icon in your play area.'});
  C('Mercenaries',{vt:'s',vp:5,vtx:'1 VP per 4 Population',t:'Free action. Pay 1 Population to gain 1 Action.'});
  // Vassaux (Olmèques 3+ et Maurya 4 écartés en solo)
  V('Armenians',{vp:3,t:'Acquire a Tradition. Put Armenians into your History.'});
  V('Sumerians',{vp:3,nop:true,t:'This card can\'t be played. Return up to 2 Unrest before VP are counted.'});
  V('Qin',{perm:true,vt:'s',vp:5,vtx:'1 VP per 3 permanent cards in play, Regions excluded',t:'Passive: increase your hand size by 1.'});
  V('Assyrians',{vp:3,t:'Free action. Gain 1 Population.'});
  V('Egyptians',{vt:'s',vp:5,vtx:'1 VP per Civilised',t:'If you are Barbarian, place the top card of your Nation deck into your discard pile. If you are Empire, develop 1 card. Put Egyptians into your History.'});
  V('Hittites',{vp:3,t:'Innovate a Region. Put Hittites into your History.'});
  V('Ionians',{vp:3,t:'Free action. Return up to 2 Unrest from your hand or the discard pile. Put Ionians into your History.'});
  V('Minoans',{st:'B',vt:'s',vp:5,vtx:'1 VP for every 4 Progress',t:'Free action. Place 1 card from your hand on top of your deck and gain 2 Progress.'});
  V('Aksumites',{vt:'s',vp:5,vtx:'1 VP per Tributary',t:'Gain 4 Materials.'});
  // Renommées
  const F=[],RN=(n,o)=>F.push(mk(n,Object.assign({cat:'ren'},o)));
  for(let i=0;i<2;i++)RN('Triumph',{vp:11,nop:true,t:'This card can\'t be played or reserved.'});
  RN('Grandiose',{perm:true,vp:7,t:'Passive: increase your hand size by 1.'});
  RN('Magnificence',{vp:9,t:'Free action. Draw 1 card if possible and Choose: discard it OR place it on top of your deck OR put it into your History.'});
  RN('Glorious',{vp:6,t:'Free action. If you are Barbarian, draw up to 4 cards. If you are Empire, develop 1 card without paying its cost. Put Glorious into your History.'});
  RN('Infamy',{atk:true,vt:'s',vp:5,vtx:'1 VP per Unrest of the other players',t:'Free action. Steal 1 Progress from each other player. Players who can\'t pay recover an Unrest.'});
  RN('Grandeur',{vt:'c',vp:6,vtx:'2 VP, or 6 VP if in your History',t:'Free action. Gain 1 Action. You MAY put Grandeur into your History.'});
  RN('Praise',{vt:'c',vp:7,vtx:'3 VP, or 7 VP if in your History',t:'Choose: put Praise into your History OR innovate a Tradition, Civilised, Region or Tributary.'});
  return {com:L,fame:F,ins:8,
    kok:{A:'Resolved when there is no more Fame card to draw or look at, then flipped to side B. THIS TRIGGERS THE END OF THE GAME. Barbarian: gain 6 Progress. Empire: gain 3 Progress and develop 1 card without paying its cost.',
         B:'Resolve it and leave it in place; several players can resolve it. Barbarian: gain 4 Progress. Empire: develop 1 card without paying its cost.'}}}

/* ---------- état ---------- */
const D=()=>S.D,MK=()=>S.M;
const SRC=['main','main','civ','tra','reg'];
function digNew(botNat,diff,myNat){myNat=myNat||'rom';newGame(botNat,diff);S.dig=true;S.camp=false;S.diffName=DIFF[diff][0];
  const N=MYNAT[myNat],C=realCommons();
  const by=k=>shuffle(C.com.filter(x=>x.cat===k));
  let reg=by('reg'),tra=by('tra'),civ=by('civ'),vas=by('vas');
  const M={reg:reg.splice(0,6),kokTxt:C.kok,tra:tra.splice(0,6),civ:civ.splice(0,6),under:{},main:[],fame:shuffle(C.fame).slice(0,6),kok:{side:'A',txt:C.kok,me:false,bot:false,down:false},ins:C.ins,exile:[],slots:[]};
  ['reg','tra','civ'].forEach(k=>M.under[k]=vas.shift());vas.splice(0,2);
  M.main=shuffle([...reg,...tra,...civ,...vas]);
  const take=src=>M[src].shift();
  M.slots=[take('main'),take('main'),take('civ'),take('tra'),take('reg')].map(card=>{const s={card,ins:false,tok:{mat:0,pop:0,prog:0}};if(card.cat!=='reg'){s.ins=true;M.ins--}if(card.white)s.tok.prog=1;return s});
  S.M=M;
  S.D={nat:myNat,state:'B',deck:shuffle(N.deck()),hand:[],disc:[],play:[],hist:[],res:{mat:3,pop:2,prog:1},natPile:shuffle(N.nat()),adv:N.adv(),dev:N.dev(),
    power:mk(N.power.n,{t:N.power.t,vt:N.power.vt,vtx:N.power.vtx,power:true}),act:3,exh:5,wit:false,pex:false,free:[],phase:'order',cur:null,collapse:false};
  for(let i=0;i<5;i++)D().hand.push(D().deck.shift());
}
/* ---------- Marché ---------- */
function refill(i){const M=MK(),src=SRC[i];let card=null;
  if(M[src]&&M[src].length)card=M[src].shift();
  else if(src!=='main'&&M.under[src]){card=M.under[src];M.under[src]=null}
  else if(M.main.length)card=M.main.shift();
  if(!M.main.length)trigger('the Main deck is empty');
  if(!card){M.slots[i]=null;return}
  const s={card,ins:false,tok:{mat:0,pop:0,prog:0}};
  if(card.cat!=='reg'){if(M.ins>0){M.ins--;s.ins=true}checkCollapse()}
  M.slots[i]=s}
function takeIns(){const M=MK();if(M.ins<=0){checkCollapse();return false}M.ins--;checkCollapse();return true}
function checkCollapse(){if(MK().ins<=0)D().collapse=true}
const slotTok=s=>s.tok.mat+s.tok.pop+s.tok.prog;
const botVal=s=>s.card.vp+s.tok.prog;
function marketPickBot(list){const M=MK();let best=-1,bv=null;
  M.slots.forEach((s,i)=>{if(!s||!(list.includes(s.card.cat)||list.includes(s.card.cat2)))return;const v=[botVal(s),slotTok(s),-i];if(!bv||v[0]>bv[0]||v[0]===bv[0]&&(v[1]>bv[1]||v[1]===bv[1]&&v[2]>bv[2])){bv=v;best=i}});return best}
/* ---------- surcharges du moteur C.I.V. ---------- */
const _take=takeFromMarket,_fame=fameCard,_getIns=getIns,_you=youDo,_run=run,_resolve=resolve,_kok=kok,_pt=playerTurn,_end=endGame;
takeFromMarket=async function(verb,list,isAcq){if(!S.dig)return _take(verb,list,isAcq);
  const i=marketPickBot(list);if(i<0){log(`No cards ${cats(list)} from the Market.`);return null}
  const s=MK().slots[i],card=s.card;gain(s.tok);S.deck.unshift(card);if(TURN)(isAcq?TURN.took:TURN.found).push(card.n);
  let t=`The Bot ${verb} ${cname(card)} (emplacement ${i+1}): the card goes on top of its deck.`;
  if(s.ins){if(isAcq){S.deck.unshift(INS());t+=' It also takes the Unrest tucked under it.'}else{MK().ins++;t+=' The Unrest under it goes back to the pile.'}}
  log(t,'do');refill(i);return card};
fameCard=async function(to){if(!S.dig)return _fame(to);const M=MK();
  if(!M.fame.length)return kok();
  const f=M.fame.shift();if(TURN)TURN.fame=nice(f.n);
  if(to==='hist'){S.hist.push(f);log(`${cname(f)} is put into the Bot's History.`,'do')}else{S.deck.unshift(f);log(`${cname(f)} goes on top of the Bot's deck.`,'do')}return true};
kok=async function(){if(!S.dig)return _kok();const K=MK().kok;if(K.bot){log('The Bot has already resolved King of Kings: nothing happens.');return false}
  K.bot=true;const was=K.side;const r=await _kok();if(was==='A'){K.side='B';trigger('King of Kings (side A) is resolved')}return r};
getIns=async function(){if(!S.dig)return _getIns();if(takeIns()){S.deck.unshift(INS());log('The Bot takes an Unrest from the pile.','do')}};
youDo=async function(k,o){if(!S.dig)return _you(k,o);const P=D();
  const prot=async t=>{const r=await ask(t,[['I take it',1],['Cancelled by one of my cards',0,'']],'This effect counts as an Attack: your protections apply.');if(!r){if(TURN)TURN.blocked++;log(t+' Cancelled by your protection.','you')}return r};
  const hit=t=>{if(TURN)TURN.hit.push(t)};
  if(k==='scy'){if(P.state!=='E'||!P.res.pop)return false;P.res.pop--;S.res.pop++;hit('a Population paid as tribute');log('You pay 1 '+chip('pop')+' to the Bot.','you');return true}
  if(k==='gain'){for(const r in o)P.res[r]+=o[r];log('You gain '+Object.entries(o).map(([r,n])=>n+' '+chip(r)).join(' and ')+'.','you');return true}
  if(k==='draw'){const r=await ask('You MAY draw 1 card.',[['Draw 1 card',1],['No thanks',0,'']]);if(r){drawMe(1,false);log('You draw 1 card.','you')}renderDig();return true}
  if(k==='ins'){if(!await prot('The Bot makes you recover an Unrest.'))return true;if(takeIns()){P.hand.push(DINS());hit(INSHIT);log('An Unrest arrives in your hand.','you')}renderDig();return true}
  if(k==='disc'){if(!P.hand.length)return true;if(!await prot(`The Bot makes you discard ${o} card${o>1?'s':''}.`))return true;
    const sel=await pickCards(`Choose ${Math.min(o,P.hand.length)} card${o>1?'s':''} to discard.`,P.hand,Math.min(o,P.hand.length),Math.min(o,P.hand.length));
    sel.forEach(c=>moveCard(c,'disc'));hit(o>1?o+' discarded cards':'a discarded card');log('You discard '+sel.map(c=>c.n).join(', ')+'.','you');renderDig();return true}
  if(k==='aban'||k==='recall'||k==='recallperm'){const pool=P.play.filter(c=>k==='recallperm'?c.perm:c.cat==='reg');if(!pool.length)return true;
    const lab=k==='aban'?'abandon':'recall to your hand';if(!await prot(`The Bot makes you ${lab} a ${k==='recallperm'?'permanent card':'Region'}.`))return true;
    const [x]=await pickCards(`Choose the card to ${lab}.`,pool,1,1);
    if(k==='aban')abandonCard(x);else recallCard(x);hit(k==='aban'?'an abandoned Region':k==='recall'?'a recalled Region':'a recalled permanent card');renderDig();return true}
  return _you(k,o)};
run=async function(x,ctx){if(!S||!S.dig)return _run(x,ctx);const M=MK();
  if(x.t==='exile'){const i=M.slots.findIndex(s=>s&&!slotTok(s));if(i<0){log('No Market card can be exiled.');return false}
    const s=M.slots[i];M.exile.push(s.card);if(s.ins)M.ins++;if(TURN)TURN.ex++;log(`The Bot exiles ${cname(s.card)} (emplacement ${i+1}).`,'do');refill(i);return true}
  if(x.t==='acqex'){const L=M.exile.filter(c=>c.cat===x.c).sort((a,b)=>b.vp-a.vp);if(!L.length)return false;const c0=L[0];M.exile.splice(M.exile.indexOf(c0),1);S.deck.unshift(c0);if(TURN)TURN.took.push(c0.n);log(`The Bot takes back ${cname(c0)} in the Exile pile.`,'do');return true}
  if(x.t==='inn'){if(await takeFromMarket('innovates',[x.c],false))return true;const card=blindTake(x.c);
    if(!card){log('No card available: the Bot gains 2 Progress instead.');gain({prog:2});return true}
    S.deck.unshift(card);if(TURN)TURN.found.push(card.n);log(`The Bot innovates ${cname(card)} blind: the card goes on top of its deck.`,'do');return true}
  if(x.t==='steal'){const P=D(),got={mat:Math.min(x.mat||0,P.res.mat),prog:Math.min(x.prog||0,P.res.prog)};
    if(!got.mat&&!got.prog){log('You have nothing to be stolen.','you');return false}
    const r=await ask('The Bot steals '+['mat','prog'].filter(k=>got[k]).map(k=>got[k]+' '+chip(k)).join(' and ')+'.',[['I take it',1],['Cancelled by one of my cards',0,'']],'It is an Attack.');
    if(!r){if(TURN)TURN.blocked++;return false}
    P.res.mat-=got.mat;P.res.prog-=got.prog;S.res.mat+=got.mat;S.res.prog+=got.prog;if(TURN)TURN.hit.push('a theft of '+et(['mat','prog'].filter(k=>got[k]).map(k=>qt(got[k],k))));log('The Bot steals '+['mat','prog'].filter(k=>got[k]).map(k=>got[k]+' '+chip(k)).join(' and ')+'.','you');renderDig();return true}
  const r=await _run(x,ctx);if(x.t==='ret'&&r)M.ins++;return r};
resolve=async function(x,where){if(!S.dig||x.cat!=='ins')return _resolve(x,where);
  log(`${where} : ${x.n}`,'card');if(TURN)TURN.ret++;MK().ins++;log('Unrest: it goes back to the common pile.')};
todo=(t,k='do')=>{if(S&&S.dig){log(t,k);return Promise.resolve(true)}log(t,k);return ask(t,[['Done',true]])};
playerTurn=function(keep){if(S&&S.dig)return digTurn();return _pt(keep)};
endGame=function(collapse){if(S&&S.dig)return digEnd(collapse);return _end(collapse)};
function blindTake(cat){const M=MK();
  if(cat!=='vas'&&M[cat]&&M[cat].length)return M[cat].shift();
  if(cat==='vas'){const u=['reg','tra','civ'].find(k=>M.under[k]&&!M[k].length);if(u){const v=M.under[u];M.under[u]=null;return v}}
  const i=M.main.findIndex(c=>c.cat===cat);if(i<0)return null;const card=M.main.splice(i,1)[0];M.main=shuffle(M.main);if(!M.main.length)trigger('the Main deck is empty');return card}
/* ---------- mes cartes ---------- */
const DZONES=['hand','disc','play','hist','deck'];
function findCard(id){const P=D();for(const z of DZONES){const i=P[z].findIndex(c=>c.id===id);if(i>=0)return [z,i]}
  for(const c of P.play){const j=(c.rs||[]).findIndex(r=>r.id===id);if(j>=0)return ['rs:'+c.id,j]}
  if(P.cur&&P.cur.id===id)return ['cur',0];return [null,-1]}
function detach(card){const P=D(),[z,i]=findCard(card.id);if(!z)return;
  if(z==='cur')P.cur=null;else if(z.startsWith('rs:')){const host=P.play.find(c=>c.id===z.slice(3));host.rs.splice(i,1)}else P[z].splice(i,1)}
function unlocked(c){const P=D(),has=n=>P.play.some(x=>x.n===n);
  if(c.st!=='B')return false;
  if(c.n==='Conquer'&&(has('Legions')||has('Companion Cavalry')||has('Chariots')))return true;
  if(c.atk&&has('Chariots'))return true;
  if(c.n==='Progress'&&has('Science'))return true;return false}
function moveCard(card,to){if(to==='hist'&&MYNAT[D().nat].noHist){to='disc';log(`The ${MYNAT[D().nat].name} have no History: ${card.n} is discarded.`)}detach(card);const P=D();
  if(card.tok){for(const r in card.tok)P.res[r]+=card.tok[r];card.tok=null}
  if(to==='disc'||to==='hist'||to==='hand'){(card.rs||[]).forEach(r=>{P[to==='hand'?'hand':to].push(r)});card.rs=[]}
  card.ex=false;
  if(to==='deck')P.deck.unshift(card);else P[to].push(card);
  if(to==='disc'&&card.adv)advDone(card)}
function advDone(x){const P=D(),N=MYNAT[P.nat];
  if(x.zenith){trigger(`your Zenith, ${x.n}, joins your discard pile`);return}
  if(N.noEmp||P.state!=='B')return;P.state='E';log(`Your Accession, ${x.n}, joins your discard pile. <b>You are now an Empire</b>: your Empire cards become playable.`,'end')}
function abandonCard(c){moveCard(c,'disc');log(`${c.n} is abandoned.`)}
function recallCard(c){moveCard(c,'hand');log(`${c.n} comes back to your hand.`)}
const handMax=()=>5+D().play.filter(c=>/augmentez de 1 la taille de votre main/i.test(c.t)).length;
function addOnShuffle(){const P=D();if(P.wit||P.exh<1)return false;
  if(P.natPile.length){const x=P.natPile.shift();P.disc.push(x);P.exh--;P.wit=true;log(`Shuffle: ${x.n} joins your discard pile from your Nation deck.`,'end');return true}
  if(P.adv){const x=P.adv;P.adv=null;P.exh--;P.wit=true;P.disc.push(x);log(`Shuffle: ${x.n} joins your discard pile.`);advDone(x);return true}
  return 'dev'}
async function drawMe(n,allowShuffle=true,inCleanup=false){const P=D();let k=0;
  while(k<n){if(!P.deck.length){if(!allowShuffle||!P.disc.length&&!P.natPile.length&&!P.adv)break;
      const a=addOnShuffle();
      if(a==='dev'&&P.dev.length&&!P.wit&&P.exh>0){const can=P.dev.filter(canPayCost);
        if(can.length){const ch=await ask('Your Nation deck is empty: you MAY develop a card before shuffling.',[...can.map(c=>[`Develop ${c.n} (${costTxt(c.cost)})`,c.id]),['Develop nothing','none','']]);
          if(ch!=='none'){const c=P.dev.find(x=>x.id===ch);payCost(c.cost);P.dev.splice(P.dev.indexOf(c),1);P.disc.push(c);P.exh--;P.wit=true;log(`You develop ${c.n}.`,'end');if(!P.dev.length)trigger('you developed your last card')}}
        else log('Empty Nation deck: you can\'t pay for any Development.')}
      if(!P.disc.length)break;P.deck=shuffle(P.disc);P.disc=[];log('You shuffle your discard pile to rebuild your deck.')}
    P.hand.push(P.deck.shift());k++}
  return k}
const costTxt=c=>Object.entries(c||{}).map(([r,n])=>n+' '+RES[r]).join(', ');
function canPayCost(c){const P=D(),k=c.cost||{};return P.res.prog>=(k.prog||0)+Math.max(0,(k.pop||0)-P.res.pop)+Math.ceil(Math.max(0,(k.mat||0)-P.res.mat)/2)}
function payCost(k){const P=D();k=k||{};let p=k.prog||0;P.res.prog-=p;
  const up=Math.min(P.res.pop,k.pop||0);P.res.pop-=up;P.res.prog-=(k.pop||0)-up;
  const um=Math.min(P.res.mat,k.mat||0);P.res.mat-=um;P.res.prog-=Math.ceil(((k.mat||0)-um)/2)}
/* ---------- sélecteur de cartes ---------- */
function pickCards(title,list,min,max){if(window.AUTO)return Promise.resolve(list.slice(0,min));
  return new Promise(res=>{const p=$('#prompt'),sel=new Set();
    p.innerHTML=`<div class="q">${title}</div><div class="pick">${list.map(c=>`<label class="pk"><input type="checkbox" value="${c.id}"><span>${tileMini(c)}</span></label>`).join('')}</div>
     <div class="row" style="margin-top:10px"><button type="button" class="pri" id="pkok">Confirm</button>${min===0?'<button type="button" id="pkno">None</button>':''}<span class="hint" id="pkh" style="margin:0"></span></div>`;
    const upd=()=>{const n=sel.size;$('#pkok').disabled=n<min||n>max;$('#pkh').textContent=min===max?`${n} of ${min}`:`${n} chosen${n>1?'s':''}`};
    p.querySelectorAll('.pk input').forEach(i=>i.onchange=()=>{i.checked?sel.add(i.value):sel.delete(i.value);if(max===1&&i.checked){p.querySelectorAll('.pk input').forEach(j=>{if(j!==i){j.checked=false;sel.delete(j.value)}})}upd()});
    $('#pkok').onclick=()=>{const out=list.filter(c=>sel.has(c.id));p.innerHTML='';res(out)};if($('#pkno'))$('#pkno').onclick=()=>{p.innerHTML='';res([])};upd();p.scrollIntoView({block:'nearest'})})}
/* ---------- rendu ---------- */
const BAN={reg:'var(--reg)',tra:'var(--tra)',civ:'var(--civ)',vas:'var(--vas)',ren:'var(--ren)',ins:'var(--ins)'};
const vpTxt=c=>c.vt==='s'?`<span class="vp star" title="${c.vtx||''}">★ ${c.vtx||'variable'}</span>`:c.vp?`<span class="vp">${c.vp} PV</span>`:'';
function tags(c){return [c.st==='B'?'<span class="tg b">Barbarian</span>':'',c.st==='E'?'<span class="tg e">Empire</span>':'',c.perm?'<span class="tg">∞ stays in play</span>':'',c.atk?'<span class="tg a">Attack</span>':'',...(c.ic||[]).map(i=>`<span class="tg i">${ICN[i]}</span>`)].join('')}
const tileMini=c=>`<b>${c.n}</b>${c.cat?' '+chip(c.cat):''}${c.cat2?' '+chip(c.cat2):''} ${tags(c)}`;
function tile(c,btns,extra=''){return `<div class="ct${c.ex?' ex':''}" data-id="${c.id}"><div class="cb" style="background:${BAN[c.cat]||'var(--muted)'}"><span>${c.n}</span>${c.cat?`<small>${CAT[c.cat]}${c.cat2?' · '+CAT[c.cat2]:''}</small>`:''}</div>
  <div class="cx"><div class="tgs">${tags(c)}</div><p>${c.t||''}</p>${c.cost?`<p class="cost">Development cost: ${costTxt(c.cost)}</p>`:''}${extra}<div class="cf">${vpTxt(c)}${c.ex?'<span class="tg">exhausted</span>':''}</div></div>${btns?`<div class="cbt">${btns}</div>`:''}</div>`}
const B=(a,l,id,dis,k='')=>`<button type="button" data-a="${a}" ${id?`data-id="${id}"`:''} ${dis?'disabled':''} class="${k}">${l}</button>`;
function renderMarket(){const M=MK(),K=M.kok;
  const pile=(l,n,x='')=>`<div class="pl"><b>${n}</b><span>${l}</span>${x}</div>`;
  $('#dg-market').innerHTML=`<div class="mkhead"><h2>Market</h2></div>
   <div class="piles">${pile('Region',M.reg.length,M.under.reg?'<small>+ Tributary</small>':'')}${pile('Tradition',M.tra.length,M.under.tra?'<small>+ Tributary</small>':'')}${pile('Civilised',M.civ.length,M.under.civ?'<small>+ Tributary</small>':'')}${pile('Main',M.main.length)}${pile('Fame',M.fame.length,`<small>King of Kings ${K.down?'flipped':'side '+K.side}</small>`)}
    <div class="pl ins ${M.ins<=2?'crit':M.ins<=4?'low':''}"><b>${M.ins}</b><span>Unrest</span></div><details class="pl"><summary><b>${M.exile.length}</b><span>Exile</span></summary>${M.exile.map(c=>`<div class="mini">${c.n}</div>`).join('')}</details></div>
   <div class="slots5">${M.slots.map((s,i)=>s?`<div class="slotw"><div class="slab">Slot ${i+1}</div>${tile(s.card,'',`${slotTok(s)?`<p class="tok">On the card: ${['prog','mat','pop'].filter(r=>s.tok[r]).map(r=>s.tok[r]+' '+chip(r)).join(' ')}</p>`:''}${s.ins?'<p class="und">Unrest under it</p>':''}`)}</div>`:`<div class="slotw empty">Slot ${i+1} empty</div>`).join('')}</div>`}
function quick(c){const out=[],t=c.t||'';const g=/(?:Gagnez|Gain) (\d+) (Matériaux?|Materials?|Population|Progrès|Progress)/g;let m;
  while((m=g.exec(t)))out.push(B('q-gain',`+${m[1]} ${m[2]}`,c.id+'|'+m[1]+'|'+(m[2].startsWith('Mat')?'mat':m[2]==='Population'?'pop':'prog')));
  const d=/(?:Piochez|Draw) (\d+) (?:cartes?|cards?)/.exec(t);if(d)out.push(B('q-draw',`Draw ${d[1]}`,d[1]));
  if(/acqu[ée]rir|Acquérez|\bacquire\b/i.test(t))out.push(B('t-acq','Acquire…'));
  if(/innover|Innovez|\binnovate\b/i.test(t))out.push(B('t-inn','Innovate…'));
  if(c.glory)out.push(B('t-glory','Abandon 3 Regions and look at Fame cards',c.id));
  if(/Gagnez 1 Action|Gain 1 Action/i.test(t))out.push(B('q-act','+1 Action'));
  if(/Exilez|exilez|\b[Ee]xile \d/.test(t))out.push(B('t-exile','Exile…'));
  if(/Renvoyez|renvoyer une Instabilités|[Rr]eturn (?:an|up to \d) Unrest/.test(t))out.push(B('t-retins','Return an Unrest…'));
  if(/développez 1 carte sans payer|develop 1 card without paying/i.test(t))out.push(B('t-devfree','Develop for free'));
  return out.join('')}
function renderMe(){const P=D(),act=P.phase==='act',sol=P.phase==='sol',on=act||sol,busy=DG.busy;
  const R=['mat','pop','prog'].map(r=>`<span class="rs">${chip(r)} <b>${P.res[r]}</b>${on?B('res-',`−`,r,busy,'sm')+B('res+','+',r,busy,'sm'):''}</span>`).join('');
  let ctrl='';
  if(P.phase==='order')ctrl=`<div class="q">Round ${S.round} : choose your order.</div><div class="row">${B('o-act','Activation',0,busy,'pri')}${B('o-rech','Research',0,busy)}${B('o-pac','Pacify',0,busy)}</div>`;
  else if(act)ctrl=`<div class="row">${B('end-act','End my actions → Cleanup',0,busy||!!P.cur,'pri')}${B('undo','Undo the last action',0,busy||!DG.undo.length,'undo')}</div>`;
  else if(sol)ctrl=`<div class="q">Solstice: apply the effects below with the tools, then confirm.</div><ul>${[...P.play,P.power].filter(c=>/Solstice/.test(c.t)).map(c=>`<li><b>${c.n}</b>: ${c.t.slice(c.t.indexOf('Solstice'))}</li>`).join('')||'<li>No Solstice effect in play.</li>'}</ul><div class="row">${B('sol-done','Solstice resolved',0,busy,'pri')}${B('undo','Undo the last action',0,busy||!DG.undo.length,'undo')}</div>`;
  const cur=P.cur?`<div class="curz"><h3>Card being resolved</h3>${tile(P.cur,quick(P.cur)+B('cur-disc','Done: discard',0,busy,'pri')+B('cur-hist','Put into History',0,busy)+B('cur-play','Leave in play',0,busy))}<p class="hint">Apply the text with the quick buttons or the tools, then finish.</p></div>`:'';
  const hand=P.hand.map(c=>tile(c,act?B('play','Play',c.id,busy||!!P.cur,'pri')+B('playfree','Free action',c.id,busy||!!P.cur,'sm')+B('disc','Discard',c.id,busy,'sm')+`<details class="more"><summary>More</summary>${B('arch','Put into History',c.id,busy)}${B('top','On top of the deck',c.id,busy)}${B('reserve','Reserve under…',c.id,busy)}${B('give','Give to the Bot',c.id,busy)}${c.cat==='ins'?B('retins','Return (effect)',c.id,busy):''}</details>`:'')).join('')||'<p class="muted">Empty hand.</p>';
  const play=P.play.map(c=>tile(c,on?(/Épuiser|^Exhaust/.test(c.t)&&act?B('exh','Exhaust',c.id,busy||c.ex||P.exh<1):'')+(c.cat==='reg'?B('aban','Abandon',c.id,busy,'sm')+B('recall','Recall',c.id,busy,'sm'):'')+B('arch','Put into History',c.id,busy,'sm')+(c.perm&&c.cat!=='reg'?B('recall','Take back into hand',c.id,busy,'sm'):''):'',(c.rs&&c.rs.length?`<p class="rsv">Reserved under it: ${c.rs.map(r=>r.n).join(', ')}</p>`:'')+(c.tok&&(c.tok.mat+c.tok.pop+c.tok.prog)?`<p class="tok">Tokens: ${['mat','pop','prog'].filter(r=>c.tok[r]).map(r=>c.tok[r]+' '+chip(r)).join(' ')}</p>`:''))).join('')||'<p class="muted">Nothing in play.</p>';
  const list=(z,lab,btn)=>`<details><summary>${lab} (${P[z].length})</summary><ul class="lib">${P[z].map(c=>`<li><span>${tileMini(c)}</span>${on&&btn?B(btn[0],btn[1],c.id,busy,'sm'):''}</li>`).join('')}</ul></details>`;
  const devs=P.dev.map(c=>tile(c,on?B('dev','Develop (effect)',c.id,busy||!canPayCost(c),'sm'):'')).join('');
  const T=(id,l)=>B(id,l,0,busy||!on,'sm');
  $('#dg-me').innerHTML=`<div class="mebar"><span class="pill">${MYNAT[P.nat].name} · ${P.state==='B'?'Barbarian':'Empire'}</span><span class="tk">Actions <b>${P.act}</b></span><span class="tk">Exhausted <b>${P.exh}</b></span><span class="tk">Max hand <b>${handMax()}</b></span>${R}${B('quit','Abandon',0,busy,'sm quit')}</div>
   <div class="ctrl">${ctrl}</div>${cur}
   <h3>My hand</h3><div class="cards">${hand}</div>
   <h3>My play area</h3><div class="cards">${tile(P.power,on&&/Épuiser|^Exhaust/.test(P.power.t)&&act?B('pexh','Exhaust',0,busy||P.pex||P.exh<1):'')}${play}</div>
   <details class="tools" ${on?'open':''}><summary>Toolbox</summary>
    <div class="tg2"><div><h4>Cards</h4>${T('t-draw','Draw 1')}${T('t-drawp','Draw 1, if possible')}${T('q-act','Gain 1 Action')}${T('t-getins','Recover an Unrest')}${T('t-find','Find a card')}${T('t-fame','Gain a Fame card')}${T('t-glory','Look at the Fame deck')}</div>
     <div><h4>Market</h4>${T('t-acq','Acquire…')}${T('t-inn','Innovate…')}${T('t-exile','Exile…')}${T('t-addprog','Add 1 Progress onto a card')}</div>
     <div><h4>Against the Bot</h4>${T('b-ins','It recovers an Unrest')}${T('b-aban','It abandons a Region')}${T('b-recall','It recalls a Region')}${T('b-draw','It draws 1 card')}${T('b-steal-mat','Steal 1 Material from it')}${T('b-steal-prog','Steal 1 Progress from it')}<p class="hint">"Discard" has no effect on the Bot.</p></div></div></details>
   <div class="piles2"><div class="pl"><b>${P.deck.length}</b><span>Deck</span></div><div class="pl"><b>${P.natPile.length}${P.adv?' + 1':''}</b><span>Nation deck${P.adv?' + Accession':''}</span></div></div>
   ${list('disc','My discard pile',['tohand','Take back into hand'])}${list('hist','My History',null)}
   <details><summary>My Developments (${P.dev.length})</summary><div class="cards">${devs||'<p class="muted">All developed.</p>'}</div></details>`}
function renderDig(){if(!S||!S.dig)return;renderMarket();renderMe();board()}
/* ---------- montage de l'écran ---------- */
const DG={busy:false,undo:[]};
function digMount(){const T=$('#tab-solo');if(T.classList.contains('dig'))return;T.classList.add('dig');
  const sec=$('#tab-solo section.panel');
  let m=$('#dg-market');if(!m){m=document.createElement('div');m.id='dg-market';m.className='panel';T.insertBefore(m,$('#tab-solo .wrap'))}
  let me=$('#dg-me');if(!me){me=document.createElement('div');me.id='dg-me';sec.insertBefore(me,$('#log'));me.addEventListener('click',onAct)}
  let lg=$('#dg-log');if(!lg){lg=document.createElement('details');lg.id='dg-log';lg.open=true;lg.innerHTML='<summary>Log</summary>';sec.append(lg)}
  lg.append($('#log'))}
function digUnmount(){const T=$('#tab-solo');if(!T.classList.contains('dig'))return;T.classList.remove('dig');
  const sec=$('#tab-solo section.panel');sec.insertBefore($('#log'),$('#prompt'));['#dg-market','#dg-me','#dg-log'].forEach(s=>{const e=$(s);if(e)e.remove()})}
const snap=()=>{DG.undo.push(JSON.stringify(S));if(DG.undo.length>40)DG.undo.shift()};
/* ---------- actions du joueur ---------- */
async function onAct(e){const b=e.target.closest('[data-a]');if(!b||b.disabled||DG.busy)return;const a=b.dataset.a,id=b.dataset.id,P=D();
  if(a==='undo'){S=JSON.parse(DG.undo.pop());renderDig();return}
  if(a==='quit'){DG.busy=true;const ok=await ask('Abandon this digital game? It won\'t be saved.',[['Yes, abandon',1,'warn'],['No, keep going',0]]);DG.busy=false;if(ok){drop();digUnmount();S=null;return start()}renderDig();return}
  DG.busy=true;snap();renderMe();
  try{await doAct(a,id,P)}finally{DG.busy=false}
  if(D().collapse)return digEnd(true);
  save();renderDig()}
const cardBy=id=>{const P=D();for(const z of ['hand','play','disc','hist'])for(const c of P[z]){if(c.id===id)return c}return P.cur&&P.cur.id===id?P.cur:P.dev.find(c=>c.id===id)};
async function doAct(a,id,P){const c=id?cardBy(id):null;
  switch(a){
  case'o-act':P.phase='act';log(`Round ${S.round} : you choose Activation.`);return;
  case'o-rech':{log(`Round ${S.round} : you choose Research. You discard your hand.`);P.hand.slice().forEach(x=>moveCard(x,'disc'));
    const cat=await ask('Research: in which category do you innovate?',[['Region','reg'],['Tradition','tra'],['Civilised','civ'],['Tributary','vas']]);await innoverMe([cat]);return cleanup()}
  case'o-pac':{const ins=P.hand.filter(x=>x.cat==='ins');log(`Round ${S.round} : you choose Pacify.`);
    if(ins.length){const sel=await pickCards('Pacify: which Unrest do you return to the pile?',ins,0,ins.length);sel.forEach(x=>{detach(x);MK().ins++});log(`You return ${sel.length} Unrest${sel.length>1?'s':''}.`)}
    return cleanup()}
  case'end-act':return cleanup();
  case'sol-done':return afterSolstice();
  case'res+':P.res[id]++;return;case'res-':if(P.res[id]>0)P.res[id]--;return;
  case'q-gain':{const [,n,r]=id.split('|');P.res[r]+=+n;log(`You gain ${n} ${chip(r)}.`);return}
  case'q-draw':await drawMe(+id);log(`You draw ${id} card${+id>1?'s':''}.`);return;
  case'q-act':P.act++;log('You gain 1 Action.');return;
  case'play':case'playfree':{const free=a==='playfree';
    if(c.st&&c.st!==P.state&&!unlocked(c)){const ok=await ask(`${c.n} carries the icon ${c.st==='B'?'Barbarian':'Empire'} : you can't play it from your hand while you are ${P.state==='B'?'Barbarian':'Empire'}.`,[['Got it',0],['One of my cards allows it',1,'']],'For example Combs, which lets you ignore the Empire icon.');if(!ok){DG.undo.pop();return}}
    if(c.nop){await ask(`${c.n} can't be played.`,[['Got it',1]]);DG.undo.pop();return}
    if(!free&&P.act<1){await ask('You have no Action token left. Only a Free action is still possible.',[['Got it',1]]);DG.undo.pop();return}
    if(free){if(P.free.includes(c.id)){await ask('The same card can only be played once per turn as a Free action.',[['Got it',1]]);DG.undo.pop();return}P.free.push(c.id)}else P.act--;
    if(c.cat==='ins'){const opts=[];if(P.res.pop+P.res.prog>=1)opts.push(['Pay 1 Population','pop']);if(P.res.mat+2*P.res.prog>=3)opts.push(['Pay 3 Materials','mat']);if(P.hand.length>=3)opts.push(['Discard 2 other cards','disc']);opts.push(['Cancel','no','']);
      const ch=await ask('Unrest: how do you pay to return it?',opts);
      if(ch==='no'){if(free)P.free.pop();else P.act++;return}
      if(ch==='pop')payCost({pop:1});else if(ch==='mat')payCost({mat:3});else{const sel=await pickCards('Choose 2 cards to discard.',P.hand.filter(x=>x!==c),2,2);sel.forEach(x=>moveCard(x,'disc'))}
      detach(c);MK().ins++;log('You return an Unrest to the pile.');return}
    detach(c);log(`You play ${c.n}${free?' as a Free action':''}.`);
    if(c.cat==='reg'){c.ex=false;P.play.push(c);await regionEffects(c);return}
    if(c.perm){c.ex=false;P.play.push(c);return}
    P.cur=c;return}
  case'cur-disc':moveTo(P.cur,'disc');P.cur=null;return;
  case'cur-hist':{const x=P.cur;if(x){P.cur=null;if(MYNAT[P.nat].noHist){P.disc.push(x);log(`${x.n} is discarded (no History).`)}else{P.hist.push(x);log(`${x.n} is put into your History.`)}}return}
  case'cur-play':{const x=P.cur;P.cur=null;P.play.push(x);return}
  case'disc':moveCard(c,'disc');log(`You discard ${c.n}.`);return;
  case'arch':moveCard(c,'hist');log(`${c.n} is put into your History.`);return;
  case'top':moveCard(c,'deck');log(`${c.n} is placed on top of your deck.`);return;
  case'tohand':moveCard(c,'hand');log(`${c.n} comes back to your hand.`);return;
  case'retins':detach(c);MK().ins++;log('You return an Unrest to the pile (card effect).');return;
  case'reserve':{const hosts=P.play.filter(x=>x.id!==c.id);if(!hosts.length){await ask('No card in play to reserve it under.',[['Got it',1]]);return}
    const [h]=await pickCards(`Under which card do you reserve ${c.n} ?`,hosts,1,1);detach(c);(h.rs=h.rs||[]).push(c);log(`${c.n} is reserved under ${h.n}.`);return}
  case'give':detach(c);S.deck.unshift(c);log(`You give ${c.n} to the Bot: the card goes on top of its deck.`);return;
  case'exh':P.exh--;c.ex=true;log(`You exhaust ${c.n}.`);await ask(`${c.n} — ${c.t.slice(c.t.indexOf('Exhaust'))}`,[['Apply with the tools',1]],'Use the quick buttons or the toolbox to apply the effect.');return;
  case'pexh':P.exh--;P.pex=true;log('You exhaust your Power card.');return;
  case'aban':abandonCard(c);return;
  case'recall':recallCard(c);return;
  case'dev':{payCost(c.cost);P.dev.splice(P.dev.indexOf(c),1);P.disc.push(c);log(`You develop ${c.n}.`,'end');if(!P.dev.length)trigger('you developed your last card');return}
  case't-draw':await drawMe(1);log('You draw 1 card.');return;
  case't-drawp':{const n=await drawMe(1,false);log(n?'You draw 1 card.':'Your deck is empty: you don\'t draw.');return}
  case't-devfree':return devFree();
  case't-retins':{const pool=[...P.hand,...P.disc].filter(x=>x.cat==='ins');if(!pool.length){await ask('No Unrest in your hand or discard pile.',[['Got it',1]]);return}
    const sel=await pickCards('Which Unrest do you return to the pile?',pool,0,pool.length);sel.forEach(x=>{detach(x);MK().ins++});log(`You return ${sel.length} Unrest.`);return}
  case't-getins':if(takeIns()){P.hand.push(DINS());log('You recover an Unrest.')}return;
  case't-find':{const pool=[...P.hand,...P.disc,...P.deck,...P.natPile];const [x]=await pickCards('Find: which card are you looking for? (hand, discard pile, deck, Nation deck)',pool,0,1);if(!x)return;
    const ni=P.natPile.indexOf(x);if(ni>=0){P.natPile.splice(ni,1);P.natPile=shuffle(P.natPile);P.hand.push(x)}else{const fromDeck=P.deck.includes(x);moveCard(x,'hand');if(fromDeck)P.deck=shuffle(P.deck)}log(`You find ${x.n}.`);return}
  case't-fame':return gainFame();
  case't-glory':return glory(c&&c.glory);
  case't-acq':return acquireMe();
  case't-inn':{const cat=await ask('Innovate: which category?',[['Region','reg'],['Tradition','tra'],['Civilised','civ'],['Tributary','vas'],['Cancel','no','']]);if(cat!=='no')await innoverMe([cat]);return}
  case't-exile':{const M=MK(),ok=M.slots.map((s,i)=>s&&!slotTok(s)?[`${i+1} · ${s.card.n}`,i]:null).filter(Boolean);if(!ok.length){await ask('All the Market cards carry tokens: none can be exiled.',[['Got it',1]]);return}
    const i=await ask('Which Market card do you exile?',[...ok,['Cancel','no','']]);if(i==='no')return;const s=M.slots[i];M.exile.push(s.card);if(s.ins)M.ins++;log(`You exile ${s.card.n}.`);refill(i);return}
  case't-addprog':{const M=MK(),i=await ask('On which Market card do you place 1 Progress from the supply?',M.slots.map((s,i)=>s?[`${i+1} · ${s.card.n}`,i]:null).filter(Boolean));M.slots[i].tok.prog++;return}
  case'b-ins':if(takeIns()){S.deck.unshift(INS());log('The Bot recovers an Unrest: it goes on top of its deck.')}return;
  case'b-aban':if(S.play.length){const r=S.play.pop();toDiscard(r);log(`The Bot abandons ${r.n}.`)}else log('The Bot has no Region in play.');return;
  case'b-recall':if(S.play.length){const r=S.play.pop();S.deck.unshift(r);log(`The Bot recalls ${r.n} on top of its deck.`)}else log('The Bot has no Region in play.');return;
  case'b-draw':millN(1);return;
  case'b-steal-mat':case'b-steal-prog':{const r=a.endsWith('mat')?'mat':'prog';if(S.res[r]>0){S.res[r]--;P.res[r]++;log(`You steal 1 ${chip(r)} to the Bot.`)}else log('It has none.');return}
  }}
function moveTo(x,z){if(!x)return;const P=D();P.cur=null;P[z].push(x);if(z==='disc'&&x.adv)advDone(x)}
async function regionEffects(c){const P=D(),M=MK();if(/^(?:Épuiser|Exhaust)/.test(c.t))return;const g=/(?:Gagnez|Gain) (\d+) (Matériaux?|Materials?|Population|Progrès|Progress)/.exec(c.t);
  if(g){const r=g[2].startsWith('Mat')?'mat':g[2]==='Population'?'pop':'prog';P.res[r]+=+g[1];log(`${c.n} : you gain ${g[1]} ${chip(r)}.`)}
  if(/Piochez 1 carte|Draw 1 card/.test(c.t)){await drawMe(1);log(`${c.n} : you draw 1 card.`)}
  if(/archiver 1 carte de votre défausse|put 1 card from your discard pile into your History/.test(c.t)&&P.disc.length){const s=await pickCards(`${c.n} : you MAY put 1 card from your discard pile into your History.`,P.disc,0,1);if(s[0]){moveCard(s[0],'hist');log(`${s[0].n} is put into your History.`)}}
  if(/récupérer 1 carte de votre défausse et la placer au-dessus|recover 1 card from your discard pile and place it on top/.test(c.t)&&P.disc.length){const s=await pickCards(`${c.n} : you MAY place 1 card from your discard pile on top of your deck.`,P.disc,0,1);if(s[0]){moveCard(s[0],'deck');log(`${s[0].n} is placed on top of your deck.`)}}
  if(/Exilez 1 carte du Marché|[Ee]xile 1 Market card/.test(c.t)){const ok=M.slots.map((s,i)=>s&&!slotTok(s)?[`${i+1} · ${s.card.n}`,i]:null).filter(Boolean);
    if(ok.length){const i=await ask(`${c.n} : exile 1 Market card (mandatory). A card carrying tokens can't be exiled.`,ok);const s=M.slots[i];M.exile.push(s.card);if(s.ins)M.ins++;log(`You exile ${s.card.n}.`);refill(i)}
    else log('All the Market cards carry tokens: nothing to exile.')}
  if(/réserver 1 carte|reserve 1 card/.test(c.t)&&P.hand.length){const sel=await pickCards(`${c.n} : you MAY reserve 1 card from your hand under it.`,P.hand,0,1);if(sel[0]){detach(sel[0]);(c.rs=c.rs||[]).push(sel[0]);log(`${sel[0].n} is reserved under ${c.n}.`)}}}
async function acquireMe(){const P=D(),M=MK();const opts=M.slots.map((s,i)=>s?[`${i+1} · ${s.card.n} (${CAT[s.card.cat]||'—'}${s.card.cat2?' / '+CAT[s.card.cat2]:''})${s.ins?' + Unrest':''}`,i]:null).filter(Boolean);
  const ex=M.exile.length?[['In the Exile pile…','ex','']]:[];
  const i=await ask('Acquire: which card do you take? Follow the categories shown on your card.',[...opts,...ex,['Cancel','no','']]);
  if(i==='no')return;
  if(i==='ex'){const [x]=await pickCards('Which card do you take from the Exile pile?',M.exile,1,1);M.exile.splice(M.exile.indexOf(x),1);P.hand.push(x);log(`You acquire ${x.n} in the Exile pile.`);if(x.cat!=='reg'&&takeIns()){P.hand.push(DINS());log('You also recover an Unrest.')}return}
  const s=M.slots[i];for(const r in s.tok)P.res[r]+=s.tok[r];P.hand.push(s.card);let t=`You acquire ${s.card.n}`;if(slotTok(s))t+=` and its tokens`;
  if(s.ins){P.hand.push(DINS());t+=', with the Unrest tucked under it'}log(t+'.');refill(i)}
async function innoverMe(cats){const P=D(),M=MK(),cat=cats[0];
  const opts=M.slots.map((s,i)=>s&&(s.card.cat===cat||s.card.cat2===cat)?[`Market ${i+1} · ${s.card.n}`,i]:null).filter(Boolean);
  const blind=cat==='vas'?'Search the Main deck (or a visible Tributary)':`Take the top card of the deck ${CAT[cat]}`;
  const ch=await ask(`Innovate a ${chip(cat)} : choose.`,[...opts,[blind,'blind',opts.length?'':'pri']]);
  if(ch==='blind'){const card=blindTake(cat);if(!card){P.res.prog+=2;log('No card of this category: you gain 2 Progress.');return}P.hand.push(card);log(`You innovate: ${card.n} comes into your hand.`);return}
  const s=M.slots[ch];for(const r in s.tok)P.res[r]+=s.tok[r];P.hand.push(s.card);if(s.ins)M.ins++;log(`You innovate ${s.card.n}${s.ins?' : its Unrest goes back to the pile':''}.`);refill(ch)}
async function gainFame(){const P=D(),M=MK();if(M.fame.length){const f=M.fame.shift();P.hand.push(f);log(`You gain ${f.n}.`);return}return kokMe()}
async function kokMe(){const P=D(),K=MK().kok;if(K.me){await ask('You have already resolved King of Kings: nothing happens.',[['Got it',1]]);return}
  K.me=true;const side=K.side;await ask(`<b>King of Kings, side ${side}</b>: ${K.txt[side]}`,[['Resolve',1]],'Each player resolves King of Kings only once per game.');
  if(P.state==='B'){const n=side==='A'?6:4;P.res.prog+=n;log(`King of Kings (side ${side}): you gain ${n} ${chip('prog')}.`,'end')}
  else{if(side==='A'){P.res.prog+=3;log('King of Kings (side A): you gain 3 '+chip('prog')+'.','end')}await devFree()}
  if(side==='A'){K.side='B';trigger('you resolved King of Kings (side A)')}}
async function devFree(){const P=D();if(!P.dev.length){log('No more cards to develop.');return}
  const [c]=await pickCards('Develop 1 card without paying its cost.',P.dev,1,1);P.dev.splice(P.dev.indexOf(c),1);P.disc.push(c);log(`You develop ${c.n} gratuitement.`,'end');if(!P.dev.length)trigger('you developed your last card')}
async function glory(fromCard){const P=D(),M=MK();
  if(fromCard){const regs=P.play.filter(x=>x.cat==='reg');if(regs.length<3){await ask('You need 3 Regions in play to play Glory.',[['Got it',1]]);return}
    const sel=await pickCards('Choose the 3 Regions to abandon.',regs,3,3);sel.forEach(abandonCard)}
  let n=2;if(P.nat==='rom'&&M.fame.length){n++;P.res.prog++;log('Roman power: you look at 1 more card and gain 1 '+chip('prog')+'.','end')}
  if(!M.fame.length)return kokMe();
  const look=M.fame.slice(0,n);const [keep]=await pickCards(`You look at ${look.length} card${look.length>1?'s':''} Fame. Which one do you keep?`,look,1,1);
  M.fame.splice(M.fame.indexOf(keep),1);P.hand.push(keep);log(`You keep ${keep.n} ; the others go back on the Fame deck.`,'end')}
/* ---------- déroulement ---------- */
async function cleanup(){const P=D();P.phase='clean';P.cur=null;renderDig();
  const M=MK(),opts=M.slots.map((s,i)=>s?[`${i+1} · ${s.card.n}`,i]:null).filter(Boolean);
  const car=P.nat==='car';const i=await ask(car?'Cleanup, step 1 (Carthaginian power): on which Market card do you place 2 Materials from the supply?':'Cleanup, step 1: on which Market card do you place 1 Progress from the supply?',opts);if(M.slots[i]){if(car)M.slots[i].tok.mat+=2;else M.slots[i].tok.prog++}
  P.act=3;P.exh=5;P.wit=false;P.pex=false;P.free=[];P.play.forEach(c=>c.ex=false);
  if(P.hand.length){const sel=await pickCards('Cleanup, step 3: which cards do you discard?',P.hand,0,P.hand.length);sel.forEach(c=>moveCard(c,'disc'))}
  const need=handMax()-P.hand.length;if(need>0)await drawMe(need,true,true);
  log(`End of your turn: your hand holds ${P.hand.length} cards.`);P.phase='bot';save();renderDig();
  if(P.collapse)return digEnd(true);
  await botTurnDig()}
async function botTurnDig(){REC=null;TURN=newTurn();$('#title').textContent=`Round ${S.round} : the Bot's turn`;
  const die=1+rnd(6);S.skip=die<=S.n?die:0;
  log(`The Bot's turn · die: <b>${die}</b>. `+(S.skip?`The card in slot ${die} won't be resolved.`:'All its cards are resolved.'),'card');
  for(let i=1;i<=S.n;i++){if(i===S.skip||!S.slots[i])continue;const x=S.slots[i];S.slots[i]=null;await resolve(x,'Slot '+i);renderDig();if(D().collapse)return digEnd(true)}
  if(S.skip&&S.skip<=5){const s=MK().slots[S.skip-1];if(s){if(S.nat==='car')s.tok.mat+=2;else s.tok.prog++;log(`The Bot places ${S.nat==='car'?'2 Materials':'1 Progress'} of ${s.card.n}.`)}}
  if(S.skip>1){S.slots[1]=S.slots[S.skip];S.slots[S.skip]=null}
  S.skip=0;for(let i=1;i<=S.n;i++)if(!S.slots[i])S.slots[i]=drawForSlot();
  if(S.diff===1&&S.deck.length){const x=S.deck.shift();toDiscard(x)}
  const st=story();TURN=null;log(st,'story');
  const P=D();P.phase='sol';DG.undo=[];save();renderDig();
  $('#title').textContent=`Round ${S.round} : Solstice`;
  $('#prompt').innerHTML=`<div class="story">${st}</div>`}
function afterSolstice(){const P=D();$('#prompt').innerHTML='';
  if(S.trig!=null&&S.round>S.trig)return digEnd(false);
  S.round++;P.phase='order';DG.undo=[];digTurn()}
function digTurn(){digMount();const P=D();if(P.phase==='bot'){renderDig();return botTurnDig()}if(P.phase==='clean')P.phase='act';
  $('#title').textContent=`Round ${S.round} : your turn`+(S.trig!=null?(S.round>S.trig?' (last round)':' (Countdown triggered)'):'');
  LOG=[];drawLog();save();renderDig()}
async function digStart(botNat,diff,me){digNew(botNat,diff,me);digMount();LOG=[];
  log(`New digital game: your ${MYNAT[me].name} against the Bot ${NAT[botNat].name} (${DIFF[diff][0]}). You go first.`,'end');
  digTurn()}
async function digEnd(collapse){const P=D();P.phase='end';renderDig();drop();
  if(collapse){LOG=[];log('<b>Collapse</b>: the Unrest pile is empty. In solo, the game is lost.','you');return finishDig(null,botScore(),true)}
  const all=[...P.hand,...P.play,...P.play.flatMap(c=>c.rs||[]),...P.deck,...P.disc,...P.hist,...(P.cur?[P.cur]:[])];
  let me=all.filter(c=>c.vt!=='s'&&c.vt!=='c').reduce((a,c)=>a+(c.vp||0),0)+P.res.prog;
  const vars=[...all.filter(c=>c.vt==='s'||c.vt==='c'),P.power];
  if(vars.length&&!window.AUTO){me+=await new Promise(res=>{const p=$('#prompt');
    p.innerHTML=`<div class="q">End of the game: enter the value of your variable-points cards.</div><div class="form">${vars.map((c,i)=>`<label class="f" for="vv${i}">${c.n} : ${c.vtx||c.t} (10 at most)<input type="number" id="vv${i}" min="0" max="10" value="0"></label>`).join('')}</div><div class="row" style="margin-top:10px"><button type="button" class="pri" id="vvok">Confirm</button></div>`;
    $('#vvok').onclick=()=>{let t=0;vars.forEach((_,i)=>t+=Math.min(10,Math.max(0,+$('#vv'+i).value||0)));p.innerHTML='';res(t)}})}
  LOG=[];const sc=botScore();log(`Your score: <span class="big">${me}</span> points (cards, ${P.res.prog} Progress in reserve). Bot: <span class="big">${sc.total}</span> points.`,'end');
  finishDig(me,sc,false)}
function finishDig(me,sc,collapse){const win=!collapse&&me>sc.total;
  log(collapse?'Defeat.':win?`<b>Victory</b>: ${me} to ${sc.total}.`:`The Bot wins ${sc.total} to ${me}.`,win?'end':'you');
  META.hist.unshift({d:new Date().toLocaleDateString('fr-FR'),bot:NAT[S.nat].name,lvl:S.diffName+' (digital)',me,civ:sc.total,res:collapse?'Collapse':win?'Victory':'Defeat',mode:'dig'});META.hist=META.hist.slice(0,50);saveMeta();
  const p=$('#prompt');p.innerHTML='<div class="row"><button type="button" class="pri" id="again">New game</button></div>';$('#again').onclick=()=>{digUnmount();S=null;start()}}
window.IMP_DIG={digMount,digNew,digStart,doAct:(a,id)=>doAct(a,id,D()),cleanup,get D(){return S&&S.D},get M(){return S&&S.M},render:renderDig};

async function start(){
  digUnmount();S=null;TR=null;LOG=[];REC=null;TURN=null;drawLog();board();$('#title').textContent='New game';$('#hd').textContent='Automated opponent for solo mode';
  const old=load();
  if(old&&old.nat){if(await ask(`A game against the ${NAT[old.nat].name} is in progress (round ${old.round}). Resume it at the start of your turn?`,[['Resume',1],['New game',0]])){S=old;if(S.seed==null)S.seed=12345;return playerTurn()}drop()}
  const ot=loadTR();
  if(ot){if(await ask(`A training game with the ${ot.me} is in progress (turn ${ot.turn} of 12). Resume it?`,[['Resume',1],['New game',0]])){TR=ot;return trainLoop()}dropTR()}
  let nat='car',diff=0,m=META.camp?1:0;const p=$('#prompt');
  const natSel=(id,keys)=>`<label class="f" for="${id}">Your nation<select id="${id}">${Object.entries(NAT).sort((a,b)=>CX[a[0]]-CX[b[0]]).map(([k,N])=>`<option value="${keys?k:N.name}">${N.name} · complexity ${'★'.repeat(CX[k])}${'☆'.repeat(5-CX[k])}</option>`).join('')}</select></label><p class="hint" style="margin:6px 0 0">Complexity according to the rulebook: one star is the easiest to pick up.</p>`;
  p.innerHTML=`<div class="q">Game type</div><div class="row" id="mm"><button type="button" data-m="0">Free game</button><button type="button" data-m="1">Campaign</button><button type="button" data-m="2">Training</button><button type="button" data-m="3">Digital game</button></div><div id="cb" style="margin:10px 0 14px"></div>
  <div id="nb"><div class="q">Which nation does the Bot play?</div><div class="row" id="nn"></div><p class="hint" style="margin:6px 0 14px">Estimated difficulty of each Bot based on hundreds of simulated games: this is not from the rulebook. It adds to the level chosen below.</p></div>
  <div id="db"><div class="q">Difficulty level</div><div class="row" id="dd"></div><div class="hint" id="dh" style="margin:8px 0 14px"></div></div><div class="row"><button type="button" class="pri" id="go">Prepare the game</button></div>`;
  const mode=()=>{p.querySelectorAll('#mm button').forEach(b=>b.classList.toggle('sel',+b.dataset.m===m));$('#db').style.display=m===1||m===2?'none':'';$('#nb').style.display=m===2?'none':'';const C=META.camp;
    $('#cb').innerHTML=m===3?`<p>Without the physical game: the app manages your deck, your hand, the Market, the tokens and the Bot. You read your cards and apply their effects with buttons.</p>${natSel('dm',true)}<p class="hint">The Market is prepared with the common cards of your box, as for 2 players.</p>`:m===2?`<p>The rulebook's learning variant: no opponent, 12 turns paced by a 12-Progress hourglass. Ideal for discovering a nation. Benchmarks: 50 points, you have the basics; 90 points is a feat.</p>${natSel('tm')}`
      :m===0?'':C?`<p>Campaign with the ${C.me} : ${pl(C.wins,'win')}, ${C.losses+(C.losses>1?' losses':' loss')}. This game is played at level ${DIFF[C.level][0]}.</p><button type="button" id="cx" class="warn">Abandon this campaign</button>`
      :`<p>Five wins of increasing difficulty to win, four losses to lose. You keep the same nation from start to finish.</p>${natSel('cm')}`;
    if($('#cx'))$('#cx').onclick=()=>{META.camp=null;saveMeta();board();mode()}};
  p.querySelectorAll('#mm button').forEach(b=>b.onclick=()=>{m=+b.dataset.m;mode()});mode();
  Object.entries(NAT).sort((a,b)=>BD[a[0]][0]-BD[b[0]][0]).forEach(([k,N])=>{const b=document.createElement('button');b.type='button';b.className='natb';b.innerHTML=`${N.name}<small>${BD[k][1]} <span aria-hidden="true">${'●'.repeat(BD[k][0])}${'○'.repeat(3-BD[k][0])}</span></small>`;b.disabled=!N.deck;b.dataset.k=k;
    b.onclick=()=>{nat=k;p.querySelectorAll('#nn button').forEach(x=>x.classList.toggle('sel',x.dataset.k===nat))};$('#nn').append(b)});
  DIFF.forEach((d,i)=>{const b=document.createElement('button');b.type='button';b.textContent=d[0];
    b.onclick=()=>{diff=i;p.querySelectorAll('#dd button').forEach((x,j)=>x.classList.toggle('sel',j===diff));$('#dh').textContent=d[2]};$('#dd').append(b)});
  p.querySelector('#nn button').click();p.querySelector('#dd button').click();
  await new Promise(r=>$('#go').onclick=r);
  if(m===2)return trainStart($('#tm').value);
  if(m===3)return digStart(nat,diff,$('#dm').value);
  const camp=m===1;
  if(camp&&!META.camp){META.camp={me:$('#cm').value,level:0,wins:0,losses:0,bonus:false,added:[],removed:[]};saveMeta()}
  newGame(nat,camp?META.camp.level:diff);S.camp=camp;board();const N=NAT[nat],C=camp?META.camp:null;
  $('#title').textContent='Setup';
  p.innerHTML=`<h3 style="margin-top:0">Your nation</h3><ol class="setup"><li>Power card, and State card Barbarian side up with 3 Action tokens and 5 Exhaust tokens.</li><li>Developments face up. Accession face up, shuffled Nation cards placed crosswise on top.</li><li>Reserve: 3 Materials, 2 Population, 1 Progress.</li><li>Set aside your cards marked 3+ or 4, shuffle the rest to form your deck, draw 5 cards.</li></ol><h3>The Market (as for 2 players)</h3><ol class="setup"><li>Set aside the common cards marked 3+ or 4, then sort by banner colour.</li><li>Unrest pile face up.</li><li>King of Kings side A, with 6 face-down Fame cards on top.</li><li>Region, Tradition and Civilised decks: 6 cards each.</li><li>Main deck: the Tributaries and everything else, shuffled.</li><li>Market: 2 cards from the Main deck, then 1 Civilised, 1 Tradition, 1 Region.</li><li>An Unrest under each Market card except the Region, and 1 Progress on each white-banner card.</li></ol><h3>The Bot</h3><ol class="setup">
  <li>The Market slots are numbered 1 to 5, from left to right. Place the markers under them if you want a reference.</li>
  <li>From the box of the ${N.name}, take ${N.ownIns?`their ${N.ownIns} Unrest cards with no player-count icon and set them aside: this is the "Bot's Unrest" stack`:'their Unrest cards and add them to the common pile'}. Their other cards stay in the box: the app manages them.</li>
  <li>Keep a corner of the table for a second stack, "Bot's cards", where the cards it takes from the Market will go.</li>
  ${S.diff>=3?'<li>The Bot starts with 3 Materials, 2 Population and 1 Progress: this is already counted.</li>':''}
  ${C?`<li><b>Campagne.</b> ${C.bonus?'You start with 6 Materials, 4 Population and 2 Progress.':'Normal starting resources.'}${C.added.length?' Add to your starting deck: '+C.added.join(', ')+'.':''}${C.removed.length?' Remove from your starting deck: '+C.removed.join(', ')+'.':''}</li>`:''}<li>You go first. The Bot's die, deck, discard pile, History and resources are tracked here.</li></ol>
  <div class="row"><button type="button" class="pri" id="go2">Start the game</button></div>`;
  await new Promise(r=>$('#go2').onclick=r);p.innerHTML='';playerTurn()}
window.IMP_T={NAT,newGame,playerTurn,botScore,c,get S(){return S},get TR(){return TR},log:(f)=>{const o=log;log=(t,k)=>{f(t,k);o(t,k)}}};
window.IMP_NAT=NAT;
start();

})();