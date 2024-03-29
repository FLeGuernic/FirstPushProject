const app = (() => {
    'use strict';

    let isSubscribed = false;
    let swRegistration = null;

    const notifyButton = document.querySelector('.js-notify-btn');
    const pushButton = document.querySelector('.js-push-btn');

    if (!('Notification' in window)) {
        console.log('Notifications not supported in this browser');
        return;
    }

    Notification.requestPermission(status => {
        console.log('Notification permission status:', status);
    });

    function displayNotification() {
        if (Notification.permission == 'granted') {
            navigator.serviceWorker.getRegistration().then(reg => {
                const options = {
                    body: 'First notification!',
                    tag: 'id1',
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
                reg.showNotification('Hello world!', options);
            });
        }
    }

    function initializeUI() {
        pushButton.addEventListener('click', () => {
            pushButton.disabled = true;
            if (isSubscribed) {
                unsubscribeUser();
            } else {
                subscribeUser();
            }
        });

        // Set the initial subscription value
        swRegistration.pushManager.getSubscription()
            .then(subscription => {
                isSubscribed = (subscription !== null);

                updateSubscriptionOnServer(subscription);

                if (isSubscribed) {
                    console.log('User IS subscribed.');
                } else {
                    console.log('User is NOT subscribed.');
                }

                updateBtn();
            });
    }

   

    function subscribeUser() {
        
        navigator.serviceWorker.getRegistration().then(function (swregistration2) {
            const applicationServerPublicKey = 'BLP3H0DIu-sRGWU8N6xDUoJYfgHvmZP6L0zuLURJyiWM6XllWvZ1Xw5lG83PqxSKGCH-Zrjsen0BJg86oVH6g58';
            console.log("avant la conversion : " + applicationServerPublicKey)
            const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
            console.log("apr�s la conversion : " + applicationServerKey);
            console.log("il y a un truc")
            swregistration2.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: applicationServerKey,
            }
            ).then(
                subscription => {
                    console.log("User is subscribed with the subscription : ");
                    console.log(subscription);
                    console.log(subscription.toJSON());
                    updateSubscriptionOnServer(subscription);
                    isSubscribed = true;
                    updateBtn();
                }
            )
                .catch(err => {
                    if (Notification.permission === 'denied') {
                        console.warn('Permission for notifications was denied');
                    } else {
                        console.error('Failed to subscribe the user: ', err);
                    }

                });
        })
    }

    function unsubscribeUser() {
        swRegistration.pushManager.getSubscription()
            .then(subscription => {
                if (subscription) {
                    return subscription.unsubscribe();
                }
            })
            .catch(err => {
                console.log('Error unsubscribing', err);
            })
            .then(() => {
                updateSubscriptionOnServer(null);

                console.log('User is unsubscribed');
                isSubscribed = false;

                updateBtn();
            });
    }

    function updateSubscriptionOnServer(subscription) {
        // Here's where you would send the subscription to the application server

        const subscriptionJson = document.querySelector('.js-subscription-json');
        const endpointURL = document.querySelector('.js-endpoint-url');
        const subAndEndpoint = document.querySelector('.js-sub-endpoint');

        if (subscription) {
            subscriptionJson.textContent = JSON.stringify(subscription);
            endpointURL.textContent = subscription.endpoint;
            subAndEndpoint.style.display = 'block';
        } else {
            subAndEndpoint.style.display = 'none';
        }
    }

    function updateBtn() {
        if (Notification.permission === 'denied') {
            pushButton.textContent = 'Push Messaging Blocked';
            pushButton.disabled = true;
            updateSubscriptionOnServer(null);
            return;
        }

        if (isSubscribed) {
            pushButton.textContent = 'Disable Push Messaging';
        } else {
            pushButton.textContent = 'Enable Push Messaging';
        }

        pushButton.disabled = false;
    }

    function urlB64ToUint8Array(base64String) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }

    notifyButton.addEventListener('click', () => {
        displayNotification();
    });

    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            console.log('Service Worker and Push is supported');

            navigator.serviceWorker.register('sw.js')
                .then(swReg => {
                    console.log('Service Worker is registered', swReg);

                    swRegistration = swReg;
                    console.log("le premier enregistrement de sw est ");
                    console.log(swRegistration);
                    navigator.serviceWorker.getRegistration().then(function (sw) {
                        console.log("le deuxi�me enregistrement de service worker est ");
                        console.log(sw);
                    })
                    initializeUI();
                })
                .catch(err => {
                    console.error('Service Worker Error', err);
                });
        });
    } else {
        console.warn('Push messaging is not supported');
        pushButton.textContent = 'Push Not Supported';
    }

})();