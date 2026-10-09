<!-- kb-metadata: {"conceptIds": ["react--fundamentals", "react--jsx", "react--components", "react--props", "react--state", "react--events", "react--forms", "react--conditional-rendering", "react--lists", "react--keys", "react--hooks", "react--usestate", "react--useeffect", "react--useref", "react--usememo", "react--usecallback", "react--usecontext", "react--custom-hooks", "react--component-architecture", "react--routing", "react--react-router", "react--data-fetching", "react--error-handling", "react--performance", "react--lazy-loading", "react--suspense", "react--server-client-concepts", "react--testing", "react--accessibility", "react--production-architecture"], "difficulty": "Beginner", "estimatedMinutes": 180, "id": "react", "importance": 5, "lastVerified": "2026-10-08", "legacyPaths": ["notes/react.md", "05-react/notes.md"], "path": "knowledge-base/topics/react.md", "prerequisites": ["html", "javascript", "async", "browser"], "priority": "P0", "related": ["state-management", "typescript", "nextjs", "testing"], "status": "authored-guide", "title": "React identity, state, effects, and resilient interfaces"} -->
# React identity, state, effects, and resilient interfaces

Priority: P0 — 🔥 Essential / Master

Difficulty: Beginner

Importance: 5/5

Prerequisites: [Semantic HTML, forms, and accessible documents](html.md), [JavaScript values, scope, functions, and collections](javascript.md), [Promises, event loops, and bounded concurrency](async.md), [DOM, events, and browser APIs](browser.md)

Estimated learning time: 180 minutes for explanation and initial practice; independent mastery takes repeated application.

[Knowledge base](../README.md) · [Coverage](../COVERAGE.md) · [Learning paths](../paths/README.md)

## 🎯 Learning Objectives

Explain the mental model, trace the worked example, reproduce a failure, and demonstrate the acceptance checks in the mini-project. Individual concepts below have their own priorities and depth labels.

## 🧠 What Is It?

React describes interfaces as components whose output depends on inputs and state.

## Concept reference and priorities

<a id="fundamentals"></a>
### Fundamentals

**P0 · 🔥 Essential / Master · reference**

React describes interfaces as components whose output depends on inputs and state.

<a id="jsx"></a>
### JSX

**P0 · 🔥 Essential / Master · reference**

JSX describes element structure and is transformed before execution; it is not an HTML string.

<a id="components"></a>
### Components

**P0 · 🔥 Essential / Master · reference**

Components encapsulate presentation and behavior; keep rendering pure so repeated evaluation remains safe.

<a id="props"></a>
### Props

**P0 · 🔥 Essential / Master · reference**

Props are inputs from a parent and should not be mutated by the receiving component.

<a id="state"></a>
### State

**P0 · 🔥 Essential / Master · worked-example**

State records facts the component owns. Derive values that can be computed from existing facts.

<a id="events"></a>
### Events

**P0 · 🔥 Essential / Master · worked-example**

Event handlers express user intent and can trigger state changes or commands.

<a id="forms"></a>
### Forms

**P0 · 🔥 Essential / Master · reference**

Form state, validation, submission, and recovery need distinct behavior; preserve drafts when requests fail.

<a id="conditional-rendering"></a>
### Conditional rendering

**P0 · 🔥 Essential / Master · reference**

Render a clear representation for each valid state, including loading, empty, error, and success.

<a id="lists"></a>
### Lists

**P0 · 🔥 Essential / Master · reference**

Transform data into elements without changing item identity as order changes.

<a id="keys"></a>
### Keys

**P0 · 🔥 Essential / Master · reference**

Stable keys let React identify siblings across updates; random or index-based keys can lose the correct local state.

<a id="hooks"></a>
### Hooks

**P0 · 🔥 Essential / Master · worked-example**

Hooks connect React capabilities to function components under ordering rules.

<a id="usestate"></a>
### useState

**P0 · 🔥 Essential / Master · worked-example**

useState provides a state snapshot and update function; functional updates compose against previous state.

<a id="useeffect"></a>
### useEffect

**P0 · 🔥 Essential / Master · reference**

Effects synchronize with external systems and need correct dependencies and cleanup.

<a id="useref"></a>
### useRef

**P1 · ⭐ Highly Important · reference**

