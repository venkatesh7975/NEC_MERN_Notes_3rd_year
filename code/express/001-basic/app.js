// 001 Basic Express API
const express = require('express');
const app = express();

app.use(express.json());

const courses = [
  { id: 1, title: 'HTML5 & CSS3 Mastery', instructor: 'Dr. Jane' },
  { id: 2, title: 'Full Stack MERN', instructor: 'Prof. Alex' }
];

app.get('/api/courses', (req, res) => {
  res.json({ success: true, count: courses.length, data: courses });
});

app.post('/api/courses', (req, res) => {
  const newCourse = { id: courses.length + 1, ...req.body };
  courses.push(newCourse);
  res.status(201).json({ success: true, data: newCourse });
});

if (require.main === module) {
  app.listen(5051, () => console.log('Basic Express API running on port 5051'));
}

module.exports = app;
