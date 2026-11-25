#!/bin/sh
# Reconstruit nemesis/index.html (FR) et nemesis/en.html (EN), puis pose la bascule de langue, l'en-tête du site, le pied de page et le bloc PWA.
# usage (depuis la racine du dépôt) : sh outils/nemesis/build.sh
set -e
D=outils/nemesis
mkdir -p nemesis
cat $D/1-head.html $D/2-data.js $D/3-chapters.js $D/4-labs.js $D/6-app.js > nemesis/index.html
python3 $D/en/build_en.py nemesis/en.html
python3 outils/site/lang.py fr nemesis/index.html
python3 outils/site/lang.py en nemesis/en.html
python3 outils/site/chrome.py fr nemesis/index.html
python3 outils/site/chrome.py en nemesis/en.html
python3 outils/site/pwa.py ../ nemesis/index.html
python3 outils/site/pwa.py ../ nemesis/en.html
if grep -q '"Nemesis: Retaliation"' index.html; then python3 outils/site/pied.py nemesis "Nemesis: Retaliation"; fi
