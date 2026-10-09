# Weather app

Difficulty: Beginner

Technology: HTML CSS JavaScript Fetch

Implementation status: **implemented-learning**

## Requirements

Demo weather offline; optionally request weather for manually entered coordinates; handle timeout and failure.

## Features

Demo weather offline; optionally request weather for manually entered coordinates; handle timeout and failure.

## Architecture

Separate presentation, validated domain inputs, and persistence or external reads. The key invariant is: **Old responses cannot replace the latest requested location.**

## Database schema

Coordinates, request generation, and loading/success/error state.

## API specification

Optional Open-Meteo forecast request; no API key or geolocation required.

## Folder structure

Canonical implementation: `projects/knowledge-base/learning-lab/`.

## Implementation

[Read and run the existing source](../../projects/knowledge-base/learning-lab/README.md). Check the actual source README before claiming a feature works.

## Testing

Demonstrate the invariant with expected outcomes. Include empty input, invalid input, failure recovery, and keyboard behavior. Persistent versions, uniqueness, or authorization require realistic integration checks when applicable. The shared MERN package includes real MongoDB tests and browser checks for the product workflows.

## Deployment

Learning use follows the source README. A production release must pass the [production gate](PRODUCTION_GATE.md), including runtime-specific configuration and recovery. No hosted deployment is implied by this packet.

## Future improvements

Choose one failure or scale requirement, implement it, and update source and tests before changing status. Avoid expanding scope without evidence.

[All projects](README.md) · [Debugging library](../debugging/README.md)
