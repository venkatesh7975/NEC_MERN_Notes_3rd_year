import {calculate,parseCents,expenseTotal,quizScore,coordinates,validateNotes,readWeather} from './model.js';
import {transition} from '../../interview-ready/ui-lab/state.js';
const byId=id=>document.getElementById(id);
const el=(tag,text)=>{const node=document.createElement(tag);if(text!==undefined)node.textContent=text;return node;};
byId('calculator').addEventListener('submit',event=>{
  event.preventDefault();const values=new FormData(event.currentTarget);
  try{byId('calculation').textContent=`Result: ${calculate(values.get('left'),values.get('operator'),values.get('right'))}`;}
  catch(error){byId('calculation').textContent=error.message;}
});
let todos={items:[],deleted:null};
function renderTodos(){
  const filter=byId('todo-filter').value;byId('todos').replaceChildren();
  for(const task of todos.items.filter(t=>!filter||(filter==='done'?t.done:!t.done))){
    const li=el('li',task.title),toggle=el('button',task.done?'Mark active':'Complete'),remove=el('button','Delete');
    toggle.setAttribute('aria-label',`Toggle ${task.title}`);remove.setAttribute('aria-label',`Delete task ${task.title}`);
    toggle.onclick=()=>{todos=transition(todos,{type:'toggle',id:task.id});renderTodos();byId('todo-status').textContent='Task state changed';};
    remove.onclick=()=>{todos=transition(todos,{type:'delete',id:task.id});renderTodos();byId('undo').focus();byId('todo-status').textContent='Task deleted; undo available';};
    li.append(toggle,remove);byId('todos').append(li);
  }
  byId('undo').disabled=!todos.deleted;
}
byId('todo-form').onsubmit=event=>{
  event.preventDefault();const title=new FormData(event.currentTarget).get('title').trim();
  if(!title){byId('todo-status').textContent='Enter a task title';return;}
  todos=transition(todos,{type:'add',id:crypto.randomUUID(),title});event.currentTarget.reset();renderTodos();byId('todo-status').textContent='Task added';
};
byId('todo-filter').onchange=renderTodos;
byId('undo').onclick=()=>{todos=transition(todos,{type:'undo'});renderTodos();byId('todo-form').elements.title.focus();byId('todo-status').textContent='Task restored';};
const questions=[{id:'q1',prompt:'Does const freeze an object?',options:['Yes','No'],correct:1,explanation:'const prevents rebinding; properties can still change.'},{id:'q2',prompt:'Does fetch reject an HTTP 404 response?',options:['Yes','No'],correct:1,explanation:'Check response.ok; 404 is still an HTTP response.'},{id:'q3',prompt:'Which is an exact storage representation for two-decimal money?',options:['Formatted string in every calculation','Integer cents'],correct:1,explanation:'Integer cents avoid binary decimal rounding during supported integer sums.'}];
let answers={};
function renderQuiz(){
  const form=byId('quiz');form.replaceChildren();
  for(const q of questions){const fieldset=el('fieldset'),legend=el('legend',q.prompt);fieldset.append(legend);
    q.options.forEach((option,index)=>{const label=el('label'),input=el('input');input.type='radio';input.name=q.id;input.value=String(index);input.required=true;label.append(input,document.createTextNode(option));fieldset.append(label);});form.append(fieldset);}
  form.append(el('button','Score quiz'));
}
byId('quiz').onsubmit=event=>{event.preventDefault();answers=Object.fromEntries([...new FormData(event.currentTarget)].map(([id,value])=>[id,Number(value)]));byId('quiz-status').textContent=`Score: ${quizScore(questions,answers)}/${questions.length}. ${questions.map(q=>q.explanation).join(' ')}`;};
byId('quiz-reset').onclick=()=>{answers={};renderQuiz();byId('quiz-status').textContent='Quiz reset';};
let weatherRequest=0,weatherAbort;
byId('weather').onsubmit=async event=>{
  event.preventDefault();const values=new FormData(event.currentTarget),request=++weatherRequest;
  weatherAbort?.abort();weatherAbort=new AbortController();const controller=weatherAbort;let timer;
  try{
    const position=coordinates(values.get('latitude'),values.get('longitude'));byId('weather-status').textContent='Loading weather';
    let result;
    if(values.get('mode')==='demo')result={temperature:22.5,time:'offline illustration'};
    else{timer=setTimeout(()=>controller.abort(),10000);result=await readWeather(fetch,position,controller.signal);}
    if(request===weatherRequest)byId('weather-status').textContent=`${result.temperature} °C at ${result.time} (${position.lat}, ${position.lon})`;
  }catch(error){if(request===weatherRequest)byId('weather-status').textContent=error.name==='AbortError'?'Weather request timed out or was canceled':error.message;}
  finally{clearTimeout(timer);}
};
let notes=[],selected=null;
try{notes=validateNotes(JSON.parse(localStorage.getItem('mern-learning-notes-v1')??'[]'));}catch{byId('notes-status').textContent='Saved notes unavailable; use export to retain work.';}
function saveNotes(){try{localStorage.setItem('mern-learning-notes-v1',JSON.stringify(notes));byId('notes-status').textContent='Saved in this browser';}catch{byId('notes-status').textContent='Browser could not save notes. Export to retain work.';}}
function clearNote(){selected=null;byId('note-form').reset();}
function renderNotes(){byId('notes').replaceChildren();for(const note of notes){const li=el('li'),edit=el('button',note.title),remove=el('button','Delete');edit.setAttribute('aria-label',`Edit note ${note.title}`);remove.setAttribute('aria-label',`Delete note ${note.title}`);edit.onclick=()=>{selected=note.id;const form=byId('note-form');form.elements.title.value=note.title;form.elements.body.value=note.body;form.elements.title.focus();};remove.onclick=()=>{notes=notes.filter(n=>n.id!==note.id);if(selected===note.id)clearNote();saveNotes();renderNotes();byId('note-form').elements.title.focus();};li.append(edit,remove);byId('notes').append(li);}}
byId('note-form').onsubmit=event=>{event.preventDefault();const values=new FormData(event.currentTarget),title=values.get('title').trim(),body=values.get('body');if(!title){byId('notes-status').textContent='Enter a note title';return;}if(!selected&&notes.length>=100){byId('notes-status').textContent='Limit of 100 notes reached; export or remove a note';return;}const note={id:selected??crypto.randomUUID(),title,body};notes=selected?notes.map(n=>n.id===selected?note:n):[...notes,note];selected=note.id;saveNotes();renderNotes();};
byId('new-note').onclick=()=>{clearNote();byId('note-form').elements.title.focus();};
byId('export-notes').onclick=()=>{const url=URL.createObjectURL(new Blob([JSON.stringify(notes,null,2)],{type:'application/json'}));const link=el('a');link.href=url;link.download='learning-notes.json';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};
let expenses=[];
function renderExpenses(){const category=byId('expense-filter').value;byId('expenses').replaceChildren();for(const record of expenses.filter(r=>!category||r.category===category)){const li=el('li',`${record.category}: ${(record.cents/100).toFixed(2)}`),remove=el('button','Delete');remove.setAttribute('aria-label',`Delete expense ${record.id}`);remove.onclick=()=>{expenses=expenses.filter(r=>r.id!==record.id);renderExpenses();};li.append(remove);byId('expenses').append(li);}byId('expense-total').textContent=`Total: ${(expenseTotal(expenses,category)/100).toFixed(2)}`;}
byId('expense-form').onsubmit=event=>{event.preventDefault();const values=new FormData(event.currentTarget);try{const record={id:crypto.randomUUID(),category:values.get('category'),cents:parseCents(values.get('amount'))};expenseTotal([...expenses,record]);expenses.push(record);event.currentTarget.reset();byId('expense-error').textContent='';renderExpenses();}catch(error){byId('expense-error').textContent=error.message;}};
byId('expense-filter').onchange=renderExpenses;
renderTodos();renderQuiz();renderNotes();renderExpenses();
