// JavaScript for interactive elements and transitions

// Redirect function
function redirectTo(page) {
    window.location.href = page;
}

// Scroll to section
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}

// Toggle info boxes in About Me section
const infoBoxes = document.querySelectorAll('.info-box');

infoBoxes.forEach(box => {
    box.addEventListener('click', () => {
        box.classList.toggle('active');
        infoBoxes.forEach(otherBox => {
            if (otherBox !== box) otherBox.classList.remove('active');
        });
    });
});
