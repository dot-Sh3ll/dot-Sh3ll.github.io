/* --- Cas pratiques : cartes d'exemple pour l'arène --- */
const AC={
 rage:{n:'Rage',c:'r',bt:'Attaque 2 ou Parade 2',st:'Attaque 4',base:[{k:'atk',n:2},{k:'block',n:2}],strong:[{k:'atk',n:4}]},
 determination:{n:'Détermination',c:'b',bt:'Attaque 2 ou Parade 2',st:'Parade 5',base:[{k:'atk',n:2},{k:'block',n:2}],strong:[{k:'block',n:5}]},
 rapidite:{n:'Rapidité',c:'w',bt:'Mouvement 2',st:'Attaque à distance 3',strong:[{k:'ranged',n:3}]},
 marche:{n:'Marche',c:'g',bt:'Mouvement 2',st:'Mouvement 4'},
 endurance:{n:'Endurance',c:'b',bt:'Mouvement 2',st:'Mouvement 4'},
 pfeu:{n:'Bouclier ardent',ex:1,c:'r',bt:'Parade de Feu 3',st:'Parade de Feu 5',base:[{k:'block',el:'fire',n:3}],strong:[{k:'block',el:'fire',n:5}]},
 lfeu:{n:'Lame ardente',ex:1,c:'r',bt:'Attaque de Feu 3',st:'Attaque de Feu 5',base:[{k:'atk',el:'fire',n:3}],strong:[{k:'atk',el:'fire',n:5}]},
 dfeu:{n:'Dard ardent',ex:1,c:'r',bt:'Attaque de Feu à distance 3',st:'Attaque de Feu à distance 5',base:[{k:'ranged',el:'fire',n:3}],strong:[{k:'ranged',el:'fire',n:5}]},
 belier:{n:'Bélier',ex:1,c:'g',bt:'Attaque de Siège 4',st:'Attaque de Siège 6',base:[{k:'siege',n:4}],strong:[{k:'siege',n:6}]},
 sortr:{n:'Sort rouge',ex:1,type:'s',c:'r',bt:'Attaque de Feu à distance 5',st:'Attaque de Feu de Siège 8',base:[{k:'ranged',el:'fire',n:5}],strong:[{k:'siege',el:'fire',n:8}]},
 artef:{n:'Artefact',ex:1,type:'x',c:'x',bt:'Attaque 3',st:'En le détruisant : Attaque 6',base:[{k:'atk',n:3}],strong:[{k:'atk',n:6}]}};
