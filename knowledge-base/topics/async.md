<!-- kb-metadata: {"conceptIds": ["async--callbacks", "async--promises", "async--async-await", "async--event-loop", "async--microtasks", "async--macrotasks", "async--fetch", "async--async-programming"], "difficulty": "Beginner", "estimatedMinutes": 180, "id": "async", "importance": 5, "lastVerified": "2026-10-08", "legacyPaths": [], "path": "knowledge-base/topics/async.md", "prerequisites": ["javascript"], "priority": "P0", "related": ["browser", "nodejs", "testing"], "status": "authored-guide", "title": "Promises, event loops, and bounded concurrency"} -->
# Promises, event loops, and bounded concurrency

Priority: P0 — 🔥 Essential / Master

Difficulty: Beginner

Importance: 5/5

Prerequisites: [JavaScript values, scope, functions, and collections](javascript.md)

Estimated learning time: 180 minutes for explanation and initial practice; independent mastery takes repeated application.

[Knowledge base](../README.md) · [Coverage](../COVERAGE.md) · [Learning paths](../paths/README.md)

## 🎯 Learning Objectives

Explain the mental model, trace the worked example, reproduce a failure, and demonstrate the acceptance checks in the mini-project. Individual concepts below have their own priorities and depth labels.

## 🧠 What Is It?

A callback is a function another operation invokes; it can run synchronously or asynchronously according to that contract.

## Concept reference and priorities

<a id="callbacks"></a>
### Callbacks

**P0 · 🔥 Essential / Master · worked-example**

A callback is a function another operation invokes; it can run synchronously or asynchronously according to that contract.

<a id="promises"></a>
### Promises

**P0 · 🔥 Essential / Master · worked-example**

A Promise represents an eventual outcome. Chaining transforms outcomes and propagates failures.

<a id="async-await"></a>
### async/await

**P0 · 🔥 Essential / Master · worked-example**

An async function returns a Promise; await suspends that function until the awaited outcome is available.

<a id="event-loop"></a>
### Event loop

**P0 · 🔥 Essential / Master · worked-example**

A host coordinates execution and queued work. Browser rendering and Node phases have distinct scheduling models.

<a id="microtasks"></a>
### Microtasks

**P1 · ⭐ Highly Important · worked-example**

Promise reactions and queueMicrotask callbacks run at host-defined checkpoints after the current work.

<a id="macrotasks"></a>
### Macrotasks

**P1 · ⭐ Highly Important · worked-example**

Task is the browser-standard term; timers and other task sources schedule later work with no exact execution-time guarantee.

<a id="fetch"></a>
### Fetch

**P0 · 🔥 Essential / Master · worked-example**

Fetch produces an HTTP response or transport failure; the application still checks status and parses the expected representation.

<a id="async-programming"></a>
### Async programming

**P0 · 🔥 Essential / Master · worked-example**

Design ordering, cancellation, concurrency limits, timeouts, and partial-failure behavior explicitly.

## ❓ Why Does It Exist?

Parallel work can reduce waiting but overwhelm a database or remote service. Waiting for every request is different from limiting how many requests start at once.

## ⚙️ How Does It Work?

A Promise executor runs immediately; its reactions run later. Promise.all waits on already-started inputs and rejects on the first rejection without canceling peers. allSettled retains each outcome. await does not make synchronous CPU work leave the current thread. For cancellation, pass a supported signal and define what happens to already-committed server work.

## 💻 Examples

### 1. Trace the contract

```javascript
console.log('A');
Promise.resolve().then(() => console.log('B'));
queueMicrotask(() => console.log('C'));
setTimeout(() => console.log('D'), 0);
console.log('E');
```

Expected behavior and runtime: For this ordinary top-level browser script: A, E, B, C, D. Do not extrapolate this small example to every Node phase, nested task source, or rendering opportunity.

### 2. Extend and stress the contract

Intermediate: compare fail-fast and all-settled batch contracts. Advanced: test the maximum active count with an injected deferred task. Record the expected result before implementation; use the failure analysis below to distinguish the broken boundary.

### Executable boundary: Promise settlement and concurrent outcomes

Promise.all is fail-fast at its observation boundary; it does not cancel work already started. allSettled collects independent successes and failures. Await catches rejection where it is awaited.

