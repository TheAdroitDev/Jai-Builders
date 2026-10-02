/* ============================================
   JAI BUILDERS - MAIN SCRIPT
   Vanilla JS - no libraries, no frameworks
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ===== PRELOADER =====
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
    }, 800);
  });

  // Fallback - hide preloader after 3 seconds max
  setTimeout(() => {
    preloader.classList.add('hidden');
  }, 3000);


  // ===== NAVBAR SCROLL =====
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  function handleNavScroll() {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  // Active nav link on scroll
  function updateActiveLink() {
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', () => {
    handleNavScroll();
    updateActiveLink();
  });

  handleNavScroll();


  // ===== MOBILE NAV TOGGLE =====
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navLinks');

  function closeMobileNav() {
    navToggle.classList.remove('active');
    navMenu.classList.remove('open');
    navbar.classList.remove('menu-open');
    document.body.style.overflow = '';
  }

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('open');
    navbar.classList.toggle('menu-open', navMenu.classList.contains('open'));
    document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
  });

  // Close nav on link click
  navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });

  // Close nav on Escape key or backdrop click
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('open')) {
      closeMobileNav();
    }
  });

  navMenu.addEventListener('click', (e) => {
    if (e.target === navMenu) {
      closeMobileNav();
    }
  });


  // ===== COUNTER ANIMATION =====
  const counters = document.querySelectorAll('.hero-stat-number');
  let countersDone = false;

  function animateCounters() {
    if (countersDone) return;
    countersDone = true;

    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      const duration = 2000;
      const step = Math.ceil(target / (duration / 16));
      let current = 0;

      const updateCounter = () => {
        current += step;
        if (current >= target) {
          counter.textContent = target;
        } else {
          counter.textContent = current;
          requestAnimationFrame(updateCounter);
        }
      };

      updateCounter();
    });
  }

  // Trigger counter animation when hero is visible
  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
      }
    });
  }, { threshold: 0.3 });

  const heroSection = document.querySelector('.hero');
  if (heroSection) heroObserver.observe(heroSection);


  // ===== SCROLL REVEAL =====
  const revealElements = [
    ...document.querySelectorAll('.section-header'),
    ...document.querySelectorAll('.about-images'),
    ...document.querySelectorAll('.about-content'),
    ...document.querySelectorAll('.service-card'),
    ...document.querySelectorAll('.gallery-item'),
    ...document.querySelectorAll('.interior-item'),
    ...document.querySelectorAll('.video-card'),
    ...document.querySelectorAll('.process-step'),
    ...document.querySelectorAll('.testimonial-slider'),
    ...document.querySelectorAll('.contact-info'),
    ...document.querySelectorAll('.value-item'),
  ];

  revealElements.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));


  // ===== INTERIOR FILTER =====
  const filterBtns = document.querySelectorAll('.filter-btn');
  const interiorItems = document.querySelectorAll('.interior-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      interiorItems.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.classList.remove('hidden');
          item.style.display = '';
        } else {
          item.classList.add('hidden');
          item.style.display = 'none';
        }
      });
    });
  });


  // ===== TESTIMONIAL SLIDER =====
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.getElementById('prevTestimonial');
  const nextBtn = document.getElementById('nextTestimonial');
  let currentSlide = 0;

  function goToSlide(index) {
    testimonialCards.forEach(card => card.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    currentSlide = index;
    if (currentSlide >= testimonialCards.length) currentSlide = 0;
    if (currentSlide < 0) currentSlide = testimonialCards.length - 1;

    testimonialCards[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  }

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
    nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => goToSlide(i));
  });

  // Auto-slide every 5 seconds
  setInterval(() => goToSlide(currentSlide + 1), 5000);

  // Touch swipe support for mobile
  const sliderTrack = document.querySelector('.testimonial-track');
  if (sliderTrack) {
    let touchStartX = 0;
    let touchEndX = 0;
    sliderTrack.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    sliderTrack.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 40) goToSlide(currentSlide + 1);
      if (touchEndX - touchStartX > 40) goToSlide(currentSlide - 1);
    }, { passive: true });
  }


  // ===== LIGHTBOX =====
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');
  let lightboxImages = [];
  let lightboxIndex = 0;

  // Collect all gallery images
  function initLightbox() {
    const allGalleryItems = document.querySelectorAll('.gallery-item, .interior-item');

    allGalleryItems.forEach((item, index) => {
      const img = item.querySelector('img');
      if (!img) return;

      lightboxImages.push(img.src);

      item.addEventListener('click', () => {
        lightboxIndex = lightboxImages.indexOf(img.src);
        openLightbox(img.src);
      });
    });
  }

  function openLightbox(src) {
    lightboxImg.src = src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function nextLightbox() {
    lightboxIndex = (lightboxIndex + 1) % lightboxImages.length;
    lightboxImg.src = lightboxImages[lightboxIndex];
  }

  function prevLightbox() {
    lightboxIndex = (lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
    lightboxImg.src = lightboxImages[lightboxIndex];
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxNext) lightboxNext.addEventListener('click', nextLightbox);
  if (lightboxPrev) lightboxPrev.addEventListener('click', prevLightbox);

  // Close on overlay click
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextLightbox();
    if (e.key === 'ArrowLeft') prevLightbox();
  });

  // Touch swipe for lightbox on mobile
  if (lightbox) {
    let lbTouchStartX = 0;
    let lbTouchEndX = 0;
    lightbox.addEventListener('touchstart', (e) => {
      lbTouchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    lightbox.addEventListener('touchend', (e) => {
      lbTouchEndX = e.changedTouches[0].screenX;
      if (lbTouchStartX - lbTouchEndX > 45) nextLightbox();
      if (lbTouchEndX - lbTouchStartX > 45) prevLightbox();
    }, { passive: true });
  }

  initLightbox();


  // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = navbar.offsetHeight;
        const targetPos = target.offsetTop - offset;
        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });
      }
    });
  });





  // ===== PARALLAX-LIKE HERO IMAGE =====
  const heroBgImg = document.querySelector('.hero-bg-img');
  if (heroBgImg) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        heroBgImg.style.transform = `scale(1.05) translateY(${scrolled * 0.15}px)`;
      }
    });
  }

  // ===== WALKTHROUGH VIDEOS AUTOPLAY & LOOP =====
  const showcaseVideos = document.querySelectorAll('.video-card video');
  if (showcaseVideos.length > 0 && 'IntersectionObserver' in window) {
    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const video = entry.target;
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
    }, { threshold: 0.25 });

    showcaseVideos.forEach(video => videoObserver.observe(video));
  }

  // ===== BACK TO TOP =====
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });

    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

});
