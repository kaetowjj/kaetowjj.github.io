import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import assert from 'node:assert/strict';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
const exec=promisify(execFile);
export default async function setup(){
  const root=process.cwd(), parent=path.resolve(os.tmpdir());
  const source=await fs.mkdtemp(path.join(parent,'engineering-lab-browser-'));
  try {
    for(const name of ['_includes','_layouts','_plugins','_data'])await fs.cp(path.join(root,name),path.join(source,name),{recursive:true});
    await fs.copyFile(path.join(root,'_config.yml'),path.join(source,'_config.yml'));
    for(const page of ['index.html','tech.html'])await fs.copyFile(path.join(root,page),path.join(source,page));
    await fs.mkdir(path.join(source,'_tech'));
    await fs.copyFile(path.join(root,'tests/fixtures/article.md'),path.join(source,'_tech','test-fixture.md'));
    await exec('ruby',['-S','bundle','exec','jekyll','build','--strict_front_matter','--source',source,'--destination',path.join(source,'output'),'--config',path.join(source,'_config.yml')],{cwd:root,windowsHide:true,maxBuffer:4*1024*1024});
    const html=await fs.readFile(path.join(source,'output','tech','test-fixture','index.html'),'utf8');
    assert.match(html,/<meta property="article:modified_time" content="2026-11-04T/,'missing updated must fall back to date');
    const keys=[...html.matchAll(/data-tech-tag="([^"]*)"/g)].map(m=>m[1]);
    assert.deepEqual(keys,['python','strasse','οσ'],'Ruby build must deduplicate Unicode whitespace and case pairs');
    const cache=path.join(root,'.jekyll-cache','browser-fixtures');await fs.mkdir(cache,{recursive:true});await fs.writeFile(path.join(cache,'article.html'),html);
    await fs.copyFile(path.join(source,'output','index.html'),path.join(cache,'recent-single.html'));
    const documents={'/tech/test-fixture/':html};
    await fs.unlink(path.join(source,'_tech','test-fixture.md'));await fs.rmdir(path.join(source,'_tech'));
    await exec('ruby',['-S','bundle','exec','jekyll','build','--strict_front_matter','--source',source,'--destination',path.join(source,'output'),'--config',path.join(source,'_config.yml')],{cwd:root,windowsHide:true,maxBuffer:4*1024*1024});
    const emptyArchive=await fs.readFile(path.join(source,'output','tech','index.html'),'utf8');
    assert.equal((emptyArchive.match(/class="tech-entry"/g)||[]).length,0,'missing collection directory must build an empty archive');
    assert.equal((emptyArchive.match(/data-tech-tag=/g)||[]).length,1,'empty archive retains only All');
    const emptyHome=await fs.readFile(path.join(source,'output','index.html'),'utf8');assert.ok(emptyHome.includes('Recent Posts'),'empty collection preserves Home');assert.ok(emptyHome.includes('class="recent-empty"'),'empty home has a visible empty state');
    await fs.writeFile(path.join(cache,'recent-empty.html'),emptyHome);
    const records=[{collection:'tech',name:'recent-old-tech',date:'2026-01-01',updated:'2099-01-01'},{collection:'tech',name:'recent-new-tech',date:'2026-03-03'},{collection:'essays',name:'recent-new-essay',date:'2026-04-04'},{collection:'essays',name:'recent-middle-essay',date:'2026-02-02'},{collection:'tech',name:'recent-demo-tech',date:'2026-09-09',demo:true},{collection:'essays',name:'recent-demo-essay',date:'2026-08-08',demo:true}];
    for(const record of records){const dir=path.join(source,'_'+record.collection);await fs.mkdir(dir,{recursive:true});const content='---\ntitle: "TEST ONLY: '+record.name+'"\ntitle_zh: "测试专用：'+record.name+'"\ndescription: "Fixture summary"\ndescription_zh: "测试摘要"\ndate: '+record.date+'\n'+('updated: '+(record.updated||record.date)+'\n')+(record.demo?'demo: true\n':'')+'---\nTEST ONLY: recent post fixture.\n';await fs.writeFile(path.join(dir,record.name+'.md'),content);}
    await exec('ruby',['-S','bundle','exec','jekyll','build','--strict_front_matter','--source',source,'--destination',path.join(source,'output'),'--config',path.join(source,'_config.yml')],{cwd:root,windowsHide:true,maxBuffer:4*1024*1024});
    const mixed=await fs.readFile(path.join(source,'output','index.html'),'utf8');const recentLinks=[...mixed.matchAll(/class="entry recent-post" href="([^"]+)"/g)].map(m=>m[1]);assert.deepEqual(recentLinks,['/essays/recent-new-essay/','/tech/recent-new-tech/','/essays/recent-middle-essay/'],'filter Demo before limiting to three and sort by date, never updated');
    await fs.writeFile(path.join(cache,'recent-mixed.html'),mixed);
    for(const record of records)documents['/'+record.collection+'/'+record.name+'/']=await fs.readFile(path.join(source,'output',record.collection,record.name,'index.html'),'utf8');
    await fs.writeFile(path.join(cache,'recent-documents.json'),JSON.stringify(documents));
  } finally {
    if(!path.resolve(source).startsWith(parent+path.sep))throw Error('Unsafe fixture cleanup path');
    await fs.rm(source,{recursive:true,force:true});
  }
}
