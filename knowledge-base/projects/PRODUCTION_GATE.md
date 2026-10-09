# Production project gate

An implemented learning project is not automatically suitable for public deployment. Before promoting a project, attach evidence for the actual target environment. Every row below is a requirement category; passing one does not imply the others passed.

| Area | Required evidence |
| --- | --- |
| Authentication | Credential handling, expiry, revocation, abuse controls, and account recovery policy |
| Authorization | Roles, ownership, tenant membership, and two-user/tenant tests on every operation |
| Validation and errors | Boundary types, limits, allowlists, relationships, stable safe responses, and draft recovery |
| Database | Schema, indexes, growth assumptions, persisted concurrency, migration, backup, and restore verification |
| Lists and search | Bounded pagination, stable sort, filtering/search contracts, representative query plans |
| Logging and observability | Redacted structured logs, correlation, latency/error signals, and actionable alerts |
| Security | Threat model, TLS, cookie/origin rules, secret rotation, dependency review, upload/network constraints |
| Testing | Unit/domain, real integration, browser workflows, failures, and target-runtime checks |
| Caching | Only when useful; keys, privacy, freshness, invalidation, stampede, and unavailable-cache behavior |
| Docker | Reproducible image, runtime permissions, signals, volumes, networks, and actual engine execution |
| CI/CD | Required checks, release artifact, deployment boundary, rollback, and least-privilege credentials |
| Deployment | Startup validation, readiness/liveness, dependency loss, drain deadline, and release/restore rehearsal |
| Documentation | README, requirements, features, architecture, schema, API, source layout, implementation, testing, deployment, remaining limitations |

Record date, environment, command or reproduction, result, and limitation. Mark an unexecuted step as unexecuted. Do not expose a learning database publicly to satisfy a checkbox. Current project packets deliberately distinguish specifications, implemented learning apps, and partially implemented foundations.
