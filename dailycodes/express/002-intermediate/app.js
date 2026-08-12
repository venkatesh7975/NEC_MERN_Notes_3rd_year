// 002 Intermediate Express Router & Validation Middleware
const express = require('express');
const app = express();
const router = express.Router();

app.use(express.json());

// Custom Logger Middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next();
});

router.get('/', (req, res) => {
  res.json({ message: 'LMS API v1 Router Active' });
});

router.get('/search', (req, res) => {
  const { q } = req.query;
  res.json({ query: q || '', matches: [] });
});

app.use('/api/v1', router);

if (require.main === module) {
  app.listen(5052, () => console.log('Intermediate Express server active on 5052'));
}
