// === Theme Toggle ===
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;
const iconSun = document.querySelector('.icon-sun');
const iconMoon = document.querySelector('.icon-moon');

function setTheme(theme) {
  root.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  if (iconSun && iconMoon) {
    iconSun.style.display = theme === 'dark' ? 'none' : 'block';
    iconMoon.style.display = theme === 'dark' ? 'block' : 'none';
  }
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
  });
}

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
    btn.innerHTML = ' ✅ Tersalin!';
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

// === FAB: Back to Top (Enhanced) ===
const fabTop = document.getElementById('fabTop');

if (fabTop) {
  let scrollTimeout;
  let isScrolling = false;

  // Function untuk cek scroll position
  function checkScroll() {
    const scrollY = window.scrollY || window.pageYOffset;
    const viewportHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // Tampilkan FAB jika sudah scroll > 400px DAN halaman cukup panjang
    if (scrollY > 400 && documentHeight > viewportHeight * 1.5) {
      fabTop.classList.add('visible');
    } else {
      fabTop.classList.remove('visible');
    }
  }

  // Scroll listener dengan throttle
  window.addEventListener('scroll', () => {
    if (!isScrolling) {
      window.requestAnimationFrame(() => {
        checkScroll();
        isScrolling = false;
      });
      isScrolling = true;
    }

    // Debounce untuk performa
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(checkScroll, 100);
  }, { passive: true });

  // Click handler
  fabTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    // Focus management untuk accessibility
    document.body.focus();
  });

  // Keyboard support
  fabTop.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      fabTop.click();
    }
  });

  // Initial check
  checkScroll();

  // Re-check saat resize (misal: rotate device)
  window.addEventListener('resize', () => {
    setTimeout(checkScroll, 100);
  }, { passive: true });

  // Re-check saat orientation change
  window.addEventListener('orientationchange', () => {
    setTimeout(checkScroll, 300);
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

// === Copy to Clipboard System ===

// Toast notification
function showToast(message) {
  // Hapus toast yang sudah ada
  const existing = document.querySelector('.copy-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'copy-toast';
  toast.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
    <span>${message}</span>
  `;
  document.body.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  // Auto remove
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 2000);
}

// Fungsi copy utama
async function copyToClipboard(text, btn) {
  try {
    await navigator.clipboard.writeText(text);
    // Sukses
    btn.classList.add('copied');
    const originalHTML = btn.innerHTML;
    btn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
      Tersalin!
    `;
    showToast('Berhasil disalin ke clipboard');

    setTimeout(() => {
      btn.classList.remove('copied');
      btn.innerHTML = originalHTML;
    }, 2000);
  } catch (err) {
    // Fallback untuk browser lama
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    textarea.style.top = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();

    try {
      document.execCommand('copy');
      showToast('Berhasil disalin ke clipboard');
    } catch (e) {
      showToast('Gagal menyalin. Coba manual.');
    }

    document.body.removeChild(textarea);
  }
}

// === Auto-wrap semua <pre><code> dengan tombol copy ===
function initCodeBlocks() {
  const preElements = document.querySelectorAll('pre');

  preElements.forEach(pre => {
    // Skip jika sudah di-wrap
    if (pre.closest('.code-block') || pre.closest('.prompt-block')) return;

    const code = pre.querySelector('code');
    if (!code) return;

    // Deteksi bahasa dari class (Jekyll/Rouge output: class="language-python")
    const langClass = Array.from(code.classList)
      .find(c => c.startsWith('language-'));
    const language = langClass ? langClass.replace('language-', '') : 'code';

    // Language label yang user-friendly
    const langLabels = {
      'plaintext': 'Text',
      'text': 'Text',
      'code': 'Code',
      'javascript': 'JavaScript',
      'js': 'JavaScript',
      'typescript': 'TypeScript',
      'ts': 'TypeScript',
      'python': 'Python',
      'py': 'Python',
      'html': 'HTML',
      'css': 'CSS',
      'scss': 'SCSS',
      'yaml': 'YAML',
      'yml': 'YAML',
      'json': 'JSON',
      'bash': 'Bash',
      'sh': 'Shell',
      'shell': 'Shell',
      'markdown': 'Markdown',
      'md': 'Markdown',
      'ruby': 'Ruby',
      'rb': 'Ruby',
      'sql': 'SQL',
      'xml': 'XML',
      'jsx': 'JSX',
      'tsx': 'TSX',
      'prompt': 'Prompt',
    };

    const displayLang = langLabels[language.toLowerCase()] || language;

    // Buat wrapper
    const wrapper = document.createElement('div');
    wrapper.className = 'code-block';

    // Header
    const header = document.createElement('div');
    header.className = 'code-block-header';
    header.innerHTML = `
      <span class="code-block-lang">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="16 18 22 12 16 6"></polyline>
          <polyline points="8 6 2 12 8 18"></polyline>
        </svg>
        ${displayLang}
      </span>
      <button class="copy-btn" aria-label="Copy code">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
        Salin
      </button>
    `;

    // Insert wrapper
    pre.parentNode.insertBefore(wrapper, pre);
    wrapper.appendChild(header);
    wrapper.appendChild(pre);

    // Event listener untuk tombol copy
    const copyBtn = header.querySelector('.copy-btn');
    copyBtn.addEventListener('click', () => {
      const text = code.textContent.trim();
      copyToClipboard(text, copyBtn);
    });
  });
}

// === Init Prompt Blocks (dari front matter) ===
function initPromptBlocks() {
  document.querySelectorAll('.prompt-block .copy-btn, .prompt-copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const block = btn.closest('.prompt-block') || btn.closest('.code-block');
      const code = block ? block.querySelector('code') : null;
      if (code) {
        copyToClipboard(code.textContent.trim(), btn);
      }
    });
  });

  // FAB Copy (jika ada di halaman post)
  const fabCopy = document.getElementById('fabCopy');
  if (fabCopy) {
    fabCopy.addEventListener('click', () => {
      const promptEl = document.getElementById('prompt');
      if (promptEl) {
        copyToClipboard(promptEl.textContent.trim(), fabCopy);
      }
    });
  }
}

