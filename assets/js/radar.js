/* ==========================================================================
   TECH RADAR — gom dữ liệu công nghệ realtime và chấm điểm theo hồ sơ
   --------------------------------------------------------------------------
   Nguồn mở gọi trực tiếp từ browser: Hacker News (Algolia), Dev.to, GitHub.
   Reddit bị chặn CORS -> cần proxy hoặc để tools/radar-collect.mjs lấy hộ.
   Mạng xã hội: đọc assets/data/social-feed.json do collector local ghi ra,
   hoặc dán JSON trực tiếp trong dialog "Dán JSON từ collector".
   ========================================================================== */

const STORAGE = {
  saved: 'radar:saved',
  social: 'radar:social',
  jobs: 'radar:jobs',
  filters: 'radar:filters'
};

const AUTO_REFRESH_MS = 15 * 60 * 1000;
const DEFAULT_JOB_SOURCES = ['vieclam24h', 'vietnamworks', 'topcv', 'itviec', 'linkedin', 'facebook'];
const MAX_ITEMS = 400;

/* ---------- Chủ đề + từ khoá (không phân biệt dấu) ---------- */
const TOPICS = {
  ai: {
    label: 'AI Engineering',
    color: 'accent',
    weight: 1.25,
    keywords: [
      'llm', 'rag', 'retrieval augmented', 'langgraph', 'langchain', 'llamaindex', 'agent', 'multi-agent',
      'prompt engineering', 'embedding', 'vector database', 'pgvector', 'qdrant', 'fine-tuning', 'lora',
      'guardrail', 'evaluation', 'openai', 'anthropic', 'claude', 'gpt', 'gemini', 'llama', 'mistral',
      'hugging face', 'mlops', 'llmops', 'transformer', 'inference', 'tool calling', 'mcp'
    ]
  },
  backend: {
    label: 'Full-stack / Backend',
    color: 'accent2',
    weight: 1.05,
    keywords: [
      'nestjs', 'fastapi', 'laravel', 'node.js', 'nodejs', 'typescript', 'python', 'javascript',
      'postgresql', 'postgres', 'mysql', 'redis', 'docker', 'kubernetes', 'prisma', 'rest api',
      'graphql', 'microservice', 'ci/cd', 'github actions', 'jwt', 'system design', 'next.js', 'react',
      'tailwind', 'flutter', 'webhook', 'websocket'
    ]
  },
  jobs: {
    label: 'Việc làm & tuyển dụng',
    color: 'accent3',
    weight: 1.15,
    keywords: [
      'tuyển dụng', 'tuyen dung', 'hiring', 'we are hiring', 'job', 'jobs', 'remote', 'senior',
      'junior', 'fresher', 'intern', 'internship', 'salary', 'lương', 'ứng tuyển', 'recruiter',
      'full-time', 'contract', 'freelance', 'looking for', 'cần người'
    ]
  },
  vn: {
    label: 'Thị trường Việt Nam',
    color: 'accent4',
    weight: 1.2,
    keywords: [
      'việt nam', 'vietnam', 'hà nội', 'hanoi', 'hồ chí minh', 'hcm', 'saigon', 'đà nẵng', 'da nang',
      'vingroup', 'vinuni', 'fpt', 'vng', 'tiki', 'shopee', 'zalopay', 'momo', 'viettel', 'vnpay',
      'tiếng việt', 'vietnamese', 'vn'
    ]
  }
};

/* ---------- Nguồn ---------- */
const SOURCES = {
  hn: {
    label: 'Hacker News',
    badge: 'text-accent border-accent/40 bg-accent/10',
    kind: 'open'
  },
  devto: {
    label: 'Dev.to',
    badge: 'text-fg-strong border-line bg-surface-3',
    kind: 'open'
  },
  github: {
    label: 'GitHub',
    badge: 'text-accent-2 border-accent-2/40 bg-accent-2/10',
    kind: 'open'
  },
  reddit: {
    label: 'Reddit',
    badge: 'text-accent-4 border-accent-4/40 bg-accent-4/10',
    kind: 'proxy'
  },
  vietnamworks: { label: 'VietnamWorks', badge: 'text-accent border-accent/40 bg-accent/10', kind: 'job' },
  vieclam24h: { label: 'vieclam24h', badge: 'text-accent-2 border-accent-2/40 bg-accent-2/10', kind: 'job' },
  topcv: { label: 'TopCV', badge: 'text-accent-3 border-accent-3/40 bg-accent-3/10', kind: 'job' },
  linkedin: { label: 'LinkedIn', badge: 'text-sky-500 border-sky-500/40 bg-sky-500/10', kind: 'job' },
  itviec: { label: 'ITviec', badge: 'text-rose-500 border-rose-500/40 bg-rose-500/10', kind: 'job' },
  tiktok: { label: 'TikTok', badge: 'text-fg-strong border-line bg-surface-3', kind: 'social' },
  instagram: { label: 'Instagram', badge: 'text-accent-2 border-accent-2/40 bg-accent-2/10', kind: 'social' },
  x: { label: 'X / Twitter', badge: 'text-fg-strong border-line bg-surface-3', kind: 'social' },
  threads: { label: 'Threads', badge: 'text-fg-strong border-line bg-surface-3', kind: 'social' },
  youtube: { label: 'YouTube', badge: 'text-rose-500 border-rose-500/40 bg-rose-500/10', kind: 'social' },
  facebook: { label: 'Facebook', badge: 'text-accent border-accent/40 bg-accent/10', kind: 'social' }
};

