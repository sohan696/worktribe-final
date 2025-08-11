// WeWork Website Enhanced Interactive Features
class WeWorkWebsite {
    constructor() {
        this.currentPage = 'homepage';
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupScrollEffects();
        this.setupFormHandling();
        this.setupServiceCards();
        this.setupScrollAnimations();
        this.setupParallaxEffects();
        this.setupCTAButtons();
        this.setupDropdownMenu();
        this.setupPageNavigation();
        this.setupFAQ();
        this.setupCoworkingInteractions();
        this.setupSlideshow();
    }

    // Enhanced Navigation Setup with Dropdown
    setupNavigation() {
        const navbar = document.getElementById('navbar');
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        // Only intercept in-page anchor links (href starting with #). Let real pages navigate normally
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]:not(.dropdown-toggle)');
        const dropdownItems = document.querySelectorAll('.dropdown-item');

        // Hamburger menu toggle
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
                document.body.classList.toggle('nav-open');
            });
        }

        // Close menu when clicking nav links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Only handle hash links here
                const href = link.getAttribute('href') || '';
                if (!href.startsWith('#')) return;

                e.preventDefault();

                // Close mobile menu
                this.closeMobileMenu();

                // Smooth scroll to section
                const targetId = href.replace('#', '');
                this.scrollToSection(targetId);
            });
        });

        // Handle dropdown items
        dropdownItems.forEach(item => {
            item.addEventListener('click', (e) => {
                const href = item.getAttribute('href') || '';
                const isAnchor = href.startsWith('#');

                if (!isAnchor) {
                    // Let browser navigate to real page (e.g., officespace.html)
                    return;
                }

                e.preventDefault();
                e.stopPropagation();

                // Close mobile menu
                this.closeMobileMenu();

                if (href === '#coworking') {
                    this.navigateToCoworking();
                } else {
                    // For other dropdown items, scroll to section on homepage
                    this.navigateHome();
                    setTimeout(() => {
                        this.scrollToSection(href.replace('#', ''));
                    }, 300);
                }
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (hamburger && navMenu && navMenu.classList.contains('active')) {
                if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
                    this.closeMobileMenu();
                }
            }
        });

        // Navbar scroll effect
        let lastScroll = 0;
        if (navbar) {
            window.addEventListener('scroll', () => {
                const currentScroll = window.pageYOffset;
                
                if (currentScroll > 100) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }

                // Hide navbar on scroll down, show on scroll up
                if (currentScroll > lastScroll && currentScroll > 200) {
                    navbar.style.transform = 'translateY(-100%)';
                } else {
                    navbar.style.transform = 'translateY(0)';
                }
                
                lastScroll = currentScroll;
            });
        }
    }

    closeMobileMenu() {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('nav-open');
        }
    }

    // Dropdown Menu Setup
    setupDropdownMenu() {
        const dropdown = document.getElementById('workspace-dropdown');
        const dropdownToggle = dropdown?.querySelector('.dropdown-toggle');
        
        if (!dropdown || !dropdownToggle) return;

        // Mobile dropdown toggle
        dropdownToggle.addEventListener('click', (e) => {
            if (window.innerWidth <= 1024) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            }
        });

        // Close dropdown when clicking outside (mobile)
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 1024 && dropdown.classList.contains('active')) {
                if (!dropdown.contains(e.target)) {
                    dropdown.classList.remove('active');
                }
            }
        });
    }

    // Page Navigation Setup
    setupPageNavigation() {
        // Set up initial page state
        this.showPage('homepage');
    }

    navigateHome() {
        this.showPage('homepage');
        this.currentPage = 'homepage';
        
        // Update URL without page reload
        history.pushState({page: 'homepage'}, 'WeWork - Home', window.location.pathname);
        
        // Scroll to top
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    navigateToCoworking() {
        this.showPage('coworking-page');
        this.currentPage = 'coworking-page';
        
        // Update URL without page reload
        history.pushState({page: 'coworking'}, 'WeWork - Coworking Spaces', window.location.pathname + '#coworking');
        
        // Scroll to top
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    showPage(pageId) {
        // Hide all pages
        const pages = document.querySelectorAll('.page-content');
        pages.forEach(page => {
            page.classList.remove('active');
        });
        
        // Show target page
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            // Small delay to ensure smooth transition
            setTimeout(() => {
                targetPage.classList.add('active');
                this.reinitializeAnimations();
            }, 100);
        }
    }

    reinitializeAnimations() {
        // Reinitialize scroll animations for new page content
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe elements in the current page
        const currentPageElements = document.querySelectorAll('.page-content.active .benefit-card, .page-content.active .plan-card, .page-content.active .testimonial-card, .page-content.active .location-card');
        currentPageElements.forEach(el => {
            observer.observe(el);
        });
    }

    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const offsetTop = section.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }

    // FAQ Setup
    setupFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            
            if (question && answer) {
                question.addEventListener('click', () => {
                    const isActive = item.classList.contains('active');
                    
                    // Close all other FAQ items
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove('active');
                        }
                    });
                    
                    // Toggle current item
                    if (isActive) {
                        item.classList.remove('active');
                    } else {
                        item.classList.add('active');
                    }
                });
            }
        });
    }

    // Coworking Page Specific Interactions
    setupCoworkingInteractions() {
        // Plan selection interactions
        const planCards = document.querySelectorAll('.plan-card');
        planCards.forEach(card => {
            const button = card.querySelector('.btn');
            if (button) {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    // Scroll to contact form
                    setTimeout(() => {
                        this.scrollToSection('coworking-contact');
                    }, 100);
                    
                    // Pre-fill the plan selection if form exists
                    setTimeout(() => {
                        const planSelect = document.getElementById('co-plan');
                        const planName = card.querySelector('.plan-name')?.textContent;
                        
                        if (planSelect && planName) {
                            if (planName.includes('Hot Desk')) planSelect.value = 'hot-desk';
                            else if (planName.includes('Dedicated')) planSelect.value = 'dedicated-desk';
                            else if (planName.includes('Private')) planSelect.value = 'private-office';
                        }
                    }, 200);
                });
            }
        });

        // Location card interactions
        const locationCards = document.querySelectorAll('.location-card');
        locationCards.forEach(card => {
            const button = card.querySelector('.btn');
            if (button) {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    // For demo purposes, show notification
                    const locationName = card.querySelector('.location-name')?.textContent;
                    this.showNotification(`Learn more about ${locationName} location - Contact us for details!`, 'info');
                });
            }
        });

        // Benefit cards hover animations
        const benefitCards = document.querySelectorAll('.benefit-card');
        benefitCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
        });
    }

    // Slideshow Setup
    setupSlideshow() {
        const slideshowSections = document.querySelectorAll('.slideshow-section');
        
        slideshowSections.forEach(section => {
            const slides = section.querySelectorAll('.slide');
            const dots = section.querySelectorAll('.dot');
            let currentSlide = 0;
            let slideInterval;

            // Function to show a specific slide
            const showSlide = (index) => {
                // Hide all slides
                slides.forEach(slide => slide.classList.remove('active'));
                // Remove active class from all dots
                dots.forEach(dot => dot.classList.remove('active'));
                
                // Show current slide
                slides[index].classList.add('active');
                // Activate current dot
                dots[index].classList.add('active');
                
                currentSlide = index;
            };

            // Function to go to next slide
            const nextSlide = () => {
                const nextIndex = (currentSlide + 1) % slides.length;
                showSlide(nextIndex);
            };

            // Function to go to previous slide
            const prevSlide = () => {
                const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
                showSlide(prevIndex);
            };

            // Add click event to dots
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    showSlide(index);
                    resetInterval();
                });
            });

            // Add keyboard navigation
            section.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') {
                    prevSlide();
                    resetInterval();
                } else if (e.key === 'ArrowRight') {
                    nextSlide();
                    resetInterval();
                }
            });

            // Add touch/swipe support for mobile
            let touchStartX = 0;
            let touchEndX = 0;

            section.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            });

            section.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            });

            const handleSwipe = () => {
                const swipeThreshold = 50;
                const diff = touchStartX - touchEndX;
                
                if (Math.abs(diff) > swipeThreshold) {
                    if (diff > 0) {
                        // Swipe left - next slide
                        nextSlide();
                    } else {
                        // Swipe right - previous slide
                        prevSlide();
                    }
                    resetInterval();
                }
            };

            // Function to reset the autoplay interval
            const resetInterval = () => {
                if (slideInterval) {
                    clearInterval(slideInterval);
                }
                startAutoplay();
            };

            // Function to start autoplay
            const startAutoplay = () => {
                slideInterval = setInterval(() => {
                    nextSlide();
                }, 4000); // Change slide every 4 seconds
            };

            // Start autoplay
            startAutoplay();

            // Pause autoplay on hover
            section.addEventListener('mouseenter', () => {
                if (slideInterval) {
                    clearInterval(slideInterval);
                }
            });

            // Resume autoplay when mouse leaves
            section.addEventListener('mouseleave', () => {
                startAutoplay();
            });

            // Initialize first slide
            showSlide(0);
        });
    }

    // CTA Button Setup
    setupCTAButtons() {
        // Hero section buttons - Find Your Space
        const findSpaceBtns = document.querySelectorAll('.btn-primary-large');
        findSpaceBtns.forEach(btn => {
            if (btn.textContent.includes('Find Your Space') || btn.textContent.includes('Find a Location')) {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (this.currentPage === 'homepage') {
                        this.scrollToSection('workspace');
                    } else {
                        this.scrollToSection('coworking-locations');
                    }
                });
            }
        });

        // Hero section buttons - Learn More
        const learnMoreBtns = document.querySelectorAll('.btn-secondary-large');
        learnMoreBtns.forEach(btn => {
            if (btn.textContent.includes('Learn More') || btn.textContent.includes('View Plans')) {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (this.currentPage === 'homepage') {
                        this.scrollToSection('about');
                    } else {
                        this.scrollToSection('membership-plans');
                    }
                });
            }
        });

        // Navigation Get Started button
        const getStartedBtn = document.querySelector('.nav-cta .btn-primary');
        if (getStartedBtn) {
            getStartedBtn.addEventListener('click', (e) => {
                e.preventDefault();
                if (this.currentPage === 'homepage') {
                    this.scrollToSection('contact');
                } else {
                    this.scrollToSection('coworking-contact');
                }
            });
        }

        // Service card Learn More links
        const serviceLinks = document.querySelectorAll('.service-link');
        serviceLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const href = link.getAttribute('href');
                if (href === '#coworking') {
                    this.navigateToCoworking();
                } else {
                    this.scrollToSection('contact');
                }
            });
        });

        // Schedule tour buttons
        document.addEventListener('click', (e) => {
            if (e.target.matches('button') && e.target.textContent.includes('Schedule')) {
                e.preventDefault();
                this.showNotification('Tour scheduling feature coming soon! Please contact us directly.', 'info');
            }
        });

        // Explore More Options buttons
        document.addEventListener('click', (e) => {
            if (e.target.matches('button') && e.target.textContent.includes('Explore More Options')) {
                e.preventDefault();
                this.navigateHome();
            }
        });

        // Footer coworking link (only intercept hash links)
        const footerCoworkingLinks = document.querySelectorAll('.footer-link');
        footerCoworkingLinks.forEach(link => {
            if (link.textContent.includes('Coworking')) {
                link.addEventListener('click', (e) => {
                    const href = link.getAttribute('href') || '';
                    if (href.startsWith('#')) {
                        e.preventDefault();
                        this.navigateToCoworking();
                    }
                });
            }
        });
    }

    // Scroll Effects and Animations
    setupScrollEffects() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animateElements = document.querySelectorAll('.service-card, .about-content, .contact-content, .stat, .benefit-card, .plan-card, .testimonial-card, .location-card');
        animateElements.forEach(el => {
            observer.observe(el);
        });
    }

    // Enhanced Form Handling
    setupFormHandling() {
        // Homepage contact form
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmission(contactForm);
            });
            this.setupFormValidation(contactForm);
        }

        // Coworking contact form
        const coworkingForm = document.getElementById('coworking-contact-form');
        if (coworkingForm) {
            coworkingForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleCoworkingFormSubmission(coworkingForm);
            });
            this.setupFormValidation(coworkingForm);
        }
    }

    setupFormValidation(form) {
        const inputs = form.querySelectorAll('.form-control');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
            
            input.addEventListener('input', () => {
                this.clearFieldError(input);
            });
        });
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldType = field.getAttribute('type');
        const fieldName = field.getAttribute('name');
        let isValid = true;
        let errorMessage = '';

        // Remove existing error styling
        this.clearFieldError(field);

        // Check if required field is empty
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        } 
        // Validate email specifically - more lenient regex
        else if (fieldType === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }
        // Validate name field
        else if (fieldName === 'name' && value && value.length < 2) {
            isValid = false;
            errorMessage = 'Name must be at least 2 characters long';
        }

        if (!isValid) {
            this.showFieldError(field, errorMessage);
        }

        return isValid;
    }

    showFieldError(field, message) {
        field.classList.add('error');
        field.style.borderColor = '#FF7348';
        
        // Create or update error message
        let errorElement = field.parentNode.querySelector('.field-error');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.classList.add('field-error');
            errorElement.style.cssText = `
                color: #FF7348;
                font-size: 14px;
                margin-top: 4px;
                opacity: 0;
                transform: translateY(-10px);
                transition: all 0.3s ease;
                font-weight: 500;
            `;
            field.parentNode.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        setTimeout(() => {
            errorElement.style.opacity = '1';
            errorElement.style.transform = 'translateY(0)';
        }, 10);
    }

    clearFieldError(field) {
        field.classList.remove('error');
        field.style.borderColor = '';
        
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.style.opacity = '0';
            errorElement.style.transform = 'translateY(-10px)';
            setTimeout(() => {
                if (errorElement.parentNode) {
                    errorElement.parentNode.removeChild(errorElement);
                }
            }, 300);
        }
    }

    async handleFormSubmission(form) {
        const submitButton = form.querySelector('button[type="submit"]');
        
        // Get form data properly
        const formData = {
            name: form.querySelector('[name="name"]').value.trim(),
            email: form.querySelector('[name="email"]').value.trim(),
            company: form.querySelector('[name="company"]')?.value.trim() || '',
            message: form.querySelector('[name="message"]').value.trim()
        };
        
        // Validate all required fields
        const requiredFields = form.querySelectorAll('.form-control[required]');
        let isFormValid = true;
        
        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isFormValid = false;
            }
        });

        // Also validate email field specifically if it has a value
        const emailField = form.querySelector('[name="email"]');
        if (emailField && emailField.value.trim()) {
            if (!this.validateField(emailField)) {
                isFormValid = false;
            }
        }

        if (!isFormValid) {
            this.showNotification('Please correct the errors above', 'error');
            return;
        }

        // Show loading state
        const originalText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        submitButton.style.opacity = '0.7';

        // Simulate form submission
        try {
            console.log('Form Data:', formData);
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Success
            this.showNotification(`Thank you ${formData.name}! We'll be in touch soon.`, 'success');
            form.reset();
        } catch (error) {
            console.error('Form submission error:', error);
            this.showNotification('Something went wrong. Please try again.', 'error');
        } finally {
            // Reset button
            submitButton.disabled = false;
            submitButton.textContent = originalText;
            submitButton.style.opacity = '1';
        }
    }

    async handleCoworkingFormSubmission(form) {
        const submitButton = form.querySelector('button[type="submit"]');
        
        // Get form data
        const formData = {
            name: form.querySelector('[name="name"]').value.trim(),
            email: form.querySelector('[name="email"]').value.trim(),
            plan: form.querySelector('[name="plan"]').value,
            message: form.querySelector('[name="message"]').value.trim()
        };
        
        // Validate required fields
        const requiredFields = form.querySelectorAll('.form-control[required]');
        let isFormValid = true;
        
        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isFormValid = false;
            }
        });

        if (!isFormValid) {
            this.showNotification('Please correct the errors above', 'error');
            return;
        }

        // Show loading state
        const originalText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Processing...';
        submitButton.style.opacity = '0.7';

        // Simulate form submission
        try {
            console.log('Coworking Form Data:', formData);
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Success
            const planName = form.querySelector('[name="plan"] option:checked').textContent;
            this.showNotification(`Thank you ${formData.name}! We'll contact you about our ${planName} plan.`, 'success');
            form.reset();
        } catch (error) {
            console.error('Form submission error:', error);
            this.showNotification('Something went wrong. Please try again.', 'error');
        } finally {
            // Reset button
            submitButton.disabled = false;
            submitButton.textContent = originalText;
            submitButton.style.opacity = '1';
        }
    }

    showNotification(message, type) {
        // Remove existing notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification
        const notification = document.createElement('div');
        notification.classList.add('notification', `notification--${type}`);
        
        let backgroundColor;
        switch(type) {
            case 'success':
                backgroundColor = '#C6B628';
                break;
            case 'error':
                backgroundColor = '#FF7348';
                break;
            case 'info':
                backgroundColor = '#678FFF';
                break;
            default:
                backgroundColor = '#333333';
        }
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 24px;
            background: ${backgroundColor};
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.16);
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            max-width: 300px;
            font-weight: 500;
            line-height: 1.4;
        `;
        
        notification.textContent = message;
        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);

        // Auto remove
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }

    // Service Cards Interactions
    setupServiceCards() {
        const serviceCards = document.querySelectorAll('.service-card');
        
        serviceCards.forEach((card, index) => {
            // Staggered animation delay
            card.style.animationDelay = `${index * 0.1}s`;
            
            // Enhanced hover effects
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-12px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });

            // Click handling - updated for coworking navigation
            card.addEventListener('click', (e) => {
                if (!e.target.matches('a') && !e.target.closest('a')) {
                    const serviceType = card.getAttribute('data-service');
                    if (serviceType === 'coworking') {
                        this.navigateToCoworking();
                    } else {
                        // For other services, scroll to contact
                        this.scrollToSection('contact');
                    }
                }
            });
        });
    }

    // Scroll Animations
    setupScrollAnimations() {
        // Add CSS for animations
        const style = document.createElement('style');
        style.textContent = `
            .animate-in {
                animation: slideInUp 0.8s ease forwards;
            }
            
            @keyframes slideInUp {
                from {
                    opacity: 0;
                    transform: translateY(40px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .service-card, .benefit-card, .plan-card, .location-card, .testimonial-card {
                opacity: 0;
                transform: translateY(40px);
                transition: all 0.6s ease;
            }
            
            .service-card.animate-in, .benefit-card.animate-in, .plan-card.animate-in, .location-card.animate-in, .testimonial-card.animate-in {
                opacity: 1;
                transform: translateY(0);
            }
            
            .stat {
                opacity: 0;
                transform: scale(0.8);
                transition: all 0.6s ease;
            }
            
            .stat.animate-in {
                opacity: 1;
                transform: scale(1);
            }

            /* Ripple effect */
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            
            .btn {
                overflow: hidden;
                position: relative;
            }
        `;
        document.head.appendChild(style);
    }

    // Parallax Effects
    setupParallaxEffects() {
        const heroImages = document.querySelectorAll('.hero-image');
        
        heroImages.forEach(heroImage => {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const parallaxSpeed = 0.5;
                heroImage.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            });
        });
    }
}

// Global Navigation Functions (accessible from HTML onclick handlers)
function navigateHome() {
    if (window.weWorkApp) {
        window.weWorkApp.navigateHome();
    }
}

function navigateToCoworking(event) {
    if (event) {
        event.preventDefault();
    }
    if (window.weWorkApp) {
        window.weWorkApp.navigateToCoworking();
    }
}

function scrollToSection(sectionId) {
    if (window.weWorkApp) {
        window.weWorkApp.scrollToSection(sectionId);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize main website functionality
    window.weWorkApp = new WeWorkWebsite();

    // Enhanced button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function(e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple 0.6s linear;
                left: ${x - 10}px;
                top: ${y - 10}px;
                width: 20px;
                height: 20px;
                pointer-events: none;
            `;
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
        });
    });

    // Handle browser back/forward navigation
    window.addEventListener('popstate', (e) => {
        if (e.state && e.state.page) {
            if (e.state.page === 'coworking') {
                window.weWorkApp.showPage('coworking-page');
                window.weWorkApp.currentPage = 'coworking-page';
            } else {
                window.weWorkApp.showPage('homepage');
                window.weWorkApp.currentPage = 'homepage';
            }
        }
    });

    // Smooth page load animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);

    // Add loading states for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        
        // Set opacity to 1 if image is already loaded
        if (img.complete) {
            img.style.opacity = '1';
        }
    });

    // Keyboard navigation enhancements
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const hamburger = document.getElementById('hamburger');
            const navMenu = document.getElementById('nav-menu');
            const dropdown = document.getElementById('workspace-dropdown');
            
            if (hamburger && navMenu && navMenu.classList.contains('active')) {
                window.weWorkApp.closeMobileMenu();
            }
            
            if (dropdown && dropdown.classList.contains('active')) {
                dropdown.classList.remove('active');
            }

            // Close any open FAQ items
            const activeFaqItems = document.querySelectorAll('.faq-item.active');
            activeFaqItems.forEach(item => item.classList.remove('active'));
        }
    });

    // Handle window resize for dropdown behavior
    window.addEventListener('resize', () => {
        const dropdown = document.getElementById('workspace-dropdown');
        if (window.innerWidth > 1024 && dropdown) {
            dropdown.classList.remove('active');
        }
    });

    console.log('WeWork Website initialized successfully!');
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
});

// Utility Functions
class Utils {
    static throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    static debounce(func, delay) {
        let debounceTimer;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => func.apply(context, args), delay);
        }
    }

    static fadeIn(element, duration = 300) {
        element.style.opacity = 0;
        element.style.display = 'block';
        
        const start = performance.now();
        
        const fade = (timestamp) => {
            const elapsed = timestamp - start;
            const progress = elapsed / duration;
            
            if (progress < 1) {
                element.style.opacity = progress;
                requestAnimationFrame(fade);
            } else {
                element.style.opacity = 1;
            }
        };
        
        requestAnimationFrame(fade);
    }

    static fadeOut(element, duration = 300) {
        const start = performance.now();
        const startOpacity = parseFloat(window.getComputedStyle(element).opacity);
        
        const fade = (timestamp) => {
            const elapsed = timestamp - start;
            const progress = elapsed / duration;
            
            if (progress < 1) {
                element.style.opacity = startOpacity * (1 - progress);
                requestAnimationFrame(fade);
            } else {
                element.style.opacity = 0;
                element.style.display = 'none';
            }
        };
        
        requestAnimationFrame(fade);
    }
}