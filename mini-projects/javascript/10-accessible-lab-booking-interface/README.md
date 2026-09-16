# Accessible lab booking interface

ID: JAVASCRIPT-10. Status: specification ready; solution not supplied.

## Difficulty

⚫ Industry. Estimated time: 8–12 hours. Industry exercises emphasize a reproducible handoff; they are not production certifications.

## Technology

HTML, CSS, JavaScript.

## Prerequisites

HTML and CSS. Read [the learning path](../../../04-javascript/README.md) first.

## Learning Objectives

Apply data types, operators, conditions, loops to implement accessible lab booking interface. Explain the acceptance example from input to result.

## Problem Statement

Build accessible lab booking interface for a fictional college environment. Select fixture slots; validate capacity; support keyboard feedback.

## Features

- Select fixture slots.
- validate capacity.
- support keyboard feedback.

## Functional Requirements

1. FR-1: Select fixture slots. Demonstrate with a reproducible fixture.
2. FR-2: validate capacity. Demonstrate with a reproducible fixture.
3. FR-3: support keyboard feedback. Demonstrate with a reproducible fixture.

## Technical Requirements

Use HTML, CSS, JavaScript. Keep the main operation separate from presentation. Record exact dependency versions. Aligned to official module 4; advanced features extend the core syllabus and need independent practice time.

## UI Requirements

Use semantic headings, labeled controls and visible keyboard focus. Test at 360px and 1280px. Show loading, empty and error states when applicable.

## API Requirements

No new public API is required unless a route is explicitly named in the features.

## Database Requirements

Use committed deterministic fixtures unless persistence is explicitly required.

## Validation Requirements

Enforce the types, bounds and state rules in each FR. Distinguish valid, missing and malformed inputs. A rejected mutation must not silently change state.

## Expected Input

Prepare the fixture and interaction needed for this scenario: Full slot cannot be confirmed.

## Expected Output

Full slot cannot be confirmed. Record actual results beside this expectation.

## Edge Cases

Test empty/missing data, the boundary implied by each FR, and repeated execution or interaction. Test a missing resource or unavailable dependency where applicable.

## Folder Structure

Supplied: README.md, requirements.md, task.md. Student deliverables: solution/ for source and its run README; evidence/ for actual checks; references.md for attribution. Screenshots are optional evidence, not a replacement for source. Empty solution directories are not supplied.

## How to Run

Create solution/index.html referencing app.js and open it in a browser. Keep pure logic separate from DOM updates.

See [development setup](../../../00-course-overview/development-setup.md). These instructions define the student submission contract; the project is not runnable until its solution is authored.

## Testing Checklist

- [ ] Each FR has a passing evidence row.
- [ ] The expected output matches the actual result.
- [ ] Missing, boundary and repeated-use cases behave as documented.
- [ ] A peer reproduces the result from a fresh checkout.
- [ ] Failures and limitations are reported honestly.

## Learning Outcomes

Demonstrate the main operation, explain the data flow, and diagnose a failed case. Defend why HTML, CSS, JavaScript suits the requirements.

## Extension Challenges

Add a contrasting fixture for the main operation: select fixture slots. For an industry exercise, write a recovery and handoff note identifying operational limits.

## Interview Questions

1. Explain the main operation in your implementation.
2. Which boundary could invalidate the expected result and how did you test it?
3. What changes with more users or more records?

See [topic answers](../../../interview-preparation/javascript.md).

## Resources

[Reference notes](../../../notes/javascript.md); [acceptance table](requirements.md); [student sequence](task.md).
