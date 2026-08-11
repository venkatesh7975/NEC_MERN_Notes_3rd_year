# Comprehensive Authentication, JWT & Security Guide

## Introduction
Authentication verifies the identity of a user attempting to access a system, while Authorization determines what permissions and resources an authenticated user can access. In MERN stack applications, JSON Web Tokens (JWT), password hashing with `bcrypt`, and Role-Based Access Control (RBAC) form the standard security architecture.

## Why We Need It
Web applications process sensitive user data, private courses, payments, and instructor capabilities. Without robust authentication and authorization, unauthorized attackers could impersonate users, tamper with course materials, steal personal information, or compromise system data integrity.

## Syntax
```javascript
const jwt = require('jsonwebtoken');

// Generate JWT token
const token = jwt.sign(
  { id: user._id, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: '7d' }
);

// Verify JWT token
const decoded = jwt.verify(token, process.env.JWT_SECRET);
```

## Explanation
- **Password Hashing (`bcryptjs`)**: One-way salted cryptographic algorithm to safely store user passwords in databases.
- **JWT (JSON Web Token)**: Compact, URL-safe token format consisting of 3 parts separated by dots (`Header.Payload.Signature`).
- **Role-Based Access Control (RBAC)**: Middleware restricting specific routes based on user roles (`admin`, `instructor`, `student`).
- **HTTP-Only Cookies vs. Authorization Bearer Token**: Storing tokens in HTTP-Only cookies protects against Cross-Site Scripting (XSS) attacks.

## Example 1: JWT Protection & Role Authorization Middleware
```javascript
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect Routes Middleware
exports.protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, token missing' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Not authorized, invalid token' });
  }
};

// Authorize Roles Middleware
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        success: false, 
        message: `User role '${req.user.role}' is not authorized to access this resource` 
      });
    }
    next();
  };
};
```

## Example 2: Password Reset Token Flow
```javascript
const crypto = require('crypto');

// Generate and hash password reset token inside Mongoose User model
UserSchema.methods.getResetPasswordToken = function() {
  // Generate random token
  const resetToken = crypto.randomBytes(20).toString('hex');

  // Hash token and set to resetPasswordToken field
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // Set expire time (10 minutes)
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};
```

## Real World Example
Modern LMS platforms allow Students to view video lessons, Instructors to create and edit courses, and Admins to manage platform revenue, user bans, and global site settings. Express RBAC middleware checks `req.user.role` on every request before executing controller actions.

## Best Practices
1. **Never Store Plaintext Passwords**: Always hash passwords with bcrypt using a salt factor of 10+.
2. **Set Short Token Expiration**: Use short-lived Access Tokens (e.g. 15 mins) combined with Refresh Tokens stored securely.
3. **Use Environment Variables for Secret Keys**: Keep `JWT_SECRET` long, random, and out of source repositories.
4. **Enforce HTTPS**: Serve production applications over SSL/TLS to prevent packet sniffing of tokens.

## Common Mistakes
- Storing sensitive user passwords or credit card numbers inside JWT payload (JWT payloads are Base64 decoded easily).
- Omitting `select('-password')` when returning user documents from queries.
- Storing tokens in plain `localStorage` vulnerable to XSS script injection.

## Interview Questions
1. **Explain the structure of a JSON Web Token (JWT).**
   *Answer*: A JWT consists of 3 parts separated by dots: **Header** (algorithm & token type), **Payload** (claims such as user ID, role, expiration time), and **Signature** (hashed combination of header, payload, and secret key).
2. **What is the difference between Authentication and Authorization?**
   *Answer*: Authentication verifies *who* the user is (logging in with credentials). Authorization determines *what* resources or actions the authenticated user has permission to perform (roles/permissions).
3. **How do you defend against Cross-Site Request Forgery (CSRF) and Cross-Site Scripting (XSS)?**
   *Answer*: Prevent XSS by sanitizing user input and using HTTP-Only cookies. Prevent CSRF by using SameSite cookie flags, CORS configuration, and CSRF anti-forgery tokens.

## Practice Problems
1. Implement a password strength checker function in JS validating length, uppercase, lowercase, numbers, and special characters.
2. Build an Express middleware that checks if a user's account is verified (`isVerified === true`) before permitting access to premium course routes.

## Assignment
Construct a complete JWT Authentication API in Express featuring `/register`, `/login`, `/forgotpassword`, `/resetpassword/:token`, and `/me` routes with bcrypt hashing and input validation.

## Summary
Authentication and security form the protective foundation of full stack web engineering. Implementing JWT tokens, bcrypt password hashing, role-based authorization, and input sanitization guarantees safe user access.
