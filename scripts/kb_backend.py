"""Original server and data lessons; imported by build-knowledge-base.py."""
from kb_content import area

area('nodejs','Node.js runtime, resources, and asynchronous services','P0','javascript async','express devops testing',
'https://nodejs.org/docs/latest-v24.x/api/','https://nodejs.org/en/learn/asynchronous-work/dont-block-the-event-loop',
'''Runtime fundamentals|0|Node executes JavaScript with host capabilities such as files, networking, and processes rather than a browser DOM.
V8|2|V8 parses and executes JavaScript and manages memory; Node combines it with other runtime components.
Modules|0|Modules define explicit dependency boundaries; loading behavior depends on ESM or CommonJS configuration.
CommonJS|1|CommonJS uses require and module.exports with its own loading and interoperability behavior.
ESM|0|ESM uses import and export; package type and extensions affect how Node interprets files.
npm|0|npm manages package metadata and dependency installation; a lockfile makes the chosen graph reproducible.
package.json|0|The manifest defines scripts, module type, dependency ranges, and supported runtime expectations.
File system|1|Filesystem APIs operate on paths and data; prefer asynchronous work in request handlers and constrain user-influenced paths.
Events|1|Runtime events announce lifecycle changes; handle required error events and remove unnecessary listeners.
EventEmitter|1|EventEmitter invokes registered listeners according to its contract; asynchronous listener failures require deliberate handling.
Buffers|2|Buffers represent binary bytes rather than Unicode text and require explicit encoding decisions.
Streams|1|Streams process data incrementally; backpressure prevents producers from overwhelming consumers.
HTTP|0|Node exposes request and response primitives, while a framework can organize validation and routing above them.
Networking|2|Sockets and connection pools consume finite resources; timeouts and lifecycle cleanup matter.
Process|1|The process has signals, exit status, resources, and environment; shutdown must account for in-flight work.
Environment variables|0|Environment variables configure deployment; parse required values at startup and keep secrets out of logs.
Child processes|3|Child processes run separate programs; avoid interpolating untrusted data into shell command strings.
Worker threads|2|Workers can run CPU-heavy JavaScript outside the request thread, with messaging and resource costs.
Cluster|3|Cluster supports multiple Node processes; process-local state is not a shared authoritative database.
Event loop|0|Node coordinates asynchronous work through runtime phases and queues; expensive synchronous work blocks progress.
Async programming|0|Handle ordering, failures, bounded concurrency, and cleanup explicitly.
Error handling|0|Separate expected domain errors from unexpected runtime failures and preserve useful diagnostic context.
Performance|1|Profile latency, CPU, allocation, and resource contention with a representative workload.
Security|0|Constrain inputs, file paths, commands, secrets, dependency access, and network capabilities.
Testing|0|Exercise contracts with unit, integration, and real-network checks appropriate to the boundary.''',
'One blocked request thread can delay many unrelated clients. Runtime knowledge helps decide whether work should be streamed, queued, moved to a worker, or made smaller.',
'Separate JavaScript execution from asynchronous I/O progress. A function declared async can still block while computing. Stream large data with backpressure and use pipeline so errors and cleanup compose. Limit database and remote-service concurrency instead of creating unbounded Promises. Define shutdown as stop accepting, drain to a deadline, close dependencies, and terminate remaining work.',
'''import {createReadStream, createWriteStream} from 'node:fs';
import {pipeline} from 'node:stream/promises';
await pipeline(createReadStream('input.txt'), createWriteStream('copy.txt'));
console.log('copy complete');''',
'With an existing input.txt and writable destination, copy.txt contains the same bytes. A missing input rejects pipeline and must be reported at the application boundary. This creates or overwrites the destination in the chosen directory.',
'Some I/O uses operating-system mechanisms and some work uses a runtime worker pool. Worker threads are separate from that pool. A saturated pool or synchronous CPU loop can both increase latency, but need different evidence and fixes.',
'Add correlation-aware logs and a bounded report operation to the workspace. Compare concurrent request latency before and after moving CPU work away from the request thread.',
['Reading a huge file synchronously per request.','Leaving listeners or handles alive after a job completes.','Using a process-local mutex as proof of multi-instance consistency.'],
['Beginner: inspect package type and run a matching module.','Intermediate: stream a large file and reproduce an input error.','Advanced: profile CPU blocking under concurrent requests.','Challenge: terminate a service during a slow request and verify its documented drain deadline.'],
'Build a report worker with a bounded queue, job status, and cancellation policy. Provide measurements and document where durable storage would be required.',
[('Beginner: Does Node supply document.querySelector?','No. The browser DOM is not part of the ordinary Node host.'),('Intermediate: Why is pipeline preferable to unmanaged piping?','It coordinates stream completion, errors, and cleanup through a single outcome.'),('Advanced: Does await move CPU work to a worker?','No. Explicit worker or process execution is needed for that change.'),('Scenario: Latency rises during export.','Profile CPU and resource queues; use incremental I/O or a bounded worker according to the measured bottleneck.'),('Debugging: Shutdown hangs.','Inspect active handles, connections, timers, and unbounded in-flight work; establish a deadline.')])

