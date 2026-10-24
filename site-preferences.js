(function () {
  'use strict';
  const normalizeLanguage = value => value === 'system' ? 'system' : value === 'en' ? 'en' : ['zh', 'zh-Hant'].includes(value) ? 'zh' : null;
  const read = key => { try { return localStorage.getItem(key); } catch { return null; } };
  const write = (key, value) => { try { localStorage.setItem(key, value); } catch {} };
  const media = matchMedia('(prefers-color-scheme: dark)');
  const normalizeTheme = value => ['light', 'dark', 'system'].includes(value) ? value : 'system';
  let theme = normalizeTheme(read('jwc-theme'));
  function applyTheme() {
    document.documentElement.dataset.theme = theme === 'system' ? (media.matches ? 'dark' : 'light') : theme;
    window.dispatchEvent(new Event('site-theme-change'));
  }
  window.sitePreferences = {
    get languageMode() {
      return normalizeLanguage(new URL(location.href).searchParams.get('lang')) || normalizeLanguage(read('jwc-lang')) || 'system';
    },
    language() {
      const mode = this.languageMode;
      if (mode !== 'system') return mode;
      // Use the primary browser language; simplified Chinese and bare zh use English.
      const language = (navigator.languages?.[0] || navigator.language || '').toLowerCase();
      return /^zh-(?:hant(?:-|$)|(?:tw|hk|mo)(?:-|$))/.test(language) ? 'zh' : 'en';
    },
    setLanguage(value) {
      const mode = normalizeLanguage(value);
      if (!mode) return;
      write('jwc-lang', mode);
      const url = new URL(location.href); url.searchParams.set('lang', mode);
      history.replaceState(null, '', url);
    },
    get theme() { return theme; },
    setTheme(value) { theme = normalizeTheme(value); write('jwc-theme', theme); applyTheme(); }
  };
  media.addEventListener('change', () => { if (theme === 'system') applyTheme(); });
  window.addEventListener('storage', event => {
    if (event.key === 'jwc-theme' || event.key === null) { theme = normalizeTheme(read('jwc-theme')); applyTheme(); }
  });
  window.addEventListener('pageshow', () => { theme = normalizeTheme(read('jwc-theme')); applyTheme(); });
  const requested = normalizeLanguage(new URL(location.href).searchParams.get('lang'));
  if (requested) write('jwc-lang', requested);
  applyTheme();
})();
