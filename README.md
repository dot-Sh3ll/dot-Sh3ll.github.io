# Less Rules, More Play

Aides de jeu gratuites pour jeux de société experts : tutoriels interactifs, compagnons solo et outils.

**Site :** https://dot-sh3ll.github.io/

- Mage Knight — tutoriel et compagnon
- Imperium Antique — tutoriel, solo contre la C.I.V., aide-mémoire
- Aeon's End — générateur de marché (dont les mises en place officielles), journal, expéditions (FR, EN, DE)
- Puerto Rico 1897 — tutoriel règle par règle, aide-mémoire, décompte

☕ Soutenir : https://ko-fi.com/paulmoussard

*Créations de fan non officielles, sans lien avec les éditeurs des jeux concernés.*

## Règles de rédaction

- On **vouvoie** toujours le lecteur, dans les applis, les fiches et la page d'accueil (jamais de tutoiement), dans toutes les langues : « vous » en français, « Sie » en allemand, « usted » en espagnol. `python3 outils/site/vouvoiement.py scan <fichier>` vérifie qu'il ne reste rien au tutoiement.

## Ajouter une nouvelle appli

1. Créer un dossier (ex. `nouveau-jeu/`) et y déposer la version française renommée en `index.html` (et la version anglaise en `en.html` si elle existe).
2. Décrire la carte dans un petit JSON (modèle : `outils/site/accueil/exemples/exemple-appli.json`), puis `python3 outils/site/accueil.py appli carte.json`. Un jeu pas encore présent sur le site se déclare dans le même fichier (`nouveau_jeu` : couleurs, bouton de filtre).
3. Après une mise à jour d'appli : `python3 outils/site/accueil.py maj nouveau-jeu`. Les éléments récents (moins de 30 jours) reçoivent un badge « Nouveau » ou « Mis à jour » et remontent en tête.

## Ajouter une fiche PDF

1. Déposer le PDF dans `fiches/` (nom sans espaces ni accents, ex. `imperium-aide-memoire.pdf`), et sa version anglaise s'il y en a une.
2. Décrire la fiche dans un JSON (modèle : `outils/site/accueil/exemples/exemple-fiche.json`), puis `python3 outils/site/accueil.py fiche fiche.json`.

## Langues

Le site est en français, anglais, allemand et espagnol. Aeon's End existe aussi en allemand (`aeons-end/de.html`, générée depuis la page anglaise). Les autres applis et les fiches s'ouvrent en anglais pour les visiteurs allemands et espagnols. Voir « Langues du site » dans `outils/README.md`.
