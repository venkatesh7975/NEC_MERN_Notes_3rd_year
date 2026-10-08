"""Original API, security, delivery, and engineering lessons."""
from kb_content import area

area('cloud','Cloud deployment, scaling, and recovery choices','P2','devops','system-design security',
'https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html','https://12factor.net/',
'''Cloud fundamentals|2|Cloud platforms offer managed resources under explicit availability, pricing, and responsibility models.
Deployment architecture|1|Map clients, compute, stores, networks, secrets, and failure boundaries before selecting a service.
Compute|2|Compute runs workloads under resource limits and lifecycle rules, whether instances, containers, or functions.
Storage|1|Object, block, and filesystem storage have different access and durability contracts.
Databases|1|Managed databases reduce some operating work, while schema, queries, permissions, and recovery remain application responsibilities.
CDN|2|A CDN distributes cacheable content closer to clients; private data and invalidation need intentional policies.
DNS|1|DNS directs names to services with propagation and caching behavior relevant to migrations.
Environment management|1|Separate development, test, and production identities, configuration, and data.
Secrets|0|Provide credentials through a controlled secret mechanism, with least privilege and rotation.
Scaling|2|Scale the measured bottleneck while accounting for shared-state, connection, and dependency limits.''',
'Moving a service to a cloud provider changes operational boundaries, not application correctness. A managed database does not choose good indexes or authorize users for you.',
'Draw the request path and annotate ownership, data sensitivity, latency, and failure behavior. Keep internal stores inaccessible from the public Internet where practical. Separate public static content from personalized API data. State what happens if a zone, dependency, or deployment fails and how restored data will be verified. Estimate resource usage and budget with the provider\'s current pricing rather than fixed historical numbers.',
'''Browser -> CDN/public assets
Browser -> HTTPS entry point -> application compute -> private database
Application compute -> controlled secret access
Logs/metrics -> observation system
Backups -> separately controlled recovery storage''',
'This is a provider-neutral architecture sketch, not a provisioned environment. Each arrow needs network, identity, lifetime, and failure rules before deployment.',
'Scaling compute can multiply database connections and shift the bottleneck. Managed availability is bounded by configuration and service contracts. Backups, replicas, and multi-region copies solve different failure and recovery problems.',
'Write a deployment decision record for the workspace: one small service, managed MongoDB or a self-managed store, public assets, TLS, secret access, backup and recovery requirements.',
['Exposing a database to make setup convenient.','Assuming replicas replace backup against accidental data deletion.','Scaling instances without budgeting connections and background work.'],
['Beginner: label public and private components.','Intermediate: separate environment identities and secrets.','Advanced: define recovery point and recovery time goals from product requirements.','Challenge: simulate dependency loss and demonstrate an honest user-facing recovery state.'],
'Produce a provider-neutral deployment packet and then an optional provider-specific implementation with measured cost assumptions, health, rollback, and restore evidence.',
[('Beginner: What does managed mean?','Some operations are supplied by the provider; the exact responsibility boundary still needs review.'),('Intermediate: Can a CDN cache all API responses?','No. Scope, privacy, freshness, and invalidation determine which representations are reusable.'),('Advanced: Why does scaling increase database pressure?','Each worker may add connections, concurrent queries, and background jobs.'),('Scenario: A region is unavailable.','Follow the chosen availability and recovery contract; avoid claiming instant failover without tested architecture.'),('Debugging: A restored service has old data.','Inspect recovery point, backup age, restore verification, and the actual write path.')],language='text')

