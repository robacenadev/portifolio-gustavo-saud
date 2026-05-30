/* main.js — index page: Typed.js · contadores · carrossel · reveal · nav · cursor */
(function () {
  'use strict';

  /* ── CONTACT OBFUSCATION ── */
  (function contact() {
    const u = 'gusaud', d = 'hotmail.com';
    const el = document.getElementById('email-link');
    const ev = document.getElementById('email-val');
    if (el && ev) { el.href = 'mailto:' + u + '@' + d; ev.textContent = u + '@' + d; }
    const p = ['+','5','5','3','1','9','9','2','1','0','9','1','1','3'];
    const pl = document.getElementById('phone-link');
    const pv = document.getElementById('phone-val');
    if (pl && pv) { pl.href = 'tel:' + p.join(''); pv.textContent = '(31) 99210-9113'; }
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
    document.querySelectorAll('a, button, .btn, .cb, .skill-item, .tech-badge').forEach(el => {
      el.addEventListener('mouseenter', () => dot.style.color = '#fff');
      el.addEventListener('mouseleave', () => dot.style.color = '');
    });
  })();

  /* ── MOBILE MENU ── */
  (function menu() {
    const btn = document.getElementById('menu-btn');
    const links = document.getElementById('nav-links');
    const overlay = document.getElementById('menu-overlay');
    if (!btn || !links || !overlay) return;
    function close() { links.classList.remove('open'); overlay.classList.remove('show'); document.body.style.overflow = ''; }
    btn.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      overlay.classList.toggle('show', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    overlay.addEventListener('click', close);
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
  })();

  /* ── LIGHTBOX ── */
  (function lightbox() {
    const lb = document.getElementById('lightbox');
    const lbImg = document.getElementById('lightbox-img');
    if (!lb || !lbImg) return;
    document.querySelectorAll('.cert-card').forEach(card => {
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

  /* ── TYPED ── */
  const typedEl = document.getElementById('typed-tag');
  if (typedEl && window.Typed) {
    new Typed('#typed-tag', {
      strings: ['Backend Dev', 'DevOps', 'NOC Analyst', 'Django Dev', 'Docker Lover'],
      typeSpeed: 70, backSpeed: 35, backDelay: 1800, loop: true,
    });
  }

  /* ── COUNTER ── */
  function countUp(el) {
    const target = parseFloat(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const dur = 1400, t0 = Date.now();
    (function tick() {
      const p = Math.min((Date.now() - t0) / dur, 1);
      const e = 1 - Math.pow(1 - p, 3);
      el.textContent = (p < 1 ? Math.floor(target * e) : target) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    })();
  }

  /* ── SCROLL REVEAL ── */
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const d = parseFloat(e.target.style.transitionDelay || 0) * 1000;
      setTimeout(() => {
        e.target.classList.add('vis');
        e.target.querySelectorAll('[data-target]').forEach(countUp);
      }, d);
      obs.unobserve(e.target);
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.reveal, .reveal-left').forEach(el => obs.observe(el));

  setTimeout(() => {
    document.querySelectorAll('#hero .reveal, #hero .reveal-left').forEach(el => {
      const d = parseFloat(el.style.transitionDelay || 0) * 1000;
      setTimeout(() => {
        el.classList.add('vis');
        el.querySelectorAll('[data-target]').forEach(countUp);
      }, d);
    });
  }, 120);

  /* ── NAV ACTIVE ── */
  document.querySelectorAll('section[id]').forEach(section => {
    new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) return;
      document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
      const l = document.querySelector(`.nav-links a[href="#${section.id}"]`);
      if (l) l.classList.add('active');
    }, { threshold: 0.35 }).observe(section);
  });

  /* ── CAROUSEL ── */
  const PROJECTS = [
    { num:'01', badge:'EM PRODUÇÃO', name:'Growth Ocean — CRM & ERP',        desc:'Sistema completo de gestão para agência de marketing digital.', url:'proj/growth-ocean.html' },
    { num:'02', badge:'EM PRODUÇÃO', name:'Multi-Cloud Billing',              desc:'Gestão centralizada de custos AWS, Azure e Huawei Cloud.',       url:'proj/billing.html' },
    { num:'03', badge:'PROJETO PESSOAL', name:'Saud Homelab',                 desc:'Monitoramento com Zabbix e alertas via Telegram Bot API.',       url:'proj/homelab.html' },
    { num:'04', badge:'DESAFIO TÉCNICO', name:'Transparência Bot',            desc:'Bot RPA para consulta no Portal da Transparência Gov.BR.',       url:'proj/transparencia.html' },
  ];

  const track = document.getElementById('carousel-track');
  const dotsEl = document.getElementById('carousel-dots');
  if (!track) return;

  let current = 0, paused = false;

  PROJECTS.forEach((p, i) => {
    const slide = document.createElement('a');
    slide.className = 'proj-slide';
    slide.href = p.url;
    slide.innerHTML = `
      <div class="slide-num">${p.num}</div>
      <div class="slide-badge">${p.badge}</div>
      <div class="slide-name">${p.name}</div>
      <div class="slide-desc">${p.desc}</div>
      <div class="slide-hint">ver projeto →</div>`;
    slide.addEventListener('mouseenter', () => paused = true);
    slide.addEventListener('mouseleave', () => paused = false);
    track.appendChild(slide);

    const dot = document.createElement('div');
    dot.className = 'cdot';
    dotsEl.appendChild(dot);
  });

  const slides = [...track.children];
  const dots   = [...dotsEl.children];

  function render() {
    const n = PROJECTS.length;
    const stageW = track.parentElement.offsetWidth;
    slides.forEach((s, i) => {
      let pos = i - current;
      if (pos > n / 2)  pos -= n;
      if (pos < -n / 2) pos += n;
      const abs = Math.abs(pos);
      const x     = pos * (stageW * 0.3);
      const scale = pos === 0 ? 1 : abs === 1 ? 0.72 : 0.48;
      const z     = pos === 0 ? 0 : abs === 1 ? -80 : -160;
      const op    = pos === 0 ? 1 : abs === 1 ? 0.45 : 0.18;
      s.style.transform       = `translate(calc(-50% + ${x}px), -50%) scale(${scale}) translateZ(${z}px)`;
      s.style.opacity         = op;
      s.style.zIndex          = 10 - abs;
      s.style.pointerEvents   = pos === 0 ? 'auto' : 'none';
      s.style.borderColor     = pos === 0 ? 'rgba(0,230,118,0.3)' : 'var(--border)';
    });
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  function next() { current = (current + 1) % PROJECTS.length; render(); }
  function prev() { current = (current - 1 + PROJECTS.length) % PROJECTS.length; render(); }

  document.getElementById('carousel-next')?.addEventListener('click', next);
  document.getElementById('carousel-prev')?.addEventListener('click', prev);
  track.parentElement.addEventListener('mouseenter', () => paused = true);
  track.parentElement.addEventListener('mouseleave', () => paused = false);

  render();
  setInterval(() => { if (!paused) next(); }, 2500);

})();