# Contributing

Preserve the official module IDs and 120-hour allocation from [the syllabus](resources/syllabus-transcription.md). Put additional technologies under supplementary skills. Existing classroom URLs should continue working.

## Documentation changes

1. Read [CURRICULUM.md](CURRICULUM.md), the relevant module notes and [AUDIT.md](AUDIT.md).
2. Update the canonical brief or guide; use links instead of copying another solution.
3. Include prerequisites, run environment, deterministic input/output and boundary cases.
4. Keep project and task indexes synchronized. Specification ready is not implementation complete.
5. Run `node scripts/validate-curriculum.cjs` and `git diff --check`.

## Code examples

Use dailycodes/ for reference examples and your own fork for submissions. Include dependencies, lockfiles and run instructions when needed. Identify simulations and external service requirements. Keep .env and personal data out of Git. Test code in its intended environment; a syntax check alone does not prove runtime correctness.

## Review

Use a scoped branch and commit message. Describe why the change helps teaching, how it was verified and what remains untested. Do not force-push shared history or certify classmates' completion. When editing both legacy copies of an example, keep them consistent or document a canonical path.
