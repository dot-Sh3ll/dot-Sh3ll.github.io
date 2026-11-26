#!/usr/bin/env python3
"""Mage Knight : « À ne pas oublier » et « Précisions » des chapitres du tutoriel, et le chapitre facultatif « Cas épineux ».

usage : python3 outils/mage-knight/precisions.py      (depuis la racine du dépôt), puis seo.py

Source : Mage Knight Board Game, Unofficial Compendium of Q&A (BoardGameGeek, 23 août 2026), partie « Clarifications by
Mechanic », croisée avec le tutoriel. Seuls les points utiles à un joueur qui apprend ont été retenus.

Principe (charge mentale) :
  - « À ne pas oublier » : au plus un par chapitre, visible, réservé aux erreurs fréquentes ;
  - « Précisions » : tout le reste, dans un bloc fermé par défaut, en fin de chapitre ;
  - « Cas épineux » : chapitre facultatif placé tout à la fin (après le Glossaire, pour ne pas décaler les progrès
    enregistrés), fait de quiz qui renvoient chacun au chapitre concerné.

Le script pose dans mage-knight/index.html et en.html un bloc /*precisions*/…/*/precisions*/ juste après la définition
de TP (données et rendu) et ajoute l'affichage dans renderCourse. Rejouable.
"""
import json, os, re, sys

URL = "https://boardgamegeek.com/filepage/218596/q-and-a-compendium"
BILL = "https://boardgamegeek.com/profile/BillNC"
ROOT = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".."))

UI = {
 "fr": {"att": "À ne pas oublier", "prec": "Précisions", "src": "D'après le Q&A Compendium de BoardGameGeek (août 2026).",
        "part": "Pour aller plus loin", "voir": "Voir le chapitre", "fac": "facultatif",
        "sources": "D'après le livret de règles",
        "avec": "Avec les précisions du Q&amp;A Compendium.",
        "merci": "Merci à <a href=\"{bill}\" rel=\"noopener\">BillNC</a> pour <a href=\"{url}\" rel=\"noopener\">son Q&amp;A Compendium</a> sur BoardGameGeek."},
 "en": {"att": "Don't forget", "prec": "Clarifications", "src": "Based on the BoardGameGeek Q&A Compendium (August 2026).",
        "part": "Going further", "voir": "See the chapter", "fac": "optional",
        "sources": "Based on the rulebook",
        "avec": "With the Q&amp;A Compendium clarifications.",
        "merci": "Thanks to <a href=\"{bill}\" rel=\"noopener\">BillNC</a> for <a href=\"{url}\" rel=\"noopener\">his Q&amp;A Compendium</a> on BoardGameGeek."},
}

