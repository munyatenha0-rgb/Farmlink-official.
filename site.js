/* FarmLink site chrome: theme, menus, scroll UI, cookie notice, UTM, modal, copy */
(function () {
  'use strict';

  function $(s, c) { return (c || document).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }

  /* ---------- Dark mode toggle (1) ---------- */
  var root = document.documentElement;
  try {
    var savedTheme = localStorage.getItem('fl_theme');
    if (savedTheme === 'dark') root.setAttribute('data-theme', 'dark');
  } catch (e) { /* private mode */ }

  function iconSun() {
    return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
  }
  function iconMoon() {
    return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';
  }
  function paintToggle(btn) {
    var dark = root.getAttribute('data-theme') === 'dark';
    btn.innerHTML = dark ? iconSun() : iconMoon();
    btn.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
  }
  function initTheme() {
    var actions = $('.header-actions');
    if (!actions) return;
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'admin-link theme-toggle';
    paintToggle(btn);
    btn.addEventListener('click', function () {
      var dark = root.getAttribute('data-theme') === 'dark';
      if (dark) root.removeAttribute('data-theme'); else root.setAttribute('data-theme', 'dark');
      try { localStorage.setItem('fl_theme', dark ? 'light' : 'dark'); } catch (e) { /* ignore */ }
      $$('.theme-toggle').forEach(paintToggle);
    });
    actions.insertBefore(btn, actions.firstChild);
  }

  /* ---------- Mobile menu (5) ---------- */
  function initMenu() {
    var inner = $('.header-inner');
    var header = $('.app-header');
    if (!inner || !header) return;
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'menu-btn';
    btn.setAttribute('aria-label', 'Open menu');
    btn.setAttribute('aria-expanded', 'false');
    btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18"/></svg>';
    var nav = document.createElement('nav');
    nav.className = 'mobile-nav';
    nav.setAttribute('aria-label', 'Mobile navigation');
    nav.innerHTML = '<a href="index.html">Home</a><a href="market.html">Market</a><a href="stores.html">Farmer stores</a><a href="farmer-signup.html">Sell on FarmLink</a><a href="cart.html">Cart</a><a href="orders.html">My orders</a>';
    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
    });
    header.parentNode.insertBefore(nav, header.nextSibling);
    inner.insertBefore(btn, inner.children[1] || null);
  }

  /* ---------- Scroll progress (8) + back-to-top (4) ---------- */
  function initScroll() {
    var bar = $('#progressBar');
    var top = document.createElement('button');
    top.type = 'button';
    top.className = 'chrome-btn';
    top.id = 'backTop';
    top.setAttribute('aria-label', 'Back to top');
    top.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
    top.style.display = 'none';
    document.body.appendChild(top);
    top.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var h = document.documentElement;
        var max = h.scrollHeight - h.clientHeight;
        if (bar) bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + '%';
        top.style.display = h.scrollTop > 600 ? 'flex' : 'none';
        ticking = false;
      });
    }, { passive: true });
  }

  /* ---------- Floating contact (20) ---------- */
  function initContact() {
    var a = document.createElement('a');
    a.className = 'chrome-btn';
    a.id = 'floatContact';
    a.href = 'contact.html';
    a.setAttribute('aria-label', 'Contact FarmLink inquiry form');
    a.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>';
    document.body.appendChild(a);
  }

  /* ---------- Cookie banner (2) ---------- */
  function initCookie() {
    try { if (localStorage.getItem('fl_cookie_ok')) return; } catch (e) { /* proceed */ }
    var b = document.createElement('div');
    b.className = 'cookie-banner';
    b.setAttribute('role', 'dialog');
    b.setAttribute('aria-label', 'Cookie notice');
    b.innerHTML = '<p>FarmLink stores preferences such as dark mode and your cart in your browser. We do not use tracking cookies. Details are in our <a href="privacy.html">privacy policy</a>.</p>' +
      '<div class="actions"><button type="button" class="btn btn-primary" style="padding:8px 16px;font-size:13px">Got it</button></div>';
    document.body.appendChild(b);
    b.style.display = 'block';
    b.querySelector('button').addEventListener('click', function () {
      try { localStorage.setItem('fl_cookie_ok', '1'); } catch (e) { /* ignore */ }
      b.remove();
    });
  }

  /* ---------- Last updated date (18) ---------- */
  function initUpdated() {
    $$('.footer-bottom').forEach(function (f) {
      if (f.getAttribute('data-updated')) return;
      f.setAttribute('data-updated', '1');
      var s = document.createElement('span');
      s.textContent = ' · Last updated: 12 September 2026';
      f.appendChild(s);
    });
  }

  /* ---------- UTM tracking (14) ---------- */
  window.FarmLinkUTM = function () {
    try { return JSON.parse(localStorage.getItem('fl_utm')); } catch (e) { return null; }
  };
  function initUTM() {
    var q;
    try { q = new URLSearchParams(location.search); } catch (e) { return; }
    var o = {}, has = false;
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(function (k) {
      var v = q.get(k);
      if (v) { o[k] = v.slice(0, 120); has = true; }
    });
    if (has) {
      try { if (!localStorage.getItem('fl_utm')) localStorage.setItem('fl_utm', JSON.stringify(o)); } catch (e) { /* ignore */ }
    }
  }

  /* ---------- Confirmation modal (17) ---------- */
  window.FarmLinkConfirm = function (title, bodyHtml, onOk) {
    var ov = document.createElement('div');
    ov.className = 'modal-overlay';
    ov.innerHTML = '<div class="modal" role="alertdialog" aria-modal="true" aria-labelledby="mTitle">' +
      '<h2 id="mTitle"></h2><div class="modal-body"></div>' +
      '<div class="modal-actions"><button type="button" class="btn btn-dark" data-mx>Cancel</button>' +
      '<button type="button" class="btn btn-primary" data-mok>Confirm and pay</button></div></div>';
    ov.querySelector('#mTitle').textContent = title;
    ov.querySelector('.modal-body').innerHTML = bodyHtml;
    document.body.appendChild(ov);
    requestAnimationFrame(function () { ov.classList.add('open'); });
    function close() { ov.classList.remove('open'); setTimeout(function () { ov.remove(); }, 150); }
    ov.querySelector('[data-mx]').addEventListener('click', close);
    ov.addEventListener('click', function (e) { if (e.target === ov) close(); });
    ov.querySelector('[data-mok]').addEventListener('click', function () { close(); onOk(); });
  };

  /* ---------- Copy buttons (9) ---------- */
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-copy]');
    if (!b) return;
    var txt = b.getAttribute('data-copy');
    function done() {
      var old = b.textContent;
      b.textContent = 'Copied';
      setTimeout(function () { b.textContent = old; }, 1500);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(txt).then(done, done);
    } else {
      var i = document.createElement('input');
      i.value = txt;
      document.body.appendChild(i);
      i.select();
      try { document.execCommand('copy'); } catch (err) { /* ignore */ }
      i.remove();
      done();
    }
  });

  /* ---------- Image load fade (6) ---------- */
  document.addEventListener('load', function (e) {
    var t = e.target;
    if (t && t.tagName === 'IMG' && t.parentElement && t.parentElement.classList.contains('img-wrap')) {
      t.parentElement.classList.add('loaded');
    }
  }, true);

  /* ---------- Lead conversion tracking + inquiry form ---------- */
  window.dataLayer = window.dataLayer || [];
  function leadEvent(type, extra) {
    var payload = { event: 'generate_lead', lead_type: type };
    if (window.FarmLinkUTM) { var u = window.FarmLinkUTM(); if (u) payload.utm = u; }
    if (extra) { for (var k in extra) payload[k] = extra[k]; }
    window.dataLayer.push(payload);
  }
  function initInquiry() {
    var form = $('#inquiryForm');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var msg = $('#inqMsg');
      var name = $('#inqName').value.trim();
      var phone = $('#inqPhone').value.trim();
      var topic = $('#inqTopic').value;
      var text = $('#inqMessage').value.trim();
      var errs = [];
      if (!name) errs.push('Please enter your name.');
      if (!phone) errs.push('Please enter your phone number.');
      if (!text) errs.push('Please tell us how we can help.');
      if (errs.length) {
        msg.innerHTML = '<div class="notice notice-error">' + errs.join('<br>') + '</div>';
        return;
      }
      try {
        var box = JSON.parse(localStorage.getItem('fl_inquiries') || '[]');
        box.push({ name: name, phone: phone, topic: topic, message: text, date: new Date().toISOString() });
        localStorage.setItem('fl_inquiries', JSON.stringify(box));
      } catch (err) { /* storage unavailable */ }
      leadEvent('inquiry', { topic: topic });
      window.location.href = 'thank-you.html';
    });
  }

  /* ---------- Password visibility toggle (13) ---------- */
  function initPwToggle() {
    var b = $('#pwToggle');
    var i = $('#adPass');
    if (!b || !i) return;
    b.addEventListener('click', function () {
      var show = i.type === 'password';
      i.type = show ? 'text' : 'password';
      b.textContent = show ? 'Hide' : 'Show';
      b.setAttribute('aria-pressed', String(show));
    });
  }

  function boot() {
    initTheme();
    initMenu();
    initScroll();
    initContact();
    initCookie();
    initUpdated();
    initUTM();
    initPwToggle();
    initInquiry();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
