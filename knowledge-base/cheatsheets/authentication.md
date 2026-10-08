# Authentication quick reference

Priority: P0/P1 for core use; specialized operations remain in the linked guide.

[Explanation and prerequisites](../topics/security.md) · [All quick references](README.md)

## Common contract

```text
Trusted credential -> verified identity
Identity + permission predicate -> authorized operation
Expiration + revocation -> session lifetime
Safe public response -> no credential disclosure
```

## Remember

Signed JWT payloads are readable. HttpOnly and CORS do not replace CSRF defenses or ownership.

## Verify before applying

Check the installed runtime, required surrounding values, permitted input, expected outcome, and failure behavior. Practice one changed input rather than copying a fragment without its contract.

Last verified: 2026-10-08; see the guide for publisher sources and execution limits.
