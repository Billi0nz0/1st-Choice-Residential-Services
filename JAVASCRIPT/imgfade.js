const heroSection = document.querySelector('.hero');
  const overlay = document.createElement('div');
  overlay.classList.add('fade-layer');
  heroSection.appendChild(overlay);

  const images = [
    '../ASSETS/hero/1.jpg',
    '../ASSETS/hero/2.jpg',
    '../ASSETS/hero/3.jpg'
  ];

  let index = 0;

  function changeBackground() {
    // Set up fading overlay
    heroSection.style.setProperty('--next-bg', `url(${images[index]})`);
    heroSection.style.backgroundImage = `url(${images[index]})`;

    // Animate fade-in using ::before
    heroSection.classList.add('fade');
    setTimeout(() => heroSection.classList.remove('fade'), 1500);

    index = (index + 1) % images.length;
  }

  // CSS for fade effect
  const style = document.createElement('style');
  style.innerHTML = `
    .hero.fade::before {
      background-image: var(--next-bg);
      opacity: 1;
    }
  `;
  document.head.appendChild(style);

  // Initial background
  heroSection.style.backgroundImage = `url(${images[0]})`;

  // Start rotation
  setInterval(changeBackground, 6000);
setInterval(changeBackground, 6000);