area('engineering','Maintainable code, architecture, and observability','P1','javascript git','testing api system-design',
'https://opentelemetry.io/docs/concepts/observability-primer/','https://12factor.net/',
'''Clean code|1|Names, small coherent contracts, explicit boundaries, and readable control flow make change easier to assess.
SOLID|2|SOLID principles describe responsibility and substitutability concerns; applying them mechanically can overcomplicate small systems.
DRY|1|Remove duplicated knowledge whose inconsistent evolution would cause bugs; similar-looking code can have different reasons to change.
KISS|0|Prefer a simple sufficient model that makes the important behavior visible.
YAGNI|1|Delay speculative capabilities until a real requirement justifies their cost.
Design patterns|2|Patterns name recurring solutions and tradeoffs; choose them for a concrete problem rather than a diagram collection.
Architecture patterns|2|Architectural styles organize dependency and deployment boundaries under specific constraints.
Layered architecture|1|Layers separate transport, domain, and persistence responsibilities when this clarifies ownership.
MVC|2|MVC separates model, view, and controller roles, though framework interpretations vary.
Clean architecture|2|Clean architecture directs dependencies toward domain behavior and uses adapters around external systems.
Dependency injection|1|Pass dependencies explicitly so authority, failure behavior, and test boundaries are visible.
Error handling|0|Translate errors at meaningful boundaries without losing diagnostic context or exposing secrets.
Logging|1|Logs record contextual events; structured fields help query them and redaction prevents sensitive disclosure.
Observability|1|Logs, metrics, and traces provide evidence about internal behavior; useful signals are tied to concrete questions.
Documentation|0|Document contracts, decisions, setup, limitations, and verification so another developer can act without guessing.''',
'A project survives when another engineer can change one rule without accidentally changing unrelated behavior. Architecture should help a concrete change rather than create layers for their own sake.',
'Put domain rules where they can be named and tested. Let HTTP controllers translate protocol details, services decide domain outcomes, and store adapters establish persistence behavior. Inject a store instead of reading a global singleton inside every function. Record a decision with alternatives, constraints, expected benefit, and a condition that would make you revisit it. Add telemetry to answer specific failure questions.',
'''function createTaskService(store) {
  return {
    async rename(owner, id, title, expectedVersion) {
      if (typeof title !== 'string' || !title.trim()) throw new Error('Invalid title');
      return store.updateTask(owner, id, {title:title.trim(), expectedVersion});
    }
  };
}''',
'The service requires a store matching the stated contract. It rejects a blank title before calling the store; persisted ownership and version safety still belong in the adapter. A production error type should preserve a safe code.',
'Dependency direction affects which details propagate through a change. Observability correlates events through a request or job id, while metrics aggregate signals such as latency distribution and error rates. A high-cardinality label can overwhelm a metrics system even when each request is cheap.',
'Explain why the existing workspace separates app, validation, and store. Add a request id and safe duration/status fields without logging credentials or full payloads.',
['Creating generic repositories before understanding the actual invariant.','Hiding errors in an empty catch or returning a success-looking fallback.','Logging every user id as an unbounded metrics label.'],
['Beginner: name one function by its actual contract.','Intermediate: inject a store and simulate one expected failure.','Advanced: write a decision record comparing two persistence boundaries.','Challenge: diagnose a slow workflow with a correlated trace, logs, and a bounded metric.'],
'Refactor one workspace domain only when it improves a demonstrated change. Include before/after behavior, a dependency diagram, and a test showing the invariant remains intact.',
[('Beginner: Is shorter code always cleaner?','No. Visible intent, correct boundaries, and understandable behavior matter more than line count.'),('Intermediate: When should duplication remain?','When the similar code expresses independently changing knowledge and extraction would couple it unnecessarily.'),('Advanced: What does dependency injection establish?','Explicit dependency ownership and replaceable boundaries; it does not prove the substitute behaves like a real store.'),('Scenario: Every small change touches many layers.','Inspect unnecessary abstractions and ownership; simplify the boundary around the actual rule.'),('Debugging: A request fails with no useful context.','Propagate a correlation id, classify the error safely, and retain cause information in controlled server diagnostics.')])

