import {test,expect} from '@playwright/test';

test('Home ends at the cards with no joke module, controls or reserved blank area',async({page})=>{
  await page.goto('/');await expect(page.locator('main [data-thought],.thought-home,.thought-shuffle')).toHaveCount(0);
  await expect(page.locator('main')).not.toContainText('A LITTLE NONSENSE');
  expect(await page.locator('main>section').last().getAttribute('class')).toBe('explore-grid');
  await expect(page.locator('.site-footer [data-thought=footer]')).toBeVisible();
  const spacing=()=>page.locator('main').evaluate(el=>{const r=el.getBoundingClientRect(),last=el.lastElementChild.getBoundingClientRect(),s=getComputedStyle(el);return{minHeight:s.minHeight,gap:r.bottom-last.bottom}});
  expect((await spacing()).gap).toBeLessThanOrEqual(25);expect((await spacing()).minHeight).toBe('0px');
  await page.setViewportSize({...page.viewportSize(),height:1600});expect((await spacing()).gap).toBeLessThanOrEqual(25);
});

test('all pages select a footer record with its original language and source',async({page})=>{
  for(const url of ['/','/tech/','/essays/','/photography/','/about/']){
    await page.goto(url);const footer=page.locator('.site-footer [data-thought=footer]');await expect(footer).toBeVisible();
    const quotes=JSON.parse(await page.locator('#quotes-data').textContent()),id=await footer.getAttribute('data-quote-id'),q=quotes.find(q=>q.id===id);
    expect(q).toBeTruthy();expect(['both','footer']).toContain(q.placement);await expect(footer.locator('.thought-text')).toHaveText(q.text);
    await expect(footer.locator('.thought-text')).toHaveAttribute('lang',q.lang);
    if(q.source_url){await expect(footer.locator('.thought-source')).toHaveAttribute('href',q.source_url);await expect(footer.locator('.thought-source')).toHaveAttribute('target','_blank');}
    await page.locator('#language-toggle').click();await expect(footer).toHaveAttribute('data-quote-id',id);await expect(footer.locator('.thought-text')).toHaveText(q.text);
    await expect(page.locator('main [data-thought],.thought-shuffle')).toHaveCount(0);
  }
});
