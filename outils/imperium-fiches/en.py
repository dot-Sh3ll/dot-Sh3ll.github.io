#!/usr/bin/env python3
"""Fiches A5 Imperium en anglais : construit en/ à partir de fr/.

- Aide de jeu (A5Tour, A5Deck) : table PAIRES, phrase française -> anglaise, appliquée aux pages de fr/.
  Le script signale toute phrase française restée sans traduction après une modification.
- Mots-clés (A5MotsCles1, A5MotsCles2) : reconstruits depuis MOTS (ordre alphabétique anglais),
  coupés en deux pages équilibrées.
Termes : ceux de l'appli anglaise (imperium/en.html), édition « Imperium: Classics ».
Usage : python3 outils/imperium-fiches/en.py   puis   python3 outils/imperium-fiches/pdf.py
"""
import html, math, pathlib, re, sys

ICI = pathlib.Path(__file__).resolve().parent
(ICI / 'en').mkdir(exist_ok=True)

COMMUN = [
    ('<html lang="fr">', '<html lang="en">'),
    ('>Imperium Antique<', '>Imperium: Classics<'),
    ('Fiche 1 · recto', 'Sheet 1 · front'), ('Fiche 1 · verso', 'Sheet 1 · back'),
    ('Fiche 2 · recto', 'Sheet 2 · front'), ('Fiche 2 · verso', 'Sheet 2 · back'),
    ('Aide de jeu · 1/2', 'Game aid · 1/2'), ('Aide de jeu · 2/2', 'Game aid · 2/2'),
    ('Mots-clés · 1/2', 'Keywords · 1/2'), ('Mots-clés · 2/2', 'Keywords · 2/2'),
]