# chapitre (titre court t, dans chaque langue) -> attention (facultatif), faq (liste)
CH = [
 {"fr": "Le mana", "en": "Mana",
  "faq_fr": ["Un dé or pris dans la Source doit servir tout de suite, dans la couleur choisie à ce moment-là : vous ne pouvez pas l'emporter dans un Donjon pour décider plus tard. Le transformer aussitôt en Cristal, en revanche, est permis.",
             "Les dés utilisés sont relancés et remis dans la Source tels quels. Même si tous deviennent or ou noirs, on ne relance pas toute la Source en cours de Manche : l'équilibre n'est vérifié qu'au début des Manches.",
             "Un effet qui vous fait « prendre un dé » dans la Source s'ajoute à votre dé gratuit du tour ; il ne le remplace pas."],
  "faq_en": ["A gold die taken from the Source must be used at once, as the colour you pick then: you cannot carry it into a Dungeon to decide later. Turning it straight into a Crystal is allowed, though.",
             "Used dice are rerolled and put back in the Source as they land. Even if they all turn gold or black, the Source is not rerolled mid-Round: the balance is only checked at the start of each Round.",
             "An effect that lets you \"take a die\" from the Source comes on top of your free die for the turn; it does not replace it."]},
 {"fr": "Le tour", "en": "The turn",
  "att_fr": "Votre Limite de cartes en main ne vous oblige jamais à défausser : si vous avez déjà autant de cartes ou plus, vous ne piochez simplement pas.",
  "att_en": "Your Hand Limit never forces you to discard: if you already hold that many cards or more, you simply don't draw.",
  "faq_fr": ["Les points de Mouvement et d'Influence non dépensés disparaissent dès que votre action commence ; les points de Soin, dès qu'un combat commence.",
             "Après votre action, même un combat, vous pouvez encore jouer des effets spéciaux et des Soins avant la fin du tour, mais ni vous déplacer ni interagir.",
             "Une fois la fin du tour commencée, plus rien ne se joue : ni carte, ni Compétence, ni Unité."],
  "faq_en": ["Unspent Move and Influence points vanish as soon as your action starts; Healing points, as soon as a combat starts.",
             "After your action, even a combat, you may still play special effects and Healing before the end of the turn, but neither move nor interact.",
             "Once the end of the turn has begun, nothing more can be played: no card, Skill or Unit."]},
 {"fr": "Mouvement", "en": "Move",
  "faq_fr": ["Explorer depuis une case voisine d'un ennemi errant ne le provoque pas : seul un pas d'une case voisine de lui à une autre case voisine de lui le provoque.",
             "Un assaut raté vous ramène sur la case d'où vous êtes entré, sans Blessure, sans coût de Mouvement et sans provoquer personne. Ce n'est pas une Retraite forcée.",
             "Vaincre un ennemi errant ne vous fait jamais entrer sur sa case."],
  "faq_en": ["Exploring from a space next to a rampaging enemy does not provoke it: only a step from one space next to it to another space next to it does.",
             "A failed assault sends you back to the space you entered from, with no Wound, no Move cost and no provoking. It is not a Forced Withdrawal.",
             "Defeating a rampaging enemy never moves you onto its space."]},
 {"fr": "Interaction", "en": "Interaction",
  "att_fr": "Vous ne pouvez pas interagir avec un site le tour où vous venez de le conquérir : votre action du tour était le combat. Revenez-y un tour suivant.",
  "att_en": "You cannot interact with a site on the turn you conquer it: your action that turn was the combat. Come back on a later turn.",
  "faq_fr": ["Le modificateur de Réputation s'applique dès que vous annoncez l'interaction, même si vous n'achetez rien ; une Réputation positive peut à elle seule payer un Soin ou un recrutement.",
             "Vous pouvez recruter plusieurs Unités dans la même interaction, et vous servir de la première pour payer la deuxième.",
             "Sur la case X, vous ne pouvez plus interagir, mais vous pouvez toujours piller, brûler un Monastère ou donner l'assaut : ces actions restent permises même si elles font normalement baisser la Réputation."],
  "faq_en": ["The Reputation modifier applies as soon as you declare the interaction, even if you buy nothing; a positive Reputation alone can pay for Healing or a recruit.",
             "You may recruit several Units in the same interaction, and use the first one to help pay for the second.",
             "On the X space you can no longer interact, but you can still plunder, burn a Monastery or assault: these actions remain allowed even though they normally lower Reputation."]},
 {"fr": "Le combat", "en": "Combat",
  "att_fr": "Vaincre un ennemi errant ne vous fait pas entrer sur sa case : vous restez où vous êtes.",
  "att_en": "Defeating a rampaging enemy does not move you onto its space: you stay where you are.",
  "faq_fr": ["Seule la phase des Dégâts est obligatoire ; vous pouvez ne rien jouer dans les trois autres.",
             "La Gloire, et la Réputation pour les ennemis qui en rapportent, se gagnent pour chaque ennemi vaincu, même si d'autres survivent. La récompense d'un site, elle, demande de vaincre tous ses défenseurs.",
             "Lors d'un assaut, les ennemis errants que vous ne battez pas ne vous empêchent pas de conquérir le site."],
  "faq_en": ["Only the Damage phase is mandatory; you may play nothing in the other three.",
             "Fame, and Reputation for enemies that give it, are earned for each enemy defeated, even if others survive. A site's reward, however, requires defeating all its defenders.",
             "During an assault, rampaging enemies you fail to beat do not stop you from conquering the site."]},
 {"fr": "Blessures", "en": "Wounds",
  "att_fr": "Chaque attaque se convertit en Blessures séparément. Si votre Héros a une Armure de 4, des attaques de 3, 4, 5 et 6 lui font 1 + 1 + 2 + 2 = 6 Blessures, pas 18 ÷ 4 = 5.",
  "att_en": "Each attack is turned into Wounds separately. If your Hero has Armor 4, attacks of 3, 4, 5 and 6 give it 1 + 1 + 2 + 2 = 6 Wounds, not 18 ÷ 4 = 5.",
  "faq_fr": ["Pour une même attaque, si des Unités encaissent, elles passent avant le Héros ; dès que le Héros en prend une part, tout le reste de cette attaque va au Héros.",
             "Les Blessures que Toxique envoie dans votre défausse ne comptent pas pour être Assommé. On n'est Assommé qu'une fois par tour, et Unités et Compétences restent utilisables.",
             "En vous Reposant, vous annoncez seulement que vous vous reposez : vous pouvez d'abord jouer des Soins, puis choisir le Repos Standard ou le Repos Prolongé.",
             "Un Soin retire une Blessure de votre main, jamais de votre défausse ; sur une Unité doublement Blessée, il n'en retire qu'une.",
             "La Clairière Magique n'est pas un Soin mais une étape de fin de tour : elle retire une Blessure même le tour où vous vous Reposez, mais jamais à une Unité. Acheter un Soin au Monastère, au contraire, est une interaction, donc impossible pendant un Repos."],
  "faq_en": ["For a given attack, any Units taking damage do so before the Hero; once the Hero takes part of it, the rest of that attack goes to the Hero.",
             "Wounds that Poison sends to your discard pile do not count towards being Knocked Out. You can be Knocked Out only once per turn, and Units and Skills remain usable.",
             "When you Rest, you just announce that you are resting: you may play Healing first, then choose Standard Rest or Slow Recovery.",
             "Healing removes a Wound from your hand, never from your discard pile; on a Unit with two Wounds, it removes only one.",
             "A Magical Glade is not Healing but an end-of-turn step: it removes a Wound even on a turn when you Rest, but never from a Unit. Buying Healing at a Monastery, on the other hand, is an interaction, so it is not possible while Resting."]},
 {"fr": "Niveaux", "en": "Levels",
  "faq_fr": ["À un Niveau pair, vous prenez la Compétence et l'Action Avancée : on ne peut pas refuser la carte.",
             "La carte gagnée en montant de Niveau va sur les récompenses de combat du même tour : elle se trouve donc au-dessus d'elles dans votre Deck."],
  "faq_en": ["At an even Level you take both the Skill and the Advanced Action: you cannot turn the card down.",
             "The card gained by levelling up goes on top of that turn's combat rewards in your Deck."]},
 {"fr": "La Manche", "en": "The Round",
  "att_fr": "Annoncer la fin de la Manche remplace tout votre tour : pas de fin de tour, donc pas de Blessure retirée par une Clairière Magique.",
  "att_en": "Announcing the end of the Round replaces your whole turn: no end-of-turn sequence, so no Wound removed by a Magical Glade.",
  "faq_fr": ["Le Fantôme n'annonce la fin de la Manche que si son Deck est vide au début de son tour. S'il le vide en retournant ses cartes, il l'annonce au tour suivant.",
             "Au début de chaque Manche de Jour, on révèle les jetons Ruines et les garnisons des sites fortifiés voisins d'un Héros, avant le choix des Tactiques.",
             "Toutes les étapes de fin de Manche sont obligatoires : Unités redressées, Compétences retournées, cartes remélangées."],
  "faq_en": ["The Dummy only announces the end of the Round if its Deck is empty at the start of its turn. If it empties it while flipping cards, it announces it on its next turn.",
             "At the start of each Day Round, Ruins tokens and the garrisons of fortified sites next to a Hero are revealed, before Tactics are chosen.",
             "All end-of-Round steps are mandatory: Units readied, Skills flipped back, cards reshuffled."]},
 {"fr": "Jour et Nuit", "en": "Day and Night",
  "faq_fr": ["Le mana or ne peut jamais servir de noir, et le noir n'est jamais un joker, sauf si un effet le dit.",
             "La Nuit, vous pouvez donner l'assaut à une Forteresse ou une Tour de Mage sans connaître sa garnison.",
             "Dans un Donjon ou un Tombeau, il fait toujours Nuit : mana noir permis, mana or interdit, même en plein Jour."],
  "faq_en": ["Gold mana can never be used as black, and black is never wild, unless an effect says so.",
             "At Night, you may assault a Keep or Mage Tower without knowing its garrison.",
             "In a Dungeon or Tomb it is always Night: black mana allowed, gold mana not, even by Day."]},
 {"fr": "Unités", "en": "Units",
  "faq_fr": ["Une Unité Résistante qui absorbe toute l'attaque sans être Blessée peut encore utiliser une capacité plus tard dans le combat, si elle est Disponible.",
             "Les Unités absentes du combat ne peuvent pas encaisser : quand vous brûlez un Monastère, dans un Donjon ou un Tombeau, ou si elles ne vous accompagnent pas dans un Dédale."],
  "faq_en": ["A Resistant Unit that absorbs the whole attack without being Wounded may still use an ability later in the combat, if it is Ready.",
             "Units not in the combat cannot take damage: when burning a Monastery, in a Dungeon or Tomb, or if they don't come with you into a Maze."]},
 {"fr": "Éléments", "en": "Elements",
  "faq_fr": ["Aux Dégâts, l'élément ne compte plus : une Attaque de Feu Glacé 9 fait 9 Dégâts, sauf sur une Unité qui résiste à la fois au Feu et à la Glace.",
             "Un effet payé avec du mana rouge ou bleu ne devient pas de Feu ou de Glace : il faut que le texte le dise."],
  "faq_en": ["At the Damage step, the element no longer matters: a Cold Fire Attack 9 deals 9 Damage, except to a Unit resistant to both Fire and Ice.",
             "An effect paid with red or blue mana does not become Fire or Ice: the text has to say so."]},
 {"fr": "Capacités", "en": "Abilities",
  "faq_fr": ["Invocation : pour annuler l'attaque d'un invocateur, il faut le faire au début de la phase de Parade, avant de piocher le jeton invoqué.",
             "Lourd : chaque point de Mouvement réduit l'attaque, même si vous ne la ramenez pas à 0 ; les Dégâts restants sont plus faibles.",
             "Immunité aux Arcanes : l'ennemi ignore vos effets, mais ses attaques, elles, peuvent être réduites."],
  "faq_en": ["Summon: to cancel a summoner's attack, do it at the start of the Block phase, before drawing the summoned token.",
             "Cumbersome: each Move point reduces the attack even if you don't bring it to 0; the remaining Damage is lower.",
             "Arcane Immunity: the enemy ignores your effects, but its attacks can still be reduced."]},
 {"fr": "Plusieurs ennemis", "en": "Several enemies",
  "att_fr": "Dans un groupe, seules deux choses s'étendent à tout le groupe : les Résistances et la Fortification. Insaisissable, Défense ou Immunité aux Arcanes restent propres à chaque ennemi.",
  "att_en": "In a group, only two things extend to the whole group: Resistances and Fortification. Elusive, Defend or Arcane Immunity stay with each enemy.",
  "faq_fr": ["Si un seul ennemi du groupe est doublement Fortifié, aucune Attaque à Distance ni de Siège n'est possible contre ce groupe en première phase.",
             "Un groupe est vaincu en entier ou pas du tout ; les points en trop sont perdus et ne passent pas à un autre groupe.",
             "Si votre déplacement provoque un ennemi errant, vous ne pouvez plus entrer dans un site d'aventures ce tour-ci.",
             "Les Draconiens d'un Tombeau ou d'un Dédale ne sont pas des ennemis errants : les vaincre rapporte de la Gloire, mais pas de Réputation."],
  "faq_en": ["If even one enemy in the group is Double Fortified, no Ranged or Siege Attack can be made against that group in the first phase.",
             "A group is defeated as a whole or not at all; excess points are lost and do not move to another group.",
             "If your move provokes a rampaging enemy, you can no longer enter an adventure site this turn.",
             "Draconum in a Tomb or a Labyrinth are not rampaging enemies: defeating them gives Fame, but no Reputation."]},
 {"fr": "Sorts", "en": "Spells",
  "faq_fr": ["Les Offres de Sorts et d'Actions Avancées se complètent aussitôt : si vous achetez deux Sorts, le deuxième se choisit parmi l'Offre déjà complétée."],
  "faq_en": ["The Spell and Advanced Action Offers are refilled at once: if you buy two Spells, the second is chosen from the refilled Offer."]},
 {"fr": "Sites habités", "en": "Inhabited sites",
  "faq_fr": ["Brûler un Monastère ne se combine avec aucun combat contre des ennemis errants ; si votre déplacement en provoque un, vous ne pouvez plus le brûler ce tour-ci.",
             "Un Monastère brûlé devient une case vide de son terrain : tout le monde peut y entrer, plus personne n'y interagit.",
             "Prendre la Forteresse d'un autre joueur ne rapporte que la moitié de la Gloire du jeton gris, arrondie au supérieur."],
  "faq_en": ["Burning a Monastery cannot be combined with any combat against rampaging enemies; if your move provokes one, you can no longer burn it this turn.",
             "A burnt Monastery becomes an empty space of its terrain: anyone may enter, nobody interacts there any more.",
             "Taking another player's Keep gives only half the grey token's Fame, rounded up."]},
 {"fr": "Aventures", "en": "Adventures",
  "faq_fr": ["Si vous ne battez pas tout le monde dans un site d'aventures, vous restez sur sa case et vous pourrez y retourner un autre tour.",
             "Ennemi non vaincu : il est défaussé dans un Donjon, un Tombeau ou si vous tentiez de brûler un Monastère ; il reste sur place dans un Antre, des Terriers ou des Ruines."],
  "faq_en": ["If you don't beat everyone in an adventure site, you stay on its space and may go back in on another turn.",
             "Undefeated enemy: it is discarded in a Dungeon or Tomb, or if you were trying to burn a Monastery; it stays there in a Monster Den, Spawning Grounds or Ruins."]},
 {"fr": "Cités", "en": "Cities",
  "faq_fr": ["On n'achète pas de Soin dans une Cité.",
             "Les défenseurs vaincus lors d'un assaut raté ne reviennent pas : au prochain assaut, vous n'affrontez que ceux qui restent.",
             "Les bonus Brutal (rouge) et Toxique (verte) ne touchent que les attaques physiques. La Cité blanche ajoute 1 aux deux valeurs d'Armure d'un ennemi Insaisissable.",
             "Au score, les Boucliers posés sur une Cité non conquise ne comptent pas."],
  "faq_en": ["You cannot buy Healing in a City.",
             "Defenders defeated during a failed assault do not come back: next time, you only face those that remain.",
             "The Brutal (red) and Poison (green) bonuses only apply to physical attacks. The white City adds 1 to both Armor values of an Elusive enemy.",
             "At scoring, Shields placed on an unconquered City do not count."]},
 {"fr": "Solo et score", "en": "Solo and scoring",
  "faq_fr": ["Le Fantôme ne compte pas comme un joueur : en solo, la Source a 3 dés et l'Offre des Unités 3 cartes, sauf dans un scénario Éclair ou contre Volkare, qui en ajoutent un de chaque.",
             "Au score, chaque Unité Blessée compte pour la moitié de son niveau, arrondie à l'inférieur, Unité par Unité.",
             "Les cartes détruites pendant la partie ne comptent pas au score."],
  "faq_en": ["The Dummy is not a player: in solo, the Source has 3 dice and the Unit Offer 3 cards, except in a Blitz scenario or against Volkare, which add one of each.",
             "At scoring, each Wounded Unit counts half its level, rounded down, Unit by Unit.",
             "Cards destroyed during the game do not count at scoring."]},
]

