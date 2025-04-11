/**
 * Loading and Lazy Loading functionality
 * Handles the loading screen and lazy loading of images
 */

// Loading Screen Management
document.addEventListener('DOMContentLoaded', () => {
  // Hide loading screen when page is fully loaded
  window.addEventListener('load', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen) {
      setTimeout(() => {
        loadingScreen.classList.add('hidden');
        // Remove from DOM after transition completes
        setTimeout(() => {
          loadingScreen.remove();
        }, 500);
      }, 500);
    }
  });
});

// Lazy Loading Implementation
document.addEventListener('DOMContentLoaded', () => {
  // Check if browser supports Intersection Observer
  if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const src = img.getAttribute('data-src');
          
          if (src) {
            img.src = src;
            img.removeAttribute('data-src');
            img.classList.add('loaded');
          }
          
          // Stop observing the image once it's loaded
          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '0px 0px 200px 0px' // Load images when they're 200px from viewport
    });
    
    lazyImages.forEach(img => {
      imageObserver.observe(img);
    });
  } else {
    // Fallback for browsers that don't support Intersection Observer
    const lazyLoad = () => {
      const lazyImages = document.querySelectorAll('[data-src]');
      
      lazyImages.forEach(img => {
        if (img.getBoundingClientRect().top <= window.innerHeight + 200 && 
            img.getBoundingClientRect().bottom >= 0) {
          const src = img.getAttribute('data-src');
          
          if (src) {
            img.src = src;
            img.removeAttribute('data-src');
            img.classList.add('loaded');
          }
        }
      });
      
      // If all images are loaded, remove the scroll event listener
      if (lazyImages.length === 0) {
        window.removeEventListener('scroll', lazyLoad);
        window.removeEventListener('resize', lazyLoad);
        window.removeEventListener('orientationchange', lazyLoad);
      }
    };
    
    // Add event listeners for scroll, resize, and orientation change
    window.addEventListener('scroll', lazyLoad);
    window.addEventListener('resize', lazyLoad);
    window.addEventListener('orientationchange', lazyLoad);
    
    // Initial load
    lazyLoad();
  }
});

// Reduced Motion Support
document.addEventListener('DOMContentLoaded', () => {
  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  
  function handleReducedMotion() {
    if (prefersReducedMotion.matches) {
      document.body.classList.add('reduced-motion');
    } else {
      document.body.classList.remove('reduced-motion');
    }
  }
  
  // Initial check
  handleReducedMotion();
  
  // Listen for changes
  prefersReducedMotion.addEventListener('change', handleReducedMotion);
});