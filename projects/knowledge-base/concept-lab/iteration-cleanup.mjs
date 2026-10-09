import assert from 'node:assert/strict';
// Iterators and generator cleanup — Node 24 ESM.
let closed=false;
function* pages(){try{yield 1;yield 2;}finally{closed=true;}}
for(const page of pages()){assert.equal(page,1);break;}
assert.equal(closed,true);
const iterator=pages();assert.deepEqual(iterator.next(),{value:1,done:false});
assert.deepEqual(iterator.next(),{value:2,done:false});
assert.deepEqual(iterator.next(),{value:undefined,done:true});
console.log('PASS: iteration-cleanup');
