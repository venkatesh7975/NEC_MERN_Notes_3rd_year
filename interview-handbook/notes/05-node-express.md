# Node and Express request architecture

[Handbook](../README.md) | [Practice questions](../questions/node-express.md)

Read this guide, run the example, and demonstrate the exercise before moving on. These notes supplement the original classroom modules.

## Separate transport and business rules

The route handles HTTP concerns. A service enforces domain rules, and a repository provides persistence. This separation makes route behavior testable without implying that a fake repository proves database behavior.

Choose one module system per package. State runtime requirements and commit dependency locks. Keep server secrets in process configuration and out of client bundles.

## Budget resources

Nonblocking I/O allows useful work while other operations wait. Large synchronous computations still delay unrelated requests. Set request size limits, query bounds, timeouts, and rate limits.

Streams require backpressure and error handling. For CPU work, consider worker threads or background workers after measuring the actual bottleneck.

## Control failure paths

Use one error handler that returns safe consistent errors. Express major versions differ for rejected async handlers. Log unexpected errors with correlation ids, while avoiding secrets.

Stop accepting requests during shutdown, finish in-flight work within a deadline, and close connections. Health endpoints should distinguish process health from dependency readiness.

## Worked example

```js
app.use(express.json({limit: "16kb"}));
app.get("/api/health", (req, res) => res.json({ok: true}));
// Express 5 forwards a returned rejected promise to error middleware.
app.use((error, req, res, next) => {
  if (res.headersSent) return next(error);
  res.status(500).json({error: "INTERNAL_ERROR"});
});
```

## Demonstrate understanding

Add request ids and a structured logger to the reference API. Prove passwords and cookies are redacted.

## Reference

[Primary learning reference](https://nodejs.org/en/learn/getting-started/introduction-to-nodejs). Prefer the documentation matching the version you install.
