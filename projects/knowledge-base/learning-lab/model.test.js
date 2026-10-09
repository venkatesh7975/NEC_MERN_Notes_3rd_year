import test from 'node:test';
import assert from 'node:assert/strict';
import {calculate,parseCents,expenseTotal,quizScore,coordinates,validateNotes,readWeather} from './model.js';
test('calculator supports decimal contracts and rejects unsafe evaluation',()=>{
  assert.equal(calculate('1.5','*','2'),3);assert.equal(calculate('-3','+','5'),2);
  for(const value of ['','0x10','Infinity','1;alert(1)'])assert.throws(()=>calculate(value,'+','1'));
  assert.throws(()=>calculate('1','/','0'));assert.throws(()=>calculate('1','**','2'));
});
test('money remains exact and totals respect selected category',()=>{
  assert.equal(parseCents('0.10')+parseCents('0.20'),30);
  assert.equal(expenseTotal([{category:'a',cents:1234},{category:'b',cents:100}],'a'),1234);
  for(const value of ['0','-2','1.234','1e3','9007199254740992'])assert.throws(()=>parseCents(value));
  assert.throws(()=>expenseTotal([{cents:Number.MAX_SAFE_INTEGER},{cents:1}]));
});
test('quiz counts one matching answer per id, including index zero',()=>{
  const questions=[{id:'a',correct:0},{id:'b',correct:1}];
  assert.equal(quizScore(questions,{a:0,b:1}),2);assert.equal(quizScore(questions,{a:1}),0);
});
test('coordinates reject missing, nonnumeric, and out-of-range values',()=>{
  assert.deepEqual(coordinates('-90','180'),{lat:-90,lon:180});
  for(const values of [['','0'],['91','0'],['0','181'],['NaN','0']])assert.throws(()=>coordinates(...values));
});
test('saved notes enforce schema, limit, and unique identity',()=>{
  const good={id:'one',title:'<script>',body:'plain text'};
  assert.deepEqual(validateNotes([good,good,{id:'bad',title:4,body:''}]),[good]);
  assert.deepEqual(validateNotes({}),[]);assert.deepEqual(validateNotes(Array(101).fill(good)),[]);
});
test('weather adapter handles statuses and shape and passes cancellation',async()=>{
  const signal=new AbortController().signal;let requested;
  const value=await readWeather(async(url,options)=>{requested={url,options};return {ok:true,json:async()=>({current:{temperature_2m:12.5,time:'2026-10-08T12:00'}})};},{lat:0,lon:0},signal);
  assert.equal(value.temperature,12.5);assert.equal(requested.options.signal,signal);assert.match(requested.url,/latitude=0/);
  await assert.rejects(readWeather(async()=>({ok:false,status:429}),{lat:0,lon:0}),/HTTP 429/);
  await assert.rejects(readWeather(async()=>({ok:true,json:async()=>({current:{temperature_2m:'hot'}})}),{lat:0,lon:0}),/unexpected shape/);
});
