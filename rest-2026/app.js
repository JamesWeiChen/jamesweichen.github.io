'use strict';
// Every schedule string is set with textContent; the program JSON is never inserted as HTML.
const PROGRAM_URL = 'program.json';
const PROGRAM_LINK = 'https://jamesweichen.github.io/rest-2026/program.json';

const COPY = {
  en: {
    sourcePdf: 'Program PDF ↗', sourcePage: 'Organizer’s announcement ↗',
    abstract: 'Abstract',
    appearance: 'Appearance', themeSystem: 'System', themeLight: 'Light', themeDark: 'Dark',
    language: 'Language', langSystem: 'System',
    navAria: 'Conference sections', navAcadenda: 'Acadenda', navProgram: 'Program', navVenue: 'Venue Map', navFunRun: 'Fun Run',
    acadendaTitle: 'Use this program in Acadenda', importTitle: 'Import the program',
    importText: 'Scan the code with Acadenda, or copy the link and paste it into the app.',
    importCaption: 'Links to the program file, not to this page.', copyLink: 'Copy program link',
    qrAlt: 'QR code for the program JSON link', appTitle: 'Get Acadenda for iOS',
    appText: 'Scan the code with your iPhone, or open the App Store page.',
    appQrAlt: 'QR code for the Acadenda page on the App Store', appCaption: 'Opens the Acadenda page on the App Store.',
    appLink: 'Get Acadenda on the App Store',
    step1: 'Install Acadenda from the App Store.', step2: 'In Acadenda, open Conference → Import → Add from a Link.',
    step3: 'Paste the program link, or scan the QR code with the app’s scanner.', step4: 'Preview the schedule, then tap Add to my conferences.',
    linkNote: 'The program link stays the same when the schedule is updated, so the QR code does not need to be replaced.',
    programTitle: 'Program', dayGroup: 'Choose a day',
    programRevision: date => `Source program · ${date}`,
    searchLabel: 'Search by name, affiliation, paper, abstract, session or room',
    searchPlaceholder: 'e.g. 陳暐, water, 農經二', venueTitle: 'Venue Map',
    venueText: 'Tap the image to view it full size.', funRunTitle: 'Fun Run / Walk',
    footerLine1: 'Independent conference companion · Powered by Acadenda',
    footerLine2: 'The program is compiled from the organizer’s conference schedule. This is not an official Rural Economics Society of Taiwan website.',
    navAuthor: 'About', authorTitle: 'About this page',
    authorText: 'This program companion was created by Wei James Chen, Assistant Professor at National Taiwan University.',
    authorButton: 'Visit the author’s page ↗',
    docTitle: 'REST 2026 Program', cityEn: 'Taipei, Taiwan',
    venueEn: 'Department of Agricultural Economics, National Taiwan University',
    venueMapTitle: 'Venue and Transport Map',
    resultCount: n => n === 1 ? '1 matching session' : `${n} matching sessions`,
    noMatching: 'No matching sessions.', noSessions: 'No sessions are listed for this day.',
    chair: 'Chair', moderator: 'Moderator', organizer: 'Session organizer',
    discussant: 'Discussant', sessionDiscussant: 'Session discussant', authors: 'Authors',
    unknownAffiliation: 'affiliation pending', role: (label, person) => `${label}: ${person}`,
    flag: 'Some details are marked for organizer confirmation.',
    throughout: 'Throughout the day', timeTbd: 'Time not specified',
    loading: 'Program unavailable', loadError: message => `The program could not be loaded (${message}). Refresh the page to try again.`,
    formatError: 'The program file has an unexpected format.',
    copied: 'Program link copied.', copyFailed: 'Copy failed. Select the link above and copy it.',
  },
  zh: {
    sourcePdf: '議程 PDF ↗', sourcePage: '主辦單位公告 ↗',
    abstract: '摘要',
    appearance: '外觀', themeSystem: '跟隨系統', themeLight: '淺色', themeDark: '深色',
    language: '語言', langSystem: '跟隨系統',
    navAria: '會議區塊', navAcadenda: 'Acadenda', navProgram: '議程', navVenue: '會場地圖', navFunRun: '趣跑',
    acadendaTitle: '在 Acadenda 中使用本議程', importTitle: '匯入議程',
    importText: '用 Acadenda 掃描 QR Code，或複製連結並貼到 App 中。',
    importCaption: '連結的是議程檔案，不是本網頁。', copyLink: '複製議程連結',
    qrAlt: '議程 JSON 連結的 QR Code', appTitle: '下載 iOS 版 Acadenda',
    appText: '用 iPhone 掃描 QR Code，或開啟 App Store 頁面。',
    appQrAlt: 'Acadenda App Store 頁面的 QR Code', appCaption: '開啟 App Store 上的 Acadenda 頁面。',
    appLink: '在 App Store 取得 Acadenda',
    step1: '從 App Store 安裝 Acadenda。', step2: '在 Acadenda 中開啟「會議」→「匯入」→「從連結加入」。',
    step3: '貼上議程連結，或用 App 的掃描功能掃描 QR Code。', step4: '預覽議程後，點選「加入我的會議」。',
    linkNote: '更新議程時連結不會改變，因此不需要更換 QR Code。',
    programTitle: '議程', dayGroup: '選擇日期',
    programRevision: date => `議程公告 · ${date}`,
    searchLabel: '搜尋姓名、所屬單位、論文、摘要、場次或會場',
    searchPlaceholder: '例如：陳暐、水資源、農經二', venueTitle: '會場地圖',
    venueText: '點擊圖片可查看完整大小。', funRunTitle: '趣跑／健走', venueMapTitle: '會場與交通地圖',
    footerLine1: '獨立會議輔助網站 · 由 Acadenda 提供技術支援',
    footerLine2: '議程依主辦單位公布的會議安排整理，非臺灣農村經濟學會官方網站。',
    navAuthor: '關於本頁', authorTitle: '關於本頁',
    authorText: '本議程網頁由陳暐（Wei James Chen）製作，國立臺灣大學農業經濟學系助理教授。',
    authorButton: '前往作者網站 ↗',
    docTitle: '2026年臺灣農村經濟學會年會暨學術研討會及永續水資源論壇 議程', 
    resultCount: n => `${n} 場符合`,
    noMatching: '沒有符合的場次。', noSessions: '這一天沒有列出場次。',
    chair: '主席', moderator: '主持人', organizer: '籌組人',
    discussant: '評論人', sessionDiscussant: '綜合評論人', authors: '作者',
    unknownAffiliation: '單位待確認', role: (label, person) => `${label}：${person}`,
    flag: '部分資訊待主辦單位確認。',
    throughout: '全天', timeTbd: '時間未定',
    loading: '議程無法載入', loadError: message => `無法載入議程（${message}）。請重新整理頁面。`,
    formatError: '議程檔案格式不正確。',
    copied: '已複製議程連結。', copyFailed: '複製失敗，請選取上方連結後手動複製。',
  },
};

