#!/usr/bin/env node
/**
 * radar-collect.mjs — gom dữ liệu social/Reddit cho trang radar.html
 *
 * Trình duyệt không gọi được Reddit (CORS) và không tự đăng nhập được TikTok/
 * Instagram/X/YouTube. Script này chạy trên máy bạn, lấy dữ liệu rồi ghi vào
 * assets/data/social-feed.json — radar.html sẽ đọc file đó khi mở trang.
 *
 * Cách dùng (Node >= 18):
 *   node tools/radar-collect.mjs
 *   node tools/radar-collect.mjs --subs=MachineLearning,LocalLLaMA --limit=25
 *   node tools/radar-collect.mjs --mcp="<lệnh in JSON ra stdout>" --source=tiktok
 *   node tools/radar-collect.mjs --merge --dry
 *
 * Cờ:
 *   --subs=a,b      subreddit lấy bài (mặc định 4 sub về AI/backend)
 *   --limit=N       số bài mỗi sub (mặc định 20)
 *   --mcp="cmd"     chạy lệnh ngoài (socialcrawl-mcp, MediaCrawler...) và đọc JSON
 *   --source=name   gán nguồn cho item từ --mcp (tiktok|instagram|x|threads|youtube|facebook)
 *   --merge         giữ item cũ trong file, chỉ thêm item mới
 *   --dry           in ra stdout, không ghi file
 *   --help
 */

import { exec } from 'node:child_process';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

const run = promisify(exec);
const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, '..');
const OUT_FILE = resolve(ROOT, 'assets/data/social-feed.json');

const DEFAULT_SUBS = ['MachineLearning', 'LocalLLaMA', 'programming', 'webdev'];
const SOCIAL_SOURCES = ['tiktok', 'instagram', 'x', 'threads', 'youtube', 'facebook'];

const args = parseArgs(process.argv.slice(2));

if (args.help) {
  const lines = (await readFile(fileURLToPath(import.meta.url), 'utf8')).split('\n');
  const end = lines.findIndex((line, index) => index > 1 && line.trim() === '*/');
  console.log(lines.slice(2, end === -1 ? undefined : end).map((line) => line.replace(/^\s*\* ?/, '')).join('\n'));
  process.exit(0);
}

const subs = (args.subs || DEFAULT_SUBS.join(',')).split(',').map((s) => s.trim()).filter(Boolean);
const limit = Number(args.limit || 20);
const socialSource = SOCIAL_SOURCES.includes(args.source) ? args.source : 'tiktok';

main().catch((error) => {
  console.error(`✖ ${error.message}`);
  process.exit(1);
});

async function main() {
  const collected = [];

  const redditItems = await collectReddit();
  collected.push(...redditItems);
  console.log(`• Reddit: ${redditItems.length} bài`);

  if (args.mcp) {
    const mcpItems = await collectFromCommand(args.mcp);
    collected.push(...mcpItems);
    console.log(`• ${socialSource}: ${mcpItems.length} bài (từ --mcp)`);
  }

  if (!collected.length && !args.merge) {
    console.log('Không có dữ liệu mới. Dùng --merge nếu muốn giữ file hiện tại.');
    if (!redditItems.length) {
      console.log('Gợi ý: www.reddit.com thường bị chặn DNS ở Việt Nam — bật VPN/proxy rồi chạy lại, hoặc dùng --mcp để lấy từ nguồn khác.');
    }
    return;
  }

  const merged = args.merge ? await mergeWithExisting(collected) : collected;
  const payload = {
    updatedAt: new Date().toISOString(),
    items: merged
  };

  if (args.dry) {
    console.log(JSON.stringify(payload, null, 2));
    return;
  }

  await mkdir(dirname(OUT_FILE), { recursive: true });
  await writeFile(OUT_FILE, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
  console.log(`✔ Ghi ${merged.length} bài vào assets/data/social-feed.json`);
}

async function collectReddit() {
  const results = await Promise.allSettled(subs.map(async (sub) => {
    const res = await fetch(`https://www.reddit.com/r/${sub}/hot.json?limit=${limit}&raw_json=1`, {
      headers: { 'User-Agent': 'tech-radar/1.0 (local collector)' }
    });
    if (!res.ok) throw new Error(`r/${sub}: HTTP ${res.status}`);
    const data = await res.json();
    return (data.data?.children || [])
      .filter((child) => child.data && !child.data.stickied)
      .map((child) => normalize({
        source: 'reddit',
        title: child.data.title,
        url: `https://www.reddit.com${child.data.permalink}`,
        summary: (child.data.selftext || '').slice(0, 220),
        author: child.data.author,
        tags: [sub],
        createdAt: new Date((child.data.created_utc || 0) * 1000).toISOString(),
        metrics: { points: child.data.score || 0, comments: child.data.num_comments || 0 }
      }));
  }));

  const items = [];
  results.forEach((result, index) => {
    if (result.status === 'fulfilled') items.push(...result.value);
    else console.warn(`  ! r/${subs[index]} lỗi: ${result.reason.message}`);
  });
  return items;
}

async function collectFromCommand(command) {
  const { stdout } = await run(command, { maxBuffer: 24 * 1024 * 1024 });
  const parsed = extractJson(stdout);
  const list = Array.isArray(parsed) ? parsed : (parsed.items || parsed.results || parsed.data || []);
  return list
    .map((item) => normalize({ ...item, source: SOCIAL_SOURCES.includes(item.source) ? item.source : socialSource }))
    .filter(Boolean);
}

function extractJson(text) {
  const trimmed = String(text || '').trim();
  try {
    return JSON.parse(trimmed);
  } catch (error) {
    const start = trimmed.search(/[[{]/);
    const end = Math.max(trimmed.lastIndexOf(']'), trimmed.lastIndexOf('}'));
    if (start === -1 || end <= start) throw new Error('Lệnh --mcp không in ra JSON hợp lệ.');
    return JSON.parse(trimmed.slice(start, end + 1));
  }
}

function normalize(item) {
  if (!item || !item.title || !item.url) return null;
  return {
    id: item.id || `${item.source}:${item.url}`,
    source: item.source,
    title: String(item.title).slice(0, 220),
    url: item.url,
    summary: item.summary ? String(item.summary).slice(0, 240) : '',
    author: item.author || '',
    tags: Array.isArray(item.tags) ? item.tags.slice(0, 6) : [],
    createdAt: item.createdAt || new Date().toISOString(),
    metrics: item.metrics && typeof item.metrics === 'object' ? item.metrics : {}
  };
}

async function mergeWithExisting(fresh) {
  let existing = [];
  try {
    const raw = JSON.parse(await readFile(OUT_FILE, 'utf8'));
    existing = Array.isArray(raw) ? raw : (raw.items || []);
  } catch (error) {
    existing = [];
  }
  const byUrl = new Map();
  [...existing, ...fresh].forEach((item) => {
    if (item && item.url) byUrl.set(item.url, item);
  });
  return [...byUrl.values()].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 400);
}

function parseArgs(argv) {
  const out = {};
  argv.forEach((arg) => {
    if (arg === '--help' || arg === '-h') {
      out.help = true;
      return;
    }
    const match = arg.match(/^--([^=]+)(?:=(.*))?$/);
    if (!match) return;
    const [, key, value] = match;
    out[key] = value === undefined ? true : value;
  });
  return out;
}
