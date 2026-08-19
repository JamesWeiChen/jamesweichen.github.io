(function () {
  "use strict";

  const data = window.siteData;
  const app = document.querySelector("#app");
  const state = {
    lang: localStorage.getItem("jwc-lang") === "zh" ? "zh" : "en",
    theme: document.documentElement.dataset.theme === "light" ? "light" : "dark",
    researchMethod: "all",
    featuredIndex: 0,
    featuredPaused: false,
    browseQuery: "",
    browseStatuses: new Set(),
  };
  let featuredTimer;

  const copy = {
    en: {
      home: "Home",
      research: "Research",
      featured: "Featured findings",
      browse: "Browse papers",
      people: "People",
      presentations: "Talks",
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
      mapTitle: "Research methods map",
      mapIntro: "Explore the lab by how evidence is produced, from behavioral experiments and process tracing to computational models and field evidence.",
      all: "All work",
      published: "Published",
      working: "Working papers",
      rr: "R&R",
      peopleTitle: "People",
      peopleIntro: "Current students, former students, and research assistants advised or supervised in the lab.",
      current: "Current students",
      formerStudents: "Former students",
      formerResearchAssistants: "Former research assistants",
      presentationsTitle: "Conference Presentations",
      presentationsIntro: "Conference and workshop presentations, listed in reverse chronological order.",
      presentationCount: "presentations",
      forthcoming: "Forthcoming",
      templatePreview: "Entry template",
      templateYear: "Year",
      templateTitle: "Presentation title",
      templateEvent: "Conference or workshop name",
      templateLocation: "City, Country",
      join: "Join the lab",
      joinText: "We are currently recruiting master’s and Ph.D. students and research assistants. Please email James with your interests and background.",
      teachingTitle: "Teaching",
      teachingIntro: "University courses, a paid online course, and free video resources for learners beyond the classroom.",
      ntu: "National Taiwan University",
      ncu: "National Central University",
      featuredCourse: "Featured online course",
      paidOnlineCourse: "Self-paced paid course",
      viewCourse: "View course",
      videoResources: "Free video resources",
      youtubeChannel: "Wei James Chen on YouTube",
      freeVideoChannel: "Free teaching videos",
      visitYoutube: "Visit YouTube channel",
      download: "Download CV",
      updated: "Content updated August 2026",
      switchTheme: "Switch theme",
      useLight: "Light",
      useDark: "Dark",
    },
    zh: {
      home: "首頁",
      research: "研究",
      featured: "精選發現",
      browse: "瀏覽論文",
      people: "成員",
      presentations: "發表",
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
      mapTitle: "研究方法地圖",
      mapIntro: "依照證據如何產生來探索實驗室研究：從行為實驗、歷程追蹤，到計算模型與田野證據。",
      all: "全部研究",
      published: "已發表",
      working: "工作論文",
      rr: "修訂中",
      peopleTitle: "實驗室成員",
      peopleIntro: "目前與過去曾在實驗室接受指導的學生，以及歷任研究助理。",
      current: "現任學生",
      formerStudents: "畢業學生",
      formerResearchAssistants: "歷任研究助理",
      presentationsTitle: "研討會發表",
      presentationsIntro: "研討會與工作坊發表紀錄，依時間由近至遠排列。",
      presentationCount: "場發表",
      forthcoming: "即將發表",
      templatePreview: "單筆資料模板",
      templateYear: "年份",
      templateTitle: "發表題名",
      templateEvent: "研討會或工作坊名稱",
      templateLocation: "城市、國家",
      join: "加入實驗室",
      joinText: "目前招募碩士生、博士生與研究助理。歡迎來信說明你的研究興趣與背景。",
      teachingTitle: "教學",
      teachingIntro: "國立臺灣大學、國立中央大學授課，以及面向校外學習者的付費線上課程與免費影音資源。",
      ntu: "國立臺灣大學",
      ncu: "國立中央大學",
      featuredCourse: "精選線上課程",
      paidOnlineCourse: "自學型付費課程",
      viewCourse: "查看課程",
      videoResources: "免費影音資源",
      youtubeChannel: "Wei James Chen 的 YouTube 頻道",
      freeVideoChannel: "免費教學影片",
      visitYoutube: "前往 YouTube 頻道",
      download: "下載 CV",
      updated: "內容更新於 2026 年 8 月",
      switchTheme: "切換顯示主題",
      useLight: "淺色",
      useDark: "深色",
    },
  };

  function t(key) {
    return copy[state.lang][key];
  }

  function localized(value) {
    return typeof value === "string" ? value : value[state.lang];
  }

  function escapeAttribute(value) {
    return String(value).replace(/&/g, "&amp;").replace(/"/g, "&quot;");
  }

  function route() {
    const value = window.location.hash.replace(/^#\/?/, "").split("?")[0];
    return ["featured", "research", "browse", "people", "presentations", "teaching"].includes(value) ? value : "home";
  }

  function linkTo(path, label, activePaths = [path]) {
    const current = activePaths.includes(route());
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
            ${linkTo("featured", t("research"), ["featured", "research", "browse"])}
            ${linkTo("teaching", t("teaching"))}
            ${linkTo("people", t("people"))}
            ${linkTo("presentations", t("presentations"))}
            <a class="nav-link" href="${data.profile.cv}" target="_blank" rel="noreferrer">${t("cv")} ↗</a>
          </div>
          <button
            type="button"
            class="theme-toggle"
            data-theme-toggle
            aria-label="${t("switchTheme")}: ${state.theme === "dark" ? t("useLight") : t("useDark") }"
            title="${t("switchTheme")}: ${state.theme === "dark" ? t("useLight") : t("useDark") }"
          >
            <span class="theme-icon" aria-hidden="true">${state.theme === "dark" ? "☼" : "◐"}</span>
            <span>${state.theme === "dark" ? t("useLight") : t("useDark")}</span>
          </button>
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
      .map(
        (item) => `
          <article class="news-item">
            <time datetime="${item.datetime}">${item.date}</time>
            <p>${item[state.lang]}</p>
          </article>`,
      )
      .join("");
    const findings = data.featuredFindings
      .map(
        (finding, index) => `
          <a class="finding-preview-card finding-preview-${index + 1}" href="#/featured?slide=${index + 1}">
            <span class="finding-category">${localized(finding.category)}</span>
            <span class="finding-preview-number">${finding.number}</span>
            <span class="finding-preview-unit">${localized(finding.unit)}</span>
            <p>${localized(finding.finding)}</p>
            <span class="finding-preview-link">${state.lang === "en" ? "Read the finding" : "閱讀完整發現"} →</span>
          </a>`,
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
            <a class="text-link" href="#/featured">${state.lang === "en" ? "See all findings" : "查看全部發現"} →</a>
          </div>
          <div class="finding-preview-grid">${findings}</div>
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
      <article class="paper-row" data-paper-row data-status="${paper.status}" data-search="${escapeAttribute(`${paper.title} ${paper.authors} ${paper.venue} ${paper.year || ""}`.toLowerCase())}">
        <div class="paper-year">${paper.year || "—"}</div>
        <div class="paper-body">
          <div class="paper-meta"><span class="status status-${paper.status}">${paperStatus(paper)}</span></div>
          <h3>${title}</h3>
          <p>${paper.authors}</p>
          <p class="venue">${paper.venue}</p>
          ${paper.abstract ? `<p class="paper-abstract">${paper.abstract}</p>` : ""}
        </div>
      </article>`;
  }

  function researchSubnav() {
    const links = [
      ["featured", t("featured")],
      ["research", state.lang === "en" ? "Methods map" : "研究方法地圖"],
      ["browse", state.lang === "en" ? "Browse all papers" : "瀏覽所有論文"],
    ];
    return `
      <nav class="research-subnav" aria-label="${state.lang === "en" ? "Research views" : "研究瀏覽方式"}">
        ${links
          .map(([path, label]) => `<a href="#/${path}" class="${route() === path ? "is-active" : ""}"${route() === path ? ' aria-current="page"' : ""}>${label}</a>`)
          .join("")}
      </nav>`;
  }

  function featuredPage() {
    const query = new URLSearchParams(window.location.hash.split("?")[1] || "");
    const requestedSlide = Number(query.get("slide"));
    if (Number.isInteger(requestedSlide) && requestedSlide >= 1 && requestedSlide <= data.featuredFindings.length) {
      state.featuredIndex = requestedSlide - 1;
    }
    const finding = data.featuredFindings[state.featuredIndex];
    const dots = data.featuredFindings
      .map(
        (_, index) => `<button type="button" class="featured-dot${index === state.featuredIndex ? " is-active" : ""}" data-featured-index="${index}" aria-label="${state.lang === "en" ? "Show finding" : "顯示發現"} ${index + 1}"${index === state.featuredIndex ? ' aria-current="true"' : ""}></button>`,
      )
      .join("");
    return `
      <main id="main-content" class="page-shell inner-page featured-page">
        ${researchSubnav()}
        <header class="page-intro">
          <p class="eyebrow">${state.lang === "en" ? "Selected evidence" : "精選研究證據"}</p>
          <h1>${t("featured")}</h1>
          <p>${state.lang === "en" ? "Three results that capture how we study learning, decision-making, and scientific institutions." : "三項代表性結果，呈現我們如何研究學習、決策與科學制度。"}</p>
        </header>
        <section class="featured-spotlight" aria-live="polite">
          <div class="featured-metric">
            <span class="finding-category">${localized(finding.category)}</span>
            <strong>${finding.number}</strong>
            <span>${localized(finding.unit)}</span>
          </div>
          <article class="featured-copy">
            <p class="featured-count">${String(state.featuredIndex + 1).padStart(2, "0")} / ${String(data.featuredFindings.length).padStart(2, "0")}</p>
            <h2>${finding.title}</h2>
            <p class="featured-authors">${finding.authors}<br />${finding.venue}</p>
            <p class="featured-summary">${localized(finding.finding)}</p>
            <a class="button-link" href="${finding.link}" target="_blank" rel="noreferrer">${state.lang === "en" ? "Read the source" : "閱讀研究來源"} ↗</a>
          </article>
        </section>
        <div class="featured-controls">
          <div class="featured-dots">${dots}</div>
          <div class="featured-arrows">
            <button type="button" data-featured-step="-1" aria-label="${state.lang === "en" ? "Previous finding" : "上一項發現"}">←</button>
            <button type="button" data-featured-step="1" aria-label="${state.lang === "en" ? "Next finding" : "下一項發現"}">→</button>
          </div>
        </div>
      </main>`;
  }

  function researchPage() {
    const filters = [
      { id: "all", label: t("all") },
      ...data.methods.map((method) => ({ id: method.id, label: localized(method.title) })),
    ];
    const filterButtons = filters
      .map(
        (filter) => `
          <button type="button" class="filter-button${state.researchMethod === filter.id ? " is-active" : ""}" data-method-filter="${filter.id}">
            ${filter.label}
          </button>`,
      )
      .join("");
    const allPapers = [...data.publications, ...data.workingPapers];
    const visible = allPapers.filter(
      (paper) => state.researchMethod === "all" || paper.method === state.researchMethod,
    );
    const cards = data.methods
      .map(
        (method) => `
          <button type="button" class="method-card${state.researchMethod === method.id ? " is-active" : ""}" data-method-filter="${method.id}">
            <span class="map-card-number">${method.number}</span>
            <span class="map-card-title">${localized(method.title)}</span>
            <span class="map-card-copy">${localized(method.text)}</span>
            <span class="tag-line">${localized(method.tags)}</span>
            <span class="method-count">${allPapers.filter((paper) => paper.method === method.id).length} ${state.lang === "en" ? "projects" : "項研究"}</span>
          </button>`,
      )
      .join("");

    return `
      <main id="main-content" class="page-shell inner-page">
        ${researchSubnav()}
        <header class="page-intro">
          <p class="eyebrow">Methods atlas · ${data.publications.length + data.workingPapers.length} projects</p>
          <h1>${t("mapTitle")}</h1>
          <p>${t("mapIntro")}</p>
        </header>
        <section class="methods-map" aria-label="${state.lang === "en" ? "Research methods" : "研究方法"}">${cards}</section>
        <section class="paper-section section-rule" aria-labelledby="paper-list-title">
          <div class="paper-toolbar">
            <h2 id="paper-list-title">${state.lang === "en" ? "Papers & projects" : "論文與研究計畫"}</h2>
            <div class="filter-group" aria-label="Filter research">${filterButtons}</div>
          </div>
          <div class="paper-list">${visible.map(paperRow).join("")}</div>
        </section>
      </main>`;
  }

  function browsePage() {
    const allPapers = [...data.publications, ...data.workingPapers].sort((a, b) => (b.year || 0) - (a.year || 0));
    const statusOptions = [
      ["published", t("published")],
      ["rr", t("rr")],
      ["working", t("working")],
    ];
    return `
      <main id="main-content" class="page-shell inner-page browse-page">
        ${researchSubnav()}
        <header class="page-intro">
          <p class="eyebrow">${allPapers.length} ${state.lang === "en" ? "projects" : "項研究"}</p>
          <h1>${state.lang === "en" ? "Browse all papers" : "瀏覽所有論文"}</h1>
          <p>${state.lang === "en" ? "Search by title, author, venue, or year, then narrow the list by publication status." : "依標題、作者、期刊或年份搜尋，並可用發表狀態縮小範圍。"}</p>
        </header>
        <section class="browse-controls" aria-label="${state.lang === "en" ? "Paper filters" : "論文篩選"}">
          <label class="paper-search">
            <span>${state.lang === "en" ? "Search papers" : "搜尋論文"}</span>
            <input type="search" data-paper-search value="${escapeAttribute(state.browseQuery)}" placeholder="${state.lang === "en" ? "Title, author, venue, year…" : "標題、作者、期刊、年份…"}" />
          </label>
          <div class="browse-statuses">
            ${statusOptions
              .map(([status, label]) => `<button type="button" data-status-filter="${status}" aria-pressed="${state.browseStatuses.has(status)}" class="filter-button${state.browseStatuses.has(status) ? " is-active" : ""}">${label}</button>`)
              .join("")}
          </div>
        </section>
        <div class="browse-result-line"><strong data-result-count>${allPapers.length}</strong> ${state.lang === "en" ? "results" : "筆結果"}</div>
        <section class="paper-list browse-paper-list">${allPapers.map(paperRow).join("")}</section>
        <p class="browse-empty" data-browse-empty hidden>${state.lang === "en" ? "No papers match these filters." : "沒有符合目前條件的論文。"}</p>
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
    const alumniList = (people) =>
      people
        .map(
          (person) => `
            <li>
              <span>${person.name}</span>
              <small>${localized(person.title)}</small>
            </li>`,
        )
        .join("");
    const formerStudents = alumniList(data.people.formerStudents);
    const formerResearchAssistants = alumniList(data.people.formerResearchAssistants);

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
        <section class="alumni-section section-rule" aria-labelledby="alumni-title">
          <div class="alumni-group">
            <div class="split-heading">
              <h2 id="alumni-title">${t("formerStudents")}</h2>
              <span>${data.people.formerStudents.length.toString().padStart(2, "0")}</span>
            </div>
            <ul class="alumni-list">${formerStudents}</ul>
          </div>
          <div class="alumni-group">
            <div class="split-heading">
              <h2 id="former-ra-title">${t("formerResearchAssistants")}</h2>
              <span>${data.people.formerResearchAssistants.length.toString().padStart(2, "0")}</span>
            </div>
            <ul class="alumni-list" aria-labelledby="former-ra-title">${formerResearchAssistants}</ul>
          </div>
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
      </main>`;
  }

  function teachingPage() {
    const courseList = (courses) =>
      courses
        .map(
          (course) => `
            <li>
              <span class="course-code">${course.code}</span>
              <span class="course-name">
                <strong>${localized(course.title)}</strong>
                ${course.note ? `<em>${localized(course.note)}</em>` : ""}
              </span>
            </li>`,
        )
        .join("");
    const featured = data.teaching.featured;
    const youtube = data.teaching.youtube;
    return `
      <main id="main-content" class="page-shell inner-page">
        <header class="page-intro teaching-intro">
          <p class="eyebrow">Courses</p>
          <h1>${t("teachingTitle")}</h1>
          <p>${t("teachingIntro")}</p>
        </header>
        <section class="teaching-resources-grid" aria-label="${state.lang === "en" ? "Online learning resources" : "線上學習資源"}">
          <article class="featured-course" aria-labelledby="featured-course-title">
            <div class="featured-course-copy">
              <p class="eyebrow">${t("featuredCourse")}</p>
              <h2 id="featured-course-title">${localized(featured.title)}</h2>
              <p class="featured-course-description">${localized(featured.description)}</p>
              <div class="featured-course-meta">
                <span>${t("paidOnlineCourse")}</span>
                <span>${localized(featured.duration)}</span>
                <span>${localized(featured.provider)}</span>
              </div>
              <a class="button-link" href="${featured.url}" target="_blank" rel="noreferrer">${t("viewCourse")} ↗</a>
            </div>
            <div class="featured-course-visual" aria-hidden="true">
              <span>∂</span><span>∫</span><span>∇</span><span>Σ</span>
            </div>
          </article>
          <article class="youtube-resource" aria-labelledby="youtube-resource-title">
            <div class="youtube-resource-copy">
              <p class="eyebrow">${t("videoResources")}</p>
              <h2 id="youtube-resource-title">${t("youtubeChannel")}</h2>
              <p>${localized(youtube.description)}</p>
              <a class="button-link" href="${youtube.url}" target="_blank" rel="noreferrer">${t("visitYoutube")} ↗</a>
            </div>
            <div class="youtube-resource-mark" aria-hidden="true">
              <span class="youtube-play">▶</span>
              <strong>${youtube.handle}</strong>
              <small>${t("freeVideoChannel")}</small>
            </div>
          </article>
        </section>
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

  function presentationsPage() {
    const groups = data.presentations.reduce((result, presentation) => {
      const key = String(presentation.year);
      const existing = result.find((group) => group.year === key);
      if (existing) existing.items.push(presentation);
      else result.push({ year: key, items: [presentation] });
      return result;
    }, []);

    const presentationGroups = groups
      .map(
        (group, groupIndex) => `
          <section class="presentation-year-group" aria-labelledby="presentation-year-${groupIndex}">
            <div class="presentation-year">
              <h2 id="presentation-year-${groupIndex}">${group.year === "Forthcoming" ? t("forthcoming") : group.year}</h2>
              <span>${group.items.length.toString().padStart(2, "0")}</span>
            </div>
            <ol class="presentation-list">
              ${group.items
                .map(
                  (presentation) => `
                    <li class="presentation-item">
                      <div class="presentation-copy">
                        <h3>${presentation.title}</h3>
                        <p><em>${presentation.event}</em></p>
                      </div>
                      <div class="presentation-meta">
                        <span>${presentation.location}</span>
                      </div>
                    </li>`,
                )
                .join("")}
            </ol>
          </section>`,
      )
      .join("");

    const templatePreview = `
      <section class="presentation-template" aria-labelledby="presentation-template-title">
        <p class="eyebrow" id="presentation-template-title">${t("templatePreview")}</p>
        <div class="presentation-template-row">
          <strong>${t("templateYear")}</strong>
          <div>
            <h2>${t("templateTitle")}</h2>
            <p><em>${t("templateEvent")}</em></p>
          </div>
          <div class="presentation-meta">
            <span>${t("templateLocation")}</span>
          </div>
        </div>
      </section>`;

    return `
      <main id="main-content" class="page-shell inner-page">
        <header class="page-intro presentations-intro">
          <p class="eyebrow">Academic exchange</p>
          <h1>${t("presentationsTitle")}</h1>
          <p>${t("presentationsIntro")}</p>
        </header>
        ${data.presentations.length ? `
          <div class="presentation-summary">
            <strong>${data.presentations.length}</strong>
            <span>${t("presentationCount")}</span>
          </div>
          <div class="presentation-section">${presentationGroups}</div>` : templatePreview}
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

  function render(preserveScroll = false) {
    window.clearInterval(featuredTimer);
    const currentRoute = route();
    document.documentElement.dataset.theme = state.theme;
    document.documentElement.style.colorScheme = state.theme;
    const themeColor = document.querySelector("#theme-color");
    if (themeColor) themeColor.content = state.theme === "dark" ? "#101411" : "#f3f1ec";
    document.documentElement.lang = state.lang === "zh" ? "zh-Hant" : "en";
    document.title = `${
      currentRoute === "home" ? data.profile.name : t(currentRoute)
    } | National Taiwan University`;
    const page = {
      home: homePage,
      featured: featuredPage,
      research: researchPage,
      browse: browsePage,
      people: peoplePage,
      presentations: presentationsPage,
      teaching: teachingPage,
    }[currentRoute]();
    app.innerHTML = `${header()}${page}${footer()}`;
    if (!preserveScroll) window.scrollTo({ top: 0, behavior: "instant" });
    if (currentRoute === "browse") applyBrowseFilters();
    if (currentRoute === "featured" && !state.featuredPaused) {
      featuredTimer = window.setInterval(() => {
        state.featuredIndex = (state.featuredIndex + 1) % data.featuredFindings.length;
        updateFeaturedHash();
      }, 7000);
    }
  }

  function updateFeaturedHash() {
    const nextHash = `#/featured?slide=${state.featuredIndex + 1}`;
    window.history.replaceState(null, "", nextHash);
    render(true);
  }

  function applyBrowseFilters() {
    const query = state.browseQuery.trim().toLowerCase();
    let visibleCount = 0;
    document.querySelectorAll("[data-paper-row]").forEach((row) => {
      const matchesText = !query || row.dataset.search.includes(query);
      const matchesStatus = state.browseStatuses.size === 0 || state.browseStatuses.has(row.dataset.status);
      row.hidden = !(matchesText && matchesStatus);
      if (!row.hidden) visibleCount += 1;
    });
    const count = document.querySelector("[data-result-count]");
    const empty = document.querySelector("[data-browse-empty]");
    if (count) count.textContent = visibleCount;
    if (empty) empty.hidden = visibleCount !== 0;
  }

  document.addEventListener("click", (event) => {
    const themeButton = event.target.closest("[data-theme-toggle]");
    if (themeButton) {
      state.theme = state.theme === "dark" ? "light" : "dark";
      localStorage.setItem("jwc-theme", state.theme);
      render();
      return;
    }

    const languageButton = event.target.closest("[data-lang]");
    if (languageButton) {
      state.lang = languageButton.dataset.lang;
      localStorage.setItem("jwc-lang", state.lang);
      render();
      return;
    }

    const methodButton = event.target.closest("[data-method-filter]");
    if (methodButton) {
      state.researchMethod = methodButton.dataset.methodFilter;
      render(true);
      return;
    }

    const featuredButton = event.target.closest("[data-featured-index], [data-featured-step]");
    if (featuredButton) {
      state.featuredPaused = true;
      if (featuredButton.dataset.featuredIndex !== undefined) {
        state.featuredIndex = Number(featuredButton.dataset.featuredIndex);
      } else {
        state.featuredIndex = (state.featuredIndex + Number(featuredButton.dataset.featuredStep) + data.featuredFindings.length) % data.featuredFindings.length;
      }
      updateFeaturedHash();
      return;
    }

    const statusButton = event.target.closest("[data-status-filter]");
    if (statusButton) {
      const status = statusButton.dataset.statusFilter;
      if (state.browseStatuses.has(status)) state.browseStatuses.delete(status);
      else state.browseStatuses.add(status);
      statusButton.classList.toggle("is-active", state.browseStatuses.has(status));
      statusButton.setAttribute("aria-pressed", String(state.browseStatuses.has(status)));
      applyBrowseFilters();
    }
  });

  document.addEventListener("input", (event) => {
    if (!event.target.matches("[data-paper-search]")) return;
    state.browseQuery = event.target.value;
    applyBrowseFilters();
  });

  window.addEventListener("hashchange", () => render());
  render();
})();
