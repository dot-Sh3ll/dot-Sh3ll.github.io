#!/usr/bin/env python3
"""Module de quêtes Mage Knight : PDF A5 français et anglais à partir des pages de l'artefact Design « Aide de jeu Mage Knight ».

Sources : fr/*.html = les 8 pages A5QuetesXXX.dc.html de l'artefact, copiées telles quelles (1-regles … 8-III-nuit).
Pour mettre à jour : recopier les pages modifiées de l'artefact dans fr/, puis lancer depuis la racine du dépôt
    python3 outils/mage-knight-fiches/quetes/quetes.py
→ fiches/mage-knight-module-quetes.pdf et fiches/mage-knight-quest-module.pdf (pied de page du gabarit dans chaque page).

CORRECTIFS_FR : retouches appliquées au français avant l'impression (coquilles, pas de mention de BGG).
EN : table de traduction (texte français → anglais), page par page. Une phrase française introuvable est signalée :
     la page a changé dans l'artefact, il faut mettre la paire à jour.
Polices : commun/polices (celles du site). Gabarit : outils/fiches-gabarit (bleu Mage Knight #52789d, titres Marcellus, texte Source Sans 3).
"""
import os, re, sys, subprocess, asyncio, tempfile

H = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(H, "..", "..", ".."))
NM = os.path.join(H, "..", "node_modules", "@fontsource")
PAGES = ["1-regles", "2-bareme", "3-I-jour", "4-I-nuit", "5-II-jour", "6-II-nuit", "7-III-jour", "8-III-nuit"]

CORRECTIFS_FR = {
 "1-regles": [
  ('<div class="kick">Module maison<br>Par DotShell sur BGG</div>', '<div class="kick">Module maison<br>par DotShell</div>'),
  ("pour signifier que vous déjà consultez les quêtes du lieu", "pour signifier que vous avez déjà consulté les quêtes du lieu"),
  ("posez le Bouclier d'un Héros d'un Héros qui n'est pas joué", "posez le Bouclier d'un Héros qui n'est pas joué"),
 ],
 "2-bareme": [("vous ne pouvez acceptez une quête d'escorte", "vous ne pouvez pas accepter de quête d'escorte")],
 "8-III-nuit": [("le lieu habitez le plus proche", "le lieu habité le plus proche")],
}

# Termes : Gloire = Fame, Réputation = Reputation, Manche = Round, Bouclier = Shield token, Offre = Offer,
# Préparer une Unité = ready a Unit, effet renforcé = powered effect, jeton vert/gris/violet/marron/rouge = green/grey/purple/brown/red token.
COULEURS = [('aria-label="Rouge"', 'aria-label="Red"'), ('aria-label="Bleu"', 'aria-label="Blue"'), ('aria-label="Vert"', 'aria-label="Green"'),
            ('aria-label="Blanc"', 'aria-label="White"'), ('aria-label="Or"', 'aria-label="Gold"'), ('aria-label="Noir"', 'aria-label="Black"')]
TETE_JOUR_NUIT = [
 ('<div class="colh"><span></span><div>A <small>· 1<sup>er</sup> lancer</small></div><div>B <small>· 2<sup>nd</sup> lancer</small></div></div>',
  '<div class="colh"><span></span><div>A <small>· 1<sup>st</sup> roll</small></div><div>B <small>· 2<sup>nd</sup> roll</small></div></div>'),
 ('<div class="moment">☀️ Jour</div>', '<div class="moment">☀️ Day</div>'),
 ('<div class="moment">🌙 Nuit</div>', '<div class="moment">🌙 Night</div>'),
 ("Variante Ombres de Tezla :", "Shades of Tezla variant:"),
 ("Variante Légion Oubliée :", "Lost Legion variant:"),
 ("Variante Légion + Tezla :", "Lost Legion + Tezla variant:"),
] + COULEURS
P1 = '<h1>Quêtes · Palier I</h1><div class="sub">Novice · Villages · ouvert à tous</div>'
P2 = '<h1>Quêtes · Palier II</h1><div class="sub">Confirmé · Monastères<br>Réputation +1 · niveau 3 conseillé</div>'
P3 = '<h1>Quêtes · Palier III</h1><div class="sub">Héroïque · Cités conquises<br>Réputation +2 · niveau 5 conseillé</div>'

