# An effect stores a derived total

Priority: P0 for failure reasoning; technology prerequisites follow the [topic guide](../topics/react.md).

## Broken code

```jsx
const [total,setTotal]=useState(0);
useEffect(()=>setTotal(items.reduce((s,x)=>s+x.cents,0)),[items,total]);
```

## Expected behavior

Total corresponds to the current items without redundant transitions.

## Actual behavior

The component performs redundant renders and can create feedback when derivation changes.

## Hints

Is total an independent fact? Does an external system need synchronization?

## Solution

<details>
<summary>Reveal the correction</summary>

```jsx
const total=items.reduce((sum,item)=>sum+item.cents,0);
```

</details>

## Explanation and root cause

A derived value was modeled as separate state and synchronized through an effect. Calculate it from current inputs.

## How to prevent it

Store independent facts and reserve effects for external synchronization.

## Verification

Reproduce the actual behavior, apply the fix in the stated runtime, and assert the expected behavior with the relevant boundary: pure output, real database, browser, Git snapshot, or deployment topology. [Existing scenario bank](../../interview-handbook/scenarios/README.md) provides additional cases.

[All challenges](README.md)
