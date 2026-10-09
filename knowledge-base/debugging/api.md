# Another user can read a guessed id

Priority: P0 for failure reasoning; technology prerequisites follow the [topic guide](../topics/api.md).

## Broken code

```javascript
const item=await items.findOne({_id:validatedId});
res.json(item);
```

## Expected behavior

A caller can read only permitted items.

## Actual behavior

A valid id exposes another owner's record.

## Hints

Where did the trusted caller identity enter the query?

## Solution

<details>
<summary>Reveal the correction</summary>

```javascript
const item=await items.findOne({_id:validatedId,owner:req.user.id});
if(!item) return res.status(404).json({error:{code:'NOT_FOUND'}});
res.json(toPublicItem(item));
```

</details>

## Explanation and root cause

Resource lookup omitted permission scope. An opaque id is not authorization.

## How to prevent it

Include ownership or membership on every operation and test reads as well as writes.

## Verification

Reproduce the actual behavior, apply the fix in the stated runtime, and assert the expected behavior with the relevant boundary: pure output, real database, browser, Git snapshot, or deployment topology. [Existing scenario bank](../../interview-handbook/scenarios/README.md) provides additional cases.

[All challenges](README.md)
