import {before,after,test} from 'node:test';
import assert from 'node:assert/strict';
import {MongoMemoryServer} from 'mongodb-memory-server';
import {MongoClient} from 'mongodb';
import request from 'supertest';
import {createApp} from '../server/app.js';
import {MongoStore} from '../server/store.js';
import {parseMoney} from '../src/money.js';

const origin='http://localhost:3000';
let mongo,client,store,app,alice,bob;
const write=(agent,method,path)=>agent[method](path).set('Origin',origin);
before(async()=>{
  // An explicitly supplied URI must refer to a disposable local/test deployment.
  const uri=process.env.TEST_MONGODB_URI;
  if (!uri) mongo=await MongoMemoryServer.create();
  client=new MongoClient(uri??mongo.getUri()); await client.connect();
  store=new MongoStore(client.db(`interview_test_${process.pid}_${Date.now()}`));
  await store.initialize();app=createApp({store,origin});
  alice=request.agent(app);bob=request.agent(app);
  await write(alice,'post','/api/auth/register').send({email:'alice@example.test',password:'correct horse battery'}).expect(201);
  await write(bob,'post','/api/auth/register').send({email:'bob@example.test',password:'correct horse battery'}).expect(201);
});
after(async()=>{if(store)await store.db.dropDatabase();if(client)await client.close();if(mongo)await mongo.stop();});

test('authentication is required and sessions do not expose hashes',async()=>{
  await request(app).get('/api/tasks').expect(401);
  const me=await alice.get('/api/auth/me').expect(200);
  assert.equal(me.body.email,'alice@example.test');assert.equal(me.body.passwordHash,undefined);
  const row=await store.userByEmail('alice@example.test');assert.notEqual(row.passwordHash,'correct horse battery');
});
test('write origin, malformed JSON, body limits, and allowlists are enforced',async()=>{
  await alice.post('/api/tasks').send({title:'x'}).expect(403);
  await alice.post('/api/tasks').set('Origin','https://attacker.example').send({title:'x'}).expect(403);
  await write(alice,'post','/api/tasks').send({title:'x',owner:'bob'}).expect(400);
  await write(alice,'post','/api/tasks').set('Content-Type','application/json').send('{bad').expect(400);
  await write(alice,'post','/api/tasks').send({title:'x'.repeat(20000)}).expect(413);
  await write(alice,'post','/api/tasks').send({title:'   '}).expect(400);
});
test('task transitions are persisted and two same-version writes cannot both win',async()=>{
  const created=await write(alice,'post','/api/tasks').send({title:'Versioned task'}).expect(201);
  const {id,version}=created.body;
  const responses=await Promise.all(['doing','done'].map(status=>write(alice,'patch',`/api/tasks/${id}`).send({title:'Versioned task',status,version})));
  assert.deepEqual(responses.map(r=>r.status).sort(),[200,409]);
  const rows=await alice.get('/api/tasks').expect(200);
  assert.equal(rows.body.find(row=>row.id===id).version,1);
});
test('task list, update, and delete enforce ownership',async()=>{
  const item=(await write(alice,'post','/api/tasks').send({title:'Private task'}).expect(201)).body;
  assert.ok(!(await bob.get('/api/tasks').expect(200)).body.some(row=>row.id===item.id));
  await write(bob,'patch',`/api/tasks/${item.id}`).send({...{title:'Stolen',status:'done',version:0}}).expect(404);
  await write(bob,'delete',`/api/tasks/${item.id}`).expect(404);
  await write(alice,'delete',`/api/tasks/${item.id}`).expect(204);
  await write(alice,'delete','/api/tasks/not-an-id').expect(404);
});
test('bookmark protocols, credential URLs, uniqueness, and ownership are enforced',async()=>{
  await write(alice,'post','/api/bookmarks').send({title:'Unsafe',url:'javascript:alert(1)'}).expect(400);
  await write(alice,'post','/api/bookmarks').send({title:'Credentials',url:'https://user:pass@example.com'}).expect(400);
  const body={title:'React',url:'https://react.dev/learn'};
  const item=(await write(alice,'post','/api/bookmarks').send(body).expect(201)).body;
  await write(alice,'post','/api/bookmarks').send(body).expect(409);
  await write(bob,'post','/api/bookmarks').send(body).expect(201);
  await write(bob,'delete',`/api/bookmarks/${item.id}`).expect(404);
  assert.ok(!(await bob.get('/api/bookmarks').expect(200)).body.some(row=>row.id===item.id));
});
test('expense integer money, real calendar dates, summary, and ownership are correct',async()=>{
  const body={title:'Book',category:'learning',cents:1999,date:'2026-10-08'};
  await write(alice,'post','/api/expenses').send({...body,cents:1.2}).expect(400);
  await write(alice,'post','/api/expenses').send({...body,date:'2026-02-30'}).expect(400);
  await write(alice,'post','/api/expenses').send({...body,cents:0}).expect(400);
  const item=(await write(alice,'post','/api/expenses').send(body).expect(201)).body;
  const summary=(await alice.get('/api/expenses-summary').expect(200)).body;
  assert.equal(summary.totalCents,1999);assert.equal(summary.count,1);
  assert.equal((await bob.get('/api/expenses-summary').expect(200)).body.totalCents,0);
  await write(bob,'delete',`/api/expenses/${item.id}`).expect(404);
  assert.deepEqual((await bob.get('/api/expenses').expect(200)).body,[]);
});
test('lists are bounded while expense summary includes every record',async()=>{
  const user=(await alice.get('/api/auth/me')).body;
  await store.db.collection('expenses').insertMany(Array.from({length:51},(_,i)=>({owner:user.id,title:`E${i}`,category:'food',cents:1,date:'2026-10-08',createdAt:new Date()})));
  assert.equal((await alice.get('/api/expenses')).body.length,50);
  const summary=(await alice.get('/api/expenses-summary')).body;
  assert.equal(summary.count,52);assert.equal(summary.totalCents,2050);
});
test('concurrent duplicate emails are protected by a real unique index',async()=>{
  const agents=[request.agent(app),request.agent(app)];
  const rows=await Promise.all(agents.map(agent=>write(agent,'post','/api/auth/register').send({email:'race@example.test',password:'correct horse battery'})));
  assert.deepEqual(rows.map(r=>r.status).sort(),[201,409]);
});
test('logout revokes the server session and invalid login does not authenticate',async()=>{
  const agent=request.agent(app);
  const login=await write(agent,'post','/api/auth/login').send({email:'alice@example.test',password:'correct horse battery'}).expect(200);
  const cookie=login.headers['set-cookie'][0].split(';')[0];
  assert.match(login.headers['set-cookie'][0],/HttpOnly/);assert.match(login.headers['set-cookie'][0],/SameSite=Strict/);
  await write(agent,'post','/api/auth/logout').send({}).expect(204);
  await request(app).get('/api/auth/me').set('Cookie',cookie).expect(401);
  await write(agent,'post','/api/auth/login').send({email:'alice@example.test',password:'incorrect password'}).expect(401);
});
test('money parsing is exact for decimal strings and rejects ambiguous inputs',()=>{
  assert.equal(parseMoney('12.34'),1234);assert.equal(parseMoney('0.01'),1);assert.equal(parseMoney('12.3'),1230);
  for(const value of ['','-1','1e2','12.345','Infinity','0','1000001'])assert.throws(()=>parseMoney(value));
});
