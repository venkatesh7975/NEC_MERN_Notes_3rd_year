# Product company and startup project lab

Eleven interfaces extend the original task board, reading list, and expense tracker. They share authentication, trusted workspace roles, MongoDB indexes, and API boundary checks. The 20-project learning ladder maps to these implementations and the six beginner apps. Source reuse is intentional: this is one runnable full-stack package with distinct domain workflows.

## Run without Docker

```bash
npm ci
npm run build
npm run demo
```

Open http://localhost:3000 and register test accounts. The demo downloads a MongoDB binary on first use, starts a disposable single-node replica set, and deletes its data when stopped. Use only fictional data. Its payment button changes local test state; it moves no money. For persistent development use the replica-set setup in the README instead.

Select **Product lab**. Create a workspace in the sidebar. Register another account in a separate browser, then add its email as editor or viewer. Owner can change these memberships. Owner/editor can create team content; viewer can read it. Workspace owners review other members' expenses. Every operation checks roles on the server.

## Implemented scope and extension boundaries

| Interface / ladder projects | Working learning features | Advanced extensions to implement yourself |
| --- | --- | --- |
| Blog | Draft, publish/unpublish, author edit/delete, literal search, cursor continuation, stored version conflicts | Rich text sanitization, public publishing, revisions |
| Movie catalog | Original fixtures, search, pagination, detail, persisted account favorites | Licensed external catalog, richer filters |
| Video catalog | Original captioned WebM, native playback, missing-media feedback, persisted playlist; API search | Hosting/transcoding, adaptive streaming, UI search |
| Commerce frontend / MERN commerce | Catalog, local quantity/cart estimates, single-product server orders, atomic stock reservation, operation replay, cancellation, signed payment test contract | Multi-product atomic checkout, reservation expiry, real provider webhooks, fulfillment, outbox |
| Admin dashboard | Owner-only aggregate counts, expense totals, bounded audit search | Charts, bulk operations, export jobs |
| LMS | Workspace course authoring, enrollment, protected text lessons, persisted progress | Instructor ownership within a workspace, uploaded media, lesson revisions, certificates |
| Job portal | Jobs, search, unique application, staff review/version conflict; API accepts and restricts tiny test PDF attachments | Malware scanning, object storage, richer hiring workflows |
| Social network | Follow/unfollow API, plain-text posts, public/followers/private visibility, owner edits, authorized cursor feed | Profile editing, moderation, media, block lists, scalable fan-out |
| Project platform | Teams/roles, projects, versioned tasks, comments, transactional audit and recoverable notifications | Assignees, deadlines, notification acknowledgements, an outbox dispatcher |
| Chat / recoverable chat | Authorized rooms, durable messages, operation deduplication, cursor history, SSE reconnect/replay and session rechecks | Attachments, presence, delivery/read states, load tests, connection distribution |
| Expense platform | Exact integer cents, valid dates, categories, organization scope, independent approval, stored versions, audit and account aggregate | Receipts, reimbursements, multiple currencies, scheduled reporting |

These are educational implementations, not deployed commercial services. Chat deliberately uses HTTP writes plus Server-Sent Events rather than Socket.IO: server-to-browser messages are one-way, while normal authenticated HTTP supplies durable writes. Explain that choice in an interview before substituting a different protocol.

## Source and data model

- `src/ProductLab.jsx`: eleven React workflows, visible errors, draft preservation, aborted/stale read handling, local cart and SSE cleanup.
- `server/product-domains.js`: allowlisted domain inputs, role checks, cursor reads, transactions, stock and replay predicates, course/attachment access and SSE.
- `server/app.js`: origin policy, sessions, auth, safe errors, readiness and optional request logs.
- `server/store.js`: authentication/base domains plus product index initialization.
- `test/products.test.js`: eleven persisted domain cases, including concurrent writes and forbidden operations.
- `test/product-browser.mjs`: all eleven interfaces, original media playback, safe text, desktop/mobile behavior.

Product collections use the `lab_` prefix: articles, tenants, members, audit, projects, projectTasks, comments, notifications, products, orders, courses, enrollments, progress, jobs, applications, teamExpenses, follows, posts, rooms, messages, favorites and playlists. Membership has unique `(tenant,user)`; application has unique `(job,owner)`; message has unique `(room,owner,operation)`; order has unique `(owner,operation)`; enrollment/progress/favorites/playlists use their own account and item compound keys. Transactions require a MongoDB replica set.

## HTTP contracts

Prefix every path below with `/api/lab`. All require an authenticated session. Write requests require the configured Origin and JSON. Use trusted IDs from responses; never send roles or owner fields to create a record. Unknown fields are rejected. An ordinary cursor list returns `{items, nextCursor}`; `cursor` is a returned ObjectId, `limit` is capped at 50, and supported `q` searches treat regex punctuation literally. Movie fixtures instead use an integer offset cursor. Team membership lists have a 100-account learning limit.

