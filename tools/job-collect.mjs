#!/usr/bin/env node
/**
 * job-collect.mjs — gom việc làm IT Việt Nam cho radar.html
 *
 * Chạy trên máy bạn (Node >= 18), ghi ra assets/data/job-feed.json.
 * Trang radar.html đọc file đó và chấm điểm theo hồ sơ của bạn.
 *
 * Nguồn lấy được ngay (server render sẵn JSON, không cần key):
 *   - VietnamWorks  /tim-viec-lam  (pools: urgent/featured/best/highSalary/headhunter)
 *   - vieclam24h    /tim-kiem-viec-lam-nhanh?q=...&provinces=...
 *
 * Nguồn cần bạn cấp quyền (xem docs/radar-notes.md):
 *   - TopCV, ITviec : Cloudflare chặn request lạ -> cần cookie cf_clearance
 *   - LinkedIn      : mạng ở VN thường chặn; nếu vào được thì lấy job qua guest API
 *   - Facebook page : cần Page access token (Graph API), xem --fb-token bên dưới
 *
 * Cách dùng:
 *   node tools/job-collect.mjs
 *   node tools/job-collect.mjs --keywords=backend,ai,fullstack --limit=120
 *   node tools/job-collect.mjs --sites=vietnamworks
 *   node tools/job-collect.mjs --merge            # giữ tin cũ, chỉ thêm tin mới
 *   node tools/job-collect.mjs --dry              # in thống kê, không ghi file
 *   node tools/job-collect.mjs --from-json=export.json   # nạp job do tool khác xuất
 *   node tools/job-collect.mjs --sites= --fb-token=EAAB... --fb-pages=topcv.vn,vietnamworks
 *
 * Cờ:
 *   --sites=a,b        vietnamworks,vieclam24h (mặc định cả hai)
 *   --keywords=a,b     từ khoá tìm trên vieclam24h (mặc định backend,ai,fullstack)
 *   --limit=N          số tin tối đa ghi ra (mặc định 150)
 *   --merge            gộp với job-feed.json hiện có
 *   --dry              không ghi file
 *   --from-json=path   gộp thêm file JSON (mảng item hoặc {items:[...]})
 *   --cookies=path     file cookies.txt (Netscape) xuất từ trình duyệt, dùng cho site chặn bot
 *   --linkedin-location=Vietnam   khu vực tìm job LinkedIn (mặc định Vietnam)
 *   --fb-token=...     Page access token, ghi bài page vào assets/data/social-feed.json
 *   --fb-pages=a,b     username/id các page cần lấy (mặc định topcv.vn,itviec)
 *   --fb-limit=N       số bài mỗi page (mặc định 10)
 *   --help
 */

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, '..');
const OUT_FILE = resolve(ROOT, 'assets/data/job-feed.json');
const SOCIAL_FILE = resolve(ROOT, 'assets/data/social-feed.json');

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/157.0.0.0 Safari/537.36';

/* vieclam24h: id tỉnh dùng trong query provinces (đã kiểm chứng bằng trang chi tiết) */
const VL24H_CITIES = [
  { id: '210000160', name: 'Hà Nội' },
  { id: '210000187', name: 'Hồ Chí Minh' }
];

