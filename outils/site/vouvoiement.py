#!/usr/bin/env python3
"""Passe un texte français du tutoiement au vouvoiement (consigne du site : on vouvoie toujours le lecteur).

usage (depuis la racine du dépôt) :
  python3 outils/site/vouvoiement.py scan  <fichier>...   liste ce qui reste au tutoiement (tu, ton, ta, tes, toi, te, -tu, impératifs connus)
  python3 outils/site/vouvoiement.py apply <fichier>...   convertit sur place et affiche chaque phrase modifiée (avant → après)
  python3 outils/site/vouvoiement.py verbes               affiche la table de conjugaison utilisée

La conversion ne touche que des formes reconnues (table VERBES, liste IMPERATIFS) ; ce qui reste
est listé par « scan » et doit être corrigé à la main. Relire toujours la sortie d'« apply ».
Les impératifs qui sont aussi des noms (Défausse, Pioche, Garde…) ne sont convertis qu'en début
de phrase ou d'élément suivis d'un mot qui n'est pas « : » (« Défausse : 3 » reste un nom).
"""
import re, sys

L = r"a-zàâäçéèêëîïôöûùüÿœ"
# forme « tu » -> forme « vous » : exceptions ; le reste suit les règles de conj()
IRR = {
 'as':'avez','es':'êtes','vas':'allez','peux':'pouvez','veux':'voulez','dois':'devez','fais':'faites','refais':'refaites',
 'sais':'savez','vois':'voyez','prends':'prenez','reprends':'reprenez','comprends':'comprenez','mets':'mettez','remets':'remettez',
 'viens':'venez','reviens':'revenez','deviens':'devenez','tiens':'tenez','retiens':'retenez','obtiens':'obtenez','détiens':'détenez',
 'acquiers':'acquérez','reçois':'recevez','résous':'résolvez','dis':'dites','lis':'lisez','écris':'écrivez','décris':'décrivez',
 'atteins':'atteignez','perds':'perdez','vends':'vendez','rends':'rendez','réponds':'répondez','attends':'attendez','entends':'entendez',
 'bats':'battez','combats':'combattez','sers':'servez','pars':'partez','sors':'sortez','dors':'dormez','cours':'courez',
 'construis':'construisez','produis':'produisez','réduis':'réduisez','conduis':'conduisez','connais':'connaissez','crois':'croyez',
 'joueras':'jouerez','voies':'voyiez','bois':'buvez','vis':'vivez','suis':'suivez',
}
IR_ISS = {'choisis','finis','remplis','agis','réunis','établis','fournis','saisis','enrichis','franchis','bâtis','investis','accomplis','réussis','grandis','unis','définis'}

E_MUET = ('achet', 'lev', 'men', 'pes', 'sem', 'gel')   # acheter, (en)lever, mener… : è -> e ; sinon è -> é (régler, posséder)
DOUBLE = {'appellez': 'appelez', 'rappellez': 'rappelez', 'épellez': 'épelez', 'jettez': 'jetez', 'rejettez': 'rejetez'}
def accent(r):
    m = re.search(r'è([^aeiouéèêy]+)ez$', r)
    if m:
        stem = r[:m.start()]
        r = stem + ('e' if any((stem + 'e' + m.group(1)).endswith(x) for x in E_MUET) else 'é') + m.group(1) + 'ez'
    return DOUBLE.get(r, r)

def conj(f):
    """Forme du présent/futur/conditionnel avec « tu » -> forme avec « vous »."""
    low = f.lower()
    if low in IRR: r = IRR[low]
    elif low in IR_ISS: r = low + 'sez'
    elif low.endswith('rais'): r = low[:-3] + 'iez'          # conditionnel : pourrais -> pourriez
    elif low.endswith('ras'): r = low[:-1] + 'ez'            # futur
    elif re.search(r'(ai|oi|ui)es$', low): r = low[:-3] + 'yez'  # paies -> payez, renvoies -> renvoyez
    elif low.endswith('es'): r = low[:-1] + 'z'              # 1er groupe : joues -> jouez
    else: return None
    r = accent(r)
    return r[0].upper() + r[1:] if f[0].isupper() else r

