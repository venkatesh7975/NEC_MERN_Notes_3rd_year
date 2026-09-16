# Assignment: Marks aggregate report

ID: course-sql. Status: specification ready. Estimated work: 3–4 hours of independent practice unless faculty selects a shorter subset.

## Objective

Apply sql versus nosql, crud, keys, joins and verify the result.

## Background

A fictional college needs marks aggregate report.

## Problem statement

Group marks by course; distinguish NULL and zero; compute average.

## Requirements

Complete all functional requirements and submit reproducible evidence.

## Functional requirements

1. Group marks by course.
2. distinguish NULL and zero.
3. compute average.

## Technical requirements

Use MySQL, SQL. Prerequisites: Records and basic data types. See [the full project contract](../../mini-projects/sql/06-marks-aggregate-report/README.md) for UI/API/database and run requirements.

## Restrictions

Use fictional data. Do not overwrite shared examples or submit only screenshots. Attribute reused code and be able to explain it.

## Expected output

0,100,NULL produce average 50.

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
