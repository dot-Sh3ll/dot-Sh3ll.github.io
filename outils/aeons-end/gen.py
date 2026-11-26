"""Build the Aeon's End data blocks (FR and EN) for the market app.
Existing hand-made entries (names, effects, power, tags, profiles) are kept as they are;
the rest comes from the aer-data dataset plus the fr*.tsv translations."""
import json, re, sys
from common import *

import os
HERE = os.path.dirname(os.path.abspath(__file__))


def sources(lang):
    """tout le contenu d'une langue (morceaux du format commun, contenu/<lang>/), pour y lire RAW, NEM, MAGES"""
    d = os.path.join(HERE, 'contenu', lang)
    return '\n'.join(open(os.path.join(d, f), encoding='utf-8').read() for f in sorted(os.listdir(d)))


fr_html = sources('fr')
en_html = sources('en')

ROW = re.compile(r'^\["(\w+)","(Gem|Relic|Spell)","(\w+)",(\d+),("(?:[^"\\]|\\.)*"),("(?:[^"\\]|\\.)*"),("(?:[^"\\]|\\.)*"),(\d),(\[[^\]]*\])\],?$', re.M)


def rows(h):
    out = {}
    for m in ROW.finditer(h):
        out[m.group(1)] = dict(id=m.group(1), type=m.group(2), box=m.group(3), cost=int(m.group(4)),
                               name=json.loads(m.group(5)), en=json.loads(m.group(6)), fx=json.loads(m.group(7)),
                               pow=int(m.group(8)), tags=json.loads(m.group(9)))
    return out


FR_OLD, EN_OLD = rows(fr_html), rows(en_html)
assert len(FR_OLD) == 125 and len(EN_OLD) == 125, (len(FR_OLD), len(EN_OLD))

# --- translations for new cards
TR = {}
for i in range(1, 5):
    for line in open(os.path.join(HERE, f'fr{i}.tsv'), encoding='utf-8'):
        if line.strip():
            k, n, fx = line.rstrip('\n').split('\t')
            TR[k] = (n, fx)


def appid(src):
    return IDFIX.get(src) or re.sub(r'\W', '', src)


# --- heuristics for new cards (power 2-4, tags)
def tags_for(fx):
    t = fx.lower()
    tg = []
    if 'charge' in t: tg.append('ch')
    if re.search(r'breach|focus', t): tg.append('br')
    if re.search(r'destroy (a|up to|any|the top|each other|.*cards? in)', t) and not re.fullmatch(r'.*destroy this\.?', t): tg.append('thin')
    if re.search(r'\bally\b|allies|any player|each player', t): tg.append('coop')
    if re.search(r'supply|gain a (card|spell)|gain two trinkets|develop', t): tg.append('sup')
    if re.search(r'gains? \d+ life|life\b', t): tg.append('surv')
    if re.search(r'minion|silence', t): tg.append('min')
    if re.search(r'costs? 0|0 æ', t): tg.append('zero')
    if 'turn order' in t: tg.append('turn')
    if re.search(r'\becho\b|cast (any|an|one of)[^.]*prepped spell|additional damage for each|link \(|three times|cast it again', t): tg.append('amp')
    if re.search(r'(six|seven|eight|\d+) or more (other )?cards in (your|their) discard', t): tg.append('mem')
    return tg


def power_for(c, fx):
    t = fx.lower()
    if c['type'] == 'Spell':
        dmg = max([int(x) for x in re.findall(r'deal (\d+) damage', t)] or [0])
        extra = len(re.findall(r'\|', fx)) + (1 if '~' in fx else 0)
        expect = {0: 1, 1: 1.5, 2: 1.5, 3: 2, 4: 3, 5: 3.5, 6: 4, 7: 4.5, 8: 5, 9: 6}.get(c['cost'], 5)
        v = dmg + 0.7 * extra - expect
    elif c['type'] == 'Gem':
        ae = max([int(x) for x in re.findall(r'gain (\d+) æ', t)] or [0])
        extra = len(re.findall(r'\|', fx)) + (1 if '~' in fx else 0)
        expect = {2: 1.5, 3: 2, 4: 2.5, 5: 3, 6: 3.5, 7: 4}.get(c['cost'], 4)
        v = ae + 0.6 * extra - expect
    else:
        v = 0
    return max(2, min(4, round(3 + v)))


