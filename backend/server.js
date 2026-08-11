const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');

dotenv.config();

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1/auth', require('./routes/authRoutes'));
app.use('/api/v1/courses', require('./routes/courseRoutes'));

// Root Status Endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '🎓 MERN LMS REST API Server Active',
    version: '1.0.0',
    documentation: '/api/v1/courses'
  });
});

// Centralized Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(`[SERVER ERROR] ${err.stack}`);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`[SERVER] Express API running on http://localhost:${PORT}`);
});
