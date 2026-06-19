# Panduan & Naskah Penjelasan Lengkap Fitur Website Woku Manado

Dokumen ini berisi penjelasan menyeluruh mengenai seluruh fitur website **Woku Manado**, mencakup naskah penjelasan, daftar file kode program, lokasi file, serta penanda potongan kode program spesifik yang menjalankan setiap fitur.

---

## DAFTAR ISI
1. [Halaman Beranda (Home Page)](#1-halaman-beranda-home-page)
2. [Halaman Kategori Menu](#2-halaman-kategori-menu)
3. [Halaman Pesan Online & Keranjang Belanja](#3-halaman-pesan-online--keranjang-belanja)
4. [Halaman Saran & Kritik (Feedback)](#4-halaman-saran--kritik-feedback)
5. [Halaman Lokasi & Peta Interaktif](#5-halaman-lokasi--peta-interaktif)
6. [Halaman Tentang Kami](#6-halaman-tentang-kami)
7. [Fitur Global: Mode Gelap/Terang (Dark/Light Mode)](#7-fitur-global-mode-gelapterang-darklight-mode)

---

## 1. HALAMAN BERANDA (HOME PAGE)

### A. Fitur 1: Hero Carousel / Slider Otomatis & Manual
* **Deskripsi Fitur:** Banner utama berputar otomatis setiap 5 detik menampilkan hidangan-hidangan khas. Pengguna juga dapat memilih dot lingkaran navigasi di bagian bawah secara manual untuk berganti gambar.
* **Lokasi File Utama:**
  - File HTML: [index.html](file:///c:/Semester%204/WEB%20DASAR/Tugas_Besar%20-%20Kuliner_Khas_Manado/index.html) (Baris 45-97)
  - File Styling: [css/hero.css](file:///c:/Semester%204/WEB%20DASAR/Tugas_Besar%20-%20Kuliner_Khas_Manado/css/hero.css)
  - File JavaScript: [js/hero.js](file:///c:/Semester%204/WEB%20DASAR/Tugas_Besar%20-%20Kuliner_Khas_Manado/js/hero.js)
* **Potongan Kode Penentu (Pemicu Fitur):**
  Di file [js/hero.js](file:///c:/Semester%204/WEB%20DASAR/Tugas_Besar%20-%20Kuliner_Khas_Manado/js/hero.js) (Fungsi perulangan modulo untuk looping melingkar tanpa if-else panjang):
  ```javascript
  function nextSlide() {
      let next = (currentSlide + 1) % slides.length;
      showSlide(next);
  }
  function startSlide() {
      if(slideInterval) clearInterval(slideInterval);
      slideInterval = setInterval(nextSlide, intervalTime);
  }
  ```

### B. Fitur 2: Animasi Scroll Reveal (Efek Memudar Saat Digulir)
* **Deskripsi Fitur:** Saat pengguna menggulir halaman ke bawah, elemen-elemen website seperti judul bagian dan kartu menu akan memudar masuk secara halus dari bawah.
* **Lokasi File Utama:**
  - File HTML: [index.html](file:///c:/Semester%204/WEB%20DASAR/Tugas_Besar%20-%20Kuliner_Khas_Manado/index.html) (Menambahkan class `scroll-reveal`)
  - File JavaScript: [js/animasi.js](file:///c:/Semester%204/WEB%20DASAR/Tugas_Besar%20-%20Kuliner_Khas_Manado/js/animasi.js)
* **Potongan Kode Penentu (Pemicu Fitur):**
  Di file [js/animasi.js](file:///c:/Semester%204/WEB%20DASAR/Tugas_Besar%20-%20Kuliner_Khas_Manado/js/animasi.js) menggunakan API asinkron `IntersectionObserver` agar performa halaman di smartphone tetap mulus (tidak lag):
  ```javascript
  const revealCallback = (entries, observer) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';
              observer.unobserve(entry.target);
          }
      });
  };
  ```

### C. Fitur 3: Kartu Menu Unggulan (Featured Items)
* **Deskripsi Fitur:** Menampilkan 3 hidangan teratas yang memiliki rating tertinggi secara dinamis dari file database lokal.
* **Lokasi File Utama:**
  - File HTML: [index.html](file:///c:/Semester%204/WEB%20DASAR/Tugas_Besar%20-%20Kuliner_Khas_Manado/index.html) (Target ID `#featuredMenu`)
  - File JavaScript: [js/featured.js](file:///c:/Semester%204/WEB%20DASAR/Tugas_Besar%20-%20Kuliner_Khas_Manado/js/featured.js)
  - Data Sumber: [js/data_menu.js](file:///c:/Semester%204/WEB%20DASAR/Tugas_Besar%20-%20Kuliner_Khas_Manado/js/data_menu.js)
* **Potongan Kode Penentu (Pemicu Fitur):**
  Di file [js/featured.js](file:///c:/Semester%204/WEB%20DASAR/Tugas_Besar%20-%20Kuliner_Khas_Manado/js/featured.js) (Melakukan pengurutan rating secara menurun dan memotong array menjadi 3 item teratas):
  ```javascript
  const featured = data.sort((a,b) => b.rating - a.rating).slice(0, 3);
  ```

---

## 2. HALAMAN KATEGORI MENU

### A. Fitur 1: Saringan/Filter Kategori Hidangan Instan
* **Deskripsi Fitur:** Pengguna dapat menekan tombol kategori (Makanan Utama, Seafood, Sambal, Kue, dll.) untuk menyaring kartu menu secara instan tanpa reload halaman.
* **Lokasi File Utama:**
  - File HTML: [menu.html](file:///c:/Semester%204/WEB%20DASAR/Tugas_Besar%20-%20Kuliner_Khas_Manado/menu.html) (Baris 54-62)
  - File JavaScript: [js/menu.js](file:///c:/Semester%204/WEB%20DASAR/Tugas_Besar%20-%20Kuliner_Khas_Manado/js/menu.js) (Baris 55-71)
* **Potongan Kode Penentu (Pemicu Fitur):**
  Di file [js/menu.js](file:///c:/Semester%204/WEB%20DASAR/Tugas_Besar%20-%20Kuliner_Khas_Manado/js/menu.js) (Menggunakan JavaScript `Array.prototype.filter()`):
  ```javascript
  const filtered = allMenuData.filter(item => item.kategori === filter);
  renderMenu(filtered);
  ```

### B. Fitur 2: Modal Popup Detail Menu & Kunci Scrollbar Latar Belakang
* **Deskripsi Fitur:** Ketika kartu menu diklik, sebuah popup interaktif (modal) muncul di tengah layar menampilkan deskripsi, sejarah masakan, serta bahan-bahan lengkap. Ketika popup terbuka, scrollbar halaman utama di belakang otomatis dikunci agar tidak bergerak.
* **Lokasi File Utama:**
  - File HTML: [menu.html](file:///c:/Semester%204/WEB%20DASAR/Tugas_Besar%20-%20Kuliner_Khas_Manado/menu.html) (Struktur `#menuModal` baris 94-114)
  - File Styling: [css/cards.css](file:///c:/Semester%204/WEB%20DASAR/Tugas_Besar%20-%20Kuliner_Khas_Manado/css/cards.css)
  - File JavaScript: [js/menu.js](file:///c:/Semester%204/WEB%20DASAR/Tugas_Besar%20-%20Kuliner_Khas_Manado/js/menu.js) (Fungsi `openModal()` baris 73-92)
* **Potongan Kode Penentu (Pemicu Fitur):**
  Di file [js/menu.js](file:///c:/Semester%204/WEB%20DASAR/Tugas_Besar%20-%20Kuliner_Khas_Manado/js/menu.js):
  ```javascript
  const bahanList = document.getElementById('modalBahan');
  bahanList.innerHTML = '';
  item.bahan.forEach(b => {
      const li = document.createElement('li');
      li.textContent = b;
      bahanList.appendChild(li);
  });
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  ```

---

## 3. HALAMAN PESAN ONLINE & KERANJANG BELANJA

### A. Fitur 1: Keranjang Belanja Dinamis & Real-time (Cart System)
* **Deskripsi Fitur:** Pelanggan dapat mengatur jumlah pesanan menggunakan tombol tambah `+`/kurang `-` lalu memasukkannya ke dalam keranjang. Rincian subtotal belanja serta ongkir dihitung secara otomatis. Pelanggan juga dapat menghapus item dengan klik tombol silang `✕`.
* **Lokasi File Utama:**
  - File HTML: [pesan.html](file:///c:/Semester%204/WEB%20DASAR/Tugas_Besar%20-%20Kuliner_Khas_Manado/pesan.html) (Struktur keranjang dan formulir)
  - File JavaScript: [js/pesan.js](file:///c:/Semester%204/WEB%20DASAR/Tugas_Besar%20-%20Kuliner_Khas_Manado/js/pesan.js)
  - Data Sumber: [js/data_produk.js](file:///c:/Semester%204/WEB%20DASAR/Tugas_Besar%20-%20Kuliner_Khas_Manado/js/data_produk.js)
* **Potongan Kode Penentu (Pemicu Fitur):**
  Di file [js/pesan.js](file:///c:/Semester%204/WEB%20DASAR/Tugas_Besar%20-%20Kuliner_Khas_Manado/js/pesan.js) (Kalkulasi biaya otomatis):
  ```javascript
  let subtotal = 0;
  cart.forEach(item => {
      const itemTotal = item.harga * item.qty;
      subtotal += itemTotal;
      // ... render item DOM
  });
  const ongkir = 25000;
  const total = subtotal + ongkir;
  cartSubtotal.textContent = `Rp ${subtotal.toLocaleString('id-ID')}`;
  cartTotal.textContent = `Rp ${total.toLocaleString('id-ID')}`;
  ```

### B. Fitur 2: Sinkronisasi Angka Badge Keranjang di Navbar Global
* **Deskripsi Fitur:** Jumlah total kuantitas barang yang ada di dalam keranjang ditampilkan di atas ikon keranjang di Navbar. Angka badge ini ter-update otomatis secara real-time di seluruh halaman website.
* **Lokasi File Utama:**
  - File JavaScript: [js/navbar.js](file:///c:/Semester%204/WEB%20DASAR/Tugas_Besar%20-%20Kuliner_Khas_Manado/js/navbar.js) (Fungsi `updateGlobalCartBadge()` baris 37-49)
* **Potongan Kode Penentu (Pemicu Fitur):**
  Di file [js/navbar.js](file:///c:/Semester%204/WEB%20DASAR/Tugas_Besar%20-%20Kuliner_Khas_Manado/js/navbar.js) (Membaca local storage dan mereduksi total kuantitas):
  ```javascript
  const cart = JSON.parse(localStorage.getItem('woku_cart') || '[]');
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  badge.textContent = totalItems;
  badge.style.display = totalItems > 0 ? 'flex' : 'none';
  ```

### C. Fitur 3: Simulasi Transaksi Checkout & Integrasi WhatsApp
* **Deskripsi Fitur:** Saat menekan tombol checkout, data pesanan dan rincian formulir pengiriman (nama, telepon, alamat, ekspedisi) dikemas menjadi format teks terstruktur. Sistem kemudian membuka tab WhatsApp baru berisi format teks pemesanan langsung ke nomor penjual, serta memunculkan status sukses transaksi di halaman.
* **Lokasi File Utama:**
  - File JavaScript: [js/pesan.js](file:///c:/Semester%204/WEB%20DASAR/Tugas_Besar%20-%20Kuliner_Khas_Manado/js/pesan.js) (Event Submit baris 149-241)
* **Potongan Kode Penentu (Pemicu Fitur):**
  Di file [js/pesan.js](file:///c:/Semester%204/WEB%20DASAR/Tugas_Besar%20-%20Kuliner_Khas_Manado/js/pesan.js) (Simulasi loading checkout, pembukaan WhatsApp, dan reset keranjang belanja):
  ```javascript
  setTimeout(() => {
      // ... susun waMessage
      const waUrl = `https://api.whatsapp.com/send?phone=${waNumber}&text=${encodeURIComponent(waMessage.replace(/^[ \t]+/gm, ''))}`;
      cart = [];
      saveCart();
      renderCart();
      checkoutForm.style.display = 'none';
      checkoutSuccess.style.display = 'block';
      window.open(waUrl, '_blank');
  }, 1500);
  ```

---

## 4. HALAMAN SARAN & KRITIK (FEEDBACK)

### A. Fitur 1: Sistem Validasi Form & Efek Interaksi Rating Bintang
* **Deskripsi Fitur:** Formulir ulasan mewajibkan pengguna untuk memilih rating bintang (1-5) dan mengisi pesan saran. Jika tombol kirim ditekan tanpa bintang terpilih, alert/notifikasi peringatan akan dimunculkan.
* **Lokasi File Utama:**
  - File HTML: [saran.html](file:///c:/Semester%204/WEB%20DASAR/Tugas_Besar%20-%20Kuliner_Khas_Manado/saran.html) (Form id `#formSaran` baris 140-176)
  - File JavaScript: [js/saran.js](file:///c:/Semester%204/WEB%20DASAR/Tugas_Besar%20-%20Kuliner_Khas_Manado/js/saran.js) (Event submit baris 122-173)
* **Potongan Kode Penentu (Pemicu Fitur):**
  Di file [js/saran.js](file:///c:/Semester%204/WEB%20DASAR/Tugas_Besar%20-%20Kuliner_Khas_Manado/js/saran.js):
  ```javascript
  const ratingSelected = document.querySelector('input[name="rating"]:checked');
  if(!ratingSelected) {
      alert('Silakan pilih rating bintang terlebih dahulu.');
      return;
  }
  ```

### B. Fitur 2: Pengunggah Berkas dengan Pratinjau Foto Instan (Live Preview)
* **Deskripsi Fitur:** Pengguna dapat menyertakan foto masakan/pengalaman saat memberi saran. Begitu file foto dipilih dari komputer/HP, pratinjau gambar langsung muncul secara visual di dalam form.
* **Lokasi File Utama:**
  - File HTML: [saran.html](file:///c:/Semester%204/WEB%20DASAR/Tugas_Besar%20-%20Kuliner_Khas_Manado/saran.html) (Tag file input `#sarFoto` dan `#fotoPreview`)
  - File JavaScript: [js/saran.js](file:///c:/Semester%204/WEB%20DASAR/Tugas_Besar%20-%20Kuliner_Khas_Manado/js/saran.js) (Event handler input file baris 104-119)
* **Potongan Kode Penentu (Pemicu Fitur):**
  Di file [js/saran.js](file:///c:/Semester%204/WEB%20DASAR/Tugas_Besar%20-%20Kuliner_Khas_Manado/js/saran.js) (Menggunakan objek browser `FileReader`):
  ```javascript
  const file = e.target.files[0];
  if(file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = function(event) {
          previewImg.src = event.target.result;
          fotoPreview.style.display = 'block';
      };
      reader.readAsDataURL(file);
  }
  ```

---

## 5. HALAMAN LOKASI & PETA INTERAKTIF

### A. Fitur 1: Interaksi Google Maps Dinamis (Iframe SRC Modification)
* **Deskripsi Fitur:** Menampilkan daftar rekomendasi restoran Woku Manado. Saat pengguna mengklik salah satu kartu restoran di bagian bawah, peta Google Maps di atas otomatis memuat koordinat restoran tersebut.
* **Lokasi File Utama:**
  - File HTML: [lokasi.html](file:///c:/Semester%204/WEB%20DASAR/Tugas_Besar%20-%20Kuliner_Khas_Manado/lokasi.html) (Kontainer peta baris 53-57, rekomendasi grid `#restoranGrid`)
  - File JavaScript: [js/lokasi.js](file:///c:/Semester%204/WEB%20DASAR/Tugas_Besar%20-%20Kuliner_Khas_Manado/js/lokasi.js)
  - Data Sumber: [js/data_restoran.js](file:///c:/Semester%204/WEB%20DASAR/Tugas_Besar%20-%20Kuliner_Khas_Manado/js/data_restoran.js)
* **Potongan Kode Penentu (Pemicu Fitur):**
  Di file [js/lokasi.js](file:///c:/Semester%204/WEB%20DASAR/Tugas_Besar%20-%20Kuliner_Khas_Manado/js/lokasi.js):
  ```javascript
  card.onclick = () => {
      const iframe = document.querySelector('.map-container iframe');
      if(iframe && item.mapUrl) {
          iframe.src = item.mapUrl;
          document.querySelector('.map-container').scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
  };
  ```

### B. Fitur 2: Pergeseran Layar Halus Otomatis (Auto Smooth Scroll)
* **Deskripsi Fitur:** Untuk membantu memandu pandangan pengguna setelah mengklik restoran, layar browser otomatis bergeser secara halus memosisikan kontainer peta tepat di tengah layar.
* **Lokasi File Utama:**
  - File JavaScript: [js/lokasi.js](file:///c:/Semester%204/WEB%20DASAR/Tugas_Besar%20-%20Kuliner_Khas_Manado/js/lokasi.js) (Metode `.scrollIntoView` baris 28)
* **Potongan Kode Penentu (Pemicu Fitur):**
  ```javascript
  document.querySelector('.map-container').scrollIntoView({ behavior: 'smooth', block: 'center' });
  ```

---

## 6. HALAMAN TENTANG KAMI

### A. Fitur 1: Garis Waktu Sejarah Interaktif (Timeline Generator)
* **Deskripsi Fitur:** Menghasilkan alur linier sejarah fusi budaya kuliner khas Manado. Konten sejarah dimuat secara dinamis berselang-seling (posisi kiri dan kanan) dari database JSON lokal.
* **Lokasi File Utama:**
  - File HTML: [tentang.html](file:///c:/Semester%204/WEB%20DASAR/Tugas_Besar%20-%20Kuliner_Khas_Manado/tentang.html) (Target kontainer `#timelineContainer`)
  - File JavaScript: [js/tentang.js](file:///c:/Semester%204/WEB%20DASAR/Tugas_Besar%20-%20Kuliner_Khas_Manado/js/tentang.js) (Baris 8-22)
  - Data Sumber: [js/data_tentang.js](file:///c:/Semester%204/WEB%20DASAR/Tugas_Besar%20-%20Kuliner_Khas_Manado/js/data_tentang.js)
* **Potongan Kode Penentu (Pemicu Fitur):**
  Di file [js/tentang.js](file:///c:/Semester%204/WEB%20DASAR/Tugas_Besar%20-%20Kuliner_Khas_Manado/js/tentang.js) (Menentukan orientasi timeline kiri/kanan berdasarkan indeks ganjil/genap secara dinamis):
  ```javascript
  data.sejarah.forEach((item, index) => {
      const cls = index % 2 === 0 ? 'tl-left' : 'tl-right';
      const div = document.createElement('div');
      div.className = `tl-container ${cls}`;
      // ... render innerHTML
  });
  ```

### B. Fitur 2: Accordion Tanya-Jawab Dinamis (Collapsible FAQ)
* **Deskripsi Fitur:** Daftar pertanyaan populer seputar kuliner Manado. Pengguna dapat menekan kotak pertanyaan untuk melipat/membuka jawaban secara interaktif. Tanda ikon juga ikut berubah dari `+` (tertutup) ke `×` (terbuka).
* **Lokasi File Utama:**
  - File HTML: [tentang.html](file:///c:/Semester%204/WEB%20DASAR/Tugas_Besar%20-%20Kuliner_Khas_Manado/tentang.html) (Target kontainer `#faqContainer`)
  - File JavaScript: [js/tentang.js](file:///c:/Semester%204/WEB%20DASAR/Tugas_Besar%20-%20Kuliner_Khas_Manado/js/tentang.js) (Baris 23-43)
* **Potongan Kode Penentu (Pemicu Fitur):**
  Di file [js/tentang.js](file:///c:/Semester%204/WEB%20DASAR/Tugas_Besar%20-%20Kuliner_Khas_Manado/js/tentang.js) (Mengubah kelas visual dan bentuk ikon):
  ```javascript
  div.querySelector('.faq-question').addEventListener('click', () => {
      div.classList.toggle('active');
      const icon = div.querySelector('.faq-icon');
      icon.textContent = div.classList.contains('active') ? '×' : '+';
  });
  ```

---

## 7. FITUR GLOBAL: MODE GELAP/TERANG (DARK/LIGHT MODE)

### A. Deskripsi Fitur:
Tombol switch berbentuk lingkaran `◐` atau matahari `☀` di bagian kanan atas navbar. Saat diklik, warna keseluruhan tema website akan berubah menjadi gelap dan sebaliknya. Pilihan tema disimpan di penyimpanan lokal browser, sehingga ketika halaman dibuka kembali, tema tidak kembali ke setelan awal.

### B. Lokasi File Utama:
* File Styling Global: [css/global.css](file:///c:/Semester%204/WEB%20DASAR/Tugas_Besar%20-%20Kuliner_Khas_Manado/css/global.css) (Baris 76-88 untuk penentu variabel warna)
* File JavaScript Navbar: [js/navbar.js](file:///c:/Semester%204/WEB%20DASAR/Tugas_Besar%20-%20Kuliner_Khas_Manado/js/navbar.js) (Baris 5-23)

### C. Potongan Kode Penentu (Pemicu Fitur):
* Di file [css/global.css](file:///c:/Semester%204/WEB%20DASAR/Tugas_Besar%20-%20Kuliner_Khas_Manado/css/global.css) (Variabel kustom yang otomatis terikat di tag `body.dark-theme`):
  ```css
  :root {
      --bg-main: #faf9f6;
      --bg-card: #ffffff;
      --text-main: #2b2b2b;
  }
  body.dark-theme {
      --bg-main: #121212;
      --bg-card: #1e1e1e;
      --text-main: #f0f0f0;
  }
  ```
* Di file [js/navbar.js](file:///c:/Semester%204/WEB%20DASAR/Tugas_Besar%20-%20Kuliner_Khas_Manado/js/navbar.js) (Menyimpan status tema gelap secara lokal dan mengalihkan kelas):
  ```javascript
  themeToggle.addEventListener('click', () => {
      body.classList.toggle('dark-theme');
      if (body.classList.contains('dark-theme')) {
          localStorage.setItem('theme', 'dark');
          themeToggle.innerHTML = '☀';
      } else {
          localStorage.setItem('theme', 'light');
          themeToggle.innerHTML = '◐';
      }
  });
  ```
