# MongoDB and supplementary Mongoose examples

[core-crud.js](core-crud.js) is a direct mongosh exercise using a disposable nec_practice database. It creates a unique code index, seeds/upserts two teaching records and updates HTML hours; expected CSS=14 and HTML=11. Run mongosh core-crud.js with your local sandbox connection.

The remaining files are Mongoose fragments:

- [schema](001-basic/schema.js): exports a lesson schema.
- [query](002-intermediate/query.js): helper needing a Course model and database connection.
- [aggregation](003-advanced/aggregation.js): helper needing seeded models; no standalone CLI.

Mongoose is an ODM, not MongoDB itself. [Core MongoDB](../../08-databases/mongodb/README.md); [supplementary Mongoose](../../11-supplementary/mongoose/README.md).
