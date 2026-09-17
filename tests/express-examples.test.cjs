const test = require('node:test');
const assert = require('node:assert/strict');
const app = require('../dailycodes/express/001-basic/app.js');
test('course API validates input and owns identifiers', async t => {
 const server = await new Promise(resolve => { const s=app.listen(0,'127.0.0.1',()=>resolve(s)); });
 t.after(()=>new Promise(resolve=>server.close(resolve)));
 const url='http://127.0.0.1:'+server.address().port+'/api/courses';
 const initial=await (await fetch(url)).json();
 assert.equal(initial.count,2);
 const post=body=>fetch(url,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
 for(const body of [{title:'',instructor:'A'},{title:'HTML',instructor:''},{title:'x'.repeat(121),instructor:'A'},{title:'HTML',instructor:'A',id:900},{}]) {
   const result=await post(body); assert.equal(result.status,400); await result.text();
 }
 const valid=await post({title:'  CSS lab  ',instructor:'  Faculty  '});
 assert.equal(valid.status,201);
 const payload=await valid.json();
 assert.equal(payload.data.id,3); assert.equal(payload.data.title,'CSS lab');
 const final=await (await fetch(url)).json(); assert.equal(final.count,3);
});
