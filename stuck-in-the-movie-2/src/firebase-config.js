import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
} from "firebase/auth";



const firebaseConfig = {
    apiKey: "AIzaSyD_Jr5a3V5QcqI3EWwQpLMZ0Fto5tMheCY",
    authDomain: "stuck-in-the-movie-27889.firebaseapp.com",
    projectId: "stuck-in-the-movie-27889",
    storageBucket: "stuck-in-the-movie-27889.appspot.com",
    messagingSenderId: "786850211309",
    appId: "1:786850211309:web:97977382b8f399c2d6b3e4",
    measurementId: "G-GS67R9KFPQ"
};

const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
export const auth = getAuth(app);


export const db = getFirestore(app);
