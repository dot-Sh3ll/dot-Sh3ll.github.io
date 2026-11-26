const COL={r:'rouge',g:'vert',b:'bleu',w:'blanc'};
const KEYS=['r','g','b','w'];
const FEM={r:'rouge',g:'verte',b:'bleue',w:'blanche'};
const rnd=n=>Math.floor(Math.random()*n);
const shuffle=a=>{for(let i=a.length-1;i>0;i--){const j=rnd(i+1);[a[i],a[j]]=[a[j],a[i]]}return a};
const SAVE='mk-fantome-v1';
/* ---------- Scénarios ---------- */
const FW_SOLO=`Cadre solo du livret : un joueur Fantôme. Vous choisissez votre Tactique en premier, il en tire une au hasard, et les deux sont retirées pour le reste de la partie. Retirez les quatre Sorts interactifs (n° 17 à 20) et la Compétence interactive de votre Héros.`;
const FW_COOP=`Cadre coopératif du livret : un joueur Fantôme, qui tire sa Tactique au hasard avant vous. À la fin de chaque Manche, retirez du jeu une des Tactiques utilisées par les joueurs. Retirez les quatre Sorts interactifs (n° 17 à 20) et la Compétence interactive de chaque Héros. Pas de combat entre joueurs.`;
const BLITZ=`Bonus des scénarios Éclair : vous commencez avec 1 point de Gloire et 2 points de Réputation ; chaque nouvelle ligne atteinte sur l'Échelle de Gloire donne 1 point de Gloire de plus ; un dé de plus dans la Source et une Unité de plus dans l'Offre.`;
const SC_SOLO=`Score : votre Gloire, les Hauts Faits sans les titres, puis 10 points par Cité conquise, 15 de plus si toutes le sont, 30 par Manche non utilisée, 1 par carte restant dans le Deck du Fantôme et 5 si la fin de la Manche en cours n'était pas annoncée.`;
const SC_COOP=`Score d'équipe : la Gloire du joueur le moins avancé, puis pour chaque Haut Fait le meilleur des deux joueurs, sans les titres. Ajoutez 10 points par Cité conquise, 10 si chaque joueur est Seigneur d'au moins une Cité, 15 si toutes sont conquises, 30 par Manche non utilisée, 1 par carte restant dans le Deck du Fantôme et 5 si la fin de la Manche en cours n'était pas annoncée.`;
const ADAPT=`Le livret autorise à jouer n'importe quel scénario en solo avec le cadre de Conquête en solo, sans préciser le nombre de tuiles pour un joueur : ce compagnon reprend les valeurs prévues pour 2 joueurs.`;
const MINES_R=[`Mine révélée, y compris sur les tuiles posées à la mise en place : posez-y un jeton Ennemi face visible, vert sur une tuile Campagne, rouge sur une tuile Royaume, et un jeton marron face cachée. Disposez-les pour que le marron reste bien visible : ce ne sont pas des ennemis errants. S'il manque des jetons marron, piochez-les seulement au moment de les révéler.`,`Libérer une Mine est votre action, en entrant sur sa case : vous combattez les deux ennemis avec les règles de Nuit, comme dans un Donjon, mais vos Unités participent. Un survivant reste en place et pourra être attaqué plus tard.`,`Celui qui élimine le dernier ennemi libère la Mine : jeton Bouclier et +1 Réputation (+2 sur une tuile Royaume). Une Mine ne produit rien tant qu'elle est occupée ; libérée, elle produit tout de suite : un Cristal dès la fin de ce tour.`,`Au début de chaque Manche, chaque Mine libérée donne un Cristal de sa couleur à celui qui l'a libérée, où qu'il soit.`];
const DRUID_R=[`Finir votre Mouvement dans une Clairière Magique vous permet de l'activer : posez-y un jeton Bouclier. Ce n'est pas une action. Une Clairière peut porter plusieurs Boucliers, un par joueur.`,`Une fois pendant la première Nuit, sur une case qui n'est pas un site habité, vous pouvez lancer une incantation : c'est votre action. Piochez un monstre marron par Clairière que vous avez activée et combattez-les.`,`Chaque monstre vaincu rapporte le double de sa Gloire. Les autres disparaissent à la fin du combat, mais leurs Blessures restent. Chaque monstre invoqué, vaincu ou non, donne en fin de tour un Cristal tiré au dé, comme dans un Antre.`,`À la fin de la première Nuit, retirez tous les Boucliers des Clairières : il faut les réactiver pour la seconde incantation.`,`Seconde Nuit : nouvelle incantation, cette fois avec des ennemis rouges. Gloire doublée, et deux Cristaux par ennemi invoqué.`];
const HOME=`Scénario maison, écrit pour ce compagnon et non testé sur table : ajustez librement s'il se révèle trop dur ou trop facile.`;
const VK_BASE=`Volkare remplace le joueur Fantôme et compte comme un joueur : la Source contient joueurs réels + 3 dés, l'Offre des Unités joueurs réels + 3 cartes.`;
const VK_DECK=`Deck de Volkare : les 16 cartes Action Basique d'un Héros inutilisé, les quatre Sorts interactifs (n° 109 à 112) et des Blessures selon le Niveau de Poursuite. Il n'est jamais remélangé. Remplacez les Compétences interactives par les Compétences coopératives ; en solo, ajoutez à l'Offre commune une Compétence d'un autre Héros tiré au hasard après chacun de vos Niveaux.`;
const VK_TAC=`Tactiques : les joueurs choisissent d'abord, puis Volkare tire la sienne parmi les restantes. En solo, votre Tactique est retirée du jeu à la fin de la Manche ; en coopération, aucune ne l'est.`;
const VK_FIGHT=`Combattre Volkare, c'est affronter toute son armée plus sa propre attaque, tirée au dé, toujours Brutale et Assassin. Volkare ne peut pas être ciblé : il est vaincu quand toutes ses troupes le sont. Elles ne sont pas Fortifiées, sauf dans un site fortifié ou à travers un Rempart.`;
const VK_COOP=`À deux, vous pouvez attaquer ou défendre ensemble : répartissez d'un côté les troupes d'élite (blanches et rouges), de l'autre les régulières (grises et vertes), puis chacun combat sa part et subit l'attaque de Volkare.`;
const VK_END=`Volkare n'annonce jamais la fin de la Manche et ne joue pas de dernier tour. À chaque tour, il révèle une carte : le compagnon vous dit quoi faire.`;
const VK_RET=`Tant que la Cité n'est pas révélée, Volkare explore au gré de ses cartes. Dès qu'elle l'est, il s'y rend par le plus court chemin. Chaque Blessure révélée peut faire partir une Unité Indécise de l'Offre, qui ajoute un jeton gris à son armée.`;
const VK_CITY=`Quand Volkare, adjacent à la Cité, doit avancer, il lui donne l'assaut. Cité non conquise : vous perdez. Cité conquise mais non défendue : il la pille, et à la seconde fois vous perdez. Si vous la défendez et qu'il perd au moins un jeton par joueur, il recule d'une case.`;
const VK_MAP=`Plateau ouvert limité à 4 colonnes ; le Camp de Volkare est la tuile de départ la plus à gauche, et sa case n'a aucun effet.`;
const VK_QMAP=`Plateau de forme imposée par le livret, le Camp de Volkare à l'opposé du Portail. Toutes les tuiles sont posées face cachée, sauf le Camp, le Portail et les 3 tuiles qui le touchent.`;
const VK_LV=`Niveaux de la Cité et de Volkare, Blessures de son Deck et Unités marquées : réglés dans l'onglet Partie, selon les Niveaux de Combat et de Poursuite.`;
const VK_RWIN=`Victoire dès que toute l'armée de Volkare est éliminée. Défaite s'il atteint la Cité avant vous, s'il la pille deux fois, ou si la dernière Manche se termine.`;
const VK_RSC=`Score collectif : la Gloire du joueur le moins Glorieux, les Hauts Faits du meilleur joueur par catégorie, sans titres, et 20 points si la Cité est conquise. Volkare vaincu : 30, 40 ou 50 points selon le Niveau de Combat, plus 2 par carte restant dans son Deck, bonus multiplié par 1, 1,5 ou 2 selon le Niveau de Poursuite.`;
const VK_QUE=`Volkare marche vers le Portail sans révéler les tuiles. Quand il arrive à 3 cases du Portail, celui-ci se ferme : il devient une case ordinaire, et un joueur qui s'y trouve est exclu de la partie. Les Blessures révélées font partir des Unités Effrayées de l'Offre, sans renforcer son armée.`;
const VK_QSLOW=`Si Volkare perd, avant son tour, au moins deux fois plus de jetons qu'il y a de joueurs, il passe son prochain tour : ne touchez pas au bouton de son tour cette fois-là.`;
const VK_QWIN=`Victoire dès que toute l'armée de Volkare est éliminée. Défaite s'il entre sur le Portail puis doit encore avancer.`;
const VK_QSC=`Score collectif : la Gloire du joueur le moins Glorieux, les Hauts Faits du meilleur joueur par catégorie, sans titres, et 5 points par Cité conquise. Volkare vaincu : 30, 40 ou 50 points selon le Niveau de Combat, plus 2 par carte restant dans son Deck, bonus multiplié par 1, 1,5 ou 2 selon le Niveau de Poursuite.`;
const TZ_SOLO=`Joueur Fantôme. Vous choisissez votre Tactique en premier, il en tire une parmi les restantes, et les deux sont retirées du jeu à la fin de la Manche. Retirez les quatre Sorts interactifs (n° 109 à 112) et remplacez les Compétences interactives par les Compétences coopératives de La Légion Oubliée.`;
const TZ_COOP=`Joueur Fantôme, qui tire sa Tactique au hasard avant vous. Vous formez une seule équipe. Retirez les quatre Sorts interactifs (n° 109 à 112) et remplacez les Compétences interactives par les Compétences coopératives de La Légion Oubliée.`;
const TZ_CHEF=`Chef de Faction : il faut entrer sur sa case, qui n'est pas sécurisée, pour l'affronter avec ses fidèles. Chaque attaque égale à son Armure lui retire un niveau ; le détail est dans le tutoriel, chapitre « Tezla : Chefs ».`;
const TZ_SC=`Score : votre Gloire et les Hauts Faits, sans titres.`;
const TZ_SCC=`Score d'équipe : la Gloire du joueur le moins Glorieux, et pour chaque Haut Fait le meilleur joueur, sans titres.`;
const TZ_SC2=` Ajoutez 1 point par carte restant dans le Deck du Fantôme et 5 si la fin de la Manche en cours n'était pas annoncée.`;
const TZ_HIGH=`Départ à haut niveau : chaque Héros commence au Niveau 3 avec 9 points de Gloire, et se compose un Deck et une armée avec 18 points d'Influence, selon la variante du livret.`;
const TZ_REL=`Les Cités sont détruites : ni figurine ni carte. Une seule figurine par case de Cité, et y entrer coûte 2. Posez-y un Draconien face cachée, révélé dès qu'un joueur est adjacent, de Jour comme de Nuit. Il n'est pas errant : entrer sur la case, c'est le combattre. Vainqueur, vous trouvez le fragment et marquez la case d'un Bouclier.`;
const TZ_REL2=`Les Draconiens errants des tuiles Cité sont remplacés par des ennemis errants verts. Retirez les Unités d'Élite recrutables seulement en Cité. Un dé de plus dans la Source et une Unité de plus dans l'Offre. +1 Gloire par ligne atteinte sur l'Échelle, +1 par tuile Royaume révélée, et encore +1 si elle porte une Cité en ruines.`;
const TZ_VAL=`Regroupez tous les jetons Élémentalistes en une pile : les ennemis errants en sortent et, sauf ceux de la mise en place, gagnent Embuscade. Vaincre un Élémentaliste errant vous fait ajouter une tuile Royaume, comme une exploration, pas forcément à côté de vous.`;
const TZ_VAL2=`Explorer coûte le triple, et vous pouvez payer ce coût avec de l'Influence. Quand la tuile de la Cité blanche est posée, la Vallée Oubliée recouvre la case de la Cité, avec la Grande Prêtresse et ses fidèles. La Forteresse de cette tuile est gardée par 2 Élémentalistes verts. La Vallée n'a aucun effet avant d'être libérée.`;
const TZ_MOR=`Regroupez tous les jetons Sombres Croisés en une pile : les ennemis errants en sortent. Ceux qu'une exploration fait apparaître pendant votre tour reçoivent votre Bouclier et vous Poursuivent à partir du tour suivant.`;
const TZ_MOR2=`Chaque Clairière Magique révélée devient un Cimetière, avec des ennemis face cachée selon l'ordre de découverte : deux verts ; un vert et un marron ; un rouge ; un vert et un rouge ; un marron et un rouge.`;
const TZ_MOR3=`Libérer un Cimetière est une action, depuis sa case ; les survivants restent. Récompense selon l'ordre : Action Avancée, Sort, Unité, Artefact, puis Artefact et Action Avancée. Ensuite, sur place, dépensez un mana pour le sceller, sans action : Bouclier et +1 Réputation. Quand la tuile de la Cité bleue est posée, la Nécropole recouvre la Cité, avec le Nécromancien.`;
const TZ_VIE=`Triez les jetons verts, marron et rouges par Faction. Les ennemis errants viennent des Sombres Croisés sur les tuiles du Nord, des Élémentalistes sur celles du Sud, d'une Faction tirée au dé entre les deux ; le schéma du livret indique quelles tuiles sont au Nord et au Sud.`;
const TZ_VIE2=`Clairière Magique révélée sur une tuile Campagne : au Sud, deux Élémentalistes, un vert et un marron, face visible ; au Nord, un Cimetière et deux Sombres Croisés ; entre les deux, une Faction au hasard. Libérer le lieu est une action : vous combattez les deux ennemis, gagnez un Artefact (Clairière) ou un Sort (Cimetière), posez un Bouclier et gagnez 1 Réputation. Avant libération, le lieu n'a aucun effet.`;
const TZ_VIE3=`La Cité verte ne se place pas au Nord, la rouge pas au Sud. La Vallée Oubliée recouvre la Cité verte et abrite le Chef des Élémentalistes ; la Nécropole recouvre la Cité rouge et abrite celui des Sombres Croisés. La troisième Cité est amicale.`;
const QRULE=`Module Quêtes obligatoire (fiches 7 à 10 de l'Aide de jeu), en mode Normal par défaut. Les niveaux de Cité indiqués tiennent déjà compte des quêtes : pas de +1.`;
const QHELP=`Coup de main : un Héros sur la même case qu'un autre peut, pendant son propre tour, produire une partie des valeurs hors combat (Parade, Déplacement, Influence, Soin…) demandées par la quête de son allié.`;
const QONCE=`Un site ne propose des quêtes qu'une seule fois pour toute l'équipe.`;
const QSC_SOLO=`Réussi si l'objectif est atteint. Pour comparer vos parties : votre Gloire et les Hauts Faits sans les titres, plus 5 points par quête réussie au palier I, 10 au palier II, 15 au palier III, et 30 par Manche non utilisée.`;
const QSC_COOP=`Réussi si l'objectif est atteint. Pour comparer vos parties : la Gloire du joueur le moins avancé et les meilleurs Hauts Faits des deux, plus 5 points par quête réussie au palier I, 10 au palier II, 15 au palier III, et 30 par Manche non utilisée.`;
const SCEN=[
{id:'q-errant',n:'Le Chevalier errant',mode:'solo',src:'Maison',quest:1,d:2,r:4,t:'2 h',goal:`Réussir 5 quêtes, dont au moins une de palier II.`,
 pitch:`Pas de Cité à prendre : vous parcourez les villages et les monastères, une quête après l'autre. La meilleure porte d'entrée dans le module.`,
 setup:[`Plateau en pyramide.`,`7 tuiles Campagne : gardez en priorité celles avec Village ou Monastère.`,`2 tuiles Royaume sans Cité.`],
 rules:[FW_SOLO,QRULE,`Rappel : un Monastère ne vous propose de quêtes que si votre Réputation vous donne au moins +1 Influence.`,HOME],
 end:`Dès la cinquième quête réussie, si l'une est de palier II, jouez un dernier tour. Sinon à la fin de la quatrième Manche.`,score:QSC_SOLO},
{id:'q-heros',n:'La Voie du héros',mode:'solo',src:'Maison',quest:1,d:3,r:5,t:'3 h',goal:`Réussir une quête de palier III, sans jamais choisir la voie de la crapule.`,
 pitch:`Pour qu'une Cité vous confie ses missions, il faut une réputation sans tache. Gagnez la confiance du peuple, prenez la Cité, puis prouvez-vous digne d'elle.`,
 setup:[`Plateau en pyramide.`,`8 tuiles Campagne.`,`1 tuile Royaume avec Cité et 1 sans Cité.`,`La Cité révélée est de niveau 4.`],
 rules:[FW_SOLO,QRULE,`Voie du héros : vous ne choisissez jamais 😈, vous ne pillez aucun Village et ne brûlez aucun Monastère. Sinon, la partie est perdue.`,`Accès au palier III : votre Réputation doit vous donner au moins +2 Influence. Prendre la Cité d'assaut vous en coûtera : préparez-vous.`,HOME],
 end:`Dès la quête de palier III réussie, jouez un dernier tour. Sinon à la fin de la cinquième Manche.`,score:QSC_SOLO},
{id:'q-ombre',n:`La Confrérie de l'ombre`,mode:'solo',src:'Maison',quest:1,d:4,r:5,t:'3 h 30',long:1,goal:`Finir la partie avec une Réputation qui vous donne un malus, après avoir réussi 3 quêtes ⚫, dont une de palier III.`,
 pitch:`Les honnêtes gens vous ferment leur porte, mais la Confrérie a toujours du travail pour un Chevalier sans scrupules. Prenez une Cité et devenez son homme de l'ombre.`,
 setup:[`Plateau en pyramide.`,`8 tuiles Campagne.`,`1 tuile Royaume avec Cité et 1 sans Cité.`,`La Cité révélée est de niveau 5.`],
 rules:[FW_SOLO,QRULE,`Voie de l'ombre : quand une quête propose 😇 ou 😈, vous choisissez toujours 😈.`,`Contacts dans l'ombre : tant que votre Réputation vous donne un malus, à chaque tirage, vous pouvez remplacer le résultat d'un des deux lancers par ⚫.`,`Rappel : avec une Réputation à malus, les Monastères vous sont fermés, et dans une Cité conquise vous ne pouvez accepter qu'une quête ⚫.`,HOME],
 end:`Dès la troisième quête ⚫ réussie, si l'une est de palier III, jouez un dernier tour. Sinon à la fin de la cinquième Manche. Votre Réputation doit alors vous donner un malus.`,score:QSC_SOLO},
{id:'qc-compagnons',n:`Compagnons d'armes`,mode:'coop',src:'Maison',quest:1,d:2,r:4,t:'2 h 30',goal:`Réussir ensemble 8 quêtes, au moins 3 chacun, dont 2 de palier II.`,
 pitch:`Deux Chevaliers, un même tableau de quêtes. Partagez-vous les villages, et prêtez-vous main-forte quand une quête est trop lourde pour un seul.`,
 setup:[`Plateau ouvert, tuile de départ côté B.`,`7 tuiles Campagne : gardez en priorité celles avec Village ou Monastère.`,`2 tuiles Royaume sans Cité.`],
 rules:[FW_COOP,QRULE,QONCE,QHELP,HOME],
 end:`Dès la huitième quête réussie, si l'objectif est rempli, chaque joueur joue un dernier tour, pas le Fantôme. Sinon à la fin de la quatrième Manche.`,score:QSC_COOP},
{id:'qc-gardiens',n:'Les Gardiens du Royaume',mode:'coop',src:'Maison',quest:1,d:3,r:5,t:'3 h 30',long:1,goal:`Conquérir la Cité, puis réussir 2 quêtes de palier III, une chacun.`,
 pitch:`Le Royaume est menacé de toutes parts. Prenez la Cité, puis devenez les champions que ses habitants attendaient.`,
 setup:[`Plateau ouvert, tuile de départ côté B.`,`8 tuiles Campagne.`,`1 tuile Royaume avec Cité et 2 sans Cité.`,`La Cité est de niveau 6.`],
 rules:[FW_COOP,QRULE,QONCE,QHELP,`Gardiens : chaque Course réussie rapporte +1 Réputation aux deux Héros.`,HOME],
 end:`Dès la seconde quête de palier III réussie, chaque joueur joue un dernier tour, pas le Fantôme. Sinon à la fin de la cinquième Manche.`,score:QSC_COOP},
{id:'qc-chronique',n:'La Grande Chronique',mode:'coop',src:'Maison',quest:1,d:5,r:6,t:'4 h',long:1,goal:`Chaque Héros réussit au moins une quête de chaque palier, et l'équipe 12 quêtes au total.`,
 pitch:`La grande saga du module : des villages aux Cités, deux Chevaliers écrivent leur légende, quête après quête.`,
 setup:[`Plateau ouvert, tuile de départ côté B.`,`8 tuiles Campagne.`,`2 tuiles Royaume avec Cité et 2 sans Cité.`,`La première Cité révélée est de niveau 5, la seconde de niveau 7.`],
 rules:[FW_COOP,QRULE,QONCE,QHELP,HOME],
 end:`Dès que l'objectif est rempli, chaque joueur joue un dernier tour, pas le Fantôme. Sinon à la fin de la sixième Manche.`,score:QSC_COOP},
{id:'reco',n:'Mission de Reconnaissance',mode:'solo',src:'Officiel',d:1,r:4,t:'2 h',goal:`Localiser la Cité.`,
 pitch:`Le scénario de découverte, dans sa variante solo. Idéal pour une première partie complète.`,
 setup:[`Plateau en pyramide, tuile de départ côté A.`,`8 tuiles Campagne, rangées par numéro.`,`1 tuile Royaume avec Cité et 1 sans Cité.`],
 rules:[FW_SOLO,`Le livret permet aussi de jouer sans Fantôme pour une découverte sans pression.`,`+1 Gloire à chaque tuile révélée.`,`Pas d'Unités d'Élite. On n'entre pas dans la Cité et on ne la conquiert pas.`,`Ne révélez les Sorts et les Actions Avancées que lorsqu'ils deviennent utiles.`],
 end:`Quand la tuile Cité est révélée, vous jouez un dernier tour.`,score:`Votre Gloire plus les Hauts Faits, sans les titres.`},
{id:'eclair',n:'Conquête Éclair',mode:'solo',src:'Officiel adapté',d:4,r:4,t:'3 h',goal:`Conquérir les deux Cités.`,
 pitch:`La conquête en format court : deux Cités de niveau 3 et un Héros dopé dès le départ.`,
 setup:[`Plateau en pyramide.`,`6 tuiles Campagne.`,`2 tuiles Royaume avec Cité et 1 sans Cité.`,`Chaque Cité révélée est de niveau 3.`],
 rules:[FW_SOLO,BLITZ,ADAPT],end:`Quand toutes les Cités sont conquises, vous jouez un dernier tour.`,score:SC_SOLO},
{id:'mines',n:'Libération des Mines',mode:'solo',src:'Officiel adapté',d:3,r:4,t:'2 h 30',goal:`Révéler toutes les tuiles et libérer toutes les Mines.`,
 pitch:`Des ennemis occupent les Mines de cristal. Chassez-les, tunnel après tunnel.`,
 setup:[`Plateau en pyramide.`,`8 tuiles Campagne : ne retirez que des tuiles sans Mine.`,`La tuile Royaume de la Cité Rouge, plus 1 tuile Royaume sans Cité (celle sans Mine est écartée).`,`La Cité Rouge est amicale : posez-y un jeton Bouclier, personne n'en est Seigneur.`],
 rules:[FW_SOLO,...MINES_R,ADAPT],
 end:`Quand tout est révélé et libéré, vous jouez un dernier tour.`,score:`Votre Gloire, les Hauts Faits, plus 4 points par Mine libérée sur une tuile Campagne et 7 sur une tuile Royaume.`},
{id:'druides',n:'La Nuit des Druides',mode:'solo',src:'Officiel adapté',d:3,r:4,t:'2 h 30',goal:`Marquer le plus de Gloire grâce aux incantations nocturnes.`,
 pitch:`Activez les Clairières Magiques le jour, invoquez des monstres la nuit.`,
 setup:[`Plateau en pyramide.`,`8 tuiles Campagne : ne retirez que des tuiles sans Clairière Magique.`,`La tuile Royaume de la Cité Verte, plus 1 tuile Royaume sans Cité.`,`La Cité Verte est amicale : posez-y un jeton Bouclier, personne n'en est Seigneur.`],
 rules:[FW_SOLO,...DRUID_R,ADAPT],
 end:`Après votre incantation de la seconde Nuit, vous jouez un dernier tour. Sinon la partie s'arrête à la fin de cette Nuit.`,score:`Votre Gloire plus les Hauts Faits.`},
{id:'solo',n:'Conquête en solo',mode:'solo',src:'Officiel',d:4,r:6,t:'3 h 30 à 4 h',long:1,goal:`Conquérir les deux Cités.`,
 pitch:`Le grand scénario solo du livret. Il dépasse les trois heures.`,
 setup:[`Plateau en pyramide.`,`7 tuiles Campagne.`,`2 tuiles Royaume avec Cité et 2 sans Cité.`,`La première Cité révélée est de niveau 5, la seconde de niveau 8.`],
 rules:[FW_SOLO],end:`Quand toutes les Cités sont conquises, vous jouez un dernier tour.`,score:SC_SOLO},
{id:'dungeon',n:'Dungeon Lords',mode:'solo',src:'Officiel adapté',d:4,r:5,t:'3 h à 3 h 30',long:1,goal:`Révéler toutes les tuiles et conquérir tous les Donjons et Tombeaux.`,
 pitch:`Un réseau de souterrains relie Donjons et Tombeaux. Cinq Manches : trois Jours, deux Nuits.`,
 setup:[`Plateau en pyramide.`,`8 tuiles Campagne : ne retirez que des tuiles sans Donjon.`,`La tuile Royaume de la Cité Bleue, plus 1 tuile Royaume sans Cité : la tuile Désert sans Monastère ni Tombeau.`,`La Cité Bleue est amicale : posez-y un jeton Bouclier, personne n'en est Seigneur.`],
 rules:[FW_SOLO,`Quand vous révélez un Village, choisissez une case adjacente accessible, sans site et hors Marais : c'est l'entrée secrète d'un Donjon. Posez-y un jeton marron face cachée.`,`Quand vous révélez un Monastère, faites de même avec un jeton rouge : c'est un Tombeau secret.`,`Donjons et Tombeaux secrets suivent les règles normales de ces sites : règles de Nuit, sans Unités. En cas d'échec, le jeton est défaussé et remplacé par un nouveau, face cachée. Une fois conquis, on n'y combat plus.`,`Depuis un Donjon ou un Tombeau, vous pouvez rejoindre n'importe quel autre déjà conquis pour 2 points de Mouvement plus 1 par case de distance, en contournant lacs et marais.`,ADAPT],
 end:`Quand tout est révélé et conquis, vous jouez un dernier tour.`,score:`Votre Gloire et les Hauts Faits ; chaque Donjon ou Tombeau, secret ou non, compte 4 points au lieu de 2.`},
{id:'m-bapteme',n:'Baptême du feu',mode:'solo',src:'Maison',d:1,r:2,t:'1 h',goal:`Vaincre 2 ennemis errants et conquérir 1 site, de n'importe quel type.`,
 pitch:`Une Journée et une Nuit pour enchaîner déplacement, combat et premier niveau.`,
 setup:[`Plateau en pyramide, tuile de départ côté A.`,`5 tuiles Campagne, aucune tuile Royaume.`],
 rules:[FW_SOLO,`Pour une découverte sans pression, jouez sans Fantôme, comme le livret le permet pour la Mission de Reconnaissance : la Manche s'arrête alors quand vous l'annoncez.`,`+1 Gloire à chaque tuile révélée. Pas d'Unités d'Élite.`,HOME],
 end:`À la fin de la seconde Manche.`,score:`Réussi si l'objectif est atteint. Notez votre Gloire pour vous comparer la fois suivante.`},
{id:'m-chasse',n:'La Grande Chasse',mode:'solo',src:'Maison',d:2,r:3,t:'1 h 30 à 2 h',goal:`Finir sans aucun ennemi errant sur le plateau, toutes les tuiles révélées.`,
 pitch:`Les Orques Maraudeurs terrorisent la campagne. Nettoyez la région.`,
 setup:[`Plateau en pyramide.`,`7 tuiles Campagne, aucune tuile Royaume.`],
 rules:[FW_SOLO,`+1 Gloire à chaque tuile révélée.`,`Chaque assaut de site fortifié reste permis, mais il coûte de la Réputation comme d'habitude.`,HOME],
 end:`À la fin de la troisième Manche, ou dès que l'objectif est atteint (jouez alors un dernier tour).`,score:`Réussi si l'objectif est atteint. Mention spéciale si votre Réputation finit à +3 ou plus.`},
{id:'m-protecteur',n:'Le Protecteur',mode:'solo',src:'Maison',d:2,r:3,t:'2 h',goal:`Finir avec une Réputation de +2 ou plus, 2 Unités non Blessées et aucune Blessure dans votre Deck.`,
 pitch:`Gagner sans se salir les mains : ni pillage, ni incendie, et des troupes en bon état.`,
 setup:[`Plateau en pyramide.`,`7 tuiles Campagne, aucune tuile Royaume.`],
 rules:[FW_SOLO,`Interdit de piller un Village ou de brûler un Monastère.`,`Les Blessures comptent dans la main, le Deck et la défausse : pensez au Soin, aux Villages et aux Clairières.`,HOME],
 end:`À la fin de la troisième Manche.`,score:`Réussi si les trois conditions sont remplies.`},
{id:'m-erudit',n:`L'Érudit`,mode:'solo',src:'Maison',d:2,r:3,t:'2 h',goal:`Finir avec au moins 2 Sorts, 2 Actions Avancées et 1 Artefact dans votre Deck.`,
 pitch:`Tours de Mage, Monastères, Donjons : une partie tournée vers le savoir plutôt que la conquête.`,
 setup:[`Plateau en pyramide.`,`7 tuiles Campagne : gardez en priorité celles avec Tour de Mage, Monastère ou Donjon.`,`1 tuile Royaume sans Cité.`],
 rules:[FW_SOLO,`Toutes les sources comptent : achats, récompenses et changements de Niveau.`,HOME],
 end:`À la fin de la troisième Manche.`,score:`Réussi si la collection est complète. Pour corser : exigez 3 Sorts.`},
{id:'m-gloire',n:'Course à la Gloire',mode:'solo',src:'Maison',d:3,r:3,t:'2 h',goal:`Atteindre le Niveau le plus haut possible en trois Manches.`,
 pitch:`Aucun objectif sur le plateau : seulement votre progression. À rejouer pour battre votre record.`,
 setup:[`Plateau en pyramide.`,`7 tuiles Campagne et 1 tuile Royaume sans Cité.`],
 rules:[FW_SOLO,`Paliers indicatifs : Niveau 5, bronze ; Niveau 6, argent ; Niveau 7, or.`,HOME],
 end:`À la fin de la troisième Manche.`,score:`Votre Niveau, puis votre Gloire pour départager deux parties.`},
{id:'m-bannieres',n:'Trois Bannières',mode:'solo',src:'Maison',d:3,r:4,t:'2 h 30',goal:`Conquérir 3 sites fortifiés : Forteresses ou Tours de Mage.`,
 pitch:`Trois assauts à préparer : trouver du Siège, des Unités, et encaisser la perte de Réputation.`,
 setup:[`Plateau en pyramide.`,`8 tuiles Campagne : gardez en priorité celles avec Forteresse ou Tour de Mage.`,`1 tuile Royaume sans Cité.`],
 rules:[FW_SOLO,HOME],end:`Dès le troisième site conquis, jouez un dernier tour. Sinon à la fin de la quatrième Manche.`,score:`Réussi si vos Boucliers marquent 3 sites fortifiés. Notez le nombre de Manches utilisées.`},
{id:'m-siege',n:'Le Siège',mode:'solo',src:'Maison',d:3,r:4,t:'2 h 30 à 3 h',goal:`Conquérir la Cité.`,
 pitch:`Une seule Cité, et quatre Manches pour monter l'armée qui la fera tomber. Difficulté réglable.`,
 setup:[`Plateau en pyramide.`,`7 tuiles Campagne.`,`1 tuile Royaume avec Cité et 1 sans Cité.`,`Niveau de la Cité : 3 pour une partie accessible, 5 pour une partie difficile, 8 pour les experts.`],
 rules:[FW_SOLO,HOME],end:`Quand la Cité est conquise, jouez un dernier tour. Sinon à la fin de la quatrième Manche.`,score:SC_SOLO},
{id:'m-profondeurs',n:'Les Profondeurs',mode:'solo',src:'Maison',d:4,r:4,t:'2 h 30 à 3 h',goal:`Conquérir 3 sites d'aventures, dont au moins un Donjon ou un Tombeau.`,
 pitch:`Sous terre, vos Unités restent dehors et les règles de Nuit s'appliquent. Un scénario pour Héros autonome.`,
 setup:[`Plateau en pyramide.`,`8 tuiles Campagne : gardez en priorité celles avec Donjon, Antre ou Ruines.`,`2 tuiles Royaume sans Cité.`],
 rules:[FW_SOLO,`Un Autel de Ruines activé compte comme un site conquis.`,HOME],
 end:`Dès le troisième site conquis, jouez un dernier tour. Sinon à la fin de la quatrième Manche.`,score:`Réussi si vos Boucliers marquent les 3 sites demandés.`},
{id:'m-montre',n:'Contre la montre',mode:'solo',src:'Maison',d:5,r:3,t:'2 h',goal:`Conquérir une Cité de niveau 3 en trois Manches.`,
 pitch:`Jour, Nuit, Jour. Pas le temps de flâner : chaque tour doit rapprocher de la Cité.`,
 setup:[`Plateau en pyramide.`,`6 tuiles Campagne.`,`1 tuile Royaume avec Cité, placée en dernier dans la pioche.`,`La Cité est de niveau 3.`],
 rules:[FW_SOLO,BLITZ,HOME],end:`Quand la Cité est conquise, ou à la fin de la troisième Manche.`,score:SC_SOLO},
{id:'m-draconiens',n:'Tueur de Draconiens',mode:'solo',src:'Maison',d:5,r:4,t:'3 h',goal:`Vaincre 2 Draconiens errants.`,
 pitch:`Les ennemis rouges sont les plus dangereux du jeu. Il faudra monter en puissance avant d'aller les chercher.`,
 setup:[`Plateau en pyramide.`,`7 tuiles Campagne.`,`3 tuiles Royaume sans Cité : gardez en priorité celles avec des Draconiens.`],
 rules:[FW_SOLO,`Seuls comptent les Draconiens errants posés sur le plateau, pas les ennemis rouges d'un Tombeau ou de Ruines.`,HOME],
 end:`Dès le second Draconien vaincu, jouez un dernier tour. Sinon à la fin de la quatrième Manche.`,score:`Réussi si les deux Draconiens sont vaincus. Chacun rapporte +2 Réputation.`},
{id:'c-eclair',n:'Conquête Coopérative Éclair',mode:'coop',src:'Officiel',d:3,r:4,t:'3 h',goal:`Conquérir ensemble les deux Cités.`,
 pitch:`Le scénario coopératif court du livret, plus rapide et moins difficile que Coopération Totale.`,
 setup:[`Plateau ouvert, tuile de départ côté B.`,`7 tuiles Campagne.`,`2 tuiles Royaume avec Cité et 1 sans Cité.`,`La première Cité révélée est de niveau 5, la seconde de niveau 8.`],
 rules:[FW_COOP,BLITZ,`Il faut conquérir les deux Cités : il y en a autant que de joueurs. La seconde révélée, de niveau 8, est volontairement trop forte pour un seul Héros : elle se prend en assaut coopératif.`,`Assaut coopératif : depuis une case adjacente à la Cité, un joueur propose une répartition des défenseurs ; si l'autre accepte, chacun combat sa part à son tour, puis passe son tour suivant.`],end:`Quand toutes les Cités sont conquises, chaque joueur joue un dernier tour, pas le Fantôme.`,score:SC_COOP},
{id:'c-totale',n:'Coopération Totale',mode:'coop',src:'Officiel',d:5,r:6,t:'4 h et plus',long:1,goal:`Conquérir ensemble les trois Cités.`,
 pitch:`Le défi coopératif complet du livret : trois Cités en six Manches.`,
 setup:[`Plateau ouvert, tuile de départ côté B.`,`8 tuiles Campagne.`,`3 tuiles Royaume avec Cité et 2 sans Cité.`,`Les Cités sont de niveau 5, sauf la dernière révélée, de niveau 8.`],
 rules:[FW_COOP],end:`Quand toutes les Cités sont conquises, chaque joueur joue un dernier tour, pas le Fantôme.`,score:SC_COOP},
{id:'mc-initiation',n:'Reconnaissance à deux',mode:'coop',src:'Maison',d:1,r:3,t:'2 h',goal:`Révéler la Cité, chaque joueur ayant atteint le Niveau 3.`,
 pitch:`La Mission de Reconnaissance jouée main dans la main, pour apprendre le jeu à quelqu'un.`,
 setup:[`Plateau en pyramide, tuile de départ côté A.`,`8 tuiles Campagne, rangées par numéro.`,`1 tuile Royaume avec Cité et 1 sans Cité.`],
 rules:[FW_COOP,`+1 Gloire au joueur qui révèle une tuile, quelle qu'elle soit : seul celui qui explore marque le point. Alternez les explorations pour progresser ensemble.`,`Pas d'Unités d'Élite. On n'entre pas dans la Cité et on ne la conquiert pas. Ne révélez les Sorts et les Actions Avancées que lorsqu'ils deviennent utiles.`,HOME],
 end:`Quand la tuile Cité est révélée, chaque joueur joue un dernier tour. Sinon à la fin de la troisième Manche.`,score:`Réussi si la Cité est révélée et si les deux Héros sont au moins Niveau 3.`},
{id:'mc-mines',n:'Les Mines, ensemble',mode:'coop',src:'Maison',d:3,r:4,t:'3 h',goal:`Révéler toutes les tuiles et libérer ensemble toutes les Mines.`,
 pitch:`Libération des Mines en version coopérative : on se répartit le plateau.`,
 setup:[`Plateau en pyramide.`,`8 tuiles Campagne : ne retirez que des tuiles sans Mine.`,`La tuile Royaume de la Cité Rouge, plus 1 tuile Royaume sans Cité.`,`La Cité Rouge est amicale : chaque joueur y pose un jeton Bouclier.`],
 rules:[FW_COOP,...MINES_R,HOME],
 end:`Quand tout est révélé et libéré, chaque joueur joue un dernier tour. Sinon à la fin de la quatrième Manche.`,score:`Réussi si toutes les Mines sont libérées. Pour un score : la Gloire du joueur le moins avancé, plus 4 points par Mine de tuile Campagne et 7 par Mine de tuile Royaume.`},
{id:'mc-cite',n:'Deux lames, une Cité',mode:'coop',src:'Maison',d:3,r:4,t:'3 h',goal:`Conquérir la Cité, chaque joueur y ayant posé au moins un Bouclier.`,
 pitch:`Une Cité de niveau 8 : trop pour un seul Héros en quatre Manches. Préparez un assaut coopératif.`,
 setup:[`Plateau en pyramide.`,`7 tuiles Campagne.`,`1 tuile Royaume avec Cité et 1 sans Cité.`,`La Cité est de niveau 8. Pour une partie plus douce : niveau 5.`],
 rules:[FW_COOP,BLITZ,`Rappel de l'assaut coopératif : depuis une case adjacente, un joueur propose une répartition des défenseurs ; si l'autre accepte, chacun combat sa part à son tour, puis passe son prochain tour.`,HOME],
 end:`Quand la Cité est conquise, chaque joueur joue un dernier tour. Sinon à la fin de la quatrième Manche.`,score:SC_COOP},
{id:'mc-druides',n:'Le Cercle des Druides',mode:'coop',src:'Maison',d:4,r:4,t:'3 h',goal:`Vaincre à deux au moins 3 ennemis rouges invoqués pendant la seconde Nuit.`,
 pitch:`La Nuit des Druides en équipe : la première Nuit sert d'échauffement, la seconde décide de tout.`,
 setup:[`Plateau en pyramide.`,`8 tuiles Campagne : ne retirez que des tuiles sans Clairière Magique.`,`La tuile Royaume de la Cité Verte, plus 1 tuile Royaume sans Cité.`,`La Cité Verte est amicale : chaque joueur y pose un jeton Bouclier.`],
 rules:[FW_COOP,...DRUID_R,`Chaque joueur active ses propres Clairières et lance sa propre incantation.`,HOME],
 end:`Quand les deux joueurs ont lancé leur incantation de la seconde Nuit, chacun joue un dernier tour. Sinon à la fin de cette Nuit.`,score:`Réussi si 3 ennemis rouges invoqués ont été vaincus à vous deux.`},
{id:'v-eclair',n:'Le Retour de Volkare, Éclair',mode:'solo',src:'Officiel',ext:'Légion Oubliée',d:4,r:4,t:'3 h',volk:{kind:'retour',city:[[3,4],[4,6],[5,8]],lvl:[[4,8],[6,12],[8,16]],wounds:[16,13,10]},goal:`Conquérir la Cité, puis y détruire toute l'armée de Volkare.`,
 pitch:`Une course contre le général Volkare : il explore, trouve la Cité et marche dessus. Version courte, en quatre Manches.`,
 setup:[VK_MAP,`5 tuiles Campagne, en plus du Camp de Volkare.`,`1 tuile Royaume sans Cité, et 1 tuile Royaume avec Cité tout en dessous de la pioche.`,VK_LV],
 rules:[VK_BASE,BLITZ,VK_DECK,VK_TAC,VK_RET,VK_CITY,VK_FIGHT,VK_END],end:VK_RWIN,score:VK_RSC},
{id:'vc-eclair',n:'Le Retour de Volkare, Éclair',mode:'coop',src:'Officiel',ext:'Légion Oubliée',d:4,r:4,t:'3 h 30',volk:{kind:'retour',city:[[3,4],[4,6],[5,8]],lvl:[[4,8],[6,12],[8,16]],wounds:[16,13,10]},goal:`Conquérir la Cité, puis y détruire ensemble toute l'armée de Volkare.`,
 pitch:`La même course à deux : conquérez la Cité, puis organisez sa défense coopérative.`,
 setup:[VK_MAP,`6 tuiles Campagne, en plus du Camp de Volkare.`,`1 tuile Royaume sans Cité, et 1 tuile Royaume avec Cité tout en dessous de la pioche.`,VK_LV],
 rules:[VK_BASE,BLITZ,VK_DECK,VK_TAC,VK_RET,VK_CITY,VK_FIGHT,VK_COOP,VK_END],end:VK_RWIN,score:VK_RSC},
{id:'v-epique',n:'Le Retour de Volkare, Épique',mode:'solo',src:'Officiel',ext:'Légion Oubliée',d:5,r:6,t:'4 h et plus',long:1,volk:{kind:'retour',city:[[4,6],[6,9],[10,14]],lvl:[[5,10],[8,16],[12,24]],wounds:[18,15,12]},goal:`Conquérir la Cité, puis y détruire toute l'armée de Volkare.`,
 pitch:`La version complète, en six Manches, contre une armée bien plus grande.`,
 setup:[VK_MAP,`7 tuiles Campagne, en plus du Camp de Volkare.`,`1 tuile Royaume sans Cité, et 1 tuile Royaume avec Cité tout en dessous de la pioche.`,VK_LV],
 rules:[VK_BASE,VK_DECK,VK_TAC,VK_RET,VK_CITY,VK_FIGHT,VK_END],end:VK_RWIN,score:VK_RSC},
{id:'vc-epique',n:'Le Retour de Volkare, Épique',mode:'coop',src:'Officiel',ext:'Légion Oubliée',d:5,r:6,t:'5 h et plus',long:1,volk:{kind:'retour',city:[[4,6],[6,9],[10,14]],lvl:[[5,10],[8,16],[12,24]],wounds:[18,15,12]},goal:`Conquérir la Cité, puis y détruire ensemble toute l'armée de Volkare.`,
 pitch:`La grande bataille à deux, sur six Manches.`,
 setup:[VK_MAP,`8 tuiles Campagne, en plus du Camp de Volkare.`,`2 tuiles Royaume sans Cité, et 1 tuile Royaume avec Cité tout en dessous de la pioche.`,VK_LV],
 rules:[VK_BASE,VK_DECK,VK_TAC,VK_RET,VK_CITY,VK_FIGHT,VK_COOP,VK_END],end:VK_RWIN,score:VK_RSC},
{id:'v-quete',n:'La Quête de Volkare',mode:'solo',src:'Officiel',ext:'Légion Oubliée',d:5,r:6,t:'4 h et plus',long:1,volk:{kind:'quete',city:[[3,4],[4,4],[4,5]],lvl:[[8,14],[10,18],[14,26]],wounds:[20,16,12]},goal:`Détruire toute l'armée de Volkare avant qu'il n'atteigne le Portail.`,
 pitch:`Volkare marche droit sur votre Portail. Évitez-le, montez en puissance, puis revenez l'arrêter.`,
 setup:[VK_QMAP,`8 tuiles Campagne.`,`2 tuiles Royaume avec Cité et 4 sans Cité, en plus du Camp de Volkare.`,VK_LV],
 rules:[VK_BASE,VK_DECK,VK_TAC,VK_QUE,VK_QSLOW,VK_FIGHT,VK_END],end:VK_QWIN,score:VK_QSC},
{id:'vc-quete',n:'La Quête de Volkare',mode:'coop',src:'Officiel',ext:'Légion Oubliée',d:5,r:6,t:'5 h et plus',long:1,volk:{kind:'quete',city:[[3,4],[4,4],[4,5]],lvl:[[8,14],[10,18],[14,26]],wounds:[20,16,12]},goal:`Détruire ensemble toute l'armée de Volkare avant qu'il n'atteigne le Portail.`,
 pitch:`À deux, il faut se retrouver au bon moment à côté de Volkare pour l'attaquer ensemble.`,
 setup:[VK_QMAP,`9 tuiles Campagne.`,`2 tuiles Royaume avec Cité et 3 sans Cité, en plus du Camp de Volkare.`,VK_LV],
 rules:[VK_BASE,VK_DECK,VK_TAC,VK_QUE,VK_QSLOW,VK_FIGHT,VK_COOP,VK_END],end:VK_QWIN,score:VK_QSC},
{id:'v-camp',n:'Conquête Éclair, avec le Camp de Volkare',mode:'solo',src:'Officiel adapté',ext:'Légion Oubliée',d:4,r:4,t:'3 h',goal:`Conquérir la Cité et le Camp de Volkare.`,
 pitch:`La variante du livret des extensions : une des deux Cités est remplacée par le Camp de Volkare. Le joueur Fantôme reste en jeu.`,
 setup:[`Plateau en pyramide.`,`6 tuiles Campagne.`,`1 tuile Royaume avec Cité, le Camp de Volkare et 1 tuile Royaume sans Cité, mélangées ensemble.`,`La Cité et Volkare sont de niveau 3. Pour Volkare, le niveau minimum de sa base est 4 : 1 jeton gris, 1 rouge, 2 verts.`],
 rules:[FW_SOLO,BLITZ,`Entrer dans le Camp coûte 2 points de Mouvement. Par-dessus un Mur : 1 point de plus, et les troupes que vous affrontez sont Fortifiées.`,`Assaillir le Camp ne coûte pas de Réputation. Volkare ne bouge jamais ; ses jetons restent cachés jusqu'à ce qu'un joueur arrive sur une case adjacente, de Jour comme de Nuit.`,VK_FIGHT,`Posez un Bouclier sur le jeton Volkare par ennemi rouge ou blanc vaincu, et un par paire d'ennemis gris ou verts. Si des troupes survivent, vous reculez et pourrez revenir, comme pour une Cité.`,`Camp conquis : depuis le Camp ou une case adjacente, vous recrutez les Unités de Village et de Forteresse, avec +1 Influence par Bouclier posé, et le Camp compte comme une Forteresse pour votre Limite de cartes en main.`,ADAPT],
 end:`Quand la Cité et le Camp sont conquis, vous jouez un dernier tour.`,score:SC_SOLO+` Le Camp conquis compte comme une Cité.`},
{id:'tz-relique',n:'La Relique Perdue',mode:'solo',src:'Officiel',ext:'Ombres de Tezla',d:3,r:2,t:'2 h',goal:`Retrouver les fragments de la relique dans les deux Cités détruites.`,
 pitch:`Deux Manches seulement, mais votre Héros commence au Niveau 3. Un Draconien garde chaque fragment.`,
 setup:[`Plateau ouvert limité à 3 colonnes.`,`6 tuiles Campagne.`,`2 tuiles Royaume avec Cité et 1 sans Cité.`,TZ_HIGH],
 rules:[TZ_SOLO,TZ_REL,TZ_REL2],end:`Quand tous les fragments sont récupérés, vous jouez un dernier tour.`,score:TZ_SC+` Mission : 5 points par fragment, 10 de plus si vous les avez tous.`+TZ_SC2},
{id:'tzc-relique',n:'La Relique Perdue',mode:'coop',noRm:1,src:'Officiel',ext:'Ombres de Tezla',d:3,r:2,t:'2 h 30',goal:`Retrouver ensemble les fragments de la relique dans les trois Cités détruites.`,
 pitch:`La même chasse à deux, avec trois Cités en ruines à fouiller en un Jour et une Nuit.`,
 setup:[`Plateau ouvert limité à 4 colonnes.`,`7 tuiles Campagne.`,`3 tuiles Royaume avec Cité et 2 sans Cité.`,TZ_HIGH],
 rules:[TZ_COOP,TZ_REL,TZ_REL2],end:`Quand tous les fragments sont récupérés, chaque joueur joue un dernier tour, pas le Fantôme.`,score:TZ_SCC+` Mission : 5 points par fragment, 5 de plus si chaque joueur en a trouvé un, 10 de plus si vous les avez tous.`+TZ_SC2},
{id:'tz-vallee',n:'La Vallée Oubliée',mode:'solo',src:'Officiel',ext:'Ombres de Tezla',d:4,r:4,t:'3 h',goal:`Trouver la Vallée Oubliée et vaincre la Grande Prêtresse.`,
 pitch:`Une vallée cachée par magie : explorer coûte trois fois plus cher, et les Élémentalistes tendent des embuscades.`,
 setup:[`Plateau en pyramide.`,`5 tuiles Campagne.`,`2 tuiles Royaume avec Cité, la blanche et la verte, et 1 sans Cité.`,`La Cité verte est amicale : vous et le Fantôme y posez un Bouclier, sans Seigneur.`,`La Grande Prêtresse est le Chef de Faction des Élémentalistes, au niveau 4.`],
 rules:[TZ_SOLO,BLITZ,TZ_VAL,TZ_VAL2,TZ_CHEF],end:`Quand la Grande Prêtresse est vaincue, vous jouez un dernier tour.`,score:TZ_SC+` Mission : 20 points si la Grande Prêtresse est vaincue, 30 par Manche non utilisée.`+TZ_SC2},
{id:'tzc-vallee',n:'La Vallée Oubliée',mode:'coop',noRm:1,src:'Officiel',ext:'Ombres de Tezla',d:4,r:4,t:'3 h 30',long:1,goal:`Trouver la Vallée Oubliée et vaincre ensemble la Grande Prêtresse.`,
 pitch:`À deux contre une Grande Prêtresse de niveau 6 : prévoyez un assaut coopératif.`,
 setup:[`Plateau ouvert.`,`6 tuiles Campagne.`,`2 tuiles Royaume avec Cité, la blanche et la verte, et 2 sans Cité.`,`La Cité verte est amicale : chaque joueur y pose un Bouclier, sans Seigneur.`,`La Grande Prêtresse est le Chef de Faction des Élémentalistes, au niveau 6.`],
 rules:[TZ_COOP,BLITZ,TZ_VAL,TZ_VAL2,TZ_CHEF],end:`Quand la Grande Prêtresse est vaincue, chaque joueur joue un dernier tour, pas le Fantôme.`,score:TZ_SCC+` Mission : 20 points si la Grande Prêtresse est vaincue, 20 si chaque joueur a un Bouclier sur son jeton, 30 par Manche non utilisée.`+TZ_SC2},
{id:'tz-morts',n:'Le Royaume des Morts',mode:'solo',src:'Officiel',ext:'Ombres de Tezla',d:4,r:4,t:'3 h',goal:`Sceller tous les Cimetières et vaincre le Nécromancien.`,
 pitch:`Les morts-vivants vous poursuivent à travers la campagne. Libérez les Cimetières un à un, puis marchez sur la Nécropole.`,
 setup:[`Plateau en pyramide.`,`5 tuiles Campagne, dont exactement 2 avec une Clairière Magique.`,`2 tuiles Royaume avec Cité, la bleue et la verte, et 1 sans Cité.`,`La Cité verte est amicale : vous et le Fantôme y posez un Bouclier, sans Seigneur.`,`Le Nécromancien est le Chef de Faction des Sombres Croisés, au niveau 4.`],
 rules:[TZ_SOLO,BLITZ,TZ_MOR,TZ_MOR2,TZ_MOR3,TZ_CHEF],end:`Quand tous les Cimetières sont scellés et le Nécromancien vaincu, vous jouez un dernier tour.`,score:TZ_SC+` Mission : 5 points par Cimetière scellé, 10 pour le Nécromancien, 10 de plus si tout est accompli, 30 par Manche non utilisée.`+TZ_SC2},
{id:'tzc-morts',n:'Le Royaume des Morts',mode:'coop',noRm:1,src:'Officiel',ext:'Ombres de Tezla',d:4,r:4,t:'3 h 30',long:1,goal:`Sceller tous les Cimetières et vaincre ensemble le Nécromancien.`,
 pitch:`Trois Cimetières à purifier à deux, et un Nécromancien de niveau 6.`,
 setup:[`Plateau ouvert.`,`6 tuiles Campagne, dont exactement 3 avec une Clairière Magique.`,`2 tuiles Royaume avec Cité, la bleue et la verte, et 2 sans Cité.`,`La Cité verte est amicale : chaque joueur y pose un Bouclier, sans Seigneur.`,`Le Nécromancien est le Chef de Faction des Sombres Croisés, au niveau 6.`],
 rules:[TZ_COOP,BLITZ,TZ_MOR,TZ_MOR2,TZ_MOR3,TZ_CHEF],end:`Quand tous les Cimetières sont scellés et le Nécromancien vaincu, chaque joueur joue un dernier tour, pas le Fantôme.`,score:TZ_SCC+` Mission : 5 points par Cimetière scellé, 10 pour le Nécromancien, 10 de plus si tout est accompli, 20 si chaque joueur a un Bouclier sur son jeton, 30 par Manche non utilisée.`+TZ_SC2},
{id:'tz-vie',n:'À la vie, à la mort',mode:'solo',src:'Officiel',ext:'Ombres de Tezla',d:5,r:6,t:'4 h et plus',long:1,goal:`Vaincre les deux Avatars de Tezla : les Chefs des deux Factions.`,
 pitch:`Le grand scénario de l'extension : le Nord aux Sombres Croisés, le Sud aux Élémentalistes, et vous au milieu.`,
 setup:[`Plateau en pyramide.`,`6 tuiles Campagne, dont exactement 3 avec une Clairière Magique.`,`3 tuiles Royaume avec Cité : la verte, la rouge et une autre au hasard, amicale ; 2 sans Cité.`,`Les deux Chefs de Faction commencent au niveau 6.`],
 rules:[TZ_SOLO,TZ_VIE,TZ_VIE2,TZ_VIE3,TZ_CHEF],end:`Quand les deux Factions sont défaites, vous jouez un dernier tour.`,score:TZ_SC+` Mission : 10 points par Avatar vaincu, 15 de plus pour les deux, 30 par Manche non utilisée.`+TZ_SC2},
{id:'tzc-vie',n:'À la vie, à la mort',mode:'coop',noRm:1,src:'Officiel',ext:'Ombres de Tezla',d:5,r:6,t:'5 h et plus',long:1,goal:`Vaincre ensemble les deux Avatars de Tezla.`,
 pitch:`Six Manches à deux contre les deux Factions et leurs Chefs.`,
 setup:[`Plateau ouvert.`,`7 tuiles Campagne, dont exactement 3 avec une Clairière Magique.`,`3 tuiles Royaume avec Cité : la verte, la rouge et une autre au hasard, amicale ; 2 sans Cité.`,`Les deux Chefs de Faction commencent au niveau 6.`],
 rules:[TZ_COOP,TZ_VIE,TZ_VIE2,TZ_VIE3,TZ_CHEF],end:`Quand les deux Factions sont défaites, chaque joueur joue un dernier tour, pas le Fantôme.`,score:TZ_SCC+` Mission : 10 points par Avatar vaincu, 15 de plus pour les deux, 10 si chaque joueur a un Bouclier sur au moins un Chef, 10 de plus sur les deux, 30 par Manche non utilisée.`+TZ_SC2}
];