area('express','Express services, validation, and protected REST routes','P0','nodejs api','mongodb security testing',
'https://expressjs.com/en/guide/migrating-5.html','https://expressjs.com/en/advanced/best-practice-security.html',
'''Server creation|0|Create an application, mount middleware and routes, then listen through an HTTP server with a controlled lifecycle.
Routing|0|Routing selects handlers by method and path; unknown API paths must not silently become frontend HTML.
Middleware|0|Middleware can inspect, transform, terminate, or delegate a request; order defines behavior.
Request/response|0|Requests contain untrusted inputs; responses implement the API status, headers, and representation contract.
Controllers|1|Controllers adapt HTTP details to validated service inputs and domain outcomes.
Services|1|Services own domain rules that should not depend unnecessarily on the HTTP transport.
REST APIs|0|REST uses resources and representations with coherent HTTP semantics and operational contracts.
Validation|0|Validate types, lengths, allowed fields, ranges, and relationships before trusted use.
Error handling|0|Centralize safe client errors while retaining server diagnostic evidence; Express 5 forwards rejected returned Promises.
Authentication|0|Resolve identity from trusted credentials rather than client-supplied role or owner fields.
Authorization|0|Every read and write must enforce the authenticated caller's permission for the resource.
Cookies|1|Cookies are browser-managed values with scope and security attributes; they can accompany cross-site requests under applicable rules.
Sessions|0|Sessions connect credentials to server-side authority with expiration and revocation.
File uploads|2|Limit size and count, validate content, isolate storage, and avoid trusting original filenames or declared MIME type.
Pagination|1|Bound lists and define stable ordering and a cursor or offset contract.
Filtering|1|Allowlist supported predicates and normalize values rather than accepting arbitrary query operators.
Sorting|1|Allowlist fields and directions with a stable tie-breaker when needed.
Searching|1|Specify matching behavior and bound query cost; avoid uncontrolled patterns or arbitrary regular expressions.
Rate limiting|1|Choose keys and scope; a process-local limiter is not a consistent global limit across instances.
Logging|1|Record useful request context and safe errors while redacting secrets and sensitive payloads.
Security|0|Layer input constraints, identity, authorization, origin defenses, safe headers, and operational limits.
API architecture|1|Separate transport, domain behavior, and persistence so tests can target the relevant contract.
Production structure|1|Include startup validation, repeatable builds, safe error behavior, monitoring, graceful shutdown, and deployment requirements.''',
'A route that works for one happy path can expose another owner\'s data or fail under concurrent writes. Explicit boundaries make these failures testable.',
'Build fields from validated scalar inputs. Authenticate before privileged work, derive owner from the trusted identity, and include it in every persistence predicate. Middleware that responds should not continue into another responder. A catch-all frontend route must exclude API paths. Express 5 handles rejected returned Promises; callback failures still require appropriate error forwarding.',
'''app.patch('/api/tasks/:id', requireSession, async (req, res) => {
  const fields = validateTaskPatch(req.body);
  const task = await store.updateTask(req.user.id, req.params.id, fields);
  res.json(task);
});
// store uses owner and expectedVersion in one atomic update predicate.''',
'This integration fragment uses the workspace-style service contract; it requires app, requireSession, validator, and store implementations. The server-derived owner cannot be replaced by a body field.',
'A middleware chain is a control-flow pipeline over one request. Parsing limits apply before domain validation. Correct client recovery may depend on distinguishing invalid input, missing or unowned resource, expired session, and conflict.',
'Run the actual workspace ownership, malformed-body, uniqueness, session, and conflict tests. Trace which layer rejects each case.',
['Spreading request.body into an update.','Sending raw database or stack-trace errors to the browser.','Checking ownership only in the interface.'],
['Beginner: identify middleware order for one write.','Intermediate: reproduce a malformed JSON and an unsupported field.','Advanced: run simultaneous same-version updates against MongoDB.','Challenge: add a filtered cursor list without permitting arbitrary client query objects.'],
'Add a documented bookmark search endpoint with owner scope, bounded results, safe errors, and a contract test for another user\'s ids.',
[('Beginner: What does middleware do?','It participates in request control flow and can terminate or delegate processing.'),('Intermediate: Why is server validation necessary?','Clients can send arbitrary HTTP inputs regardless of form validation.'),('Advanced: Does Express 5 catch every callback error?','No. Its Promise forwarding applies to returned rejected Promises; callback APIs still need proper handling.'),('Scenario: Two clients edit the same task.','Apply the expected version in one persisted predicate and surface a conflict for recovery.'),('Debugging: API returns the app shell.','Inspect fallback route order and exclude API paths from the frontend fallback.')])

