// js/navbar.js
document.addEventListener('DOMContentLoaded', () => {
    // 1. Dark Mode Toggle
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Cek localStorage
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-theme');
        if(themeToggle) themeToggle.innerHTML = '☀';
    }

    if(themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-theme');
            if (body.classList.contains('dark-theme')) {
                localStorage.setItem('theme', 'dark');
                themeToggle.innerHTML = '☀';
            } else {
                localStorage.setItem('theme', 'light');
                themeToggle.innerHTML = '◐';
            }
        });
    }

    // 2. Hamburger Menu
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if(hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
    
    // Update Cart Badge globally
    updateGlobalCartBadge();
});

function updateGlobalCartBadge() {
    const badge = document.getElementById('cartBadge');
    if(badge) {
        const cart = JSON.parse(localStorage.getItem('woku_cart') || '[]');
        const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
        badge.textContent = totalItems;
        badge.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}
