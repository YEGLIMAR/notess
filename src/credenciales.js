// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCiiQB8LijkEjLJuLSv0g6sifVr64d9dpI",
  authDomain: "yegli-notas.firebaseapp.com",
  projectId: "yegli-notas",
  storageBucket: "yegli-notas.appspot.com",
  messagingSenderId: "344024792281",
  appId: "1:344024792281:web:2aa08dc034ca5441a7d2c8",
  measurementId: "G-C08394EH8F"
};

// Initialize Firebase
const appFirebase= initializeApp(firebaseConfig);
export default appFirebase;