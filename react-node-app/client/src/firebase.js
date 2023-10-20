
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getMessaging, getToken, onMessage } from "firebase/messaging";


const firebaseConfig = {
  apiKey: "AIzaSyAuk5etQpT4_dMQJrbt1yYSeIRLaywRhOE",
  authDomain: "cs307-mytree.firebaseapp.com",
  projectId: "cs307-mytree",
  storageBucket: "cs307-mytree.appspot.com",
  messagingSenderId: "206348991152",
  appId: "1:206348991152:web:b483558bcecb1caa58d975",
  measurementId: "G-G8E9VN99YD"
};

const app = initializeApp(firebaseConfig);

initializeApp(firebaseConfig);
const messaging = getMessaging();

export const requestForToken = () => {
  return getToken(messaging, { vapidKey: `BMKT4PLku6rPtmdc1NAc5vRMu_M-346AF4oTQkhS7gy9wyvg5BDVUfWLDDjb_gcQ2EBbqr0TJY2W1DdWabTaL-E` })
    .then((currentToken) => {
      if (currentToken) {
        console.log('current token for client: ', currentToken);
        // Perform any other neccessary action with the token
      } else {
        // Show permission request UI
        console.log('No registration token available. Request permission to generate one.');
      }
    })
    .catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
    });
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });

export const auth = getAuth(app);
