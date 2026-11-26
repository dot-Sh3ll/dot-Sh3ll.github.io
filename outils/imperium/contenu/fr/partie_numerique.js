/* ================= PARTIE NUMÉRIQUE : table virtuelle contre la C.I.V. ================= */
let UID=1;const uid=()=>'k'+(UID++)+'_'+Math.floor(Math.random()*1e6);
const mk=(n,o={})=>Object.assign({id:uid(),n,cat:null,st:null,perm:false,atk:false,vp:0,vt:'f',t:'',ic:[],cost:null},o);
const ICN={prod:'Production',eau:'Eau',fert:'Fertile',ville:'Ville',metro:'Métropole',masque:'Masque',chev:'Chevalier',riv:'Eau',ocean:'Eau',chasse:'Chasse'};
const TXT_INS='Choisir : payez 1 Population OU défaussez 2 cartes OU payez 3 Matériaux. Si vous le faites, renvoyez cette carte dans la pile Instabilités.';
const DINS=()=>mk('Instabilités',{cat:'ins',vp:-2,t:TXT_INS});
const DPROSP='Tous les joueurs PEUVENT piocher 1 carte. Choisir : gagnez 1 Matériau par icône Production OU gagnez 1 Population par Région que vous avez en jeu.';
const GLOIRE='Cette carte ne peut pas être réservée. Abandonnez 3 Régions pour regarder jusqu\'à 2 Renommées. Gardez une de ces cartes et remettez l\'autre sur la pioche Renommée.';
const PROG='Choisir : payez 3 Matériaux pour acquérir une Tradition ou un Civilisé OU payez 5 Matériaux pour innover en Tradition ou Civilisé.';
const CONQ='Choisir : payez 2 Population pour acquérir une Région ou un Vassal OU payez 3 Population pour innover en Région ou Vassal.';
const MYNAT={rom:{name:'Romains',
  power:{n:'Romains',t:'Passif : à chaque fois que vous regardez n\'importe quel nombre de cartes du deck Renommée, regardez 1 carte supplémentaire puis gagnez 1 Progrès.',vt:'s',vtx:'1 PV par 4 Population'},
  deck:()=>[mk('Gloire',{t:'Cette carte ne peut pas être réservée. Abandonnez 3 Régions pour regarder jusqu\'à 2 Renommées. Gardez une de ces cartes et remettez l\'autre sur la pioche Renommée.',glory:true}),
    mk('Prospérité',{t:DPROSP}),
    mk('Progrès',{st:'B',t:'Choisir : payez 3 Matériaux pour acquérir une Tradition ou un Civilisé OU payez 5 Matériaux pour innover en Tradition ou Civilisé.'}),
    mk('Conquête',{st:'B',t:'Choisir : payez 2 Population pour acquérir une Région ou un Vassal OU payez 3 Population pour innover en Région ou Vassal.'}),
    mk('Triumvirat',{st:'B',t:'Innovez en Tradition. Archivez Triumvirat dans votre Histoire.'}),
    mk('Cité de Rome',{perm:true,ic:['ville'],t:'Solstice : vous POUVEZ défausser 1 carte pour Choisir : gagnez 1 Population OU gagnez 1 Matériau OU piochez 1 carte.'}),
    mk('Dalmatie',{cat:'reg',perm:true,ic:['prod'],t:'Gagnez 1 Population. Vous POUVEZ réserver 1 carte.'}),
    mk('Expansion romaine',{st:'B',atk:true,t:'Acquérez une Région. Vous POUVEZ à nouveau acquérir une Région. Chaque autre joueur rappelle une Région. Archivez Expansion romaine dans votre Histoire.'}),
    DINS(),DINS()],
  nat:()=>[mk('Prospérité',{t:DPROSP}),
    mk('Du pain et des jeux',{perm:true,t:'Solstice : défaussez 1 carte. Vous POUVEZ renvoyer une Instabilités. Vous POUVEZ renvoyer une Instabilités de votre défausse.'}),
    mk('Gaule Aquitaine',{cat:'reg',perm:true,ic:['prod','fert'],t:'Vous POUVEZ réserver 1 carte.'}),
    mk('Rhétie',{cat:'reg',perm:true,ic:['prod','eau'],t:'Gagnez 1 Matériau. Vous POUVEZ réserver 1 carte.'}),DINS()],
  adv:()=>mk('Jules César',{st:'E',adv:true,t:'Action gratuite. Choisir : piochez 2 cartes OU vous POUVEZ acquérir une Région ou un Vassal. Archivez Jules César dans votre Histoire.'}),
  dev:()=>[mk('Génie militaire',{st:'E',atk:true,vp:3,cost:{mat:4,pop:1},t:'Chaque autre joueur défausse 2 cartes. Vous POUVEZ innover en Tradition.'}),
    mk('Invasion romaine',{st:'E',atk:true,vp:2,cost:{pop:3},t:'Vous POUVEZ acquérir une Région ou un Vassal. Chaque autre joueur abandonne une Région.'}),
    mk('Légions',{st:'E',perm:true,vp:2,cost:{pop:3},t:'Passif : augmentez de 1 la taille de votre main. Vos cartes Conquête perdent l\'icône Barbare.'}),
    mk('Le Sénat',{st:'E',vp:3,cost:{mat:4},t:'Vous POUVEZ acquérir une Tradition. Vous POUVEZ archiver 1 carte de votre main dans votre Histoire.'}),
    mk('Rome, la Cité éternelle',{st:'E',perm:true,ic:['metro'],vp:4,cost:{mat:3,pop:3},t:'Ne peut être joué que si Cité de Rome est en jeu. Archivez Cité de Rome dans votre Histoire. Solstice : Choisir : gagnez 1 Matériau OU gagnez 1 Population OU piochez 1 carte.'}),
    mk('Empereur Trajan',{st:'E',vt:'s',vp:5,vtx:'1 PV par 3 Population',cost:{mat:2,pop:1},t:'Acquérez une Tradition, un Civilisé, une Région ou un Vassal. Archivez Empereur Trajan dans votre Histoire.'})]},
car:{name:'Carthaginois',
  power:{n:'Carthaginois',t:'Passif : quand vous devez placer 1 Progrès sur une carte du Marché, placez à la place 2 Matériaux sur cette carte.',vt:'s',vtx:'1 PV par 3 Matériaux'},
  deck:()=>[mk('Gloire',{t:GLOIRE,glory:true}),mk('Prospérité',{t:DPROSP}),mk('Progrès',{st:'B',t:PROG}),mk('Conquête',{st:'B',t:CONQ}),
    mk('Didon, reine de Carthage',{st:'B',t:'Gagnez 1 Population. Vous POUVEZ acquérir une Région et la jouer en Action gratuite. Archivez Didon dans votre Histoire.'}),
    mk('Marchands carthaginois',{st:'B',t:'Action gratuite. Ajoutez 1 Matériau sur une carte du Marché. Vous POUVEZ archiver 1 carte de votre main ou de votre défausse dans votre Histoire.'}),
    mk('Îles Baléares',{cat:'reg',perm:true,ic:['prod','prod','eau'],t:'Vous POUVEZ réserver 1 carte.'}),
    mk('Maurétanie',{cat:'reg',perm:true,ic:['prod'],t:'Gagnez 2 Matériaux. Vous POUVEZ réserver 1 carte.'}),DINS(),DINS()],
  nat:()=>[mk('Prospérité',{t:DPROSP}),mk('Progrès',{st:'B',t:PROG}),
    mk('Caravanes',{perm:true,t:'Épuiser : payez 3 Matériaux et défaussez 1 carte pour acquérir 1 carte du Marché sur laquelle se trouvent des Matériaux.'}),
    mk('Ibérie',{cat:'reg',perm:true,ic:['prod','fert'],t:'Vous POUVEZ réserver 1 carte.'}),mk('Berbères',{cat:'vas',t:'Gagnez 2 Population.'})],
  adv:()=>mk('Cité de Carthage',{perm:true,ic:['ville'],adv:true,t:'Solstice : vous POUVEZ défausser 1 carte pour Choisir : gagnez 1 Matériau OU gagnez 1 Population OU piochez 1 carte.'}),
  dev:()=>[mk('Hannibal',{st:'E',vp:4,cost:{pop:4},t:'Vous POUVEZ acquérir une Tradition, un Civilisé, une Région ou un Vassal. Vous POUVEZ piocher 1 carte. Vous POUVEZ récupérer 1 carte de votre Histoire. Archivez Hannibal dans votre Histoire.'}),
    ...[0,1].map(()=>mk('Éléphants',{st:'E',atk:true,vp:2,cost:{pop:3},t:'Chaque autre joueur abandonne une Région. Vous POUVEZ innover en Région ou Vassal. Archivez ces Éléphants dans votre Histoire.'})),
    mk('Navires marchands',{st:'E',perm:true,vp:4,cost:{mat:4,pop:1},t:'Épuiser : vous POUVEZ rappeler une Région Eau ou une Région Fertile pour acquérir 1 carte du Marché sur laquelle se trouvent des Matériaux.'}),
    mk('Monopole',{st:'E',atk:true,vt:'s',vp:5,vtx:'1 PV par 5 Matériaux',cost:{mat:7},t:'Gagnez 2 Matériaux et piochez 1 carte. Donnez à chaque autre joueur 1 carte de votre main ou de votre défausse.'}),
    mk('Hégémonie',{st:'E',vp:2,cost:{mat:3,pop:1},t:'Payez 2 Matériaux pour acquérir une Tradition, un Civilisé, une Région ou un Vassal. Chaque joueur PEUT piocher 1 carte.'})]},
cel:{name:'Celtes',
  power:{n:'Celtes',vt:'s',vtx:'1 PV par Tradition',t:'Épuiser : quand vous acquérez une Tradition ou que vous innovez en Tradition, épuisez Celtes, puis chaque autre joueur récupère une Instabilités.'},
  deck:()=>[mk('Gloire',{t:GLOIRE,glory:true}),mk('Progrès',{st:'B',t:PROG}),
    mk('Druides',{t:'Choisir : gagnez 1 Progrès OU payez 1 Population pour innover en Tradition OU renvoyez une Instabilités pour gagner 1 Population.'}),
    mk('Vol de bétail',{st:'B',atk:true,t:'Gagnez 2 Matériaux. Volez 1 Matériau à chaque joueur ayant au moins une Région en jeu. Volez 1 Progrès à chaque joueur qui est Empire.'}),
    mk('Celtica',{cat:'reg',perm:true,ic:['prod'],t:'Vous POUVEZ récupérer 1 carte de votre défausse et la placer au-dessus de votre deck. Vous POUVEZ réserver 1 carte.'}),
    mk('Boadicée',{st:'B',atk:true,t:'Gagnez 1 Progrès. Chaque autre joueur abandonne une Région. Archivez Boadicée dans votre Histoire.'}),
    mk('Chaudron de Cerridwen',{perm:true,t:'Épuiser : payez 1 Progrès pour gagner 2 Population.'}),
    mk('Conquête',{st:'B',t:CONQ}),DINS(),DINS()],
  nat:()=>[mk('Conquête',{st:'B',t:CONQ}),
    mk('Gaule belge',{cat:'reg',perm:true,ic:['eau'],t:'Vous POUVEZ piocher 1 carte. Vous POUVEZ réserver 1 carte.'}),
    mk('Hibernie',{cat:'reg',perm:true,ic:['fert'],t:'Vous POUVEZ récupérer 1 carte de votre défausse. Vous POUVEZ réserver 1 carte.'}),
    mk('Armorique',{cat:'reg',perm:true,ic:['prod','eau'],t:'Vous POUVEZ réserver 1 carte.'}),
    mk('Britannie',{cat:'reg',perm:true,ic:['prod','fert'],t:'Vous POUVEZ réserver 1 carte.'}),DINS()],
  adv:()=>mk('Or des Celtes',{adv:true,t:'Chaque autre joueur gagne 1 Matériau. Gagnez 4 Matériaux par icône Fertile dans votre zone de jeu.'}),
  dev:()=>[mk('Cotte de mailles',{st:'E',perm:true,vp:4,cost:{mat:3,pop:1},t:'Passif : gagnez 1 Progrès quand vous jouez une Attaque.'}),
    mk('Vercingétorix',{st:'E',vt:'s',vp:5,vtx:'1 PV par Tradition',cost:{mat:4},t:'Vous POUVEZ acquérir une Tradition, un Civilisé, une Région ou un Vassal. Archivez Vercingétorix dans votre Histoire.'}),
    mk('Innovation celtique',{st:'E',atk:true,vp:4,cost:{mat:2,pop:2},t:'Vous POUVEZ acquérir une Tradition ou un Civilisé. Chaque autre joueur récupère une Instabilités.'}),
    mk('Écriture oghamique',{st:'E',perm:true,vp:4,cost:{mat:2,pop:2},t:'Passif : augmentez de 1 la taille de votre main. Épuiser : vous POUVEZ archiver 1 carte de votre main dans votre Histoire. Vous POUVEZ archiver 1 carte de votre défausse dans votre Histoire.'}),
    mk('Chars',{st:'E',perm:true,vp:4,cost:{pop:3},t:'Passif : vous pouvez acquérir une Région exilée. Vos cartes Conquête et vos Attaques perdent l\'icône Barbare.'})]},
gre:{name:'Grecs',
  power:{n:'Grecs',vt:'s',vtx:'1 PV par 7 cartes',t:'Épuiser : dépensez 2 Actions pour innover en Tradition ou Civilisé.'},
  deck:()=>[mk('Gloire',{t:GLOIRE,glory:true}),mk('Progrès',{st:'B',t:PROG}),mk('Conquête',{st:'B',t:CONQ}),
    mk('Colons',{st:'B',t:'Choisir : payez 1 Population pour acquérir une Région OU gagnez 1 Progrès OU renvoyez une Instabilités.'}),
    mk('Mercenaires grecs',{atk:true,t:'Gagnez 1 Progrès. Piochez 1 carte. Volez 2 Matériaux à chaque autre joueur. Chaque autre joueur gagne 1 Population.'}),
    mk('Cité de Sparte',{st:'B',perm:true,ic:['ville'],t:'Solstice : vous POUVEZ défausser 1 carte pour Choisir : gagnez 1 Population OU gagnez 1 Matériau OU piochez 1 carte.'}),
    mk('Péloponnèse',{cat:'reg',perm:true,ic:['prod','eau'],t:'Gagnez 1 Population. Vous POUVEZ réserver 1 carte.'}),
    mk('Forêt de Pholos',{cat:'reg',perm:true,ic:['prod'],t:'Vous POUVEZ réserver 1 carte.'}),DINS(),DINS()],
  nat:()=>[mk('Cité d\'Athènes',{perm:true,ic:['ville'],t:'Solstice : vous POUVEZ défausser 1 carte pour Choisir : gagnez 1 Population OU gagnez 1 Matériau OU piochez 1 carte.'}),
    mk('Plaines de Thessalie',{cat:'reg',perm:true,ic:['prod'],t:'Gagnez 1 Matériau. Vous POUVEZ réserver 1 carte.'}),DINS()],
  adv:()=>mk('Jeux olympiques',{adv:true,t:'Piochez 2 cartes. Archivez 1 carte de votre main dans votre Histoire.'}),
  dev:()=>[mk('Phare',{st:'E',perm:true,vp:3,cost:{mat:5},t:'Épuiser : Choisir : récupérez une Attaque de votre défausse et placez-la au-dessus de votre deck OU échangez 1 carte exilée avec 1 carte du Marché.'}),
    mk('Démocratie directe',{st:'E',perm:true,vp:3,cost:{mat:3,pop:2},t:'Passif : jouer vos Instabilités vous coûte 1 Matériau ou 1 carte à défausser de moins (minimum 1). Épuiser : jouez une Instabilités en Action gratuite.'}),
    mk('Science',{st:'E',perm:true,vp:3,cost:{mat:3,pop:2},t:'Passif : augmentez la taille de votre main de 1. Vos cartes Progrès perdent l\'icône Barbare.'}),
    mk('Philosophie',{st:'E',vt:'s',vp:5,vtx:'1 PV par 5 cartes',cost:{mat:6},t:'Abandonnez une carte permanente (qui ne soit pas une Région) pour innover en Tradition ou Civilisé.'}),
    mk('Innovation grecque',{st:'E',atk:true,vp:3,cost:{mat:3,pop:2},t:'Placez 2 cartes de votre main au-dessus de votre deck pour acquérir une Tradition, un Civilisé, une Région ou un Vassal. Chaque autre joueur rappelle une carte permanente.'}),
    mk('Cité de Corinthe',{st:'E',perm:true,ic:['ville'],vp:3,cost:{mat:3,pop:2},t:'Solstice : vous POUVEZ défausser 1 carte pour Choisir : gagnez 1 Population OU 1 Matériau OU piochez 1 carte.'}),
    mk('Périclès',{st:'E',vp:3,cost:{mat:3,pop:2},t:'Action gratuite. Acquérez une Tradition, un Civilisé, une Région ou un Vassal. Archivez Périclès dans votre Histoire.'}),
    mk('Prospérité grecque',{st:'E',vp:2,cost:{mat:2,pop:2},t:'Choisir : gagnez 1 Matériau par icône Production OU gagnez 1 Population par Région OU piochez une carte par icône Ville et Métropole que vous avez en jeu.'})]},
mac:{name:'Macédoniens',
  power:{n:'Macédoniens',vt:'s',vtx:'1 PV par 2 Régions',t:'Passif : quand vous jouez une Région de votre défausse, gagnez 2 Matériaux.'},
  deck:()=>[mk('Philippe II',{st:'B',t:'Acquérez une Tradition, un Civilisé, une Région ou un Vassal. Archivez Philippe II dans votre Histoire.'}),
    mk('Conquête',{st:'B',t:CONQ}),mk('Conquête',{st:'B',t:CONQ}),mk('Progrès',{st:'B',t:PROG}),
    mk('Phalange',{perm:true,t:'Épuiser : dépensez 1 Action pour jouer une Région de votre défausse.'}),
    mk('Orestide',{cat:'reg',perm:true,t:'Gagnez 2 Matériaux. Vous POUVEZ réserver 1 carte.'}),
    mk('Vallée de l\'Aliakmon',{cat:'reg',perm:true,ic:['fert','eau'],t:'Gagnez 1 Population. Vous POUVEZ réserver 1 carte.'}),
    mk('Pélagonie',{cat:'reg',perm:true,ic:['fert'],t:'Gagnez 1 Population. Vous POUVEZ réserver 1 carte.'}),DINS(),DINS(),DINS()],
  nat:()=>[mk('Prospérité',{t:DPROSP}),
    mk('Ouxiens',{cat:'vas',atk:true,t:'Volez 2 Matériaux à chaque autre joueur. Vous POUVEZ renvoyer 1 jeton Épuisé utilisé sur votre carte État.'}),
    mk('Gloire',{t:GLOIRE,glory:true})],
  adv:()=>mk('Alexandre',{adv:true,t:'Piochez 1 carte. Vous POUVEZ innover en Région ou Vassal. Archivez Alexandre dans votre Histoire.'}),
  dev:()=>[mk('Mosaïques',{st:'E',perm:true,vp:3,cost:{mat:4,pop:1},t:'Épuiser : payez 1 Matériau pour récupérer 1 carte de votre défausse.'}),
    mk('Alexandre le Grand',{st:'E',vp:4,cost:{mat:4,pop:2},needHist:'Alexandre',t:'Ne peut être jouée que si Alexandre est archivé dans votre Histoire. Action gratuite. Vous POUVEZ acquérir une Région deux fois, y compris parmi les cartes exilées. Archivez Alexandre le Grand dans votre Histoire.'}),
    mk('Cavalerie des Compagnons',{st:'E',perm:true,vp:3,cost:{pop:3},t:'Passif : vos cartes Conquête perdent l\'icône Barbare. Épuiser : quand vous jouez une Région, épuisez cette carte pour piocher 1 carte.'}),
    mk('Développement',{st:'E',vp:3,cost:{mat:4,pop:1},t:'Choisir : développez 1 carte OU payez 2 Matériaux pour acquérir une Tradition ou un Civilisé.'}),
    mk('Alexandrie en Ariana',{st:'E',perm:true,ic:['ville'],vt:'s',vp:5,vtx:'1 PV par 2 Régions',cost:{mat:4,pop:2},t:'Solstice : vous POUVEZ défausser 1 carte pour Choisir : gagnez 1 Population OU gagnez 1 Matériau OU piochez 1 carte.'}),
    mk('Alexandrie en Égypte',{st:'E',perm:true,ic:['metro'],vp:2,cost:{mat:4,pop:1},t:'Solstice : Choisir : gagnez 1 Population OU gagnez 1 Matériau OU piochez 1 carte.'}),
    mk('Parménion',{st:'E',vp:2,cost:{mat:2,pop:2},t:'Vous POUVEZ acquérir une Région ou un Vassal et la jouer en Action gratuite. Archivez Parménion dans votre Histoire.'})]},
per:{name:'Perses',
  power:{n:'Perses',vt:'s',vtx:'1 PV par 3 Vassaux',t:'Épuiser : dépensez 1 Action, placez 2 cartes de votre main au-dessus de votre deck et payez 1 Population pour innover en Vassal.'},
  deck:()=>[mk('Gloire',{t:GLOIRE,glory:true}),mk('Prospérité',{t:DPROSP}),mk('Progrès',{st:'B',t:PROG}),mk('Conquête',{st:'B',t:CONQ}),mk('Conquête',{st:'B',t:CONQ}),
    mk('Lydiens',{cat:'vas',st:'B',t:'Gagnez 2 Population. Archivez Lydiens dans votre Histoire.'}),
    mk('Bactrie',{cat:'reg',perm:true,t:'Gagnez 3 Matériaux. Vous POUVEZ réserver 1 carte.'}),
    mk('Zagros',{cat:'reg',perm:true,ic:['prod','eau'],t:'Vous POUVEZ réserver 1 carte.'}),DINS(),DINS()],
  nat:()=>[mk('Empire Mède',{cat:'vas',st:'B',t:'Gagnez 4 Matériaux. Archivez Empire Mède dans votre Histoire.'}),
    mk('Arachosie',{cat:'reg',perm:true,ic:['prod','eau'],t:'Vous POUVEZ archiver 1 carte de votre défausse dans votre Histoire. Vous POUVEZ réserver 1 carte.'}),
    mk('Plaine de Nisaean',{cat:'reg',perm:true,ic:['fert','fert'],t:'Vous POUVEZ réserver 1 carte.'}),DINS()],
  adv:()=>mk('Cité de Persépolis',{perm:true,ic:['ville'],adv:true,t:'Solstice : vous POUVEZ défausser 1 carte pour Choisir : gagnez 1 Population OU gagnez 1 Matériau OU piochez 1 carte.'}),
  dev:()=>[mk('Or des Perses',{st:'E',atk:true,vp:4,cost:{mat:7},t:'Tous les joueurs gagnent 2 Matériaux. Vous gagnez 1 Progrès. Chaque autre joueur récupère une Instabilités.'}),
    mk('Satrape',{st:'E',vp:3,cost:{mat:4,pop:2},t:'Action gratuite. Payez 3 Matériaux pour gagner 1 Action.'}),
    mk('Moulins à vent',{st:'E',perm:true,vp:2,cost:{mat:4},t:'Action gratuite. Épuiser : pour le reste du tour, considérez 1 icône Fertile comme 3 icônes Eau.'}),
    mk('Développement',{st:'E',vp:3,cost:{mat:4,pop:2},t:'Choisir : développez 1 carte OU payez 2 Matériaux pour acquérir une Tradition ou un Civilisé.'}),
    mk('Darius I',{st:'E',vt:'s',vp:5,vtx:'1 PV par Vassal',cost:{mat:3,pop:2},t:'Acquérez une Tradition, un Civilisé, une Région ou un Vassal. Archivez Darius I dans votre Histoire.'}),
    mk('Babyloniens',{cat:'vas',st:'E',vp:4,cost:{pop:5},t:'Action gratuite. Acquérez une Tradition, un Civilisé, une Région ou un Vassal. Archivez Babyloniens dans votre Histoire.'}),
    mk('Bélier',{st:'E',atk:true,vp:2,cost:{pop:4},t:'Chaque autre joueur abandonne une carte Ville. Vous POUVEZ innover en Région ou Vassal.'})]},
scy:{name:'Scythes',
  power:{n:'Scythes',vt:'s',vtx:'1 PV par 6 Population',t:'Épuiser : dépensez 1 Action et récupérez une Instabilités pour innover en Région.'},
  deck:()=>[...[0,1].map(()=>mk('Nomades',{st:'B',t:'Tous les joueurs PEUVENT piocher 1 carte. Gagnez 1 Matériau par icône Production que vous avez en jeu.'})),
    mk('Progrès',{st:'B',t:PROG}),mk('Conquête',{st:'B',t:CONQ}),
    mk('Archers montés',{perm:true,t:'Épuiser : vous POUVEZ épuiser cette carte pour éviter les effets d\'une Attaque jouée par un autre joueur (même au cours de son tour). Solstice : vous POUVEZ payer 1 Matériau pour gagner 1 Population.'}),
    mk('Tian Shan',{cat:'reg',st:'B',perm:true,t:'Gagnez 1 Population. Vous POUVEZ réserver 1 carte.'}),
    mk('Carpates',{cat:'reg',st:'B',perm:true,ic:['prod'],t:'Gagnez 1 Population. Vous POUVEZ réserver 1 carte.'}),
    mk('Tentes',{st:'B',perm:true,t:'Épuiser : quand vous jouez une Région, épuisez cette carte pour gagner 1 Population. Solstice : vous POUVEZ rappeler une Région.'}),DINS(),DINS(),DINS()],
  nat:()=>[mk('Tamga',{perm:true,vt:'s',vp:5,vtx:'1 PV par 2 Régions',t:'Épuiser : défaussez 1 carte pour piocher 2 cartes.'}),
    mk('Pillards',{st:'B',atk:true,t:'Action gratuite. Piochez 2 cartes. Tous les autres joueurs rappellent une Région. Volez 1 Population à chaque joueur qui est Empire.'}),
    mk('Steppe pontique',{cat:'reg',perm:true,ic:['prod','fert'],t:'Gagnez 1 Population. Vous POUVEZ réserver 1 carte.'}),
    mk('Bassin du Tarim',{cat:'reg',perm:true,ic:['prod','eau'],t:'Vous POUVEZ piocher 1 carte. Vous POUVEZ réserver 1 carte.'}),
    mk('Caucase',{cat:'reg',perm:true,ic:['prod'],t:'Gagnez 1 Population. Vous POUVEZ réserver 1 carte.'}),DINS(),DINS()],
  adv:()=>mk('Gloire',{adv:true,glory:true,t:GLOIRE}),
  dev:()=>[mk('Cité de Gélonos',{st:'E',perm:true,ic:['ville'],vp:2,cost:{pop:3},t:'Solstice : vous POUVEZ défausser 1 carte pour Choisir : gagnez 1 Population OU gagnez 1 Matériau OU piochez 1 carte.'}),
    mk('Kourganes',{st:'E',perm:true,vp:2,cost:{pop:3},t:'Passif : augmentez de 1 la taille de votre main. Épuiser : archivez 1 carte de votre défausse dans votre Histoire.'}),
    mk('Ateas',{st:'E',vp:3,cost:{pop:4},t:'Vous POUVEZ acquérir une Région. Vous POUVEZ renvoyer une Instabilités. Archivez Ateas dans votre Histoire.'}),
    mk('Joaillerie',{vp:7,nop:true,cost:{mat:7},t:'Cette carte ne peut pas être jouée, ni être réservée.'})]},
vik:{name:'Vikings',noEmp:true,noHist:true,
  power:{n:'Vikings',vt:'s',vtx:'1 PV par carte à étoile',t:'Passif : les cartes qui doivent être archivées dans votre Histoire sont défaussées. Quand vous récupérez une Instabilités, regardez la première carte de votre pioche Nation ; vous POUVEZ la placer au fond de la pioche Nation. Épuiser : quand vous renvoyez une Instabilités, épuisez Vikings pour piocher 2 cartes.'},
  deck:()=>[mk('Prospérité',{t:DPROSP}),mk('Gloire',{t:GLOIRE,glory:true}),mk('Progrès',{st:'B',t:PROG}),
    mk('Althing',{st:'B',atk:true,t:'Volez 1 Matériau à chaque autre joueur. Choisir : gagnez 1 Progrès OU renvoyez une Instabilités.'}),
    mk('Gothja',{st:'B',t:'Regardez la première carte de votre pioche Nation. Vous POUVEZ mélanger la pioche Nation et gagner 1 Population. Choisir : renvoyez une Instabilités OU piochez 2 cartes.'}),
    mk('Jomsviking',{st:'B',atk:true,t:'Payez 1 Population et 2 Matériaux pour acquérir une Région ou un Vassal. Chaque autre joueur défausse 1 carte.'}),
    mk('Erik le Rouge',{st:'B',t:'Abandonnez la Scandinavie et payez 1 Population pour trouver une Région que vous ajoutez à votre main. Exilez Erik le Rouge.'}),
    mk('Scandinavie',{cat:'reg',st:'B',perm:true,ic:['prod'],t:'Vous POUVEZ réserver 1 carte.'}),DINS()],
  nat:()=>[mk('Îles Féroé',{cat:'reg',st:'B',perm:true,t:'Vous POUVEZ réserver 1 carte. Choisir : exilez 1 carte du Marché OU gagnez 1 Population.'}),
    mk('Cité de Dubh Linn',{st:'B',perm:true,ic:['ville'],vt:'s',vp:5,vtx:'1 PV par 8 Matériaux',t:'Solstice : vous POUVEZ défausser 1 carte pour Choisir : gagnez 1 Population OU gagnez 1 Matériau OU piochez 1 carte.'}),
    mk('Groenland',{cat:'reg',st:'B',perm:true,t:'Vous POUVEZ réserver 1 carte. Choisir : gagnez 1 Population OU regardez la première carte de votre pioche Nation, puis vous POUVEZ mélanger la pioche Nation.'}),
    mk('Peignes',{st:'B',perm:true,vt:'s',vp:5,vtx:'1 PV par 3 Population',t:'Épuiser : ignorez l\'icône Empire sur la prochaine carte que vous jouez au cours de ce tour.'}),
    mk('Islande',{cat:'reg',st:'B',perm:true,ic:['prod'],t:'Vous POUVEZ réserver 1 carte. Choisir : gagnez 2 Matériaux OU regardez la première carte de votre pioche Nation, puis vous POUVEZ mélanger la pioche Nation.'}),
    mk('Raid viking',{st:'B',atk:true,t:'Action gratuite. Volez 2 Matériaux à chaque autre joueur. Les joueurs qui ne peuvent pas payer récupèrent une Instabilités.'}),
    mk('Skis',{st:'B',perm:true,vp:2,t:'Épuiser : quand vous jouez une Région, épuisez Skis pour Choisir : piochez 1 carte OU gagnez 2 Matériaux.'}),
    mk('Drakkars',{st:'B',perm:true,t:'Passif : vous POUVEZ acquérir des Régions exilées ; quand vous le faites, gagnez 1 Population. Épuiser : quand vous jouez une Attaque, épuisez Drakkars pour gagner 2 Matériaux.'}),
    mk('Rollon le Marcheur',{st:'B',t:'Piochez une Renommée. Exilez Rollon le Marcheur.'}),
    mk('Sagas',{st:'B',perm:true,vt:'s',vp:5,vtx:'1 PV par carte réservée ici',t:'Solstice : vous POUVEZ réserver 1 carte.'}),
    mk('Vinland',{cat:'reg',st:'B',perm:true,ic:['prod','eau','fert'],vt:'c',vp:6,vtx:'6 PV si en jeu',t:'Cette carte ne peut être jouée que si Drakkars ET Groenland sont en jeu. Choisir : renvoyez une Instabilités OU vous POUVEZ réserver 1 carte.'}),DINS(),DINS()],
  adv:()=>mk('Harald Hardrada',{st:'B',adv:true,zenith:true,vt:'s',vp:5,vtx:'2 PV par carte à étoile',t:'PLACER CETTE CARTE DANS LA DÉFAUSSE DÉCLENCHE LA FIN DE PARTIE. Piochez une Renommée. Vous POUVEZ innover en Région.'}),
  dev:()=>[]}};
