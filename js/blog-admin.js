(function () {
  'use strict';

  const form = document.getElementById('adminForm');
  const jsonOut = document.getElementById('jsonOutput');
  const listEl = document.getElementById('adminPostList');
  if (!form) return;

  function slugify(text) {
    return text
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }

  function buildEntry(data) {
    return {
      id: data.slug,
      slug: data.slug,
      title: data.title,
      excerpt: data.excerpt,
      metaTitle: data.metaTitle || data.title,
      metaDescription: data.metaDescription || data.excerpt,
      keywords: data.keywords.split(',').map((k) => k.trim()).filter(Boolean),
      category: data.category,
      image: data.image,
      imageAlt: data.imageAlt,
      date: data.date,
      featured: data.featured === 'true',
      readTime: data.readTime || '5 phút'
    };
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const data = Object.fromEntries(fd.entries());
    if (!data.slug && data.title) data.slug = slugify(data.title);
    const entry = buildEntry(data);
    jsonOut.value = JSON.stringify(entry, null, 2);
    jsonOut.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

  document.getElementById('genSlug')?.addEventListener('click', () => {
    const title = form.querySelector('[name="title"]').value;
    form.querySelector('[name="slug"]').value = slugify(title);
  });

  fetch('data/posts.json')
    .then((r) => r.json())
    .then((data) => {
      if (!listEl) return;
      listEl.innerHTML = (data.posts || [])
        .sort((a, b) => b.date.localeCompare(a.date))
        .map((p) => `
          <div class="admin-field" style="padding:12px;border:1px solid var(--glass-border);border-radius:var(--radius-sm);margin-bottom:10px">
            <strong style="color:var(--color-white-warm)">${p.title}</strong><br>
            <span style="font-size:0.8rem;color:var(--color-white-mute)">${p.date} · ${p.category} · ${p.slug}.html</span>
          </div>`)
        .join('');
    })
    .catch(() => { if (listEl) listEl.textContent = 'Không tải được danh sách bài viết.'; });
})();
