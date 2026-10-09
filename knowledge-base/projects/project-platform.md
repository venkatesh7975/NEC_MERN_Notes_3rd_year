# Project management platform

Difficulty: Advanced

Technology: MERN optional real-time

Implementation status: **implemented-learning**

## Requirements

Teams, projects, tasks, comments, roles, audit history, and notification recovery.

## Features

Teams, projects, tasks, comments, roles, audit history, and notification recovery.

## Architecture

Separate presentation, validated domain inputs, and persistence or external reads. The key invariant is: **Every operation validates tenant membership and persisted task version.**

## Database schema

Organizations, memberships, projects, tasks, comments, outbox, and audit events.

## API specification

Tenant-scoped CRUD, cursor history, role permissions, and notifications.

## Folder structure

Canonical implementation: `projects/interview-ready/mern-workspace/`.

## Implementation

[Read and run the existing source](../../projects/interview-ready/mern-workspace/README.md).

**Implemented core:** Workspace roles, projects, versioned tasks, comments, transactional audit and recoverable notifications.

The requirements above describe the wider target. Compare them with the [implemented scope and extension matrix](../../projects/interview-ready/mern-workspace/PRODUCT_LAB.md), which also contains actual routes, source layout, data model and guarantees. `npm run demo` starts a disposable replica set without Docker. Check the actual source README before claiming a feature works.

## Testing

Demonstrate the invariant with expected outcomes. Include empty input, invalid input, failure recovery, and keyboard behavior. Persistent versions, uniqueness, or authorization require realistic integration checks when applicable. The shared MERN package includes real MongoDB tests and browser checks for the product workflows.

## Deployment

Learning use follows the source README. A production release must pass the [production gate](PRODUCTION_GATE.md), including runtime-specific configuration and recovery. No hosted deployment is implied by this packet.

## Future improvements

Choose one failure or scale requirement, implement it, and update source and tests before changing status. Avoid expanding scope without evidence.

[All projects](README.md) · [Debugging library](../debugging/README.md)
