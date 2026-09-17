# Authentication and authorization teaching notes

## What and why

Authentication verifies identity; authorization checks actions and object access. Signed tokens are not encrypted. Use password hashing and deliberate session lifetimes. Reject inactive or missing accounts even with a valid token. Verify ownership on the server, never from a client-supplied role or owner field.

## Prerequisites

Security and REST APIs. Concepts: Passwords, sessions, identity, ownership, roles.

## How and syntax

```javascript
function mayRead(actor, record) {
  return Boolean(actor && actor.active && actor.id === record.ownerId);
}
console.log(mayRead({id:'A',active:true},{ownerId:'B'}));
```

Run context and expected output: Node prints false. actor must come from verified server identity; this is a policy example, not a login implementation.

## Trace the example

Identify where input enters, which operation controls the result and how output becomes observable. Predict the result before executing. Change one value, repeat, and explain the difference. For malformed input, record whether the example handles it or whether a guard must be added; do not assume a short demonstration is a complete application.

## When to use

Use these concepts for password verification lab: Hash fictional passwords with a password-hashing library; verify matches. Start with a single fixture and increase complexity after the expected result is visible.

## When not to use

Choose the smallest architecture meeting requirements. Do not add a database for a static document, or use browser-only state for shared private records. Do not introduce advanced libraries before you can explain the equivalent core operation. This track extends the syllabus; complete core prerequisites first.

## Real-world use case

Login attempt limiter: Throttle failed logins; document retry/reset behavior. Expected result: Excess failures receive throttled response.

## Common mistakes

- Running the example in the wrong environment: Node prints false. actor must come from verified server identity; this is a policy example, not a login implementation.
- Treating one successful input as proof of correctness. Add a missing case and a boundary case.
- Copying a fragment without its data or host application; consult the setup guide.
- Confusing a project specification or demonstration with a completed student submission.

## Best practices

Make assumptions explicit. Keep fixtures small and fictional. Separate input validation from the central operation. Name values by their role. Verify the result after every small change. In class, ask learners to predict, run and explain rather than copy output. During debugging, find the first point where actual behavior diverges from the expected result.

## Practice

1. Reproduce the worked example and its expected output.
2. Implement hash fictional passwords with a password-hashing library.
3. Add create server session.
4. Describe and test the acceptance example: Expired token is rejected.

## Interview preparation

[Questions and answer guidance](../../interview-preparation/authentication.md).

## Further examples and reference

[Existing topic guide](../../notes/authentication.md); [daily practice](../../daily-practice/authentication/README.md); [official documentation](../../resources/teaching-references.md).
