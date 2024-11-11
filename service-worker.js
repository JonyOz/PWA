// Nombre del caché y lista de activos que queremos almacenar en caché
const cacheName = 'todo-cache-v1';
const assets = [
    "../", // Página de inicio
    "./index.html",  // Archivo HTML principal
    "style.css", // Estilos CSS
    './app.js',  // Archivo JavaScript principal
    './manifest.json', // Archivo de manifest de la aplicación
    './images/icon-192.png', // Icono de 192px para dispositivos
    './images/icon-512.png' // Icono de 512px para dispositivos
];


// Evento de instalación: ocurre la primera vez que el Service Worker se registra
self.addEventListener('install', e => {
    // Espera hasta que todos los archivos estén en caché antes de completar la instalación
    e.waitUntil(
        caches.open(cacheName) // Abre (o crea) el caché con el nombre especificado
            .then(cache => {
                // Agrega todos los archivos en 'assets al caché
                return cache.addAll(assets)
                    .then(() => self.skipWaiting());
            }) // Fuerza al SW a activarse inmediatamente después de instalarse
            .catch(err => console.log('Falló registro de cache', err)) // Log de errores en caso de que falle
    );
});


//Evento
self.addEventListener('activate', e => {
    const cacheWhitelist = [cacheName];

    e.waitUntil(
        caches.keys()
            .then(cacheName => {
                return Promise.all(
                    cacheName.map(cName => {
                        if (!cacheWhitelist.includes(cName)) {
                            return caches.delete(cName);
                        }
                    })
                );
            })
            .then(() => self.clients.claim())
    );
});



//Evento fech
self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request)
            .then(res => {
                if (res) {
                    return res;
                }
                //
                return fetch(e.request);
            })
    );
});