/* Mode « Expliquer le jeu », commun à toutes les applis (inséré par assembler.py à la place de <!--PARTAGE:expliquer.js-->).
   lrmpExpliquer(boite, D) : D = {ecrans:[{t, html, dire?, piege?, pl?}], aide:html, plus?:[[quoi, quand]], ui:{…}}
   dire : la phrase à dire, en italique sous le titre ; piege : encadré, titré pl (sinon ui.piege).
   chantier : {k, t, p} = écran d'attente « Section en chantier » à la place des écrans (mode pas encore validé).
   Ordre : les écrans, puis l'aide-mémoire, puis « Pour plus tard » (si D.plus). Flèches du clavier quand la boîte est visible. */
window.lrmpExpliquer=function(boite,D){
  if(D.chantier){const c=D.chantier;boite.innerHTML=`<div class="ex-stage ex-chantier"><div class="ex-num">${c.k}</div><h2>${c.t}</h2><div class="ex-corps"><p class="big1">${c.p}</p></div></div>`;return}
  const u=D.ui,N=D.ecrans.length,P=D.plus&&D.plus.length?1:0,T=N+1+P;
  let i=0;
  function contenu(){
    if(i<N){const e=D.ecrans[i];
      return {num:u.ecran.replace('{n}',i+1).replace('{t}',N),titre:e.t,cite:e.dire||'',
        corps:e.html+(e.piege?`<div class="ex-piege"><b>${e.pl||u.piege}</b><p>${e.piege}</p></div>`:'')}}
    if(i===N)return {num:u.aide,titre:u.aideTitre,cite:'',corps:`<div class="ex-ref">${D.aide}</div>`};
    return {num:u.plus,titre:u.plusTitre,cite:'',
      corps:`<p class="big1">${u.plusIntro}</p><ul class="ex-plus">${D.plus.map(([a,b])=>`<li><b>${a}</b><span>${b}</span></li>`).join('')}</ul>`}}
  function dessiner(){
    const c=contenu(),fin=i===T-1;
    const suivant=fin?u.debut:i===N-1?u.voirAide:i===N&&P?u.voirPlus:u.suivant;
    boite.innerHTML=`<div class="ex-stage">
      <div class="ex-num">${c.num}</div><h2>${c.titre}</h2>${c.cite?`<p class="ex-cite">${c.cite}</p>`:''}<div class="ex-corps">${c.corps}</div>
      <div class="ex-points" aria-hidden="true">${Array.from({length:T},(_,k)=>`<i class="${k===i?'on':''}${k>=N?' fin':''}"></i>`).join('')}</div></div>
      <div class="ex-nav"><button type="button" data-x="prec" ${i?'':'disabled'}>${u.precedent}</button><button type="button" class="pri" data-x="suiv">${suivant}</button>
      <button type="button" data-x="aide">${u.aide}</button>${document.fullscreenEnabled?`<button type="button" data-x="fs">${u.pleinEcran}</button>`:''}<span class="ex-astuce">${u.fleches}</span></div>`;
    const b=k=>boite.querySelector(`[data-x="${k}"]`);
    b('prec').onclick=()=>aller(i-1);b('suiv').onclick=()=>aller(fin?0:i+1);b('aide').onclick=()=>aller(N);
    if(b('fs'))b('fs').onclick=()=>{try{const r=document.fullscreenElement?document.exitFullscreen():boite.requestFullscreen();if(r&&r.catch)r.catch(()=>{})}catch(e){}}}
  function aller(k){i=Math.max(0,Math.min(T-1,k));dessiner();const s=boite.querySelector('.ex-stage');if(s&&!document.fullscreenElement&&s.getBoundingClientRect().top<0)s.scrollIntoView({block:'start'})}
  document.addEventListener('keydown',e=>{if(!boite.offsetParent&&document.fullscreenElement!==boite)return;if(/INPUT|SELECT|TEXTAREA/.test(e.target.tagName||''))return;
    if(e.key==='ArrowRight'||e.key===' '){aller(i+1);e.preventDefault()}else if(e.key==='ArrowLeft')aller(i-1)});
  dessiner();
};
