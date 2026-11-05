import {test,expect} from '@playwright/test';

test('visible dots respond within the first five seconds rather than only changing a few pixels',async({page})=>{
  await page.clock.install();await page.emulateMedia({reducedMotion:'no-preference'});await page.goto('/');
  await expect(page.locator('.hero-wave canvas')).toBeVisible();
  const sample=()=>page.locator('.hero-wave canvas').evaluate(c=>{
    const ctx=c.getContext('2d'),r=c.getBoundingClientRect(),s=c.width/r.width;
    return Array.from(ctx.getImageData(Math.round(r.width*.72*s),Math.round(r.height*.35*s),Math.round(r.width*.24*s),Math.round(r.height*.5*s)).data);
  });
  await page.clock.runFor(100);const a=await sample();await page.clock.runFor(4000);const b=await sample();
  let sum=0,ink=0;for(let i=0;i<a.length;i+=4)if(Math.max(a[i+3],b[i+3])>24){ink++;const aa=a[i+3]/255,ba=b[i+3]/255;sum+=Math.max(...[248,247,243].map((bg,c)=>Math.abs(a[i+c]*aa+bg*(1-aa)-b[i+c]*ba-bg*(1-ba))));}
  expect(ink).toBeGreaterThan(50);expect(sum/ink).toBeGreaterThan(30);
});

test('local debug shows state/FPS and changes motion modes without bypassing reduced motion',async({page})=>{
  await page.goto('/?wave-debug=1');const panel=page.locator('#wave-debug');
  await expect(panel).toBeVisible();await expect(panel.locator('output')).toContainText('Canvas');
  await expect.poll(async()=>Number(await panel.locator('output').getAttribute('data-fps'))).toBeGreaterThan(0);
  const mode=panel.locator('select');await mode.selectOption('static');await expect(panel.locator('output')).toContainText('static');
  const image=()=>page.locator('.hero-wave canvas').evaluate(c=>c.toDataURL().slice(-1000));
  const still=await image();await page.waitForTimeout(200);expect(await image()).toBe(still);
  for(const value of ['breeze','single','double']){await mode.selectOption(value);await expect(panel.locator('output')).toContainText('running');}
  await panel.locator('input[name="strength"]').fill('1.8');await panel.locator('input[name="speed"]').fill('1.5');
  await page.emulateMedia({reducedMotion:'reduce'});await expect(panel.locator('output')).toContainText('reduced-motion');
  await expect(panel.locator('output')).toHaveAttribute('data-fps','0');
  const reduced=await image();await page.waitForTimeout(200);expect(await image()).toBe(reduced);
});

test('debug controls never appear on a public hostname, even with the URL flag',async({page})=>{
  await page.route('http://public.test/**',async route=>{const url=new URL(route.request().url());const response=await route.fetch({url:'http://127.0.0.1:4173'+url.pathname+url.search});await route.fulfill({response});});
  const requested=[];page.on('request',r=>requested.push(r.url()));await page.goto('http://public.test/?wave-debug=1');
  await expect(page.locator('.hero-wave canvas')).toBeVisible();await expect(page.locator('#wave-debug')).toHaveCount(0);
  expect(requested.some(u=>u.includes('hero-wave-debug'))).toBe(false);
});

test('a rendered crest travels from left to right over the cached contour dots',async({page})=>{
  await page.addInitScript(()=>{
    window.drawnDots=[];const clear=CanvasRenderingContext2D.prototype.clearRect,arc=CanvasRenderingContext2D.prototype.arc;
    CanvasRenderingContext2D.prototype.clearRect=function(...a){window.drawnDots=[];return clear.apply(this,a)};
    CanvasRenderingContext2D.prototype.arc=function(x,y,...a){window.drawnDots.push([x,y,this.globalAlpha]);return arc.call(this,x,y,...a)};
  });
  await page.clock.install();await page.goto('/?wave-debug=1');const mode=page.locator('#wave-debug select');
  await page.locator('#wave-debug input[name=strength]').fill('1');await page.locator('#wave-debug input[name=speed]').fill('1');
  await mode.selectOption('static');const base=await page.evaluate(()=>window.drawnDots);const width=await page.locator('.hero-wave canvas').evaluate(c=>c.clientWidth);
  const crest=async()=>{const dots=await page.evaluate(()=>window.drawnDots);expect(dots.length).toBe(base.length);let sum=0,weight=0;for(let i=0;i<dots.length;i++){const dy=dots[i][1]-base[i][1];if(dy>2.5&&dots[i][2]>.12){sum+=base[i][0]/width*dy;weight+=dy;}}expect(weight).toBeGreaterThan(20);return sum/weight;};
  await mode.selectOption('single');await page.clock.runFor(2500);const first=await crest();
  await page.clock.runFor(2000);const second=await crest();expect(second-first).toBeGreaterThan(.15);
});

test('debug identifies the SVG fallback instead of falsely reporting a running canvas',async({page})=>{
  await page.addInitScript(()=>HTMLCanvasElement.prototype.getContext=()=>null);await page.goto('/?wave-debug=1');
  await expect(page.locator('#wave-debug output')).toContainText('SVG fallback');await expect(page.locator('#wave-debug output')).toContainText('Canvas unavailable');
  await expect(page.locator('#wave-debug select')).toBeDisabled();
});
