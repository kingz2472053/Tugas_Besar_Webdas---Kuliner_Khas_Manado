// js/lokasi.js
document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('restoranGrid');
    if(!grid) return;
    
    fetch('data/restoran.json')
        .then(res => res.json())
        .then(data => {
            grid.innerHTML = '';
            data.forEach((item, idx) => {
                const card = document.createElement('div');
                card.className = 'restoran-card';
                card.style.animation = `slideUp 0.5s ease ${idx * 0.1}s forwards`;
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                
                card.innerHTML = `
                    <div class="restoran-img">
                        <img src="${item.gambar}" alt="${item.nama}" loading="lazy">
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
                grid.appendChild(card);
            });
        })
        .catch(err => {
            grid.innerHTML = '<p>Gagal memuat rekomendasi restoran.</p>';
        });
});
