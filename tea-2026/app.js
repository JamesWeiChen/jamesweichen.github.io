'use strict';
// Every schedule string is set with textContent; the program JSON is never inserted as HTML.
const PROGRAM_URL = 'program.json';
const PROGRAM_LINK = 'https://jamesweichen.github.io/tea-2026/program.json';

const COPY = {
  en: {
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
    programTitle: 'Program', dayGroup: 'Choose a day', searchLabel: 'Search speaker, paper or session',
    searchPlaceholder: 'e.g. 謝志昇, trade, networks', venueTitle: 'Venue Map',
    venueText: 'Tap the image to view it full size.', funRunTitle: 'Fun Run / Walk',
    footerLine1: 'Independent conference companion · Powered by Acadenda',
    footerLine2: 'The program is compiled from the organizer’s conference schedule. This is not an official TEA website.',
    docTitle: 'TEA 2026 Program', cityEn: 'Tainan, Taiwan',
    venueEn: 'College of Social Sciences, National Cheng Kung University (No. 25, Xiaodong Rd.)',
    venueMapTitle: 'Venue and Transport Map',
    resultCount: n => n === 1 ? '1 matching session' : `${n} matching sessions`,
    noMatching: 'No matching sessions.', noSessions: 'No sessions are listed for this day.',
    chair: name => `Chair: ${name}`, flag: 'Some details are marked for organizer confirmation.',
    throughout: 'Throughout the day', timeTbd: 'Time not specified',
    loading: 'Program unavailable', loadError: message => `The program could not be loaded (${message}). Refresh the page to try again.`,
    formatError: 'The program file has an unexpected format.',
    copied: 'Program link copied.', copyFailed: 'Copy failed. Select the link above and copy it.',
  },
  zh: {
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
    programTitle: '議程', dayGroup: '選擇日期', searchLabel: '搜尋講者、論文或場次',
    searchPlaceholder: '例如：謝志昇、貿易、網絡', venueTitle: '會場地圖',
    venueText: '點擊圖片可查看完整大小。', funRunTitle: '趣跑／健走', venueMapTitle: '會場與交通地圖',
    footerLine1: '獨立會議輔助網站 · 由 Acadenda 提供技術支援',
    footerLine2: '議程依主辦單位公布的會議安排整理，非台灣經濟學會官方網站。',
    docTitle: '台灣經濟學會 2026 年年會 議程', 
    resultCount: n => `${n} 場符合`,
    noMatching: '沒有符合的場次。', noSessions: '這一天沒有列出場次。',
    chair: name => `主持人：${name}`, flag: '部分資訊待主辦單位確認。',
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

function t(key, value) {
  const entry = COPY[lang][key];
  return typeof entry === 'function' ? entry(value) : entry;
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
// Room names come from the program as “場地 A”; English shows them as “Room A”.
function roomText(room) {
  const match = lang === 'en' && room && room.match(/^場地\s*(.+)$/);
  return match ? `Room ${match[1]}` : room;
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
function itemMatches(item, q) {
  return [item.title, item.room, item.chair].some(text => text && text.toLowerCase().includes(q));
}
function talkMatches(talk, q) {
  return [talk.title, talk.speaker, talk.affiliation, ...(talk.coauthors || [])].some(text => text && text.toLowerCase().includes(q));
}
// Returns the talks to show for one item, or null when the item itself should be hidden.
function visibleTalks(item, q) {
  const talks = item.talks || [];
  if (!q || itemMatches(item, q)) return talks;
  const matching = talks.filter(talk => talkMatches(talk, q));
  return matching.length ? matching : null;
}

// Lists every author of a talk in one line; the speaker is set apart in bold.
function authorLine(talk) {
  const line = el('p', '', 'authors');
  if (talk.speaker) line.append(el('strong', talk.speaker, 'presenter'));
  if (talk.speaker && talk.affiliation) line.append(` (${talk.affiliation})`);
  for (const name of talk.coauthors || []) {
    if (line.childNodes.length) line.append(', ');
    line.append(name);
  }
  return line;
}

function sessionCard(item, talks) {
  const card = el('article', '', talks.length || item.kind !== 'parallelSession' ? 'session' : 'session break');
  card.append(el('h3', item.title));
  card.append(el('p', [roomText(item.room), item.chair && t('chair', item.chair)].filter(Boolean).join(' · '), 'detail'));
  if (item.uncertain?.length) card.append(el('p', t('flag'), 'flag'));
  for (const talk of talks) {
    const section = el('section', '', 'talk');
    section.append(el('strong', talk.title));
    section.append(authorLine(talk));
    if (talk.startTime) section.append(el('p', timeLabel(talk), 'detail'));
    if (talk.uncertain?.length) section.append(el('p', t('flag'), 'flag'));
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
