<!-- kb-metadata: {"conceptIds": ["engineering--clean-code", "engineering--solid", "engineering--dry", "engineering--kiss", "engineering--yagni", "engineering--design-patterns", "engineering--architecture-patterns", "engineering--layered-architecture", "engineering--mvc", "engineering--clean-architecture", "engineering--dependency-injection", "engineering--error-handling", "engineering--logging", "engineering--observability", "engineering--documentation"], "difficulty": "Intermediate", "estimatedMinutes": 120, "id": "engineering", "importance": 4, "lastVerified": "2026-10-08", "legacyPaths": [], "path": "knowledge-base/topics/engineering.md", "prerequisites": ["javascript", "git"], "priority": "P1", "related": ["testing", "api", "system-design"], "status": "authored-guide", "title": "Maintainable code, architecture, and observability"} -->
# Maintainable code, architecture, and observability

Priority: P1 — ⭐ Highly Important

Difficulty: Intermediate

Importance: 4/5

Prerequisites: [JavaScript values, scope, functions, and collections](javascript.md), [Git history, collaboration, and code review](git.md)

Estimated learning time: 120 minutes for explanation and initial practice; independent mastery takes repeated application.

[Knowledge base](../README.md) · [Coverage](../COVERAGE.md) · [Learning paths](../paths/README.md)

## 🎯 Learning Objectives

Explain the mental model, trace the worked example, reproduce a failure, and demonstrate the acceptance checks in the mini-project. Individual concepts below have their own priorities and depth labels.

## 🧠 What Is It?

Names, small coherent contracts, explicit boundaries, and readable control flow make change easier to assess.

## Concept reference and priorities

<a id="clean-code"></a>
### Clean code

**P1 · ⭐ Highly Important · reference**

Names, small coherent contracts, explicit boundaries, and readable control flow make change easier to assess.

<a id="solid"></a>
### SOLID

**P2 · 📚 Useful · reference**

SOLID principles describe responsibility and substitutability concerns; applying them mechanically can overcomplicate small systems.

<a id="dry"></a>
### DRY

**P1 · ⭐ Highly Important · reference**

Remove duplicated knowledge whose inconsistent evolution would cause bugs; similar-looking code can have different reasons to change.

<a id="kiss"></a>
### KISS

**P0 · 🔥 Essential / Master · reference**

Prefer a simple sufficient model that makes the important behavior visible.

<a id="yagni"></a>
### YAGNI

**P1 · ⭐ Highly Important · reference**

Delay speculative capabilities until a real requirement justifies their cost.

<a id="design-patterns"></a>
### Design patterns

**P2 · 📚 Useful · reference**

Patterns name recurring solutions and tradeoffs; choose them for a concrete problem rather than a diagram collection.

<a id="architecture-patterns"></a>
### Architecture patterns

**P2 · 📚 Useful · reference**

Architectural styles organize dependency and deployment boundaries under specific constraints.

<a id="layered-architecture"></a>
### Layered architecture

**P1 · ⭐ Highly Important · worked-example**

Layers separate transport, domain, and persistence responsibilities when this clarifies ownership.

<a id="mvc"></a>
### MVC

**P2 · 📚 Useful · reference**

MVC separates model, view, and controller roles, though framework interpretations vary.

<a id="clean-architecture"></a>
### Clean architecture

**P2 · 📚 Useful · reference**

Clean architecture directs dependencies toward domain behavior and uses adapters around external systems.

<a id="dependency-injection"></a>
### Dependency injection

**P1 · ⭐ Highly Important · worked-example**

Pass dependencies explicitly so authority, failure behavior, and test boundaries are visible.

<a id="error-handling"></a>
### Error handling

**P0 · 🔥 Essential / Master · reference**

Translate errors at meaningful boundaries without losing diagnostic context or exposing secrets.

<a id="logging"></a>
### Logging

**P1 · ⭐ Highly Important · reference**

Logs record contextual events; structured fields help query them and redaction prevents sensitive disclosure.

<a id="observability"></a>
### Observability

**P1 · ⭐ Highly Important · reference**

Logs, metrics, and traces provide evidence about internal behavior; useful signals are tied to concrete questions.

<a id="documentation"></a>
### Documentation

**P0 · 🔥 Essential / Master · reference**

Document contracts, decisions, setup, limitations, and verification so another developer can act without guessing.

## ❓ Why Does It Exist?

A project survives when another engineer can change one rule without accidentally changing unrelated behavior. Architecture should help a concrete change rather than create layers for their own sake.

## ⚙️ How Does It Work?

Put domain rules where they can be named and tested. Let HTTP controllers translate protocol details, services decide domain outcomes, and store adapters establish persistence behavior. Inject a store instead of reading a global singleton inside every function. Record a decision with alternatives, constraints, expected benefit, and a condition that would make you revisit it. Add telemetry to answer specific failure questions.

## 💻 Examples

### 1. Trace the contract

