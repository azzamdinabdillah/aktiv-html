class TestimonialSlider {
  constructor() {
    this.slides = document.querySelectorAll(".testimonial-slide");
    this.prevBtn = document.getElementById("prev-btn");
    this.nextBtn = document.getElementById("next-btn");
    this.currentSlide = 0;
    this.totalSlides = this.slides.length;
    this.autoplayInterval = null;
    this.autoplayDelay = 3000; // 2 seconds
    this.isTransitioning = false;
    this.clickDelay = 800; // 800ms delay between clicks

    this.init();
  }

  init() {
    // Event listeners
    this.prevBtn?.addEventListener("click", () => this.prevSlide());
    this.nextBtn?.addEventListener("click", () => this.nextSlide());

    // Pause autoplay on hover
    const sliderContainer = document.getElementById("testimonial-slider");
    sliderContainer?.addEventListener("mouseenter", () => this.pauseAutoplay());
    sliderContainer?.addEventListener("mouseleave", () => this.startAutoplay());

    // Start autoplay
    this.startAutoplay();
  }

  showSlide(index) {
    // Prevent multiple rapid clicks
    if (this.isTransitioning) {
      return;
    }

    this.isTransitioning = true;

    // Disable buttons during transition
    this.disableButtons();

    // Hide all slides
    this.slides.forEach((slide) => {
      slide.classList.remove("opacity-100");
      slide.classList.add("opacity-0");
    });

    // Show current slide
    this.slides[index].classList.remove("opacity-0");
    this.slides[index].classList.add("opacity-100");

    this.currentSlide = index;

    // Reset transition flag and enable buttons after animation completes
    setTimeout(() => {
      this.isTransitioning = false;
      this.enableButtons();
    }, this.clickDelay);
  }

  nextSlide() {
    const nextIndex = (this.currentSlide + 1) % this.totalSlides;
    this.showSlide(nextIndex);
  }

  prevSlide() {
    const prevIndex =
      (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
    this.showSlide(prevIndex);
  }

  disableButtons() {
    this.prevBtn?.classList.add(
      "opacity-50",
      "cursor-not-allowed",
      "pointer-events-none"
    );
    this.nextBtn?.classList.add(
      "opacity-50",
      "cursor-not-allowed",
      "pointer-events-none"
    );
  }

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

  startAutoplay() {
    this.pauseAutoplay(); // Clear any existing interval
    this.autoplayInterval = setInterval(() => {
      // Only autoplay if not transitioning
      if (!this.isTransitioning) {
        this.nextSlide();
      }
    }, this.autoplayDelay);
  }

  pauseAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
      this.autoplayInterval = null;
    }
  }

  // Public method to restart autoplay (useful for external control)
  restartAutoplay() {
    this.startAutoplay();
  }
}

// Initialize slider when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new TestimonialSlider();
});
