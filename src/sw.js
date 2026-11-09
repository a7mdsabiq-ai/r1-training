const C = 'r1-v3';
const ASSETS = ['./', 'index.html', 'manifest.webmanifest', 'icon-180.png', 'icon-192.png', 'icon-512.png', 'icon-red-180.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(C).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== C).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
/* الشبكة أولًا؛ لو الموقع واقف أو رجع خطأ نفتح النسخة المحفوظة على الجهاز */
self.addEventListener('fetch', e => {
  const r = e.request; if (r.method !== 'GET' || new URL(r.url).origin !== location.origin) return;
  const fromCache = () => caches.match(r, { ignoreSearch: true }).then(m => m || caches.match('index.html'));
  e.respondWith(fetch(r).then(res => {
    if (!res || !res.ok) return fromCache().then(m => m || res);
    const cp = res.clone(); caches.open(C).then(c => c.put(r, cp)); return res;
  }).catch(fromCache));
});
