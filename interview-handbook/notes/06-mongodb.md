# MongoDB modeling indexes and concurrency

[Handbook](../README.md) | [Practice questions](../questions/mongodb.md)

Read this guide, run the example, and demonstrate the exercise before moving on. These notes supplement the original classroom modules.

## Model access and invariants

List the reads, writes, ownership rules, and growth bounds before choosing embedded or referenced data. A document is an atomic write boundary. Keep collections and arrays bounded where the domain allows it.

Mongoose helps express schemas, but a schema alone does not create the right query indexes or authorization rules. Write migrations for data and index changes.

## Measure query work

Use explain on representative data. Compare examined keys and documents with returned rows and inspect whether sort work is supported by an index. Indexes improve some reads at a storage and write cost.

For a user-owned timeline, equality on owner followed by an ordered timestamp and id can support a useful compound index. Large skip values deserve a cursor design.

## Protect concurrent writes

A read followed by an unconditional update can lose another edit. Include expected version in the update filter and increment version in the same operation. Use conditional stock updates for a single inventory document.

Transactions coordinate multi-document invariants but require an appropriate deployment. External side effects still need idempotency and compensation. The JavaScript event loop cannot enforce consistency across multiple processes.

## Worked example

```js
const result = await tasks.updateOne(
  {_id: id, owner: userId, version: expectedVersion},
  {$set: {status: "done"}, $inc: {version: 1}}
);
if (result.matchedCount === 0) {
  // Resolve an owned missing item versus an owned version conflict safely.
}
```

## Demonstrate understanding

Run two updates with the same version against MongoDB. Exactly one must match, and the persisted version increases once.

## Reference

[Primary learning reference](https://www.mongodb.com/docs/manual/core/write-operations-atomicity/). Prefer the documentation matching the version you install.
