import {test, expect} from '@playwright/test';

async function checkIcon(link) {
  const icon = link.locator('svg.link-arrow');
  await expect(icon).toHaveCount(1);
  await expect(icon).toHaveAttribute('aria-hidden', 'true');
  await expect(icon).toHaveAttribute('focusable', 'false');
  await expect(icon).toHaveAttribute('stroke', 'currentColor');
  await expect(icon.locator('path')).toHaveCount(1);
  const style = await icon.evaluate(el => {
    const s = getComputedStyle(el), parent = getComputedStyle(el.parentElement);
    return {stroke: s.stroke, text: parent.color, width: parseFloat(s.width), font: parseFloat(s.fontSize), align: s.verticalAlign};
  });
  expect(style.stroke).toBe(style.text);
  expect(style.width).toBeCloseTo(style.font, 1);
  expect(parseFloat(style.align)).toBeLessThan(0);
  await expect(link.locator('a')).toHaveCount(0);
}

test('decorative arrows are scalable hidden SVGs and follow theme hover colors', async ({page}, info) => {
  await page.goto('/');
  for (const mode of ['light', 'dark']) {
    for (let i = 0; i < 3 && await page.locator('html').getAttribute('data-mode') !== mode; i++)
      await page.locator('#theme-toggle').click();
    const hover = mode === 'light' ? 'rgb(180, 83, 9)' : 'rgb(167, 215, 164)';
    for (const selector of ['.hero>a', '.recent-links>a', '.explore-card', '.recent-post']) {
      const links = page.locator(selector);
      if (selector !== '.recent-post') expect(await links.count()).toBeGreaterThan(0);
      for (const link of await links.all()) {
        if (info.project.name === 'desktop') {
          await link.hover();
          await expect(link.locator('svg.link-arrow')).toHaveCSS('stroke', hover);
        }
        await checkIcon(link);
      }
    }
    await page.locator('#language-toggle').click();
    await checkIcon(page.locator('.hero>a'));
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  }
  if (!await page.locator('.recent-post').count()) return;
  const entryURL = await page.locator('.recent-post').first().getAttribute('href');
  await page.goto(entryURL);
  const archiveURL = await page.locator('.article-heading>a').getAttribute('href');
  await page.goto(archiveURL);
  for (const link of await page.locator('.tech-entry-title,a.entry').all()) await checkIcon(link);
});

test('dynamic source links keep one decorative SVG through language changes without altering content symbols', async ({page}) => {
  await page.route('http://127.0.0.1:4173/', async route => {
    const response = await route.fetch();
    const fixture = [{id:'arrow-test',text:'TEST ONLY: ordinary ↗ symbol stays.',lang:'en',placement:'footer',source_type:'test_fixture',source_url:'https://example.com/source'}];
    const body = (await response.text()).replace(/(<script type="application\/json" id="quotes-data">)[\s\S]*?(<\/script>)/, (_, a, b) => a + JSON.stringify(fixture) + b);
    await route.fulfill({response, body});
  });
  await page.goto('/');
  const link = page.locator('[data-thought="footer"] .thought-source');
  for (let i = 0; i < 3; i++) {
    await checkIcon(link);
    await expect(link).toHaveAttribute('href', 'https://example.com/source');
    await expect(page.locator('[data-thought="footer"] .thought-text')).toHaveText('TEST ONLY: ordinary ↗ symbol stays.');
    await page.locator('#language-toggle').click();
  }
});

test('SVG clicks retain native link navigation and reduced motion', async ({page}, info) => {
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.goto('/');
  const link = page.locator('.hero>a');
  await checkIcon(link);
  await expect(link).toHaveCSS('transition-duration', '0s');
  await expect(link).toHaveAttribute('href', '/about/');
  if (info.project.name === 'mobile') await link.locator('svg').tap(); else await link.locator('svg').click();
  await expect(page).toHaveURL(/\/about\/$/);
  await page.goBack();
  await expect(page.locator('.hero>a svg.link-arrow')).toBeVisible();
});
