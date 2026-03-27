/* ══════════════════════════════════════
  Flutter Reference — Reference Page Script
   ══════════════════════════════════════ */

// ── Toggle concept cards ──
function toggle(el) {
  el.classList.toggle('open');
  el.nextElementSibling.classList.toggle('open');
}

// ── Search / filter nav links ──
function filterNav(q) {
  q = q.toLowerCase();

  document.querySelectorAll('nav a').forEach((a) => {
    a.style.display = a.textContent.toLowerCase().includes(q) ? '' : 'none';
  });

  document.querySelectorAll('.nav-section-label').forEach((label) => {
    const visible = [];
    let el = label.nextElementSibling;
    while (el && !el.classList.contains('nav-section-label')) {
      if (el.tagName === 'A') visible.push(el.style.display !== 'none');
      el = el.nextElementSibling;
    }
    label.style.display = visible.some(Boolean) ? '' : 'none';
  });
}

// ── Active nav link on scroll (IntersectionObserver) ──
const obs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        const id = e.target.id;
        document.querySelectorAll('nav a').forEach((a) => {
          a.classList.toggle('active', a.getAttribute('href') === '#' + id);
        });
      }
    });
  },
  { threshold: 0.25 }
);

document.querySelectorAll('section[id]').forEach((s) => obs.observe(s));
