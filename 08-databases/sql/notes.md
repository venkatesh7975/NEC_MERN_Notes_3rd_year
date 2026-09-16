# SQL teaching notes

## What and why

A primary key identifies a row; a foreign key constrains a relationship. An inner join retains matches; a left join also keeps unmatched left records. COUNT(column) ignores NULL values, unlike COUNT(*). Parameter binding separates data values from SQL syntax. MySQL is the repository implementation; the syllabus says SQL generally.

## Prerequisites

Records and basic data types. Concepts: SQL versus NoSQL, CRUD, keys, joins.

## How and syntax

```sql
CREATE TEMPORARY TABLE instructor(id INT PRIMARY KEY, name VARCHAR(40));
CREATE TEMPORARY TABLE course(id INT PRIMARY KEY, instructor_id INT);
INSERT INTO instructor VALUES(1,'A'),(2,'B');
INSERT INTO course VALUES(10,1);
SELECT i.name, COUNT(c.id) FROM instructor i LEFT JOIN course c ON c.instructor_id=i.id GROUP BY i.id,i.name ORDER BY i.id;
```

Run context and expected output: Run in a fresh MySQL session: A has 1 course, B has 0.

## Trace the example

Identify where input enters, which operation controls the result and how output becomes observable. Predict the result before executing. Change one value, repeat, and explain the difference. For malformed input, record whether the example handles it or whether a guard must be added; do not assume a short demonstration is a complete application.

## When to use

Use these concepts for student roster table: Define primary key; seed three fictional students; query by ID. Start with a single fixture and increase complexity after the expected result is visible.

## When not to use

Choose the smallest architecture meeting requirements. Do not add a database for a static document, or use browser-only state for shared private records. Do not introduce advanced libraries before you can explain the equivalent core operation. Advanced exercises in the project bank extend core coverage and belong in independent practice.

## Real-world use case

Marks aggregate report: Group marks by course; distinguish NULL and zero; compute average. Expected result: 0,100,NULL produce average 50.

## Common mistakes

- Running the example in the wrong environment: Run in a fresh MySQL session: A has 1 course, B has 0.
- Treating one successful input as proof of correctness. Add a missing case and a boundary case.
- Copying a fragment without its data or host application; consult the setup guide.
- Confusing a project specification or demonstration with a completed student submission.

## Best practices

Make assumptions explicit. Keep fixtures small and fictional. Separate input validation from the central operation. Name values by their role. Verify the result after every small change. In class, ask learners to predict, run and explain rather than copy output. During debugging, find the first point where actual behavior diverges from the expected result.

## Practice

1. Reproduce the worked example and its expected output.
2. Implement define primary key.
3. Add perform create read update delete by key.
4. Describe and test the acceptance example: Duplicate enrollment pair is rejected.

## Interview preparation

[Questions and answer guidance](../../interview-preparation/sql.md).

## Further examples and reference

[Existing topic guide](../../notes/mysql.md); [daily practice](../../daily-practice/sql/README.md); [official documentation](../../resources/teaching-references.md).
