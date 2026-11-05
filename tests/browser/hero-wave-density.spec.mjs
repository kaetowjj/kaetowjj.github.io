import {test,expect} from '@playwright/test';

test('local defaults match the published Double gust strength and speed',async({page})=>{
  await page.goto('/?wave-debug=1');
  await expect(page.locator('#wave-debug select')).toHaveValue('double');
  await expect(page.locator('#wave-debug input[name="strength"]')).toHaveValue('2');
  await expect(page.locator('#wave-debug input[name="speed"]')).toHaveValue('1.5');
  await expect(page.locator('#wave-debug [data-strength]')).toHaveText('2×');
  await expect(page.locator('#wave-debug [data-speed]')).toHaveText('1.5×');
});

test('static Light and Dark keep exactly the same dot positions',async({page})=>{
  await page.addInitScript(()=>{window.dotPositions=[];const clear=CanvasRenderingContext2D.prototype.clearRect,arc=CanvasRenderingContext2D.prototype.arc;CanvasRenderingContext2D.prototype.clearRect=function(...args){window.dotPositions=[];return clear.apply(this,args)};CanvasRenderingContext2D.prototype.arc=function(x,y,r,...args){window.dotPositions.push([x,y,r]);return arc.call(this,x,y,r,...args)}});
  await page.goto('/?wave-debug=1');await page.locator('#wave-debug select').selectOption('static');
  const before=await page.evaluate(()=>window.dotPositions);await page.locator('#theme-toggle').click();await page.locator('#theme-toggle').click();await expect(page.locator('html')).toHaveAttribute('data-theme','dark');
  const after=await page.evaluate(()=>window.dotPositions);expect(after).toEqual(before);
});
