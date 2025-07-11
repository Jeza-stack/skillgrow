// ===== INTERACTIVE FEATURES & ANIMATIONS =====

// Initialize interactive features
document.addEventListener('DOMContentLoaded', function() {
    initializeInteractiveFeatures();
});

// Initialize all interactive features
function initializeInteractiveFeatures() {
    setupLoadingAnimations();
    setupScrollAnimations();
    setupHoverEffects();
    setupMicroInteractions();
    setupProgressIndicators();
    setupTooltips();
    setupSmoothScrolling();
    setupParallaxEffects();
    setupTypewriterEffect();
    setupCounterAnimations();
}

// Setup loading animations
function setupLoadingAnimations() {
    // Page loading animation
    const pageLoader = createPageLoader();
    document.body.appendChild(pageLoader);
    
    // Hide loader when page is fully loaded
    window.addEventListener('load', function() {
        setTimeout(() => {
            pageLoader.style.opacity = '0';
            setTimeout(() => {
                pageLoader.remove();
            }, 500);
        }, 1000);
    });
    
    // Content loading animations
    setupContentLoadingAnimations();
}

// Create page loader
function createPageLoader() {
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="loader-logo">
                <img src="assets/images/logo.png" alt="SkillGrow" style="width: 60px; height: 60px;">
            </div>
            <div class="loader-spinner">
                <div class="spinner"></div>
            </div>
            <div class="loader-text">Loading...</div>
        </div>
    `;
    
    // Add styles
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #2563EB, #0891B2);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        transition: opacity 0.5s ease;
    `;
    
    // Add spinner styles
    const style = document.createElement('style');
    style.textContent = `
        .loader-content {
            text-align: center;
            color: white;
        }
        .loader-logo {
            margin-bottom: 20px;
            animation: pulse 2s infinite;
        }
        .loader-spinner {
            margin: 20px 0;
        }
        .spinner {
            width: 40px;
            height: 40px;
            border: 3px solid rgba(255,255,255,0.3);
            border-top: 3px solid white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto;
        }
        .loader-text {
            font-size: 16px;
            font-weight: 500;
            margin-top: 10px;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }
    `;
    document.head.appendChild(style);
    
    return loader;
}

// Setup content loading animations
function setupContentLoadingAnimations() {
    const animatedElements = document.querySelectorAll('.post-card, .value-card, .team-member, .feature-item');
    
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
        element.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Trigger animations when elements come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, parseInt(entry.target.style.animationDelay) * 1000);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => observer.observe(element));
}

// Setup scroll animations
function setupScrollAnimations() {
    // Fade in animations
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-active');
            }
        });
    }, { threshold: 0.1 });
    
    fadeElements.forEach(element => fadeObserver.observe(element));
    
    // Slide in animations
    setupSlideAnimations();
    
    // Stagger animations
    setupStaggerAnimations();
}

// Setup slide animations
function setupSlideAnimations() {
    const slideElements = document.querySelectorAll('.slide-in-left, .slide-in-right, .slide-in-up, .slide-in-down');
    
    const slideObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('slide-in-active');
            }
        });
    }, { threshold: 0.1 });
    
    slideElements.forEach(element => slideObserver.observe(element));
}

// Setup stagger animations
function setupStaggerAnimations() {
    const staggerContainers = document.querySelectorAll('.stagger-container');
    
    staggerContainers.forEach(container => {
        const children = container.children;
        
        const staggerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    Array.from(children).forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('stagger-active');
                        }, index * 100);
                    });
                    staggerObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        staggerObserver.observe(container);
    });
}

