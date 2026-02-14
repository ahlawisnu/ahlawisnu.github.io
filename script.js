// Fungsi generatePrompt() yang lama kini akan memanggil generatePromptJson()
function generatePrompt() {
    const s = id => document.getElementById(id).value;
    let prompt = s('subjek');
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
    document.getElementById('output').textContent = "🎨 Prompt:\n" + prompt;
  }
  
  // Fungsi-fungsi lain dari skrip Anda yang tidak diubah
  function copyPrompt() {
    const text = document.getElementById('output').textContent.replace("🎨 Prompt:\n", "");
    navigator.clipboard.writeText(text).then(() => {
      document.getElementById('copyBtn').textContent = "✅ Prompt Disalin!";
      setTimeout(() => {
        document.getElementById('copyBtn').textContent = "📋 Salin Prompt";
      }, 2000);
    });
  }

  function handleSelectChange(fieldId) {
    const select = document.getElementById(fieldId + "Select");
    const input = document.getElementById(fieldId);
    input.value = select.value;
    generatePrompt();
  }

  function resetForm() {
    document.querySelectorAll("input[type='text'], textarea").forEach(el => el.value = '');
    generatePrompt();
  }

  function exportToTxt() {
    const text = document.getElementById('output').textContent.replace("🎨 Prompt:\n", "");
    const blob = new Blob([text], {type: 'text/plain'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'prompt_ai.txt';
    link.click();
    URL.revokeObjectURL(url);
  }
  
  // hair style 
  function updateHair() {
    const select = document.getElementById("hairSelect");
    const selectedOptions = Array.from(select.selectedOptions).map(opt => opt.value);
    const input = document.getElementById("gayaRambut");
    // Masukkan hasil pilihan ke dalam input
    input.value = selectedOptions.join(", ");
    generatePrompt();
  }

  // pakaian 
  function updatePakaian() {
    const select = document.getElementById("pakaianSelect");
    const selectedOptions = Array.from(select.selectedOptions).map(opt => opt.value);
    const input = document.getElementById("pakaian");
    // Masukkan hasil pilihan ke dalam input
    input.value = selectedOptions.join(", ");
    generatePrompt();
  }
  
  // Update pose
  function updatePose() {
    const select = document.getElementById("poseSelect");
    const selectedOptions = Array.from(select.selectedOptions).map(opt => opt.value);
    const input = document.getElementById("pose");
    // Masukkan hasil pilihan ke dalam input
    input.value = selectedOptions.join(", ");
    generatePrompt();
  }

  // KAMERA
  function updateKamera() {
    const select = document.getElementById("kameraSelect");
    const selectedOptions = Array.from(select.selectedOptions).map(opt => opt.value);
    const input = document.getElementById("kamera");
      
    // Masukkan hasil pilihan ke dalam input
    input.value = selectedOptions.join(", ");
    generatePrompt();
  }
  function updateDetail() {
    const select = document.getElementById("detailSelect");
    const selectedOptions = Array.from(select.selectedOptions).map(opt => opt.value);
    document.getElementById("detail").value = selectedOptions.join(", ");
    generatePrompt();
  }

  function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
  }
  // background multiple
  
  function updateLatar() {
    const select = document.getElementById("latarSelect");
    const selectedOptions = Array.from(select.selectedOptions).map(opt => opt.value);
    const input = document.getElementById("latar");
    // Masukkan hasil pilihan ke dalam input
    input.value = selectedOptions.join(", ");
    generatePrompt();
  }
  // Load dark mode from localStorage
  window.onload = () => {
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'enabled') {
      document.body.classList.add('dark-mode');
    }
  };
  // APPS
  if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(registration => {
      console.log('Service Worker terdaftar:', registration);
    })
    .catch(error => {
      console.log('Gagal mendaftarkan Service Worker:', error);
    });
  } 
  // if
  let deferredPrompt;

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    
    const btnInstall = document.getElementById('installBtn');
    btnInstall.style.display = 'block';

    btnInstall.addEventListener('click', () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the install prompt');
          } else {
            console.log('User dismissed the install prompt');
          }
          deferredPrompt = null;
        });
      }
    });
  }); 
    
  // Tampilkan modal
  function openFavoritesModal() {
    showFavorites();
    document.getElementById("favoritesModal").style.display = "flex";
  }

  // Tutup modal
  function closeFavoritesModal() {
    document.getElementById("favoritesModal").style.display = "none";
  }

  // Tampilkan semua favorit
  function showFavorites() {
    const list = document.getElementById("favoritesList");
    const favorites = JSON.parse(localStorage.getItem("aiPrompts")) || [];
    list.innerHTML = "";

    if (favorites.length === 0) {
      list.innerHTML = "<em>Belum ada prompt favorit.</em>";
      return;
    }

    favorites.forEach((prompt, index) => {
      const li = document.createElement("li");
      li.textContent = prompt;

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "🗑️";
      deleteBtn.style.marginLeft = "10px";
      deleteBtn.onclick = () => {
        const updated = favorites.filter((_, i) => i !== index);
        localStorage.setItem("aiPrompts", JSON.stringify(updated));
        showFavorites();
      };

      li.appendChild(deleteBtn);
      list.appendChild(li);
    });
  }

  // Filter pencarian di modal
  function filterFavorites() {
    const search = document.getElementById("searchFav").value.toLowerCase();
    const favorites = JSON.parse(localStorage.getItem("aiPrompts")) || [];
    const filtered = favorites.filter(prompt => prompt.toLowerCase().includes(search));

    const list = document.getElementById("favoritesList");
    list.innerHTML = "";

    if (filtered.length === 0) {
      list.innerHTML = "<em>Tidak ada hasil ditemukan.</em>";
      return;
    }

    filtered.forEach((prompt, index) => {
      const li = document.createElement("li");
      li.textContent = prompt;

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "🗑️";
      deleteBtn.style.marginLeft = "10px";
      deleteBtn.onclick = () => {
        const updated = favorites.filter((_, i) => i !== index);
        localStorage.setItem("aiPrompts", JSON.stringify(updated));
        filterFavorites(); // Update tampilan setelah hapus
      };

      li.appendChild(deleteBtn);
      list.appendChild(li);
    });
  }

  function saveToFavorites() {
    const output = document.getElementById("output").textContent.replace("🎨 Prompt:\n", "").trim();
    
    if (!output) {
      alert("Prompt kosong, tidak ada yang bisa disimpan.");
      return;
    }

    // Ambil data dari localStorage
    let favorites = JSON.parse(localStorage.getItem("aiPrompts")) || [];

    // Cek duplikasi
    if (favorites.includes(output)) {
      alert("Prompt ini sudah tersimpan sebelumnya.");
      return;
    }

    // Tambahkan ke daftar
    favorites.push(output);
    localStorage.setItem("aiPrompts", JSON.stringify(favorites));

    alert("Prompt berhasil disimpan sebagai favorit!");
  }

