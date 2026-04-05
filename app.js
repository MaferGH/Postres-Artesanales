'use strict';

const PRODUCTS = [
  {
    id: 1,
    name: 'Cheesecake de Fresa',
    desc: 'Base de galleta, crema de queso Philadelphia y coulis de fresa natural. Sin hornear.',
    price: 320,
    category: 'especiales',
    imgFile: 'cheesecake-fresa.jpg',   
    badge: 'popular', badgeText: 'Popular',
  },
  {
    id: 2,
    name: 'Pastel de Chocolate',
    desc: 'Esponjoso bizcocho de cacao con ganache de chocolate belga y betún satinado.',
    price: 450,
    category: 'pasteles',
    imgFile: 'pastel-chocolate.jpg',
    badge: 'new', badgeText: 'Nuevo',
  },
  {
    id: 3,
    name: 'Cupcakes de Vainilla',
    desc: 'Docena de cupcakes suaves con betún de buttercream y decoraciones de temporada.',
    price: 280,
    category: 'cupcakes',
    imgFile: 'cupcakes-vainilla.jpg',
    badge: null, badgeText: null,
  },
  {
    id: 4,
    name: 'Brownies de Nuez',
    desc: 'Densos y fudgy, con chocolate oscuro al 70%, nuez tostada y sal de mar.',
    price: 180,
    category: 'brownies',
    imgFile: 'brownies-nuez.jpg',
    badge: 'popular', badgeText: 'Popular',
  },
  {
    id: 5,
    name: 'Tarta de Limón',
    desc: 'Masa sablé crujiente con cremeux de limón y merengue italiano tostado.',
    price: 290,
    category: 'especiales',
    imgFile: 'tarta-limon.jpg',
    badge: null, badgeText: null,
  },
  {
    id: 6,
    name: 'Pastel Red Velvet',
    desc: 'Suave terciopelo rojo con crema de queso y betún blanco nieve. Perfecto para ocasiones especiales.',
    price: 480,
    category: 'pasteles',
    imgFile: 'red-velvet.jpg',
    badge: 'special', badgeText: 'Especial',
  },
  {
    id: 7,
    name: 'Cupcakes de Oreo',
    desc: 'Bizcocho de chocolate con relleno de crema Oreo y betún negro satinado.',
    price: 300,
    category: 'cupcakes',
    imgFile: 'cupcakes-oreo.jpg',
    badge: null, badgeText: null,
  },
  {
    id: 8,
    name: 'Blondies de Caramelo',
    desc: 'Brownie de vainilla con caramelo salado, chips de chocolate blanco y almendra laminada.',
    price: 190,
    category: 'brownies',
    imgFile: 'blondies-caramelo.jpg',
    badge: 'new', badgeText: 'Nuevo',
  },
];

/* ═══════════════════════════════════════
   RESEÑAS
═══════════════════════════════════════ */
const REVIEWS = [
  { name: 'María L.',   location: 'Condesa, CDMX',   stars: 5, text: 'El cheesecake de fresa es lo mejor que he probado. Pedí para el cumpleaños de mi hija y todos quedaron encantados.' },
  { name: 'Carlos M.',  location: 'Polanco, CDMX',   stars: 5, text: 'Los brownies de nuez son adictivos. El chocolate es muy intenso y el toque de sal los hace perfectos.' },
  { name: 'Andrea R.',  location: 'Coyoacán, CDMX',  stars: 5, text: 'Pedí el pastel Red Velvet para mi boda y superó todas mis expectativas. Presentación impecable y sabor increíble.' },
  { name: 'Sofía T.',   location: 'Xochimilco, CDMX', stars: 4, text: 'Los cupcakes de vainilla son esponjosos y el betún es perfecto, no demasiado dulce. Entrega pasable.' },
  { name: 'Roberto V.', location: 'Del Valle, CDMX',  stars: 5, text: 'La tarta de limón es espectacular. El merengue tostado la hace ver como salida de una vitrina parisina.' },
  { name: 'Lupita G.',  location: 'Nápoles, CDMX',   stars: 3, text: 'Maso menos' },
];

/* ═══════════════════════════════════════
   CARRITO — localStorage
═══════════════════════════════════════ */
let cart = JSON.parse(localStorage.getItem('douceur_cart') || '[]');

