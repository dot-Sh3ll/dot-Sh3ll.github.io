#!/bin/sh
# Puerto Rico suit le format commun du site : page.html + i18n/<langue>.json + contenu/<langue>/*.js.
# Reconstruit puerto-rico/index.html (FR) et puerto-rico/en.html (EN) avec l'assembleur commun.
# usage (depuis la racine du dépôt) : sh outils/puerto-rico/build.sh   (puis python3 outils/site/seo.py)
set -e
python3 outils/site/assembler.py puerto-rico
