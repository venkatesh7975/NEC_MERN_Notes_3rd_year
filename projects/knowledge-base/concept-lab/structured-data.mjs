import assert from 'node:assert/strict';
// JSON boundaries and lost information — Node 24 ESM.
const encoded=JSON.stringify({date:new Date('2026-01-01T00:00:00Z'),missing:undefined,amount:12});
const decoded=JSON.parse(encoded);assert.equal(typeof decoded.date,'string');
assert.equal(Object.hasOwn(decoded,'missing'),false);
assert.throws(()=>JSON.stringify({amount:12n}),TypeError);
const circular={};circular.self=circular;assert.throws(()=>JSON.stringify(circular),TypeError);
assert.throws(()=>JSON.parse('{bad json}'),SyntaxError);
assert.equal(JSON.parse('{"role":"owner"}').role,'owner'); // Parsing does not authorize it.
console.log('PASS: structured-data');
