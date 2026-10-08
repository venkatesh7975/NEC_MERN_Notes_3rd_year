# Regular expressions quick reference

Priority: P0/P1 for core use; specialized operations remain in the linked guide.

[Explanation and prerequisites](../topics/javascript.md) · [All quick references](README.md)

## Common contract

```text
const safeId = /^[a-f0-9]{24}$/i.test(input);
const twoDecimals = /^\d+(?:\.\d{1,2})?$/.test(input);
// Anchors check the whole string.
// State and Unicode behavior depend on flags.
```

## Remember

Limit input size and avoid catastrophic backtracking patterns. A format match does not prove domain validity.

## Verify before applying

Check the installed runtime, required surrounding values, permitted input, expected outcome, and failure behavior. Practice one changed input rather than copying a fragment without its contract.

Last verified: 2026-10-08; see the guide for publisher sources and execution limits.
