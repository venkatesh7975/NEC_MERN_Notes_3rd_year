<!-- kb-metadata: {"conceptIds": ["javascript--fundamentals", "javascript--variables", "javascript--data-types", "javascript--operators", "javascript--control-flow", "javascript--functions", "javascript--scope", "javascript--closures", "javascript--hoisting", "javascript--this", "javascript--objects", "javascript--arrays", "javascript--destructuring", "javascript--spread-rest", "javascript--prototypes", "javascript--classes", "javascript--inheritance", "javascript--modules", "javascript--error-handling", "javascript--memory", "javascript--garbage-collection", "javascript--iterators", "javascript--generators", "javascript--symbols", "javascript--proxy", "javascript--reflect", "javascript--typed-arrays", "javascript--internationalization", "javascript--modern-ecmascript", "javascript--tc39-proposals", "javascript--performance", "javascript--security"], "difficulty": "Beginner", "estimatedMinutes": 180, "id": "javascript", "importance": 5, "lastVerified": "2026-10-08", "legacyPaths": ["notes/javascript.md", "04-javascript/notes.md"], "path": "knowledge-base/topics/javascript.md", "prerequisites": ["foundations"], "priority": "P0", "related": ["async", "browser", "typescript", "nodejs"], "status": "authored-guide", "title": "JavaScript values, scope, functions, and collections"} -->
# JavaScript values, scope, functions, and collections

Priority: P0 — 🔥 Essential / Master

Difficulty: Beginner

Importance: 5/5

Prerequisites: [Internet, HTTP, and the browser](foundations.md)

Estimated learning time: 180 minutes for explanation and initial practice; independent mastery takes repeated application.

[Knowledge base](../README.md) · [Coverage](../COVERAGE.md) · [Learning paths](../paths/README.md)

## 🎯 Learning Objectives

Explain the mental model, trace the worked example, reproduce a failure, and demonstrate the acceptance checks in the mini-project. Individual concepts below have their own priorities and depth labels.

## 🧠 What Is It?

JavaScript evaluates expressions and statements using a language-defined value model and host-provided APIs.

## Concept reference and priorities

<a id="fundamentals"></a>
### Fundamentals

**P0 · 🔥 Essential / Master · worked-example**

JavaScript evaluates expressions and statements using a language-defined value model and host-provided APIs.

<a id="variables"></a>
### Variables

**P0 · 🔥 Essential / Master · worked-example**

Bindings associate names with values; const prevents reassignment of a binding, not mutation of its object.

<a id="data-types"></a>
### Data types

**P0 · 🔥 Essential / Master · worked-example**

Primitives and objects have different identity behavior. undefined, null, numbers, strings, booleans, bigint, and symbols need explicit handling.

<a id="operators"></a>
### Operators

**P0 · 🔥 Essential / Master · worked-example**

Operators combine or compare values; coercion, short-circuiting, and nullish behavior affect results.

<a id="control-flow"></a>
### Control flow

**P0 · 🔥 Essential / Master · worked-example**

Conditions, loops, return, break, and continue select which work runs and when iteration ends.

<a id="functions"></a>
### Functions

**P0 · 🔥 Essential / Master · worked-example**

Functions define callable behavior, parameters, return values, and closures over lexical bindings.

<a id="scope"></a>
### Scope

**P0 · 🔥 Essential / Master · worked-example**

Lexical scope resolves names from where code is written, not from whichever function called it.

<a id="closures"></a>
### Closures

**P0 · 🔥 Essential / Master · worked-example**

A function retains access to its lexical environment, including bindings whose values can change.

<a id="hoisting"></a>
### Hoisting

**P1 · ⭐ Highly Important · worked-example**

Declarations are instantiated before evaluation, but initialization timing differs; let and const have a temporal dead zone.

<a id="this"></a>
### this

**P1 · ⭐ Highly Important · worked-example**

Ordinary function this depends on invocation; arrows capture the surrounding this and cannot be rebound with call.

<a id="objects"></a>
### Objects

**P0 · 🔥 Essential / Master · worked-example**

