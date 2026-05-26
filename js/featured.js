document.addEventListener('DOMContentLoaded', () => {
    Promise.resolve(window.DATA_MENU).then(data => ({ json: () => data }))
        .then(res => res.json())
        .then(data => {
            const container = document.getElementById('featuredMenu');
            const featured = data.sort((a,b) => b.rating - a.rating).slice(0, 3);
            let html = '';
            featured.forEach(item => {
                html += `
                <div class="menu-card" onclick="location.href='menu.html'">
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
                </div>`;
            });
            if (container) {
                container.innerHTML = html;
            }
        })
        .catch(err => console.error(err));
});
