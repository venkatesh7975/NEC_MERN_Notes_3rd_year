# Javascript interview questions

[Handbook](../README.md) | [All question ids](index.md)

Difficulty is an editorial learning classification. Questions are original practice, not a company question leak. Cover the answer before attempting recall.

## Q011 Easy - What does const guarantee?

<details>
<summary>Answer and follow-up</summary>

const prevents reassignment of the binding. It does not freeze the object it references. const user = {name:"A"}; user.name = "B" is valid. Object.freeze is shallow, so nested objects still need an explicit immutability strategy.

**Follow-up:** What is the temporal dead zone?

</details>

## Q012 Easy - Compare strict equality and Object.is.

<details>
<summary>Answer and follow-up</summary>

Strict equality avoids type coercion, considers +0 and -0 equal, and considers NaN unequal to itself. Object.is considers NaN equal to itself and distinguishes signed zeros. Choose a comparison that matches the domain rather than assuming one is universally better.

**Follow-up:** What does a Set do with NaN?

</details>

## Q013 Easy - Explain a closure with a useful example.

<details>
<summary>Answer and follow-up</summary>

A function retains access to the lexical environment where it was created. A counter factory can keep a private count and return an increment function. Two factory calls create separate environments. Closures are also why an old callback may see an earlier render value.

**Follow-up:** Can a closure retain a large object?

</details>

## Q014 Medium - Predict synchronous logs, a promise, and a timer.

<details>
<summary>Answer and follow-up</summary>

In a normal browser script, synchronous code finishes first. Promise reaction jobs run at the microtask checkpoint before the next timer task. setTimeout(fn,0) makes a callback eligible later; it does not interrupt the current stack. Do not generalize this ordering to every Node phase.

**Follow-up:** Can recursive microtasks starve rendering?

</details>

## Q015 Medium - Why does spreading an object not deep clone it?

<details>
<summary>Answer and follow-up</summary>

Object spread copies own enumerable properties into a new object. Nested object references still point to the same objects. structuredClone supports many structured values but cannot clone functions. For React state, copy only the path being changed or use an appropriate immutable update tool.

**Follow-up:** What happens to a Date in JSON serialization?

</details>

## Q016 Medium - Compare debounce and throttle.

<details>
<summary>Answer and follow-up</summary>

Debounce waits for a quiet period and is useful for search inputs. Throttle limits execution frequency and is useful for continuous scroll work. Specify leading and trailing behavior, cancellation, and what happens to this and arguments; those are part of the function contract.

**Follow-up:** How would you flush the pending call?

</details>

## Q017 Medium - Compare Promise.all and Promise.allSettled.

<details>
<summary>Answer and follow-up</summary>

Promise.all resolves with ordered results only when every input fulfills and rejects when an input rejects. It does not cancel other operations. allSettled waits for all inputs and reports each outcome. Bound concurrency for large input lists instead of starting thousands at once.

**Follow-up:** How can AbortController help cancellation?

</details>

## Q018 Hard - How does this behave in arrow functions?

<details>
<summary>Answer and follow-up</summary>

An arrow function captures this lexically. A normal function gets this from the invocation form, such as obj.method(), and a detached method loses that receiver. bind creates a function with a fixed receiver. Arrow functions cannot be constructors.

**Follow-up:** Why can an arrow method be wrong on a prototype?

</details>

## Q019 Hard - How would you implement an LRU cache?

<details>
<summary>Answer and follow-up</summary>

Use a Map for insertion order. On get, remove and reinsert the entry to mark it recent. On set, replace any existing entry and evict the first key when over capacity. Average operations are constant time under the usual hash-map model. Validate capacity and distinguish missing keys from stored undefined.

**Follow-up:** How would you add TTL without unbounded timers?

</details>

## Q020 Hard - What causes memory leaks in browser code?

<details>
<summary>Answer and follow-up</summary>

A leak is memory retained longer than needed: global caches with no eviction, listeners on long-lived objects, timers holding closures, or subscriptions not removed. Compare heap snapshots after repeating a flow. Removing a DOM node alone does not release references held elsewhere.

**Follow-up:** How would you prove that a fix works?

</details>
