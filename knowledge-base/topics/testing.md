<!-- kb-metadata: {"conceptIds": ["testing--unit-testing", "testing--integration-testing", "testing--api-testing", "testing--component-testing", "testing--end-to-end-testing", "testing--jest", "testing--vitest", "testing--react-testing-library", "testing--supertest", "testing--playwright", "testing--cypress"], "difficulty": "Beginner", "estimatedMinutes": 180, "id": "testing", "importance": 5, "lastVerified": "2026-10-08", "legacyPaths": [], "path": "knowledge-base/topics/testing.md", "prerequisites": ["javascript", "api"], "priority": "P0", "related": ["react", "express", "devops"], "status": "authored-guide", "title": "Behavioral testing across units, databases, and browsers"} -->
# Behavioral testing across units, databases, and browsers

Priority: P0 — 🔥 Essential / Master

Difficulty: Beginner

Importance: 5/5

Prerequisites: [JavaScript values, scope, functions, and collections](javascript.md), [REST contracts, GraphQL, and API evolution](api.md)

Estimated learning time: 180 minutes for explanation and initial practice; independent mastery takes repeated application.

[Knowledge base](../README.md) · [Coverage](../COVERAGE.md) · [Learning paths](../paths/README.md)

## 🎯 Learning Objectives

Explain the mental model, trace the worked example, reproduce a failure, and demonstrate the acceptance checks in the mini-project. Individual concepts below have their own priorities and depth labels.

## 🧠 What Is It?

A unit check exercises a small behavioral contract with controlled inputs and an independent expected outcome.

## Concept reference and priorities

<a id="unit-testing"></a>
### Unit testing

**P0 · 🔥 Essential / Master · worked-example**

A unit check exercises a small behavioral contract with controlled inputs and an independent expected outcome.

<a id="integration-testing"></a>
### Integration testing

**P0 · 🔥 Essential / Master · reference**

Integration checks exercise boundaries between real components such as HTTP parsing and persistence.

<a id="api-testing"></a>
### API testing

**P0 · 🔥 Essential / Master · reference**

API checks verify identity, input, status, representation, ownership, and failure behavior.

<a id="component-testing"></a>
### Component testing

**P1 · ⭐ Highly Important · reference**

Component checks exercise visible interaction and state without relying unnecessarily on implementation structure.

<a id="end-to-end-testing"></a>
### End-to-end testing

**P1 · ⭐ Highly Important · reference**

Browser workflows exercise important user paths through realistic routing, focus, network, and persistence.

<a id="jest"></a>
### Jest

**P2 · 📚 Useful · reference**

Jest supplies a test runner and mocking ecosystem; configuration and environments affect module behavior.

<a id="vitest"></a>
### Vitest

**P1 · ⭐ Highly Important · reference**

Vitest integrates with Vite-oriented projects and offers runner and mocking capabilities.

<a id="react-testing-library"></a>
### React Testing Library

**P1 · ⭐ Highly Important · reference**

Testing Library encourages user-oriented queries and interaction rather than component internals.

<a id="supertest"></a>
### Supertest

**P1 · ⭐ Highly Important · reference**

Supertest drives HTTP applications through request assertions; its boundary scope must still be stated.

<a id="playwright"></a>
### Playwright

**P1 · ⭐ Highly Important · reference**

Playwright automates real browsers with locators, assertions, traces, and workflow tools.

<a id="cypress"></a>
### Cypress

**P2 · 📚 Useful · reference**

Cypress offers browser-oriented end-to-end and component testing with its own execution model.

## ❓ Why Does It Exist?

A passing test is useful only when its expected behavior could detect a meaningful failure. Syntax checks and mocks cannot establish database uniqueness or browser focus behavior.

## ⚙️ How Does It Work?

Choose the smallest realistic boundary for the risk. Test a reducer without a browser, a unique index against a real database, and modal focus in a real browser. Use accessible roles and names for interaction. Control nondeterministic inputs deliberately; wait for a visible condition rather than sleeping for an arbitrary duration. Make the failure message describe the broken contract.

## 💻 Examples

### 1. Trace the contract

```javascript
import test from 'node:test';
import assert from 'node:assert/strict';
test('total includes all positive integer cents', () => {
  const amounts = [1234, 100];
  const total = amounts.reduce((sum, n) => sum + n, 0);
  assert.equal(total, 1334);
});
```

Expected behavior and runtime: Run with node --test on a saved module; the assertion passes for 1334. In application tests, call the actual domain function rather than rewriting its implementation in the test.

