#!/usr/bin/env python3
"""Outil de conception du mode « Expliquer le jeu » : captures, planches, débordements, texte en Markdown.

Usage (depuis la racine du dépôt) :
  python3 outils/site/expliquer.py <dossier> [--ecrans 1,5,aide,plus] [--fr | --en] [--theme clair|sombre]
                                   [--sortie <dossier>] [--sans-plein-ecran] [--sans-telephone]

En une commande :
  1. lance un serveur local sur la racine du dépôt (port libre) ;
  2. ouvre l'onglet « Expliquer le jeu » de l'appli, en contournant « Section en chantier » (EXPL.chantier) pour voir le brouillon ;
  3. capture chaque écran (#ex-boite .ex-stage), puis l'aide-mémoire et « Pour plus tard » :
       - FR et EN, thème clair et sombre, fenêtre de 1280 px ;
       - plein écran 1366×768 et 1920×1080 (thème clair) ;
       - téléphone 390 px, tactile (thème clair) ;
  4. assemble des planches de 3 écrans (à envoyer à Paul) ;
  5. signale ce qui déborde : boîte plus haute que l'écran en plein écran, élément qui sort de la carte, texte coupé,
     page plus large que le téléphone ;
  6. exporte le texte des écrans (titre, phrase à dire, blocs, encadrés, aide-mémoire, « Pour plus tard ») en Markdown,
     et signale les phrases à dire sans équivalent anglais et l'anglais resté en français.

Sortie : <dossier temporaire>/lrmp-expliquer/<dossier>/ (ou --sortie), avec rapport.md.
  captures/<langue>-<thème>/ecran-01.png …   planches/<langue>-<thème>-01-03.png …
  plein-ecran/<langue>-1366x768-ecran-01.png …   telephone/<langue>-ecran-01.png …   planches/<langue>-telephone-01-03.png
  texte-fr.md, texte-en.md, rapport.md
Avec --ecrans, seuls ces écrans sont capturés (les numéros commencent à 1 ; « aide » et « plus » pour les deux derniers).
Le plein écran est le vrai (bouton « Plein écran » de la page) ; si le navigateur le refuse, il est simulé (règles « :fullscreen »
recopiées sur la boîte, posée sur toute la fenêtre) et le rapport le dit.
Chrome : /usr/bin/google-chrome (Playwright).
"""
import argparse
import functools
import http.server
import pathlib
import re
import sys
import tempfile
import threading

from PIL import Image, ImageDraw, ImageFont
from playwright.sync_api import sync_playwright

RACINE = pathlib.Path(__file__).resolve().parents[2]
CHROME = '/usr/bin/google-chrome'
LARGEUR = 1280
PLEINS = [(1366, 768), (1920, 1080)]
TELEPHONE = (390, 844)
THEMES = {'clair': 'light', 'sombre': 'dark'}
PAGES = {'fr': 'index.html', 'en': 'en.html'}

# Avant tout script de la page : garder EXPL dans window.__EXPL et retirer EXPL.chantier pour voir le brouillon.
INIT = """(()=>{let f;Object.defineProperty(window,'lrmpExpliquer',{configurable:true,get(){return f},
  set(v){f=function(b,D){window.__EXPL=D;if(D&&D.chantier){window.__CHANTIER=true;delete D.chantier}return v(b,D)}}});})();"""

OUVRIR = """()=>{const t=document.querySelector('[data-tab="expliquer"],[data-mode="expliquer"],a[href="#expliquer"]');if(t)t.click()}"""

# Barres collantes ou fixes hors de la boîte : remises dans le flux, pour ne pas recouvrir une capture plus haute que la fenêtre.
DECOLLER = """()=>{const b=document.getElementById('ex-boite');for(const e of document.querySelectorAll('body *')){if(b.contains(e)||e.contains(b))continue;
  const p=getComputedStyle(e).position;if(p==='sticky'||p==='fixed')e.style.setProperty('position','static','important')}}"""

THEME = """t=>{document.documentElement.setAttribute('data-theme',t)}"""

SUIVANT = """()=>{const b=document.querySelector('#ex-boite [data-x="suiv"]');if(b&&!b.disabled){b.click();return true}return false}"""

