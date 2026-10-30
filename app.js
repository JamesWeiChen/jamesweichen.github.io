(function () {
  "use strict";

  const data = window.siteData;
  const app = document.querySelector("#app");
  const state = {
    lang: window.sitePreferences.language(),
    theme: document.documentElement.dataset.theme === "light" ? "light" : "dark",
    researchMethod: "all",
    featuredIndex: 0,
    // Auto-rotation never starts for visitors who prefer reduced motion.
    featuredPaused: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    browseQuery: "",
    browseStatuses: new Set(),
  };
  let featuredTimer;

  const copy = {
    en: {
      ...data.nav.en,
      greeting: "Greetings!",
      contact: "Email",
      scholar: "Google Scholar",
      orcid: "ORCID",
      crossing: "Crossing Column",
      department: "Department",
      facebook: "Facebook",
      linkedin: "LinkedIn",
      researchIntro: "We study economic decisions as they happen - from attention and learning to the institutions that shape behavior.",
      selected: "At a glance",
      publications: "publications",
      latestNews: "Lab news",
      allNews: "Current and recent milestones from the lab.",
      seeAllFindings: "See all findings",
      readFinding: "Read the finding",
      researchAtlas: "Research atlas",
      whereWeWork: "Where we work",
      methodsAtlas: "Methods atlas",
      filterResearch: "Filter research",
      portraitOf: "Portrait of",
      theLab: "The lab",
      openPositions: "Open positions",
      courses: "Courses",
      academicExchange: "Academic exchange",
      selectedEvidence: "Selected evidence",
      featuredIntro: "Five results from our published work on learning, strategic reasoning, behavioral models, and scientific institutions.",
      previousFinding: "Previous finding",
      nextFinding: "Next finding",
      showFinding: "Show finding",
      playRotation: "Play rotation",
      pauseRotation: "Pause rotation",
      readSource: "Read the source",
      methodsMap: "Methods map",
      mapTitle: "Research methods map",
      mapIntro: "Explore the lab by how evidence is produced, from behavioral experiments and process tracing to computational models and field evidence.",
      researchMethods: "Research methods",
      all: "All work",
      published: "Published",
      working: "Working papers",
      rr: "R&R",
      projectUnit: "projects",
      researchArea: "Research area",
      showAllAreas: "Show all areas",
      papersAndProjects: "Papers & projects",
      researchViews: "Research views",
      noMatches: "No papers match these filters.",
      browseAll: "Browse all papers",
      browseIntro: "Search by title, author, venue, or year, then narrow the list by publication status.",
      paperFilters: "Paper filters",
      searchPapers: "Search papers",
      searchPlaceholder: "Title, author, venue, year…",
      results: "results",
      labTitle: "Lab members",
      labIntro: "Current students, former students, and research assistants advised or supervised in the lab.",
      current: "Current students",
      currentResearchAssistants: "Current research assistants",
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
      onlineLearningResources: "Online learning resources",
      appsTitle: "Apps by Wei James Chen",
      appsIntro: "Two small tools I built for the moments when good software can make a real difference: presenting your work and finding your way through a conference.",
      independentProjects: "Independent projects",
      beamerCategory: "PRESENTATION TOOL",
      acadendaCategory: "CONFERENCE PLANNER",
      beamerDescription: "A presenter for LaTeX Beamer PDFs. Keep your slides, private speaker notes, and next-slide preview on your iPad while the audience sees only the slides. Annotate with Apple Pencil, and use your iPhone as a remote.",
      acadendaDescription: "Turn a conference programme PDF into a schedule you can navigate. Explore sessions and speakers, find talks matched to your research interests, and keep notes with your agenda.",
      appStore: "Download on the App Store",
      attendeesTitle: "For attendees",
      attendeesText: "Turn your program PDF into a schedule in seven illustrated steps.",
      pdfImportGuide: "PDF import guide",
      organizersTitle: "For conference organizers",
      organizersText: "Preview a published agenda, venue maps, and the links attendees use to import your program.",
      organizerDemo: "View organizer demo",
      freeVideoChannel: "Free teaching videos",
      visitYoutube: "Visit YouTube channel",
      download: "Download CV",
      updated: "Content updated September 2026",
    },
    zh: {
      ...data.nav.zh,
      greeting: "你好！",
      contact: "電子郵件",
      scholar: "Google Scholar",
      orcid: "ORCID",
      crossing: "換日線專欄",
      department: "系所網站",
      facebook: "Facebook",
      linkedin: "LinkedIn",
      researchIntro: "我們研究經濟決策如何形成，包括注意力、學習，以及制度如何影響行為。",
      selected: "研究概覽",
      publications: "篇已發表論文",
      latestNews: "實驗室消息",
      allNews: "實驗室近期消息。",
      seeAllFindings: "查看全部發現",
      readFinding: "閱讀完整發現",
      researchAtlas: "研究地圖",
      whereWeWork: "我們關注的研究領域",
      methodsAtlas: "研究方法總覽",
      filterResearch: "篩選研究",
      portraitOf: "肖像：",
      theLab: "實驗室",
      openPositions: "招募資訊",
      courses: "課程",
      academicExchange: "學術交流",
      selectedEvidence: "精選研究證據",
      featuredIntro: "五項已發表研究的主要發現，涵蓋學習、策略推理、行為模型與科學制度。",
      previousFinding: "上一項發現",
      nextFinding: "下一項發現",
      showFinding: "顯示發現",
      playRotation: "播放輪播",
      pauseRotation: "暫停輪播",
      readSource: "閱讀研究來源",
      methodsMap: "研究方法地圖",
      mapTitle: "研究方法地圖",
      mapIntro: "可依研究方法瀏覽實驗室成果，包括行為實驗、歷程追蹤、計算模型與田野研究。",
      researchMethods: "研究方法",
      all: "全部研究",
      published: "已發表",
      working: "工作論文",
      rr: "修訂中",
      projectUnit: "項研究",
      researchArea: "研究領域",
      showAllAreas: "顯示全部領域",
      papersAndProjects: "論文與研究計畫",
      researchViews: "研究瀏覽方式",
      noMatches: "沒有符合目前條件的論文。",
      browseAll: "瀏覽所有論文",
      browseIntro: "依標題、作者、期刊或年份搜尋，並可用發表狀態縮小範圍。",
      paperFilters: "論文篩選",
      searchPapers: "搜尋論文",
      searchPlaceholder: "標題、作者、期刊、年份…",
      results: "筆結果",
      labTitle: "實驗室成員",
      labIntro: "這裡列出目前與過去指導的學生，以及現任與歷任研究助理。",
      current: "現任學生",
      currentResearchAssistants: "現任研究助理",
      formerStudents: "畢業學生",
      formerResearchAssistants: "歷任研究助理",
      presentationsTitle: "研討會紀錄",
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
      teachingIntro: "這裡整理我在國立臺灣大學與國立中央大學開設的課程，另有付費線上課程與免費影音。",
      ntu: "國立臺灣大學",
      ncu: "國立中央大學",
      featuredCourse: "精選線上課程",
      paidOnlineCourse: "自學型付費課程",
      viewCourse: "查看課程",
      videoResources: "免費影音資源",
      youtubeChannel: "Wei James Chen 的 YouTube 頻道",
      onlineLearningResources: "線上學習資源",
      appsTitle: "我製作的 App",
      appsIntro: "我為簡報與學術研討會打造了兩款工具，希望在準備演講、安排議程與記錄交流時，讓事情更簡單。",
      independentProjects: "個人作品",
      beamerCategory: "簡報工具",
      acadendaCategory: "研討會議程工具",
      beamerDescription: "專為 LaTeX Beamer PDF 設計的簡報工具。在 iPad 上查看投影片、私人講稿與下一張預覽，觀眾只會看到投影片；也可用 Apple Pencil 手寫標註，並以 iPhone 遙控簡報。",
      acadendaDescription: "把研討會議程 PDF 轉成方便瀏覽的行程。查看場次與講者、依研究興趣探索推薦演講，並在議程中整理筆記。",
      appStore: "前往 App Store 下載",
      attendeesTitle: "給一般使用者",
      attendeesText: "跟著 7 個圖文步驟，把議程 PDF 變成行程。",
      pdfImportGuide: "查看 PDF 匯入教學",
      organizersTitle: "給會議主辦方",
      organizersText: "預覽會議議程網頁、會場地圖，以及提供給與會者的議程匯入連結。",
      organizerDemo: "查看主辦方示範",
      freeVideoChannel: "免費教學影片",
      visitYoutube: "前往 YouTube 頻道",
      download: "下載 CV",
      updated: "內容更新於 2026 年 9 月",
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
    return ["featured", "research", "browse", "lab", "presentations", "teaching", "apps"].includes(value) ? value : "home";
  }

  function header() {
    return window.renderSiteHeader(state.lang, route(), './');
  }

  function socialLinks() {
    return `
      <div class="hero-links">
        <a href="mailto:${data.profile.email}"><span class="material-symbols-rounded hero-link-icon" aria-hidden="true">mail</span><span>${t("contact")}</span><span aria-hidden="true">↗</span></a>
        <a href="${data.profile.scholar}" target="_blank" rel="noreferrer"><span class="material-symbols-rounded hero-link-icon" aria-hidden="true">school</span><span>${t("scholar")}</span><span aria-hidden="true">↗</span></a>
        <a href="${data.profile.orcid}" target="_blank" rel="me noreferrer"><span class="material-symbols-rounded hero-link-icon" aria-hidden="true">fingerprint</span><span>${t("orcid")}</span><span aria-hidden="true">↗</span></a>
        <a href="${data.profile.crossing}" target="_blank" rel="noreferrer"><span class="material-symbols-rounded hero-link-icon" aria-hidden="true">article</span><span>${t("crossing")}</span><span aria-hidden="true">↗</span></a>
        <a href="${data.profile.department}" target="_blank" rel="noreferrer"><span class="material-symbols-rounded hero-link-icon" aria-hidden="true">account_balance</span><span>${t("department")}</span><span aria-hidden="true">↗</span></a>
        <a href="${data.profile.facebook}" target="_blank" rel="noreferrer"><span class="material-symbols-rounded hero-link-icon" aria-hidden="true">public</span><span>${t("facebook")}</span><span aria-hidden="true">↗</span></a>
        <a href="${data.profile.linkedin}" target="_blank" rel="noreferrer"><span class="material-symbols-rounded hero-link-icon" aria-hidden="true">work</span><span>${t("linkedin")}</span><span aria-hidden="true">↗</span></a>
        <a href="${data.profile.cv}" target="_blank" rel="noreferrer"><span class="material-symbols-rounded hero-link-icon" aria-hidden="true">description</span><span>${t("download")}</span><span aria-hidden="true">↗</span></a>
      </div>`;
  }

  function homePage() {
    const bios = data.bio[state.lang].map((paragraph) => `<p>${paragraph}</p>`).join("");
    const distinction = data.profile.distinction;
    const distinctionMarkup = `
      <aside class="hero-distinction" aria-label="${localized(distinction.title)}">
        <span class="material-symbols-rounded hero-distinction-icon" aria-hidden="true">emoji_events</span>
        <div class="hero-distinction-copy">
          <span class="hero-distinction-years">${distinction.years}</span>
          <strong>${localized(distinction.title)}</strong>
          <span>${localized(distinction.program)}</span>
        </div>
      </aside>`;
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
            <p>${item.url
              ? `<a href="${item.url}" target="_blank" rel="noreferrer">${item[state.lang]} <span aria-hidden="true">↗</span></a>`
              : item[state.lang]}</p>
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
            <span class="finding-preview-link">${t("readFinding")} →</span>
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
            ${distinctionMarkup}
            ${socialLinks()}
          </div>
          <figure class="portrait-frame">
            <img src="${data.profile.image}" alt="${t("portraitOf")} ${data.profile.name}" />
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
            <a class="text-link" href="#/featured">${t("seeAllFindings")} →</a>
          </div>
          <div class="finding-preview-grid">${findings}</div>
        </section>

        <section class="themes-section page-shell section-rule" aria-labelledby="themes-title">
          <div class="section-heading compact-heading">
            <div>
              <p class="eyebrow">${t("researchAtlas")}</p>
              <h2 id="themes-title">${t("whereWeWork")}</h2>
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
      ["research", t("methodsMap")],
      ["browse", t("browseAll")],
    ];
    return `
      <nav class="research-subnav" aria-label="${t("researchViews")}">
        ${links
          .map(([path, label]) => `<a href="#/${path}" class="${route() === path ? "is-active" : ""}"${route() === path ? ' aria-current="page"' : ""}>${label}</a>`)
          .join("")}
      </nav>`;
  }

  function featuredSpotlight() {
    const finding = data.featuredFindings[state.featuredIndex];
    return `
        <section class="featured-spotlight" aria-live="${state.featuredPaused ? "polite" : "off"}">
          <div class="featured-metric">
            <span class="finding-category">${localized(finding.category)}</span>
            <strong>${finding.number}</strong>
            <span>${localized(finding.unit)}</span>
          </div>
          <article class="featured-copy">
            <p class="featured-count">${String(state.featuredIndex + 1).padStart(2, "0")} / ${String(data.featuredFindings.length).padStart(2, "0")}</p>
            <h2>${localized(finding.title)}</h2>
            <p class="featured-authors">${finding.authors}<br />${finding.venue}</p>
            <p class="featured-summary">${localized(finding.finding)}</p>
            <a class="button-link" href="${finding.link}" target="_blank" rel="noreferrer">${t("readSource")} ↗</a>
          </article>
        </section>`;
  }

  function featuredDots() {
    return data.featuredFindings
      .map(
        (_, index) => `<button type="button" class="featured-dot${index === state.featuredIndex ? " is-active" : ""}" data-featured-index="${index}" aria-label="${t("showFinding")} ${index + 1}"${index === state.featuredIndex ? ' aria-current="true"' : ""}></button>`,
      )
      .join("");
  }

  function featuredToggle() {
    const label = state.featuredPaused ? t("playRotation") : t("pauseRotation");
    return `<button type="button" class="featured-toggle" data-featured-toggle aria-label="${label}" title="${label}">${state.featuredPaused ? "▶" : "❚❚"}</button>`;
  }

  function featuredPage() {
    const query = new URLSearchParams(window.location.hash.split("?")[1] || "");
    const requestedSlide = Number(query.get("slide"));
    if (Number.isInteger(requestedSlide) && requestedSlide >= 1 && requestedSlide <= data.featuredFindings.length) {
      state.featuredIndex = requestedSlide - 1;
    }
    return `
      <main id="main-content" class="page-shell inner-page featured-page">
        ${researchSubnav()}
        <header class="page-intro">
          <p class="eyebrow">${t("selectedEvidence")}</p>
          <h1>${t("featured")}</h1>
          <p>${t("featuredIntro")}</p>
        </header>
        ${featuredSpotlight()}
        <div class="featured-controls">
          <div class="featured-dots">${featuredDots()}</div>
          <div class="featured-arrows">
            ${featuredToggle()}
            <button type="button" data-featured-step="-1" aria-label="${t("previousFinding")}">←</button>
            <button type="button" data-featured-step="1" aria-label="${t("nextFinding")}">→</button>
          </div>
        </div>
      </main>`;
  }

  function researchPage() {
    const query = new URLSearchParams(window.location.hash.split("?")[1] || "");
    const theme = data.themes.find((item) => item.id === query.get("theme"));
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
    // Card counts and the list both use the theme-filtered set so they always agree.
    const allPapers = [...data.publications, ...data.workingPapers].filter(
      (paper) => !theme || paper.themes.includes(theme.id),
    );
    const visible = allPapers.filter(
      (paper) => state.researchMethod === "all" || paper.method === state.researchMethod,
    );
    const themeNotice = theme
      ? `
          <div class="theme-filter-notice">
            <span>${t("researchArea")}: <strong>${localized(theme.title)}</strong></span>
            <a href="#/research">${t("showAllAreas")} ✕</a>
          </div>`
      : "";
    const cards = data.methods
      .map(
        (method) => `
          <button type="button" class="method-card${state.researchMethod === method.id ? " is-active" : ""}" data-method-filter="${method.id}">
            <span class="map-card-number">${method.number}</span>
            <span class="map-card-title">${localized(method.title)}</span>
            <span class="map-card-copy">${localized(method.text)}</span>
            <span class="tag-line">${localized(method.tags)}</span>
            <span class="method-count">${allPapers.filter((paper) => paper.method === method.id).length} ${t("projectUnit")}</span>
          </button>`,
      )
      .join("");

    return `
      <main id="main-content" class="page-shell inner-page">
        ${researchSubnav()}
        <header class="page-intro">
          <p class="eyebrow">${t("methodsAtlas")} · ${allPapers.length} ${t("projectUnit")}</p>
          <h1>${t("mapTitle")}</h1>
          <p>${t("mapIntro")}</p>
        </header>
        <section class="methods-map" aria-label="${t("researchMethods")}">${cards}</section>
        <section class="paper-section section-rule" aria-labelledby="paper-list-title">
          <div class="paper-toolbar">
            <h2 id="paper-list-title">${t("papersAndProjects")}</h2>
            <div class="filter-group" aria-label="${t("filterResearch")}">${filterButtons}</div>
          </div>
          ${themeNotice}
          <div class="paper-list">${visible.map(paperRow).join("")}</div>
          ${visible.length ? "" : `<p class="browse-empty">${t("noMatches")}</p>`}
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
          <p class="eyebrow">${allPapers.length} ${t("projectUnit")}</p>
          <h1>${t("browseAll")}</h1>
          <p>${t("browseIntro")}</p>
        </header>
        <section class="browse-controls" aria-label="${t("paperFilters")}">
          <label class="paper-search">
            <span>${t("searchPapers")}</span>
            <input type="search" data-paper-search value="${escapeAttribute(state.browseQuery)}" placeholder="${t("searchPlaceholder")}" />
          </label>
          <div class="browse-statuses">
            ${statusOptions
              .map(([status, label]) => `<button type="button" data-status-filter="${status}" aria-pressed="${state.browseStatuses.has(status)}" class="filter-button${state.browseStatuses.has(status) ? " is-active" : ""}">${label}</button>`)
              .join("")}
          </div>
        </section>
        <div class="browse-result-line"><strong data-result-count>${allPapers.length}</strong> ${t("results")}</div>
        <section class="paper-list browse-paper-list">${allPapers.map(paperRow).join("")}</section>
        <p class="browse-empty" data-browse-empty hidden>${t("noMatches")}</p>
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

  function labPage() {
    const personCards = (people) => people
      .map(
        (person) => `
          <article class="person-card">
            <div class="person-avatar avatar-3" aria-hidden="true">${initials(person.name)}</div>
            <div>
              <p class="person-role">${localized(person.role)}</p>
              <h3>${person.name} <span>${person.nameZh}</span></h3>
              <p>${localized(person.bio)}</p>
            </div>
          </article>`,
      )
      .join("");
    const current = personCards(data.people.current);
    const currentResearchAssistants = personCards(data.people.currentResearchAssistants);
    const awardCategory = {
      general: { en: "General", zh: "一般類" },
      policy: { en: "Policy", zh: "政策類" },
    };
    const awardLevel = {
      first: { en: "First Prize", zh: "最佳獎" },
      honorable: { en: "Honorable Mention", zh: "佳作" },
    };
    const thesisAwardName = {
      en: "Taiwan Economic Association Best Master’s Thesis Award",
      zh: "臺灣經濟學會最佳碩士論文獎",
    };
    const awardBadge = (award, year) => {
      const category = localized(awardCategory[award.category]);
      const level = localized(awardLevel[award.level]);
      const label = `${category} · ${level}`;
      const fullLabel = state.lang === "en"
        ? `Taiwan Economic Association Best Master’s Thesis Award ${year}: ${category}, ${level}`
        : `臺灣經濟學會最佳碩士論文獎 ${year}：${category}，${level}`;
      return `
        <span class="thesis-award thesis-award-${award.category} thesis-award-${award.level}" title="${fullLabel}" aria-label="${fullLabel}">
          <span class="thesis-award-icon" aria-hidden="true">
            <span class="material-symbols-rounded thesis-award-rank">${award.level === "first" ? "emoji_events" : "military_tech"}</span>
            <span class="thesis-award-category">${award.category === "general" ? "G" : "P"}</span>
          </span>
          <span>${label}</span>
        </span>`;
    };
    const alumniList = (people) =>
      people
        .map(
          (person) => `
            <li>
              <span>${person.name}</span>
              <small>
                <span>${localized(person.title)}</span>
                ${person.current ? `<span class="alumni-current">${localized(person.current)}</span>` : ""}
              </small>
              ${person.awards && person.awards.length ? `
                <div class="alumni-awards">
                  <span class="alumni-award-name">${localized(thesisAwardName)} · ${person.awardYear}</span>
                  <div class="alumni-award-badges">${person.awards.map((award) => awardBadge(award, person.awardYear)).join("")}</div>
                </div>` : ""}
            </li>`,
        )
        .join("");
    const formerStudents = alumniList(data.people.formerStudents);
    const formerResearchAssistants = alumniList(data.people.formerResearchAssistants);

    return `
      <main id="main-content" class="page-shell inner-page">
        <header class="page-intro lab-intro">
          <p class="eyebrow">${t("theLab")}</p>
          <h1>${t("labTitle")}</h1>
          <p>${t("labIntro")}</p>
        </header>
        <section class="lab-section section-rule" aria-labelledby="current-title">
          <div class="split-heading">
            <h2 id="current-title">${t("current")}</h2>
            <span>${data.people.current.length.toString().padStart(2, "0")}</span>
          </div>
          <div class="people-grid">${current}</div>
        </section>
        <section class="lab-section section-rule" aria-labelledby="current-ra-title">
          <div class="split-heading">
            <h2 id="current-ra-title">${t("currentResearchAssistants")}</h2>
            <span>${data.people.currentResearchAssistants.length.toString().padStart(2, "0")}</span>
          </div>
          <div class="people-grid">${currentResearchAssistants}</div>
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
            <p class="eyebrow">${t("openPositions")}</p>
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
          <p class="eyebrow">${t("courses")}</p>
          <h1>${t("teachingTitle")}</h1>
          <p>${t("teachingIntro")}</p>
        </header>
        <section class="teaching-resources-grid" aria-label="${t("onlineLearningResources")}">
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

  function appsPage() {
    const apps = [
      {
        name: "Beamer Notes",
        mark: "BN",
        category: t("beamerCategory"),
        description: t("beamerDescription"),
        url: "https://apps.apple.com/tw/app/beamer-notes/id6810103112",
        className: "app-card-beamer",
      },
      {
        name: "Acadenda",
        mark: "A",
        category: t("acadendaCategory"),
        description: t("acadendaDescription"),
        url: "https://apps.apple.com/tw/app/acadenda/id6812816802",
        className: "app-card-acadenda",
      },
    ];
    return `
      <main id="main-content" class="page-shell inner-page apps-page">
        <header class="page-intro">
          <p class="eyebrow">${t("independentProjects")}</p>
          <h1>${t("appsTitle")}</h1>
          <p>${t("appsIntro")}</p>

        </header>
        <section class="apps-grid" aria-label="${t("appsTitle")}">
          ${apps.map((app) => `
            <article class="app-card ${app.className}">
              <div class="app-card-top">
                <span class="app-mark" aria-hidden="true">${app.mark}</span>
                <span class="app-category">${app.category}</span>
              </div>
              <h2>${app.name}</h2>
              <p>${app.description}</p>
              <a class="button-link app-download-button" href="${app.url}" target="_blank" rel="noreferrer">${t("appStore")} ↗</a>
              ${app.className === "app-card-acadenda" ? `
        <div class="app-resources">
        <aside class="app-guide-panel" aria-labelledby="app-guide-title">
          <span class="app-guide-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5.5C9 3.5 5 3.5 2 5v14c3-1.5 7-1.5 10 .5 3-2 7-2 10-.5V5c-3-1.5-7-1.5-10 .5Z"/><path d="M12 5.5v14"/></svg></span>
          <div class="app-guide-copy">
            <h3 id="app-guide-title">${t("attendeesTitle")}</h3>
            <p>${t("attendeesText")}</p>
          </div>
          <a class="app-guide-button" href="${state.lang === "en" ? "./acadenda/guide.html" : "./acadenda/guide-zh.html"}?lang=${window.sitePreferences.languageMode}">${t("pdfImportGuide")}<span aria-hidden="true">→</span></a>
        </aside>
        <aside class="app-guide-panel" aria-labelledby="app-organizer-title">
          <span class="app-guide-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4M17 3v4M3 10h18M7 14h2M12 14h5M7 17h2M12 17h5"/></svg></span>
          <div class="app-guide-copy">
            <h3 id="app-organizer-title">${t("organizersTitle")}</h3>
            <p>${t("organizersText")}</p>
          </div>
          <a class="app-demo-button app-guide-button" href="./acadenda/conferences/official-demo/?lang=${window.sitePreferences.languageMode}">${t("organizerDemo")}<span aria-hidden="true">→</span></a>
        </aside>
        </div>` : ""}
            </article>`).join("")}
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
          <p class="eyebrow">${t("academicExchange")}</p>
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

  // Theme is CSS-driven through data-theme, so switching it never needs a re-render.
  function applyDocumentTheme() {
    document.documentElement.dataset.theme = state.theme;
    document.documentElement.style.colorScheme = state.theme;
    const themeColor = document.querySelector("#theme-color");
    if (themeColor) themeColor.content = state.theme === "dark" ? "#101411" : "#f3f1ec";
  }

  function render(preserveScroll = false) {
    window.clearInterval(featuredTimer);
    const currentRoute = route();
    applyDocumentTheme();
    document.documentElement.lang = state.lang === "zh" ? "zh-Hant" : "en";
    document.title = `${
      currentRoute === "home" ? data.profile.name : t(currentRoute)
    } | National Taiwan University`;
    const page = {
      home: homePage,
      featured: featuredPage,
      research: researchPage,
      browse: browsePage,
      lab: labPage,
      presentations: presentationsPage,
      teaching: teachingPage,
      apps: appsPage,
    }[currentRoute]();
    app.innerHTML = `${header()}${page}${footer()}`;
    if (!preserveScroll) window.scrollTo({ top: 0, behavior: "instant" });
    if (currentRoute === "browse") applyBrowseFilters();
    if (currentRoute === "featured") startFeaturedTimer();
  }

  function startFeaturedTimer() {
    window.clearInterval(featuredTimer);
    if (state.featuredPaused) return;
    featuredTimer = window.setInterval(() => {
      state.featuredIndex = (state.featuredIndex + 1) % data.featuredFindings.length;
      updateFeatured();
    }, 7000);
  }

  // Swap only the slide and its controls so focus elsewhere on the page survives.
  function updateFeatured() {
    window.history.replaceState(null, "", `#/featured?slide=${state.featuredIndex + 1}`);
    const spotlight = document.querySelector(".featured-spotlight");
    const dots = document.querySelector(".featured-dots");
    const toggle = document.querySelector("[data-featured-toggle]");
    if (!spotlight || !dots || !toggle) return render(true);
    const focusedDot = document.activeElement && document.activeElement.matches(".featured-dot");
    const focusedToggle = document.activeElement === toggle;
    spotlight.outerHTML = featuredSpotlight();
    dots.innerHTML = featuredDots();
    toggle.outerHTML = featuredToggle();
    if (focusedDot) dots.querySelector(".featured-dot.is-active").focus();
    if (focusedToggle) document.querySelector("[data-featured-toggle]").focus();
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

  window.addEventListener("site-theme-change", () => {
    state.theme = document.documentElement.dataset.theme;
    applyDocumentTheme();
  });

  document.addEventListener('change', event => {
    if (event.target.matches('[data-theme-select]')) window.sitePreferences.setTheme(event.target.value);
    if (event.target.matches('[data-language-select]')) {
      window.sitePreferences.setLanguage(event.target.value);
      state.lang = window.sitePreferences.language();
      render(true);
    }
  });
  window.addEventListener('languagechange', () => {
    if (window.sitePreferences.languageMode === 'system') { state.lang = window.sitePreferences.language(); render(true); }
  });
  document.addEventListener("click", (event) => {
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
      window.clearInterval(featuredTimer);
      updateFeatured();
      return;
    }

    if (event.target.closest("[data-featured-toggle]")) {
      state.featuredPaused = !state.featuredPaused;
      updateFeatured();
      startFeaturedTimer();
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

  window.addEventListener("hashchange", () => {
    // A new route or research area starts from all methods, so a stale method never empties the list.
    state.researchMethod = "all";
    render();
  });
  render();
})();
