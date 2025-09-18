/**
 * File Upload Component Handler
 *
 * This script provides a comprehensive file upload functionality with the following features:
 * - Drag and drop file upload support
 * - File size validation based on data attributes
 * - File type validation with customizable allowed types
 * - Visual feedback during drag operations
 * - Click-to-upload functionality
 * - Automatic filename display after selection
 *
 * Usage:
 * - Add data-max-size attribute to input for size limit (in MB, default: 5MB)
 * - Add data-allowed-types attribute with JSON array of MIME types for type validation
 * - Ensure each file input has an ID and corresponding filename display element with ID pattern: {inputId}-filename
 *
 * Dependencies: None (Vanilla JavaScript)
 * Browser Support: Modern browsers with File API support
 */

// Wait for DOM to be fully loaded before initializing upload functionality
document.addEventListener("DOMContentLoaded", function () {
  // Find all file input elements on the current page
  const uploadInputs = document.querySelectorAll('input[type="file"]');

  // Initialize upload functionality for each file input found
  uploadInputs.forEach(function (uploadInput) {
    // Get the input's ID to find related elements
    const uploadId = uploadInput.id;
    // Find the span element that will display the selected filename
    const filenameSpan = document.getElementById(uploadId + "-filename");
    // Find the container div that wraps the upload input (for drag/drop area)
    const uploadContainer = uploadInput?.closest("div");

    // Skip initialization if any required elements are missing
    if (!uploadInput || !filenameSpan || !uploadContainer) return;

    /**
     * Handle file selection via input change event
     * Validates file size and type, then updates UI accordingly
     */
    uploadInput.addEventListener("change", function (e) {
      const file = e.target.files?.[0];
      if (file) {
        // File size validation
        // Get max size from data attribute (default 5MB) and convert to bytes
        const maxSize =
          parseInt(uploadInput.dataset.maxSize || "5") * 1024 * 1024;

        if (file.size > maxSize) {
          alert(
            `File size must be less than ${
              uploadInput.dataset.maxSize || "5"
            }MB`
          );
          uploadInput.value = ""; // Clear the input
          return;
        }

        // File type validation
        // Parse allowed types from data attribute (JSON format)
        const allowedTypes = JSON.parse(
          uploadInput.dataset.allowedTypes || "[]"
        );

        if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
          alert(
            `File type not allowed. Allowed types: ${allowedTypes.join(", ")}`
          );
          uploadInput.value = ""; // Clear the input
          return;
        }

        // Update UI to show selected file
        filenameSpan.textContent = file.name;
        uploadContainer.classList.add("border-blue", "bg-blue/5");
      }
    });

    /**
     * Drag and Drop Event Handlers
     * Provide visual feedback and handle file drops
     */

    // Handle dragover event - show visual feedback when file is dragged over
    uploadContainer.addEventListener("dragover", function (e) {
      e.preventDefault(); // Prevent default to allow drop
      uploadContainer.classList.add("border-blue", "bg-blue/5");
    });

    // Handle dragleave event - remove visual feedback when drag leaves area
    uploadContainer.addEventListener("dragleave", function (e) {
      e.preventDefault();
      uploadContainer.classList.remove("border-blue", "bg-blue/5");
    });

    // Handle drop event - process dropped files
    uploadContainer.addEventListener("drop", function (e) {
      e.preventDefault(); // Prevent default file opening behavior
      uploadContainer.classList.remove("border-blue", "bg-blue/5");

      // Get dropped files and assign to input
      const files = e.dataTransfer.files;
      if (files.length > 0) {
        uploadInput.files = files;
        // Trigger change event to run validation and UI updates
        uploadInput.dispatchEvent(new Event("change"));
      }
    });

    /**
     * Click handler to open file dialog
     * Allows users to click anywhere in the container to select files
     */
    uploadContainer.addEventListener("click", function () {
      // Only trigger file dialog if input is not disabled
      if (!uploadInput.disabled) {
        uploadInput.click();
      }
    });
  });
});
