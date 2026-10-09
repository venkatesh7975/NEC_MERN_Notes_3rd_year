import assert from 'node:assert/strict';
// Copy depth and array transformations — Node 24 ESM.
const input=[{id:1,meta:{done:false}},{id:2,meta:{done:true}}];
const shallow=[...input];shallow[0].meta.done=true;
assert.equal(input[0].meta.done,true);
const separate=structuredClone(input);separate[0].meta.done=false;
assert.equal(input[0].meta.done,true);
const ids=input.map(({id})=>id);assert.deepEqual(ids,[1,2]);
assert.deepEqual(ids.toSorted((a,b)=>b-a),[2,1]);assert.deepEqual(ids,[1,2]);
assert.equal(input.filter(row=>row.meta.done).length,2);
console.log('PASS: copy-and-arrays');
