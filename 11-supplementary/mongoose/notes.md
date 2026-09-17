# Mongoose teaching notes

## What and why

Mongoose schemas provide application casting and validation. unique declares an index, not a validator. Save hooks and query updates are different paths; enable update validation deliberately. References do not automatically impose relational foreign key constraints. Distinguish validation failure from duplicate-key errors.

## Prerequisites

MongoDB CRUD and Node. Concepts: Schemas, validation, indexes, references.

## How and syntax

```javascript
const mongoose = require('mongoose');
const C = mongoose.model('ValidationDemo',new mongoose.Schema({hours:{type:Number,min:0}}));
console.log(new C({hours:-1}).validateSync().errors.hours.kind);
```

Run context and expected output: Install Mongoose; run as .cjs. Prints min without a database connection.

## Trace the example

Identify where input enters, which operation controls the result and how output becomes observable. Predict the result before executing. Change one value, repeat, and explain the difference. For malformed input, record whether the example handles it or whether a guard must be added; do not assume a short demonstration is a complete application.

## When to use

Use these concepts for course schema validator: Require title and nonnegative hours; validate before write. Start with a single fixture and increase complexity after the expected result is visible.

## When not to use

Choose the smallest architecture meeting requirements. Do not add a database for a static document, or use browser-only state for shared private records. Do not introduce advanced libraries before you can explain the equivalent core operation. This track extends the syllabus; complete core prerequisites first.

## Real-world use case

Lesson subdocuments: Validate lesson titles and a maximum array length. Expected result: Maximum plus one lesson fails.

## Common mistakes

- Running the example in the wrong environment: Install Mongoose; run as .cjs. Prints min without a database connection.
- Treating one successful input as proof of correctness. Add a missing case and a boundary case.
- Copying a fragment without its data or host application; consult the setup guide.
- Confusing a project specification or demonstration with a completed student submission.

## Best practices

Make assumptions explicit. Keep fixtures small and fictional. Separate input validation from the central operation. Name values by their role. Verify the result after every small change. In class, ask learners to predict, run and explain rather than copy output. During debugging, find the first point where actual behavior diverges from the expected result.

## Practice

1. Reproduce the worked example and its expected output.
2. Implement require title and nonnegative hours.
3. Add set draft default and timestamps.
4. Describe and test the acceptance example: Second HTML code is rejected.

## Interview preparation

[Questions and answer guidance](../../interview-preparation/mongoose.md).

## Further examples and reference

[Existing topic guide](../../notes/mongodb.md); [daily practice](../../daily-practice/mongoose/README.md); [official documentation](../../resources/teaching-references.md).