// Jalankan saat DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initCodeBlocks();
  initPromptBlocks();
});

// === Landscape Overflow Detection ===
function checkLandscapeOverflow() {
  if (window.matchMedia('(orientation: landscape) and (max-height: 500px)').matches) {
    const navLinks = document.getElementById('navLinks');
    if (navLinks && navLinks.scrollWidth > navLinks.clientWidth) {
      navLinks.classList.add('overflow-auto');
    } else if (navLinks) {
      navLinks.classList.remove('overflow-auto');
    }
  }
}

window.addEventListener('resize', checkLandscapeOverflow);
window.addEventListener('orientationchange', () => {
  setTimeout(checkLandscapeOverflow, 300);
});
document.addEventListener('DOMContentLoaded', checkLandscapeOverflow);

// === Giscus Theme Sync (Robust Version) ===

// Fungsi untuk kirim pesan ke Giscus iframe
function updateGiscusTheme(appTheme) {
  const giscusTheme = appTheme === 'dark' ? 'dark_dimmed' : 'light';
  const iframe = document.querySelector('iframe.giscus-frame');

  // Simpan tema terbaru
  window.__giscusTheme = giscusTheme;

  if (!iframe) {
    console.log('[Giscus] Iframe belum ada, skip update');
    return;
  }

  // Kirim pesan ke Giscus
  const message = {
    setConfig: {
      theme: giscusTheme
    }
  };

  try {
    iframe.contentWindow.postMessage(
      { giscus: message },
      'https://giscus.app'
    );
    console.log('[Giscus] Theme updated to:', giscusTheme);
  } catch (err) {
    console.warn('[Giscus] Gagal update theme:', err);
  }
}

// === Hook ke setTheme yang sudah ada ===
// Kita override fungsi setTheme dengan menambahkan Giscus sync

// Cari tombol toggle
const themeToggleBtn = document.getElementById('themeToggle');
const root = document.documentElement;

if (themeToggleBtn) {
  // Hapus listener lama (kalau ada) untuk mencegah duplikasi
  const newToggle = themeToggleBtn.cloneNode(true);
  themeToggleBtn.parentNode.replaceChild(newToggle, themeToggleBtn);

  // Pasang listener baru
  newToggle.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    const newTheme = current === 'dark' ? 'light' : 'dark';

    // Update tema app
    root.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    // Update icon
    const iconSun = document.querySelector('.icon-sun');
    const iconMoon = document.querySelector('.icon-moon');
    if (iconSun && iconMoon) {
      iconSun.style.display = newTheme === 'dark' ? 'none' : 'block';
      iconMoon.style.display = newTheme === 'dark' ? 'block' : 'none';
    }

    // ✅ Update Giscus (dengan delay untuk pastikan DOM updated)
    setTimeout(() => {
      updateGiscusTheme(newTheme);
    }, 50);
  });
}

// === Listen system preference change ===
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (!localStorage.getItem('theme')) {
    const newTheme = e.matches ? 'dark' : 'light';
    root.setAttribute('data-theme', newTheme);
    updateGiscusTheme(newTheme);
  }
});

// === Listen pesan dari Giscus (untuk konfirmasi iframe ready) ===
window.addEventListener('message', (event) => {
  // Hanya terima pesan dari giscus.app
  if (event.origin !== 'https://giscus.app') return;

  const data = event.data;
  if (!data || typeof data !== 'object') return;

  // Giscus kirim message saat iframe ready
  if (data.giscus) {
    window.__giscusReady = true;
    console.log('[Giscus] Received ready signal from iframe');

    // Kirim tema saat ini ke iframe yang baru ready
    const currentTheme = root.getAttribute('data-theme') || 'light';
    setTimeout(() => {
      updateGiscusTheme(currentTheme);
    }, 100);
  }
});

// === Fallback: Cek berkala apakah iframe sudah ada ===
// (Untuk browser yang tidak support message event dengan baik)
setInterval(() => {
  const iframe = document.querySelector('iframe.giscus-frame');
  if (iframe && !window.__giscusReady) {
    window.__giscusReady = true;
    const currentTheme = root.getAttribute('data-theme') || 'light';
    updateGiscusTheme(currentTheme);
  }
}, 500);
