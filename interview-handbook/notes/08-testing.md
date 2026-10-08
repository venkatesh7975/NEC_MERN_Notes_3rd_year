# Testing debugging and delivery

[Handbook](../README.md) | [Practice questions](../questions/testing-tooling.md)

Read this guide, run the example, and demonstrate the exercise before moving on. These notes supplement the original classroom modules.

## Test observable contracts

Write expected results from the specification, including boundaries, duplicates, invalid values, and failures. Avoid computing expected output with the same algorithm being tested.

A fake database is appropriate for route contracts. Real database tests are necessary for indexes and atomic predicates. Browser tests are necessary for focus and realistic interaction.

## Debug systematically

Reproduce the issue, reduce it to a small case, inspect the relevant layer, and write a regression test where it adds value. Change one hypothesis at a time.

Use network logs for request failures, browser traces for rendering, and database explain output for query work. A rewrite without diagnosis may preserve the underlying failure.

## Make setup repeatable

Commit lockfiles, provide env examples without secrets, document database requirements, and run builds in CI. State which checks passed and which environments were unavailable.

Tests should fail when important behavior breaks. A project with only screenshots or syntax checks has not established authorization, persistence, or recovery correctness.

## Worked example

```js
import {test} from "node:test";
import assert from "node:assert/strict";
test("a stale edit cannot overwrite the newer task", async () => {
  // Arrange two requests at the same expected version.
  // Assert one succeeds, one conflicts, and data changes only once.
});
```

## Demonstrate understanding

Add a regression test for a bug you can reproduce, then verify that reverting the fix makes the test fail.

## Reference

[Primary learning reference](https://testing-library.com/docs/react-testing-library/intro/). Prefer the documentation matching the version you install.