const saveCart  = () => localStorage.setItem('douceur_cart', JSON.stringify(cart));
const cartCount = () => cart.reduce((s, i) => s + i.qty, 0);
const cartTotal = () => cart.reduce((s, i) => s + i.price * i.qty, 0);
const fmt       = n  => `$${n.toLocaleString('es-MX')}`;

/* ═══════════════════════════════════════
   HELPERS DOM
═══════════════════════════════════════ */
const $  = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];

/* ═══════════════════════════════════════
   INIT
═══════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) lucide.createIcons();
  initTheme();
  initNav();
  initHeaderScroll();
  renderProducts('todos');
  renderReviews();
  initFilters();
  initCart();
  initModal();
  initScrollReveal();
  updateCartUI();
});

/* ═══════════════════════════════════════
   MODO OSCURO
═══════════════════════════════════════ */
function initTheme() {
  const saved = localStorage.getItem('douceur_theme');
  const dark  = window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.setAttribute('data-theme', saved || (dark ? 'dark' : 'light'));

  $('#themeToggle')?.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('douceur_theme', next);
  });
}

/* ═══════════════════════════════════════
   MENÚ (móvil)
═══════════════════════════════════════ */
function initNav() {
  const ham = $('#hamburger');
  const nav = $('#nav');
  const ov  = $('#navOverlay');
  if (!ham || !nav || !ov) return;

  function openNav() {
    ham.classList.add('open');
    nav.classList.add('open');
    ov.classList.add('show');
    document.body.style.overflow = 'hidden';
    ham.setAttribute('aria-expanded', 'true');
  }

  function closeNav() {
    ham.classList.remove('open');
    nav.classList.remove('open');
    ov.classList.remove('show');
    document.body.style.overflow = '';
    ham.setAttribute('aria-expanded', 'false');
  }

  ham.addEventListener('click', () => {
    nav.classList.contains('open') ? closeNav() : openNav();
  });

  ov.addEventListener('click', closeNav);

  // Cerrar al hacer click en un link
  $$('.nav__link').forEach(l => l.addEventListener('click', closeNav));

  // Cerrar con Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeNav();
  });
}

/* ═══════════════════════════════════════
   HEADER SCROLL
═══════════════════════════════════════ */
function initHeaderScroll() {
  const h = $('#header');
  const fn = () => h?.classList.toggle('scrolled', window.scrollY > 30);
  window.addEventListener('scroll', fn, { passive: true });
  fn();
}

function renderProducts(filter) {
  const grid = $('#productsGrid');
  if (!grid) return;

  const list = filter === 'todos'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === filter);

  grid.innerHTML = list.map((p, i) => `
    <article class="product-card reveal" data-id="${p.id}" style="animation-delay:${i * .07}s">
      <div class="product-card__img">
        <img
          src="img/${p.imgFile}"
          alt="${p.name}"
          loading="lazy"
          onerror="this.style.display='none'"
        />
        ${p.badge
          ? `<span class="product-card__badge badge-${p.badge}">${p.badgeText}</span>`
          : ''}
      </div>
      <div class="product-card__body">
        <span class="product-card__cat">${p.category}</span>
        <h3 class="product-card__name">${p.name}</h3>
        <p class="product-card__desc">${p.desc}</p>
        <div class="product-card__foot">
          <span class="product-card__price">${fmt(p.price)}</span>
          <button class="add-btn js-add" data-id="${p.id}" aria-label="Agregar ${p.name} al carrito">
            <i data-lucide="plus"></i>
          </button>
        </div>
      </div>
    </article>
  `).join('');

  if (window.lucide) lucide.createIcons();
  initScrollReveal();


  $$('.js-add').forEach(btn => {
    btn.addEventListener('click', () => addToCart(+btn.dataset.id));
  });
}

/* ═══════════════════════════════════════
   FILTROS
═══════════════════════════════════════ */
function initFilters() {
  $$('.cat').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.cat').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderProducts(btn.dataset.filter);
    });
  });
}


function renderReviews() {
  const grid = $('#reviewsGrid');
  if (!grid) return;

  grid.innerHTML = REVIEWS.map((r, i) => {
    const initials = r.name.split(' ').map(w => w[0]).join('').slice(0, 2);
    const stars    = Array.from({ length: r.stars }, () => `<i data-lucide="star"></i>`).join('');
    return `
      <article class="review-card reveal" style="animation-delay:${i * .09}s">
        <div class="review-card__stars">${stars}</div>
        <p class="review-card__text">"${r.text}"</p>
        <div class="review-card__author">
          <div class="review-card__av">${initials}</div>
          <div>
            <p class="review-card__name">${r.name}</p>
            <p class="review-card__loc">${r.location}</p>
          </div>
        </div>
      </article>
    `;
  }).join('');

  if (window.lucide) lucide.createIcons();
}

