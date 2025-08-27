// script.js - Travel Website Interactivity & Animations

document.addEventListener('DOMContentLoaded', function () {

  /* ---------------- Hero Parallax ---------------- */
  const heroBg = document.querySelector('.hero-bg');
  window.addEventListener('scroll', () => {
    if (!heroBg) return;
    const s = window.scrollY;
    heroBg.style.transform = `translateY(${s * 0.08}px) scale(1.03)`;
  });

  /* ---------------- Modal Booking ---------------- */
  const modal = document.getElementById('bookingModal');
  const openBtns = document.querySelectorAll('#openBookBtn, #heroBookBtn, #openBookBtn2, #openBookBtn3, .book-btn');
  const closeBtn = document.getElementById('modalClose');

  openBtns.forEach(b => b.addEventListener('click', () => {
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');

    // Prefill destination if button has data-title
    const title = b.dataset?.title;
    if (title) {
      const sel = document.querySelector('#bookingForm select[name="destination"]');
      if (sel) sel.value = title;

      const nameInput = document.querySelector('#bookingForm input[name="name"]');
      if (nameInput) nameInput.focus();
    }
  }));

  closeBtn?.addEventListener('click', () => {
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
  });

  modal?.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('show');
      modal.setAttribute('aria-hidden', 'true');
    }
  });

  /* ---------------- Booking Form ---------------- */
  const bookingForm = document.getElementById('bookingForm');
  const formNote = document.getElementById('formNote');

  bookingForm?.addEventListener('submit', function (e) {
    e.preventDefault();
    formNote.textContent = '✅ Thanks — we received your enquiry. Our agent will contact you within 24 hours.';
    bookingForm.reset();
    setTimeout(() => {
      modal.classList.remove('show');
      modal.setAttribute('aria-hidden', 'true');
      formNote.textContent = '';
    }, 2500);
  });

  /* ---------------- Newsletter Form ---------------- */
  const newsForm = document.getElementById('newsForm');
  const newsNote = document.getElementById('newsNote');

  newsForm?.addEventListener('submit', function (e) {
    e.preventDefault();
    newsNote.textContent = '✅ Thanks! Check your email for confirmation.';
    newsForm.reset();
    setTimeout(() => newsNote.textContent = '', 3000);
  });

  /* ---------------- Reveal on Scroll ---------------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) en.target.classList.add('visible');
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  /* ---------------- Filters ---------------- */
  document.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const tag = chip.dataset.filter;
      document.querySelectorAll('.card').forEach(card => {
        card.style.display = (tag === 'all' || card.dataset.tag === tag) ? 'flex' : 'none';
      });
    });
  });

  /* ---------------- Carousel Controls ---------------- */
  const track = document.querySelector('.carousel-track');
  document.querySelector('.carousel .next')?.addEventListener('click', () => {
    if (track) track.scrollBy({ left: track.clientWidth * 0.9, behavior: 'smooth' });
  });
  document.querySelector('.carousel .prev')?.addEventListener('click', () => {
    if (track) track.scrollBy({ left: -track.clientWidth * 0.9, behavior: 'smooth' });
  });

  /* ---------------- Mobile Nav ---------------- */
  document.querySelectorAll('.hamburger').forEach(h => {
    h.addEventListener('click', () => {
      const wrap = h.closest('.nav-row');
      if (!wrap) return;
      const nav = wrap.querySelector('.nav');
      if (!nav) return;

      if (getComputedStyle(nav).display === 'none' || nav.style.display === 'none') {
        nav.style.display = 'flex';
        nav.style.flexDirection = 'column';
        nav.style.gap = '10px';
      } else {
        nav.style.display = 'none';
      }
    });
  });

  /* ---------------- Smooth Scroll ---------------- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (ev) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        ev.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* ---------------- Footer Year ---------------- */
  const yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();

});
// Page fade-in
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

