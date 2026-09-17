# DevOps and deployment interview preparation

## Explain the core idea

Question: Explain how DevOps and deployment contributes to a web application.

Answer guide: Git tracks snapshots; GitHub hosts collaboration. CI checks a change; deployment releases a selected artifact. Docker packages a process and dependencies, while persistent data needs explicit storage. Browser configuration is public. Reproduce the build and verify nested route refreshes before release.

## Predict an output

Question: Trace the [worked example](../09-devops/notes.md) without running it.

Expected result: Run in a working repository; inspect file and whitespace changes before staging. Explain the input, operation and result, then introduce one boundary input and explain any required validation.

## Defend a project

Question: How did you satisfy containerize static build?

Answer criteria: cite the source implementation, demonstrate browser loads page through mapped port, then show a failing input and explain its handling. Discuss one tradeoff and one limitation.
