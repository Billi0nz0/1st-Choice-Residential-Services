const fadeElements = document.querySelectorAll('.fade-on-scroll');

function checkFade() {
  fadeElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 50) {
      el.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', checkFade);
window.addEventListener('load', checkFade);
