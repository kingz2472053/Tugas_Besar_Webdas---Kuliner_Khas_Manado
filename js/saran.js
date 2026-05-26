document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formSaran');
    const sukses = document.getElementById('saranSukses');
    const fotoInput = document.getElementById('sarFoto');
    const fotoPreview = document.getElementById('fotoPreview');
    const previewImg = document.getElementById('previewImg');
    
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
            const btn = form.querySelector('button[type="submit"]');
            btn.textContent = 'Mengirim...';
            btn.disabled = true;
            setTimeout(() => {
                form.style.display = 'none';
                sukses.style.display = 'block';
            }, 1000);
        });
    }
});
