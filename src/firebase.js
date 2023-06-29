// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDe2Wky6r8-q5XoskajllkO-R2ibLcm2yA",
  authDomain: "portfolio-projects-backe-8a571.firebaseapp.com",
  projectId: "portfolio-projects-backe-8a571",
  storageBucket: "portfolio-projects-backe-8a571.appspot.com",
  messagingSenderId: "225113333411",
  appId: "1:225113333411:web:a45d5026b7f5db638f2916",
  measurementId: "G-SNRC4FT7GH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const taskTrackerDB = getFirestore(app);  