document.addEventListener('DOMContentLoaded', () => {
    const productGrid = document.getElementById('productGrid');
    const filterBtns = document.querySelectorAll('#produkFilters .filter-btn');
    const cartItemsContainer = document.getElementById('cartItems');
    const cartSummary = document.getElementById('cartSummary');
    const cartSubtotal = document.getElementById('cartSubtotal');
    const cartTotal = document.getElementById('cartTotal');
    const formCheckout = document.getElementById('formCheckout');
    let allProducts = [];
    let cart = JSON.parse(localStorage.getItem('woku_cart') || '[]');
    if(!productGrid) return;
    Promise.resolve(window.DATA_PRODUK).then(data => ({ json: () => data }))
        .then(res => res.json())
        .then(data => {
            allProducts = data;
            renderProducts(data);
            renderCart();
        })
        .catch(err => {
            productGrid.innerHTML = '<p style="color:red;text-align:center;">Gagal memuat data produk.</p>';
        });
    function renderProducts(items) {
        productGrid.innerHTML = '';
        if(items.length === 0) {
            productGrid.innerHTML = '<p style="text-align:center;width:100%;">Tidak ada produk.</p>';
            return;
        }
        items.forEach((item, index) => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.style.animationDelay = `${index * 0.1}s`;
            let badgeHtml = item.bestSeller ? '<div class="bestseller-badge">BEST SELLER</div>' : '';
            card.innerHTML = `
                <div class="product-img">
                    ${badgeHtml}
                    <img src="${item.gambar}" alt="${item.nama}">
                </div>
                <div class="product-content">
                    <h3>${item.nama}</h3>
                    <div class="product-category">${item.berat} | ${item.varian[0]}</div>
                    <div class="product-price">Rp ${item.harga.toLocaleString('id-ID')}</div>
                    <div class="product-actions">
                        <div class="qty-control">
                            <button class="qty-btn minus" onclick="event.stopPropagation();">-</button>
                            <input type="number" class="qty-input" value="1" min="1" max="10">
                            <button class="qty-btn plus" onclick="event.stopPropagation();">+</button>
                        </div>
                        <button class="btn-add-cart" data-id="${item.id}">+ Keranjang</button>
                    </div>
                </div>
            `;
            const minusBtn = card.querySelector('.minus');
            const plusBtn = card.querySelector('.plus');
            const input = card.querySelector('.qty-input');
            const addBtn = card.querySelector('.btn-add-cart');
            minusBtn.addEventListener('click', () => {
                let val = parseInt(input.value);
                if(val > 1) input.value = val - 1;
            });
            plusBtn.addEventListener('click', () => {
                let val = parseInt(input.value);
                if(val < 10) input.value = val + 1;
            });
            addBtn.addEventListener('click', () => {
                addToCart(item, parseInt(input.value));
                input.value = 1; 
            });
            productGrid.appendChild(card);
        });
    }
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');
            if(filter === 'semua') {
                renderProducts(allProducts);
            } else {
                const filtered = allProducts.filter(item => item.kategori === filter);
                renderProducts(filtered);
            }
        });
    });
    function addToCart(product, qty) {
        const existing = cart.find(i => i.id === product.id);
        if(existing) {
            existing.qty += qty;
        } else {
            cart.push({
                id: product.id,
                nama: product.nama,
                harga: product.harga,
                gambar: product.gambar,
                qty: qty
            });
        }
        saveCart();
        renderCart();
        if(window.updateGlobalCartBadge) window.updateGlobalCartBadge();
    }
    function removeFromCart(id) {
        cart = cart.filter(i => i.id !== id);
        saveCart();
        renderCart();
        if(window.updateGlobalCartBadge) window.updateGlobalCartBadge();
    }
    function saveCart() {
        localStorage.setItem('woku_cart', JSON.stringify(cart));
    }
    function renderCart() {
        cartItemsContainer.innerHTML = '';
        if(cart.length === 0) {
            cartItemsContainer.innerHTML = '<div class="empty-cart-msg">Keranjang Anda masih kosong.</div>';
            cartSummary.style.display = 'none';
            formCheckout.style.display = 'none';
            return;
        }
        let subtotal = 0;
        cart.forEach(item => {
            const itemTotal = item.harga * item.qty;
            subtotal += itemTotal;
            const div = document.createElement('div');
            div.className = 'cart-item';
            div.innerHTML = `
                <div class="cart-item-info">
                    <h4>${item.nama}</h4>
                    <div class="cart-item-price">${item.qty} x Rp ${item.harga.toLocaleString('id-ID')}</div>
                </div>
                <div class="cart-item-controls">
                    <div style="font-weight:600; color:var(--primary);">Rp ${itemTotal.toLocaleString('id-ID')}</div>
                    <button class="btn-remove" data-id="${item.id}" title="Hapus">✕</button>
                </div>
            `;
            div.querySelector('.btn-remove').addEventListener('click', (e) => {
                removeFromCart(e.target.getAttribute('data-id'));
            });
            cartItemsContainer.appendChild(div);
        });
        const ongkir = 25000;
        const total = subtotal + ongkir;
        cartSubtotal.textContent = `Rp ${subtotal.toLocaleString('id-ID')}`;
        cartTotal.textContent = `Rp ${total.toLocaleString('id-ID')}`;
        cartSummary.style.display = 'block';
        formCheckout.style.display = 'block';
    }
    const checkoutForm = document.getElementById('checkoutForm');
    const checkoutSuccess = document.getElementById('checkoutSuccess');
    if(checkoutForm) {
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = checkoutForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            btn.textContent = 'Memproses...';
            btn.disabled = true;
            setTimeout(() => {
                cart = [];
                saveCart();
                renderCart();
                if(window.updateGlobalCartBadge) window.updateGlobalCartBadge();
                checkoutForm.style.display = 'none';
                checkoutSuccess.style.display = 'block';
                document.getElementById('orderNumber').textContent = '#WM' + Math.floor(10000 + Math.random() * 90000);
            }, 1500);
        });
    }
});