const state = {
  items: [],
  status: {},
  filters: {
    windowHours: 720,
    sort: 'score',
    query: '',
    topics: Object.keys(TOPICS),
    sources: DEFAULT_JOB_SOURCES.slice(),
    location: 'all'
  },
  saved: [],
  social: [],
  jobs: [],
  loading: false
};

/* ==========================================================================
   TIỆN ÍCH
   ========================================================================== */
function normalizeText(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase();
}

function isWordChar(char) {
  return /[a-z0-9]/i.test(char || '');
}

function hasTerm(haystack, term) {
  const needle = normalizeText(term).trim();
  if (!needle) return false;
  if (needle.length <= 3) {
    let from = 0;
    while (from <= haystack.length) {
      const at = haystack.indexOf(needle, from);
      if (at === -1) return false;
      const before = haystack[at - 1];
      const after = haystack[at + needle.length];
      if (!isWordChar(before) && !isWordChar(after)) return true;
      from = at + 1;
    }
    return false;
  }
  return haystack.includes(needle);
}

function stripHtml(html) {
  const div = document.createElement('div');
  div.innerHTML = html || '';
  return (div.textContent || '').replace(/\s+/g, ' ').trim();
}

function timeAgo(isoDate) {
  const then = new Date(isoDate).getTime();
  if (!then || Number.isNaN(then)) return '—';
  const diffMin = Math.round((Date.now() - then) / 60000);
  if (diffMin < 1) return 'vừa xong';
  if (diffMin < 60) return `${diffMin} phút trước`;
  const hours = Math.round(diffMin / 60);
  if (hours < 24) return `${hours} giờ trước`;
  const days = Math.round(hours / 24);
  if (days < 30) return `${days} ngày trước`;
  return new Date(then).toLocaleDateString('vi-VN');
}

function formatNumber(value) {
  const num = Number(value) || 0;
  if (num >= 1000) return `${(num / 1000).toFixed(num >= 10000 ? 0 : 1)}k`;
  return String(num);
}

async function fetchJSON(url, timeoutMs = 9000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { signal: controller.signal, cache: 'no-store', headers: { Accept: 'application/json' } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } finally {
    clearTimeout(timer);
  }
}

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.innerHTML = `
    <div class="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-surface border border-accent/40 text-fg-strong text-xs shadow-2xl backdrop-blur-md">
      <span class="w-2 h-2 rounded-full bg-accent-3"></span>
      <span>${message}</span>
    </div>`;
  toast.classList.add('show');
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => toast.classList.remove('show'), 3200);
}

/* ==========================================================================
   FETCHERS
   ========================================================================== */
async function fetchHackerNews() {
  const data = await fetchJSON('https://hn.algolia.com/api/v1/search_by_date?tags=story&hitsPerPage=80');
  return (data.hits || [])
    .filter((hit) => hit.title)
    .map((hit) => ({
      id: `hn:${hit.objectID}`,
      source: 'hn',
      title: hit.title,
      url: hit.url || `https://news.ycombinator.com/item?id=${hit.objectID}`,
      summary: hit.story_text ? stripHtml(hit.story_text).slice(0, 220) : '',
      author: hit.author,
      tags: [],
      createdAt: hit.created_at,
      metrics: { points: hit.points || 0, comments: hit.num_comments || 0 }
    }));
}

async function fetchDevTo() {
  const data = await fetchJSON('https://dev.to/api/articles?per_page=80&top=7');
  return (Array.isArray(data) ? data : []).map((article) => ({
    id: `devto:${article.id}`,
    source: 'devto',
    title: article.title,
    url: article.url,
    summary: article.description || '',
    author: article.user && article.user.name,
    tags: article.tag_list || [],
    createdAt: article.published_at || article.created_at,
    metrics: {
      reactions: article.public_reactions_count || 0,
      comments: article.comments_count || 0
    }
  }));
}

async function fetchGitHub() {
  const since = new Date(Date.now() - 21 * 86400000).toISOString().slice(0, 10);
  const query = encodeURIComponent(`created:>${since} stars:>15`);
  const data = await fetchJSON(`https://api.github.com/search/repositories?q=${query}&sort=stars&order=desc&per_page=40`);
  return (data.items || []).map((repo) => ({
    id: `gh:${repo.full_name}`,
    source: 'github',
    title: repo.full_name,
    url: repo.html_url,
    summary: repo.description || '',
    author: repo.owner && repo.owner.login,
    tags: [...(repo.topics || []), repo.language].filter(Boolean),
    createdAt: repo.created_at,
    metrics: { stars: repo.stargazers_count || 0, forks: repo.forks_count || 0 }
  }));
}

