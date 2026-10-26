'use strict';
let publication;
for (const section of document.querySelectorAll('[data-sample-language]')) {
  section.hidden = section.dataset.sampleLanguage !== window.conferenceLanguage;
}
for (const element of document.querySelectorAll('[data-i18n]')) element.textContent = t(element.dataset.i18n);
for (const attribute of ['aria-label', 'alt', 'placeholder']) {
  for (const element of document.querySelectorAll(`[data-i18n-${attribute}]`)) {
    element.setAttribute(attribute, t(element.getAttribute(`data-i18n-${attribute}`)));
  }
}

try { document.getElementById('changes').value = sessionStorage.getItem('acadenda-changes:' + location.pathname) || ''; } catch {}
const byID = id => document.getElementById(id);
function node(tag, text, className) {
  const element = document.createElement(tag);
  element.textContent = text;
  if (className) element.className = className;
  return element;
}
function status(message, error = false) {
  byID('status').textContent = message;
  byID('status').className = error ? 'error' : '';
}
async function fetchText(url) {
  const response = await fetch(url, {cache: 'no-store', signal: AbortSignal.timeout(15000)});
  if (!response.ok) throw new Error(`${t('無法讀取檔案（HTTP ')}${response.status})`);
  return response.text();
}
function parseProgram(raw) {
  const program = JSON.parse(raw);
  if (!program.conference || !Array.isArray(program.days)) throw new Error(t('議程缺少 conference 或 days。'));
  const ids = new Set();
  function record(row) {
    if (!row || typeof row.id !== 'string' || !row.id.trim() || ids.has(row.id)) throw new Error(t('議程有缺漏或重複 ID，請先使用發布工具檢查。'));
    ids.add(row.id);
    if (typeof row.title !== 'string') throw new Error(t('議程標題格式錯誤。'));
  }
  for (const day of program.days) {
    if (!Array.isArray(day.items)) throw new Error(t('議程的 items 格式錯誤。'));
    for (const item of day.items) {
      record(item);
      if (item.talks !== undefined && !Array.isArray(item.talks)) throw new Error(t('議程的 talks 格式錯誤。'));
      for (const talk of item.talks || []) record(talk);
    }
  }
  return program;
}
async function currentProgram() {
  return parseProgram(await fetchText(publication.file));
}
function sampleCounts(program) {
  const items = program.days.flatMap(day => day.items);
  const talks = items.reduce((total, item) => total + (item.talks || []).length, 0);
  const maps = Array.isArray(program.conference.maps) ? program.conference.maps.length : 0;
  const days = program.days.length;
  if (window.conferenceLanguage === 'en') return `${days} ${days === 1 ? 'day' : 'days'} · ${items.length} agenda items · ${talks} talks · ${maps} maps`;
  return `${days} 天 · ${items.length} 個議程項目 · ${talks} 場演講 · ${maps} 張地圖`;
}
function render(program) {
  const meta = program.conference;
  for (const element of document.querySelectorAll('.json-sample-counts')) element.textContent = sampleCounts(program);
  byID('title').textContent = meta.name || t('會議議程');
  document.title = `${meta.name || t('會議議程')} · Acadenda`;
  byID('details').textContent = [meta.startDate, meta.endDate !== meta.startDate ? meta.endDate : '', meta.venue, meta.city].filter(Boolean).join(' · ');
  const fragment = document.createDocumentFragment();
  if (!program.days.some(day => day.items.length)) fragment.append(node('p', t('議程尚未公布。')));
  for (const day of program.days) {
    fragment.append(node('h2', [day.date, day.label !== day.date ? day.label : ''].filter(Boolean).join(' · ')));
    for (const item of day.items) {
      const card = node('article', '');
      card.append(node('h3', item.title));
      card.append(node('p', [item.startTime && `${item.startTime}${item.endTime ? '–' + item.endTime : ''}`, item.room, item.chair && `${t('主持：')}${item.chair}`].filter(Boolean).join(' · '), 'meta'));
      for (const talk of item.talks || []) {
        const section = node('section', '', 'talk');
        section.append(node('strong', talk.title));
        section.append(node('p', [talk.speaker, talk.affiliation].filter(Boolean).join(' · ')));
        if (talk.startTime) section.append(node('p', `${talk.startTime}${talk.endTime ? '–' + talk.endTime : ''}`, 'muted'));
        if (Array.isArray(talk.coauthors) && talk.coauthors.length) section.append(node('p', `${t('共同作者：')}${talk.coauthors.join(window.conferenceLanguage === 'en' ? ', ' : '、')}`, 'muted'));
        if (talk.uncertain?.length) section.append(node('p', t('含待確認資訊，請由主辦方檢查。'), 'muted'));
        card.append(section);
      }
      if (item.uncertain?.length) card.append(node('p', t('此場次含待確認資訊。'), 'muted'));
      fragment.append(card);
    }
  }
  byID('schedule').replaceChildren(fragment);
  const maps = document.createDocumentFragment();
  for (const map of Array.isArray(meta.maps) ? meta.maps : []) {
    try {
      const url = new URL(map.imageURL);
      if (url.protocol !== 'https:') continue;
      const link = node('a', map.title || t('會場地圖'));
      link.href = url.href; link.target = '_blank'; link.rel = 'noopener noreferrer';
      maps.append(link);
    } catch { /* Ignore invalid map URLs; never turn them into executable links. */ }
  }
  // Pages with map previews already provide the same image and download links.
  byID('maps').hidden = !maps.childNodes.length || Boolean(document.querySelector('.map-previews'));
  byID('map-links').replaceChildren(maps);
}
async function copyText(text, message) {
  try {
    await navigator.clipboard.writeText(text);
    byID('copy-fallback').hidden = true; byID('fallback-label').hidden = true;
    status(message);
  } catch {
    byID('operator').open = true;
    byID('copy-fallback').hidden = false; byID('fallback-label').hidden = false;
    byID('copy-fallback').value = text; byID('copy-fallback').focus(); byID('copy-fallback').select();
    status(t('瀏覽器未允許自動複製，請複製下方已選取的內容。'));
  }
}
async function reload() {
  status(t('正在讀取議程…'));
  try { render(await currentProgram()); status(`${t('已讀取：')}${new Date().toLocaleString(window.conferenceLanguage === 'en' ? 'en-US' : 'zh-TW')}${t('。議程以主辦方公告為準。')}`); }
  catch (error) { byID('schedule').replaceChildren(); byID('maps').hidden = true; status(`${t('讀取失敗：')}${error.message}${t(' 請按「重新載入」再試一次。')}`, true); }
}
// Live test: the Cloudflare Worker commits the demo update (or restore) to GitHub, then Pages redeploys.
const demoUpdaterURL = 'https://acadenda-demo-updater.thisis-chenwei.workers.dev';
const demoServerMessages = {
  applied: () => t('已送出測試更新。GitHub Pages 約一分鐘後更新，之後按「重新載入」或到 App 更新既有會議。'),
  restored: () => t('已還原線上版本。GitHub Pages 約一分鐘後更新，之後按「重新載入」或到 App 更新既有會議。'),
  unchanged: () => t('線上版本已是原始內容，沒有重新寫入。')
};
for (const button of document.querySelectorAll('.demo-server-button')) {
  button.addEventListener('click', async () => {
    if (!publication?.demo) return;
    const password = byID('developer-tools').querySelector('.demo-password').value;
    if (!password) { status(t('請輸入示範密碼。'), true); return; }
    const path = button.classList.contains('demo-apply-button') ? '/apply' : '/restore';
    const buttons = document.querySelectorAll('.demo-server-button');
    for (const element of buttons) element.disabled = true;
    status(t('正在送出到 GitHub…'));
    try {
      const response = await fetch(`${demoUpdaterURL}${path}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({password}),
        signal: AbortSignal.timeout(30000)
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || `HTTP ${response.status}`);
      status(demoServerMessages[data.status]?.() || t('已完成。'));
    } catch (error) { status(`${t('未完成：')}${error.message}`, true); }
    finally { for (const element of buttons) element.disabled = false; }
  });
}
byID('refresh').addEventListener('click', reload);
byID('copy-link').addEventListener('click', () => copyText(publication.url, t('已複製固定議程連結。')));
byID('copy-prompt').addEventListener('click', async () => {
  const button = byID('copy-prompt'); button.disabled = true;
  byID('copy-fallback').hidden = true; byID('copy-fallback').value = ''; byID('fallback-label').hidden = true;
  try {
    const [program, rules] = await Promise.all([currentProgram(), fetchText('../assets/update_prompt.txt')]);
    render(program);
    const request = byID('changes').value.trim() || t('[在這裡貼上主辦方提出的修改要求]');
    await copyText(`${rules}\nPUBLICATION_URL: ${publication.url}\n\nCURRENT_JSON:\n${JSON.stringify(program, null, 2)}\n\nCHANGE_REQUEST:\n${request}\n`, t('已複製更新規則、剛重新讀取的完整 JSON 與修改要求。'));
  } catch (error) { status(`${t('未複製：')}${error.message}`, true); }
  finally { button.disabled = false; }
});
(async () => {
  try {
    publication = JSON.parse(await fetchText('publication.json'));
    const url = new URL(publication.url);
    const file = new URL(publication.file, location.href);
    if (url.origin !== 'https://jamesweichen.github.io' || url.search || url.hash ||
        file.origin !== location.origin || !/^\/acadenda\/program\/[A-Za-z0-9_-][A-Za-z0-9._-]*\.json$/.test(file.pathname) ||
        file.search || file.hash || url.pathname !== file.pathname) throw new Error(t('發布設定不正確。'));
    byID('sample-note').hidden = !publication.demo;
    byID('program-link').href = publication.url;
    byID('program-link').textContent = publication.url;
    byID('access').hidden = false; byID('operator').hidden = false;
    await reload();
  } catch (error) { byID('title').textContent = t('無法載入議程'); status(`${error.message}${t(' 請透過網站或本機 HTTP 伺服器開啟，不要直接雙擊 HTML。')}`, true); }
})();
