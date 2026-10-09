# Duplicate creation passes a precheck

Priority: P0 for failure reasoning; technology prerequisites follow the [topic guide](../topics/mongodb.md).

## Broken code

```javascript
if (!await users.findOne({email})) await users.insertOne({email});
```

## Expected behavior

At most one stored record per canonical email.

## Actual behavior

Two concurrent requests both pass the read and insert.

## Hints

Can another request act between the read and insert?

## Solution

<details>
<summary>Reveal the correction</summary>

```javascript
await users.createIndex({email:1},{unique:true});
// Insert and translate a real duplicate-key error into a safe conflict.
await users.insertOne({email});
```

</details>

## Explanation and root cause

A read-before-write observation is not a uniqueness invariant. The database index establishes it.

## How to prevent it

Normalize the value consistently, verify the actual index, and test real competing inserts.

## Verification

Reproduce the actual behavior, apply the fix in the stated runtime, and assert the expected behavior with the relevant boundary: pure output, real database, browser, Git snapshot, or deployment topology. [Existing scenario bank](../../interview-handbook/scenarios/README.md) provides additional cases.

[All challenges](README.md)
