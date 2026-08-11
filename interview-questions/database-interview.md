# MongoDB & MySQL Database Interview Questions & Answers

### Q1: Compare SQL Relational vs NoSQL MongoDB.
**Answer**: SQL databases (MySQL) store structured data in fixed tables with foreign key constraints, ACID compliance, and SQL joins. MongoDB stores flexible BSON documents in collections, allowing schema flexibility and seamless scaling.

### Q2: What is Mongoose `.populate()` and how does it work under the hood?
**Answer**: `.populate()` replaces specified document `ObjectId` references with actual populated documents from another collection by executing secondary queries behind the scenes.

### Q3: What is the purpose of Database Indexing?
**Answer**: Indexing creates an optimized search data structure (e.g. B-Trees) for fast lookup of documents/rows without needing to perform expensive full-collection scans.