/* ═══════════════════════════════════════
   CARRITO: LÓGICA
═══════════════════════════════════════ */
function addToCart(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  const item = cart.find(x => x.id === id);
  if (item) item.qty++;
  else cart.push({ id: p.id, name: p.name, price: p.price, imgFile: p.imgFile, qty: 1 });
  saveCart();
  updateCartUI();
  toast(`${p.name} añadido al carrito`);
}

function changeQty(id, delta) {
  const item = cart.find(x => x.id === id);
  if (!item) return;
  item.qty = Math.max(0, item.qty + delta);
  if (item.qty === 0) cart = cart.filter(x => x.id !== id);
  saveCart();
  updateCartUI();
}

function removeItem(id) {
  cart = cart.filter(x => x.id !== id);
  saveCart();
  updateCartUI();
  toast('Producto eliminado');
}

/* ═══════════════════════════════════════
   CARRITO: UI
═══════════════════════════════════════ */
function initCart() {
  $('#cartBtn')?.addEventListener('click', openCart);
  $('#closeCart')?.addEventListener('click', closeCart);
  $('#cartOverlay')?.addEventListener('click', closeCart);
  $('#checkoutBtn')?.addEventListener('click', openModal);
  $('#goToMenu')?.addEventListener('click', closeCart);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeCart(); closeModal(); }
  });
}

function openCart() {
  $('#cartSidebar')?.classList.add('open');
  $('#cartOverlay')?.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  $('#cartSidebar')?.classList.remove('open');
  $('#cartOverlay')?.classList.remove('show');
  document.body.style.overflow = '';
}

function updateCartUI() {
  const count = cartCount();
  const badge = $('#cartBadge');
  if (badge) { badge.textContent = count; badge.classList.toggle('show', count > 0); }

  const empty = $('#cartEmpty');
  const list  = $('#cartItems');
  const foot  = $('#cartFooter');
  const sub   = $('#cartSubtotal');
  const tot   = $('#cartTotal');

  if (!list) return;

  if (cart.length === 0) {
    if (empty) empty.style.display = 'flex';
    list.innerHTML = '';
    if (foot) foot.style.display = 'none';
  } else {
    if (empty) empty.style.display = 'none';
    if (foot)  foot.style.display  = 'block';

    list.innerHTML = cart.map(item => `
      <li class="cart-item" data-id="${item.id}">
        <div class="cart-item__thumb">
          <img src="img/${item.imgFile}" alt="${item.name}" onerror="this.style.display='none'" />
        </div>
        <div>
          <p class="cart-item__name">${item.name}</p>
          <p class="cart-item__price">${fmt(item.price * item.qty)}</p>
        </div>
        <div class="cart-item__ctrl">
          <div class="qty-row">
            <button class="qty-btn js-dec" data-id="${item.id}" aria-label="Reducir">−</button>
            <span class="qty-n">${item.qty}</span>
            <button class="qty-btn js-inc" data-id="${item.id}" aria-label="Aumentar">+</button>
          </div>
          <button class="rm-btn js-rm" data-id="${item.id}">Eliminar</button>
        </div>
      </li>
    `).join('');

    $$('.js-inc').forEach(b => b.addEventListener('click', () => changeQty(+b.dataset.id,  1)));
    $$('.js-dec').forEach(b => b.addEventListener('click', () => changeQty(+b.dataset.id, -1)));
    $$('.js-rm' ).forEach(b => b.addEventListener('click', () => removeItem(+b.dataset.id)));

    const total = cartTotal();
    if (sub) sub.textContent = fmt(total);
    if (tot) tot.textContent = fmt(total);
  }
}

/* ═══════════════════════════════════════
   MODAL CHECKOUT
═══════════════════════════════════════ */
function initModal() {
  $('#closeModal')?.addEventListener('click', closeModal);
  $('#checkoutModal')?.addEventListener('click', e => {
    if (e.target === $('#checkoutModal')) closeModal();
  });
  $('#checkoutForm')?.addEventListener('submit', handleSubmit);
}

