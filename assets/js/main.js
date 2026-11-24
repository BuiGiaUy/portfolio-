// Main Application Logic for Bùi Gia Uy Portfolio
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  renderProfileStats();
  renderProjects('all');
  renderSkills();
  renderEducation();
  initProjectFilter();
  initModalEvents();
  initAIAssistant();
  initContactForm();
  initMobileMenu();
  initScrollSpy();
  if (window.lucide) {
    lucide.createIcons();
  }
});

/* ==========================================================================
   THEME TOGGLE (Dark / Light Mode)
   ========================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');
  
  // Check local storage or system preference
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'light') {
    document.documentElement.classList.remove('dark');
    updateThemeIcon(false);
  } else {
    document.documentElement.classList.add('dark');
    updateThemeIcon(true);
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isDark = document.documentElement.classList.toggle('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      updateThemeIcon(isDark);
    });
  }
}

function updateThemeIcon(isDark) {
  const themeIcon = document.getElementById('themeIcon');
  if (!themeIcon) return;
  if (isDark) {
    themeIcon.innerHTML = `<svg class="w-5 h-5 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>`;
  } else {
    themeIcon.innerHTML = `<svg class="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>`;
  }
}

/* ==========================================================================
   RENDER PROFILE STATS
   ========================================================================== */
function renderProfileStats() {
  const statsContainer = document.getElementById('heroStats');
  if (!statsContainer || !window.PORTFOLIO_DATA) return;
  
  const stats = window.PORTFOLIO_DATA.profile.stats;
  statsContainer.innerHTML = stats.map(s => `
    <div class="glass-panel p-4 rounded-xl text-center glow-card border border-slate-700/40">
      <div class="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400 font-mono">
        ${s.value}
      </div>
      <div class="text-xs sm:text-sm font-semibold text-slate-200 mt-1">${s.label}</div>
      <div class="text-[11px] text-slate-400 mt-0.5 truncate">${s.sub}</div>
    </div>
  `).join('');
}

/* ==========================================================================
   PROJECT RENDERING & FILTERING
   ========================================================================== */
function initProjectFilter() {
  const filterBtns = document.querySelectorAll('.project-filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterBtns.forEach(b => {
        b.classList.remove('bg-sky-500', 'text-white', 'shadow-lg', 'shadow-sky-500/25');
        b.classList.add('bg-slate-800/60', 'text-slate-400', 'hover:text-slate-200');
      });
      btn.classList.add('bg-sky-500', 'text-white', 'shadow-lg', 'shadow-sky-500/25');
      btn.classList.remove('bg-slate-800/60', 'text-slate-400');
      
      const filter = btn.getAttribute('data-filter');
      renderProjects(filter);
    });
  });
}