# Chapitre facultatif « Cas épineux » : chaque question renvoie au chapitre concerné.
EPINEUX = {
 "fr": {"t": "Cas épineux", "h": "Cas épineux (facultatif)",
  "rules": ["Ce chapitre est facultatif. Il rassemble les situations où l'on se trompe le plus souvent, sous forme de questions.",
            "Chaque explication renvoie au chapitre où la règle est expliquée. Vous pouvez y revenir à tout moment."],
  "quiz": [
   {"q": "Vous battez des Orques Maraudeurs provoqués en chemin. Où se trouve votre Héros après le combat ?", "o": ["Sur la case des Orques", "Sur la case où il s'est arrêté", "Sur sa case de départ"], "a": 1,
    "why": "Vaincre un ennemi errant ne vous fait jamais entrer sur sa case. Voir le chapitre « Le combat »."},
   {"q": "Votre Héros a une Armure de 4. Trois attaques non parées de 3, 5 et 6 le visent. Combien de Blessures ?", "o": ["4", "5", "6"], "a": 1,
    "why": "Chaque attaque séparément : 1 + 2 + 2 = 5. Additionner d'abord (14 ÷ 4 = 4) serait une erreur. Voir le chapitre « Blessures »."},
   {"q": "Vous avez 7 cartes en main pour une Limite de 5. Que se passe-t-il en fin de tour ?", "o": ["Vous défaussez 2 cartes", "Vous gardez vos 7 cartes et ne piochez pas", "Vous défaussez toute votre main"], "a": 1,
    "why": "La Limite ne force jamais à défausser. Voir le chapitre « Le tour »."},
   {"q": "Votre Deck est vide et vous êtes sur une Clairière Magique avec une Blessure en main. Vous annoncez la fin de la Manche. La Clairière retire-t-elle la Blessure ?", "o": ["Oui", "Non : annoncer la fin de la Manche remplace tout le tour, fin de tour comprise", "Seulement de Nuit"], "a": 1,
    "why": "Sans fin de tour, pas d'effet de Clairière. Voir le chapitre « La Manche »."},
   {"q": "Vous groupez un Golem (Résistance physique) et un ennemi Insaisissable. Qu'est-ce qui s'applique à tout le groupe ?", "o": ["La Résistance physique seulement", "L'Insaisissable seulement", "Les deux"], "a": 0,
    "why": "Seules les Résistances et la Fortification s'étendent au groupe. Voir le chapitre « Plusieurs ennemis »."},
   {"q": "Un assaut sur une Forteresse échoue. Que perdez-vous ?", "o": ["Une Blessure par case de recul", "Rien de plus : vous revenez sur la case d'où vous êtes entré, sans Blessure", "Votre prochain tour"], "a": 1,
    "why": "Ce n'est pas une Retraite forcée : ni Blessure, ni Mouvement, ni provocation. La Réputation perdue en entrant reste perdue. Voir le chapitre « Mouvement »."},
   {"q": "Vous prenez un dé or de Jour, puis entrez dans un Donjon. Pouvez-vous l'y utiliser comme mana vert ?", "o": ["Oui", "Non : il fallait l'utiliser tout de suite en le prenant", "Oui, mais comme mana noir"], "a": 1,
    "why": "Un dé pris dans la Source s'utilise aussitôt. Le transformer en Cristal vert avant d'entrer, en revanche, aurait marché. Voir le chapitre « Le mana »."},
   {"q": "Une Attaque de Feu Glacé 8 n'est pas parée. Combien de Dégâts pour votre Héros ?", "o": ["8", "16", "4"], "a": 0,
    "why": "Aux Dégâts, l'élément ne compte plus. Voir le chapitre « Éléments »."},
   {"q": "Vous commencez votre tour à côté d'Orques Maraudeurs et dépensez 2 points pour révéler une tuile. Les Orques vous attaquent-ils ?", "o": ["Oui : vous êtes à côté d'eux", "Non : explorer ne vous déplace pas", "Seulement si la tuile révèle un site"], "a": 1,
    "why": "Seul un pas d'une case voisine d'un ennemi errant à une autre case voisine de lui le provoque. Voir le chapitre « Mouvement »."},
   {"q": "Une Unité de niveau 2 porte deux Blessures. Vous lui consacrez 2 points de Soin. Dans quel état est-elle ?", "o": ["Entièrement soignée", "Encore Blessée une fois", "Toujours doublement Blessée : il fallait 4 points d'un coup"], "a": 1,
    "why": "Chaque Blessure se soigne à part, pour autant de points que le niveau de l'Unité : 2 points en retirent une. Voir le chapitre « Blessures »."},
   {"q": "Vous entrez dans un Donjon avec deux Unités Disponibles. Que peuvent-elles faire pendant le combat ?", "o": ["Combattre et encaisser comme d'habitude", "Rien : elles ne vous suivent pas, ni capacité ni Dégâts", "Encaisser des Dégâts, sans utiliser de capacité"], "a": 1,
    "why": "Dans un Donjon ou un Tombeau, vos Unités restent dehors. Voir le chapitre « Unités »."}]},
 "en": {"t": "Tricky cases", "h": "Tricky cases (optional)",
  "rules": ["This chapter is optional. It gathers the situations where players most often go wrong, as questions.",
            "Each explanation points to the chapter where the rule is explained. You can come back to it at any time."],
  "quiz": [
   {"q": "You defeat Orc Marauders you provoked on the way. Where is your Hero after the combat?", "o": ["On the Orcs' space", "On the space where it stopped", "On its starting space"], "a": 1,
    "why": "Defeating a rampaging enemy never moves you onto its space. See the \"Combat\" chapter."},
   {"q": "Your Hero has Armor 4. Three unblocked attacks of 3, 5 and 6 target it. How many Wounds?", "o": ["4", "5", "6"], "a": 1,
    "why": "Each attack separately: 1 + 2 + 2 = 5. Adding them first (14 ÷ 4 = 4) would be wrong. See the \"Wounds\" chapter."},
   {"q": "You hold 7 cards with a Hand Limit of 5. What happens at the end of the turn?", "o": ["You discard 2 cards", "You keep your 7 cards and draw nothing", "You discard your whole hand"], "a": 1,
    "why": "The Hand Limit never forces a discard. See \"The turn\" chapter."},
   {"q": "Your Deck is empty and you stand on a Magical Glade with a Wound in hand. You announce the end of the Round. Does the Glade remove the Wound?", "o": ["Yes", "No: announcing the end of the Round replaces the whole turn, end of turn included", "Only at Night"], "a": 1,
    "why": "No end of turn, no Glade effect. See \"The Round\" chapter."},
   {"q": "You group a Golem (Physical Resistance) with an Elusive enemy. What applies to the whole group?", "o": ["Only the Physical Resistance", "Only Elusive", "Both"], "a": 0,
    "why": "Only Resistances and Fortification extend to the group. See the \"Several enemies\" chapter."},
   {"q": "An assault on a Keep fails. What do you lose?", "o": ["One Wound per space retreated", "Nothing more: you go back to the space you entered from, with no Wound", "Your next turn"], "a": 1,
    "why": "It is not a Forced Withdrawal: no Wound, no Move, no provoking. The Reputation lost on entering stays lost. See the \"Move\" chapter."},
   {"q": "You take a gold die by Day, then enter a Dungeon. Can you use it there as green mana?", "o": ["Yes", "No: it had to be used at once when taken", "Yes, but as black mana"], "a": 1,
    "why": "A die taken from the Source is used at once. Turning it into a green Crystal before entering would have worked. See the \"Mana\" chapter."},
   {"q": "A Cold Fire Attack 8 is not blocked. How much Damage for your Hero?", "o": ["8", "16", "4"], "a": 0,
    "why": "At the Damage step, the element no longer matters. See the \"Elements\" chapter."},
   {"q": "You start your turn next to Orc Marauders and spend 2 points to reveal a tile. Do the Orcs attack you?", "o": ["Yes: you are next to them", "No: exploring does not move you", "Only if the tile reveals a site"], "a": 1,
    "why": "Only a step from one space next to a rampaging enemy to another space next to it provokes it. See the \"Move\" chapter."},
   {"q": "A level 2 Unit has two Wounds. You spend 2 Healing points on it. What state is it in?", "o": ["Fully healed", "Still Wounded once", "Still Wounded twice: you needed 4 points at once"], "a": 1,
    "why": "Each Wound is healed separately, for as many points as the Unit's level: 2 points remove one. See the \"Wounds\" chapter."},
   {"q": "You enter a Dungeon with two Ready Units. What can they do during the combat?", "o": ["Fight and take damage as usual", "Nothing: they don't come with you, no ability and no damage", "Take damage, but use no ability"], "a": 1,
    "why": "In a Dungeon or Tomb, your Units stay outside. See the \"Units\" chapter."}]},
}

