/* ---------- données des ateliers ---------- */
const ZONES=[['Deck','Votre pioche personnelle, face cachée. Vous y piochez votre main. Videz au moment de piocher : vous mélangez votre défausse.'],
['Main','5 cartes par défaut. Les cartes gagnées y arrivent presque toujours.'],
['Défausse','Face visible. Les cartes jouées et défaussées y vont, ainsi que les Régions Abandonnées.'],
['Zone de jeu','Vos cartes permanentes, surtout vos Régions. Elles y restent jusqu\'à ce qu\'un effet les retire.'],
['Pioche Nation','Cartes de votre nation, face cachée, posées en travers sur l\'Avènement. Une carte en sort à chaque mélange de votre défausse.'],
['Avènement','Dernière carte de la pioche Nation. Quand elle rejoint votre défausse, votre carte État se retourne : Barbare devient Empire. Vikings : c\'est le Zénith, qui déclenche la fin de partie.'],
['Développements','Cartes face visible que vous ajoutez une par une, en payant leur coût, une fois la pioche Nation vide. Développer la dernière déclenche le Décompte.'],
['Carte État','Barbare ou Empire. Elle porte vos jetons Action et Épuisé disponibles et détermine quelles cartes vous pouvez jouer de votre main.'],
['Carte Puissance','Le pouvoir propre à votre nation. Elle peut souvent être Épuisée comme une carte en jeu.'],
['Histoire','Les cartes archivées sous votre carte Puissance. Hors jeu, mais leurs points comptent.'],
['Réserve','Vos jetons Matériaux, Population et Progrès disponibles. Départ : 3 Matériaux, 2 Population, 1 Progrès.'],
['Cartes Réservées','Cartes glissées sous une carte en jeu. Inutilisables, mais comptées au score.']];
const ANAT=[[8,6,'Icône d\'entête','Indiquez une carte permanente, qui reste en jeu une fois posée, ou une Attaque, qui touche les autres joueurs.'],
[66,6,'Nom','L\'intitulé de la carte. Certaines cartes se désignent entre elles par leur nom.'],
[90,6,'Bandeau','Sa couleur correspond à la catégorie. C\'est elle qui sert à trier les cartes à la mise en place. Les cartes sans catégorie ont un bandeau gris.'],
[88,22,'Icône d\'État','Barbare ou Empire. Vous ne jouez la carte de votre main que si votre carte État correspond.'],
[8,30,'Icônes de type','Ville, Rivière, Océan, Terrain fertile, etc. Aucun effet propre, mais d\'autres cartes s\'y réfèrent.'],
[7,55,'Effet','Ce que fait la carte et quand. Les mots-clés y sont en évidence.'],
[7,64,'Coût de Développement','Sur les cartes Développement : ce que vous payez pour l\'ajouter à votre deck.'],
[6,93,'Couleur de nation','Coin inférieur gauche coloré : la carte appartient à une nation. Sans couleur : carte commune.'],
[18,84,'Emplacement de départ','Icône qui dit où va la carte à la mise en place : en jeu, pioche Nation, Avènement, Développement ou pile Instabilités. Sans icône : deck de départ.'],
[36,84,'Limite de joueurs','Une carte marquée 3+ ne sert pas à deux joueurs ni en solo ; une carte marquée 4 ne sert qu\'à quatre.'],
[40,93,'Numéro','Référence de la carte. Le premier chiffre indique la boîte : 1 pour Antique.'],
[60,84,'Catégorie','Région, Tradition, Civilisé, Vassal, Renommée ou Instabilités. Déterminez ce que vous pouvez Acquérir ou Innover.'],
[90,93,'Points de victoire','Valeur fixe, conditionnelle, variable (10 au plus) ou négative.']];
const ST1=['Choisissez une nation et prenez toutes ses cartes (repère : la couleur du coin inférieur gauche).','Posez votre carte Puissance devant vous. Si elle a deux faces, prenez la face B pour débuter.','Posez votre carte État face Barbare visible.','Placez 3 jetons Action et 5 jetons Épuisé sur votre carte État.','Alignez vos cartes Développement face visible : c\'est votre zone de Développement.','Posez votre carte Avènement face visible. Mélangez vos cartes Nation et posez-les dessus, face cachée, en travers.','Prenez 3 Matériaux, 2 Population et 1 Progrès : c\'est votre réserve.','Mettez de côté les cartes Instabilités de départ de votre nation (Celtes, Vikings) : elles rejoindront la pile commune. Retirez les cartes 3+ ou 4 qui ne correspondent pas au nombre de joueurs.','Mélangez les cartes qui restent : c\'est votre deck. Prévoyez la place de votre défausse et de votre zone de jeu à droite.','Piochez 5 cartes.'];
const ST2=n=>['Formez le stock : tous les jetons à portée de main.','Triez les cartes communes selon la couleur de leur bandeau.',n<4?(n===3?'Retirez les cartes communes marquées 4.':'Retirez les cartes communes marquées 3+ et 4.'):'À quatre joueurs, toutes les cartes communes servent.','Posez toutes les Instabilités face visible, en pile, avec celles mises de côté par les joueurs. Laissez de la place à côté pour la pile Exil.','Posez Roi des rois face A visible. Mélangez les autres Renommées et posez dessus, en travers, une pile face cachée de '+(n+4)+' cartes. Le surplus retourne dans la boîte sans être regardé.','Formez trois pioches face cachée de '+(n+4)+' cartes chacune : Région, Tradition, Civilisé.','Mélangez ensemble tous les Vassaux et le reste des Régions, Traditions et Civilisés : c\'est la pioche Principale, posée à l\'horizontale.','Retournez une carte de chaque pioche Région, Tradition et Civilisé, et deux cartes de la pioche Principale : les cinq cartes du Marché.','Glissez une Instabilité sous chaque carte du Marché qui n\'est pas une Région.','Posez 1 Progrès sur chaque carte du Marché à bandeau blanc (les Civilisés).','Tirez au sort le premier joueur. Placez le jeton Solstice entre lui et son voisin de droite.'];
const ORD=[['Activation','L\'ordre de presque tous vos tours.','<ul><li>Vous faites des Actions et vous utilisez des capacités Épuiser, dans l\'ordre et la combinaison que vous voulez.</li><li>Vous vous arrêtez quand vous ne pouvez ou ne voulez plus rien faire.</li><li>Puis Nettoyage.</li></ul><p><b>À choisir quand</b> vous avez des cartes à jouer ou des capacités Épuiser utiles.</p>'],
['Recherche','Une carte choisie, sans Instabilité.','<ol><li>Mettez toute votre main dans votre défausse.</li><li>Innovez une Région, une Tradition, un Civilisé ou un Vassal. Pas une Renommée.</li><li>Puis Nettoyage.</li></ol><p>Aucune Action, aucune capacité Épuiser. Les capacités Passif restent actives.</p><p><b>À choisir quand</b> votre main est faible et qu\'une carte du Marché vous fait vraiment envie, ou que vous voulez éviter une Instabilité. Dans Antique, cet ordre s\'appelait Innovation.</p>'],
['Pacification','Le grand ménage.','<ol><li>Renvoyez dans la pile autant de cartes Instabilités de votre main que vous voulez, sans rien payer.</li><li>Puis Nettoyage.</li></ol><p>Aucune Action, aucune capacité Épuiser. Les capacités Passif peuvent se déclencher.</p><p><b>À choisir quand</b> votre main est noyée sous les Instabilités, ou pour éloigner un Effondrement.</p>']];
const CNT=[['Les cartes de votre main',1],['Les cartes de votre zone de jeu',1],['Les cartes de votre deck',1],['Les cartes de votre défausse',1],['Les cartes de votre Histoire',1],['Votre carte Puissance',1],['Les cartes Réservées sous vos cartes en jeu',1],['Les cartes encore dans votre pioche Nation',0],['Les cartes non Développées de votre zone de Développement',0],['Les jetons Progrès de votre réserve',1],['Les jetons Progrès posés sur vos cartes',0]];
const NATS=[['Romains',1,'Belliqueux','Expansion rapide : conquérez des Régions pour jouer Gloire et gagner de la Renommée. Vos Légions prolongent les conquêtes une fois Empire. Mettez en jeu la Cité de Rome et faites-la évoluer. Quelques villes en plus aident à faire tourner le deck.',''],
['Perses',1,'Belliqueux','Soumettez les autres nations : accumulez les Vassaux et étendez vos territoires. Une fois Empire, attaquez avec le Bélier et répandez les Instabilités avec l\'Or des Perses, ou misez sur Satrape pour gagner des Actions, après avoir assuré vos Matériaux avec les Moulins à vent.',''],
['Macédoniens',1,'Plutôt pacifiste','La nation de l\'expansion : accumulez les Régions et gardez-les en jeu. Conquête reste utile une fois Empire grâce à Alexandre et sa Cavalerie. Jouez Gloire tôt et souvent, en synergie avec les Phalanges, et Réservez des cartes sous vos Régions en trop.',''],
['Carthaginois',2,'Belliqueux','Contrôlez le Marché et amassez les Matériaux avec Caravanes et Navires marchands. Une fois Empire : Éléphants menés par Hannibal, ou Monopole pour envoyer Instabilités et cartes gênantes chez les autres. Cherchez les océans.','Règle spéciale : au Nettoyage, vous ajoutez des Matériaux sur une carte du Marché à la place du Progrès. Le nombre dépend de votre carte Puissance.'],
['Celtes',2,'Impitoyable','Jeu agressif : acquérez des cartes et distribuez les Instabilités avec vos Druides. Sans Prospérité, vos ressources viennent de Vol de bétail et du Chaudron de Cerridwen. Vous cherchez à allonger la partie pour Développer vos cinq cartes.','Règle spéciale : l\'effet de la face A de votre carte Puissance gêne les autres, mais ce n\'est pas une Attaque : impossible de s\'en protéger.'],
['Scythes',2,'Belliqueux','Nomades : étendez votre territoire et exploitez vos Régions avec Tentes et Archers montés. Deck léger et très rapide grâce à Tamga, mais pauvre en points : guettez les cartes à points variables du Marché.',''],
['Grecs',3,'Belliqueux','Cités et technologie. Colons et Mercenaires grecs lancent votre expansion. Une fois Empire, Science vous fait progresser et les Jeux olympiques vous aident à gérer. Phare manipule la pile Exil : retenez ce que vous Exilez.',''],
['Vikings',3,'Impitoyable','Votre pioche Nation vous offre des cartes gratuites, dans un ordre que vous ne maîtrisez pas. Appuyez-vous sur Gothja, et Réservez des cartes avec vos Régions et vos Sagas pour dompter votre deck.','Règles spéciales : vous ne devenez jamais Empire, vous n\'avez ni zone de Développement ni Histoire (une carte à archiver est Défaussée). Votre carte du fond de pioche Nation est votre Zénith : quand elle rejoint votre défausse, la fin de partie est déclenchée et votre carte État ne se retourne pas.']];
const GLO=[['Abandonner','Mettez une Région en jeu dans votre défausse. Les ressources posées dessus reviennent dans votre réserve ; une carte Réservée dessous est défaussée aussi. Certains effets permettent d\'Abandonner seulement une carte Réservée.'],
['Acquérir','Prenez une carte visible du Marché de la catégorie indiquée, avec ses ressources et l\'Instabilité dessous. Le Marché est complété aussitôt.'],
['Action (gagner, dépenser)','Gagner : prenez un jeton Action du stock, même au-delà de trois. Dépenser : retirez le nombre de jetons demandé, sinon l\'effet est impossible.'],
['Action gratuite','La carte se joue sans jeton Action. Une fois par tour au plus pour une même carte. Les coûts écrits sur la carte restent dus.'],
['Ajouter une ressource','Prenez la ressource dans le stock et posez-la dans la zone ou sur la carte indiquée.'],
['Attaque','L\'effet touche tous les autres joueurs, autant que possible. Certaines cartes permettent de l\'ignorer.'],
['Barbare / Empire','Faces de votre carte État. Une carte marquée d\'un État ne se joue de votre main que si vous êtes dans cet État. « Si vous êtes Barbare / Empire » : l\'effet ou l\'option n\'existe que dans cet État.'],
['Cartes en jeu','Une carte permanente reste en jeu jusqu\'à ce qu\'un effet la retire. Ses ressources reviennent alors dans votre réserve ; un jeton Épuisé posé dessus ne revient qu\'à la fin du tour.'],
['Choisir','Résolvez une seule des options séparées par OU. Une phrase complète après la liste s\'applique dans tous les cas.'],
['Considérer','Traite une icône comme une autre jusqu\'à la fin du tour. L\'icône d\'origine ne compte plus pendant ce temps. L\'effet cesse toujours avant le Solstice ou le Décompte.'],
['Défausser','Mettez la carte dans votre défausse.'],
['Déplacer une ressource','Faites passer la ressource de la réserve de son propriétaire à l\'endroit indiqué. Aucune conversion possible. Les ressources déjà posées sur des cartes ne se déplacent pas.'],
['Développer','Payez le coût d\'une carte de votre zone de Développement, au choix, et mettez-la dans votre défausse. Via un effet de carte, c\'est possible même si un témoin est déjà posé sur la zone, et sans en poser un. Les Vikings ne Développent jamais.'],
['Donner une carte','Choisissez une carte de votre main ; un adversaire la prend en main.'],
['Échanger','Remplacez une carte du Marché par une autre. Les jetons restent en place, l\'Instabilité est renouvelée (sauf Région), et la carte retirée va là d\'où venait l\'autre.'],
['Épuiser','Pendant votre ordre Activation, posez un jeton Épuisé sur la carte pour résoudre son effet. Une fois par tour et par carte. Poser une carte ne déclenche pas sa capacité Épuiser.'],
['Exiler','Envoyez la carte dans la pile Exil. Depuis le Marché : l\'Instabilité retourne dans la pile, la carte est remplacée. Impossible si la carte porte des jetons.'],
['Gagner des ressources grâce aux Régions','Capacité qui se déclenche quand une Région en jeu portant l\'icône indiquée sert à vous faire gagner cette ressource, par son propre effet ou par celui d\'une autre carte comme Prospérité.'],
['Histoire','Les cartes archivées sous votre carte Puissance. Hors jeu, mais comptées au score. Vous seul pouvez les consulter. Les Vikings n\'en ont pas.'],
['Innover','Annoncez une catégorie, puis prenez soit une carte visible du Marché (sans l\'Instabilité, qui retourne dans la pile), soit la première carte face cachée de la pioche correspondante. Vassal ou pioche vide : fouillez la pioche Principale ; rien trouvé : 2 Progrès.'],
['Passif','Effet actif en permanence tant que la carte est en jeu : pendant tous les ordres, le Solstice et le Décompte.'],
['Payer','Remettez les jetons demandés dans le stock, depuis votre réserve. 1 Progrès peut remplacer 1 Population ou 2 Matériaux. Aucune autre conversion.'],
['Pioche Nation','Vos cartes Nation face cachée sur l\'Avènement. Quoi qu\'il arrive, l\'Avènement reste tout en bas et ne se mélange jamais avec elles.'],
['Piocher','Prenez des cartes de votre deck en main. Deck vide : mélangez votre défausse et continuez. On pioche toujours la première carte de la pile.'],
['Piocher, si possible','Comme Piocher, mais sans jamais mélanger la défausse : deck vide, vous vous arrêtez.'],
['Placer sur votre deck','Posez la carte (de votre main, sauf mention contraire) face cachée sur votre deck.'],
['Rappeler','Reprenez en main une Région en jeu, avec les cartes Réservées dessous. Les ressources reviennent dans votre réserve. Si vous la rejouez dans le tour, vous pouvez l\'Épuiser à nouveau avec un autre jeton.'],
['Récupérer','Prenez la carte indiquée en main, ou dans la zone précisée. Dans une zone face visible, vous choisissez. Récupérer une Instabilité : dans la pile commune ; la dernière déclenche l\'Effondrement.'],
['Regarder','Examinez secrètement les cartes indiquées puis remettez-les en place, dans l\'ordre de votre choix. Dans la pioche Renommée, ignorez Roi des rois ; dans la pioche Nation, ignorez l\'Avènement, sauf si c\'est la seule carte.'],
['Renvoyer une carte','Remettez une Instabilité dans la pile commune. En la jouant de votre main : une Action et son coût. Par l\'effet d\'une autre carte : sans coût.'],
['Renvoyer un jeton','Reprenez un jeton Épuisé posé sur une de vos cartes et remettez-le sur votre carte État. Vous pouvez le réutiliser dans le tour.'],
['Réserver','Glissez une carte de votre main, face visible, sous la carte en jeu concernée. Elle n\'est plus en jeu, mais compte au score et suit le sort de la carte qui l\'abrite.'],
['Retirer une ressource','Remettez la ressource indiquée dans le stock. Aucune conversion.'],
['Solstice','Effet résolu automatiquement à la fin de chaque manche.'],
['Tous les joueurs / tous les autres joueurs','Le premier vous inclut, le second non.'],
['Trouver','Cherchez la carte dans votre main, puis votre défausse, puis votre deck, puis votre pioche Nation (hors Avènement). Arrêtez-vous dès qu\'elle est trouvée et révélez-la. Mélangez le deck ou la pioche Nation si vous les avez fouillés.'],
['Voler des ressources','Prenez les jetons indiqués dans la réserve des joueurs visés, autant que possible, sans conversion.'],
['Biens','Quatrième ressource, liée à l\'extension Routes commerciales.',1],
['Marchander, Commercer, Profit','Mots-clés de l\'extension Routes commerciales. Sans l\'extension, ignorez toute mention de Marchander.',1],
['Fin du Solstice','Effet résolu après tous vos autres effets Solstice. Présent sur des cartes d\'Horizons.',1]];

