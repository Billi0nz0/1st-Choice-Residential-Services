const popup = document.getElementById("popupForm");
const openBtn = document.getElementById("CTO");
const closeBtn = document.querySelector(".close-btn");

// Open popup
if (openBtn) {
  openBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (popup) popup.style.display = "flex";
  });
}

// Close popup
if (closeBtn) {
  closeBtn.addEventListener("click", () => {
    if (popup) popup.style.display = "none";
  });
}

// Close when clicking outside popup
window.addEventListener("click", (e) => {
  if (popup && e.target === popup) popup.style.display = "none";
});
