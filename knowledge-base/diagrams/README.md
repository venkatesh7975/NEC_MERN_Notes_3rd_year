# Mental-model diagrams

Each diagram has a text explanation and a topic link. These are simplified models, not implementation-specific timing or deployment guarantees.

## JavaScript event loop

```mermaid
flowchart LR
  Stack[Current synchronous work] --> Checkpoint[Microtask checkpoint]
  Checkpoint --> Reactions[Promise reactions and queued microtasks]
  Reactions --> Yield[Later host work and rendering opportunities]
  Yield --> Stack
```

Current work completes before its queued reactions. Continually adding microtasks can delay other work. Browser scheduling and Node phases differ. [Async guide](../topics/async.md)

## HTTP request lifecycle

```mermaid
sequenceDiagram
  participant B as Browser
  participant N as Network and TLS
  participant A as API
  participant D as Database
  B->>N: Request method, headers, body
  N->>A: HTTP request
  A->>A: Validate identity and permitted input
  A->>D: Scoped operation
  D-->>A: Authoritative outcome
  A-->>B: Status, headers, representation
```

Transport carries a request; application boundaries validate and authorize it. A status response is different from a transport failure. [Foundations](../topics/foundations.md)

## React rendering

```mermaid
flowchart LR
  Event[User intent] --> Update[State update]
  Update --> Render[Pure render with a snapshot]
  Render --> Reconcile[Reconcile stable identity]
  Reconcile --> Commit[Commit host changes]
  Commit --> Effect[External synchronization and cleanup]
```

Rendering may be evaluated again; commands belong to explicit intent handlers. Effects describe external connections. [React](../topics/react.md)

## Express middleware

```mermaid
flowchart LR
  Request --> Parse[Bounded parsing]
  Parse --> Identity[Trusted session]
  Identity --> Validate[Allowlisted inputs]
  Validate --> Service[Domain rule]
  Service --> Store[Owner-scoped persistence]
  Store --> Response[Safe response]
  Validate --> Error[Safe error boundary]
  Store --> Error
```

Order controls who can continue or terminate processing. Rejected returned Promises in Express 5 reach error handling. [Express](../topics/express.md)

## JWT authentication model

```mermaid
sequenceDiagram
  participant C as Client
  participant I as Identity service
  participant R as Resource service
  C->>I: Credential proof
  I->>I: Verify and apply policy
  I-->>C: Signed token with bounded claims
  C->>R: Token and requested operation
  R->>R: Verify signature, issuer, audience, expiry
  R->>R: Enforce resource permissions and revocation policy
  R-->>C: Permitted result or safe error
```

Signing protects integrity, not payload confidentiality. Revocation and refresh policy need separate design. The current learning workspace uses revocable server sessions instead of JWT. [Security](../topics/security.md)

## MongoDB query flow

```mermaid
flowchart LR
  Inputs[Validated inputs and owner] --> Predicate[Query predicate and projection]
  Predicate --> Plan[Index or collection access plan]
  Plan --> Execute[Scan and filter]
  Execute --> Bound[Sort and bounded result]
  Bound --> Public[Public response fields]
```

Compare examined keys/documents with returned records using representative data. Index existence does not prove all queries are efficient. [MongoDB](../topics/mongodb.md)

## REST architecture

```mermaid
flowchart LR
  UI[Interface and recovery] --> HTTP[HTTP contract]
  HTTP --> Controller[Transport adapter]
  Controller --> Domain[Domain rule]
  Domain --> Persistence[Persisted invariant]
  Persistence --> Controller
  Controller --> UI
```

Each boundary has different evidence: UI recovery, HTTP errors, domain behavior, and real database semantics. [API](../topics/api.md)

## Docker architecture

```mermaid
flowchart TB
  Manifest[Lockfile and build instructions] --> Image[Application image]
  Image --> Container[Runtime container process]
  Config[Environment and secret delivery] --> Container
  Container --> Network[Private service network]
  Network --> Database[Database process]
  Database --> Volume[Persistent storage]
```

An image is not a running process, and a volume lifetime differs from a container lifetime. [DevOps](../topics/devops.md)

## CI/CD pipeline

```mermaid
flowchart LR
  Change[Reviewed change] --> Docs[Metadata and link checks]
  Docs --> Tests[Source and integration checks]
  Tests --> Build[Reproducible artifact]
  Build --> Review[Release review]
  Review --> Deploy[Authorized deployment]
  Deploy --> Verify[Health and smoke checks]
  Verify --> Recovery[Monitor and rollback if required]
```

CI success establishes configured checks; actual deployment and recovery need separate evidence. [Git](../topics/git.md), [DevOps](../topics/devops.md)

## Outbox and retry

```mermaid
flowchart LR
  Command[Validated command] --> Transaction[Business change plus event record]
  Transaction --> Outbox[Durable outbox]
  Outbox --> Publisher[Retrying publisher]
  Publisher --> Consumer[Idempotent consumer]
  Consumer --> Effect[Persisted business effect]
```

The shared transaction prevents a state/event-record gap. Retried publication can duplicate delivery; the consumer establishes a durable effect invariant. [System design](../topics/system-design.md)