/* --- Marché de démonstration (en attendant les cartes communes de la boîte) --- */
const DEMO=false;
function demoCommons(){const L=[],add=(n,cat,o)=>L.push(mk(n,Object.assign({cat,demo:true},o)));
  const R=[['prod'],['fert'],['riv'],['prod','fert'],['prod','riv'],['ocean'],['fert','riv'],['chasse'],['prod','ocean'],['fert'],['prod'],['riv','chasse'],['ocean','fert'],['prod','chasse']];
  R.forEach((ic,i)=>add('Région '+(i+1)+' (démo)','reg',{perm:true,ic,vp:i%3===0?1:0,t:i%2?'Gagnez 1 Matériau. Vous POUVEZ réserver 1 carte.':'Gagnez 1 Population. Vous POUVEZ réserver 1 carte.'}));
  const TT=[['Gagnez 2 Matériaux.',1],['Gagnez 2 Population.',1],['Piochez 2 cartes.',1],['Gagnez 1 Action. Piochez 1 carte.',2],['Épuiser : gagnez 1 Population.',2,{perm:true}],['Épuiser : gagnez 1 Matériau.',2,{perm:true}],['Gagnez 1 Progrès. Vous POUVEZ acquérir une Région.',2],['Renvoyez une Instabilités de votre main ou de votre défausse. Gagnez 1 Population.',1],['Acquérez une Région ou un Vassal.',2,{st:'B'}],['Innovez en Civilisé.',3,{st:'E'}],['Chaque autre joueur récupère une Instabilités. Gagnez 1 Matériau.',1,{atk:true}],['Passif : augmentez de 1 la taille de votre main.',3,{perm:true}]];
  for(let i=0;i<16;i++){const [t,vp,o]=TT[i%TT.length];add('Tradition '+(i+1)+' (démo)','tra',Object.assign({vp,t},o||{}))}
  const CC=[['Gagnez 2 Progrès.',2],['Piochez 3 cartes. Défaussez 1 carte.',3],['Épuiser : gagnez 1 Progrès.',3,{perm:true}],['Acquérez une Tradition ou un Civilisé.',3],['Archivez 1 carte de votre main dans votre Histoire. Gagnez 2 Matériaux.',2],['1 PV par Région que vous avez en jeu (10 max).',5,{vt:'s',vtx:'1 PV par Région en jeu'}]];
  for(let i=0;i<12;i++){const [t,vp,o]=CC[i%CC.length];add('Civilisé '+(i+1)+' (démo)','civ',Object.assign({vp,t,white:true},o||{}))}
  for(let i=0;i<10;i++)add('Vassal '+(i+1)+' (démo)','vas',{vp:3,t:i%2?'Gagnez 3 Population. Archivez cette carte dans votre Histoire.':'Gagnez 3 Matériaux. Archivez cette carte dans votre Histoire.'});
  const F=[];for(let i=0;i<8;i++)F.push(mk('Renommée '+(i+1)+' (démo)',{cat:'ren',demo:true,vp:6+i,t:'Aucun effet.'}));
  return {com:L,fame:F,kok:{A:'Gagnez 3 Progrès. (texte de démonstration)',B:'Gagnez 2 Progrès. (texte de démonstration)'},ins:12}}
