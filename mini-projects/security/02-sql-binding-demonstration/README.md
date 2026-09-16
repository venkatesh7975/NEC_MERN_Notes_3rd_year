# SQL binding demonstration

ID: SECURITY-02. Status: specification ready; solution not supplied.

## Difficulty

🟢 Beginner. Estimated time: 1–2 hours. Industry exercises emphasize a reproducible handoff; they are not production certifications.

## Technology

JavaScript, HTTP, SQL.

## Prerequisites

Forms, HTTP and databases. Read [the learning path](../../../10-security/README.md) first.

## Learning Objectives

Apply owasp basics, sql injection, xss, csrf to implement sql binding demonstration. Explain the acceptance example from input to result.

## Problem Statement

Build sql binding demonstration for a fictional college environment. Use parameterized local query; test a quote-containing value.

## Features

- Use parameterized local query.
- test a quote-containing value.

## Functional Requirements

1. FR-1: Use parameterized local query. Demonstrate with a reproducible fixture.
2. FR-2: test a quote-containing value. Demonstrate with a reproducible fixture.

## Technical Requirements

Use JavaScript, HTTP, SQL. Keep the main operation separate from presentation. Record exact dependency versions. Aligned to official module 10; advanced features extend the core syllabus and need independent practice time.

## UI Requirements

No graphical UI is required. Supply labeled terminal results, HTTP transcripts or a readable report.

## API Requirements

No new public API is required unless a route is explicitly named in the features.

## Database Requirements

Use committed deterministic fixtures unless persistence is explicitly required.

## Validation Requirements

Enforce the types, bounds and state rules in each FR. Distinguish valid, missing and malformed inputs. A rejected mutation must not silently change state.

## Expected Input

Prepare the fixture and interaction needed for this scenario: Value does not change query structure.

## Expected Output

Value does not change query structure. Record actual results beside this expectation.

## Edge Cases

Test empty/missing data, the boundary implied by each FR, and repeated execution or interaction. Test a missing resource or unavailable dependency where applicable.

## Folder Structure

Supplied: README.md, requirements.md, task.md. Student deliverables: solution/ for source and its run README; evidence/ for actual checks; references.md for attribution. Screenshots are optional evidence, not a replacement for source. Empty solution directories are not supplied.

## How to Run

Implement the local artifact in solution/ using a disposable fixture environment. Include exact commands, dependencies, ports and expected observations in solution/README.md; never run experiments against third-party systems.

See [development setup](../../../00-course-overview/development-setup.md). These instructions define the student submission contract; the project is not runnable until its solution is authored.

## Testing Checklist

- [ ] Each FR has a passing evidence row.
- [ ] The expected output matches the actual result.
- [ ] Missing, boundary and repeated-use cases behave as documented.
- [ ] A peer reproduces the result from a fresh checkout.
- [ ] Failures and limitations are reported honestly.

## Learning Outcomes

Demonstrate the main operation, explain the data flow, and diagnose a failed case. Defend why JavaScript, HTTP, SQL suits the requirements.

## Extension Challenges

Add a contrasting fixture for the main operation: use parameterized local query. For an industry exercise, write a recovery and handoff note identifying operational limits.

## Interview Questions

1. Explain the main operation in your implementation.
2. Which boundary could invalidate the expected result and how did you test it?
3. What changes with more users or more records?

See [topic answers](../../../interview-preparation/security.md).

## Resources

[Reference notes](../../../notes/authentication.md); [acceptance table](requirements.md); [student sequence](task.md).