# Plein écran simulé : les règles « :fullscreen » recopiées sur .ex-simfs.
PLEIN = """()=>{let css='';for(const sh of document.styleSheets){let rs;try{rs=sh.cssRules}catch(e){continue}
  for(const r of rs){if(r.selectorText&&r.selectorText.includes(':fullscreen'))css+=r.cssText.replaceAll(':fullscreen','.ex-simfs')+'\\n'}}
  const st=document.createElement('style');st.id='ex-simfs-css';
  st.textContent='.ex-simfs{position:fixed!important;inset:0!important;z-index:2147483647!important;width:100vw!important;height:100vh!important;box-sizing:border-box!important;margin:0!important}\\n'+css;
  document.head.appendChild(st);document.getElementById('ex-boite').classList.add('ex-simfs');document.documentElement.style.overflow='hidden'}"""

# Débordements de l'écran affiché. Ne garde que l'élément le plus extérieur de chaque problème.
DEBORDS = """plein=>{const b=document.getElementById('ex-boite'),s=b.querySelector('.ex-stage'),R=s.getBoundingClientRect(),pb=[],vus=[];
  const nom=e=>{const t=(e.textContent||'').replace(/\\s+/g,' ').trim();return e.tagName.toLowerCase()+(e.className&&typeof e.className==='string'?'.'+e.className.trim().split(/\\s+/).join('.'):'')+(t?' « '+t.slice(0,60)+(t.length>60?'…':'')+' »':'')};
  const dedans=e=>vus.some(v=>v.contains(e));
  for(const e of s.querySelectorAll('*')){const r=e.getBoundingClientRect();if(!r.width&&!r.height)continue;if(dedans(e))continue;
    if(r.right>R.right+1||r.left<R.left-1){pb.push('sort de la carte ('+Math.round(Math.max(r.right-R.right,R.left-r.left))+' px) : '+nom(e));vus.push(e);continue}
    if(e.scrollWidth>e.clientWidth+1&&e.clientWidth>0&&getComputedStyle(e).display!=='inline'){pb.push('texte coupé ou mot trop long ('+(e.scrollWidth-e.clientWidth)+' px) : '+nom(e));vus.push(e)}}
  if(plein){const h=b.scrollHeight-b.clientHeight;if(h>1)pb.unshift('la boîte est plus haute que l\\'écran de '+h+' px (il faut faire défiler)');
    const n=b.querySelector('.ex-nav');if(n&&n.getBoundingClientRect().bottom>innerHeight+1)pb.unshift('les boutons sortent de l\\'écran')}
  else if(document.documentElement.scrollWidth>innerWidth+1)pb.unshift('la page est plus large que l\\'écran ('+(document.documentElement.scrollWidth-innerWidth)+' px)');
  return pb}"""

# EXPL → Markdown (dans la page, pour profiter du DOM).
TEXTE = """()=>{const D=window.__EXPL;if(!D)return null;
  const inl=n=>{let o='';for(const c of n.childNodes){if(c.nodeType===3)o+=c.textContent;else if(c.nodeType===1){const t=c.tagName;
    if(t==='B'||t==='STRONG')o+='**'+inl(c).trim()+'** ';else if(t==='EM'||t==='I')o+='*'+inl(c).trim()+'* ';else if(t==='BR')o+=' ';
    else if(/^(P|DIV|H\\d|LI|SMALL|SPAN)$/.test(t))o+=' '+inl(c)+' ';else o+=inl(c)}}return o.replace(/\\s+/g,' ').replace(/ ([.,)])/g,'$1').trim()};
  const carte=d=>{const h=d.querySelector(':scope>h3,:scope>h4');if(!h)return inl(d);const r=d.cloneNode(true);r.querySelector(':scope>h3,:scope>h4').remove();const x=inl(r);return '**'+inl(h)+'**'+(x?' — '+x:'')};
  const bloc=(n,out,ind)=>{for(const c of n.children){const t=c.tagName,cl=c.classList;
    if(cl.contains('ex-piege')){const b=c.querySelector('b');const p=c.cloneNode(true);const bb=p.querySelector('b');if(bb)bb.remove();out.push('> **'+(b?inl(b):'')+'** '+inl(p))}
    else if(/^H[1-6]$/.test(t))out.push('',ind+'**'+inl(c)+'**');
    else if(t==='P')out.push(ind+inl(c));
    else if(cl.contains('flow'))out.push(ind+[...c.children].map(inl).join(' '));
    else if(t==='UL'||t==='OL'){[...c.children].forEach((li,k)=>out.push(ind+(t==='OL'?(k+1)+'.':'-')+' '+(li.dataset.l?'['+li.dataset.l+'] ':'')+carte(li)))}
    else if(cl.contains('duo')||cl.contains('trio')||cl.contains('quad')){for(const d of c.children)out.push(ind+'- '+carte(d))}
    else if(c.children.length&&!/^(B|STRONG|EM|I|SPAN|SMALL)$/.test(t))bloc(c,out,ind);
    else{const x=inl(c);if(x)out.push(ind+x)}}};
  const md=h=>{const d=document.createElement('div');d.innerHTML=h||'';const out=[];bloc(d,out,'');return out};
  const u=D.ui||{};
  return {ecrans:D.ecrans.map(e=>({t:e.t,dire:e.dire||'',corps:md(e.html),piege:e.piege?{pl:e.pl||u.piege||'',p:md('<p>'+e.piege+'</p>').join(' ')}:null})),
    aideTitre:u.aideTitre||'',aide:md(D.aide),plusTitre:u.plusTitre||'',plusIntro:u.plusIntro||'',plus:(D.plus||[]).map(([a,b])=>[md('<p>'+a+'</p>').join(' '),md('<p>'+b+'</p>').join(' ')]),
    chantier:!!window.__CHANTIER}}"""