/* --- Cartes communes réelles de la boîte Antique (d'après les photos) --- */
function realCommons(){const L=[],T=(n,o)=>L.push(mk(n,Object.assign({cat:'tra'},o))),R=(n,ic,t,o)=>L.push(mk(n,Object.assign({cat:'reg',perm:true,ic,t},o||{}))),C=(n,o)=>L.push(mk(n,Object.assign({cat:'civ',white:true},o))),V=(n,o)=>L.push(mk(n,Object.assign({cat:'vas'},o)));
  const EX='Exilez 1 carte du Marché. Vous POUVEZ réserver 1 carte.';
  // Traditions
  T('Diplomatie',{cat2:'civ',vp:1,t:'Payez 3 Matériaux pour innover en Vassal.'});
  for(let i=0;i<3;i++)T('Cité',{cat2:'civ',perm:true,ic:['ville'],vp:1,t:'Solstice : vous POUVEZ défausser 1 carte pour Choisir : gagnez 1 Population OU gagnez 1 Matériau OU piochez 1 carte.'});
  T('Chadouf',{perm:true,vt:'s',vp:5,vtx:'2 PV par icône Eau',t:'Épuiser : quand vous gagnez des Matériaux grâce à une carte Eau en jeu, épuisez cette carte pour gagner 1 Progrès.'});
  T('Jeu',{cat2:'civ',vp:1,t:'Action gratuite. Payez 1 Matériau et annoncez une catégorie : Tradition, Civilisé, Région ou Vassal. Révélez la première carte de la pioche Principale. Si elle correspond à la catégorie annoncée, ajoutez-la à votre main. Sinon exilez-la.'});
  for(let i=0;i<2;i++)T('Ville',{st:'B',perm:true,vt:'c',vp:2,vtx:'2 PV si dans votre Histoire',t:'Épuiser : tous les joueurs PEUVENT gagner 2 Matériaux. Solstice : vous POUVEZ gagner 2 Progrès. Si vous le faites, Choisir : abandonnez cette Ville OU archivez-la dans votre Histoire.'});
  T('Anciens',{vp:1,t:'Choisir : acquérez une Tradition OU innovez en Tradition et tous les autres joueurs gagnent 1 Progrès.'});
  T('Commandement',{cat2:'civ',vp:1,t:'Action gratuite. Choisir : piochez 1 carte OU archivez 1 carte de votre main ou de votre défausse dans votre Histoire.'});
  T('Sanctuaire',{st:'B',perm:true,vp:1,t:'Épuiser : payez 1 Matériau pour piocher 1 carte. Solstice : vous POUVEZ défausser 1 carte pour renvoyer une Instabilités de votre défausse.'});
  T('Invasion',{atk:true,vp:1,t:'Payez 3 Matériaux. Tous les autres joueurs récupèrent une Instabilités. Choisir : innovez en Vassal OU innovez en Région et chaque autre joueur rappelle une Région.'});
  T('Navires',{perm:true,vt:'s',vp:5,vtx:'1 PV par icône Eau et par icône Fertile',t:'Épuiser : rappelez une Région Eau pour gagner 2 Matériaux et 1 Population OU rappelez une Région Fertile pour gagner 1 Action.'});
  T('Agriculture',{perm:true,vt:'s',vp:5,vtx:'2 PV par icône Fertile',t:'Épuiser : pour le reste du tour, considérez 1 icône Fertile comme 3 icônes Eau.'});
  T('Masque de jade',{ic:['masque'],vt:'c',vp:1,vtx:'1 PV si dans votre Histoire',t:'Piochez jusqu\'à 3 cartes si possible. Puis placez 1 carte de votre main au-dessus de votre deck.'});
  T('Mysticisme',{perm:true,vp:1,t:'Épuiser : gagnez 1 Action. Solstice : Choisir : récupérez une Instabilités OU défaussez 2 cartes.'});
  T('Oracle',{st:'B',vt:'s',vp:5,vtx:'2 PV par Renommée',t:'Action gratuite. Piochez 2 cartes et défaussez l\'une d\'entre elles.'});
  T('Port',{cat2:'civ',perm:true,vp:1,t:'Épuiser : gagnez 1 Matériau par icône Eau dans votre zone de jeu. Vous POUVEZ payer 3 Matériaux pour récupérer 1 carte de votre défausse.'});
  // Régions
  R('Oasis',['prod','prod','eau'],EX);R('Steppe',['prod','prod','fert'],EX);R('Forêt',['prod','prod','fert'],EX);
  R('Rivière',['prod','prod','eau'],'Vous POUVEZ archiver 1 carte de votre défausse dans votre Histoire. '+EX);
  R('Plaine inondable',['prod','eau'],'Vous POUVEZ archiver 1 carte de votre défausse dans votre Histoire. '+EX);
  R('Collines',['prod','fert'],'Gagnez 1 Population. '+EX);R('Marais',['prod','eau'],'Gagnez 2 Matériaux. '+EX);
  R('Région boisée',['prod','fert'],'Vous POUVEZ récupérer 1 carte de votre défausse et la placer au-dessus de votre deck. '+EX);
  R('Cap',['prod','eau'],EX+' Passif : vous POUVEZ rappeler Cap pour éviter les effets d\'une Attaque.');
  R('Côte',['prod','fert'],'Piochez 1 carte. '+EX);
  R('Jungle',[],'Gagnez 1 Population. '+EX,{vp:1});R('Montagne',[],'Gagnez 3 Matériaux. '+EX,{vp:1});
  R('Voie sacrée',[],'Épuiser : vous POUVEZ regarder la première carte de votre pioche Nation. Puis vous POUVEZ abandonner Voie sacrée pour échanger cette carte avec une carte de votre main (jamais l\'Avènement).',{st:'B',vp:1});
  // Civilisés
  C('Monnaie',{perm:true,vp:2,t:'Épuiser : piochez 1 carte. Solstice : gagnez 2 Matériaux.'});
  C('Exportations',{atk:true,vt:'s',vp:5,vtx:'1 PV par 10 cartes',t:'Tous les joueurs gagnent 2 Matériaux. Donnez à chaque autre joueur 1 carte de votre main ou de votre défausse.'});
  C('Métropole',{perm:true,ic:['metro'],vp:2,t:'Solstice : Choisir : gagnez 1 Population OU gagnez 1 Matériau OU piochez 1 carte.'});
  C('Pharmacie',{perm:true,vp:2,t:'Solstice : Choisir : gagnez 1 Population OU payez 2 Population pour gagner 1 Progrès.'});
  C('Corruption',{atk:true,vp:2,t:'Tous les joueurs gagnent 2 Matériaux. Tous les autres joueurs récupèrent une Instabilités. Gagnez 1 Progrès.'});
  C('Onagre',{atk:true,vp:2,t:'Chaque autre joueur abandonne une carte Ville. Gagnez 2 Matériaux par carte Ville abandonnée. Vous POUVEZ acquérir une Région ou un Vassal.'});
  C('Éducation',{vp:2,t:'Action gratuite. Vous POUVEZ archiver 1 carte de votre main dans votre Histoire. Vous POUVEZ archiver 1 carte de votre défausse dans votre Histoire.'});
  C('Usuriers',{vt:'s',vp:5,vtx:'1 PV par 10 Matériaux',t:'Action gratuite. Payez 3 Matériaux pour gagner 1 Action.'});
  C('Temple',{perm:true,vt:'s',vp:5,vtx:'1 PV par 5 Progrès',t:'Épuiser : défaussez 1 carte pour gagner 1 Progrès. Solstice : renvoyez une Instabilités de votre défausse.'});
  C('Cataphractaire',{atk:true,ic:['chev'],vp:2,t:'Chaque autre joueur abandonne une Région. Vous POUVEZ acquérir une Région ou un Vassal. Vous POUVEZ réserver Cataphractaire sous une Région pour déclencher l\'effet de jeu de cette dernière.'});
  C('Développement urbain',{vt:'s',vp:5,vtx:'2 PV par icône Ville et par icône Métropole',t:'Gagnez 1 Matériau et 1 Population par icône Ville et par icône Métropole dans votre zone de jeu.'});
  C('Mercenaires',{vt:'s',vp:5,vtx:'1 PV par 4 Population',t:'Action gratuite. Payez 1 Population pour gagner 1 Action.'});
  // Vassaux (Olmèques 3+ et Maurya 4 écartés en solo)
  V('Arméniens',{vp:3,t:'Acquérez une Tradition. Archivez Arméniens dans votre Histoire.'});
  V('Sumériens',{vp:3,nop:true,t:'Cette carte ne peut pas être jouée. Renvoyez jusqu\'à 2 Instabilités avant le décompte des PV.'});
  V('Qin',{perm:true,vt:'s',vp:5,vtx:'1 PV par 3 cartes permanentes en jeu, Régions exceptées',t:'Passif : augmentez de 1 la taille de votre main.'});
  V('Assyriens',{vp:3,t:'Action gratuite. Gagnez 1 Population.'});
  V('Égyptiens',{vt:'s',vp:5,vtx:'1 PV par Civilisé',t:'Si vous êtes Barbare, placez la première carte de votre pioche Nation dans votre défausse. Si vous êtes Empire, développez 1 carte. Archivez Égyptiens dans votre Histoire.'});
  V('Hittites',{vp:3,t:'Innovez en Région. Archivez Hittites dans votre Histoire.'});
  V('Ioniens',{vp:3,t:'Action gratuite. Renvoyez jusqu\'à 2 Instabilités de votre main ou de la défausse. Archivez Ioniens dans votre Histoire.'});
  V('Minoens',{st:'B',vt:'s',vp:5,vtx:'1 PV tous les 4 Progrès',t:'Action gratuite. Placez 1 carte de votre main au-dessus de votre deck et gagnez 2 Progrès.'});
  V('Aksoumites',{vt:'s',vp:5,vtx:'1 PV par Vassal',t:'Gagnez 4 Matériaux.'});
  // Renommées
  const F=[],RN=(n,o)=>F.push(mk(n,Object.assign({cat:'ren'},o)));
  for(let i=0;i<2;i++)RN('Triomphe',{vp:11,nop:true,t:'Cette carte ne peut pas être jouée, ni être réservée.'});
  RN('Grandiose',{perm:true,vp:7,t:'Passif : augmentez de 1 la taille de votre main.'});
  RN('Magnificence',{vp:9,t:'Action gratuite. Piochez 1 carte si possible et Choisir : défaussez-la OU placez-la au-dessus de votre deck OU archivez-la dans votre Histoire.'});
  RN('Glorieux',{vp:6,t:'Action gratuite. Si vous êtes Barbare, piochez jusqu\'à 4 cartes. Si vous êtes Empire, développez 1 carte sans payer son coût. Archivez Glorieux dans votre Histoire.'});
  RN('Infamie',{atk:true,vt:'s',vp:5,vtx:'1 PV par Instabilités des autres joueurs',t:'Action gratuite. Volez 1 Progrès à chaque autre joueur. Les joueurs qui ne peuvent pas payer récupèrent une Instabilités.'});
  RN('Grandeur',{vt:'c',vp:6,vtx:'2 PV, ou 6 PV si dans votre Histoire',t:'Action gratuite. Gagnez 1 Action. Vous POUVEZ archiver Grandeur dans votre Histoire.'});
  RN('Éloges',{vt:'c',vp:7,vtx:'3 PV, ou 7 PV si dans votre Histoire',t:'Choisir : archivez Éloges dans votre Histoire OU innovez en Tradition, Civilisé, Région ou Vassal.'});
  return {com:L,fame:F,ins:8,
    kok:{A:'Résolue quand il n\'y a plus de Renommée à piocher ou regarder, puis retournée sur sa face B. CELA DÉCLENCHE LA FIN DE PARTIE. Barbare : gagnez 6 Progrès. Empire : gagnez 3 Progrès et développez 1 carte sans payer son coût.',
         B:'Résolvez-la et laissez-la en place ; plusieurs joueurs peuvent la résoudre. Barbare : gagnez 4 Progrès. Empire : développez 1 carte sans payer son coût.'}}}

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
  if(!M.main.length)trigger('la pioche Principale est vide');
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
  const i=marketPickBot(list);if(i<0){log(`Aucune carte ${cats(list)} au Marché.`);return null}
  const s=MK().slots[i],card=s.card;gain(s.tok);S.deck.unshift(card);if(TURN)(isAcq?TURN.took:TURN.found).push(card.n);
  let t=`La C.I.V. ${verb} ${cname(card)} (emplacement ${i+1}) : la carte va sur son deck.`;
  if(s.ins){if(isAcq){S.deck.unshift(INS());t+=' Elle prend aussi l\'Instabilité glissée dessous.'}else{MK().ins++;t+=' L\'Instabilité dessous retourne dans la pile.'}}
  log(t,'do');refill(i);return card};
