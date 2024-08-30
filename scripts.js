// Login Modal
document.addEventListener('DOMContentLoaded', () => {
    const loginModal = document.getElementById('loginModal');
    const loginBtn = document.getElementById('loginBtn');
    const closeBtn = document.getElementsByClassName('close')[0];

    // Open the login modal
    loginBtn.onclick = () => {
        loginModal.style.display = 'block';
    };

    // Close the login modal
    closeBtn.onclick = () => {
        loginModal.style.display = 'none';
    };

    // Close the modal when clicking outside of it
    window.onclick = (event) => {
        if (event.target == loginModal) {
            loginModal.style.display = 'none';
        }
    };
});
