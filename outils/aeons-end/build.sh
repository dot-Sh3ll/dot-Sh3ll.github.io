#!/bin/sh
# Aeon's End suit le format commun du site : page.html + i18n/<langue>.json + contenu/<langue>/*.
# Français et anglais s'écrivent à la main (contenu/fr, contenu/en). La version allemande a été retirée
# le 26/11/2026 (aeons-end/de.html renvoie vers en.html).
# Reconstruit aeons-end/index.html et en.html, puis le bouton de thème.
# usage (depuis la racine du dépôt) : sh outils/aeons-end/build.sh   (puis python3 outils/site/seo.py)
set -e
python3 outils/site/assembler.py aeons-end
python3 outils/site/theme.py aeons-end
