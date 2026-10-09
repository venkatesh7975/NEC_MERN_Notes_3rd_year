# Recoverable real-time chat

Difficulty: Advanced

Technology: React Node Express MongoDB Server-Sent Events

Implementation status: **implemented-learning**

## Requirements

Durable messages, replay, attachment constraints, delivery/read states, and multi-instance routing.

## Features

Durable messages, replay, attachment constraints, delivery/read states, and multi-instance routing.

## Architecture

Separate presentation, validated domain inputs, and persistence or external reads. The key invariant is: **Reconnect and duplicate delivery do not lose or repeat a durable message in the view.**

## Database schema

Rooms, memberships, messages, acknowledgements, and replay positions.

## API specification

Authorized history cursor plus event protocol with stable ids.

## Folder structure

Canonical implementation: `projects/interview-ready/mern-workspace/`.

## Implementation

[Read and run the existing source](../../projects/interview-ready/mern-workspace/README.md).

**Implemented core:** Persisted message IDs, operation replay/collision checks, SSE Last-Event-ID replay and session/membership rechecks.

The requirements above describe the wider target. Compare them with the [implemented scope and extension matrix](../../projects/interview-ready/mern-workspace/PRODUCT_LAB.md), which also contains actual routes, source layout, data model and guarantees. `npm run demo` starts a disposable replica set without Docker. Check the actual source README before claiming a feature works.

## Testing

Demonstrate the invariant with expected outcomes. Include empty input, invalid input, failure recovery, and keyboard behavior. Persistent versions, uniqueness, or authorization require realistic integration checks when applicable. The shared MERN package includes real MongoDB tests and browser checks for the product workflows.

## Deployment

Learning use follows the source README. A production release must pass the [production gate](PRODUCTION_GATE.md), including runtime-specific configuration and recovery. No hosted deployment is implied by this packet.

## Future improvements

Choose one failure or scale requirement, implement it, and update source and tests before changing status. Avoid expanding scope without evidence.

[All projects](README.md) · [Debugging library](../debugging/README.md)
