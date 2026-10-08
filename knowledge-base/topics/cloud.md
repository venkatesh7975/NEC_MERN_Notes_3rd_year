<!-- kb-metadata: {"conceptIds": ["cloud--cloud-fundamentals", "cloud--deployment-architecture", "cloud--compute", "cloud--storage", "cloud--databases", "cloud--cdn", "cloud--dns", "cloud--environment-management", "cloud--secrets", "cloud--scaling"], "difficulty": "Intermediate", "estimatedMinutes": 120, "id": "cloud", "importance": 3, "lastVerified": "2026-10-08", "legacyPaths": [], "path": "knowledge-base/topics/cloud.md", "prerequisites": ["devops"], "priority": "P2", "related": ["system-design", "security"], "status": "authored-guide", "title": "Cloud deployment, scaling, and recovery choices"} -->
# Cloud deployment, scaling, and recovery choices

Priority: P2 — 📚 Useful

Difficulty: Intermediate

Importance: 3/5

Prerequisites: [Containers, CI/CD, and operating a web service](devops.md)

Estimated learning time: 120 minutes for explanation and initial practice; independent mastery takes repeated application.

[Knowledge base](../README.md) · [Coverage](../COVERAGE.md) · [Learning paths](../paths/README.md)

## 🎯 Learning Objectives

Explain the mental model, trace the worked example, reproduce a failure, and demonstrate the acceptance checks in the mini-project. Individual concepts below have their own priorities and depth labels.

## 🧠 What Is It?

Cloud platforms offer managed resources under explicit availability, pricing, and responsibility models.

## Concept reference and priorities

<a id="cloud-fundamentals"></a>
### Cloud fundamentals

**P2 · 📚 Useful · reference**

Cloud platforms offer managed resources under explicit availability, pricing, and responsibility models.

<a id="deployment-architecture"></a>
### Deployment architecture

**P1 · ⭐ Highly Important · worked-example**

Map clients, compute, stores, networks, secrets, and failure boundaries before selecting a service.

<a id="compute"></a>
### Compute

**P2 · 📚 Useful · reference**

Compute runs workloads under resource limits and lifecycle rules, whether instances, containers, or functions.

<a id="storage"></a>
### Storage

**P1 · ⭐ Highly Important · reference**

Object, block, and filesystem storage have different access and durability contracts.

<a id="databases"></a>
### Databases

**P1 · ⭐ Highly Important · reference**

Managed databases reduce some operating work, while schema, queries, permissions, and recovery remain application responsibilities.

<a id="cdn"></a>
### CDN

**P2 · 📚 Useful · reference**

A CDN distributes cacheable content closer to clients; private data and invalidation need intentional policies.

<a id="dns"></a>
### DNS

**P1 · ⭐ Highly Important · reference**

DNS directs names to services with propagation and caching behavior relevant to migrations.

<a id="environment-management"></a>
### Environment management

**P1 · ⭐ Highly Important · reference**

Separate development, test, and production identities, configuration, and data.

<a id="secrets"></a>
### Secrets

**P0 · 🔥 Essential / Master · reference**

Provide credentials through a controlled secret mechanism, with least privilege and rotation.

<a id="scaling"></a>
### Scaling

**P2 · 📚 Useful · reference**

Scale the measured bottleneck while accounting for shared-state, connection, and dependency limits.

## ❓ Why Does It Exist?

Moving a service to a cloud provider changes operational boundaries, not application correctness. A managed database does not choose good indexes or authorize users for you.

## ⚙️ How Does It Work?

Draw the request path and annotate ownership, data sensitivity, latency, and failure behavior. Keep internal stores inaccessible from the public Internet where practical. Separate public static content from personalized API data. State what happens if a zone, dependency, or deployment fails and how restored data will be verified. Estimate resource usage and budget with the provider's current pricing rather than fixed historical numbers.

## 💻 Examples

### 1. Trace the contract

```text
Browser -> CDN/public assets
Browser -> HTTPS entry point -> application compute -> private database
Application compute -> controlled secret access
Logs/metrics -> observation system
Backups -> separately controlled recovery storage
```

Expected behavior and runtime: This is a provider-neutral architecture sketch, not a provisioned environment. Each arrow needs network, identity, lifetime, and failure rules before deployment.

