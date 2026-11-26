// Portfolio interactions — vanilla JS, no dependencies.
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initLanguageSwitch();
  renderStats();
  renderProjects(activeFilter);
  renderTimeline();
  renderSkills();
  renderPrinciples();
  renderChatPrompts();
  initFilters();
  initModal();
  initMobileMenu();
  initScrollSpy();
  initReveal();
  initTrace();
  initChat();
  initContactForm();
  initCopyButtons();
  initYear();
});

/* ==========================================================================
   Language + content
   ========================================================================== */

const DATA_ROOT = window.PORTFOLIO_DATA || {
  defaultLocale: 'vi',
  locales: { vi: {} }
};
const LANG_STORAGE_KEY = 'lang';
const SUPPORTED_LANGS = ['vi', 'en'];

function readInitialLang() {
  try {
    const queryLang = new URLSearchParams(window.location.search).get('lang');
    if (SUPPORTED_LANGS.includes(queryLang)) return queryLang;
    const storedLang = localStorage.getItem(LANG_STORAGE_KEY);
    if (SUPPORTED_LANGS.includes(storedLang)) return storedLang;
  } catch (error) {
    /* storage or URL parsing unavailable: use the default */
  }
  return DATA_ROOT.defaultLocale === 'en' ? 'en' : 'vi';
}

let currentLang = readInitialLang();
let DATA = getLocale(currentLang);
let activeFilter = 'all';
let chatEntries = [];
let contactFeedback = null;
let contactSending = false;

function persistLang(lang) {
  try {
    localStorage.setItem(LANG_STORAGE_KEY, lang);
  } catch (error) {
    /* private mode: keep the language for this session */
  }
}

function syncLangUrl(lang) {
  try {
    const url = new URL(window.location.href);
    url.searchParams.set('lang', lang);
    window.history.replaceState(null, '', url);
  } catch (error) {
    /* history API unavailable: the language still applies for this session */
  }
}

persistLang(currentLang);

function getLocale(lang) {
  const locales = DATA_ROOT.locales || {};
  return locales[lang] || locales[DATA_ROOT.defaultLocale] || locales.vi || {};
}

function getPath(object, path) {
  return String(path)
    .split('.')
    .reduce((value, key) => (value == null ? undefined : value[key]), object);
}

function t(path) {
  const value = getPath(DATA.ui, path);
  if (value !== undefined && value !== null && value !== '') return value;
  const fallbackLocale = getLocale(DATA_ROOT.defaultLocale === 'en' ? 'en' : 'vi');
  const fallback = getPath(fallbackLocale.ui, path);
  return fallback === undefined || fallback === null ? '' : fallback;
}

function format(template, values) {
  return String(template).replace(/\{(\w+)\}/g, (match, key) =>
    Object.prototype.hasOwnProperty.call(values, key) ? String(values[key]) : match
  );
}

function setMeta(attribute, name, value) {
  const element = document.querySelector(`meta[${attribute}="${name}"]`);
  if (element) element.setAttribute('content', value);
}

function updateMeta() {
  document.title = t('meta.title');
  document.documentElement.lang = currentLang;
  setMeta('name', 'description', t('meta.description'));
  setMeta('property', 'og:title', t('meta.ogTitle'));
  setMeta('property', 'og:description', t('meta.ogDescription'));
  setMeta('property', 'og:locale', t('meta.ogLocale'));
  setMeta('property', 'og:locale:alternate', currentLang === 'en' ? 'vi_VN' : 'en_US');
  setMeta('name', 'twitter:title', t('meta.ogTitle'));
  setMeta('name', 'twitter:description', t('meta.ogDescription'));
}

