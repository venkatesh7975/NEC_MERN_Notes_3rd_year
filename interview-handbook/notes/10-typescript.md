# TypeScript and explicit domain states

[Handbook](../README.md) | [Practice questions](../questions/typescript-career.md)

Read this guide, run the example, and demonstrate the exercise before moving on. These notes supplement the original classroom modules.

## Represent valid states

Use discriminated unions when fields depend on a state. A success variant carries data; an error variant carries a message. This reduces impossible combinations compared with several independent booleans.

Prefer unknown for external data until validated. Static types describe your assumptions; runtime checks establish whether incoming data satisfies them.

## Keep relationships in types

Generics connect input and output types without discarding specifics. Constraints express the capabilities required. Narrow values with checks rather than using broad type assertions.

Use strict compiler settings for a new typed project. Avoid any at API boundaries, and do not claim that a TypeScript migration makes an unvalidated server secure.

## Practice migration

Migrate a small service or state reducer first. Keep runtime behavior stable, add precise types, and retain tests. Typed libraries can still deliver invalid data at runtime.

Explain where types help and where they do not: authorization, network failure, concurrency, and database constraints remain runtime concerns.

## Worked example

```ts
type Remote<T> =
  | {status: "idle"}
  | {status: "loading"}
  | {status: "success"; data: T}
  | {status: "error"; message: string};
function summary(state: Remote<string[]>) {
  return state.status === "success" ? state.data.length : 0;
}
```

## Demonstrate understanding

Port one API response parser and one React reducer to TypeScript with strict checking and no unchecked assertion of external data.

## Reference

[Primary learning reference](https://www.typescriptlang.org/docs/). Prefer the documentation matching the version you install.
