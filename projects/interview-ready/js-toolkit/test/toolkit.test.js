import {test} from 'node:test';
import assert from 'node:assert/strict';
import {debounce, LRUCache, EventEmitter, promisePool, twoSum, countTargetSubarrays} from '../src/index.js';

function fakeClock() {
  let id = 0; const pending = new Map();
  return {setTimeout(fn) {pending.set(++id, fn); return id;}, clearTimeout(key) {pending.delete(key);},
    tick() {const callbacks = [...pending.values()]; pending.clear(); callbacks.forEach(fn => fn());},
    get size() {return pending.size;}};
}
test('debounce calls only the latest arguments and preserves this', () => {
  const clock = fakeClock(), calls = [], owner = {label:'owner'};
  owner.run = debounce(function(value) {calls.push([this.label,value]);}, 100, clock);
  owner.run(1); owner.run(2);
  assert.deepEqual(calls, []); assert.equal(clock.size, 1);
  clock.tick(); assert.deepEqual(calls, [['owner',2]]);
});
test('debounce cancel and flush leave no pending callback', () => {
  const clock = fakeClock(); let calls=0;
  const run = debounce(() => ++calls, 0, clock);
  run(); run.cancel(); clock.tick(); assert.equal(calls,0);
  run(); assert.equal(run.flush(),1); clock.tick(); assert.equal(calls,1);
  assert.equal(run.flush(),undefined);
  assert.throws(() => debounce(() => {}, -1));
});
test('LRU refreshes reads, replaces keys, and handles undefined', () => {
  const cache = new LRUCache(2);
  cache.set('a',1).set('b',undefined);
  assert.equal(cache.has('b'),true); cache.get('a'); cache.set('c',3);
  assert.equal(cache.has('b'),false); assert.equal(cache.get('a'),1);
  cache.set('a',4).set('d',5);
  assert.equal(cache.has('c'),false); assert.equal(cache.size,2);
  assert.throws(() => new LRUCache(0));
});
test('emitter uses a snapshot and once removes before reentrant emit', () => {
  const emitter = new EventEmitter(), calls=[];
  let removeSecond;
  emitter.on('x', () => {calls.push('a'); removeSecond();});
  removeSecond = emitter.on('x', () => calls.push('b'));
  emitter.emit('x'); emitter.emit('x');
  assert.deepEqual(calls,['a','b','a']);
  let once=0;
  emitter.once('once', () => {once++; emitter.emit('once');}); emitter.emit('once');
  assert.equal(once,1);
});
test('promise pool bounds active work and keeps input ordering', async () => {
  let active=0, peak=0; const releases=[];
  const tasks = [0,1,2,3].map(index => async () => {
    active++; peak=Math.max(peak,active);
    await new Promise(resolve => releases[index]=resolve);
    active--; return index;
  });
  const result=promisePool(tasks,2);
  assert.equal(active,2); releases[1](); await Promise.resolve(); await Promise.resolve();
  assert.equal(active,2); releases[0](); await Promise.resolve(); await Promise.resolve();
  releases[3](); releases[2]();
  assert.deepEqual((await result).map(x=>x.value),[0,1,2,3]); assert.equal(peak,2);
});
test('promise pool records sync and async failures without stopping peers', async () => {
  const error = new Error('expected');
  const results=await promisePool([()=>{throw error;},async()=>7],1);
  assert.equal(results[0].reason,error); assert.equal(results[1].value,7);
  assert.deepEqual(await promisePool([],3),[]);
  await assert.rejects(promisePool([],0));
});
test('algorithm boundaries include duplicate values and negative sums', () => {
  assert.deepEqual(twoSum([3,3],6),[0,1]); assert.equal(twoSum([3],6),null);
  assert.equal(countTargetSubarrays([1,-1,1],1),3);
  assert.equal(countTargetSubarrays([0,0],0),3);
  assert.equal(countTargetSubarrays([],0),0);
});
