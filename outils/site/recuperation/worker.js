/* Cloudflare Worker « lrmp-recuperation » : récupère les sauvegardes laissées sur l'ancien domaine paulmoussard.com.
   Le stockage local d'un navigateur est rangé par adresse : ce qui a été enregistré sur paulmoussard.com
   (carnet Mage Knight, journal Aeon's End, progression des tutoriels…) est invisible sur lessrulesmoreplay.com.
   Cette page, servie sur paulmoussard.com/recuperer, lit ces données dans le navigateur du visiteur et les renvoie
   vers https://lessrulesmoreplay.com/#lrmp-import=… ; commun/sauvegarde.js les y écrit (sans rien écraser).
   Rien ne passe par un serveur : les données vont d'un onglet à l'autre dans l'adresse (partie après #, jamais envoyée).

   Mise en place (voir outils/site/recuperation/LISEZMOI.md) :
   1. Cloudflare > Workers & Pages > Créer > Worker « lrmp-recuperation », coller ce fichier, déployer ;
   2. Worker > Paramètres > Routes : paulmoussard.com/recuperer* et www.paulmoussard.com/recuperer* ;
   3. Règle « Single Redirect » existante : ajouter à l'expression
      and not starts_with(http.request.uri.path, "/recuperer")                                                      */
const PAGE = `<!DOCTYPE html>
<html lang="fr"><head><meta charset="utf-8"><meta name="robots" content="noindex">
<meta name="viewport" content="width=device-width,initial-scale=1"><title>Less Rules, More Play</title>
<style>body{font:16px/1.5 system-ui,sans-serif;background:#0d1016;color:#eee;display:grid;place-items:center;min-height:90vh;margin:0;padding:20px;text-align:center}</style>
</head><body><p id="m">Récupération de vos données…</p>
<script>
(function(){
  var cible="https://lessrulesmoreplay.com/", c={}, n=0;
  try{ for(var i=0;i<localStorage.length;i++){ var k=localStorage.key(i); if(k!==null){ c[k]=localStorage.getItem(k); n++; } } }catch(e){}
  if(!n){ location.replace(cible); return; }
  var j=JSON.stringify({site:"lessrulesmoreplay.com",format:1,origine:location.host,cles:c});
  var b=btoa(unescape(encodeURIComponent(j))).replace(/\\+/g,"-").replace(/\\//g,"_");
  location.replace(cible+"#lrmp-import="+b);
})();
</script></body></html>`;

export default {
  async fetch() {
    return new Response(PAGE, { headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" } });
  }
};
