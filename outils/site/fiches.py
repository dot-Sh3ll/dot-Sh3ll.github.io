"""Rappel des fiches à imprimer dans les applis qui en ont.

Lit les fiches de la page d'accueil (articles « pdf » : titre, description, PDF français et anglais)
et pose dans chaque page d'appli concernée un petit bloc <!--fiches-->…<!--/fiches--> (style + script) qui :
  1. ajoute un encart « À imprimer » en tête de l'aide-mémoire ;
  2. ajoute un rappel « Prêt pour votre première partie ? » à la fin du tutoriel (dernier chapitre).
Une appli sans fiche ne reçoit rien (et un ancien bloc est retiré). Relancer ne duplique rien.
La page anglaise propose les PDF anglais (ou le français, signalé, s'il n'y a pas de version anglaise).

usage (depuis la racine du dépôt) : python3 outils/site/fiches.py            toutes les applis
                                    python3 outils/site/fiches.py imperium   une seule
À relancer après une nouvelle fiche sur l'accueil, et après la reconstruction d'une appli
(assembler.py le fait, donc tous les build.sh).
"""
import html, json, os, re, sys

RACINE = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Où poser les deux rappels, appli par appli.
#   aide : élément APRÈS lequel va l'encart de l'aide-mémoire
#   fin  : (bouton propre au dernier chapitre, conteneur AVANT lequel va le rappel)
CONF = {
    "puerto-rico": {"aide": "#aide h1", "fin": ['.pager button[data-tab="aide"]', ".pager"]},
    "imperium": {"aide": "#aide h1", "fin": [".endnav button[data-done]:not([data-go])", ".endnav"]},
    "mage-knight": {"aide": "#app-aide header.top", "fin": ['#c-bot button.primary[data-chap="free"]', ".row"]},
    "nemesis": {"aide": "#aide h1", "fin": ['.pager button[data-tab="aide"]', ".pager"]},
    "aeons-end": None,  # pas de tutoriel ni d'aide-mémoire : rien à poser pour l'instant
}

TXT = {
    "fr": {"k": "À imprimer", "aide": "Vous préférez le papier ? Ces fiches A5 se gardent près du plateau pendant la partie.",
           "fin_t": "Prêt pour votre première partie ?", "fin": "Imprimez les fiches et gardez-les près du plateau :",
           "dl": "PDF", "frtag": ""},
    "en": {"k": "To print", "aide": "Prefer paper? These A5 sheets sit next to the board while you play.",
           "fin_t": "Ready for your first game?", "fin": "Print the sheets and keep them next to the board:",
           "dl": "PDF", "frtag": " (French)"},
}

CSS = ""  # styles de l'encart : .lrmp-fiches dans commun/composants.css

JS = """<script>
(function(){var F=%s,C=%s,T=%s;
function box(kind){var a=document.createElement('aside');a.className='lrmp-fiches';a.dataset.kind=kind;
 a.innerHTML='<p class="k">'+(kind==='fin'?T.fin_t:T.k)+'</p><p class="t">'+(kind==='fin'?T.fin:T.aide)+'</p><ul>'+F.map(function(f){
  return '<li><span class="n">'+f.t+'<small>'+f.d+'</small></span><a class="d" href="'+f.u+'" download>⬇ '+T.dl+f.x+'</a></li>'}).join('')+'</ul>';return a}
function place(){var e=C.aide&&document.querySelector(C.aide);
 if(e&&!(e.nextElementSibling&&e.nextElementSibling.dataset&&e.nextElementSibling.dataset.kind==='aide'))e.insertAdjacentElement('afterend',box('aide'));
 var b=C.fin&&document.querySelector(C.fin[0]),c=b&&b.closest(C.fin[1]);
 if(c&&!(c.previousElementSibling&&c.previousElementSibling.dataset&&c.previousElementSibling.dataset.kind==='fin'))c.insertAdjacentElement('beforebegin',box('fin'))}
var busy=false;function run(){if(busy)return;busy=true;try{place()}finally{busy=false}}
run();new MutationObserver(function(){requestAnimationFrame(run)}).observe(document.body,{childList:true,subtree:true});
})();
</script>"""


