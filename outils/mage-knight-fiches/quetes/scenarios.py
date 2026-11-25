#!/usr/bin/env python3
"""Scénarios du module de quêtes Mage Knight : PDF A5 français et anglais (4 pages : 2 solo, 2 à deux).

Sources : fr/9-scen-solo.html … fr/12-scen-coop-suite.html = les pages A5QuetesScenSolo, A5QuetesScenSolo2,
A5QuetesScenCoop, A5QuetesScenCoop2 de l'artefact Design « Aide de jeu Mage Knight », copiées telles quelles.
Les scénarios sont ceux de l'appli Mage Knight (SCEN, entrées « quest:1 »).
Lancer depuis la racine du dépôt :
    python3 outils/mage-knight-fiches/quetes/scenarios.py
→ fiches/mage-knight-scenarios-quetes.pdf et fiches/mage-knight-quest-scenarios.pdf (pied de page du site ajouté),
  pages anglaises écrites dans en/. Puis relancer outils/site/seo.py (métadonnées des PDF).

CORRECTIFS_FR : retouches du français pour le PDF. EN : table phrase française → anglaise, commune aux 4 pages ;
une phrase introuvable dans toutes les pages est signalée (la page a changé dans l'artefact).
"""
import os, sys, asyncio
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from quetes import H, ROOT, to_html, render, pied

PAGES = ["9-scen-solo", "10-scen-solo-suite", "11-scen-coop", "12-scen-coop-suite"]

# Dans le PDF, les règles du module sont aux pages 1 à 8 du même document, pas dans les « fiches 7 à 10 » de l'artefact.
CORRECTIFS_FR = [("(fiches 7 à 10)", "(règles du module, pages 1 à 8)")]

