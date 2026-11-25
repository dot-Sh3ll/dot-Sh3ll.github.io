#!/usr/bin/env python3
"""Mage Knight game aid, English edition: the French pages (fr/*.html) translated block by block,
so the English PDF keeps exactly the same layout, pictures and type size as the French one.

usage : python3 outils/mage-knight-fiches/aide/en.py      (depuis n'importe où)
→ fiches/mage-knight-game-aid.pdf, puis relancer outils/site/seo.py (métadonnées du PDF).

Table : en.json = texte français d'un bloc (titre, paragraphe, puce, cellule) → texte anglais.
  [D]   = pastilles de dangerosité (recopiées, libellé traduit) ; [IMG] = icône (posée dans la ligne en anglais).
Après une modification d'une page française : relancer ; un bloc français absent de en.json est signalé
(le script s'arrête) : ajouter sa traduction dans en.json. Les blocs devenus inutiles sont signalés aussi.
Remplace l'ancien gen_mk_en.py (version anglaise refaite à part, texte plus petit).
"""
import asyncio, json, os, re, sys
H = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, H)
sys.path.insert(0, os.path.join(H, "..", "quetes"))
from bs4 import BeautifulSoup
from segments import leaves, key, DRE, IRE
from quetes import ROOT, to_html, render, pied
from aide import PAGES

T = json.load(open(os.path.join(H, "en.json"), encoding="utf-8"))


def inline_img(tag):
    """icône posée en absolu derrière « (icône      ) » en français : en anglais, dans la ligne."""
    st = re.sub(r"\s*(position|left|top|display|max-width)\s*:[^;\"]*;?", "", re.search(r'style="([^"]*)"', tag).group(1) if 'style="' in tag else "")
    st = (st.strip().rstrip(";") + ";display:inline-block;vertical-align:-3px").lstrip(";")
    return re.sub(r'style="[^"]*"', f'style="{st}"', tag) if 'style="' in tag else tag.replace("<img ", f'<img style="{st}" ', 1)


def traduire(dc, page, used, manque):
    soup = BeautifulSoup(dc, "html.parser")
    for el in list(leaves(soup)):
        inner = el.decode_contents().strip()
        k = key(inner)
        if k not in T:
            manque.append((page, k)); continue
        used.add(k)
        en = T[k]
        for m in DRE.finditer(inner):
            en = en.replace("[D]", m.group(0).replace(f'aria-label="dangerosité {m.group(1)} sur 5"', f'aria-label="danger {m.group(1)} of 5"'), 1)
        for m in IRE.finditer(inner):
            en = en.replace("[IMG]", inline_img(m.group(0)), 1)
        el.clear()
        el.append(BeautifulSoup(en, "html.parser"))
    return str(soup).replace('<html lang="fr">', '<html lang="en">')


def main():
    used, manque, pages = set(), [], []
    for i, n in enumerate(PAGES):
        dc = open(os.path.join(H, "fr", n + ".html"), encoding="utf-8").read()
        en = traduire(dc, n, used, manque)
        en = pied(en, f"Game aid · {i + 1}/{len(PAGES)}")
        en = re.sub(r'/_blob/([0-9a-f]+)', lambda m: "file://" + os.path.join(H, "img", m.group(1) + ".png"), en)
        os.makedirs(os.path.join(H, "en"), exist_ok=True)
        open(os.path.join(H, "en", n + ".html"), "w", encoding="utf-8").write(en)
        pages.append(to_html(en, "en"))
    for p, k in manque: print(f"[{p}] bloc sans traduction → {k[:110]}")
    for k in sorted(set(T) - used): print("[en.json] bloc inutilisé →", k[:110])
    if manque: sys.exit("Des blocs français n'ont pas de traduction : compléter en.json.")
    asyncio.run(render(pages, os.path.join(ROOT, "fiches", "mage-knight-game-aid.pdf")))


if __name__ == "__main__":
    main()
