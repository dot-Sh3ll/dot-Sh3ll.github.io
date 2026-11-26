/* ---------- Chapitre 2 : le tour des règles ---------- */
const TOPICS=[
{t:'La Manche',h:'Préparer et terminer une Manche',rules:[
 `Une partie alterne des Manches de Jour et de Nuit. Le scénario fixe leur nombre.`,
 `Au début de chaque Manche après la première : retournez le plateau Jour/Nuit, relancez tous les dés de la Source (au moins la moitié en couleurs fondamentales, sinon relancez les dés or et noirs) et proposez une nouvelle Offre des Unités (nombre de joueurs + 2).`,
 `Les Offres de Sorts et d'Actions Avancées glissent : la carte du bas repart sous sa pioche, une nouvelle arrive en haut.`,
 `Chaque joueur remélange toutes ses cartes, Blessures comprises, puis pioche jusqu'à sa Limite de cartes en main. Ses Unités Épuisées redeviennent Disponibles, ses Compétences retournées aussi. Les Unités Blessées le restent.`,
 `Chacun choisit une carte Tactique, le joueur le moins Glorieux en premier. Le numéro de la Tactique fixe l'Ordre de Jeu : le plus petit numéro joue d'abord.`,
 `Si votre Deck est vide au début de votre tour, vous pouvez annoncer la fin de la Manche au lieu de jouer. Chaque autre joueur joue alors un dernier tour. Deck vide et main vide : vous êtes obligé de l'annoncer.`],
 quiz:[
 {q:`Au début de votre tour, votre Deck est vide mais il vous reste 3 cartes en main.`,o:[`Vous devez annoncer la fin de la Manche`,`Vous choisissez : annoncer la fin de la Manche ou jouer un tour`,`Vous remélangez votre défausse pour piocher`],a:1,why:`L'annonce n'est obligatoire que si la main est vide aussi. On ne remélange jamais sa défausse en cours de Manche.`},
 {q:`Qui choisit sa carte Tactique en premier ?`,o:[`Le joueur le plus Glorieux`,`Le joueur le moins Glorieux`,`Le premier dans l'Ordre de Jeu précédent`],a:1,why:`Le moins avancé sur l'Échelle de Gloire choisit d'abord. À égalité, c'est celui dont le jeton d'Ordre de Jeu est le plus bas.`},
 {q:`Vous annoncez la fin de la Manche. Que se passe-t-il ?`,o:[`Vous jouez votre tour, puis la Manche s'arrête`,`Vous ne jouez pas ; chaque autre joueur joue un dernier tour`,`La Manche s'arrête immédiatement pour tous`],a:1,why:`L'annonce remplace votre tour. Vous ne profitez même pas d'une Mine ou d'une Clairière.`}]},
{t:'Le tour',h:'Le tour de jeu dans le détail',rules:[
 `Tour Normal : un Mouvement facultatif, puis une seule action (combat, interaction, entrée dans un site d'aventures). Plus aucun Mouvement après l'action.`,
 `Repos, à la place : ni Mouvement ni action. Repos Standard : défaussez une carte autre que Blessure et autant de Blessures que vous voulez. Repos Prolongé, si vous n'avez que des Blessures : montrez votre main et défaussez-en une seule.`,
 `Les effets spéciaux et le Soin se jouent à tout moment de votre tour, même pendant un Repos. Seule exception : pas de Soin pendant un combat.`,
 `Chaque tour, vous devez jouer ou défausser au moins une carte.`,
 `Une carte jouée pour un effet ne peut plus servir ensuite pour son autre effet.`,
 `Vous pouvez revenir sur vos choix tant que rien de nouveau n'a été révélé : tuile, jeton Ennemi, carte piochée, dé lancé.`,
 `Fin du tour, dans l'ordre : relancer les dés utilisés, Retraite forcée éventuelle, rendre les jetons Mana et défausser les cartes jouées, effet de la Mine ou de la Clairière, récompenses de combat, changement de Niveau, défausse libre (jamais de Blessure), pioche jusqu'à la Limite.`],
 quiz:[
 {q:`Vous vous Reposez. Que pouvez-vous encore faire ce tour-ci ?`,o:[`Avancer d'une case`,`Jouer une carte de Soin`,`Recruter au Village où vous êtes`],a:1,why:`Le Repos interdit le Mouvement, le combat et l'interaction. Soin et effets spéciaux restent permis, avant ou après.`},
 {q:`Votre main contient 4 Blessures et rien d'autre. Vous vous Reposez. Combien en défaussez-vous ?`,o:[`Les 4`,`Une seule`,`Aucune`],a:1,why:`C'est un Repos Prolongé : une seule Blessure part en défausse.`},
 {q:`En plein combat, vous gagnez assez de Gloire pour franchir une ligne. Quand changez-vous de Niveau ?`,o:[`Tout de suite`,`À la fin du tour, avant de piocher`,`Au début de la Manche suivante`],a:1,why:`Les changements de Niveau se règlent toujours à la fin du tour.`}]},
{t:'Mouvement',h:'Mouvement et exploration, les précisions',rules:[
 `Révéler une tuile coûte 2 points depuis une case adjacente à son emplacement. Sa position et son orientation sont imposées, et rien ne se place derrière le littoral.`,
 `Vous alternez librement déplacements et explorations, et vous pouvez jouer de nouvelles cartes en cours de route.`,
 `Entrer sur un site fortifié non conquis arrête votre Mouvement et déclenche l'assaut. La case d'un ennemi errant est interdite tant qu'il n'est pas vaincu.`,
 `Un site d'aventures peut toujours être ignoré : vous traversez ou vous vous arrêtez sans combattre.`,
 `Vous pouvez traverser la case d'un autre joueur sans vous y arrêter. Vous y arrêter, c'est l'attaquer.`,
 `Plusieurs effets qui réduisent un coût de terrain se cumulent, sans jamais descendre sous 0.`,
 `Retraite forcée : si vous finissez votre tour sur une case non sécurisée (terrain normalement inaccessible, site fortifié non conquis, case d'un autre Héros), vous reculez de case en case et prenez une Blessure par case.`,
 `Entrer dans une Cité coûte toujours 2, quel que soit son terrain.`],
 quiz:[
 {q:`Un Donjon se trouve sur votre chemin. Pouvez-vous traverser sa case sans y combattre ?`,o:[`Oui, un site d'aventures peut être ignoré`,`Non, y entrer déclenche le combat`,`Oui, mais en payant 2 points de plus`],a:0,why:`Seuls les sites fortifiés non conquis et les ennemis errants bloquent ou interrompent le Mouvement.`},
 {q:`Grâce à un effet, vous finissez votre tour sur un Lac et devez reculer de 2 cases pour retrouver une case sécurisée.`,o:[`Rien d'autre ne se passe`,`Vous prenez 2 Blessures`,`Vous perdez 2 points de Réputation`],a:1,why:`La Retraite forcée coûte une Blessure par case de recul.`}]},
{t:'Jour et Nuit',h:'Ce que la Nuit change',rules:[
 `Terrains : la Forêt coûte 5 au lieu de 3, le Désert 3 au lieu de 5.`,
 `Le mana or est inutilisable la Nuit, d'où qu'il vienne. Le mana noir est inutilisable le Jour.`,
 `Le noir n'est pas un joker : la Nuit, il sert surtout à l'effet amélioré des Sorts.`,
 `De Jour, la garnison d'une Forteresse ou d'une Tour de Mage est révélée dès qu'un joueur arrive sur une case adjacente. La Nuit, elle reste cachée jusqu'à l'assaut.`,
 `Un jeton Ruines posé la Nuit reste face cachée jusqu'à ce qu'un joueur entre sur la case, ou jusqu'au Jour suivant.`,
 `Dans un Donjon, les règles de Nuit s'appliquent même en plein Jour.`,
 `Cristaux : un Cristal redevient du mana pur quand vous voulez ; l'inverse demande un effet. Trois par couleur au plus : un Cristal gagné en trop par un effet devient un simple jeton Mana, celui d'une Mine ou d'une récompense est perdu.`],
 quiz:[
 {q:`Il fait Nuit. Une carte vous a donné un jeton de mana or. Peut-il payer l'effet amélioré d'une carte verte ?`,o:[`Oui, l'or remplace toute couleur`,`Non, l'or est inutilisable la Nuit`,`Oui, mais seulement s'il vient d'une carte`],a:1,why:`La Nuit, le mana or ne sert à rien, quelle que soit sa provenance.`},
 {q:`De Nuit, vous vous arrêtez à côté d'une Forteresse dont le jeton est face cachée.`,o:[`Le jeton est révélé`,`Il reste caché, sauf si vous donnez l'assaut`,`Il est révélé puis recaché`],a:1,why:`La révélation par simple proximité ne fonctionne que de Jour.`},
 {q:`Combien coûte l'entrée dans un Désert pendant une Manche de Nuit ?`,o:[`2`,`3`,`5`],a:1,why:`Le Désert coûte 5 de Jour et 3 de Nuit. La Forêt fait l'inverse.`}]},
{t:'Sorts',h:'Apprendre et lancer des Sorts',rules:[
 `Un Sort est une carte Joueur : il rejoint votre Deck et se pioche comme les autres.`,
 `Même son effet de base coûte un mana de sa couleur.`,
 `Effet amélioré : un mana de sa couleur et un mana noir. Il n'est donc possible que la Nuit, ou dans un Donjon.`,
 `Vous ne prenez qu'un dé de la Source par tour : si c'est le noir, l'autre mana doit venir d'un Cristal, d'un jeton ou d'un effet.`,
 `Comme toute carte, un Sort peut être joué incliné pour 1 point.`,
 `Acheter un Sort : dans une Tour de Mage conquise, pour 7 Influence plus un mana de la couleur du Sort. On peut aussi en gagner en récompense. Il va sur le dessus de votre Deck, et l'Offre est complétée par le haut.`],
 quiz:[
 {q:`De Jour, que faut-il payer pour l'effet de base d'un Sort rouge ?`,o:[`Rien, comme une carte Action`,`Un mana rouge`,`Un mana rouge et un mana noir`],a:1,why:`Un Sort demande toujours un mana de sa couleur, même pour son effet de base. L'or convient aussi de Jour.`},
 {q:`La Nuit, sans Cristal ni jeton. La Source montre un dé noir et un dé bleu. Pouvez-vous lancer l'effet amélioré d'un Sort bleu ?`,o:[`Oui, en prenant les deux dés`,`Non : un seul dé de la Source par tour`,`Oui, le noir suffit`],a:1,why:`Il faut deux manas et la Source n'en fournit qu'un par tour, sauf effet qui en donne plus.`},
 {q:`Dans une Tour de Mage conquise, apprendre un Sort vert coûte…`,o:[`7 Influence`,`7 Influence et un mana vert`,`6 Influence`],a:1,why:`7 points d'Influence et un mana de la couleur du Sort. Six points, c'est le prix d'une Action Avancée au Monastère.`}]},
{t:'Artefacts',h:'Artefacts et Bannières',rules:[
 `Effet de base : l'Artefact se joue comme une carte normale, puis part en défausse.`,
 `Effet amélioré : au lieu de payer du mana, vous détruisez l'Artefact. Il est retiré du jeu.`,
 `Il peut aussi être joué incliné pour 1 point.`,
 `Gagner des Artefacts se fait en fin de tour : piochez-en autant que gagnés, plus un. Remettez-en un sous la pioche, les autres vont sur votre Deck. Il n'y a jamais d'Offre d'Artefacts.`,
 `Bannière : un Artefact que l'on attache à une Unité, à tout moment de son tour. L'Unité profite de son effet de base. Une seule Bannière par Unité, et pas d'effet amélioré tant qu'elle est attachée.`,
 `Si l'Unité est détruite ou renvoyée, la Bannière part en défausse. En fin de Manche, vous la laissez sur l'Unité ou vous la remélangez dans votre Deck.`],
 quiz:[
 {q:`Vous gagnez un Artefact. Combien de cartes piochez-vous dans la pioche Artefacts ?`,o:[`Une`,`Deux, et vous en gardez une`,`Trois, et vous en gardez une`],a:1,why:`Toujours une de plus que le nombre gagné, pour laisser un choix.`},
 {q:`Vous utilisez l'effet amélioré d'un Artefact. Où va la carte ?`,o:[`Dans votre défausse`,`Elle est retirée du jeu`,`Sous la pioche Artefacts`],a:1,why:`L'effet amélioré détruit l'Artefact.`},
 {q:`Vous renvoyez une Unité qui porte une Bannière. La Bannière…`,o:[`est retirée du jeu avec l'Unité`,`va dans votre défausse`,`revient dans votre main`],a:1,why:`Vous la repiocherez plus tard, souvent à une Manche suivante.`}]},
{t:'Niveaux',h:'Niveaux et Compétences',rules:[
 `Vous gagnez un Niveau par ligne franchie sur l'Échelle de Gloire, à la fin du tour. Le maximum est le Niveau 10.`,
 `Niveau impair : le jeton Niveau suivant devient visible (Armure ou Limite de cartes en main augmente) et vous recevez un jeton Commandement de plus.`,
 `Niveau pair : une Compétence et une Action Avancée. Révélez deux tuiles de votre pile, gardez-en une, placez l'autre dans l'Offre commune, puis prenez l'Action Avancée de votre choix dans l'Offre.`,
 `Variante au Niveau pair : prenez à la place une Compétence laissée par un autre joueur dans l'Offre commune. Vos deux tuiles y partent, et vous recevez l'Action Avancée du bas de l'Offre.`,
 `Trois sortes de Compétences : utilisable une fois par tour ; une fois par Manche (la tuile est retournée) ; interactive, une fois par Manche, dont l'effet dure jusqu'à votre prochain tour et touche les autres joueurs.`,
 `Toute nouvelle carte gagnée va sur le dessus de votre Deck.`],
 quiz:[
 {q:`Vous atteignez le Niveau 3. Que gagnez-vous ?`,o:[`Une Compétence et une Action Avancée`,`Un jeton Commandement et le jeton Niveau suivant`,`Un Sort`],a:1,why:`Les Niveaux impairs améliorent Armure ou Limite de cartes en main et ajoutent un jeton Commandement.`},
 {q:`Niveau 4 : vous préférez la Compétence qu'un autre joueur a laissée dans l'Offre commune. Quelle Action Avancée recevez-vous ?`,o:[`Celle de votre choix`,`Celle du bas de l'Offre`,`Aucune`],a:1,why:`Prendre la Compétence d'un autre vous prive du choix de la carte.`}]},
{t:'Unités',h:'Les Unités dans le détail',rules:[
 `Deux pioches : Unités Régulières (dos argenté) et d'Élite (dos doré). Dès qu'une tuile Royaume est révélée, l'Offre alterne Élite et Régulière.`,
 `Une Unité se recrute uniquement sur un site dont l'icône figure sur sa carte, pour son coût en Influence. L'Offre des Unités n'est complétée qu'à la Manche suivante.`,
 `Sans jeton Commandement libre, il faut renvoyer une Unité pour en recruter une autre. La recrue arrive Disponible et peut servir tout de suite, mais pas pour payer son propre recrutement.`,
 `Activer une Unité l'Épuise jusqu'à la fin de la Manche. Certaines capacités demandent en plus un mana.`,
 `Une Unité Épuisée peut encore encaisser des Dégâts. Une Unité Blessée ne peut ni agir ni encaisser.`,
 `Soigner une Unité coûte autant de points de Soin que son niveau, pour chaque Blessure.`,
 `Unité Résistante au type de l'attaque : elle absorbe d'abord son Armure sans être Blessée. S'il reste des Dégâts, elle est Blessée et absorbe son Armure une seconde fois. Dans tous les cas, elle n'encaisse qu'une fois par combat.`],
 quiz:[
 {q:`Une Unité d'Armure 4 avec Résistance physique encaisse une attaque physique de 7.`,o:[`Elle n'est pas Blessée`,`Elle est Blessée et tout est absorbé`,`Elle est Blessée et il reste 3 Dégâts`],a:1,why:`4 absorbés sans Blessure, puis elle est Blessée et absorbe les 3 restants.`},
 {q:`La même Unité encaisse une attaque physique de 4.`,o:[`Rien ne se passe : tout est absorbé sans Blessure`,`Elle est Blessée`,`Elle est détruite`],a:0,why:`L'Armure suffit. Elle ne pourra toutefois plus encaisser pendant ce combat.`},
 {q:`Soigner une Unité de niveau 3 qui porte une Blessure coûte…`,o:[`1 point de Soin`,`3 points de Soin`,`3 points d'Influence`],a:1,why:`Autant de points de Soin que le niveau de l'Unité.`}]},
{t:'Éléments',h:'Feu, Glace et Résistances',lab:1,rules:[
 `Attaques et Parades existent en quatre types : physique, Feu, Glace et Feu Glacé.`,
 `Parer : contre une attaque physique, toute Parade est efficace. Contre le Feu, seules Glace et Feu Glacé. Contre la Glace, seuls Feu et Feu Glacé. Contre le Feu Glacé, seul le Feu Glacé.`,
 `Les Parades inefficaces sont additionnées puis divisées par deux, arrondi à l'inférieur.`,
 `Résistance d'un ennemi : vos Attaques de ce type sont additionnées puis divisées par deux, arrondi à l'inférieur. Le Feu Glacé n'est réduit que par un ennemi qui résiste à la fois au Feu et à la Glace.`,
 `Une carte inclinée donne toujours un point physique, et jamais d'Attaque à Distance ni de Siège.`,
 `Un ennemi résistant au Feu ignore aussi les effets spéciaux, autres qu'Attaque et Parade, des cartes rouges et des capacités d'Unité payées en mana rouge. De même pour la Glace avec le bleu.`,
 `La couleur d'une carte ne fait pas l'élément : « Attaque 4 » sur une carte rouge reste physique.`],
 quiz:[
 {q:`Un ennemi lance une Attaque de Glace 5. Vous jouez Parade de Feu 3 et Parade physique 4. Est-elle parée ?`,o:[`Oui : 3 + 2 = 5`,`Non : il manque 1`,`Oui : 3 + 4 = 7`],a:0,why:`Le Feu compte plein, le physique pour moitié : 3 + 2 = 5, juste assez.`},
 {q:`Ennemi d'Armure 4, Résistances physique et Glace. Vous avez Attaque de Feu 2 et Attaque physique 5.`,o:[`Vaincu : 2 + 2 = 4`,`Insuffisant : 3`,`Vaincu : 7`],a:0,why:`Le Feu n'est pas réduit. Le physique est divisé par deux, arrondi à l'inférieur : 2.`}]},
{t:'Capacités',h:'Les capacités des ennemis',rules:[
 `Fortifié : pendant la phase à Distance et de Siège, seul le Siège le touche. Les défenseurs d'un site fortifié sont toujours Fortifiés. Un ennemi Fortifié qui défend un site fortifié est intouchable dans cette phase.`,
 `Vif : son Attaque est doublée, mais seulement pour la Parade.`,
 `Brutal : son Attaque est doublée, mais seulement pour les Dégâts.`,
 `Toxique : chaque Blessure prise en main en ajoute une dans votre défausse. Une Unité Blessée par lui reçoit deux Blessures.`,
 `Paralysant : si votre Héros prend ses Dégâts, vous défaussez toutes vos cartes autres que Blessure. Une Unité qui devrait être Blessée est détruite.`,
 `Invocation : en phase de Parade, piochez un jeton marron. Il attaque à la place de l'invocateur, puis il est défaussé. Le parer ne rapporte aucune Gloire.`,
 `Assommé : si vous prenez en un combat autant de Blessures que votre Limite de cartes en main non modifiée, vous défaussez toutes vos autres cartes. Unités et Compétences restent utilisables.`],
 quiz:[
 {q:`Un ennemi d'Attaque 3 est Vif et Brutal. Combien de Parade faut-il, et combien de Dégâts s'il passe ?`,o:[`Parade 6, Dégâts 6`,`Parade 6, Dégâts 3`,`Parade 3, Dégâts 6`],a:0,why:`Vif double l'Attaque pour la Parade, Brutal la double pour les Dégâts.`},
 {q:`Un ennemi Toxique inflige 2 Blessures à votre Héros. Bilan ?`,o:[`2 Blessures en main`,`2 en main et 2 dans la défausse`,`4 en main`],a:1,why:`Chaque Blessure prise en main s'accompagne d'une Blessure placée dans la défausse.`},
 {q:`La garnison d'une Forteresse porte la capacité Fortifié. Vous avez Attaque de Siège 6 en première phase.`,o:[`Elle est vaincue si son Armure est de 6 ou moins`,`Impossible : doublement Fortifiée, elle est intouchable dans cette phase`,`Le Siège est divisé par deux`],a:1,why:`Il faudra attendre la phase d'Attaque, où les fortifications ne comptent plus.`}]},
{t:'Plusieurs ennemis',h:'Combattre plusieurs ennemis',rules:[
 `Un seul combat par tour, mais il peut réunir plusieurs ennemis : site à plusieurs jetons, errants provoqués par votre Mouvement, errants adjacents que vous défiez en plus.`,
 `En entrant dans un site d'aventures, vous ne pouvez défier personne d'autre. Et jamais d'ennemis et de joueur dans le même combat.`,
 `Attaquer : ciblez un ou plusieurs ennemis et égalez la somme de leurs Armures. Vous pouvez lancer plusieurs attaques séparées dans la même phase.`,
 `Dans un groupe ciblé, une seule Résistance réduit toutes vos Attaques de ce type, et un seul Fortifié interdit les Attaques à Distance en première phase. Séparer ses attaques évite ces pénalités.`,
 `Parer : un ennemi à la fois, jamais de Parade groupée.`,
 `Dégâts : chaque ennemi ni vaincu ni paré frappe, dans l'ordre que vous choisissez.`,
 `Lors d'un assaut, les errants qui s'en mêlent ne sont pas Fortifiés, et il n'est pas nécessaire de les vaincre pour conquérir le site.`],
 quiz:[
 {q:`Deux ennemis : Armure 3 avec Résistance physique, et Armure 4 sans Résistance. Vous lancez une seule Attaque physique de 7 sur les deux.`,o:[`Les deux sont vaincus`,`Aucun : l'attaque tombe à 3 contre 7 d'Armure`,`Seul le second est vaincu`],a:1,why:`La Résistance d'un seul réduit toute l'attaque groupée. En ciblant uniquement le second, 7 suffisait largement.`},
 {q:`Deux ennemis non parés, d'Attaque 3 et 4. Pouvez-vous jouer une seule Parade de 7 contre le groupe ?`,o:[`Oui, on additionne leurs Attaques`,`Non, chaque ennemi se pare séparément`,`Oui, mais seulement s'ils sont du même type`],a:1,why:`Chaque Parade vise un seul ennemi. Il faut ici une Parade de 3 et une autre de 4.`}]},
{t:'Sites habités',h:'Villages, Monastères, Forteresses, Tours de Mage',rules:[
 `Interaction : votre Réputation modifie votre Influence une seule fois par tour, quel que soit le nombre d'achats. Sur la case X de l'Échelle, plus aucune interaction.`,
 `Village : recruter, Soin à 3 Influence le point. Piller : en dehors de votre tour, −1 Réputation et piochez 2 cartes. Un seul pillage entre deux de vos tours, et ce n'est pas une action.`,
 `Monastère : recruter, Soin à 2 Influence le point, apprendre pour 6 Influence l'Action Avancée ajoutée à l'Offre des Unités quand le Monastère a été révélé.`,
 `Brûler un Monastère est une action : −3 Réputation, un ennemi violet, et vos Unités refusent de participer. Victoire : un Artefact, et le Monastère n'existe plus.`,
 `Forteresse : garnison grise, Fortifiée, −1 Réputation par assaut. Conquise, elle est à vous : vous y recrutez, et en finissant votre tour dedans ou à côté, votre Limite augmente de 1 par Forteresse que vous possédez. Assaut raté : retour à la case d'où vous veniez.`,
 `Forteresse d'un autre joueur : c'est aussi un assaut. S'il est absent, un jeton gris la défend et ne rapporte que la moitié de sa Gloire. S'il est présent, c'est un combat Joueur contre Joueur.`,
 `Tour de Mage : garnison violette, Fortifiée, −1 Réputation par assaut. Récompense : un Sort. Ensuite, tout le monde peut y recruter et y acheter des Sorts.`],
 quiz:[
 {q:`Vous brûlez un Monastère avec deux Unités à vos côtés. Peuvent-elles encaisser les Dégâts ?`,o:[`Oui`,`Non, elles ne participent pas à ce combat`,`Oui, mais elles sont détruites`],a:1,why:`Vos Unités ne peuvent ni être activées ni recevoir de Dégâts pendant ce combat.`},
 {q:`Vous possédez 2 Forteresses et finissez votre tour à côté de l'une d'elles. Votre Limite est de 5. Vous piochez jusqu'à…`,o:[`5 cartes`,`6 cartes`,`7 cartes`],a:2,why:`+1 par Forteresse possédée, où qu'elles soient, à condition de finir dans ou à côté de l'une d'elles.`},
 {q:`Piller un Village, c'est…`,o:[`Votre action du tour, pour −1 Réputation`,`Hors de votre tour : −1 Réputation et 2 cartes piochées`,`Un combat contre un jeton gris`],a:1,why:`Le pillage se décide après la fin de votre tour et prépare le suivant.`}]},
{t:'Aventures',h:`Sites d'aventures et ennemis errants`,rules:[
 `Entrer dans un site d'aventures est l'action du tour. Aucune Réputation à gagner ni à perdre. Un site conquis reçoit votre jeton Bouclier, et la récompense arrive en fin de tour.`,
 `Antre : un ennemi marron. Récompense : 2 Cristaux tirés au dé (or : couleur au choix ; noir : +1 Gloire à la place). En cas d'échec, l'ennemi reste sur place, face visible.`,
 `Donjon : un ennemi marron, sans vos Unités et avec les règles de Nuit. Récompense au dé : or ou noir donne un Sort, une autre couleur un Artefact. En cas d'échec, le jeton est défaussé. Un Donjon conquis peut être refait, pour la Gloire seulement.`,
 `Ruines : un jeton jaune. Autel : payez 3 manas de la couleur indiquée et gagnez 7 Gloire. Ou bien des ennemis gardent un trésor : les survivants restent sur place, et la récompense va à celui qui bat le dernier.`,
 `Sombres Terriers et Tombeau : cousins plus dangereux de l'Antre et du Donjon. Le détail figure sur leur carte de Description.`,
 `Ennemis errants : les vaincre rapporte +1 Réputation par Orques Maraudeurs et +2 par Draconien. Rencontrés dans des Ruines, ils n'en rapportent pas.`],
 quiz:[
 {q:`Vous échouez dans un Donjon. Que devient le jeton Ennemi ?`,o:[`Il reste sur la case, face visible`,`Il est défaussé ; un nouveau sera pioché la prochaine fois`,`Il devient un ennemi errant`],a:1,why:`C'est dans l'Antre et les Ruines que les ennemis invaincus restent en place.`},
 {q:`Vous entrez dans un Donjon pendant une Manche de Jour. Le dé or de la Source est-il utilisable ?`,o:[`Oui, il fait Jour`,`Non, les règles de Nuit s'y appliquent`,`Oui, mais il compte comme noir`],a:1,why:`En revanche, le mana noir y devient utilisable pour l'effet amélioré d'un Sort.`},
 {q:`Récompense d'un Antre : vos deux lancers donnent noir et or.`,o:[`Deux Cristaux au choix`,`+1 Gloire et un Cristal de la couleur de votre choix`,`Rien`],a:1,why:`Le noir vaut 1 point de Gloire, l'or laisse choisir la couleur du Cristal.`}]},
{t:'Cités',h:'Assiéger et gouverner une Cité',rules:[
 `Entrer dans une Cité non conquise déclenche l'assaut : défenseurs Fortifiés, −1 Réputation. Le niveau de la Cité, fixé par le scénario, détermine ses défenseurs.`,
 `Bonus des défenseurs selon la couleur. Blanche : +1 Armure. Bleue : +2 aux Attaques de Feu ou de Glace, +1 aux Attaques de Feu Glacé. Rouge : les attaques physiques deviennent Brutales. Verte : les attaques physiques deviennent Toxiques.`,
 `Chaque défenseur vaincu vous fait poser un jeton Bouclier sur la carte Cité. Quand tous sont vaincus, la Cité est conquise. Son Seigneur est le joueur qui a le plus de Boucliers ; à égalité, celui qui a posé le premier.`,
 `Dans une Cité conquise, tout joueur peut interagir, avec +1 Influence par Bouclier qu'il y a posé. Rouge : Artefacts à 12 Influence. Bleue : Sorts, comme dans une Tour de Mage. Blanche : toute Unité, et 2 Influence pour ajouter une Élite à l'Offre. Verte : Actions Avancées à 6 Influence.`,
 `Finir son tour dans ou à côté d'une Cité conquise où l'on a un Bouclier : Limite +1, ou +2 pour le Seigneur. Ce bonus ne s'ajoute pas à celui des Forteresses : on garde le meilleur.`,
 `Aucun combat entre joueurs dans une Cité.`,
 `Assaut coopératif : depuis une case adjacente, un joueur propose aux Héros voisins une répartition des défenseurs. Si tous acceptent, chacun combat sa part à tour de rôle, puis passe son prochain tour.`],
 quiz:[
 {q:`Cité Verte : un défenseur à Attaque physique inflige 1 Blessure à votre Héros. Combien de cartes Blessure recevez-vous en tout ?`,o:[`Une`,`Deux : une en main, une en défausse`,`Trois`],a:1,why:`Dans la Cité Verte, les attaques physiques des défenseurs sont Toxiques.`},
 {q:`Vous avez 2 Boucliers sur une Cité conquise dont vous n'êtes pas le Seigneur. Quels bonus y obtenez-vous ?`,o:[`+2 Influence, Limite +1`,`+1 Influence, Limite +2`,`+2 Influence, Limite +2`],a:0,why:`+1 Influence par Bouclier. La Limite augmente de 1, ou de 2 pour le seul Seigneur.`}]},
{t:'Joueur contre Joueur',h:'Affronter un autre Mage Knight',rules:[
 `Finir votre Mouvement sur la case d'un autre joueur, c'est l'attaquer : c'est votre action du tour. Interdit sur un Portail, dans une Cité, et après l'annonce de la fin de la Manche.`,
 `Le défenseur choisit. Participer pleinement : il joue maintenant son prochain tour, avec dé de la Source et Compétences, puis sautera ce tour. Participer partiellement : ni dé ni Compétences, mais il garde son tour.`,
 `Deux phases : Distance et Siège (le défenseur attaque d'abord), puis Mêlée (l'agresseur d'abord). Les joueurs alternent jusqu'à ce que les deux passent.`,
 `Ici, une Parade peut être partielle. En phase à Distance, il faut 2 points de Parade par point d'Attaque. En Mêlée, 1 pour 1.`,
 `L'attaquant répartit les Dégâts. Pour infliger une Blessure à un Héros ou à une Unité, il faut autant de Dégâts que son Armure, le double si l'Unité résiste.`,
 `En Mêlée, les Dégâts peuvent aussi voler un Artefact (5 Dégâts) ou forcer l'adversaire à reculer sur une case adjacente sécurisée, pour son coût de Mouvement. Dans ce cas le combat s'arrête et vous l'emportez.`,
 `Gloire du vainqueur : 1 point + 2 par Niveau d'écart s'il était de Niveau inférieur ; 1 point à Niveau égal s'il avait moins de Gloire ; rien sinon. Si personne ne recule, c'est l'agresseur qui retourne d'où il venait, sans vainqueur.`],
 quiz:[
 {q:`Phase à Distance : on vous lance une Attaque à Distance physique de 4. Vous jouez Parade 6. Combien de Dégâts passent ?`,o:[`Aucun`,`1`,`4`],a:1,why:`Dans cette phase, 2 points de Parade bloquent 1 point d'Attaque : 6 de Parade en bloquent 3.`},
 {q:`Combien de Dégâts faut-il assigner pour infliger une Blessure à un Héros d'Armure 3 ?`,o:[`1 suffit`,`3`,`6`],a:1,why:`Contre un joueur, il faut atteindre l'Armure. Contre un ennemi classique, le moindre Dégât blessait.`}]},
{t:'Solo et score',h:'Scénarios, joueur Fantôme et score',rules:[
 `Chaque scénario fixe la forme du plateau, les tuiles, le niveau des Cités, la durée et la condition de fin.`,
 `Mission de Reconnaissance : 3 Manches, +1 Gloire par tuile révélée, pas d'Unités d'Élite, et on n'entre pas dans la Cité. Quand la tuile Cité est révélée, chaque joueur joue un dernier tour. En solo : 4 Manches.`,
 `En solo et en coopératif, un joueur Fantôme donne le rythme. Il reçoit un Deck de 16 cartes Action Basique et 3 Cristaux, et sa Tactique ne sert qu'à le placer dans l'Ordre de Jeu.`,
 `Tour du Fantôme : il retourne 3 cartes de son Deck. S'il possède des Cristaux de la couleur de la dernière, il en retourne autant en plus. Deck vide : il annonce la fin de la Manche.`,
 `À chaque nouvelle Manche, l'Action Avancée retirée de l'Offre rejoint son Deck, et il gagne un Cristal de la couleur du Sort retiré.`,
 `Score : votre Gloire, plus les Hauts Faits de la carte de Score. Ses premières lignes : 2 points par Sort ou Artefact, 1 par Action Avancée, 1 par paire de Cristaux, et le niveau de chaque Unité (moitié si elle est Blessée). La suite est sur la carte.`],
 quiz:[
 {q:`Le Fantôme retourne 3 cartes. La dernière est verte et il possède 2 Cristaux verts. Combien de cartes retourne-t-il en plus ?`,o:[`Aucune`,`2`,`3`],a:1,why:`Autant que de Cristaux de cette couleur. La couleur de ces cartes supplémentaires ne compte plus.`},
 {q:`Mission de Reconnaissance : un joueur révèle la tuile Cité. Ensuite ?`,o:[`La partie s'arrête aussitôt`,`Chaque joueur, lui compris, joue un dernier tour`,`On termine la Manche en cours`],a:1,why:`Si la Manche se termine pendant ces derniers tours, la partie s'arrête à ce moment-là.`}]}
];
const LAB={ael:'fire',aval:5,b:{phys:0,fire:0,ice:0,cf:0},arm:5,res:{phys:false,fire:false,ice:false},k:{phys:0,fire:0,ice:0,cf:0}};
const ELN={phys:'physique',fire:'Feu',ice:'Glace',cf:'Feu Glacé'};
const EFF={phys:['phys','fire','ice','cf'],fire:['ice','cf'],ice:['fire','cf'],cf:['cf']};
function labHtml(){const els=['phys','fire','ice','cf'];
  let good=0,bad=0;els.forEach(e=>{if(EFF[LAB.ael].includes(e))good+=LAB.b[e];else bad+=LAB.b[e]});const bt=good+Math.floor(bad/2);
  let ok=0,rs=0;els.forEach(e=>{const r=e==='cf'?LAB.res.fire&&LAB.res.ice:LAB.res[e];if(r)rs+=LAB.k[e];else ok+=LAB.k[e]});const at=ok+Math.floor(rs/2);
  const step=(key,val)=>`<span class="stepper"><button data-lab="${key}:-1" aria-label="moins">−</button><b>${val}</b><button data-lab="${key}:1" aria-label="plus">+</button></span>`;
  return `<div class="lab"><h3>Essayez : la Parade</h3>
   <div class="row"><span>Attaque ennemie de type</span>${els.map(e=>`<button data-lab="ael:${e}" class="${LAB.ael===e?'on':''}">${ELN[e]}</button>`).join('')}<span>de valeur</span>${step('aval',LAB.aval)}</div>
   <div class="labgrid">${els.map(e=>`<div><span>Parade ${ELN[e]} <small>${EFF[LAB.ael].includes(e)?'efficace':'moitié'}</small></span>${step('b.'+e,LAB.b[e])}</div>`).join('')}</div>
   <p class="verdict ${bt>=LAB.aval?'yes':'no'}">Efficaces ${good} + inefficaces ${bad} ÷ 2 = <b>${bt}</b> contre ${LAB.aval} : ${bt>=LAB.aval?'attaque parée.':'la Parade échoue entièrement.'}</p></div>
  <div class="lab"><h3>Essayez : l'Attaque</h3>
   <div class="row"><span>Ennemi d'Armure</span>${step('arm',LAB.arm)}<span>résistant à</span>${['phys','fire','ice'].map(e=>`<button data-lab="res:${e}" class="${LAB.res[e]?'on':''}">${ELN[e]}</button>`).join('')}</div>
   <div class="labgrid">${els.map(e=>{const r=e==='cf'?LAB.res.fire&&LAB.res.ice:LAB.res[e];return `<div><span>Attaque ${ELN[e]} <small>${r?'moitié':'pleine'}</small></span>${step('k.'+e,LAB.k[e])}</div>`}).join('')}</div>
   <p class="verdict ${at>=LAB.arm?'yes':'no'}">Pleines ${ok} + réduites ${rs} ÷ 2 = <b>${at}</b> contre Armure ${LAB.arm} : ${at>=LAB.arm?'ennemi vaincu.':'attaque sans effet.'}</p></div>`}