EN = {
 "1-regles": [
  ("<title>Mage Knight, Quêtes : règles</title>", "<title>Mage Knight, Quests: rules</title>"),
  ("<h1>Quêtes</h1>", "<h1>Quests</h1>"),
  ('<div class="kick">Module maison<br>par DotShell</div>', '<div class="kick">Homemade module<br>by DotShell</div>'),
  ('<div class="band">Consulter et accepter une quête</div>', '<div class="band">Checking and accepting a quest</div>'),
  ("Pendant votre tour, sur un <b>Village</b>, un <b>Monastère</b> ou une <b>Cité conquise, </b>vous pouvez consulter le tableau des quêtes.",
   "During your turn, on a <b>Village</b>, a <b>Monastery</b> or a <b>conquered City</b>, you may check the quest board."),
  ("<b>Une seule quête active</b> par joueur. Un site ne propose des quêtes <b>qu'une fois par partie</b>.",
   "<b>One active quest</b> per player. A site offers quests <b>only once per game</b>."),
  ("Lancez <b>un dé de mana</b> (pas celui de la Source) : <b>quête A</b> de sa couleur.", "Roll <b>a mana die</b> (not one from the Source): <b>quest A</b> of its colour."),
  ("Relancez-le : <b>quête B</b> de sa couleur.", "Roll it again: <b>quest B</b> of its colour."),
  ("Lisez la page <b>Jour</b> ou <b>Nuit</b>, selon la Manche.", "Read the <b>Day</b> or <b>Night</b> page, depending on the Round."),
  ("<b>Choisissez-en une</b>, ou refusez les deux.", "<b>Choose one</b>, or turn both down."),
  ("<b>Posez un bouclier</b> pour signifier que vous avez déjà consulté les quêtes du lieu.", "<b>Place a Shield token</b> to show that you have already checked this site's quests."),
  ("<b>Quête déjà faite ou impossible</b> (site absent…) : prenez la suivante de la même liste, dans l'ordre 🔴 🔵 🟢 ⚪ 🟡 ⚫, puis à nouveau 🔴.",
   "<b>Quest already done or impossible</b> (site missing…): take the next one in the same column, in the order 🔴 🔵 🟢 ⚪ 🟡 ⚫, then 🔴 again."),
  ('<div class="band">Pour augmenter la difficulté</div>', '<div class="band">For a harder game</div>'),
  ("<b>Mode Mercenaire :</b> un seul lancer, quête A seulement.", "<b>Mercenary mode:</b> a single roll, quest A only."),
  ("<b>Mode Héroïque :</b> un seul lancer, quête B seulement.", "<b>Heroic mode:</b> a single roll, quest B only."),
  ('<div class="band">Le palier</div>', '<div class="band">Tiers</div>'),
  ("<tr><th>Site</th><th>Palier</th><th>Accès (bonus de Réputation)</th><th>Niveau conseillé</th></tr>", "<tr><th>Site</th><th>Tier</th><th>Access (Reputation bonus)</th><th>Suggested level</th></tr>"),
  ("<tr><td>Village</td><td>I · Novice</td><td>toujours</td><td>1+</td></tr>", "<tr><td>Village</td><td>I · Novice</td><td>always</td><td>1+</td></tr>"),
  ("<tr><td>Monastère</td><td>II · Confirmé</td><td>au moins +1 Influence</td><td>3+</td></tr>", "<tr><td>Monastery</td><td>II · Seasoned</td><td>at least +1 Influence</td><td>3+</td></tr>"),
  ("<tr><td>Cité conquise</td><td>III · Héroïque</td><td>au moins +2 Influence</td><td>5+</td></tr>", "<tr><td>Conquered City</td><td>III · Heroic</td><td>at least +2 Influence</td><td>5+</td></tr>"),
  ("😈 <b>Confrérie de l'ombre</b> : si votre Réputation vous donne un malus d'influence, les Monastères vous sont fermés. Dans une Cité conquise, vous ne pouvez accepter qu'une quête ⚫. <b>Contacts dans l'ombre</b> : à chaque tirage, vous pouvez remplacer le résultat d'un des deux lancers par ⚫.",
   "😈 <b>Shadow brotherhood</b>: if your Reputation gives you an Influence penalty, Monasteries are closed to you. In a conquered City, you may only accept a ⚫ quest. <b>Shady contacts</b>: each time you roll, you may change the result of one of the two rolls to ⚫."),
  ('<div class="band">Délais</div>', '<div class="band">Deadlines</div>'),
  ("⚡ <b>Immédiat</b> : maintenant, sinon c'est un échec.", "⚡ <b>Immediate</b>: right now, or it fails."),
  ("⚔️ <b>Combat</b> : avant la fin de la Manche, avec votre action du tour (ni interaction ni assaut ce tour-là).", "⚔️ <b>Combat</b>: before the end of the Round, as your action for the turn (no interaction or assault that turn)."),
  ("⏳ <b>Fin de Manche</b> : avant la fin de la Manche.", "⏳ <b>End of Round</b>: before the end of the Round."),
  ('<b style="color:#1d6b35">Réussite</b><p>Posez un de vos Boucliers sur le site : <b>+1 Influence</b> à chaque interaction ici.&nbsp;</p>',
   '<b style="color:#1d6b35">Success</b><p>Place one of your Shield tokens on the site: <b>+1 Influence</b> for every interaction here.</p>'),
  ('<b style="color:#8a1f1f">Échec ou refus</b><p>Échec (délai dépassé, ennemi non vaincu) : <b>−1 Réputation</b>. Refus : sans pénalité. Dans les deux cas, posez le Bouclier d\'un Héros qui n\'est pas joué&nbsp;: site épuisé.</p>',
   '<b style="color:#8a1f1f">Failure or refusal</b><p>Failure (deadline missed, enemy not defeated): <b>−1 Reputation</b>. Refusal: no penalty. Either way, place a Shield token of a Hero nobody plays: the site is exhausted.</p>'),
  ('<b>Titre « Plus grand Chevalier errant »</b> : le joueur qui a réussi le plus de quêtes gagne <span class="gain">+3 Gloire</span> (égalité : +1 chacun).',
   '<b>“Greatest Knight-errant” title</b>: the player who completed the most quests gains <span class="gain">+3 Fame</span> (tie: +1 each).'),
 ],
 "2-bareme": [
  ("<h1>Quêtes · Barème</h1>", "<h1>Quests · Rewards</h1>"),
  ('<div class="kick">Récompenses<br>et précisions</div>', '<div class="kick">Rewards<br>and clarifications</div>'),
  ('<div class="band">Barème des récompenses</div>', '<div class="band">Reward table</div>'),
  ('<tr><th style="width:52px">Palier</th><th>Récompense type</th><th style="width:96px">Quête noire</th></tr>', '<tr><th style="width:52px">Tier</th><th>Typical reward</th><th style="width:96px">Black quest</th></tr>'),
  ("<tr><td>I</td><td>2 Gloire · 1 cristal · Soin 1 · préparer 1 Unité · 1 Réputation (ou 2 Gloire)</td><td>1 Action Avancée</td></tr>",
   "<tr><td>I</td><td>2 Fame · 1 crystal · Heal 1 · ready 1 Unit · 1 Reputation (or 2 Fame)</td><td>1 Advanced Action</td></tr>"),
  ("<tr><td>II</td><td>4 Gloire · 2 cristaux · Soin 2 · 2 Réputation (ou 4 Gloire)</td><td>1 Sort</td></tr>", "<tr><td>II</td><td>4 Fame · 2 crystals · Heal 2 · 2 Reputation (or 4 Fame)</td><td>1 Spell</td></tr>"),
  ("<tr><td>III</td><td>6 Gloire · 3 cristaux · 1 Unité gratuite</td><td>1 Artefact</td></tr>", "<tr><td>III</td><td>6 Fame · 3 crystals · 1 free Unit</td><td>1 Artifact</td></tr>"),
  ("<p>Actions Avancées, Sorts et Artefacts ne viennent <b>que des quêtes noires</b>, plus risquées.</p>", "<p>Advanced Actions, Spells and Artifacts come <b>only from black quests</b>, which are riskier.</p>"),
  ('<div class="band">Précisions</div>', '<div class="band">Clarifications</div>'),
  ("<b>Ennemis de quête</b> : Gloire normale, sans Réputation sauf indication. Non vaincus, ils sont défaussés et la quête échoue.",
   "<b>Quest enemies</b>: normal Fame, no Reputation unless stated. If not defeated, they are discarded and the quest fails."),
  ("<b>Valeurs hors combat</b> (Parade, Attaque, Déplacement, Influence, Soin) : produites avec vos cartes et vos Unités comme d'habitude. Elles ne servent à rien d'autre ce tour-là.",
   "<b>Values outside combat</b> (Block, Attack, Move, Influence, Heal): generated with your cards and Units as usual. They cannot be used for anything else that turn."),
  ("<b>Réputation en récompense</b> : vous pouvez toujours prendre la Gloire indiquée à la place.", "<b>Reputation rewards</b>: you may always take the Fame shown instead."),
  ("<b>😇 Héros ou 😈 Crapule</b> : certaines quêtes laissent le choix. La crapule gagne plus mais perd de la Réputation, qui ouvre l'accès aux Monastères et aux Cités.",
   "<b>😇 Hero or 😈 Rogue</b>: some quests let you choose. The rogue gains more but loses Reputation, which opens access to Monasteries and Cities."),
  ("<b>Sort, Action Avancée, Unité</b> : pris dans l'Offre, sans payer. Une Unité gratuite reste dans votre limite de Commandement.",
   "<b>Spell, Advanced Action, Unit</b>: taken from the Offer, for free. A free Unit still counts against your Command limit."),
  ("<b>Artefact</b> : piochez-en 2, gardez-en 1, comme une récompense de site.", "<b>Artifact</b>: draw 2, keep 1, as for a site reward."),
  ("<b>« En plus de la récompense du site »</b> : la conquête rapporte normalement, la quête s'y ajoute.", "<b>“On top of the site reward”</b>: the conquest pays out as usual, and the quest reward is added."),
  ('<div class="band">Lire une quête</div>', '<div class="band">Reading a quest</div>'),
  ("<b>Sur place</b> : sur le site de la quête", "<b>On site</b>: at the quest's site"),
  ("<b>Ailleurs</b> : demande de se déplacer", "<b>Elsewhere</b>: you have to travel"),
  ("<b>Variante (extension) :</b> si vous jouez avec l'extension indiquée, la variante remplace la quête, ou l'élargit quand elle dit « compte aussi ». Sans l'extension, ignorez-la.",
   "<b>Variant (expansion):</b> if you play with the expansion named, the variant replaces the quest, or widens it when it says “also counts”. Without that expansion, ignore it."),
  ('<div class="band">Contraintes de trajet</div>', '<div class="band">Travel constraints</div>'),
  ("🚶‍♀️ <b>Escorte</b> : posez un jeton de mana sur un jeton de Commandement libre. Sinon, une Unité prête devient l'escorte : épuisez-la, elle ne peut pas être préparée avant l'arrivée. Si vous n'avez ni place libre ni Unité prête, vous ne pouvez pas accepter de quête d'escorte.",
   "🚶‍♀️ <b>Escort</b>: put a mana token on a free Command token. Otherwise a Ready Unit becomes the escort: it is spent and cannot be readied before you arrive. With no free slot and no Ready Unit, you cannot accept an escort quest."),
  ("💎 <b>Objet fragile</b> : posez un cristal de la réserve sur votre Héros. Si une Blessure arrive dans votre main avant l'arrivée, le cristal est perdu : échec. À l'arrivée, rendez-le.",
   "💎 <b>Fragile item</b>: put a crystal from the supply on your Hero. If a Wound reaches your hand before you arrive, the crystal is lost: the quest fails. On arrival, return it."),
  ("🏃‍♀️ <b>Course</b> : posez le jeton indiqué face cachée sur la quête, et 1 cristal à côté à la fin de chacun de vos tours. Au 3<sup>e</sup>, il attaque le site habité le plus proche (pas celui-ci). Vous y êtes : combat, avec vos Unités, site non fortifié. Sinon la quête échoue et le site est épuisé.",
   "🏃‍♀️ <b>Race</b>: put the token shown face down on the quest, and 1 crystal next to it at the end of each of your turns. On the 3<sup>rd</sup>, it attacks the nearest inhabited site (not this one). If you are there: combat, with your Units, the site is not fortified. Otherwise the quest fails and the site is exhausted."),
  ("🎖️ <b>Exploit</b> : la condition s'ajoute aux règles normales du site.", "🎖️ <b>Feat</b>: the condition is added to the site's normal rules."),
 ],
 "3-I-jour": [
  (P1, '<h1>Quests · Tier I</h1><div class="sub">Novice · Villages · open to all</div>'),
  ("Une partie de cartes qui tourne mal", "A card game gone wrong"), ("⚡ Produisez Parade 3.", "⚡ Generate Block 3."),
  ("→ 2 Gloire", "→ 2 Fame"),
  ("Un contrat cloué au panneau", "A contract nailed to the board"),
  ("⚔️ Sur une case de forêt à au moins 2 cases d'ici, piochez un jeton vert et combattez-le.", "⚔️ On a forest space at least 2 spaces away, draw a green token and fight it."),
  ("→ 1 cristal rouge", "→ 1 red crystal"),
  ("L'apprenti forgeron de Glinin", "Glinin's apprentice smith"),
  ("⏳ En un même tour ici, jouez 2 cartes avec leur effet renforcé.", "⏳ In a single turn here, play 2 cards with their powered effect."),
  ("→ Piochez 1 carte", "→ Draw 1 card"),
  ("Porter une lettre au mage", "Deliver a letter to the mage"), ("💎 Jusqu'à une case adjacente à une Tour de Mage.", "💎 To a space adjacent to a Mage Tower."),
  ("→ 1 cristal bleu", "→ 1 blue crystal"),
  ("Escorter les moissonneurs", "Escort the harvesters"), ("🚶‍♀️Escortez jusqu'à une case de plaines à au moins 3 cases d'ici.", "🚶‍♀️ Escort them to a plains space at least 3 spaces away."),
  ("→ Préparez 1 Unité, ou 1 cristal vert", "→ Ready 1 Unit, or 1 green crystal"),
  ("Cueillir des herbes médicinales", "Gather healing herbs"), ("⏳ Pendant un tour ici, produisez Déplacement 3 sans vous déplacer.", "⏳ During a turn here, generate Move 3 without moving."),
  ("→ Soin 1", "→ Heal 1"),
  ("Remotiver les paysans", "Rally the peasants"), ("⏳ Pendant un tour ici, produisez Influence 5.", "⏳ During a turn here, generate Influence 5."),
  ("→ 1 Réputation ou 2 Gloire", "→ 1 Reputation or 2 Fame"),
  ("Porter un courrier important", "Deliver an important letter"),
  ("⏳ Finissez un tour sur un autre Village ou un Monastère, à au moins 2 cases d'ici.", "⏳ End a turn on another Village or a Monastery, at least 2 spaces away."),
  ("😇 1 Réputation ou 2 Gloire", "😇 1 Reputation or 2 Fame"), ("😈 Vendez son contenu : 2 cristaux, −1 Réputation", "😈 Sell its contents: 2 crystals, −1 Reputation"),
  ("L'appel des Cristaux", "The call of the Crystals"), ("⚡ Rendez 1 cristal.", "⚡ Return 1 crystal."),
  ("→ Lancez 2 dés : 1 cristal par couleur de base, or = au choix, noir = 1 Gloire", "→ Roll 2 dice: 1 crystal per basic colour, gold = any colour, black = 1 Fame"),
  ("Un anneau dans les eaux sombres", "A ring in the dark waters"),
  ("⏳ Finissez un tour sur une case adjacente à un lac, à au moins 2 cases d'ici.", "⏳ End a turn on a space adjacent to a lake, at least 2 spaces away."),
  ("😇 Rendez-le : 1 Réputation ou 2 Gloire", "😇 Give it back: 1 Reputation or 2 Fame"), ("😈 Gardez-le : 2 cristaux, −1 Réputation", "😈 Keep it: 2 crystals, −1 Reputation"),
  ("Une flèche dans le genou", "An arrow to the knee"), ("⚔️ Piochez un jeton vert et combattez-le ici, sans vos Unités.", "⚔️ Draw a green token and fight it here, without your Units."),
  ("→ 1 Action Avancée de l'Offre", "→ 1 Advanced Action from the Offer"),
  ("Interroger le prisonnier", "Question the prisoner"),
  ("⚡ Faites-le parler (−2 Réputation) ou payez sa rançon (rendez 2 cristaux).", "⚡ Make him talk (−2 Reputation) or pay his ransom (return 2 crystals)."),
 ],
 "4-I-nuit": [
  (P1, '<h1>Quests · Tier I</h1><div class="sub">Novice · Villages · open to all</div>'),
  ("Les hommes-rats sortent des égouts", "Ratmen out of the sewers"), ("⚔️ Piochez un jeton vert et combattez-le ici.", "⚔️ Draw a green token and fight it here."),
  ("😇 1 Réputation ou 2 Gloire", "😇 1 Reputation or 2 Fame"), ("😈 Dépouillez-les : 1 cristal + 2 Gloire, −1 Réputation", "😈 Loot them: 1 crystal + 2 Fame, −1 Reputation"),
  ("Une marée verte et hurlante", "A howling green tide"),
  ("🏃‍♀️ Atteignez le lieu habité le plus proche en moins de 3 tours. Un jeton vert.", "🏃‍♀️ Reach the nearest inhabited site within 3 turns. A green token."),
  ("→ 1 Réputation ou 2 Gloire", "→ 1 Reputation or 2 Fame"),
  ("Suivre les feux follets", "Follow the will-o'-wisps"), ("⏳ Finissez un tour sur une Clairière magique.", "⏳ End a turn on a Magical Glade."),
  ("→ 1 cristal de base au choix", "→ 1 basic crystal of your choice"),
  ("la Vallée Oubliée compte aussi.", "the Forgotten Valley also counts."),
  ("Allumer le feu de camp", "Light the campfire"), ("⏳ Pendant un tour ici, payez 2 manas bleus.", "⏳ During a turn here, pay 2 blue mana."), ("→ 2 Gloire", "→ 2 Fame"),
  ("Ne quittez jamais le sentier", "Never leave the path"), ("⏳ Finissez un tour sur une case de forêt à au moins 3 cases d'ici.", "⏳ End a turn on a forest space at least 3 spaces away."),
  ("Ne frappez pas les cocottes", "Don't hit the chickens"),
  ("⏳ Pendant un tour ici, produisez Soin 2, même sans Blessure.", "⏳ During a turn here, generate Heal 2, even without a Wound."),
  ("→ Préparez 1 Unité, ou 1 cristal vert", "→ Ready 1 Unit, or 1 green crystal"),
  ("Écouter les anciens à la veillée", "Listen to the elders by the fire"), ("⚡ Défaussez 2 cartes, sauf des Blessures.", "⚡ Discard 2 cards, other than Wounds."),
  ("→ 1 cristal blanc", "→ 1 white crystal"),
  ("Chanter à la taverne", "Sing at the tavern"), ("⏳ Pendant un tour ici, produisez Influence 5.", "⏳ During a turn here, generate Influence 5."),
  ("Rattraper la pie voleuse", "Catch the thieving magpie"), ("⏳ Finissez un tour sur une Mine de cristal.", "⏳ End a turn on a Crystal Mine."),
  ("😇 Rendez le butin : 1 Réputation ou 2 Gloire", "😇 Return the loot: 1 Reputation or 2 Fame"),
  ("😈 Gardez-le : 2 cristaux de la couleur de la Mine, −1 Réputation", "😈 Keep it: 2 crystals of the Mine's colour, −1 Reputation"),
  ("la Mine sans fond compte aussi (couleur au choix parmi les siennes).", "the Deep Mine also counts (any one of its colours)."),
  ("Un tas d'or au bord du chemin", "A pile of gold by the road"), ("⏳ Finissez un tour sur une case de désert.", "⏳ End a turn on a desert space."),
  ("→ 1 cristal au choix", "→ 1 crystal of your choice"),
  ("Un joyau noir au front", "A black jewel on the brow"), ("⚡ Prenez 2 Blessures dans votre main.", "⚡ Take 2 Wounds into your hand."),
  ("→ 1 Action Avancée de l'Offre", "→ 1 Advanced Action from the Offer"),
  ("Les Dames du Marais", "The Ladies of the Marsh"), ("⚔️ Sur une case de marais, piochez un jeton vert et combattez-le.", "⚔️ On a swamp space, draw a green token and fight it."),
  ("un Cimetière ou la Nécropole compte aussi.", "a Graveyard or the Necropolis also counts."),
 ],
 "5-II-jour": [
  (P2, '<h1>Quests · Tier II</h1><div class="sub">Seasoned · Monasteries<br>Reputation +1 · level 3 suggested</div>'),
  ("Leeroy, aux vergers !", "Leeroy, to the orchards!"), ("⚔️ Piochez 2 jetons verts et combattez-les ensemble ici.", "⚔️ Draw 2 green tokens and fight them together here."),
  ("→ 4 Gloire", "→ 4 Fame"),
  ("lancez le dé de Faction ; les 2 jetons verts viennent de cette Faction.", "roll the Faction die; both green tokens come from that Faction."),
  ("Purger le Donjon", "Purge the Dungeon"),
  ("🎖️ Vainquez l'ennemi d'un Donjon sans qu'aucune Blessure n'arrive dans votre main.", "🎖️ Defeat a Dungeon's enemy without any Wound reaching your hand."),
  ("→ 2 cristaux au choix, en plus de la récompense du site", "→ 2 crystals of your choice, on top of the site reward"),
  ("un Dédale compte aussi.", "a Maze also counts."),
  ("Enluminer le grimoire", "Illuminate the grimoire"),
  ("⏳ Pendant un même tour ici, dépensez 3 manas de couleurs différentes.", "⏳ In a single turn here, spend 3 mana of different colours."),
  ("Rapporter l'herbier de la Tour", "Fetch the Tower's herbarium"),
  ("⏳ Finissez un tour sur une case adjacente à une Tour de Mage, à au moins 3 cases d'ici.", "⏳ End a turn on a space adjacent to a Mage Tower, at least 3 spaces away."),
  ("→ Soin 2", "→ Heal 2"),
  ("Potions et queues de phénix", "Potions and phoenix downs"), ("💎 Jusqu'à un Village.", "💎 To a Village."),
  ("Bêcher le jardin des moines", "Dig the monks' garden"),
  ("⏳ Pendant un tour ici, produisez Déplacement 5 sans vous déplacer.", "⏳ During a turn here, generate Move 5 without moving."),
  ("Négocier la paix avec l'émissaire", "Negotiate peace with the envoy"), ("⚡ Produisez Influence 8.", "⚡ Generate Influence 8."),
  ("→ 2 Réputation ou 4 Gloire", "→ 2 Reputation or 4 Fame"),
  ("Réconcilier deux villages", "Reconcile two villages"),
  ("⏳ Finissez un tour sur deux autres sites habités, différents l'un de l'autre.", "⏳ End a turn on two other inhabited sites, different from each other."),
  ("😇 2 Réputation ou 4 Gloire", "😇 2 Reputation or 4 Fame"),
  ("😈 Vendez vos services aux deux camps : 1 cristal + 4 Gloire, −2 Réputation", "😈 Sell your services to both sides: 1 crystal + 4 Fame, −2 Reputation"),
  ("Restaurer le reliquaire", "Restore the reliquary"), ("⚡ Rendez 2 cristaux de couleurs différentes.", "⚡ Return 2 crystals of different colours."),
  ("Escorter le convoi de cristal", "Escort the crystal convoy"), ("🚶‍♀️ Escortez jusqu'à une Mine de cristal.", "🚶‍♀️ Escort it to a Crystal Mine."),
  ("😇 2 cristaux au choix", "😇 2 crystals of your choice"),
  ("😈 Détournez-en une part : 3 cristaux au choix, −2 Réputation", "😈 Skim off a share: 3 crystals of your choice, −2 Reputation"),
  ("De la viande fraîche dans la crypte", "Fresh meat in the crypt"),
  ("⚔️ Piochez un jeton marron et combattez-le ici, avec les règles de Nuit.", "⚔️ Draw a brown token and fight it here, using Night rules."),
  ("→ 1 Sort de l'Offre", "→ 1 Spell from the Offer"),
  ("Le contrat de Raphaël", "Raphael's contract"),
  ("⚡ Signez (3 Blessures, réparties entre votre main et vos Unités, 1 au plus par Unité) ou chassez l'émissaire (combattez ici un jeton violet, avec votre action).",
   "⚡ Sign (3 Wounds, split between your hand and your Units, at most 1 per Unit) or drive the envoy away (fight a purple token here, as your action)."),
 ],
 "6-II-nuit": [
  (P2, '<h1>Quests · Tier II</h1><div class="sub">Seasoned · Monasteries<br>Reputation +1 · level 3 suggested</div>'),
  ("Devancer les pillards", "Outrun the raiders"),
  ("🏃‍♀️ Atteignez le lieu habité le plus proche en moins de 3 tours. Un jeton gris.", "🏃‍♀️ Reach the nearest inhabited site within 3 turns. A grey token."),
  ("→ 2 cristaux au choix, en plus de la récompense du site", "→ 2 crystals of your choice, on top of the site reward"),
  ("→ 2 cristaux au choix", "→ 2 crystals of your choice"),
  ("Nettoyer l'Antre", "Clear the Monster Den"), ("🎖️ Conquérez un Antre sans vos Unités.", "🎖️ Conquer a Monster Den without your Units."),
  ("Se reposer au site de grâce", "Rest at the site of grace"), ("⏳ Reposez-vous ici, sans défausser de Blessure.", "⏳ Rest here, without discarding a Wound."),
  ("→ Soin 2", "→ Heal 2"),
  ("Un pas sur le côté", "A step to the side"),
  ("⏳ Finissez un tour sur une Clairière magique à au moins 3 cases d'ici.", "⏳ End a turn on a Magical Glade at least 3 spaces away."),
  ("→ Piochez 2 cartes", "→ Draw 2 cards"),
  ("la Vallée Oubliée compte aussi comme destination.", "the Forgotten Valley also counts as a destination."),
  ("la Vallée Oubliée compte aussi.", "the Forgotten Valley also counts."),
  ("Ramener l'ermite", "Bring back the hermit"),
  ("⏳ Finissez un tour sur des collines ou une case adjacente à une montagne, à 2 cases d'ici ou plus, puis un tour ici.",
   "⏳ End a turn on hills or on a space adjacent to a mountain, 2 or more spaces away, then a turn here."),
  ("→ 4 Gloire", "→ 4 Fame"),
  ("Veiller les malades", "Tend the sick"),
  ("⏳ Pendant une interaction ici, achetez au moins 3 Soins, même sans Blessure à soigner.", "⏳ During an interaction here, buy at least 3 Healing, even with no Wound to heal."),
  ("😇 4 Gloire", "😇 4 Fame"), ("😈 Faites payer les soins : 2 cristaux + 2 Gloire, −2 Réputation", "😈 Charge for the care: 2 crystals + 2 Fame, −2 Reputation"),
  ("Recueillir les confidences", "Hear confessions"), ("⚡ Défaussez 3 cartes, sauf des Blessures.", "⚡ Discard 3 cards, other than Wounds."),
  ("→ 2 Réputation ou 4 Gloire", "→ 2 Reputation or 4 Fame"),
  ("à la place, finissez un tour sur le Camp de réfugiés ; recrutez-y une Unité sans surcoût.", "instead, end a turn on the Refugee Camp; recruit a Unit there at no extra cost."),
  ("Dangereux d'y aller seul", "It's dangerous to go alone"),
  ("🚶‍♀️ Escortez jusqu'à un Village à au moins 3 cases d'ici.", "🚶‍♀️ Escort them to a Village at least 3 spaces away."),
  ("le Camp de réfugiés compte aussi.", "the Refugee Camp also counts."),
  ("Ce coffre est une Mimique", "That chest is a Mimic"), ("⏳ Pendant un tour ici, payez 2 manas de la même couleur.", "⏳ During a turn here, pay 2 mana of the same colour."),
  ("Retrouver le trésor englouti", "Recover the sunken treasure"),
  ("⏳ Finissez un tour sur une case de marais à au moins 3 cases d'ici.", "⏳ End a turn on a swamp space at least 3 spaces away."),
  ("😇 Rendez-le aux moines : 2 Réputation ou 4 Gloire", "😇 Return it to the monks: 2 Reputation or 4 Fame"),
  ("😈 Gardez-le : 3 cristaux au choix, −2 Réputation", "😈 Keep it: 3 crystals of your choice, −2 Reputation"),
  ("Le murmure du têtard", "The tadpole's whisper"), ("⚡ Prenez 3 Blessures dans votre main.", "⚡ Take 3 Wounds into your hand."),
  ("→ 1 Sort de l'Offre", "→ 1 Spell from the Offer"),
  ("Un envahisseur dans votre monde", "An invader in your world"), ("⚔️ Piochez un jeton violet et combattez-le ici.", "⚔️ Draw a purple token and fight it here."),
 ],
 "7-III-jour": [
  (P3, '<h1>Quests · Tier III</h1><div class="sub">Heroic · Conquered Cities<br>Reputation +2 · level 5 suggested</div>'),
  ("Mater la garnison", "Quell the garrison"), ("⚔️ Piochez 1 jeton gris et 1 violet, combattez-les ensemble ici.", "⚔️ Draw 1 grey and 1 purple token, fight them together here."),
  ("→ 6 Gloire, en plus de la récompense du site", "→ 6 Fame, on top of the site reward"),
  ("→ 6 Gloire", "→ 6 Fame"),
  ("Assiéger la tour rebelle", "Besiege the rebel tower"), ("🎖️ Conquérez une Tour de Mage sans vos Unités.", "🎖️ Conquer a Mage Tower without your Units."),
  ("un Labyrinthe compte aussi.", "a Labyrinth also counts."),
  ("Déchiffrer les deux grimoires", "Decipher the two grimoires"), ("⏳ Pendant un même tour ici, jouez 2 Sorts (effet de base).", "⏳ In a single turn here, play 2 Spells (basic effect)."),
  ("→ 3 cristaux au choix", "→ 3 crystals of your choice"),
  ("Escorter l'archimage", "Escort the archmage"), ("🚶‍♀️ Escortez jusqu'à un Monastère.", "🚶‍♀️ Escort them to a Monastery."),
  ("Visiter l'obélisque", "Visit the obelisk"), ("⏳ Révélez 2 nouvelles tuiles.", "⏳ Reveal 2 new tiles."),
  ("Une monture épique", "An epic mount"), ("⏳ Pendant un tour ici, produisez Déplacement 12 sans vous déplacer.", "⏳ During a turn here, generate Move 12 without moving."),
  ("→ 1 Unité gratuite", "→ 1 free Unit"),
  ("Gagner la faveur du conseil", "Win the council's favour"), ("⏳ Pendant un tour ici, produisez Influence 12.", "⏳ During a turn here, generate Influence 12."),
  ("😇 1 Unité gratuite", "😇 1 free Unit"), ("😈 Achetez le conseil : 1 Unité gratuite + 2 cristaux, −2 Réputation", "😈 Bribe the council: 1 free Unit + 2 crystals, −2 Reputation"),
  ("Rallier les vassaux", "Rally the vassals"),
  ("⏳ À la fin de la Manche, ayez des Boucliers sur 2 sites de plus qu'au moment où vous avez accepté la quête.", "⏳ At the end of the Round, have Shield tokens on 2 more sites than when you accepted the quest."),
  ("Financer la guilde", "Fund the guild"), ("⚡ Rendez 3 cristaux.", "⚡ Return 3 crystals."),
  ("Lever l'impôt", "Collect the taxes"), ("⏳ Finissez un tour sur deux Villages différents.", "⏳ End a turn on two different Villages."),
  ("😇 Rendez l'or au peuple : 2 Réputation + 4 Gloire", "😇 Give the gold back to the people: 2 Reputation + 4 Fame"),
  ("😈 Gardez l'or : 3 cristaux + 3 Gloire, −2 Réputation", "😈 Keep the gold: 3 crystals + 3 Fame, −2 Reputation"),
  ("La Danse des dragons", "The Dance of the Dragons"), ("⚔️ Piochez un jeton rouge et combattez-le ici, sans vos Unités.", "⚔️ Draw a red token and fight it here, without your Units."),
  ("→ 1 Artefact", "→ 1 Artifact"),
  ("affrontez plutôt un Chef de Faction de niveau 2 (dé de Faction), sans ses compagnons.", "fight a level 2 Faction Leader instead (Faction die), without its companions."),
  ("Sous le masque de la Bête", "Beneath the Beast's mask"),
  ("⚡ Payez (prenez 4 Blessures dans votre main) ou démasquez le démon (combattez ici un jeton violet, sans vos Unités, avec votre action).",
   "⚡ Pay (take 4 Wounds into your hand) or unmask the demon (fight a purple token here, without your Units, as your action)."),
 ],
 "8-III-nuit": [
  (P3, '<h1>Quests · Tier III</h1><div class="sub">Heroic · Conquered Cities<br>Reputation +2 · level 5 suggested</div>'),
  ("Traquer l'assassin", "Hunt down the assassin"), ("⚔️ Piochez un jeton violet et combattez-le ici, sans vos Unités.", "⚔️ Draw a purple token and fight it here, without your Units."),
  ("→ 6 Gloire, en plus de la récompense du site", "→ 6 Fame, on top of the site reward"),
  ("→ 6 Gloire", "→ 6 Fame"),
  ("vos Unités peuvent participer, mais le jeton a en plus Assassin.", "your Units may take part, but the token also has Assassination."),
  ("Prendre la forteresse de nuit", "Take the fortress by night"), ("⏳ Conquérez une Forteresse.", "⏳ Conquer a Keep."),
  ("Briser le sceau", "Break the seal"), ("⏳ En un même tour ici, jouez 2 Sorts avec leur effet renforcé.", "⏳ In a single turn here, play 2 Spells with their powered effect."),
  ("Refermer la Brèche", "Close the Rift"),
  ("⏳ Finissez un tour sur une Clairière magique et payez-y 1 mana noir et rendez 1 cristal.", "⏳ End a turn on a Magical Glade, pay 1 black mana there and return 1 crystal."),
  ("→ Soin 3", "→ Heal 3"),
  ("Au bord du ciel, les dragons reviennent", "At the edge of the sky, the dragons return"),
  ("🏃‍♀️ Atteignez le lieu habité le plus proche en moins de 3 tours. Un jeton rouge.", "🏃‍♀️ Reach the nearest inhabited site within 3 turns. A red token."),
  ("→ 1 Unité gratuite (les otages libérés)", "→ 1 free Unit (the freed hostages)"),
  ("→ 1 Unité gratuite", "→ 1 free Unit"),
  ("Organiser la chasse royale", "Hold the royal hunt"), ("⏳ Pendant un tour ici, produisez Attaque 12 hors combat.", "⏳ During a turn here, generate Attack 12 outside combat."),
  ("Recevoir l'ambassade", "Receive the embassy"), ("⏳ Finissez un tour sur un site portant votre Bouclier de quête.", "⏳ End a turn on a site bearing your quest Shield token."),
  ("Celui qui prononce la sentence", "The one who passes the sentence"),
  ("⚡ Jugez le traître : 😇 graciez-le (produisez Influence 8) ou 😈 condamnez-le (−2 Réputation).", "⚡ Judge the traitor: 😇 pardon him (generate Influence 8) or 😈 condemn him (−2 Reputation)."),
  ("La dette du lion", "The lion's debt"), ("⏳ Pendant un tour ici, payez 4 manas de couleurs différentes.", "⏳ During a turn here, pay 4 mana of different colours."),
  ("Écumer les Ruines", "Scour the Ruins"),
  ("🎖️ Nettoyez les Ruines (Autel activé ou gardiens vaincus) le tour même de votre arrivée.", "🎖️ Clear the Ancient Ruins (altar activated or guardians defeated) on the very turn you arrive."),
  ("😇 6 Gloire, en plus du site", "😇 6 Fame, on top of the site"), ("😈 Pillez tout : idem + 2 cristaux, −2 Réputation", "😈 Loot everything: same + 2 crystals, −2 Reputation"),
  ("Reste un peu, et écoute", "Stay awhile and listen"), ("⚔️ Piochez 1 jeton rouge et 1 marron, combattez-les ensemble ici.", "⚔️ Draw 1 red and 1 brown token, fight them together here."),
  ("→ 1 Artefact", "→ 1 Artifact"),
  ("le jeton marron vient des Sombres Croisés.", "the brown token comes from the Dark Crusaders."),
  ("Réveiller le dragon sous la Montagne", "Wake the dragon under the Mountain"), ("⚔️ Vainquez un Draconien errant, sans vos Unités.", "⚔️ Defeat a rampaging Draconum, without your Units."),
  ("à la place, piochez un jeton rouge des Sombres Croisés et combattez-le ici ; il a en plus Assassin.", "instead, draw a red Dark Crusaders token and fight it here; it also has Assassination."),
 ],
}

