const descriptionText = document.getElementById("description-text");
const readMoreBtn = document.getElementById("read-more-btn");

// Add line clamp initially
if (descriptionText) {
  descriptionText.classList.add("line-clamp-4");
  // Add click event listener
  readMoreBtn.addEventListener("click", function () {
    if (descriptionText.classList.contains("line-clamp-4")) {
      descriptionText.classList.remove("line-clamp-4");
      readMoreBtn.textContent = "Read less...";
    } else {
      descriptionText.classList.add("line-clamp-4");
      readMoreBtn.textContent = "Read more...";
    }
  });
}

