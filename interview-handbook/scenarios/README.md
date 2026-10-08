# Scenario practice

[Handbook](../README.md)

For each case, explain the symptom, gather evidence, state a hypothesis, propose a fix, and identify a regression check. Each is an original practice case.

## SC01 React - Search results jump backward while typing

**Evidence to collect:** Throttle the network and type three queries quickly. Record each request id and response time.

<details>
<summary>Diagnosis and answer</summary>

**Likely cause:** An earlier request completes after a later request and overwrites the visible state.

**Fix:** Abort obsolete requests and guard completion with a request generation. Clearing the query also invalidates work.

**Verification:** Resolve mocked requests in reverse order; the final UI must match the newest query.

**Common mistake:** Debounce reduces requests but does not guarantee ordering.

</details>

## SC02 React - A timer always sees the first counter value

**Evidence to collect:** Log the render value and callback value and inspect effect dependencies.

<details>
<summary>Diagnosis and answer</summary>

**Likely cause:** A callback captured a prior render snapshot.

**Fix:** Use a functional state update when only the previous value is needed, or resubscribe with correct dependencies. Use a ref only when a current mutable value is truly required.

**Verification:** Advance timers after several increments and verify current behavior and cleanup.

**Common mistake:** Suppressing the dependency warning hides the stale closure.

</details>

## SC03 React - Editing a sorted list changes the wrong row

**Evidence to collect:** Type into a row, then sort or insert at the front.

<details>
<summary>Diagnosis and answer</summary>

**Likely cause:** Index keys give the row component a different domain item while keeping state.

**Fix:** Key by stable item id and decide whether edits belong in row-local drafts or a keyed parent model.

**Verification:** Edit one id and reorder; the draft remains attached to that id.

**Common mistake:** Random keys force remounts and lose all drafts.

</details>

## SC04 React - An optimistic task update overwrites a newer edit

**Evidence to collect:** Send two edits from separate tabs at the same version.

<details>
<summary>Diagnosis and answer</summary>

**Likely cause:** The server accepts writes without a concurrency condition.

**Fix:** Require expectedVersion, update atomically, and return an owned conflict. On conflict, refresh and let the user reconcile.

**Verification:** Against real MongoDB, run concurrent updates and assert exactly one success.

**Common mistake:** The UI alone cannot serialize other devices or processes.

</details>

## SC05 Browser - A form looks fine but cannot be completed with a keyboard

**Evidence to collect:** Use Tab and Shift+Tab without the mouse. Inspect role and label relationships.

<details>
<summary>Diagnosis and answer</summary>

**Likely cause:** Clickable divs, missing labels, or focus loss break interaction.

**Fix:** Replace controls with native buttons and inputs, restore focus after dialogs, and associate errors with controls.

**Verification:** Complete the flow with keyboard and inspect accessible names.

**Common mistake:** Adding tabindex alone does not supply activation or semantics.

</details>

## SC06 CSS - A card pushes a grid wider than the viewport

**Evidence to collect:** Test a long unbroken title and inspect the overflowing box.

<details>
<summary>Diagnosis and answer</summary>

**Likely cause:** An intrinsic minimum or fixed width prevents shrinking.

**Fix:** Use minmax(0,1fr), min-width:0, wrapping, and constrained media where the content contract permits.

**Verification:** Check 320px width and 200 percent zoom with long input.

**Common mistake:** Hiding overflow can conceal required information.

</details>

## SC07 Node - All requests slow down during report generation

**Evidence to collect:** Correlate CPU profiles and event-loop delay with report requests.

<details>
<summary>Diagnosis and answer</summary>

**Likely cause:** Synchronous CPU work blocks the request-handling thread.

**Fix:** Move expensive work to a worker or job queue, bound workload, and report asynchronous progress.

**Verification:** Load test with concurrent small requests and a report; compare tail latency.

**Common mistake:** Making the function async does not offload computation.

</details>

## SC08 Node - Memory grows on every page visit

**Evidence to collect:** Repeat the flow, force comparable heap snapshots, and inspect retaining paths.

<details>
<summary>Diagnosis and answer</summary>

**Likely cause:** A long-lived listener or cache retains per-request or per-page data.

**Fix:** Unsubscribe, clear timers, or bound and evict cache entries; verify the actual retaining path.

