import assert from 'node:assert/strict';
// Error propagation and finally — Node 24 ESM.
function hidden(){try{throw new Error('lost');}finally{return 'masked';}}
assert.equal(hidden(),'masked');
function visible(){try{throw new Error('visible');}finally{/* release resource; no return */}}
assert.throws(visible,/visible/);
const cause=new Error('database offline');const wrapper=new Error('Save failed',{cause});
assert.equal(wrapper.cause,cause);
console.log('PASS: errors-finally');
