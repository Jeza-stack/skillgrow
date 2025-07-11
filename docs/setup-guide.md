# SkillGrow Setup Guide

This comprehensive guide will walk you through setting up your SkillGrow soft skills blog website, from initial installation to deployment.

## Table of Contents

1. [System Requirements](#system-requirements)
2. [Installation](#installation)
3. [Initial Configuration](#initial-configuration)
4. [Content Setup](#content-setup)
5. [Customization](#customization)
6. [Testing](#testing)
7. [Deployment Options](#deployment-options)
8. [Post-Deployment Setup](#post-deployment-setup)

## System Requirements

### Minimum Requirements
- **Web Browser**: Chrome 80+, Firefox 75+, Safari 13+, or Edge 80+
- **Text Editor**: Any code editor (VS Code, Sublime Text, Notepad++, etc.)
- **Local Storage**: 5-10MB available browser storage for CMS data

### Recommended Tools
- **Code Editor**: Visual Studio Code with Live Server extension
- **Image Editor**: For customizing images (Photoshop, GIMP, Canva, etc.)
- **FTP Client**: For traditional hosting deployment (FileZilla, WinSCP, etc.)

### No Server Required
This is a static website that runs entirely in the browser. No database, server-side language, or hosting with special requirements needed.

## Installation

### Option 1: Download and Extract
1. Download the website files as a ZIP archive
2. Extract to your desired location (e.g., `C:\websites\skillgrow\` or `~/websites/skillgrow/`)
3. Ensure all files maintain their folder structure

### Option 2: Clone Repository (if using Git)
```bash
git clone [repository-url] skillgrow-blog
cd skillgrow-blog
```

### Verify Installation
After extraction/cloning, your folder structure should look like this:

```
soft-skills-blog/
├── index.html
├── assets/
├── css/
├── js/
├── pages/
├── admin/
├── docs/
└── README.md
```

## Initial Configuration

### 1. Test Local Setup
1. Open your file manager and navigate to the website folder
2. Double-click `index.html` to open in your default browser
3. Verify the homepage loads correctly with images and styling
4. Test navigation by clicking menu items

### 2. Access the CMS
1. Navigate to the `admin` folder
2. Open `admin/index.html` in your browser
3. You should see the SkillGrow CMS dashboard
4. The CMS will automatically load with sample blog posts

### 3. Browser Compatibility Check
Test the website in multiple browsers:
- Chrome/Chromium
- Firefox
- Safari (if on Mac)
- Edge

## Content Setup

### 1. Review Default Content
The website comes with 6 sample blog posts covering various soft skills topics:
- Effective Communication in the Workplace
- Building Leadership Skills
- Emotional Intelligence at Work
- Time Management Strategies
- The Power of Teamwork
- Problem-Solving Techniques

### 2. CMS First Steps
1. Open `admin/index.html`
2. Explore the dashboard to understand the interface
3. Click on "Blog Posts" to see existing content
4. Try editing a post to familiarize yourself with the editor

### 3. Create Your First Post
1. Click "New Post" in the CMS
2. Fill in the title, category, and content
3. Save as draft first to test the system
4. Publish when ready

## Customization

### 1. Basic Branding
**Update Site Information:**
1. Open CMS → Settings
2. Update site title, description, and URL
3. Save changes

**Replace Logo:**
1. Create your logo as PNG (recommended: 200x200px)
2. Replace `assets/images/logo.png`
3. Ensure the filename stays the same, or update references in HTML

### 2. Color Scheme
Edit `css/main.css` and modify the CSS custom properties:

```css
:root {
    /* Primary Colors */
    --primary-blue: #2563EB;    /* Main brand color */
    --primary-teal: #0891B2;    /* Secondary brand color */
    --accent-orange: #F59E0B;   /* Accent color */
    
    /* Neutral Colors */
    --charcoal: #1e293b;        /* Dark text */
    --warm-gray: #64748b;       /* Medium text */
    --light-gray: #f1f5f9;      /* Light backgrounds */
    --warm-white: #fefefe;      /* Off-white */
    --white: #ffffff;           /* Pure white */
    
    /* Semantic Colors */
    --success-green: #10b981;   /* Success messages */
    --error-red: #ef4444;       /* Error messages */
    --warning-yellow: #f59e0b;  /* Warning messages */
}
```

### 3. Typography
To change fonts, update the Google Fonts import in HTML files:

```html
<!-- In the <head> section -->
<link href="https://fonts.googleapis.com/css2?family=YourFont:wght@400;500;600;700&display=swap" rel="stylesheet">
```

Then update the CSS:
```css
:root {
    --font-primary: 'YourFont', sans-serif;
    --font-secondary: 'YourSecondaryFont', serif;
}
```

### 4. Images and Media
**Replace Default Images:**
1. Navigate to `assets/images/`
2. Replace images with your own (maintain similar dimensions)
3. Update image references if you change filenames

**Recommended Image Sizes:**
- Logo: 200x200px (PNG with transparency)
- Hero background: 1920x1080px
- Blog featured images: 800x400px
- Author avatars: 300x300px

## Testing

### 1. Functionality Testing
**Navigation:**
- [ ] All menu items work
- [ ] Mobile hamburger menu functions
- [ ] Breadcrumbs display correctly

**Blog Features:**
- [ ] Blog listing page loads
- [ ] Individual posts display properly
- [ ] Category filtering works
- [ ] Search functionality operates
- [ ] Pagination functions (if applicable)

**Forms:**
- [ ] Contact form validation works
- [ ] Newsletter signup functions
- [ ] Form submission feedback displays

**CMS Testing:**
- [ ] Can create new posts
- [ ] Can edit existing posts
- [ ] Can delete posts
- [ ] Draft/publish system works
- [ ] Data persists after browser refresh

### 2. Responsive Testing
Test on various screen sizes:
- [ ] Desktop (1920x1080, 1366x768)
- [ ] Tablet (768x1024, 1024x768)
- [ ] Mobile (375x667, 414x896)

### 3. Performance Testing
- [ ] Pages load quickly (under 3 seconds)
- [ ] Images are optimized
- [ ] No console errors in browser developer tools
- [ ] Smooth animations and interactions

## Deployment Options

### Option 1: GitHub Pages (Free)
1. Create a GitHub account if you don't have one
2. Create a new repository
3. Upload your website files
4. Go to repository Settings → Pages
5. Select source branch (usually `main`)
6. Your site will be available at `https://username.github.io/repository-name`

**Pros:** Free, automatic HTTPS, easy updates
**Cons:** Public repositories only (for free accounts)

### Option 2: Netlify (Free Tier Available)
1. Create a Netlify account
2. Drag and drop your website folder to Netlify
3. Get instant deployment with custom domain options
4. Automatic HTTPS and CDN

**Pros:** Easy deployment, great performance, form handling
**Cons:** Limited build minutes on free tier

### Option 3: Vercel (Free Tier Available)
1. Create a Vercel account
2. Import your project from GitHub or upload directly
3. Automatic deployment and optimization
4. Custom domain support

**Pros:** Excellent performance, automatic optimization
**Cons:** Primarily designed for React/Next.js (but works with static sites)

### Option 4: Traditional Web Hosting
1. Purchase hosting from any provider (Bluehost, SiteGround, etc.)
2. Use FTP client to upload files to public_html or www folder
3. Ensure all files maintain their folder structure
4. Test the live site

**Pros:** Full control, can use custom domains easily
**Cons:** Costs money, requires more technical knowledge

### Option 5: Local Development Server
For development and testing:

**Using Python:**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**Using Node.js:**
```bash
npx http-server
```

**Using VS Code Live Server:**
1. Install Live Server extension
2. Right-click `index.html`
3. Select "Open with Live Server"

## Post-Deployment Setup

### 1. Domain Configuration
If using a custom domain:
1. Update DNS settings to point to your hosting provider
2. Configure SSL certificate (most hosts provide free SSL)
3. Update site URL in CMS settings

### 2. Analytics Setup
To add Google Analytics:
1. Create a Google Analytics account
2. Get your tracking ID
3. Add the tracking code to all HTML files before `</head>`

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### 3. SEO Configuration
1. Update meta descriptions in each HTML file
2. Submit sitemap to Google Search Console
3. Verify social media sharing works correctly
4. Test structured data with Google's Rich Results Test

### 4. Performance Optimization
**Image Optimization:**
- Compress images using tools like TinyPNG
- Consider WebP format for better compression
- Implement lazy loading for better performance

**Caching:**
- Configure browser caching headers (if using traditional hosting)
- Use CDN for better global performance
- Minify CSS and JavaScript files

### 5. Security Considerations
**For Traditional Hosting:**
- Keep hosting software updated
- Use strong passwords
- Enable HTTPS
- Regular backups

**For Static Hosting:**
- Most security is handled by the platform
- Ensure your deployment process is secure
- Regular content backups

## Backup and Maintenance

### 1. Content Backup
**CMS Data:**
1. Open CMS → Settings
2. Click "Export All Data"
3. Save the JSON file securely
4. Schedule regular exports

**Website Files:**
- Keep a local copy of all website files
- Use version control (Git) for tracking changes
- Regular backups to cloud storage

### 2. Updates and Maintenance
**Regular Tasks:**
- Update content regularly
- Check for broken links
- Monitor site performance
- Review analytics data
- Update contact information as needed

**Technical Maintenance:**
- Test website functionality monthly
- Update any external dependencies
- Monitor browser compatibility
- Check mobile responsiveness

## Troubleshooting Common Issues

### Website Won't Load
1. Check file paths are correct
2. Ensure all files are uploaded
3. Verify folder structure is maintained
4. Check browser console for errors

### CMS Not Working
1. Ensure JavaScript is enabled in browser
2. Check browser compatibility
3. Clear browser cache and cookies
4. Try in incognito/private mode

### Images Not Displaying
1. Verify image file paths
2. Check image file formats (use JPG, PNG, WebP)
3. Ensure images are uploaded to correct folder
4. Check file permissions (for traditional hosting)

### Mobile Display Issues
1. Test on actual devices, not just browser resize
2. Check viewport meta tag is present
3. Verify responsive CSS is loading
4. Test touch interactions

## Next Steps

After successful setup:

1. **Content Strategy**: Plan your blog content calendar
2. **SEO Optimization**: Research keywords for your niche
3. **Social Media**: Set up social media accounts and sharing
4. **Email Marketing**: Integrate with email service provider
5. **Community Building**: Engage with your audience
6. **Analytics**: Monitor performance and user behavior

## Support Resources

- **Documentation**: Check other files in the `docs/` folder
- **Browser Developer Tools**: Use F12 to debug issues
- **Online Communities**: Web development forums and communities
- **Hosting Support**: Contact your hosting provider for server-related issues

---

**Congratulations!** You now have a fully functional soft skills blog website. Start creating valuable content and building your audience!