A ref persists a mutable value without scheduling rendering; do not use it to conceal missing UI state.

<a id="usememo"></a>
### useMemo

**P2 · 📚 Useful · reference**

Memoization can avoid recomputation when dependencies are equal; measure benefit and avoid relying on cache for correctness.

<a id="usecallback"></a>
### useCallback

**P2 · 📚 Useful · reference**

A cached function identity can help specific memoized boundaries; it is not a general speed switch.

<a id="usecontext"></a>
### useContext

**P1 · ⭐ Highly Important · reference**

Context passes a value through a subtree; changing that value can affect consuming components.

<a id="custom-hooks"></a>
### Custom hooks

**P1 · ⭐ Highly Important · reference**

A custom hook reuses stateful logic while each caller has its own hook state unless an external store is used.

<a id="component-architecture"></a>
### Component architecture

**P1 · ⭐ Highly Important · reference**

Separate reusable presentation, domain state, and external communication where this simplifies change.

<a id="routing"></a>
### Routing

**P1 · ⭐ Highly Important · reference**

Routing maps location to views and defines navigation, parameters, and loading boundaries.

<a id="react-router"></a>
### React Router

**P1 · ⭐ Highly Important · reference**

React Router offers modes with different routing and data behavior; choose a mode deliberately and consult its matching docs.

<a id="data-fetching"></a>
### Data fetching

**P0 · 🔥 Essential / Master · reference**

Associate responses with request identity and model caching, invalidation, cancellation, and errors.

<a id="error-handling"></a>
### Error handling

**P0 · 🔥 Essential / Master · reference**

Distinguish render errors, rejected asynchronous work, validation failures, and conflict recovery.

<a id="performance"></a>
### Performance

**P1 · ⭐ Highly Important · reference**

Profile actual interaction; list size, expensive work, and network waterfalls often matter more than blanket memoization.

<a id="lazy-loading"></a>
### Lazy loading

**P2 · 📚 Useful · reference**

Load code for a boundary when needed, then provide loading and failure behavior for that boundary.

<a id="suspense"></a>
### Suspense

**P2 · 📚 Useful · reference**

Suspense coordinates supported pending resources; arbitrary effect-based fetching does not automatically integrate with it.

<a id="server-client-concepts"></a>
### Server/client concepts

**P2 · 📚 Useful · reference**

Server and client components have different capabilities and bundle boundaries supplied by a compatible framework.

<a id="testing"></a>
### Testing

**P0 · 🔥 Essential / Master · reference**

Test visible behavior and accessible interaction, then run important workflows in a real browser.

<a id="accessibility"></a>
### Accessibility

**P0 · 🔥 Essential / Master · reference**

Use native roles, labels, focus management, and keyboard behavior through state transitions.

<a id="production-architecture"></a>
### Production architecture

**P1 · ⭐ Highly Important · reference**

Define data ownership, request contracts, error recovery, bundle boundaries, and operating evidence before multiplying abstractions.

## ❓ Why Does It Exist?

A changing interface needs a consistent relationship between facts, displayed values, and commands. React makes this relationship explicit when components remain pure and state has a clear owner.

## ⚙️ How Does It Work?

A render sees a snapshot. Updating state schedules later rendering; it does not change an old closure in place. Derive totals during render and put a submit command in the submit handler. An effect connects to something outside rendering; its cleanup undoes that connection. Keep item drafts associated with stable ids rather than array positions.

## 💻 Examples

### 1. Trace the contract

```jsx
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => {
    setCount(c => c + 1);
    setCount(c => c + 1);
  }}>Count {count}</button>;
}
```

Expected behavior and runtime: In a React application importing useState, each click adds two. Replacing both updates with setCount(count + 1) computes the same next value from the current snapshot and adds one.

### 2. Extend and stress the contract

Intermediate: move a derived value out of state and preserve a draft after a failed request. Advanced: demonstrate effect cleanup under remounting and changed dependencies. Record the expected result before implementation; use the failure analysis below to distinguish the broken boundary.

## 🔍 Under the Hood

React evaluates components, reconciles identity, and commits host changes. Rendering can happen more than once; side effects during rendering can therefore duplicate external work. Development Strict Mode can expose missing cleanup by exercising additional setup/cleanup behavior.