area('mongodb','MongoDB modeling, querying, and persisted invariants','P0','javascript api','mongoose sql system-design',
'https://www.mongodb.com/docs/manual/','https://www.mongodb.com/docs/manual/core/write-operations-atomicity/',
'''Documents|0|Documents hold structured fields and nested values; model them around access and ownership patterns.
Collections|0|Collections group documents and can have validation rules and indexes.
BSON|1|BSON is MongoDB's binary representation with types beyond JSON, including ObjectId and dates.
CRUD|0|Create, read, update, and delete must preserve domain constraints and caller scope.
Operators|1|Operators express matching and updates; build permitted expressions rather than accepting arbitrary input operators.
Querying|0|A query selects documents according to predicates, available indexes, and execution behavior.
Projection|1|Projection limits fields returned; it can reduce transfer and prevent accidental disclosure.
Sorting|1|Sort determines order; include a tie-breaker when pagination requires stable identity.
Pagination|1|Cursor pagination continues from a defined position; offset pagination can shift when earlier rows change.
Indexes|0|Indexes support selected access patterns and enforce uniqueness when configured; they add write and storage cost.
Aggregation|1|A pipeline transforms a stream of documents through ordered stages such as match, group, and project.
Transactions|1|Multi-document transactions coordinate invariants when one atomic document operation cannot express them; deployment support matters.
Schema design|0|Define required types and relationships despite flexible storage; schema evolution needs intentional migration.
Data modeling|0|Embedding and references trade read locality, growth, duplication, and independent lifecycle.
Replication|2|Replica sets provide multiple copies and failover behavior; read/write concern choices affect guarantees.
Performance|1|Inspect explain plans and representative data; document and query shapes matter more than a database label.''',
'The database must establish invariants that survive multiple clients and processes. An application read followed by a write is vulnerable to another writer acting between them.',
'Begin with reads, writes, growth, owner scope, and consistency requirements. Embed bounded data updated together; reference independently growing or shared entities. Make uniqueness a real unique index. For edits, include owner and expected version in one update predicate and increment the version in that operation. A single-document write is atomic; multiple dependent writes may need a transaction or a different model.',
'''// mongosh example: first create this document
db.tasks.insertOne({_id: 'demo', owner:'a', version:0, status:'todo'});
db.tasks.updateOne(
  {_id:'demo', owner:'a', version:0},
  {$set:{status:'done'}, $inc:{version:1}}
);
// Repeating the same version predicate matches zero documents.''',
'In a disposable MongoDB database, the first update matches one record and advances version to 1. Repeating version 0 matches none. Do not run sample inserts in a production database.',
'Indexes narrow the search space but do not make all predicates inexpensive. An explain plan should compare examined documents and keys with returned results. Aggregation order affects intermediate data size and meaning. Transactions require an appropriate deployment and do not replace explicit input or ownership checks.',
'Use the existing task conflict and unique-email tests with a real MongoDB process. Compare a bounded list with an expense aggregate across all account records.',
['Using a read-before-insert duplicate check without a unique index.','Embedding an unbounded growing history inside one document.','Treating flexible schema as permission to accept arbitrary shapes.'],
['Beginner: write CRUD with an owner predicate.','Intermediate: compare examined and returned counts with a representative dataset.','Advanced: demonstrate exactly one winner for two version-0 updates.','Challenge: choose a model for inventory reservation and state how expiration and payment interact.'],
'Extend the task board with a history model. Define the growth limit, atomic edit behavior, index needs, migration, and conflict test.',
[('Beginner: Are MongoDB documents just JSON?','No. BSON supports additional types and storage semantics.'),('Intermediate: Does an index make every query fast?','No. Predicate, ordering, cardinality, and workload determine its usefulness.'),('Advanced: When is a transaction needed?','When an invariant spans dependent writes that cannot be expressed safely as one atomic document operation.'),('Scenario: Two users buy the last item.','Use a conditional persisted decrement or reservation predicate; a read-before-write check can race.'),('Debugging: Duplicate registration bypasses validation.','Establish the unique index and handle its duplicate-key error safely.')],language='javascript')

