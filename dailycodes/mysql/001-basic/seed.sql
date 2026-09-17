-- Run after schema.sql in a fresh disposable database; fictional data only.
-- password_hash values below are placeholders, NOT valid password hashes.
INSERT INTO lms_users(id, full_name, email, password_hash, role) VALUES
(1,'Fictional Instructor A','a@example.test','not-for-auth','instructor'),
(2,'Fictional Instructor B','b@example.test','not-for-auth','instructor'),
(3,'Fictional Student','student@example.test','not-for-auth','student');
INSERT INTO lms_courses(id,title,category,price,instructor_id) VALUES
(11,'HTML','frontend',100.00,1),(12,'CSS','frontend',200.00,1);