# --- cards
cards_fr, cards_en, seen = [], [], set()
for c in market():
    cid = appid(c['src'])
    if cid in seen:
        continue
    seen.add(cid)
    if cid in FR_OLD:
        o, e = FR_OLD[cid], EN_OLD[cid]
        en_name = c['en'] if (not o['en'] or c['src'] != cid) else o['en']
        box = c['box']
        if o['box'] != box:
            print('box fix', cid, o['box'], '->', box, file=sys.stderr)
        cards_fr.append([cid, o['type'], box, o['cost'], o['name'], en_name, o['fx'], o['pow'], o['tags']])
        cards_en.append([cid, o['type'], box, o['cost'], en_name, en_name, e['fx'], o['pow'], o['tags']])
        if o['cost'] != c['cost'] or o['type'] != c['type']:
            print('DIFF', cid, o['cost'], c['cost'], o['type'], c['type'], file=sys.stderr)
    else:
        n, fx = TR[cid]
        tg, pw = tags_for(c['fxen']), power_for(c, c['fxen'])
        cards_fr.append([cid, c['type'], c['box'], c['cost'], n, c['en'], fx, pw, tg])
        cards_en.append([cid, c['type'], c['box'], c['cost'], c['en'], c['en'], c['fxen'], pw, tg])
missing = set(TR) - seen
assert not missing, missing
assert set(FR_OLD) <= seen, set(FR_OLD) - seen

# --- boxes
boxes = [(k, f, e, w, lg) for (_, k, f, e, w, lg) in BOXDEF if f]

# --- nemeses and mages: existing entries (FR/EN pairs zipped by position)
def lst(h, name):
    m = re.search(r'const ' + name + r' = \[\n(.*?)\n\];', h, re.S)
    return [json.loads('[' + x + ']') for x in re.findall(r'\[(".*?)\](?=,\s*\[|,?\s*$)', m.group(1), re.M)]


def parse_list(h, name):
    body = re.search(r'const ' + name + r' = \[\n(.*?)\n\];', h, re.S).group(1)
    body = re.sub(r'\{(\w+):', r'{"\1":', body)
    body = re.sub(r',(\w+):', r',"\1":', body)
    return json.loads('[' + body + ']')


NEM_FR, NEM_EN = parse_list(fr_html, 'NEM'), parse_list(en_html, 'NEM')
MAG_FR, MAG_EN = parse_list(fr_html, 'MAGES'), parse_list(en_html, 'MAGES')
assert len(NEM_FR) == len(NEM_EN) and len(MAG_FR) == len(MAG_EN)

OLD_NEM_EN_FIX = {'The Infector': 'The Infecter', 'The Scourge': 'The Blight', 'Thrice-Dead Prophet': 'Thrice Dead Prophet'}
OLD_BOX = {"Le commencement": 'BASE', "Guerre Éternelle": 'WE', "Une Ère Nouvelle": 'NA', "Retour à Gravehold": 'RTG',
           "Ténèbres d'ailleurs": 'OD', "De Vieux Souvenirs": 'TA', "Le Commencement": 'ATD'}
norm = lambda s: re.sub(r'[^a-z]', '', s.lower())

