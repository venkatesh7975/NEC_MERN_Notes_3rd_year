"""Original executable boundary examples, with concept-specific explanation and assessment."""
LESSONS=[
('scope-capture','javascript','Scope and closure capture',['Scope','Closures','Control flow'],
'A closure retains access to a binding, not a photograph of its value. A let binding inside a for loop is recreated for each iteration; a var binding is shared by callbacks.',
'''const shared=[]; for(var n=0;n<3;n++)shared.push(()=>n);
const isolated=[]; for(let i=0;i<3;i++)isolated.push(()=>i);
assert.deepEqual(shared.map(fn=>fn()),[3,3,3]);
assert.deepEqual(isolated.map(fn=>fn()),[0,1,2]);
function counter(){let value=0;return()=>++value;}
const first=counter(),second=counter();
assert.deepEqual([first(),first(),second()],[1,2,1]);''',
'Shared callbacks return 3; per-iteration callbacks return 0, 1, 2. Separately created counters have separate lexical environments.',
'Why does changing var to let fix the callback example?','The loop supplies separate lexical bindings. Scheduling is irrelevant here: every callback is invoked after the loop.',
'Return read and increment methods from counter. Verify they share one private binding, while a second counter stays independent.'),
('hoisting-tdz','javascript','Hoisting and the temporal dead zone',['Hoisting','Variables'],
'Creation of a lexical binding and initialization of its value are separate. Reading a lexical binding before initialization throws; a function declaration is available when its enclosing scope starts executing.',
'''assert.equal(declared(),7);
function declared(){return 7;}
assert.throws(()=>{const read=()=>later;read();let later=9;},ReferenceError);
assert.throws(()=>{const read=()=>typeof later;read();let later=9;},ReferenceError);
assert.equal(typeof genuinelyMissing,'undefined');''',
'The declaration returns 7. Even typeof throws for an uninitialized lexical binding; typeof an undeclared identifier returns undefined.',
'Is let not hoisted?','Its binding exists before initialization and shadows outer bindings, but cannot be read during that interval. Calling this simply unhoisted hides the temporal dead zone.',
'Add an outer later value and show that the inner lexical binding still shadows it before initialization.'),
('receiver-binding','javascript','Method receiver and explicit binding',['this','Functions','Objects'],
'An ordinary function receives this according to its invocation. Extracting a method loses the receiver. An arrow retains lexical this and cannot be rebound with call.',
'''const account={value:8,read(){return this.value;}};
assert.equal(account.read(),8);
const detached=account.read;
assert.throws(()=>detached(),TypeError); // ESM is strict.
assert.equal(detached.call({value:5}),5);
const bound=detached.bind(account);
assert.equal(bound.call({value:99}),8);
function createArrow(){return()=>this.value;}
const arrow=createArrow.call(account);
assert.equal(arrow.call({value:100}),8);''',
'Method call 8, explicit receiver 5, bound receiver 8, and lexical arrow receiver 8. Detached invocation throws in this ESM runtime.',
'Does an arrow function have its own this?','No. It resolves this through the enclosing lexical scope. A method shorthand is an ordinary function and follows invocation rules.',
'Pass the method through a callback API and fix receiver loss with binding or a closure; explain which value is retained.'),
('prototype-properties','javascript','Prototypes, inheritance and property descriptors',['Prototypes','Inheritance','Objects'],
'Lookup walks the prototype chain, while ownership and enumeration describe different properties. A non-writable own property rejects assignment in strict code.',
'''const parent={kind:'record'};
const child=Object.create(parent);child.title='Draft';
assert.equal(child.kind,'record');assert.equal(Object.hasOwn(child,'kind'),false);
assert.deepEqual(Object.keys(child),['title']);
Object.defineProperty(child,'id',{value:42,writable:false,enumerable:false});
assert.throws(()=>{child.id=99;},TypeError);
assert.equal(child.id,42);assert.equal(JSON.stringify(child),'{"title":"Draft"}');
child.kind='article';assert.equal(parent.kind,'record');''',
'Inherited kind is readable but is not an own key. Hidden id remains 42 and is omitted from JSON. Shadowing kind leaves the parent unchanged.',
'Does Object.keys include inherited properties?','No; it returns enumerable own string keys. A for-in loop can visit inherited enumerable keys and therefore needs a deliberate ownership policy.',
'Compare Object.keys, Reflect.ownKeys and for-in after adding a Symbol key and an inherited enumerable field.'),
('copy-and-arrays','javascript','Copy depth and array transformations',['Arrays','Spread/rest','Destructuring','Memory'],
'Spread copies one level. Nested objects remain shared references. Non-mutating array operations can preserve input order/identity, but copying the outer array does not clone its elements.',
'''const input=[{id:1,meta:{done:false}},{id:2,meta:{done:true}}];
const shallow=[...input];shallow[0].meta.done=true;
assert.equal(input[0].meta.done,true);
const separate=structuredClone(input);separate[0].meta.done=false;
assert.equal(input[0].meta.done,true);
const ids=input.map(({id})=>id);assert.deepEqual(ids,[1,2]);
assert.deepEqual(ids.toSorted((a,b)=>b-a),[2,1]);assert.deepEqual(ids,[1,2]);
assert.equal(input.filter(row=>row.meta.done).length,2);''',
'Shallow copy shares nested meta; structuredClone separates these cloneable records. toSorted returns a new array and leaves ids unchanged.',
'Is [...rows] enough for an immutable nested update?','No. Copy each object along the changed path, or use a suitable immutable update tool. Preserve the identity of unaffected rows.',
'Implement a nested completion toggle with map and nested spread. Verify the original record stays unchanged and unaffected rows keep identity.'),
('coercion-numbers','javascript','Coercion, equality and numeric limits',['Data types','Operators','Fundamentals'],
'Operators define their own conversion rules. Explicit input conversion and finite/safe-integer checks make domain boundaries clearer than relying on truthiness or loose equality.',
'''assert.equal('2'+1,'21');assert.equal('2'-1,1);
assert.equal(Number(''),0);assert.equal(Boolean('false'),true);
assert.equal(0=='',true);assert.equal(0==='',false);
assert.equal(NaN===NaN,false);assert.equal(Object.is(NaN,NaN),true);
assert.equal(0===-0,true);assert.equal(Object.is(0,-0),false);
assert.equal(Number.isSafeInteger(9007199254740992),false);
assert.equal(0.1+0.2===0.3,false);
assert.equal(10+20,30); // Integer cents for a money domain.''',
'String addition concatenates, subtraction converts, empty strings convert to zero, and nonempty false text is truthy. Integer cents avoid this simple fractional sum error.',
'Can Number(input) alone validate an amount?','No. It accepts blank input as zero, and it can produce nonfinite or unsafe values. Validate syntax and domain range as well as conversion.',
'Reject blank, negative, exponential and more-than-two-decimal currency strings. Reuse the exact-cent money parser from the MERN workspace.'),
('iteration-cleanup','javascript','Iterators and generator cleanup',['Iterators','Generators'],
'A generator suspends its execution and implements the iterator protocol. Early termination of a for-of loop calls return when supplied, allowing a finally block to release resources.',
'''let closed=false;
function* pages(){try{yield 1;yield 2;}finally{closed=true;}}
for(const page of pages()){assert.equal(page,1);break;}
assert.equal(closed,true);
const iterator=pages();assert.deepEqual(iterator.next(),{value:1,done:false});
assert.deepEqual(iterator.next(),{value:2,done:false});
assert.deepEqual(iterator.next(),{value:undefined,done:true});''',
'Breaking the loop executes finally. Manual next calls reveal value/done pairs and completion.',
'Does a generator run its body immediately when called?','No; calling it returns an iterator. Execution begins when iteration requests a value, and resumes after each yield.',
'Replace the fake pages with an async generator. Prove that breaking the consumer closes the iterator without requesting another page.'),
('structured-data','foundations','JSON boundaries and lost information',['JSON'],
'JSON is a data representation with a restricted value model. It does not preserve prototypes, undefined properties, circular references or arbitrary precision integers without an agreed encoding.',
'''const encoded=JSON.stringify({date:new Date('2026-01-01T00:00:00Z'),missing:undefined,amount:12});
const decoded=JSON.parse(encoded);assert.equal(typeof decoded.date,'string');
assert.equal(Object.hasOwn(decoded,'missing'),false);
assert.throws(()=>JSON.stringify({amount:12n}),TypeError);
const circular={};circular.self=circular;assert.throws(()=>JSON.stringify(circular),TypeError);
assert.throws(()=>JSON.parse('{bad json}'),SyntaxError);
assert.equal(JSON.parse('{"role":"owner"}').role,'owner'); // Parsing does not authorize it.''',
'Dates become strings; undefined object properties disappear; BigInt/cycles throw. Well-formed JSON can still contain an unauthorized field.',
'Does successful JSON parsing establish trusted application data?','No. Check shape, field allowlists, types, size and domain authorization after parsing.',
'Validate a parsed expense with integer cents, an allowed category and a real calendar date. Reject an injected owner field.'),
('promise-outcomes','async','Promise settlement and concurrent outcomes',['Promises','async/await','Async programming'],
'Promise.all is fail-fast at its observation boundary; it does not cancel work already started. allSettled collects independent successes and failures. Await catches rejection where it is awaited.',
'''let completed=0;
const later=new Promise(resolve=>setTimeout(()=>{completed++;resolve('saved');},5));
await assert.rejects(Promise.all([Promise.reject(new Error('failure')),later]),/failure/);
assert.equal(await later,'saved');assert.equal(completed,1);
const outcomes=await Promise.allSettled([Promise.resolve(3),Promise.reject('offline')]);
assert.deepEqual(outcomes.map(row=>row.status),['fulfilled','rejected']);
assert.equal(outcomes[0].value,3);assert.equal(outcomes[1].reason,'offline');
assert.equal(await Promise.resolve(1).then(n=>n+1).finally(()=>99),2);''',
'all rejects, yet the already-started later operation completes. allSettled returns both outcomes. A normally returning finally preserves the previous result.',
'Is Promise.all a concurrency limiter?','No. If requests are created before it is called, those requests have already started. Limit admission with a bounded worker pool.',
'Use the tested promise pool in js-toolkit with a cap of two; instrument active work and prove its maximum does not exceed the cap.'),
('microtask-order','async','Tasks and microtasks in an ESM trace',['Event loop','Microtasks','Macrotasks','Callbacks'],
'Synchronous work finishes before queued Promise callbacks and queueMicrotask callbacks run. A later timer task sees the microtask queue drained. This example deliberately avoids ambiguous sibling timer/immediate ordering.',
'''const order=[];
order.push('sync');
queueMicrotask(()=>order.push('microtask'));
Promise.resolve().then(()=>{order.push('promise');queueMicrotask(()=>order.push('nested'));});
await new Promise(resolve=>setTimeout(()=>{order.push('timer');resolve();},0));
assert.deepEqual(order,['sync','microtask','promise','nested','timer']);''',
'sync, microtask, promise, nested, timer under Node 24 ESM. Promise jobs and explicit microtasks run in enqueue order in this trace.',
'Why can recursively queued microtasks freeze a browser?','They can prevent the queue from draining and delay rendering and later tasks. Break large work into bounded chunks or move suitable CPU work to a worker.',
'Add a microtask inside the first microtask. Predict the full ordering before running; do not infer an ordering between all host scheduling APIs.'),
('errors-finally','javascript','Error propagation and finally',['Error handling'],
'An exception transfers control to the nearest compatible catch/finally path. Returning from finally overrides a pending result or exception, which can hide a failed operation.',
'''function hidden(){try{throw new Error('lost');}finally{return 'masked';}}
assert.equal(hidden(),'masked');
function visible(){try{throw new Error('visible');}finally{/* release resource; no return */}}
assert.throws(visible,/visible/);
const cause=new Error('database offline');const wrapper=new Error('Save failed',{cause});
assert.equal(wrapper.cause,cause);''',
'The first failure is masked; the second propagates. An Error cause preserves a lower-level failure without copying private details into a public response.',
'Should an API return the whole caught error?','No. Translate to a stable safe error contract, record permitted diagnostic context privately, and preserve useful causes internally.',
'Add cleanup to a rejected async save. Verify cleanup runs and the caller still observes rejection; avoid returning a success from finally.'),
('emitter-boundary','nodejs','EventEmitter is synchronous',['Events','EventEmitter','Error handling'],
'EventEmitter invokes registered listeners synchronously during emit. once removes its listener after the first event. An unhandled error event throws; it is not an ordinary ignored event.',
'''const {EventEmitter}=await import('node:events');
const bus=new EventEmitter(),order=[];
bus.once('saved',()=>order.push('listener'));order.push('before');
bus.emit('saved');order.push('after');bus.emit('saved');
assert.deepEqual(order,['before','listener','after']);
assert.throws(()=>new EventEmitter().emit('error',new Error('offline')),/offline/);
bus.on('error',error=>order.push(error.message));bus.emit('error',new Error('handled'));
assert.equal(order.at(-1),'handled');''',
'Listener runs before emit returns and only once. Unhandled error throws; a registered error listener receives it.',
'Does emit await an async listener?','No. It invokes the function; returned Promises need an explicit error and completion policy. Consider a queue or awaited operation when durable acknowledgement is required.',
'Make a listener reject. Add a documented rejection policy and verify the failure is observed instead of becoming an unhandled rejection.'),
('stream-cancellation','nodejs','Stream teardown and bytes',['Streams','Buffers','Async programming'],
'pipeline coordinates stream completion and destroys the chain when a stage fails. Buffers contain bytes; character count is not necessarily byte count for UTF-8.',
'''const {Readable,Writable}=await import('node:stream');
const {pipeline}=await import('node:stream/promises');
const bytes=Buffer.from('₹');assert.equal(bytes.length,3);assert.equal(bytes.toString(),'₹');
let chunks=0;const source=Readable.from(['one','two']);
const sink=new Writable({write(chunk,encoding,callback){chunks++;callback(new Error('disk full'));}});
await assert.rejects(pipeline(source,sink),/disk full/);
assert.equal(source.destroyed,true);assert.equal(sink.destroyed,true);assert.equal(chunks,1);''',
'The currency symbol occupies three UTF-8 bytes. The first failed write rejects pipeline and destroys both ends.',
'Why use pipeline instead of only source.pipe(destination)?','pipeline coordinates completion, error propagation and teardown across stages. Choose buffering/objectMode/highWaterMark for the actual workload; this small fixture is not a memory benchmark.',
'Use a slow sink and record write/drain behavior. Bound bytes buffered and abort a large transfer; verify all resources close.'),
('abort-contract','async','AbortSignal and cooperative cancellation',['Fetch','Async programming'],
'Cancellation is a signal observed by an operation. Promise.race by itself only chooses an outcome; it does not stop the losing operation. Fetch accepts a signal, while your own functions must implement cleanup.',
'''function wait(signal){return new Promise((resolve,reject)=>{
 if(signal.aborted){reject(signal.reason);return;}
 const abort=()=>{clearTimeout(timer);reject(signal.reason);};
 const timer=setTimeout(()=>{signal.removeEventListener('abort',abort);resolve('done');},100);
 signal.addEventListener('abort',abort,{once:true});
});}
const controller=new AbortController(),work=wait(controller.signal);
controller.abort(new Error('superseded'));await assert.rejects(work,/superseded/);
await assert.rejects(wait(controller.signal),/superseded/);''',
'Both in-flight and already-aborted requests reject with superseded. The timer is canceled and the registered listener is one-shot.',
'Is aborting enough to protect a search UI from stale results?','No. The operation might already have completed or might ignore the signal. Also compare a request generation before committing its result; the weather/browser fixtures demonstrate that boundary.',
'Replace the timer with a controllable fake provider. Resolve the old request after the new one and prove the old result never replaces the current view.')]

