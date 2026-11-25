# MySQL examples

- [Basic setup](001-basic/README.md): schema and fictional seeds.
- [Join queries](002-intermediate/queries.sql): run after the basic schema and seeds.
- [Transaction fixture](003-advanced/README.md): run its setup and transaction scripts once in a fresh database; a repeat run hits the enrollment primary key, and it does not provide a stored procedure.

Use the MySQL client against disposable data. Do not run the advanced setup over the basic example's differently shaped tables. [SQL learning path](../../08-databases/sql/README.md).
