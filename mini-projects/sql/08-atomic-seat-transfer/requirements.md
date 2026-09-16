# SQL-08 acceptance requirements

[Full brief](README.md).

| ID | Requirement | Evidence |
| --- | --- | --- |
| FR-1 | Use transaction for two updates | Fixture, expected and actual result |
| FR-2 | inject failure and roll back | Fixture, expected and actual result |
| Acceptance | Failed second update preserves both original values | Reproducible observation |

Optional extensions do not replace required behavior.
