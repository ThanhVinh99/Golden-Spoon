import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCMcDkJvVeL7kIVRPBFDMgvRUPZ6hnVLVs",
    authDomain: "vinhfilm-68318.firebaseapp.com",
    projectId: "vinhfilm-68318",
    storageBucket: "vinhfilm-68318.firebasestorage.app",
    messagingSenderId: "925558540485",
    appId: "1:925558540485:web:78c813c917ad36f00848ac",
    measurementId: "G-PWYVGQ6LZB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase services
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();