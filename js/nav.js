// sticky nav border intensifies on scroll
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 12) nav.style.borderBottomColor = 'rgba(230,225,214,0.20)';
    else nav.style.borderBottomColor = 'rgba(230,225,214,0.10)';
  });

  // Respect prefers-reduced-motion: keep the hero on its poster frame
  // instead of autoplaying the background video.
  const heroVideo = document.querySelector('.hero-video');
  if (heroVideo && window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    heroVideo.removeAttribute('autoplay');
    heroVideo.pause();
  }

  // Hero ticker band: text is admin-editable (Admin Dashboard > Delivery & Tax
  // panel). Deferred to DOMContentLoaded since getSettings() lives in a file
  // that loads after this one.
  document.addEventListener('DOMContentLoaded', () => {
    if (typeof getSettings !== 'function') return;
    const text = getSettings().tickerText || '';
    const a = document.getElementById('tickerItemA');
    const b = document.getElementById('tickerItemB');
    if (a) a.textContent = text;
    if (b) b.textContent = text;
  });

  // process toggle: Shilajit / Sea Buckthorn / Honey
  const toggleBtns = document.querySelectorAll('.toggle-btn');
  const panels = {
    shilajit: document.getElementById('panel-shilajit'),
    seabuckthorn: document.getElementById('panel-seabuckthorn'),
    honey: document.getElementById('panel-honey')
  };
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.target;
      toggleBtns.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      Object.keys(panels).forEach(key => {
        if (!panels[key]) return;
        panels[key].style.display = key === target ? 'block' : 'none';
        panels[key].classList.toggle('active', key === target);
      });
    });
  });

  // mobile menu
  const burger = document.getElementById('burger');
  const panel = document.getElementById('mobilePanel');
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    panel.classList.toggle('open');
  });
  panel.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    burger.classList.remove('open');
    panel.classList.remove('open');
  }));

  // ============================================
  // SCROLL REVEAL: fades and lifts key content into view as the page scrolls
  // ============================================
  (function initScrollReveal(){
    const revealSelectors = [
      '.section-head',
      '.dominant-head',
      '.step-card',
      '.contact-card',
      '.cert-card',
      '.harvest-story',
      '.harvest-banner',
      '.usage-card'
    ];
    const els = document.querySelectorAll(revealSelectors.join(','));

    els.forEach((el, i) => {
      el.classList.add('reveal', 'reveal-stagger');
      el.style.setProperty('--reveal-delay', Math.min(i % 4, 3) * 0.08 + 's');
    });

    if (!('IntersectionObserver' in window)){
      els.forEach(el => el.classList.add('in-view'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting){
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    els.forEach(el => observer.observe(el));
  })();

