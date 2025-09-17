const copyButtons = document.querySelectorAll(".copy-btn");

copyButtons.forEach((button) => {
  button.addEventListener("click", async function () {
    const accountNumber = this.getAttribute("data-account");
    const originalText = this.textContent;

    try {
      await navigator.clipboard.writeText(accountNumber);

      // Change text to "Copy Success"
      this.textContent = "Copied";
      this.classList.add("text-green-600");

      // Reset after 2 seconds
      setTimeout(() => {
        this.textContent = originalText;
        this.classList.remove("text-green-600");
      }, 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = accountNumber;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);

      // Change text to "Copy Success"
      this.textContent = "Copied";
      this.classList.add("text-green-600");

      // Reset after 2 seconds
      setTimeout(() => {
        this.textContent = originalText;
        this.classList.remove("text-green-600");
      }, 2000);
    }
  });
});
