# Login attempt limiter

ID: AUTHENTICATION-06. Status: specification ready; solution not supplied.

## Difficulty

🟡 Intermediate. Estimated time: 3–4 hours. Industry exercises emphasize a reproducible handoff; they are not production certifications.

## Technology

Node.js, Express, MongoDB.

## Prerequisites

Security and REST APIs. Read [the learning path](../../../11-supplementary/authentication/README.md) first.

## Learning Objectives

Apply passwords, sessions, identity, ownership, roles to implement login attempt limiter. Explain the acceptance example from input to result.

## Problem Statement

Build login attempt limiter for a fictional college environment. Throttle failed logins; document retry/reset behavior.

## Features

- Throttle failed logins.
- document retry/reset behavior.

## Functional Requirements

1. FR-1: Throttle failed logins. Demonstrate with a reproducible fixture.
2. FR-2: document retry/reset behavior. Demonstrate with a reproducible fixture.

## Technical Requirements

Use Node.js, Express, MongoDB. Keep the main operation separate from presentation. Record exact dependency versions. SUPPLEMENTARY / INDUSTRY SKILLS.

## UI Requirements

No graphical UI is required. Supply labeled terminal results, HTTP transcripts or a readable report.

## API Requirements

Document methods, paths, input fields and response shapes. Use appropriate 200/201 success and 400/404 errors; apply 401/403 to authentication/authorization cases. Validate server-side and send one response per request.

## Database Requirements

Use fictional seed records in a disposable database. Document keys, required fields and relationships. Test state before and after changes and handle duplicate/conflicting writes.

## Validation Requirements

Enforce the types, bounds and state rules in each FR. Distinguish valid, missing and malformed inputs. A rejected mutation must not silently change state.

## Expected Input

Prepare the fixture and interaction needed for this scenario: Excess failures receive throttled response.

## Expected Output

Excess failures receive throttled response. Record actual results beside this expectation.

## Edge Cases

Test empty/missing data, the boundary implied by each FR, and repeated execution or interaction. Test duplicate identifiers and an interrupted write.

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

Demonstrate the main operation, explain the data flow, and diagnose a failed case. Defend why Node.js, Express, MongoDB suits the requirements.

## Extension Challenges

Add a contrasting fixture for the main operation: throttle failed logins. For an industry exercise, write a recovery and handoff note identifying operational limits.

## Interview Questions

1. Explain the main operation in your implementation.
2. Which boundary could invalidate the expected result and how did you test it?
3. What changes with more users or more records?

See [topic answers](../../../interview-preparation/authentication.md).

## Resources

[Reference notes](../../../notes/authentication.md); [acceptance table](requirements.md); [student sequence](task.md).
