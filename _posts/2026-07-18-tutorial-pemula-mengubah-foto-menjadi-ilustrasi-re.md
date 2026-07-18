---
layout: post
title: "Tutorial Pemula: Mengubah Foto Menjadi Ilustrasi Realistik Tanpa Merusak Wajah (Image-to-Image)"
date: 2026-07-18
categories: [portrait]
image: https://file.garden/aGUfgZGhfBC3mQSW/AI/1784315722152.png
description: "Mengubah foto referensi menjadi gambar high-fidelity realistis sesuai prompt, dengan mempertahankan identitas wajah asli."
model: "Stable Diffusion"
prompt: "High-fidelity realistic portrait, young woman with fair smooth skin, long black hair with bangs and pink bow clips. Wearing silver over-ear headphones, black-rimmed glasses, white off-shoulder sweater. Resting chin on hand, soft gaze, subtle blush. White background with doodle sparkles, heart speech bubble, exclamation marks. Soft studio lighting, eye-level angle, close-up shot, sharp focus, photorealistic style, cozy aesthetic."
negative_prompt: "ugly, deformed, distorted, disfigured, bad anatomy, wrong limbs, extra limbs, missing limbs, blurry, low resolution, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, error, mutated hands, poorly drawn face, bad proportions, gross proportions, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blur, artist name, multiple views, long neck, malformed limbs, missing arms, missing legs, extra arms, extra legs, fused fingers, too many fingers, long neck"
parameters:
  Resolution: "Atur ke 512x768 atau 768x1024 (portrait) agar sesuai dengan \"close-up shot\"."
  CFG Scale:: "7-9"
  Sampler: "Gunakan DPM++ 2M Karras atau Euler a untuk hasil halus."
  Steps: "20-30"
---

Membuat gambar dengan teknik Image-to-Image (Img2Img) adalah cara terbaik untuk menjaga konsistensi wajah karakter atau pose tertentu sambil mengubah gaya, pencahayaan, atau latar belakangnya. Karena Anda ingin memastikan wajah tidak berubah secara drastis namun tetap menerapkan prompt yang sangat detail, kita akan menggunakan pendekatan "Low Denoising Strength" (Kekuatan Denoise Rendah) atau kontrol ketat.

Berikut adalah tutorial langkah demi langkah yang dirancang khusus untuk pemula, menggunakan antarmuka standar seperti Stable Diffusion WebUI (Automatic1111) atau platform serupa (seperti Leonardo.ai, Midjourney dengan fitur referensi, dll). Prinsipnya hampir sama di semua platform.



🎯 Tujuan
Mengubah foto referensi menjadi gambar high-fidelity realistis sesuai prompt, dengan mempertahankan identitas wajah asli.

📋 Persiapan
1.  Foto Referensi: Siapkan satu foto wajah wanita muda yang jelas (close-up atau setengah badan), pencahayaan cukup, dan ekspresi netral atau mirip dengan deskripsi "soft gaze".
2.  Platform AI: Buka tool AI pilihan Anda (contoh: Stable Diffusion WebUI, ComfyUI, atau platform online seperti SeaArt/Leonardo).
3.  Model Checkpoint: Gunakan model realistis seperti Realistic Vision, Juggernaut XL, atau ChilloutMix untuk hasil fotorealistik.

🚀 Langkah-Langkah Praktis

Langkah 1: Upload Gambar Referensi
Cari tab atau menu bernama "Image-to-Image" (atau "Img2Img").
*   Klik area upload dan pilih foto wajah wanita yang ingin Anda pertahankan.
*   Pastikan gambar terlihat jelas di pratinjau.

Langkah 2: Masukkan Prompt Utama
Salin dan tempel prompt berikut ke kotak Positive Prompt:

> High-fidelity realistic portrait, young woman with fair smooth skin, long black hair with bangs and pink bow clips. Wearing silver over-ear headphones, black-rimmed glasses, white off-shoulder sweater. Resting chin on hand, soft gaze, subtle blush. White background with doodle sparkles, heart speech bubble, exclamation marks. Soft studio lighting, eye-level angle, close-up shot, sharp focus, photorealistic style, cozy aesthetic.

💡 Tips Pemula: Jika AI kesulitan menambahkan elemen seperti "doodle sparkles" atau "heart speech bubble", Anda mungkin perlu menambahkan kata kunci (simple line art doodles:1.2) di akhir prompt untuk memperkuat gaya ilustrasinya.

Langkah 3: Atur Negative Prompt (Penting!)
Untuk menghindari distorsi wajah dan elemen yang tidak diinginkan, masukkan ini di Negative Prompt:

