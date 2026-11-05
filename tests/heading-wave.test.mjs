import test from 'node:test';
import assert from 'node:assert/strict';
import {createHeadingTerrain} from '../assets/js/hero-wave-core.mjs';
test('short heading terrain keeps full-size curved dots instead of scaling a Home canvas',()=>{
  for(const [w,h,mobile] of [[1040,196,false],[1200,269,false],[346,180,true],[346,420,true]]){
    const dots=createHeadingTerrain(w,h,mobile);assert.ok(dots.length>100&&dots.length<=(mobile?2000:5250));
    assert.ok(dots.some(p=>p.y>0&&p.y<h));assert.ok(dots.every(p=>p.radius===(mobile?1.05:1.15)));
    let pairs=0;for(let i=1;i<dots.length;i++)if(dots[i].row===dots[i-1].row){const distance=Math.hypot(dots[i].x-dots[i-1].x,dots[i].y-dots[i-1].y);assert.ok(distance>dots[i].spacing*.94&&distance<dots[i].spacing*1.06);pairs++;}assert.ok(pairs>100);
  }
  assert.deepEqual(createHeadingTerrain(0,180),[]);
});
