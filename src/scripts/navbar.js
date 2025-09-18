/**
 * Navigation Bar Component
 *
 * This script handles responsive navigation functionality with the following features:
 * - Mobile drawer/sidebar navigation with smooth animations
 * - Animated hamburger menu icon (transforms to X when open)
 * - Auto-hiding navbar on scroll down, shows on scroll up
 * - Keyboard accessibility (ESC key to close drawer)
 * - Click-outside-to-close functionality
 * - Auto-close drawer when navigation links are clicked
 * - Performance-optimized scroll handling using requestAnimationFrame
 *
 * Required HTML Structure:
 * - Navbar container with ID "navbar"
 * - Mobile menu button with ID "mobile-menu-button"
 * - Close drawer button with ID "close-drawer-button"
 * - Drawer backdrop with ID "drawer-backdrop"
 * - Mobile drawer with ID "mobile-drawer"
 * - Hamburger lines with IDs "line1", "line2", "line3"
 *
 * Dependencies: None (Vanilla JavaScript)
 * Styling: Requires Tailwind CSS classes for transforms and transitions
 */

// ===== MOBILE DRAWER FUNCTIONALITY =====

// Get references to all drawer-related DOM elements
const mobileMenuButton = document.getElementById("mobile-menu-button");
const closeDrawerButton = document.getElementById("close-drawer-button");
const drawerBackdrop = document.getElementById("drawer-backdrop");
const mobileDrawer = document.getElementById("mobile-drawer");

// Get references to hamburger menu lines for animation
const line1 = document.getElementById("line1");
const line2 = document.getElementById("line2");
const line3 = document.getElementById("line3");

/**
 * Opens the mobile navigation drawer
 * - Slides drawer in from left side
 * - Shows backdrop overlay
 * - Prevents body scrolling
 * - Animates hamburger icon to X shape
 */
function openDrawer() {
  // Slide drawer into view by removing negative translate
  mobileDrawer.classList.remove("-translate-x-full");

  // Show backdrop with fade-in effect
  drawerBackdrop.classList.remove("opacity-0", "pointer-events-none");
  drawerBackdrop.classList.add("opacity-100", "pointer-events-auto");

  // Prevent background scrolling when drawer is open
  document.body.style.overflow = "hidden";

  // Animate hamburger icon to X shape
  line1.style.transform = "rotate(45deg) translate(5px, 5px)"; // Top line rotates and moves
  line2.style.opacity = "0"; // Middle line fades out
  line3.style.transform = "rotate(-45deg) translate(7px, -6px)"; // Bottom line rotates and moves
}

/**
 * Closes the mobile navigation drawer
 * - Slides drawer out to left side
 * - Hides backdrop overlay
 * - Restores body scrolling
 * - Resets hamburger icon to original state
 */
function closeDrawer() {
  // Hide drawer by adding negative translate
  mobileDrawer.classList.add("-translate-x-full");

  // Hide backdrop with fade-out effect
  drawerBackdrop.classList.remove("opacity-100", "pointer-events-auto");
  drawerBackdrop.classList.add("opacity-0", "pointer-events-none");

  // Restore normal body scrolling
  document.body.style.overflow = "";

  // Reset hamburger icon to original state
  line1.style.transform = ""; // Reset top line
  line2.style.opacity = ""; // Reset middle line
  line3.style.transform = ""; // Reset bottom line
}

// ===== DRAWER EVENT LISTENERS =====

// Open drawer when mobile menu button is clicked
mobileMenuButton?.addEventListener("click", openDrawer);

// Close drawer when close button is clicked
closeDrawerButton?.addEventListener("click", closeDrawer);

// Close drawer when backdrop (overlay) is clicked
drawerBackdrop?.addEventListener("click", closeDrawer);

/**
 * Close drawer when ESC key is pressed
 * Only triggers if drawer is currently open
 */
document.addEventListener("keydown", (e) => {
  if (
    e.key === "Escape" &&
    !mobileDrawer.classList.contains("-translate-x-full")
  ) {
    closeDrawer();
  }
});

/**
 * Auto-close drawer when navigation links are clicked
 * Improves UX by automatically hiding mobile menu after navigation
 */
const drawerLinks = mobileDrawer?.querySelectorAll("nav a");
drawerLinks?.forEach((link) => {
  link.addEventListener("click", closeDrawer);
});

// ===== NAVBAR SCROLL BEHAVIOR =====

// Scroll tracking variables
let lastScrollY = window.scrollY; // Store previous scroll position
let ticking = false; // Throttle scroll events using RAF
const navbar = document.getElementById("navbar");

/**
 * Updates navbar visibility based on scroll direction
 * - Hides navbar when scrolling down (after 50px threshold)
 * - Shows navbar when scrolling up
 * - Uses transform for smooth hardware-accelerated animations
 */
function updateNavbar() {
  const currentScrollY = window.scrollY;

  // Check scroll direction and position
  if (currentScrollY > lastScrollY && currentScrollY > 50) {
    // Scrolling down and past threshold - hide navbar
    navbar?.classList.add("-translate-y-full");
  } else {
    // Scrolling up or at top - show navbar
    navbar?.classList.remove("-translate-y-full");
  }

  // Update scroll position tracking
  lastScrollY = currentScrollY;
  ticking = false; // Reset throttling flag
}

/**
 * Throttles scroll events using requestAnimationFrame
 * Prevents excessive function calls during scroll for better performance
 */
function requestTick() {
  if (!ticking) {
    requestAnimationFrame(updateNavbar);
    ticking = true;
  }
}

// ===== SCROLL EVENT INITIALIZATION =====

/**
 * Add optimized scroll event listener
 * - Uses passive flag for better scroll performance
 * - Throttled with requestAnimationFrame to prevent performance issues
 */
window.addEventListener("scroll", requestTick, { passive: true });
