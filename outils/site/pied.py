#!/usr/bin/env python3
"""Pied de page du site sur les pages d'une appli : retour à l'accueil, « Signaler un problème » (ouvre le formulaire
« Votre avis » de l'accueil avec le jeu déjà choisi), Ko-fi, mention « création de fan ».

usage (depuis la racine du dépôt) :
  python3 outils/site/pied.py <dossier> "<jeu>"      ex. python3 outils/site/pied.py puerto-rico "Puerto Rico"

<jeu> doit être exactement la valeur d'une option du formulaire « Votre avis » de l'accueil (index.html, select name="app") ;
le script le vérifie. accueil.py ajoute cette option pour tout nouveau jeu (champ nouveau_jeu.chip).
Le pied charge aussi commun/sauvegarde.js (sauvegardes des visiteurs, récupération automatique de l'ancien domaine).
Le pied est posé (ou remplacé) sur chaque page de langue présente dans le dossier (index.html, en.html, de.html…).
"""
import os, re, sys
from urllib.parse import quote
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from langs import available, page_file

T = {
    "fr": ("← Toutes les aides de jeu", "💌 Signaler un problème", "☕ Cet outil vous a plu ? Offrez-moi un café",
           "Création de fan non officielle et gratuite, sans lien avec l'éditeur du jeu."),
    "en": ("← All game aids", "💌 Report a problem", "☕ Enjoyed this tool? Buy me a coffee",
           "Unofficial, free fan-made tool, not affiliated with the game's publisher."),
}
SAUVE = {
    "fr": ("Vos parties, carnets et progressions sont enregistrés dans ce navigateur.", "Sauvegarder mes données", "Restaurer une sauvegarde"),
    "en": ("Your games, logs and progress are stored in this browser.", "Back up my data", "Restore a backup"),
}


def version_sauvegarde():
    """empreinte de commun/sauvegarde.js, pour que les navigateurs prennent la nouvelle version"""
    import hashlib
    return hashlib.sha1(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "commun", "sauvegarde.js"), "rb").read()).hexdigest()[:10]


def ligne_sauvegarde(code, racine="../"):
    # pas de boutons visibles (choix de Paul, 27/11/2026) : tout est automatique ; SAUVE reste prêt si on les remet
    return f'<script src="{racine}commun/sauvegarde.js?v={version_sauvegarde()}" defer></script>\n'


def footer(code, game):
    back, report, kofi, fan = T.get(code, T["en"])
    # styles : .lrmp-pied dans commun/composants.css
    return ('<footer class="lrmp-pied">\n'
            f'<a href="../">{back}</a>\n'
            f'<a href="../?app={quote(game)}#avis">{report}</a>\n'
            f'<a href="https://ko-fi.com/paulmoussard" target="_blank" rel="noopener">{kofi}</a>\n'
            + ligne_sauvegarde(code) +
            f'<small>{fan}</small>\n'
            '</footer>\n')


def main():
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    folder, game = sys.argv[1], sys.argv[2]
    home = open("index.html", encoding="utf-8").read()
    if f'<option value="{game}"' not in home:
        sys.exit(f'« {game} » n\'est pas une option du formulaire « Votre avis » de index.html : l\'ajouter d\'abord.')
    for code in available(folder):
        p = os.path.join(folder, page_file(code))
        s = open(p, encoding="utf-8").read()
        s = re.sub(r'<footer (?:style="max-width:1100px;margin:48px auto 0;|class="lrmp-pied").*?</footer>\n?', "", s, flags=re.S)
        i = s.rindex("</body>")
        s = s[:i] + footer(code, game) + s[i:]
        open(p, "w", encoding="utf-8").write(s)
        print("ok", code, p)


if __name__ == "__main__":
    main()
