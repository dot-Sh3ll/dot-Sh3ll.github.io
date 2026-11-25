
/* ---------- contenu des chapitres ----------
   rules : un point de règle par ligne. lab : atelier interactif (voir LABS). cas : mises en situation. quiz : vérification. */
const CH=[
/* ======================= DÉCOUVRIR ======================= */
{id:'but',part:'Découvrir',t:'Le but du jeu',
lead:`Puerto Rico 1897 vous met à la tête d'une exploitation agricole. Vous plantez, vous recrutez, vous produisez, vous vendez et vous expédiez. Celui qui a le plus de points de victoire (PV) à la fin l'emporte.`,
rules:[
`À votre tour, vous <b>choisissez un personnage</b> (Paysan, Bâtisseur, Recruteur, Producteur, Marchand, Capitaine ou Aventurier). Tout le monde fait l'action de ce personnage, mais vous seul profitez de son <b>privilège</b>.`,
`La partie dure environ 15 tours (des « années »). Elle s'arrête à la fin d'un tour, quand l'une des trois conditions de fin est remplie.`,
`Les PV viennent de trois sources : les <b>jetons PV</b> gagnés en expédiant des marchandises, les <b>PV imprimés sur vos bâtiments</b>, et les <b>bonus des grands bâtiments</b> occupés.`,
`Votre <b>plateau Domaine</b> a 12 cases <b>Parcelles</b> en haut (plantations et Carrières) et 12 cases <b>Ville</b> en bas (bâtiments). Le <b>Portrait</b> accueille vos Pesos, vos barils et les ouvriers qui n'ont pas de place.`,
`Pesos et barils restent visibles de tous. Les jetons PV peuvent être posés face cachée.`,
`Chaque tuile porte 1 à 3 <b>demi-cercles</b>. Un demi-cercle accueille exactement 1 ouvrier. Une tuile avec au moins 1 ouvrier est <b>occupée</b>, et seules les tuiles occupées fonctionnent.`
],
html:`<h2>Les cinq marchandises</h2>
<div class="tw"><table><tr><th>Marchandise</th><th>Pour la produire</th><th class="c">Prix de vente</th></tr>
<tr><td>${G.c}</td><td>Une plantation de Maïs occupée suffit, sans bâtiment.</td><td class="c">0</td></tr>
<tr><td>${G.f}</td><td>Plantation de Fruits occupée + place occupée dans une Exploitation de Fruits.</td><td class="c">1</td></tr>
<tr><td>${G.s}</td><td>Plantation de Sucre occupée + place occupée dans une Raffinerie de Sucre.</td><td class="c">2</td></tr>
<tr><td>${G.t}</td><td>Plantation de Tabac occupée + place occupée dans le Séchoir à Tabac.</td><td class="c">3</td></tr>
<tr><td>${G.k}</td><td>Plantation de Café occupée + place occupée dans la Brûlerie de Café.</td><td class="c">4</td></tr></table></div>
`,
cas:[
{q:`Votre Séchoir à Tabac est construit mais personne n'y travaille. Votre plantation de Tabac, elle, a son ouvrier. Que produisez-vous en Tabac ?`,o:[`1 baril : la plantation est occupée`,`Rien : le Séchoir n'est pas occupé, il ne fonctionne pas`,`1 baril, mais seulement si vous êtes le Producteur`],a:1,w:`Une tuile ne fonctionne que si elle est occupée. Pour le Tabac, il faut à la fois la plantation occupée et un ouvrier dans le Séchoir.`},
{q:`Un adversaire pose ses jetons PV face cachée sur son Portrait. Peut-il faire de même avec ses Pesos ?`,o:[`Oui, tout peut se cacher`,`Non : Pesos et barils restent visibles, seuls les PV peuvent être cachés`],a:1,w:`Le livret précise que Pesos et marchandises restent visibles de tous. Seuls les jetons PV peuvent être retournés.`}
],
quiz:[
{q:`Quand vous choisissez un personnage, qui profite de son privilège ?`,o:[`Tous les joueurs`,`Vous seul`,`Le Gouverneur`],a:1,w:`Tout le monde fait l'action, seul celui qui a pris la carte reçoit le privilège.`},
{q:`Combien d'ouvriers peut-on poser sur un demi-cercle ?`,o:[`1`,`2`,`Autant qu'on veut`],a:0,w:`Exactement 1 ouvrier par demi-cercle.`},
{q:`Quelle marchandise se produit sans bâtiment ?`,o:[`Le Fruit`,`Le Maïs`,`Le Café`],a:1,w:`Chaque plantation de Maïs occupée donne directement 1 baril.`}
]},

{id:'mep',part:'Découvrir',t:'La mise en place',
lead:`Presque tout dépend du nombre de joueurs. L'atelier vous donne la liste complète pour votre table.`,
rules:[
`Plateau central au milieu : les 49 bâtiments empilés sur leurs cases, les 51 Pesos forment la <b>Banque</b>.`,
`Le premier joueur reçoit la carte <b>Gouverneur</b>.`,
`Chaque joueur reçoit un plateau Domaine et des Pesos : <b>une de moins que le nombre de joueurs</b> (2 à 3 joueurs, 3 à 4, 4 à 5), posées sur le Portrait.`,
`Plantation de départ, en partant du Gouverneur dans le sens horaire : à 3 joueurs Fruits, Fruits, Maïs ; à 4 Fruits, Fruits, Maïs, Maïs ; à 5 Fruits, Fruits, Fruits, Maïs, Maïs. Elle se pose face visible sur une case Parcelle, <b>sans ouvrier</b>.`,
`Les 8 Carrières forment une pile face visible. Les autres plantations sont mélangées en piles face cachée, et on en révèle <b>une de plus que le nombre de joueurs</b>.`,
`Vérifiez vos plantations : il y a <b>12 Fruits et 8 Cafés</b>. Certaines boîtes du premier tirage contiennent 16 Fruits et 4 Cafés ; Ravensburger fournit les tuiles correctes sur demande.`,
`Le Registre du Personnel reçoit <b>autant d'ouvriers que de joueurs</b>. Le reste de la réserve d'ouvriers, des jetons PV, des personnages et des navires dépend du nombre de joueurs (voir l'atelier).`,
`Les 50 barils sont triés par couleur, la Maison de Commerce est posée vide. Le matériel inutilisé retourne dans la boîte.`
],
lab:'setup',
cas:[
{q:`Partie à 4. Vous êtes le 3e joueur en partant du Gouverneur. Quelle plantation prenez-vous ?`,o:[`Fruits`,`Maïs`,`Celle que vous voulez parmi les plantations visibles`],a:1,w:`À 4 joueurs, les 1er et 2e prennent des Fruits, les 3e et 4e du Maïs.`},
{q:`Partie à 3. Un joueur sort les deux Aventuriers. Que lui répondez-vous ?`,o:[`On les garde, ça fait plus de choix`,`À 3 joueurs on joue avec 6 personnages, sans aucun Aventurier`,`On en garde un seul`],a:1,w:`3 joueurs : 6 personnages, 4 joueurs : 7 (1 Aventurier), 5 joueurs : les 8.`}
],
quiz:[
{q:`Partie à 5 : combien de Pesos au départ pour chacun ?`,o:[`3`,`4`,`5`],a:1,w:`Une de moins que le nombre de joueurs.`},
{q:`Partie à 4 : quels navires utilise-t-on ?`,o:[`4, 5 et 6 cales`,`5, 6 et 7 cales`,`6, 7 et 8 cales`],a:1,w:`3 joueurs : 4-5-6 ; 4 joueurs : 5-6-7 ; 5 joueurs : 6-7-8.`},
{q:`Combien de plantations révèle-t-on face visible à 3 joueurs ?`,o:[`3`,`4`,`5`],a:1,w:`Toujours une de plus que le nombre de joueurs.`}
]},

{id:'tour',part:'Découvrir',t:'Un tour : personnages et Gouverneur',
lead:`Le cœur du jeu tient en une règle : choisir un personnage, c'est déclencher une phase pour tout le monde. L'atelier vous fait jouer un tour entier.`,
rules:[
`Le <b>Gouverneur</b> choisit une carte Personnage, la pose devant lui, fait l'action <b>avec le privilège</b>. Puis chaque autre joueur, dans le sens horaire, fait la même action <b>sans le privilège</b>.`,
`Ensuite le joueur à gauche du Gouverneur choisit un des personnages restants, et ainsi de suite. Chaque joueur choisit <b>un personnage par tour</b> (trois à deux joueurs).`,
`Choisir un personnage est obligatoire. Faire l'action est facultatif, sauf pour le Capitaine. Qui ne peut pas ou ne veut pas agir est simplement sauté.`,
`Celui qui a choisi le personnage agit <b>toujours en premier</b>, avant les autres.`,
`Un personnage choisi reste devant son joueur jusqu'à la fin du tour : personne d'autre ne peut le prendre ce tour-là.`,
`Si une carte Personnage porte des Pesos, celui qui la choisit les empoche.`,
`Fin de tour : le Gouverneur pose <b>1 Peso de la Banque sur chaque personnage non choisi</b>, tout le monde rend sa carte, et la carte Gouverneur passe au joueur de gauche.`
],
lab:'round',
cas:[
{q:`Vous êtes le 2e joueur à choisir. Le Gouverneur a pris le Producteur, vous prenez le Capitaine. Qui charge en premier ?`,o:[`Le Gouverneur, il a commencé le tour`,`Vous : celui qui choisit le personnage agit toujours en premier`,`Le joueur à votre gauche`],a:1,w:`Chaque phase commence par le joueur qui a pris la carte, puis tourne dans le sens horaire.`},
{q:`Le Marchand porte 2 Pesos depuis deux tours. Vous n'avez rien à vendre. Le prenez-vous quand même ?`,o:[`Impossible : il faut pouvoir faire l'action`,`Oui, c'est permis : vous prenez les 2 Pesos et vous pouvez ne rien vendre`],a:1,w:`L'action est facultative (sauf Capitaine). Prendre un personnage « pour l'argent » est un coup courant.`}
],
quiz:[
{q:`À 4 joueurs (7 personnages), combien de Pesos le Gouverneur pose-t-il en fin de tour ?`,o:[`1`,`3`,`4`],a:1,w:`7 personnages, 4 choisis : 3 personnages restants, 1 Peso sur chacun.`},
{q:`Qui devient Gouverneur au tour suivant ?`,o:[`Celui qui a le moins de PV`,`Le joueur à gauche du Gouverneur actuel`,`Celui qui a pris le Capitaine`],a:1,w:`La carte passe simplement à gauche.`},
{q:`Pouvez-vous reprendre un personnage qu'un autre joueur a déjà choisi dans le même tour ?`,o:[`Oui`,`Non`],a:1,w:`La carte reste devant lui jusqu'à la fin du tour.`}
]},

/* ======================= LES RÔLES ======================= */
{id:'paysan',part:'Les personnages',t:'Le Paysan',
lead:`Développer les Parcelles : une nouvelle plantation pour chacun, une Carrière pour le Paysan s'il le veut.`,
rules:[
`Le Paysan prend <b>une Carrière ou une des plantations face visible</b> et la pose sur une case Parcelle vide (privilège : la Carrière).`,
`Puis chacun, dans le sens horaire, prend une des plantations visibles restantes. Les autres joueurs ne peuvent pas prendre de Carrière, sauf avec un <b>Dépôt de Matériaux</b> occupé.`,
`La nouvelle tuile arrive <b>sans ouvrier</b> (sauf avec un Hôpital occupé). Elle ne produira qu'une fois occupée, lors d'une phase du Recruteur.`,
`Quand tout le monde a joué, le Paysan <b>défausse les plantations visibles restantes</b> et en révèle de nouvelles : une de plus que le nombre de joueurs.`,
`Si les piles sont vides, on mélange la défausse pour en refaire. S'il n'y a plus rien du tout, l'action devient impossible.`,
`Une tuile posée peut être déplacée mais jamais retirée. Sa position n'a aucune importance.`,
`Parcelles toutes occupées (12 tuiles) : vous ne pouvez plus faire l'action Paysan. Plus de Carrière : le Paysan perd son privilège et le Dépôt de Matériaux ne sert plus.`
],
html:`<div class="note"><b>Bâtiments liés.</b> ${bn('hac')} (une plantation face cachée en plus), ${bn('byd')} (Carrière pour tout le monde), ${bn('hos')} (un ouvrier offert sur la tuile posée). Détails au chapitre des petits bâtiments.</div>`,
lab:'plant',
cas:[
{q:`Vous n'êtes pas le Paysan, vous n'avez pas de Dépôt de Matériaux. Il reste une Carrière et deux plantations de Maïs visibles. Que pouvez-vous prendre ?`,o:[`La Carrière`,`Une plantation de Maïs`,`Rien, les Carrières sont réservées`],a:1,w:`Sans Dépôt de Matériaux occupé, les autres joueurs ne prennent que des plantations face visible.`},
{q:`Vos 12 cases Parcelle sont occupées. Un adversaire prend le Paysan.`,o:[`Vous prenez quand même une plantation et vous en défaussez une`,`Vous passez : des Parcelles toutes occupées interdisent l'action`,`Vous posez la plantation sur une case Ville`],a:1,w:`On ne retire jamais une tuile, et il n'y a que 12 cases Parcelle.`},
{q:`Vous êtes le Paysan et vous prenez une plantation de Café. Produira-t-elle à la prochaine phase du Producteur ?`,o:[`Oui, automatiquement`,`Seulement si un ouvrier y est posé d'ici là, en phase du Recruteur`],a:1,w:`Les ouvriers ne se posent qu'en phase du Recruteur (sauf Hôpital, École).`}
],
quiz:[
{q:`À la fin de la phase du Paysan à 4 joueurs, combien de plantations se retrouvent face visible ?`,o:[`4`,`5`,`Celles qui restaient, plus une`],a:1,w:`On défausse les restantes et on en révèle une de plus que le nombre de joueurs.`},
{q:`Qui renouvelle les plantations visibles ?`,o:[`Le Gouverneur`,`Le Paysan`,`Le dernier joueur à avoir pioché`],a:1,w:`C'est le Paysan, une fois que tout le monde a joué.`}
]},

{id:'recruteur',part:'Les personnages',t:'Le Recruteur',
lead:`Recruter des ouvriers, puis les poser ou les réorganiser. C'est le seul moment où les ouvriers bougent.`,
rules:[
`Le Recruteur prend d'abord <b>1 ouvrier de la réserve</b> (privilège ; pas du Registre).`,
`Puis, en partant du Recruteur et dans le sens horaire, chacun prend <b>1 ouvrier du Registre à tour de rôle</b>, jusqu'à ce qu'il soit vide. Les joueurs peuvent donc en recevoir des nombres différents.`,
`Chacun pose ses ouvriers (nouveaux ou anciens) sur des demi-cercles vides de plantations, Carrières ou bâtiments. Vous pouvez aussi <b>déplacer librement</b> les ouvriers déjà posés.`,
`Un ouvrier ne va sur le Portrait <b>que si plus aucun demi-cercle n'est libre</b> sur votre domaine. Il attendra la prochaine phase du Recruteur.`,
`On place dans le sens horaire à partir du Recruteur, ou tous en même temps si tout le monde est d'accord.`,
`Fin de phase : le Recruteur remplit le Registre avec autant d'ouvriers qu'il y a de <b>demi-cercles vides sur les bâtiments</b> de tous les joueurs (pas sur les plantations ni les Carrières), avec <b>au minimum le nombre de joueurs</b>.`,
`Si la réserve ne suffit pas à remplir le Registre, la partie s'achèvera à la fin du tour. Si la réserve est vide, le Recruteur perd son privilège.`
],
html:`<div class="ex"><b>Exemple du livret (4 joueurs).</b> 6 ouvriers sur le Registre. Le Recruteur prend 1 ouvrier de la réserve, puis le Registre se distribue : Recruteur, 2e, 3e, 4e, Recruteur, 2e. Bilan : 3 ouvriers pour le Recruteur (dont celui de la réserve), 2 pour le 2e joueur, 1 pour le 3e et le 4e.</div>`,
lab:'recruit',
cas:[
{q:`Vous avez 2 ouvriers à poser. Il vous reste un demi-cercle libre sur votre plantation de Maïs et aucun autre. Où va le second ?`,o:[`Sur le Portrait`,`Vous devez libérer un demi-cercle en déplaçant un ouvrier`,`Il retourne à la réserve`],a:0,w:`Le Portrait sert quand tous les demi-cercles sont pris. Vous pourriez aussi déplacer d'autres ouvriers, mais ça ne crée pas de place en plus.`},
{q:`En pleine phase du Producteur, vous voudriez déplacer un ouvrier de votre plantation de Maïs vers votre Brûlerie de Café.`,o:[`Permis à tout moment`,`Interdit : les ouvriers ne bougent qu'en phase du Recruteur`],a:1,w:`Exception : le Bohio de l'extension I.`},
{q:`Fin de la phase, 4 joueurs. Il n'y a que 2 demi-cercles vides sur tous les bâtiments réunis. Combien d'ouvriers vont sur le Registre ?`,o:[`2`,`4`,`0`],a:1,w:`Au minimum autant que de joueurs.`}
],
quiz:[
{q:`D'où vient l'ouvrier du privilège du Recruteur ?`,o:[`Du Registre`,`De la réserve`],a:1,w:`Il est pris dans la réserve, avant la distribution du Registre.`},
{q:`Que compte-t-on pour remplir le Registre ?`,o:[`Les demi-cercles vides sur les bâtiments`,`Les demi-cercles vides partout`,`Les ouvriers sur les Portraits`],a:0,w:`Seuls les bâtiments, pas les plantations ni les Carrières.`}
]},

{id:'batisseur',part:'Les personnages',t:'Le Bâtisseur',
lead:`Un bâtiment par joueur, payé à la Banque. Le Bâtisseur paie 1 Peso de moins, et les Carrières occupées font baisser les prix.`,
rules:[
`Le Bâtisseur peut acheter <b>1 bâtiment</b> et le paie <b>1 Peso de moins</b> que son coût. Puis chacun, dans le sens horaire, peut en acheter 1 au prix normal.`,
`Le bâtiment se pose sur une case Ville vide. Un <b>grand bâtiment</b> occupe 2 cases adjacentes, mais compte comme un seul bâtiment.`,
`Vous ne pouvez pas avoir <b>deux fois le même bâtiment</b>.`,
`Chaque <b>Carrière occupée</b> réduit le prix d'1 Peso, avec un plafond selon la rangée du plateau : 1 Carrière au plus dans la 1re rangée, 2 dans la 2e, 3 dans la 3e, 4 pour les grands bâtiments.`,
`Les réductions se cumulent (privilège, Carrières…). Un bâtiment ne coûte jamais moins de 0.`,
`Le nouveau bâtiment arrive <b>sans ouvrier</b> (sauf avec une École occupée).`,
`Si le Bâtisseur ne construit rien, il ne reçoit rien pour son privilège. Ville pleine : plus d'action Bâtisseur. Il est impossible de poser un grand bâtiment s'il ne reste qu'une case.`,
`Remplir ses 12 cases Ville déclenche la fin de partie (à la fin du tour).`
],
html:`<div class="ex"><b>Exemple du livret.</b> Avec 3 Carrières occupées, on paie : Dépôt de Matériaux 1 (2 − 1), Comptoir 3 (5 − 2), Port 5 (8 − 3), Palais du Gouverneur 7 (10 − 3). Avec le privilège du Bâtisseur, encore 1 de moins.</div>`,
lab:'build',
cas:[
{q:`Vous êtes le Bâtisseur, vous avez 2 Carrières occupées et vous voulez le Petit Marché (coût 1). Combien payez-vous ?`,o:[`0`,`−2, la Banque vous rend de l'argent`,`1`],a:0,w:`1 − 1 (Carrière, plafonnée à 1 en 1re rangée) − 1 (privilège) = 0 au plancher.`},
{q:`Vous avez déjà un Petit Marché. Il en reste un sur le plateau. Pouvez-vous l'acheter ?`,o:[`Oui, ses effets se cumulent`,`Non : jamais deux fois le même bâtiment`],a:1,w:`Chaque bâtiment ne peut être construit qu'une fois par joueur.`},
{q:`Il vous reste une seule case Ville libre et 10 Pesos. Que pouvez-vous construire ?`,o:[`Un grand bâtiment`,`Un petit bâtiment ou un bâtiment industriel`,`Rien`],a:1,w:`Un grand bâtiment exige 2 cases adjacentes libres.`}
],
quiz:[
{q:`4 Carrières occupées, vous achetez le Grand Entrepôt (coût 6, 2e rangée), sans être Bâtisseur.`,o:[`2`,`4`,`5`],a:1,w:`Plafond de 2 Carrières en 2e rangée : 6 − 2 = 4.`},
{q:`Que coûte le Palais du Gouverneur avec 4 Carrières occupées et le privilège du Bâtisseur ?`,o:[`5`,`6`,`7`],a:0,w:`10 − 4 − 1 = 5.`}
]},

{id:'producteur',part:'Les personnages',t:'Le Producteur',
lead:`Tout le monde produit. C'est le personnage le plus risqué : il aide souvent davantage les autres que celui qui le prend.`,
rules:[
`Le Producteur produit en premier, puis chacun dans le sens horaire. Les barils vont sur le Portrait.`,
`${G.c} : 1 baril par plantation de Maïs <b>occupée</b>.`,
`${G.f}, ${G.s}, ${G.t}, ${G.k} : 1 baril par plantation occupée qui a un <b>ouvrier correspondant dans un bâtiment industriel</b> du même type. En pratique : le plus petit des deux nombres.`,
`Chaque demi-cercle de bâtiment industriel traite 1 baril : Petite Exploitation de Fruits et Petite Raffinerie de Sucre 1, Grande Exploitation de Fruits et Grande Raffinerie de Sucre 3, Séchoir 3, Brûlerie de Café 2.`,
`Privilège : une fois que tout le monde a produit, le Producteur prend <b>1 baril de plus</b> d'une marchandise qu'il a produite pendant cette phase. S'il n'a rien produit, pas de privilège.`,
`Si la réserve d'une marchandise est épuisée, les joueurs suivants n'en reçoivent plus. L'ordre de production compte donc.`,
`Bâtiment lié : ${bn('fac')}, qui rapporte des Pesos selon le nombre de types produits.`
],
html:`<div class="ex"><b>Exemple du livret.</b> 3 plantations de Maïs dont 2 occupées : 2 Maïs. Séchoir avec 1 ouvrier sur 2 placés pour 2 plantations de Tabac occupées : 1 Tabac. 4 plantations de Sucre dont 3 occupées, Grande Raffinerie de Sucre pleine : 3 Sucre.</div>`,
lab:'prod',
cas:[
{q:`Vous avez 3 plantations de Fruits occupées et une Petite Exploitation de Fruits occupée. Combien de Fruits ?`,o:[`3`,`1`,`0`],a:1,w:`La Petite Exploitation de Fruits n'a qu'un demi-cercle : 1 baril au plus.`},
{q:`Vous produiriez 1 Maïs, vos adversaires 3 Café et 4 Sucre. Le Capitaine et le Marchand sont encore libres. Prenez-vous le Producteur ?`,o:[`Oui, la production c'est toujours bon`,`Plutôt non : vous donneriez beaucoup plus aux autres qu'à vous`],a:1,w:`Le livret le rappelle : le Producteur est le personnage le plus risqué.`},
{q:`Vous êtes le Producteur et vous avez produit 2 Maïs et 1 Tabac. Quel baril bonus prenez-vous ?`,o:[`Un Café, le plus cher`,`Un Maïs ou un Tabac, au choix`,`Aucun : il faut avoir produit 3 types`],a:1,w:`Le baril bonus est d'une marchandise produite pendant la phase.`}
],
quiz:[
{q:`2 plantations de Sucre occupées, Grande Raffinerie de Sucre avec 3 ouvriers. Production de Sucre ?`,o:[`2`,`3`,`5`],a:0,w:`Le plus petit des deux : 2 plantations occupées.`},
{q:`Quand le Producteur prend-il son baril bonus ?`,o:[`Avant de produire`,`Après que tous les joueurs ont produit`],a:1,w:`À la fin de la phase.`}
]},

{id:'marchand',part:'Les personnages',t:'Le Marchand',
lead:`Vendre un baril à la Maison de Commerce pour faire rentrer de l'argent. Quatre places, et pas de doublon.`,
rules:[
`Le Marchand peut vendre <b>1 baril</b> de son Portrait à la Maison de Commerce et reçoit son prix <b>+1 Peso</b> (privilège). Puis chacun, dans le sens horaire, peut vendre 1 baril au prix normal.`,
`Prix : ${G.c} 0, ${G.f} 1, ${G.s} 2, ${G.t} 3, ${G.k} 4.`,
`La Maison ne peut pas contenir deux barils du même type, sauf pour un joueur qui a un <b>Comptoir</b> occupé.`,
`La Maison n'a que <b>4 places</b>. Pleine, plus personne ne peut y vendre.`,
`Fin de phase : si la Maison est pleine, le Marchand la <b>vide</b> (barils à la réserve). Sinon, les barils restent pour la prochaine phase du Marchand.`,
`Vendre du Maïs pour 0 Peso est permis (utile avec le privilège ou un marché). Si le Marchand ne vend rien, il ne reçoit pas le Peso du privilège.`,
`Bâtiments liés : ${bn('smk')} (+1), ${bn('lmk')} (+2, +3 avec les deux), ${bn('off')}.`
],
lab:'trade',
cas:[
{q:`La Maison contient Sucre et Tabac. Vous avez 2 Tabac et 1 Maïs, sans bâtiment. Que vendez-vous ?`,o:[`1 Tabac pour 3 Pesos`,`1 Maïs pour 0 Peso, ou rien`,`2 Tabac`],a:1,w:`Le Tabac est déjà dans la Maison. Il ne reste que le Maïs (0 Peso), et un seul baril de toute façon.`},
{q:`La Maison est vide. Vous êtes Marchand avec un Petit et un Grand Marché occupés. Vous vendez 1 Café.`,o:[`5 Pesos`,`7 Pesos`,`8 Pesos`],a:2,w:`4 (Café) + 1 (privilège) + 3 (les deux marchés) = 8.`},
{q:`Fin de la phase : la Maison contient 3 barils. Qu'en fait-on ?`,o:[`On la vide`,`Ils restent pour la prochaine fois`],a:1,w:`On ne la vide que si elle est pleine (4 barils).`}
],
quiz:[
{q:`Combien de barils chaque joueur peut-il vendre par phase du Marchand ?`,o:[`1`,`Autant qu'il y a de places`,`1 par type`],a:0,w:`Un seul baril, Comptoir ou non.`},
{q:`Vous avez un Comptoir occupé. La Maison contient 4 barils dont un Sucre. Pouvez-vous vendre un Sucre ?`,o:[`Oui, grâce au Comptoir`,`Non : la Maison est pleine`],a:1,w:`Le Comptoir lève l'interdiction des doublons, pas la limite de 4 places.`}
]},

{id:'capitaine',part:'Les personnages',t:'Le Capitaine : charger les navires',
lead:`La phase la plus encadrée du jeu. Charger rapporte des PV, et c'est <b>obligatoire</b> dès qu'on peut. L'atelier vous fait jouer des phases complètes : le simulateur refuse les chargements illégaux et vous explique pourquoi.`,
rules:[
`Le Capitaine charge en premier, puis chacun dans le sens horaire, et <b>ça tourne plusieurs fois</b> jusqu'à ce que plus personne ne puisse charger.`,
`À votre tour, si vous pouvez charger, <b>vous devez charger</b>. Vous choisissez librement le type, mais <b>un seul type</b> par tour.`,
`Un navire ne transporte <b>qu'un type</b> de marchandise, et <b>deux navires ne transportent jamais le même type</b>.`,
`Si vous chargez un type qui n'est sur aucun navire et que plusieurs navires sont vides, vous devez prendre <b>celui qui vous permet de charger le plus de barils</b>. Si plusieurs navires vides permettent le même chargement, vous choisissez.`,
`Vous chargez <b>le maximum possible</b> de ce type : pas question de garder des barils s'il reste de la place.`,
`Un navire plein n'accepte plus rien.`,
`<b>1 PV par baril chargé.</b> Privilège : le Capitaine gagne <b>1 PV de plus, une seule fois</b> dans la phase, s'il a chargé au moins 1 baril.`,
`Si les jetons PV sont épuisés, on note la suite sur papier et la partie s'achèvera à la fin du tour.`
],
lab:'ship',
cas:[
{q:`Navires de 5 et 7 cales vides, celui de 6 porte 3 Maïs. Vous avez 2 Maïs et 6 Sucre. Où peut aller votre Sucre ?`,o:[`Sur le navire de 5 ou de 7, au choix`,`Sur le navire de 7 : c'est là qu'elle charge le plus de barils`,`Sur le navire de 6`],a:1,w:`Exemple du livret : sur le 7, Anne charge ses 6 Sucres, sur le 5 seulement 5. Le plus gros chargement est obligatoire.`},
{q:`Navires de 5 et 7 vides. Vous avez 2 Café. Où les chargez-vous ?`,o:[`Obligatoirement sur le 7`,`Sur l'un ou l'autre : vous chargez 2 barils dans les deux cas`],a:1,w:`La règle impose le navire qui permet de charger le plus. Ici les deux en prennent 2 : choix libre. (Le livret français dit « le plus grand navire » : à trancher avant la partie si un joueur a appris cette version.)`},
{q:`Le navire de Tabac est plein. Le navire de 5 est vide. Vous n'avez que du Tabac.`,o:[`Vous le chargez sur le navire de 5`,`Vous ne pouvez pas charger : le Tabac a déjà son navire`],a:1,w:`Deux navires ne peuvent pas porter le même type, même si le premier est plein.`},
{q:`Vous préféreriez garder votre Café pour le vendre. Le navire de Café a 2 places libres.`,o:[`Vous pouvez passer votre tour`,`Si c'est votre seule marchandise chargeable, vous devez charger`],a:1,w:`Le chargement est obligatoire. Vous pouvez seulement choisir un autre type si vous en avez un qui peut aussi être chargé.`}
],
quiz:[
{q:`Le Capitaine charge à trois reprises dans la phase. Combien de PV bonus reçoit-il ?`,o:[`1`,`3`,`0`],a:0,w:`Le privilège ne compte qu'une fois par phase.`},
{q:`Un joueur peut-il charger deux types différents dans le même tour ?`,o:[`Oui, s'il y a deux navires`,`Non, un seul type par tour`],a:1,w:`Un type par tour. Il chargera peut-être l'autre au tour suivant de la rotation.`}
]},

{id:'stockage',part:'Les personnages',t:'Le Capitaine : stocker et vider',
lead:`À la fin de la phase, chacun ne garde presque rien. Les entrepôts changent tout.`,
rules:[
`Quand plus personne ne peut charger, chaque joueur <b>garde 1 seul baril</b> de son choix sur son Portrait. Les autres retournent à la réserve.`,
`${bn('swh')} : vous gardez en plus <b>tous les barils d'1 type</b>. ${bn('lwh')} : de <b>2 types</b>. Les deux : <b>3 types</b>. Toujours en plus du baril habituel.`,
`On ne vérifie le stockage qu'à cet instant : en dehors de la fin de la phase du Capitaine, vous pouvez avoir autant de barils que vous voulez.`,
`Un entrepôt ne dispense jamais de charger : on charge d'abord, on stocke ensuite.`,
`Le Capitaine <b>vide les navires pleins</b> (barils à la réserve). Les navires partiellement remplis <b>gardent leur cargaison</b> pour la prochaine phase, avec leur type déjà fixé.`,
`${bn('har')} : +1 PV à chaque chargement. ${bn('wha')} : une fois par phase, tous vos barils d'1 type partent sur un navire privé sans limite, au même tarif de 1 PV par baril (barils à la réserve). Son utilisation est facultative.`
],
html:`<div class="ex"><b>Exemple du livret (Port + Chantier Naval).</b> 5 Tabac, mais le navire de Tabac n'a plus que 3 places : 3 + 1 PV. Tour suivant, 2 Sucre sur le navire de Sucre : 2 + 1 PV. Tour d'après, le Chantier Naval embarque les 2 Tabac restants : 2 + 1 PV. Le Port a rapporté 3 PV dans la phase.</div>`,
lab:'store',
cas:[
{q:`Il vous reste 3 Maïs, 2 Sucre, 1 Café, sans entrepôt. Que gardez-vous ?`,o:[`Les 3 Maïs`,`1 baril, par exemple le Café`,`1 baril de chaque type`],a:1,w:`Un seul baril au total. Garder le plus cher (Café) est souvent le bon réflexe.`},
{q:`Même situation avec un Petit Entrepôt occupé.`,o:[`2 Sucre + 1 Café`,`3 Maïs + 2 Sucre`,`3 Maïs + 1 Sucre + 1 Café`],a:0,w:`Tout un type (les 2 Sucre) + 1 baril (le Café). L'option 3 Maïs + 1 Café marche aussi ; deux types complets, non.`},
{q:`Le navire de 6 porte 4 Café en fin de phase. Que devient-il ?`,o:[`On le vide`,`Il garde ses 4 Café pour la prochaine phase`],a:1,w:`Seuls les navires pleins sont vidés.`}
],
quiz:[
{q:`Grand + Petit Entrepôt occupés : combien de types complets gardez-vous ?`,o:[`2`,`3`,`3, plus 1 baril`],a:2,w:`3 types complets, plus le baril que tout le monde garde.`},
{q:`Le Chantier Naval peut-il embarquer un type déjà présent sur un navire ?`,o:[`Oui`,`Non`],a:0,w:`Le navire privé accepte n'importe quel type, mais tous les barils de ce type.`}
]},

{id:'aventurier',part:'Les personnages',t:'L\'Aventurier',
lead:`Le personnage le plus simple : de l'argent, et rien pour les autres.`,
rules:[
`Celui qui choisit l'Aventurier prend <b>1 Peso de la Banque</b> (plus les Pesos posés sur la carte).`,
`Il n'y a pas d'action : les autres joueurs ne font rien.`,
`Il n'y en a aucun à 3 joueurs, 1 à 4 joueurs (et à 2), 2 à 5 joueurs.`,
`Il sert surtout à <b>refuser une phase</b> aux autres : prendre l'Aventurier, c'est aussi éviter de déclencher un personnage qui les avantagerait.`
],
cas:[
{q:`Il reste le Producteur, le Capitaine et l'Aventurier (2 Pesos dessus). Les autres ont plein de marchandises, vous aucune.`,o:[`Le Producteur`,`Le Capitaine`,`L'Aventurier`],a:2,w:`Vous prenez 3 Pesos et vous ne déclenchez ni production ni expédition pour les autres. (Un autre joueur pourra encore choisir l'un des deux.)`}
],
quiz:[
{q:`Que font les autres joueurs quand l'Aventurier est choisi ?`,o:[`Ils prennent chacun 1 Peso`,`Rien`],a:1,w:`L'Aventurier n'a pas d'action.`}
]},

/* ======================= BÂTIMENTS ======================= */
{id:'bat',part:'Les bâtiments',t:'Règles communes et production',
lead:`Quelques règles valent pour tous les bâtiments. Les bâtiments industriels, eux, transforment les récoltes.`,
rules:[
`Chaque bâtiment ne peut être construit <b>qu'une fois par joueur</b>.`,
`Un bâtiment est occupé dès qu'un ouvrier est sur un de ses demi-cercles. Seuls les bâtiments occupés donnent leur fonction.`,
`Le nombre en haut à droite donne les <b>PV de fin de partie</b>, que le bâtiment soit occupé ou non.`,
`Le nombre dans le premier demi-cercle est le <b>coût</b>. Une fois construit, il ne sert plus.`,
`Les fonctions des bâtiments beiges sont <b>facultatives</b>. Leur icône indique la phase où elles servent.`,
`On peut réarranger ses bâtiments pour faire de la place à un grand, mais jamais en retirer.`,
`Bâtiments industriels : il faut la plantation occupée <b>et</b> une place occupée dans le bâtiment du même type. Le Maïs n'a pas de bâtiment.`
],
html:`<h2>Les six bâtiments industriels</h2><div class="tw"><table><tr><th>Bâtiment</th><th>Marchandise</th><th class="c">Coût</th><th class="c">PV</th><th class="c">Demi-cercles</th></tr>
${['sfw','lfw','ssm','lsm','tob','cof'].map(i=>{const b=BI[i];return `<tr><td><b>${b.fr}</b> <span class="en">${b.en}</span></td><td>${G[b.good]}</td><td class="c">${b.cost}</td><td class="c">${b.vp}</td><td class="c">${b.slots}</td></tr>`}).join('')}
</table></div>
<div class="note"><b>Petit + grand du même type ?</b> C'est permis : ce sont deux bâtiments différents. Une Petite et une Grande Exploitation de Fruits occupées au complet traitent jusqu'à 4 Fruits.</div>`,
cas:[
{q:`Fin de partie : votre Port (3 PV) n'a plus d'ouvrier. Compte-t-il ?`,o:[`Oui, 3 PV`,`Non, il faut qu'il soit occupé`],a:0,w:`Les PV imprimés comptent toujours. Seuls les bonus des grands bâtiments exigent l'occupation.`},
{q:`Vous avez 2 plantations de Café occupées et une Brûlerie de Café avec 1 ouvrier sur 2. Que produisez-vous ?`,o:[`2 Café`,`1 Café`],a:1,w:`Un ouvrier dans la Brûlerie de Café = 1 baril traité.`}
],
quiz:[
{q:`Combien de demi-cercles a la Brûlerie de Café ?`,o:[`1`,`2`,`3`],a:1,w:`2 demi-cercles, alors que le Séchoir à Tabac en a 3.`},
{q:`Un bâtiment beige occupé vous oblige-t-il à utiliser sa fonction ?`,o:[`Oui`,`Non`],a:1,w:`C'est toujours facultatif, ce qui compte surtout pour le Chantier Naval.`}
]},

{id:'petits',part:'Les bâtiments',t:'Les petits bâtiments beiges',
lead:`Douze bâtiments qui tordent les règles à votre avantage. Cliquez sur chacun pour lire sa fonction et ses cas limites.`,
rules:[
`${bn('smk')} <span class="en">Small Market</span> : +1 Peso quand vous vendez à la Maison de Commerce (même un Maïs : 1 Peso).`,
`${bn('byd')} <span class="en">Builders Yard</span> : en phase du Paysan, Carrière au lieu d'une plantation. Ne donne pas de seconde Carrière au Paysan, ni via l'Hacienda.`,
`${bn('hac')} <span class="en">Hacienda</span> : en phase du Paysan, <b>avant</b> votre action normale, prenez la plantation du dessus d'une pile face cachée et posez-la aussitôt (pas de défausse possible). Puis action normale.`,
`${bn('swh')} <span class="en">Small Warehouse</span> : gardez tous les barils d'1 type en fin de phase du Capitaine, en plus du baril habituel.`,
`${bn('hos')} <span class="en">Hospital</span> : quand vous posez une plantation ou une Carrière, 1 ouvrier de la réserve dessus (du Registre si la réserve est vide). Avec l'Hacienda : sur l'une ou l'autre des deux tuiles, mais un seul ouvrier. Si la réserve et le Registre sont vides, l'Hôpital est sans effet.`,
`${bn('off')} <span class="en">Office</span> : vendez un type déjà présent dans la Maison. Toujours 1 baril, et rien si la Maison est pleine.`,
`${bn('lmk')} <span class="en">Large Market</span> : +2 Pesos à la vente, +3 avec un Petit Marché occupé.`,
`${bn('lwh')} <span class="en">Large Warehouse</span> : gardez 2 types complets (3 avec le Petit Entrepôt), plus le baril habituel.`,
`${bn('fac')} <span class="en">Factory</span> : en phase du Producteur, selon le nombre de types produits : 2 → 1 Peso, 3 → 2, 4 → 3, 5 → 5. Le nombre de barils par type ne compte pas.`,
`${bn('sch')} <span class="en">School</span> : quand vous construisez, 1 ouvrier de la réserve sur le nouveau bâtiment (du Registre si la réserve est vide). Un seul, même si le bâtiment a plusieurs demi-cercles.`,
`${bn('har')} <span class="en">Harbor</span> : +1 PV à chaque chargement (y compris avec le Chantier Naval).`,
`${bn('wha')} <span class="en">Wharf</span> : une fois par phase du Capitaine, au moment que vous choisissez à votre tour, tous les barils d'1 type sur un navire privé. Facultatif.`
],
lab:'cards',
cas:[
{q:`Vous avez Hacienda et Dépôt de Matériaux occupés. En phase du Paysan, que pouvez-vous faire ?`,o:[`Prendre 2 Carrières`,`Plantation face cachée (Hacienda), puis une Carrière comme action normale`,`Une Carrière à la place de la plantation face cachée`],a:1,w:`L'Hacienda donne toujours une plantation face cachée. Le Dépôt de Matériaux ne s'applique qu'à l'action normale.`},
{q:`Usine occupée. Vous produisez 3 Maïs, 1 Café, 2 Fruits. Combien de Pesos ?`,o:[`2`,`3`,`6`],a:0,w:`3 types différents : 2 Pesos (exemple du livret).`},
{q:`École occupée, vous construisez la Grande Exploitation de Fruits (3 demi-cercles).`,o:[`1 ouvrier offert dessus`,`3 ouvriers offerts`,`1 ouvrier, à poser où vous voulez`],a:0,w:`Un seul ouvrier, et seulement sur le bâtiment construit.`},
{q:`Vous avez Petit et Grand Marché occupés, vous vendez 1 Maïs sans être Marchand.`,o:[`0`,`3`,`4`],a:1,w:`0 + 3.`}
],
quiz:[
{q:`L'Hôpital et l'École prennent leur ouvrier…`,o:[`dans le Registre`,`dans la réserve, et dans le Registre seulement si la réserve est vide`],a:1,w:`Les deux fonctionnent pareil.`},
{q:`Combien de fois le Chantier Naval sert-il par phase du Capitaine ?`,o:[`Une fois`,`À chaque tour du joueur`],a:0,w:`Une seule fois par phase.`}
]},

{id:'grands',part:'Les bâtiments',t:'Les grands bâtiments',
lead:`Cinq bâtiments à 10 Pesos, sur 2 cases. Chacun vaut 4 PV, et un bonus s'il est occupé en fin de partie.`,
rules:[
`Un grand bâtiment occupe 2 cases Ville adjacentes et compte pour <b>un seul bâtiment</b>. Il vaut <b>4 PV</b>, occupé ou non.`,
`S'il est <b>occupé à la fin de la partie</b>, il rapporte en plus le bonus ci-dessous.`,
`${bn('fst')} <span class="en">Fire Station</span> : +1 PV par petit bâtiment industriel (Petite Exploitation de Fruits, Petite Raffinerie de Sucre), +2 PV par grand (Grande Exploitation de Fruits, Grande Raffinerie de Sucre, Séchoir, Brûlerie de Café), occupés ou non.`,
`${bn('res')} <span class="en">Residence</span> : cases Parcelle remplies : 1 à 9 → 4 PV, 10 → 5, 11 → 6, 12 → 7.`,
`${bn('frt')} <span class="en">Fortress</span> : 1 PV pour 3 ouvriers sur votre domaine (Portrait compris).`,
`${bn('cus')} <span class="en">Customs House</span> : 1 PV pour 4 PV en jetons gagnés pendant la partie (pas les PV du décompte final).`,
`${bn('cth')} <span class="en">City Hall</span> : 1 PV par bâtiment beige, petit ou grand, occupé ou non, lui compris. Les bâtiments industriels ne comptent pas.`
],
html:`<div class="ex"><b>Exemples du livret.</b> Caserne + Petite et Grande Raffinerie de Sucre, Petite Exploitation de Fruits, Brûlerie de Café : 1 + 2 + 1 + 2 = 6 PV. Résidence avec 10 cases Parcelle remplies : 5 PV. Forteresse avec 20 ouvriers : 6 PV. Douane avec 23 PV en jetons : 5 PV. Palais du Gouverneur avec Dépôt de Matériaux, Hôpital, Grand Marché, Usine, École, Douane (et lui-même) : 7 PV.</div>`,
lab:'large',
cas:[
{q:`Fin de partie, votre Forteresse n'a pas d'ouvrier. Elle vaut…`,o:[`0 PV`,`4 PV`,`4 PV + 1 par 3 ouvriers`],a:1,w:`4 PV imprimés toujours ; le bonus exige qu'elle soit occupée.`},
{q:`Palais du Gouverneur occupé ; vous avez aussi Petit Marché, Port, Grande Raffinerie de Sucre et Douane. Bonus ?`,o:[`3`,`4`,`5`],a:1,w:`Petit Marché, Port, Douane et le Palais du Gouverneur lui-même : 4. La Grande Raffinerie de Sucre est un bâtiment industriel.`}
],
quiz:[
{q:`Douane occupée, 23 PV en jetons. Bonus ?`,o:[`5`,`6`,`23`],a:0,w:`23 ÷ 4 = 5, arrondi à l'inférieur.`},
{q:`Résidence occupée, Parcelles toutes occupées (12). Bonus ?`,o:[`4`,`6`,`7`],a:2,w:`12 cases remplies : 7 PV.`}
]},

/* ======================= FIN DE PARTIE ======================= */
{id:'fin',part:'Fin de partie',t:'Fin de partie et décompte',
lead:`Trois déclencheurs, un tour à terminer, puis le décompte. L'onglet Décompte fait les calculs à votre place.`,
rules:[
`La partie s'arrête <b>à la fin du tour</b> où au moins une condition est remplie : on termine toujours le tour en cours.`,
`Condition 1 : en fin de phase du Recruteur, il n'y a <b>pas assez d'ouvriers</b> dans la réserve pour remplir le Registre.`,
`Condition 2 : un joueur a <b>rempli ses 12 cases Ville</b> pendant la phase du Bâtisseur.`,
`Condition 3 : le <b>dernier jeton PV</b> est pris pendant la phase du Capitaine. On note les PV suivants sur papier.`,
`Score : jetons PV (et ceux notés sur papier) + PV imprimés de tous vos bâtiments + bonus de vos grands bâtiments occupés.`,
`Égalité : le joueur qui a le plus de Pesos et de barils (1 point chacun) l'emporte.`
],
lab:'endsim',
cas:[
{q:`Phase Bâtisseur du tour 13 : un joueur pose son 12e bâtiment. Il reste deux personnages à jouer ce tour.`,o:[`La partie s'arrête tout de suite`,`On joue les personnages restants du tour, puis on compte`],a:1,w:`On termine toujours le tour en cours.`},
{q:`Égalité à 52 PV : Ana a 4 Pesos et 1 baril, Luis 3 Pesos et 3 barils.`,o:[`Ana gagne`,`Luis gagne`,`Égalité parfaite`],a:1,w:`Ana : 5, Luis : 6.`}
],
quiz:[
{q:`Le dernier jeton PV part pendant la phase du Capitaine. La partie continue-t-elle ?`,o:[`Non, on arrête aussitôt`,`On finit le tour en notant les PV sur papier`],a:1,w:`Les PV suivants se notent sur papier.`},
{q:`Quels PV la Douane prend-elle en compte ?`,o:[`Tous`,`Seulement les jetons PV gagnés pendant la partie`],a:1,w:`Pas les PV des bâtiments du décompte final.`}
]},

{id:'deux',part:'Fin de partie',t:'La partie à deux joueurs',
lead:`Toutes les règles restent les mêmes, avec une mise en place réduite et trois personnages par joueur à chaque tour.`,
rules:[
`Sur le plateau : <b>1 exemplaire</b> de chaque bâtiment beige, <b>2</b> de chaque bâtiment industriel.`,
`Chaque joueur : 1 plateau Domaine, <b>3 Pesos</b>, une plantation : Fruits pour le Gouverneur, Maïs pour l'autre.`,
`<b>65 PV</b> en jetons. On retire 3 tuiles de chaque type de Terrain (Maïs, Fruits, Sucre, Tabac, Café, Carrière), puis on révèle <b>3</b> plantations.`,
`<b>7 personnages</b> (un seul Aventurier). Navires de <b>4 et 6</b> cales. On retire <b>2 barils de chaque</b> marchandise.`,
`Registre : 2 ouvriers ; réserve : 40 ouvriers.`,
`Chaque joueur choisit <b>3 personnages par tour</b>, en alternance : le Gouverneur, l'autre, le Gouverneur, l'autre, etc.`,
`Fin de tour : 1 Peso sur le seul personnage restant, puis la carte Gouverneur change de main. La fin de partie est la même.`
],
cas:[
{q:`À deux, le Gouverneur a pris le Bâtisseur, l'autre le Capitaine. Qui choisit ensuite ?`,o:[`Le Gouverneur`,`L'autre joueur`],a:0,w:`On alterne jusqu'à 3 personnages chacun.`}
],
quiz:[
{q:`À deux, combien de Pesos le Gouverneur pose-t-il en fin de tour ?`,o:[`1`,`3`],a:0,w:`7 personnages, 6 choisis : 1 personnage reste.`},
{q:`À deux, quels navires ?`,o:[`4 et 6`,`4, 5 et 6`,`5 et 6`],a:0,w:`Seulement les navires de 4 et 6 cales.`}
]},

/* ======================= EXTENSIONS ======================= */
{id:'ext1',part:'Extensions',t:'Extension I : Nouveaux bâtiments',
lead:`14 nouveaux bâtiments (texte vert du livret) et une mise en place par draft : chaque partie a sa propre ville.`,
rules:[
`Mise en place : tous les bâtiments industriels comme d'habitude. Les 55 bâtiments beiges (anciens et nouveaux) sont posés à côté du plateau.`,
`En partant du premier joueur, chacun choisit à tour de rôle un bâtiment beige et le pose sur une case libre du plateau, jusqu'à ce que les cases soient remplies avec ces coûts : 1re rangée 1, 2, 2, 3 ; 2e rangée 4, 5, 5, 6 ; 3e rangée 7, 8, 8, 9 ; rangée du bas 10, 10, 10, 10, 10. À plus de 2 joueurs, on pose 2 exemplaires de chaque petit bâtiment choisi.`,
`${bn('can')} : +1 Fruit si vous en produisez avec la Grande Exploitation de Fruits, +1 Sucre si vous en produisez avec la Grande Raffinerie de Sucre (pas avec les petits).`,
`${bn('lum')} : en phase du Paysan, posez une plantation visible <b>face cachée</b> : c'est une Forêt, définitive, sans ouvrier nécessaire. En phase du Bâtisseur, <b>−1 Peso par paire de Forêts</b>, sans limite, cumulable avec le privilège et les Carrières, que la Scierie soit occupée ou non. Avec Hacienda : regardez la tuile avant de choisir ; avec Hôpital : l'ouvrier va sur le Portrait.`,
`${bn('bmk')} : seulement s'il vous manque de l'argent ; rendez 1 ouvrier, 1 baril et/ou 1 PV (1 Peso chacun, 3 au plus). Il ne doit vous rester aucun Peso. L'ouvrier du Marché Noir lui-même ne compte pas.`,
`${bn('sto')} : gardez jusqu'à 3 barils supplémentaires de n'importe quels types.`,
`${bn('boh')} : jusqu'à 2 ouvriers « invités » posés en phase du Recruteur, à déplacer au début, au milieu ou à la fin de n'importe quelle autre phase, vers une tuile dont vous utilisez aussitôt l'effet. Ils y restent jusqu'au Recruteur suivant.`,
`${bn('tpo')} : vendez à votre propre Commerce plutôt qu'à la Maison, même un type déjà présent (le baril retourne à la réserve). Pas de bonus de marché, mais le privilège du Marchand compte.`,
`${bn('chu')} : +1 PV quand vous construisez en 2e ou 3e rangée, +2 PV pour un grand bâtiment. Rien pour l'Église elle-même.`,
`${bn('swf')} : une fois par phase du Capitaine, autant de barils que vous voulez, de tous types, sur un navire privé : 1 PV pour 2 barils. Combinable avec le Chantier Naval.`,
`${bn('lig')} : +1 Peso à chaque chargement (navire de transport ou privé) ; Capitaine, +1 Peso au début de la phase même sans charger.`,
`${bn('dis')} : Pesos = barils de votre type le plus produit (hors Maïs) − 1. 6 Sucre → 5 Pesos.`,
`${bn('pub')} : privilège doublé. Paysan : plantation ou Carrière d'abord, puis une plantation (pas une Carrière) parmi celles qui restent ; Producteur : 2 barils bonus. Avec Hôpital, ouvrier sur la 1re tuile seulement ; avec Dépôt de Matériaux, Carrière permise en 2e tuile.`,
`${bn('asm')} : au début de la phase du Capitaine, 1 PV par paire de barils identiques (3 Maïs + 2 Fruits + 1 Café → 2 PV).`,
`${bn('cat')} (grand) : séries de 3 tuiles Terrain identiques (Forêts et Carrières comprises) : 1, 3, 6 ou 10 PV pour 1 à 4 séries. ${bn('mon')} (grand) : 8 PV, aucune fonction, pas d'ouvrier (avec l'École, l'ouvrier va sur le Portrait).`
],
cas:[
{q:`Scierie occupée, 4 Forêts, 2 Carrières occupées, vous êtes Bâtisseur et vous voulez le Grand Entrepôt (6).`,o:[`1`,`2`,`3`],a:0,w:`6 − 2 (Carrières, plafond de la 2e rangée) − 1 (privilège) − 2 (2 paires de Forêts) = 1. C'est l'exemple du livret.`},
{q:`Marché Noir occupé. Le Port coûte 8, vous avez 6 Pesos. Que faites-vous ?`,o:[`Rendez 1 baril et 1 ouvrier, payez 6`,`Rendez 3 PV`,`Rendez 2 barils`],a:0,w:`Un ouvrier, un baril et/ou un PV : un seul de chaque, et il ne doit plus vous rester de Peso.`}
],
quiz:[
{q:`La Scierie : une Forêt doit-elle être occupée ?`,o:[`Oui`,`Non`],a:1,w:`Les Forêts n'ont pas besoin d'ouvrier.`},
{q:`Petit Chantier Naval : combien de PV pour 5 barils ?`,o:[`2`,`3`,`5`],a:0,w:`1 PV pour 2 barils, arrondi à l'inférieur.`}
]},

{id:'ext2',part:'Extensions',t:'Extension II : Les Bourgeois',
lead:`20 bourgeois se mêlent aux ouvriers. Ils valent 1 PV chacun et changent l'effet de certains bâtiments (texte rouge du livret).`,
rules:[
`Mise en place : les 8 nouveaux bâtiments (noms en rouge) s'ajoutent sur le plateau, triés par coût dans les 4 rangées, en plus de ceux du jeu de base et de l'extension I. L'argent se pose alors à côté de la Banque.`,
`Les 100 ouvriers vont dans la réserve, les 20 bourgeois à côté. À chaque remplissage du Registre (début de partie et fin de phase du Recruteur), <b>remplacez 1 ouvrier par 1 bourgeois</b> tant qu'il en reste.`,
`Un bourgeois s'utilise comme un ouvrier, et toute règle sur les ouvriers vaut pour les bourgeois. En fin de partie, <b>chaque bourgeois vaut 1 PV</b>.`,
`Manquer d'ouvriers <b>n'est plus</b> une condition de fin : seules restent la Ville pleine et le dernier jeton PV.`,
`${bn('zon')} : ouvrier → payez 1 Peso pour une plantation face cachée (phase du Marchand) ; bourgeois → vendez une de vos plantations pour 1 Peso.`,
`${bn('cha')} : au début de la phase du Producteur, ouvrier → 1 Peso ; bourgeois → 1 PV.`,
`${bn('par')} : fin de phase du Paysan, ouvrier → défaussez 1 plantation ou Forêt ; bourgeois → 2 PV si vous avez plus de cases Parcelle libres que chaque autre joueur (rien en cas d'égalité).`,
`${bn('not')} : ouvrier → −1 Peso sur un petit bâtiment ; bourgeois → −2 Pesos sur un grand. Jamais l'inverse.`,
`Ces 4 bâtiments marchent pareil avec un ouvrier ou un bourgeois : ${bn('pen')} (au début du Capitaine, 1 baril rendu par bourgeois, types différents, contre 1 PV chacun), ${bn('vil')} (au début du Recruteur, 1 bourgeois de la réserve, sinon 1 ouvrier ; jamais du Registre), ${bn('tai')} (Producteur : 1 Peso par bourgeois ; compte comme grand bâtiment industriel pour la Caserne), ${bn('tsq')} (grand : +1 PV par bourgeois, où qu'il soit).`
],
cas:[
{q:`Cabinet d\'Architecte occupé par un ouvrier, vous achetez le Palais du Gouverneur.`,o:[`−1 Peso`,`−2 Pesos`,`Aucune réduction`],a:2,w:`Ouvrier : petits bâtiments seulement. Il faudrait un bourgeois pour les grands.`},
{q:`Office des Exportations, 2 bourgeois sur votre domaine, vous avez 3 Sucre et 1 Café.`,o:[`2 PV (1 Sucre + 1 Café)`,`2 PV (2 Sucre)`,`4 PV`],a:0,w:`1 baril par bourgeois, tous de types différents.`}
],
quiz:[
{q:`Avec les Bourgeois, la réserve d'ouvriers vide met-elle fin à la partie ?`,o:[`Oui`,`Non`],a:1,w:`Cette condition disparaît avec l'extension II.`},
{q:`Combien vaut un bourgeois en fin de partie avec une Place Centrale occupée ?`,o:[`1 PV`,`2 PV`],a:1,w:`1 PV de base + 1 PV de la Place Centrale.`}
]},

{id:'ext3',part:'Extensions',t:'Extension III : Le Contrebandier',
lead:`Une carte Personnage de plus, qui ne profite qu'à celui qui la prend.`,
rules:[
`Ajoutez la carte Contrebandier aux personnages habituels. Qui la choisit prend aussi la tuile <b>Avis de recherche</b>, puis fait <b>une</b> des 4 actions. Les autres ne font rien.`,
`<b>Attaque</b> : videz un navire de transport ; gardez jusqu'à 3 de ses barils, le reste retourne à la réserve.`,
`<b>Pillage</b> : videz la Maison de Commerce et gagnez 1 PV par baril retiré.`,
`<b>Débauchage</b> : réduisez le Registre au nombre de joueurs ; gardez jusqu'à 3 des ouvriers retirés et posez-les aussitôt sur des demi-cercles vides (pas sur le Portrait).`,
`<b>Changement de rôle</b> : prenez devant vous un personnage non choisi, avec ses Pesos. Si un adversaire le choisit dans le tour, vous recevez 3 Pesos de la Banque. S'il n'est pas choisi, vous le jouez en fin de tour avec son privilège, et les autres font l'action.`,
`Pas de Peso sur le Contrebandier s'il n'est pas choisi. Le détenteur de l'Avis de recherche ne peut pas reprendre le Contrebandier tant qu'un autre ne l'a pas joué.`
],
cas:[
{q:`La Maison contient 3 barils. Vous prenez le Contrebandier et faites un Pillage.`,o:[`3 PV`,`3 Pesos`,`Les 3 barils`],a:0,w:`1 PV par baril retiré, et les barils retournent à la réserve.`}
],
quiz:[
{q:`Débauchage : où vont les ouvriers récupérés ?`,o:[`Sur le Portrait`,`Aussitôt sur des demi-cercles vides de votre domaine`],a:1,w:`Ils ne peuvent pas être stockés sur le Portrait.`}
]},

{id:'ext4',part:'Extensions',t:'Extension IV : Le Festival',
lead:`Trois objectifs tirés au hasard, chacun réservé au premier qui l'atteint.`,
rules:[
`Plantation : tirez au hasard 1 plantation parmi Maïs, Fruits, Sucre, Tabac, Café et posez-la sur le plateau Festival.`,
`Marchandises : tirez au hasard 3 barils parmi 3 de chaque type (un type peut sortir plusieurs fois).`,
`Bâtiment : tirez au hasard un bâtiment à 3 PV (de base : Usine, École, Port, Chantier Naval ; avec les extensions I ou II, parmi tous les bâtiments à 3 PV en jeu).`,
`<b>Objectif Plantation</b> : le premier à avoir 3 plantations de ce type reçoit 3 ouvriers de la réserve, posés aussitôt sur ses tuiles ou son Portrait.`,
`<b>Objectif Production</b> : le premier à produire en un tour toutes les marchandises du plateau Festival reçoit 3 Pesos.`,
`<b>Objectif Bâtiment</b> : le premier à acheter ce bâtiment reçoit 3 PV.`,
`Si le bâtiment tiré est un bâtiment industriel de la marchandise de l'objectif Plantation, on en tire un autre. À 2 joueurs, le bâtiment tiré est remplacé sur le plateau par un bâtiment inutilisé, et retourne dans la boîte une fois l'objectif atteint.`,
`Chaque objectif ne se gagne qu'une fois, dans n'importe quel ordre. Une fois atteint, ses tuiles ou barils retournent à leur place et redeviennent disponibles.`
],
quiz:[
{q:`L'objectif Plantation rapporte…`,o:[`3 PV`,`3 ouvriers`,`3 Pesos`],a:1,w:`3 ouvriers de la réserve.`}
]}
];
