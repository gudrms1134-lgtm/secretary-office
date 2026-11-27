/* 형근님 비서실 — Service Worker
   네트워크 우선 + 오프라인 캐시 폴백 (Android Chrome '앱 설치' 조건 충족용) */
const CACHE = 'secretary-office-v2';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png'
];

// 설치: 핵심 파일 미리 캐시 (하나라도 실패해도 설치는 계속)
self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await Promise.all(ASSETS.map((url) => cache.add(url).catch(() => {})));
    await self.skipWaiting();
  })());
});

// 활성화: 이전 버전 캐시 정리 후 바로 제어
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)));
    await self.clients.claim();
  })());
});

// 가져오기: 네트워크 우선, 실패하면 캐시 → 마지막엔 index.html
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // 외부 API 호출은 건드리지 않음

  event.respondWith((async () => {
    try {
      const res = await fetch(req);
      if (res && res.ok && res.type === 'basic') {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
      }
      return res;
    } catch (err) {
      const cached = await caches.match(req, { ignoreSearch: true });
      if (cached) return cached;
      if (req.mode === 'navigate') {
        const fallback = await caches.match('./index.html');
        if (fallback) return fallback;
      }
      throw err;
    }
  })());
});
