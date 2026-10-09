# REST APIs quick reference

Priority: P0/P1 for core use; specialized operations remain in the linked guide.

[Explanation and prerequisites](../topics/api.md) · [All quick references](README.md)

## Common contract

```text
GET /items?limit=20&cursor=...
POST /items
PATCH /items/:id
DELETE /items/:id
```

## Remember

Define ownership, supported fields, stable pagination, safe errors, and retry/idempotency behavior.

## Verify before applying

Check the installed runtime, required surrounding values, permitted input, expected outcome, and failure behavior. Practice one changed input rather than copying a fragment without its contract.

Last verified: 2026-10-08; see the guide for publisher sources and execution limits.