PAIRES = {
'A5Tour.dc.html': [
    ('<title>Imperium Antique, votre tour</title>', '<title>Imperium: Classics, your turn</title>'),
    ('<h1>Votre tour</h1>', '<h1>Your turn</h1>'),
    ('<h2>La manche</h2>', '<h2>The round</h2>'),
    ("<p>Le joueur à gauche du jeton Solstice commence, puis on tourne dans le sens horaire. À votre tour : <b>un seul ordre</b>, puis votre <b>Nettoyage</b>. Quand tout le monde a joué : <b>Solstice</b>.</p>",
     "<p>The player to the left of the Solstice token starts, then play goes clockwise. On your turn: <b>one single order</b>, then your <b>Cleanup</b>. Once everyone has played: <b>Solstice</b>.</p>"),
    ('<h3>Activation</h3>', '<h3>Activation</h3>'),
    ('Presque tous vos tours.', 'Almost every turn.'),
    ("<p>Utilisez vos 3 jetons Action et 5 jetons Épuisé dans l'ordre que vous voulez.</p>",
     "<p>Use your 3 Action tokens and 5 Exhaust tokens in any order you like.</p>"),
    ('<h3>Recherche</h3>', '<h3>Research</h3>'),
    ('Une carte, sans Instabilité.', 'One card, without Unrest.'),
    ('<li>Défaussez toute votre main.</li>', '<li>Discard your whole hand.</li>'),
    ('<li>Innovez une Région, Tradition, Civilisé ou Vassal (pas de Renommée).</li>',
     '<li>Innovate a Region, Tradition, Civilised or Tributary (no Fame).</li>'),
    ('<h3>Pacification</h3>', '<h3>Pacify</h3>'),
    ('Le grand ménage.', 'The big clean-up.'),
    ('<p>Renvoyez dans la pile, sans rien payer, autant de cartes Instabilités de votre main que vous voulez.</p>',
     '<p>Return as many Unrest cards from your hand to the pile as you like, without paying anything.</p>'),
    ('Recherche et Pacification : ni Action ni capacité Épuiser. Les capacités Passif restent actives.',
     'Research and Pacify: no Action and no Exhaust ability. Passive abilities stay active.'),
    ('<h2>Actions et capacités Épuiser</h2>', '<h2>Actions and Exhaust abilities</h2>'),
    ("<li><b>Action</b> : retirez un jeton Action de votre carte État, le plus souvent pour jouer une carte de votre main. Elle se résout puis va dans votre défausse, sauf carte permanente (elle reste en jeu).</li>",
     "<li><b>Action</b>: remove an Action token from your State card, usually to play a card from your hand. It resolves, then goes to your discard pile, unless it is a permanent card (it stays in play).</li>"),
    ("<li><b>Épuiser</b> : posez un jeton Épuisé sur une carte en jeu (ou votre carte Puissance) qui n'en porte pas, puis résolvez le texte. Une fois par tour et par carte. Poser la carte ne déclenche pas sa capacité.</li>",
     "<li><b>Exhaust</b>: place an Exhaust token on a card in play (or your Power card) that has none, then resolve the text. Once per turn per card. Putting the card down does not trigger its ability.</li>"),
    ('<li><b>Action gratuite</b> : sans jeton Action, une fois par tour pour une même carte. Les coûts écrits restent dus.</li>',
     '<li><b>Free action</b>: no Action token needed, once per turn for the same card. Written costs are still due.</li>'),
    ('<li><b>Gagner une Action</b> : prenez un jeton du stock, même au-delà de 3.</li>',
     '<li><b>Gain an Action</b>: take a token from the supply, even beyond 3.</li>'),
    ('>Nettoyage</h3>', '>Cleanup</h3>'),
    ('<li><b>1 Progrès du stock</b> (pas de votre réserve) sur une carte du Marché.</li>',
     '<li><b>1 Progress from the supply</b> (not your reserve) onto a Market card.</li>'),
    ('<li>Récupérez vos jetons : 3 Actions, 5 Épuisé.</li>', '<li>Take back your tokens: 3 Actions, 5 Exhaust.</li>'),
    ('<li>Défaussez autant de cartes de votre main que vous voulez.</li>', '<li>Discard as many cards from your hand as you like.</li>'),
    ("<li>Piochez jusqu'à 5. Déjà 5 ou plus : vous ne piochez pas, et vous gardez tout.</li>",
     "<li>Draw up to 5. Already 5 or more: you don't draw, and you keep them all.</li>"),
    ("<p class=\"note\">Après l'étape 1, le joueur suivant peut déjà commencer.</p>",
     '<p class="note">After step 1, the next player may already start.</p>'),
    ('<h2>Payer</h2>', '<h2>Paying</h2>'),
    ('1 Progrès = 1 Population<br>1 Progrès = 2 Matériaux', '1 Progress = 1 Population<br>1 Progress = 2 Materials'),
    ("<p class=\"note\">Jamais l'inverse, sans rendu de monnaie. Seule votre réserve paie : une ressource posée sur une carte ne se dépense pas.</p>",
     '<p class="note">Never the other way round, and no change given. Only your reserve pays: a resource on a card cannot be spent.</p>'),
    ('<h2>Solstice</h2>', '<h2>Solstice</h2>'),
    ("<p>Chacun résout tous ses effets Solstice (zone de jeu, carte Puissance, carte État), en même temps, dans l'ordre de son choix. Ni Action ni Épuiser.</p>",
     '<p>Everyone resolves all their Solstice effects (play area, Power card, State card) at the same time, in the order of their choice. No Action, no Exhaust.</p>'),
],
'A5Deck.dc.html': [
    ('<title>Imperium Antique, deck, Marché et fin de partie</title>', '<title>Imperium: Classics, deck, Market and game end</title>'),
    ('<h1>Deck, Marché et fin de partie</h1>', '<h1>Deck, Market and game end</h1>'),
    ('Deck vide : vous mélangez</h3>', 'Empty deck: you shuffle</h3>'),
    ("<p>Deck vide quand vous devez Piocher : avant de mélanger, <b>une fois par tour</b>, ajoutez une carte à votre défausse, avec un jeton Épuisé libre comme témoin :</p>",
     '<p>Deck empty when you must Draw: before shuffling, <b>once per turn</b>, add a card to your discard pile, with a free Exhaust token as a marker:</p>'),
    ("<li><b>Pioche Nation</b> : sa première carte. Si c'est l'<b>Avènement</b>, retournez votre carte État : vous voilà Empire.</li>",
     '<li><b>Nation deck</b>: its top card. If it is the <b>Accession</b>, flip your State card: you are now an Empire.</li>'),
    ("<li><b>Pioche Nation vide</b> : payez le coût d'une carte Développement, celle que vous voulez. Développer la dernière déclenche le Décompte.</li>",
     '<li><b>Nation deck empty</b>: pay the cost of a Development card of your choice. Developing the last one triggers the Countdown.</li>'),
    ('<p class="note">Sans jeton libre, mélangez sans ajout. « Si possible » ne fait jamais mélanger.</p>',
     '<p class="note">No free token: shuffle without adding. “If possible” never makes you shuffle.</p>'),
    ('<h2>Le Marché : 5 cartes, toujours complété aussitôt</h2>', '<h2>The Market: 5 cards, always refilled at once</h2>'),
    ('<p>Emplacements : Principale · Principale · Civilisé · Tradition · Région. Une Instabilité sous chaque carte, <b>sauf les Régions</b>.</p>',
     '<p>Slots: Main · Main · Civilised · Tradition · Region. One Unrest under each card, <b>except Regions</b>.</p>'),
    ('<th style="width:68px">Verbe</th><th>Vous prenez</th><th style="width:118px">L\'Instabilité dessous</th>',
     '<th style="width:68px">Verb</th><th>You take</th><th style="width:118px">The Unrest under it</th>'),
    ('<td><b>Acquérir</b></td><td>La carte visible et ses ressources.</td><td>Vous la prenez aussi.</td>',
     '<td><b>Acquire</b></td><td>The visible card and its resources.</td><td>You take it too.</td>'),
    ('<td><b>Innover</b></td><td>La carte visible et ses ressources, ou la 1re carte cachée de la pioche Région, Tradition ou Civilisé.</td><td>Retourne dans la pile.</td>',
     '<td><b>Innovate</b></td><td>The visible card and its resources, or the top face-down card of the Region, Tradition or Civilised deck.</td><td>Goes back to the pile.</td>'),
    ('Vassal ou pioche vide : fouillez la pioche Principale. Rien trouvé : 2 Progrès.',
     'Tributary or empty deck: search the Main deck. Nothing found: 2 Progress.'),
    ("<h2>Se défaire d'une Instabilité</h2>", '<h2>Getting rid of Unrest</h2>'),
    ('<li><b>La jouer</b> : 1 Action, puis 3 Matériaux, ou 1 Population, ou 2 cartes défaussées.</li>',
     '<li><b>Play it</b>: 1 Action, then 3 Materials, or 1 Population, or discard 2 cards.</li>'),
    ('<li><b>Pacification</b> : toutes celles de votre main, gratuitement. <b>« Renvoyez une Instabilité »</b> : sans coût.</li>',
     '<li><b>Pacify</b>: all of those in your hand, for free. <b>“Return an Unrest”</b>: no cost.</li>'),
    ('<h3>Décompte</h3>', '<h3>Countdown</h3>'),
    ('<p>Déclenché par : pioche Principale vide ; dernière carte Développée ; Roi des rois retourné face cachée ; un effet de carte.</p>',
     '<p>Triggered by: Main deck empty; last card Developed; King of Kings flipped face down; a card effect.</p>'),
    ('<p>Finissez la manche (Solstice compris), puis <b>une manche complète</b>. Comptez : le plus de points gagne.</p>',
     '<p>Finish the round (Solstice included), then play <b>one full round</b>. Score: the most points wins.</p>'),
    ('>Effondrement</h3>', '>Collapse</h3>'),
    ("<p>La pile Instabilités se vide : <b>la partie s'arrête net</b>, même pendant un Décompte.</p>",
     '<p>The Unrest pile runs out: <b>the game ends at once</b>, even during a Countdown.</p>'),
    ("<p>Le moins d'Instabilités gagne (main, jeu, deck, défausse, Histoire). Égalité : aux points.</p>",
     '<p>The fewest Unrest wins (hand, play, deck, discard, History). Tie: points decide.</p>'),
    ('<h2>Ce qui compte au score</h2>', '<h2>What scores</h2>'),
    ('<p><b>Oui</b> : main, zone de jeu, deck, défausse, Histoire, carte Puissance, cartes Réservées, 1 point par Progrès de votre réserve. <b>Non</b> : pioche Nation, Développements non joués, Progrès posés sur des cartes. Carte à étoile : 10 points au plus.</p>',
     '<p><b>Yes</b>: hand, play area, deck, discard pile, History, Power card, Reserved cards, 1 point per Progress in your reserve. <b>No</b>: Nation deck, undeveloped Developments, Progress placed on cards. Star card: 10 points at most.</p>'),
],
}

