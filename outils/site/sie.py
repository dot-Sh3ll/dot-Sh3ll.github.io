#!/usr/bin/env python3
"""Allemand : passer du tutoiement (du) au vouvoiement (Sie), consigne du site.

usage (depuis la racine du dépôt) :
  python3 outils/site/sie.py scan <fichier>...       liste les lignes qui tutoient encore (du, dich, dir, dein…, impératifs en -e)
  python3 outils/site/sie.py convert <fichier.tsv>   affiche le fichier converti (textes de cartes, une ligne par texte)
  from sie import sie ; sie("Erhalte 2 Æ.")          -> "Erhalten Sie 2 Æ."

La conversion couvre les tournures des textes de cartes (impératifs connus, questions « Wirfst du … ? », possessifs) ;
« scan » montre ce qu'elle a laissé, à corriger à la main (ex. propositions relatives « den du … hast »).
Sert à reprendre des textes allemands officiels, rédigés au tutoiement sur les cartes.
"""
import re
IMP = {  # impératif 2e sg -> infinitif (forme Sie)
 'Erhalte':'Erhalten','Füge':'Fügen','Wähle':'Wählen','Zerstöre':'Zerstören','Ziehe':'Ziehen','Lege':'Legen','Wirf':'Werfen',
 'Nimm':'Nehmen','Bündele':'Bündeln','Heile':'Heilen','Erleide':'Erleiden','Wirke':'Wirken','Aktiviere':'Aktivieren','Hänge':'Hängen',
 'Decke':'Decken','Mische':'Mischen','Gib':'Geben','Verliere':'Verlieren','Betäube':'Betäuben','Bezahle':'Bezahlen','Zahle':'Zahlen','Schiebe':'Schieben',
 'Tausche':'Tauschen','Binde':'Binden','Erwirb':'Erwerben','Platziere':'Platzieren','Wiederhole':'Wiederholen','Spiele':'Spielen',
 'Entferne':'Entfernen','Behalte':'Behalten','Drehe':'Drehen','Ersetze':'Ersetzen','Zähle':'Zählen','Teile':'Teilen','Öffne':'Öffnen',
 'Reduziere':'Reduzieren','Führe':'Führen','Kehre':'Kehren','Sieh':'Sehen','Suche':'Suchen','Durchsuche':'Durchsuchen','Verteile':'Verteilen',
 'Wähl':'Wählen','Lies':'Lesen','Stelle':'Stellen','Benenne':'Benennen','Schaue':'Schauen','Zeige':'Zeigen','Fülle':'Füllen',
}
# 2e sg (question / « du » ) -> Sie
V2 = {'Wirfst':'Werfen','Hast':'Haben','Bist':'Sind','Zerstörst':'Zerstören','Legst':'Legen','Bezahlst':'Bezahlen','Erhältst':'Erhalten',
 'Erleidest':'Erleiden','Ziehst':'Ziehen','Bündelst':'Bündeln','Wirkst':'Wirken','Spielst':'Spielen','Nimmst':'Nehmen','Siehst':'Sehen',
 'Tust':'Tun','Kannst':'Können','Darfst':'Dürfen','Willst':'Wollen','Aktivierst':'Aktivieren','Verlierst':'Verlieren','Erwirbst':'Erwerben',
 'Gibst':'Geben','Heilst':'Heilen','Bindest':'Binden','Zahlst':'Zahlen','Wählst':'Wählen','Hattest':'Hatten','Musst':'Müssen'}
v2l = {k.lower():v.lower() for k,v in V2.items()}
POSS = {'dein':'Ihr','deine':'Ihre','deinen':'Ihren','deinem':'Ihrem','deiner':'Ihrer','deines':'Ihres'}

def sie(s):
    out=[]
    for seg in re.split(r'([|~])', s):
        if seg in '|~': out.append(seg); continue
        out.append(_sent(seg))
    return ''.join(out)

def _sent(seg):
    # phrase par phrase (après ., ?, :)
    parts=re.split(r'(?<=[.?!:])(\s+)', seg)
    return ''.join(_one(p) if not p.isspace() else p for p in parts)

def _one(p):
    m=re.match(r'^(\(?)(\w+)\b(.*)$', p, re.S)
    if m:
        pre,w,rest=m.groups()
        if w in IMP:
            inf=IMP[w]
            if w=='Sieh' and re.match(r'\s+dir\b', rest):  # Sieh dir … an -> Sehen Sie sich … an
                rest=re.sub(r'^\s+dir\b',' sich',rest)
            p=f'{pre}{inf} Sie{rest}'
        elif w in V2 and re.match(r'\s+du\b', rest):     # Wirfst du … ? -> Werfen Sie … ?
            p=f'{pre}{V2[w]} Sie{re.sub(r"^\s+du\b","",rest)}'
    # « und zerstöre sie » : impératif coordonné
    p=re.sub(r'\b(und|dann|Dann|oder) ('+'|'.join(k.lower() for k in IMP)+r')\b', lambda m: f'{m.group(1)} {IMP[m.group(2).capitalize()].lower()} Sie', p)
    p=re.sub(r'\b(Du|du) (\w+st)\b', lambda m: ('Sie ' if m.group(1)=='Du' else 'Sie ')+v2l.get(m.group(2).lower(), m.group(2)), p)
    p=re.sub(r'\b(\w+st) du\b', lambda m: (v2l.get(m.group(1).lower(),m.group(1)).capitalize() if m.group(1)[0].isupper() else v2l.get(m.group(1).lower(),m.group(1)))+' Sie', p)
    p=re.sub(r'\b(dein|deine|deinen|deinem|deiner|deines)\b', lambda m: POSS[m.group(1)], p)
    p=re.sub(r'\b(Dein|Deine|Deinen|Deinem|Deiner|Deines)\b', lambda m: POSS[m.group(1).lower()], p)
    p=re.sub(r'\bdu gespielt hast\b','Sie gespielt haben',p)
    p=re.sub(r'\bhast\b','haben',p)
    return p

LEFT=re.compile(r'\b(du|Du|dir|Dir|dich|Dich)\b|\b\w+st\b')


IMP_RE = re.compile(r'(?:^|[|~.?!:>"]\s*)(' + '|'.join(IMP) + r')\b')


def scan_line(t):
    t = re.sub(r"<[^>]+>", " ", t)
    hits = [m.group(0) for m in re.finditer(r'\b(du|Du|dich|Dich|dir|Dir|dein\w*|Dein\w*)\b', t)]
    hits += [m.group(1) for m in IMP_RE.finditer(t)]
    return hits


if __name__ == "__main__":
    import sys
    a = sys.argv[1:]
    if len(a) < 2:
        sys.exit(__doc__)
    if a[0] == "scan":
        n = 0
        for f in a[1:]:
            for i, line in enumerate(open(f, encoding="utf-8"), 1):
                h = scan_line(line)
                if h:
                    n += 1; print(f"{f}:{i}: {', '.join(sorted(set(h)))} | {line.strip()[:140]}")
        print(n, "ligne(s) à vérifier")
    elif a[0] == "convert":
        for line in open(a[1], encoding="utf-8"):
            print(sie(line.rstrip("\n")))
