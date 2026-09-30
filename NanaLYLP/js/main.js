/**
 * NANALY Landing Page Script
 * Interactivity: Drawer Menu, Range Slider, FAQ Accordion, Form Validation & Modal
 */

document.addEventListener('DOMContentLoaded', () => {
  // ----------------------------------------------------
  // 1. Mobile Drawer Navigation
  // ----------------------------------------------------
  const menuToggle = document.getElementById('menuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerClose = document.getElementById('drawerClose');
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  const openDrawer = () => {
    mobileDrawer.classList.add('is-active');
    drawerBackdrop.classList.add('is-active');
    menuToggle.setAttribute('aria-expanded', 'true');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    mobileDrawer.classList.remove('is-active');
    drawerBackdrop.classList.remove('is-active');
    menuToggle.setAttribute('aria-expanded', 'false');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  if (menuToggle) {
    menuToggle.addEventListener('click', openDrawer);
  }
  if (drawerClose) {
    drawerClose.addEventListener('click', closeDrawer);
  }
  if (drawerBackdrop) {
    drawerBackdrop.addEventListener('click', closeDrawer);
  }
  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // ----------------------------------------------------
  // 2. Interactive Output Level Range Slider (1 - 30)
  // ----------------------------------------------------
  const levelSlider = document.getElementById('levelRangeSlider');
  const levelValueDisplay = document.getElementById('levelValue');
  const sliderFill = document.getElementById('sliderFill');

  if (levelSlider && levelValueDisplay && sliderFill) {
    const updateSlider = () => {
      const val = parseInt(levelSlider.value, 10);
      const min = parseInt(levelSlider.min, 10);
      const max = parseInt(levelSlider.max, 10);
      const percentage = ((val - min) / (max - min)) * 100;

      levelValueDisplay.textContent = val;
      sliderFill.style.width = `${percentage}%`;
    };

    levelSlider.addEventListener('input', updateSlider);
    updateSlider(); // Initial run
  }

  // ----------------------------------------------------
  // 3. FAQ Accordion
  // ----------------------------------------------------
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question-btn');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      // 他の項目を閉じる場合は以下を有効化
      /*
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('is-open');
          const btn = otherItem.querySelector('.faq-question-btn');
          if (btn) btn.setAttribute('aria-expanded', 'false');
        }
      });
      */

      if (isOpen) {
        item.classList.remove('is-open');
        questionBtn.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('is-open');
        questionBtn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // ----------------------------------------------------
  // 4. Contact Form Validation & Submission Modal
  // ----------------------------------------------------
  const inquiryForm = document.getElementById('inquiryForm');
  const userNameInput = document.getElementById('userName');
  const userEmailInput = document.getElementById('userEmail');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalCloseBtn = document.getElementById('modalCloseBtn');

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let hasError = false;

      // Validate Name
      const nameGroup = userNameInput.closest('.form-group');
      if (!userNameInput.value.trim()) {
        nameGroup.classList.add('has-error');
        hasError = true;
      } else {
        nameGroup.classList.remove('has-error');
      }

      // Validate Email
      const emailGroup = userEmailInput.closest('.form-group');
      if (!validateEmail(userEmailInput.value.trim())) {
        emailGroup.classList.add('has-error');
        hasError = true;
      } else {
        emailGroup.classList.remove('has-error');
      }

      if (!hasError) {
        // Show success modal
        if (modalBackdrop) {
          modalBackdrop.classList.add('is-active');
        }
        // Reset form
        inquiryForm.reset();
        // Reset radio button to default
        const defaultRadio = inquiryForm.querySelector('input[name="inquiry_type"][value="価格"]');
        if (defaultRadio) defaultRadio.checked = true;
      }
    });

    // Clear error on input
    userNameInput.addEventListener('input', () => {
      if (userNameInput.value.trim()) {
        userNameInput.closest('.form-group').classList.remove('has-error');
      }
    });

    userEmailInput.addEventListener('input', () => {
      if (validateEmail(userEmailInput.value.trim())) {
        userEmailInput.closest('.form-group').classList.remove('has-error');
      }
    });
  }

  // Close modal
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', () => {
      modalBackdrop.classList.remove('is-active');
    });
  }
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        modalBackdrop.classList.remove('is-active');
      }
    });
  }

  // ----------------------------------------------------
  // 5. Smart Fixed Bottom CTA Visibility
  // Hide fixed CTA when contact section or footer is visible
  // ----------------------------------------------------
  const fixedBottomCta = document.getElementById('fixedBottomCta');
  const contactSection = document.getElementById('contact');

  if (fixedBottomCta && contactSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          fixedBottomCta.style.opacity = '0';
          fixedBottomCta.style.pointerEvents = 'none';
        } else {
          fixedBottomCta.style.opacity = '1';
          fixedBottomCta.style.pointerEvents = 'auto';
        }
      });
    }, { threshold: 0.15 });

    observer.observe(contactSection);
  }

  // ----------------------------------------------------
  // 6. Header Elevation on Scroll
  // ----------------------------------------------------
  const header = document.getElementById('header');
  const handleScroll = () => {
    if (!header) return;
    if (window.scrollY > 20) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check

  // ----------------------------------------------------
  // 7. Scroll Reveal & Stagger Animation System (IntersectionObserver)
  // ----------------------------------------------------
  // Initialize stagger children transition delays
  const staggerParents = document.querySelectorAll('.stagger-parent');
  staggerParents.forEach((parent) => {
    const children = parent.querySelectorAll('.stagger-child');
    children.forEach((child, index) => {
      child.style.transitionDelay = `${0.08 + index * 0.12}s`;
    });
  });

  const revealElements = document.querySelectorAll(
    '.reveal-fade-up, .reveal-fade-left, .reveal-fade-right, .reveal-zoom-in, .stagger-parent'
  );

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.12
    });

    revealElements.forEach((el) => {
      revealObserver.observe(el);
    });
  } else {
    // Fallback for browsers without IntersectionObserver
    revealElements.forEach((el) => {
      el.classList.add('is-visible');
    });
  }

  // ----------------------------------------------------
  // 8. Output Slider Showcase Animation (Eye-catching micro-interaction)
  // ----------------------------------------------------
  let sliderAnimated = false;
  const specSection = document.getElementById('spec');
  if (specSection && levelSlider && levelValueDisplay && sliderFill) {
    const specObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !sliderAnimated) {
          sliderAnimated = true;
          const targetVal = 20;
          const duration = 900;
          const start = performance.now();

          const animate = (time) => {
            const elapsed = time - start;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const val = Math.round(1 + (targetVal - 1) * easeOut);

            levelSlider.value = val;
            levelValueDisplay.textContent = val;
            const min = parseInt(levelSlider.min, 10);
            const max = parseInt(levelSlider.max, 10);
            sliderFill.style.width = `${((val - min) / (max - min)) * 100}%`;

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          requestAnimationFrame(animate);
          specObserver.unobserve(specSection);
        }
      });
    }, { threshold: 0.25 });

    specObserver.observe(specSection);
  }
});