def fiches_accueil():
    t = open(os.path.join(RACINE, "index.html"), encoding="utf-8").read()
    jeux = dict(re.findall(r'<a class="card [^"]*" data-game="([a-z]+)"[^>]*href="([a-z0-9-]+)/"', t))
    out = {}
    for m in re.finditer(r'<article class="pdf [^"]*" data-game="([a-z]+)".*?</article>', t, re.S):
        a, g = m.group(0), m.group(1)
        get = lambda cls, tag: (re.search(rf'<{tag} class="{cls}">(.*?)</{tag}>', a, re.S) or [None, ""])[1]
        h3 = re.search(r"<h3>(.*?)</h3>", a, re.S).group(1)
        tit = {c: re.sub(r"<[^>]+>", "", (re.search(rf'<span class="{c}"[^>]*>(.*?)</span>', h3, re.S) or [None, ""])[1]) for c in ("fr", "en")}
        pdf = {c: (re.search(rf'<a class="dl {c}" href="([^"]+)"', a) or [None, None])[1] for c in ("fr", "en")}
        ico = (re.search(r'<span class="ico"[^>]*>(.*?)</span>', a) or [None, "📄"])[1]
        dossier = jeux.get(g)
        if not dossier:
            continue
        out.setdefault(dossier, []).append({"ico": ico, "t": tit, "d": {"fr": get("fr", "p"), "en": get("en", "p")}, "pdf": pdf})
    # l'aide de jeu d'abord, puis les autres de la plus ancienne à la plus récente (l'accueil va du plus récent au plus ancien)
    for d in out:
        out[d] = sorted(reversed(out[d]), key=lambda f: 0 if "aide-de-jeu" in (f["pdf"]["fr"] or "") else 1)
    return out


def bloc(liste, code, conf, dossier):
    tx = TXT[code]
    F = []
    for f in liste:
        titre = f["t"][code] or f["t"]["fr"]
        titre = re.sub(r"^.*? · ", "", titre)  # « Mage Knight · Aide de jeu » → « Aide de jeu »
        url = f["pdf"][code] or f["pdf"]["fr"]
        x = "" if (code == "fr" or f["pdf"][code]) else tx["frtag"]
        F.append({"t": html.escape(titre), "d": html.escape(html.unescape(re.sub(r"<[^>]+>", "", re.sub(r"<br\s*/?>", " ", f["d"][code] or f["d"]["fr"])))), "u": "../" + url, "x": x})
    T = {k: html.escape(v) for k, v in tx.items()}
    return "<!--fiches-->\n" + JS % (json.dumps(F, ensure_ascii=False), json.dumps(conf), json.dumps(T, ensure_ascii=False)) + "\n<!--/fiches-->\n"


def poser(dossier, toutes):
    conf = CONF.get(dossier)
    liste = toutes.get(dossier, [])
    for nom in sorted(os.listdir(os.path.join(RACINE, dossier))):
        if not re.fullmatch(r"(index|[a-z]{2})\.html", nom):
            continue
        code = "fr" if nom == "index.html" else nom[:2]
        p = os.path.join(RACINE, dossier, nom)
        s = open(p, encoding="utf-8").read()
        s = re.sub(r"<!--fiches-->.*?<!--/fiches-->\n?", "", s, flags=re.S)
        if conf and liste:
            b = bloc(liste, code if code in TXT else "en", conf, dossier)
            i = s.rindex("</body>")
            s = s[:i] + b + s[i:]
            etat = f"{len(liste)} fiche(s)"
        else:
            etat = "aucune fiche"
        open(p, "w", encoding="utf-8").write(s)
        print(f"ok {dossier}/{nom} : {etat}")


if __name__ == "__main__":
    toutes = fiches_accueil()
    cibles = sys.argv[1:] or [d for d in CONF if os.path.isdir(os.path.join(RACINE, d))]
    for d in cibles:
        poser(d, toutes)
