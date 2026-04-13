/**
 * Language Switcher — i18n for AA-SIRKO website
 * Supports English (en) and Dutch (nl) via JSON files in /lang/
 */
(function () {
  'use strict';

  const SUPPORTED_LANGS = ['en', 'nl'];
  const DEFAULT_LANG = 'en';
  const STORAGE_KEY = 'aasirko_lang';

  let translations = {};

  /** Get current language from localStorage or default */
  function getCurrentLang() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && SUPPORTED_LANGS.includes(saved)) return saved;
    return DEFAULT_LANG;
  }

  /** Save language choice */
  function saveLang(lang) {
    localStorage.setItem(STORAGE_KEY, lang);
  }

  /** Load JSON translation file */
  async function loadTranslations(lang) {
    try {
      const resp = await fetch('lang/' + lang + '.json');
      if (!resp.ok) throw new Error('HTTP ' + resp.status);
      return await resp.json();
    } catch (e) {
      console.warn('[i18n] Could not load lang/' + lang + '.json:', e);
      return null;
    }
  }

  /** Resolve a dot-separated key like "common.nav_home" from the translations object */
  function resolve(key) {
    const parts = key.split('.');
    let obj = translations;
    for (const p of parts) {
      if (obj && typeof obj === 'object' && p in obj) {
        obj = obj[p];
      } else {
        return undefined;
      }
    }
    return typeof obj === 'string' ? obj : undefined;
  }

  /** Apply translations to all elements with data-i18n attributes */
  function applyTranslations() {
    // Text content
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      const key = el.getAttribute('data-i18n');
      const val = resolve(key);
      if (val !== undefined) {
        el.textContent = val;
      }
    });

    // HTML content (for elements that need inner HTML like spans)
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      const key = el.getAttribute('data-i18n-html');
      const val = resolve(key);
      if (val !== undefined) {
        el.innerHTML = val;
      }
    });

    // Placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      const key = el.getAttribute('data-i18n-placeholder');
      const val = resolve(key);
      if (val !== undefined) {
        el.setAttribute('placeholder', val);
      }
    });

    // Update toggle buttons
    const lang = getCurrentLang();
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      if (btn.getAttribute('data-lang') === lang) {
        btn.classList.add('active-lang');
      } else {
        btn.classList.remove('active-lang');
      }
    });
  }

  /** Switch to a specific language */
  async function switchLanguage(lang) {
    if (!SUPPORTED_LANGS.includes(lang)) return;
    saveLang(lang);
    const data = await loadTranslations(lang);
    if (data) {
      translations = data;
      applyTranslations();
    }
  }

  /** Initialize on DOM ready */
  async function init() {
    const lang = getCurrentLang();
    const data = await loadTranslations(lang);
    if (data) {
      translations = data;
      applyTranslations();
    }
  }

  // Expose switchLanguage globally
  window.switchLanguage = switchLanguage;

  // Run on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
