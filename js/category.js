// ===== CATEGORY PAGE JAVASCRIPT =====

// Global variables
let currentCategory = null;
let categoryPosts = [];
let filteredPosts = [];
let currentPage = 1;
let postsPerPage = 6;
let currentSort = 'newest';
let searchQuery = '';

// Initialize category page
document.addEventListener('DOMContentLoaded', function() {
    if (typeof blogPosts !== 'undefined' && typeof categories !== 'undefined') {
        initializeCategoryPage();
    } else {
        console.error('Blog data not found');
        showErrorMessage();
    }
});

// Initialize category page components
function initializeCategoryPage() {
    const categoryId = getUrlParameter('cat');
    
    if (!categoryId) {
        showErrorMessage('Category not found');
        return;
    }
    
    currentCategory = getCategoryById(categoryId);
    
    if (!currentCategory) {
        showErrorMessage('Category not found');
        return;
    }
    
    loadCategoryContent();
    loadCategoryPosts();
    loadSidebarContent();
    setupEventListeners();
    updateMetaTags();
}

// Load category content
function loadCategoryContent() {
    if (!currentCategory) return;
    
    // Update breadcrumb
    document.getElementById('breadcrumb-current').textContent = currentCategory.name;
    
    // Update category header
    document.getElementById('category-icon').innerHTML = `<i class="${currentCategory.icon}"></i>`;
    document.getElementById('category-title').textContent = currentCategory.name;
    document.getElementById('category-description').textContent = currentCategory.description;
    
    // Count posts in this category
    const postsInCategory = blogPosts.filter(post => 
        post.category.toLowerCase().replace(/\s+/g, '-') === currentCategory.id
    );
    
    const postCount = postsInCategory.length;
    const lastUpdated = postsInCategory.length > 0 
        ? formatDate(Math.max(...postsInCategory.map(post => new Date(post.date))))
        : 'No articles yet';
    
    document.getElementById('post-count').textContent = `${postCount} article${postCount !== 1 ? 's' : ''}`;
    document.getElementById('last-updated').textContent = `Last updated: ${lastUpdated}`;
    
    // Update category icon color
    const categoryIcon = document.getElementById('category-icon');
    if (currentCategory.color) {
        categoryIcon.style.background = `linear-gradient(135deg, ${currentCategory.color}, ${adjustColor(currentCategory.color, -20)})`;
    }
}

// Load category posts
function loadCategoryPosts() {
    if (!currentCategory) return;
    
    // Filter posts by category
    categoryPosts = blogPosts.filter(post => 
        post.category.toLowerCase().replace(/\s+/g, '-') === currentCategory.id
    );
    
    filteredPosts = [...categoryPosts];
    
    if (filteredPosts.length === 0) {
        showEmptyState();
        return;
    }
    
    sortPosts();
    renderPosts();
    updateResultsCount();
}

// Sort posts
function sortPosts() {
    switch (currentSort) {
        case 'newest':
            filteredPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
            break;
        case 'oldest':
            filteredPosts.sort((a, b) => new Date(a.date) - new Date(b.date));
            break;
        case 'title':
            filteredPosts.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case 'popular':
            // Sort by featured status then by date
            filteredPosts.sort((a, b) => {
                if (a.featured && !b.featured) return -1;
                if (!a.featured && b.featured) return 1;
                return new Date(b.date) - new Date(a.date);
            });
            break;
        default:
            break;
    }
}

