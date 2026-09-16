# Rendering strategy comparison

ID: FOUNDATIONS-08. Status: specification ready; solution not supplied.

## Difficulty

🔴 Advanced. Estimated independent work: 5–8 hours. Industry means a handoff-oriented educational exercise, not a production certification.

## Technology

Browser developer tools

## Prerequisites

None. Read the [topic learning path](../../../01-foundations/README.md) first. Complete earlier projects or demonstrate equivalent skills.

## Learning Objectives

Observe requests and identify responsibility across browser, server and database. Apply this by building rendering strategy comparison and explaining the acceptance example.

## Problem Statement

Build rendering strategy comparison for a fictional college learning environment. The deliverable must demonstrate the specific behavior below using small reproducible fixtures. Use fictional records only.

## Features

- Create static HTML and client-rendered versions of the same three-record catalog.
- compare source and DOM.

## Functional Requirements

1. FR-1: Create static HTML and client-rendered versions of the same three-record catalog. Provide an observation or test that proves this behavior.
2. FR-2: compare source and DOM. Provide an observation or test that proves this behavior.

## Technical Requirements

Use Browser developer tools. Keep inputs, processing and presentation separable. Document dependency versions and runtime assumptions. Do not substitute screenshots for source code. Core alignment: Web Basics. Any advanced concepts introduced by this brief are extension practice.

## UI Requirements

A graphical UI is not required. Present labeled terminal output, request/response records or a readable report as appropriate to the brief.

## API Requirements

No additional public API is required beyond any route explicitly named in the features. Document any optional integration separately.

## Database Requirements

Persistent database storage is not required unless explicitly named above. Fixtures must be committed so a reviewer can reproduce the result.

## Validation Requirements

Check the bounds and constraints named in FR requirements. For user-entered data, distinguish missing, malformed and valid values. A rejected operation must not silently produce a success result or unwanted mutation. For static artifacts, validate markup, links and the specified observations.

## Expected Input

Prepare the fixture or interaction in this acceptance scenario: Both show three records; source differs.

## Expected Output

Acceptance oracle: Both show three records; source differs. Record the actual result next to the expected result in your test evidence.

## Edge Cases

Check missing input/resources, repeated execution and partial failures. Add the boundary condition implied by each FR rule and state the expected behavior before testing it. 

## Folder Structure

The supplied files are README.md, requirements.md and task.md. Student deliverables: solution/ containing source and its run README, evidence/ containing actual test records (screenshots only when useful), and references.md listing any reused assets or source material. No empty solution or screenshot directories are supplied.

## How to Run

Build the local artifact described in the requirements inside solution/. Record exact commands, prerequisites and expected observations in its README. Use a scratch repository or local sandbox for infrastructure/security experiments.

See [development setup](../../../00-course-overview/development-setup.md) for shared tooling. The commands above describe the student implementation contract; they are not executable until a solution is authored.

## Testing Checklist

- [ ] Each FR has a recorded pass/fail observation.
- [ ] The acceptance oracle matches actual output.
- [ ] Boundary and invalid cases have explicit expected outcomes.
- [ ] A peer can repeat the run from the submitted README.
- [ ] Source, dependencies and evidence agree; no simulated result is labeled live.

## Learning Outcomes

Demonstrate the project, trace input to result and explain one failed attempt and its correction. Observe requests and identify responsibility across browser, server and database.

## Extension Challenges

Add one contrasting fixture that stresses the main invariant: create static html and client-rendered versions of the same three-record catalog. Compare the two results in a short design note. For Industry projects, include operational limits and recovery steps in the handoff.

## Interview Questions

1. How does create static html and client-rendered versions of the same three-record catalog work in your solution?
2. Which input or state could violate this project's expected output, and how did you test it?
3. What would you change if a second user or a much larger dataset were introduced?

See [topic interview guide](../../../interview-preparation/foundations.md) for concept answer guidance.

## Resources

[Reference notes](../../../notes/git.md); [requirements and evidence table](requirements.md); [student work sequence](task.md).

