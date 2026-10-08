# JavaScript coding patterns

[Handbook](../README.md) | [Utility implementations](../../projects/interview-ready/js-toolkit/README.md)

Product software interviews may assess algorithms separately from frontend and MERN skills. For each pattern, state the input contract, invariant, complexity, and boundary cases before coding.

| Pattern | Practice task | Invariant | Typical complexity |
| --- | --- | --- | --- |
| Hash map | Two Sum, first unique value | Map contains only processed information | Expected O(n) time, O(n) space |
| Two pointers | Pair sum in sorted data | Eliminated pairs cannot meet the target | O(n) time |
| Sliding window | Longest distinct substring | Current window has no repeated character | O(n) expected time |
| Prefix sum | Count subarrays with target sum | Seen prefix counts summarize earlier starts | Expected O(n) time |
| Stack | Balanced delimiters, next greater value | Stack contains unmatched or unresolved items | O(n) time |
| Binary search | First valid boundary | Answer remains within the maintained range | O(log n) comparisons |
| Tree DFS | File explorer, tree transform | Each node visited once when input is a tree | O(n) time; depth-dependent auxiliary space |
| Graph BFS | Shortest path in an unweighted graph | Queue explores increasing distance | O(V+E) time |
| Heap | Top k, merge sorted streams | Heap root exposes the next priority item | O(n log k) for common top-k approach |
| Dynamic programming | Coin change, edit distance | Earlier solved states support current states | Depends on state and transition count |

## Worked example with negative values

A sliding window based only on increasing sum does not solve arbitrary subarray sums when negative values exist. Use prefix sums instead. At position i, a prior prefix equal to currentPrefix - target identifies a subarray ending here.

```js
export function countTargetSubarrays(numbers, target) {
  const counts = new Map([[0, 1]]);
  let prefix = 0, result = 0;
  for (const number of numbers) {
    prefix += number;
    result += counts.get(prefix - target) ?? 0;
    counts.set(prefix, (counts.get(prefix) ?? 0) + 1);
  }
  return result;
}
// [1, -1, 1], target 1 => 3
```

Expected O(n) time and O(n) space under a hash-map model. This version assumes finite numbers and ordinary JavaScript numeric precision. For money or very large integer sums, define a safer numeric contract.

## Practice sequence

First solve arrays, strings, and map problems. Add pointers, windows, stacks, and binary search. Then trees, graphs, heaps, and dynamic programming. Review one earlier problem with a changed requirement instead of only adding new problems. Use [LeetCode study plans](https://leetcode.com/studyplan/) as optional exercise sets; access and paid features vary.

For every solution, test empty input, one item, duplicates, negative values if permitted, and a case that violates your initial assumption. Explain average versus worst-case complexity where it matters.
