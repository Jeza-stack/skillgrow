// ===== SEO OPTIMIZATION UTILITIES =====

// SEO Configuration
const seoConfig = {
    siteName: 'SkillGrow',
    siteUrl: 'https://skillgrow.com', // Update with actual domain
    defaultTitle: 'SkillGrow - Develop Essential Soft Skills for Career Success',
    defaultDescription: 'Empower your professional growth with practical soft skills insights. Learn communication, leadership, emotional intelligence, and more.',
    defaultImage: 'assets/images/hero-bg.jpg',
    twitterHandle: '@skillgrow',
    facebookAppId: '', // Add if available
    author: 'SkillGrow Team',
    language: 'en',
    locale: 'en_US'
};

// Initialize SEO for all pages
document.addEventListener('DOMContentLoaded', function() {
    initializeSEO();
});

// Initialize SEO optimizations
function initializeSEO() {
    setupBasicSEO();
    setupStructuredData();
    setupSocialSharing();
    setupAnalytics();
    setupPerformanceOptimizations();
}

// Setup basic SEO meta tags
function setupBasicSEO() {
    // Ensure viewport meta tag exists
    if (!document.querySelector('meta[name="viewport"]')) {
        addMetaTag('name', 'viewport', 'width=device-width, initial-scale=1.0');
    }
    
    // Add robots meta tag
    if (!document.querySelector('meta[name="robots"]')) {
        addMetaTag('name', 'robots', 'index, follow');
    }
    
    // Add language meta tag
    if (!document.querySelector('meta[http-equiv="content-language"]')) {
        addMetaTag('http-equiv', 'content-language', seoConfig.language);
    }
    
    // Add canonical URL
    addCanonicalURL();
    
    // Add favicon if not exists
    if (!document.querySelector('link[rel="icon"]')) {
        addLinkTag('icon', 'image/png', 'assets/images/logo.png');
    }
    
    // Add Apple touch icon
    if (!document.querySelector('link[rel="apple-touch-icon"]')) {
        addLinkTag('apple-touch-icon', null, 'assets/images/logo.png');
    }
}

// Setup structured data (JSON-LD)
function setupStructuredData() {
    const currentPage = getCurrentPageType();
    
    switch (currentPage.type) {
        case 'home':
            addWebsiteStructuredData();
            addOrganizationStructuredData();
            break;
        case 'blog':
            addBlogStructuredData();
            break;
        case 'post':
            addArticleStructuredData(currentPage.data);
            break;
        case 'about':
            addAboutPageStructuredData();
            break;
        case 'contact':
            addContactPageStructuredData();
            break;
        default:
            addWebPageStructuredData();
    }
}

// Add website structured data
function addWebsiteStructuredData() {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": seoConfig.siteName,
        "url": seoConfig.siteUrl,
        "description": seoConfig.defaultDescription,
        "potentialAction": {
            "@type": "SearchAction",
            "target": {
                "@type": "EntryPoint",
                "urlTemplate": `${seoConfig.siteUrl}/pages/blog.html?search={search_term_string}`
            },
            "query-input": "required name=search_term_string"
        }
    };
    
    addStructuredDataScript(structuredData);
}

// Add organization structured data
function addOrganizationStructuredData() {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": seoConfig.siteName,
        "url": seoConfig.siteUrl,
        "logo": `${seoConfig.siteUrl}/assets/images/logo.png`,
        "description": seoConfig.defaultDescription,
        "sameAs": [
            "https://twitter.com/skillgrow",
            "https://linkedin.com/company/skillgrow",
            "https://facebook.com/skillgrow"
        ],
        "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer service",
            "email": "hello@skillgrow.com"
        }
    };
    
    addStructuredDataScript(structuredData);
}

// Add blog structured data
function addBlogStructuredData() {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Blog",
        "name": `${seoConfig.siteName} Blog`,
        "description": "Professional development insights and soft skills training articles",
        "url": `${seoConfig.siteUrl}/pages/blog.html`,
        "publisher": {
            "@type": "Organization",
            "name": seoConfig.siteName,
            "logo": `${seoConfig.siteUrl}/assets/images/logo.png`
        }
    };
    
    addStructuredDataScript(structuredData);
}

