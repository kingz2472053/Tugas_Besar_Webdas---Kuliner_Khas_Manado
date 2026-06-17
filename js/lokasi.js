/**
 * File ini menangani logika halaman Lokasi, khususnya untuk menampilkan daftar 
 * restoran rekomendasi dan membuatnya interaktif dengan Peta Google.
 */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Ambil elemen tempat kita akan meletakkan kartu-kartu restoran
    const grid = document.getElementById('restoranGrid');
    
    // Jika tidak ada elemen grid di halaman ini, hentikan script agar tidak error
    if(!grid) return;
    
    // 2. Ambil data restoran dari file data_restoran.js
    Promise.resolve(window.DATA_RESTORAN).then(data => ({ json: () => data }))
        .then(res => res.json())
        .then(data => {
            // Bersihkan tulisan "Memuat data..." 
            grid.innerHTML = '';
            
            // 3. Looping (Ulangi) untuk setiap restoran yang ada di data
            data.forEach((item, idx) => {
                // Buat elemen div baru untuk membungkus kartu restoran
                const card = document.createElement('div');
                card.className = 'restoran-card';
                card.style.animationDelay = `${idx * 0.1}s`; // Efek animasi beruntun
                card.style.cursor = 'pointer'; // Ubah kursor jadi gambar tangan (bisa diklik)
                
                // 4. Logika ketika Kartu Restoran Diklik
                card.onclick = () => {
                    // Cari elemen iframe (Peta Google Maps)
                    const iframe = document.querySelector('.map-container iframe');
                    
                    // Jika iframe ada dan restoran punya link peta (mapUrl)
                    if(iframe && item.mapUrl) {
                        // Ubah sumber (src) peta dengan link spesifik restoran tersebut
                        iframe.src = item.mapUrl;
                        
                        // Geser layar ke atas secara halus agar pengguna langsung melihat peta
                        document.querySelector('.map-container').scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                };
                
                // 5. Masukkan struktur HTML ke dalam kartu restoran
                card.innerHTML = `
                    <div class="restoran-img">
                        <img src="${item.gambar}" alt="${item.nama}">
                    </div>
                    <div class="restoran-info">
                        <h3>${item.nama}</h3>
                        <p>${item.deskripsi}</p>
                        <div class="restoran-meta">
                            📍 ${item.alamat}
                            <strong>🕒 ${item.jamBuka}</strong>
                        </div>
                    </div>
                `;
                
                // 6. Masukkan kartu yang sudah jadi ke dalam grid halaman
                grid.appendChild(card);
            });
        })
        .catch(err => {
            // Tampilkan pesan error jika data gagal dimuat
            grid.innerHTML = '<p>Gagal memuat rekomendasi restoran.</p>';
        });
});
