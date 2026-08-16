(function () {
  "use strict";

  const data = window.siteData;
  const app = document.querySelector("#app");
  const state = {
    lang: localStorage.getItem("jwc-lang") === "zh" ? "zh" : "en",
    researchFilter: "all",
  };

  const copy = {
    en: {
      home: "Home",
      research: "Research",
      people: "People",
      teaching: "Teaching",
      cv: "CV",
      greeting: "Greetings!",
      contact: "Email",
      department: "Department",
      facebook: "Facebook",
      researchIntro: "We study economic decisions as they happen - from attention and learning to the institutions that shape behavior.",
      selected: "At a glance",
      publications: "publications",
      activeStudents: "active students",
      researchStreams: "research streams",
      latestNews: "Lab news",
      allNews: "Current and recent milestones from the lab.",
      explore: "Explore the research map",
      mapTitle: "A map of our research",
      mapIntro: "Choose a research stream to filter the paper list. Published work links to the journal page.",
      all: "All work",
      published: "Published",
      working: "Working papers",
      rr: "R&R",
      peopleTitle: "People",
      peopleIntro: "Current students and former lab members advised or supervised in the lab.",
      current: "Current students",
      alumni: "Former students & research assistants",
      join: "Join the lab",
      joinText: "We are currently recruiting master’s and Ph.D. students and research assistants. Please email James with your interests and background.",
      teachingTitle: "Teaching",
      teachingIntro: "Courses taught at National Taiwan University and National Central University.",
      ntu: "National Taiwan University",
      ncu: "National Central University",
      download: "Download CV",
      updated: "Content updated August 2026",
    },
    zh: {
      home: "首頁",
      research: "研究",
      people: "成員",
      teaching: "教學",
      cv: "履歷",
      greeting: "你好！",
      contact: "電子郵件",
      department: "系所網站",
      facebook: "Facebook",
      researchIntro: "我們研究經濟決策的形成過程，從注意力與學習，到形塑行為的制度環境。",
      selected: "研究概覽",
      publications: "篇已發表論文",
      activeStudents: "位現任學生",
      researchStreams: "個研究方向",
      latestNews: "實驗室消息",
      allNews: "實驗室近期的重要進展。",
      explore: "探索研究地圖",
      mapTitle: "研究地圖",
      mapIntro: "選擇研究方向即可篩選論文；已發表論文可連至期刊頁面。",
      all: "全部研究",
      published: "已發表",
      working: "工作論文",
      rr: "修訂中",
      peopleTitle: "實驗室成員",
      peopleIntro: "目前與過去曾在實驗室接受指導的學生與研究助理。",
      current: "現任學生",
      alumni: "歷屆學生與研究助理",
      join: "加入實驗室",
      joinText: "目前招募碩士生、博士生與研究助理。歡迎來信說明你的研究興趣與背景。",
      teachingTitle: "教學",
      teachingIntro: "於國立臺灣大學與國立中央大學開設之課程。",
      ntu: "國立臺灣大學",
      ncu: "國立中央大學",
      download: "下載 CV",
      updated: "內容更新於 2026 年 8 月",
    },
  };

  function t(key) {
    return copy[state.lang][key];
  }

  function localized(value) {
    return typeof value === "string" ? value : value[state.lang];
  }

  function route() {
    const value = window.location.hash.replace(/^#\/?/, "").split("?")[0];
    return ["research", "people", "teaching"].includes(value) ? value : "home";
  }

  function linkTo(path, label) {
    const current = route() === path;
    const href = path === "home" ? "#/" : `#/${path}`;
    return `<a class="nav-link${current ? " is-active" : ""}" href="${href}"${current ? ' aria-current="page"' : ""}>${label}</a>`;
  }

  function header() {
    return `
      <header class="site-header">
        <nav class="nav-shell" aria-label="Primary navigation">
          <a class="brand" href="#/" aria-label="Wei James Chen home">
            <span>${data.profile.name}</span>
            <span class="brand-zh">${data.profile.nameZh}</span>
          </a>
          <div class="nav-links">
            ${linkTo("home", t("home"))}
            ${linkTo("research", t("research"))}
            ${linkTo("people", t("people"))}
            ${linkTo("teaching", t("teaching"))}
            <a class="nav-link" href="${data.profile.cv}" target="_blank" rel="noreferrer">${t("cv")} ↗</a>
          </div>
          <div class="language-switch" aria-label="Language">
            <button type="button" data-lang="en" class="${state.lang === "en" ? "is-active" : ""}" lang="en">EN</button>
            <span aria-hidden="true">/</span>
            <button type="button" data-lang="zh" class="${state.lang === "zh" ? "is-active" : ""}" lang="zh-Hant">中文</button>
          </div>
        </nav>
      </header>`;
  }

  function socialLinks() {
    return `
      <div class="hero-links">
        <a href="mailto:${data.profile.email}">${t("contact")} ↗</a>
        <a href="${data.profile.department}" target="_blank" rel="noreferrer">${t("department")} ↗</a>
        <a href="${data.profile.facebook}" target="_blank" rel="noreferrer">${t("facebook")} ↗</a>
        <a href="${data.profile.cv}" target="_blank" rel="noreferrer">${t("download")} ↗</a>
      </div>`;
  }

  function homePage() {
    const bios = data.bio[state.lang].map((paragraph) => `<p>${paragraph}</p>`).join("");
    const themeCards = data.themes
      .map(
        (theme) => `
          <a class="theme-card" href="#/research?theme=${theme.id}">
            <span class="theme-number">${theme.number}</span>
            <h3>${localized(theme.title)}</h3>
            <p>${localized(theme.text)}</p>
            <span class="theme-arrow" aria-hidden="true">↗</span>
          </a>`,
      )
      .join("");
    const news = data.news
      .slice(0, 3)
      .map(
        (item) => `
          <article class="news-item">
            <time>${item.date}</time>
            <p>${item[state.lang]}</p>
          </article>`,
      )
      .join("");

    return `
      <main id="main-content">
        <section class="hero page-shell">
          <div class="hero-copy">
            <p class="eyebrow">${localized(data.profile.role)}</p>
            <h1>${t("greeting")}</h1>
            <div class="bio-copy">${bios}</div>
            ${socialLinks()}
          </div>
          <figure class="portrait-frame">
            <img src="${data.profile.image}" alt="Portrait of ${data.profile.name}" />
            <figcaption>
              <span>${localized(data.profile.title)}</span>
              <span>National Taiwan University</span>
            </figcaption>
          </figure>
        </section>

        <section class="stats-section page-shell section-rule" aria-labelledby="stats-title">
          <div class="section-heading">
            <div>
              <p class="eyebrow">${t("selected")}</p>
              <h2 id="stats-title">${t("researchIntro")}</h2>
            </div>
            <a class="text-link" href="#/research">${t("explore")} →</a>
          </div>
          <div class="stat-grid">
            <div class="stat-card stat-green"><strong>${data.publications.length}</strong><span>${t("publications")}</span></div>
            <div class="stat-card stat-rust"><strong>${data.people.current.length}</strong><span>${t("activeStudents")}</span></div>
            <div class="stat-card stat-blue"><strong>${data.themes.length}</strong><span>${t("researchStreams")}</span></div>
          </div>
        </section>

        <section class="themes-section page-shell section-rule" aria-labelledby="themes-title">
          <div class="section-heading compact-heading">
            <div>
              <p class="eyebrow">Research atlas</p>
              <h2 id="themes-title">${state.lang === "en" ? "Where we work" : "我們關注的研究領域"}</h2>
            </div>
          </div>
          <div class="theme-grid">${themeCards}</div>
        </section>

        <section class="news-section page-shell section-rule" aria-labelledby="news-title">
          <div class="section-heading">
            <div>
              <p class="eyebrow">${t("latestNews")}</p>
              <h2 id="news-title">${t("allNews")}</h2>
            </div>
          </div>
          <div class="news-list">${news}</div>
        </section>
      </main>`;
  }

  function paperStatus(paper) {
    if (paper.status === "published") return t("published");
    if (paper.status === "rr") return t("rr");
    return t("working");
  }

  function paperRow(paper) {
    const title = paper.link
      ? `<a href="${paper.link}" target="_blank" rel="noreferrer">${paper.title} ↗</a>`
      : `<span>${paper.title}</span>`;
    return `
      <article class="paper-row">
        <div class="paper-year">${paper.year || "—"}</div>
        <div class="paper-body">
          <div class="paper-meta"><span class="status status-${paper.status}">${paperStatus(paper)}</span></div>
          <h3>${title}</h3>
          <p>${paper.authors}</p>
          <p class="venue">${paper.venue}</p>
        </div>
      </article>`;
  }

  function researchPage() {
    const query = new URLSearchParams(window.location.hash.split("?")[1] || "");
    const themeFromUrl = query.get("theme");
    if (themeFromUrl && data.themes.some((theme) => theme.id === themeFromUrl)) state.researchFilter = themeFromUrl;

    const filters = [
      { id: "all", label: t("all") },
      ...data.themes.map((theme) => ({ id: theme.id, label: localized(theme.title) })),
    ];
    const filterButtons = filters
      .map(
        (filter) => `
          <button type="button" class="filter-button${state.researchFilter === filter.id ? " is-active" : ""}" data-filter="${filter.id}">
            ${filter.label}
          </button>`,
      )
      .join("");
    const allPapers = [...data.publications, ...data.workingPapers];
    const visible = allPapers.filter(
      (paper) => state.researchFilter === "all" || paper.theme === state.researchFilter,
    );
    const cards = data.themes
      .map(
        (theme) => `
          <button type="button" class="map-card${state.researchFilter === theme.id ? " is-active" : ""}" data-filter="${theme.id}">
            <span class="map-card-number">${theme.number}</span>
            <span class="map-card-title">${localized(theme.title)}</span>
            <span class="map-card-copy">${localized(theme.text)}</span>
            <span class="tag-line">${theme.tags.join(" · ")}</span>
          </button>`,
      )
      .join("");

    return `
      <main id="main-content" class="page-shell inner-page">
        <header class="page-intro">
          <p class="eyebrow">Research atlas · ${data.publications.length + data.workingPapers.length} projects</p>
          <h1>${t("mapTitle")}</h1>
          <p>${t("mapIntro")}</p>
        </header>
        <section class="research-map" aria-label="Research streams">${cards}</section>
        <section class="paper-section section-rule" aria-labelledby="paper-list-title">
          <div class="paper-toolbar">
            <h2 id="paper-list-title">${state.lang === "en" ? "Papers & projects" : "論文與研究計畫"}</h2>
            <div class="filter-group" aria-label="Filter research">${filterButtons}</div>
          </div>
          <div class="paper-list">${visible.map(paperRow).join("")}</div>
        </section>
      </main>`;
  }

  function initials(name) {
    return name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0])
      .join("");
  }

  function peoplePage() {
    const current = data.people.current
      .map(
        (person, index) => `
          <article class="person-card">
            <div class="person-avatar avatar-${(index % 4) + 1}" aria-hidden="true">${initials(person.name)}</div>
            <div>
              <p class="person-role">${localized(person.role)}</p>
              <h3>${person.name} <span>${person.nameZh}</span></h3>
              <p>${localized(person.bio)}</p>
            </div>
          </article>`,
      )
      .join("");
    const alumni = data.people.alumni.map((name) => `<li>${name}</li>`).join("");

    return `
      <main id="main-content" class="page-shell inner-page">
        <header class="page-intro people-intro">
          <p class="eyebrow">The lab</p>
          <h1>${t("peopleTitle")}</h1>
          <p>${t("peopleIntro")}</p>
        </header>
        <section class="people-section section-rule" aria-labelledby="current-title">
          <div class="split-heading">
            <h2 id="current-title">${t("current")}</h2>
            <span>${data.people.current.length.toString().padStart(2, "0")}</span>
          </div>
          <div class="people-grid">${current}</div>
        </section>
        <section class="join-panel">
          <div>
            <p class="eyebrow">Open positions</p>
            <h2>${t("join")}</h2>
          </div>
          <div>
            <p>${t("joinText")}</p>
            <a class="button-link" href="mailto:${data.profile.email}">${t("contact")} ↗</a>
          </div>
        </section>
        <section class="alumni-section section-rule" aria-labelledby="alumni-title">
          <div class="split-heading">
            <h2 id="alumni-title">${t("alumni")}</h2>
            <span>${data.people.alumni.length.toString().padStart(2, "0")}</span>
          </div>
          <ul class="alumni-list">${alumni}</ul>
        </section>
      </main>`;
  }

  function teachingPage() {
    const courseList = (courses) => courses.map((course) => `<li>${course}</li>`).join("");
    return `
      <main id="main-content" class="page-shell inner-page">
        <header class="page-intro teaching-intro">
          <p class="eyebrow">Courses</p>
          <h1>${t("teachingTitle")}</h1>
          <p>${t("teachingIntro")}</p>
        </header>
        <section class="teaching-grid section-rule">
          <article class="teaching-column">
            <span class="institution-mark">NTU</span>
            <h2>${t("ntu")}</h2>
            <ul>${courseList(data.teaching.ntu)}</ul>
          </article>
          <article class="teaching-column">
            <span class="institution-mark institution-rust">NCU</span>
            <h2>${t("ncu")}</h2>
            <ul>${courseList(data.teaching.ncu)}</ul>
          </article>
        </section>
      </main>`;
  }

  function footer() {
    const year = new Date().getFullYear();
    return `
      <footer class="site-footer">
        <div class="footer-shell">
          <div>
            <strong>${data.profile.name} <span>${data.profile.nameZh}</span></strong>
            <p>${localized(data.profile.title)}</p>
          </div>
          <div class="footer-links">
            <a href="mailto:${data.profile.email}">${data.profile.email}</a>
            <a href="${data.profile.cv}" target="_blank" rel="noreferrer">${t("download")} ↗</a>
          </div>
          <div class="footer-meta">
            <span>© ${year} ${data.profile.name}</span>
            <span>${t("updated")}</span>
          </div>
        </div>
      </footer>`;
  }

  function render() {
    const currentRoute = route();
    document.documentElement.lang = state.lang === "zh" ? "zh-Hant" : "en";
    document.title = `${
      currentRoute === "home" ? data.profile.name : t(currentRoute)
    } | National Taiwan University`;
    const page = {
      home: homePage,
      research: researchPage,
      people: peoplePage,
      teaching: teachingPage,
    }[currentRoute]();
    app.innerHTML = `${header()}${page}${footer()}`;
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  document.addEventListener("click", (event) => {
    const languageButton = event.target.closest("[data-lang]");
    if (languageButton) {
      state.lang = languageButton.dataset.lang;
      localStorage.setItem("jwc-lang", state.lang);
      render();
      return;
    }

    const filterButton = event.target.closest("[data-filter]");
    if (filterButton) {
      state.researchFilter = filterButton.dataset.filter;
      const base = "#/research";
      const nextHash = state.researchFilter === "all" ? base : `${base}?theme=${state.researchFilter}`;
      if (window.location.hash === nextHash) render();
      else window.location.hash = nextHash;
    }
  });

  window.addEventListener("hashchange", render);
  render();
})();
