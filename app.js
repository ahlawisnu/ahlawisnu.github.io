// Fungsi utama untuk menghasilkan prompt teks dan JSON secara real-time
function generatePrompt() {
    const s = id => document.getElementById(id).value;
    let promptText = s('subjek');

    if (s('genre')) promptText += `, ${s('genre')} theme`;
    if (s('negara')) promptText += `, ${s('negara')}`;
    if (s('gayaRambut')) promptText += `, hairstyle: ${s('gayaRambut')}`;
    if (s('warnaRambut')) promptText += `, hair color: ${s('warnaRambut')}`;
    if (s('pakaian')) promptText += `, ${s('pakaian')}`;
    if (s('ekspresi')) promptText += `, expression: ${s('ekspresi')}`;
    if (s('pose')) promptText += `, ${s('pose')}`;
    if (s('kamera')) promptText += `, ${s('kamera')}`;
    if (s('latar')) promptText += `, background: ${s('latar')}`;
    if (s('detail')) promptText += `, ${s('detail')}`;
    if (s('gaya')) promptText += `, art style: ${s('gaya')}`;
    if (s('rasio')) promptText += `, aspect ratio: ${s('rasio')}`;

    document.getElementById('output').textContent = "💌 Prompt:\n" + promptText;
    
    // Memanggil fungsi untuk menampilkan JSON secara real-time
    displayJsonRealtime();
}

// Fungsi untuk menampilkan output JSON
function displayJsonRealtime() {
    const s = id => document.getElementById(id).value;
    const data = {
        subjek: s('subjek') || null,
        genre: s('genre') || null,
        negara: s('negara') || null,
        gayaRambut: s('gayaRambut') || null,
        warnaRambut: s('warnaRambut') || null,
        pakaian: s('pakaian') || null,
        ekspresi: s('ekspresi') || null,
        pose: s('pose') || null,
        kamera: s('kamera') || null,
        latar: s('latar') || null,
        detail: s('detail') || null,
        gaya: s('gaya') || null,
        rasio: s('rasio') || null
    };

    // Hapus properti dengan nilai kosong agar JSON bersih
    for (const key in data) {
        if (data[key] === null || data[key] === '') {
            delete data[key];
        }
    }

    document.getElementById('outputJSON').textContent = JSON.stringify(data, null, 2);
}

// Fungsi untuk menyalin prompt teks
function copyPrompt() {
    const text = document.getElementById('output').textContent.replace("🎨 Prompt:\n", "");
    navigator.clipboard.writeText(text).then(() => {
      // Feedback UI bisa ditambahkan di sini
      alert('Prompt disalin!');
    });
}

// Fungsi untuk mereset semua input form
function resetForm() {
    document.querySelectorAll("input[type='text'], textarea").forEach(el => el.value = '');
    generatePrompt();
}

// Fungsi untuk mengekspor output teks ke file .txt
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

// Fungsi untuk mengekspor output JSON ke file .json
function exportToJson() {
    const data = document.getElementById('outputJSON').textContent;
    if (!data || data.trim() === '{}') {
        alert("Output JSON kosong, tidak ada yang bisa diekspor.");
        return;
    }
    const blob = new Blob([data], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'prompt_ai.json';
    link.click();
    URL.revokeObjectURL(url);
}
