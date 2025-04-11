/**
 * Main JavaScript file for the portfolio website
 * Handles scroll-based transitions and animations
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize GSAP and ScrollTrigger
  initGSAP();
  
  // Setup navigation functionality
  setupNavigation();
  
  // Setup scroll-based animations
  setupScrollAnimations();
});

/**
 * Initialize GSAP and ScrollTrigger plugin
 */
function initGSAP() {
  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);
  
  // Set defaults
  gsap.defaults({
    ease: 'power2.inOut',
    duration: 1
  });
}

/**
 * Setup navigation functionality
 */
function setupNavigation() {
  const header = document.getElementById('header');
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelectorAll('.nav-link');
  
  // Handle scroll event to change header appearance
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
  
  // Mobile menu toggle
  if (menuToggle) {
    const mobileMenu = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });
  }
  
  // Smooth scroll to sections
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        // Close mobile menu if open
        const mobileMenu = document.querySelector('.nav-links');
        if (mobileMenu && mobileMenu.classList.contains('active')) {
          mobileMenu.classList.remove('active');
          menuToggle.classList.remove('active');
        }
        
        // Smooth scroll to target section
        window.scrollTo({
          top: targetSection.offsetTop - header.offsetHeight,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * Setup scroll-based animations
 */
function setupScrollAnimations() {
  // Get all sections with data-scroll-section attribute
  const sections = document.querySelectorAll('[data-scroll-section]');
  
  // Setup animations for each section
  sections.forEach(section => {
    const sectionStyle = section.getAttribute('data-style');
    
    // Setup style-specific animations
    switch(sectionStyle) {
      case 'old-school':
        setupOldSchoolAnimations(section);
        break;
      case 'modern':
        setupModernAnimations(section);
        break;
      case 'transitional':
        setupTransitionalAnimations(section);
        break;
      case 'minimalist':
        setupMinimalistAnimations(section);
        break;
    }
    
    // Setup section transition animations
    setupSectionTransition(section);
  });
  
  // Setup animations for elements with data-scroll-element attribute
  setupElementAnimations();
}

/**
 * Setup animations for the Old School style section
 * @param {HTMLElement} section - The section element
 */
function setupOldSchoolAnimations(section) {
  // Glitch text animation enhancement
  const glitchText = section.querySelector('.glitch-text');
  if (glitchText) {
    gsap.to(glitchText, {
      scrollTrigger: {
        trigger: glitchText,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      },
      textShadow: '0.05em 0 0 rgba(255, 0, 0, 0.75), -0.025em -0.05em 0 rgba(0, 255, 0, 0.75), 0.025em 0.05em 0 rgba(0, 0, 255, 0.75)',
      duration: 0.5
    });
  }
  
  // Retro grid animation
  const retroGrid = section.querySelector('.retro-grid');
  if (retroGrid) {
    gsap.fromTo(retroGrid, 
      { opacity: 0, scale: 1.2 },
      { 
        opacity: 1, 
        scale: 1,
        duration: 1.5,
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'top top',
          scrub: true
        }
      }
    );
  }
  
  // Pixel art animation
  const pixelArt = section.querySelector('.pixel-art');
  if (pixelArt) {
    gsap.fromTo(pixelArt,
      { x: 100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }
  
  // Creative cursor effect for old-school section
  section.addEventListener('mousemove', (e) => {
    const cursor = document.createElement('div');
    cursor.classList.add('retro-cursor');
    cursor.style.left = `${e.pageX}px`;
    cursor.style.top = `${e.pageY}px`;
    document.body.appendChild(cursor);
    
    setTimeout(() => {
      cursor.style.opacity = '0';
      setTimeout(() => {
        document.body.removeChild(cursor);
      }, 300);
    }, 100);
  });
}

/**
 * Setup animations for the Modern style section
 * @param {HTMLElement} section - The section element
 */
function setupModernAnimations(section) {
  // Text reveal animation for section title
  const sectionTitle = section.querySelector('.section-title');
  if (sectionTitle) {
    gsap.fromTo(sectionTitle,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: sectionTitle,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }
  
  // About cards staggered animation
  const aboutCards = section.querySelectorAll('.about-card');
  if (aboutCards.length) {
    gsap.fromTo(aboutCards,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 0.8,
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }
  
  // Parallax effect for background elements
  const parallaxBg = section.querySelector('.parallax-bg');
  if (parallaxBg) {
    gsap.fromTo(parallaxBg,
      { y: 0 },
      {
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      }
    );
  }
  
  // Skill bars animation
  const skillBars = section.querySelectorAll('.skill-bar');
  if (skillBars.length) {
    skillBars.forEach(bar => {
      const percentage = bar.getAttribute('data-percentage') || '80%';
      gsap.fromTo(bar.querySelector('.skill-progress'),
        { width: '0%' },
        {
          width: percentage,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: bar,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });
  }
}

/**
 * Setup animations for the Transitional style section
 * @param {HTMLElement} section - The section element
 */
function setupTransitionalAnimations(section) {
  // Split text animation for section title
  const sectionTitle = section.querySelector('.section-title');
  if (sectionTitle) {
    // Simple text reveal animation (in a real project, we would use SplitText plugin)
    gsap.fromTo(sectionTitle,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionTitle,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }
  
  // Project cards tilt effect
  const projectCards = section.querySelectorAll('.project-card');
  if (projectCards.length) {
    projectCards.forEach(card => {
      // Add tilt effect on mouse move
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const tiltX = (y - centerY) / 10;
        const tiltY = (centerX - x) / 10;
        
        gsap.to(card, {
          rotationX: tiltX,
          rotationY: tiltY,
          duration: 0.5,
          ease: 'power1.out'
        });
      });
      
      // Reset tilt on mouse leave
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          rotationX: 0,
          rotationY: 0,
          duration: 0.5,
          ease: 'power1.out'
        });
      });
      
      // Scroll animation
      gsap.fromTo(card,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });
  }
  
  // Music-related interactive elements - Audio visualizer effect
  const musicElements = section.querySelectorAll('.music-element');
  if (musicElements.length) {
    musicElements.forEach(element => {
      // Create audio visualizer bars
      const visualizer = document.createElement('div');
      visualizer.classList.add('audio-visualizer');
      
      // Create 10 bars for the visualizer
      for (let i = 0; i < 10; i++) {
        const bar = document.createElement('div');
        bar.classList.add('visualizer-bar');
        visualizer.appendChild(bar);
        
        // Animate each bar with random heights
        gsap.to(bar, {
          height: () => Math.random() * 30 + 5 + 'px',
          duration: 0.4,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
          delay: i * 0.1
        });
      }
      
      element.appendChild(visualizer);
    });
  }
  
  // Fashion-related interactive elements - Color palette shifter
  const fashionElements = section.querySelectorAll('.fashion-element');
  if (fashionElements.length) {
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#F033FF', '#FF33A8'];
    
    fashionElements.forEach(element => {
      element.addEventListener('click', () => {
        // Get random color from palette
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        
        // Animate color change
        gsap.to(element, {
          backgroundColor: randomColor,
          duration: 0.5,
          ease: 'power1.out'
        });
      });
    });
  }
}

/**
 * Setup animations for the Minimalist style section
 * @param {HTMLElement} section - The section element
 */
function setupMinimalistAnimations(section) {
  // Fade in animation for section title
  const sectionTitle = section.querySelector('.section-title');
  if (sectionTitle) {
    gsap.fromTo(sectionTitle,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1.5,
        scrollTrigger: {
          trigger: sectionTitle,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }
  
  // Slide in animation for contact text
  const contactText = section.querySelector('.contact-text');
  if (contactText) {
    gsap.fromTo(contactText,
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: contactText,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }
  
  // Fade in animation for contact form
  const contactForm = section.querySelector('.contact-form-container');
  if (contactForm) {
    gsap.fromTo(contactForm,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.3,
        scrollTrigger: {
          trigger: contactForm,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }
  
  // Staggered fade in for social links
  const socialLinks = section.querySelectorAll('.social-link');
  if (socialLinks.length) {
    gsap.fromTo(socialLinks,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
        scrollTrigger: {
          trigger: section.querySelector('.social-links'),
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }
  
  // Subtle form field animations
  const formFields = section.querySelectorAll('input, textarea');
  if (formFields.length) {
    formFields.forEach(field => {
      field.addEventListener('focus', () => {
        gsap.to(field, {
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#ffffff',
          duration: 0.3
        });
      });
      
      field.addEventListener('blur', () => {
        gsap.to(field, {
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
          backgroundColor: '#f9f9f9',
          duration: 0.3
        });
      });
    });
  }
  
  // Submit button effect
  const submitButton = section.querySelector('button[type="submit"]');
  if (submitButton) {
    submitButton.addEventListener('mouseenter', () => {
      gsap.to(submitButton, {
        scale: 1.05,
        duration: 0.3
      });
    });
    
    submitButton.addEventListener('mouseleave', () => {
      gsap.to(submitButton, {
        scale: 1,
        duration: 0.3
      });
    });
    
    submitButton.addEventListener('click', (e) => {
      if (!isFormValid(section)) {
        e.preventDefault();
        return;
      }
      
      e.preventDefault(); // Prevent actual form submission for demo
      
      // Create ripple effect
      const ripple = document.createElement('div');
      ripple.classList.add('button-ripple');
      submitButton.appendChild(ripple);
      
      gsap.to(ripple, {
        scale: 20,
        opacity: 0,
        duration: 0.8,
        onComplete: () => {
          submitButton.removeChild(ripple);
          
          // Show success message
          const formContainer = section.querySelector('.contact-form-container');
          const successMessage = document.createElement('div');
          successMessage.classList.add('success-message');
          successMessage.textContent = 'Message sent successfully!';
          
          formContainer.innerHTML = '';
          formContainer.appendChild(successMessage);
          
          gsap.fromTo(successMessage,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5 }
          );
        }
      });
    });
  }
  
  // Subtle background animation
  const background = section.querySelector('.section-background');
  if (background) {
    gsap.to(background, {
      backgroundPosition: '100% 100%',
      duration: 20,
      repeat: -1,
      yoyo: true,
      ease: 'none'
    });
  }
}

/**
 * Setup transition animations between sections
 * @param {HTMLElement} section - The section element
 */
function setupSectionTransition(section) {
  // Get the next section (if any)
  const nextSection = section.nextElementSibling;
  if (!nextSection || !nextSection.hasAttribute('data-style')) return;
  
  const currentStyle = section.getAttribute('data-style');
  const nextStyle = nextSection.getAttribute('data-style');
  
  // Create a transition effect between sections
  ScrollTrigger.create({
    trigger: section,
    start: 'bottom bottom',
    end: 'bottom top',
    onEnter: () => {
      // Implement specific transition effects based on the styles
      if (currentStyle === 'old-school' && nextStyle === 'modern') {
        // Transition from old-school to modern
        transitionOldSchoolToModern(section, nextSection);
      } else if (currentStyle === 'modern' && nextStyle === 'transitional') {
        // Transition from modern to transitional
        transitionModernToTransitional(section, nextSection);
      } else if (currentStyle === 'transitional' && nextStyle === 'minimalist') {
        // Transition from transitional to minimalist
        transitionTransitionalToMinimalist(section, nextSection);
      }
    },
    onLeaveBack: () => {
      // Implement specific reverse transition effects based on the styles
      if (currentStyle === 'old-school' && nextStyle === 'modern') {
        // Reverse transition from modern to old-school
        reverseTransitionModernToOldSchool(section, nextSection);
      } else if (currentStyle === 'modern' && nextStyle === 'transitional') {
        // Reverse transition from transitional to modern
        reverseTransitionTransitionalToModern(section, nextSection);
      } else if (currentStyle === 'transitional' && nextStyle === 'minimalist') {
        // Reverse transition from minimalist to transitional
        reverseTransitionMinimalistToTransitional(section, nextSection);
      }
    }
  });
}

/**
 * Transition from old-school to modern style
 * @param {HTMLElement} oldSchoolSection - The old-school section
 * @param {HTMLElement} modernSection - The modern section
 */
function transitionOldSchoolToModern(oldSchoolSection, modernSection) {
  // Create overlay element for transition
  const overlay = document.createElement('div');
  overlay.classList.add('transition-overlay');
  document.body.appendChild(overlay);
  
  // Animate the overlay
  gsap.fromTo(overlay,
    { opacity: 0 },
    {
      opacity: 1,
      duration: 0.5,
      onComplete: () => {
        // Add transition class to body
        document.body.classList.remove('old-school-active');
        document.body.classList.add('modern-active');
        
        // Fade out overlay
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.5,
          delay: 0.2,
          onComplete: () => {
            document.body.removeChild(overlay);
          }
        });
      }
    }
  );
  
  // Animate grid lines transitioning to smooth gradients
  const gridLines = document.querySelectorAll('.grid-line');
  if (gridLines.length) {
    gsap.to(gridLines, {
      opacity: 0,
      stagger: 0.05,
      duration: 0.5
    });
  }
  
  // Transition color scheme
  gsap.to('body', {
    backgroundColor: '#f5f5f5',
    color: '#333',
    duration: 1
  });
}

/**
 * Reverse transition from modern to old-school style
 * @param {HTMLElement} oldSchoolSection - The old-school section
 * @param {HTMLElement} modernSection - The modern section
 */
function reverseTransitionModernToOldSchool(oldSchoolSection, modernSection) {
  // Create overlay element for transition
  const overlay = document.createElement('div');
  overlay.classList.add('transition-overlay');
  document.body.appendChild(overlay);
  
  // Animate the overlay
  gsap.fromTo(overlay,
    { opacity: 0 },
    {
      opacity: 1,
      duration: 0.5,
      onComplete: () => {
        // Add transition class to body
        document.body.classList.remove('modern-active');
        document.body.classList.add('old-school-active');
        
        // Fade out overlay
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.5,
          delay: 0.2,
          onComplete: () => {
            document.body.removeChild(overlay);
          }
        });
      }
    }
  );
  
  // Animate grid lines appearing
  const gridLines = document.querySelectorAll('.grid-line');
  if (gridLines.length) {
    gsap.fromTo(gridLines,
      { opacity: 0 },
      {
        opacity: 1,
        stagger: 0.05,
        duration: 0.5,
        delay: 0.5
      }
    );
  }
  
  // Transition color scheme back
  gsap.to('body', {
    backgroundColor: '#000',
    color: '#0f0',
    duration: 1
  });
}

/**
 * Transition from modern to transitional style
 * @param {HTMLElement} modernSection - The modern section
 * @param {HTMLElement} transitionalSection - The transitional section
 */
function transitionModernToTransitional(modernSection, transitionalSection) {
  // Create overlay for transition
  const overlay = document.createElement('div');
  overlay.classList.add('transition-overlay');
  overlay.style.background = 'linear-gradient(to right, #f5f5f5, #e0e0e0)';
  document.body.appendChild(overlay);
  
  // Animate the overlay
  gsap.fromTo(overlay,
    { opacity: 0 },
    {
      opacity: 0.8,
      duration: 0.5,
      onComplete: () => {
        // Add transition class to body
        document.body.classList.remove('modern-active');
        document.body.classList.add('transitional-active');
        
        // Fade out overlay
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.5,
          delay: 0.2,
          onComplete: () => {
            document.body.removeChild(overlay);
          }
        });
      }
    }
  );
  
  // Animate color scheme transition
  gsap.to('body', {
    backgroundColor: '#e0e0e0',
    color: '#222',
    duration: 1
  });
  
  // Animate cards transforming
  const cards = document.querySelectorAll('.card, .about-card, .project-card');
  if (cards.length) {
    gsap.to(cards, {
      boxShadow: '0 15px 30px rgba(0,0,0,0.1)',
      y: -5,
      stagger: 0.1,
      duration: 0.8
    });
  }
}

/**
 * Reverse transition from transitional to modern style
 * @param {HTMLElement} modernSection - The modern section
 * @param {HTMLElement} transitionalSection - The transitional section
 */
function reverseTransitionTransitionalToModern(modernSection, transitionalSection) {
  // Create overlay for transition
  const overlay = document.createElement('div');
  overlay.classList.add('transition-overlay');
  overlay.style.background = 'linear-gradient(to right, #e0e0e0, #f5f5f5)';
  document.body.appendChild(overlay);
  
  // Animate the overlay
  gsap.fromTo(overlay,
    { opacity: 0 },
    {
      opacity: 0.8,
      duration: 0.5,
      onComplete: () => {
        // Add transition class to body
        document.body.classList.remove('transitional-active');
        document.body.classList.add('modern-active');
        
        // Fade out overlay
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.5,
          delay: 0.2,
          onComplete: () => {
            document.body.removeChild(overlay);
          }
        });
      }
    }
  );
  
  // Animate color scheme transition
  gsap.to('body', {
    backgroundColor: '#f5f5f5',
    color: '#333',
    duration: 1
  });
  
  // Animate cards transforming back
  const cards = document.querySelectorAll('.card, .about-card, .project-card');
  if (cards.length) {
    gsap.to(cards, {
      boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
      y: 0,
      stagger: 0.1,
      duration: 0.8
    });
  }
}

/**
 * Transition from transitional to minimalist style
 * @param {HTMLElement} transitionalSection - The transitional section
 * @param {HTMLElement} minimalistSection - The minimalist section
 */
function transitionTransitionalToMinimalist(transitionalSection, minimalistSection) {
  // Create overlay for transition
  const overlay = document.createElement('div');
  overlay.classList.add('transition-overlay');
  overlay.style.background = 'linear-gradient(to right, #e0e0e0, #ffffff)';
  document.body.appendChild(overlay);
  
  // Animate the overlay
  gsap.fromTo(overlay,
    { opacity: 0 },
    {
      opacity: 0.8,
      duration: 0.5,
      onComplete: () => {
        // Add transition class to body
        document.body.classList.remove('transitional-active');
        document.body.classList.add('minimalist-active');
        
        // Fade out overlay
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.5,
          delay: 0.2,
          onComplete: () => {
            document.body.removeChild(overlay);
          }
        });
      }
    }
  );
  
  // Animate color scheme transition
  gsap.to('body', {
    backgroundColor: '#ffffff',
    color: '#111',
    duration: 1
  });
  
  // Simplify elements - reduce shadows and make cleaner
  const elements = document.querySelectorAll('.card, .about-card, .project-card, button, input, textarea');
  if (elements.length) {
    gsap.to(elements, {
      boxShadow: '0 2px 5px rgba(0,0,0,0.03)',
      borderRadius: '2px',
      stagger: 0.05,
      duration: 0.8
    });
  }
  
  // Reduce font weights for minimalist look
  const headings = document.querySelectorAll('h1, h2, h3');
  if (headings.length) {
    gsap.to(headings, {
      fontWeight: 300,
      letterSpacing: '1px',
      duration: 0.8
    });
  }
}

