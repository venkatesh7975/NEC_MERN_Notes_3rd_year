# Executable concept boundaries

Fourteen original Node 24 ESM fixtures demonstrate output, failure and cleanup boundaries. Each file is standalone with explicit assertions. Run `npm run test:concepts` from the repository root or `node <file>` individually. Read the matching canonical guide, predict the result, then change an input. These examples cover specific contracts; they do not certify every related runtime API.

- [Scope and closure capture](scope-capture.mjs) — [explanation and assessment](../../../knowledge-base/topics/javascript.md); Scope, Closures, Control flow.
- [Hoisting and the temporal dead zone](hoisting-tdz.mjs) — [explanation and assessment](../../../knowledge-base/topics/javascript.md); Hoisting, Variables.
- [Method receiver and explicit binding](receiver-binding.mjs) — [explanation and assessment](../../../knowledge-base/topics/javascript.md); this, Functions, Objects.
- [Prototypes, inheritance and property descriptors](prototype-properties.mjs) — [explanation and assessment](../../../knowledge-base/topics/javascript.md); Prototypes, Inheritance, Objects.
- [Copy depth and array transformations](copy-and-arrays.mjs) — [explanation and assessment](../../../knowledge-base/topics/javascript.md); Arrays, Spread/rest, Destructuring, Memory.
- [Coercion, equality and numeric limits](coercion-numbers.mjs) — [explanation and assessment](../../../knowledge-base/topics/javascript.md); Data types, Operators, Fundamentals.
- [Iterators and generator cleanup](iteration-cleanup.mjs) — [explanation and assessment](../../../knowledge-base/topics/javascript.md); Iterators, Generators.
- [JSON boundaries and lost information](structured-data.mjs) — [explanation and assessment](../../../knowledge-base/topics/foundations.md); JSON.
- [Promise settlement and concurrent outcomes](promise-outcomes.mjs) — [explanation and assessment](../../../knowledge-base/topics/async.md); Promises, async/await, Async programming.
- [Tasks and microtasks in an ESM trace](microtask-order.mjs) — [explanation and assessment](../../../knowledge-base/topics/async.md); Event loop, Microtasks, Macrotasks, Callbacks.
- [Error propagation and finally](errors-finally.mjs) — [explanation and assessment](../../../knowledge-base/topics/javascript.md); Error handling.
- [EventEmitter is synchronous](emitter-boundary.mjs) — [explanation and assessment](../../../knowledge-base/topics/nodejs.md); Events, EventEmitter, Error handling.
- [Stream teardown and bytes](stream-cancellation.mjs) — [explanation and assessment](../../../knowledge-base/topics/nodejs.md); Streams, Buffers, Async programming.
- [AbortSignal and cooperative cancellation](abort-contract.mjs) — [explanation and assessment](../../../knowledge-base/topics/async.md); Fetch, Async programming.
