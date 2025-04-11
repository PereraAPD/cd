# Portfolio Website Customization Guide

This guide provides detailed instructions on how to customize the Creative Developer Portfolio website. You'll find information on modifying content, changing visual styles, adding new sections, and troubleshooting common issues.

## Table of Contents
- [Content Customization](#content-customization)
  - [Text Content](#text-content)
  - [Images](#images)
  - [Projects](#projects)
- [Visual Style Customization](#visual-style-customization)
  - [Old-School Style](#old-school-style)
  - [Modern Style](#modern-style)
  - [Minimalist Style](#minimalist-style)
  - [Global Styles](#global-styles)
- [Adding New Sections](#adding-new-sections)
- [Animation Customization](#animation-customization)
- [Troubleshooting](#troubleshooting)

## Content Customization

### Text Content

To modify text content, open the `index.html` file and locate the section you want to edit:

```html
<!-- Example: Editing the About section -->
<section id="about" class="about-section" data-style="modern" data-scroll-section>
    <div class="container">
        <h2>About Me</h2>
        <p>Your new about text goes here.</p>
        <!-- Additional content -->
    </div>
</section>
```

Key HTML elements:
- `<h1>`, `<h2>`, `<h3>`: Headings
- `<p>`: Paragraphs
- `<a>`: Links
- `<ul>` and `<li>`: Lists

### Images

To replace images:

1. Prepare your new images with the same dimensions as the originals for best results
2. Place your new images in the `assets/images/` directory
3. Update the image references in the HTML:

```html
<!-- Example: Updating a project image -->
<img src="assets/images/your-new-image.jpg" alt="Project description">
```

Image optimization recommendations:
- Project thumbnails: 800×600px, JPEG format, 70-80% quality
- Background images: 1920×1080px, JPEG format, 70-80% quality
- Icons: SVG format when possible, or PNG with transparency

### Projects

To add or modify projects:

1. Locate the projects section in `index.html`:

```html
<section id="projects" class="projects-section" data-style="minimalist" data-scroll-section>
    <div class="container">
        <h2>My Projects</h2>
        <div class="projects-grid">
            <!-- Project cards here -->
        </div>
    </div>
</section>
```

2. Add or modify project cards following this structure:

```html
<div class="project-card">
    <div class="project-image">
        <img src="assets/images/your-project-image.jpg" alt="Project Name">
    </div>
    <div class="project-content">
        <h3>Project Name</h3>
        <p>Project description goes here. Keep it concise and highlight key features or technologies used.</p>
        <div class="project-tags">
            <span>HTML</span>
            <span>CSS</span>
            <span>JavaScript</span>
        </div>
        <a href="https://project-url.com" class="btn" target="_blank">View Project</a>
    </div>
</div>
```

## Visual Style Customization

The portfolio features three distinct visual styles. Each style has its own CSS file that you can modify.

### Old-School Style

To customize the old-school style, edit `css/old-school.css`:

```css
/* Main color variables */
:root {
    --old-school-bg: #f5deb3;
    --old-school-text: #000000;
    --old-school-accent: #8b4513;
    --old-school-highlight: #cd853f;
}

/* Modify these variables to change the color scheme */
```

Key style elements:
- Wheat-colored background
- Brown accents
- Monospace typography
- Pixel-art inspired elements

### Modern Style

To customize the modern style, edit `css/modern.css`:

```css
/* Main color variables */
:root {
    --modern-bg: #29324a;
    --modern-text: #ffffff;
    --modern-accent: #6a17e6;
    --modern-highlight: #9c55ff;
}

/* Modify these variables to change the color scheme */
```

Key style elements:
- Dark blue background
- Vibrant purple accents
- Clean sans-serif typography
- Smooth animations

### Minimalist Style

To customize the minimalist style, edit `css/minimalist.css`:

```css
/* Main color variables */
:root {
    --minimalist-bg: #fafafa;
    --minimalist-text: #323232;
    --minimalist-accent: #c8c8c8;
    --minimalist-highlight: #e0e0e0;
}

/* Modify these variables to change the color scheme */
```

Key style elements:
- White background
- Subtle gray accents
- Minimal decoration
- Focus on typography and whitespace

### Global Styles

To modify styles that apply across the entire website, edit `css/style.css`:

```css
/* Typography */
body {
    font-family: 'Roboto', sans-serif;
    line-height: 1.6;
}

h1, h2, h3, h4, h5, h6 {
    font-family: 'Playfair Display', serif;
}

/* Modify these properties to change global typography */
```

## Adding New Sections

To add a new section to the website:

1. Decide which visual style you want to use for the section
2. Add the new section to `index.html` following this structure:

```html
<section id="your-section-id" class="your-section-class" data-style="modern" data-scroll-section>
    <div class="container">
        <h2>Your Section Title</h2>
        <!-- Your section content -->
    </div>
</section>
```

3. Add corresponding styles in the appropriate CSS file
4. Update the navigation menu to include your new section:

```html
<nav class="main-nav">
    <ul>
        <li><a href="#landing" class="nav-link">Home</a></li>
        <li><a href="#about" class="nav-link">About</a></li>
        <li><a href="#projects" class="nav-link">Projects</a></li>
        <li><a href="#your-section-id" class="nav-link">Your Section</a></li>
        <li><a href="#contact" class="nav-link">Contact</a></li>
    </ul>
</nav>
```

5. Add scroll animations for the new section in `js/script.js`:

```javascript
// Add animations for your new section
function setupYourSectionAnimations() {
    gsap.from("#your-section-id .element-to-animate", {
        scrollTrigger: {
            trigger: "#your-section-id",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.2
    });
}

// Call your function in the setupScrollAnimations function
function setupScrollAnimations() {
    // Existing animation setups...
    
    // Your new section animations
    setupYourSectionAnimations();
}
```

## Animation Customization

The portfolio uses GSAP and ScrollTrigger for animations. To customize animations:

1. Open `js/script.js`
2. Locate the animation setup functions:

```javascript
function setupScrollAnimations() {
    setupHeaderAnimations();
    setupLandingAnimations();
    setupAboutAnimations();
    setupProjectsAnimations();
    setupContactAnimations();
}
```

3. Modify the individual animation functions to change timing, effects, or triggers:

```javascript
function setupProjectsAnimations() {
    // Example: Modify the project cards animation
    gsap.from(".project-card", {
        scrollTrigger: {
            trigger: "#projects",
            start: "top 70%",  // Change when animation starts
            end: "bottom 20%", // Change when animation ends
            toggleActions: "play none none reverse" // Change behavior
        },
        opacity: 0,
        y: 50,       // Change starting position
        duration: 1, // Change duration
        stagger: 0.2 // Change stagger timing
    });
}
```

Common animation properties:
- `opacity`: Controls transparency (0 to 1)
- `x`, `y`: Controls horizontal/vertical position
- `scale`: Controls size
- `rotation`: Controls rotation
- `duration`: Controls how long the animation takes
- `stagger`: Controls delay between multiple elements
- `ease`: Controls the animation timing function

## Troubleshooting

### Common Issues and Solutions

**Issue**: Animations not working properly
- **Solution**: Check browser console for errors
- **Solution**: Verify GSAP and ScrollTrigger are properly loaded
- **Solution**: Check if scroll containers have the correct height

**Issue**: Styles not applying correctly
- **Solution**: Check for CSS specificity conflicts
- **Solution**: Verify the correct data-style attribute is set on sections
- **Solution**: Clear browser cache to ensure latest CSS is loaded

**Issue**: Responsive layout problems
- **Solution**: Test on actual devices, not just browser resizing
- **Solution**: Check media queries in CSS files
- **Solution**: Use browser developer tools to identify layout issues

**Issue**: Images not displaying
- **Solution**: Verify file paths are correct
- **Solution**: Check image file formats and sizes
- **Solution**: Ensure images are properly uploaded to the server

### Getting Help

If you encounter issues not covered in this guide:

1. Check the browser console for JavaScript errors
2. Validate your HTML and CSS using online tools
3. Review the GSAP documentation for animation issues
4. Contact support at support@example.com for additional assistance