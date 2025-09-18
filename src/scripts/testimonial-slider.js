/**
 * Testimonial Slider Component
 *
 * A responsive carousel/slider component for displaying testimonials with the following features:
 * - Automatic slideshow with configurable timing
 * - Manual navigation with previous/next buttons
 * - Smooth fade transitions between slides
 * - Hover-to-pause functionality
 * - Click protection to prevent rapid navigation
 * - Circular navigation (loops back to first slide after last)
 *
 * Required HTML Structure:
 * - Container with ID "testimonial-slider"
 * - Slide elements with class "testimonial-slide"
 * - Navigation buttons with IDs "prev-btn" and "next-btn"
 *
 * Dependencies: None (Vanilla JavaScript)
 * Styling: Requires Tailwind CSS classes for opacity transitions
 */

class TestimonialSlider {
  /**
   * Initialize the testimonial slider with default settings
   * Sets up DOM references and configuration parameters
   */
  constructor() {
    // DOM element references
    this.slides = document.querySelectorAll(".testimonial-slide");
    this.prevBtn = document.getElementById("prev-btn");
    this.nextBtn = document.getElementById("next-btn");

    // Slider state management
    this.currentSlide = 0;
    this.totalSlides = this.slides.length;
    this.autoplayInterval = null;
    this.autoplayDelay = 3000; // 3 seconds between auto transitions
    this.isTransitioning = false; // Prevents overlapping transitions
    this.clickDelay = 800; // Minimum delay between manual navigation clicks

    // Initialize the slider functionality
    this.init();
  }

  /**
   * Initialize slider functionality
   * Sets up event listeners and starts autoplay
   */
  init() {
    // Set up navigation button event listeners
    this.prevBtn?.addEventListener("click", () => this.prevSlide());
    this.nextBtn?.addEventListener("click", () => this.nextSlide());

    // Set up hover behavior - pause autoplay when user hovers over slider
    const sliderContainer = document.getElementById("testimonial-slider");
    sliderContainer?.addEventListener("mouseenter", () => this.pauseAutoplay());
    sliderContainer?.addEventListener("mouseleave", () => this.startAutoplay());

    // Begin automatic slideshow
    this.startAutoplay();
  }

  /**
   * Display a specific slide by index
   * Handles transition animations and prevents rapid clicking
   * @param {number} index - The index of the slide to show (0-based)
   */
  showSlide(index) {
    // Prevent multiple rapid transitions
    if (this.isTransitioning) {
      return;
    }

    // Set transition flag to prevent overlapping animations
    this.isTransitioning = true;

    // Disable navigation buttons during transition
    this.disableButtons();

    // Hide all slides by removing visible opacity
    this.slides.forEach((slide) => {
      slide.classList.remove("opacity-100");
      slide.classList.add("opacity-0");
    });

    // Show the target slide by adding visible opacity
    this.slides[index].classList.remove("opacity-0");
    this.slides[index].classList.add("opacity-100");

    // Update current slide tracker
    this.currentSlide = index;

    // Re-enable navigation after transition completes
    setTimeout(() => {
      this.isTransitioning = false;
      this.enableButtons();
    }, this.clickDelay);
  }

  /**
   * Navigate to the next slide
   * Uses modulo arithmetic for circular navigation
   */
  nextSlide() {
    const nextIndex = (this.currentSlide + 1) % this.totalSlides;
    this.showSlide(nextIndex);
  }

  /**
   * Navigate to the previous slide
   * Uses modulo arithmetic for circular navigation (wraps to last slide)
   */
  prevSlide() {
    const prevIndex =
      (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
    this.showSlide(prevIndex);
  }

  /**
   * Disable navigation buttons during transitions
   * Applies visual feedback and prevents interaction
   */
  disableButtons() {
    this.prevBtn?.classList.add(
      "opacity-50", // Visual feedback - reduced opacity
      "cursor-not-allowed", // Cursor indicates disabled state
      "pointer-events-none" // Completely disable click events
    );
    this.nextBtn?.classList.add(
      "opacity-50",
      "cursor-not-allowed",
      "pointer-events-none"
    );
  }

  /**
   * Re-enable navigation buttons after transitions
   * Removes disabled styling and restores interactivity
   */
  enableButtons() {
    this.prevBtn?.classList.remove(
      "opacity-50",
      "cursor-not-allowed",
      "pointer-events-none"
    );
    this.nextBtn?.classList.remove(
      "opacity-50",
      "cursor-not-allowed",
      "pointer-events-none"
    );
  }

  /**
   * Start automatic slideshow
   * Clears any existing interval before creating new one
   */
  startAutoplay() {
    this.pauseAutoplay(); // Ensure no duplicate intervals
    this.autoplayInterval = setInterval(() => {
      // Only advance if not currently transitioning
      if (!this.isTransitioning) {
        this.nextSlide();
      }
    }, this.autoplayDelay);
  }

  /**
   * Pause automatic slideshow
   * Clears the autoplay interval and resets reference
   */
  pauseAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
      this.autoplayInterval = null;
    }
  }

  /**
   * Public method to restart autoplay
   * Useful for external control or after manual intervention
   */
  restartAutoplay() {
    this.startAutoplay();
  }
}

// Initialize the testimonial slider when DOM content is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  new TestimonialSlider();
});
