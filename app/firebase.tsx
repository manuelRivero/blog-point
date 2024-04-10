

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getMessaging, isSupported} from "firebase/messaging";
import { getAuth } from "firebase/auth";


// const firebaseConfig = {
//   apiKey: "AIzaSyDCf7kjvBRU7iPJuJPlNKI5jmO5EwzFHvc",
//   authDomain: "blog-app-8a0bb.firebaseapp.com",
//   projectId: "blog-app-8a0bb",
//   storageBucket: "blog-app-8a0bb.appspot.com",
//   messagingSenderId: "779691728205",
//   appId: "1:779691728205:web:f2cf8c82f9ae6fb1a22b04",
//   measurementId: "G-614XH32E77"
// };
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

let messaging: any = null;
(async ()=>{

  const isSupport = await isSupported()
  if (isSupport){
      messaging = getMessaging(app);
  }

})()
export default messaging 

//export const messaging = async () => (await isSupported()) && getMessaging(app)
//export const authUser = getAuth(app);
