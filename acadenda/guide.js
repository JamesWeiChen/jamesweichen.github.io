(function () {
  "use strict";
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
    link.addEventListener('click', function () { link.hash = window.location.hash; });
  });
})();
