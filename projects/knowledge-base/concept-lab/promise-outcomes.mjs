import assert from 'node:assert/strict';
// Promise settlement and concurrent outcomes — Node 24 ESM.
let completed=0;
const later=new Promise(resolve=>setTimeout(()=>{completed++;resolve('saved');},5));
await assert.rejects(Promise.all([Promise.reject(new Error('failure')),later]),/failure/);
assert.equal(await later,'saved');assert.equal(completed,1);
const outcomes=await Promise.allSettled([Promise.resolve(3),Promise.reject('offline')]);
assert.deepEqual(outcomes.map(row=>row.status),['fulfilled','rejected']);
assert.equal(outcomes[0].value,3);assert.equal(outcomes[1].reason,'offline');
assert.equal(await Promise.resolve(1).then(n=>n+1).finally(()=>99),2);
console.log('PASS: promise-outcomes');
