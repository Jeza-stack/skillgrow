// ===== BLOG POST PAGE JAVASCRIPT =====

// Global variables
let currentPost = null;
let relatedPosts = [];

// Initialize post page
document.addEventListener('DOMContentLoaded', function() {
    if (typeof blogPosts !== 'undefined') {
        initializePostPage();
    } else {
        console.error('Blog posts data not found');
        showErrorMessage();
    }
});

// Initialize post page components
function initializePostPage() {
    const postId = getUrlParameter('id');
    
    if (!postId) {
        showErrorMessage('Post not found');
        return;
    }
    
    currentPost = getPostById(postId);
    
    if (!currentPost) {
        showErrorMessage('Post not found');
        return;
    }
    
    loadPostContent();
    generateTableOfContents();
    loadRelatedPosts();
    loadSidebarContent();
    setupEventListeners();
    setupBackToTop();
    updateMetaTags();
}

// Load post content
function loadPostContent() {
    if (!currentPost) return;
    
    // Update breadcrumb
    document.getElementById('breadcrumb-current').textContent = currentPost.title;
    
    // Update article header
    document.getElementById('article-category').textContent = currentPost.category;
    document.getElementById('article-title').textContent = currentPost.title;
    document.getElementById('article-excerpt').textContent = currentPost.excerpt;
    
    // Update author info
    document.getElementById('author-name').textContent = currentPost.author;
    document.getElementById('article-date').textContent = formatDate(currentPost.date);
    document.getElementById('read-time').textContent = currentPost.readTime;
    
    // Update featured image
    const featuredImage = document.getElementById('featured-image');
    featuredImage.src = `../${currentPost.image}`;
    featuredImage.alt = currentPost.title;
    
    // Update article content
    document.getElementById('article-content').innerHTML = currentPost.content;
    
    // Update tags
    updateArticleTags();
    
    // Update author bio
    updateAuthorBio();
    
    // Update navigation
    updateArticleNavigation();
    
    // Setup social sharing
    setupSocialSharing();
}

// Update article tags
function updateArticleTags() {
    const tagsContainer = document.getElementById('article-tags');
    
    if (currentPost.tags && currentPost.tags.length > 0) {
        const tagsHTML = `
            <h3>Tags</h3>
            <div class="tags-list">
                ${currentPost.tags.map(tag => `
                    <a href="../pages/blog.html?search=${encodeURIComponent(tag)}" class="tag-link">${tag}</a>
                `).join('')}
            </div>
        `;
        tagsContainer.innerHTML = tagsHTML;
    } else {
        tagsContainer.style.display = 'none';
    }
}

// Update author bio
function updateAuthorBio() {
    const authorBioContainer = document.getElementById('author-bio');
    
    // Find author data
    const authorId = currentPost.author.toLowerCase().replace(/\s+/g, '-').replace(/\./g, '');
    const author = getAuthorById(authorId) || {
        name: currentPost.author,
        bio: `${currentPost.author} is a contributor to SkillGrow, sharing insights on professional development and soft skills.`,
        image: 'assets/images/author-avatar.jpg',
        expertise: [currentPost.category]
    };
    
    const authorBioHTML = `
        <div class="author-bio-content">
            <img src="../${author.image}" alt="${author.name}" class="author-bio-avatar">
            <div class="author-bio-info">
                <h3 class="author-bio-name">About ${author.name}</h3>
                <p class="author-bio-text">${author.bio}</p>
                <div class="author-expertise">
                    ${author.expertise.map(skill => `
                        <span class="expertise-tag">${skill}</span>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    
    authorBioContainer.innerHTML = authorBioHTML;
}