Objects group properties and have identity; spreading creates a shallow copy of own enumerable properties.

<a id="arrays"></a>
### Arrays

**P0 · 🔥 Essential / Master · worked-example**

Arrays hold indexed collections; map transforms, filter selects, and reduce accumulates values.

<a id="destructuring"></a>
### Destructuring

**P1 · ⭐ Highly Important · worked-example**

Destructuring binds values from structured data; defaults apply to undefined rather than every falsy value.

<a id="spread-rest"></a>
### Spread/rest

**P1 · ⭐ Highly Important · worked-example**

Spread expands values; rest collects remaining arguments or properties. Object spread does not deeply clone nested objects.

<a id="prototypes"></a>
### Prototypes

**P2 · 📚 Useful · worked-example**

Property lookup can follow a prototype chain after own properties are checked.

<a id="classes"></a>
### Classes

**P2 · 📚 Useful · reference**

Classes provide syntax around constructors and prototype-based methods, with additional class-specific semantics.

<a id="inheritance"></a>
### Inheritance

**P2 · 📚 Useful · worked-example**

Inheritance reuses behavior through type or prototype relationships; composition can avoid rigid hierarchies.

<a id="modules"></a>
### Modules

**P0 · 🔥 Essential / Master · reference**

Modules make dependencies and exports explicit; ESM and CommonJS have different loading and interoperability rules.

<a id="error-handling"></a>
### Error handling

**P0 · 🔥 Essential / Master · worked-example**

Throw, try/catch, and Promise rejection represent failures; handle errors at a boundary that can act.

<a id="memory"></a>
### Memory

**P1 · ⭐ Highly Important · worked-example**

Retained references determine whether objects remain reachable; caches, listeners, and closures can retain large graphs.

<a id="garbage-collection"></a>
### Garbage collection

**P2 · 📚 Useful · reference**

The engine reclaims unreachable objects; collection timing is not a portable application guarantee.

<a id="iterators"></a>
### Iterators

**P2 · 📚 Useful · worked-example**

An iterator returns successive value/done results; iterable protocols allow for-of and spread to consume sequences.

<a id="generators"></a>
### Generators

**P3 · 🧩 Advanced / Specialized · worked-example**

Generators suspend and resume function execution while yielding values, providing convenient iterator state.

<a id="symbols"></a>
### Symbols

**P3 · 🧩 Advanced / Specialized · reference**

Symbols create distinct property keys and participate in protocols such as iteration.

<a id="proxy"></a>
### Proxy

**P3 · 🧩 Advanced / Specialized · reference**

A Proxy intercepts operations on a target through traps; language invariants constrain permitted behavior.

<a id="reflect"></a>
### Reflect

**P3 · 🧩 Advanced / Specialized · reference**

Reflect exposes operations corresponding to object internal behavior and can preserve forwarding semantics in traps.

<a id="typed-arrays"></a>
### Typed arrays

**P3 · 🧩 Advanced / Specialized · reference**

Typed arrays view fixed-format binary values in buffers; byte layout and bounds matter.

<a id="internationalization"></a>
### Internationalization

**P1 · ⭐ Highly Important · reference**

Intl formats numbers, dates, and text according to locale conventions; formatting is separate from domain storage.

<a id="modern-ecmascript"></a>
### Modern ECMAScript

**P2 · 📚 Useful · reference**

Language additions vary by runtime support. Check the target runtime rather than assuming a proposal is standardized.

<a id="tc39-proposals"></a>
### TC39 proposals

**P4 · 🔬 Reference / Experimental · reference**

Proposals have explicit stages and can change or stop progressing; inspect proposal status and runtime support before relying on experimental behavior.

<a id="performance"></a>
### Performance

**P1 · ⭐ Highly Important · reference**

Measure workload, allocation, and blocking time before replacing readable code with an optimization.

<a id="security"></a>
### Security

**P0 · 🔥 Essential / Master · reference**

Treat untrusted values as data; validate at boundaries and avoid executing input or inserting it as HTML.

## ❓ Why Does It Exist?

Many application bugs are mistaken assumptions about identity, coercion, or captured values. A precise value model also makes React updates and backend validation easier to explain.

