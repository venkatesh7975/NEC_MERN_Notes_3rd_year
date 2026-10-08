<!-- kb-metadata: {"conceptIds": ["express--server-creation", "express--routing", "express--middleware", "express--request-response", "express--controllers", "express--services", "express--rest-apis", "express--validation", "express--error-handling", "express--authentication", "express--authorization", "express--cookies", "express--sessions", "express--file-uploads", "express--pagination", "express--filtering", "express--sorting", "express--searching", "express--rate-limiting", "express--logging", "express--security", "express--api-architecture", "express--production-structure"], "difficulty": "Beginner", "estimatedMinutes": 180, "id": "express", "importance": 5, "lastVerified": "2026-10-08", "legacyPaths": ["notes/express.md", "07-express-rest/express/notes.md"], "path": "knowledge-base/topics/express.md", "prerequisites": ["nodejs", "api"], "priority": "P0", "related": ["mongodb", "security", "testing"], "status": "authored-guide", "title": "Express services, validation, and protected REST routes"} -->
# Express services, validation, and protected REST routes

Priority: P0 — 🔥 Essential / Master

Difficulty: Beginner

Importance: 5/5

Prerequisites: [Node.js runtime, resources, and asynchronous services](nodejs.md), [REST contracts, GraphQL, and API evolution](api.md)

Estimated learning time: 180 minutes for explanation and initial practice; independent mastery takes repeated application.

[Knowledge base](../README.md) · [Coverage](../COVERAGE.md) · [Learning paths](../paths/README.md)

## 🎯 Learning Objectives

Explain the mental model, trace the worked example, reproduce a failure, and demonstrate the acceptance checks in the mini-project. Individual concepts below have their own priorities and depth labels.

## 🧠 What Is It?

Create an application, mount middleware and routes, then listen through an HTTP server with a controlled lifecycle.

## Concept reference and priorities

<a id="server-creation"></a>
### Server creation

**P0 · 🔥 Essential / Master · reference**

Create an application, mount middleware and routes, then listen through an HTTP server with a controlled lifecycle.

<a id="routing"></a>
### Routing

**P0 · 🔥 Essential / Master · worked-example**

Routing selects handlers by method and path; unknown API paths must not silently become frontend HTML.

<a id="middleware"></a>
### Middleware

**P0 · 🔥 Essential / Master · reference**

Middleware can inspect, transform, terminate, or delegate a request; order defines behavior.

<a id="request-response"></a>
### Request/response

**P0 · 🔥 Essential / Master · reference**

Requests contain untrusted inputs; responses implement the API status, headers, and representation contract.

<a id="controllers"></a>
### Controllers

**P1 · ⭐ Highly Important · reference**

Controllers adapt HTTP details to validated service inputs and domain outcomes.

<a id="services"></a>
### Services

**P1 · ⭐ Highly Important · reference**

Services own domain rules that should not depend unnecessarily on the HTTP transport.

<a id="rest-apis"></a>
### REST APIs

**P0 · 🔥 Essential / Master · reference**

REST uses resources and representations with coherent HTTP semantics and operational contracts.

<a id="validation"></a>
### Validation

**P0 · 🔥 Essential / Master · worked-example**

Validate types, lengths, allowed fields, ranges, and relationships before trusted use.

<a id="error-handling"></a>
### Error handling

**P0 · 🔥 Essential / Master · reference**

Centralize safe client errors while retaining server diagnostic evidence; Express 5 forwards rejected returned Promises.

<a id="authentication"></a>
### Authentication

**P0 · 🔥 Essential / Master · reference**

Resolve identity from trusted credentials rather than client-supplied role or owner fields.

<a id="authorization"></a>
### Authorization

**P0 · 🔥 Essential / Master · worked-example**

Every read and write must enforce the authenticated caller's permission for the resource.

<a id="cookies"></a>
### Cookies

**P1 · ⭐ Highly Important · reference**

Cookies are browser-managed values with scope and security attributes; they can accompany cross-site requests under applicable rules.

<a id="sessions"></a>
### Sessions

**P0 · 🔥 Essential / Master · reference**

Sessions connect credentials to server-side authority with expiration and revocation.

<a id="file-uploads"></a>
### File uploads

**P2 · 📚 Useful · reference**

Limit size and count, validate content, isolate storage, and avoid trusting original filenames or declared MIME type.

<a id="pagination"></a>
### Pagination

**P1 · ⭐ Highly Important · reference**

Bound lists and define stable ordering and a cursor or offset contract.

<a id="filtering"></a>
### Filtering

**P1 · ⭐ Highly Important · reference**

Allowlist supported predicates and normalize values rather than accepting arbitrary query operators.

<a id="sorting"></a>
### Sorting

**P1 · ⭐ Highly Important · reference**

Allowlist fields and directions with a stable tie-breaker when needed.

<a id="searching"></a>
### Searching

**P1 · ⭐ Highly Important · reference**

Specify matching behavior and bound query cost; avoid uncontrolled patterns or arbitrary regular expressions.

<a id="rate-limiting"></a>
### Rate limiting

**P1 · ⭐ Highly Important · reference**

Choose keys and scope; a process-local limiter is not a consistent global limit across instances.

<a id="logging"></a>
### Logging

**P1 · ⭐ Highly Important · reference**

Record useful request context and safe errors while redacting secrets and sensitive payloads.

<a id="security"></a>
### Security

**P0 · 🔥 Essential / Master · reference**

Layer input constraints, identity, authorization, origin defenses, safe headers, and operational limits.

<a id="api-architecture"></a>
### API architecture

**P1 · ⭐ Highly Important · reference**

Separate transport, domain behavior, and persistence so tests can target the relevant contract.