function applyStaticI18n() {
  const year = String(new Date().getFullYear());

  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const value = t(element.getAttribute('data-i18n'));
    if (typeof value === 'string') element.textContent = value;
  });

  document.querySelectorAll('[data-i18n-html]').forEach((element) => {
    const value = t(element.getAttribute('data-i18n-html'));
    if (typeof value !== 'string') return;
    element.innerHTML = value.replace(/\{year\}/g, year);
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach((element) => {
    element.setAttribute('placeholder', t(element.getAttribute('data-i18n-placeholder')));
  });

  document.querySelectorAll('[data-i18n-aria-label]').forEach((element) => {
    element.setAttribute('aria-label', t(element.getAttribute('data-i18n-aria-label')));
  });

  document.querySelectorAll('[data-i18n-title]').forEach((element) => {
    element.setAttribute('title', t(element.getAttribute('data-i18n-title')));
  });

  document.querySelectorAll('[data-i18n-alt]').forEach((element) => {
    element.setAttribute('alt', t(element.getAttribute('data-i18n-alt')));
  });
}

function updateLangButtons() {
  document.querySelectorAll('[data-lang]').forEach((button) => {
    const active = button.getAttribute('data-lang') === currentLang;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  });
}

function updateThemeButton() {
  const root = document.documentElement;
  const button = document.getElementById('themeToggle');
  const icon = document.getElementById('themeIcon');
  const dark = root.classList.contains('dark');

  if (icon) icon.innerHTML = dark ? ICON_MOON : ICON_SUN;
  if (!button) return;

  button.setAttribute('aria-pressed', String(dark));
  button.setAttribute('aria-label', t('a11y.theme'));
  button.setAttribute('title', dark ? t('theme.toLight') : t('theme.toDark'));
}

function updateMenuLabel() {
  const toggle = document.getElementById('menuToggle');
  if (!toggle) return;
  const open = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-label', open ? t('a11y.closeMenu') : t('a11y.openMenu'));
}

function renderChatLog() {
  const log = document.getElementById('chatLog');
  if (!log) return;
  if (activeTypewriter) activeTypewriter.finish();
  activeTypewriter = null;

  const greeting = `
    <div class="msg msg-bot">
      <span class="msg-avatar" aria-hidden="true">AI</span>
      <div class="msg-bubble">${t('ask.greetingHtml')}</div>
    </div>`;

  const messages = chatEntries
    .map((entry) => {
      if (entry.role === 'user') {
        return `
          <div class="msg msg-user">
            <span class="msg-avatar" aria-hidden="true">${t('ask.userAvatar')}</span>
            <div class="msg-bubble">${escapeHtml(entry.text)}</div>
          </div>`;
      }
      const answer =
        entry.knowledgeIndex >= 0 && DATA.aiKnowledge
          ? DATA.aiKnowledge[entry.knowledgeIndex]?.answer || t('ask.fallback')
          : t('ask.fallback');
      return `
        <div class="msg msg-bot">
          <span class="msg-avatar" aria-hidden="true">AI</span>
          <div class="msg-bubble">${escapeHtml(answer)}</div>
        </div>`;
    })
    .join('');

  log.innerHTML = greeting + messages;
  scrollChat();
}

function renderContactFeedback() {
  const status = document.getElementById('contactStatus');
  if (!status) return;
  status.classList.remove('is-ok', 'is-error');
  if (!contactFeedback) {
    status.textContent = '';
    return;
  }
  status.textContent = t(contactFeedback.key);
  if (contactFeedback.tone) status.classList.add(contactFeedback.tone);
}

function setContactFeedback(key, tone) {
  contactFeedback = key ? { key, tone } : null;
  renderContactFeedback();
}

function renderAll() {
  renderStats();
  renderProjects(activeFilter);
  renderTimeline();
  renderSkills();
  renderPrinciples();
  renderChatPrompts();
  renderChatLog();
}

function setLanguage(lang, options) {
  const nextLang = SUPPORTED_LANGS.includes(lang) ? lang : 'vi';
  const shouldPersist = !options || options.persist !== false;
  const shouldSyncUrl = !options || options.syncUrl !== false;

  if (nextLang === currentLang && !(options && options.force)) {
    if (shouldPersist) persistLang(nextLang);
    if (shouldSyncUrl) syncLangUrl(nextLang);
    return;
  }

  currentLang = nextLang;
  DATA = getLocale(currentLang);

  const modal = document.getElementById('projectModal');
  const openProjectId = activeProjectId;
  const modalWasOpen = Boolean(modal && !modal.hidden && openProjectId);

  if (shouldPersist) persistLang(currentLang);
  if (shouldSyncUrl) syncLangUrl(currentLang);

  updateMeta();
  applyStaticI18n();
  updateLangButtons();
  updateThemeButton();
  updateMenuLabel();
  renderAll();
  renderContactFeedback();
  renderToast();

  const submit = document.getElementById('contactSubmit');
  if (submit) {
    if (contactSending) {
      submit.textContent = t('contact.sending');
    } else if (!submit.disabled) {
      submit.innerHTML = `<span>${t('contact.submit')}</span> <span aria-hidden="true">→</span>`;
    }
  }

  if (modalWasOpen && openProjectId) {
    const trigger = document.querySelector(`[data-project="${openProjectId}"]`);
    openProject(openProjectId, trigger || lastFocused);
  }
}

function initLanguageSwitch() {
  document.querySelectorAll('[data-lang]').forEach((button) => {
    button.addEventListener('click', () => setLanguage(button.getAttribute('data-lang')));
  });
  updateLangButtons();
}

window.addEventListener('popstate', () => {
  const queryLang = new URLSearchParams(window.location.search).get('lang');
  if (SUPPORTED_LANGS.includes(queryLang)) {
    setLanguage(queryLang, { persist: false, syncUrl: false, force: true });
    return;
  }
  let storedLang = null;
  try {
    storedLang = localStorage.getItem(LANG_STORAGE_KEY);
  } catch (error) {
    storedLang = null;
  }
  if (SUPPORTED_LANGS.includes(storedLang)) {
    setLanguage(storedLang, { persist: false, syncUrl: false, force: true });
  }
});

/* ==========================================================================
   Utilities
   ========================================================================== */

function escapeHtml(value) {
  const div = document.createElement('div');
  div.textContent = String(value ?? '');
  return div.innerHTML;
}

function reduceMotion() {
  return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

let revealObserver = null;

function observeReveals() {
  const elements = document.querySelectorAll('.reveal:not(.is-visible)');
  if (!elements.length) return;
  if (reduceMotion() || !('IntersectionObserver' in window)) {
    elements.forEach((element) => element.classList.add('is-visible'));
    return;
  }
  if (!revealObserver) {
    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
  }
  elements.forEach((element) => revealObserver.observe(element));
}

function initReveal() {
  observeReveals();
}

/* ==========================================================================
   Theme
   ========================================================================== */

const THEME_STORAGE_KEY = 'theme';
const ICON_MOON =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M21 12.8A8.6 8.6 0 1 1 11.2 3a6.7 6.7 0 0 0 9.8 9.8Z"/></svg>';
const ICON_SUN =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path stroke-linecap="round" d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';

function initTheme() {
  const root = document.documentElement;
  const button = document.getElementById('themeToggle');

  updateThemeButton();

  if (!button) return;
  button.addEventListener('click', () => {
    const dark = root.classList.toggle('dark');
    try {
      localStorage.setItem(THEME_STORAGE_KEY, dark ? 'dark' : 'light');
    } catch (error) {
      /* private mode: keep the theme for this session */
    }
    updateThemeButton();
  });
}

/* ==========================================================================
   Render: stats, projects, timeline, skills, principles
   ========================================================================== */

function renderStats() {
  const container = document.getElementById('metrics');
  const stats = DATA.profile && DATA.profile.stats;
  if (!container || !stats) return;
  container.innerHTML = stats
    .map(
      (item) => `
        <div class="metric">
          <span class="metric-value">${item.value}</span>
          <span class="metric-label">${item.label}</span>
          <span class="metric-sub">${item.sub}</span>
        </div>`
    )
    .join('');
}

function renderProjects(filter = 'all') {
  const container = document.getElementById('projectsGrid');
  if (!container || !DATA.projects) return;

  activeFilter = filter;

  const projects = DATA.projects.filter(
    (project) => filter === 'all' || project.category === filter
  );

  if (!projects.length) {
    container.innerHTML = `<p class="section-lede">${t('work.empty')}</p>`;
    return;
  }

  container.innerHTML = projects
    .map(
      (project, index) => `
        <article class="project-card ${project.size === 'wide' ? 'is-wide' : ''} reveal" style="--delay: ${index * 45}ms">
          <div class="project-top">
            <span class="project-index">${project.index}</span>
            <span class="project-badge">${project.badge}</span>
            <span class="project-status">${project.status}</span>
          </div>
          ${project.image ? `<figure class="project-preview"><img src="${project.image}" alt="${escapeHtml(project.imageAlt || project.title)}" loading="lazy" decoding="async"></figure>` : ''}
          <h3 class="project-title">${project.title}</h3>
          <p class="project-sub">${project.subtitle}</p>
          <p class="project-summary">${project.summary}</p>
          <div class="project-metrics">
            ${project.metrics
              .map(
                (metric) => `
                  <div class="project-metric">
                    <span>${metric.label}</span>
                    <strong>${metric.value}</strong>
                  </div>`
              )
              .join('')}
          </div>
          <div class="project-tech">
            ${project.tech
              .slice(0, 8)
              .map((tech) => `<span class="tech">${tech}</span>`)
              .join('')}
            ${project.tech.length > 8 ? `<span class="tech">+${project.tech.length - 8}</span>` : ''}
          </div>
          <div class="project-foot">
            <button type="button" class="project-link" data-project="${project.id}">
              ${t('work.view')} <span aria-hidden="true">↗</span>
            </button>
            <span class="project-note">${project.note}</span>
          </div>
        </article>`
    )
    .join('');

  container.querySelectorAll('[data-project]').forEach((button) => {
    button.addEventListener('click', () => openProject(button.getAttribute('data-project'), button));
  });

  observeReveals();
}

function renderTimeline() {
  const container = document.getElementById('timeline');
  if (!container || !DATA.experience) return;

  container.innerHTML = DATA.experience
    .map(
      (item) => `
        <article class="timeline-item reveal">
          <div class="timeline-meta">
            <span class="timeline-period">${item.period}</span>
            <span class="timeline-location">${item.location}</span>
            <span class="timeline-type">${item.type === 'program' ? t('experience.typeProgram') : t('experience.typeWork')}</span>
          </div>
          <div class="timeline-body">
            <h3 class="timeline-company">${item.company}</h3>
            <p class="timeline-role">${item.role}</p>
            <p class="timeline-summary">${item.summary}</p>
            <ul class="timeline-bullets">
              ${item.bullets.map((bullet) => `<li>${bullet}</li>`).join('')}
            </ul>
            <div class="timeline-tags">
              ${item.tech.map((tech) => `<span class="tech">${tech}</span>`).join('')}
            </div>
          </div>
        </article>`
    )
    .join('');

  observeReveals();
}

function renderSkills() {
  const container = document.getElementById('skillsGrid');
  if (!container || !DATA.skills) return;

  container.innerHTML = DATA.skills
    .map(
      (group) => `
        <article class="skill-card reveal">
          <div class="skill-head">
            <p class="skill-kicker">${group.kicker}</p>
            <h3 class="skill-title">${group.title}</h3>
            <span class="skill-count">${String(group.items.length).padStart(2, '0')}</span>
          </div>
          <ul class="skill-list">
            ${group.items
              .map(
                (item) => `
                  <li class="skill-item">
                    <span class="skill-name">${item.name}</span>
                    <span class="skill-evidence">${item.evidence}</span>
                  </li>`
              )
              .join('')}
          </ul>
        </article>`
    )
    .join('');

  observeReveals();
}

function renderPrinciples() {
  const container = document.getElementById('principles');
  if (!container || !DATA.principles) return;

  container.innerHTML = DATA.principles
    .map(
      (item) => `
        <article class="principle reveal">
          <span class="principle-number">${item.number}</span>
          <h3 class="principle-title">${item.title}</h3>
          <p class="principle-text">${item.text}</p>
        </article>`
    )
    .join('');

  observeReveals();
}

/* ==========================================================================
   Filters
   ========================================================================== */

function initFilters() {
  const buttons = Array.from(document.querySelectorAll('.filter'));
  if (!buttons.length) return;

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.getAttribute('data-filter');
      buttons.forEach((item) => {
        const active = item === button;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-pressed', String(active));
      });
      renderProjects(filter);
    });
  });
}