## ⚙️ How Does It Work?

Start with a small input, trace each binding, and state the output. Object copies and immutable transitions are separate decisions: a new outer object can still share a nested array. Use Number.isFinite and explicit parsing rules for numeric inputs. Use a Map when key identity matters and plain records when the domain is fixed. Design functions with a documented input, result, and failure contract.

## 💻 Examples

### 1. Trace the contract

```javascript
const original = {tags:['mern']};
const copy = {...original};
copy.tags.push('interview');
console.log(original.tags.length); // 2: nested array is shared

function makeCounter() {
  let count = 0;
  return () => ++count;
}
const next = makeCounter();
console.log(next(), next()); // 1 2
```

Expected behavior and runtime: The log values are 2, then 1 and 2. Replace tags with a new array to avoid mutating the original; each makeCounter call creates a distinct environment.

### 2. Extend and stress the contract

Intermediate: predict shallow-copy and equality outputs before running them. Advanced: implement a generator over a bounded tree and show early termination. Record the expected result before implementation; use the failure analysis below to distinguish the broken boundary.

### Executable boundary: Scope and closure capture

A closure retains access to a binding, not a photograph of its value. A let binding inside a for loop is recreated for each iteration; a var binding is shared by callbacks.

Concepts: Scope, Closures, Control flow.

```javascript
const shared=[]; for(var n=0;n<3;n++)shared.push(()=>n);
const isolated=[]; for(let i=0;i<3;i++)isolated.push(()=>i);
assert.deepEqual(shared.map(fn=>fn()),[3,3,3]);
assert.deepEqual(isolated.map(fn=>fn()),[0,1,2]);
function counter(){let value=0;return()=>++value;}
const first=counter(),second=counter();
assert.deepEqual([first(),first(),second()],[1,2,1]);
```

**Runtime and expected behavior:** Node 24 ESM; import `assert` from `node:assert/strict`. Shared callbacks return 3; per-iteration callbacks return 0, 1, 2. Separately created counters have separate lexical environments.

**Interview:** Why does changing var to let fix the callback example?

**Answer:** The loop supplies separate lexical bindings. Scheduling is irrelevant here: every callback is invoked after the loop.

**Change and verify:** Return read and increment methods from counter. Verify they share one private binding, while a second counter stays independent.

[Standalone executable](../../projects/knowledge-base/concept-lab/scope-capture.mjs).

### Executable boundary: Hoisting and the temporal dead zone

Creation of a lexical binding and initialization of its value are separate. Reading a lexical binding before initialization throws; a function declaration is available when its enclosing scope starts executing.

Concepts: Hoisting, Variables.

```javascript
assert.equal(declared(),7);
function declared(){return 7;}
assert.throws(()=>{const read=()=>later;read();let later=9;},ReferenceError);
assert.throws(()=>{const read=()=>typeof later;read();let later=9;},ReferenceError);
assert.equal(typeof genuinelyMissing,'undefined');
```

**Runtime and expected behavior:** Node 24 ESM; import `assert` from `node:assert/strict`. The declaration returns 7. Even typeof throws for an uninitialized lexical binding; typeof an undeclared identifier returns undefined.

**Interview:** Is let not hoisted?

**Answer:** Its binding exists before initialization and shadows outer bindings, but cannot be read during that interval. Calling this simply unhoisted hides the temporal dead zone.

**Change and verify:** Add an outer later value and show that the inner lexical binding still shadows it before initialization.

[Standalone executable](../../projects/knowledge-base/concept-lab/hoisting-tdz.mjs).

### Executable boundary: Method receiver and explicit binding

An ordinary function receives this according to its invocation. Extracting a method loses the receiver. An arrow retains lexical this and cannot be rebound with call.

Concepts: this, Functions, Objects.

```javascript
const account={value:8,read(){return this.value;}};
assert.equal(account.read(),8);
const detached=account.read;
assert.throws(()=>detached(),TypeError); // ESM is strict.
assert.equal(detached.call({value:5}),5);
const bound=detached.bind(account);
assert.equal(bound.call({value:99}),8);
function createArrow(){return()=>this.value;}
const arrow=createArrow.call(account);
assert.equal(arrow.call({value:100}),8);
```

