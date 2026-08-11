// 001 Basic JavaScript ES6+ Example
const courses = [
  { id: 1, title: 'HTML5 & CSS3 Fundamentals', category: 'frontend', duration: 15 },
  { id: 2, title: 'JavaScript ES6+ Deep Dive', category: 'frontend', duration: 25 },
  { id: 3, title: 'Node.js & Express REST API', category: 'backend', duration: 30 }
];

console.log('=== MERN LMS Basic JavaScript Example ===');

// 1. Filter backend courses
const backendCourses = courses.filter(c => c.category === 'backend');
console.log('Backend Courses:', backendCourses);

// 2. Map titles
const courseTitles = courses.map(c => `${c.title} (${c.duration} hrs)`);
console.log('Course Titles:', courseTitles);

// 3. Calculate total learning hours
const totalHours = courses.reduce((sum, c) => sum + c.duration, 0);
console.log(`Total Curriculum Duration: ${totalHours} hours`);
