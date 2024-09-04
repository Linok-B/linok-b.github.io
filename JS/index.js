// JavaScript for interactive elements and transitions

// Function to toggle info boxes in About Me section
const infoBoxes = document.querySelectorAll('.info-box');
const overlay = document.getElementById('overlay');

infoBoxes.forEach(box => {
    box.addEventListener('click', () => {
        closeInfoBoxes();  // Close any open boxes before opening a new one
        box.classList.toggle('active');
        overlay.classList.toggle('active');
    });
});

overlay.addEventListener('click', () => {
    closeInfoBoxes();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeInfoBoxes();
    }
});

function closeInfoBoxes() {
    infoBoxes.forEach(box => {
        box.classList.remove('active');
    });
    overlay.classList.remove('active');
}

// Smooth scrolling for navigation links (optional enhancement)
const navLinks = document.querySelectorAll('nav ul li a');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        window.scrollTo({
            top: targetElement.offsetTop - 60,  // Adjust offset for fixed header
            behavior: 'smooth'
        });
    });
});

// Hero section animation for decorative triangles
function animateTriangles() {
    const triangles = document.querySelectorAll('#hero::before, #hero::after');
    
    triangles.forEach((triangle, index) => {
        setInterval(() => {
            const randomRotation = Math.random() * 360;
            const randomScale = Math.random() * 0.5 + 0.75;
            triangle.style.transform = `rotate(${randomRotation}deg) scale(${randomScale})`;
        }, 5000); // Adjust the timing as needed
    });
}

document.addEventListener('DOMContentLoaded', () => {
    animateTriangles(); // Call animation function when DOM is loaded
});
