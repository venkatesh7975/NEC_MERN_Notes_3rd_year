# MC11 Promise pool

[Exercise index](README.md) | [Scoring rubric](rubric.md)

Level: Hard. Suggested time: 75 minutes. Topic: javascript.

## Required behavior

Run at most k task factories, ordered results, explicit failure policy, invalid limit rejected.

## Acceptance checks

Empty tasks, rejection, k larger than input, synchronous throw. The core interaction must work with a keyboard. Show empty and failure states when applicable. Explain the data contract and what remains incomplete.

## Deliverables

Provide runnable source, setup instructions, a short state or API design explanation, and evidence for the acceptance checks. Avoid spending the first half of the round on styling.

## Suggested time budget

Use roughly 10 percent for clarification and state design, 55 percent for a complete core flow, 20 percent for boundaries and failure recovery, and 15 percent for a demo and explanation. If time runs short, retain correctness and clearly state omitted extensions.

<details>
<summary>Solution approach after your attempt</summary>

Workers claim indexes and await one task each; store outcome by original index; account for tasks already running.

Explain the main invariant and one alternative. Apply the shared rubric rather than treating a visual match as sufficient proof.

</details>
