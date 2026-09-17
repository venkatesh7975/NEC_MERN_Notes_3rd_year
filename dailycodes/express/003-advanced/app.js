// 003 Advanced Express Centralized Error Handler & Auth Middleware
const express = require('express');
const app = express();

app.use(express.json());

// INSECURE TEACHING SIMULATION: a caller can forge x-user-role.
// This demonstrates middleware ordering only. Never use it as real authentication.
// Real applications derive roles from a verified server-side identity.
// Simulated RBAC Authorization Middleware
const authorize = (role) => (req, res, next) => {
  const userRole = req.headers['x-user-role'];
  if (userRole !== role) {
    const error = new Error(`Forbidden: Role '${userRole || 'guest'}' does not have access`);
    error.statusCode = 403;
    return next(error);
  }
  next();
};

app.get('/api/admin/dashboard', authorize('admin'), (req, res) => {
  res.json({ success: true, message: 'Welcome Admin', revenue: '$45,200' });
});

// Centralized Error Handling Middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    error: { message: err.message, code: statusCode }
  });
});

if (require.main === module) {
  app.listen(5053, () => console.log('Advanced Express server active on 5053'));
}