area('mongoose','Mongoose schemas, models, and database behavior','P1','mongodb nodejs','express testing',
'https://mongoosejs.com/docs/guide.html','https://mongoosejs.com/docs/validation.html',
'''Connection|1|Connect deliberately, validate configuration, and manage startup failure and shutdown.
Schema|1|A schema describes casting, defaults, validation, middleware, and model behavior; it is distinct from database validation.
Models|1|Models provide collection operations built from a schema and connection.
Validation|1|Validation rejects selected invalid values; update validation has specific supported operators and context rules.
Middleware|2|Middleware surrounds selected operations; document and query middleware have different this and lifecycle behavior.
Methods|2|Document methods attach behavior to a hydrated document; avoid arrows when document this is required.
Statics|2|Statics expose model-level behavior such as a carefully scoped query helper.
Virtuals|2|Virtuals compute or expose values without ordinary persisted fields; serialization options affect visibility.
Populate|2|Populate resolves references through additional query behavior; bound cost and avoid leaking fields.
References|1|References connect identities but do not automatically provide foreign-key enforcement.
Transactions|2|Use a supported deployment and shared session for coordinated operations; avoid unsupported parallel transaction patterns.
Indexes|1|Schema index declarations describe desired indexes; verify actual database creation and migrations.
Aggregation|2|Aggregation operates through pipeline semantics that differ from hydrated-document methods and query casting.''',
'Mongoose reduces repeated model code, but its convenience can hide the distinction between application checks and database invariants.',
'Choose a schema, validate permitted fields at the HTTP boundary, and use database indexes for uniqueness. unique is an index declaration rather than an ordinary field validator. Update validators need deliberate options and have limitations; a findOneAndUpdate does not behave identically to fetching a document and calling save. lean returns plain values without normal hydration features.',
'''const schema = new mongoose.Schema({
  owner: {type: mongoose.Schema.Types.ObjectId, required:true},
  title: {type:String, required:true, maxlength:120},
  version: {type:Number, required:true, default:0}
});
schema.index({owner:1, title:1}, {unique:true});
const Task = mongoose.model('Task', schema);''',
'This fragment requires a connected mongoose import. The unique index must actually exist in the database; duplicate writes surface database errors rather than ordinary title validation errors.',
'Hydration creates richer document instances with change tracking. Query middleware, document middleware, populate, and lean alter what executes and what values are returned. Inspect the API-specific documentation instead of assuming every hook runs on every update.',
'Build an optional Mongoose persistence adapter for the same task-store contract and run the existing ownership and concurrency cases against it.',
['Assuming unique:true is enough before an index has been created.','Using save hooks as though they run for every query update.','Populating unrestricted related documents for an unauthorized caller.'],
['Beginner: distinguish schema, model, document, and collection.','Intermediate: compare lean and hydrated reads.','Advanced: test update-validation and middleware behavior for the exact method used.','Challenge: migrate an index safely and demonstrate a real concurrent uniqueness failure.'],
'Implement a Mongoose adapter as a separate optional package. Document connection, validation, indexes, hook semantics, and parity with the native-driver contract.',
[('Beginner: Does Mongoose replace MongoDB?','No. It provides an application modeling layer over MongoDB.'),('Intermediate: Is unique a Mongoose validator?','No. It declares an index requirement; duplicate-key behavior is enforced by the database.'),('Advanced: What can lean omit?','Hydrated document behavior such as ordinary getters, virtual processing, and document methods depending on configuration.'),('Scenario: Invalid values enter through an update.','Inspect update-validation options, supported operators, boundary validation, and database rules.'),('Debugging: A password save hook did not run.','Check whether the code used a query update rather than document save; make hashing ownership explicit.')])

