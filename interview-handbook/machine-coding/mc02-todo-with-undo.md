# MC02 Todo with undo

[Exercise index](README.md) | [Scoring rubric](rubric.md)

Level: Easy. Suggested time: 45 minutes. Topic: javascript.

## Required behavior

Create, complete, filter, delete, and undo the most recent delete; ids are stable.

## Acceptance checks

Whitespace title, duplicate titles, delete under active filter, undo twice. The core interaction must work with a keyboard. Show empty and failure states when applicable. Explain the data contract and what remains incomplete.

## Deliverables

Provide runnable source, setup instructions, a short state or API design explanation, and evidence for the acceptance checks. Avoid spending the first half of the round on styling.

## Suggested time budget

Use roughly 10 percent for clarification and state design, 55 percent for a complete core flow, 20 percent for boundaries and failure recovery, and 15 percent for a demo and explanation. If time runs short, retain correctness and clearly state omitted extensions.

<details>
<summary>Solution approach after your attempt</summary>

Use normalized ids and a pure reducer; keep one bounded deleted item for the stated contract.

Explain the main invariant and one alternative. Apply the shared rubric rather than treating a visual match as sufficient proof.

</details>
