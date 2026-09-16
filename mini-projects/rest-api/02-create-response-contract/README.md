# Create response contract

ID: REST-API-02. Status: specification ready; solution not supplied.

## Difficulty

🟢 Beginner. Estimated time: 1–2 hours. Industry exercises emphasize a reproducible handoff; they are not production certifications.

## Technology

HTTP, Node.js, Express.

## Prerequisites

Express routes. Read [the learning path](../../../07-express-rest/rest-api/README.md) first.

## Learning Objectives

Apply resources, methods, status codes, statelessness to implement create response contract. Explain the acceptance example from input to result.

## Problem Statement

Build create response contract for a fictional college environment. Return 201 on creation; include Location; validate fields.

## Features

- Return 201 on creation.
- include Location.
- validate fields.

## Functional Requirements

1. FR-1: Return 201 on creation. Demonstrate with a reproducible fixture.
2. FR-2: include Location. Demonstrate with a reproducible fixture.
3. FR-3: validate fields. Demonstrate with a reproducible fixture.

## Technical Requirements

Use HTTP, Node.js, Express. Keep the main operation separate from presentation. Record exact dependency versions. Aligned to official module 7; advanced features extend the core syllabus and need independent practice time.

## UI Requirements

No graphical UI is required. Supply labeled terminal results, HTTP transcripts or a readable report.

## API Requirements

Document methods, paths, input fields and response shapes. Use appropriate 200/201 success and 400/404 errors; apply 401/403 to authentication/authorization cases. Validate server-side and send one response per request.

## Database Requirements

Use committed deterministic fixtures unless persistence is explicitly required.

## Validation Requirements

Enforce the types, bounds and state rules in each FR. Distinguish valid, missing and malformed inputs. A rejected mutation must not silently change state.

## Expected Input

Prepare the fixture and interaction needed for this scenario: Location identifies the created resource.

## Expected Output

Location identifies the created resource. Record actual results beside this expectation.

## Edge Cases

Test empty/missing data, the boundary implied by each FR, and repeated execution or interaction. Test a missing resource or unavailable dependency where applicable.

## Folder Structure

Supplied: README.md, requirements.md, task.md. Student deliverables: solution/ for source and its run README; evidence/ for actual checks; references.md for attribution. Screenshots are optional evidence, not a replacement for source. Empty solution directories are not supplied.

## How to Run

Create solution/package.json with start and test scripts. Install the listed dependencies, record versions and lockfile. Use npm ci then npm start on a fresh checkout. Document any required database URI through an untracked environment file.

See [development setup](../../../00-course-overview/development-setup.md). These instructions define the student submission contract; the project is not runnable until its solution is authored.

## Testing Checklist

- [ ] Each FR has a passing evidence row.
- [ ] The expected output matches the actual result.
- [ ] Missing, boundary and repeated-use cases behave as documented.
- [ ] A peer reproduces the result from a fresh checkout.
- [ ] Failures and limitations are reported honestly.

## Learning Outcomes

Demonstrate the main operation, explain the data flow, and diagnose a failed case. Defend why HTTP, Node.js, Express suits the requirements.

## Extension Challenges

Add a contrasting fixture for the main operation: return 201 on creation. For an industry exercise, write a recovery and handoff note identifying operational limits.

## Interview Questions

1. Explain the main operation in your implementation.
2. Which boundary could invalidate the expected result and how did you test it?
3. What changes with more users or more records?

See [topic answers](../../../interview-preparation/rest-api.md).

## Resources

[Reference notes](../../../notes/rest-api.md); [acceptance table](requirements.md); [student sequence](task.md).
