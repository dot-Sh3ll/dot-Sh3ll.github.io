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
| `accueil.py liste\|maj\|appli\|fiche` | Page d'accueil sans toucher au HTML : liste des cartes et de leurs dates, mise à jour de la date d'une appli ou d'une fiche (`maj puerto-rico`), ajout ou remplacement d'une carte d'appli ou d'une fiche à partir d'un petit JSON (modèles dans `accueil/exemples/`). Un nouveau jeu (couleurs, bouton de filtre, recherche, choix dans le formulaire) se déclare dans le même JSON avec `nouveau_jeu`. |
| `home_lang.py` | Langues de la page d'accueil, à partir de `accueil/<code>.json`. Relancé automatiquement par `accueil.py`. `home_lang.py --todo de` liste les textes encore sans traduction. |
| `lang.py fr\|en <page>` | Redirection de langue ; sur une page EN, sauvegardes séparées (préfixe `en:`). Toute langue du site autre que le français (en, de, es…) ouvre `en.html`. |
| `i18n.py extract\|apply` | Extraction des textes d'une page et application d'une table de traduction. |
| `pdf_footer.py <source.pdf> <sortie.pdf>` | Ajoute le pied de page « Less Rules, More Play · paulmoussard.com » à un PDF existant (à partir d’un PDF sans pied de page). |
| `vouvoiement.py scan\|apply <fichiers>` | Consigne du site : on vouvoie le lecteur. `scan` liste ce qui reste au tutoiement (tu, ton, ta, tes, toi, te, -tu) et les verbes après « puis / et » à vérifier ; `apply` convertit sur place les formes reconnues (table de conjugaison, impératifs connus) et affiche chaque phrase modifiée. Relire la sortie : les impératifs qui sont aussi des noms (« Défausse », « Pioche Nation ») et les verbes coordonnés à la 3e personne restent à vérifier à la main. Si le texte français d'une appli change, penser aux tables de traduction (`puerto-rico/en/pairs_*.py`, `traduction/imp-map.json`), dont les clés sont les phrases françaises. |
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

La page est découpée en morceaux (`1-head.html` : styles et structure, `2-data.js` : bâtiments, `3-chapters.js` : contenu du tutoriel, `4-labs.js` et `5-ship.js` : ateliers, `6-app.js` : rendu, aide-mémoire, décompte). Modifier les morceaux puis lancer `sh outils/puerto-rico/build.sh` depuis la racine. Version anglaise : `en/2-data.js` et `en/3-chapters.js` sont rédigés en anglais (d'après le livret anglais, qui diffère du français sur le chargement des navires et l'Hôpital avec l'Hacienda) ; les autres morceaux sont traduits par les paires de `en/pairs_*.py` (`en/build_en.py` signale toute paire devenue introuvable après une modification de la page française). Fiches anglaises : `fiches/gen_en.py`.

Fiches A5 : `outils/puerto-rico/fiches/gen.py` (lit `b.json`, la liste des bâtiments extraite de `2-data.js`) produit `puerto-rico-aide-de-jeu.pdf` et `puerto-rico-batiments.pdf`, à copier dans `fiches/`.

## `mage-knight-fiches/` : aide de jeu Mage Knight en anglais

Les fiches françaises n'existent qu'en PDF (pages en image). `gen_mk_en.py` reconstruit la version anglaise en HTML puis en PDF ; les illustrations des sites et des capacités ennemies (`ico/`) ont été découpées dans les fiches françaises. Police des titres : `npm install @fontsource/marcellus` dans le dossier du script.

## `mage-knight-fiches/quetes/` : module de quêtes Mage Knight (FR et EN)

Les 8 pages viennent de l'artefact Design « Aide de jeu Mage Knight » (pages `A5QuetesRegles` … `A5QuetesIIINuit`), copiées telles quelles dans `fr/` (`1-regles.html` … `8-III-nuit.html`). `python3 outils/mage-knight-fiches/quetes/quetes.py` applique les correctifs du français (`CORRECTIFS_FR` : coquilles, pas de mention de BGG), produit l'anglais avec la table `EN` (phrase française → anglaise, page par page ; les pages anglaises sont aussi écrites dans `en/`), imprime les deux PDF A5 avec le pied de page du site : `fiches/mage-knight-module-quetes.pdf` et `fiches/mage-knight-quest-module.pdf`. Après une modification dans l'artefact : recopier les pages dans `fr/`, relancer ; le script signale toute phrase française qui n'a plus de traduction. Polices : `npm install @fontsource/marcellus @fontsource/figtree` dans `outils/mage-knight-fiches/`.

## Langues du site

- Page d'accueil : français et anglais sont écrits dans `index.html` ; les autres langues (allemand, espagnol…) viennent de `outils/site/accueil/<code>.json`, où chaque clé est un texte anglais de la page et chaque valeur sa traduction. Les blocs `_words` (interface), `_form` (formulaire), `_soon` (bandeau sous le titre) et `_k` (bouton « Télécharger (EN) ») complètent le fichier.
- Ajouter une langue : copier `de.json` en `it.json`, changer `_name` et `_locale`, traduire les valeurs, puis `python3 outils/site/home_lang.py`. Les textes oubliés restent en anglais et sont listés.
- Tant qu'une langue a `"_apps": "en"`, ses visiteurs reçoivent les applis et les fiches en anglais (bouton « Herunterladen (EN) », redirection des applis vers `en.html`).
- Pour traduire ensuite une appli dans une nouvelle langue : `i18n.py extract` sur la page anglaise, traduire le JSON obtenu, `i18n.py apply`, puis adapter `lang.py` et `chrome.py` (aujourd'hui prévus pour la paire FR/EN).
