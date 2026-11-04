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
    await fs.unlink(path.join(source,'_tech','test-fixture.md'));await fs.rmdir(path.join(source,'_tech'));
    await exec('ruby',['-S','bundle','exec','jekyll','build','--strict_front_matter','--source',source,'--destination',path.join(source,'output'),'--config',path.join(source,'_config.yml')],{cwd:root,windowsHide:true,maxBuffer:4*1024*1024});
    const emptyArchive=await fs.readFile(path.join(source,'output','tech','index.html'),'utf8');
    assert.equal((emptyArchive.match(/class="tech-entry"/g)||[]).length,0,'missing collection directory must build an empty archive');
    assert.equal((emptyArchive.match(/data-tech-tag=/g)||[]).length,1,'empty archive retains only All');
    const emptyHome=await fs.readFile(path.join(source,'output','index.html'),'utf8');assert.ok(emptyHome.includes('Recent Tech Posts'),'empty collection preserves Home');
  } finally {
    if(!path.resolve(source).startsWith(parent+path.sep))throw Error('Unsafe fixture cleanup path');
    await fs.rm(source,{recursive:true,force:true});
  }
}