# impératif singulier -> pluriel (verbes rencontrés sur le site)
IMP_IRR = {'va':'allez','fais':'faites','refais':'refaites','prends':'prenez','reprends':'reprenez','mets':'mettez','remets':'remettez',
 'choisis':'choisissez','construis':'construisez','produis':'produisez','vends':'vendez','retiens':'retenez','tiens':'tenez',
 'reviens':'revenez','viens':'venez','dis':'dites','lis':'lisez','sois':'soyez','aie':'ayez','sache':'sachez','vois':'voyez',
 'remplis':'remplissez','finis':'finissez','résous':'résolvez','reçois':'recevez','acquiers':'acquérez','perds':'perdez',
 'rends':'rendez','réponds':'répondez','attends':'attendez','écris':'écrivez','décris':'décrivez','suis':'suivez','sers':'servez',
 'prévois':'prévoyez','réfléchis':'réfléchissez','saisis':'saisissez','soumets':'soumettez','répands':'répandez','étends':'étendez'}
def imp(w):
    low = w.lower()
    if low in IMP_IRR: r = IMP_IRR[low]
    elif re.search(r'(ai|oi|ui)e$', low): r = low[:-2] + 'yez'   # paie -> payez, renvoie -> renvoyez, appuie -> appuyez
    elif low.endswith('e'): r = low + 'z'
    else: return None
    r = accent(r)
    return r[0].upper() + r[1:] if w[0].isupper() else r

# verbes du 1er groupe dont l'impératif est reconnu (radical + e) ; les ambigus avec un nom sont dans AMBIG
IMP_ER = set('''accepte achète acquitte active additionne ajoute annonce appuie applique archive arrête assure attribue avance
cache calcule change charge cherche choisisse clique coche commence compare compense conserve continue coche
consulte considère déclenche décide défausse dépense déplace dépose désigne détermine développe dispose distribue donne
écarte efface élimine empile enlève entre envoie épuise essaie essaye étale évite examine exile
expédie forme gagne garde glisse garde ignore imagine indique innove installe joue lance laisse
lève limite mélange mémorise montre note numérote oublie ouvre paie passe pense pioche place
pose prépare présente profite prête rappelle range recommence recompte recrute regarde règle rejoue relance
relis remarque remplace remonte renvoie repère replace répète repose reste retire retourne retrouve révèle
épure reconnecte réessaie abandonne observe termine aligne ajuste récupère respecte simule génère déclare accumule
saute sélectionne sépare suis surveille tape tire touche tourne trie utilise valide vérifie vide
vise vole'''.split())
AMBIG = {'défausse','pioche','garde','joue','note','pose','reste','vide','tire','place','marque','change','compte','forme','passe','règle','touche','mise','montre','cache','lance','range','tape','vole'}

def _imp_ez():
    global IMP_EZ
    IMP_EZ = {imp(w) for w in IMP_ER | set(IMP_IRR) if imp(w)} | {'pouvez'} - {'pouvez'}

START = r"(?:^|(?<=[`'\">(«])|(?<=[.!?:;]\s)|(?<=<li>)|(?<=<p>)|(?<=\n))"

IMP_EZ = None
def is_imp_ez(seg):
    """La phrase commence-t-elle par un impératif converti (« Choisissez… », « Appuyez-vous… ») ?"""
    w = re.match(r"([A-ZÀ-Ýa-zà-ÿ]+ez)", seg).group(1).lower()
    return w in IMP_EZ