area('sql','Relational modeling, SQL queries, and transactions','P1','api','mongodb system-design',
'https://www.postgresql.org/docs/current/','https://dev.mysql.com/doc/refman/8.4/en/',
'''Fundamentals|1|Relational data is represented through relations with explicit columns and constraints; SQL expresses operations over these sets.
MySQL|2|MySQL is a relational database with engine and version-specific capabilities; select the actual documentation and isolation contract.
PostgreSQL|1|PostgreSQL supports relational queries, constraints, transactions, and additional types; syntax can differ from MySQL.
CRUD|1|Insert, select, update, and delete should use parameters and enforce caller scope.
Joins|1|Joins combine rows according to predicates; one-to-many relationships can multiply rows.
Subqueries|2|Subqueries supply values or relations to another query; correlated work and plans can affect performance.
CTE|2|A common table expression names a query result within a statement; optimization behavior is database-dependent.
Window functions|2|Window functions calculate across related rows while retaining individual rows, such as rank or running totals.
Indexes|1|Indexes accelerate selected lookups and ordering while adding write and storage cost.
Transactions|1|Transactions group operations with defined isolation behavior; atomicity does not mean all concurrent anomalies disappear.
Constraints|1|Primary keys, unique, foreign keys, not-null, and check constraints protect selected invariants in the database.
Normalization|1|Normalization reduces problematic redundancy; deliberate denormalization needs update and consistency rules.
Query optimization|2|Inspect explain plans with representative cardinality, predicates, ordering, and constraints.''',
'A schema can make invalid relationships impossible to store, while joins answer questions spanning entities. SQL and document databases both require good modeling and explicit concurrency rules.',
'Start from entities and invariants, then define keys and constraints before adding query code. Use parameterized statements with a driver; placeholders vary across databases. A join can produce several rows per parent, so aggregating after the join must account for multiplicity. Isolation levels determine which concurrent observations are permitted; retries may be required for serialization failures.',
'''CREATE TABLE expenses (
  id BIGINT PRIMARY KEY,
  owner_id BIGINT NOT NULL,
  amount_cents BIGINT NOT NULL CHECK (amount_cents > 0)
);
INSERT INTO expenses VALUES (1, 10, 1234), (2, 10, 100);
SELECT owner_id, SUM(amount_cents) AS total_cents
FROM expenses GROUP BY owner_id;''',
'On a compatible relational engine, owner 10 has total_cents 1334. This is a disposable schema example, not a migration for the existing MongoDB workspace. Check the target engine\'s constraint support and integer range.',
'Query planners choose access paths using available statistics and indexes. Foreign keys protect relationships but do not automatically authorize a query. MongoDB also supports validation and transactions; database selection should follow data and workload requirements rather than simplistic SQL-versus-NoSQL claims.',
'Model a job portal with applicants, jobs, and applications. Enforce unique applicant/job application pairs and scope queries to the caller.',
['Interpolating a request value into SQL text.','Summing parent amounts after a one-to-many join without accounting for duplicates.','Assuming a transaction uses the same isolation rules on every engine.'],
['Beginner: write select and update with an owner condition.','Intermediate: compare inner and left joins using a parent with no children.','Advanced: compute a running total with a window function and explicit order.','Challenge: reproduce and document a concurrency anomaly at the chosen isolation level.'],
'Create a relational adapter for expense reporting with schema, parameterized queries, constraints, explain evidence, and migration rollback planning.',
[('Beginner: What does a foreign key establish?','A permitted relationship to referenced rows, subject to configured rules.'),('Intermediate: Why can a join duplicate a total?','A parent is repeated for each matching child; aggregate at the intended grain.'),('Advanced: Does ACID promise no application bugs?','No. Domain invariants, isolation choices, and retry behavior still need correct design.'),('Scenario: A balance check passes twice concurrently.','Use a conditional update or suitable transaction/locking design, then test the real engine.'),('Debugging: A query is slow despite an index.','Inspect the actual plan, selectivity, ordering, statistics, and returned cardinality.')],language='sql')

