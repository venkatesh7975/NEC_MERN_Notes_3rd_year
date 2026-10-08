<!-- kb-metadata: {"conceptIds": ["api--rest", "api--graphql", "api--http-methods", "api--status-codes", "api--headers", "api--authentication", "api--authorization", "api--pagination", "api--filtering", "api--sorting", "api--versioning", "api--validation", "api--error-handling", "api--rate-limiting", "api--api-documentation", "api--openapi-swagger"], "difficulty": "Beginner", "estimatedMinutes": 180, "id": "api", "importance": 5, "lastVerified": "2026-10-08", "legacyPaths": ["notes/rest-api.md", "07-express-rest/rest-api/notes.md"], "path": "knowledge-base/topics/api.md", "prerequisites": ["foundations", "javascript"], "priority": "P0", "related": ["express", "security", "testing"], "status": "authored-guide", "title": "REST contracts, GraphQL, and API evolution"} -->
# REST contracts, GraphQL, and API evolution

Priority: P0 — 🔥 Essential / Master

Difficulty: Beginner

Importance: 5/5

Prerequisites: [Internet, HTTP, and the browser](foundations.md), [JavaScript values, scope, functions, and collections](javascript.md)

Estimated learning time: 180 minutes for explanation and initial practice; independent mastery takes repeated application.

[Knowledge base](../README.md) · [Coverage](../COVERAGE.md) · [Learning paths](../paths/README.md)

## 🎯 Learning Objectives

Explain the mental model, trace the worked example, reproduce a failure, and demonstrate the acceptance checks in the mini-project. Individual concepts below have their own priorities and depth labels.

## 🧠 What Is It?

REST organizes interaction around resources and representations; use coherent HTTP semantics rather than arbitrary action names.

## Concept reference and priorities

<a id="rest"></a>
### REST

**P0 · 🔥 Essential / Master · reference**

REST organizes interaction around resources and representations; use coherent HTTP semantics rather than arbitrary action names.

<a id="graphql"></a>
### GraphQL

**P2 · 📚 Useful · reference**

GraphQL uses a typed schema and selection sets; resolvers still need authorization, cost bounds, and error contracts.

<a id="http-methods"></a>
### HTTP methods

**P0 · 🔥 Essential / Master · reference**

Methods have semantics such as retrieval, replacement, and partial update; choose them consistently.

<a id="status-codes"></a>
### Status codes

**P0 · 🔥 Essential / Master · worked-example**

Status codes describe response outcomes; preserve distinctions clients need for recovery.

<a id="headers"></a>
### Headers

**P0 · 🔥 Essential / Master · reference**

Headers carry representation, caching, authentication, and other protocol metadata.

<a id="authentication"></a>
### Authentication

**P0 · 🔥 Essential / Master · reference**

Authentication establishes the caller's trusted identity from accepted credentials.

<a id="authorization"></a>
### Authorization

**P0 · 🔥 Essential / Master · reference**

Authorization establishes whether that caller may perform this operation on this resource.

<a id="pagination"></a>
### Pagination

**P1 · ⭐ Highly Important · reference**

Lists need bounded sizes and a stable continuation or offset contract.

<a id="filtering"></a>
### Filtering

**P1 · ⭐ Highly Important · reference**

Supported filter fields and operators should be explicit and validated.

<a id="sorting"></a>
### Sorting

**P1 · ⭐ Highly Important · reference**

Document ordering, allowed fields, and tie-breakers rather than accepting arbitrary expressions.

<a id="versioning"></a>
### Versioning

**P2 · 📚 Useful · reference**

Versioning manages incompatible contract changes; keep compatibility policy visible to consumers.

<a id="validation"></a>
### Validation

**P0 · 🔥 Essential / Master · reference**

Validate runtime shape, types, ranges, allowed fields, and domain relationships.

<a id="error-handling"></a>
### Error handling

**P0 · 🔥 Essential / Master · worked-example**

Return safe structured errors with a stable code and useful message; preserve server diagnostic context separately.

<a id="rate-limiting"></a>
### Rate limiting

**P1 · ⭐ Highly Important · reference**

Define caller identity, window policy, distributed scope, and recovery guidance.

<a id="api-documentation"></a>
### API documentation

**P0 · 🔥 Essential / Master · reference**

Document authentication, inputs, outputs, errors, limits, and examples for actual implemented behavior.

<a id="openapi-swagger"></a>
### OpenAPI / Swagger

**P1 · ⭐ Highly Important · reference**

OpenAPI describes HTTP contracts; Swagger is a family of tools around API descriptions rather than another protocol.

## ❓ Why Does It Exist?

The client needs to know how to recover from invalid input, missing authority, and concurrent edits. An explicit contract allows independent implementation and useful integration tests.

## ⚙️ How Does It Work?

Begin with resource identity and permitted operations. State required fields, server-owned fields, status behavior, and error representation. A 409 conflict can tell the UI to refresh before reapplying intent. Retries need idempotency: repeating a create request can duplicate work unless the server establishes a unique operation identity. GraphQL changes request composition, not trust boundaries.

