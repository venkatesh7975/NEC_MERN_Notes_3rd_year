# System design for product engineers

[Handbook](../README.md) | [Practice questions](../questions/system-design.md)

Read this guide, run the example, and demonstrate the exercise before moving on. These notes supplement the original classroom modules.

## Clarify the contract

State the core use cases, scale estimates, latency target, consistency requirement, and operational constraints. Label estimates as assumptions. Choose a simple initial design and identify the first bottleneck.

For a URL shortener, ask about custom aliases, expiration, abuse, and analytics. For a feed, ask about ordering, private content, pagination, and freshness.

## Design for partial failure

Use timeouts, bounded retries, and idempotency for operations that can repeat. Queues usually provide at-least-once processing under common configurations, so consumers must tolerate duplicates.

An outbox connects a database write to eventual event publication, but consumers still deduplicate. Monitor backlog and provide a failure-handling path.

## Explain evolution

Caches need correct key scope and freshness rules. Replication changes failure and consistency behavior. Sharding and extra services add operational work.

Discuss a measurable trigger for each additional component. If no requirement needs a distributed design, a well-structured service and database may be the better starting point.

## Worked example

```js
// An idempotent write needs durable state, not only a process-local Set.
// unique index: {owner: 1, operationId: 1}
// Persist operation result with the business change under the chosen atomic boundary.
```

## Demonstrate understanding

Draw a notification design, trace a crash between save and publish, and explain how the request eventually reaches a user without duplicate business effects.

## Reference

[Primary learning reference](https://www.mongodb.com/docs/manual/core/transactions/). Prefer the documentation matching the version you install.