const en=(n,armor,atk,o)=>Object.assign({n,armor,atk,el:'phys',ab:[],res:[]},o||{});
const CASES={
 'a-unit':{type:'arena',title:'Une Unité Résistante en première ligne',intro:`Les Brutes frappent à 7 : impossible à parer avec cette main. Vos Golems ont une Résistance physique. Sortez du combat vainqueur et sans Blessure pour votre Héros.`,
   enemies:[en('Brutes',5,7)],hand:['rage','rage','marche'],dice:['r'],units:[{n:'Golems',armor:4,res:['phys'],lvl:2}],check:a=>a.wounds?`Votre Héros a pris ${a.wounds} Blessure(s). Laissez les Golems encaisser.`:null,
   hint:`Ne parez pas. En phase de Dégâts, désignez les Golems : ils absorbent 4 sans Blessure, puis sont Blessés et absorbent les 3 restants. Attaquez ensuite avec Rage améliorée et l'autre Rage.`},
 'a-glace':{type:'arena',title:'Parer une Attaque de Glace',intro:`Ces mages lancent une Attaque de Glace de 5. Seules les Parades de Feu comptent plein ; les autres valent moitié. Gagnez sans prendre de Blessure.`,
   enemies:[en('Mages de givre',4,5,{el:'ice'})],hand:['pfeu','rage','rage','determination','marche','endurance'],dice:['r'],check:a=>a.wounds?`Vous avez pris ${a.wounds} Blessure(s) : l'attaque n'a pas été parée.`:null,
   hint:`Deux voies. Bouclier ardent amélioré avec le dé rouge pare 5 d'un coup, puis les deux Rage font Attaque 4. Ou Bouclier ardent de base (3) plus 4 points de Parade physique, qui comptent pour 2, et Rage améliorée pour attaquer.`},
 'a-resist':{type:'arena',title:'Percer une Résistance',intro:`Ces Golems résistent au physique et à la Glace : vos Attaques physiques sont divisées par deux. Le Feu, lui, passe plein. Gagnez sans Blessure.`,
   enemies:[en('Golems de givre',6,2,{res:['phys','ice']})],hand:['dfeu','rage','rage','rapidite'],dice:['r'],check:a=>a.wounds?`Vous avez pris ${a.wounds} Blessure(s). Une Rage suffit à parer leur Attaque de 2.`:null,
   hint:`Parez avec une Rage (Parade 2). En phase d'Attaque : Dard ardent amélioré (Feu 5, dé rouge), plus l'autre Rage et Rapidité inclinée, soit 3 points physiques qui comptent pour 1. Total 6. Une Attaque à distance peut se jouer en phase d'Attaque : elle y compte comme les autres. Pas en phase 1 ici : le Dard seul ne fait que 5 contre 6, et Rage ou une carte inclinée ne comptent pas encore.`},
 'a-vif':{type:'arena',title:'Vif et Brutal',intro:`Attaque 3, mais Vif : il faut le double pour le parer. Et Brutal : s'il passe, les Dégâts doublent. Gagnez sans Blessure.`,
   enemies:[en('Loups enragés',4,3,{ab:['Vif','Brutal']})],hand:['determination','rage','rage','marche','endurance'],dice:['b'],check:a=>a.wounds?`Vous avez pris ${a.wounds} Blessure(s) : Brutal a doublé les Dégâts.`:null,
   hint:`Il faut une Parade de 6 : Détermination améliorée avec le dé bleu (5) et une carte inclinée (1). Puis les deux Rage pour Attaque 4.`},
 'a-fort':{type:'arena',title:'Doublement Fortifié',site:1,siteLbl:'Site fortifié : tous les défenseurs sont Fortifiés',intro:`Vous donnez l'assaut à une Forteresse, et ce défenseur porte en plus la capacité Fortifié. Essayez votre Bélier en première phase, puis trouvez comment gagner sans Blessure.`,
   enemies:[en('Garde du rempart',4,3,{fort:1})],hand:['belier','determination','marche','rage'],dice:[],check:a=>a.wounds?`Vous avez pris ${a.wounds} Blessure(s). Parez d'abord son Attaque de 3.`:null,
   hint:`En première phase, il est intouchable, même au Siège. Passez à la Parade : Détermination (2) et Marche inclinée (1). En phase d'Attaque, les fortifications ne comptent plus : le Bélier suffit.`},
 'a-multi':{type:'arena',title:'Deux ennemis, deux attaques',intro:`Deux adversaires. Les Spectres résistent au physique. Si vous les attaquez ensemble, leur Résistance réduit toute votre attaque. Battez les deux sans Blessure.`,
   enemies:[en('Spectres',3,2,{res:['phys']}),en('Pillards',4,3)],hand:['lfeu','rage','rage','determination','marche','endurance'],dice:['r'],check:a=>a.wounds?`Vous avez pris ${a.wounds} Blessure(s). Chaque ennemi se pare séparément.`:null,
   hint:`Parez les Spectres avec Détermination (2), puis les Pillards avec une Rage (2) et une carte inclinée (1). En phase d'Attaque, sélectionnez les Spectres seuls et jouez Lame ardente (Feu 3). Puis les Pillards seuls : Rage améliorée (4).`},
 'a-sort':{type:'arena',title:'Un Sort amélioré, la Nuit',night:1,intro:`Il fait Nuit. L'effet amélioré du Sort demande un mana rouge et un mana noir, et vous ne pouvez prendre qu'un dé de la Source. Abattez l'Ogre avant qu'il ne frappe.`,
   enemies:[en('Ogre',7,6)],hand:['sortr','marche'],dice:['black','r'],cry:{r:1},check:a=>a.wonPhase!==0?`L'Ogre a eu le temps de riposter. Visez la première phase.`:null,
   hint:`Jouez l'effet amélioré du Sort : payez le rouge avec votre Cristal et le noir avec le dé de la Source. Siège de Feu 8 contre Armure 7, dès la première phase.`},
 'a-artef':{type:'arena',title:'Sacrifier un Artefact',intro:`Votre Artefact donne Attaque 3 et retourne en défausse. Détruit, il donne Attaque 6, mais il quitte la partie. Gagnez sans Blessure.`,
   enemies:[en('Chevalier noir',6,3)],hand:['artef','determination','marche'],dice:[],check:a=>a.wounds?`Vous avez pris ${a.wounds} Blessure(s). Parez d'abord.`:null,
   hint:`Parade : Détermination (2) et Marche inclinée (1). Attaque : l'effet amélioré de l'Artefact, qui le détruit.`},
 'a-donjon':{type:'arena',title:'Seul dans le Donjon',night:1,noUnits:1,siteLbl:'Donjon : règles de Nuit, Unités restées dehors',intro:`Vous descendez dans un Donjon en plein Jour. Les règles de Nuit s'y appliquent et vos Villageois attendent dehors. Battez le Minotaure sans Blessure.`,
   enemies:[en('Minotaure',5,5,{ab:['Brutal']})],hand:['sortr','rage','marche'],dice:['gold','black'],cry:{r:1},units:[{n:'Villageois',armor:3,res:[],lvl:1}],check:a=>a.wounds?`Vous avez pris ${a.wounds} Blessure(s). Brutal double les Dégâts : mieux vaut le vaincre avant.`:null,
   hint:`Le dé or ne sert à rien ici. Payez l'effet de base du Sort avec votre Cristal rouge : Attaque de Feu à distance 5, assez pour le vaincre en première phase.`},
 'a-cite':{type:'arena',title:'Les murs de la Cité Blanche',site:1,armorBonus:1,siteLbl:'Cité Blanche : défenseurs Fortifiés, +1 Armure',intro:`Dans la Cité Blanche, chaque défenseur gagne 1 point d'Armure. Ce garde passe donc de 4 à 5. Battez-le sans Blessure.`,
   enemies:[en('Garde de la Cité',4,3)],hand:['rage','rage','determination','marche'],dice:['r'],check:a=>a.wounds?`Vous avez pris ${a.wounds} Blessure(s). Parez son Attaque de 3.`:null,
   hint:`Parade : Détermination (2) et Marche inclinée (1). Attaque : Rage améliorée avec le dé rouge (4) et l'autre Rage (2), soit 6 contre 5.`},
 's-repos1':{type:'select',title:'Repos Standard',intro:`Votre main est encombrée. Vous choisissez de vous Reposer. Sélectionnez les cartes à défausser pour vider le plus de Blessures possible.`,items:[['Marche',0],['Rage',0],['Blessure',1],['Blessure',1],['Blessure',1]],action:'Me reposer en défaussant la sélection',
   check:s=>{const nw=s.filter(x=>!x[1]).length,w=s.filter(x=>x[1]).length;return nw===0?[0,'Un Repos Standard demande de défausser une carte autre que Blessure.']:nw>1?[0,'Une seule carte autre que Blessure : gardez l\'autre pour le prochain tour.']:w<3?[0,'C\'est permis, mais vous pouvez défausser autant de Blessures que vous voulez : prenez les trois.']:[1,'Une carte normale et les trois Blessures partent en défausse. Vous piocherez 4 cartes neuves. Attention : ces Blessures reviendront au prochain mélange.']}},
 's-repos2':{type:'select',title:'Repos Prolongé',intro:`Cette fois, votre main ne contient que des Blessures. Sélectionnez ce que le Repos vous permet de défausser.`,items:[['Blessure',1],['Blessure',1],['Blessure',1],['Blessure',1]],action:'Me reposer en défaussant la sélection',
   check:s=>s.length===1?[1,'Repos Prolongé : vous montrez votre main et défaussez une seule Blessure. Vous ne piocherez qu\'une carte.']:[0,s.length?'Sans carte normale à défausser, le Repos ne retire qu\'une seule Blessure.':'Sélectionnez une Blessure.']},
 's-sort':{type:'select',title:'Payer un Sort en plein Jour',intro:`Il fait Jour. Vous voulez l'effet de base d'un Sort rouge. Sélectionnez le mana que vous dépensez.`,items:[['Dé or de la Source','gold'],['Dé noir de la Source','black'],['Dé vert de la Source','g'],['Cristal bleu','b']],action:'Payer l\'effet de base du Sort rouge',
   check:s=>s.length!==1?[0,'L\'effet de base d\'un Sort coûte un seul mana, de sa couleur.']:s[0][1]==='gold'?[1,'Le Jour, l\'or remplace n\'importe quelle couleur fondamentale. C\'est votre dé du tour.']:s[0][1]==='black'?[0,'Le mana noir est inutilisable le Jour.']:[0,'Il faut du rouge, ou de l\'or puisqu\'il fait Jour.']},
 't-setup':{type:'story',title:'Préparer une partie solo',steps:[
   {t:`Vous jouez seul, avec un joueur Fantôme. Combien de dés lancez-vous pour la Source ?`,o:[[`2`,0,`Le calcul est : nombre de joueurs plus 2.`],[`3`,1,`Un joueur plus 2. Le Fantôme ne compte pas.`],[`4`,0,`Le Fantôme ne compte pas comme un joueur pour la Source.`]]},
   {t:`Les trois dés montrent or, noir et bleu. La Source est-elle valable ?`,o:[[`Oui`,0,`Au moins la moitié des dés doit montrer une couleur fondamentale. Ici, un seul sur trois.`],[`Non : je relance le dé or et le dé noir`,1,`On relance les dés or et noirs jusqu'à ce que la moitié au moins soit rouge, bleue, blanche ou verte.`]]},
   {t:`Combien de cartes révélez-vous pour l'Offre des Unités ?`,o:[[`3`,1,`Nombre de joueurs plus 2, sans compter le Fantôme. Des Unités Régulières tant qu'aucune tuile Royaume n'est révélée.`],[`5`,0,`C'est le nombre de joueurs plus 2.`],[`Aucune avant le premier Village`,0,`L'Offre est révélée dès la mise en place.`]]},
   {t:`Dernière étape : combien de cartes piochez-vous ?`,o:[[`5`,1,`Votre Limite de cartes en main aux Niveaux 1 et 2.`],[`7`,0,`La Limite de départ est de 5.`]]}]},
 't-tour':{type:'story',title:'Un tour complet, décision par décision',steps:[
   {t:`Votre main : Marche, Endurance, Promesse, Rage et une Blessure. Un Village se trouve à deux Plaines de vous (2 points chacune). Vous voulez y recruter ce tour-ci. Par quoi commencez-vous ?`,o:[[`Je joue Promesse pour l'Influence, puis je me déplace`,0,`Tout le Mouvement doit être terminé avant l'action.`],[`Je me déplace, puis j'interagis`,1,`Mouvement d'abord, action ensuite.`]]},
   {t:`Marche et Endurance donnent 4 points : vous êtes au Village. Les Villageois coûtent 4 Influence. Il vous reste Promesse, Rage et la Blessure. La Source montre un dé blanc.`,o:[[`Promesse, Rage inclinée et la Blessure inclinée`,0,`Une Blessure ne peut jamais être jouée, même inclinée.`],[`Promesse améliorée avec le dé blanc`,1,`Influence 4 : les Villageois sont recrutés, Disponibles tout de suite.`],[`Promesse et Rage inclinée`,0,`Cela ne fait que 3 Influence.`]]},
   {t:`Le recrutement est fait. Il vous reste Rage. Pouvez-vous entrer dans la Forêt voisine en jouant Rage inclinée et les Villageois ?`,o:[[`Oui`,0,`Aucun Mouvement n'est possible après l'action du tour.`],[`Non`,1,`L'interaction était votre action : le tour ne permet plus de Mouvement.`]]},
   {t:`Fin du tour. Que devient la Blessure dans votre main ?`,o:[[`Je la défausse`,0,`Une Blessure ne se défausse jamais volontairement en fin de tour.`],[`Elle reste en main`,1,`Vous gardez Rage et la Blessure, et piochez 3 cartes pour revenir à 5.`]]}]},
 't-niveau':{type:'story',title:'Monter de Niveau',steps:[
   {t:`Vous étiez Niveau 1 avec 2 points de Gloire. Ce tour-ci, vous en gagnez 7 : vous voilà à 9. Les paliers sont à 3 et à 8. Que se passe-t-il à la fin du tour ?`,o:[[`Je passe Niveau 2`,0,`Vous avez franchi deux lignes : vous gagnez un Niveau pour chacune.`],[`Je passe Niveau 2, puis Niveau 3`,1,`Chaque ligne franchie donne un Niveau, résolus l'un après l'autre.`]]},
   {t:`Niveau 2. Vous révélez deux tuiles Compétence de votre pile. L'Offre commune est vide.`,o:[[`Je garde les deux`,0,`Une seule Compétence par Niveau pair.`],[`J'en garde une, l'autre va dans l'Offre commune, et je choisis une Action Avancée`,1,`Et la carte choisie va sur le dessus de votre Deck.`],[`J'en garde une et je prends l'Action Avancée du bas`,0,`La carte du bas n'est imposée que si vous prenez la Compétence d'un autre joueur.`]]},
   {t:`Niveau 3, maintenant. Que recevez-vous ?`,o:[[`Une autre Compétence`,0,`Les Compétences viennent aux Niveaux pairs.`],[`Un jeton Commandement et un nouveau jeton Niveau visible`,1,`Vous pouvez diriger une Unité de plus, et le jeton révélé affiche vos nouvelles valeurs d'Armure et de Limite de cartes en main.`]]}]},
 't-manche':{type:'story',title:'D\'une Manche à l\'autre',steps:[
   {t:`Trois joueurs ont choisi les Tactiques 5, 2 et 4. Qui joue en premier ?`,o:[[`Le 5`,0,`C'est le plus petit numéro qui ouvre.`],[`Le 2`,1,`L'Ordre de Jeu suit les numéros croissants : 2, 4, puis 5.`]]},
   {t:`Plus tard. Au début de votre tour, votre Deck est vide ; vous avez en main Rage et une Blessure.`,o:[[`Je dois annoncer la fin de la Manche`,0,`Seulement si votre main est vide aussi.`],[`J'ai le choix : annoncer, ou jouer un tour`,1,`Deck vide avec des cartes en main : la décision vous appartient.`],[`Je remélange ma défausse`,0,`Jamais avant la fin de la Manche.`]]},
   {t:`Vous annoncez la fin de la Manche.`,o:[[`Je joue quand même mon tour`,0,`L'annonce remplace votre tour.`],[`Chaque autre joueur joue un dernier tour, puis la Manche s'arrête`,1,`Vous ne profitez même pas de la case où vous êtes.`]]},
   {t:`Nouvelle Manche. Vos Villageois étaient Épuisés et Blessés. Dans quel état sont-ils ?`,o:[[`Disponibles et soignés`,0,`Les Blessures ne disparaissent pas toutes seules.`],[`Disponibles, mais toujours Blessés`,1,`Ils retrouvent leur jeton Commandement mais ne pourront agir qu'une fois soignés.`]]},
   {t:`Et la Blessure que vous aviez en main ?`,o:[[`Elle est remélangée dans votre Deck`,1,`Toutes vos cartes, Blessures comprises, reforment le Deck.`],[`Elle est retirée du jeu`,0,`Seul le Soin retire une Blessure.`]]}]},
 't-monastere':{type:'story',title:'Un Monastère, de deux façons',steps:[
   {t:`Vous êtes dans un Monastère avec 8 points d'Influence et une Blessure en main. Que pouvez-vous acheter ?`,o:[[`L'Action Avancée (6) et un point de Soin (2)`,1,`Plusieurs achats en une interaction, tant que l'Influence suffit.`],[`L'Action Avancée et deux points de Soin`,0,`Cela ferait 10 Influence.`],[`Un Sort pour 7`,0,`Les Sorts s'achètent dans une Tour de Mage ou la Cité Bleue.`]]},
   {t:`Un autre jour, vous décidez de brûler ce Monastère. Qu'arrive-t-il à votre Réputation ?`,o:[[`−1`,0,`C'est le coût d'un assaut ou d'un pillage.`],[`−3, tout de suite`,1,`La perte est immédiate, quelle que soit l'issue du combat.`]]},
   {t:`Vous piochez un ennemi violet. Vos deux Unités sont Disponibles.`,o:[[`Elles combattent normalement`,0,`Elles refusent de prendre part à cet acte.`],[`Elles ne participent pas : ni activation, ni Dégâts pour elles`,1,`Vous combattez seul.`]]},
   {t:`Vous l'emportez. Votre récompense ?`,o:[[`Un Artefact : en fin de tour, j'en pioche deux et j'en garde un`,1,`Et le Monastère n'existe plus pour le reste de la partie.`],[`Un Sort de l'Offre`,0,`C'est la récompense d'une Tour de Mage.`]]}]},
 't-antre':{type:'story',title:'L\'Antre et sa récompense',init:()=>({d1:roll(),d2:roll()}),steps:[
   {t:`Un Antre se trouve sur votre chemin. Vous pouvez…`,o:[[`seulement vous arrêter et combattre`,0,`Un site d'aventures peut toujours être ignoré.`],[`le traverser, vous y arrêter sans combattre, ou y entrer : ce sera votre action`,1,`Entrer dans l'Antre est l'action du tour.`]]},
   {t:`Vous entrez et vous échouez face au monstre marron. Que devient son jeton ?`,o:[[`Il reste sur la case, face visible`,1,`Le prochain Héros qui entrera affrontera le même monstre.`],[`Il est défaussé`,0,`C'est le cas du Donjon, pas de l'Antre.`]]},
   {t:x=>`Au tour suivant, victoire. En fin de tour, vous lancez deux dés pour la récompense : ${COL[x.d1]} et ${COL[x.d2]}. Que gagnez-vous ?`,
    o:x=>{const f=d=>d==='black'?'+1 Gloire':d==='gold'?'un Cristal de la couleur de mon choix':'un Cristal '+COL[d];const ok=f(x.d1)+' et '+f(x.d2);
     return [[ok.charAt(0).toUpperCase()+ok.slice(1),1,`Couleur fondamentale : ce Cristal. Or : couleur au choix. Noir : 1 point de Gloire à la place.`],[`Deux Cristaux de mon choix`,0,`Le dé décide de la couleur, sauf sur un résultat or.`],[`Rien : il fallait gagner du premier coup`,0,`La récompense revient à celui qui conquiert le site, quel que soit le nombre de tentatives.`]].filter((o,i,a)=>a.findIndex(z=>z[0]===o[0])===i)}}]},
 't-cite':{type:'story',title:'Prendre une Cité',steps:[
   {t:`Vous attaquez une Cité Rouge. Un défenseur d'Attaque physique 4 n'est pas paré. Combien de Dégâts inflige-t-il ?`,o:[[`4`,0,`Dans la Cité Rouge, les attaques physiques des défenseurs deviennent Brutales.`],[`8`,1,`Brutal double l'Attaque au moment des Dégâts.`]]},
   {t:`Vous battez 2 des 3 défenseurs.`,o:[[`La Cité est à moi`,0,`Il faut vaincre tous les défenseurs.`],[`Je pose 2 jetons Bouclier sur la carte Cité et je recule`,1,`Un Bouclier par défenseur vaincu, et retour à la case d'où vous veniez.`]]},
   {t:`Un autre joueur bat le dernier défenseur. Qui devient Seigneur de la Cité ?`,o:[[`Lui : il a porté le coup final`,0,`Seul le nombre de jetons Bouclier compte.`],[`Moi : 2 Boucliers contre 1`,1,`À égalité, ce serait le premier à avoir posé un Bouclier.`]]},
   {t:`Vous revenez interagir dans cette Cité Rouge conquise.`,o:[[`+2 Influence, et des Artefacts à 12 Influence`,1,`+1 Influence par Bouclier que vous y avez posé.`],[`+1 Influence, et des Sorts à 7`,0,`Les Sorts s'achètent dans la Cité Bleue, et le bonus est de +1 par Bouclier.`]]}]},
 't-jcj':{type:'story',title:'Un duel, coup par coup',steps:[
   {t:`Vous terminez votre Mouvement sur la case d'un rival. Il décide de ne participer que partiellement. Peut-il prendre un dé de la Source ?`,o:[[`Oui`,0,`C'est le privilège d'une participation pleine.`],[`Non, et ses Compétences sont inutilisables`,1,`En échange, il garde son prochain tour.`]]},
   {t:`Phase à Distance et de Siège. Qui attaque en premier ?`,o:[[`Moi, l'agresseur`,0,`L'agresseur ouvre la phase de Mêlée.`],[`Lui, le défenseur`,1,`Les rôles s'inversent ensuite à chaque attaque.`]]},
   {t:`Il vous lance une Attaque à Distance physique de 4. Vous jouez Parade 4. Votre Armure est de 2.`,o:[[`Tout est paré`,0,`Dans cette phase, il faut 2 points de Parade par point d'Attaque.`],[`2 Dégâts passent : il m'inflige une Blessure`,1,`Parade 4 bloque 2. Les 2 Dégâts restants égalent votre Armure : une Blessure.`],[`4 Dégâts passent`,0,`Contre un joueur, la Parade peut être partielle.`]]},
   {t:`Mêlée. Vous lui infligez 2 Dégâts non parés. Une Plaine libre (coût 2) est adjacente. Son Armure est de 3.`,o:[[`Je lui inflige une Blessure`,0,`Il faudrait 3 Dégâts, autant que son Armure.`],[`Je le force à reculer sur la Plaine : le combat s'arrête et je gagne`,1,`Les Dégâts se convertissent en Mouvement, au coût de la case.`],[`Je lui vole un Artefact`,0,`Cela coûte 5 Dégâts.`]]},
   {t:`Vous êtes Niveau 3, il est Niveau 5. Combien de Gloire gagnez-vous ?`,o:[[`1`,0,`Ajoutez 2 par Niveau d'écart.`],[`5`,1,`1 point, plus 2 pour chacun des deux Niveaux qui vous séparent.`],[`Rien`,0,`On ne gagne rien seulement quand on avait déjà plus de Gloire que le vaincu.`]]}]},
 't-coop':{type:'story',title:'Un assaut coopératif',steps:[
   {t:`Vous et votre partenaire êtes chacun sur une case adjacente à une Cité défendue par 4 ennemis. À votre tour, vous lui proposez d'en affronter 2 chacun. Il accepte. Que fait-il ?`,o:[[`Il retourne son jeton d'Ordre de Jeu : il passera son prochain tour`,1,`Participer à l'assaut lui coûte son tour suivant.`],[`Rien de particulier`,0,`Son jeton est retourné pour marquer le tour qu'il sautera.`]]},
   {t:`Comment répartit-on les 4 défenseurs ?`,o:[[`Chacun choisit les deux qu'il préfère`,0,`Personne ne sait d'avance qui il affrontera.`],[`On les mélange et on en distribue 2 à chacun, sans regarder`,1,`Vous savez combien, pas lesquels.`]]},
   {t:`Vous battez vos 2 défenseurs. Votre partenaire n'en bat qu'un.`,o:[[`La Cité est conquise`,0,`Il reste un défenseur.`],[`La Cité tient : vous reculez tous les deux, mais vos 3 Boucliers restent sur la carte`,1,`Chaque défenseur vaincu compte déjà pour désigner le futur Seigneur.`]]},
   {t:`Fin de partie : vous avez 60 points de Gloire, votre partenaire 41. Quelle est la base du score d'équipe ?`,o:[[`60`,0,`C'est le joueur le moins avancé qui compte.`],[`41`,1,`Aider son partenaire à progresser rapporte à toute l'équipe.`],[`101`,0,`Les Gloires ne s'additionnent pas.`]]}]},
 't-fantome':{type:'story',title:'Faire jouer le Fantôme',init:()=>{const d=shuffle('rrrrggggbbbbwwww'.split(''));return{a:d.slice(0,3),b:d.slice(3,6)}},steps:[
   {t:x=>`Le Fantôme possède 2 Cristaux verts et 1 Cristal bleu. À son tour, il défausse trois cartes : ${x.a.map(c=>FEMC[c]).join(', ')}. Combien de cartes défausse-t-il en plus ?`,
    o:x=>{const n={g:2,b:1}[x.a[2]]||0;return [0,1,2].map(k=>[k?`${k}`:`Aucune`,k===n?1:0,k===n?`Seule la dernière carte compte : elle est ${FEMC[x.a[2]]}, et il a ${n} Cristal${n>1?'aux':''} de cette couleur.`:`Regardez la couleur de la troisième carte et comptez ses Cristaux de cette couleur.`])}},
   {t:x=>`Tour suivant : ${x.b.map(c=>FEMC[c]).join(', ')}. Combien en plus ?`,
    o:x=>{const n={g:2,b:1}[x.b[2]]||0;return [0,1,2].map(k=>[k?`${k}`:`Aucune`,k===n?1:0,k===n?`La troisième est ${FEMC[x.b[2]]} : ${n} carte${n>1?'s':''} en plus.`:`Seule la couleur de la troisième carte compte.`])}},
   {t:`Plus tard, au début de son tour, son Deck est vide.`,o:[[`Il remélange sa défausse`,0,`Comme vous, il ne remélange qu'à la nouvelle Manche.`],[`Il annonce la fin de la Manche : vous jouez un dernier tour`,1,`C'est lui qui impose le rythme de la partie.`]]},
   {t:`Nouvelle Manche. L'Action Avancée retirée du bas de l'Offre est rouge, le Sort retiré est blanc.`,o:[[`Les deux cartes vont dans son Deck`,0,`Le Sort retourne sous sa pioche.`],[`L'Action Avancée rejoint son Deck, et il gagne un Cristal blanc`,1,`Son Deck grossit et ses Cristaux s'accumulent : les Manches raccourcissent.`]]}]}
};
const FEMC={r:'rouge',g:'verte',b:'bleue',w:'blanche'};
[0,1,2,3,4,5,6,8,9,10,11].forEach(i=>CASES['L'+i]={type:'board',li:i});
const CH_CASES={'But du jeu':['t-setup'],'Les cartes':['L0'],'Le mana':['L1','L11'],'Le tour':['t-tour'],'Mouvement':['L2','L9'],'Interaction':['L3','L10'],'Le combat':['L4'],'Blessures':['L5','s-repos1','s-repos2'],
 'Niveaux':['L6','t-niveau'],'La Manche':['t-manche'],'Jour et Nuit':['L8'],'Unités':['a-unit'],'Éléments':['a-glace','a-resist'],'Capacités':['a-vif','a-fort'],'Plusieurs ennemis':['a-multi'],'Sorts':['a-sort','s-sort'],'Artefacts':['a-artef'],
 'Sites habités':['t-monastere'],'Aventures':['a-donjon','t-antre'],'Cités':['a-cite','t-cite'],'Joueur contre Joueur':['t-jcj'],'Coopération':['t-coop'],'Solo et score':['t-fantome'],'Glossaire':[]};
