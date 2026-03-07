self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("push", function(event) {

  if (!event.data) return;

  const data = event.data.json();

  const options = {
    body: data.body,
    icon: "queens-icon-192.png",
    badge: "queens-icon-192.png",
    vibrate: [200,100,200],
    data: {
      url: "/Queens/"
    }
  };

  event.waitUntil((async () => {

    // mostra notifica
    await self.registration.showNotification(data.title, options);

    // aggiorna badge numerico
    if ('setAppBadge' in self.navigator) {

      const notifications = await self.registration.getNotifications();

let count = notifications.length;

// limite badge stile app mobile
if (count > 9) {
  count = 9;
}

await self.navigator.setAppBadge(count);

    }

  })());

});

self.addEventListener("notificationclick", function(event) {

  event.notification.close();

  const url = event.notification.data.url;

  event.waitUntil((async () => {

    if ('clearAppBadge' in self.navigator) {
      await self.navigator.clearAppBadge();
    }

    clients.openWindow(url);

  })());

});