Concepts: Promises, async/await, Async programming.

```javascript
let completed=0;
const later=new Promise(resolve=>setTimeout(()=>{completed++;resolve('saved');},5));
await assert.rejects(Promise.all([Promise.reject(new Error('failure')),later]),/failure/);
assert.equal(await later,'saved');assert.equal(completed,1);
const outcomes=await Promise.allSettled([Promise.resolve(3),Promise.reject('offline')]);
assert.deepEqual(outcomes.map(row=>row.status),['fulfilled','rejected']);
assert.equal(outcomes[0].value,3);assert.equal(outcomes[1].reason,'offline');
assert.equal(await Promise.resolve(1).then(n=>n+1).finally(()=>99),2);
```

**Runtime and expected behavior:** Node 24 ESM; import `assert` from `node:assert/strict`. all rejects, yet the already-started later operation completes. allSettled returns both outcomes. A normally returning finally preserves the previous result.

**Interview:** Is Promise.all a concurrency limiter?

**Answer:** No. If requests are created before it is called, those requests have already started. Limit admission with a bounded worker pool.

**Change and verify:** Use the tested promise pool in js-toolkit with a cap of two; instrument active work and prove its maximum does not exceed the cap.

[Standalone executable](../../projects/knowledge-base/concept-lab/promise-outcomes.mjs).

### Executable boundary: Tasks and microtasks in an ESM trace

Synchronous work finishes before queued Promise callbacks and queueMicrotask callbacks run. A later timer task sees the microtask queue drained. This example deliberately avoids ambiguous sibling timer/immediate ordering.

Concepts: Event loop, Microtasks, Macrotasks, Callbacks.

```javascript
const order=[];
order.push('sync');
queueMicrotask(()=>order.push('microtask'));
Promise.resolve().then(()=>{order.push('promise');queueMicrotask(()=>order.push('nested'));});
await new Promise(resolve=>setTimeout(()=>{order.push('timer');resolve();},0));
assert.deepEqual(order,['sync','microtask','promise','nested','timer']);
```

**Runtime and expected behavior:** Node 24 ESM; import `assert` from `node:assert/strict`. sync, microtask, promise, nested, timer under Node 24 ESM. Promise jobs and explicit microtasks run in enqueue order in this trace.

**Interview:** Why can recursively queued microtasks freeze a browser?

**Answer:** They can prevent the queue from draining and delay rendering and later tasks. Break large work into bounded chunks or move suitable CPU work to a worker.

**Change and verify:** Add a microtask inside the first microtask. Predict the full ordering before running; do not infer an ordering between all host scheduling APIs.

[Standalone executable](../../projects/knowledge-base/concept-lab/microtask-order.mjs).

### Executable boundary: AbortSignal and cooperative cancellation

Cancellation is a signal observed by an operation. Promise.race by itself only chooses an outcome; it does not stop the losing operation. Fetch accepts a signal, while your own functions must implement cleanup.

Concepts: Fetch, Async programming.

```javascript
function wait(signal){return new Promise((resolve,reject)=>{
 if(signal.aborted){reject(signal.reason);return;}
 const abort=()=>{clearTimeout(timer);reject(signal.reason);};
 const timer=setTimeout(()=>{signal.removeEventListener('abort',abort);resolve('done');},100);
 signal.addEventListener('abort',abort,{once:true});
});}
const controller=new AbortController(),work=wait(controller.signal);
controller.abort(new Error('superseded'));await assert.rejects(work,/superseded/);
await assert.rejects(wait(controller.signal),/superseded/);
```

**Runtime and expected behavior:** Node 24 ESM; import `assert` from `node:assert/strict`. Both in-flight and already-aborted requests reject with superseded. The timer is canceled and the registered listener is one-shot.

**Interview:** Is aborting enough to protect a search UI from stale results?

**Answer:** No. The operation might already have completed or might ignore the signal. Also compare a request generation before committing its result; the weather/browser fixtures demonstrate that boundary.

**Change and verify:** Replace the timer with a controllable fake provider. Resolve the old request after the new one and prove the old result never replaces the current view.

[Standalone executable](../../projects/knowledge-base/concept-lab/abort-contract.mjs).

## 🔍 Under the Hood

