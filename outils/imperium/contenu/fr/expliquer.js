/* Mode « Expliquer le jeu » d'Imperium : écrans et aide-mémoire (moteur commun : outils/site/partage/expliquer.js). */
const EXPL=(()=>{
const ch=(k,t)=>`<span class="chip c-${k}">${t}</span>`;
const M=ch('mat','Matériaux'),P=ch('pop','Population'),G=ch('prog','Progrès'),I=ch('ins','Instabilités'),RG=ch('reg','Région'),RN=ch('ren','Renommée');
/* ---------- explication express ---------- */
const SL=[
['Imperium en une phrase',`<p class="big1">Vous dirigez une nation antique, représentée par un paquet de cartes qui grossit et se transforme au fil de la partie.</p>
 <div class="duo"><div><h3>Décompte</h3><p>La fin normale. On compte les points de victoire : le plus haut total gagne.</p></div><div><h3>Effondrement</h3><p>La pile ${I} est vide : la partie s'arrête net, et celui qui possède le moins d'Instabilités gagne.</p></div></div>`],
['Votre coin de table',`<div class="zgrid"><div>Développements<small>à payer plus tard</small></div><div>Avènement<small>sous la pioche Nation</small></div><div class="hl">Carte État<small>Barbare puis Empire · vos jetons</small></div><div>Carte Puissance<small>votre pouvoir · votre Histoire dessous</small></div>
 <div>Deck</div><div>Défausse</div><div class="wide">Zone de jeu<small>vos Régions et cartes permanentes</small></div><div class="wide hl">Votre main : 5 cartes</div></div>`],
['Trois ressources',`<div class="trio"><div>${M}<p>Construire, payer les cartes de développement.</p></div><div>${P}<p>Conquérir, acquérir des Vassaux.</p></div><div>${G}<p>La ressource joker, et 1 point de victoire par jeton à la fin.</p></div></div>
 <p class="big1">Pour payer, 1 Progrès vaut <b>1 Population</b> ou <b>2 Matériaux</b>. Les ressources posées sur des cartes ne servent à rien.</p>`],
['Votre tour : un seul ordre',`<div class="trio ord"><div><h3>Activation</h3><p>Le tour normal : vous jouez des cartes et vous épuisez des capacités.</p></div><div><h3>Recherche</h3><p>Vous défaussez votre main et vous prenez une carte choisie, sans son Instabilité.</p></div><div><h3>Pacification</h3><p>Vous renvoyez gratuitement toutes les Instabilités de votre main.</p></div></div><p class="big1">Puis, quel que soit l'ordre : le Nettoyage.</p>`],
['Activation : jetons Action et Épuisé',`<div class="duo"><div><h3>3 Actions</h3><p>Une Action = jouer une carte de votre main. Résolvez son texte, puis défaussez-la, sauf si elle reste en jeu.</p></div><div><h3>5 jetons Épuisé</h3><p>Posez un jeton sur une carte en jeu pour utiliser sa capacité « Épuiser ». Une fois par tour et par carte.</p></div></div>
 <p class="big1">Une carte marquée Barbare ou Empire ne se joue de votre main que si votre carte État montre la même face.</p>`],
['Le Marché',`<p class="big1">Cinq cartes visibles. Sous chacune, une ${I}, sauf sous les Régions.</p><div class="duo"><div><h3>Acquérir</h3><p>Vous prenez la carte, ses ressources <b>et l'Instabilité</b> glissée dessous.</p></div><div><h3>Innover</h3><p>Vous prenez la carte et ses ressources. L'Instabilité retourne dans la pile.</p></div></div>`],
['Le Nettoyage',`<ol class="steps4"><li><b>1 Progrès du stock</b> sur une carte du Marché.</li><li>Vos jetons reviennent : <b>3 Actions, 5 Épuisé</b>.</li><li>Défaussez autant de cartes de votre main que vous voulez.</li><li>Piochez jusqu'à <b>5 cartes</b>.</li></ol><p class="big1">Conseil : défaussez large, votre deck tournera plus vite.</p>`],
['Votre nation évolue',`<p class="big1">Chaque fois que vous mélangez votre défausse pour refaire votre deck, une carte s'y ajoute :</p><div class="flow"><div>Cartes Nation<small>une par mélange</small></div><span aria-hidden="true">→</span><div class="hl">Avènement<small>vous devenez Empire</small></div><span aria-hidden="true">→</span><div>Développements<small>vous en payez le coût</small></div></div><p>Développer votre dernière carte déclenche le Décompte.</p>`],
['Instabilités et Gloire',`<div class="duo"><div><h3>${I}</h3><p>−2 points chacune, et elles encombrent votre main. Pour vous en défaire : la jouer (une Action, puis 1 Population, 3 Matériaux ou 2 cartes défaussées), ou l'ordre Pacification.</p></div><div><h3>Gloire</h3><p>Abandonnez 3 ${RG} en jeu pour gagner une ${RN}, la source de points la plus riche. Il faudra ensuite rejouer vos Régions.</p></div></div>`],
['Manches et fin de partie',`<div class="duo"><div><h3>Solstice</h3><p>Quand tout le monde a joué, chacun résout ses effets Solstice. Puis nouvelle manche.</p></div><div><h3>Décompte</h3><p>Pioche Principale vide, dernier Développement payé ou Roi des rois retournée : on finit la manche, on en joue <b>une dernière</b>, puis on compte.</p></div></div>
 <p class="big1">Score : points des cartes (10 au plus pour une carte à étoile) + 1 point par Progrès en réserve.</p>`]];
const REF=`<div class="ref"><div><h3>1 · Choisissez un ordre</h3><ul><li><b>Activation</b> : 3 Actions, 5 jetons Épuisé</li><li><b>Recherche</b> : défaussez votre main, innovez 1 carte</li><li><b>Pacification</b> : renvoyez vos Instabilités</li></ul></div>
 <div><h3>2 · Nettoyage</h3><ol><li>1 ${G} du stock sur le Marché</li><li>Récupérez vos jetons</li><li>Défaussez ce que vous voulez</li><li>Piochez jusqu'à 5</li></ol></div>
 <div><h3>Payer</h3><ul><li>1 ${G} = 1 ${P}</li><li>1 ${G} = 2 ${M}</li></ul></div>
 <div><h3>Marché</h3><ul><li><b>Acquérir</b> : avec l'Instabilité</li><li><b>Innover</b> : sans l'Instabilité</li></ul></div>
 <div><h3>Deck vide</h3><ul><li>+1 carte Nation, puis Avènement, puis un Développement payé</li><li>1 seul ajout par tour</li></ul></div>
 <div><h3>Fin</h3><ul><li><b>Solstice</b> à chaque fin de manche</li><li><b>Décompte</b> : finir la manche + 1 manche</li><li><b>Effondrement</b> : pile ${I} vide</li></ul></div></div>`;
return {ui:{ecran:'Écran {n} sur {t}',precedent:'Précédent',suivant:'Suivant',voirPlus:'Pour plus tard',voirAide:'Afficher l\'aide-mémoire',debut:'Revenir au début',
  aide:'Aide-mémoire',aideTitre:'Votre tour, en un coup d\'œil',plus:'Pour plus tard',plusTitre:'Gardez-le pour plus tard',
  plusIntro:'Inutile d\'en parler avant le premier tour. Expliquez chaque point quand la partie le rencontre.',
  pleinEcran:'Plein écran',fleches:'Flèches du clavier pour avancer.',dire:'À dire',piege:'Piège à signaler'},
ecrans:SL.map(([t,html])=>({t,html})),
aide:REF.replace(/^<div class="ref">/,'').replace(/<\/div>$/,'')};
})();

EXPL.chantier={k:'En cours de rédaction',t:'Section en chantier',p:'Ce mode est en cours de rédaction. Revenez bientôt !'};
