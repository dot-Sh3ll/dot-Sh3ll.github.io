#!/usr/bin/env python3
"""Extract translatable text from a single-file HTML app, and apply a translation map.

extract <in.html> <out.json>   -> list of unique strings (with counts and a context sample)
apply   <in.html> <map.json> <out.html> -> replace every extracted unit whose text is in map
"""
import json, re, sys
from collections import OrderedDict

ATTRS = ("title", "placeholder", "aria-label", "alt", "content", "label", "data-tip", "aria-description")
LETTER = re.compile(r"[A-Za-zÀ-ÿŒœ]{2,}")


def units_in_markup(s, base, out, in_js, q=None):
    """Split a markup-ish string into text units outside tags and attribute values inside tags."""
    i, n = 0, len(s)
    while i < n:
        lt = s.find("<", i)
        # treat '<' as tag start only if followed by letter, / or !
        while lt != -1 and not (lt + 1 < n and (s[lt + 1].isalpha() or s[lt + 1] in "/!")):
            lt = s.find("<", lt + 1)
        end_text = n if lt == -1 else lt
        if end_text > i:
            add_text(s, i, end_text, base, out, q)
        if lt == -1:
            break
        gt = s.find(">", lt)
        if gt == -1:
            gt = n
        tag = s[lt:gt]
        for m in re.finditer(r'\b(' + "|".join(ATTRS) + r')\s*=\s*(["\'])(.*?)\2', tag, re.S):
            a0 = lt + m.start(3)
            add_text(s, a0, a0 + len(m.group(3)), base, out, q, m.group(2))
        i = gt + 1


def add_text(s, a, b, base, out, q=None, aq=None):
    seg = s[a:b]
    # trim whitespace and entities at edges
    m = re.match(r"^(\s*)(.*?)(\s*)$", seg, re.S)
    core = m.group(2)
    if not core or not LETTER.search(core):
        return
    a2 = a + len(m.group(1))
    out.append((base + a2, base + a2 + len(core), core, q, aq))


def js_strings(code, base, out):
    """Find string literal contents in JS code and push units (markup-aware)."""
    i, n = 0, len(code)
    prev_sig = ""  # last significant char for regex detection
    while i < n:
        c = code[i]
        if c == "/" and i + 1 < n and code[i + 1] == "/":
            j = code.find("\n", i)
            i = n if j == -1 else j
            continue
        if c == "/" and i + 1 < n and code[i + 1] == "*":
            j = code.find("*/", i + 2)
            i = n if j == -1 else j + 2
            continue
        if c == "/" and (prev_sig == "" or prev_sig in "(,=:[!&|?{};+-*%<>~^" or re.search(r"(return|typeof|case)\s*$", code[max(0, i - 8):i])):
            # regex literal
            j = i + 1
            incls = False
            while j < n:
                if code[j] == "\\":
                    j += 2; continue
                if code[j] == "[": incls = True
                elif code[j] == "]": incls = False
                elif code[j] == "/" and not incls: break
                elif code[j] == "\n": break
                j += 1
            i = j + 1
            while i < n and code[i].isalpha(): i += 1
            prev_sig = "a"
            continue
        if c in "\"'":
            j = i + 1
            while j < n and code[j] != c:
                if code[j] == "\\": j += 1
                if code[j] == "\n": break
                j += 1
            units_in_markup(code[i + 1:j], base + i + 1, out, True, c)
            i = j + 1; prev_sig = "a"
            continue
        if c == "`":
            j = i + 1; start = j
            while j < n and code[j] != "`":
                if code[j] == "\\": j += 2; continue
                if code[j] == "$" and j + 1 < n and code[j + 1] == "{":
                    units_in_markup(code[start:j], base + start, out, True, "`")
                    depth = 1; k = j + 2
                    while k < n and depth:
                        if code[k] == "{": depth += 1
                        elif code[k] == "}": depth -= 1
                        elif code[k] in "\"'`":
                            q = code[k]; k += 1
                            while k < n and code[k] != q:
                                if code[k] == "\\": k += 1
                                k += 1
                        k += 1
                    # recurse into the expression
                    js_strings(code[j + 2:k - 1], base + j + 2, out)
                    j = k; start = j
                    continue
                j += 1
            units_in_markup(code[start:j], base + start, out, True, "`")
            i = j + 1; prev_sig = "a"
            continue
        if not c.isspace():
            prev_sig = c
        i += 1


def extract_units(html):
    out = []
    pos = 0
    for m in re.finditer(r"<(script|style)\b[^>]*>(.*?)</\1>", html, re.S | re.I):
        units_in_markup(html[pos:m.start()], pos, out, False)
        # attributes of the opening tag itself are irrelevant
        if m.group(1).lower() == "script":
            js_strings(m.group(2), m.start(2), out)
        pos = m.end()
    units_in_markup(html[pos:], pos, out, False)
    # keep only units containing letters; drop pure code-ish ones later by review
    return out


def main():
    cmd = sys.argv[1]
    html = open(sys.argv[2], encoding="utf-8").read()
    units = extract_units(html)
    if cmd == "extract":
        seen = OrderedDict()
        for a, b, t, q, aq in units:
            if t not in seen:
                seen[t] = {"n": 0, "ctx": html[max(0, a - 40):a].replace("\n", " ")[-40:]}
            seen[t]["n"] += 1
        json.dump([{"t": k, **v} for k, v in seen.items()], open(sys.argv[3], "w", encoding="utf-8"), ensure_ascii=False, indent=0)
        print(len(units), "units,", len(seen), "unique,", sum(len(k) for k in seen), "chars")
    elif cmd == "apply":
        mp = json.load(open(sys.argv[3], encoding="utf-8"))
        res, last, hit = [], 0, 0
        for a, b, t, q, aq in sorted(units):
            if a < last:
                continue
            if t in mp and mp[t] != t:
                v = mp[t]
                if aq == '"' and q != '"': v = v.replace('"', "&quot;")
                if aq == "'" and q != "'": v = v.replace("'", "&#39;")
                if q in ("'", '"'): v = re.sub(r"(?<!\\)" + re.escape(q), lambda m: "\\" + q, v)
                if q == "`": v = v.replace("`", "\\`").replace("${", "\\${")
                if q is None and aq is None: v = v.replace("<", "&lt;")
                res.append(html[last:a]); res.append(v); last = b; hit += 1
        res.append(html[last:])
        open(sys.argv[4], "w", encoding="utf-8").write("".join(res))
        print("replaced", hit)


if __name__ == "__main__":
    main()