area('system-design','System design, consistency, and failure tradeoffs','P1','api mongodb','redis realtime cloud',
'https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html','https://www.mongodb.com/docs/manual/replication/',
'''Scalability|1|Scalability is the ability to support a changing workload under stated resource and performance constraints.
Availability|1|Availability describes whether useful service is accessible under defined failure conditions.
Reliability|1|Reliability concerns correct operation over time, including detection, recovery, and preserved invariants.
Load balancing|2|Load balancers distribute requests among eligible targets; health and connection behavior affect outcomes.
Caching|1|Caching reuses representations under scope and freshness rules; invalidation and stampede behavior matter.
Database scaling|2|Improve schema, queries, indexes, and workload before choosing replication or partitioning complexity.
Replication|2|Replicas copy data with lag and failure behavior; reads need consistency requirements.
Sharding|3|Sharding partitions data and introduces routing, balancing, hotspot, and cross-partition concerns.
Queues|1|Queues decouple work with acknowledgment, retry, backpressure, and idempotency contracts.
Pub/Sub|2|Publish/subscribe routes events to interested consumers; durability depends on the chosen system and configuration.
CDN|2|CDNs distribute reusable content and require cache-key, invalidation, and privacy policies.
Rate limiting|1|A limiter constrains work under explicit identity, window, deployment scope, and failure behavior.
CAP theorem|3|During a network partition, a distributed system cannot guarantee both linearizable consistency and availability in the theorem's sense.
Consistency|1|Consistency models describe which observations are permitted; choose requirements for each operation.
Distributed systems|3|Multiple nodes communicate under delay, failure, and partial knowledge; local success is not a global guarantee.
High-level design|1|High-level design identifies components, data flow, scale assumptions, and failure boundaries.
Low-level design|1|Low-level design describes data models, interfaces, states, algorithms, and invariants inside those components.''',
'A diagram with many boxes does not explain what the product guarantees. System design begins with users, workload, latency, consistency, and acceptable failure.',
'State requirements and assumptions before picking technology. Estimate workload and identify the first bottleneck. Choose an invariant such as stock never becoming negative, then trace competing writes, retries, and partial failure. For business events, writing state and then publishing can lose the event during a crash; an outbox stores the state change and event record together and a publisher retries. Consumers need deduplication because retries can repeat delivery.',
'''// Illustrative inventory contract, not a complete reservation workflow
update inventory
where productId = requestedId and available >= requestedQuantity
set available = available - requestedQuantity
// Success depends on one atomic database predicate, not a prior UI check.''',
'A conditional persisted update can protect a nonnegative stock invariant. A full reservation flow also needs quantity validation, expiry, payment coordination, and idempotency; this pseudocode does not implement them.',
'Network timeout means the caller lacks certainty, not that the server did nothing. Exactly-once transport should not be assumed; a durable idempotent business transition can prevent repeated effects. CAP is not a rule to casually choose any two letters outside the relevant partition scenario.',
'Design a notification center, URL shortener, or inventory service. Tie each added component to a specific requirement and explain the smallest initial deployment.',
['Starting with sharding before defining access patterns.','Claiming an in-memory Set prevents duplicate effects after restart.','Treating a timeout as proof that a write failed.'],
['Beginner: distinguish latency and throughput with units.','Intermediate: state consistency requirements for profile reads and purchases.','Advanced: trace a crash between state commit and event publish.','Challenge: test duplicate delivery and stale workers while preserving a persisted invariant.'],
'Write a design packet for inventory reservation or notifications: assumptions, data model, failure matrix, recovery, sizing, and one runnable invariant test.',
[('Beginner: What is a useful scale estimate?','A stated assumption with units tied to the operation or storage workload.'),('Intermediate: Why do queue consumers need idempotency?','Retries or replay can deliver the same work more than once.'),('Advanced: What does an outbox solve?','It closes the state-change/event-record gap when both are stored in the same transaction boundary; publishing still needs retries and duplicate handling.'),('Scenario: A payment callback repeats after restart.','Use a persisted provider operation id and an atomic state transition to prevent a second effect.'),('Debugging: The feed skips items during inserts.','Inspect ordering and continuation predicates; use a stable tie-breaker and define snapshot expectations.')],language='text')