### 2. Extend and stress the contract

Intermediate: separate environment identities and secrets. Advanced: define recovery point and recovery time goals from product requirements. Record the expected result before implementation; use the failure analysis below to distinguish the broken boundary.

## 🔍 Under the Hood

Scaling compute can multiply database connections and shift the bottleneck. Managed availability is bounded by configuration and service contracts. Backups, replicas, and multi-region copies solve different failure and recovery problems.

## 🌍 Real-World Usage

Write a deployment decision record for the workspace: one small service, managed MongoDB or a self-managed store, public assets, TLS, secret access, backup and recovery requirements.

## ⚠️ Common Mistakes

- Exposing a database to make setup convenient.
- Assuming replicas replace backup against accidental data deletion.
- Scaling instances without budgeting connections and background work.

## ✅ Best Practices

Write a deployment decision record for the workspace: one small service, managed MongoDB or a self-managed store, public assets, TLS, secret access, backup and recovery requirements. State the invariant, validate at the boundary, use the documented runtime, and keep a reproducible failure case. This guide is educational evidence; it does not certify a deployment.

## 🧪 Practice

- Beginner: label public and private components.
- Intermediate: separate environment identities and secrets.
- Advanced: define recovery point and recovery time goals from product requirements.
- Challenge: simulate dependency loss and demonstrate an honest user-facing recovery state.

## 🏗️ Mini Project

Produce a provider-neutral deployment packet and then an optional provider-specific implementation with measured cost assumptions, health, rollback, and restore evidence.

[Project ladder and implementation status](../projects/README.md)

## 💼 Interview Questions

<details>
<summary>Beginner: What does managed mean?</summary>

Some operations are supplied by the provider; the exact responsibility boundary still needs review.

</details>

<details>
<summary>Intermediate: Can a CDN cache all API responses?</summary>

No. Scope, privacy, freshness, and invalidation determine which representations are reusable.

</details>

<details>
<summary>Advanced: Why does scaling increase database pressure?</summary>

Each worker may add connections, concurrent queries, and background jobs.

</details>

<details>
<summary>Scenario: A region is unavailable.</summary>

Follow the chosen availability and recovery contract; avoid claiming instant failover without tested architecture.

</details>

<details>
<summary>Debugging: A restored service has old data.</summary>

Inspect recovery point, backup age, restore verification, and the actual write path.

</details>

<details>
<summary>Output-based: What does the worked example produce, and under which runtime?</summary>

This is a provider-neutral architecture sketch, not a provisioned environment. Each arrow needs network, identity, lifetime, and failure rules before deployment.

</details>

<details>
<summary>Coding: What would you implement and verify next?</summary>

Produce a provider-neutral deployment packet and then an optional provider-specific implementation with measured cost assumptions, health, rollback, and restore evidence.

</details>

<details>
<summary>Architecture and production: Which internal boundary needs evidence?</summary>

Scaling compute can multiply database connections and shift the bottleneck. Managed availability is bounded by configuration and service contracts. Backups, replicas, and multi-region copies solve different failure and recovery problems.

</details>

[Difficulty-based interview bank](../../interview-handbook/questions/index.md) · [Scenario practice](../../interview-handbook/scenarios/README.md) · [Debugging library](../debugging/README.md)

## 🔗 Related Concepts

[System design, consistency, and failure tradeoffs](system-design.md), [Authentication, authorization, and web security boundaries](security.md)

Next: [System design, consistency, and failure tradeoffs](system-design.md)

# 📚 External Resources

## 🥇 Official Documentation

[Primary documentation](https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html) — authoritative reference; use the installed runtime/library version.

## 📘 Recommended Articles

[Focused guide](https://12factor.net/) — deepen the mental model and compare its examples with this guide.

## 🎥 Recommended YouTube Videos

See the [verified media register](../resources/VIDEOS.md). A topic without a verified topical video uses written official documentation; unverified recommendations are not padded into this section.

## 🧪 Practice Resources

[Local project ladder](../projects/README.md) · [Timed exercises](../../interview-handbook/machine-coding/README.md)

## 📚 Further Reading

[Curated external register](../resources/README.md) — authority, level, best use, last check, and retrieval limitations.

## 🔄 Last Verified

2026-10-08 — documentation reviewed; example runtime and execution scope are stated above.
