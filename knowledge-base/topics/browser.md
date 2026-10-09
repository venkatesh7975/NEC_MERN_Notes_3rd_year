<!-- kb-metadata: {"conceptIds": ["browser--dom", "browser--events", "browser--browser-apis", "browser--forms-and-events"], "difficulty": "Beginner", "estimatedMinutes": 180, "id": "browser", "importance": 5, "lastVerified": "2026-10-08", "legacyPaths": [], "path": "knowledge-base/topics/browser.md", "prerequisites": ["html", "javascript", "async"], "priority": "P0", "related": ["react", "security"], "status": "authored-guide", "title": "DOM, events, and browser APIs"} -->
# DOM, events, and browser APIs

Priority: P0 — 🔥 Essential / Master

Difficulty: Beginner

Importance: 5/5

Prerequisites: [Semantic HTML, forms, and accessible documents](html.md), [JavaScript values, scope, functions, and collections](javascript.md), [Promises, event loops, and bounded concurrency](async.md)

Estimated learning time: 180 minutes for explanation and initial practice; independent mastery takes repeated application.

[Knowledge base](../README.md) · [Coverage](../COVERAGE.md) · [Learning paths](../paths/README.md)

## 🎯 Learning Objectives

Explain the mental model, trace the worked example, reproduce a failure, and demonstrate the acceptance checks in the mini-project. Individual concepts below have their own priorities and depth labels.

## 🧠 What Is It?

The DOM exposes a document tree as objects that scripts can inspect and update.

## Concept reference and priorities

<a id="dom"></a>
### DOM

**P0 · 🔥 Essential / Master · worked-example**

The DOM exposes a document tree as objects that scripts can inspect and update.

<a id="events"></a>
### Events

**P0 · 🔥 Essential / Master · worked-example**

Events describe interaction or state changes; propagation and default actions follow distinct rules.

<a id="browser-apis"></a>
### Browser APIs

**P1 · ⭐ Highly Important · reference**

Storage, history, observers, workers, and permissions have host-specific contracts and cleanup requirements.

<a id="forms-and-events"></a>
### Forms and events

**P0 · 🔥 Essential / Master · reference**

A submit event captures keyboard and button submission; form controls should retain accessible names and feedback.

## ❓ Why Does It Exist?

Event-driven interaction lets the page change without reconstructing all document state. Correct event ownership avoids duplicate listeners, accidental navigation, and unsafe content insertion.

## ⚙️ How Does It Work?

Separate propagation from default behavior. preventDefault affects the default action; stopPropagation affects propagation. Event delegation listens on a stable ancestor and identifies a meaningful target, including when the user clicks a nested child. Update user-supplied text with textContent. Keep storage as an optional convenience and handle quota, unavailable storage, and malformed values.

## 💻 Examples

### 1. Trace the contract

```javascript
const list = document.querySelector('#items');
list.addEventListener('click', event => {
  const button = event.target instanceof Element
    ? event.target.closest('button[data-id]') : null;
  if (!button || !list.contains(button)) return;
  console.log('Requested item', button.dataset.id);
});
```

Expected behavior and runtime: A click on text or an icon inside a matching button identifies that button. The containing list must exist before registering the listener; ids remain untrusted inputs at the server boundary.

### 2. Extend and stress the contract

Intermediate: add a row without registering a new row listener. Advanced: handle a storage write failure while preserving export. Record the expected result before implementation; use the failure analysis below to distinguish the broken boundary.

## 🔍 Under the Hood

Events can pass through capture, target, and bubble phases. Shadow DOM can retarget events. Registering listeners repeatedly can retain state and cause duplicate work. Most DOM updates do not automatically preserve focus after replacing an element.

## 🌍 Real-World Usage

Extend the UI lab to handle dynamically inserted todos, focus a useful control after deletion, and export progress without depending on localStorage always succeeding.

## ⚠️ Common Mistakes

- Using innerHTML with untrusted titles.
- Listening only for button clicks and missing keyboard form submission.
- Persisting session secrets in a progress store.

## ✅ Best Practices

Extend the UI lab to handle dynamically inserted todos, focus a useful control after deletion, and export progress without depending on localStorage always succeeding. State the invariant, validate at the boundary, use the documented runtime, and keep a reproducible failure case. This guide is educational evidence; it does not certify a deployment.

## 🧪 Practice

- Beginner: inspect target and currentTarget on a nested button click.
- Intermediate: add a row without registering a new row listener.
- Advanced: handle a storage write failure while preserving export.
- Challenge: replace a list while preserving a sensible keyboard focus target.

## 🏗️ Mini Project

Build a local notes app with a plain-text editor, explicit save state, JSON export, and safe handling of corrupted saved data. Do not present browser storage as a multi-device database.

[Project ladder and implementation status](../projects/README.md)

## 💼 Interview Questions

<details>
<summary>Beginner: How do target and currentTarget differ?</summary>

Target identifies the dispatch target; currentTarget is the element whose listener is currently running.

</details>

<details>
<summary>Intermediate: Why use delegation?</summary>

A stable ancestor can handle matching descendants added later without per-row listeners.

</details>

<details>
<summary>Advanced: Does stopping propagation prevent navigation?</summary>

Not necessarily; default action and propagation are separate. Use preventDefault where appropriate.

</details>

<details>
<summary>Scenario: A list update loses keyboard focus.</summary>

Preserve stable elements or deliberately restore focus to a meaningful surviving control.

</details>

<details>
<summary>Debugging: The handler fires twice after navigation.</summary>

Inspect repeated registration and missing cleanup, including captured state that remains reachable.

</details>

<details>
<summary>Output-based: What does the worked example produce, and under which runtime?</summary>

A click on text or an icon inside a matching button identifies that button. The containing list must exist before registering the listener; ids remain untrusted inputs at the server boundary.

</details>

<details>
<summary>Coding: What would you implement and verify next?</summary>

Build a local notes app with a plain-text editor, explicit save state, JSON export, and safe handling of corrupted saved data. Do not present browser storage as a multi-device database.

</details>

<details>
<summary>Architecture and production: Which internal boundary needs evidence?</summary>

Events can pass through capture, target, and bubble phases. Shadow DOM can retarget events. Registering listeners repeatedly can retain state and cause duplicate work. Most DOM updates do not automatically preserve focus after replacing an element.

</details>

[Difficulty-based interview bank](../../interview-handbook/questions/index.md) · [Scenario practice](../../interview-handbook/scenarios/README.md) · [Debugging library](../debugging/README.md)

## 🔗 Related Concepts

[React identity, state, effects, and resilient interfaces](react.md), [Authentication, authorization, and web security boundaries](security.md)

Next: [React identity, state, effects, and resilient interfaces](react.md)

# 📚 External Resources

## 🥇 Official Documentation

[Primary documentation](https://developer.mozilla.org/en-US/docs/Web/API) — authoritative reference; use the installed runtime/library version.

## 📘 Recommended Articles

[Focused guide](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model) — deepen the mental model and compare its examples with this guide.

## 🎥 Recommended YouTube Videos

See the [verified media register](../resources/VIDEOS.md). A topic without a verified topical video uses written official documentation; unverified recommendations are not padded into this section.

## 🧪 Practice Resources

[Local project ladder](../projects/README.md) · [Timed exercises](../../interview-handbook/machine-coding/README.md)

## 📚 Further Reading

[Curated external register](../resources/README.md) — authority, level, best use, last check, and retrieval limitations.

## 🔄 Last Verified

2026-10-08 — documentation reviewed; example runtime and execution scope are stated above.