/* ==========================================================================
   Project modal
   ========================================================================== */

let lastFocused = null;
let modalKeydownHandler = null;
let activeProjectId = null;

function initModal() {
  const modal = document.getElementById('projectModal');
  const closeButton = document.getElementById('modalClose');
  if (!modal) return;

  if (closeButton) closeButton.addEventListener('click', closeProjectModal);

  modal.addEventListener('click', (event) => {
    if (event.target.closest('[data-close-modal]')) closeProjectModal();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !modal.hidden) closeProjectModal();
  });
}

function buildArchitecture(project) {
  const nodes = project.architecture && project.architecture.nodes ? project.architecture.nodes : [];
  return nodes
    .map((node, index) => {
      const arrow = index < nodes.length - 1 ? '<span class="arch-arrow" aria-hidden="true">→</span>' : '';
      return `<span class="arch-node">${node}</span>${arrow}`;
    })
    .join('');
}

function buildProjectGallery(project) {
  const shots =
    project.gallery && project.gallery.length
      ? project.gallery
      : project.image
        ? [{ src: project.image, alt: project.imageAlt || project.title }]
        : [];

  if (!shots.length) return '';

  return `
    <div class="modal-gallery">
      ${shots
        .map(
          (shot, index) => `
            <figure class="modal-shot${index === 0 ? ' is-main' : ''}">
              <a href="${escapeHtml(shot.src)}" target="_blank" rel="noopener noreferrer" aria-label="Open full screenshot: ${escapeHtml(shot.alt || project.title)}">
                <img src="${escapeHtml(shot.src)}" alt="${escapeHtml(shot.alt || project.title)}" loading="${index === 0 ? 'eager' : 'lazy'}" decoding="async">
              </a>
            </figure>`
        )
        .join('')}
    </div>`;
}