// Setup hover effects
function setupHoverEffects() {
    // Card hover effects
    const cards = document.querySelectorAll('.post-card, .value-card, .team-member, .category-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
    });
    
    // Button hover effects
    const buttons = document.querySelectorAll('.btn, .cta-btn, .post-read-more');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Image hover effects
    const images = document.querySelectorAll('.post-image, .team-member img');
    
    images.forEach(image => {
        image.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        image.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Setup micro-interactions
function setupMicroInteractions() {
    // Button click effects
    const clickableElements = document.querySelectorAll('button, .btn, a');
    
    clickableElements.forEach(element => {
        element.addEventListener('click', function(e) {
            createRippleEffect(e, this);
        });
    });
    
    // Form field focus effects
    const formFields = document.querySelectorAll('input, textarea, select');
    
    formFields.forEach(field => {
        field.addEventListener('focus', function() {
            this.parentElement.classList.add('field-focused');
        });
        
        field.addEventListener('blur', function() {
            this.parentElement.classList.remove('field-focused');
        });
    });
    
    // Like button animation
    setupLikeButtonAnimation();
    
    // Share button animation
    setupShareButtonAnimation();
}

// Create ripple effect
function createRippleEffect(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
    `;
    
    // Add ripple animation
    if (!document.querySelector('#ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Setup like button animation
function setupLikeButtonAnimation() {
    const likeButtons = document.querySelectorAll('.like-btn, [id*="like"]');
    
    likeButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Heart animation
            const heart = this.querySelector('i');
            if (heart) {
                heart.style.animation = 'heartBeat 0.6s ease';
                setTimeout(() => {
                    heart.style.animation = '';
                }, 600);
            }
            
            // Floating hearts
            createFloatingHearts(this);
        });
    });
}

// Create floating hearts
function createFloatingHearts(element) {
    for (let i = 0; i < 5; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.cssText = `
            position: absolute;
            font-size: 16px;
            pointer-events: none;
            z-index: 1000;
            animation: floatHeart 2s ease-out forwards;
        `;
        
        const rect = element.getBoundingClientRect();
        heart.style.left = rect.left + Math.random() * rect.width + 'px';
        heart.style.top = rect.top + 'px';
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 2000);
    }
    
    // Add floating animation
    if (!document.querySelector('#floating-styles')) {
        const style = document.createElement('style');
        style.id = 'floating-styles';
        style.textContent = `
            @keyframes floatHeart {
                0% {
                    transform: translateY(0) scale(1);
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100px) scale(0.5);
                    opacity: 0;
                }
            }
            @keyframes heartBeat {
                0%, 100% { transform: scale(1); }
                25% { transform: scale(1.2); }
                50% { transform: scale(1.1); }
                75% { transform: scale(1.3); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Setup share button animation
function setupShareButtonAnimation() {
    const shareButtons = document.querySelectorAll('.share-btn, [id*="share"]');
    
    shareButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Pulse animation
            this.style.animation = 'pulse 0.3s ease';
            setTimeout(() => {
                this.style.animation = '';
            }, 300);
        });
    });
}

// Setup progress indicators
function setupProgressIndicators() {
    // Reading progress bar
    createReadingProgressBar();
    
    // Scroll progress indicator
    createScrollProgressIndicator();
}

// Create reading progress bar
function createReadingProgressBar() {
    if (window.location.pathname.includes('post.html')) {
        const progressBar = document.createElement('div');
        progressBar.className = 'reading-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #2563EB, #0891B2);
            z-index: 1000;
            transition: width 0.1s ease;
        `;
        
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', function() {
            const article = document.querySelector('.article-content');
            if (article) {
                const articleTop = article.offsetTop;
                const articleHeight = article.offsetHeight;
                const windowHeight = window.innerHeight;
                const scrollTop = window.pageYOffset;
                
                const progress = Math.min(
                    Math.max((scrollTop - articleTop + windowHeight) / articleHeight, 0),
                    1
                ) * 100;
                
                progressBar.style.width = progress + '%';
            }
        });
    }
}

// Create scroll progress indicator
function createScrollProgressIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'scroll-progress';
    indicator.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: conic-gradient(#2563EB 0deg, #e5e7eb 0deg);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        font-weight: bold;
        color: #2563EB;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(indicator);
    
    window.addEventListener('scroll', function() {
        const scrollPercent = Math.round(
            (window.pageYOffset / (document.body.scrollHeight - window.innerHeight)) * 100
        );
        
        if (scrollPercent > 10) {
            indicator.style.opacity = '1';
            indicator.style.background = `conic-gradient(#2563EB ${scrollPercent * 3.6}deg, #e5e7eb ${scrollPercent * 3.6}deg)`;
            indicator.textContent = scrollPercent + '%';
        } else {
            indicator.style.opacity = '0';
        }
    });
}

