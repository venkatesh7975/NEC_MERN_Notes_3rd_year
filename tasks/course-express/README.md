# Assignment: Enrollment router

ID: course-express. Status: specification ready. Estimated work: 3–4 hours of independent practice unless faculty selects a shorter subset.

## Objective

Apply routing, middleware, static files, errors and verify the result.

## Background

A fictional college needs enrollment router.

## Problem statement

Mount a router under /api/enrollments; validate IDs and body; handle unknown routes.

## Requirements

Complete all functional requirements and submit reproducible evidence.

## Functional requirements

1. Mount a router under /api/enrollments.
2. validate IDs and body.
3. handle unknown routes.

## Technical requirements

Use Node.js, Express. Prerequisites: Node and HTTP. See [the full project contract](../../mini-projects/express/06-enrollment-router/README.md) for UI/API/database and run requirements.

## Restrictions

Use fictional data. Do not overwrite shared examples or submit only screenshots. Attribute reused code and be able to explain it.

## Expected output

Wrong prefix returns 404.

## Example

Use the acceptance scenario above as a fixture; document exact input/action and resulting state.

## Edge cases

Test missing input, a boundary implied by a functional requirement, and repeated execution or interaction.

## Deliverables

Source, fixtures, run README, dependency lockfile where needed and evidence.md containing expected/actual/pass-fail rows.

## Submission instructions

Follow [submission.md](submission.md) and include the assignment ID and commit SHA.

## Evaluation criteria

[evaluation.md](evaluation.md) gives a proposed 100-point rubric; faculty controls formal grades.

## Common mistakes

Unstated dependencies; missing test fixtures; success messages before successful work; replacing required behavior with a screenshot.

## Bonus requirements

Implement one extension from the project contract only after required behavior passes.

## Learning outcomes

Demonstrate the acceptance result, trace it through the code and explain one corrected bug.
