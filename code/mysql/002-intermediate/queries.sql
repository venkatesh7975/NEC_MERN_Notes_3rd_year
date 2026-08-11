-- 002 Intermediate Multi-Table Join & Aggregation Queries

-- 1. Fetch course details with instructor names
SELECT 
  c.id AS course_id,
  c.title AS course_title,
  c.category,
  c.price,
  u.full_name AS instructor_name,
  u.email AS instructor_email
FROM lms_courses c
INNER JOIN lms_users u ON c.instructor_id = u.id;

-- 2. Count courses and calculate total potential revenue per instructor
SELECT 
  u.full_name AS instructor_name,
  COUNT(c.id) AS total_courses_created,
  AVG(c.price) AS average_course_price
FROM lms_users u
LEFT JOIN lms_courses c ON u.id = c.instructor_id
WHERE u.role = 'instructor'
GROUP BY u.id, u.full_name;
