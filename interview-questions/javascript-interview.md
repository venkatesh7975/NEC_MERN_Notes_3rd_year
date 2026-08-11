# JavaScript ES6+ Interview Questions & Answers

### Q1: How does the JavaScript Event Loop work?
**Answer**: JavaScript is single-threaded. Synchronous code executes in the Call Stack. Asynchronous callbacks (Promises, Timers, Fetch) are offloaded to Web APIs. Resolved Promises enter the Microtask Queue; timers enter the Task Queue. When the Call Stack clears, the Event Loop pushes microtasks first, then tasks back to the stack.

### Q2: What is Closure in JavaScript?
**Answer**: A closure is the combination of a function bundled together with references to its surrounding lexical state. Closures give inner functions access to an outer function's scope even after the outer function has returned.

### Q3: What is the difference between `var`, `let`, and `const`?
**Answer**: `var` is function-scoped and hoisted with `undefined`. `let` and `const` are block-scoped and live in the Temporal Dead Zone until initialized. `const` creates immutable reference bindings.
