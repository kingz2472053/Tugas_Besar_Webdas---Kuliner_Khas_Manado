// js/hero.js
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-dot');
    
    if(slides.length === 0) return;
    
    let currentSlide = 0;
    let slideInterval;
    const intervalTime = 5000; // 5 detik per slide
    
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }
    
    function nextSlide() {
        let next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }
    
    function startSlide() {
        if(slideInterval) clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, intervalTime);
    }
    
    // Dot click
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const index = parseInt(dot.getAttribute('data-index'));
            showSlide(index);
            startSlide(); // Reset interval
        });
    });
    
    // Start initial
    showSlide(0);
    startSlide();
});