const byID = id => document.getElementById(id);
let program = null;
let selectedDay = 0;
let lang = window.sitePreferences.language();

function t(key, ...values) {
  const entry = COPY[lang][key];
  return typeof entry === 'function' ? entry(...values) : entry;
}

// Same storage key and language preference as the main site, so the choice carries over.
const themeSelect = byID('theme');
const languageSelect = byID('language');
themeSelect.value = window.sitePreferences.theme;
themeSelect.addEventListener('change', () => window.sitePreferences.setTheme(themeSelect.value));
languageSelect.value = window.sitePreferences.languageMode;
languageSelect.addEventListener('change', () => {
  window.sitePreferences.setLanguage(languageSelect.value);
  setLanguage();
});
window.addEventListener('site-theme-change', () => { themeSelect.value = window.sitePreferences.theme; });
window.addEventListener('languagechange', () => {
  if (window.sitePreferences.languageMode === 'system') setLanguage();
});

function setLanguage() {
  lang = window.sitePreferences.language();
  languageSelect.value = window.sitePreferences.languageMode;
  if (program) renderAll();
  else applyStaticText();
}

// Text written in the HTML carries data-i18n keys so it switches with the language.
function applyStaticText() {
  document.documentElement.lang = lang === 'zh' ? 'zh-Hant' : 'en';
  for (const node of document.querySelectorAll('[data-i18n]')) node.textContent = t(node.dataset.i18n);
  for (const node of document.querySelectorAll('[data-i18n-attr]')) {
    const [attribute, key] = node.dataset.i18nAttr.split(':');
    node.setAttribute(attribute, t(key));
  }
}

