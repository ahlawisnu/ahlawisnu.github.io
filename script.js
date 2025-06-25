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
    if (s('kamera')) prompt += `, ${s('kamera')} camera`;
    if (s('latar')) prompt += `, background: ${s('latar')}`;
    if (s('detail')) prompt += `, ${s('detail')}`;
    if (s('gaya')) prompt += `, art style: ${s('gaya')}`;
    if (s('rasio')) prompt += `, aspect ratio: ${s('rasio')}`;
    document.getElementById('output').textContent = "🎨 Prompt:\n" + prompt;
  }

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
  
