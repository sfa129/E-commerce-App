import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";

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
export const auth = getAuth(app);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);