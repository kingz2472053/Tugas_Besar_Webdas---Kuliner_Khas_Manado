// js/reservasi.js
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formReservasi');
    const sukses = document.getElementById('reservasiSukses');
    
    if(form) {
        // Set min date to today
        const dateInput = document.getElementById('resTanggal');
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const btn = form.querySelector('button[type="submit"]');
            btn.textContent = 'Memproses...';
            btn.disabled = true;
            
            setTimeout(() => {
                form.style.display = 'none';
                sukses.style.display = 'block';
            }, 1000);
        });
    }
});
