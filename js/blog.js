// ===== BLOG PAGE JAVASCRIPT =====

// Global variables
let currentPosts = [];
let filteredPosts = [];
let currentPage = 1;
let postsPerPage = 6;
let currentFilter = 'all';
let currentSort = 'newest';
let searchQuery = '';

// Initialize blog page
document.addEventListener('DOMContentLoaded', function() {
    if (typeof blogPosts !== 'undefined') {
        currentPosts = [...blogPosts];
        filteredPosts = [...blogPosts];
        
        initializeBlogPage();
        renderPosts();
        renderSidebar();
        setupEventListeners();
    } else {
        console.error('Blog posts data not found');
    }
});

// Initialize blog page components
function initializeBlogPage() {
    // Set up filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            setActiveFilter(this);
            filterPosts(filter);
        });
    });
    
    // Set up sort dropdown
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            currentSort = this.value;
            sortPosts();
            renderPosts();
        });
    }
    
    // Set up search functionality
    const blogSearch = document.getElementById('blog-search');
    const blogSearchBtn = document.getElementById('blog-search-btn');
    
    if (blogSearch) {
        blogSearch.addEventListener('input', debounce(function() {
            searchQuery = this.value.trim();
            performSearch();
        }, 300));
        
        blogSearch.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                searchQuery = this.value.trim();
                performSearch();
            }
        });
    }
    
    if (blogSearchBtn) {
        blogSearchBtn.addEventListener('click', function() {
            searchQuery = blogSearch.value.trim();
            performSearch();
        });
    }
}

// Set active filter button
function setActiveFilter(activeBtn) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    activeBtn.classList.add('active');
}

// Filter posts by category
function filterPosts(filter) {
    currentFilter = filter;
    currentPage = 1;
    
    if (filter === 'all') {
        filteredPosts = [...currentPosts];
    } else {
        filteredPosts = currentPosts.filter(post => {
            const postCategory = post.category.toLowerCase().replace(/\s+/g, '-');
            return postCategory === filter;
        });
    }
    
    // Apply search if there's a query
    if (searchQuery) {
        applySearchFilter();
    }
    
    sortPosts();
    renderPosts();
}

// Perform search
function performSearch() {
    currentPage = 1;
    
    if (searchQuery === '') {
        // Reset to current filter
        filterPosts(currentFilter);
        return;
    }
    
    // Start with filtered posts based on current category filter
    let postsToSearch = currentFilter === 'all' ? [...currentPosts] : currentPosts.filter(post => {
        const postCategory = post.category.toLowerCase().replace(/\s+/g, '-');
        return postCategory === currentFilter;
    });
    
    // Apply search filter
    filteredPosts = postsToSearch.filter(post => {
        const searchTerm = searchQuery.toLowerCase();
        return post.title.toLowerCase().includes(searchTerm) ||
               post.excerpt.toLowerCase().includes(searchTerm) ||
               post.content.toLowerCase().includes(searchTerm) ||
               post.author.toLowerCase().includes(searchTerm) ||
               post.tags.some(tag => tag.toLowerCase().includes(searchTerm));
    });
    
    sortPosts();
    renderPosts();
}