function openProject(projectId, trigger) {
  const modal = document.getElementById('projectModal');
  const panel = document.getElementById('modalPanel');
  const content = document.getElementById('modalContent');
  if (!modal || !panel || !content) return;

  const project = (DATA.projects || []).find((item) => item.id === projectId);
  if (!project) return;

  activeProjectId = projectId;
  lastFocused = trigger || document.activeElement;

  const links = (project.links || [])
    .map(
      (link) =>
        `<a class="btn btn-ghost btn-sm" href="${link.url}" target="_blank" rel="noopener noreferrer">${link.label} <span aria-hidden="true">↗</span></a>`
    )
    .join('');

  content.innerHTML = `
    <header class="modal-header">
      <div class="modal-meta">
        <span>${project.categoryLabel}</span>
        <span>${project.year}</span>
        <span>${project.organization}</span>
        <span>${project.role}</span>
      </div>
      <h2 class="modal-title" id="modalTitle">${project.title}</h2>
      <p class="modal-sub">${project.subtitle}</p>
      <p class="modal-summary">${project.summary}</p>
      <div class="modal-metrics">
        ${project.metrics
          .map(
            (metric) => `
              <div class="modal-metric">
                <span>${metric.label}</span>
                <strong>${metric.value}</strong>
              </div>`
          )
          .join('')}
      </div>
    </header>

    ${buildProjectGallery(project)}

    <section class="modal-section">
      <h3 class="modal-section-title">${t('modal.problem')}</h3>
      <p class="arch-note">${project.problem}</p>
    </section>

    <section class="modal-section">
      <h3 class="modal-section-title">${t('modal.approach')}</h3>
      <ul class="modal-list">
        ${project.approach.map((item) => `<li>${item}</li>`).join('')}
      </ul>
    </section>

    <section class="modal-section">
      <h3 class="modal-section-title">${t('modal.architecture')}</h3>
      <div class="arch-flow">${buildArchitecture(project)}</div>
      <p class="arch-note">${project.architecture ? project.architecture.note : ''}</p>
    </section>

    <section class="modal-section">
      <h3 class="modal-section-title">${t('modal.outcome')}</h3>
      <ul class="modal-list">
        ${project.highlights.map((item) => `<li>${item}</li>`).join('')}
      </ul>
    </section>

    <section class="modal-section">
      <h3 class="modal-section-title">${t('modal.stack')}</h3>
      <div class="modal-tech">
        ${project.tech.map((tech) => `<span class="tech">${tech}</span>`).join('')}
      </div>
    </section>

    <div class="modal-links">
      ${links || `<span class="modal-note">${project.note}</span>`}
      <button type="button" class="btn btn-primary btn-sm" data-modal-contact>${t('modal.discuss')} <span aria-hidden="true">→</span></button>
    </div>
    ${links ? `<p class="modal-note">${project.note}</p>` : ''}
  `;

  modal.hidden = false;
  document.body.classList.add('modal-open');

  const contactButton = content.querySelector('[data-modal-contact]');
  if (contactButton) {
    contactButton.addEventListener('click', () => {
      const contact = document.getElementById('contact');
      const contactTitle = document.getElementById('contactTitle');
      closeProjectModal({ restoreFocus: false });
      try {
        window.history.replaceState(null, '', '#contact');
      } catch (error) {
        /* history API unavailable: keep the current URL */
      }
      if (contact) contact.scrollIntoView({ behavior: reduceMotion() ? 'auto' : 'smooth' });
      if (contactTitle) {
        const delay = reduceMotion() ? 0 : 350;
        window.setTimeout(() => contactTitle.focus({ preventScroll: true }), delay);
      }
    });
  }

  const focusTarget = document.getElementById('modalClose') || panel;
  window.requestAnimationFrame(() => focusTarget.focus());

  if (modalKeydownHandler) document.removeEventListener('keydown', modalKeydownHandler);
  modalKeydownHandler = (event) => {
    if (event.key === 'Escape') {
      closeProjectModal();
      return;
    }
    if (event.key !== 'Tab') return;
    const focusables = Array.from(
      panel.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    ).filter((element) => element.offsetParent !== null);
    if (!focusables.length) {
      event.preventDefault();
      panel.focus();
      return;
    }
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };
  document.addEventListener('keydown', modalKeydownHandler);
}

