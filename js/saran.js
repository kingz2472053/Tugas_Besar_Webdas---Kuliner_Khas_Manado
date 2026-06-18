document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formSaran');
    const sukses = document.getElementById('saranSukses');
    const fotoInput = document.getElementById('sarFoto');
    const fotoPreview = document.getElementById('fotoPreview');
    const previewImg = document.getElementById('previewImg');
    const reviewsList = document.getElementById('reviewsList');
    
    // Inisialisasi ulasan bawaan jika belum ada di LocalStorage
    const MOCK_REVIEWS = [
        {
            nama: "Viona Tombeng",
            email: "viona@gmail.com",
            rating: 5,
            pesan: "Tinutuan di Woku Manado sangat lezat dan otentik! Rasa rempahnya pas sekali, persis seperti buatan nenek saya di Tomohon. Pelayanannya cepat dan ramah.",
            tanggal: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
            foto: ""
        },
        {
            nama: "Andre Mandagi",
            email: "andre.m@yahoo.com",
            rating: 4,
            pesan: "Ikan woku belanganya juara, bumbunya meresap sampai ke serat daging. Klappertaartnya juga lembut dan manisnya pas. Pasti bakal pesan lagi dari sini!",
            tanggal: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            foto: ""
        }
    ];

    function getReviews() {
        const stored = localStorage.getItem('woku_reviews');
        if (!stored) {
            // Pertama kali dibuka, set mock reviews ke localStorage
            localStorage.setItem('woku_reviews', JSON.stringify(MOCK_REVIEWS));
            return MOCK_REVIEWS;
        }
        return JSON.parse(stored);
    }

    function saveReviews(reviews) {
        localStorage.setItem('woku_reviews', JSON.stringify(reviews));
    }

    function renderReviews() {
        if (!reviewsList) return;
        const reviews = getReviews();
        
        // Urutkan dari yang terbaru ke terlama berdasarkan tanggal
        reviews.sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));
        
        reviewsList.innerHTML = '';
        
        if(reviews.length === 0) {
            reviewsList.innerHTML = '<p style="text-align: center; color: var(--text-muted); font-style: italic;">Belum ada saran & kritik dari pelanggan.</p>';
            return;
        }

        reviews.forEach(review => {
            const card = document.createElement('div');
            card.className = 'review-card';
            
            const name = review.nama.trim() || 'Anonim';
            const avatarChar = name.charAt(0).toUpperCase();
            
            // Format tanggal lokal (id-ID)
            const dateObj = new Date(review.tanggal);
            const formattedDate = dateObj.toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            // Susun bintang rating
            const starsHtml = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);

            // Foto ulasan jika ada
            let imgHtml = '';
            if (review.foto) {
                imgHtml = `<img src="${review.foto}" class="review-img" alt="Foto Ulasan">`;
            }

            card.innerHTML = `
                <div class="review-header">
                    <div class="review-user">
                        <div class="review-avatar">${avatarChar}</div>
                        <div>
                            <div class="review-name">${name}</div>
                            <div class="review-date">${formattedDate}</div>
                        </div>
                    </div>
                    <div class="review-rating">${starsHtml}</div>
                </div>
                <div class="review-content">
                    ${review.pesan}
                </div>
                ${imgHtml}
            `;
            reviewsList.appendChild(card);
        });
    }

    // Tampilkan ulasan saat halaman pertama kali dimuat
    renderReviews();

    if(fotoInput) {
        fotoInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if(file && file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    previewImg.src = event.target.result;
                    fotoPreview.style.display = 'block';
                };
                reader.readAsDataURL(file);
            } else {
                fotoPreview.style.display = 'none';
                previewImg.src = '';
            }
        });
    }

    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const ratingSelected = document.querySelector('input[name="rating"]:checked');
            if(!ratingSelected) {
                alert('Silakan pilih rating bintang terlebih dahulu.');
                return;
            }
            
            const rating = parseInt(ratingSelected.value);
            const nama = document.getElementById('sarNama').value;
            const email = document.getElementById('sarEmail').value;
            const pesan = document.getElementById('sarPesan').value;
            
            // Ambil data Base64 foto dari preview (jika ada)
            let foto = '';
            if (fotoPreview.style.display === 'block') {
                foto = previewImg.src;
            }
            
            const btn = form.querySelector('button[type="submit"]');
            btn.textContent = 'Mengirim...';
            btn.disabled = true;

            setTimeout(() => {
                // Simpan ulasan baru
                const newReview = {
                    nama: nama,
                    email: email,
                    rating: rating,
                    pesan: pesan,
                    foto: foto,
                    tanggal: new Date().toISOString()
                };

                const reviews = getReviews();
                reviews.push(newReview);
                saveReviews(reviews);

                // Perbarui list ulasan secara langsung
                renderReviews();

                // Reset form
                form.reset();
                if(fotoPreview) fotoPreview.style.display = 'none';
                if(previewImg) previewImg.src = '';

                // Sembunyikan form dan tampilkan sukses
                form.style.display = 'none';
                sukses.style.display = 'block';
            }, 1000);
        });
    }
});
