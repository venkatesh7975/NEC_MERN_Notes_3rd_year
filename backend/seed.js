const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Course = require('./models/Course');
const User = require('./models/User');

dotenv.config();

const sampleCourses = [
  {
    title: 'HTML5 & Modern Web Structure',
    slug: 'html5-modern-web-structure',
    category: 'HTML',
    description: 'Master HTML5 semantic elements, forms, accessibility, meta tags, and document architecture from absolute scratch.',
    level: 'Beginner',
    duration: '6 Hours',
    rating: 4.9,
    enrolledCount: 1420,
    lessons: [
      {
        title: 'Introduction to HTML5 & Document Anatomy',
        description: 'Understand how HTML tags construct document object model trees.',
        duration: '15 mins',
        markdownContent: '# HTML5 Starter Guide\n\nHTML5 is the backbone of web layout.\n\n```html\n<!DOCTYPE html>\n<html>\n<head>\n  <title>LMS Lesson</title>\n</head>\n<body>\n  <h1>Hello Web Developer!</h1>\n</body>\n</html>\n```',
        codeExample: '<!DOCTYPE html>\n<html>\n<head>\n  <title>HTML Lesson 1</title>\n</head>\n<body>\n  <h1>Welcome to HTML5</h1>\n</body>\n</html>',
        order: 1
      },
      {
        title: 'Semantic Tags & Accessibility (a11y)',
        description: 'Learn why `<header>`, `<nav>`, and `<main>` boost SEO and screen reader accessibility.',
        duration: '20 mins',
        markdownContent: '# Semantic HTML\n\nAlways wrap navigation in `<nav>` and main content in `<main>`.',
        codeExample: '<header>\n  <nav>\n    <a href="/">Home</a>\n  </nav>\n</header>',
        order: 2
      }
    ]
  },
  {
    title: 'CSS3 Flexbox, Grid & Responsive Design',
    slug: 'css3-flexbox-grid-responsive',
    category: 'CSS',
    description: 'Design beautiful, responsive, animated web layouts using CSS Flexbox, CSS Grid, animations, and dark mode.',
    level: 'Beginner',
    duration: '10 Hours',
    rating: 4.9,
    enrolledCount: 2310,
    lessons: [
      {
        title: 'CSS Flexbox Mastery',
        description: 'Master flex-direction, justify-content, and align-items.',
        duration: '25 mins',
        markdownContent: '# CSS Flexbox\n\n```css\n.container {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n```',
        codeExample: '.container { display: flex; justify-content: space-between; align-items: center; }',
        order: 1
      }
    ]
  },
  {
    title: 'JavaScript ES6+ Deep Dive',
    slug: 'javascript-es6-deep-dive',
    category: 'JavaScript',
    description: 'Master modern JavaScript features: Arrow functions, Promises, Async/Await, Array methods, Closures, and DOM API.',
    level: 'Intermediate',
    duration: '16 Hours',
    rating: 5.0,
    enrolledCount: 3890,
    lessons: [
      {
        title: 'Async/Await & Fetch API',
        description: 'Learn non-blocking asynchronous JavaScript execution.',
        duration: '30 mins',
        markdownContent: '# Async/Await\n\nHandle network promises elegantly without callback hell.',
        codeExample: 'async function fetchCourses() {\n  const res = await fetch("/api/courses");\n  const data = await res.json();\n  console.log(data);\n}',
        order: 1
      }
    ]
  },
  {
    title: 'React 19 & Modern UI Architecture',
    slug: 'react-19-modern-ui-architecture',
    category: 'ReactJS',
    description: 'Build fast, interactive single-page applications with React 19, custom hooks, Context API, and Framer Motion.',
    level: 'Intermediate',
    duration: '20 Hours',
    rating: 4.9,
    enrolledCount: 4120,
    lessons: [
      {
        title: 'React 19 State & Custom Hooks',
        description: 'Manage component lifecycle and encapsulate re-usable stateful logic.',
        duration: '35 mins',
        markdownContent: '# React 19 Hooks\n\n```jsx\nconst [count, setCount] = useState(0);\n```',
        codeExample: 'import React, { useState } from "react";\n\nexport default function Counter() {\n  const [count, setCount] = useState(0);\n  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;\n}',
        order: 1
      }
    ]
  },
  {
    title: 'Node.js & Express REST API Engineering',
    slug: 'nodejs-express-rest-api-engineering',
    category: 'NodeJS',
    description: 'Build scalable, secure RESTful microservices with Node.js, Express.js, JWT authentication, and middleware.',
    level: 'Advanced',
    duration: '18 Hours',
    rating: 4.8,
    enrolledCount: 2950,
    lessons: [
      {
        title: 'Building Express Middleware Chains',
        description: 'Master routing, request validation, and centralized error handling.',
        duration: '30 mins',
        markdownContent: '# Express Middleware\n\n```javascript\napp.use((req, res, next) => { console.log(req.url); next(); });\n```',
        codeExample: 'const express = require("express");\nconst app = express();\napp.get("/", (req, res) => res.json({ message: "API Server Online" }));',
        order: 1
      }
    ]
  },
  {
    title: 'MongoDB NoSQL & Aggregations',
    slug: 'mongodb-nosql-aggregations',
    category: 'MongoDB',
    description: 'Design flexible NoSQL database schemas, write Mongoose models, and craft high-performance aggregation pipelines.',
    level: 'Intermediate',
    duration: '12 Hours',
    rating: 4.9,
    enrolledCount: 1870,
    lessons: [
      {
        title: 'Mongoose Schemas & Population',
        description: 'Connect collections using ObjectIds and `.populate()`.',
        duration: '25 mins',
        markdownContent: '# Mongoose Models\n\nDefine schemas with strict data types and validators.',
        codeExample: 'const CourseSchema = new mongoose.Schema({ title: String });',
        order: 1
      }
    ]
  }
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mern_lms');
    console.log('[SEED] Connected to MongoDB...');

    await Course.deleteMany({});
    await User.deleteMany({});

    await Course.insertMany(sampleCourses);

    // Create default Demo Accounts
    await User.create({
      name: 'Student Demo',
      email: 'student@lms.com',
      password: 'password123',
      role: 'student'
    });

    await User.create({
      name: 'Instructor Demo',
      email: 'instructor@lms.com',
      password: 'password123',
      role: 'instructor'
    });

    await User.create({
      name: 'Admin Demo',
      email: 'admin@lms.com',
      password: 'password123',
      role: 'admin'
    });

    console.log('[SEED SUCCESS] Inserted sample courses and student/instructor/admin demo accounts!');
    process.exit();
  } catch (error) {
    console.error('[SEED ERROR]', error.message);
    process.exit(1);
  }
};

if (require.main === module) {
  seedData();
}