const TECH_SKILLS = [
  ['php', 'PHP'], ['laravel', 'Laravel'], ['node.js', 'Node.js'], ['nodejs', 'Node.js'], ['nestjs', 'NestJS'],
  ['express', 'Express'], ['react', 'React'], ['next.js', 'Next.js'], ['vue', 'Vue'], ['angular', 'Angular'],
  ['typescript', 'TypeScript'], ['javascript', 'JavaScript'], ['python', 'Python'], ['django', 'Django'],
  ['fastapi', 'FastAPI'], ['flask', 'Flask'], ['java', 'Java'], ['spring', 'Spring'], ['golang', 'Golang'],
  ['.net', '.NET'], ['c#', 'C#'], ['ruby', 'Ruby'], ['postgres', 'PostgreSQL'], ['postgresql', 'PostgreSQL'],
  ['mysql', 'MySQL'], ['mongodb', 'MongoDB'], ['redis', 'Redis'], ['elasticsearch', 'Elasticsearch'],
  ['docker', 'Docker'], ['kubernetes', 'Kubernetes'], ['aws', 'AWS'], ['gcp', 'GCP'], ['azure', 'Azure'],
  ['ci/cd', 'CI/CD'], ['microservice', 'Microservices'], ['rest', 'REST API'], ['graphql', 'GraphQL'],
  ['flutter', 'Flutter'], ['android', 'Android'], ['ios', 'iOS'], ['swift', 'Swift'], ['kotlin', 'Kotlin'],
  ['tailwind', 'Tailwind'], ['llm', 'LLM'], ['machine learning', 'Machine Learning'], ['devops', 'DevOps'],
  ['tester', 'Testing'], ['qa/qc', 'QA/QC'], ['automation test', 'Automation Test'], ['selenium', 'Selenium'],
  ['sql', 'SQL'], ['git', 'Git'], ['agile', 'Agile']
];

const IT_TITLE = /(developer|devops|backend|back-end|frontend|front-end|full.?stack|software engineer|software developer|programmer|lập trình viên|ky su phan mem|kỹ sư phần mềm|data engineer|data analyst|machine learning|ai engineer|mlops|tester|qa\/qc|automation test|mobile developer|ios developer|android developer|flutter|react native|node\.?js|reactjs|vuejs|laravel|php developer|java developer|python developer|golang|\.net developer|cloud engineer|security engineer|solution architect|system admin)/i;

const args = parseArgs(process.argv.slice(2));

if (args.help) {
  const lines = (await readFile(fileURLToPath(import.meta.url), 'utf8')).split('\n');
  const end = lines.findIndex((line, index) => index > 1 && line.trim() === '*/');
  console.log(lines.slice(2, end === -1 ? undefined : end).map((line) => line.replace(/^\s*\* ?/, '')).join('\n'));
  process.exit(0);
}

const sites = String(args.sites === undefined ? 'vietnamworks,vieclam24h' : args.sites).split(',').map((s) => s.trim());
const keywords = String(args.keywords || 'backend,ai,fullstack').split(',').map((s) => s.trim()).filter(Boolean);
const limit = Number(args.limit || 150);

main().catch((error) => {
  console.error(`✖ ${error.message}`);
  process.exit(1);
});

async function main() {
  const collected = [];
  await loadCookies();

  if (args['fb-token']) {
    const pages = String(args['fb-pages'] || 'topcv.vn,itviec').split(',').map((page) => page.trim()).filter(Boolean);
    const posts = await collectFacebook(String(args['fb-token']), pages, Number(args['fb-limit'] || 10));
    if (posts.length) {
      await mkdir(dirname(SOCIAL_FILE), { recursive: true });
      await writeFile(SOCIAL_FILE, `${JSON.stringify({ updatedAt: new Date().toISOString(), items: posts }, null, 2)}\n`, 'utf8');
      console.log(`✔ Ghi ${posts.length} bài Facebook vào assets/data/social-feed.json`);
    }
  }

  if (!sites.filter(Boolean).length && !args['from-json']) {
    return;
  }

  if (sites.includes('vietnamworks')) {
    const items = await collectVietnamWorks();
    collected.push(...items);
    console.log(`• VietnamWorks: ${items.length} tin IT`);
  }

  if (sites.includes('linkedin')) {
    const items = await collectLinkedIn();
    collected.push(...items);
    console.log(`• LinkedIn: ${items.length} tin`);
  }

  if (sites.includes('vieclam24h')) {
    const items = await collectVieclam24h();
    collected.push(...items);
    console.log(`• vieclam24h: ${items.length} tin`);
  }

  if (args['from-json']) {
    const items = await readJsonFile(resolve(process.cwd(), args['from-json']));
    const normalized = items.map((item) => normalizeJob({ ...item, source: item.source || 'topcv' })).filter(Boolean);
    collected.push(...normalized);
    console.log(`• từ file ${args['from-json']}: ${normalized.length} tin`);
  }

  const merged = dedupe(args.merge ? [...(await readJsonFile(OUT_FILE)), ...collected] : collected).slice(0, limit);

  if (!merged.length) {
    console.log('Không có tin nào. Kiểm tra mạng hoặc thử --sites=vietnamworks.');
    process.exit(1);
  }

  const bySource = merged.reduce((acc, item) => {
    acc[item.source] = (acc[item.source] || 0) + 1;
    return acc;
  }, {});

  if (args.dry) {
    console.log(JSON.stringify({ updatedAt: new Date().toISOString(), total: merged.length, bySource, sample: merged.slice(0, 3) }, null, 2));
    return;
  }

  await mkdir(dirname(OUT_FILE), { recursive: true });
  await writeFile(OUT_FILE, `${JSON.stringify({ updatedAt: new Date().toISOString(), items: merged }, null, 2)}\n`, 'utf8');
  console.log(`✔ Ghi ${merged.length} tin vào assets/data/job-feed.json (${Object.entries(bySource).map(([k, v]) => `${k}: ${v}`).join(', ')})`);
  console.log('Mở radar.html và bấm "Cập nhật" để thấy dữ liệu mới.');
}

