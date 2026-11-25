"""Assemble nemesis/en.html from the French sources.

- 1-head.html, 2-data.js (helpers) and 6-app.js: French code, interface strings replaced by the PAIRS below.
- 2-data.js rooms: replaced by en/salles.js.  3-chapters.js: en/3-chapters.js.  4-labs.js: en/4-labs.js.
- 6-app.js reference sheet: replaced by en/aide.js.
Any pair whose French text is no longer found is reported: fix the pair after changing the French page.
usage (from the repository root): python3 outils/nemesis/en/build_en.py nemesis/en.html
"""
import os, sys
D = os.path.dirname(os.path.abspath(__file__))
S = os.path.dirname(D)
rd = lambda p: open(p, encoding="utf-8").read()

HEAD = [
    ('<html lang="fr">', '<html lang="en">'),
    ("<title>Nemesis: Retaliation · Apprendre les règles</title>", "<title>Nemesis: Retaliation · Learn the rules</title>"),
    ('content="Apprendre Nemesis: Retaliation point de règle par point de règle : ateliers interactifs (sac Intrus, jet de bruit, tir, rafale), cas pratiques, quiz, aide-mémoire et toutes les salles."',
     'content="Learn Nemesis: Retaliation one rule at a time: interactive labs (Intruder bag, Noise roll, shooting, Burst), hands-on cases, quizzes, a reference sheet and every Room."'),
    ('data-tab="learn" aria-selected="true">Apprendre</button>', 'data-tab="learn" aria-selected="true">Learn</button>'),
    ('data-tab="aide" aria-selected="false">Aide-mémoire</button>', 'data-tab="aide" aria-selected="false">Reference</button>'),
    ('data-tab="salles" aria-selected="false">Salles</button>', 'data-tab="salles" aria-selected="false">Rooms</button>'),
    ('aria-label="Changer de thème (clair / sombre)"', 'aria-label="Change theme (light / dark)"'),
    ('aria-label="Sommaire du tutoriel"', 'aria-label="Tutorial contents"'),
    ("<p class=\"brand\">Apprendre les règles<small>D'après le livret de règles français</small></p>", '<p class="brand">Learn the rules<small>Based on the English rulebook</small></p>'),
    ('aria-expanded="false">Afficher le sommaire</button>', 'aria-expanded="false">Show contents</button>'),
]
DATA = [
    ("title=\"Objet ${{v:'vert',r:'rouge',j:'jaune'}[c]}\"", "title=\"${{v:'Green',r:'Red',j:'Yellow'}[c]} Item\""),
    ("const ITN={v:'vert',r:'rouge',j:'jaune'};", "const ITN={v:'green',r:'red',j:'yellow'};"),
    ('title="Ordinateur"', 'title="Computer"'),
]
APP = [
    ("<span>n° ${String(x.n).padStart(2,'0')}</span>", "<span>no. ${String(x.n).padStart(2,'0')}</span>"),
    ("$('#barlabel').textContent=`${d} chapitre${d>1?'s':''} validé${d>1?'s':''} sur ${CH.length}`", "$('#barlabel').textContent=`${d} of ${CH.length} chapter${CH.length>1?'s':''} completed`"),
    ("'<span class=\"tick\" aria-label=\"validé\">✓</span>'", "'<span class=\"tick\" aria-label=\"completed\">✓</span>'"),
    ("$('#tocbtn').textContent='Afficher le sommaire'})}", "$('#tocbtn').textContent='Show contents'})}"),
    ("'<span class=\"tag\">Que faites-vous ?</span>'", "'<span class=\"tag\">What do you do?</span>'"),
    ("${c.part} · étape ${i+1} sur ${CH.length}", "${c.part} · step ${i+1} of ${CH.length}"),
    ("<h2>Les points de règle</h2>", "<h2>The rules</h2>"),
    ("h+=`<h2>Cas pratiques</h2>", "h+=`<h2>Hands-on cases</h2>"),
    ("h+=`<h2>Vérifiez que c'est acquis</h2>", "h+=`<h2>Check your understanding</h2>"),
    ("data-tab=\"aide\">Ouvrir l'aide-mémoire →</button>", "data-tab=\"aide\">Open the reference sheet →</button>"),
    ("`<h2>Les 12 salles de section</h2>", "`<h2>The 12 Section Rooms</h2>"),
    ("<p class=\"small muted\">Les salles aléatoires sont dans l'onglet <a href=\"#\" data-tab=\"salles\">Salles</a>.</p>", "<p class=\"small muted\">The random Rooms are in the <a href=\"#\" data-tab=\"salles\">Rooms</a> tab.</p>"),
    ("`<b>Pas tout à fait.</b> Essayez une autre réponse.`", "`<b>Not quite.</b> Try another answer.`"),
    ("`${ok} question${ok>1?'s':''} sur ${all.length} résolue${ok>1?'s':''}, dont ${first} du premier coup.`", "`${ok} of ${all.length} question${all.length>1?'s':''} solved, ${first} on the first try.`"),
    ("`<div class=\"done-banner\">✓ Chapitre validé.</div>`", "`<div class=\"done-banner\">✓ Chapter completed.</div>`"),
    ("$('#tocbtn').textContent=o?'Masquer le sommaire':'Afficher le sommaire'};", "$('#tocbtn').textContent=o?'Hide contents':'Show contents'};"),
    ("<div class=\"eyebrow\">Aide de jeu</div><h1>Les salles</h1><p class=\"lead\">Les 12 salles de section sont toujours en jeu ; les 13 salles aléatoires (« ? ») pas forcément. Une action de salle coûte 2 cartes et se fait hors combat.</p>",
     "<div class=\"eyebrow\">Help sheet</div><h1>The Rooms</h1><p class=\"lead\">The 12 Section Rooms are always in play; the 13 random (\"?\") Rooms may not be. Use the Room costs 2 cards and is Not in Combat.</p>"),
    ("${['Toutes','Section A','Section B','Section C','Aléatoires'][i]}", "${['All','Section A','Section B','Section C','Random'][i]}"),
    ("placeholder=\"Chercher une salle ou un effet…\" aria-label=\"Chercher une salle\"", "placeholder=\"Search a Room or an effect…\" aria-label=\"Search a Room\""),
    ("<p class=\"small muted\">Couleurs des icônes Objet (pour la Fouille) : ${it('r')} rouge ${it('v')} vert ${it('j')} jaune. ${ordi} ordinateur : la salle peut être utilisée depuis la Salle des serveurs, et le robot activé à distance depuis elle.</p>",
     "<p class=\"small muted\">Item icon colours (for Searching): ${it('r')} red ${it('v')} green ${it('j')} yellow. ${ordi} Computer: the Room can be used from the Server Room, and the Robot can be activated remotely from it. Random Room names are translated from the French edition's help sheet.</p>"),
    ("'<p class=\"muted\">Aucune salle trouvée.</p>'", "'<p class=\"muted\">No Room found.</p>'"),
    ("$('#theme').title='Thème : '+{auto:'automatique',dark:'sombre',light:'clair'}[th]", "$('#theme').title='Theme: '+{auto:'automatic',dark:'dark',light:'light'}[th]"),
    ("LS.get('nemr-tuto',", "LS.get('en:nemr-tuto',"), ("LS.set('nemr-tuto',", "LS.set('en:nemr-tuto',"),
    ("<footer class=\"page small muted\" style=\"padding-top:0\">Aide de jeu de fan, gratuite et non officielle, sans lien avec Awaken Realms ni ses éditeurs partenaires. Nemesis: Retaliation © Awaken Realms. Règles résumées d'après le livret de règles français et l'aide de jeu Salles.</footer>",
     "<footer class=\"page small muted\" style=\"padding-top:0\">Free, unofficial fan-made game aid, not affiliated with Awaken Realms or its partner publishers. Nemesis: Retaliation © Awaken Realms. Rules summarised from the English rulebook and the Rooms help sheet.</footer>"),
]


