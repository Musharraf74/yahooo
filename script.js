document.addEventListener('DOMContentLoaded', function () {
  /* =========================
     1) Grab page elements
  ========================== */
  const mobileMenuButton = document.getElementById('mobile-menu');
  const navLinksBox = document.getElementById('nav-links');
  const header = document.querySelector('.header');
  const navLinks = document.querySelectorAll('.nav-links a');
  const allAnchorLinks = document.querySelectorAll('a[href^="#"]');
  const revealItems = document.querySelectorAll('.reveal');
  const pageSections = document.querySelectorAll('section[id]');
  const contactForm = document.getElementById('contact-form');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* =========================
     2) Mobile menu helpers
  ========================== */
  function setHamburgerIcon(isOpen) {
    if (!mobileMenuButton) return;

    const bars = mobileMenuButton.querySelectorAll('.bar');
    if (bars.length < 3) return;

    bars[0].style.transform = isOpen ? 'rotate(-45deg) translate(-5px, 6px)' : 'none';
    bars[1].style.opacity = isOpen ? '0' : '1';
    bars[2].style.transform = isOpen ? 'rotate(45deg) translate(-5px, -6px)' : 'none';
  }

  function closeMobileMenu() {
    if (!navLinksBox) return;

    navLinksBox.classList.remove('active');
    if (mobileMenuButton) {
      mobileMenuButton.classList.remove('is-active');
    }
    setHamburgerIcon(false);
  }

  function toggleMobileMenu() {
    if (!mobileMenuButton || !navLinksBox) return;

    const isOpen = navLinksBox.classList.toggle('active');
    mobileMenuButton.classList.toggle('is-active', isOpen);
    setHamburgerIcon(isOpen);
  }

  if (mobileMenuButton && navLinksBox) {
    mobileMenuButton.addEventListener('click', toggleMobileMenu);
  }

  /* =========================
     3) Smooth scroll for #links
  ========================== */
  allAnchorLinks.forEach(function (link) {
    link.addEventListener('click', function (event) {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const targetSection = document.querySelector(targetId);
      if (!targetSection) return;

      event.preventDefault();

      const headerHeight = header ? header.offsetHeight : 0;
      const targetTop = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: targetTop,
        behavior: reduceMotion ? 'auto' : 'smooth'
      });

      closeMobileMenu();
    });
  });

  /* =========================
     4) Scroll based updates
  ========================== */
  function runRevealAnimation() {
    revealItems.forEach(function (item) {
      const triggerPoint = window.innerHeight - 150;
      if (item.getBoundingClientRect().top < triggerPoint) {
        item.classList.add('active');
      }
    });
  }

  function updateHeaderStyle() {
    if (!header) return;

    const scrolled = window.scrollY > 50;
    header.style.padding = scrolled ? '5px 0' : '0';
    header.style.backgroundColor = scrolled ? 'rgba(10, 25, 47, 0.98)' : 'rgba(10, 25, 47, 0.85)';
  }

  function updateActiveNavLink() {
    let currentSectionId = '';
    const pageY = window.pageYOffset;

    pageSections.forEach(function (section) {
      if (pageY >= section.offsetTop - 150) {
        currentSectionId = section.id;
      }
    });

    navLinks.forEach(function (link) {
      const linkTarget = link.getAttribute('href');
      const shouldBeActive = currentSectionId && linkTarget === '#' + currentSectionId;
      link.classList.toggle('active', shouldBeActive);
    });
  }

  function handleScroll() {
    runRevealAnimation();
    updateHeaderStyle();
    updateActiveNavLink();
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* =========================
     5) Contact form behavior
  ========================== */
  if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();

      const submitButton = contactForm.querySelector('.btn-submit');
      const originalButtonText = submitButton.innerText;

      submitButton.innerText = 'Sending...';
      submitButton.disabled = true;

      setTimeout(function () {
        const name = document.getElementById('name').value;
        alert('Success! Thank you, ' + name + '. We have received your message and will contact you shortly.');

        contactForm.reset();
        submitButton.innerText = originalButtonText;
        submitButton.disabled = false;
      }, 1500);
    });
  }
});
