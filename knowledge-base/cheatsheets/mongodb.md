# MongoDB quick reference

Priority: P0/P1 for core use; specialized operations remain in the linked guide.

[Explanation and prerequisites](../topics/mongodb.md) · [All quick references](README.md)

## Common contract

```text
db.tasks.find({owner:'a'}, {title:1}).limit(20);
db.tasks.updateOne({_id:'demo',owner:'a',version:0},
  {$set:{status:'done'},$inc:{version:1}});
```

## Remember

Use a disposable database. A unique index and an atomic predicate establish different invariants.

## Verify before applying

Check the installed runtime, required surrounding values, permitted input, expected outcome, and failure behavior. Practice one changed input rather than copying a fragment without its contract.

Last verified: 2026-10-08; see the guide for publisher sources and execution limits.