// Render posts
function renderPosts() {
    const postsGrid = document.getElementById('category-posts-grid');
    const loadingState = document.getElementById('loading-state');
    const noResults = document.getElementById('no-results');
    
    if (!postsGrid) return;
    
    // Show loading state
    showLoadingState();
    
    setTimeout(() => {
        hideLoadingState();
        
        if (filteredPosts.length === 0) {
            postsGrid.innerHTML = '';
            showNoResults();
            hidePagination();
            return;
        }
        
        hideNoResults();
        
        // Calculate pagination
        const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
        const startIndex = (currentPage - 1) * postsPerPage;
        const endIndex = startIndex + postsPerPage;
        const postsToShow = filteredPosts.slice(startIndex, endIndex);
        
        // Render posts
        const postsHTML = postsToShow.map((post, index) => `
            <article class="category-post-card" style="animation-delay: ${index * 0.1}s">
                ${post.featured ? '<div class="featured-indicator">Featured</div>' : ''}
                <img src="../${post.image}" alt="${post.title}" class="post-image" loading="lazy">
                <div class="post-content">
                    <span class="post-category">${post.category}</span>
                    <h3 class="post-title">${highlightSearchTerm(post.title)}</h3>
                    <p class="post-excerpt">${highlightSearchTerm(post.excerpt)}</p>
                    <div class="post-meta">
                        <div class="post-author">
                            <i class="fas fa-user"></i>
                            <span>${post.author}</span>
                        </div>
                        <span class="post-date">${formatDate(post.date)}</span>
                        <span class="post-read-time">${post.readTime}</span>
                    </div>
                    <div class="post-tags">
                        ${post.tags.map(tag => `<a href="#" class="post-tag" onclick="searchInCategory('${tag}')">${tag}</a>`).join('')}
                    </div>
                    <a href="post.html?id=${post.id}" class="post-read-more">
                        Read More <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            </article>
        `).join('');
        
        postsGrid.innerHTML = postsHTML;
        
        // Render pagination
        renderPagination(totalPages);
        
        // Update results count
        updateResultsCount();
        
    }, 500); // Simulate loading time
}

// Update results count
function updateResultsCount() {
    const resultsCount = document.getElementById('results-count');
    if (resultsCount) {
        const total = filteredPosts.length;
        const showing = Math.min(postsPerPage, total - (currentPage - 1) * postsPerPage);
        const start = total > 0 ? (currentPage - 1) * postsPerPage + 1 : 0;
        const end = (currentPage - 1) * postsPerPage + showing;
        
        if (searchQuery) {
            resultsCount.textContent = `Found ${total} article${total !== 1 ? 's' : ''} for "${searchQuery}"`;
        } else {
            resultsCount.textContent = `Showing ${start}-${end} of ${total} article${total !== 1 ? 's' : ''}`;
        }
    }
}

// Highlight search terms in text
function highlightSearchTerm(text) {
    if (!searchQuery) return text;
    
    const regex = new RegExp(`(${escapeRegExp(searchQuery)})`, 'gi');
    return text.replace(regex, '<span class="category-search-highlight">$1</span>');
}

// Escape special regex characters
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Search in category
function searchInCategory(query) {
    const categorySearch = document.getElementById('category-search');
    if (categorySearch) {
        categorySearch.value = query;
        searchQuery = query;
        performSearch();
    }
}

// Perform search within category
function performSearch() {
    currentPage = 1;
    
    if (searchQuery === '') {
        filteredPosts = [...categoryPosts];
    } else {
        const searchTerm = searchQuery.toLowerCase();
        filteredPosts = categoryPosts.filter(post => {
            return post.title.toLowerCase().includes(searchTerm) ||
                   post.excerpt.toLowerCase().includes(searchTerm) ||
                   post.content.toLowerCase().includes(searchTerm) ||
                   post.author.toLowerCase().includes(searchTerm) ||
                   post.tags.some(tag => tag.toLowerCase().includes(searchTerm));
        });
    }
    
    sortPosts();
    renderPosts();
}

// Show loading state
function showLoadingState() {
    const loadingState = document.getElementById('loading-state');
    if (loadingState) {
        loadingState.style.display = 'flex';
    }
}

// Hide loading state
function hideLoadingState() {
    const loadingState = document.getElementById('loading-state');
    if (loadingState) {
        loadingState.style.display = 'none';
    }
}

// Show no results state
function showNoResults() {
    const noResults = document.getElementById('no-results');
    if (noResults) {
        noResults.style.display = 'flex';
    }
}

// Hide no results state
function hideNoResults() {
    const noResults = document.getElementById('no-results');
    if (noResults) {
        noResults.style.display = 'none';
    }
}

