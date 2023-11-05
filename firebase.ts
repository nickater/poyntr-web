// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCa70jsvDFqDE7rksb7lTrfHGFAOZEf2IY",
  authDomain: "poyntr-1cf4e.firebaseapp.com",
  projectId: "poyntr-1cf4e",
  storageBucket: "poyntr-1cf4e.appspot.com",
  messagingSenderId: "532223129084",
  appId: "1:532223129084:web:c914a1ba82a39000df2e79",
  measurementId: "G-ZY8K986VRV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { analytics, app, db };
