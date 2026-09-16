# EXPRESS-07 acceptance requirements

[Full brief](README.md).

| ID | Requirement | Evidence |
| --- | --- | --- |
| FR-1 | Handle malformed JSON and rejected operations | Fixture, expected and actual result |
| FR-2 | avoid stack traces in responses | Fixture, expected and actual result |
| Acceptance | Malformed JSON returns 400; unexpected failure returns 500 | Reproducible observation |

Optional extensions do not replace required behavior.
