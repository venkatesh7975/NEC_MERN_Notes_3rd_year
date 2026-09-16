# REST APIs interview preparation

## Explain the core idea

Question: Explain how REST APIs contributes to a web application.

Answer guide: Resources have representations and identifiers. GET reads, POST commonly creates, PUT replaces and PATCH applies a documented modification. Idempotence concerns intended state effects, not identical response bytes. Stateless requests carry sufficient context; resources can still persist. Specify failure responses and pagination bounds.

## Predict an output

Question: Trace the [worked example](../07-express-rest/rest-api/notes.md) without running it.

Expected result: Illustrative request/response contract, not a standalone program. Implement it in a project. Explain the input, operation and result, then introduce one boundary input and explain any required validation.

## Defend a project

Question: How did you satisfy allowlist sort fields?

Answer criteria: cite the source implementation, demonstrate filtered results keep stable ordering, then show a failing input and explain its handling. Discuss one tradeoff and one limitation.