/* ============================ VietnamWorks ============================ */
async function collectVietnamWorks() {
  const data = await fetchNextData('https://www.vietnamworks.com/tim-viec-lam');
  const pools = data.props?.pageProps?.jobsData || {};
  const byId = new Map();

  ['urgentJobs', 'featuredJobs', 'bestJobs', 'highSalaryJobs', 'headhunterJobs', 'partTimeJobs'].forEach((pool) => {
    (pools[pool] || []).forEach((job) => {
      if (!job || !job.jobId || !job.title) return;
      if (!IT_TITLE.test(job.title)) return;
      byId.set(String(job.jobId), job);
    });
  });

  return [...byId.values()].map((job) => normalizeJob({
    source: 'vietnamworks',
    title: job.title,
    url: job.url,
    company: job.company || '',
    salary: job.salary || 'Thương lượng',
    location: (job.workingLocations || []).map((loc) => loc.cityNameVI).filter(Boolean).join(' · '),
    level: job.jobLevel || '',
    summary: stripHtml(job.jobRequirement || job.jobDescription || '').slice(0, 220),
    skills: techSkills(job.title),
    createdAt: null,
    metrics: {}
  })).filter(Boolean);
}

/* ============================= vieclam24h ============================= */
async function collectVieclam24h() {
  const items = [];
  const seen = new Set();

  for (const city of VL24H_CITIES) {
    for (const keyword of keywords) {
      const url = `https://vieclam24h.vn/tim-kiem-viec-lam-nhanh?q=${encodeURIComponent(keyword)}&provinces=${city.id}`;
      try {
        const data = await fetchNextData(url);
        const list = data.props?.initialState?.api?.getJobList?.data?.items || [];
        list.forEach((job) => {
          if (!job || !job.id || !job.title) return;
          if (!IT_TITLE.test(job.title)) return;
          const key = String(job.id);
          if (seen.has(key)) return;
          seen.add(key);
          const province = (job.province_ids && job.province_ids[0]) || city.id;
          items.push(normalizeJob({
            source: 'vieclam24h',
            title: job.title,
            url: `https://vieclam24h.vn/it-phan-mem/${job.title_slug}-c8p${province}id${job.id}.html`,
            company: (job.employer_info && job.employer_info.name) || '',
            salary: salaryText(job.salary_min, job.salary_max),
            location: city.name,
            level: '',
            summary: stripHtml(job.other_requirement_html || job.job_requirement_html || '').slice(0, 220),
            skills: techSkills(`${job.title} ${stripHtml(job.other_requirement_html || '')}`),
            createdAt: job.created_at ? new Date(job.created_at * 1000).toISOString() : null,
            deadline: job.resume_apply_expired ? new Date(job.resume_apply_expired * 1000).toISOString() : null,
            metrics: { views: job.total_views || 0, applicants: job.total_resume_applied || 0 }
          }));
        });
        console.log(`  ↳ ${city.name} · "${keyword}": ${list.length} tin trả về`);
      } catch (error) {
        console.warn(`  ! vieclam24h ${city.name}/${keyword}: ${error.message}`);
      }
      await sleep(1200);
    }
  }

  return items;
}