/* ---------- rendu général ---------- */
const CHM=Object.fromEntries(CH.map(c=>[c.id,c]));
const STEPS=[{id:'decouvrir',t:'Découvrir le jeu',ch:['depart','bases','cartes']},{id:'installer',t:'Installer une partie',ch:['mise-en-place']},
 {id:'tour',t:'Jouer son tour',ch:['tour','resoudre'],guided:true},{id:'marche',t:'Le Marché et votre deck',ch:['marche','deck']},
 {id:'manche',t:'Manche, Gloire et fin de partie',ch:['solstice','gloire','fin']},{id:'plus',t:'Variantes et solo',ch:['variantes','solo']}];
const SC={
decouvrir:[
 {s:'Vous devez Payer 4 Matériaux. Votre réserve : 2 Matériaux, 3 Population, 1 Progrès.',q:'Comment réglez-vous ce coût ?',a:1,o:[
  ['2 Matériaux et 2 Population','La Population ne remplace jamais les Matériaux. Seul le Progrès se convertit.'],
  ['2 Matériaux et 1 Progrès','1 Progrès vaut 2 Matériaux quand vous payez en Matériaux : le compte y est.'],
  ['Je ne peux pas payer','Si : votre Progrès comble les 2 Matériaux manquants.']]},
 {s:'Votre carte État montre Barbare. Vous avez en main une carte marquée Empire. Au Marché, une autre carte Empire vous fait envie.',q:'Que pouvez-vous faire ce tour-ci ?',a:1,o:[
  ['Jouer la carte Empire de ma main','Impossible : une carte marquée Empire ne se joue de votre main que si votre carte État montre Empire.'],
  ['Acquérir la carte Empire du Marché pour plus tard','Acquérir ou Innover est permis quel que soit votre État. Vous la jouerez après votre Avènement.'],
  ['Ni l\'un ni l\'autre','L\'icône d\'État limite seulement le fait de jouer la carte depuis votre main, pas de l\'obtenir.']]},
 {s:'Décompte final. Une de vos cartes à étoile indique « 1 PV par Région ». Vous possédez 13 Régions.',q:'Combien cette carte vous rapporte-t-elle ?',a:1,o:[
  ['13 points','Une carte à points variables est plafonnée.'],
  ['10 points','Le plafond est de 10 points par carte à étoile, carte Puissance comprise.'],
  ['0 point','La carte rapporte bien des points, simplement plafonnés à 10.']]}],
installer:[
 {s:'Vous remplissez le Marché. La carte retournée dans l\'emplacement de droite est une Région.',q:'Glissez-vous une Instabilité dessous ?',a:1,o:[
  ['Oui, comme sous toutes les cartes','Toutes les cartes du Marché en reçoivent une, sauf les Régions.'],
  ['Non','Il n\'y a jamais d\'Instabilité sous une Région. C\'est ce qui rend les Régions peu risquées à acquérir.']]},
 {s:'Vous préparez une partie solo, donc avec les quantités d\'une partie à 2 joueurs.',q:'Combien de cartes Renommée face cachée posez-vous sur Roi des rois ?',a:0,o:[
  ['6','À 2 joueurs ou en solo : 6 Renommées, et 6 cartes dans chacune des pioches Région, Tradition et Civilisé.'],
  ['8','8 est la quantité pour 4 joueurs.'],
  ['Toutes','Le surplus retourne dans la boîte sans être regardé : vous ne savez pas quelles Renommées manquent.']]},
 {s:'Deux cartes Instabilités de votre nation n\'ont aucune icône dans le coin inférieur gauche.',q:'Où vont-elles à la mise en place ?',a:0,o:[
  ['Dans mon deck de départ','Une carte sans icône de départ fait partie du deck initial. Votre nation commence donc avec des troubles.'],
  ['Dans la pile Instabilités commune','Seules les Instabilités portant l\'icône de la pile y vont.'],
  ['Dans la boîte','On n\'écarte que les cartes marquées 3+ ou 4 quand le nombre de joueurs ne correspond pas.']]}],
tour:[
 {s:'Votre main : quatre Instabilités et une carte Gloire injouable (vous n\'avez qu\'une Région en jeu). Votre réserve est vide.',q:'Quel ordre annoncez-vous ?',a:2,o:[
  ['Activation','Vous pourriez jouer une Instabilité en défaussant deux autres cartes, mais vous n\'en renverriez qu\'une et les autres reviendraient plus tard.'],
  ['Recherche','Vous gagneriez une carte, mais vos quatre Instabilités partiraient en défausse et reviendraient au prochain mélange.'],
  ['Pacification','Vous renvoyez les quatre Instabilités dans la pile sans rien payer. C\'est exactement la situation prévue pour cet ordre.']]},
 {s:'Vous n\'avez plus de jeton Action. Une Région en jeu indique « Épuiser : gagnez 2 Matériaux » et ne porte pas de jeton. Il vous reste 2 jetons Épuisé. Vous avez en main une carte marquée Action gratuite.',q:'Que pouvez-vous encore faire ?',a:2,o:[
  ['Plus rien','Les capacités Épuiser et les Actions gratuites ne consomment pas de jeton Action.'],
  ['Seulement épuiser la Région','C\'est possible, mais l\'Action gratuite l\'est aussi.'],
  ['Épuiser la Région et jouer l\'Action gratuite','Épuiser coûte un jeton Épuisé, et une Action gratuite se joue même sans jeton Action.']]},
 {s:'Votre dernière carte en main indique : « Défaussez 1 carte pour gagner 2 Population. Vous POUVEZ acquérir une Région. »',q:'Pouvez-vous la jouer ?',a:1,o:[
  ['Oui, je gagne 2 Population','Le coût passe avant le résultat, et vous n\'avez aucune autre carte à défausser.'],
  ['Non','Ce qui précède « pour » est un coût obligatoire. Sans autre carte à défausser, la carte est injouable.'],
  ['Oui, seulement pour acquérir la Région','La première phrase est obligatoire et son coût impayable : la carte entière ne peut pas être jouée.']]}],
marche:[
 {s:'Il reste une seule carte dans la pile Instabilités. Une Tradition du Marché vous intéresse ; une Instabilité est glissée dessous.',q:'Comment la prendre ?',a:1,o:[
  ['L\'Acquérir','Vous prenez son Instabilité, puis la carte qui la remplace reçoit la dernière Instabilité de la pile : Effondrement immédiat.'],
  ['L\'Innover','L\'Instabilité retourne dans la pile, qui remonte à deux cartes. La carte de remplacement en reprend une : il en reste une, la partie continue.'],
  ['Peu importe','La différence est énorme : Acquérir vide la pile, Innover la regarnit.']]},
 {s:'Nettoyage. Votre main : 2 Instabilités et 3 bonnes cartes que vous n\'avez pas pu jouer. Votre deck contient 1 carte, votre pioche Nation 2.',q:'Que défaussez-vous pour faire évoluer votre nation au plus vite ?',a:1,o:[
  ['Rien','Avec 5 cartes en main vous ne piochez pas : votre deck ne tourne pas et aucune carte Nation n\'entre.'],
  ['Toute ma main','Vous piochez 5 cartes, votre deck se vide, et une carte Nation rejoint votre défausse avant le mélange. C\'est le conseil du livret.'],
  ['Seulement les Instabilités','C\'est légal et vous déclenchez aussi le mélange, mais les Instabilités reviendront : vous gardez trois cartes au prix d\'un cycle plus lent.']]},
 {s:'En plein tour, un effet vous fait Piocher 2 cartes. Votre deck est vide et vos 5 jetons Épuisé sont déjà posés sur des cartes.',q:'Que se passe-t-il ?',a:1,o:[
  ['J\'ajoute une carte Nation, puis je mélange','Il faut un jeton Épuisé disponible pour servir de témoin : vous n\'en avez plus.'],
  ['Je mélange ma défausse sans rien ajouter, puis je pioche','Le mélange a lieu quand même, mais sans carte Nation ni Développement.'],
  ['Je ne pioche pas','Seul un effet « si possible » vous arrête. Ici vous devez mélanger et piocher.']]}],
manche:[
 {s:'Vous jouez Gloire : vous abandonnez trois Régions. Deux d\'entre elles abritent une carte Réservée.',q:'Que deviennent les cartes Réservées ?',a:1,o:[
  ['Elles restent en jeu','Une carte Réservée suit toujours le sort de la carte qui l\'abrite.'],
  ['Elles partent en défausse avec leurs Régions','Elles reviendront donc dans votre deck : pensez-y avant de jouer Gloire.'],
  ['Elles reviennent dans ma main','Ce serait le cas si les Régions étaient Rappelées, pas Abandonnées.']]},
 {s:'Votre adversaire déclenche le Décompte pendant son tour. Vous jouez après lui et vous êtes le dernier de la manche.',q:'Combien de tours vous reste-t-il ?',a:1,o:[
  ['Un seul','Vous finissez d\'abord la manche en cours, puis vient une manche supplémentaire.'],
  ['Deux','Votre tour de cette manche, le Solstice, puis une ultime manche complète avec son Solstice.'],
  ['Aucun','Le Décompte n\'arrête pas la partie sur-le-champ, contrairement à l\'Effondrement.']]},
 {s:'Solstice. Une de vos cartes indique « Solstice : vous POUVEZ défausser 1 carte pour gagner 1 Population ». Vous aimeriez aussi épuiser une Région.',q:'Que pouvez-vous faire ?',a:1,o:[
  ['Les deux','Aucune capacité Épuiser pendant le Solstice.'],
  ['Seulement l\'effet Solstice, si je le souhaite','L\'effet est facultatif grâce à « pouvez ». Les capacités Épuiser attendront votre prochain ordre Activation.'],
  ['Rien','L\'effet Solstice reste disponible.']]}],
plus:[
 {s:'Tour de la C.I.V. La carte révélée correspond à deux lignes de son tableau. La première demande de dépenser 3 Population pour innover ; elle n\'en a qu\'une.',q:'Que faites-vous ?',a:2,o:[
  ['Elle dépense sa Population restante','Un coût ne se paie jamais à moitié.'],
  ['Rien : la carte part en défausse','Il faut d\'abord chercher une autre ligne applicable.'],
  ['Je passe à la ligne suivante qui correspond','Si rien de la ligne ne peut être résolu, on descend à la prochaine ligne qui correspond à la carte.']]},
 {s:'Partie solo. Il reste une Instabilité dans la pile. Une carte du Marché vous ferait gagner beaucoup de points, avec une Instabilité dessous.',q:'L\'acquérez-vous ?',a:1,o:[
  ['Oui, les points d\'abord','La carte de remplacement prendrait la dernière Instabilité : Effondrement, et en solo c\'est une défaite automatique.'],
  ['Non','Contre la C.I.V., un Effondrement vous fait perdre quelle que soit la répartition des Instabilités. Renvoyez d\'abord des Instabilités, ou Innovez.']]}]};
