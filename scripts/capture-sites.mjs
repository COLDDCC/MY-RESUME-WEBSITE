import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
const sites=[
 ['printgridpaper','https://printgridpaper.com/'],
 ['recorder-chart','https://recorder-chart.com/'],
 ['super-pokemon-team-builder','https://superpokemonteambuilder.com/'],
 ['genshin-damage-calculator','https://www.genshindamagecalculator.com/']
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
  await page.screenshot({path:'public/screenshots/'+name+'.webp',type:'webp',quality:82,animations:'disabled'});
  console.log('Captured',name,page.url());
 }catch(e){failed++;console.error('Capture failed:',name,e.message)}
 finally{await page.close()}
}
await browser.close();
if(failed)process.exitCode=1;