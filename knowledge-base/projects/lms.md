# Learning management system

Difficulty: Advanced

Technology: MERN media storage

Implementation status: **specification**

## Requirements

Course authoring, enrollment, lessons, progress, and permission-scoped teaching views.

## Features

Course authoring, enrollment, lessons, progress, and permission-scoped teaching views.

## Architecture

Separate presentation, validated domain inputs, and persistence or external reads. The key invariant is: **Enrollment and progress writes are scoped to the permitted account and course.**

## Database schema

Users, courses, enrollment, lesson versions, and progress.

## API specification

Course and enrollment APIs with bounded lists and protected media access.

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
