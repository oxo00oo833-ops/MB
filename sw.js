// EMERGENCY CLEANUP
// This worker immediately unregisters itself to fix the "White Screen" issue.

self.addEventListener('install', (e) => {
    self.skipWaiting(); // Activate immediately
});

self.addEventListener('activate', (e) => {
    console.log('Self-destructing Service Worker...');
    e.waitUntil(
        self.registration.unregister()
            .then(() => {
                console.log('Service Worker unregistered.');
                return self.clients.matchAll();
            })
            .then((clients) => {
                // Reload all pages to get fresh content
                clients.forEach(client => client.navigate(client.url));
            })
    );
});
