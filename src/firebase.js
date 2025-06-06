// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBATNZgTQ4kQJXJMcSWNsHeYT9ggXiHufo",
  authDomain: "e-commerce-f6c4d.firebaseapp.com",
  projectId: "e-commerce-f6c4d",
  storageBucket: "e-commerce-f6c4d.firebasestorage.app",
  messagingSenderId: "159781970613",
  appId: "1:159781970613:web:1ea7d45b52a9b1abc2d4fc",
  measurementId: "G-D9ZV7YNYDR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);