# Admin dashboard

Difficulty: Intermediate

Technology: React Express MongoDB

Implementation status: **specification**

## Requirements

Filter and page records, view aggregates, edit permitted fields, and recover from forbidden actions.

## Features

Filter and page records, view aggregates, edit permitted fields, and recover from forbidden actions.

## Architecture

Separate presentation, validated domain inputs, and persistence or external reads. The key invariant is: **A visible admin screen never substitutes for server permissions.**

## Database schema

Permission-scoped read models and audited changes.

## API specification

Bounded admin reads and allowlisted writes with trusted roles.

## Folder structure

Proposed source: `client/`, `server/`, `test/`, and a root README/manifest. This is a design packet; those folders are not claimed to exist.

## Implementation

This project is a specification with no implemented source in this packet. Check the actual source README before claiming a feature works.

## Testing

Demonstrate the invariant with expected outcomes. Include empty input, invalid input, failure recovery, and keyboard behavior. Persistent versions, uniqueness, or authorization require realistic integration checks when applicable.

## Deployment

Learning use follows the source README. A production release must pass the [production gate](PRODUCTION_GATE.md), including runtime-specific configuration and recovery. No hosted deployment is implied by this packet.

## Future improvements

Choose one failure or scale requirement, implement it, and update source and tests before changing status. Avoid expanding scope without evidence.

[All projects](README.md) · [Debugging library](../debugging/README.md)
