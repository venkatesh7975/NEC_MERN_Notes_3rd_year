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
  const { title, instructor } = req.body || {};
  if (typeof title !== 'string' || !title.trim() || title.trim().length > 120 ||
      typeof instructor !== 'string' || !instructor.trim() || instructor.trim().length > 100 ||
      Object.keys(req.body || {}).some(key => !['title', 'instructor'].includes(key))) {
    return res.status(400).json({ success: false, error: 'Provide only title (1-120 characters) and instructor (1-100 characters).' });
  }
  const newCourse = { id: courses.length + 1, title: title.trim(), instructor: instructor.trim() };
  courses.push(newCourse);
  res.status(201).json({ success: true, data: newCourse });
});

if (require.main === module) {
  app.listen(5051, () => console.log('Basic Express API running on port 5051'));
}

module.exports = app;
