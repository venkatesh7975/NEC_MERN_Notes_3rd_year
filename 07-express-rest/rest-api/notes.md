# REST APIs teaching notes

## What and why

Resources have representations and identifiers. GET reads, POST commonly creates, PUT replaces and PATCH applies a documented modification. Idempotence concerns intended state effects, not identical response bytes. Stateless requests carry sufficient context; resources can still persist. Specify failure responses and pagination bounds.

## Prerequisites

Express routes. Concepts: Resources, methods, status codes, statelessness.

## How and syntax

```http
GET /courses/999 HTTP/1.1
Host: localhost:5051

HTTP/1.1 404 Not Found
Content-Type: application/json

{"error":"Course not found"}
```

Run context and expected output: Illustrative request/response contract, not a standalone program. Implement it in a project.

## Trace the example

Identify where input enters, which operation controls the result and how output becomes observable. Predict the result before executing. Change one value, repeat, and explain the difference. For malformed input, record whether the example handles it or whether a guard must be added; do not assume a short demonstration is a complete application.

## When to use

Use these concepts for resource contract catalog: Implement collection and item reads; document representations. Start with a single fixture and increase complexity after the expected result is visible.

## When not to use

Choose the smallest architecture meeting requirements. Do not add a database for a static document, or use browser-only state for shared private records. Do not introduce advanced libraries before you can explain the equivalent core operation. Advanced exercises in the project bank extend core coverage and belong in independent practice.

## Real-world use case

Filter and sort API: Allowlist sort fields; filter before pagination. Expected result: Filtered results keep stable ordering.

## Common mistakes

- Running the example in the wrong environment: Illustrative request/response contract, not a standalone program. Implement it in a project.
- Treating one successful input as proof of correctness. Add a missing case and a boundary case.
- Copying a fragment without its data or host application; consult the setup guide.
- Confusing a project specification or demonstration with a completed student submission.

## Best practices

Make assumptions explicit. Keep fixtures small and fictional. Separate input validation from the central operation. Name values by their role. Verify the result after every small change. In class, ask learners to predict, run and explain rather than copy output. During debugging, find the first point where actual behavior diverges from the expected result.

## Practice

1. Reproduce the worked example and its expected output.
2. Implement implement collection and item reads.
3. Add return 201 on creation.
4. Describe and test the acceptance example: Repeated identical PUT leaves the same resource state.

## Interview preparation

[Questions and answer guidance](../../interview-preparation/rest-api.md).

## Further examples and reference

[Existing topic guide](../../notes/rest-api.md); [daily practice](../../daily-practice/rest-api/README.md); [official documentation](../../resources/teaching-references.md).
