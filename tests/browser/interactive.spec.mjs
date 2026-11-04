import {routeArticle} from './article-fixture.mjs';
import {test, expect} from '@playwright/test';

const themes = [
  {mode: 'light', text: 'rgb(39, 45, 43)', hover: 'rgb(180, 83, 9)', bg: 'rgb(248, 247, 243)'},
  {mode: 'dark', text: 'rgb(229, 232, 225)', hover: 'rgb(167, 215, 164)', bg: 'rgb(32, 37, 34)'}
];
async function theme(page, value) {
  for (let i = 0; i < 3 && await page.locator('html').getAttribute('data-mode') !== value.mode; i++)
    await page.locator('#theme-toggle').click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', value.mode);
  await expect(page.locator('body')).toHaveCSS('background-color', value.bg);
}
async function hoverColor(locator, color) {
  await locator.hover();
  await expect(locator).toHaveCSS('color', color);
}
async function tabTo(page, locator) {
  for (let i = 0; i < 35 && !await locator.evaluate(el => el === document.activeElement); i++)
    await page.keyboard.press('Tab');
  await expect(locator).toBeFocused();
  await expect(locator).toHaveCSS('outline-style', 'solid');
  expect(parseFloat(await locator.evaluate(el => getComputedStyle(el).outlineWidth))).toBeGreaterThanOrEqual(2);
}
function contrast(a, b) {
  const luminance = value => {
    const c = value.match(/\d+/g).slice(0, 3).map(Number).map(n => {
      const v = n / 255;
      return v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4;
    });
    return .2126 * c[0] + .7152 * c[1] + .0722 * c[2];
  };
  const x = luminance(a), y = luminance(b);
  return (Math.max(x, y) + .05) / (Math.min(x, y) + .05);
}

test('current navigation keeps text and underline while other links hover', async ({page}, info) => {
  await page.goto('/');
  for (const value of themes) {
    await theme(page, value);
    if (info.project.name === 'mobile' && await page.locator('#menu-toggle').getAttribute('aria-expanded') !== 'true')
      await page.locator('#menu-toggle').tap();
    const current = page.locator('#navigation a[aria-current="page"]');
    const other = page.locator('#navigation a:not([aria-current="page"])').first();
    await expect(current).toHaveCSS('color', value.text);
    await expect(current).toHaveCSS('border-bottom-width', '2px');
    const line = await current.evaluate(el => getComputedStyle(el).borderBottomColor);
    if (info.project.name === 'desktop') {
      await current.hover();
      await expect(current).toHaveCSS('color', value.text);
      await expect(current).toHaveCSS('border-bottom-color', line);
      const normal = await other.evaluate(el => getComputedStyle(el).color);
      await hoverColor(other, value.hover);
      await page.locator('.hero h1').hover();
      await expect(other).toHaveCSS('color', normal);
    }
    await tabTo(page, current);
    await expect(current).toHaveCSS('color', value.text);
  }
});

test('clickable titles, text links and header controls share theme hover colors', async ({page}, info) => {
  test.skip(info.project.name !== 'desktop', 'Touch devices do not expose hover.');
  await routeArticle(page);
  for (const value of themes) {
    await page.goto('/');
    await theme(page, value);
    for (const selector of ['.wordmark', '.hero a', '.section-heading a', '#language-toggle', '#theme-toggle'])
      await hoverColor(page.locator(selector).first(), value.hover);
    await expect(page.locator('.wordmark')).toHaveCSS('transition-duration', '0.18s, 0.18s, 0.18s');
    for (const selector of ['.explore-card']) {
      const card = page.locator(selector).first();
      await card.hover();
      await expect(card.locator(selector === '.entry' ? 'h3' : 'h2')).toHaveCSS('color', value.hover);
      await expect(card).toHaveCSS('border-top-color', value.hover);
      await expect(card.locator('p')).not.toHaveCSS('color', value.hover);
    }
    for (const title of await page.locator('.tech-entry-title').all()) await hoverColor(title, value.hover);
    const prose = page.locator('.hero-intro [data-lang="en"] p').first();
    const normal = await prose.evaluate(el => getComputedStyle(el).color);
    await prose.hover();
    await expect(prose).toHaveCSS('color', normal);
    await page.goto('/about/');
    await hoverColor(page.locator('.background-contact a'), value.hover);
    await page.goto('/__test_article__/');
    // Style fixture: current demo articles contain no inline prose links.
    await page.locator('#article [data-lang="en"]').evaluate(el => {
      const a = document.createElement('a'); a.href = '#main'; a.textContent = 'TEST ONLY: inline link'; el.prepend(a);
    });
    for (const selector of ['#article a', '.tag-list a', '#toc a', '.article-heading>a'])
      await hoverColor(page.locator(selector).first(), value.hover);
    await page.locator('.tag-list a').first().hover();
    await expect(page.locator('.tag-list a').first()).toHaveCSS('color', value.hover);
    const actualTag = await page.locator('.tag-list a').first().evaluate(el => ({text: getComputedStyle(el).color, bg: getComputedStyle(el).backgroundColor}));
    expect(contrast(actualTag.text, actualTag.bg)).toBeGreaterThanOrEqual(4.5);
    expect(contrast(value.hover, value.bg)).toBeGreaterThanOrEqual(4.5);
  }
});

