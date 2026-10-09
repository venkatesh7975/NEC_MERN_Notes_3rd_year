<!-- kb-metadata: {"conceptIds": ["redis--fundamentals", "redis--caching", "redis--sessions", "redis--pub-sub", "redis--rate-limiting", "redis--queues", "redis--distributed-locks"], "difficulty": "Intermediate", "estimatedMinutes": 120, "id": "redis", "importance": 3, "lastVerified": "2026-10-08", "legacyPaths": [], "path": "knowledge-base/topics/redis.md", "prerequisites": ["nodejs", "system-design"], "priority": "P2", "related": ["security", "realtime"], "status": "authored-guide", "title": "Redis caching, messaging, and distributed coordination"} -->
# Redis caching, messaging, and distributed coordination

Priority: P2 — 📚 Useful

Difficulty: Intermediate

Importance: 3/5

Prerequisites: [Node.js runtime, resources, and asynchronous services](nodejs.md), [System design, consistency, and failure tradeoffs](system-design.md)

Estimated learning time: 120 minutes for explanation and initial practice; independent mastery takes repeated application.

[Knowledge base](../README.md) · [Coverage](../COVERAGE.md) · [Learning paths](../paths/README.md)

## 🎯 Learning Objectives

Explain the mental model, trace the worked example, reproduce a failure, and demonstrate the acceptance checks in the mini-project. Individual concepts below have their own priorities and depth labels.

## 🧠 What Is It?

Redis provides data structures with operational persistence and replication choices; memory is not automatically durable authority.

## Concept reference and priorities

<a id="fundamentals"></a>
### Fundamentals

**P2 · 📚 Useful · reference**

Redis provides data structures with operational persistence and replication choices; memory is not automatically durable authority.

<a id="caching"></a>
### Caching

**P1 · ⭐ Highly Important · worked-example**

A cache reuses derived values with explicit scope, freshness, expiration, and invalidation.

<a id="sessions"></a>
### Sessions

**P2 · 📚 Useful · reference**

Shared session storage can coordinate identity across instances when expiration, revocation, and availability rules are defined.

<a id="pub-sub"></a>
### Pub/Sub

**P2 · 📚 Useful · reference**

Pub/Sub delivers to current subscribers and is not a durable replayable queue for disconnected consumers.

<a id="rate-limiting"></a>
### Rate limiting

**P2 · 📚 Useful · reference**

Atomic shared counters or scripts can implement a chosen limit policy; define windows, keys, and failure mode.

<a id="queues"></a>
### Queues

**P2 · 📚 Useful · reference**

Durable job systems need acknowledgement, retry, idempotency, and recovery, beyond merely pushing a list value.

<a id="distributed-locks"></a>
### Distributed locks

**P3 · 🧩 Advanced / Specialized · reference**

Locks have expiry and ownership constraints; stale holders may need fencing enforced by the protected resource.

## ❓ Why Does It Exist?

Caching can remove repeated expensive work, but a misplaced key can expose data or return stale decisions. Shared coordination must handle failures and multiple processes.

## ⚙️ How Does It Work?

For cache-aside, read cache, fetch the authoritative value on a miss, and store a bounded-lifetime representation. Include account scope and all relevant inputs. Define invalidation after writes and behavior when Redis is unavailable. Use a token for lock ownership, compare it atomically before release, and consider stale-holder writes after expiry. Do not claim a lock makes an external payment exactly once.

## 💻 Examples

### 1. Trace the contract

```text
# Redis CLI, disposable local instance
SET "public:catalog:v1" '{"items":[]}' EX 60
GET "public:catalog:v1"
TTL "public:catalog:v1"
```

Expected behavior and runtime: GET returns the stored JSON text until expiration or deletion. TTL is remaining seconds; expiration is not a domain authorization check. This example deliberately caches public data.

### 2. Extend and stress the contract

Intermediate: separate public and account-specific key design. Advanced: reproduce a stale-cache race after a write. Record the expected result before implementation; use the failure analysis below to distinguish the broken boundary.

## 🔍 Under the Hood

