// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

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

document.addEventListener('DOMContentLoaded', () => {
    // Handle login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Redirect to home page on successful login
                    window.location.href = "index.html";
                })
                .catch((error) => {
                    showPopup("Error", `Error logging in: ${error.message}`);
                });
        });
    }

    // Function to show custom pop-up
    function showPopup(title, message) {
        const popupContainer = document.createElement('div');
        popupContainer.classList.add('popup-container');
        popupContainer.innerHTML = `
            <div class="popup-content">
                <h4>${title}</h4>
                <p>${message}</p>
                <button class="btn btn-primary" id="closePopup">Close</button>
            </div>
        `;
        document.body.appendChild(popupContainer);

        const closePopup = () => {
            popupContainer.remove();
        };

        document.getElementById('closePopup').onclick = closePopup;
        popupContainer.onclick = (e) => {
            if (e.target === popupContainer) {
                closePopup();
            }
        };
    }
});
