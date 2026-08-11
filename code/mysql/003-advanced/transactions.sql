-- 003 Advanced MySQL Transaction & Enrollment Procedure

START TRANSACTION;

-- Step 1: Check course availability and insert enrollment record
INSERT INTO lms_enrollments (student_id, course_id, enrolled_at)
VALUES (101, 12, NOW());

-- Step 2: Increment enrolled counter on course record
UPDATE lms_courses 
SET enrolled_count = enrolled_count + 1 
WHERE id = 12;

-- Step 3: Log user activity transaction
INSERT INTO lms_activity_logs (user_id, action, timestamp)
VALUES (101, 'ENROLLED_IN_COURSE_12', NOW());

-- Commit all atomic steps successfully
COMMIT;
