import assert from 'node:assert/strict';
// Tasks and microtasks in an ESM trace — Node 24 ESM.
const order=[];
order.push('sync');
queueMicrotask(()=>order.push('microtask'));
Promise.resolve().then(()=>{order.push('promise');queueMicrotask(()=>order.push('nested'));});
await new Promise(resolve=>setTimeout(()=>{order.push('timer');resolve();},0));
assert.deepEqual(order,['sync','microtask','promise','nested','timer']);
console.log('PASS: microtask-order');