let S,HIST=[];
const F={mode:'all',src:'all',box:'all',short:true};
let QM=(()=>{try{return localStorage.getItem('mk-quetes-mode')||'off'}catch(e){return 'off'}})();
const QML={off:'Sans quêtes',normal:'Normal',merc:'Mercenaire',hero:'Héroïque'};
function questLine(sc){if(sc.quest)return `<li class="qline">📜 Scénario du module Quêtes : ${QM==='off'?'le module est obligatoire ici, en mode Normal par défaut':'mode '+QML[QM]}. Pas de +1 aux Cités.</li>`;
  if(QM==='off')return '';const city=/niveau \d/.test(sc.setup.join(' ')+' '+sc.rules.join(' '));
  if(QM==='normal')return city?`<li class="qline">📜 Module Quêtes, mode Normal : <b>+1 niveau à chaque Cité</b> par rapport aux niveaux indiqués ici.</li>`:`<li class="qline">📜 Module Quêtes, mode Normal : pas de niveau de Cité à ajuster dans ce scénario.</li>`;
  return `<li class="qline">📜 Module Quêtes, mode ${QML[QM]} : les niveaux de Cité ne changent pas.</li>`}
function blank(){return{varmy:{w:0,g:0,r:0,v:0},vloss:0,vskip:false,chefs:{elem:chefNew(),sc:chefNew()},vc:1,vp:0,vcity:false,vmsg:'',view:'game',mode:'solo',scen:null,phase:'setup',rounds:6,round:1,dummyCrys:['g','g','b'],counts:{r:4,g:4,b:4,w:4},
  deck:[],discard:[],crystals:{r:0,g:0,b:0,w:0},removed:{day:[],night:[]},tac:{me:null,p2:null,dummy:null},
  flip:[],turn:0,mustAnnounce:false,endBy:null,dummyLastDone:false,prep:{aa:null,spell:null,rm:null},log:[]}}
