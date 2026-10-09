<!-- kb-metadata: {"conceptIds": ["git--git-fundamentals", "git--branching", "git--merging", "git--rebasing", "git--stashing", "git--cherry-pick", "git--reset", "git--revert", "git--git-workflows", "git--pull-requests", "git--code-review", "git--github-actions", "git--open-source-contribution"], "difficulty": "Beginner", "estimatedMinutes": 180, "id": "git", "importance": 5, "lastVerified": "2026-10-08", "legacyPaths": ["notes/git.md"], "path": "knowledge-base/topics/git.md", "prerequisites": [], "priority": "P0", "related": ["engineering", "devops"], "status": "authored-guide", "title": "Git history, collaboration, and code review"} -->
# Git history, collaboration, and code review

Priority: P0 — 🔥 Essential / Master

Difficulty: Beginner

Importance: 5/5

Prerequisites: No programming prerequisites; basic file and browser use.

Estimated learning time: 180 minutes for explanation and initial practice; independent mastery takes repeated application.

[Knowledge base](../README.md) · [Coverage](../COVERAGE.md) · [Learning paths](../paths/README.md)

## 🎯 Learning Objectives

Explain the mental model, trace the worked example, reproduce a failure, and demonstrate the acceptance checks in the mini-project. Individual concepts below have their own priorities and depth labels.

## 🧠 What Is It?

Commits identify snapshots and parent relationships; the working tree and staging area represent different states.

## Concept reference and priorities

<a id="git-fundamentals"></a>
### Git fundamentals

**P0 · 🔥 Essential / Master · worked-example**

Commits identify snapshots and parent relationships; the working tree and staging area represent different states.

<a id="branching"></a>
### Branching

**P0 · 🔥 Essential / Master · worked-example**

A branch is a movable name pointing to a commit, not a separate copy of every file.

<a id="merging"></a>
### Merging

**P0 · 🔥 Essential / Master · reference**

A merge combines histories, potentially creating a commit with multiple parents.

<a id="rebasing"></a>
### Rebasing

**P2 · 📚 Useful · reference**

Rebase replays commits onto a new base and changes their identities; coordinate before rewriting shared history.

<a id="stashing"></a>
### Stashing

**P2 · 📚 Useful · reference**

Stash stores selected work temporarily; understand whether untracked files are included and verify restoration.

<a id="cherry-pick"></a>
### Cherry-pick

**P2 · 📚 Useful · reference**

Cherry-pick applies a commit's change on another history and normally creates a new commit identity.

<a id="reset"></a>
### Reset

**P2 · 📚 Useful · reference**

Reset moves a reference and can alter the index or working tree depending on mode; inspect before using destructive modes.

<a id="revert"></a>
### Revert

**P1 · ⭐ Highly Important · reference**

Revert creates a new commit that reverses an earlier change while retaining shared history.

<a id="git-workflows"></a>
### Git workflows

**P1 · ⭐ Highly Important · reference**

A workflow defines branches, review, checks, and release decisions; choose it for the team rather than fashion.

<a id="pull-requests"></a>
### Pull requests

**P0 · 🔥 Essential / Master · reference**

A pull request proposes a branch difference for review and collaboration.

<a id="code-review"></a>
### Code review

**P0 · 🔥 Essential / Master · worked-example**

Review checks behavior, maintainability, evidence, security boundaries, and scope rather than only formatting.

<a id="github-actions"></a>
### GitHub Actions

**P1 · ⭐ Highly Important · reference**

Workflows run configured jobs on events; least-privilege permissions and untrusted-input handling matter.

<a id="open-source-contribution"></a>
### Open-source contribution

**P1 · ⭐ Highly Important · reference**

Read contribution rules, preserve provenance, describe the change, and supply reproducible verification.

## ❓ Why Does It Exist?

Version history lets a team explain, review, and recover a change. A good diff and honest checks are as useful to maintainers as a polished final screen.

## ⚙️ How Does It Work?

Inspect status first, stage intended changes, inspect the staged diff, and commit one coherent behavior. Fetch updates before comparing with the remote. A conflict asks you to reconcile intent: choosing every incoming line mechanically can discard necessary behavior. Prefer a revert for a published mistake when the team needs shared history preserved.

## 💻 Examples

### 1. Trace the contract

```bash
git status --short
git switch -c feature/request-validation
git diff
git add server/validation.js
git diff --cached
git commit -m "Validate task titles at the API boundary"
```

