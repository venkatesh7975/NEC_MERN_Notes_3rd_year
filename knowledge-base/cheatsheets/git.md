# Git quick reference

Priority: P0/P1 for core use; specialized operations remain in the linked guide.

[Explanation and prerequisites](../topics/git.md) · [All quick references](README.md)

## Common contract

```text
git status --short
git diff
git diff --cached
git log --oneline -5
```

## Remember

Inspect states before changing history. Revert adds a compensating commit; reset may alter local work.

## Verify before applying

Check the installed runtime, required surrounding values, permitted input, expected outcome, and failure behavior. Practice one changed input rather than copying a fragment without its contract.

Last verified: 2026-10-08; see the guide for publisher sources and execution limits.
