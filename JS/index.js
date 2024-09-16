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

// Button pulsating effect for the "Explore" button
const exploreButton = document.querySelector('.hero-content button');
if (exploreButton) {
    exploreButton.style.animation = 'pulse 1.5s infinite'; // Add pulsating animation
}

// Variables to track mouse and scroll positions
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let scrollX = window.scrollX;
let scrollY = window.scrollY;

// Update mouse coordinates on mouse movement
window.addEventListener('mousemove', (e) => {
    mouseX = e.pageX;
    mouseY = e.pageY;
});

// Track scroll position changes
window.addEventListener('scroll', () => {
    scrollX = window.scrollX;
    scrollY = window.scrollY;
});

// Function to create and animate triangles
function createTriangle() {
    const triangle = document.createElement('div');
    triangle.classList.add('triangle');

    // Random size and initial position
    const size = Math.random() * 150 + 50;
    const homeX = Math.random() * window.innerWidth;
    const homeY = Math.random() * window.innerHeight;
    
    let currentX = homeX;
    let currentY = homeY;
    
    triangle.style.width = `0px`;
    triangle.style.height = `0px`;
    triangle.style.borderLeft = `${size / 2}px solid transparent`;
    triangle.style.borderRight = `${size / 2}px solid transparent`;
    triangle.style.borderBottom = `${size}px solid rgba(255, 255, 255, 0.2)`;
    
    triangle.style.position = 'absolute';
    triangle.style.left = `${currentX}px`;
    triangle.style.top = `${currentY}px`;

    // Initial rotation for random orientation
    let angle = Math.random() * 360;
    const isClockwise = Math.random() < 0.5;
    const rotateSpeed = Math.random() * 15 + 10;
    
    // Apply rotation
    setInterval(() => {
        angle += isClockwise ? 0.1 : -0.1;
        triangle.style.transform = `rotate(${angle}deg)`;
    }, 16);

    // Function to update the triangle's position
    function updateTrianglePosition() {
        // Get the triangle's current position relative to the viewport
        const triangleRect = triangle.getBoundingClientRect();
        const triangleX = triangleRect.left + triangleRect.width / 2 + scrollX;
        const triangleY = triangleRect.top + triangleRect.height / 2 + scrollY;

        // Calculate the distance between the triangle and the mouse
        const distX = triangleX - mouseX;
        const distY = triangleY - mouseY;
        const distance = Math.sqrt(distX * distX + distY * distY);

        const moveDistance = size * 1.5; // Triangles move farther when they're bigger

        if (distance < moveDistance) {
            // Move triangle away from mouse
            const moveFactor = (moveDistance - distance) / moveDistance;
            currentX += distX * moveFactor * 0.1;
            currentY += distY * moveFactor * 0.1;
        } else {
            // Move triangle back to its home position
            currentX += (homeX - currentX) * 0.05;
            currentY += (homeY - currentY) * 0.05;
        }

        // Update the triangle's position on the screen
        triangle.style.left = `${currentX}px`;
        triangle.style.top = `${currentY}px`;
    }

    // Continuously update the triangle's position on each animation frame
    function animate() {
        updateTrianglePosition();
        requestAnimationFrame(animate); // Schedule the next frame
    }

    // Start animating the triangle
    animate();
    
    // Add the triangle to the hero section
    document.querySelector('.triangle-container').appendChild(triangle);
}

// Generate a random number of triangles between 8 and 16
function generateTriangles() {
    const triangleCount = Math.floor(Math.random() * 9) + 8;
    for (let i = 0; i < triangleCount; i++) {
        createTriangle();
    }
}

// Initialize the triangles
generateTriangles();
