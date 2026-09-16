# Web foundations teaching notes

## What and why

A static resource is served as stored; a dynamic response depends on application state or input. A static frontend may call a dynamic API. The browser renders and collects interaction, the server applies rules, and the database persists records.

## Prerequisites

No programming prerequisites. Concepts: URL, request, response, frontend, backend.

## How and syntax

```javascript
const u = new URL('https://example.test/courses?page=2');
console.log(u.pathname, u.searchParams.get('page'));
```

Run context and expected output: Run in Node or the browser console; expect /courses 2.

## Trace the example

Identify where input enters, which operation controls the result and how output becomes observable. Predict the result before executing. Change one value, repeat, and explain the difference. For malformed input, record whether the example handles it or whether a guard must be added; do not assume a short demonstration is a complete application.

## When to use

Use these concepts for request diary: Record five local page requests with method, path, status and content type; distinguish a cached response from a fresh one. Start with a single fixture and increase complexity after the expected result is visible.

## When not to use

Choose the smallest architecture meeting requirements. Do not add a database for a static document, or use browser-only state for shared private records. Do not introduce advanced libraries before you can explain the equivalent core operation. Advanced exercises in the project bank extend core coverage and belong in independent practice.

## Real-world use case

URL anatomy explorer: Parse five sample URLs with the URL API; print protocol, host, pathname and query values. Expected result: https://example.test/courses?page=2 yields page 2.

## Common mistakes

- Running the example in the wrong environment: Run in Node or the browser console; expect /courses 2.
- Treating one successful input as proof of correctness. Add a missing case and a boundary case.
- Copying a fragment without its data or host application; consult the setup guide.
- Confusing a project specification or demonstration with a completed student submission.

## Best practices

Make assumptions explicit. Keep fixtures small and fictional. Separate input validation from the central operation. Name values by their role. Verify the result after every small change. In class, ask learners to predict, run and explain rather than copy output. During debugging, find the first point where actual behavior diverges from the expected result.

## Practice

1. Reproduce the worked example and its expected output.
2. Implement record five local page requests with method, path, status and content type.
3. Add create a linked two-page brochure.
4. Describe and test the acceptance example: Fixed file stays identical; generated timestamp changes.

## Interview preparation

[Questions and answer guidance](../interview-preparation/foundations.md).

## Further examples and reference

[Existing topic guide](../notes/git.md); [daily practice](../daily-practice/foundations/README.md); [official documentation](../resources/teaching-references.md).