**Runtime and expected behavior:** Node 24 ESM; import `assert` from `node:assert/strict`. Method call 8, explicit receiver 5, bound receiver 8, and lexical arrow receiver 8. Detached invocation throws in this ESM runtime.

**Interview:** Does an arrow function have its own this?

**Answer:** No. It resolves this through the enclosing lexical scope. A method shorthand is an ordinary function and follows invocation rules.

**Change and verify:** Pass the method through a callback API and fix receiver loss with binding or a closure; explain which value is retained.

[Standalone executable](../../projects/knowledge-base/concept-lab/receiver-binding.mjs).

### Executable boundary: Prototypes, inheritance and property descriptors

Lookup walks the prototype chain, while ownership and enumeration describe different properties. A non-writable own property rejects assignment in strict code.

Concepts: Prototypes, Inheritance, Objects.

```javascript
const parent={kind:'record'};
const child=Object.create(parent);child.title='Draft';
assert.equal(child.kind,'record');assert.equal(Object.hasOwn(child,'kind'),false);
assert.deepEqual(Object.keys(child),['title']);
Object.defineProperty(child,'id',{value:42,writable:false,enumerable:false});
assert.throws(()=>{child.id=99;},TypeError);
assert.equal(child.id,42);assert.equal(JSON.stringify(child),'{"title":"Draft"}');
child.kind='article';assert.equal(parent.kind,'record');
```

**Runtime and expected behavior:** Node 24 ESM; import `assert` from `node:assert/strict`. Inherited kind is readable but is not an own key. Hidden id remains 42 and is omitted from JSON. Shadowing kind leaves the parent unchanged.

**Interview:** Does Object.keys include inherited properties?

**Answer:** No; it returns enumerable own string keys. A for-in loop can visit inherited enumerable keys and therefore needs a deliberate ownership policy.

**Change and verify:** Compare Object.keys, Reflect.ownKeys and for-in after adding a Symbol key and an inherited enumerable field.

[Standalone executable](../../projects/knowledge-base/concept-lab/prototype-properties.mjs).

### Executable boundary: Copy depth and array transformations

Spread copies one level. Nested objects remain shared references. Non-mutating array operations can preserve input order/identity, but copying the outer array does not clone its elements.

Concepts: Arrays, Spread/rest, Destructuring, Memory.

```javascript
const input=[{id:1,meta:{done:false}},{id:2,meta:{done:true}}];
const shallow=[...input];shallow[0].meta.done=true;
assert.equal(input[0].meta.done,true);
const separate=structuredClone(input);separate[0].meta.done=false;
assert.equal(input[0].meta.done,true);
const ids=input.map(({id})=>id);assert.deepEqual(ids,[1,2]);
assert.deepEqual(ids.toSorted((a,b)=>b-a),[2,1]);assert.deepEqual(ids,[1,2]);
assert.equal(input.filter(row=>row.meta.done).length,2);
```

**Runtime and expected behavior:** Node 24 ESM; import `assert` from `node:assert/strict`. Shallow copy shares nested meta; structuredClone separates these cloneable records. toSorted returns a new array and leaves ids unchanged.

**Interview:** Is [...rows] enough for an immutable nested update?

**Answer:** No. Copy each object along the changed path, or use a suitable immutable update tool. Preserve the identity of unaffected rows.

**Change and verify:** Implement a nested completion toggle with map and nested spread. Verify the original record stays unchanged and unaffected rows keep identity.

[Standalone executable](../../projects/knowledge-base/concept-lab/copy-and-arrays.mjs).

### Executable boundary: Coercion, equality and numeric limits

Operators define their own conversion rules. Explicit input conversion and finite/safe-integer checks make domain boundaries clearer than relying on truthiness or loose equality.

Concepts: Data types, Operators, Fundamentals.

