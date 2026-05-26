// js/saran.js
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formSaran');
    const sukses = document.getElementById('saranSukses');
    
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Validasi rating
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