Object.assign(CASES,{
 'a-rempart':{type:'arena',title:'À travers le Rempart',site:1,siteLbl:'Vous défiez ces Orques à travers un Rempart : ils sont Fortifiés',intro:`Un Rempart vous sépare de ces Tirailleurs. Essayez votre Attaque à distance en première phase, puis gagnez sans Blessure.`,
   enemies:[en('Tirailleurs',4,3)],hand:['rapidite','rage','determination','marche'],dice:['w'],check:a=>a.wounds?`Vous avez pris ${a.wounds} Blessure(s). Parez d'abord leur Attaque de 3.`:null,
   hint:`En première phase, l'Attaque à distance ne touche pas un ennemi Fortifié. Parez : Détermination (2) et Marche inclinée (1). En phase d'Attaque, tout compte : Rapidité améliorée (3) et Rage (2).`},
 'a-defense':{type:'arena',title:'Défense',armorBonus:2,siteLbl:'Défense 2 : seuls, ces Protecteurs se protègent eux-mêmes',intro:`Ces Protecteurs ont la capacité Défense 2. Comme ils sont seuls, ils l'appliquent à leur propre Armure. Gagnez sans Blessure.`,
   enemies:[en('Protecteurs',4,3)],hand:['rage','rage','determination','marche','endurance'],dice:['r'],check:a=>a.wounds?`Vous avez pris ${a.wounds} Blessure(s). Parez d'abord leur Attaque de 3.`:null,
   hint:`Parade : Détermination (2) et une carte inclinée (1). Attaque : il faut 6, soit Rage améliorée avec le dé rouge (4) et l'autre Rage (2).`},
 't-dedale':{type:'story',title:'Entrer dans un Dédale',steps:[
   {t:`Vous êtes sur un Dédale avec deux Unités Disponibles. Il vous reste 3 points de Mouvement de votre déplacement, et deux cartes de Mouvement en main. Vous visez le chemin à 4 points.`,o:[[`Je paie avec mes 3 points restants et une carte inclinée`,0,`Les restes de votre phase de Mouvement ne servent pas : il faut des effets joués pour entrer.`],[`Je joue mes deux cartes de Mouvement pour payer 4`,1,`Des effets de Mouvement distincts, joués au moment d'entrer.`]]},
   {t:`Qui vous accompagne à l'intérieur ?`,o:[[`Mes deux Unités`,0,`Il n'y a de place que pour une seule.`],[`Une seule Unité, que je choisis`,1,`L'autre ne peut ni agir ni encaisser pendant cette action.`]]},
   {t:`Vous battez le monstre. Que devient ce chemin à 4 points ?`,o:[[`Il reste ouvert à tous`,0,`Votre Bouclier le condamne.`],[`Je le marque d'un Bouclier ; je ne reviendrai plus, mais un autre joueur peut prendre le chemin à 2 ou à 6`,1,`Chaque chemin ne sert qu'une fois, et chaque joueur n'entre qu'une fois.`]]}]},
 't-insaisissable':{type:'story',title:'Un ennemi Insaisissable',steps:[
   {t:`Des Ombres : Armure 3 ou 6, Attaque 4. Vous avez une Attaque à distance 4. La tentez-vous en première phase ?`,o:[[`Oui : 4 contre 3`,0,`En phase à Distance et Siège, c'est toujours la plus haute Armure : 6.`],[`Non : il faudrait 6`,1,`Mieux vaut garder cette carte pour la phase d'Attaque.`]]},
   {t:`Phase de Parade. Vous pouvez parer leur Attaque de 4, ou laisser une Unité d'Armure 5 encaisser.`,o:[[`L'Unité encaisse : personne n'est gêné`,0,`Ne pas parer laisse leur Armure à 6 pour tout le combat.`],[`Je pare les 4`,1,`Toutes leurs attaques parées : leur Armure tombe à 3 pour la phase d'Attaque.`]]},
   {t:`Phase d'Attaque. Que vous faut-il ?`,o:[[`Attaque 3, et mon Attaque à distance compte`,1,`Dans cette phase tous les types d'Attaque se combinent, contre la petite Armure.`],[`Attaque 6`,0,`Vous avez paré : c'est la petite valeur qui s'applique.`]]}]},
 't-volkare':{type:'story',title:'Volkare vous attaque',steps:[
   {t:`Deuxième Jour. Volkare entre sur votre case avec six jetons. Vous n'êtes pas prêt. Que coûte la retraite ?`,o:[[`2 Blessures`,0,`C'est le tarif du premier Jour et de la première Nuit.`],[`3 Blessures`,1,`2, 3 puis 4 Blessures selon l'avancée de la partie. Vous reculez ensuite sur une case adjacente sécurisée.`],[`Rien, mais je passe mon tour`,0,`La retraite se paie en Blessures.`]]},
   {t:`Plus tard, vous l'affrontez. Son dé désigne une attaque de 5. Vous ne la parez pas et vous avez des Gardes d'Armure 5.`,o:[[`Les Gardes encaissent 10 Dégâts`,0,`Son attaque est Assassin : pas d'Unité.`],[`Mon Héros encaisse 10 Dégâts`,1,`Brutale, donc doublée, et Assassin, donc pour le Héros seul. Mieux vaut la parer.`],[`Mon Héros encaisse 5 Dégâts`,0,`Son attaque est aussi Brutale : non parée, elle double.`]]},
   {t:`Il reste deux jetons de son armée. Pouvez-vous viser Volkare lui-même pour en finir ?`,o:[[`Oui, avec une Attaque de Siège`,0,`Volkare n'est jamais une cible.`],[`Non : il tombe quand ses deux dernières troupes tombent`,1,`Éliminer toutes ses troupes est la seule façon de le vaincre.`]]}]},
 't-poursuite':{type:'story',title:'Embuscade et Poursuite',steps:[
   {t:`Un ennemi Embusqué est à 2 cases de vous. Vous avancez sur une autre case, elle aussi à 2 cases de lui ; la case qui vous sépare est une Montagne.`,o:[[`Il m'attaque`,0,`La case intermédiaire ne doit contenir ni montagne ni lac.`],[`Il ne m'attaque pas`,1,`L'Embuscade porte à 2 cases seulement à travers une case révélée et dégagée.`]]},
   {t:`Un jeton vous Poursuit et se trouve à 3 cases. Vous terminez votre Mouvement.`,o:[[`Il avance d'une case vers moi`,1,`Il franchit même lacs et montagnes, tant que la case est révélée et libre.`],[`Il m'attaque tout de suite`,0,`Il doit d'abord vous rejoindre.`],[`Il ne bouge que si je l'ai provoqué`,0,`La Poursuite est automatique à chaque fin de Mouvement du Héros poursuivi.`]]},
   {t:`Au tour suivant, il est adjacent et vous êtes dans un Village.`,o:[[`Il m'attaque : c'est mon action`,0,`Pas dans un lieu où une interaction est possible.`],[`Il ne peut pas m'attaquer ici`,1,`Les lieux d'interaction et les sites fortifiés que vous n'assiégez pas vous protègent.`]]}]},
 't-chef':{type:'story',title:'Abattre un Chef de Faction',steps:[
   {t:`Le Chef est au niveau 4, Armure 5 à ce niveau, entouré de deux fidèles. Vous réunissez 12 points d'Attaque contre lui en phase d'Attaque. Que se passe-t-il ?`,o:[[`Il perd 1 niveau`,0,`Comptez les multiples de son Armure.`],[`Il perd 2 niveaux`,1,`5 puis 10 : deux Boucliers posés. Il aurait fallu 15 pour un troisième.`],[`Il est vaincu`,0,`Il lui reste des niveaux.`]]},
   {t:`Le combat se termine. Que devient son marqueur, et ses fidèles vaincus sont-ils remplacés ?`,o:[[`Le marqueur descend au niveau 2 ; aucun nouveau fidèle n'arrive`,1,`Ses compagnons dépendent de son niveau de départ, une fois pour toutes.`],[`Le marqueur descend et deux nouveaux fidèles arrivent`,0,`On n'ajoute jamais d'ennemis quand son niveau baisse.`],[`Le marqueur ne bouge pas avant la prochaine Manche`,0,`Il recule à la fin du combat.`]]},
   {t:`Vous aviez aussi un Sort capable de détruire un ennemi. Fonctionne-t-il sur le Chef ?`,o:[[`Oui`,0,`Les Chefs sont immunisés aux Arcanes.`],[`Non : seules les Attaques et les Parades le touchent`,1,`Immunité aux Arcanes, comme Volkare.`]]}]}
});
Object.assign(CH_CASES,{'Légion : sites':['a-rempart','t-dedale'],'Légion : ennemis':['t-insaisissable'],'Légion : Unités':[],'Volkare':['t-volkare'],'Tezla : Factions':['a-defense','t-poursuite'],'Tezla : Chefs':['t-chef']});

