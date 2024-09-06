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

    const randomX = Math.random() * window.innerWidth; // Random position in px (not %)
    const randomY = Math.random() * window.innerHeight;
    triangle.style.position = 'absolute';
    triangle.style.left = `${randomX}px`;
    triangle.style.top = `${randomY}px`;

    // Triangle spin - clockwise or counterclockwise
    const isClockwise = Math.random() < 0.5; // Randomly decide direction
    const rotateSpeed = Math.random() * 15 + 10; // Slow spin between 10s and 25s
    const rotateAnimation = isClockwise ? 'rotate(360deg)' : 'rotate(-360deg)';
    triangle.style.animation = `${rotateAnimation} ${rotateSpeed}s infinite linear`;

    // Triangle mouse interaction - move away from mouse
    window.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        // Calculate distance between mouse and triangle
        const distX = randomX - mouseX;
        const distY = randomY - mouseY;
        const distance = Math.sqrt(distX * distX + distY * distY); // Pythagorean theorem

        const moveFactor = Math.max(200 - distance, 0) / 10; // Move based on distance (adjust 200 and 10 for sensitivity)

        // Apply movement based on direction away from the mouse
        triangle.style.transform = `translate(${distX * moveFactor}px, ${distY * moveFactor}px)`;
    });

    heroSection.appendChild(triangle);
}

// Generate a random number of triangles between 8 and 16
const triangleCount = Math.floor(Math.random() * 9) + 8;
for (let i = 0; i < triangleCount; i++) {
    createTriangle();
}