test('gallery selected buttons retain contrast; controls, focus and disabled states stay distinct', async ({page}, info) => {
  await page.goto('/photography/');
  for (const value of themes) {
    await theme(page, value);
    const category = page.locator('#categories button:not([data-category="all"])').first();
    if (info.project.name === 'mobile') await category.tap(); else await category.click();
    await expect(category).toHaveAttribute('aria-pressed', 'true');
    await expect(category).toHaveCSS('color', value.bg);
    await expect(category).toHaveCSS('background-color', value.text);
    const selected = await category.evaluate(el => ({color: getComputedStyle(el).color, bg: getComputedStyle(el).backgroundColor}));
    expect(contrast(selected.color, selected.bg)).toBeGreaterThanOrEqual(4.5);
    if (info.project.name === 'desktop') {
      await category.hover();
      await expect(category).toHaveCSS('color', selected.color);
      await expect(category).toHaveCSS('background-color', selected.bg);
      await hoverColor(page.locator('#categories button[data-category="all"]'), value.hover);
      for (const selector of ['#photo-tag', '#photo-sort', '#clear-filters'])
        await hoverColor(page.locator(selector), value.hover);
    }
    const tag = page.locator('#photo-tag');
    const tagValue = await tag.locator('option').nth(1).getAttribute('value');
    await tag.selectOption(tagValue);
    await expect(tag).toHaveValue(tagValue);
    await page.locator('#language-toggle').click();
    await expect(category).toHaveAttribute('aria-pressed', 'true');
    await tabTo(page, category);
    const clear = page.locator('#clear-filters');
    await page.locator('h1').hover();
    await expect(clear).toHaveCSS('color', value.text);
    await clear.evaluate(el => {el.disabled = true;});
    if (info.project.name === 'desktop') await clear.hover({force: true});
    await expect(clear).toHaveCSS('cursor', 'default');
    await expect(clear).toHaveCSS('color', value.text);
    expect(parseFloat(await clear.evaluate(el => getComputedStyle(el).opacity))).toBeLessThan(1);
    await clear.evaluate(el => {el.disabled = false;});
    await clear.click();
    await expect(page.locator('#categories button[data-category="all"]')).toHaveAttribute('aria-pressed', 'true');
    await expect(tag).toHaveValue('all');
  }
});

test('Shuffle, viewer actions and tag buttons retain working feedback', async ({page}, info) => {
  // Synthetic collection permits testing Shuffle without editing the real curated data.
  await page.route('http://127.0.0.1:4173/', async route => {
    const response = await route.fetch();
    const fixture = [{id:'test-a', text:'TEST ONLY: A', lang:'en', placement:'home'}, {id:'test-b', text:'TEST ONLY: B', lang:'zh', placement:'home'}];
    const body = (await response.text()).replace(/(<script type="application\/json" id="quotes-data">)[\s\S]*?(<\/script>)/, (_, a, b) => a + JSON.stringify(fixture) + b);
    await route.fulfill({response, body});
  });
  await page.goto('/');
  const shuffle = page.locator('[data-thought="home"] .thought-shuffle');
  for (const value of themes) {
    await theme(page, value);
    if (info.project.name === 'desktop') await hoverColor(shuffle, value.hover);
    await tabTo(page, shuffle);
    const previous = await page.locator('[data-thought="home"]').getAttribute('data-quote-id');
    await page.keyboard.press('Enter');
    await expect(page.locator('[data-thought="home"]')).not.toHaveAttribute('data-quote-id', previous);
  }
  await page.goto('/photography/');
  for (const value of themes) {
    await theme(page, value);
    if (info.project.name === 'mobile') await page.locator('.photo').first().tap(); else await page.locator('.photo').first().click();
    await expect(page.locator('#lightbox')).toBeVisible();
    if (info.project.name === 'desktop') for (const selector of ['#lightbox-close', '#lightbox-prev', '#lightbox-next', '#lightbox-tags button'])
      await hoverColor(page.locator(selector).first(), value.hover);
    if (info.project.name === 'desktop') {
      const colors = await page.locator('#lightbox-tags button').first().evaluate(el => ({text: getComputedStyle(el).color, bg: getComputedStyle(el).backgroundColor}));
      expect(contrast(colors.text, colors.bg)).toBeGreaterThanOrEqual(4.5);
    }
    await page.locator('#lightbox-tags button').first().click();
    await expect(page.locator('#lightbox')).not.toBeVisible();
    await expect(page.locator('#photo-tag')).not.toHaveValue('all');
    await page.locator('#clear-filters').click();
  }
});

test('reduced motion disables hover transitions and keeps the existing page entrance disabled', async ({page}, info) => {
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.goto('/');
  for (const selector of ['.wordmark', '.hero a', '.explore-card', '#language-toggle'])
    await expect(page.locator(selector).first()).toHaveCSS('transition-duration', '0s');
  await expect(page.locator('#main')).toHaveCSS('animation-name', 'none');
  if (info.project.name === 'mobile') await page.locator('.hero a').tap(); else await page.locator('.hero a').click();
  await expect(page).toHaveURL(/\/about\/$/);
  await expect(page.locator('#main')).toHaveCSS('animation-name', 'none');
});
