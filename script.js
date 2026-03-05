/**
 * DigitalPro Agency - Modern JavaScript Enhancements
 * Handles:
 * 1. Mobile navigation menu toggle
 * 2. Intersection Observer for Scroll Reveal animations
 * 3. Sticky header background opacity
 * 4. Form submission simulation
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Mobile Menu Toggle Logic ---
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            // Toggle the 'active' class on both menu and nav container
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('is-active');
            
            // Basic animation for hamburger bars
            const bars = menuToggle.querySelectorAll('.bar');
            if (navLinks.classList.contains('active')) {
                bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
    }

    // Close mobile menu when any link is clicked
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                // Reset bars
                const bars = menuToggle.querySelectorAll('.bar');
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
    });

    // --- 2. Scroll Reveal Animation Logic ---
    // This function checks if elements are in the viewport as you scroll
    const revealElements = () => {
        const reveals = document.querySelectorAll('.reveal');
        
        for (let i = 0; i < reveals.length; i++) {
            const windowHeight = window.innerHeight;
            const elementTop = reveals[i].getBoundingClientRect().top;
            const elementVisible = 150; // Delay before triggering
            
            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add('active');
            } else {
                // Optional: remove class to replay animation when scrolling back up
                // reveals[i].classList.remove('active');
            }
        }
    };

    // Trigger reveal function on scroll
    window.addEventListener('scroll', revealElements);
    
    // Trigger once on load to show elements already in view (like Hero)
    revealElements();

    // --- 3. Header Scroll Effect ---
    // Changes header styling based on scroll depth
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '5px 0';
            header.style.backgroundColor = 'rgba(10, 25, 47, 0.98)';
        } else {
            header.style.padding = '0';
            header.style.backgroundColor = 'rgba(10, 25, 47, 0.85)';
        }
    });

    // --- 4. Simple Form Submission Handling ---
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Simple validation feedback
            const submitBtn = contactForm.querySelector('.btn-submit');
            const originalText = submitBtn.innerText;
            
            submitBtn.innerText = 'Sending...';
            submitBtn.disabled = true;

            // Simulate server delay
            setTimeout(() => {
                const name = document.getElementById('name').value;
                alert(`Success! Thank you, ${name}. We have received your message and will contact you shortly.`);
                
                // Reset form
                contactForm.reset();
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }

    // --- 5. Active Link Highlighting on Scroll ---
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

});
