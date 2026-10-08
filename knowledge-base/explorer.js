const byId=id=>document.getElementById(id), key='mern-knowledge-progress-v1';
const el=(tag,text)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;return n;};
let catalog,progress={},readGeneration=0;
try{const value=JSON.parse(localStorage.getItem(key)??'{}');if(value&&typeof value==='object'&&!Array.isArray(value))progress=value;}catch{}
function fail(message){byId('error').hidden=false;byId('error').textContent=message;}
function save(){try{localStorage.setItem(key,JSON.stringify(progress));}catch{fail('Progress could not be saved in this browser. Export your CSV to keep it.');}}
function safeLink(destination,base){
  const url=new URL(destination,base);
  if(!['http:','https:'].includes(url.protocol))return null;
  if(url.origin===location.origin){
    const guide=catalog.guides.find(g=>url.pathname.endsWith(`/${g.path}`));
    if(guide)return `explorer.html?guide=${encodeURIComponent(guide.id)}${url.hash}`;
  }
  return url.href;
}
function inline(parent,text,base){
  const pattern=/\[([^\]]+)\]\(([^\s)]+)\)|`([^`]+)`|\*\*([^*]+)\*\*/g;let start=0;
  for(const match of text.matchAll(pattern)){
    parent.append(document.createTextNode(text.slice(start,match.index)));
    if(match[3]!==undefined)parent.append(el('code',match[3]));
    else if(match[4]!==undefined)parent.append(el('strong',match[4]));
    else{let href;try{href=safeLink(match[2],base);}catch{}const node=el(href?'a':'span',match[1]);if(href)node.href=href;parent.append(node);}
    start=match.index+match[0].length;
  }
  parent.append(document.createTextNode(text.slice(start)));
}
// Deliberately limited Markdown renderer: never evaluate arbitrary embedded HTML.
function markdown(text,base){
  const root=document.createDocumentFragment();let target=root,details=null,code=null,lines=[],list=null;
  for(const line of text.split(/\r?\n/)){
    if(code){if(line.startsWith('```')){code.textContent=lines.join('\n');const pre=el('pre');pre.append(code);target.append(pre);code=null;lines=[];}else lines.push(line);continue;}
    if(line.startsWith('```')){code=el('code');list=null;continue;}
    if(line.startsWith('<!--'))continue;
    if(line==='<details>'){details=el('details');root.append(details);target=details;list=null;continue;}
    if(line==='</details>'){target=root;details=null;list=null;continue;}
    const summary=line.match(/^<summary>(.*)<\/summary>$/);if(summary){target.append(el('summary',summary[1]));continue;}
    const anchor=line.match(/^<a id="([a-z0-9-]+)"><\/a>$/);if(anchor){const span=el('span');span.id=anchor[1];target.append(span);continue;}
    if(!line.trim()){list=null;continue;}
    const heading=line.match(/^(#{1,6}) (.+)$/);
    if(heading){const h=el(`h${heading[1].length}`);inline(h,heading[2],base);target.append(h);list=null;continue;}
    const item=line.match(/^(?:- |\d+\. )(.+)$/);
    if(item){if(!list){list=el('ul');target.append(list);}const li=el('li');inline(li,item[1],base);list.append(li);continue;}
    list=null;const p=el('p');inline(p,line,base);target.append(p);
  }
  return root;
}
async function openGuide(id,anchor=''){
  const guide=catalog.guides.find(g=>g.id===id);if(!guide)return;
  const generation=++readGeneration;byId('reader').replaceChildren(el('p','Loading guide…'));
  try{const url=new URL(`../${guide.path}`,location.href),response=await fetch(url);if(!response.ok)throw new Error(`Guide returned HTTP ${response.status}`);const text=await response.text();if(generation!==readGeneration)return;
    byId('reader').replaceChildren(markdown(text,url));history.replaceState(null,'',`?guide=${encodeURIComponent(id)}${anchor?'#'+encodeURIComponent(anchor):''}`);
    if(anchor){const node=[...byId('reader').querySelectorAll('[id]')].find(n=>n.id===anchor);node?.scrollIntoView({block:'start'});}else byId('reader').focus();
  }catch(error){if(generation===readGeneration)byId('reader').replaceChildren(el('p',`${error.message}. Serve the repository over HTTP.`));}
}
function render(){
  const query=byId('search').value.trim().toLowerCase();
  const rows=catalog.concepts.filter(c=>`${c.title} ${c.definition} ${c.area}`.toLowerCase().includes(query)&&['area','priority','difficulty','depth'].every(field=>!byId(field).value||c[field]===byId(field).value)&&(!byId('progress-filter').value||(byId('progress-filter').value==='reviewed'?Boolean(progress[c.id]):!progress[c.id]))).sort((a,b)=>a.priority.localeCompare(b.priority)||a.title.localeCompare(b.title));
  byId('count').textContent=`${rows.length} of ${catalog.concepts.length} concepts`;const fragment=document.createDocumentFragment();
  for(const c of rows){const article=el('article');article.className='concept';article.append(el('div',`${c.priority} · ${c.difficulty} · ${c.depth}`));article.firstChild.className='badge';article.append(el('h2',c.title),el('p',c.definition));const button=el('button',`Read ${c.title}`);button.onclick=()=>openGuide(c.area,c.anchor);const label=el('label'),checkbox=el('input');checkbox.type='checkbox';checkbox.checked=Boolean(progress[c.id]);checkbox.setAttribute('aria-label',`Reviewed ${c.title} (${c.area})`);checkbox.onchange=()=>{if(checkbox.checked)progress[c.id]=new Date().toISOString().slice(0,10);else delete progress[c.id];save();if(byId('progress-filter').value)render();};label.append(checkbox,document.createTextNode('Reviewed'));article.append(button,label);fragment.append(article);}
  if(!rows.length)fragment.append(el('p','No matching concepts. Change or clear a filter.'));byId('results').replaceChildren(fragment);
}
for(const id of ['search','area','priority','difficulty','depth','progress-filter'])byId(id).addEventListener(id==='search'?'input':'change',()=>{if(catalog)render();});
byId('export').onclick=()=>{const cell=value=>`"${String(value).replaceAll('"','""')}"`;const rows=[['ID','Concept','Priority','Depth','Reviewed date'],...catalog.concepts.map(c=>[c.id,c.title,c.priority,c.depth,progress[c.id]??''])];const url=URL.createObjectURL(new Blob(['\uFEFF'+rows.map(r=>r.map(cell).join(',')).join('\r\n')],{type:'text/csv;charset=utf-8'}));const a=el('a');a.href=url;a.download='mern-knowledge-progress.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};
try{const response=await fetch('data/catalog.json');if(!response.ok)throw new Error(`Catalog returned HTTP ${response.status}`);catalog=await response.json();for(const guide of [...catalog.guides].sort((a,b)=>a.title.localeCompare(b.title))){const option=el('option',guide.title);option.value=guide.id;byId('area').append(option);}render();byId('export').disabled=false;const requested=new URLSearchParams(location.search).get('guide');if(requested)await openGuide(requested,decodeURIComponent(location.hash.slice(1)));}
catch(error){fail(`${error.message}. Run python -m http.server 8000 from the repository root.`);byId('count').textContent='Catalog unavailable';}
