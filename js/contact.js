(function () {
  'use strict';

  const form = document.getElementById('quoteForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('[name="name"]')?.value?.trim() || '';
    const phone = form.querySelector('[name="phone"]')?.value?.trim() || '';
    const service = form.querySelector('[name="service"]')?.value || '';
    const note = form.querySelector('[name="note"]')?.value?.trim() || '';
    const hotline = form.dataset.hotline || '0964236197';
    const msg = [
      'Xin chào, tôi cần báo giá:',
      name ? `Họ tên: ${name}` : '',
      phone ? `SĐT: ${phone}` : '',
      service ? `Dịch vụ: ${service}` : '',
      note ? `Yêu cầu: ${note}` : ''
    ].filter(Boolean).join('\n');
    const zaloUrl = `https://zalo.me/${hotline.replace(/\D/g, '')}?text=${encodeURIComponent(msg)}`;
    window.open(zaloUrl, '_blank', 'noopener');
  });
})();
