document.addEventListener('DOMContentLoaded', () => {

    const revealElements = document.querySelectorAll('.scroll-reveal');

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease-out';
    });

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';

                observer.unobserve(entry.target);
            }
        });
    };

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver(revealCallback, revealOptions);
    revealElements.forEach(el => {
        observer.observe(el);
    });
});