/* ============================== LinkedIn ============================== */
async function collectLinkedIn() {
  const keywords = String(args.keywords || 'backend,ai,fullstack').split(',').map((k) => k.trim()).filter(Boolean);
  const location = String(args['linkedin-location'] || 'Vietnam');
  const items = [];

  for (const keyword of keywords) {
    const url = 'https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search'
      + `?keywords=${encodeURIComponent(keyword)}&location=${encodeURIComponent(location)}&start=0`;
    try {
      const res = await fetchRaw(url, { Referer: 'https://www.linkedin.com/jobs/search/' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const html = await res.text();
      const parsed = parseLinkedInCards(html);
      items.push(...parsed);
      console.log(`  ↳ LinkedIn "${keyword}": ${parsed.length} tin`);
    } catch (error) {
      console.warn(`  ! LinkedIn "${keyword}": ${error.message} — mạng có thể đang chặn (thử VPN hoặc --cookies)`);
    }
    await sleep(1500);
  }

  return items;
}

function parseLinkedInCards(html) {
  const cards = String(html || '').split('<li>').slice(1);
  const out = [];
  cards.forEach((card) => {
    const href = (card.match(/href="(https:\/\/www\.linkedin\.com\/jobs\/view\/[^"?]+)/) || [])[1];
    if (!href) return;
    const title = stripHtml((card.match(/class="base-search-card__title"[^>]*>([\s\S]*?)<\/h3>/) || [])[1]);
    const company = stripHtml((card.match(/class="base-search-card__subtitle"[^>]*>([\s\S]*?)<\/h4>/) || [])[1]);
    const place = stripHtml((card.match(/class="job-search-card__location"[^>]*>([\s\S]*?)<\/span>/) || [])[1]);
    const datetime = (card.match(/<time[^>]*datetime="([^"]+)"/) || [])[1];
    const salary = stripHtml((card.match(/class="job-search-card__salary-info"[^>]*>([\s\S]*?)<\/span>/) || [])[1]);
    if (!title) return;
    out.push(normalizeJob({
      source: 'linkedin',
      title,
      url: href,
      company,
      salary: salary || 'Thương lượng',
      location: place,
      level: '',
      summary: '',
      skills: techSkills(title),
      createdAt: datetime || null,
      metrics: {}
    }));
  });
  return out.filter(Boolean);
}

/* ============================== Facebook ============================== */
async function collectFacebook(token, pages, limit) {
  const out = [];
  for (const page of pages) {
    const url = `https://graph.facebook.com/v21.0/${encodeURIComponent(page)}/posts`
      + '?fields=id,message,created_time,permalink_url,shares,reactions.summary(true),comments.summary(true)'
      + `&limit=${Math.min(Math.max(limit, 1), 50)}&access_token=${encodeURIComponent(token)}`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error((data.error && data.error.message) || `HTTP ${res.status}`);
      }
      (data.data || []).forEach((post) => {
        const message = String(post.message || '').trim();
        if (!message) return;
        out.push({
          source: 'facebook',
          title: message.split('\n')[0].slice(0, 180),
          url: post.permalink_url || `https://www.facebook.com/${post.id}`,
          summary: message.replace(/\s+/g, ' ').slice(0, 220),
          author: page,
          tags: ['facebook'],
          createdAt: post.created_time ? new Date(post.created_time).toISOString() : null,
          metrics: {
            likes: (post.reactions && post.reactions.summary && post.reactions.summary.total_count) || 0,
            comments: (post.comments && post.comments.summary && post.comments.summary.total_count) || 0,
            shares: (post.shares && post.shares.count) || 0
          }
        });
      });
      console.log(`  ↳ Facebook ${page}: ${(data.data || []).length} bài`);
    } catch (error) {
      console.warn(`  ! Facebook ${page}: ${error.message}`);
    }
    await sleep(800);
  }
  return out;
}

