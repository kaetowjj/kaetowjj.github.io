import test from 'node:test';
import assert from 'node:assert/strict';
import {createTerrain,windAt} from '../assets/js/hero-wave-core.mjs';

test('denser curve sampling increases field points approximately25percent at reference sizes',()=>{
  // Recorded from the prior release at the same dimensions, before this change.
  for(const [w,h,mobile,before] of [[1040,375,false,1666],[346,467,true,705]]){
    const after=createTerrain(w,h,mobile).filter(p=>p.y>=0&&p.y<=h).length;
    assert.ok(after>=before*1.2&&after<=before*1.3,'density ratio '+after+'/'+before);
  }
});

test('double gusts wrap smoothly and do not leave a long quiet gap in the visible field',()=>{
  let quiet=0,longest=0;
  for(let t=0;t<36;t+=.025){
    let gust=0;for(const u of [.65,.8,.95])for(const v of [.4,.8])gust=Math.max(gust,Math.abs(windAt(u,v,t,'double')-windAt(u,v,t,'breeze')));
    quiet=gust<.08?quiet+.025:0;longest=Math.max(longest,quiet);
  }
  assert.ok(longest<4.5,'quiet simulation seconds '+longest);
  for(const u of [.1,.5,.95])for(const v of [.1,.8])for(const boundary of [12,24,36])
    assert.ok(Math.abs(windAt(u,v,boundary-.0001,'double')-windAt(u,v,boundary+.0001,'double'))<.001);
});

test('painting keeps its target cadence despite fractional60Hz timestamps',async()=>{
  const {paintTime}=await import('../assets/js/hero-wave-core.mjs');
  for(const fps of [24,30]){let last=0,paints=0;for(let i=1;i<=120;i++){const now=i*1000/60+(i%3-1)*.15,next=paintTime(now,last,1000/fps);if(next!==last){paints++;last=next;}}
    assert.ok(Math.abs(paints-fps*2)<=1,'paint count '+paints+' at '+fps);
  }
});