function openModal() {
  if (cart.length === 0) { toast('Tu carrito está vacío'); return; }
  closeCart();
  renderOrderSummary();
  const m = $('#checkoutModal');
  if (m) m.classList.add('open');
  document.body.style.overflow = 'hidden';
  setTimeout(() => $('#clientName')?.focus(), 320);
}

function closeModal() {
  $('#checkoutModal')?.classList.remove('open');
  document.body.style.overflow = '';
}

function renderOrderSummary() {
  const list = $('#orderSummaryList');
  const tot  = $('#modalTotal');
  if (!list) return;
  list.innerHTML = cart.map(i =>
    `<div class="order-row">
      <span>${i.name} × ${i.qty}</span>
      <span>${fmt(i.price * i.qty)}</span>
    </div>`
  ).join('');
  if (tot) tot.textContent = fmt(cartTotal());
}

/* ═══════════════════════════════════════
   VALIDACIÓN
═══════════════════════════════════════ */
function validate() {
  let ok = true;

  // Limpiar
  ['#clientName', '#clientPhone', '#clientAddress'].forEach(s => $(s)?.classList.remove('invalid'));
  ['#nameError', '#phoneError', '#addressError'].forEach(id => { const el = $(id); if (el) el.textContent = ''; });

  const name    = $('#clientName');
  const phone   = $('#clientPhone');
  const address = $('#clientAddress');

  if (!name?.value.trim()) {
    $('#nameError').textContent = 'Por favor ingresa tu nombre.';
    name?.classList.add('invalid'); ok = false;
  }
  if ((phone?.value.replace(/\D/g, '').length || 0) < 10) {
    $('#phoneError').textContent = 'Ingresa un teléfono válido (10 dígitos).';
    phone?.classList.add('invalid'); ok = false;
  }
  if (!address?.value.trim()) {
    $('#addressError').textContent = 'Por favor ingresa tu dirección.';
    address?.classList.add('invalid'); ok = false;
  }

  return ok;
}

/* ═══════════════════════════════════════
   SUBMIT PEDIDO
═══════════════════════════════════════ */
async function handleSubmit(e) {
  e.preventDefault();
  if (!validate()) {
    document.querySelector('.invalid')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

  const method = document.querySelector('input[name="orderMethod"]:checked')?.value || 'whatsapp';
  const data   = {
    name:    $('#clientName').value.trim(),
    phone:   $('#clientPhone').value.trim(),
    address: $('#clientAddress').value.trim(),
    notes:   $('#clientNotes').value.trim(),
  };

  const btn = $('#submitOrder');
  if (btn) { btn.disabled = true; btn.innerHTML = '<span>Procesando...</span>'; }

  try {
    if (method === 'whatsapp' || method === 'both') sendWhatsApp(data);
    if (method === 'pdf'      || method === 'both') await generatePDF(data);

    cart = []; saveCart(); updateCartUI(); closeModal();
    toast('Pedido confirmado. ¡Gracias por tu compra!');
  } catch (err) {
    console.error(err);
    toast('Error al procesar el pedido. Intenta de nuevo.');
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = '<i data-lucide="check"></i> Confirmar pedido';
      if (window.lucide) lucide.createIcons();
    }
  }
}

