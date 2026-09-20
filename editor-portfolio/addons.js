// ===== LOADING SCREEN =====
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 2200);
});

// ===== READING PROGRESS BAR =====
const progressBar = document.getElementById('readingProgress');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = (scrollTop / docHeight * 100) + '%';
});

// ===== BACK TO TOP =====
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 400);
});
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ===== MAGNETIC CURSOR =====
const magCursor = document.createElement('div');
magCursor.id = 'magCursor';
magCursor.innerHTML = '<div class="outer-ring"></div><div class="inner-dot"></div>';
document.body.appendChild(magCursor);

let mouseX = 0, mouseY = 0;
let outerX = 0, outerY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  // Inner dot follows instantly
  magCursor.querySelector('.inner-dot').style.left = mouseX + 'px';
  magCursor.querySelector('.inner-dot').style.top = mouseY + 'px';
});

// Outer ring follows with smooth lag
function animateCursor() {
  outerX += (mouseX - outerX) * 0.12;
  outerY += (mouseY - outerY) * 0.12;
  magCursor.querySelector('.outer-ring').style.left = outerX + 'px';
  magCursor.querySelector('.outer-ring').style.top = outerY + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

// Hover state
document.querySelectorAll('a, button, .portfolio-item, .filter-btn, .skill-card, .nav-cta, .social-btn').forEach(el => {
  el.addEventListener('mouseenter', () => magCursor.classList.add('hovering'));
  el.addEventListener('mouseleave', () => magCursor.classList.remove('hovering'));
});

// Click state
document.addEventListener('mousedown', () => magCursor.classList.add('clicking'));
document.addEventListener('mouseup', () => magCursor.classList.remove('clicking'));

// ===== TYPING EFFECT ON HERO =====
const heroTitleEl = document.querySelector('.hero-title');
if (heroTitleEl) {
  const lines = ['I Turn Raw Footage', 'Into Cinematic', 'Masterpieces'];
  const gradientWord = 'Cinematic';
  let lineIndex = 0, charIndex = 0, isDeleting = false;
  const cursor = document.createElement('span');
  cursor.className = 'typing-cursor';

  function typeEffect() {
    const currentLine = lines[lineIndex];
    if (!isDeleting) {
      charIndex++;
      if (charIndex > currentLine.length) {
        if (lineIndex < lines.length - 1) {
          lineIndex++;
          charIndex = 0;
          setTimeout(typeEffect, 400);
          return;
        } else {
          // Done typing — show final static version
          heroTitleEl.innerHTML = `I Turn Raw Footage<br/>Into <span class="gradient-text">Cinematic</span><br/>Masterpieces`;
          return;
        }
      }
    }
    setTimeout(typeEffect, isDeleting ? 60 : 80);
  }

  // Start typing after loader
  setTimeout(typeEffect, 2400);
}

// ===== AVAILABILITY BADGE DOT =====
const badge = document.querySelector('.hero-badge');
if (badge) {
  badge.innerHTML = '<span class="avail-dot"></span>' + badge.innerHTML;
}

// ===== PORTFOLIO ITEM POSITION RELATIVE FIX =====
document.querySelectorAll('.portfolio-item').forEach(item => {
  item.style.position = 'relative';
  item.style.overflow = 'hidden';
});

// ===== SMOOTH REVEAL FOR ABOUT & CONTACT =====
const revealEls = document.querySelectorAll('.about-image-wrap, .about-content, .contact-item, .highlight-item, .add-video-cta');
const revealObs = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
      }, i * 100);
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
revealEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity .7s ease, transform .7s ease';
  revealObs.observe(el);
});
