# React state effects and resilient UI

[Handbook](../README.md) | [Practice questions](../questions/react.md)

Read this guide, run the example, and demonstrate the exercise before moving on. These notes supplement the original classroom modules.

## Choose one state owner

Represent each fact in one authoritative place. Derive filtered results and totals during render. Keep drafts local to forms and remote data in a request-aware model. Lift shared state only as far as required.

Stable keys express identity. A changed key can intentionally reset state, while an array index can preserve the wrong row state after reordering.

## Make transitions explicit

Functional state updates express a transition from the previous state. A reducer is useful when several values move together. Pure render logic lets React call components without performing hidden side effects.

Do not trigger a payment or mutation simply because a component rendered. User intent belongs in handlers; effects synchronize external systems and clean up subscriptions.

## Handle remote state

Show loading, empty, success, and error states separately. Prevent old requests from replacing newer results using cleanup and request identity. Handle HTTP errors explicitly because fetch resolves on many error status codes.

Optimistic writes need rollback or refetch and a conflict policy. Client abort does not prove the server canceled a write. Use versions or mutation ids for correctness.

## Worked example

```jsx
useEffect(() => {
  const controller = new AbortController();
  let current = true;
  setState({status: "loading"});
  fetch(`/api/items?q=${encodeURIComponent(query)}`, {signal: controller.signal})
    .then(r => { if (!r.ok) throw new Error("Request failed"); return r.json(); })
    .then(data => { if (current) setState({status: "success", data}); })
    .catch(error => { if (current && error.name !== "AbortError") setState({status: "error", error}); });
  return () => { current = false; controller.abort(); };
}, [query]);
```

## Demonstrate understanding

Explain each state transition in the MERN workspace and demonstrate an API failure without losing the form draft.

## Reference

[Primary learning reference](https://react.dev/learn). Prefer the documentation matching the version you install.
