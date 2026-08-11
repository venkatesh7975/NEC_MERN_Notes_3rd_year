const express = require('express');
const router = express.Router();
const { getCourses, getCourseBySlug, createCourse } = require('../controllers/courseController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', getCourses);
router.get('/:identifier', getCourseBySlug);
router.post('/', protect, authorize('instructor', 'admin'), createCourse);

module.exports = router;
