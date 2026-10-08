<!-- kb-metadata: {"conceptIds": ["devops--linux", "devops--shell", "devops--environment-variables", "devops--docker", "devops--docker-compose", "devops--images", "devops--containers", "devops--volumes", "devops--networks", "devops--ci-cd", "devops--github-actions", "devops--nginx", "devops--reverse-proxy", "devops--ssl-tls", "devops--deployment", "devops--monitoring", "devops--logging"], "difficulty": "Intermediate", "estimatedMinutes": 120, "id": "devops", "importance": 4, "lastVerified": "2026-10-08", "legacyPaths": ["notes/docker.md", "notes/deployment.md", "09-devops/notes.md"], "path": "knowledge-base/topics/devops.md", "prerequisites": ["nodejs", "git", "security"], "priority": "P1", "related": ["cloud", "engineering"], "status": "authored-guide", "title": "Containers, CI/CD, and operating a web service"} -->
# Containers, CI/CD, and operating a web service

Priority: P1 — ⭐ Highly Important

Difficulty: Intermediate

Importance: 4/5

Prerequisites: [Node.js runtime, resources, and asynchronous services](nodejs.md), [Git history, collaboration, and code review](git.md), [Authentication, authorization, and web security boundaries](security.md)

Estimated learning time: 120 minutes for explanation and initial practice; independent mastery takes repeated application.

[Knowledge base](../README.md) · [Coverage](../COVERAGE.md) · [Learning paths](../paths/README.md)

## 🎯 Learning Objectives

Explain the mental model, trace the worked example, reproduce a failure, and demonstrate the acceptance checks in the mini-project. Individual concepts below have their own priorities and depth labels.

## 🧠 What Is It?

Linux provides process, filesystem, permission, networking, and service primitives commonly used in deployments.

## Concept reference and priorities

<a id="linux"></a>
### Linux

**P1 · ⭐ Highly Important · reference**

Linux provides process, filesystem, permission, networking, and service primitives commonly used in deployments.

<a id="shell"></a>
### Shell

**P1 · ⭐ Highly Important · reference**

Shell commands operate on files and processes; quoting and argument boundaries prevent accidental interpretation.

<a id="environment-variables"></a>
### Environment variables

**P0 · 🔥 Essential / Master · reference**

Validate configuration at startup and keep secrets separate from source and images.

<a id="docker"></a>
### Docker

**P1 · ⭐ Highly Important · reference**

Docker packages applications with runtime dependencies using images and managed containers.

<a id="docker-compose"></a>
### Docker Compose

**P1 · ⭐ Highly Important · worked-example**

Compose defines a multi-service application for a chosen environment; local convenience is not a complete production plan.

<a id="images"></a>
### Images

**P1 · ⭐ Highly Important · reference**

Images contain filesystem layers and runtime metadata; build reproducibly and avoid baking secrets into layers.

<a id="containers"></a>
### Containers

**P1 · ⭐ Highly Important · reference**

Containers are isolated processes sharing host infrastructure, not complete independent virtual machines.

<a id="volumes"></a>
### Volumes

**P1 · ⭐ Highly Important · reference**

Volumes persist data beyond a container lifecycle and need backup and restore procedures.

<a id="networks"></a>
### Networks

**P1 · ⭐ Highly Important · reference**

Container networks define communication paths; avoid exposing internal databases unnecessarily.

<a id="ci-cd"></a>
### CI/CD

**P1 · ⭐ Highly Important · reference**

CI validates proposed changes; delivery prepares releases; deployment changes a running environment under a release policy.

<a id="github-actions"></a>
### GitHub Actions

**P1 · ⭐ Highly Important · reference**

Actions workflows coordinate jobs with explicit triggers, inputs, and permissions.

<a id="nginx"></a>
### Nginx

**P2 · 📚 Useful · reference**

Nginx can serve static resources and reverse-proxy HTTP; forwarded-header and timeout configuration need care.

<a id="reverse-proxy"></a>
### Reverse proxy

**P1 · ⭐ Highly Important · reference**

A proxy sits between clients and services and can handle routing, TLS, limits, or static assets.

<a id="ssl-tls"></a>
### SSL/TLS

**P1 · ⭐ Highly Important · reference**

TLS encrypts transport and authenticates endpoints; SSL is historical terminology for obsolete predecessor protocols.

<a id="deployment"></a>
### Deployment

**P1 · ⭐ Highly Important · reference**

Deployment includes configuration, migrations, health, rollback, and dependency availability.

<a id="monitoring"></a>
### Monitoring

**P1 · ⭐ Highly Important · reference**

Monitoring observes signals and actionable conditions; a reachable process is not necessarily ready to serve.

<a id="logging"></a>
### Logging

**P1 · ⭐ Highly Important · reference**

Structured logs support diagnosis while preserving secrecy and limiting volume.

