import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
const source=path.resolve(process.argv[2]||'originals');
const output='assets/photography';await fs.mkdir(output+'/thumbs',{recursive:true});
const supported=/\.(jpe?g|png|tiff?|webp|avif)$/i;
const ids=new Set();const metadata=[];
for(const name of (await fs.readdir(source)).sort()){
if(!supported.test(name))continue;
const id=path.basename(name,path.extname(name)).toLowerCase().replace(/[^a-z0-9_-]+/g,'-');
if(!id||ids.has(id))throw new Error('Duplicate or empty image ID: '+name);ids.add(id);
const input=path.join(source,name);
// rotate() honors orientation; default output strips EXIF, including GPS.
const full=await sharp(input).rotate().resize({width:2000,height:2000,fit:'inside',withoutEnlargement:true}).webp({quality:85}).toFile(output+'/'+id+'.webp');
const sizes=[480,960].filter(w=>w<full.width);const srcset=[];
for(const width of sizes){const target=width===480?output+'/thumbs/'+id+'.webp':output+'/'+id+'-'+width+'.webp';await sharp(input).rotate().resize({width,withoutEnlargement:true}).webp({quality:width===480?78:83}).toFile(target);srcset.push({src:'/'+target,width});}
if(!sizes.includes(480))await sharp(input).rotate().resize({width:480,withoutEnlargement:true}).webp({quality:78}).toFile(output+'/thumbs/'+id+'.webp');
srcset.push({src:'/'+output+'/'+id+'.webp',width:full.width});
metadata.push({id,image:'/'+output+'/'+id+'.webp',thumbnail:'/'+output+'/thumbs/'+id+'.webp',width:full.width,height:full.height,srcset,title:{en:'[Title]',zh:'[标题]'},description:{en:'',zh:''},alt:{en:'[Describe the image]',zh:'[描述画面]'},date:null,category:'other',tags:[]});
}
await fs.writeFile('photography-import.json',JSON.stringify(metadata,null,2));console.log('Processed '+metadata.length+' photos. Merge photography-import.json into _data/photography.yml. Dates remain null until supplied; originals stay private.');
