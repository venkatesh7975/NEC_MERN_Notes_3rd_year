# CSS quick reference

Priority: P0/P1 for core use; specialized operations remain in the linked guide.

[Explanation and prerequisites](../topics/css.md) · [All quick references](README.md)

## Common contract

```text
* { box-sizing: border-box; }
.grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); }
.child { min-width:0; overflow-wrap:anywhere; }
:focus-visible { outline:3px solid #ce6a16; }
```

## Remember

Inspect cascade stage, intrinsic size, and stacking context before adding specificity or z-index.

## Verify before applying

Check the installed runtime, required surrounding values, permitted input, expected outcome, and failure behavior. Practice one changed input rather than copying a fragment without its contract.

Last verified: 2026-10-08; see the guide for publisher sources and execution limits.
