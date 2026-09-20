// ===== CUSTOM CURSOR =====
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');
document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
  setTimeout(() => {
    follower.style.left = e.clientX + 'px';
    follower.style.top = e.clientY + 'px';
  }, 80);
});
document.querySelectorAll('a,button,.portfolio-item,.filter-btn,.skill-card').forEach(el => {
  el.addEventListener('mouseenter', () => { cursor.classList.add('hover'); follower.classList.add('hover'); });
  el.addEventListener('mouseleave', () => { cursor.classList.remove('hover'); follower.classList.remove('hover'); });
});

// ===== PARTICLES =====
const particlesContainer = document.getElementById('particles');
function createParticle() {
  const p = document.createElement('div');
  p.classList.add('particle');
  const size = Math.random() * 4 + 1;
  const colors = ['rgba(168,85,247,0.6)', 'rgba(6,182,212,0.6)', 'rgba(255,107,53,0.4)', 'rgba(255,255,255,0.3)'];
  p.style.cssText = `
    width:${size}px; height:${size}px;
    left:${Math.random()*100}%;
    background:${colors[Math.floor(Math.random()*colors.length)]};
    animation-duration:${Math.random()*15+8}s;
    animation-delay:${Math.random()*5}s;
  `;
  particlesContainer.appendChild(p);
  setTimeout(() => p.remove(), 25000);
}
setInterval(createParticle, 400);
for (let i = 0; i < 20; i++) createParticle();

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  updateActiveNav();
});

// ===== ACTIVE NAV LINK =====
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.scrollY + 100;
  sections.forEach(sec => {
    const top = sec.offsetTop, height = sec.offsetHeight, id = sec.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (link) link.classList.toggle('active', scrollY >= top && scrollY < top + height);
  });
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// ===== COUNTER ANIMATION =====
function animateCounter(el) {
  const target = +el.dataset.target;
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { el.textContent = target; clearInterval(timer); }
    else el.textContent = Math.floor(current);
  }, 16);
}
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { animateCounter(e.target); counterObserver.unobserve(e.target); } });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-num').forEach(el => counterObserver.observe(el));

// ===== SKILL BARS =====
const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const card = e.target;
      card.classList.add('visible');
      const bar = card.querySelector('.skill-fill');
      const width = card.querySelector('.skill-bar').dataset.width;
      if (bar) setTimeout(() => { bar.style.width = width + '%'; }, 300);
      skillObserver.unobserve(card);
    }
  });
}, { threshold: 0.2 });
document.querySelectorAll('.skill-card').forEach((card, i) => {
  card.style.transitionDelay = (i * 0.1) + 's';
  skillObserver.observe(card);
});

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.about-image-wrap, .about-content, .testimonial-card, .contact-item, .highlight-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
  revealObserver.observe(el);
});

// ===== PORTFOLIO FILTER =====
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    portfolioItems.forEach(item => {
      const show = filter === 'all' || item.dataset.category === filter;
      item.style.transition = 'all 0.4s ease';
      if (show) {
        item.classList.remove('hidden');
        item.style.opacity = '0'; item.style.transform = 'scale(0.9)';
        setTimeout(() => { item.style.opacity = '1'; item.style.transform = 'scale(1)'; }, 50);
      } else {
        item.style.opacity = '0'; item.style.transform = 'scale(0.9)';
        setTimeout(() => item.classList.add('hidden'), 400);
      }
    });
  });
});

// ===== VIDEO MODAL =====
const modal = document.getElementById('videoModal');
const videoFrame = document.getElementById('videoFrame');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalClose = document.getElementById('modalClose');
const modalOverlay = document.getElementById('modalOverlay');

document.querySelectorAll('.portfolio-item').forEach(item => {
  item.querySelector('.play-btn').addEventListener('click', e => {
    e.stopPropagation();
    const videoUrl = item.dataset.video;
    const title = item.dataset.title;
    const desc = item.dataset.desc;
    if (videoUrl.includes('YOUR_VIDEO_ID')) {
      showToast('Replace YOUR_VIDEO_ID in index.html with your actual YouTube video ID!');
      return;
    }
    modalTitle.textContent = title;
    modalDesc.textContent = desc;
    videoFrame.src = videoUrl + '?autoplay=1';
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
  item.addEventListener('click', () => item.querySelector('.play-btn').click());
});

function closeModal() {
  modal.classList.remove('active');
  videoFrame.src = '';
  document.body.style.overflow = '';
}
modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// ===== TOAST NOTIFICATION =====
function showToast(msg) {
  const toast = document.createElement('div');
  toast.style.cssText = `
    position:fixed; bottom:30px; left:50%; transform:translateX(-50%);
    background:linear-gradient(135deg,#a855f7,#06b6d4); color:#fff;
    padding:14px 28px; border-radius:50px; font-size:14px; font-weight:600;
    z-index:9999; box-shadow:0 8px 30px rgba(168,85,247,0.5);
    animation:toastIn .4s ease; white-space:nowrap;
  `;
  toast.textContent = msg;
  const style = document.createElement('style');
  style.textContent = '@keyframes toastIn{from{opacity:0;transform:translateX(-50%) translateY(20px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}';
  document.head.appendChild(style);
  document.body.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '0'; toast.style.transition = 'opacity .4s'; setTimeout(() => toast.remove(), 400); }, 3500);
}

// ===== CONTACT FORM =====
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  btn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
  btn.disabled = true;
  setTimeout(() => {
    btn.innerHTML = '<span>Message Sent!</span><i class="fas fa-check"></i>';
    btn.style.background = 'linear-gradient(135deg,#10b981,#059669)';
    e.target.reset();
    setTimeout(() => {
      btn.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
      btn.style.background = '';
      btn.disabled = false;
    }, 3000);
  }, 1500);
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
hamburger.addEventListener('click', () => {
  const navLinks = document.querySelector('.nav-links');
  const isOpen = navLinks.style.display === 'flex';
  navLinks.style.cssText = isOpen ? '' : `
    display:flex; flex-direction:column; position:fixed;
    top:70px; left:0; right:0; background:rgba(5,5,8,.98);
    padding:30px; gap:20px; border-bottom:1px solid rgba(168,85,247,.2);
    backdrop-filter:blur(20px); z-index:999;
  `;
  hamburger.querySelectorAll('span')[0].style.transform = isOpen ? '' : 'rotate(45deg) translate(5px,5px)';
  hamburger.querySelectorAll('span')[1].style.opacity = isOpen ? '' : '0';
  hamburger.querySelectorAll('span')[2].style.transform = isOpen ? '' : 'rotate(-45deg) translate(5px,-5px)';
});

// ===== TILT EFFECT ON HERO CARD =====
const heroCard = document.querySelector('.hero-card');
if (heroCard) {
  heroCard.addEventListener('mousemove', e => {
    const rect = heroCard.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    heroCard.style.transform = `translateY(-12px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
  });
  heroCard.addEventListener('mouseleave', () => {
    heroCard.style.transform = '';
  });
}

// ===== GLITCH TEXT EFFECT =====
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
  setInterval(() => {
    heroTitle.style.textShadow = `${Math.random()*4-2}px 0 rgba(168,85,247,0.5)`;
    setTimeout(() => heroTitle.style.textShadow = '', 100);
  }, 3000);
}
