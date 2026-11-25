#!/bin/sh
# Nemesis suit le format commun du site : page.html + i18n/<langue>.json + contenu/<langue>/*.js.
# Reconstruit nemesis/index.html (FR) et nemesis/en.html (EN) avec l'assembleur commun.
# usage (depuis la racine du dépôt) : sh outils/nemesis/build.sh   (puis python3 outils/site/seo.py)
set -e
python3 outils/site/assembler.py nemesis