// Add article structured data
function addArticleStructuredData(postData) {
    if (!postData) return;
    
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": postData.title,
        "description": postData.excerpt,
        "image": `${seoConfig.siteUrl}/${postData.image}`,
        "author": {
            "@type": "Person",
            "name": postData.author
        },
        "publisher": {
            "@type": "Organization",
            "name": seoConfig.siteName,
            "logo": {
                "@type": "ImageObject",
                "url": `${seoConfig.siteUrl}/assets/images/logo.png`
            }
        },
        "datePublished": postData.date,
        "dateModified": postData.date,
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": window.location.href
        },
        "keywords": postData.tags.join(', '),
        "articleSection": postData.category,
        "wordCount": postData.content.split(/\s+/).length,
        "timeRequired": postData.readTime
    };
    
    addStructuredDataScript(structuredData);
}

// Add about page structured data
function addAboutPageStructuredData() {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "name": "About SkillGrow",
        "description": "Learn about SkillGrow's mission to empower professionals with essential soft skills",
        "url": `${seoConfig.siteUrl}/pages/about.html`,
        "mainEntity": {
            "@type": "Organization",
            "name": seoConfig.siteName,
            "description": seoConfig.defaultDescription
        }
    };
    
    addStructuredDataScript(structuredData);
}

// Add contact page structured data
function addContactPageStructuredData() {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": "Contact SkillGrow",
        "description": "Get in touch with the SkillGrow team",
        "url": `${seoConfig.siteUrl}/pages/contact.html`
    };
    
    addStructuredDataScript(structuredData);
}

// Add webpage structured data (fallback)
function addWebPageStructuredData() {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": document.title,
        "description": getMetaContent('description') || seoConfig.defaultDescription,
        "url": window.location.href
    };
    
    addStructuredDataScript(structuredData);
}

// Setup social sharing optimization
function setupSocialSharing() {
    // Open Graph tags
    updateOpenGraphTags();
    
    // Twitter Card tags
    updateTwitterCardTags();
    
    // Facebook specific tags
    updateFacebookTags();
}

// Update Open Graph tags
function updateOpenGraphTags() {
    const currentPage = getCurrentPageType();
    const title = document.title || seoConfig.defaultTitle;
    const description = getMetaContent('description') || seoConfig.defaultDescription;
    const image = getPageImage(currentPage);
    const url = window.location.href;
    
    updateMetaProperty('og:type', getOGType(currentPage.type));
    updateMetaProperty('og:title', title);
    updateMetaProperty('og:description', description);
    updateMetaProperty('og:image', `${seoConfig.siteUrl}/${image}`);
    updateMetaProperty('og:url', url);
    updateMetaProperty('og:site_name', seoConfig.siteName);
    updateMetaProperty('og:locale', seoConfig.locale);
}

// Update Twitter Card tags
function updateTwitterCardTags() {
    const currentPage = getCurrentPageType();
    const title = document.title || seoConfig.defaultTitle;
    const description = getMetaContent('description') || seoConfig.defaultDescription;
    const image = getPageImage(currentPage);
    
    updateMetaName('twitter:card', 'summary_large_image');
    updateMetaName('twitter:site', seoConfig.twitterHandle);
    updateMetaName('twitter:title', title);
    updateMetaName('twitter:description', description);
    updateMetaName('twitter:image', `${seoConfig.siteUrl}/${image}`);
}

// Update Facebook tags
function updateFacebookTags() {
    if (seoConfig.facebookAppId) {
        updateMetaProperty('fb:app_id', seoConfig.facebookAppId);
    }
}

// Setup analytics (placeholder for Google Analytics, etc.)
function setupAnalytics() {
    // Google Analytics 4 (placeholder)
    if (typeof gtag !== 'undefined') {
        // Track page view
        gtag('config', 'GA_MEASUREMENT_ID', {
            page_title: document.title,
            page_location: window.location.href
        });
    }
    
    // Track scroll depth
    trackScrollDepth();
    
    // Track time on page
    trackTimeOnPage();
}

// Setup performance optimizations
function setupPerformanceOptimizations() {
    // Preload critical resources
    preloadCriticalResources();
    
    // Lazy load images
    setupLazyLoading();
    
    // Optimize web fonts
    optimizeWebFonts();
    
    // Add resource hints
    addResourceHints();
}

