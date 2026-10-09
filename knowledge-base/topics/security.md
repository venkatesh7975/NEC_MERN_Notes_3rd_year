<!-- kb-metadata: {"conceptIds": ["security--password-hashing", "security--bcrypt", "security--jwt", "security--access-tokens", "security--refresh-tokens", "security--cookies", "security--sessions", "security--oauth", "security--rbac", "security--cors", "security--csrf", "security--xss", "security--sql-injection", "security--nosql-injection", "security--rate-limiting", "security--helmet", "security--secure-headers", "security--secrets", "security--owasp", "security--security-best-practices"], "difficulty": "Beginner", "estimatedMinutes": 180, "id": "security", "importance": 5, "lastVerified": "2026-10-08", "legacyPaths": ["notes/authentication.md", "10-security/notes.md"], "path": "knowledge-base/topics/security.md", "prerequisites": ["api", "nodejs"], "priority": "P0", "related": ["express", "devops", "realtime"], "status": "authored-guide", "title": "Authentication, authorization, and web security boundaries"} -->
# Authentication, authorization, and web security boundaries

Priority: P0 — 🔥 Essential / Master

Difficulty: Beginner

Importance: 5/5

Prerequisites: [REST contracts, GraphQL, and API evolution](api.md), [Node.js runtime, resources, and asynchronous services](nodejs.md)

Estimated learning time: 180 minutes for explanation and initial practice; independent mastery takes repeated application.

[Knowledge base](../README.md) · [Coverage](../COVERAGE.md) · [Learning paths](../paths/README.md)

## 🎯 Learning Objectives

Explain the mental model, trace the worked example, reproduce a failure, and demonstrate the acceptance checks in the mini-project. Individual concepts below have their own priorities and depth labels.

## 🧠 What Is It?

Store a password-specific salted verifier with suitable cost, not reversible plaintext encryption.

## Concept reference and priorities

<a id="password-hashing"></a>
### Password hashing

**P0 · 🔥 Essential / Master · reference**

Store a password-specific salted verifier with suitable cost, not reversible plaintext encryption.

<a id="bcrypt"></a>
### bcrypt

**P1 · ⭐ Highly Important · reference**

bcrypt is a password-hashing option with cost and input-length considerations; follow current guidance for new systems.

<a id="jwt"></a>
### JWT

**P1 · ⭐ Highly Important · reference**

A signed JWT provides integrity for claims, not confidentiality; validate issuer, audience, algorithm, and expiry.

<a id="access-tokens"></a>
### Access tokens

**P1 · ⭐ Highly Important · reference**

Access credentials authorize a bounded scope and lifetime; keep exposure and revocation needs explicit.

<a id="refresh-tokens"></a>
### Refresh tokens

**P2 · 📚 Useful · reference**

Refresh credentials renew access and need protected storage, rotation, reuse detection, and revocation policy.

<a id="cookies"></a>
### Cookies

**P0 · 🔥 Essential / Master · reference**

Cookie attributes control scope and handling; HttpOnly blocks ordinary script reads but does not stop all authenticated abuse.

<a id="sessions"></a>
### Sessions

**P0 · 🔥 Essential / Master · reference**

Server-side sessions support expiry and revocation; store only necessary authority and enforce expiry during lookup.

<a id="oauth"></a>
### OAuth

**P2 · 📚 Useful · reference**

OAuth delegates access under a protocol; identity login usually also needs an appropriate identity layer such as OpenID Connect.

<a id="rbac"></a>
### RBAC

**P1 · ⭐ Highly Important · reference**

Role-based permissions group allowed actions; object ownership and tenant scope still need enforcement.

<a id="cors"></a>
### CORS

**P0 · 🔥 Essential / Master · reference**

CORS controls browser cross-origin response access; it is not API authentication and does not stop non-browser callers.

<a id="csrf"></a>
### CSRF

**P0 · 🔥 Essential / Master · reference**

Cookie-authenticated writes need cross-site request defenses such as suitable tokens, origin checks, and SameSite policy.

<a id="xss"></a>
### XSS

**P0 · 🔥 Essential / Master · reference**

Untrusted content executed in the page can act with the page's privileges; render data safely and constrain script execution.

<a id="sql-injection"></a>
### SQL injection

**P0 · 🔥 Essential / Master · reference**

Parameterized queries separate values from SQL structure; dynamic identifiers require allowlists.

<a id="nosql-injection"></a>
### NoSQL injection

**P0 · 🔥 Essential / Master · reference**

Construct permitted query predicates from validated scalars instead of accepting arbitrary operator objects.

<a id="rate-limiting"></a>
### Rate limiting

**P1 · ⭐ Highly Important · reference**

Limit abuse according to a defined identity and deployment scope; consider cost and recovery as well as request count.

<a id="helmet"></a>
### Helmet

**P1 · ⭐ Highly Important · reference**

Helmet sets security-related HTTP headers, but does not replace input validation or authorization.

<a id="secure-headers"></a>
### Secure headers

**P1 · ⭐ Highly Important · reference**

Headers can constrain browser capabilities and content interpretation; configure them for the actual deployment.

<a id="secrets"></a>
### Secrets

**P0 · 🔥 Essential / Master · worked-example**

Keep secrets out of source, logs, browser bundles, and artifacts; rotate compromised credentials.

<a id="owasp"></a>
### OWASP

**P1 · ⭐ Highly Important · reference**

OWASP offers threat-focused guidance; use it to evaluate concrete application boundaries.

<a id="security-best-practices"></a>
### Security best practices

**P0 · 🔥 Essential / Master · reference**

Define assets, threats, trusted identities, permitted operations, and recovery; verify them with adversarial cases.

## ❓ Why Does It Exist?

