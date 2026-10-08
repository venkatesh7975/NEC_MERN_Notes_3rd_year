import React,{useEffect,useState,useRef} from 'react';
import {createRoot} from 'react-dom/client';
import {parseMoney,formatMoney} from './money.js';
import './style.css';
async function api(path,options={}) {
  const response=await fetch(`/api${path}`,{...options,headers:{'Content-Type':'application/json',...options.headers}});
  if (!response.ok) {
    const data=await response.json().catch(()=>({message:'Request failed'}));
    const error=new Error(data.message??'Request failed'); error.status=response.status; throw error;
  }
  return response.status===204?null:response.json();
}
function Auth({onLogin}) {
  const [mode,setMode]=useState('login'),[error,setError]=useState(''),[busy,setBusy]=useState(false);
  async function submit(event) {
    event.preventDefault();setBusy(true);setError('');
    const form=new FormData(event.currentTarget);
    try {onLogin(await api(`/auth/${mode}`,{method:'POST',body:JSON.stringify({email:form.get('email'),password:form.get('password')})}));}
    catch(error){setError(error.message);}finally{setBusy(false);}
  }
  return <section className="auth"><h2>{mode==='login'?'Sign in':'Create an account'}</h2>
    <p>A local learning workspace. Use a test email and password.</p>
    <form onSubmit={submit}><label>Email<input name="email" type="email" autoComplete="email" required maxLength={254}/></label>
      <label>Password<input name="password" type="password" autoComplete={mode==='login'?'current-password':'new-password'} required minLength={12} maxLength={128}/></label>
      <p className="hint">Use 12 to 128 characters.</p><button disabled={busy}>{busy?'Please wait…':mode==='login'?'Sign in':'Register'}</button></form>
    {error&&<p role="alert">{error}</p>}
    <button className="secondary" type="button" disabled={busy} onClick={()=>{setMode(mode==='login'?'register':'login');setError('');}}>{mode==='login'?'Create an account':'Already have an account?'}</button>
  </section>;
}
function Collection({kind,onExpired}) {
  const [items,setItems]=useState([]),[status,setStatus]=useState('loading'),[error,setError]=useState(''),[busy,setBusy]=useState(false),[summary,setSummary]=useState(null);
  const titleRef=useRef(null), generation=useRef(0);
  useEffect(()=>{
    const controller=new AbortController(),request=++generation.current;
    setStatus('loading');setError('');
    Promise.all([api(`/${kind}`,{signal:controller.signal}),kind==='expenses'?api('/expenses-summary',{signal:controller.signal}):Promise.resolve(null)])
      .then(([rows,total])=>{if(request===generation.current){setItems(rows);setSummary(total);setStatus('ready');}})
      .catch(error=>{if(error.name!=='AbortError'&&request===generation.current){setError(error.message);setStatus('error');if(error.status===401)onExpired();}});
    return()=>{generation.current++;controller.abort();};
  },[kind,onExpired]);
  async function refresh() {
    const [rows,total]=await Promise.all([api(`/${kind}`),kind==='expenses'?api('/expenses-summary'):Promise.resolve(null)]);
    setItems(rows);setSummary(total);setStatus('ready');
  }
  async function mutation(action) {
    setBusy(true);setError('');
    try {await action();await refresh();return true;}
    catch(error){setError(error.message);if(error.status===401)onExpired();if(error.status===409)await refresh().catch(()=>{});return false;}
    finally{setBusy(false);}
  }
  async function add(event) {
    event.preventDefault();const form=event.currentTarget,values=new FormData(form);
    let body={title:values.get('title')};
    try {
      if(kind==='bookmarks')body.url=values.get('url');
      if(kind==='expenses')Object.assign(body,{cents:parseMoney(values.get('amount')),category:values.get('category'),date:values.get('date')});
    }catch(error){setError(error.message);return;}
    if(await mutation(()=>api(`/${kind}`,{method:'POST',body:JSON.stringify(body)}))){form.reset();titleRef.current?.focus();}
  }
  const labels={tasks:'Task board',bookmarks:'Reading list',expenses:'Expense tracker'};
  return <section aria-labelledby="collection-title"><h2 id="collection-title">{labels[kind]}</h2>
    <p>{kind==='tasks'?'Move tasks through a workflow. Concurrent edits use a version check.':kind==='bookmarks'?'Save useful references. Duplicate URLs are rejected for your account.':'Track expenses in INR with exact integer-cent storage.'}</p>
    <form className="entry" onSubmit={add}><label>Title<input ref={titleRef} name="title" required maxLength={160}/></label>
      {kind==='bookmarks'&&<label>URL<input name="url" type="url" required maxLength={2048} placeholder="https://react.dev/learn"/></label>}
      {kind==='expenses'&&<><label>Amount in INR<input name="amount" inputMode="decimal" required placeholder="125.50"/></label><label>Category<select name="category"><option>food</option><option>travel</option><option>learning</option><option>other</option></select></label><label>Date<input name="date" type="date" required/></label></>}
      <button disabled={busy||status==='loading'}>Add {kind==='tasks'?'task':kind==='bookmarks'?'bookmark':'expense'}</button></form>
    {error&&<p role="alert" className="error">{error}</p>}
    <div aria-live="polite">{status==='loading'?'Loading…':busy?'Saving…':`${items.length} visible items`}</div>
    {summary&&<p className="summary">All-time total: <strong>{formatMoney(summary.totalCents)}</strong> across {summary.count} expenses.</p>}
    <button type="button" className="secondary" disabled={busy||status==='loading'} onClick={()=>mutation(async()=>{})}>Reload items</button>
    {status==='ready'&&!items.length&&<p>No items yet. Add your first one above.</p>}
    <ul className={kind==='tasks'?'task-list':'item-list'}>{items.map(item=><li key={item.id}>
      <h3>{item.title}</h3>{kind==='bookmarks'&&<a href={item.url} target="_blank" rel="noopener noreferrer">Open reference</a>}
      {kind==='expenses'&&<p>{formatMoney(item.cents)} · {item.category} · {item.date}</p>}
      {kind==='tasks'&&<><p>Status: {item.status} · Version {item.version}</p><label>Move {item.title}<select aria-label={`Status for ${item.title}`} value={item.status} disabled={busy} onChange={event=>mutation(()=>api(`/tasks/${item.id}`,{method:'PATCH',body:JSON.stringify({title:item.title,status:event.target.value,version:item.version})}))}><option value="todo">To do</option><option value="doing">Doing</option><option value="done">Done</option></select></label></>}
      <button type="button" className="secondary" aria-label={`Delete ${item.title}`} disabled={busy} onClick={()=>mutation(()=>api(`/${kind}/${item.id}`,{method:'DELETE'}))}>Delete</button>
    </li>)}</ul><p className="hint">Lists show the newest 50 items. Expense totals include all your stored entries. Reload to see edits made in another tab.</p>
  </section>;
}
function App() {
  const [user,setUser]=useState(null),[checking,setChecking]=useState(true),[kind,setKind]=useState('tasks'),[error,setError]=useState('');
  const expired=React.useCallback(()=>setUser(null),[]);
  useEffect(()=>{let current=true;api('/auth/me').then(user=>{if(current)setUser(user);}).catch(error=>{if(current&&error.status!==401)setError(error.message);}).finally(()=>{if(current)setChecking(false);});return()=>{current=false;};},[]);
  async function logout(){try{await api('/auth/logout',{method:'POST',body:'{}'});setUser(null);}catch(error){setError(error.message);}}
  return <><a className="skip" href="#main">Skip to content</a><header><p className="eyebrow">MERN INTERVIEW LAB</p><h1>Build. Inspect. Explain.</h1><p>Three full-stack practice apps, one shared authenticated workspace.</p>{user&&<p>{user.email} <button type="button" className="secondary" onClick={logout}>Sign out</button></p>}</header>
    <main id="main">{error&&<p role="alert">{error}</p>}{checking?<p>Checking session…</p>:user?<><nav aria-label="Practice apps">{[['tasks','Task board'],['bookmarks','Reading list'],['expenses','Expense tracker']].map(([value,label])=><button type="button" key={value} aria-pressed={kind===value} onClick={()=>setKind(value)}>{label}</button>)}</nav><Collection key={kind} kind={kind} onExpired={expired}/></>:<Auth onLogin={setUser}/>}</main><footer>Educational reference · React, Express, Node, MongoDB · Inspect the source and tests before extending.</footer></>;
}
createRoot(document.getElementById('root')).render(<App/>);
