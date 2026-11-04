import {test,expect} from '@playwright/test';
import {execFileSync} from 'node:child_process';
const profile=JSON.parse(execFileSync('ruby',['-ryaml','-rjson','-e',"puts YAML.safe_load(File.read('_data/profile.yml')).to_json"],{encoding:'utf8'}));
const contacts=[['github',profile.github],['linkedin',profile.linkedin],['email',profile.email?'mailto:'+profile.email:'']].filter(([,url])=>url);
const center=box=>box.x+box.width/2;

async function socialLayout(page){
  const footer=page.locator('.site-footer'),links=footer.locator('.footer-social-link');
  await expect(links).toHaveCount(contacts.length);
  const boxes=[];
  for(let i=0;i<contacts.length;i++){
    const [name,url]=contacts[i],link=links.nth(i);
    await expect(link).toHaveAttribute('href',url);await expect(link).toHaveAttribute('aria-label',new RegExp(name,'i'));
    if(name==='email')await expect(link).not.toHaveAttribute('target',/.+/);
    else{await expect(link).toHaveAttribute('target','_blank');await expect(link).toHaveAttribute('rel','noopener noreferrer');}
    const svg=link.locator('svg');await expect(svg).toHaveCount(1);await expect(svg).toHaveAttribute('aria-hidden','true');await expect(svg).toHaveAttribute('focusable','false');
    const style=await svg.evaluate(el=>{const s=getComputedStyle(el);return {color:s.color,fill:s.fill,stroke:s.stroke,width:parseFloat(s.width),height:parseFloat(s.height),linkColor:getComputedStyle(el.parentElement).color}});
    expect(style.fill==='none'?style.stroke:style.fill).toBe(style.linkColor);expect(style.width).toBe(style.height);
    const box=await link.boundingBox();expect(box.width).toBeGreaterThanOrEqual(44);expect(box.height).toBeGreaterThanOrEqual(44);await expect(link).toHaveCSS('border-radius','50%');boxes.push(box);
  }
  if(boxes.length){expect(new Set(boxes.map(b=>b.y)).size).toBe(1);const row=await footer.locator('.footer-social').boundingBox();expect(Math.abs(center(row)-page.viewportSize().width/2)).toBeLessThan(2);}
  const copyright=footer.locator('.footer-copyright');await expect(copyright).toHaveText('© '+new Date().getFullYear()+' '+await page.locator('meta[property="og:site_name"]').getAttribute('content'));
  expect((await copyright.boundingBox()).y).toBeGreaterThan((await footer.locator('.footer-social').boundingBox()).y);
  await expect(footer).toHaveCSS('text-align','center');await expect(footer).toHaveCSS('border-top-width','0px');
  const quote=footer.locator('[data-thought="footer"]');
  if(await quote.isVisible()){await expect(quote).toHaveCSS('border-top-width','0px');await expect(quote.locator('.thought-heading')).toHaveCSS('justify-content','center');await expect(quote.locator('.thought-credit')).toHaveCSS('justify-content','center');expect((await quote.boundingBox()).y).toBeGreaterThan((await copyright.boundingBox()).y);expect(parseFloat(await quote.locator('.thought-text').evaluate(el=>getComputedStyle(el).fontSize))).toBeLessThanOrEqual(14);}
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
}

test('all pages share centered SVG contacts, automatic copyright and borderless footer',async({page},info)=>{
  for(const route of ['/','/tech/','/essays/','/photography/','/about/']){await page.goto(route);await socialLayout(page);}
  for(const [name,url] of contacts.filter(([name])=>name!=='email')){
    await page.context().route(url,route=>route.fulfill({status:200,body:'TEST ONLY: external destination'}));
    const link=page.locator('.footer-social-link[href="'+url+'"]');
    const popupPromise=page.waitForEvent('popup');if(info.project.name==='mobile')await link.locator('svg').tap();else await link.locator('svg').click();const popup=await popupPromise;await expect(popup).toHaveURL(url);await popup.close();
  }
  await page.goto('/');await expect(page.locator('.thought-home')).toHaveCSS('border-bottom-width','0px');await expect(page.locator('.site-header')).toHaveCSS('border-bottom-width','1px');
  await page.goto('/photography/');await expect(page.locator('.gallery-controls')).toHaveCSS('border-top-width','1px');
});

test('social icons use theme hover, visible keyboard focus and reduced motion',async({page},info)=>{
  await page.goto('/about/');
  for(const [mode,color] of [['light','rgb(180, 83, 9)'],['dark','rgb(167, 215, 164)']]){
    for(let i=0;i<3&&await page.locator('html').getAttribute('data-mode')!==mode;i++)await page.locator('#theme-toggle').click();
    for(const link of await page.locator('.footer-social-link').all()){
      if(info.project.name==='desktop'){await link.hover();await expect(link).toHaveCSS('color',color);}
      await page.keyboard.press('Tab');await link.focus();await expect(link).toHaveCSS('outline-style','solid');await expect(link).toHaveCSS('outline-width','2px');await expect(link).toHaveCSS('color',color);await expect(link).toHaveCSS('transform','none');
    }
    await page.locator('#language-toggle').click();await socialLayout(page);
  }
  await page.emulateMedia({reducedMotion:'reduce'});for(const link of await page.locator('.footer-social-link').all())await expect(link).toHaveCSS('transition-duration','0s');
});

test('Home and footer preserve random selection, sources and stable shuffle layout',async({page})=>{
  const records=[{id:'test-short',text:'TEST ONLY: 中文短句',lang:'zh',placement:'both',source_type:'test_fixture',source_url:'https://example.com/a'},{id:'test-long',text:'TEST ONLY: A longer original sentence used to verify reserved space and natural wrapping across narrow screens without changing the real curated collection.',lang:'en',placement:'both',source_type:'test_fixture',source_url:'https://example.com/b'}];
  await page.route('http://127.0.0.1:4173/',async route=>{const response=await route.fetch();const body=(await response.text()).replace(/(<script type="application\/json" id="quotes-data">)[\s\S]*?(<\/script>)/,(_,a,b)=>a+JSON.stringify(records)+b);await route.fulfill({response,body});});
  await page.goto('/');const home=page.locator('[data-thought="home"]'),footer=page.locator('[data-thought="footer"]');await expect(home).toBeVisible();await expect(footer).toBeVisible();
  await socialLayout(page);await expect(home).toHaveCSS('border-bottom-width','0px');const initialHome=await home.boundingBox(),initialFooter=await footer.boundingBox();
  for(let i=0;i<4;i++){const id=await home.getAttribute('data-quote-id');await home.locator('.thought-shuffle').click();await expect(home).not.toHaveAttribute('data-quote-id',id);expect(await home.getAttribute('data-quote-id')).not.toBe(await footer.getAttribute('data-quote-id'));expect((await home.boundingBox()).height).toBe(initialHome.height);expect((await footer.boundingBox()).height).toBe(initialFooter.height);}
  for(const section of [home,footer]){const id=await section.getAttribute('data-quote-id');const q=records.find(q=>q.id===id);await expect(section.locator('.thought-text')).toHaveText(q.text);await expect(section.locator('.thought-source')).toHaveAttribute('href',q.source_url);}
  const footerID=await footer.getAttribute('data-quote-id');await page.locator('#language-toggle').click();await expect(footer).toHaveAttribute('data-quote-id',footerID);await socialLayout(page);
});
