import { chromium } from 'playwright';
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
const sites=[
 ['printgridpaper','https://printgridpaper.com/'],
 ['recorder-chart','https://recorder-chart.com/'],
 ['super-pokemon-team-builder','https://superpokemonteambuilder.com/'],
 ['genshin-damage-calculator','https://www.genshindamagecalculator.com/'],
 ['proivf','https://www.proivf.com/']
];
await mkdir('public/screenshots',{recursive:true});
const browser=await chromium.launch({headless:true});
let failed=0;
for(const [name,url] of sites){
 const page=await browser.newPage({viewport:{width:1440,height:900},deviceScaleFactor:1});
 try{
  const response=await page.goto(url,{waitUntil:'domcontentloaded',timeout:30000});
  if(!response || response.status()>=400)throw new Error('HTTP '+response?.status());
  await page.waitForTimeout(2500);
  const screenshot=await page.screenshot({type:'png',animations:'disabled'});
  await sharp(screenshot).webp({quality:82}).toFile('public/screenshots/'+name+'.webp');
  console.log('Captured',name,page.url());
 }catch(e){failed++;console.error('Capture failed:',name,e.message)}
 finally{await page.close()}
}
await browser.close();
if(failed)process.exitCode=1;