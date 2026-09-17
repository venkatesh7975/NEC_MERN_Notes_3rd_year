-- Run only in a disposable nec_practice database.
-- This standalone setup supplies every table and column used by transactions.sql.
CREATE TABLE IF NOT EXISTS lms_users (
  id INT PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL
);
CREATE TABLE IF NOT EXISTS lms_courses (
  id INT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  enrolled_count INT NOT NULL DEFAULT 0
);
CREATE TABLE IF NOT EXISTS lms_enrollments (
  student_id INT NOT NULL,
  course_id INT NOT NULL,
  enrolled_at DATETIME NOT NULL,
  PRIMARY KEY (student_id, course_id),
  FOREIGN KEY (student_id) REFERENCES lms_users(id),
  FOREIGN KEY (course_id) REFERENCES lms_courses(id)
);
CREATE TABLE IF NOT EXISTS lms_activity_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  action VARCHAR(100) NOT NULL,
  timestamp DATETIME NOT NULL,
  FOREIGN KEY (user_id) REFERENCES lms_users(id)
);
INSERT INTO lms_users(id, full_name) VALUES (101, 'Fictional learner');
INSERT INTO lms_courses(id, title, enrolled_count) VALUES (12, 'MERN practice', 0);