// Show empty state
function showEmptyState() {
    const postsGrid = document.getElementById('category-posts-grid');
    if (postsGrid) {
        postsGrid.innerHTML = `
            <div class="category-empty-state">
                <i class="fas fa-folder-open"></i>
                <h3>No articles in this category yet</h3>
                <p>We're working on adding more content to this category. Check back soon or explore other categories.</p>
                <a href="blog.html" class="btn btn-primary">View All Articles</a>
            </div>
        `;
    }
    hidePagination();
}

// Render pagination
function renderPagination(totalPages) {
    const paginationContainer = document.getElementById('pagination-container');
    
    if (!paginationContainer || totalPages <= 1) {
        hidePagination();
        return;
    }
    
    const startItem = (currentPage - 1) * postsPerPage + 1;
    const endItem = Math.min(currentPage * postsPerPage, filteredPosts.length);
    
    let paginationHTML = `
        <div class="pagination">
            <a href="#" class="pagination-btn ${currentPage === 1 ? 'disabled' : ''}" onclick="changePage(${currentPage - 1})">
                <i class="fas fa-chevron-left"></i>
            </a>
    `;
    
    // Page numbers
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    if (startPage > 1) {
        paginationHTML += `<a href="#" class="pagination-btn" onclick="changePage(1)">1</a>`;
        if (startPage > 2) {
            paginationHTML += `<span class="pagination-ellipsis">...</span>`;
        }
    }
    
    for (let i = startPage; i <= endPage; i++) {
        paginationHTML += `
            <a href="#" class="pagination-btn ${i === currentPage ? 'active' : ''}" onclick="changePage(${i})">
                ${i}
            </a>
        `;
    }
    
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            paginationHTML += `<span class="pagination-ellipsis">...</span>`;
        }
        paginationHTML += `<a href="#" class="pagination-btn" onclick="changePage(${totalPages})">${totalPages}</a>`;
    }
    
    paginationHTML += `
            <a href="#" class="pagination-btn ${currentPage === totalPages ? 'disabled' : ''}" onclick="changePage(${currentPage + 1})">
                <i class="fas fa-chevron-right"></i>
            </a>
        </div>
        <div class="pagination-info">
            Showing ${startItem}-${endItem} of ${filteredPosts.length} articles
        </div>
    `;
    
    paginationContainer.innerHTML = paginationHTML;
    paginationContainer.style.display = 'flex';
}

// Hide pagination
function hidePagination() {
    const paginationContainer = document.getElementById('pagination-container');
    if (paginationContainer) {
        paginationContainer.style.display = 'none';
    }
}

// Change page
function changePage(page) {
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
    
    if (page < 1 || page > totalPages || page === currentPage) {
        return;
    }
    
    currentPage = page;
    renderPosts();
    
    // Scroll to top of posts
    document.getElementById('category-posts-grid').scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
    });
}

// Load sidebar content
function loadSidebarContent() {
    loadOtherCategories();
    loadFeaturedPosts();
    setupNewsletterForm();
    loadRelatedCategories();
}

// Load other categories
function loadOtherCategories() {
    const otherCategoriesContainer = document.getElementById('other-categories');
    
    if (!otherCategoriesContainer) return;
    
    // Get all categories except current one
    const otherCategories = categories.filter(cat => cat.id !== currentCategory.id);
    
    // Count posts in each category
    const categoryCounts = {};
    blogPosts.forEach(post => {
        const categoryId = post.category.toLowerCase().replace(/\s+/g, '-');
        categoryCounts[categoryId] = (categoryCounts[categoryId] || 0) + 1;
    });
    
    const otherCategoriesHTML = otherCategories.map(category => `
        <a href="category.html?cat=${category.id}" class="other-category-item">
            <div class="other-category-icon" style="background: linear-gradient(135deg, ${category.color}, ${adjustColor(category.color, -20)})">
                <i class="${category.icon}"></i>
            </div>
            <div class="other-category-info">
                <div class="other-category-name">${category.name}</div>
                <div class="other-category-count">${categoryCounts[category.id] || 0} articles</div>
            </div>
        </a>
    `).join('');
    
    otherCategoriesContainer.innerHTML = otherCategoriesHTML;
}

