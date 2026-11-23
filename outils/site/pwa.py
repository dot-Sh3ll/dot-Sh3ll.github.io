#!/usr/bin/env python3
"""Inject PWA tags (manifest, icons, service worker) and GoatCounter into a page.
usage: pwa.py <prefix> <file>   (prefix: "" for root pages, "../" for app pages)"""
import re, sys
pre, path = sys.argv[1], sys.argv[2]
s = open(path, encoding="utf-8").read()
s = re.sub(r'<!--pwa-->.*?<!--/pwa-->\n?', '', s, flags=re.S)
tags = f"""<!--pwa-->
<link rel="manifest" href="{pre}manifest.webmanifest">
<link rel="icon" href="{pre}icons/favicon-32.png" type="image/png">
<meta name="theme-color" content="#0d0f16">
<link rel="apple-touch-icon" href="{pre}icons/apple-touch-icon.png">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="Less Rules">
<script>if("serviceWorker" in navigator&&(location.protocol==="https:"||location.hostname==="localhost")){{window.addEventListener("load",function(){{navigator.serviceWorker.register("{pre}sw.js").catch(function(){{}})}})}}</script>
<script data-goatcounter="https://shell.goatcounter.com/count" async src="https://gc.zgo.at/count.js"></script>
<!--/pwa-->
"""
s = s.replace("</head>", tags + "</head>", 1)
open(path, "w", encoding="utf-8").write(s)
print("ok", path)