fameCard=async function(to){if(!S.dig)return _fame(to);const M=MK();
  if(!M.fame.length)return kok();
  const f=M.fame.shift();if(TURN)TURN.fame=nice(f.n);
  if(to==='hist'){S.hist.push(f);log(`${cname(f)} est archivée dans l'Histoire de la C.I.V.`,'do')}else{S.deck.unshift(f);log(`${cname(f)} va sur le deck de la C.I.V.`,'do')}return true};
kok=async function(){if(!S.dig)return _kok();const K=MK().kok;if(K.bot){log('La C.I.V. a déjà résolu Roi des rois : rien ne se passe.');return false}
  K.bot=true;const was=K.side;const r=await _kok();if(was==='A'){K.side='B';trigger('Roi des rois (face A) est résolue')}return r};
getIns=async function(){if(!S.dig)return _getIns();if(takeIns()){S.deck.unshift(INS());log('La C.I.V. prend une Instabilité dans la pile.','do')}};
youDo=async function(k,o){if(!S.dig)return _you(k,o);const P=D();
  const prot=async t=>{const r=await ask(t,[['Je subis',1],['Annulé par une de mes cartes',0,'']],'Cet effet compte comme une Attaque : vos protections s\'appliquent.');if(!r){if(TURN)TURN.blocked++;log(t+' Annulé par votre protection.','you')}return r};
  const hit=t=>{if(TURN)TURN.hit.push(t)};
  if(k==='scy'){if(P.state!=='E'||!P.res.pop)return false;P.res.pop--;S.res.pop++;hit('une Population versée en tribut');log('Vous versez 1 '+chip('pop')+' à la C.I.V.','you');return true}
  if(k==='gain'){for(const r in o)P.res[r]+=o[r];log('Vous gagnez '+Object.entries(o).map(([r,n])=>n+' '+chip(r)).join(' et ')+'.','you');return true}
  if(k==='draw'){const r=await ask('Vous POUVEZ piocher 1 carte.',[['Piocher 1 carte',1],['Non merci',0,'']]);if(r){drawMe(1,false);log('Vous piochez 1 carte.','you')}renderDig();return true}
  if(k==='ins'){if(!await prot('La C.I.V. vous fait récupérer une Instabilités.'))return true;if(takeIns()){P.hand.push(DINS());hit(INSHIT);log('Une Instabilités arrive dans votre main.','you')}renderDig();return true}
  if(k==='disc'){if(!P.hand.length)return true;if(!await prot(`La C.I.V. vous fait défausser ${o} carte${o>1?'s':''}.`))return true;
    const sel=await pickCards(`Choisissez ${Math.min(o,P.hand.length)} carte${o>1?'s':''} à défausser.`,P.hand,Math.min(o,P.hand.length),Math.min(o,P.hand.length));
    sel.forEach(c=>moveCard(c,'disc'));hit(o>1?o+' cartes défaussées':'une carte défaussée');log('Vous défaussez '+sel.map(c=>c.n).join(', ')+'.','you');renderDig();return true}
  if(k==='aban'||k==='recall'||k==='recallperm'){const pool=P.play.filter(c=>k==='recallperm'?c.perm:c.cat==='reg');if(!pool.length)return true;
    const lab=k==='aban'?'abandonner':'rappeler dans votre main';if(!await prot(`La C.I.V. vous fait ${lab} une ${k==='recallperm'?'carte permanente':'Région'}.`))return true;
    const [x]=await pickCards(`Choisissez la carte à ${lab}.`,pool,1,1);
    if(k==='aban')abandonCard(x);else recallCard(x);hit(k==='aban'?'une Région abandonnée':k==='recall'?'une Région rappelée':'une carte permanente rappelée');renderDig();return true}
  return _you(k,o)};
