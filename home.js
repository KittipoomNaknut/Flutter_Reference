/* ══════════════════════════════════════
  Flutter Reference — Home Page Script
   ══════════════════════════════════════ */

// ── Scroll-triggered fade-in for cards ──
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

// Observe all cards
document.querySelectorAll(
  '.week-card, .topic-card, .tip-card'
).forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = `opacity 0.5s ${i * 0.05}s ease, transform 0.5s ${i * 0.05}s ease`;
  observer.observe(el);
});

// Add 'visible' class styles via JS
document.head.insertAdjacentHTML('beforeend', `
  <style>
    .week-card.visible,
    .topic-card.visible,
    .tip-card.visible {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  </style>
`);

// ── Active nav link on scroll ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.top-nav a');

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((a) => a.classList.remove('active'));
        const link = document.querySelector(`.top-nav a[href="#${entry.target.id}"]`);
        if (link) link.classList.add('active');
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach((s) => navObserver.observe(s));

// ── Smooth scroll for anchor links ──
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const id = link.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
