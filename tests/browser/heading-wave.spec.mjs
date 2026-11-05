import {test,expect} from '@playwright/test';
const routes=['/tech/','/essays/','/photography/','/about/','/tech/reproducible-data-workflows/','/essays/why-an-engineering-lab/'];
const heading='.page-heading,.article-heading';
const layout=page=>page.locator(heading).first().evaluate(el=>{const box=e=>{const r=e.getBoundingClientRect();return {x:r.x,y:r.y,w:r.width,h:r.height}};return {heading:box(el),h1:box(el.querySelector('h1')),next:box(el.nextElementSibling)};});
async function clearText(page){return page.locator(heading).first().evaluate(el=>{
  const canvas=el.querySelector('canvas'),ctx=canvas.getContext('2d'),box=canvas.getBoundingClientRect(),scale=canvas.width/box.width;
  let covered=0,ink=0;const all=ctx.getImageData(0,0,canvas.width,canvas.height).data;for(let i=3;i<all.length;i+=4)if(all[i]>32)ink++;
  for(const text of el.querySelectorAll('h1,p,.metadata,.tag-list a')){const range=document.createRange();range.selectNodeContents(text);for(const r of range.getClientRects()){
    const x=Math.max(0,Math.ceil((r.left-box.left+2)*scale)),y=Math.max(0,Math.ceil((r.top-box.top+2)*scale));
    const w=Math.min(canvas.width-x,Math.floor((r.width-4)*scale)),h=Math.min(canvas.height-y,Math.floor((r.height-4)*scale));if(w<=0||h<=0)continue;
    const d=ctx.getImageData(x,y,w,h).data;for(let i=3;i<d.length;i+=4)if(d[i]>0)covered++;
  }}return {covered,ink};
});}
for(const url of routes)test('existing title space contains a shared wave without moving content: '+url,async({page})=>{
  await page.emulateMedia({reducedMotion:'reduce'});
  for(const lang of ['en','zh']){
    await page.goto(url);if(await page.locator('html').getAttribute('lang')!==lang)await page.locator('#language-toggle').click();
    const title=page.locator(heading).first(),layer=title.locator(':scope>.hero-wave');await expect(layer).toHaveAttribute('data-wave-context','heading');
    await expect(layer).toHaveClass(/is-ready/);await expect(layer).toHaveCSS('pointer-events','none');
    await expect(page.locator('script[src*="/hero-wave.mjs"]')).toHaveCount(1);
    const field=await layer.boundingBox(),region=await title.boundingBox();expect(Math.abs(field.height-region.height)).toBeLessThan(1);
    const readable=await clearText(page);expect(readable.covered).toBe(0);expect(readable.ink).toBeGreaterThan(40);
    const decorated=await layout(page);await layer.evaluate(el=>el.remove());await page.locator('link[href*="/dot-wave.css"]').evaluate(el=>{el.disabled=true;});
    const plain=await layout(page);for(const key of ['heading','h1','next'])for(const dim of ['x','y','w','h'])expect(Math.abs(decorated[key][dim]-plain[key][dim])).toBeLessThan(.1);
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
  }
});
test('gusts still leave article title dates and tags clear and links clickable',async({page})=>{
  await page.clock.install();await page.goto('/tech/reproducible-data-workflows/');await expect(page.locator('.article-heading>.hero-wave')).toHaveClass(/is-ready/);
  await page.clock.runFor(3000);expect((await clearText(page)).covered).toBe(0);
  const link=page.locator('.article-heading .tag-list a').first(),href=await link.getAttribute('href');await link.focus();await expect(link).toHaveCSS('outline-style','solid');await link.click();await expect(page).toHaveURL(new URL(href,'http://127.0.0.1:4173').href);
});

test('heading fallback stays static and decorative without Canvas or JavaScript',async({page,browser})=>{
  await page.addInitScript(()=>HTMLCanvasElement.prototype.getContext=()=>null);await page.goto('/tech/?wave-debug=1');
  await expect(page.locator('.page-heading>.hero-wave svg')).toBeVisible();await expect(page.locator('.page-heading>.hero-wave canvas')).toBeHidden();
  await expect(page.locator('#wave-debug output')).toContainText('SVG fallback');
  const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});const plain=await context.newPage();await plain.goto('http://127.0.0.1:4173/about/');
  await expect(plain.locator('.page-heading>.hero-wave svg')).toBeVisible();expect(await plain.locator('.page-heading').evaluate(el=>getComputedStyle(el).paddingTop)).toBe('36px');await context.close();
});
