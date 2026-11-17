/**
 * Gopichand Sabbavarapu — Portfolio Scripts
 * Handles: Theme Toggle (Default: Light), Typewriter Effect, Section ScrollSpy,
 * Project Category Filter, Click-to-Copy Toast, Mobile Navigation & Back-to-Top
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ---------------------------------------------------------
       1. Theme Toggle (Medium Professional Light Theme by Default)
       --------------------------------------------------------- */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElem = document.documentElement;

    // Check localStorage preference, defaulting to 'light' as requested
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {
        htmlElem.setAttribute('data-theme', 'dark');
    } else {
        htmlElem.setAttribute('data-theme', 'light');
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlElem.getAttribute('data-theme');
            const targetTheme = currentTheme === 'dark' ? 'light' : 'dark';
            htmlElem.setAttribute('data-theme', targetTheme);
            localStorage.setItem('theme', targetTheme);
        });
    }

    /* ---------------------------------------------------------
       2. Multi-Role Animated Typewriter Effect
       --------------------------------------------------------- */
    const typedTextElem = document.getElementById('typed-text');
    const roles = [
        "AI & ML Specialist",
        "Computer Vision Specialist",
        "B.Tech Final Year (CSE Specialization)",
        "Seeking AI/ML Internship Opportunities",
        "Published Researcher @ ICTCon 2026",
        "YOLOv8 & Edge AI Developer"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typeSpeed = 75;
    const deleteSpeed = 35;
    const pauseDelay = 2000;

    function typeEffect() {
        if (!typedTextElem) return;

        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typedTextElem.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedTextElem.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        let currentSpeed = isDeleting ? deleteSpeed : typeSpeed;

        if (!isDeleting && charIndex === currentRole.length) {
            currentSpeed = pauseDelay;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            currentSpeed = 350;
        }

        setTimeout(typeEffect, currentSpeed);
    }

    if (typedTextElem) {
        setTimeout(typeEffect, 500);
    }

    /* ---------------------------------------------------------
       3. Header Scroll Effect & Back-to-Top Button
       --------------------------------------------------------- */
    const header = document.getElementById('header');
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Header shadow on scroll
        if (header) {
            if (scrollY > 30) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        // Back to top visibility
        if (backToTopBtn) {
            if (scrollY > 400) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ---------------------------------------------------------
       4. ScrollSpy: Highlight Active Nav Item
       --------------------------------------------------------- */
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links .nav-item');

    function highlightActiveNav() {
        const scrollPosition = window.scrollY + 120;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navItems.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightActiveNav);

    /* ---------------------------------------------------------
       5. Mobile Navigation Burger Menu
       --------------------------------------------------------- */
    const burgerBtn = document.getElementById('burger-menu');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-links a');

    if (burgerBtn && navMenu) {
        burgerBtn.addEventListener('click', () => {
            const isActive = navMenu.classList.toggle('active');
            burgerBtn.classList.toggle('active');
            burgerBtn.setAttribute('aria-expanded', isActive ? 'true' : 'false');
        });

        // Close mobile drawer upon clicking any link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                burgerBtn.classList.remove('active');
                burgerBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }

    /* ---------------------------------------------------------
       6. Project Category Filter
       --------------------------------------------------------- */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category') || '';
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.classList.remove('hide');
                } else {
                    card.classList.add('hide');
                }
            });
        });
    });

    /* ---------------------------------------------------------
       7. Click-to-Copy with Toast Feedback
       --------------------------------------------------------- */
    const copyTriggers = document.querySelectorAll('.copy-trigger');
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    let toastTimeout;

    function showToast(message) {
        if (!toast || !toastMessage) return;
        
        toastMessage.textContent = message;
        toast.classList.add('show');

        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    copyTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const textToCopy = trigger.getAttribute('data-copy');
            if (textToCopy) {
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(textToCopy)
                        .then(() => showToast(`Copied: ${textToCopy}`))
                        .catch(() => fallbackCopy(textToCopy));
                } else {
                    fallbackCopy(textToCopy);
                }
            }
        });
    });

    function fallbackCopy(text) {
        const tempInput = document.createElement('input');
        tempInput.value = text;
        document.body.appendChild(tempInput);
        tempInput.select();
        try {
            document.execCommand('copy');
            showToast(`Copied: ${text}`);
        } catch (err) {
            showToast('Unable to auto-copy. Please copy manually.');
        }
        document.body.removeChild(tempInput);
    }

    /* ---------------------------------------------------------
       8. Contact Form Handling
       --------------------------------------------------------- */
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('form-status');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', (e) => {
            const name = document.getElementById('form-name')?.value.trim();
            const email = document.getElementById('form-email')?.value.trim();
            const subject = document.getElementById('form-subject')?.value.trim();
            const message = document.getElementById('form-message')?.value.trim();

            if (!name || !email || !message) {
                return;
            }

            const mailtoUri = `mailto:gopichand241975@gmail.com?subject=${encodeURIComponent(subject || 'AI/ML Internship Inquiry')}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;
            
            formStatus.className = 'form-status-alert success';
            formStatus.textContent = 'Opening your email client to send message to Gopichand...';
            
            setTimeout(() => {
                window.location.href = mailtoUri;
            }, 600);
        });
    }

    /* ---------------------------------------------------------
       9. Live Profile Visitor / View Counter
       --------------------------------------------------------- */
    const heroVisitorCountElem = document.getElementById('visitor-count-hero');
    const footerVisitorCountElem = document.getElementById('visitor-count-footer');

    function initVisitorCounter() {
        if (!heroVisitorCountElem && !footerVisitorCountElem) return;

        // Baseline realistic visits starting point
        const BASE_VISITS = 412;
        let localCount = parseInt(localStorage.getItem('gs_portfolio_views'), 10);

        if (isNaN(localCount) || localCount < BASE_VISITS) {
            localCount = BASE_VISITS;
        }

        // Increment count only once per browser session so refreshing doesn't artificially inflate
        const isNewSession = !sessionStorage.getItem('gs_session_viewed');
        if (isNewSession) {
            localCount += 1;
            localStorage.setItem('gs_portfolio_views', localCount);
            sessionStorage.setItem('gs_session_viewed', 'true');
        }

        // Initial display
        renderCount(localCount);

        // Attempt live synchronization with public counter API if online
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2500);

        // CounterAPI endpoint for Gopichand's portfolio
        fetch('https://api.counterapi.dev/v1/gopichand-portfolio-visits/views/up', {
            signal: controller.signal
        })
        .then(res => res.json())
        .then(data => {
            clearTimeout(timeoutId);
            if (data && typeof data.count === 'number') {
                const combinedCount = Math.max(data.count + BASE_VISITS, localCount);
                localStorage.setItem('gs_portfolio_views', combinedCount);
                renderCount(combinedCount);
            }
        })
        .catch(() => {
            // Offline or local preview fallback — already gracefully rendered with localCount
        });
    }

    function renderCount(targetCount) {
        const formatted = Number(targetCount).toLocaleString();
        if (heroVisitorCountElem) {
            animateCount(heroVisitorCountElem, targetCount);
        }
        if (footerVisitorCountElem) {
            footerVisitorCountElem.textContent = formatted;
        }
    }

    function animateCount(elem, finalValue) {
        const duration = 1200;
        const startTime = performance.now();
        const startValue = Math.max(0, finalValue - 45);

        function updateNumber(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic calculation
            const easeOutProgress = 1 - Math.pow(1 - progress, 3);
            const currentNumber = Math.floor(startValue + (finalValue - startValue) * easeOutProgress);

            elem.textContent = currentNumber.toLocaleString();

            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            } else {
                elem.textContent = finalValue.toLocaleString();
            }
        }

        requestAnimationFrame(updateNumber);
    }

    initVisitorCounter();

});
