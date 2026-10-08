# Node.js quick reference

Priority: P0/P1 for core use; specialized operations remain in the linked guide.

[Explanation and prerequisites](../topics/nodejs.md) · [All quick references](README.md)

## Common contract

```text
import {pipeline} from 'node:stream/promises';
await pipeline(sourceStream, destinationStream);
// Match package type to ESM/CommonJS.
// Close handles and define a shutdown deadline.
```

## Remember

async does not move CPU work off the thread. Bound I/O and worker concurrency.

## Verify before applying

Check the installed runtime, required surrounding values, permitted input, expected outcome, and failure behavior. Practice one changed input rather than copying a fragment without its contract.

Last verified: 2026-10-08; see the guide for publisher sources and execution limits.
