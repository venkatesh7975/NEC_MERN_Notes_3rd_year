# Web foundations interview preparation

## Explain the core idea

Question: Explain how Web foundations contributes to a web application.

Answer guide: A static resource is served as stored; a dynamic response depends on application state or input. A static frontend may call a dynamic API. The browser renders and collects interaction, the server applies rules, and the database persists records.

## Predict an output

Question: Trace the [worked example](../01-foundations/notes.md) without running it.

Expected result: Run in Node or the browser console; expect /courses 2. Explain the input, operation and result, then introduce one boundary input and explain any required validation.

## Defend a project

Question: How did you satisfy parse five sample urls with the url api?

Answer criteria: cite the source implementation, demonstrate https://example.test/courses?page=2 yields page 2, then show a failing input and explain its handling. Discuss one tradeoff and one limitation.