// Preload critical resources
function preloadCriticalResources() {
    // Preload critical CSS
    addLinkTag('preload', 'text/css', 'css/main.css', null, 'style');
    
    // Preload critical fonts
    addLinkTag('preload', 'font/woff2', 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2', 'anonymous', 'font');
}

// Setup lazy loading for images
function setupLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Optimize web fonts
function optimizeWebFonts() {
    // Add font-display: swap to improve loading performance
    const style = document.createElement('style');
    style.textContent = `
        @font-face {
            font-family: 'Inter';
            font-display: swap;
        }
        @font-face {
            font-family: 'Merriweather';
            font-display: swap;
        }
    `;
    document.head.appendChild(style);
}

// Add resource hints
function addResourceHints() {
    // DNS prefetch for external domains
    addLinkTag('dns-prefetch', null, 'https://fonts.googleapis.com');
    addLinkTag('dns-prefetch', null, 'https://fonts.gstatic.com');
    addLinkTag('dns-prefetch', null, 'https://cdnjs.cloudflare.com');
    
    // Preconnect to critical domains
    addLinkTag('preconnect', null, 'https://fonts.googleapis.com');
    addLinkTag('preconnect', null, 'https://fonts.gstatic.com', 'anonymous');
}

// Track scroll depth
function trackScrollDepth() {
    let maxScroll = 0;
    const milestones = [25, 50, 75, 100];
    const tracked = new Set();
    
    window.addEventListener('scroll', function() {
        const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        maxScroll = Math.max(maxScroll, scrollPercent);
        
        milestones.forEach(milestone => {
            if (maxScroll >= milestone && !tracked.has(milestone)) {
                tracked.add(milestone);
                
                // Track with analytics
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'scroll', {
                        event_category: 'engagement',
                        event_label: `${milestone}%`,
                        value: milestone
                    });
                }
            }
        });
    });
}

// Track time on page
function trackTimeOnPage() {
    const startTime = Date.now();
    
    // Track when user leaves page
    window.addEventListener('beforeunload', function() {
        const timeOnPage = Math.round((Date.now() - startTime) / 1000);
        
        if (typeof gtag !== 'undefined') {
            gtag('event', 'timing_complete', {
                name: 'time_on_page',
                value: timeOnPage
            });
        }
    });
}

// Utility functions
function getCurrentPageType() {
    const path = window.location.pathname;
    const search = window.location.search;
    
    if (path.includes('index.html') || path === '/') {
        return { type: 'home' };
    } else if (path.includes('blog.html')) {
        return { type: 'blog' };
    } else if (path.includes('post.html')) {
        const postId = new URLSearchParams(search).get('id');
        const postData = typeof getPostById !== 'undefined' ? getPostById(postId) : null;
        return { type: 'post', data: postData };
    } else if (path.includes('about.html')) {
        return { type: 'about' };
    } else if (path.includes('contact.html')) {
        return { type: 'contact' };
    } else if (path.includes('category.html')) {
        return { type: 'category' };
    }
    
    return { type: 'page' };
}

function getOGType(pageType) {
    switch (pageType) {
        case 'post':
            return 'article';
        case 'home':
            return 'website';
        default:
            return 'website';
    }
}

function getPageImage(currentPage) {
    if (currentPage.type === 'post' && currentPage.data) {
        return currentPage.data.image;
    }
    return seoConfig.defaultImage;
}

function addMetaTag(attribute, name, content) {
    const meta = document.createElement('meta');
    meta.setAttribute(attribute, name);
    meta.content = content;
    document.head.appendChild(meta);
}

function addLinkTag(rel, type, href, crossorigin = null, as = null) {
    const link = document.createElement('link');
    link.rel = rel;
    if (type) link.type = type;
    link.href = href;
    if (crossorigin) link.crossOrigin = crossorigin;
    if (as) link.as = as;
    document.head.appendChild(link);
}

function addCanonicalURL() {
    if (!document.querySelector('link[rel="canonical"]')) {
        const canonical = document.createElement('link');
        canonical.rel = 'canonical';
        canonical.href = window.location.href.split('?')[0]; // Remove query parameters
        document.head.appendChild(canonical);
    }
}

function addStructuredDataScript(data) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
}

function updateMetaProperty(property, content) {
    let meta = document.querySelector(`meta[property="${property}"]`);
    if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
    }
    meta.content = content;
}

function updateMetaName(name, content) {
    let meta = document.querySelector(`meta[name="${name}"]`);
    if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', name);
        document.head.appendChild(meta);
    }
    meta.content = content;
}

function getMetaContent(name) {
    const meta = document.querySelector(`meta[name="${name}"]`);
    return meta ? meta.content : null;
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        seoConfig,
        initializeSEO,
        setupBasicSEO,
        setupStructuredData,
        setupSocialSharing
    };
}

