# Web security interview preparation

## Explain the core idea

Question: Explain how Web security contributes to a web application.

Answer guide: Trust boundaries separate controlled code from untrusted inputs. Bind SQL parameters, use safe text sinks for plain content, and encode for the output context. CSRF exploits automatically attached credentials; choose suitable token and origin checks. HttpOnly restricts script access to cookies but does not prevent XSS. CORS is not authorization.

## Predict an output

Question: Trace the [worked example](../10-security/notes.md) without running it.

Expected result: Run in browser console: literal markup appears, not bold HTML. Explain the input, operation and result, then introduce one boundary input and explain any required validation.

## Defend a project

Question: How did you satisfy check ownership for reads and writes?

Answer criteria: cite the source implementation, demonstrate user a cannot access user b records, then show a failing input and explain its handling. Discuss one tradeoff and one limitation.