// Apply search filter to current filtered posts
function applySearchFilter() {
    if (searchQuery === '') return;
    
    const searchTerm = searchQuery.toLowerCase();
    filteredPosts = filteredPosts.filter(post => {
        return post.title.toLowerCase().includes(searchTerm) ||
               post.excerpt.toLowerCase().includes(searchTerm) ||
               post.content.toLowerCase().includes(searchTerm) ||
               post.author.toLowerCase().includes(searchTerm) ||
               post.tags.some(tag => tag.toLowerCase().includes(searchTerm));
    });
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
            // For demo purposes, sort by featured status then by date
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
    const postsGrid = document.getElementById('posts-grid');
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
            <article class="blog-post-card" style="animation-delay: ${index * 0.1}s">
                ${post.featured ? '<div class="featured-indicator">Featured</div>' : ''}
                <img src="../${post.image}" alt="${post.title}" class="blog-post-image" loading="lazy">
                <div class="blog-post-content">
                    <span class="blog-post-category">${post.category}</span>
                    <h3 class="blog-post-title">${highlightSearchTerm(post.title)}</h3>
                    <p class="blog-post-excerpt">${highlightSearchTerm(post.excerpt)}</p>
                    <div class="blog-post-meta">
                        <div class="blog-post-author">
                            <i class="fas fa-user"></i>
                            <span>${post.author}</span>
                        </div>
                        <span class="blog-post-date">${formatDate(post.date)}</span>
                        <span class="blog-post-read-time">${post.readTime}</span>
                    </div>
                    <div class="blog-post-tags">
                        ${post.tags.map(tag => `<a href="#" class="blog-post-tag" onclick="searchByTag('${tag}')">${tag}</a>`).join('')}
                    </div>
                    <a href="post.html?id=${post.id}" class="blog-post-read-more">
                        Read More <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            </article>
        `).join('');
        
        postsGrid.innerHTML = postsHTML;
        
        // Render pagination
        renderPagination(totalPages);
        
        // Scroll to top of posts
        postsGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
    }, 500); // Simulate loading time
}

// Highlight search terms in text
function highlightSearchTerm(text) {
    if (!searchQuery) return text;
    
    const regex = new RegExp(`(${escapeRegExp(searchQuery)})`, 'gi');
    return text.replace(regex, '<span class="search-highlight">$1</span>');
}

// Escape special regex characters
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Search by tag
function searchByTag(tag) {
    const blogSearch = document.getElementById('blog-search');
    if (blogSearch) {
        blogSearch.value = tag;
        searchQuery = tag;
        performSearch();
    }
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
}

// Render sidebar widgets
function renderSidebar() {
    renderCategoriesWidget();
    renderRecentPostsWidget();
    renderTagsWidget();
}

// Render categories widget
function renderCategoriesWidget() {
    const categoriesWidget = document.getElementById('categories-widget');
    
    if (!categoriesWidget || typeof categories === 'undefined') return;
    
    const categoryCounts = {};
    
    // Count posts in each category
    blogPosts.forEach(post => {
        const categoryId = post.category.toLowerCase().replace(/\s+/g, '-');
        categoryCounts[categoryId] = (categoryCounts[categoryId] || 0) + 1;
    });
    
    const categoriesHTML = categories.map(category => `
        <a href="category.html?cat=${category.id}" class="category-item">
            <span class="category-name">${category.name}</span>
            <span class="category-count">${categoryCounts[category.id] || 0}</span>
        </a>
    `).join('');
    
    categoriesWidget.innerHTML = categoriesHTML;
}

// Render recent posts widget
function renderRecentPostsWidget() {
    const recentPostsWidget = document.getElementById('recent-posts-widget');
    
    if (!recentPostsWidget) return;
    
    const recentPosts = [...blogPosts]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5);
    
    const recentPostsHTML = recentPosts.map(post => `
        <a href="post.html?id=${post.id}" class="recent-post-item">
            <img src="../${post.image}" alt="${post.title}" class="recent-post-image" loading="lazy">
            <div class="recent-post-content">
                <h4 class="recent-post-title">${post.title}</h4>
                <span class="recent-post-date">${formatDate(post.date)}</span>
            </div>
        </a>
    `).join('');
    
    recentPostsWidget.innerHTML = recentPostsHTML;
}

// Render tags widget
function renderTagsWidget() {
    const tagsWidget = document.getElementById('tags-widget');
    
    if (!tagsWidget) return;
    
    // Collect all tags and count their frequency
    const tagCounts = {};
    blogPosts.forEach(post => {
        post.tags.forEach(tag => {
            tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });
    });
    
    // Sort tags by frequency and take top 10
    const popularTags = Object.entries(tagCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([tag]) => tag);
    
    const tagsHTML = popularTags.map(tag => `
        <a href="#" class="tag-item" onclick="searchByTag('${tag}')">${tag}</a>
    `).join('');
    
    tagsWidget.innerHTML = tagsHTML;
}

// Clear all filters
function clearFilters() {
    // Reset search
    const blogSearch = document.getElementById('blog-search');
    if (blogSearch) {
        blogSearch.value = '';
    }
    searchQuery = '';
    
    // Reset filter
    currentFilter = 'all';
    const allFilterBtn = document.querySelector('.filter-btn[data-filter="all"]');
    if (allFilterBtn) {
        setActiveFilter(allFilterBtn);
    }
    
    // Reset sort
    currentSort = 'newest';
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.value = 'newest';
    }
    
    // Reset page
    currentPage = 1;
    
    // Re-render
    filterPosts('all');
}

// Setup additional event listeners
function setupEventListeners() {
    // Handle browser back/forward buttons
    window.addEventListener('popstate', function(e) {
        if (e.state) {
            currentFilter = e.state.filter || 'all';
            currentPage = e.state.page || 1;
            searchQuery = e.state.search || '';
            
            // Update UI
            const filterBtn = document.querySelector(`.filter-btn[data-filter="${currentFilter}"]`);
            if (filterBtn) {
                setActiveFilter(filterBtn);
            }
            
            const blogSearch = document.getElementById('blog-search');
            if (blogSearch) {
                blogSearch.value = searchQuery;
            }
            
            // Re-render
            filterPosts(currentFilter);
        }
    });
    
    // Save state when filters change
    const originalFilterPosts = filterPosts;
    filterPosts = function(filter) {
        originalFilterPosts(filter);
        
        // Update URL state
        const state = {
            filter: currentFilter,
            page: currentPage,
            search: searchQuery
        };
        
        const url = new URL(window.location);
        if (currentFilter !== 'all') {
            url.searchParams.set('filter', currentFilter);
        } else {
            url.searchParams.delete('filter');
        }
        
        if (searchQuery) {
            url.searchParams.set('search', searchQuery);
        } else {
            url.searchParams.delete('search');
        }
        
        if (currentPage > 1) {
            url.searchParams.set('page', currentPage);
        } else {
            url.searchParams.delete('page');
        }
        
        history.pushState(state, '', url);
    };
    
    // Load initial state from URL
    const urlParams = new URLSearchParams(window.location.search);
    const initialFilter = urlParams.get('filter') || 'all';
    const initialSearch = urlParams.get('search') || '';
    const initialPage = parseInt(urlParams.get('page')) || 1;
    
    if (initialSearch) {
        const blogSearch = document.getElementById('blog-search');
        if (blogSearch) {
            blogSearch.value = initialSearch;
        }
        searchQuery = initialSearch;
    }
    
    if (initialFilter !== 'all') {
        const filterBtn = document.querySelector(`.filter-btn[data-filter="${initialFilter}"]`);
        if (filterBtn) {
            setActiveFilter(filterBtn);
        }
    }
    
    currentPage = initialPage;
    filterPosts(initialFilter);
}

// Utility function for debouncing
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

// Format date function (if not already defined in main.js)
if (typeof formatDate === 'undefined') {
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }
}

