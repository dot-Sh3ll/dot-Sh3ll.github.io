#!/bin/sh
# Imperium suit le format commun du site : page.html + i18n/<langue>.json + contenu/<langue>/*.js.
# Reconstruit imperium/index.html (FR) et imperium/en.html (EN), puis les schémas et le bouton de thème.
# usage (depuis la racine du dépôt) : sh outils/imperium/build.sh   (puis python3 outils/site/seo.py)
set -e
python3 outils/site/assembler.py imperium
python3 outils/site/schemas.py imperium
python3 outils/site/theme.py imperium
