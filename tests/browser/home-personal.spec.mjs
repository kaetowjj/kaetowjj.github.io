import {test,expect} from '@playwright/test';
test('brief homepage shows short introduction and the new section order',async({page})=>{
  await page.goto('/');const heading=page.locator('.hero h1 span');
  await expect(heading).toHaveText(await heading.getAttribute('data-en'));
  await expect(page.locator('.hero-intro [data-lang="en"] p')).toBeVisible();
  await expect(page.locator('.home-exploring,.home-beyond,.hero-disciplines')).toHaveCount(0);
  const sections=await page.locator('main>section').evaluateAll(es=>es.map(e=>e.className));
  expect(sections[1]).toContain('home-recent');expect(sections[2]).toContain('explore-grid');expect(sections).toHaveLength(3);expect(sections.at(-1)).toContain('explore-grid');
  await expect(page.locator('.recent-links a')).toHaveCount(2);
  await expect(page.locator('.recent-links a').nth(0)).toHaveAttribute('href','/tech/');
  await expect(page.locator('.recent-links a').nth(1)).toHaveAttribute('href','/essays/');
  expect(await page.locator('.recent-post').count()).toBeLessThanOrEqual(3);
  if(!await page.locator('.recent-post').count())await expect(page.locator('.recent-empty')).toBeVisible();
  await page.locator('#language-toggle').click();await expect(heading).toHaveText(await heading.getAttribute('data-zh'));
  await expect(page.locator('.hero-intro [data-lang="zh"] p')).toBeVisible();await expect(page.locator('.hero-intro [data-lang="en"]')).toBeHidden();
  await page.locator('#theme-toggle').click();await page.locator('#theme-toggle').click();await expect(page.locator('html')).toHaveAttribute('data-theme','dark');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});
test('footer retains social contacts, thoughts and sitemap without feeds',async({page,request})=>{await page.goto('/about/');await expect(page.locator('footer .footer-social')).toHaveCount(1);await expect(page.locator('footer')).not.toContainText('Thinking, Building');const mainMail=page.locator('main a[href^="mailto:"]');for(const mail of await mainMail.all()){await expect(mail).toBeVisible();await expect(mail).toHaveText((await mail.getAttribute('href')).slice(7));}const quotes=JSON.parse(await page.locator('#quotes-data').textContent());await expect(page.locator('footer [data-thought=footer]')).toHaveJSProperty('hidden',!quotes.some(q=>q.placement==='footer'||q.placement==='both'));expect((await request.get('/sitemap.xml')).status()).toBe(200);await expect(page.locator('link[type="application/atom+xml"]')).toHaveCount(0);});
