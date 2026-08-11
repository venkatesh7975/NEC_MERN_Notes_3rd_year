# Comprehensive MongoDB & Mongoose Database Guide

## Introduction
MongoDB is a leading document-based NoSQL database designed for high availability, scalability, and performance. Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js that provides a schema-based solution to model application data.

## Why We Need It
Relational databases enforce rigid tabular schemas with fixed columns. MongoDB stores data as flexible BSON (Binary JSON) documents. This schema flexibility aligns perfectly with JavaScript object structures in MERN stack applications, enabling rapid iteration, complex nested document structures, and horizontal scaling (sharding).

## Syntax
```javascript
const mongoose = require('mongoose');

// Define Schema
const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  price: { type: Number, default: 0 },
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  published: { type: Boolean, default: false }
}, { timestamps: true });

// Compile Model
const Course = mongoose.model('Course', CourseSchema);
```

## Explanation
- **Document & Collection**: Documents are individual JSON-like records; Collections are groupings of related documents (equivalent to tables in SQL).
- **Schema & Model**: Schemas define data structure, defaults, and validation; Models provide the interface for querying database documents.
- **`ObjectId` & `ref`**: References to documents in other collections (similar to foreign keys).
- **Population (`.populate()`)**: Replaces referenced ObjectIds in a document with actual documents from referenced collections.
- **Aggregation Pipeline (`.aggregate()`)**: Framework for data transformation, filtering, grouping, and analytics.

## Example 1: Mongoose Schema with Validation & Hooks
```javascript
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Name is required'] },
  email: { 
    type: String, 
    required: [true, 'Email is required'],
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email']
  },
  password: { type: String, required: true, minlength: 6, select: false },
  role: { type: String, enum: ['student', 'instructor', 'admin'], default: 'student' }
}, { timestamps: true });

// Pre-save hook to hash password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare entered password with hashed password
UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
```

## Example 2: MongoDB Aggregation Pipeline for LMS Analytics
```javascript
const Course = require('./models/Course');

async function getCourseStats() {
  const stats = await Course.aggregate([
    // Match only published courses
    { $match: { isPublished: true } },
    // Group by category and compute stats
    {
      $group: {
        _id: '$category',
        totalCourses: { $sum: 1 },
        averageRating: { $avg: '$rating' },
        totalStudentsEnrolled: { $sum: '$enrolledCount' }
      }
    },
    // Sort by total students enrolled descending
    { $sort: { totalStudentsEnrolled: -1 } }
  ]);

  return stats;
}
```

## Real World Example
Modern platforms like LMS systems, social networks, and content management systems use MongoDB to store user profiles, course structures, video lesson timestamps, quizzes, and student submissions within single flexible documents, reducing complex multi-table joins.

## Best Practices
1. **Index Frequently Queried Fields**: Add indexes (`UserSchema.index({ email: 1 })`) to speed up query execution.
2. **Handle Connection Lifecycle**: Reuse Mongoose connection instances globally instead of opening connections per API request.
3. **Use Projection (`select()`)**: Return only required fields from queries to minimize network payload size.
4. **Use Transactions for Multi-Document Mutations**: Ensure atomic operations across multiple collections using MongoDB sessions.

## Common Mistakes
- Storing unbounded growing arrays inside a single document (document size cap is 16MB).
- Omitting indexes on foreign key reference fields (`courseId`, `userId`), leading to slow `.populate()` execution.
- Fetching entire documents when only counting documents (use `.countDocuments()` instead of `.find().length`).

## Interview Questions
1. **What is the difference between SQL relational databases and MongoDB NoSQL database?**
   *Answer*: SQL databases use rigid tables, schemas, and SQL joins. MongoDB uses dynamic BSON documents, collections, embedded sub-documents, and handles horizontal scaling out of the box.
2. **How does `.populate()` work in Mongoose?**
   *Answer*: `.populate()` performs a second query behind the scenes to fetch documents matching referenced `ObjectId`s from another collection and replaces the `ObjectId` with the fetched document.
3. **What are MongoDB Indexes and why are they crucial?**
   *Answer*: Indexes store a small portion of the collection's data set in an easily traversable BSON tree structure. Without indexes, MongoDB must perform a collection scan (scanning every document) to find matching results.

## Practice Problems
1. Write a Mongoose query to search courses by title using a case-insensitive regex pattern.
2. Design a Mongoose schema for a Quiz containing an array of multiple-choice questions with answer choices and correct option indexes.

## Assignment
Implement a full Mongoose model layer for an LMS platform consisting of `User`, `Course`, `Lesson`, `Submission`, and `Certificate` schemas with proper references and cascade deletion logic.

## Summary
MongoDB and Mongoose provide a flexible, scalable, and intuitive database foundation for Node.js backend applications. Designing clear schemas, indexing query keys, and writing efficient aggregations are critical skills.
