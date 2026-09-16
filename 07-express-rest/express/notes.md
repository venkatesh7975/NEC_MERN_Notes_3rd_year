# Express.js teaching notes

## What and why

Routes match method and path. Ordered middleware can modify context, respond or call next. Parse the body before handlers that need it. Four-argument error middleware follows routes. Validation and authorization are separate checks; trusting an arbitrary role header demonstrates routing, not authentication.

## Prerequisites

Node and HTTP. Concepts: Routing, middleware, static files, errors.

## How and syntax

```javascript
const express = require('express');
const app = express();
app.use(express.json());
app.get('/health', (req,res) => res.json({ok:true}));
app.use((req,res) => res.status(404).json({error:'Not found'}));
app.listen(5051, '127.0.0.1');
```

Run context and expected output: Install Express in a scratch package; save as app.cjs and run node app.cjs. GET /health returns {"ok":true}.

## Trace the example

Identify where input enters, which operation controls the result and how output becomes observable. Predict the result before executing. Change one value, repeat, and explain the difference. For malformed input, record whether the example handles it or whether a guard must be added; do not assume a short demonstration is a complete application.

## When to use

Use these concepts for course listing route: Return three fixture courses; add a health route. Start with a single fixture and increase complexity after the expected result is visible.

## When not to use

Choose the smallest architecture meeting requirements. Do not add a database for a static document, or use browser-only state for shared private records. Do not introduce advanced libraries before you can explain the equivalent core operation. Advanced exercises in the project bank extend core coverage and belong in independent practice.

## Real-world use case

Enrollment router: Mount a router under /api/enrollments; validate IDs and body; handle unknown routes. Expected result: Wrong prefix returns 404.

## Common mistakes

- Running the example in the wrong environment: Install Express in a scratch package; save as app.cjs and run node app.cjs. GET /health returns {"ok":true}.
- Treating one successful input as proof of correctness. Add a missing case and a boundary case.
- Copying a fragment without its data or host application; consult the setup guide.
- Confusing a project specification or demonstration with a completed student submission.

## Best practices

Make assumptions explicit. Keep fixtures small and fictional. Separate input validation from the central operation. Name values by their role. Verify the result after every small change. In class, ask learners to predict, run and explain rather than copy output. During debugging, find the first point where actual behavior diverges from the expected result.

## Practice

1. Reproduce the worked example and its expected output.
2. Implement return three fixture courses.
3. Add validate positive integer ids.
4. Describe and test the acceptance example: Handbook loads; private config is inaccessible.

## Interview preparation

[Questions and answer guidance](../../interview-preparation/express.md).

## Further examples and reference

[Existing topic guide](../../notes/express.md); [daily practice](../../daily-practice/express/README.md); [official documentation](../../resources/teaching-references.md).