COURSE.forEach(c=>c.cases=CH_CASES[c.t]||[]);
const caseTitle=id=>CASES[id].type==='board'?LESSONS[CASES[id].li].h:CASES[id].title;

let CH='course',TI=0,BOARD=-1;const ANS=COURSE.map(()=>[]),ACT={},CDONE=new Set(),SEEN=new Set();
try{const v=JSON.parse(localStorage.getItem('mk-course')||'{}');TI=Math.min(COURSE.length-1,v.ti||0);(v.done||[]).forEach(x=>CDONE.add(x));(v.ans||[]).forEach((a,i)=>{if(ANS[i])ANS[i]=a});(v.seen||[]).forEach(x=>SEEN.add(x))}catch(e){}
function persist(){try{localStorage.setItem('mk-course',JSON.stringify({ti:TI,done:[...CDONE],ans:ANS,seen:[...SEEN]}))}catch(e){}}
const quizDone=i=>COURSE[i].quiz.every((q,j)=>ANS[i][j]===q.a);
const chapDone=i=>COURSE[i].cases.every(c=>CDONE.has(c))&&quizDone(i)&&(COURSE[i].glo?SEEN.has(i):true);
const activeCase=()=>{const c=COURSE[TI].cases;return c.length?(ACT[TI]&&c.includes(ACT[TI])?ACT[TI]:c[0]):null};
function winCase(id){if(!CDONE.has(id)){CDONE.add(id);persist()}}