def convert(s):
    out = s
    clit = r"(?:(?:ne |n'|n\\')?(?:(?:le|la|les|lui|leur|y|en) |(?:l|y|en)(?:'|\\'))*)"
    # tu + (ne) (te/t') (clitiques) + verbe
    def rep_tu(m):
        T, neg, refl, cl, tag, v = m.group(1), m.group(2) or '', m.group(3), m.group(4) or '', m.group(5), m.group(6)
        c = conj(v)
        if not c: return m.group(0)
        vous = 'Vous' if T == 'Tu' else 'vous'
        if refl: refl_v = 'vous '
        else: refl_v = ''
        neg = neg.replace("n'", 'ne ').replace("n\\'", 'ne ') if refl else neg
        if neg in ("n'", "n\\'"): pass
        return f"{vous} {neg}{refl_v}{cl}{tag}{c}"
    out = re.sub(rf"(?<!-)\b(Tu|tu) (ne |n'|n\\')?(te |t'|t\\')?((?:(?:le|la|les|lui|leur|y|en) |(?:l|en|y)(?:'|\\'))*)((?:<b>|<i>)?)([{L}]+)\b", rep_tu, out)
    # inversion : peux-tu, Es-tu
    out = re.sub(rf"\b([A-Za-zÀ-ÿ]+)-tu\b", lambda m: (lambda c: f"{c}-vous" if c else m.group(0))(conj(m.group(1))), out)
    # possessifs
    out = re.sub(r"(?<![\w$.])([Tt])on(?=\s+(?:<b>|<i>)?[" + L + r"A-ZÀ-Ý0-9])", lambda m: 'Votre' if m.group(1)=='T' else 'votre', out)
    out = re.sub(r"(?<![\w$.])([Tt])a(?=\s+(?:<b>|<i>)?[" + L + r"A-ZÀ-Ý0-9])", lambda m: 'Votre' if m.group(1)=='T' else 'votre', out)
    out = re.sub(r"(?<![\w$.])([Tt])es(?=\s+(?:<b>|<i>)?[" + L + r"A-ZÀ-Ý0-9])", lambda m: 'Vos' if m.group(1)=='T' else 'vos', out)
    out = re.sub(r"\b(t)iens\b(?=[\s.,])", r"\1iens", out)
    # pronoms
    out = re.sub(r"(?<![\w-])([Tt])oi(?=[\s.,!?:;)<`'\"-]|$)", lambda m: 'Vous' if m.group(1)=='T' else 'vous', out)
    out = re.sub(r"(?<![\w-])te (?=[" + L + r"])", "vous ", out)
    out = re.sub(r"(?<![\w-])t(?:'|\\')(?=[aeiouéèêhà])", "vous ", out)
    # impératifs : seulement dans une vraie phrase (terminée par . ! ? : ;), pas dans un nom de carte ou un libellé
    def tail(pos):
        t = []
        i = pos
        while i < len(out_[0]):
            ch = out_[0][i]
            if ch == '<':
                m2 = re.match(r"</?(?:b|i|em|strong|span[^>]*|a[^>]*)>", out_[0][i:])
                if m2: i += m2.end(); continue
                break
            if ch in '`"\n': break
            if ch == "'" and out_[0][i-1] != '\\' and not (out_[0][i-1].isalpha() and i + 1 < len(out_[0]) and out_[0][i+1].isalpha()): break
            t.append(ch); i += 1
        return ''.join(t)
    def known(w): return w.lower() in IMP_IRR or w.lower() in IMP_ER
    def rep_imp(m):
        w, suf = m.group(1), m.group(2) or ''
        if not known(w): return m.group(0)
        rest = tail(m.end())
        if not re.search(r"[.!?;:…]", rest): return m.group(0)
        if w.lower() in AMBIG and not suf and (re.match(r"\s*:", rest) or not re.match(r"\s+\S", rest)): return m.group(0)
        r = imp(w)
        if not r: return m.group(0)
        # verbes coordonnés dans la même phrase : « Générez un marché, joue, puis clique »
        sent = re.split(r"(?<=[.!?])\s", rest, maxsplit=1)[0]
        coord.append((m.end(), m.end() + len(sent)))
        return r + suf.replace('-toi', '-vous')
    out_ = [out]
    coord = []
    out = re.sub(START + r"([A-ZÀ-Ý][" + L + r"]+)(-toi|-le|-la|-les|-lui|-leur|-en|-y|-moi)?\b(?!-)", rep_imp, out)
    # lowercase après « : » (« Plan de jeu : achète ») pour les verbes non ambigus
    out_ = [out]
    out = re.sub(r"(?<=: )([" + L + r"]+)(-toi|-le|-la|-les|-lui|-leur|-en|-y)?\b(?!-)", lambda m: rep_imp(m) if m.group(1) not in AMBIG else m.group(0), out)
    out = re.sub(r"\b([" + L + r"]+)(-toi)\b", lambda m: (imp(m.group(1)) or m.group(1)) + '-vous', out)
    # coordonnés : dans une phrase qui contient un impératif converti, les verbes reliés par « , » / « puis » / « et » / « ou »
    ezw = "|".join(sorted(IMP_EZ, key=len, reverse=True))
    SUF = r"(?:-vous|-le|-la|-les|-lui|-leur|-en|-y)?"
    pat = re.compile(r"(\b(?:" + ezw + r")" + SUF + r"\b[^.!?`\"\n]*?(?:[,;]\s+(?:(?:puis|et|ou|alors)\s+)?|\s(?:puis|et|ou|alors)\s+))([" + L + r"]+)(-toi|-le|-la|-les|-lui|-leur|-en|-y)?\b(?!-)", re.I)
    pos = 0
    while True:
        m = pat.search(out, pos)
        if not m: break
        w, suf = m.group(2), m.group(3) or ''
        if known(w) and imp(w):
            rep = imp(w) + suf.replace('-toi', '-vous')
            out = out[:m.start(2)] + rep + out[m.end(3) if m.group(3) else m.end(2):]
        pos = m.start(2)
    out = re.sub(rf"\b([Vv]ous seule?s? )([{L}]+es)\b", lambda m: m.group(1) + (conj(m.group(2)) or m.group(2)), out)
    return out

