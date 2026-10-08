# Development proxy hides a missing production route

Priority: P0 for failure reasoning; technology prerequisites follow the [topic guide](../topics/devops.md).

## Broken code

```text
Development: /api/tasks -> Vite proxy -> backend
Production: static host serves only dist/
```

## Expected behavior

Production requests reach an authenticated API contract.

## Actual behavior

The deployed page loads but /api/tasks fails or returns HTML.

## Hints

Does the deployed environment have the proxy and server runtime?

## Solution

<details>
<summary>Reveal the correction</summary>

```text
Deploy the backend and configure same-origin API routing, or configure a deliberate separate origin with its security policy.
Verify /api/tasks status/content type and an authorized write in the deployed topology.
```

</details>

## Explanation and root cause

The development proxy was mistaken for deployed infrastructure.

## How to prevent it

Document runtime and routing requirements and smoke-test the actual deployment.

## Verification

Reproduce the actual behavior, apply the fix in the stated runtime, and assert the expected behavior with the relevant boundary: pure output, real database, browser, Git snapshot, or deployment topology. [Existing scenario bank](../../interview-handbook/scenarios/README.md) provides additional cases.

[All challenges](README.md)
