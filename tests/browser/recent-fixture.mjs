import fs from 'node:fs/promises';
export async function routeRecent(page){
  const modes={};for(const mode of ['mixed','single','empty'])modes[mode]=await fs.readFile('.jekyll-cache/browser-fixtures/recent-'+mode+'.html','utf8');
  const documents=JSON.parse(await fs.readFile('.jekyll-cache/browser-fixtures/recent-documents.json','utf8'));
  await page.route('**/*',route=>{if(route.request().resourceType()!=='document')return route.continue();const path=new URL(route.request().url()).pathname;const mode=path.startsWith('/__test_recent__/')?path.split('/')[2]:null;const html=modes[mode]||documents[path];return html?route.fulfill({status:200,contentType:'text/html',body:html}):route.continue();});
}
