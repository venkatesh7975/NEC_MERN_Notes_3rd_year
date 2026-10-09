<!-- kb-metadata: {"conceptIds": ["sql--fundamentals", "sql--mysql", "sql--postgresql", "sql--crud", "sql--joins", "sql--subqueries", "sql--cte", "sql--window-functions", "sql--indexes", "sql--transactions", "sql--constraints", "sql--normalization", "sql--query-optimization"], "difficulty": "Intermediate", "estimatedMinutes": 120, "id": "sql", "importance": 4, "lastVerified": "2026-10-08", "legacyPaths": ["notes/mysql.md", "08-databases/sql/notes.md"], "path": "knowledge-base/topics/sql.md", "prerequisites": ["api"], "priority": "P1", "related": ["mongodb", "system-design"], "status": "authored-guide", "title": "Relational modeling, SQL queries, and transactions"} -->
# Relational modeling, SQL queries, and transactions

Priority: P1 — ⭐ Highly Important

Difficulty: Intermediate

Importance: 4/5

Prerequisites: [REST contracts, GraphQL, and API evolution](api.md)

Estimated learning time: 120 minutes for explanation and initial practice; independent mastery takes repeated application.

[Knowledge base](../README.md) · [Coverage](../COVERAGE.md) · [Learning paths](../paths/README.md)

## 🎯 Learning Objectives

Explain the mental model, trace the worked example, reproduce a failure, and demonstrate the acceptance checks in the mini-project. Individual concepts below have their own priorities and depth labels.

## 🧠 What Is It?

Relational data is represented through relations with explicit columns and constraints; SQL expresses operations over these sets.

## Concept reference and priorities

<a id="fundamentals"></a>
### Fundamentals

**P1 · ⭐ Highly Important · reference**

Relational data is represented through relations with explicit columns and constraints; SQL expresses operations over these sets.

<a id="mysql"></a>
### MySQL

**P2 · 📚 Useful · reference**

MySQL is a relational database with engine and version-specific capabilities; select the actual documentation and isolation contract.

<a id="postgresql"></a>
### PostgreSQL

**P1 · ⭐ Highly Important · reference**

PostgreSQL supports relational queries, constraints, transactions, and additional types; syntax can differ from MySQL.

<a id="crud"></a>
### CRUD

**P1 · ⭐ Highly Important · worked-example**

Insert, select, update, and delete should use parameters and enforce caller scope.

<a id="joins"></a>
### Joins

**P1 · ⭐ Highly Important · reference**

Joins combine rows according to predicates; one-to-many relationships can multiply rows.

<a id="subqueries"></a>
### Subqueries

**P2 · 📚 Useful · reference**

Subqueries supply values or relations to another query; correlated work and plans can affect performance.

<a id="cte"></a>
### CTE

**P2 · 📚 Useful · reference**

A common table expression names a query result within a statement; optimization behavior is database-dependent.

<a id="window-functions"></a>
### Window functions

**P2 · 📚 Useful · reference**

Window functions calculate across related rows while retaining individual rows, such as rank or running totals.

<a id="indexes"></a>
### Indexes

**P1 · ⭐ Highly Important · reference**

Indexes accelerate selected lookups and ordering while adding write and storage cost.

<a id="transactions"></a>
### Transactions

**P1 · ⭐ Highly Important · reference**

Transactions group operations with defined isolation behavior; atomicity does not mean all concurrent anomalies disappear.

<a id="constraints"></a>
### Constraints

**P1 · ⭐ Highly Important · worked-example**

Primary keys, unique, foreign keys, not-null, and check constraints protect selected invariants in the database.

<a id="normalization"></a>
### Normalization

**P1 · ⭐ Highly Important · reference**

Normalization reduces problematic redundancy; deliberate denormalization needs update and consistency rules.

<a id="query-optimization"></a>
### Query optimization

**P2 · 📚 Useful · reference**

Inspect explain plans with representative cardinality, predicates, ordering, and constraints.

## ❓ Why Does It Exist?

A schema can make invalid relationships impossible to store, while joins answer questions spanning entities. SQL and document databases both require good modeling and explicit concurrency rules.

## ⚙️ How Does It Work?

Start from entities and invariants, then define keys and constraints before adding query code. Use parameterized statements with a driver; placeholders vary across databases. A join can produce several rows per parent, so aggregating after the join must account for multiplicity. Isolation levels determine which concurrent observations are permitted; retries may be required for serialization failures.

## 💻 Examples

### 1. Trace the contract

```sql
CREATE TABLE expenses (
  id BIGINT PRIMARY KEY,
  owner_id BIGINT NOT NULL,
  amount_cents BIGINT NOT NULL CHECK (amount_cents > 0)
);
INSERT INTO expenses VALUES (1, 10, 1234), (2, 10, 100);
SELECT owner_id, SUM(amount_cents) AS total_cents
FROM expenses GROUP BY owner_id;
```

