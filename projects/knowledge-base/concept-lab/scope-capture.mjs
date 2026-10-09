import assert from 'node:assert/strict';
// Scope and closure capture — Node 24 ESM.
const shared=[]; for(var n=0;n<3;n++)shared.push(()=>n);
const isolated=[]; for(let i=0;i<3;i++)isolated.push(()=>i);
assert.deepEqual(shared.map(fn=>fn()),[3,3,3]);
assert.deepEqual(isolated.map(fn=>fn()),[0,1,2]);
function counter(){let value=0;return()=>++value;}
const first=counter(),second=counter();
assert.deepEqual([first(),first(),second()],[1,2,1]);
console.log('PASS: scope-capture');
