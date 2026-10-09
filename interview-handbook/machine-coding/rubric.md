# Machine coding review rubric

| Dimension | Points | Evidence |
| --- | ---: | --- |
| Required behavior | 30 | Demonstrate each requested interaction and correct resulting state |
| Boundaries and failure recovery | 20 | Invalid input, empty results, async errors, and race behavior where applicable |
| State and API design | 15 | One owner per fact, stable ids, clear transitions, bounded work |
| Accessibility | 15 | Semantic controls, labels, focus, keyboard operation, error announcements |
| Verification | 10 | Relevant behavioral checks with explicit expected outcomes |
| Explanation | 10 | Invariant, tradeoff, complexity, omissions, and next steps |

Suggested readiness target: 75/100 with no missing core flow or cross-user authorization failure. This is a self-assessment target, not a hiring cutoff. Record the evidence, not just a number. Repeat one weak exercise after three days.
