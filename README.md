# Less Rules, More Play

Aides de jeu gratuites pour jeux de société experts : tutoriels interactifs, compagnons solo et outils.

**Site :** paulmoussard.com

- Mage Knight — tutoriel et compagnon
- Imperium Antique — tutoriel, solo contre la C.I.V., aide-mémoire
- Aeon's End — générateur de marché (dont les mises en place officielles), journal, expéditions (FR, EN, DE)
- Puerto Rico 1897 — tutoriel règle par règle, aide-mémoire, décompte
- Nemesis: Retaliation — tutoriel règle par règle (ateliers : sac Intrus, jet de bruit, tir, rafale, éclosion), aide-mémoire, toutes les salles

☕ Soutenir : https://ko-fi.com/paulmoussard

*Créations de fan non officielles, sans lien avec les éditeurs des jeux concernés.*

## Règles de rédaction

- On **vouvoie** toujours le lecteur, dans les applis, les fiches et la page d'accueil (jamais de tutoiement), dans toutes les langues : « vous » en français, « Sie » en allemand, « usted » en espagnol. `python3 outils/site/vouvoiement.py scan <fichier>` vérifie qu'il ne reste rien au tutoiement.

## Ajouter une nouvelle appli

1. Créer un dossier (ex. `nouveau-jeu/`) et y déposer la version française renommée en `index.html` (et la version anglaise en `en.html` si elle existe).
2. Décrire la carte dans un petit JSON (modèle : `outils/site/accueil/exemples/exemple-appli.json`), puis `python3 outils/site/accueil.py appli carte.json`. Un jeu pas encore présent sur le site se déclare dans le même fichier (`nouveau_jeu` : couleurs, bouton de filtre).
3. Formulaire « Votre avis » et pied de page : un nouveau jeu (`nouveau_jeu`) reçoit automatiquement son option dans le formulaire de l'accueil (valeur = `chip`) ; poser ensuite le pied de page sur l'appli (retour, « Signaler un problème » qui ouvre le formulaire avec le jeu choisi, Ko-fi) : `python3 outils/site/pied.py nouveau-jeu "Nom du jeu"` (le nom doit être celui de l'option).
4. Référencement : ajouter l'appli dans `PAGES` de `outils/site/seo.py` (titre et description par langue) et dans `IMAGES` de `outils/site/og_images.py`, puis `python3 outils/site/og_images.py` et `python3 outils/site/seo.py` (balises, sitemap).
5. Après une mise à jour d'appli : `python3 outils/site/accueil.py maj nouveau-jeu`. Les éléments récents (moins de 30 jours) reçoivent un badge « Nouveau » ou « Mis à jour » et remontent en tête.

## Ajouter une fiche PDF

1. Déposer le PDF dans `fiches/` (nom sans espaces ni accents, ex. `imperium-aide-memoire.pdf`), et sa version anglaise s'il y en a une.
2. Décrire la fiche dans un JSON (modèle : `outils/site/accueil/exemples/exemple-fiche.json`), puis `python3 outils/site/accueil.py fiche fiche.json`.
3. `python3 outils/site/seo.py` : la fiche entre dans le sitemap et reçoit ses métadonnées PDF (titre, auteur).
4. `python3 outils/site/fiches.py` : la fiche apparaît dans l'appli du jeu (encart « À imprimer » de l'aide-mémoire, rappel en fin de tutoriel).

## Langues

Le site est en français, anglais, allemand et espagnol. Aeon's End existe aussi en allemand (`aeons-end/de.html`, générée depuis la page anglaise). Les autres applis et les fiches s'ouvrent en anglais pour les visiteurs allemands et espagnols. Voir « Langues du site » dans `outils/README.md`.
