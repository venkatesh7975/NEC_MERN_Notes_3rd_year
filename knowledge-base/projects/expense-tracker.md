# Expense tracker

Difficulty: Beginner

Technology: HTML CSS JavaScript

Implementation status: **implemented-learning**

## Requirements

Add exact two-decimal expenses, categorize, filter, delete, and calculate totals.

## Features

Add exact two-decimal expenses, categorize, filter, delete, and calculate totals.

## Architecture

Separate presentation, validated domain inputs, and persistence or external reads. The key invariant is: **Store positive safe integer cents and compute totals from all relevant records.**

## Database schema

Local records with id, category, and integer cents.

## API specification

No network API.

## Folder structure

Canonical implementation: `projects/knowledge-base/learning-lab/`.

## Implementation

[Read and run the existing source](../../projects/knowledge-base/learning-lab/README.md). Check the actual source README before claiming a feature works.

## Testing

Demonstrate the invariant with expected outcomes. Include empty input, invalid input, failure recovery, and keyboard behavior. Persistent versions, uniqueness, or authorization require realistic integration checks when applicable.

## Deployment

Learning use follows the source README. A production release must pass the [production gate](PRODUCTION_GATE.md), including runtime-specific configuration and recovery. No hosted deployment is implied by this packet.

## Future improvements

Choose one failure or scale requirement, implement it, and update source and tests before changing status. Avoid expanding scope without evidence.

[All projects](README.md) · [Debugging library](../debugging/README.md)