POL = os.path.join(ROOT, "commun", "polices")  # polices du site

def font_css():
    f = lambda n: "file://" + os.path.join(POL, n)
    return ('<style>@font-face{font-family:"Marcellus";src:url("%s") format("woff2")}'
            '@font-face{font-family:"Source Sans 3";font-weight:200 900;src:url("%s") format("woff2")}'
            '@font-face{font-family:"Source Sans 3";font-style:italic;font-weight:200 900;src:url("%s") format("woff2")}</style>') % (
        f("marcellus-latin.woff2"), f("source-sans-3-latin.woff2"), f("source-sans-3-italic-latin.woff2"))

def pied(dc, label):
    """Pied de page du gabarit commun (outils/fiches-gabarit) en bas de la page, dans la couleur de la fiche."""
    i = dc.rindex("</div>", 0, dc.index("</x-dc>"))
    return dc[:i] + ('<footer style="display:flex;justify-content:space-between;align-items:center;font-size:11px;color:#52789d;'
                     'border-top:1px solid #52789d;padding-top:4px;margin-top:auto">'
                     f'<span style="font-weight:600">Less Rules, More Play · paulmoussard.com</span><span>{label}</span></footer>\n') + dc[i:]  # <footer> : ne compte pas dans les :last-of-type des div

