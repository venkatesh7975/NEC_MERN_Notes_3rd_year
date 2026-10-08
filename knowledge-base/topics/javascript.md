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

**P0 · 🔥 Essential / Master · reference**

JavaScript evaluates expressions and statements using a language-defined value model and host-provided APIs.

<a id="variables"></a>
### Variables

**P0 · 🔥 Essential / Master · worked-example**

Bindings associate names with values; const prevents reassignment of a binding, not mutation of its object.

<a id="data-types"></a>
### Data types

**P0 · 🔥 Essential / Master · reference**

Primitives and objects have different identity behavior. undefined, null, numbers, strings, booleans, bigint, and symbols need explicit handling.

<a id="operators"></a>
### Operators

**P0 · 🔥 Essential / Master · reference**

Operators combine or compare values; coercion, short-circuiting, and nullish behavior affect results.

<a id="control-flow"></a>
### Control flow

**P0 · 🔥 Essential / Master · reference**

Conditions, loops, return, break, and continue select which work runs and when iteration ends.

<a id="functions"></a>
### Functions

**P0 · 🔥 Essential / Master · worked-example**

Functions define callable behavior, parameters, return values, and closures over lexical bindings.

<a id="scope"></a>
### Scope

**P0 · 🔥 Essential / Master · reference**

Lexical scope resolves names from where code is written, not from whichever function called it.

<a id="closures"></a>
### Closures

**P0 · 🔥 Essential / Master · worked-example**

A function retains access to its lexical environment, including bindings whose values can change.

<a id="hoisting"></a>
### Hoisting

**P1 · ⭐ Highly Important · reference**

Declarations are instantiated before evaluation, but initialization timing differs; let and const have a temporal dead zone.

<a id="this"></a>
### this

**P1 · ⭐ Highly Important · reference**

Ordinary function this depends on invocation; arrows capture the surrounding this and cannot be rebound with call.

<a id="objects"></a>
### Objects

**P0 · 🔥 Essential / Master · worked-example**

Objects group properties and have identity; spreading creates a shallow copy of own enumerable properties.

<a id="arrays"></a>
### Arrays

**P0 · 🔥 Essential / Master · reference**

Arrays hold indexed collections; map transforms, filter selects, and reduce accumulates values.

<a id="destructuring"></a>
### Destructuring

**P1 · ⭐ Highly Important · reference**

Destructuring binds values from structured data; defaults apply to undefined rather than every falsy value.

<a id="spread-rest"></a>
### Spread/rest

**P1 · ⭐ Highly Important · worked-example**

Spread expands values; rest collects remaining arguments or properties. Object spread does not deeply clone nested objects.

<a id="prototypes"></a>
### Prototypes

**P2 · 📚 Useful · reference**

Property lookup can follow a prototype chain after own properties are checked.

<a id="classes"></a>
### Classes

**P2 · 📚 Useful · reference**

Classes provide syntax around constructors and prototype-based methods, with additional class-specific semantics.

<a id="inheritance"></a>
### Inheritance

**P2 · 📚 Useful · reference**

Inheritance reuses behavior through type or prototype relationships; composition can avoid rigid hierarchies.

<a id="modules"></a>
### Modules

**P0 · 🔥 Essential / Master · reference**

Modules make dependencies and exports explicit; ESM and CommonJS have different loading and interoperability rules.

<a id="error-handling"></a>
### Error handling

**P0 · 🔥 Essential / Master · reference**

Throw, try/catch, and Promise rejection represent failures; handle errors at a boundary that can act.

<a id="memory"></a>
### Memory

**P1 · ⭐ Highly Important · reference**

Retained references determine whether objects remain reachable; caches, listeners, and closures can retain large graphs.

<a id="garbage-collection"></a>
### Garbage collection

**P2 · 📚 Useful · reference**

The engine reclaims unreachable objects; collection timing is not a portable application guarantee.

<a id="iterators"></a>
### Iterators

**P2 · 📚 Useful · reference**

An iterator returns successive value/done results; iterable protocols allow for-of and spread to consume sequences.

<a id="generators"></a>
### Generators

**P3 · 🧩 Advanced / Specialized · reference**

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
