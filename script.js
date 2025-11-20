// ===========================
// Smooth Scroll & Section Navigation
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

        // Scroll to section
        sections[currentSection].scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

        // Reset scrolling flag
        setTimeout(() => {
            isScrolling = false;
        }, 1000);
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
        const circumference = 2 * Math.PI * 80; // radius = 80
        const offset = circumference - (percent / 100) * circumference;

        setTimeout(() => {
            circle.style.strokeDashoffset = offset;
        }, 100);
    });
}

// ===========================
// Smooth Hover Effects
// ===========================

// Gallery items hover effect
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.05)';
    });

    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Project cards hover effect
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ===========================
// Dynamic Text Animation
// ===========================

function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// ===========================
// Parallax Effect
// ===========================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero::before, .projects-timeline::before');

    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

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
// Preload Images (if any added later)
// ===========================

function preloadImages() {
    const images = document.querySelectorAll('img[data-src]');

    images.forEach(img => {
        const src = img.getAttribute('data-src');
        if (src) {
            img.src = src;
            img.removeAttribute('data-src');
        }
    });
}

// Call preload when page is loaded
window.addEventListener('load', preloadImages);

// ===========================
// Form Validation (if contact form added)
// ===========================

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ===========================
// Scroll Progress Indicator
// ===========================

function updateScrollProgress() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;

    // Can be used to show a progress bar if needed
    return scrolled;
}

window.addEventListener('scroll', updateScrollProgress);

// ===========================
// Lazy Loading Effect
// ===========================

const lazyLoadObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            lazyLoadObserver.unobserve(entry.target);
        }
    });
});

// Observe elements for lazy loading
document.querySelectorAll('.timeline-item, .gallery-item, .project-card, .testimonial-item').forEach(el => {
    lazyLoadObserver.observe(el);
});

// ===========================
// Mobile Menu Toggle (if needed later)
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
// Performance: Debounce Function
// ===========================

function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Use debounce for scroll events
const efficientScroll = debounce(function() {
    updateScrollProgress();
});

window.addEventListener('scroll', efficientScroll);

// ===========================
// Console Message
// ===========================

console.log('%c Portfolio Hasiniavo Ramanatseheno ', 'background: #2b2b2b; color: #f5f5f0; font-size: 20px; padding: 10px;');
console.log('%c Business Analyst IT Salesforce ', 'background: #d4a574; color: #2b2b2b; font-size: 16px; padding: 5px;');
