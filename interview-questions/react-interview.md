# React 19 Interview Questions & Answers

### Q1: What is the Virtual DOM and how does React diffing reconciliation work?
**Answer**: Virtual DOM is a lightweight JS object representation of the real DOM in memory. When state updates, React creates a new Virtual DOM tree, compares it with the previous tree using its Diffing algorithm, and batch-updates only modified real DOM nodes.

### Q2: What are React Hooks and what rules must be followed when using them?
**Answer**: Hooks allow using state and lifecycle features in functional components. Rules: 1) Call hooks only at the top level (never inside loops or conditions). 2) Call hooks only from React functional components or custom hooks.

### Q3: What is the difference between `useMemo` and `useCallback`?
**Answer**: `useMemo` caches the calculated *return value* of an expensive calculation. `useCallback` caches the *function instance* itself to avoid re-creating callbacks passed to child components.
