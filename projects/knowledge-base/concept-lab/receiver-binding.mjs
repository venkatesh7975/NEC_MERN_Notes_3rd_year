import assert from 'node:assert/strict';
// Method receiver and explicit binding — Node 24 ESM.
const account={value:8,read(){return this.value;}};
assert.equal(account.read(),8);
const detached=account.read;
assert.throws(()=>detached(),TypeError); // ESM is strict.
assert.equal(detached.call({value:5}),5);
const bound=detached.bind(account);
assert.equal(bound.call({value:99}),8);
function createArrow(){return()=>this.value;}
const arrow=createArrow.call(account);
assert.equal(arrow.call({value:100}),8);
console.log('PASS: receiver-binding');
