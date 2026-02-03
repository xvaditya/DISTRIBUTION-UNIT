/* ============================================
   PHARMACARE DISTRIBUTION WEBSITE - SCRIPTS
   Interactive Functionality & Animations
   ============================================ */

// ============================================
// 1. MOBILE MENU TOGGLE
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close menu when a link is clicked
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    // ============================================
    // 2. CONTACT FORM SUBMISSION
    // ============================================
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);

            // Validate form
            if (!validateForm(data)) {
                showFormMessage('Please fill in all required fields correctly.', 'error');
                return;
            }

            // Simulate form submission (in production, send to backend)
            console.log('Form Data Submitted:', data);
            
            // Show success message
            showFormMessage('Thank you! We\'ll contact you shortly. Our team typically responds within 24 hours.', 'success');

            // Reset form
            contactForm.reset();

            // Clear message after 5 seconds
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        });
    }

    // ============================================
    // 3. FORM VALIDATION
    // ============================================
    function validateForm(data) {
        // Check required fields
        if (!data.name || !data.institution || !data.email || !data.phone || !data.message) {
            return false;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            return false;
        }

        // Validate phone format (basic validation)
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if (!phoneRegex.test(data.phone)) {
            return false;
        }

        return true;
    }

    // ============================================
    // 4. SHOW FORM MESSAGE
    // ============================================
    function showFormMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = type;
        formMessage.style.display = 'block';
    }

    // ============================================
    // 5. SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ============================================
    // 6. SCROLL ANIMATIONS - INTERSECTIONOBSERVER
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = `fadeInUp 0.6s ease forwards`;
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe cards and sections
    document.querySelectorAll('.service-card, .product-card, .feature, .about-content').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });

    // ============================================
    // 7. ACTIVE LINK HIGHLIGHT ON SCROLL
    // ============================================
    window.addEventListener('scroll', function() {
        let current = '';
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // ============================================
    // 8. BUTTON RIPPLE EFFECT
    // ============================================
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            // Get click position
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Create ripple element
            const ripple = document.createElement('span');
            ripple.style.width = ripple.style.height = '20px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
            ripple.style.pointerEvents = 'none';
            ripple.style.transform = 'translate(-50%, -50%)';
            ripple.style.animation = 'ripple 0.6s ease-out';

            // Add animation style if not exists
            if (!document.querySelector('style[data-ripple]')) {
                const style = document.createElement('style');
                style.setAttribute('data-ripple', 'true');
                style.textContent = `
                    @keyframes ripple {
                        to {
                            transform: translate(-50%, -50%) scale(4);
                            opacity: 0;
                        }
                    }
                `;
                document.head.appendChild(style);
            }

            // Ensure button has position relative
            if (getComputedStyle(this).position === 'static') {
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
            }

            this.appendChild(ripple);

            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // ============================================
    // 9. SERVICE CARD HOVER EFFECT
    // ============================================
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transitionDuration = '0.3s';
        });
    });

    // ============================================
    // 10. COUNTER ANIMATION (OPTIONAL - FOR STATS)
    // ============================================
    function animateCounter(element, target, duration = 1000) {
        let current = 0;
        const increment = target / (duration / 16);
        
        const counter = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(counter);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }

    // ============================================
    // 11. SCROLL TO TOP BUTTON
    // ============================================
    const scrollTopButton = document.createElement('button');
    scrollTopButton.innerHTML = '⬆';
    scrollTopButton.className = 'scroll-to-top';
    scrollTopButton.setAttribute('aria-label', 'Scroll to top');
    
    const scrollTopStyle = document.createElement('style');
    scrollTopStyle.textContent = `
        .scroll-to-top {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            background-color: var(--primary-blue);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            font-size: 20px;
            display: none;
            justify-content: center;
            align-items: center;
            z-index: 99;
            transition: all 0.3s ease;
            box-shadow: var(--shadow-md);
        }

        .scroll-to-top:hover {
            background-color: #0052a3;
            transform: translateY(-5px);
            box-shadow: var(--shadow-lg);
        }

        .scroll-to-top.show {
            display: flex;
        }

        @media (max-width: 640px) {
            .scroll-to-top {
                width: 45px;
                height: 45px;
                bottom: 15px;
                right: 15px;
                font-size: 18px;
            }
        }
    `;
    document.head.appendChild(scrollTopStyle);
    document.body.appendChild(scrollTopButton);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopButton.classList.add('show');
        } else {
            scrollTopButton.classList.remove('show');
        }
    });

    scrollTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ============================================
    // 12. LAZY LOAD IMAGES (IF ADDED LATER)
    // ============================================
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // ============================================
    // 13. ACTIVE LINK STYLING
    // ============================================
    const addActiveStyleSheet = document.createElement('style');
    addActiveStyleSheet.textContent = `
        .nav-links a.active {
            color: var(--primary-blue);
            font-weight: 700;
        }

        .nav-links a.active::after {
            width: 100%;
        }
    `;
    document.head.appendChild(addActiveStyleSheet);

    // ============================================
    // 14. KEYBOARD ACCESSIBILITY
    // ============================================
    // Add skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#home';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    
    const skipLinkStyle = document.createElement('style');
    skipLinkStyle.textContent = `
        .skip-link {
            position: absolute;
            top: -40px;
            left: 0;
            background: var(--primary-blue);
            color: white;
            padding: 8px;
            z-index: 100;
            text-decoration: none;
            border-radius: 0 0 4px 0;
        }

        .skip-link:focus {
            top: 0;
        }
    `;
    document.head.appendChild(skipLinkStyle);
    document.body.insertBefore(skipLink, document.body.firstChild);

    // ============================================
    // 15. PRINT FRIENDLY FUNCTIONALITY
    // ============================================
    window.addEventListener('beforeprint', () => {
        document.body.style.background = 'white';
    });

    // ============================================
    // 16. PERFORMANCE MONITORING
    // ============================================
    if (window.performance && window.performance.timing) {
        window.addEventListener('load', () => {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log('Page Load Time: ' + pageLoadTime + 'ms');
        });
    }

    // ============================================
    // 17. DYNAMIC YEAR IN FOOTER (IF NEEDED)
    // ============================================
    const footerBottomText = document.querySelector('.footer-bottom p');
    if (footerBottomText) {
        const currentYear = new Date().getFullYear();
        footerBottomText.textContent = `© ${currentYear} PharmaCare Distribution. All rights reserved. | Licensed for healthcare institutions only.`;
    }

    console.log('PharmaCare Distribution website loaded successfully.');
});
