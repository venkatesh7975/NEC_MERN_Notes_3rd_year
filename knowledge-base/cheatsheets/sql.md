# SQL quick reference

Priority: P0/P1 for core use; specialized operations remain in the linked guide.

[Explanation and prerequisites](../topics/sql.md) · [All quick references](README.md)

## Common contract

```text
SELECT owner_id, SUM(amount_cents)
FROM expenses
GROUP BY owner_id;
-- Use driver parameters for values, not interpolation.
```

## Remember

Requires the declared table. Check engine syntax and isolation. One-to-many joins can multiply totals.

## Verify before applying

Check the installed runtime, required surrounding values, permitted input, expected outcome, and failure behavior. Practice one changed input rather than copying a fragment without its contract.

Last verified: 2026-10-08; see the guide for publisher sources and execution limits.
