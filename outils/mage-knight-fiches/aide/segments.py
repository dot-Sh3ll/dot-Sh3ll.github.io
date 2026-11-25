import re
from bs4 import BeautifulSoup, NavigableString
BLOCK={"div","p","li","td","th","h1","h2","h3","ul","ol","table","tr","x-dc","helmet","body","html"}
DRE=re.compile(r'<span aria-label="dangerosité (\d) sur 5" role="img">(?:<span[^>]*></span>)+</span>')
IRE=re.compile(r'<img [^>]*/?>')
def leaves(soup):
    """Blocs à traduire : éléments de bloc sans bloc à l'intérieur, textes des schémas SVG (<text>),
    et titres en ligne (<b>, <span>…) posés directement dans un bloc qui contient aussi d'autres blocs."""
    out = []
    for el in soup.find_all(True):
        if el.name in ("style","script","link","helmet") or el.find_parent("helmet"): continue
        if el.name == "text":
            if re.search(r"[A-Za-zÀ-ÿ]", el.get_text()): out.append(el)
            continue
        if el.name not in BLOCK or el.name in ("ul","ol","table","tr","x-dc","body","html"): continue
        if any(d.name in BLOCK for d in el.find_all(True)):
            for c in el.find_all(["b","span","i","strong"], recursive=False):
                if re.search(r"[A-Za-zÀ-ÿ]", c.get_text()): out.append(c)
            continue
        if el.find("svg") is not None: continue
        if re.search(r"[A-Za-zÀ-ÿ]", el.get_text()): out.append(el)
    return out
def key(inner):
    return IRE.sub("[IMG]", DRE.sub("[D]", inner)).strip()
