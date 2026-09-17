# Authentication and authorization interview preparation

## Explain the core idea

Question: Explain how Authentication and authorization contributes to a web application.

Answer guide: Authentication verifies identity; authorization checks actions and object access. Signed tokens are not encrypted. Use password hashing and deliberate session lifetimes. Reject inactive or missing accounts even with a valid token. Verify ownership on the server, never from a client-supplied role or owner field.

## Predict an output

Question: Trace the [worked example](../11-supplementary/authentication/notes.md) without running it.

Expected result: Node prints false. actor must come from verified server identity; this is a policy example, not a login implementation. Explain the input, operation and result, then introduce one boundary input and explain any required validation.

## Defend a project

Question: How did you satisfy throttle failed logins?

Answer criteria: cite the source implementation, demonstrate excess failures receive throttled response, then show a failing input and explain its handling. Discuss one tradeoff and one limitation.
