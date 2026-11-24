#!/usr/bin/env node
/**
 * fb-session-collect.mjs — lấy bài từ Facebook page qua chính Chrome bạn đã đăng nhập.
 *
 * Không cần Page token. Không cần mật khẩu: script chỉ nói chuyện với Chrome qua cổng gỡ lỗi
 * cục bộ (CDP), dùng phiên đăng nhập sẵn có của bạn.
 *
 * Chuẩn bị:
 *   1. Đóng hết Chrome.
 *   2. Mở lại kèm cổng gỡ lỗi, đăng nhập facebook.com trong cửa sổ đó:
 *      "%ProgramFiles%\Google\Chrome\Application\chrome.exe" --remote-debugging-port=9222
 *      (nên dùng profile riêng để không ảnh hưởng Chrome hằng ngày:
 *       thêm --user-data-dir="C:\chrome-radar")
 *
 * Dùng:
 *   node tools/fb-session-collect.mjs --pages=topcv.vn,itviec --limit=8
 *   node tools/fb-session-collect.mjs --pages=topcv.vn --dry --raw
 *
 * Rủi ro: cào tự động bằng tài khoản cá nhân vi phạm điều khoản Facebook và có thể bị
 * checkpoint/khoá tài khoản. Chạy thưa (1-2 ngày/lần), số page ít.
 */

import { readFile, writeFile } from 'node:fs/promises';
import { relative, resolve } from 'node:path';

function parseArgs(argv) {
  const args = {};
  argv.slice(2).forEach((raw) => {
    if (!raw.startsWith('--')) return;
    const [key, ...rest] = raw.replace(/^--/, '').split('=');
    const value = rest.join('=');
    args[key] = value === '' ? true : value;
  });
  return args;
}

