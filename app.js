// Verificar si el navegador soporta Service Workers
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(reg => console.log('Service Worker registrado', reg))
            .catch(err => console.log('Error en registro del Service Worker', err));
    });
}

// Función para enviar una notificación
function enviarNotificacion() {
    if (Notification.permission === 'granted') {
        new Notification('¡Hola desde tu PWA!');
    } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                new Notification('¡Hola desde tu PWA!');
            }
        });
    }
}
