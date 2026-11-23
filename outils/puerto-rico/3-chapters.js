
/* ---------- contenu des chapitres ----------
   rules : un point de règle par ligne. lab : atelier interactif (voir LABS). cas : mises en situation. quiz : vérification. */
const CH=[
/* ======================= DÉCOUVRIR ======================= */
{id:'but',part:'Découvrir',t:'Le but du jeu',
lead:`Puerto Rico 1897 te met à la tête d'une exploitation agricole. Tu plantes, tu recrutes, tu produis, tu vends et tu expédies. Celui qui a le plus de points de victoire (PV) à la fin l'emporte.`,
rules:[
`À ton tour, tu <b>choisis un rôle</b> (Planteur, Bâtisseur, Recruteur, Artisan, Négociant, Capitaine ou Aventurier). Tout le monde fait l'action de ce rôle, mais toi seul profites de son <b>privilège</b>.`,
`La partie dure environ 15 manches (des « années »). Elle s'arrête à la fin d'une manche, quand l'une des trois conditions de fin est remplie.`,
`Les PV viennent de trois sources : les <b>jetons PV</b> gagnés en expédiant des marchandises, les <b>PV imprimés sur tes bâtiments</b>, et les <b>bonus des grands bâtiments</b> occupés.`,
`Ton <b>plateau Île</b> a 12 cases <b>Campagne</b> en haut (plantations et Carrières) et 12 cases <b>Ville</b> en bas (bâtiments). Le <b>Portrait</b> accueille tes pièces, tes tonneaux et les ouvriers qui n'ont pas de place.`,
`Pièces et tonneaux restent visibles de tous. Les jetons PV peuvent être posés face cachée.`,
`Chaque tuile porte 1 à 3 <b>emplacements</b> (demi-cercles). Un emplacement accueille exactement 1 ouvrier. Une tuile avec au moins 1 ouvrier est <b>occupée</b>, et seules les tuiles occupées fonctionnent.`
],
html:`<h2>Les cinq marchandises</h2>
<div class="tw"><table><tr><th>Marchandise</th><th>Pour la produire</th><th class="c">Prix de vente</th></tr>
<tr><td>${G.c}</td><td>Une plantation de Maïs occupée suffit, sans bâtiment.</td><td class="c">0</td></tr>
<tr><td>${G.f}</td><td>Plantation de Fruits occupée + place occupée dans un hangar à fruits.</td><td class="c">1</td></tr>
<tr><td>${G.s}</td><td>Plantation de Sucre occupée + place occupée dans une sucrerie.</td><td class="c">2</td></tr>
<tr><td>${G.t}</td><td>Plantation de Tabac occupée + place occupée dans le Séchoir à tabac.</td><td class="c">3</td></tr>
<tr><td>${G.k}</td><td>Plantation de Café occupée + place occupée dans le Torréfacteur.</td><td class="c">4</td></tr></table></div>
<div class="note"><b>Noms.</b> Ton livret est en anglais. Ce tutoriel donne des noms français, et l'aide-mémoire rappelle chaque fois le nom anglais imprimé sur les tuiles (par exemple Chantier = <i>Builders Yard</i>, Quai = <i>Wharf</i>). Le Puerto Rico de 2002 utilisait d'autres noms (colons, indigo…) : les règles sont les mêmes.</div>`,
cas:[
{q:`Ton Séchoir à tabac est construit mais personne n'y travaille. Ta plantation de Tabac, elle, a son ouvrier. Que produis-tu en Tabac ?`,o:[`1 tonneau : la plantation est occupée`,`Rien : le Séchoir n'est pas occupé, il ne fonctionne pas`,`1 tonneau, mais seulement si tu es l'Artisan`],a:1,w:`Une tuile ne fonctionne que si elle est occupée. Pour le Tabac, il faut à la fois la plantation occupée et un ouvrier dans le Séchoir.`},
{q:`Un adversaire pose ses jetons PV face cachée sur son Portrait. Peut-il faire de même avec ses pièces ?`,o:[`Oui, tout peut se cacher`,`Non : pièces et tonneaux restent visibles, seuls les PV peuvent être cachés`],a:1,w:`Le livret précise que pièces et marchandises restent visibles de tous. Seuls les jetons PV peuvent être retournés.`}
],
quiz:[
{q:`Quand tu choisis un rôle, qui profite de son privilège ?`,o:[`Tous les joueurs`,`Toi seul`,`Le Gouverneur`],a:1,w:`Tout le monde fait l'action, seul celui qui a pris la carte reçoit le privilège.`},
{q:`Combien d'ouvriers peut-on poser sur un emplacement (demi-cercle) ?`,o:[`1`,`2`,`Autant qu'on veut`],a:0,w:`Exactement 1 ouvrier par demi-cercle.`},
{q:`Quelle marchandise se produit sans bâtiment ?`,o:[`Le Fruit`,`Le Maïs`,`Le Café`],a:1,w:`Chaque plantation de Maïs occupée donne directement 1 tonneau.`}
]},

{id:'mep',part:'Découvrir',t:'La mise en place',
lead:`Presque tout dépend du nombre de joueurs. L'atelier te donne la liste complète pour ta table.`,
rules:[
`Plateau central au milieu : les 49 bâtiments empilés sur leurs cases, les 51 pièces forment la <b>Banque</b>.`,
`Le premier joueur reçoit la carte <b>Gouverneur</b>.`,
`Chaque joueur reçoit un plateau Île et des pièces : <b>une de moins que le nombre de joueurs</b> (2 à 3 joueurs, 3 à 4, 4 à 5), posées sur le Portrait.`,
`Plantation de départ, en partant du Gouverneur dans le sens horaire : à 3 joueurs Fruits, Fruits, Maïs ; à 4 Fruits, Fruits, Maïs, Maïs ; à 5 Fruits, Fruits, Fruits, Maïs, Maïs. Elle se pose face visible sur une case Campagne, <b>sans ouvrier</b>.`,
`Les 8 Carrières forment une pile face visible. Les autres plantations sont mélangées en piles face cachée, et on en révèle <b>une de plus que le nombre de joueurs</b>.`,
`Le Registre des ouvriers reçoit <b>autant d'ouvriers que de joueurs</b>. Le reste de la réserve d'ouvriers, des jetons PV, des rôles et des navires dépend du nombre de joueurs (voir l'atelier).`,
`Les 50 tonneaux sont triés par couleur, la Maison de commerce est posée vide. Le matériel inutilisé retourne dans la boîte.`
],
lab:'setup',
cas:[
{q:`Partie à 4. Tu es le 3e joueur en partant du Gouverneur. Quelle plantation prends-tu ?`,o:[`Fruits`,`Maïs`,`Celle que tu veux parmi les plantations visibles`],a:1,w:`À 4 joueurs, les 1er et 2e prennent des Fruits, les 3e et 4e du Maïs.`},
{q:`Partie à 3. Un joueur sort les deux Aventuriers. Que lui réponds-tu ?`,o:[`On les garde, ça fait plus de choix`,`À 3 joueurs on joue avec 6 rôles, sans aucun Aventurier`,`On en garde un seul`],a:1,w:`3 joueurs : 6 rôles, 4 joueurs : 7 (1 Aventurier), 5 joueurs : les 8.`}
],
quiz:[
{q:`Partie à 5 : combien de pièces au départ pour chacun ?`,o:[`3`,`4`,`5`],a:1,w:`Une de moins que le nombre de joueurs.`},
{q:`Partie à 4 : quels navires utilise-t-on ?`,o:[`4, 5 et 6 cales`,`5, 6 et 7 cales`,`6, 7 et 8 cales`],a:1,w:`3 joueurs : 4-5-6 ; 4 joueurs : 5-6-7 ; 5 joueurs : 6-7-8.`},
{q:`Combien de plantations révèle-t-on face visible à 3 joueurs ?`,o:[`3`,`4`,`5`],a:1,w:`Toujours une de plus que le nombre de joueurs.`}
]},

{id:'manche',part:'Découvrir',t:'Une manche : rôles et Gouverneur',
lead:`Le cœur du jeu tient en une règle : choisir un rôle, c'est déclencher une phase pour tout le monde. L'atelier te fait jouer une manche entière.`,
rules:[
`Le <b>Gouverneur</b> choisit une carte rôle, la pose devant lui, fait l'action <b>avec le privilège</b>. Puis chaque autre joueur, dans le sens horaire, fait la même action <b>sans le privilège</b>.`,
`Ensuite le joueur à gauche du Gouverneur choisit un des rôles restants, et ainsi de suite. Chaque joueur choisit <b>un rôle par manche</b> (trois à deux joueurs).`,
`Choisir un rôle est obligatoire. Faire l'action est facultatif, sauf pour le Capitaine. Qui ne peut pas ou ne veut pas agir est simplement sauté.`,
`Celui qui a choisi le rôle agit <b>toujours en premier</b>, avant les autres.`,
`Un rôle choisi reste devant son joueur jusqu'à la fin de la manche : personne d'autre ne peut le prendre cette manche-là.`,
`Si une carte rôle porte des pièces, celui qui la choisit les empoche.`,
`Fin de manche : le Gouverneur pose <b>1 pièce de la Banque sur chaque rôle non choisi</b>, tout le monde rend sa carte, et la carte Gouverneur passe au joueur de gauche.`
],
lab:'round',
cas:[
{q:`Tu es le 2e joueur à choisir. Le Gouverneur a pris l'Artisan, tu prends le Capitaine. Qui charge en premier ?`,o:[`Le Gouverneur, il a commencé la manche`,`Toi : celui qui choisit le rôle agit toujours en premier`,`Le joueur à ta gauche`],a:1,w:`Chaque phase commence par le joueur qui a pris la carte, puis tourne dans le sens horaire.`},
{q:`Le Négociant porte 2 pièces depuis deux manches. Tu n'as rien à vendre. Le prends-tu quand même ?`,o:[`Impossible : il faut pouvoir faire l'action`,`Oui, c'est permis : tu prends les 2 pièces et tu peux ne rien vendre`],a:1,w:`L'action est facultative (sauf Capitaine). Prendre un rôle « pour l'argent » est un coup courant.`}
],
quiz:[
{q:`À 4 joueurs (7 rôles), combien de pièces le Gouverneur pose-t-il en fin de manche ?`,o:[`1`,`3`,`4`],a:1,w:`7 rôles, 4 choisis : 3 rôles restants, 1 pièce sur chacun.`},
{q:`Qui devient Gouverneur à la manche suivante ?`,o:[`Celui qui a le moins de PV`,`Le joueur à gauche du Gouverneur actuel`,`Celui qui a pris le Capitaine`],a:1,w:`La carte passe simplement à gauche.`},
{q:`Peux-tu reprendre un rôle qu'un autre joueur a déjà choisi dans la même manche ?`,o:[`Oui`,`Non`],a:1,w:`La carte reste devant lui jusqu'à la fin de la manche.`}
]},

/* ======================= LES RÔLES ======================= */
{id:'planteur',part:'Les rôles',t:'Le Planteur',
lead:`Développer la Campagne : une nouvelle plantation pour chacun, une Carrière pour le Planteur s'il le veut.`,
rules:[
`Le Planteur prend <b>une Carrière ou une des plantations face visible</b> et la pose sur une case Campagne vide (privilège : la Carrière).`,
`Puis chacun, dans le sens horaire, prend une des plantations visibles restantes. Les autres joueurs ne peuvent pas prendre de Carrière, sauf avec un <b>Chantier</b> occupé.`,
`La nouvelle tuile arrive <b>sans ouvrier</b> (sauf avec un Hôpital occupé). Elle ne produira qu'une fois occupée, lors d'une phase Recruteur.`,
`Quand tout le monde a joué, le Planteur <b>défausse les plantations visibles restantes</b> et en révèle de nouvelles : une de plus que le nombre de joueurs.`,
`Si les piles sont vides, on mélange la défausse pour en refaire. S'il n'y a plus rien du tout, l'action devient impossible.`,
`Une tuile posée peut être déplacée mais jamais retirée. Sa position n'a aucune importance.`,
`Campagne pleine (12 tuiles) : tu ne peux plus faire l'action Planteur. Plus de Carrière : le Planteur perd son privilège et le Chantier ne sert plus.`
],
html:`<div class="note"><b>Bâtiments liés.</b> ${bn('hac')} (une plantation face cachée en plus), ${bn('byd')} (Carrière pour tout le monde), ${bn('hos')} (un ouvrier offert sur la tuile posée). Détails au chapitre des petits bâtiments.</div>`,
lab:'plant',
cas:[
{q:`Tu n'es pas le Planteur, tu n'as pas de Chantier. Il reste une Carrière et deux plantations de Maïs visibles. Que peux-tu prendre ?`,o:[`La Carrière`,`Une plantation de Maïs`,`Rien, les Carrières sont réservées`],a:1,w:`Sans Chantier occupé, les autres joueurs ne prennent que des plantations face visible.`},
{q:`Ta Campagne compte 12 tuiles. Un adversaire prend le Planteur.`,o:[`Tu prends quand même une plantation et tu en défausses une`,`Tu passes : une Campagne pleine interdit l'action`,`Tu poses la plantation sur une case Ville`],a:1,w:`On ne retire jamais une tuile, et la Campagne n'a que 12 cases.`},
{q:`Tu es le Planteur et tu prends une plantation de Café. Produira-t-elle à la prochaine phase Artisan ?`,o:[`Oui, automatiquement`,`Seulement si un ouvrier y est posé d'ici là, en phase Recruteur`],a:1,w:`Les ouvriers ne se posent qu'en phase Recruteur (sauf Hôpital, École).`}
],
quiz:[
{q:`À la fin de la phase Planteur à 4 joueurs, combien de plantations se retrouvent face visible ?`,o:[`4`,`5`,`Celles qui restaient, plus une`],a:1,w:`On défausse les restantes et on en révèle une de plus que le nombre de joueurs.`},
{q:`Qui renouvelle les plantations visibles ?`,o:[`Le Gouverneur`,`Le Planteur`,`Le dernier joueur à avoir pioché`],a:1,w:`C'est le Planteur, une fois que tout le monde a joué.`}
]},

{id:'recruteur',part:'Les rôles',t:'Le Recruteur',
lead:`Recruter des ouvriers, puis les poser ou les réorganiser. C'est le seul moment où les ouvriers bougent.`,
rules:[
`Le Recruteur prend d'abord <b>1 ouvrier de la réserve</b> (privilège ; pas du Registre).`,
`Puis, en partant du Recruteur et dans le sens horaire, chacun prend <b>1 ouvrier du Registre à tour de rôle</b>, jusqu'à ce qu'il soit vide. Les joueurs peuvent donc en recevoir des nombres différents.`,
`Chacun pose ses ouvriers (nouveaux ou anciens) sur des emplacements vides de plantations, Carrières ou bâtiments. Tu peux aussi <b>déplacer librement</b> les ouvriers déjà posés.`,
`Un ouvrier ne va sur le Portrait <b>que si plus aucun emplacement n'est libre</b> sur ton Île. Il attendra la prochaine phase Recruteur.`,
`On place dans le sens horaire à partir du Recruteur, ou tous en même temps si tout le monde est d'accord.`,
`Fin de phase : le Recruteur remplit le Registre avec autant d'ouvriers qu'il y a d'<b>emplacements vides sur les bâtiments</b> de tous les joueurs (pas sur les plantations ni les Carrières), avec <b>au minimum le nombre de joueurs</b>.`,
`Si la réserve ne suffit pas à remplir le Registre, la partie s'achèvera à la fin de la manche. Si la réserve est vide, le Recruteur perd son privilège.`
],
html:`<div class="ex"><b>Exemple du livret (4 joueurs).</b> 6 ouvriers sur le Registre. Le Recruteur prend 1 ouvrier de la réserve, puis le Registre se distribue : Recruteur, 2e, 3e, 4e, Recruteur, 2e. Bilan : 3 ouvriers pour le Recruteur (dont celui de la réserve), 2 pour le 2e joueur, 1 pour le 3e et le 4e.</div>`,
lab:'recruit',
cas:[
{q:`Tu as 2 ouvriers à poser. Il te reste un emplacement libre sur ta plantation de Maïs et aucun autre. Où va le second ?`,o:[`Sur le Portrait`,`Tu dois libérer un emplacement en déplaçant un ouvrier`,`Il retourne à la réserve`],a:0,w:`Le Portrait sert quand toutes les places sont prises. Tu pourrais aussi déplacer d'autres ouvriers, mais ça ne crée pas de place en plus.`},
{q:`En pleine phase Artisan, tu voudrais déplacer un ouvrier de ta plantation de Maïs vers ton Torréfacteur.`,o:[`Permis à tout moment`,`Interdit : les ouvriers ne bougent qu'en phase Recruteur`],a:1,w:`Exception : le Bohío de l'extension I.`},
{q:`Fin de la phase, 4 joueurs. Il n'y a que 2 emplacements vides sur tous les bâtiments réunis. Combien d'ouvriers vont sur le Registre ?`,o:[`2`,`4`,`0`],a:1,w:`Au minimum autant que de joueurs.`}
],
quiz:[
{q:`D'où vient l'ouvrier du privilège du Recruteur ?`,o:[`Du Registre`,`De la réserve`],a:1,w:`Il est pris dans la réserve, avant la distribution du Registre.`},
{q:`Que compte-t-on pour remplir le Registre ?`,o:[`Les emplacements vides sur les bâtiments`,`Les emplacements vides partout`,`Les ouvriers sur les Portraits`],a:0,w:`Seuls les bâtiments, pas les plantations ni les Carrières.`}
]},

{id:'batisseur',part:'Les rôles',t:'Le Bâtisseur',
lead:`Un bâtiment par joueur, payé à la Banque. Le Bâtisseur paie 1 pièce de moins, et les Carrières occupées font baisser les prix.`,
rules:[
`Le Bâtisseur peut acheter <b>1 bâtiment</b> et le paie <b>1 pièce de moins</b> que son coût. Puis chacun, dans le sens horaire, peut en acheter 1 au prix normal.`,
`Le bâtiment se pose sur une case Ville vide. Un <b>grand bâtiment</b> occupe 2 cases adjacentes, mais compte comme un seul bâtiment.`,
`Tu ne peux pas avoir <b>deux fois le même bâtiment</b>.`,
`Chaque <b>Carrière occupée</b> réduit le prix d'1 pièce, avec un plafond selon la section du plateau : 1 Carrière au plus dans la 1re section, 2 dans la 2e, 3 dans la 3e, 4 pour les grands bâtiments.`,
`Les réductions se cumulent (privilège, Carrières…). Un bâtiment ne coûte jamais moins de 0.`,
`Le nouveau bâtiment arrive <b>sans ouvrier</b> (sauf avec une École occupée).`,
`Si le Bâtisseur ne construit rien, il ne reçoit rien pour son privilège. Ville pleine : plus d'action Bâtisseur. Il est impossible de poser un grand bâtiment s'il ne reste qu'une case.`,
`Remplir ses 12 cases Ville déclenche la fin de partie (à la fin de la manche).`
],
html:`<div class="ex"><b>Exemple du livret.</b> Avec 3 Carrières occupées, on paie : Chantier 1 (2 − 1), Bureau 3 (5 − 2), Port 5 (8 − 3), Hôtel de ville 7 (10 − 3). Avec le privilège du Bâtisseur, encore 1 de moins.</div>`,
lab:'build',
cas:[
{q:`Tu es le Bâtisseur, tu as 2 Carrières occupées et tu veux le Petit marché (coût 1). Combien paies-tu ?`,o:[`0`,`−2, la Banque te rend de l'argent`,`1`],a:0,w:`1 − 1 (Carrière, plafonnée à 1 en 1re section) − 1 (privilège) = 0 au plancher.`},
{q:`Tu as déjà un Petit marché. Il en reste un sur le plateau. Peux-tu l'acheter ?`,o:[`Oui, ses effets se cumulent`,`Non : jamais deux fois le même bâtiment`],a:1,w:`Chaque bâtiment ne peut être construit qu'une fois par joueur.`},
{q:`Il te reste une seule case Ville libre et 10 pièces. Que peux-tu construire ?`,o:[`Un grand bâtiment`,`Un petit bâtiment ou un bâtiment de production`,`Rien`],a:1,w:`Un grand bâtiment exige 2 cases adjacentes libres.`}
],
quiz:[
{q:`4 Carrières occupées, tu achètes le Grand entrepôt (coût 6, 2e section), sans être Bâtisseur.`,o:[`2`,`4`,`5`],a:1,w:`Plafond de 2 Carrières en 2e section : 6 − 2 = 4.`},
{q:`Que coûte l'Hôtel de ville avec 4 Carrières occupées et le privilège du Bâtisseur ?`,o:[`5`,`6`,`7`],a:0,w:`10 − 4 − 1 = 5.`}
]},

{id:'artisan',part:'Les rôles',t:'L\'Artisan',
lead:`Tout le monde produit. C'est le rôle le plus risqué : il aide souvent davantage les autres que celui qui le prend.`,
rules:[
`L'Artisan produit en premier, puis chacun dans le sens horaire. Les tonneaux vont sur le Portrait.`,
`${G.c} : 1 tonneau par plantation de Maïs <b>occupée</b>.`,
`${G.f}, ${G.s}, ${G.t}, ${G.k} : 1 tonneau par plantation occupée qui a un <b>ouvrier correspondant dans un bâtiment de production</b> du même type. En pratique : le plus petit des deux nombres.`,
`Chaque emplacement de bâtiment de production traite 1 tonneau : petit hangar et petite sucrerie 1, grand hangar et grande sucrerie 3, Séchoir 3, Torréfacteur 2.`,
`Privilège : une fois que tout le monde a produit, l'Artisan prend <b>1 tonneau de plus</b> d'une marchandise qu'il a produite pendant cette phase. S'il n'a rien produit, pas de privilège.`,
`Si la réserve d'une marchandise est épuisée, les joueurs suivants n'en reçoivent plus. L'ordre de production compte donc.`,
`Bâtiment lié : ${bn('fac')}, qui rapporte des pièces selon le nombre de types produits.`
],
html:`<div class="ex"><b>Exemple du livret.</b> 3 plantations de Maïs dont 2 occupées : 2 Maïs. Séchoir avec 1 ouvrier sur 2 placés pour 2 plantations de Tabac occupées : 1 Tabac. 4 plantations de Sucre dont 3 occupées, grande sucrerie pleine : 3 Sucre.</div>`,
lab:'prod',
cas:[
{q:`Tu as 3 plantations de Fruits occupées et un Petit hangar à fruits occupé. Combien de Fruits ?`,o:[`3`,`1`,`0`],a:1,w:`Le petit hangar n'a qu'un emplacement : 1 tonneau au plus.`},
{q:`Tu produirais 1 Maïs, tes adversaires 3 Café et 4 Sucre. Le Capitaine et le Négociant sont encore libres. Prends-tu l'Artisan ?`,o:[`Oui, la production c'est toujours bon`,`Plutôt non : tu donnerais beaucoup plus aux autres qu'à toi`],a:1,w:`Le livret le rappelle : l'Artisan est le rôle le plus risqué.`},
{q:`Tu es l'Artisan et tu as produit 2 Maïs et 1 Tabac. Quel tonneau bonus prends-tu ?`,o:[`Un Café, le plus cher`,`Un Maïs ou un Tabac, au choix`,`Aucun : il faut avoir produit 3 types`],a:1,w:`Le tonneau bonus est d'une marchandise produite pendant la phase.`}
],
quiz:[
{q:`2 plantations de Sucre occupées, Grande sucrerie avec 3 ouvriers. Production de Sucre ?`,o:[`2`,`3`,`5`],a:0,w:`Le plus petit des deux : 2 plantations occupées.`},
{q:`Quand l'Artisan prend-il son tonneau bonus ?`,o:[`Avant de produire`,`Après que tous les joueurs ont produit`],a:1,w:`À la fin de la phase.`}
]},

{id:'negociant',part:'Les rôles',t:'Le Négociant',
lead:`Vendre un tonneau à la Maison de commerce pour faire rentrer de l'argent. Quatre places, et pas de doublon.`,
rules:[
`Le Négociant peut vendre <b>1 tonneau</b> de son Portrait à la Maison de commerce et reçoit son prix <b>+1 pièce</b> (privilège). Puis chacun, dans le sens horaire, peut vendre 1 tonneau au prix normal.`,
`Prix : ${G.c} 0, ${G.f} 1, ${G.s} 2, ${G.t} 3, ${G.k} 4.`,
`La Maison ne peut pas contenir deux tonneaux du même type, sauf pour un joueur qui a un <b>Bureau</b> occupé.`,
`La Maison n'a que <b>4 places</b>. Pleine, plus personne ne peut y vendre.`,
`Fin de phase : si la Maison est pleine, le Négociant la <b>vide</b> (tonneaux à la réserve). Sinon, les tonneaux restent pour la prochaine phase Négociant.`,
`Vendre du Maïs pour 0 pièce est permis (utile avec le privilège ou un marché). Si le Négociant ne vend rien, il ne reçoit pas la pièce du privilège.`,
`Bâtiments liés : ${bn('smk')} (+1), ${bn('lmk')} (+2, +3 avec les deux), ${bn('off')}.`
],
lab:'trade',
cas:[
{q:`La Maison contient Sucre et Tabac. Tu as 2 Tabac et 1 Maïs, sans bâtiment. Que vends-tu ?`,o:[`1 Tabac pour 3 pièces`,`1 Maïs pour 0 pièce, ou rien`,`2 Tabac`],a:1,w:`Le Tabac est déjà dans la Maison. Il ne reste que le Maïs (0 pièce), et un seul tonneau de toute façon.`},
{q:`La Maison est vide. Tu es Négociant avec un Petit et un Grand marché occupés. Tu vends 1 Café.`,o:[`5 pièces`,`7 pièces`,`8 pièces`],a:2,w:`4 (Café) + 1 (privilège) + 3 (les deux marchés) = 8.`},
{q:`Fin de la phase : la Maison contient 3 tonneaux. Qu'en fait-on ?`,o:[`On la vide`,`Ils restent pour la prochaine fois`],a:1,w:`On ne la vide que si elle est pleine (4 tonneaux).`}
],
quiz:[
{q:`Combien de tonneaux chaque joueur peut-il vendre par phase Négociant ?`,o:[`1`,`Autant qu'il y a de places`,`1 par type`],a:0,w:`Un seul tonneau, Bureau ou non.`},
{q:`Tu as un Bureau occupé. La Maison contient 4 tonneaux dont un Sucre. Peux-tu vendre un Sucre ?`,o:[`Oui, grâce au Bureau`,`Non : la Maison est pleine`],a:1,w:`Le Bureau lève l'interdiction des doublons, pas la limite de 4 places.`}
]},

{id:'capitaine',part:'Les rôles',t:'Le Capitaine : charger les navires',
lead:`La phase la plus encadrée du jeu. Charger rapporte des PV, et c'est <b>obligatoire</b> dès qu'on peut. L'atelier te fait jouer des phases complètes : le simulateur refuse les chargements illégaux et t'explique pourquoi.`,
rules:[
`Le Capitaine charge en premier, puis chacun dans le sens horaire, et <b>ça tourne plusieurs fois</b> jusqu'à ce que plus personne ne puisse charger.`,
`À ton tour, si tu peux charger, <b>tu dois charger</b>. Tu choisis librement le type, mais <b>un seul type</b> par tour.`,
`Un navire ne transporte <b>qu'un type</b> de marchandise, et <b>deux navires ne transportent jamais le même type</b>.`,
`Si tu charges un type qui n'est sur aucun navire et que plusieurs navires sont vides, tu dois prendre celui qui te permet de <b>charger le plus de tonneaux</b>.`,
`Tu charges <b>le maximum possible</b> de ce type : pas question de garder des tonneaux s'il reste de la place.`,
`Un navire plein n'accepte plus rien.`,
`<b>1 PV par tonneau chargé.</b> Privilège : le Capitaine gagne <b>1 PV de plus, une seule fois</b> dans la phase, s'il a chargé au moins 1 tonneau.`,
`Si les jetons PV sont épuisés, on note la suite sur papier et la partie s'achèvera à la fin de la manche.`
],
lab:'ship',
cas:[
{q:`Navires de 5 et 7 cales vides, celui de 6 porte 3 Maïs. Tu as 2 Maïs et 6 Sucre. Où peut aller ton Sucre ?`,o:[`Sur le navire de 5 ou de 7, au choix`,`Sur le navire de 7 : il permet d'en charger plus`,`Sur le navire de 6`],a:1,w:`Exemple du livret : sur 7 tu charges 6 tonneaux, sur 5 seulement 5. Le plus grand chargement s'impose.`},
{q:`Navires de 5 et 7 vides. Tu as 2 Café. Où les charges-tu ?`,o:[`Obligatoirement sur le 7`,`Sur l'un ou l'autre : tu charges 2 tonneaux dans les deux cas`],a:1,w:`La règle impose le navire qui permet de charger le plus. Ici, les deux permettent 2 : choix libre.`},
{q:`Le navire de Tabac est plein. Le navire de 5 est vide. Tu n'as que du Tabac.`,o:[`Tu le charges sur le navire de 5`,`Tu ne peux pas charger : le Tabac a déjà son navire`],a:1,w:`Deux navires ne peuvent pas porter le même type, même si le premier est plein.`},
{q:`Tu préférerais garder ton Café pour le vendre. Le navire de Café a 2 places libres.`,o:[`Tu peux passer ton tour`,`Si c'est ta seule marchandise chargeable, tu dois charger`],a:1,w:`Le chargement est obligatoire. Tu peux seulement choisir un autre type si tu en as un qui peut aussi être chargé.`}
],
quiz:[
{q:`Le Capitaine charge à trois reprises dans la phase. Combien de PV bonus reçoit-il ?`,o:[`1`,`3`,`0`],a:0,w:`Le privilège ne compte qu'une fois par phase.`},
{q:`Un joueur peut-il charger deux types différents dans le même tour ?`,o:[`Oui, s'il y a deux navires`,`Non, un seul type par tour`],a:1,w:`Un type par tour. Il chargera peut-être l'autre au tour suivant de la rotation.`}
]},

{id:'stockage',part:'Les rôles',t:'Le Capitaine : stocker et vider',
lead:`À la fin de la phase, chacun ne garde presque rien. Les entrepôts changent tout.`,
rules:[
`Quand plus personne ne peut charger, chaque joueur <b>garde 1 seul tonneau</b> de son choix sur son Portrait. Les autres retournent à la réserve.`,
`${bn('swh')} : tu gardes en plus <b>tous les tonneaux d'1 type</b>. ${bn('lwh')} : de <b>2 types</b>. Les deux : <b>3 types</b>. Toujours en plus du tonneau habituel.`,
`On ne vérifie le stockage qu'à cet instant : en dehors de la fin de la phase Capitaine, tu peux avoir autant de tonneaux que tu veux.`,
`Un entrepôt ne dispense jamais de charger : on charge d'abord, on stocke ensuite.`,
`Le Capitaine <b>vide les navires pleins</b> (tonneaux à la réserve). Les navires partiellement remplis <b>gardent leur cargaison</b> pour la prochaine phase, avec leur type déjà fixé.`,
`${bn('har')} : +1 PV à chaque chargement. ${bn('wha')} : une fois par phase, tous tes tonneaux d'1 type partent sur un navire affrété sans limite, au même tarif de 1 PV par tonneau (tonneaux à la réserve). Son utilisation est facultative.`
],
html:`<div class="ex"><b>Exemple du livret (Port + Quai).</b> 5 Tabac, mais le navire de Tabac n'a plus que 3 places : 3 + 1 PV. Tour suivant, 2 Sucre sur le navire de Sucre : 2 + 1 PV. Tour d'après, le Quai embarque les 2 Tabac restants : 2 + 1 PV. Le Port a rapporté 3 PV dans la phase.</div>`,
lab:'store',
cas:[
{q:`Il te reste 3 Maïs, 2 Sucre, 1 Café, sans entrepôt. Que gardes-tu ?`,o:[`Les 3 Maïs`,`1 tonneau, par exemple le Café`,`1 tonneau de chaque type`],a:1,w:`Un seul tonneau au total. Garder le plus cher (Café) est souvent le bon réflexe.`},
{q:`Même situation avec un Petit entrepôt occupé.`,o:[`2 Sucre + 1 Café`,`3 Maïs + 2 Sucre`,`3 Maïs + 1 Sucre + 1 Café`],a:0,w:`Tout un type (les 2 Sucre) + 1 tonneau (le Café). L'option 3 Maïs + 1 Café marche aussi ; deux types complets, non.`},
{q:`Le navire de 6 porte 4 Café en fin de phase. Que devient-il ?`,o:[`On le vide`,`Il garde ses 4 Café pour la prochaine phase`],a:1,w:`Seuls les navires pleins sont vidés.`}
],
quiz:[
{q:`Grand + Petit entrepôt occupés : combien de types complets gardes-tu ?`,o:[`2`,`3`,`3, plus 1 tonneau`],a:2,w:`3 types complets, plus le tonneau que tout le monde garde.`},
{q:`Le Quai peut-il embarquer un type déjà présent sur un navire ?`,o:[`Oui`,`Non`],a:0,w:`Le navire affrété accepte n'importe quel type, mais tous les tonneaux de ce type.`}
]},

{id:'aventurier',part:'Les rôles',t:'L\'Aventurier',
lead:`Le rôle le plus simple : de l'argent, et rien pour les autres.`,
rules:[
`Celui qui choisit l'Aventurier prend <b>1 pièce de la Banque</b> (plus les pièces posées sur la carte).`,
`Il n'y a pas d'action : les autres joueurs ne font rien.`,
`Il n'y en a aucun à 3 joueurs, 1 à 4 joueurs (et à 2), 2 à 5 joueurs.`,
`Il sert surtout à <b>refuser une phase</b> aux autres : prendre l'Aventurier, c'est aussi éviter de déclencher un rôle qui les avantagerait.`
],
cas:[
{q:`Il reste l'Artisan, le Capitaine et l'Aventurier (2 pièces dessus). Les autres ont plein de marchandises, toi aucune.`,o:[`L'Artisan`,`Le Capitaine`,`L'Aventurier`],a:2,w:`Tu prends 3 pièces et tu ne déclenches ni production ni expédition pour les autres. (Un autre joueur pourra encore choisir l'un des deux.)`}
],
quiz:[
{q:`Que font les autres joueurs quand l'Aventurier est choisi ?`,o:[`Ils prennent chacun 1 pièce`,`Rien`],a:1,w:`L'Aventurier n'a pas d'action.`}
]},

/* ======================= BÂTIMENTS ======================= */
{id:'bat',part:'Les bâtiments',t:'Règles communes et production',
lead:`Quelques règles valent pour tous les bâtiments. Les bâtiments de production, eux, transforment les récoltes.`,
rules:[
`Chaque bâtiment ne peut être construit <b>qu'une fois par joueur</b>.`,
`Un bâtiment est occupé dès qu'un ouvrier est sur un de ses emplacements. Seuls les bâtiments occupés donnent leur fonction.`,
`Le nombre en haut à droite donne les <b>PV de fin de partie</b>, que le bâtiment soit occupé ou non.`,
`Le nombre dans le premier emplacement est le <b>coût</b>. Une fois construit, il ne sert plus.`,
`Les fonctions des bâtiments commerciaux sont <b>facultatives</b>. Leur icône indique la phase où elles servent.`,
`On peut réarranger ses bâtiments pour faire de la place à un grand, mais jamais en retirer.`,
`Bâtiments de production : il faut la plantation occupée <b>et</b> une place occupée dans le bâtiment du même type. Le Maïs n'a pas de bâtiment.`
],
html:`<h2>Les six bâtiments de production</h2><div class="tw"><table><tr><th>Bâtiment</th><th>Marchandise</th><th class="c">Coût</th><th class="c">PV</th><th class="c">Emplacements</th></tr>
${['sfw','lfw','ssm','lsm','tob','cof'].map(i=>{const b=BI[i];return `<tr><td><b>${b.fr}</b> <span class="en">${b.en}</span></td><td>${G[b.good]}</td><td class="c">${b.cost}</td><td class="c">${b.vp}</td><td class="c">${b.slots}</td></tr>`}).join('')}
</table></div>
<div class="note"><b>Petit + grand du même type ?</b> C'est permis : ce sont deux bâtiments différents. Un petit et un grand hangar à fruits occupés au complet traitent jusqu'à 4 Fruits.</div>`,
cas:[
{q:`Fin de partie : ton Port (3 PV) n'a plus d'ouvrier. Compte-t-il ?`,o:[`Oui, 3 PV`,`Non, il faut qu'il soit occupé`],a:0,w:`Les PV imprimés comptent toujours. Seuls les bonus des grands bâtiments exigent l'occupation.`},
{q:`Tu as 2 plantations de Café occupées et un Torréfacteur avec 1 ouvrier sur 2. Que produis-tu ?`,o:[`2 Café`,`1 Café`],a:1,w:`Un ouvrier dans le Torréfacteur = 1 tonneau traité.`}
],
quiz:[
{q:`Combien d'emplacements a le Torréfacteur ?`,o:[`1`,`2`,`3`],a:1,w:`2 emplacements, alors que le Séchoir à tabac en a 3.`},
{q:`Un bâtiment commercial occupé t'oblige-t-il à utiliser sa fonction ?`,o:[`Oui`,`Non`],a:1,w:`C'est toujours facultatif, ce qui compte surtout pour le Quai.`}
]},

{id:'petits',part:'Les bâtiments',t:'Les petits bâtiments commerciaux',
lead:`Douze bâtiments qui tordent les règles à ton avantage. Clique sur chacun pour lire sa fonction et ses cas limites.`,
rules:[
`${bn('smk')} <span class="en">Small Market</span> : +1 pièce quand tu vends à la Maison de commerce (même un Maïs : 1 pièce).`,
`${bn('byd')} <span class="en">Builders Yard</span> : en phase Planteur, Carrière au lieu d'une plantation. Ne donne pas de seconde Carrière au Planteur, ni via l'Hacienda.`,
`${bn('hac')} <span class="en">Hacienda</span> : en phase Planteur, <b>avant</b> ton action normale, prends la plantation du dessus d'une pile face cachée et pose-la aussitôt (pas de défausse possible). Puis action normale.`,
`${bn('swh')} <span class="en">Small Warehouse</span> : garde tous les tonneaux d'1 type en fin de phase Capitaine, en plus du tonneau habituel.`,
`${bn('hos')} <span class="en">Hospital</span> : quand tu poses une plantation ou une Carrière, 1 ouvrier de la réserve dessus (du Registre si la réserve est vide). Avec l'Hacienda : sur l'une des deux tuiles, pas deux ouvriers.`,
`${bn('off')} <span class="en">Office</span> : vends un type déjà présent dans la Maison. Toujours 1 tonneau, et rien si la Maison est pleine.`,
`${bn('lmk')} <span class="en">Large Market</span> : +2 pièces à la vente, +3 avec un Petit marché occupé.`,
`${bn('lwh')} <span class="en">Large Warehouse</span> : garde 2 types complets (3 avec le Petit entrepôt), plus le tonneau habituel.`,
`${bn('fac')} <span class="en">Factory</span> : en phase Artisan, selon le nombre de types produits : 2 → 1 pièce, 3 → 2, 4 → 3, 5 → 5. Le nombre de tonneaux par type ne compte pas.`,
`${bn('sch')} <span class="en">School</span> : quand tu construis, 1 ouvrier de la réserve sur le nouveau bâtiment (du Registre si la réserve est vide). Un seul, même si le bâtiment a plusieurs emplacements.`,
`${bn('har')} <span class="en">Harbor</span> : +1 PV à chaque chargement (y compris avec le Quai).`,
`${bn('wha')} <span class="en">Wharf</span> : une fois par phase Capitaine, au moment que tu choisis à ton tour, tous les tonneaux d'1 type sur un navire affrété. Facultatif.`
],
lab:'cards',
cas:[
{q:`Tu as Hacienda et Chantier occupés. En phase Planteur, que peux-tu faire ?`,o:[`Prendre 2 Carrières`,`Plantation face cachée (Hacienda), puis une Carrière comme action normale`,`Une Carrière à la place de la plantation face cachée`],a:1,w:`L'Hacienda donne toujours une plantation face cachée. Le Chantier ne s'applique qu'à l'action normale.`},
{q:`Usine occupée. Tu produis 3 Maïs, 1 Café, 2 Fruits. Combien de pièces ?`,o:[`2`,`3`,`6`],a:0,w:`3 types différents : 2 pièces (exemple du livret).`},
{q:`École occupée, tu construis le Grand hangar à fruits (3 emplacements).`,o:[`1 ouvrier offert dessus`,`3 ouvriers offerts`,`1 ouvrier, à poser où tu veux`],a:0,w:`Un seul ouvrier, et seulement sur le bâtiment construit.`},
{q:`Tu as Petit et Grand marché occupés, tu vends 1 Maïs sans être Négociant.`,o:[`0`,`3`,`4`],a:1,w:`0 + 3.`}
],
quiz:[
{q:`L'Hôpital et l'École prennent leur ouvrier…`,o:[`dans le Registre`,`dans la réserve, et dans le Registre seulement si la réserve est vide`],a:1,w:`Les deux fonctionnent pareil.`},
{q:`Combien de fois le Quai sert-il par phase Capitaine ?`,o:[`Une fois`,`À chaque tour du joueur`],a:0,w:`Une seule fois par phase.`}
]},

{id:'grands',part:'Les bâtiments',t:'Les grands bâtiments',
lead:`Cinq bâtiments à 10 pièces, sur 2 cases. Chacun vaut 4 PV, et un bonus s'il est occupé en fin de partie.`,
rules:[
`Un grand bâtiment occupe 2 cases Ville adjacentes et compte pour <b>un seul bâtiment</b>. Il vaut <b>4 PV</b>, occupé ou non.`,
`S'il est <b>occupé à la fin de la partie</b>, il rapporte en plus le bonus ci-dessous.`,
`${bn('fst')} <span class="en">Fire Station</span> : +1 PV par petit bâtiment de production (Petit hangar, Petite sucrerie), +2 PV par grand (Grand hangar, Grande sucrerie, Séchoir, Torréfacteur), occupés ou non.`,
`${bn('res')} <span class="en">Residence</span> : cases Campagne remplies : 1 à 9 → 4 PV, 10 → 5, 11 → 6, 12 → 7.`,
`${bn('frt')} <span class="en">Fortress</span> : 1 PV pour 3 ouvriers sur ton Île (Portrait compris).`,
`${bn('cus')} <span class="en">Customs House</span> : 1 PV pour 4 PV en jetons gagnés pendant la partie (pas les PV du décompte final).`,
`${bn('cth')} <span class="en">City Hall</span> : 1 PV par bâtiment commercial, petit ou grand, occupé ou non, lui compris. Les bâtiments de production ne comptent pas.`
],
html:`<div class="ex"><b>Exemples du livret.</b> Caserne + Petit hangar, Grand hangar, Torréfacteur, Grande sucrerie : 1 + 2 + 2 + 2 = 7 PV. Résidence avec 10 cases Campagne remplies : 5 PV. Forteresse avec 22 ouvriers : 7 PV. Douane avec 30 PV en jetons : 7 PV. Hôtel de ville avec Chantier, Hôpital, Grand marché, Usine, École, Douane (et lui-même) : 7 PV.</div>`,
lab:'large',
cas:[
{q:`Fin de partie, ta Forteresse n'a pas d'ouvrier. Elle vaut…`,o:[`0 PV`,`4 PV`,`4 PV + 1 par 3 ouvriers`],a:1,w:`4 PV imprimés toujours ; le bonus exige qu'elle soit occupée.`},
{q:`Hôtel de ville occupé ; tu as aussi Petit marché, Port, Grande sucrerie et Douane. Bonus ?`,o:[`3`,`4`,`5`],a:1,w:`Petit marché, Port, Douane et l'Hôtel de ville lui-même : 4. La Grande sucrerie est un bâtiment de production.`}
],
quiz:[
{q:`Douane occupée, 23 PV en jetons. Bonus ?`,o:[`5`,`6`,`23`],a:0,w:`23 ÷ 4 = 5, arrondi à l'inférieur.`},
{q:`Résidence occupée, Campagne pleine (12). Bonus ?`,o:[`4`,`6`,`7`],a:2,w:`12 cases remplies : 7 PV.`}
]},

/* ======================= FIN DE PARTIE ======================= */
{id:'fin',part:'Fin de partie',t:'Fin de partie et décompte',
lead:`Trois déclencheurs, une manche à terminer, puis le décompte. L'onglet Décompte fait les calculs à ta place.`,
rules:[
`La partie s'arrête <b>à la fin de la manche</b> où au moins une condition est remplie : on termine toujours la manche en cours.`,
`Condition 1 : en fin de phase Recruteur, il n'y a <b>pas assez d'ouvriers</b> dans la réserve pour remplir le Registre.`,
`Condition 2 : un joueur a <b>rempli ses 12 cases Ville</b> pendant la phase Bâtisseur.`,
`Condition 3 : le <b>dernier jeton PV</b> est pris pendant la phase Capitaine. On note les PV suivants sur papier.`,
`Score : jetons PV (et ceux notés sur papier) + PV imprimés de tous tes bâtiments + bonus de tes grands bâtiments occupés.`,
`Égalité : le joueur qui a le plus de pièces et de tonneaux (1 point chacun) l'emporte.`
],
lab:'endsim',
cas:[
{q:`Phase Bâtisseur de la manche 13 : un joueur pose son 12e bâtiment. Il reste deux rôles à jouer cette manche.`,o:[`La partie s'arrête tout de suite`,`On joue les rôles restants de la manche, puis on compte`],a:1,w:`On termine toujours la manche en cours.`},
{q:`Égalité à 52 PV : Ana a 4 pièces et 1 tonneau, Luis 3 pièces et 3 tonneaux.`,o:[`Ana gagne`,`Luis gagne`,`Égalité parfaite`],a:1,w:`Ana : 5, Luis : 6.`}
],
quiz:[
{q:`Le dernier jeton PV part pendant la phase Capitaine. La partie continue-t-elle ?`,o:[`Non, on arrête aussitôt`,`On finit la manche en notant les PV sur papier`],a:1,w:`Les PV suivants se notent sur papier.`},
{q:`Quels PV la Douane prend-elle en compte ?`,o:[`Tous`,`Seulement les jetons PV gagnés pendant la partie`],a:1,w:`Pas les PV des bâtiments du décompte final.`}
]},

{id:'deux',part:'Fin de partie',t:'La partie à deux joueurs',
lead:`Toutes les règles restent les mêmes, avec une mise en place réduite et trois rôles par joueur à chaque manche.`,
rules:[
`Sur le plateau : <b>1 exemplaire</b> de chaque bâtiment commercial, <b>2</b> de chaque bâtiment de production.`,
`Chaque joueur : 1 plateau Île, <b>3 pièces</b>, une plantation : Fruits pour le Gouverneur, Maïs pour l'autre.`,
`<b>65 PV</b> en jetons. On retire 3 tuiles de chaque type de Campagne (Maïs, Fruits, Sucre, Tabac, Café, Carrière), puis on révèle <b>3</b> plantations.`,
`<b>7 rôles</b> (un seul Aventurier). Navires de <b>4 et 6</b> cales. On retire <b>2 tonneaux de chaque</b> marchandise.`,
`Registre : 2 ouvriers ; réserve : 40 ouvriers.`,
`Chaque joueur choisit <b>3 rôles par manche</b>, en alternance : le Gouverneur, l'autre, le Gouverneur, l'autre, etc.`,
`Fin de manche : 1 pièce sur le seul rôle restant, puis la carte Gouverneur change de main. La fin de partie est la même.`
],
cas:[
{q:`À deux, le Gouverneur a pris le Bâtisseur, l'autre le Capitaine. Qui choisit ensuite ?`,o:[`Le Gouverneur`,`L'autre joueur`],a:0,w:`On alterne jusqu'à 3 rôles chacun.`}
],
quiz:[
{q:`À deux, combien de pièces le Gouverneur pose-t-il en fin de manche ?`,o:[`1`,`3`],a:0,w:`7 rôles, 6 choisis : 1 rôle reste.`},
{q:`À deux, quels navires ?`,o:[`4 et 6`,`4, 5 et 6`,`5 et 6`],a:0,w:`Seulement les navires de 4 et 6 cales.`}
]},

/* ======================= EXTENSIONS ======================= */
{id:'ext1',part:'Extensions',t:'Extension I : Nouveaux bâtiments',
lead:`14 nouveaux bâtiments (texte vert du livret) et une mise en place par draft : chaque partie a sa propre ville.`,
rules:[
`Mise en place : tous les bâtiments de production comme d'habitude. Les 55 bâtiments commerciaux (anciens et nouveaux) sont posés à côté du plateau.`,
`En partant du premier joueur, chacun choisit à tour de rôle un bâtiment commercial et le pose sur une case libre du plateau, jusqu'à ce que les cases soient remplies avec ces coûts : 1re section 1, 2, 2, 3 ; 2e section 4, 5, 5, 6 ; 3e section 7, 8, 8, 9 ; section du bas 10, 10, 10, 10, 10. À plus de 2 joueurs, on pose 2 exemplaires de chaque petit bâtiment choisi.`,
`${bn('can')} : +1 Fruit si tu en produis avec le Grand hangar, +1 Sucre si tu en produis avec la Grande sucrerie (pas avec les petits).`,
`${bn('lum')} : en phase Planteur, pose une plantation visible <b>face cachée</b> : c'est une Forêt, définitive, sans ouvrier nécessaire. En phase Bâtisseur, <b>−1 pièce par paire de Forêts</b>, sans limite, cumulable avec le privilège et les Carrières. Avec Hacienda : regarde la tuile avant de choisir ; avec Hôpital : l'ouvrier va sur le Portrait.`,
`${bn('bmk')} : seulement s'il te manque de l'argent ; rends 1 ouvrier, 1 tonneau et/ou 1 PV (1 pièce chacun, 3 au plus). Il ne doit te rester aucune pièce. L'ouvrier du Marché noir lui-même ne compte pas.`,
`${bn('sto')} : garde jusqu'à 3 tonneaux supplémentaires de n'importe quels types.`,
`${bn('boh')} : jusqu'à 2 ouvriers « invités » posés en phase Recruteur, à déplacer au début, au milieu ou à la fin de n'importe quelle autre phase, vers une tuile dont tu utilises aussitôt l'effet. Ils y restent jusqu'au Recruteur suivant.`,
`${bn('tpo')} : vends à ton propre Comptoir plutôt qu'à la Maison, même un type déjà présent (le tonneau retourne à la réserve). Pas de bonus de marché, mais le privilège du Négociant compte.`,
`${bn('chu')} : +1 PV quand tu construis en 2e ou 3e section, +2 PV pour un grand bâtiment. Rien pour l'Église elle-même.`,
`${bn('swf')} : une fois par phase Capitaine, autant de tonneaux que tu veux, de tous types, sur un navire affrété : 1 PV pour 2 tonneaux. Combinable avec le Quai.`,
`${bn('lig')} : +1 pièce à chaque chargement (cargo ou affrété) ; Capitaine, +1 pièce au début de la phase même sans charger.`,
`${bn('dis')} : pièces = tonneaux de ton type le plus produit (hors Maïs) − 1. 6 Sucre → 5 pièces.`,
`${bn('pub')} : privilège doublé. Planteur : plantation ou Carrière d'abord, puis une plantation (pas une Carrière) parmi celles qui restent ; Artisan : 2 tonneaux bonus. Avec Hôpital, ouvrier sur la 1re tuile seulement ; avec Chantier, Carrière permise en 2e tuile.`,
`${bn('asm')} : au début de la phase Capitaine, 1 PV par paire de tonneaux identiques (3 Maïs + 2 Fruits + 1 Café → 2 PV).`,
`${bn('cat')} (grand) : séries de 3 tuiles Campagne identiques (Forêts et Carrières comprises) : 1, 3, 6 ou 10 PV pour 1 à 4 séries. ${bn('mon')} (grand) : 8 PV, aucune fonction, pas d'ouvrier.`
],
cas:[
{q:`Scierie occupée, 4 Forêts, 2 Carrières occupées, tu es Bâtisseur et tu veux le Grand entrepôt (6).`,o:[`1`,`2`,`3`],a:0,w:`6 − 2 (Carrières, plafond de la 2e section) − 1 (privilège) − 2 (2 paires de Forêts) = 1. C'est l'exemple du livret.`},
{q:`Marché noir occupé. Le Port coûte 8, tu as 6 pièces. Que fais-tu ?`,o:[`Rends 1 tonneau et 1 ouvrier, paie 6`,`Rends 3 PV`,`Rends 2 tonneaux`],a:0,w:`Un ouvrier, un tonneau et/ou un PV : un seul de chaque, et il ne doit plus te rester de pièce.`}
],
quiz:[
{q:`La Scierie : une Forêt doit-elle être occupée ?`,o:[`Oui`,`Non`],a:1,w:`Les Forêts n'ont pas besoin d'ouvrier.`},
{q:`Petit quai : combien de PV pour 5 tonneaux ?`,o:[`2`,`3`,`5`],a:0,w:`1 PV pour 2 tonneaux, arrondi à l'inférieur.`}
]},

{id:'ext2',part:'Extensions',t:'Extension II : Les Citoyens',
lead:`20 citoyens se mêlent aux ouvriers. Ils valent 1 PV chacun et changent l'effet de certains bâtiments (texte rouge du livret).`,
rules:[
`Mise en place : avec les bâtiments de base seuls, pose les 8 nouveaux bâtiments sur leurs cases. Avec l'extension I, choisis en plus 1 bâtiment de chaque coût (2 à 8) jusqu'à remplir le plateau.`,
`Les 100 ouvriers vont dans la réserve, les 20 citoyens à côté. À chaque remplissage du Registre (début de partie et fin de phase Recruteur), <b>remplace 1 ouvrier par 1 citoyen</b> tant qu'il en reste.`,
`Un citoyen s'utilise comme un ouvrier, et toute règle sur les ouvriers vaut pour les citoyens. En fin de partie, <b>chaque citoyen vaut 1 PV</b>.`,
`Manquer d'ouvriers <b>n'est plus</b> une condition de fin : seules restent la Ville pleine et le dernier jeton PV.`,
`${bn('zon')} : ouvrier → paie 1 pièce pour une plantation face cachée (phase Négociant) ; citoyen → vends une de tes plantations pour 1 pièce.`,
`${bn('cha')} : au début de la phase Artisan, ouvrier → 1 pièce ; citoyen → 1 PV.`,
`${bn('par')} : fin de phase Planteur, ouvrier → défausse 1 plantation ou Forêt ; citoyen → 2 PV si tu as plus de cases Campagne vides que chaque autre joueur.`,
`${bn('not')} : ouvrier → −1 pièce sur un petit bâtiment ; citoyen → −2 pièces sur un grand. Jamais l'inverse.`,
`Ces 4 bâtiments marchent pareil avec un ouvrier ou un citoyen : ${bn('pen')} (au début du Capitaine, 1 tonneau rendu par citoyen, types différents, contre 1 PV chacun), ${bn('vil')} (au début du Recruteur, 1 citoyen de la réserve, sinon 1 ouvrier ; jamais du Registre), ${bn('tai')} (Artisan : 1 pièce par citoyen ; compte comme grand bâtiment de production pour la Caserne), ${bn('tsq')} (grand : +1 PV par citoyen, où qu'il soit).`
],
cas:[
{q:`Notaire occupé par un ouvrier, tu achètes l'Hôtel de ville.`,o:[`−1 pièce`,`−2 pièces`,`Aucune réduction`],a:2,w:`Ouvrier : petits bâtiments seulement. Il faudrait un citoyen pour les grands.`},
{q:`Caisse de retraite, 2 citoyens sur ton Île, tu as 3 Sucre et 1 Café.`,o:[`2 PV (1 Sucre + 1 Café)`,`2 PV (2 Sucre)`,`4 PV`],a:0,w:`1 tonneau par citoyen, tous de types différents.`}
],
quiz:[
{q:`Avec les Citoyens, la réserve d'ouvriers vide met-elle fin à la partie ?`,o:[`Oui`,`Non`],a:1,w:`Cette condition disparaît avec l'extension II.`},
{q:`Combien vaut un citoyen en fin de partie avec une Grand-place occupée ?`,o:[`1 PV`,`2 PV`],a:1,w:`1 PV de base + 1 PV de la Grand-place.`}
]},

{id:'ext3',part:'Extensions',t:'Extension III : Le Contrebandier',
lead:`Une carte rôle de plus, qui ne profite qu'à celui qui la prend.`,
rules:[
`Ajoute la carte Contrebandier aux rôles habituels. Qui la choisit prend aussi la <b>tuile Contrebandier</b>, puis fait <b>une</b> des 4 actions. Les autres ne font rien.`,
`<b>Pillage</b> : vide un navire de commerce ; garde jusqu'à 3 de ses tonneaux, le reste retourne à la réserve.`,
`<b>Rafle</b> : vide la Maison de commerce et gagne 1 PV par tonneau retiré.`,
`<b>Débauchage</b> : réduis le Registre au nombre de joueurs ; garde jusqu'à 3 des ouvriers retirés et pose-les aussitôt sur des emplacements vides (pas sur le Portrait).`,
`<b>Capture</b> : prends devant toi un rôle non choisi, avec ses pièces. Si un adversaire le choisit dans la manche, tu reçois 3 pièces de la Banque. S'il n'est pas choisi, tu le joues en fin de manche avec son privilège, et les autres font l'action.`,
`Pas de pièce sur le Contrebandier s'il n'est pas choisi. Le détenteur de la tuile ne peut pas reprendre le Contrebandier tant qu'un autre ne l'a pas joué.`
],
cas:[
{q:`La Maison contient 3 tonneaux. Tu prends le Contrebandier et fais une Rafle.`,o:[`3 PV`,`3 pièces`,`Les 3 tonneaux`],a:0,w:`1 PV par tonneau retiré, et les tonneaux retournent à la réserve.`}
],
quiz:[
{q:`Débauchage : où vont les ouvriers récupérés ?`,o:[`Sur le Portrait`,`Aussitôt sur des emplacements vides de ton Île`],a:1,w:`Ils ne peuvent pas être stockés sur le Portrait.`}
]},

{id:'ext4',part:'Extensions',t:'Extension IV : La Fête',
lead:`Trois objectifs tirés au hasard, chacun réservé au premier qui l'atteint.`,
rules:[
`Plantation : tire au hasard 1 plantation parmi Maïs, Fruits, Sucre, Tabac, Café et pose-la sur le plateau Fête.`,
`Marchandises : tire au hasard 3 tonneaux parmi 3 de chaque type (un type peut sortir plusieurs fois).`,
`Bâtiment : tire au hasard un bâtiment à 3 PV (de base : Usine, École, Port, Quai ; avec les extensions I ou II, parmi tous les bâtiments à 3 PV en jeu).`,
`<b>Objectif Plantation</b> : le premier à avoir 3 plantations de ce type reçoit 3 ouvriers de la réserve, posés aussitôt sur son Île ou son Portrait.`,
`<b>Objectif Production</b> : le premier à produire en un tour toutes les marchandises du plateau Fête reçoit 3 pièces.`,
`<b>Objectif Bâtiment</b> : le premier à acheter ce bâtiment reçoit 3 PV.`,
`Chaque objectif ne se gagne qu'une fois, dans n'importe quel ordre.`
],
quiz:[
{q:`L'objectif Plantation rapporte…`,o:[`3 PV`,`3 ouvriers`,`3 pièces`],a:1,w:`3 ouvriers de la réserve.`}
]}
];