def example_names(area):return {name for lesson in LESSONS if lesson[1]==area for name in lesson[3]}
def append(area):
    text=''
    for id,which,title,names,model,code,expected,question,answer,practice in LESSONS:
        if which!=area:continue
        text+=f'### Executable boundary: {title}\n\n{model}\n\nConcepts: '+', '.join(names)+f'.\n\n```javascript\n'+code+f'\n```\n\n**Runtime and expected behavior:** Node 24 ESM; import `assert` from `node:assert/strict`. {expected}\n\n**Interview:** {question}\n\n**Answer:** {answer}\n\n**Change and verify:** {practice}\n\n[Standalone executable](../../projects/knowledge-base/concept-lab/{id}.mjs).\n\n'
    return text
def build(write):
    readme='# Executable concept boundaries\n\nFourteen original Node 24 ESM fixtures demonstrate output, failure and cleanup boundaries. Each file is standalone with explicit assertions. Run `npm run test:concepts` from the repository root or `node <file>` individually. Read the matching canonical guide, predict the result, then change an input. These examples cover specific contracts; they do not certify every related runtime API.\n\n'
    for id,area,title,names,model,code,expected,question,answer,practice in LESSONS:
        write(f'projects/knowledge-base/concept-lab/{id}.mjs',"import assert from 'node:assert/strict';\n// "+title+' — Node 24 ESM.\n'+code+"\nconsole.log('PASS: "+id+"');")
        readme+=f'- [{title}]({id}.mjs) — [explanation and assessment](../../../knowledge-base/topics/{area}.md); '+', '.join(names)+'.\n'
    write('projects/knowledge-base/concept-lab/README.md',readme)