function el(tag, text, className) {
  const element = document.createElement(tag);
  if (text) element.textContent = text;
  if (className) element.className = className;
  return element;
}
function dateRange(meta) {
  const [year, startMonth, startDay] = meta.startDate.split('-').map(Number);
  const [, endMonth, endDay] = meta.endDate.split('-').map(Number);
  if (lang === 'zh') {
    if (meta.startDate === meta.endDate) return `${year}年${startMonth}月${startDay}日`;
    return `${year}年${startMonth}月${startDay}日–${endMonth === startMonth ? '' : `${endMonth}月`}${endDay}日`;
  }
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  if (meta.startDate === meta.endDate) return `${months[startMonth - 1]} ${startDay}, ${year}`;
  return `${months[startMonth - 1]} ${startDay}–${months[endMonth - 1]} ${endDay}, ${year}`;
}
function dayLabel(day) {
  if (lang === 'zh') return day.label;
  return new Date(`${day.date}T00:00:00Z`).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', timeZone: 'UTC' });
}
function roomText(room) {
  if (lang !== 'en' || !room) return room;
  const restRooms = {'農經大講堂': 'Agricultural Economics Auditorium', '農經二': 'Agricultural Economics Room 2', '農經三': 'Agricultural Economics Room 3', '一樓研討室': '1F Seminar Room', '二樓會議室': '2F Conference Room'};
  if (restRooms[room]) return restRooms[room];
  if (room === '中庭') return 'Courtyard';
  if (room === '成大校園') return 'NCKU campus';
  const match = room.match(/^(北|南)棟 (\d+) 樓\s*(.*)$/);
  if (!match) return room.replace(/^場地\s*/, 'Room ');
  const [, building, floor, location] = match;
  const locationEn = location.replace('大演講廳', 'Main Auditorium').replace('玻璃屋', 'Glass Room')
    .replace('（經濟）', ' (Economics)').replace('（政治）', ' (Political Science)');
  return [`${building === '北' ? 'North' : 'South'} Building ${floor}F`, locationEn].filter(Boolean).join(' · ');
}
// Times are kept as the program's local wall-clock strings; they are never converted through Date.
function timeLabel(row) {
  if (row.startTime) return row.endTime ? `${row.startTime}–${row.endTime}` : row.startTime;
  return /throughout the day/i.test(row.title) ? t('throughout') : t('timeTbd');
}
function todayIndex() {
  const now = new Date();
  const iso = [now.getFullYear(), String(now.getMonth() + 1).padStart(2, '0'), String(now.getDate()).padStart(2, '0')].join('-');
  const index = program.days.findIndex(day => day.date === iso);
  return index >= 0 ? index : 0;
}
function query() {
  return byID('search').value.trim().toLowerCase();
}
function matches(q, ...values) {
  return values.some(value => value && value.toLowerCase().includes(q));
}
function itemMatches(item, q) {
  return matches(q, item.title, item.room, roomText(item.room), item.chair, item.chairAffiliation,
    item.organizer, item.organizerAffiliation, item.sessionDiscussant, item.sessionDiscussantAffiliation, item.subtitle, item.language);
}
function talkAbstract(talk) {
  return typeof talk.abstract === 'string' ? talk.abstract.trim() : '';
}

function talkMatches(talk, q) {
  return matches(q, talk.title, talk.speaker, talk.affiliation, talk.discussant, talk.discussantAffiliation, talkAbstract(talk),
    ...(talk.coauthors || []), ...(talk.coauthorAffiliations || []));
}
// Returns the talks to show for one item, or null when the item itself should be hidden.
function visibleTalks(item, q) {
  const talks = item.talks || [];
  if (!q || itemMatches(item, q)) return talks;
  const matching = talks.filter(talk => talkMatches(talk, q));
  return matching.length ? matching : null;
}

function personText(name, affiliation, showPending = false) {
  const unit = affiliation || (showPending ? t('unknownAffiliation') : '');
  return unit ? `${name} (${unit})` : name;
}

