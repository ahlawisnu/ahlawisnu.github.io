    // ============================================
    // THEME MANAGEMENT
    // ============================================
    function initTheme() {
      const savedTheme = localStorage.getItem('theme') || 'light';
      document.documentElement.setAttribute('data-theme', savedTheme);
      updateThemeIcon(savedTheme);
    }
    
    function toggleTheme() {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(newTheme);
      showSnackbar(newTheme === 'dark' ? 'Dark mode aktif' : 'Light mode aktif');
    }
    
    function updateThemeIcon(theme) {
      document.getElementById('themeIcon').textContent = theme === 'dark' ? 'light_mode' : 'dark_mode';
    }
    
    // ============================================
    // MOBILE MENU
    // ============================================
    function toggleMobileMenu() {
      const overlay = document.getElementById('mobileOverlay');
      const menu = document.getElementById('mobileMenu');
      const icon = document.getElementById('menuIcon');
      
      overlay.classList.toggle('active');
      menu.classList.toggle('active');
      icon.textContent = menu.classList.contains('active') ? 'close' : 'menu';
      
      document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
    }
    
    // ============================================
    // SNACKBAR
    // ============================================
    function showSnackbar(message) {
      const snackbar = document.getElementById('snackbar');
      document.getElementById('snackbarText').textContent = message;
      snackbar.classList.add('show');
      setTimeout(() => snackbar.classList.remove('show'), 3000);
    }
    
    // ============================================
    // PROMPT GENERATION
    // ============================================
    function generatePrompt() {
      const s = id => document.getElementById(id)?.value || '';
      
      let prompt = s('subjek');
      if (!prompt) {
        document.getElementById('output').textContent = 'Prompt akan muncul di sini...';
        return;
      }
      
      if (s('genre')) prompt += `, ${s('genre')} theme`;
      if (s('negara')) prompt += `, ${s('negara')}`;
      if (s('gayaRambut')) prompt += `, hairstyle: ${s('gayaRambut')}`;
      if (s('warnaRambut')) prompt += `, hair color: ${s('warnaRambut')}`;
      if (s('pakaian')) prompt += `, ${s('pakaian')}`;
      if (s('ekspresi')) prompt += `, expression: ${s('ekspresi')}`;
      if (s('pose')) prompt += `, ${s('pose')}`;
      if (s('kamera')) prompt += `, ${s('kamera')}`;
      if (s('latar')) prompt += `, background: ${s('latar')}`;
      if (s('detail')) prompt += `, ${s('detail')}`;
      if (s('gaya')) prompt += `, art style: ${s('gaya')}`;
      if (s('rasio')) prompt += `, aspect ratio: ${s('rasio')}`;
      
      document.getElementById('output').textContent = prompt;
    }
    
    // ============================================
    // SELECT HANDLERS
    // ============================================
    function handleSelectChange(fieldId) {
      const select = document.getElementById(fieldId + 'Select');
      const input = document.getElementById(fieldId);
      if (select && input) {
        input.value = select.value;
        generatePrompt();
      }
    }
    
    function updateMultipleSelect(selectId, inputId) {
      const select = document.getElementById(selectId);
      const input = document.getElementById(inputId);
      if (select && input) {
        const values = Array.from(select.selectedOptions).map(opt => opt.value).filter(v => v);
        if (values.length) input.value = values.join(', ');
        generatePrompt();
      }
    }
    
    function updateHair() { updateMultipleSelect('hairSelect', 'gayaRambut'); }
    function updatePakaian() { updateMultipleSelect('pakaianSelect', 'pakaian'); }
    function updatePose() { updateMultipleSelect('poseSelect', 'pose'); }
    function updateKamera() { updateMultipleSelect('kameraSelect', 'kamera'); }
    function updateDetail() { updateMultipleSelect('detailSelect', 'detail'); }
    function updateLatar() { updateMultipleSelect('latarSelect', 'latar'); }
    
    // ============================================
    // FORM ACTIONS
    // ============================================
    function resetForm() {
      document.querySelectorAll('input[type="text"]').forEach(el => el.value = '');
      document.querySelectorAll('select').forEach(el => {
        el.selectedIndex = 0;
        if (el.multiple) {
          Array.from(el.options).forEach(opt => opt.selected = false);
        }
      });
      generatePrompt();
      showSnackbar('Form direset');
    }
    
    function copyPrompt() {
      const output = document.getElementById('output').textContent;
      if (output === 'Prompt akan muncul di sini...' || !output.trim()) {
        showSnackbar('Prompt kosong!');
        return;
      }
      
      navigator.clipboard.writeText(output).then(() => {
        showSnackbar('Prompt disalin ke clipboard!');
        const btn = document.getElementById('copyBtn');
        const original = btn.innerHTML;
        btn.innerHTML = '<span class="material-icons-round">check</span> Tersalin!';
        setTimeout(() => btn.innerHTML = original, 2000);
      });
    }
    
    function exportToTxt() {
      const output = document.getElementById('output').textContent;
      if (output === 'Prompt akan muncul di sini...') {
        showSnackbar('Prompt kosong!');
        return;
      }
      
      const blob = new Blob([output], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'prompt-ai-' + new Date().toISOString().slice(0, 10) + '.txt';
      link.click();
      URL.revokeObjectURL(url);
      showSnackbar('Prompt diexport!');
    }
    
    // ============================================
    // FAVORITES
    // ============================================
    function saveToFavorites() {
      const output = document.getElementById('output').textContent;
      if (output === 'Prompt akan muncul di sini...' || !output.trim()) {
        showSnackbar('Prompt kosong!');
        return;
      }
      
      let favorites = JSON.parse(localStorage.getItem('aiPrompts')) || [];
      
      if (favorites.includes(output)) {
        showSnackbar('Prompt sudah ada di favorit');
        return;
      }
      
      favorites.unshift(output);
      localStorage.setItem('aiPrompts', JSON.stringify(favorites));
      showSnackbar('Prompt disimpan ke favorit!');
    }
    
    function openFavoritesModal() {
      document.getElementById('favoritesModal').classList.add('active');
      showFavorites();
      document.body.style.overflow = 'hidden';
    }
    
    function closeFavoritesModal() {
      document.getElementById('favoritesModal').classList.remove('active');
      document.body.style.overflow = '';
    }
    
    function showFavorites() {
      const list = document.getElementById('favoritesList');
      const favorites = JSON.parse(localStorage.getItem('aiPrompts')) || [];
      
      if (favorites.length === 0) {
        list.innerHTML = `
          <li class="empty-state">
            <span class="material-icons-round">bookmark_border</span>
            <p>Belum ada prompt favorit</p>
          </li>
        `;
        return;
      }
      
      list.innerHTML = favorites.map((prompt, index) => `
        <li class="favorite-item">
          <span class="favorite-text">${escapeHtml(prompt)}</span>
          <div class="favorite-actions">
            <button class="icon-btn" onclick="copyFavorite(${index})" title="Copy">
              <span class="material-icons-round">content_copy</span>
            </button>
            <button class="icon-btn delete" onclick="deleteFavorite(${index})" title="Hapus">
              <span class="material-icons-round">delete</span>
            </button>
          </div>
        </li>
      `).join('');
    }
    
    function filterFavorites() {
      const search = document.getElementById('searchFav').value.toLowerCase();
      const favorites = JSON.parse(localStorage.getItem('aiPrompts')) || [];
      const filtered = favorites.filter(p => p.toLowerCase().includes(search));
      const list = document.getElementById('favoritesList');
      
      if (filtered.length === 0) {
        list.innerHTML = `
          <li class="empty-state">
            <span class="material-icons-round">search_off</span>
            <p>Tidak ada hasil</p>
          </li>
        `;
        return;
      }
      
      list.innerHTML = filtered.map((prompt) => {
        const originalIndex = favorites.indexOf(prompt);
        return `
          <li class="favorite-item">
            <span class="favorite-text">${escapeHtml(prompt)}</span>
            <div class="favorite-actions">
              <button class="icon-btn" onclick="copyFavorite(${originalIndex})" title="Copy">
                <span class="material-icons-round">content_copy</span>
              </button>
              <button class="icon-btn delete" onclick="deleteFavorite(${originalIndex})" title="Hapus">
                <span class="material-icons-round">delete</span>
              </button>
            </div>
          </li>
        `;
      }).join('');
    }
    
    function copyFavorite(index) {
      const favorites = JSON.parse(localStorage.getItem('aiPrompts')) || [];
      if (favorites[index]) {
        navigator.clipboard.writeText(favorites[index]);
        showSnackbar('Prompt disalin!');
      }
    }
    
    function deleteFavorite(index) {
      let favorites = JSON.parse(localStorage.getItem('aiPrompts')) || [];
      favorites.splice(index, 1);
      localStorage.setItem('aiPrompts', JSON.stringify(favorites));
      showFavorites();
      showSnackbar('Prompt dihapus');
    }
    
    function clearAllFavorites() {
      if (confirm('Hapus semua prompt favorit?')) {
        localStorage.removeItem('aiPrompts');
        showFavorites();
        showSnackbar('Semua favorit dihapus');
      }
    }
    
    function escapeHtml(text) {
      const div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
    }
    
    // ============================================
    // EVENT LISTENERS
    // ============================================
    document.addEventListener('DOMContentLoaded', function() {
      initTheme();
      generatePrompt();
    });
    
    // Close modal on overlay click
    document.getElementById('favoritesModal').addEventListener('click', function(e) {
      if (e.target === this) closeFavoritesModal();
    });
    
    // Close on Escape
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        closeFavoritesModal();
        const menu = document.getElementById('mobileMenu');
        if (menu.classList.contains('active')) toggleMobileMenu();
      }
    });
    
    // Service Worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(reg => console.log('SW registered:', reg))
        .catch(err => console.log('SW failed:', err));
    }
