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
    
    // Random size and initial position (home position)
    const size = Math.random() * 150 + 50; // Size between 50px and 200px
    const homeX = Math.random() * window.innerWidth;
    const homeY = Math.random() * window.innerHeight;

    triangle.style.width = `0px`;
    triangle.style.height = `0px`;
    triangle.style.borderLeft = `${size / 2}px solid transparent`;
    triangle.style.borderRight = `${size / 2}px solid transparent`;
    triangle.style.borderBottom = `${size}px solid rgba(255, 255, 255, 0.2)`;

    let currentX = homeX; // Current position starts at home position
    let currentY = homeY;
    triangle.style.position = 'absolute';
    triangle.style.left = `${currentX}px`;
    triangle.style.top = `${currentY}px`;

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

    // Continuously check distance from mouse and move away/return to home
    function moveTriangle() {
        const distX = currentX - mouseX;
        const distY = currentY - mouseY;
        const distance = Math.sqrt(distX * distX + distY * distY); // Pythagorean theorem

        // Define how far the mouse needs to be to start moving the triangle (inverted logic)
        const moveDistance = 300 - size; // Larger triangles start moving earlier, smaller ones let the mouse get closer

        if (distance < moveDistance) {
            // Move triangle away from mouse when close
            const moveFactor = (moveDistance - distance) / moveDistance; // Move intensity
            currentX += distX * moveFactor * 0.1; // 0.1 factor to control movement speed
            currentY += distY * moveFactor * 0.1;
        } else {
            // Slide triangle back to its original (home) position when far away
            currentX += (homeX - currentX) * 0.05; // 0.05 is the "spring-back" speed
            currentY += (homeY - currentY) * 0.05;
        }

        triangle.style.left = `${currentX}px`;
        triangle.style.top = `${currentY}px`;

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