## 💻 Examples

### 1. Trace the contract

```javascript
const error = {
  error:{code:'VERSION_CONFLICT', message:'Refresh before editing again'}
};
// Example HTTP outcome: 409 with application/json.
// Client preserves the draft, refreshes current data, and asks for reconciliation.
```

Expected behavior and runtime: This illustrates the workspace conflict response, not an executable server. The durable version predicate decides the conflict; the response defines client recovery.

### 2. Extend and stress the contract

Intermediate: document invalid input, expired session, and conflict recovery. Advanced: design a cursor that includes a stable tie-breaker. Record the expected result before implementation; use the failure analysis below to distinguish the broken boundary.

## 🔍 Under the Hood

Proxies, caches, browsers, clients, and servers all interpret protocol information. An OpenAPI document is a description and can drift from code; contract tests should check important examples. GraphQL query flexibility requires limits on depth, amount of work, and authorization inside resolvers.

## 🌍 Real-World Usage

Write an OpenAPI contract for the implemented workspace routes and compare it with API tests. Keep list limits and full-account summary semantics explicit.

## ⚠️ Common Mistakes

- Returning 200 for every failure.
- Publishing an API description for features the source does not implement.
- Treating GraphQL schema types as a replacement for identity and permissions.

## ✅ Best Practices

Write an OpenAPI contract for the implemented workspace routes and compare it with API tests. Keep list limits and full-account summary semantics explicit. State the invariant, validate at the boundary, use the documented runtime, and keep a reproducible failure case. This guide is educational evidence; it does not certify a deployment.

## 🧪 Practice

- Beginner: describe a read and create request with status and content type.
- Intermediate: document invalid input, expired session, and conflict recovery.
- Advanced: design a cursor that includes a stable tie-breaker.
- Challenge: model retried create operations and prove duplicate business effects do not occur.

## 🏗️ Mini Project

Add an executable API contract packet for the workspace with examples, errors, and regression evidence. Extend it only when the corresponding behavior exists.

[Project ladder and implementation status](../projects/README.md)

## 💼 Interview Questions

<details>
<summary>Beginner: How do authentication and authorization differ?</summary>

Authentication establishes identity; authorization decides permitted actions.

</details>

<details>
<summary>Intermediate: Why bound a list?</summary>

To control response size and resource usage while defining a continuation contract.

</details>

<details>
<summary>Advanced: Does GraphQL make a query cheap?</summary>

No. Resolver work and result cardinality need explicit limits and measurement.

</details>

<details>
<summary>Scenario: A timeout is followed by a duplicate create.</summary>

The first operation may have succeeded; use a persisted idempotency contract before automatic replay.

</details>

<details>
<summary>Debugging: Documentation says a field is required but the server accepts none.</summary>

Reconcile schema and implementation and add a contract regression test.

</details>

<details>
<summary>Output-based: What does the worked example produce, and under which runtime?</summary>

This illustrates the workspace conflict response, not an executable server. The durable version predicate decides the conflict; the response defines client recovery.

</details>

<details>
<summary>Coding: What would you implement and verify next?</summary>

Add an executable API contract packet for the workspace with examples, errors, and regression evidence. Extend it only when the corresponding behavior exists.

</details>

<details>
<summary>Architecture and production: Which internal boundary needs evidence?</summary>

Proxies, caches, browsers, clients, and servers all interpret protocol information. An OpenAPI document is a description and can drift from code; contract tests should check important examples. GraphQL query flexibility requires limits on depth, amount of work, and authorization inside resolvers.

</details>

[Difficulty-based interview bank](../../interview-handbook/questions/index.md) · [Scenario practice](../../interview-handbook/scenarios/README.md) · [Debugging library](../debugging/README.md)

## 🔗 Related Concepts

[Express services, validation, and protected REST routes](express.md), [Authentication, authorization, and web security boundaries](security.md), [Behavioral testing across units, databases, and browsers](testing.md)

Next: [Express services, validation, and protected REST routes](express.md)

Preserved lessons: [notes/rest-api.md](../../notes/rest-api.md), [07-express-rest/rest-api/notes.md](../../07-express-rest/rest-api/notes.md)

# 📚 External Resources

## 🥇 Official Documentation

[Primary documentation](https://spec.openapis.org/oas/latest.html) — authoritative reference; use the installed runtime/library version.

## 📘 Recommended Articles

[Focused guide](https://graphql.org/learn/) — deepen the mental model and compare its examples with this guide.

## 🎥 Recommended YouTube Videos

See the [verified media register](../resources/VIDEOS.md). A topic without a verified topical video uses written official documentation; unverified recommendations are not padded into this section.

## 🧪 Practice Resources

[Local project ladder](../projects/README.md) · [Timed exercises](../../interview-handbook/machine-coding/README.md)

## 📚 Further Reading

[Curated external register](../resources/README.md) — authority, level, best use, last check, and retrieval limitations.

## 🔄 Last Verified

2026-10-08 — documentation reviewed; example runtime and execution scope are stated above.
