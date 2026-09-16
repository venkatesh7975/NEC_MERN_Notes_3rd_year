# HTML teaching notes

## What and why

HTML expresses meaning and structure. Use headings for hierarchy, lists for groups, tables for related rows and columns, and forms for inputs. A label's for attribute refers to a control's id; name identifies submitted data. Native form validation helps users but server validation remains necessary.

## Prerequisites

Web foundations. Concepts: Semantics, text, links, lists, tables, forms.

## How and syntax

```html
<form><label for="email">Email</label>
<input id="email" name="email" type="email" required>
<button>Submit</button></form>
```

Run context and expected output: Place in an HTML document; an empty or invalid email prevents normal form submission.

## Trace the example

Identify where input enters, which operation controls the result and how output becomes observable. Predict the result before executing. Change one value, repeat, and explain the difference. For malformed input, record whether the example handles it or whether a guard must be added; do not assume a short demonstration is a complete application.

## When to use

Use these concepts for department contact card: Use header, main and footer; include email and telephone links; give the page one descriptive h1. Start with a single fixture and increase complexity after the expected result is visible.

## When not to use

Choose the smallest architecture meeting requirements. Do not add a database for a static document, or use browser-only state for shared private records. Do not introduce advanced libraries before you can explain the equivalent core operation. Advanced exercises in the project bank extend core coverage and belong in independent practice.

## Real-world use case

Accessible resume: Create education, skills and project sections; include meaningful links and a printable reading order. Expected result: Disabling styles still leaves a coherent resume.

## Common mistakes

- Running the example in the wrong environment: Place in an HTML document; an empty or invalid email prevents normal form submission.
- Treating one successful input as proof of correctness. Add a missing case and a boundary case.
- Copying a fragment without its data or host application; consult the setup guide.
- Confusing a project specification or demonstration with a completed student submission.

## Best practices

Make assumptions explicit. Keep fixtures small and fictional. Separate input validation from the central operation. Name values by their role. Verify the result after every small change. In class, ask learners to predict, run and explain rather than copy output. During debugging, find the first point where actual behavior diverges from the expected result.

## Practice

1. Reproduce the worked example and its expected output.
2. Implement use header, main and footer.
3. Add build ordered study steps and an unordered reading list.
4. Describe and test the acceptance example: Every contents link lands on the correct heading.

## Interview preparation

[Questions and answer guidance](../interview-preparation/html.md).

## Further examples and reference

[Existing topic guide](../notes/html.md); [daily practice](../daily-practice/html/README.md); [official documentation](../resources/teaching-references.md).
