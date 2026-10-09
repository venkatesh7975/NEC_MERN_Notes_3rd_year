# JavaScript interview toolkit

Six implementations with behavioral tests: trailing debounce with cancel and flush, LRU cache, event emitter, concurrency-limited all-settled pool, Two Sum, and prefix-sum subarray counting.

```bash
cd projects/interview-ready/js-toolkit
npm test
```

No dependencies. Requires Node 22 or newer. Read `src/index.js` and the test contracts before changing behavior. Debounce uses a trailing call; the event emitter deduplicates the same listener and stops on a thrown error; the promise pool waits for every task and cannot finish if a task never settles. The numeric algorithms assume finite numbers within useful JavaScript precision. The LRU has no TTL extension yet.

Interview extensions: add injected-clock TTL to LRU, abort support to the pool, or an error policy to the emitter. Demonstrate boundaries and explain expected complexity rather than copying the code during practice.
