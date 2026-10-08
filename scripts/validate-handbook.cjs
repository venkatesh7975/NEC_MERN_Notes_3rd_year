const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const data=JSON.parse(fs.readFileSync(path.join(root,'interview-handbook/data/study-data.json'),'utf8'));
const bank=JSON.parse(fs.readFileSync(path.join(root,'interview-handbook/data/question-bank.json'),'utf8'));
assert.deepEqual(bank,data.questions,'Explorer and export bank differ');
for(const [key,count] of [['notes',10],['questions',100],['scenarios',24],['machine',16]])assert.equal(data[key].length,count,`${key} count`);
assert.equal(new Set(bank.map(q=>q.id)).size,bank.length,'Question ids repeat');
for(const q of bank){assert.match(q.id,/^Q\d{3}$/);assert.ok(['Easy','Medium','Hard'].includes(q.difficulty));assert.ok(q.answer.length>100&&q.followup.length>10);}
for(const scenario of data.scenarios)for(const field of ['evidence','cause','fix','test','pitfall'])assert.ok(scenario[field].length>15);
for(const m of data.machine){assert.ok(m.minutes>0&&m.requirements&&m.edges&&m.approach);}
const downloads=['mern-interview-handbook.pdf','mern-study-plan.docx','mern-preparation-tracker.xlsx','questions.csv','machine-coding.csv'];
for(const file of downloads)assert.ok(fs.statSync(path.join(root,'interview-handbook/downloads',file)).size>100);
assert.equal(fs.readdirSync(path.join(root,'interview-handbook/mindmaps')).filter(file=>file.endsWith('.svg')).length,6);
console.log('PASS: handbook counts, unique ids, answer and scenario fields, downloads, six maps, explorer data consistency.');
