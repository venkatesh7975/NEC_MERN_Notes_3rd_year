<!-- kb-metadata: {"conceptIds": ["state-management--local-state", "state-management--context", "state-management--redux", "state-management--redux-toolkit", "state-management--zustand", "state-management--server-state", "state-management--tanstack-query", "state-management--when-to-use-which-approach"], "difficulty": "Intermediate", "estimatedMinutes": 120, "id": "state-management", "importance": 4, "lastVerified": "2026-10-08", "legacyPaths": [], "path": "knowledge-base/topics/state-management.md", "prerequisites": ["react"], "priority": "P1", "related": ["api", "engineering"], "status": "authored-guide", "title": "Local state, shared state, and server-state ownership"} -->
# Local state, shared state, and server-state ownership

Priority: P1 — ⭐ Highly Important

Difficulty: Intermediate

Importance: 4/5

Prerequisites: [React identity, state, effects, and resilient interfaces](react.md)

Estimated learning time: 120 minutes for explanation and initial practice; independent mastery takes repeated application.

[Knowledge base](../README.md) · [Coverage](../COVERAGE.md) · [Learning paths](../paths/README.md)

## 🎯 Learning Objectives

Explain the mental model, trace the worked example, reproduce a failure, and demonstrate the acceptance checks in the mini-project. Individual concepts below have their own priorities and depth labels.

## 🧠 What Is It?

Keep a fact near its users until a real sharing requirement appears.

## Concept reference and priorities

<a id="local-state"></a>
### Local state

**P0 · 🔥 Essential / Master · worked-example**

Keep a fact near its users until a real sharing requirement appears.

<a id="context"></a>
### Context

**P1 · ⭐ Highly Important · reference**

Context transports a shared value through a subtree; it does not automatically manage remote caching or normalize entities.

<a id="redux"></a>
### Redux

**P2 · 📚 Useful · reference**

Redux centralizes predictable transitions through actions and reducers; it has an ecosystem for complex shared application state.

<a id="redux-toolkit"></a>
### Redux Toolkit

**P1 · ⭐ Highly Important · reference**

Redux Toolkit provides the recommended Redux setup and utilities, reducing hand-written store boilerplate.

<a id="zustand"></a>
### Zustand

**P2 · 📚 Useful · reference**

Zustand provides an external store with selectors; subscriptions and ownership still need intentional design.

<a id="server-state"></a>
### Server state

**P0 · 🔥 Essential / Master · worked-example**

Server state has remote authority, freshness, invalidation, and concurrent-writer concerns beyond local component state.

<a id="tanstack-query"></a>
### TanStack Query

**P1 · ⭐ Highly Important · reference**

TanStack Query coordinates asynchronous server-state caching and lifecycle; query keys and invalidation define correctness.

<a id="when-to-use-which-approach"></a>
### When to use which approach

**P0 · 🔥 Essential / Master · worked-example**

Choose local state, context, an external store, or a query cache according to ownership and coordination needs.

## ❓ Why Does It Exist?

Copying every API response into several stores creates drift. A draft and a saved server record have different owners and different conflict rules.

## ⚙️ How Does It Work?

Classify each fact before selecting a library: a temporary form draft is local; theme is shared UI configuration; a server list is cached remote state. A query key must include relevant parameters and scope. Invalidate or update cache after a mutation according to the authoritative response. Separate users and clear sensitive cache on session changes.

## 💻 Examples

### 1. Trace the contract

```javascript
const queryKey = ['bookmarks', userId, {search, page}];
// Example contract for a query library: every changing read parameter is keyed.
const draft = {title: '', url: ''};
// Draft belongs to the form. Saved bookmarks belong to the server.
```

Expected behavior and runtime: These values illustrate ownership; no query library is invoked. Changing userId, search, or page must select a distinct read identity, and a failed write must not silently discard draft.

### 2. Extend and stress the contract

Intermediate: include all filter parameters in query identity. Advanced: design rollback or refetch after a 409 conflict. Record the expected result before implementation; use the failure analysis below to distinguish the broken boundary.

## 🔍 Under the Hood