CSS = (".app-tuto .lrmp-att{margin:14px 0 0;padding:10px 13px;border-left:4px solid var(--bad);border-radius:6px;"
       "background:color-mix(in srgb,var(--bad) 10%,var(--panel));line-height:1.45}"
       ".app-tuto .lrmp-att b{color:var(--bad)}"
       ".app-tuto details.lrmp-prec{margin:12px 0 0;border:1px solid var(--line);border-radius:8px;padding:0 12px}"
       ".app-tuto details.lrmp-prec summary{cursor:pointer;padding:9px 0;font-weight:700;color:var(--accent)}"
       ".app-tuto details.lrmp-prec ul{margin:0 0 6px;padding-left:18px}.app-tuto details.lrmp-prec li{margin:0 0 6px;line-height:1.45}"
       ".app-tuto details.lrmp-prec .src{font-size:.85em;color:var(--muted);margin:0 0 10px}"
       ".app-tuto header.top{display:none}"
       ".app-tuto #side-nav .navhead{margin:2px 4px 12px}.app-tuto #side-nav .navhead h1{font-size:1.3rem;margin:0 0 6px;line-height:1.2}"
       ".app-tuto #side-nav .bar{flex:none;height:8px;border-radius:4px;margin:4px 6px 6px;background:color-mix(in srgb,var(--muted) 25%,transparent)}"
       ".app-tuto #side-nav .bar i{background:var(--accent);border-radius:4px}"
       ".app-tuto #side-nav .barlabel{flex:none;font-size:.85rem;margin:0 6px 6px}"
       ".app-tuto #side-nav .tick{color:var(--good);font-weight:700;padding-left:6px}.app-tuto #side-nav button.cur .tick{color:inherit}"
       ".app-tuto #side-nav .navhead p{font-size:.8rem;color:var(--muted);margin:0;line-height:1.5}@media (min-width:901px){.app-tuto .courselay:not(.free){grid-template-columns:280px minmax(0,1fr)}}"
       ".app-tuto .lrmp-sources a,.app-tuto footer a{color:var(--accent)}")


