# Streaming word counter

ID: NODEJS-07. Status: specification ready; solution not supplied.

## Difficulty

🔴 Advanced. Estimated time: 5–8 hours. Industry exercises emphasize a reproducible handoff; they are not production certifications.

## Technology

Node.js, JavaScript.

## Prerequisites

JavaScript functions and promises. Read [the learning path](../../../06-nodejs/README.md) first.

## Learning Objectives

Apply module system, npm, asynchronous programming, events to implement streaming word counter. Explain the acceptance example from input to result.

## Problem Statement

Build streaming word counter for a fictional college environment. Count words across stream chunk boundaries; handle whitespace.

## Features

- Count words across stream chunk boundaries.
- handle whitespace.

## Functional Requirements

1. FR-1: Count words across stream chunk boundaries. Demonstrate with a reproducible fixture.
2. FR-2: handle whitespace. Demonstrate with a reproducible fixture.

## Technical Requirements

Use Node.js, JavaScript. Keep the main operation separate from presentation. Record exact dependency versions. Aligned to official module 6; advanced features extend the core syllabus and need independent practice time.

## UI Requirements

No graphical UI is required. Supply labeled terminal results, HTTP transcripts or a readable report.

## API Requirements

No new public API is required unless a route is explicitly named in the features.

## Database Requirements

Use committed deterministic fixtures unless persistence is explicitly required.

## Validation Requirements

Enforce the types, bounds and state rules in each FR. Distinguish valid, missing and malformed inputs. A rejected mutation must not silently change state.

## Expected Input

Prepare the fixture and interaction needed for this scenario: hello world yields 2 across any chunk split.

## Expected Output

hello world yields 2 across any chunk split. Record actual results beside this expectation.

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

Demonstrate the main operation, explain the data flow, and diagnose a failed case. Defend why Node.js, JavaScript suits the requirements.

## Extension Challenges

Add a contrasting fixture for the main operation: count words across stream chunk boundaries. For an industry exercise, write a recovery and handoff note identifying operational limits.

## Interview Questions

1. Explain the main operation in your implementation.
2. Which boundary could invalidate the expected result and how did you test it?
3. What changes with more users or more records?

See [topic answers](../../../interview-preparation/nodejs.md).

## Resources

[Reference notes](../../../notes/node.md); [acceptance table](requirements.md); [student sequence](task.md).
