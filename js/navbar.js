/**
 * File ini menangani logika interaksi di bagian Navbar (Menu Navigasi atas).
 * Fitur utamanya: Tema Gelap/Terang (Dark Mode), Hamburger Menu untuk HP, dan Angka Keranjang Belanja.
 */
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // 1. FITUR DARK MODE (Tema Gelap)
    // Cek apakah pengguna sebelumnya sudah memilih tema gelap di LocalStorage (penyimpanan browser)
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-theme');
        if(themeToggle) themeToggle.innerHTML = '☀'; // Ubah ikon tombol menjadi matahari
    }
    
    // Jika tombol ganti tema diklik
    if(themeToggle) {
        themeToggle.addEventListener('click', () => {
            // Tambahkan atau hapus class 'dark-theme' pada elemen body
            body.classList.toggle('dark-theme');
            
            // Simpan preferensi pengguna ke LocalStorage agar saat direfresh tidak hilang
            if (body.classList.contains('dark-theme')) {
                localStorage.setItem('theme', 'dark');
                themeToggle.innerHTML = '☀'; // Ikon untuk kembali ke mode terang
            } else {
                localStorage.setItem('theme', 'light');
                themeToggle.innerHTML = '◐'; // Ikon untuk mode gelap
            }
        });
    }
    
    // 2. FITUR HAMBURGER MENU (Untuk Layar Handphone)
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    // Jika tombol hamburger diklik, tampilkan atau sembunyikan menu navigasi
    if(hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
    
    // 3. FITUR ANGKA KERANJANG BELANJA
    updateGlobalCartBadge();
});

/**
 * Fungsi untuk menghitung total barang di keranjang dan menampilkan angkanya di ikon keranjang Navbar
 */
function updateGlobalCartBadge() {
    const badge = document.getElementById('cartBadge');
    if(badge) {
        // Ambil data keranjang dari penyimpanan browser, jika kosong berikan array kosong []
        const cart = JSON.parse(localStorage.getItem('woku_cart') || '[]');
        
        // Hitung total jumlah barang (qty) dari semua item di keranjang
        const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
        
        // Tampilkan angka total
        badge.textContent = totalItems;
        
        // Sembunyikan bulatan merah (badge) jika keranjang kosong
        badge.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}
