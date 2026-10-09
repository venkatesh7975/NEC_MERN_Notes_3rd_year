import assert from 'node:assert/strict';
// AbortSignal and cooperative cancellation — Node 24 ESM.
function wait(signal){return new Promise((resolve,reject)=>{
 if(signal.aborted){reject(signal.reason);return;}
 const abort=()=>{clearTimeout(timer);reject(signal.reason);};
 const timer=setTimeout(()=>{signal.removeEventListener('abort',abort);resolve('done');},100);
 signal.addEventListener('abort',abort,{once:true});
});}
const controller=new AbortController(),work=wait(controller.signal);
controller.abort(new Error('superseded'));await assert.rejects(work,/superseded/);
await assert.rejects(wait(controller.signal),/superseded/);
console.log('PASS: abort-contract');