area('api','REST contracts, GraphQL, and API evolution','P0','foundations javascript','express security testing',
'https://spec.openapis.org/oas/latest.html','https://graphql.org/learn/',
'''REST|0|REST organizes interaction around resources and representations; use coherent HTTP semantics rather than arbitrary action names.
GraphQL|2|GraphQL uses a typed schema and selection sets; resolvers still need authorization, cost bounds, and error contracts.
HTTP methods|0|Methods have semantics such as retrieval, replacement, and partial update; choose them consistently.
Status codes|0|Status codes describe response outcomes; preserve distinctions clients need for recovery.
Headers|0|Headers carry representation, caching, authentication, and other protocol metadata.
Authentication|0|Authentication establishes the caller's trusted identity from accepted credentials.
Authorization|0|Authorization establishes whether that caller may perform this operation on this resource.
Pagination|1|Lists need bounded sizes and a stable continuation or offset contract.
Filtering|1|Supported filter fields and operators should be explicit and validated.
Sorting|1|Document ordering, allowed fields, and tie-breakers rather than accepting arbitrary expressions.
Versioning|2|Versioning manages incompatible contract changes; keep compatibility policy visible to consumers.
Validation|0|Validate runtime shape, types, ranges, allowed fields, and domain relationships.
Error handling|0|Return safe structured errors with a stable code and useful message; preserve server diagnostic context separately.
Rate limiting|1|Define caller identity, window policy, distributed scope, and recovery guidance.
API documentation|0|Document authentication, inputs, outputs, errors, limits, and examples for actual implemented behavior.
OpenAPI / Swagger|1|OpenAPI describes HTTP contracts; Swagger is a family of tools around API descriptions rather than another protocol.''',
'The client needs to know how to recover from invalid input, missing authority, and concurrent edits. An explicit contract allows independent implementation and useful integration tests.',
'Begin with resource identity and permitted operations. State required fields, server-owned fields, status behavior, and error representation. A 409 conflict can tell the UI to refresh before reapplying intent. Retries need idempotency: repeating a create request can duplicate work unless the server establishes a unique operation identity. GraphQL changes request composition, not trust boundaries.',
'''const error = {
  error:{code:'VERSION_CONFLICT', message:'Refresh before editing again'}
};
// Example HTTP outcome: 409 with application/json.
// Client preserves the draft, refreshes current data, and asks for reconciliation.''',
'This illustrates the workspace conflict response, not an executable server. The durable version predicate decides the conflict; the response defines client recovery.',
'Proxies, caches, browsers, clients, and servers all interpret protocol information. An OpenAPI document is a description and can drift from code; contract tests should check important examples. GraphQL query flexibility requires limits on depth, amount of work, and authorization inside resolvers.',
'Write an OpenAPI contract for the implemented workspace routes and compare it with API tests. Keep list limits and full-account summary semantics explicit.',
['Returning 200 for every failure.','Publishing an API description for features the source does not implement.','Treating GraphQL schema types as a replacement for identity and permissions.'],
['Beginner: describe a read and create request with status and content type.','Intermediate: document invalid input, expired session, and conflict recovery.','Advanced: design a cursor that includes a stable tie-breaker.','Challenge: model retried create operations and prove duplicate business effects do not occur.'],
'Add an executable API contract packet for the workspace with examples, errors, and regression evidence. Extend it only when the corresponding behavior exists.',
[('Beginner: How do authentication and authorization differ?','Authentication establishes identity; authorization decides permitted actions.'),('Intermediate: Why bound a list?','To control response size and resource usage while defining a continuation contract.'),('Advanced: Does GraphQL make a query cheap?','No. Resolver work and result cardinality need explicit limits and measurement.'),('Scenario: A timeout is followed by a duplicate create.','The first operation may have succeeded; use a persisted idempotency contract before automatic replay.'),('Debugging: Documentation says a field is required but the server accepts none.','Reconcile schema and implementation and add a contract regression test.')])