# Mots-clés, termes de l'appli anglaise, condensés comme la version française
MOTS = [
    ('Abandon', 'Put a Region in play into your discard pile. Its resources return to your reserve; a card Reserved under it is discarded too.'),
    ('Acquire', 'Take a visible Market card of the stated category, with its resources and the Unrest under it. The Market is refilled at once.'),
    ('Action (gain, spend)', 'Gain: take an Action token from the supply, even beyond three. Spend: remove the number of tokens required, otherwise the effect is impossible.'),
    ('Free action', 'The card is played without an Action token. At most once per turn for the same card. Costs written on the card are still due.'),
    ('Add a resource', 'Take the resource from the supply and place it in the stated area or on the stated card.'),
    ('Attack', 'The effect hits all other players, as much as possible. Some cards let you ignore it.'),
    ('Barbarian / Empire', 'The sides of your State card. A card marked with a State can only be played from your hand if you are in that State. “If you are Barbarian / Empire”: the effect or option only exists in that State.'),
    ('Cards in play', 'A permanent card stays in play until an effect removes it. Its resources then return to your reserve; an Exhaust token on it only returns at the end of the turn.'),
    ('Choose', 'Resolve only one of the options separated by OR. A full sentence after the list applies in every case.'),
    ('Consider', 'Treat one icon as another until the end of the turn: the original icon no longer counts. The effect always ends before the Solstice or the Countdown.'),
    ('Discard', 'Put the card into your discard pile.'),
    ('Move a resource', "Move the resource from its owner's reserve to the stated place. No conversion possible. Resources already on cards are not moved."),
    ('Develop', 'Pay the cost of a card in your Development area, your choice, and put it into your discard pile. Through a card effect: even if a marker is already there, and without placing one. The Vikings never Develop.'),
    ('Give a card', 'Choose a card from your hand; an opponent takes it into their hand.'),
    ('Exchange', 'Replace a Market card with another one. Tokens stay in place, the Unrest is renewed (except Region), and the removed card goes where the other one came from.'),
    ('Exhaust', "During your Activation order, place an Exhaust token on the card to resolve its effect. Once per turn per card. Putting a card down doesn't trigger its Exhaust ability."),
    ('Exile', 'Send the card to the Exile pile. From the Market: the Unrest goes back to its pile, the card is replaced. Impossible if the card carries tokens.'),
    ('Gaining resources from Regions', "Triggers when a Region in play with the stated icon gains you that resource, by its own effect or another card's (Prosperity, for example)."),
    ('History', 'The cards put into History under your Power card. Out of play, but counted for scoring. Only you may look at them. The Vikings have none.'),
    ('Innovate', 'Announce a category, then take a visible Market card (its Unrest goes back to the pile) or the top face-down card of the matching deck. Tributary or empty deck: search the Main deck; nothing found: 2 Progress.'),
    ('Passive', 'Effect permanently active while the card is in play: during all orders, the Solstice and the Countdown.'),
    ('Pay', 'Return the required tokens from your reserve to the supply. 1 Progress can replace 1 Population or 2 Materials. No other conversion.'),
    ('Nation deck', 'Your Nation cards face down on the Accession. Whatever happens, the Accession stays at the very bottom and is never shuffled with them.'),
    ('Draw', 'Take cards from your deck into your hand. Empty deck: shuffle your discard pile and continue. You always draw the top card.'),
    ('Draw, if possible', 'Like Draw, but never shuffling the discard pile: empty deck, you stop.'),
    ('Place on your deck', 'Place the card (from your hand, unless stated otherwise) face down on your deck.'),
    ('Recall', 'Take a Region in play back into your hand, with the cards Reserved under it. Its resources return to your reserve. If you replay it this turn, you can Exhaust it again with another token.'),
    ('Recover', 'Take the stated card into your hand, or into the specified area. In a face-up area, you choose. Recovering an Unrest: from the common pile; the last one triggers the Collapse.'),
    ('Look at', 'Secretly look at the stated cards, then put them back in the order of your choice. Ignore King of Kings (Fame deck) and the Accession (Nation deck), unless it is alone.'),
    ('Return a card', "Put an Unrest back into the common pile. Playing it from your hand: an Action and its cost. Through another card's effect: no cost."),
    ('Return a token', 'Take back an Exhaust token placed on one of your cards and put it back on your State card. You can reuse it this turn.'),
    ('Reserve', 'Slide a card from your hand, face up, under the relevant card in play. It is no longer in play, but counts for scoring and shares the fate of the card holding it.'),
    ('Remove a resource', 'Return the stated resource to the supply. No conversion.'),
    ('Solstice', 'Effect resolved automatically at the end of each round.'),
    ('All players / all other players', "The first includes you, the second doesn't."),
    ('Find', 'Look for the card in your hand, then your discard pile, then your deck, then your Nation deck (except the Accession). Stop as soon as you find it and reveal it. Shuffle what you searched.'),
    ('Steal resources', "Take the stated tokens from the targeted players' reserves, as much as possible, without conversion."),
]
LEADS = ("The card verbs, exactly as the rulebook defines them. Keywords used only in Horizons (Goods, Haggle, End of Solstice) are left out.",
         "Each sentence on a card is resolved in order, as much as possible; whatever follows “may” is optional.")

