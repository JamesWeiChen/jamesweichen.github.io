(function () {
  "use strict";
  const url = new URL(window.location.href);
  // Retired sample-section links now lead into the personal PDF walkthrough.
  if (url.hash === '#qr-samples') {
    url.hash = '#step-1';
    history.replaceState(null, '', url);
    document.getElementById('step-1')?.scrollIntoView();
  }
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
  for (const link of document.querySelectorAll('a[href="conferences/official-demo/"], .guide-brand')) {
    const target = new URL(link.href); target.searchParams.set('lang', window.sitePreferences.languageMode); link.href = target.href;
  }
})();
