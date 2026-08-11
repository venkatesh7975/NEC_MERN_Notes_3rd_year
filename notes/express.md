# Comprehensive Express.js Web Framework & REST API Guide

## Introduction
Express.js is a fast, unopinionated, minimalist web framework for Node.js. It simplifies HTTP route handling, request parsing, middleware processing, header manipulation, and REST API development.

## Why We Need It
While Node.js provides a native `http` module, building complex REST APIs with raw Node requires writing boilerplate code for route parsing, query parameter extraction, header handling, static file serving, and error middleware. Express provides an intuitive framework for building scalable web backend services.

## Syntax
```javascript
const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// Route Handler
app.get('/api/courses', (req, res) => {
  res.status(200).json({ success: true, count: 0, data: [] });
});

app.listen(5000, () => console.log('Server running on port 5000'));
```

## Explanation
- **Routing**: Mapping HTTP verbs (`GET`, `POST`, `PUT`, `DELETE`) and URI paths to handler functions.
- **Middleware**: Functions that have access to request (`req`), response (`res`), and `next()` function in the request-response cycle.
- **Request & Response Objects**: Express wraps HTTP objects with utility methods (`res.status()`, `res.json()`, `req.params`, `req.query`, `req.body`).
- **Error Handling Middleware**: Special 4-parameter middleware `(err, req, res, next)` to handle centralized application errors.

## Example 1: Modular Express Router & Middleware Architecture
```javascript
// routes/courseRoutes.js
const express = require('express');
const router = express.Router();

// Mock middleware
const protect = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'Not authorized to access this route' });
  }
  next();
};

router.route('/')
  .get((req, res) => {
    res.json({ message: 'Get all public courses' });
  })
  .post(protect, (req, res) => {
    res.status(201).json({ message: 'Course created successfully', data: req.body });
  });

router.route('/:id')
  .get((req, res) => {
    res.json({ message: `Fetch course with ID: ${req.params.id}` });
  })
  .delete(protect, (req, res) => {
    res.json({ message: `Course ${req.params.id} deleted` });
  });

module.exports = router;
```

## Example 2: Input Validation & Centralized Error Handler
```javascript
const express = require('express');
const { body, validationResult } = require('express-validator');
const app = express();

app.use(express.json());

// Registration controller with express-validator
app.post(
  '/api/auth/register',
  [
    body('email').isEmail().withMessage('Please provide a valid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation Failed');
      error.statusCode = 400;
      error.data = errors.array();
      return next(error);
    }
    
    res.status(201).json({ success: true, message: 'User registered successfully' });
  }
);

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(`[ERROR] ${err.message}`);
  const status = err.statusCode || 500;
  res.status(status).json({
    success: false,
    message: err.message || 'Internal Server Error',
    errors: err.data || null
  });
});
```

## Real World Example
Enterprise backend servers use Express.js middleware chains for CORS configuration (`cors()`), security headers (`helmet()`), rate limiting (`express-rate-limit`), body parsing (`express.json()`), and JWT authentication verification before allowing request access to sensitive user data.

## Best Practices
1. **Modularize Code with Express Router**: Separate routes into clear domain modules (Auth, Courses, Users, Quizzes).
2. **Centralize Error Handling**: Pass errors down via `next(err)` to a unified error handling middleware.
3. **Validate Request Bodies**: Never trust incoming payload data; validate with `express-validator`.
4. **Use Asynchronous Route Handlers Safely**: Use `express-async-handler` or `async/await` with `try...catch` blocks to prevent hanging requests.

## Common Mistakes
- Forgetting `next()` inside custom middleware, causing HTTP requests to hang indefinitely.
- Not defining `express.json()` middleware, causing `req.body` to be `undefined`.
- Placing error handler middleware *before* standard route handlers instead of at the end of the middleware stack.

## Interview Questions
1. **How do custom Middlewares work in Express.js?**
   *Answer*: Middleware functions execute sequentially in the order they are registered with `app.use()`. Each middleware receives `req`, `res`, and `next`. Calling `next()` passes control to the next middleware in line.
2. **What is the difference between `req.params`, `req.query`, and `req.body`?**
   *Answer*: `req.params` contains route path parameters (`/courses/:id`). `req.query` contains URL query parameters (`/courses?category=react`). `req.body` contains the parsed HTTP payload body (JSON/URL-encoded).
3. **How does error handling work in Express?**
   *Answer*: Express identifies error handling middleware by declaring 4 parameters: `(err, req, res, next)`. When any middleware calls `next(err)`, Express skips remaining routes and executes the error handler.

## Practice Problems
1. Write a custom rate-limiting middleware in Express that limits requests to 100 per 15 minutes per IP address.
2. Build an Express API endpoint that handles file uploads using Multer and returns the file metadata.

## Assignment
Develop a complete RESTful Express API for an LMS Course Module containing full CRUD routes, authentication protection, input validation, and centralized error handling.

## Summary
Express.js is the premier web framework for building Node.js backend services. Mastering routing, middleware patterns, request validation, and error handling enables creating robust production APIs.
