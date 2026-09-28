/* FarmLink — farm-to-market platform core (vanilla JS, no dependencies) */
(function () {
  'use strict';

  var DATA_KEY = 'farmlink_data_v1';
  var CART_KEY = 'farmlink_cart_v1';
  var AUTH_KEY = 'farmlink_admin';

  var ICON_SEARCH = '<svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>';
  var ICON_BOX = '<svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M21 8l-9-5-9 5v8l9 5 9-5V8z"/><path d="M3.3 8.3L12 13l8.7-4.7M12 13v8.5"/></svg>';
  var ICON_CART = '<svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><circle cx="9" cy="20" r="1.5"/><circle cx="17" cy="20" r="1.5"/><path d="M3 3h2l2.4 12h10.2L21 7H6"/></svg>';

  var DEFAULT_DATA = {
    site: {
      name: 'FarmLink',
      tagline: 'Fresh from Zimbabwean farms, delivered to your door.',
      phone: '+263 71 8633945',
      email: 'Munyaradziachibald01@gmail.com,
      city: 'Harare',
      checkpointFee: 3,
      homeFee: 5,
      commission: 0.10
    },
    checkpoints: [
      { id: 'avondale', name: "Baba's Tuckshop — Avondale", detail: 'Corner King George & Fife Ave · Collect Tue–Fri, 2–6pm' },
      { id: 'glennorah', name: "Mama's Market Stall — Glen Norah", detail: 'Glen Norah Shopping Centre · Collect Wed & Sat, 10am–4pm' },
      { id: 'msasa', name: 'Msasa Park Depot', detail: 'Msasa Park Shopping Centre · Collect Mon–Sat, 9am–5pm' }
    ],
    stores: [
      { id: 'moyo-farms', store: 'Moyo Family Farms', farmer: 'John Moyo', location: 'Mazowe', distance: '45km', since: 2018, rating: 4.8, reviews: 24, verified: true, img: 'assets/img/farmer.jpg', about: 'Smallholder horticulture farm growing tomatoes, rape and butternut on 3 hectares of irrigated land along the Mazowe River.' },
      { id: 'ncube-gardens', store: 'Ncube Gardens', farmer: 'Maria Ncube', location: 'Marondera', distance: '72km', since: 2016, rating: 4.9, reviews: 31, verified: true, img: 'assets/img/farmer.jpg', about: 'Family garden specialising in onions, groundnuts and dried produce with on-farm storage.' },
      { id: 'kambuzuma-plot', store: 'Kambuzuma Plot 7', farmer: 'Simba Kambuzuma', location: 'Mazowe', distance: '45km', since: 2020, rating: 4.7, reviews: 18, verified: true, img: 'assets/img/farmer.jpg', about: 'Youth-run market garden supplying leafy greens and winter squash to Harare buyers.' },
      { id: 'tshuma-fields', store: 'Tshuma Fields', farmer: 'Grace Tshuma', location: 'Bindura', distance: '88km', since: 2015, rating: 4.6, reviews: 15, verified: true, img: 'assets/img/farmer.jpg', about: 'Orange-fleshed sweet potato producer focused on drought-tolerant varieties.' },
      { id: 'moyo-grains', store: 'Moyo Grain Co.', farmer: 'Tendai Moyo', location: 'Murehwa', distance: '95km', since: 2013, rating: 4.9, reviews: 42, verified: true, img: 'assets/img/farmer.jpg', about: 'Grain farmer delivering cleaned, sorted white maize and legumes from Murehwa.' },
      { id: 'dube-bananas', store: 'Dube Banana Estate', farmer: 'Joseph Dube', location: 'Mazowe', distance: '45km', since: 2019, rating: 4.7, reviews: 19, verified: true, img: 'assets/img/farmer.jpg', about: 'Two-acre banana plantation harvesting year-round.' }
    ],
    products: [
      { id: 1, storeId: 'moyo-farms', name: 'Fresh Tomatoes', price: 13, unit: 'crate', stock: 20, category: 'vegetables', harvest: 'Today', img: 'assets/img/products/tomatoes.jpg', alt: 'Ripe red tomatoes in a wooden crate from Moyo Family Farms, Mazowe, Zimbabwe', desc: 'Ripe, red tomatoes harvested this morning. Perfect for stews, salads and fresh eating. Grown without chemical fertilisers on irrigated land in Mazowe.' },
      { id: 2, storeId: 'ncube-gardens', name: 'Red Onions', price: 8, unit: 'bucket', stock: 15, category: 'vegetables', harvest: 'Yesterday', img: 'assets/img/products/onions.jpg', alt: 'Pile of fresh red onions harvested at Ncube Gardens, Marondera, Zimbabwe', desc: 'Large, firm onions with excellent storage life. Ideal for cooking, frying and salads. Harvested yesterday morning and field-cured.' },
      { id: 3, storeId: 'kambuzuma-plot', name: 'Rape (Covo)', price: 3, unit: 'bunch', stock: 50, category: 'vegetables', harvest: 'Today', img: 'assets/img/products/rape.jpg', alt: 'Fresh bunch of green rape covo leafy greens from Kambuzuma Plot 7, Mazowe', desc: 'Fresh green rape leaves, washed and bundled. Rich in iron and vitamins. Best cooked within 2 days of delivery.' },
      { id: 4, storeId: 'tshuma-fields', name: 'Sweet Potatoes', price: 6, unit: 'bucket', stock: 12, category: 'tubers', harvest: '2 days ago', img: 'assets/img/products/sweet-potatoes.jpg', alt: 'Orange-fleshed sweet potatoes in a basket from Tshuma Fields, Bindura, Zimbabwe', desc: 'Orange-fleshed sweet potatoes, perfect for boiling, roasting or making chips. Naturally sweet and nutrient-dense, grown in Bindura.' },
      { id: 5, storeId: 'moyo-grains', name: 'White Maize', price: 10, unit: 'bucket', stock: 30, category: 'grains', harvest: 'Last week', img: 'assets/img/products/maize.jpg', alt: 'Dried white maize cobs ready for milling from Moyo Grain Co., Murehwa, Zimbabwe', desc: 'Dried white maize, perfect for sadza. Clean, sorted and ready for milling. Stored in dry, ventilated conditions.' },
      { id: 6, storeId: 'kambuzuma-plot', name: 'Butternut', price: 4, unit: 'each', stock: 25, category: 'vegetables', harvest: 'Today', img: 'assets/img/products/butternut.jpg', alt: 'Pile of harvested butternut squash from Kambuzuma Plot 7, Mazowe, Zimbabwe', desc: 'Medium-sized butternut squash with sweet, nutty flavour. Excellent for roasting, soups and stews. Harvested today.' },
      { id: 7, storeId: 'ncube-gardens', name: 'Groundnuts', price: 12, unit: 'kg', stock: 8, category: 'grains', harvest: 'Last week', img: 'assets/img/products/groundnuts.jpg', alt: 'Raw groundnuts in shell from Ncube Gardens, Marondera, Zimbabwe', desc: 'Raw groundnuts, shelled and clean. Perfect for roasting, making peanut butter or adding to dishes. High quality, sun-dried.' },
      { id: 8, storeId: 'dube-bananas', name: 'Bananas', price: 5, unit: 'bunch', stock: 18, category: 'fruits', harvest: 'Today', img: 'assets/img/products/bananas.jpg', alt: 'Ripe banana bunches harvested at Dube Banana Estate, Mazowe, Zimbabwe', desc: 'Ripe lady-finger bananas. Sweet and soft. Best eaten within 3 days or used for baking and smoothies.' }
    ],
    orders: [],
    pendingStores: []
  };

  function clone(o) { return JSON.parse(JSON.stringify(o)); }

  function getData() {
    try {
      var d = JSON.parse(localStorage.getItem(DATA_KEY));
      if (d && d.site && d.products && d.stores) return d;
    } catch (e) { /* corrupted storage — fall through */ }
    return clone(DEFAULT_DATA);
  }
  function saveData(d) { localStorage.setItem(DATA_KEY, JSON.stringify(d)); }
  function resetData() { localStorage.removeItem(DATA_KEY); }

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function fmt(n) { return '$' + Number(n).toLocaleString('en-US'); }

  /* ---------- Cart ---------- */
  function getCart() { try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch (e) { return []; } }
  function saveCart(c) { localStorage.setItem(CART_KEY, JSON.stringify(c)); refreshBadges(); }
  function cartCount() { return getCart().reduce(function (s, i) { return s + i.qty; }, 0); }
  function addToCart(id, qty) {
    qty = qty || 1;
    var cart = getCart(), found = null;
    for (var i = 0; i < cart.length; i++) if (cart[i].id === id) found = cart[i];
    if (found) found.qty += qty; else cart.push({ id: id, qty: qty });
    saveCart(cart);
  }
  function setQty(id, qty) {
    var cart = getCart();
    for (var i = cart.length - 1; i >= 0; i--) {
      if (cart[i].id === id) {
        if (qty <= 0) cart.splice(i, 1); else cart[i].qty = qty;
      }
    }
    saveCart(cart);
  }
  function detailedCart() {
    var data = getData();
    return getCart().map(function (i) {
      var p = null;
      for (var j = 0; j < data.products.length; j++) if (data.products[j].id === i.id) p = data.products[j];
      return p ? { product: p, qty: i.qty } : null;
    }).filter(Boolean);
  }
  function refreshBadges() {
    var n = cartCount();
    document.querySelectorAll('[data-cart-count]').forEach(function (el) {
      el.textContent = n;
      el.style.display = n > 0 ? 'flex' : 'none';
    });
  }

  /* ---------- Money math ---------- */
  function orderTotals(items, method) {
    var site = getData().site;
    var subtotal = items.reduce(function (s, it) { return s + it.product.price * it.qty; }, 0);
    var delivery = method === 'home' ? site.homeFee : site.checkpointFee;
    var commission = Math.round(subtotal * site.commission);
    var farmerPayout = subtotal - commission;
    return { subtotal: subtotal, delivery: delivery, commission: commission, farmerPayout: farmerPayout, total: subtotal + delivery + commission };
  }

  function placeOrder(details) {
    var data = getData();
    var items = detailedCart();
    if (!items.length) return null;
    var t = orderTotals(items, details.method);
    var id = 'FL-' + new Date().toISOString().slice(2, 10).replace(/-/g, '') + '-' + String(Math.floor(Math.random() * 900) + 100);
    var order = {
      id: id,
      date: new Date().toISOString(),
      customer: details.name,
      phone: details.phone,
      method: details.method,
      checkpoint: details.checkpoint || null,
      payment: details.payment,
      items: items.map(function (i) { return { productId: i.product.id, name: i.product.name, storeId: i.product.storeId, qty: i.qty, price: i.product.price, img: i.product.img, alt: i.product.alt }; }),
      subtotal: t.subtotal,
      delivery: t.delivery,
      commission: t.commission,
      farmerPayout: t.farmerPayout,
      total: t.total,
      status: 'processing',
      utm: (window.FarmLinkUTM ? window.FarmLinkUTM() : null)
    };
    data.orders.unshift(order);
    saveData(data);
    saveCart([]);
    if (window.dataLayer) window.dataLayer.push({ event: 'purchase', order_id: order.id, value: order.total, items: order.items.length });
    return order;
  }

  /* ---------- Admin ---------- */
  /* Demo credentials — CHANGE BEFORE GOING LIVE. */
  var LOGIN_MAX_ATTEMPTS = 5;
  var LOGIN_LOCK_SECONDS = 60;
  function login(email, pass) {
    var fails = Number(sessionStorage.getItem('fl_login_fails') || 0);
    var lockedUntil = Number(sessionStorage.getItem('fl_login_lock') || 0);
    if (Date.now() < lockedUntil) return false;
    if (email === 'Munyaradziachibald01@gmail.com && pass === 'Angella1983') {
      sessionStorage.setItem(AUTH_KEY, '1');
      sessionStorage.removeItem('fl_login_fails');
      return true;
    }
    fails += 1;
    sessionStorage.setItem('fl_login_fails', String(fails));
    if (fails >= LOGIN_MAX_ATTEMPTS) {
      sessionStorage.setItem('fl_login_lock', String(Date.now() + LOGIN_LOCK_SECONDS * 1000));
      sessionStorage.removeItem('fl_login_fails');
    }
    return false;
  }
  function logout() { sessionStorage.removeItem(AUTH_KEY); }
  function isAdmin() { return sessionStorage.getItem(AUTH_KEY) === '1'; }
  function requireAdmin() { if (!isAdmin()) { window.location.href = 'admin.html'; return false; } return true; }

  /* ---------- Render helpers ---------- */
  function productCard(p, store) {
    store = store || storeById(p.storeId);
    var qty = 0, cart = getCart();
    for (var i = 0; i < cart.length; i++) if (cart[i].id === p.id) qty = cart[i].qty;
    var controls = qty > 0
      ? '<div class="qty-control" data-no-nav><button type="button" data-dec="' + p.id + '" aria-label="Decrease quantity">−</button><span>' + qty + '</span><button type="button" data-inc="' + p.id + '" aria-label="Increase quantity">+</button></div>'
      : '<button type="button" class="add-btn" data-add="' + p.id + '" aria-label="Add ' + esc(p.name) + ' to cart">+</button>';
    return '<article class="product-card" data-nav="product.html?p=' + p.id + '">' +
      '<div class="img-wrap"><img class="product-img" src="' + esc(p.img) + '" alt="' + esc(p.alt) + '" loading="lazy">' +
      '<span class="tag harvest-tag">Harvested ' + esc(p.harvest) + '</span>' +
      '<span class="tag distance-tag">' + esc(store ? store.distance : '') + '</span></div>' +
      '<div class="product-info"><h3 class="product-title">' + esc(p.name) + '</h3>' +
      '<div class="product-farm">' + esc(store ? store.store : '') + ' · ' + esc(store ? store.location : '') + ' <span class="verified" title="FarmLink visited this farm and confirmed the farmer, location and produce.">✓ verified</span></div>' +
      '<div class="product-bottom"><div class="product-price">' + fmt(p.price) + '<span class="unit">/' + esc(p.unit) + '</span></div>' + controls + '</div></div></article>';
  }

  function storeCard(s) {
    var count = 0, data = getData();
    for (var i = 0; i < data.products.length; i++) if (data.products[i].storeId === s.id) count++;
    return '<article class="store-card" data-nav="store.html?s=' + esc(s.id) + '">' +
      '<img src="' + esc(s.img) + '" alt="' + esc(s.farmer + ', owner of ' + s.store + ' in ' + s.location + ', Zimbabwe') + '" loading="lazy">' +
      '<div class="store-card-body"><h3>' + esc(s.store) + '</h3>' +
      '<p>' + esc(s.location) + ' · ' + esc(s.distance) + ' away · farming since ' + s.since + '</p>' +
      '<div class="store-stats"><span>' + count + ' products</span><span>Farming since ' + s.since + '</span></div></div></article>';
  }

  /* ---------- Buyer reviews (real, written after delivery) ---------- */
  function getReviews() { try { return JSON.parse(localStorage.getItem('fl_reviews')) || {}; } catch (e) { return {}; } }
  function saveReviews(r) { try { localStorage.setItem('fl_reviews', JSON.stringify(r)); } catch (e) { /* ignore */ } }
  function renderReviews(storeId) {
    var box = document.getElementById('reviewsBox');
    if (!box) return;
    var all = getReviews();
    var list = all[storeId] || [];
    var html = '<h2 class="section-title" style="margin:24px 0 4px;font-size:17px">Buyer reviews</h2>' +
      '<p style="font-size:12px;color:var(--muted);margin-bottom:12px">Written by FarmLink buyers after delivery. We publish every review that follows our guidelines and never edit or remove criticism.</p>';
    if (!list.length) {
      html += '<p style="font-size:14px;color:var(--secondary);margin-bottom:16px">No written reviews for this store yet. Bought from this farm? Be the first to review.</p>';
    } else {
      html += list.map(function (r) {
        return '<div class="cart-item" style="margin-bottom:8px"><div class="cart-item-info"><div class="cart-item-title">' + esc(r.name) + ' — ' + r.rating + '/5</div><p style="font-size:13px;color:var(--secondary)">' + esc(r.text) + '</p><div class="cart-item-farm">' + new Date(r.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) + '</div></div></div>';
      }).join('');
    }
    html += '<form id="reviewForm" style="max-width:560px;margin-top:8px" novalidate>' +
      '<div class="form-row"><div class="form-group"><label for="rvName">Your name</label><input id="rvName" type="text" maxlength="60" required></div>' +
      '<div class="form-group"><label for="rvRating">Rating</label><select id="rvRating"><option value="5">5 — excellent</option><option value="4">4 — good</option><option value="3">3 — okay</option><option value="2">2 — poor</option><option value="1">1 — bad</option></select></div></div>' +
      '<div class="form-group"><label for="rvText">Your review</label><textarea id="rvText" rows="3" maxlength="400" required placeholder="How was the produce, the pickup, the service?"></textarea></div>' +
      '<div id="rvMsg"></div><button type="submit" class="btn btn-primary">Publish review</button></form>';
    box.innerHTML = html;
    document.getElementById('reviewForm').addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('rvName').value.trim();
      var text = document.getElementById('rvText').value.trim();
      var rating = Number(document.getElementById('rvRating').value);
      if (!name || !text) { document.getElementById('rvMsg').innerHTML = '<div class="notice notice-error">Please add your name and a short review.</div>'; return; }
      var rev = getReviews();
      if (!rev[storeId]) rev[storeId] = [];
      rev[storeId].unshift({ name: name, rating: rating, text: text, date: new Date().toISOString() });
      saveReviews(rev);
      if (window.dataLayer) window.dataLayer.push({ event: 'review_submitted', store_id: storeId, rating: rating });
      renderReviews(storeId);
      document.getElementById('rvMsg').innerHTML = '<div class="notice notice-success">Thank you — your review is published above.</div>';
    });
  }

  function storeById(id) {
    var stores = getData().stores;
    for (var i = 0; i < stores.length; i++) if (stores[i].id === id) return stores[i];
    return null;
  }
  function productById(id) {
    var ps = getData().products;
    for (var i = 0; i < ps.length; i++) if (ps[i].id === Number(id)) return ps[i];
    return null;
  }

  function breadcrumbs(items) {
    var lis = items.map(function (it, idx) {
      var last = idx === items.length - 1;
      return '<li>' + (last ? '<span aria-current="page">' + esc(it.label) + '</span>' : '<a href="' + esc(it.href) + '">' + esc(it.label) + '</a>') + '</li>';
    }).join('');
    return '<nav class="breadcrumbs" aria-label="Breadcrumb"><ol>' + lis + '</ol></nav>';
  }

  /* Wire card clicks + qty buttons inside a container */
  function wireCards(root) {
    root.addEventListener('click', function (e) {
      var t = e.target;
      var add = t.closest('[data-add]');
      if (add) { e.stopPropagation(); addToCart(Number(add.getAttribute('data-add'))); rerender(root); return; }
      var inc = t.closest('[data-inc]');
      if (inc) { e.stopPropagation(); var id1 = Number(inc.getAttribute('data-inc')); bump(id1, 1); rerender(root); return; }
      var dec = t.closest('[data-dec]');
      if (dec) { e.stopPropagation(); var id2 = Number(dec.getAttribute('data-dec')); bump(id2, -1); rerender(root); return; }
      var nav = t.closest('[data-nav]');
      if (nav && !t.closest('[data-no-nav]')) window.location.href = nav.getAttribute('data-nav');
    });
  }
  function bump(id, d) {
    var cart = getCart(), q = 0;
    for (var i = 0; i < cart.length; i++) if (cart[i].id === id) q = cart[i].qty;
    setQty(id, q + d);
  }
  function rerender(root) {
    if (root.id === 'productGrid') renderMarketGrid();
    if (root.id === 'storeProducts') renderStoreProducts(currentStoreId);
    if (root.id === 'relatedProducts') renderRelated(currentProductId);
  }

  var currentStoreId = null, currentProductId = null;

  /* ---------- Page initialisers ---------- */
  function renderMarketGrid() {
    var grid = document.getElementById('productGrid');
    if (!grid) return;
    var q = (document.getElementById('searchInput') || {}).value || '';
    var cat = grid.getAttribute('data-category') || 'all';
    var data = getData();
    var list = data.products.filter(function (p) {
      var okCat = cat === 'all' || p.category === cat;
      var okQ = !q || p.name.toLowerCase().indexOf(q.toLowerCase()) > -1;
      return okCat && okQ;
    });
    grid.innerHTML = list.length ? list.map(function (p) { return productCard(p); }).join('')
      : '<div class="empty-state" style="grid-column:1/-1"><div class="empty-icon">' + ICON_SEARCH + '</div><h3>No produce found</h3><p>Try a different search or category.</p></div>';
  }

  function initMarketPage() {
    var grid = document.getElementById('productGrid');
    if (!grid) return;
    wireCards(grid);
    document.querySelectorAll('.chip').forEach(function (chip) {
      chip.addEventListener('click', function () {
        document.querySelectorAll('.chip').forEach(function (c) { c.classList.remove('active'); });
        chip.classList.add('active');
        grid.setAttribute('data-category', chip.getAttribute('data-cat'));
        renderMarketGrid();
      });
    });
    var si = document.getElementById('searchInput');
    if (si) si.addEventListener('input', renderMarketGrid);
    renderMarketGrid();
  }

  function renderStoreProducts(id) {
    var grid = document.getElementById('storeProducts');
    if (!grid) return;
    var data = getData();
    var list = data.products.filter(function (p) { return p.storeId === id; });
    grid.innerHTML = list.length ? list.map(function (p) { return productCard(p); }).join('')
      : '<div class="empty-state" style="grid-column:1/-1"><div class="empty-icon">📦</div><h3>No products listed yet</h3><p>This store has not listed produce yet.</p></div>';
  }

  function initStorePage() {
    var box = document.getElementById('storeDetail');
    if (!box) return;
    var id = new URLSearchParams(location.search).get('s');
    var s = storeById(id) || getData().stores[0];
    if (!s) return;
    var ph = document.getElementById('pageHeading');
    if (ph) ph.textContent = s.store;
    currentStoreId = s.id;
    document.title = s.store + ' — FarmLink Farmer Store';
    var md = document.querySelector('meta[name="description"]');
    if (md) md.setAttribute('content', s.store + ' by ' + s.farmer + ' in ' + s.location + ', Zimbabwe. Fresh produce with FarmLink delivery or checkpoint pickup.');
    box.innerHTML =
      '<div class="farmer-card" style="margin-bottom:18px"><img class="farmer-avatar" src="' + esc(s.img) + '" alt="' + esc(s.farmer + ' of ' + s.store + ', ' + s.location) + '">' +
      '<div class="farmer-info"><h2 class="detail-title" style="font-size:20px">' + esc(s.store) + '</h2>' +
      '<p>' + esc(s.farmer) + ' · ' + esc(s.location) + ' · ' + esc(s.distance) + ' from Harare</p>' +
      '<p><span class="verified">✓ Verified FarmLink farmer</span> · Farming since ' + s.since + '</p></div></div>' +
      '<div class="detail-section"><h2>About the farm</h2><p>' + esc(s.about) + '</p></div>' +
      '<h2 class="section-title" style="margin:16px 0 12px">Produce from this farm</h2>' +
      '<div class="product-grid" id="storeProducts"></div>';
    var grid = document.getElementById('storeProducts');
    wireCards(grid);
    renderStoreProducts(s.id);
    var revBox = document.createElement('div');
    revBox.id = 'reviewsBox';
    box.appendChild(revBox);
    renderReviews(s.id);
    var bc = document.getElementById('crumbs');
    if (bc) bc.innerHTML = breadcrumbs([{ label: 'Home', href: 'index.html' }, { label: 'Farmer stores', href: 'stores.html' }, { label: s.store }]);
  }

  function renderRelated(id) {
    var grid = document.getElementById('relatedProducts');
    if (!grid) return;
    var p = productById(id);
    if (!p) return;
    var list = getData().products.filter(function (x) { return x.id !== p.id && (x.category === p.category || x.storeId === p.storeId); }).slice(0, 4);
    grid.innerHTML = list.map(function (x) { return productCard(x); }).join('');
  }

  function initProductPage() {
    var box = document.getElementById('productDetail');
    if (!box) return;
    var id = new URLSearchParams(location.search).get('p');
    var p = productById(id) || getData().products[0];
    if (!p) return;
    currentProductId = p.id;
    var s = storeById(p.storeId);
    document.title = p.name + ' ($' + p.price + '/' + p.unit + ') — ' + s.store + ' | FarmLink';
    var ph = document.getElementById('pageHeading');
    if (ph) ph.textContent = p.name;
    var md = document.querySelector('meta[name="description"]');
    if (md) md.setAttribute('content', p.name + ' from ' + s.store + ', ' + s.location + '. ' + p.desc.slice(0, 110));
    box.innerHTML =
      '<div class="detail-grid"><div><img class="detail-img" src="' + esc(p.img) + '" alt="' + esc(p.alt) + '"></div>' +
      '<div><h2 class="detail-title">' + esc(p.name) + '</h2>' +
      '<div class="detail-farm"><a href="store.html?s=' + esc(s.id) + '">' + esc(s.store) + '</a> · ' + esc(s.location) + ' <span class="verified">✓ verified farmer</span></div>' +
      '<div class="detail-price-row"><div class="detail-price">' + fmt(p.price) + '<span class="unit">/' + esc(p.unit) + '</span></div><div style="font-size:14px;color:var(--muted)">' + p.stock + ' available</div></div>' +
      '<div class="detail-meta"><div class="meta-item"><div class="meta-value">⭐ ' + s.rating + '</div><div class="meta-label">' + s.reviews + ' reviews</div></div>' +
      '<div class="meta-item"><div class="meta-value">' + esc(s.distance) + '</div><div class="meta-label">from Harare</div></div>' +
      '<div class="meta-item"><div class="meta-value">' + esc(p.harvest) + '</div><div class="meta-label">harvested</div></div></div>' +
      '<div class="detail-section"><h2>About this product</h2><p>' + esc(p.desc) + '</p></div>' +
      '<div class="detail-section"><h2>Delivery options</h2><p>Choose a checkpoint pickup ($' + getData().site.checkpointFee + ' flat) or home delivery ($' + getData().site.homeFee + ' within 10km of Harare CBD) at checkout. FarmLink collects from the farm and handles all transport. Freshness guarantee: if your order arrives damaged or not as described, we replace it or refund the produce portion in full — reported within 24 hours of collection.</p></div>' +
      '<div id="detailBuy" style="display:flex;gap:12px;flex-wrap:wrap"></div></div></div>' +
      '<h2 class="section-title" style="margin:28px 0 12px">You may also like</h2>' +
      '<div class="product-grid" id="relatedProducts"></div>';
    var buy = document.getElementById('detailBuy');
    function paintBuy() {
      var cart = getCart(), qty = 0;
      for (var i = 0; i < cart.length; i++) if (cart[i].id === p.id) qty = cart[i].qty;
      buy.innerHTML = qty > 0
        ? '<div class="qty-control" style="flex:1;justify-content:center;padding:12px;background:var(--surface);border:1px solid var(--border);border-radius:var(--radius)"><button type="button" id="dDec" aria-label="Decrease">−</button><span style="font-size:16px">' + qty + ' in cart</span><button type="button" id="dInc" aria-label="Increase">+</button></div><a class="btn btn-dark" style="flex:1" href="cart.html">View cart</a>'
        : '<button type="button" class="btn btn-primary" style="flex:1" id="dAdd">Add to cart</button><a class="btn btn-dark" style="flex:1" href="market.html">Keep browsing</a>';
      var a = document.getElementById('dAdd');
      if (a) a.addEventListener('click', function () { addToCart(p.id); paintBuy(); });
      var inc = document.getElementById('dInc');
      if (inc) inc.addEventListener('click', function () { bump(p.id, 1); paintBuy(); });
      var dec = document.getElementById('dDec');
      if (dec) dec.addEventListener('click', function () { bump(p.id, -1); paintBuy(); });
    }
    paintBuy();
    var grid = document.getElementById('relatedProducts');
    wireCards(grid);
    renderRelated(p.id);
    var bc = document.getElementById('crumbs');
    if (bc) bc.innerHTML = breadcrumbs([{ label: 'Home', href: 'index.html' }, { label: 'Market', href: 'market.html' }, { label: p.name }]);
  }

  function initHomePage() {
    var feat = document.getElementById('featuredProducts');
    if (feat) {
      wireCards(feat);
      feat.innerHTML = getData().products.slice(0, 4).map(function (p) { return productCard(p); }).join('');
    }
    var stores = document.getElementById('featuredStores');
    if (stores) {
      stores.addEventListener('click', function (e) {
        var nav = e.target.closest('[data-nav]');
        if (nav) window.location.href = nav.getAttribute('data-nav');
      });
      stores.innerHTML = getData().stores.slice(0, 3).map(storeCard).join('');
    }
  }

  function initStoresPage() {
    var grid = document.getElementById('storeGrid');
    if (!grid) return;
    grid.addEventListener('click', function (e) {
      var nav = e.target.closest('[data-nav]');
      if (nav) window.location.href = nav.getAttribute('data-nav');
    });
    var data = getData();
    var all = data.stores.concat(data.pendingStores.map(function (p) {
      return { id: p.id, store: p.store, farmer: p.farmer, location: p.location, distance: p.distance, since: new Date().getFullYear(), rating: 'New', reviews: 0, verified: false, img: 'assets/img/farmer.jpg', about: p.about, pending: true };
    }));
    grid.innerHTML = all.map(function (s) {
      return (s.pending ? '<span class="new-badge">Pending verification</span>' : '') + storeCard(s);
    }).join('');
  }

  function initCartPage() {
    var box = document.getElementById('cartContent');
    if (!box) return;
    var items = detailedCart();
    if (!items.length) {
      box.innerHTML = '<div class="empty-state"><div class="empty-icon">' + ICON_CART + '</div><h3>Your cart is empty</h3><p>Browse fresh produce from verified Zimbabwean farmers.</p><a class="btn btn-primary" style="margin-top:16px;display:inline-block" href="market.html">Start shopping</a></div>';
      return;
    }
    var t = orderTotals(items, 'checkpoint');
    box.innerHTML = items.map(function (i) {
      return '<div class="cart-item"><img class="cart-item-img" src="' + esc(i.product.img) + '" alt="' + esc(i.product.alt) + '">' +
        '<div class="cart-item-info"><div class="cart-item-title">' + esc(i.product.name) + '</div>' +
        '<div class="cart-item-farm">' + esc(storeById(i.product.storeId).store) + ' · ' + esc(i.product.unit) + '</div>' +
        '<div class="cart-item-price">' + fmt(i.product.price * i.qty) + '</div>' +
        '<div class="cart-item-actions"><div class="qty-control"><button type="button" data-dec="' + i.product.id + '">−</button><span>' + i.qty + '</span><button type="button" data-inc="' + i.product.id + '">+</button></div>' +
        '<button type="button" class="remove-btn" data-rm="' + i.product.id + '">Remove</button></div></div></div>';
    }).join('') +
      '<div class="cart-summary"><div class="summary-row"><span>Produce subtotal</span><span>' + fmt(t.subtotal) + '</span></div>' +
      '<div class="summary-row"><span>Delivery (from $' + getData().site.checkpointFee + ')</span><span>Calculated at checkout</span></div>' +
      '<div class="summary-row"><span>FarmLink service fee (10%)</span><span>' + fmt(t.commission) + '</span></div>' +
      '<div class="summary-row total"><span>Estimated total</span><span>' + fmt(t.total) + '</span></div>' +
      '<p class="summary-note">FarmLink collects payment, deducts a 10% service fee on produce, and pays farmers their share after delivery is confirmed — like Amazon or eBay. Delivery fee goes to the transporter.</p></div>' +
      '<a class="btn btn-primary btn-block" style="margin-top:16px" href="checkout.html">Proceed to checkout</a>';
    box.addEventListener('click', function (e) {
      var inc = e.target.closest('[data-inc]');
      var dec = e.target.closest('[data-dec]');
      var rm = e.target.closest('[data-rm]');
      if (inc) bump(Number(inc.getAttribute('data-inc')), 1);
      else if (dec) bump(Number(dec.getAttribute('data-dec')), -1);
      else if (rm) setQty(Number(rm.getAttribute('data-rm')), 0);
      else return;
      initCartPage();
    }, { once: true });
  }

  function initCheckoutPage() {
    var box = document.getElementById('checkoutContent');
    if (!box) return;
    var items = detailedCart();
    if (!items.length) { window.location.href = 'cart.html'; return; }
    var data = getData();
    var method = 'checkpoint';
    var payment = 'EcoCash';

    function paint() {
      var t = orderTotals(items, method);
      box.innerHTML =
        '<form id="checkoutForm" novalidate>' + '<div id="coErrors"></div>' +
        '<fieldset><legend>Your details</legend>' +
        '<div class="form-row"><div class="form-group"><label for="coName">Full name</label><input id="coName" name="name" type="text" autocomplete="name" required placeholder="e.g. Sarah Kambuzuma"></div>' +
        '<div class="form-group"><label for="coPhone">Phone (for EcoCash / OneMoney)</label><input id="coPhone" name="phone" type="tel" autocomplete="tel" required placeholder="0773 123 456"></div></div></fieldset>' +
        '<fieldset><legend>How do you want your produce?</legend><div class="option-cards" id="methodCards">' +
        data.checkpoints.map(function (c, i) {
          return '<div class="pickup-option' + (method === 'checkpoint' && i === 0 ? ' selected' : '') + '" data-method="checkpoint" data-cp="' + c.id + '"><span class="fee">' + fmt(data.site.checkpointFee) + ' flat</span><h4>Checkpoint pickup — ' + esc(c.name) + '</h4><p>' + esc(c.detail) + '</p></div>';
        }).join('') +
        '<div class="pickup-option' + (method === 'home' ? ' selected' : '') + '" data-method="home"><span class="fee">' + fmt(data.site.homeFee) + '</span><h4>Home delivery</h4><p>Within 10km of Harare CBD · Same day if ordered before 10am</p></div>' +
        '</div><p class="summary-note">FarmLink transports produce from the farm to your checkpoint or door — farmers never pay for delivery.</p></fieldset>' +
        '<fieldset><legend>Payment method</legend><div class="option-cards" id="payCards">' +
        ['EcoCash', 'OneMoney', 'Bank transfer'].map(function (m) {
          return '<div class="pickup-option' + (m === payment ? ' selected' : '') + '" data-pay="' + m + '"><h4>' + m + '</h4><p>' + (m === 'Bank transfer' ? 'FBC, Steward, CBZ' : 'Pay securely from your mobile wallet') + '</p></div>';
        }).join('') + '</div></fieldset>' +
        '<fieldset><legend>Order summary</legend>' +
        items.map(function (i) { return '<div class="summary-row"><span>' + esc(i.product.name) + ' × ' + i.qty + '</span><span>' + fmt(i.product.price * i.qty) + '</span></div>'; }).join('') +
        '<div class="summary-row"><span>Produce subtotal</span><span>' + fmt(t.subtotal) + '</span></div>' +
        '<div class="summary-row"><span>Delivery (' + (method === 'home' ? 'home' : 'checkpoint') + ')</span><span>' + fmt(t.delivery) + '</span></div>' +
        '<div class="summary-row"><span>FarmLink service fee (10% of produce)</span><span>' + fmt(t.commission) + '</span></div>' +
        '<div class="summary-row total"><span>Total to pay</span><span>' + fmt(t.total) + '</span></div>' +
        '<div class="fee-breakdown">Payment split: farmer receives <strong>' + fmt(t.farmerPayout) + '</strong> · FarmLink service fee <strong>' + fmt(t.commission) + '</strong> · transporter <strong>' + fmt(t.delivery) + '</strong>.</div>' +
        '<p class="summary-note">Money is held by FarmLink and released to the farmer once you confirm delivery — the same escrow model Amazon and eBay use.</p></fieldset>' +
        '<button type="submit" class="btn btn-primary btn-block" id="payBtn">Pay ' + fmt(t.total) + ' with ' + payment + '</button></form>';
      box.querySelectorAll('[data-method]').forEach(function (el) {
        el.addEventListener('click', function () {
          method = el.getAttribute('data-method');
          box.querySelectorAll('[data-method]').forEach(function (x) { x.classList.remove('selected'); });
          el.classList.add('selected');
          paint();
        });
      });
      box.querySelectorAll('[data-pay]').forEach(function (el) {
        el.addEventListener('click', function () {
          payment = el.getAttribute('data-pay');
          box.querySelectorAll('[data-pay]').forEach(function (x) { x.classList.remove('selected'); });
          el.classList.add('selected');
          document.getElementById('payBtn').textContent = 'Pay ' + fmt(orderTotals(items, method).total) + ' with ' + payment;
        });
      });
      document.getElementById('checkoutForm').addEventListener('submit', function (e) {
        e.preventDefault();
        var name = document.getElementById('coName').value.trim();
        var phone = document.getElementById('coPhone').value.trim();
        if (!name || !phone) { alert('Please enter your name and phone number.'); return; }
        var selCp = box.querySelector('[data-method].selected');
        var cpId = selCp ? selCp.getAttribute('data-cp') : null;
        var order = placeOrder({ name: name, phone: phone, method: method, checkpoint: cpId, payment: payment });
        if (order) { sessionStorage.setItem('farmlink_last_order', order.id); window.location.href = 'confirmation.html?o=' + order.id; }
      });
    }
    paint();
  }

  function initConfirmationPage() {
    var box = document.getElementById('confirmationContent');
    if (!box) return;
    var id = new URLSearchParams(location.search).get('o');
    var data = getData();
    var order = null;
    for (var i = 0; i < data.orders.length; i++) if (data.orders[i].id === id) order = data.orders[i];
    if (!order) { var phn = document.getElementById('pageHeading'); if (phn) phn.textContent = 'Order not found'; box.innerHTML = '<div class="empty-state"><div class="empty-icon">' + ICON_BOX + '</div><h3>Order not found</h3><p><a href="market.html">Browse the market</a></p></div>'; return; }
    var cp = null;
    if (order.checkpoint) for (var j = 0; j < data.checkpoints.length; j++) if (data.checkpoints[j].id === order.checkpoint) cp = data.checkpoints[j];
    document.title = 'Order ' + order.id + ' confirmed — FarmLink';
    box.innerHTML = '<div class="confirmation-box"><div class="checkmark">✓</div>' +
      '<h2 class="detail-title" style="font-size:22px">Order placed!</h2>' +
      '<p>Your payment is being processed by FarmLink. We will notify you when your produce is ready.</p>' +
      '<div class="order-id-box">' + esc(order.id) + '</div> <button type="button" class="mini-btn" data-copy="' + esc(order.id) + '" style="margin-bottom:20px">Copy order number</button>' +
      '<div style="text-align:left;max-width:420px;margin:0 auto 16px">' +
      order.items.map(function (it) { return '<div class="summary-row"><span>' + esc(it.name) + ' × ' + it.qty + '</span><span>' + fmt(it.price * it.qty) + '</span></div>'; }).join('') +
      '<div class="summary-row"><span>Delivery (' + (order.method === 'home' ? 'home delivery' : 'checkpoint pickup') + ')</span><span>' + fmt(order.delivery) + '</span></div>' +
      '<div class="summary-row"><span>FarmLink service fee (10%)</span><span>' + fmt(order.commission) + '</span></div>' +
      '<div class="summary-row total"><span>Paid</span><span>' + fmt(order.total) + '</span></div>' +
      '<div class="fee-breakdown">Held in escrow: <strong>' + fmt(order.farmerPayout) + '</strong> goes to the farmer after you confirm delivery.</div></div>' +
      '<div style="text-align:left;max-width:420px;margin:0 auto 20px"><h2 class="section-title" style="font-size:15px">What happens next</h2>' +
      '<ol style="font-size:13px;color:var(--secondary);line-height:1.7;padding-left:20px"><li>The farmer confirms and packs your order — within 24 hours of payment.</li>' +
      '<li>A FarmLink transporter collects from the farm.</li>' +
      '<li>' + (order.method === 'home' ? 'Your order is delivered to your door — next business day for orders placed before 10am.' : 'Your order arrives at your checkpoint — next business day, ready in your collection window.') + '</li>' +
      '<li>You confirm delivery, and the farmer is paid within 48 hours.</li></ol>' +
      '<p style="font-size:13px;color:var(--muted);margin-top:8px">Questions about this order? Call +263 773 123 456 (Mon–Sat, 8am–5pm) — we respond within 4 business hours.</p></div>' +
      (cp ? '<p style="font-size:14px;color:var(--secondary);margin-bottom:16px">Pickup: <strong>' + esc(cp.name) + '</strong><br>' + esc(cp.detail) + '</p>' : '<p style="font-size:14px;color:var(--secondary);margin-bottom:16px">Your order will be delivered to your door.</p>') +
      '<div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap"><a class="btn btn-primary" href="orders.html">Track my order</a><a class="btn btn-dark" href="market.html">Browse more</a></div></div>';
  }

  function initOrdersPage() {
    var box = document.getElementById('ordersContent');
    if (!box) return;
    var orders = getData().orders;
    if (!orders.length) {
      box.innerHTML = '<div class="empty-state"><div class="empty-icon">📦</div><h3>No orders yet</h3><p>Your orders will appear here after checkout.</p><a class="btn btn-primary" style="margin-top:16px;display:inline-block" href="market.html">Start shopping</a></div>';
      return;
    }
    var statusLabel = { processing: 'Processing', transit: 'In transit', delivered: 'Delivered' };
    box.innerHTML = orders.map(function (o) {
      return '<div class="order-card"><div class="order-left"><div class="order-code">' + esc(o.id) + '</div>' +
        '<div class="order-meta">' + esc(o.items.map(function (i) { return i.qty + '× ' + i.name; }).join(', ')) + '<br>Total: ' + fmt(o.total) + ' · ' + esc(o.payment) + '</div></div>' +
        '<div class="order-right"><div class="order-status status-' + esc(o.status) + '">' + statusLabel[o.status] + '</div>' +
        '<div style="font-size:12px;color:var(--muted);margin-top:4px">' + new Date(o.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) + '</div></div></div>';
    }).join('');
  }

  function initSignupPage() {
    var form = document.getElementById('signupForm');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = getData();
      var store = {
        id: 'pending-' + Date.now(),
        store: document.getElementById('suStore').value.trim(),
        farmer: document.getElementById('suFarmer').value.trim(),
        phone: document.getElementById('suPhone').value.trim(),
        location: document.getElementById('suLocation').value.trim(),
        distance: document.getElementById('suDistance').value.trim(),
        about: document.getElementById('suAbout').value.trim(),
        products: document.getElementById('suProducts').value.trim(),
        date: new Date().toISOString()
      };
      if (!store.store || !store.farmer || !store.phone || !store.location) {
        document.getElementById('signupMsg').innerHTML = '<div class="notice notice-error">Please fill in farm name, your name, phone and location.</div>';
        return;
      }
      data.pendingStores.unshift(store);
      saveData(data);
      form.reset();
      document.getElementById('signupMsg').innerHTML = '<div class="notice notice-success"><strong>Application received!</strong> The FarmLink team will verify your farm and call you within 2 working days. Once approved, your store goes live and our transporters start collecting from you.</div>';
      if (window.dataLayer) window.dataLayer.push({ event: 'generate_lead', lead_type: 'farmer_application' });
      window.scrollTo(0, 0);
    });
  }

  function initAdminPage() {
    var loginForm = document.getElementById('loginForm');
    var dash = document.getElementById('adminDash');
    if (!loginForm || !dash) return;
    function showDash() {
      loginForm.style.display = 'none';
      dash.style.display = 'block';
      paintStats(); paintProducts(); paintStores(); paintOrders(); paintSettings();
    }
    if (isAdmin()) showDash();
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (login(document.getElementById('adEmail').value.trim(), document.getElementById('adPass').value)) showDash();
      else document.getElementById('loginMsg').innerHTML = '<div class="notice notice-error">Incorrect email or password.</div>';
    });
    document.getElementById('logoutBtn').addEventListener('click', function () { logout(); location.reload(); });
    document.getElementById('resetBtn').addEventListener('click', function () { if (confirm('Reset all site data to defaults? This cannot be undone.')) { resetData(); location.reload(); } });
    document.querySelectorAll('.admin-tab').forEach(function (tab) {
      tab.addEventListener('click', function () {
        document.querySelectorAll('.admin-tab').forEach(function (t) { t.classList.remove('active'); });
        document.querySelectorAll('.admin-panel').forEach(function (p) { p.classList.remove('active'); });
        tab.classList.add('active');
        document.getElementById(tab.getAttribute('data-panel')).classList.add('active');
      });
    });

    function paintStats() {
      var d = getData();
      var revenue = d.orders.reduce(function (s, o) { return s + o.commission; }, 0);
      var gmv = d.orders.reduce(function (s, o) { return s + o.total; }, 0);
      document.getElementById('statGrid').innerHTML =
        '<div class="stat-card"><div class="num">' + d.products.length + '</div><div class="lbl">Live products</div></div>' +
        '<div class="stat-card"><div class="num">' + d.stores.length + '</div><div class="lbl">Verified stores</div></div>' +
        '<div class="stat-card"><div class="num">' + d.orders.length + '</div><div class="lbl">Orders</div></div>' +
        '<div class="stat-card"><div class="num">' + fmt(revenue) + '</div><div class="lbl">Fees earned (' + fmt(gmv) + ' GMV)</div></div>';
    }

    function paintProducts() {
      var d = getData();
      var rows = d.products.map(function (p) {
        var s = storeById(p.storeId);
        return '<tr><td><img src="' + esc(p.img) + '" alt=""></td><td>' + esc(p.name) + '</td><td>' + esc(s ? s.store : '—') + '</td>' +
          '<td>' + fmt(p.price) + '/' + esc(p.unit) + '</td><td>' + p.stock + '</td>' +
          '<td><button type="button" class="mini-btn" data-edit-p="' + p.id + '">Edit</button><button type="button" class="mini-btn danger" data-del-p="' + p.id + '">Delete</button></td></tr>';
      }).join('');
      document.getElementById('productRows').innerHTML = rows || '<tr><td colspan="6">No products yet.</td></tr>';
      bindProductForms();
    }

    function bindProductForms() {
      document.querySelectorAll('[data-del-p]').forEach(function (b) {
        b.addEventListener('click', function () {
          if (!confirm('Delete this product?')) return;
          var d = getData();
          d.products = d.products.filter(function (p) { return p.id !== Number(b.getAttribute('data-del-p')); });
          saveData(d); paintProducts(); paintStats();
        });
      });
      document.querySelectorAll('[data-edit-p]').forEach(function (b) {
        b.addEventListener('click', function () {
          var p = productById(b.getAttribute('data-edit-p'));
          if (!p) return;
          document.getElementById('pfId').value = p.id;
          document.getElementById('pfName').value = p.name;
          document.getElementById('pfPrice').value = p.price;
          document.getElementById('pfUnit').value = p.unit;
          document.getElementById('pfStock').value = p.stock;
          document.getElementById('pfHarvest').value = p.harvest;
          document.getElementById('pfAlt').value = p.alt;
          document.getElementById('pfDesc').value = p.desc;
          var sel = document.getElementById('pfStore');
          for (var i = 0; i < sel.options.length; i++) if (sel.options[i].value === p.storeId) sel.selectedIndex = i;
          document.getElementById('productFormTitle').textContent = 'Edit product #' + p.id;
          window.scrollTo(0, 0);
        });
      });
    }

    var pf = document.getElementById('productForm');
    if (pf) pf.addEventListener('submit', function (e) {
      e.preventDefault();
      var d = getData();
      var id = document.getElementById('pfId').value;
      var obj = {
        storeId: document.getElementById('pfStore').value,
        name: document.getElementById('pfName').value.trim(),
        price: Number(document.getElementById('pfPrice').value),
        unit: document.getElementById('pfUnit').value.trim(),
        stock: Number(document.getElementById('pfStock').value),
        harvest: document.getElementById('pfHarvest').value.trim(),
        alt: document.getElementById('pfAlt').value.trim(),
        desc: document.getElementById('pfDesc').value.trim()
      };
      if (!obj.name || !(obj.price > 0)) { alert('Name and price are required.'); return; }
      if (id) {
        for (var i = 0; i < d.products.length; i++) if (d.products[i].id === Number(id)) {
          obj.id = d.products[i].id; obj.img = d.products[i].img; obj.category = d.products[i].category;
          d.products[i] = obj;
        }
      } else {
        var maxId = d.products.reduce(function (m, p) { return Math.max(m, p.id); }, 0);
        obj.id = maxId + 1; obj.category = 'vegetables';
        obj.img = 'assets/img/products/tomatoes.jpg';
        d.products.push(obj);
      }
      saveData(d);
      pf.reset(); document.getElementById('pfId').value = '';
      document.getElementById('productFormTitle').textContent = 'Add new product';
      paintProducts(); paintStats();
    });

    function paintStores() {
      var d = getData();
      var verified = d.stores.map(function (s) {
        return '<tr><td><img src="' + esc(s.img) + '" alt=""></td><td>' + esc(s.store) + '</td><td>' + esc(s.farmer) + '</td><td>' + esc(s.location) + '</td>' +
          '<td>⭐ ' + s.rating + '</td><td><button type="button" class="mini-btn danger" data-del-s="' + esc(s.id) + '">Remove</button></td></tr>';
      }).join('');
      var pending = d.pendingStores.map(function (s, i) {
        return '<tr><td>' + esc(s.store) + '</td><td>' + esc(s.farmer) + '</td><td>' + esc(s.location) + '</td><td>' + esc(s.phone) + '</td>' +
          '<td><button type="button" class="mini-btn" data-approve="' + i + '">Approve &amp; publish</button><button type="button" class="mini-btn danger" data-reject="' + i + '">Reject</button></td></tr>';
      }).join('');
      document.getElementById('storeRows').innerHTML = verified || '<tr><td colspan="6">No stores yet.</td></tr>';
      document.getElementById('pendingRows').innerHTML = pending || '<tr><td colspan="5">No pending applications.</td></tr>';
      document.querySelectorAll('[data-del-s]').forEach(function (b) {
        b.addEventListener('click', function () {
          if (!confirm('Remove this store? Its products stay listed.')) return;
          var dd = getData();
          dd.stores = dd.stores.filter(function (s) { return s.id !== b.getAttribute('data-del-s'); });
          saveData(dd); paintStores(); paintStats();
        });
      });
      document.querySelectorAll('[data-approve]').forEach(function (b) {
        b.addEventListener('click', function () {
          var dd = getData();
          var idx = Number(b.getAttribute('data-approve'));
          var p = dd.pendingStores.splice(idx, 1)[0];
          dd.stores.push({ id: p.id, store: p.store, farmer: p.farmer, location: p.location, distance: p.distance || '—', since: new Date().getFullYear(), rating: 5.0, reviews: 0, verified: true, img: 'assets/img/farmer.jpg', about: p.about || '' });
          saveData(dd); paintStores(); paintStats();
        });
      });
      document.querySelectorAll('[data-reject]').forEach(function (b) {
        b.addEventListener('click', function () {
          var dd = getData();
          dd.pendingStores.splice(Number(b.getAttribute('data-reject')), 1);
          saveData(dd); paintStores();
        });
      });
    }

    function paintOrders() {
      var d = getData();
      var rows = d.orders.map(function (o) {
        return '<tr><td>' + esc(o.id) + '</td><td>' + esc(o.customer) + '</td><td>' + fmt(o.total) + '</td><td>' + fmt(o.farmerPayout) + ' to farmer</td>' +
          '<td>' + esc(o.method === 'home' ? 'Home delivery' : 'Checkpoint') + '</td>' +
          '<td><select data-status="' + esc(o.id) + '">' + ['processing', 'transit', 'delivered'].map(function (st) { return '<option value="' + st + '"' + (st === o.status ? ' selected' : '') + '>' + st + '</option>'; }).join('') + '</select></td></tr>';
      }).join('');
      document.getElementById('orderRows').innerHTML = rows || '<tr><td colspan="6">No orders yet.</td></tr>';
      document.querySelectorAll('[data-status]').forEach(function (sel) {
        sel.addEventListener('change', function () {
          var dd = getData();
          for (var i = 0; i < dd.orders.length; i++) if (dd.orders[i].id === sel.getAttribute('data-status')) dd.orders[i].status = sel.value;
          saveData(dd); paintStats();
        });
      });
    }

    function paintSettings() {
      var d = getData();
      document.getElementById('setCheckpoint').value = d.site.checkpointFee;
      document.getElementById('setHome').value = d.site.homeFee;
      document.getElementById('setCommission').value = Math.round(d.site.commission * 100);
      document.getElementById('setPhone').value = d.site.phone;
      document.getElementById('setEmail').value = d.site.email;
    }
    var sf = document.getElementById('settingsForm');
    if (sf) sf.addEventListener('submit', function (e) {
      e.preventDefault();
      var d = getData();
      d.site.checkpointFee = Number(document.getElementById('setCheckpoint').value);
      d.site.homeFee = Number(document.getElementById('setHome').value);
      d.site.commission = Number(document.getElementById('setCommission').value) / 100;
      d.site.phone = document.getElementById('setPhone').value.trim();
      d.site.email = document.getElementById('setEmail').value.trim();
      saveData(d);
      document.getElementById('settingsMsg').innerHTML = '<div class="notice notice-success">Settings saved.</div>';
    });
  }

  /* ---------- Boot ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    refreshBadges();
    initHomePage();
    initMarketPage();
    initStoresPage();
    initStorePage();
    initProductPage();
    initCartPage();
    initCheckoutPage();
    initConfirmationPage();
    initOrdersPage();
    initSignupPage();
    initAdminPage();
  });

  window.FarmLink = {
    getData: getData, saveData: saveData, resetData: resetData,
    addToCart: addToCart, setQty: setQty, cartCount: cartCount,
    login: login, logout: logout, isAdmin: isAdmin
  };
})();
