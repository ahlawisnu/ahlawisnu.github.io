---
layout: post
title: "Panduan Prompt AI Generatif: Menciptakan Potret Fotorealistik Estetik Jepang"
date: 2026-07-29
categories: [portrait]
image: https://file.garden/aGUfgZGhfBC3mQSW/AI/1785259712677.png
description: "Merangkai deskripsi scene yang sangat spesifik merupakan keterampilan esensial dalam seni AI generatif. Dengan memberikan instruksi tekstual yang terstruktur, model AI general (seperti Midjourney, Stable Diffusion, atau DALL-E) dapat menghasilkan gambar dengan akurasi dan tingkat realisme yang luar biasa. Artikel tutorial ini akan membedah sebuah prompt kompleks untuk menciptakan potret fotorealistik bergaya slice-of-life Jepang, serta bagaimana cara mengaplikasikannya."
model: "General"
prompt: "\"beautiful young Asian woman (22 years old), preserve the facial features from the reference image, fair porcelain skin, long dark brown hair in a messy ponytail with wispy bangs, white t-shirt under light blue denim short overalls, underwear not visible, hugging a Japanese bus stop sign, head tilted, sweet smile, direct eye contact, rustic wooden bus stop with lush green trees, soft natural daylight, eye-level medium-full portrait, centered composition, shallow depth of field, photorealistic, highly detailed\""
negative_prompt: ""
parameters:
  AR: "9:16"
---

Merangkai deskripsi *scene* yang sangat spesifik merupakan keterampilan esensial dalam seni AI generatif. Dengan memberikan instruksi tekstual yang terstruktur, model AI general (seperti Midjourney, Stable Diffusion, atau DALL-E) dapat menghasilkan gambar dengan akurasi dan tingkat realisme yang luar biasa.
Artikel tutorial ini akan membedah sebuah *prompt* kompleks untuk menciptakan potret fotorealistik bergaya *slice-of-life* Jepang, serta bagaimana cara mengaplikasikannya.
### Teks Prompt Utama
Gunakan teks berikut sebagai *prompt* dasar Anda:
> *"beautiful young Asian woman (22 years old), preserve the facial features from the reference image, fair porcelain skin, long dark brown hair in a messy ponytail with wispy bangs, white t-shirt under light blue denim short overalls, underwear not visible, hugging a Japanese bus stop sign, head tilted, sweet smile, direct eye contact, rustic wooden bus stop with lush green trees, soft natural daylight, eye-level medium-full portrait, centered composition, shallow depth of field, photorealistic, highly detailed"*
> 
### Bedah Elemen Visual Prompt
Untuk memahami bagaimana AI memproses instruksi di atas, kita dapat memecahnya menjadi beberapa kategori struktur deskripsi:
 * **Karakter & Fisik:** Fokus pada "beautiful young Asian woman (22 years old), fair porcelain skin, long dark brown hair in a messy ponytail with wispy bangs". Deskripsi ini memberikan identitas visual yang solid pada subjek.
 * **Pakaian & Batasan:** "white t-shirt under light blue denim short overalls, underwear not visible". Menyebutkan detail pakaian secara berlapis membantu AI menyusun tekstur kain. Frasa "underwear not visible" bertindak sebagai pagar pembatas (*safety prompt*) agar hasil gambar tetap aman dan tidak melenceng ke arah yang tidak diinginkan.
 * **Aksi & Ekspresi:** "hugging a Japanese bus stop sign, head tilted, sweet smile, direct eye contact". Aksi spesifik ini membangun narasi, sementara "direct eye contact" memastikan fokus gambar tertuju pada interaksi antara karakter dan audiens.
 * **Latar Tempat & Pencahayaan:** "rustic wooden bus stop with lush green trees, soft natural daylight". Pencahayaan alami yang lembut sangat krusial untuk menonjolkan estetika fotorealistik tanpa menciptakan bayangan yang terlalu kontras (kasar) pada wajah.
 * **Komposisi & Teknis Kamera:** "eye-level medium-full portrait, centered composition, shallow depth of field, photorealistic, highly detailed". Parameter teknis ini menginstruksikan AI untuk bertindak layaknya fotografer profesional. *Shallow depth of field* (ruang tajam sempit/bokeh) akan memburamkan latar belakang pohon dan menonjolkan subjek.
### Langkah-langkah Eksekusi
Berikut adalah cara mengimplementasikan *prompt* tersebut pada *tools* AI generatif general:
 1. **Siapkan Gambar Referensi:** Karena *prompt* meminta untuk mempertahankan fitur wajah ("preserve the facial features from the reference image"), siapkan foto wajah yang ingin Anda gunakan.
 2. **Masukkan Gambar ke dalam Sistem AI:**
   * Jika menggunakan **Midjourney**: Unggah gambar referensi, salin URL-nya, lalu letakkan di awal *prompt*, atau gunakan parameter karakter referensi (--cref [URL] --cw 100).
   * Jika menggunakan **Stable Diffusion**: Gunakan ekstensi seperti *IP-Adapter*, *ControlNet (Reference Only)*, atau *FaceID* pada antarmuka seperti Automatic1111 atau ComfyUI untuk mengunci wajah.
 3. **Salin Teks Prompt Utama:** Masukkan teks deskripsi bahasa Inggris di atas ke dalam kolom *prompt*.
 4. **Tambahkan Negative Prompt (Opsional):** Untuk memastikan hasil yang jernih, gunakan *negative prompt* standar seperti: *ugly, deformed, disfigured, poor lighting, bad anatomy, bad hands, missing fingers, text, watermark*.
 5. **Atur Rasio Aspek:** Pilih rasio potret untuk komposisi ini. Tambahkan parameter --ar 4:5 atau --ar 9:16 di akhir teks jika Anda menggunakan Midjourney, atau atur resolusi memanjang ke atas pada Stable Diffusion (misal: 768x1024).
 6. **Eksekusi dan Evaluasi:** Tekan tombol *Generate* (Hasilkan). Jika *messy ponytail* (kuncir kuda berantakan) kurang terlihat, naikkan bobot kata tersebut di dalam *prompt* (misalnya dengan tanda kurung).
### Tips Tambahan
Membangun struktur yang sistematis seperti ini memungkinkan modifikasi yang mudah. Jika Anda ingin mengubah suasana, Anda cukup mengganti bagian "soft natural daylight" menjadi "neon cyberpunk lighting", atau mengubah latar dari "rustic wooden bus stop" menjadi lingkungan lain, sambil mempertahankan parameter kamera yang sama untuk kualitas fotorealistik yang konsisten.
