import test from 'node:test';
import assert from 'node:assert/strict';
import {createTerrain, windAt} from '../assets/js/hero-wave-core.mjs';

test('terrain is deterministic, curved and sampled at even distances within a bounded point budget',()=>{
  for(const [width,height,mobile] of [[1040,390,false],[346,500,true]]){
    const a=createTerrain(width,height,mobile),b=createTerrain(width,height,mobile);
    assert.deepEqual(a,b);
    assert.ok(a.length>200&&a.length<=(mobile?2000:5250));
    let pairs=0,curved=0;
    for(let i=1;i<a.length;i++)if(a[i].row===a[i-1].row){
      const d=Math.hypot(a[i].x-a[i-1].x,a[i].y-a[i-1].y);
      assert.ok(d>=a[i].spacing*.94&&d<=a[i].spacing*1.06, 'arc spacing '+d);
      pairs++;if(Math.abs(a[i].y-a[i-1].y)>1)curved++;
    }
    assert.ok(pairs>200&&curved>pairs*.15,'terrain must visibly rise and fall');
    assert.ok(a.every(p=>Number.isFinite(p.x+p.y+p.light)&&p.radius>0));
  }
});

test('wind has local travelling double gusts, calm intervals and continuous bounded displacement',()=>{
  let max=0,peak=0,calm=0;
  for(let t=0;t<52;t+=.025){
    const w=windAt(.65,.5,t);assert.ok(Number.isFinite(w));max=Math.max(max,Math.abs(w));
    assert.ok(Math.abs(w-windAt(.65,.5,t+.001))<.01,'no loop/reset jump');
    calm=Math.max(calm,Math.abs(windAt(.65,.5,t,'breeze')));peak=Math.max(peak,Math.abs(w));
  }
  assert.ok(max<1.6&&peak>calm+ .5);
  const strengths=Array.from({length:240},(_,i)=>windAt(.65,.5,3+i*.1));
  const peaks=strengths.filter((v,i)=>i>0&&i<239&&v>strengths[i-1]&&v>strengths[i+1]&&v>.55);
  assert.ok(peaks.length>=2,'two sequential gusts');
  assert.notEqual(windAt(.1,.5,8),windAt(.9,.5,8),'wind does not shift the entire field equally');
});

test('very wide and tall viewports still respect the decoration point budget',()=>{
  for(const [w,h,mobile] of [[6000,100,false],[320,1600,true],[720,1600,false]]){
    const points=createTerrain(w,h,mobile);assert.ok(points.length<=(mobile?2000:5250));
  }
  assert.deepEqual(createTerrain(0,100),[]);
});

test('an early local crest reaches the visible right side and a second follows it',()=>{
  assert.ok(windAt(.65,.5,3.5,'single')>.6);
  assert.ok(windAt(.65,.5,7,'double')-windAt(.65,.5,7,'single')>.45);
  const peak=u=>{let t=0,value=-Infinity;for(let s=1;s<6;s+=.02){const w=windAt(u,.5,s,'single');if(w>value){value=w;t=s;}}return t;};
  assert.ok(peak(.85)>peak(.45)+1,'crest travels across the field instead of shifting it all together');
  assert.equal(windAt(.65,.5,3.5,'static'),0);
  assert.ok(Math.abs(windAt(.65,.5,3.5,'breeze'))<.3);
});