def bloc(lang):
    u = UI[lang]
    data = []
    for c in CH:
        d = {"t": c[lang], "faq": c["faq_" + lang]}
        if ("att_" + lang) in c:
            d["att"] = c["att_" + lang]
        data.append(d)
    ep = EPINEUX[lang]
    js = ("/*precisions*/\n"
          "const NAVHEAD=(()=>{const n=document.querySelector('.app-tuto header.top .navhead');if(!n)return '';const h=n.outerHTML;n.remove();return h})();\n"
          "const PRECIS_UI=" + json.dumps({k: u[k] for k in ("att", "prec")}, ensure_ascii=False) + ";\n"
          "(" + json.dumps(data, ensure_ascii=False) + ").forEach(p=>{const x=TP(p.t);if(x){x.att=p.att;x.faq=p.faq}});\n"
          "TOPICS.push(" + json.dumps({"t": ep["t"], "h": ep["h"], "rules": ep["rules"], "quiz": ep["quiz"], "opt": True}, ensure_ascii=False) + ");\n"
          "function precis(T){const U=PRECIS_UI;return (T.att?`<p class=\"lrmp-att\"><b>${U.att} ·</b> ${T.att}</p>`:'')"
          "+(T.faq&&T.faq.length?`<details class=\"lrmp-prec\"><summary>${U.prec} (${T.faq.length})</summary><ul>${T.faq.map(f=>`<li>${f}</li>`).join('')}</ul></details>`:'')}\n"
          "(function(){try{const s=document.createElement('style');s.id='precis-css';s.textContent=" + json.dumps(CSS) + ";document.head.appendChild(s)}catch(e){}})();\n"
          "/*/precisions*/\n")
    return js


