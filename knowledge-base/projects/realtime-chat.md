# Recoverable real-time chat

Difficulty: Advanced

Technology: MERN Socket.IO optional Redis

Implementation status: **specification**

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
