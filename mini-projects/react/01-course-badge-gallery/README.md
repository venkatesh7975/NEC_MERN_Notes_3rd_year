# Course badge gallery

ID: REACT-01. Status: specification ready; solution not supplied.

## Difficulty

🟢 Beginner. Estimated time: 1–2 hours. Industry exercises emphasize a reproducible handoff; they are not production certifications.

## Technology

React, JavaScript.

## Prerequisites

JavaScript functions, arrays and events. Read [the learning path](../../../05-react/README.md) first.

## Learning Objectives

Apply jsx, components, props, state, events to implement course badge gallery. Explain the acceptance example from input to result.

## Problem Statement

Build course badge gallery for a fictional college environment. Render three components with title and level props; use stable IDs.

## Features

- Render three components with title and level props.
- use stable IDs.

## Functional Requirements

1. FR-1: Render three components with title and level props. Demonstrate with a reproducible fixture.
2. FR-2: use stable IDs. Demonstrate with a reproducible fixture.

## Technical Requirements

Use React, JavaScript. Keep the main operation separate from presentation. Record exact dependency versions. Aligned to official module 5; advanced features extend the core syllabus and need independent practice time.

## UI Requirements

Use semantic headings, labeled controls and visible keyboard focus. Test at 360px and 1280px. Show loading, empty and error states when applicable.

## API Requirements

No new public API is required unless a route is explicitly named in the features.

## Database Requirements

Use committed deterministic fixtures unless persistence is explicitly required.

## Validation Requirements

Enforce the types, bounds and state rules in each FR. Distinguish valid, missing and malformed inputs. A rejected mutation must not silently change state.

## Expected Input

Prepare the fixture and interaction needed for this scenario: Three input records produce three badges.

## Expected Output

Three input records produce three badges. Record actual results beside this expectation.

## Edge Cases

Test empty/missing data, the boundary implied by each FR, and repeated execution or interaction. Test a missing resource or unavailable dependency where applicable.

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

Demonstrate the main operation, explain the data flow, and diagnose a failed case. Defend why React, JavaScript suits the requirements.

## Extension Challenges

Add a contrasting fixture for the main operation: render three components with title and level props. For an industry exercise, write a recovery and handoff note identifying operational limits.

## Interview Questions

1. Explain the main operation in your implementation.
2. Which boundary could invalidate the expected result and how did you test it?
3. What changes with more users or more records?

See [topic answers](../../../interview-preparation/react.md).

## Resources

[Reference notes](../../../notes/react.md); [acceptance table](requirements.md); [student sequence](task.md).
