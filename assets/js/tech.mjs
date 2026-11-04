import './site.mjs';
import {canonicalTags,normalizeTag,matchesTag,tagURL,resolveTag} from './tech-core.mjs';

const archive = document.querySelector('#tech-archive');
if (archive) {
  const rows = [...archive.querySelectorAll('.tech-entry')].map(el => {
    let tags = []; try { tags = canonicalTags(JSON.parse(el.dataset.tags)); } catch {}
    return {el, tags};
  });
  const chips = [...archive.querySelectorAll('.tech-tags a[data-tech-tag]')];
  function render() {
    const tag = resolveTag(new URL(location.href).searchParams.get('tag'), chips.map(chip => chip.dataset.techTag));
    let count = 0;
    for (const row of rows) { row.el.hidden = !matchesTag(row.tags, tag); if (!row.el.hidden) count++; }
    for (const chip of chips) {
      if (chip.dataset.techTag === tag) chip.setAttribute('aria-current','true');
      else chip.removeAttribute('aria-current');
    }
    archive.querySelector('#tech-empty').hidden = count > 0;
    const status = archive.querySelector('#tech-current-filter');
    status.textContent = document.documentElement.lang === 'zh' ? (tag ? '标签：' + tag : '全部文章') + ' · ' + count + ' 篇' : (tag ? 'Tag: ' + tag : 'All posts') + ' · ' + count + ' posts';
  }
  archive.addEventListener('click', event => {
    const link = event.target.closest('a[data-tech-tag]');
    if (!link || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    const next = tagURL(location.href, link.dataset.techTag);
    if (next !== location.href) history.pushState(null, '', next);
    render();
  });
  addEventListener('popstate', render);
  document.addEventListener('languagechange', render);
  render();
}
