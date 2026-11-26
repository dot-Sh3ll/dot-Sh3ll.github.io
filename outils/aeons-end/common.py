import json, re, html

import os
A = json.load(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'aer.json'), encoding='utf-8'))
ENG, FRD = A['ENG'], A['FR']

# dataset folder -> (app box key, FR name, EN name, wave, legacy?)
BOXDEF = [
    ('aeonsEnd', 'BASE', "Aeon's End (boîte de base)", "Aeon's End (base game)", 1, False),
    ('theDepths', 'DE', 'Les Profondeurs', 'The Depths', 1, False),
    ('theNameless', 'NL', 'Les Sans Nom', 'The Nameless', 1, False),
    ('warEternal', 'WE', 'Guerre Éternelle', 'War Eternal', 2, False),
    ('theVoid', 'TV', 'Le Vide', 'The Void', 2, False),
    ('outerDark', 'OD', "Ténèbres d'ailleurs", 'The Outer Dark', 2, False),
    ('legacy', 'LE', "Aeon's End Legacy", "Aeon's End: Legacy", 3, True),
    ('buriedSecrets', 'BS', 'Secrets enfouis', 'Buried Secrets', 3, False),
    ('theNewAge', 'NA', 'Une Ère Nouvelle', 'The New Age', 4, False),
    ('intoTheWild', 'IW', "À l'état sauvage", 'Into the Wild', 4, False),
    ('shatteredDreams', 'SD', 'Rêves brisés', 'Shattered Dreams', 4, False),
    ('theAncients', 'TA', 'De Vieux Souvenirs', 'The Ancients', 4, False),
    ('outcasts', 'OC', 'Les Parias', 'Outcasts', 5, False),
    ('returnToGravehold', 'RTG', 'Retour à Gravehold', 'Return to Gravehold', 5, False),
    ('southernVillage', 'SV', 'Le Village du Sud', 'Southern Village', 5, False),
    ('legacyOfGravehold', 'LOG', 'Legacy of Gravehold', 'Legacy of Gravehold', 6, True),
    ('theRuins', 'RU', 'The Ruins', 'The Ruins', 6, True),
    ('pastAndFuture', 'PAF', 'Past and Future', 'Past and Future', 7, False),
    ('evolutions', 'EVO', 'Evolution', 'Evolution', 7, False),
    ('origins', 'ORI', 'Origins', 'Origins', 7, False),
    ('theDescent', 'ATD', 'Le Commencement', 'The Descent', 8, False),
    ('theAbyss', 'AB', 'Les Abysses', 'The Abyss', 8, False),
    ('theCaverns', 'TC', 'Les Cavernes', 'The Caverns', 8, False),
    ('talesOfOldGravehold', 'TOG', 'Tales of Old Gravehold', 'Tales of Old Gravehold', 8, False),
    ('beyondTheBreach', 'BTB', 'Beyond the Breach', 'Beyond the Breach', 9, False),
    ('theReturned', 'TR', 'The Returned', 'The Returned', 9, False),
    ('theSurface', 'TS', 'The Surface', 'The Surface', 9, False),
    ('promos', 'PR', 'Cartes promo', 'Promo cards', 0, False),
    ('BTBPromos', 'PR', None, None, 0, False),
    ('PFPromos', 'PR', None, None, 0, False),
    ('TDPromos', 'PR', None, None, 0, False),
]
FOLDER2KEY = {d[0]: d[1] for d in BOXDEF}
# dataset ids that the app already uses under another id
IDFIX = {'Frozen Light': 'FrozenLight', 'Inscrutable Artifact': 'InscrutableArtifact', 'Encased Fossil': 'EncasedFossil', 'AbacusOfIgnition': 'CombustionAbacus', 'RockLauncher': 'GemSlingshot',
         'IlluminatingFlame': 'LightingFlame', 'ChronalArc': 'TemporalArc', 'Tethered Darts': 'TetheredDarts'}
TYPES = ('Gem', 'Relic', 'Spell')


def clean(h):
    """dataset HTML effect -> app format ('|' new line, '~' OR)."""
    s = h.replace('\n', ' ')
    s = re.sub(r'<span class="aether">\s*&AElig;\s*</span>', 'Æ', s)
    s = s.replace('&AElig;', 'Æ')
    s = re.sub(r'<span class="or">\s*(OR|OU)\s*</span>', ' ~ ', s)
    s = re.sub(r'<br\s*/?>', ' | ', s)
    s = re.sub(r'</p>\s*<p[^>]*>', ' | ', s)
    s = re.sub(r'<span class="hint">\s*(.*?)\s*</span>', r' \1', s)
    s = re.sub(r'<[^>]+>', '', s)
    s = html.unescape(s)
    s = re.sub(r'\s+', ' ', s).strip()
    s = re.sub(r'\s*\|\s*', '|', s)
    s = re.sub(r'\s*~\s*', '~', s)
    s = re.sub(r'\|?~\|?', '~', s)
    s = re.sub(r'\|+', '|', s).strip('|')
    s = s.replace(' .', '.').replace('Æ .', 'Æ.')
    return s


def is_french(s):
    return bool(re.search(r'\b(Gagnez|Infligez|Lancer|Détruisez|vous|Défaussez|Piochez|Un allié|Chaque)\b', s))


def market():
    """all market cards from the dataset: list of dicts with app id/box."""
    out = []
    for folder, key, *_ in BOXDEF:
        e = ENG[folder]
        fr = {c['id']: c for c in FRD.get(folder, {}).get('cards', [])}
        for c in e['cards']:
            if c['type'] not in TYPES:
                continue
            f = fr.get(c['id'])
            out.append(dict(id=IDFIX.get(c['id'], re.sub(r'\W', '', c['id'])), src=c['id'], folder=folder, box=key, type=c['type'],
                            cost=c['cost'], en=c['name'], fxen=clean(c['effect']),
                            frname=f['name'] if f else None,
                            fxfr=(clean(f['effect']) if f and is_french(clean(f['effect'])) else None)))
    return out
