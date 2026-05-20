(function () {
  'use strict';

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.reveal, .reveal-fade, .reveal-scale, .reveal-left, .reveal-right')
      .forEach((el) => revealObserver.observe(el));
  } else {
    document.querySelectorAll('.reveal, .reveal-fade, .reveal-scale, .reveal-left, .reveal-right')
      .forEach((el) => el.classList.add('is-visible'));
  }

  document.querySelectorAll('img[data-fallback]').forEach((img, i) => {
    img.addEventListener('error', function once() {
      img.removeEventListener('error', once);
      img.src = `https://picsum.photos/seed/cnc-${i}/900/600`;
    });
  });

  const yr = document.getElementById('currentYear');
  if (yr) yr.textContent = new Date().getFullYear();
})();
