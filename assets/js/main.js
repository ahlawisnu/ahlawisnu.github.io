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

// === Giscus Theme Sync (Fixed) ===
function updateGiscusTheme(appTheme) {
  const giscusTheme = appTheme === 'dark' ? 'dark_dimmed' : 'light';
  const iframe = document.querySelector('iframe.giscus-frame');

  window.__giscusTheme = giscusTheme;

  if (!iframe) {
    console.log('[Giscus] Iframe belum ada, skip');
    return;
  }

  try {
    console.log('[Giscus] Mengirim theme:', giscusTheme);
    iframe.contentWindow.postMessage(
      { giscus: { setConfig: { theme: giscusTheme } } },
      'https://giscus.app'
    );
  } catch (err) {
    console.warn('[Giscus] Gagal update theme:', err);
  }
}

// ✅ ANTI-FLASH: Hide iframe saat pertama kali muncul
(function() {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.tagName === 'IFRAME' && node.classList.contains('giscus-frame')) {
          console.log('[Giscus] Iframe detected, hiding...');
          
          // Hide iframe
          node.style.opacity = '0';
          node.style.transition = 'opacity 0.3s ease';

          // Sync theme setelah iframe ready
          setTimeout(() => {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
            updateGiscusTheme(currentTheme);

            // Fade in
            setTimeout(() => {
              node.style.opacity = '1';
              console.log('[Giscus] Iframe visible dengan theme:', currentTheme);
            }, 100);
          }, 100);
        }
      });
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
})();

// ✅ Event listener untuk toggle theme
// Cari tombol toggle dan pastikan memanggil updateGiscusTheme
const themeToggleBtn = document.getElementById('themeToggle');
if (themeToggleBtn) {
  // Clone node untuk hapus semua listener lama
  const newToggle = themeToggleBtn.cloneNode(true);
  themeToggleBtn.parentNode.replaceChild(newToggle, themeToggleBtn);

  // Pasang listener baru
  newToggle.addEventListener('click', () => {
    const root = document.documentElement;
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

    // ✅ Update Giscus dengan delay
    setTimeout(() => {
      updateGiscusTheme(newTheme);
    }, 50);

    console.log('[Theme] Changed to:', newTheme);
  });
}

// Listen system preference change
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (!localStorage.getItem('theme')) {
    const newTheme = e.matches ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    updateGiscusTheme(newTheme);
  }
});

// Listen pesan dari Giscus
window.addEventListener('message', (event) => {
  if (event.origin !== 'https://giscus.app') return;

  const data = event.data;
  if (data && data.giscus) {
    window.__giscusReady = true;
    console.log('[Giscus] Ready signal received');
    
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    setTimeout(() => {
      updateGiscusTheme(currentTheme);
    }, 100);
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

// === PWA Service Worker Registration ===
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => console.log('[PWA] Service Worker registered:', reg.scope))
      .catch(err => console.warn('[PWA] SW registration failed:', err));
  });
}

// === PWA Install Banner (Fixed Version) ===
(function() {
  'use strict';

  // ✅ #GitHub │ ahlawisnu.github.io Cek apakah banner pernah ditutup atau app sudah terinstall
  // Jika sudah, hentikan script agar banner tidak dibuat/ditampilkan lagi
  if (localStorage.getItem('pwa_banner_dismissed') === 'true') {
    console.log('[PWA] Banner sudah pernah ditutup/diinstall. Tidak akan ditampilkan lagi.');
    return; 
  }

  // ✅ Baca data dari meta tags (lebih reliable)
  const siteTitle = document.querySelector('meta[name="pwa-title"]')?.content || 'AI Art Gallery';
  const siteDescription = document.querySelector('meta[name="pwa-description"]')?.content || '';
  const iconUrl = document.querySelector('meta[name="pwa-icon"]')?.content || '/assets/images/icons/icon-192x192.png';
  const baseurl = document.querySelector('meta[name="pwa-baseurl"]')?.content || '';

  console.log('[PWA] Config:', { siteTitle, iconUrl, baseurl });

  let deferredPrompt;
  const installBanner = document.createElement('div');
  installBanner.className = 'pwa-install-banner';
  installBanner.innerHTML = `
    <div class="pwa-banner-content">
      <img src="${iconUrl}" alt="App icon" class="pwa-banner-icon" onerror="this.style.display='none'">
      <div class="pwa-banner-text">
        <strong>📲 Install ${siteTitle}</strong>
        <span>Tambahkan ke Home Screen untuk akses cepat & mode offline</span>
      </div>
    </div>
    <div class="pwa-banner-actions">
      <button class="pwa-btn-install">Install</button>
      <button class="pwa-btn-close">✕</button>
    </div>
  `;

  // ✅ Tunggu DOM ready baru append banner
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      document.body.appendChild(installBanner);
    });
  } else {
    document.body.appendChild(installBanner);
  }

  // ✅ Event: beforeinstallprompt
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installBanner.classList.add('show');
    console.log('[PWA] Install prompt available');
  });

  // ✅ Event: klik Install
  const installBtn = installBanner.querySelector('.pwa-btn-install');
  if (installBtn) {
    installBtn.addEventListener('click', async () => {
      if (!deferredPrompt) {
        console.warn('[PWA] No install prompt available');
        return;
      }
      installBanner.classList.remove('show');
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`[PWA] User choice: ${outcome}`);
      
      // ✅ Simpan status agar banner tidak muncul lagi
      localStorage.setItem('pwa_banner_dismissed', 'true');
      deferredPrompt = null;
    });
  }

  // ✅ Event: klik Close
  const closeBtn = installBanner.querySelector('.pwa-btn-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      installBanner.classList.remove('show');
      // ✅ Simpan status agar banner tidak muncul lagi
      localStorage.setItem('pwa_banner_dismissed', 'true');
    });
  }

  // ✅ Event: app installed
  window.addEventListener('appinstalled', () => {
    installBanner.classList.remove('show');
    localStorage.setItem('pwa_banner_dismissed', 'true');
    console.log('[PWA] App installed');
  });

})();
