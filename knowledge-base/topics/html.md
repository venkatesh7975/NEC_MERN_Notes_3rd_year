<!-- kb-metadata: {"conceptIds": ["html--fundamentals", "html--semantic-html", "html--forms", "html--tables", "html--multimedia", "html--accessibility", "html--seo", "html--html-apis", "html--modern-html"], "difficulty": "Beginner", "estimatedMinutes": 180, "id": "html", "importance": 5, "lastVerified": "2026-10-08", "legacyPaths": ["notes/html.md", "02-html/notes.md"], "path": "knowledge-base/topics/html.md", "prerequisites": ["foundations"], "priority": "P0", "related": ["css", "javascript", "react"], "status": "authored-guide", "title": "Semantic HTML, forms, and accessible documents"} -->
# Semantic HTML, forms, and accessible documents

Priority: P0 — 🔥 Essential / Master

Difficulty: Beginner

Importance: 5/5

Prerequisites: [Internet, HTTP, and the browser](foundations.md)

Estimated learning time: 180 minutes for explanation and initial practice; independent mastery takes repeated application.

[Knowledge base](../README.md) · [Coverage](../COVERAGE.md) · [Learning paths](../paths/README.md)

## 🎯 Learning Objectives

Explain the mental model, trace the worked example, reproduce a failure, and demonstrate the acceptance checks in the mini-project. Individual concepts below have their own priorities and depth labels.

## 🧠 What Is It?

Elements express document structure; attributes refine meaning and behavior. A valid document has a declared language and useful title.

## Concept reference and priorities

<a id="fundamentals"></a>
### Fundamentals

**P0 · 🔥 Essential / Master · reference**

Elements express document structure; attributes refine meaning and behavior. A valid document has a declared language and useful title.

<a id="semantic-html"></a>
### Semantic HTML

**P0 · 🔥 Essential / Master · worked-example**

Use headings, landmarks, lists, links, and buttons for their meaning and built-in interaction.

<a id="forms"></a>
### Forms

**P0 · 🔥 Essential / Master · worked-example**

Labels, names, input types, constraints, and submit behavior form a usable contract; the server validates again.

<a id="tables"></a>
### Tables

**P1 · ⭐ Highly Important · reference**

Tables express relationships in rows and columns. Captions and header associations help users interpret the data.

<a id="multimedia"></a>
### Multimedia

**P2 · 📚 Useful · reference**

Images, audio, and video need alternatives appropriate to their purpose, including captions or transcripts when needed.

<a id="accessibility"></a>
### Accessibility

**P0 · 🔥 Essential / Master · worked-example**

Accessibility includes keyboard interaction, names, focus, structure, contrast, and assistive-technology behavior.

<a id="seo"></a>
### SEO

**P1 · ⭐ Highly Important · reference**

Descriptive titles, useful content, crawlable links, and meaningful structure help discovery; metadata is not a ranking guarantee.

<a id="html-apis"></a>
### HTML APIs

**P2 · 📚 Useful · reference**

Browser APIs such as dialog, history, and storage have specific lifecycle and permission contracts beyond markup.

<a id="modern-html"></a>
### Modern HTML

**P1 · ⭐ Highly Important · reference**

Native dialog, disclosure, responsive images, and newer platform features can reduce custom code; check support for your audience.

## ❓ Why Does It Exist?

A styled clickable div requires you to rebuild behavior that a button already has. Semantic markup keeps meaning and interaction aligned as visual design changes.

## ⚙️ How Does It Work?

A form is a set of named controls submitted through a defined action or handled by code. The label identifies purpose, name identifies submitted data, and id establishes document relationships. A placeholder disappears while typing and is not a reliable label. Choose a link for navigation and a button for an action. Keep source order meaningful before applying visual layout.

## 💻 Examples

### 1. Trace the contract

```html
<html lang="en">
<head><title>Reading list</title></head>
<body><main>
  <h1>Add a reading-list item</h1>
  <form action="/api/bookmarks" method="post">
    <label for="title">Title</label>
    <input id="title" name="title" required maxlength="120">
    <button type="submit">Add item</button>
  </form>
</main></body></html>
```

Expected behavior and runtime: Typing and pressing Enter submits the named title field. This markup assumes a form-capable endpoint; the existing JSON API needs a JavaScript submit handler instead.

### 2. Extend and stress the contract