function scen(box,list){list.forEach(q=>{const d=document.createElement('div');d.className='q';
  d.innerHTML=`<div class="sit">${q.s}</div><p>${q.q}</p><div class="opts">${q.o.map((o,i)=>`<button type="button" data-i="${i}">${o[0]}</button>`).join('')}</div><div class="why"></div>`;box.append(d);
  $$('button',d).forEach(b=>b.onclick=()=>{const i=+b.dataset.i;$$('button',d).forEach(x=>x.classList.remove('right','wrong'));b.classList.add(i===q.a?'right':'wrong');
    $('.why',d).innerHTML=(i===q.a?'<b>Bon choix.</b> ':'<b>Pas le meilleur choix.</b> ')+q.o[i][1]})})}
function build(){
  const toc=$('#toc'),main=$('#main');
  STEPS.forEach((s,i)=>{
    const li=document.createElement('li');li.innerHTML=`<a href="#apprendre" data-id="${s.id}"><span class="n">${i+1}</span><span>${s.t}</span><span class="tick"></span></a>`;toc.append(li);
    const el=document.createElement('section');el.className='ch';el.id='s-'+s.id;
    el.innerHTML=`<div class="eyebrow">Étape ${i+1} sur ${STEPS.length}</div><h1>${s.t}</h1>`+s.ch.map(id=>(s.ch.length>1?`<h2 class="chh">${CHM[id].t}</h2>`:'')+CHM[id].html).join('')
      +(s.guided?'<h2 class="chh">Un tour complet, guidé</h2><div class="lab" id="guided"></div>':'')
      +`<div class="quiz"><h2>Que faites-vous ?</h2><div class="qs"></div></div><div class="endnav">${i?`<button type="button" data-go="${STEPS[i-1].id}">Étape précédente</button>`:'<span></span>'}
      ${i<STEPS.length-1?`<button type="button" class="pri" data-done="${s.id}" data-go="${STEPS[i+1].id}">J'ai compris, étape suivante</button>`:`<button type="button" class="pri" data-done="${s.id}">Terminer le tutoriel</button>`}</div>`;
    main.append(el);scen($('.qs',el),SC[s.id])});
  const b=CHM.bilan.html;
  $('#aide').innerHTML='<h1>Aide-mémoire</h1>'+b.slice(b.indexOf('<h2>Aide-mémoire</h2>')).replace('<h2>Aide-mémoire</h2>','<h2>Les douze rappels</h2>')
    +'<h2>Tous les mots-clés</h2>'+CHM['mots-cles'].html+'<h2>Les huit nations d\'Antique</h2>'+CHM.nations.html;
  toc.addEventListener('click',e=>{const a=e.target.closest('a');if(!a)return;e.preventDefault();go(a.dataset.id)});
  document.addEventListener('click',e=>{const b=e.target.closest('[data-go],[data-done]');if(!b)return;
    if(b.dataset.done){store.done[b.dataset.done]=1;save();progress()}
    if(b.dataset.go)go(b.dataset.go)});
  $('#menu').onclick=()=>{const o=$('#nav').classList.toggle('open');$('#menu').textContent=o?'Masquer le sommaire':'Afficher le sommaire'};
}
function go(id){store.step=id;save();show();window.scrollTo(0,0)}
function show(){
  let id=store.step;if(!STEPS.some(s=>s.id===id))id=STEPS[0].id;
  $$('section.ch').forEach(s=>s.classList.toggle('on',s.id==='s-'+id));
  $$('#toc a').forEach(a=>a.classList.toggle('on',a.dataset.id===id));
  $('#nav').classList.remove('open');
}
function progress(){
  const n=STEPS.filter(s=>store.done[s.id]).length;
  $('#bar').style.width=(100*n/STEPS.length)+'%';
  $('#barlabel').textContent=n+' étape'+(n>1?'s':'')+' sur '+STEPS.length+' terminée'+(n>1?'s':'');
  $$('#toc a').forEach(a=>$('.tick',a).textContent=store.done[a.dataset.id]?'fait':'');
}
function labGuided(){
  const box=$('#guided');let G;
  const TXT=[['Tentes (en jeu)','Épuiser : quand vous jouez une Région, épuisez cette carte pour gagner 1 Population.'],['Carpates (Région)','Gagnez 1 Population. Vous POUVEZ réserver 1 carte.'],
   ['Conquête','Choisir : payez 2 Population pour acquérir une Région ou un Vassal, OU payez 3 Population pour innover en Région ou Vassal.'],
   ['Progrès','Choisir : payez 3 Matériaux pour acquérir une Tradition ou un Civilisé, OU payez 5 Matériaux pour innover en Tradition ou Civilisé.'],
   ['Instabilités','Choisir : payez 1 Population OU défaussez 2 cartes OU payez 3 Matériaux. Si vous le faites, renvoyez cette carte dans la pile Instabilités.']];
  const init=()=>{G={ph:'order',a:3,e:5,mat:3,pop:2,prog:1,tent:false,win:false,play:['Tentes'],deck:2,good:0,bad:0,sub:null,civ:1,cls:'',
    hand:[{n:'Carpates',k:'reg'},{n:'Conquête',k:'conq'},{n:'Progrès',k:'prog'},{n:'Instabilités',k:'ins'},{n:'Instabilités',k:'ins'}],
    msg:'Vous jouez les Scythes, encore Barbares. Les Tentes sont déjà en jeu. Commencez par annoncer votre ordre.'};draw()};
  const ok=t=>{G.good++;G.msg=t;G.cls='good'},ko=t=>{G.bad++;G.msg=t;G.cls='warn'},info=t=>{G.msg=t;G.cls=''};
  const payPop=n=>{if(G.pop+G.prog<n)return false;const u=Math.min(G.pop,n);G.pop-=u;G.prog-=n-u;return true};
  const payMat=n=>{if(G.mat+2*G.prog<n)return false;const u=Math.min(G.mat,n);G.mat-=u;G.prog-=Math.ceil((n-u)/2);return true};
  const drop=k=>{const i=G.hand.findIndex(c=>c.k===k);if(i>=0)G.hand.splice(i,1)};
  const spend=k=>{G.a--;drop(k);G.win=false;G.sub=null};
  function play(i){const c=G.hand[i];
    if(c.k==='vas'||c.k==='com'){info('Gardez cette carte pour un prochain tour : son effet dépend de la carte réelle.');return}
    if(G.a<1){ko('Vous n\'avez plus de jeton Action : impossible de jouer une carte de votre main, sauf Action gratuite. Il vous reste les capacités Épuiser, ou le Nettoyage.');return}
    if(c.k==='reg'){G.a--;G.hand.splice(i,1);G.play.push(c.n);G.pop++;G.win=true;ok(c.n+' entre en jeu et vous rapporte 1 Population. Vous pouvez réserver une carte dessous.');
      G.sub=[['Réserver une Instabilités dessous',()=>{if(!G.hand.some(x=>x.k==='ins')){info('Vous n\'avez pas d\'Instabilités en main.')}else{drop('ins');info('L\'Instabilités est glissée sous la Région : elle ne reviendra plus dans votre main. Elle compte toujours dans votre score, mais votre deck est allégé.')}G.sub=null}],
        ['Ne rien réserver',()=>{info('Rien n\'est réservé. C\'est le moment de penser aux Tentes.');G.sub=null}]];return}
    if(c.k==='conq'){info('Conquête : quelle option choisissez-vous ?');G.sub=[
      ['Payer 2 Population : acquérir la Région du Marché',()=>{if(!payPop(2)){ko('Il vous faut 2 Population. Le Progrès peut en remplacer, 1 pour 1.');G.sub=null;return}spend('conq');G.hand.push({n:'Nouvelle Région',k:'reg'});ok('Vous payez 2 Population et prenez la Région en main. Aucune Instabilité : il n\'y en a jamais sous une Région. Conquête part en défausse et le Marché est complété aussitôt.')}],
      ['Payer 2 Population : acquérir le Vassal',()=>{if(!payPop(2)){ko('Il vous faut 2 Population. Le Progrès peut en remplacer, 1 pour 1.');G.sub=null;return}spend('conq');G.hand.push({n:'Vassal',k:'vas'},{n:'Instabilités',k:'ins'});ok('Vous payez 2 Population. Le Vassal arrive en main avec l\'Instabilités glissée dessous : c\'est le prix d\'Acquérir.')}],
      ['Payer 3 Population : innover une Région',()=>{if(!payPop(3)){ko('Il vous faut 3 Population, Progrès compris.');G.sub=null;return}spend('conq');G.hand.push({n:'Nouvelle Région',k:'reg'});ok('Vous payez 3 Population et prenez une Région. Innover évite l\'Instabilité, mais une Région n\'en a jamais : ici, Acquérir aurait coûté 1 Population de moins pour le même résultat.')}],
      ['Annuler',()=>{G.sub=null;info('Conquête reste dans votre main.')}]];return}
    if(c.k==='prog'){info('Progrès : quelle option choisissez-vous ?');const m='Il vous manque des Matériaux. Rappel : 1 Progrès vaut 2 Matériaux, la Population ne compte pas.';G.sub=[
      ['Payer 3 Matériaux : acquérir la Tradition',()=>{if(!payMat(3)){ko(m);G.sub=null;return}spend('prog');G.hand.push({n:'Tradition',k:'com'},{n:'Instabilités',k:'ins'});ok('Vous payez 3 Matériaux. La Tradition arrive en main avec son Instabilités.')}],
      ['Payer 3 Matériaux : acquérir le Civilisé',()=>{if(!payMat(3)){ko(m);G.sub=null;return}spend('prog');G.prog+=G.civ;const n=G.civ;G.civ=0;G.hand.push({n:'Civilisé',k:'com'},{n:'Instabilités',k:'ins'});ok('Vous payez 3 Matériaux. Vous gagnez aussi '+n+' Progrès posé sur la carte, et le Civilisé arrive avec son Instabilités.')}],
      ['Payer 5 Matériaux : innover une Tradition',()=>{if(!payMat(5)){ko(m);G.sub=null;return}spend('prog');G.hand.push({n:'Tradition',k:'com'});ok('Vous réglez 5 Matériaux, Progrès compris à raison de 2 Matériaux chacun. La Tradition arrive sans Instabilités, qui retourne dans la pile.')}],
      ['Annuler',()=>{G.sub=null;info('Progrès reste dans votre main.')}]];return}
    if(c.k==='ins'){info('Instabilités : comment payez-vous son renvoi ?');const done=t=>{G.a--;G.hand.splice(G.hand.indexOf(c),1);G.win=false;G.sub=null;ok(t+' L\'Instabilités retourne dans la pile commune. Cela vous a coûté une Action.')};G.sub=[
      ['Payer 1 Population',()=>{if(!payPop(1)){ko('Vous n\'avez ni Population ni Progrès.');G.sub=null;return}done('Vous payez 1 Population.')}],
      ['Payer 3 Matériaux',()=>{if(!payMat(3)){ko('Il vous faut 3 Matériaux, Progrès compris.');G.sub=null;return}done('Vous payez 3 Matériaux.')}],
      ['Défausser 2 autres cartes',()=>{if(G.hand.length<3){ko('Il vous faut deux autres cartes en main à défausser.');G.sub=null;return}const o=G.hand.filter(x=>x!==c).slice(-2);o.forEach(x=>G.hand.splice(G.hand.indexOf(x),1));done('Vous défaussez '+o.map(x=>x.n).join(' et ')+'.')}],
      ['Annuler',()=>{G.sub=null;info('L\'Instabilités reste dans votre main.')}]]}}
  function tentes(){if(G.tent)ko('Les Tentes portent déjà un jeton Épuisé : une seule fois par tour et par carte.');
    else if(G.e<1)ko('Plus de jeton Épuisé disponible.');
    else if(!G.win)ko('Les Tentes répondent à un événement : « quand vous jouez une Région ». Elles s\'épuisent juste après avoir joué une Région, pas avant, ni après avoir fait autre chose.');
    else{G.e--;G.tent=true;G.pop++;G.win=false;ok('Vous posez un jeton Épuisé sur les Tentes : 1 Population de plus. La capacité répondait à la Région que vous venez de jouer.')}}
  function draw(){
    box.innerHTML=`<p class="hint">Un vrai tour avec des cartes de départ des Scythes. Chaque geste est validé ou corrigé.</p>
    <div class="row gstat"><span>Actions : <b>${G.a}</b></span><span>Jetons Épuisé : <b>${G.e}</b></span><span><b>${G.mat}</b> ${R.mat}</span><span><b>${G.pop}</b> ${R.pop}</span><span><b>${G.prog}</b> ${R.prog}</span><span>Deck : <b>${G.deck}</b> cartes</span></div>
    <p><b>En jeu :</b> ${G.play.join(', ')}${G.tent?' (Tentes épuisées)':''}<br><b>En main :</b> ${G.hand.length?G.hand.map(c=>c.n).join(', '):'aucune carte'}<br>
    <b>Marché :</b> Vassal, Tradition, Civilisé (${G.civ} Progrès dessus), Tradition, Région. Une Instabilités sous chaque carte sauf la Région.</p>
    <details><summary>Texte des cartes</summary><ul>${TXT.map(t=>`<li><b>${t[0]}.</b> ${t[1]}</li>`).join('')}</ul></details>
    <div class="out ${G.cls}" style="margin-top:10px">${G.msg}</div><div class="row" id="gbtn" style="margin-top:10px"></div>`;
    const add=(l,f,k)=>{const b=document.createElement('button');b.type='button';b.textContent=l;if(k)b.className=k;b.onclick=()=>{f();draw()};$('#gbtn').append(b)};
    if(G.ph==='order'){
      add('Activation',()=>{G.ph='act';ok('Bon choix : vous avez des cartes à jouer et une capacité Épuiser en jeu. Vous disposez de 3 Actions.')},'pri');
      add('Recherche',()=>ko('Vous défausseriez une main pleine de cartes jouables pour une seule carte. La Recherche sert quand votre main est faible.'));
      add('Pacification',()=>ko('Vous ne renverriez que 2 Instabilités et vous perdriez tout le reste de votre tour. Gardez cet ordre pour une main noyée sous les Instabilités.'))}
    else if(G.ph==='act'){
      if(G.sub)G.sub.forEach(([l,f])=>add(l,f));
      else{G.hand.forEach((c,i)=>add('Jouer : '+c.n,()=>play(i)));add('Épuiser les Tentes',tentes);
        add('Terminer mes actions',()=>{G.ph='c1';G.win=false;info('Nettoyage, étape 1 : vous ajoutez 1 Progrès sur une carte du Marché. D\'où vient ce jeton ?')},'pri')}}
    else if(G.ph==='c1'){
      add('Du stock',()=>{G.civ++;G.a=3;G.e=5;G.tent=false;G.ph='c3';ok('Exact, toujours du stock. Vous le posez sur le Civilisé. Étape 2 : vos jetons reviennent, 3 Actions et 5 Épuisé. Étape 3 : que défaussez-vous ?')},'pri');
      add('De ma réserve',()=>ko('Non : ce Progrès vient du stock, votre réserve n\'est pas touchée. C\'est l\'oubli le plus courant.'))}
    else if(G.ph==='c3'){const next=t=>{const need=Math.max(0,5-G.hand.length);
        if(!need){G.ph='done';ok(t+' Étape 4 : vous avez déjà 5 cartes ou plus, donc vous ne piochez pas.')}
        else if(need<=G.deck){G.deck-=need;G.ph='done';ok(t+' Étape 4 : vous piochez '+need+' carte'+(need>1?'s':'')+'. Votre deck suffit, pas de mélange.')}
        else{G.need=need;G.ph='c4';ok(t+' Étape 4 : vous devez piocher '+need+' cartes et votre deck n\'en contient que '+G.deck+'. Que se passe-t-il ?')}};
      add('Toute ma main',()=>{G.hand=[];next('Légal, et c\'est le conseil du livret : plus votre deck tourne, plus vite votre nation évolue.')},'pri');
      add('Seulement les Instabilités',()=>{G.hand=G.hand.filter(c=>c.k!=='ins');next('Légal. Les Instabilités reviendront au prochain mélange, mais vous gardez vos autres cartes.')});
      add('Rien',()=>next('Légal aussi : rien ne vous oblige à défausser.'))}
    else if(G.ph==='c4'){
      add('La première carte de ma pioche Nation rejoint ma défausse, je pose un jeton Épuisé en témoin, je mélange, puis je finis de piocher',()=>{G.ph='done';ok('Exactement. Vous piochez d\'abord les '+G.deck+' cartes restantes, puis la carte Nation entre dans votre défausse, vous mélangez et vous complétez votre main à 5.')},'pri');
      add('Je mélange ma défausse telle quelle',()=>ko('Vous oubliez la carte Nation : vous venez de récupérer vos jetons Épuisé, donc vous pouvez et dois en ajouter une avant de mélanger.'));
      add('Je pioche ce qui reste et je m\'arrête',()=>ko('Seul un effet « si possible » s\'arrête à un deck vide. Au Nettoyage, vous mélangez et vous continuez jusqu\'à 5 cartes.'))}
    else{$('#gbtn').insertAdjacentHTML('beforebegin',`<p style="margin-top:10px"><b>Tour terminé.</b> ${G.good} geste${G.good>1?'s':''} validé${G.good>1?'s':''}, ${G.bad} corrigé${G.bad>1?'s':''}. Le joueur suivant commence, puis viendra le Solstice, où les Tentes vous laisseront rappeler une Région.</p>`);
      add('Rejouer ce tour autrement',init,'pri')}}
  init();
}