function closeProjectModal(options) {
  const modal = document.getElementById('projectModal');
  if (!modal || modal.hidden) return;
  const restoreFocus = !options || options.restoreFocus !== false;
  modal.hidden = true;
  document.body.classList.remove('modal-open');
  if (modalKeydownHandler) {
    document.removeEventListener('keydown', modalKeydownHandler);
    modalKeydownHandler = null;
  }
  if (restoreFocus && lastFocused && document.contains(lastFocused)) {
    lastFocused.focus();
  }
  lastFocused = null;
  activeProjectId = null;
}

/* ==========================================================================
   Mobile menu
   ========================================================================== */

function initMobileMenu() {
  const toggle = document.getElementById('menuToggle');
  const menu = document.getElementById('mobileMenu');
  if (!toggle || !menu) return;

  const setOpen = (open) => {
    menu.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? t('a11y.closeMenu') : t('a11y.openMenu'));
  };

  toggle.addEventListener('click', () => setOpen(menu.hidden));

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setOpen(false));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !menu.hidden) {
      setOpen(false);
      toggle.focus();
    }
  });

  document.addEventListener('click', (event) => {
    if (menu.hidden) return;
    if (menu.contains(event.target) || toggle.contains(event.target)) return;
    setOpen(false);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900 && !menu.hidden) setOpen(false);
  });
}

