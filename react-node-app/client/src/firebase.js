
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";
import { connectAuthEmulator, getAuth } from "firebase/auth";



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
const analytics = getAnalytics(app);
const firestore = getFirestore(app);
export const auth = getAuth(app);