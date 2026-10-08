# Security Api interview questions

[Handbook](../README.md) | [All question ids](index.md)

Difficulty is an editorial learning classification. Questions are original practice, not a company question leak. Cover the answer before attempting recall.

## Q051 Easy - Compare authentication and authorization.

<details>
<summary>Answer and follow-up</summary>

Authentication establishes who the caller is. Authorization decides whether that caller may perform an action on a resource. Every protected database operation should enforce ownership or role scope. A hidden UI button is not an authorization check.

**Follow-up:** Why is checking only the route id insufficient?

</details>

## Q052 Easy - Why hash passwords rather than encrypt them?

<details>
<summary>Answer and follow-up</summary>

A password verifier should not require recovering the original password. Use a password hashing function with a unique salt and appropriate work parameters. Store the encoded parameters for upgrades. Never use a plain fast digest alone or log the password during debugging.

**Follow-up:** How do you migrate work factors?

</details>

## Q053 Easy - What does CORS protect?

<details>
<summary>Answer and follow-up</summary>

CORS controls browser access to cross-origin responses. It is not API authentication and does not stop server clients from making requests. Some cross-origin requests can still be sent even when reading the response is blocked. Cookie-based writes need a deliberate CSRF strategy.

**Follow-up:** Why can CORS alone fail to prevent CSRF?

</details>

## Q054 Medium - Where should a browser session token live?

<details>
<summary>Answer and follow-up</summary>

An HttpOnly cookie prevents JavaScript from reading the token and can reduce token theft through XSS. Use Secure over HTTPS and an appropriate SameSite setting. Cookie authentication also needs CSRF defenses and revocation. Browser storage tradeoffs should be discussed with the threat model.

**Follow-up:** Does HttpOnly stop malicious scripts making requests?

</details>

## Q055 Medium - Why are JWTs not encrypted by default?

<details>
<summary>Answer and follow-up</summary>

A usual signed JWT protects integrity, not confidentiality. Its payload is encoded and readable. Verify signature, allowed algorithms, expiration, issuer, and audience as appropriate. Revocation and rotation require a design; long-lived bearer tokens increase exposure.

**Follow-up:** How would you revoke one compromised session?

</details>

## Q056 Medium - How do you prevent NoSQL injection?

<details>
<summary>Answer and follow-up</summary>

Construct filters from validated scalar fields rather than accepting arbitrary objects from the client. Reject unexpected operators and properties, limit lengths, and use explicit update fields. A schema library helps at the boundary but cannot repair a deliberately unsafe filter construction.

**Follow-up:** What is mass assignment?

</details>

## Q057 Medium - What makes a REST error useful?

<details>
<summary>Answer and follow-up</summary>

Use a consistent status and a machine-readable error code with a safe human message. Include a correlation id for unexpected errors and field-level detail for validation failures. Avoid leaking stack traces, password hashes, or resource existence across authorization boundaries.

**Follow-up:** When would you return 409 rather than 400?

</details>

## Q058 Hard - How do you stop an SSRF attack?

<details>
<summary>Answer and follow-up</summary>

Treat server-side fetching of user URLs as a privileged operation. Restrict destinations, schemes, redirects, and resolved IPs, block internal networks, and use egress controls and timeouts. Validation before a redirect or DNS change is not enough. A bookmark app can simply store URLs without fetching them.

**Follow-up:** How would you handle DNS rebinding?

</details>

## Q059 Hard - How do you make a payment webhook idempotent?

<details>
<summary>Answer and follow-up</summary>

Verify the provider signature against the expected raw body, persist a unique event or operation id, and apply state changes atomically with that record. Handle out-of-order events and delayed retries. Return success only under a defined durable handling contract.

**Follow-up:** Why is an in-memory Set insufficient?

</details>

## Q060 Hard - How do you make file uploads safer?

<details>
<summary>Answer and follow-up</summary>

Limit size and count, validate expected types using content as well as names, generate server filenames, store outside executable paths, and isolate processing. Apply malware scanning where relevant and authorize access to private files. Streaming and timeouts protect resources.

**Follow-up:** Can MIME type from the client be trusted?

</details>