NEM_FRNAME = {
    'The Terror in Brass': "La Terreur d'airain", 'Twice-Dead Prophet': 'Prophète aux deux Trépas', 'Oracle of Filth': 'Oracle de la Fange',
    'Wayward Reflection': "Reflet de l'Égaré", 'Crooked Mask': 'Masque Tordu', 'Clouded Mesmer': 'Hypnotiseur voilé', 'Necroswarm': 'Nécro-essaim',
    'Bishop of Scrolls': 'Évêque des Parchemins', 'Bishop: Returned': 'Évêque : Revenu', 'Fate Shepherd': 'Berger du Destin',
    'Griefweaver': 'Tisse-Chagrin', 'Mist Revealed': 'Mist Révélée', 'Mother of Rust': 'Mère de la Rouille', 'Paradox of Bone': "Paradoxe d'Os",
    'Paradox of Myth': 'Paradoxe du Mythe', 'Paradox of Myth and Bone': "Paradoxe du Mythe et de l'Os", 'Rust Amalgam': 'Amalgame de Rouille',
    'Rust Superion': 'Superion de Rouille', 'The Endless Decay': 'La Décrépitude sans fin', 'Risen Thrall': 'Serf Ressuscité',
    'Stonemonger': 'Maître des Pierres', 'Infested Mutation': 'Mutation infestée', 'Erythiza, Consumed': 'Erythiza la Consumée',
    'Herald Of The End': 'Héraut de la Fin', 'The Changeling Nest': 'Le Nid des Changeformes', "Corruption's Core": 'Cœur de la Corruption',
    'The Burning Kor': "Kor l'Ardent", 'The Reliquary': 'Le Reliquaire', 'Absorbing Wraith': 'Spectre absorbant',
    'Rampaging Vin': 'Vin le Ravageur', 'The Timeless': "L'Intemporel", 'Wayward One': "L'Égaré",
}
MAGE_FRNAME = {'Kiri and Phoenix': 'Kiri et Phénix', 'Ohat And Ulgimor': 'Ohat et Ulgimor'}
NEM_ENNAME = {'Prince Of Gluttons': 'Prince of Gluttons', 'Knight Of Shackles': 'Knight of Shackles', 'Maiden Of Thorns': 'Maiden of Thorns',
              'Magus Of Cloaks': 'Magus of Cloaks', 'Thief Of Dreams': 'Thief of Dreams', 'Fountain Of Souls': 'Fountain of Souls',
              'Herald Of The End': 'Herald of the End', 'Thrice Dead Prophet': 'Thrice-Dead Prophet'}
MAGE_ENNAME = {'Ohat And Ulgimor': 'Ohat and Ulgimor'}

old_nem = {}
for f, e in zip(NEM_FR, NEM_EN):
    box = OLD_BOX[f[1]]
    old_nem[(box, norm(OLD_NEM_EN_FIX.get(e[0], e[0])))] = (f, e)
old_mag = {}
for f, e in zip(MAG_FR, MAG_EN):
    box = OLD_BOX[f[1]]
    base = {'Vestige': 'Remnant'}.get(e[0], re.sub(r' \(.*\)$', '', e[0]))
    old_mag[(box, norm(base))] = (f, e)

BOXFR = {k: f for k, f, e, w, lg in boxes}
BOXEN = {k: e for k, f, e, w, lg in boxes}