run=async function(x,ctx){if(!S||!S.dig)return _run(x,ctx);const M=MK();
  if(x.t==='exile'){const i=M.slots.findIndex(s=>s&&!slotTok(s));if(i<0){log('Aucune carte du Marché ne peut être exilée.');return false}
    const s=M.slots[i];M.exile.push(s.card);if(s.ins)M.ins++;if(TURN)TURN.ex++;log(`La C.I.V. exile ${cname(s.card)} (emplacement ${i+1}).`,'do');refill(i);return true}
  if(x.t==='acqex'){const L=M.exile.filter(c=>c.cat===x.c).sort((a,b)=>b.vp-a.vp);if(!L.length)return false;const c0=L[0];M.exile.splice(M.exile.indexOf(c0),1);S.deck.unshift(c0);if(TURN)TURN.took.push(c0.n);log(`La C.I.V. reprend ${cname(c0)} dans la pile Exil.`,'do');return true}
  if(x.t==='inn'){if(await takeFromMarket('innove',[x.c],false))return true;const card=blindTake(x.c);
    if(!card){log('Aucune carte disponible : la C.I.V. gagne 2 Progrès à la place.');gain({prog:2});return true}
    S.deck.unshift(card);if(TURN)TURN.found.push(card.n);log(`La C.I.V. innove ${cname(card)} à l'aveugle : la carte va sur son deck.`,'do');return true}
  if(x.t==='steal'){const P=D(),got={mat:Math.min(x.mat||0,P.res.mat),prog:Math.min(x.prog||0,P.res.prog)};
    if(!got.mat&&!got.prog){log('Vous n\'avez rien à vous faire voler.','you');return false}
    const r=await ask('La C.I.V. vous vole '+['mat','prog'].filter(k=>got[k]).map(k=>got[k]+' '+chip(k)).join(' et ')+'.',[['Je subis',1],['Annulé par une de mes cartes',0,'']],'C\'est une Attaque.');
    if(!r){if(TURN)TURN.blocked++;return false}
    P.res.mat-=got.mat;P.res.prog-=got.prog;S.res.mat+=got.mat;S.res.prog+=got.prog;if(TURN)TURN.hit.push('un vol de '+et(['mat','prog'].filter(k=>got[k]).map(k=>qt(got[k],k))));log('La C.I.V. vous vole '+['mat','prog'].filter(k=>got[k]).map(k=>got[k]+' '+chip(k)).join(' et ')+'.','you');renderDig();return true}
  const r=await _run(x,ctx);if(x.t==='ret'&&r)M.ins++;return r};
resolve=async function(x,where){if(!S.dig||x.cat!=='ins')return _resolve(x,where);
  log(`${where} : ${x.n}`,'card');if(TURN)TURN.ret++;MK().ins++;log('Instabilité : elle retourne dans la pile commune.')};
todo=(t,k='do')=>{if(S&&S.dig){log(t,k);return Promise.resolve(true)}log(t,k);return ask(t,[['Fait',true]])};
playerTurn=function(keep){if(S&&S.dig)return digTurn();return _pt(keep)};
endGame=function(collapse){if(S&&S.dig)return digEnd(collapse);return _end(collapse)};
function blindTake(cat){const M=MK();
  if(cat!=='vas'&&M[cat]&&M[cat].length)return M[cat].shift();
  if(cat==='vas'){const u=['reg','tra','civ'].find(k=>M.under[k]&&!M[k].length);if(u){const v=M.under[u];M.under[u]=null;return v}}
  const i=M.main.findIndex(c=>c.cat===cat);if(i<0)return null;const card=M.main.splice(i,1)[0];M.main=shuffle(M.main);if(!M.main.length)trigger('la pioche Principale est vide');return card}
/* ---------- mes cartes ---------- */
const DZONES=['hand','disc','play','hist','deck'];
function findCard(id){const P=D();for(const z of DZONES){const i=P[z].findIndex(c=>c.id===id);if(i>=0)return [z,i]}
  for(const c of P.play){const j=(c.rs||[]).findIndex(r=>r.id===id);if(j>=0)return ['rs:'+c.id,j]}
  if(P.cur&&P.cur.id===id)return ['cur',0];return [null,-1]}
function detach(card){const P=D(),[z,i]=findCard(card.id);if(!z)return;
  if(z==='cur')P.cur=null;else if(z.startsWith('rs:')){const host=P.play.find(c=>c.id===z.slice(3));host.rs.splice(i,1)}else P[z].splice(i,1)}
function unlocked(c){const P=D(),has=n=>P.play.some(x=>x.n===n);
  if(c.st!=='B')return false;
  if(c.n==='Conquête'&&(has('Légions')||has('Cavalerie des Compagnons')||has('Chars')))return true;
  if(c.atk&&has('Chars'))return true;
  if(c.n==='Progrès'&&has('Science'))return true;return false}
function moveCard(card,to){if(to==='hist'&&MYNAT[D().nat].noHist){to='disc';log(`Les ${MYNAT[D().nat].name} n'ont pas d'Histoire : ${card.n} est défaussée.`)}detach(card);const P=D();
  if(card.tok){for(const r in card.tok)P.res[r]+=card.tok[r];card.tok=null}
  if(to==='disc'||to==='hist'||to==='hand'){(card.rs||[]).forEach(r=>{P[to==='hand'?'hand':to].push(r)});card.rs=[]}
  card.ex=false;
  if(to==='deck')P.deck.unshift(card);else P[to].push(card);
  if(to==='disc'&&card.adv)advDone(card)}
function advDone(x){const P=D(),N=MYNAT[P.nat];
  if(x.zenith){trigger(`votre Zénith, ${x.n}, rejoint votre défausse`);return}
  if(N.noEmp||P.state!=='B')return;P.state='E';log(`Votre Avènement, ${x.n}, rejoint votre défausse. <b>Vous voilà Empire</b> : vos cartes Empire deviennent jouables.`,'end')}
function abandonCard(c){moveCard(c,'disc');log(`${c.n} est abandonnée.`)}
function recallCard(c){moveCard(c,'hand');log(`${c.n} revient dans votre main.`)}
const handMax=()=>5+D().play.filter(c=>/augmentez de 1 la taille de votre main/i.test(c.t)).length;
function addOnShuffle(){const P=D();if(P.wit||P.exh<1)return false;
  if(P.natPile.length){const x=P.natPile.shift();P.disc.push(x);P.exh--;P.wit=true;log(`Mélangez : ${x.n} rejoint votre défausse depuis votre pioche Nation.`,'end');return true}
  if(P.adv){const x=P.adv;P.adv=null;P.exh--;P.wit=true;P.disc.push(x);log(`Mélangez : ${x.n} rejoint votre défausse.`);advDone(x);return true}
  return 'dev'}
