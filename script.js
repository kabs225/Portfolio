document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const typewriterText = document.querySelector('.typewriter-text');
  const phrases = [
    'secure systems',
    'reliable networks',
    'smart embedded solutions',
    'connected security systems',
    'real-world technology' 
  ];

  if (typewriterText) {
    let phraseIndex = 0;
    let letterIndex = 0;
    let deleting = false;

    const typeLoop = () => {
      const currentPhrase = phrases[phraseIndex];

      if (!deleting) {
        letterIndex += 1;
        typewriterText.textContent = currentPhrase.slice(0, letterIndex);
      } else {
        letterIndex -= 1;
        typewriterText.textContent = currentPhrase.slice(0, letterIndex);
      }

      let pause = deleting ? 45 : 90;

      if (!deleting && letterIndex === currentPhrase.length) {
        pause = 1300;
        deleting = true;
      } else if (deleting && letterIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        pause = 350;
      }

      setTimeout(typeLoop, pause);
    };

    typeLoop();
  }

  const counters = document.querySelectorAll('[data-target]');
  const animateCounter = (element) => {
    const target = Number(element.dataset.target || 0);
    const suffix = element.dataset.suffix || '';
    const duration = 2000;
    const start = performance.now();

    const update = (time) => {
      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = Math.min(target, Math.floor(target * eased));
      element.textContent = current + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        element.textContent = target + suffix;
      }
    };

    const initialValue = Number(element.textContent.replace(/\D/g, '')) || 0;
    element.textContent = initialValue + suffix;
    requestAnimationFrame(update);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');

          const targetCounters = entry.target.querySelectorAll('[data-target]');
          targetCounters.forEach((targetCounter) => {
            if (!targetCounter.dataset.animated) {
              targetCounter.dataset.animated = 'true';
              animateCounter(targetCounter);
            }
          });
        }
      });
    },
    { threshold: 0.2 }
  );

  document.querySelectorAll('.reveal').forEach((section) => observer.observe(section));

  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu a');

  const updateActiveLink = () => {
    let currentSection = 'home';

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 140 && rect.bottom >= 140) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute('href');
      const isActive = href === `#${currentSection}`;
      link.classList.toggle('active', isActive);
    });
  };

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();
});