**Verification:** Repeat the workload after the fix and compare retained objects.

**Common mistake:** A single lower heap reading does not prove leak removal.

</details>

## SC09 API - User A can delete User B's task by changing an id

**Evidence to collect:** Create two users and attempt the delete as A using B's id.

<details>
<summary>Diagnosis and answer</summary>

**Likely cause:** The database filter lacks authenticated ownership.

**Fix:** Include owner in every item and list query. Ignore client ownership fields and return a safe missing response.

**Verification:** Read, update, delete, and list isolation tests all preserve B's data.

**Common mistake:** Hiding ids or changing to UUIDs does not authorize access.

</details>

## SC10 API - Cross-site form submission changes account settings

**Evidence to collect:** Inspect cookie settings, content type, Origin checks, and CSRF policy.

<details>
<summary>Diagnosis and answer</summary>

**Likely cause:** Cookie authentication is accepted without a coherent write-origin defense.

**Fix:** Use a defined CSRF strategy, appropriate SameSite cookies, and same-origin enforcement for the reference deployment. Reassess cross-origin requirements.

**Verification:** Send missing and foreign Origin writes; both must fail under the chosen contract.

**Common mistake:** CORS response restrictions are not a complete CSRF policy.

</details>

## SC11 MongoDB - Two requests both purchase the last item

**Evidence to collect:** Run two overlapping reservations against stock=1.

<details>
<summary>Diagnosis and answer</summary>

**Likely cause:** Each request reads stock before an unconditional decrement.

**Fix:** Use one atomic predicate with stock >= requested amount and decrement in that write. Coordinate reservation expiration and payment separately.

**Verification:** At most one reservation succeeds; stock remains nonnegative.

**Common mistake:** A process-local mutex does not protect multiple instances.

</details>

## SC12 MongoDB - A uniqueness check passes but duplicate registration fails

**Evidence to collect:** Send simultaneous registrations and inspect database index errors.

<details>
<summary>Diagnosis and answer</summary>

**Likely cause:** Both prechecks pass before either inserts.

**Fix:** Enforce the unique index and map duplicate-key errors to a safe conflict response. Prechecks may improve feedback but are not the invariant.

**Verification:** Exactly one insert succeeds under concurrency.

**Common mistake:** Removing the index to avoid E11000 removes protection.

</details>

## SC13 MongoDB - The feed skips or repeats items during new inserts

**Evidence to collect:** Compare offset pages while inserting earlier records.

<details>
<summary>Diagnosis and answer</summary>

**Likely cause:** Offset boundaries shift and timestamp ties are not uniquely ordered.

**Fix:** Use a cursor containing the last stable sort tuple, with an id tie-breaker and validated scope.

**Verification:** Insert between page requests and verify stable traversal of the documented contract.

**Common mistake:** Cursor pagination is not automatically a snapshot of all data.

</details>

## SC14 MongoDB - A small database query becomes slow at scale

**Evidence to collect:** Run explain on representative cardinality and compare examined versus returned records.

<details>
<summary>Diagnosis and answer</summary>

**Likely cause:** The query scans too much or sorts outside a useful index.

**Fix:** Design an index for real equality, sort, and range requirements; bound responses and measure before and after.

**Verification:** Document query plans and latency under the same dataset.

**Common mistake:** A faster run on ten sample rows is weak evidence.

</details>

## SC15 Security - A JWT includes a password hash

**Evidence to collect:** Decode a test token and inspect only safe nonproduction data.

<details>
<summary>Diagnosis and answer</summary>

**Likely cause:** Sensitive data was put in a readable signed payload.

**Fix:** Remove sensitive claims, rotate affected credentials or sessions as required, and restrict claims to the minimum needed.

**Verification:** Assert serialized tokens and API responses never contain secret fields.

**Common mistake:** Signing a payload does not encrypt it.

</details>

## SC16 Security - A bookmark preview reads an internal admin endpoint

**Evidence to collect:** Inspect the server fetch destination, redirects, and resolved addresses.

<details>
<summary>Diagnosis and answer</summary>

**Likely cause:** The application performs unrestricted server-side URL fetching.

**Fix:** Avoid server fetching in a simple bookmark project. If previews are required, isolate egress and validate each destination and redirect.

