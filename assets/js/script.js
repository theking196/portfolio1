// Loading Screen
window.addEventListener('load', () => {
    const loading = document.getElementById('loading');
    setTimeout(() => {
        loading.classList.add('fade-out');
        setTimeout(() => {
            loading.style.display = 'none';
        }, 500);
    }, 1000);
});

// Custom Cursor
const cursor = document.getElementById('cursor');
const cursorFollower = { x: 0, y: 0 };

document.addEventListener('mousemove', (e) => {
    cursorFollower.x = e.clientX;
    cursorFollower.y = e.clientY;
});

function updateCursor() {
    cursor.style.left = cursorFollower.x + 'px';
    cursor.style.top = cursorFollower.y + 'px';
    requestAnimationFrame(updateCursor);
}
updateCursor();

// Cursor hover effects
const hoverElements = document.querySelectorAll('a, button, .portfolio-item');
hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

// Navigation
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100; // Adjust offset as needed
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
            currentSection = section.id;
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});

// MOBILE MENU TOGGLE
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// CLOSE BUTTON CLICK (TRIGGERS HAMBURGER TO CLOSE)
document.querySelector('.mobile-close a')?.addEventListener('click', (e) => {
    e.preventDefault();
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // Close mobile menu if open
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');

            // Update active nav link
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        }
    });
});

// Portfolio Filter
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');

        // Update active filter button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Filter portfolio items
        portfolioItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Contact Form
const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;

        try {
            // Show loading spinner in Swal
            Swal.fire({
                title: 'Sending...',
                html: 'Please wait while we process your message.',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });

            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            const result = await response.json();

            if (response.ok && result.ok) {
                // Success: Show SweetAlert
                Swal.fire({
                    icon: 'success',
                    title: 'Message Sent!',
                    text: 'We’ll get back to you soon.',
                    confirmButtonColor: '#00f5ff'
                });
                form.reset();
            } else {
                console.log(response);
                console.log(result);
                // Formspree validation errors
                const errors = result.errors?.map(e => e.message).join('<br>') || 
                              'An unknown error occurred.';
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    html: errors,
                    confirmButtonColor: '#00f5ff'
                });
            }
        } catch (error) {
            // Network error
            Swal.fire({
                icon: 'error',
                title: 'Network Error',
                text: 'Failed to send message. Please try again later.',
                confirmButtonColor: '#00f5ff'
            });
            console.error('Form submission error:', error);
        }
    });

// Scroll to Top Button
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Initialize GSAP animations
gsap.registerPlugin(ScrollTrigger);
document.querySelectorAll('.fade-up').forEach((el) => {
    gsap.fromTo(el,
        { opacity: 0, y: 40 },
        {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
                trigger: el,
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        }
    );
});