function roleText(key, person) {
  return t('role', t(key), person);
}

function authorLine(talk) {
  const line = el('p', '', 'authors');
  const isAuthorList = talk.authorRole === 'authors';
  const coauthors = (talk.coauthors || []).map((name, index) =>
    personText(name, talk.coauthorAffiliations?.[index], isAuthorList));
  if (isAuthorList) {
    const authors = [personText(talk.speaker, talk.affiliation, true), ...coauthors];
    line.textContent = roleText('authors', authors.join(lang === 'zh' ? '、' : '; '));
  } else {
    if (talk.speaker) {
      line.append(el('strong', talk.speaker, 'presenter'));
      if (talk.affiliation) line.append(` (${talk.affiliation})`);
    }
    if (coauthors.length) line.append(`${talk.speaker ? ', ' : ''}${coauthors.join(', ')}`);
  }
  return line;
}

function sessionCard(item, talks) {
  const card = el('article', '', talks.length || item.kind !== 'parallelSession' ? 'session' : 'session break');
  card.append(el('h3', item.title));
  if (item.subtitle) card.append(el('p', item.subtitle, 'detail'));
  if (item.language) {
    const language = lang === 'en' ? ({'中文場':'Chinese session','英文場':'English session','中英混合場':'Chinese / English session'}[item.language] || item.language) : item.language;
    card.append(el('p', language, 'detail'));
  }
  if (item.room) card.append(el('p', roomText(item.room), 'detail'));
  if (item.chair) card.append(el('p', roleText(item.chairRole || 'chair', personText(item.chair, item.chairAffiliation)), 'detail'));
  if (item.organizer) card.append(el('p', roleText('organizer', personText(item.organizer, item.organizerAffiliation)), 'detail'));
  if (item.sessionDiscussant) {
    card.append(el('p', roleText('sessionDiscussant', personText(item.sessionDiscussant, item.sessionDiscussantAffiliation)), 'detail discussant'));
  }
  if (item.uncertain?.length) card.append(el('p', t('flag'), 'flag'));
  for (const talk of talks) {
    const section = el('section', '', 'talk');
    section.append(el('strong', talk.title));
    if (talk.speaker || talk.coauthors?.length) section.append(authorLine(talk));
    if (talk.discussant) {
      section.append(el('p', roleText('discussant', personText([talk.discussant, talk.discussantTitle].filter(Boolean).join(' '), talk.discussantAffiliation)), 'detail discussant'));
    }
    if (talk.sourceNote) section.append(el('p', talk.sourceNote, 'detail'));
    if (talk.startTime) section.append(el('p', timeLabel(talk), 'detail'));
    if (talk.uncertain?.length) section.append(el('p', t('flag'), 'flag'));
    const abstract = talkAbstract(talk);
    if (abstract) {
      const details = el('details', '', 'talk-abstract');
      details.append(el('summary', t('abstract')), el('p', abstract, 'abstract-text'));
      section.append(details);
    }
    card.append(section);
  }
  return card;
}

function renderDay(day, q, showDate) {
  const fragment = document.createDocumentFragment();
  if (showDate) fragment.append(el('h3', dayLabel(day), 'day-heading'));
  let block = null;
  let lastLabel = null;
  let shown = 0;
  for (const item of day.items) {
    const talks = visibleTalks(item, q);
    if (talks === null) continue;
    const label = timeLabel(item);
    if (!block || label !== lastLabel) {
      block = el('div', '', 'time-block');
      block.append(el('p', label, 'time-label'));
      fragment.append(block);
      lastLabel = label;
    }
    block.append(sessionCard(item, talks));
    shown++;
  }
  return {fragment, shown};
}

function renderTabs() {
  const tabs = byID('day-tabs');
  tabs.replaceChildren();
  program.days.forEach((day, index) => {
    const button = el('button', dayLabel(day));
    button.type = 'button';
    button.setAttribute('aria-pressed', String(index === selectedDay));
    button.addEventListener('click', () => {
      selectedDay = index;
      renderTabs();
      renderSchedule();
    });
    tabs.append(button);
  });
  tabs.hidden = byID('search').value.trim() !== '';
}

