---
layout: post
title: "Tutorial: Cara Membuat Prompt Fotorealistik Kawaii Fashion untuk AI Image Generator"
date: 2026-07-18
categories: [portrait]
image: https://file.garden/aGUfgZGhfBC3mQSW/AI/1784306778013.png
description: "mempelajari cara mengubah sebuah gambar referensi menjadi prompt teks yang sangat detail dan kemudian menggunakannya untuk menghasilkan gambar baru yang konsisten menggunakan AI (seperti FLUX atau model lain via ChatGPT/DALL-E)."
model: "GENERAL"
prompt: "\"High-fidelity realistic portrait, young woman with fair smooth skin, shoulder-length light brown hair with bangs. Wearing denim newsboy cap with pink star and heart patches, light blue tank top with cartoon girl graphic, blue gingham shirt tied at waist, grey sweatpants with pink ruffled cuffs, light blue sneakers. Kneeling pose, one hand adjusting hat brim, bright smile, silver metallic star-shaped bag with stickers on shoulder. Solid light blue studio background, soft even lighting, eye-level angle, full-body shot, sharp focus, photorealistic style, kawaii street fashion aesthetic.\""
negative_prompt: ""
parameters:
  AR: "9:16"
---

Dalam tutorial ini, kita akan mempelajari cara mengubah sebuah gambar referensi menjadi prompt teks yang sangat detail dan kemudian menggunakannya untuk menghasilkan gambar baru yang konsisten menggunakan AI (seperti FLUX atau model lain via ChatGPT/DALL-E).

Kita akan menggunakan contoh gaya "Kawaii Street Fashion" dengan latar belakang studio biru muda.

Langkah 1: Analisis Visual & Ekstraksi Detail
Sebelum menulis prompt, bedah gambar referensi Anda menjadi elemen-elemen kunci. Jangan hanya melihat "gadis lucu", tapi pecah menjadi kategori berikut:

*   Subjek: Wanita muda, kulit cerah mulus, rambut cokelat muda sebahu dengan poni.
*   Pakaian (Outfit):
    *   Top: Tank top biru muda dengan grafis kartun gadis.
    *   Aksesoris: Topi denim newsboy (patch bintang & hati pink), kemeja kotak-kotak biru putih diikat di pinggang.
    *   Bawah: Celana jogger abu-abu dengan manset ruffle pink.
    *   Sepatu & Tas: Sneaker biru muda, tas bahu berbentuk bintang perak metalik dengan stiker.
*   Pose & Ekspresi: Berlutut (kneeling pose), satu tangan memegang ujung topi, senyum cerah menatap kamera.
*   Lingkungan & Pencahayaan: Latar belakang studio biru solid (solid light blue), pencahayaan lembut merata (soft even lighting).
*   Sudut Kamera: Eye-level (sejajar mata), full-body shot (tampak seluruh badan).
*   Gaya: Realistic, photorealistic, kawaii aesthetic.

Langkah 2: Meracik Prompt (Formula 70 Kata)
Gabungkan elemen di atas menjadi paragraf deskriptif dalam bahasa Inggris. Gunakan struktur: [Gaya] + [Subjek] + [Detail Pakaian] + [Pose] + [Latar/Lighting] + [Teknis Kamera].

Contoh Prompt Hasil Analisis:

```text
"High-fidelity realistic portrait, young woman with fair smooth skin, shoulder-length light brown hair with bangs. Wearing denim newsboy cap with pink star and heart patches, light blue tank top with cartoon girl graphic, blue gingham shirt tied at waist, grey sweatpants with pink ruffled cuffs, light blue sneakers. Kneeling pose, one hand adjusting hat brim, bright smile, silver metallic star-shaped bag with stickers on shoulder. Solid light blue studio background, soft even lighting, eye-level angle, full-body shot, sharp focus, photorealistic style, kawaii street fashion aesthetic."
```

Langkah 3: Eksekusi ke ChatGPT / AI Image Generator
Setelah prompt jadi, Anda bisa langsung menggunakannya. Berikut cara meminta ChatGPT (yang memiliki fitur DALL-E) atau AI generator lain untuk membuatnya:

Opsi A: Meminta ChatGPT Generate Gambar Langsung
Ketik perintah berikut di chat:

"Buatkan gambar berdasarkan prompt berikut ini dengan gaya fotorealistik tinggi:
[TEMPEL PROMPT DI SINI]"

Opsi B: Menggunakan Prompt untuk Model Lain (Midjourney/FLUX/Stable Diffusion)
Jika Anda menggunakan tools eksternal, copy prompt tersebut dan tambahkan parameter teknis jika perlu. Contoh untuk Midjourney:
[PROMPT] --ar 9:16 --stylize 750 --v 6.0

Tips Tambahan Agar Hasil Maksimal
1.  Hindari Ambiguitas: Jangan tulis "baju bagus". Tulis "light blue tank top with cartoon graphic". Semakin spesifik, semakin akurat.
2.  Konsistensi Warna: Sebutkan warna secara eksplisit (misal: "silver metallic", "pink ruffled").
3.  Pencahayaan adalah Kunci: Kata kunci seperti "soft even lighting" atau "studio lighting" membantu AI menghindari bayangan aneh dan membuat kulit terlihat halus.
4.  Iterasi: Jika hasil pertama belum pas, ubah sedikit bagian pose atau ekspresi pada prompt, lalu generate ulang.

Dengan mengikuti langkah-langkah ini, Anda bisa mereplikasi gaya foto apa pun menjadi prompt yang powerful untuk kreasi AI art Anda!