importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js");

const firebaseConfig = { 
    apiKey: "AIzaSyCttnu50SzgfX5f_JKEUut9EhkPCRzP1NU",
    authDomain: "practice-app-28.firebaseapp.com",
    projectId: "practice-app-28",
    storageBucket: "practice-app-28.appspot.com",
    messagingSenderId: "928244608866",
    appId: "1:928244608866:web:21d50259fe50f8fb66c63b",
    databaseURL: "https://practice-app-28-default-rtdb.firebaseio.com/"
  };

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});