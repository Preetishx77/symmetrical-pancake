import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBHDAMKaLBeF2APmTuU0ZkZjuV8V0zMuxQ",
    authDomain: "authy-187a0.firebaseapp.com",
    projectId: "authy-187a0",
    storageBucket: "authy-187a0.appspot.com",
    messagingSenderId: "136319333490",
    appId: "1:136319333490:web:c99044c13d13f3293c7eeb",
    measurementId: "G-E54Y55WYK9"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export default app;