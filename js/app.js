/* ============ NAVBAR SCROLL EFFECT ============ */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

/* ============ MOBILE MENU ============ */
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

menuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when a link is tapped
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
});

/* ============ 3D TILT ============ */
document.addEventListener('mousemove', e => {
  const card = e.target.closest('.tilt');
  if (!card) return;
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  card.style.transform = `perspective(900px) rotateX(${((y / rect.height) - 0.5) * -8}deg) rotateY(${((x / rect.width) - 0.5) * 8}deg)`;
  card.style.setProperty('--mx', x + 'px');
  card.style.setProperty('--my', y + 'px');
});

document.addEventListener('mouseout', e => {
  const card = e.target.closest('.tilt');
  if (card && !card.contains(e.relatedTarget)) card.style.transform = '';
});

/* ============ SCROLL REVEAL ============ */
const revealEls = document.querySelectorAll('section > div');
revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

/* ============ CONTACT FORM (saves to LocalStorage) ============ */
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', e => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(contactForm).entries());

  // Save inquiries locally so you can review them in the browser console
  const inquiries = JSON.parse(localStorage.getItem('nexora_inquiries') || '[]');
  inquiries.push({ ...data, date: new Date().toISOString() });
  localStorage.setItem('nexora_inquiries', JSON.stringify(inquiries));

  contactForm.reset();
  formStatus.textContent = '✅ Thank you! We will reply within 24 hours.';
  formStatus.className = 'text-xs text-emerald-400';
});

document.querySelectorAll('[data-package]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.getElementById('packageField').value = btn.dataset.package;
  });
});
revealEls.forEach(el => observer.observe(el));

/* ============ ICONS ============ */
lucide.createIcons();
