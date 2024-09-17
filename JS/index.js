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

// ---- REWORKED TRIANGLE INTERACTION CODE ----

// Track mouse position relative to the document (so it works with scroll)
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

// Update mouse position on mousemove
window.addEventListener('mousemove', (e) => {
    mouseX = e.pageX;
    mouseY = e.pageY;
});

// Triangle generation and interaction logic
const heroSection = document.querySelector('.triangle-container');

// Generate random triangles and handle their behavior
function createTriangle() {
    const triangle = document.createElement('div');
    triangle.classList.add('triangle');
    
    // Random size for each triangle
    const size = Math.random() * 150 + 50; // Size between 50px and 200px

    // Set initial home position for the triangle (within the viewport)
    const homeX = Math.random() * window.innerWidth;
    const homeY = Math.random() * window.innerHeight;

    // Initialize the triangle's styles
    triangle.style.width = `0px`;
    triangle.style.height = `0px`;
    triangle.style.borderLeft = `${size / 2}px solid transparent`;
    triangle.style.borderRight = `${size / 2}px solid transparent`;
    triangle.style.borderBottom = `${size}px solid rgba(255, 255, 255, 0.2)`;
    triangle.style.position = 'absolute';
    triangle.style.left = `${homeX}px`;
    triangle.style.top = `${homeY}px`;

    // Random initial rotation
    let angle = Math.random() * 360;
    triangle.style.transform = `rotate(${angle}deg)`;

    // Random direction and speed of rotation
    const isClockwise = Math.random() < 0.5 ? 1 : -1;
    const rotateSpeed = Math.random() * 15 + 10; // Between 10s and 25s for full rotation

    // Triangle's current position
    let currentX = homeX;
    let currentY = homeY;

    // Function to continuously update the triangle's behavior
    function updateTriangle() {
        // Calculate the current center of the triangle
        const triangleRect = triangle.getBoundingClientRect();
        const triangleX = triangleRect.left + triangleRect.width / 2 + window.scrollX;
        const triangleY = triangleRect.top + triangleRect.height / 2 + window.scrollY;

        // Calculate distance between mouse and triangle
        const distX = triangleX - mouseX;
        const distY = triangleY - mouseY;
        const distance = Math.sqrt(distX * distX + distY * distY); // Pythagorean theorem

        // Define interaction distance (larger triangles will react from further away)
        const moveDistance = size * 2; // Larger triangles = larger move distance

        // If the mouse is within the interaction range, move the triangle away from the mouse
        if (distance < moveDistance) {
            const moveFactor = (moveDistance - distance) / moveDistance; // The closer the mouse, the stronger the push
            currentX += distX * moveFactor * 0.1; // Control movement speed
            currentY += distY * moveFactor * 0.1;
        } else {
            // If the mouse is far away, smoothly move the triangle back to its home position
            currentX += (homeX - currentX) * 0.05; // Smooth "spring-back" motion
            currentY += (homeY - currentY) * 0.05;
        }

        // Apply the movement to the triangle
        triangle.style.left = `${currentX}px`;
        triangle.style.top = `${currentY}px`;

        // Rotate the triangle
        angle += isClockwise * 0.1; // Slow rotation
        triangle.style.transform = `rotate(${angle}deg)`;

        // Call updateTriangle again on the next frame
        requestAnimationFrame(updateTriangle);
    }

    // Start continuously updating the triangle's position and behavior
    updateTriangle();

    // Append the triangle to the hero section
    heroSection.appendChild(triangle);
}

// Generate a random number of triangles between 8 and 16
const triangleCount = Math.floor(Math.random() * 9) + 8;
for (let i = 0; i < triangleCount; i++) {
    createTriangle();
}

// ---- END OF REWORKED TRIANGLE INTERACTION CODE ----
