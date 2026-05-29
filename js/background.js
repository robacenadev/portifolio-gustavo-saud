/* ── background.js ──
   Responsável pelo cursor customizado e pela barra de progresso de scroll.
   O fundo (glow breathing) é feito puramente em CSS no style.css.
─────────────────────────────────────────── */

(function () {
  'use strict';

  /* ── SCROLL PROGRESS BAR ── */
  const progress = document.getElementById('progress');

  window.addEventListener('scroll', () => {
    const scrolled = document.documentElement.scrollTop;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = ((scrolled / total) * 100) + '%';
  });

  /* ── CUSTOM CURSOR ── */
  const dot  = document.getElementById('cdot');
  const ring = document.getElementById('cring');

  let mouseX = -200, mouseY = -200;
  let ringX  = -200, ringY  = -200;

  // Atualiza posição do mouse
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Efeito de clique
  document.addEventListener('mousedown', () => {
    dot.style.transform = 'translate(-50%,-50%) scale(0.4)';
  });
  document.addEventListener('mouseup', () => {
    dot.style.transform = 'translate(-50%,-50%)';
  });

  // Hover em elementos interativos — expande o anel
  document.querySelectorAll('a, button, .cb').forEach((el) => {
    el.addEventListener('mouseenter', () => ring.classList.add('hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
  });

  // Loop de animação — dot snapeia, ring segue com lag
  function animateCursor() {
    dot.style.left = mouseX + 'px';
    dot.style.top  = mouseY + 'px';

    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;

    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';

    requestAnimationFrame(animateCursor);
  }

  animateCursor();
})();
