// Cloudflare Worker for the Acadenda demo: applies or restores the test agenda update in GitHub.
// Secrets: GITHUB_TOKEN (fine-grained, Contents read/write on this repo only), DEMO_PASSWORD.
// Variables: ALLOWED_ORIGIN (https://jamesweichen.github.io), ORIGINAL_REF (commit with the original JSON).
const REPO = 'JamesWeiChen/jamesweichen.github.io';
const FILE = 'acadenda/program/Official_Conference_Demo.json';
const API = `https://api.github.com/repos/${REPO}/contents/${FILE}`;

// Same three last-minute changes as the page's download button.
const demoUpdates = [
  // A speaker withdraws (talk ...003 is dropped), and the two remaining talks swap order.
  {id: '30000000-0000-4000-8000-000000000002', talks: ['40000000-0000-4000-8000-000000000004', '40000000-0000-4000-8000-000000000002']},
  // The chair changes at the last minute.
  {id: '30000000-0000-4000-8000-000000000004', changes: {chair: 'Professor Elena García'}}
];

export default {
  async fetch(request, env) {
    const cors = {
      'Access-Control-Allow-Origin': env.ALLOWED_ORIGIN,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '600'
    };
    if (request.method === 'OPTIONS') return new Response(null, {headers: cors});
    if (request.method !== 'POST') return reply({error: '只接受 POST。'}, 405, cors);

    const body = await request.json().catch(() => null);
    if (!body || !(await sameText(body.password, env.DEMO_PASSWORD))) return reply({error: '密碼不正確。'}, 403, cors);

    const action = new URL(request.url).pathname;
    try {
      if (action === '/apply') return reply(await apply(env), 200, cors);
      if (action === '/restore') return reply(await restore(env), 200, cors);
      return reply({error: '找不到此操作。'}, 404, cors);
    } catch (error) {
      return reply({error: error.message}, error.status || 500, cors);
    }
  }
};

async function apply(env) {
  const current = await readFile(env);
  const program = JSON.parse(current.text);
  for (const update of demoUpdates) {
    const item = program.days.flatMap(day => day.items).find(row => row.id === update.id);
    if (!item) throw httpError('目前線上版本已是測試更新版，或議程內容已改變。', 409);
    if (update.talks) {
      item.talks = update.talks.map(id => {
        const talk = (item.talks || []).find(row => row.id === id);
        if (!talk) throw httpError('目前線上版本已是測試更新版，或議程內容已改變。', 409);
        return talk;
      });
    }
    Object.assign(item, update.changes);
  }
  await writeFile(env, current.sha, `${JSON.stringify(program, null, 2)}\n`, 'Test: apply demo agenda changes');
  return {status: 'applied'};
}

async function restore(env) {
  const original = await readFile(env, env.ORIGINAL_REF);
  const current = await readFile(env);
  if (original.text === current.text) return {status: 'unchanged'};
  await writeFile(env, current.sha, original.text, 'Test: restore demo agenda');
  return {status: 'restored'};
}

async function readFile(env, ref) {
  const response = await fetch(ref ? `${API}?ref=${ref}` : API, {headers: githubHeaders(env)});
  if (!response.ok) throw httpError(`讀取 GitHub 檔案失敗（HTTP ${response.status}）。`, 502);
  const data = await response.json();
  const bytes = Uint8Array.from(atob(data.content.replace(/\n/g, '')), char => char.charCodeAt(0));
  return {sha: data.sha, text: new TextDecoder().decode(bytes)};
}

async function writeFile(env, sha, text, message) {
  const bytes = new TextEncoder().encode(text);
  const content = btoa(Array.from(bytes, byte => String.fromCharCode(byte)).join(''));
  const response = await fetch(API, {
    method: 'PUT',
    headers: {...githubHeaders(env), 'Content-Type': 'application/json'},
    body: JSON.stringify({message, content, sha, branch: 'main'})
  });
  if (!response.ok) throw httpError(`寫入 GitHub 失敗（HTTP ${response.status}）。`, 502);
}

function githubHeaders(env) {
  return {
    Authorization: `Bearer ${env.GITHUB_TOKEN}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'acadenda-demo-updater'
  };
}

// Compare SHA-256 digests so the password check takes the same time for any wrong guess.
async function sameText(given, expected) {
  if (typeof given !== 'string' || typeof expected !== 'string') return false;
  const [a, b] = await Promise.all([given, expected].map(text => crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))));
  const left = new Uint8Array(a);
  const right = new Uint8Array(b);
  let difference = 0;
  for (let index = 0; index < left.length; index++) difference |= left[index] ^ right[index];
  return difference === 0;
}

function httpError(message, status) {
  const error = new Error(message);
  error.status = status;
  return error;
}

function reply(data, status, headers) {
  return new Response(JSON.stringify(data), {status, headers: {...headers, 'Content-Type': 'application/json; charset=utf-8'}});
}
