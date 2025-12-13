
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCK418F3BGKR6A-mXTrYgStDAWNWGXzltA",
    authDomain: "vgoldenjets-base-de-datos.firebaseapp.com",
    projectId: "vgoldenjets-base-de-datos",
    storageBucket: "vgoldenjets-base-de-datos.firebasestorage.app",
    messagingSenderId: "120318894298",
    appId: "1:120318894298:web:f135fb0eac3c4f60aa85e3",
    measurementId: "G-V4V5W6PLL8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
