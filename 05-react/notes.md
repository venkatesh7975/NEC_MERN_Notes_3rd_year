# React teaching notes

## What and why

A component describes an interface using JSX. Props arrive from its parent; state holds local memory. Event handlers request state changes. Render computes the interface and commit updates the DOM. Derive values such as filtered lists from source state rather than maintaining duplicate state. Effects synchronize external systems when needed; they are not required for every calculation.

## Prerequisites

JavaScript functions, arrays and events. Concepts: JSX, components, props, state, events.

## How and syntax

```jsx
import { useState } from 'react';
export default function App() {
  const [saved, setSaved] = useState(false);
  return <button aria-pressed={saved} onClick={() => setSaved(s => !s)}>{saved ? 'Saved' : 'Save'}</button>;
}
```

Run context and expected output: Use as src/App.jsx in a React host; two clicks restore Save.

## Trace the example

Identify where input enters, which operation controls the result and how output becomes observable. Predict the result before executing. Change one value, repeat, and explain the difference. For malformed input, record whether the example handles it or whether a guard must be added; do not assume a short demonstration is a complete application.

## When to use

Use these concepts for course badge gallery: Render three components with title and level props; use stable IDs. Start with a single fixture and increase complexity after the expected result is visible.

## When not to use

Choose the smallest architecture meeting requirements. Do not add a database for a static document, or use browser-only state for shared private records. Do not introduce advanced libraries before you can explain the equivalent core operation. Advanced exercises in the project bank extend core coverage and belong in independent practice.

## Real-world use case

Lesson completion dashboard: Store completed lesson IDs; derive progress; support undo. Expected result: Two completed lessons of four produce 50 percent.

## Common mistakes

- Running the example in the wrong environment: Use as src/App.jsx in a React host; two clicks restore Save.
- Treating one successful input as proof of correctness. Add a missing case and a boundary case.
- Copying a fragment without its data or host application; consult the setup guide.
- Confusing a project specification or demonstration with a completed student submission.

## Best practices

Make assumptions explicit. Keep fixtures small and fictional. Separate input validation from the central operation. Name values by their role. Verify the result after every small change. In class, ask learners to predict, run and explain rather than copy output. During debugging, find the first point where actual behavior diverges from the expected result.

## Practice

1. Reproduce the worked example and its expected output.
2. Implement render three components with title and level props.
3. Add toggle saved state.
4. Describe and test the acceptance example: Increment at 30 keeps 30.

## Interview preparation

[Questions and answer guidance](../interview-preparation/react.md).

## Further examples and reference

[Existing topic guide](../notes/react.md); [daily practice](../daily-practice/react/README.md); [official documentation](../resources/teaching-references.md).
