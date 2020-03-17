//Asignar nombre y version de cache
const CACHE_NAME = 'v1_cache_pwa';

//Ficheros a cachear en la aplicacion
var URLSTOCACHE = [
    './',
    './css/styles.css',
    './main.js',
    './img/1.png',
    './img/2.png',
    './img/3.png',
    './img/4.png',
    './img/5.png',
    './img/6.png',
    './img/facebook.png',
    './img/instagram.png',
    './img/twitter.png',
    './img/favicon-1024.png',
    './img/favicon-512.png',
    './img/favicon-384.png',
    './img/favicon-256.png',
    './img/favicon-192.png',
    './img/favicon-128.png',
    './img/favicon-96.png',
    './img/favicon-64.png',
    './img/favicon-32.png',
    './img/favicon-16.png',
    './img/favicon.png'
];

//Evento install
//instalacion del service worker y guardar en cache recursos estaticos en cache
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(URLSTOCACHE)
                    .then(() => {
                        self.skipWaiting();
                    })
            })
            .catch(err => console.log('No se ha registrado el cache', err))
    );
});

//Evento activate
//Que la app funcione sin conexion
self.addEventListener('activate', e => {
    const cacheWhiteList = [CACHE_NAME];
    
    e.waitUntil(
        caches.keys()
        .then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhiteList.indexOf(cacheName) === -1) {
                        //Borrar elementos que no se necesiten
                        return caches.delete(cacheName);
                    }
                })
            );
        })
        .then(() => {
            //Activar cache
            self.clients.claim();
        })
    );
});


//Evento fetch
/*
self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request)
        .then(res => {
        
            if (res) {
                //devuelvo datos desde cache
                return res;
            } 
            
            return fetch(e.request);
        })
    );
});*/

addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          if (response) {
            return response;     // if valid response is found in cache return it
          } else {
            return fetch(event.request)     //fetch from internet
              .then(function(res) {
                return caches.open(CACHE_NAME)
                  .then(function(cache) {
                    cache.put(event.request.url, res.clone());    //save the response for future
                    return res;   // return the fetched data
                  })
              })
              .catch(function(err) {       // fallback mechanism
                return caches.open(CACHE_NAME)
                  .then(function(cache) {
                    return cache.match('/offline.html');
                  });
              });
          }
        })
    );
  });          