const EXPL={
ui:{ecran:'Écran {n} sur {t}',precedent:'Précédent',suivant:'Suivant',voirPlus:'Pour plus tard',voirAide:'Afficher l\'aide-mémoire',debut:'Revenir au début',
  aide:'Aide-mémoire',aideTitre:'Votre tour, en un coup d\'œil',plus:'Pour plus tard',plusTitre:'Gardez-le pour plus tard',
  plusIntro:'Inutile d\'en parler avant le premier tour. Expliquez chaque point quand la partie le rencontre.',
  pleinEcran:'Plein écran',fleches:'Flèches du clavier pour avancer.',dire:'À dire',piege:'Piège à signaler'},
ecrans:[
{t:'Puerto Rico en une phrase',
 html:`<p class="big1">Vous dirigez une exploitation : vous plantez, recrutez, produisez, vendez et expédiez. Le plus de points de victoire (PV) à la fin l'emporte.</p>
 <div class="trio"><div><h3>Expédier</h3><p>Des jetons PV pour chaque baril chargé sur un navire.</p></div><div><h3>Construire</h3><p>Les PV imprimés sur vos bâtiments.</p></div><div><h3>Grands bâtiments</h3><p>Un bonus s'ils sont occupés à la fin.</p></div></div>`,
 dire:'« On joue une quinzaine de tours. À chaque tour, on choisit un personnage, et tout le monde fait son action. »'},
{t:'Votre domaine',
 html:`<div class="duo"><div><h3>12 cases Parcelles</h3><p>En haut : plantations et Carrières.</p></div><div><h3>12 cases Ville</h3><p>En bas : bâtiments.</p></div></div>
 <p class="big1">Le Portrait garde vos Pesos, vos barils et les ouvriers sans place. Chaque demi-cercle accueille 1 ouvrier : une tuile avec au moins 1 ouvrier est <b>occupée</b>, et seules les tuiles occupées fonctionnent.</p>`,
 dire:'« Une tuile sans ouvrier ne sert à rien. Tout le jeu consiste à remplir vos demi-cercles. »'},
{t:'Cinq marchandises',
 html:`<div class="flow"><div>Maïs<small>vente 0</small></div><div>Fruits<small>vente 1</small></div><div>Sucre<small>vente 2</small></div><div>Tabac<small>vente 3</small></div><div>Café<small>vente 4</small></div></div>
 <div class="duo"><div><h3>Maïs</h3><p>Une plantation occupée suffit, sans bâtiment.</p></div><div><h3>Les quatre autres</h3><p>La plantation occupée <b>et</b> une place occupée dans le bâtiment du même type.</p></div></div>`,
 dire:'« Plus une marchandise rapporte, plus elle demande de bâtiments. »'},
{t:'Choisir un personnage',
 html:`<p class="big1">Le Gouverneur choisit un personnage et agit en premier, avec le <b>privilège</b>. Puis chacun, dans le sens horaire, fait la même action sans le privilège.</p>
 <div class="duo"><div><h3>Un personnage chacun</h3><p>Le joueur suivant choisit parmi ceux qui restent. Choisir est obligatoire, agir est facultatif (sauf pour le Capitaine).</p></div><div><h3>Fin du tour</h3><p>1 Peso sur chaque personnage non choisi. La carte Gouverneur passe à gauche.</p></div></div>
 <p>L'Aventurier rapporte 1 Peso à celui qui le prend. Les autres ne font rien.</p>`,
 dire:'« Quand vous choisissez un personnage, tout le monde joue la phase. Vous seul en profitez davantage. »',
 piege:'Prendre un personnage qui avantage les autres plus que vous. Prendre l\'Aventurier sert aussi à leur refuser une phase.'},
{t:'Paysan et Recruteur',
 html:`<div class="duo"><div><h3>Paysan</h3><p>Chacun prend une plantation visible. Le Paysan peut prendre une Carrière à la place.</p></div><div><h3>Recruteur</h3><p>Il prend 1 ouvrier de la réserve, puis le Registre se distribue à tour de rôle. Chacun pose ou déplace librement ses ouvriers.</p></div></div>
 <p class="big1">C'est le seul moment où les ouvriers bougent.</p>`,
 dire:'« Une nouvelle tuile arrive vide. Elle ne travaillera qu\'après le prochain Recruteur. »'},
{t:'Bâtisseur',
 html:`<p class="big1">Chacun peut acheter 1 bâtiment à la Banque et le pose sur une case Ville.</p>
 <div class="trio"><div><h3>−1 Peso</h3><p>Pour le Bâtisseur (privilège).</p></div><div><h3>−1 par Carrière</h3><p>Chaque Carrière occupée fait encore baisser le prix.</p></div><div><h3>Un seul exemplaire</h3><p>Jamais deux fois le même bâtiment. Il arrive sans ouvrier.</p></div></div>`,
 dire:'« Les bâtiments beiges tordent les règles à votre avantage : lisez la tuile avant d\'acheter. »'},
{t:'Producteur et Marchand',
 html:`<div class="duo"><div><h3>Producteur</h3><p>Tout le monde produit. Pour chaque marchandise : le plus petit des deux nombres, plantations occupées ou places occupées dans le bâtiment. Le Producteur reçoit 1 baril de plus.</p></div><div><h3>Marchand</h3><p>Chacun peut vendre 1 baril à la Maison de Commerce. Le Marchand gagne 1 Peso de plus. 4 places, jamais deux barils du même type.</p></div></div>`,
 dire:'« Le Producteur fait produire tout le monde. Choisissez-le quand vous en profitez plus que les autres. »'},
{t:'Capitaine : charger',
 html:`<p class="big1">À tour de rôle, plusieurs fois, jusqu'à ce que plus personne ne puisse charger.</p>
 <ol class="steps"><li>Si vous pouvez charger, vous <b>devez</b> charger.</li><li>Un seul type de marchandise par tour, et le maximum possible.</li><li>Un navire ne porte qu'un type, et deux navires jamais le même.</li></ol>
 <p>1 PV par baril. Le Capitaine gagne 1 PV de plus, une fois.</p>`,
 dire:'« Au Capitaine, on n\'a pas le choix : si un baril peut monter, il monte. »',
 piege:'Charger est obligatoire. Personne ne garde ses barils « pour plus tard » s\'il reste de la place.'},
{t:'Capitaine : ce qu\'on garde',
 html:`<p class="big1">Quand plus personne ne peut charger, chacun ne garde qu'<b>1 baril</b> sur son Portrait. Les autres retournent à la réserve.</p>
 <div class="duo"><div><h3>Entrepôts</h3><p>Ils permettent de garder en plus tous les barils d'un ou plusieurs types.</p></div><div><h3>Navires</h3><p>Les navires pleins sont vidés. Les autres gardent leur cargaison.</p></div></div>`,
 dire:'« Après le Capitaine, vous perdez presque tout ce qui n\'est pas parti. »',
 piege:'C\'est la règle que les débutants découvrent trop tard. Le stockage n\'est vérifié qu\'à ce moment-là.'},
{t:'Fin de partie',
 html:`<p class="big1">La partie s'arrête à la fin du tour où l'un de ces trois cas arrive :</p>
 <div class="trio"><div><h3>Ouvriers</h3><p>Pas assez d'ouvriers pour remplir le Registre.</p></div><div><h3>Ville pleine</h3><p>Un joueur remplit ses 12 cases Ville.</p></div><div><h3>Jetons PV</h3><p>Le dernier jeton PV est pris.</p></div></div>
 <p>Score : jetons PV + PV imprimés des bâtiments + bonus des grands bâtiments occupés. Égalité : le plus de Pesos et de barils.</p>`}],
plus:[
['Les petits bâtiments beiges','Au premier achat : on lit la tuile ensemble.'],
['Les grands bâtiments','Quand un joueur approche des 10 Pesos.'],
['Le plafond des Carrières par rangée','Au premier Bâtisseur.'],
['Le navire vide qui prend le plus de barils','Au premier Capitaine.'],
['Le remplissage du Registre','À la fin du premier Recruteur.'],
['Une marchandise épuisée','Quand la réserve d\'un type se vide.'],
['La partie à deux et les extensions','Seulement si vous y jouez.']],
aide:`<div><h3>Votre tour</h3><ul><li>Choisissez un personnage.</li><li>Tout le monde fait l'action, vous avez le privilège.</li></ul></div>
<div><h3>Paysan · Recruteur</h3><ul><li><b>Paysan</b> : 1 plantation chacun ; Carrière possible pour lui.</li><li><b>Recruteur</b> : +1 ouvrier de la réserve pour lui, puis le Registre à tour de rôle ; déplacements libres.</li></ul></div>
<div><h3>Bâtisseur</h3><ul><li>1 bâtiment chacun.</li><li>−1 pour lui, −1 par Carrière occupée (plafond selon la rangée).</li></ul></div>
<div><h3>Producteur · Marchand</h3><ul><li><b>Producteur</b> : tout le monde produit ; +1 baril pour lui.</li><li><b>Marchand</b> : 1 vente chacun, +1 Peso pour lui ; 4 places, pas de doublon.</li></ul></div>
<div><h3>Capitaine</h3><ul><li>Charger est obligatoire, 1 PV par baril, +1 PV pour lui.</li><li>Puis 1 baril gardé, plus les entrepôts.</li></ul></div>
<div><h3>Aventurier · Fin</h3><ul><li><b>Aventurier</b> : 1 Peso pour lui, rien pour les autres.</li><li><b>Fin</b> : Registre impossible à remplir, Ville pleine ou dernier jeton PV ; on finit le tour.</li></ul></div>`
};

EXPL.chantier={k:'Work in progress',t:'Under construction',p:'This mode is still being written. Check back soon!'};
