// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdzzFZitw1GRNl-2R6A9TNCFjn6k7HH7Y",
  authDomain: "primer-firebase-2024.firebaseapp.com",
  projectId: "primer-firebase-2024",
  storageBucket: "primer-firebase-2024.appspot.com",
  messagingSenderId: "954438129290",
  appId: "1:954438129290:web:8ab6f3f790aaaf1df7bf73",
  measurementId: "G-E8Q5HQGZ48"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);