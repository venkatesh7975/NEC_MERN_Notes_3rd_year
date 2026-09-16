# React interview preparation

## Explain the core idea

Question: Explain how React contributes to a web application.

Answer guide: A component describes an interface using JSX. Props arrive from its parent; state holds local memory. Event handlers request state changes. Render computes the interface and commit updates the DOM. Derive values such as filtered lists from source state rather than maintaining duplicate state. Effects synchronize external systems when needed; they are not required for every calculation.

## Predict an output

Question: Trace the [worked example](../05-react/notes.md) without running it.

Expected result: Use as src/App.jsx in a React host; two clicks restore Save. Explain the input, operation and result, then introduce one boundary input and explain any required validation.

## Defend a project

Question: How did you satisfy store completed lesson ids?

Answer criteria: cite the source implementation, demonstrate two completed lessons of four produce 50 percent, then show a failing input and explain its handling. Discuss one tradeoff and one limitation.
