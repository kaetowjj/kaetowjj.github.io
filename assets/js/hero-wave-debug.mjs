// Lazy-loaded only on loopback hosts with ?wave-debug=1. No public controls.
export function createDebug(source) {
  const stylesheet=document.createElement('link');stylesheet.rel='stylesheet';
  stylesheet.href=new URL('../css/hero-wave-debug.css'+new URL(source).search,import.meta.url).href;document.head.append(stylesheet);
  const panel=document.createElement('details');panel.id='wave-debug';panel.open=true;
  panel.innerHTML=`<summary>Dot Wave · local debug</summary>
    <output data-fps="0" aria-live="off">Initializing…</output>
    <label>Mode <select><option value="auto">Auto (default)</option><option value="static">Static</option><option value="breeze">Breeze</option><option value="single">Single gust</option><option value="double">Double gust</option></select></label>
    <label>Wind strength <input name="strength" type="range" min="0" max="2" step="0.1" value="1"><span data-strength>1×</span></label>
    <label>Speed <input name="speed" type="range" min="0.5" max="2" step="0.1" value="1"><span data-speed>1×</span></label>
    <button type="button">Replay from start</button><small></small>`;
  document.body.append(panel);
  panel.querySelector('small').textContent='Entry: '+source;
  const settings={mode:'auto',strength:1,speed:1};let change=()=>{};
  panel.querySelector('select').addEventListener('change',e=>{settings.mode=e.target.value;change(true);});
  for(const name of ['strength','speed'])panel.querySelector('[name="'+name+'"]').addEventListener('input',e=>{
    settings[name]=Number(e.target.value);panel.querySelector('[data-'+name+']').textContent=settings[name]+'×';change(false);
  });
  panel.querySelector('button').addEventListener('click',()=>change(true));
  return {settings,onChange(fn){change=fn;},update({renderer,reason,fps=0,time=0,frames=0}){
    const output=panel.querySelector('output');output.dataset.fps=String(Math.round(fps));
    output.textContent=renderer+' · '+reason+'\nFPS: '+Math.round(fps)+' · t: '+time.toFixed(1)+'s · frames: '+frames;
    for(const control of panel.querySelectorAll('input,select,button'))control.disabled=renderer!=='Canvas';
  }};
}
