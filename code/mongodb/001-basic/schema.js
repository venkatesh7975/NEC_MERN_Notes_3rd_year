// 001 Mongoose Basic Schema Example
const mongoose = require('mongoose');

const LessonSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  videoUrl: { type: String, required: true },
  durationMinutes: { type: Number, default: 10 },
  markdownNotes: { type: String },
  isFreePreview: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = LessonSchema;
