<!-- kb-metadata: {"conceptIds": ["typescript--fundamentals", "typescript--types", "typescript--interfaces", "typescript--type-aliases", "typescript--unions", "typescript--intersections", "typescript--generics", "typescript--utility-types", "typescript--narrowing", "typescript--type-guards", "typescript--enums", "typescript--modules", "typescript--classes", "typescript--advanced-types", "typescript--typescript-with-react", "typescript--typescript-with-node", "typescript--typescript-with-express", "typescript--full-stack-typescript"], "difficulty": "Intermediate", "estimatedMinutes": 120, "id": "typescript", "importance": 4, "lastVerified": "2026-10-08", "legacyPaths": [], "path": "knowledge-base/topics/typescript.md", "prerequisites": ["javascript"], "priority": "P1", "related": ["react", "express", "engineering"], "status": "authored-guide", "title": "TypeScript and validated application boundaries"} -->
# TypeScript and validated application boundaries

Priority: P1 — ⭐ Highly Important

Difficulty: Intermediate

Importance: 4/5

Prerequisites: [JavaScript values, scope, functions, and collections](javascript.md)

Estimated learning time: 120 minutes for explanation and initial practice; independent mastery takes repeated application.

[Knowledge base](../README.md) · [Coverage](../COVERAGE.md) · [Learning paths](../paths/README.md)

## 🎯 Learning Objectives

Explain the mental model, trace the worked example, reproduce a failure, and demonstrate the acceptance checks in the mini-project. Individual concepts below have their own priorities and depth labels.

## 🧠 What Is It?

TypeScript checks relationships between values before execution; the emitted JavaScript still needs runtime validation.

## Concept reference and priorities

<a id="fundamentals"></a>
### Fundamentals

**P1 · ⭐ Highly Important · reference**

TypeScript checks relationships between values before execution; the emitted JavaScript still needs runtime validation.

<a id="types"></a>
### Types

**P1 · ⭐ Highly Important · worked-example**

Types describe permitted values and operations. Prefer precise domain types to pervasive any.

<a id="interfaces"></a>
### Interfaces

**P1 · ⭐ Highly Important · reference**

Interfaces describe structural shapes and can support declaration merging.

<a id="type-aliases"></a>
### Type aliases

**P1 · ⭐ Highly Important · reference**

Aliases name type expressions such as unions, tuples, and mapped types.

<a id="unions"></a>
### Unions

**P1 · ⭐ Highly Important · worked-example**

A union permits one of several alternatives; discriminate valid application states with a stable field.

<a id="intersections"></a>
### Intersections

**P2 · 📚 Useful · reference**

An intersection requires the combined constraints of multiple types; incompatible members can produce impossible types.

<a id="generics"></a>
### Generics

**P1 · ⭐ Highly Important · reference**

Generics preserve a relationship between inputs and outputs rather than discarding information through any.

<a id="utility-types"></a>
### Utility types

**P2 · 📚 Useful · reference**

Utilities such as Pick, Omit, Partial, and Record transform type structure; they do not validate data.

<a id="narrowing"></a>
### Narrowing

**P1 · ⭐ Highly Important · worked-example**

Control-flow analysis refines a type after checks such as typeof or a discriminant test.

<a id="type-guards"></a>
### Type guards

**P1 · ⭐ Highly Important · reference**

A guard claims a runtime check establishes a type; an incorrect guard can create false confidence.

<a id="enums"></a>
### Enums

**P2 · 📚 Useful · reference**

Enums can emit runtime objects; literal unions are often enough when only a compile-time set is required.

<a id="modules"></a>
### Modules

**P1 · ⭐ Highly Important · reference**

Explicit imports and exports coordinate types and values; type-only imports avoid unnecessary runtime dependencies.

<a id="classes"></a>
### Classes

**P2 · 📚 Useful · reference**

Access modifiers and implements help model intent; static type constraints are not a substitute for runtime authority.

<a id="advanced-types"></a>
### Advanced types

**P3 · 🧩 Advanced / Specialized · reference**

Conditional, mapped, indexed-access, and template-literal types express complex relationships at a readability cost.

<a id="typescript-with-react"></a>
### TypeScript with React

**P1 · ⭐ Highly Important · worked-example**

Type props, events, and state according to their actual roles; unions can prevent conflicting request states.

<a id="typescript-with-node"></a>
### TypeScript with Node

**P1 · ⭐ Highly Important · reference**

Match compiler module settings to Node's runtime package and import rules.

<a id="typescript-with-express"></a>
### TypeScript with Express

**P1 · ⭐ Highly Important · reference**

Type checked service inputs after validating the request; request generics alone do not authenticate a payload.

<a id="full-stack-typescript"></a>
### Full-stack TypeScript

**P1 · ⭐ Highly Important · reference**

Share domain contracts while preserving server-owned fields and independent runtime boundary validation.

## ❓ Why Does It Exist?

A loading boolean, optional data, and optional error permit combinations that the application cannot meaningfully display. Explicit types make these states visible before the browser runs.

## ⚙️ How Does It Work?