// script.js — GreenWay Travel interactivity & animations
document.addEventListener('DOMContentLoaded', () => {
  /* =========================
     Helpers
  ==========================*/
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => Array.from(root.querySelectorAll(s));

  // Throttle utility
  const throttle = (fn, wait = 100) => {
    let last = 0;
    return (...args) => {
      const now = Date.now();
      if (now - last >= wait) {
        last = now;
        fn(...args);
      }
    };
  };

  /* =========================
     Header: active link & show on scroll
  ==========================*/
  const header = $('.header');
  let lastY = window.scrollY;
  window.addEventListener('scroll', throttle(() => {
    const y = window.scrollY;
    // Hide a bit when scrolling down, show when scrolling up
    if (y > 80) header.style.background = 'rgba(0,0,0,0.65)';
    else header.style.background = 'rgba(0,0,0,0.6)';
    lastY = y;
  }, 120));

  // Active nav link by hash/URL (best-effort)
  const path = location.pathname.split('/').pop() || 'index.html';
  $$('#siteNav a').forEach(a => {
    const href = a.getAttribute('href');
    if ((path === 'index.html' && href === 'index.html') ||
        (path === 'destinations.html' && href === 'destinations.html') ||
        (path === 'packages.html' && href === 'packages.html')) {
      a.classList.add('active');
    }
  });

  /* =========================
     Hero parallax & intro motion
  ==========================*/
  const heroBg = $('.hero-bg');
  const parallax = throttle(() => {
    if (!heroBg) return;
    const s = window.scrollY * 0.08; // subtle
    heroBg.style.transform = `translateY(${s}px) scale(1.03)`;
  }, 16);
  window.addEventListener('scroll', parallax);
  parallax(); // initial

  /* =========================
     Reveal on scroll (sections, cards)
  ==========================*/
  const io = ('IntersectionObserver' in window)
    ? new IntersectionObserver((entries) => {
        entries.forEach(en => {
          if (en.isIntersecting) {
            en.target.classList.add('visible');
            io.unobserve(en.target);
          }
        });
      }, { threshold: 0.12 })
    : null;

  $$('.reveal').forEach(el => {
    if (io) io.observe(el);
    else el.classList.add('visible'); // fallback
  });

  // Packages zoom-in animation (initially scaled in CSS)
  const pkgIO = ('IntersectionObserver' in window)
    ? new IntersectionObserver((entries) => {
        entries.forEach(en => {
          if (en.isIntersecting) {
            en.target.style.opacity = '1';
            en.target.style.transform = 'scale(1)';
            pkgIO.unobserve(en.target);
          }
        });
      }, { threshold: 0.18 })
    : null;
  $$('.pkg').forEach(el => {
    if (pkgIO) pkgIO.observe(el);
    else { el.style.opacity = '1'; el.style.transform = 'scale(1)'; }
  });

  /* =========================
     Modal (open/close + prefill)
  ==========================*/
  const modal = $('#bookingModal');
  const closeBtn = $('#modalClose');
  const openBtns = $$('#openBookBtn, #heroBookBtn, .book-btn');

  const openModal = (title) => {
    if (!modal) return;
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
    const sel = $('#bookingForm select[name="destination"]');
    if (sel && title) sel.value = title;
    const nameInput = $('#bookingForm input[name="name"]');
    nameInput?.focus();
  };

  openBtns.forEach(b => {
    b.addEventListener('click', () => openModal(b.dataset?.title));
  });

  const closeModal = () => {
    modal?.classList.remove('show');
    modal?.setAttribute('aria-hidden', 'true');
  };

  closeBtn?.addEventListener('click', closeModal);
  modal?.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

  /* =========================
     Forms (booking + newsletter)
  ==========================*/
  const bookingForm = $('#bookingForm');
  const formNote = $('#formNote');
  bookingForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (formNote) {
      formNote.textContent = 'Thanks — we received your enquiry. Our agent will contact you within 24 hours.';
    }
    bookingForm.reset();
    setTimeout(() => { closeModal(); if (formNote) formNote.textContent = ''; }, 2200);
  });

  const newsForm = $('#newsForm');
  const newsNote = $('#newsNote');
  newsForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (newsNote) newsNote.textContent = 'Thanks! Check your email for confirmation.';
    newsForm.reset();
    setTimeout(() => { if (newsNote) newsNote.textContent = ''; }, 2600);
  });

  /* =========================
     Carousel (testimonials)
  ==========================*/
  const track = $('.carousel-track');
  const nextBtn = $('.carousel-btn.next');
  const prevBtn = $('.carousel-btn.prev');
  if (track && nextBtn && prevBtn) {
    const slides = $$('.slide', track);
    let index = 0;
    const go = (i) => {
      index = (i + slides.length) % slides.length;
      track.style.transform = `translateX(-${index * 100}%)`;
    };
    nextBtn.addEventListener('click', () => go(index + 1));
    prevBtn.addEventListener('click', () => go(index - 1));

    // Autoplay (pause on hover)
    let timer = setInterval(() => go(index + 1), 5000);
    track.addEventListener('mouseenter', () => clearInterval(timer));
    track.addEventListener('mouseleave', () => { timer = setInterval(() => go(index + 1), 5000); });
  }

  /* =========================
     Destination filters (only on pages that have them)
  ==========================*/
  const filterChips = $$('.chip');
  if (filterChips.length) {
    const cards = $$('.card');
    filterChips.forEach(chip => {
      chip.addEventListener('click', () => {
        filterChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const tag = chip.dataset.filter;
        cards.forEach(card => {
          const show = (tag === 'all' || card.dataset.tag === tag);
          card.style.display = show ? 'flex' : 'none';
        });
      });
    });
  }

  /* =========================
     Mobile menu toggle
  ==========================*/
  const hamburger = $('#hamburger');
  const nav = $('#siteNav');
  hamburger?.addEventListener('click', () => {
    const isOpen = getComputedStyle(nav).display !== 'none';
    if (isOpen) {
      nav.style.display = 'none';
    } else {
      nav.style.display = 'flex';
      nav.style.flexDirection = 'column';
      nav.style.gap = '10px';
    }
  });

  // Close mobile nav when clicking a link
  $$('#siteNav a').forEach(a => {
    a.addEventListener('click', () => {
      if (window.innerWidth <= 780) nav.style.display = 'none';
    });
  });

  /* =========================
     Smooth internal anchors
  ==========================*/
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (ev) {
      const id = this.getAttribute('href');
      const target = id && $(id);
      if (target) {
        ev.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* =========================
     Footer year
  ==========================*/
  const yr = $('#year');
  if (yr) yr.textContent = new Date().getFullYear();
});
