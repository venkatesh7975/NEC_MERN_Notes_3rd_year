// 003 MongoDB Aggregation Pipeline for Platform Statistics
async function computePlatformMetrics(CourseModel, SubmissionModel) {
  const courseMetrics = await CourseModel.aggregate([
    { $match: { isPublished: true } },
    {
      $group: {
        _id: '$category',
        totalCategoryCourses: { $sum: 1 },
        totalStudents: { $sum: '$enrolledCount' },
        averageCategoryRating: { $avg: '$rating' },
        estimatedRevenue: { $sum: { $multiply: ['$price', '$enrolledCount'] } }
      }
    },
    { $sort: { estimatedRevenue: -1 } }
  ]);

  return courseMetrics;
}

module.exports = computePlatformMetrics;
