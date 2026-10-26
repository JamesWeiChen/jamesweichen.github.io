'use strict';
// Every schedule string is set with textContent; the program JSON is never inserted as HTML.
const PROGRAM_URL = 'program.json';
const PROGRAM_LINK = 'https://jamesweichen.github.io/na-esa-2026/program.json';
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const byID = id => document.getElementById(id);
let program = null;
let selectedDay = 0;

// Same storage key as the main site, so the chosen appearance carries over between the two.
function readTheme() {
  try {
    const saved = localStorage.getItem('jwc-theme');
    return ['light', 'dark', 'system'].includes(saved) ? saved : 'system';
  } catch { return 'system'; }
}
function applyTheme(theme) {
  if (theme === 'system') delete document.documentElement.dataset.theme;
  else document.documentElement.dataset.theme = theme;
}
const themeSelect = byID('theme');
themeSelect.value = readTheme();
themeSelect.addEventListener('change', () => {
  const theme = themeSelect.value;
  try { localStorage.setItem('jwc-theme', theme); } catch { /* Storage can be blocked; the choice still applies for this visit. */ }
  applyTheme(theme);
});

function el(tag, text, className) {
  const element = document.createElement(tag);
  if (text) element.textContent = text;
  if (className) element.className = className;
  return element;
}
function monthDay(iso) {
  const [, month, day] = iso.split('-').map(Number);
  return `${MONTHS[month - 1]} ${day}`;
}
function headerDates(meta) {
  const year = meta.startDate.slice(0, 4);
  if (meta.startDate === meta.endDate) return `${monthDay(meta.startDate)}, ${year}`;
  return `${monthDay(meta.startDate)}–${monthDay(meta.endDate)}, ${year}`;
}
// Times are kept as the program's local wall-clock strings; they are never converted through Date.
function timeLabel(row) {
  if (row.startTime) return row.endTime ? `${row.startTime}–${row.endTime}` : row.startTime;
  return /throughout the day/i.test(row.title) ? 'Throughout the day' : 'Time not specified';
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

function sessionCard(item, talks) {
  const card = el('article', '', talks.length || item.kind !== 'parallelSession' ? 'session' : 'session break');
  card.append(el('h3', item.title));
  card.append(el('p', [item.room, item.chair && `Chair: ${item.chair}`].filter(Boolean).join(' · '), 'detail'));
  if (item.uncertain?.length) card.append(el('p', 'Some details are marked for organizer confirmation.', 'flag'));
  for (const talk of talks) {
    const section = el('section', '', 'talk');
    section.append(el('strong', talk.title));
    section.append(el('p', [talk.speaker, talk.affiliation].filter(Boolean).join(' · ')));
    if (talk.coauthors?.length) section.append(el('p', `With ${talk.coauthors.join(', ')}`));
    if (talk.startTime) section.append(el('p', timeLabel(talk), 'detail'));
    if (talk.uncertain?.length) section.append(el('p', 'Some details are marked for organizer confirmation.', 'flag'));
    card.append(section);
  }
  return card;
}

function renderDay(day, q, showDate) {
  const fragment = document.createDocumentFragment();
  if (showDate) fragment.append(el('h3', day.label, 'day-heading'));
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
    const button = el('button', day.label);
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
  if (!total) fragment.append(el('p', q ? 'No matching sessions.' : 'No sessions are listed for this day.', 'muted'));
  container.replaceChildren(fragment);
  byID('result-count').textContent = q ? `${total} matching ${total === 1 ? 'session' : 'sessions'}` : '';
  renderTabs();
}

// Returns the image link and caption for a map, or null when its URL is not HTTPS.
function renderMap(map) {
  let url;
  try { url = new URL(map.imageURL); } catch { return null; }
  if (url.protocol !== 'https:') return null;
  const link = el('a');
  link.href = url.href;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  const image = el('img');
  image.src = url.href;
  image.alt = map.title;
  image.loading = 'lazy';
  link.append(image);
  const caption = el('figcaption', map.title);
  return [link, caption];
}

function renderFunRun() {
  const container = byID('fun-run-items');
  const fragment = document.createDocumentFragment();
  for (const day of program.days) {
    for (const item of day.items) {
      if (!/fun run/i.test(item.title)) continue;
      const block = el('div', '', 'time-block');
      block.append(el('p', `${day.label} · ${timeLabel(item)}`, 'time-label'));
      block.append(sessionCard(item, []));
      fragment.append(block);
    }
  }
  container.replaceChildren(fragment);
}

function renderMaps() {
  const maps = Array.isArray(program.conference.maps) ? program.conference.maps : [];
  const venue = maps.find(map => /venue/i.test(map.title));
  const funRun = maps.find(map => /fun run/i.test(map.title));
  const venueParts = venue && renderMap(venue);
  const funRunParts = funRun && renderMap(funRun);
  byID('venue-map').replaceChildren(...(venueParts || []));
  byID('fun-run-map').replaceChildren(...(funRunParts || []));
  if (!venueParts) byID('venue-map').hidden = true;
  if (!funRunParts) byID('fun-run-map').hidden = true;
}

function render() {
  const meta = program.conference;
  byID('meta').textContent = [headerDates(meta), meta.city, meta.venue].filter(Boolean).join(' · ');
  document.title = `${meta.shortName || 'NA ESA 2026'} Program`;
  selectedDay = todayIndex();
  renderTabs();
  renderSchedule();
  renderFunRun();
  renderMaps();
}

byID('search').addEventListener('input', renderSchedule);
byID('copy-link').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(PROGRAM_LINK);
    byID('copy-status').textContent = 'Program link copied.';
  } catch {
    byID('copy-status').textContent = 'Copy failed. Select the link above and copy it.';
  }
});

(async () => {
  try {
    const response = await fetch(PROGRAM_URL, {cache: 'no-cache'});
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    program = await response.json();
    if (!program?.conference || !Array.isArray(program.days)) throw new Error('The program file has an unexpected format.');
    render();
  } catch (error) {
    byID('meta').textContent = 'Program unavailable';
    byID('status').textContent = `The program could not be loaded (${error.message}). Refresh the page to try again.`;
    byID('status').className = 'error';
  }
})();
