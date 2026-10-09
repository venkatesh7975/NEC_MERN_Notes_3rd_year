import assert from 'node:assert/strict';
// Coercion, equality and numeric limits — Node 24 ESM.
assert.equal('2'+1,'21');assert.equal('2'-1,1);
assert.equal(Number(''),0);assert.equal(Boolean('false'),true);
assert.equal(0=='',true);assert.equal(0==='',false);
assert.equal(NaN===NaN,false);assert.equal(Object.is(NaN,NaN),true);
assert.equal(0===-0,true);assert.equal(Object.is(0,-0),false);
assert.equal(Number.isSafeInteger(9007199254740992),false);
assert.equal(0.1+0.2===0.3,false);
assert.equal(10+20,30); // Integer cents for a money domain.
console.log('PASS: coercion-numbers');
