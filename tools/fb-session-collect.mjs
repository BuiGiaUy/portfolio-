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
 *   node tools/fb-session-collect.mjs --orca --pages=topcv.vn      # dùng tab của Orca, không cần cổng
 *
 * Rủi ro: cào tự động bằng tài khoản cá nhân vi phạm điều khoản Facebook và có thể bị
 * checkpoint/khoá tài khoản. Chạy thưa (1-2 ngày/lần), số page ít.
 */

import { execFile } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import { relative, resolve } from 'node:path';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

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
const tidy = (item) => item.trim().replace(/^https?:\/\/(www\.)?facebook\.com\//i, '').replace(/\/+$/, '');
const pages = String(args.pages || '')
  .split(',')
  .map(tidy)
  .filter(Boolean);
const groups = String(args.groups || '')
  .split(',')
  .map(tidy)
  .map((item) => (item.startsWith('groups/') ? item : `groups/${item}`))
  .filter(Boolean);
const targets = [...pages, ...groups];
if (!targets.length) targets.push('topcv.vn');

const urlFor = (target) =>
  target.startsWith('groups/') ? `https://www.facebook.com/${target}` : `https://www.facebook.com/${target}/posts`;
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

const EXTRACT = readFileSync(new URL('./fb-extract.js', import.meta.url), 'utf8');

function cleanLines(text) {
  return String(text)
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function authorOf(page, pageTitle) {
  const cleaned = String(pageTitle || '').replace(/^\(\d+\+\)\s*/, '').replace(/\s*\|\s*Facebook\s*$/i, '').trim();
  return cleaned || page;
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
    author: authorOf(page, pageTitle),
    tags: ['facebook'],
    createdAt: null,
    metrics: {}
  };
}

async function orcaJson(argv) {
  const { stdout } = await execFileAsync('orca', [...argv, '--json'], { maxBuffer: 8 * 1024 * 1024, windowsHide: true });
  const payload = JSON.parse(stdout.trim());
  if (!payload.ok) throw new Error((payload.error && payload.error.message) || 'Orca trả lỗi');
  return payload.result;
}

async function collectViaOrca(page) {
  await orcaJson(['goto', '--url', urlFor(page)]);
  let payload = null;
  for (let attempt = 0; attempt < 20; attempt += 1) {
    await sleep(2000);
    const result = await orcaJson(['eval', '--expression', EXTRACT]);
    payload = JSON.parse(result.result || '{"items":[]}');
    if (payload.items.length >= limit) break;
    await orcaJson(['scroll', '--direction', 'down', '--amount', '1600']).catch(() => {});
  }
  return payload;
}

async function collectViaCdp(client, page) {
  const url = urlFor(page);
  const { targetId } = await client.send('Target.createTarget', { url: 'about:blank' });
  const { sessionId } = await client.send('Target.attachToTarget', { targetId, flatten: true });
  try {
    await client.send('Page.enable', {}, sessionId);
    await client.send('Page.navigate', { url }, sessionId);
    let payload = null;
    for (let attempt = 0; attempt < 20; attempt += 1) {
      await sleep(2000);
      const result = await client.send('Runtime.evaluate', { expression: EXTRACT, returnByValue: true }, sessionId);
      payload = JSON.parse(result.result.value || '{"items":[]}');
      if (payload.items.length >= limit) break;
      await client.send('Runtime.evaluate', { expression: 'window.scrollTo(0, document.body.scrollHeight)' }, sessionId).catch(() => {});
    }
    return payload;
  } finally {
    await client.send('Target.closeTarget', { targetId }).catch(() => {});
  }
}

async function collectPage(client, page) {
  const payload = args.orca ? await collectViaOrca(page) : await collectViaCdp(client, page);
  if (!payload || !payload.items.length) {
    if (payload && payload.loginWall) {
      const where = args.orca ? 'tab của Orca' : `cửa sổ Chrome ở cổng ${port}`;
      console.warn(`  ! ${page}: chưa đăng nhập Facebook (thấy form đăng nhập) — đăng nhập trong ${where} rồi chạy lại`);
    } else {
      console.warn(`  ! ${page}: không thấy bài nào — page riêng tư, đổi URL, hoặc bài chưa tải xong`);
    }
    if (args.raw) console.log(`    tiêu đề trang: ${payload && payload.title}`);
    return [];
  }
  const items = payload.items.slice(0, limit).map((raw) => toItem(page, raw, payload.title));
  console.log(`  ↳ ${page}: ${items.length} bài`);
  return items;
}

async function main() {
  let client = null;
  if (args.orca) {
    const { tabs } = await orcaJson(['tab', 'list']).catch(() => ({ tabs: [] }));
    if (!tabs.length) await orcaJson(['tab', 'create', '--url', 'https://www.facebook.com/']);
    console.log(`• Nguồn phiên: tab của Orca (${tabs.length || 1} tab)`);
  } else {
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
    client = cdp(version.webSocketDebuggerUrl);
  }

  let fresh = [];
  try {
    for (const page of targets) {
      fresh = fresh.concat(await collectPage(client, page));
      await sleep(1200);
    }
  } finally {
    if (client) client.close();
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
