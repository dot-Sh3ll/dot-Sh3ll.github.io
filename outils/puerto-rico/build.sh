#!/bin/sh
# Reconstruit puerto-rico/index.html (FR) et puerto-rico/en.html (EN), puis pose la bascule de langue, l'en-tête du site et le bloc PWA.
# usage (depuis la racine du dépôt) : sh outils/puerto-rico/build.sh
set -e
D=outils/puerto-rico
cat $D/1-head.html $D/2-data.js $D/3-chapters.js $D/4-labs.js $D/5-ship.js $D/6-app.js > puerto-rico/index.html
python3 $D/en/build_en.py puerto-rico/en.html
python3 outils/site/lang.py fr puerto-rico/index.html
python3 outils/site/lang.py en puerto-rico/en.html
python3 outils/site/chrome.py fr puerto-rico/index.html
python3 outils/site/chrome.py en puerto-rico/en.html
python3 outils/site/pwa.py ../ puerto-rico/index.html
python3 outils/site/pwa.py ../ puerto-rico/en.html