EN = [
 ("Mage Knight, Quêtes : scénarios solo (suite)", "Mage Knight, Quests: solo scenarios (continued)"),
 ("Mage Knight, Quêtes : scénarios solo", "Mage Knight, Quests: solo scenarios"),
 ("Mage Knight, Quêtes : scénarios à deux (suite)", "Mage Knight, Quests: two-player scenarios (continued)"),
 ("Mage Knight, Quêtes : scénarios à deux", "Mage Knight, Quests: two-player scenarios"),
 ("<h1>Scénarios solo</h1>", "<h1>Solo scenarios</h1>"),
 ("<h1>Scénarios à deux</h1>", "<h1>Two-player scenarios</h1>"),
 ("Module Quêtes<br>Scénarios maison", "Quest module<br>Homemade scenarios"),
 ("Module Quêtes<br>Suite", "Quest module<br>Continued"),
 ('<div class="lt">Mise en place</div>', '<div class="lt">Setup</div>'),
 ('<div class="lt">Règles du scénario</div>', '<div class="lt">Scenario rules</div>'),
 ("<b>Objectif</b> · ", "<b>Goal</b> · "),
 ("<b>Fin</b> · ", "<b>End</b> · "),
 ("Difficulté ", "Difficulty "), (" sur 5\"", " out of 5\""),
 ("Manches · ", "Rounds · "),
 # Cadres communs
 ("<b>Cadre solo du livret :</b> un joueur Fantôme. Vous choisissez votre Tactique en premier, il en tire une au hasard, et les deux sont retirées pour le reste de la partie. Retirez les quatre Sorts interactifs (n° 17 à 20) et la Compétence interactive de votre Héros.",
  "<b>Rulebook solo setup:</b> one Dummy player. You choose your Tactic first, it draws one at random, and both are removed for the rest of the game. Remove the four interactive Spells (no. 17 to 20) and your Hero's interactive Skill."),
 ("<b>Cadre coopératif du livret :</b> un joueur Fantôme, qui tire sa Tactique au hasard avant vous. À la fin de chaque Manche, retirez du jeu une des Tactiques utilisées par les joueurs. Retirez les quatre Sorts interactifs (n° 17 à 20) et la Compétence interactive de chaque Héros. Pas de combat entre joueurs.",
  "<b>Rulebook co-op setup:</b> one Dummy player, who draws its Tactic at random before you. At the end of each Round, remove from the game one of the Tactics the players used. Remove the four interactive Spells (no. 17 to 20) and each Hero's interactive Skill. No combat between players."),
 ("<b>Module Quêtes obligatoire</b>, en mode Normal par défaut (règles du module, pages 1 à 8). Les niveaux de Cité indiqués tiennent déjà compte des quêtes : pas de +1.",
  "<b>Quest module required</b>, in Normal mode by default (module rules, pages 1 to 8). The City levels given already account for the quests: no +1."),
 ("Un site ne propose des quêtes <b>qu'une seule fois pour toute l'équipe</b>.", "A site offers quests <b>only once for the whole team</b>."),
 ("<b>Coup de main :</b> un Héros sur la même case qu'un autre peut, pendant son propre tour, produire une partie des valeurs hors combat (Parade, Déplacement, Influence, Soin…) demandées par la quête de son allié.",
  "<b>Helping hand:</b> a Hero on the same space as another may, during their own turn, generate part of the values outside combat (Block, Move, Influence, Heal…) that their ally's quest requires."),
 ("<b>Score :</b> réussi si l'objectif est atteint. Pour comparer vos parties : votre Gloire et les Hauts Faits sans les titres, plus 5 points par quête réussie au palier I, 10 au palier II, 15 au palier III, et 30 par Manche non utilisée.",
  "<b>Score:</b> a win if the goal is met. To compare your games: your Fame plus Achievements without the titles, plus 5 points per tier I quest completed, 10 per tier II, 15 per tier III, and 30 per unused Round."),
 ("<b>Score :</b> réussi si l'objectif est atteint. Pour comparer vos parties : la Gloire du joueur le moins avancé et les meilleurs Hauts Faits des deux, plus 5 points par quête réussie au palier I, 10 au palier II, 15 au palier III, et 30 par Manche non utilisée.",
  "<b>Score:</b> a win if the goal is met. To compare your games: the Fame of the player furthest behind and the best Achievements of the two, plus 5 points per tier I quest completed, 10 per tier II, 15 per tier III, and 30 per unused Round."),
 # Mise en place
 ("<li>Plateau en pyramide.</li>", "<li>Pyramid board.</li>"),
 ("<li>Plateau ouvert, tuile de départ côté B.</li>", "<li>Open board, starting tile side B.</li>"),
 ("<li>7 tuiles Campagne : gardez en priorité celles avec Village ou Monastère.</li>", "<li>7 Countryside tiles: keep in priority those with a Village or Monastery.</li>"),
 ("<li>8 tuiles Campagne.</li>", "<li>8 Countryside tiles.</li>"),
 ("<li>2 tuiles Royaume sans Cité.</li>", "<li>2 Core tiles without a City.</li>"),
 ("<li>1 tuile Royaume avec Cité et 1 sans Cité.</li>", "<li>1 Core tile with a City and 1 without.</li>"),
 ("<li>1 tuile Royaume avec Cité et 2 sans Cité.</li>", "<li>1 Core tile with a City and 2 without.</li>"),
 ("<li>2 tuiles Royaume avec Cité et 2 sans Cité.</li>", "<li>2 Core tiles with a City and 2 without.</li>"),
 ("<li>La Cité révélée est de niveau 4.</li>", "<li>The revealed City is level 4.</li>"),
 ("<li>La Cité révélée est de niveau 5.</li>", "<li>The revealed City is level 5.</li>"),
 ("<li>La Cité est de niveau 6.</li>", "<li>The City is level 6.</li>"),
 ("<li>La 1<sup>re</sup> Cité révélée est de niveau 5, la 2<sup>de</sup> de niveau 7.</li>", "<li>The 1<sup>st</sup> City revealed is level 5, the 2<sup>nd</sup> level 7.</li>"),
 ("<li>Aucune règle en plus du cadre commun.</li>", "<li>No rules beyond the common setup.</li>"),
 # Le Chevalier errant
 ('<span class="t">Le Chevalier errant</span>', '<span class="t">The Knight Errant</span>'),
 ("Pas de Cité à prendre : vous parcourez les villages et les monastères, une quête après l'autre. La meilleure porte d'entrée dans le module.",
  "No City to take: you travel from village to monastery, one quest after another. The best way into the module."),
 ("réussir 5 quêtes, dont au moins une de palier II.", "complete 5 quests, at least one of them tier II."),
 ("Rappel : un Monastère ne vous propose de quêtes que si votre Réputation vous donne au moins +1 Influence.", "Reminder: a Monastery only offers you quests if your Reputation gives you at least +1 Influence."),
 ("dès la 5<sup>e</sup> quête réussie, si l'une est de palier II, jouez un dernier tour. Sinon, à la fin de la 4<sup>e</sup> Manche.",
  "as soon as the 5<sup>th</sup> quest is completed, if one is tier II, play one last turn. Otherwise, at the end of the 4<sup>th</sup> Round."),
 # La Voie du héros
 ('<span class="t">La Voie du héros</span>', '<span class="t">The Hero\'s Path</span>'),
 ("Pour qu'une Cité vous confie ses missions, il faut une réputation sans tache. Gagnez la confiance du peuple, prenez la Cité, puis prouvez-vous digne d'elle.",
  "For a City to trust you with its missions, your name must be spotless. Win the people's trust, take the City, then prove yourself worthy of it."),
 ("réussir une quête de palier III, sans jamais choisir la voie de la crapule.", "complete a tier III quest without ever taking the rogue's path."),
 ("<b>Voie du héros :</b> vous ne choisissez jamais 😈, vous ne pillez aucun Village et ne brûlez aucun Monastère. Sinon, la partie est perdue.",
  "<b>Hero's path:</b> you never choose 😈, never plunder a Village and never burn a Monastery. Otherwise, you lose the game."),
 ("Palier III : votre Réputation doit vous donner au moins +2 Influence. Prendre la Cité d'assaut vous en coûtera : préparez-vous.",
  "Tier III: your Reputation must give you at least +2 Influence. Storming the City will cost you some: be ready."),
 ("dès la quête de palier III réussie, jouez un dernier tour. Sinon, à la fin de la 5<sup>e</sup> Manche.",
  "as soon as the tier III quest is completed, play one last turn. Otherwise, at the end of the 5<sup>th</sup> Round."),
 # La Confrérie de l'ombre
 ('<span class="t">La Confrérie de l\'ombre</span>', '<span class="t">The Shadow Brotherhood</span>'),
 ("Les honnêtes gens vous ferment leur porte, mais la Confrérie a toujours du travail pour un Chevalier sans scrupules. Prenez une Cité et devenez son homme de l'ombre.",
  "Honest folk shut their doors on you, but the Brotherhood always has work for an unscrupulous Knight. Take a City and become its shadow agent."),
 ("finir la partie avec une Réputation qui vous donne un malus, après avoir réussi 3 quêtes ⚫, dont une de palier III.",
  "end the game with a Reputation that gives you a penalty, after completing 3 ⚫ quests, one of them tier III."),
 ("<b>Voie de l'ombre :</b> quand une quête propose 😇 ou 😈, vous choisissez toujours 😈.", "<b>Shadow path:</b> when a quest offers 😇 or 😈, you always choose 😈."),
 ("<b>Contacts dans l'ombre :</b> tant que votre Réputation vous donne un malus, à chaque tirage, vous pouvez remplacer le résultat d'un des deux lancers par ⚫.",
  "<b>Shady contacts:</b> while your Reputation gives you a penalty, each time you roll, you may change the result of one of the two rolls to ⚫."),
 ("Rappel : avec une Réputation à malus, les Monastères vous sont fermés, et dans une Cité conquise vous ne pouvez accepter qu'une quête ⚫.",
  "Reminder: with a Reputation penalty, Monasteries are closed to you, and in a conquered City you may only accept a ⚫ quest."),
 ("dès la 3<sup>e</sup> quête ⚫ réussie, si l'une est de palier III, jouez un dernier tour. Sinon, à la fin de la 5<sup>e</sup> Manche. Votre Réputation doit alors vous donner un malus.",
  "as soon as the 3<sup>rd</sup> ⚫ quest is completed, if one is tier III, play one last turn. Otherwise, at the end of the 5<sup>th</sup> Round. Your Reputation must then give you a penalty."),
 # Compagnons d'armes
 ('<span class="t">Compagnons d\'armes</span>', '<span class="t">Brothers in Arms</span>'),
 ("Deux Chevaliers, un même tableau de quêtes. Partagez-vous les villages, et prêtez-vous main-forte quand une quête est trop lourde pour un seul.",
  "Two Knights, one quest board. Share out the villages, and lend each other a hand when a quest is too much for one."),
 ("réussir ensemble 8 quêtes, au moins 3 chacun, dont 2 de palier II.", "complete 8 quests together, at least 3 each, 2 of them tier II."),
 ("dès la 8<sup>e</sup> quête réussie, si l'objectif est rempli, chaque joueur joue un dernier tour, pas le Fantôme. Sinon, à la fin de la 4<sup>e</sup> Manche.",
  "as soon as the 8<sup>th</sup> quest is completed, if the goal is met, each player plays one last turn, not the Dummy. Otherwise, at the end of the 4<sup>th</sup> Round."),
 # Les Gardiens du Royaume
 ('<span class="t">Les Gardiens du Royaume</span>', '<span class="t">Guardians of the Realm</span>'),
 ("Le Royaume est menacé de toutes parts. Prenez la Cité, puis devenez les champions que ses habitants attendaient.",
  "The Realm is threatened on all sides. Take the City, then become the champions its people were waiting for."),
 ("conquérir la Cité, puis réussir 2 quêtes de palier III, une chacun.", "conquer the City, then complete 2 tier III quests, one each."),
 ("<b>Gardiens :</b> chaque Course réussie rapporte +1 Réputation aux deux Héros.", "<b>Guardians:</b> each Race completed gives +1 Reputation to both Heroes."),
 ("dès la 2<sup>de</sup> quête de palier III réussie, chaque joueur joue un dernier tour, pas le Fantôme. Sinon, à la fin de la 5<sup>e</sup> Manche.",
  "as soon as the 2<sup>nd</sup> tier III quest is completed, each player plays one last turn, not the Dummy. Otherwise, at the end of the 5<sup>th</sup> Round."),
 # La Grande Chronique
 ('<span class="t">La Grande Chronique</span>', '<span class="t">The Great Chronicle</span>'),
 ("La grande saga du module : des villages aux Cités, deux Chevaliers écrivent leur légende, quête après quête.",
  "The module's great saga: from villages to Cities, two Knights write their legend, quest after quest."),
 ("chaque Héros réussit au moins une quête de chaque palier, et l'équipe 12 quêtes au total.", "each Hero completes at least one quest of each tier, and the team 12 quests in all."),
 ("dès que l'objectif est rempli, chaque joueur joue un dernier tour, pas le Fantôme. Sinon, à la fin de la 6<sup>e</sup> Manche.",
  "as soon as the goal is met, each player plays one last turn, not the Dummy. Otherwise, at the end of the 6<sup>th</sup> Round."),
]

