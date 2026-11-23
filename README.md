# Aides de jeu de Paul

Aides de jeu gratuites pour jeux de société experts : tutoriels interactifs, compagnons solo et outils.

**Site :** https://dot-sh3ll.github.io/

- Mage Knight — tutoriel et compagnon
- Imperium Antique — tutoriel, solo contre la C.I.V., aide-mémoire
- Aeon's End — générateur de marché, journal, expéditions

☕ Soutenir : https://ko-fi.com/paulmoussard

*Créations de fan non officielles, sans lien avec les éditeurs des jeux concernés.*

## Ajouter une nouvelle appli

1. Créer un dossier (ex. `nouveau-jeu/`) et y déposer le fichier de l'appli renommé en `index.html`.
2. Dans `index.html` à la racine, copier un bloc `<a class="card ...">` et l'adapter (titre, description, lien `nouveau-jeu/`).

## Ajouter une fiche PDF

1. Déposer le PDF dans le dossier `fiches/` (nom sans espaces ni accents, ex. `imperium-aide-memoire.pdf`).
2. Dans `index.html`, section « Fiches à télécharger », copier un bloc `<article class="pdf ...">` et l'adapter (titre, description, lien `fiches/nom-du-fichier.pdf`). Classe de couleur : `mk` (Mage Knight), `imp` (Imperium), `ae` (Aeon's End).