area('redis','Redis caching, messaging, and distributed coordination','P2','nodejs system-design','security realtime',
'https://redis.io/docs/latest/','https://redis.io/docs/latest/develop/use/patterns/distributed-locks/',
'''Fundamentals|2|Redis provides data structures with operational persistence and replication choices; memory is not automatically durable authority.
Caching|1|A cache reuses derived values with explicit scope, freshness, expiration, and invalidation.
Sessions|2|Shared session storage can coordinate identity across instances when expiration, revocation, and availability rules are defined.
Pub/Sub|2|Pub/Sub delivers to current subscribers and is not a durable replayable queue for disconnected consumers.
Rate limiting|2|Atomic shared counters or scripts can implement a chosen limit policy; define windows, keys, and failure mode.
Queues|2|Durable job systems need acknowledgement, retry, idempotency, and recovery, beyond merely pushing a list value.
Distributed locks|3|Locks have expiry and ownership constraints; stale holders may need fencing enforced by the protected resource.''',
'Caching can remove repeated expensive work, but a misplaced key can expose data or return stale decisions. Shared coordination must handle failures and multiple processes.',
'For cache-aside, read cache, fetch the authoritative value on a miss, and store a bounded-lifetime representation. Include account scope and all relevant inputs. Define invalidation after writes and behavior when Redis is unavailable. Use a token for lock ownership, compare it atomically before release, and consider stale-holder writes after expiry. Do not claim a lock makes an external payment exactly once.',
'''# Redis CLI, disposable local instance
SET "public:catalog:v1" '{"items":[]}' EX 60
GET "public:catalog:v1"
TTL "public:catalog:v1"''',
'GET returns the stored JSON text until expiration or deletion. TTL is remaining seconds; expiration is not a domain authorization check. This example deliberately caches public data.',
'Expiration, eviction, persistence, and replication affect what survives load or failure. Pub/Sub lacks replay for missed messages. Distributed-lock correctness depends on assumptions, timing, and how the protected system handles stale operations.',
'Cache a public aggregate with a measured latency goal and a defined stale-data budget. Keep account authorization and critical writes against the authoritative store.',
['Using one cache key for every logged-in account.','Relying on Pub/Sub to replay missed business events.','Deleting a lock that another holder acquired after expiry.'],
['Beginner: observe a short TTL expire.','Intermediate: separate public and account-specific key design.','Advanced: reproduce a stale-cache race after a write.','Challenge: document cache-unavailable behavior and a stale lock holder scenario.'],
'Build an optional Redis cache adapter for a public read model. Acceptance: bounded keys and TTL, invalidation, account separation, failure behavior, and measured benefit.',
[('Beginner: Is Redis always just a cache?','No. It supports several data structures and operational modes, whose guarantees must be selected deliberately.'),('Intermediate: What belongs in a cache key?','Every input and scope that changes the represented value.'),('Advanced: Why might fencing be required?','A holder can keep working after its lease expires; the resource must reject stale authority.'),('Scenario: A subscriber misses a message while disconnected.','Use durable replay or a queue/stream when missed work must be recovered.'),('Debugging: A fresh write returns stale data.','Trace invalidation ordering, read races, key inputs, and the chosen freshness contract.')],language='text')
