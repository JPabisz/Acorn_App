// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD94t05Aqav2zE7vBuB8tgVKc2vT7CnQcY",
  authDomain: "acornapp-2e18a.firebaseapp.com",
  projectId: "acornapp-2e18a",
  storageBucket: "acornapp-2e18a.appspot.com",
  messagingSenderId: "720747394299",
  appId: "1:720747394299:web:102f54fd600f338ebf6c5e",
  measurementId: "G-1KP7GMQW06"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
