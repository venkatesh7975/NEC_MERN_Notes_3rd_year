# SQL setup and fixtures

In a fresh disposable MySQL database, run schema.sql followed by seed.sql. The seed is intentionally single-run; repeating it fails on primary/unique keys. Then run ../002-intermediate/queries.sql.

Expected: the inner join returns HTML and CSS with Instructor A. The left-join aggregate includes Instructor A with 2 courses and average price 150, plus Instructor B with 0 courses and NULL average. The fake password_hash values are not valid credentials and must never be used for login.
