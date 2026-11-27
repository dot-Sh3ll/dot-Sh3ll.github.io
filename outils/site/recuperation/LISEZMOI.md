# Récupérer les données laissées sur paulmoussard.com

Le stockage local d'un navigateur est rangé par adresse de site. Tout ce qui a été enregistré sur
`paulmoussard.com` (du 24 au 26/11/2026) est resté là-bas : `lessrulesmoreplay.com` ne le voit pas.
La redirection 301 de Cloudflare empêche toute page de l'ancien domaine de s'exécuter, donc de relire ces données.

`worker.js` sert une petite page sur `paulmoussard.com/recuperer` (adresse jamais visitée, donc jamais
mise en cache par la redirection) : elle lit le stockage de l'ancien domaine dans le navigateur du visiteur
et l'envoie dans l'adresse (`#lrmp-import=…`) vers `lessrulesmoreplay.com`, où `commun/sauvegarde.js`
l'écrit sans rien écraser. Aucune donnée ne passe par un serveur.

## Mise en place (Paul, dans Cloudflare)
1. Workers & Pages > Créer > Worker, nom `lrmp-recuperation` ; remplacer le code par `worker.js` ; Déployer.
2. Le Worker > Paramètres > Domaines et routes > Ajouter une route : `paulmoussard.com/recuperer*`
   (zone paulmoussard.com), puis la même avec `www.paulmoussard.com/recuperer*`.
3. Règles > la règle « Single Redirect » existante : à la fin de l'expression, ajouter
   `and not starts_with(http.request.uri.path, "/recuperer")`.
4. Tester : ouvrir https://paulmoussard.com/recuperer dans un navigateur qui avait servi sur l'ancien domaine.

## Limites
- À faire dans chaque navigateur, sur chaque appareil (téléphone, ordinateur).
- `dot-sh3ll.github.io` (adresse du 23/11) : GitHub redirige tout, aucune récupération possible.
- À garder tant que la redirection de l'ancien domaine existe (au moins jusqu'en 2028).
