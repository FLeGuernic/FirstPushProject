var Datastore = require('nedb')
  , db = new Datastore({ filename: 'node/subsAcc.db' });
db.loadDatabase(function (err) {    // Callback is optional
  // Now commands will be executed
});

var scott = {
    name: 'Scott',
    role: 'train attendant',
    subscription: { "endpoint": "https://updates.push.services.mozilla.com/wpush/v2/gAAAAABdb74XiWlwHRVuOZjlpyZ_chSwUq-CSKDUqM1_zQB0Oqy34fkB4CnuBgWft1WT_63gtBhnKxpA9xVZwlPUTaAg9cdIgrdWzROOm7JCMmeyhz0YszuZsPSoJOzuW2RHfIR76YCQub1ZQpyL9f7rtByWjktkk3M76p-Rx0BudJ6g_KWA3Bs", "keys": { "auth": "dGKuQPOB8l8s9WwJQlzoQw", "p256dh": "BFGcnDqtwrDhQbxIK59m0Cu0h23JY5srL7Gvpn_g8CRbXogVVLyEnjp134f7iRqgn5nyyl72GiY7I7qxe6xUMck" } }

 }






db.insert(scott, function(err, doc) {  
    console.log('Inserted', doc.name, 'with ID', doc._id);
});



