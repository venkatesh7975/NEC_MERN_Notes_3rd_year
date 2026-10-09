import {transition} from './state.js';
for(const button of document.querySelectorAll('[aria-controls]'))button.addEventListener('click',()=>{
  const expanded=button.getAttribute('aria-expanded')==='true';
  button.setAttribute('aria-expanded',String(!expanded));document.getElementById(button.getAttribute('aria-controls')).hidden=expanded;
});
const dialog=document.getElementById('reminder'),trigger=document.getElementById('open-dialog');
trigger.addEventListener('click',()=>dialog.showModal());
dialog.addEventListener('close',()=>{if(trigger.isConnected)trigger.focus();});
let state={items:[],deleted:null};
const list=document.getElementById('tasks'),filter=document.getElementById('filter'),undo=document.getElementById('undo'),message=document.getElementById('message');
function act(action,focusId) {
  state=transition(state,action);render();
  if(focusId)document.getElementById(focusId)?.focus();
  message.textContent=action.type==='delete'?'Task deleted. Undo is available.':action.type==='undo'?'Task restored.':`${state.items.length} tasks.`;
}
function render() {
  list.replaceChildren();
  const visible=state.items.filter(item=>filter.value==='all'||(filter.value==='done'?item.done:!item.done));
  for(const item of visible){
    const li=document.createElement('li'),label=document.createElement('label'),checkbox=document.createElement('input'),text=document.createElement('span'),remove=document.createElement('button');
    checkbox.type='checkbox';checkbox.checked=item.done;checkbox.id=`check-${item.id}`;
    checkbox.addEventListener('change',()=>act({type:'toggle',id:item.id},filter.value==='all'?checkbox.id:'filter'));
    text.textContent=item.title;label.append(checkbox,text);
    remove.textContent='Delete';remove.setAttribute('aria-label',`Delete ${item.title}`);remove.addEventListener('click',()=>act({type:'delete',id:item.id},'undo'));
    li.append(label,remove);list.append(li);
  }
  undo.disabled=!state.deleted;
  if(!visible.length){const empty=document.createElement('li');empty.textContent='No tasks in this view.';list.append(empty);}
}
document.getElementById('task-form').addEventListener('submit',event=>{
  event.preventDefault();const title=document.getElementById('task-title');
  try{act({type:'add',id:crypto.randomUUID(),title:title.value});title.value='';title.focus();}catch(error){message.textContent=error.message;title.focus();}
});
filter.addEventListener('change',render);undo.addEventListener('click',()=>act({type:'undo'},'task-title'));render();