/**
 * Reverse transition from minimalist to transitional style
 * @param {HTMLElement} transitionalSection - The transitional section
 * @param {HTMLElement} minimalistSection - The minimalist section
 */
function reverseTransitionMinimalistToTransitional(transitionalSection, minimalistSection) {
  // Create overlay for transition
  const overlay = document.createElement('div');
  overlay.classList.add('transition-overlay');
  overlay.style.background = 'linear-gradient(to right, #ffffff, #e0e0e0)';
  document.body.appendChild(overlay);
  
  // Animate the overlay
  gsap.fromTo(overlay,
    { opacity: 0 },
    {
      opacity: 0.8,
      duration: 0.5,
      onComplete: () => {
        // Add transition class to body
        document.body.classList.remove('minimalist-active');
        document.body.classList.add('transitional-active');
        
        // Fade out overlay
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.5,
          delay: 0.2,
          onComplete: () => {
            document.body.removeChild(overlay);
          }
        });
      }
    }
  );
  
  // Animate color scheme transition
  gsap.to('body', {
    backgroundColor: '#e0e0e0',
    color: '#222',
    duration: 1
  });
  
  // Restore elements - increase shadows and make more dynamic
  const elements = document.querySelectorAll('.card, .about-card, .project-card, button, input, textarea');
  if (elements.length) {
    gsap.to(elements, {
      boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
      borderRadius: '4px',
      stagger: 0.05,
      duration: 0.8
    });
  }
  
  // Restore font weights
  const headings = document.querySelectorAll('h1, h2, h3');
  if (headings.length) {
    gsap.to(headings, {
      fontWeight: 600,
      letterSpacing: '0px',
      duration: 0.8
    });
  }
}

