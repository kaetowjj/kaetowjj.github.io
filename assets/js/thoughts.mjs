import './site.mjs';
import {normalizeQuotes,footerQuotes,pickQuote,safeSourceURL} from './thoughts-core.mjs';
let quotes=[];try{quotes=normalizeQuotes(JSON.parse(document.querySelector('#quotes-data')?.textContent||'[]'))}catch{}
const footer=document.querySelector('[data-thought="footer"]'),pool=footerQuotes(quotes),quote=pickQuote(pool);
function fill(content,quote){const text=content.querySelector('.thought-text');text.textContent=quote.text;text.lang=quote.lang;const author=content.querySelector('.thought-author');author.textContent=typeof quote.author==='string'?quote.author:'';author.hidden=!author.textContent;const link=content.querySelector('.thought-source');const url=safeSourceURL(quote.source_url);link.hidden=!url;link.removeAttribute('href');if(url){link.href=url;const arrow=link.querySelector('.link-arrow');link.textContent=(document.documentElement.lang==='zh'?'来源':'Source')+' · '+(typeof quote.source_type==='string'?quote.source_type:'link');if(arrow)link.append(arrow);}}
function reserve(section,pool){if(!section||section.hidden)return;const content=section.querySelector('.thought-content');const measure=content.cloneNode(true);measure.removeAttribute('aria-live');measure.setAttribute('aria-hidden','true');measure.inert=true;Object.assign(measure.style,{position:'absolute',visibility:'hidden',pointerEvents:'none',width:content.clientWidth+'px',minHeight:'0',height:'auto'});section.append(measure);let height=0;for(const q of pool){fill(measure,q);height=Math.max(height,measure.getBoundingClientRect().height)}measure.remove();content.style.minHeight=Math.ceil(height)+'px';}
if(footer){
  footer.hidden=!quote;
  if(quote){
    const render=()=>{footer.dataset.quoteId=quote.id;fill(footer.querySelector('.thought-content'),quote);reserve(footer,pool);};
    render();
    document.addEventListener('languagechange',render);
    let width=0;new ResizeObserver(entries=>{const next=entries[0].contentRect.width;if(next!==width){width=next;reserve(footer,pool)}}).observe(footer);
  }
}
