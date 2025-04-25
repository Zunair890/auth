// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ,
  authDomain: "mern-auth-d7ff4.firebaseapp.com",
  projectId: "mern-auth-d7ff4",
  storageBucket: "mern-auth-d7ff4.firebasestorage.app",
  messagingSenderId: "27978732653",
  appId: "1:27978732653:web:f2438f45b79c8e5d051b64"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);