// toggle menu

document.querySelector('.menu-toggle').addEventListener('click', function() {
  document.querySelector('.navbar ul').classList.toggle('active');
});

// Toggle Navbar on Mobile
      const navToggle = document.getElementById('navToggle');
      const navbar = document.getElementById('navbar');
      const navLinks = document.querySelectorAll('.nav-link');

      navToggle.addEventListener('click', () => {
          navbar.classList.toggle('active');
          navToggle.textContent = navbar.classList.contains('active') ? '✕' : '☰';
      });

      // Close navbar when clicking on mobile
      navLinks.forEach(link => {
          link.addEventListener('click', () => {
              if (window.innerWidth <= 768) {
                  navbar.classList.remove('active');
                  navToggle.textContent = '☰';
              }
          });
      });

      // Active State Management & Smooth Scroll
      navLinks.forEach(link => {
          link.addEventListener('click', (e) => {
              e.preventDefault();
              
              // Remove active class from all links
              navLinks.forEach(l => l.classList.remove('active'));
              
              // Add active class to clicked link
              link.classList.add('active');
              
              // Smooth scroll to section
              const targetId = link.getAttribute('href');
              const targetSection = document.querySelector(targetId);
              
              if (targetSection) {
                  targetSection.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start'
                  });
              }
          });
      });

      // Scroll Spy - Update active state on scroll
      const sections = document.querySelectorAll('.section');
      
      window.addEventListener('scroll', () => {
          let current = '';
          
          sections.forEach(section => {
              const sectionTop = section.offsetTop;
              const sectionHeight = section.clientHeight;
              
              if (scrollY >= (sectionTop - sectionHeight / 3)) {
                  current = section.getAttribute('id');
              }
          });

          navLinks.forEach(link => {
              link.classList.remove('active');
              if (link.getAttribute('href') === `#${current}`) {
                  link.classList.add('active');
              }
          });
      });

      // Close navbar when clicking outside on mobile
      document.addEventListener('click', (e) => {
          if (window.innerWidth <= 768) {
              if (!navbar.contains(e.target) && !navToggle.contains(e.target)) {
                  navbar.classList.remove('active');
                  navToggle.textContent = '☰';
              }
          }
      });

      // Handle resize
      window.addEventListener('resize', () => {
          if (window.innerWidth > 768) {
              navbar.classList.remove('active');
              navToggle.textContent = '☰';
          }
      });
