# Comprehensive MySQL Relational Database Guide

## Introduction
MySQL is one of the world's most popular open-source Relational Database Management Systems (RDBMS). It uses Structured Query Language (SQL) to manage tables, relations, indexes, transactions, and relational data structures.

## Why We Need It
While NoSQL databases like MongoDB excel at flexible document storage, relational databases like MySQL excel at **strict schema enforcement, ACID compliance, complex multi-table joins, and transactional integrity**. Financial data, inventory management, and structured relational domains often require relational SQL databases.

## Syntax
```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  role ENUM('student', 'instructor', 'admin') DEFAULT 'student',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Explanation
- **Tables & Columns**: Data is stored in strict tables consisting of named columns with explicit data types (`INT`, `VARCHAR`, `TEXT`, `TIMESTAMP`).
- **Primary Key**: Unique identifier for each row in a table.
- **Foreign Key**: Column referencing the primary key of another table to establish relationships (`1:1`, `1:N`, `N:M`).
- **SQL Joins (`INNER JOIN`, `LEFT JOIN`)**: Operation to query combined data across related tables based on foreign key links.
- **ACID Compliance**: Atomicity, Consistency, Isolation, and Durability guarantee reliable database transaction processing.

## Example 1: Creating Relational Tables with Foreign Keys
```sql
-- Courses Table
CREATE TABLE courses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  instructor_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (instructor_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Enrollments Table (Junction table for N:M relationship)
CREATE TABLE enrollments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT NOT NULL,
  course_id INT NOT NULL,
  enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  progress INT DEFAULT 0,
  FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
  UNIQUE(student_id, course_id)
);
```

## Example 2: Complex SQL Queries & Joins
```sql
-- Fetch all enrolled courses for a student with instructor details
SELECT 
  e.id AS enrollment_id,
  u_student.name AS student_name,
  c.title AS course_title,
  c.category,
  u_instructor.name AS instructor_name,
  e.progress
FROM enrollments e
INNER JOIN users u_student ON e.student_id = u_student.id
INNER JOIN courses c ON e.course_id = c.id
INNER JOIN users u_instructor ON c.instructor_id = u_instructor.id
WHERE e.student_id = 1;
```

## Real World Example
Enterprise banking platforms, payment gateways, and e-commerce platforms use relational databases like MySQL or PostgreSQL because transactions (e.g. transferring money from account A to account B) must either completely succeed or completely roll back, ensuring zero financial discrepancy.

## Best Practices
1. **Normalize Schemas (1NF, 2NF, 3NF)**: Avoid redundant data storage by splitting data into dedicated relational tables.
2. **Use Prepared Statements**: Prevent SQL Injection attacks by binding parameters (`SELECT * FROM users WHERE email = ?`).
3. **Index Foreign Keys & Search Columns**: Add indexes (`CREATE INDEX idx_email ON users(email);`) for fast lookup speed.
4. **Use Transactions (`START TRANSACTION`, `COMMIT`, `ROLLBACK`)**: Enforce data integrity during multi-step database operations.

## Common Mistakes
- Executing string concatenation in raw SQL queries (`"WHERE name = '" + input + "'"`), exposing the database to SQL Injection vulnerabilities.
- Forgetting `FOREIGN KEY` constraints, leading to orphaned records when parent records are deleted.
- Executing N+1 query patterns instead of single optimized `JOIN` queries.

## Interview Questions
1. **What is the difference between `INNER JOIN`, `LEFT JOIN`, and `RIGHT JOIN`?**
   *Answer*: `INNER JOIN` returns matching rows in both tables. `LEFT JOIN` returns all rows from the left table and matched rows from the right table. `RIGHT JOIN` returns all rows from the right table and matched rows from the left table.
2. **What are ACID properties in database management?**
   *Answer*: **Atomicity** (all or nothing), **Consistency** (data satisfies all rules), **Isolation** (concurrent transactions don't interfere), and **Durability** (committed changes persist even after system crash).
3. **What is Database Normalization?**
   *Answer*: The process of organizing data attributes and tables to minimize redundancy and dependency by dividing large tables into smaller related tables.

## Practice Problems
1. Write a SQL query to count total enrolled students per course and order results by course title.
2. Write a SQL transaction statement that transfers 50 reward points from student A to student B.

## Assignment
Design a complete MySQL database schema for an online learning platform consisting of `users`, `courses`, `lessons`, `quizzes`, `submissions`, and `certificates` tables with full foreign key constraints.

## Summary
MySQL provides relational integrity, strict schema enforcement, and robust SQL querying capabilities. Understanding SQL syntax, normalization, foreign keys, and joins is an indispensable skill for full stack software engineers.
