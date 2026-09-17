# Assignment: Login attempt limiter

ID: course-authentication. Status: specification ready. Estimated work: 3–4 hours of independent practice unless faculty selects a shorter subset.

## Objective

Apply passwords, sessions, identity, ownership, roles and verify the result.

## Background

A fictional college needs login attempt limiter.

## Problem statement

Throttle failed logins; document retry/reset behavior.

## Requirements

Complete all functional requirements and submit reproducible evidence.

## Functional requirements

1. Throttle failed logins.
2. document retry/reset behavior.

## Technical requirements

Use Node.js, Express, MongoDB. Prerequisites: Security and REST APIs. See [the full project contract](../../mini-projects/authentication/06-login-attempt-limiter/README.md) for UI/API/database and run requirements.

## Restrictions

Use fictional data. Do not overwrite shared examples or submit only screenshots. Attribute reused code and be able to explain it.

## Expected output

Excess failures receive throttled response.

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
