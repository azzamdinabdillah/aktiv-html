/**
 * Automatically fixes href attributes for links starting with specified path
 * by adding .html extension according to specific rules
 *
 * Examples:
 * - href="/src/pages/view-booking" → href="/src/pages/view-booking.html"
 * - href="/src/pages" → href="/src/pages/index.html"
 * - href="/src/pages/view-booking#test" → href="/src/pages/view-booking.html#test"
 * - href="/src/pages#workshop" → href="/src/pages/index.html#workshop"
 */

// Configuration - change this path as needed
const BASE_PATH = "/aktiv/src/pages";

function fixAllHrefs() {
  // Get all elements with href attribute starting with base path
  const allLinks = document.querySelectorAll(`a[href^="${BASE_PATH}"]`);

  allLinks.forEach((link) => {
    const originalHref = link.getAttribute("href");
    const newHref = transformHref(originalHref);

    if (originalHref !== newHref) {
      link.setAttribute("href", newHref);
    }
  });
}

/**
 * Transform href according to specified rules
 * @param {string} href - original href value
 * @returns {string} transformed href with .html extension
 */
function transformHref(href) {
  // Skip if href already contains .html
  if (href.includes(".html")) {
    return href;
  }

  // Check for hash symbol (#)
  const hashIndex = href.indexOf("#");

  if (hashIndex !== -1) {
    // Has hash symbol
    const beforeHash = href.substring(0, hashIndex);
    const afterHash = href.substring(hashIndex);

    // Check if only hash after base path
    if (beforeHash === BASE_PATH) {
      // href="/src/pages#workshop" → href="/src/pages/index.html#workshop"
      return BASE_PATH + "/index.html" + afterHash;
    } else {
      // href="/src/pages/view-booking#test" → href="/src/pages/view-booking.html#test"
      return beforeHash + ".html" + afterHash;
    }
  } else {
    // No hash symbol
    if (href === BASE_PATH) {
      // href="/src/pages" → href="/src/pages/index.html"
      return BASE_PATH + "/index.html";
    } else {
      // href="/src/pages/view-booking" → href="/src/pages/view-booking.html"
      return href + ".html";
    }
  }
}

// Run function when DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  fixAllHrefs();
});

// Export functions for manual usage if needed
window.fixAllHrefs = fixAllHrefs;
window.transformHref = transformHref;
