
/* ---------- contenu des chapitres ----------
   rules : un point de règle par ligne. html : bloc libre. lab : atelier interactif (voir LABS). cas : mises en situation. quiz : vérification.
   a : indice de la bonne réponse. Source : livret de règles français et aide de jeu Salles. */
const CH=[
/* ======================= DÉCOUVRIR ======================= */
{id:'but',part:'Découvrir',t:'Le but du jeu',
lead:`Vous êtes un Marine envoyé dans un complexe extraterrestre infesté. L'escouade a une mission commune, mais chacun poursuit aussi ses propres objectifs. Nemesis: Retaliation est <b>semi-coopératif</b> : il peut y avoir plusieurs gagnants, ou aucun.`,
rules:[
`Le jeu se joue de 1 à 5 joueurs. Ce n'est pas un jeu coopératif : chaque personnage se bat pour son propre intérêt, même si l'entraide est souvent vitale.`,
`Pour gagner, vous devez remplir <b>trois conditions</b> : <b>1.</b> vous échapper du complexe ou hiberner ; <b>2.</b> accomplir l'un de vos objectifs ; <b>3.</b> survivre aux procédures d'infection et d'éclosion de fin de partie.`,
`Il y a trois façons de finir la partie en lieu sûr : partir avec le <b>vaisseau</b> depuis la zone d'atterrissage, <b>hiberner</b> dans une nacelle de l'hibernatorium, ou partir avec la <b>navette d'évacuation</b>.`,
`Chaque joueur reçoit <b>2 objectifs cachés</b> : un <b>objectif personnel</b>, propre à son personnage, et un <b>objectif de mission</b>, lié à la mission commune décrite sur la carte <b>Mission de l'escouade</b>. Au cours de la partie, vous en choisissez un, que vous devrez accomplir.`,
`La partie s'arrête à la <b>fin de la 14e manche</b> (tous ceux qui ne sont ni partis ni en hibernation sont laissés pour morts), ou dès que <b>tous les personnages</b> sont morts, partis ou en hibernation.`,
`Les Intrus de ce jeu s'appellent les <b>Primesangs</b>. Le mot « Intrus » désigne toutes les races extraterrestres de l'univers de Nemesis : les règles disent toujours « Intrus ».`],
quiz:[
{q:`Vous avez accompli votre objectif et vous êtes en vie à la fin de la 14e manche, mais vous êtes encore dans le complexe. Avez-vous gagné ?`,o:[`Oui, l'objectif suffit`,`Non : à la fin de la 14e manche, ceux qui ne sont ni partis ni en hibernation sont laissés pour morts`,`Oui, si la Reine est morte`],a:1,w:`Il faut <b>aussi</b> être parti ou en hibernation. Les trois conditions sont cumulatives.`},
{q:`Combien de joueurs peuvent gagner la même partie ?`,o:[`Un seul`,`Tous ceux qui remplissent les trois conditions`,`Toute l'escouade, ou personne`],a:1,w:`Plusieurs gagnants sont possibles : chacun gagne s'il remplit ses trois conditions.`},
{q:`Quelles sont les trois façons de terminer la partie en sécurité ?`,o:[`Vaisseau, hibernatorium, navette d'évacuation`,`Vaisseau, bloc opératoire, abri`,`Tuer la Reine, détruire le nid, autodestruction`],a:0,w:`Le vaisseau (zone d'atterrissage), une nacelle de l'hibernatorium, ou la navette d'évacuation (section C).`}]},

{id:'mep-complexe',part:'Découvrir',t:'Mise en place du complexe',
lead:`La mise en place du jeu peut se faire à l'avance. Elle prépare le complexe, les Intrus et les réserves. Suivez les étapes dans l'ordre.`,
rules:[
`<b>Plateau :</b> assemblez les 3 plateaux périphériques de section et les 3 plateaux compte-tours. Posez la tuile <b>Hibernatorium non découvert</b> sur l'emplacement de l'hibernatorium : tant qu'aucun personnage ne l'a atteint, il compte comme absent (pas de marqueur Bruit dans ses couloirs, robot non activable).`,
`<b>Compte-tours :</b> le marqueur sur la 1re case, le jeton <b>Vaisseau</b> sur la <b>10e case</b>, le jeton <b>Autodestruction</b> sur sa case, au-dessus de la piste. Un cube sur la case supérieure de la piste <b>Choix d'objectif</b>.`,
`<b>Systèmes :</b> les 3 jetons Recycleur d'air et le jeton Hibernatorium côté <b>inactif</b>. Une carte Robot tirée au hasard, face cachée, sur l'emplacement Robot de la section A (les autres retournent dans la boîte), avec 1 jeton Munitions (côté plein) et 1 jeton Oxygène à côté. La figurine du robot va dans l'hibernatorium.`,
`<b>DCA et nid :</b> les 2 jetons DCA mélangés, face cachée, l'un sur l'autre, dans l'emplacement DCA de la section B. 5 jetons <b>Œuf</b> dans l'emplacement du nid (section C).`,
`<b>Zone d'atterrissage :</b> 4 jetons Munitions (côté plein), 4 Grenades, 4 Oxygène et 4 Medpacks sur ses emplacements.`,
`<b>Couloirs et salles :</b> mélangez les tuiles Couloir dans un casier, face « 0 » visible, pour piocher sans voir leur numéro. Reliez <b>3 couloirs</b> au hasard à la zone d'atterrissage, côté non renforcé (seuil de porte tourné vers la zone). Triez les tuiles Salle par dos en 4 piles mélangées : A, B, C et « ? ».`,
`<b>Intrus :</b> mélangez le paquet Exploration. Triez les jetons Intrus en piles par type. Mettez dans le <b>sac Intrus</b> : <b>1 jeton vierge, 2 Larves, 3 Adultes, plus 1 Adulte par personnage</b>. Mélangez les paquets Attaque et Événement, et les 12 cartes Santé de la Reine (face numérotée cachée) sur la section C, avec un cube sur la case 0 de la piste des touches portées à la Reine. L'aide de jeu Intrus se pose côté <b>« La Reine est en vie »</b>.`,
`<b>Le reste :</b> les 3 paquets Objet (rouge, vert, jaune), le paquet Contamination et le paquet Blessure grave, mélangés séparément, face cachée. Le casier des marqueurs Bruit, Feu, Panne, jetons Porte, Sécurisation, jetons tactiques et cubes, les 6 dés et le scanner à portée de main.`],
html:`<div class="note"><b>Mode mortel.</b> Certains couloirs portent un second chiffre, plus petit : il ne sert qu'en mode mortel (voir le dernier chapitre).</div>`,
quiz:[
{q:`Combien de jetons Adulte mettez-vous dans le sac Intrus à 4 joueurs ?`,o:[`3`,`4`,`7`,`8`],a:2,w:`3 Adultes de base + 1 par personnage, soit 7 (avec aussi 1 jeton vierge et 2 Larves).`},
{q:`Où commence le jeton Vaisseau ?`,o:[`Sur la zone d'atterrissage`,`Sur la 10e case du compte-tours`,`Sur la dernière case du compte-tours`],a:1,w:`Quand le compte-tours atteint la 10e case, le vaisseau tente d'atterrir.`},
{q:`Dans quel état commencent les recycleurs d'air ?`,o:[`Actifs`,`Inactifs`,`Au hasard`],a:1,w:`Les 3 recycleurs et l'hibernatorium commencent côté inactif : sans recycleur actif, vous perdez de l'oxygène à chaque tour.`}]},

{id:'mep-joueurs',part:'Découvrir',t:'Mise en place des joueurs',
lead:`Tous les joueurs doivent être autour de la table : chacun reçoit un numéro, ses objectifs, un personnage et son équipement.`,
rules:[
`<b>Numéros :</b> prenez les aides de jeu correspondant au nombre de joueurs (1 à 3 à trois joueurs, etc.), mélangez-les et distribuez-en une à chacun. Ce numéro sert au choix des personnages et à certains objectifs, pas à l'ordre du tour.`,
`<b>Objectifs :</b> séparez les objectifs personnels et les objectifs de mission. Dans ces deux paquets et dans le paquet Mission de l'escouade, retirez les cartes qui affichent un nombre de personnages supérieur au nombre de joueurs. Distribuez au hasard <b>1 objectif personnel et 1 objectif de mission</b> à chacun, face cachée. Tirez <b>1 Mission de l'escouade</b>, face visible, sur le plateau compte-tours inférieur.`,
`Ne montrez jamais vos objectifs. Vous pouvez en parler, mais rien ne vous oblige à dire la vérité. Ils ne sont révélés qu'à la fin.`,
`<b>Personnages :</b> le joueur 1 reçoit 2 cartes Rôle, en choisit une en secret puis la révèle ; l'autre retourne dans le paquet. On continue par numéro croissant.`,
`<b>Votre plateau :</b> la tuile Personnage sur le plateau Personnage, un cube sur la case la plus à gauche de la piste de santé, le cadran d'oxygène sur <b>7</b>, votre figurine (avec son socle de couleur) dans la <b>zone d'atterrissage</b>, le porte-cartes numéroté au-dessus du plateau, vos 10 cartes Action mélangées à gauche (défausse à droite).`,
`<b>Objet de personnage :</b> un objet lourd va dans un emplacement de main, une armure sur la section <b>État critique</b> de la piste de santé. Un jeton Munitions (côté plein) sur chaque emplacement de munitions. La Mercenaire commence avec 2 objets de personnage.`,
`<b>Équipement de soutien</b> (sauf la Mercenaire) : révélez 7 cartes ; du numéro le plus élevé au plus bas, chacun en choisit 1. Remplissez leurs emplacements tactiques. Les cartes non choisies sont retirées du jeu ; le reste du paquet reste à côté des objets.`,
`<b>Ceinture tactique :</b> chacun choisit <b>4 jetons tactiques</b> dans la réserve (en cas de conflit, par numéro décroissant). Pour la première partie, prenez 1 jeton de chaque type.`,
`<b>Départ :</b> chacun pioche 5 cartes Action. Le joueur 1 prend le jeton Premier joueur et commence.`],
cas:[
{q:`À 3 joueurs, une carte Objectif indique « 4 personnages ». Que faites-vous ?`,o:[`Vous la gardez, elle est simplement plus dure`,`Vous la retirez avant de distribuer`,`Vous la donnez au joueur 1`],a:1,w:`Toute carte Objectif ou Mission de l'escouade qui affiche plus de personnages que de joueurs est retirée avant la distribution.`}],
quiz:[
{q:`Qui choisit son équipement de soutien en premier ?`,o:[`Le joueur 1`,`Le joueur au numéro le plus élevé`,`Le premier joueur`],a:1,w:`L'équipement de soutien se choisit par numéro décroissant. La Mercenaire n'y participe pas.`},
{q:`À combien est réglé le cadran d'oxygène au départ ?`,o:[`5`,`7`,`10`],a:1,w:`7, la valeur maximale. Votre réserve ne peut jamais dépasser 7.`}]},

{id:'manche',part:'Découvrir',t:'Une manche en 4 phases',
lead:`La partie se joue en manches (14 au plus). Chaque manche enchaîne quatre phases : Joueurs, Intrus, Événement et Nettoyage.`,
rules:[
`<b>Phase Joueurs :</b> à partir du premier joueur, dans le sens horaire, chacun joue un tour : <b>1.</b> effectuer 2 actions ; <b>2.</b> perte d'oxygène si le recycleur d'air de sa section est inactif ; <b>3.</b> dégâts du feu s'il est dans une salle en feu. On enchaîne les tours jusqu'à ce que <b>tout le monde ait passé</b>.`,
`<b>Phase Intrus :</b> <b>1.</b> chaque Intrus dans une salle en feu subit 1 touche (et le nid en feu perd 1 œuf) ; <b>2.</b> les Intrus attaquent les personnages de leur salle.`,
`<b>Phase Événement :</b> <b>3.</b> piochez et résolvez une carte Événement (des Intrus se déplacent, puis effet principal, puis effet secondaire) ; <b>4.</b> piochez un jeton dans le sac Intrus : la colonie se développe.`,
`<b>Phase Nettoyage :</b> <b>5.</b> le jeton Premier joueur passe au voisin de gauche du premier joueur de la manche ; <b>6.</b> chacun pioche pour remonter à 5 cartes en main ; <b>7.</b> le compte-tours avance d'une case.`,
`Si le compte-tours arrive sur la case du jeton <b>Vaisseau</b>, le vaisseau tente d'atterrir. S'il arrive sur la case du jeton <b>Autodestruction</b>, le complexe explose. S'il est déjà sur la dernière case, la partie se termine.`,
`<b>Priorité au premier joueur :</b> quand les règles départagent des joueurs, la priorité va au détenteur du jeton Premier joueur, ou à défaut au plus proche de lui dans le sens horaire.`],
html:`<div class="ex"><b>Effets d'un événement.</b> Les effets qui touchent des personnages se résolvent dans l'ordre du tour. Ceux qui touchent les marqueurs Bruit des couloirs se résolvent à partir du couloir en haut à gauche du complexe, rangée par rangée. Si un effet est impossible, ignorez-le et résolvez le reste.</div>`,
quiz:[
{q:`À quel moment perdez-vous de l'oxygène à cause d'un recycleur inactif ?`,o:[`Pendant la phase Nettoyage`,`À la fin de chacun de vos tours, même quand vous passez`,`Une fois par manche, au début de la phase Joueurs`],a:1,w:`C'est l'étape 2 de votre tour : à chaque tour (même un tour où vous passez), si le recycleur de votre section est inactif, vous perdez 1 oxygène.`},
{q:`Dans quel ordre se déroule la phase Événement ?`,o:[`Sac Intrus, puis carte Événement`,`Carte Événement, puis sac Intrus`,`Attaques, puis carte Événement`],a:1,w:`D'abord la carte Événement (déplacements, effet principal, effet secondaire), puis le tirage dans le sac Intrus.`},
{q:`Combien de cartes avez-vous en main après la phase Nettoyage ?`,o:[`5`,`Ce qu'il vous reste + 2`,`10`],a:0,w:`Chaque joueur remonte à 5 cartes (sauf exception).`}]},

/* ======================= VOTRE TOUR ======================= */
{id:'actions',part:'Votre tour',t:'Les actions',
lead:`À votre tour, vous faites 2 actions parmi celles de votre plateau Personnage. La plupart se paient en défaussant des cartes Action.`,
rules:[
`Vous <b>devez</b> faire 2 actions. Vous pouvez faire deux fois la même. Si vous ne pouvez faire aucune autre action, vous devez faire l'action <b>Passer</b>.`,
`<b>Coût 0 :</b> Jouer une carte Action ; Passer.`,
`<b>Coût 1 carte :</b> Se déplacer ; Placer 1 jeton Sécurisation ✖ ; Effectuer un tir dans une salle ; Tirer une rafale dans un couloir ; Combattre en mêlée ; Utiliser un objet ; Activer le robot ✖ ; Échanger ✖ ; Utiliser un équipement tactique.`,
`<b>Coût 2 cartes :</b> Action de salle ✖ ; Déplacement prudent ✖.`,
`Les actions marquées ✖ sont des actions <b>hors combat</b> : impossibles si vous êtes <b>engagé dans un combat</b>, c'est-à-dire dans une salle avec au moins 1 Intrus.`,
`Pour payer, défaussez le nombre de cartes requis, face visible : leurs effets ne sont <b>pas</b> résolus. Puis résolvez l'action.`,
`<b>Passer</b> est une action : vous ne passez pas automatiquement quand vous n'avez plus de cartes. En passant, vous pouvez défausser autant de cartes Action et Contamination de votre main que vous voulez. Ensuite, votre tour est ignoré jusqu'à la fin de la manche, mais vous pouvez encore jouer des réactions.`,
`Après vos 2 actions : <b>perte d'oxygène</b> (recycleur de votre section inactif : −1 oxygène) puis <b>dégâts du feu</b> (salle en feu : −1 santé).`],
cas:[
{q:`Il vous reste 1 carte Action en main et vous êtes seul dans une salle vide. Vous voulez faire un déplacement prudent. Est-ce possible ?`,o:[`Oui`,`Non : il coûte 2 cartes`,`Oui, en défaussant une carte Contamination en plus`],a:1,w:`Le déplacement prudent coûte 2 cartes Action, et les cartes Contamination ne peuvent pas servir à payer.`},
{q:`Un Adulte est dans votre salle. Pouvez-vous utiliser l'action de la salle ?`,o:[`Oui`,`Non : l'action de salle est hors combat`,`Oui, si vous payez 3 cartes`],a:1,w:`Une salle avec au moins 1 Intrus vous engage dans un combat : les actions hors combat (action de salle, déplacement prudent, sécurisation, robot, échange) sont interdites.`}],
quiz:[
{q:`Que coûte l'action Tirer une rafale dans un couloir ?`,o:[`0 carte`,`1 carte`,`2 cartes`],a:1,w:`1 carte Action (et la rafale dépense en plus des munitions).`},
{q:`Vous n'avez plus de carte en main et il vous reste une action. Que se passe-t-il ?`,o:[`Vous passez automatiquement`,`Vous devez faire l'action Passer (sauf si une action à 0 carte est possible)`,`Vous piochez une carte`],a:1,w:`Passer est une action qu'il faut effectuer ; elle ne coûte rien.`}]},

{id:'cartes',part:'Votre tour',t:'Cartes Action, objectif et règles d\'or',
lead:`Vos 10 cartes Action sont à la fois votre monnaie et vos effets spéciaux. C'est aussi pendant votre tour que vous choisissez votre objectif.`,
rules:[
`<b>Jouer une carte Action</b> (coût 0) : révélez-la, résolvez son effet, défaussez-la. L'icône <b>hors combat</b> sur une carte interdit de la jouer dans une salle avec un Intrus.`,
`<b>Réactions :</b> certaines cartes ont un effet de réaction, jouable à tout moment, même hors de votre tour, si ses conditions sont remplies. Ce n'est pas une action.`,
`<b>Ordres :</b> certains effets vous font agir avec un autre personnage, même s'il a passé. Interdit si cela provoque une attaque d'opportunité (sortir d'une salle avec des Intrus, traverser un couloir infesté).`,
`<b>Effets :</b> vous ne pouvez choisir un effet que si vous pouvez le résoudre entièrement. Exemple : « À couvert » demande de défausser 1 carte de plus ; sans elle, vous ne pouvez pas la jouer.`,
`<b>Choisir un objectif</b>, une fois par partie, à votre tour, avant ou après vos 2 actions (pas entre les deux) : gardez 1 carte Objectif, retirez l'autre sans la montrer. Ce n'est pas une action.`,
`Le premier joueur à choisir pioche <b>3</b> cartes Action, le 2e et le 3e en piochent <b>2</b>, le 4e et le 5e <b>1</b> : le cube de la piste Choix d'objectif descend d'un cran à chaque choix. Plus vous attendez, moins vous piochez.`,
`Pioche vide : mélangez votre défausse pour en refaire une, à n'importe quelle phase.`,
`<b>Règles d'or.</b> <b>Loi de Murphy :</b> en cas de doute, appliquez ce qui pénalise le plus l'ensemble des joueurs, puis le premier dans l'ordre du tour. <b>Effets locaux :</b> un effet sans cible précise s'applique dans la salle du personnage qui l'a déclenché (ou sur ce qu'il porte). <b>Limite du matériel :</b> les éléments sont limités sauf mention contraire (pas de jeton Munitions s'ils sont tous pris ; les cubes, eux, sont illimités).`],
faq:[
`<b>Remélanger :</b> quand une carte vous fait remélanger un paquet, elle est mélangée avec. Ce n'est pas le cas quand une carte Action vous fait piocher : vous piochez (ce qui peut vous obliger à remélanger votre défausse) avant de défausser la carte jouée, qui n'est donc pas remélangée.`,
`<b>« Feu à volonté » :</b> l'Officier choisit sa salle ou une salle voisine. Chaque personnage qui s'y trouve, dans l'ordre du tour, fait une rafale vers un couloir choisi par l'Officier, qui peut choisir un couloir différent pour chacun. Chacun choisit l'arme qu'il utilise.`,
`<b>La carte <i>Shoot First</i> :</b> vous pouvez tirer ou faire une rafale sur les Intrus qui apparaissent à cause du jet de bruit de votre déplacement.`,
`<b>« Tenez la position » (Tireur d'élite) :</b> l'état « toujours sécurisé » de l'Abri n'est pas un jeton Sécurisation et ne compte pas pour cette carte.`,
`<b>« Un par un » (Tireur d'élite) :</b> elle ne peut pas tuer les Guerriers.`],
cas:[
{q:`Deux joueurs ont déjà choisi leur objectif. Vous choisissez le vôtre au début de votre tour. Combien de cartes piochez-vous ?`,o:[`3`,`2`,`1`],a:1,w:`Vous êtes le 3e à choisir : 2 cartes (3 pour le 1er, 2 pour les 2e et 3e, 1 pour les 4e et 5e).`}],
quiz:[
{q:`Pouvez-vous choisir votre objectif entre vos deux actions ?`,o:[`Oui`,`Non : avant ou après les 2 actions`,`Seulement si vous passez`],a:1,w:`Avant ou après vos 2 actions, jamais au milieu. Ce n'est pas une action.`},
{q:`Un effet vous permet de défausser un marqueur Panne sans préciser où. Où pouvez-vous le prendre ?`,o:[`N'importe où dans le complexe`,`Dans votre salle, ou sur un objet que vous portez`,`Seulement sur votre arme`],a:1,w:`Règle d'or des effets locaux : dans la salle du personnage qui déclenche l'effet, y compris sur ce qu'il transporte.`},
{q:`Peut-on ordonner à un personnage de quitter une salle où se trouve un Intrus ?`,o:[`Oui`,`Non : cela provoquerait une attaque d'opportunité`,`Oui, s'il a passé`],a:1,w:`Un ordre ne peut jamais provoquer d'attaque d'opportunité d'Intrus.`}]},

{id:'sante',part:'Votre tour',t:'Santé, blessures graves et armure',
lead:`Votre piste de santé se lit de gauche à droite. Plus le cube avance, plus vous êtes mal en point, et certaines attaques deviennent mortelles.`,
rules:[
`La piste a 3 sections : <b>En forme</b>, <b>Affaibli</b>, <b>État critique</b>. Les attaques d'Intrus font souvent référence à la section où se trouve votre cube.`,
`Perdre de la santé déplace le cube vers la <b>droite</b> ; en regagner le déplace vers la <b>gauche</b>. Vous pouvez choisir de regagner moins que permis.`,
`Si le cube atteint la case marquée d'un <b>crâne</b>, votre personnage meurt : sa figurine et tous ses objets sont retirés, vous ne pouvez plus gagner.`,
`<b>Blessure grave :</b> piochez une carte au hasard et posez-la sur la section libre la plus à gauche. Elle impose un handicap et réduit votre santé maximum : le cube ne peut jamais aller sur une case couverte. Si elle couvre la case du cube, celui-ci passe aussitôt sur la première case de la section suivante.`,
`Deux blessures graves identiques ne cumulent pas leurs effets. Pour en défausser une, il faut un objet ou une salle (Bloc opératoire, Infirmerie) ; vous choisissez laquelle, les autres glissent d'une section vers la gauche. Le cube ne bouge pas.`,
`<b>Armure :</b> elle se pose sur la section État critique. Quand le cube atteint cette section, l'armure est détruite <b>au lieu</b> de perdre 1 point de santé, puis vous appliquez le reste des dégâts. Une seule armure à la fois ; elle ne va jamais dans le sac à dos. Si votre cube est déjà en État critique, vous ne pouvez pas en équiper une nouvelle : défaussez-la.`],
cas:[
{q:`Votre cube est sur la dernière case de la section Affaibli. Vous portez une armure et perdez 2 points de santé. Que se passe-t-il ?`,o:[`Vous perdez 2 points, l'armure reste`,`L'armure est détruite au lieu du 1er point, puis le cube avance de 1`,`L'armure absorbe les 2 points`],a:1,w:`En entrant dans la section de l'armure, vous la défaussez au lieu de perdre ce point, puis vous appliquez le reste : le cube avance d'une case.`}],
quiz:[
{q:`Une blessure grave vient couvrir la case de votre cube. Où va-t-il ?`,o:[`Il reste dessous`,`Sur la première case de la section suivante`,`Sur la case libre précédente`],a:1,w:`Il passe immédiatement sur la première case de la section suivante, ce qui peut vous faire défausser une armure.`},
{q:`Défausser une blessure grave vous fait-il regagner de la santé ?`,o:[`Oui, 1 point`,`Non, le cube ne bouge pas`,`Oui, jusqu'au début de la section`],a:1,w:`Les blessures restantes glissent vers la gauche, mais le cube ne bouge pas.`}]},

{id:'ceinture',part:'Votre tour',t:'Oxygène et jetons tactiques',
lead:`L'air du complexe n'est pas respirable sans recycleur. Votre réserve d'oxygène baisse, et vos jetons tactiques sont vos ressources de survie.`,
rules:[
`<b>Oxygène :</b> à la fin de chacun de vos tours (même si vous passez), si le recycleur d'air de votre section est inactif, perdez 1 oxygène. Un recycleur actif empêche la perte mais ne <b>remplit pas</b> votre réserve.`,
`Vous ne pouvez pas faire une action qui ferait descendre votre cadran sous 0. Si le cadran tombe en dessous de 0 (par perte), vous recevez un <b>jeton Suffocation</b>, remettez le cadran à 0 et suivez le jeton : vous avez <b>un tour</b> pour trouver de l'oxygène, sinon vous mourez.`,
`<b>Ceinture tactique :</b> 4 emplacements, à gauche de votre plateau, chacun pour 1 jeton. Armes et objets ont aussi des emplacements tactiques : leur couleur dit quel jeton ils acceptent ; les <b>gris</b> (dont ceux de la ceinture) acceptent tout.`,
`<b>Utiliser un équipement tactique</b> est une action (1 carte) : utilisez autant de jetons que vous voulez, défaussez-les (sauf les munitions mises dans vos armes). Vous pouvez aussi réorganiser vos jetons entre emplacements, sauf d'une arme vers une autre arme.`,
`<b>Munitions :</b> un jeton a 2 charges (plein, puis à moitié). L'utiliser recharge une arme : il passe de la ceinture à l'emplacement de l'arme. « Dépenser » des munitions : un jeton plein se retourne, un jeton à moitié se défausse.`,
`<b>Oxygène :</b> +3 oxygène, sans dépasser 7. <b>Medpack :</b> +2 santé. <b>Grenade :</b> choisissez un couloir adjacent, lancez un dé Rafale et ajoutez 2 : autant de touches dans ce couloir. Ce n'est pas une rafale (les effets d'arme ne s'appliquent pas).`,
`Un objet trouvé arrive avec ses emplacements tactiques remplis. Vous pouvez défausser objets et jetons à tout moment.`],
faq:[
`<b>Utiliser un équipement tactique :</b> vous pouvez utiliser plusieurs jetons dans la même action, en les choisissant un par un (par exemple, décider de lancer une 2e grenade après avoir lancé la première).`,
`Avec cette action, vous pouvez utiliser les jetons de n'importe lequel de vos objets, même en panne : un lance-grenades en panne peut encore lancer ses grenades.`],
cas:[
{q:`Vous êtes dans une section dont le recycleur est actif, avec 2 oxygène. Combien en aurez-vous à la fin de votre tour ?`,o:[`2`,`3`,`7`],a:0,w:`Un recycleur actif vous évite d'en perdre, mais ne vous en rend pas. Pour remonter, il faut un jeton Oxygène ou un objet.`},
{q:`Vous lancez une grenade et faites 3 au dé Rafale. Combien de touches ?`,o:[`3`,`5`,`6`],a:1,w:`Résultat + 2 : 5 touches dans le couloir choisi.`}],
quiz:[
{q:`Combien de jetons pouvez-vous utiliser avec une seule action Utiliser un équipement tactique ?`,o:[`1`,`2`,`Autant que vous voulez`],a:2,w:`Une seule action, autant de jetons que vous voulez.`}]},

/* ======================= LE COMPLEXE ======================= */
{id:'plateau',part:'Le complexe',t:'Sections, salles, couloirs et portes',
lead:`Le complexe est divisé en 3 sections : A (l'entrée), B (le centre) et C (la plus dangereuse). Les personnages vont de salle en salle ; les Intrus occupent salles et couloirs.`,
rules:[
`Chaque section a un <b>recycleur d'air</b> (actif ou inactif), qu'on change depuis sa salle de contrôle, et des salles qui lui sont propres (marquées A, B ou C). Les salles « ? » sont aléatoires : elles ne seront pas toutes en jeu.`,
`Aucune salle ni aucun couloir ne peut sortir des limites formées par les plateaux périphériques.`,
`Une tuile Salle indique : nom, effet, <b>icônes Objet</b> (pour la Fouille), icône <b>Ordinateur</b> (salle accessible à distance pour certains effets), type et numéro de référence (pour départager), et parfois une icône « jamais sécurisée » ou « jamais en panne ».`,
`Un couloir relié à une salle lui est toujours <b>adjacent</b>, quoi qu'il y ait dessus. Un couloir à la frontière de 2 sections est dans les deux. Un couloir relié à une seule salle est <b>inexploré</b> ; un couloir sans Intrus est <b>vide</b> (même avec un marqueur Bruit).`,
`Un couloir accueille : <b>la Reine et jusqu'à 2 autres Intrus</b>, <b>ou</b> jusqu'à <b>6</b> Adultes, Guerriers et Larves, <b>ou</b> <b>1 marqueur Bruit</b>. Un Intrus qui entre dans un couloir avec un marqueur Bruit le défausse ; on ne pose jamais de marqueur Bruit sur un Intrus.`,
`<b>Couloir renforcé :</b> défaussez son marqueur Bruit et retournez-le : sa valeur de bruit devient 0, aucun jet de bruit n'y place plus de marqueur, mais les Intrus peuvent toujours y passer. Les couloirs de l'hibernatorium ne peuvent jamais être renforcés.`,
`<b>Portes :</b> un seuil de porte = une porte ouverte. Fermée, on pose un jeton Porte ; détruite, on le couche : elle reste ouverte pour toujours. Une porte fermée bloque tout ce qui est de l'autre côté (sauf les marqueurs Bruit) : pas de déplacement ni de rafale à travers, et le feu ne se propage pas. Les Intrus qui doivent la franchir la <b>détruisent</b> au lieu de bouger.`,
`Un effet qui vous envoie « n'importe où dans le complexe » ignore les portes fermées (vous passez par un conduit).`],
faq:[
`<b>Portes fermées :</b> à travers une porte fermée, vous ne pouvez ni renforcer un couloir, ni donner un ordre à un autre personnage, ni faire de rafale, ni lancer de grenade. Vous pouvez en revanche y poser et y défausser des marqueurs Bruit : une porte bloque tout, sauf les marqueurs Bruit.`],
quiz:[
{q:`Combien d'Intrus Adultes un couloir peut-il contenir au plus ?`,o:[`3`,`4`,`6`],a:2,w:`6 au total (Adultes, Guerriers, Larves). La Reine compte pour 4.`},
{q:`Un couloir contient un marqueur Bruit. Est-il « vide » ?`,o:[`Oui`,`Non`],a:0,w:`Un couloir est vide s'il ne contient aucun Intrus ; un marqueur Bruit n'est pas un Intrus.`},
{q:`Un Adulte doit traverser une porte fermée. Que se passe-t-il ?`,o:[`Il fait un détour`,`Il détruit la porte au lieu de se déplacer`,`Il reste bloqué pour la manche`],a:1,w:`Le chemin le plus court ignore les portes ; arrivé devant une porte fermée, l'Intrus la détruit et reste sur place.`}]},

{id:'marqueurs',part:'Le complexe',t:'Feu, panne et sécurisation',
lead:`Le complexe est abandonné : des feux s'y déclarent, des systèmes tombent en panne. Les jetons Sécurisation, eux, préparent une salle aux attaques.`,
rules:[
`<b>Feu</b> (1 par salle au plus) : un personnage qui finit son tour dans une salle en feu perd 1 point de santé ; en phase Intrus, chaque Intrus d'une salle en feu subit 1 touche, et le nid en feu perd 1 œuf. Certains événements propagent le feu aux salles adjacentes ; une porte fermée l'arrête.`,
`<b>Feu généralisé :</b> s'il faut poser un marqueur Feu et qu'il n'y en a plus, le complexe est détruit et la partie se termine.`,
`<b>Panne</b> (1 par salle) : l'action de la salle est indisponible, d'aucune façon (ses icônes Objet restent valables). Sur un <b>objet lourd</b> : il ne peut plus servir du tout, mais ses jetons tactiques restent utilisables ; une 2e panne le <b>détruit</b>. Sur la <b>carte Robot</b> : le robot ne fait plus rien, mais ses jetons et les effets qui demandent sa présence restent utilisables.`,
`Plus de marqueur Panne en réserve ? Posez un marqueur Feu dans la salle à la place, si possible. Vous pouvez défausser une panne depuis votre salle, ou depuis un objet ou le robot de cette salle.`,
`<b>Sécurisation</b> (3 par salle au plus, impossible si un Intrus s'y trouve) : quand un Intrus <b>entre</b> dans une salle qui contient au moins 1 personnage et 1 jeton Sécurisation, défaussez 1 jeton <b>au lieu</b> de l'attaque. C'est obligatoire.`,
`Les jetons Sécurisation ne protègent pas des Intrus <b>déjà présents</b> (par exemple lors des attaques de la phase Intrus). Certaines salles ne se sécurisent jamais (Nid, Entrepôt, Accès aux conduits) ; l'Abri est sécurisé par défaut.`],
faq:[
`<b>Panne et ordinateur :</b> un marqueur Panne ne rend pas l'icône Ordinateur d'une salle indisponible, sauf si un objet ou un effet le dit.`,
`<b>Propagation du feu :</b> si le feu doit se propager par un couloir ouvert (<i>Open Corridor</i>), il ne se passe rien : ne posez pas de marqueur Feu.`,
`<b>Sécurisation :</b> les jetons Sécurisation empêchent aussi l'attaque d'un Intrus qui est <b>placé</b> dans la salle (par exemple sur un résultat Danger), pas seulement d'un Intrus qui y entre.`,
`<b>Abri :</b> « toujours sécurisé » est un état permanent de la salle, pas un jeton Sécurisation : aucun objet ne peut le défausser. Vous pouvez y ajouter des jetons Sécurisation (3 au plus) ; ce sont eux qui sont défaussés en premier.`],
cas:[
{q:`Vous êtes dans une salle avec 2 jetons Sécurisation. Un Guerrier y entre, puis un Adulte. Combien d'attaques subissez-vous ?`,o:[`0`,`1`,`2`],a:0,w:`Chaque entrée fait défausser 1 jeton au lieu de l'attaque : il vous reste 0 jeton, et aucune attaque. Mais en phase Intrus, ces deux Intrus déjà présents attaqueront normalement.`},
{q:`Votre fusil a déjà un marqueur Panne et un effet vous en impose un autre. Que se passe-t-il ?`,o:[`Rien`,`Le fusil est détruit`,`Vous perdez 1 point de santé`],a:1,w:`Un deuxième marqueur Panne sur un objet le détruit : défaussez-le.`}],
quiz:[
{q:`Une salle a un marqueur Panne. Pouvez-vous y faire une Fouille ?`,o:[`Non`,`Oui : la panne n'affecte pas les icônes Objet`],a:1,w:`La panne bloque l'action de salle, pas les icônes Objet.`}]},

{id:'deplacement',part:'Le complexe',t:'Déplacement et exploration',
lead:`Un personnage va toujours d'une salle à une autre, jamais dans un couloir. Quand il emprunte un couloir inexploré, il découvre une nouvelle salle.`,
rules:[
`<b>1. Choisissez une direction :</b> un couloir adjacent à votre salle (ni porte fermée, ni rien de l'autre côté qui bloque).`,
`<b>2. Attaques d'opportunité :</b> chaque Intrus de votre salle et du couloir emprunté, du plus gros au plus petit, résout une attaque contre vous (<b>3 au plus</b>).`,
`<b>3a. Salle découverte :</b> déplacez votre figurine ; en <b>déplacement prudent</b>, posez un jeton Sécurisation dans la salle d'arrivée ; puis faites un <b>jet de bruit</b>. Tout déplacement entraîne un jet de bruit, même vers une salle occupée.`,
`<b>3b. Couloir inexploré :</b> résolvez une <b>séquence d'exploration</b>. Piochez une carte Exploration et orientez-la comme le plateau (icône Nord).`,
`<b>Exploration, dans l'ordre :</b> placez la salle du type indiqué (A, B, C ou « ? » ; s'il n'en reste plus, une « ? ») ; placez les couloirs indiqués, seuil de porte côté nouvelle salle, sauf ceux qui sortiraient du complexe ou mèneraient à une salle déjà placée ; posez marqueurs et jetons (pas de 2e marqueur Bruit dans un couloir) ; déplacez votre figurine (+ Sécurisation si prudent) ; résolvez l'effet d'arrivée (souvent un jet de bruit) ; défaussez la carte.`,
`L'icône <b>Infiltrée</b> des cartes Exploration ne sert pas dans le jeu de base. Pioche Exploration vide : remélangez la défausse (sans les cartes retirées du jeu).`,
`<b>Passages secrets :</b> un effet qui vous envoie vers une salle précise (comme l'Accès aux conduits) suit la même séquence, sans l'étape « choisir une direction ».`],
faq:[
`<b>Portes fermées par une carte Exploration :</b> fermez seulement les portes qui touchent la nouvelle salle. Les portes de l'hibernatorium ne se ferment jamais ainsi, puisqu'on n'y résout pas d'exploration.`,
`<b>« Retirez cette carte du jeu »</b> ne fait pas partie de l'effet d'entrée d'une carte Exploration : un effet qui vous fait explorer en ignorant l'effet d'entrée retire quand même la carte du jeu.`,
`<b>Empêcher une attaque en se déplaçant :</b> les cartes qui empêchent une attaque d'Intrus pendant un déplacement (comme « À couvert ») ne s'appliquent qu'aux <b>attaques d'opportunité</b>, pas à l'attaque déclenchée par le jet de bruit.`],
cas:[
{q:`Vous quittez une salle avec 1 Adulte en empruntant un couloir qui contient 1 Guerrier et 2 Larves. Combien d'attaques d'opportunité ?`,o:[`1`,`3`,`4`],a:1,w:`Tous les Intrus de la salle et du couloir attaquent, du plus gros au plus petit, mais 3 au plus : le Guerrier, l'Adulte, puis une Larve.`},
{q:`Une carte Exploration demande un couloir qui mènerait vers une salle déjà posée. Que faites-vous ?`,o:[`Vous le placez`,`Vous ne le placez pas`,`Vous le placez renforcé`],a:1,w:`Aucun couloir ne mène à une salle déjà placée (ni ne sort du complexe). Le marqueur Bruit prévu dans ce couloir n'est pas posé non plus.`}],
quiz:[
{q:`Vous allez dans une salle où se trouve déjà un autre personnage. Faites-vous un jet de bruit ?`,o:[`Oui`,`Non`],a:0,w:`Tout déplacement entraîne un jet de bruit, sauf effet spécial.`}]},

{id:'bruit',part:'Le complexe',t:'Le jet de bruit',
lead:`Chaque déplacement fait du bruit. Le dé Bruit indique d'où vient la menace : des marqueurs Bruit apparaissent, puis se changent en Intrus.`,
rules:[
`Lancez le dé Bruit (10 faces) : <b>un 1, deux 2, deux 3, trois 4</b> et <b>deux Danger</b>. Le 4 sort donc le plus souvent (3 chances sur 10) et le 1 le moins (1 sur 10).`,
`<b>Numéro :</b> repérez tous les couloirs de ce numéro <b>adjacents à votre salle</b>. Pour chacun : s'il contient au moins 1 Intrus, <b>le plus gros entre dans votre salle</b> (et attaque) ; sinon, s'il a déjà un marqueur Bruit, <b>résolvez ce marqueur</b> (des Intrus apparaissent) ; sinon, <b>posez un marqueur Bruit</b>. Aucun couloir de ce numéro : rien.`,
`<b>Danger :</b> quelque chose tombe du plafond. Piochez un jeton dans le sac Intrus et résolvez-le dans la colonne « salle » de l'aide de jeu Intrus : le plus souvent, un Intrus du type indiqué apparaît dans votre salle. Ignorez le chiffre au dos, puis remettez le jeton sous sa pile.`,
`<b>Résoudre un marqueur Bruit :</b> retirez-le, piochez un jeton dans le sac et résolvez-le dans ce couloir (colonne « couloir ») : le <b>chiffre blanc</b> au dos donne le nombre d'Intrus (Adultes), le <b>chiffre rouge</b> le nombre de Guerriers ajoutés. Défaussez le jeton sous sa pile ; le jeton vierge retourne toujours dans le sac.`,
`<b>Attaque immédiate :</b> un Intrus qui apparaît dans une salle ou y entre attaque aussitôt un personnage présent.`,
`Un couloir renforcé vaut 0 : aucun résultat du dé ne le désigne.`],
faq:[
`<b>Événement « Résolvez un marqueur Bruit dans chaque couloir inexploré » :</b> seuls les couloirs qui ont un marqueur Bruit sont concernés. On ne résout pas un marqueur qui n'existe pas.`],
lab:'bruit',
quiz:[
{q:`Vous faites 2. Le couloir 2 adjacent contient 3 Adultes. Que se passe-t-il ?`,o:[`Les 3 Adultes entrent`,`Un Adulte entre dans votre salle et vous attaque`,`Vous posez un marqueur Bruit`],a:1,w:`Seul le plus gros Intrus du couloir entre dans votre salle.`},
{q:`Vous faites 3 et vous avez deux couloirs 3 adjacents, sans rien dedans. Que faites-vous ?`,o:[`Un marqueur Bruit dans l'un des deux, au choix`,`Un marqueur Bruit dans chacun`,`Rien`],a:1,w:`Chaque couloir du numéro obtenu est traité, un par un.`}]},

{id:'salles',part:'Le complexe',t:'Les salles clés',
lead:`Les salles A, B et C sont toujours en jeu et servent presque toujours à vos objectifs. L'onglet « Salles » détaille aussi les 13 salles aléatoires.`,
rules:[
`Utiliser une salle (action de salle, 2 cartes, hors combat) résout son effet. Quand une salle propose deux effets séparés par OU, vous en choisissez un.`,
`<b>Section A :</b> Zone d'atterrissage (réapprovisionnement, embarquement), Contrôle du recycleur A (recycleur A ou éteindre un feu n'importe où), Bloc opératoire (retirer une Larve, ou une blessure grave), Station de forage (nouveau couloir depuis la salle du robot).`,
`<b>Section B :</b> Hibernatorium (hiberner, s'il est actif), Contrôle du recycleur B (recycleur B ou consulter et réordonner la DCA), Salle des serveurs (utiliser une salle avec ordinateur à distance, ou prendre un jeton Info), Système de refroidissement (lancer l'autodestruction).`,
`<b>Section C :</b> Contrôle du recycleur C (recycleur C ou activer l'hibernatorium), Réacteur (tout couper : recycleurs, DCA, autodestruction), Navette d'évacuation (s'enfuir seul), Nid (prendre ou détruire un œuf).`,
`Hibernatorium, Zone d'atterrissage (vaisseau) et Navette demandent un <b>jet de bruit</b> : s'il y a un Intrus dans la salle après le jet, l'action échoue.`],
faq:[
`<b>Station de forage :</b> si le robot est en panne, elle ne peut pas créer de couloir.`,
`<b>Accès aux conduits :</b> l'attaque d'Intrus que provoque cette salle peut être empêchée par un effet qui empêche les attaques d'Intrus.`,
`<b>Nid :</b> si la partie se termine avec un marqueur Feu dans le nid alors qu'il reste des œufs, le nid ne compte pas comme détruit.`],
html:`<div id="salles-ch"></div>`,
quiz:[
{q:`Quelle salle permet d'activer l'hibernatorium ?`,o:[`Contrôle du recycleur B`,`Contrôle du recycleur C`,`Salle des serveurs`],a:1,w:`Le Contrôle du recycleur C (section C), deuxième effet. On ne peut pas le désactiver.`},
{q:`Où regarde-t-on en secret l'état de la DCA ?`,o:[`Contrôle du recycleur B`,`Zone d'atterrissage`,`Réacteur`],a:0,w:`Le Contrôle du recycleur B permet de consulter les deux jetons DCA et de les remettre dans l'ordre de votre choix.`},
{q:`Que fait le Réacteur ?`,o:[`Il active tous les recycleurs`,`Il retire du jeu les recycleurs, l'autodestruction et la DCA`,`Il éteint tous les feux`],a:1,w:`Toutes les sections passent sans air, la DCA devient inactive et l'autodestruction s'arrête, définitivement.`}]},

/* ======================= LES INTRUS ======================= */
{id:'sac',part:'Les Intrus',t:'Le sac Intrus',
lead:`Le sac contient les Intrus qui vivent dans le complexe, hors de vue. À chaque manche, il change de composition : c'est la colonie qui grandit.`,
rules:[
`Quatre types, du plus gros au plus petit : <b>Reine</b>, <b>Guerrier</b>, <b>Adulte</b>, <b>Larve</b>. Il y a aussi un jeton <b>vierge</b>.`,
`<b>Phase Événement (étape 4) :</b> piochez un jeton et appliquez la colonne « sac Intrus » de l'aide de jeu. <b>Reine :</b> si la Reine est sur le plateau, activez-la ; sinon, ajoutez 2 Larves. <b>Guerrier ou Adulte :</b> ajoutez 2 Reines. <b>Larve :</b> ajoutez 2 Guerriers. <b>Vierge :</b> ajoutez 2 Adultes.`,
`Ensuite, le jeton pioché retourne <b>sous sa pile</b>, hors du sac. Seul le jeton <b>vierge</b> revient toujours dans le sac.`,
`On ajoute des jetons en les prenant sur les piles ; on en retire en les remettant sous les piles. Si une pile est vide, ajoutez ce qui reste (limite du matériel).`,
`Le même sac sert aux jets de bruit : colonne « couloir » pour un marqueur Bruit résolu, colonne « salle » pour un résultat Danger.`,
`Quand la Reine meurt, retournez l'aide de jeu sur la face <b>« La Reine est morte »</b>. Dans le sac : <b>Reine</b> = ajoutez 2 Guerriers et <b>retirez ce jeton du jeu</b> ; <b>Guerrier ou Adulte</b> = ajoutez 2 Larves ; <b>Larve</b> = ajoutez 2 Guerriers ; <b>vierge</b> = 2 Adultes, comme avant. Un jeton Reine tiré pour un bruit ou un Danger fait apparaître <b>1 Guerrier</b> à sa place, puis il est retiré du jeu.`],
lab:'sac',
quiz:[
{q:`Pendant la phase Événement, vous tirez un jeton Larve. Que mettez-vous dans le sac ?`,o:[`2 Larves`,`2 Guerriers`,`2 Reines`],a:1,w:`Larve : ajoutez 2 Guerriers au hasard. La Larve tirée retourne sous sa pile.`},
{q:`La Reine est morte. En phase Événement, vous tirez un jeton Reine. Que se passe-t-il ?`,o:[`Rien`,`Ajoutez 2 Guerriers ; le jeton Reine est retiré du jeu`,`Ajoutez 2 Larves ; le jeton retourne sous sa pile`],a:1,w:`Face « La Reine est morte » : 2 Guerriers dans le sac, et le jeton Reine quitte la partie. Les jetons Reine disparaissent ainsi peu à peu.`},
{q:`Vous tirez le jeton vierge. Où va-t-il ensuite ?`,o:[`Sous sa pile`,`Dans le sac`,`Hors du jeu`],a:1,w:`Le jeton vierge est le seul qui revient toujours dans le sac. Il ajoute aussi 2 Adultes.`}]},

{id:'depl-intrus',part:'Les Intrus',t:'Le déplacement des Intrus',
lead:`Les Intrus vont vers le personnage le plus proche, par le chemin le plus court, en passant alternativement de salle en couloir.`,
rules:[
`Ils bougent à cause des <b>cartes Événement</b>, des <b>jets de bruit</b>, d'un effet qui les <b>repousse</b> et de l'<b>activation de la Reine</b>.`,
`<b>Règles générales :</b> ils se déplacent en groupe vers le personnage le plus proche, par le chemin le plus court (en <b>ignorant les portes</b> pour le calculer). D'un couloir, ils vont dans la salle adjacente ; d'une salle, dans le couloir adjacent.`,
`Si plusieurs Intrus doivent entrer d'un couloir dans une salle occupée par un personnage, <b>seul le plus gros</b> y entre, et il attaque aussitôt (sauf jeton Sécurisation). Un Intrus dans une salle avec un personnage <b>ne bouge pas</b> : il reste en combat.`,
`<b>Cartes Événement :</b> une icône de couloir orientée fait bouger tous les Intrus des couloirs de cette orientation vers une salle adjacente ; l'icône « salle » fait sortir tous les Intrus des salles vers un couloir. On traite les groupes un par un, en partant du haut à gauche, rangée par rangée.`,
`<b>Priorités de cible :</b> le personnage le plus proche ; à égalité, celui qui a déclenché l'attaque ou le déplacement ; puis le premier dans l'ordre du tour.`,
`<b>Égalités de chemin :</b> à longueur égale, le chemin qui commence par le couloir ou la salle au plus petit numéro de référence. Si le couloir visé est plein (6), ils prennent un autre chemin de même longueur s'il existe ; sinon, ceux qui peuvent entrer le font et les autres attendent.`,
`<b>Repousser :</b> l'Intrus s'éloigne du personnage qui le repousse (qui choisit le couloir quand il le repousse d'une salle). Sans personnage adjacent, il va vers le couloir ou la salle au plus petit numéro. Il ne sort jamais d'un couloir inexploré, détruit une porte fermée au lieu de la franchir, et attaque s'il est repoussé dans une salle occupée.`,
`<b>Couloir plein :</b> les plus gros passent en priorité. En déplacement, les petits cèdent simplement leur place (sans attaque) ; en placement, les petits sont retirés. Ceux qui ne peuvent pas bouger restent où ils sont.`,
`Un Intrus blessé qui va dans un couloir défausse ses cubes de touches.`],
faq:[
`Les Intrus ne se déplacent pas vers les personnages qui sont dans le vaisseau.`],
cas:[
{q:`Deux personnages sont à égale distance d'un groupe d'Intrus. Le jet de bruit qui les a fait bouger a été fait par le second dans l'ordre du tour. Vers qui vont-ils ?`,o:[`Le premier dans l'ordre du tour`,`Celui qui a fait le jet de bruit`,`Au hasard`],a:1,w:`À égalité de distance, le personnage qui a déclenché le déplacement passe avant l'ordre du tour.`}],
quiz:[
{q:`Un Adulte est dans votre salle. Une carte Événement fait bouger les Intrus des salles. Que fait-il ?`,o:[`Il sort vers un couloir`,`Il reste : un Intrus en combat ne bouge pas`,`Il vous attaque deux fois`],a:1,w:`Un Intrus dans une salle avec un personnage reste en combat, sauf s'il est repoussé.`}]},

{id:'attaques',part:'Les Intrus',t:'Les attaques des Intrus',
lead:`Un Intrus attaque dès qu'il entre dans une salle occupée, et chaque Intrus attaque en phase Intrus. Les Larves, elles, vous infectent.`,
rules:[
`<b>Attaque standard :</b> piochez une carte <b>Attaque d'Intrus</b>, cherchez l'icône du type d'Intrus qui attaque et résolvez l'effet associé, puis défaussez la carte. On ne remélange que si le jeu le demande.`,
`<b>Cible :</b> le joueur qui a provoqué l'arrivée de l'Intrus ; sinon, le premier dans l'ordre du tour parmi ceux de la salle.`,
`<b>Phase Intrus :</b> dans chaque salle, chaque Intrus attaque un personnage. On commence par la salle en haut à gauche, rangée par rangée ; les plus gros attaquent d'abord, tous sur le premier dans l'ordre du tour, sauf s'il meurt ou quitte la salle.`,
`<b>Attaque de Larve :</b> pas de carte Attaque. Le personnage reçoit 1 carte <b>Contamination</b> dans sa défausse et la Larve va sur son plateau Personnage : il est <b>infecté</b>. S'il en avait déjà une, la Larve qui attaque est défaussée.`,
`<b>Empêcher une attaque :</b> certains effets l'annulent entièrement : aucune carte piochée, aucun effet.`,
`Il est impossible d'attaquer un autre personnage. Mais l'enfermer dans une salle en flammes n'est pas une attaque…`],
cas:[
{q:`Phase Intrus : un Guerrier et un Adulte sont dans une salle avec Alice (première dans l'ordre du tour) et Bruno. Qui attaque qui ?`,o:[`Le Guerrier attaque Alice, l'Adulte attaque Bruno`,`Les deux attaquent Alice, le Guerrier d'abord`,`L'Adulte attaque Alice, puis le Guerrier`],a:1,w:`Tous les Intrus d'une salle attaquent le même personnage (le premier dans l'ordre du tour), en commençant par les plus gros, sauf s'il meurt ou quitte la salle.`}],
quiz:[
{q:`Une Larve vous attaque alors que vous avez déjà une Larve sur votre plateau. Que se passe-t-il ?`,o:[`Vous mourez`,`Vous recevez 1 Contamination et la Larve qui attaque est défaussée`,`Rien`],a:1,w:`Vous recevez quand même la carte Contamination ; la seconde Larve est défaussée.`}]},

/* ======================= COMBAT ======================= */
{id:'tir',part:'Combat',t:'Le tir et la mêlée',
lead:`Dans une salle, les Intrus sont agiles : chaque touche augmente la chance de les tuer, sans jamais la garantir.`,
rules:[
`<b>Tir</b> (1 carte) : choisissez une arme à distance dans vos mains, avec au moins 1 jeton Munitions (même à moitié) et sans panne, et un Intrus de votre salle. Le tir au coup par coup ne dépense pas de munitions (sauf résultat particulier).`,
`<b>1.</b> Infligez 1 touche : quoi qu'il arrive, un cube à côté du socle. <b>2.</b> Lancez le dé Tir : <b>Coup critique</b> = l'Intrus meurt ; <b>2 à 5</b> = l'Intrus meurt si le chiffre est <b>inférieur ou égal</b> au nombre de cubes sur lui ; la face <b>munitions</b> = pris de panique, vous dépensez des munitions.`,
`<b>Mêlée</b> (1 carte), avec ou sans arme : <b>1.</b> recevez 1 carte Contamination ; <b>2.</b> choisissez un Intrus de votre salle ; <b>3.</b> 1 touche ; <b>4.</b> dé Tir (critique : mort ; 2 à 5 : comme au tir ; dernière face : aucun effet) ; <b>5.</b> s'il survit, il <b>riposte</b> : une attaque d'Intrus, sauf si vous mettez un marqueur Panne sur l'une de vos armes pour la parer.`,
`<b>Le dé Tir</b> a 8 faces : <b>1 critique, un 2, un 3, deux 4, deux 5 et 1 munitions</b>. Chance de tuer un Adulte : 1 touche (premier tir) 12,5 % ; 2 touches 25 % ; 3 touches 37,5 % ; 4 touches 62,5 % ; 5 touches ou plus 87,5 %. Mieux vaut l'affaiblir dans un couloir… ou ne pas rester là.`,
`<b>Larves :</b> 1 touche les tue, quel que soit le dé. <b>Guerriers :</b> dans une salle, ils se tirent comme des Adultes. <b>Reine :</b> ses touches vont sur sa piste (chapitre La Reine).`,
`Chaque carte Arme ajoute ses propres effets selon certains résultats ; appliquez-les en plus.`],
faq:[
`<b>Effets d'arme :</b> un effet d'arme lié à un résultat du dé s'applique <b>en plus</b> de l'effet normal, sauf si l'arme dit « au lieu de ». Par exemple, sur la face Munitions du dé Tir, vous dépensez quand même une munition, même si votre arme transforme ce résultat en un autre.`],
lab:'tir',
cas:[
{q:`Un Adulte porte déjà 2 cubes. Vous tirez et faites 3. Que se passe-t-il ?`,o:[`Il survit : 3 est plus grand que 2`,`Il meurt : avec le nouveau cube il en a 3, et 3 ≤ 3`,`Il meurt seulement sur un critique`],a:1,w:`La touche est posée avant le jet : 3 cubes. 3 est inférieur ou égal à 3, l'Adulte meurt.`}],
quiz:[
{q:`Un tir dans une salle consomme-t-il des munitions ?`,o:[`Toujours`,`Non, sauf sur la face qui le demande`,`Seulement contre la Reine`],a:1,w:`Le coup par coup ne dépense rien ; seule la face « panique » fait dépenser des munitions. Il faut quand même une arme chargée.`},
{q:`Que coûte une attaque de mêlée, en plus de la carte Action ?`,o:[`Rien`,`1 carte Contamination`,`1 jeton Munitions`],a:1,w:`Toucher ces organismes n'est pas bon pour la santé : vous recevez toujours 1 Contamination.`}]},

{id:'rafale',part:'Combat',t:'La rafale et la grenade',
lead:`Regroupés dans un couloir étroit, les Intrus sont vulnérables : une rafale peut en tuer plusieurs d'un coup.`,
rules:[
`<b>Rafale</b> (1 carte) : une arme à distance chargée et sans panne, et un <b>couloir adjacent</b> (pas derrière une porte fermée).`,
`Dépensez des munitions et lancez le dé Rafale (6 faces : <b>trois 1, un 2, un 3, un 4</b>) : une fois sur deux, une seule touche ; 2 en moyenne. La face 4 porte aussi une icône spéciale qui déclenche l'effet éventuel de l'arme ou de l'action.`,
`Répartissez les touches comme vous voulez : <b>1 au plus</b> par Adulte et par Larve, <b>exactement 2</b> par Guerrier, autant que vous voulez à la Reine (jusqu'au bout de sa piste). Les touches restantes sont perdues.`,
`Dans un couloir, <b>1 touche tue</b> un Adulte ou une Larve ; un Guerrier meurt avec ses 2 touches. Les touches à la Reine font avancer sa piste.`,
`Les Intrus des couloirs ne gardent pas leurs blessures.`,
`<b>Grenade</b> (jeton tactique) : dé Rafale + 2, soit 3 à 6 touches (3 une fois sur deux) dans un couloir adjacent ; ce n'est pas une rafale, les effets d'arme ne s'appliquent pas. <b>Contrôle des tourelles</b> (salle) : un dé Rafale de touches sans dépenser de munitions.`],
lab:'rafale',
cas:[
{q:`Un couloir contient 1 Guerrier et 2 Adultes. Vous faites 3 à la rafale. Que pouvez-vous tuer au mieux ?`,o:[`Les 3 Intrus`,`Le Guerrier et 1 Adulte, ou les 2 Adultes`,`Seulement le Guerrier`],a:1,w:`Le Guerrier prend exactement 2 touches : 2 + 1 = le Guerrier et un Adulte. Ou 1 + 1 sur les deux Adultes, la 3e touche étant perdue (pas d'1 seule touche sur un Guerrier).`}],
quiz:[
{q:`Pouvez-vous mettre 2 touches sur le même Adulte d'un couloir ?`,o:[`Oui`,`Non : 1 au plus par Adulte`],a:1,w:`Chaque Adulte et chaque Larve ne reçoit qu'une touche ; une suffit à le tuer.`}]},

{id:'reine',part:'Combat',t:'La Reine',
lead:`La Reine est un ennemi unique, résistant et agressif. On ne la tue pas avec des cubes : il faut épuiser ses cartes Santé.`,
rules:[
`Ses touches font avancer le cube de la <b>piste des touches portées à la Reine</b>, une case par touche, au lieu de poser des cubes sur sa figurine.`,
`Quand le cube atteint le bout de la piste : ignorez les autres touches de cette action, révélez la première <b>carte Santé de la Reine</b>, défaussez sans les révéler autant de cartes de sa pioche que le numéro indiqué, résolvez l'effet du bas de la carte (même si la Reine vient de mourir), défaussez-la et remettez le cube à 0.`,
`Quand sa dernière carte Santé est défaussée, la Reine meurt : retirez sa figurine, ignorez les effets qui la font apparaître et retournez l'aide de jeu Intrus côté « La Reine est morte ». Les jetons Reine font alors apparaître des Guerriers puis quittent la partie, et les Guerriers et Adultes tirés en phase Événement ajoutent des Larves au lieu de Reines.`,
`<b>Activation</b> (le plus souvent avec un jeton Reine du sac) : elle attaque un personnage de sa salle si possible ; sinon, elle se déplace une fois vers le plus proche, avec les mêmes priorités que les autres Intrus.`,
`Dans un couloir, elle compte pour 4 Intrus ; avec elle, il ne peut y avoir que 2 autres Intrus. Une rafale peut lui donner autant de touches que vous voulez.`],
faq:[
`<b>Tirer sur la Reine</b> fonctionne exactement comme sur un Adulte, mais au lieu de retirer la figurine, vous résolvez sa carte Santé. Par exemple, avec 2 touches sur sa piste, un 2 (ou moins) ou un coup critique vous fait résoudre la carte du dessus de sa pioche Santé.`],
quiz:[
{q:`Le cube de la piste est sur l'avant-dernière case et votre rafale donne 3 touches à la Reine. Que se passe-t-il ?`,o:[`Les 3 touches comptent, le cube repart de 2`,`Le cube atteint le bout : les autres touches sont ignorées, on résout une carte Santé`,`Rien, il faut un critique`],a:1,w:`Au bout de la piste, les touches restantes de l'action sont ignorées ; résolvez une carte Santé, puis remettez le cube à 0.`},
{q:`Un jeton Reine est tiré du sac en phase Événement alors que la Reine n'est pas sur le plateau. Effet ?`,o:[`Elle apparaît dans le nid`,`Ajoutez 2 Larves dans le sac`,`Rien`],a:1,w:`Colonne « sac Intrus » : Reine sur le plateau = activation ; sinon, 2 jetons Larve dans le sac.`}]},

/* ======================= SURVIVRE ======================= */
{id:'contamination',part:'Survivre',t:'Contamination, infection et éclosion',
lead:`Les Intrus sont aussi un danger biologique. Les cartes Contamination encombrent votre main et préparent votre mort en fin de partie.`,
rules:[
`Une carte Contamination reçue va dans votre <b>défausse</b>. Elle a le même dos que vos cartes Action mais <b>ne peut pas</b> payer une action.`,
`Chaque carte cache un texte. Le <b>scanner</b> le révèle : si le mot <b>« Infectée »</b> apparaît, la carte est infectée (et vous aussi). Attention aux faux mots très proches !`,
`L'effet qui vous fait scanner (objet, action, salle) dit quoi faire d'une carte infectée ; le plus souvent, la procédure d'infection.`,
`<b>Procédure d'infection :</b> scannez toutes les Contaminations de votre main ; s'il y en a une infectée, placez une Larve sur votre plateau (sauf s'il y en a déjà une) ; puis mettez toutes les Contaminations de votre main dans votre défausse.`,
`<b>Procédure d'éclosion :</b> tirez 4 cartes de votre pioche Action. Aucune Contamination : vous survivez et défaussez votre main. Au moins une : votre personnage est tué. En cours de partie, posez alors 1 Adulte dans votre salle ; s'il y a un autre personnage, il l'attaque.`,
`Une Larve sur votre plateau n'a pas d'effet immédiat, mais elle réduit fortement vos chances de survie à la fin. Le Bloc opératoire permet de la retirer.`,
`Pour se débarrasser des Contaminations : l'Abri (retire celles de votre main sans les scanner, si vous n'avez pas de Larve) et la Salle de décontamination (toutes celles de votre pioche et de votre défausse).`],
quiz:[
{q:`Pouvez-vous défausser une carte Contamination pour payer un déplacement ?`,o:[`Oui`,`Non`],a:1,w:`Les Contaminations ne peuvent jamais payer une action. En revanche, vous pouvez les défausser quand vous passez.`},
{q:`Pendant une éclosion, vous tirez 4 cartes dont 1 Contamination. Résultat ?`,o:[`Vous survivez`,`Votre personnage est tué`,`Vous recevez une Larve`],a:1,w:`Une seule Contamination parmi les 4 cartes suffit : l'hôte est tué.`}]},

{id:'objets',part:'Survivre',t:'Les objets',
lead:`Chaque personnage commence avec un objet de personnage (et un équipement de soutien). Les autres objets se trouvent en fouillant le complexe.`,
rules:[
`<b>Fouille</b> (carte Action) : piochez 1 carte Objet par icône Objet de la salle (rouge, vert, jaune), gardez-en 1 et remettez les autres sous leur paquet, sans les montrer.`,
`<b>Objets communs</b> (format portrait) : ils vont dans votre <b>sac à dos</b> (le porte-cartes), sans limite, et restent secrets jusqu'à leur utilisation. Utilisez-les avec l'action Utiliser un objet.`,
`<b>Objets lourds</b> (format paysage) : un par emplacement de main (2 mains). Toutes les armes sont lourdes, et les <b>œufs</b> aussi. Mains pleines ? Défaussez un objet porté pour prendre le nouveau.`,
`<b>Objets passifs :</b> leur effet s'applique tout seul quand les conditions sont réunies ; on ne les « utilise » jamais.`,
`Mots-clés : <b>Arme à distance</b> (nécessaire pour le tir et la rafale), <b>Arme de mêlée</b> (bien plus efficace en mêlée), <b>Usage unique</b> (défaussé après usage), <b>Sans munitions</b> (fonctionne sans jeton ; elle compte comme chargée), <b>Armure</b> (sur la section État critique).`,
`Perdre un objet fait perdre ses jetons tactiques.`,
`<b>Interaction :</b> avec son accord, vous pouvez utiliser un objet sur un personnage de votre salle s'il lui fait regagner de la santé, défausser une blessure grave, défausser une panne de ses objets ou récupérer de l'oxygène. Sinon, il faut échanger.`,
`<b>Échanger</b> (1 carte, hors combat) : tous les personnages de votre salle peuvent révéler et s'échanger objets et jetons tactiques, avec vous et entre eux (avec votre accord). Donner sans contrepartie est permis.`],
faq:[
`<b>Sans munitions :</b> une carte ou un effet peut quand même vous faire « dépenser » des munitions d'une arme qui a ce mot-clé.`,
`<b>Arme en panne :</b> vous ne pouvez pas dépenser ses munitions, même pour une carte Action ou un autre effet.`,
`<b>Échanger :</b> un objet reçu en échange est « gagné » : vous pouvez l'utiliser aussitôt (des munitions, par exemple).`,
`<b>Interaction :</b> elle vaut pour toutes les formes d'action (cartes Action, cartes Objet, jetons tactiques…), si le personnage qui en profite est d'accord et que l'effet fait partie des 4 cités. Les autres effets, et ce qui n'est pas une action, ne s'utilisent pas sur un autre personnage.`,
`<b>Le ruban adhésif :</b> il permet de tenir un 3e objet dans une même main.`,
`<b>La barricade portable :</b> une porte qu'elle a posée disparaît une fois ouverte.`],
quiz:[
{q:`Vous fouillez le Contrôle du recycleur A (icônes verte et rouge). Combien de cartes piochez-vous ?`,o:[`1`,`2, et vous en gardez 1`,`2, et vous les gardez`],a:1,w:`1 carte par icône Objet : 1 verte et 1 rouge. Vous en gardez 1 et remettez l'autre sous son paquet.`},
{q:`Où va un œuf que vous ramassez dans le nid ?`,o:[`Dans le sac à dos`,`Dans un emplacement de main : c'est un objet lourd`,`Sur la ceinture tactique`],a:1,w:`Les œufs sont des objets lourds.`}]},

{id:'robot',part:'Survivre',t:'Le robot',
lead:`Un robot attend dans l'hibernatorium. Sa spécialité, tirée au hasard, n'est connue qu'une fois qu'on l'a atteint. Il ne fait que ce qu'on lui demande.`,
rules:[
`La carte Robot est révélée quand une salle est reliée à l'hibernatorium pour la première fois. Le robot peut alors être activé. Il existe 6 cartes Robot ; une seule sert par partie.`,
`<b>Activer le robot</b> (hors combat) : 1 carte si vous êtes dans sa salle ; à distance, depuis une salle avec <b>ordinateur</b>, en payant 1 carte de plus. Avec un <b>jeton Info</b> (Salle des serveurs), l'activation à distance ne coûte pas de carte supplémentaire.`,
`Le robot ne bouge que par les actions des joueurs, de salle en salle voisine. Il ignore les Intrus (et ils l'ignorent), mais ne franchit pas les portes fermées, n'explore jamais (sauf le robot d'exploration) et ne fait jamais de jet de bruit.`,
`Il commence avec 1 jeton Munitions et 1 jeton Oxygène. Dans sa salle, l'action Utiliser un équipement tactique vous permet d'utiliser ses jetons et d'échanger des jetons avec lui (sauf ceux de vos armes).`,
`Robot en panne : il ne fait rien, mais ses jetons et les effets qui demandent sa présence restent utilisables. Dans sa salle, vous pouvez défausser la panne depuis le robot.`],
quiz:[
{q:`Combien coûte l'activation du robot à distance, depuis une salle avec ordinateur, sans jeton Info ?`,o:[`1 carte`,`2 cartes`,`3 cartes`],a:1,w:`1 carte pour l'action + 1 carte de plus à distance. Le jeton Info supprime ce supplément.`}]},

{id:'evasion',part:'Survivre',t:'Vaisseau, DCA, autodestruction',
lead:`Pour gagner, il faut sortir vivant (ou hiberner). Trois portes de sortie, chacune avec ses risques.`,
rules:[
`<b>DCA :</b> 2 jetons empilés ; celui du dessus dit si la DCA est active. Le Contrôle du recycleur B permet de les consulter en secret et de les réordonner. Vous pouvez dire ce que vous avez vu, ou mentir, mais pas les montrer.`,
`<b>Arrivée du vaisseau</b> (compte-tours sur la case du jeton Vaisseau) : révélez le jeton DCA du dessus. <b>Active</b> : le vaisseau est abattu, retirez son jeton. <b>Inactive</b> (ou jetons retirés par le Réacteur) : il se pose dans la zone d'atterrissage et les jetons DCA sont retirés.`,
`<b>Embarquer :</b> action de salle de la zone d'atterrissage, avec jet de bruit (échec si un Intrus est dans la salle après le jet). Placez votre figurine sur l'emplacement DCA vide. À bord, votre tour est ignoré, vous ne perdez ni oxygène ni santé, vous piochez normalement en Nettoyage ; si un Intrus apparaît dans la zone d'atterrissage, tous les passagers débarquent.`,
`<b>Décoller :</b> au début de la phase Événement, n'importe quel passager peut décider, seul, de faire décoller le vaisseau. Tous ceux à bord sont échappés.`,
`<b>Navette d'évacuation :</b> jet de bruit pour y entrer ; une seule place. La DCA ne l'arrête pas. <b>Hibernatorium :</b> jet de bruit pour hiberner, s'il a été activé ; mais si le complexe est détruit, les hibernés meurent.`,
`<b>Autodestruction</b> (Système de refroidissement) : posez le jeton à 5 manches de la manche en cours (4 cases entre les deux), ou après la dernière case s'il en reste moins. Quand le compte-tours l'atteint, le complexe explose : tout le monde encore dedans meurt, hibernatorium compris. Seul le <b>Réacteur</b> peut l'arrêter.`],
faq:[
`<b>Autodestruction en fin de partie :</b> si elle est enclenchée quand la partie se termine, le complexe explose quand même, avant la séquence de fin de partie.`],
cas:[
{q:`Vous êtes à bord du vaisseau avec Bruno. Au début de la phase Événement, vous voulez partir mais Bruno veut attendre Carla. Qui décide ?`,o:[`Il faut l'accord de tous`,`N'importe quel passager peut décoller seul`,`Le premier joueur`],a:1,w:`Faire décoller le vaisseau n'est pas une décision collective. Bruno part avec vous puisqu'il est à bord.`}],
quiz:[
{q:`Le vaisseau est abattu. Pouvez-vous encore partir avec la navette ?`,o:[`Oui, la DCA n'empêche pas la navette`,`Non`],a:0,w:`La DCA ne vise que le vaisseau. La navette n'a qu'une place.`},
{q:`Hiberner vous protège-t-il de l'autodestruction ?`,o:[`Oui`,`Non : les personnages en hibernation meurent si le complexe est détruit`],a:1,w:`L'hibernatorium est dans le complexe.`}]},

{id:'fin',part:'Survivre',t:'Fin de partie et victoire',
lead:`Quand la partie s'arrête, les survivants passent encore deux épreuves avant de révéler leur objectif.`,
rules:[
`La partie s'arrête à la fin de la manche 14 (ceux qui ne sont ni partis ni en hibernation sont morts), quand plus aucun personnage n'est en jeu, ou quand le complexe est détruit (autodestruction, feu généralisé).`,
`Les personnages vivants, échappés ou en hibernation résolvent, dans l'ordre :`,
`<b>1. Sans Larve sur votre plateau :</b> prenez en main votre pioche et votre défausse, puis résolvez une <b>procédure d'infection</b>. Si elle fait apparaître une Larve, vous devez résoudre une procédure d'éclosion.`,
`<b>2. Avec une Larve :</b> prenez 1 carte Contamination, prenez en main toutes vos cartes (pioche, défausse, main), mélangez-les et résolvez une <b>procédure d'éclosion</b>.`,
`<b>3. Toujours en vie :</b> révélez votre objectif (si vous n'en aviez pas choisi, choisissez-le maintenant, avant les autres révélations). <b>4.</b> Objectif accompli : vous gagnez !`,
`Un personnage échappé compte comme échappé même s'il meurt à l'éclosion. Un personnage en hibernation n'est pas échappé.`,
`La mission de l'escouade est révélée dès le départ et ne change jamais. La plupart des objectifs de mission (pas tous) poussent à l'accomplir.`],
lab:'fin',
quiz:[
{q:`Vous avez une Larve à la fin. Avant l'éclosion, que faites-vous ?`,o:[`Rien`,`Vous prenez 1 carte Contamination de plus et mélangez toutes vos cartes`,`Vous scannez votre main`],a:1,w:`Avec une Larve : +1 Contamination, toutes vos cartes mélangées, puis éclosion.`},
{q:`Vous n'avez pas choisi d'objectif avant la fin. Que se passe-t-il ?`,o:[`Vous perdez`,`Vous le choisissez maintenant, avant les révélations des autres`,`Vous gardez les deux`],a:1,w:`Le choix se fait à ce moment-là, si vous êtes encore en vie.`}]},

{id:'modes',part:'Survivre',t:'Mode mortel, solo et coop',
lead:`Deux variantes officielles : un mode plus dur pour tous, et un mode entièrement coopératif, jouable seul.`,
rules:[
`<b>Mode mortel :</b> les couloirs qui ont une seconde valeur de bruit (le petit chiffre) utilisent <b>les deux</b> valeurs pour tous les effets. Les jets de bruit deviennent bien plus dangereux. Un couloir renforcé vaut toujours 0. Pour départager, utilisez seulement la valeur standard.`,
`<b>Solo et coop, mise en place :</b> au lieu d'une Mission de l'escouade, piochez autant de cartes <b>Mission de l'escouade Solo/Coop</b> qu'il y a de joueurs. Ne tirez pas d'objectifs standard.`,
`<b>Victoire :</b> toutes les missions de l'escouade doivent être réussies et au moins 1 personnage doit survivre. Si plusieurs missions demandent la même chose (un jeton Info, par exemple), il faut la remplir autant de fois. Si on vous demande plus de jetons Info qu'il n'y a de personnages, il en faut autant que de personnages.`,
`<b>Réanimer :</b> le bloc opératoire a un AutoDoc. Un personnage tué est couché, ses objets défaussés. Un personnage de sa salle peut payer 1 carte de plus pour le porter en se déplaçant. S'il commence la manche au bloc opératoire (sans Intrus ni panne), il est réanimé : blessures graves défaussées, cube sur la première case de la section Affaibli.`,
`<b>Difficulté :</b> retirez ou ajoutez des missions de l'escouade à la mise en place.`],
faq:[
`<b>Errata :</b> les missions Solo/Coop n° 3 et n° 11 (<i>CLOSEDOWN</i> et <i>SHUTDOWN</i>) ne peuvent jamais être en jeu ensemble. Si vous les tirez toutes les deux, défaussez la dernière tirée et tirez-en une autre.`],
quiz:[
{q:`En coop à 3 joueurs, combien de missions de l'escouade ?`,o:[`1`,`3`,`3 + 1 par Larve`],a:1,w:`Autant de cartes Mission de l'escouade Solo/Coop que de joueurs (à ajuster pour la difficulté).`},
{q:`En mode mortel, un couloir porte 2 et un petit 4. Sur quels résultats est-il concerné ?`,o:[`2 seulement`,`2 et 4`,`4 seulement`],a:1,w:`En mode mortel, il a les deux valeurs pour tous les effets (mais seulement 2 pour départager).`}]}
];