const isDay=()=>S.round%2===1;
const tset=()=>isDay()?'day':'night';
const coop=()=>S.mode==='coop';
const scen=()=>SCEN.find(x=>x.id===S.scen);
/* ---------- Volkare (extension La Légion Oubliée) ---------- */
const ARMY={4:[0,1,1,2],5:[1,0,1,2],6:[1,0,1,3],7:[1,0,2,2],8:[1,1,2,2],9:[1,1,2,3],10:[1,1,2,5],11:[2,0,2,5],12:[2,0,2,6],13:[2,0,2,7],14:[2,0,3,6],15:[2,1,3,6]};
const DIE=['r','g','b','w','gold','black'],DN={r:'rouge',g:'vert',b:'bleu',w:'blanc',gold:'or',black:'noir'};
const volk=()=>{const s=scen();return s&&s.volk?s.volk:null};
const FOE=()=>volk()?'Volkare':'Fantôme';
const vkI=()=>coop()?1:0;
const vkW=()=>volk().wounds[S.vp];
const vkLvl=()=>volk().lvl[S.vc][vkI()];
function armyTxt(l){let m=1;if(!ARMY[l]){m=2;l=l/2}const a=ARMY[l];if(!a)return `à composer d'après le livret`;const n=['blanc','gris','rouge','vert'];
  return a.map((x,i)=>x?`${x*m} ${n[i]}${x*m>1&&i!==1?'s':''}`:'').filter(Boolean).join(', ')+(m>1?` (base de la figurine réglée sur ${l}, jetons doublés)`:'')}
