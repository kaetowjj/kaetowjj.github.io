// Share the entry's build version with its dependency, avoiding mixed cached generations.
const version=new URL(import.meta.url).search;
const {createTerrain, createHeadingTerrain, prepareWind, sampleWind, paintTime, smooth, WAVE_DEFAULTS}=await import(new URL('./hero-wave-core.mjs'+version,import.meta.url));

const layers=[...document.querySelectorAll('.hero-wave')];
if (layers.length) {
  const local=['localhost','127.0.0.1','[::1]'].includes(location.hostname);
  const debug=local&&new URLSearchParams(location.search).get('wave-debug')==='1'
    ? (await import(new URL('./hero-wave-debug.mjs'+version,import.meta.url))).createDebug(import.meta.url,WAVE_DEFAULTS) : null;
  layers.forEach((layer,index)=>start(layer,index===0?debug:null));
}

function start(layer, debug) {
  const options=debug?.settings||{...WAVE_DEFAULTS};
  const hero=layer.parentElement,heading=layer.dataset.waveContext==='heading',main=hero.closest('main');
  function measure() {
    const box=hero.getBoundingClientRect();let width=box.width;
    if(heading&&main){const r=main.getBoundingClientRect();width=Math.max(width,r.right-parseFloat(getComputedStyle(main).paddingRight)-box.left);}
    layer.style.width=width+'px';
    return {left:box.left,top:box.top,width,height:box.height};
  }
  function observeSize(update) {
    const observer=new ResizeObserver(update);observer.observe(hero);if(heading&&main)observer.observe(main);
    document.addEventListener('languagechange',update);document.fonts?.ready.then(update);
  }
  function copyRects(box,mobile) {
    const copy=[];
    if(!heading){
      for(const el of [...hero.children].filter(el=>el!==layer)){
        let r=el.getBoundingClientRect();if(el.tagName==='H1'){const range=document.createRange();range.selectNodeContents(el);r=range.getBoundingClientRect();}
        copy.push({left:r.left-box.left,right:r.right-box.left,top:r.top-box.top,bottom:r.bottom-box.top});
      }
    }else{
      // Per-line bounds leave genuine whitespace free, including beside wrapped titles.
      const walker=document.createTreeWalker(hero,NodeFilter.SHOW_TEXT);
      while(walker.nextNode()){
        const node=walker.currentNode;if(!node.textContent.trim()||layer.contains(node))continue;
        const range=document.createRange();range.selectNodeContents(node);
        for(const r of range.getClientRects())if(r.width&&r.height)copy.push({left:r.left-box.left-8,right:r.right-box.left+8,top:r.top-box.top-(mobile?18:20),bottom:r.bottom-box.top+(mobile?18:20)});
      }
      for(const el of hero.querySelectorAll('a,button,select,input'))for(const r of el.getClientRects())if(r.width&&r.height)copy.push({left:r.left-box.left-8,right:r.right-box.left+8,top:r.top-box.top-18,bottom:r.bottom-box.top+18});
    }
    return copy;
  }
  const canvas=layer.querySelector('canvas');let ctx;
  try{ctx=canvas.getContext('2d');}catch{}
  if(!ctx){
    const svg=layer.querySelector('svg'),group=svg.querySelector('g'),ns='http://www.w3.org/2000/svg';
    const defs=document.createElementNS(ns,'defs'),mask=document.createElementNS(ns,'mask');
    mask.id='wave-copy-mask-'+layers.indexOf(layer);mask.setAttribute('maskUnits','userSpaceOnUse');
    mask.setAttribute('x','0');mask.setAttribute('y','0');mask.setAttribute('width','1040');mask.setAttribute('height','400');
    defs.append(mask);svg.prepend(defs);group.setAttribute('mask','url(#'+mask.id+')');
    const updateFallback=()=>{
      const box=measure(),matrix=svg.getScreenCTM();if(!matrix)return;
      const inverse=matrix.inverse();mask.replaceChildren();
      const add=(x,y,w,h,color)=>{const rect=document.createElementNS(ns,'rect');for(const [key,value] of Object.entries({x,y,width:w,height:h,fill:color}))rect.setAttribute(key,value);mask.append(rect);};
      add(0,0,1040,400,'white');
      for(const r of copyRects(box,box.width<600)){
        const a=new DOMPoint(box.left+r.left,box.top+r.top).matrixTransform(inverse),b=new DOMPoint(box.left+r.right,box.top+r.bottom).matrixTransform(inverse);
        add(a.x,a.y,b.x-a.x,b.y-a.y,'black');
      }
    };
    updateFallback();observeSize(updateFallback);debug?.update({renderer:'SVG fallback',reason:'Canvas unavailable'});return;
  }
  const root = document.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let width=0, height=0, mobile=false, points=[], palette=[], frame=0;
  let visible=false, time=0, previous=0, lastPaint=0;
  let frames=0, measuredFrames=0, fps=0, measuredAt=0;
  const colors = 64, shades = new Array(colors), flow={};

  function readPalette() {
    const style = getComputedStyle(layer);
    palette = ['--wave-shadow','--wave-mid','--wave-light'].map(key=>style.getPropertyValue(key).trim().split(/\s+/).map(Number));
    for (let i=0;i<colors;i++) {
      const amount=i/(colors-1), half=amount<.5?0:1, mix=(amount-half*.5)*2;
      shades[i]='rgb('+palette[half].map((v,c)=>Math.round(v+(palette[half+1][c]-v)*mix)).join(',')+')';
    }
  }
  function resize() {
    const box=measure();
    width=box.width; height=box.height; mobile=width<600;
    const dpr=Math.min(devicePixelRatio||1,mobile?1.5:2);
    canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);
    ctx.setTransform(dpr,0,0,dpr,0,0);
    // Protect the actual copy/CTA boxes; language and font changes can alter their height.
    const copy=copyRects(box,mobile);
    points=heading?createHeadingTerrain(width,height,mobile):createTerrain(width,height,mobile);
    for (const p of points) {
      const edges=smooth(0,32,p.x)*smooth(0,32,width-p.x)*smooth(0,heading?16:24,p.y)*smooth(0,heading?16:28,height-p.y);
      let alpha=heading?edges*smooth(.12,.74,p.u)*(.42+.58*smooth(0,.8,p.y/height)):edges*(mobile?smooth(.56,.88,p.v):smooth(.26,.8,p.u)*smooth(.02,.5,p.v));
      for (const r of copy) {
        const dx=Math.max(r.left-p.x,0,p.x-r.right),dy=Math.max(r.top-p.y,0,p.y-r.bottom);
        alpha*=smooth(0,heading?(mobile?18:32):(mobile?22:46),Math.hypot(dx,dy));
      }
      p.alpha=alpha;
      p.bend=.065*Math.sin(p.v*4+p.u*2);p.breezeA=p.u*8+p.v*4;p.breezeB=p.v*9-p.u*3;p.lightPhase=p.u*4+p.v*2;
    }
    points=points.filter(p=>p.alpha>=.004);
    readPalette();paint();layer.classList.add('is-ready');
  }
  function paint() {
    prepareWind(time,options.mode,flow);
    ctx.clearRect(0,0,width,height);
    for (const p of points) {
      const wind=sampleWind(p,flow)*options.strength;
      const light=Math.max(0,Math.min(1,p.light*.78+wind*.55+.12*Math.sin(flow.lightPhase+p.lightPhase)));
      ctx.fillStyle=shades[Math.round(light*(colors-1))];
      ctx.globalAlpha=p.alpha*(.48+light*.42);
      ctx.beginPath();ctx.arc(p.x+wind*(mobile?1.6:2),p.y+wind*(mobile?4.5:5.5),p.radius,0,Math.PI*2);ctx.fill();
    }
    ctx.globalAlpha=1;
    if(debug)frames++;
  }
  function tick(now) {
    frame=0;
    if (previous) time+=Math.min((now-previous)/1000,.1)*options.speed;
    previous=now;
    const deadline=paintTime(now,lastPaint,mobile?1000/24:1000/30);
    if(deadline!==lastPaint){paint();lastPaint=deadline;}
    if(debug&&now-measuredAt>=1000){fps=(frames-measuredFrames)*1000/(now-measuredAt);measuredFrames=frames;measuredAt=now;report();}
    frame=requestAnimationFrame(tick);
  }
  function report() {
    const reason=reduced.matches?'paused: reduced-motion':document.hidden?'paused: hidden tab':!visible?'paused: offscreen':options.mode==='static'?'paused: static':'running';
    debug?.update({renderer:'Canvas',reason,fps:reason==='running'?fps:0,time,frames});
  }
  function sync() {
    const animate=visible&&!document.hidden&&!reduced.matches&&options.mode!=='static';
    if (!animate) {cancelAnimationFrame(frame);frame=0;previous=0;}
    else if (!frame) {previous=0;measuredAt=performance.now();measuredFrames=frames;frame=requestAnimationFrame(tick);}
    report();
  }
  observeSize(resize);
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync();}).observe(hero);
  new MutationObserver(()=>{readPalette();paint();}).observe(root,{attributes:true,attributeFilter:['data-theme']});
  document.addEventListener('visibilitychange',sync);
  // Preserve the current static frame, including when the preference changes at runtime.
  reduced.addEventListener('change',sync);
  addEventListener('pagehide',()=>{cancelAnimationFrame(frame);frame=0;previous=0;});
  addEventListener('pageshow',sync);
  debug?.onChange(replay=>{if(replay)time=0;paint();sync();});
  resize();
}
