# Full MERN e-commerce

Difficulty: Advanced

Technology: MERN queues optional Redis

Implementation status: **implemented-learning**

## Requirements

Catalog, cart, order, inventory reservation, payment-provider test integration, and order recovery.

## Features

Catalog, cart, order, inventory reservation, payment-provider test integration, and order recovery.

## Architecture

Separate presentation, validated domain inputs, and persistence or external reads. The key invariant is: **No negative stock or duplicate paid business effect after replay.**

## Database schema

Products, reservations, orders, operation ids, and outbox.

## API specification

Versioned catalog/order contract with provider event verification and idempotency.

## Folder structure

Canonical implementation: `projects/interview-ready/mern-workspace/`.

## Implementation

[Read and run the existing source](../../projects/interview-ready/mern-workspace/README.md).

**Implemented core:** Atomic one-SKU stock/order reservation, idempotency, cancellation and signed payment test contracts; no real payment service.

The requirements above describe the wider target. Compare them with the [implemented scope and extension matrix](../../projects/interview-ready/mern-workspace/PRODUCT_LAB.md), which also contains actual routes, source layout, data model and guarantees. `npm run demo` starts a disposable replica set without Docker. Check the actual source README before claiming a feature works.

## Testing

Demonstrate the invariant with expected outcomes. Include empty input, invalid input, failure recovery, and keyboard behavior. Persistent versions, uniqueness, or authorization require realistic integration checks when applicable. The shared MERN package includes real MongoDB tests and browser checks for the product workflows.

## Deployment

Learning use follows the source README. A production release must pass the [production gate](PRODUCTION_GATE.md), including runtime-specific configuration and recovery. No hosted deployment is implied by this packet.

## Future improvements

Choose one failure or scale requirement, implement it, and update source and tests before changing status. Avoid expanding scope without evidence.

[All projects](README.md) · [Debugging library](../debugging/README.md)
