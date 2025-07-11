# SkillGrow CMS User Guide

Welcome to the SkillGrow Content Management System! This guide will help you master the CMS and create engaging blog content efficiently.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Dashboard Overview](#dashboard-overview)
3. [Managing Blog Posts](#managing-blog-posts)
4. [Using the Rich Text Editor](#using-the-rich-text-editor)
5. [Categories and Tags](#categories-and-tags)
6. [Media Management](#media-management)
7. [Settings and Configuration](#settings-and-configuration)
8. [Data Management](#data-management)
9. [Best Practices](#best-practices)
10. [Troubleshooting](#troubleshooting)

## Getting Started

### Accessing the CMS
1. Navigate to your website folder
2. Open the `admin` folder
3. Double-click `index.html` or open it in your web browser
4. The CMS dashboard will load automatically

### First Login
- No login required - the CMS runs locally in your browser
- All data is stored in your browser's local storage
- Your content is automatically saved as you work

### System Requirements
- Modern web browser (Chrome, Firefox, Safari, Edge)
- JavaScript enabled
- Local storage available (5-10MB space)

## Dashboard Overview

### Main Navigation
The sidebar contains six main sections:

**Dashboard** 📊
- Overview of your blog statistics
- Recent posts summary
- Quick action buttons

**Blog Posts** 📝
- View all your blog posts
- Filter and search posts
- Manage existing content

**New Post** ➕
- Create new blog posts
- Rich text editor interface
- Publishing controls

**Categories** 🏷️
- View all blog categories
- See post counts per category
- Category management

**Media** 🖼️
- Media library overview
- Upload and manage images
- File organization

**Settings** ⚙️
- Site configuration
- Data import/export
- System information

### Dashboard Statistics
The dashboard shows four key metrics:
- **Total Posts**: All posts in your system
- **Published**: Posts visible on your website
- **Drafts**: Unpublished posts in progress
- **Categories**: Number of content categories

### Quick Actions
- **Create New Post**: Jump directly to the post editor
- **Manage Posts**: View and edit existing posts
- **Export Data**: Download your content as backup
- **Import Data**: Restore content from backup

## Managing Blog Posts

### Viewing All Posts
1. Click "Blog Posts" in the sidebar
2. See all posts in a table format with:
   - Title and excerpt
   - Category assignment
   - Publication status
   - Creation date
   - Action buttons

### Post Filters
Use the filter options to find specific content:

**Status Filter:**
- All Posts
- Published only
- Drafts only

**Category Filter:**
- All Categories
- Specific category selection

**Search:**
- Search by title, excerpt, or author
- Real-time filtering as you type

### Post Actions
Each post has several action options:

**Edit** ✏️
- Modify post content and settings
- Update publication status
- Save changes

**View** 👁️
- Preview post on the live website
- Opens in new browser tab
- See how visitors will see your content

**Duplicate** 📋
- Create a copy of existing post
- Useful for similar content or templates
- Copy is created as draft

**Delete** 🗑️
- Permanently remove post
- Confirmation required
- Cannot be undone

## Using the Rich Text Editor

### Editor Interface
The post editor uses Quill.js for rich text editing:

**Toolbar Options:**
- Headers (H1, H2, H3)
- Text formatting (bold, italic, underline, strikethrough)
- Lists (ordered and unordered)
- Indentation controls
- Links and images
- Text alignment
- Blockquotes and code blocks
- Clear formatting

### Creating a New Post

#### 1. Basic Information
**Title** (Required)
- Main headline for your post
- Automatically generates URL slug
- Keep concise and descriptive

**Slug**
- URL-friendly version of title
- Auto-generated but can be customized
- Use hyphens instead of spaces
- Keep short and relevant

**Category** (Required)
- Choose from predefined categories:
  - Communication Skills
  - Leadership
  - Emotional Intelligence
  - Time Management
  - Teamwork
  - Problem Solving

**Author**
- Defaults to "SkillGrow Team"
- Can be customized for individual authors
- Displays on published posts

#### 2. Content Creation
**Excerpt**
- Brief summary of your post
- Used in post previews and SEO
- Aim for 1-2 sentences
- Auto-generated if left blank

**Featured Image**
- Main image for your post
- Displays in post previews
- Use relative path: `assets/images/your-image.jpg`
- Recommended size: 800x400px

**Tags**
- Comma-separated keywords
- Help with content organization
- Used for related post suggestions
- Example: "communication, workplace, skills"

**Content** (Required)
- Main body of your blog post
- Use the rich text editor for formatting
- Add images, links, and multimedia
- Structure with headers and lists

#### 3. Publishing Options
**Featured Post**
- Checkbox to mark as featured
- Featured posts appear prominently on homepage
- Use sparingly for best content

**Status**
- **Draft**: Not visible on website, work in progress
- **Published**: Live and visible to visitors

### Content Formatting Tips

#### Headers
Use headers to structure your content:
- **H1**: Main title (automatically added)
- **H2**: Major sections
- **H3**: Subsections

#### Lists
Create organized content with lists:
- **Bullet points** for non-sequential items
- **Numbered lists** for step-by-step instructions

#### Links
Add valuable links:
- Select text and click link button
- Use descriptive anchor text
- External links open in new tabs

#### Images
Enhance posts with images:
- Click image button in toolbar
- Enter image URL or path
- Add alt text for accessibility

#### Blockquotes
Highlight important information:
- Use for quotes, testimonials, or key points
- Makes content more scannable

#### Code Blocks
For technical content:
- Use for code examples
- Preserves formatting and spacing

### Saving Your Work

#### Save as Draft
- Saves content without publishing
- Allows you to continue working later
- Not visible on live website

#### Publish Post
- Makes post live on website
- Immediately visible to visitors
- Can be unpublished later by changing status

#### Auto-Save
- Content is automatically saved as you type
- Prevents data loss
- Works in background

## Categories and Tags

### Understanding Categories
Categories are the main content organization system:

**Available Categories:**
1. **Communication Skills** - Verbal and written communication
2. **Leadership** - Management and team leadership
3. **Emotional Intelligence** - Self-awareness and empathy
4. **Time Management** - Productivity and organization
5. **Teamwork** - Collaboration and team dynamics
6. **Problem Solving** - Critical thinking and solutions

### Category Best Practices
- Choose the most relevant category for each post
- Don't over-categorize - one category per post
- Consider your audience's interests
- Maintain consistency in categorization

### Using Tags Effectively
Tags provide additional content organization:

**Tag Guidelines:**
- Use 3-5 tags per post
- Include both broad and specific terms
- Think about what readers might search for
- Use consistent terminology

**Example Tag Sets:**
- Communication post: "communication, workplace, presentation, public speaking"
- Leadership post: "leadership, management, team building, motivation"
- Time management post: "productivity, time management, organization, efficiency"

## Media Management

### Media Library Overview
The media section shows all available images and files:
- Thumbnail previews
- File names and sizes
- Easy browsing interface

### Default Media Files
Your website comes with several default images:
- Logo and branding elements
- Blog post featured images
- Author avatars
- Background images

### Adding New Media
**Upload Process:**
1. Click "Upload Media" button
2. Select image files from your computer
3. Supported formats: JPG, PNG, GIF, WebP
4. Files are processed and added to library

**Image Guidelines:**
- **Blog featured images**: 800x400px recommended
- **Author photos**: 300x300px square
- **General images**: Optimize for web (under 500KB)
- **File naming**: Use descriptive, web-friendly names

### Using Images in Posts
**In Rich Text Editor:**
1. Position cursor where you want image
2. Click image button in toolbar
3. Enter image path: `assets/images/your-image.jpg`
4. Add alt text for accessibility
5. Image appears in your post

**Image Paths:**
- Use relative paths starting with `assets/images/`
- Example: `assets/images/communication-skills.jpg`
- Ensure images exist in the media folder

## Settings and Configuration

### Site Information
Configure basic site details:

**Site Title**
- Main name of your website
- Appears in browser tabs and search results
- Default: "SkillGrow"

**Site Description**
- Brief description of your website
- Used for SEO and social sharing
- Keep under 160 characters

**Site URL**
- Your website's web address
- Used for social sharing and SEO
- Update when you deploy to live domain

### Saving Settings
- Changes are automatically saved
- Updates apply immediately
- Affects SEO and social sharing

## Data Management

### Export Data
**Why Export:**
- Create backups of your content
- Transfer content to another system
- Archive your work

**Export Process:**
1. Go to Settings section
2. Click "Export All Data"
3. JSON file downloads automatically
4. Contains all posts and settings

**Export Contents:**
- All blog posts (published and drafts)
- Site settings and configuration
- Export timestamp for reference

### Import Data
**When to Import:**
- Restore from backup
- Transfer content from another system
- Recover after data loss

**Import Process:**
1. Go to Settings section
2. Click "Import Data"
3. Select your JSON export file
4. Confirm the import action
5. Data is restored automatically

**Import Notes:**
- Replaces all existing data
- Cannot be undone
- Always export current data first as backup

### Clear All Data
**Caution:** This permanently deletes everything!

**When to Use:**
- Starting completely fresh
- Removing all test content
- Preparing for new project

**Process:**
1. Go to Settings section
2. Click "Clear All Data"
3. Confirm the action (multiple confirmations required)
4. All data is permanently deleted

## Best Practices

### Content Creation
**Planning Your Posts:**
- Outline key points before writing
- Research your topic thoroughly
- Consider your target audience
- Plan supporting images and media

**Writing Tips:**
- Use clear, concise language
- Break up text with headers and lists
- Include actionable advice
- Add personal examples or case studies

**SEO Best Practices:**
- Use descriptive titles with keywords
- Write compelling excerpts
- Include relevant tags
- Optimize images with alt text

### Content Organization
**Consistent Publishing:**
- Maintain regular posting schedule
- Plan content calendar in advance
- Balance different categories
- Update older posts when relevant

**Content Quality:**
- Proofread before publishing
- Use consistent tone and style
- Include credible sources
- Add value for readers

### Workflow Efficiency
**Draft System:**
- Start posts as drafts
- Review and edit before publishing
- Get feedback from colleagues
- Schedule publishing times

**Content Templates:**
- Create templates for common post types
- Use consistent structure
- Duplicate successful posts as starting points
- Maintain style guidelines

### Data Safety
**Regular Backups:**
- Export data weekly or monthly
- Store backups in multiple locations
- Test restore process occasionally
- Keep version history

**Browser Considerations:**
- Use same browser for consistency
- Don't clear browser data without backup
- Be aware of private/incognito mode limitations
- Consider multiple browser testing

## Troubleshooting

### Common Issues

#### CMS Won't Load
**Symptoms:** Blank page or error messages
**Solutions:**
1. Check JavaScript is enabled
2. Try different browser
3. Clear browser cache
4. Disable browser extensions
5. Check browser console for errors

#### Content Not Saving
**Symptoms:** Changes disappear after refresh
**Solutions:**
1. Check available storage space
2. Try different browser
3. Disable private/incognito mode
4. Clear browser cache and try again
5. Export data as backup before troubleshooting

#### Editor Not Working
**Symptoms:** Can't format text or toolbar missing
**Solutions:**
1. Refresh the page
2. Check internet connection (for external libraries)
3. Try different browser
4. Disable ad blockers
5. Check browser console for JavaScript errors

#### Images Not Displaying
**Symptoms:** Broken image icons in posts
**Solutions:**
1. Verify image file paths
2. Check image files exist in assets/images/
3. Use correct file extensions (.jpg, .png, etc.)
4. Ensure proper file permissions
5. Try relative paths: `assets/images/filename.jpg`

### Data Recovery

#### Lost Content
**If you lose content:**
1. Check browser history for auto-saved versions
2. Look for exported backup files
3. Check if content exists in browser's local storage
4. Try accessing from different browser profile

#### Corrupted Data
**If data appears corrupted:**
1. Export current data immediately
2. Clear all data and start fresh
3. Import from most recent good backup
4. Recreate content if necessary

### Performance Issues

#### Slow Loading
**If CMS loads slowly:**
1. Check internet connection
2. Close unnecessary browser tabs
3. Clear browser cache
4. Restart browser
5. Check available system memory

#### Browser Compatibility
**If features don't work:**
1. Update to latest browser version
2. Try different browser (Chrome, Firefox, Safari, Edge)
3. Disable browser extensions
4. Check JavaScript support
5. Use desktop browser instead of mobile

### Getting Help

#### Self-Help Resources
1. Check browser developer console (F12)
2. Review this user guide
3. Check setup documentation
4. Test in different browser
5. Try incognito/private mode

#### Documentation
- Setup Guide: Installation and configuration
- Customization Guide: Styling and branding
- Troubleshooting Guide: Common problems and solutions

#### Best Practices for Support
1. Note exact error messages
2. Record steps to reproduce issue
3. Check browser and version
4. Try basic troubleshooting first
5. Have backup of your data ready

---

**Congratulations!** You're now ready to create amazing content with the SkillGrow CMS. Start writing and sharing your soft skills expertise with the world!