/* ==========================================================================
   Scrollspy
   ========================================================================== */

function initScrollSpy() {
  const links = Array.from(document.querySelectorAll('.nav-link[data-section]'));
  const sections = Array.from(document.querySelectorAll('main section[id]'));
  if (!links.length || !sections.length || !('IntersectionObserver' in window)) return;

  const setActive = (id) => {
    links.forEach((link) => {
      const active = link.getAttribute('data-section') === id;
      if (active) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    },
    { rootMargin: '-28% 0px -62% 0px', threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}

/* ==========================================================================
   Agent trace animation
   ========================================================================== */

function initTrace() {
  const trace = document.getElementById('agentTrace');
  if (!trace || reduceMotion()) return;
  const lines = Array.from(trace.querySelectorAll('.trace-line'));
  if (lines.length < 2) return;

  let index = 0;
  let timer = null;

  const paint = () => {
    lines.forEach((line, lineIndex) => {
      line.classList.toggle('is-active', lineIndex === index);
    });
    index = (index + 1) % lines.length;
  };

  const start = () => {
    if (timer) return;
    timer = window.setInterval(paint, 2100);
  };

  const stop = () => {
    if (!timer) return;
    window.clearInterval(timer);
    timer = null;
  };

  const visibility = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) start();
        else stop();
      });
    },
    { threshold: 0.2 }
  );

  visibility.observe(trace);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop();
    else start();
  });
}

/* ==========================================================================
   AI assistant (offline keyword demo)
   ========================================================================== */

let activeTypewriter = null;

function normalizeText(value) {
  return String(value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/\s+/g, ' ')
    .trim();
}

function isWordChar(char) {
  return /[a-z0-9]/.test(char);
}

function hasWholeWord(text, keyword) {
  let from = 0;
  while (from <= text.length) {
    const at = text.indexOf(keyword, from);
    if (at === -1) return false;
    const before = at === 0 ? ' ' : text[at - 1];
    const after = at + keyword.length >= text.length ? ' ' : text[at + keyword.length];
    if (!isWordChar(before) && !isWordChar(after)) return true;
    from = at + 1;
  }
  return false;
}

function keywordScore(text, keyword) {
  const normalized = normalizeText(keyword);
  if (!normalized) return 0;
  if (normalized.length <= 3) return hasWholeWord(text, normalized) ? 2 : 0;
  if (!text.includes(normalized)) return 0;
  return normalized.length >= 8 ? 3 : normalized.length >= 5 ? 2 : 1;
}

function findAnswer(query) {
  const knowledge = DATA.aiKnowledge || [];
  const text = normalizeText(query);
  let best = null;
  let bestIndex = -1;
  let bestScore = 0;
  knowledge.forEach((entry, index) => {
    const score = (entry.keywords || []).reduce(
      (total, keyword) => total + keywordScore(text, keyword),
      0
    );
    if (score > bestScore) {
      bestScore = score;
      best = entry;
      bestIndex = index;
    }
  });
  return best
    ? { answer: best.answer, knowledgeIndex: bestIndex }
    : { answer: t('ask.fallback'), knowledgeIndex: -1 };
}