Expiration, eviction, persistence, and replication affect what survives load or failure. Pub/Sub lacks replay for missed messages. Distributed-lock correctness depends on assumptions, timing, and how the protected system handles stale operations.

## 🌍 Real-World Usage

Cache a public aggregate with a measured latency goal and a defined stale-data budget. Keep account authorization and critical writes against the authoritative store.

## ⚠️ Common Mistakes

- Using one cache key for every logged-in account.
- Relying on Pub/Sub to replay missed business events.
- Deleting a lock that another holder acquired after expiry.

## ✅ Best Practices

Cache a public aggregate with a measured latency goal and a defined stale-data budget. Keep account authorization and critical writes against the authoritative store. State the invariant, validate at the boundary, use the documented runtime, and keep a reproducible failure case. This guide is educational evidence; it does not certify a deployment.

## 🧪 Practice

- Beginner: observe a short TTL expire.
- Intermediate: separate public and account-specific key design.
- Advanced: reproduce a stale-cache race after a write.
- Challenge: document cache-unavailable behavior and a stale lock holder scenario.

## 🏗️ Mini Project

Build an optional Redis cache adapter for a public read model. Acceptance: bounded keys and TTL, invalidation, account separation, failure behavior, and measured benefit.

[Project ladder and implementation status](../projects/README.md)

## 💼 Interview Questions

<details>
<summary>Beginner: Is Redis always just a cache?</summary>

No. It supports several data structures and operational modes, whose guarantees must be selected deliberately.

</details>

<details>
<summary>Intermediate: What belongs in a cache key?</summary>

Every input and scope that changes the represented value.

</details>

<details>
<summary>Advanced: Why might fencing be required?</summary>

A holder can keep working after its lease expires; the resource must reject stale authority.

</details>

<details>
<summary>Scenario: A subscriber misses a message while disconnected.</summary>

Use durable replay or a queue/stream when missed work must be recovered.

</details>

<details>
<summary>Debugging: A fresh write returns stale data.</summary>

Trace invalidation ordering, read races, key inputs, and the chosen freshness contract.

</details>

<details>
<summary>Output-based: What does the worked example produce, and under which runtime?</summary>

GET returns the stored JSON text until expiration or deletion. TTL is remaining seconds; expiration is not a domain authorization check. This example deliberately caches public data.

</details>

<details>
<summary>Coding: What would you implement and verify next?</summary>

Build an optional Redis cache adapter for a public read model. Acceptance: bounded keys and TTL, invalidation, account separation, failure behavior, and measured benefit.

</details>

<details>
<summary>Architecture and production: Which internal boundary needs evidence?</summary>

Expiration, eviction, persistence, and replication affect what survives load or failure. Pub/Sub lacks replay for missed messages. Distributed-lock correctness depends on assumptions, timing, and how the protected system handles stale operations.

</details>

[Difficulty-based interview bank](../../interview-handbook/questions/index.md) · [Scenario practice](../../interview-handbook/scenarios/README.md) · [Debugging library](../debugging/README.md)

## 🔗 Related Concepts

[Authentication, authorization, and web security boundaries](security.md), [WebSockets, SSE, and recoverable real-time delivery](realtime.md)

Next: [Authentication, authorization, and web security boundaries](security.md)

# 📚 External Resources

## 🥇 Official Documentation

[Primary documentation](https://redis.io/docs/latest/) — authoritative reference; use the installed runtime/library version.

## 📘 Recommended Articles

[Focused guide](https://redis.io/docs/latest/develop/use/patterns/distributed-locks/) — deepen the mental model and compare its examples with this guide.

## 🎥 Recommended YouTube Videos

See the [verified media register](../resources/VIDEOS.md). A topic without a verified topical video uses written official documentation; unverified recommendations are not padded into this section.

## 🧪 Practice Resources

[Local project ladder](../projects/README.md) · [Timed exercises](../../interview-handbook/machine-coding/README.md)

## 📚 Further Reading

[Curated external register](../resources/README.md) — authority, level, best use, last check, and retrieval limitations.

## 🔄 Last Verified

2026-10-08 — documentation reviewed; example runtime and execution scope are stated above.
