// Import the functions you need from the SDKs you need
importScripts("https://www.gstatic.com/firebasejs/10.10.0/firebase-app-compat.js")
importScripts("https://www.gstatic.com/firebasejs/10.10.0/firebase-messaging-compat.js")


console.log("variables de entorno firebase messaging",process.env.APY_KEY)
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import {getMessaging} from "firebase/messaging";
const firebaseConfig = {
  apiKey: "AIzaSyDCf7kjvBRU7iPJuJPlNKI5jmO5EwzFHvc",
  authDomain: "blog-app-8a0bb.firebaseapp.com",
  projectId: "blog-app-8a0bb",
  storageBucket: "blog-app-8a0bb.appspot.com",
  messagingSenderId: "779691728205",
  appId: "1:779691728205:web:f2cf8c82f9ae6fb1a22b04",
  measurementId: "G-614XH32E77"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging(app);

messaging.onBackgroundMessage(payload => {
  console.log("Recibiste mensaje mientras estabas ausente");
  console.log("payload",payload)
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon:"/public/next.svg"
  }

  return console.log('notification option',notificationOptions,'notificationTitle', notificationTitle)

})