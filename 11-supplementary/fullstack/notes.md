# Full Stack MERN teaching notes

## What and why

A feature spans UI, API and persistence. The UI communicates state; the server validates and authorizes; the database preserves invariants. Show loading, empty and failure states distinctly. Confirm a durable write before reporting success unless optimistic rollback is explicitly implemented.

## Prerequisites

React, API, database and security tracks. Concepts: Integration, persistence, API contracts, verification.

## How and syntax

```javascript
async function loadCourses() {
  const r = await fetch('/api/courses');
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  const data = await r.json();
  if (!Array.isArray(data)) throw new TypeError('Expected array');
  return data;
}
```

Run context and expected output: Client integration snippet; requires a working server. Caller must present loading, error and empty states.

## Trace the example

Identify where input enters, which operation controls the result and how output becomes observable. Predict the result before executing. Change one value, repeat, and explain the difference. For malformed input, record whether the example handles it or whether a guard must be added; do not assume a short demonstration is a complete application.

## When to use

Use these concepts for course directory slice: Load persisted courses through Express into React; show loading/error. Start with a single fixture and increase complexity after the expected result is visible.

## When not to use

Choose the smallest architecture meeting requirements. Do not add a database for a static document, or use browser-only state for shared private records. Do not introduce advanced libraries before you can explain the equivalent core operation. This track extends the syllabus; complete core prerequisites first.

## Real-world use case

Equipment reservations: Book available equipment; prevent overbooking atomically. Expected result: Two requests for last item allow one success.

## Common mistakes

- Running the example in the wrong environment: Client integration snippet; requires a working server. Caller must present loading, error and empty states.
- Treating one successful input as proof of correctness. Add a missing case and a boundary case.
- Copying a fragment without its data or host application; consult the setup guide.
- Confusing a project specification or demonstration with a completed student submission.

## Best practices

Make assumptions explicit. Keep fixtures small and fictional. Separate input validation from the central operation. Name values by their role. Verify the result after every small change. In class, ask learners to predict, run and explain rather than copy output. During debugging, find the first point where actual behavior diverges from the expected result.

## Practice

1. Reproduce the worked example and its expected output.
2. Implement load persisted courses through express into react.
3. Add validate rating on server.
4. Describe and test the acceptance example: Deleting one item preserves others.

## Interview preparation

[Questions and answer guidance](../../interview-preparation/fullstack.md).

## Further examples and reference

[Existing topic guide](../../projects/fullstack-projects/README.md); [daily practice](../../daily-practice/fullstack/README.md); [official documentation](../../resources/teaching-references.md).