```javascript
assert.equal('2'+1,'21');assert.equal('2'-1,1);
assert.equal(Number(''),0);assert.equal(Boolean('false'),true);
assert.equal(0=='',true);assert.equal(0==='',false);
assert.equal(NaN===NaN,false);assert.equal(Object.is(NaN,NaN),true);
assert.equal(0===-0,true);assert.equal(Object.is(0,-0),false);
assert.equal(Number.isSafeInteger(9007199254740992),false);
assert.equal(0.1+0.2===0.3,false);
assert.equal(10+20,30); // Integer cents for a money domain.
```

**Runtime and expected behavior:** Node 24 ESM; import `assert` from `node:assert/strict`. String addition concatenates, subtraction converts, empty strings convert to zero, and nonempty false text is truthy. Integer cents avoid this simple fractional sum error.

**Interview:** Can Number(input) alone validate an amount?

**Answer:** No. It accepts blank input as zero, and it can produce nonfinite or unsafe values. Validate syntax and domain range as well as conversion.

**Change and verify:** Reject blank, negative, exponential and more-than-two-decimal currency strings. Reuse the exact-cent money parser from the MERN workspace.

[Standalone executable](../../projects/knowledge-base/concept-lab/coercion-numbers.mjs).

### Executable boundary: Iterators and generator cleanup

A generator suspends its execution and implements the iterator protocol. Early termination of a for-of loop calls return when supplied, allowing a finally block to release resources.

Concepts: Iterators, Generators.

```javascript
let closed=false;
function* pages(){try{yield 1;yield 2;}finally{closed=true;}}
for(const page of pages()){assert.equal(page,1);break;}
assert.equal(closed,true);
const iterator=pages();assert.deepEqual(iterator.next(),{value:1,done:false});
assert.deepEqual(iterator.next(),{value:2,done:false});
assert.deepEqual(iterator.next(),{value:undefined,done:true});
```

**Runtime and expected behavior:** Node 24 ESM; import `assert` from `node:assert/strict`. Breaking the loop executes finally. Manual next calls reveal value/done pairs and completion.

**Interview:** Does a generator run its body immediately when called?

**Answer:** No; calling it returns an iterator. Execution begins when iteration requests a value, and resumes after each yield.

**Change and verify:** Replace the fake pages with an async generator. Prove that breaking the consumer closes the iterator without requesting another page.

[Standalone executable](../../projects/knowledge-base/concept-lab/iteration-cleanup.mjs).

### Executable boundary: Error propagation and finally

An exception transfers control to the nearest compatible catch/finally path. Returning from finally overrides a pending result or exception, which can hide a failed operation.

Concepts: Error handling.

```javascript
function hidden(){try{throw new Error('lost');}finally{return 'masked';}}
assert.equal(hidden(),'masked');
function visible(){try{throw new Error('visible');}finally{/* release resource; no return */}}
assert.throws(visible,/visible/);
const cause=new Error('database offline');const wrapper=new Error('Save failed',{cause});
assert.equal(wrapper.cause,cause);
```

**Runtime and expected behavior:** Node 24 ESM; import `assert` from `node:assert/strict`. The first failure is masked; the second propagates. An Error cause preserves a lower-level failure without copying private details into a public response.

**Interview:** Should an API return the whole caught error?

**Answer:** No. Translate to a stable safe error contract, record permitted diagnostic context privately, and preserve useful causes internally.

**Change and verify:** Add cleanup to a rejected async save. Verify cleanup runs and the caller still observes rejection; avoid returning a success from finally.

[Standalone executable](../../projects/knowledge-base/concept-lab/errors-finally.mjs).

## 🔍 Under the Hood

A closure retains an environment, not an automatic immutable copy of every captured value. A normal method can lose its receiver when passed as a bare callback. Prototype lookup does not imply that arbitrary input should be merged into privileged configuration.

## 🌍 Real-World Usage

Use pure collection transformations to derive a UI list. Use explicit allowlists to build an API update rather than spreading request.body. Compare the toolkit emitter and LRU choices with plain objects.

## ⚠️ Common Mistakes

- Using Boolean(value) to parse the string false.
- Treating const or object spread as deep immutability.
- Using loose coercion for dates, money, or authorization decisions.

