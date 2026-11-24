(() => {
  const POST_RE = /\/posts\/(pfbid[0-9A-Za-z]+|\d{6,})|\/permalink\/(\d{6,})|story_fbid=\d{6,}/;
  const KEEP = ['story_fbid', 'id', 'fbid', 'v'];
  const clean = (href) => {
    const url = new URL(href, location.origin);
    const kept = [...url.searchParams].filter(([key]) => KEEP.includes(key));
    url.search = kept.length ? '?' + kept.map(([k, val]) => k + '=' + encodeURIComponent(val)).join('&') : '';
    url.hash = '';
    return url.href;
  };
  const textOf = (node) => (node.innerText || '').replace(/\u00a0/g, ' ').trim();
  const seen = new Set();
  const out = [];
  document.querySelectorAll('a[href]').forEach((anchor) => {
    const raw = anchor.getAttribute('href') || '';
    if (!POST_RE.test(raw)) return;
    const href = clean(raw);
    if (seen.has(href)) return;
    let node = anchor;
    let body = '';
    for (let i = 0; i < 10 && node; i += 1) {
      node = node.parentElement;
      if (!node) break;
      const blocks = Array.from(node.querySelectorAll('div[dir="auto"]'))
        .map(textOf)
        .filter((text) => text.length >= 30);
      if (blocks.length) {
        blocks.sort((a, b) => b.length - a.length);
        body = blocks[0];
        break;
      }
      if (textOf(node).length > 4000) break;
    }
    if (!body) return;
    seen.add(href);
    out.push({ text: body.slice(0, 1200), href });
  });
  return JSON.stringify({
    items: out,
    loginWall: !!document.querySelector('form[action*="login"], input[name="email"]'),
    title: (document.title || '').replace(/\s*\|\s*Facebook\s*$/, '').trim()
  });
})()
