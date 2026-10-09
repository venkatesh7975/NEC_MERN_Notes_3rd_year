# Dsa Machine Coding interview questions

[Handbook](../README.md) | [All question ids](index.md)

Difficulty is an editorial learning classification. Questions are original practice, not a company question leak. Cover the answer before attempting recall.

## Q081 Easy - How do you solve Two Sum in JavaScript?

<details>
<summary>Answer and follow-up</summary>

Scan once with a Map from value to earlier index. For each value, check whether its complement is already present before inserting it. This avoids using one item twice. Expected time is O(n), space O(n). Test duplicate values and no-solution behavior.

**Follow-up:** What if the input is sorted?

</details>

## Q082 Easy - When is a sliding window appropriate?

<details>
<summary>Answer and follow-up</summary>

A window works when adjacent ranges can be updated incrementally and a valid shrinking or expansion rule exists. For longest substring without repetition, track counts or latest indexes. For arbitrary sums with negative values, a simple increasing-sum window may be invalid.

**Follow-up:** Why do negative numbers break some window rules?

</details>

## Q083 Easy - How do you begin a machine coding round?

<details>
<summary>Answer and follow-up</summary>

Clarify the required behavior and data contract, write a short acceptance checklist, and deliver one complete interaction early. Use semantic controls and separate core state logic from rendering. Reserve time for failure states and a demo instead of polishing before the main flow works.

**Follow-up:** What would you cut with ten minutes left?

</details>

## Q084 Medium - How do you implement a keyboard autocomplete?

<details>
<summary>Answer and follow-up</summary>

Track query, matching results, active option, and expanded state. Support arrows, Enter, Escape, and appropriate combobox relationships. Avoid stale async responses and preserve focus on the input. Test an empty list and selection after the list changes.

**Follow-up:** How do you announce the result count?

</details>

## Q085 Medium - How do you flatten a nested tree?

<details>
<summary>Answer and follow-up</summary>

Traverse recursively or with an explicit stack and carry the parent path or depth. State whether input order must be preserved and whether cycles are possible. Recursion uses stack space proportional to depth; an explicit stack avoids call-stack overflow for deeply nested inputs.

**Follow-up:** How do you handle duplicate ids?

</details>

## Q086 Medium - How do you implement undo in a task list?

<details>
<summary>Answer and follow-up</summary>

Represent edits as commands or retain bounded prior states. Decide whether undo applies to local unsaved changes or to server-persisted operations. Give deleted items a stable id and protect against later conflicting changes. Announce the undo action and expiration clearly.

**Follow-up:** What happens after a page reload?

</details>

## Q087 Medium - How would you test a sortable data table?

<details>
<summary>Answer and follow-up</summary>

Test text, numeric, and date comparisons, ties, direction changes, and mutation safety. Use a stable tie-breaker where order matters. Keep sort state explicit and announce the active sort with aria-sort. Test pagination interactions because sorting only the visible page can mislead users.

**Follow-up:** What is the locale policy?

</details>

## Q088 Hard - How do you build a concurrency-limited promise pool?

<details>
<summary>Answer and follow-up</summary>

Keep at most k workers. Each worker claims a next index and awaits one task before claiming another. Store results at the original index and define error behavior. A fail-fast pool must still account for already-running tasks; a limit is not automatic cancellation.

**Follow-up:** What if one task never resolves?

</details>

## Q089 Hard - How do you implement an event emitter?

<details>
<summary>Answer and follow-up</summary>

Map each event name to listeners, return an unsubscribe function, and decide how duplicate listeners behave. Iterate a snapshot so a listener removing another does not unexpectedly alter the current dispatch. Define exception and once semantics explicitly.

**Follow-up:** Should newly added listeners fire during current emission?

</details>

## Q090 Hard - How do you defend your coding solution?

<details>
<summary>Answer and follow-up</summary>

Explain the state model, a core invariant, the expected complexity, and one rejected alternative. Demonstrate a boundary input and failure recovery. Identify what remains incomplete and how you would test it. Unsupported claims of production readiness weaken an otherwise good implementation.

**Follow-up:** What did you intentionally omit?

</details>
