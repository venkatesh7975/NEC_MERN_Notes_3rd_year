# Web security teaching notes

## What and why

Trust boundaries separate controlled code from untrusted inputs. Bind SQL parameters, use safe text sinks for plain content, and encode for the output context. CSRF exploits automatically attached credentials; choose suitable token and origin checks. HttpOnly restricts script access to cookies but does not prevent XSS. CORS is not authorization.

## Prerequisites

Forms, HTTP and databases. Concepts: OWASP basics, SQL injection, XSS, CSRF.

## How and syntax

```javascript
const p = document.createElement('p');
p.textContent = '<b>hello</b>';
document.body.appendChild(p);
```

Run context and expected output: Run in browser console: literal markup appears, not bold HTML.

## Trace the example

Identify where input enters, which operation controls the result and how output becomes observable. Predict the result before executing. Change one value, repeat, and explain the difference. For malformed input, record whether the example handles it or whether a guard must be added; do not assume a short demonstration is a complete application.

## When to use

Use these concepts for safe comment renderer: Display text through textContent; test literal markup. Start with a single fixture and increase complexity after the expected result is visible.

## When not to use

Choose the smallest architecture meeting requirements. Do not add a database for a static document, or use browser-only state for shared private records. Do not introduce advanced libraries before you can explain the equivalent core operation. Advanced exercises in the project bank extend core coverage and belong in independent practice.

## Real-world use case

Object access review: Check ownership for reads and writes; use two fictional accounts. Expected result: User A cannot access user B records.

## Common mistakes

- Running the example in the wrong environment: Run in browser console: literal markup appears, not bold HTML.
- Treating one successful input as proof of correctness. Add a missing case and a boundary case.
- Copying a fragment without its data or host application; consult the setup guide.
- Confusing a project specification or demonstration with a completed student submission.

## Best practices

Make assumptions explicit. Keep fixtures small and fictional. Separate input validation from the central operation. Name values by their role. Verify the result after every small change. In class, ask learners to predict, run and explain rather than copy output. During debugging, find the first point where actual behavior diverges from the expected result.

## Practice

1. Reproduce the worked example and its expected output.
2. Implement display text through textcontent.
3. Add use parameterized local query.
4. Describe and test the acceptance example: Invalid value is rejected at the server.

## Interview preparation

[Questions and answer guidance](../interview-preparation/security.md).

## Further examples and reference

[Existing topic guide](../notes/authentication.md); [daily practice](../daily-practice/security/README.md); [official documentation](../resources/teaching-references.md).