/* ---------- ateliers ---------- */
function labPay(){
  const f=()=>{
    const m=+$('#pm').value||0,p=+$('#pp').value||0,g=+$('#pr').value||0,c=Math.max(1,+$('#pc').value||1),t=$('#pt').value,o=$('#payout');
    let ok,msg;
    if(t==='g'){ok=g>=c;msg=ok?`Oui : ${c} Progrès. Rien ne remplace le Progrès.`:`Non : il vous manque ${c-g} Progrès, et aucune autre ressource ne peut le remplacer.`}
    else if(t==='p'){ok=p+g>=c;const up=Math.min(p,c),ug=c-up;msg=ok?`Oui : ${up} Population`+(ug?` et ${ug} Progrès (1 Progrès vaut 1 Population).`:'.'):`Non : Population et Progrès réunis ne font que ${p+g}. Les Matériaux ne remplacent pas la Population.`}
    else{ok=m+2*g>=c;if(ok){let ug=0,um=Math.min(m,c);while(um+2*ug<c)ug++;um=Math.max(0,Math.min(m,c-2*ug));
        const over=um+2*ug-c;msg=`Oui : ${um} Matériaux`+(ug?` et ${ug} Progrès (chacun vaut 2 Matériaux).`:'.')+(over>0?' Vous payez 1 de trop : pas de rendu de monnaie.':'')}
      else msg=`Non : vous atteignez seulement ${m+2*g} (Matériaux + 2 par Progrès). La Population ne remplace pas les Matériaux.`}
    o.className='out '+(ok?'good':'warn');o.textContent=msg;
  };
  ['pm','pp','pr','pc','pt'].forEach(i=>$('#'+i).addEventListener('input',f));f();
}
function labZones(){
  const z=$('#zones');
  ZONES.forEach(([n,d])=>{const b=document.createElement('button');b.type='button';b.textContent=n;
    b.onclick=()=>{$$('button',z).forEach(x=>x.classList.remove('sel'));b.classList.add('sel');$('#zout').innerHTML='<b>'+n+'.</b> '+d};z.append(b)});
}
function labCard(){
  const c=$('#card');
  ANAT.forEach(([x,y,n,d],i)=>{const b=document.createElement('button');b.type='button';b.className='hs';b.textContent=i+1;b.setAttribute('aria-label',n);
    b.style.left=`calc(${x}% - 13px)`;b.style.top=`calc(${y}% - 13px)`;
    b.onclick=()=>{$$('.hs',c).forEach(h=>h.classList.remove('sel'));b.classList.add('sel');$('#cout').innerHTML='<b>'+(i+1)+'. '+n+'.</b> '+d};c.append(b)});
}
function labSetup(){
  let n=2;const steps=(el,arr)=>{el.innerHTML='';arr.forEach((t,i)=>{const li=document.createElement('li');const id=el.id+'-'+i;
    li.innerHTML=`<input type="checkbox" id="${id}"><span><label for="${id}">${t}</label></span>`;$('input',li).onchange=e=>li.classList.toggle('done',e.target.checked);el.append(li)})};
  const draw=()=>{$$('#np button').forEach(b=>b.classList.toggle('sel',+b.dataset.n===n));
    $('#npout').innerHTML=n===1?'<b>Solo :</b> préparez les pioches communes comme pour 2 joueurs, puis ouvrez l’onglet Jouer en solo. Pioches Renommée, Région, Tradition et Civilisé : 6 cartes chacune.'
      :`<b>${n} joueurs :</b> ${n+4} cartes face cachée dans la pioche Renommée (en plus de Roi des rois) et ${n+4} cartes dans chacune des pioches Région, Tradition et Civilisé.`;
    steps($('#st2'),ST2(Math.max(2,n)))};
  [[1,'Solo'],[2,'2'],[3,'3'],[4,'4']].forEach(([v,l])=>{const b=document.createElement('button');b.type='button';b.dataset.n=v;b.textContent=l;b.onclick=()=>{n=v;draw()};$('#np').append(b)});
  steps($('#st1'),ST1);draw();
}
function labOrders(){
  const t=$('#ordtabs'),sel=i=>{$$('button',t).forEach((b,j)=>b.classList.toggle('sel',i===j));$('#ordout').innerHTML=`<p><b>${ORD[i][0]}.</b> ${ORD[i][1]}</p>${ORD[i][2]}`};
  ORD.forEach((o,i)=>{const b=document.createElement('button');b.type='button';b.textContent=o[0];b.onclick=()=>sel(i);t.append(b)});sel(0);
}
function labTokens(){
  let a=3,e=5,wit=false;const out=$('#tkout');
  const draw=()=>{$('#tkA').innerHTML=Array.from({length:Math.max(3,a)},(_,i)=>`<i class="${i<a?'':'off'}"></i>`).join('');
    $('#tkE').innerHTML=Array.from({length:5},(_,i)=>`<i class="e ${i<e?'':'off'}"></i>`).join('')};
  const acts=[['Jouer une carte',()=>a?(a--,'Une Action dépensée : la carte est résolue puis défaussée, ou reste en jeu si elle est permanente.'):'Impossible : plus de jeton Action. Il vous faudrait une Action gratuite.'],
   ['Jouer en Action gratuite',()=>'Aucun jeton dépensé. Rappel : une même carte, une seule fois par tour de cette façon.'],
   ['Épuiser une carte en jeu',()=>e?(e--,'Un jeton Épuisé posé sur la carte : son effet se résout. Cette carte ne pourra plus être Épuisée ce tour.'):'Impossible : plus de jeton Épuisé sur votre carte État.'],
   ['Gagner une Action',()=>(a++,'Un jeton Action pris dans le stock. Vous pouvez dépasser trois jusqu\'au Nettoyage.')],
   ['Mélanger ma défausse en plein tour',()=>wit?'Vous mélangez, mais sans ajouter de carte : un témoin est déjà posé ce tour.':e?(e--,wit=true,'Vous ajoutez une carte Nation à votre défausse avant de mélanger. Un jeton Épuisé sert de témoin sur la pioche Nation : un de moins pour ce tour.'):'Vous mélangez sans ajouter de carte Nation : aucun jeton Épuisé disponible pour servir de témoin.'],
   ['Nettoyage',()=>(a=3,e=5,wit=false,'Tous les jetons reviennent : 3 Actions, 5 Épuisé.')]];
  acts.forEach(([l,f])=>{const b=document.createElement('button');b.type='button';b.textContent=l;b.onclick=()=>{out.textContent=f();draw()};$('#tkbtn').append(b)});draw();
}
function labMarket(){
  const CATS=['Région','Tradition','Civilisé','Vassal'],COL={Région:'var(--reg)',Tradition:'var(--tra)',Civilisé:'var(--civ)',Vassal:'var(--vas)'};
  const SRC=['Principale','Principale','Civilisé','Tradition','Région'];let S;
  const rnd=()=>CATS[Math.floor(Math.random()*4)];
  const init=()=>{S={pile:7,hu:0,hc:0,res:0,sel:-1,over:false,cards:[{c:'Vassal',p:0,u:1},{c:'Tradition',p:0,u:1},{c:'Civilisé',p:1,u:1},{c:'Tradition',p:0,u:1},{c:'Région',p:0,u:0}]};S.pile-=4;say('Sélectionnez une carte du Marché.');draw()};
  const say=(t,k)=>{const o=$('#mout');o.className='out'+(k?' '+k:'');o.innerHTML=t};
  const draw=()=>{$('#mk').innerHTML=S.cards.map((k,i)=>`<button type="button" class="mcard${S.sel===i?' sel':''}" data-i="${i}"><span class="ban" style="background:${COL[k.c]}">${k.c}</span><span class="bd">Emplacement ${i+1}<br>Pioche ${SRC[i]}<br>${k.p?k.p+' Progrès posé'+(k.p>1?'s':''):'Aucun jeton'}</span><span class="un${k.u?'':' none'}">${k.u?'Instabilité dessous':'Rien dessous'}</span></button>`).join('');
    $$('#mk button').forEach(b=>b.onclick=()=>{if(S.over)return;S.sel=+b.dataset.i;draw()});
    $('#mPile').textContent=S.pile;$('#mHandU').textContent=S.hu;$('#mHandC').textContent=S.hc;$('#mRes').textContent=S.res;
    ['mAcq','mInn','mBlind','mProg'].forEach(i=>$('#'+i).disabled=S.over)};
  const refill=i=>{const c=i<2?rnd():SRC[i];const k={c,p:0,u:0};let t=` Une nouvelle carte ${c} arrive de la pioche ${SRC[i]}`;
    if(c!=='Région'){k.u=1;S.pile--;t+=', avec une Instabilité de la pile glissée dessous.'}else t+=', sans Instabilité puisque c\'est une Région.';
    S.cards[i]=k;return t};
  const collapse=t=>{if(S.pile<=0){S.pile=0;S.over=true;say(t+' <b>La pile Instabilités est vide : Effondrement.</b> La partie s\'arrête sur-le-champ et le joueur qui possède le moins d\'Instabilités gagne. Ici vous en avez '+S.hu+'.','warn')}else say(t,'good');S.sel=-1;draw()};
  const need=()=>{if(S.sel<0){say('Sélectionnez d\'abord une carte.','warn');return false}return true};
  $('#mAcq').onclick=()=>{if(!need())return;const k=S.cards[S.sel];let t=`Vous Acquérez la carte ${k.c} : elle va dans votre main.`;S.hc++;
    if(k.p){S.res+=k.p;t+=` Vous gagnez ${k.p} Progrès.`}if(k.u){S.hu++;t+=' L\'Instabilité dessous vient aussi dans votre main.'}collapse(t+refill(S.sel))};
  $('#mInn').onclick=()=>{if(!need())return;const k=S.cards[S.sel];let t=`Vous Innovez la carte ${k.c} : elle va dans votre main.`;S.hc++;
    if(k.p){S.res+=k.p;t+=` Vous gagnez ${k.p} Progrès.`}
    const c=S.sel<2?rnd():SRC[S.sel];
    if(k.u&&c!=='Région'){S.cards[S.sel]={c,p:0,u:1};collapse(t+` Une nouvelle carte ${c} arrive de la pioche ${SRC[S.sel]}. L'Instabilité reste simplement en place sous elle : c'est la même chose que la rendre à la pile puis en reprendre une, la pile ne bouge pas.`);return}
    if(k.u){S.pile++;S.cards[S.sel]={c,p:0,u:0};collapse(t+` Une nouvelle carte Région arrive : aucune Instabilité sous une Région, donc celle d'avant retourne dans la pile.`);return}
    collapse(t+refill(S.sel))};
  $('#mBlind').onclick=()=>{if(!need())return;const c=S.cards[S.sel].c;S.hc++;S.sel=-1;draw();
    say(c==='Vassal'?'Les Vassaux n\'ont pas de pioche : vous révélez les cartes de la pioche Principale une à une jusqu\'au premier Vassal, vous le prenez, puis vous mélangez les autres cartes révélées dans la pioche Principale. Le Marché ne bouge pas.':`Vous prenez la première carte face cachée de la pioche ${c}, sans la connaître d'avance. Le Marché ne bouge pas et aucune Instabilité n'est en jeu.`,'good')};
  $('#mProg').onclick=()=>{if(!need())return;S.cards[S.sel].p++;S.sel=-1;draw();say('Un Progrès du stock est posé sur la carte. Elle devient plus tentante pour tout le monde, vous compris. Une carte qui porte des jetons ne peut plus être Exilée.','good')};
  $('#mReset').onclick=init;init();
}
function labDeck(){
  let S;const log=t=>{const li=document.createElement('li');li.innerHTML=t;$('#dLog').prepend(li)};
  const init=()=>{S={deck:5,hand:5,disc:0,nat:3,adv:true,dev:4,emp:false,turn:0,end:false};$('#dLog').innerHTML='';draw()};
  const draw=()=>{$('#dDeck').textContent=S.deck;$('#dHand').textContent=S.hand;$('#dDisc').textContent=S.disc;$('#dNat').textContent=S.nat+(S.adv?' + Av.':'');$('#dDev').textContent=S.dev;$('#dState').textContent=S.emp?'Empire':'Barbare';
    $('#dTurn').disabled=$('#dAcq').disabled=S.end};
  const turn=acq=>{S.turn++;let t=`<b>Tour ${S.turn}.</b> `;
    if(acq){S.hand+=2;t+='Vous acquérez une carte : elle arrive en main avec son Instabilité. '}
    S.disc+=S.hand;S.hand=0;let added=false,need=5;
    while(need>0){
      if(S.deck===0){
        if(!added){
          if(S.nat>0){S.nat--;S.disc++;added=true;t+='Deck vide : la première carte Nation rejoint votre défausse (témoin posé sur la pioche Nation), puis vous mélangez. '}
          else if(S.adv){S.adv=false;S.emp=true;S.disc++;added=true;t+='Deck vide : c\'est l\'<b>Avènement</b> qui rejoint votre défausse. Votre carte État se retourne : vous voilà Empire. Vous mélangez. '}
          else if(S.dev>0){if($('#dPay').checked){S.dev--;S.disc++;added=true;t+='Deck vide, pioche Nation vide : vous payez et Développez une carte de votre choix, puis vous mélangez. ';
              if(S.dev===0){S.end=true;t+='<b>C\'était votre dernière carte Développement : le Décompte est déclenché.</b> On finit la manche, puis une dernière manche. '}}
            else t+='Deck vide : vous ne pouvez payer aucun Développement, vous mélangez sans rien ajouter. '}
          else t+='Deck vide : vous mélangez. '}
        else t+='Deck de nouveau vide dans le même tour : vous mélangez sans ajouter de carte. ';
        S.deck=S.disc;S.disc=0;if(S.deck===0)break}
      S.deck--;S.hand++;need--}
    t+=`Votre paquet compte maintenant ${S.deck+S.hand+S.disc} cartes.`;log(t);draw()};
  $('#dTurn').onclick=()=>turn(false);$('#dAcq').onclick=()=>turn(true);$('#dReset').onclick=init;init();
}
function labCount(){
  const box=$('#cnt');
  CNT.forEach(([t],i)=>{const d=document.createElement('div');d.className='row';d.style.cssText='justify-content:space-between;padding:5px 0;border-bottom:1px solid var(--line)';
    d.innerHTML=`<span style="flex:1;min-width:180px">${t}</span><span class="row"><button type="button" data-v="1">Compte</button><button type="button" data-v="0">Ne compte pas</button></span>`;
    $$('button',d).forEach(b=>b.onclick=()=>{$$('button',d).forEach(x=>x.classList.remove('sel','right','wrong'));b.classList.add('sel');d.dataset.v=b.dataset.v});box.append(d)});
  $('#cntCheck').onclick=()=>{let g=0;$$('#cnt>div').forEach((d,i)=>{const ok=d.dataset.v!==undefined&&+d.dataset.v===CNT[i][1];if(ok)g++;
      $$('button',d).forEach(b=>{b.classList.remove('right','wrong');if(+b.dataset.v===CNT[i][1])b.classList.add('right');else if(b.classList.contains('sel'))b.classList.add('wrong')})});
    const o=$('#cntOut');o.className='out '+(g===CNT.length?'good':'warn');
    o.textContent=g+' sur '+CNT.length+'. À retenir : pioche Nation, Développements non payés et ressources posées sur des cartes ne rapportent rien, sauf carte qui dit le contraire.'};
}
function labScore(){
  const f=()=>{const v=i=>+$('#'+i).value||0;const tot=v('s1')+v('s2')-v('s3')+v('s4');
    $('#sOut').innerHTML=`Total : <b>${tot} points</b> (${v('s1')} + ${v('s2')} − ${v('s3')} + ${v('s4')} pour le Progrès). Matériaux et Population ne valent rien par eux-mêmes.`};
  ['s1','s2','s3','s4'].forEach(i=>$('#'+i).addEventListener('input',f));f();
}
function labGlossary(){
  const f=()=>{const q=$('#gs').value.trim().toLowerCase(),h=$('#gh').checked;
    const list=GLO.filter(g=>(h||!g[2])&&(!q||(g[0]+' '+g[1]).toLowerCase().includes(q)));
    $('#glo').innerHTML=list.length?list.map(g=>`<dt>${g[0]}${g[2]?'<span class="tag">Horizons</span>':''}</dt><dd>${g[1]}</dd>`).join(''):'<dd>Aucun terme ne correspond. Essayez un autre mot.</dd>'};
  $('#gs').addEventListener('input',f);$('#gh').addEventListener('change',f);f();
}
function labNations(){
  $('#nats').innerHTML=NATS.map(n=>`<div class="nat"><h3>${n[0]}</h3><div class="meta"><span class="stars" aria-label="Complexité ${n[1]} sur 5">${'★'.repeat(n[1])}${'☆'.repeat(5-n[1])}</span> · ${n[2]}</div><p>${n[3]}</p>${n[4]?`<p><b>${n[4]}</b></p>`:''}</div>`).join('');
}