def to_html(dc, lang):
    """Page Design (.dc.html) -> page HTML simple : le <helmet> passe dans <head>, sans script ni polices en ligne."""
    title = re.search(r"<title>.*?</title>", dc, re.S).group(0)
    helmet = re.search(r"<helmet>(.*?)</helmet>", dc, re.S).group(1)
    helmet = re.sub(r'<link[^>]*fonts\.(googleapis|gstatic)[^>]*>\n?', '', helmet)
    body = dc[dc.index("</helmet>") + 9: dc.index("</x-dc>")]
    return f'<!doctype html><html lang="{lang}"><head><meta charset="utf-8">{title}{font_css()}{helmet}<style>@page{{size:559px 794px;margin:0}}html,body{{margin:0}}</style></head><body>{body}</body></html>'

def apply(text, pairs, page, lang, strict=True):
    ok = True
    for a, b in pairs:
        if a not in text:
            if not strict: continue
            print(f"[{lang}] {page} : texte introuvable → {a[:90]}"); ok = False; continue
        text = text.replace(a, b)
    return text, ok

async def render(pages, out):
    from playwright.async_api import async_playwright
    from pypdf import PdfWriter, PdfReader
    tmp = tempfile.mkdtemp()
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page()
        files = []
        for i, html in enumerate(pages):
            hp = os.path.join(tmp, f"{i}.html"); open(hp, "w", encoding="utf-8").write(html)
            await pg.goto("file://" + hp); await pg.evaluate("document.fonts.ready")
            pp = os.path.join(tmp, f"{i}.pdf"); await pg.pdf(path=pp, width="559px", height="794px", print_background=True); files.append(pp)
        await b.close()
    w = PdfWriter()
    for f in files:
        r = PdfReader(f); w.add_page(r.pages[0])
    w.write(out)  # le pied de page est dans chaque page (pied())
    print("écrit", os.path.relpath(out, ROOT), len(pages), "pages")

