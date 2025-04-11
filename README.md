# Creative Developer Portfolio

A responsive portfolio website showcasing creative development work with three distinct visual styles: old-school, modern, and minimalist.

## Features

- Responsive design optimized for mobile, tablet, and desktop
- Cross-browser compatible (Chrome, Firefox, Safari, Edge)
- Scroll-based animations and transitions
- Accessibility features (ARIA attributes, keyboard navigation, screen reader support)
- Performance optimizations (lazy loading, minified assets)
- Three distinct visual styles across different sections

## Directory Structure

```
portfolio-website/
├── assets/
│   ├── favicon/
│   │   ├── favicon.ico
│   │   ├── favicon-16x16.png
│   │   ├── favicon-32x32.png
│   │   └── apple-touch-icon.png
│   ├── fonts/
│   └── images/
├── css/
│   ├── style.css
│   ├── old-school.css
│   ├── modern.css
│   ├── minimalist.css
│   └── loading.css
├── js/
│   ├── script.js
│   └── loading.js
├── index.html
├── manifest.json
└── README.md
```

## Deployment Instructions

### Prerequisites

- Web server (Apache, Nginx, etc.) or static site hosting service
- HTTPS certificate for secure connections (recommended)

### Deployment Steps

1. **Prepare the production files**
   - Use the minified files in the `dist` directory for production deployment
   - Ensure all image assets are properly optimized

2. **Upload to web server**
   ```bash
   # Example using rsync
   rsync -avz --delete dist/ username@your-server:/path/to/www/
   ```

3. **Configure server settings**
   - Set up proper caching headers:
     ```
     # Apache (.htaccess)
     <IfModule mod_expires.c>
       ExpiresActive On
       ExpiresByType image/jpg "access plus 1 year"
       ExpiresByType image/jpeg "access plus 1 year"
       ExpiresByType image/png "access plus 1 year"
       ExpiresByType image/svg+xml "access plus 1 year"
       ExpiresByType text/css "access plus 1 month"
       ExpiresByType text/javascript "access plus 1 month"
       ExpiresByType application/javascript "access plus 1 month"
     </IfModule>
     ```

   - Enable GZIP compression:
     ```
     # Apache (.htaccess)
     <IfModule mod_deflate.c>
       AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css application/javascript application/json
     </IfModule>
     ```

4. **Test the deployed website**
   - Verify all links work correctly
   - Test on multiple browsers and devices
   - Run performance tests using Lighthouse

## Third-Party Libraries

| Library | Version | License | Purpose |
|---------|---------|---------|---------|
| [GSAP](https://greensock.com/gsap/) | 3.11.4 | Standard GreenSock License | Animation and scroll-based effects |
| [ScrollTrigger](https://greensock.com/scrolltrigger/) | 3.11.4 | Standard GreenSock License | Scroll-based animations |
| [Font Awesome](https://fontawesome.com/) | 6.4.0 | [Font Awesome Free License](https://fontawesome.com/license/free) | Icons |
| [Google Fonts](https://fonts.google.com/) | N/A | [SIL Open Font License](https://scripts.sil.org/OFL) | Typography |

## Browser Compatibility

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- iOS Safari (latest 2 versions)
- Android Chrome (latest 2 versions)

## Accessibility Features

- Semantic HTML structure
- ARIA attributes for enhanced screen reader support
- Keyboard navigation support
- Sufficient color contrast for text readability
- Support for reduced motion preferences
- Skip to content link

## Performance Optimizations

- Minified CSS and JavaScript
- Optimized image assets
- Lazy loading for images
- Preloading of critical assets
- Appropriate caching headers
- Reduced motion option for animations

## Development

To make changes to the website:

1. Edit the source files in the root directory
2. Run the optimization scripts to update the minified files in the `dist` directory
3. Test changes locally before deploying

## License

All rights reserved. This code is not open source.