const CACHE_NAME = 'eink-reader-v1';
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png'
];

// Installation du Service Worker
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installation...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Mise en cache des fichiers');
        return cache.addAll(URLS_TO_CACHE);
      })
      .then(() => {
        console.log('[Service Worker] Installation réussie');
        return self.skipWaiting();
      })
  );
});

// Activation du Service Worker
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activation...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Suppression ancien cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('[Service Worker] Activation réussie');
      return self.clients.claim();
    })
  );
});

// Interception des requêtes - Stratégie Cache First
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Si la ressource est en cache, la retourner
        if (response) {
          return response;
        }
        
        // Sinon, faire la requête réseau
        return fetch(event.request).then((response) => {
          // Ne pas mettre en cache les requêtes POST ou les URLs externes
          if (!response || response.status !== 200 || response.type === 'opaque') {
            return response;
          }
          
          // Cloner la réponse car elle ne peut être consommée qu'une fois
          const responseToCache = response.clone();
          
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
          
          return response;
        });
      })
      .catch(() => {
        // En cas d'erreur réseau, retourner une page de fallback si disponible
        return caches.match('/index.html');
      })
  );
});

// Écouter les messages du client
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