def build(kind):
    out_fr, out_en, lvl_fr, lvl_en = [], [], {}, {}
    used_fr, used_en, used_ids = set(), set(), set()
    oldmap = old_nem if kind == 'nemeses' else old_mag
    # pass 1: names kept from the current app, so the log keeps matching
    for o in oldmap.values():
        used_fr.add(o[0][0]); used_en.add(o[1][0])
    hits = set()
    for folder, key, *_ in BOXDEF:
        for x in ENG[folder][kind]:
            if (key, x['id']) in used_ids:
                continue
            used_ids.add((key, x['id']))
            frd = {y['id']: y['name'] for y in FRD.get(folder, {}).get(kind, [])}
            o = oldmap.get((key, norm(x['name'])))
            if o:
                hits.add((key, norm(x['name'])))
                f, e = o
                fr_name, en_name = f[0], e[0]
                if en_name.startswith('Brama (') or en_name.startswith('Mazahaedron ('):
                    en_name = en_name.replace('The Beginning', 'The Descent')
                if en_name in OLD_NEM_EN_FIX:
                    en_name = OLD_NEM_EN_FIX[en_name].replace('Thrice Dead', 'Thrice-Dead')
                rest_fr, rest_en = f[2:], e[2:]
            else:
                en_base = (NEM_ENNAME if kind == 'nemeses' else MAGE_ENNAME).get(x['name'], x['name'])
                fr_base = frd.get(x['id']) or (NEM_FRNAME if kind == 'nemeses' else MAGE_FRNAME).get(x['name']) or en_base
                fr_base = fr_base.replace("L'Egaré", "L'Égaré")
                fr_name = fr_base if fr_base not in used_fr else f'{fr_base} ({BOXFR[key]})'
                en_name = en_base if en_base not in used_en else f'{en_base} ({BOXEN[key]})'
                used_fr.add(fr_name); used_en.add(en_name)
                rest_fr = [None, ''] if kind == 'nemeses' else [[], '']
                rest_en = rest_fr
            out_fr.append([fr_name, key] + list(rest_fr))
            out_en.append([en_name, key] + list(rest_en))
            if kind == 'nemeses':
                lvl_fr[fr_name] = x.get('expeditionRating') or 0
                lvl_en[en_name] = x.get('expeditionRating') or 0
    dropped = [o[0][0] for k, o in oldmap.items() if k not in hits]
    return out_fr, out_en, lvl_fr, lvl_en, dropped


nem_fr, nem_en, lvl_fr, lvl_en, nem_drop = build('nemeses')
mag_fr, mag_en, _, _, mag_drop = build('mages')
print('dropped nemeses:', nem_drop, 'dropped mages:', mag_drop, file=sys.stderr)

J = lambda v: json.dumps(v, ensure_ascii=False, separators=(',', ':'))


def js(v):
    s = J(v)
    return re.sub(r'"(want|avoid|big)":', r'\1:', s)


def block(lang):
    cards = cards_fr if lang == 'fr' else cards_en
    nem, mag, lvl = (nem_fr, mag_fr, lvl_fr) if lang == 'fr' else (nem_en, mag_en, lvl_en)
    bi = 1 if lang == 'fr' else 2
    order = {k: i for i, (k, *_r) in enumerate(boxes)}
    cards = sorted(cards, key=lambda r: (order[r[2]], ['Gem', 'Relic', 'Spell'].index(r[1]), r[3]))
    a = ['const RAW = [']
    last = None
    for r in cards:
        if r[2] != last:
            a.append('// ' + (BOXFR if lang == 'fr' else BOXEN)[r[2]])
            last = r[2]
        a.append(J(r) + ',')
    a[-1] = a[-1].rstrip(',')
    a.append('];')
    a.append('const CARDS = RAW.map(r=>({id:r[0],type:r[1],box:r[2],cost:r[3],fr:r[4],en:r[5],fx:r[6],pow:r[7],tags:r[8]}));')
    a.append('')
    a.append('/* [clé, nom, vague, boîte Legacy (contenu à débloquer, masqué par défaut)] */')
    a.append('const BOXES = [')
    a.append(',\n'.join('  ' + J([b[0], b[bi], b[3], b[4]]) for b in boxes))
    a.append('];')
    a.append('const BOXNAME = Object.fromEntries(BOXES.map(b=>[b[0],b[1]])), BOXLEG = new Set(BOXES.filter(b=>b[3]).map(b=>b[0]));')
    data = '\n'.join(a)
    n = ['const NEM = [']
    n.append(',\n'.join('  ' + js(x) for x in nem))
    n.append('];')
    n.append('const MAGES = [')
    n.append(',\n'.join('  ' + js(x) for x in mag))
    n.append('];')
    nemblock = '\n'.join(n)
    lv = 'const NEMLVL=' + J(lvl) + ';'
    return data, nemblock, lv


out = {}
for lang in ('fr', 'en'):
    out[lang] = block(lang)
json.dump(out, open(os.path.join(HERE, 'blocks.json'), 'w', encoding='utf-8'), ensure_ascii=False)
print('cards', len(cards_fr), 'nem', len(nem_fr), 'mages', len(mag_fr), 'boxes', len(boxes), file=sys.stderr)