area('security','Authentication, authorization, and web security boundaries','P0','api nodejs','express devops realtime',
'https://cheatsheetseries.owasp.org/','https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html',
'''Password hashing|0|Store a password-specific salted verifier with suitable cost, not reversible plaintext encryption.
bcrypt|1|bcrypt is a password-hashing option with cost and input-length considerations; follow current guidance for new systems.
JWT|1|A signed JWT provides integrity for claims, not confidentiality; validate issuer, audience, algorithm, and expiry.
Access tokens|1|Access credentials authorize a bounded scope and lifetime; keep exposure and revocation needs explicit.
Refresh tokens|2|Refresh credentials renew access and need protected storage, rotation, reuse detection, and revocation policy.
Cookies|0|Cookie attributes control scope and handling; HttpOnly blocks ordinary script reads but does not stop all authenticated abuse.
Sessions|0|Server-side sessions support expiry and revocation; store only necessary authority and enforce expiry during lookup.
OAuth|2|OAuth delegates access under a protocol; identity login usually also needs an appropriate identity layer such as OpenID Connect.
RBAC|1|Role-based permissions group allowed actions; object ownership and tenant scope still need enforcement.
CORS|0|CORS controls browser cross-origin response access; it is not API authentication and does not stop non-browser callers.
CSRF|0|Cookie-authenticated writes need cross-site request defenses such as suitable tokens, origin checks, and SameSite policy.
XSS|0|Untrusted content executed in the page can act with the page's privileges; render data safely and constrain script execution.
SQL injection|0|Parameterized queries separate values from SQL structure; dynamic identifiers require allowlists.
NoSQL injection|0|Construct permitted query predicates from validated scalars instead of accepting arbitrary operator objects.
Rate limiting|1|Limit abuse according to a defined identity and deployment scope; consider cost and recovery as well as request count.
Helmet|1|Helmet sets security-related HTTP headers, but does not replace input validation or authorization.
Secure headers|1|Headers can constrain browser capabilities and content interpretation; configure them for the actual deployment.
Secrets|0|Keep secrets out of source, logs, browser bundles, and artifacts; rotate compromised credentials.
OWASP|1|OWASP offers threat-focused guidance; use it to evaluate concrete application boundaries.
Security best practices|0|Define assets, threats, trusted identities, permitted operations, and recovery; verify them with adversarial cases.''',
'A valid session does not authorize access to every object. Security emerges from explicit boundaries and server-enforced invariants rather than from one token format.',
'Trace identity through every read and write. Never trust an owner or role supplied by the browser. Use a random session token, keep a digest server-side, expire it during lookup, and revoke it on logout. For cookie-authenticated writes, define CSRF and origin defenses for the deployment; HttpOnly and CORS alone are insufficient. Use HTTPS and appropriate cookie scope in deployment.',
'''const predicate = {_id: itemId, owner: authenticatedUserId};
// Both identity and object scope belong in the persistence predicate.
const response = {id: item.id, title: item.title};
// Deliberately omit passwordHash, session tokens, and internal authorization data.''',
'This boundary illustration returns only public fields from an authorized item. It requires validated identifiers and a trusted authenticatedUserId; substituting a body owner would invalidate the design.',
'Signed token payloads are usually readable encodings. Cookies can be automatically attached to requests, which motivates CSRF defenses. A compromised page can initiate requests even when it cannot read an HttpOnly cookie. Defense layers reduce different classes of risk and should not be described as interchangeable.',
'Run the workspace two-user tests and revocation test. Document its single-origin deployment assumption and missing production capabilities rather than calling it a finished identity service.',
['Putting passwords or confidential data inside a signed JWT.','Checking ownership only after returning data.','Disabling TLS or broadening origin checks to make a deployment appear to work.'],
['Beginner: distinguish authentication, authorization, and validation.','Intermediate: attempt every endpoint as another owner.','Advanced: verify session expiry independently of TTL cleanup.','Challenge: design refresh-token reuse detection and a recovery path without inventing a custom cryptographic protocol.'],
'Create a threat model for the task board covering XSS, CSRF, object access, brute-force cost, secret leakage, and operational recovery. Link each implemented control to a test or deployment requirement.',
[('Beginner: Is a signed JWT encrypted?','No. Signing protects integrity; encryption is a separate capability.'),('Intermediate: Does CORS protect an API from curl?','No. It governs selected browser behavior, not authorization for arbitrary clients.'),('Advanced: Why check expiry when a TTL index exists?','TTL cleanup is asynchronous; a remaining document can already be expired.'),('Scenario: User A sends user B\'s id.','Scope the persisted operation to the trusted owner and test unchanged data for B.'),('Debugging: Secure cookies disappear locally.','Inspect HTTPS, cookie scope, SameSite, and deployment topology; keep production protections intact.')])

