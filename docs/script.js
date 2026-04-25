/* ========================================
   BetterVibrance Landing Page Scripts
   ======================================== */

(function () {
  'use strict';

  // ---- Mobile menu toggle ----
  const toggle = document.querySelector('.nav-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
      });
    });
  }

  // ---- Before/After comparison sliders ----
  document.querySelectorAll('.comparison-slider').forEach(slider => {
    const beforeImg = slider.querySelector('.comparison-before');
    const handle = slider.querySelector('.comparison-handle');
    let isDragging = false;

    function updateSlider(x) {
      const rect = slider.getBoundingClientRect();
      let pct = ((x - rect.left) / rect.width) * 100;
      pct = Math.max(2, Math.min(98, pct));

      beforeImg.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
      handle.style.left = pct + '%';
    }

    slider.addEventListener('mousedown', e => {
      isDragging = true;
      updateSlider(e.clientX);
      e.preventDefault();
    });

    document.addEventListener('mousemove', e => {
      if (isDragging) updateSlider(e.clientX);
    });

    document.addEventListener('mouseup', () => {
      isDragging = false;
    });

    // Touch support
    slider.addEventListener('touchstart', e => {
      isDragging = true;
      updateSlider(e.touches[0].clientX);
    }, { passive: true });

    document.addEventListener('touchmove', e => {
      if (isDragging) updateSlider(e.touches[0].clientX);
    }, { passive: true });

    document.addEventListener('touchend', () => {
      isDragging = false;
    });
  });

  // ---- Lazy YouTube embed ----
  const videoContainer = document.getElementById('video-container');
  const playBtn = document.getElementById('video-play');
  const thumbnail = document.getElementById('video-thumbnail');

  if (videoContainer && playBtn) {
    function loadVideo() {
      const iframe = document.createElement('iframe');
      iframe.src = 'https://www.youtube.com/embed/ckSm2_7NV9A?autoplay=1&rel=0';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      iframe.allowFullscreen = true;
      videoContainer.appendChild(iframe);
      playBtn.style.display = 'none';
      thumbnail.style.display = 'none';
    }

    playBtn.addEventListener('click', loadVideo);
    thumbnail.addEventListener('click', loadVideo);
  }

  // ---- Scroll-triggered fade-in ----
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe feature cards, pricing cards, comparison cards
  document.querySelectorAll('.feature-card, .pricing-card, .comparison-card, .safety-block, .req-item').forEach((el, i) => {
    el.style.animationDelay = `${i * 0.08}s`;
    observer.observe(el);
  });

  // ---- Smooth nav background on scroll ----
  const nav = document.querySelector('.nav');
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        if (window.scrollY > 20) {
          nav.style.borderBottomColor = 'rgba(30, 30, 48, 0.8)';
        } else {
          nav.style.borderBottomColor = 'var(--border)';
        }
        ticking = false;
      });
      ticking = true;
    }
  });
})();