const args = parseArgs(process.argv);
const port = Number(args.port || 9222);
const limit = Math.max(1, Number(args.limit || 8));
const pages = String(args.pages || 'topcv.vn')
  .split(',')
  .map((item) => item.trim().replace(/^https?:\/\/(www\.)?facebook\.com\//i, '').replace(/\/+$/, ''))
  .filter(Boolean);
const outPath = resolve(process.cwd(), String(args.out || 'assets/data/social-feed.json'));

const sleep = (ms) => new Promise((done) => setTimeout(done, ms));

function cdp(webSocketUrl) {
  const socket = new WebSocket(webSocketUrl);
  const pending = new Map();
  let nextId = 0;
  const ready = new Promise((res, rej) => {
    socket.onopen = () => res();
    socket.onerror = () => rej(new Error('không mở được websocket tới Chrome'));
  });
  socket.onmessage = (event) => {
    let message;
    try {
      message = JSON.parse(event.data);
    } catch {
      return;
    }
    const waiter = pending.get(message.id);
    if (!waiter) return;
    pending.delete(message.id);
    if (message.error) waiter.reject(new Error(message.error.message || 'CDP lỗi'));
    else waiter.resolve(message.result);
  };
  const send = async (method, params = {}, sessionId) => {
    await ready;
    const id = ++nextId;
    const result = new Promise((res, rej) => pending.set(id, { resolve: res, reject: rej }));
    socket.send(JSON.stringify({ id, method, params, sessionId }));
    return result;
  };
  return { send, close: () => socket.close() };
}

const EXTRACT = `(() => {
  const POST_RE = /\\/posts\\/(pfbid[0-9A-Za-z]+|\\d{6,})|\\/permalink\\/(\\d{6,})|story_fbid=\\d{6,}/;
  const KEEP = ['story_fbid', 'id', 'fbid', 'v'];
  const cleanHref = (href) => {
    const url = new URL(href, location.origin);
    const kept = [...url.searchParams].filter(([key]) => KEEP.includes(key));
    url.search = kept.length ? '?' + kept.map(([k, v]) => k + '=' + encodeURIComponent(v)).join('&') : '';
    url.hash = '';
    return url.href;
  };
  const articles = Array.from(document.querySelectorAll('div[role="article"]'));
  const out = [];
  const seen = new Set();
  articles.forEach((article) => {
    const text = (article.innerText || '').replace(/\\u00a0/g, ' ').trim();
    const link = Array.from(article.querySelectorAll('a[href]'))
      .map((a) => a.getAttribute('href') || '')
      .find((href) => POST_RE.test(href));
    if (!link || text.length < 60) return;
    const href = cleanHref(link);
    if (seen.has(href)) return;
    seen.add(href);
    out.push({ text: text.slice(0, 1500), href });
  });
  return JSON.stringify({
    items: out,
    loginWall: !!document.querySelector('form[action*="login"], input[name="email"]'),
    title: (document.title || '').replace(/\\s*\\|\\s*Facebook\\s*$/, '').trim()
  });
})()`;

function cleanLines(text) {
  return String(text)
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function toItem(page, raw, pageTitle) {
  const lines = cleanLines(raw.text).filter((line) => line !== pageTitle);
  const title = (lines[0] || '').replace(/\s+/g, ' ').slice(0, 180);
  const summary = lines.slice(1).join(' ').replace(/\s+/g, ' ').slice(0, 240);
  return {
    source: 'facebook',
    title,
    url: raw.href,
    summary,
    author: page,
    tags: ['facebook'],
    createdAt: null,
    metrics: {}
  };
}

async function collectPage(client, page) {
  const url = `https://www.facebook.com/${page}/posts`;
  const { targetId } = await client.send('Target.createTarget', { url: 'about:blank' });
  const { sessionId } = await client.send('Target.attachToTarget', { targetId, flatten: true });
  try {
    await client.send('Page.enable', {}, sessionId);
    await client.send('Page.navigate', { url }, sessionId);
    let payload = null;
    for (let attempt = 0; attempt < 12; attempt += 1) {
      await sleep(1500);
      const result = await client.send('Runtime.evaluate', { expression: EXTRACT, returnByValue: true }, sessionId);
      payload = JSON.parse(result.result.value || '{"items":[]}');
      if (payload.items.length) break;
      await client.send('Runtime.evaluate', { expression: 'window.scrollBy(0, 1400)' }, sessionId).catch(() => {});
    }
    if (payload && payload.loginWall) {
      console.warn(`  ! ${page}: Chrome chưa đăng nhập Facebook (thấy form đăng nhập) — đăng nhập trong cửa sổ đó rồi chạy lại`);
      if (args.raw) console.log(`    tiêu đề trang: ${payload.title}`);
      return [];
    }
    if (!payload || !payload.items.length) {
      console.warn(`  ! ${page}: không thấy bài nào — page riêng tư, đổi URL, hoặc bài chưa tải xong`);
      if (args.raw) console.log(`    tiêu đề trang: ${payload && payload.title}`);
      return [];
    }
    const items = payload.items.slice(0, limit).map((raw) => toItem(page, raw, payload.title));
    console.log(`  ↳ ${page}: ${items.length} bài`);
    return items;
  } finally {
    await client.send('Target.closeTarget', { targetId }).catch(() => {});
  }
}

async function main() {
  let version;
  try {
    const res = await fetch(`http://127.0.0.1:${port}/json/version`, { signal: AbortSignal.timeout(4000) });
    version = await res.json();
  } catch {
    console.error(`✗ Không thấy Chrome ở cổng ${port}.`);
    console.error(`  Đóng hết Chrome rồi mở lại kèm: --remote-debugging-port=${port}`);
    console.error('  và đăng nhập facebook.com trong cửa sổ đó.');
    process.exitCode = 1;
    return;
  }

  console.log(`• Chrome: ${version.Browser} (cổng ${port})`);
  const client = cdp(version.webSocketDebuggerUrl);
  let fresh = [];
  try {
    for (const page of pages) {
      fresh = fresh.concat(await collectPage(client, page));
      await sleep(1200);
    }
  } finally {
    client.close();
  }

  if (!fresh.length) {
    console.warn('Không lấy được bài nào — chưa ghi file.');
    process.exitCode = 1;
    return;
  }

  const key = (item) => item.url;
  let existing = [];
  if (args.merge) {
    try {
      const raw = JSON.parse(await readFile(outPath, 'utf8'));
      existing = Array.isArray(raw) ? raw : raw.items || [];
    } catch {
      existing = [];
    }
  }
  const merged = new Map();
  fresh.forEach((item) => merged.set(key(item), item));
  existing.forEach((item) => {
    if (item && item.url && !merged.has(key(item))) merged.set(key(item), item);
  });
  const payload = { updatedAt: new Date().toISOString(), items: [...merged.values()] };

  console.log(`\nTổng: ${fresh.length} bài mới${args.merge ? `, gộp còn ${payload.items.length}` : ''}.`);
  payload.items.slice(0, 5).forEach((item) => console.log(`  - ${item.title.slice(0, 90)} → ${item.url}`));

  if (args.dry) {
    console.log('--dry: không ghi file.');
    return;
  }
  await writeFile(outPath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
  console.log(`✓ Đã ghi ${relative(process.cwd(), outPath)} — mở radar.html, bấm "Cập nhật".`);
}

main().catch((error) => {
  console.error(`✗ ${error.message}`);
  process.exitCode = 1;
});