> ugly, deformed, distorted, disfigured, bad anatomy, wrong limbs, extra limbs, missing limbs, blurry, low resolution, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, error, mutated hands, poorly drawn face, bad proportions, gross proportions, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blur, artist name, multiple views, long neck, malformed limbs, missing arms, missing legs, extra arms, extra legs, fused fingers, too many fingers, long neck

Langkah 4: Kunci Rahasia – Pengaturan "Denoising Strength"
Ini adalah bagian paling penting agar wajah tidak berubah.

*   Cari slider bernama Denoising Strength (atau "Transformation Strength").
*   Atur nilai antara 0.3 hingga 0.5.
    *   0.1 - 0.3: Perubahan sangat minimal. Wajah hampir identik, hanya sedikit peningkatan kualitas/gaya.
    *   0.4 - 0.5: Keseimbangan ideal. Wajah masih sangat mirip, tetapi gaya rambut, aksesori (headphone, kacamata), dan latar belakang bisa berubah sesuai prompt.
    *   > 0.6: Wajah mulai berubah signifikan dan mungkin kehilangan identitas aslinya.

✅ Rekomendasi Awal: Mulai dari 0.45. Jika wajah terlalu berubah, turunkan ke 0.35. Jika perubahan terlalu sedikit, naikkan ke 0.55.

Langkah 5: Pengaturan Tambahan (Opsional tapi Disarankan)
*   Resolution: Atur ke 512x768 atau 768x1024 (portrait) agar sesuai dengan "close-up shot".
*   CFG Scale: Atur ke 7-9. Nilai ini mengontrol seberapa ketat AI mengikuti prompt. Terlalu tinggi (>12) bisa membuat gambar kaku.
*   Sampler: Gunakan DPM++ 2M Karras atau Euler a untuk hasil halus.
*   Steps: 20-30 steps sudah cukup untuk kualitas baik.

Langkah 6: Generate & Evaluasi
Klik tombol Generate.

🔍 Periksa Hasilnya:
1.  Apakah wajahnya masih mirip dengan foto asli?
2.  Apakah elemen baru (pink bow clips, silver headphones, black-rimmed glasses) sudah muncul?
3.  Apakah latar belakang putih dengan doodle sparkles sudah terbentuk?

Jika hasilnya belum sempurna:
*   Wajah berubah? → Turunkan Denoising Strength.
*   Aksesori tidak muncul? → Naikkan sedikit Denoising Strength atau tambahkan bobot pada prompt, contoh: (silver over-ear headphones:1.3).
*   Gambar buram? → Aktifkan fitur "Hires. fix" (High-Resolution Fix) jika tersedia, atau upscale setelahnya.

🛠️ Tips Pro untuk Kontrol Lebih Baik (Advanced)

Jika Anda menggunakan Stable Diffusion, gunakan ekstensi ControlNet untuk hasil terbaik:

1.  Aktifkan ControlNet.
2.  Upload ulang foto referensi ke ControlNet.
3.  Pilih Preprocessor: Canny (untuk garis tepi) atau Depth (untuk kedalaman).
4.  Pilih Model: control_v11p_sd15_canny atau depth.
5.  Atur Control Weight ke 0.6 - 0.8.
6.  Dengan ControlNet, Anda bisa menaikkan Denoising Strength hingga 0.6-0.7 tanpa takut wajah berubah, karena struktur wajah dikunci oleh ControlNet.

❓ Pertanyaan Umum (FAQ)

Q: Mengapa headphone atau kacamata tidak muncul?  
A: AI kadang kesulitan menambahkan objek yang menutupi wajah jika denoising strength terlalu rendah. Coba naikkan sedikit ke 0.55, atau pastikan prompt menyebutkan posisi spesifik seperti (wearing silver over-ear headphones covering ears:1.2).

Q: Bagaimana jika latar belakang doodle tidak muncul?  
A: Tambahkan kata kunci (simple cute doodles:1.3), (hand-drawn sparkles:1.2) di akhir prompt positif. Kadang, AI butuh penekanan lebih untuk elemen dekoratif.

Q: Bisa pakai Midjourney?  
A: Ya! Gunakan perintah /imagine, lalu unggah gambar sebagai referensi pertama, salin link gambarnya, lalu ketik:  
[LINK_GAMBAR] High-fidelity realistic portrait... --iw 2 --v 6.0  
Parameter --iw 2 memberikan bobot tinggi pada gambar referensi agar wajah tetap mirip.

Selamat mencoba! Dengan mengatur Denoising Strength dengan tepat, Anda bisa mendapatkan gambar yang indah sesuai prompt sambil tetap mempertahankan keunikan wajah subjek asli. Jika ada kendala, jangan ragu untuk bertanya lagi! 🎨✨
