document.addEventListener('DOMContentLoaded', () => {
    Promise.resolve(window.DATA_TENTANG).then(data => ({ json: () => data }))
        .then(res => res.json())
        .then(data => {
            const tlContainer = document.getElementById('timelineContainer');
            if(tlContainer) {
                tlContainer.innerHTML = '';
                data.sejarah.forEach((item, index) => {
                    const cls = index % 2 === 0 ? 'tl-left' : 'tl-right';
                    const div = document.createElement('div');
                    div.className = `tl-container ${cls}`;
                    div.style.animationDelay = `${index * 0.2}s`;
                    div.innerHTML = `
                        <div class="tl-content">
                            <div class="tl-tahun">${item.tahun}</div>
                            <h3>${item.judul}</h3>
                            <p style="color:var(--text-muted); font-size:0.95rem; margin-top:8px;">${item.deskripsi}</p>
                        </div>
                    `;
                    tlContainer.appendChild(div);
                });
            }
            const faqContainer = document.getElementById('faqContainer');
            if(faqContainer) {
                faqContainer.innerHTML = '';
                data.faq.forEach(item => {
                    const div = document.createElement('div');
                    div.className = 'faq-item';
                    div.innerHTML = `
                        <div class="faq-question">
                            <span>${item.tanya}</span>
                            <span class="faq-icon">+</span>
                        </div>
                        <div class="faq-answer">${item.jawab}</div>
                    `;
                    div.querySelector('.faq-question').addEventListener('click', () => {
                        div.classList.toggle('active');
                        const icon = div.querySelector('.faq-icon');
                        icon.textContent = div.classList.contains('active') ? '×' : '+';
                    });
                    faqContainer.appendChild(div);
                });
            }
        })
        .catch(err => console.error(err));
});
