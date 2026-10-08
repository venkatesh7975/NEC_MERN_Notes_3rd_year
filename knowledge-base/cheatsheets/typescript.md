# TypeScript quick reference

Priority: P0/P1 for core use; specialized operations remain in the linked guide.

[Explanation and prerequisites](../topics/typescript.md) · [All quick references](README.md)

## Common contract

```text
type Result<T> = {ok:true; value:T} | {ok:false; error:string};
function read<T>(result:Result<T>) {
  return result.ok ? result.value : result.error;
}
```

## Remember

unknown inputs need runtime checks. as is an assertion, not a validator.

## Verify before applying

Check the installed runtime, required surrounding values, permitted input, expected outcome, and failure behavior. Practice one changed input rather than copying a fragment without its contract.

Last verified: 2026-10-08; see the guide for publisher sources and execution limits.