function renderProjects(filter = 'all') {
  const container = document.getElementById('projectsGrid');
  if (!container || !window.PORTFOLIO_DATA) return;

  const projects = window.PORTFOLIO_DATA.projects.filter(p => {
    if (filter === 'all') return true;
    return p.category === filter;
  });

  container.innerHTML = projects.map(p => `
    <article class="glass-panel rounded-2xl overflow-hidden glow-card border border-slate-700/50 flex flex-col group transition-all duration-300">
      <div class="p-6 sm:p-7 flex-1 flex flex-col justify-between">
        <div>
          <!-- Top Badges -->
          <div class="flex items-center justify-between gap-2 mb-3">
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-500/15 text-sky-400 border border-sky-500/30">
              ${p.categoryLabel}
            </span>
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse"></span>
              ${p.badge}
            </span>
          </div>

          <!-- Title -->
          <h3 class="text-xl font-bold text-white group-hover:text-sky-400 transition-colors duration-200">
            ${p.title}
          </h3>
          <p class="text-xs text-sky-400/80 font-medium mt-1 mb-3">
            ${p.organization} • ${p.role}
          </p>

          <!-- Overview -->
          <p class="text-sm text-slate-300 line-clamp-3 mb-4 leading-relaxed">
            ${p.overview}
          </p>

          <!-- Metrics Row -->
          <div class="grid grid-cols-2 gap-2 mb-5 p-3 rounded-lg bg-slate-900/60 border border-slate-800/80">
            ${p.metrics.slice(0, 2).map(m => `
              <div>
                <div class="text-[11px] text-slate-400 truncate">${m.label}</div>
                <div class="text-sm font-bold text-sky-300 font-mono">${m.val}</div>
              </div>
            `).join('')}
          </div>

          <!-- Tech Stack Tags -->
          <div class="flex flex-wrap gap-1.5 mb-6">
            ${p.tech.slice(0, 5).map(t => `
              <span class="text-xs px-2.5 py-1 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700/50">
                ${t}
              </span>
            `).join('')}
            ${p.tech.length > 5 ? `<span class="text-xs px-2 py-1 rounded-md bg-slate-800/40 text-slate-400">+${p.tech.length - 5}</span>` : ''}
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="pt-4 border-t border-slate-800/80 flex items-center justify-between">
          <button onclick="openProjectModal('${p.id}')" class="inline-flex items-center text-sm font-semibold text-sky-400 hover:text-sky-300 transition-colors">
            Xem kiến trúc & chi tiết
            <svg class="w-4 h-4 ml-1.5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </button>
          <a href="${p.github}" target="_blank" rel="noopener noreferrer" class="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors" title="GitHub Repository">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path></svg>
          </a>
        </div>
      </div>
    </article>
  `).join('');
}

/* ==========================================================================
   PROJECT MODAL & ARCHITECTURE DIAGRAMS
   ========================================================================== */
function initModalEvents() {
  const modal = document.getElementById('projectModal');
  const closeBtn = document.getElementById('closeModalBtn');
  const backdrop = document.getElementById('modalBackdrop');

  if (closeBtn) closeBtn.addEventListener('click', closeProjectModal);
  if (backdrop) backdrop.addEventListener('click', closeProjectModal);
  
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeProjectModal();
    }
  });
}

