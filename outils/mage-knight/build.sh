#!/bin/sh
# Mage Knight suit le format commun du site : page.html + i18n/<langue>.json + contenu/<langue>/*.
# Reconstruit mage-knight/index.html (FR) et mage-knight/en.html (EN), puis les schémas, le bouton de thème
# et les précisions (« À ne pas oublier », « Précisions », « Cas épineux »).
# usage (depuis la racine du dépôt) : sh outils/mage-knight/build.sh   (puis python3 outils/site/seo.py)
set -e
python3 outils/site/assembler.py mage-knight
python3 outils/site/schemas.py mage-knight
python3 outils/site/theme.py mage-knight
python3 outils/mage-knight/precisions.py