/* --- Arène de combat --- */
let AR=null,ST=null,SL=null;
const ELN2={phys:'',fire:' de Feu',ice:' de Glace',cf:' de Feu Glacé'};
const KN={atk:'Attaque',ranged:'Attaque à distance',siege:'Attaque de Siège',block:'Parade'};
const altLbl=a=>KN[a.k]+ELN2[a.el||'phys']+' '+a.n;
function arStart(id){const d=CASES[id];AR={id,d,phase:0,hand:d.hand.map(x=>Object.assign({uid:UID++},AC[x])),dice:d.dice.map(c=>({c,used:false})),dieUsed:false,cry:Object.assign({},d.cry||{}),
  units:(d.units||[]).map(u=>Object.assign({spent:false,wounds:0,hit:false,dead:false},u)),enemies:d.enemies.map(e=>Object.assign({dead:false,blocked:false,done:false,sel:false},e)),
  pool:[],wounds:0,poison:0,dmg:null,log:[],over:false,ok:false,msg:'',wonPhase:-1}; if(AR.enemies.length===1)AR.enemies[0].sel=true}
const arSay=m=>{AR.log.unshift(m);AR.log.length=Math.min(AR.log.length,5)};
const arNight=()=>!!AR.d.night;
function arOpts(col,noDie){const o=[];
  if(col!=='black'&&AR.cry[col]>0)o.push({t:'cry',c:col,label:'Cristal '+COL[col]});
  if(!AR.dieUsed&&!noDie)AR.dice.forEach((d,i)=>{if(d.used)return;if(d.c===col&&(col!=='black'||arNight()))o.push({t:'die',i,label:'Dé '+COL[d.c]+' de la Source'});else if(d.c==='gold'&&!arNight()&&col!=='black')o.push({t:'die',i,label:'Dé or de la Source (joker de Jour)'})});
  return o}