## 🌍 Real-World Usage

Inspect the MERN workspace form drafts and conflict refresh. Extend it with search that rejects stale results and a loading representation that does not erase unsent input.

## ⚠️ Common Mistakes

- Using an effect to copy a computable total into another state variable.
- Initiating payment or creation merely because a component rendered.
- Using the sorted row index as an editable row key.

## ✅ Best Practices

Inspect the MERN workspace form drafts and conflict refresh. Extend it with search that rejects stale results and a loading representation that does not erase unsent input. State the invariant, validate at the boundary, use the documented runtime, and keep a reproducible failure case. This guide is educational evidence; it does not certify a deployment.

## 🧪 Practice

- Beginner: explain the counter output using snapshots.
- Intermediate: move a derived value out of state and preserve a draft after a failed request.
- Advanced: demonstrate effect cleanup under remounting and changed dependencies.
- Challenge: reproduce an async race and prove the latest-query invariant in a browser test.

## 🏗️ Mini Project

Build the timed search and table exercises in the interview handbook. Acceptance includes out-of-order responses, empty and failure states, stable row identity, and keyboard operation.

[Project ladder and implementation status](../projects/README.md)

## 💼 Interview Questions

<details>
<summary>Beginner: How do props differ from state?</summary>

Props come from a parent; state records facts owned by the relevant component or model.

</details>

<details>
<summary>Intermediate: When is an effect appropriate?</summary>

When synchronizing with an external system, with cleanup and dependencies that describe the connection.

</details>

<details>
<summary>Advanced: Does memoization establish correctness?</summary>

No. The application must remain correct when computation is repeated or a cache is unavailable.

</details>

<details>
<summary>Scenario: Sorting moves the wrong draft.</summary>

Use stable domain keys and decide whether drafts are row-local or held in a keyed parent model.

</details>

<details>
<summary>Debugging: A request loops forever.</summary>

Inspect unstable dependencies and state changes in the effect; simplify the state model before suppressing warnings.

</details>

<details>
<summary>Output-based: What does the worked example produce, and under which runtime?</summary>

In a React application importing useState, each click adds two. Replacing both updates with setCount(count + 1) computes the same next value from the current snapshot and adds one.

</details>

<details>
<summary>Coding: What would you implement and verify next?</summary>

Build the timed search and table exercises in the interview handbook. Acceptance includes out-of-order responses, empty and failure states, stable row identity, and keyboard operation.

</details>

<details>
<summary>Architecture and production: Which internal boundary needs evidence?</summary>

React evaluates components, reconciles identity, and commits host changes. Rendering can happen more than once; side effects during rendering can therefore duplicate external work. Development Strict Mode can expose missing cleanup by exercising additional setup/cleanup behavior.

</details>

[Difficulty-based interview bank](../../interview-handbook/questions/index.md) · [Scenario practice](../../interview-handbook/scenarios/README.md) · [Debugging library](../debugging/README.md)

## 🔗 Related Concepts

[Local state, shared state, and server-state ownership](state-management.md), [TypeScript and validated application boundaries](typescript.md), [Next.js routing, rendering, and server boundaries](nextjs.md), [Behavioral testing across units, databases, and browsers](testing.md)

Next: [Local state, shared state, and server-state ownership](state-management.md)

Preserved lessons: [notes/react.md](../../notes/react.md), [05-react/notes.md](../../05-react/notes.md)

# 📚 External Resources

## 🥇 Official Documentation

[Primary documentation](https://react.dev/learn) — authoritative reference; use the installed runtime/library version.

## 📘 Recommended Articles

[Focused guide](https://react.dev/learn/you-might-not-need-an-effect) — deepen the mental model and compare its examples with this guide.

## 🎥 Recommended YouTube Videos

See the [verified media register](../resources/VIDEOS.md). A topic without a verified topical video uses written official documentation; unverified recommendations are not padded into this section.

## 🧪 Practice Resources

[Local project ladder](../projects/README.md) · [Timed exercises](../../interview-handbook/machine-coding/README.md)

## 📚 Further Reading

[Curated external register](../resources/README.md) — authority, level, best use, last check, and retrieval limitations.

## 🔄 Last Verified

2026-10-08 — documentation reviewed; example runtime and execution scope are stated above.
