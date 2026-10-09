# Blog

Difficulty: Intermediate

Technology: React Node Express MongoDB

Implementation status: **implemented-learning**

## Requirements

Draft, publish, edit, list, and search articles; validate title/body; enforce author ownership.

## Features

Draft, publish, edit, list, and search articles; validate title/body; enforce author ownership.

## Architecture

Separate presentation, validated domain inputs, and persistence or external reads. The key invariant is: **Only authorized authors can modify their drafts or publications.**

## Database schema

Users and articles with author, status, timestamps, and version.

## API specification

GET/POST articles; PATCH/DELETE an owned article; bounded query contract.

## Folder structure

Canonical implementation: `projects/interview-ready/mern-workspace/`.

## Implementation

[Read and run the existing source](../../projects/interview-ready/mern-workspace/README.md).

**Implemented core:** Draft/publish/edit/delete articles, literal search and cursor lists with author ownership and stored versions.

The requirements above describe the wider target. Compare them with the [implemented scope and extension matrix](../../projects/interview-ready/mern-workspace/PRODUCT_LAB.md), which also contains actual routes, source layout, data model and guarantees. `npm run demo` starts a disposable replica set without Docker. Check the actual source README before claiming a feature works.

## Testing

Demonstrate the invariant with expected outcomes. Include empty input, invalid input, failure recovery, and keyboard behavior. Persistent versions, uniqueness, or authorization require realistic integration checks when applicable. The shared MERN package includes real MongoDB tests and browser checks for the product workflows.

## Deployment

Learning use follows the source README. A production release must pass the [production gate](PRODUCTION_GATE.md), including runtime-specific configuration and recovery. No hosted deployment is implied by this packet.

## Future improvements

Choose one failure or scale requirement, implement it, and update source and tests before changing status. Avoid expanding scope without evidence.

[All projects](README.md) · [Debugging library](../debugging/README.md)
