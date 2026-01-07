// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBICzS84dS069snOET_V3poabMBFSEiMIg",
  authDomain: "e-commerce-2b2db.firebaseapp.com",
  projectId: "e-commerce-2b2db",
  storageBucket: "e-commerce-2b2db.firebasestorage.app",
  messagingSenderId: "668351962252",
  appId: "1:668351962252:web:01fb9aeb6b11ee3c5e2fa9",
  measurementId: "G-8P3E0VRMKL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default app;