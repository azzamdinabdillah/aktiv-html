// Initialize upload functionality for all upload components
document.addEventListener("DOMContentLoaded", function () {
  // Find all upload inputs on the page
  const uploadInputs = document.querySelectorAll('input[type="file"]');

  uploadInputs.forEach(function (uploadInput) {
    const uploadId = uploadInput.id;
    const filenameSpan = document.getElementById(uploadId + "-filename");
    const uploadContainer = uploadInput?.closest("div");

    if (!uploadInput || !filenameSpan || !uploadContainer) return;

    // Handle file selection
    uploadInput.addEventListener("change", function (e) {
      const file = e.target.files?.[0];
      if (file) {
        // Validate file size
        const maxSize =
          parseInt(uploadInput.dataset.maxSize || "5") * 1024 * 1024; // Convert MB to bytes
        if (file.size > maxSize) {
          alert(
            `File size must be less than ${
              uploadInput.dataset.maxSize || "5"
            }MB`
          );
          uploadInput.value = "";
          return;
        }

        // Validate file type
        const allowedTypes = JSON.parse(
          uploadInput.dataset.allowedTypes || "[]"
        );
        if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
          alert(
            `File type not allowed. Allowed types: ${allowedTypes.join(", ")}`
          );
          uploadInput.value = "";
          return;
        }

        filenameSpan.textContent = file.name;
        uploadContainer.classList.add("border-blue", "bg-blue/5");
      }
    });

    // Handle drag and drop
    uploadContainer.addEventListener("dragover", function (e) {
      e.preventDefault();
      uploadContainer.classList.add("border-blue", "bg-blue/5");
    });

    uploadContainer.addEventListener("dragleave", function (e) {
      e.preventDefault();
      uploadContainer.classList.remove("border-blue", "bg-blue/5");
    });

    uploadContainer.addEventListener("drop", function (e) {
      e.preventDefault();
      uploadContainer.classList.remove("border-blue", "bg-blue/5");

      const files = e.dataTransfer.files;
      if (files.length > 0) {
        uploadInput.files = files;
        uploadInput.dispatchEvent(new Event("change"));
      }
    });

    // Handle click to open file dialog
    uploadContainer.addEventListener("click", function () {
      if (!uploadInput.disabled) {
        uploadInput.click();
      }
    });
  });
});
