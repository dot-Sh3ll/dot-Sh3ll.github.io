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
index.html            accueil, page SOURCE multilingue (FR + EN écrits à la main, DE généré) : on ne modifie que celle-ci
en/ de/               accueils anglais et allemand GÉNÉRÉS depuis index.html par seo.py (ne pas modifier)
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
| `puerto-rico` | pr | `#e2cc9f` sable | Fraunces | FR EN | sources `outils/puerto-rico/` + `sh outils/puerto-rico/build.sh` |
| `nemesis` | nr | `#9bd33a` vert acide | Rajdhani | FR EN | sources `outils/nemesis/` + `sh outils/nemesis/build.sh` |

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

## Langues

- Langues du site : `fr`, `en`, `de` (`outils/site/langs.py`, `ORDER`). L'espagnol a été retiré.
- Une appli sans page dans la langue du visiteur s'ouvre en **anglais** (`FALLBACK`).
- Choix mémorisé dans `localStorage["site-lang"]` (bouton de langue de la barre, accueil). Sans choix, la langue du
  navigateur décide ; les robots ne sont jamais redirigés. `?lang=xx` dans l'adresse bloque la redirection.
- Accueil : `/`, `/en/`, `/de/` sont de vraies pages ; `/?lang=en` redirige vers `/en/` (anciens liens).
- Textes allemands de l'accueil : `outils/site/accueil/de.json` (clé = texte anglais de la page) ; `_apps` dit dans quelle
  langue chaque appli s'ouvre pour un visiteur allemand (`{"*": "en", "ae": "de"}`).
- **Format de traduction commun pour les nouvelles applis** (modèle `outils/modele-appli`) : textes d'interface par clés dans
  `i18n/<langue>.json` (mêmes clés partout), contenu dans `contenu/<langue>.js` ; `assembler.py` signale les clés
  manquantes et reprend l'anglais. Les applis existantes gardent leur chaîne (tableau ci-dessus).
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
| Reconstruire Puerto Rico / Nemesis | `sh outils/puerto-rico/build.sh` / `sh outils/nemesis/build.sh` puis `seo.py` |
| Aeon's End allemand | `python3 outils/aeons-end/gen_lang.py de` (`--todo` : ce qui manque), puis `seo.py` |
| Barre du site + feuilles communes + polices d'une appli | `python3 outils/site/chrome.py <dossier>` |
| Pied de page | `python3 outils/site/pied.py <dossier> "<option du formulaire>"` |
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
   `gen_mk_en.py` (EN), module de quêtes `quetes/quetes.py`, scénarios `quetes/scenarios.py`.
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
- Points ouverts : noms allemands incertains dans Aeon's End (attendre la communauté) ; noms anglais des salles
  aléatoires de Nemesis (traductions maison sauf Shelter et Technical Corridor Entrance) ; aide de jeu Mage Knight
  anglaise (gen_mk_en.py) construite à part de la française, texte plus petit : à régénérer un jour depuis les pages FR traduites.