Reducers describe transitions; external-store selectors determine subscriptions; query caches schedule freshness and refetching. A shared cache can deduplicate reads but cannot replace a server uniqueness index or version predicate.

## 🌍 Real-World Usage

Introduce a query cache into the workspace only after writing the read and invalidation contract. Compare network traces and retained form behavior before and after.

## ⚠️ Common Mistakes

- Choosing Redux for every small component by default.
- Omitting the account id from a shared query key.
- Letting an optimistic cache update overwrite a later authoritative result.

## ✅ Best Practices

Introduce a query cache into the workspace only after writing the read and invalidation contract. Compare network traces and retained form behavior before and after. State the invariant, validate at the boundary, use the documented runtime, and keep a reproducible failure case. This guide is educational evidence; it does not certify a deployment.

## 🧪 Practice

- Beginner: classify ten UI facts by owner.
- Intermediate: include all filter parameters in query identity.
- Advanced: design rollback or refetch after a 409 conflict.
- Challenge: switch between two accounts and prove old private data is not reused.

## 🏗️ Mini Project

Implement a server-state adapter for reading-list CRUD. Acceptance includes session changes, invalidation after deletion, failed mutation recovery, and one documented tradeoff between libraries.

[Project ladder and implementation status](../projects/README.md)

## 💼 Interview Questions

<details>
<summary>Beginner: Is a query cache the database?</summary>

No. It is a client-side representation with freshness and invalidation behavior.

</details>

<details>
<summary>Intermediate: What belongs in a query key?</summary>

Every input that changes the represented read, including relevant account scope.

</details>

<details>
<summary>Advanced: Can a client store prevent two-device writes?</summary>

No. Persisted server concurrency rules must establish that invariant.

</details>

<details>
<summary>Scenario: One user sees cached data from another.</summary>

Separate account-scoped keys and clear or partition sensitive caches during session changes.

</details>

<details>
<summary>Debugging: A saved item never appears.</summary>

Check query identity, mutation result handling, invalidation, and server response before forcing arbitrary rerenders.

</details>

<details>
<summary>Output-based: What does the worked example produce, and under which runtime?</summary>

These values illustrate ownership; no query library is invoked. Changing userId, search, or page must select a distinct read identity, and a failed write must not silently discard draft.

</details>

<details>
<summary>Coding: What would you implement and verify next?</summary>

Implement a server-state adapter for reading-list CRUD. Acceptance includes session changes, invalidation after deletion, failed mutation recovery, and one documented tradeoff between libraries.

</details>

<details>
<summary>Architecture and production: Which internal boundary needs evidence?</summary>

Reducers describe transitions; external-store selectors determine subscriptions; query caches schedule freshness and refetching. A shared cache can deduplicate reads but cannot replace a server uniqueness index or version predicate.

</details>

[Difficulty-based interview bank](../../interview-handbook/questions/index.md) · [Scenario practice](../../interview-handbook/scenarios/README.md) · [Debugging library](../debugging/README.md)

## 🔗 Related Concepts

[REST contracts, GraphQL, and API evolution](api.md), [Maintainable code, architecture, and observability](engineering.md)

Next: [REST contracts, GraphQL, and API evolution](api.md)

# 📚 External Resources

## 🥇 Official Documentation

[Primary documentation](https://redux-toolkit.js.org/introduction/getting-started) — authoritative reference; use the installed runtime/library version.

## 📘 Recommended Articles

[Focused guide](https://tanstack.com/query/latest/docs/framework/react/overview) — deepen the mental model and compare its examples with this guide.

## 🎥 Recommended YouTube Videos

See the [verified media register](../resources/VIDEOS.md). A topic without a verified topical video uses written official documentation; unverified recommendations are not padded into this section.

## 🧪 Practice Resources

[Local project ladder](../projects/README.md) · [Timed exercises](../../interview-handbook/machine-coding/README.md)

## 📚 Further Reading

[Curated external register](../resources/README.md) — authority, level, best use, last check, and retrieval limitations.

## 🔄 Last Verified

2026-10-08 — documentation reviewed; example runtime and execution scope are stated above.
