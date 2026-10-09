import assert from 'node:assert/strict';
// EventEmitter is synchronous — Node 24 ESM.
const {EventEmitter}=await import('node:events');
const bus=new EventEmitter(),order=[];
bus.once('saved',()=>order.push('listener'));order.push('before');
bus.emit('saved');order.push('after');bus.emit('saved');
assert.deepEqual(order,['before','listener','after']);
assert.throws(()=>new EventEmitter().emit('error',new Error('offline')),/offline/);
bus.on('error',error=>order.push(error.message));bus.emit('error',new Error('handled'));
assert.equal(order.at(-1),'handled');
console.log('PASS: emitter-boundary');