/* ═══════════════════════════════════════
   WHATSAPP
═══════════════════════════════════════ */
function sendWhatsApp(data) {
  const NUM   = '5215512345678';  
  const fecha = new Date().toLocaleDateString('es-MX', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const items = cart.map(i => `  • ${i.name} × ${i.qty} = ${fmt(i.price * i.qty)}`).join('\n');

  const msg = [
    `*Nuevo pedido — Douceur*`,
    fecha,
    '',
    `*Cliente:* ${data.name}`,
    `*Teléfono:* ${data.phone}`,
    `*Dirección:* ${data.address}`,
    data.notes ? `*Notas:* ${data.notes}` : null,
    '',
    `*Pedido:*`,
    items,
    '',
    `*Total: ${fmt(cartTotal())}*`,
  ].filter(Boolean).join('\n');

  window.open(`https://wa.me/${NUM}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
}

/* ═══════════════════════════════════════
   GENERAR PDF
═══════════════════════════════════════ */
async function generatePDF(data) {
  const lib = window.jspdf || (typeof jspdf !== 'undefined' ? jspdf : null);
  if (!lib) { toast('jsPDF no disponible. Recarga la página.'); return; }

  const { jsPDF } = lib;
  const doc   = new jsPDF({ unit: 'mm', format: 'a4' });
  const fecha = new Date().toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  const W     = doc.internal.pageSize.getWidth();
  let y       = 20;

  // Header naranja
  doc.setFillColor(224, 122, 32);
  doc.rect(0, 0, W, 40, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');   doc.setFontSize(24);
  doc.text('Douceur', 20, 18);
  doc.setFont('helvetica', 'normal'); doc.setFontSize(9);
  doc.text('Postres Artesanales · Ciudad de México', 20, 26);
  doc.text(`Comprobante de pedido · ${fecha}`, 20, 33);

  y = 52;

  // Datos del cliente
  doc.setTextColor(60, 30, 10);
  doc.setFont('helvetica', 'bold'); doc.setFontSize(12);
  doc.text('Datos del cliente', 20, y); y += 7;

  const fields = [['Nombre:', data.name], ['Teléfono:', data.phone], ['Dirección:', data.address]];
  if (data.notes) fields.push(['Notas:', data.notes]);

  doc.setFontSize(9);
  fields.forEach(([lbl, val]) => {
    doc.setFont('helvetica', 'bold');   doc.text(lbl, 20, y);
    doc.setFont('helvetica', 'normal');
    const wrapped = doc.splitTextToSize(val, W - 60);
    doc.text(wrapped, 52, y);
    y += wrapped.length * 5.5 + 1;
  });

  y += 6;
  doc.setDrawColor(224, 122, 32); doc.setLineWidth(.5);
  doc.line(20, y, W - 20, y); y += 8;

  // Tabla de productos
  doc.setFont('helvetica', 'bold'); doc.setFontSize(12);
  doc.text('Detalle del pedido', 20, y); y += 7;

  doc.setFillColor(254, 240, 224);
  doc.rect(20, y - 4, W - 40, 8, 'F');
  doc.setFontSize(9); doc.setTextColor(60, 30, 10);
  doc.text('Producto',   22,       y + .5);
  doc.text('P. unit.',   22 + 90,  y + .5);
  doc.text('Cant.',      22 + 115, y + .5);
  doc.text('Subtotal',   W - 40,   y + .5);
  y += 9;

  cart.forEach((item, idx) => {
    if (idx % 2 === 0) {
      doc.setFillColor(255, 251, 246);
      doc.rect(20, y - 4, W - 40, 8, 'F');
    }
    doc.setFont('helvetica', 'normal'); doc.setFontSize(9); doc.setTextColor(60, 40, 20);
    doc.text(item.name,             22,       y + .5);
    doc.text(fmt(item.price),       22 + 90,  y + .5);
    doc.text(`${item.qty}`,         22 + 120, y + .5);
    doc.text(fmt(item.price * item.qty), W - 40, y + .5);
    y += 9;
  });

  y += 4;
  doc.setDrawColor(224, 122, 32); doc.line(20, y, W - 20, y); y += 7;

  doc.setFillColor(224, 122, 32);
  doc.rect(W - 72, y - 5, 52, 10, 'F');
  doc.setFont('helvetica', 'bold'); doc.setFontSize(11);
  doc.setTextColor(255, 255, 255);
  doc.text(`Total: ${fmt(cartTotal())}`, W - 69, y + 2);

  y += 20;
  doc.setTextColor(150, 100, 60);
  doc.setFont('helvetica', 'italic'); doc.setFontSize(9);
  doc.text('Gracias por elegir Douceur Postres Artesanales.', 20, y);
  doc.text('Contacto: wa.me/5215512345678', 20, y + 6);

  doc.save(`Douceur_${data.name.replace(/\s+/g, '_')}_${Date.now()}.pdf`);
}

/* ═══════════════════════════════════════
   SCROLL REVEAL
═══════════════════════════════════════ */
function initScrollReveal() {
  const els = $$('.reveal');
  if (!els.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: .08, rootMargin: '0px 0px -30px 0px' });
  els.forEach(el => obs.observe(el));
}

/* ═══════════════════════════════════════
   TOAST
═══════════════════════════════════════ */
let toastTm;
function toast(msg) {
  const el = $('#toast');
  if (!el) return;
  clearTimeout(toastTm);
  el.textContent = msg;
  el.classList.add('show');
  toastTm = setTimeout(() => el.classList.remove('show'), 3200);
}

/* ═══════════════════════════════════════
   SMOOTH SCROLL
═══════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (!t) return;
    e.preventDefault();
    t.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
