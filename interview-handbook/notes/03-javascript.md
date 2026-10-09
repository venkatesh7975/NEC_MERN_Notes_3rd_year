# JavaScript values closures and asynchronous work

[Handbook](../README.md) | [Practice questions](../questions/javascript.md)

Read this guide, run the example, and demonstrate the exercise before moving on. These notes supplement the original classroom modules.

## Model values and identities

Objects are compared by identity; two objects with equal-looking properties are distinct. const prevents binding reassignment while nested mutation remains possible. Copy only the parts you change and define how missing, null, zero, and empty string differ in your domain.

Use explicit conversions for user input. Number("") is zero, which is often not an intended amount. Validate the original text and reject nonfinite values.

## Use lexical scope

Closures retain access to their defining environment. A callback can retain large data or capture an earlier value. Normal functions get this from how they are called; arrows capture it from their surroundings.

Practice tracing small examples before running them. Explain the invocation, environment, and value rather than memorizing console output.

## Control asynchronous operations

Promises describe eventual completion. Awaiting an operation suspends that async function, not the entire runtime. Promise.all preserves input ordering but does not cancel peers after failure.

Debounce user input, cancel obsolete requests, and bound parallel work. Timeouts and retry policies need an explicit contract. Treat a timeout of a write as an uncertain outcome until the server confirms it.

## Worked example

```js
console.log("A");
setTimeout(() => console.log("D"), 0);
Promise.resolve().then(() => console.log("C"));
console.log("B");
// In a normal browser script: A B C D.
```

## Demonstrate understanding

Implement debounce, LRU, and a promise pool using the contracts and tests in the JavaScript project.

## Reference

[Primary learning reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide). Prefer the documentation matching the version you install.