Intermediate: add an error linked with aria-describedby and preserve the input. Advanced: add captions and responsive sources to educational media. Record the expected result before implementation; use the failure analysis below to distinguish the broken boundary.

## 🔍 Under the Hood

The browser derives an accessibility tree from elements, attributes, and state. ARIA can refine this tree, but does not add keyboard behavior to arbitrary elements. Native controls also participate in focus and form submission.

## 🌍 Real-World Usage

Use the UI lab to inspect an accordion and dialog. Build a table of expenses with a caption, row/column headers, and a small-screen scrolling container.

## ⚠️ Common Mistakes

- Using headings only for their default font sizes.
- Removing visible focus outlines without an equivalent replacement.
- Trusting required or pattern attributes as a server security boundary.

## ✅ Best Practices

Use the UI lab to inspect an accordion and dialog. Build a table of expenses with a caption, row/column headers, and a small-screen scrolling container. State the invariant, validate at the boundary, use the documented runtime, and keep a reproducible failure case. This guide is educational evidence; it does not certify a deployment.

## 🧪 Practice

- Beginner: navigate the form using only the keyboard.
- Intermediate: add an error linked with aria-describedby and preserve the input.
- Advanced: add captions and responsive sources to educational media.
- Challenge: test at 200 percent zoom and with a screen reader; record specific obstacles.

## 🏗️ Mini Project

Build a semantic profile and contact form. Acceptance: useful title and language, ordered headings, labeled controls, keyboard submission, and errors associated with the correct input.

[Project ladder and implementation status](../projects/README.md)

## 💼 Interview Questions

<details>
<summary>Beginner: When is a button better than a link?</summary>

For actions; a link navigates to a destination.

</details>

<details>
<summary>Intermediate: What does name do in a form?</summary>

It identifies a successful control in submitted form data; id serves document relationships.

</details>

<details>
<summary>Advanced: Why does ARIA not make a div a complete button?</summary>

ARIA changes exposed semantics but keyboard, focus, and activation still need implementation.

</details>

<details>
<summary>Scenario: A modal closes but focus disappears.</summary>

Remember the invoking element and return focus if it remains available; use a native dialog when suitable.

</details>

<details>
<summary>Debugging: A label focuses the wrong input.</summary>

Check its for value and the uniqueness of the matching input id.

</details>

<details>
<summary>Output-based: What does the worked example produce, and under which runtime?</summary>

Typing and pressing Enter submits the named title field. This markup assumes a form-capable endpoint; the existing JSON API needs a JavaScript submit handler instead.

</details>

<details>
<summary>Coding: What would you implement and verify next?</summary>

Build a semantic profile and contact form. Acceptance: useful title and language, ordered headings, labeled controls, keyboard submission, and errors associated with the correct input.

</details>

<details>
<summary>Architecture and production: Which internal boundary needs evidence?</summary>

The browser derives an accessibility tree from elements, attributes, and state. ARIA can refine this tree, but does not add keyboard behavior to arbitrary elements. Native controls also participate in focus and form submission.

</details>

[Difficulty-based interview bank](../../interview-handbook/questions/index.md) · [Scenario practice](../../interview-handbook/scenarios/README.md) · [Debugging library](../debugging/README.md)

## 🔗 Related Concepts

[CSS layout, cascade, and responsive design](css.md), [JavaScript values, scope, functions, and collections](javascript.md), [React identity, state, effects, and resilient interfaces](react.md)

Next: [CSS layout, cascade, and responsive design](css.md)

Preserved lessons: [notes/html.md](../../notes/html.md), [02-html/notes.md](../../02-html/notes.md)

# 📚 External Resources

## 🥇 Official Documentation

[Primary documentation](https://developer.mozilla.org/en-US/docs/Web/HTML) — authoritative reference; use the installed runtime/library version.

## 📘 Recommended Articles

[Focused guide](https://www.w3.org/WAI/tutorials/) — deepen the mental model and compare its examples with this guide.

## 🎥 Recommended YouTube Videos

See the [verified media register](../resources/VIDEOS.md). A topic without a verified topical video uses written official documentation; unverified recommendations are not padded into this section.

## 🧪 Practice Resources

[Local project ladder](../projects/README.md) · [Timed exercises](../../interview-handbook/machine-coding/README.md)

## 📚 Further Reading

[Curated external register](../resources/README.md) — authority, level, best use, last check, and retrieval limitations.

## 🔄 Last Verified

2026-10-08 — documentation reviewed; example runtime and execution scope are stated above.