def serveur():
    class Muet(http.server.SimpleHTTPRequestHandler):
        def log_message(self, *a):
            pass
    gest = functools.partial(Muet, directory=str(RACINE))
    srv = http.server.ThreadingHTTPServer(('127.0.0.1', 0), gest)
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    return srv


def police(taille, gras=False):
    for f in (f'/usr/share/fonts/truetype/dejavu/DejaVuSans{"-Bold" if gras else ""}.ttf',):
        if pathlib.Path(f).exists():
            return ImageFont.truetype(f, taille)
    return ImageFont.load_default(size=taille)


def etiquette(k, n):
    return f'Écran {k + 1}' if k < n else ('Aide-mémoire' if k == n else 'Pour plus tard')


def nom_fichier(k, n):
    return f'ecran-{k + 1:02d}' if k < n else ('aide' if k == n else 'plus')


def planche(images, titres, sortie, cote_a_cote=False):
    """Assemble les captures (verticalement, ou côte à côte pour le téléphone), chacune sous un bandeau titré."""
    ims = [Image.open(i).convert('RGB') for i in images]
    f, h_bandeau, marge = police(22, True), 44, 24
    if cote_a_cote:
        L = sum(i.width for i in ims) + marge * (len(ims) + 1)
        H = max(i.height for i in ims) + h_bandeau + marge * 2
    else:
        L = max(i.width for i in ims) + marge * 2
        H = sum(i.height + h_bandeau for i in ims) + marge * (len(ims) + 1)
    pl = Image.new('RGB', (L, H), (236, 236, 236))
    d = ImageDraw.Draw(pl)
    x, y = marge, marge
    for im, t in zip(ims, titres):
        d.text((x, y + 8), t, font=f, fill=(40, 40, 40))
        pl.paste(im, (x, y + h_bandeau))
        if cote_a_cote:
            x += im.width + marge
        else:
            y += im.height + h_bandeau + marge
    pl.save(sortie, optimize=True)


def lots(liste, n=3):
    return [liste[i:i + n] for i in range(0, len(liste), n)]


def choisir(spec, total, n):
    if not spec:
        return list(range(total))
    ks = set()
    for x in spec.split(','):
        x = x.strip().lower()
        if x == 'aide':
            ks.add(n)
        elif x == 'plus':
            if n + 1 < total:
                ks.add(n + 1)
        elif re.fullmatch(r'\d+-\d+', x):
            a, b = map(int, x.split('-'))
            ks.update(k - 1 for k in range(a, b + 1))
        elif x.isdigit():
            ks.add(int(x) - 1)
        elif x:
            sys.exit(f'--ecrans : « {x} » non compris (numéros, 2-4, aide, plus)')
    hors = [k + 1 for k in ks if k < 0 or k >= total]
    if hors:
        sys.exit(f'--ecrans : écran(s) {hors} inexistant(s) (il y a {n} écrans, puis aide et plus)')
    return sorted(ks)


