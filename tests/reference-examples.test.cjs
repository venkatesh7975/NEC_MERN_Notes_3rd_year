const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
for (const relative of ['dailycodes/ClassProjects/theme/index.js','dailycodes/javascript/p3/theme/index.js']) {
  test(relative+' toggles twice with accessible state',()=>{
    let click;
    const root={style:{},appendChild(button){this.button=button;}};
    const button={setAttribute(k,v){this[k]=v;},addEventListener(event,fn){assert.equal(event,'click');click=fn;}};
    const document={getElementById(id){assert.equal(id,'root');return root;},createElement(tag){assert.equal(tag,'button');return button;}};
    vm.runInNewContext(fs.readFileSync(path.join(__dirname,'..',relative),'utf8'),{document});
    assert.equal(button['aria-pressed'],'false');
    click(); assert.equal(root.style.backgroundColor,'black');assert.equal(button['aria-pressed'],'true');
    click(); assert.equal(root.style.backgroundColor,'green');assert.equal(button['aria-pressed'],'false');
    assert.equal(root.style.minHeight,'100vh');
  });
}
test('classroom duplicate theme copies remain consistent',()=>{
 const read=p=>fs.readFileSync(path.join(__dirname,'..',p),'utf8');
 assert.equal(read('dailycodes/ClassProjects/theme/index.js'),read('dailycodes/javascript/p3/theme/index.js'));
});

const {attendance,classifyNumbers} = require('../dailycodes/javascript/000-control-flow/app.js');
test('attendance handles threshold and invalid ranges',()=>{
 assert.deepEqual(attendance(15,20),{percentage:75,eligible:true});
 assert.equal(attendance(14,20).eligible,false);
 for(const args of [[0,0],[21,20],[-1,20],[1.5,20]]) assert.throws(()=>attendance(...args),RangeError);
});
test('loop includes zero and stops at the bound',()=>{
 assert.deepEqual(classifyNumbers(3),[{number:0,parity:'even'},{number:1,parity:'odd'},{number:2,parity:'even'},{number:3,parity:'odd'}]);
 assert.throws(()=>classifyNumbers(-1),RangeError);
});
