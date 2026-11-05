import {test,expect} from '@playwright/test';
const pixels=page=>page.locator('.hero-wave canvas').evaluate(c=>{const s=c.toDataURL();let h=2166136261;for(let i=0;i<s.length;i++)h=Math.imul(h^s.charCodeAt(i),16777619);return (h>>>0).toString(16);});
async function changed(page,before){await expect.poll(()=>pixels(page)).not.toBe(before);}

test('Hero dots are decorative, responsive and follow light/dark/system without changing content',async({page})=>{
  await page.emulateMedia({reducedMotion:'reduce',colorScheme:'light'});await page.goto('/');
  const layer=page.locator('.hero-wave'),canvas=layer.locator('canvas');
  await expect(layer).toHaveAttribute('aria-hidden','true');await expect(canvas).toBeVisible();
  await expect(layer).toHaveCSS('pointer-events','none');await expect(layer.locator('svg')).toBeHidden();
  expect(await canvas.evaluate(c=>c.width<=c.clientWidth*2&&c.height<=c.clientHeight*2)).toBe(true);
  const first=await pixels(page);expect(await canvas.evaluate(c=>c.toDataURL().length)).toBeGreaterThan(5000);
  await page.waitForTimeout(350);expect(await pixels(page)).toBe(first);
  await page.locator('#theme-toggle').click();await page.locator('#theme-toggle').click();
  await expect(page.locator('html')).toHaveAttribute('data-theme','dark');await changed(page,first);
  const dark=await pixels(page);await page.locator('#theme-toggle').click();
  await expect(page.locator('html')).toHaveAttribute('data-mode','system');await changed(page,dark);
  await page.emulateMedia({colorScheme:'dark'});await changed(page,first);
  await page.locator('#language-toggle').click();await expect(page.locator('.hero-intro [data-lang="zh"]')).toBeVisible();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
  await page.locator('.hero>a').click();await expect(page).toHaveURL('http://127.0.0.1:4173/about/');await expect(page.locator('.hero-personal .hero-wave')).toHaveCount(0);await expect(page.locator('.page-heading>.hero-wave')).toHaveCount(1);
});

test('animation pauses offscreen and for reduced motion, resumes without resetting terrain',async({page})=>{
  await page.goto('/');await expect(page.locator('.hero-wave canvas')).toBeVisible();
  const initial=await pixels(page);await changed(page,initial);
  await page.emulateMedia({reducedMotion:'reduce'});await page.waitForTimeout(150);
  const still=await pixels(page);await page.waitForTimeout(350);expect(await pixels(page)).toBe(still);
  await page.emulateMedia({reducedMotion:'no-preference'});await changed(page,still);
  await page.setViewportSize({...page.viewportSize(),height:350});await page.locator('footer').scrollIntoViewIfNeeded();await page.waitForTimeout(180);
  const offscreen=await pixels(page);await page.waitForTimeout(350);expect(await pixels(page)).toBe(offscreen);
  await page.evaluate(()=>scrollTo(0,0));await changed(page,offscreen);
});

test('background tab stops painting and resumes when visible',async({page})=>{
  await page.addInitScript(()=>{window.testHidden=false;Object.defineProperty(document,'hidden',{get:()=>window.testHidden});});
  await page.goto('/');await expect(page.locator('.hero-wave canvas')).toBeVisible();
  await page.evaluate(()=>{window.testHidden=true;document.dispatchEvent(new Event('visibilitychange'));});
  await page.waitForTimeout(100);const hidden=await pixels(page);await page.waitForTimeout(350);expect(await pixels(page)).toBe(hidden);
  await page.evaluate(()=>{window.testHidden=false;document.dispatchEvent(new Event('visibilitychange'));});await changed(page,hidden);
});

test('unavailable Canvas leaves a static dotted fallback and the native About link',async({page})=>{
  await page.addInitScript(()=>{HTMLCanvasElement.prototype.getContext=()=>null;});await page.goto('/');
  await expect(page.locator('.hero-wave svg')).toBeVisible();await expect(page.locator('.hero-wave canvas')).toBeHidden();
  await page.locator('.hero>a').click();await expect(page).toHaveURL('http://127.0.0.1:4173/about/');
});

test('static dots use warm/silver palettes and leave the readable intro clear after resize',async({page})=>{
  await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/');
  async function ink(){return page.locator('.hero-wave canvas').evaluate(c=>{
    const ctx=c.getContext('2d'),d=ctx.getImageData(0,0,c.width,c.height).data;
    let r=0,g=0,b=0,n=0;for(let i=0;i<d.length;i+=4)if(d[i+3]>30){r+=d[i];g+=d[i+1];b+=d[i+2];n++;}
    const copy=document.querySelector('.hero-intro').getBoundingClientRect(),box=c.getBoundingClientRect(),scale=c.width/box.width;
    const protectedPixels=ctx.getImageData(Math.round((copy.left-box.left+8)*scale),Math.round((copy.top-box.top+8)*scale),Math.max(1,Math.round((copy.width-16)*scale)),Math.max(1,Math.round((copy.height-16)*scale))).data;
    return {r:r/n,g:g/n,b:b/n,n,covered:Array.from(protectedPixels).filter((v,i)=>i%4===3&&v>0).length};
  });}
  const light=await ink();expect(light.n).toBeGreaterThan(50);expect(light.r).toBeGreaterThan(light.g);expect(light.g).toBeGreaterThan(light.b);expect(light.covered).toBe(0);
  await page.locator('#theme-toggle').click();await page.locator('#theme-toggle').click();
  await expect.poll(async()=>{const dark=await ink();return dark.g>dark.r&&dark.g>dark.b;}).toBe(true);
  await page.setViewportSize({width:430,height:850});await expect.poll(async()=>page.locator('.hero-wave canvas').evaluate(c=>Math.abs(c.clientWidth-386))).toBeLessThan(2);
  await page.waitForTimeout(150);expect((await ink()).covered).toBe(0);
});

test('JavaScript disabled still shows static contour decoration',async({browser})=>{
  const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
  const page=await context.newPage();await page.goto('http://127.0.0.1:4173/');
  await expect(page.locator('.hero-wave svg')).toBeVisible();await expect(page.locator('.hero-wave canvas')).toBeHidden();
  await expect(page.locator('.hero>a')).toHaveAttribute('href','/about/');await context.close();
});