async function drawMe(n,allowShuffle=true,inCleanup=false){const P=D();let k=0;
  while(k<n){if(!P.deck.length){if(!allowShuffle||!P.disc.length&&!P.natPile.length&&!P.adv)break;
      const a=addOnShuffle();
      if(a==='dev'&&P.dev.length&&!P.wit&&P.exh>0){const can=P.dev.filter(canPayCost);
        if(can.length){const ch=await ask('Votre pioche Nation est vide : vous POUVEZ développer une carte avant de mélanger.',[...can.map(c=>[`Développer ${c.n} (${costTxt(c.cost)})`,c.id]),['Ne rien développer','none','']]);
          if(ch!=='none'){const c=P.dev.find(x=>x.id===ch);payCost(c.cost);P.dev.splice(P.dev.indexOf(c),1);P.disc.push(c);P.exh--;P.wit=true;log(`Vous développez ${c.n}.`,'end');if(!P.dev.length)trigger('vous avez développé votre dernière carte')}}
        else log('Pioche Nation vide : vous ne pouvez payer aucun Développement.')}
      if(!P.disc.length)break;P.deck=shuffle(P.disc);P.disc=[];log('Vous mélangez votre défausse pour refaire votre deck.')}
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
     <div class="row" style="margin-top:10px"><button type="button" class="pri" id="pkok">Valider</button>${min===0?'<button type="button" id="pkno">Aucune</button>':''}<span class="hint" id="pkh" style="margin:0"></span></div>`;
    const upd=()=>{const n=sel.size;$('#pkok').disabled=n<min||n>max;$('#pkh').textContent=min===max?`${n} sur ${min}`:`${n} choisie${n>1?'s':''}`};
    p.querySelectorAll('.pk input').forEach(i=>i.onchange=()=>{i.checked?sel.add(i.value):sel.delete(i.value);if(max===1&&i.checked){p.querySelectorAll('.pk input').forEach(j=>{if(j!==i){j.checked=false;sel.delete(j.value)}})}upd()});
    $('#pkok').onclick=()=>{const out=list.filter(c=>sel.has(c.id));p.innerHTML='';res(out)};if($('#pkno'))$('#pkno').onclick=()=>{p.innerHTML='';res([])};upd();p.scrollIntoView({block:'nearest'})})}
/* ---------- rendu ---------- */
const BAN={reg:'var(--reg)',tra:'var(--tra)',civ:'var(--civ)',vas:'var(--vas)',ren:'var(--ren)',ins:'var(--ins)'};
const vpTxt=c=>c.vt==='s'?`<span class="vp star" title="${c.vtx||''}">★ ${c.vtx||'variable'}</span>`:c.vp?`<span class="vp">${c.vp} PV</span>`:'';
function tags(c){return [c.st==='B'?'<span class="tg b">Barbare</span>':'',c.st==='E'?'<span class="tg e">Empire</span>':'',c.perm?'<span class="tg">∞ reste en jeu</span>':'',c.atk?'<span class="tg a">Attaque</span>':'',...(c.ic||[]).map(i=>`<span class="tg i">${ICN[i]}</span>`)].join('')}
const tileMini=c=>`<b>${c.n}</b>${c.cat?' '+chip(c.cat):''}${c.cat2?' '+chip(c.cat2):''} ${tags(c)}`;
function tile(c,btns,extra=''){return `<div class="ct${c.ex?' ex':''}" data-id="${c.id}"><div class="cb" style="background:${BAN[c.cat]||'var(--muted)'}"><span>${c.n}</span>${c.cat?`<small>${CAT[c.cat]}${c.cat2?' · '+CAT[c.cat2]:''}</small>`:''}</div>
  <div class="cx"><div class="tgs">${tags(c)}</div><p>${c.t||''}</p>${c.cost?`<p class="cost">Coût de développement : ${costTxt(c.cost)}</p>`:''}${extra}<div class="cf">${vpTxt(c)}${c.ex?'<span class="tg">épuisée</span>':''}</div></div>${btns?`<div class="cbt">${btns}</div>`:''}</div>`}
const B=(a,l,id,dis,k='')=>`<button type="button" data-a="${a}" ${id?`data-id="${id}"`:''} ${dis?'disabled':''} class="${k}">${l}</button>`;
function renderMarket(){const M=MK(),K=M.kok;
  const pile=(l,n,x='')=>`<div class="pl"><b>${n}</b><span>${l}</span>${x}</div>`;
  $('#dg-market').innerHTML=`<div class="mkhead"><h2>Marché</h2></div>
   <div class="piles">${pile('Région',M.reg.length,M.under.reg?'<small>+ Vassal</small>':'')}${pile('Tradition',M.tra.length,M.under.tra?'<small>+ Vassal</small>':'')}${pile('Civilisé',M.civ.length,M.under.civ?'<small>+ Vassal</small>':'')}${pile('Principale',M.main.length)}${pile('Renommée',M.fame.length,`<small>Roi des rois ${K.down?'retournée':'face '+K.side}</small>`)}
    <div class="pl ins ${M.ins<=2?'crit':M.ins<=4?'low':''}"><b>${M.ins}</b><span>Instabilités</span></div><details class="pl"><summary><b>${M.exile.length}</b><span>Exil</span></summary>${M.exile.map(c=>`<div class="mini">${c.n}</div>`).join('')}</details></div>
   <div class="slots5">${M.slots.map((s,i)=>s?`<div class="slotw"><div class="slab">Emplacement ${i+1}</div>${tile(s.card,'',`${slotTok(s)?`<p class="tok">Sur la carte : ${['prog','mat','pop'].filter(r=>s.tok[r]).map(r=>s.tok[r]+' '+chip(r)).join(' ')}</p>`:''}${s.ins?'<p class="und">Instabilité dessous</p>':''}`)}</div>`:`<div class="slotw empty">Emplacement ${i+1} vide</div>`).join('')}</div>`}
function quick(c){const out=[],t=c.t||'';const g=/Gagnez (\d+) (Matériaux?|Population|Progrès)/g;let m;
  while((m=g.exec(t)))out.push(B('q-gain',`+${m[1]} ${m[2]}`,c.id+'|'+m[1]+'|'+(m[2].startsWith('Mat')?'mat':m[2]==='Population'?'pop':'prog')));
  const d=/Piochez (\d+) cartes?/.exec(t);if(d)out.push(B('q-draw',`Piocher ${d[1]}`,d[1]));
  if(/acqu[ée]rir|Acquérez/i.test(t))out.push(B('t-acq','Acquérir…'));
  if(/innover|Innovez/i.test(t))out.push(B('t-inn','Innover…'));
  if(c.glory)out.push(B('t-glory','Abandonner 3 Régions et regarder les Renommées',c.id));
  if(/Gagnez 1 Action/i.test(t))out.push(B('q-act','+1 Action'));
  if(/Exilez|exilez/.test(t))out.push(B('t-exile','Exiler…'));
  if(/Renvoyez|renvoyer une Instabilités/.test(t))out.push(B('t-retins','Renvoyer une Instabilités…'));
  if(/développez 1 carte sans payer/i.test(t))out.push(B('t-devfree','Développer gratuitement'));
  return out.join('')}
function renderMe(){const P=D(),act=P.phase==='act',sol=P.phase==='sol',on=act||sol,busy=DG.busy;
  const R=['mat','pop','prog'].map(r=>`<span class="rs">${chip(r)} <b>${P.res[r]}</b>${on?B('res-',`−`,r,busy,'sm')+B('res+','+',r,busy,'sm'):''}</span>`).join('');
  let ctrl='';
  if(P.phase==='order')ctrl=`<div class="q">Manche ${S.round} : choisissez votre ordre.</div><div class="row">${B('o-act','Activation',0,busy,'pri')}${B('o-rech','Recherche',0,busy)}${B('o-pac','Pacification',0,busy)}</div>`;
  else if(act)ctrl=`<div class="row">${B('end-act','Terminer mes actions → Nettoyage',0,busy||!!P.cur,'pri')}${B('undo','Annuler la dernière action',0,busy||!DG.undo.length,'undo')}</div>`;
  else if(sol)ctrl=`<div class="q">Solstice : appliquez les effets ci-dessous avec les outils, puis validez.</div><ul>${[...P.play,P.power].filter(c=>/Solstice/.test(c.t)).map(c=>`<li><b>${c.n}</b> : ${c.t.slice(c.t.indexOf('Solstice'))}</li>`).join('')||'<li>Aucun effet Solstice en jeu.</li>'}</ul><div class="row">${B('sol-done','Solstice résolu',0,busy,'pri')}${B('undo','Annuler la dernière action',0,busy||!DG.undo.length,'undo')}</div>`;
  const cur=P.cur?`<div class="curz"><h3>Carte en cours de résolution</h3>${tile(P.cur,quick(P.cur)+B('cur-disc','Terminé : défausser',0,busy,'pri')+B('cur-hist','Archiver dans l\'Histoire',0,busy)+B('cur-play','Laisser en jeu',0,busy))}<p class="hint">Appliquez le texte avec les boutons rapides ou les outils, puis terminez.</p></div>`:'';
  const hand=P.hand.map(c=>tile(c,act?B('play','Jouer',c.id,busy||!!P.cur,'pri')+B('playfree','Action gratuite',c.id,busy||!!P.cur,'sm')+B('disc','Défausser',c.id,busy,'sm')+`<details class="more"><summary>Plus</summary>${B('arch','Archiver',c.id,busy)}${B('top','Sur le deck',c.id,busy)}${B('reserve','Réserver sous…',c.id,busy)}${B('give','Donner à la C.I.V.',c.id,busy)}${c.cat==='ins'?B('retins','Renvoyer (effet)',c.id,busy):''}</details>`:'')).join('')||'<p class="muted">Main vide.</p>';
  const play=P.play.map(c=>tile(c,on?(/Épuiser/.test(c.t)&&act?B('exh','Épuiser',c.id,busy||c.ex||P.exh<1):'')+(c.cat==='reg'?B('aban','Abandonner',c.id,busy,'sm')+B('recall','Rappeler',c.id,busy,'sm'):'')+B('arch','Archiver',c.id,busy,'sm')+(c.perm&&c.cat!=='reg'?B('recall','Reprendre en main',c.id,busy,'sm'):''):'',(c.rs&&c.rs.length?`<p class="rsv">Réservées dessous : ${c.rs.map(r=>r.n).join(', ')}</p>`:'')+(c.tok&&(c.tok.mat+c.tok.pop+c.tok.prog)?`<p class="tok">Jetons : ${['mat','pop','prog'].filter(r=>c.tok[r]).map(r=>c.tok[r]+' '+chip(r)).join(' ')}</p>`:''))).join('')||'<p class="muted">Rien en jeu.</p>';
  const list=(z,lab,btn)=>`<details><summary>${lab} (${P[z].length})</summary><ul class="lib">${P[z].map(c=>`<li><span>${tileMini(c)}</span>${on&&btn?B(btn[0],btn[1],c.id,busy,'sm'):''}</li>`).join('')}</ul></details>`;
  const devs=P.dev.map(c=>tile(c,on?B('dev','Développer (effet)',c.id,busy||!canPayCost(c),'sm'):'')).join('');
  const T=(id,l)=>B(id,l,0,busy||!on,'sm');
  $('#dg-me').innerHTML=`<div class="mebar"><span class="pill">${MYNAT[P.nat].name} · ${P.state==='B'?'Barbare':'Empire'}</span><span class="tk">Actions <b>${P.act}</b></span><span class="tk">Épuisé <b>${P.exh}</b></span><span class="tk">Main max <b>${handMax()}</b></span>${R}${B('quit','Abandonner',0,busy,'sm quit')}</div>
   <div class="ctrl">${ctrl}</div>${cur}
   <h3>Ma main</h3><div class="cards">${hand}</div>
   <h3>Ma zone de jeu</h3><div class="cards">${tile(P.power,on&&/Épuiser/.test(P.power.t)&&act?B('pexh','Épuiser',0,busy||P.pex||P.exh<1):'')}${play}</div>
   <details class="tools" ${on?'open':''}><summary>Boîte à outils</summary>
    <div class="tg2"><div><h4>Cartes</h4>${T('t-draw','Piocher 1')}${T('t-drawp','Piocher 1, si possible')}${T('q-act','Gagner 1 Action')}${T('t-getins','Récupérer une Instabilités')}${T('t-find','Trouver une carte')}${T('t-fame','Gagner une Renommée')}${T('t-glory','Regarder la pioche Renommée')}</div>
     <div><h4>Marché</h4>${T('t-acq','Acquérir…')}${T('t-inn','Innover…')}${T('t-exile','Exiler…')}${T('t-addprog','Ajouter 1 Progrès sur une carte')}</div>
     <div><h4>Contre la C.I.V.</h4>${T('b-ins','Elle récupère une Instabilités')}${T('b-aban','Elle abandonne une Région')}${T('b-recall','Elle rappelle une Région')}${T('b-draw','Elle pioche 1 carte')}${T('b-steal-mat','Lui voler 1 Matériau')}${T('b-steal-prog','Lui voler 1 Progrès')}<p class="hint">« Défausser » est sans effet sur la C.I.V.</p></div></div></details>
   <div class="piles2"><div class="pl"><b>${P.deck.length}</b><span>Deck</span></div><div class="pl"><b>${P.natPile.length}${P.adv?' + 1':''}</b><span>Pioche Nation${P.adv?' + Avènement':''}</span></div></div>
   ${list('disc','Ma défausse',['tohand','Reprendre en main'])}${list('hist','Mon Histoire',null)}
   <details><summary>Mes Développements (${P.dev.length})</summary><div class="cards">${devs||'<p class="muted">Tous développés.</p>'}</div></details>`}
function renderDig(){if(!S||!S.dig)return;renderMarket();renderMe();board()}
/* ---------- montage de l'écran ---------- */
const DG={busy:false,undo:[]};
function digMount(){const T=$('#tab-solo');if(T.classList.contains('dig'))return;T.classList.add('dig');
  const sec=$('#tab-solo section.panel');
  let m=$('#dg-market');if(!m){m=document.createElement('div');m.id='dg-market';m.className='panel';T.insertBefore(m,$('#tab-solo .wrap'))}
  let me=$('#dg-me');if(!me){me=document.createElement('div');me.id='dg-me';sec.insertBefore(me,$('#log'));me.addEventListener('click',onAct)}
  let lg=$('#dg-log');if(!lg){lg=document.createElement('details');lg.id='dg-log';lg.open=true;lg.innerHTML='<summary>Journal</summary>';sec.append(lg)}
  lg.append($('#log'))}
function digUnmount(){const T=$('#tab-solo');if(!T.classList.contains('dig'))return;T.classList.remove('dig');
  const sec=$('#tab-solo section.panel');sec.insertBefore($('#log'),$('#prompt'));['#dg-market','#dg-me','#dg-log'].forEach(s=>{const e=$(s);if(e)e.remove()})}
const snap=()=>{DG.undo.push(JSON.stringify(S));if(DG.undo.length>40)DG.undo.shift()};
/* ---------- actions du joueur ---------- */
async function onAct(e){const b=e.target.closest('[data-a]');if(!b||b.disabled||DG.busy)return;const a=b.dataset.a,id=b.dataset.id,P=D();
  if(a==='undo'){S=JSON.parse(DG.undo.pop());renderDig();return}
  if(a==='quit'){DG.busy=true;const ok=await ask('Abandonner cette partie numérique ? Elle ne sera pas enregistrée.',[['Oui, abandonner',1,'warn'],['Non, continuer',0]]);DG.busy=false;if(ok){drop();digUnmount();S=null;return start()}renderDig();return}
  DG.busy=true;snap();renderMe();
  try{await doAct(a,id,P)}finally{DG.busy=false}
  if(D().collapse)return digEnd(true);
  save();renderDig()}
const cardBy=id=>{const P=D();for(const z of ['hand','play','disc','hist'])for(const c of P[z]){if(c.id===id)return c}return P.cur&&P.cur.id===id?P.cur:P.dev.find(c=>c.id===id)};
async function doAct(a,id,P){const c=id?cardBy(id):null;
  switch(a){
  case'o-act':P.phase='act';log(`Manche ${S.round} : vous choisissez l'Activation.`);return;
  case'o-rech':{log(`Manche ${S.round} : vous choisissez la Recherche. Vous défaussez votre main.`);P.hand.slice().forEach(x=>moveCard(x,'disc'));
    const cat=await ask('Recherche : dans quelle catégorie innovez-vous ?',[['Région','reg'],['Tradition','tra'],['Civilisé','civ'],['Vassal','vas']]);await innoverMe([cat]);return cleanup()}
  case'o-pac':{const ins=P.hand.filter(x=>x.cat==='ins');log(`Manche ${S.round} : vous choisissez la Pacification.`);
    if(ins.length){const sel=await pickCards('Pacification : quelles Instabilités renvoyez-vous dans la pile ?',ins,0,ins.length);sel.forEach(x=>{detach(x);MK().ins++});log(`Vous renvoyez ${sel.length} Instabilité${sel.length>1?'s':''}.`)}
    return cleanup()}
  case'end-act':return cleanup();
  case'sol-done':return afterSolstice();
  case'res+':P.res[id]++;return;case'res-':if(P.res[id]>0)P.res[id]--;return;
  case'q-gain':{const [,n,r]=id.split('|');P.res[r]+=+n;log(`Vous gagnez ${n} ${chip(r)}.`);return}
  case'q-draw':await drawMe(+id);log(`Vous piochez ${id} carte${+id>1?'s':''}.`);return;
  case'q-act':P.act++;log('Vous gagnez 1 Action.');return;
  case'play':case'playfree':{const free=a==='playfree';
    if(c.st&&c.st!==P.state&&!unlocked(c)){const ok=await ask(`${c.n} porte l'icône ${c.st==='B'?'Barbare':'Empire'} : vous ne pouvez pas la jouer de votre main en étant ${P.state==='B'?'Barbare':'Empire'}.`,[['Compris',0],['Une de mes cartes l\'autorise',1,'']],'Par exemple Peignes, qui fait ignorer l\'icône Empire.');if(!ok){DG.undo.pop();return}}
    if(c.nop){await ask(`${c.n} ne peut pas être jouée.`,[['Compris',1]]);DG.undo.pop();return}
    if(!free&&P.act<1){await ask('Vous n\'avez plus de jeton Action. Seule une Action gratuite reste possible.',[['Compris',1]]);DG.undo.pop();return}
    if(free){if(P.free.includes(c.id)){await ask('Une même carte ne se joue qu\'une fois par tour en Action gratuite.',[['Compris',1]]);DG.undo.pop();return}P.free.push(c.id)}else P.act--;
    if(c.cat==='ins'){const opts=[];if(P.res.pop+P.res.prog>=1)opts.push(['Payer 1 Population','pop']);if(P.res.mat+2*P.res.prog>=3)opts.push(['Payer 3 Matériaux','mat']);if(P.hand.length>=3)opts.push(['Défausser 2 autres cartes','disc']);opts.push(['Annuler','no','']);
      const ch=await ask('Instabilités : comment payez-vous son renvoi ?',opts);
      if(ch==='no'){if(free)P.free.pop();else P.act++;return}
      if(ch==='pop')payCost({pop:1});else if(ch==='mat')payCost({mat:3});else{const sel=await pickCards('Choisissez 2 cartes à défausser.',P.hand.filter(x=>x!==c),2,2);sel.forEach(x=>moveCard(x,'disc'))}
      detach(c);MK().ins++;log('Vous renvoyez une Instabilités dans la pile.');return}
    detach(c);log(`Vous jouez ${c.n}${free?' en Action gratuite':''}.`);
    if(c.cat==='reg'){c.ex=false;P.play.push(c);await regionEffects(c);return}
    if(c.perm){c.ex=false;P.play.push(c);return}
    P.cur=c;return}
  case'cur-disc':moveTo(P.cur,'disc');P.cur=null;return;
  case'cur-hist':{const x=P.cur;if(x){P.cur=null;if(MYNAT[P.nat].noHist){P.disc.push(x);log(`${x.n} est défaussée (pas d'Histoire).`)}else{P.hist.push(x);log(`${x.n} est archivée dans votre Histoire.`)}}return}
  case'cur-play':{const x=P.cur;P.cur=null;P.play.push(x);return}
  case'disc':moveCard(c,'disc');log(`Vous défaussez ${c.n}.`);return;
  case'arch':moveCard(c,'hist');log(`${c.n} est archivée dans votre Histoire.`);return;
  case'top':moveCard(c,'deck');log(`${c.n} est placée sur votre deck.`);return;
  case'tohand':moveCard(c,'hand');log(`${c.n} revient dans votre main.`);return;
  case'retins':detach(c);MK().ins++;log('Vous renvoyez une Instabilités dans la pile (effet de carte).');return;
  case'reserve':{const hosts=P.play.filter(x=>x.id!==c.id);if(!hosts.length){await ask('Aucune carte en jeu pour la réserver dessous.',[['Compris',1]]);return}
    const [h]=await pickCards(`Sous quelle carte réservez-vous ${c.n} ?`,hosts,1,1);detach(c);(h.rs=h.rs||[]).push(c);log(`${c.n} est réservée sous ${h.n}.`);return}
  case'give':detach(c);S.deck.unshift(c);log(`Vous donnez ${c.n} à la C.I.V. : la carte va sur son deck.`);return;
  case'exh':P.exh--;c.ex=true;log(`Vous épuisez ${c.n}.`);await ask(`${c.n} — ${c.t.slice(c.t.indexOf('Épuiser'))}`,[['Appliquer avec les outils',1]],'Utilisez les boutons rapides ou la boîte à outils pour appliquer l\'effet.');return;
  case'pexh':P.exh--;P.pex=true;log('Vous épuisez votre carte Puissance.');return;
  case'aban':abandonCard(c);return;
  case'recall':recallCard(c);return;
  case'dev':{payCost(c.cost);P.dev.splice(P.dev.indexOf(c),1);P.disc.push(c);log(`Vous développez ${c.n}.`,'end');if(!P.dev.length)trigger('vous avez développé votre dernière carte');return}
  case't-draw':await drawMe(1);log('Vous piochez 1 carte.');return;
  case't-drawp':{const n=await drawMe(1,false);log(n?'Vous piochez 1 carte.':'Votre deck est vide : vous ne piochez pas.');return}
  case't-devfree':return devFree();
  case't-retins':{const pool=[...P.hand,...P.disc].filter(x=>x.cat==='ins');if(!pool.length){await ask('Aucune Instabilités dans votre main ni votre défausse.',[['Compris',1]]);return}
    const sel=await pickCards('Quelles Instabilités renvoyez-vous dans la pile ?',pool,0,pool.length);sel.forEach(x=>{detach(x);MK().ins++});log(`Vous renvoyez ${sel.length} Instabilités.`);return}
  case't-getins':if(takeIns()){P.hand.push(DINS());log('Vous récupérez une Instabilités.')}return;
  case't-find':{const pool=[...P.hand,...P.disc,...P.deck,...P.natPile];const [x]=await pickCards('Trouver : quelle carte cherchez-vous ? (main, défausse, deck, pioche Nation)',pool,0,1);if(!x)return;
    const ni=P.natPile.indexOf(x);if(ni>=0){P.natPile.splice(ni,1);P.natPile=shuffle(P.natPile);P.hand.push(x)}else{const fromDeck=P.deck.includes(x);moveCard(x,'hand');if(fromDeck)P.deck=shuffle(P.deck)}log(`Vous trouvez ${x.n}.`);return}
  case't-fame':return gainFame();
  case't-glory':return glory(c&&c.glory);
  case't-acq':return acquireMe();
  case't-inn':{const cat=await ask('Innover : quelle catégorie ?',[['Région','reg'],['Tradition','tra'],['Civilisé','civ'],['Vassal','vas'],['Annuler','no','']]);if(cat!=='no')await innoverMe([cat]);return}
  case't-exile':{const M=MK(),ok=M.slots.map((s,i)=>s&&!slotTok(s)?[`${i+1} · ${s.card.n}`,i]:null).filter(Boolean);if(!ok.length){await ask('Toutes les cartes du Marché portent des jetons : aucune ne peut être exilée.',[['Compris',1]]);return}
    const i=await ask('Quelle carte du Marché exilez-vous ?',[...ok,['Annuler','no','']]);if(i==='no')return;const s=M.slots[i];M.exile.push(s.card);if(s.ins)M.ins++;log(`Vous exilez ${s.card.n}.`);refill(i);return}
  case't-addprog':{const M=MK(),i=await ask('Sur quelle carte du Marché posez-vous 1 Progrès du stock ?',M.slots.map((s,i)=>s?[`${i+1} · ${s.card.n}`,i]:null).filter(Boolean));M.slots[i].tok.prog++;return}
  case'b-ins':if(takeIns()){S.deck.unshift(INS());log('La C.I.V. récupère une Instabilités : elle va sur son deck.')}return;
  case'b-aban':if(S.play.length){const r=S.play.pop();toDiscard(r);log(`La C.I.V. abandonne ${r.n}.`)}else log('La C.I.V. n\'a aucune Région en jeu.');return;
  case'b-recall':if(S.play.length){const r=S.play.pop();S.deck.unshift(r);log(`La C.I.V. rappelle ${r.n} sur son deck.`)}else log('La C.I.V. n\'a aucune Région en jeu.');return;
  case'b-draw':millN(1);return;
  case'b-steal-mat':case'b-steal-prog':{const r=a.endsWith('mat')?'mat':'prog';if(S.res[r]>0){S.res[r]--;P.res[r]++;log(`Vous volez 1 ${chip(r)} à la C.I.V.`)}else log('Elle n\'en a pas.');return}
  }}