### 2. Extend and stress the contract

Intermediate: add a regression check for a reproduced bug. Advanced: run competing writes against a real database. Record the expected result before implementation; use the failure analysis below to distinguish the broken boundary.

## 🔍 Under the Hood

Mocks replace part of the system and therefore reduce what the test establishes. A fake store cannot prove MongoDB atomic predicates or index behavior. Coverage reports measure execution, not the quality of assertions or missing requirements.

## 🌍 Real-World Usage

Compare toolkit tests, UI reducer tests, MongoDB API tests, and Edge browser smoke tests. State which failure each catches and which dependency remains outside its scope.

## ⚠️ Common Mistakes

- Testing that a mocked function returns its own configured result.
- Waiting a fixed timeout for every browser transition.
- Reporting a syntax or unit check as proof that deployment works.

## ✅ Best Practices

Compare toolkit tests, UI reducer tests, MongoDB API tests, and Edge browser smoke tests. State which failure each catches and which dependency remains outside its scope. State the invariant, validate at the boundary, use the documented runtime, and keep a reproducible failure case. This guide is educational evidence; it does not certify a deployment.

## 🧪 Practice

- Beginner: state expected outputs for three boundary inputs.
- Intermediate: add a regression check for a reproduced bug.
- Advanced: run competing writes against a real database.
- Challenge: verify keyboard focus and data recovery during a network failure in a browser.

## 🏗️ Mini Project

Create a test matrix for one workspace feature: pure validation, HTTP contract, persisted invariant, and browser recovery. Remove redundant checks that do not add evidence.

[Project ladder and implementation status](../projects/README.md)

## 💼 Interview Questions

<details>
<summary>Beginner: What makes an assertion useful?</summary>

It compares observed behavior with an independently justified expected result.

</details>

<details>
<summary>Intermediate: When should a real database be used?</summary>

When correctness depends on database behavior such as uniqueness, atomicity, or query semantics.

</details>

<details>
<summary>Advanced: What does full coverage not prove?</summary>

Correct assertions, complete requirements, realistic data, or operational behavior.

</details>

<details>
<summary>Scenario: Tests pass but users cannot focus a modal control.</summary>

Add browser keyboard and focus checks; a simulated DOM may miss the actual interaction.

</details>

<details>
<summary>Debugging: A test intermittently fails.</summary>

Inspect shared state, timing assumptions, cleanup, ordering, and uncontrolled external dependencies.

</details>

<details>
<summary>Output-based: What does the worked example produce, and under which runtime?</summary>

Run with node --test on a saved module; the assertion passes for 1334. In application tests, call the actual domain function rather than rewriting its implementation in the test.

</details>

<details>
<summary>Coding: What would you implement and verify next?</summary>

Create a test matrix for one workspace feature: pure validation, HTTP contract, persisted invariant, and browser recovery. Remove redundant checks that do not add evidence.

</details>

<details>
<summary>Architecture and production: Which internal boundary needs evidence?</summary>

Mocks replace part of the system and therefore reduce what the test establishes. A fake store cannot prove MongoDB atomic predicates or index behavior. Coverage reports measure execution, not the quality of assertions or missing requirements.

</details>

[Difficulty-based interview bank](../../interview-handbook/questions/index.md) · [Scenario practice](../../interview-handbook/scenarios/README.md) · [Debugging library](../debugging/README.md)

## 🔗 Related Concepts

[React identity, state, effects, and resilient interfaces](react.md), [Express services, validation, and protected REST routes](express.md), [Containers, CI/CD, and operating a web service](devops.md)

Next: [React identity, state, effects, and resilient interfaces](react.md)

# 📚 External Resources

## 🥇 Official Documentation

[Primary documentation](https://testing-library.com/docs/react-testing-library/intro/) — authoritative reference; use the installed runtime/library version.

## 📘 Recommended Articles

[Focused guide](https://playwright.dev/docs/intro) — deepen the mental model and compare its examples with this guide.

## 🎥 Recommended YouTube Videos

See the [verified media register](../resources/VIDEOS.md). A topic without a verified topical video uses written official documentation; unverified recommendations are not padded into this section.

## 🧪 Practice Resources

[Local project ladder](../projects/README.md) · [Timed exercises](../../interview-handbook/machine-coding/README.md)

## 📚 Further Reading

[Curated external register](../resources/README.md) — authority, level, best use, last check, and retrieval limitations.

## 🔄 Last Verified

2026-10-08 — documentation reviewed; example runtime and execution scope are stated above.
