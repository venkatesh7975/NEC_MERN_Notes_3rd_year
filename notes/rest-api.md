# Comprehensive REST API Design & Architecture Guide

## Introduction
REpresentational State Transfer (REST) is an architectural style for designing networked applications and web APIs. RESTful APIs use standard HTTP verbs (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`) and HTTP status codes to perform operations on server resources.

## Why We Need It
Modern software systems require seamless communication between decoupled applications (e.g. React single-page frontend apps, mobile iOS/Android apps, and third-party partner integrations). REST APIs establish a universal, stateless, language-agnostic interface for exchanging JSON or XML data across networks.

## Syntax
```http
GET /api/v1/courses HTTP/1.1
Host: api.lms.com
Authorization: Bearer <jwt_token>
Accept: application/json
```
Response:
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "success": true,
  "count": 2,
  "data": [
    { "id": "c101", "title": "HTML5 & CSS3 Fundamentals" },
    { "id": "c102", "title": "React 19 Masterclass" }
  ]
}
```

## Explanation
- **Statelessness**: Every HTTP request from client to server must contain all information required to understand and process the request. Server stores no client session context.
- **Resource Nouns**: URIs should represent resources using plural nouns (`/courses`, `/users`), not action verbs (`/getCourse`).
- **HTTP Verbs**:
  - `GET`: Retrieve resource(s).
  - `POST`: Create a new resource.
  - `PUT`: Replace an existing resource completely.
  - `PATCH`: Partially update an existing resource.
  - `DELETE`: Remove a resource.
- **HTTP Status Codes**:
  - `200 OK`: Successful retrieval/operation.
  - `201 Created`: Resource successfully created.
  - `400 Bad Request`: Client validation error.
  - `401 Unauthorized`: Authentication missing or invalid.
  - `403 Forbidden`: Authenticated user lacks permission.
  - `404 Not Found`: Resource URI does not exist.
  - `500 Internal Server Error`: Unhandled backend failure.

## Example 1: RESTful Resource Routing Table
| HTTP Method | Endpoint URI | Description | Status Code |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/courses` | Get paginated list of courses | `200 OK` |
| `POST` | `/api/v1/courses` | Create new course (Instructor only) | `201 Created` |
| `GET` | `/api/v1/courses/:id` | Get details for specific course | `200 OK` |
| `PUT` | `/api/v1/courses/:id` | Update entire course record | `200 OK` |
| `PATCH` | `/api/v1/courses/:id` | Update single field (e.g. `isPublished`) | `200 OK` |
| `DELETE` | `/api/v1/courses/:id` | Delete course record | `200 OK` |

## Example 2: Standardized Express Response Utility
```javascript
// Express controller helper for standardized REST response payloads
const sendResponse = (res, statusCode, success, message, data = null, meta = null) => {
  return res.status(statusCode).json({
    success,
    message,
    data,
    meta,
    timestamp: new Date().toISOString()
  });
};

// Usage in Route Handler
app.get('/api/v1/courses', async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  
  const courses = await Course.find()
    .skip((page - 1) * limit)
    .limit(limit);
    
  const total = await Course.countDocuments();

  sendResponse(
    res, 
    200, 
    true, 
    'Courses retrieved successfully', 
    courses, 
    { page, limit, totalPages: Math.ceil(total / limit), totalRecords: total }
  );
});
```

## Real World Example
Platforms like GitHub, Stripe, and Twilio provide public REST APIs used by millions of developers worldwide. They follow strict URI versioning (`/v1/`, `/v2/`), consistent JSON error payloads, rate-limit headers (`X-RateLimit-Limit`), and bearer token authentication.

## Best Practices
1. **Use Plural Nouns for URIs**: `/api/v1/students` instead of `/api/v1/getStudent`.
2. **Version Your API**: Always prefix API endpoints with version numbers (`/api/v1/...`).
3. **Use Proper HTTP Verbs & Status Codes**: Never return `200 OK` with an error message string inside body payload.
4. **Implement Pagination & Filtering**: Always limit maximum query results returned in collection endpoints (`?limit=20&page=1`).

## Common Mistakes
- Using GET requests to perform state-changing mutations on the server.
- Exposing database internal schemas or unhandled stack traces in error responses.
- Inconsistent payload structure across different API endpoints in the same application.

## Interview Questions
1. **What are the key constraints of REST Architecture?**
   *Answer*: Client-Server separation, Statelessness, Cacheability, Uniform Interface, Layered System, and Code on Demand (optional).
2. **What is Idempotency in REST APIs?**
   *Answer*: An HTTP method is idempotent if executing it multiple times produces the exact same server state as executing it once. `GET`, `PUT`, `DELETE`, and `HEAD` are idempotent; `POST` is non-idempotent.
3. **What is the difference between PUT and PATCH?**
   *Answer*: `PUT` updates the target resource by replacing the entire document representation. `PATCH` updates only the specific fields included in the request payload.

## Practice Problems
1. Design a REST API resource schema and URI routing endpoints for an online bookstore.
2. Implement CORS headers in Express to restrict API access to trusted frontend origin domains.

## Assignment
Build a fully compliant REST API in Node.js/Express for an LMS Quiz module featuring endpoints for listing quizzes, fetching single quiz questions, submitting user responses, and calculating scores.

## Summary
REST APIs provide the primary communication bridge in full stack web architecture. Designing clean, stateless, resource-oriented endpoints with proper HTTP status codes ensures scalable integration.
