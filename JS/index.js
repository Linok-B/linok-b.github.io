document.addEventListener('DOMContentLoaded', () => {
    // Scroll animation for sections
    const sections = document.querySelectorAll('.about-section, .cta-section');
    const options = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Redirect to specific pages on button click
    document.querySelector('.hero-section button').onclick = () => {
        window.location.href = "projects.html";
    };

    document.getElementById('contactBtn').onclick = () => {
        window.location.href = "contact.html";
    };
});