/**
 * Setup animations for elements with data-scroll-element attribute
 */
function setupElementAnimations() {
  // Fade in animation
  const fadeElements = document.querySelectorAll('[data-scroll-element="fade-in"]');
  fadeElements.forEach(element => {
    gsap.fromTo(element,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });
  
  // Fade in with delay
  const fadeDelayElements = document.querySelectorAll('[data-scroll-element="fade-in-delay"]');
  fadeDelayElements.forEach(element => {
    gsap.fromTo(element,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
        delay: 0.5,
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });
  
  // Slide up animation
  const slideUpElements = document.querySelectorAll('[data-scroll-element="slide-up"]');
  slideUpElements.forEach(element => {
    gsap.fromTo(element,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });
  
  // Parallax effect
  const parallaxElements = document.querySelectorAll('[data-scroll-element="parallax"]');
  parallaxElements.forEach(element => {
    gsap.fromTo(element,
      { y: 0 },
      {
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: element.parentElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      }
    );
  });
  
  // Bounce animation
  const bounceElements = document.querySelectorAll('[data-scroll-element="bounce"]');
  bounceElements.forEach(element => {
    gsap.fromTo(element,
      { y: 0 },
      {
        y: -10,
        repeat: -1,
        yoyo: true,
        duration: 1,
        ease: 'power1.inOut'
      }
    );
  });
  
  // Scale in animation
  const scaleElements = document.querySelectorAll('[data-scroll-element="scale-in"]');
  scaleElements.forEach(element => {
    gsap.fromTo(element,
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });
  
  // Scale in with delay
  const scaleDelayElements = document.querySelectorAll('[data-scroll-element="scale-in-delay"]');
  scaleDelayElements.forEach(element => {
    gsap.fromTo(element,
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        delay: 0.3,
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });
  
  // Staggered fade in
  const staggerElements = document.querySelectorAll('[data-scroll-element="stagger-fade"]');
  if (staggerElements.length) {
    gsap.fromTo(staggerElements,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.8,
        scrollTrigger: {
          trigger: staggerElements[0].parentElement,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }
}

/**
 * Helper function to check if a form is valid
 * @param {HTMLElement} section - The section containing the form
 * @returns {boolean} - Whether the form is valid
 */
function isFormValid(section) {
  const form = section.querySelector('form');
  if (!form) return false;
  
  const nameInput = form.querySelector('input[name="name"]');
  const emailInput = form.querySelector('input[name="email"]');
  const messageInput = form.querySelector('textarea[name="message"]');
  
  let isValid = true;
  
  // Simple validation
  if (nameInput && nameInput.value.trim() === '') {
    highlightInvalidField(nameInput);
    isValid = false;
  }
  
  if (emailInput) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
      highlightInvalidField(emailInput);
      isValid = false;
    }
  }
  
  if (messageInput && messageInput.value.trim() === '') {
    highlightInvalidField(messageInput);
    isValid = false;
  }
  
  return isValid;
}

/**
 * Helper function to highlight invalid form fields
 * @param {HTMLElement} field - The form field to highlight
 */
function highlightInvalidField(field) {
  gsap.to(field, {
    borderColor: '#ff3860',
    boxShadow: '0 0 0 2px rgba(255, 56, 96, 0.25)',
    duration: 0.3
  });
  
  field.addEventListener('focus', function onFocus() {
    gsap.to(field, {
      borderColor: '',
      boxShadow: '',
      duration: 0.3
    });
    field.removeEventListener('focus', onFocus);
  });
}

// Add CSS for transition overlay and retro cursor
const styleElement = document.createElement('style');
styleElement.textContent = `
  .transition-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 9999;
    pointer-events: none;
    opacity: 0;
  }
  
  .retro-cursor {
    position: absolute;
    width: 10px;
    height: 10px;
    background-color: #0f0;
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    mix-blend-mode: difference;
    transition: opacity 0.3s;
  }
  
  .button-ripple {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0);
    width: 5px;
    height: 5px;
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 50%;
    pointer-events: none;
  }
  
  .audio-visualizer {
    display: flex;
    align-items: flex-end;
    height: 40px;
    gap: 2px;
    margin-top: 10px;
  }
  
  .visualizer-bar {
    width: 4px;
    height: 5px;
    background: linear-gradient(to top, #4a00e0, #8e2de2);
    border-radius: 2px;
  }
  
  .success-message {
    text-align: center;
    padding: 20px;
    color: #28a745;
    font-weight: 500;
  }
`;
document.head.appendChild(styleElement);