A valid session does not authorize access to every object. Security emerges from explicit boundaries and server-enforced invariants rather than from one token format.

## ⚙️ How Does It Work?

Trace identity through every read and write. Never trust an owner or role supplied by the browser. Use a random session token, keep a digest server-side, expire it during lookup, and revoke it on logout. For cookie-authenticated writes, define CSRF and origin defenses for the deployment; HttpOnly and CORS alone are insufficient. Use HTTPS and appropriate cookie scope in deployment.

## 💻 Examples

### 1. Trace the contract

```javascript
const predicate = {_id: itemId, owner: authenticatedUserId};
// Both identity and object scope belong in the persistence predicate.
const response = {id: item.id, title: item.title};
// Deliberately omit passwordHash, session tokens, and internal authorization data.
```

Expected behavior and runtime: This boundary illustration returns only public fields from an authorized item. It requires validated identifiers and a trusted authenticatedUserId; substituting a body owner would invalidate the design.

### 2. Extend and stress the contract

Intermediate: attempt every endpoint as another owner. Advanced: verify session expiry independently of TTL cleanup. Record the expected result before implementation; use the failure analysis below to distinguish the broken boundary.

## 🔍 Under the Hood

Signed token payloads are usually readable encodings. Cookies can be automatically attached to requests, which motivates CSRF defenses. A compromised page can initiate requests even when it cannot read an HttpOnly cookie. Defense layers reduce different classes of risk and should not be described as interchangeable.

## 🌍 Real-World Usage

Run the workspace two-user tests and revocation test. Document its single-origin deployment assumption and missing production capabilities rather than calling it a finished identity service.

## ⚠️ Common Mistakes

- Putting passwords or confidential data inside a signed JWT.
- Checking ownership only after returning data.
- Disabling TLS or broadening origin checks to make a deployment appear to work.

## ✅ Best Practices

Run the workspace two-user tests and revocation test. Document its single-origin deployment assumption and missing production capabilities rather than calling it a finished identity service. State the invariant, validate at the boundary, use the documented runtime, and keep a reproducible failure case. This guide is educational evidence; it does not certify a deployment.

## 🧪 Practice

- Beginner: distinguish authentication, authorization, and validation.
- Intermediate: attempt every endpoint as another owner.
- Advanced: verify session expiry independently of TTL cleanup.
- Challenge: design refresh-token reuse detection and a recovery path without inventing a custom cryptographic protocol.

## 🏗️ Mini Project

Create a threat model for the task board covering XSS, CSRF, object access, brute-force cost, secret leakage, and operational recovery. Link each implemented control to a test or deployment requirement.

[Project ladder and implementation status](../projects/README.md)

## 💼 Interview Questions

<details>
<summary>Beginner: Is a signed JWT encrypted?</summary>

No. Signing protects integrity; encryption is a separate capability.

</details>

<details>
<summary>Intermediate: Does CORS protect an API from curl?</summary>

No. It governs selected browser behavior, not authorization for arbitrary clients.

</details>

<details>
<summary>Advanced: Why check expiry when a TTL index exists?</summary>

TTL cleanup is asynchronous; a remaining document can already be expired.

</details>

<details>
<summary>Scenario: User A sends user B's id.</summary>

Scope the persisted operation to the trusted owner and test unchanged data for B.

</details>

<details>
<summary>Debugging: Secure cookies disappear locally.</summary>

Inspect HTTPS, cookie scope, SameSite, and deployment topology; keep production protections intact.

</details>

<details>
<summary>Output-based: What does the worked example produce, and under which runtime?</summary>

This boundary illustration returns only public fields from an authorized item. It requires validated identifiers and a trusted authenticatedUserId; substituting a body owner would invalidate the design.

</details>

<details>
<summary>Coding: What would you implement and verify next?</summary>

Create a threat model for the task board covering XSS, CSRF, object access, brute-force cost, secret leakage, and operational recovery. Link each implemented control to a test or deployment requirement.

</details>

<details>
<summary>Architecture and production: Which internal boundary needs evidence?</summary>

Signed token payloads are usually readable encodings. Cookies can be automatically attached to requests, which motivates CSRF defenses. A compromised page can initiate requests even when it cannot read an HttpOnly cookie. Defense layers reduce different classes of risk and should not be described as interchangeable.

</details>

[Difficulty-based interview bank](../../interview-handbook/questions/index.md) · [Scenario practice](../../interview-handbook/scenarios/README.md) · [Debugging library](../debugging/README.md)

## 🔗 Related Concepts

[Express services, validation, and protected REST routes](express.md), [Containers, CI/CD, and operating a web service](devops.md), [WebSockets, SSE, and recoverable real-time delivery](realtime.md)

Next: [Express services, validation, and protected REST routes](express.md)

Preserved lessons: [notes/authentication.md](../../notes/authentication.md), [10-security/notes.md](../../10-security/notes.md)

# 📚 External Resources

## 🥇 Official Documentation

[Primary documentation](https://cheatsheetseries.owasp.org/) — authoritative reference; use the installed runtime/library version.

## 📘 Recommended Articles

[Focused guide](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html) — deepen the mental model and compare its examples with this guide.

## 🎥 Recommended YouTube Videos

See the [verified media register](../resources/VIDEOS.md). A topic without a verified topical video uses written official documentation; unverified recommendations are not padded into this section.

## 🧪 Practice Resources

[Local project ladder](../projects/README.md) · [Timed exercises](../../interview-handbook/machine-coding/README.md)

## 📚 Further Reading

[Curated external register](../resources/README.md) — authority, level, best use, last check, and retrieval limitations.

## 🔄 Last Verified

2026-10-08 — documentation reviewed; example runtime and execution scope are stated above.
