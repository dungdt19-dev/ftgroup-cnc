(function () {
  'use strict';

  const lb = document.getElementById('galleryLightbox');
  const lbImg = lb ? lb.querySelector('.gallery-lb__img') : null;
  const lbCap = lb ? lb.querySelector('.gallery-lb__cap') : null;
  const lbClose = lb ? lb.querySelector('.gallery-lb__close') : null;
  const tiles = document.querySelectorAll('.gallery-tile[data-full-src]');

  function openLb(src, cap) {
    if (!lb || !lbImg) return;
    lbImg.src = src;
    lbImg.alt = cap || '';
    if (lbCap) lbCap.textContent = cap || '';
    lb.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeLb() {
    if (!lb || !lbImg) return;
    lb.classList.remove('is-open');
    lbImg.src = '';
    document.body.style.overflow = '';
  }

  tiles.forEach((tile) => {
    tile.addEventListener('click', () => {
      openLb(tile.dataset.fullSrc, tile.dataset.caption);
    });
  });

  if (lbClose) lbClose.addEventListener('click', closeLb);
  if (lb) lb.addEventListener('click', (e) => { if (e.target === lb) closeLb(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLb(); });
})();
