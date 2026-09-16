# Express.js interview preparation

## Explain the core idea

Question: Explain how Express.js contributes to a web application.

Answer guide: Routes match method and path. Ordered middleware can modify context, respond or call next. Parse the body before handlers that need it. Four-argument error middleware follows routes. Validation and authorization are separate checks; trusting an arbitrary role header demonstrates routing, not authentication.

## Predict an output

Question: Trace the [worked example](../07-express-rest/express/notes.md) without running it.

Expected result: Install Express in a scratch package; save as app.cjs and run node app.cjs. GET /health returns {"ok":true}. Explain the input, operation and result, then introduce one boundary input and explain any required validation.

## Defend a project

Question: How did you satisfy mount a router under /api/enrollments?

Answer criteria: cite the source implementation, demonstrate wrong prefix returns 404, then show a failing input and explain its handling. Discuss one tradeoff and one limitation.
