import {test} from 'node:test';
import assert from 'node:assert/strict';
import {transition} from './state.js';
test('task undo preserves identity and original order without mutating old state',()=>{
  const start={items:[],deleted:null};
  let state=transition(start,{type:'add',id:'a',title:' A '});state=transition(state,{type:'add',id:'b',title:'B'});
  const old=state;state=transition(state,{type:'toggle',id:'a'});assert.equal(old.items[0].done,false);
  state=transition(state,{type:'delete',id:'a'});state=transition(state,{type:'undo'});
  assert.deepEqual(state.items.map(x=>x.id),['a','b']);assert.equal(state.items[0].done,true);
  assert.equal(transition(state,{type:'undo'}),state);assert.deepEqual(start.items,[]);
});
test('blank and duplicate-id tasks are rejected',()=>{
  assert.throws(()=>transition({items:[],deleted:null},{type:'add',id:'a',title:'   '}));
  assert.throws(()=>transition({items:[{id:'a',title:'A'}],deleted:null},{type:'add',id:'a',title:'B'}));
});