function renderChatPrompts() {
  const container = document.getElementById('chatPrompts');
  if (!container || !DATA.aiPrompts) return;
  container.innerHTML = DATA.aiPrompts
    .map(
      (prompt) => `<button type="button" class="prompt-chip">${escapeHtml(prompt)}</button>`
    )
    .join('');
  container.querySelectorAll('.prompt-chip').forEach((button) => {
    button.addEventListener('click', () => {
      sendChat(button.textContent || '');
    });
  });
}

function initChat() {
  const form = document.getElementById('chatForm');
  const input = document.getElementById('chatInput');
  if (!form || !input) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const value = input.value.trim();
    if (!value) return;
    sendChat(value);
    input.value = '';
  });
}

function scrollChat() {
  const log = document.getElementById('chatLog');
  if (log) log.scrollTop = log.scrollHeight;
}

function appendChatMessage(role, text, animate = false) {
  const log = document.getElementById('chatLog');
  if (!log) return null;

  const wrapper = document.createElement('div');
  wrapper.className = `msg ${role === 'user' ? 'msg-user' : 'msg-bot'}`;

  const avatar = document.createElement('span');
  avatar.className = 'msg-avatar';
  avatar.setAttribute('aria-hidden', 'true');
  avatar.textContent = role === 'user' ? t('ask.userAvatar') : 'AI';

  const bubble = document.createElement('div');
  bubble.className = 'msg-bubble';

  wrapper.append(avatar, bubble);

  if (animate && !reduceMotion()) {
    bubble.setAttribute('aria-hidden', 'true');
    const announcement = document.createElement('span');
    announcement.className = 'sr-only';
    announcement.textContent = text;
    wrapper.appendChild(announcement);
  }

  log.appendChild(wrapper);
  scrollChat();

  if (!animate || reduceMotion()) {
    bubble.textContent = text;
    scrollChat();
    return null;
  }

  return typewrite(bubble, text);
}

function typewrite(element, text) {
  let index = 0;
  let timer = null;
  let done = false;

  const complete = () => {
    if (done) return;
    done = true;
    if (timer) window.clearTimeout(timer);
    timer = null;
    if (activeTypewriter === typer) activeTypewriter = null;
  };

  const finish = () => {
    if (done) return;
    element.textContent = text;
    scrollChat();
    complete();
  };

  const tick = () => {
    if (done) return;
    if (index >= text.length) {
      finish();
      return;
    }
    element.textContent += text.charAt(index);
    index += 1;
    scrollChat();
    timer = window.setTimeout(tick, 8);
  };

  const typer = { finish };
  tick();
  return typer;
}

function sendChat(rawQuery) {
  const query = String(rawQuery || '').trim();
  if (!query) return;

  if (activeTypewriter) activeTypewriter.finish();

  chatEntries.push({ role: 'user', text: query });
  const answer = findAnswer(query);
  chatEntries.push({ role: 'bot', knowledgeIndex: answer.knowledgeIndex });

  appendChatMessage('user', query);
  activeTypewriter = appendChatMessage('bot', answer.answer, true);
}

/* ==========================================================================
   Contact form
   ========================================================================== */

