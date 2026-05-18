/* PrivTools — shared.js
   Theme toggle, support modal, toast notifications, scroll reveal */

(function () {
  'use strict';

  /* ── Theme ──────────────────────────────────────────────────── */
  const THEME_KEY = 'pt-theme';

  function getPreferred() {
    try { const s = localStorage.getItem(THEME_KEY); if (s) return s; } catch(_) {}
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme, save) {
    document.documentElement.setAttribute('data-theme', theme);
    if (save) { try { localStorage.setItem(THEME_KEY, theme); } catch(_) {} }
    const btn = document.getElementById('theme-toggle');
    if (btn) {
      btn.innerHTML = theme === 'dark'
        ? '<span aria-hidden="true">☀️</span><span>Light</span>'
        : '<span aria-hidden="true">🌙</span><span>Dark</span>';
    }
    window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
  }

  function initTheme() {
    applyTheme(getPreferred(), false);

    document.addEventListener('click', function (e) {
      if (e.target.closest('#theme-toggle')) {
        const cur = document.documentElement.getAttribute('data-theme') || 'light';
        applyTheme(cur === 'dark' ? 'light' : 'dark', true);
      }
    });

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
      let saved = null;
      try { saved = localStorage.getItem(THEME_KEY); } catch(_) {}
      if (!saved) applyTheme(e.matches ? 'dark' : 'light', false);
    });
  }

  /* ── Toast notifications ─────────────────────────────────── */
  function ensureContainer() {
    let c = document.getElementById('toast-container');
    if (!c) {
      c = document.createElement('div');
      c.id = 'toast-container';
      document.body.appendChild(c);
    }
    return c;
  }

  window.showToast = function (msg, type) {
    type = type || 'success';
    const c = ensureContainer();
    const t = document.createElement('div');
    t.className = 'toast ' + type;
    t.textContent = msg;
    c.appendChild(t);
    requestAnimationFrame(function () { requestAnimationFrame(function () { t.classList.add('show'); }); });
    setTimeout(function () {
      t.classList.remove('show');
      setTimeout(function () { if (t.parentNode) t.parentNode.removeChild(t); }, 350);
    }, 3000);
  };

  /* Alias for pages that use showNotification */
  window.showNotification = window.showToast;

  /* ── Support modal ───────────────────────────────────────── */
  function initSupportModal() {
    const fab = document.getElementById('support-fab');
    const modal = document.getElementById('support-modal');
    const closeBtn = document.getElementById('support-modal-close');
    if (!fab || !modal) return;

    fab.addEventListener('click', function () { modal.classList.remove('hidden'); });
    if (closeBtn) closeBtn.addEventListener('click', function () { modal.classList.add('hidden'); });
    modal.addEventListener('click', function (e) {
      if (e.target === modal) modal.classList.add('hidden');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') modal.classList.add('hidden');
    });
  }

  /* ── Scroll reveal ───────────────────────────────────────── */
  function initReveal() {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;
    const obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('visible'); obs.unobserve(entry.target); }
      });
    }, { threshold: 0.1 });
    els.forEach(function (el) { obs.observe(el); });
  }

  /* ── Clipboard helper ────────────────────────────────────── */
  window.copyText = function (text, msg) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(function () {
        showToast(msg || 'Copied!');
      }).catch(function () { showToast('Copy failed', 'error'); });
    } else {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      showToast(msg || 'Copied!');
    }
  };

  /* ── Download helper ─────────────────────────────────────── */
  window.downloadBlob = function (blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename;
    document.body.appendChild(a); a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  window.downloadText = function (content, filename, mime) {
    const blob = new Blob([content], { type: mime || 'text/plain' });
    downloadBlob(blob, filename);
  };

  /* ── Init ────────────────────────────────────────────────── */
  function init() {
    initTheme();
    initSupportModal();
    initReveal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
