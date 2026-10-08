<!-- kb-metadata: {"conceptIds": ["system-design--scalability", "system-design--availability", "system-design--reliability", "system-design--load-balancing", "system-design--caching", "system-design--database-scaling", "system-design--replication", "system-design--sharding", "system-design--queues", "system-design--pub-sub", "system-design--cdn", "system-design--rate-limiting", "system-design--cap-theorem", "system-design--consistency", "system-design--distributed-systems", "system-design--high-level-design", "system-design--low-level-design"], "difficulty": "Intermediate", "estimatedMinutes": 120, "id": "system-design", "importance": 4, "lastVerified": "2026-10-08", "legacyPaths": [], "path": "knowledge-base/topics/system-design.md", "prerequisites": ["api", "mongodb"], "priority": "P1", "related": ["redis", "realtime", "cloud"], "status": "authored-guide", "title": "System design, consistency, and failure tradeoffs"} -->
# System design, consistency, and failure tradeoffs

Priority: P1 — ⭐ Highly Important

Difficulty: Intermediate

Importance: 4/5

Prerequisites: [REST contracts, GraphQL, and API evolution](api.md), [MongoDB modeling, querying, and persisted invariants](mongodb.md)

Estimated learning time: 120 minutes for explanation and initial practice; independent mastery takes repeated application.

[Knowledge base](../README.md) · [Coverage](../COVERAGE.md) · [Learning paths](../paths/README.md)

## 🎯 Learning Objectives

Explain the mental model, trace the worked example, reproduce a failure, and demonstrate the acceptance checks in the mini-project. Individual concepts below have their own priorities and depth labels.

## 🧠 What Is It?

Scalability is the ability to support a changing workload under stated resource and performance constraints.

## Concept reference and priorities

<a id="scalability"></a>
### Scalability

**P1 · ⭐ Highly Important · reference**

Scalability is the ability to support a changing workload under stated resource and performance constraints.

<a id="availability"></a>
### Availability

**P1 · ⭐ Highly Important · reference**

Availability describes whether useful service is accessible under defined failure conditions.

<a id="reliability"></a>
### Reliability

**P1 · ⭐ Highly Important · reference**

Reliability concerns correct operation over time, including detection, recovery, and preserved invariants.

<a id="load-balancing"></a>
### Load balancing

**P2 · 📚 Useful · reference**

Load balancers distribute requests among eligible targets; health and connection behavior affect outcomes.

<a id="caching"></a>
### Caching

**P1 · ⭐ Highly Important · reference**

Caching reuses representations under scope and freshness rules; invalidation and stampede behavior matter.

<a id="database-scaling"></a>
### Database scaling

**P2 · 📚 Useful · reference**

Improve schema, queries, indexes, and workload before choosing replication or partitioning complexity.

<a id="replication"></a>
### Replication

**P2 · 📚 Useful · reference**

Replicas copy data with lag and failure behavior; reads need consistency requirements.

<a id="sharding"></a>
### Sharding

**P3 · 🧩 Advanced / Specialized · reference**

Sharding partitions data and introduces routing, balancing, hotspot, and cross-partition concerns.

<a id="queues"></a>
### Queues

**P1 · ⭐ Highly Important · reference**

Queues decouple work with acknowledgment, retry, backpressure, and idempotency contracts.

<a id="pub-sub"></a>
### Pub/Sub

**P2 · 📚 Useful · reference**

Publish/subscribe routes events to interested consumers; durability depends on the chosen system and configuration.

<a id="cdn"></a>
### CDN

**P2 · 📚 Useful · reference**

CDNs distribute reusable content and require cache-key, invalidation, and privacy policies.

<a id="rate-limiting"></a>
### Rate limiting

**P1 · ⭐ Highly Important · reference**

A limiter constrains work under explicit identity, window, deployment scope, and failure behavior.

<a id="cap-theorem"></a>
### CAP theorem

**P3 · 🧩 Advanced / Specialized · reference**

During a network partition, a distributed system cannot guarantee both linearizable consistency and availability in the theorem's sense.

<a id="consistency"></a>
### Consistency

**P1 · ⭐ Highly Important · worked-example**

Consistency models describe which observations are permitted; choose requirements for each operation.

<a id="distributed-systems"></a>
### Distributed systems

**P3 · 🧩 Advanced / Specialized · reference**

Multiple nodes communicate under delay, failure, and partial knowledge; local success is not a global guarantee.

<a id="high-level-design"></a>
### High-level design

**P1 · ⭐ Highly Important · reference**

High-level design identifies components, data flow, scale assumptions, and failure boundaries.

<a id="low-level-design"></a>
### Low-level design

**P1 · ⭐ Highly Important · worked-example**

Low-level design describes data models, interfaces, states, algorithms, and invariants inside those components.

## ❓ Why Does It Exist?

A diagram with many boxes does not explain what the product guarantees. System design begins with users, workload, latency, consistency, and acceptable failure.

## ⚙️ How Does It Work?

State requirements and assumptions before picking technology. Estimate workload and identify the first bottleneck. Choose an invariant such as stock never becoming negative, then trace competing writes, retries, and partial failure. For business events, writing state and then publishing can lose the event during a crash; an outbox stores the state change and event record together and a publisher retries. Consumers need deduplication because retries can repeat delivery.