function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const submit = document.getElementById('contactSubmit');
  const nameInput = document.getElementById('contactName');
  const emailInput = document.getElementById('contactEmail');
  const messageInput = document.getElementById('contactMessage');
  const requiredInputs = [nameInput, emailInput, messageInput].filter(Boolean);

  requiredInputs.forEach((input) => {
    input.addEventListener('input', () => input.removeAttribute('aria-invalid'));
  });

  const openMailClient = (payload) => {
    const email = (DATA.profile && DATA.profile.email) || 'giauy0987@gmail.com';
    const body = `${t('contact.mailName')}: ${payload.name}\n${t('contact.mailEmail')}: ${payload.email}\n\n${t('contact.mailBody')}:\n${payload.message}`;
    const subject = format(t('contact.mailSubject'), {
      subject: payload.subject,
      name: payload.name
    });
    const url = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = url;
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const honey = document.getElementById('contactHoney');
    if (honey && honey.value.trim()) {
      setContactFeedback('contact.statusSent', 'is-ok');
      form.reset();
      return;
    }

    const payload = {
      name: nameInput ? nameInput.value : '',
      email: emailInput ? emailInput.value : '',
      subject: (document.getElementById('contactSubject') || {}).value || '',
      message: messageInput ? messageInput.value : ''
    };

    payload.name = payload.name.trim();
    payload.email = payload.email.trim();
    payload.subject = payload.subject.trim() || t('contact.subjectDefault');
    payload.message = payload.message.trim();

    requiredInputs.forEach((input) => input.removeAttribute('aria-invalid'));

    if (!payload.name || !payload.email || !payload.message) {
      setContactFeedback('contact.statusRequired', 'is-error');
      let firstInvalid = null;
      requiredInputs.forEach((input) => {
        if (input.value.trim()) return;
        input.setAttribute('aria-invalid', 'true');
        if (!firstInvalid) firstInvalid = input;
      });
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    if (emailInput && emailInput.validity && emailInput.validity.typeMismatch) {
      setContactFeedback('contact.statusEmail', 'is-error');
      emailInput.setAttribute('aria-invalid', 'true');
      emailInput.focus();
      return;
    }

    const endpoint = DATA.contact && DATA.contact.endpoint;
    if (!endpoint) {
      setContactFeedback('contact.statusOpening');
      openMailClient(payload);
      return;
    }

    contactSending = true;
    if (submit) {
      submit.disabled = true;
      submit.textContent = t('contact.sending');
    }
    setContactFeedback('contact.statusSending');

    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          name: payload.name,
          email: payload.email,
          subject: payload.subject,
          message: payload.message,
          _subject: `[Portfolio] ${payload.subject} — ${payload.name}`,
          _template: 'table',
          _captcha: 'false'
        })
      });
      window.clearTimeout(timer);

      const data = await response.json().catch(() => ({}));
      const sent = response.ok && (data.success === true || data.success === 'true');
      if (!sent) throw new Error(data.message || `HTTP ${response.status}`);

      setContactFeedback('contact.statusSent', 'is-ok');
      showToast('contact.toastSent');
      form.reset();
    } catch (error) {
      window.clearTimeout(timer);
      setContactFeedback('contact.statusFallback', 'is-error');
      showToast('contact.toastFallback');
      window.setTimeout(() => openMailClient(payload), 600);
    } finally {
      contactSending = false;
      if (submit) {
        submit.disabled = false;
        submit.innerHTML = `<span>${t('contact.submit')}</span> <span aria-hidden="true">→</span>`;
      }
    }
  });
}

/* ==========================================================================
   Clipboard + toast
   ========================================================================== */

function initCopyButtons() {
  document.querySelectorAll('[data-copy]').forEach((button) => {
    button.addEventListener('click', () => {
      const value = button.getAttribute('data-copy') || '';
      const labelKey = button.getAttribute('data-label-key') || 'email';
      copyText(value, labelKey, button);
    });
  });
}

function copyText(value, labelKey, trigger) {
  const done = () => showToast('copy.done', { labelKey, value });
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard
      .writeText(value)
      .then(done)
      .catch(() => fallbackCopy(value, done, trigger));
    return;
  }
  fallbackCopy(value, done, trigger);
}

function fallbackCopy(value, done, trigger) {
  const input = document.createElement('input');
  input.value = value;
  document.body.appendChild(input);
  input.select();
  let copied = false;
  try {
    copied = document.execCommand('copy');
  } catch (error) {
    copied = false;
  }
  document.body.removeChild(input);
  if (trigger && typeof trigger.focus === 'function') trigger.focus();
  if (copied) done();
  else showToast('copy.error');
}

let toastState = null;
let toastTimer = null;

function renderToast() {
  const toast = document.getElementById('toast');
  if (!toast) return;
  if (!toastState) {
    toast.textContent = '';
    toast.classList.remove('show');
    return;
  }
  const values = { ...toastState.params };
  if (values.labelKey) {
    values.label = t(`copy.${values.labelKey}`);
    delete values.labelKey;
  }
  toast.textContent = format(t(toastState.key), values);
}

function showToast(key, params = {}) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toastState = { key, params };
  renderToast();
  toast.classList.add('show');
  if (toastTimer) window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    toastState = null;
    toast.classList.remove('show');
  }, 3200);
}

/* ==========================================================================
   Misc
   ========================================================================== */

function initYear() {
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
}

// Apply the persisted language to static markup before first paint.
applyStaticI18n();
updateMeta();
updateLangButtons();
updateThemeButton();
updateMenuLabel();