function vkRed(sp){return `Volkare ne bouge pas : il attaque un Héros situé sur une case adjacente${sp?`, ou à défaut à 2 cases`:``}. S'il y en a plusieurs, il vise le plus avancé sur l'Échelle de Gloire. Personne à portée : il ne se passe rien.`}
function vkMove(k,n,v){const t=n>1?`deux fois de suite`:`d'une case`;
  if(v.kind==='quete')return `Déplacez Volkare ${t} dans la direction ${FEM[k]} de la carte scénario. Il traverse les tuiles non explorées sans les révéler. Adjacent au Portail, il y entre quelle que soit la couleur. S'il est déjà sur le Portail et doit avancer, sa quête est accomplie : la partie est perdue. S'il entre sur la case d'un Héros, il l'attaque.`;
  if(S.vcity)return `Course pour la Cité : déplacez Volkare ${t} vers la Cité, par le plus court chemin et sans révéler de tuile. Entre deux cases possibles, prenez celle dont la direction est la plus proche de la direction ${FEM[k==='r'?'b':k]} de la carte scénario. S'il est adjacent à la Cité et doit avancer, il lui donne l'assaut.`;
  return `Déplacez Volkare ${t} dans la direction ${FEM[k]} de la carte scénario, sans tenir compte du terrain. S'il arrive en zone inexplorée, révélez une tuile et posez-le dessus. S'il entre sur la case d'un Héros, il l'attaque.`}
