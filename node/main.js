const webPush = require('web-push');

var Datastore = require('nedb');  
var attendants = new Datastore({filename :'subsAcc.db'});
attendants.loadDatabase(function (err) {    // Callback is optional
  // Now commands will be executed
});


// Save a bunch of user data here...

attendants.findOne({ role: 'train attendant' }, function(err, doc) {  
    console.log('Found user:', doc.name);
    console.log('Found sub:', doc.subscription)
    const pushSubscription = doc.subscription
    
    const vapidPublicKey = 'BHDtP0H0kbcu_rouKyzaQPKTc7fG7nHFUyQ1H6o5aRiS9khxHKZfKUO1xUAPHrgVJir7rtPjAcWkA2AfJq3MRj8';

    const vapidPrivateKey = '8mdICKO2b05oK__SMd7SW6Wow9qMXsQemXL9EUpQgTE';

 




// TODO 4.3a - include VAPID keys

const payload = 'You are an  train driver';

const options = {
    //gcmAPIKey: 'YOUR_SERVER_KEY',
    TTL: 60,
    
    // TODO 4.3b - add VAPID details
    vapidDetails: {
        subject: 'mailto: francois.leguernic@belgiantrain.be',
        publicKey: vapidPublicKey,
        privateKey: vapidPrivateKey
    }


};

 

    

webPush.sendNotification(
    pushSubscription,
    payload,
    options
).catch(err => {
    console.log('Error sendign the notif', err);
});
    

});

/*console.log(pushSubscription)





//{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABdGxCiOi130CIbCOC_VJL0jtqT3YWT05w2XOd38Ac6765DEjJI1Hei34I0MDiMJ2EyyZL6vIJwE43l7FOjH2_mi-eTDP86U1VFo5sGgXzEQNSY6K8h_SQEkFxMyqtYgAQEWBh5t94Q02U-EfXnvT_b18-hKohOZ4cw-0dgF8VlyvOmpsc","keys":{"auth":"k-IWgaoC6zV9u9JVnwk6dQ","p256dh":"BHpzhiaYi8uAGlF5Kz8l8P61bHnLXyM1z2IWSUMgBJ9QIPfZAekjDNfCt0AZmJvwDrpwyDI1m5dOoZd99LdXsv8"}}

const vapidPublicKey = 'BLP3H0DIu-sRGWU8N6xDUoJYfgHvmZP6L0zuLURJyiWM6XllWvZ1Xw5lG83PqxSKGCH-Zrjsen0BJg86oVH6g58';
const vapidPrivateKey = 'R2TnOWO3KzJDZ5MtmIeCeT2Yx3O-S5U3BWyaS8FqM80';

 




// TODO 4.3a - include VAPID keys

const payload = 'You are an  train attendant';

const options = {
    //gcmAPIKey: 'YOUR_SERVER_KEY',
    TTL: 60,

    // TODO 4.3b - add VAPID details
    vapidDetails: {
        subject: 'mailto: francois.leguernic@belgiantrain.be',
        publicKey: vapidPublicKey,
        privateKey: vapidPrivateKey
    }


};

 



webPush.sendNotification(
    pushSubscription,
    payload,
    options
);

*/
