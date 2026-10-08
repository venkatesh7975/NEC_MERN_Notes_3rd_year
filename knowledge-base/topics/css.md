<!-- kb-metadata: {"conceptIds": ["css--fundamentals", "css--box-model", "css--selectors", "css--cascade", "css--specificity", "css--flexbox", "css--grid", "css--responsive-design", "css--media-queries", "css--animations", "css--transitions", "css--positioning", "css--variables", "css--accessibility", "css--modern-css", "css--css-architecture"], "difficulty": "Beginner", "estimatedMinutes": 180, "id": "css", "importance": 5, "lastVerified": "2026-10-08", "legacyPaths": ["notes/css.md", "03-css/notes.md"], "path": "knowledge-base/topics/css.md", "prerequisites": ["html"], "priority": "P0", "related": ["react", "foundations"], "status": "authored-guide", "title": "CSS layout, cascade, and responsive design"} -->
# CSS layout, cascade, and responsive design

Priority: P0 — 🔥 Essential / Master

Difficulty: Beginner

Importance: 5/5

Prerequisites: [Semantic HTML, forms, and accessible documents](html.md)

Estimated learning time: 180 minutes for explanation and initial practice; independent mastery takes repeated application.

[Knowledge base](../README.md) · [Coverage](../COVERAGE.md) · [Learning paths](../paths/README.md)

## 🎯 Learning Objectives

Explain the mental model, trace the worked example, reproduce a failure, and demonstrate the acceptance checks in the mini-project. Individual concepts below have their own priorities and depth labels.

## 🧠 What Is It?

CSS maps selectors to declarations; browsers resolve competing declarations and compute values for elements.

## Concept reference and priorities

<a id="fundamentals"></a>
### Fundamentals

**P0 · 🔥 Essential / Master · reference**

CSS maps selectors to declarations; browsers resolve competing declarations and compute values for elements.

<a id="box-model"></a>
### Box model

**P0 · 🔥 Essential / Master · worked-example**

Content, padding, border, and margin determine geometry. border-box includes padding and borders in the declared width.

<a id="selectors"></a>
### Selectors

**P0 · 🔥 Essential / Master · reference**

Selectors match document structure and states; prefer intentional classes over tightly coupled ancestor chains.

<a id="cascade"></a>
### Cascade

**P0 · 🔥 Essential / Master · reference**

Origin, importance, layers, specificity, scope proximity, and order resolve competing declarations.

<a id="specificity"></a>
### Specificity

**P0 · 🔥 Essential / Master · reference**

Specificity compares selector weight within the relevant cascade stage; it is not the first rule in every conflict.

<a id="flexbox"></a>
### Flexbox

**P0 · 🔥 Essential / Master · reference**

Flexbox distributes items along an axis and manages wrapping, alignment, and available space.

<a id="grid"></a>
### Grid

**P0 · 🔥 Essential / Master · worked-example**

Grid defines tracks in two dimensions and can coordinate row and column placement.

<a id="responsive-design"></a>
### Responsive design

**P0 · 🔥 Essential / Master · worked-example**

A responsive layout adapts to available space, input capabilities, text size, and content length.

<a id="media-queries"></a>
### Media queries

**P1 · ⭐ Highly Important · reference**

Media queries condition rules on viewport or device characteristics; choose breakpoints from content needs.

<a id="animations"></a>
### Animations

**P2 · 📚 Useful · reference**

Keyframe animations interpolate properties over time; honor reduced-motion preferences and avoid unnecessary layout work.

<a id="transitions"></a>
### Transitions

**P2 · 📚 Useful · reference**

Transitions interpolate a changed property over a duration; they need distinct before and after values.

<a id="positioning"></a>
### Positioning

**P1 · ⭐ Highly Important · reference**

Static, relative, absolute, fixed, and sticky positioning use different containing-block and scroll relationships.

<a id="variables"></a>
### Variables

**P1 · ⭐ Highly Important · worked-example**

Custom properties cascade and can be resolved at use time; they are useful for design tokens and themes.

<a id="accessibility"></a>
### Accessibility

**P0 · 🔥 Essential / Master · worked-example**

Preserve readable contrast, focus, zoom, reduced motion, and logical source order.

<a id="modern-css"></a>
### Modern CSS

**P2 · 📚 Useful · reference**

Container queries, cascade layers, subgrid, logical properties, and modern selectors solve specific layout problems; inspect compatibility.

<a id="css-architecture"></a>
### CSS architecture

**P1 · ⭐ Highly Important · reference**

Small reusable patterns, consistent naming, and documented tokens reduce unintended cross-component effects.

## ❓ Why Does It Exist?

Layout failures often come from content constraints, not a missing breakpoint. CSS offers different tools for distribution, track alignment, overlap, and local component adaptation.

## ⚙️ How Does It Work?

Start in normal flow, choose a layout model, and identify intrinsic size constraints. In a grid, a long word can impose a minimum track width; minmax(0, 1fr) lets a flexible track shrink when overflow handling is defined. In flex layouts, min-width: 0 often permits a child to shrink. Inspect which cascade rule wins before raising specificity. A large z-index cannot escape an ancestor stacking context.

## 💻 Examples