## ❓ Why Does It Exist?

A successful build only proves that artifacts were created. Operating the service requires configuration, data durability, health, release, and recovery contracts.

## ⚙️ How Does It Work?

Create a repeatable image from a lockfile, run as an appropriate non-root user, validate environment, and keep database state in intentional storage. Bind local databases to loopback for learning. CI should exercise meaningful source and database checks before a release is proposed. Separate liveness from readiness so a process that cannot reach its required store does not receive normal traffic.

## 💻 Examples

### 1. Trace the contract

```bash
# Existing workspace, with a running Docker engine
docker compose up -d mongo
docker compose ps
docker compose logs --tail=30 mongo
# Run npm ci, npm test, and npm run build separately as documented.
```

Expected behavior and runtime: These commands start the workspace's local MongoDB service and inspect it. They require Docker Engine/Desktop running. This environment has not established a complete production Compose rollout.

### 2. Extend and stress the contract

Intermediate: inspect logs and health after a controlled startup failure. Advanced: test a slow request during service replacement. Record the expected result before implementation; use the failure analysis below to distinguish the broken boundary.

## 🔍 Under the Hood

Image layers are reusable filesystem snapshots; containers add runtime process state. Removing a container is distinct from intentionally destroying a volume. Signal handling and HTTP drain behavior determine what happens to in-flight requests during release.

## 🌍 Real-World Usage

Prepare a deployment packet for the workspace with health checks, secret names, persistent-data ownership, migration order, rollback, and a tested restore procedure.

## ⚠️ Common Mistakes

- Committing secrets or passing them as permanent image build arguments.
- Treating docker compose up as evidence that backups and rollback work.
- Trusting every forwarded client IP without a proxy configuration.

## ✅ Best Practices

Prepare a deployment packet for the workspace with health checks, secret names, persistent-data ownership, migration order, rollback, and a tested restore procedure. State the invariant, validate at the boundary, use the documented runtime, and keep a reproducible failure case. This guide is educational evidence; it does not certify a deployment.

## 🧪 Practice

- Beginner: distinguish image, container, and volume.
- Intermediate: inspect logs and health after a controlled startup failure.
- Advanced: test a slow request during service replacement.
- Challenge: restore a disposable backup and compare data rather than assuming the backup is usable.

## 🏗️ Mini Project

Add a container and CI packet for the existing source, then verify the image and recovery in an environment with a running engine. Record unexecuted steps honestly.

[Project ladder and implementation status](../projects/README.md)

## 💼 Interview Questions

<details>
<summary>Beginner: Is a container the same as a VM?</summary>

No. Container isolation normally shares host kernel infrastructure.

</details>

<details>
<summary>Intermediate: What does a volume protect?</summary>

It separates persistent data lifetime from the container; backup and restore still need design.

</details>

<details>
<summary>Advanced: Why distinguish readiness and liveness?</summary>

Readiness controls traffic eligibility; liveness asks whether the process should be restarted.

</details>

<details>
<summary>Scenario: A release runs with missing secrets.</summary>

Fail startup validation with a safe diagnostic rather than entering a partially working state.

</details>

<details>
<summary>Debugging: The app works locally but cannot reach MongoDB in Compose.</summary>

Inspect service DNS, network, connection URI, port assumptions, and database startup state.

</details>

<details>
<summary>Output-based: What does the worked example produce, and under which runtime?</summary>

These commands start the workspace's local MongoDB service and inspect it. They require Docker Engine/Desktop running. This environment has not established a complete production Compose rollout.

</details>

<details>
<summary>Coding: What would you implement and verify next?</summary>

Add a container and CI packet for the existing source, then verify the image and recovery in an environment with a running engine. Record unexecuted steps honestly.

</details>

<details>
<summary>Architecture and production: Which internal boundary needs evidence?</summary>

Image layers are reusable filesystem snapshots; containers add runtime process state. Removing a container is distinct from intentionally destroying a volume. Signal handling and HTTP drain behavior determine what happens to in-flight requests during release.

</details>

[Difficulty-based interview bank](../../interview-handbook/questions/index.md) · [Scenario practice](../../interview-handbook/scenarios/README.md) · [Debugging library](../debugging/README.md)

## 🔗 Related Concepts

[Cloud deployment, scaling, and recovery choices](cloud.md), [Maintainable code, architecture, and observability](engineering.md)

Next: [Cloud deployment, scaling, and recovery choices](cloud.md)

Preserved lessons: [notes/docker.md](../../notes/docker.md), [notes/deployment.md](../../notes/deployment.md), [09-devops/notes.md](../../09-devops/notes.md)

# 📚 External Resources

## 🥇 Official Documentation

[Primary documentation](https://docs.docker.com/get-started/) — authoritative reference; use the installed runtime/library version.

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
