import sharp from 'sharp';
import fs from 'node:fs/promises';
const photos=JSON.parse(await fs.readFile('_data/photography.yml','utf8'));
const palettes=[['#bcc8b1','#364d44','#e3c891'],['#c5c9c1','#525c66','#bca28e'],['#293b43','#778881','#d3b897'],['#d5c8aa','#7d968b','#3b5a51'],['#b9a58b','#ded3bb','#67594e'],['#b4c1b5','#405b51','#d7be91'],['#33464b','#b59778','#ddcbb3'],['#a8b8b0','#5e7169','#d9ceba']];
await fs.mkdir('assets/photography/thumbs',{recursive:true});
for(const [i,p] of photos.entries()){
const [sky,land,sun]=palettes[i];const w=p.width,h=p.height;
const svg=Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" width="'+w+'" height="'+h+'" viewBox="0 0 1000 700" preserveAspectRatio="none"><rect width="1000" height="700" fill="'+sky+'"/><circle cx="740" cy="190" r="65" fill="'+sun+'"/><path d="M0 520L240 250L480 530L700 370L1000 590V700H0Z" fill="'+land+'"/><path d="M0 610L320 490L680 620L1000 500V700H0Z" fill="'+land+'" opacity=".7"/><text x="40" y="660" font-family="sans-serif" font-size="22" fill="white" opacity=".8">DEMO / ABSTRACT PLACEHOLDER / '+String(i+1).padStart(2,'0')+'</text></svg>');
for(const [suffix,width] of [['',w],['-960',Math.min(960,w)]])await sharp(svg).resize({width}).webp({quality:83}).toFile('assets/photography/demo-'+(i+1)+suffix+'.webp');
await sharp(svg).resize({width:480}).webp({quality:78}).toFile('assets/photography/thumbs/demo-'+(i+1)+'.webp');
}
console.log('Generated 8 original abstract Demo placeholders, 24 WebP assets.');