def apply(txt, pairs, name, miss):
    for a, b in pairs:
        if txt.count(a) != 1:
            miss.append(f"{name}: {a[:90]}")
            continue
        txt = txt.replace(a, b)
    return txt


def main(out):
    miss = []
    head = apply(rd(os.path.join(S, "1-head.html")), HEAD, "1-head", miss)
    data = rd(os.path.join(S, "2-data.js"))
    i, j = data.index("const SALLES=["), data.index("const ICN=")
    j = data.index("\n", j) + 1
    data = apply(data[:i], DATA, "2-data", miss) + rd(os.path.join(D, "salles.js")) + data[j:]
    app = rd(os.path.join(S, "6-app.js"))
    a, b = app.index("/* ---------- aide-mémoire ---------- */"), app.index("/* ---------- onglet Salles ---------- */")
    app = apply(app[:a] + "@@AIDE@@" + app[b:], APP, "6-app", miss).replace("@@AIDE@@", rd(os.path.join(D, "aide.js")))
    page = head + data + rd(os.path.join(D, "3-chapters.js")) + rd(os.path.join(D, "4-labs.js")) + app
    open(out, "w", encoding="utf-8").write(page)
    print(f"en.html assemblée, {len(miss)} paire(s) introuvable(s)")
    for m in miss:
        print("  INTROUVABLE", m)


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else "nemesis/en.html")
