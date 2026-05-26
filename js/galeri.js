let allPhotos = [];
document.addEventListener('DOMContentLoaded', () => {
    const masonryGrid = document.getElementById('masonryGrid');
    if(!masonryGrid) return;
    Promise.resolve(window.DATA_GALERI).then(data => ({ json: () => data }))
        .then(res => res.json())
        .then(data => {
            allPhotos = data;
            renderGaleri(data);
        })
        .catch(err => console.error(err));
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const closeBtn = document.getElementById('lightboxClose');
    closeBtn.addEventListener('click', () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    });
    lightbox.addEventListener('click', (e) => {
        if(e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    window.openLightbox = function(src, caption) {
        lightboxImg.src = src;
        lightboxCaption.textContent = caption;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    };
});
function renderGaleri(items) {
    const masonryGrid = document.getElementById('masonryGrid');
    masonryGrid.innerHTML = '';
    items.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'masonry-item';
        div.style.animation = `slideUp 0.5s ease ${index * 0.1}s forwards`;
        div.style.opacity = '0';
        div.style.transform = 'translateY(20px)';
        div.innerHTML = `
            <img src="${item.gambar}" alt="${item.caption}">
            <div class="masonry-caption">${item.caption}</div>
        `;
        div.addEventListener('click', () => window.openLightbox(item.gambar, item.caption));
        masonryGrid.appendChild(div);
    });
}
window.filterGaleri = function(filter) {
    const btns = document.querySelectorAll('#galeriFilters button');
    btns.forEach(b => b.classList.remove('active'));
    const e = window.event;
    if (e && e.target && e.target.tagName === 'BUTTON') {
        e.target.classList.add('active');
    } else {
        btns.forEach(b => {
            if (b.getAttribute('onclick').includes(filter)) {
                b.classList.add('active');
            }
        });
    }
    if(filter === 'semua') {
        renderGaleri(allPhotos);
    } else {
        const filtered = allPhotos.filter(i => i.kategori === filter);
        renderGaleri(filtered);
    }
};
