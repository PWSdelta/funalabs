// Funa Labs Consulting Website - Interactive JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for navigation links
    function initSmoothScrolling() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    // Contact form handling
    function initContactForm() {
        const contactForm = document.getElementById('contactForm');
        const formMessage = document.getElementById('formMessage');
        
        if (contactForm) {
            contactForm.addEventListener('submit', async function(e) {
                e.preventDefault();
                // Show loading state
                const submitButton = contactForm.querySelector('button[type="submit"]');
                const originalText = submitButton.textContent;
                submitButton.textContent = 'Sending...';
                submitButton.disabled = true;
                try {
                    // Collect form data
                    const formData = new FormData(contactForm);
                    // Send to backend
                    const response = await fetch('/contact', {
                        method: 'POST',
                        body: formData,
                        headers: {
                            'X-Requested-With': 'XMLHttpRequest'
                        }
                    });
                    let result;
                    try {
                        result = await response.json();
                    } catch (jsonError) {
                        showFormMessage('Server error: Invalid response. Please try again.', 'error');
                        submitButton.textContent = originalText;
                        submitButton.disabled = false;
                        return;
                    }
                    if (result.status === 'success') {
                        showFormMessage(result.message, 'success');
                        contactForm.reset();
                    } else {
                        showFormMessage(result.message || 'Something went wrong. Please try again.', 'error');
                    }
                } catch (error) {
                    console.error('Form submission error:', error);
                    showFormMessage('Network error. Please check your connection and try again.', 'error');
                }
                // Reset button
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            });
        }
        
        function showFormMessage(message, type) {
            if (formMessage) {
                formMessage.textContent = message;
                formMessage.className = `form-message ${type}`;
                formMessage.style.display = 'block';
                if (type === 'success') {
                    formMessage.style.background = '#2ecc40'; // Green background
                    formMessage.style.color = '#fff';
                    formMessage.style.border = 'none';
                    formMessage.style.fontWeight = 'bold';
                } else {
                    formMessage.style.background = '';
                    formMessage.style.color = '';
                    formMessage.style.border = '';
                    formMessage.style.fontWeight = '';
                }
            }
        }
    }
    
    // WhatsApp integration
    function initWhatsAppIntegration() {
        // Update WhatsApp link with actual phone number
        const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
        whatsappLinks.forEach(link => {
            // Replace YOUR_PHONE_NUMBER with actual number when available
            // For now, it's a placeholder that needs to be updated
            if (link.href.includes('YOUR_PHONE_NUMBER')) {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    alert('WhatsApp integration coming soon! Please use the contact form for now.');
                });
            }
        });
    }
    
    // Navigation scroll effects
    function initNavigationEffects() {
        const navbar = document.querySelector('.navbar');
        
        if (navbar) {
            let lastScrollY = window.scrollY;
            
            window.addEventListener('scroll', function() {
                const currentScrollY = window.scrollY;
                
                // Add/remove background based on scroll position
                if (currentScrollY > 100) {
                    navbar.style.background = getComputedStyle(navbar).background.replace('0.95', '0.98');
                    navbar.style.backdropFilter = 'blur(20px)';
                    navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
                } else {
                    navbar.style.background = getComputedStyle(navbar).background.replace('0.98', '0.95');
                    navbar.style.backdropFilter = 'blur(10px)';
                    navbar.style.boxShadow = 'none';
                }
                
                lastScrollY = currentScrollY;
            });
        }
    }
    
    // Intersection Observer for animations
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Observe elements that should animate in
        const animatedElements = document.querySelectorAll('.service-card, .project-card, .stat-card, .highlight');
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
    
    // Theme persistence (remember user's theme choice)
    function initThemePersistence() {
        const themeButtons = document.querySelectorAll('.theme-btn');
        const currentTheme = localStorage.getItem('funalabs-theme') || 'zen';
        
        // Apply saved theme if different from current
        const body = document.body;
        const urlParams = new URLSearchParams(window.location.search);
        const urlTheme = urlParams.get('theme');
        
        if (!urlTheme && body.className.indexOf(`theme-${currentTheme}`) === -1) {
            // Redirect to saved theme
            window.location.href = `/?theme=${currentTheme}`;
            return;
        }
        
        // Save theme when user clicks theme button
        themeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const themeName = this.href.split('theme=')[1] || this.href.split('/').pop();
                if (themeName) {
                    localStorage.setItem('funalabs-theme', themeName);
                }
            });
        });
    }
    
    // Form validation enhancements
    function initFormValidation() {
        const form = document.getElementById('contactForm');
        if (!form) return;
        
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        
        inputs.forEach(input => {
            // Real-time validation feedback
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateField(this);
                }
            });
        });
        
        function validateField(field) {
            const value = field.value.trim();
            const isValid = field.checkValidity() && value.length > 0;
            
            field.classList.remove('error', 'success');
            
            if (value.length > 0) {
                field.classList.add(isValid ? 'success' : 'error');
            }
            
            return isValid;
        }
        
        // Enhanced form submission validation
        form.addEventListener('submit', function(e) {
            let isFormValid = true;
            
            inputs.forEach(input => {
                if (!validateField(input)) {
                    isFormValid = false;
                }
            });
            
            if (!isFormValid) {
                e.preventDefault();
                showFormMessage('Please fill in all required fields correctly.', 'error');
            }
        });
    }
    
    // Performance optimization: Lazy load non-critical animations
    function initLazyAnimations() {
        // Only run expensive animations if user hasn't indicated preference for reduced motion
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            // Add floating animations to visual elements
            const zenCircle = document.querySelector('.zen-circle');
            const minimalGrid = document.querySelector('.minimal-grid');
            const warmWaves = document.querySelector('.warm-waves');
            
            [zenCircle, minimalGrid, warmWaves].forEach(element => {
                if (element) {
                    element.style.animation = element.style.animation || 'none';
                }
            });
        }
    }
    
    // Analytics helpers (for future implementation)
    function trackInteraction(action, details = {}) {
        // Placeholder for future analytics integration
        console.log('Analytics:', action, details);
        
        // Could integrate with Google Analytics, Mixpanel, etc.
        // gtag('event', action, details);
    }
    
    // Track important user interactions
    function initAnalyticsTracking() {
        // Track theme switches
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const theme = btn.textContent.trim();
                trackInteraction('theme_switch', { theme });
            });
        });
        
        // Track form submissions
        const form = document.getElementById('contactForm');
        if (form) {
            form.addEventListener('submit', () => {
                trackInteraction('contact_form_submit');
            });
        }
        
        // Track WhatsApp clicks
        document.querySelectorAll('.whatsapp-button, .whatsapp-nav').forEach(btn => {
            btn.addEventListener('click', () => {
                trackInteraction('whatsapp_click');
            });
        });
        
        // Track service card interactions
        document.querySelectorAll('.service-card').forEach((card, index) => {
            card.addEventListener('mouseenter', () => {
                const serviceName = card.querySelector('h3').textContent;
                trackInteraction('service_hover', { service: serviceName, index });
            });
        });
    }
    
    // Initialize all functionality
    function init() {
        initSmoothScrolling();
        initContactForm();
        initWhatsAppIntegration();
        initNavigationEffects();
        initScrollAnimations();
        initThemePersistence();
        initFormValidation();
        initLazyAnimations();
        initAnalyticsTracking();
        
        // Log successful initialization
        console.log('🚀 Funa Labs website initialized successfully!');
    }
    
    // Start the app
    init();
    
    // Expose some functions globally for debugging/external use
    window.FunaLabs = {
        trackInteraction,
        switchTheme: (themeName) => {
            window.location.href = `/theme/${themeName}`;
        }
    };
});

// Additional utility functions
(function() {
    'use strict';
    
    // Polyfill for older browsers
    if (!Element.prototype.scrollIntoView) {
        Element.prototype.scrollIntoView = function(options) {
            if (options === true || options === undefined) {
                options = { block: 'start', behavior: 'auto' };
            }
            if (options === false) {
                options = { block: 'end', behavior: 'auto' };
            }
            
            const rect = this.getBoundingClientRect();
            window.scrollTo({
                top: rect.top + window.pageYOffset - 80, // Account for navbar
                behavior: options.behavior || 'auto'
            });
        };
    }
    
    // Debounce function for performance
    window.debounce = function(func, wait, immediate) {
        let timeout;
        return function executedFunction() {
            const context = this;
            const args = arguments;
            
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            
            if (callNow) func.apply(context, args);
        };
    };
    
    // Simple feature detection
    window.FunaLabsSupport = {
        intersectionObserver: 'IntersectionObserver' in window,
        fetch: 'fetch' in window,
        customProperties: CSS.supports('color', 'var(--test)'),
        grid: CSS.supports('display', 'grid')
    };
    
})();
