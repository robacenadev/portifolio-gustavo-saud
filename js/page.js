/* page.js — scroll reveal + cursor para páginas internas */
(function () {
  'use strict';

  /* ── LIGHTBOX ── */
  (function lightbox() {
    const lb = document.getElementById('lightbox');
    const lbImg = document.getElementById('lightbox-img');
    if (!lb || !lbImg) return;
    document.querySelectorAll('.ss-card, .cert-card').forEach(card => {
      card.addEventListener('click', () => {
        lbImg.src = card.dataset.src;
        lb.classList.add('show');
        document.body.style.overflow = 'hidden';
      });
    });
    lb.addEventListener('click', e => {
      if (e.target === lb || e.target.classList.contains('lightbox-close')) {
        lb.classList.remove('show');
        document.body.style.overflow = '';
      }
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && lb.classList.contains('show')) {
        lb.classList.remove('show');
        document.body.style.overflow = '';
      }
    });
  })();

  /* ── CURSOR ── */
  (function cursor() {
    const dot = document.getElementById('cdot');
    const ring = document.getElementById('cring');
    if (!dot || !ring) return;
    document.addEventListener('mousemove', e => {
      dot.style.left = e.clientX + 'px';
      dot.style.top = e.clientY + 'px';
      ring.style.left = e.clientX + 'px';
      ring.style.top = e.clientY + 'px';
    });
    document.querySelectorAll('a, button, .btn, .cb, .page-stag, .page-link').forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('hover'));
      el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
    });
  })();

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const d = parseFloat(e.target.style.transitionDelay || 0) * 1000;
      setTimeout(() => e.target.classList.add('vis'), d);
      obs.unobserve(e.target);
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.reveal, .reveal-left').forEach(el => obs.observe(el));
})();