async function fetchReddit(proxyPrefix) {
  const subs = ['MachineLearning', 'LocalLLaMA', 'programming', 'webdev'];
  const results = await Promise.allSettled(subs.map(async (sub) => {
    const target = `https://www.reddit.com/r/${sub}/hot.json?limit=20&raw_json=1`;
    const url = proxyPrefix ? proxyPrefix + encodeURIComponent(target) : target;
    const data = await fetchJSON(url);
    const children = (data.data && data.data.children) || [];
    return children
      .filter((child) => child.data && !child.data.stickied)
      .map((child) => ({
        id: `reddit:${child.data.id}`,
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

  const merged = results.flatMap((result) => (result.status === 'fulfilled' ? result.value : []));
  if (!merged.length) throw new Error('CORS/proxy bị chặn');
  return merged;
}

async function loadJobFile() {
  try {
    const data = await fetchJSON(`assets/data/job-feed.json?t=${Date.now()}`, 4000);
    const items = Array.isArray(data) ? data : (data.items || []);
    return items;
  } catch (error) {
    return null;
  }
}

async function loadSocialFile() {
  try {
    const data = await fetchJSON(`assets/data/social-feed.json?t=${Date.now()}`, 4000);
    const items = Array.isArray(data) ? data : (data.items || []);
    return items;
  } catch (error) {
    return null;
  }
}

/* ==========================================================================
   CHẤM ĐIỂM
   ========================================================================== */
function engagementScore(item) {
  const metrics = item.metrics || {};
  const raw =
    (metrics.points || 0) +
    (metrics.stars || 0) * 0.6 +
    (metrics.reactions || 0) * 2 +
    (metrics.comments || 0) * 1.5 +
    (metrics.views || 0) / 200 +
    (metrics.likes || 0) * 0.5;
  if (!raw) return 0;
  return Math.min(22, Math.round(Math.log10(1 + raw) * 8));
}

function scoreItem(item) {
  const haystack = normalizeText([
    item.title,
    item.summary,
    (item.tags || []).join(' '),
    item.author
  ].join(' '));

  const matched = [];
  let raw = 0;

  Object.entries(TOPICS).forEach(([key, pack]) => {
    pack.keywords.forEach((keyword) => {
      if (!hasTerm(haystack, keyword)) return;
      matched.push({ key, keyword });
      raw += 9 * pack.weight;
    });
  });

  const uniqueKeywords = [...new Set(matched.map((entry) => entry.keyword))].slice(0, 5);
  const topics = [...new Set(matched.map((entry) => entry.key))];
  const isLocalSource = item.kind === 'job' || (SOURCES[item.source] && SOURCES[item.source].kind === 'social');
  if (!topics.length && isLocalSource) topics.push('vn');
  const score = Math.round(Math.min(100, 16 + Math.min(62, raw) + engagementScore(item)));
  return { score, matchedKeywords: uniqueKeywords, topics };
}

/* ==========================================================================
   TẢI DỮ LIỆU
   ========================================================================== */
function setSourceStatus(key, ok, detail) {
  state.status[key] = { ok, detail, at: Date.now() };
}

async function refreshData() {
  if (state.loading) return;
  state.loading = true;

  const icon = document.getElementById('refreshIcon');
  if (icon) icon.classList.add('spinning');

  const tasks = [
    { key: 'hn', run: fetchHackerNews },
    { key: 'devto', run: fetchDevTo },
    { key: 'github', run: fetchGitHub },
    { key: 'reddit', run: () => fetchReddit('') }
  ];

  const settled = await Promise.allSettled(tasks.map((task) => task.run()));
  const collected = [];

  settled.forEach((result, index) => {
    const key = tasks[index].key;
    if (result.status === 'fulfilled') {
      collected.push(...result.value);
      setSourceStatus(key, true, `${result.value.length} bài`);
    } else {
      setSourceStatus(key, false, 'không tải được');
    }
  });

  const fileSocial = await loadSocialFile();
  if (fileSocial && fileSocial.length) {
    state.social = mergeById(state.social, normalizeSocialItems(fileSocial));
    setSourceStatus('social', true, `${fileSocial.length} bài (file)`);
  } else if (state.social.length) {
    setSourceStatus('social', true, `${state.social.length} bài (local)`);
  } else {
    setSourceStatus('social', false, 'chưa có dữ liệu');
  }

  const fileJobs = await loadJobFile();
  if (fileJobs && fileJobs.length) {
    state.jobs = mergeById(state.jobs, normalizeJobItems(fileJobs));
    setSourceStatus('jobs', true, `${fileJobs.length} tin (file)`);
  } else if (state.jobs.length) {
    setSourceStatus('jobs', true, `${state.jobs.length} tin (local)`);
  } else {
    setSourceStatus('jobs', false, 'chưa có dữ liệu');
  }

  const socialItems = state.social.map((item) => ({ ...item, source: item.source || 'tiktok' }));
  const jobItems = state.jobs.map((item) => ({ ...item, kind: 'job' }));
  const scored = [...collected, ...jobItems, ...socialItems].map((item, index) => ({
    ...item,
    id: item.id || item.url || `item:${index}`,
    ...scoreItem(item)
  }));

  const noJobData = !state.jobs.length && !state.social.length;
  if (noJobData && !localStorage.getItem(STORAGE.filters)) {
    state.filters.sources = Object.keys(SOURCES);
    syncChipState();
  }

  const seen = new Set();
  state.items = scored
    .filter((item) => {
      if (!item.url || seen.has(item.url)) return false;
      seen.add(item.url);
      return true;
    })
    .slice(0, MAX_ITEMS);

  state.loading = false;
  if (icon) icon.classList.remove('spinning');
  setLastUpdated();
  render();
}

function setLastUpdated() {
  const el = document.getElementById('lastUpdated');
  if (!el) return;
  const time = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
  el.textContent = `cập nhật ${time}`;
}

/* ==========================================================================
   LỌC + RENDER
   ========================================================================== */
function visibleItems() {
  const { windowHours, sort, query, topics, sources, location } = state.filters;
  const threshold = windowHours ? Date.now() - windowHours * 3600000 : 0;
  const needle = normalizeText(query);

  const filtered = state.items.filter((item) => {
    if (!sources.includes(item.source)) return false;
    if (!(item.topics || []).some((topic) => topics.includes(topic))) return false;
    const created = new Date(item.createdAt).getTime();
    if (threshold && created && created < threshold) return false;
    if (location && location !== 'all') {
      if (item.kind !== 'job') return false;
      const place = normalizeText(`${item.location || ''} ${item.title || ''}`);
      if (!place.includes(normalizeText(location))) return false;
    }
    if (needle) {
      const haystack = normalizeText([
        item.title,
        item.summary,
        item.company,
        (item.tags || []).join(' '),
        (item.skills || []).join(' ')
      ].join(' '));
      if (!haystack.includes(needle)) return false;
    }
    return true;
  });

  const sorted = filtered.slice();
  if (sort === 'date') {
    sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } else if (sort === 'engagement') {
    sorted.sort((a, b) => engagementScore(b) - engagementScore(a));
  } else {
    sorted.sort((a, b) => b.score - a.score || new Date(b.createdAt) - new Date(a.createdAt));
  }
  return sorted;
}

function renderChips() {
  const topicWrap = document.getElementById('topicChips');
  if (topicWrap) {
    topicWrap.innerHTML = Object.entries(TOPICS).map(([key, pack]) => `
      <button class="radar-chip" data-topic="${key}" aria-pressed="${state.filters.topics.includes(key)}">${pack.label}</button>
    `).join('');
  }

  const sourceWrap = document.getElementById('sourceChips');
  if (sourceWrap) {
    const jobKeys = ['vieclam24h', 'vietnamworks', 'topcv', 'itviec', 'linkedin'];
    const socialKeys = [...new Set(['facebook', ...state.items.map((item) => item.source).filter((key) => SOURCES[key] && SOURCES[key].kind === 'social')])];
    sourceWrap.innerHTML = [...jobKeys, 'hn', 'devto', 'github', 'reddit', ...socialKeys].map((key) => `
      <button class="radar-chip" data-source="${key}" aria-pressed="${state.filters.sources.includes(key)}">${SOURCES[key].label}</button>
    `).join('');
  }
}

function syncChipState() {
  document.querySelectorAll('[data-topic]').forEach((button) => {
    button.setAttribute('aria-pressed', String(state.filters.topics.includes(button.getAttribute('data-topic'))));
  });
  document.querySelectorAll('[data-source]').forEach((button) => {
    button.setAttribute('aria-pressed', String(state.filters.sources.includes(button.getAttribute('data-source'))));
  });
}

function renderStatus() {
  const wrap = document.getElementById('sourceStatus');
  if (!wrap) return;
  const entries = ['jobs', 'hn', 'devto', 'github', 'reddit', 'social'];
  wrap.innerHTML = entries.map((key) => {
    const status = state.status[key];
    const label = key === 'social' ? 'Facebook / MXH' : key === 'jobs' ? 'Việc làm VN' : SOURCES[key].label;
    const ok = status && status.ok;
    const dot = !status ? 'bg-fg-muted/40' : ok ? 'bg-accent-3' : 'bg-rose-500';
    const detail = !status ? 'đang chờ' : status.detail;
    return `
      <span class="inline-flex items-center gap-1.5 text-[11px] px-2 py-1 rounded-lg border border-line/60 bg-surface-2 text-fg-muted">
        <span class="w-1.5 h-1.5 rounded-full ${dot}"></span>
        ${label}<span class="text-fg-muted/70">·</span><span class="font-mono">${detail}</span>
      </span>`;
  }).join('');
}

function renderStats(items) {
  const total = document.getElementById('statTotal');
  const sources = document.getElementById('statSources');
  const score = document.getElementById('statScore');
  const saved = document.getElementById('statSaved');
  if (total) total.textContent = String(items.length);
  if (sources) {
    const keys = ['jobs', 'hn', 'devto', 'github', 'reddit', 'social'];
    const okCount = keys.filter((key) => state.status[key] && state.status[key].ok).length;
    sources.textContent = `${okCount}/${keys.length}`;
  }
  if (score) {
    score.textContent = items.length ? String(Math.round(items.reduce((sum, item) => sum + item.score, 0) / items.length)) : '—';
  }
  if (saved) saved.textContent = String(state.saved.length);
}

function metricsLine(item) {
  const metrics = item.metrics || {};
  const parts = [];
  if (metrics.points) parts.push(`▲ ${formatNumber(metrics.points)}`);
  if (metrics.stars) parts.push(`★ ${formatNumber(metrics.stars)}`);
  if (metrics.reactions) parts.push(`♥ ${formatNumber(metrics.reactions)}`);
  if (metrics.comments) parts.push(`💬 ${formatNumber(metrics.comments)}`);
  if (metrics.views) parts.push(`👁 ${formatNumber(metrics.views)}`);
  if (metrics.likes) parts.push(`👍 ${formatNumber(metrics.likes)}`);
  return parts.join('  ');
}

function renderFeed() {
  const feed = document.getElementById('feed');
  const empty = document.getElementById('feedEmpty');
  if (!feed) return;

  const items = visibleItems();
  renderStats(items);

  if (!items.length) {
    feed.innerHTML = '';
    if (empty) empty.classList.remove('hidden');
    return;
  }
  if (empty) empty.classList.add('hidden');

  const chip = (text, isKeyword) => `<span class="text-[10px] px-1.5 py-0.5 rounded border font-mono truncate max-w-[170px] ${
    isKeyword ? 'bg-accent/10 text-accent border-accent/20' : 'bg-surface-3 text-fg-muted border-line/50'
  }" title="${escapeHtml(text)}">${escapeHtml(text)}</span>`;

  feed.innerHTML = items.slice(0, 120).map((item) => {
    const meta = SOURCES[item.source] || SOURCES.hn;
    const isJob = item.kind === 'job';
    const saved = state.saved.some((entry) => entry.id === item.id);
    const matched = (item.matchedKeywords || []).slice(0, 3);
    const used = matched.map((keyword) => normalizeText(keyword));
    const extra = [...new Set(isJob ? (item.skills || []) : (item.tags || []))]
      .filter((tag) => !used.includes(normalizeText(tag)))
      .slice(0, 2);
    const chips = matched.map((keyword) => chip(keyword, true)).join('') + extra.map((tag) => chip(tag, false)).join('');

    const jobLine = isJob ? `
      <div class="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px]">
        ${item.company ? `<span class="text-fg font-semibold">${escapeHtml(item.company)}</span>` : ''}
        ${item.location ? `<span class="text-fg-muted">📍 ${escapeHtml(item.location)}</span>` : ''}
        ${item.level ? `<span class="text-fg-muted">· ${escapeHtml(item.level)}</span>` : ''}
        <span class="text-accent-3 font-mono font-semibold">${escapeHtml(item.salary)}</span>
      </div>` : '';

    const deadline = isJob && item.deadline
      ? `<span class="text-[10px] text-fg-muted font-mono">hạn ${new Date(item.deadline).toLocaleDateString('vi-VN')}</span>`
      : '';

    return `
      <article class="radar-card glass-panel rounded-xl border border-line/60 p-4 flex flex-col gap-2.5">
        <div class="flex items-center justify-between gap-2">
          <span class="radar-source-badge ${meta.badge}">${escapeHtml(meta.label)}</span>
          <div class="flex items-center gap-2">
            ${deadline}
            <span class="text-[10px] text-fg-muted font-mono">${timeAgo(item.createdAt)}</span>
            <span class="text-[11px] font-mono font-bold ${item.score >= 70 ? 'text-accent-3' : item.score >= 45 ? 'text-accent-4' : 'text-fg-muted'}">${item.score}</span>
          </div>
        </div>

        <a href="${escapeHtml(item.url)}" target="_blank" rel="noopener noreferrer" class="text-sm font-semibold text-fg-strong hover:text-accent transition-colors leading-snug line-clamp-2">
          ${escapeHtml(item.title)}
        </a>

        ${jobLine}
        ${!isJob && item.summary ? `<p class="text-xs text-fg-muted leading-relaxed line-clamp-2">${escapeHtml(item.summary)}</p>` : ''}

        <div class="radar-score-bar"><div class="radar-score-fill" style="width:${item.score}%"></div></div>

        <div class="flex flex-wrap items-center gap-1.5">${chips}</div>

        <div class="flex items-center justify-between gap-2 pt-1.5 border-t border-line/40 mt-auto">
          <a href="${escapeHtml(item.url)}" target="_blank" rel="noopener noreferrer"
             class="inline-flex items-center gap-1 text-[11px] font-semibold text-accent hover:underline">
            Mở bài gốc
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
          </a>
          <div class="flex items-center gap-2">
            <span class="hidden sm:inline text-[10px] text-fg-muted font-mono">${metricsLine(item)}</span>
            <button data-save="${escapeHtml(item.id)}" class="text-[11px] px-2 py-1 rounded-lg border transition-colors ${saved ? 'bg-accent-3/15 border-accent-3/40 text-accent-3' : 'bg-surface-3/60 border-line text-fg-muted hover:text-fg-strong'}" title="${saved ? 'Bỏ lưu' : 'Lưu để đọc sau'}">
              ${saved ? '✓ đã lưu' : '+ lưu'}
            </button>
          </div>
        </div>
      </article>`;
  }).join('');
}

function renderSaved() {
  const list = document.getElementById('savedList');
  if (!list) return;
  if (!state.saved.length) {
    list.innerHTML = '<li class="italic">Chưa lưu bài nào.</li>';
    return;
  }
  list.innerHTML = state.saved.slice().reverse().map((entry) => `
    <li class="flex items-start justify-between gap-3 py-1.5 border-b border-line/40 last:border-0">
      <a href="${escapeHtml(entry.url)}" target="_blank" rel="noopener noreferrer" class="text-fg hover:text-accent transition-colors leading-snug">
        <span class="font-mono text-[10px] text-fg-muted mr-1.5">${escapeHtml((SOURCES[entry.source] || {}).label || entry.source)}</span>${escapeHtml(entry.title)}
        <span class="text-accent ml-1">↗</span>
      </a>
      <button data-unsave="${entry.id}" class="text-[11px] text-fg-muted hover:text-rose-500 shrink-0">xoá</button>
    </li>`).join('');
}

function render() {
  renderChips();
  renderStatus();
  renderFeed();
  renderSaved();
}

/* ==========================================================================
   LƯU TRỮ
   ========================================================================== */
function loadStorage() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE.saved) || '[]');
    state.saved = Array.isArray(saved) ? saved.slice(-200) : [];
  } catch (error) {
    state.saved = [];
  }
  try {
    const social = JSON.parse(localStorage.getItem(STORAGE.social) || '[]');
    state.social = Array.isArray(social) ? social.slice(-200) : [];
  } catch (error) {
    state.social = [];
  }
  try {
    const jobs = JSON.parse(localStorage.getItem(STORAGE.jobs) || '[]');
    state.jobs = Array.isArray(jobs) ? normalizeJobItems(jobs).slice(-200) : [];
  } catch (error) {
    state.jobs = [];
  }
  try {
    const filters = JSON.parse(localStorage.getItem(STORAGE.filters) || 'null');
    if (filters && typeof filters === 'object') {
      state.filters = { ...state.filters, ...filters };
      state.filters.topics = Array.isArray(state.filters.topics) && state.filters.topics.length ? state.filters.topics : Object.keys(TOPICS);
      state.filters.sources = Array.isArray(state.filters.sources) && state.filters.sources.length ? state.filters.sources : Object.keys(SOURCES);
    }
  } catch (error) {
    /* giữ mặc định */
  }
}

function persistSaved() {
  try {
    localStorage.setItem(STORAGE.saved, JSON.stringify(state.saved));
  } catch (error) {
    /* localStorage đầy hoặc bị chặn */
  }
}

function persistFilters() {
  try {
    localStorage.setItem(STORAGE.filters, JSON.stringify(state.filters));
  } catch (error) {
    /* bỏ qua */
  }
}

const SAVE_BTN_ON = 'text-[11px] px-2 py-1 rounded-lg border transition-colors bg-accent-3/15 border-accent-3/40 text-accent-3';
const SAVE_BTN_OFF = 'text-[11px] px-2 py-1 rounded-lg border transition-colors bg-surface-3/60 border-line text-fg-muted hover:text-fg-strong';

function paintSaveButton(button, saved) {
  button.textContent = saved ? '✓ đã lưu' : '+ lưu';
  button.className = saved ? SAVE_BTN_ON : SAVE_BTN_OFF;
  button.title = saved ? 'Bỏ lưu' : 'Lưu để đọc sau';
}

function toggleSave(itemId) {
  const existing = state.saved.findIndex((entry) => entry.id === itemId);
  if (existing >= 0) {
    state.saved.splice(existing, 1);
  } else {
    const item = state.items.find((entry) => entry.id === itemId);
    if (!item) return;
    state.saved.push({
      id: item.id,
      title: item.title,
      url: item.url,
      source: item.source,
      score: item.score,
      createdAt: item.createdAt
    });
  }
  const saved = existing < 0;
  document.querySelectorAll('[data-save]').forEach((button) => {
    if (button.getAttribute('data-save') === itemId) paintSaveButton(button, saved);
  });
  const statSaved = document.getElementById('statSaved');
  if (statSaved) statSaved.textContent = String(state.saved.length);
  persistSaved();
  renderSaved();
}

/* ==========================================================================
   XUẤT DỮ LIỆU
   ========================================================================== */
function download(filename, content, type = 'text/plain') {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function exportMarkdown() {
  if (!state.saved.length) {
    showToast('Chưa có bài nào để xuất.');
    return;
  }
  const lines = ['# Tech Radar — bài đã lưu', `_Xuất ngày ${new Date().toLocaleString('vi-VN')}_`, ''];
  state.saved.forEach((entry) => {
    lines.push(`- [${entry.title}](${entry.url}) — ${(SOURCES[entry.source] || {}).label || entry.source}, điểm ${entry.score}`);
  });
  download('tech-radar-saved.md', lines.join('\n'), 'text/markdown');
  showToast('Đã xuất Markdown.');
}

function exportJson() {
  if (!state.saved.length) {
    showToast('Chưa có bài nào để xuất.');
    return;
  }
  download('tech-radar-saved.json', JSON.stringify(state.saved, null, 2), 'application/json');
  showToast('Đã xuất JSON.');
}

/* ==========================================================================
   SOCIAL FEED
   ========================================================================== */
function escapeHtml(value) {
  return String(value == null ? '' : value).replace(/[&<>"']/g, (ch) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[ch]));
}

function mergeById(current, incoming) {
  const byId = new Map();
  [...current, ...incoming].forEach((item) => {
    if (!item) return;
    const key = item.id || item.url;
    if (key) byId.set(key, item);
  });
  return [...byId.values()];
}

function normalizeJobItems(raw) {
  const list = Array.isArray(raw) ? raw : (raw && raw.items) || [];
  return list
    .filter((item) => item && item.title && item.url)
    .map((item) => ({
      id: item.id || `job:${item.source || 'vietnamworks'}:${item.url}`,
      kind: 'job',
      source: SOURCES[item.source] && SOURCES[item.source].kind === 'job' ? item.source : 'vieclam24h',
      title: String(item.title).slice(0, 200),
      url: item.url,
      company: item.company ? String(item.company).slice(0, 120) : '',
      salary: item.salary || 'Thương lượng',
      location: item.location || '',
      level: item.level || '',
      summary: item.summary ? String(item.summary).slice(0, 240) : '',
      skills: Array.isArray(item.skills)
        ? item.skills.filter((skill) => skill && String(skill).length <= 24).slice(0, 3)
        : [],
      createdAt: item.createdAt || null,
      deadline: item.deadline || null,
      metrics: item.metrics && typeof item.metrics === 'object' ? item.metrics : {}
    }));
}

function normalizeSocialItems(raw) {
  const list = Array.isArray(raw) ? raw : (raw && raw.items) || [];
  const valid = [];
  list.forEach((item) => {
    if (!item || !item.title || !item.url) return;
    valid.push({
      id: item.id || `social:${item.source || 'tiktok'}:${item.url}`,
      source: SOURCES[item.source] ? item.source : 'tiktok',
      title: String(item.title).slice(0, 220),
      url: item.url,
      summary: item.summary ? String(item.summary).slice(0, 240) : '',
      author: item.author || '',
      tags: Array.isArray(item.tags) ? item.tags.slice(0, 6) : [],
      createdAt: item.createdAt || new Date().toISOString(),
      metrics: item.metrics && typeof item.metrics === 'object' ? item.metrics : {}
    });
  });
  return valid;
}

function checkDataFiles() {
  const hint = document.getElementById('socialHint');
  Promise.all([loadJobFile(), loadSocialFile()]).then(([jobs, social]) => {
    if (!hint) return;
    const jobCount = jobs ? jobs.length : 0;
    const socialCount = social ? social.length : 0;
    const missing = jobs === null && social === null;

    hint.textContent = missing
      ? 'không đọc được file — kiểm tra assets/data/'
      : `job-feed: ${jobCount} tin · social-feed: ${socialCount} bài`;
    hint.className = missing
      ? 'text-[11px] text-rose-500 mt-2 font-mono'
      : 'text-[11px] text-fg-muted mt-2 font-mono';

    if (jobCount) {
      state.jobs = mergeById(state.jobs, normalizeJobItems(jobs));
      state.items = state.items.filter((item) => item.kind !== 'job');
      state.jobs.forEach((item) => state.items.push({ ...item, ...scoreItem(item) }));
      setSourceStatus('jobs', true, `${jobCount} tin (file)`);
    }
    if (socialCount) {
      state.social = mergeById(state.social, normalizeSocialItems(social));
      state.items = state.items.filter((item) => !(SOURCES[item.source] && SOURCES[item.source].kind === 'social'));
      state.social.forEach((item) => state.items.push({ ...item, ...scoreItem(item) }));
      setSourceStatus('social', true, `${socialCount} bài (file)`);
    }
    if (jobCount || socialCount) render();
  });
}

/* ==========================================================================
   EVENTS
   ========================================================================== */
function bindEvents() {
  const search = document.getElementById('searchInput');
  if (search) {
    search.value = state.filters.query;
    let debounce;
    search.addEventListener('input', () => {
      clearTimeout(debounce);
      debounce = setTimeout(() => {
        state.filters.query = search.value;
        persistFilters();
        renderFeed();
      }, 180);
    });
  }

  const windowSelect = document.getElementById('windowSelect');
  if (windowSelect) {
    windowSelect.value = String(state.filters.windowHours);
    windowSelect.addEventListener('change', () => {
      state.filters.windowHours = Number(windowSelect.value);
      persistFilters();
      renderFeed();
    });
  }

  const locationSelect = document.getElementById('locationSelect');
  if (locationSelect) {
    locationSelect.value = state.filters.location || 'all';
    locationSelect.addEventListener('change', () => {
      state.filters.location = locationSelect.value;
      persistFilters();
      renderFeed();
    });
  }

  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    sortSelect.value = state.filters.sort;
    sortSelect.addEventListener('change', () => {
      state.filters.sort = sortSelect.value;
      persistFilters();
      renderFeed();
    });
  }

  document.addEventListener('click', (event) => {
    const topicBtn = event.target.closest('[data-topic]');
    if (topicBtn) {
      const key = topicBtn.getAttribute('data-topic');
      const list = state.filters.topics;
      state.filters.topics = list.includes(key) ? list.filter((entry) => entry !== key) : [...list, key];
      if (!state.filters.topics.length) state.filters.topics = Object.keys(TOPICS);
      persistFilters();
      syncChipState();
      renderFeed();
      return;
    }

    const sourceBtn = event.target.closest('[data-source]');
    if (sourceBtn) {
      const key = sourceBtn.getAttribute('data-source');
      const list = state.filters.sources;
      state.filters.sources = list.includes(key) ? list.filter((entry) => entry !== key) : [...list, key];
      if (!state.filters.sources.length) state.filters.sources = Object.keys(SOURCES);
      persistFilters();
      syncChipState();
      renderFeed();
      return;
    }

    const saveBtn = event.target.closest('[data-save]');
    if (saveBtn) {
      toggleSave(saveBtn.getAttribute('data-save'));
      return;
    }

    const unsaveBtn = event.target.closest('[data-unsave]');
    if (unsaveBtn) {
      toggleSave(unsaveBtn.getAttribute('data-unsave'));
    }
  });

  const refreshBtn = document.getElementById('refreshBtn');
  if (refreshBtn) refreshBtn.addEventListener('click', () => refreshData());

  const socialStatusBtn = document.getElementById('socialStatusBtn');
  if (socialStatusBtn) socialStatusBtn.addEventListener('click', checkDataFiles);

  const dialog = document.getElementById('importDialog');
  const importBtn = document.getElementById('importSocialBtn');
  const importConfirm = document.getElementById('importConfirm');
  const importText = document.getElementById('importText');
  const importError = document.getElementById('importError');

  if (importBtn && dialog) {
    importBtn.addEventListener('click', () => {
      if (importError) importError.textContent = '';
      dialog.showModal();
    });
  }

  if (importConfirm) {
    importConfirm.addEventListener('click', (event) => {
      event.preventDefault();
      let parsed;
      try {
        parsed = JSON.parse(importText.value);
      } catch (error) {
        if (importError) importError.textContent = 'JSON không hợp lệ.';
        return;
      }
      const list = Array.isArray(parsed) ? parsed : (parsed.items || parsed.jobs || parsed.posts || []);
      const isSocialItem = (item) => {
        if (!item) return false;
        if (SOURCES[item.source] && SOURCES[item.source].kind === 'social') return true;
        if (item.kind === 'job') return false;
        return !item.company && !item.salary;
      };
      const socialPart = normalizeSocialItems(list.filter(isSocialItem));
      const jobPart = normalizeJobItems(list.filter((item) => !isSocialItem(item)));
      if (!socialPart.length && !jobPart.length) {
        if (importError) importError.textContent = 'Không có item hợp lệ (cần title + url).';
        return;
      }
      if (jobPart.length) state.jobs = mergeById(state.jobs, jobPart);
      if (socialPart.length) state.social = mergeById(state.social, socialPart);
      try {
        if (jobPart.length) localStorage.setItem(STORAGE.jobs, JSON.stringify(state.jobs));
        if (socialPart.length) localStorage.setItem(STORAGE.social, JSON.stringify(state.social));
      } catch (error) {
        /* bỏ qua */
      }
      state.items = state.items.filter((item) => (item.kind === 'job' ? !jobPart.length : !(SOURCES[item.source] && SOURCES[item.source].kind === 'social') || !socialPart.length));
      [...jobPart, ...socialPart].forEach((item) => state.items.push({ ...item, ...scoreItem(item) }));
      if (jobPart.length) setSourceStatus('jobs', true, `${state.jobs.length} tin (dán tay)`);
      if (socialPart.length) setSourceStatus('social', true, `${state.social.length} bài (dán tay)`);
      dialog.close();
      render();
      showToast(`Đã nạp ${jobPart.length} tin việc làm, ${socialPart.length} bài mạng xã hội.`);
    });
  }

  const exportMd = document.getElementById('exportMdBtn');
  if (exportMd) exportMd.addEventListener('click', exportMarkdown);

  const exportJs = document.getElementById('exportJsonBtn');
  if (exportJs) exportJs.addEventListener('click', exportJson);

  const clearSaved = document.getElementById('clearSavedBtn');
  if (clearSaved) clearSaved.addEventListener('click', () => {
    state.saved = [];
    persistSaved();
    renderFeed();
    renderSaved();
    showToast('Đã xoá danh sách lưu.');
  });

  initThemeToggle();
}

/* ---------- Theme (dùng chung key 'theme' với portfolio) ---------- */
const ICON_MOON = '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>';
const ICON_SUN = '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>';

function isDark() {
  return document.documentElement.classList.contains('dark');
}

function applyThemeIcon() {
  const icon = document.getElementById('themeIcon');
  const btn = document.getElementById('themeToggleBtn');
  if (icon) icon.innerHTML = isDark() ? ICON_MOON : ICON_SUN;
  if (btn) btn.setAttribute('aria-pressed', String(isDark()));
}

function initThemeToggle() {
  applyThemeIcon();
  const btn = document.getElementById('themeToggleBtn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const nextDark = !isDark();
    document.documentElement.classList.toggle('dark', nextDark);
    try {
      localStorage.setItem('theme', nextDark ? 'dark' : 'light');
    } catch (error) {
      /* bỏ qua */
    }
    applyThemeIcon();
  });
}

/* ==========================================================================
   BOOT
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  loadStorage();
  bindEvents();
  render();
  refreshData();
  setInterval(() => refreshData(), AUTO_REFRESH_MS);
});