class Session:
    def __init__(self, nav, base, dossier):
        self.nav, self.base, self.dossier = nav, base, dossier

    def page(self, langue, theme, vue, telephone=False):
        ctx = self.nav.new_context(viewport={'width': vue[0], 'height': vue[1]}, device_scale_factor=1,
                                   color_scheme=THEMES[theme], service_workers='block', locale=langue,
                                   is_mobile=telephone, has_touch=telephone)
        ctx.add_init_script(INIT)
        ctx.add_init_script(f"try{{localStorage.setItem('site-lang','{langue}')}}catch(e){{}}")
        pg = ctx.new_page()
        erreurs = []
        pg.on('pageerror', lambda e: erreurs.append(str(e)))
        pg.goto(f'{self.base}/{self.dossier}/{PAGES[langue]}?lang={langue}#expliquer', wait_until='load')
        pg.evaluate(OUVRIR)
        pg.evaluate(THEME, THEMES[theme])
        try:
            pg.wait_for_selector('#ex-boite .ex-stage', state='visible', timeout=8000)
        except Exception:
            sys.exit(f'{self.dossier} ({langue}) : la boîte « Expliquer le jeu » ne s\'affiche pas. Erreurs : {erreurs}')
        pg.evaluate(DECOLLER)
        pg.evaluate('document.fonts.ready')
        pg.wait_for_timeout(200)
        return ctx, pg, erreurs

    @staticmethod
    def parcourir(pg, voulus, total, faire):
        """Passe les écrans un à un avec « Suivant » et appelle faire(k) pour les écrans voulus."""
        for k in range(total):
            if k:
                if not pg.evaluate(SUIVANT):
                    break
                pg.wait_for_timeout(60)
            if k in voulus:
                faire(k)


def markdown(dossier, langue, T, voulus):
    n = len(T['ecrans'])
    o = [f'# {dossier} · « Expliquer le jeu » · {langue.upper()}', '']
    if T['chantier']:
        o += ['*Brouillon : la page affiche encore « Section en chantier » (EXPL.chantier).*', '']
    for k, e in enumerate(T['ecrans']):
        if k not in voulus:
            continue
        o += [f'## Écran {k + 1} · {e["t"]}', '']
        if e['dire']:
            o += [f'**À dire :** {e["dire"]}', '']
        o += [l for l in e['corps']] + ['']
        if e['piege']:
            o += [f'> **{e["piege"]["pl"]}** {e["piege"]["p"]}', '']
    if n in voulus:
        o += [f'## Aide-mémoire · {T["aideTitre"]}', ''] + T['aide'] + ['']
    if n + 1 in voulus and T['plus']:
        o += [f'## Pour plus tard · {T["plusTitre"]}', '', T['plusIntro'], '']
        o += [f'- **{a}** : {b}' for a, b in T['plus']] + ['']
    return '\n'.join(re.sub(r'\n{3,}', '\n\n', '\n'.join(o)).split('\n')).rstrip() + '\n'


