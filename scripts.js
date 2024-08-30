// Initialize Firebase
document.addEventListener('DOMContentLoaded', () => {
    // Replace this config object with your project's configuration from Firebase Console
    const firebaseConfig = {
        apiKey: "YOUR_API_KEY",
        authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
        projectId: "YOUR_PROJECT_ID",
        storageBucket: "YOUR_PROJECT_ID.appspot.com",
        messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
        appId: "YOUR_APP_ID"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();

    // Handle login button click
    const loginBtn = document.getElementById('loginBtn');
    loginBtn.onclick = () => {
        $('#loginModal').modal('show');
    };

    // Handle login form submission
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Successful login
                alert('Logged in successfully!');
                $('#loginModal').modal('hide');
                // Redirect to a logged-in page or show logged-in content
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(`Error: ${errorMessage}`);
            });
    });

    // Handle account request form submission
    const accountRequestForm = document.getElementById('accountRequestForm');
    if (accountRequestForm) {
        accountRequestForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const message = document.getElementById('message').value;

            // Save the account request to Firestore
            db.collection('accountRequests').add({
                username: username,
                email: email,
                password: password, // Note: In a real application, do not store plain passwords.
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
