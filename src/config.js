import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyATVMAwhseYOlyjgSAbLlYmORhJmqTl5n8",
  authDomain: "milestone-e7be0.firebaseapp.com",
  projectId: "milestone-e7be0",
  storageBucket: "milestone-e7be0.appspot.com",
  messagingSenderId: "1071714978908",
  appId: "1:1071714978908:web:ff3b4fe6af2dfd4928ea99",
  measurementId: "G-KWVXSHYJDH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();


export { auth };