Expected behavior and runtime: On a compatible relational engine, owner 10 has total_cents 1334. This is a disposable schema example, not a migration for the existing MongoDB workspace. Check the target engine's constraint support and integer range.

### 2. Extend and stress the contract

Intermediate: compare inner and left joins using a parent with no children. Advanced: compute a running total with a window function and explicit order. Record the expected result before implementation; use the failure analysis below to distinguish the broken boundary.

## 🔍 Under the Hood

Query planners choose access paths using available statistics and indexes. Foreign keys protect relationships but do not automatically authorize a query. MongoDB also supports validation and transactions; database selection should follow data and workload requirements rather than simplistic SQL-versus-NoSQL claims.

## 🌍 Real-World Usage

Model a job portal with applicants, jobs, and applications. Enforce unique applicant/job application pairs and scope queries to the caller.

## ⚠️ Common Mistakes

- Interpolating a request value into SQL text.
- Summing parent amounts after a one-to-many join without accounting for duplicates.
- Assuming a transaction uses the same isolation rules on every engine.

## ✅ Best Practices

Model a job portal with applicants, jobs, and applications. Enforce unique applicant/job application pairs and scope queries to the caller. State the invariant, validate at the boundary, use the documented runtime, and keep a reproducible failure case. This guide is educational evidence; it does not certify a deployment.

## 🧪 Practice

- Beginner: write select and update with an owner condition.
- Intermediate: compare inner and left joins using a parent with no children.
- Advanced: compute a running total with a window function and explicit order.
- Challenge: reproduce and document a concurrency anomaly at the chosen isolation level.

## 🏗️ Mini Project

Create a relational adapter for expense reporting with schema, parameterized queries, constraints, explain evidence, and migration rollback planning.

[Project ladder and implementation status](../projects/README.md)

## 💼 Interview Questions

<details>
<summary>Beginner: What does a foreign key establish?</summary>

A permitted relationship to referenced rows, subject to configured rules.

</details>

<details>
<summary>Intermediate: Why can a join duplicate a total?</summary>

A parent is repeated for each matching child; aggregate at the intended grain.

</details>

<details>
<summary>Advanced: Does ACID promise no application bugs?</summary>

No. Domain invariants, isolation choices, and retry behavior still need correct design.

</details>

<details>
<summary>Scenario: A balance check passes twice concurrently.</summary>

Use a conditional update or suitable transaction/locking design, then test the real engine.

</details>

<details>
<summary>Debugging: A query is slow despite an index.</summary>

Inspect the actual plan, selectivity, ordering, statistics, and returned cardinality.

</details>

<details>
<summary>Output-based: What does the worked example produce, and under which runtime?</summary>

On a compatible relational engine, owner 10 has total_cents 1334. This is a disposable schema example, not a migration for the existing MongoDB workspace. Check the target engine's constraint support and integer range.

</details>

<details>
<summary>Coding: What would you implement and verify next?</summary>

Create a relational adapter for expense reporting with schema, parameterized queries, constraints, explain evidence, and migration rollback planning.

</details>

<details>
<summary>Architecture and production: Which internal boundary needs evidence?</summary>

Query planners choose access paths using available statistics and indexes. Foreign keys protect relationships but do not automatically authorize a query. MongoDB also supports validation and transactions; database selection should follow data and workload requirements rather than simplistic SQL-versus-NoSQL claims.

</details>

[Difficulty-based interview bank](../../interview-handbook/questions/index.md) · [Scenario practice](../../interview-handbook/scenarios/README.md) · [Debugging library](../debugging/README.md)

## 🔗 Related Concepts

[MongoDB modeling, querying, and persisted invariants](mongodb.md), [System design, consistency, and failure tradeoffs](system-design.md)

Next: [MongoDB modeling, querying, and persisted invariants](mongodb.md)

Preserved lessons: [notes/mysql.md](../../notes/mysql.md), [08-databases/sql/notes.md](../../08-databases/sql/notes.md)

# 📚 External Resources

## 🥇 Official Documentation

[Primary documentation](https://www.postgresql.org/docs/current/) — authoritative reference; use the installed runtime/library version.

## 📘 Recommended Articles

[Focused guide](https://dev.mysql.com/doc/refman/8.4/en/) — deepen the mental model and compare its examples with this guide.

## 🎥 Recommended YouTube Videos

See the [verified media register](../resources/VIDEOS.md). A topic without a verified topical video uses written official documentation; unverified recommendations are not padded into this section.

## 🧪 Practice Resources

[Local project ladder](../projects/README.md) · [Timed exercises](../../interview-handbook/machine-coding/README.md)

## 📚 Further Reading

[Curated external register](../resources/README.md) — authority, level, best use, last check, and retrieval limitations.

## 🔄 Last Verified

2026-10-08 — documentation reviewed; example runtime and execution scope are stated above.