function openProjectModal(projectId) {
  const modal = document.getElementById('projectModal');
  const modalBody = document.getElementById('modalContent');
  if (!modal || !modalBody || !window.PORTFOLIO_DATA) return;

  const project = window.PORTFOLIO_DATA.projects.find(p => p.id === projectId);
  if (!project) return;

  // Build Architecture Diagram HTML
  const diagramHtml = getArchitectureDiagramHtml(project.architectureDiagram, project);

  modalBody.innerHTML = `
    <!-- Header -->
    <div class="border-b border-slate-700/60 pb-5 mb-6">
      <div class="flex flex-wrap items-center gap-2 mb-2">
        <span class="px-2.5 py-1 rounded-full text-xs font-semibold bg-sky-500/20 text-sky-400 border border-sky-500/30">
          ${project.categoryLabel}
        </span>
        <span class="px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
          ${project.organization}
        </span>
        <span class="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
          ${project.status}
        </span>
      </div>
      <h2 class="text-2xl sm:text-3xl font-extrabold text-white mt-1">${project.title}</h2>
      <p class="text-sm text-slate-300 mt-1">${project.subtitle}</p>
    </div>

    <!-- Metrics Row -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
      ${project.metrics.map(m => `
        <div class="bg-slate-900/80 border border-slate-800 rounded-xl p-3 text-center">
          <div class="text-xs text-slate-400 mb-0.5 truncate">${m.label}</div>
          <div class="text-lg font-bold text-sky-400 font-mono">${m.val}</div>
        </div>
      `).join('')}
    </div>

    <!-- Architecture Visual Flow -->
    <div class="mb-7">
      <h4 class="text-xs font-bold uppercase tracking-wider text-sky-400 mb-3 flex items-center gap-2">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path></svg>
        Sơ đồ Kiến trúc & Luồng xử lý Kỹ thuật (Technical Architecture Pipeline)
      </h4>
      <div class="bg-slate-950/90 border border-slate-800 rounded-xl p-4 sm:p-5 overflow-x-auto">
        ${diagramHtml}
      </div>
    </div>

    <!-- Technical Innovations & Highlights -->
    <div class="mb-6">
      <h4 class="text-xs font-bold uppercase tracking-wider text-purple-400 mb-3 flex items-center gap-2">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
        Điểm sáng Kỹ thuật & Đổi mới Giải pháp
      </h4>
      <ul class="space-y-2.5">
        ${project.highlights.map(h => `
          <li class="flex items-start text-sm text-slate-200 leading-relaxed">
            <span class="inline-block w-1.5 h-1.5 rounded-full bg-sky-400 mt-2 mr-3 flex-shrink-0"></span>
            <span>${h}</span>
          </li>
        `).join('')}
      </ul>
    </div>

    <!-- Full Tech Stack -->
    <div class="mb-7">
      <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">Công nghệ & Công cụ (Tech Stack)</h4>
      <div class="flex flex-wrap gap-2">
        ${project.tech.map(t => `
          <span class="px-3 py-1 rounded-lg text-xs font-medium bg-slate-800 text-sky-300 border border-slate-700">
            ${t}
          </span>
        `).join('')}
      </div>
    </div>

    <!-- Modal Footer Actions -->
    <div class="pt-5 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
      <div class="text-xs text-slate-400">
        Vai trò: <span class="font-medium text-slate-200">${project.role}</span>
      </div>
      <div class="flex items-center gap-3">
        <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold inline-flex items-center gap-2 transition-colors">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path></svg>
          Mã nguồn GitHub
        </a>
        <a href="#contact" onclick="closeProjectModal()" class="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors shadow-lg shadow-sky-500/20">
          Trao đổi về dự án này
        </a>
      </div>
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
  const modal = document.getElementById('projectModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Visual flow diagrams for each project
function getArchitectureDiagramHtml(diagramType, project) {
  if (diagramType === 'hr_genie_rag_flow') {
    return `
      <div class="flex flex-col gap-3 min-w-[620px] text-xs font-mono">
        <!-- Stage 1 -->
        <div class="grid grid-cols-4 gap-2">
          <div class="p-3 bg-slate-900 border border-slate-700 rounded-lg text-center">
            <span class="text-sky-400 font-bold block mb-1">1. User Query</span>
            <span class="text-slate-400 text-[11px]">Next.js Client / SSO</span>
          </div>
          <div class="p-3 bg-sky-950/60 border border-sky-500/50 rounded-lg text-center col-span-2">
            <span class="text-sky-300 font-bold block mb-1">2. Smart Intent Router (98.46%)</span>
            <span class="text-slate-300 text-[11px]">LangGraph Classifier: Policy vs General vs Out-of-Scope</span>
          </div>
          <div class="p-3 bg-slate-900 border border-slate-700 rounded-lg text-center">
            <span class="text-amber-400 font-bold block mb-1">3. RBAC Pre-Filter</span>
            <span class="text-slate-400 text-[11px]">Employee Role & Org Unit</span>
          </div>
        </div>

        <div class="flex justify-center text-sky-400 my-0.5">
          <svg class="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
        </div>

        <!-- Stage 2 -->
        <div class="grid grid-cols-3 gap-2">
          <div class="p-3 bg-slate-900 border border-indigo-500/40 rounded-lg text-center">
            <span class="text-indigo-400 font-bold block mb-1">4. pgvector Hybrid Search</span>
            <span class="text-slate-400 text-[11px]">HNSW Index + Full-Text Pre-query Authorized Retrieval</span>
          </div>
          <div class="p-3 bg-purple-950/60 border border-purple-500/50 rounded-lg text-center">
            <span class="text-purple-300 font-bold block mb-1">5. Evidence Gate</span>
            <span class="text-slate-300 text-[11px]">Context Relevance & Document Sufficiency Evaluation</span>
          </div>
          <div class="p-3 bg-emerald-950/60 border border-emerald-500/50 rounded-lg text-center">
            <span class="text-emerald-300 font-bold block mb-1">6. Deterministic Verifier</span>
            <span class="text-slate-300 text-[11px]">Zero-Hallucination Claim Validation & Citations</span>
          </div>
        </div>

        <div class="flex justify-center text-emerald-400 my-0.5">
          <svg class="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
        </div>

        <!-- Stage 3 Output -->
        <div class="p-3 bg-emerald-900/40 border border-emerald-500/60 rounded-lg flex items-center justify-between text-slate-200">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            <span class="font-bold text-emerald-300">Verified Output:</span>
            <span>Chính sách nhân sự chính xác 100% kèm số điều khoản & trích dẫn văn bản gốc</span>
          </div>
          <span class="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-mono">1.400+ Automated Tests Passed</span>
        </div>
      </div>
    `;
  }

  if (diagramType === 'vieneu_tts_flow') {
    return `
      <div class="flex flex-col gap-3 min-w-[600px] text-xs font-mono">
        <div class="grid grid-cols-3 gap-2">
          <div class="p-3 bg-slate-900 border border-slate-700 rounded-lg text-center">
            <span class="text-sky-400 font-bold block mb-1">1. Vietnamese Text Input</span>
            <span class="text-slate-400 text-[11px]">Phonemization & Tone Markers (Bắc - Trung - Nam)</span>
          </div>
          <div class="p-3 bg-purple-950/60 border border-purple-500/50 rounded-lg text-center">
            <span class="text-purple-300 font-bold block mb-1">2. 3-Sec Reference Audio</span>
            <span class="text-slate-300 text-[11px]">Zero-Shot Speaker Embedding Extraction</span>
          </div>
          <div class="p-3 bg-indigo-950/60 border border-indigo-500/50 rounded-lg text-center">
            <span class="text-indigo-300 font-bold block mb-1">3. LoRA Neural Acoustic Model</span>
            <span class="text-slate-300 text-[11px]">PyTorch Fine-tuned Weights for Vietnamese Prosody</span>
          </div>
        </div>

        <div class="flex justify-center text-sky-400 my-0.5">
          <svg class="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
        </div>

        <div class="grid grid-cols-2 gap-2">
          <div class="p-3 bg-slate-900 border border-sky-500/40 rounded-lg text-center">
            <span class="text-sky-300 font-bold block mb-1">4. High-Fidelity Neural Vocoder</span>
            <span class="text-slate-400 text-[11px]">Mel-Spectrogram to 24kHz Raw Waveform</span>
          </div>
          <div class="p-3 bg-emerald-950/60 border border-emerald-500/50 rounded-lg text-center">
            <span class="text-emerald-300 font-bold block mb-1">5. Low Latency Streaming (&lt;160ms)</span>
            <span class="text-slate-300 text-[11px]">Chunked WebSockets / Gradio Interactive Demo</span>
          </div>
        </div>
      </div>
    `;
  }

  if (diagramType === 'wine_ecommerce_flow') {
    return `
      <div class="flex flex-col gap-3 min-w-[600px] text-xs font-mono">
        <div class="grid grid-cols-3 gap-2">
          <div class="p-3 bg-slate-900 border border-slate-700 rounded-lg text-center">
            <span class="text-sky-400 font-bold block mb-1">1. Frontend Client</span>
            <span class="text-slate-400 text-[11px]">Vite, Bootstrap & Interactive Cart</span>
          </div>
          <div class="p-3 bg-rose-950/60 border border-rose-500/50 rounded-lg text-center">
            <span class="text-rose-300 font-bold block mb-1">2. Laravel 10 Core</span>
            <span class="text-slate-300 text-[11px]">Repository Pattern & Service Layer</span>
          </div>
          <div class="p-3 bg-red-950/60 border border-red-500/50 rounded-lg text-center">
            <span class="text-red-300 font-bold block mb-1">3. Redis Caching</span>
            <span class="text-slate-300 text-[11px]">Product Catalog & Cart Session Store</span>
          </div>
        </div>

        <div class="flex justify-center text-rose-400 my-0.5">
          <svg class="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
        </div>

        <div class="grid grid-cols-2 gap-2">
          <div class="p-3 bg-slate-900 border border-emerald-500/50 rounded-lg text-center">
            <span class="text-emerald-400 font-bold block mb-1">4. VNPay IPN Webhook Verification</span>
            <span class="text-slate-400 text-[11px]">HMAC-SHA512 Checksum, Secure Transaction Logs</span>
          </div>
          <div class="p-3 bg-slate-900 border border-sky-500/50 rounded-lg text-center">
            <span class="text-sky-400 font-bold block mb-1">5. Real-Time Pusher WebSockets</span>
            <span class="text-slate-400 text-[11px]">Live Order Status & Inventory Depletion Sync</span>
          </div>
        </div>
      </div>
    `;
  }

  // Default multi-agent flow
  return `
    <div class="flex flex-col gap-3 min-w-[600px] text-xs font-mono">
      <div class="grid grid-cols-4 gap-2">
        <div class="p-2.5 bg-slate-900 border border-sky-500/40 rounded-lg text-center">
          <span class="text-sky-400 font-bold block">Planner Agent</span>
          <span class="text-slate-400 text-[10px]">Task Decomposition</span>
        </div>
        <div class="p-2.5 bg-slate-900 border border-indigo-500/40 rounded-lg text-center">
          <span class="text-indigo-400 font-bold block">Researcher Agent</span>
          <span class="text-slate-400 text-[10px]">Knowledge Sourcing</span>
        </div>
        <div class="p-2.5 bg-slate-900 border border-purple-500/40 rounded-lg text-center">
          <span class="text-purple-400 font-bold block">Critic Agent</span>
          <span class="text-slate-400 text-[10px]">Sanity & Fact Checks</span>
        </div>
        <div class="p-2.5 bg-slate-900 border border-emerald-500/40 rounded-lg text-center">
          <span class="text-emerald-400 font-bold block">Executor Agent</span>
          <span class="text-slate-400 text-[10px]">Final Synthesis</span>
        </div>
      </div>
      <div class="p-3 bg-slate-900/90 border border-slate-700 rounded-lg flex items-center justify-between">
        <div class="text-slate-300">
          <span class="text-amber-400 font-bold">Observability & Benchmarking:</span>
          LangSmith / Langfuse Tracing + Ragas & TruLens Auto-Evaluation Pipeline
        </div>
        <span class="text-sky-400 text-[11px] font-mono">Golden Dataset Certified</span>
      </div>
    </div>
  `;
}

/* ==========================================================================
   RENDER SKILLS & PROFICIENCIES
   ========================================================================== */
function renderSkills() {
  const container = document.getElementById('skillsContainer');
  if (!container || !window.PORTFOLIO_DATA) return;

  const skillGroups = [
    { title: "AI / GenAI & Multi-Agent", icon: "cpu", key: "ai_genai", color: "from-sky-500 to-indigo-500" },
    { title: "Backend Architecture & APIs", icon: "server", key: "backend", color: "from-purple-500 to-pink-500" },
    { title: "Frontend & Mobile Engineering", icon: "layout", key: "frontend", color: "from-emerald-500 to-teal-500" },
    { title: "DevOps & Cloud / LLMOps", icon: "box", key: "devops", color: "from-amber-500 to-orange-500" }
  ];

  container.innerHTML = skillGroups.map(g => {
    const list = window.PORTFOLIO_DATA.skills[g.key] || [];
    return `
      <div class="glass-panel p-6 sm:p-7 rounded-2xl glow-card border border-slate-700/50">
        <div class="flex items-center gap-3 mb-5">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br ${g.color} flex items-center justify-center text-white shadow-md">
            <span class="font-mono text-sm font-bold">&lt;/&gt;</span>
          </div>
          <div>
            <h3 class="text-lg font-bold text-white">${g.title}</h3>
            <span class="text-xs text-slate-400">${list.length} công nghệ chủ lực</span>
          </div>
        </div>

        <div class="space-y-4">
          ${list.map(s => `
            <div>
              <div class="flex items-center justify-between text-xs mb-1.5">
                <span class="font-semibold text-slate-200">${s.name}</span>
                <span class="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-sky-400 border border-slate-700">
                  ${s.tag}
                </span>
              </div>
              <div class="w-full bg-slate-800/80 rounded-full h-1.5 overflow-hidden">
                <div class="bg-gradient-to-r from-sky-400 to-indigo-500 h-1.5 rounded-full transition-all duration-1000" style="width: ${s.level}%"></div>
              </div>
              <p class="text-[11px] text-slate-400 mt-1 leading-snug">${s.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }).join('');
}

/* ==========================================================================
   RENDER EDUCATION & CERTIFICATIONS
   ========================================================================== */
function renderEducation() {
  const container = document.getElementById('educationContainer');
  if (!container || !window.PORTFOLIO_DATA) return;

  const list = window.PORTFOLIO_DATA.educationAndCerts || [];
  container.innerHTML = list.map(item => `
    <div class="glass-panel p-6 rounded-2xl glow-card border border-slate-700/50 flex flex-col justify-between">
      <div>
        <div class="flex items-center justify-between gap-2 mb-3">
          <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-500/15 text-sky-400 border border-sky-500/30">
            ${item.type === 'education' ? 'Đào tạo Chuyên sâu' : 'Chứng chỉ Năng lực'}
          </span>
          <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-500/15 text-purple-300 border border-purple-500/30">
            ${item.badge}
          </span>
        </div>
        <h3 class="text-lg font-bold text-white mb-1">${item.title}</h3>
        <p class="text-xs font-semibold text-sky-400 mb-2">${item.issuer} • ${item.period}</p>
        <p class="text-sm text-slate-300 leading-relaxed mb-4">${item.details}</p>
      </div>

      <div class="pt-4 border-t border-slate-800/80">
        <h4 class="text-xs font-semibold text-slate-400 mb-2">Điểm nhấn chương trình:</h4>
        <ul class="space-y-1.5">
          ${item.highlights.map(h => `
            <li class="flex items-start text-xs text-slate-300">
              <span class="text-sky-400 mr-2">✓</span>
              <span>${h}</span>
            </li>
          `).join('')}
        </ul>
      </div>
    </div>
  `).join('');
}

/* ==========================================================================
   AI ASSISTANT INTERACTIVE SIMULATOR (Ask Gia Uy's AI Assistant)
   ========================================================================== */
function initAIAssistant() {
  const promptButtons = document.querySelectorAll('.ai-prompt-btn');
  const chatOutput = document.getElementById('aiChatOutput');
  const customInput = document.getElementById('aiCustomInput');
  const sendBtn = document.getElementById('aiSendBtn');

  if (!chatOutput || !window.PORTFOLIO_DATA) return;

  // Add click listeners to quick prompts
  promptButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const q = btn.getAttribute('data-question') || btn.innerText.trim();
      handleAIQuery(q);
    });
  });

  if (sendBtn && customInput) {
    sendBtn.addEventListener('click', () => {
      const val = customInput.value.trim();
      if (val) {
        handleAIQuery(val);
        customInput.value = '';
      }
    });

    customInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = customInput.value.trim();
        if (val) {
          handleAIQuery(val);
          customInput.value = '';
        }
      }
    });
  }
}

let isTyping = false;
function handleAIQuery(query) {
  if (isTyping) return;
  const chatOutput = document.getElementById('aiChatOutput');
  if (!chatOutput) return;

  const knowledge = window.PORTFOLIO_DATA.aiAssistantKnowledge;
  const lowerQ = query.toLowerCase();

  // Find best match in dataset
  let matched = knowledge.find(k => {
    return k.keywords.some(kw => lowerQ.includes(kw));
  });

  let responseText = "";
  if (matched) {
    responseText = matched.answer;
  } else {
    responseText = `Cảm ơn bạn đã quan tâm! Bùi Gia Uy là AI Application Engineer & Full-Stack Developer chuyên về Multi-Agent Systems, Multi-stage RAG, FastAPI, NestJS và Laravel. Để nhận thông tin chi tiết hoặc trao đổi sâu hơn về yêu cầu của bạn, vui lòng liên hệ trực tiếp Uy qua email giauy0987@gmail.com hoặc số điện thoại 0947879049.`;
  }

  // Append user bubble and AI bubble
  const queryHtml = `
    <div class="flex items-start justify-end gap-2.5 mb-3">
      <div class="bg-sky-600/80 text-white rounded-2xl rounded-tr-sm px-4 py-2.5 text-xs sm:text-sm max-w-[85%] shadow-md">
        ${escapeHtml(query)}
      </div>
      <div class="w-7 h-7 rounded-full bg-sky-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
        You
      </div>
    </div>
  `;

  const responseId = 'ai-res-' + Date.now();
  const aiHtml = `
    <div class="flex items-start gap-2.5 mb-4">
      <div class="w-7 h-7 rounded-full bg-gradient-to-tr from-purple-500 to-sky-400 flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0">
        AI
      </div>
      <div class="bg-slate-900/90 border border-slate-700/70 text-slate-200 rounded-2xl rounded-tl-sm px-4 py-3 text-xs sm:text-sm max-w-[90%] leading-relaxed shadow-md">
        <div id="${responseId}" class="whitespace-pre-line"></div>
      </div>
    </div>
  `;

  chatOutput.insertAdjacentHTML('beforeend', queryHtml + aiHtml);
  chatOutput.scrollTop = chatOutput.scrollHeight;

  // Typewriter effect
  isTyping = true;
  typeWriterEffect(responseId, responseText, () => {
    isTyping = false;
  });
}

function typeWriterEffect(elementId, text, onComplete) {
  const el = document.getElementById(elementId);
  if (!el) {
    if (onComplete) onComplete();
    return;
  }

  let i = 0;
  const speed = 12; // ms per character
  function type() {
    if (i < text.length) {
      el.textContent += text.charAt(i);
      i++;
      const chatOutput = document.getElementById('aiChatOutput');
      if (chatOutput) chatOutput.scrollTop = chatOutput.scrollHeight;
      setTimeout(type, speed);
    } else {
      if (onComplete) onComplete();
    }
  }
  type();
}

function escapeHtml(string) {
  const div = document.createElement('div');
  div.innerText = string;
  return div.innerHTML;
}

/* ==========================================================================
   CONTACT FORM & CLIPBOARD TOAST
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contactName')?.value.trim() || 'Người liên hệ';
      const email = document.getElementById('contactEmail')?.value.trim() || '';
      const subject = document.getElementById('contactSubject')?.value.trim() || 'Trao đổi cơ hội hợp tác';
      const message = document.getElementById('contactMessage')?.value.trim() || '';

      const mailtoUrl = `mailto:giauy0987@gmail.com?subject=${encodeURIComponent(subject + ' - Từ ' + name)}&body=${encodeURIComponent('Họ tên: ' + name + '\nEmail: ' + email + '\n\nNội dung liên hệ:\n' + message)}`;
      
      window.location.href = mailtoUrl;
      showToast('Đã mở ứng dụng gửi email! Rất mong được kết nối cùng bạn.');
      form.reset();
    });
  }
}

function copyToClipboard(text, label = 'thông tin') {
  navigator.clipboard.writeText(text).then(() => {
    showToast(`Đã sao chép ${label}: ${text}`);
  }).catch(() => {
    // Fallback
    const input = document.createElement('input');
    input.value = text;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    showToast(`Đã sao chép ${label}: ${text}`);
  });
}

function showToast(message) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <div class="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-slate-900 border border-sky-500/50 text-white text-xs sm:text-sm shadow-2xl backdrop-blur-md">
      <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
      <span>${message}</span>
    </div>
  `;

  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

/* ==========================================================================
   MOBILE MENU & SCROLLSPY
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const menu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (toggleBtn && menu) {
    toggleBtn.addEventListener('click', () => {
      menu.classList.toggle('hidden');
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.add('hidden');
      });
    });
  }
}

function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.desktop-nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('text-sky-400', 'font-semibold');
      link.classList.add('text-slate-300');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('text-sky-400', 'font-semibold');
        link.classList.remove('text-slate-300');
      }
    });
  });
}

// Global functions exposed to window for inline onclick handlers
window.openProjectModal = openProjectModal;
window.closeProjectModal = closeProjectModal;
window.copyToClipboard = copyToClipboard;
window.showToast = showToast;
