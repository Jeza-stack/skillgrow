// ===== CMS JAVASCRIPT =====

// Global variables
let quillEditor;
let currentEditingPost = null;
let cmsData = {
    posts: [],
    settings: {
        siteTitle: 'SkillGrow',
        siteDescription: 'Empowering professionals to develop essential soft skills for career success and personal growth.',
        siteUrl: 'https://skillgrow.com'
    }
};

// Initialize CMS
document.addEventListener('DOMContentLoaded', function() {
    initializeCMS();
});

// Initialize CMS components
function initializeCMS() {
    loadCMSData();
    setupNavigation();
    setupQuillEditor();
    setupEventListeners();
    populateCategories();
    updateDashboard();
    loadPosts();
    loadCategories();
    loadMedia();
    showSection('dashboard');
}

// Load CMS data from localStorage
function loadCMSData() {
    const savedData = localStorage.getItem('skillgrow-cms-data');
    if (savedData) {
        try {
            const parsedData = JSON.parse(savedData);
            cmsData = { ...cmsData, ...parsedData };
        } catch (error) {
            console.error('Error loading CMS data:', error);
            showMessage('Error loading saved data. Starting fresh.', 'error');
        }
    } else {
        // Initialize with default blog posts if no data exists
        cmsData.posts = [...blogPosts.map(post => ({
            ...post,
            status: 'published',
            date: post.date || new Date().toISOString().split('T')[0]
        }))];
        saveCMSData();
    }
}

// Save CMS data to localStorage
function saveCMSData() {
    try {
        localStorage.setItem('skillgrow-cms-data', JSON.stringify(cmsData));
        return true;
    } catch (error) {
        console.error('Error saving CMS data:', error);
        showMessage('Error saving data. Storage might be full.', 'error');
        return false;
    }
}

