# Node Express interview questions

[Handbook](../README.md) | [All question ids](index.md)

Difficulty is an editorial learning classification. Questions are original practice, not a company question leak. Cover the answer before attempting recall.

## Q031 Easy - What does Node add to JavaScript?

<details>
<summary>Answer and follow-up</summary>

Node is a runtime with APIs for processes, files, networking, and other server tasks. Browser DOM APIs are not generally available. Nonblocking I/O lets a process handle many waiting operations, but synchronous JavaScript work still occupies the main execution thread.

**Follow-up:** Which APIs use the worker pool?

</details>

## Q032 Easy - What is Express middleware?

<details>
<summary>Answer and follow-up</summary>

Middleware receives the request, response, and next function. It may finish the response or pass control onward. Ordering matters: JSON parsing before routes, authentication before protected handlers, and error handlers after routes. Calling next after sending a response can create double-response bugs.

**Follow-up:** How is error middleware identified?

</details>

## Q033 Easy - Why must input validation run on the server?

<details>
<summary>Answer and follow-up</summary>

Clients can be modified or bypassed. Validate types, lengths, allowed values, and relationships at the API boundary. Use an allowlist when constructing database writes and return an actionable validation error. Database constraints remain necessary for races and persistent invariants.

**Follow-up:** Should you pass req.body directly into an update?

</details>

## Q034 Medium - How do Express 4 and Express 5 differ for async errors?

<details>
<summary>Answer and follow-up</summary>

Express 5 forwards rejected promises returned from route handlers to error middleware. Express 4 handlers usually need an explicit wrapper or try/catch with next(error). Use the behavior of the installed major version and test a thrown asynchronous error.

**Follow-up:** Why should unexpected errors not expose stacks?

</details>

## Q035 Medium - When should you use a stream?

<details>
<summary>Answer and follow-up</summary>

Streams process a sequence without loading the complete payload into memory. Respect backpressure when the receiver cannot keep up. pipeline coordinates completion and error handling. A stream helps large files; it does not make CPU-heavy parsing automatically inexpensive.

**Follow-up:** How does a client disconnect affect a response stream?

</details>

## Q036 Medium - How do you shut down an API gracefully?

<details>
<summary>Answer and follow-up</summary>

Stop accepting new requests, let in-flight work finish within a deadline, close database and queue connections, and exit. Handle termination signals and readiness separately from liveness. Long-lived sockets require an explicit policy so shutdown cannot hang forever.

**Follow-up:** What happens during a rolling deployment?

</details>

## Q037 Medium - How do you diagnose a blocked event loop?

<details>
<summary>Answer and follow-up</summary>

Correlate latency spikes with CPU profiles and event-loop delay metrics. Look for synchronous filesystem calls, large JSON work, catastrophic regexes, or expensive computations. Split or offload CPU work to worker threads and set payload limits. More async keywords cannot fix synchronous CPU work.

**Follow-up:** How would you benchmark a proposed fix?

</details>

## Q038 Hard - How should rate limits work across multiple instances?

<details>
<summary>Answer and follow-up</summary>

Per-process limits are useful locally but do not give one consistent global budget. Use a shared store or gateway and choose a key, window algorithm, and outage policy. Be careful with forwarded IP headers: trust only known proxy configuration.

**Follow-up:** How would you limit by both account and IP?

</details>

## Q039 Hard - How do you safely retry an API request?

<details>
<summary>Answer and follow-up</summary>

Retry transient failures with a bounded attempt count, timeout, exponential backoff, and jitter. Retrying a write can duplicate side effects, so use idempotency keys or a domain uniqueness constraint. A validation failure should not be retried automatically.

**Follow-up:** How do you distinguish timeout from definitive failure?

</details>

## Q040 Hard - What should structured API logs contain?

<details>
<summary>Answer and follow-up</summary>

Include a request or trace id, route template, status, duration, and a safe error category. Redact passwords, authorization headers, session tokens, and sensitive personal data. Structured fields enable aggregation; logging every request body risks exposing data and increases cost.

**Follow-up:** How do you correlate logs across services?

</details>
