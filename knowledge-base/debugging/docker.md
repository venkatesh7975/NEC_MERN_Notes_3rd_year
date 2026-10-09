# Container connects to its own loopback

Priority: P0 for failure reasoning; technology prerequisites follow the [topic guide](../topics/devops.md).

## Broken code

```text
MONGO_URI=mongodb://127.0.0.1:27017/app
# app and mongo run in separate Compose containers
```

## Expected behavior

The application reaches the database service.

## Actual behavior

Connection is refused inside the app container.

## Hints

Which network namespace owns 127.0.0.1?

## Solution

<details>
<summary>Reveal the correction</summary>

```text
MONGO_URI=mongodb://mongo:27017/app
# Use the actual Compose service name on its shared private network.
```

</details>

## Explanation and root cause

Loopback inside the app container refers to that container, not the separate database.

## How to prevent it

Document network topology, readiness, credentials, and private service names.

## Verification

Reproduce the actual behavior, apply the fix in the stated runtime, and assert the expected behavior with the relevant boundary: pure output, real database, browser, Git snapshot, or deployment topology. [Existing scenario bank](../../interview-handbook/scenarios/README.md) provides additional cases.

[All challenges](README.md)