/* ============================== tiện ích ============================== */
let COOKIE_HEADER = '';

async function loadCookies() {
  if (!args.cookies) return;
  try {
    const raw = await readFile(resolve(process.cwd(), String(args.cookies)), 'utf8');
    const pairs = raw
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith('#'))
      .map((line) => line.split('\t'))
      .filter((cols) => cols.length >= 7)
      .map((cols) => `${cols[5]}=${cols[6]}`);
    COOKIE_HEADER = [...new Set(pairs)].join('; ');
    console.log(`• cookies: ${pairs.length} cookie từ ${args.cookies}`);
  } catch (error) {
    console.warn(`  ! không đọc được ${args.cookies}: ${error.message}`);
  }
}

async function fetchRaw(url, extraHeaders = {}) {
  const headers = {
    'User-Agent': UA,
    'Accept-Language': 'vi,en;q=0.9',
    Accept: 'text/html,application/xhtml+xml',
    ...extraHeaders
  };
  if (COOKIE_HEADER) headers.Cookie = COOKIE_HEADER;
  return fetch(url, { headers });
}

async function fetchNextData(url) {
  const res = await fetchRaw(url);
  if (!res.ok) throw new Error(`${url} -> HTTP ${res.status}`);
  const html = await res.text();
  const match = html.match(/<script[^>]*id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/i);
  if (!match) throw new Error(`${url} -> không tìm thấy __NEXT_DATA__ (trang có thể đang chặn bot)`);
  return JSON.parse(match[1]);
}

function techSkills(text) {
  const haystack = String(text || '').toLowerCase();
  const found = [];
  TECH_SKILLS.forEach(([needle, label]) => {
    if (haystack.includes(needle) && !found.includes(label)) found.push(label);
  });
  return found.slice(0, 4);
}

function salaryText(min, max) {
  const toMillions = (value) => Math.round(value / 1e6);
  if (min && max) return `${toMillions(min)}–${toMillions(max)} triệu`;
  if (min) return `từ ${toMillions(min)} triệu`;
  if (max) return `tới ${toMillions(max)} triệu`;
  return 'Thương lượng';
}

function stripHtml(html) {
  return String(html || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/\s+/g, ' ')
    .trim();
}

function normalizeJob(item) {
  if (!item || !item.title || !item.url) return null;
  return {
    id: item.id || `job:${item.source}:${item.url}`,
    kind: 'job',
    source: item.source,
    title: String(item.title).slice(0, 200),
    url: item.url,
    company: item.company ? String(item.company).slice(0, 120) : '',
    salary: item.salary || 'Thương lượng',
    location: item.location || '',
    level: item.level || '',
    summary: item.summary || '',
    skills: Array.isArray(item.skills) ? item.skills.slice(0, 8) : [],
    createdAt: item.createdAt || null,
    deadline: item.deadline || null,
    metrics: item.metrics && typeof item.metrics === 'object' ? item.metrics : {}
  };
}

function dedupe(items) {
  const byUrl = new Map();
  items.filter(Boolean).forEach((item) => {
    if (!item.url) return;
    byUrl.set(item.url, item);
  });
  return [...byUrl.values()].sort((a, b) => {
    const at = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const bt = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return bt - at;
  });
}

async function readJsonFile(path) {
  try {
    const raw = JSON.parse(await readFile(path, 'utf8'));
    return Array.isArray(raw) ? raw : (raw.items || []);
  } catch (error) {
    return [];
  }
}

function sleep(ms) {
  return new Promise((resolveSleep) => setTimeout(resolveSleep, ms));
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
    out[match[1]] = match[2] === undefined ? true : match[2];
  });
  return out;
}
