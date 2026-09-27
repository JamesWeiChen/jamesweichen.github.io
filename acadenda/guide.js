(function () {
  "use strict";
  const url = new URL(window.location.href);
  const requestedLang = url.searchParams.get("lang");
  const urlLang = requestedLang === "zh" || requestedLang === "zh-Hant" ? "zh" : requestedLang === "en" ? "en" : null;
  const pageLang = document.documentElement.lang === "zh-Hant" ? "zh" : "en";
  if (urlLang && urlLang !== pageLang) {
    const target = new URL(urlLang === "zh" ? "guide-zh.html" : "guide.html", url);
    target.search = url.search;
    target.hash = url.hash;
    window.location.replace(target.href);
    return;
  }
  try {
    document.documentElement.dataset.theme = localStorage.getItem("jwc-theme") === "light" ? "light" : "dark";
    localStorage.setItem("jwc-lang", document.documentElement.lang === "zh-Hant" ? "zh" : "en");
  } catch (error) { /* The guide remains usable when storage is unavailable. */ }
  document.querySelector("#theme-toggle").addEventListener("click", function () {
    const theme = document.documentElement.dataset.theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem("jwc-theme", theme); } catch (error) { /* Optional preference. */ }
  });
  document.querySelectorAll('.guide-header nav a').forEach(function (link) {
    link.addEventListener('click', function () {
      const target = new URL(link.href);
      target.search = window.location.search;
      target.searchParams.set("lang", link.lang === "zh-Hant" ? "zh" : "en");
      target.hash = window.location.hash;
      link.href = target.href;
    });
  });
})();
