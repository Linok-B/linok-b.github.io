// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDOGKrv0h7vxmUtrhTG3NaSZqXep7lnvLA",
    authDomain: "linok-github-io.firebaseapp.com",
    projectId: "linok-github-io",
    storageBucket: "linok-github-io.appspot.com",
    messagingSenderId: "644902002590",
    appId: "1:644902002590:web:5c2c2c70c50e531fb9408f",
    measurementId: "G-SWYRCWSL2D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Check if user is logged in
onAuthStateChanged(auth, (user) => {
    if (!user) {
        // Redirect to login page if not logged in
        window.location.href = "login.html";
    }
});
