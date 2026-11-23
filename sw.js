/* Service worker : rend le site utilisable hors ligne.
   Pages : réseau d'abord (toujours la dernière version), copie locale si pas de réseau.
   Polices, icônes, PDF : copie locale d'abord, mise à jour en arrière-plan.
   Changer VERSION à chaque grosse mise à jour pour vider l'ancien cache. */
const VERSION = "v9";
const CACHE = "aides-de-jeu-" + VERSION;
const PRECACHE = [
  "./", "index.html", "manifest.webmanifest",
  "mage-knight/", "mage-knight/en.html",
  "imperium/", "imperium/en.html",
  "aeons-end/", "aeons-end/en.html",
  "puerto-rico/", "puerto-rico/en.html",
  "icons/icon-192.png", "icons/icon-512.png", "icons/apple-touch-icon.png", "icons/favicon-32.png"
];
const NEVER = ["goatcounter", "gc.zgo.at", "docs.google.com", "ko-fi.com"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k.startsWith("aides-de-jeu-") && k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request, url = req.url;
  if (req.method !== "GET" || NEVER.some(s => url.includes(s))) return;
  const isPage = req.mode === "navigate" || (req.headers.get("accept") || "").includes("text/html");
  if (isPage) {
    e.respondWith(fetch(req).then(res => {
      const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); return res;
    }).catch(() => caches.match(req, { ignoreSearch: true }).then(r => r || caches.match("./"))));
    return;
  }
  const sameOrFonts = url.startsWith(self.location.origin) || url.includes("fonts.googleapis.com") || url.includes("fonts.gstatic.com");
  if (!sameOrFonts) return;
  e.respondWith(caches.match(req).then(hit => {
    const net = fetch(req).then(res => {
      if (res.ok || res.type === "opaque") { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
      return res;
    }).catch(() => hit);
    return hit || net;
  }));
});
