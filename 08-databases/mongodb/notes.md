# MongoDB teaching notes

## What and why

MongoDB stores BSON documents in collections. Flexible shape still requires a data contract. Use precise filters, projections and targeted updates. Embed bounded data with a shared lifecycle; reference independent or growing data. Mongoose is an optional separate modeling layer, not MongoDB itself.

## Prerequisites

Data records and SQL comparison. Concepts: Documents, collections, CRUD, modeling.

## How and syntax

```javascript
use('nec_practice');
db.courses.insertMany([{code:'HTML',hours:10},{code:'CSS',hours:14}]);
db.courses.updateOne({code:'HTML'},{$set:{hours:11}});
db.courses.find({},{_id:0,code:1,hours:1}).sort({code:1});
```

Run context and expected output: Use mongosh in a fresh sandbox: CSS remains 14, HTML becomes 11. Repeated seeding needs a documented cleanup/upsert policy.

## Trace the example

Identify where input enters, which operation controls the result and how output becomes observable. Predict the result before executing. Change one value, repeat, and explain the difference. For malformed input, record whether the example handles it or whether a guard must be added; do not assume a short demonstration is a complete application.

## When to use

Use these concepts for course document notebook: Insert three course documents; find by code. Start with a single fixture and increase complexity after the expected result is visible.

## When not to use

Choose the smallest architecture meeting requirements. Do not add a database for a static document, or use browser-only state for shared private records. Do not introduce advanced libraries before you can explain the equivalent core operation. Advanced exercises in the project bank extend core coverage and belong in independent practice.

## Real-world use case

Grouped hours report: Aggregate hours by category; distinguish no matches. Expected result: 10 and 14 frontend hours aggregate to 24.

## Common mistakes

- Running the example in the wrong environment: Use mongosh in a fresh sandbox: CSS remains 14, HTML becomes 11. Repeated seeding needs a documented cleanup/upsert policy.
- Treating one successful input as proof of correctness. Add a missing case and a boundary case.
- Copying a fragment without its data or host application; consult the setup guide.
- Confusing a project specification or demonstration with a completed student submission.

## Best practices

Make assumptions explicit. Keep fixtures small and fictional. Separate input validation from the central operation. Name values by their role. Verify the result after every small change. In class, ask learners to predict, run and explain rather than copy output. During debugging, find the first point where actual behavior diverges from the expected result.

## Practice

1. Reproduce the worked example and its expected output.
2. Implement insert three course documents.
3. Add filter by minimum hours.
4. Describe and test the acceptance example: CSS remains unchanged after updating HTML.

## Interview preparation

[Questions and answer guidance](../../interview-preparation/mongodb.md).

## Further examples and reference

[Existing topic guide](../../notes/mongodb.md); [daily practice](../../daily-practice/mongodb/README.md); [official documentation](../../resources/teaching-references.md).