**Verification:** Reject internal destinations in a controlled test environment.

**Common mistake:** Checking only that the string begins with https is insufficient.

</details>

## SC17 Delivery - The payment provider retries and a user is charged twice

**Evidence to collect:** Correlate operation ids, webhook ids, and durable records.

<details>
<summary>Diagnosis and answer</summary>

**Likely cause:** The handler assumes one delivery or retries a non-idempotent operation.

**Fix:** Use provider-supported idempotency and a durable unique operation record with the chosen atomic boundary. Verify webhook signatures.

**Verification:** Replaying an event does not repeat the business effect.

**Common mistake:** An in-memory deduplication map disappears on restart.

</details>

## SC18 Delivery - The task was saved but its notification was lost

**Evidence to collect:** Trace a crash immediately after the database commit and before queue publish.

<details>
<summary>Diagnosis and answer</summary>

**Likely cause:** Two separate writes do not share a durable handoff.

**Fix:** Use an outbox persisted with the business change and a retrying publisher. Make consumers idempotent.

**Verification:** Crash at each boundary; the event eventually publishes without duplicate business effects.

**Common mistake:** An outbox does not guarantee exactly-once transport.

</details>

## SC19 Testing - Tests pass but the browser receives HTML for an API route

**Evidence to collect:** Serve the built app and inspect content type on the API response.

<details>
<summary>Diagnosis and answer</summary>

**Likely cause:** An SPA fallback or proxy is matching an API path incorrectly.

**Fix:** Mount API routes first, return API 404s for unknown API paths, and restrict the SPA fallback to page navigation.

**Verification:** Test an unknown API path and a client route against the production server.

**Common mistake:** Development proxy success does not prove production routing.

</details>

## SC20 Tooling - A deployment installs different package versions

**Evidence to collect:** Compare lockfile, manifest, runtime, and install command.

<details>
<summary>Diagnosis and answer</summary>

**Likely cause:** The build resolves floating versions or ignores the lockfile.

**Fix:** Commit the dependency lock, use npm ci, and declare compatible runtime versions. Update deliberately through a tested change.

**Verification:** A clean CI install produces the same resolved graph.

**Common mistake:** A lockfile does not validate all environments or dependency safety.

</details>

## SC21 Operations - Rate limits disappear when another instance serves the request

**Evidence to collect:** Route the same caller to multiple instances and compare counters.

<details>
<summary>Diagnosis and answer</summary>

**Likely cause:** Counters exist separately in process memory.

**Fix:** Use a shared limiter or gateway for distributed enforcement, with explicit outage and key policies.

**Verification:** A caller receives one global budget across instances.

**Common mistake:** A trusted proxy must be configured before using forwarded IPs.

</details>

## SC22 Operations - Shutdown drops active requests

**Evidence to collect:** Send a slow request and terminate the server in a controlled environment.

<details>
<summary>Diagnosis and answer</summary>

**Likely cause:** The process exits before requests and connections drain.

**Fix:** Stop accepting connections, drain within a deadline, close dependencies, and handle stuck sockets deliberately.

**Verification:** The slow request finishes or follows a documented bounded failure policy.

**Common mistake:** Waiting indefinitely can block deployment forever.

</details>

## SC23 TypeScript - A typed API returns a string where a number is expected

**Evidence to collect:** Inspect the incoming payload before an assertion or cast.

<details>
<summary>Diagnosis and answer</summary>

**Likely cause:** Type annotations were treated as runtime validation.

**Fix:** Parse unknown input at the boundary and reject invalid types. Preserve static types after successful validation.

**Verification:** An incorrect payload produces a validation error rather than silent arithmetic coercion.

**Common mistake:** Using as number changes no runtime value.

</details>

## SC24 Career - The interviewer asks for a tradeoff you cannot explain

**Evidence to collect:** Trace a real feature and identify the requirement that led to the design.

<details>
<summary>Diagnosis and answer</summary>

**Likely cause:** The project was copied without understanding its constraints.

**Fix:** Implement a small extension yourself, document an alternative, and measure or test the deciding behavior.

**Verification:** Explain one invariant, demonstrate a failure path, and justify a different choice under a changed requirement.

**Common mistake:** Memorized slogans are not evidence of design judgment.

</details>