VERBS = None
MARK = re.compile(r"\b(?:[Tt]u|[Tt]on|[Tt]a|[Tt]es|[Tt]oi|[Tt]e)\b(?=[\s.,!?:;)<`'\"-])|\bt(?:'|\\')(?=[aeiouéèêhà])|-tu\b|-toi\b")

def sentences(text):
    return re.split(r"(?<=[.!?])\s+|(?=<li>)|(?=<p>)|`|\n", text)

def main():
    _imp_ez()
    if len(sys.argv) < 2: print(__doc__); return
    cmd, files = sys.argv[1], sys.argv[2:]
    if cmd == 'verbes':
        for k in sorted(IRR): print(k, '->', IRR[k])
        return
    for f in files:
        s = open(f, encoding='utf-8').read()
        if cmd == 'scan':
            for i, line in enumerate(s.split('\n'), 1):
                for m in MARK.finditer(line):
                    if re.match(r"\s*[=.(\[]", line[m.end():m.end()+2]): continue   # code
                    print(f"{f}:{i}: …{line[max(0,m.start()-60):m.end()+60]}…")
                for m in re.finditer(r"\b(?:puis|et|ou|alors) ([" + L + r"]+)\b", line):
                    if m.group(1) in IMP_ER or m.group(1) in IMP_IRR:
                        print(f"{f}:{i}: [puis/et ?] …{line[max(0,m.start()-70):m.end()+50]}…")
        elif cmd == 'apply':
            n = convert(s)
            if n != s:
                a, b = s.split('\n'), n.split('\n')
                for x, y in zip(a, b):
                    if x != y:
                        for p, q in zip(sentences(x), sentences(y)):
                            if p != q: print('-', p.strip()[:400]); print('+', q.strip()[:400])
                open(f, 'w', encoding='utf-8').write(n)
            print(f, 'converti' if n != s else 'inchangé', file=sys.stderr)

if __name__ == '__main__': main()