function moveTo(x,z){if(!x)return;const P=D();P.cur=null;P[z].push(x);if(z==='disc'&&x.adv)advDone(x)}
async function regionEffects(c){const P=D(),M=MK();if(/^Épuiser/.test(c.t))return;const g=/Gagnez (\d+) (Matériaux?|Population|Progrès)/.exec(c.t);
  if(g){const r=g[2].startsWith('Mat')?'mat':g[2]==='Population'?'pop':'prog';P.res[r]+=+g[1];log(`${c.n} : vous gagnez ${g[1]} ${chip(r)}.`)}
  if(/Piochez 1 carte/.test(c.t)){await drawMe(1);log(`${c.n} : vous piochez 1 carte.`)}
  if(/archiver 1 carte de votre défausse/.test(c.t)&&P.disc.length){const s=await pickCards(`${c.n} : vous POUVEZ archiver 1 carte de votre défausse dans votre Histoire.`,P.disc,0,1);if(s[0]){moveCard(s[0],'hist');log(`${s[0].n} est archivée dans votre Histoire.`)}}
  if(/récupérer 1 carte de votre défausse et la placer au-dessus/.test(c.t)&&P.disc.length){const s=await pickCards(`${c.n} : vous POUVEZ placer 1 carte de votre défausse sur votre deck.`,P.disc,0,1);if(s[0]){moveCard(s[0],'deck');log(`${s[0].n} est placée sur votre deck.`)}}
  if(/Exilez 1 carte du Marché/.test(c.t)){const ok=M.slots.map((s,i)=>s&&!slotTok(s)?[`${i+1} · ${s.card.n}`,i]:null).filter(Boolean);
    if(ok.length){const i=await ask(`${c.n} : exilez 1 carte du Marché (obligatoire). Une carte portant des jetons ne peut pas être exilée.`,ok);const s=M.slots[i];M.exile.push(s.card);if(s.ins)M.ins++;log(`Vous exilez ${s.card.n}.`);refill(i)}
    else log('Toutes les cartes du Marché portent des jetons : rien à exiler.')}
  if(/réserver 1 carte/.test(c.t)&&P.hand.length){const sel=await pickCards(`${c.n} : vous POUVEZ réserver 1 carte de votre main dessous.`,P.hand,0,1);if(sel[0]){detach(sel[0]);(c.rs=c.rs||[]).push(sel[0]);log(`${sel[0].n} est réservée sous ${c.n}.`)}}}
async function acquireMe(){const P=D(),M=MK();const opts=M.slots.map((s,i)=>s?[`${i+1} · ${s.card.n} (${CAT[s.card.cat]||'—'}${s.card.cat2?' / '+CAT[s.card.cat2]:''})${s.ins?' + Instabilité':''}`,i]:null).filter(Boolean);
  const ex=M.exile.length?[['Dans la pile Exil…','ex','']]:[];
  const i=await ask('Acquérir : quelle carte prenez-vous ? Respectez les catégories indiquées sur votre carte.',[...opts,...ex,['Annuler','no','']]);
  if(i==='no')return;
  if(i==='ex'){const [x]=await pickCards('Quelle carte prenez-vous dans la pile Exil ?',M.exile,1,1);M.exile.splice(M.exile.indexOf(x),1);P.hand.push(x);log(`Vous acquérez ${x.n} dans la pile Exil.`);if(x.cat!=='reg'&&takeIns()){P.hand.push(DINS());log('Vous récupérez aussi une Instabilités.')}return}
  const s=M.slots[i];for(const r in s.tok)P.res[r]+=s.tok[r];P.hand.push(s.card);let t=`Vous acquérez ${s.card.n}`;if(slotTok(s))t+=` et ses jetons`;
  if(s.ins){P.hand.push(DINS());t+=', avec l\'Instabilité glissée dessous'}log(t+'.');refill(i)}
async function innoverMe(cats){const P=D(),M=MK(),cat=cats[0];
  const opts=M.slots.map((s,i)=>s&&(s.card.cat===cat||s.card.cat2===cat)?[`Marché ${i+1} · ${s.card.n}`,i]:null).filter(Boolean);
  const blind=cat==='vas'?'Fouiller la pioche Principale (ou un Vassal visible)':`Prendre la 1re carte de la pioche ${CAT[cat]}`;
  const ch=await ask(`Innover en ${chip(cat)} : choisissez.`,[...opts,[blind,'blind',opts.length?'':'pri']]);
  if(ch==='blind'){const card=blindTake(cat);if(!card){P.res.prog+=2;log('Aucune carte de cette catégorie : vous gagnez 2 Progrès.');return}P.hand.push(card);log(`Vous innovez : ${card.n} arrive dans votre main.`);return}
  const s=M.slots[ch];for(const r in s.tok)P.res[r]+=s.tok[r];P.hand.push(s.card);if(s.ins)M.ins++;log(`Vous innovez ${s.card.n}${s.ins?' : son Instabilité retourne dans la pile':''}.`);refill(ch)}
async function gainFame(){const P=D(),M=MK();if(M.fame.length){const f=M.fame.shift();P.hand.push(f);log(`Vous gagnez ${f.n}.`);return}return kokMe()}
async function kokMe(){const P=D(),K=MK().kok;if(K.me){await ask('Vous avez déjà résolu Roi des rois : rien ne se passe.',[['Compris',1]]);return}
  K.me=true;const side=K.side;await ask(`<b>Roi des rois, face ${side}</b> : ${K.txt[side]}`,[['Résoudre',1]],'Chaque joueur ne résout Roi des rois qu\'une fois par partie.');
  if(P.state==='B'){const n=side==='A'?6:4;P.res.prog+=n;log(`Roi des rois (face ${side}) : vous gagnez ${n} ${chip('prog')}.`,'end')}
  else{if(side==='A'){P.res.prog+=3;log('Roi des rois (face A) : vous gagnez 3 '+chip('prog')+'.','end')}await devFree()}
  if(side==='A'){K.side='B';trigger('vous avez résolu Roi des rois (face A)')}}
async function devFree(){const P=D();if(!P.dev.length){log('Plus aucune carte à développer.');return}
  const [c]=await pickCards('Développez 1 carte sans payer son coût.',P.dev,1,1);P.dev.splice(P.dev.indexOf(c),1);P.disc.push(c);log(`Vous développez ${c.n} gratuitement.`,'end');if(!P.dev.length)trigger('vous avez développé votre dernière carte')}
async function glory(fromCard){const P=D(),M=MK();
  if(fromCard){const regs=P.play.filter(x=>x.cat==='reg');if(regs.length<3){await ask('Il vous faut 3 Régions en jeu pour jouer Gloire.',[['Compris',1]]);return}
    const sel=await pickCards('Choisissez les 3 Régions à abandonner.',regs,3,3);sel.forEach(abandonCard)}
  let n=2;if(P.nat==='rom'&&M.fame.length){n++;P.res.prog++;log('Pouvoir des Romains : vous regardez 1 carte de plus et gagnes 1 '+chip('prog')+'.','end')}
  if(!M.fame.length)return kokMe();
  const look=M.fame.slice(0,n);const [keep]=await pickCards(`Vous regardez ${look.length} carte${look.length>1?'s':''} Renommée. Laquelle gardez-vous ?`,look,1,1);
  M.fame.splice(M.fame.indexOf(keep),1);P.hand.push(keep);log(`Vous gardez ${keep.n} ; les autres retournent sur la pioche Renommée.`,'end')}
