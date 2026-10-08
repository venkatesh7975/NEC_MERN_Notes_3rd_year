const byId=id=>document.getElementById(id),key='mern-handbook-progress-v1';
let bank=[],progress={};
try{const saved=JSON.parse(localStorage.getItem(key)??'{}');if(saved&&typeof saved==='object'&&!Array.isArray(saved))progress=saved;}catch{}
function save(){try{localStorage.setItem(key,JSON.stringify(progress));}catch{byId('error').hidden=false;byId('error').textContent='This browser cannot save progress. Export your CSV to keep it.';}}
function element(tag,text){const el=document.createElement(tag);if(text)el.textContent=text;return el;}
function render(){
  const query=byId('search').value.toLowerCase(),topic=byId('topic').value,level=byId('level').value,review=byId('review').value;
  const rows=bank.filter(q=>(!topic||q.topic===topic)&&(!level||q.difficulty===level)&&`${q.question} ${q.topic} ${q.answer}`.toLowerCase().includes(query)&&(!review||(review==='weak'?Number(progress[q.id]??-1)<2:Number(progress[q.id]??-1)>=2)));
  byId('count').textContent=rows.length===bank.length?`${bank.length} questions`:`${rows.length} of ${bank.length} questions`;
  const fragment=document.createDocumentFragment();
  for(const q of rows){
    const article=element('article'),meta=element('p',`${q.id} · ${q.topic} · ${q.difficulty}`);meta.className='meta';
    const heading=element('h2',q.question),details=element('details');details.append(element('summary','Reveal answer and follow-up'),element('p',q.answer),element('p',`Follow-up: ${q.followup}`));
    const label=element('label','Recall score'),select=element('select');select.setAttribute('aria-label',`Recall score for ${q.id}`);
    for(const [value,text] of [['','Unscored'],['0','0 — cannot explain'],['1','1 — definition only'],['2','2 — correct with example'],['3','3 — tradeoff and failure case']]){const option=element('option',text);option.value=value;select.append(option);}
    select.value=['0','1','2','3'].includes(String(progress[q.id]))?String(progress[q.id]):'';
    select.addEventListener('change',()=>{if(select.value==='')delete progress[q.id];else progress[q.id]=Number(select.value);save();if(byId('review').value)render();});label.append(select);article.append(meta,heading,details,label);fragment.append(article);
  }
  if(!rows.length)fragment.append(element('p','No matches. Change the filters to see more questions.'));
  byId('questions').replaceChildren(fragment);
}
for(const id of ['search','topic','level','review'])byId(id).addEventListener(id==='search'?'input':'change',render);
byId('export').addEventListener('click',()=>{
  const escape=value=>`"${String(value).replaceAll('"','""')}"`;
  const csv=[['ID','Topic','Difficulty','Question','Recall score'],...bank.map(q=>[q.id,q.topic,q.difficulty,q.question,progress[q.id]??''])].map(row=>row.map(escape).join(',')).join('\r\n');
  const url=URL.createObjectURL(new Blob(['\uFEFF',csv],{type:'text/csv;charset=utf-8'})),a=element('a');a.href=url;a.download='mern-recall-progress.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
});
try{const response=await fetch('data/question-bank.json');if(!response.ok)throw new Error('Question data could not be loaded');bank=await response.json();for(const topic of [...new Set(bank.map(q=>q.topic))]){const option=element('option',topic);option.value=topic;byId('topic').append(option);}render();}
catch(error){byId('error').hidden=false;byId('error').textContent=`${error.message}. Run python -m http.server 8000 from the repository root.`;byId('count').textContent='Questions unavailable';}