// Update article navigation
function updateArticleNavigation() {
    const currentIndex = blogPosts.findIndex(post => post.id === currentPost.id);
    const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
    const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;
    
    const navPrevious = document.getElementById('nav-previous');
    const navNext = document.getElementById('nav-next');
    
    if (prevPost) {
        navPrevious.innerHTML = `
            <a href="post.html?id=${prevPost.id}" class="nav-link">
                <i class="fas fa-chevron-left"></i>
                <div class="nav-link-content">
                    <span class="nav-link-label">Previous Article</span>
                    <span class="nav-link-title">${prevPost.title}</span>
                </div>
            </a>
        `;
    }
    
    if (nextPost) {
        navNext.innerHTML = `
            <a href="post.html?id=${nextPost.id}" class="nav-link">
                <div class="nav-link-content">
                    <span class="nav-link-label">Next Article</span>
                    <span class="nav-link-title">${nextPost.title}</span>
                </div>
                <i class="fas fa-chevron-right"></i>
            </a>
        `;
    }
}

// Generate table of contents
function generateTableOfContents() {
    const articleContent = document.getElementById('article-content');
    const tocContainer = document.getElementById('table-of-contents');
    
    if (!articleContent || !tocContainer) return;
    
    const headings = articleContent.querySelectorAll('h2, h3, h4');
    
    if (headings.length === 0) {
        tocContainer.innerHTML = '<p>No headings found</p>';
        return;
    }
    
    let tocHTML = '<ul class="toc-list">';
    
    headings.forEach((heading, index) => {
        const id = `heading-${index}`;
        heading.id = id;
        
        const level = heading.tagName.toLowerCase();
        const text = heading.textContent;
        
        tocHTML += `
            <li class="toc-item">
                <a href="#${id}" class="toc-link ${level}" data-target="${id}">
                    ${text}
                </a>
            </li>
        `;
    });
    
    tocHTML += '</ul>';
    tocContainer.innerHTML = tocHTML;
    
    // Setup TOC click handlers
    const tocLinks = tocContainer.querySelectorAll('.toc-link');
    tocLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-target');
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active TOC link
                tocLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // Setup scroll spy for TOC
    setupScrollSpy(tocLinks);
}

// Setup scroll spy for table of contents
function setupScrollSpy(tocLinks) {
    const headings = document.querySelectorAll('#article-content h2, #article-content h3, #article-content h4');
    
    if (headings.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                const activeLink = document.querySelector(`.toc-link[data-target="${id}"]`);
                
                if (activeLink) {
                    tocLinks.forEach(link => link.classList.remove('active'));
                    activeLink.classList.add('active');
                }
            }
        });
    }, {
        rootMargin: '-100px 0px -50% 0px',
        threshold: 0
    });
    
    headings.forEach(heading => observer.observe(heading));
}

// Load related posts
function loadRelatedPosts() {
    if (!currentPost) return;
    
    // Find posts in the same category, excluding current post
    relatedPosts = blogPosts.filter(post => 
        post.id !== currentPost.id && 
        post.category === currentPost.category
    ).slice(0, 3);
    
    // If not enough related posts, add posts with similar tags
    if (relatedPosts.length < 3) {
        const tagRelatedPosts = blogPosts.filter(post => 
            post.id !== currentPost.id && 
            post.category !== currentPost.category &&
            post.tags.some(tag => currentPost.tags.includes(tag))
        ).slice(0, 3 - relatedPosts.length);
        
        relatedPosts = [...relatedPosts, ...tagRelatedPosts];
    }
    
    // If still not enough, add recent posts
    if (relatedPosts.length < 3) {
        const recentPosts = blogPosts
            .filter(post => post.id !== currentPost.id && !relatedPosts.includes(post))
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 3 - relatedPosts.length);
        
        relatedPosts = [...relatedPosts, ...recentPosts];
    }
    
    // Render related posts in sidebar
    renderSidebarRelatedPosts();
    
    // Render related articles section
    renderRelatedArticlesSection();
}

