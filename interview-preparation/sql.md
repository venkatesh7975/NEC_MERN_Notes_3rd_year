# SQL interview preparation

## Explain the core idea

Question: Explain how SQL contributes to a web application.

Answer guide: A primary key identifies a row; a foreign key constrains a relationship. An inner join retains matches; a left join also keeps unmatched left records. COUNT(column) ignores NULL values, unlike COUNT(*). Parameter binding separates data values from SQL syntax. MySQL is the repository implementation; the syllabus says SQL generally.

## Predict an output

Question: Trace the [worked example](../08-databases/sql/notes.md) without running it.

Expected result: Run in a fresh MySQL session: A has 1 course, B has 0. Explain the input, operation and result, then introduce one boundary input and explain any required validation.

## Defend a project

Question: How did you satisfy group marks by course?

Answer criteria: cite the source implementation, demonstrate 0,100,null produce average 50, then show a failing input and explain its handling. Discuss one tradeoff and one limitation.