// Setup navigation
function setupNavigation() {
    const navLinks = document.querySelectorAll('.cms-nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.dataset.section;
            showSection(section);
            
            // Update active nav
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Show section
function showSection(sectionName) {
    const sections = document.querySelectorAll('.cms-section');
    sections.forEach(section => section.classList.remove('active'));
    
    const targetSection = document.getElementById(`${sectionName}-section`);
    if (targetSection) {
        targetSection.classList.add('active');
        
        // Update navigation
        const navLinks = document.querySelectorAll('.cms-nav-link');
        navLinks.forEach(link => link.classList.remove('active'));
        const activeLink = document.querySelector(`[data-section="${sectionName}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
        
        // Refresh section-specific data
        switch (sectionName) {
            case 'dashboard':
                updateDashboard();
                break;
            case 'posts':
                loadPosts();
                break;
            case 'new-post':
                resetPostForm();
                break;
            case 'categories':
                loadCategories();
                break;
            case 'media':
                loadMedia();
                break;
        }
    }
}

// Setup Quill editor
function setupQuillEditor() {
    const toolbarOptions = [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'indent': '-1'}, { 'indent': '+1' }],
        ['link', 'image'],
        [{ 'align': [] }],
        ['blockquote', 'code-block'],
        ['clean']
    ];
    
    quillEditor = new Quill('#post-content-editor', {
        theme: 'snow',
        modules: {
            toolbar: toolbarOptions
        },
        placeholder: 'Write your blog post content here...'
    });
}

// Setup event listeners
function setupEventListeners() {
    // Post form events
    document.getElementById('post-title').addEventListener('input', generateSlug);
    document.getElementById('save-draft').addEventListener('click', () => savePost('draft'));
    document.getElementById('publish-post').addEventListener('click', () => savePost('published'));
    
    // Header actions
    document.getElementById('preview-site').addEventListener('click', previewSite);
    document.getElementById('save-all').addEventListener('click', saveAllData);
    
    // Media upload
    document.getElementById('upload-media').addEventListener('click', () => {
        document.getElementById('media-upload-input').click();
    });
    document.getElementById('media-upload-input').addEventListener('change', handleMediaUpload);
    
    // Import/Export
    document.getElementById('import-file-input').addEventListener('change', handleImportData);
    
    // Post filters
    document.getElementById('status-filter').addEventListener('change', filterPosts);
    document.getElementById('category-filter').addEventListener('change', filterPosts);
    document.getElementById('search-posts').addEventListener('input', filterPosts);
}

// Generate slug from title
function generateSlug() {
    const title = document.getElementById('post-title').value;
    const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
    document.getElementById('post-slug').value = slug;
}

// Populate categories dropdown
function populateCategories() {
    const categorySelects = document.querySelectorAll('#post-category, #category-filter');
    
    categorySelects.forEach(select => {
        // Clear existing options (except first one for post-category)
        if (select.id === 'post-category') {
            select.innerHTML = '<option value="">Select Category</option>';
        } else {
            select.innerHTML = '<option value="all">All Categories</option>';
        }
        
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.name;
            option.textContent = category.name;
            select.appendChild(option);
        });
    });
}

// Update dashboard
function updateDashboard() {
    const totalPosts = cmsData.posts.length;
    const publishedPosts = cmsData.posts.filter(post => post.status === 'published').length;
    const draftPosts = cmsData.posts.filter(post => post.status === 'draft').length;
    
    document.getElementById('total-posts').textContent = totalPosts;
    document.getElementById('published-posts').textContent = publishedPosts;
    document.getElementById('draft-posts').textContent = draftPosts;
    
    // Load recent posts
    loadRecentPosts();
}

// Load recent posts for dashboard
function loadRecentPosts() {
    const recentPostsContainer = document.getElementById('recent-posts');
    const recentPosts = cmsData.posts
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5);
    
    if (recentPosts.length === 0) {
        recentPostsContainer.innerHTML = '<p style="color: #64748b; text-align: center; padding: 2rem;">No posts yet. Create your first post!</p>';
        return;
    }
    
    recentPostsContainer.innerHTML = recentPosts.map(post => `
        <div class="recent-post">
            <div class="recent-post-info">
                <div class="recent-post-title">${post.title}</div>
                <div class="recent-post-meta">
                    ${post.category} • ${formatDate(post.date)} • ${post.status}
                </div>
            </div>
            <div class="recent-post-actions">
                <a href="#" class="action-link" onclick="editPost('${post.id}')">Edit</a>
                <a href="#" class="action-link" onclick="viewPost('${post.id}')">View</a>
            </div>
        </div>
    `).join('');
}

// Load posts table
function loadPosts() {
    const tableBody = document.getElementById('posts-table-body');
    
    if (cmsData.posts.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 2rem; color: #64748b;">No posts found. Create your first post!</td></tr>';
        return;
    }
    
    const sortedPosts = cmsData.posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    tableBody.innerHTML = sortedPosts.map(post => `
        <tr>
            <td>
                <div class="post-title">${post.title}</div>
                <div style="font-size: 12px; color: #64748b;">${post.excerpt || 'No excerpt'}</div>
            </td>
            <td>${post.category}</td>
            <td><span class="post-status ${post.status}">${post.status}</span></td>
            <td>${formatDate(post.date)}</td>
            <td>
                <div class="post-actions">
                    <a href="#" class="action-link" onclick="editPost('${post.id}')">Edit</a>
                    <a href="#" class="action-link" onclick="viewPost('${post.id}')">View</a>
                    <a href="#" class="action-link" onclick="duplicatePost('${post.id}')">Duplicate</a>
                    <a href="#" class="action-link danger" onclick="deletePost('${post.id}')">Delete</a>
                </div>
            </td>
        </tr>
    `).join('');
}

// Filter posts
function filterPosts() {
    const statusFilter = document.getElementById('status-filter').value;
    const categoryFilter = document.getElementById('category-filter').value;
    const searchTerm = document.getElementById('search-posts').value.toLowerCase();
    
    let filteredPosts = cmsData.posts;
    
    // Filter by status
    if (statusFilter !== 'all') {
        filteredPosts = filteredPosts.filter(post => post.status === statusFilter);
    }
    
    // Filter by category
    if (categoryFilter !== 'all') {
        filteredPosts = filteredPosts.filter(post => post.category === categoryFilter);
    }
    
    // Filter by search term
    if (searchTerm) {
        filteredPosts = filteredPosts.filter(post => 
            post.title.toLowerCase().includes(searchTerm) ||
            post.excerpt.toLowerCase().includes(searchTerm) ||
            post.author.toLowerCase().includes(searchTerm)
        );
    }
    
    // Update table
    const tableBody = document.getElementById('posts-table-body');
    
    if (filteredPosts.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 2rem; color: #64748b;">No posts match your filters.</td></tr>';
        return;
    }
    
    tableBody.innerHTML = filteredPosts.map(post => `
        <tr>
            <td>
                <div class="post-title">${post.title}</div>
                <div style="font-size: 12px; color: #64748b;">${post.excerpt || 'No excerpt'}</div>
            </td>
            <td>${post.category}</td>
            <td><span class="post-status ${post.status}">${post.status}</span></td>
            <td>${formatDate(post.date)}</td>
            <td>
                <div class="post-actions">
                    <a href="#" class="action-link" onclick="editPost('${post.id}')">Edit</a>
                    <a href="#" class="action-link" onclick="viewPost('${post.id}')">View</a>
                    <a href="#" class="action-link" onclick="duplicatePost('${post.id}')">Duplicate</a>
                    <a href="#" class="action-link danger" onclick="deletePost('${post.id}')">Delete</a>
                </div>
            </td>
        </tr>
    `).join('');
}

// Reset post form
function resetPostForm() {
    document.getElementById('post-form').reset();
    document.getElementById('post-form-title').textContent = 'Create New Post';
    document.getElementById('post-id').value = '';
    document.getElementById('post-date').value = '';
    quillEditor.setContents([]);
    currentEditingPost = null;
}

// Save post
function savePost(status) {
    const form = document.getElementById('post-form');
    const formData = new FormData(form);
    
    // Validate required fields
    if (!formData.get('title') || !formData.get('category')) {
        showMessage('Please fill in all required fields.', 'error');
        return;
    }
    
    const content = quillEditor.root.innerHTML;
    if (!content || content === '<p><br></p>') {
        showMessage('Please add some content to your post.', 'error');
        return;
    }
    
    // Create post object
    const post = {
        id: formData.get('id') || generateId(),
        title: formData.get('title'),
        slug: formData.get('slug') || generateSlugFromTitle(formData.get('title')),
        category: formData.get('category'),
        author: formData.get('author') || 'SkillGrow Team',
        excerpt: formData.get('excerpt') || generateExcerpt(content),
        content: content,
        image: formData.get('image') || 'assets/images/hero-bg.jpg',
        tags: formData.get('tags') ? formData.get('tags').split(',').map(tag => tag.trim()) : [],
        featured: formData.get('featured') === 'on',
        status: status,
        date: formData.get('date') || new Date().toISOString().split('T')[0],
        readTime: calculateReadingTime(content)
    };
    
    // Save or update post
    const existingIndex = cmsData.posts.findIndex(p => p.id === post.id);
    if (existingIndex !== -1) {
        cmsData.posts[existingIndex] = post;
        showMessage('Post updated successfully!', 'success');
    } else {
        cmsData.posts.push(post);
        showMessage('Post created successfully!', 'success');
    }
    
    // Save to localStorage
    if (saveCMSData()) {
        updateDashboard();
        
        // If published, also update the main blog data
        if (status === 'published') {
            updateMainBlogData();
        }
        
        // Redirect to posts list
        setTimeout(() => {
            showSection('posts');
        }, 1500);
    }
}

// Edit post
function editPost(postId) {
    const post = cmsData.posts.find(p => p.id === postId);
    if (!post) {
        showMessage('Post not found.', 'error');
        return;
    }
    
    currentEditingPost = post;
    
    // Populate form
    document.getElementById('post-id').value = post.id;
    document.getElementById('post-title').value = post.title;
    document.getElementById('post-slug').value = post.slug;
    document.getElementById('post-category').value = post.category;
    document.getElementById('post-author').value = post.author;
    document.getElementById('post-excerpt').value = post.excerpt;
    document.getElementById('post-image').value = post.image;
    document.getElementById('post-tags').value = post.tags.join(', ');
    document.getElementById('post-featured').checked = post.featured;
    document.getElementById('post-status').value = post.status;
    document.getElementById('post-date').value = post.date;
    
    // Set editor content
    quillEditor.root.innerHTML = post.content;
    
    // Update form title
    document.getElementById('post-form-title').textContent = 'Edit Post';
    
    // Show new post section
    showSection('new-post');
}

// View post
function viewPost(postId) {
    const post = cmsData.posts.find(p => p.id === postId);
    if (!post) {
        showMessage('Post not found.', 'error');
        return;
    }
    
    // Open post in new tab
    const postUrl = `../pages/post.html?id=${postId}`;
    window.open(postUrl, '_blank');
}

// Duplicate post
function duplicatePost(postId) {
    const post = cmsData.posts.find(p => p.id === postId);
    if (!post) {
        showMessage('Post not found.', 'error');
        return;
    }
    
    const duplicatedPost = {
        ...post,
        id: generateId(),
        title: post.title + ' (Copy)',
        slug: post.slug + '-copy',
        status: 'draft',
        date: new Date().toISOString().split('T')[0]
    };
    
    cmsData.posts.push(duplicatedPost);
    
    if (saveCMSData()) {
        showMessage('Post duplicated successfully!', 'success');
        loadPosts();
        updateDashboard();
    }
}

// Delete post
function deletePost(postId) {
    const post = cmsData.posts.find(p => p.id === postId);
    if (!post) {
        showMessage('Post not found.', 'error');
        return;
    }
    
    showConfirmModal(
        `Are you sure you want to delete "${post.title}"? This action cannot be undone.`,
        () => {
            cmsData.posts = cmsData.posts.filter(p => p.id !== postId);
            
            if (saveCMSData()) {
                showMessage('Post deleted successfully!', 'success');
                loadPosts();
                updateDashboard();
                updateMainBlogData();
            }
        }
    );
}

// Load categories
function loadCategories() {
    const categoriesGrid = document.getElementById('categories-grid');
    
    categoriesGrid.innerHTML = categories.map(category => {
        const postCount = cmsData.posts.filter(post => post.category === category.name).length;
        
        return `
            <div class="category-card">
                <div class="category-icon" style="background-color: ${category.color}">
                    <i class="${category.icon}"></i>
                </div>
                <div class="category-name">${category.name}</div>
                <div class="category-description">${category.description}</div>
                <div class="category-count">${postCount} posts</div>
            </div>
        `;
    }).join('');
}

// Load media
function loadMedia() {
    const mediaGrid = document.getElementById('media-grid');
    
    // For now, show default images
    const defaultImages = [
        'assets/images/logo.png',
        'assets/images/hero-bg.jpg',
        'assets/images/communication-skills.jpg',
        'assets/images/leadership.jpg',
        'assets/images/emotional-intelligence.jpg',
        'assets/images/time-management.jpg',
        'assets/images/teamwork.jpg',
        'assets/images/author-avatar.jpg'
    ];
    
    mediaGrid.innerHTML = defaultImages.map(image => `
        <div class="media-item">
            <img src="../${image}" alt="Media" class="media-preview" onerror="this.style.display='none'">
            <div class="media-info">
                <div class="media-name">${image.split('/').pop()}</div>
                <div class="media-size">Image</div>
            </div>
        </div>
    `).join('');
}

// Handle media upload
function handleMediaUpload(event) {
    const files = event.target.files;
    
    for (let file of files) {
        if (file.type.startsWith('image/')) {
            // In a real implementation, you would upload to a server
            // For now, just show a message
            showMessage(`Media upload simulated: ${file.name}`, 'info');
        }
    }
    
    // Reset input
    event.target.value = '';
}

// Preview site
function previewSite() {
    window.open('../index.html', '_blank');
}

// Save all data
function saveAllData() {
    if (saveCMSData()) {
        updateMainBlogData();
        showMessage('All data saved successfully!', 'success');
    }
}

// Update main blog data
function updateMainBlogData() {
    // Update the main blog-data.js file with published posts
    const publishedPosts = cmsData.posts.filter(post => post.status === 'published');
    
    // In a real implementation, you would send this to a server
    // For now, we'll update localStorage that the main site can read
    localStorage.setItem('skillgrow-published-posts', JSON.stringify(publishedPosts));
}

// Export data
function exportData() {
    const dataToExport = {
        posts: cmsData.posts,
        settings: cmsData.settings,
        exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `skillgrow-cms-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showMessage('Data exported successfully!', 'success');
}

// Import data
function importData() {
    document.getElementById('import-file-input').click();
}

// Handle import data
function handleImportData(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const importedData = JSON.parse(e.target.result);
            
            if (importedData.posts && Array.isArray(importedData.posts)) {
                showConfirmModal(
                    'This will replace all existing data. Are you sure you want to continue?',
                    () => {
                        cmsData.posts = importedData.posts;
                        if (importedData.settings) {
                            cmsData.settings = { ...cmsData.settings, ...importedData.settings };
                        }
                        
                        if (saveCMSData()) {
                            showMessage('Data imported successfully!', 'success');
                            updateDashboard();
                            loadPosts();
                            loadCategories();
                        }
                    }
                );
            } else {
                showMessage('Invalid file format. Please select a valid export file.', 'error');
            }
        } catch (error) {
            showMessage('Error reading file. Please check the file format.', 'error');
        }
    };
    
    reader.readAsText(file);
    event.target.value = '';
}

// Clear all data
function clearAllData() {
    showConfirmModal(
        'This will permanently delete all posts and data. This action cannot be undone. Are you sure?',
        () => {
            cmsData.posts = [];
            localStorage.removeItem('skillgrow-cms-data');
            localStorage.removeItem('skillgrow-published-posts');
            
            showMessage('All data cleared successfully!', 'success');
            updateDashboard();
            loadPosts();
            loadCategories();
        }
    );
}

// Utility functions
function generateId() {
    return 'post-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
}

function generateSlugFromTitle(title) {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

function generateExcerpt(content, length = 150) {
    const text = content.replace(/<[^>]*>/g, ''); // Remove HTML tags
    return text.length > length ? text.substring(0, length) + '...' : text;
}

function calculateReadingTime(content) {
    const wordsPerMinute = 200;
    const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
}

// UI Helper functions
function showMessage(message, type = 'info') {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.message');
    existingMessages.forEach(msg => msg.remove());
    
    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    
    // Insert at top of content area
    const contentArea = document.querySelector('.cms-content');
    contentArea.insertBefore(messageDiv, contentArea.firstChild);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

function showConfirmModal(message, onConfirm) {
    const modal = document.getElementById('confirm-modal');
    const messageElement = document.getElementById('confirm-message');
    const confirmButton = document.getElementById('confirm-action');
    
    messageElement.textContent = message;
    modal.classList.add('active');
    
    // Remove existing listeners
    const newConfirmButton = confirmButton.cloneNode(true);
    confirmButton.parentNode.replaceChild(newConfirmButton, confirmButton);
    
    // Add new listener
    newConfirmButton.addEventListener('click', function() {
        onConfirm();
        closeModal('confirm-modal');
    });
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('active');
}

// Global functions for onclick handlers
window.showSection = showSection;
window.editPost = editPost;
window.viewPost = viewPost;
window.duplicatePost = duplicatePost;
window.deletePost = deletePost;
window.exportData = exportData;
window.importData = importData;
window.clearAllData = clearAllData;
window.closeModal = closeModal;

