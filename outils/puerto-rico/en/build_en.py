#!/usr/bin/env python3
"""Assemble la version anglaise : 2-data.js et 3-chapters.js sont écrits en anglais dans en/ ;
les autres morceaux sont traduits depuis la version française par les paires de pairs_*.py.
Une paire introuvable est signalée : il faut alors la mettre à jour après une modification de la page française."""
import os, sys, importlib.util
D = os.path.dirname(os.path.abspath(__file__)); FR = os.path.dirname(D)
def pairs(n):
    spec = importlib.util.spec_from_file_location(n, os.path.join(D, n + ".py")); m = importlib.util.module_from_spec(spec); spec.loader.exec_module(m); return m.PAIRS
def tr(name, P):
    s = open(os.path.join(FR, name), encoding="utf-8").read(); bad = 0
    for a, b in P:
        if a in s: s = s.replace(a, b)
        elif a not in ("<html lang=\"fr\">",): bad += 1; print("paire introuvable dans", name, ":", a[:70].replace("\n", " "))
    return s, bad
app = pairs("pairs_app"); head = [p for p in app]; out = []; total = 0
for name, P in (("1-head.html", head), ):
    s, b = tr(name, [p for p in P if p[0] in open(os.path.join(FR, name), encoding="utf-8").read()]); out.append(s)
out.append(open(os.path.join(D, "2-data.js"), encoding="utf-8").read())
out.append(open(os.path.join(D, "3-chapters.js"), encoding="utf-8").read())
for name, P in (("4-labs.js", pairs("pairs_labs")), ("5-ship.js", pairs("pairs_ship")), ("6-app.js", [p for p in app if p[0] in open(os.path.join(FR, "6-app.js"), encoding="utf-8").read()])):
    s, b = tr(name, P); out.append(s); total += b
open(sys.argv[1], "w", encoding="utf-8").write("".join(out))
print("en.html assemblé,", total, "paire(s) introuvable(s)")
