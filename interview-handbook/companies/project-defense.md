# Project defense worksheet

Use this worksheet for a project you personally built or extended. If starting from repository source, explain exactly what you changed.

| Prompt | Your evidence |
| --- | --- |
| Who is the user and what problem does this solve? | Describe one useful workflow |
| What is your contribution? | Source files, commits, and a working demo |
| Trace one write from UI to database | Form state, validation, session, ownership filter, write, response, UI recovery |
| What invariant must always hold? | A test or concurrent operation demonstrating it |
| Why this data model? | Access patterns, growth bounds, index, and alternative |
| What happens when the server fails? | Demonstrate preserved input and retry |
| What happens with two users or two tabs? | Ownership and concurrency evidence |
| Which tests establish correctness? | State what each layer proves and does not prove |
| How is the production build served? | Environment requirements and static/API routing |
| What remains incomplete? | Specific limitation, impact, and next implementation step |

Rehearse a two-minute overview and a ten-minute walkthrough. Then change one feature live, such as a new task status or category filter, and explain what validation and tests need to move with it.