def comparer(fr, en):
    """Écarts entre le texte français et l'anglais : phrases à dire absentes, anglais resté en français."""
    pb = []
    if len(fr['ecrans']) != len(en['ecrans']):
        pb.append(f'nombre d\'écrans différent : FR {len(fr["ecrans"])}, EN {len(en["ecrans"])}')
    francais = re.compile(r"[éèêàùçœ]|\b(vous|les|des|une|est|pour|avec|votre|dans)\b", re.I)
    restes = []
    for k, (a, b) in enumerate(zip(fr['ecrans'], en['ecrans'])):
        if a['dire'] and not b['dire']:
            pb.append(f'écran {k + 1} : phrase à dire sans équivalent anglais')
        if not a['dire'] and b['dire']:
            pb.append(f'écran {k + 1} : phrase à dire en anglais seulement')
        champs = [champ for champ, x, y in (('titre', a['t'], b['t']), ('phrase à dire', a['dire'], b['dire']),
                                            ('écran', ' '.join(a['corps']), ' '.join(b['corps'])))
                  if y and ((y == x and (francais.search(y) or len(y.split()) > 2)) or len(francais.findall(y)) >= 3)]
        if champs:
            restes.append((k, champs))
    if restes and len(restes) == len(en['ecrans']):
        pb.insert(0, 'l\'anglais est encore en français sur tous les écrans (à traduire)')
    else:
        pb += [f'écran {k + 1} : resté en français ({", ".join(c)})' for k, c in restes]
    if fr['plus'] and en['plus'] and fr['plus'] == en['plus']:
        pb.append('« Pour plus tard » resté en français')
    if fr['aide'] == en['aide'] and fr['aide']:
        pb.append('aide-mémoire resté en français')
    return pb


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('dossier', help='dossier de l\'appli (nemesis, mage-knight, puerto-rico, imperium)')
    ap.add_argument('--ecrans', help='écrans à capturer, ex. 1,5 ou 2-4,aide,plus (par défaut : tous)')
    g = ap.add_mutually_exclusive_group()
    g.add_argument('--fr', action='store_true', help='français seulement')
    g.add_argument('--en', action='store_true', help='anglais seulement')
    ap.add_argument('--theme', choices=list(THEMES), help='un seul thème (par défaut : clair et sombre)')
    ap.add_argument('--sortie', help='dossier de sortie (par défaut : dossier temporaire/lrmp-expliquer/<dossier>)')
    ap.add_argument('--sans-plein-ecran', action='store_true')
    ap.add_argument('--sans-telephone', action='store_true')
    a = ap.parse_args()

    d = a.dossier.strip('/')
    if not (RACINE / d / 'index.html').exists():
        sys.exit(f'{d}/index.html introuvable (lancer depuis la racine du dépôt, avec le nom du dossier de l\'appli)')
    langues = ['fr'] if a.fr else ['en'] if a.en else [l for l in PAGES if (RACINE / d / PAGES[l]).exists()]
    themes = [a.theme] if a.theme else list(THEMES)
    th_unique = a.theme or 'clair'
    sortie = pathlib.Path(a.sortie) if a.sortie else pathlib.Path(tempfile.gettempdir()) / 'lrmp-expliquer' / d
    for s in ('captures', 'planches', 'plein-ecran', 'telephone'):  # repartir de zéro : rien d'une ancienne série
        (sortie / s).mkdir(parents=True, exist_ok=True)
        for f in (sortie / s).rglob('*.png'):
            f.unlink()

    srv = serveur()
    base = f'http://127.0.0.1:{srv.server_address[1]}'
    rapport, problemes, textes, erreurs_js, simule = [], {}, {}, set(), set()

    def noter(ou, liste):
        if liste:
            problemes[ou] = liste

    with sync_playwright() as p:
        nav = p.chromium.launch(executable_path=CHROME, args=['--no-sandbox'])
        S = Session(nav, base, d)
        for lg in langues:
            # Texte + captures normales, par thème.
            for th in themes:
                ctx, pg, err = S.page(lg, th, (LARGEUR, 1000))
                T = pg.evaluate(TEXTE)
                if T is None:
                    sys.exit(f'{d} ({lg}) : EXPL introuvable (le moteur lrmpExpliquer n\'a pas été appelé)')
                n = len(T['ecrans'])
                total = n + 1 + (1 if T['plus'] else 0)
                voulus = choisir(a.ecrans, total, n)
                textes[lg] = (T, voulus)
                rep = sortie / 'captures' / f'{lg}-{th}'
                rep.mkdir(exist_ok=True)
                faits = []

                def capt(k, rep=rep, pg=pg, faits=faits, lg=lg, th=th, n=n):
                    f = rep / f'{nom_fichier(k, n)}.png'
                    pg.locator('#ex-boite .ex-stage').screenshot(path=str(f))
                    faits.append((k, f))
                    noter(f'{lg} {th} {LARGEUR} px, {etiquette(k, n).lower()}', pg.evaluate(DEBORDS, False))

                S.parcourir(pg, voulus, total, capt)
                for i, lot in enumerate(lots(faits)):
                    planche([f for _, f in lot], [f'{etiquette(k, n)} · {lg.upper()} · {th}' for k, _ in lot],
                            sortie / 'planches' / f'{lg}-{th}-{lot[0][0] + 1:02d}-{lot[-1][0] + 1:02d}.png')
                erreurs_js.update(err)
                ctx.close()

            T, voulus = textes[lg]
            n = len(T['ecrans'])
            total = n + 1 + (1 if T['plus'] else 0)
            # Plein écran.
            if not a.sans_plein_ecran:
                for (w, h) in PLEINS:
                    ctx, pg, err = S.page(lg, th_unique, (w, h))
                    try:
                        pg.click('#ex-boite [data-x="fs"]', timeout=3000)
                        pg.wait_for_function('document.fullscreenElement', timeout=3000)
                    except Exception:
                        pg.evaluate(PLEIN)
                        simule.add(f'{w}×{h}')
                    pg.wait_for_timeout(300)

                    def capt_fs(k, pg=pg, w=w, h=h, lg=lg, n=n):
                        pg.screenshot(path=str(sortie / 'plein-ecran' / f'{lg}-{w}x{h}-{nom_fichier(k, n)}.png'))
                        noter(f'{lg} plein écran {w}×{h}, {etiquette(k, n).lower()}', pg.evaluate(DEBORDS, True))

                    S.parcourir(pg, voulus, total, capt_fs)
                    erreurs_js.update(err)
                    ctx.close()
            # Téléphone.
            if not a.sans_telephone:
                ctx, pg, err = S.page(lg, th_unique, TELEPHONE, telephone=True)
                faits = []

                def capt_tel(k, pg=pg, lg=lg, n=n, faits=faits):
                    f = sortie / 'telephone' / f'{lg}-{nom_fichier(k, n)}.png'
                    pg.locator('#ex-boite').screenshot(path=str(f))
                    faits.append((k, f))
                    noter(f'{lg} téléphone {TELEPHONE[0]} px, {etiquette(k, n).lower()}', pg.evaluate(DEBORDS, False))

                S.parcourir(pg, voulus, total, capt_tel)
                for lot in lots(faits):
                    planche([f for _, f in lot], [f'{etiquette(k, n)} · {lg.upper()}' for k, _ in lot],
                            sortie / 'planches' / f'{lg}-telephone-{lot[0][0] + 1:02d}-{lot[-1][0] + 1:02d}.png',
                            cote_a_cote=True)
                erreurs_js.update(err)
                ctx.close()
        nav.close()
    srv.shutdown()

    # Texte en Markdown et comparaison FR / EN.
    for lg, (T, voulus) in textes.items():
        (sortie / f'texte-{lg}.md').write_text(markdown(d, lg, T, voulus), encoding='utf-8')
    ecarts = comparer(textes['fr'][0], textes['en'][0]) if {'fr', 'en'} <= textes.keys() else []

    T0 = next(iter(textes.values()))[0]
    rapport += [f'# « Expliquer le jeu » · {d}', '',
                f'{len(T0["ecrans"])} écrans, puis aide-mémoire' + (' et « Pour plus tard »' if T0['plus'] else '') +
                (f' · écrans demandés : {a.ecrans}' if a.ecrans else '') + '.',
                '*Brouillon (EXPL.chantier contourné pour la capture).*' if T0['chantier'] else '', '',
                '## Débordements', '']
    if problemes:
        for ou, pbs in problemes.items():
            rapport.append(f'- **{ou}** : {" ; ".join(pbs)}')
    else:
        rapport.append('Aucun.')
    if simule:
        rapport.append(f'\n*Plein écran simulé ({", ".join(sorted(simule))}) : le navigateur a refusé le vrai.*')
    rapport += ['', '## Anglais', '']
    rapport += [f'- {e}' for e in ecarts] if ecarts else (['Rien à signaler.'] if 'en' in textes and 'fr' in textes else ['Non comparé (une seule langue).'])
    if erreurs_js:
        rapport += ['', '## Erreurs JavaScript', ''] + [f'- {e}' for e in sorted(erreurs_js)]
    rapport += ['', '## Fichiers', '', f'Dossier : {sortie}', '']
    rapport += [f'- planches/{f.name}' for f in sorted((sortie / 'planches').glob('*.png'))]
    rapport += [f'- texte-{lg}.md' for lg in textes]
    (sortie / 'rapport.md').write_text('\n'.join(rapport) + '\n', encoding='utf-8')

    print('\n'.join(rapport))


if __name__ == '__main__':
    main()
