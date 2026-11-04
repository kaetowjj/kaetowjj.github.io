import {test,expect} from '@playwright/test';
import {routeRecent} from './recent-fixture.mjs';

test('Recent Posts merges collections by publication date after excluding Demo, capped at three',async({page},info)=>{
  await routeRecent(page);await page.goto('/__test_recent__/mixed/');const rows=page.locator('.recent-post');
  await expect(rows).toHaveCount(3);expect(await rows.evaluateAll(es=>es.map(e=>e.getAttribute('href')))).toEqual(['/essays/recent-new-essay/','/tech/recent-new-tech/','/essays/recent-middle-essay/']);
  expect(await rows.locator('time').evaluateAll(es=>es.map(e=>e.dateTime))).toEqual(['2026-04-04','2026-03-03','2026-02-02']);
  await expect(page.locator('.recent-post-source')).toHaveText(['Essays','Tech Blog','Essays']);await expect(page.locator('.home-recent')).not.toContainText('recent-demo');await expect(page.locator('.home-recent')).not.toContainText('recent-old-tech');
  await expect(page.locator('.recent-links a')).toHaveCount(2);await expect(page.locator('.recent-links a').first()).toHaveAttribute('href','/tech/');await expect(page.locator('.recent-links a').last()).toHaveAttribute('href','/essays/');
  await page.locator('#language-toggle').click();await expect(page.locator('.recent-post-source')).toHaveText(['随笔','技术博客','随笔']);await expect(rows.first().locator('h3')).toContainText('测试专用');
  for(const [mode,color] of [['light','rgb(180, 83, 9)'],['dark','rgb(167, 215, 164)']]){for(let i=0;i<3&&await page.locator('html').getAttribute('data-mode')!==mode;i++)await page.locator('#theme-toggle').click();if(info.project.name==='desktop'){await rows.first().hover();await expect(rows.first().locator('h3')).toHaveCSS('color',color);await expect(rows.first().locator('svg')).toHaveCSS('stroke',color);}}
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
  if(info.project.name==='mobile'){const heading=await page.locator('.recent-heading h2').boundingBox(),links=await page.locator('.recent-links').boundingBox();expect(links.y).toBeGreaterThanOrEqual(heading.y+heading.height);}
  const target=await rows.first().getAttribute('href');if(info.project.name==='mobile')await rows.first().locator('svg').tap();else await rows.first().locator('svg').click();await expect.poll(()=>new URL(page.url()).pathname).toBe(target);await expect(page.locator('.article-heading h1')).toContainText('recent-new-essay');
});

test('Recent Posts shows one real entry or a simple empty state without fillers',async({page})=>{
  await routeRecent(page);await page.goto('/__test_recent__/single/');await expect(page.locator('.recent-post')).toHaveCount(1);await expect(page.locator('.recent-post-source')).toHaveText('Tech Blog');await expect(page.locator('.recent-empty')).toHaveCount(0);
  await page.goto('/__test_recent__/empty/');await expect(page.locator('.recent-post')).toHaveCount(0);await expect(page.locator('.recent-empty')).toBeVisible();await expect(page.locator('.recent-links a')).toHaveCount(2);await page.locator('#language-toggle').click();await expect(page.locator('.recent-empty')).toHaveText('暂时还没有文章。');
});
