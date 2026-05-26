document.addEventListener('DOMContentLoaded', () => {
    const menuGrid = document.getElementById('menuGrid');
    const filterBtns = document.querySelectorAll('#menuFilters .filter-btn');
    const modal = document.getElementById('menuModal');
    const closeModal = document.getElementById('closeModal');
    let allMenuData = [];
    if(!menuGrid) return;
    Promise.resolve(window.DATA_MENU).then(data => ({ json: () => data }))
        .then(res => res.json())
        .then(data => {
            allMenuData = data;
            renderMenu(data);
        })
        .catch(err => {
            menuGrid.innerHTML = '<p style="color:red;text-align:center;">Gagal memuat data menu.</p>';
        });
    function renderMenu(items) {
        menuGrid.innerHTML = '';
        if(items.length === 0) {
            menuGrid.innerHTML = '<p style="text-align:center;width:100%;">Tidak ada menu di kategori ini.</p>';
            return;
        }
        items.forEach((item, index) => {
            const card = document.createElement('div');
            card.className = 'menu-card';
            card.style.animation = `slideUp 0.5s ease ${index * 0.1}s forwards`;
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
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
            card.addEventListener('click', () => openModal(item));
            menuGrid.appendChild(card);
        });
    }
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');
            if(filter === 'semua') {
                renderMenu(allMenuData);
            } else {
                const filtered = allMenuData.filter(item => item.kategori === filter);
                renderMenu(filtered);
            }
        });
    });
    function openModal(item) {
        document.getElementById('modalImg').src = item.gambar;
        document.getElementById('modalKat').textContent = item.kategori.replace('-', ' ').toUpperCase();
        document.getElementById('modalRating').textContent = item.rating;
        document.getElementById('modalNama').textContent = item.nama;
        document.getElementById('modalDesc').textContent = item.deskripsi;
        document.getElementById('modalSejarah').textContent = item.sejarah;
        const bahanList = document.getElementById('modalBahan');
        bahanList.innerHTML = '';
        item.bahan.forEach(b => {
            const li = document.createElement('li');
            li.textContent = b;
            bahanList.appendChild(li);
        });
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; 
    }
    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    });
    modal.addEventListener('click', (e) => {
        if(e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});
