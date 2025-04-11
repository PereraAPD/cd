document.addEventListener("DOMContentLoaded", () => {
  const timeline = {
    track: document.querySelector(".timeline-track"),
    items: document.querySelectorAll(".timeline-item"),
    prevBtn: document.querySelector(".timeline-nav .prev-btn"),
    nextBtn: document.querySelector(".timeline-nav .next-btn"),
    progressBar: document.querySelector(".timeline-progress-bar"),
    currentIndex: 0,
    itemWidth: 0,
    maxScroll: 0,

    init() {
      // Calculate dimensions
      this.itemWidth = this.items[0].offsetWidth + 30; // Including gap
      this.maxScroll = (this.items.length - 1) * this.itemWidth;

      // Initialize position
      this.updatePosition();
      this.updateProgress();
      this.updateButtons();

      // Add event listeners
      this.prevBtn.addEventListener("click", () => this.navigate("prev"));
      this.nextBtn.addEventListener("click", () => this.navigate("next"));

      // Add touch/drag support
      let startX,
        isDragging = false;
      let currentTranslate = 0;

      this.track.addEventListener("mousedown", this.startDragging.bind(this));
      this.track.addEventListener("touchstart", this.startDragging.bind(this));
      window.addEventListener("mousemove", this.drag.bind(this));
      window.addEventListener("touchmove", this.drag.bind(this));
      window.addEventListener("mouseup", this.endDragging.bind(this));
      window.addEventListener("touchend", this.endDragging.bind(this));

      // Add resize handler
      window.addEventListener("resize", this.handleResize.bind(this));

      // Initialize GSAP animations with improved settings
      this.initAnimations();
    },

    startDragging(e) {
      isDragging = true;
      startX = e.type === "mousedown" ? e.pageX : e.touches[0].pageX;
      currentTranslate = this.getCurrentTranslate();
      this.track.style.cursor = "grabbing";
    },

    drag(e) {
      if (!isDragging) return;
      e.preventDefault();
      const currentX = e.type === "mousemove" ? e.pageX : e.touches[0].pageX;
      const diff = currentX - startX;
      const newTranslate = Math.max(
        Math.min(currentTranslate + diff, 0),
        -this.maxScroll
      );
      this.track.style.transform = `translateX(${newTranslate}px)`;
      this.updateProgressFromPosition(newTranslate);
    },

    endDragging() {
      if (!isDragging) return;
      isDragging = false;
      this.track.style.cursor = "grab";
      const currentTranslate = this.getCurrentTranslate();
      this.currentIndex = Math.round(-currentTranslate / this.itemWidth);
      this.updatePosition();
      this.updateProgress();
      this.updateButtons();
    },

    getCurrentTranslate() {
      const style = window.getComputedStyle(this.track);
      const matrix = new WebKitCSSMatrix(style.transform);
      return matrix.m41;
    },

    navigate(direction) {
      if (direction === "prev" && this.currentIndex > 0) {
        this.currentIndex--;
      } else if (
        direction === "next" &&
        this.currentIndex < this.items.length - 1
      ) {
        this.currentIndex++;
      }
      this.updatePosition();
      this.updateProgress();
      this.updateButtons();
    },

    updatePosition() {
      const position = -this.currentIndex * this.itemWidth;
      gsap.to(this.track, {
        x: position,
        duration: 0.5,
        ease: "power2.out",
      });
    },

    updateProgress() {
      const progress = (this.currentIndex / (this.items.length - 1)) * 100;
      gsap.to(this.progressBar, {
        width: `${progress}%`,
        duration: 0.5,
      });
    },

    updateProgressFromPosition(position) {
      const progress = (-position / this.maxScroll) * 100;
      this.progressBar.style.width = `${progress}%`;
    },

    updateButtons() {
      this.prevBtn.disabled = this.currentIndex === 0;
      this.nextBtn.disabled = this.currentIndex === this.items.length - 1;
    },

    handleResize() {
      // Recalculate dimensions
      this.itemWidth = this.items[0].offsetWidth + 30;
      this.maxScroll = (this.items.length - 1) * this.itemWidth;
      this.updatePosition();
    },

    initAnimations() {
      // Set up ScrollTrigger for the timeline section
      gsap.from(".timeline-section", {
        scrollTrigger: {
          trigger: ".timeline-section",
          start: "top bottom-=100",
          end: "bottom top+=100",
          toggleActions: "play none none reverse",
          markers: false,
        },
        opacity: 1, // Changed from 0 to ensure visibility
        duration: 0.8,
      });

      // Animate timeline items with improved trigger points
      this.items.forEach((item, index) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: "top bottom-=50",
            end: "bottom top",
            toggleActions: "play none none reverse",
            markers: false,
          },
          opacity: 0,
          y: 30,
          duration: 0.6,
          delay: index * 0.1,
          ease: "power2.out",
        });
      });
    },
  };

  // Initialize timeline
  timeline.init();
});
