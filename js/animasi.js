/**
 * File ini menangani animasi saat elemen mulai terlihat di layar ketika di-scroll (Scroll Reveal).
 * Sangat berguna untuk membuat website terlihat lebih modern dan interaktif.
 */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Memilih semua elemen yang memiliki class 'scroll-reveal'
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    // 2. Mengatur gaya awal elemen sebelum animasi dimulai
    // (membuatnya transparan dan posisinya sedikit ke bawah)
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease-out'; // Durasi dan gaya efek pergerakan
    });
    
    // 3. Membuat fungsi callback yang akan dijalankan saat elemen terlihat
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            // Jika elemen sudah masuk ke dalam layar pandang (viewport)
            if (entry.isIntersecting) {
                // Tampilkan elemen (opacity 1) dan kembalikan ke posisi aslinya
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                // Berhenti mengamati elemen ini karena sudah selesai dianimasikan
                observer.unobserve(entry.target);
            }
        });
    };
    
    // 4. Mengatur opsi IntersectionObserver
    const revealOptions = {
        threshold: 0.15, // Animasi dimulai saat 15% bagian elemen sudah terlihat di layar
        rootMargin: "0px 0px -50px 0px" // Memicu animasi sedikit lebih awal sebelum elemen benar-benar terlihat
    };
    
    // 5. Mendaftarkan observer ke elemen-elemen yang ingin dianimasikan
    const observer = new IntersectionObserver(revealCallback, revealOptions);
    revealElements.forEach(el => {
        observer.observe(el);
    });
});
