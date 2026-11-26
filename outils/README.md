# Outils de construction du site

Vue d'ensemble, conventions et procédures : `CLAUDE.md` à la racine. Ce fichier détaille chaque script.

## Outils transverses (à la racine de `outils/`)

| Script | Rôle |
|---|---|
| `verifier.py [--rapide]` | Vérifie tout le site avant publication : balises SEO, liens et images internes, sitemap, langues déclarées, poids, cache hors ligne, vouvoiement, html-validate (s'il est installé ; règles dans `html-validate.json`). Code de sortie 1 en cas d'erreur. Lancé à chaque push par `.github/workflows/verifier.yml`. |
| `traduire_etat.py` | Tableau de l'avancement des traductions : applis × langues, accueil, fiches. |
| `nouvelle_appli.py` | Crée une appli complète sur le modèle commun (voir `CLAUDE.md`, « Ajouter un jeu »). |
| `modele-appli/` | Modèle d'appli : `page.html` (tutoriel en chapitres + aide-mémoire), `i18n/<langue>.json` (textes d'interface par clés), `contenu/<langue>.js`. |
| `fiches-gabarit/` | Gabarit des fiches A5 (portrait, paysage, couleurs par jeu), copie de l'artefact Design « Gabarit des fiches Less Rules, More Play ». |

## Socle commun (`site/`)

| Script | Rôle |
|---|---|
| `jeux.json` | Registre des applis : code, couleur, police, nom du jeu, titres et descriptions par langue, image de partage, option du formulaire. Lu par `seo.py`, `og_images.py`, `sw.py`, `assembler.py`, `verifier.py`. |
| `commun.py <pages>` | Pose les liens vers `commun/tokens.css` et `commun/composants.css` (avec `?v=` tiré du contenu). Appelé par `chrome.py`. |
| `polices.py <pages>` | Remplace Google Fonts par `commun/polices.css` + préchargements. Appelé par `chrome.py`. |
| `assembler.py <dossier>` | Construit toutes les langues d'une appli faite sur le modèle commun, puis langue, en-tête, PWA, pied, fiches. |
| `sw.py` | Écrit `PRECACHE` et `VERSION` (empreinte du contenu) dans `sw.js`, la description et les raccourcis du manifest. Appelé par `seo.py`. |

