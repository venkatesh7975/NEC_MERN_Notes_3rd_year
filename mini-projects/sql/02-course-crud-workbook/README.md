# Course CRUD workbook

ID: SQL-02. Status: specification ready; solution not supplied.

## Difficulty

🟢 Beginner. Estimated time: 1–2 hours. Industry exercises emphasize a reproducible handoff; they are not production certifications.

## Technology

MySQL, SQL.

## Prerequisites

Records and basic data types. Read [the learning path](../../../08-databases/sql/README.md) first.

## Learning Objectives

Apply sql versus nosql, crud, keys, joins to implement course crud workbook. Explain the acceptance example from input to result.

## Problem Statement

Build course crud workbook for a fictional college environment. Perform create read update delete by key; preserve unrelated rows.

## Features

- Perform create read update delete by key.
- preserve unrelated rows.

## Functional Requirements

1. FR-1: Perform create read update delete by key. Demonstrate with a reproducible fixture.
2. FR-2: preserve unrelated rows. Demonstrate with a reproducible fixture.

## Technical Requirements

Use MySQL, SQL. Keep the main operation separate from presentation. Record exact dependency versions. Aligned to official module 8; advanced features extend the core syllabus and need independent practice time.

## UI Requirements

No graphical UI is required. Supply labeled terminal results, HTTP transcripts or a readable report.

## API Requirements

No new public API is required unless a route is explicitly named in the features.

## Database Requirements

Use fictional seed records in a disposable database. Document keys, required fields and relationships. Test state before and after changes and handle duplicate/conflicting writes.

## Validation Requirements

Enforce the types, bounds and state rules in each FR. Distinguish valid, missing and malformed inputs. A rejected mutation must not silently change state.

## Expected Input

Prepare the fixture and interaction needed for this scenario: Updating course 1 leaves course 2 unchanged.

## Expected Output

Updating course 1 leaves course 2 unchanged. Record actual results beside this expectation.

## Edge Cases

Test empty/missing data, the boundary implied by each FR, and repeated execution or interaction. Test duplicate identifiers and an interrupted write.

## Folder Structure

Supplied: README.md, requirements.md, task.md. Student deliverables: solution/ for source and its run README; evidence/ for actual checks; references.md for attribution. Screenshots are optional evidence, not a replacement for source. Empty solution directories are not supplied.

## How to Run

Create schema.sql, seed.sql and queries.sql. In a fresh MySQL database nec_practice run them in that order using the client's source command.

See [development setup](../../../00-course-overview/development-setup.md). These instructions define the student submission contract; the project is not runnable until its solution is authored.

## Testing Checklist

- [ ] Each FR has a passing evidence row.
- [ ] The expected output matches the actual result.
- [ ] Missing, boundary and repeated-use cases behave as documented.
- [ ] A peer reproduces the result from a fresh checkout.
- [ ] Failures and limitations are reported honestly.

## Learning Outcomes

Demonstrate the main operation, explain the data flow, and diagnose a failed case. Defend why MySQL, SQL suits the requirements.

## Extension Challenges

Add a contrasting fixture for the main operation: perform create read update delete by key. For an industry exercise, write a recovery and handoff note identifying operational limits.

## Interview Questions

1. Explain the main operation in your implementation.
2. Which boundary could invalidate the expected result and how did you test it?
3. What changes with more users or more records?

See [topic answers](../../../interview-preparation/sql.md).

## Resources

[Reference notes](../../../notes/mysql.md); [acceptance table](requirements.md); [student sequence](task.md).