## ✅ Best Practices

Use pure collection transformations to derive a UI list. Use explicit allowlists to build an API update rather than spreading request.body. Compare the toolkit emitter and LRU choices with plain objects. State the invariant, validate at the boundary, use the documented runtime, and keep a reproducible failure case. This guide is educational evidence; it does not certify a deployment.

## 🧪 Practice

- Beginner: write a loop that includes zero and explain its termination.
- Intermediate: predict shallow-copy and equality outputs before running them.
- Advanced: implement a generator over a bounded tree and show early termination.
- Challenge: implement an LRU and explain eviction with stored undefined values.

## 🏗️ Mini Project

Build a pure quiz scoring model with explicit invalid-answer behavior, then connect it to a browser form. Add output examples for blank input, duplicate answers, and a changed question order.

[Project ladder and implementation status](../projects/README.md)

## 💼 Interview Questions

<details>
<summary>Beginner: Does const freeze an object?</summary>

No. It prevents rebinding the variable; object properties can still change.

</details>

<details>
<summary>Intermediate: Why does a copied object mutate the original array?</summary>

The copy preserves the nested reference. Replace or clone at the depth required by the domain.

</details>

<details>
<summary>Advanced: How does this differ in an arrow?</summary>

The arrow captures lexical this; an ordinary function derives this from invocation.

</details>

<details>
<summary>Scenario: Memory grows after every page visit.</summary>

Compare heap snapshots and retaining paths for unremoved listeners, unbounded caches, and captured objects.

</details>

<details>
<summary>Debugging: A default value replaces a valid zero.</summary>

Use a nullish check when only null and undefined are missing; || also treats zero and an empty string as falsy.

</details>

<details>
<summary>Output-based: What does the worked example produce, and under which runtime?</summary>

The log values are 2, then 1 and 2. Replace tags with a new array to avoid mutating the original; each makeCounter call creates a distinct environment.

</details>

<details>
<summary>Coding: What would you implement and verify next?</summary>

Build a pure quiz scoring model with explicit invalid-answer behavior, then connect it to a browser form. Add output examples for blank input, duplicate answers, and a changed question order.

</details>

<details>
<summary>Architecture and production: Which internal boundary needs evidence?</summary>

A closure retains an environment, not an automatic immutable copy of every captured value. A normal method can lose its receiver when passed as a bare callback. Prototype lookup does not imply that arbitrary input should be merged into privileged configuration.

</details>

[Difficulty-based interview bank](../../interview-handbook/questions/index.md) · [Scenario practice](../../interview-handbook/scenarios/README.md) · [Debugging library](../debugging/README.md)

## 🔗 Related Concepts

[Promises, event loops, and bounded concurrency](async.md), [DOM, events, and browser APIs](browser.md), [TypeScript and validated application boundaries](typescript.md), [Node.js runtime, resources, and asynchronous services](nodejs.md)

Next: [Promises, event loops, and bounded concurrency](async.md)

Preserved lessons: [notes/javascript.md](../../notes/javascript.md), [04-javascript/notes.md](../../04-javascript/notes.md)

# 📚 External Resources

## 🥇 Official Documentation

[Primary documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide) — authoritative reference; use the installed runtime/library version.

## 📘 Recommended Articles

[Focused guide](https://javascript.info/) — deepen the mental model and compare its examples with this guide.

## 🎥 Recommended YouTube Videos

See the [verified media register](../resources/VIDEOS.md). A topic without a verified topical video uses written official documentation; unverified recommendations are not padded into this section.

## 🧪 Practice Resources

[Local project ladder](../projects/README.md) · [Timed exercises](../../interview-handbook/machine-coding/README.md)

## 📚 Further Reading

[Curated external register](../resources/README.md) — authority, level, best use, last check, and retrieval limitations.

## 🔄 Last Verified

2026-10-08 — documentation reviewed; example runtime and execution scope are stated above.

[TC39 proposal register](https://github.com/tc39/proposals) — checked 2026-10-08; proposal status is not a guarantee of shipped runtime support.