// Setup tooltips
function setupTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            showTooltip(this, this.dataset.tooltip);
        });
        
        element.addEventListener('mouseleave', function() {
            hideTooltip();
        });
    });
}

// Show tooltip
function showTooltip(element, text) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = text;
    tooltip.style.cssText = `
        position: absolute;
        background: #1f2937;
        color: white;
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 14px;
        white-space: nowrap;
        z-index: 10000;
        opacity: 0;
        transform: translateY(10px);
        transition: all 0.2s ease;
        pointer-events: none;
    `;
    
    document.body.appendChild(tooltip);
    
    const rect = element.getBoundingClientRect();
    tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
    
    setTimeout(() => {
        tooltip.style.opacity = '1';
        tooltip.style.transform = 'translateY(0)';
    }, 10);
}

// Hide tooltip
function hideTooltip() {
    const tooltip = document.querySelector('.tooltip');
    if (tooltip) {
        tooltip.style.opacity = '0';
        tooltip.style.transform = 'translateY(10px)';
        setTimeout(() => {
            tooltip.remove();
        }, 200);
    }
}

// Setup smooth scrolling
function setupSmoothScrolling() {
    // Smooth scroll for anchor links
    document.addEventListener('click', function(e) {
        const target = e.target.closest('a[href^="#"]');
        if (target) {
            e.preventDefault();
            const targetId = target.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
}

// Setup parallax effects
function setupParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const rate = scrolled * -0.5;
            element.style.transform = `translateY(${rate}px)`;
        });
    });
}

// Setup typewriter effect
function setupTypewriterEffect() {
    const typewriterElements = document.querySelectorAll('.typewriter');
    
    typewriterElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeWriter(entry.target, text, 50);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(element);
    });
}

// Typewriter animation
function typeWriter(element, text, speed) {
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Setup counter animations
function setupCounterAnimations() {
    const counters = document.querySelectorAll('.counter');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => counterObserver.observe(counter));
}

// Animate counter
function animateCounter(element) {
    const target = parseInt(element.dataset.target || element.textContent);
    const duration = parseInt(element.dataset.duration || 2000);
    const steps = 60;
    const increment = target / steps;
    const stepDuration = duration / steps;
    
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        element.textContent = Math.floor(current);
    }, stepDuration);
}

// Add CSS for animations
document.addEventListener('DOMContentLoaded', function() {
    if (!document.querySelector('#interaction-styles')) {
        const style = document.createElement('style');
        style.id = 'interaction-styles';
        style.textContent = `
            .fade-in {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.6s ease;
            }
            .fade-in-active {
                opacity: 1;
                transform: translateY(0);
            }
            .slide-in-left {
                opacity: 0;
                transform: translateX(-50px);
                transition: all 0.6s ease;
            }
            .slide-in-right {
                opacity: 0;
                transform: translateX(50px);
                transition: all 0.6s ease;
            }
            .slide-in-up {
                opacity: 0;
                transform: translateY(50px);
                transition: all 0.6s ease;
            }
            .slide-in-down {
                opacity: 0;
                transform: translateY(-50px);
                transition: all 0.6s ease;
            }
            .slide-in-active {
                opacity: 1;
                transform: translate(0);
            }
            .stagger-container > * {
                opacity: 0;
                transform: translateY(20px);
                transition: all 0.4s ease;
            }
            .stagger-active {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
            .field-focused {
                transform: scale(1.02);
            }
            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.05); }
            }
        `;
        document.head.appendChild(style);
    }
});