def main():
    fr_pages, en_pages, ok = [], [], True
    for p in PAGES:
        dc = open(os.path.join(H, "fr", p + ".html"), encoding="utf-8").read()
        fr, o1 = apply(dc, CORRECTIFS_FR.get(p, []), p, "fr")
        en, o2 = apply(fr, EN[p], p, "en")
        en, _ = apply(en, TETE_JOUR_NUIT, p, "en", strict=False)
        ok = ok and o1 and o2
        n = PAGES.index(p) + 1
        fr, en = pied(fr, f"Module de quêtes · {n}/{len(PAGES)}"), pied(en, f"Quest module · {n}/{len(PAGES)}")
        fr_pages.append(to_html(fr, "fr")); en_pages.append(to_html(en, "en"))
        os.makedirs(os.path.join(H, "en"), exist_ok=True)
        open(os.path.join(H, "en", p + ".html"), "w", encoding="utf-8").write(en.replace('<html lang="fr">', '<html lang="en">'))
    asyncio.run(render(fr_pages, os.path.join(ROOT, "fiches/mage-knight-module-quetes.pdf")))
    asyncio.run(render(en_pages, os.path.join(ROOT, "fiches/mage-knight-quest-module.pdf")))
    if not ok: sys.exit("Des textes sont introuvables : mettre à jour CORRECTIFS_FR ou EN.")

if __name__ == "__main__":
    main()