build();labPay();labZones();labCard();labSetup();labOrders();labTokens();labMarket();labDeck();labCount();labScore();labGlossary();labNations();labGuided();progress();show();window.IMP_GLO=GLO;window.IMP_NATS=NATS;
})();
(function(){const $=s=>document.querySelector(s),L='(?<![\\p{L}])';
 const EXTRA={'Décompte':'Fin de partie normale. Déclenché quand la pioche Principale est vide, quand un joueur Développe sa dernière carte, quand Roi des rois est retournée face cachée ou par un effet de carte. En solo, aussi quand la pioche Dynastie de la C.I.V. est épuisée ou qu\'elle gagne Roi des rois. On termine la manche, on en joue une dernière, puis on compte les points.',
  'Effondrement':'Fin de partie immédiate dès que la pile Instabilités est vide. À plusieurs, le joueur qui possède le moins d\'Instabilités gagne. En solo, vous perdez automatiquement.',
  'Pioche Dynastie':'La réserve de cartes de la C.I.V. : ses cartes Nation, puis son Avènement, puis ses Développements du plus fort au plus faible. Une carte en sort chaque fois que son deck est vide. Quand elle est épuisée, le Décompte est déclenché.',
  'Roi des rois':'Dernière carte de la pioche Renommée. Quand il ne reste qu\'elle, gagner une Renommée la fait résoudre à la place, une seule fois par joueur. La C.I.V. gagne 6 Progrès si elle est Barbare ; Empire, elle gagne 3 Progrès et une carte de sa pioche Dynastie, et la fin de partie est déclenchée.'};
 const PAT=[['Exiler','exil[\\p{L}]*'],['Innover','innov[\\p{L}]*'],['Acquérir','acqui[\\p{L}]*|acquér[\\p{L}]*'],['Abandonner','abandonn[\\p{L}]*'],['Rappeler','rappel[\\p{L}]*'],['Histoire','archiv[\\p{L}]*'],
  ['Renvoyer une carte','renvoie[\\p{L}]*|renvoy[\\p{L}]*'],['Récupérer','récup[\\p{L}]*'],['Solstice','Solstice'],['Décompte','Décompte'],['Effondrement','Effondrement'],['Pioche Dynastie','pioche Dynastie'],['Attaque','Attaque'],['Roi des rois','Roi des rois']]
  .map(([k,r])=>[k,new RegExp(L+'(?:'+r+')','iu')]);
 window.IMP_HELP=k=>{const g=(window.IMP_GLO||[]).find(x=>x[0]===k),t=g?g[1]:EXTRA[k];if(!t)return;$('#helpt').textContent=k;$('#helpb').textContent=t;$('#help').hidden=false;$('#helpx').focus()};
 const close=()=>{$('#help').hidden=true};
 $('#helpx').onclick=close;$('#help').addEventListener('click',e=>{if(e.target.id==='help')close()});
 document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
 document.addEventListener('click',e=>{const b=e.target.closest('.kw');if(b)window.IMP_HELP(b.dataset.k)});
 window.IMP_LINK=root=>{PAT.forEach(([k,re])=>{const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let n;
   while((n=w.nextNode())){if(n.parentElement.closest('button,input,label,select'))continue;const m=re.exec(n.data);if(!m)continue;
     const r=n.splitText(m.index);r.splitText(m[0].length);const b=document.createElement('button');b.type='button';b.className='kw';b.dataset.k=k;b.textContent=m[0];r.replaceWith(b);break}})};
 const TABS=['apprendre','solo','plusieurs','aide'];
 function show(t){TABS.forEach(x=>{$('#tab-'+x).classList.toggle('on',x===t);$('header.top .lrmp-onglets [data-tab="'+x+'"]').classList.toggle('on',x===t)});try{localStorage.setItem('imperium-tab',t)}catch(e){}}
 function route(){let h=location.hash.slice(1);if(!TABS.includes(h)){try{h=localStorage.getItem('imperium-tab')}catch(e){}}show(TABS.includes(h)?h:'apprendre')}
 document.querySelectorAll('header.top .lrmp-onglets button').forEach(b=>b.onclick=()=>{show(b.dataset.tab);try{location.hash=b.dataset.tab}catch(e){}window.scrollTo(0,0)});
 window.addEventListener('hashchange',route);route();
})();