// Render sidebar related posts
function renderSidebarRelatedPosts() {
    const relatedPostsContainer = document.getElementById('related-posts');
    
    if (relatedPosts.length === 0) {
        relatedPostsContainer.innerHTML = '<p>No related articles found.</p>';
        return;
    }
    
    const relatedPostsHTML = relatedPosts.slice(0, 3).map(post => `
        <a href="post.html?id=${post.id}" class="related-post-item">
            <img src="../${post.image}" alt="${post.title}" class="related-post-image" loading="lazy">
            <div class="related-post-content">
                <h4 class="related-post-title">${post.title}</h4>
                <span class="related-post-date">${formatDate(post.date)}</span>
            </div>
        </a>
    `).join('');
    
    relatedPostsContainer.innerHTML = relatedPostsHTML;
}

// Render related articles section
function renderRelatedArticlesSection() {
    const relatedArticlesGrid = document.getElementById('related-articles-grid');
    
    if (relatedPosts.length === 0) {
        document.querySelector('.related-articles-section').style.display = 'none';
        return;
    }
    
    const relatedArticlesHTML = relatedPosts.slice(0, 3).map(post => `
        <article class="post-card">
            <img src="../${post.image}" alt="${post.title}" class="post-image" loading="lazy">
            <div class="post-content">
                <span class="post-category">${post.category}</span>
                <h3 class="post-title">${post.title}</h3>
                <p class="post-excerpt">${post.excerpt}</p>
                <div class="post-meta">
                    <div class="post-author">
                        <i class="fas fa-user"></i>
                        <span>${post.author}</span>
                    </div>
                    <span class="post-date">${formatDate(post.date)}</span>
                </div>
                <a href="post.html?id=${post.id}" class="post-read-more">
                    Read More <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        </article>
    `).join('');
    
    relatedArticlesGrid.innerHTML = relatedArticlesHTML;
}

// Load sidebar content
function loadSidebarContent() {
    loadPopularPosts();
    setupNewsletterForm();
}

// Load popular posts
function loadPopularPosts() {
    const popularPostsContainer = document.getElementById('popular-posts');
    
    // Get featured posts first, then recent posts
    const featuredPosts = blogPosts.filter(post => post.featured && post.id !== currentPost.id);
    const recentPosts = blogPosts
        .filter(post => !post.featured && post.id !== currentPost.id)
        .sort((a, b) => new Date(b.date) - new Date(a.date));
    
    const popularPosts = [...featuredPosts, ...recentPosts].slice(0, 5);
    
    const popularPostsHTML = popularPosts.map((post, index) => `
        <a href="post.html?id=${post.id}" class="popular-post-item">
            <div class="popular-post-number">${index + 1}</div>
            <div class="popular-post-title">${post.title}</div>
        </a>
    `).join('');
    
    popularPostsContainer.innerHTML = popularPostsHTML;
}

// Setup newsletter form
function setupNewsletterForm() {
    const newsletterForm = document.getElementById('sidebar-newsletter-form');
    
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

// Submit newsletter (sidebar version)
function submitNewsletter(email, inputElement) {
    const submitBtn = document.querySelector('#sidebar-newsletter-form .newsletter-btn');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.innerHTML = '<span class="loading"></span>';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Clear form
        inputElement.value = '';
        
        // Show success message
        showNotification('Thank you for subscribing!', 'success');
    }, 2000);
}

// Setup social sharing
function setupSocialSharing() {
    const postUrl = encodeURIComponent(window.location.href);
    const postTitle = encodeURIComponent(currentPost.title);
    const postExcerpt = encodeURIComponent(currentPost.excerpt);
    
    // Facebook
    document.getElementById('share-facebook').href = 
        `https://www.facebook.com/sharer/sharer.php?u=${postUrl}`;
    
    // Twitter
    document.getElementById('share-twitter').href = 
        `https://twitter.com/intent/tweet?url=${postUrl}&text=${postTitle}`;
    
    // LinkedIn
    document.getElementById('share-linkedin').href = 
        `https://www.linkedin.com/sharing/share-offsite/?url=${postUrl}`;
    
    // Email
    document.getElementById('share-email').href = 
        `mailto:?subject=${postTitle}&body=${postExcerpt}%0A%0A${postUrl}`;
    
    // Copy link
    document.getElementById('copy-link').addEventListener('click', function() {
        navigator.clipboard.writeText(window.location.href).then(() => {
            showNotification('Link copied to clipboard!', 'success');
        }).catch(() => {
            showNotification('Failed to copy link', 'error');
        });
    });
}

