// === Theme Toggle (Refactored + Giscus Sync) ===
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;
const iconSun = document.querySelector('.icon-sun');
const iconMoon = document.querySelector('.icon-moon');

function getGiscusTheme(appTheme) {
  return appTheme === 'dark' ? 'dark_dimmed' : 'light';
}

function updateGiscusTheme(appTheme) {
  const iframe = document.querySelector('iframe.giscus-frame');
  if (iframe) {
    iframe.contentWindow.postMessage(
      { giscus: { setConfig: { theme: getGiscusTheme(appTheme) } } },
      'https://giscus.app'
    );
  }
}

function setTheme(theme) {
  root.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);

  // Update icon
  if (iconSun && iconMoon) {
    iconSun.style.display = theme === 'dark' ? 'none' : 'block';
    iconMoon.style.display = theme === 'dark' ? 'block' : 'none';
  }

  // âœ… Sync Giscus theme
  updateGiscusTheme(theme);
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
  });
}

// Listen system preference change
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (!localStorage.getItem('theme')) {
    setTheme(e.matches ? 'dark' : 'light');
  }
});

// === Mobile Menu ===
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', isOpen);
  });
  document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
      navLinks.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

// === Skeleton â†’ Gallery Swap ===
const skeletonGrid = document.getElementById('skeletonGrid');
const galleryGrid = document.getElementById('galleryGrid');
if (skeletonGrid && galleryGrid) {
  // Hide skeleton after a brief moment to simulate load
  setTimeout(() => {
    skeletonGrid.style.display = 'none';
    galleryGrid.style.display = '';
    galleryGrid.style.animation = 'fadeIn 0.5s ease';
  }, 400);
}

// === Category Filter ===
const chips = document.querySelectorAll('.filter-chips .chip[data-category]');
const cards = document.querySelectorAll('.art-card[data-category]');

chips.forEach(chip => {
  chip.addEventListener('click', () => {
    chips.forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    const cat = chip.dataset.category;
    cards.forEach(card => {
      const show = cat === 'all' || card.dataset.category === cat;
      card.style.display = show ? '' : 'none';
    });
  });
});

// === Lightbox ===
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.querySelector('.lightbox-close');

function openLightbox(src, alt) {
  lightboxImg.src = src;
  lightboxImg.alt = alt || '';
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

// Attach to all zoomable images
document.querySelectorAll('[data-lightbox] img, .post-hero-image img, .art-card-image img').forEach(img => {
  // Skip thumbnails (only open lightbox on post hero images)
  if (img.closest('.post-hero-image') || img.closest('[data-lightbox]')) {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', (e) => {
      e.preventDefault();
      // Use higher-res version if available
      const src = img.dataset.full || img.src;
      openLightbox(src, img.alt);
    });
  }
});

if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
if (lightbox) {
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
}
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

// === Copy Prompt ===
function copyText(text, btn) {
  navigator.clipboard.writeText(text).then(() => {
    const original = btn.innerHTML;
    btn.innerHTML = 'âœ“ Tersalin!';
    setTimeout(() => btn.innerHTML = original, 2000);
  }).catch(() => {
    // Fallback
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
  });
}

document.querySelectorAll('.prompt-copy-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.copy;
    const el = document.getElementById(target);
    if (el) copyText(el.textContent.trim(), btn);
  });
});

// === FAB: Copy Prompt (post page) ===
const fabCopy = document.getElementById('fabCopy');
if (fabCopy) {
  fabCopy.addEventListener('click', () => {
    const promptEl = document.getElementById('prompt');
    if (promptEl) copyText(promptEl.textContent.trim(), fabCopy);
  });
}

// === FAB: Back to Top ===
const fabTop = document.getElementById('fabTop');
if (fabTop) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      fabTop.classList.add('visible');
    } else {
      fabTop.classList.remove('visible');
    }
  }, { passive: true });

  fabTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// === Lazy load enhancement (native loading="lazy" sudah cukup, ini untuk bonus fade-in) ===
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.art-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    io.observe(card);
  });
}

// === Giscus Theme Sync ===
function updateGiscusTheme(newTheme) {
  const giscusTheme = newTheme === 'dark' ? 'dark_dimmed' : 'light';
  const iframe = document.querySelector('iframe.giscus-frame');

  if (iframe) {
    iframe.contentWindow.postMessage(
      { giscus: { setConfig: { theme: giscusTheme } } },
      'https://giscus.app'
    );
  }
}

// Hook ke fungsi setTheme yang sudah ada
const originalSetTheme = typeof setTheme === 'function' ? setTheme : null;

// Override: setiap kali tema berubah, update Giscus juga
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    // Baca tema BARU setelah toggle
    setTimeout(() => {
      const newTheme = document.documentElement.getAttribute('data-theme');
      updateGiscusTheme(newTheme);
    }, 50); // Delay kecil agar data-theme sudah ter-update
  });
}

// Listen perubahan system preference (jika user belum set manual)
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  const saved = localStorage.getItem('theme');
  if (!saved) {
    const newTheme = e.matches ? 'dark' : 'light';
    updateGiscusTheme(newTheme);
  }
});