<a id="production-structure"></a>
### Production structure

**P1 · ⭐ Highly Important · reference**

Include startup validation, repeatable builds, safe error behavior, monitoring, graceful shutdown, and deployment requirements.

## ❓ Why Does It Exist?

A route that works for one happy path can expose another owner's data or fail under concurrent writes. Explicit boundaries make these failures testable.

## ⚙️ How Does It Work?

Build fields from validated scalar inputs. Authenticate before privileged work, derive owner from the trusted identity, and include it in every persistence predicate. Middleware that responds should not continue into another responder. A catch-all frontend route must exclude API paths. Express 5 handles rejected returned Promises; callback failures still require appropriate error forwarding.

## 💻 Examples

### 1. Trace the contract

```javascript
app.patch('/api/tasks/:id', requireSession, async (req, res) => {
  const fields = validateTaskPatch(req.body);
  const task = await store.updateTask(req.user.id, req.params.id, fields);
  res.json(task);
});
// store uses owner and expectedVersion in one atomic update predicate.
```

Expected behavior and runtime: This integration fragment uses the workspace-style service contract; it requires app, requireSession, validator, and store implementations. The server-derived owner cannot be replaced by a body field.

### 2. Extend and stress the contract

Intermediate: reproduce a malformed JSON and an unsupported field. Advanced: run simultaneous same-version updates against MongoDB. Record the expected result before implementation; use the failure analysis below to distinguish the broken boundary.

## 🔍 Under the Hood

A middleware chain is a control-flow pipeline over one request. Parsing limits apply before domain validation. Correct client recovery may depend on distinguishing invalid input, missing or unowned resource, expired session, and conflict.

## 🌍 Real-World Usage

Run the actual workspace ownership, malformed-body, uniqueness, session, and conflict tests. Trace which layer rejects each case.

## ⚠️ Common Mistakes

- Spreading request.body into an update.
- Sending raw database or stack-trace errors to the browser.
- Checking ownership only in the interface.

## ✅ Best Practices

Run the actual workspace ownership, malformed-body, uniqueness, session, and conflict tests. Trace which layer rejects each case. State the invariant, validate at the boundary, use the documented runtime, and keep a reproducible failure case. This guide is educational evidence; it does not certify a deployment.

## 🧪 Practice

- Beginner: identify middleware order for one write.
- Intermediate: reproduce a malformed JSON and an unsupported field.
- Advanced: run simultaneous same-version updates against MongoDB.
- Challenge: add a filtered cursor list without permitting arbitrary client query objects.

## 🏗️ Mini Project

Add a documented bookmark search endpoint with owner scope, bounded results, safe errors, and a contract test for another user's ids.

[Project ladder and implementation status](../projects/README.md)

## 💼 Interview Questions

<details>
<summary>Beginner: What does middleware do?</summary>

It participates in request control flow and can terminate or delegate processing.

</details>

<details>
<summary>Intermediate: Why is server validation necessary?</summary>

Clients can send arbitrary HTTP inputs regardless of form validation.

</details>

<details>
<summary>Advanced: Does Express 5 catch every callback error?</summary>

No. Its Promise forwarding applies to returned rejected Promises; callback APIs still need proper handling.

</details>

<details>
<summary>Scenario: Two clients edit the same task.</summary>

Apply the expected version in one persisted predicate and surface a conflict for recovery.

</details>

<details>
<summary>Debugging: API returns the app shell.</summary>

Inspect fallback route order and exclude API paths from the frontend fallback.

</details>

<details>
<summary>Output-based: What does the worked example produce, and under which runtime?</summary>

This integration fragment uses the workspace-style service contract; it requires app, requireSession, validator, and store implementations. The server-derived owner cannot be replaced by a body field.

</details>

<details>
<summary>Coding: What would you implement and verify next?</summary>

Add a documented bookmark search endpoint with owner scope, bounded results, safe errors, and a contract test for another user's ids.

</details>

<details>
<summary>Architecture and production: Which internal boundary needs evidence?</summary>

A middleware chain is a control-flow pipeline over one request. Parsing limits apply before domain validation. Correct client recovery may depend on distinguishing invalid input, missing or unowned resource, expired session, and conflict.

</details>

[Difficulty-based interview bank](../../interview-handbook/questions/index.md) · [Scenario practice](../../interview-handbook/scenarios/README.md) · [Debugging library](../debugging/README.md)

## 🔗 Related Concepts

[MongoDB modeling, querying, and persisted invariants](mongodb.md), [Authentication, authorization, and web security boundaries](security.md), [Behavioral testing across units, databases, and browsers](testing.md)

Next: [MongoDB modeling, querying, and persisted invariants](mongodb.md)

Preserved lessons: [notes/express.md](../../notes/express.md), [07-express-rest/express/notes.md](../../07-express-rest/express/notes.md)

# 📚 External Resources

## 🥇 Official Documentation

[Primary documentation](https://expressjs.com/en/guide/migrating-5.html) — authoritative reference; use the installed runtime/library version.

## 📘 Recommended Articles

[Focused guide](https://expressjs.com/en/advanced/best-practice-security.html) — deepen the mental model and compare its examples with this guide.

## 🎥 Recommended YouTube Videos

See the [verified media register](../resources/VIDEOS.md). A topic without a verified topical video uses written official documentation; unverified recommendations are not padded into this section.

## 🧪 Practice Resources

[Local project ladder](../projects/README.md) · [Timed exercises](../../interview-handbook/machine-coding/README.md)

## 📚 Further Reading

[Curated external register](../resources/README.md) — authority, level, best use, last check, and retrieval limitations.

## 🔄 Last Verified

2026-10-08 — documentation reviewed; example runtime and execution scope are stated above.