/* ---------- déroulement ---------- */
async function cleanup(){const P=D();P.phase='clean';P.cur=null;renderDig();
  const M=MK(),opts=M.slots.map((s,i)=>s?[`${i+1} · ${s.card.n}`,i]:null).filter(Boolean);
  const car=P.nat==='car';const i=await ask(car?'Nettoyage, étape 1 (pouvoir carthaginois) : sur quelle carte du Marché posez-vous 2 Matériaux du stock ?':'Nettoyage, étape 1 : sur quelle carte du Marché posez-vous 1 Progrès du stock ?',opts);if(M.slots[i]){if(car)M.slots[i].tok.mat+=2;else M.slots[i].tok.prog++}
  P.act=3;P.exh=5;P.wit=false;P.pex=false;P.free=[];P.play.forEach(c=>c.ex=false);
  if(P.hand.length){const sel=await pickCards('Nettoyage, étape 3 : quelles cartes défaussez-vous ?',P.hand,0,P.hand.length);sel.forEach(c=>moveCard(c,'disc'))}
  const need=handMax()-P.hand.length;if(need>0)await drawMe(need,true,true);
  log(`Fin de votre tour : votre main compte ${P.hand.length} cartes.`);P.phase='bot';save();renderDig();
  if(P.collapse)return digEnd(true);
  await botTurnDig()}
async function botTurnDig(){REC=null;TURN=newTurn();$('#title').textContent=`Manche ${S.round} : tour de la C.I.V.`;
  const die=1+rnd(6);S.skip=die<=S.n?die:0;
  log(`Tour de la C.I.V. · dé : <b>${die}</b>. `+(S.skip?`La carte de l'emplacement ${die} ne sera pas résolue.`:'Toutes ses cartes sont résolues.'),'card');
  for(let i=1;i<=S.n;i++){if(i===S.skip||!S.slots[i])continue;const x=S.slots[i];S.slots[i]=null;await resolve(x,'Emplacement '+i);renderDig();if(D().collapse)return digEnd(true)}
  if(S.skip&&S.skip<=5){const s=MK().slots[S.skip-1];if(s){if(S.nat==='car')s.tok.mat+=2;else s.tok.prog++;log(`La C.I.V. pose ${S.nat==='car'?'2 Matériaux':'1 Progrès'} sur ${s.card.n}.`)}}
  if(S.skip>1){S.slots[1]=S.slots[S.skip];S.slots[S.skip]=null}
  S.skip=0;for(let i=1;i<=S.n;i++)if(!S.slots[i])S.slots[i]=drawForSlot();
  if(S.diff===1&&S.deck.length){const x=S.deck.shift();toDiscard(x)}
  const st=story();TURN=null;log(st,'story');
  const P=D();P.phase='sol';DG.undo=[];save();renderDig();
  $('#title').textContent=`Manche ${S.round} : Solstice`;
  $('#prompt').innerHTML=`<div class="story">${st}</div>`}
function afterSolstice(){const P=D();$('#prompt').innerHTML='';
  if(S.trig!=null&&S.round>S.trig)return digEnd(false);
  S.round++;P.phase='order';DG.undo=[];digTurn()}
function digTurn(){digMount();const P=D();if(P.phase==='bot'){renderDig();return botTurnDig()}if(P.phase==='clean')P.phase='act';
  $('#title').textContent=`Manche ${S.round} : votre tour`+(S.trig!=null?(S.round>S.trig?' (dernière manche)':' (Décompte déclenché)'):'');
  LOG=[];drawLog();save();renderDig()}
async function digStart(botNat,diff,me){digNew(botNat,diff,me);digMount();LOG=[];
  log(`Nouvelle partie numérique : vos ${MYNAT[me].name} contre la C.I.V. ${NAT[botNat].name} (${DIFF[diff][0]}). Vous commencez.`,'end');
  digTurn()}
async function digEnd(collapse){const P=D();P.phase='end';renderDig();drop();
  if(collapse){LOG=[];log('<b>Effondrement</b> : la pile d\'Instabilités est vide. En solo, la partie est perdue.','you');return finishDig(null,botScore(),true)}
  const all=[...P.hand,...P.play,...P.play.flatMap(c=>c.rs||[]),...P.deck,...P.disc,...P.hist,...(P.cur?[P.cur]:[])];
  let me=all.filter(c=>c.vt!=='s'&&c.vt!=='c').reduce((a,c)=>a+(c.vp||0),0)+P.res.prog;
  const vars=[...all.filter(c=>c.vt==='s'||c.vt==='c'),P.power];
  if(vars.length&&!window.AUTO){me+=await new Promise(res=>{const p=$('#prompt');
    p.innerHTML=`<div class="q">Fin de partie : indiquez la valeur de vos cartes à points variables.</div><div class="form">${vars.map((c,i)=>`<label class="f" for="vv${i}">${c.n} : ${c.vtx||c.t} (10 au plus)<input type="number" id="vv${i}" min="0" max="10" value="0"></label>`).join('')}</div><div class="row" style="margin-top:10px"><button type="button" class="pri" id="vvok">Valider</button></div>`;
    $('#vvok').onclick=()=>{let t=0;vars.forEach((_,i)=>t+=Math.min(10,Math.max(0,+$('#vv'+i).value||0)));p.innerHTML='';res(t)}})}
  LOG=[];const sc=botScore();log(`Votre score : <span class="big">${me}</span> points (cartes, ${P.res.prog} Progrès en réserve). C.I.V. : <span class="big">${sc.total}</span> points.`,'end');
  finishDig(me,sc,false)}
function finishDig(me,sc,collapse){const win=!collapse&&me>sc.total;
  log(collapse?'Défaite.':win?`<b>Victoire</b> : ${me} à ${sc.total}.`:`La C.I.V. l'emporte ${sc.total} à ${me}.`,win?'end':'you');
  META.hist.unshift({d:new Date().toLocaleDateString('fr-FR'),bot:NAT[S.nat].name,lvl:S.diffName+' (numérique)',me,civ:sc.total,res:collapse?'Effondrement':win?'Victoire':'Défaite',mode:'dig'});META.hist=META.hist.slice(0,50);saveMeta();
  const p=$('#prompt');p.innerHTML='<div class="row"><button type="button" class="pri" id="again">Nouvelle partie</button></div>';$('#again').onclick=()=>{digUnmount();S=null;start()}}
window.IMP_DIG={digMount,digNew,digStart,doAct:(a,id)=>doAct(a,id,D()),cleanup,get D(){return S&&S.D},get M(){return S&&S.M},render:renderDig};

async function start(){
  digUnmount();S=null;TR=null;LOG=[];REC=null;TURN=null;drawLog();board();$('#title').textContent='Nouvelle partie';$('#hd').textContent='Adversaire automatique pour le mode solo';
  const old=load();
  if(old&&old.nat){if(await ask(`Une partie contre les ${NAT[old.nat].name} est en cours (manche ${old.round}). La reprendre au début de votre tour ?`,[['Reprendre',1],['Nouvelle partie',0]])){S=old;if(S.seed==null)S.seed=12345;return playerTurn()}drop()}
  const ot=loadTR();
  if(ot){if(await ask(`Un entraînement avec les ${ot.me} est en cours (tour ${ot.turn} sur 12). Le reprendre ?`,[['Reprendre',1],['Nouvelle partie',0]])){TR=ot;return trainLoop()}dropTR()}
  let nat='car',diff=0,m=META.camp?1:0;const p=$('#prompt');
  const natSel=(id,keys)=>`<label class="f" for="${id}">Votre nation<select id="${id}">${Object.entries(NAT).sort((a,b)=>CX[a[0]]-CX[b[0]]).map(([k,N])=>`<option value="${keys?k:N.name}">${N.name} · complexité ${'★'.repeat(CX[k])}${'☆'.repeat(5-CX[k])}</option>`).join('')}</select></label><p class="hint" style="margin:6px 0 0">Complexité d'après le livret : une étoile, c'est la plus simple à prendre en main.</p>`;
  p.innerHTML=`<div class="q">Type de partie</div><div class="row" id="mm"><button type="button" data-m="0">Partie libre</button><button type="button" data-m="1">Campagne</button><button type="button" data-m="2">Entraînement</button><button type="button" data-m="3">Partie numérique</button></div><div id="cb" style="margin:10px 0 14px"></div>
  <div id="nb"><div class="q">Quelle nation la C.I.V. joue-t-elle ?</div><div class="row" id="nn"></div><p class="hint" style="margin:6px 0 14px">Difficulté estimée de chaque C.I.V. d'après des centaines de parties simulées : ce n'est pas une donnée du livret. Elle s'ajoute au niveau choisi plus bas.</p></div>
  <div id="db"><div class="q">Niveau de difficulté</div><div class="row" id="dd"></div><div class="hint" id="dh" style="margin:8px 0 14px"></div></div><div class="row"><button type="button" class="pri" id="go">Préparer la partie</button></div>`;
  const mode=()=>{p.querySelectorAll('#mm button').forEach(b=>b.classList.toggle('sel',+b.dataset.m===m));$('#db').style.display=m===1||m===2?'none':'';$('#nb').style.display=m===2?'none':'';const C=META.camp;
    $('#cb').innerHTML=m===3?`<p>Sans le jeu physique : l'application gère votre deck, votre main, le Marché, les jetons et la C.I.V. Vous lisez vos cartes et appliques leurs effets avec des boutons.</p>${natSel('dm',true)}<p class="hint">Le Marché est préparé avec les cartes communes de votre boîte, comme pour 2 joueurs.</p>`:m===2?`<p>La variante d'apprentissage du livret : aucun adversaire, 12 tours rythmés par un sablier de 12 Progrès. Idéal pour découvrir une nation. Repères : 50 points, les bases sont acquises ; 90 points, c'est un exploit.</p>${natSel('tm')}`
      :m===0?'':C?`<p>Campagne avec les ${C.me} : ${pl(C.wins,'victoire')}, ${pl(C.losses,'défaite')}. Cette partie se joue au niveau ${DIFF[C.level][0]}.</p><button type="button" id="cx" class="warn">Abandonner cette campagne</button>`
      :`<p>Cinq victoires à difficulté croissante pour gagner, quatre défaites pour perdre. Vous gardez la même nation du début à la fin.</p>${natSel('cm')}`;
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
  $('#title').textContent='Mise en place';
  p.innerHTML=`<h3 style="margin-top:0">Votre nation</h3><ol class="setup"><li>Carte Puissance, et carte État face Barbare avec 3 jetons Action et 5 jetons Épuisé.</li><li>Développements face visible. Avènement face visible, cartes Nation mélangées posées dessus en travers.</li><li>Réserve : 3 Matériaux, 2 Population, 1 Progrès.</li><li>Écartez vos cartes marquées 3+ ou 4, mélangez le reste pour former votre deck, piochez 5 cartes.</li></ol><h3>Le Marché (comme à 2 joueurs)</h3><ol class="setup"><li>Écartez les cartes communes marquées 3+ ou 4, puis triez par couleur de bandeau.</li><li>Pile Instabilités face visible.</li><li>Roi des rois face A, avec 6 Renommées face cachée dessus.</li><li>Pioches Région, Tradition et Civilisé : 6 cartes chacune.</li><li>Pioche Principale : les Vassaux et tout le reste, mélangés.</li><li>Marché : 2 cartes de la pioche Principale, puis 1 Civilisé, 1 Tradition, 1 Région.</li><li>Une Instabilité sous chaque carte du Marché sauf la Région, et 1 Progrès sur chaque carte à bandeau blanc.</li></ol><h3>La C.I.V.</h3><ol class="setup">
  <li>Les emplacements du Marché sont numérotés de 1 à 5, de gauche à droite. Posez les marqueurs dessous si vous voulez un repère.</li>
  <li>Dans la boîte des ${N.name}, prenez ${N.ownIns?`leurs ${N.ownIns} cartes Instabilités sans icône de nombre de joueurs et posez-les à part : c'est le tas « Instabilités de la C.I.V. »`:'leurs cartes Instabilités et ajoutez-les à la pile commune'}. Leurs autres cartes restent dans la boîte : l'application les gère.</li>
  <li>Gardez un coin de table pour un second tas, « cartes de la C.I.V. », où iront les cartes qu'elle prendra au Marché.</li>
  ${S.diff>=3?'<li>La C.I.V. démarre avec 3 Matériaux, 2 Population et 1 Progrès : c\'est déjà compté.</li>':''}
  ${C?`<li><b>Campagne.</b> ${C.bonus?'Vous commencez avec 6 Matériaux, 4 Population et 2 Progrès.':'Ressources de départ normales.'}${C.added.length?' Ajoutez à votre deck de départ : '+C.added.join(', ')+'.':''}${C.removed.length?' Retirez de votre deck de départ : '+C.removed.join(', ')+'.':''}</li>`:''}<li>Vous jouez en premier. Le dé, le deck, la défausse, l'Histoire et les ressources de la C.I.V. sont tenus ici.</li></ol>
  <div class="row"><button type="button" class="pri" id="go2">Commencer la partie</button></div>`;
  await new Promise(r=>$('#go2').onclick=r);p.innerHTML='';playerTurn()}
window.IMP_T={NAT,newGame,playerTurn,botScore,c,get S(){return S},get TR(){return TR},log:(f)=>{const o=log;log=(t,k)=>{f(t,k);o(t,k)}}};
window.IMP_NAT=NAT;
start();

})();