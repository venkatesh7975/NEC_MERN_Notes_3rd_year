# MC04 Sortable paginated table

[Exercise index](README.md) | [Scoring rubric](rubric.md)

Level: Medium. Suggested time: 75 minutes. Topic: react.

## Required behavior

Sort full dataset by name or numeric amount; page after sorting; preserve stable ids.

## Acceptance checks

Ties, zero, negative numbers, last page after deleting, empty data. The core interaction must work with a keyboard. Show empty and failure states when applicable. Explain the data contract and what remains incomplete.

## Deliverables

Provide runnable source, setup instructions, a short state or API design explanation, and evidence for the acceptance checks. Avoid spending the first half of the round on styling.

## Suggested time budget

Use roughly 10 percent for clarification and state design, 55 percent for a complete core flow, 20 percent for boundaries and failure recovery, and 15 percent for a demo and explanation. If time runs short, retain correctness and clearly state omitted extensions.

<details>
<summary>Solution approach after your attempt</summary>

Keep sort and page as state; derive sorted and sliced rows; reset invalid pages; use aria-sort.

Explain the main invariant and one alternative. Apply the shared rubric rather than treating a visual match as sufficient proof.

</details>