async function arPay(col,noDie){const o=arOpts(col,noDie);if(!o.length)return false;
  const m=o.length===1?o[0]:await ask('Payer le mana '+COL[col]+' avec…',o.map(x=>({label:x.label,value:x})));if(!m)return false;
  if(m.t==='cry')AR.cry[m.c]--;else{AR.dice[m.i].used=true;AR.dieUsed=true}return true}
function arValid(a){const p=AR.phase;return a.k==='block'?p===1:a.k==='atk'?p===3:(p===0||p===3)}
async function arPlay(uid,mode){if(AR.over)return;const c=AR.hand.find(x=>x.uid===uid);if(!c)return;
  if(c.w){arSay('Une Blessure ne se joue pas.');return render()}
  if(AR.phase===2){arSay('Pendant la phase de Dégâts, on ne joue pas de carte : répartissez les Dégâts.');return render()}
  const alts=mode==='side'?[{k:'atk',n:1},{k:'block',n:1}]:(c[mode]||[]);
  if(!alts.length){arSay(c.n+' ne donne rien en combat avec cet effet. Inclinée, elle vaut 1 point d\'Attaque ou de Parade.');return render()}
  const v=alts.filter(arValid);
  if(!v.length){arSay(AR.phase===0?'En première phase, seules les Attaques à distance et de Siège comptent. Une carte inclinée n\'en donne jamais.':AR.phase===1?'En phase de Parade, jouez des Parades.':'Cet effet ne sert pas en phase d\'Attaque.');return render()}
  const a=v[0];
  if(mode==='strong'){
    if(c.type==='x'){/* détruit, sans mana */}
    else if(c.type==='s'){
      if(!arNight()){arSay('L\'effet amélioré d\'un Sort demande du mana noir : impossible de Jour.');return render()}
      const bl=arOpts('black');if(!bl.length){arSay('Il vous faut un mana noir.');return render()}
      const colOnlyDie=!arOpts(c.c,true).length;
      if(colOnlyDie){arSay('Il faudrait deux dés de la Source : un seul par tour. Trouvez l\'autre mana ailleurs.');return render()}
      if(!await arPay(c.c,true)||!await arPay('black'))return render()}
    else{if(!arOpts(c.c).length){arSay('Il vous faut un mana '+COL[c.c]+(AR.dieUsed?' (vous avez déjà pris votre dé).':'.'));return render()}if(!await arPay(c.c))return render()}}
  else if(mode==='base'&&c.type==='s'){if(!arOpts(c.c).length){arSay('Même l\'effet de base d\'un Sort coûte un mana '+COL[c.c]+'.');return render()}if(!await arPay(c.c))return render()}
  AR.hand.splice(AR.hand.indexOf(c),1);AR.pool.push(Object.assign({el:'phys'},a));
  arSay(c.n+(mode==='side'?' inclinée':mode==='strong'?(c.type==='x'?' détruit':' en effet amélioré'):'')+' : '+altLbl(Object.assign({el:'phys'},a))+'.'+(c.type==='x'&&mode==='strong'?' Il est retiré du jeu.':''));render()}
function arEnemy(i){if(AR.over)return;const e=AR.enemies[i];if(e.dead)return;
  if(AR.phase===1){if(e.blocked)return;AR.enemies.forEach(x=>x.sel=false);e.sel=true}
  else if(AR.phase===2){if(AR.dmg||e.blocked||e.done)return;arDmgStart(e)}
  else e.sel=!e.sel;render()}
function arTotals(){const t=AR.enemies.filter(e=>e.sel&&!e.dead),p=AR.phase;const d=AR.d;
  const fortAny=p===0&&t.some(e=>e.fort||d.site),dbl=p===0&&t.some(e=>e.fort&&d.site);
  const res=el=>el==='cf'?t.some(e=>e.res.includes('fire')&&e.res.includes('ice')):t.some(e=>e.res.includes(el));
  let full=0,half=0,ign=0;AR.pool.forEach(a=>{if(a.k==='block')return;if(p===0&&(a.k==='atk'||(a.k==='ranged'&&fortAny))){ign+=a.n;return}if(res(a.el))half+=a.n;else full+=a.n});
  return{t,fortAny,dbl,full,half,ign,total:full+Math.floor(half/2),need:t.reduce((s,e)=>s+e.armor+(d.armorBonus||0),0)}}
function arAttack(){const r=arTotals();if(!r.t.length){arSay('Sélectionnez au moins un ennemi à attaquer.');return render()}
  if(r.dbl){arSay('Ennemi doublement Fortifié : intouchable en première phase, même au Siège. Attendez la phase d\'Attaque.');return render()}
  if(r.total>=r.need){r.t.forEach(e=>{e.dead=true;e.sel=false});AR.pool=AR.pool.filter(a=>a.k==='block');
    arSay(r.t.map(e=>e.n).join(' et ')+' vaincu'+(r.t.length>1?'s':'')+' : '+r.total+' contre '+r.need+'.'+(r.half?' (Attaques réduites : '+r.half+' ÷ 2.)':''));
    const left=AR.enemies.filter(e=>!e.dead);if(!left.length){AR.wonPhase=AR.phase;return arEnd()}if(left.length===1)left[0].sel=true}
  else arSay('Attaque insuffisante : '+r.total+' contre '+r.need+'.'+(r.half?' Une Résistance divise par deux '+r.half+' de vos points.':'')+(r.ign?' '+r.ign+' point(s) ne comptent pas dans cette phase.':'')+' Rien n\'est perdu : renforcez l\'attaque ou changez de cible.');
  render()}
