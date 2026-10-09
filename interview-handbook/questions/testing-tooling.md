# Testing Tooling interview questions

[Handbook](../README.md) | [All question ids](index.md)

Difficulty is an editorial learning classification. Questions are original practice, not a company question leak. Cover the answer before attempting recall.

## Q061 Easy - What should a unit test verify?

<details>
<summary>Answer and follow-up</summary>

A unit test checks an observable behavior of a small unit with controlled inputs. Cover boundaries and errors, not just the happy path. Tests that repeat the implementation algorithm can pass despite the same bug. Use explicit expected outcomes or an independent model.

**Follow-up:** What makes a test brittle?

</details>

## Q062 Easy - What belongs in an integration test?

<details>
<summary>Answer and follow-up</summary>

Check the contract between real cooperating pieces, such as HTTP parsing, authorization, service logic, and persistence. An in-memory repository is useful for route behavior but cannot establish MongoDB index or atomicity behavior. Label that distinction in the test report.

**Follow-up:** Which dependencies should remain real?

</details>

## Q063 Easy - Why commit package-lock.json?

<details>
<summary>Answer and follow-up</summary>

The lockfile records the resolved dependency graph and integrity information. npm ci installs from it without rewriting resolutions and fails if the manifest disagrees. A lockfile improves reproducibility but does not eliminate vulnerabilities or runtime incompatibility.

**Follow-up:** How do you update dependencies deliberately?

</details>

## Q064 Medium - How should React tests select elements?

<details>
<summary>Answer and follow-up</summary>

Prefer accessible roles and names because they reflect how users interact. Test an action and its visible result. Avoid selectors coupled to internal component structure unless necessary. Add browser tests for focus, layout, navigation, and behaviors that a simulated DOM does not model well.

**Follow-up:** When is a test id justified?

</details>

## Q065 Medium - How do fake timers help debounce tests?

<details>
<summary>Answer and follow-up</summary>

Advance a controlled clock to assert no call before the quiet period, a call after it, and cancellation behavior. Verify arguments and this preservation. Avoid arbitrary real sleeps that make the suite slow and flaky. Restore the clock after the test.

**Follow-up:** How do microtasks interact with your test clock?

</details>

## Q066 Medium - How do you test authorization?

<details>
<summary>Answer and follow-up</summary>

Create two users and resources for each. Attempt every read, update, and delete as the other user and as an unauthenticated caller. Verify both status codes and unchanged data. Include list endpoints because they can leak records even if item routes are protected.

**Follow-up:** How do you test role escalation?

</details>

## Q067 Medium - What makes a useful CI pipeline?

<details>
<summary>Answer and follow-up</summary>

Run deterministic checks for documentation, unit and API tests, and production builds. Add database integration tests when persistence invariants matter. Keep installation reproducible with lockfiles and grant minimal permissions. A green build only proves the checks that actually ran.

**Follow-up:** Which checks need secrets?

</details>

## Q068 Hard - How do you test concurrency bugs?

<details>
<summary>Answer and follow-up</summary>

Run competing operations against the actual persistence layer, start them together, and assert the invariant after both complete. For stock, total successful reservations must not exceed initial quantity. For version edits, only one write at the same expected version should succeed.

**Follow-up:** Why may a fake repository hide the race?

</details>

## Q069 Hard - What does test coverage not tell you?

<details>
<summary>Answer and follow-up</summary>

Coverage reports which code was executed, not whether assertions establish correctness. A high percentage can coexist with missing authorization or boundary tests. Review risk-based cases, mutation behavior, and failures before using coverage as a quality proxy.

**Follow-up:** How can mutation testing expose weak assertions?

</details>

## Q070 Hard - How do you test a production build?

<details>
<summary>Answer and follow-up</summary>

Build with the actual toolchain, serve the generated assets, and exercise critical flows against the intended API mode. Check base paths, missing assets, client routing fallback, and environment variables. Development success does not prove deploy-time settings work.

**Follow-up:** Which variables become public in a client bundle?

</details>
