(function () {
  "use strict";
  const url = new URL(window.location.href);
  const requestedLang = url.searchParams.get("lang");
  const urlLang = requestedLang === "zh" || requestedLang === "zh-Hant" ? "zh" : requestedLang === "en" ? "en" : null;
  const pageLang = document.documentElement.lang === "zh-Hant" ? "zh" : "en";
  const chosenLang = window.sitePreferences.language(pageLang);
  if (chosenLang !== pageLang) {
    const target = new URL(chosenLang === "zh" ? "guide-zh.html" : "guide.html", url);
    target.search = url.search;
    target.hash = url.hash;
    window.location.replace(target.href);
    return;
  }
  const language = document.getElementById('guide-language');
  const theme = document.getElementById('guide-theme');
  language.value = window.sitePreferences.languageMode;
  theme.value = window.sitePreferences.theme;
  if (chosenLang === 'zh') {
    document.getElementById('language-label').textContent = '語言';
    document.getElementById('theme-label').textContent = '外觀';
    language.options[0].textContent = '跟隨系統';
    ['跟隨系統','淺色','深色'].forEach((label, index) => { theme.options[index].textContent = label; });
  }
  language.addEventListener('change', () => { window.sitePreferences.setLanguage(language.value); location.reload(); });
  theme.addEventListener('change', () => window.sitePreferences.setTheme(theme.value));
  window.addEventListener('site-theme-change', () => { theme.value = window.sitePreferences.theme; });
  for (const link of document.querySelectorAll('a[href="conferences/official-demo/"], .guide-brand')) {
    const target = new URL(link.href); target.searchParams.set('lang', window.sitePreferences.languageMode); link.href = target.href;
  }
})();
