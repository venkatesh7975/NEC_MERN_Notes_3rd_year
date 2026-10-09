# MC09 Keyboard autocomplete

[Exercise index](README.md) | [Scoring rubric](rubric.md)

Level: Hard. Suggested time: 90 minutes. Topic: react.

## Required behavior

Arrow navigation, Enter selection, Escape collapse, combobox semantics, latest async query wins.

## Acceptance checks

No matches, IME composition, changed list during selection, blur before click. The core interaction must work with a keyboard. Show empty and failure states when applicable. Explain the data contract and what remains incomplete.

## Deliverables

Provide runnable source, setup instructions, a short state or API design explanation, and evidence for the acceptance checks. Avoid spending the first half of the round on styling.

## Suggested time budget

Use roughly 10 percent for clarification and state design, 55 percent for a complete core flow, 20 percent for boundaries and failure recovery, and 15 percent for a demo and explanation. If time runs short, retain correctness and clearly state omitted extensions.

<details>
<summary>Solution approach after your attempt</summary>

Keep active index valid as results change; use aria-activedescendant and pointer handling without stealing input focus.

Explain the main invariant and one alternative. Apply the shared rubric rather than treating a visual match as sufficient proof.

</details>
