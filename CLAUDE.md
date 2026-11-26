# CLAUDE.md : site Less Rules, More Play (paulmoussard.com)

Aides de jeu gratuites pour jeux de société experts : tutoriels interactifs, compagnons solo, fiches PDF à imprimer.
Site statique servi par GitHub Pages (branche `main`, domaine `paulmoussard.com` dans `CNAME`). Auteur : **Paul Moussard**.
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
| `mage-knight` | mk | `#7db7ef` bleu | Marcellus | FR EN | FR modifiée à la main ; EN : `outils/traduction/build_mk.sh` |
| `imperium` | imp | `#ec7f6d` corail | Cinzel / Marcellus | FR EN | FR à la main ; EN : `build_imp.sh` |
| `aeons-end` | ae | `#c495f5` violet | Marcellus | FR EN DE | FR et EN à la main en parallèle ; DE : `outils/aeons-end/gen_lang.py de` |
| `puerto-rico` | pr | `#e2cc9f` sable | Fraunces | FR EN | **format commun** : `outils/puerto-rico/` + `assembler.py puerto-rico` |
| `nemesis` | nr | `#9bd33a` vert acide | Rajdhani | FR EN | **format commun** : `outils/nemesis/` (`page.html`, `i18n/`, `contenu/<langue>/`) + `assembler.py nemesis` |

Chaque jeu garde **sa police de titre et son thème** (clair ou sombre). L'expérience est commune : même barre du site,
mêmes onglets principaux (`.lrmp-onglets`, couleur de l'appli via `--app-accent`, `--app-accent-ink`, `--app-piste`,
`--app-onglet`), même pied de page, même encart « À imprimer », mêmes jetons (`commun/tokens.css`).

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
| `<!--theme-->…<!--/theme-->`, `#lrmp-theme`, `#theme-js` | `outils/site/theme.py` | bouton de thème clair / sombre d'Imperium, Aeon's End et Mage Knight (palettes : `outils/site/themes/<code>.css`) |

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
  remplis par `contenu/<langue>/nom.js` (Nemesis, Puerto Rico). Passées au format commun : Nemesis, Puerto Rico. Les autres gardent leur chaîne (tableau ci-dessus).
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
| Reconstruire Puerto Rico / Nemesis | `python3 outils/site/assembler.py puerto-rico` / `… nemesis` (ou leur `build.sh`) puis `seo.py` |
| Aeon's End allemand | `python3 outils/aeons-end/gen_lang.py de` (`--todo` : ce qui manque), puis `seo.py` |
| Barre du site + feuilles communes + polices d'une appli | `python3 outils/site/chrome.py <dossier>` |
| Pied de page | `python3 outils/site/pied.py <dossier> "<option du formulaire>"` |
| Schémas des tutoriels Mage Knight, Imperium, Puerto Rico | `python3 outils/site/schemas.py <dossier>` ou `--tout` (à relancer après `build_mk.sh`, `build_imp.sh` ; le `build.sh` de Puerto Rico le fait) |
| Mage Knight : « À ne pas oublier », « Précisions » et chapitre « Cas épineux » (compendium BGG) | `python3 outils/mage-knight/precisions.py` (contenu FR et EN dans le script ; à relancer après `build_mk.sh`) |
| Bouton de thème (Imperium, Aeon's End, Mage Knight) | `python3 outils/site/theme.py <dossier>` ou `--tout` (à relancer après `build_imp.sh`, `build_mk.sh`, `gen_lang.py`) |
| Accueil : carte d'appli, de fiche, date de mise à jour | `python3 outils/site/accueil.py appli\|fiche <json>` ; `accueil.py maj <dossier ou pdf>` (badge « Mis à jour ») — ne pas couper sa sortie avec `\| head` |
| Images de partage | `python3 outils/site/og_images.py` (Playwright) |
| Test au navigateur | Playwright, Chrome `/usr/bin/google-chrome` (`--no-sandbox`) ; `python3 -m http.server 8766` à la racine |

Remise en place des anciens chemins fixes (traduction Mage Knight et Imperium seulement) : voir `outils/README.md`.

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
3. Applis : une page `<appli>/it.html` (modèle : `i18n/it.json` + `contenu/it.js` ; Aeon's End : `gen_lang.py` ;
   autres : `outils/site/traduire.py` depuis `en.html`), titre et description dans `jeux.json` (`seo.it`).
4. `lang.py --site`, `chrome.py <dossier>` pour chaque appli traduite, `seo.py`, `verifier.py`. Vouvoiement de la langue.

### Faire une fiche
1. La dessiner dans un artefact **Design**, à partir du gabarit (artefact « Gabarit des fiches Less Rules, More Play »,
   sources dans `outils/fiches-gabarit/`) : A5 portrait 559×794 px (paysage 794×559 pour les listes), **fond blanc**,
   marges 26 px en haut, 30 px sur les côtés, titres dans la police de l'appli du jeu, texte Source Sans 3 en 12 px
   minimum, une seule couleur (celle du jeu en version foncée), pied
   « Less Rules, More Play · paulmoussard.com » **dans la couleur de la fiche**.
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
- **Agricola : projet abandonné.**
- **Allemand : seul Aeon's End est traduit**, jusqu'à nouvel ordre ; ne pas traduire d'autre appli en allemand.

## À faire (par ordre d'intérêt)

1. **Format de traduction commun** : Nemesis et Puerto Rico sont passés (pages identiques). Restent Imperium et Mage Knight
   (pages FR écrites à la main, anglais par anciens chemins fixes) et Aeon's End (FR/EN en parallèle, DE généré).
2. **Schémas** : faits et validés par Paul, en FR et EN (Nemesis 7, Mage Knight 3, Imperium 1, Puerto Rico 1 ; contrôlés au
   navigateur le 26/11). Piste restante : versions interactives.
3. **Versions de règles suivies** : afficher sous « Apprendre » de chaque appli la version des règles et des errata intégrés
   une fois les versions confirmées par Paul, en respectant la décision « Précisions de règles » ci-dessus (pas de version ni de « officiel » dans les encadrés).
   À vérifier : planche de cartes corrigées VF v1.3 d'Origames (Imperium), pack de cartes corrigées Intrafin (Mage Knight).
4. **Rappeler à Paul qu'il veut changer l'adresse du site.** À prévoir le jour venu : `CNAME` et DNS, `SITE` dans `seo.py`
   (canonical, hreflang, sitemap, JSON-LD), `robots.txt`, pieds de page « paulmoussard.com » de toutes les fiches (régénérer
   les PDF), GoatCounter, Search Console (outil de changement d'adresse), Ko-fi, liens partagés (Discord) : l'ancien domaine
   doit rediriger vers le nouveau (GitHub Pages ne sert qu'un domaine : redirection chez le registraire).

## Idées d'applis

- **Pax Pamir** (prochaine, de préférence) : automatiser le Wakhan.
- **Brass Birmingham** (éventuellement).
- **Spirit Island**.