const EFF2={phys:['phys','fire','ice','cf'],fire:['ice','cf'],ice:['fire','cf'],cf:['cf']};
function arBlockTot(e){let g=0,b=0;AR.pool.forEach(a=>{if(a.k!=='block')return;if(EFF2[e.el].includes(a.el))g+=a.n;else b+=a.n});return{g,b,total:g+Math.floor(b/2),need:e.atk*(e.ab.includes('Vif')?2:1)}}
function arBlock(){const e=AR.enemies.find(x=>x.sel&&!x.dead&&!x.blocked);if(!e){arSay('Choisissez l\'ennemi à parer.');return render()}
  const r=arBlockTot(e);if(r.total>=r.need){e.blocked=true;e.sel=false;AR.pool=AR.pool.filter(a=>a.k!=='block');arSay(e.n+' : attaque parée ('+r.total+' contre '+r.need+').');
    const nx=AR.enemies.find(x=>!x.dead&&!x.blocked);if(nx)nx.sel=true}
  else arSay('Parade insuffisante : '+r.total+' contre '+r.need+'.'+(r.b?' '+r.b+' point(s) inefficaces comptent pour moitié.':'')+' Tout ou rien : ajoutez de la Parade ou renoncez.');render()}
function arNext(){if(AR.phase===0){AR.phase=1;AR.enemies.forEach(e=>e.sel=false);const f=AR.enemies.find(e=>!e.dead);if(f)f.sel=true;arSay('Phase de Parade : les ennemis attaquent.')}
  else if(AR.phase===1){AR.pool=AR.pool.filter(a=>a.k!=='block');AR.enemies.forEach(e=>e.sel=false);AR.phase=2;arSay('Phase de Dégâts.');arDmgAuto()}
  render()}
function arDmgAuto(){const l=AR.enemies.filter(e=>!e.dead&&!e.blocked&&!e.done);if(!l.length){AR.phase=3;AR.dmg=null;const a=AR.enemies.filter(e=>!e.dead);if(a.length===1)a[0].sel=true;arSay('Phase d\'Attaque : toutes vos Attaques comptent.')}else if(l.length===1&&!AR.dmg)arDmgStart(l[0])}
function arDmgStart(e){AR.dmg={e,left:e.atk*(e.ab.includes('Brutal')?2:1)};arSay(e.n+' inflige '+AR.dmg.left+' Dégâts'+(e.ab.includes('Brutal')?' (Brutal : doublés)':'')+'. Répartissez-les.')}
function arUnit(i){if(AR.over)return;const u=AR.units[i];
  if(AR.d.noUnits){arSay('Vos Unités ne vous suivent pas ici : elles ne peuvent ni agir ni encaisser.');return render()}
  if(AR.phase!==2||!AR.dmg){arSay('Dans ce cas pratique, cette Unité sert à encaisser : désignez-la pendant la phase de Dégâts.');return render()}
  if(u.wounds||u.hit||u.dead){arSay('Cette Unité a déjà encaissé pendant ce combat.');return render()}
  const e=AR.dmg.e,el=e.el,res=el==='cf'?u.res.includes('fire')&&u.res.includes('ice'):u.res.includes(el);let m=u.n+' : ';
  if(res){AR.dmg.left-=u.armor;if(AR.dmg.left<=0){u.hit=true;m+='Résistance, tout est absorbé sans Blessure.'}else{u.wounds=1;AR.dmg.left-=u.armor;m+='Résistance, '+u.armor+' absorbés sans Blessure, puis l\'Unité est Blessée et absorbe encore '+u.armor+'.'}}
  else{u.wounds=e.ab.includes('Toxique')?2:1;AR.dmg.left-=u.armor;m+='Blessée, elle absorbe '+u.armor+'.'}
  if(AR.dmg.left<=0){arSay(m+' Tous les Dégâts sont répartis.');AR.dmg.e.done=true;AR.dmg=null;arDmgAuto()}else arSay(m+' Reste '+AR.dmg.left+'.');render()}
function arHero(){const d=AR.dmg,ar=AR.d.armor||2,w=Math.ceil(d.left/ar);for(let i=0;i<w;i++)AR.hand.push({uid:UID++,w:true,n:'Blessure'});AR.wounds+=w;
  arSay('Votre Héros encaisse '+d.left+' Dégâts : '+w+' Blessure'+(w>1?'s':'')+' (Armure '+ar+').'+(AR.wounds>=5?' Assommé : vous défaussez vos autres cartes.':''));
  if(AR.wounds>=5)AR.hand=AR.hand.filter(c=>c.w);d.e.done=true;AR.dmg=null;arDmgAuto();render()}
function arEnd(){AR.over=true;const all=AR.enemies.every(e=>e.dead);let err=all?null:'Il reste un ennemi debout.';if(!err&&AR.d.check)err=AR.d.check(AR);
  AR.ok=!err;AR.msg=err||'Cas réussi.';if(AR.ok)winCase(AR.id);render()}
function arHtml(){const d=AR.d,p=AR.phase,ph=['Distance et Siège','Parade','Dégâts','Attaque'];
  const etag=e=>[e.fort||d.site?'Fortifié':'',...e.ab,e.res.length?'Résiste : '+e.res.map(r=>({phys:'physique',fire:'Feu',ice:'Glace'})[r]).join(', '):''].filter(Boolean).map(x=>`<span class="tag">${x}</span>`).join('');
  let ctl='';
  if(AR.over)ctl=`<div class="goal ${AR.ok?'done':''}"><div class="lab">${AR.ok?'Réussi':'À refaire'}</div>${AR.msg}</div>`;
  else if(p===0||p===3){const r=arTotals();ctl=`<p>${p===0?'Seules vos Attaques à distance et de Siège comptent. Touchez les ennemis visés, jouez vos cartes, puis attaquez.':'Toutes vos Attaques comptent, cartes inclinées comprises. Touchez les ennemis visés.'}</p>
    <div class="pools"><span class="pool on">Attaque <b>${r.total}</b> / ${r.need||'?'}</span>${r.half?`<span class="pool">dont ${r.half} réduits de moitié</span>`:''}${r.ign?`<span class="pool">${r.ign} hors phase</span>`:''}</div>
    <div class="row"><button class="primary" data-ar="attack">Attaquer la sélection</button>${p===0?'<button data-ar="next">Passer à la Parade</button>':'<button data-ar="end">Terminer le combat</button>'}</div>`}
  else if(p===1){const e=AR.enemies.find(x=>x.sel&&!x.dead&&!x.blocked);const r=e?arBlockTot(e):null;ctl=`<p>Chaque ennemi se pare séparément. Touchez celui que vous parez, jouez vos Parades, puis validez.</p>
    ${e?`<div class="pools"><span class="pool on">Parade contre ${e.n} <b>${r.total}</b> / ${r.need}</span>${r.b?`<span class="pool">${r.b} inefficaces, comptés moitié</span>`:''}</div>`:''}
    <div class="row"><button class="primary" data-ar="block" ${e?'':'disabled'}>Parer</button><button data-ar="next">Passer aux Dégâts</button></div>`}
  else ctl=AR.dmg?`<p><b>${AR.dmg.left} Dégâts</b> de ${AR.dmg.e.n} à répartir. Touchez une Unité pour qu'elle encaisse, ou laissez votre Héros prendre le reste.</p><div class="row"><button class="primary" data-ar="hero">Le Héros encaisse</button></div>`:`<p>Touchez l'ennemi dont vous réglez les Dégâts en premier.</p>`;
  return `<div class="arena"><p>${d.intro}</p>${d.siteLbl?`<p class="sitelbl">${d.siteLbl}</p>`:''}
   <ol class="phases">${ph.map((x,i)=>`<li class="${i===p&&!AR.over?'cur':i<p?'past':''}">${i+1}. ${x}</li>`).join('')}</ol>
   <div class="foes">${AR.enemies.map((e,i)=>`<button class="foe ${e.dead?'dead':''} ${e.sel&&!e.dead?'sel':''}" data-foe="${i}"><b>${e.n}</b><span>Armure ${e.armor}${d.armorBonus?' + '+d.armorBonus:''} · Attaque${ELN2[e.el]} ${e.atk}</span><span>${etag(e)}</span><em>${e.dead?'Vaincu':e.blocked?'Paré':e.done?'A frappé':e.sel?'Ciblé':''}</em></button>`).join('')}</div>
   ${ctl}
   <div class="row"><span class="sub">Mana</span>${AR.dice.map(x=>{const off=(x.c==='gold'&&arNight())||(x.c==='black'&&!arNight());return `<span class="die mc-${x.c} ${x.used?'used':off?'off':''}" style="color:${x.c==='w'||x.c==='gold'?'#12202a':'#fff'}" title="Dé ${COL[x.c]}${off?' : inutilisable ici':''}">${COL[x.c].slice(0,2)}</span>`}).join('')||'<small>aucun dé</small>'}
     ${BASIC.filter(c=>AR.cry[c]).map(c=>`<span class="gem mc-${c}"></span><b>${AR.cry[c]}</b>`).join('')}<small>${arNight()?'Nuit : or inutilisable, noir utilisable':'Jour : noir inutilisable'} · un dé par tour</small></div>
   ${AR.units.length?`<div class="row">${AR.units.map((u,i)=>`<button class="unitb ${u.wounds?'w':''}" data-aunit="${i}"><b>${u.n}</b> · Armure ${u.armor}${u.res.length?' · Résistance physique':''}${u.wounds?' · Blessée':u.hit?' · a encaissé':''}${d.noUnits?' · restée dehors':''}</button>`).join('')}</div>`:''}
   <div class="hand">${AR.hand.map(c=>c.w?`<div class="card wound"><div class="band"></div><div class="in"><div class="cname">Blessure</div><div class="eff">Injouable.</div></div></div>`:
     `<div class="card"><div class="band mc-${c.c}"></div><div class="in"><div class="cname">${c.n}${c.ex?' <small>(exemple)</small>':''}</div><div class="eff"><i>${c.type==='s'?'Base, 1 mana '+COL[c.c]:'Base'}</i>${c.bt}</div><div class="eff"><i>${c.type==='x'?'Amélioré, en le détruisant':c.type==='s'?'Amélioré, '+COL[c.c]+' + noir':'Amélioré, 1 mana '+COL[c.c]}</i>${c.st}</div>
      <div class="btns"><button data-ap="base" data-uid="${c.uid}">Base</button><button data-ap="strong" data-uid="${c.uid}">Amélioré</button><button class="side" data-ap="side" data-uid="${c.uid}">Inclinée (+1)</button></div></div></div>`).join('')||'<p class="muted">Plus de cartes en main.</p>'}</div>
   <div class="log" aria-live="polite">${AR.log.map(l=>`<div>${l}</div>`).join('')}</div>
   <div class="row"><button data-ar="restart">Recommencer ce cas</button></div><details class="hint"><summary>Une solution</summary><p>${d.hint}</p></details></div>`}

