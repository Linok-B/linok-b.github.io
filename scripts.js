// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

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
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', () => {
    // Handle login button click
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.onclick = () => {
            $('#loginModal').modal('show');
        };
    }

    // Handle login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    alert('Logged in successfully!');
                    $('#loginModal').modal('hide');
                })
                .catch((error) => {
                    alert(`Error: ${error.message}`);
                });
        });
    }

    // Handle account request form submission
    const accountRequestForm = document.getElementById('accountRequestForm');
    if (accountRequestForm) {
        accountRequestForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Save the account request to Firestore
            addDoc(collection(db, 'accountRequests'), {
                username: username,
                email: email,
                message: message
            }).then(() => {
                alert('Your request has been submitted.');
                accountRequestForm.reset();
            }).catch((error) => {
                console.error('Error submitting request: ', error);
            });
        });
    }
});
