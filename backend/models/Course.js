const mongoose = require('mongoose');

const LessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  videoUrl: { type: String },
  duration: { type: String, default: '15 mins' },
  markdownContent: { type: String },
  codeExample: { type: String },
  order: { type: Number, default: 1 }
});

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { 
    type: String, 
    required: true,
    enum: ['HTML', 'CSS', 'JavaScript', 'ReactJS', 'NodeJS', 'ExpressJS', 'MongoDB', 'MySQL', 'Git', 'REST API', 'Authentication', 'Deployment', 'Docker']
  },
  description: { type: String, required: true },
  instructor: { type: String, default: 'MERN LMS Master Instructor' },
  thumbnail: { type: String, default: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600' },
  level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' },
  duration: { type: String, default: '10 Hours' },
  rating: { type: Number, default: 4.8 },
  enrolledCount: { type: Number, default: 0 },
  isPublished: { type: Boolean, default: true },
  lessons: [LessonSchema]
}, { timestamps: true });

module.exports = mongoose.model('Course', CourseSchema);