Treat unknown network data as unknown until checked. Narrow a discriminated union before accessing variant fields. Use strict checking and prefer a small understandable model over a clever generic that hides the contract. Generated API types can reduce drift, but they describe expected data rather than prove what arrived.

## 💻 Examples

### 1. Trace the contract

```typescript
type Load<T> =
  | {status:'loading'}
  | {status:'success'; data:T}
  | {status:'error'; message:string};
function size(state: Load<string[]>): number {
  if (state.status === 'success') return state.data.length;
  return 0;
}
console.log(size({status:'success', data:['mern']}));
```

Expected behavior and runtime: Compiled with a TypeScript compiler, the log is 1. Accessing data before narrowing is a type error. This snippet is a type-design example, not a claim that the JavaScript workspace has already been migrated.

### 2. Extend and stress the contract

Intermediate: narrow the example and add an empty result state. Advanced: implement an exhaustiveness check when a variant changes. Record the expected result before implementation; use the failure analysis below to distinguish the broken boundary.

## 🔍 Under the Hood

The type checker tracks structural compatibility and control flow. Most type annotations disappear in emitted JavaScript; an as assertion does not insert a runtime check. Type complexity can also increase editor and build cost.

## 🌍 Real-World Usage

Migrate one task response and one React request state first. Keep validation at the HTTP edge and return typed domain results to services.

## ⚠️ Common Mistakes

- Casting response.json() to a trusted domain object.
- Using Partial<User> as a writable API payload, including privileged fields.
- Sharing server secrets or server-only modules through a client import.

## ✅ Best Practices

Migrate one task response and one React request state first. Keep validation at the HTTP edge and return typed domain results to services. State the invariant, validate at the boundary, use the documented runtime, and keep a reproducible failure case. This guide is educational evidence; it does not certify a deployment.

## 🧪 Practice

- Beginner: distinguish a literal union from a string.
- Intermediate: narrow the example and add an empty result state.
- Advanced: implement an exhaustiveness check when a variant changes.
- Challenge: compile and run a small boundary parser with invalid JSON inputs.

## 🏗️ Mini Project

Create a strict TypeScript slice for bookmark validation and its UI state; acceptance includes compile checks and runtime rejection of malformed input.

[Project ladder and implementation status](../projects/README.md)

## 💼 Interview Questions

<details>
<summary>Beginner: Does TypeScript validate an API response?</summary>

No. Validate the received runtime value at the boundary.

</details>

<details>
<summary>Intermediate: Why prefer unknown over any at an input edge?</summary>

Unknown requires a check before use, while any disables useful constraints.

</details>

<details>
<summary>Advanced: Can an assertion prove authorization?</summary>

No. Authorization depends on trusted runtime identity and resource scope.

</details>

<details>
<summary>Scenario: A field is missing despite successful compilation.</summary>

Reproduce the received payload and add a runtime validator; inspect contract drift.

</details>

<details>
<summary>Debugging: Two request-state booleans disagree.</summary>

Replace invalid combinations with a discriminated union and explicit transitions.

</details>

<details>
<summary>Output-based: What does the worked example produce, and under which runtime?</summary>

Compiled with a TypeScript compiler, the log is 1. Accessing data before narrowing is a type error. This snippet is a type-design example, not a claim that the JavaScript workspace has already been migrated.

</details>

<details>
<summary>Coding: What would you implement and verify next?</summary>

Create a strict TypeScript slice for bookmark validation and its UI state; acceptance includes compile checks and runtime rejection of malformed input.

</details>

<details>
<summary>Architecture and production: Which internal boundary needs evidence?</summary>

The type checker tracks structural compatibility and control flow. Most type annotations disappear in emitted JavaScript; an as assertion does not insert a runtime check. Type complexity can also increase editor and build cost.

</details>

[Difficulty-based interview bank](../../interview-handbook/questions/index.md) · [Scenario practice](../../interview-handbook/scenarios/README.md) · [Debugging library](../debugging/README.md)

## 🔗 Related Concepts

[React identity, state, effects, and resilient interfaces](react.md), [Express services, validation, and protected REST routes](express.md), [Maintainable code, architecture, and observability](engineering.md)

Next: [React identity, state, effects, and resilient interfaces](react.md)

# 📚 External Resources

## 🥇 Official Documentation

[Primary documentation](https://www.typescriptlang.org/docs/handbook/intro.html) — authoritative reference; use the installed runtime/library version.

## 📘 Recommended Articles

[Focused guide](https://www.typescriptlang.org/docs/handbook/2/narrowing.html) — deepen the mental model and compare its examples with this guide.

## 🎥 Recommended YouTube Videos

See the [verified media register](../resources/VIDEOS.md). A topic without a verified topical video uses written official documentation; unverified recommendations are not padded into this section.

## 🧪 Practice Resources

[Local project ladder](../projects/README.md) · [Timed exercises](../../interview-handbook/machine-coding/README.md)

## 📚 Further Reading

[Curated external register](../resources/README.md) — authority, level, best use, last check, and retrieval limitations.

## 🔄 Last Verified

2026-10-08 — documentation reviewed; example runtime and execution scope are stated above.
