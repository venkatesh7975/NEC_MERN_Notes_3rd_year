// 002 Mongoose Populate & Pagination Helper Function
async function getPaginatedCourses(CourseModel, page = 1, limit = 10, category = null) {
  const query = category ? { category, isPublished: true } : { isPublished: true };

  const courses = await CourseModel.find(query)
    .populate('instructor', 'name email avatar')
    .select('title category price rating enrolledCount createdAt')
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .lean();

  const total = await CourseModel.countDocuments(query);

  return {
    courses,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalCourses: total
    }
  };
}

module.exports = getPaginatedCourses;