## 💻 Examples

### 1. Trace the contract

```text
// Illustrative inventory contract, not a complete reservation workflow
update inventory
where productId = requestedId and available >= requestedQuantity
set available = available - requestedQuantity
// Success depends on one atomic database predicate, not a prior UI check.
```

Expected behavior and runtime: A conditional persisted update can protect a nonnegative stock invariant. A full reservation flow also needs quantity validation, expiry, payment coordination, and idempotency; this pseudocode does not implement them.

### 2. Extend and stress the contract

Intermediate: state consistency requirements for profile reads and purchases. Advanced: trace a crash between state commit and event publish. Record the expected result before implementation; use the failure analysis below to distinguish the broken boundary.

## 🔍 Under the Hood

Network timeout means the caller lacks certainty, not that the server did nothing. Exactly-once transport should not be assumed; a durable idempotent business transition can prevent repeated effects. CAP is not a rule to casually choose any two letters outside the relevant partition scenario.

## 🌍 Real-World Usage

Design a notification center, URL shortener, or inventory service. Tie each added component to a specific requirement and explain the smallest initial deployment.

## ⚠️ Common Mistakes

- Starting with sharding before defining access patterns.
- Claiming an in-memory Set prevents duplicate effects after restart.
- Treating a timeout as proof that a write failed.

## ✅ Best Practices

Design a notification center, URL shortener, or inventory service. Tie each added component to a specific requirement and explain the smallest initial deployment. State the invariant, validate at the boundary, use the documented runtime, and keep a reproducible failure case. This guide is educational evidence; it does not certify a deployment.

## 🧪 Practice

- Beginner: distinguish latency and throughput with units.
- Intermediate: state consistency requirements for profile reads and purchases.
- Advanced: trace a crash between state commit and event publish.
- Challenge: test duplicate delivery and stale workers while preserving a persisted invariant.

## 🏗️ Mini Project

Write a design packet for inventory reservation or notifications: assumptions, data model, failure matrix, recovery, sizing, and one runnable invariant test.

[Project ladder and implementation status](../projects/README.md)

## 💼 Interview Questions

<details>
<summary>Beginner: What is a useful scale estimate?</summary>

A stated assumption with units tied to the operation or storage workload.

</details>

<details>
<summary>Intermediate: Why do queue consumers need idempotency?</summary>

Retries or replay can deliver the same work more than once.

</details>

<details>
<summary>Advanced: What does an outbox solve?</summary>

It closes the state-change/event-record gap when both are stored in the same transaction boundary; publishing still needs retries and duplicate handling.

</details>

<details>
<summary>Scenario: A payment callback repeats after restart.</summary>

Use a persisted provider operation id and an atomic state transition to prevent a second effect.

</details>

<details>
<summary>Debugging: The feed skips items during inserts.</summary>

Inspect ordering and continuation predicates; use a stable tie-breaker and define snapshot expectations.

</details>

<details>
<summary>Output-based: What does the worked example produce, and under which runtime?</summary>

A conditional persisted update can protect a nonnegative stock invariant. A full reservation flow also needs quantity validation, expiry, payment coordination, and idempotency; this pseudocode does not implement them.

</details>

<details>
<summary>Coding: What would you implement and verify next?</summary>

Write a design packet for inventory reservation or notifications: assumptions, data model, failure matrix, recovery, sizing, and one runnable invariant test.

</details>

<details>
<summary>Architecture and production: Which internal boundary needs evidence?</summary>

Network timeout means the caller lacks certainty, not that the server did nothing. Exactly-once transport should not be assumed; a durable idempotent business transition can prevent repeated effects. CAP is not a rule to casually choose any two letters outside the relevant partition scenario.

</details>

[Difficulty-based interview bank](../../interview-handbook/questions/index.md) · [Scenario practice](../../interview-handbook/scenarios/README.md) · [Debugging library](../debugging/README.md)

## 🔗 Related Concepts

[Redis caching, messaging, and distributed coordination](redis.md), [WebSockets, SSE, and recoverable real-time delivery](realtime.md), [Cloud deployment, scaling, and recovery choices](cloud.md)

Next: [Redis caching, messaging, and distributed coordination](redis.md)

# 📚 External Resources

## 🥇 Official Documentation

[Primary documentation](https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html) — authoritative reference; use the installed runtime/library version.

## 📘 Recommended Articles

[Focused guide](https://www.mongodb.com/docs/manual/replication/) — deepen the mental model and compare its examples with this guide.

## 🎥 Recommended YouTube Videos

See the [verified media register](../resources/VIDEOS.md). A topic without a verified topical video uses written official documentation; unverified recommendations are not padded into this section.

## 🧪 Practice Resources

[Local project ladder](../projects/README.md) · [Timed exercises](../../interview-handbook/machine-coding/README.md)

## 📚 Further Reading

[Curated external register](../resources/README.md) — authority, level, best use, last check, and retrieval limitations.

## 🔄 Last Verified

2026-10-08 — documentation reviewed; example runtime and execution scope are stated above.
