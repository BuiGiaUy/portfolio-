#!/usr/bin/env node
/**
 * get-cookies.mjs — xuất cookie phiên đăng nhập từ Chrome ra file cookies.txt (Netscape)
 * để dùng với job-collect.mjs (--cookies=...).
 *
 * Không cần mật khẩu: bạn tự đăng nhập LinkedIn / Facebook trong Chrome của mình,
 * script chỉ đọc cookie từ cổng gỡ lỗi cục bộ của chính Chrome đó.
 *
 * Chuẩn bị (một lần):
 *   1. Đóng hết cửa sổ Chrome.
 *   2. Mở Chrome kèm cổng gỡ lỗi, dùng đúng profile bạn đã đăng nhập:
 *      "%ProgramFiles%\\Google\\Chrome\\Application\\chrome.exe" --remote-debugging-port=9222
 *      (thêm --user-data-dir="C:\\chrome-radar" nếu muốn profile riêng, rồi đăng nhập lại trong đó)
 *   3. Đăng nhập linkedin.com và facebook.com trong cửa sổ vừa mở.
 *
 * Dùng:
 *   node tools/get-cookies.mjs                          # linkedin.com + facebook.com -> ~/.radar/cookies.txt
 *   node tools/get-cookies.mjs --domains=linkedin.com   # chỉ LinkedIn
 *   node tools/get-cookies.mjs --out=./cookies.txt --show
 *
 * Cảnh báo: file cookie tương đương mật khẩu phiên đăng nhập — đừng commit, đừng gửi cho ai.
 */

import { mkdir, writeFile } from 'node:fs/promises';
import { homedir } from 'node:os';
import { dirname, resolve } from 'node:path';

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
const domains = String(args.domains || 'linkedin.com,facebook.com')
  .split(',')
  .map((item) => item.trim().toLowerCase())
  .filter(Boolean);
const outPath = resolve(process.cwd(), String(args.out || resolve(homedir(), '.radar', 'cookies.txt')));

function cdpClient(webSocketUrl) {
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
  const send = async (method, params = {}) => {
    await ready;
    const id = ++nextId;
    const result = new Promise((res, rej) => pending.set(id, { resolve: res, reject: rej }));
    socket.send(JSON.stringify({ id, method, params }));
    return result;
  };
  return { send, close: () => socket.close() };
}

async function main() {
  let version;
  try {
    const res = await fetch(`http://127.0.0.1:${port}/json/version`, { signal: AbortSignal.timeout(4000) });
    version = await res.json();
  } catch {
    console.error(`✗ Không thấy Chrome ở cổng ${port}.`);
    console.error('  Đóng hết Chrome rồi chạy lại kèm: --remote-debugging-port=' + port);
    process.exitCode = 1;
    return;
  }

  const client = cdpClient(version.webSocketDebuggerUrl);
  let cookies = [];
  try {
    ({ cookies } = await client.send('Storage.getCookies', {}));
  } catch (error) {
    console.error(`✗ Không đọc được cookie: ${error.message}`);
    process.exitCode = 1;
    return;
  } finally {
    client.close();
  }

  const picked = (cookies || []).filter((cookie) => {
    const domain = String(cookie.domain || '').replace(/^\./, '').toLowerCase();
    return domains.some((needle) => domain === needle || domain.endsWith(`.${needle}`));
  });

  if (!picked.length) {
    console.warn(`! Không có cookie nào cho: ${domains.join(', ')}`);
    console.warn('  Kiểm tra: Chrome đang mở đúng profile đã đăng nhập chưa?');
    process.exitCode = 1;
    return;
  }

  const lines = [
    '# Netscape HTTP Cookie File',
    '# Sinh bởi tools/get-cookies.mjs — đừng commit, đừng chia sẻ file này',
    ''
  ];
  const perDomain = new Map();
  picked.forEach((cookie) => {
    const domain = cookie.domain || '';
    const expires = Number(cookie.expires);
    const expiry = Number.isFinite(expires) && expires > 0 ? Math.round(expires) : 0;
    lines.push(
      [
        domain,
        domain.startsWith('.') ? 'TRUE' : 'FALSE',
        cookie.path || '/',
        cookie.secure ? 'TRUE' : 'FALSE',
        expiry,
        cookie.name,
        cookie.value
      ].join('\t')
    );
    const key = domain.replace(/^\./, '');
    perDomain.set(key, (perDomain.get(key) || 0) + 1);
  });

  await mkdir(dirname(outPath), { recursive: true });
  await writeFile(outPath, `${lines.join('\n')}\n`, { encoding: 'utf8', mode: 0o600 });

  console.log(`✓ ${picked.length} cookie -> ${outPath}`);
  perDomain.forEach((count, domain) => console.log(`  • ${domain}: ${count}`));
  if (args.show) console.log(`  tên cookie: ${[...new Set(picked.map((c) => c.name))].join(', ')}`);
  if (!picked.some((cookie) => /(^|\.)linkedin\.com$/.test((cookie.domain || '').replace(/^\./, '')))) {
    console.warn('  ! chưa có cookie LinkedIn — LinkedIn guest API vẫn có thể bị chặn (mạng VN).');
  }
  console.log(`\nBước tiếp: node tools/job-collect.mjs --sites=linkedin,vieclam24h --cookies="${outPath}" --merge`);
}

main().catch((error) => {
  console.error(`✗ ${error.message}`);
  process.exitCode = 1;
});