`seo.py` génère aussi les accueils `/en/` et `/de/` depuis `index.html` (et `home_lang.py` les refait à chaque changement de l'accueil).

Ces scripts ne font pas partie du site : ils servent à le modifier. Le dossier est exclu de la publication (voir `_config.yml` à la racine).

Seuls les scripts de traduction de Mage Knight et d'Imperium (`traduction/`) et ceux d'Aeon's End utilisent encore des chemins fixes sous `/home/claude/`. Pour les remettre en place dans une nouvelle session :

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
| `chrome.py <dossier>` ou `chrome.py <code> <page>` | Pose l'en-tête du site (dé, nom, bouton de langue, Ko-fi) sur les pages d'une appli, puis les feuilles communes (`commun.py`) et les polices (`polices.py`). Styles de la barre : `commun/composants.css`. Le bouton montre toutes les langues dont la page existe dans le dossier (FR / EN / DE…). À relancer sur les dossiers des applis après toute modification de l'en-tête, et sur le dossier d'une appli qui reçoit une nouvelle langue. |
| `langs.py` | Langues des applis, utilisé par `lang.py` et `chrome.py` : ordre du bouton, textes de l'en-tête dans chaque langue, langue de repli (anglais). Une nouvelle langue d'appli (it…) s'ajoute ici. |
| `theme.py <dossier>` ou `theme.py --tout` | Bouton de thème clair / sombre (◐) pour Imperium, Aeon's End et Mage Knight (Nemesis et Puerto Rico ont le leur) : bloc `<!--theme-->` en tête (palette de l'autre thème et style du bouton, tirés de `themes/<code>.css`), bouton `#lrmp-theme`, script `#theme-js`. Imperium : automatique → sombre → clair ; Aeon's End et Mage Knight : sombre par défaut ↔ clair. Choix dans `localStorage["<code>-theme"]`. Rejouable ; à relancer après `build_imp.sh`, `build_mk.sh` ou `gen_lang.py`. |
| `pied.py <dossier> "<jeu>"` | Pied de page du site sur toutes les pages d'une appli (retour à l'accueil, « Signaler un problème » vers le formulaire « Votre avis » avec le jeu présélectionné, Ko-fi, mention « création de fan »), dans la langue de chaque page. `<jeu>` = valeur de l'option du formulaire (vérifiée). |
| `fiches.py [<dossier>]` | Rappel des fiches à imprimer dans les applis qui en ont : un encart « À imprimer » en tête de l'aide-mémoire et un rappel « Prêt pour votre première partie ? » à la fin du tutoriel, avec les PDF de la langue de la page. Les fiches sont lues sur l'accueil (cartes de fiches, `accueil.py fiche`) ; l'emplacement des rappels se règle appli par appli dans `CONF`. À relancer après une nouvelle fiche, et après la reconstruction d'une appli (`build.sh` de Puerto Rico et de Nemesis le font ; Mage Knight et Imperium : après `build_mk.sh` / `build_imp.sh`). Une appli sans fiche ne reçoit rien. |
| `pwa.py <préfixe> <page>` | Ajoute le bloc PWA (manifeste, icônes, service worker) et GoatCounter. Préfixe `../` pour une appli. |
| `accueil.py liste\|maj\|appli\|fiche` | Page d'accueil sans toucher au HTML : liste des cartes et de leurs dates, mise à jour de la date d'une appli ou d'une fiche (`maj puerto-rico`), ajout ou remplacement d'une carte d'appli ou d'une fiche à partir d'un petit JSON (modèles dans `accueil/exemples/`). Un nouveau jeu (couleurs, bouton de filtre, recherche, choix dans le formulaire) se déclare dans le même JSON avec `nouveau_jeu`. |
| `seo.py` | Référencement de tout le site en une commande : titre et description par page et par langue, canonical, hreflang, Open Graph et Twitter, données structurées (JSON-LD), `sitemap.xml` refait (dates tirées de git), métadonnées des PDF de `fiches/` (titres pris sur les cartes de l'accueil). Textes des applis dans `jeux.json`, de l'accueil dans `ACCUEIL`. À relancer après un nouveau jeu ou une nouvelle langue (compléter `PAGES`, sinon le script s'arrête), après `gen_lang.py` (la page allemande d'Aeon's End reprend les balises de la page anglaise), après une nouvelle fiche ou un PDF regénéré (les générateurs effacent les métadonnées). |
| `og_images.py` | Images de partage 1200×630 (`img/og/<appli>.jpg`), utilisées par `seo.py`. Une entrée « og » par appli dans `jeux.json`. Polices : `commun/polices`. |
| `home_lang.py` | Langues de la page d'accueil, à partir de `accueil/<code>.json`. Relancé automatiquement par `accueil.py`. `home_lang.py --todo de` liste les textes encore sans traduction. |
| `lang.py <dossier>` ou `lang.py --site` | Redirection de langue et sauvegardes séparées, pour toutes les pages d'une appli (ou de toutes les applis). Les langues d'une appli se déduisent des fichiers : `index.html` (fr), `en.html`, `de.html`… La langue choisie sur le site (`site-lang`) ouvre la page de cette langue, ou `en.html` si l'appli n'est pas traduite ; sans choix enregistré, un navigateur en allemand est envoyé sur `de.html` s'il existe. Chaque langue autre que le français a ses propres sauvegardes (préfixe `en:`, `de:`…). `?lang=xx` dans l'adresse empêche la redirection. |
| `i18n.py extract\|apply` | Extraction des textes d'une page et application d'une table de traduction (bas niveau). |
| `traduire.py todo\|apply <source.html> <table.json> [sortie.html]` | Traduction d'une appli d'une page à partir de sa version anglaise : table « texte anglais → traduction », `_patches` (remplacements de code faits avant, pour l'ordre des mots, les pluriels et les phrases assemblées par morceaux), `_garder` (textes laissés tels quels, ex. noms propres), `--sauter DEBUT FIN` (zone non traduite, ex. un bloc de données reconstruit à part). `todo` liste les textes encore sans traduction ; les patches qui ne trouvent plus leur code sont signalés. Ne jamais traduire par la table un mot qui sert aussi de valeur dans le code (« Gem », « loss »…) : passer par un patch. |
| `sie.py scan\|convert` | Allemand : repère ce qui tutoie encore (du, dir, dein…, impératifs) et convertit au vouvoiement (Sie) les tournures des textes de cartes. |
| `pdf_footer.py <source.pdf> <sortie.pdf>` | Ajoute le pied de page « Less Rules, More Play · paulmoussard.com » à un PDF existant (à partir d’un PDF sans pied de page). |
| `vouvoiement.py scan\|apply <fichiers>` | Consigne du site : on vouvoie le lecteur. `scan` liste ce qui reste au tutoiement (tu, ton, ta, tes, toi, te, -tu) et les verbes après « puis / et » à vérifier ; `apply` convertit sur place les formes reconnues (table de conjugaison, impératifs connus) et affiche chaque phrase modifiée. Relire la sortie : les impératifs qui sont aussi des noms (« Défausse », « Pioche Nation ») et les verbes coordonnés à la 3e personne restent à vérifier à la main. Si le texte français d'une appli change, penser aux tables de traduction (`puerto-rico/en/pairs_*.py`, `traduction/imp-map.json`), dont les clés sont les phrases françaises. |
| `test_clics.py` | Test de clics au hasard (Playwright), serveur local `python3 -m http.server 8766` lancé depuis la racine du dépôt. |

## `traduction/` : versions anglaises

- Mage Knight et Imperium : `build_mk.sh` et `build_imp.sh` reconstruisent `en.html` depuis la page française (`*-N.tsv` = traductions par numéro de texte, `*-words.json` = mots isolés, `merge.py` assemble).
- Aeon's End : `ae_map.py` a servi à la première version anglaise. Depuis l'ajout de toutes les boîtes, les deux pages d'Aeon's End se modifient en parallèle (voir ci-dessous) plutôt que d'être regénérées.

## `aeons-end/` : données de toutes les boîtes

- `aer.json` : cartes, mages et némésis de toutes les boîtes, en anglais, français et allemand, extraits de [aeons-end-randomizer](https://github.com/on3iro/aeons-end-randomizer) (© 2019 Theo Salzmann, licence MIT) avec `extract.js` (lecture des fichiers TypeScript, sans les exécuter ; `AER_LANGS=ENG,FR,DE node extract.js <aer-data/src> aer.json`, le randomizer a aussi PL).
- `common.py` : liste des boîtes (clé, nom FR, nom EN, vague, Legacy), nettoyage des textes.
- `fr1.tsv` … `fr4.tsv` : traductions françaises maison des cartes absentes de la VF (`id`, nom, effet ; `|` = retour à la ligne, `~` = OU).
- `gen.py` : construit les blocs de données FR et EN en gardant les cartes, profils et noms déjà présents dans les pages.
- `patch.py` : a appliqué ces blocs et les changements de code aux deux pages (à adapter avant de le relancer : les motifs qu'il cherche ont changé).
- `verify.py index.html|en.html|de.html` (nom de fichier seul) : vérifie que chaque boîte contient exactement les bonnes cartes, mages et némésis.
- Mises en place officielles du marché (cartes « Mise en place du marché » 1 à 6) : `SETUPS` dans les pages (`<4` moins de 4, `>5` plus de 5, `=4` exactement 4, `4/5` 4 ou 5, `*` au choix). Elles apparaissent comme options de répartition ; chaque pile reçoit sa contrainte de coût (pastille « Coût… »), que les trois modes et le bouton Changer respectent. Sans carte au bon coût dans les boîtes cochées, la pile est tirée sans contrainte et le marché le signale.

### Autres langues de l'appli (allemand…)

`index.html` (FR) et `en.html` (EN) se modifient à la main, en parallèle. Les autres langues se **génèrent** depuis `en.html` :

- `langues/<code>/cartes.tsv` : une ligne par carte (id, nom anglais pour repère, nom traduit, effet traduit ; nom vide = nom anglais gardé).
- `langues/<code>/textes.json` : table de l'interface pour `traduire.py` (textes, noms officiels des boîtes, némésis et mages, descriptions, `_patches`, `_garder`). `_anglais` note les noms gardés en anglais et pourquoi.
- `python3 outils/aeons-end/gen_lang.py de` écrit `aeons-end/de.html`, puis relance `lang.py` et `chrome.py` sur le dossier ; `--todo` liste seulement ce qui manque. **À relancer après chaque modification de `en.html`** : il signale les textes nouveaux et les patches devenus introuvables.
- Nouvelle langue : `python3 outils/aeons-end/brouillon_lang.py <DE|PL…> <code> > langues/<code>/cartes.tsv` donne un premier jet avec les noms et effets officiels du jeu de données (sinon « TODO: » + anglais) ; copier `langues/de/textes.json` et le traduire ; ajouter la langue dans `outils/site/langs.py` et dans l'accueil (`_apps` de `accueil/<code>.json`).
- Allemand : noms et effets de l'édition Frosted Games (jeu de données du randomizer, effets mis au vouvoiement avec `sie.py`) ; cartes des boîtes non publiées en allemand : nom anglais (c'est ce qui est imprimé sur la carte) et effet traduit, avec les mots-clés anglais entre parenthèses (Conjure, Develop, Recall…). L'analyse de photo demande de lire l'édition allemande.

## `puerto-rico/` : appli Puerto Rico 1897

**Format commun du site** (depuis le 26/11/2026, pages identiques à l'octet près à l'ancienne chaîne) : `page.html` (styles, structure, rendu, aide-mémoire, décompte ; `{{clé}}` = texte d'interface), `i18n/fr.json` et `i18n/en.json` (textes d'interface), `contenu/<langue>/` : `donnees.js` (bâtiments), `chapitres.js` (tutoriel), `ateliers.js` et `navires.js` (ateliers). Construction : `python3 outils/site/assembler.py puerto-rico` (ou `sh outils/puerto-rico/build.sh`), puis `seo.py`. Version anglaise rédigée d'après le livret anglais (qui diffère du français sur le chargement des navires et l'Hôpital avec l'Hacienda) ; les morceaux FR et EN se tiennent en parallèle. Fiches anglaises : `fiches/gen_en.py`.

Fiches A5 : `outils/puerto-rico/fiches/gen.py` (lit `b.json`, la liste des bâtiments extraite de `contenu/fr/donnees.js`) produit `puerto-rico-aide-de-jeu.pdf` et `puerto-rico-batiments.pdf`, à copier dans `fiches/`.

## `nemesis/` : appli Nemesis: Retaliation

**Format commun du site** (depuis le 26/11/2026, pages identiques à l'octet près à l'ancienne chaîne) :
- `page.html` : styles, structure et code, communs aux langues ; `{{clé}}` = texte d'interface, `<!--CONTENU:nom-->` = morceau de contenu.
- `i18n/fr.json`, `i18n/en.json` : textes d'interface (mêmes clés ; titre, onglets, sommaire, quiz, onglet Salles, pied, clés de sauvegarde).
- `contenu/<langue>/` : `salles.js` (les 25 salles), `chapitres.js` (25 chapitres), `ateliers.js` (sac Intrus, jet de bruit, tir et mêlée, rafale, éclosion), `schemas.js` (écrit par `figures.py`), `aide.js` (aide-mémoire).
- Construction : `python3 outils/site/assembler.py nemesis` (ou `sh outils/nemesis/build.sh`), puis `seo.py`. Une nouvelle langue = `i18n/<code>.json` + `contenu/<code>/` (un morceau absent reprend l'anglais).

- Source : livret de règles français et aide de jeu Salles (relevée sur photo, voir `salles.md`). Les faces des dés sont choisies par le lecteur : l'appli ne simule que les règles, pas les probabilités des dés (inconnues).
- Anglais : chapitres rédigés avec les termes du livret VO (Drone, Hazard, Lander, Life Support, Data token, Healthy / Injured / Heavily Injured, Nightmare Rule…) ; noms des salles aléatoires traduits par nous, faute d'aide de jeu VO. Les morceaux FR et EN se tiennent en parallèle.
- Carte de l'accueil : `carte.json` (`accueil.py appli outils/nemesis/carte.json`).

## `imperium-fiches/` : fiches A5 Imperium Antique (FR et EN)

Les 4 pages viennent de l'artefact Design « Aide de jeu Imperium Antique » (`A5Tour`, `A5Deck` : aide de jeu ; `A5MotsCles1`, `A5MotsCles2` : mots-clés), copiées telles quelles dans `fr/`. `python3 outils/imperium-fiches/pdf.py` imprime `fiches/imperium-aide-de-jeu.pdf` et `fiches/imperium-mots-cles.pdf` (A5, 2 pages chacun). Après une modification dans l'artefact : recopier les pages dans `fr/`, relancer, puis `accueil.py fiche` avec `fiche-aide-de-jeu.json` ou `fiche-mots-cles.json` (dans ce dossier) pour dater la mise à jour sur l'accueil. Anglais : `python3 outils/imperium-fiches/en.py` écrit `en/` (aide de jeu par la table `PAIRES`, phrase française → anglaise ; mots-clés reconstruits depuis `MOTS`, triés en anglais) et signale toute phrase française sans traduction ; `pdf.py` imprime alors aussi `imperium-game-aid.pdf` et `imperium-keywords.pdf`. Polices : `npm install @fontsource/marcellus @fontsource/source-sans-3` dans `outils/imperium-fiches/`.

## `mage-knight/precisions.py` : précisions du compendium dans le tutoriel Mage Knight

`python3 outils/mage-knight/precisions.py` pose dans `mage-knight/index.html` et `en.html` un bloc `/*precisions*/…/*/precisions*/` juste après `const TP=…` : au plus un encadré « À ne pas oublier » par chapitre (erreurs fréquentes), un bloc « Précisions (n) » fermé par défaut en fin de chapitre, et le chapitre facultatif « Cas épineux » (quiz renvoyant chacun à un chapitre), ajouté à la fin de `PARTS` dans une partie « Pour aller plus loin » pour ne pas décaler les progrès enregistrés (`mk-course`). Il ajoute aussi `${precis(T)}` au gabarit de `renderCourse`. En HTML statique, il remplace la présentation du tutoriel par le titre et deux lignes de sources (`<!--sources-->`), que la page place en tête de la colonne des chapitres comme dans Nemesis (`NAVHEAD`, colonne de 280 px) et, dans la mention en bas du tutoriel, le remerciement à BillNC (`<!--merci-->`, liens vers son profil et vers le Compendium). Le contenu FR et EN est dans le script (tables `CH` et `EPINEUX`), d'après le *Compendium of Q&A* de BoardGameGeek (23 août 2026). Rejouable ; **à relancer après `build_mk.sh`**, puis `seo.py`.

## `mage-knight-fiches/aide/` : aide de jeu Mage Knight en français

Les 8 pages viennent de l'artefact Design « Aide de jeu Mage Knight » (page « Fiches A5 » : A5Combat, A5Combat2, A5Sites, A5Sites2, A5Legion, A5Capacites, A5Tour, A5Deplacement), copiées dans `aide/fr/` (`1-combat.html` … `8-deplacement.html`) et remises au gabarit commun (bleu `#52789d`, Source Sans 3). Les illustrations (`/_blob/<id>` dans l'artefact) sont dans `aide/img/<id>.png`. `python3 outils/mage-knight-fiches/aide/aide.py` imprime `fiches/mage-knight-aide-de-jeu.pdf` avec le pied de page du gabarit ; relancer `seo.py` ensuite.

## `mage-knight-fiches/` : aide de jeu Mage Knight en anglais

`aide/en.py` construit la version anglaise de l'aide de jeu à partir des pages françaises (`aide/fr/`), traduites bloc par bloc avec `aide/en.json` : même mise en page, mêmes images, même taille de texte → `fiches/mage-knight-game-aid.pdf`. Un bloc français sans traduction arrête le script et est signalé. (`ico/` : anciennes découpes, plus utilisées.)

## `mage-knight-fiches/quetes/` : module de quêtes Mage Knight (FR et EN)

Les 8 pages viennent de l'artefact Design « Aide de jeu Mage Knight » (pages `A5QuetesRegles` … `A5QuetesIIINuit`), copiées telles quelles dans `fr/` (`1-regles.html` … `8-III-nuit.html`). `python3 outils/mage-knight-fiches/quetes/quetes.py` applique les correctifs du français (`CORRECTIFS_FR` : coquilles, pas de mention de BGG), produit l'anglais avec la table `EN` (phrase française → anglaise, page par page ; les pages anglaises sont aussi écrites dans `en/`), imprime les deux PDF A5 avec le pied de page du site : `fiches/mage-knight-module-quetes.pdf` et `fiches/mage-knight-quest-module.pdf`. Après une modification dans l'artefact : recopier les pages dans `fr/`, relancer ; le script signale toute phrase française qui n'a plus de traduction. Polices : `commun/polices`. Pied de page du gabarit posé dans chaque page (`pied()` de `quetes.py`).

Scénarios du module (fiches 11 et 12 de l'artefact : `A5QuetesScenSolo`, `A5QuetesScenSolo2`, `A5QuetesScenCoop`, `A5QuetesScenCoop2`, copiées dans `fr/9-scen-solo.html` … `fr/12-scen-coop-suite.html`) : `python3 outils/mage-knight-fiches/quetes/scenarios.py` imprime `fiches/mage-knight-scenarios-quetes.pdf` et `fiches/mage-knight-quest-scenarios.pdf` (table `EN` commune aux 4 pages, alignée sur les scénarios de l'appli anglaise). Carte de l'accueil : `accueil.py fiche outils/mage-knight-fiches/quetes/fiche-scenarios.json`. Relancer `seo.py` ensuite.

## Langues du site

- Page d'accueil : français et anglais sont écrits dans `index.html` ; les autres langues (allemand…) viennent de `outils/site/accueil/<code>.json`, où chaque clé est un texte anglais de la page et chaque valeur sa traduction. Les blocs `_words` (interface), `_form` (formulaire), `_soon` (bandeau sous le titre) et `_k` (bouton « Télécharger (EN) ») complètent le fichier.
- Ajouter une langue : copier `de.json` en `it.json`, changer `_name` et `_locale`, traduire les valeurs, puis `python3 outils/site/home_lang.py`. Les textes oubliés restent en anglais et sont listés.
- `_apps` dit, appli par appli, dans quelle langue les visiteurs de cette langue ouvrent les applis : `{"*": "en", "ae": "de"}` = Aeon's End (`data-game="ae"`) en allemand, le reste en anglais. Sur la carte d'une appli qui s'ouvre en anglais, le bouton affiche `_k.open_en` (« Öffnen (EN) ») ; les fiches gardent « Herunterladen (EN) » tant qu'il n'y a pas de PDF dans la langue. La carte indique ses langues (`langues` dans le JSON de `accueil.py`, ex. « FR · EN · DE »).
- Traduire une appli dans une nouvelle langue : écrire `<dossier>/<code>.html` (pour Aeon's End : `gen_lang.py`, ci-dessus ; pour une autre appli : `traduire.py` sur `en.html` avec une table), puis `lang.py <dossier>` et `chrome.py <dossier>` (le bouton et la redirection de toutes les pages de l'appli prennent la nouvelle langue), mettre `"<jeu>": "<code>"` dans `_apps` et lancer `home_lang.py`, lancer `seo.py` (sitemap et cache hors ligne suivent tout seuls). Vérifier le vouvoiement (`vouvoiement.py`, `sie.py`).
