# DevOps and deployment teaching notes

## What and why

Git tracks snapshots; GitHub hosts collaboration. CI checks a change; deployment releases a selected artifact. Docker packages a process and dependencies, while persistent data needs explicit storage. Browser configuration is public. Reproduce the build and verify nested route refreshes before release.

## Prerequisites

A working local application. Concepts: Git, GitHub, CI/CD, Docker, React deployment.

## How and syntax

```bash
git status --short
git diff --stat
git diff --check
```

Run context and expected output: Run in a working repository; inspect file and whitespace changes before staging.

## Trace the example

Identify where input enters, which operation controls the result and how output becomes observable. Predict the result before executing. Change one value, repeat, and explain the difference. For malformed input, record whether the example handles it or whether a guard must be added; do not assume a short demonstration is a complete application.

## When to use

Use these concepts for git change journal: Create three commits in scratch repo; explain stage and worktree. Start with a single fixture and increase complexity after the expected result is visible.

## When not to use

Choose the smallest architecture meeting requirements. Do not add a database for a static document, or use browser-only state for shared private records. Do not introduce advanced libraries before you can explain the equivalent core operation. Advanced exercises in the project bank extend core coverage and belong in independent practice.

## Real-world use case

Docker static preview: Containerize static build; map one documented port. Expected result: Browser loads page through mapped port.

## Common mistakes

- Running the example in the wrong environment: Run in a working repository; inspect file and whitespace changes before staging.
- Treating one successful input as proof of correctness. Add a missing case and a boundary case.
- Copying a fragment without its data or host application; consult the setup guide.
- Confusing a project specification or demonstration with a completed student submission.

## Best practices

Make assumptions explicit. Keep fixtures small and fictional. Separate input validation from the central operation. Name values by their role. Verify the result after every small change. In class, ask learners to predict, run and explain rather than copy output. During debugging, find the first point where actual behavior diverges from the expected result.

## Practice

1. Reproduce the worked example and its expected output.
2. Implement create three commits in scratch repo.
3. Add create branch.
4. Describe and test the acceptance example: .env ignored; .env.example tracked.

## Interview preparation

[Questions and answer guidance](../interview-preparation/devops.md).

## Further examples and reference

[Existing topic guide](../notes/deployment.md); [daily practice](../daily-practice/devops/README.md); [official documentation](../resources/teaching-references.md).
