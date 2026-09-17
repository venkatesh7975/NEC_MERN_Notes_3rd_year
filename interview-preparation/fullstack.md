# Full Stack MERN interview preparation

## Explain the core idea

Question: Explain how Full Stack MERN contributes to a web application.

Answer guide: A feature spans UI, API and persistence. The UI communicates state; the server validates and authorizes; the database preserves invariants. Show loading, empty and failure states distinctly. Confirm a durable write before reporting success unless optimistic rollback is explicitly implemented.

## Predict an output

Question: Trace the [worked example](../11-supplementary/fullstack/notes.md) without running it.

Expected result: Client integration snippet; requires a working server. Caller must present loading, error and empty states. Explain the input, operation and result, then introduce one boundary input and explain any required validation.

## Defend a project

Question: How did you satisfy book available equipment?

Answer criteria: cite the source implementation, demonstrate two requests for last item allow one success, then show a failing input and explain its handling. Discuss one tradeoff and one limitation.
