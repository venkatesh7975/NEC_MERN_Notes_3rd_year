# Kanban board

Difficulty: Intermediate

Technology: MongoDB Express React Node

Implementation status: **implemented-learning**

## Requirements

Create, move, delete, and reconcile conflicting task edits.

## Features

Create, move, delete, and reconcile conflicting task edits.

## Architecture

Separate presentation, validated domain inputs, and persistence or external reads. The key invariant is: **Two writes using the same stored version cannot both succeed.**

## Database schema

Owned tasks with status and version.

## API specification

Existing task CRUD contract in the MERN workspace.

## Folder structure

Canonical implementation: `projects/interview-ready/mern-workspace/`.

## Implementation

[Read and run the existing source](../../projects/interview-ready/mern-workspace/README.md). Check the actual source README before claiming a feature works.

## Testing

Demonstrate the invariant with expected outcomes. Include empty input, invalid input, failure recovery, and keyboard behavior. Persistent versions, uniqueness, or authorization require realistic integration checks when applicable.

## Deployment

Learning use follows the source README. A production release must pass the [production gate](PRODUCTION_GATE.md), including runtime-specific configuration and recovery. No hosted deployment is implied by this packet.

## Future improvements

Choose one failure or scale requirement, implement it, and update source and tests before changing status. Avoid expanding scope without evidence.

[All projects](README.md) · [Debugging library](../debugging/README.md)
