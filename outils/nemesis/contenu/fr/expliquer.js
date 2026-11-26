const EXPL={
ui:{ecran:'Écran {n} sur {t}',precedent:'Précédent',suivant:'Suivant',voirPlus:'Pour plus tard',voirAide:'Afficher l\'aide-mémoire',debut:'Revenir au début',
  aide:'Aide-mémoire',aideTitre:'Résumé de ce que vous pouvez faire en un tour',plus:'Pour plus tard',plusTitre:'Gardez-le pour plus tard',
  plusIntro:'Inutile d\'en parler avant le premier tour. Expliquez chaque point quand la partie le rencontre.',
  pleinEcran:'Plein écran',fleches:'Flèches du clavier pour avancer.',dire:'À dire',piege:'Piège à signaler'},
ecrans:[
{t:'Nemesis en une phrase',
 dire:'« Vous êtes un Marine envoyé dans un complexe extraterrestre infesté. Le jeu est semi-coopératif : il peut y avoir plusieurs gagnants, ou aucun. Vous jouez ensemble, mais chacun pour soi : l\'entraide est souvent vitale, pas obligatoire. »',
 html:`<ol class="steps etiq"><li data-l="Étape 1">Choisir l'objectif que vous désirez accomplir.</li><li data-l="Étape 2">Sortir du complexe, ou hiberner, selon ce que vous demandera votre mission.</li></ol>`},
{t:'Mission et objectifs',
 dire:'« L\'escouade a une mission, visible de tous. Mais chacun de vous a aussi deux objectifs cachés. Une fois dans la partie, à votre tour, vous en garderez un et vous retirerez l\'autre. Et les premiers à se décider auront une petite récompense. »',
 html:`<div class="trio"><div><h3>Mission de l'escouade</h3><p>Visible de tous.</p></div><div><h3>Deux objectifs cachés</h3><p>Un personnel, un de mission.</p></div><div><h3>Choisir</h3><p>Pendant votre tour, à un moment de la partie, vous choisissez l'objectif que vous vous engagez à accomplir, et vous défaussez l'autre.</p></div></div>`},
{t:'Anatomie du plateau',
 dire:'« En bas de votre plateau, votre santé : En forme, Affaibli, État critique. Plus vous êtes faible, plus un mauvais coup d\'un monstre peut vous tuer net. L\'oxygène, lui, baisse tant que les recycleurs d\'air ne sont pas remis en route. Vous arrivez dans une station complètement à l\'arrêt. Eh oui, vous vous attendiez à quoi ? Si, à un moment donné, vous vous retrouvez sans oxygène, vous suffoquerez et vous n\'aurez plus qu\'un tour pour en trouver. »',
 html:`<div class="ex-cadre"><h4>Votre plateau joueur</h4><div class="trio"><div><h3>Santé</h3><p>En bas : En forme, Affaibli, État critique.</p></div><div><h3>Oxygène</h3><p>Il baisse tant que les recycleurs d'air sont arrêtés.</p></div><div><h3>Ceinture tactique</h3><p>À gauche : en une action, vous utilisez un ou plusieurs jetons.</p></div></div></div>
 <div class="ex-cadre"><h4>Petite spécificité du plateau de jeu</h4><div class="duo"><div><h3>Trois sections : A, B, C</h3><p>Chacune a son recycleur d'air. Tant que celui de votre section est arrêté, chaque fin de tour vous coûte 1 oxygène.</p></div><div><h3>Un robot</h3><p>Tiré au hasard. Vous pourrez interagir avec lui, et il vous aidera.</p></div></div></div>`},
{t:'Une manche en 4 phases',
 dire:'« La phase Événement, c\'est rarement une bonne nouvelle : une carte qui déclenche tout un tas de choses pas cool pour l\'équipe. »',
 html:`<ol class="steps etiq"><li data-l="Phase 1"><b>Joueurs</b> : chacun joue un tour, jusqu'à ce que tout le monde ait passé.</li><li data-l="Phase 2"><b>Intrus</b> : c'est à ce moment-là qu'ils prennent des dégâts de l'environnement et qu'ils attaquent les joueurs.</li><li data-l="Phase 3"><b>Événement</b> : une carte, presque toujours une mauvaise nouvelle.</li><li data-l="Phase 4"><b>Nettoyage</b> : chacun repioche jusqu'à 5 cartes, le compte-tours avance.</li></ol>`},
{t:'Votre tour : 2 actions',
 html:`<div class="duo"><div><h3>Jouer une carte</h3><p>Pour l'effet écrit dessus.</p></div><div><h3>Défausser 1 ou 2 cartes</h3><p>Pour une action du côté droit de votre plateau.</p></div></div>
 <p class="big1">Les actions marquées d'un alien barré en rouge, en haut à droite de votre carte ou tout à droite de la ligne de l'action sur votre plateau joueur, sont interdites s'il y a un Intrus dans votre salle.</p>
 <p>Après vos 2 actions : −1 oxygène si le recycleur de votre section est arrêté.</p>`,
 pl:'Petit piège à signaler',
 piege:'Passer est une action. Si vous commencez votre tour sans carte et que vous passez, vous perdez quand même 1 oxygène : vous avez fini un tour, même sans rien faire.'},
{t:'Bouger, c\'est faire du bruit',
 dire:'« Tout au long de la partie, vous allez vous déplacer d\'une salle à une autre en empruntant des couloirs. Il y a deux types de déplacements, le normal et le prudent : dans les deux cas, vous ferez du bruit. Pour le matérialiser, on lance le dé Bruit, qui désigne les couloirs où il y aura du grabuge. Et s\'il y a déjà du grabuge dans ces couloirs, des Intrus surgissent. La petite chose coquine : ce dé a aussi une face Danger. Si elle tombe, un Intrus vous tombe dessus du plafond et vous attaque. Sauf si vous vous êtes déplacé prudemment : dans ce cas, le jeton Sécurisation prend l\'attaque à votre place. »',
 html:`<div class="duo"><div><h3>Déplacement normal</h3><p>Vous changez de salle.</p></div><div><h3>Déplacement prudent</h3><p>Vous posez en plus un jeton Sécurisation dans la salle d'arrivée.</p></div></div>`,
 pl:'Attention',
 piege:'Quitter une salle où se trouve un Intrus déclenche une attaque d\'opportunité par Intrus. De la même manière, emprunter un couloir rempli d\'Intrus déclenche des attaques d\'opportunité (3 au plus).'},
{t:'Les Intrus',
 dire:'« Il existe 4 types d\'Intrus, tirés au hasard dans le sac Intrus, qui se remplit à chaque manche : la colonie grandit pendant que vous jouez. La Reine a sa propre mécanique, que je vous expliquerai le moment venu pendant la partie : en gros, elle va être très compliquée à tuer. »',
 html:`<div class="flow"><div>Larve</div><span aria-hidden="true">→</span><div>Adulte</div><span aria-hidden="true">→</span><div>Guerrier</div><span aria-hidden="true">→</span><div>Reine</div></div>
 <div class="duo"><div><h3>Déplacement</h3><p>Les Intrus se déplacent toujours vers le joueur le plus proche.</p></div><div><h3>Attaque</h3><p>Celui qui a fait le bruit ; sinon, le premier dans l'ordre du tour.</p></div></div>`,
 pl:'Petit rappel',
 piege:'Un jeton Sécurisation protège d\'un Intrus qui entre dans la salle. Il ne protège ni des attaques des Intrus déjà présents, ni des attaques d\'opportunité quand vous quittez une salle.'},
{t:'Se battre',
 dire:'« Maintenant qu\'on a parlé de tous ces aliens et de ce qu\'ils pourraient vous faire, rassurez-vous : vous avez de quoi vous battre. Vous pourrez tirer au coup par coup, ou en rafale. Chacune de ces actions se gère un peu différemment, avec des dés différents, mais je vous expliquerai ça pendant la partie. »',
 html:`<p class="big1">Ce qu'il faut retenir : une rafale dans un couloir rempli d'aliens est une excellente manière de vous débarrasser rapidement de plein d'entre eux. Dans une salle, un alien est bien plus dur à tuer.</p>
 <div class="duo"><div><h3>Tir</h3><p>Dans une salle. Il ne consomme pas de munitions, sauf jet de dé malchanceux.</p></div><div><h3>Rafale</h3><p>Dans un couloir. Elle consomme toujours une moitié de jeton Munitions.</p></div></div>`},
{t:'Contamination',
 dire:'« Chose que je ne vous ai pas encore dite : quand ces aliens vous attaquent, ils peuvent vous contaminer… et une Larve peut grandir en vous. Même si vous pensez vous en être sorti, ce n\'est pas encore sûr. »',
 html:`<p class="big1">Si un Intrus vous contamine, vous récupérez une carte Contamination, qui arrive dans votre défausse. Elle ne sert à rien, à part pourrir votre main, votre deck… et vos chances de survie.</p>
 <div class="duo"><div><h3>Une zone étrange</h3><p>En bas de la carte se trouve la zone qu'il faudra scanner pour révéler si vous êtes infecté ou non.</p></div><div><h3>Infectée</h3><p>Une Larve s'installe en vous. Faites-la retirer dans une salle du complexe, sinon elle risque d'éclore à la fin, même si vous avez hiberné ou rejoint le vaisseau.</p></div></div>`},
{t:'Sortir vivant',
 dire:'« Quand vous choisirez votre objectif, pensez à votre façon de survivre : hiberner, partir avec le vaisseau, ou prendre la navette de secours… où il n\'y a qu\'une seule place. »',
 html:`<div class="trio"><div><h3>Vaisseau</h3><p>Il tente d'atterrir. Si la DCA (les canons anti-aériens) est active, il est abattu. Une salle du complexe permet de la vérifier.</p></div><div><h3>Navette de secours</h3><p>Une seule place.</p></div><div><h3>Hibernatorium</h3><p>Il faut l'avoir activé.</p></div></div>
 <p>La partie s'arrête après la manche 14 : ceux qui sont encore dans le complexe sont laissés pour morts.</p>`}],
plus:[
['La mêlée et le tir en détail','Au premier combat dans une salle.'],
['La Reine','À sa première apparition.'],
['Blessures graves et armure','À la première blessure grave.'],
['Le robot','Quand une salle est reliée à l\'hibernatorium.'],
['Feu et panne','Au premier événement qui en pose (salle en feu : −1 santé en fin de tour).'],
['Les portes','À la première porte fermée.'],
['Le détail du déplacement des Intrus','Au premier cas litigieux (égalités, couloir plein).'],
['Les salles clés','À leur découverte, avec l\'onglet Salles.'],
['L\'embarquement, le décollage et l\'autodestruction','Quand quelqu\'un vise la sortie.'],
['Les règles d\'or (loi de Murphy)','Au premier doute.'],
['Mode mortel, solo et coopération','Seulement si vous y jouez.']],
aide:`<div><h3>Manche</h3><ul><li>Joueurs → Intrus → Événement → Nettoyage.</li><li>14 manches au plus.</li></ul></div>
<div><h3>Votre tour</h3><ul><li>2 actions.</li><li>Puis −1 oxygène si recycleur arrêté, −1 santé si salle en feu.</li></ul></div>
<div><h3>Coûts</h3><ul><li><b>0 carte</b> : jouer une carte, passer.</li><li><b>1 carte</b> : se déplacer, tirer, rafale, mêlée, objet…</li><li><b>2 cartes</b> : action de salle, déplacement prudent.</li><li>Alien barré = interdit en combat.</li></ul></div>
<div><h3>Déplacement</h3><ul><li>Attaques d'opportunité, puis jet de bruit.</li><li>Danger = un Intrus dans votre salle.</li></ul></div>
<div><h3>Combat</h3><ul><li><b>Tir</b> : 1 touche, puis dé ; l'Intrus meurt si le dé ≤ ses touches.</li><li><b>Rafale</b> : dans un couloir, 1 touche tue un Adulte ou une Larve, 2 un Guerrier.</li></ul></div>
<div><h3>Objectif et victoire</h3><ul><li>Objectif choisi une fois, à votre tour ; plus tôt = plus de cartes.</li><li>Victoire : sorti ou hiberné + objectif accompli + survivre à l'infection.</li></ul></div>`
};
