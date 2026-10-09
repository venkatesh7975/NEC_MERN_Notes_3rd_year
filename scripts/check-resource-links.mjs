// Optional reachability check. This deliberately never changes content-review dates.
import {readFile,mkdir,writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
const root=new URL('../',import.meta.url);
const catalog=JSON.parse(await readFile(new URL('knowledge-base/data/catalog.json',root),'utf8'));
const urls=[...new Set(catalog.resources.map(r=>r.url))];
const results=[];let cursor=0;
async function worker(){
  while(cursor<urls.length){const url=urls[cursor++];let status,finalUrl,error;
    try{let response=await fetch(url,{method:'HEAD',signal:AbortSignal.timeout(10000)});if([403,405,501].includes(response.status))response=await fetch(url,{signal:AbortSignal.timeout(10000)});status=response.status;finalUrl=response.url;await response.body?.cancel();}
    catch(value){error=value.message;}
    results.push({url,status,finalUrl,error,needsReview:!status||status>=400});
  }
}
await Promise.all(Array.from({length:4},worker));results.sort((a,b)=>a.url.localeCompare(b.url));
await mkdir(new URL('tmp/',root),{recursive:true});const output=new URL('tmp/resource-reachability.json',root);
await writeFile(output,JSON.stringify({checkedAt:new Date().toISOString(),scope:'HTTP reachability only; no content or video verification',results},null,2)+'\n');
console.log(`${results.length} unique URLs checked; ${results.filter(r=>r.needsReview).length} require review. Report: ${fileURLToPath(output)}. Content dates unchanged.`);