// Setup event listeners
function setupEventListeners() {
    // Like button
    const likeBtn = document.getElementById('like-btn');
    if (likeBtn) {
        likeBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            const icon = this.querySelector('i');
            const count = this.querySelector('#like-count');
            
            if (this.classList.contains('active')) {
                icon.className = 'fas fa-heart';
                count.textContent = parseInt(count.textContent) + 1;
                showNotification('Thanks for liking this article!', 'success');
            } else {
                icon.className = 'far fa-heart';
                count.textContent = parseInt(count.textContent) - 1;
            }
        });
    }
    
    // Bookmark button
    const bookmarkBtn = document.getElementById('bookmark-btn');
    if (bookmarkBtn) {
        bookmarkBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            const icon = this.querySelector('i');
            
            if (this.classList.contains('active')) {
                icon.className = 'fas fa-bookmark';
                showNotification('Article bookmarked!', 'success');
            } else {
                icon.className = 'far fa-bookmark';
                showNotification('Bookmark removed', 'info');
            }
        });
    }
    
    // Share button (opens share menu)
    const shareBtn = document.getElementById('share-btn');
    if (shareBtn) {
        shareBtn.addEventListener('click', function() {
            const socialShare = document.querySelector('.social-share');
            socialShare.scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // Comment form
    const commentForm = document.getElementById('comment-form');
    if (commentForm) {
        commentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('comment-name').value.trim();
            const email = document.getElementById('comment-email').value.trim();
            const message = document.getElementById('comment-message').value.trim();
            
            if (name && email && message && validateEmail(email)) {
                // Simulate comment submission
                showNotification('Thank you for your comment! It will be reviewed before publishing.', 'success');
                this.reset();
            } else {
                showNotification('Please fill in all fields with valid information.', 'error');
            }
        });
    }
}

// Setup back to top button
function setupBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (backToTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        // Scroll to top when clicked
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Update meta tags for SEO and social sharing
function updateMetaTags() {
    if (!currentPost) return;
    
    // Update page title
    document.title = `${currentPost.title} - SkillGrow`;
    document.getElementById('page-title').textContent = `${currentPost.title} - SkillGrow`;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.content = currentPost.excerpt;
    }
    
    // Update meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords && currentPost.tags) {
        metaKeywords.content = currentPost.tags.join(', ');
    }
    
    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
        ogTitle.content = currentPost.title;
    }
    
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
        ogDescription.content = currentPost.excerpt;
    }
    
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
        ogUrl.content = window.location.href;
    }
    
    // Add Open Graph image if not exists
    let ogImage = document.querySelector('meta[property="og:image"]');
    if (!ogImage) {
        ogImage = document.createElement('meta');
        ogImage.setAttribute('property', 'og:image');
        document.head.appendChild(ogImage);
    }
    ogImage.content = `${window.location.origin}/${currentPost.image}`;
}

// Show error message
function showErrorMessage(message = 'Post not found') {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = `
        <div class="container" style="text-align: center; padding: 100px 0;">
            <h1>Oops!</h1>
            <p>${message}</p>
            <a href="../index.html" class="btn btn-primary">Go Home</a>
        </div>
    `;
}

// Utility functions
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

function getPostById(id) {
    return blogPosts.find(post => post.id === id);
}

function getAuthorById(id) {
    if (typeof authors !== 'undefined') {
        return authors.find(author => author.id === id);
    }
    return null;
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

