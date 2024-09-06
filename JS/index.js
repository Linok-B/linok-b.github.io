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

// Track mouse position
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

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

    let randomX = Math.random() * window.innerWidth; // Random position in px
    let randomY = Math.random() * window.innerHeight;
    triangle.style.position = 'absolute';
    triangle.style.left = `${randomX}px`;
    triangle.style.top = `${randomY}px`;

    // Set rotation and direction using JavaScript
    const isClockwise = Math.random() < 0.5; // Randomly decide direction
    const rotateSpeed = Math.random() * 15 + 10; // Slow spin between 10s and 25s
    const rotationDirection = isClockwise ? 1 : -1; // 1 for clockwise, -1 for counterclockwise

    // Apply rotation using JavaScript
    let angle = 0;
    setInterval(() => {
        angle += rotationDirection * 0.1; // Rotate slowly
        triangle.style.transform = `rotate(${angle}deg)`;
    }, 16); // 16ms for ~60fps rotation

    // Continuously check distance from mouse and move away
    function moveTriangle() {
        const distX = randomX - mouseX;
        const distY = randomY - mouseY;
        const distance = Math.sqrt(distX * distX + distY * distY); // Pythagorean theorem

        // Less intense movement (small ripple effect)
        const moveFactor = Math.max(150 - distance, 0) / 40; // Adjust intensity and sensitivity

        // Apply movement based on direction away from the mouse
        randomX += distX * moveFactor;
        randomY += distY * moveFactor;

        triangle.style.left = `${randomX}px`;
        triangle.style.top = `${randomY}px`;

        // Repeat movement
        requestAnimationFrame(moveTriangle);
    }

    // Start triangle movement
    moveTriangle();

    heroSection.appendChild(triangle);
}

// Generate a random number of triangles between 8 and 16
const triangleCount = Math.floor(Math.random() * 9) + 8;
for (let i = 0; i < triangleCount; i++) {
    createTriangle();
}
