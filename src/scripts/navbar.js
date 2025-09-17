// Mobile drawer functionality
const mobileMenuButton = document.getElementById("mobile-menu-button");
const closeDrawerButton = document.getElementById("close-drawer-button");
const drawerBackdrop = document.getElementById("drawer-backdrop");
const mobileDrawer = document.getElementById("mobile-drawer");
const line1 = document.getElementById("line1");
const line2 = document.getElementById("line2");
const line3 = document.getElementById("line3");

function openDrawer() {
  mobileDrawer.classList.remove("-translate-x-full");
  drawerBackdrop.classList.remove("opacity-0", "pointer-events-none");
  drawerBackdrop.classList.add("opacity-100", "pointer-events-auto");
  document.body.style.overflow = "hidden";

  // Animate hamburger to X
  line1.style.transform = "rotate(45deg) translate(5px, 5px)";
  line2.style.opacity = "0";
  line3.style.transform = "rotate(-45deg) translate(7px, -6px)";
}

function closeDrawer() {
  mobileDrawer.classList.add("-translate-x-full");
  drawerBackdrop.classList.remove("opacity-100", "pointer-events-auto");
  drawerBackdrop.classList.add("opacity-0", "pointer-events-none");
  document.body.style.overflow = "";

  // Reset hamburger animation
  line1.style.transform = "";
  line2.style.opacity = "";
  line3.style.transform = "";
}

// Event listeners
mobileMenuButton?.addEventListener("click", openDrawer);
closeDrawerButton?.addEventListener("click", closeDrawer);
drawerBackdrop?.addEventListener("click", closeDrawer);

// Close drawer on escape key
document.addEventListener("keydown", (e) => {
  if (
    e.key === "Escape" &&
    !mobileDrawer.classList.contains("-translate-x-full")
  ) {
    closeDrawer();
  }
});

// Close drawer when clicking on navigation links
const drawerLinks = mobileDrawer?.querySelectorAll("nav a");
drawerLinks?.forEach((link) => {
  link.addEventListener("click", closeDrawer);
});

// Navbar scroll behavior
let lastScrollY = window.scrollY;
let ticking = false;
const navbar = document.getElementById("navbar");

function updateNavbar() {
  const currentScrollY = window.scrollY;

  if (currentScrollY > lastScrollY && currentScrollY > 50) {
    // Scrolling down - hide navbar
    navbar?.classList.add("-translate-y-full");
  } else {
    // Scrolling up - show navbar
    navbar?.classList.remove("-translate-y-full");
  }

  lastScrollY = currentScrollY;
  ticking = false;
}

function requestTick() {
  if (!ticking) {
    requestAnimationFrame(updateNavbar);
    ticking = true;
  }
}

// Add scroll event listener
window.addEventListener("scroll", requestTick, { passive: true });