function renderSchedule() {
  const q = query();
  const container = byID('schedule');
  const days = q ? program.days : [program.days[selectedDay]];
  const fragment = document.createDocumentFragment();
  let total = 0;
  for (const day of days) {
    const {fragment: dayFragment, shown} = renderDay(day, q, Boolean(q));
    fragment.append(dayFragment);
    total += shown;
  }
  if (!total) fragment.append(el('p', q ? t('noMatching') : t('noSessions'), 'muted'));
  container.replaceChildren(fragment);
  byID('result-count').textContent = q ? t('resultCount', total) : '';
  renderTabs();
}

// Returns the image link and caption for a map, or null when its URL is not HTTPS.
function renderMap(map, title) {
  let url;
  try { url = new URL(map.imageURL); } catch { return null; }
  if (url.protocol !== 'https:') return null;
  const link = el('a');
  link.href = url.href;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  const image = el('img');
  image.src = url.href;
  image.alt = title;
  image.loading = 'lazy';
  link.append(image);
  const caption = el('figcaption', title);
  return [link, caption];
}

// A section and its nav link are shown only when the program has content for them.
function setSectionVisible(id, visible) {
  byID(id).hidden = !visible;
  document.querySelector(`.site-nav a[href="#${id}"]`).hidden = !visible;
}

function renderFunRun() {
  const container = byID('fun-run-items');
  const fragment = document.createDocumentFragment();
  for (const day of program.days) {
    for (const item of day.items) {
      if (!/fun run/i.test(item.title)) continue;
      const block = el('div', '', 'time-block');
      block.append(el('p', `${dayLabel(day)} · ${timeLabel(item)}`, 'time-label'));
      block.append(sessionCard(item, []));
      fragment.append(block);
    }
  }
  const hasItems = fragment.childElementCount > 0;
  container.replaceChildren(fragment);
  return hasItems;
}

function renderMaps() {
  const maps = Array.isArray(program.conference.maps) ? program.conference.maps : [];
  const venue = maps.find(map => /venue/i.test(map.title));
  const funRun = maps.find(map => /fun run/i.test(map.title));
  const venueParts = venue && renderMap(venue, t('venueMapTitle'));
  const funRunParts = funRun && renderMap(funRun, funRun.title);
  byID('venue-map').replaceChildren(...(venueParts || []));
  byID('fun-run-map').replaceChildren(...(funRunParts || []));
  byID('fun-run-map').hidden = !funRunParts;
  return {venue: Boolean(venueParts), funRun: Boolean(funRunParts)};
}

// Re-running this on a language change keeps the chosen day and search text.
function renderAll() {
  applyStaticText();
  const meta = program.conference;
  const [city, venue] = lang === 'zh' ? [meta.city, meta.venue] : [COPY.en.cityEn, COPY.en.venueEn];
  byID('meta').textContent = [dateRange(meta), city, venue].filter(Boolean).join(' · ');
  const revision = byID('program-revision');
  revision.textContent = meta.programRevision
    ? t('programRevision', new Date(`${meta.programRevision}T00:00:00Z`).toLocaleDateString(
      lang === 'zh' ? 'zh-TW' : 'en-US', {dateStyle: 'medium', timeZone: 'UTC'}))
    : '';
  revision.hidden = !meta.programRevision;
  document.title = t('docTitle');
  renderTabs();
  renderSchedule();
  const hasFunRunItems = renderFunRun();
  const maps = renderMaps();
  setSectionVisible('venue', maps.venue);
  setSectionVisible('fun-run', hasFunRunItems || maps.funRun);
}

byID('search').addEventListener('input', renderSchedule);
byID('copy-link').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(PROGRAM_LINK);
    byID('copy-status').textContent = t('copied');
  } catch {
    byID('copy-status').textContent = t('copyFailed');
  }
});

applyStaticText();
(async () => {
  try {
    const response = await fetch(PROGRAM_URL, {cache: 'no-cache'});
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    program = await response.json();
    if (!program?.conference || !Array.isArray(program.days)) throw new Error(t('formatError'));
    selectedDay = todayIndex();
    renderAll();
  } catch (error) {
    byID('meta').textContent = t('loading');
    byID('status').textContent = t('loadError', error.message);
    byID('status').className = 'error';
  }
})();