function labAct(v){const [k,x]=v.split(':');
  if(k==='ael')LAB.ael=x;else if(k==='res')LAB.res[x]=!LAB.res[x];
  else{const n=+x;if(k==='aval')LAB.aval=Math.max(1,Math.min(12,LAB.aval+n));else if(k==='arm')LAB.arm=Math.max(1,Math.min(12,LAB.arm+n));
    else{const [g,e]=k.split('.');LAB[g][e]=Math.max(0,Math.min(12,LAB[g][e]+n))}}
  render()}
/* ---------- Parcours : chapitres, cas pratiques, quiz ---------- */
const NEWT=[
{t:'But du jeu',h:'But du jeu et matériel',rules:[
 `Vous incarnez un Mage Knight : vous explorez, combattez et gagnez en puissance. Le scénario fixe l'objectif et la durée ; en compétitif, le plus Glorieux l'emporte.`,
 `Votre Héros commence avec un Deck de 16 cartes Action Basique, une main de 5 cartes, une Armure de 2 et un seul jeton Commandement.`,
 `Le plateau se construit en explorant : d'abord des tuiles Campagne (dos vert), puis des tuiles Royaume (dos marron), où se trouvent les Cités.`,
 `Deux échelles vous suivent : la Gloire, qui fait monter de Niveau, et la Réputation, qui pèse sur vos interactions.`,
 `La Source contient autant de dés Mana que de joueurs, plus 2. Au moins la moitié doit montrer une couleur fondamentale, sinon on relance les dés or et noirs.`,
 `Trois Offres sont visibles : Unités (joueurs + 2), Sorts (3) et Actions Avancées (3). Les Artefacts ne sont jamais proposés en Offre.`,
 `Les jetons Ennemi sont triés par couleur de dos : chaque couleur correspond à un type de lieu ou d'adversaire, et les rouges et les blancs sont les plus dangereux.`],
 quiz:[{q:`À deux joueurs, combien de dés Mana place-t-on dans la Source ?`,o:[`2`,`4`,`6`],a:1,why:`Le nombre de joueurs plus 2.`},
 {q:`Avec quoi votre Héros commence-t-il la partie ?`,o:[`5 cartes en main, Armure 2, un jeton Commandement`,`7 cartes en main, Armure 3, deux jetons Commandement`,`5 cartes en main et une Unité`],a:0,why:`Ce sont les valeurs du premier jeton Niveau. Les Unités se recrutent en cours de partie.`}]},
{t:'Les cartes',h:'Jouer ses cartes',rules:[
 `Une carte Action porte deux effets : celui du haut, gratuit, et celui du bas, amélioré, qui coûte un mana de la couleur de la carte.`,
 `Toute carte, sauf une Blessure, peut être jouée inclinée : elle vaut alors 1 Mouvement, 1 Influence, 1 Attaque ou 1 Parade. Jamais d'Attaque à Distance, de Siège, ni d'élément.`,
 `Les effets de même nature s'additionnent : jouez autant de cartes que vous voulez.`,
 `Une carte ne sert qu'une fois par tour, pour un seul de ses effets.`,
 `À la fin du tour, les cartes jouées partent en défausse. Les autres restent en main, sauf celles que vous choisissez de défausser, puis vous piochez jusqu'à votre Limite de cartes en main.`,
 `Quand le Deck est vide, on ne remélange pas la défausse : il faut attendre la fin de la Manche.`,
 `Défausser envoie une carte dans votre défausse ; détruire la retire du jeu. « Toute carte » ne désigne jamais une Blessure.`],
 quiz:[{q:`Il vous faut 3 points de Mouvement. Vous avez Marche (Mouvement 2, amélioré 4), d'autres cartes, et aucun mana.`,o:[`Impossible sans mana`,`Marche, plus une autre carte inclinée`,`Marche jouée deux fois`],a:1,why:`Une carte inclinée ajoute 1 point. Une carte ne se joue qu'une fois par tour.`},
 {q:`Peut-on incliner une carte pour ajouter 1 à une Attaque à Distance ?`,o:[`Oui`,`Non, une carte inclinée ne donne qu'une Attaque physique normale`,`Oui, mais seulement une carte blanche`],a:1,why:`Les cartes inclinées n'aident ni les Attaques à Distance, ni le Siège, ni les éléments.`}]},
{t:'Le mana',h:'Le mana et les Cristaux',rules:[
 `Quatre couleurs fondamentales : rouge, bleu, blanc, vert. Deux couleurs spéciales : or et noir.`,
 `Le mana existe sous trois formes : un dé de la Source, un jeton, ou un Cristal.`,
 `Source : un seul dé par tour. Vous le prenez au moment de l'utiliser, et il est relancé à la fin de votre tour.`,
 `Jeton : donné par un effet, il disparaît à la fin du tour s'il n'a pas servi.`,
 `Cristal : il se garde dans votre Inventaire, trois par couleur au plus, et redevient du mana quand vous le décidez.`,
 `Le mana or remplace n'importe quelle couleur fondamentale, le Jour seulement. Le mana noir ne sert que la Nuit. Il n'existe pas de Cristal or ou noir.`,
 `Une Mine de Cristal donne un Cristal de sa couleur si vous terminez votre tour dessus.`],
 quiz:[{q:`Vous avez déjà pris un dé de la Source ce tour-ci. Pouvez-vous payer un second effet amélioré ?`,o:[`Non, un seul mana par tour`,`Oui, avec un Cristal ou un jeton`,`Oui, en prenant un second dé`],a:1,why:`La limite ne porte que sur les dés de la Source.`},
 {q:`Que devient un jeton Mana non utilisé à la fin du tour ?`,o:[`Il devient un Cristal`,`Il est perdu`,`Il retourne dans la Source`],a:1,why:`Seul un effet permet de transformer du mana en Cristal.`}]},
{t:'Interaction',h:'Interaction et Réputation',rules:[
 `Interagir est votre action du tour. C'est possible sur un site habité : Village, Monastère, Forteresse à vous, Tour de Mage conquise, Cité conquise.`,
 `Additionnez l'Influence de vos cartes, de vos cartes inclinées et de vos Unités, puis appliquez une seule fois le modificateur de votre Réputation.`,
 `Avec ce total, achetez tout ce que le site propose, en une seule interaction.`,
 `Recruter : l'icône du site doit figurer sur la carte de l'Unité, vous payez son coût et il vous faut un jeton Commandement libre.`,
 `Se soigner : 3 Influence le point de Soin au Village, 2 au Monastère.`,
 `La Réputation monte quand vous battez des ennemis errants. Elle baisse à chaque assaut (−1), à chaque pillage (−1) et si vous brûlez un Monastère (−3). Sur la case X, plus aucune interaction.`],
 quiz:[{q:`Votre Réputation vous donne +1. Vous recrutez deux Unités dans la même interaction. Combien de fois le bonus compte-t-il ?`,o:[`Une fois`,`Deux fois`,`Jamais pour un recrutement`],a:0,why:`Bonus et malus de Réputation s'appliquent une seule fois par tour.`},
 {q:`Vous venez de recruter au Village. Pouvez-vous encore vous déplacer ce tour-ci ?`,o:[`Oui, s'il vous reste des points`,`Non, tout Mouvement se fait avant l'action`,`Oui, d'une seule case`],a:1,why:`L'interaction est l'action du tour, et aucun Mouvement ne suit l'action.`}]},
{t:'Le combat',h:'Le combat en quatre phases',rules:[
 `Phase 1, Distance et Siège : seules ces Attaques comptent. Vaincre l'ennemi ici vous évite sa riposte.`,
 `Phase 2, Parade : il faut égaler ou dépasser l'Attaque ennemie. C'est tout ou rien : une Parade trop faible ne réduit rien.`,
 `Phase 3, Dégâts : un ennemi ni vaincu ni paré inflige des Dégâts égaux à son Attaque.`,
 `Phase 4, Attaque : toutes vos Attaques comptent, y compris les Attaques à Distance ou de Siège encore disponibles et les cartes inclinées.`,
 `Il faut atteindre l'Armure ennemie en une seule attaque. Rien ne se reporte d'une phase à l'autre ni d'un tour à l'autre.`,
 `La Gloire d'un ennemi vaincu se marque aussitôt. Le Niveau, lui, ne change qu'en fin de tour.`,
 `Un seul combat par tour, et aucun Soin pendant le combat.`,
 `En cas d'échec : un ennemi errant reste sur sa case ; après un assaut raté, vous reculez sur la case d'où vous veniez.`],
 quiz:[{q:`Ennemi d'Armure 5. Vous lui infligez 3 en phase 1, puis 3 en phase 4.`,o:[`Il est vaincu : 6 au total`,`Il n'est pas vaincu : chaque attaque doit atteindre 5 à elle seule`,`Il est vaincu en phase 4 seulement`],a:1,why:`Les Dégâts ne se cumulent pas d'une attaque à l'autre.`},
 {q:`Vous jouez Parade 3 contre une Attaque de 4.`,o:[`Vous ne subissez que 1 Dégât`,`La Parade échoue : vous subissez 4 Dégâts`,`L'ennemi est repoussé`],a:1,why:`Contre un ennemi, la Parade est tout ou rien.`}]},
{t:'Blessures',h:'Blessures, Repos et Soin',rules:[
 `Les Dégâts non parés se répartissent. Une Unité désignée devient Blessée et absorbe autant de Dégâts que son Armure.`,
 `Le reste va au Héros : une carte Blessure en main par tranche d'Armure, arrondi au supérieur. Avec une Armure de 2, 3 Dégâts font 2 Blessures.`,
 `Une Blessure reste en main : elle ne se joue pas, ne s'incline pas et ne se défausse pas en fin de tour.`,
 `Assommé : si vous recevez en un combat autant de Blessures que votre Limite de cartes en main non modifiée, vous défaussez toutes vos autres cartes.`,
 `Repos Standard : défaussez une carte autre que Blessure et autant de Blessures que vous voulez. Repos Prolongé, avec une main de Blessures seulement : une seule. Ces Blessures vont dans votre défausse et reviendront.`,
 `Soin : chaque point retire définitivement une Blessure de votre main. Soigner une Unité coûte autant de points que son niveau. Les points non utilisés sont perdus dès qu'un combat commence.`,
 `La Clairière Magique retire une Blessure de votre main ou de votre défausse en fin de tour. Ce n'est pas un Soin : elle n'aide pas les Unités.`],
 quiz:[{q:`7 Dégâts. Vos Villageois (Armure 3) encaissent d'abord, votre Héros (Armure 2) prend le reste.`,o:[`2 Blessures pour le Héros`,`4 Blessures pour le Héros`,`Aucune : l'Unité absorbe tout`],a:0,why:`7 − 3 = 4 Dégâts restants, soit 2 Blessures avec une Armure de 2. Les Villageois sont Blessés.`},
 {q:`Vous défaussez une Blessure en vous Reposant. Que devient-elle ?`,o:[`Elle est retirée du jeu`,`Elle reviendra au prochain mélange de votre Deck`,`Elle retourne dans votre main au tour suivant`],a:1,why:`Seul le Soin, ou la Clairière Magique, s'en débarrasse pour de bon.`}]},
{t:'Coopération',h:'Jouer en coopération',rules:[
 `Dans un scénario coopératif, tous les joueurs gagnent ou perdent ensemble. Le combat entre joueurs n'existe pas : vous ne pouvez pas terminer votre Mouvement sur la case d'un partenaire.`,
 `Un joueur Fantôme donne le rythme. Il tire sa Tactique au hasard avant les joueurs. À la fin de chaque Manche, les joueurs retirent du jeu une des Tactiques qu'ils ont utilisées.`,
 `Retirez du jeu les quatre Sorts interactifs (n° 17 à 20) et la Compétence interactive de chaque Héros.`,
 `Assaut coopératif d'une Cité : depuis une case adjacente, un joueur qui n'a pas encore fait d'action invite les Héros adjacents et propose combien de défenseurs chacun affrontera, au moins un par joueur.`,
 `Si tous acceptent, les jetons sont mélangés et distribués sans être regardés. Les invités retournent leur jeton d'Ordre de Jeu : ils passeront leur prochain tour. Chacun entre dans la Cité et combat sa part, à tour de rôle.`,
 `La Cité tombe si tous ses défenseurs sont vaincus. Sinon, tout le monde recule sur sa case de départ.`,
 `Score d'équipe : la Gloire du joueur le moins avancé, puis le meilleur des joueurs pour chaque Haut Fait, puis les points de mission : 10 par Cité conquise, 10 si chacun est Seigneur d'une Cité, 15 si toutes sont prises, 30 par Manche non utilisée.`,
 `Conquête Coopérative Éclair, le scénario court : 4 Manches, 1 Gloire et 2 Réputation au départ, un dé de plus dans la Source et une Unité de plus dans l'Offre.`],
 quiz:[{q:`Sur quoi repose la base du score d'équipe ?`,o:[`La Gloire du joueur le plus avancé`,`La Gloire du joueur le moins avancé`,`La somme des Gloires`],a:1,why:`Laisser un partenaire à la traîne coûte donc des points à toute l'équipe.`},
 {q:`En coopération, qui prend sa carte Tactique en premier ?`,o:[`Le joueur le moins Glorieux`,`Le Fantôme, au hasard`,`Le joueur qui a annoncé la fin de la Manche`],a:1,why:`En solo c'est l'inverse : vous choisissez d'abord, puis le Fantôme tire parmi les restantes.`}]},
{t:'Glossaire',h:'Glossaire',glo:[
 ['Action Avancée','Carte plus puissante que les cartes de base, gagnée aux Niveaux pairs, au Monastère ou en récompense.'],
 ['Antre','Site d\'aventures abritant un monstre marron. Appelé Tanière dans le guide pas à pas.'],
 ['Armure','Pour le Héros : Dégâts absorbés par chaque Blessure reçue. Pour un ennemi : valeur d\'Attaque à atteindre pour le vaincre.'],
 ['Assaut','Entrée sur un site fortifié non conquis. Déclenche le combat et coûte 1 Réputation.'],
 ['Assommé','État du Héros qui reçoit en un combat autant de Blessures que sa Limite de cartes en main : il défausse ses autres cartes.'],
 ['Bannière','Artefact que l\'on attache à une Unité. Appelé Étendard dans le guide pas à pas.'],
 ['Blessure','Carte injouable qui encombre la main. Retirée par le Soin, défaussée par le Repos.'],
 ['Carte inclinée','Carte jouée à l\'horizontale pour 1 Mouvement, 1 Influence, 1 Attaque ou 1 Parade.'],
 ['Case sécurisée','Case où l\'on peut finir son tour : accessible normalement, sans site fortifié non conquis ni autre Héros.'],
 ['Commandement','Jeton nécessaire pour diriger une Unité. Un de plus à chaque Niveau impair.'],
 ['Cristal','Mana conservé dans l\'Inventaire, trois par couleur au plus.'],
 ['Disponible, Épuisée','États d\'une Unité : prête à agir, ou déjà activée jusqu\'à la fin de la Manche.'],
 ['Effet amélioré','Second effet d\'une carte, payé en mana. Appelé effet puissant dans le guide pas à pas.'],
 ['Ennemi errant','Orques Maraudeurs ou Draconien posé sur le plateau, que l\'on peut défier depuis une case voisine ou provoquer en le longeant.'],
 ['Fantôme','Joueur fictif des parties solo et coopératives, qui fait avancer la Manche.'],
 ['Fortifié','Ennemi que seules les Attaques de Siège atteignent en première phase.'],
 ['Gloire','Points gagnés en battant des ennemis. Font monter de Niveau. Appelée Renommée dans le guide pas à pas.'],
 ['Influence','Points dépensés lors d\'une interaction pour recruter, se soigner ou apprendre.'],
 ['Limite de cartes en main','Nombre de cartes jusqu\'auquel on pioche en fin de tour.'],
 ['Manche','Suite de tours, de Jour ou de Nuit, close quand un joueur l\'annonce. Appelée Round dans le guide pas à pas.'],
 ['Offre','Cartes visibles que l\'on peut acquérir : Unités, Sorts, Actions Avancées.'],
 ['Parade','Effet qui annule l\'Attaque d\'un ennemi s\'il l\'égale ou la dépasse.'],
 ['Réputation','Échelle qui ajoute ou retire de l\'Influence à chaque interaction.'],
 ['Résistance','Divise par deux les Attaques du type concerné. Pour une Unité : lui permet d\'absorber deux fois son Armure.'],
 ['Retraite forcée','Recul imposé en fin de tour depuis une case non sécurisée, une Blessure par case.'],
 ['Seigneur','Joueur qui a posé le plus de jetons Bouclier sur une Cité conquise.'],
 ['Siège','Attaque utilisable en première phase, même contre un ennemi Fortifié.'],
 ['Sombres Terriers','Site d\'aventures proche de l\'Antre, en plus dangereux. Appelé Frayère dans le guide pas à pas.'],
 ['Source','Réserve commune de dés Mana : un dé par joueur et par tour.'],
 ['Tactique','Carte choisie à chaque Manche : son numéro fixe l\'Ordre de Jeu.'],
 ['Toxique, Paralysant, Vif, Brutal','Capacités d\'ennemis : voir le chapitre Capacités.']],quiz:[]}
];
/* ---------- Extensions : La Légion Oubliée, Les Ombres de Tezla ---------- */
NEWT.push(
{t:'Légion : sites',h:'La Légion Oubliée : nouveaux sites',rules:[
 `Rempart : il se trouve entre deux cases. Le franchir coûte 1 point de Mouvement de plus, et ce surcoût ne se réduit jamais. Les effets qui vous posent directement sur une case l'ignorent.`,
 `Défier un ennemi errant, ou attaquer Volkare ou un autre joueur, à travers un Rempart : la cible est Fortifiée. Un assaut de site fortifié à travers un Rempart rend ses défenseurs doublement Fortifiés.`,
 `Les ennemis errants ne vous attaquent jamais à travers un Rempart : finir un déplacement sur une case séparée d'eux par un Rempart ne les provoque pas.`,
 `Dédale et Labyrinthe : sites d'aventures. Y entrer est votre action. Une seule de vos Unités Disponibles peut vous accompagner. Vous payez 2, 4 ou 6 points de Mouvement, avec des effets joués pour l'occasion et non les restes de votre déplacement.`,
 `Vous y combattez un ennemi marron (Dédale) ou rouge (Labyrinthe). Victoire : la récompense dépend du chemin payé, et votre Bouclier marque ce chemin ; vous n'y reviendrez plus, mais un autre joueur peut prendre un chemin libre. Défaite : le jeton est défaussé.`,
 `Mine sans fond : comme une Mine, mais vous choisissez la couleur du Cristal parmi celles proposées à son entrée, avant vos récompenses de combat.`,
 `Camp de réfugiés : vous y recrutez n'importe quelle Unité de l'Offre. Coût normal pour une Unité de Village, +1 pour une Unité de Forteresse, de Tour de Mage ou de Monastère, +3 pour une Unité recrutable seulement en Cité.`,
 `Variante solo « Contrôle sur les Offres » : à la fin de chaque Manche, en plus de la carte du bas, vous pouvez retirer celle du milieu des Offres de Sorts et d'Actions Avancées.`],
 quiz:[{q:`Vous entrez dans un Dédale en payant 4 points de Mouvement. Combien de vos Unités peuvent participer ?`,o:[`Aucune`,`Une seule, choisie à l'entrée`,`Toutes`],a:1,why:`Une Unité Disponible vous accompagne ; les autres ne peuvent ni agir ni encaisser.`},
  {q:`Au Camp de réfugiés, une Unité de Monastère coûte 7. Combien payez-vous ?`,o:[`7`,`8`,`10`],a:1,why:`+1 pour une Unité de Forteresse, de Tour de Mage ou de Monastère.`},
  {q:`Des Orques sont de l'autre côté d'un Rempart. Vous longez leur case sans le franchir.`,o:[`Ils vous attaquent`,`Ils ne sont pas provoqués`,`Ils attaquent, mais sont Fortifiés`],a:1,why:`Un ennemi errant n'attaque jamais à travers un Rempart.`}]},
{t:'Légion : ennemis',h:'La Légion Oubliée : nouvelles capacités ennemies',rules:[
 `Attaques multiples : un ennemi à plusieurs valeurs d'Attaque frappe plusieurs fois. Chaque attaque se pare et s'encaisse séparément, dans l'ordre de votre choix. Il n'est « bloqué » que si toutes ses attaques le sont.`,
 `Insaisissable : deux valeurs d'Armure. La plus haute s'applique en phase à Distance et Siège. Si vous parez toutes ses attaques, la plus basse s'applique en phase d'Attaque ; sinon la plus haute reste jusqu'à la fin du combat, même si vous l'avez empêché d'attaquer.`,
 `Assassin : ses Dégâts non parés vont tous au Héros, jamais aux Unités. Vos Unités peuvent en revanche aider à le parer.`,
 `Lourd : en phase de Parade, chaque point de Mouvement dépensé retire 1 à son Attaque, pour la Parade et pour les Dégâts. Une Attaque tombée à 0 est parée. Il faut des effets de Mouvement joués pendant le combat.`,
 `Non-Fortifié : il n'est jamais Fortifié, ni dans un site fortifié ni à travers un Rempart.`,
 `Immunité aux Arcanes : seuls vos effets d'Attaque et de Parade le touchent. Rien ne peut le détruire, réduire son Armure ou l'empêcher d'attaquer. Ses attaques, elles, peuvent être affaiblies.`,
 `Certains jetons portent un modificateur de Réputation, gagné ou perdu en les vainquant, en plus de la Gloire.`],
 quiz:[{q:`Un ennemi Insaisissable (Armure 3 / 6) vous attaque. Vous préférez encaisser sans parer. Quelle Armure devrez-vous battre en phase d'Attaque ?`,o:[`3`,`6`,`9`],a:1,why:`La petite valeur ne s'obtient qu'en parant toutes ses attaques.`},
  {q:`Un Assassin vous inflige 4 Dégâts non parés. Vos Gardes peuvent-ils les encaisser ?`,o:[`Oui`,`Non, tout va au Héros`,`Oui, pour la moitié`],a:1,why:`Les Dégâts d'un Assassin ne s'assignent jamais à une Unité.`},
  {q:`Un ennemi Lourd attaque à 8. Vous jouez 3 points de Mouvement pendant la Parade. Quelle Parade faut-il encore ?`,o:[`8`,`5`,`3`],a:1,why:`Chaque point de Mouvement retire 1 à son Attaque : 8 − 3 = 5.`}]},
{t:'Légion : Unités',h:'La Légion Oubliée : nouvelles Unités',rules:[
 `Voyous : si vous en recrutez lors d'une interaction, votre bonus ou malus de Réputation est inversé pour toute cette interaction. Ils n'encaissent des Dégâts que si vous payez 2 Influence pendant le combat.`,
 `Héros (l'Unité) : en recruter double votre bonus ou malus de Réputation pour l'interaction. Lors de l'assaut d'un site fortifié, leurs capacités coûtent 2 Influence ; ils peuvent tout de même encaisser.`,
 `Impossible de recruter des Voyous et des Héros dans la même interaction.`,
 `Maîtres de Delphana : recrutables seulement par interaction. Une fois activés, ils peuvent utiliser plusieurs de leurs capacités, chacune une fois, en payant leur mana.`,
 `Familiers magiques : recrutables aussi dans une Clairière Magique, comme action et sans effet de Réputation. Il faut payer un mana fondamental, puis un Cristal au début de chaque Manche suivante, sinon ils quittent la partie.`,
 `Bannière de Commandement : attachée à une Unité, elle remplace son jeton Commandement, donc vous contrôlez une Unité de plus. Si l'Unité perd la Bannière, elle quitte la partie.`,
 `Nouveaux Héros : Wolfhawk (La Légion Oubliée), Krang et Braevalar (Les Ombres de Tezla) se jouent comme les autres. Certaines Compétences de Krang ont un effet de Réactivation : une fois par tour, une tuile retournée peut revenir face visible à la condition indiquée dessus, puis resservir.`],
 quiz:[{q:`Votre Réputation donne un malus de 2. Vous recrutez des Voyous. Que devient ce malus ?`,o:[`Il reste de 2`,`Il devient un bonus de 2`,`Il est doublé`],a:1,why:`Les Voyous inversent l'effet de la Réputation pour toute l'interaction.`},
  {q:`Vous assiégez une Forteresse avec une Unité de Héros. Peuvent-ils attaquer ?`,o:[`Oui, normalement`,`Oui, si vous payez 2 Influence pendant le combat`,`Jamais`],a:1,why:`Sans cette Influence, ils peuvent seulement encaisser.`}]},
{t:'Volkare',h:'La Légion Oubliée : affronter Volkare',rules:[
 `Volkare remplace le joueur Fantôme dans ses scénarios. Sa figurine se déplace sans tenir compte des terrains, des Remparts ni des sites, et ne provoque pas les ennemis errants.`,
 `Son armée dépend du niveau réglé sur la base de sa figurine, de 4 à 15. Au-delà, on règle la moitié du niveau et on double les jetons.`,
 `Le combattre, c'est affronter tous ses jetons à la fois, en quatre phases ordinaires. Ses troupes ne sont pas Fortifiées, sauf dans un site fortifié ou à travers un Rempart.`,
 `Avant le combat, son dé désigne l'attaque qu'il porte lui-même. Elle est toujours Brutale et Assassin : parez-la, ou votre Héros l'encaisse seul.`,
 `Volkare ne peut pas être ciblé et il est immunisé aux Arcanes. Il est vaincu quand toutes ses troupes le sont ; les éliminer toutes dès la première phase évite son attaque.`,
 `S'il vous attaque, vous choisissez : battre en retraite contre 2, 3 ou 4 Blessures selon que l'on est au premier, deuxième ou troisième couple Jour/Nuit, ou combattre.`,
 `Vous pouvez aussi lui donner l'assaut depuis une case adjacente, seul ou à plusieurs, sans perdre de Réputation. Si vous ne le battez pas, vous retournez à votre case.`],
 quiz:[{q:`Volkare tire son attaque au dé. Pouvez-vous assigner ses Dégâts à une Unité ?`,o:[`Oui`,`Non : son attaque est Assassin`,`Oui, si elle résiste au type de l'attaque`],a:1,why:`Toutes ses attaques sont Brutales et Assassin.`},
  {q:`Comment vaincre Volkare ?`,o:[`En battant l'Armure de son jeton`,`En éliminant toutes ses troupes`,`En le parant deux fois`],a:1,why:`Il ne peut pas être pris pour cible.`}]},
{t:'Tezla : Factions',h:'Les Ombres de Tezla : Factions et nouvelles capacités',rules:[
 `Deux Factions : les Élémentalistes et les Sombres Croisés. Leurs jetons verts, marron et rouges portent le symbole de leur Faction. Certains scénarios demandent de les trier en piles séparées.`,
 `Faction au hasard : lancez un dé de mana. Or, vert ou blanc : Élémentalistes. Noir, bleu ou rouge : Sombres Croisés.`,
 `Jeton Faction : vaincre un ennemi de Faction rapporte un objet mineur de la pile de cette Faction. Il s'utilise pendant votre tour, un seul du même nom par tour, puis il est défaussé. Lors d'une interaction, on peut le défausser pour 1 Gloire ou 3 Influence. Inutilisé, il vaut 1 Gloire en fin de partie.`,
 `Défense : le premier ennemi que vous attaquez ajoute la valeur de Défense à son Armure jusqu'à la fin du combat. Avec plusieurs défenseurs, chaque Défense protège un jeton différent. Un défenseur vaincu avant d'avoir servi ne protège personne.`,
 `Vampire : son Armure augmente de 1, pour tout le combat, par Unité qu'il blesse et par Blessure que son attaque met dans votre main.`,
 `Embuscade : l'ennemi errant vous attaque jusqu'à 2 cases. Vous le provoquez en passant d'une case située à 1 ou 2 cases de lui à une autre située à 1 ou 2 cases de lui. Il faut que l'arrivée soit adjacente, ou que la case intermédiaire soit révélée, sans lac ni montagne, et qu'aucun Rempart ne vous sépare. Pour le défier, il faut toujours être adjacent.`,
 `Poursuite : quand le Héros poursuivi a fini son Mouvement, le jeton avance d'une case vers lui, lacs et montagnes compris. S'il était déjà adjacent, il attaque : c'est votre action du tour, même si vous vouliez vous Reposer. Il n'attaque pas un Héros situé dans un lieu d'interaction ou dans un site fortifié qu'il n'assiège pas.`],
 quiz:[{q:`Des Protecteurs (Armure 4, Défense 2) sont seuls. Quelle Attaque faut-il ?`,o:[`4`,`6`,`8`],a:1,why:`Seuls, ils se protègent eux-mêmes : 4 + 2.`},
  {q:`Un Vampire d'Armure 5 vous inflige 2 Blessures. Quelle est son Armure en phase d'Attaque ?`,o:[`5`,`6`,`7`],a:2,why:`+1 par Blessure ajoutée à votre main.`},
  {q:`Votre dé de Faction donne bleu.`,o:[`Élémentalistes`,`Sombres Croisés`,`On relance`],a:1,why:`Noir, bleu ou rouge désignent les Sombres Croisés.`}]},
{t:'Tezla : Chefs',h:'Les Ombres de Tezla : lieux et Chefs de Faction',rules:[
 `Vallée Oubliée : fonctionne comme une Clairière Magique ; y entrer coûte 2.`,
 `Nécropole et Cimetières : les règles de Nuit s'y appliquent en plein Jour, et commencer son tour dessus pendant la Nuit donne un jeton de mana noir. La Nécropole coûte 2 ; un Cimetière coûte le terrain qu'il recouvre.`,
 `Chef de Faction : un grand jeton à niveaux. Son niveau de départ, fixé par le scénario, donne son Armure, son Attaque et le nombre de jetons de sa Faction qui l'accompagnent. Il est immunisé aux Arcanes.`,
 `L'attaquer : toutes vos Attaques contre lui forment une seule attaque. Si elle égale son Armure, posez un Bouclier sur son niveau actuel ; chaque multiple de son Armure retire un niveau de plus.`,
 `Il attaque comme tout ennemi, selon son niveau au début du combat. Son marqueur ne descend qu'à la fin du combat, jusqu'au premier rang sans Bouclier. Un Bouclier sur le niveau 1 : il est vaincu.`,
 `Ses compagnons ne reviennent pas quand son niveau baisse. Le vaincre rapporte la Gloire indiquée, mais pas de jeton Faction.`,
 `À plusieurs, on l'assaille comme une Cité : répartition des ennemis, chacun entre sur sa case et combat sa part, et tous subissent son attaque.`,
 `Départ à haut niveau : le Héros commence avec ses Compétences et jetons Commandement, 2 Cristaux, une Action Avancée gratuite par niveau impair au-delà du premier, et 6 Influence par niveau pour acheter parmi des cartes piochées (Action Avancée 6, Unité à son coût, Sort 9 ou 7 plus un Cristal de sa couleur, Artefact 12, Cristal 3).`],
 quiz:[{q:`Un Chef a 5 d'Armure. Votre attaque unique vaut 11. De combien de niveaux baisse-t-il ?`,o:[`1`,`2`,`3`],a:1,why:`Un niveau par multiple de son Armure : 10 suffit pour deux, 15 pour trois.`},
  {q:`Vous retirez un niveau au Chef en phase à Distance. Avec quelles valeurs attaque-t-il en phase de Parade ?`,o:[`Celles du nouveau niveau`,`Celles du niveau de début de combat`,`Il n'attaque plus`],a:1,why:`Le marqueur ne bouge qu'à la fin du combat.`}]}
);

const TP=n=>TOPICS.concat(NEWT).find(x=>x.t===n);
const PARTS=[['Les bases',['But du jeu','Les cartes','Le mana','Le tour','Mouvement','Interaction','Le combat','Blessures']],
 ['Progresser',['Niveaux','La Manche','Jour et Nuit','Unités']],
 ['Combats avancés',['Éléments','Capacités','Plusieurs ennemis','Sorts','Artefacts']],
 ['Le monde',['Sites habités','Aventures','Cités']],
 ['À plusieurs et en solo',['Joueur contre Joueur','Coopération','Solo et score']],
 ['Extensions',['Légion : sites','Légion : ennemis','Légion : Unités','Volkare','Tezla : Factions','Tezla : Chefs']],
 ['Annexe',['Glossaire']]];
const COURSE=[];PARTS.forEach(([p,l])=>l.forEach(n=>{const t=TP(n);t.part=p;COURSE.push(t)}));
TP('Mouvement').rules.unshift(`Entrer sur une case coûte des points de Mouvement selon son terrain ; le tableau figure dans l'onglet Aide-mémoire. Les points non dépensés sont perdus en fin de tour.`);