# Contributing to the MERN Stack Knowledge Base

Improve learning quality, technical accuracy, practical value, navigation, and maintainability. New technologies do not need to fit the institutional syllabus. Read [architecture](knowledge-base/ARCHITECTURE.md), [coverage](knowledge-base/COVERAGE.md), [remaining work](knowledge-base/REMAINING_WORK.md), and [the topic template](knowledge-base/templates/topic.md).

## Topic changes

1. Review current publisher documentation for the intended runtime/version. Record exact URLs, review date, audience, and limitations using [the resource policy](knowledge-base/resources/POLICY.md). Verify topical coverage before recommending videos.
2. Assign priority and difficulty separately. Explain what, why, how, internals, examples, usage, mistakes, and practices. Include four exercise levels and answered conceptual, debugging, scenario, output, coding, and architecture questions.
3. Write original examples with runtime, input, expected output, failure recovery, and limitations. Add meaningful behavioral checks when promised; syntax checks alone do not establish correctness.
4. Declare prerequisite and related guide ids. Connect old lessons rather than copying implementations or breaking URLs. Reference-depth concepts stay labeled until dedicated treatment exists.
5. Edit author data in scripts/kb_content.py, kb_backend.py, or kb_engineering.py; paths/projects in kb_paths_projects.py, and quick references in kb_cheatsheets.py. Generated files are not the editing source.
6. Run `npm run build:knowledge`, `npm test`, and `git diff --check`. Include verification and remaining limitations in the pull request.

Stable ids are learner-progress keys. An id change needs an explicit migration. Keep prerequisites acyclic. Do not equate mapped concepts with complete technology knowledge or learner mastery.

## Project changes

Use one canonical source location. Every packet must include requirements, features, architecture, schema, API contract, folder structure, status, testing, deployment, and future improvements. Upgrade status only after verifying promised behavior. A specification is not an implemented application; a shared foundation is not a finished advanced product.

Run affected source tests and browser workflows. For the MERN workspace, run its real MongoDB integration tests and client build. Production scope requires evidence against [the production gate](knowledge-base/projects/PRODUCTION_GATE.md), including authorization, recovery, configuration, logs, and CI. Keep secrets and personal data out of Git. Identify simulations and external dependencies.

## Interview and download changes

Read [handbook maintenance](interview-handbook/MAINTENANCE.md). Questions should test understanding; answers should explain tradeoffs and failures. Attribute official company guidance and label original practice suggestions. Regenerate offline artifacts when their source changes, and inspect rendered output before delivery.

## Preserving the optional classroom route

For changes to institutional materials, retain module ids and 120-hour evidence from [the syllabus transcription](resources/syllabus-transcription.md). This constraint applies to that route, not the global knowledge base. Preserve useful original URLs and provenance. Update compatible duplicate examples or document a canonical source. Do not regenerate the pinned inventory to hide later edits.

## Review and community

Use a scoped branch and describe the learner's problem, resulting behavior, sources, actual verification, and gaps. Do not force-push shared history or certify other learners' completion. Follow the [code of conduct](CODE_OF_CONDUCT.md). Vulnerabilities use [private security reporting](SECURITY.md).
