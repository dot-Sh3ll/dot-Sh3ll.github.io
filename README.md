# Less Rules, More Play

Aides de jeu gratuites pour jeux de société experts : tutoriels interactifs, compagnons solo et outils.

**Site :** https://dot-sh3ll.github.io/

- Mage Knight — tutoriel et compagnon
- Imperium Antique — tutoriel, solo contre la C.I.V., aide-mémoire
- Aeon's End — générateur de marché, journal, expéditions
- Puerto Rico 1897 — tutoriel règle par règle, aide-mémoire, décompte (FR)

☕ Soutenir : https://ko-fi.com/paulmoussard

*Créations de fan non officielles, sans lien avec les éditeurs des jeux concernés.*

## Ajouter une nouvelle appli

1. Créer un dossier (ex. `nouveau-jeu/`) et y déposer la version française renommée en `index.html` (et la version anglaise en `en.html` si elle existe).
2. Dans `index.html` à la racine, copier un bloc `<a class="card ...">` et l'adapter (titre, description, lien `nouveau-jeu/`).
3. Renseigner `data-created` et `data-updated` (AAAA-MM-JJ) : les éléments récents (moins de 30 jours) reçoivent automatiquement un badge « Nouveau » ou « Mis à jour » et remontent en tête.

## Ajouter une fiche PDF

1. Déposer le PDF dans le dossier `fiches/` (nom sans espaces ni accents, ex. `imperium-aide-memoire.pdf`).
2. Dans `index.html`, section « Fiches à télécharger », copier un bloc `<article class="pdf ...">` et l'adapter (titre, description, lien `fiches/nom-du-fichier.pdf`). Classe de couleur : `mk` (Mage Knight), `imp` (Imperium), `ae` (Aeon's End), `pr` (Puerto Rico).
