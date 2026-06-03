(function () {
  'use strict';

  const lb = document.getElementById('galleryLightbox');
  const lbImg = lb ? lb.querySelector('.gallery-lb__img') : null;
  const lbVideo = lb ? lb.querySelector('.gallery-lb__video') : null;
  const lbCap = lb ? lb.querySelector('.gallery-lb__cap') : null;
  const lbClose = lb ? lb.querySelector('.gallery-lb__close') : null;
  const tiles = document.querySelectorAll('.gallery-tile[data-full-src]');

  function showImage(src, cap) {
    if (!lbImg) return;
    if (lbVideo) {
      lbVideo.pause();
      lbVideo.removeAttribute('src');
      lbVideo.hidden = true;
    }
    lbImg.src = src;
    lbImg.alt = cap || '';
    lbImg.hidden = false;
  }

  function showVideo(src, cap) {
    if (!lbVideo) return;
    if (lbImg) {
      lbImg.removeAttribute('src');
      lbImg.hidden = true;
    }
    lbVideo.src = src;
    lbVideo.hidden = false;
    lbVideo.load();
    lbVideo.play().catch(() => {});
  }

  function openLb(src, cap, type) {
    if (!lb) return;
    if (type === 'video') showVideo(src, cap);
    else showImage(src, cap);
    if (lbCap) lbCap.textContent = cap || '';
    lb.classList.add('is-open');
    lb.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLb() {
    if (!lb) return;
    lb.classList.remove('is-open');
    lb.setAttribute('aria-hidden', 'true');
    if (lbImg) {
      lbImg.removeAttribute('src');
      lbImg.hidden = true;
    }
    if (lbVideo) {
      lbVideo.pause();
      lbVideo.removeAttribute('src');
      lbVideo.hidden = true;
    }
    document.body.style.overflow = '';
  }

  tiles.forEach((tile) => {
    const preview = tile.querySelector('video');
    if (preview) {
      tile.addEventListener('mouseenter', () => { preview.play().catch(() => {}); });
      tile.addEventListener('mouseleave', () => {
        preview.pause();
        preview.currentTime = 0;
      });
    }

    tile.addEventListener('click', () => {
      openLb(
        tile.dataset.fullSrc,
        tile.dataset.caption,
        tile.dataset.mediaType || 'image'
      );
    });
  });

  if (lbClose) lbClose.addEventListener('click', closeLb);
  if (lb) lb.addEventListener('click', (e) => { if (e.target === lb) closeLb(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLb(); });
})();