/* --- Récits à étapes et sélections --- */
function stStart(id){const d=CASES[id];ST={id,d,i:0,pick:null,x:d.init?d.init():{}}}
const stVal=(v)=>typeof v==='function'?v(ST.x):v;
function stHtml(){const d=ST.d;if(ST.i>=d.steps.length)return `<div class="goal done"><div class="lab">Réussi</div>Vous avez déroulé tout l'exemple.</div><div class="row"><button data-st="restart">Rejouer l'exemple</button></div>`;
  const s=d.steps[ST.i],o=stVal(s.o),p=ST.pick;
  return `<div class="story"><div class="step">Étape ${ST.i+1} sur ${d.steps.length}</div><p class="sit">${stVal(s.t)}</p>
   <div class="opts2">${o.map((x,k)=>`<button data-st="${k}" class="${p===k?(x[1]?'right':'wrong'):''}" ${p!==null&&o[p][1]?'disabled':''}>${x[0]}</button>`).join('')}</div>
   ${p===null?'':`<p class="fb ${o[p][1]?'good':'bad'}">${o[p][2]}</p>`}${p!==null&&o[p][1]?`<div class="row"><button class="primary" data-st="next">${ST.i+1<d.steps.length?'Continuer':'Terminer'}</button></div>`:''}</div>`}
function slStart(id){SL={id,d:CASES[id],sel:new Set(),fb:null}}
function slHtml(){const d=SL.d;return `<div class="story"><p class="sit">${d.intro}</p><div class="row">${d.items.map((it,i)=>`<button data-sl="${i}" class="chipb ${SL.sel.has(i)?'on':''} ${it[1]===1?'wd':''}">${it[0]}</button>`).join('')}</div>
   <div class="row"><button class="primary" data-sl="go">${d.action}</button></div>${SL.fb?`<p class="fb ${SL.fb[0]?'good':'bad'}">${SL.fb[1]}</p>`:''}</div>`}

/* --- Rendu du parcours --- */
function ensureCase(){const id=activeCase();if(!id)return null;const c=CASES[id];
  if(c.type==='board'){if(BOARD!==c.li){BOARD=c.li;setupBoard(c.li)}}
  else if(c.type==='arena'){if(!AR||AR.id!==id)arStart(id)}
  else if(c.type==='story'){if(!ST||ST.id!==id)stStart(id)}
  else if(!SL||SL.id!==id)slStart(id);
  return id}
function renderCourse(){const T=COURSE[TI],id=ensureCase(),c=id&&CASES[id];if(T.glo){SEEN.add(TI);persist()}
  $('#c-top').innerHTML=`<div class="panel"><div class="eyebrow">${T.part} · ${T.opt?'facultatif':`chapitre ${TI+1} sur ${COURSE.length-1}`}</div><h2 class="chtitle">${T.h}</h2>
    ${T.glo?`<dl class="glo">${T.glo.map(g=>`<dt>${g[0]}</dt><dd>${g[1]}</dd>`).join('')}</dl>`:`<ul class="rules">${T.rules.map(r=>`<li>${r}</li>`).join('')}</ul>`}${T.lab?labHtml():''}${precis(T)}</div>
   ${T.cases.length?`<div class="panel"><div class="row between"><h2>Cas pratique${T.cases.length>1?'s':''}</h2><span class="muted">${T.cases.filter(x=>CDONE.has(x)).length} / ${T.cases.length} réussi${T.cases.length>1?'s':''}</span></div>
    <div class="casetabs">${T.cases.map(x=>`<button data-case="${x}" class="${x===id?'cur':''} ${CDONE.has(x)?'ok':''}">${caseTitle(x)}</button>`).join('')}</div>
    ${c.type==='board'?`<p class="muted">Ce cas se joue sur le plateau ci-dessous : consigne à gauche, cartes en bas.</p>`:c.type==='arena'?arHtml():c.type==='story'?`<h3>${c.title}</h3>`+stHtml():`<h3>${c.title}</h3>`+slHtml()}</div>`:''}`;
  $('#c-bot').innerHTML=(T.quiz.length?`<div class="panel"><h2>Vérifier</h2>${T.quiz.map((q,j)=>{const a=ANS[TI][j];return `<div class="q"><p><b>${j+1}.</b> ${q.q}</p><div class="opts2">${q.o.map((o,k)=>`<button data-ans="${j}:${k}" class="${a===k?(k===q.a?'right':'wrong'):''}">${o}</button>`).join('')}</div>${a===undefined||a===null?'':`<p class="fb ${a===q.a?'good':'bad'}">${a===q.a?'Exact. '+q.why:'Pas tout à fait. Relisez les règles du chapitre et réessayez.'}</p>`}</div>`}).join('')}</div>`:'')
   +`<div class="row between">${TI>0?`<button data-topic="${TI-1}">Chapitre précédent</button>`:'<span></span>'}${TI<COURSE.length-1?`<button class="${chapDone(TI)?'primary':''}" data-topic="${TI+1}">Chapitre suivant</button>`:`<button class="primary" data-chap="free">Lancer une partie libre</button>`}</div>`}
function renderNav(){const OPT=COURSE.findIndex(t=>t.opt),fire=OPT>=0&&chapDone(OPT),done=COURSE.filter((t,i)=>i!==OPT&&chapDone(i)).length+(fire?1:0),TOT=COURSE.length-(OPT>=0&&!fire?1:0);
  let h=NAVHEAD+`<div class="bar"><i style="width:${Math.round(100*done/TOT)}%"></i></div><div class="barlabel">${done} chapitre${done>1?'s':''} validé${done>1?'s':''} sur ${TOT}${fire?' 🔥':''}</div>`,last='';
  COURSE.forEach((t,i)=>{if(t.part!==last){h+=`<div class="part">${t.part}</div>`;last=t.part}h+=`<button data-topic="${i}" class="${i===TI?'cur':''}"><span class="n">${i+1}</span>${t.t}${chapDone(i)?'<span class="tick">✓</span>':''}</button>`});
  $('#side-nav').innerHTML=h}