def pages(label_fr, label_en, start, total):
    """Les 4 pages de scénarios (FR, EN), numérotées start…start+3 sur total, pour le PDF unique du module."""
    fr_pages, en_pages, used = [], [], set()
    for p in PAGES:
        dc = open(os.path.join(H, "fr", p + ".html"), encoding="utf-8").read()
        for a, b in CORRECTIFS_FR: dc = dc.replace(a, b)
        en = dc
        for i, (a, b) in enumerate(EN):
            if a in en: used.add(i); en = en.replace(a, b)
        n = start + PAGES.index(p)
        dc, en = pied(dc, f"{label_fr} · {n}/{total}"), pied(en, f"{label_en} · {n}/{total}")
        fr_pages.append(to_html(dc, "fr")); en_pages.append(to_html(en, "en"))
        os.makedirs(os.path.join(H, "en"), exist_ok=True)
        open(os.path.join(H, "en", p + ".html"), "w", encoding="utf-8").write(en.replace('<html lang="fr">', '<html lang="en">'))
    missing = [EN[i][0] for i in range(len(EN)) if i not in used]
    for m in missing: print("[en] texte introuvable →", m[:90])
    return fr_pages, en_pages, not missing


def main():
    """Les scénarios font maintenant partie du PDF unique du module : voir quetes.py."""
    from quetes import main as module
    module()

if __name__ == "__main__":
    main()