area('realtime','WebSockets, SSE, and recoverable real-time delivery','P2','async api security','redis system-design',
'https://socket.io/docs/v4/','https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events',
'''WebSockets|2|WebSockets provide bidirectional messages over a long-lived connection; application protocols still define identity and delivery.
Socket.IO|2|Socket.IO adds its own protocol, reconnection, rooms, and acknowledgements; it is not wire-compatible with plain WebSocket clients.
Server-Sent Events|2|SSE streams server-to-client events over HTTP; EventSource handles connection behavior while replay needs application design.
Notifications|2|Notifications need ownership, stable event ids, read state, and a catch-up mechanism after disconnect.
Chat architecture|3|Chat combines durable messages, authorized rooms, delivery acknowledgements, ordering, and reconnect recovery.
Presence|3|Presence is typically an expiring observation of connectivity, not a durable statement that someone is actively reading.
Real-time dashboards|2|Dashboards need bounded update frequency, backpressure, and a consistent initial snapshot or replay position.''',
'A live connection can disconnect at the exact moment an event is sent. Reliable product behavior needs durable state and recovery in addition to transport.',
'Choose SSE for predominantly one-way updates and a bidirectional protocol when both directions need live messages. Authenticate the connection and authorize every room subscription. Persist business state before announcing it. Carry stable event ids and let a reconnecting client retrieve missed changes or refresh authoritative state. An acknowledgement is not proof that every downstream business effect is complete.',
'''const events = new EventSource('/api/events');
events.addEventListener('task-updated', event => {
  const update = JSON.parse(event.data);
  console.log(update.id, update.version);
});
// On view cleanup: events.close();''',
'In a browser with a matching authorized SSE endpoint, task-updated messages log the supplied id and version. This is a client fragment; the current workspace does not yet expose that endpoint.',
'A transport connection and a durable event log are separate things. Network partitions, process restart, and multiple publishers can change observed ordering. A snapshot followed by subscription can lose intervening writes unless a replay position or reconciliation protocol closes the gap.',
'Extend the task board with notifications while retaining database versions. On reconnection, refresh current tasks before applying further changes.',
['Broadcasting every account\'s updates to every connection.','Assuming automatic reconnect replays missed messages.','Letting the message stream grow an unbounded UI list.'],
['Beginner: compare polling, SSE, and bidirectional messaging.','Intermediate: close a subscription when the view unmounts.','Advanced: disconnect between persistence and notification and recover the current state.','Challenge: coordinate a snapshot and replay cursor without dropping a concurrent event.'],
'Build a notification-center extension with authenticated streams, stable ids, pagination, duplicate handling, reconnect recovery, and explicit transport limitations.',
[('Beginner: Can SSE send arbitrary client-to-server messages?','SSE is server-to-client; use separate requests for writes.'),('Intermediate: Is Socket.IO a plain WebSocket protocol?','No. It adds its own protocol and transport behavior.'),('Advanced: What does presence prove?','Only a bounded observation under the chosen heartbeat and expiry rules.'),('Scenario: A client reconnects after five missed updates.','Replay from a known position or reconcile from authoritative state.'),('Debugging: A dashboard repeats an event.','Deduplicate stable event ids and inspect retries and replay boundaries.')])