The call stack must finish before these queued reactions execute. A chain that continually adds microtasks can postpone other work. Timer delay is a lower-bound scheduling condition, not a promise of an exact deadline.

## 🌍 Real-World Usage

Use the tested promisePool to process a batch with a concurrency cap and input-order results. Use an AbortController and a request generation to prevent older search results from replacing newer UI state.

## ⚠️ Common Mistakes

- Starting every fetch before passing the promises to a purported concurrency limiter.
- Assuming Promise.all cancels the losing requests.
- Blocking an API with expensive synchronous work inside an async function.

## ✅ Best Practices

Use the tested promisePool to process a batch with a concurrency cap and input-order results. Use an AbortController and a request generation to prevent older search results from replacing newer UI state. State the invariant, validate at the boundary, use the documented runtime, and keep a reproducible failure case. This guide is educational evidence; it does not certify a deployment.

## 🧪 Practice

- Beginner: predict the five log lines before running the example.
- Intermediate: compare fail-fast and all-settled batch contracts.
- Advanced: test the maximum active count with an injected deferred task.
- Challenge: design timeout and cancellation outcomes for already-running tasks without losing result order.

## 🏗️ Mini Project

Extend the toolkit promise pool with a documented abort policy. Acceptance: no new tasks after abort, existing tasks accounted for, bounded active work, and stable result ordering.

[Project ladder and implementation status](../projects/README.md)

## 💼 Interview Questions

<details>
<summary>Beginner: What does an async function return?</summary>

A Promise, including when the function returns a plain value.

</details>

<details>
<summary>Intermediate: Does await parallelize a loop?</summary>

No. Awaiting each iteration usually serializes starts; choose controlled concurrency explicitly.

</details>

<details>
<summary>Advanced: Can Promise.allSettled bound load?</summary>

No. It collects outcomes from inputs; a worker or scheduler must limit when tasks start.

</details>

<details>
<summary>Scenario: An old search response wins.</summary>

Associate data with the current query and discard stale results; cancellation alone is not an ordering proof.

</details>

<details>
<summary>Debugging: A timer runs late.</summary>

Inspect blocking JavaScript, microtask starvation, and host scheduling; a timer is not an exact real-time guarantee.

</details>

<details>
<summary>Output-based: What does the worked example produce, and under which runtime?</summary>

For this ordinary top-level browser script: A, E, B, C, D. Do not extrapolate this small example to every Node phase, nested task source, or rendering opportunity.

</details>

<details>
<summary>Coding: What would you implement and verify next?</summary>

Extend the toolkit promise pool with a documented abort policy. Acceptance: no new tasks after abort, existing tasks accounted for, bounded active work, and stable result ordering.

</details>

<details>
<summary>Architecture and production: Which internal boundary needs evidence?</summary>

The call stack must finish before these queued reactions execute. A chain that continually adds microtasks can postpone other work. Timer delay is a lower-bound scheduling condition, not a promise of an exact deadline.

</details>

[Difficulty-based interview bank](../../interview-handbook/questions/index.md) · [Scenario practice](../../interview-handbook/scenarios/README.md) · [Debugging library](../debugging/README.md)

## 🔗 Related Concepts

[DOM, events, and browser APIs](browser.md), [Node.js runtime, resources, and asynchronous services](nodejs.md), [Behavioral testing across units, databases, and browsers](testing.md)

Next: [DOM, events, and browser APIs](browser.md)

# 📚 External Resources

## 🥇 Official Documentation

[Primary documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises) — authoritative reference; use the installed runtime/library version.

## 📘 Recommended Articles

[Focused guide](https://javascript.info/async) — deepen the mental model and compare its examples with this guide.

## 🎥 Recommended YouTube Videos

See the [verified media register](../resources/VIDEOS.md). A topic without a verified topical video uses written official documentation; unverified recommendations are not padded into this section.

## 🧪 Practice Resources

[Local project ladder](../projects/README.md) · [Timed exercises](../../interview-handbook/machine-coding/README.md)

## 📚 Further Reading

[Curated external register](../resources/README.md) — authority, level, best use, last check, and retrieval limitations.

## 🔄 Last Verified

2026-10-08 — documentation reviewed; example runtime and execution scope are stated above.
