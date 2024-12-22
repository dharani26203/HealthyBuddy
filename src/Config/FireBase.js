// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Only import Firestore functions here
import { getStorage } from "firebase/storage"; // Correctly import getStorage from firebase/storage
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAw4acGWzJyyCTAhX4hYqtPfAQexw25cVc",
  authDomain: "health-buddy-7efc3.firebaseapp.com",
  projectId: "health-buddy-7efc3",
  storageBucket: "health-buddy-7efc3.firebasestorage.app",
  messagingSenderId: "858051198410",
  appId: "1:858051198410:web:154381b1e1b684aba2a333",
  measurementId: "G-XJNV4X747D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export const storage = getStorage(app); // Initialize storage correctly
const analytics = getAnalytics(app);
