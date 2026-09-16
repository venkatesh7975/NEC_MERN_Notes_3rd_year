# JavaScript teaching notes

## What and why

Values have types; strict equality avoids implicit conversion during comparisons. Conditions select a path; loops repeat with explicit stopping rules. Convert input deliberately and reject invalid numbers. Functions, arrays and DOM events are teaching bridges needed before React, beyond the visible syllabus cell.

## Prerequisites

HTML and CSS. Concepts: Data types, operators, conditions, loops.

## How and syntax

```javascript
function parity(n) {
  if (!Number.isInteger(n)) throw new TypeError('Integer required');
  return n % 2 === 0 ? 'even' : 'odd';
}
console.log([0,1,2,3].map(parity));
```

Run context and expected output: Run in Node: even, odd, even, odd. Passing NaN throws.

## Trace the example

Identify where input enters, which operation controls the result and how output becomes observable. Predict the result before executing. Change one value, repeat, and explain the difference. For malformed input, record whether the example handles it or whether a guard must be added; do not assume a short demonstration is a complete application.

## When to use

Use these concepts for attendance eligibility calculator: Validate present and total counts; compute percentage; use a 75 percent practice threshold. Start with a single fixture and increase complexity after the expected result is visible.

## When not to use

Choose the smallest architecture meeting requirements. Do not add a database for a static document, or use browser-only state for shared private records. Do not introduce advanced libraries before you can explain the equivalent core operation. Advanced exercises in the project bank extend core coverage and belong in independent practice.

## Real-world use case

Library checkout tracker: Add and return books by ID; prevent a second checkout of the same copy. Expected result: Checkout B1 twice leaves exactly one active loan.

## Common mistakes

- Running the example in the wrong environment: Run in Node: even, odd, even, odd. Passing NaN throws.
- Treating one successful input as proof of correctness. Add a missing case and a boundary case.
- Copying a fragment without its data or host application; consult the setup guide.
- Confusing a project specification or demonstration with a completed student submission.

## Best practices

Make assumptions explicit. Keep fixtures small and fictional. Separate input validation from the central operation. Name values by their role. Verify the result after every small change. In class, ask learners to predict, run and explain rather than copy output. During debugging, find the first point where actual behavior diverges from the expected result.

## Practice

1. Reproduce the worked example and its expected output.
2. Implement validate present and total counts.
3. Add convert celsius to fahrenheit and back.
4. Describe and test the acceptance example: 0 is even; 5 is odd and a multiple of five.

## Interview preparation

[Questions and answer guidance](../interview-preparation/javascript.md).

## Further examples and reference

[Existing topic guide](../notes/javascript.md); [daily practice](../daily-practice/javascript/README.md); [official documentation](../resources/teaching-references.md).
