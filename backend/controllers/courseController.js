const Course = require('../models/Course');

// Get All Courses (with search & category filter)
exports.getCourses = async (req, res) => {
  try {
    const { category, search, level } = req.query;
    let query = { isPublished: true };

    if (category) query.category = category;
    if (level) query.level = level;
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    const courses = await Course.find(query);
    res.json({ success: true, count: courses.length, data: courses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Single Course by Slug or ID
exports.getCourseBySlug = async (req, res) => {
  try {
    const course = await Course.findOne({ 
      $or: [{ slug: req.params.identifier }, { _id: req.params.identifier }]
    });

    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    res.json({ success: true, data: course });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create New Course (Instructor/Admin)
exports.createCourse = async (req, res) => {
  try {
    const newCourse = await Course.create(req.body);
    res.status(201).json({ success: true, data: newCourse });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
