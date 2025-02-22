// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDnfQPFHUnvMrRbJvZDehXfnXE4N2r0Bc8",
    authDomain: "emotored-d57af.firebaseapp.com",
    projectId: "emotored-d57af",
    storageBucket: "emotored-d57af.firebasestorage.app",
    messagingSenderId: "435161573151",
    appId: "1:435161573151:web:afc21aab7d089616e0322a",
    measurementId: "G-15L8NQGB2P"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