function volkTurn(){if(S.vskip)return act(()=>{S.turn++;S.vskip=false;S.vloss=0;S.flip=[];S.vmsg='<b>Volkare est ralenti.</b> Il passe ce tour : retournez son jeton Ordre de Jeu face visible.';log(`Tour ${S.turn} : Volkare, ralenti, passe son tour.`)});act(()=>{S.turn++;S.vloss=0;const v=volk();
  if(!S.deck.length){S.flip=[{c:'b',x:false}];S.vmsg=`<b>Frénésie.</b> Son Deck est épuisé : Volkare agit comme s'il révélait un Sort bleu, sans relancer de dé. `+vkMove('b',2,v);log(`Tour ${S.turn} : Deck de Volkare épuisé, frénésie.`);return}
  const c=S.deck.shift();S.discard.push(c);
  if(c==='x'){const d=DIE[rnd(6)];S.flip=[];
    S.vmsg=`<b>Blessure : Volkare se repose.</b> Son dé donne <b>${DN[d]}</b>. `+(KEYS.includes(d)?`Si une Unité de l'Offre occupe l'emplacement marqué d'un Cristal ${DN[d]}, retirez-la du jeu${v.kind==='quete'?``:` et ajoutez un jeton Ennemi gris à l'armée de Volkare`}. Cet emplacement reste vide jusqu'à la Manche suivante.`:`Aucun emplacement ne porte cette couleur : il ne se passe rien.`);
    log(`Tour ${S.turn} : Volkare révèle une Blessure et se repose (dé ${DN[d]}). Reste ${S.deck.length}.`);return}
  const sp=c!==c.toLowerCase(),k=c.toLowerCase();S.flip=[{c:k,x:false}];
  S.vmsg=`<b>${sp?'Sort '+COL[k]:'Action '+FEM[k]}.</b> Relancez un dé ${COL[k]} de la Source s'il y en a un${isDay()?` ; à défaut, de Jour, un dé or`:``}. `+(k==='r'&&!(v.kind==='retour'&&S.vcity)?vkRed(sp):vkMove(k,sp?2:1,v));
  log(`Tour ${S.turn} : Volkare révèle ${sp?'un Sort '+COL[k]:'une Action '+FEM[k]}. Reste ${S.deck.length}.`)})}
function volkDie(){act(()=>{const d=DIE[rnd(6)];S.vmsg=`<b>Dé d'attaque de Volkare : ${DN[d]}.</b> Lisez sur son jeton l'attaque placée à côté de ce symbole. Elle est toujours Brutale et Assassin : ses Dégâts ne peuvent pas être assignés à vos Unités.`;log(`Dé d'attaque de Volkare : ${DN[d]}.`)})}
function volkPanel(){const v=volk(),n=Math.ceil(S.round/2)+1;return `${S.vmsg?`<div class="banner">${S.vmsg}</div>`:''}${S.flip.length?cardsHtml(S.flip):''}
  ${v.kind==='retour'?`<button data-vcity="1" class="${S.vcity?'on':''}">${S.vcity?'Cité révélée : Volkare court vers elle':'Signaler que la Cité est révélée'}</button>`:''}
  <p class="muted"><small>Si Volkare vous attaque : affrontez toute son armée, ou battez en retraite en prenant ${n} Blessures en main. S'il finit son tour sur votre case, reculez sur une case adjacente sécurisée.</small></p>`}
function volkSetup(){const sc=scen(),v=sc.volk,i=vkI(),q=v.kind==='quete';
  const pick=(a,l,cur)=>`<div class="row">${l.map((x,k)=>`<button data-${a}="${k}" class="${cur===k?'on':''}">${x}</button>`).join('')}</div>`;
  return `<section class="panel"><h2>Mise en place de Volkare</h2><div class="banner"><b>${sc.n}</b> · ${coop()?'coopération à deux':'solo'} · ${sc.r} Manches</div>
   <div class="sub">Niveau de Combat</div>${pick('vc',['Audacieux','Héroïque','Légendaire'],S.vc)}
   <p>${q?'Cités':'Cité'} de niveau <b>${v.city[S.vc][i]}</b>. Volkare de niveau <b>${vkLvl()}</b> : ${armyTxt(vkLvl())}.</p>
   <div class="sub">Niveau de Poursuite</div>${pick('vp',['Équitable','Tendu','Palpitant'],S.vp)}
   <p><b>${vkW()}</b> Blessures dans son Deck. <b>${S.vp+1+i}</b> ${q?'Unités Effrayées':'Unités Indécises'} : marquez autant d'emplacements de l'Offre des Unités avec des Cristaux de couleurs différentes.</p>
   <div class="sub">Son Deck : les 16 cartes Action Basique d'un Héros qui ne joue pas</div>
   <div class="gems">${KEYS.map(k=>`<div class="gem"><span class="ico c-${k}"></span><b>${S.counts[k]}</b><div class="row"><button data-cnt="${k}:-1" aria-label="moins">−</button><button data-cnt="${k}:1" aria-label="plus">+</button></div></div>`).join('')}</div>
   <p class="muted"><small>Par défaut 4 de chaque couleur : vérifiez sur les cartes du Héros. Le compagnon ajoute les 4 Sorts interactifs, un par couleur, et les Blessures, puis mélange : ${KEYS.reduce((a,k)=>a+S.counts[k],0)+4+vkW()} cartes.</small></p>
   <button class="primary big" data-go="start">Commencer la partie</button></section>`}

function save(){try{localStorage.setItem(SAVE,JSON.stringify(S))}catch(e){}}
function load(){try{const v=JSON.parse(localStorage.getItem(SAVE)||'null');if(v&&v.phase){const b=blank();const o=Object.assign(b,v);o.tac=Object.assign({me:null,p2:null,dummy:null},v.tac);o.prep=Object.assign({aa:null,spell:null,rm:null},v.prep);o.chefs=Object.assign({elem:chefNew(),sc:chefNew()},v.chefs);o.varmy=Object.assign({w:0,g:0,r:0,v:0},v.varmy);return o}}catch(e){}return null}
function act(fn){HIST.push(JSON.stringify(S));if(HIST.length>60)HIST.shift();fn();save();render()}
function undo(){if(!HIST.length)return;const v=S.view;S=JSON.parse(HIST.pop());S.view=v;save();render()}
function log(m){S.log.unshift(m);S.log.length=Math.min(S.log.length,40)}

function startGame(){act(()=>{
  const deck=[];KEYS.forEach(k=>{for(let i=0;i<S.counts[k];i++)deck.push(k)});
  S.chefs={elem:chefNew(),sc:chefNew()};S.vloss=0;S.vskip=false;S.varmy=(volk()&&armyCounts(vkLvl()))||{w:0,g:0,r:0,v:0};if(volk()){deck.push('R','G','B','W');for(let i=0;i<vkW();i++)deck.push('x')}S.vcity=false;S.vmsg='';S.turn=0;S.flip=[];
  S.deck=shuffle(deck);S.discard=[];S.crystals={r:0,g:0,b:0,w:0};S.dummyCrys.forEach(c=>S.crystals[c]++);
  S.round=1;S.phase='tactic';S.removed={day:[],night:[]};S.tac={me:null,p2:null,dummy:null};S.log=[];S.gid=String(Date.now());
  log(`Partie lancée${scen()?' : '+scen().n:''}. ${S.rounds} Manches, ${coop()?'coopération à deux':'solo'}, Deck ${volk()?'de Volkare':'du Fantôme'} de ${S.deck.length} cartes.`)})}
function orderText(){const a=[['Vous',S.tac.me]];if(coop()){a[0][0]='Joueur 1';a.push(['Joueur 2',S.tac.p2])}a.push([FOE(),S.tac.dummy]);
  return a.sort((x,y)=>x[1]-y[1]).map(x=>`${x[0]} (${x[1]})`).join(', puis ')}
function beginPlay(){log(`Tactiques. Ordre de jeu : ${orderText()}.`);S.phase='play';S.turn=0;S.mustAnnounce=false;S.endBy=null;S.dummyLastDone=false;S.flip=[]}
function pickTac(n){act(()=>{const left=[1,2,3,4,5,6].filter(x=>x!==n&&!S.removed[tset()].includes(x));S.tac.me=n;S.tac.dummy=left[rnd(left.length)];beginPlay()})}
function drawDummyTac(){act(()=>{const left=[1,2,3,4,5,6].filter(x=>!S.removed[tset()].includes(x));S.tac.dummy=left[rnd(left.length)];S.tac.me=S.tac.p2=null})}

function dummyTurn(){if(volk())return volkTurn();act(()=>{
  S.turn++;
  if(S.endBy==='me'){S.dummyLastDone=true;
    if(!S.deck.length){S.flip=[];log(`Tour ${S.turn} : dernier tour du Fantôme, son Deck est vide. La Manche se termine.`);return}}
  if(!S.deck.length||S.mustAnnounce){S.flip=[];S.endBy='dummy';log(`Tour ${S.turn} : le Fantôme annonce la fin de la Manche. ${coop()?'Chaque joueur joue':'Jouez'} un dernier tour.`);return}
  const f=[];for(let i=0;i<3&&S.deck.length;i++)f.push({c:S.deck.shift(),x:false});
  let short=f.length<3,extra=0;
  if(!short){const last=f[2].c;extra=S.crystals[last];
    for(let i=0;i<extra;i++){if(!S.deck.length){short=true;break}f.push({c:S.deck.shift(),x:true})}}
  S.discard.push(...f.map(o=>o.c));S.flip=f;
  if(short)S.mustAnnounce=true;
  const last=f[Math.min(2,f.length-1)].c,got=f.length-3;
  let m=`Tour ${S.turn} : ${f.length} carte${f.length>1?'s':''} défaussée${f.length>1?'s':''}`;
  if(f.length>=3)m+=`, la 3e est ${FEM[last]}`;
  m+=extra?` ; le Fantôme a ${extra} ${extra>1?'Cristaux':'Cristal'} ${COL[last]}${extra>1?'s':''}, donc ${extra} carte${extra>1?'s':''} en plus${got<extra?(got===0?' (il n\'en restait aucune)':got===1?' (il n\'en restait qu\'une)':' (il n\'en restait que '+got+')'):''}`:'';
  m+=`. Reste ${S.deck.length}.`;
  if(short)m+=' Il annoncera la fin de la Manche à son prochain tour.';
  if(S.endBy==='me')m+=' C\'était son dernier tour : la Manche se termine.';
  log(m)})}
function iAnnounce(){if(volk())return act(()=>{S.endBy='me';S.dummyLastDone=true;log(`Fin de la Manche annoncée. Volkare ne joue pas de dernier tour${coop()?` ; l'autre joueur, si`:``}.`)});act(()=>{S.endBy='me';log(`${coop()?'Un joueur annonce':'Vous annoncez'} la fin de la Manche. ${coop()?'L\'autre joueur et le Fantôme jouent':'Le Fantôme joue'} encore un dernier tour.`)})}
function endRound(){act(()=>{
  if(S.round>=S.rounds){S.phase='over';log(`Fin de la ${S.round}e Manche : la partie est terminée.`);autoCarnet();return}
  if(volk()){if(!coop())S.removed[tset()].push(S.tac.me)}else if(!coop())S.removed[tset()].push(S.tac.me,S.tac.dummy);
  S.round++;S.phase='prep';S.prep={aa:null,spell:null,rm:null};S.flip=[];
  log(`Fin de Manche.${coop()?'':volk()?` Votre Tactique ${S.tac.me} est retirée du jeu.`:` Tactiques ${S.tac.me} et ${S.tac.dummy} retirées.`} Préparez la Manche ${S.round}.`)})}
const needRm=()=>coop()&&!volk()&&!(scen()&&scen().noRm)&&S.round+1<=S.rounds; // une Manche du même type reste à jouer après celle qui vient de finir
function prepDone(){if(volk())return act(()=>{S.phase='tactic';S.tac={me:null,p2:null,dummy:null};log(`Manche ${S.round} (${isDay()?'Jour':'Nuit'}). Le Deck de Volkare n'est pas remélangé : ${S.deck.length} cartes restantes.`)});act(()=>{
  const {aa,spell,rm}=S.prep;
  if(aa)S.discard.push(aa);if(spell)S.crystals[spell]++;
  if(rm)S.removed[isDay()?'night':'day'].push(rm);
  S.deck=shuffle(S.deck.concat(S.discard));S.discard=[];
  S.phase='tactic';S.tac={me:null,p2:null,dummy:null};
  log(`Manche ${S.round} (${isDay()?'Jour':'Nuit'}) : ${aa?'Action Avancée '+FEM[aa]+' ajoutée, ':''}${spell?'Cristal '+COL[spell]+' gagné, ':''}${rm?'Tactique '+rm+' retirée, ':''}Deck remélangé (${S.deck.length} cartes).`)})}
function useScen(id){const sc=SCEN.find(x=>x.id===id);const keep={dummyCrys:S.dummyCrys,counts:S.counts};HIST=[];S=Object.assign(blank(),keep,{scen:id,mode:sc.mode,rounds:sc.r,view:'game'});save();render();window.scrollTo(0,0)}

/* ---------- Rendu ---------- */
const ico=c=>`<span class="ico c-${c}"></span>`;
const pips=d=>`<span class="pips" title="Difficulté ${d} sur 5">${[1,2,3,4,5].map(i=>`<i class="${i<=d?'on':''}"></i>`).join('')}</span>`;
function cardsHtml(f){return `<div class="cards">${f.map((o,i)=>`<div class="card c-${o.c} ${i===2?'last':''} ${o.x?'extra':''}" title="${COL[o.c]}${i===2?', couleur testée':''}${o.x?', carte en plus':''}">${i===2?'3e':o.x?'+':''}</div>`).join('')}</div>`}
function gemsHtml(){return `<div class="gems">${KEYS.map(k=>`<div class="gem"><span class="ico c-${k}"></span><b>${S.crystals[k]}</b><div class="row"><button data-cr="${k}:-1" aria-label="Retirer un cristal ${COL[k]}">−</button><button data-cr="${k}:1" aria-label="Ajouter un cristal ${COL[k]}">+</button></div></div>`).join('')}</div>`}
function stateHtml(){if(volk())return volkState();return `<section class="panel"><div class="stats">
   <div><span class="sub">Deck</span><b>${S.deck.length}</b></div><div><span class="sub">Défausse</span><b>${S.discard.length}</b></div><div><span class="sub">Tours</span><b>${S.turn}</b></div></div>
   <div class="sub">Cristaux du Fantôme</div>${gemsHtml()}</section>`}
function scenBody(sc){return `<p><b>Objectif.</b> ${sc.goal}</p><div class="sub">Mise en place</div><ul>${sc.setup.map(x=>`<li>${x}</li>`).join('')}${questLine(sc)}</ul>${howTo(sc)}
  <div class="sub">Règles du scénario</div><ul>${sc.rules.map(x=>`<li>${x}</li>`).join('')}</ul><p><b>Fin.</b> ${sc.end}</p><p><b>Score.</b> ${sc.score}</p>`}
function howTo(sc){if(sc.volk)return '';
  const all=sc.setup.join(' ')+' '+sc.rules.join(' '),two=sc.mode==='coop',n=two?2:1;
  const plus=(sc.rules.includes(BLITZ)||/dé de plus dans la Source/.test(all))?1:0;
  const ouvert=/Plateau ouvert/.test(all),lim=(all.match(/limité à (\d) colonnes/)||[])[1];
  const hasCity=/avec Cité/.test(all)&&!/détruites/.test(all);
  const byNum=/rangées par numéro/.test(all);
  const li=[];
  li.push(ouvert?`<b>Plateau ouvert${lim?', limité à '+lim+' colonnes':''}</b> : tuile de départ côté B, avec les 3 premières tuiles de la pioche accolées. Jamais plus de ${lim||5} colonnes de tuiles côte à côte.`
     :`<b>Plateau en pyramide</b> : tuile de départ côté A, avec les 2 premières tuiles de la pioche posées contre elle. Une tuile Royaume ne se pose jamais sur le littoral, les colonnes les plus à gauche et à droite.`);
  li.push(`<b>Pioche de tuiles</b> : ${byNum?'tuiles Campagne (dos vert) triées par numéro, la plus petite au-dessus':'tirez au hasard les tuiles Campagne (dos vert) demandées'}. Pour les tuiles Royaume (dos marron), séparez celles avec et sans icône Cité, tirez le nombre demandé de chaque, mélangez-les et posez les tuiles Campagne par-dessus : la Campagne s'explore toujours en premier. Les tuiles en trop retournent dans la boîte sans être regardées. Toute tuile se pose dans le même sens que la tuile de départ.`);
  if(hasCity)li.push(`<b>Cités</b> : à la révélation d'une tuile Cité, posez la figurine de sa couleur sur la case et sa carte à côté du plateau. Le tableau de la carte indique, pour le niveau fixé par le scénario, quels défenseurs piocher : posez-les face cachée sur la carte. Une Cité amicale n'a pas de défenseurs.`);
  li.push(`<b>Source</b> : ${n+2+plus} dés Mana, le Fantôme ne compte pas. Lancez-les ; si plus de la moitié montrent noir ou or, relancez ceux-là.`);
  li.push(`<b>Offres</b> : ${n+2+plus} Unités Régulières, à dos argenté (les Élites n'arrivent qu'une fois une tuile Royaume révélée) ; 3 Actions Avancées ; 3 Sorts. Les Artefacts et les Compétences restent en pioche.`);
  li.push(`<b>${two?'Chaque Héros':'Votre Héros'}</b> : sa carte, sa figurine, ses 16 cartes Action Basique mélangées, le jeton Niveau 1 (Armure 2, main 5, 1 Commandement), ses Compétences face cachée. Gloire ${plus?1:0}, Réputation ${plus?'2 (bonus +1 en Interaction)':'0'}. Piochez 5 cartes.`);
  li.push(`<b>Fantôme</b> : un Héros non choisi, tiré au hasard. Seuls sa carte et ses 16 cartes Action Basique servent. Il reçoit 3 Cristaux, aux couleurs des points en bas de sa carte : réglez-les dans l'onglet Partie.`);
  li.push(`<b>Première Manche</b> : Jour. Tactiques, puis chaque Héros entre sur le Portail au début de son premier tour.`);
  return `<details class="howto"><summary>Mise en place pas à pas</summary><ol>${li.map(x=>`<li>${x}</li>`).join('')}</ol><p class="muted"><small>Règles générales du livret ; ce que le scénario précise au-dessus l'emporte.</small></p></details>`}
function scenChips(sc){return `<div class="row chips"><span class="chip">${sc.mode==='solo'?'Solo':'Coop à 2'}</span><span class="chip ${sc.src==='Maison'?'home':'off'}">${sc.src}</span>${sc.ext?`<span class="chip long">${sc.ext}</span>`:''}${sc.quest?`<span class="chip quest">Module Quêtes</span>`:''}${(()=>{const b=carnetStats()[sc.id];return b?`<span class="chip done">${b.win?'Réussi':'Tenté'}</span>`:''})()}<span class="chip">${sc.r} Manches</span><span class="chip ${sc.long?'long':''}">${sc.t}</span>${pips(sc.d)}</div>`}
function renderScen(){
  const list=SCEN.filter(x=>(F.mode==='all'||x.mode===F.mode)&&(F.src==='all'||(F.src==='off'?x.src!=='Maison':x.src==='Maison'))&&(!F.short||!x.long)&&(F.box==='all'||(F.box==='quest'?!!x.quest:(F.box==='ext')===!!x.ext))).sort((a,b)=>a.d-b.d);
  const fb=(k,v,l)=>`<button data-f="${k}:${v}" class="${String(F[k])===String(v)?'on':''}">${l}</button>`;
  return `<section class="panel"><h2>Choisir un scénario</h2>
    <div class="row">${fb('mode','all','Tous')}${fb('mode','solo','Solo')}${fb('mode','coop','Coop à 2')}</div>
    <div class="row">${fb('src','all','Toutes origines')}${fb('src','off','Livret')}${fb('src','home','Maison')}</div>
    <div class="row">${fb('box','all','Tout matériel')}${fb('box','base','Boîte de base')}${fb('box','ext','Avec extension')}${fb('box','quest','Module Quêtes')}</div>
    <div class="sub">Module Quêtes</div><div class="row">${['off','normal','merc','hero'].map(m=>`<button data-qm="${m}" class="${QM===m?'on':''}">${QML[m]}</button>`).join('')}</div>
    <p class="muted"><small>${QM==='normal'?'Mode Normal : chaque Cité gagne +1 niveau dans les scénarios classiques, pour compenser les récompenses des quêtes.':QM==='off'?'Module désactivé : les scénarios se jouent comme au livret.':'Mode '+QML[QM]+' : un seul lancer de dé, la difficulté vient du tirage, les Cités gardent leur niveau.'} Les scénarios marqués « Module Quêtes » sont déjà calibrés.</small></p>
    <div class="row">${fb('short',!F.short,F.short?'Parties de plus de 3 h masquées':'Parties de plus de 3 h affichées')}</div>
    <p class="muted"><small>${list.length} scénario${list.length>1?'s':''}, du plus facile au plus difficile. Une étiquette orangée signale ceux qui demandent une extension ; les autres se jouent avec la boîte de base. Les durées sont des estimations. « Officiel adapté » : scénario du livret joué en solo grâce à la règle « Autres missions Solo ».</small></p></section>`+
   list.map(sc=>`<section class="panel scen"><h2>${sc.n}</h2>${scenChips(sc)}<p>${sc.pitch}</p><details><summary>Mise en place et règles</summary>${scenBody(sc)}</details>
     <button class="primary" data-use="${sc.id}">${S.scen===sc.id&&S.phase!=='setup'?'Recommencer ce scénario':'Jouer ce scénario'}</button></section>`).join('')}
/* ================= Outils, Carnet, Chefs, Volkare guidé ================= */
function finishNow(){act(()=>{S.phase='over';S.flip=[];log(`Partie terminée pendant la Manche ${S.round}.`);autoCarnet()})}
function gameEntry(){if(!S.gid)return -1;return CB.entries.findIndex(e=>e.gid===S.gid)}
function autoCarnet(){if(!S.gid)S.gid=String(Date.now());if(gameEntry()<0){CB.entries.push({gid:S.gid,date:today(),scen:S.scen||'',mode:S.mode,heroes:'',result:'none',score:'',note:`${S.round} Manche${S.round>1?'s':''} jouée${S.round>1?'s':''}`,auto:true})}
  try{localStorage.setItem(CKEY,JSON.stringify(CB))}catch(e){}}
function overCarnet(){const i=gameEntry();if(i<0)return '';const e=CB.entries[i];
  return `<div class="box-c"><p class="muted"><small>✓ Partie enregistrée automatiquement dans le Carnet. Complétez-la ici :</small></p>
   <div class="sub">Résultat</div>${seg(`C.entries.${i}.result`,[['win','Réussite'],['lose','Échec'],['none','Non précisé']])}
   <div class="row"><label class="fld"><span class="sub">Score</span><input id="ov-score" type="number" step="0.5" inputmode="decimal" data-bind="C.entries.${i}.score" data-live="0" value="${esc(e.score)}"></label>
   <label class="fld"><span class="sub">Héros</span><input id="ov-heroes" type="text" data-bind="C.entries.${i}.heroes" data-live="0" value="${esc(e.heroes)}" placeholder="Tovak, Arythea…"></label></div>
   <label class="fld"><span class="sub">Note</span><input id="ov-note" type="text" data-bind="C.entries.${i}.note" data-live="0" value="${esc(e.note)}"></label>
   <div class="row"><button data-t="toScore">Calculer le score</button><button data-view="carnet">Voir le Carnet</button></div></div>`}
const esc=x=>String(x??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const ELS=['phys','fire','ice','cf'],ELN={phys:'physique',fire:'Feu',ice:'Glace',cf:'Feu Glacé'};
const TKEY='mk-outils-v1',KKEY='mk-chefs-v1',CKEY='mk-carnet-v1';
const z4=()=>({phys:0,fire:0,ice:0,cf:0});
const enNew=()=>({armor:4,atk:3,el:'phys',rp:false,rf:false,ri:false,vif:false,brutal:false,fort:false,tgt:true});
const pNew=()=>({glo:0,sp:0,aa:0,ar:0,cr:0,ul:0,uw:0,fo:0,av:0,bl:0});
function tBlank(){return{sub:'combat',calc:{site:false,phase:0,armor:2,sel:0,en:[enNew()],blk:z4(),atk:{ranged:z4(),siege:z4(),norm:z4()}},
  chefw:'sc',score:{scen:'',p:[pNew(),pNew()],o:{},win:false,heroes:''}}}
const rows12=()=>Array.from({length:12},()=>({a:'',t:'',f:''}));
function kBlank(){return{elem:rows12(),sc:rows12()}}
function cBlank(){return{entries:[],draft:{date:'',scen:'',heroes:'',result:'win',score:'',note:''}}}
const chefNew=()=>({lvl:null,start:null,combat:null,sh:{a:0,b:0},done:false});
function ld(k,f){try{const v=JSON.parse(localStorage.getItem(k)||'null');if(v)return v}catch(e){}return f()}
let T=Object.assign(tBlank(),ld(TKEY,tBlank)),K=ld(KKEY,kBlank),CB=Object.assign(cBlank(),ld(CKEY,cBlank));
T.calc=Object.assign(tBlank().calc,T.calc);T.score=Object.assign(tBlank().score,T.score);
function saveAll(){save();try{localStorage.setItem(TKEY,JSON.stringify(T));localStorage.setItem(KKEY,JSON.stringify(K));localStorage.setItem(CKEY,JSON.stringify(CB))}catch(e){}}
const ROOT={S:()=>S,T:()=>T,K:()=>K,C:()=>CB};
function getP(p){const k=p.split('.');let o=ROOT[k.shift()]();for(const x of k){if(o==null)return o;o=o[x]}return o}
function setP(p,v){const k=p.split('.');let o=ROOT[k.shift()]();const last=k.pop();for(const x of k)o=o[x];o[last]=v}
const stp=(p,min=0,max=99,step=1,lbl='')=>{const v=getP(p)||0;return `<span class="stp" ${lbl?`aria-label="${lbl}"`:''}><button data-inc="${p}|${-step}|${min}|${max}" aria-label="moins" ${v<=min?'disabled':''}>−</button><b>${v}</b><button data-inc="${p}|${step}|${min}|${max}" aria-label="plus" ${v>=max?'disabled':''}>+</button></span>`};
const tog=(p,l)=>`<button data-tog="${p}" class="pill ${getP(p)?'on':''}" aria-pressed="${!!getP(p)}">${l}</button>`;
const seg=(p,opts)=>`<div class="seg">${opts.map(([v,l])=>`<button data-set="${p}|${v}" class="${String(getP(p))===String(v)?'on':''}">${l}</button>`).join('')}</div>`;
const today=()=>{const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')};
const frDate=d=>{try{return new Date(d+'T12:00').toLocaleDateString('fr-FR',{day:'numeric',month:'short',year:'numeric'})}catch(e){return d}};
const scName=id=>{const s=SCEN.find(x=>x.id===id);return s?s.n:'Partie libre'};

/* ---------- Volkare guidé ---------- */
function armyCounts(l){let m=1;if(!ARMY[l]){m=2;l=l/2}const a=ARMY[l];if(!a)return null;return{w:a[0]*m,g:a[1]*m,r:a[2]*m,v:a[3]*m}}
const VA=[['w','Blancs'],['g','Gris'],['r','Rouges'],['v','Verts']];
const vkPlayers=()=>coop()?2:1;
const vkLeft=()=>VA.reduce((a,[k])=>a+(S.varmy[k]||0),0);
function volkState(){const v=volk(),left=vkLeft(),q=v.kind==='quete',need=q?2*vkPlayers():vkPlayers();
  return `<section class="panel"><div class="row between"><h2>Armée de Volkare</h2><span class="big-n ${left?'':'ok'}">${left}<small> jeton${left>1?'s':''}</small></span></div>
   ${left?'':`<div class="banner"><b>Toute l'armée est éliminée.</b> Volkare est vaincu : vous remportez la partie.</div>`}
   <div class="army">${VA.map(([k,l])=>`<div><span class="sub">${l}</span><div class="row"><button data-va="${k}|-1" ${S.varmy[k]?'':'disabled'}>Éliminé</button><b>${S.varmy[k]}</b><button data-va="${k}|1" aria-label="Ajouter un jeton ${l.toLowerCase()}">+</button></div></div>`).join('')}</div>
   <p class="muted"><small>Touchez « Éliminé » à chaque jeton vaincu, et + pour un jeton ajouté à son armée${q?'':` (Unité Indécise partie le rejoindre)`}.</small></p>
   <div class="meter"><span>Pertes depuis son dernier tour : <b>${S.vloss}</b> sur ${need}</span><i style="width:${Math.min(100,Math.round(100*S.vloss/need))}%"></i></div>
   ${S.vskip?`<div class="banner warn"><b>Volkare est ralenti.</b> Il passera son prochain tour : retournez son jeton Ordre de Jeu face cachée.</div>`
     :q?`<p class="muted"><small>S'il perd ${need} jetons avant de rejouer (deux par joueur), il passe son prochain tour.</small></p>`
     :`<p class="muted"><small>En défendant la Cité : s'il perd au moins ${need} jeton${need>1?'s':''} dans le combat (un par joueur), il recule d'une case ; sinon il prend la Cité.</small></p>`}
   <div class="stats"><div><span class="sub">Deck</span><b>${S.deck.length}</b></div><div><span class="sub">Défausse</span><b>${S.discard.length}</b></div><div><span class="sub">Tours</span><b>${S.turn}</b></div></div></section>`}
function vaChange(k,n){act(()=>{if(n<0&&!S.varmy[k])return;S.varmy[k]+=n;
  if(n<0){S.vloss++;const q=volk().kind==='quete';if(q&&!S.vskip&&S.vloss>=2*vkPlayers()){S.vskip=true;log(`Volkare a perdu ${S.vloss} jetons avant son tour : il est ralenti et passera son prochain tour.`)}
    else log(`Jeton ${({w:'blanc',g:'gris',r:'rouge',v:'vert'})[k]} de Volkare éliminé. Reste ${vkLeft()}.`);if(!vkLeft())log('Toute l\'armée de Volkare est éliminée : victoire !')}
  else log(`Un jeton ${({w:'blanc',g:'gris',r:'rouge',v:'vert'})[k]} rejoint l'armée de Volkare. Total ${vkLeft()}.`)})}

/* ---------- Calculatrice de combat ---------- */
const EFF={phys:ELS,fire:['ice','cf'],ice:['fire','cf'],cf:['cf']};
const resists=(e,el)=>el==='cf'?e.rf&&e.ri:el==='phys'?e.rp:el==='fire'?e.rf:e.ri;
function calcBlock(c){const e=c.en[c.sel]||c.en[0];if(!e)return null;let full=0,half=0;ELS.forEach(el=>{const v=c.blk[el];if(!v)return;EFF[e.el].includes(el)?full+=v:half+=v});
  const need=e.atk*(e.vif?2:1),total=full+Math.floor(half/2),dmg=e.atk*(e.brutal?2:1);return{e,full,half,total,need,ok:total>=need,dmg,w:Math.ceil(dmg/Math.max(1,c.armor))}}
function calcAtk(c){const t=c.en.filter(e=>e.tgt),p0=c.phase===0,fortT=t.some(e=>e.fort||c.site),dbl=p0&&t.some(e=>e.fort&&c.site);let full=0,half=0,ign=0;
  ['ranged','siege','norm'].forEach(k=>ELS.forEach(el=>{const v=c.atk[k][el];if(!v)return;if(p0&&(k==='norm'||(k==='ranged'&&fortT))){ign+=v;return}t.some(e=>resists(e,el))?half+=v:full+=v}));
  const need=t.reduce((a,e)=>a+e.armor,0),total=full+Math.floor(half/2);return{t,full,half,ign,total,need,dbl,fortT,ok:t.length&&!dbl&&total>=need}}
function renderCalc(){const c=T.calc,b=calcBlock(c),a=calcAtk(c);
  const enemy=(e,i)=>`<div class="foe"><div class="row between"><h3>Ennemi ${i+1}</h3><div class="row">${tog(`T.calc.en.${i}.tgt`,'Cible')}${c.en.length>1?`<button class="ghost" data-t="delEn|${i}" aria-label="Retirer l'ennemi ${i+1}">Retirer</button>`:''}</div></div>
    <div class="kv2"><span>Armure</span>${stp(`T.calc.en.${i}.armor`,1,40)}<span>Attaque</span>${stp(`T.calc.en.${i}.atk`,0,40)}</div>
    <div class="sub">Type d'attaque</div>${seg(`T.calc.en.${i}.el`,ELS.map(x=>[x,ELN[x][0].toUpperCase()+ELN[x].slice(1)]))}
    <div class="sub">Résiste</div><div class="row">${tog(`T.calc.en.${i}.rp`,'au physique')}${tog(`T.calc.en.${i}.rf`,'au Feu')}${tog(`T.calc.en.${i}.ri`,'à la Glace')}</div>
    <div class="sub">Capacités</div><div class="row">${tog(`T.calc.en.${i}.vif`,'Vif')}${tog(`T.calc.en.${i}.brutal`,'Brutal')}${tog(`T.calc.en.${i}.fort`,'Fortifié')}</div></div>`;
  const grid=(base,rows)=>`<div class="egrid"><span></span>${ELS.map(x=>`<span class="sub">${ELN[x]}</span>`).join('')}${rows.map(([k,l])=>`<span class="rl">${l}</span>${ELS.map(el=>stp(`${base}${k?'.'+k:''}.${el}`,0,60)).join('')}`).join('')}</div>`;
  return `<section class="panel"><h2>Le combat</h2>
    <div class="kv2"><span>Armure de votre Héros</span>${stp('T.calc.armor',1,9)}</div>
    <div class="row">${tog('T.calc.site','Assaut d\'un site fortifié')}</div>
    ${c.en.map(enemy).join('')}
    ${c.en.length<6?`<button data-t="addEn">Ajouter un ennemi</button>`:''}</section>
   <section class="panel"><h2>Parade</h2>
    ${c.en.length>1?`<div class="sub">Ennemi paré</div>${seg('T.calc.sel',c.en.map((e,i)=>[i,'Ennemi '+(i+1)]))}`:''}
    ${grid('T.calc.blk',[['','Parade']])}
    ${b?`<div class="verdict ${b.ok?'yes':'no'}"><b>${b.ok?'Attaque parée':'Parade insuffisante'}</b>
      <span>Efficace ${b.full} + inefficace ${b.half} ÷ 2 = <b>${b.total}</b> contre ${b.need}${b.e.vif?' (Vif : Attaque doublée)':''}.</span>
      ${b.ok?'':`<span>Non paré, il inflige <b>${b.dmg}</b> Dégâts${b.e.brutal?' (Brutal : doublés)':''} : <b>${b.w}</b> Blessure${b.w>1?'s':''} pour votre Héros, ou à répartir sur vos Unités.</span>`}
      <small class="muted">Contre une attaque ${ELN[b.e.el]}, ${b.e.el==='phys'?'toute Parade compte plein':'seules les Parades '+EFF[b.e.el].map(x=>ELN[x]).join(' et ')+' comptent plein'}.</small></div>`:''}
    <button class="ghost" data-t="clrBlk">Remettre la Parade à zéro</button></section>
   <section class="panel"><h2>Attaque</h2>
    ${seg('T.calc.phase',[[0,'Phase 1 · Distance et Siège'],[3,'Phase 4 · Attaque']])}
    <p class="muted"><small>Cibles : ${a.t.length?a.t.map(e=>'Ennemi '+(c.en.indexOf(e)+1)).join(', '):'aucune, cochez « Cible » sur un ennemi'}.</small></p>
    ${grid('T.calc.atk',[['ranged','Distance'],['siege','Siège'],['norm','Normale']])}
    <div class="verdict ${a.ok?'yes':'no'}"><b>${!a.t.length?'Choisissez une cible':a.dbl?'Cible intouchable dans cette phase':a.ok?'Cibles vaincues':'Attaque insuffisante'}</b>
     ${a.t.length&&!a.dbl?`<span>Pleine ${a.full} + réduite ${a.half} ÷ 2 = <b>${a.total}</b> contre ${a.need} d'Armure.</span>`:''}
     ${a.dbl?`<span>Un ennemi Fortifié qui défend un site fortifié ne peut être attaqué qu'en phase 4.</span>`:''}
     ${a.ign?`<span>${a.ign} point${a.ign>1?'s':''} ne compte${a.ign>1?'nt':''} pas en phase 1${a.fortT?' (contre un ennemi Fortifié, seul le Siège compte)':' (les Attaques normales attendent la phase 4)'}.</span>`:''}
     ${a.half?`<small class="muted">Une Résistance d'une des cibles divise par deux ${a.half} de vos points : séparer vos attaques peut éviter cette perte.</small>`:''}</div>
    <button class="ghost" data-t="clrAtk">Remettre l'Attaque à zéro</button></section>`}

/* ---------- Chefs de Faction ---------- */
const CHEF={elem:{n:'Élémentalistes',who:'Esprit de Tezla, Grande Prêtresse'},sc:{n:'Sombres Croisés',who:'Tezla d\'Obsidienne, Nécromancien'}};
const CHEF_START={'tz-vie':6,'tzc-vie':6,'tz-vallee':4,'tzc-vallee':6,'tz-morts':4,'tzc-morts':6};
function chefRow(w,l){const r=K[w][l-1]||{};return{a:parseInt(r.a,10)||0,t:r.t||'',f:r.f||''}}
function renderChef(){const w=T.chefw,c=S.chefs[w],sc=scen(),two=coop();
  let h=`<section class="panel"><h2>Chefs de Faction</h2>${seg('T.chefw',[['elem','Élémentalistes'],['sc','Sombres Croisés']])}<p class="muted"><small>${CHEF[w].who}. Immunisé aux Arcanes : seuls vos effets d'Attaque et de Parade le touchent.</small></p>`;
  if(c.lvl===null){const def=CHEF_START[S.scen]||(two?6:4);if(c.start===null)c.start=def;const r=chefRow(w,c.start);
    h+=`<div class="kv2"><span>Niveau de départ</span>${stp(`S.chefs.${w}.start`,1,12)}</div>
     <p class="muted"><small>${CHEF_START[S.scen]?`Valeur du scénario en cours : ${CHEF_START[S.scen]}.`:'Le scénario fixe ce niveau.'} ${r.f?`À ce niveau, il est accompagné de ${esc(r.f)} jetons de sa Faction.`:'Le jeton indique combien de fidèles l\'accompagnent.'}</small></p>
     <button class="primary big" data-t="chefPlace">Placer le Chef au niveau ${c.start}</button></section>`}
  else if(c.done)h+=`<div class="banner"><b>Chef vaincu.</b> Un Bouclier a été posé sur son niveau 1.</div><p>Boucliers posés : ${two?`joueur 1 : ${c.sh.a}, joueur 2 : ${c.sh.b}`:c.sh.a}.</p><button data-t="chefReset">Remettre ce Chef en jeu</button></section>`;
  else{const L=c.combat?c.combat.lvl:c.lvl,r=chefRow(w,L);
    h+=`<div class="chefbig"><div><span class="sub">Niveau</span><b>${c.lvl}</b></div><div><span class="sub">Armure</span><b>${r.a||'?'}</b></div><div><span class="sub">Attaque</span><b class="t">${r.t?esc(r.t):'?'}</b></div></div>
     ${r.a?'':`<p class="banner warn">Saisissez l'Armure et l'Attaque du niveau ${L} dans « Valeurs du jeton », plus bas.</p>`}`;
    if(!c.combat)h+=`<button class="primary big" data-t="chefStart">Commencer un combat contre ce Chef</button><p class="muted"><small>Boucliers déjà posés : ${two?`joueur 1 : ${c.sh.a}, joueur 2 : ${c.sh.b}`:c.sh.a}. Ses fidèles vaincus ne reviennent pas quand son niveau baisse.</small></p></section>`;
    else{const cb=c.combat,k=r.a?Math.floor(cb.hit/r.a):0,room=cb.lvl-cb.marks;
      h+=`<div class="banner">Combat en cours, au niveau ${cb.lvl} : Armure ${r.a||'?'} pour tout le combat. Regroupez en une seule attaque, par phase, tout ce que vous lancez contre lui.</div>
      ${two?`<div class="sub">Qui attaque ?</div>${seg(`S.chefs.${w}.combat.who`,[['a','Joueur 1'],['b','Joueur 2']])}`:''}
      <div class="kv2"><span>Valeur de l'attaque</span>${stp(`S.chefs.${w}.combat.hit`,0,99)}</div>
      <p class="verdict ${k?'yes':'no'}">${r.a?`${cb.hit} contre ${r.a} : <b>${Math.min(k,room)} niveau${Math.min(k,room)>1?'x':''}</b> en moins${k>room?' (il n\'en reste pas plus)':''}.`:'Armure inconnue pour ce niveau.'}</p>
      <div class="row"><button class="primary" data-t="chefHit" ${k&&room?'':'disabled'}>Poser ${Math.min(k,room)||''} Bouclier${Math.min(k,room)>1?'s':''}</button><button data-t="chefEnd">Fin du combat</button><button class="ghost" data-t="chefCancel">Annuler le combat</button></div>
      <p class="muted"><small>Boucliers posés pendant ce combat : <b>${cb.marks}</b>. ${cb.marks>=cb.lvl?'Un Bouclier est sur le niveau 1 : le Chef n\'attaque pas, et il sera vaincu à la fin du combat.':`À la fin du combat, il descendra au niveau ${cb.lvl-cb.marks}. Il vous attaque avec les valeurs du niveau ${cb.lvl}.`}</small></p></section>`}}
  h+=`<details class="panel" id="chefvals" ${T.chefOpen?'open':''}><summary>Valeurs du jeton ${CHEF[w].n}</summary><p class="muted"><small>Recopiez une fois pour toutes l'Armure, l'Attaque et le nombre de fidèles de chaque niveau, lus sur le grand jeton. Ces valeurs restent enregistrées pour vos prochaines parties.</small></p>
   <div class="ctab"><span class="sub">Niv.</span><span class="sub">Armure</span><span class="sub">Attaque</span><span class="sub">Fidèles</span>
   ${K[w].map((r,i)=>`<span class="rl">${i+1}</span><input id="k-${w}-${i}-a" inputmode="numeric" data-bind="K.${w}.${i}.a" value="${esc(r.a)}" aria-label="Armure niveau ${i+1}"><input id="k-${w}-${i}-t" data-bind="K.${w}.${i}.t" data-live="0" value="${esc(r.t)}" placeholder="ex. Feu 6" aria-label="Attaque niveau ${i+1}"><input id="k-${w}-${i}-f" inputmode="numeric" data-bind="K.${w}.${i}.f" data-live="0" value="${esc(r.f)}" aria-label="Fidèles niveau ${i+1}">`).join('')}</div></details>`;
  return h}
function chefAct(a){const w=T.chefw,c=S.chefs[w];act(()=>{
  if(a==='chefPlace'){c.lvl=c.start;c.sh={a:0,b:0};c.done=false;log(`Chef des ${CHEF[w].n} placé au niveau ${c.lvl}.`)}
  if(a==='chefStart'){c.combat={lvl:c.lvl,marks:0,hit:0,who:'a'};log(`Combat contre le Chef des ${CHEF[w].n} (niveau ${c.lvl}).`)}
  if(a==='chefHit'){const cb=c.combat,r=chefRow(w,cb.lvl),k=Math.min(Math.floor(cb.hit/r.a),cb.lvl-cb.marks);if(k<1)return;cb.marks+=k;c.sh[coop()?cb.who:'a']+=k;cb.hit=0;log(`${k} Bouclier${k>1?'s':''} posé${k>1?'s':''} sur le Chef des ${CHEF[w].n}.`)}
  if(a==='chefEnd'){const cb=c.combat;c.lvl=cb.lvl-cb.marks;c.combat=null;if(c.lvl<1){c.done=true;log(`Chef des ${CHEF[w].n} vaincu !`)}else log(`Fin du combat : le Chef des ${CHEF[w].n} passe au niveau ${c.lvl}.`)}
  if(a==='chefCancel'){const cb=c.combat;c.sh[coop()?cb.who:'a']-=cb.marks;c.combat=null}
  if(a==='chefReset'){S.chefs[w]=chefNew()}})}

/* ---------- Score ---------- */
const O_CITY=['n','Cités conquises',10,'cities'],O_ALLC=['c','Toutes les Cités conquises',15,'allc'],O_LORD=['c','Chaque joueur est Seigneur d\'au moins une Cité',10,'lord'],
 O_ROUND=['n','Manches non utilisées',30,'rounds'],O_DECK=['n','Cartes restant dans le Deck du Fantôme',1,'deck'],O_OPEN=['c','Fin de la Manche en cours non annoncée',5,'open'],O_VK=['v'];
const O_SOLO=[O_CITY,O_ALLC,O_ROUND,O_DECK,O_OPEN],O_COOP=[O_CITY,O_LORD,O_ALLC,O_ROUND,O_DECK,O_OPEN],O_MINES=[['n','Mines libérées sur tuile Campagne',4,'minc'],['n','Mines libérées sur tuile Royaume',7,'minr']];
const O_EACH20=['c','Chaque joueur a un Bouclier sur le Chef',20,'each'];
const SCO={reco:[],druides:[],mines:O_MINES,'mc-mines':O_MINES,eclair:O_SOLO,solo:O_SOLO,'m-siege':O_SOLO,'m-montre':O_SOLO,'v-camp':O_SOLO,
 dungeon:[['n','Donjons et Tombeaux conquis (2 points de plus chacun)',2,'dt']],'c-eclair':O_COOP,'c-totale':O_COOP,'mc-cite':O_COOP,
 'v-eclair':[['c','Cité conquise',20,'c20'],O_VK],'vc-eclair':[['c','Cité conquise',20,'c20'],O_VK],'v-epique':[['c','Cité conquise',20,'c20'],O_VK],'vc-epique':[['c','Cité conquise',20,'c20'],O_VK],
 'v-quete':[['n','Cités conquises',5,'c5'],O_VK],'vc-quete':[['n','Cités conquises',5,'c5'],O_VK],
 'tz-relique':[['n','Fragments retrouvés',5,'frag'],['c','Tous les fragments',10,'allf'],O_DECK,O_OPEN],'tzc-relique':[['n','Fragments retrouvés',5,'frag'],['c','Chaque joueur a trouvé un fragment',5,'eachf'],['c','Tous les fragments',10,'allf'],O_DECK,O_OPEN],
 'tz-vallee':[['c','Grande Prêtresse vaincue',20,'prt'],O_ROUND,O_DECK,O_OPEN],'tzc-vallee':[['c','Grande Prêtresse vaincue',20,'prt'],O_EACH20,O_ROUND,O_DECK,O_OPEN],
 'tz-morts':[['n','Cimetières scellés',5,'cim'],['c','Nécromancien vaincu',10,'nec'],['c','Tous les Cimetières scellés et Nécromancien vaincu',10,'allm'],O_ROUND,O_DECK,O_OPEN],
 'tzc-morts':[['n','Cimetières scellés',5,'cim'],['c','Nécromancien vaincu',10,'nec'],['c','Tous les Cimetières scellés et Nécromancien vaincu',10,'allm'],O_EACH20,O_ROUND,O_DECK,O_OPEN],
 'tz-vie':[['n','Avatars vaincus',10,'ava'],['c','Les deux Avatars vaincus',15,'both'],O_ROUND,O_DECK,O_OPEN],
 'tzc-vie':[['n','Avatars vaincus',10,'ava'],['c','Les deux Avatars vaincus',15,'both'],['c','Chaque joueur a un Bouclier sur au moins un Chef',10,'sh1'],['c','Chaque joueur a un Bouclier sur les deux Chefs',10,'sh2'],O_ROUND,O_DECK,O_OPEN]};
const HF=[['Le Savant',[['sp','Sorts',2],['aa','Actions Avancées',1]]],['Le Trésorier',[['ar','Artefacts',2],['cr','Cristaux (1 par paire)',.5]]],['Le Chef',[['ul','Niveaux d\'Unités non Blessées',1],['uw','Niveaux d\'Unités Blessées (moitié)',.5]]],
 ['Le Conquérant',[['fo','Boucliers sur Forteresses, Tours de Mage et Monastères',2]]],['L\'Aventurier',[['av','Boucliers sur sites d\'aventures',2]]],['La Victime',[['bl','Blessures dans votre Deck',-2]]]];
const hfCat=(p,items)=>items.reduce((s,[k,,m])=>s+(m===.5?Math.floor((p[k]||0)/2):(p[k]||0)*m),0);
function scoreDefaults(id){const o=T.score.o;if(o.__for===id)return;T.score.o={__for:id};const here=id===S.scen&&S.phase!=='setup';
  T.score.o.rounds=here?Math.max(0,S.rounds-S.round):0;T.score.o.deck=here?S.deck.length:0;T.score.o.open=here?!S.endBy:false;T.score.o.vkdeck=here&&volk()?S.deck.length:0;T.score.o.vc=here?S.vc:1;T.score.o.vp=here?S.vp:0;T.score.o.vk=here&&volk()?!vkLeft():false;T.score.o.cities=0}
function scoreCalc(){const id=T.score.scen,sc=SCEN.find(x=>x.id===id),two=sc?sc.mode==='coop':coop(),P=two?T.score.p:[T.score.p[0]],o=T.score.o,lines=[];
  const base=Math.min(...P.map(p=>p.glo||0));lines.push([two?'Gloire du joueur le moins avancé':'Votre Gloire',base]);
  HF.forEach(([n,items])=>{const v=P.map(p=>hfCat(p,items));const best=n==='La Victime'?Math.min(...v):Math.max(...v);if(best)lines.push([n,best])});
  (SCO[id]||[]).forEach(d=>{if(d[0]==='v'){if(o.vk){const b=([30,40,50][o.vc]+2*(o.vkdeck||0))*[1,1.5,2][o.vp];lines.push(['Volkare vaincu',Math.round(b*10)/10])}return}
    const v=d[0]==='n'?(o[d[3]]||0)*d[2]:(o[d[3]]?d[2]:0);if(v)lines.push([d[1],v])});
  return{lines,total:lines.reduce((a,l)=>a+l[1],0),two,sc}}
function renderScore(){if(T.score.scen===''&&S.scen)T.score.scen=S.scen;scoreDefaults(T.score.scen);const r=scoreCalc(),two=r.two,o=T.score.o,defs=SCO[T.score.scen]||[];
  const pcol=(k,max=99)=>two?`${stp(`T.score.p.0.${k}`,0,max)}${stp(`T.score.p.1.${k}`,0,max)}`:stp(`T.score.p.0.${k}`,0,max);
  return `<section class="panel"><h2>Score de fin de partie</h2>
   <label class="fld"><span class="sub">Scénario</span><select id="sc-scen" data-bind="T.score.scen"><option value="">Partie libre, sans barème de mission</option>${SCEN.map(x=>`<option value="${x.id}" ${x.id===T.score.scen?'selected':''}>${esc(x.n)} · ${x.mode==='solo'?'solo':'coop'}</option>`).join('')}</select></label>
   ${r.sc&&r.sc.src==='Maison'?`<p class="muted"><small>Scénario maison : il se joue à l'objectif. Le score ci-dessous sert à comparer vos parties.</small></p>`:''}</section>
  <section class="panel"><h2>Gloire et Hauts Faits</h2>${two?`<div class="pcols"><span></span><span class="sub">Joueur 1</span><span class="sub">Joueur 2</span></div>`:''}
   <div class="pgrid ${two?'two':''}"><span class="rl">Gloire</span>${two?`<input id="g0" type="number" inputmode="numeric" data-bind="T.score.p.0.glo" value="${T.score.p[0].glo}"><input id="g1" type="number" inputmode="numeric" data-bind="T.score.p.1.glo" value="${T.score.p[1].glo}">`:`<input id="g0" type="number" inputmode="numeric" data-bind="T.score.p.0.glo" value="${T.score.p[0].glo}">`}</div>
   ${HF.map(([n,items])=>`<div class="sub hf">${n}</div>${items.map(([k,l])=>`<div class="pgrid ${two?'two':''}"><span class="rl">${l}</span>${pcol(k)}</div>`).join('')}`).join('')}
   <p class="muted"><small>${two?'En équipe, chaque catégorie retient le meilleur joueur, et La Victime le plus Blessé. ':''}Sans titres en solo et en coopération. Barème de la carte de Score : vérifiez-le une fois sur la vôtre.</small></p></section>
  ${defs.length?`<section class="panel"><h2>Mission</h2>${defs.map(d=>d[0]==='v'?`<div class="sub hf">Volkare</div><div class="row">${tog('T.score.o.vk','Volkare vaincu')}</div>
     ${o.vk?`<div class="sub">Niveau de Combat</div>${seg('T.score.o.vc',[[0,'Audacieux'],[1,'Héroïque'],[2,'Légendaire']])}<div class="sub">Niveau de Poursuite</div>${seg('T.score.o.vp',[[0,'Équitable'],[1,'Tendu'],[2,'Palpitant']])}<div class="kv2"><span>Cartes restant dans son Deck</span>${stp('T.score.o.vkdeck',0,60)}</div>`:''}`
    :d[0]==='n'?`<div class="kv2"><span>${d[1]} <small class="muted">× ${d[2]}</small></span>${stp('T.score.o.'+d[3],0,60)}</div>`:`<div class="row">${tog('T.score.o.'+d[3],`${d[1]} · ${d[2]} pts`)}</div>`).join('')}</section>`:''}
  <section class="panel total"><div class="row between"><h2>Total</h2><span class="big-n">${Math.round(r.total*10)/10}</span></div>
   <div class="lines">${r.lines.map(([l,v])=>`<span>${l}</span><b>${v>0&&l!==r.lines[0][0]?'+':''}${Math.round(v*10)/10}</b>`).join('')}</div>
   <div class="sub">Pour le carnet</div><div class="row">${tog('T.score.win','Mission réussie')}</div>
   <label class="fld"><span class="sub">Héros joué${two?'s':''}</span><input id="sc-heroes" data-bind="T.score.heroes" data-live="0" value="${esc(T.score.heroes)}" placeholder="${two?'ex. Arythea et Tovak':'ex. Arythea'}"></label>
   <button class="primary big" data-t="scoreSave">Enregistrer dans le carnet</button><button class="ghost" data-t="scoreClear">Remettre le score à zéro</button></section>`}

/* ---------- Carnet ---------- */
function carnetStats(){const E=CB.entries,by={};E.forEach(e=>{if(!e.scen)return;const b=by[e.scen]||(by[e.scen]={n:0,win:0,best:null});b.n++;if(e.result==='win')b.win++;const sc=parseFloat(e.score);if(!isNaN(sc)&&(b.best===null||sc>b.best))b.best=sc});return by}
function renderCarnet(){const E=CB.entries,dr=CB.draft;if(!dr.date)dr.date=today();const by=carnetStats(),wins=E.filter(e=>e.result==='win').length;
  const left=SCEN.filter(x=>!by[x.id]),leftB=left.filter(x=>!x.ext),leftX=left.filter(x=>x.ext);
  return `<section class="panel"><h2>Carnet de campagne</h2><div class="stats"><div><span class="sub">Parties</span><b>${E.length}</b></div><div><span class="sub">Réussites</span><b>${wins}</b></div><div><span class="sub">Scénarios</span><b>${Object.keys(by).length}<small>/${SCEN.length}</small></b></div></div></section>
  <section class="panel"><h2>Ajouter une partie</h2>
   <label class="fld"><span class="sub">Date</span><input id="cd-date" type="date" data-bind="C.draft.date" data-live="0" value="${esc(dr.date)}"></label>
   <label class="fld"><span class="sub">Scénario</span><select id="cd-scen" data-bind="C.draft.scen"><option value="">Partie libre</option>${SCEN.map(x=>`<option value="${x.id}" ${x.id===dr.scen?'selected':''}>${esc(x.n)} · ${x.mode==='solo'?'solo':'coop'}</option>`).join('')}</select></label>
   <label class="fld"><span class="sub">Héros</span><input id="cd-heroes" data-bind="C.draft.heroes" data-live="0" value="${esc(dr.heroes)}" placeholder="ex. Arythea"></label>
   <div class="sub">Résultat</div>${seg('C.draft.result',[['win','Réussite'],['lose','Échec'],['none','Sans objectif']])}
   <label class="fld"><span class="sub">Score</span><input id="cd-score" type="number" inputmode="decimal" data-bind="C.draft.score" data-live="0" value="${esc(dr.score)}"></label>
   <label class="fld"><span class="sub">Note</span><input id="cd-note" data-bind="C.draft.note" data-live="0" value="${esc(dr.note)}" placeholder="ce qui a marché, ce qui a coincé"></label>
   <button class="primary big" data-t="carnetAdd">Ajouter au carnet</button></section>
  ${E.length?`<section class="panel"><div class="row between"><h2>Parties jouées</h2><button class="ghost" data-t="carnetCopy">Copier le carnet</button></div>
   <ol class="entries">${E.map((e,i)=>({e,i})).reverse().map(({e,i})=>`<li><div class="row between"><b class="en">${esc(scName(e.scen))}</b><span class="chip ${e.result==='win'?'off':e.result==='lose'?'long':''}">${e.result==='win'?'Réussite':e.result==='lose'?'Échec':'Partie'}</span></div>
     <span class="muted">${frDate(e.date)} · ${e.mode==='coop'?'coop':'solo'}${e.heroes?' · '+esc(e.heroes):''}${e.score!==''&&e.score!=null?' · <b>'+esc(e.score)+'</b> pts':''}</span>${e.note?`<span class="note">${esc(e.note)}</span>`:''}
     <button class="ghost del" data-t="carnetDel|${i}">Supprimer</button></li>`).join('')}</ol><p id="copymsg" class="muted"><small></small></p></section>`:''}
  ${Object.keys(by).length?`<section class="panel"><h2>Par scénario</h2><div class="lines">${Object.entries(by).map(([id,b])=>`<span>${esc(scName(id))}</span><b>${b.win}/${b.n}${b.best!==null?' · '+b.best:''}</b>`).join('')}</div><p class="muted"><small>Réussites sur parties jouées, puis meilleur score.</small></p></section>`:''}
  <section class="panel"><h2>À tenter</h2>${left.length?`<p class="muted"><small>${left.length} scénario${left.length>1?'s':''} jamais joué${left.length>1?'s':''}.</small></p>
   ${leftB.length?`<div class="sub">Boîte de base</div><div class="todo">${leftB.sort((a,b)=>a.d-b.d).map(x=>`<button data-use="${x.id}">${esc(x.n)} <small>${x.mode==='solo'?'solo':'coop'}</small></button>`).join('')}</div>`:''}
   ${leftX.length?`<div class="sub">Avec extension</div><div class="todo">${leftX.sort((a,b)=>a.d-b.d).map(x=>`<button data-use="${x.id}">${esc(x.n)} <small>${x.mode==='solo'?'solo':'coop'}</small></button>`).join('')}</div>`:''}`:'<p>Vous avez tout joué au moins une fois. Bravo.</p>'}</section>`}
function carnetText(){return 'Carnet de campagne Mage Knight\n'+CB.entries.map(e=>`${e.date} · ${scName(e.scen)} (${e.mode==='coop'?'coop':'solo'}) · ${e.result==='win'?'réussite':e.result==='lose'?'échec':'partie'}${e.score!==''&&e.score!=null?' · '+e.score+' pts':''}${e.heroes?' · '+e.heroes:''}${e.note?' · '+e.note:''}`).join('\n')}

/* ---------- Onglet Outils ---------- */
function renderTools(){return `<div class="seg subnav">${[['combat','Combat'],['chef','Chefs de Faction'],['score','Score']].map(([v,l])=>`<button data-set="T.sub|${v}" class="${T.sub===v?'on':''}">${l}</button>`).join('')}</div>`+
  (T.sub==='chef'?renderChef():T.sub==='score'?renderScore():renderCalc())}

/* ---------- Événements ---------- */
function rerender(el){const id=el&&el.id;let pos=null;try{pos=el.selectionStart}catch(e){}render();if(id){const n=document.getElementById(id);if(n){n.focus();try{if(pos!==null)n.setSelectionRange(pos,pos)}catch(e){}}}}
function bindSet(el){const p=el.dataset.bind;let v=el.value;if(el.type==='number')v=v===''?'':Number(v);setP(p,v);saveAll();if(el.dataset.live!=='0')rerender(el)}
APPROOT.addEventListener('click',e=>{const sm=e.target.closest('summary');if(sm&&sm.parentElement&&sm.parentElement.id==='chefvals'){T.chefOpen=!sm.parentElement.open;saveAll()}});
APPROOT.addEventListener('input',e=>{const el=e.target;if(el.dataset&&el.dataset.bind&&el.tagName!=='SELECT')bindSet(el)});
APPROOT.addEventListener('change',e=>{const el=e.target;if(el.dataset&&el.dataset.bind&&el.tagName==='SELECT')bindSet(el)});
APPROOT.addEventListener('click',e=>{const b=e.target.closest('button');if(!b||b.disabled)return;const d=b.dataset;
  if(d.inc){const [p,st,mn,mx]=d.inc.split('|');setP(p,Math.max(+mn,Math.min(+mx,(+getP(p)||0)+ +st)));saveAll();return render()}
  if(d.tog){setP(d.tog,!getP(d.tog));saveAll();return render()}
  if(d.set){const [p,v]=d.set.split('|');setP(p,/^-?\d+$/.test(v)?+v:v);saveAll();return render()}
  if(d.va){const [k,n]=d.va.split('|');return vaChange(k,+n)}
  if(!d.t)return;const [a,x]=d.t.split('|');
  if(a==='addEn'){T.calc.en.push(enNew())}
  else if(a==='delEn'){T.calc.en.splice(+x,1);T.calc.sel=0}
  else if(a==='clrBlk'){T.calc.blk=z4()}
  else if(a==='clrAtk'){T.calc.atk={ranged:z4(),siege:z4(),norm:z4()}}
  else if(a.startsWith('chef'))return chefAct(a);
  else if(a==='scoreClear'){T.score=Object.assign(tBlank().score,{scen:T.score.scen})}
  else if(a==='toScore'){T.sub='score';T.score.scen=S.scen||'';S.view='tools'}
  else if(a==='scoreSave'){const r=scoreCalc(),gi=(S.phase==='over'&&T.score.scen===(S.scen||''))?gameEntry():-1;if(gi>=0){const e=CB.entries[gi];Object.assign(e,{mode:r.two?'coop':'solo',heroes:T.score.heroes||e.heroes,result:T.score.win?'win':'lose',score:Math.round(r.total*10)/10});S.view='carnet'}else CB.entries.push({date:today(),scen:T.score.scen,mode:r.two?'coop':'solo',heroes:T.score.heroes,result:(r.sc&&r.sc.src!=='Maison'&&!(SCO[T.score.scen]||[]).length&&!T.score.win)?'none':T.score.win?'win':'lose',score:Math.round(r.total*10)/10,note:''});S.view='carnet'}
  else if(a==='carnetAdd'){const dr=CB.draft,sc=SCEN.find(z=>z.id===dr.scen);CB.entries.push({date:dr.date||today(),scen:dr.scen,mode:sc?sc.mode:'solo',heroes:dr.heroes,result:dr.result,score:dr.score,note:dr.note});CB.draft=Object.assign(cBlank().draft,{date:today()})}
  else if(a==='carnetDel'){if(b.dataset.armed!=='1'){b.dataset.armed='1';b.textContent='Toucher encore pour supprimer';return}CB.entries.splice(+x,1)}
  else if(a==='carnetCopy'){const m=$('#copymsg small');try{navigator.clipboard.writeText(carnetText()).then(()=>{m.textContent='Carnet copié : collez-le dans une note pour le garder.'},()=>{m.textContent='La copie a été refusée par le navigateur.'})}catch(err){m.textContent='La copie n\'est pas disponible ici.'}return}
  saveAll();render()});

function render(){
  $('#when').textContent=S.phase==='setup'?'Aide de jeu pour le solo et la coopération':S.phase==='over'?'Partie terminée':`Manche ${S.round}/${S.rounds} · ${isDay()?'Jour':'Nuit'}`;
  $('#tabs').innerHTML=[['game','Partie'],['tools','Outils'],['scen','Scénarios'],['carnet','Carnet']].map(([v,l])=>`<button data-view="${v}" class="${S.view===v?'on':''}">${l}</button>`).join('');
  if(S.view==='scen'){$('#app').innerHTML=renderScen();return}
  if(S.view==='tools'){$('#app').innerHTML=renderTools();return}
  if(S.view==='carnet'){$('#app').innerHTML=renderCarnet();return}
  const sc=scen();let h=sc?`<section class="panel"><div class="row between"><h2>${sc.n}</h2><button data-view="scen">Changer</button></div>${scenChips(sc)}<details><summary>Rappel du scénario</summary>${scenBody(sc)}</details></section>`:'';
  if(S.phase==='setup'&&volk())h+=volkSetup();
  else if(S.phase==='setup'){
    h+=`<section class="panel"><h2>Mise en place du Fantôme</h2>
     ${sc?'':`<p class="muted">Aucun scénario choisi : passez par l'onglet Scénarios, ou réglez la partie à la main ci-dessous.</p><div class="row"><button data-mode="solo" class="${!coop()?'on':''}">Solo</button><button data-mode="coop" class="${coop()?'on':''}">Coopération à deux</button></div>`}
     <p class="muted">Prenez au hasard un Héros que personne n'a choisi. Le compagnon remplace son Deck et ses Cristaux : rien à poser sur la table pour lui.</p>
     <div class="sub">Ses 3 Cristaux de départ</div><p class="muted"><small>Les trois points colorés en bas de sa carte Héros. Exemple du livret : Goldyx a vert, vert, bleu.</small></p>
     ${S.dummyCrys.map((c,i)=>`<div class="pick">${KEYS.map(k=>`<button data-dc="${i}:${k}" class="${c===k?'on':''}">${ico(k)}${COL[k]}</button>`).join('')}</div>`).join('')}
     <div class="sub">Son Deck de 16 cartes Action Basique, par couleur</div>
     <div class="gems">${KEYS.map(k=>`<div class="gem"><span class="ico c-${k}"></span><b>${S.counts[k]}</b><div class="row"><button data-cnt="${k}:-1" aria-label="moins">−</button><button data-cnt="${k}:1" aria-label="plus">+</button></div></div>`).join('')}</div>
     <p class="muted"><small>Par défaut 4 de chaque couleur. Vérifiez sur les cartes du Héros et corrigez si besoin. Total : ${KEYS.reduce((a,k)=>a+S.counts[k],0)}.</small></p>
     <div class="sub">Nombre de Manches</div>
     <div class="row"><button data-rounds="-1" aria-label="moins">−</button><b>${S.rounds}</b><button data-rounds="+1" aria-label="plus">+</button><span class="muted"><small>${Math.ceil(S.rounds/2)} Jour${S.rounds>1?'s':''}, ${Math.floor(S.rounds/2)} Nuit${S.rounds>3?'s':''}</small></span></div>
     <button class="primary big" data-go="start">Commencer la partie</button></section>`;
  }
  else if(S.phase==='tactic'){
    const rem=S.removed[tset()];const nums=fn=>[1,2,3,4,5,6].map(fn).join('');
    if(!coop())h+=`<section class="panel"><h2>Tactiques de ${isDay()?'Jour':'Nuit'}</h2>
     <p>Choisissez votre carte Tactique sur la table, puis touchez son numéro. ${volk()?'Volkare':'Le Fantôme'} tire la sienne au hasard parmi les restantes.</p>
     <div class="tacs">${nums(n=>`<button data-tac="${n}" ${rem.includes(n)?'disabled title="Déjà retirée"':''}>${n}</button>`)}</div>
     ${rem.length?`<p class="muted"><small>Retirées pour la partie : ${rem.join(', ')}.</small></p>`:''}</section>`;
    else if(!S.tac.dummy&&!volk())h+=`<section class="panel"><h2>Tactiques de ${isDay()?'Jour':'Nuit'}</h2><p>En coopération, le Fantôme tire sa Tactique au hasard avant que vous ne choisissiez les vôtres.</p>
     ${rem.length?`<p class="muted"><small>Retirées pour la partie : ${rem.join(', ')}.</small></p>`:''}<button class="primary big" data-go="dtac">Tirer la Tactique du Fantôme</button></section>`;
    else h+=`<section class="panel"><h2>Tactiques de ${isDay()?'Jour':'Nuit'}</h2>${volk()?`<p>Contre Volkare, les joueurs choisissent d'abord ; il tirera ensuite sa Tactique parmi les restantes.</p>`:`<div class="banner">Le Fantôme prend la Tactique <b>${S.tac.dummy}</b>. Retirez-la de la table.</div>`}
     <p>Choisissez les vôtres, le joueur le moins Glorieux en premier, puis indiquez-les ici.</p>
     <div class="sub">Joueur 1</div><div class="tacs">${nums(n=>`<button data-mt="me:${n}" class="${S.tac.me===n?'on':''}" ${rem.includes(n)||n===S.tac.dummy||n===S.tac.p2?'disabled':''}>${n}</button>`)}</div>
     <div class="sub">Joueur 2</div><div class="tacs">${nums(n=>`<button data-mt="p2:${n}" class="${S.tac.p2===n?'on':''}" ${rem.includes(n)||n===S.tac.dummy||n===S.tac.me?'disabled':''}>${n}</button>`)}</div>
     <button class="primary big" data-go="manual" ${S.tac.me&&S.tac.p2?'':'disabled'}>Valider les Tactiques</button></section>`;
    h+=stateHtml();
  }
  else if(S.phase==='play'){
    let banner='',main='';const C=coop();
    if(S.endBy==='dummy'){banner=`<div class="banner warn"><b>Le Fantôme a annoncé la fin de la Manche.</b> ${C?'Chaque joueur joue son dernier tour':'Jouez votre dernier tour'}, puis terminez la Manche.</div>`;main=`<button class="primary big" data-go="endround">${C?'Nos derniers tours sont joués':'Mon dernier tour est joué'} : fin de la Manche</button>`}
    else if(S.endBy==='me'&&S.dummyLastDone){banner=`<div class="banner">${volk()?'Volkare ne joue pas de dernier tour.':'Le Fantôme a joué son dernier tour.'}${C?' N\'oubliez pas celui de l\'autre joueur.':''}</div>`;main=`<button class="primary big" data-go="endround">Terminer la Manche</button>`}
    else if(S.endBy==='me'){banner=`<div class="banner">Fin de la Manche annoncée : le Fantôme joue un dernier tour${C?', l\'autre joueur aussi':''}.</div>`;main=`<button class="primary big" data-go="dummy">Dernier tour du Fantôme</button>`}
    else{if(!volk()&&(S.mustAnnounce||!S.deck.length))banner=`<div class="banner warn">Au prochain tour, le Fantôme annoncera la fin de la Manche.</div>`;
      main=`<button class="primary big" data-go="dummy">Tour ${volk()?'de Volkare':'du Fantôme'}</button>${volk()?`<button data-go="vdie">Lancer le dé d'attaque de Volkare</button>`:''}<button data-go="announce">${C?'Un joueur annonce':'J\'annonce'} la fin de la Manche</button>`}
    h+=`<section class="panel"><p><span class="sub">Ordre de jeu</span><br>${orderText()}</p>${banner}${main}
      ${volk()?volkPanel():S.flip.length?`<div class="sub">Dernier tour du Fantôme</div>${cardsHtml(S.flip)}`:''}</section>`+stateHtml();
  }
  else if(S.phase==='prep'&&volk())h+=`<section class="panel"><h2>Préparer la Manche ${S.round} (${isDay()?'Jour':'Nuit'})</h2><p>Préparez la Manche comme d'habitude : Source, Offres, Decks des joueurs. Reposez les Unités de l'Offre en commençant par les emplacements marqués d'un Cristal. Le Deck de Volkare reste tel quel.</p><button class="primary big" data-go="prep">Passer aux Tactiques</button></section>`+stateHtml();
  else if(S.phase==='prep'){
    const rm=needRm();
    h+=`<section class="panel"><h2>Préparer la Manche ${S.round} (${isDay()?'Jour':'Nuit'})</h2>
      ${rm?`<p>Mettez-vous d'accord pour retirer du jeu une des Tactiques que vous venez d'utiliser.</p><div class="row">${[S.tac.me,S.tac.p2].map(n=>`<button data-prep="rm:${n}" class="${String(S.prep.rm)===String(n)?'on':''}">Tactique ${n}</button>`).join('')}</div>`:''}
      <p>Renouvelez l'Offre d'Actions Avancées comme d'habitude. Quelle est la couleur de la carte retirée du bas ? Elle rejoint le Deck du Fantôme.</p>
      <div class="pick">${KEYS.map(k=>`<button data-prep="aa:${k}" class="${S.prep.aa===k?'on':''}">${ico(k)}${COL[k]}</button>`).join('')}</div>
      <p>Renouvelez l'Offre de Sorts. Quelle est la couleur du Sort retiré ? Le Fantôme gagne un Cristal de cette couleur.</p>
      <div class="pick">${KEYS.map(k=>`<button data-prep="spell:${k}" class="${S.prep.spell===k?'on':''}">${ico(k)}${COL[k]}</button>`).join('')}</div>
      <button class="primary big" data-go="prep" ${S.prep.aa&&S.prep.spell&&(!rm||S.prep.rm)?'':'disabled'}>Remélanger et passer aux Tactiques</button></section>`+stateHtml();
  }
  else h+=`<section class="panel"><h2>Partie terminée</h2><p>Les ${S.rounds} Manches sont jouées. ${sc?sc.score:'Comptez votre score avec la carte de Score.'}</p>
      <p class="muted">Cartes restant dans le Deck ${volk()?'de Volkare':'du Fantôme'} : ${S.deck.length}.</p>${overCarnet()}<button class="primary big" data-go="new">Nouvelle partie</button></section>`+stateHtml();
  h+=`<section class="panel"><div class="row between"><h2>Historique</h2><div class="row"><button data-go="undo" ${HIST.length?'':'disabled'}>Annuler</button>${S.phase!=='setup'&&S.phase!=='over'?'<button data-go="finish">Terminer la partie</button>':''}${S.phase!=='setup'?'<button data-go="reset">Recommencer</button>':''}</div></div>
     ${S.log.length?`<ol class="log" reversed>${S.log.map(l=>`<li>${l}</li>`).join('')}</ol>`:'<p class="muted">Rien pour l\'instant.</p>'}</section>`;
  $('#app').innerHTML=h;
}
let confirmReset=false,confirmUse=null,confirmFinish=false;
APPROOT.addEventListener('click',e=>{const t=e.target.closest('button');if(!t||t.disabled)return;const d=t.dataset;
  if(d.view){S.view=d.view;save();return render()}
  if(d.f){const [k,v]=d.f.split(':');F[k]=k==='short'?v==='true':v;return render()}
  if(d.qm){QM=d.qm;try{localStorage.setItem('mk-quetes-mode',QM)}catch(e){}return render()}
  if(d.use){if(S.phase!=='setup'&&S.phase!=='over'&&confirmUse!==d.use){confirmUse=d.use;t.textContent='Une partie est en cours : toucher encore pour la remplacer';return}confirmUse=null;return useScen(d.use)}
  if(d.mode){S.mode=d.mode;save();return render()}
  if(d.dc){const [i,k]=d.dc.split(':');S.dummyCrys[+i]=k;save();return render()}
  if(d.cnt){const [k,n]=d.cnt.split(':');S.counts[k]=Math.max(0,Math.min(16,S.counts[k]+ +n));save();return render()}
  if(d.rounds){S.rounds=Math.max(1,Math.min(12,S.rounds+ +d.rounds));save();return render()}
  if(d.cr){const [k,n]=d.cr.split(':');return act(()=>{S.crystals[k]=Math.max(0,S.crystals[k]+ +n);log(`Correction : Cristaux ${COL[k]}s du Fantôme à ${S.crystals[k]}.`)})}
  if(d.vc){S.vc=+d.vc;save();return render()}
  if(d.vp){S.vp=+d.vp;save();return render()}
  if(d.vcity){S.vcity=!S.vcity;save();return render()}
  if(d.tac)return pickTac(+d.tac);
  if(d.mt){const [w,n]=d.mt.split(':');S.tac[w]=+n;save();return render()}
  if(d.prep){const [w,k]=d.prep.split(':');S.prep[w]=w==='rm'?+k:k;save();return render()}
  switch(d.go){
    case 'start':return startGame();
    case 'dtac':return drawDummyTac();
    case 'manual':return act(()=>{if(volk()){const left=[1,2,3,4,5,6].filter(x=>x!==S.tac.me&&x!==S.tac.p2&&!S.removed[tset()].includes(x));S.tac.dummy=left[rnd(left.length)]}beginPlay()});
    case 'vdie':return volkDie();
    case 'dummy':return dummyTurn();
    case 'announce':return iAnnounce();
    case 'endround':return endRound();
    case 'finish':if(!confirmFinish){confirmFinish=true;t.textContent='Toucher encore : la partie sera close et notée au Carnet';setTimeout(()=>{confirmFinish=false;render()},3000);return}confirmFinish=false;return finishNow();
    case 'prep':return prepDone();
    case 'undo':return undo();
    case 'reset':case 'new':
      if(d.go==='reset'&&!confirmReset){confirmReset=true;t.textContent='Toucher encore pour confirmer';setTimeout(()=>{confirmReset=false;render()},3000);return}