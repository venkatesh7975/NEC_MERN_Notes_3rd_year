# A reviewed change omitted an unstaged file

Priority: P0 for failure reasoning; technology prerequisites follow the [topic guide](../topics/git.md).

## Broken code

```bash
git add server/app.js
git commit -m 'Add validation'
# validation.js was modified but never staged
```

## Expected behavior

The commit includes the coherent behavior and required file.

## Actual behavior

The new commit imports a function whose implementation is absent.

## Hints

Compare working, staged, and committed states.

## Solution

<details>
<summary>Reveal the correction</summary>

```bash
git status --short
git diff
git diff --cached
# Stage intended missing files, review, and commit a correction.
```

</details>

## Explanation and root cause

A commit records the index, not every working-tree change.

## How to prevent it

Inspect the staged diff and run checks on a clean checkout or CI.

## Verification

Reproduce the actual behavior, apply the fix in the stated runtime, and assert the expected behavior with the relevant boundary: pure output, real database, browser, Git snapshot, or deployment topology. [Existing scenario bank](../../interview-handbook/scenarios/README.md) provides additional cases.

[All challenges](README.md)
