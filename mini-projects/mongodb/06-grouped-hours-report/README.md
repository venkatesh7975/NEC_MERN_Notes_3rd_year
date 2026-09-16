# Grouped hours report

ID: MONGODB-06. Status: specification ready; solution not supplied.

## Difficulty

🟡 Intermediate. Estimated time: 3–4 hours. Industry exercises emphasize a reproducible handoff; they are not production certifications.

## Technology

MongoDB, mongosh.

## Prerequisites

Data records and SQL comparison. Read [the learning path](../../../08-databases/mongodb/README.md) first.

## Learning Objectives

Apply documents, collections, crud, modeling to implement grouped hours report. Explain the acceptance example from input to result.

## Problem Statement

Build grouped hours report for a fictional college environment. Aggregate hours by category; distinguish no matches.

## Features

- Aggregate hours by category.
- distinguish no matches.

## Functional Requirements

1. FR-1: Aggregate hours by category. Demonstrate with a reproducible fixture.
2. FR-2: distinguish no matches. Demonstrate with a reproducible fixture.

## Technical Requirements

Use MongoDB, mongosh. Keep the main operation separate from presentation. Record exact dependency versions. Aligned to official module 8; advanced features extend the core syllabus and need independent practice time.

## UI Requirements

No graphical UI is required. Supply labeled terminal results, HTTP transcripts or a readable report.

## API Requirements

No new public API is required unless a route is explicitly named in the features.

## Database Requirements

Use fictional seed records in a disposable database. Document keys, required fields and relationships. Test state before and after changes and handle duplicate/conflicting writes.

## Validation Requirements

Enforce the types, bounds and state rules in each FR. Distinguish valid, missing and malformed inputs. A rejected mutation must not silently change state.

## Expected Input

Prepare the fixture and interaction needed for this scenario: 10 and 14 frontend hours aggregate to 24.

## Expected Output

10 and 14 frontend hours aggregate to 24. Record actual results beside this expectation.

## Edge Cases

Test empty/missing data, the boundary implied by each FR, and repeated execution or interaction. Test duplicate identifiers and an interrupted write.

## Folder Structure

Supplied: README.md, requirements.md, task.md. Student deliverables: solution/ for source and its run README; evidence/ for actual checks; references.md for attribution. Screenshots are optional evidence, not a replacement for source. Empty solution directories are not supplied.

## How to Run

Use mongosh with a disposable nec_practice database. Create and load seed.js, then queries.js; record results before and after writes.

See [development setup](../../../00-course-overview/development-setup.md). These instructions define the student submission contract; the project is not runnable until its solution is authored.

## Testing Checklist

- [ ] Each FR has a passing evidence row.
- [ ] The expected output matches the actual result.
- [ ] Missing, boundary and repeated-use cases behave as documented.
- [ ] A peer reproduces the result from a fresh checkout.
- [ ] Failures and limitations are reported honestly.

## Learning Outcomes

Demonstrate the main operation, explain the data flow, and diagnose a failed case. Defend why MongoDB, mongosh suits the requirements.

## Extension Challenges

Add a contrasting fixture for the main operation: aggregate hours by category. For an industry exercise, write a recovery and handoff note identifying operational limits.

## Interview Questions

1. Explain the main operation in your implementation.
2. Which boundary could invalidate the expected result and how did you test it?
3. What changes with more users or more records?

See [topic answers](../../../interview-preparation/mongodb.md).

## Resources

[Reference notes](../../../notes/mongodb.md); [acceptance table](requirements.md); [student sequence](task.md).
