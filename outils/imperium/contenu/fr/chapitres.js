const R={mat:'<span class="chip c-mat">Matériaux</span>',pop:'<span class="chip c-pop">Population</span>',prog:'<span class="chip c-prog">Progrès</span>',
 reg:'<span class="chip c-reg">Région</span>',tra:'<span class="chip c-tra">Tradition</span>',civ:'<span class="chip c-civ">Civilisé</span>',vas:'<span class="chip c-vas">Vassal</span>',
 ren:'<span class="chip c-ren">Renommée</span>',ins:'<span class="chip c-ins">Instabilités</span>'};
let store={done:{}};
try{store=JSON.parse(localStorage.getItem('imperium-tuto'))||store}catch(e){}
const save=()=>{try{localStorage.setItem('imperium-tuto',JSON.stringify(store))}catch(e){}};

/* ---------- contenu des chapitres ---------- */
const CH=[
{id:'depart',part:'Découvrir',t:'Avant de jouer',html:`
<p class="lead">Votre livret est celui d'Imperium Horizons, votre boîte est Imperium Antique. Bonne nouvelle : les règles de base sont les mêmes, et le livret Horizons est la version la plus claire et la plus à jour. Ce tutoriel vous apprend tout ce qui sert avec Antique et vous dit quoi laisser de côté.</p>
<h2>Le but du jeu</h2>
<p>Vous dirigez une nation antique représentée par un paquet de cartes qui grossit et se transforme au fil de la partie. La partie se termine de deux façons :</p>
<ul><li><b>Décompte</b> (le cas normal) : le joueur qui totalise le plus de points de victoire gagne.</li>
<li><b>Effondrement</b> (plus rare) : la pile ${R.ins} est vide, la partie s'arrête net et le joueur qui possède le moins de cartes ${R.ins} gagne.</li></ul>
<h2>Ce qui s'applique à votre boîte</h2>
<div class="tw"><table>
<tr><th>Vous utilisez</th><th>Vous ignorez avec Antique seul</th></tr>
<tr><td>Tout le déroulement du jeu : les trois ordres, le Nettoyage, le mélange de la défausse, le Solstice, la fin de partie.</td><td>Les encadrés bleus du livret : extension Routes commerciales, ressource Biens, mots-clés Marchander, Commercer et Profit.</td></tr>
<tr><td>Le chapitre Mots-clés, qui précise chaque terme écrit sur les cartes.</td><td>Les 14 nations d'Horizons et leurs règles spéciales (Cultistes, Inuits, Martiens, etc.).</td></tr>
<tr><td>Le mode Solo contre la C.I.V. et les variantes (encadrés roses et pages dédiées).</td><td>Les 49 cartes de remplacement : elles se trouvent dans la boîte Horizons. Vos cartes d'origine restent jouables.</td></tr>
<tr><td>Les 8 nations d'Antique : Carthaginois, Celtes, Grecs, Macédoniens, Perses, Romains, Scythes, Vikings.</td><td>Les cartes marquées des icônes d'extension, les plateaux et jetons propres à Horizons si votre boîte n'en contient pas.</td></tr>
</table></div>
<h2>Comment suivre ce tutoriel</h2>
<p>Six étapes, du plus fondamental au plus pointu. Chacune contient des ateliers à manipuler et se termine par des mises en situation. Votre progression est gardée dans ce navigateur. Après l'étape 5, vous savez jouer.</p>`,
quiz:[{q:'Avec la boîte Antique seule, que faites-vous des encadrés bleus du livret Horizons ?',o:['Je les applique tous','Je les ignore : ils concernent l\'extension Routes commerciales','Je les applique seulement à deux joueurs'],a:1,w:'Les encadrés bleus ne concernent que l\'extension Routes commerciales, dont le matériel est dans la boîte Horizons.'},
{q:'Une partie se termine par un Effondrement. Qui gagne ?',o:['Le joueur qui a le plus de points','Le joueur qui a le moins de cartes Instabilités','Le joueur qui a déclenché l\'Effondrement'],a:1,w:'On compte les Instabilités de chacun ; le plus petit total l\'emporte. Les points ne servent qu\'à départager une égalité.'}]},

{id:'bases',part:'Découvrir',t:'Les cinq idées du jeu',html:`
<p class="lead">Imperium repose sur cinq idées simples. Si vous les avez en tête, le reste des règles se déduit presque tout seul.</p>
<h2>1. Votre deck tourne, et il grandit</h2>
<p>Vous commencez avec une dizaine de cartes. À la fin de chaque tour vous refaites votre main. Quand votre deck est vide, vous mélangez votre défausse pour en refaire un, et à ce moment-là une nouvelle carte de votre nation s'y ajoute : d'abord les cartes de votre <b>pioche Nation</b>, puis votre carte <b>Avènement</b> (qui vous fait passer de Barbare à Empire ; chez les Vikings, c'est le Zénith, qui déclenche la fin de partie), puis vos cartes <b>Développement</b>, que vous devez payer. Faire tourner votre deck vite, c'est faire évoluer votre nation.</p>
<h2>2. Trois ressources</h2>
<p>${R.mat}, ${R.pop} et ${R.prog}. Elles viennent surtout de vos cartes ${R.reg} en jeu. Elles sont soit dans le stock commun, soit dans votre réserve, soit posées sur des cartes. Une ressource posée sur une carte ne peut ni être dépensée ni être déplacée, et ne compte pas au score, sauf si une carte dit le contraire. Les jetons ne sont pas limités.</p>
<div class="lab"><h3>Atelier : puis-je payer ?</h3>
<p class="hint">Quand un effet dit Payer, le Progrès peut remplacer d'autres ressources : 1 Progrès vaut 1 Population, ou 2 Matériaux (sans rendu de monnaie). L'inverse n'existe pas. Réglez votre réserve et le coût.</p>
<div class="row">
<label class="f" for="pm">Mes Matériaux<input type="number" id="pm" min="0" value="3"></label>
<label class="f" for="pp">Ma Population<input type="number" id="pp" min="0" value="2"></label>
<label class="f" for="pr">Mon Progrès<input type="number" id="pr" min="0" value="1"></label>
<label class="f" for="pc">Coût à payer<input type="number" id="pc" min="1" value="5"></label>
<label class="f" for="pt">en<select id="pt"><option value="m">Matériaux</option><option value="p">Population</option><option value="g">Progrès</option></select></label>
</div><div class="out" id="payout"></div></div>
<h2>3. Actions et jetons Épuisé</h2>
<p>À votre tour vous disposez en général de <b>3 jetons Action</b> et de <b>5 jetons Épuisé</b>, posés sur votre carte État. Une Action sert le plus souvent à jouer une carte de votre main. Un jeton Épuisé se pose sur une carte restée en jeu pour activer sa capacité Épuiser, une fois par tour et par carte. Tout revient sur votre carte État pendant votre Nettoyage.</p>
<h2>4. Gagner de nouvelles cartes</h2>
<p>Les nouvelles cartes arrivent presque toujours dans votre main. <b>Acquérir</b> une carte du Marché vous donne aussi la carte ${R.ins} glissée dessous. <b>Innover</b> vous donne la carte sans l'Instabilité. D'autres effets (Récupérer, Trouver) vont chercher des cartes ailleurs.</p>
<h2>5. Renommée et Gloire</h2>
<p>Les cartes ${R.ren} sont les plus riches en points. On les obtient surtout avec la carte <b>Gloire</b>, qui oblige à Abandonner trois Régions en jeu. Rejouer ces Régions coûte des Actions : chaque Gloire se paie en tempo.</p>
<h2>Les zones d'un joueur</h2>
<div class="lab"><h3>Atelier : à quoi sert chaque zone ?</h3><p class="hint">Cliquez sur une zone.</p>
<div class="zones" id="zones"></div><div class="out" id="zout">Choisissez une zone pour lire son rôle.</div></div>`,
quiz:[{q:'Vous devez Payer 4 Matériaux. Vous avez 2 Matériaux et 1 Progrès. Pouvez-vous payer ?',o:['Non, il manque 2 Matériaux','Oui : 2 Matériaux + 1 Progrès qui vaut 2 Matériaux','Oui, mais seulement si j\'ai aussi de la Population'],a:1,w:'Pour un coût en Matériaux, chaque Progrès dépensé compte comme 2 Matériaux.'},
{q:'Deux jetons Progrès sont posés sur une de vos cartes en jeu. Pouvez-vous les dépenser ?',o:['Oui, librement','Non : les ressources posées sur des cartes ne servent pas à payer','Oui, mais uniquement pendant le Solstice'],a:1,w:'Seules les ressources de votre réserve servent à Payer ou à être Déplacées.'},
{q:'Quand une carte de votre nation s\'ajoute-t-elle à votre deck ?',o:['À chaque début de tour','Quand je mélange ma défausse pour refaire mon deck','Quand j\'achète une carte au Marché'],a:1,w:'C\'est le mélange de la défausse qui fait entrer une carte Nation, puis l\'Avènement, puis les Développements.'}]},

{id:'cartes',part:'Découvrir',t:'Lire une carte',html:`
<p class="lead">Tout ce qu'une carte fait est écrit dessus. Encore faut-il savoir où regarder. Cliquez sur les pastilles numérotées.</p>
<div class="lab"><h3>Atelier : anatomie d'une carte</h3>
<div class="anat"><div class="card" id="card">
<div class="band">Nom de la carte</div><div class="art"></div>
<div class="txt"><b>Épuiser :</b> Payez 1 Population pour gagner 2 Matériaux.<br><i>Coût de Développement : 3 Matériaux</i></div>
</div>
<div><div class="out" id="cout">Treize éléments à découvrir.</div></div></div></div>
<h2>Les catégories</h2>
<div class="tw"><table>
<tr><td>${R.reg}</td><td>Les territoires de votre nation. Une Région ne produit que lorsqu'elle est en jeu devant vous.</td></tr>
<tr><td>${R.tra}</td><td>Coutumes et savoir-faire anciens.</td></tr>
<tr><td>${R.civ}</td><td>Coutumes et techniques plus modernes.</td></tr>
<tr><td>${R.vas}</td><td>Peuples qui vous ont juré fidélité.</td></tr>
<tr><td>${R.ren}</td><td>Exploits mémorables, souvent 10 points ou plus.</td></tr>
<tr><td>${R.ins}</td><td>Désordre intérieur. Aucune utilité : elles encombrent votre deck.</td></tr>
<tr><td><b>Puissance</b></td><td>La carte unique qui définit votre nation. L'Histoire s'archive dessous.</td></tr>
</table></div>
<h2>Les quatre sortes de points de victoire</h2>
<ul><li><b>Valeur fixe</b> : la carte vaut le nombre indiqué.</li>
<li><b>Valeur conditionnelle</b> (icône avec un point d'interrogation) : le nombre indiqué si la condition est remplie, sinon zéro.</li>
<li><b>Valeur variable</b> (icône avec une étoile) : dépend de ce que vous possédez, avec un <b>plafond de 10 points par carte</b>, y compris pour votre carte Puissance.</li>
<li><b>Valeur négative</b> : la carte vous retire des points.</li></ul>
<div class="note"><b>Icônes d'État.</b> Une carte marquée Barbare ne se joue de votre main que si votre carte État montre la face Barbare ; même logique pour Empire. Mais vous pouvez l'Acquérir ou l'Innover quel que soit votre État, et si elle est déjà en jeu vous pouvez toujours utiliser sa capacité Épuiser.</div>`,
quiz:[{q:'Une carte à valeur variable devrait vous rapporter 14 points d\'après son texte. Combien marquez-vous ?',o:['14','10','7'],a:1,w:'Une carte à points variables ne rapporte jamais plus de 10 points.'},
{q:'Vous êtes Empire et une carte Barbare est restée dans votre zone de jeu. Sa capacité Épuiser est-elle utilisable ?',o:['Oui','Non, elle est bloquée','Seulement une fois dans la partie'],a:0,w:'L\'icône d\'État limite le fait de jouer la carte depuis votre main, pas l\'usage d\'une carte déjà en jeu.'}]},

{id:'mise-en-place',part:'Découvrir',t:'Mise en place',html:`
<p class="lead">Deux temps : chaque joueur prépare sa nation, puis on installe le Marché commun. Cochez les étapes au fur et à mesure.</p>
<div class="row"><b>Nombre de joueurs :</b><span class="tabs" id="np" style="margin:0"></span></div>
<div class="out" id="npout"></div>
<h2>Chaque joueur</h2><ol class="steps" id="st1"></ol>
<h2>Le Marché et les pioches communes</h2><ol class="steps" id="st2"></ol>
<div class="note"><b>Le Marché, de gauche à droite.</b> Deux emplacements alimentés par la pioche Principale, puis un emplacement Civilisé, un Tradition, un Région. Il contient toujours cinq cartes : tout emplacement vidé est rempli aussitôt.</div>`,
quiz:[{q:'Sous quelles cartes du Marché glisse-t-on une carte Instabilités ?',o:['Sous toutes','Sous toutes sauf les Régions','Seulement sous les deux cartes de la pioche Principale'],a:1,w:'Les Régions n\'ont jamais d\'Instabilité dessous ; toutes les autres cartes du Marché en ont une.'},
{q:'Où se place votre carte Avènement ?',o:['Dans votre main de départ','Tout en bas de votre pioche Nation, face visible','Dans la zone de Développement'],a:1,w:'La pioche Nation est posée en travers sur l\'Avènement, qui sera donc la dernière carte à en sortir.'}]},

{id:'tour',part:'Jouer',t:'Votre tour : trois ordres',html:`
<p class="lead">À votre tour vous annoncez un seul ordre parmi trois, vous le résolvez, puis vous faites votre Nettoyage. Le joueur à gauche du jeton Solstice ouvre la manche et on tourne dans le sens horaire.</p>
<div class="lab"><h3>Atelier : les trois ordres</h3><div class="tabs" id="ordtabs"></div><div id="ordout"></div></div>
<h2>Actions et capacités Épuiser en pratique</h2>
<ul><li><b>Faire une Action</b> : retirez un jeton Action de votre carte État. Plus de jeton, plus d'Action, sauf Action gratuite.</li>
<li><b>Jouer une carte</b> : résolvez son texte autant que possible, puis mettez-la dans votre défausse, sauf si elle dit d'aller ailleurs. Les cartes permanentes (icône en entête) restent en jeu devant vous.</li>
<li>Une carte dont le texte commence par <b>Épuiser</b>, <b>Passif</b> ou <b>Solstice</b> ne fait rien au moment où vous la posez : c'est une carte permanente dont l'effet servira plus tard.</li>
<li><b>Épuiser</b> : déplacez un jeton Épuisé de votre carte État sur une carte en jeu (ou sur votre carte Puissance) qui n'en porte pas encore, puis résolvez le texte qui suit le mot Épuiser. Si la capacité a un coût que vous ne pouvez pas payer, vous ne pouvez pas l'utiliser.</li>
<li>Certaines capacités Épuiser répondent à un événement (« lorsque… »). Elles se résolvent juste après la phrase qui les a déclenchées, avant la phrase suivante.</li>
<li><b>Action gratuite</b> : la carte se joue sans jeton Action, même s'il ne vous en reste plus. Une même carte ne peut être jouée ainsi qu'une fois par tour. Gratuit ne veut pas dire sans coût : les coûts écrits sur la carte restent dus.</li>
<li><b>Gagner une Action</b> : prenez un jeton Action du stock, même si vous dépassez trois. Vous revenez à trois au Nettoyage.</li></ul>
<div class="lab"><h3>Atelier : compteur de jetons</h3><p class="hint">Simulez un tour d'Activation et regardez ce que chaque geste consomme.</p>
<p>Actions : <span class="tok" id="tkA"></span> &nbsp; Épuisé : <span class="tok" id="tkE"></span></p>
<div class="row" id="tkbtn"></div><div class="out" id="tkout">Vous commencez avec 3 Actions et 5 jetons Épuisé.</div></div>`,
quiz:[{q:'Votre main ne contient que des Instabilités et des cartes injouables. Vous voulez une bonne carte Tradition visible au Marché, sans prendre l\'Instabilité dessous. Quel ordre ?',o:['Activation','Recherche','Pacification'],a:1,w:'Recherche : vous défaussez votre main et vous Innovez une carte, sans l\'Instabilité.'},
{q:'Pendant un ordre Recherche, pouvez-vous utiliser une capacité Épuiser ?',o:['Oui, une seule','Non, ni Action ni capacité Épuiser','Oui, si elle est gratuite'],a:1,w:'Recherche et Pacification remplacent tout le tour. Seules les capacités Passif restent actives.'},
{q:'Vous avez utilisé vos 3 Actions. Une carte vous permet d\'en jouer une autre « en tant qu\'Action gratuite ». Est-ce possible ?',o:['Non, il faut un jeton','Oui, sans jeton Action','Oui, en dépensant un jeton Épuisé'],a:1,w:'Une Action gratuite ne consomme aucun jeton et reste possible sans jeton Action disponible.'}]},

{id:'resoudre',part:'Jouer',t:'Résoudre une carte',html:`
<p class="lead">Les cartes se lisent au pied de la lettre. Neuf principes suffisent à trancher presque tous les cas.</p>
<ol>
<li>Chaque phrase se résout séparément, dans l'ordre.</li>
<li>Chaque phrase se résout <b>autant que possible</b>. Ce qui suit le verbe « pouvoir » est facultatif ; tout le reste est obligatoire.</li>
<li>Si vous ne pouvez résoudre aucune partie de l'effet, vous ne pouvez pas jouer la carte.</li>
<li>Si le texte ne dit pas où va la carte ensuite, elle va dans votre défausse (sauf carte permanente).</li>
<li>Ce qui précède le mot « pour » est un <b>coût</b> : « Faites X pour gagner Y ». Vous avez le droit de payer un coût même si le résultat est incertain ou impossible.</li>
<li>Payer ou Déplacer des ressources est toujours un coût, même sans « pour ».</li>
<li>Si un coût obligatoire ne peut pas être réglé en entier, vous ne pouvez ni jouer la carte ni déclencher l'effet.</li>
<li>Le coût se règle entièrement avant le reste de l'effet.</li>
<li>Si vous payez un coût, vous devez résoudre le résultat, autant que possible.</li>
</ol>
<div class="note"><b>Choisir.</b> Quand une carte propose des options séparées par OU, vous en résolvez une seule. Une phrase complète placée après la liste s'applique quel que soit votre choix. Si l'option retenue exige un paiement que vous ne pouvez pas faire, vous devez en choisir une autre.</div>
<div class="note"><b>Tous les joueurs.</b> « Tous les joueurs » ou « chaque joueur » vous inclut. « Tous les autres joueurs » ne vous inclut pas.</div>
<h2>Attaques</h2>
<p>Une carte marquée de l'icône d'Attaque touche tous les autres joueurs, autant que possible. Certaines cartes permettent à un joueur d'ignorer tout ou partie d'une Attaque qui le vise.</p>`,
quiz:[{q:'« Payez 2 Matériaux pour Piocher 2 cartes. » Vous n\'avez qu\'1 Matériau et aucun Progrès. Pouvez-vous jouer la carte ?',o:['Oui, je paie 1 et je pioche 1','Non : un coût obligatoire doit pouvoir être réglé en entier','Oui, le coût est facultatif'],a:1,w:'Un coût ne se paie jamais à moitié. S\'il est obligatoire et impayable, la carte est injouable.'},
{q:'« Gagnez 2 Population. Vous pouvez Défausser une carte pour Piocher une carte. » Qu\'est-ce qui est obligatoire ?',o:['Tout','Seulement gagner 2 Population','Seulement la défausse'],a:1,w:'Le texte qui suit « pouvez » est facultatif ; la première phrase est obligatoire.'},
{q:'Une carte dit « Tous les autres joueurs Récupèrent une carte Instabilités ». Êtes-vous concerné ?',o:['Oui','Non'],a:1,w:'« Tous les autres joueurs » vous exclut.'}]},

{id:'marche',part:'Jouer',t:'Le Marché : Acquérir et Innover',html:`
<p class="lead">Deux verbes pour prendre une carte, et une différence de taille : l'Instabilité.</p>
<div class="grid2">
<div class="nat"><h3>Acquérir</h3><p>Choisissez une carte visible du Marché de la catégorie autorisée. Gagnez les ressources posées dessus. Prenez la carte en main, <b>avec la carte Instabilités glissée dessous</b>. Le Marché est complété aussitôt, et une Instabilité de la pile se glisse sous la nouvelle carte, sauf si c'est une Région.</p></div>
<div class="nat"><h3>Innover</h3><p>Annoncez une catégorie, puis choisissez : soit une carte visible du Marché (vous gagnez ses ressources, l'Instabilité dessous <b>retourne dans la pile</b>), soit la première carte face cachée de la pioche Région, Tradition ou Civilisé. Les effets « lorsque vous Acquérez » ne se déclenchent pas.</p></div>
</div>
<h3>Cas particuliers d'Innover</h3>
<ul><li>Les Vassaux n'ont pas de pioche à eux. Pour en Innover un à l'aveugle, révélez les cartes de la pioche Principale une à une jusqu'au premier Vassal, prenez-le, puis mélangez les autres cartes révélées dans la pioche Principale.</li>
<li>Même procédure pour une catégorie dont la pioche est vide. Tant que la pioche Région, Tradition ou Civilisé contient des cartes, vous n'avez pas le droit de fouiller la pioche Principale pour cette catégorie.</li>
<li>Si la fouille ne trouve rien, vous gagnez 2 Progrès à la place.</li>
<li>Avec l'ordre Recherche, vous Innovez une Région, une Tradition, un Civilisé ou un Vassal, jamais une Renommée.</li></ul>
<h3>Remplacer une carte prise</h3>
<p>Une carte prise dans l'un des deux premiers emplacements est remplacée depuis la pioche Principale. Les autres le sont depuis la pioche de leur emplacement, ou depuis la pioche Principale si celle-là est vide. Il arrive donc qu'une carte se retrouve dans un emplacement qui ne correspond pas à sa catégorie. Si un effet vous fait Acquérir plusieurs cartes, terminez chaque acquisition, remplacement compris, avant la suivante : vous pouvez prendre la carte qui vient d'arriver.</p>
<div class="lab"><h3>Atelier : un petit Marché</h3><p class="hint">Sélectionnez une carte puis choisissez un verbe. Surveillez la pile Instabilités : volontairement petite ici pour que vous voyiez arriver l'Effondrement.</p>
<div class="mk" id="mk"></div>
<div class="row" style="margin-top:10px">
<button type="button" id="mAcq" class="pri">Acquérir</button><button type="button" id="mInn">Innover cette carte</button><button type="button" id="mBlind">Innover à l'aveugle (même catégorie)</button><button type="button" id="mProg">Poser 1 Progrès (Nettoyage)</button><button type="button" id="mReset">Recommencer</button></div>
<div class="row" style="margin-top:10px"><div class="pile"><b id="mPile">0</b><span>Pile Instabilités</span></div><div class="pile"><b id="mHandU">0</b><span>Instabilités prises</span></div><div class="pile"><b id="mHandC">0</b><span>Cartes gagnées</span></div><div class="pile"><b id="mRes">0</b><span>Progrès gagnés</span></div></div>
<div class="out" id="mout">Sélectionnez une carte du Marché.</div></div>
<h2>Exiler et Échanger</h2>
<p><b>Exiler</b> une carte du Marché l'envoie dans la pile Exil, à côté du Marché. L'Instabilité dessous retourne dans sa pile, et la carte est remplacée normalement. Une carte qui porte des jetons ne peut pas être Exilée. Certaines cartes permettent d'Acquérir ou d'Innover dans la pile Exil : si vous y Acquérez une carte autre qu'une Région, vous devez aussi Récupérer une Instabilité.</p>
<p><b>Échanger</b> remplace une carte du Marché par une autre venue d'ailleurs (votre main par exemple). Les jetons restent sur l'emplacement, l'ancienne Instabilité retourne dans la pile et une nouvelle se glisse sous la carte arrivante, sauf Région. Si l'échange exige « la même catégorie », les deux cartes doivent partager une icône de catégorie.</p>`,
quiz:[{q:'Vous Acquérez une Tradition qui porte 2 Progrès et une Instabilité dessous. Que recevez-vous ?',o:['La carte seulement','La carte et les 2 Progrès','La carte, les 2 Progrès et l\'Instabilité'],a:2,w:'Acquérir vous donne tout : ressources en réserve, carte et Instabilité en main.'},
{q:'Vous Innovez la même carte. Que devient l\'Instabilité ?',o:['Je la prends','Elle retourne dans la pile Instabilités','Elle va dans la pile Exil'],a:1,w:'C\'est tout l\'intérêt d\'Innover : la carte sans l\'Instabilité.'},
{q:'La pioche Civilisé contient encore des cartes. Pouvez-vous fouiller la pioche Principale pour Innover un Civilisé ?',o:['Oui','Non, pas tant que la pioche Civilisé n\'est pas vide'],a:1,w:'La fouille de la pioche Principale n\'est permise que pour les Vassaux ou pour une catégorie dont la pioche est vide.'}]},

{id:'deck',part:'Jouer',t:'Nettoyage et mélange du deck',html:`
<p class="lead">C'est le moteur du jeu, et la partie des règles sur laquelle on revient le plus souvent au début.</p>
<h2>Le Nettoyage, en quatre étapes</h2>
<ol><li><b>Ajoutez 1 Progrès du stock sur une carte du Marché</b> de votre choix. Du stock, pas de votre réserve. C'est l'oubli le plus courant.</li>
<li><b>Récupérez vos jetons</b> : 3 Actions et 5 Épuisé de retour sur votre carte État.</li>
<li><b>Vous pouvez Défausser</b> autant de cartes de votre main que vous voulez.</li>
<li><b>Piochez</b> jusqu'à votre limite de main (5 par défaut). Si vous avez déjà 5 cartes ou plus, vous ne piochez pas, et vous n'êtes pas obligé de redescendre à 5.</li></ol>
<p>Dès que vous avez fini l'étape 1, le joueur suivant peut commencer son tour pendant que vous terminez.</p>
<div class="note"><b>Conseil du livret.</b> Défaussez largement. Plus votre deck tourne vite, plus vite arrivent vos cartes Nation, votre Avènement et vos Développements.</div>
<h2>Mélanger votre défausse</h2>
<p>Quand vous devez Piocher et que votre deck est vide, vous mélangez tout de suite, même pendant le tour d'un autre. Avant de mélanger, vous pouvez ajouter <b>une carte, une seule fois par tour</b>, et il vous faut pour cela un jeton Épuisé disponible, qui sert de témoin :</p>
<ol><li><b>Il reste une carte dans votre pioche Nation</b> (Avènement compris) : mettez la première dans votre défausse et posez un jeton Épuisé sur la pioche Nation. Si c'est l'Avènement, retournez votre carte État : vous voilà Empire. Vikings : leur Zénith ne retourne rien, il déclenche la fin de partie.</li>
<li><b>La pioche Nation est vide</b> : vous pouvez Payer le coût d'une carte de votre zone de Développement, celle que vous voulez, pour la mettre dans votre défausse. Posez alors un jeton Épuisé sur la zone. Si vous ne pouvez payer aucune carte, vous ne Développez pas.</li>
<li>Mélangez votre défausse : c'est votre nouveau deck.</li>
<li>Résolvez les éventuels effets « lorsque vous mélangez ».</li>
<li>Continuez à Piocher jusqu'à votre limite de main.</li></ol>
<p>Pendant le Nettoyage vous avez toujours un jeton disponible, puisque vous venez de les récupérer. En plein tour en revanche, si tous vos jetons Épuisé sont utilisés ou qu'un témoin est déjà posé, vous mélangez sans rien ajouter.</p>
<p><b>« Piochez, si possible »</b> : ce type d'effet ne provoque jamais de mélange. Deck vide, vous ne piochez pas.<br><b>« Piochez jusqu'à X »</b> est au contraire une pioche normale : deck vide, vous mélangez et vous continuez jusqu'à X cartes en main. Les deux réunis (« Piochez jusqu'à 3 cartes si possible ») : vous vous arrêtez au deck vide.</p>
<div class="lab"><h3>Atelier : faites tourner votre deck</h3><p class="hint">Exemple illustratif : les quantités varient selon la nation. Chaque clic joue un tour complet où vous défaussez toute votre main.</p>
<div class="row"><div class="pile"><b id="dDeck"></b><span>Deck</span></div><div class="pile"><b id="dHand"></b><span>Main</span></div><div class="pile"><b id="dDisc"></b><span>Défausse</span></div><div class="pile"><b id="dNat"></b><span>Pioche Nation</span></div><div class="pile"><b id="dDev"></b><span>Développements</span></div><div class="pile"><b id="dState" style="font-size:18px;line-height:38px"></b><span>État</span></div></div>
<div class="row" style="margin-top:10px"><button type="button" class="pri" id="dTurn">Jouer un tour</button><button type="button" id="dAcq">Jouer un tour en acquérant une carte</button><label><input type="checkbox" id="dPay" checked> J'ai de quoi payer mes Développements</label><button type="button" id="dReset">Recommencer</button></div>
<ol class="log" id="dLog"></ol></div>
<p>Observez deux choses : chaque carte acquise arrive avec une Instabilité et allonge le cycle ; et c'est en Développant votre dernière carte que vous déclenchez le Décompte.</p>`,
quiz:[{q:'D\'où vient le jeton Progrès que vous ajoutez au Marché pendant votre Nettoyage ?',o:['De ma réserve','Du stock','D\'une carte du Marché voisine'],a:1,w:'Toujours du stock. Votre réserve n\'est pas touchée.'},
{q:'Votre deck se vide en plein tour, et vos 5 jetons Épuisé sont déjà sur des cartes. Que se passe-t-il ?',o:['Je ne peux pas piocher','Je mélange ma défausse sans ajouter de carte Nation','J\'ajoute quand même une carte Nation'],a:1,w:'Sans jeton Épuisé disponible pour servir de témoin, pas d\'ajout. Le mélange a lieu quand même.'},
{q:'Votre carte Avènement rejoint votre défausse. Quelle conséquence immédiate ?',o:['La partie se termine','Je retourne ma carte État : je deviens Empire','Je pioche une carte Renommée'],a:1,w:'L\'Avènement fait basculer votre carte État de Barbare à Empire (les Vikings font exception, voir le chapitre Nations).'}]},

{id:'solstice',part:'Jouer',t:'Le Solstice',html:`
<p class="lead">Le Solstice ferme chaque manche. Quand le dernier joueur a fini son tour, tout le monde résout ses effets Solstice.</p>
<ul><li>Chaque joueur résout <b>tous</b> les effets Solstice de sa zone de jeu, de sa carte Puissance et, le cas échéant, de sa carte État.</li>
<li>Ils sont obligatoires, à résoudre autant que possible, sauf mention « pouvez ».</li>
<li>Tout le monde résout en même temps. Si l'ordre compte (souvent quand un Effondrement menace), on résout dans l'ordre du tour.</li>
<li>Quand vous avez plusieurs effets, c'est vous qui décidez de leur ordre.</li>
<li>Un effet Solstice qui concerne « chaque autre joueur » est résolu par chacun pendant son propre Solstice, au moment qu'il choisit parmi ses effets.</li>
<li>Un effet marqué <b>Fin du Solstice</b> (mot-clé apparu avec Horizons) se résout après tous vos autres effets Solstice.</li>
<li><b>Pendant le Solstice, ni Action ni capacité Épuiser.</b> Les capacités Passif restent actives.</li></ul>
<p>Ensuite une nouvelle manche commence par le joueur à gauche du jeton Solstice.</p>
<div class="note"><b>Les trois familles d'effets durables.</b> <b>Épuiser</b> : vous décidez, pendant votre ordre Activation, en posant un jeton. <b>Passif</b> : toujours actif tant que la carte est en jeu, y compris pendant une Recherche, une Pacification, le Solstice et le Décompte. <b>Solstice</b> : automatique en fin de manche.</div>`,
quiz:[{q:'Pendant le Solstice, vous aimeriez Épuiser une Région pour gagner des Matériaux. Possible ?',o:['Oui','Non'],a:1,w:'Aucune Action ni capacité Épuiser pendant le Solstice.'},
{q:'Vous avez trois effets Solstice. Qui décide de l\'ordre ?',o:['Le premier joueur','Moi','L\'ordre de pose des cartes'],a:1,w:'Quand plusieurs de vos effets se résolvent en même temps, vous choisissez leur ordre.'}]},

{id:'gloire',part:'Jouer',t:'Instabilités, Régions, Histoire et Gloire',html:`
<p class="lead">Quatre mécaniques qui donnent au jeu sa tension : ce qui vous encombre, ce qui produit, ce que vous archivez, et ce qui rapporte gros.</p>
<h2>Les Instabilités</h2>
<p>Elles n'ont aucun effet utile et diluent votre deck. Si la pile commune se vide, c'est l'Effondrement. Trois façons de vous en défaire :</p>
<ul><li><b>La jouer comme une Action</b> : dépensez un jeton Action puis payez 3 ${R.mat}, ou 1 ${R.pop}, ou défaussez 2 cartes. Elle retourne dans la pile.</li>
<li><b>L'ordre Pacification</b> : tout votre tour y passe, mais vous renvoyez sans rien payer toutes les Instabilités que vous avez en main.</li>
<li><b>Un effet de carte</b> qui dit « Renvoyez une carte Instabilités » : vous ignorez alors le texte de l'Instabilité, donc pas de coût.</li></ul>
<p>Récupérer une Instabilité, c'est la prendre dans la pile commune. Prendre la dernière déclenche l'Effondrement.</p>
<h2>Les Régions et les cartes en jeu</h2>
<ul><li>Une carte permanente reste dans votre zone de jeu jusqu'à ce qu'un effet la retire.</li>
<li><b>Abandonner</b> une Région : elle va dans votre défausse. <b>Rappeler</b> une Région : elle revient dans votre main. Seules les Régions peuvent être Abandonnées ou Rappelées.</li>
<li>Dans les deux cas, les ressources posées dessus reviennent dans votre réserve, et les cartes Réservées dessous suivent la Région. Un jeton Épuisé posé dessus ne retourne pas sur votre carte État avant la fin du tour.</li>
<li><b>Réserver</b> : glissez une carte de votre main, face visible, sous la carte en jeu qui porte ce mot-clé. Une carte Réservée n'est plus en jeu : vous ne pouvez ni la jouer, ni la défausser, ni utiliser ses capacités. Elle compte pourtant au score. C'est un bon moyen d'alléger votre deck.</li></ul>
<h2>L'Histoire</h2>
<p>Archiver une carte dans votre Histoire, c'est la glisser sous votre carte Puissance. Elle sort du jeu pour de bon, mais ses points comptent toujours. Vous pouvez consulter votre Histoire, pas celle des autres. Beaucoup de cartes fortes sont à usage unique et s'archivent après avoir été jouées.</p>
<h2>Gloire et Renommée</h2>
<p>La carte <b>Gloire</b> vous fait Abandonner trois Régions en jeu pour gagner une carte ${R.ren}. Il vous faut donc trois Régions devant vous, et les rejouer vous coûtera des Actions.</p>
<h3>La pioche Renommée et le Roi des rois</h3>
<ul><li>La carte Roi des rois reste toujours tout en bas de la pioche Renommée. Tant qu'il reste des cartes face cachée, Regarder, gagner ou Piocher une Renommée ne concerne que celles-là.</li>
<li>Une carte remise dans cette pioche se replace dessus, sans mélanger.</li>
<li>Quand Roi des rois est la seule carte restante, tout effet qui vous fait gagner ou Piocher une Renommée vous fait <b>résoudre Roi des rois</b> à la place. La première fois dans la partie, on la retourne sur sa face B.</li>
<li>Chaque joueur ne peut la résoudre qu'une seule fois par partie, quelle que soit la face.</li>
<li>Quand la carte finit retournée face cachée, le Décompte est déclenché.</li></ul>`,
quiz:[{q:'Vous jouez une Instabilité de votre main pour vous en débarrasser. Que vous coûte-t-elle ?',o:['Rien','Une Action, plus 3 Matériaux ou 1 Population ou 2 cartes défaussées','Seulement 2 cartes défaussées'],a:1,w:'Il faut l\'Action pour jouer la carte, puis le coût écrit dessus.'},
{q:'Vous Abandonnez une Région qui porte 2 Matériaux et une carte Réservée dessous. Que deviennent-ils ?',o:['Tout est perdu','Les Matériaux vont dans ma réserve, la carte Réservée est défaussée avec la Région','Tout reste en jeu'],a:1,w:'Les ressources reviennent en réserve et la carte Réservée subit le même sort que la Région.'},
{q:'Une carte archivée dans votre Histoire compte-t-elle au score ?',o:['Oui','Non'],a:0,w:'Elle n\'est plus en jeu, mais ses points de victoire comptent.'}]},

{id:'fin',part:'Jouer',t:'Fin de partie et score',html:`
<p class="lead">Deux fins possibles, avec deux façons de désigner le vainqueur.</p>
<div class="grid2">
<div class="nat"><h3>Décompte</h3><p>Déclenché quand :</p><ul><li>la pioche Principale est vide ;</li><li>un joueur Développe la dernière carte de sa zone de Développement, ou remplit la condition propre à sa nation ;</li><li>la carte Roi des rois est retournée face cachée ;</li><li>un effet dit qu'il déclenche la fin de partie.</li></ul><p>On termine la manche en cours, Solstice compris, puis on joue <b>une dernière manche complète</b>, Solstice compris. Ensuite on compte.</p></div>
<div class="nat"><h3>Effondrement</h3><p>Déclenché à l'instant où <b>la pile Instabilités est vide</b>, même si un Décompte était déjà lancé.</p><p>La partie s'arrête immédiatement, l'Action en cours est interrompue. Chacun compte ses Instabilités dans sa main, sa zone de jeu, son deck, sa défausse et son Histoire. Le plus petit total gagne. Égalité : on départage aux points du Décompte.</p></div>
</div>
<h2>Compter ses points</h2>
<p>Laissez les cartes où elles sont : certaines valent des points différents selon leur emplacement. Une même icône ou un même jeton peut servir au calcul de plusieurs cartes. Chaque jeton ${R.prog} de votre réserve vaut 1 point. Le plus grand total gagne ; en cas d'égalité, la victoire est partagée.</p>
<div class="lab"><h3>Atelier : ça compte ou pas ?</h3><p class="hint">Pour chaque ligne, décidez si cela entre dans votre score au Décompte, puis vérifiez.</p>
<div id="cnt"></div><div class="row" style="margin-top:10px"><button type="button" class="pri" id="cntCheck">Vérifier</button></div><div class="out" id="cntOut"></div></div>
<div class="lab"><h3>Atelier : feuille de score</h3>
<div class="row"><label class="f" for="s1">Points des cartes à valeur fixe<input type="number" id="s1" value="24"></label><label class="f" for="s2">Points des cartes variables (10 max chacune)<input type="number" id="s2" value="13"></label><label class="f" for="s3">Points négatifs<input type="number" id="s3" value="2" min="0"></label><label class="f" for="s4">Progrès en réserve<input type="number" id="s4" value="6" min="0"></label></div>
<div class="out" id="sOut"></div></div>`,
quiz:[{q:'Le Décompte vient d\'être déclenché au milieu d\'une manche. Combien de tours vous reste-t-il au maximum ?',o:['Aucun','La fin de cette manche, puis une manche complète','Trois manches'],a:1,w:'On finit la manche en cours avec son Solstice, puis une ultime manche avec son Solstice.'},
{q:'Un Décompte est en cours, et la pile Instabilités se vide. Que se passe-t-il ?',o:['On finit le Décompte normalement','Effondrement : la partie s\'arrête tout de suite','On remélange les Instabilités'],a:1,w:'L\'Effondrement prime, même sur un Décompte déjà déclenché.'}]},

{id:'mots-cles',part:'Approfondir',t:'Tous les mots-clés',html:`
<p class="lead">Sur les cartes, chaque verbe a un sens précis. Cherchez un terme pendant la partie.</p>
<div class="row"><label for="gs">Filtrer</label><input type="search" id="gs" placeholder="Rappeler, Trouver, Passif…"><label><input type="checkbox" id="gh"> Afficher aussi les termes réservés à Horizons</label></div>
<dl class="glo" id="glo"></dl>`,
quiz:[{q:'« Trouvez » une carte : dans quel ordre fouillez-vous ?',o:['Deck, défausse, main','Main, défausse, deck, pioche Nation','Pioche Nation d\'abord'],a:1,w:'Main, puis défausse, puis deck, puis pioche Nation (jamais l\'Avènement). Vous vous arrêtez dès que vous trouvez, et vous mélangez le deck ou la pioche Nation si vous les avez fouillés.'},
{q:'« Piochez 2 cartes, si possible. » Votre deck contient 1 carte. Que faites-vous ?',o:['Je pioche 1 carte, je mélange, je pioche la 2e','Je pioche 1 carte et je m\'arrête','Je ne pioche rien'],a:1,w:'« Si possible » interdit le mélange de la défausse.'}]},

{id:'nations',part:'Approfondir',t:'Les huit nations d\'Antique',html:`
<p class="lead">Chaque deck se joue différemment. Les étoiles indiquent la complexité selon le livret : commencez par une nation à une étoile.</p>
<div class="grid2" id="nats"></div>
<h2>Précisions sur des cartes d'Antique</h2>
<ul><li><b>Voie sacrée</b> : vous ne pouvez pas vous en servir pour ajouter votre carte Avènement à votre deck.</li>
<li><b>Sumériens</b> : son effet de renvoi d'Instabilités s'applique quand un Décompte est déclenché, depuis n'importe quelle zone comptée au score. Il ne se déclenche pas si la partie finit par un Effondrement, et n'empêche pas celui-ci.</li></ul>`,
quiz:[{q:'Quelle particularité des Vikings met fin à la partie ?',o:['Atteindre l\'État Empire','L\'ajout de leur carte Zénith à leur défausse','Développer leur dernière carte'],a:1,w:'Les Vikings ne deviennent jamais Empire et n\'ont pas de Développements. Leur carte du fond de pioche Nation, le Zénith, déclenche la fin de partie.'}]},

{id:'variantes',part:'Approfondir',t:'Variantes',html:`
<p class="lead">Quatre réglages pour adapter la partie, et un mode d'apprentissage en solitaire.</p>
<h2>Mode Entraînement (seul, sans adversaire)</h2>
<p>Idéal pour une première prise en main ou pour découvrir une nation.</p>
<ol><li>Faites la mise en place comme pour 2 joueurs.</li><li>Exilez les 15 premières cartes de la pioche Principale.</li><li>Mettez 12 jetons Progrès près du Marché : c'est votre sablier.</li><li>Jouez vos tours normalement.</li>
<li>Au Nettoyage, le Progrès posé sur le Marché vient de ce sablier. Ensuite vous pouvez Exiler une carte du Marché, pour simuler un adversaire qui se sert.</li><li>Résolvez vos effets Solstice après chaque tour.</li><li>La partie dure 12 tours, ou s'arrête si un effet déclenche la fin.</li></ol>
<p>Repères du livret : 50 points, vous maîtrisez les bases ; 90 points, c'est un exploit.</p>
<h2>Variante Pacifiste</h2>
<p>Lors de la mise en place, mettez de côté les cartes communes marquées de l'icône d'Attaque. Une fois le Marché formé, mélangez-les dans la pioche Principale. Les Attaques arrivent ainsi plus tard.</p>
<h2>Variante Cartes précieuses</h2>
<p>Au Nettoyage, vous ne pouvez plus Défausser de cartes de votre main. La gestion des Instabilités devient bien plus serrée.</p>
<h2>Variante Partie rapide</h2>
<p>Environ 15 minutes de moins par joueur.</p>
<ul><li>Une fois le Marché en place, Exilez les 10 premières cartes de la pioche Principale.</li><li>Chaque joueur défausse les 2 premières cartes de sa pioche Nation : elles font donc partie de son deck dès le premier mélange.</li>
<li>Quand vous ajoutez votre Avènement à votre défausse, choisissez une de vos cartes Développement et retirez-la de la partie.</li><li>Au Décompte, on termine la manche en cours et son Solstice, sans manche supplémentaire.</li></ul>
<h2>Variante Mise en place rapide</h2>
<p>Pour joueurs expérimentés : mélangez toutes les cartes du Marché ensemble au lieu de les trier, formez les pioches au bon nombre de cartes et retournez une carte de chacune. Certaines nations auront du mal à trouver les catégories dont elles ont besoin.</p>`,
quiz:[{q:'En mode Entraînement, quand la partie se termine-t-elle normalement ?',o:['Quand la pioche Principale est vide','Après 12 tours, quand le sablier de 12 Progrès est épuisé','Après 20 tours'],a:1,w:'Un Progrès du sablier part au Marché à chaque Nettoyage : 12 jetons, 12 tours.'}]},

{id:'solo',part:'Approfondir',t:'Jouer seul contre la C.I.V.',html:`
<p class="lead">La C.I.V. (Civilisation Interactive Virtuelle) est un adversaire automatique. Elle ne lit pas le texte de ses cartes : c'est le tableau de sa carte État qui dit quoi faire.</p>
<div class="note"><b>Raccourci.</b> L'onglet Jouer en solo applique tout ce qui suit à votre place : vous n'avez plus qu'à suivre ses consignes.</div>
<h2>Mise en place</h2>
<ol><li>Installez votre nation et le Marché comme pour 2 joueurs.</li><li>Posez les marqueurs d'emplacement 1 à 5 sous les cinq cartes du Marché (voir les niveaux de difficulté).</li>
<li>Choisissez la nation de la C.I.V. Ses cartes Instabilités de départ rejoignent la pile commune. Sa carte Puissance ne sert qu'à abriter son Histoire.</li>
<li>Formez sa <b>pioche Dynastie</b> : les Développements classés par valeur, les plus forts au-dessus ; par-dessus l'Avènement face visible ; par-dessus les cartes Nation mélangées, face cachée.</li>
<li>Mélangez ses cartes de départ, placez-en une face cachée sous chaque marqueur. Le reste forme le deck C.I.V.</li><li>Posez sa carte État du côté Barbare. La C.I.V. n'utilise ni jetons Action ni jetons Épuisé.</li></ol>
<h2>Une manche</h2>
<p>Vous jouez votre tour normalement, puis la C.I.V. joue le sien, puis vous résolvez vos effets Solstice. La C.I.V. ignore le Solstice.</p>
<h3>Le tour de la C.I.V.</h3>
<ol><li>Lancez le dé et posez-le sur la carte de l'emplacement correspondant : elle ne sera pas résolue ce tour. Si aucun emplacement ne correspond, toutes les cartes sont résolues.</li>
<li>Résolvez les autres cartes dans l'ordre croissant des emplacements. Pour chacune : retournez-la, cherchez dans le tableau la <b>première ligne en partant du haut</b> qui correspond à son nom, son type ou sa catégorie, et appliquez-la autant que possible. Le texte en gras vous concerne, le reste concerne la C.I.V.</li>
<li>Si rien de la ligne ne peut être résolu, passez à la ligne suivante qui correspond. Dès qu'une partie de l'effet se résout, c'est terminé pour cette carte : un seul effet par carte.</li>
<li>La carte va ensuite dans la défausse de la C.I.V., sauf indication contraire. La première ligne concerne toujours les Instabilités : en général, retour dans la pile.</li></ol>
<h3>Son Nettoyage</h3>
<ol><li>Ajoutez 1 Progrès sur la carte du Marché située au-dessus de la carte non résolue. Rien si le dé indiquait 6. Contre les Carthaginois, ce sont 2 Matériaux à la place.</li>
<li>Glissez la carte non résolue à l'emplacement 1, face cachée, puis complétez les autres emplacements depuis le deck C.I.V.</li>
<li>Deck vide au moment de compléter : la première carte de la pioche Dynastie va dans sa défausse, qu'on mélange pour refaire le deck. Quand c'est l'Avènement, retournez sa carte État et utilisez le nouveau tableau.</li></ol>
<h2>Comment elle choisit</h2>
<ul><li><b>Acquérir ou Innover</b> : la carte du Marché qui vaut le plus de points ; à égalité celle qui porte le plus de jetons ; puis le plus petit numéro d'emplacement. Chaque Progrès posé sur une carte la fait valoir 1 point de plus à ses yeux.</li>
<li>Les cartes qu'elle gagne vont <b>sur son deck</b> : la carte d'abord, l'Instabilité par-dessus.</li>
<li>Si elle doit Innover sans carte valide, elle prend la première de la pioche concernée ; si c'est impossible, elle gagne 2 Progrès.</li>
<li><b>Exiler</b> : le plus petit emplacement sans jeton. <b>Abandonner / Rappeler</b> : sa Région jouée en dernier (vers sa défausse, ou sur son deck).</li>
<li>Elle ne mélange sa défausse que pendant son Nettoyage.</li>
<li>Elle ignore vos effets qui lui feraient Défausser ou Renvoyer une Instabilité. Tout effet de sa part qui vous donne une Instabilité, vous vole, vous fait défausser, Abandonner ou Rappeler compte comme une Attaque : vos protections fonctionnent.</li>
<li>Pour elle, une carte à points variables vaut 5, et une carte conditionnelle vaut son maximum.</li></ul>
<h2>Fin de partie</h2>
<p>Mêmes déclencheurs qu'à plusieurs, plus deux : la pioche Dynastie est épuisée, ou la C.I.V. gagne Roi des rois. <b>Si la partie finit par un Effondrement, vous perdez.</b> Au Décompte, la C.I.V. marque 1 point par Progrès, 1 point par groupe de 10 Matériaux et Population confondus, et les points de ses cartes (main, jeu, deck, défausse, Histoire ; pas la pioche Dynastie ni sa carte Puissance). Il vous faut strictement plus de points qu'elle.</p>
<h2>Cinq niveaux de difficulté</h2>
<div class="tw"><table><tr><th>Niveau</th><th>Réglage</th></tr>
<tr><td>Chef de clan</td><td>4 emplacements seulement ; un 5 ou un 6 au dé ne couvre rien. Conseillé pour débuter.</td></tr>
<tr><td>Seigneur de guerre</td><td>Comme Chef de clan, et à la fin de son tour la première carte du deck C.I.V. est défaussée.</td></tr>
<tr><td>Imperator</td><td>Les règles standard, 5 emplacements.</td></tr>
<tr><td>Souverain</td><td>La C.I.V. démarre avec 3 Matériaux, 2 Population, 1 Progrès et marque 1 point par groupe de 5 ressources.</td></tr>
<tr><td>Suzerain</td><td>Comme Souverain, avec un 6e emplacement : 5 effets à chaque tour.</td></tr></table></div>
<p><b>Campagne</b> : gardez la même nation et montez d'un niveau à chaque victoire. Cinq victoires pour gagner, quatre défaites pour perdre. Après une victoire, ajoutez à votre deck de départ une carte commune gagnée pendant la partie, ou retirez une carte de votre deck de départ. Après une défaite, la partie suivante commence avec le double de ressources.</p>
<div class="note"><b>Avec votre boîte.</b> Utilisez les cartes État de la C.I.V. fournies dans Antique pour vos huit nations. Le mot-clé Résoudre n'apparaît que sur des cartes État d'Horizons.</div>`,
quiz:[{q:'Une carte de la C.I.V. correspond à deux lignes de son tableau. Laquelle appliquez-vous ?',o:['Les deux','La plus haute, et la suivante seulement si rien de la première ne peut être résolu','Celle de votre choix'],a:1,w:'Un seul effet par carte : la ligne la plus haute dont au moins une partie peut être résolue.'},
{q:'En solo, la pile Instabilités se vide. Résultat ?',o:['On compare les Instabilités','Je perds automatiquement','Je gagne automatiquement'],a:1,w:'Contre la C.I.V., un Effondrement est toujours une défaite pour vous.'}]},

{id:'bilan',part:'Approfondir',t:'Bilan et aide-mémoire',html:`
<p class="lead">Dix questions pour vérifier que tout tient, puis les rappels à garder près de la table.</p>
<div id="finalscore" class="out"></div>
<h2>Aide-mémoire</h2>
<ol><li>1 Progrès paie 1 Population ou 2 Matériaux.</li><li>Une même carte ne se joue qu'une fois par tour en Action gratuite.</li><li>Chaque joueur ne résout Roi des rois qu'une fois par partie.</li><li>Ni Action ni capacité Épuiser pendant le Solstice.</li><li>Une carte à points variables plafonne à 10, carte Puissance comprise.</li><li>Les effets Solstice se résolvent simultanément.</li><li>Innover dans la pioche Principale : seulement pour un Vassal ou une catégorie dont la pioche est vide.</li><li>Le Marché compte toujours 5 cartes, complétées aussitôt.</li><li>Acquérir dans la pile Exil une carte autre qu'une Région fait aussi Récupérer une Instabilité.</li><li>Une icône Considérée comme une autre n'est plus l'icône d'origine, jusqu'à la fin du tour.</li><li>À la fin de votre tour : 1 Progrès du stock sur une carte du Marché.</li><li>Seules les Régions peuvent être Rappelées ou Abandonnées.</li></ol>
<h2>Le tour en une ligne</h2>
<p>Choisissez Activation, Recherche ou Pacification. Puis Nettoyage : Progrès au Marché, jetons récupérés, défausse libre, pioche à 5. Fin de manche : Solstice.</p>`,
quiz:[
{q:'Combien de jetons avez-vous en général au début de votre tour ?',o:['3 Actions et 5 Épuisé','5 Actions et 3 Épuisé','4 de chaque'],a:0,w:'3 jetons Action et 5 jetons Épuisé sur votre carte État.'},
{q:'Laquelle de ces actions n\'est pas un des trois ordres ?',o:['Activation','Pacification','Expansion'],a:2,w:'Les trois ordres sont Activation, Recherche et Pacification.'},
{q:'Vous Acquérez une Région au Marché. Recevez-vous une Instabilité ?',o:['Oui','Non, les Régions n\'en ont pas dessous'],a:1,w:'Aucune Instabilité n\'est glissée sous une Région.'},
{q:'Quelle est votre limite de main par défaut ?',o:['4','5','7'],a:1,w:'Cinq cartes, sauf effet contraire.'},
{q:'Votre pioche Nation est vide et vous mélangez votre défausse. Que pouvez-vous ajouter ?',o:['Rien','Une carte Développement, en payant son coût','Une carte du Marché'],a:1,w:'Vous choisissez une carte de votre zone de Développement et vous en payez le coût.'},
{q:'Que fait la carte Gloire ?',o:['Elle donne 3 Régions','Elle fait Abandonner 3 Régions en jeu pour gagner une Renommée','Elle retire 3 Instabilités'],a:1,w:'Trois Régions en jeu partent en défausse en échange d\'une carte Renommée.'},
{q:'Une carte Réservée sous une Région est-elle « en jeu » ?',o:['Oui','Non, mais elle compte au score'],a:1,w:'Elle n\'est plus dans votre zone de jeu : ni capacité, ni défausse possible, mais ses points comptent.'},
{q:'Les cartes restées dans votre pioche Nation à la fin comptent-elles au score ?',o:['Oui','Non'],a:1,w:'Ni la pioche Nation ni la zone de Développement ne comptent.'},
{q:'Quand le Solstice a-t-il lieu ?',o:['Au début de chaque tour','À la fin de chaque manche, quand tous ont joué','Une fois par partie'],a:1,w:'C\'est la toute dernière étape de chaque manche.'},
{q:'Combien vaut un jeton Progrès de votre réserve au Décompte ?',o:['0 point','1 point','2 points'],a:1,w:'1 point par Progrès en réserve. Ceux posés sur des cartes ne comptent pas.'}]}
];
