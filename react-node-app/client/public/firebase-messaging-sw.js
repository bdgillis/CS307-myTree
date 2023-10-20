
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

const firebaseConfig = {
    apiKey: "AIzaSyAuk5etQpT4_dMQJrbt1yYSeIRLaywRhOE",
    authDomain: "cs307-mytree.firebaseapp.com",
    projectId: "cs307-mytree",
    storageBucket: "cs307-mytree.appspot.com",
    messagingSenderId: "206348991152",
    appId: "1:206348991152:web:b483558bcecb1caa58d975",
    measurementId: "G-G8E9VN99YD"
  };

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();
messaging.onBackgroundMessage(function(payload) {
    console.log('Received background message ', payload);

    //customize notification
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body
        
    };

    self.registration.showNotification(notificationTitle, notificationOptions);

});