def apply(lang):
    p = os.path.join(ROOT, "mage-knight", "index.html" if lang == "fr" else lang + ".html")
    s = open(p, encoding="utf-8").read()
    s = re.sub(r"/\*precisions\*/.*?/\*/precisions\*/\n", "", s, flags=re.S)
    tp = "const TP=n=>TOPICS.concat(NEWT).find(x=>x.t===n);\n"
    assert s.count(tp) == 1, "définition de TP introuvable"
    s = s.replace(tp, tp + bloc(lang))
    # le chapitre facultatif, à la toute fin du parcours
    part = UI[lang]["part"]
    for pp in {u["part"] for u in UI.values()}:  # rejouable : retire la partie déjà posée, dans toutes les langues
        s = re.sub(r",\s*\['" + re.escape(pp) + r"',\['[^']*'\]\]\];", "];", s)
    m = re.search(r"(const PARTS=\[.*?)\];", s, re.S)
    s = s[:m.end(1)] + f",\n ['{part}',['{EPINEUX[lang]['t']}']]" + s[m.end(1):]
    # affichage dans le chapitre
    tpl = "${T.lab?labHtml():''}</div>"
    if "${T.lab?labHtml():''}${precis(T)}</div>" not in s:
        assert s.count(tpl) == 1, "gabarit de renderCourse introuvable"
        s = s.replace(tpl, "${T.lab?labHtml():''}${precis(T)}</div>")
    u = {k: v.format(url=URL, bill=BILL) for k, v in UI[lang].items()}
    s = re.sub(r"<!--sources-->.*?<!--/sources-->", "", s, flags=re.S)
    s = re.sub(r" ?<!--merci-->.*?<!--/merci-->", "", s, flags=re.S)
    # présentation : titre et sources en tête de la colonne des chapitres, comme Nemesis (le pitch est retiré)
    m = re.search(r'<header class="top">\s*<div(?: class="navhead")?>\s*(<h1>[^<]*</h1>).*?</div>(\s*<div class="chap" id="chap"></div>)', s, re.S)
    assert m, "présentation du tutoriel introuvable"
    s = (s[:m.start()] + f'<header class="top"><div class="navhead">{m.group(1)}<!--sources--><p class="lrmp-sources">{u["sources"]}<br>{u["avec"]}</p><!--/sources--></div>'
         + m.group(2) + s[m.end():])
    nav = "let h=`<div class=\"bar\">"
    if "let h=NAVHEAD+`<div class=\"bar\">" not in s:
        assert s.count(nav) == 1, "renderNav introuvable"
        s = s.replace(nav, "let h=NAVHEAD+`<div class=\"bar\">")
    m = re.search(r"(<footer>(?:Tutoriel non officiel|Unofficial tutorial)[^<]*)</footer>", s)
    assert m, "mention du tutoriel introuvable"
    s = s[:m.end(1)] + f' <!--merci-->{u["merci"]}<!--/merci-->' + s[m.end(1):]
    # compteur : « Cas épineux » (opt) hors du total ; s'il est réussi, le total passe à 31 et une 🔥 apparaît
    calc = ("const OPT=COURSE.findIndex(t=>t.opt),fire=OPT>=0&&chapDone(OPT),"
            "done=COURSE.filter((t,i)=>i!==OPT&&chapDone(i)).length+(fire?1:0),TOT=COURSE.length-(OPT>=0&&!fire?1:0);")
    old = "function renderNav(){const done=COURSE.filter((t,i)=>chapDone(i)).length;"
    if old in s:
        s = s.replace(old, "function renderNav(){" + calc)
    assert "function renderNav(){" + calc in s, "renderNav introuvable"
    s = s.replace("width:${Math.round(100*done/COURSE.length)}%", "width:${Math.round(100*done/TOT)}%")
    lab = {"fr": "${done} chapitre${done>1?'s':''} validé${done>1?'s':''} sur ${TOT}${fire?' 🔥':''}",
           "en": "${done} of ${TOT} chapters completed${fire?' 🔥':''}"}[lang]
    # numéro du chapitre : sur 30 ; le chapitre facultatif est annoncé comme tel
    s = re.sub(r"(chapitre|chapter) \$\{TI\+1\} (sur|of) \$\{COURSE\.length\}",
               lambda m: "${T.opt?'" + u["fac"] + "':`" + m.group(1) + " ${TI+1} " + m.group(2) + " ${COURSE.length-1}`}", s)
    s, n = re.subn(r'class="barlabel">[^<]*<', 'class="barlabel">' + lab + '<', s, count=1)
    assert n == 1, "libellé de progression introuvable"
    open(p, "w", encoding="utf-8").write(s)
    print("précisions :", os.path.relpath(p, ROOT))


if __name__ == "__main__":
    for lang in ("fr", "en"):
        apply(lang)
