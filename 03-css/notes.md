# CSS teaching notes

## What and why

CSS controls presentation through the cascade and layout. Specificity compares tuples rather than decimal scores; origin, importance and layers also participate. Border-box includes padding and borders in width, but not margin. Flexbox lays out one dimension; Grid coordinates rows and columns. Use content needs to choose breakpoints.

## Prerequisites

HTML. Concepts: Selectors, box model, Flexbox, Grid, responsive layout.

## How and syntax

```css
.cards { display: grid; gap: 1rem; grid-template-columns: 1fr; }
@media (min-width: 48rem) { .cards { grid-template-columns: repeat(3, minmax(0,1fr)); } }
```

Run context and expected output: Apply to three child cards: one column below 48rem, three above.

## Trace the example

Identify where input enters, which operation controls the result and how output becomes observable. Predict the result before executing. Change one value, repeat, and explain the difference. For malformed input, record whether the example handles it or whether a guard must be added; do not assume a short demonstration is a complete application.

## When to use

Use these concepts for notice card: Style one notice with consistent padding and border-box; compare its measured width to content-box. Start with a single fixture and increase complexity after the expected result is visible.

## When not to use

Choose the smallest architecture meeting requirements. Do not add a database for a static document, or use browser-only state for shared private records. Do not introduce advanced libraries before you can explain the equivalent core operation. Advanced exercises in the project bank extend core coverage and belong in independent practice.

## Real-world use case

Responsive course catalog: Use one, two and three columns at 360, 768 and 1280px; test long titles. Expected result: Nine cards remain readable at all three widths.

## Common mistakes

- Running the example in the wrong environment: Apply to three child cards: one column below 48rem, three above.
- Treating one successful input as proof of correctness. Add a missing case and a boundary case.
- Copying a fragment without its data or host application; consult the setup guide.
- Confusing a project specification or demonstration with a completed student submission.

## Best practices

Make assumptions explicit. Keep fixtures small and fictional. Separate input validation from the central operation. Name values by their role. Verify the result after every small change. In class, ask learners to predict, run and explain rather than copy output. During debugging, find the first point where actual behavior diverges from the expected result.

## Practice

1. Reproduce the worked example and its expected output.
2. Implement style one notice with consistent padding and border-box.
3. Add style nested lists with element, class and attribute selectors.
4. Describe and test the acceptance example: At 200% zoom text remains readable without clipping.

## Interview preparation

[Questions and answer guidance](../interview-preparation/css.md).

## Further examples and reference

[Existing topic guide](../notes/css.md); [daily practice](../daily-practice/css/README.md); [official documentation](../resources/teaching-references.md).
