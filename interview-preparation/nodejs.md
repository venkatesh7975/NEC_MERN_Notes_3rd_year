# Node.js interview preparation

## Explain the core idea

Question: Explain how Node.js contributes to a web application.

Answer guide: Node executes JavaScript outside the browser. CommonJS and ES modules have different loading conventions. NPM manages packages and scripts. Await suspends its async function while other work can continue. Synchronous CPU-heavy work can still block the event loop. The printed syllabus ends at Event; event emitters are an explicit teaching interpretation.

## Predict an output

Question: Trace the [worked example](../06-nodejs/notes.md) without running it.

Expected result: Save as reader.cjs; node reader.cjs roster.json prints 2 for [{"id":1},{"id":2}]. Explain the input, operation and result, then introduce one boundary input and explain any required validation.

## Defend a project

Question: How did you satisfy read three files with allsettled?

Answer criteria: cite the source implementation, demonstrate one missing file does not discard two successes, then show a failing input and explain its handling. Discuss one tradeoff and one limitation.
