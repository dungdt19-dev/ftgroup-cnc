(function () {
  'use strict';

  const grid = document.getElementById('blogGrid');
  const listing = document.getElementById('blogListing');
  const filters = document.getElementById('blogFilters');
  if (!grid && !listing) return;

  const base = document.body.dataset.blogBase || '';
  const dataUrl = base + 'blog/data/posts.json';

  function fmtDate(iso) {
    try {
      return new Date(iso + 'T12:00:00').toLocaleDateString('vi-VN', {
        day: '2-digit', month: '2-digit', year: 'numeric'
      });
    } catch (_) { return iso; }
  }

  function imgSrc(post) {
    const path = post.image || '';
    if (path.startsWith('http') || path.startsWith('../')) return path;
    return (base || '') + path;
  }

  function articleUrl(slug) {
    return (base || '') + 'blog/' + slug + '.html';
  }

  function cardHtml(post) {
    return `
      <a href="${articleUrl(post.slug)}" class="blog-card reveal tilt-3d">
        <div class="blog-card__img">
          <img src="${imgSrc(post)}" alt="${post.imageAlt || post.title}" loading="lazy" width="640" height="400">
          <span class="blog-card__cat">${post.category}</span>
        </div>
        <div class="blog-card__body">
          <div class="blog-card__meta">
            <time datetime="${post.date}">${fmtDate(post.date)}</time>
            <span>${post.readTime}</span>
          </div>
          <h3>${post.title}</h3>
          <p>${post.excerpt}</p>
          <span class="blog-card__more">Đọc tiếp →</span>
        </div>
      </a>`;
  }

  function renderPosts(posts, target) {
    if (!target || !posts.length) return;
    target.innerHTML = posts.map(cardHtml).join('');
    if (window.IntersectionObserver) {
      target.querySelectorAll('.reveal').forEach((el) => {
        const obs = new IntersectionObserver((entries, o) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              o.unobserve(entry.target);
            }
          });
        }, { threshold: 0.1 });
        obs.observe(el);
      });
    } else {
      target.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
    }
  }

  fetch(dataUrl)
    .then((r) => r.json())
    .then((data) => {
      const posts = (data.posts || []).slice().sort((a, b) => b.date.localeCompare(a.date));

      if (grid) {
        const featured = posts.filter((p) => p.featured).slice(0, 3);
        renderPosts(featured.length ? featured : posts.slice(0, 3), grid);
      }

      if (listing) {
        let active = 'Tất cả';
        const cats = ['Tất cả', ...new Set(posts.map((p) => p.category))];

        if (filters) {
          filters.innerHTML = cats.map((c) =>
            `<button type="button" class="blog-filter-btn${c === active ? ' is-active' : ''}" data-cat="${c}">${c}</button>`
          ).join('');
          filters.addEventListener('click', (e) => {
            const btn = e.target.closest('.blog-filter-btn');
            if (!btn) return;
            active = btn.dataset.cat;
            filters.querySelectorAll('.blog-filter-btn').forEach((b) => {
              b.classList.toggle('is-active', b.dataset.cat === active);
            });
            const filtered = active === 'Tất cả' ? posts : posts.filter((p) => p.category === active);
            renderPosts(filtered, listing);
          });
        }

        renderPosts(posts, listing);
      }
    })
    .catch(() => {
      if (grid) grid.innerHTML = '<p class="section-lede">Đang cập nhật bài viết…</p>';
    });
})();
