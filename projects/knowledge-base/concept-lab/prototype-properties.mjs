import assert from 'node:assert/strict';
// Prototypes, inheritance and property descriptors — Node 24 ESM.
const parent={kind:'record'};
const child=Object.create(parent);child.title='Draft';
assert.equal(child.kind,'record');assert.equal(Object.hasOwn(child,'kind'),false);
assert.deepEqual(Object.keys(child),['title']);
Object.defineProperty(child,'id',{value:42,writable:false,enumerable:false});
assert.throws(()=>{child.id=99;},TypeError);
assert.equal(child.id,42);assert.equal(JSON.stringify(child),'{"title":"Draft"}');
child.kind='article';assert.equal(parent.kind,'record');
console.log('PASS: prototype-properties');
