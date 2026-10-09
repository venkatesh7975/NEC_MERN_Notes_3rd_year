import assert from 'node:assert/strict';
// Stream teardown and bytes — Node 24 ESM.
const {Readable,Writable}=await import('node:stream');
const {pipeline}=await import('node:stream/promises');
const bytes=Buffer.from('₹');assert.equal(bytes.length,3);assert.equal(bytes.toString(),'₹');
let chunks=0;const source=Readable.from(['one','two']);
const sink=new Writable({write(chunk,encoding,callback){chunks++;callback(new Error('disk full'));}});
await assert.rejects(pipeline(source,sink),/disk full/);
assert.equal(source.destroyed,true);assert.equal(sink.destroyed,true);assert.equal(chunks,1);
console.log('PASS: stream-cancellation');