area('testing','Behavioral testing across units, databases, and browsers','P0','javascript api','react express devops',
'https://testing-library.com/docs/react-testing-library/intro/','https://playwright.dev/docs/intro',
'''Unit testing|0|A unit check exercises a small behavioral contract with controlled inputs and an independent expected outcome.
Integration testing|0|Integration checks exercise boundaries between real components such as HTTP parsing and persistence.
API testing|0|API checks verify identity, input, status, representation, ownership, and failure behavior.
Component testing|1|Component checks exercise visible interaction and state without relying unnecessarily on implementation structure.
End-to-end testing|1|Browser workflows exercise important user paths through realistic routing, focus, network, and persistence.
Jest|2|Jest supplies a test runner and mocking ecosystem; configuration and environments affect module behavior.
Vitest|1|Vitest integrates with Vite-oriented projects and offers runner and mocking capabilities.
React Testing Library|1|Testing Library encourages user-oriented queries and interaction rather than component internals.
Supertest|1|Supertest drives HTTP applications through request assertions; its boundary scope must still be stated.
Playwright|1|Playwright automates real browsers with locators, assertions, traces, and workflow tools.
Cypress|2|Cypress offers browser-oriented end-to-end and component testing with its own execution model.''',
'A passing test is useful only when its expected behavior could detect a meaningful failure. Syntax checks and mocks cannot establish database uniqueness or browser focus behavior.',
'Choose the smallest realistic boundary for the risk. Test a reducer without a browser, a unique index against a real database, and modal focus in a real browser. Use accessible roles and names for interaction. Control nondeterministic inputs deliberately; wait for a visible condition rather than sleeping for an arbitrary duration. Make the failure message describe the broken contract.',
'''import test from 'node:test';
import assert from 'node:assert/strict';
test('total includes all positive integer cents', () => {
  const amounts = [1234, 100];
  const total = amounts.reduce((sum, n) => sum + n, 0);
  assert.equal(total, 1334);
});''',
'Run with node --test on a saved module; the assertion passes for 1334. In application tests, call the actual domain function rather than rewriting its implementation in the test.',
'Mocks replace part of the system and therefore reduce what the test establishes. A fake store cannot prove MongoDB atomic predicates or index behavior. Coverage reports measure execution, not the quality of assertions or missing requirements.',
'Compare toolkit tests, UI reducer tests, MongoDB API tests, and Edge browser smoke tests. State which failure each catches and which dependency remains outside its scope.',
['Testing that a mocked function returns its own configured result.','Waiting a fixed timeout for every browser transition.','Reporting a syntax or unit check as proof that deployment works.'],
['Beginner: state expected outputs for three boundary inputs.','Intermediate: add a regression check for a reproduced bug.','Advanced: run competing writes against a real database.','Challenge: verify keyboard focus and data recovery during a network failure in a browser.'],
'Create a test matrix for one workspace feature: pure validation, HTTP contract, persisted invariant, and browser recovery. Remove redundant checks that do not add evidence.',
[('Beginner: What makes an assertion useful?','It compares observed behavior with an independently justified expected result.'),('Intermediate: When should a real database be used?','When correctness depends on database behavior such as uniqueness, atomicity, or query semantics.'),('Advanced: What does full coverage not prove?','Correct assertions, complete requirements, realistic data, or operational behavior.'),('Scenario: Tests pass but users cannot focus a modal control.','Add browser keyboard and focus checks; a simulated DOM may miss the actual interaction.'),('Debugging: A test intermittently fails.','Inspect shared state, timing assumptions, cleanup, ordering, and uncontrolled external dependencies.')])

