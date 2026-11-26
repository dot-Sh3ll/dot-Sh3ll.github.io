# CLAUDE.md : site Less Rules, More Play (lessrulesmoreplay.com)

Aides de jeu gratuites pour jeux de société experts : tutoriels interactifs, compagnons solo, fiches PDF à imprimer.
Site statique servi par GitHub Pages (branche `main`, domaine `lessrulesmoreplay.com` dans `CNAME`, DNS chez OVH).
Ancien domaine `paulmoussard.com` (changement d'adresse fait dans Search Console le 26/11/2026) (enregistré chez OVH, DNS chez Cloudflare depuis le 26/11/2026, DNSSEC coupé) : règle Cloudflare
« Single Redirect » 301 `http*://*paulmoussard.com/*` → `https://lessrulesmoreplay.com/${3}`, chaîne de requête conservée ; à garder au moins jusqu'en 2028. Auteur : **Paul Moussard**.
Ce fichier suffit pour travailler sur le site ; `outils/README.md` détaille chaque script.

## Règles de travail (à respecter sans exception)

- **Parler à Paul en français.**
- **Vouvoyer le lecteur partout**, dans toutes les langues : « vous », « Sie ». Jamais de tutoiement, y compris
  dans les textes d'interface écrits dans le code (« Essayez une autre réponse », pas « Essaie »).
  Vérifier : `python3 outils/site/vouvoiement.py scan <fichiers>` (français), `python3 outils/site/sie.py scan <fichiers>` (allemand) ;
  le scan ne voit pas tout : relire les impératifs qui ressemblent à des noms (« Défausse », « Pioche »).
- **Ne pas changer le contenu pédagogique** (règles, explications) sauf erreur manifeste, à signaler à Paul.
- **Aucune URL publique ne doit casser** (Search Console, liens partagés sur Discord). Une URL qui change :
  redirection + sitemap, et demander à Paul avant. Ne jamais supprimer `googleaae1513be976b5cd.html`.
- **Pousser directement sur `main`, sans demander.** Avant : `git fetch && git pull --rebase` (Paul édite parfois `main`).
  Après : suivre la publication et dire à Paul quand c'est en ligne :
  `gh api "repos/dot-Sh3ll/dot-sh3ll.github.io/actions/runs?per_page=4" --jq '.workflow_runs[] | [.name, .head_sha[0:7], .status, .conclusion] | @tsv'`
  (attendre « pages build and deployment … completed success » sur le dernier commit ; « Vérifier le site » doit aussi passer).
- Push refusé (403, « not in this session's authorized repository set ») : ajouter le dépôt à la session avec l'accès
  en écriture, mettre le remote en minuscules (`git remote set-url origin https://github.com/dot-Sh3ll/dot-sh3ll.github.io`),
  réessayer. Le message « This repository moved » qui suit est sans conséquence.
- Décision irréversible ou ambiguë (supprimer une page, changer une URL, changer l'identité visuelle) : demander à Paul.
- **Avant chaque push : `python3 outils/verifier.py`** (0 erreur attendue).

## Architecture

```
index.html            accueil, page SOURCE (FR + EN écrits à la main) : on ne modifie que celle-ci
en/                   accueil anglais GÉNÉRÉ depuis index.html par seo.py (ne pas modifier) ; de/ : redirection vers /en/
<appli>/index.html    appli en français ; <appli>/en.html, <appli>/de.html : autres langues (même dossier = même jeu)
commun/               socle partagé : tokens.css (jetons), composants.css (barre du site, onglets, pied, encart fiches),
                      polices.css + polices/ (woff2 hébergés, plus de Google Fonts)
fiches/               PDF à imprimer (nom sans espaces ni accents ; version anglaise à part)
img/og/               images de partage 1200×630 (og_images.py) ; icons/ : icônes PWA
sw.js, manifest.webmanifest   PWA ; liste du cache et version écrites par outils/site/sw.py
sitemap.xml, robots.txt, 404.html
outils/               scripts (non publiés, exclus par _config.yml)
.github/workflows/verifier.yml   lance outils/verifier.py à chaque push
```

Applis (registre : `outils/site/jeux.json`) :

| Dossier | Code | Couleur (`--jeu-*`) | Police de titre | Langues | Comment la page est produite |
|---|---|---|---|---|---|
| `mage-knight` | mk | `#7db7ef` bleu | Marcellus | FR EN | **format commun** : `outils/mage-knight/` + `build.sh` (assembleur, schémas, thème, précisions) |
| `imperium` | imp | `#ec7f6d` corail | Cinzel / Marcellus | FR EN | **format commun** : `outils/imperium/` + `build.sh` (assembleur, schémas, thème) |
| `aeons-end` | ae | `#c495f5` violet | Marcellus | FR EN DE | **format commun** : `outils/aeons-end/` + `build.sh` ; FR et EN à la main, DE produit depuis l'anglais par `gen_lang.py` (tables `langues/de/`) |
| `puerto-rico` | pr | `#e2cc9f` sable | Fraunces | FR EN | **format commun** : `outils/puerto-rico/` + `assembler.py puerto-rico` |
| `nemesis` | nr | `#9bd33a` vert acide | Rajdhani | FR EN | **format commun** : `outils/nemesis/` (`page.html`, `i18n/`, `contenu/<langue>/`) + `assembler.py nemesis` |

Chaque jeu garde **sa police de titre et son thème** (clair ou sombre). L'expérience est commune : même barre du site,
mêmes onglets principaux (`.lrmp-onglets`, couleur de l'appli via `--app-accent`, `--app-accent-ink`, `--app-piste`,
`--app-onglet`), même pied de page, même encart « À imprimer », mêmes jetons (`commun/tokens.css`).

### Identité visuelle (26/11/2026, choix de Paul)

- **Logo** : `img/logo/logo.svg` (carré jaune « Less Rules, More Play ») et `img/logo/icone.svg` (monogramme « mp ») ; icônes PWA et favicon
  (`icons/`) tirées de `icone.svg`. Jaune du logo `#ffbe04` = `--site-gold` (`commun/tokens.css`) et `--gold` de l'accueil.
- **Barre du haut** (accueil : `index.html` ; applis : `chrome.py` + `commun/composants.css`, même dessin) : logo complet à gauche (62 px, barre 80 px) ;
  sur téléphone (≤ 640 px) icône « mp » + « Less Rules, More Play » sur deux lignes en Fraunces (masqué ≤ 360 px). À droite : FR · EN soulignés en jaune,
  trait de 2 px, « Offrir un café » + tasse SVG à droite (tasse seule sur téléphone, `TASSE` dans `chrome.py`). `--sitehead-h` : 81 px, 65 px sur téléphone.
- **Polices hors applis** : titres en Fraunces 600 (italique dans `commun/polices/fraunces-italic-*`), texte Figtree. Les applis gardent leurs polices et thèmes.
- **Accueil** : titre « Apprenez le jeu *en jouant*. » ; atouts sans émojis séparés par « · » (liste à puces sur téléphone) : Tutoriels interactifs · Automas pour
  joueur solo · Compagnons de partie · Fiches à imprimer ; recherche + menu « Tous les jeux » (`<select id="jeu">`, remplace les boutons par jeu ; `?jeu=` marche
  toujours ; `accueil.py` y ajoute les nouveaux jeux) ; cartes d'applis sur fond sombre, bordure et lueur intérieure de la couleur du jeu, halo et petits points
  en dégradé depuis le bas ; fiches au même style, halo depuis la droite (depuis le bas sur téléphone), bouton « ⬇ PDF », nombre de pages à la ligne (`<br>`).
- Maquettes : artefact Design « Less Rules, More Play · maquette du nouveau logo » (https://claude.ai/artifact/6kzgCKHjFaG5YpiGCrQ2SZ), propositions de cartes A à F.

### Blocs générés dans les pages (ne pas les écrire à la main)

| Bloc | Posé par | Contenu |
|---|---|---|
| `<script id="site-lang-js">` en tête | `outils/site/lang.py` | redirection de langue, sauvegardes séparées par langue |
| `<!--seo-->…<!--/seo-->` | `outils/site/seo.py` | description, canonical, hreflang + x-default, Open Graph, Twitter, JSON-LD |
| `<!--polices:…-->…<!--/polices-->` | `outils/site/polices.py` (via chrome.py) | lien vers `commun/polices.css` + préchargements |
| `<!--commun-->…<!--/commun-->` | `outils/site/commun.py` (via chrome.py) | `tokens.css` et `composants.css` avec `?v=<empreinte>` |
| `<header class="sitehead">` | `outils/site/chrome.py` | barre du site : dé, nom, langues, Ko-fi |
| `<!--pwa-->…<!--/pwa-->` | `outils/site/pwa.py` | manifest, icônes, service worker, **GoatCounter** (code `shell`) |
| `<footer class="lrmp-pied">` | `outils/site/pied.py` | retour, « Signaler un problème » (formulaire avec le jeu choisi), Ko-fi, mention fan |
| `<!--fiches-->…<!--/fiches-->` | `outils/site/fiches.py` | encart « À imprimer » de l'aide-mémoire, rappel en fin de tutoriel |
| `/*precisions*/…/*/precisions*/` (script de Mage Knight) | `outils/mage-knight/precisions.py` | encadré « À ne pas oublier », bloc replié « Précisions (n) » par chapitre, chapitre facultatif « Cas épineux » (partie « Pour aller plus loin », après le Glossaire) |
| `<!--schemas-->…<!--/schemas-->` | `outils/site/schemas.py` | schémas SVG des tutoriels Mage Knight, Imperium, Puerto Rico, insérés sous les règles du chapitre |
| `<!--PARTAGE:fichier-->` (dans `page.html`) | `outils/site/assembler.py` | morceau commun lu dans `outils/site/partage/` : `expliquer.js` (moteur du mode « Expliquer le jeu ») et `expliquer.css` |
| `<!--theme-->…<!--/theme-->`, `#lrmp-theme`, `#theme-js` | `outils/site/theme.py` | bouton de thème clair / sombre d'Imperium, Aeon's End et Mage Knight (palettes : `outils/site/themes/<code>.css`) |

## Mode « Expliquer le jeu » (onglet après « Apprendre », dans toutes les applis sauf Aeon's End)

- Un fil rouge pour la personne qui explique le jeu à la table : une dizaine d'écrans, puis le résumé du tour,
  puis « Pour plus tard ». Boutons (choix de Paul) : Précédent, Suivant (jusqu'au dernier écran, sans retour au début), Plein écran ; rien d'autre. Flèches ← → du clavier, signalées par une petite astuce à droite des boutons (masquée sur tactile et téléphone). Moteur commun : `outils/site/partage/expliquer.js` + `expliquer.css` (insérés par `<!--PARTAGE:…-->`).
- Contenu : `outils/<appli>/contenu/<langue>/expliquer.js` (`const EXPL={ui, ecrans:[{t, dire, html, piege, pl}], aide, plus}`).
  `dire` = phrase en italique entre guillemets sous le titre (le récit de Paul) ; `piege` = encadré, titré `pl`
  (« Attention », « Petit rappel »…). Mises en page : `big1`, `duo`, `trio`, `quad`, `flow`, `ol.steps` (`ol.steps etiq` +
  `data-l="Phase 1"` pour des étiquettes), `ex-cadre` + `h4` (cadre titré), `tags`.
- **Seules sources : le tutoriel et l'aide-mémoire de l'appli.** Ton voulu par Paul : informel, un peu de récit, des révélations
  (« Chose que je ne vous ai pas encore dite… »). Paul relit écran par écran sur captures avant toute mise en ligne.
- Captures et relecture : `python3 outils/site/expliquer.py <dossier>` (voir Commandes).
- État (26/11/2026, soir) : **Nemesis validé et en ligne (FR, EN)**, corrections de Paul du 26/11 au soir comprises (écrans 1, 2, 4, 5, 6, 8, 10 ; durée estimée ; « Pour plus tard » en entier en plein écran). Mage Knight, Puerto Rico, Imperium : `EXPL.chantier` affiche
  « Section en chantier » ; les brouillons sont dans leurs `expliquer.js` (Mage Knight et Puerto Rico : FR seulement, l'`en`
  est une copie du français à traduire ; Imperium : ses anciens écrans, sans `dire`). Brouillons relus dans le doc
  « Expliquer le jeu · écrans à relire » (https://claude.ai/artifact/9Q1c8epAcy8n7Ut9qMpj6S). Retirer `EXPL.chantier` une fois validé.
- Ordre des onglets partout : Apprendre · Expliquer le jeu · … · Aide-mémoire en dernier ; dans Mage Knight : Apprendre · S'entraîner · Expliquer le jeu · Compagnon de partie · Aide-mémoire. Imperium : le compagnon « À plusieurs »
  (feuille de score, Effondrement) a été supprimé ; `#plusieurs` ouvre « Expliquer le jeu ». Mage Knight : « Partie libre » s'appelle « S'entraîner ».

### Ton et rhétorique d'« Expliquer le jeu » (tirés de Nemesis, validé par Paul ; à appliquer dès le premier brouillon)

- **Deux voix.** `dire` = ce que la personne dit à la table, à l'oral : le récit, les images, l'humour. L'écran (`html`) ne garde que les
  mots-clés : cartes `h3` + une phrase courte, une phrase `big1` (« Ce qu'il faut retenir : … ») au plus. Ne pas répéter le récit à l'écran.
- **Oral et complice**, vouvoiement de la tablée : phrases courtes, « Eh oui, vous vous attendiez à quoi ? », « La petite chose coquine : … »,
  « tout un tas de choses pas cool pour l'équipe », « rassurez-vous ». Un peu d'humour, jamais de second degré qui brouille la règle.
- **Suspense et révélations** : points de suspension avant la chute (« plusieurs gagnants… ou aucun », « … où il n'y a qu'une seule place ») ;
  révélation tardive (« Chose que je ne vous ai pas encore dite : … ») ; rappel d'une promesse faite plus tôt (« Vous vous souvenez, je vous
  avais dit que… Eh bien, … »). Semer tôt une récompense ou une menace, la payer plus loin.
- **Différer sans culpabiliser** : « je vous expliquerai ça pendant la partie », « le moment venu ». Tout ce qui est différé va dans `plus`
  (`[quoi, quand]`, le « quand » étant le déclencheur en jeu : « À sa première apparition », « Au premier doute »).
- **Encadrés** (`piege` + `pl`, ou `<div class="ex-piege"><b>Titre</b><p>…</p></div>` dans `html` pour un 2e encadré) : titres courts et parlés,
  « Attention », « Petit rappel », « Petit piège à signaler », ou une question (« Besoin de cartes en plus ? »). Un piège = une erreur que les
  joueurs font vraiment.
- **Précision des mots** (corrections de Paul) : verbes exacts (« vous vous déplacez d'une salle à une autre », pas « vous changez de salle ») ;
  noms du matériel avec la majuscule de l'appli (cartes Action, jeton Munitions) et les quantités exactes (« une moitié de jeton Munitions ») ;
  dire d'où vient une chose (« une mission tirée au hasard, visible de tous ») ; nuancer les conditions (« si tout le monde n'est pas déjà parti,
  en hibernation ou mort »).
- **Fil des 10 écrans** (modèle Nemesis) : le jeu en une phrase et comment on gagne → mission / objectifs → anatomie du plateau → la manche →
  votre tour → se déplacer → les ennemis → se battre → le retournement (révélation) → sortir / fin de partie. Adapter à chaque jeu, garder
  l'ordre « but → matériel → rythme → tour → menaces → fin ».
- Ligne de durée sous l'introduction (`ex_duree` dans `i18n/<langue>.json` + `<p class="lrmp-ex-duree">` dans `page.html`, Nemesis seulement
  pour l'instant : « Durée estimée de l'explication : environ 8 minutes ») : à proposer pour chaque jeu une fois validé, avec la durée donnée par Paul.

## Langues

- Langues du site : `fr`, `en`, `de` (`outils/site/langs.py`, `ORDER`). L'espagnol a été retiré.
- Une appli sans page dans la langue du visiteur s'ouvre en **anglais** (`FALLBACK`).
- Choix mémorisé dans `localStorage["site-lang"]` (bouton de langue de la barre, accueil). Sans choix, la langue du
  navigateur décide ; les robots ne sont jamais redirigés. `?lang=xx` dans l'adresse bloque la redirection.
- Accueil : `/` et `/en/` sont de vraies pages ; `/?lang=en` redirige vers `/en/` (anciens liens). **L'allemand n'est proposé que
  dans Aeon's End** : `/de/` est une page de redirection vers `/en/` (`REDIRIGE` dans `seo.py`, ignorée par `verifier.py`) ;
  `home_lang.py` garde `de.json` en réserve (`INACTIFS`). Au chargement, l'accueil n'écrase pas une langue qu'il ne propose pas
  (`site-lang`) : un visiteur germanophone arrive sur `/en/` et ouvre Aeon's End en allemand.
- Textes allemands de l'accueil (en réserve, non affichés) : `outils/site/accueil/de.json` (clé = texte anglais de la page).
- **Format de traduction commun pour les nouvelles applis** (modèle `outils/modele-appli`) : textes d'interface par clés dans
  `i18n/<langue>.json` (mêmes clés partout), contenu dans `contenu/<langue>.js` ; `assembler.py` signale les clés
  manquantes et reprend l'anglais. Une appli en plusieurs morceaux utilise des emplacements nommés `<!--CONTENU:nom-->`
  remplis par `contenu/<langue>/nom.js` ou `nom.html` (toutes les applis). **Toutes les applis sont au format commun** : on modifie `outils/<dossier>/` (gabarit, `i18n/`, `contenu/<langue>/`), jamais les pages, puis `build.sh`.
- État des traductions : `python3 outils/traduire_etat.py`.

## Commandes

Toujours depuis la racine du dépôt.

| But | Commande |
|---|---|
| Vérifier tout le site | `python3 outils/verifier.py` (`--rapide` : sans HTML ni vouvoiement ; html-validate : `npm i -g html-validate`) |
| Référencement, sitemap, accueils /en/ /de/, cache PWA, métadonnées PDF | `python3 outils/site/seo.py` (à relancer après presque tout) |
| Avancement des traductions | `python3 outils/traduire_etat.py` |
| Créer une appli | `python3 outils/nouvelle_appli.py <dossier> <code> "<Nom FR>" "<Nom EN>" <#couleur> <glyphe> [police]` |
| Reconstruire une appli faite sur le modèle | `python3 outils/site/assembler.py <dossier>` puis `seo.py` |
| Reconstruire une appli | `sh outils/<dossier>/build.sh` (assembleur puis, selon l'appli, schémas, thème, précisions, allemand d'Aeon's End) puis `seo.py` |
| Aeon's End allemand | tables `outils/aeons-end/langues/de/`, puis `sh outils/aeons-end/build.sh` et `seo.py` (`gen_lang.py de --todo` : ce qui manque) |
| Barre du site + feuilles communes + polices d'une appli | `python3 outils/site/chrome.py <dossier>` |
| Pied de page | `python3 outils/site/pied.py <dossier> "<option du formulaire>"` |
| Schémas des tutoriels Mage Knight, Imperium, Puerto Rico | `python3 outils/site/schemas.py <dossier>` ou `--tout` (les `build.sh` de Mage Knight, Imperium et Puerto Rico le font) |
| Mage Knight : « À ne pas oublier », « Précisions » et chapitre « Cas épineux » (compendium BGG) | `python3 outils/mage-knight/precisions.py` (contenu FR et EN dans le script ; `outils/mage-knight/build.sh` le lance) |
| Bouton de thème (Imperium, Aeon's End, Mage Knight) | `python3 outils/site/theme.py <dossier>` ou `--tout` (les `build.sh` de ces trois applis le font) |
| Accueil : carte d'appli, de fiche, date de mise à jour | `python3 outils/site/accueil.py appli\|fiche <json>` ; `accueil.py maj <dossier ou pdf>` (badge « Mis à jour ») — ne pas couper sa sortie avec `\| head` |
| « Expliquer le jeu » : captures, planches de 3 écrans, débordements, texte Markdown | `python3 outils/site/expliquer.py <dossier> [--ecrans 1,5,aide,plus] [--fr\|--en] [--theme clair\|sombre]` (sortie `/tmp/lrmp-expliquer/<dossier>/`, voir `rapport.md`) |
| Images de partage | `python3 outils/site/og_images.py` (Playwright) |
| Test au navigateur | Playwright, Chrome `/usr/bin/google-chrome` (`--no-sandbox`) ; `python3 -m http.server 8766` à la racine |

Aucun script n'utilise de chemin fixe : tout se lance depuis la racine du dépôt.

## Procédures

### Ajouter un jeu
1. `python3 outils/nouvelle_appli.py pax-pamir pp "Pax Pamir" "Pax Pamir" "#d9a54a" "🐫"` : crée les sources
   (`outils/pax-pamir/`), l'entrée de `jeux.json`, le jeton `--jeu-pp`, la carte, le filtre et l'option du formulaire de
   l'accueil, les pages FR et EN, l'image de partage, le SEO, le sitemap et le cache.
2. Écrire le tutoriel et l'aide-mémoire dans `outils/pax-pamir/contenu/fr.js` et `en.js` (vouvoiement), enrichir
   `page.html` si l'appli a besoin d'ateliers, puis `python3 outils/site/assembler.py pax-pamir`.
3. Relire la carte (`outils/pax-pamir/carte.json` puis `accueil.py appli`) et les titres de `jeux.json` (titre ≤ 60 car.,
   description ≤ 160).
4. Citer le jeu dans l'introduction et la mention légale de l'accueil : `index.html` (FR et EN), `outils/site/accueil/de.json`,
   `ACCUEIL` dans `outils/site/seo.py`.
5. `python3 outils/site/seo.py`, `python3 outils/verifier.py`, commit, push, suivre la publication.

### Ajouter une langue (ex. italien)
1. `outils/site/langs.py` : ajouter le code à `ORDER` et ses libellés à `LABELS` ; `pied.py` : ses textes dans `T`.
2. Accueil : copier `outils/site/accueil/de.json` en `it.json`, traduire, `python3 outils/site/home_lang.py` ;
   `ACCUEIL_LANGS`, `ACCUEIL`, `LOCALE`, `FIL` dans `seo.py`.
3. Applis : `outils/<dossier>/i18n/it.json` + `contenu/it/` (copie de l'anglais à traduire ; un morceau absent reprend
   l'anglais), puis `build.sh` ; Aeon's End : tables `langues/it/` (voir `outils/README.md`), puis `build.sh`.
   Titre et description dans `jeux.json` (`seo.it`).
4. `lang.py --site`, `chrome.py <dossier>` pour chaque appli traduite, `seo.py`, `verifier.py`. Vouvoiement de la langue.

### Faire une fiche
1. La dessiner dans un artefact **Design**, à partir du gabarit (artefact « Gabarit des fiches Less Rules, More Play »,
   sources dans `outils/fiches-gabarit/`) : A5 portrait 559×794 px (paysage 794×559 pour les listes), **fond blanc**,
   marges 26 px en haut, 30 px sur les côtés, titres dans la police de l'appli du jeu, texte Source Sans 3 en 12 px
   minimum, une seule couleur (celle du jeu en version foncée), pied
   « Less Rules, More Play · lessrulesmoreplay.com » **dans la couleur de la fiche**.
2. **Montrer la fiche à Paul dans le Design avant de la mettre sur le site.**
3. Copier les pages dans `outils/<jeu>-fiches/fr/`, produire le PDF avec le script du jeu dans `fiches/`, la version anglaise
   s'il y en a une. Scripts : Puerto Rico `outils/puerto-rico/fiches/gen.py` et `gen_en.py` ; Imperium `outils/imperium-fiches/en.py`
   puis `pdf.py` ; Mage Knight aide de jeu `outils/mage-knight-fiches/aide/aide.py` (FR, images dans `aide/img/`) et
   `aide/en.py` (EN : les pages FR traduites bloc par bloc via `aide/en.json`, même mise en page), module de quêtes `quetes/quetes.py` : un seul PDF de 12 pages, règles (1 à 8) puis scénarios (9 à 12, pages de
   `quetes/scenarios.py`) ; les anciennes adresses des scénarios reçoivent le même PDF.
   Nemesis : `outils/nemesis-fiches/gen_pages.py` (FR) et `gen_pages_en.py` (EN) écrivent les pages, puis `pdf.py`
   (aide de jeu en portrait, salles en paysage ; artefact Design « Fiches Nemesis: Retaliation · gabarit commun »).
   Toutes les fiches actuelles suivent le gabarit (relookées le 25/11/2026).
4. `python3 outils/site/accueil.py fiche <json>` (modèle : `outils/site/accueil/exemples/exemple-fiche.json`),
   puis `seo.py` (les générateurs de PDF effacent les métadonnées : auteur « Paul Moussard »),
   puis `python3 outils/site/fiches.py` (la fiche apparaît dans l'appli du jeu).

## Points d'attention

- **GoatCounter** (statistiques, code `shell`) : posé par `pwa.py` ; `verifier.py` signale une page sans lui.
- **Formulaire « Votre avis »** (Google Forms, dans `index.html`) : chaque jeu y a une option (`formulaire` dans `jeux.json`) ;
  `pied.py` refuse un jeu absent du formulaire. Le service worker ne met jamais en cache `docs.google.com`.
- **Ko-fi** : `https://ko-fi.com/paulmoussard` (barre du site, pied, accueil).
- **Service worker** : réseau d'abord pour les pages, cache d'abord pour le reste ; `VERSION` = empreinte du contenu,
  recalculée par `seo.py` → `sw.py`. Ne pas l'écrire à la main.
- **Feuilles communes** : un changement de `commun/*.css` doit être suivi de `chrome.py` sur chaque dossier d'appli
  (nouvelle empreinte `?v=`) et de `seo.py`.
- Les pages `en/` et `de/` de l'accueil et `aeons-end/de.html` sont générées : toute retouche se fait à la source.
- `localStorage` toujours dans `try/catch` (navigation privée, stockage bloqué).
- Contrastes : AA (4,5:1) pour le texte ; `assembler.py` assombrit la couleur du jeu pour les thèmes clairs.
- Schémas du tutoriel Nemesis : `outils/nemesis/figures.py` écrit `contenu/fr/schemas.js` et `contenu/en/schemas.js`, puis `assembler.py nemesis` ;
  SVG dans la page, couleurs des variables de l'appli (thèmes clair et sombre), légende et texte alternatif dans les deux langues.
- **Thèmes** : chaque appli a un bouton ◐. Nemesis et Puerto Rico : dans leurs sources. Imperium, Aeon's End, Mage Knight :
  `theme.py` ; Imperium suit le système par défaut, Aeon's End et Mage Knight restent sombres par défaut (le clair est une option).
  Une couleur écrite en dur dans ces pages doit avoir sa version claire dans `outils/site/themes/<code>.css`.
- Points ouverts : noms allemands incertains dans Aeon's End (attendre la communauté) ; noms anglais des salles
  aléatoires de Nemesis (traductions maison sauf Shelter et Technical Corridor Entrance).

## Décisions de Paul

- **Précisions de règles (FAQ, compendium, errata), dans toutes les applis** : encadrés titrés simplement « Précisions » (« Clarifications »), jamais « officielles », sans nom de source, de version ni de date dans les encadrés ni dans le texte (pas de « (FAQ officielle) »). La source n'est citée qu'à deux endroits : deux lignes sous « Apprendre les règles » en tête de la colonne des chapitres (« D'après le livret de règles » / « Avec les précisions de … ») et un remerciement avec liens dans la mention en bas de page (Nemesis : Bernaar ; Mage Knight : BillNC). Pas de pitch sous le titre.
- **Versions de règles suivies** (vérifiées le 26/11/2026, aucune règle du tutoriel ne contredit un erratum) :
  Mage Knight = livret de l'édition Ultimate (Intrafin) + Q&A Compendium de BillNC (août 2026, dernière version) ;
  Nemesis = livret VF + FAQ officielle v1.2 (+ précisions de la FAQ VF v1.1 d'avril 2026, Antoine Prono, remercié dans le pied) + recensement de Bernaar (à jour) ;
  Puerto Rico 1897 = livret de l'édition corrigée de 2023 ; Imperium = livret Horizons VF du 19 juillet 2026 (contient les errata
  d'Antique) ; Aeon's End = pas de partie « Apprendre », le mode Expédition suit Une Ère Nouvelle (pied de page).
  À revoir si un éditeur publie une nouvelle FAQ ou un nouveau livret.
- **Agricola : projet abandonné.**
- **Allemand : seul Aeon's End est traduit**, jusqu'à nouvel ordre ; ne pas traduire d'autre appli en allemand.

## À faire (par ordre d'intérêt)

1. **Schémas** : faits et validés par Paul, en FR et EN (Nemesis 11, Mage Knight 6, Imperium 4, Puerto Rico 2 ; les 9 derniers
   ajoutés le 26/11 : mana, tour, Niveaux ; Marché, zones des cartes, fin de partie ; actions, phase Intrus ; Carrières).
   Écartés par Paul : « plusieurs ennemis » de Mage Knight (`mk_groupe` reste dans schemas.py, non utilisé). Piste : versions interactives.

2. **« Expliquer le jeu »** : Nemesis fait. Suite, un jeu à la fois avec Paul, écran par écran (voir la section dédiée et le ton) :
   Mage Knight (Mission de Reconnaissance), Puerto Rico, Imperium. Aeon's End : pas concerné. Les brouillons existants ont été écrits
   avant les directives de ton : les reprendre avec elles avant de les montrer à Paul.
3. **Outil de conception d'« Expliquer le jeu »** : fait (`outils/site/expliquer.py`, 26/11/2026). À lancer pour chaque série de captures
   à montrer à Paul (planches `fr-clair-*` d'abord) et avant chaque mise en ligne (rapport sans débordement, anglais complet).
   Constat du 26/11 : en plein écran 1366×768, Nemesis déborde sur les écrans 3, 5, 6, l'aide-mémoire et « Pour plus tard »
   (jusqu'à 122 px, boutons hors de l'écran) ; Mage Knight sur l'aide-mémoire et « Pour plus tard » ; Imperium sur l'aide-mémoire (9 px). Rien en 1920×1080 ni sur téléphone.
   À montrer à Paul avant de toucher au moteur commun.
4. Search Console : fait (changement d'adresse vers lessrulesmoreplay.com et sitemap envoyés, 26/11/2026).

Pax Pamir : ne pas en parler à Paul ni le proposer ; il le relancera lui-même.

## Idées d'applis

- **Pax Pamir** : automatiser le Wakhan (Paul le relancera lui-même ; ne pas en parler).
- **Brass Birmingham** (éventuellement).
- **Spirit Island**.
