# Course directory slice

ID: FULLSTACK-01. Status: specification ready; solution not supplied.

## Difficulty

🟢 Beginner. Estimated time: 1–2 hours. Industry exercises emphasize a reproducible handoff; they are not production certifications.

## Technology

React, Node.js, Express, MongoDB.

## Prerequisites

React, API, database and security tracks. Read [the learning path](../../../11-supplementary/fullstack/README.md) first.

## Learning Objectives

Apply integration, persistence, api contracts, verification to implement course directory slice. Explain the acceptance example from input to result.

## Problem Statement

Build course directory slice for a fictional college environment. Load persisted courses through Express into React; show loading/error.

## Features

- Load persisted courses through Express into React.
- show loading/error.

## Functional Requirements

1. FR-1: Load persisted courses through Express into React. Demonstrate with a reproducible fixture.
2. FR-2: show loading/error. Demonstrate with a reproducible fixture.

## Technical Requirements

Use React, Node.js, Express, MongoDB. Keep the main operation separate from presentation. Record exact dependency versions. SUPPLEMENTARY / INDUSTRY SKILLS.

## UI Requirements

Use semantic headings, labeled controls and visible keyboard focus. Test at 360px and 1280px. Show loading, empty and error states when applicable.

## API Requirements

Document methods, paths, input fields and response shapes. Use appropriate 200/201 success and 400/404 errors; apply 401/403 to authentication/authorization cases. Validate server-side and send one response per request.

## Database Requirements

Use fictional seed records in a disposable database. Document keys, required fields and relationships. Test state before and after changes and handle duplicate/conflicting writes.

## Validation Requirements

Enforce the types, bounds and state rules in each FR. Distinguish valid, missing and malformed inputs. A rejected mutation must not silently change state.

## Expected Input

Prepare the fixture and interaction needed for this scenario: Reload retains database course titles.

## Expected Output

Reload retains database course titles. Record actual results beside this expectation.

## Edge Cases

Test empty/missing data, the boundary implied by each FR, and repeated execution or interaction. Test duplicate identifiers and an interrupted write.

## Folder Structure

Supplied: README.md, requirements.md, task.md. Student deliverables: solution/ for source and its run README; evidence/ for actual checks; references.md for attribution. Screenshots are optional evidence, not a replacement for source. Empty solution directories are not supplied.

## How to Run

Follow the React host setup guide, then implement source under solution/. Record client and server startup commands, ports and API URL. Commit dependency manifests and lockfiles. npm ci must work on a fresh checkout.

See [development setup](../../../00-course-overview/development-setup.md). These instructions define the student submission contract; the project is not runnable until its solution is authored.

## Testing Checklist

- [ ] Each FR has a passing evidence row.
- [ ] The expected output matches the actual result.
- [ ] Missing, boundary and repeated-use cases behave as documented.
- [ ] A peer reproduces the result from a fresh checkout.
- [ ] Failures and limitations are reported honestly.

## Learning Outcomes

Demonstrate the main operation, explain the data flow, and diagnose a failed case. Defend why React, Node.js, Express, MongoDB suits the requirements.

## Extension Challenges

Add a contrasting fixture for the main operation: load persisted courses through express into react. For an industry exercise, write a recovery and handoff note identifying operational limits.

## Interview Questions

1. Explain the main operation in your implementation.
2. Which boundary could invalidate the expected result and how did you test it?
3. What changes with more users or more records?

See [topic answers](../../../interview-preparation/fullstack.md).

## Resources

[Reference notes](../../../projects/fullstack-projects/README.md); [acceptance table](requirements.md); [student sequence](task.md).