| Method / path | Input or behavior |
| --- | --- |
| GET catalog/movies, catalog/movies/:id, catalog/videos | `q`, movie `cursor`/`limit`; checked-in read fixtures |
| GET/POST favorites or playlists | POST `movie` or `video`; account-scoped uniqueness |
| DELETE favorites/:id or playlists/:id | Stored entry ID, not the fixture ID |
| GET/POST articles; PATCH/DELETE articles/:id | Create `title,body`; PATCH also `status,version` |
| GET/POST tenants | Create `title`; GET includes current role |
| GET/POST tenants/:tenant/members | Owner write `email,role` (editor/viewer); registered test accounts |
| GET tenants/:tenant/dashboard or /audit | Owner only; aggregates or paged events |
| GET/POST tenants/:tenant/projects, jobs, courses, products | Create validated domain fields; trusted membership required |
| GET courses; POST courses/:id/enroll | Course metadata; idempotent enrollment |
| GET courses/:id/lessons; POST courses/:id/progress | Enrollment required; progress `lesson` is one-based |
| GET jobs; POST jobs/:id/apply | `coverLetter`; optional `resume` base64 PDF, maximum decoded 8 KiB |
| GET jobs/:id/applications; PATCH applications/:id | Staff only; PATCH `status,version` |
| GET applications/:id/resume | Applicant or authorized staff; attachment response, sandbox policy |
| GET/POST projects/:id/tasks; PATCH project-tasks/:id | Create `title`; PATCH `title,status,version` |
| GET/POST project-tasks/:id/comments; GET notifications | Comment `body`; scoped persistence and continuation |
| GET/POST tenants/:tenant/expenses; PATCH team-expenses/:id | Create `title,cents,category,date`; review `status,version` |
| POST follows; DELETE follows/:target | `target` account ID; no self-follow |
| GET feed; POST posts; PATCH posts/:id | `body,visibility`; PATCH also `version` |
| GET/POST tenants/:tenant/rooms; POST rooms/:id/join | `title`; joining requires current workspace membership |
| GET/POST rooms/:id/messages; GET rooms/:id/events | Write `body,operation`; SSE `Last-Event-ID` or `after` cursor |
| GET products, orders; POST orders | Create `product,quantity,operation`; price is server-owned |
| POST orders/:id/cancel | Restore reservation once; paid orders cannot cancel here |
| POST orders/:id/payment | `event,amount` plus signed header; test adapter only |
| POST orders/:id/simulate-payment | Disabled unless explicitly enabled for local development |

Error bodies are `{error,message}`. Expect 400 malformed input, 401 missing/revoked session, 403 forbidden role/origin/signature, 404 unavailable owned record, 409 duplicate/version/stock/state conflict, and 503 unavailable payment configuration or readiness dependency. UI refreshes after mutations; it makes no optimistic persistence claim.

## Payment and chat guarantees

The signed adapter is a reproducible contract exercise, not an external payment provider. Configure `PAYMENT_TEST_SECRET` locally. Sign the exact UTF-8 `JSON.stringify({order:orderId,event,amount})` with HMAC-SHA256 and pass its hex result as `x-payment-signature`. Amount must equal the authoritative order cents. An identical completed event returns the existing paid record; a different event conflicts. No card details are accepted. `ENABLE_PAYMENT_SIMULATOR=true` is rejected by the entry point when `NODE_ENV=production`.

Use the same order/message operation ID when retrying the same intent. Reusing it with another payload conflicts. Orders reserve one SKU atomically and require explicit cancellation if abandoned. There is no automatic reservation expiration. Chat commits before displaying a stable message ID; SSE polls durable storage, rechecks membership/session, sends replay IDs and heartbeats, and closes on backpressure. The demo caps active SSE streams at 100 and the client displays the latest 200 messages. Measure capacity before any production claim.

## Verify and defend

```bash
npm test
npm run build
# With Playwright and its browser installed:
npm run test:browser
npm run test:products:browser
```

Explain why client role checks are insufficient, why a conditional version predicate prevents lost updates, which transaction spans inventory and an order, and how an SSE cursor differs from acknowledging a durable write. Demonstrate a forbidden viewer write, two last-unit purchases, an operation replay, visibility changing after follow, a denied unenrolled lesson read, and approval of an already-reviewed expense. [Operations](OPERATIONS.md) covers container setup and recovery; [production gate](../../../knowledge-base/projects/PRODUCTION_GATE.md) is a separate deployment checklist.
