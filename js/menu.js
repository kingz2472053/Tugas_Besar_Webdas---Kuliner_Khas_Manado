/**
 * File ini menangani logika halaman Kategori Menu.
 * Fitur utamanya adalah: Menampilkan daftar menu, Menyaring (filter) kategori, 
 * dan Menampilkan Detail Menu (Modal Popup).
 */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Persiapan Variabel dan Elemen HTML
    const menuGrid = document.getElementById('menuGrid'); // Tempat daftar menu
    const filterBtns = document.querySelectorAll('#menuFilters .filter-btn'); // Tombol-tombol kategori
    const modal = document.getElementById('menuModal'); // Kotak popup detail menu
    const closeModal = document.getElementById('closeModal'); // Tombol X pada modal
    let allMenuData = []; // Variabel untuk menyimpan semua data mentah
    
    // Jika kita tidak berada di halaman menu, hentikan eksekusi script
    if(!menuGrid) return;
    
    // 2. Ambil data menu dari file data_menu.js
    Promise.resolve(window.DATA_MENU).then(data => ({ json: () => data }))
        .then(res => res.json())
        .then(data => {
            allMenuData = data; // Simpan data ke memori
            renderMenu(data); // Tampilkan seluruh data ke layar
        })
        .catch(err => {
            menuGrid.innerHTML = '<p style="color:red;text-align:center;">Gagal memuat data menu.</p>';
        });
        
    /**
     * FUNGSI 1: MENCETAK KARTU MENU KE LAYAR (RENDER)
     * @param {Array} items - Daftar menu yang ingin ditampilkan
     */
    function renderMenu(items) {
        // Bersihkan grid terlebih dahulu
        menuGrid.innerHTML = '';
        
        // Cek jika datanya kosong
        if(items.length === 0) {
            menuGrid.innerHTML = '<p style="text-align:center;width:100%;">Tidak ada menu di kategori ini.</p>';
            return;
        }
        
        // Looping untuk membuat HTML setiap kartu menu
        items.forEach((item, index) => {
            const card = document.createElement('div');
            card.className = 'menu-card';
            card.style.animationDelay = `${index * 0.1}s`; // Efek muncul perlahan
            
            card.innerHTML = `
                <div class="menu-card-img">
                    <img src="${item.gambar}" alt="${item.nama}">
                    <div class="badge-kategori">${item.kategori.replace('-', ' ').toUpperCase()}</div>
                </div>
                <div class="menu-card-content">
                    <h3>${item.nama}</h3>
                    <p>${item.deskripsi}</p>
                    <div class="menu-rating">
                        ★★★★☆ <span>${item.rating}</span>
                    </div>
                </div>
            `;
            
            // Tambahkan aksi ketika kartu diklik -> Buka Popup (Modal)
            card.addEventListener('click', () => openModal(item));
            
            menuGrid.appendChild(card);
        });
    }
    
    /**
     * FUNGSI 2: LOGIKA TOMBOL FILTER KATEGORI (Semua, Makanan, Minuman, dll)
     */
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Hapus status 'active' dari semua tombol, lalu aktifkan tombol yang baru diklik
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Ambil jenis kategori dari tombol yang diklik
            const filter = btn.getAttribute('data-filter');
            
            if(filter === 'semua') {
                renderMenu(allMenuData); // Tampilkan semua
            } else {
                // Saring array hanya untuk menu yang kategorinya cocok
                const filtered = allMenuData.filter(item => item.kategori === filter);
                renderMenu(filtered); // Tampilkan hasil saringan
            }
        });
    });
    
    /**
     * FUNGSI 3: MEMBUKA POPUP DETAIL MENU (MODAL)
     * @param {Object} item - Data tunggal menu yang dipilih
     */
    function openModal(item) {
        // Isi elemen HTML modal dengan data dari menu yang diklik
        document.getElementById('modalImg').src = item.gambar;
        document.getElementById('modalKat').textContent = item.kategori.replace('-', ' ').toUpperCase();
        document.getElementById('modalRating').textContent = item.rating;
        document.getElementById('modalNama').textContent = item.nama;
        document.getElementById('modalDesc').textContent = item.deskripsi;
        document.getElementById('modalSejarah').textContent = item.sejarah;
        
        // Khusus untuk daftar Bahan Utama (Array), buatkan List Item (<li>)
        const bahanList = document.getElementById('modalBahan');
        bahanList.innerHTML = '';
        item.bahan.forEach(b => {
            const li = document.createElement('li');
            li.textContent = b;
            bahanList.appendChild(li);
        });
        
        // Munculkan kotaknya dan kunci layar agar tidak bisa di-scroll ke bawah
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; 
    }
    
    /**
     * FUNGSI 4: MENUTUP MODAL
     */
    // Jika tombol 'X' ditekan
    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Buka kembali kunci scroll
    });
    
    // Jika user mengklik area gelap di luar kotak modal
    modal.addEventListener('click', (e) => {
        if(e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});
