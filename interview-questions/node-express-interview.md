# Node.js & Express Interview Questions & Answers

### Q1: What makes Node.js non-blocking and single-threaded?
**Answer**: Node.js utilizes an event-driven architecture powered by the Libuv library thread pool under the hood. Heavy I/O operations are offloaded asynchronously, allowing the single main thread to continue processing requests without blocking.

### Q2: What is Middleware in Express.js?
**Answer**: Functions that have access to the request (`req`), response (`res`), and `next` callback function. Middleware can execute code, modify request/response objects, end the request cycle, or pass control to subsequent middleware using `next()`.

### Q3: How do you handle unhandled Promise rejections in Node.js?
**Answer**: Listen for `process.on('unhandledRejection', (reason, promise) => { ... })` globally and safely log errors before gracefully shutting down server connections.
