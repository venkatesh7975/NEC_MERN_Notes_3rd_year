# Shallow copy mutates the original

Priority: P0 for failure reasoning; technology prerequisites follow the [topic guide](../topics/javascript.md).

## Broken code

```javascript
const a={tags:['mern']}; const b={...a}; b.tags.push('node'); console.log(a.tags.length);
```

## Expected behavior

Original list stays at length 1.

## Actual behavior

Length becomes 2.

## Hints

Which references are copied? Inspect a.tags === b.tags.

## Solution

<details>
<summary>Reveal the correction</summary>

```javascript
const a={tags:['mern']}; const b={...a,tags:[...a.tags,'node']}; console.log(a.tags.length);
```

</details>

## Explanation and root cause

The outer object is copied while tags is still shared. Clone or replace the nested value at the domain boundary.

## How to prevent it

Define mutation ownership and test nested values, not just outer identity.

## Verification

Reproduce the actual behavior, apply the fix in the stated runtime, and assert the expected behavior with the relevant boundary: pure output, real database, browser, Git snapshot, or deployment topology. [Existing scenario bank](../../interview-handbook/scenarios/README.md) provides additional cases.

[All challenges](README.md)
