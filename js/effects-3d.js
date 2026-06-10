(function () {
  'use strict';

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!window.matchMedia('(min-width: 769px)').matches) return;

  const tiltSelectors = '.highlight-card, .machine-card, .blog-card, .hero-pillar';
  const maxTilt = 6;

  document.querySelectorAll(tiltSelectors).forEach((el) => {
    el.classList.add('tilt-3d');

    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      el.classList.add('is-tilting');
      el.style.transform =
        `perspective(var(--perspective)) rotateY(${x * maxTilt}deg) rotateX(${-y * maxTilt}deg) translateY(-6px)`;
    });

    el.addEventListener('mouseleave', () => {
      el.classList.remove('is-tilting');
      el.style.transform = '';
    });
  });
})();