### 1. Trace the contract

```css
:root { --space: 1rem; --accent: #214ea2; }
* { box-sizing: border-box; }
.cards { display: grid; gap: var(--space);
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr)); }
.card { min-width: 0; overflow-wrap: anywhere; }
button:focus-visible { outline: 3px solid var(--accent); outline-offset: 3px; }
@media (prefers-reduced-motion: reduce) {
  .animated { animation: none; transition: none; }
}
```

Expected behavior and runtime: Cards wrap into available columns and long text can wrap inside a shrinking card. Inspect 320px and desktop layouts with real content; this is a stylesheet fragment for a page containing these classes.

### 2. Extend and stress the contract

Intermediate: fix a long URL that expands a grid. Advanced: debug a modal behind a transformed ancestor using stacking-context evidence. Record the expected result before implementation; use the failure analysis below to distinguish the broken boundary.

## 🔍 Under the Hood

Browsers compute style, layout, paint, and compositing work. Some visual changes require geometry to be recalculated. Transform and opacity often avoid layout, but layer promotion and rendering costs still need measurement.

## 🌍 Real-World Usage

Use these rules in a dashboard with unequal titles and amounts. Give tabular data an intentional overflow container rather than hiding part of a row.

## ⚠️ Common Mistakes

- Using overflow:hidden to conceal an inaccessible control.
- Adding !important before inspecting competing layers and selectors.
- Designing only for one viewport or short English labels.

## ✅ Best Practices

Use these rules in a dashboard with unequal titles and amounts. Give tabular data an intentional overflow container rather than hiding part of a row. State the invariant, validate at the boundary, use the documented runtime, and keep a reproducible failure case. This guide is educational evidence; it does not certify a deployment.

## 🧪 Practice

- Beginner: draw and measure one element with both box-sizing values.
- Intermediate: fix a long URL that expands a grid.
- Advanced: debug a modal behind a transformed ancestor using stacking-context evidence.
- Challenge: produce a readable layout at 320px, 200 percent zoom, and reduced motion.

## 🏗️ Mini Project

Build a responsive reading-list dashboard with cards, a filter toolbar, visible focus, and a data table. Record why each section uses Grid, Flexbox, or normal flow.

[Project ladder and implementation status](../projects/README.md)

## 💼 Interview Questions

<details>
<summary>Beginner: What does border-box change?</summary>

The declared width includes content, padding, and border; margin remains outside.

</details>

<details>
<summary>Intermediate: Why can a less specific rule win?</summary>

Earlier cascade stages such as importance and layer order can take precedence over specificity.

</details>

<details>
<summary>Advanced: Why is z-index ineffective?</summary>

The element may participate in an ancestor stacking context that is ordered behind another context.

</details>

<details>
<summary>Scenario: A card expands the mobile page.</summary>

Inspect intrinsic minimum size and long content; allow shrinking and intentional wrapping.

</details>

<details>
<summary>Debugging: Sticky positioning does not appear to stick.</summary>

Check its inset, containing block, available scroll distance, and ancestor overflow behavior.

</details>

<details>
<summary>Output-based: What does the worked example produce, and under which runtime?</summary>

Cards wrap into available columns and long text can wrap inside a shrinking card. Inspect 320px and desktop layouts with real content; this is a stylesheet fragment for a page containing these classes.

</details>

<details>
<summary>Coding: What would you implement and verify next?</summary>

Build a responsive reading-list dashboard with cards, a filter toolbar, visible focus, and a data table. Record why each section uses Grid, Flexbox, or normal flow.

</details>

<details>
<summary>Architecture and production: Which internal boundary needs evidence?</summary>

Browsers compute style, layout, paint, and compositing work. Some visual changes require geometry to be recalculated. Transform and opacity often avoid layout, but layer promotion and rendering costs still need measurement.

</details>

[Difficulty-based interview bank](../../interview-handbook/questions/index.md) · [Scenario practice](../../interview-handbook/scenarios/README.md) · [Debugging library](../debugging/README.md)

## 🔗 Related Concepts

[React identity, state, effects, and resilient interfaces](react.md), [Internet, HTTP, and the browser](foundations.md)

Next: [React identity, state, effects, and resilient interfaces](react.md)

Preserved lessons: [notes/css.md](../../notes/css.md), [03-css/notes.md](../../03-css/notes.md)

# 📚 External Resources

## 🥇 Official Documentation

[Primary documentation](https://developer.mozilla.org/en-US/docs/Web/CSS) — authoritative reference; use the installed runtime/library version.

## 📘 Recommended Articles

[Focused guide](https://web.dev/learn/css) — deepen the mental model and compare its examples with this guide.

## 🎥 Recommended YouTube Videos

See the [verified media register](../resources/VIDEOS.md). A topic without a verified topical video uses written official documentation; unverified recommendations are not padded into this section.

## 🧪 Practice Resources

[Local project ladder](../projects/README.md) · [Timed exercises](../../interview-handbook/machine-coding/README.md)

## 📚 Further Reading

[Curated external register](../resources/README.md) — authority, level, best use, last check, and retrieval limitations.

## 🔄 Last Verified

2026-10-08 — documentation reviewed; example runtime and execution scope are stated above.
