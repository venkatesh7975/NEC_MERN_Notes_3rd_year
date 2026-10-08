# React interview questions

[Handbook](../README.md) | [All question ids](index.md)

Difficulty is an editorial learning classification. Questions are original practice, not a company question leak. Cover the answer before attempting recall.

## Q021 Easy - What is the difference between props and state?

<details>
<summary>Answer and follow-up</summary>

Props are inputs supplied by a parent. State is component-owned memory that participates in rendering. Treat both as immutable snapshots. Derive values from existing inputs during render when possible instead of keeping duplicate state that can drift.

**Follow-up:** When should state be lifted?

</details>

## Q022 Easy - Why do list items need stable keys?

<details>
<summary>Answer and follow-up</summary>

Keys tell React which sibling identity persists across renders. A stable domain id preserves the correct item state when ordering changes. Array indexes can assign state to the wrong row after insertion or sorting. Keys only need to be unique among siblings.

**Follow-up:** Can changing a key reset a form?

</details>

## Q023 Easy - Why does setCount(count + 1) twice often add only one?

<details>
<summary>Answer and follow-up</summary>

Both calls can read the same state snapshot in the event handler. Functional updates setCount(c => c + 1) describe transitions and can be applied in sequence. The state variable in the current handler does not mutate immediately after a setter.

**Follow-up:** What does batching change?

</details>

## Q024 Medium - What belongs in useEffect?

<details>
<summary>Answer and follow-up</summary>

Use an effect to synchronize with an external system such as a subscription, network request, or browser API. User actions usually belong in event handlers. Filtering an existing array can happen during render. Return cleanup for resources acquired by the effect.

**Follow-up:** Why might development run setup and cleanup again?

</details>

## Q025 Medium - How do you avoid stale search responses?

<details>
<summary>Answer and follow-up</summary>

Associate the request with the current query, abort obsolete fetches during cleanup, and ignore responses from older requests. Cancellation can reduce work; an identity or generation check protects correctness even if an operation cannot be canceled. Keep loading and error state tied to the same request.

**Follow-up:** What happens when the user clears the query?

</details>

## Q026 Medium - When would you use a reducer?

<details>
<summary>Answer and follow-up</summary>

A reducer makes related state transitions explicit, especially when several fields change together. Keep the reducer pure and represent actions using domain intent. It can make undo or optimistic transitions easier to inspect. A single simple boolean does not need a reducer.

**Follow-up:** Where do asynchronous operations belong?

</details>

## Q027 Medium - Does context prevent renders?

<details>
<summary>Answer and follow-up</summary>

Context distributes a value. Consumers can render when the provided value changes, and normal parent rendering also matters. Split unrelated contexts and keep provider values stable where useful. Measure before adding memoization; context is not a complete server-data cache.

**Follow-up:** When would an external store help?

</details>

## Q028 Hard - How do you handle optimistic updates safely?

<details>
<summary>Answer and follow-up</summary>

Apply a temporary local result while a request is pending. Use a mutation id or version so an earlier response cannot overwrite a later edit. On failure, restore the affected item or refetch authoritative state and show a retry path. Disabling duplicate submission simplifies some flows.

**Follow-up:** How do you handle a 409 version conflict?

</details>

## Q029 Hard - How do you improve a slow React list?

<details>
<summary>Answer and follow-up</summary>

Measure whether the cost is fetching, rendering, layout, or large data processing. Use server pagination or windowing for large collections, stable keys, and appropriate state placement. Memoization helps only when avoided work exceeds comparison cost and props remain suitably stable.

**Follow-up:** How do you preserve accessibility in virtualization?

</details>

## Q030 Hard - Compare client components and server components.

<details>
<summary>Answer and follow-up</summary>

Client components support state and browser interactions. Server components execute in a compatible server-rendering framework and can access server resources without shipping that implementation to the browser. A Vite client SPA does not gain server components by installing React.

**Follow-up:** How do you keep secrets out of client bundles?

</details>
