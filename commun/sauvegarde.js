/* Sauvegarde des données des visiteurs (progression, carnets, journaux) : tout le stockage local du site.
   Chargé par le pied de page des applis (outils/site/pied.py) et par l'accueil.
   - « Sauvegarder mes données » : télécharge un fichier JSON avec toutes les clés du site (toutes langues) ;
   - « Restaurer » : relit ce fichier et réécrit les clés, puis recharge la page ;
   - #lrmp-import=<base64> dans l'adresse : récupération depuis un ancien domaine (clés absentes seulement) ;
   - demande au navigateur de ne pas effacer ces données (navigator.storage.persist), sauf Firefox (fenêtre d'autorisation).
   Les fonctions d'origine du stockage sont lues dans Storage.prototype.__lrmp (posé par outils/site/lang.py),
   car les pages non françaises préfixent les clés par la langue. */
(function(){
  var ls; try{ ls=window.localStorage; }catch(e){ return; }
  if(!ls) return;
  var P=Storage.prototype, R=P.__lrmp||{g:P.getItem,s:P.setItem,r:P.removeItem};
  var get=function(k){ return R.g.call(ls,k); }, set=function(k,v){ R.s.call(ls,k,v); };
  var lang=(document.documentElement.lang||"fr").slice(0,2), fr=lang==="fr";
  var M=fr?{
    vide:"Aucune donnée à sauvegarder pour l'instant dans ce navigateur.",
    ok:"Fichier de sauvegarde téléchargé. Gardez-le : il permet de tout retrouver sur un autre navigateur ou un autre appareil.",
    confirmer:"Restaurer cette sauvegarde ? Les données enregistrées dans ce navigateur pour les mêmes applis seront remplacées.",
    restaure:"Sauvegarde restaurée : ",cles:" élément(s).",
    invalide:"Ce fichier n'est pas une sauvegarde de Less Rules, More Play.",
    recup:"Vos données de l'ancienne adresse du site ont été récupérées."
  }:{
    vide:"Nothing to back up yet in this browser.",
    ok:"Backup file downloaded. Keep it: it lets you get everything back on another browser or device.",
    confirmer:"Restore this backup? Data saved in this browser for the same apps will be replaced.",
    restaure:"Backup restored: ",cles:" item(s).",
    invalide:"This file is not a Less Rules, More Play backup.",
    recup:"Your data from the site's former address has been recovered."
  };
  function toutes(){ var o={}; for(var i=0;i<ls.length;i++){ var k=ls.key(i); if(k!==null) o[k]=get(k); } return o; }
  function dire(t){ try{ alert(t); }catch(e){} }

  /* récupération depuis un ancien domaine : n'écrase jamais une donnée déjà présente */
  var h=location.hash, m=/^#lrmp-import=([A-Za-z0-9+/=_-]+)$/.exec(h);
  if(m){
    try{
      var b=m[1].replace(/-/g,"+").replace(/_/g,"/"), txt=decodeURIComponent(escape(atob(b))), d=JSON.parse(txt), n=0;
      var c=(d&&d.cles)||{};
      Object.keys(c).forEach(function(k){ if(get(k)===null&&typeof c[k]==="string"){ set(k,c[k]); n++; } });
      set("lrmp-recup",new Date().toISOString());
      history.replaceState(null,"",location.pathname+location.search);
      if(n){ dire(M.recup); location.reload(); return; }
    }catch(e){ history.replaceState(null,"",location.pathname+location.search); }
  }

  /* ne pas laisser le navigateur effacer les données quand l'espace manque (Firefox demanderait une autorisation : on s'abstient) */
  try{ if(ls.length&&navigator.storage&&navigator.storage.persist&&!/firefox/i.test(navigator.userAgent)) navigator.storage.persist(); }catch(e){}

  function exporter(){
    var c=toutes(); if(!Object.keys(c).length){ dire(M.vide); return; }
    var j=JSON.stringify({site:"lessrulesmoreplay.com",format:1,date:new Date().toISOString(),cles:c},null,1);
    var a=document.createElement("a"), u=URL.createObjectURL(new Blob([j],{type:"application/json"}));
    a.href=u; a.download="less-rules-more-play-sauvegarde-"+new Date().toISOString().slice(0,10)+".json";
    document.body.appendChild(a); a.click(); setTimeout(function(){ URL.revokeObjectURL(u); a.remove(); },500);
    dire(M.ok);
  }
  function importer(f){
    var rd=new FileReader();
    rd.onload=function(){
      var d=null; try{ d=JSON.parse(rd.result); }catch(e){}
      if(!d||d.site!=="lessrulesmoreplay.com"||!d.cles){ dire(M.invalide); return; }
      if(!confirm(M.confirmer)) return;
      var n=0; Object.keys(d.cles).forEach(function(k){ if(typeof d.cles[k]==="string"){ set(k,d.cles[k]); n++; } });
      dire(M.restaure+n+M.cles); location.reload();
    };
    rd.readAsText(f);
  }
  function brancher(){
    document.querySelectorAll("[data-lrmp-sauver]").forEach(function(b){ b.onclick=function(e){ e.preventDefault(); exporter(); }; });
    document.querySelectorAll("[data-lrmp-restaurer]").forEach(function(b){
      b.onclick=function(e){ e.preventDefault();
        var i=document.createElement("input"); i.type="file"; i.accept="application/json,.json";
        i.onchange=function(){ if(i.files&&i.files[0]) importer(i.files[0]); }; i.click(); };
    });
  }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",brancher); else brancher();
  window.lrmpSauvegarde={exporter:exporter,toutes:toutes};
})();
