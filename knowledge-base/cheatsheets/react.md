# React quick reference

Priority: P0/P1 for core use; specialized operations remain in the linked guide.

[Explanation and prerequisites](../topics/react.md) · [All quick references](README.md)

## Common contract

```text
const [count,setCount] = useState(0);
setCount(previous => previous + 1);
// Derive values during render.
// Effects connect to external systems; return cleanup.
```

## Remember

Use stable keys, preserve form drafts, and keep commands out of rendering.

## Verify before applying

Check the installed runtime, required surrounding values, permitted input, expected outcome, and failure behavior. Practice one changed input rather than copying a fragment without its contract.

Last verified: 2026-10-08; see the guide for publisher sources and execution limits.
