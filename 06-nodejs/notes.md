# Node.js teaching notes

## What and why

Node executes JavaScript outside the browser. CommonJS and ES modules have different loading conventions. NPM manages packages and scripts. Await suspends its async function while other work can continue. Synchronous CPU-heavy work can still block the event loop. The printed syllabus ends at Event; event emitters are an explicit teaching interpretation.

## Prerequisites

JavaScript functions and promises. Concepts: Module system, NPM, asynchronous programming, events.

## How and syntax

```javascript
const { readFile } = require('node:fs/promises');
readFile(process.argv[2], 'utf8').then(JSON.parse).then(data => {
  if (!Array.isArray(data)) throw new TypeError('Array required');
  console.log(data.length);
}).catch(err => { console.error(err.message); process.exitCode = 1; });
```

Run context and expected output: Save as reader.cjs; node reader.cjs roster.json prints 2 for [{"id":1},{"id":2}].

## Trace the example

Identify where input enters, which operation controls the result and how output becomes observable. Predict the result before executing. Change one value, repeat, and explain the difference. For malformed input, record whether the example handles it or whether a guard must be added; do not assume a short demonstration is a complete application.

## When to use

Use these concepts for module fee calculator: Export a pure calculation; validate arguments; import from CLI. Start with a single fixture and increase complexity after the expected result is visible.

## When not to use

Choose the smallest architecture meeting requirements. Do not add a database for a static document, or use browser-only state for shared private records. Do not introduce advanced libraries before you can explain the equivalent core operation. Advanced exercises in the project bank extend core coverage and belong in independent practice.

## Real-world use case

Parallel resource loader: Read three files with allSettled; retain successful results. Expected result: One missing file does not discard two successes.

## Common mistakes

- Running the example in the wrong environment: Save as reader.cjs; node reader.cjs roster.json prints 2 for [{"id":1},{"id":2}].
- Treating one successful input as proof of correctness. Add a missing case and a boundary case.
- Copying a fragment without its data or host application; consult the setup guide.
- Confusing a project specification or demonstration with a completed student submission.

## Best practices

Make assumptions explicit. Keep fixtures small and fictional. Separate input validation from the central operation. Name values by their role. Verify the result after every small change. In class, ask learners to predict, run and explain rather than copy output. During debugging, find the first point where actual behavior diverges from the expected result.

## Practice

1. Reproduce the worked example and its expected output.
2. Implement export a pure calculation.
3. Add provide greet and check scripts.
4. Describe and test the acceptance example: Two records print 2; missing file exits nonzero.

## Interview preparation

[Questions and answer guidance](../interview-preparation/nodejs.md).

## Further examples and reference

[Existing topic guide](../notes/node.md); [daily practice](../daily-practice/nodejs/README.md); [official documentation](../resources/teaching-references.md).
