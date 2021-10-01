// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-analytics.js";
import { getDatabase, get, ref, onValue } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-database.js";
import { setupEncryptAttributs } from "./encrypt.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBNDtUJJHQSl6eTohTEXJdPybb36UP1k10",
    authDomain: "furwaz-website.firebaseapp.com",
    databaseURL: "https://furwaz-website-default-rtdb.firebaseio.com/",
    projectId: "furwaz-website",
    storageBucket: "furwaz-website.appspot.com",
    messagingSenderId: "540937834652",
    appId: "1:540937834652:web:29907fc91826a646499d59",
    measurementId: "G-D9QZSPK8L4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export function setupDatabase() {
    const database = getDatabase(app);
    onValue(ref(database, "/encrypt/"), (v) => {
        let data = v.val();
        setupEncryptAttributs(data.alphabet, data.key);
    });
}