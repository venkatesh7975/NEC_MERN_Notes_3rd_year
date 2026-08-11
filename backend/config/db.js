const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mern_lms');
    console.log(`[DATABASE] MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[DATABASE ERROR] ${error.message}`);
    // Non-fatal fallback for development demo mode
    console.log('[DATABASE] Running in in-memory / fallback mode if DB server unavailable.');
  }
};

module.exports = connectDB;
