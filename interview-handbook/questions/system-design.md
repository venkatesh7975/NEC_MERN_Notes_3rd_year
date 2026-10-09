# System Design interview questions

[Handbook](../README.md) | [All question ids](index.md)

Difficulty is an editorial learning classification. Questions are original practice, not a company question leak. Cover the answer before attempting recall.

## Q071 Easy - How should a design interview start?

<details>
<summary>Answer and follow-up</summary>

Clarify users, core operations, scale assumptions, correctness needs, and constraints. State which numbers are hypothetical. Sketch the simplest design that meets those requirements, then discuss where it fails. Listing technologies before the problem is clear makes tradeoffs difficult to defend.

**Follow-up:** Which requirement would change your design most?

</details>

## Q072 Easy - Compare latency and throughput.

<details>
<summary>Answer and follow-up</summary>

Latency is time per operation; throughput is operations completed per unit time. Increasing concurrency can improve throughput until a bottleneck is saturated, while making latency worse. Report distributions such as p95 and p99, not just averages, and include failures.

**Follow-up:** What does queueing do near saturation?

</details>

## Q073 Easy - What can a cache get wrong?

<details>
<summary>Answer and follow-up</summary>

A cache can serve stale data, expose data across users if keyed incorrectly, or overload the origin when many entries expire. Define freshness, key scope, capacity, and invalidation. For private responses, authorization and tenant identity remain part of the contract.

**Follow-up:** What is a cache stampede?

</details>

## Q074 Medium - How would you design notifications?

<details>
<summary>Answer and follow-up</summary>

Persist notification intent or use an outbox with the business write, then let workers deliver asynchronously. Track attempts and unique operation ids, use bounded retries, and separate delivery from user read status. At-least-once delivery requires idempotent consumers.

**Follow-up:** How do you prevent duplicate emails?

</details>

## Q075 Medium - When would you use a queue?

<details>
<summary>Answer and follow-up</summary>

Use a queue for work that can happen after the request, such as report generation. Define acknowledgment, retry, ordering, capacity, and dead-letter handling. A queue moves and buffers work; it does not remove the need to handle overload or failures.

**Follow-up:** How would the user see job progress?

</details>

## Q076 Medium - How do you scope a multitenant API?

<details>
<summary>Answer and follow-up</summary>

Establish the tenant from trusted authentication or verified membership. Include tenant scope in every relevant query, index, cache key, and background job. Reject client attempts to assign ownership. Test with multiple tenants and cover administrative paths.

**Follow-up:** How would you model shared resources?

</details>

## Q077 Medium - How do you design a search endpoint?

<details>
<summary>Answer and follow-up</summary>

Start with exact requirements: prefix, substring, ranking, and dataset size. Bound query length and result count, choose an index-supported strategy, and measure. Escaped regex may protect correctness but still scan many records. A dedicated search engine adds operations and consistency tradeoffs.

**Follow-up:** When is a Mongo text index enough?

</details>

## Q078 Hard - Explain an outbox pattern.

<details>
<summary>Answer and follow-up</summary>

In one database transaction, persist both the business change and an event record. A publisher delivers unpublished records and marks progress. Delivery can repeat if a crash occurs between publishing and marking, so downstream consumers still deduplicate. Monitor backlog and failed records.

**Follow-up:** How do you preserve per-entity ordering?

</details>

## Q079 Hard - How do you design a rate limiter?

<details>
<summary>Answer and follow-up</summary>

Choose a policy such as token bucket based on burst and sustained-rate requirements. Update shared state atomically, define keys and quotas, and make an explicit store-outage policy. Measure fairness and provide retry guidance. A fixed window can permit bursts around its boundary.

**Follow-up:** How would you support per-plan limits?

</details>

## Q080 Hard - How do you approach a region outage?

<details>
<summary>Answer and follow-up</summary>

Clarify recovery time and acceptable data loss. Discuss replication lag, routing, backups, failover authority, and writes during partition. Exercise recovery procedures rather than assuming backups are restorable. Consistency and availability choices depend on the operation and business invariant.

**Follow-up:** How would you avoid two active writers?

</details>
