# Outils de construction du site

Ces scripts ne font pas partie du site : ils servent à le modifier. Le dossier est exclu de la publication (voir `_config.yml` à la racine).

Les scripts utilisent des chemins fixes sous `/home/claude/`. Pour les remettre en place dans une nouvelle session :

```bash
git clone https://github.com/dot-Sh3ll/dot-Sh3ll.github.io /home/claude/dot-sh3ll.github.io
R=/home/claude/dot-sh3ll.github.io
mkdir -p /home/claude/tools /home/claude/tr /home/claude/ae
cp $R/outils/site/*.py /home/claude/tools/
cp $R/outils/traduction/* /home/claude/tr/
cp $R/outils/aeons-end/* /home/claude/ae/
cp -r $R /home/claude/site            # copie de travail utilisée par la traduction
cd /home/claude/ae && npm install     # installe typescript (pour extract.js)
```

## `site/` : en-tête, PWA, langue

| Script | Rôle |
|---|---|
| `chrome.py fr\|en <page>` | Pose l'en-tête du site (dé, nom, FR/EN, Ko-fi) sur une appli et l'aligne sur la largeur commune (`--site-w` 1080 px, `--site-pad` 20 px, 16 px sur mobile). À relancer sur les 6 pages d'applis après toute modification de l'en-tête. |
| `pwa.py <préfixe> <page>` | Ajoute le bloc PWA (manifeste, icônes, service worker) et GoatCounter. Préfixe `../` pour une appli. |
| `lang.py fr\|en <page>` | Redirection de langue ; sur une page EN, sauvegardes séparées (préfixe `en:`). |
| `i18n.py extract\|apply` | Extraction des textes d'une page et application d'une table de traduction. |
| `pdf_footer.py <source.pdf> <sortie.pdf> [x0,haut,x1,bas …]` | Ajoute « paulmoussard.com » en bas de chaque page d'un PDF existant (zones optionnelles masquées en blanc sur la 1re page). |
| `test_clics.py` | Test de clics au hasard (Playwright), serveur local `python3 -m http.server 8766` lancé depuis la racine du dépôt. |

## `traduction/` : versions anglaises

- Mage Knight et Imperium : `build_mk.sh` et `build_imp.sh` reconstruisent `en.html` depuis la page française (`*-N.tsv` = traductions par numéro de texte, `*-words.json` = mots isolés, `merge.py` assemble).
- Aeon's End : `ae_map.py` a servi à la première version anglaise. Depuis l'ajout de toutes les boîtes, les deux pages d'Aeon's End se modifient en parallèle (voir ci-dessous) plutôt que d'être regénérées.

## `aeons-end/` : données de toutes les boîtes

- `aer.json` : cartes, mages et némésis de toutes les boîtes, extraits de [aeons-end-randomizer](https://github.com/on3iro/aeons-end-randomizer) (© 2019 Theo Salzmann, licence MIT) avec `extract.js` (lecture des fichiers TypeScript, sans les exécuter).
- `common.py` : liste des boîtes (clé, nom FR, nom EN, vague, Legacy), nettoyage des textes.
- `fr1.tsv` … `fr4.tsv` : traductions françaises maison des cartes absentes de la VF (`id`, nom, effet ; `|` = retour à la ligne, `~` = OU).
- `gen.py` : construit les blocs de données FR et EN en gardant les cartes, profils et noms déjà présents dans les pages.
- `patch.py` : a appliqué ces blocs et les changements de code aux deux pages (à adapter avant de le relancer : les motifs qu'il cherche ont changé).
- `verify.py index.html|en.html` : vérifie que chaque boîte contient exactement les bonnes cartes, mages et némésis.

## `puerto-rico/` : appli Puerto Rico 1897

La page est découpée en morceaux (`1-head.html` : styles et structure, `2-data.js` : bâtiments, `3-chapters.js` : contenu du tutoriel, `4-labs.js` et `5-ship.js` : ateliers, `6-app.js` : rendu, aide-mémoire, décompte). Modifier les morceaux puis lancer `sh outils/puerto-rico/build.sh` depuis la racine. Pas encore de version anglaise : `chrome.py` grise alors le bouton EN.

Fiches A5 : `outils/puerto-rico/fiches/gen.py` (lit `b.json`, la liste des bâtiments extraite de `2-data.js`) produit `puerto-rico-aide-de-jeu.pdf` et `puerto-rico-batiments.pdf`, à copier dans `fiches/`.
