# Unique is treated as field validation

Priority: P0 for failure reasoning; technology prerequisites follow the [topic guide](../topics/mongoose.md).

## Broken code

```javascript
const schema=new Schema({email:{type:String,unique:true}});
await new User({email}).validate(); // assumed to prove uniqueness
```

## Expected behavior

Concurrent duplicates are rejected by the real store.

## Actual behavior

Document validation alone does not prove uniqueness.

## Hints

Is unique a validator, and does the index exist?

## Solution

<details>
<summary>Reveal the correction</summary>

```javascript
await User.init(); // wait for configured indexes in a controlled test
// In deployment, use an explicit index migration and handle duplicate-key errors.
```

</details>

## Explanation and root cause

unique describes an index requirement, not an ordinary Mongoose validator. Production index deployment needs intentional management.

## How to prevent it

Separate field validation from persisted uniqueness and inspect index creation failures.

## Verification

Reproduce the actual behavior, apply the fix in the stated runtime, and assert the expected behavior with the relevant boundary: pure output, real database, browser, Git snapshot, or deployment topology. [Existing scenario bank](../../interview-handbook/scenarios/README.md) provides additional cases.

[All challenges](README.md)