// Load featured posts
function loadFeaturedPosts() {
    const featuredPostsContainer = document.getElementById('featured-posts-widget');
    
    if (!featuredPostsContainer) return;
    
    // Get featured posts from all categories
    const featuredPosts = blogPosts
        .filter(post => post.featured)
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 4);
    
    if (featuredPosts.length === 0) {
        featuredPostsContainer.innerHTML = '<p>No featured articles available.</p>';
        return;
    }
    
    const featuredPostsHTML = featuredPosts.map(post => `
        <a href="post.html?id=${post.id}" class="featured-post-item">
            <img src="../${post.image}" alt="${post.title}" class="featured-post-image" loading="lazy">
            <div class="featured-post-content">
                <h4 class="featured-post-title">${post.title}</h4>
                <div class="featured-post-meta">
                    <span class="featured-badge">Featured</span>
                    <span class="featured-post-date">${formatDate(post.date)}</span>
                </div>
            </div>
        </a>
    `).join('');
    
    featuredPostsContainer.innerHTML = featuredPostsHTML;
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

// Submit newsletter
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

// Load related categories
function loadRelatedCategories() {
    const relatedCategoriesGrid = document.getElementById('related-categories-grid');
    
    if (!relatedCategoriesGrid) return;
    
    // Get other categories (excluding current one)
    const relatedCategories = categories
        .filter(cat => cat.id !== currentCategory.id)
        .slice(0, 3);
    
    // Count posts in each category
    const categoryCounts = {};
    blogPosts.forEach(post => {
        const categoryId = post.category.toLowerCase().replace(/\s+/g, '-');
        categoryCounts[categoryId] = (categoryCounts[categoryId] || 0) + 1;
    });
    
    const relatedCategoriesHTML = relatedCategories.map(category => `
        <a href="category.html?cat=${category.id}" class="related-category-card">
            <div class="related-category-card-icon" style="background: linear-gradient(135deg, ${category.color}, ${adjustColor(category.color, -20)})">
                <i class="${category.icon}"></i>
            </div>
            <h3 class="related-category-card-title">${category.name}</h3>
            <p class="related-category-card-description">${category.description}</p>
            <div class="related-category-card-stats">
                <div class="related-category-card-stat">
                    <i class="fas fa-file-alt"></i>
                    <span>${categoryCounts[category.id] || 0} articles</span>
                </div>
            </div>
        </a>
    `).join('');
    
    relatedCategoriesGrid.innerHTML = relatedCategoriesHTML;
}

// Setup event listeners
function setupEventListeners() {
    // Sort dropdown
    const sortSelect = document.getElementById('category-sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            currentSort = this.value;
            currentPage = 1;
            sortPosts();
            renderPosts();
        });
    }
    
    // Search functionality
    const categorySearch = document.getElementById('category-search');
    const categorySearchBtn = document.getElementById('category-search-btn');
    
    if (categorySearch) {
        categorySearch.addEventListener('input', debounce(function() {
            searchQuery = this.value.trim();
            performSearch();
        }, 300));
        
        categorySearch.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                searchQuery = this.value.trim();
                performSearch();
            }
        });
    }
    
    if (categorySearchBtn) {
        categorySearchBtn.addEventListener('click', function() {
            searchQuery = categorySearch.value.trim();
            performSearch();
        });
    }
}

// Update meta tags
function updateMetaTags() {
    if (!currentCategory) return;
    
    // Update page title
    document.title = `${currentCategory.name} - SkillGrow`;
    document.getElementById('page-title').textContent = `${currentCategory.name} - SkillGrow`;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.content = `Explore ${currentCategory.name.toLowerCase()} articles to develop your soft skills. ${currentCategory.description}`;
    }
    
    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
        ogTitle.content = `${currentCategory.name} - SkillGrow`;
    }
    
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
        ogDescription.content = `Explore ${currentCategory.name.toLowerCase()} articles. ${currentCategory.description}`;
    }
    
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
        ogUrl.content = window.location.href;
    }
}

// Show error message
function showErrorMessage(message = 'Category not found') {
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

function getCategoryById(id) {
    return categories.find(category => category.id === id);
}

function adjustColor(color, amount) {
    // Simple color adjustment function
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * amount);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
        (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
        (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
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

