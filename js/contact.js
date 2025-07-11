// ===== CONTACT PAGE JAVASCRIPT =====

// Initialize contact page
document.addEventListener('DOMContentLoaded', function() {
    initializeContactPage();
});

// Initialize contact page components
function initializeContactPage() {
    setupContactForm();
    setupNewsletterForm();
    setupFAQ();
    updateMetaTags();
}

// Setup contact form
function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmit);
        
        // Setup real-time validation
        const formInputs = contactForm.querySelectorAll('input, select, textarea');
        formInputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearFieldError);
        });
    }
}

// Handle contact form submission
function handleContactFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    
    // Validate all fields
    if (!validateForm(form)) {
        showNotification('Please correct the errors in the form.', 'error');
        return;
    }
    
    // Show loading state
    showFormLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
        // Hide loading state
        showFormLoading(false);
        
        // Show success message
        showSuccessMessage();
        
        // Reset form
        form.reset();
        clearAllFieldStates(form);
        
        // Show notification
        showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
        
        // Track form submission (analytics placeholder)
        trackFormSubmission('contact', formData);
        
    }, 2000);
}

// Validate entire form
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!validateField({ target: field })) {
            isValid = false;
        }
    });
    
    return isValid;
}

// Validate individual field
function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    const fieldType = field.type;
    const fieldName = field.name;
    const formGroup = field.closest('.form-group');
    
    // Clear previous states
    clearFieldError(e);
    
    // Check if field is required and empty
    if (field.hasAttribute('required') && !value) {
        showFieldError(formGroup, `${getFieldLabel(field)} is required.`);
        return false;
    }
    
    // Validate email
    if (fieldType === 'email' && value) {
        if (!validateEmail(value)) {
            showFieldError(formGroup, 'Please enter a valid email address.');
            return false;
        }
    }
    
    // Validate message length
    if (fieldName === 'message' && value) {
        if (value.length < 10) {
            showFieldError(formGroup, 'Message must be at least 10 characters long.');
            return false;
        }
        if (value.length > 1000) {
            showFieldError(formGroup, 'Message must be less than 1000 characters.');
            return false;
        }
    }
    
    // Validate name
    if (fieldName === 'name' && value) {
        if (value.length < 2) {
            showFieldError(formGroup, 'Name must be at least 2 characters long.');
            return false;
        }
    }
    
    // If we get here, field is valid
    showFieldSuccess(formGroup);
    return true;
}

// Show field error
function showFieldError(formGroup, message) {
    formGroup.classList.remove('success');
    formGroup.classList.add('error');
    
    let errorElement = formGroup.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        formGroup.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
}

// Show field success
function showFieldSuccess(formGroup) {
    formGroup.classList.remove('error');
    formGroup.classList.add('success');
    
    const errorElement = formGroup.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove();
    }
}

// Clear field error
function clearFieldError(e) {
    const formGroup = e.target.closest('.form-group');
    formGroup.classList.remove('error', 'success');
    
    const errorElement = formGroup.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove();
    }
}

// Clear all field states
function clearAllFieldStates(form) {
    const formGroups = form.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        group.classList.remove('error', 'success');
        const errorElement = group.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    });
}

// Get field label
function getFieldLabel(field) {
    const label = field.closest('.form-group').querySelector('label');
    return label ? label.textContent.replace('*', '').trim() : field.name;
}

// Show form loading state
function showFormLoading(isLoading) {
    const submitBtn = document.getElementById('submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    
    if (isLoading) {
        btnText.style.display = 'none';
        btnLoading.style.display = 'flex';
        submitBtn.disabled = true;
    } else {
        btnText.style.display = 'block';
        btnLoading.style.display = 'none';
        submitBtn.disabled = false;
    }
}

// Show success message
function showSuccessMessage() {
    const contactForm = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');
    
    contactForm.style.display = 'none';
    successMessage.style.display = 'block';
    
    // Hide success message and show form again after 5 seconds
    setTimeout(() => {
        contactForm.style.display = 'flex';
        successMessage.style.display = 'none';
    }, 5000);
}

// Setup newsletter form
function setupNewsletterForm() {
    const newsletterForm = document.getElementById('newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('.newsletter-input');
            const email = emailInput.value.trim();
            
            if (validateEmail(email)) {
                submitNewsletter(email, emailInput);
            } else {
                showNotification('Please enter a valid email address.', 'error');
            }
        });
    }
}

// Submit newsletter
function submitNewsletter(email, inputElement) {
    const submitBtn = document.querySelector('#newsletter-form .newsletter-btn');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Clear form
        inputElement.value = '';
        
        // Show success message
        showNotification('Thank you for subscribing to our newsletter!', 'success');
        
        // Track newsletter subscription
        trackFormSubmission('newsletter', { email: email });
        
    }, 2000);
}

// Setup FAQ accordion
function setupFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.closest('.faq-item');
            const isActive = faqItem.classList.contains('active');
            
            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
}

// Update meta tags
function updateMetaTags() {
    // Update Open Graph URL
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
        ogUrl.content = window.location.href;
    }
}

// Track form submission (placeholder for analytics)
function trackFormSubmission(formType, data) {
    // This would integrate with your analytics service
    console.log(`Form submitted: ${formType}`, data);
    
    // Example: Google Analytics event tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', 'form_submit', {
            'form_type': formType,
            'event_category': 'engagement'
        });
    }
}

// Utility functions
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" aria-label="Close notification">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#3B82F6'};
        color: white;
        padding: 16px 20px;
        border-radius: 8px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        max-width: 400px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', function() {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Character counter for textarea
document.addEventListener('DOMContentLoaded', function() {
    const messageTextarea = document.getElementById('contact-message');
    
    if (messageTextarea) {
        const maxLength = 1000;
        
        // Create character counter
        const counter = document.createElement('div');
        counter.className = 'character-counter';
        counter.style.cssText = `
            font-size: 12px;
            color: var(--warm-gray);
            text-align: right;
            margin-top: 4px;
        `;
        
        messageTextarea.parentNode.appendChild(counter);
        
        // Update counter
        function updateCounter() {
            const remaining = maxLength - messageTextarea.value.length;
            counter.textContent = `${remaining} characters remaining`;
            
            if (remaining < 50) {
                counter.style.color = 'var(--error-red)';
            } else if (remaining < 100) {
                counter.style.color = 'var(--accent-orange)';
            } else {
                counter.style.color = 'var(--warm-gray)';
            }
        }
        
        messageTextarea.addEventListener('input', updateCounter);
        updateCounter(); // Initial update
    }
});

// Auto-resize textarea
document.addEventListener('DOMContentLoaded', function() {
    const textareas = document.querySelectorAll('textarea');
    
    textareas.forEach(textarea => {
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
        });
    });
});

// Form field focus effects
document.addEventListener('DOMContentLoaded', function() {
    const formFields = document.querySelectorAll('input, select, textarea');
    
    formFields.forEach(field => {
        field.addEventListener('focus', function() {
            this.closest('.form-group').classList.add('focused');
        });
        
        field.addEventListener('blur', function() {
            this.closest('.form-group').classList.remove('focused');
        });
    });
});

// Smooth scroll for anchor links
document.addEventListener('click', function(e) {
    const target = e.target.closest('a[href^="#"]');
    if (target) {
        e.preventDefault();
        const targetId = target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            const headerHeight = document.getElementById('header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
});

// Add loading animation for page elements
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.contact-form, .contact-info-card, .faq-section, .social-section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        element.style.animationPlayState = 'paused';
        observer.observe(element);
    });
});

