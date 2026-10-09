import assert from 'node:assert/strict';
// Hoisting and the temporal dead zone — Node 24 ESM.
assert.equal(declared(),7);
function declared(){return 7;}
assert.throws(()=>{const read=()=>later;read();let later=9;},ReferenceError);
assert.throws(()=>{const read=()=>typeof later;read();let later=9;},ReferenceError);
assert.equal(typeof genuinelyMissing,'undefined');
console.log('PASS: hoisting-tdz');
