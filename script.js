// ===========================
// Section Navigation
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.section');
    const navDots = document.querySelectorAll('.dot');
    let currentSection = 0;
    let isScrolling = false;

    // Initialize first section
    sections[0].classList.add('active');

    // Navigation dots click
    navDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            navigateToSection(index);
        });
    });

    // Mouse wheel navigation
    let scrollTimeout;
    window.addEventListener('wheel', (e) => {
        clearTimeout(scrollTimeout);

        scrollTimeout = setTimeout(() => {
            if (isScrolling) return;

            if (e.deltaY > 0 && currentSection < sections.length - 1) {
                // Scroll down
                navigateToSection(currentSection + 1);
            } else if (e.deltaY < 0 && currentSection > 0) {
                // Scroll up
                navigateToSection(currentSection - 1);
            }
        }, 50);
    }, { passive: true });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (isScrolling) return;

        if (e.key === 'ArrowDown' && currentSection < sections.length - 1) {
            navigateToSection(currentSection + 1);
        } else if (e.key === 'ArrowUp' && currentSection > 0) {
            navigateToSection(currentSection - 1);
        }
    });

    // Touch navigation for mobile
    let touchStartY = 0;
    let touchEndY = 0;

    document.addEventListener('touchstart', (e) => {
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    document.addEventListener('touchend', (e) => {
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        if (isScrolling) return;

        const swipeDistance = touchStartY - touchEndY;
        const threshold = 50;

        if (swipeDistance > threshold && currentSection < sections.length - 1) {
            // Swipe up
            navigateToSection(currentSection + 1);
        } else if (swipeDistance < -threshold && currentSection > 0) {
            // Swipe down
            navigateToSection(currentSection - 1);
        }
    }

    function navigateToSection(index) {
        if (index === currentSection || isScrolling) return;

        isScrolling = true;

        // Remove active class from current section
        sections[currentSection].classList.remove('active');
        navDots[currentSection].classList.remove('active');

        // Update current section
        currentSection = index;

        // Add active class to new section
        sections[currentSection].classList.add('active');
        navDots[currentSection].classList.add('active');

        // Scroll to section with smooth animation
        sections[currentSection].scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

        // Reset scrolling flag
        setTimeout(() => {
            isScrolling = false;
        }, 800);
    }

    // Scroll indicator click
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            navigateToSection(1);
        });
    }
});

// ===========================
// Intersection Observer for Animations
// ===========================

const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');

            // Animate skill circles when visible
            if (entry.target.classList.contains('personal-skills')) {
                animateSkillCircles();
            }
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// ===========================
// Skill Circles Animation
// ===========================

function animateSkillCircles() {
    const circles = document.querySelectorAll('.progress-ring-circle');

    circles.forEach(circle => {
        const percent = parseInt(circle.getAttribute('data-percent'));
        const radius = 64; // Updated radius for smaller circles
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (percent / 100) * circumference;

        // Update circle instantly (no animation delay)
        circle.style.strokeDashoffset = offset;
    });
}

// ===========================
// Navigation Dot Active State on Scroll
// ===========================

window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section');
    const navDots = document.querySelectorAll('.dot');

    let current = '';

    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop - sectionHeight / 3) {
            current = index;
        }
    });

    navDots.forEach((dot, index) => {
        dot.classList.remove('active');
        if (index === current) {
            dot.classList.add('active');
        }
    });
});

// ===========================
// Smooth Anchor Links
// ===========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===========================
// Mobile Menu Toggle
// ===========================

function toggleMobileMenu() {
    const navDots = document.querySelector('.nav-dots');
    if (window.innerWidth <= 768) {
        navDots.style.display = 'none';
    } else {
        navDots.style.display = 'flex';
    }
}

window.addEventListener('resize', toggleMobileMenu);
toggleMobileMenu();

// ===========================
// Console Message
// ===========================

console.log('%c Portfolio Hasiniavo Ramanatseheno ', 'background: #000000; color: #F5F0E8; font-size: 18px; padding: 8px;');
console.log('%c Business Analyst IT Salesforce ', 'background: #D4C5B0; color: #000000; font-size: 14px; padding: 4px;');
