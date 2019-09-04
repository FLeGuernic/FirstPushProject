self.addEventListener('push', event => {
    let body;

    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Default body';
    }

    const options = {
        body: body,
        icon: 'images/notification-flat.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore', title: 'Go to the site',
                icon: 'images/checkmark.png'
            },
            {
                action: 'close', title: 'Close the notification',
                icon: 'images/xmark.png'
            },
        ]
    };

   event.waitUntil(
  clients.matchAll().then(c => {
    console.log(c);
    
      // Show notification
      self.registration.showNotification('Push Notification', options);
    }
  )
);
});



/*self.addEventListener('activate', async () => {
    // This will be called only once when the service worker is activated.
    try {
        const options = {}
        const subscription = await self.registration.pushManager.subscribe(options)
        console.log(JSON.stringify(subscription))
    } catch (err) {
        console.log('Error', err)
    }
})

*/