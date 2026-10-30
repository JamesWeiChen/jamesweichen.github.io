(function () {
  'use strict';
  window.renderSiteHeader = function(lang, currentRoute = 'apps', rootURL = './') {
    const data = window.siteData;
    const t = key => data.nav[lang][key];
    const linkTo = (path, label, activePaths = [path]) => {
      const current = activePaths.includes(currentRoute);
      return `<a class="nav-link${current ? ' is-active' : ''}" href="${rootURL}?lang=${window.sitePreferences.languageMode}#/${path === 'home' ? '' : path}"${current ? ' aria-current="page"' : ''}>${label}</a>`;
    };
    return `
      <header class="site-header">
        <nav class="nav-shell" aria-label="Primary navigation">
          <a class="brand" href="${rootURL}?lang=${window.sitePreferences.languageMode}#/" aria-label="Wei James Chen home">
            <span>${data.profile.name}</span>
            <span class="brand-zh">${data.profile.nameZh}</span>
          </a>
          <div class="nav-links">
            ${linkTo("home", t("home"))}
            ${linkTo("featured", t("research"), ["featured", "research", "browse"])}
            ${linkTo("teaching", t("teaching"))}
            ${linkTo("lab", t("lab"))}
            ${linkTo("presentations", t("presentations"))}
            ${linkTo("apps", t("apps"))}
            <a class="nav-link" href="${new URL(data.profile.cv, new URL(rootURL, location.href)).href}" target="_blank" rel="noreferrer">${t("cv")} ↗</a>
          </div>
          <label class="preference-control"><span>${lang === 'zh' ? '外觀' : 'Appearance'}</span>
            <select data-theme-select aria-label="${lang === 'zh' ? '外觀' : 'Appearance'}">
              ${['system','light','dark'].map((mode, index) => `<option value="${mode}" ${window.sitePreferences.theme === mode ? 'selected' : ''}>${(lang === 'zh' ? ['跟隨系統','淺色','深色'] : ['System','Light','Dark'])[index]}</option>`).join('')}
            </select></label>
          <label class="preference-control"><span>${lang === 'zh' ? '語言' : 'Language'}</span>
            <select data-language-select aria-label="${lang === 'zh' ? '語言' : 'Language'}">
              ${['system','zh','en'].map((mode, index) => `<option value="${mode}" ${window.sitePreferences.languageMode === mode ? 'selected' : ''}>${[lang === 'zh' ? '跟隨系統' : 'System','繁體中文','English'][index]}</option>`).join('')}
            </select></label>
        </nav>
      </header>`;
  };
  const mount = document.getElementById('shared-site-header');
  if (!mount) return;
  const lang = window.sitePreferences.language();
  mount.innerHTML = window.renderSiteHeader(lang, 'apps', mount.dataset.root);
  const theme = mount.querySelector('[data-theme-select]');
  const language = mount.querySelector('[data-language-select]');
  theme.id = mount.dataset.kind === 'guide' ? 'guide-theme' : 'theme';
  language.id = mount.dataset.kind === 'guide' ? 'guide-language' : 'language';
  theme.addEventListener('change', () => window.sitePreferences.setTheme(theme.value));
  window.addEventListener('site-theme-change', () => { theme.value = window.sitePreferences.theme; });
  language.addEventListener('change', () => {
    const changes = document.getElementById('changes');
    if (changes) { try { sessionStorage.setItem('acadenda-changes:' + location.pathname, changes.value); } catch {} }
    window.sitePreferences.setLanguage(language.value);
    location.reload();
  });
})();
