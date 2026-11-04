import {test} from 'node:test';
import assert from 'node:assert/strict';
import {canonicalTags,normalizeTag,matchesTag,tagURL,resolveTag} from '../assets/js/tech-core.mjs';

test('Tags normalize case and whitespace without preregistration',()=>{
  assert.equal(normalizeTag(' Python '),'python');
  assert.deepEqual(canonicalTags(['Python','python','PYTHON',' concurrency ','',null]),['python','concurrency']);
  assert.deepEqual(canonicalTags(),[]);
  assert.deepEqual(canonicalTags([]),[]);
  assert.deepEqual(canonicalTags(['C++','中文']),['c++','中文']);
});
test('optional and multiple Tags select exact matches',()=>{
  assert.equal(matchesTag(['Python','concurrency'],'PYTHON'),true);
  assert.equal(matchesTag(['python'],'py'),false);
  assert.equal(matchesTag([],''),true);
  assert.equal(matchesTag(undefined,'unknown'),false);
});
test('shareable Tag URLs preserve other query parameters and clear only tag',()=>{
  assert.equal(tagURL('https://example.com/tech/?x=1#top',' Python '),'https://example.com/tech/?x=1&tag=python#top');
  assert.equal(tagURL('https://example.com/tech/?tag=python&x=1',''),'https://example.com/tech/?x=1');
  assert.equal(new URL(tagURL('https://example.com/tech/','C++')).searchParams.get('tag'),'c++');
});

test('query case variants resolve to build-time Unicode keys',()=>{
  assert.equal(resolveTag('ΟΣ',['οσ']),'οσ');
  assert.equal(resolveTag('ος',['οσ']),'οσ');
  assert.equal(resolveTag(' Python ',['python']),'python');
  assert.equal(resolveTag('Straße',['strasse']),'strasse');
});