```javascript
function createTaskService(store) {
  return {
    async rename(owner, id, title, expectedVersion) {
      if (typeof title !== 'string' || !title.trim()) throw new Error('Invalid title');
      return store.updateTask(owner, id, {title:title.trim(), expectedVersion});
    }
  };
}
```

Expected behavior and runtime: The service requires a store matching the stated contract. It rejects a blank title before calling the store; persisted ownership and version safety still belong in the adapter. A production error type should preserve a safe code.

### 2. Extend and stress the contract

Intermediate: inject a store and simulate one expected failure. Advanced: write a decision record comparing two persistence boundaries. Record the expected result before implementation; use the failure analysis below to distinguish the broken boundary.

## 🔍 Under the Hood

Dependency direction affects which details propagate through a change. Observability correlates events through a request or job id, while metrics aggregate signals such as latency distribution and error rates. A high-cardinality label can overwhelm a metrics system even when each request is cheap.

## 🌍 Real-World Usage

Explain why the existing workspace separates app, validation, and store. Add a request id and safe duration/status fields without logging credentials or full payloads.

## ⚠️ Common Mistakes

- Creating generic repositories before understanding the actual invariant.
- Hiding errors in an empty catch or returning a success-looking fallback.
- Logging every user id as an unbounded metrics label.

## ✅ Best Practices

Explain why the existing workspace separates app, validation, and store. Add a request id and safe duration/status fields without logging credentials or full payloads. State the invariant, validate at the boundary, use the documented runtime, and keep a reproducible failure case. This guide is educational evidence; it does not certify a deployment.

## 🧪 Practice

- Beginner: name one function by its actual contract.
- Intermediate: inject a store and simulate one expected failure.
- Advanced: write a decision record comparing two persistence boundaries.
- Challenge: diagnose a slow workflow with a correlated trace, logs, and a bounded metric.

## 🏗️ Mini Project

Refactor one workspace domain only when it improves a demonstrated change. Include before/after behavior, a dependency diagram, and a test showing the invariant remains intact.

[Project ladder and implementation status](../projects/README.md)

## 💼 Interview Questions

<details>
<summary>Beginner: Is shorter code always cleaner?</summary>

No. Visible intent, correct boundaries, and understandable behavior matter more than line count.

</details>

<details>
<summary>Intermediate: When should duplication remain?</summary>

When the similar code expresses independently changing knowledge and extraction would couple it unnecessarily.

</details>

<details>
<summary>Advanced: What does dependency injection establish?</summary>

Explicit dependency ownership and replaceable boundaries; it does not prove the substitute behaves like a real store.

</details>

<details>
<summary>Scenario: Every small change touches many layers.</summary>

Inspect unnecessary abstractions and ownership; simplify the boundary around the actual rule.

</details>

<details>
<summary>Debugging: A request fails with no useful context.</summary>

Propagate a correlation id, classify the error safely, and retain cause information in controlled server diagnostics.

</details>

<details>
<summary>Output-based: What does the worked example produce, and under which runtime?</summary>

The service requires a store matching the stated contract. It rejects a blank title before calling the store; persisted ownership and version safety still belong in the adapter. A production error type should preserve a safe code.

</details>

<details>
<summary>Coding: What would you implement and verify next?</summary>

Refactor one workspace domain only when it improves a demonstrated change. Include before/after behavior, a dependency diagram, and a test showing the invariant remains intact.

</details>

<details>
<summary>Architecture and production: Which internal boundary needs evidence?</summary>

Dependency direction affects which details propagate through a change. Observability correlates events through a request or job id, while metrics aggregate signals such as latency distribution and error rates. A high-cardinality label can overwhelm a metrics system even when each request is cheap.

</details>

[Difficulty-based interview bank](../../interview-handbook/questions/index.md) · [Scenario practice](../../interview-handbook/scenarios/README.md) · [Debugging library](../debugging/README.md)

## 🔗 Related Concepts

[Behavioral testing across units, databases, and browsers](testing.md), [REST contracts, GraphQL, and API evolution](api.md), [System design, consistency, and failure tradeoffs](system-design.md)

Next: [Behavioral testing across units, databases, and browsers](testing.md)

# 📚 External Resources

## 🥇 Official Documentation

[Primary documentation](https://opentelemetry.io/docs/concepts/observability-primer/) — authoritative reference; use the installed runtime/library version.

## 📘 Recommended Articles

[Focused guide](https://12factor.net/) — deepen the mental model and compare its examples with this guide.

## 🎥 Recommended YouTube Videos

See the [verified media register](../resources/VIDEOS.md). A topic without a verified topical video uses written official documentation; unverified recommendations are not padded into this section.

## 🧪 Practice Resources

[Local project ladder](../projects/README.md) · [Timed exercises](../../interview-handbook/machine-coding/README.md)

## 📚 Further Reading

[Curated external register](../resources/README.md) — authority, level, best use, last check, and retrieval limitations.

## 🔄 Last Verified

2026-10-08 — documentation reviewed; example runtime and execution scope are stated above.