Expected behavior and runtime: Run in a disposable repository with that file; the staged diff includes the selected file, and the commit records that snapshot. These commands do not push or merge anything.

### 2. Extend and stress the contract

Intermediate: merge two edits to a small function and verify intent. Advanced: compare a merge and a rebase in a disposable repository. Record the expected result before implementation; use the failure analysis below to distinguish the broken boundary.

## 🔍 Under the Hood

Git objects are content-addressed and commits connect snapshots through parents. A branch name and a remote-tracking name can diverge. Line-ending normalization is controlled by attributes; binary artifacts must not be transformed as text.

## 🌍 Real-World Usage

Contribute one debugging challenge with a focused PR, expected behavior, reproduction, regression evidence, and source verification.

## ⚠️ Common Mistakes

- Resetting a shared branch to hide an error without coordination.
- Committing .env or private progress data.
- Assuming a clean working tree means the code was tested.

## ✅ Best Practices

Contribute one debugging challenge with a focused PR, expected behavior, reproduction, regression evidence, and source verification. State the invariant, validate at the boundary, use the documented runtime, and keep a reproducible failure case. This guide is educational evidence; it does not certify a deployment.

## 🧪 Practice

- Beginner: explain working, staged, and committed versions of one file.
- Intermediate: merge two edits to a small function and verify intent.
- Advanced: compare a merge and a rebase in a disposable repository.
- Challenge: revert a behavioral change and keep unrelated later work.

## 🏗️ Mini Project

Create a contribution rehearsal repository with two branches, one conflict, one regression check, and a reviewed change description.

[Project ladder and implementation status](../projects/README.md)

## 💼 Interview Questions

<details>
<summary>Beginner: What is a branch?</summary>

A movable reference to a commit.

</details>

<details>
<summary>Intermediate: How does revert differ from reset?</summary>

Revert adds a compensating commit; reset moves a reference and may alter local states.

</details>

<details>
<summary>Advanced: Why are rebased commit hashes different?</summary>

Their parents and often metadata change, yielding new commit objects.

</details>

<details>
<summary>Scenario: A secret was committed.</summary>

Revoke or rotate it first, then coordinate history and log cleanup through the security process.

</details>

<details>
<summary>Debugging: A file is absent from a commit.</summary>

Inspect status and the staged diff; an unstaged change is not part of the new commit.

</details>

<details>
<summary>Output-based: What does the worked example produce, and under which runtime?</summary>

Run in a disposable repository with that file; the staged diff includes the selected file, and the commit records that snapshot. These commands do not push or merge anything.

</details>

<details>
<summary>Coding: What would you implement and verify next?</summary>

Create a contribution rehearsal repository with two branches, one conflict, one regression check, and a reviewed change description.

</details>

<details>
<summary>Architecture and production: Which internal boundary needs evidence?</summary>

Git objects are content-addressed and commits connect snapshots through parents. A branch name and a remote-tracking name can diverge. Line-ending normalization is controlled by attributes; binary artifacts must not be transformed as text.

</details>

[Difficulty-based interview bank](../../interview-handbook/questions/index.md) · [Scenario practice](../../interview-handbook/scenarios/README.md) · [Debugging library](../debugging/README.md)

## 🔗 Related Concepts

[Maintainable code, architecture, and observability](engineering.md), [Containers, CI/CD, and operating a web service](devops.md)

Next: [Maintainable code, architecture, and observability](engineering.md)

Preserved lessons: [notes/git.md](../../notes/git.md)

# 📚 External Resources

## 🥇 Official Documentation

[Primary documentation](https://git-scm.com/book/en/v2) — authoritative reference; use the installed runtime/library version.

## 📘 Recommended Articles

[Focused guide](https://docs.github.com/en/actions) — deepen the mental model and compare its examples with this guide.

## 🎥 Recommended YouTube Videos

See the [verified media register](../resources/VIDEOS.md). A topic without a verified topical video uses written official documentation; unverified recommendations are not padded into this section.

## 🧪 Practice Resources

[Local project ladder](../projects/README.md) · [Timed exercises](../../interview-handbook/machine-coding/README.md)

## 📚 Further Reading

[Curated external register](../resources/README.md) — authority, level, best use, last check, and retrieval limitations.

## 🔄 Last Verified

2026-10-08 — documentation reviewed; example runtime and execution scope are stated above.
