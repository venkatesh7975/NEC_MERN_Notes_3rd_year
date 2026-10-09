# Repository audit: living knowledge base

Review date: 2026-10-08. Baseline: `bb0191f569ccb44e3d79192fbcf5eb16dd90c1a5`, including the first interview-resource upgrade. [Machine-readable inventory](knowledge-base/data/legacy-inventory.json) records every tracked file, headings, byte size, SHA-256, area, and exact duplicate groups. The inventory reads Git blobs, not ignored dependencies or temporary render files. Exact hashes identify identical bytes; they do not establish semantic equivalence or technical correctness.

## Existing architecture

| Area | What exists | Decision |
| --- | --- | --- |
| Numbered modules, CURRICULUM, learning-map | Ten modules and 120 hours tied to an institution's source document | Preserve as an optional historical teaching route, not the knowledge base's scope |
| notes and module notes | Thirteen broad reference guides and progressive classroom notes | Keep URLs; register bridges to current canonical topic guides |
| dailycodes, css, js | Original classroom implementations, snippets, SQL examples, and small apps | Keep provenance and runtime labels; link tested implementations rather than copy them |
| daily-practice, tasks, assessments | Forty-five practice days, assignments, and assessment packets | Preserve as practice choices; learners outside the classroom can use them independently |
| mini-projects and PROJECT_INDEX | 150 structured briefs | Keep specification status separate from implemented source |
| interview-handbook | Ten revision guides, 100 answered questions, 24 scenarios, 16 timed builds, mind maps, PDF/DOCX/XLSX/CSV | Reuse as interview and offline-study views; avoid duplicating answers |
| projects/interview-ready | Three MERN domains sharing one tested package, UI lab, JavaScript toolkit | Use as the implemented middle rungs of the project ladder |
| cheatsheets and interview-questions | Short older references | Keep old paths and add an index of current quick references |
| GitHub workflow | Documentation, source examples, MongoDB API checks, production client build | Extend with knowledge graph, schema, and evidence checks |

## Strengths and weaknesses

Strong material has specific input/output behavior, boundaries, setup, ownership checks, and actual execution evidence. The existing MERN task version test establishes database concurrency behavior; the UI lab verifies keyboard interaction and undo. The classroom practice bank has clear acceptance requirements and should remain discoverable.

Weak material includes broad snippets that assume surrounding applications, uneven source verification, disconnected indexes, institution-specific wording at the entry point, and little guidance about what to master first. A numbered syllabus cannot represent Next.js, Redis, real-time delivery, multiple testing tools, cloud tradeoffs, or specialized ECMAScript without confusing core and extension material.

## Duplication

The baseline [audit](AUDIT.md) identified identical theme and parity implementations under `dailycodes/ClassProjects` and `dailycodes/javascript/p3`. Their classroom URLs remain valid. The new inventory also records identical requirements, small reference snippets, and any other exact duplicate blobs. Select a canonical implementation in navigation and verify compatibility copies when changing behavior. Do not delete a file merely because its hash matches another file: duplicated instructional context may be intentional.

## Gaps and response

The master prompt's technology landscape becomes an explicit concept registry with stable ids, P0–P4 priorities, prerequisite and related edges, authored definitions, source references, and honest depth status. Canonical guides provide mental models, worked examples, exercises, mini-projects, answered interview prompts, and failure analysis. A guide does not make every API in a framework complete.

The most important additions are TypeScript, modern state choices, Next.js rendering boundaries, Mongoose behavior, relational query design, Redis cache correctness, API contracts and GraphQL, real-time delivery, testing strategy, operational debugging, observability, and distributed-systems tradeoffs. Reference entries cover specialized features without giving them the same workload as essentials.

## Proposed architecture and migration

`knowledge-base/` owns the current topic graph, topic guides, paths, project packets, debugging library, quick references, resource register, and coverage reports. `projects/knowledge-base/` holds new runnable introductory apps. Existing classroom and interview trees remain linked views. Root navigation leads to the living knowledge base; classroom navigation remains available by choice.

See [architecture](knowledge-base/ARCHITECTURE.md), [migration map](knowledge-base/MIGRATION_MAP.md), [coverage](knowledge-base/COVERAGE.md), and [remaining work](knowledge-base/REMAINING_WORK.md). No old lesson or code example is removed in this migration. Coverage is calculated from authored evidence, not file counts, checked boxes, or the existence of an external link.
