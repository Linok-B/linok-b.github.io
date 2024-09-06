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

// Triangle generation and animation
const heroSection = document.querySelector('.triangle-container');

// Generate random triangles
function createTriangle() {
    const triangle = document.createElement('div');
    triangle.classList.add('triangle');
    
    // Random size and position
    const size = Math.random() * 150 + 50; // Size between 50px and 200px
    triangle.style.width = `0px`;
    triangle.style.height = `0px`;
    triangle.style.borderLeft = `${size / 2}px solid transparent`;
    triangle.style.borderRight = `${size / 2}px solid transparent`;
    triangle.style.borderBottom = `${size}px solid rgba(255, 255, 255, 0.2)`;

    const randomX = Math.random() * 100; // Random position between 0% and 100% width
    const randomY = Math.random() * 100; // Random position between 0% and 100% height
    triangle.style.position = 'absolute';
    triangle.style.left = `${randomX}%`;
    triangle.style.top = `${randomY}%`;

    const rotationDirection = Math.random() < 0.5 ? 'rotate' : 'rotate(-'; // Random clockwise or counterclockwise rotation
    const rotateSpeed = Math.random() * 15 + 10; // Slow spin between 10s and 25s
    triangle.style.animation = `${rotationDirection}${360}deg) ${rotateSpeed}s infinite linear`;

    // Triangle mouse interaction - move away from mouse
    window.addEventListener('mousemove', (e) => {
        const moveX = (e.clientX / window.innerWidth) * 20;
        const moveY = (e.clientY / window.innerHeight) * 20;
        triangle.style.transform = `translate(${(randomX - moveX)}px, ${(randomY - moveY)}px)`;
    });


    heroSection.appendChild(triangle);
}

// Generate multiple triangles
const triangleCount = Math.floor(Math.random() * 9) + 8; // Random number between 8 and 16
for (let i = 0; i < triangleCount; i++) {
    createTriangle();
}
