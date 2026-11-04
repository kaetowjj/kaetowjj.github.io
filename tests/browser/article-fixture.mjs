import fs from 'node:fs/promises';
export async function routeArticle(page){
  const html=await fs.readFile('.jekyll-cache/browser-fixtures/article.html','utf8');
  await page.route('**/__test_article__/**',route=>route.fulfill({status:200,contentType:'text/html',body:html}));
}
