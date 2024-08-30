// JavaScript for Firebase Authentication
document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('loginBtn');
    const loginForm = document.getElementById('loginForm');

    // Show login modal
    loginBtn.onclick = () => {
        $('#loginModal').modal('show');
    };

    // Handle login form submission
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
});
