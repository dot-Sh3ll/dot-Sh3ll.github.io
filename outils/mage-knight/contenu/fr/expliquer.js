const EXPL={
ui:{ecran:'Écran {n} sur {t}',precedent:'Précédent',suivant:'Suivant',voirPlus:'Pour plus tard',voirAide:'Afficher l\'aide-mémoire',debut:'Revenir au début',
  aide:'Aide-mémoire',aideTitre:'Votre tour, en un coup d\'œil',plus:'Pour plus tard',plusTitre:'Gardez-le pour plus tard',
  plusIntro:'Inutile d\'en parler avant le premier tour. Expliquez chaque point quand la partie le rencontre.',
  pleinEcran:'Plein écran',fleches:'Flèches du clavier pour avancer.',dire:'À dire',piege:'Piège à signaler'},
ecrans:[
{t:'La Mission de Reconnaissance',
 html:`<p class="big1">Vous incarnez un Mage Knight : vous explorez, combattez et gagnez en puissance. Le plus Glorieux l'emporte.</p>
 <div class="quad"><div><h3>3 Manches</h3><p>4 en solo.</p></div><div><h3>+1 Gloire</h3><p>Par tuile révélée.</p></div><div><h3>Pas d'Élite</h3><p>Aucune Unité d'Élite.</p></div><div><h3>La Cité</h3><p>On n'y entre pas. Quand sa tuile est révélée, chacun joue un dernier tour.</p></div></div>`,
 dire:'« Explorez, battez des ennemis, gagnez de la Gloire. La partie s\'arrête quand on trouve la Cité. »'},
{t:'Vos cartes font tout',
 html:`<p class="big1">Deck de 16 cartes, main de 5. Les effets de même nature s'additionnent : jouez autant de cartes que vous voulez.</p>
 <div class="trio"><div><h3>Effet de base</h3><p>En haut de la carte. Gratuit.</p></div><div><h3>Effet amélioré</h3><p>En bas. Coûte un mana de la couleur de la carte.</p></div><div><h3>Inclinée</h3><p>N'importe quelle carte vaut 1 Mouvement, 1 Influence, 1 Attaque ou 1 Parade.</p></div></div>`,
 dire:'« Même une carte qui ne sert à rien maintenant vaut 1 point si vous la tournez. »',
 piege:'Une carte ne sert qu\'une fois par tour, pour un seul de ses effets.'},
{t:'Le mana',
 html:`<p class="big1">Quatre couleurs fondamentales : rouge, bleu, blanc, vert. Plus l'or, qui remplace n'importe laquelle le Jour, et le noir, qui ne sert que la Nuit.</p>
 <div class="trio"><div><h3>Source</h3><p>Un seul dé par tour, relancé à la fin de votre tour.</p></div><div><h3>Jeton</h3><p>Perdu à la fin du tour s'il n'a pas servi.</p></div><div><h3>Cristal</h3><p>Se garde. Trois par couleur au plus.</p></div></div>`,
 dire:'« Un seul dé de la Source par tour : les Cristaux sont votre réserve. »'},
{t:'Votre tour',
 html:`<div class="flow"><div>Se déplacer<small>facultatif</small></div><span aria-hidden="true">→</span><div>Une seule action<small>combattre, interagir, entrer dans un site d'aventures</small></div><span aria-hidden="true">→</span><div>Fin du tour<small>défausser les cartes jouées, piocher jusqu'à la Limite</small></div></div>
 <div class="duo"><div><h3>Ou bien : se reposer</h3><p>Ni déplacement ni action. Défaussez une carte et autant de Blessures que vous voulez.</p></div><div><h3>Après l'action</h3><p>Plus aucun déplacement.</p></div></div>`,
 dire:'« D\'abord on bouge, ensuite on agit. Après l\'action, plus de déplacement. »',
 piege:'Chaque tour, il faut jouer ou défausser au moins une carte.'},
{t:'Se déplacer et explorer',
 html:`<ul class="tags"><li>Plaine <b>2</b></li><li>Collines <b>3</b></li><li>Forêt <b>3</b> · Nuit 5</li><li>Terres désolées <b>4</b></li><li>Désert <b>5</b> · Nuit 3</li><li>Marais <b>5</b></li><li>Lac, montagne : infranchissables</li></ul>
 <p class="big1">Révéler une tuile coûte 2, depuis une case voisine de son emplacement. Vous alternez librement déplacements et explorations.</p>`,
 dire:'« Explorer rapporte ici 1 Gloire par tuile : c\'est le cœur de ce scénario. »',
 piege:'Finir son tour sur une case non sûre (terrain inaccessible, site fortifié non conquis, case d\'un autre Héros) provoque une Retraite forcée : une Blessure par case reculée.'},
{t:'Le combat en quatre phases',
 html:`<ol class="steps"><li><b>Distance et Siège</b> : seules ces Attaques comptent. Un ennemi vaincu ici ne riposte pas.</li><li><b>Parade</b> : égalez ou dépassez son Attaque, sinon elle ne réduit rien.</li><li><b>Dégâts</b> : un ennemi ni vaincu ni paré vous frappe.</li><li><b>Attaque</b> : toutes vos Attaques comptent. Atteignez son Armure en une seule attaque.</li></ol>`,
 dire:'« Une Parade, c\'est tout ou rien. Une Attaque aussi : rien ne se reporte au tour suivant. »',
 piege:'Contre un ennemi Fortifié, seul le Siège compte en première phase. Les défenseurs d\'une Forteresse ou d\'une Tour de Mage le sont toujours.'},
{t:'Blessures, Repos et Soin',
 html:`<p class="big1">Les Dégâts non parés vont à une Unité (elle absorbe son Armure) ou au Héros : une Blessure par tranche d'Armure, arrondi au supérieur.</p>
 <div class="trio"><div><h3>Blessure</h3><p>Elle reste en main : elle ne se joue pas, ne s'incline pas, ne se défausse pas en fin de tour.</p></div><div><h3>Repos</h3><p>Il renvoie des Blessures dans la défausse.</p></div><div><h3>Soin</h3><p>Il les retire pour de bon.</p></div></div>`,
 dire:'« Une Blessure, c\'est une carte morte dans votre main. Soignez-vous avant qu\'elles s\'accumulent. »',
 piege:'Pas de Soin pendant un combat. Assommé : autant de Blessures que votre Limite de main non modifiée dans un même combat, et vous défaussez toutes vos autres cartes.'},
{t:'Interagir et recruter',
 html:`<p class="big1">Interagir est votre action du tour, sur un Village ou un Monastère par exemple. Additionnez votre Influence, puis appliquez une fois votre Réputation.</p>
 <div class="duo"><div><h3>Recruter une Unité</h3><p>L'icône du site doit figurer sur sa carte, et il faut un jeton Commandement libre.</p></div><div><h3>Se soigner</h3><p>3 Influence le point de Soin au Village, 2 au Monastère.</p></div></div>`,
 dire:'« Les Unités se battent avec vous et encaissent les coups à votre place. »'},
{t:'Monter de Niveau',
 html:`<div class="flow"><div>3</div><span aria-hidden="true">→</span><div>8</div><span aria-hidden="true">→</span><div>15</div><span aria-hidden="true">→</span><div>24<small>de Gloire</small></div></div>
 <div class="duo"><div><h3>Niveaux pairs</h3><p>Une Compétence et une Action Avancée.</p></div><div><h3>Niveaux impairs</h3><p>L'Armure ou la Limite de main augmente, et un jeton Commandement en plus.</p></div></div>
 <p>Le Niveau change à la fin du tour. Toute nouvelle carte va sur le dessus de votre Deck.</p>`,
 dire:'« Chaque ennemi vaincu vous rend plus fort, et vos nouvelles cartes se piochent en premier. »'},
{t:'La Manche, le Jour et la Nuit',
 html:`<p class="big1">Le Deck n'est jamais remélangé en cours de Manche. Deck vide au début de votre tour : vous pouvez annoncer la fin de la Manche, et les autres jouent un dernier tour.</p>
 <div class="duo"><div><h3>Tactiques</h3><p>Chaque Manche, une carte Tactique fixe l'ordre de jeu : le plus petit numéro commence.</p></div><div><h3>Jour et Nuit</h3><p>Ils alternent. La Nuit change les terrains et le mana.</p></div></div>`,
 dire:'« Votre Deck ne revient qu\'à la fin de la Manche : chaque carte jouée compte. »'}],
plus:[
['Feu, Glace et Résistances','Au premier ennemi qui résiste à un élément.'],
['Capacités des ennemis','On lit le jeton au moment du combat.'],
['Combattre plusieurs ennemis','Quand un déplacement en provoque deux.'],
['Assaut d\'une Forteresse ou d\'une Tour de Mage','Avant le premier assaut (−1 Réputation, garnison Fortifiée).'],
['Sorts','À la première Tour de Mage conquise ou au premier Sort gagné.'],
['Artefacts et Bannières','À la première récompense.'],
['Antre, Donjon, Ruines','À l\'arrivée sur le site.'],
['Compétences','Au premier Niveau pair.'],
['En solo : le joueur Fantôme','Le Compagnon de partie s\'en occupe.'],
['Cités, combat entre joueurs, coopération, extensions','Pour les scénarios suivants.']],
aide:`<div><h3>Votre tour</h3><ul><li>Se déplacer, puis une action : combat, interaction, aventure.</li><li>Ou se reposer.</li></ul></div>
<div><h3>Cartes</h3><ul><li>Effet de base gratuit, amélioré contre un mana de sa couleur.</li><li>Inclinée = 1 Mouvement, Influence, Attaque ou Parade.</li></ul></div>
<div><h3>Mana</h3><ul><li>1 dé de la Source par tour.</li><li>Jetons perdus en fin de tour ; Cristaux gardés (3 par couleur).</li></ul></div>
<div><h3>Terrains</h3><ul><li>Plaine 2 · Collines 3 · Forêt 3 (Nuit 5)</li><li>Terres désolées 4 · Désert 5 (Nuit 3) · Marais 5</li><li>Explorer une tuile : 2</li></ul></div>
<div><h3>Combat</h3><ul><li>Distance et Siège → Parade → Dégâts → Attaque.</li><li>L'Armure en un seul coup.</li></ul></div>
<div><h3>Blessures · Niveaux</h3><ul><li>1 Blessure par tranche d'Armure ; Repos pour les défausser, Soin pour les retirer.</li><li>Niveaux : 3, 8, 15, 24 ; pair = Compétence + Action Avancée ; impair = Armure ou Limite + jeton Commandement.</li></ul></div>
<div><h3>Fin de Manche</h3><ul><li>Deck vide : vous pouvez l'annoncer.</li><li>Les autres jouent un dernier tour.</li></ul></div>
<div><h3>Reconnaissance</h3><ul><li>+1 Gloire par tuile révélée.</li><li>Tuile Cité révélée : un dernier tour pour chacun.</li></ul></div>`
};

EXPL.chantier={k:'En cours de rédaction',t:'Section en chantier',p:'Ce mode est en cours de rédaction. Revenez bientôt !'};