area('devops','Containers, CI/CD, and operating a web service','P1','nodejs git security','cloud engineering',
'https://docs.docker.com/get-started/','https://docs.github.com/en/actions',
'''Linux|1|Linux provides process, filesystem, permission, networking, and service primitives commonly used in deployments.
Shell|1|Shell commands operate on files and processes; quoting and argument boundaries prevent accidental interpretation.
Environment variables|0|Validate configuration at startup and keep secrets separate from source and images.
Docker|1|Docker packages applications with runtime dependencies using images and managed containers.
Docker Compose|1|Compose defines a multi-service application for a chosen environment; local convenience is not a complete production plan.
Images|1|Images contain filesystem layers and runtime metadata; build reproducibly and avoid baking secrets into layers.
Containers|1|Containers are isolated processes sharing host infrastructure, not complete independent virtual machines.
Volumes|1|Volumes persist data beyond a container lifecycle and need backup and restore procedures.
Networks|1|Container networks define communication paths; avoid exposing internal databases unnecessarily.
CI/CD|1|CI validates proposed changes; delivery prepares releases; deployment changes a running environment under a release policy.
GitHub Actions|1|Actions workflows coordinate jobs with explicit triggers, inputs, and permissions.
Nginx|2|Nginx can serve static resources and reverse-proxy HTTP; forwarded-header and timeout configuration need care.
Reverse proxy|1|A proxy sits between clients and services and can handle routing, TLS, limits, or static assets.
SSL/TLS|1|TLS encrypts transport and authenticates endpoints; SSL is historical terminology for obsolete predecessor protocols.
Deployment|1|Deployment includes configuration, migrations, health, rollback, and dependency availability.
Monitoring|1|Monitoring observes signals and actionable conditions; a reachable process is not necessarily ready to serve.
Logging|1|Structured logs support diagnosis while preserving secrecy and limiting volume.''',
'A successful build only proves that artifacts were created. Operating the service requires configuration, data durability, health, release, and recovery contracts.',
'Create a repeatable image from a lockfile, run as an appropriate non-root user, validate environment, and keep database state in intentional storage. Bind local databases to loopback for learning. CI should exercise meaningful source and database checks before a release is proposed. Separate liveness from readiness so a process that cannot reach its required store does not receive normal traffic.',
'''# Existing workspace, with a running Docker engine
docker compose up -d mongo
docker compose ps
docker compose logs --tail=30 mongo
# Run npm ci, npm test, and npm run build separately as documented.''',
'These commands start the workspace\'s local MongoDB service and inspect it. They require Docker Engine/Desktop running. This environment has not established a complete production Compose rollout.',
'Image layers are reusable filesystem snapshots; containers add runtime process state. Removing a container is distinct from intentionally destroying a volume. Signal handling and HTTP drain behavior determine what happens to in-flight requests during release.',
'Prepare a deployment packet for the workspace with health checks, secret names, persistent-data ownership, migration order, rollback, and a tested restore procedure.',
['Committing secrets or passing them as permanent image build arguments.','Treating docker compose up as evidence that backups and rollback work.','Trusting every forwarded client IP without a proxy configuration.'],
['Beginner: distinguish image, container, and volume.','Intermediate: inspect logs and health after a controlled startup failure.','Advanced: test a slow request during service replacement.','Challenge: restore a disposable backup and compare data rather than assuming the backup is usable.'],
'Add a container and CI packet for the existing source, then verify the image and recovery in an environment with a running engine. Record unexecuted steps honestly.',
[('Beginner: Is a container the same as a VM?','No. Container isolation normally shares host kernel infrastructure.'),('Intermediate: What does a volume protect?','It separates persistent data lifetime from the container; backup and restore still need design.'),('Advanced: Why distinguish readiness and liveness?','Readiness controls traffic eligibility; liveness asks whether the process should be restarted.'),('Scenario: A release runs with missing secrets.','Fail startup validation with a safe diagnostic rather than entering a partially working state.'),('Debugging: The app works locally but cannot reach MongoDB in Compose.','Inspect service DNS, network, connection URI, port assumptions, and database startup state.')],language='bash')
