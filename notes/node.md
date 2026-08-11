# Comprehensive Node.js Architecture & Backend Guide

## Introduction
Node.js is an open-source, cross-platform JavaScript runtime environment built on Google Chrome's V8 engine. Node.js enables executing JavaScript code outside of web browsers to build fast, scalable network applications and RESTful backend microservices.

## Why We Need It
Before Node.js, web developers had to write client-side logic in JavaScript and server-side logic in different languages like Java, PHP, or Python. Node.js unified full-stack development under a single language (JavaScript), offering event-driven, non-blocking I/O ideal for real-time web apps, APIs, and microservices.

## Syntax
```javascript
// Native HTTP server module in Node.js
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ status: 'success', message: 'Welcome to Node.js API' }));
});

server.listen(5000, () => {
  console.log('Server running on port 5000');
});
```

## Explanation
- **V8 Engine**: Compiles JavaScript directly into machine code for blazing-fast execution.
- **Event Loop & Libuv**: Manages asynchronous I/O operations using worker threads under the hood while maintaining a single main thread.
- **NPM (Node Package Manager)**: World's largest ecosystem of open-source libraries and modules.
- **File System (`fs`)**: Module for non-blocking file operations (`fs.promises.readFile`, `fs.promises.writeFile`).
- **Buffer & Streams**: Optimized memory handling for chunked data transfer (video streaming, large file uploads).

## Example 1: Asynchronous File Processing using Promises
```javascript
const fs = require('fs').promises;
const path = require('path');

async function processCourseData() {
  const filePath = path.join(__dirname, 'data', 'courses.json');
  try {
    const rawData = await fs.readFile(filePath, 'utf-8');
    const courses = JSON.parse(rawData);
    
    // Filter active courses
    const activeCourses = courses.filter(c => c.isPublished);
    
    console.log(`Successfully processed ${activeCourses.length} active courses.`);
    return activeCourses;
  } catch (err) {
    console.error('File Processing Error:', err.message);
  }
}

processCourseData();
```

## Example 2: Event Emitter Pattern for LMS Notifications
```javascript
const EventEmitter = require('events');

class NotificationManager extends EventEmitter {}

const notifier = new NotificationManager();

// Register listener for course enrollment
notifier.on('courseEnrolled', ({ studentEmail, courseTitle }) => {
  console.log(`[EMAIL DISPATCH] Sending confirmation email to ${studentEmail} for course: ${courseTitle}`);
});

// Register listener for certificate issuance
notifier.on('certificateIssued', ({ studentName, courseTitle }) => {
  console.log(`[CERTIFICATE GENERATED] Issued certificate for ${studentName} - ${courseTitle}`);
});

// Trigger events
notifier.emit('courseEnrolled', { studentEmail: 'student@example.com', courseTitle: 'React 19 Masterclass' });
notifier.emit('certificateIssued', { studentName: 'Alex Smith', courseTitle: 'React 19 Masterclass' });
```

## Real World Example
Streaming services like Netflix and real-time collaboration tools use Node.js streams to process data in chunks without loading entire files into server memory, dramatically reducing RAM usage and latency.

## Best Practices
1. **Always Use Asynchronous Non-Blocking APIs**: Prefer `fs.promises` over synchronous blocking `fs.readFileSync`.
2. **Handle Uncaught Exceptions**: Handle global errors with `process.on('uncaughtException')` and `process.on('unhandledRejection')`.
3. **Use Environment Variables**: Keep sensitive secrets (DB strings, API keys) inside `.env` files loaded via `dotenv`.
4. **Implement Logging**: Use robust logging tools like `winston` or `pino` instead of raw `console.log` in production.

## Common Mistakes
- Blocking the single event loop thread with heavy synchronous computations (e.g., synchronous cryptographic calculations or huge loops).
- Not handling stream error events, causing node processes to crash unexpectedly.
- Exposing sensitive environment configuration files to version control (`.gitignore` missing `.env`).

## Interview Questions
1. **How does the Node.js Event Loop process Asynchronous Tasks?**
   *Answer*: The Event Loop has phases: Timers (`setTimeout`), Pending Callbacks (I/O callbacks), Poll (retrieving new I/O events), Check (`setImmediate`), and Close Callbacks. `process.nextTick()` and Promises execute immediately after the current operation finishes before moving to the next phase.
2. **What is the difference between `process.nextTick()` and `setImmediate()`?**
   *Answer*: `process.nextTick()` fires immediately after the current operation finishes before the event loop continues. `setImmediate()` fires during the Check phase of the event loop cycle.
3. **What is Buffer in Node.js?**
   *Answer*: Buffer is a global class in Node.js designed to handle raw binary data directly in memory outside the V8 heap.

## Practice Problems
1. Create a CLI utility script in Node.js that recursively searches a directory for `.md` files and outputs total word counts.
2. Build a custom HTTP request logger middleware in pure Node.js without using external frameworks.

## Assignment
Build a file stream server in Node.js that streams large video files or PDF resources to client requests with HTTP 206 Partial Content range support.

## Summary
Node.js provides an incredibly efficient, asynchronous runtime for building modern web backend applications. Understanding its event-driven architecture and asynchronous I/O model is fundamental for backend engineering.
