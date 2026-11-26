#!/bin/sh
# Aeon's End suit le format commun du site : page.html + i18n/<langue>.json + contenu/<langue>/*.
# Le français et l'anglais s'écrivent à la main (contenu/fr, contenu/en) ; les autres langues (de) sont
# produites depuis l'anglais par gen_lang.py, avec les tables de langues/<code>/.
# Reconstruit aeons-end/index.html, en.html et de.html, puis le bouton de thème.
# usage (depuis la racine du dépôt) : sh outils/aeons-end/build.sh   (puis python3 outils/site/seo.py)
set -e
for d in outils/aeons-end/langues/*/; do
  python3 outils/aeons-end/gen_lang.py "$(basename "$d")" | tail -1
done
python3 outils/site/assembler.py aeons-end
python3 outils/site/theme.py aeons-end