def remplace(s, paires, nom):
    for fr, en in COMMUN + paires:
        if fr in s: s = s.replace(fr, en)
    return s

manque = []
for nom, paires in PAIRES.items():
    s = remplace((ICI / 'fr' / nom).read_text(encoding='utf-8'), paires, nom)
    for fr, en in paires:
        if en not in s: manque.append((nom, fr))
    (ICI / 'en' / nom).write_text(s, encoding='utf-8')

# Mots-clés : gabarit de la page française, corps reconstruit
mots = sorted(MOTS, key=lambda m: m[0].lower())
lignes = [math.ceil((len(a) + len(b) + 3) / 44) for a, b in mots]
tot, cum, coupe = sum(lignes), 0, 0
for i, n in enumerate(lignes):
    cum += n
    if cum >= tot / 2: coupe = i + 1; break
moities = [mots[:coupe], mots[coupe:]]
for k, (nom, ents) in enumerate(zip(['A5MotsCles1.dc.html', 'A5MotsCles2.dc.html'], moities)):
    s = (ICI / 'fr' / nom).read_text(encoding='utf-8')
    s = remplace(s, [], nom)
    debut, fin = ents[0][0][0].upper(), ents[-1][0][0].upper()
    s = re.sub(r'<title>.*?</title>', f'<title>Imperium: Classics, keywords {debut} to {fin}</title>', s)
    s = re.sub(r'<h1>.*?</h1>', f'<h1>Keywords, {debut} to {fin}</h1>', s)
    s = re.sub(r'(<p class="note" style="margin:0">).*?(</p>)', lambda m: m.group(1) + LEADS[k] + m.group(2), s)
    corps = ''.join(f'<p style="margin:0 0 5px;break-inside:avoid"><b style="color:#1d4f91">{html.escape(a)}</b> · {html.escape(b)}</p>\n' for a, b in ents)
    s = re.sub(r'(<div class="gl">\n).*?(</div>)', lambda m: m.group(1) + corps + m.group(2), s, flags=re.S)
    (ICI / 'en' / nom).write_text(s, encoding='utf-8')

# contrôle : plus de français visible
for f in sorted((ICI / 'en').glob('*.dc.html')):
    s = f.read_text(encoding='utf-8')
    corps = re.sub(r'<[^>]+>', ' ', s[s.index('<div class="pg">'):s.index('</x-dc>')])
    for mot in ('Votre', 'vous', 'Instabilit', 'Pioche', 'Épuis', 'Progrès', 'Marché', 'carte', 'Fiche'):
        if mot in corps: manque.append((f.name, 'reste en français : ' + mot))
for m in manque: print('À traduire :', *m)
print('en/ :', len(list((ICI / 'en').glob('*.dc.html'))), 'pages', '(OK)' if not manque else '')
sys.exit(1 if manque else 0)
