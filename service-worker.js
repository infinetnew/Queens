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

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );

});

self.addEventListener("notificationclick", function(event) {

  event.notification.close();

  const url = event.notification.data.url;

  event.waitUntil(
    clients.openWindow(url)
  );

});