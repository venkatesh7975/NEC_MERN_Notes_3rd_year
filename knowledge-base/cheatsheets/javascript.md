# JavaScript quick reference

Priority: P0/P1 for core use; specialized operations remain in the linked guide.

[Explanation and prerequisites](../topics/javascript.md) · [All quick references](README.md)

## Common contract

```text
const next = {...item, tags:[...item.tags, 'new']};
const selected = rows.filter(row => row.active);
const names = selected.map(row => row.name);
const missingOnly = value ?? fallback;
```

## Remember

const does not freeze objects. Spread is shallow. Prefer explicit parsing and identity rules.

## Verify before applying

Check the installed runtime, required surrounding values, permitted input, expected outcome, and failure behavior. Practice one changed input rather than copying a fragment without its contract.

Last verified: 2026-10-08; see the guide for publisher sources and execution limits.
