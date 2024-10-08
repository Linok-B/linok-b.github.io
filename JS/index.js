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

// ---- FIX FOR MOUSE OUTSIDE HERO SECTION AND SCROLL BEHAVIOR ----

// Global variables for mouse and scroll tracking
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let scrollX = window.scrollX;
let scrollY = window.scrollY;
let alphaMouseX = mouseX;  // The new combined mouse + scroll position
let alphaMouseY = mouseY;

// Function to track mouse position
function trackMousePosition(e) {
    mouseX = e.pageX;
    mouseY = e.pageY;

    // Update alphaMouseX and alphaMouseY with combined data
    alphaMouseX = mouseX + scrollX;
    alphaMouseY = mouseY + scrollY;
}

// Function to track scroll position
function trackScrollPosition() {
    scrollX = window.scrollX;
    scrollY = window.scrollY;

    // Even if the mouse isn't moving, update the alphaMouse variables based on scroll
    alphaMouseX = mouseX + scrollX;
    alphaMouseY = mouseY + scrollY;
}

// Function to handle mouse leaving the hero section
function handleMouseOutOfHero() {
    const heroSection = document.querySelector('.triangle-container');
    const heroRect = heroSection.getBoundingClientRect();

    // If the real mouse is outside the hero section, continue updating alphaMouse
    if (mouseY < heroRect.top || mouseY > heroRect.bottom) {
        alphaMouseX = scrollX + window.innerWidth / 2; // Simulate alphaMouse in the middle
        alphaMouseY = scrollY + window.innerHeight / 2; // Simulate alphaMouse in the middle
    }
}

// Main function to handle both mouse and scroll interactions with triangles
function handleTriangleInteraction(triangle, homeX, homeY, size) {
    let currentX = homeX; // Triangle's current X position
    let currentY = homeY; // Triangle's current Y position
    let angle = Math.random() * 360; // Random initial rotation
    const isClockwise = Math.random() < 0.5 ? 1 : -1; // Random rotation direction
    const rotateSpeed = Math.random() * 15 + 10; // Random rotation speed

    // Function to continuously update the triangle's behavior
    function updateTrianglePosition() {
        const triangleRect = triangle.getBoundingClientRect(); // Triangle's current position relative to viewport
        const triangleX = triangleRect.left + triangleRect.width / 2 + scrollX; // Triangle's absolute position on page
        const triangleY = triangleRect.top + triangleRect.height / 2 + scrollY;

        // Calculate distance between the combined mouse position (alphaMouse) and triangle
        const distX = triangleX - alphaMouseX;
        const distY = triangleY - alphaMouseY;
        const distance = Math.sqrt(distX * distX + distY * distY); // Pythagorean theorem

        // Define the distance at which the triangle reacts to the mouse
        const moveDistance = size * 1.4;  // Reduced threshold from 1.5 to 1.4 for smoother large triangle behavior

        if (distance < moveDistance) {
            // Move the triangle away from the mouse
            const moveFactor = (moveDistance - distance) / moveDistance; // Move intensity
            currentX += distX * moveFactor * 0.1;
            currentY += distY * moveFactor * 0.1;
        } else {
            // Slide the triangle back to its home position
            currentX += (homeX - currentX) * 0.05; // Smooth return to home
            currentY += (homeY - currentY) * 0.05;
        }

        // Apply the updated position and rotation to the triangle
        triangle.style.left = `${currentX}px`;
        triangle.style.top = `${currentY}px`;
        angle += isClockwise * 0.1; // Slow rotation
        triangle.style.transform = `rotate(${angle}deg)`;

        // Continuously update the triangle's behavior
        requestAnimationFrame(updateTrianglePosition);
    }

    // Start updating the triangle's position
    updateTrianglePosition();
}

// Main function to handle all triangle behavior
function initTriangleBehavior() {
    const heroSection = document.querySelector('.triangle-container');

    // Generate triangles
    const triangleCount = Math.floor(Math.random() * 9) + 8; // Between 8 and 16 triangles
    for (let i = 0; i < triangleCount; i++) {
        const triangle = document.createElement('div');
        triangle.classList.add('triangle');

        // Random size and home position
        const size = Math.random() * 150 + 50; // Size between 50px and 200px
        const homeX = Math.random() * window.innerWidth;
        const homeY = Math.random() * window.innerHeight;

        // Set initial triangle styles
        triangle.style.width = `0px`;
        triangle.style.height = `0px`;
        triangle.style.borderLeft = `${size / 2}px solid transparent`;
        triangle.style.borderRight = `${size / 2}px solid transparent`;
        triangle.style.borderBottom = `${size}px solid rgba(255, 255, 255, 0.2)`;
        triangle.style.position = 'absolute';
        triangle.style.left = `${homeX}px`;
        triangle.style.top = `${homeY}px`;

        // Append triangle to the hero section
        heroSection.appendChild(triangle);

        // Handle interaction for this specific triangle
        handleTriangleInteraction(triangle, homeX, homeY, size);
    }
}

// Add event listeners to track mouse and scroll positions
window.addEventListener('mousemove', trackMousePosition);
window.addEventListener('scroll', trackScrollPosition);

// Check if the mouse is outside the hero section on scroll
window.addEventListener('scroll', handleMouseOutOfHero);

// Initialize the triangle behavior when the page loads
window.addEventListener('DOMContentLoaded', initTriangleBehavior);

// ---- END OF FIX ----
