# Task 12: Number guessing game

Status: assignment specification. Reconstructed from the title preserved in the old task index; detailed requirements are teaching design added in this revision.

## Objective

Practice JavaScript through a reproducible demonstration.

## Background

This is a classroom exercise for a fictional college course. Complete earlier prerequisites in the [roadmap](../../ROADMAP.md).

## Problem statement

Build a 1–100 integer guessing game with feedback and reset.

## Requirements

1. Validate integer bounds.
2. distinguish too low/high/correct.
3. count only valid guesses.
4. disable guessing after success.

## Functional requirements

With test secret 42: 20 -> too low, 80 -> too high, 42 -> correct in 3 guesses.

## Technical requirements

Use JavaScript concepts. Include source or the requested tracker/log artifact and a run/read README. For browser work, provide index.html and any referenced local files.

## Restrictions

Allow a deterministic test secret; randomize only normal play; invalid guesses do not count.

## Expected output

With test secret 42: 20 -> too low, 80 -> too high, 42 -> correct in 3 guesses.

## Example

Use the expected-output sequence as a deterministic acceptance test and record each intermediate result.

## Edge cases

Test missing content/input, one limit or boundary in the requirements and repeated use. Static pages must also support long text and keyboard navigation.

## Deliverables

Source/artifact, run or reading instructions, evidence.md with expected and actual results, and attribution for reused material.

## Submission instructions

See [submission.md](submission.md).

## Evaluation criteria

See [evaluation.md](evaluation.md).

## Common mistakes

Missing run context, screenshots without source, claiming completion without testing, and overwriting the shared example file instead of working in your fork.

## Bonus requirements

Add a useful accessibility or validation improvement and document the additional test; complete core behavior first.

## Learning outcomes

Explain the controlling rule and demonstrate every requirement without relying on a memorized screenshot.
